#!/usr/bin/env node
/* Upload status.json → Firestore  (รันครั้งเดียวตอน setup) */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "status.json");
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

const { agents } = JSON.parse(readFileSync(FILE, "utf8"));
console.log(`Seeding ${agents.length} agents to Firestore…\n`);

for (const [idx, agent] of agents.entries()) {
  const doc = { ...agent, sortOrder: idx };
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/agents/${agent.id}?key=${KEY}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: Object.fromEntries(Object.entries(doc).map(([k, v]) => [k, fsVal(v)])) }),
  });
  console.log(`${res.ok ? "✅" : `❌ ${res.status}`}  ${agent.id.padEnd(14)} ${agent.name}`);
}
console.log("\nDone — เปิด Firestore console เพื่อตรวจสอบ");
