# Z1-V5-FX — ใส่ animation ของเหลว/เมฆ + เงาเมฆใหม่ + โรงอาหารใหม่ ลงแผนที่โซน 1 เดิม (v5) ในเกม · 5 พ.ย. 2569

- เจ้าของ: **Toby** · ตรวจรับ: Claudy (+ Dale รีวิวก่อน merge) · โหมด `both` (Codex วาดภาพเท่านั้น)
- worktree **ใหม่** `/Users/agapae/agapae-work/.toby-worktrees/z1-v5` branch `claude/2026-11-05-zone1-v5-fx` **แตกจาก main `812152d2`** (ไม่ใช่ branch ผังใหม่)
- ห้ามแตะ worktree `z1-layout` / `z1-fx` (branch ผังใหม่ — พักไว้ ใช้อ่านโค้ดได้)

## บริบท — คุณเป้เปลี่ยนทิศ (5 พ.ย.)
เล่นเทียบแล้ว **แผนที่เก่าดูดีกว่า** → เลิกผังใหม่ (v6) กลับใช้ **แผนที่เดิม `img/map-zone1/v5`** (โครงสร้าง walkmask สถานีเดิมทั้งหมด)
ระหว่างนี้ Codex กำลังวาดพื้น v5 ใหม่ให้ละเอียด 2× (ได้ชุด `v7` 9830×6554 chunk 2048 grid เดิม ~2 ชม.) — **รอบนี้ยังไม่ต้องเปลี่ยนพื้น** แต่ทำให้ตัวโหลดรองรับ (ข้อ 6)
คำตัดสินทั้งหมด: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/2026-11-05-map-redraw/OWNER-DECISIONS-V5.md` **อ่านก่อน**

## ห้ามมี (คุณเป้ตัดออก)
**depth of field, parallax, bloom/ไอแดดทั้งจอ, color grading** · **ไฟคบเพลิงและใบไม้ร่วงใช้ของเก่าในเกม** (อย่าเปลี่ยน)

## ภาพที่ Codex วาดให้แล้ว (อ่านอย่างเดียว คัดลอกที่ใช้เข้า `img/map-zone1/v5-fx/`)
- รอบ 1 `/Users/agapae/agapae-work/.codex-worktrees/20261105T020534Z-e4155fda/docs/art-reviews/2026-11-05-z1-v5-fluids/` — masks 6 ช่อง (1×/2×), `regions.json` 39 บริเวณ, `fx-layout.json`, sheet `spirit-river` (คุณเป้โอเค), `bank-foam-*`, fog-bank
- รอบ HD `/Users/agapae/agapae-work/.codex-worktrees/20261105T025249Z-3596dfe4/docs/art-reviews/2026-11-05-z1-v5-fluids-hd/` — sheet ชัดขึ้น `lava-surface`, `lavafall-*`, `ice-stream`, `waterfall-ice-*` + **`cloud-sea`** (mask 4 หย่อมรอบประตูสวรรค์) + ก้อนเมฆลอย 4 ก้อน (`driftWorld`, `clipRegion`) · `fx-layout.json` ฉบับนี้ใช้แทนของรอบ 1 สำหรับชนิดที่มีใหม่
  - README ทั้งสองรอบอธิบายวิธีอ่าน mask (coverage grayscale → alpha) และสูตร blend — ทำตาม
- โค้ดเล่น sprite ที่เคยทำในรอบผังใหม่ (อ้างอิงได้ ไม่ต้องใช้ทั้งหมด): `/Users/agapae/agapae-work/.toby-worktrees/z1-fx/src/town-v6-fx.js` (B2 `551b6895`)

## งาน
1. **ตัวเล่นของเหลว/เมฆ** บนแผนที่ v5: เล่นเฟรมที่วาด clip ด้วย mask ตาม `fx-layout.json` · โหลดเฉพาะรอบกล้อง · หยุดเมื่อ pause/แท็บซ่อน · มือถือลื่น (cache mask ต่อ chunk ไม่ composite ทั้งจอทุกเฟรม)
2. **ผสมเฟรม (คุณเป้เลือก "วิธีผสม")**: ระหว่างเฟรมวาด N → N+1 ให้ **crossfade ต่อเนื่อง** (alpha ตามเวลา) ทั้ง loop รวมรอยต่อชุด 4→5 และ 8→1 — แก้อาการกระตุกที่ชุดวาด 2 ชุดต่อกัน (`loop-review` ของรอบ HD เกิน 1.5× ทุกชนิด, เมฆ 4×) · เป็นการผสมระหว่างเฟรมที่ **วาดจริง** ไม่ใช่เลื่อน/เฟดภาพนิ่งเดียว
3. **ปิดของเดิมที่ซ้อน**: effect น้ำ/ลาวาไหลแบบเก่า (`src/town-flow.js`, `flowUrl img/map-zone1/v4/flow-v4.png`, ส่วน water/lava ใน `map-ambient.js`) ในบริเวณที่มี sprite ใหม่ — ห้ามมีสองชั้นทับกัน · หมอกเดิม (`MAP_FX.fog`) ตรวจว่าไม่ซ้อน cloud-sea
4. **หมอกก้อนขาวที่ดู "แปะ"**: คลิปคุณเป้ 10:47 (`Output/Claudy/2026-11-05-map-redraw/input/owner-1047/owner-1047.mp4`) เห็นก้อนหมอกขาวเล็ก ๆ ริมหน้าผาฝั่งน้ำแข็ง/ใกล้แม่น้ำม่วง → ตรวจว่ามาจากชั้นไหน (fog-bank รอบ 1 หรือ ambient เดิม) ถ้าดูเป็นก้อนแปะ ให้ **ปิด** และจดไว้ (เหลือเฉพาะ cloud-sea รอบประตูสวรรค์ + หมอกในหุบที่ดูกลมกลืน)
5. **เงาเมฆบนพื้น** (`src/map-ambient.js` `MAP_FX.cloud`): คุณเป้ "เก็บไว้ อยากให้เมฆสวยขึ้น แน่นขึ้น ความเข้มคงเดิม"
   - **คง `peakByZone.th = .32`** · เปลี่ยนรูปก้อนจาก gradient วงรีเป็น **รูปเมฆจริง** โดยสร้าง mask เงาจาก alpha ของเมฆที่วาดแล้ว (ภาพคุณเป้ #27 `New Pic Map Zone1/ChatGPT Image Nov 4, 2026, 11_29_26 AM.png` + `cloud-01..04` ใน `/Users/agapae/agapae-work/AVEGEE-art-backup/2026-11-05-zone1-new-kit/codex-fx-art-z1/sheets/`) เบลอขอบนุ่ม
   - เพิ่มความหนาแน่น/ความครอบคลุม (cell, oddFill, size) ให้ใกล้ภาพอ้างอิง `New Pic Map Zone1/Screenshot 2569-11-04 at 11.35.16.png` (ผืนเงาใหญ่ขอบนุ่ม) — ดูลักษณะเท่านั้น
   - โซนอื่น (asia/west/cyberhell) ห้ามเปลี่ยนค่า
6. **ตัวโหลดพื้นรองรับ 2×**: `src/zone-skin.js` `th.terrain` (`fullPx`, `chunk`, `repairs`) — ทำให้สลับเป็น `{dir:'img/map-zone1/v7/', fullPx:{w:9830,h:6554}, chunk:2048, repairs:false}` ได้ด้วยการแก้ config ที่เดียว (ตรวจ `town-terrain.js` grid/preview/`DETAIL_FROM`, `town-terrain-repair.js`, minimap, mask ของเหลวที่อิงพิกเซล) · ทดสอบด้วยชุดจำลอง (ขยาย v5 2× ชั่วคราวในโฟลเดอร์ทดสอบ **ห้าม commit ภาพจำลอง**) · ยังใช้ v5 เป็นค่าจริงในรอบนี้
7. **โรงอาหาร `canteen` → ภาพใหม่ #4** (`New Pic Map Zone1/ChatGPT Image Nov 4, 2026, 11_27_46 AM.png`): ล้างขอบ fringe แดง/เหลือง (alpha matte cleanup), ตัด/ย่อเป็น webp, วางที่ตำแหน่งโรงอาหารเดิม (หาว่าวาดจากไหน — `TOWN_HOUSE_SITES[3]` / `zone-skin` art) ขนาดเทียบอาคารรอบข้าง · สถานีอื่น **ใช้ของเดิม**
8. **การตั้งค่า**: เปิด/ปิดชั้นของเหลว-เมฆเคลื่อนไหวอยู่ในตัวเลือก "Weather, cloud shadows, smoke and moving water" เดิม (อย่าเพิ่มเมนูใหม่ถ้าไม่จำเป็น)
9. ทดสอบ: `node --test tests/*.test.mjs > log 2>&1` (ไม่ pipe เข้า tail) 0 fail + เทสต์ใหม่ (mask clip, crossfade ไม่กระโดด, peak เงาเมฆ .32, สลับ config v7) · Playwright desktop + 390 px: fps (เป้า ≥ 50 desktop, ≥ 30 มือถือจำลอง), ไม่มี console error · **คลิปหลักฐาน ≥ 10 วินาที 4 มุม**: ลาวาตก, สะพานกลาง/แม่น้ำม่วง, น้ำตกฟ้า, ประตูสวรรค์ (เมฆม้วน+ก้อนลอย+เงาเมฆ) → `docs/art-reviews/2026-11-05-zone1-v5-fx/`
10. commit + push branch · โน้ต `Output/Toby/2026-11-05-z1-v5-fx.md` (ไฟล์ที่แก้, ผลเทสต์, fps, ข้อไม่แน่ใจ)

## ข้อห้าม
ห้ามแตะ main/merge · ห้ามเปลี่ยนโครงสร้าง walkmask/สถานี/ตำแหน่งอาคาร · ห้ามเปลี่ยนโซน 2–4 · ห้ามวาดภาพใหม่ · ห้ามแก้ `status.json`, `worklog.json`, `work-mode.json` · ห้ามเขียนในโฟลเดอร์คุณเป้/Codex

## เกณฑ์รับงาน
1. ของเหลว/น้ำตก/ลาวาตก/cloud-sea เล่นจากเฟรมวาด อยู่ใน mask ตรงร่อง ไม่มีชั้นเก่าซ้อน · **ไม่กระตุกที่รอยต่อชุด** (crossfade)
2. เงาเมฆรูปเมฆจริง แน่นขึ้น peak .32 เท่าเดิม · โรงอาหารใหม่วางถูกที่ ขอบสะอาด
3. สลับพื้นเป็น v7 ได้ด้วย config ที่เดียว (ทดสอบแล้ว)
4. เทสต์เต็ม 0 fail · fps ผ่าน · คลิป 4 มุม · ไม่มี DOF/parallax · ไฟคบเพลิง/ใบไม้ร่วงเหมือนเดิม
