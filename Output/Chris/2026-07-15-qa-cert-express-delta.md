# Delta re-QA — เว็บแอป "เกียรติบัตร Express" (หลัง Dale แก้ B1+B2)

- **Agent:** Chris (QA & Content Reviewer)
- **วันที่:** 15 กรกฎาคม 2026
- **ประเภท:** Delta re-QA — ตรวจเฉพาะ 2 blocker ที่แก้ (B1, B2) + regression sanity ไม่ทำ 5-suite ใหม่ทั้งหมด (รอบเต็มทำไปแล้ว 14 ก.ค.)
- **URL:** https://hellopae.github.io/CertExpress/ — **bundle ที่เสิร์ฟจริง `index-BnO8hyzo.js`** (ยืนยันจาก `<script src>` ใน index.html และในทุก page load ของ headless Chrome — ไม่ใช่ตัวเก่า `index-B_kkZOng.js` ที่ Chris ตรวจรอบก่อน)
- **วิธีตรวจ:** headless Chrome (puppeteer-core 25.3.0) บน production จริง — (1) รัน `scripts/e2e-pdf.cjs` ของ Dale ซ้ำเอง (poc1.pdf) (2) สคริปต์อิสระของผมเอง `scripts/chris-delta-e2e.cjs` ที่ใช้ fixtures ที่ผมสร้างเอง: PDF ตัวอักษรไทย Sarabun (`chris-thai-names.pdf`), PDF ภาพล้วนไม่มีตัวอักษร (`chris-scanned.pdf`), docx รายชื่อ (`chris-names.docx`) + PasteBox full flow (3) grep bundle จริงที่ curl มา
- **อ้างอิง:** Chris FAIL 14 ก.ค., Dale fix note 15 ก.ค. (commit `b213fff`), Rae copy v5, Mind template doc (changelog 15 ก.ค.)
- **หมวด SOP-08:** B (ภาษาไทย) + C (วัฒนธรรม) + E (web)

---

## Verdict: ✅ PASS (สำหรับ delta — B1 + B2 แก้แล้วยืนยันบน production)

B1 และ B2 แก้เรียบร้อย ยืนยันอิสระบน production แล้ว regression รอบข้างสะอาด **B3 (ปุ่ม LINE) ยังค้าง** ตามที่คาด — ไม่ block delta verdict นี้ แต่ยัง block การเปิดตัวสาธารณะ (ดูกฎ verdict ด้านล่าง)

---

## กฎ verdict ที่ผมใช้ (ระบุชัดตาม SOP-08 — ผมเป็น quality gate)

Delta re-QA รอบนี้ตรวจ **การแก้ 2 blocker (B1, B2) + ว่าการแก้ไม่ทำของเดิมพัง (regression)**. ผมให้ ✅ PASS เมื่อ: (ก) B1 + B2 แก้จริงและยืนยันบน production, (ข) ไม่มี regression ใหม่. **B3 เป็น blocker "เฉพาะการเปิดตัวสาธารณะ" ที่ทราบอยู่แล้วและไม่ได้อยู่ในขอบเขตการแก้รอบนี้** (Dale ตั้งใจไม่แตะ รอ LINE OA URL จาก Kittanate) — ผมจึงไม่นับ B3 เป็นเหตุ FAIL ของ delta นี้ แต่**คงสถานะ B3 ไว้เป็นเงื่อนไขบังคับก่อน go-live**. เว็บนี้ยัง **ห้ามประกาศเปิดตัวสาธารณะ** จนกว่า B3 จะปิด (ตามที่ Dale เองก็เตือน). สรุป: delta ✅ PASS, launch-readiness = ยังไม่พร้อม (ติด B3 + warning legal).

---

## ผลตรวจราย blocker

### B1 — อัปโหลด PDF ตัวอักษร ✅ แก้แล้ว (ยืนยันอิสระ)

**สาเหตุเดิม:** pdfjs-dist 6.x ย้าย `destroy()` จาก doc proxy ไปที่ `loadingTask` → `await doc.destroy()` โยน `TypeError: n.destroy is not a function` หลัง extract สำเร็จ → ตกเข้า catch → map เป็น parseFail ทุกไฟล์

**การแก้ (ตรวจโค้ดจริง `src/parsers/readFile.js:130-136`):** เก็บ ref `loadingTask` แล้วเรียก `await loadingTask.destroy()` (API ถูกของ 6.x) ครอบ try/catch — cleanup ล้มจะ log เฉย ไม่กลบ parse ที่สำเร็จ. logic extraction ไม่ถูกแตะ. เหตุผลถูกต้องตรงกับ API pdfjs 6.x.

**ยืนยันบน production (3 ไฟล์แยกกัน):**
- **`poc1.pdf` ของ Dale เอง** (รัน `scripts/e2e-pdf.cjs` ซ้ำเอง บน URL จริง): → ขั้น 2 = **true** (รอบก่อนเป็น false), พบ 13 แถว, แถบเหลือง pdfAccuracy = **true**, **ไม่มี console error เลย** (รอบก่อนมี `n.destroy`) → ขั้น 3 พบ "กรมท่าทองคำ"
- **PDF ตัวอักษรไทย Sarabun ที่ผมสร้างเอง** (`chris-thai-names.pdf`, 8 ชื่อ, ฟอนต์ Sarabun จริงจาก repo): → ขั้น 2 = **true**, ดึงรายชื่อได้ (เห็น "นายสมชาย ใจดี" ฯลฯ ในตาราง, สระ-วรรณยุกต์ไทย render ถูก), **console errors = 0**, และ**แถบเหลือง pdfAccuracy แสดงจริง** (ยืนยันซ้ำแบบ strip zero-width chars — matched "สลับตำแหน่ง")
- **แถบเหลือง `upload.warning.pdfAccuracy`** แสดงจริงทั้ง poc1.pdf และ PDF ไทยของผม (ข้อความ "ไฟล์ PDF บางไฟล์เก็บตัวอักษรไทยไว้สลับตำแหน่ง...โปรดตรวจรายชื่อในขั้นถัดไป...") — flow ที่ Reese/Rae/Vera ออกแบบไว้ถูกเรียกได้แล้ว (รอบก่อนไม่มีทางถึง)

**Regression บน error path — PDF ภาพล้วน (`chris-scanned.pdf`, vector/ไม่มี text item):** อัปโหลด → **ค้างขั้น 1 พร้อม error `pdfScanned` ถูกต้อง** ("ไฟล์ PDF นี้เป็นภาพสแกน ระบบจึงอ่านตัวหนังสือข้างในไม่ได้ค่ะ...") ไม่มี console error → เงื่อนไข `totalChars < 5 → pdfScanned` (readFile.js:137) ยังทำงานถูก การแก้ B1 ไม่ทำ error path พัง

**หลักฐาน:** `CertExpress/scripts/chris-delta/` (t1-thai-pdf-step2.png, t2-scanned-pdf.png, chris-delta-log.txt) + `CertExpress/scripts/e2e/pdf-prod-*.png` + Dale evidence copy `Output/Dale/cert-express-evidence/`

### B2 — ชื่อ template พรีเมียม 2 ✅ แก้แล้ว (ยืนยันอิสระ)

- **grep bundle จริง (`index-BnO8hyzo.js` ที่ curl จาก production):** "ราชนาวี" = **0 ครั้ง** (หายจาก bundle สนิท), "กรมท่าทองคำ" = **1**, ท้าย desc "งานพิธีการสำคัญ" = **1**
- **ตรวจ source `src/copy.js:126-128`:** `template.premium2.name` = "กรมท่าทองคำ"; `.desc` = "สนามน้ำเงินกรมท่าเข้มขรึม กรอบทองคู่ ดาวประกายแปดแฉก — สง่างามแบบสถาบันสากล คู่ควรมหาวิทยาลัย องค์กรใหญ่ และงานพิธีการสำคัญ" — **ตรง Rae v5 เป๊ะ** (ลงท้าย "งานพิธีการสำคัญ" ตามที่โจทย์กำหนด ไม่ใช่ "ระดับชาติ" ของเวอร์ชันเก่า)
- **บน production ขั้น 3 (headless):** การ์ดพรีเมียมใบ 2 แสดง "กรมท่าทองคำ", ไม่พบ "ราชนาวีทอง" ทั้งหน้า
- **Cross-check เอกสาร Mind** (`Output/Mind/2026-07-13-cert-express-templates.md`): มี changelog 15 ก.ค. บันทึกเปลี่ยน "ราชนาวีทอง" → "กรมท่าทองคำ" ตาม Chris B2, ตาราง §1 อัปเดตเป็น "กรมท่าทองคำ" แล้ว, คง id `p-royal`/รหัส TP-P02/ชื่ออังกฤษ Royal Blue & Gold — **สอดคล้องกับ copy และ artwork ครบ**
- **หมายเหตุ (ไม่ใช่ blocker):** ไฟล์ artwork `src/assets/templates/p-royal.svg` ยังมี comment ภายใน "ชื่อเสนอ: ราชนาวีทอง" — เป็น comment ใน SVG ไม่ render ให้ผู้ใช้เห็นและไม่หลุดขึ้น bundle ที่เสิร์ฟ (grep production = 0) — Dale ตั้งใจไม่แตะ artwork, ยอมรับได้ บันทึกเป็น Note ให้เก็บกวาดรอบทำ foil layer

**คำตัดสินวัฒนธรรม (SOP-08 หมวด C):** "กรมท่า" = ชื่อสีน้ำเงินเข้มในภาษาไทย คงคอนเซปต์สีครบโดยไม่โยงกองทัพเรือ/สถาบัน — ปิดความเสี่ยง B2 ได้ตามคำตัดสินเดิมของผม

### B3 — ปุ่ม LINE ⏳ ยังค้าง (ตามคาด, ไม่ block delta นี้)

- ทุกปุ่ม LINE ยังเป็น `href="#"` — Dale ตั้งใจไม่แตะ รอค่า LINE OA URL จริงจาก Kittanate (Vera §12 Q1)
- **สถานะ:** blocker **เฉพาะการเปิดตัวสาธารณะ** เท่านั้น ไม่ใช่เหตุ FAIL ของ delta re-QA รอบนี้ (อยู่นอกขอบเขตการแก้ B1/B2). ยังต้องปิดก่อน go-live + upsell ควรมี fallback อีเมล (ปัจจุบันมีแค่ปุ่ม LINE เดียว กดแล้วตาย)

---

## Regression sanity (light) — ผ่าน

- **docx (`chris-names.docx`, 6 ชื่อ):** อัปโหลด → ขั้น 2 = true, 8 แถว (6 ชื่อ + หัว + แถวเพิ่ม), console errors = 0 → parser docx (mammoth) ไม่ถูกกระทบจากการแก้ B1 ✓
- **PasteBox → export (full flow):** วางชื่อ → ขั้น 2 → ขั้น 3 เลือกแบบฟรี ("ใช้แบบนี้" + "ถัดไป →") → **ขั้น 4 customize = true → ขั้น 5 preview = true → ขั้น 6 หน้า export = true พร้อมปุ่ม "ดาวน์โหลด PDF ทั้งชุด"** — ครบ 6 ขั้นถึง export, console errors = 0 ✓ (การ export PDF จริงยืนยันไว้แล้วในรอบเต็ม 14 ก.ค. — รอบนี้เช็คว่า flow ยังเดินถึง export ไม่พัง)
- **Console บน main flow:** ทุกเทสต์ที่รัน console error = 0 (รอบก่อน main flow มี error เดียวคือ `n.destroy` จาก B1 ซึ่งหายแล้ว) ✓

---

## Warnings (ยกมาจากรอบก่อน — ยังคงสถานะ)

1. **ถ้อยคำ disclaimer ครุฑ "มีโทษตามกฎหมาย"** — ตำแหน่งแสดงผลถูกแล้ว แต่ตัวถ้อยคำยังรอ legal sign-off ก่อนเปิดตัวสาธารณะ (Reese D1 / Rae note 3) — ไม่ถูกแตะรอบนี้
2. **upsell มีปุ่ม LINE เดียว ไม่มี fallback อีเมล** — ผูกกับ B3 ควรเพิ่มก่อน go-live

---

## สรุปส่งกลับ

**Verdict: ✅ PASS (delta)** — B1 (อัปโหลด PDF) แก้จริง ยืนยันอิสระบน production ด้วย 3 ไฟล์ (poc1.pdf ของ Dale + PDF ไทย Sarabun ของผม + error path PDF ภาพล้วนยัง pdfScanned ถูก) ไม่มี console error; B2 "กรมท่าทองคำ" ขึ้น bundle จริง (`index-BnO8hyzo.js`), "ราชนาวี" หายสนิท 0 ครั้ง, desc ตรง Rae v5 ลงท้าย "งานพิธีการสำคัญ", เอกสาร Mind สอดคล้อง; regression docx + console สะอาด. **ก่อนเปิดตัวสาธารณะยังเหลือ: B3 (ใส่ LINE OA URL + fallback อีเมลใน upsell) และ warning legal sign-off ถ้อยคำครุฑ.**

— Chris, TANAPAT AI Studio
