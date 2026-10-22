# ใบงาน P6-merge: AVEGEE — รีวิวโค้ด + merge `toby/p6-cauldron-fireball` ขึ้น main (ต่อจาก P1) · เจ้าของ Dale

## บริบท
- ใบงาน: `Output/Claudy/briefs/2026-10-22-avegee-p6-cauldron-fireball.md` · รายงาน Toby: `Output/Toby/2026-10-22-avegee-p6-cauldron-fireball.md`
- branch `toby/p6-cauldron-fireball` `d6bde31` + `c235079` (push แล้ว) ฐาน `a4d26b6` · Toby รายงาน 1,272/0
- เปลี่ยน: กระทะ — ลิ้นไฟวาดมือหลัง/หน้า, วิญญาณกะพริบแดง (บัฟเฟอร์ + source-atop), เหงื่อ, ไอร้อน (`src/pot-souls.js`, `src/room.js`) · มินิเกมลูกไฟ — ไม่ disable ปุ่มช่วงรอ, รับ pointer ทั้งจอฝึก + Space/Enter ทั้งหน้า, ตัดสินที่ `e.timeStamp` (`src/minigames/krata-qte.js`) · ไม่แตะตัวเลขความยาก/รางวัล
- **ทำหลัง P1 merge** — ชนกันที่ index.html: room.js (P1 = `…-p5-p1`, P6 = `…-p5-p6`) → รวม `…-p5-p1-p6` · ui.js ต้องลงท้าย `-o2`

## ขั้นตอน
1. รีวิว: listener ทั้งจอไม่กินคลิกปุ่มปิด/แถบหัว/ปุ่มเลือกคน, cleanup listener ตอนปิดมินิเกม (ไม่รั่วไปหน้าอื่น), Space ไม่ชนคีย์ลัดอื่นของเกมตอนมินิเกมปิด, บัฟเฟอร์แดงใช้ซ้ำ (ไม่สร้าง canvas ทุกเฟรม), reduced-motion
2. ผ่าน → merge (`P6:`) → เทสต์ 0 แดง → push (ห้าม force) → Pages → marker `p6` + `src/pot-souls.js`/`krata-qte.js` โหลด 200 · clone หลักจบบน main สะอาด
3. ข้อใหญ่ → FIX LIST ไม่ merge

## เกณฑ์รับงาน
PASS + merge commit + เทสต์ + Pages + marker — หรือ FIX LIST · รายงาน `Output/Dale/2026-10-22-avegee-p6-merge.md`
