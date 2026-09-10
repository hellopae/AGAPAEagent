#!/usr/bin/env node
/* hook-log-report.mjs — สรุป .hook-log.jsonl ว่า hook ตัวไหนถูกเรียกจริงและได้ stdin ครบไหม
   ใช้วินิจฉัย P0 (10 ก.ย. 2569) — อ่านคำอธิบายเต็มใน scripts/hook-log.mjs */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const F = join(dirname(fileURLToPath(import.meta.url)), ".hook-log.jsonl");
if (!existsSync(F)) { console.log("ยังไม่มี .hook-log.jsonl — hook ยังไม่เคยถูกเรียกเลยตั้งแต่ใส่ตัวบันทึก"); process.exit(0); }

const rows = readFileSync(F, "utf8").trim().split("\n").flatMap(l => { try { return [JSON.parse(l)] } catch { return [] } });
console.log(`บันทึกทั้งหมด ${rows.length} บรรทัด\n`);

const BLOCK = { start: "PreToolUse", pre: "PreToolUse", done: "SubagentStop", "agent-done": "SubagentStop", stop: "Stop", "stop(disabled)": "Stop" };
const bySid = {};
for (const r of rows) (bySid[r.sid ?? "no-sid"] ??= []).push(r);

for (const [sid, list] of Object.entries(bySid)) {
  console.log(`── session ${sid} ───────────────`);
  for (const r of list) {
    const b = r.bytes === -1 ? "ไม่อ่าน stdin" : r.bytes === 0 ? "⚠️ stdin ว่าง (0 ไบต์)" : `${r.bytes} ไบต์`;
    console.log(`  ${r.at.slice(11,19)}  ${(BLOCK[r.mode] ?? "?").padEnd(13)} ${r.hook.padEnd(7)} ${r.mode.padEnd(15)} ${b}${r.agent ? "  agent=" + r.agent : ""}`);
  }
  console.log();
}

const starved = rows.filter(r => r.bytes === 0);
const fired = new Set(rows.map(r => r.hook));
console.log("── ข้อสรุป ───────────────");
console.log(`hook ที่ถูกเรียกจริง: ${[...fired].join(", ") || "(ไม่มี)"}`);
for (const h of ["status", "gate", "skill", "speak"]) if (!fired.has(h)) console.log(`❌ ${h} ไม่ถูกเรียกเลย → ปัญหาอยู่ที่ harness/settings ไม่ใช่ลอจิกในสคริปต์`);
if (starved.length) {
  console.log(`⚠️ ยืนยันสมมุติฐาน stdin: ${starved.length} ครั้งที่ถูกเรียกแต่ได้ stdin ว่าง →`);
  for (const r of starved) console.log(`   ${r.hook} ${r.mode} (${BLOCK[r.mode] ?? "?"})`);
} else if (rows.some(r => r.bytes > 0)) {
  console.log("✅ ทุกตัวที่อ่าน stdin ได้ข้อมูลครบ → ถ้ายังมี state ไม่ถูกเขียน สาเหตุอยู่ที่ลอจิกในสคริปต์ ไม่ใช่ stdin");
}
