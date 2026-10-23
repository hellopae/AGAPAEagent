# ใบงานวาด ART-m1-zone2-q5: AVEGEE — ซ่อมพื้นโซน 2 (Q3 ท่าเกิน/ฝั่งต่ำ · Q4 ท่าเรือ · รอยต่อ NE–SE) · เจ้าของ Codex (วาดภาพเท่านั้น)

## บริบท
- คุณเป้สั่ง 23 ต.ค. 2569: แผนที่โซน 2 ใหม่ตามโครง/ระบบโซน 1 ธีมอิงแผนที่เดิม · Claude สั่ง Codex วาดได้ · **ห้ามแก้โค้ด**
- สเปก: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-23-avegee-m1-zone2-art-spec.md`
- ผลตรวจ M3 (แหล่งความจริงของปัญหา + ภาพตรวจ): `/Users/agapae/agapae-work/.codex-worktrees/20261023T054046Z-d88c803d/output/m3/README.md` หัวข้อ "คำขอ Q5 / วาดแก้" · ไฟล์ต้นทางที่ M3 เก็บไว้: `/Users/agapae/agapae-work/.codex-worktrees/20261023T054046Z-d88c803d/output/m3/review/` (q1–q4, quadrants, s2/rejected)
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** — อ่านไฟล์จาก path ข้างบนได้ ห้ามเขียนลงที่อื่น ห้ามสร้าง worktree/branch/clone ห้าม git commit/push (wrapper ทำให้)
- วิธีซ่อม: §3.11 ของสเปก (วาดทับเฉพาะส่วน: ครอปกล่องรอบจุด → edit → composite กลับด้วยมาสก์นุ่ม) — แก้ **ที่ควอแดรนต์ต้นทาง** (`review/quadrants/q-sw.png`, `q-se.png`, และ NE ถ้าจำเป็นสำหรับรอยต่อ) เพื่อให้สคริปต์ต่อผืนใช้ได้ตรง

## งาน (ตามตาราง "คำขอ Q5" ใน README M3 — พิกัด preview 1536×1024 ของผืน)
1. x647–695/y673–721 + แนวฝั่ง x208–288, 648–728, 824–900 ที่ y≈676: ลบท่าเรือเกินทางซ้ายสะพาน · ขอบฝั่งต่ำเรียบ 3 ช่วงให้ปีศาจขึ้นได้ ไม่เป็นหน้าผา
2. x865–930/y665–735 ท่าเรือจริง: ราวคู่ตั้งฉาก ≤2°, เสามุมสูงเท่ากัน, ดาดฟ้า ≈x875–923/y697–724 ภายในพื้นที่เดิน x875.2–916.8/y≤718.4
3. x950–1230/y455–575 แถบซ้อน NE–SE: ขอบน้ำและบันไดต่อเป็นเส้นเดียว แก้พืช/texture ซ้อน สีกลมกลืน ไม่เลื่อนโครง
4. ต่อผืนด้วย `python3 scripts/stitch-town-terrain.py --zone asia --src <โฟลเดอร์ควอแดรนต์ที่แก้แล้ว> --out output/m1-zone2/q5/terrain` แล้วตรวจจุดเฝ้าระวัง (ถนนกลาง x742–798, ลานใต้ x615–925/y787–930, krajok x1340–1460/y525–680, สะพานลาวา 2 จุด) กับ guide/mask ±16 preview px · รอยต่อ ≤12 canvas px

## ส่งมอบ
- ควอแดรนต์ที่แก้แล้ว 4 ไฟล์ (รวมที่ไม่แก้ คัดลอกมาให้ครบชุด) ที่ `output/m1-zone2/q5/quadrants/q-{nw,ne,sw,se}.png` 1536×1024 RGB sRGB
- before/after/diff ต่อจุด + `verification.json` + ผืนตรวจใน `output/m1-zone2/q5/terrain/`
- README `output/m1-zone2/q5.md` (สิ่งที่แก้ · ผลตรวจทุกจุด · ที่ยังไม่ผ่าน)

## ข้อห้าม
ห้ามแก้ `src/`, `index.html`, `tests/` · ห้ามเขียนทับไฟล์ภาพเดิม · ห้ามบอกว่า "ผ่าน" เอง
