# ใบงาน K4: AVEGEE — ตัดปุ่ม "ดูแผนที่ทั้งหมด" มุมขวาล่างของหน้าแผนที่ · เจ้าของ Toby

## บริบท
- คุณเป้: "มุมขวาล่าง น่าจะเป็นปุ่มดูแผนที่เต็มๆ ทั้งหมด ซึ่งซ้ำกับ minimap ตัดออกก็ได้"
- ภาพ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-15-avegee-k/k1-codex-tile-map-bad.jpg` และ `k1-old-map-annotated.jpg` — กล่องรูปเสีย (broken image) ขนาดเล็กมุมขวาล่าง ~(1910,1180)
- repo `/Users/agapae/agapae-work/AVEGEE` main `7cafbdb` · อ่าน `docs/ui-work-coordination-2026-10-15.md` ก่อน (Codex app กำลังทำ animation ยม — ห้ามแตะไฟล์ของเขา)

## ขั้นตอน
1. หาว่ากล่องมุมขวาล่างคืออะไรจริง (element / รูปที่โหลดไม่ขึ้น) — ถ้าเป็นปุ่มเปิดแผนที่เต็มที่ซ้ำกับปุ่ม "ทั้งแผนที่" ใน minimap ให้**ลบปุ่มและโค้ดที่ใช้เฉพาะปุ่มนั้น** (ไม่ใช่แค่ซ่อน)
   ถ้าเป็นอย่างอื่น (เช่นปุ่มที่ใช้ทำอย่างอื่น) หยุดแล้วรายงานก่อนลบ
2. ตรวจว่าแผนที่เต็มยังเปิดได้จาก minimap และไม่มี error ใน console
3. cache-bust `-k4` เฉพาะไฟล์ที่แก้ (preload URL กับ import ใน ui.js ต้องตรงกัน) · ปรับเทสต์ regex ถ้าจำเป็น
4. `node --test tests/*.test.mjs` ผ่านหมด → commit บน main → `git pull --rebase` → push → ตรวจ Pages build ตรง SHA

## ข้อห้าม
- แก้เฉพาะปุ่มนี้ · ห้ามแตะ `src/town-*.js`, `img/map-zone1/` (งาน K1) และไฟล์ animation ของยม
- ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ไม่เก็บภาพหลักฐานใน repo ใดๆ (ใช้ /tmp)

## เกณฑ์รับงาน
1. ภาพหน้าแผนที่ก่อน/หลัง (ใน /tmp บอก path) มุมขวาล่างไม่มีกล่องแล้ว · ปุ่ม "ทั้งแผนที่" ใน minimap ยังใช้ได้
2. เทสต์ผ่านหมด (บอกจำนวน) · SHA บน main + Pages built
