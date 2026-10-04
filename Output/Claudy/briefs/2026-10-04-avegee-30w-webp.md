# ใบงาน 30W (Dale): แปลง `img/rooms-wide/*.png` เป็น webp

คุณเป้สั่ง 4 ต.ค. 2569: "แปลง rooms-wide เป็น webp ได้เลย"
**Repo: `/Users/agapae/agapae-work/AVEGEE`** (clone · main ล่าสุดหลัง `8db411b`) — ห้ามลองเข้า `Claude/AVEGEE` เดิม
ที่มา: รีวิว 30-R1 ส่วน 1 (`Output/Dale/2026-10-04-avegee-30-r1-review.md`) — ภาพห้อง 36 ใบจากงาน Codex app หนัก 113 MB เป็น PNG ยังไม่มีโค้ดเรียกใช้ ทำ `.git` โตเป็น ~800 MB

## ขั้นตอน
1. `git pull` · ไล่ทุกไฟล์ใน `img/rooms-wide/` (รวมโฟลเดอร์ย่อย) · grep ว่ามีที่ไหนอ้าง path `.png` เหล่านี้ไหม (`src/`, `img/manifest.json`, `tests/`, `scripts/`, เอกสาร .md)
2. แปลงเป็น `.webp` ขนาด pixel เท่าเดิม (Pillow `quality=86, method=6` · ภาพมีพื้นโปร่งใสให้คง alpha) · เปิดดูด้วยตาเทียบต้นฉบับอย่างน้อย 4 ใบ ไม่มี artifact ชัด
3. ลบ PNG เดิม · แก้ทุกที่ที่อ้าง path ให้เป็น `.webp` · ถ้ามีเอกสารส่งต่อ (handoff) ของ Codex app ใน repo ให้แก้ชื่อไฟล์ในเอกสารนั้นด้วย
4. เทสต์ทั้งหมด + `node --check src/*.js` + `git diff --check` · commit + push main · ยืนยัน live ไม่หน้าขาว
5. **ห้ามเขียนประวัติ git ใหม่ / force push** — PNG เดิมยังค้างอยู่ใน history (ขนาด .git ไม่ลดเอง) แค่รายงานตัวเลข แล้วเสนอทางเลือกให้ Claudy ส่งคุณเป้ตัดสิน

## ข้อห้าม
- ไม่แตะ worktree อื่นใน `~/agapae-work/.codex-worktrees/` (Toby ทำ 30B อยู่ที่ `toby-30b`) · ไม่แตะ `img/raw/`
- ไม่แปลงภาพนอก `img/rooms-wide/`

## รายงาน
`Output/Dale/2026-10-04-avegee-30w-webp.md`: จำนวนไฟล์, ขนาดก่อน/หลัง (MB), ไฟล์ที่แก้ path, commit, ขนาด `.git` ปัจจุบัน, ทางเลือกลด history (ถ้ามี) · ตอบ PASS หรือปัญหาที่เจอ
