# Z1-V5-HD-ASSEMBLE — ประกอบพื้นโซน 1 ความละเอียด 2× ทั้งแผนที่ + ตัดต่อรอยต่อระหว่าง chunk · 5 พ.ย. 2569

Repo: AVEGEE (worktree ของ run นี้ แตกจาก main `812152d2`) · **ห้ามวาดใหม่ด้วย ImageGen** ยกเว้นซ่อมรอยต่อที่ตัดต่อไม่ได้จริง (≤ 4 ครั้ง, ระบุใน README) · ห้าม commit/push/merge เอง

## แหล่งภาพ (อ่านอย่างเดียว)
- r2-c3: `/Users/agapae/agapae-work/.codex-worktrees/20261105T025229Z-00c52f6e/docs/art-reviews/2026-11-05-z1-v5-plaza-detail/` (`tiles-2x2/*-native.webp`, `registration.json`)
- chunk อื่น 19 ชิ้น: ผลของ run ชุด Z1-V5-HD-FULL 1–8 (รายการ worktree ท้ายใบงาน) → `docs/art-reviews/2026-11-05-z1-v5-hd-full/<chunk>/` (`q*-native.webp`, `registration.json`, `<chunk>-2x.webp`)
- v5 เดิม: `img/map-zone1/v5/` + repairs (`src/town-terrain-repair.js`) — ใช้เป็น **fallback** สำหรับส่วนที่ run ใดค้าง (ขยาย 2× Lanczos) และระบุใน README ว่าส่วนไหนเป็น fallback

## ขั้นตอน
1. วาง native ทุกส่วนลง master 2× **9830×6554** ตาม registration (พิกัด 1× × 2)
2. ตัดต่อรอยต่อ **ระหว่าง chunk และระหว่าง run** ด้วย min-cost seam ในช่วงขอบซ้อน + เบลนด์ feather บาง ๆ (วิธีเดียวกับต้นแบบ plaza-detail) · ปรับความต่างสี/ความสว่างเล็กน้อยเฉพาะในแถบรอยต่อ (ห้ามปรับทั้งภาพ)
3. ตรวจ: `seam-check/` ภาพทุกรอยต่อแนวตั้ง 4 เส้น + แนวนอน 3 เส้น (ขยายเต็มที่ 2×) · `structure-check.jpg` + `structure.json` (ขอบลาน บันได หน้าผา ตลิ่ง สะพาน ≤ 4 px 1×, เทียบ walkmask `src/town-walkmask.js`) · `sharpness.json` ต่อ chunk เทียบ v5
4. ส่งออกพร้อมใช้ในเกม → `docs/art-reviews/2026-11-05-z1-v5-hd-assemble/v7/`
   - `r{1-4}-c{1-5}.webp` grid เดียวกับ v5 ที่ chunk 2048 px (คอลัมน์สุดท้าย 1638, แถวสุดท้าย 410) · webp q≈90 · **ไม่ต้องมี repairs แล้ว** (ซ่อมอยู่ในภาพ)
   - `zone1-terrain-v7-preview.webp` 1536×1024 · `manifest.json` (`fullPx {w:9830,h:6554}`, `chunk:2048`, รายการไฟล์+ขนาด+SHA256)
   - ขนาดรวม v7 ≤ 40 MB (บอกตัวเลขจริง)
5. `overview.jpg` ทั้งแผนที่ย่อ · `compare-zoom/` 6 มุม (ลานหลัก สะพานกลาง ฝั่งลาวา ฝั่งน้ำแข็ง ประตูสวรรค์ ลานใต้) v5 | v7 ที่ซูมเกม 2.8 px/หน่วย
6. README ไทย: ส่วนที่เป็น fallback, รอยต่อที่ยังเห็น, ImageGen ที่ใช้ซ่อม (ถ้ามี)

## ข้อห้าม: ห้ามแก้ `src/` `tests/` `img/` เดิม · ห้ามเปลี่ยนรูปทรงพื้น · ห้าม DOF/parallax/ปรับสีทั้งภาพ · ห้ามแตะโฟลเดอร์คุณเป้

## เกณฑ์รับงาน
1. v7 ครบ 20 ชิ้น + preview + manifest · ≤ 40 MB
2. ไม่เห็นรอยต่อระหว่าง chunk ที่ซูมเกม · structure ≤ 4 px
3. ระบุ fallback/ข้อค้างตามจริง

## worktree ของ run ชุด HD-FULL (เติมโดยตัวคุมคิว)
