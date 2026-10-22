# Toby · AVEGEE P3 — คัตซีนหัวหน้าชม/ตำหนิหลังคำตัดสิน + แก้ดาวโผล่ล่างจอ

branch `toby/p3-verdict-cutscene` · commit `b147caa` (rebase บน origin/main `f777602` แล้ว, push branch แล้ว, ไม่ได้ merge/push main)

## สิ่งที่ build
- **คัตซีนชม**: ได้ห้าดาว (`starsOf` ≥ 90) -> หัวหน้าพูดบท `VERDICT_LINES` + แถบดาว/คะแนน + บรรทัด "ได้รับ ..." ซึ่งรายงานเฉพาะรางวัลที่เกมให้อยู่แล้ว (เบี้ยกรรม +60, กรรมท่านลด, บารมีฟื้น) ซ่อนบรรทัดถ้าไม่มีรางวัล ไม่เพิ่ม/เปลี่ยนตัวเลขใดเลย
- **คัตซีนตำหนิ**: ทุกคำตัดสินแดง (คะแนน < 50 = เงื่อนไขเดียวกับ `DAD.redsToCome`) -> ขั้นบท 1/2/3 ตามจำนวนแดงสะสม ไม่ใช่ตามดาว แล้วเข้าบทลงโทษเดิม (เตือน/ลูกไฟ/พญายมลงมาเอง) ตามเดิม
- ขั้น 1: ตัดบรรทัด `DAD.warn[0]` ("มองเงียบ ๆ") ออกเพราะซ้อนกับบทใหม่ — กล่องเตือนรองรับข้อความว่าง
- คิว: คัตซีนเปิดก่อนกล่องเตือนแดง/ฉากสู้พญายม, ไม่เปิดทับ dialog อื่น (รอ `!dlg.open`), มีปุ่ม "รับทราบ · ข้าม"
- เซฟ/โหลด: ฉากถูกสร้างครั้งเดียวใน `applyVerdict` และเก็บใน save (`pendingVerdictScene`) รางวัลถูกให้ไปแล้วตอนตัดสิน ฉากแค่แสดงผล -> โหลดเซฟกลางฉากไม่ให้ซ้ำ, เปิดฉากแล้วถูกลบ+save ทันที ไม่เล่นซ้ำ
- **แก้ดาว (5.png)**: `.town-view #ov > .score` ย่อรอบจุดสมอ (`transform-origin:0 0`) เหมือน fab อื่น ๆ เดิมย่อรอบกึ่งกลางทำให้เลื่อนไกลตอนซูมสูง · ดาวปกติ (3 ดาว) ลอยเหนือบัลลังก์ทุกระดับซูม (z0/z2/สูงสุด) ทั้ง 1280×720 และ 390×844 · คำตัดสินชม/แดงใช้ดาวในคัตซีนแทน (ไม่วาดป้ายซ้ำ)
- ภาพ: โซน 1 = คู่ Codex `head-th-praise/scold-cutscene-v1.png` · โซน 2–4 ชมใช้ `intro-head-{zone}-v2.png` เดิม, ตำหนิใช้ `head-{zone}-punish-cutscene-v1.png` เดิม — เปลี่ยนที่ `VERDICT_ART` ที่เดียวเมื่อ Codex วาดคู่ใหม่ (ไม่ต้องแตะ logic)
- ข้อเล็ก: `game.js` "ต้องใช้ MP"/"MP −" -> "พลังเวท" (+ ข้อความเบาะแสกานต์ที่เหลืออีกจุด)
- แก้ระหว่างทาง: ดาวในฉากตำหนิต้องเท่าดาวคำตัดสินจริง (30 คะแนน = 1 ดาว) — ตั้ง `stars` หลังคำนวณ `r.stars` ครบ

## ไฟล์ที่แตะ
`src/verdict-scene.js` (ใหม่) · `src/data.js` (VERDICT_LINES ตาม Rae + Reese fix) · `src/game.js` (applyVerdict, snapshot/restore, ข้อความ MP -> พลังเวท, แตะเท่าที่จำเป็น ไม่ยุ่ง ensureDevaCase) · `src/ui.js` · `src/town-map.css` · `index.html` (CSS ฉาก + cache-bust `-p3`, ui.js ลงท้าย `-o2`) · `img/manifest.json` · `img/head-th-praise-cutscene-v1.png` · `img/head-th-scold-cutscene-v1.png` · `tests/p3-verdict-scene.test.mjs` (ใหม่ 14 เทสต์)

## ผลเทสต์
`node --test tests/*.test.mjs` = **1295 pass / 0 fail** (หลัง rebase บน main ที่มี P1+P6)
ระหว่างทางเจอบั๊กของตัวเอง (`undefined === undefined` ทำให้ 6 เทสต์เก่าแดง) แก้แล้วและมีเทสต์กันซ้ำ

## วิธีรัน/ทดสอบเอง
```
cd /Users/agapae/agapae-work/.toby-worktrees/p3 && python3 scripts/serve-nocache.py 8791
# เปิด http://localhost:8791/index.html  (console: window.G)
node --test tests/p3-verdict-scene.test.mjs
```
ลองใน console หลังเข้าเกม (ปิด dialog เปิดบทนำก่อน):
`G.applyVerdict({score:95,stars:5,tham:90,ked:70,karma:0,right:true},G.queue[0],'กระทะทองแดง');G.onChange()` -> คัตซีนชม
`G.applyVerdict({score:30,...},G.queue[0],'x');G.onChange()` ทำซ้ำ 3 ครั้ง (ตั้ง `G.zoneCases.th=0` ทุกรอบกันเหตุการณ์เทวดาแทรก) -> ตำหนิขั้น 1/2/3
หลักฐานภาพ: `/tmp/p3/final/` — ชม, ตำหนิ 1/2/3, โซน 2 (จ้าวเหวิน ชม+ตำหนิ), ดาวปกติซูม 3 ระดับ ทั้ง 1280×720 และ 390×844 (18 ไฟล์) · console ไม่มี error/pageerror (มีแต่ warning Canvas2D ของเดิม) · 404 ของ `audio/*.ogg` และ `img/hero-yama-side.png` มีอยู่ก่อนแล้วใน repo ไม่เกี่ยวกับ P3
หมายเหตุวิธีทดสอบ: ป้ายดาวปกติถูกเรียกจาก `showVerdict` ภายใน ui.js (ไม่ export) — สคริปต์ Playwright ฉีด `window.__showVerdict` ผ่าน route intercept เฉพาะตอนถ่าย ไม่มีในโค้ดที่ commit

## สเปกอาร์ตที่ต้องการเพิ่ม
โซน 2–4 ยังใช้ภาพเดิมแทนคู่ชม/ตำหนิ (รอ Codex หลัง reset): `img/head-{asia|west|cyberhell}-praise-cutscene-v1.png` และ `img/head-{zone}-scold-cutscene-v1.png`, 1672×941, มุมกล้อง/สไตล์เดียวกับ `head-th-*-cutscene-v1.png`, หัวหน้าโซนนั้น (จ้าวเหวิน/ฮาลวาร์/เน็กซาร) แล้วเปลี่ยน path ใน `VERDICT_ART` (`src/verdict-scene.js`)

## สิ่งที่ยังไม่ทำ / ข้อสังเกต
- ภาพโซน 2–4 ตามด้านบน · ภาพตำหนิโซน 2–4 ตอนนี้คือภาพ "ลงโทษ" เดิม (ใช้ได้ แต่ไม่ใช่ภาพ "ตำหนิ" โดยเฉพาะ)
- เสียงจ้าวเหวิน/ฮาลวาร์/เน็กซารเป็นร่างของ Rae รอคุณเป้ยืนยัน (ตามธงในไฟล์บท)
- ถ้ามีคำตัดสินใหม่เกิดขณะคัตซีนก่อนหน้ายังไม่ถูกเปิด (มี dialog อื่นค้าง) ฉากเก่าจะถูกแทนด้วยฉากใหม่ (เก็บล่าสุดเท่านั้น ไม่ทำคิวหลายฉาก) — เกิดยากเพราะฉากเปิดทันทีที่ไม่มี dialog
- มือถือ 390px: ฟองพูดพญายมข้างป้ายดาวบนแผนที่ปกติแคบเพราะ minimap ทับ (พฤติกรรมเดิม ไม่ได้แตะ)
- merge เข้า main ให้ Dale (ผมไม่ได้ merge/push main)
