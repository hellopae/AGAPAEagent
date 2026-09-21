#!/usr/bin/env node
/* ส่ง Science Video batch ไป Firestore agents/science_video
   ใช้: node scripts/push-science-video.mjs /path/to/science-video.json
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

const inputPath = process.argv[2];
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
const res = await fetch(url, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fields: Object.fromEntries(Object.entries(publicDoc).map(([k, v]) => [k, fsVal(v)])) }),
});

console.log(res.ok ? `✅ agents/science_video updated (${doc.week})` : `❌ ${res.status} ${await res.text()}`);
if (!res.ok) process.exit(1);
