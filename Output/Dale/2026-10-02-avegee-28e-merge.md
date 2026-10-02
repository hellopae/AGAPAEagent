# AVEGEE 28E — รีวิว + merge (สถานะ: เสร็จ merge + push + live)

## ผลรีวิว (branch `toby/28e` `f044520`, ฐาน `0defd61`) — PASS
| # | เกณฑ์ | ผล |
|---|---|---|
| 1 | ดื่มน้ำมนต์กลางศึกทุกชนิด | ผ่าน — `battleAct('holyWater')` ตัดของ 1, MP +30 (อ่านจาก `ITEMS.holyWater.mp` ไม่ซ้ำเลข), ไม่มีของ/MP เต็ม = คืน false ไม่เสียเทิร์น, **ใช้แล้วเสียเทิร์น** เหมือนน้ำชา/หีบยา · เทสต์ 6 ชนิดศึก |
| 2 | ปุ่มไม่ทับ/ล้น | ผ่านตามรายงาน (วัด 390/360/1280) — CSS ใหม่ 1 บรรทัดใน `src/command-wheel.css` ภายใน `@media(max-width:700px)` เฉพาะ `.options-3` ไม่แตะกฎ 28A (fin-float/สถานี) |
| 3 | ตาราง + อัตราชนะ | ผ่าน — `FOE_SCALE.event.hp` = 1/1.2/1.4/1.6 ที่เดียว · จำลอง: โซน 1–3 100%, ชายแดนโซน 4 86%, ศึกสุดท้าย 82% (เป้า 75–85/70–85) · `betweenWaveHeal` ศึกสุดท้าย 40→30 |
| 4 | วิญญาณขัดขืนไม่มีหน้าต่างรางวัล | ผ่าน — เทสต์เพิ่ม |
| 5 | เทสต์/check | ผ่าน |

## ชื่อไฟล์ไอคอน (ข้อที่ Claudy ให้ตรวจ)
Toby เรียก `itemImg('holyWater')` — `'holyWater'` คือ **คีย์ของ ITEMS** ไม่ใช่ชื่อไฟล์ · ไฟล์มาจาก `ITEMS.holyWater.img = 'item-holywater'` (ตัวเล็กทั้งหมด) ผ่าน `artUrl()` → **`img/item-holywater.png`** ตรวจโดยรัน node ยืนยันแล้ว → ตรงกับที่ Codex จะวาด ไม่ต้องแก้ · (ถ้าโซนมีไฟล์เฉพาะโซนใน ZMAP artUrl จะใช้ตัวนั้นก่อน แต่ปัจจุบันไม่มี) · ตอนนี้ไฟล์ยังไม่มี → `onerror` สลับเป็นป้าย SVG "MP" ไม่พัง · ไม่ใส่ manifest จนกว่าไฟล์จะมี

## Merge
- **Merge commit `ae19464`** (--no-ff) ไม่มี conflict · push `0defd61..ae19464`
- เทสต์บน main: **206/206 ผ่าน** · `node --check src/*.js` ผ่าน · `git diff --check` สะอาด
- Live (https://hellopae.github.io/AVEGEE/): `src/data.js` มี `FOE_SCALE.event` ใหม่ (cyberhell hp 1.6) หลัง deploy ~1.5 นาที · `src/command-wheel.css` live มีกฎใหม่

## ยังไม่ได้ทดสอบ
เล่นศึกสุดท้ายครบ 8 ระลอกผ่านคลิก UI · อุปกรณ์จริง · ภาพวงคำสั่งบน desktop ไม่ครบในเบราว์เซอร์ทดสอบของ Toby (ตรวจแค่ตำแหน่งกล่อง) · Chris/คุณเป้ควรลองเล่นดูความยาก

## Rollback
`git revert -m 1 ae19464`
