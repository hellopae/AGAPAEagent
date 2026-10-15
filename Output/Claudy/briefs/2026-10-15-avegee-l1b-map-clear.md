# ใบงาน L1b: AVEGEE — เคลียร์พื้นใต้อาคาร/ต้นไม้ที่วางบนแผนที่ Zone1 (inpaint ภาพแผนที่ละเอียด) · suffix `-l1b`

## บริบท
- คำสั่ง: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Kittanate-source/2026-10-15-avegee-l-requests.md` ข้อ 1 — อาคาร/ต้นไม้ที่วางเป็น sprite ทับต้นไม้/หิน/สิ่งก่อสร้างที่**วาดอยู่ในภาพแผนที่** ดูลอย
  ภาพ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-15-avegee-l/l1-map-floating-props.jpg`, `l1-map-ice-overlap.jpg`
- มาสก์ (Toby L1): `/Users/agapae/agapae-work/backup/avegee-l1-clear-mask/clear-mask.png` (4915×3277 ขาว=เคลียร์) · `footprints.json` (ชนิด/กล่อง/ไบโอม) · `mask-overlay.jpg`
- ภาพแผนที่ต้นฉบับ: `/Users/agapae/agapae-work/backup/avegee-k1b-map-v2-2026-10-15/zone1-terrain-v2-full.png` (4915×3277) · สคริปต์ตัด chunk เดิม: `.../avegee-k1b-map-v2-2026-10-15/tools/`
- ในเกม: `img/map-zone1/v2/chunks/r{1-4}-c{1-5}.webp` (1024px) + `zone1-terrain-v2-preview.webp` · repo `/Users/agapae/agapae-work/AVEGEE` (worktree ของ run นี้ ฐาน main ล่าสุด — มีงาน Codex app: แสงนรก/เสาไฟไทย/animation ยม แล้ว)

## งาน
1. inpaint เฉพาะพื้นที่ขาวในมาสก์ ให้เป็น**พื้นเรียบตามไบโอมรอบข้าง** (ลานหิน/ดินอัด/หิมะ/หินเทา) ไม่มีต้นไม้ หิน พุ่ม หรือสิ่งก่อสร้างที่วาดอยู่เดิม · ขอบกลืนกับรอบข้าง · ใส่เงาคลุมโคนจางๆ (ambient occlusion) กลางรอยวางได้
   - ทำเป็นชิ้นตามกลุ่ม footprint (crop รอบกลุ่ม + ขอบ ~64px) → imagegen แก้บางส่วน → composite กลับด้วยมาสก์ feather 8–12px — นอกมาสก์ต้องเหมือนเดิม 100%
   - ทางเดิน บันได สะพาน ราวหินที่ผ่านรอยวาง **คงไว้** (ถ้าอยู่ในมาสก์ ให้วาดต่อเนื่องเป็นพื้นทาง ไม่ใช่ลบทิ้ง)
2. ได้ `zone1-terrain-v2-full-l1b.png` → ตัด chunk ใหม่ด้วยสคริปต์เดิม (ขนาด/ชื่อ/quality เดิม) + preview ใหม่ → แทนไฟล์ใน `img/map-zone1/v2/` (cache-bust `-l1b` ที่โหลด chunk)
3. ภาพตรวจ: diff map (ต่างเฉพาะในมาสก์), ก่อน/หลัง 6 จุด (ลานกลาง, บ้านริมทาง, ประตูน้ำแข็ง+ต้นหิมะ, ลานกระทะ, ท่าเรือ, ฝั่งลาวา) ซ้อน sprite อาคาร/ต้นไม้ตามตำแหน่งจริง (PIL)
4. `node --test tests/*.test.mjs` ผ่าน

## ข้อห้าม
- ห้ามแก้นอกมาสก์ · ห้ามแก้ layout/โค้ดวาดแผนที่ (Toby L1 ทำเงา) · ห้ามแตะ animation ยม/`town-lighting.js` · ห้าม commit/merge/push · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`
- หลักฐาน/ภาพตรวจใส่ `output/l1b/` (Dale ลบก่อน merge) · ไฟล์ full PNG ห้ามอยู่ใน repo — ใส่ `/Users/agapae/agapae-work/backup/avegee-l1b/` ไม่ได้ (sandbox) ⇒ ใส่ `output/l1b/` แล้ว Dale ย้าย

## เกณฑ์รับงาน
1. diff ต่างเฉพาะในมาสก์ · 2. ภาพก่อน/หลัง 6 จุด ไม่มีของซ้อนใต้อาคาร/ต้นไม้ ทางเดินยังต่อเนื่อง · 3. chunk ใหม่ขนาด/ชื่อเดิม · 4. เทสต์ผ่าน · รายงาน prompt จริง
