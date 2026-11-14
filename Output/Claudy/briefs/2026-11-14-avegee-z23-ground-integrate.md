# ใบงาน Toby — เสียบพื้น HD โซน 2 + 3 เข้าเกม (ให้คุณเป้ตรวจ) · 14 พ.ย. 2569
คุณเป้: "ถ้า Codex วาดแผนที่โซน 2 3 เสร็จแล้ว push ขึ้นเลย จะได้ไปตรวจดู"
- โซน 2 (asia) ประกอบแล้ว: `/Users/agapae/agapae-work/.codex-worktrees/20261113T085021Z-39f7fa12/docs/art-reviews/2026-11-10-z2-hd-assemble/`
- โซน 3 (west) ประกอบแล้ว: `/Users/agapae/agapae-work/.codex-worktrees/20261114T040600Z-9e8be8df/docs/art-reviews/` (โฟลเดอร์ *z3*assemble*)
- วิธีเดียวกับโซน 1 v7r (`scripts/install-z1-ground.py` + `src/zone-skin.js`): ทำสคริปต์ทั่วไปหรือขยายให้รองรับโซน 2/3 · ไทล์ .webp q88 · ตั้งเป็นค่าเริ่มต้นของโซนนั้น · ชุดเดิมคืนได้ด้วยค่าเดียว
- ตรวจ walkmask/บันได/สะพาน/ของเหลว/เมฆตรงตำแหน่ง (structure ≤ 5 px) · รอยต่อระหว่างชิ้น · fps เดินเมืองไม่ตกเกิน 2 (จอคอม)
- ภาพเทียบเดิม|ใหม่ 4 มุมต่อโซน → `Output/Review/2026-11-14-z23-ground/` (≤2 MB/ภาพ) แล้ว `open` โฟลเดอร์
- ปัญหาภาพ (ของหาย สีเพี้ยน รอยต่อ) จดรายการ + prompt Codex ไม่ต้องรอ
## ที่ทำงาน/ข้อห้าม
worktree `~/agapae-work/.toby-worktrees/z1-v5` (หลังงาน z1-events push แล้ว) · ห้ามแตะ AVEGEE หลัก/LaunchAgent · อ่าน .codex-worktrees ได้ ห้ามเขียน · Claudy merge main · commit ทีละโซน · ห้าม `pgrep -f "node --test"` ในลูปรอ
## ส่งงาน
`Output/Toby/2026-11-14-avegee-z23-ground.md` · commit · push · เทสต์ผ่าน
