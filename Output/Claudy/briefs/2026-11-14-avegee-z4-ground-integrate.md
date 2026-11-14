# ใบงาน Toby — เสียบพื้น HD โซน 4 (cyberhell) เข้าเกม · 14 พ.ย. 2569
คุณเป้ 14 พ.ย.: "ถ้า codex วาดแผนที่ โซน4 เสร็จแล้วก็แปลงเป็น Webp แล้ว push ได้เลยครับ"
**ทำหลังงาน event โซน 2 commit + push ครบแล้วเท่านั้น** (worktree เดียวกัน)

- โซน 4 ประกอบแล้ว (9830×6554, 20 chunk .webp q90 + preview + manifest): `/Users/agapae/agapae-work/.codex-worktrees/20261114T071713Z-9434a667/docs/art-reviews/2026-11-10-z4-hd-assemble/v7/` · README/verification ในโฟลเดอร์แม่ (Codex รายงาน landmark เกิน 4 px 19 จุด สูงสุด 10.44 px)
- วิธีเดียวกับโซน 2/3 ที่คุณทำ (c7bc395e): ขยาย `scripts/install-ground.py` ให้รับ `--zone 4` (img/map-zone4, `ZONE4_GROUND_SET` ใน `src/zone-skin.js`) · ไทล์ 1024 px .webp q88 · ตั้งเป็นค่าเริ่มต้น · ชุดเดิมคืนได้ด้วยค่าเดียว (เขียนคอมเมนต์ค่าคืน)
- ตรวจ walkmask/บันได/สะพาน/ของเหลว/อาคาร ตรงตำแหน่ง (structure ≤ 5 px) · รอยต่อระหว่างชิ้น · fps เดินเมืองไม่ตกเกิน 2 (จอคอม 1792×958)
- ภาพเทียบเดิม|ใหม่ 4 มุม → `Output/Review/2026-11-14-z4-ground/` (jpg ≤ 0.75 MB/ภาพ)
- ปัญหาภาพ (ของหาย สีเพี้ยน รอยต่อ จุดเกิน 5 px) จดรายการ + prompt Codex ไม่ต้องรอ ไม่ต้องแก้เอง
## ที่ทำงาน/ข้อห้าม
worktree `~/agapae-work/.toby-worktrees/z1-v5` branch `claude/2026-11-05-zone1-v5-fx` · ห้ามแตะ `Documents/Work PAE/Claude/AVEGEE`, `~/agapae-work/AVEGEE`, LaunchAgent · อ่าน .codex-worktrees ได้ ห้ามเขียน · ห้าม DOF/parallax/ย้อมสี · Claudy merge main · ห้าม `pgrep -f "node --test"` ในลูปรอ
## ส่งงาน
`Output/Toby/2026-11-14-avegee-z4-ground.md` (ไทย) · commit · push branch · เทสต์ทั้งหมดผ่าน
