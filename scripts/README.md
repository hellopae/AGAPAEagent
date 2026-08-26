# scripts/ — เครื่องมือหลังบ้านของ AGAPAE Agent

| ไฟล์ | ทำอะไร | ใครเรียก |
|---|---|---|
| `hook-status.mjs` | status.json + worklog.json + Firestore + git push | hook อัตโนมัติ (ดู SOP-07) |
| `hook-gate.mjs` | บังคับ fact-check gate + Definition of Done | hook อัตโนมัติ |
| `hook-skill.mjs` | ถามครั้งเดียวตอนจบเทิร์นงานใหญ่ ว่าควรเก็บวิธีทำเป็น skill ไหม (ดู skill `skill-harvest`) | hook อัตโนมัติ |
| `set-status.mjs` | ตั้งสถานะ agent ด้วยมือ | คน |
| `seed-firestore.mjs` | อัปโหลด status.json ขึ้น Firestore (ครั้งเดียวตอน setup) | คน |
| `push-daily.mjs` · `push-limit.mjs` | widget รายวัน / Claude limit | routine + hook |

---

## ยกเลิกแล้ว: build-meeting.mjs (บันทึกการประชุม)

**8 ส.ค. 2569 — Kittanate สั่งยกเลิกระบบ "ประชุม/ถกเถียง" ทั้งชุด**

โหมดที่ให้ agent ถกเถียงกันแล้วสกัดเป็นบันทึกการประชุมถูกถอดออกทั้งหมด:
`scripts/build-meeting.mjs` · `meetings.json` · แท็บ Meeting และการ์ด Meeting ใน Widgets บน `index.html`

กลับไปใช้แบบเดิม: **Claudy มอบหมายงานให้ agent ที่เหมาะสม แล้วสรุปผลงาน** ตาม `CLAUDE.md`
(ROUTING TABLE + ORCHESTRATION RULES) — ผลงานทุกชิ้นขึ้น Work Log บน dashboard เหมือนเดิมผ่าน `hook-status.mjs`

ของเก่ายังอยู่ใน git history และเอกสารงานเดิมยังอยู่ที่ `Output/<Agent>/`
doc Firestore `agents/meetings` ไม่มีอะไรอ่านแล้ว — ลบทิ้งได้เมื่อสะดวก
