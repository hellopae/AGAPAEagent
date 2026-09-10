/* =====================================================================
   hook-log.mjs — ตัวบันทึกว่า hook ตัวไหนถูกเรียกจริง และได้ stdin มากี่ไบต์

   ใส่ไว้เพื่อวินิจฉัย P0 (10 ก.ย. 2569): hook ตัวที่ 2/3 ของแต่ละ event block
   ดูเหมือนไม่ทำงาน — `.gate-state.json` ค้าง 29 ก.ค. และ `.skill-state.json` ไม่เคยเกิดขึ้น
   ทั้งที่ `hook-status` (ตัวแรกของ block) ทำงานปกติ

   สมมุติฐานที่ต้องพิสูจน์: hook หลายตัวใน block เดียวแชร์ stdin กัน
   → ตัวแรกอ่านหมดแล้ว ตัวหลังได้ string ว่าง → `JSON.parse("" || "{}")` = {}
   → แล้ว exit(0) เงียบ ๆ โดยไม่มีอะไรบันทึก

   วิธีอ่านผล: `node scripts/hook-log-report.mjs`
   - ถ้าตัวหลังของ block ไม่มีบรรทัดเลย     → ไม่ถูกเรียก (ปัญหาที่ตัว harness/settings)
   - ถ้ามีบรรทัดแต่ bytes = 0               → ถูกเรียกแต่ stdin ว่าง = ยืนยันสมมุติฐาน
   - ถ้ามีบรรทัดและ bytes ครบ               → ถูกเรียกและได้ข้อมูลครบ = สาเหตุอยู่ที่ลอจิกในสคริปต์

   กฎเหล็ก: ตัวนี้ห้ามทำให้ hook พังหรือช้า — ทุกอย่างอยู่ใน try/catch และ append บรรทัดเดียว
   ===================================================================== */
import { appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const LOG_FILE = join(dirname(fileURLToPath(import.meta.url)), ".hook-log.jsonl");

/**
 * @param {string} hook  ชื่อ hook เช่น "status" / "gate" / "skill" / "speak"
 * @param {string} mode  โหมดที่ถูกเรียก เช่น "start" / "done" / "pre" / "agent-done" / "stop"
 * @param {string|null} raw  ข้อความที่อ่านจาก stdin (null = สคริปต์นี้ไม่อ่าน stdin)
 */
export function logHook(hook, mode, raw) {
  try {
    let sid = null, ev = null, agent = null;
    if (raw) {
      try {
        const o = JSON.parse(raw);
        sid = o.session_id ?? null;
        ev = o.hook_event_name ?? null;
        agent = o.agent_type ?? o.tool_input?.subagent_type ?? null;
      } catch { /* stdin ไม่ใช่ JSON — bytes ยังบอกอะไรได้ */ }
    }
    appendFileSync(LOG_FILE, JSON.stringify({
      at: new Date().toISOString(),
      hook, mode,
      bytes: raw === null ? -1 : raw.length,   // -1 = ไม่อ่าน stdin, 0 = อ่านแล้วได้ว่าง
      pid: process.pid,
      ppid: process.ppid,                      // ตัวเดียวกันไหมที่ spawn hook ทั้ง block
      sid, ev, agent,
      cwd: process.cwd(),
    }) + "\n");
  } catch { /* บันทึกไม่ได้ก็ต้องไม่ทำให้ hook พัง */ }
}
