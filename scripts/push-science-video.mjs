#!/usr/bin/env node
/* ส่ง Science Video batch ไป Firestore agents/science_video
   ใช้: node scripts/push-science-video.mjs /path/to/science-video.json
     [--expect-update-time <UTC timestamp|missing>] [--dry-run]
   ข้อมูลทั้งหมดเป็นเนื้อหาสำหรับ dashboard สาธารณะ ห้ามใส่ token/secret/path ส่วนตัว */
import { readFileSync } from "node:fs";

const PROJECT = "agapae-studio";
const KEY = "AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E";
const VALID_STATUSES = new Set([
  "awaiting_ideas", "ideas_ready", "selected", "voice_ready", "video_ready",
  "review", "approved", "scheduled", "published", "blocked",
]);

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function fsVal(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: v } : { doubleValue: v };
  if (typeof v === "string") return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(fsVal) } };
  if (typeof v === "object") {
    return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, val]) => [k, fsVal(val)])) } };
  }
  return { stringValue: String(v) };
}

const args = process.argv.slice(2);
const inputPath = args.shift();
let expected;
let dryRun = false;
while (args.length) {
  const flag = args.shift();
  if (flag === "--dry-run") dryRun = true;
  else if (flag === "--expect-update-time" && expected === undefined) {
    expected = args.shift();
    if (!expected || (expected !== "missing" && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?Z$/.test(expected))) {
      fail("--expect-update-time ต้องเป็น UTC timestamp หรือ missing (เริ่มจาก 404)");
    }
  } else fail(`ไม่รู้จัก argument: ${flag}`);
}
if (!inputPath) fail("ระบุไฟล์ JSON ที่ต้องการส่ง");

let doc;
try {
  doc = JSON.parse(readFileSync(inputPath, "utf8"));
} catch (error) {
  fail(`อ่าน JSON ไม่สำเร็จ: ${error.message}`);
}

if (doc.schemaVersion !== 1) fail("schemaVersion ต้องเป็น 1");
if (!/^\d{4}-W\d{2}$/.test(doc.week || "")) fail("week ต้องอยู่ในรูป YYYY-Www");
if (!VALID_STATUSES.has(doc.status)) fail(`status ไม่รองรับ: ${doc.status}`);
if (!Array.isArray(doc.items) || doc.items.length > 10) fail("items ต้องเป็น array ไม่เกิน 10 รายการ");
if (doc.status === "ideas_ready" && doc.items.length !== 10) fail("ideas_ready ต้องมี items ครบ 10 รายการ");
if (!Array.isArray(doc.production)) fail("production ต้องเป็น array");

for (const item of [...doc.items, ...doc.production]) {
  if (!item || typeof item !== "object" || !item.id || !item.title) {
    fail("ทุก item/production ต้องมี id และ title");
  }
  if (item.videoPath || item.oauthToken || item.refreshToken || item.clientSecret) {
    fail("ห้ามส่ง path หรือ OAuth secret ขึ้น Firestore");
  }
}

const now = new Date().toISOString();
doc.checkedAt = now;
doc.updatedAt ||= now;
const publicDoc = {
  dataJson: JSON.stringify(doc),
  checkedAt: now,
  updatedAt: doc.updatedAt,
  week: doc.week,
  status: doc.status,
};
const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/agents/science_video?key=${KEY}`;
try {
  // Preserve the caller's original snapshot: never re-read when supplied.
  if (expected === undefined) {
    const current = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (current.status === 404) expected = "missing";
    else {
      if (!current.ok) throw new Error(`GET HTTP ${current.status}`);
      expected = (await current.json()).updateTime;
      if (!expected) throw new Error("GET ไม่มี updateTime; หยุดเพื่อป้องกันการเขียนทับ");
    }
  }
  const requestUrl = new URL(url);
  requestUrl.searchParams.set(expected === "missing" ? "currentDocument.exists" : "currentDocument.updateTime",
    expected === "missing" ? "false" : expected);
  for (const key of Object.keys(publicDoc)) requestUrl.searchParams.append("updateMask.fieldPaths", key);
  const body = JSON.stringify({ fields: Object.fromEntries(Object.entries(publicDoc).map(([k, v]) => [k, fsVal(v)])) });
  if (dryRun) {
    console.log(JSON.stringify({ dryRun: true, method: "PATCH", url: requestUrl.href, body: JSON.parse(body) }));
  } else {
    const res = await fetch(requestUrl, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body,
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      const detail = await res.text();
      if ([400, 409, 412].includes(res.status) || detail.includes("FAILED_PRECONDITION")) {
        throw new Error(`precondition/write rejected HTTP ${res.status}: ${detail}; ไม่ retry ไม่เขียนทับ`);
      }
      throw new Error(`PATCH HTTP ${res.status}: ${detail}; ไม่ retry`);
    }
    console.log(`✅ agents/science_video updated (${doc.week})`);
  }
} catch (error) { fail(error.message); }
