# scripts/ — เครื่องมือหลังบ้านของ AGAPAE Agent

| ไฟล์ | ทำอะไร | ใครเรียก |
|---|---|---|
| `hook-status.mjs` | status.json + worklog.json + Firestore + git push | hook อัตโนมัติ (ดู SOP-07) |
| `hook-gate.mjs` | บังคับ fact-check gate + Definition of Done | hook อัตโนมัติ |
| `hook-skill.mjs` | ถามครั้งเดียวตอนจบเทิร์นงานใหญ่ ว่าควรเก็บวิธีทำเป็น skill ไหม (ดู skill `skill-harvest`) | hook อัตโนมัติ |
| `set-status.mjs` | ตั้งสถานะ agent ด้วยมือ | คน |
| `seed-firestore.mjs` | อัปโหลด status.json ขึ้น Firestore (ครั้งเดียวตอน setup) | คน |
| `push-daily.mjs` | สรุปข่าวรายวัน → Firestore `agents/daily` | routine |
| `push-limit.mjs` | % limit จริงจาก `oauth/usage` (fallback: ccusage) → `agents/claude_limit` | hook |

---

## ยกเลิกแล้ว: build-meeting.mjs (บันทึกการประชุม)

**8 ส.ค. 2569 — Kittanate สั่งยกเลิกระบบ "ประชุม/ถกเถียง" ทั้งชุด**

โหมดที่ให้ agent ถกเถียงกันแล้วสกัดเป็นบันทึกการประชุมถูกถอดออกทั้งหมด:
`scripts/build-meeting.mjs` · `meetings.json` · แท็บ Meeting และการ์ด Meeting ใน Widgets บน `index.html`

กลับไปใช้แบบเดิม: **Claudy มอบหมายงานให้ agent ที่เหมาะสม แล้วสรุปผลงาน** ตาม `CLAUDE.md`
(ROUTING TABLE + ORCHESTRATION RULES) — ผลงานทุกชิ้นขึ้น Work Log บน dashboard เหมือนเดิมผ่าน `hook-status.mjs`

ของเก่ายังอยู่ใน git history และเอกสารงานเดิมยังอยู่ที่ `Output/<Agent>/`
doc Firestore `agents/meetings` ไม่มีอะไรอ่านแล้ว — ลบทิ้งได้เมื่อสะดวก

---

## ยกเลิกแล้ว: แอป AGAPAE Widget (macOS)

**7 ก.ย. 2569 — Kittanate สั่งลบ** เพราะไม่ได้เปิดอีกตั้งแต่ถอด Office ออก และกินพื้นที่ 4.4 GB

แอปเคยเป็นแหล่งเดียวของ **ตัวเลข limit จริง** (`fiveHourPct` / `sevenDayPct` ใน `agents/claude_limit`)
และ `renderLimit()` บนเว็บเลือกใช้ตัวนี้ก่อน `pct` ของ ccusage เสมอ — ถ้าลบแอปเฉย ๆ
การ์ดจะค้างที่ตัวเลขเก่าตลอดไป จึงย้าย logic มาไว้ใน `push-limit.mjs`:

- อ่าน OAuth token สดจาก Keychain (`Claude Code-credentials`) ทุกครั้ง ไม่ cache ไม่ log ไม่เขียนไฟล์
- `GET api.anthropic.com/api/oauth/usage` + header `User-Agent: claude-code/<version>` — **ขาดไม่ได้ ไม่งั้น 429**
- endpoint นี้ไม่ official: ถ้า response เปลี่ยนโครงสร้าง หรือ token หมดอายุ → ตกไปใช้ ccusage
  **พร้อมเซ็ต `fiveHourPct`/`sevenDayPct` เป็น null** เพื่อไม่ให้หน้าเว็บยึดเลขค้าง

ซอร์สแอปเก็บไว้ที่ `Output/Dale/2026-09-07-widget-source-archive.zip` · บันทึกเต็มที่ `Output/Dale/2026-09-07-widget-retire.md`
