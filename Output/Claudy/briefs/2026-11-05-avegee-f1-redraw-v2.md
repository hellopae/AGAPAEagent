# F1-REDRAW-v2 — ทำชายแดนโซน 1 ให้ครบ pipeline (ต่อจากภาพร่าง run 27bb6f4e)

Repo: AVEGEE (worktree ของ run นี้) · ห้าม commit/push/merge เอง · **ImageGen ในตัวเท่านั้น** ห้าม Shado
ใบงานเดิม (อ่านทั้งหมด): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-11-05-avegee-f1-redraw.md`
มาตรฐาน: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/2026-11-05-map-redraw/MAP-ART-STANDARD.md`

## ผลรอบแรก (ใช้ต่อ)
run ก่อนหน้า **หยุดหลัง 2 นาที** ได้แค่ภาพร่างแผ่นเดียว 1198×1313 (ฟ้า+ภูเขา+น้ำ+พื้น+ประตูรวมกัน) ที่
`/Users/agapae/agapae-work/.codex-worktrees/20261104T183811Z-27bb6f4e/docs/art-reviews/2026-11-05-frontier1-redraw/terrain-concept-draft.png`
→ ผังและบรรยากาศใกล้เคียงผังคุณเป้แล้ว **ใช้เป็น guide** · คัดลอกเข้ามาในโฟลเดอร์ output ของ run นี้

## ⚠️ ห้ามหยุดที่ภาพร่าง
งานนี้ต้องทำ **ครบทุกขั้นด้านล่างใน run เดียว** (มีเวลา ~30 นาที) ใช้ ImageGen ไม่เกิน ~8 ครั้ง ส่วนที่เหลือเป็นงานสคริปต์ (PIL/numpy/cv2)
ถ้าเวลาไม่พอ ให้เรียงทำตามลำดับ และรายงานว่าค้างขั้นไหน — แต่อย่าจบก่อนพยายามครบ

## ขั้นตอน (ตามลำดับ)
1. **Terrain-only base**: ใช้ ImageGen แก้ภาพร่างเป็นพื้นอย่างเดียว — ลบฟ้า ภูเขา น้ำ ประตูออก พื้นหลังสีเรียบ (เช่นเขียว #00FF00 หรือขาวล้วน) เพื่อตัด alpha
   แก้ขอบหน้าผาและทางเข้าล่างให้ตรงผังคุณเป้ (`input/frontier1-owner-layout.jpg`) ตามที่รอบแรกรายงานว่ายังคลาด
2. **ขยายความละเอียด ≥ 2300 px กว้าง** ด้วยวิธีเดียวกับโซน 1: ภาพฐานร่วม + ImageGen วาดรายละเอียดทีละส่วน (2–4 ส่วน) แล้ว register/ล็อก alpha จากฐาน
   คัดลอกและดัดแปลง `/Users/agapae/Documents/Work PAE/Claude/AVEGEE/layered-map-work/scripts/export-seamless-terrain.py` (อ่านอย่างเดียว — คัดลอกมาไว้ `scripts/` ของ worktree) ซึ่งทำ: รวมรายละเอียดลงพิกัดฐาน → ล็อก alpha → แบ่ง PNG+WebP gutter → ตรวจประกอบทุกพิกเซล
3. **ชั้นที่ไม่ต้องวาดใหม่** — คัดลอกจากโซน 1 `/Users/agapae/Documents/Work PAE/Claude/AVEGEE/layered-map-work/docs/art-reviews/2026-11-04-terrain-seamless/`:
   Sky, `layers/mountains.png` (ภูเขาไฟซ้าย/น้ำแข็งขวา — ตรงผังนี้), แม่น้ำม่วง (ภาพของเหลว + เฟรม loop ใน `flows/`) → ตัด/ปรับให้อยู่ใต้ตลิ่งของพื้นใหม่
4. **ประตูไทย 2 บาน** — ใช้ sprite ประตูที่มีแล้ว (ประตูใหญ่ล่างใน `New-Map-Zone1-ok.jpg` มาจากโฟลเดอร์ `AVEGEE-reference/files/UI New map/New Pic Map Zone1/` หรือ world-kit `heaven-gate`/gate) ปรับขนาดตามผัง ไม่ต้องวาดใหม่ถ้าเข้ามุม
5. ต้นไม้/หิน/พุ่ม/เสาไฟจาก world-kit วางเพิ่มเล็กน้อยบนพื้นทึบ (ไม่บังทางหลัก)
6. ส่งออก: `manifest.json`, `layout.json` (foot), `tile-review.json`, `connection-review.json`, `composite-preview.jpg`, `owner-overlay.jpg`, `terrain-alpha-preview.png`, `index.html` (ยกต้นแบบ terrain-seamless), README
7. ลบภาพทดลองที่ไม่ใช้ · output ≤ 80 MB

## ที่บันทึก
`docs/art-reviews/2026-11-05-frontier1-redraw/` ใน worktree ของ run นี้

## เกณฑ์รับงาน
เหมือนใบงานเดิมข้อ 1–4 — รายงานผ่าน/ไม่ผ่านรายข้อพร้อมหลักฐาน (ไฟล์ + ตัวเลข)
