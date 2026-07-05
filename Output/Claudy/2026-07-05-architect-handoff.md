# Architect Handoff Package — Fable 5 → Opus 4.8

**วันที่:** 5 ก.ค. 2026 | **ผู้จัดทำ:** Claude Fable 5 (Senior Architect ผ่านบทบาท Claudy)
**เหตุผล:** Fable 5 ใกล้หมดรอบการใช้งาน — ถ่ายโอนความรู้ทั้งหมดเป็นคู่มือถาวร
ให้ Claude Opus 4.8 รับช่วงเป็นผู้ปฏิบัติงาน (Junior Engineer) ได้ทันทีโดยไม่ต้องเดา

## สิ่งที่ส่งมอบ

### เอกสารหลัก (root)
- `HANDOFF.md` — จุดเริ่มต้นทุก session: บทบาท, ลำดับการอ่าน, Definition of Done 6 ข้อ, กับดักที่เคยเจอ
- `BACKLOG.md` — งานมอบหมายครบทุก agent (11 ตัว) เรียง P0–P3 พร้อมเงื่อนไข block
- `CLAUDE.md` — อัปเดต: ส่วน Architect Handoff, routing table รวม Mind/Dale, GAPS ล่าสุด

### SOP 9 ฉบับ (`SOP/`)
| ฉบับ | เรื่อง |
|---|---|
| SOP-01 | Orchestration — 5 ขั้นตอนรับงาน, quality gates, ตารางตัดสินใจเร็ว |
| SOP-02 | Content pipeline บทความ/สคริปต์ + มาตรฐานบทความ TANAPAT |
| SOP-03 | Printable template 8 ขั้น จนพร้อมขาย Etsy/Gumroad |
| SOP-04 | Web feature + กติกาเลือก stack (Current vs Target) |
| SOP-05 | Research sprint + มาตรฐานรายงาน |
| SOP-06 | Daily news routine + วิธีรันซ่อม |
| SOP-07 | Worklog/Dashboard/Git — hook internals, schemas, Pages gotchas |
| SOP-08 | เกณฑ์ QA ฉบับเต็ม 6 หมวด (ไทย/วัฒนธรรม/print/web/listing/fact-check) |
| SOP-09 | วิธีสร้าง agent ใหม่ครบ 6 จุด + รายชื่อ agent อนาคต |

### Skills 7 ตัว (`.claude/skills/`)
`new-article` · `new-template` · `fact-check-gate` · `qa-gate` · `worklog-sync` · `deploy-pages` · `weekly-review`

### Agent scaffolds ใหม่ 3 ตัว (`.claude/agents/`)
- `libby-index.md` — เดิมถูก route ถึงแต่**ไม่มีไฟล์จริง** (บั๊กเงียบ) — แก้แล้ว
- `mind-visual.md` — ปิด gap ด้าน visual/brand
- `dale-devops.md` — แยกงาน build/deploy ออกจาก Nick ให้ตรงสาย

### ระบบ
- `scripts/hook-status.mjs` — เพิ่ม MAP: libby-index, mind-visual, dale-devops
- `status.json` — เพิ่ม card ของ Dale (dashboard จะแสดง agent ครบ 11 ตัว)

## งานแรกของ Opus 4.8 (จาก BACKLOG P0)
1. ปิด pipeline บทความ print-mistakes v2 → `fact-check-gate` → `qa-gate`
2. ทดสอบ agent ใหม่ 3 ตัวด้วยงาน P1 ของแต่ละตัว แล้วเช็ค dashboard ครบวงจร
