# B12-REDRAW-2-v2 — ทำนอกเขตชายแดน 1–2 ให้ครบ pipeline (ต่อจาก run 99b10fff)

Repo: AVEGEE (worktree ของ run นี้) · ห้าม commit/push/merge เอง · **ImageGen ในตัวเท่านั้น** ห้าม Shado
ใบงานเดิม (อ่านทั้งหมด): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-11-05-avegee-b12-redraw.md`
มาตรฐาน: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/2026-11-05-map-redraw/MAP-ART-STANDARD.md`

## ผลรอบแรก
run ก่อนหน้า **หยุดหลัง 4 นาที** ได้ภาพร่าง 2 ภาพ (1536×1024) ที่
`/Users/agapae/agapae-work/.codex-worktrees/20261104T183831Z-99b10fff/docs/art-reviews/2026-11-05-border12-redraw/` (`terrain-draft.png`, `cave-draft.png`)
- ✅ องค์ประกอบถูก: ลานสามระดับ บันได สะพานโค้ง หินเปลี่ยนส้ม→เทา · ปากถ้ำหน้าผู้พิทักษ์ alpha สะอาด
- ❌ **สไตล์ไม่เข้าโซน 1**: ดูเป็น 3D render ผิวเรียบ พลาสติก ส้มอิ่มจัด — โซน 1 (`New-Map-Zone1-ok.jpg`) เป็น **ภาพวาด painterly เนื้อหินมีรายละเอียด แตก/รอยแยก หญ้า/มอสเล็กน้อย โทนดินอุ่นหม่นกว่า** แสงพระอาทิตย์ตกโทนส้มชมพู
  → ทุกภาพใหม่ใส่ prompt เทียบสไตล์ และแนบ `New-Map-Zone1-ok.jpg` (หรือ crop ของมัน) เป็นภาพอ้างอิงสไตล์ทุกครั้ง
- ❌ ความละเอียด 1536 · ไม่มีชั้นของเหลว ฟ้า ภูเขา วัตถุ · alpha พื้นบางจุด 252 (ต้อง ≥ 250 ตลอดแนวทางเดิน — ตรวจ distance ทั้งเส้น)

## ⚠️ ห้ามหยุดที่ภาพร่าง
ทำ **ครบทุกขั้นใน run เดียว** (~30 นาที) ImageGen ไม่เกิน ~8 ครั้ง ที่เหลือเป็นสคริปต์ ถ้าเวลาไม่พอ ทำตามลำดับและรายงานว่าค้างขั้นไหน

## ขั้นตอน
1. ภาพพื้นฐานใหม่ (terrain-only พื้นหลังสีเรียบให้ตัด alpha) ใช้ `terrain-draft.png` เป็น guide องค์ประกอบ แต่วาดสไตล์ painterly แบบโซน 1
2. ขยาย ≥ 2300 px กว้างด้วยภาพฐานร่วม + รายละเอียด 2–4 ส่วน + ล็อก alpha — ดัดแปลง `/Users/agapae/Documents/Work PAE/Claude/AVEGEE/layered-map-work/scripts/export-seamless-terrain.py` (อ่านอย่างเดียว คัดลอกมา `scripts/`)
3. ฉากไกล: ซ้ายใช้ภูเขาไฟจาก `terrain-seamless/layers/mountains.png` · ขวาภูเขาเอเชียหมอก (วาด 1 ภาพ RGBA หรือดัดแปลงจากพื้นโซน 2) · Sky โซน 1
4. ของเหลว: ลาวาซ้าย/น้ำ-น้ำตกขวาใต้สะพาน — ตัดจากภาพของเหลวโซน 1/โซน 2 เดิม (`terrain-seamless/flows`, `2026-11-05-zone2-terrain/fluid-master.png`) + loop 12 เฟรม
5. ปากถ้ำ: วาดซ้ำสไตล์ painterly (คง silhouette `cave-draft.png`) แยก `cave-back` (ผนัง+ภายในมืด) / `cave-front` (ซุ้มบังตัวละคร) + foot
6. ประตูเข้า (ไทย, จาก world-kit/โซน 1) · ประตูออก (เอเชีย, อ้างอิง sprite ประตูโซน asia ในเกม) · ต้นไม้ไล่โทน หิน เสาไฟจาก world-kit
7. ส่งออก: `manifest.json`, `layout.json`, `tile-review.json`, `connection-review.json`, `composite-preview.jpg`, `terrain-alpha-preview.png`, `index.html`, README · ลบภาพทดลอง · ≤ 80 MB

## ที่บันทึก
`docs/art-reviews/2026-11-05-border12-redraw/` ใน worktree ของ run นี้

## เกณฑ์รับงาน
เหมือนใบงานเดิมข้อ 1–4 + **สไตล์ painterly เข้ากับ `New-Map-Zone1-ok.jpg` (วาง crop เทียบกันใน `style-compare.jpg`)** — รายงานผ่าน/ไม่ผ่านรายข้อพร้อมหลักฐาน
