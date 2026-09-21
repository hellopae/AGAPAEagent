#!/usr/bin/env node
/* อ่าน Science Video batch ปัจจุบันจาก Firestore เพื่อให้ routine ตรวจ fallback/idempotency */
const PROJECT = "agapae-studio";
const KEY = "AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E";
const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/agents/science_video?key=${KEY}`;

function decode(value) {
  if (!value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if (value.arrayValue) return (value.arrayValue.values || []).map(decode);
  if (value.mapValue) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([k, v]) => [k, decode(v)]));
  return null;
}

const res = await fetch(url);
if (res.status === 404) {
  console.log(JSON.stringify({ exists: false }, null, 2));
  process.exit(0);
}
if (!res.ok) {
  console.error(`❌ ${res.status} ${await res.text()}`);
  process.exit(1);
}

const raw = await res.json();
const fields = Object.fromEntries(Object.entries(raw.fields || {}).map(([k, v]) => [k, decode(v)]));
let data = fields;
if (fields.dataJson) {
  try { data = JSON.parse(fields.dataJson); }
  catch { data = { ...fields, parseError: "dataJson is invalid JSON" }; }
}
console.log(JSON.stringify({ exists: true, ...data }, null, 2));
