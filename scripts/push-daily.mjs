#!/usr/bin/env node
/* เขียนสรุปข่าวลง Firestore agents/daily (ใช้ seed ด้วยมือ หรือให้ routine เรียก)
   ใช้: node push-daily.mjs daily.json  — ไฟล์ JSON: { title, date, items[], updatedAt } */
import { readFileSync } from "node:fs";

const PROJECT = "agapae-studio";
const KEY = "AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E";

function fsVal(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: v } : { doubleValue: v };
  if (typeof v === "string") return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(fsVal) } };
  if (typeof v === "object") return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, val]) => [k, fsVal(val)])) } };
  return { stringValue: String(v) };
}

const doc = JSON.parse(readFileSync(process.argv[2], "utf8"));
const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/agents/daily?key=${KEY}`;
const res = await fetch(url, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fields: Object.fromEntries(Object.entries(doc).map(([k, v]) => [k, fsVal(v)])) }),
});
console.log(res.ok ? "✅ agents/daily updated" : `❌ ${res.status} ${await res.text()}`);
