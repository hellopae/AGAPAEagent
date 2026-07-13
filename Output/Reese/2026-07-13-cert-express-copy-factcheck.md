# Fact-check Report: UI Copy "เกียรติบัตร Express" (Rae)

- **Agent:** Reese (Fact-check mode)
- **วันที่:** 13 กรกฎาคม 2026
- **เอกสารที่ตรวจ:** `Output/Rae/2026-07-13-cert-express-ui-copy.md` (163 strings)
- **เอกสารเทียบ:** `Output/Reese/2026-07-13-cert-express-research.md`, `CLAUDE.md` (ข้อมูลบริษัท)
- **สัญลักษณ์:** ✅ VERIFIED / ⚠️ UNVERIFIED / ❌ INCORRECT / 💬 OPINION

---

## Overall Verdict: ✅ PASS (แบบมีเงื่อนไข)

**ไม่พบ ❌ INCORRECT** — ไม่มีข้อความที่ขัดกับหลักฐานที่ตรวจสอบแล้ว
แต่มี **3 จุดที่แนะนำแก้ copy ตอนนี้** (ก่อนส่ง Vera/Dale) และ **ชุดเงื่อนไขบังคับ** ที่ Dale/Chris/Kittanate ต้องปิดก่อน ship — รายละเอียดท้ายรายงาน

หมายเหตุวิธีตรวจ: UI copy ส่วนใหญ่ (ปุ่ม, label, placeholder, คำแนะนำขั้นตอน) เป็นข้อความเชิงใช้งาน ไม่ใช่ factual claim — ผ่านโดยไม่ต้อง verify รายงานนี้ inventory เฉพาะข้อความที่ "อ้างข้อเท็จจริง / สัญญาพฤติกรรมระบบ / อ้างกฎหมาย-ธรรมเนียม-ตัวเลข" ครบทุกข้อ (ทำ inventory เองทั้งฉบับ ไม่ยึดแค่ 8 จุดที่ Rae ระบุ)

---

## Claim Inventory + Verdict รายข้อ

### กลุ่ม A — เคลมความเป็นส่วนตัว (client-side)

| # | Key | เคลม | Verdict |
|---|---|---|---|
| A1 | `app.privacyBadge` | "รายชื่อไม่ถูกอัปโหลดไปที่ไหน ทุกขั้นตอนทำงานบนเครื่อง" | ✅ VERIFIED **แบบมีเงื่อนไข** |
| A2 | `landing.privacyLine` | "ไม่ถูกส่งขึ้นเซิร์ฟเวอร์ใด ๆ ประมวลผลในเบราว์เซอร์ / ปิดหน้าเว็บแล้วข้อมูลหาย" | ✅ VERIFIED **แบบมีเงื่อนไข** |
| A3 | `upload.privacyReminder` | "ไฟล์ถูกอ่านบนเครื่องเท่านั้น" | ✅ VERIFIED **แบบมีเงื่อนไข** |
| A4 | `footer.privacy` | "เว็บนี้ไม่เก็บไฟล์และรายชื่อ" | ✅ VERIFIED **แบบมีเงื่อนไข** |

**เหตุผล:** สถาปัตยกรรมที่เลือก (Vite+React บน GitHub Pages, parser ทั้งหมด — mammoth/SheetJS/pdf.js/pdfmake — เป็น pure client-side JS ตาม research Q7) ทำให้เคลมนี้ **เป็นจริงได้** โดยไม่ต้องมี server ใด ๆ

**เงื่อนไขที่ Dale ต้องรักษา (invariants — ผิดข้อใดข้อหนึ่ง = เคลมทั้งกลุ่มเป็นเท็จทันที):**
1. **ห้ามใส่ analytics ที่ส่งเนื้อหาไฟล์/รายชื่อ/ข้อความที่ผู้ใช้กรอกออกนอกเครื่อง** — ถ้าจะมี analytics ได้แค่ page-view/event นับจำนวน (ไม่มี payload เนื้อหา) และต้องปรับถ้อยคำ badge เป็น "รายชื่อของคุณไม่ถูกส่งออกจากเครื่อง" + เปิดเผยว่ามี analytics
2. **ห้ามโหลดฟอนต์แบบ subset ผ่าน CDN ที่ URL มีเนื้อหาผู้ใช้** (เช่น Google Fonts `text=` parameter ที่ฝังชื่อคน) — ฟอนต์ทุกไฟล์ต้อง **self-host บน Pages** ทั้งฟอนต์ UI และฟอนต์ที่ฝังใน PDF
3. **ห้ามส่งเนื้อหาไฟล์เข้า API ภายนอก** ทุกกรณี (รวม error reporting เช่น Sentry ที่อาจแนบ state — ถ้าใช้ ต้อง scrub payload)
4. **ห้ามเก็บรายชื่อลง localStorage/IndexedDB ข้าม session** ถ้าจะคงประโยค "ปิดหน้าเว็บเมื่อไหร่ ข้อมูลก็หายไป" (A2) — ถ้า Dale อยากทำ auto-save กันหน้าหลุด ต้องแก้ประโยคนี้
5. ปุ่ม LINE OA / mailto (ขั้น 3, 6) ไม่นับว่าละเมิด เพราะผู้ใช้กดส่งเอง — แต่ **prefill ต้องไม่แนบรายชื่อผู้รับ** (ปัจจุบัน prefill ของ Rae แนบแค่ชื่อ template + {count} — ผ่าน)

| # | Key | เคลม | Verdict |
|---|---|---|---|
| A5 | `error.offlineNote` | "หลังโหลดครั้งแรก ทำงานต่อได้แม้เน็ตหลุด" | ⚠️ **UNVERIFIED — ค่า default คือ "อย่าใส่ใน MVP"** |

**เหตุผล A5 (จุดเสี่ยงที่สุดในเอกสาร):** ข้อความนี้**ขัดกับ bundle strategy ที่ Reese แนะนำและ Dale จะใช้** — dynamic import ราย parser + โหลด pdfmake/ฟอนต์เฉพาะขั้น Export หมายความว่า ถ้าเน็ตหลุดหลังเปิดหน้าแรก ผู้ใช้จะ**อัปโหลดไฟล์หรือ export ไม่ได้เลย** (chunk ยังไม่ถูกดึงมา) เคลมนี้จะจริงได้ต่อเมื่อ Dale ทำ **service worker precache ครบทุก chunk + ฟอนต์ทุกไฟล์** ซึ่งเกินขอบเขต MVP ตามแผนปัจจุบัน — Rae hedge ไว้แล้วว่า "ถ้า Dale ยืนยันพฤติกรรมจริง" จึงไม่นับเป็น ❌ แต่ **คำแนะนำของ Reese: ตัด string นี้ออกจากชุด MVP** แล้วค่อยเพิ่มกลับถ้า Dale ทำ offline support จริง

### กลุ่ม B — เคลมเกี่ยวกับ TANAPAT

| # | Key | เคลม | Verdict |
|---|---|---|---|
| B1 | `landing.trust`, `upsell.body` | "มานานกว่า 40 ปี" | ✅ VERIFIED ตามข้อมูลภายใน — CLAUDE.md ระบุ "Founded: 40+ years ago" ถ้อยคำ "มานานกว่า 40 ปี" สอดคล้องกับ "40+" พอดี **แต่ mark รอ Kittanate ยืนยันเลขจริง** ถ้าอนาคตจะใช้เลขปีเป๊ะ (เช่น "42 ปี") ต้องได้เลขจาก Kittanate ก่อน |
| B2 | `landing.trust`, `upsell.body` | "พิมพ์เกียรติบัตรให้สถาบันไทย(มาตลอด)" | ⚠️ UNVERIFIED — CLAUDE.md ยืนยันแค่ "Commercial printing, institutional printing" ไม่ได้ระบุว่าพิมพ์**เกียรติบัตร**มาตลอด 40 ปี → ขอบเขตงานต้องให้ Kittanate ยืนยัน (คาดว่าจริง แต่ยังไม่มีหลักฐาน) |
| B3 | `upsell.body`, `footer.upsellLine` | บริการ "กระดาษอาร์ตอย่างหนา ปั๊มฟอยล์ทอง ส่งถึงที่" | ⚠️ UNVERIFIED — เป็นรายการบริการ/สเปกที่ Kittanate ต้องยืนยันว่ารับทำจริงทุกอย่าง (โดยเฉพาะปั๊มฟอยล์ทองและบริการจัดส่ง) ก่อน ship |
| B4 | `footer.credit` | "โรงพิมพ์ TANAPAT กรุงเทพฯ" | ✅ VERIFIED — CLAUDE.md: Location: Bangkok, Thailand |
| B5 | `app.by`, `landing.subhead` | "ฟรี ไม่ต้องสมัครสมาชิก" | ✅ VERIFIED ตามข้อมูลภายใน — เป็น product decision ใน concept ของ Minnie/แผน MVP (ไม่มีระบบบัญชี) — Chris ตรวจซ้ำตอน build ว่าไม่มี login จริง |

### กลุ่ม C — เคลมความสามารถทางเทคนิค

| # | Key | เคลม | Verdict |
|---|---|---|---|
| C1 | `landing.subhead`, `upload.fileTypes` | รองรับ .docx / .xlsx / .pdf แบบตัวอักษร | ✅ VERIFIED ตาม stack ที่เลือก (mammoth = docx, SheetJS = xlsx, pdf.js = text-based PDF — research Q4–Q6) หมายเหตุ: SheetJS อ่าน .xls เก่าได้ด้วย ถ้า Dale เปิดรับ .xls ให้แก้ copy ตาม — ตอนนี้เขียนแคบกว่าความสามารถจริง ซึ่ง**ปลอดภัย ไม่ใช่ข้อผิด** |
| C2 | `upload.error.docOld` | ".doc เป็น Word รุ่นเก่า ระบบอ่านไม่ได้" + วิธีแปลงเป็น .docx (File → Save As) | ✅ VERIFIED — mammoth.js รองรับเฉพาะ .docx ([mammoth npm](https://www.npmjs.com/package/mammoth)) และขั้นตอน Save As เป็นวิธีมาตรฐานของ Word จริง |
| C3 | `upload.error.pdfScanned` | "PDF ภาพสแกน อ่านตัวหนังสือไม่ได้" | ✅ VERIFIED — pdf.js ดึง text จาก PDF สแกนไม่ได้หากไม่มี OCR (research Q6) |
| C4 | `upload.warning.pdfAccuracy` | "PDF บางไฟล์เก็บตัวอักษรไทยสลับตำแหน่ง สระ/วรรณยุกต์ที่ดึงมาเพี้ยนได้" | ✅ VERIFIED — ตรงกับ [pdf.js #17191](https://github.com/mozilla/pdf.js/issues/17191), [#14493](https://github.com/mozilla/pdf.js/issues/14493) (getTextContent คืนลำดับตามที่เก็บในไฟล์ ไม่ใช่ลำดับการอ่าน) **ถ้อยคำไม่เกินหลักฐาน** — ใช้คำว่า "บางไฟล์...เพี้ยนได้" ไม่ใช่ "ทุกไฟล์เพี้ยน" ถูกระดับพอดี และการแสดง warning ทุกครั้งที่ input เป็น PDF สมเหตุสมผล |
| C5 | `export.summary` | "ฝังฟอนต์ไทยเรียบร้อย เปิดเครื่องไหนตัวหนังสือก็ไม่เพี้ยน" | ⚠️ UNVERIFIED จนกว่า **POC-1 ผ่าน** — pdfmake/PDFKit ฝังฟอนต์+subset ได้จริง ([fontkit](https://github.com/foliojs/fontkit)) แต่ "ไม่เพี้ยน" กับภาษาไทยต้องพิสูจน์ด้วยชุดสตริงทดสอบก่อน และ**ถ้าสลับไป Plan B (raster)** ประโยค "ฝังฟอนต์" จะไม่ตรงความจริง ต้องแก้ copy เป็นเวอร์ชันภาพ |
| C6 | `export.success.body` | คำแนะนำพิมพ์ "A4 แนวนอน ขนาดจริง 100% ไม่ย่อหน้ากระดาษ" | ✅ VERIFIED — เป็นแนวปฏิบัติมาตรฐานการพิมพ์เอกสารขนาดตายตัว (ปิด fit-to-page เพื่อไม่ให้สเกลเพี้ยน) สอดคล้องสเปก A4 แนวนอนที่ล็อกไว้ (research Q11–Q12) |
| C7 | `export.error.failed` | สาเหตุ "หน่วยความจำเบราว์เซอร์ไม่พอ" + ทางแก้ปิดแท็บ/แบ่งชุด | ✅ กลไกสมเหตุสมผล (client-side generation ใช้ RAM จริง) — แต่ดูตัวเลข F1 ข้างล่าง |
| C8 | `export.loading.note`, `export.startOver.confirm` | "ไฟล์สร้างบนเครื่องคุณ" / "PDF ที่ดาวน์โหลดแล้วยังอยู่ในเครื่อง" | ✅ VERIFIED — ตรงตามพฤติกรรม client-side + ไฟล์ที่ดาวน์โหลดแล้วไม่ถูกลบโดยเว็บ |

### กลุ่ม D — เคลมกฎหมาย

| # | Key | เคลม | Verdict |
|---|---|---|---|
| D1 | `customize.logo.disclaimer` | "ตราครุฑ กฎหมายสงวนไว้สำหรับหน่วยงานที่ได้รับสิทธิ ผู้ไม่มีสิทธินำไปใช้มีโทษตามกฎหมาย" | ✅ VERIFIED — พ.ร.บ.เครื่องหมายครุฑพ่าห์ พ.ศ. 2534 มีบทลงโทษจริง (จำคุกไม่เกิน 1 ปี/ปรับไม่เกิน 6,000 บาท/ทั้งจำทั้งปรับ — [วิกิซอร์ซ](https://th.wikisource.org/wiki/พระราชบัญญัติเครื่องหมายครุฑพ่าห์_พ.ศ._2534)) ถ้อยคำ Rae **ไม่อ้างเลขมาตรา ไม่ระบุโทษเป็นตัวเลข** = อยู่ในขอบเขตหลักฐานพอดี ตามที่ Reese แนะนำ — **คงเงื่อนไขเดิม: ผ่านความเห็นทางกฎหมายก่อน finalize** (โดยเฉพาะส่วนลายเซ็น ที่โยงประมวลกฎหมายอาญาซึ่งยังไม่ได้ตรวจมาตรา) |

### กลุ่ม E — ธรรมเนียม / ภาษา / วันที่

| # | Key | เคลม | Verdict |
|---|---|---|---|
| E1 | `cert.default.buddhist.blessing` | สำนวน "ขออำนาจคุณพระศรีรัตนตรัย...เจริญด้วยอายุ วรรณะ สุขะ พละ ปฏิภาณ ธนสารสมบัติ" | ✅ VERIFIED — เป็นสำนวนอวยพรตามธรรมเนียมที่ใช้แพร่หลายจริงในบริบทวัด/ทางการ: จตุรพิธพร (อายุ วรรณะ สุขะ พละ) + ส่วนขยาย "ปฏิภาณ ธนสารสมบัติ" พบใช้โดยวัด ([วัดศรีเอี่ยม](https://www.facebook.com/WatSriapiwan1/videos/831124484594979/)) หน่วยงานรัฐ ([รัฐสภา](https://web.parliament.go.th/view/52/news_detail/กิจกรรมคุณธรรม/2267/TH-TH), [ม.ธรรมศาสตร์](http://psm.tu.ac.th/main.php?page_name=article.detail&id=22)) และมีคำอธิบายความหมายจากแหล่งธรรมะ ([mahavanadhutanka.org](https://www.mahavanadhutanka.org/post/อายุ-วรรณะ-สุขะ-พละ-หมายความว่าอย่างไร), [MGR Dhamma](https://mgronline.com/dhamma/detail/9580000049267)) — **ยังคงส่ง Chris ตรวจความเหมาะสมกับใบอนุโมทนาโดยเฉพาะ** ตามที่ Rae ขอ (Reese ยืนยันได้แค่ว่า "สำนวนมีจริง ใช้จริง") |
| E2 | `cert.default.*.dateLine`, `customize.date.placeholder`, `customize.event.placeholder` | พ.ศ. ๒๕๖๙ สำหรับ 13 ก.ค. 2026 / ปีการศึกษา ๒๕๖๙ | ✅ VERIFIED — 2026 + 543 = 2569 ถูกต้อง และเดือนกรกฎาคมอยู่ในปีการศึกษา ๒๕๖๙ (เปิดเทอม พ.ค. 2569) |
| E3 | `cert.sampleName` | คำนำหน้า "ว่าที่ร้อยตรีหญิง" | ✅ VERIFIED — เป็นยศที่มีจริงในระบบไทย ใช้เป็น edge case ทดสอบชื่อยาวได้เหมาะสม |
| E4 | `cert.default.formal.certify` ฯลฯ | สำนวน "ขอมอบเกียรติบัตรฉบับนี้ไว้เพื่อแสดงว่า / ให้ไว้ ณ วันที่" | 💬 OPINION/ธรรมเนียม — เป็นสำนวนมาตรฐานเกียรติบัตรไทยที่พบทั่วไป ไม่มีระเบียบบังคับ (สอดคล้อง research Q11 ที่ไม่พบระเบียบราชการกำหนด) — ให้ Chris ตรวจความสละสลวยรอบ QA |
| E5 | `cert.default.buddhist.org` | ชื่อตัวอย่าง "วัดสุวรรณารามวรวิหาร" | ⚠️ **ชนกับวัดจริง** — มี "วัดสุวรรณารามราชวรวิหาร" (พระอารามหลวง บางกอกน้อย กรุงเทพฯ) อยู่จริง ชื่อตัวอย่างต่างแค่คำว่า "ราช" การใช้ชื่อเกือบตรงกับวัดจริงบน default ของใบอนุโมทนา เสี่ยงสื่อว่าวัดนั้นเกี่ยวข้อง → **แนะนำแก้เป็นชื่อสมมติชัด ๆ** เช่น "วัดสุวรรณโชติการาม" (ตรวจแล้วไม่ควรชนวัดดัง — Chris เช็คซ้ำ) หรือใช้รูปแบบ "วัด________" |

### กลุ่ม F — ตัวเลข / placeholder ที่ยังไม่มีค่าจริง

| # | Key | เคลม | Verdict |
|---|---|---|---|
| F1 | `export.error.failed` | "แบ่งรายชื่อเป็นชุดละไม่เกิน 100 คน" | ⚠️ UNVERIFIED — Rae ยอมรับเองว่าเป็นเลขสมมติ **ห้าม ship เลข 100 แบบ hardcode** → แนะนำแก้ copy ตอนนี้เป็น `{batchSize}` แล้วให้ Dale เติมจากผลทดสอบจริง (memory stress test ตอน POC/QA) |
| F2 | `upload.error.tooLarge` | `{maxSize}` MB | ✅ รูปแบบถูกต้องแล้ว (เป็น placeholder อยู่แล้ว) — เงื่อนไข: Dale กำหนดค่าจากการทดสอบ ห้ามเดา |
| F3 | `customize.logo.hint` / `customize.logo.error.small` | "อย่างน้อย 500 พิกเซล จะได้คมชัด" / เตือนต่ำกว่า 200 พิกเซล | 💬 OPINION (heuristic สมเหตุสมผล) — ที่ 300dpi โลโก้พิมพ์ ~4 ซม. ต้องการ ~470px ดังนั้น 500px เป็นเกณฑ์แนะนำที่ยืนได้ ส่วน threshold 200px เป็นค่าที่ Dale/Vera ปรับได้ตามขนาดโลโก้จริงบน template — ไม่ใช่ข้อเท็จจริงตายตัว ไม่ต้องแก้ |
| F4 | `{LINE_OA_URL}`, `{CONTACT_EMAIL}` | — | ⚠️ รอค่าจริงจาก Kittanate (Rae ระบุไว้ถูกต้องแล้ว) — Chris ตรวจตอน build ว่าไม่หลุด placeholder ขึ้น production |

### กลุ่ม G — สัญญาพฤติกรรมระบบ (behavioral contract ที่ copy ผูกไว้)

| # | Key | เคลม | Verdict |
|---|---|---|---|
| G1 | `preview.instruction` | "ย้อนกลับไปแก้ได้ รายชื่อและข้อความไม่หายแน่นอน" | ⚠️ เงื่อนไข build — Dale ต้อง implement state คงอยู่ตอนย้อนขั้นตอนจริงทุกเส้นทาง (คำว่า "แน่นอน" ผูกมัดแรง) — Chris ทดสอบ back-navigation ทุกขั้น |
| G2 | `review.instruction` | "ชื่อในตารางจะปรากฏบนเกียรติบัตรตรงตามที่เห็นทุกตัวอักษร" | ⚠️ เงื่อนไข build — ห้ามมี transformation ใด ๆ (trim/normalize) หลังขั้น 2 โดยผู้ใช้ไม่เห็น — ระวังการ normalize สระอำ (ํ+า) ใน pipeline (research Q10 ข้อ 1) ที่อาจเปลี่ยน codepoint โดยตาเห็นเหมือนเดิม — Dale บันทึกพฤติกรรมนี้ใน POC |
| G3 | `error.generic` | "รายชื่อที่วางจาก clipboard วางซ้ำได้ทันที" | ✅ สมเหตุสมผล — เนื้อหาใน clipboard ของผู้ใช้ไม่หายเมื่อเว็บ crash (แต่ถ้าคัดลอกอย่างอื่นทับไปแล้วก็ไม่จริง — ถ้อยคำปัจจุบันรับความเสี่ยงได้ ไม่บังคับแก้) |
| G4 | `landing.how.2`, `template.free1–3` | "ฟรี 3 แบบ" + คำอธิบาย template ทั้ง 3 | ⚠️ เงื่อนไข build — template ยังไม่ถูกออกแบบ (Vera/Mind) คำอธิบาย (โทนครีม-ทอง, ลายไทยน้ำตาล-ทอง, โมเดิร์น) เป็น **spec ล่วงหน้า** — Chris ตรวจตอน QA ว่า copy ตรงกับ template จริง และจำนวน "3 แบบ" ตรงกับที่ ship |
| G5 | `export.summary` | "ขนาด A4 แนวนอน รวมเป็น PDF ไฟล์เดียว" | ✅ ตรงสเปกที่ล็อกไว้ (research Q11: A4 แนวนอนเป็นธรรมเนียม — copy ไม่ได้เคลมว่า "ตามระเบียบ" = ถูกระดับ) |

### กลุ่ม H — ข้อความการตลาด / ความเห็น (ผ่านโดยไม่ต้อง verify)

| # | Key | หมายเหตุ |
|---|---|---|
| H1 | `app.tagline` "พร้อมพิมพ์ในไม่กี่นาที" | 💬 OPINION การตลาด — เป็นไปได้จริงตาม flow แต่ไม่ใช่ factual claim ที่วัดได้ ผ่าน |
| H2 | `upsell.body` "สีคมกริบสมศักดิ์ศรีผู้รับ" | 💬 OPINION ผ่าน |
| H3 | `upload.error.unsupported` "เร็วพอกัน", `template.premium.lockBody` "ตอบไวในเวลาทำการ" | 💬 OPINION/service promise — "ตอบไวในเวลาทำการ" ให้ Kittanate รับทราบว่าเป็นคำสัญญาบริการ |
| H4 | `template.instruction` "ออกแบบตามธรรมเนียมเกียรติบัตรสถาบันไทย" | 💬 ใช้คำ "ธรรมเนียม" ไม่ใช่ "ระเบียบ/มาตรฐานราชการ" — ถูกต้องตามข้อจำกัดหลักฐาน (research Q11) ชมว่าเลือกคำระวังดี |

---

## สรุปการดำเนินการ

### 1) แก้ copy ตอนนี้ (Rae — ก่อนส่ง Vera/Dale)

| ลำดับ | รายการ | การแก้ |
|---|---|---|
| 1 | `error.offlineNote` (A5) | **ตัดออกจากชุด MVP** — ขัดกับ lazy-load strategy; ใส่กลับได้เฉพาะเมื่อ Dale ทำ service worker precache แล้วทดสอบ offline จริงผ่าน |
| 2 | `export.error.failed` (F1) | เปลี่ยน "100 คน" เป็น `{batchSize}` — ห้าม hardcode เลขสมมติ |
| 3 | `cert.default.buddhist.org` (E5) | เปลี่ยนชื่อวัดตัวอย่างไม่ให้ชน "วัดสุวรรณารามราชวรวิหาร" (วัดจริงในกรุงเทพฯ) |

ทั้ง 3 ข้อเป็นการแก้เชิงป้องกัน ไม่ใช่ ❌ (ข้อ 1 Rae hedge ไว้แล้ว, ข้อ 2 Rae flag เองแล้ว, ข้อ 3 เป็น collision ที่เพิ่งพบ) — จึงไม่ทำให้ overall เป็น FAIL

### 2) เงื่อนไขส่งต่อ Dale (ตรวจตอน build — ผูกกับความจริงของ copy)

- **Privacy invariants 5 ข้อ** (กลุ่ม A): ไม่มี analytics ที่ส่งเนื้อหา, ฟอนต์ self-host ทั้งหมด (ห้าม CDN subset ที่ฝังข้อความผู้ใช้), ไม่ส่งเนื้อหาเข้า API ภายนอก/error reporting, ไม่ persist รายชื่อข้าม session, prefill LINE/email ไม่แนบรายชื่อผู้รับ
- `{maxSize}` และ `{batchSize}`: กำหนดจากการทดสอบจริง ไม่เดา
- `export.summary` (C5): ใช้ได้ต่อเมื่อ POC-1 ผ่านด้วย pdfmake — ถ้าสลับ Plan B (raster) ต้องแจ้ง Rae แก้ประโยค "ฝังฟอนต์ไทย"
- G1/G2: state persistence ตอนย้อนขั้น + ห้าม transform ชื่อหลังขั้น 2 (ระวัง normalize สระอำ)
- ถ้าเปิดรับ .xls เก่า (SheetJS ทำได้) ให้แจ้ง Rae อัปเดต `upload.fileTypes`

### 3) เงื่อนไขส่งต่อ Chris (QA gate)

- E1: ความเหมาะสมของสำนวนพรกับ**ใบอนุโมทนา**โดยเฉพาะ (สำนวนยืนยันแล้วว่ามีจริง/ใช้จริง)
- E4: ความสละสลวยสำนวนทางการทั้งชุด default
- G4: copy คำอธิบาย template ตรงกับงานออกแบบจริงของ Vera/Mind + เลข "3 แบบ" ตรง
- F4: ไม่มี placeholder (`{LINE_OA_URL}`, `{CONTACT_EMAIL}`, `{batchSize}`, `{maxSize}`) หลุดขึ้น production
- D1: ถ้อยคำ disclaimer ครุฑ/ลายเซ็น ผ่านความเห็นทางกฎหมายก่อน finalize

### 4) รอ Kittanate ยืนยัน

- B1: เลขปีจริงของ TANAPAT (ถ้อยคำ "กว่า 40 ปี" ใช้ได้ตามข้อมูลภายในไปก่อน)
- B2: ขอบเขต "พิมพ์เกียรติบัตรให้สถาบันไทย" มาตลอดจริงไหม
- B3: บริการปั๊มฟอยล์ทอง/กระดาษอาร์ตหนา/จัดส่ง รับทำจริงครบทุกข้อ
- F4: ค่าจริง `{LINE_OA_URL}`, `{CONTACT_EMAIL}` + รับทราบคำสัญญา "ตอบไวในเวลาทำการ" (H3)

---

## Sources หลักที่ใช้ในรอบนี้

- [pdf.js #17191](https://github.com/mozilla/pdf.js/issues/17191), [pdf.js #14493](https://github.com/mozilla/pdf.js/issues/14493) — ลำดับ text extraction
- [mammoth npm](https://www.npmjs.com/package/mammoth) — รองรับ .docx เท่านั้น
- [fontkit](https://github.com/foliojs/fontkit) — font embedding/subsetting
- [พ.ร.บ.เครื่องหมายครุฑพ่าห์ พ.ศ. 2534 — วิกิซอร์ซ](https://th.wikisource.org/wiki/พระราชบัญญัติเครื่องหมายครุฑพ่าห์_พ.ศ._2534)
- สำนวนพร: [mahavanadhutanka.org](https://www.mahavanadhutanka.org/post/อายุ-วรรณะ-สุขะ-พละ-หมายความว่าอย่างไร), [MGR Dhamma](https://mgronline.com/dhamma/detail/9580000049267), [รัฐสภา](https://web.parliament.go.th/view/52/news_detail/กิจกรรมคุณธรรม/2267/TH-TH), [สำนักงานบริหารทรัพย์สินฯ มธ.](http://psm.tu.ac.th/main.php?page_name=article.detail&id=22)
- ข้อมูลภายใน: `CLAUDE.md` (Founded 40+ years, Bangkok), `Output/Reese/2026-07-13-cert-express-research.md`

— Reese (Fact-check mode), TANAPAT AI Studio
