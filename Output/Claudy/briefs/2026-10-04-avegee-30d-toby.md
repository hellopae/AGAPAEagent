# ใบงาน 30D-toby (Toby): ทำ 30D (แผนที่) — โหมด claude-only

**ใบงานหลัก (ขอบเขต/ข้อห้าม/เกณฑ์รับงาน): `Output/Claudy/briefs/2026-10-04-avegee-30d-map.md`** — อ่านก่อน

## ที่ทำงาน
- worktree ใหม่จาก main ล่าสุด: `git -C /Users/agapae/agapae-work/AVEGEE fetch && git -C /Users/agapae/agapae-work/AVEGEE worktree add -b toby/30d /Users/agapae/agapae-work/.codex-worktrees/toby-30d origin/main`
- ห้ามลองเข้า `Claude/AVEGEE` เดิม · ไม่แตะ worktree อื่น / main ใน clone (Dale กำลัง merge 30A แล้วต่อ 30B)
- 30B (branch `toby/30b`) ยังไม่ merge — ถ้าต้องแก้ไฟล์เดียวกัน (`src/ui.js`, `src/scene.js`) ให้แก้แบบแยกส่วน diff เล็ก เพื่อ rebase ง่าย

## เน้น
- ข้อ 1–2 (พื้นที่ห้ามเดิน + เดินอ้อม) สำคัญที่สุด ทำให้ครบ 4 โซน + ฉากชายแดน ก่อนทำข้ออื่น
- ข้อ 7 (#11): เปิดดูทั้ง `st-lokan-asia` และ `st-lokan-west` แล้วกลับด้านอันที่ตรงกับคำบรรยาย (แท่นบัวหิมะ) — รายงานว่ากลับอันไหน

## ส่งงาน
- commit บน `toby/30d` (ไม่ merge ไม่ push) · ภาพก่อน/หลัง `AGAPAE Agent/Output/Toby/30d/`
- รายงาน `AGAPAE Agent/Output/Toby/2026-10-04-avegee-30d.md`: ข้อ 1–7 เสร็จ/ไม่เสร็จ, commit, วิธีทดสอบ
