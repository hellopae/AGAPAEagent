# ใบงาน K1e: AVEGEE — วาด sprite ของตกแต่งแผนที่ Zone1 (ปาล์ม โคมทอง คบไฟ ต้นไม้ใบแดง ต้นไม้หิมะ) · suffix `-k1e`

## บริบท
- แผนที่ Zone1 ใหม่ (ภาพวาด + อาคารวางแยก) ทำเสร็จใน K1d — ตอนนี้ ปาล์ม/โคม/คบไฟ เป็นตัวแทนวาดด้วยโค้ด ต้นไม้แดง/หิมะใช้ไทรเดิมย้อมสี
- สเปกเต็ม: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-15-avegee-k1d-map.md` หัวข้อ "สเปกอาร์ต: sprite ที่ต้องให้ Codex วาด" — **อ่านก่อน**
- ภาพอ้างอิง (`/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-15-avegee-k/`):
  `k1-placement-Kittanate.jpg` (คุณเป้วางของ: ปาล์ม+ไทรข้างบันไดกลาง, ขีดเหลือง=โคมทองรอบประตูสวรรค์, ขีดแดง=คบไฟรอบลานกระทะ, ต้นแดงฝั่งลาวา, ต้นขาวข้างประตูน้ำแข็ง) · `k1d-placement-vs-game.jpg` (เกมตอนนี้)
- สไตล์/มุมต้องเหมือน `img/theme-v4/town-tree-th-v1.webp` (ไทรเดิม 1199×1312) และอาคารเมือง — เปิดดูไฟล์นั้นก่อน
- repo `/Users/agapae/agapae-work/AVEGEE` (worktree ของ run นี้) · Codex app กำลังทำ animation ยมอยู่ใน clone อื่น — ไม่เกี่ยวกับใบนี้

## งาน
วาด 5 ไฟล์ พื้นโปร่งใส (RGBA มุมโปร่ง) มองเฉียงจากบน ~30° แสงอุ่นจากซ้ายบน โคน/ฐานอยู่กึ่งกลางล่างของภาพ เห็นโคนชัด ไม่มีเงาพื้นติดมา (เกมวาดเงาเอง):
1. `img/theme-v4/town-palm-th-v1.webp` 1024×1328 — ปาล์มเขียว ลำต้นโค้งเล็กน้อย ทางใบ 8–10
2. `img/theme-v4/town-lamp-gold-th-v1.webp` 512×1112 — เสาโคมทองตั้งพื้นแบบไทย ก้านเทาเงิน โคมเปลวทองสว่างอุ่น
3. `img/theme-v4/town-torch-th-v1.webp` 512×1024 — คบไฟเสาไม้เข้ม เปลวแดง-ส้ม
4. `img/theme-v4/town-tree-red-th-v1.webp` 1199×1312 — ต้นไม้ใบแดงเข้ม/แดงส้ม ลำต้นไม้เข้มธรรมชาติ (เข้ากับป่าแดงฝั่งลาวาในแผนที่)
5. `img/theme-v4/town-tree-snow-th-v1.webp` 1199×1312 — ต้นไม้หิมะ ใบขาวฟ้า มีหิมะบนกิ่ง
- (ถ้าทันเวลา) เปลวแยก `town-lamp-flame-th-v1.webp`, `town-torch-flame-th-v1.webp` 128×192 สำหรับกระพริบ

## เสียบเข้าเกม
- เพิ่ม key ใน `themeArt` (ดูรายงาน Toby ว่าตัวแทนแต่ละตัวอยู่ตรงไหน) แทนตัวแทนวาดด้วยโค้ด/การ tint · เพิ่มใน `img/manifest.json` + preload catalog
- ต้นแดง/หิมะ: เลิก tint ไทรเดิม ใช้ไฟล์ใหม่ · ห้าม `ctx.filter` ต่อเฟรม (กติกา K3)
- cache-bust `-k1e` เฉพาะไฟล์ที่แก้ · `node --test tests/*.test.mjs` ผ่านหมด

## ข้อห้าม
- ห้ามแก้ภาพแผนที่ `img/map-zone1/v2/` ตำแหน่งของ (layout) หรือไฟล์ animation ยม · ห้าม commit/merge/push · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## เกณฑ์รับงาน
1. 5 ไฟล์ขนาดตรงสเปก RGBA มุมโปร่ง สไตล์เข้ากับไทรเดิม (ภาพ contact sheet เทียบข้างไทรเดิม)
2. ภาพในเกม (composite บนแผนที่ด้วย PIL ได้ ถ้าเปิด browser ไม่ได้): ประตูสวรรค์+โคม, ลานกระทะ+คบไฟ, บันไดกลาง+ปาล์ม
3. เทสต์ผ่านหมด · รายงาน prompt จริงทุกภาพ
