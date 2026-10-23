# ใบงานวาด Z3-GROUND: AVEGEE พื้นเมืองโซน 3 (ปัจฉิม / west) ครบ 4 ควอแดรนต์ · เจ้าของ Codex (วาดภาพเท่านั้น)

## บริบท
- คุณเป้สั่ง 23 ต.ค. 2569: วาดแผนที่เมืองโซน 2–4 ใหม่ตามโครงโซน 1 · โซน 2 เสร็จแล้ว (M1/M3) → ถึงคิว **โซน 3**
- **บทเรียนจากโซน 2:** คุณเป้บอกว่า "ดูคล้ายโซน 1 มากไป" → โซน 3 ต้อง **อ่านออกทันทีว่าเป็นตะวันตก/ยุโรปยุคกลาง-โกธิค หิมะ น้ำแข็ง** (หินเทาฟ้า, ถนนหินก้อน cobblestone, หิมะบนขอบ, ธารน้ำแข็งฟ้าแทนลาวา, สนหิมะ, รั้วเหล็กดัด, สะพานหินโค้ง) ไม่ใช่สีพื้นแบบโซน 1/2 ทาสีใหม่
- **ผังเดิม:** ตำแหน่งลาน/ถนน/บันได/สะพาน/แม่น้ำ **ตรงกับโซน 1 และโซน 2** (ระบบโค้ดใช้พิกัดเดียวกัน) — ดูผังโซน 2 ที่ใช้อยู่: `img/map-zone2/v1/zone2-terrain-v1-preview.webp` และ guide `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-23-avegee-m0-map-survey/zone1-layout-guide.png`
- **วิธีทำ = ทำซ้ำแบบโซน 2 ทุกขั้น** — สเปกโซน 2 (ใช้เป็นแม่แบบ เปลี่ยนเฉพาะธีม): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-23-avegee-m1-zone2-art-spec.md` (§2 ภาษาภาพ, §3 ขั้นตอนควอแดรนต์ + seed, §6 กฎสีโซน 3–4) · ใบงานโซน 2 ที่ผ่านแล้ว: `.../Output/Claudy/briefs/2026-10-23-avegee-art-m1-zone2-q1.md` ถึง `-q5.md` (q5 = ซ่อมท่าเกิน/ผาที่ทำ Q3–Q4 ไม่ผ่าน — **ระวังตั้งแต่แรก**)
- ขนาด/ไฟล์ปลายทาง: M0 survey `.../Output/Toby/2026-10-23-avegee-m0-map-survey.md` §4.1 แถว "Z3 พื้นปัจฉิม" → `img/map-zone3/v1/…` เหมือนโซน 2 (`fullPx 4915×3277`, ชิ้น 1024 ตาม `scripts/stitch-town-terrain.py --zone west`)
- ธีมอ้างอิงเดิมของโซน: `img/theme-v4/map-west.webp`, `img/Zone3.webp`, `img/map-zone1/dungeon-asia-west-*-v1.webp`, ภาพชายแดน `img/frontier-route/zone2-3-v1.webp` (ปลายทาง EXIT = ประตูเมืองปัจฉิม ควรเข้าชุด)
- กฎวัฒนธรรม: ห้ามรูปเคารพ ห้ามกางเขน/สัญลักษณ์ศาสนา ห้ามตัวอักษร/ลายน้ำ
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** ห้ามสร้าง worktree/branch/clone ห้าม git commit/push

## งาน
1. `output/z3-ground/spec.md`: ดัดแปลงสเปกโซน 2 เป็นโซน 3 (พาเลตต์, วัสดุ, ของแทนแต่ละอย่าง: ลาวา→ธารน้ำแข็ง, ไผ่→สน, หยก→เหล็ก/หินฟ้า ฯลฯ, prompt EN + negative ต่อควอแดรนต์)
2. วาด NW ก่อน แล้ว NE/SW โดยใช้ NW เป็น seed สไตล์ แล้ว SE · ต่อรอยตามวิธีโซน 2 · ตรวจทับ mask/ผังโซน 2 ทุกควอแดรนต์ (overlay ใน `output/z3-ground/qa/`) — ลาน/บันได/สะพานต้องตรงผัง ไม่มีท่าเกิน/ผาแทนฝั่ง
3. ส่งออกชิ้นตาม stitch script ของ repo + preview `img/map-zone3/v1/zone3-terrain-v1-preview.webp` (+ ภาพ 1536×1024 สำหรับชุด mask ให้คุณเป้วาด: `output/z3-ground/west-ground-1536x1024.png`)
4. README `output/z3-ground.md`: ไฟล์ + ขนาด + prompt + overlay ต่อควอแดรนต์ + จุดที่ยังไม่ตรง

## ข้อห้าม
ห้ามแก้ `src/`, `index.html`, `tests/` · ห้ามทับไฟล์โซน 1/2 · ห้ามบอกว่า "ผ่าน" เอง

## เกณฑ์รับงาน
1. ครบ 4 ควอแดรนต์ ต่อรอยเนียน 2. ผังตรงโซน 2 (overlay) 3. ดูออกว่าเป็นตะวันตก-หิมะ ไม่ใช่โซน 1/2 เปลี่ยนสี 4. ไฟล์ตาม stitch script + preview + ภาพ 1536×1024 5. README
