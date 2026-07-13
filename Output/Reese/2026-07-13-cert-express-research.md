# Research Sprint: เกียรติบัตร Express (MVP) — Go/No-Go เทคนิค + คู่แข่ง + สเปก

- **Agent:** Reese (Research Analyst & Fact-Checker)
- **วันที่:** 13 กรกฎาคม 2026
- **โจทย์จาก:** `Output/Minnie/2026-07-13-cert-express-concept.md` (research questions 13 ข้อ)
- **สัญลักษณ์:** ✅ VERIFIED (มี source) / ⚠️ UNVERIFIED (หา source ตรงไม่ได้) / 💬 OPINION (ความเห็น/ข้อเสนอของ Reese)

---

## สรุปคำตอบ Go/No-Go ก่อน (TL;DR)

**GO — สถาปัตยกรรม client-side ล้วนทำได้จริง** แต่ต้องเลือก lib ให้ถูก:

- ❌ **jsPDF (text API)** และ ❌ **pdf-lib (text API)** — มีบั๊กยืนยันแล้วเรื่องวรรณยุกต์/สระลอยผิดตำแหน่งกับภาษาไทย ห้ามใช้วาดข้อความไทยตรง ๆ
- ✅ **pdfmake** (สร้างบน PDFKit + fontkit ซึ่งมี OpenType shaping GSUB/GPOS) — เป็นตัวที่ชุมชน dev ไทยใช้ทำเอกสารราชการ/ใบเสร็จภาษาไทยแพร่หลายที่สุด และไม่พบ issue เปิดค้างเรื่อง shaping ไทยใน tracker → **แนะนำเป็นตัวหลัก**
- 🛟 **Plan B ที่การันตีไทยถูก 100%:** render เกียรติบัตรเป็น HTML/Canvas ในเบราว์เซอร์ (เบราว์เซอร์จัดสระ-วรรณยุกต์ถูกเสมอ) → แปลงเป็นภาพความละเอียดสูง → ฝังภาพลง PDF — แลกกับไฟล์ใหญ่และตัวหนังสือไม่เป็น vector
- ฟอนต์: **Sarabun (SIL OFL)** เนื้อความ + **Srisakdi/Charmonman (SIL OFL)** หัวเรื่องแบบอาลักษณ์ — ฝังใน PDF เชิงพาณิชย์ได้ฟรีทั้งคู่

เงื่อนไขบังคับก่อนเขียนโค้ดจริง: Dale ต้องทำ **proof-of-concept 1 หน้า** พิมพ์สตริงทดสอบ ("น้ำ", "ป้า", "กตัญญู", "ว่าที่ร้อยตรีหญิง...", ชื่อที่มี ำ + วรรณยุกต์) ด้วย pdfmake + Sarabun แล้วซูมตรวจใน Acrobat/Preview ก่อน commit สถาปัตยกรรม

---

## กลุ่ม 3 — ฟอนต์ไทยตอน generate PDF (ตอบก่อนเพราะเป็น go/no-go)

### Q8: lib สร้าง PDF ฝั่ง client ตัวไหน render ไทยถูก

**หลักฐานรายตัว:**

| Lib | ผลกับภาษาไทย | หลักฐาน |
|---|---|---|
| jsPDF | ❌ วรรณยุกต์ ( ้ ๊ ) วางระดับเดียวกับพยัญชนะ ไม่ลอยขึ้นบน — issue ปิดแบบ "no-issue-activity" (ไม่ได้แก้) ทดสอบกับฟอนต์ Sarabun จาก Google Fonts | ✅ [jsPDF #2650](https://github.com/parallax/jsPDF/issues/2650) |
| pdf-lib | ❌ ตำแหน่งอักขระลอย (เช่น "น้ำ คล้ำ") ผิดเมื่อสระ+วรรณยุกต์ซ้อนบนพยัญชนะเดียว — issue ปิดโดยไม่มี fix บันทึกไว้ | ✅ [pdf-lib #675](https://github.com/Hopding/pdf-lib/issues/675) |
| @react-pdf/renderer | ⚠️ มี issue ไทยหลายเรื่อง: ตัวอักษรกลายเป็นสี่เหลี่ยม ([#633](https://github.com/diegomura/react-pdf/issues/633)), สระ ำ ทำข้อความถูกตัด (normalization ํ+า แล้วนับความยาวผิด, [#3295](https://github.com/diegomura/react-pdf/issues/3295)) | ✅ (ว่ามี issue) |
| pdfme (ใช้ pdf-lib ข้างใน) | ❌ ไม้เอกหายเมื่อข้อความขึ้นต้นด้วยอักษรละติน (รายงาน ก.พ. 2026 — ยังใหม่) | ✅ [pdfme #1347](https://github.com/pdfme/pdfme/issues/1347) |
| **pdfmake** | ✅ ชุมชน dev ไทยใช้ทำ PDF ภาษาไทย (TH Sarabun New / Sarabun) แพร่หลาย มี package สำเร็จรูป ([addthaifont-pdfmake](https://www.skypack.dev/view/addthaifont-pdfmake), [pdfmake-thai](https://github.com/pumzth/pdfmake-thai), [pdfmake-thai-fonts](https://github.com/devson2561/pdfmake-thai-fonts)) และบทความสอนภาษาไทยหลายชิ้น ([Chaichon](https://www.chaichon.com/react/สร้างไฟล์-pdf-ด้วย-react-pdfmake-ภาษาไท/), [Urbanice/Medium](https://medium.com/urbanice/สร้าง-pdf-ภาษาไทย-ด้วย-reactjs-กับ-pdfmake-bcd4144ffb2c), [PHEEDIP/Medium](https://pheedip.medium.com/angular-9-สร้าง-pdf-file-ด้วย-pdfmake-และเพิ่ม-font-ไทยสารบัญ-a458192ac096)) — **ค้นหา issue "Thai tone mark" ใน tracker ของ pdfmake แล้วไม่พบบั๊ก shaping ไทยเปิดค้าง** | ✅ (community evidence) |

**เหตุผลเชิงเทคนิคที่ pdfmake ต่างจาก jsPDF/pdf-lib:** pdfmake สร้างบน PDFKit ซึ่งใช้ **fontkit** เป็น font engine — fontkit รองรับ OpenType advanced layout ทั้ง glyph substitution (GSUB) และ positioning (GPOS) พร้อม xOffset/yOffset ต่อ glyph ซึ่งเป็นกลไกที่ทำให้วรรณยุกต์ไทย "ลอยถูกที่" ✅ source: [fontkit repo](https://github.com/foliojs/fontkit), [PDFKit text docs](https://pdfkit.org/docs/text.html) — ส่วน jsPDF/pdf-lib ไม่มี shaping engine (วาง glyph เรียงตาม advance width อย่างเดียว) 💬 OPINION (อนุมานจากพฤติกรรมบั๊กใน issue ข้างบน สอดคล้องกับหลักฐาน)

**แนว HTML→canvas→PDF (html2canvas + jsPDF แบบฝังภาพ):**
- ✅ ข้อความถูก rasterize เป็นภาพ — ตัวหนังสือเลือก/ค้นไม่ได้ และเสี่ยงเบลอถ้า scale ต่ำ (source: [Joyfill — what actually works](https://joyfill.io/blog/creating-pdfs-from-html-css-in-javascript-what-actually-works), [jspdf-html2canvas](https://www.npmjs.com/package/jspdf-html2canvas))
- 💬 OPINION: เหมาะเป็น **Plan B** — เบราว์เซอร์ shape ภาษาไทยถูกต้องเสมอ จึงการันตีผลลัพธ์ทางสายตา ถ้า render ที่ scale ~3–4 เท่า จะได้ ~280–380dpi ที่ A4 พอสำหรับพิมพ์ แลกกับไฟล์ PDF ชุดใหญ่ (หลาย MB ต่อหลายสิบใบ)

### Q9: ฟอนต์ไทย license ฝังใน PDF เชิงพาณิชย์ได้ฟรี

| ฟอนต์ | License | ใช้เชิงพาณิชย์/ฝัง PDF | เหมาะกับ |
|---|---|---|---|
| **Sarabun** (Google Fonts, Cadson Demak) | SIL OFL 1.1 | ✅ ฝังในเอกสาร/ขายสินค้าที่ใช้ฟอนต์ได้ ห้ามขายตัวฟอนต์เดี่ยว ๆ ไม่ต้อง attribution ในชิ้นงาน | เนื้อความทางการ (8 น้ำหนัก) |
| **TH Sarabun New** (ฟอนต์แห่งชาติ SIPA/กรมทรัพย์สินทางปัญญา) | GPL 2.0 + font exception | ✅ ใช้/ทำซ้ำ/ดัดแปลง/แจกจ่ายฟรี ห้ามขายฟอนต์เดี่ยว; ฉบับ New แก้ปัญหาวรรณยุกต์ลอย/PDF เพี้ยนของรุ่น PSK แล้ว | เอกสารสไตล์ราชการแท้ |
| **Srisakdi** (Google Fonts) | SIL OFL 1.1 | ✅ | หัวเรื่องลายมือ**อาลักษณ์ยุครัตนโกสินทร์ตอนต้น** — ตรงโจทย์เกียรติบัตรที่สุด (2 น้ำหนัก) |
| **Charmonman** (Google Fonts) | SIL OFL 1.1 | ✅ | หัวเรื่องลายมือหวัด สไตล์ Zapfino |
| **Noto Sans Thai** (Google) | SIL OFL 1.1 | ✅ | ตัวเลือกโมเดิร์น-องค์กร |

✅ Sources: [Sarabun — Google Fonts](https://fonts.google.com/specimen/Sarabun), [FontsArena — licenses explained](https://fontsarena.com/licenses-explained/), [f0nt.com — TH Sarabun New](https://www.f0nt.com/release/th-sarabun-new/), [วิกิพีเดีย — ฟอนต์แห่งชาติ](https://th.wikipedia.org/wiki/ฟอนต์แห่งชาติ), [Srisakdi — Google Fonts](https://fonts.google.com/specimen/Srisakdi), [ThaiGraph — Srisakdi](https://thaigraph.com/fonts/srisakdi/), [Charmonman — Google Fonts](https://fonts.google.com/specimen/Charmonman), [Cadson Demak index](https://cadsondemak.github.io/)

⚠️ UNVERIFIED (ประมาณการ): ขนาดไฟล์ .ttf ต่อน้ำหนักของ Sarabun/Srisakdi อยู่ราว 80–120KB — Dale วัดจริงตอน POC; ข่าวดีคือ PDFKit ทำ **font subsetting** ตอนฝัง (ฝังเฉพาะ glyph ที่ใช้) ทำให้ PDF ผลลัพธ์ไม่บวมตามไฟล์ฟอนต์เต็ม (✅ fontkit รองรับ subsetting — [fontkit repo](https://github.com/foliojs/fontkit))

💬 OPINION: เลือก **OFL ล้วน (Sarabun + Srisakdi)** ก่อน TH Sarabun New — สถานะ license ชัดเจนกว่าในบริบทฝังลงสินค้าเชิงพาณิชย์ และมีบน Google Fonts ให้ CI ดึงได้เสถียร

### Q10: edge case การ render ไทยที่ lib มักพลาด (มีเอกสารยืนยัน)

1. **สระอำ (ำ)** — ถูก normalize เป็น ํ + า แล้ว lib นับความยาว/ตัดบรรทัดผิด → ✅ [react-pdf #3295](https://github.com/diegomura/react-pdf/issues/3295)
2. **วรรณยุกต์ซ้อนสระบน** (น้ำ, คล้ำ, ปั้น) — mark สองชั้นบนพยัญชนะเดียว ตำแหน่งเพี้ยนใน lib ที่ไม่มี GPOS → ✅ [pdf-lib #675](https://github.com/Hopding/pdf-lib/issues/675)
3. **ไทยผสมละติน** — ขึ้นต้นด้วยอักษรอังกฤษแล้ววรรณยุกต์ไทยหาย/ทับสระ → ✅ [pdfme #1347](https://github.com/pdfme/pdfme/issues/1347) (เกียรติบัตรมักมีชื่ออังกฤษ/ชื่อบริษัทปน — ต้องอยู่ในชุดทดสอบ)
4. **การตัดคำไทย (ไม่มีช่องว่าง)** — ข้อความรับรองยาว ๆ อาจล้น/ตัดผิดตำแหน่ง เพราะ lib ตัดบรรทัดที่ช่องว่างเป็นหลัก → ⚠️ UNVERIFIED สำหรับ pdfmake โดยเฉพาะ (พบรายงานปัญหาตัดคำไทยในระบบ PDF อื่นเช่น mPDF — [Medium](https://pongsathon-janyoi.medium.com/สร้างเอกสาร-pdf-ภาษาไทย-ใน-php-ด้วย-mpdf-การแก้ไขปัญหาการตัดคำภาษาไทยเพี้ยน-bb66ca383b75)) → 💬 แนวแก้: ใช้ `Intl.Segmenter('th', {granularity:'word'})` ของเบราว์เซอร์แทรก zero-width space ก่อนส่งเข้า pdfmake
5. ⚠️ "ญ ฐ ตัดหาง" (เชิงถูกตัดเมื่อมีสระล่าง) เป็นฟีเจอร์ GSUB — ฟอนต์ตระกูล Sarabun มี rule นี้ แต่จะทำงานได้ต่อเมื่อ lib มี shaping → เหตุผลเสริมว่าต้องใช้สาย fontkit เท่านั้น (อนุมาน — รวมในชุดทดสอบ POC)

---

## กลุ่ม 2 — Lib อ่านไฟล์ฝั่ง client

### Q4: อ่าน .docx — mammoth.js

- ✅ รันในเบราว์เซอร์ได้ (client-side ล้วน) แปลง docx → HTML/raw text ได้ **รวมเนื้อหาในตาราง** (formatting ของตารางถูกทิ้ง แต่ข้อความใน cell ยังอยู่) — [mammoth npm](https://www.npmjs.com/package/mammoth), [mammoth.js GitHub](https://github.com/mwilliamson/mammoth.js/), [demo ในเบราว์เซอร์](https://develop365.gitlab.io/word-docx-generate/mammoth-demo/)
- ✅ ขนาด: 489KB / **121KB gzip** (bundlephobia)
- ⚠️ ไม่พบรายงานปัญหาเฉพาะภาษาไทย (docx เก็บข้อความเป็น Unicode ตรง ๆ ความเสี่ยงต่ำ) — ต้องทดสอบกับไฟล์ Word ไทยจริงตอน POC
- 💬 OPINION: เพียงพอสำหรับ use case "ดึงรายชื่อจากย่อหน้า/ตาราง" — แปลงเป็น HTML แล้ว parse `<p>` กับ `<td>` เป็น candidate รายชื่อ

### Q5: อ่าน .xlsx — SheetJS CE vs exceljs

- ✅ **SheetJS CE ยัง maintain อยู่** แต่ย้ายบ้าน: **npm registry (`xlsx`) ค้างที่ 0.18.5** — ตัวจริงต้องติดตั้งจาก **https://cdn.sheetjs.com/** ซึ่งเป็น authoritative source — [SheetJS docs: installation](https://docs.sheetjs.com/docs/getting-started/installation/nodejs/), [cdn.sheetjs.com](https://cdn.sheetjs.com/), [git.sheetjs.com](https://git.sheetjs.com/SheetJS/sheetjs)
- ✅ License: **Apache 2.0** (ใช้เชิงพาณิชย์ได้ ต้องคง attribution notice) — [SheetJS license docs](https://docs.sheetjs.com/docs/miscellany/license/)
- ✅ อ่านได้แทบทุก format (xlsx, xls เก่า, csv, ods) ทั้ง browser และ Node — [PkgPulse เทียบ 2026](https://www.pkgpulse.com/guides/sheetjs-vs-exceljs-vs-node-xlsx-excel-files-node-2026)
- exceljs: อ่านเฉพาะ xlsx สมัยใหม่ จุดแข็งคือ streaming/formatting ฝั่งเขียน — 💬 สำหรับ "อ่านค่า cell อย่างเดียว" SheetJS ครอบคลุมไฟล์ครูที่หลากหลาย (รวม .xls เก่า ๆ) ได้ดีกว่า
- ⚠️ ขนาด bundle: bundlephobia ล่มตอนเช็ค (`xlsx` 502) — ตัวเต็ม `xlsx.full.min.js` รู้กันว่าใหญ่ระดับหลายร้อย KB → Dale วัดจริง + **lazy-load เฉพาะเมื่อผู้ใช้เลือกไฟล์ .xlsx**

### Q6: อ่าน .pdf — pdf.js

- ✅ **`getTextContent()` คืนข้อความตามลำดับที่เก็บภายในไฟล์ PDF ไม่ใช่ลำดับการอ่านของมนุษย์** — ยืนยันโดย issue ทางการของ Mozilla: [#17191](https://github.com/mozilla/pdf.js/issues/17191), [#14493](https://github.com/mozilla/pdf.js/issues/14493) → กับ PDF ไทย (ที่มักสร้างจาก Word หลายรุ่น/หลาย encoder) ลำดับสระ-วรรณยุกต์และบรรทัดจึง**เพี้ยนได้จริงตามที่ Minnie ตั้งสมมติฐาน**
- ✅ PDF สแกน (ภาพ) ดึง text ไม่ได้เลยหากไม่มี OCR — เกินขอบเขต MVP
- ✅ ขนาด pdfjs-dist v6.1.200: 427KB / **126KB gzip** + ไฟล์ worker แยก (self-host บน Pages ได้) — bundlephobia
- 💬 OPINION: ตั้ง expectation ตามที่ Minnie ร่างไว้ถูกแล้ว — **PDF = best-effort เฉพาะ text-based** และ **fallback วางรายชื่อจาก clipboard เป็นฟีเจอร์บังคับ ไม่ใช่ optional** เพราะเป็นทางรอดเดียวเมื่อ extraction เพี้ยน

### Q7: ทั้งหมดรันบน GitHub Pages ได้ไหม + น้ำหนักรวม

- ✅ ทุกตัว (mammoth, SheetJS, pdf.js, pdfmake) เป็น pure client-side JS ไม่ต้องมี server — ใช้บน static hosting ได้ (pdf.js ต้อง serve worker file เอง ซึ่ง Pages ทำได้)
- น้ำหนัก (gzip): pdfmake ~333KB + mammoth ~121KB + pdfjs ~126KB + SheetJS (~หลายร้อย KB ⚠️) + ฟอนต์ไทย 2–4 ไฟล์
- 💬 OPINION (สำคัญต่อ UX มือถือครู): **ห้าม bundle รวมก้อนเดียว** — ให้ dynamic import ราย parser ตามนามสกุลไฟล์ที่ผู้ใช้เลือก และโหลด pdfmake+ฟอนต์ตอนเข้าขั้น Export เท่านั้น → first load เหลือแค่ React app เปล่า ๆ

---

## กลุ่ม 1 — คู่แข่ง

### Q1–Q2: autoCrat / Canva bulk create

**autoCrat** ✅
- Add-on ฟรีบน Google Workspace Marketplace — merge ข้อมูลจาก Google Sheets เข้า template Google Docs/Slides ผ่าน `<<merge tags>>` แล้ว mass-generate PDF ได้ ส่งอีเมลอัตโนมัติได้
- **Input: บังคับ Google Sheets + ต้องสร้าง template Google Docs/Slides เอง — ไม่รับ .docx/.pdf ตรง ๆ** และต้องมีบัญชี Google + ตั้งค่า merge tags (ขั้นตอนหลายจอ)
- Sources: [Google Workspace Marketplace](https://workspace.google.com/marketplace/app/autocrat/539341275670), [TCEA blog](https://blog.tcea.org/autocrat/), [Sheetgo guide](https://www.sheetgo.com/blog/education-processes/how-to-use-autocrat-add-on-for-google-sheets/)

**Canva bulk create** ✅
- เป็นฟีเจอร์ **Canva Pro เท่านั้น** (ผ่าน Canva Sheets) — ไม่มีใน free tier
- ราคาไทย: **Pro ~1,850 บาท/ปี/คน**; มี "Pro Lite" ทดลองตลาดในไทยราคาถูกกว่า ~40–50% แต่ตัดฟีเจอร์หลายอย่าง
- Sources: [Canva pricing (TH)](https://www.canva.com/th_th/pricing/), [Canva Pro](https://www.canva.com/pro/), [Miracamp pricing breakdown](https://www.miracamp.com/learn/canva/pricing-plans)
- ⚠️ UNVERIFIED: จำนวน/คุณภาพ template "เกียรติบัตรสไตล์ราชการไทย" บน Canva — ต้องเปิดสำรวจใน Canva จริง (แนะนำให้ Vera ทำตอน design research); สมมติฐาน Minnie ว่า "ส่วนใหญ่สไตล์ฝรั่ง" ยังไม่ได้พิสูจน์
- ⚠️ UNVERIFIED: bulk create รับ .docx/.pdf ตรง ๆ ได้หรือไม่ — เท่าที่พบ flow เป็นการวางข้อมูล/เชื่อม Canva Sheets ไม่ใช่โยนไฟล์ Word

### Q3: เว็บ/ระบบไทยที่ครูใช้จริง

- ✅ สิ่งที่แพร่หลายในวงการครูไทยคือ **สูตร DIY: Google Sheets + Google Slides + Apps Script** — มีคู่มือ/บทความสอนจำนวนมาก เช่น [คู่มือของ ม.ราชภัฏสงขลา (PDF)](https://edu.skru.ac.th/file/practice/noy8.pdf), [KruJakkrapong — ระบบค้นหา/ดาวน์โหลดเกียรติบัตร](https://krujakkrapong.com/สร้างระบบค้นหาและดาวน์/), [Blockdit — Code บ้านๆ](https://www.blockdit.com/posts/5fcf10ab2bb5ba0759fef1d9), [ม.เทคโนโลยีราชมงคลสุวรรณภูมิ](https://register.rmutsb.ac.th/content/324)
- 💬 จุดอ่อนของสูตร DIY (วิเคราะห์จากตัวคู่มือเอง): ต้อง copy script/ตั้งค่าเองหลายขั้น, ต้องจัดข้อมูลใน Sheets ก่อน, ฟอนต์/เลย์เอาต์ต้องทำเองใน Slides, ครูที่ไม่ถนัดเทคยังทำไม่ได้อยู่ดี — ตรงกับ pain point ที่ Minnie ตั้งไว้
- ⚠️ UNVERIFIED: **ไม่พบ** เว็บไทยสำเร็จรูปที่รับ .docx/.pdf ตรง ๆ แล้ว generate เกียรติบัตรชุด — แต่ "ไม่พบ" ≠ "ไม่มี" ควรสำรวจซ้ำ (โดยเฉพาะกลุ่ม Facebook ครู) ก่อนใช้เคลมการตลาดว่า "เจ้าแรก"

**ข้อสรุปช่องว่างตลาด:** 💬 จุดต่างที่ยังไม่มีใครทำ = (1) รับไฟล์ที่ครูมีอยู่แล้ว (.docx/.xlsx/.pdf) โดยไม่บังคับ format, (2) ไม่ต้องมีบัญชี/ตั้งค่า, (3) privacy แบบ client-side ล้วน, (4) template ทางการแบบไทยแท้ — สมมติฐานของ Minnie **ยืนได้** บนหลักฐานที่หามาได้ ณ วันนี้

---

## กลุ่ม 4 — สเปกเกียรติบัตรมาตรฐานไทย

### Q11: ขนาดมาตรฐาน

- ⚠️ UNVERIFIED: **ไม่พบระเบียบราชการที่กำหนดขนาดเกียรติบัตรอย่างเป็นทางการ** — A4 แนวนอนเป็น "ธรรมเนียมปฏิบัติ" ที่เห็นได้ทั่วไปในคู่มือครู/ตัวอย่างจริง ไม่ใช่ข้อบังคับ → MVP ล็อก A4 แนวนอนตามแผนได้ (ความเสี่ยงต่ำ) แต่อย่าเคลมคำว่า "ตามระเบียบ"
- 💬 TANAPAT มีข้อมูลเชิงประจักษ์ 40 ปีอยู่แล้ว — ให้ Kittanate ยืนยันสัดส่วนงานจริงจากโรงพิมพ์ (แนวนอน vs แนวตั้ง, A4 vs A5) จะแม่นกว่าทุก source ภายนอก

### Q12: สเปกส่งพิมพ์จริง (หัวใจ upsell)

- ✅ มาตรฐานสากล: **bleed 3mm ทุกด้าน + safety margin 3mm เข้าใน** — A4 แนวนอน trim 297×210mm → ไฟล์รวม bleed = **303×216mm**, โซนปลอดภัยของข้อความ ~291×204mm — [gogoprint (โรงพิมพ์ไทย)](https://www.gogoprint.co.th/en/how-to-close-artwork/adobe-illustrator/set-bleed/), [GD Print — why 3mm matters](https://www.gdprint.com/essential-bleed-and-cut-mark-guidelines-for-print-why-3mm-matters.html), [drukarniapro — complete guide](https://drukarniapro.pl/blog/en/bleed-safety-margin-complete-guide.html)
- 💬 ข้อเสนอเชิงสถาปัตยกรรม: ให้ template ทุกตัว **วาดบน canvas ขนาด 303×216mm ตั้งแต่แรก** (859×612pt ใน pdfmake) — export โหมดผู้ใช้ทั่วไป = crop เหลือ 297×210 (พิมพ์เครื่องถ่ายเอกสาร), export โหมดส่งโรงพิมพ์ = เต็ม bleed → ไฟล์เดียวไหลเข้าแท่น TANAPAT ได้เลย
- ⚠️ ข้อจำกัดที่ต้องรู้: PDF จาก lib ฝั่ง client เป็น **RGB** — การแปลง CMYK ทำที่ prepress ของ TANAPAT ตามปกติของงานรับไฟล์ลูกค้า (💬 ระบุใน spec ให้ Dale/ทีมพิมพ์รับทราบ ไม่ใช่ blocker); asset ภาพประกอบใน template ต้องเตรียมที่ 300dpi ณ ขนาดจริง

### Q13: ตราครุฑ / ตราโรงเรียน / ลายเซ็น

- ✅ **พ.ร.บ.เครื่องหมายครุฑพ่าห์ พ.ศ. 2534:** ผู้ไม่มีสิทธิทำหรือใช้เครื่องหมายครุฑพ่าห์เพื่อให้ผู้อื่นเชื่อว่าตนมีสิทธิ **โทษจำคุกไม่เกิน 1 ปี หรือปรับไม่เกิน 6,000 บาท หรือทั้งจำทั้งปรับ** — [วิกิซอร์ซ: พ.ร.บ.เครื่องหมายครุฑพ่าห์ 2534](https://th.wikisource.org/wiki/พระราชบัญญัติเครื่องหมายครุฑพ่าห์_พ.ศ._2534) (+[ฉบับที่ 2 พ.ศ. 2535](https://th.wikisource.org/wiki/พระราชบัญญัติเครื่องหมายครุฑพ่าห์_(ฉบับที่_๒)_พ.ศ._๒๕๓๕))
- **นัยยะต่อ product (💬 ข้อเสนอบังคับ):**
  1. **ห้ามมี template ที่ฝังตราครุฑมาให้** — เด็ดขาด
  2. ตราโรงเรียน/หน่วยงาน/ลายเซ็น = **ผู้ใช้อัปโหลดเองเท่านั้น** เว็บเป็นเครื่องมือ ผู้ออกเอกสารรับผิดชอบสิทธิในตรา/ลายเซ็นของตน
  3. ใส่ข้อความ disclaimer สั้น ๆ ใกล้ปุ่มอัปโหลดโลโก้: "โปรดใช้ตราสัญลักษณ์และลายเซ็นที่หน่วยงานของท่านมีสิทธิใช้เท่านั้น"
- ⚠️ UNVERIFIED: ประเด็นการปลอมลายเซ็น/เอกสาร (ประมวลกฎหมายอาญาลักษณะปลอมเอกสาร) — ยังไม่ได้ตรวจมาตราตรงกับกรณีเกียรติบัตร แนะนำปรึกษาความเห็นทางกฎหมายก่อนเขียน disclaimer เวอร์ชันจริง (Rae อย่าเพิ่งเขียนอ้างเลขมาตรา)

---

## คำแนะนำ tech stack ที่แนะนำให้ Dale

### Stack ที่เลือก

| ชั้น | เลือก | เหตุผล |
|---|---|---|
| สร้าง PDF | **pdfmake** (lazy-load ตอน export) | ตัวเดียวในกลุ่มที่มี shaping engine (PDFKit+fontkit, GSUB/GPOS) + หลักฐานการใช้จริงกับภาษาไทยในไทยเยอะสุด; jsPDF/pdf-lib มีบั๊กวรรณยุกต์ยืนยันแล้ว |
| ฟอนต์ | **Sarabun** (เนื้อความ) + **Srisakdi** (หัวเรื่องอาลักษณ์) — ทั้งคู่ SIL OFL | ฝัง PDF เชิงพาณิชย์ได้ฟรี ไม่ต้อง attribution; Srisakdi คือลายมืออาลักษณ์รัตนโกสินทร์ ตรง character เกียรติบัตรไทยที่สุด |
| อ่าน .docx | **mammoth.js** (121KB gz) | เบา, browser-native, ดึงข้อความจากย่อหน้า+ตารางได้ |
| อ่าน .xlsx | **SheetJS CE จาก cdn.sheetjs.com** (Apache 2.0) | รองรับ format กว้างสุด (รวม .xls เก่า) — **ห้ามลงจาก npm `xlsx` (ค้าง 0.18.5)** |
| อ่าน .pdf | **pdf.js** (text-based เท่านั้น) + **clipboard paste เป็น first-class fallback** | ลำดับ text จาก getTextContent เพี้ยนได้โดยธรรมชาติของ PDF — ตั้งใจออกแบบ UX ให้ตาราง "ตรวจ/แก้" ขั้น 2 รับภาระนี้ |
| ตัดคำไทย | **Intl.Segmenter('th')** (built-in เบราว์เซอร์) | แก้ risk การตัดบรรทัดข้อความรับรองยาว โดยไม่เพิ่ม dependency |
| Bundle strategy | dynamic import ราย parser + โหลด pdfmake/ฟอนต์เฉพาะขั้น Export | first load เบาสำหรับมือถือครู |

### ลำดับงานที่บังคับ (gate ก่อน build เต็ม)

1. **POC-1 (0.5 วัน):** pdfmake + Sarabun/Srisakdi พิมพ์ชุดสตริงทดสอบ: `น้ำ` `คล้ำ` `ปั้น` `กตัญญู` `ว่าที่ร้อยตรีหญิง ปิ่นมณี ศรีสุริยวงศ์` `นางสาวฐิติญาภรณ์` `John สมชาย ที่ 1` → ซูม 400% ตรวจตำแหน่งวรรณยุกต์ + หาง ญ/ฐ กับสระล่าง
2. **POC-2 (0.5 วัน):** โยนไฟล์จริง 3 แบบ (Word รายชื่อในตาราง, Excel export ระบบลงทะเบียน, PDF ไทยจาก Word) ผ่าน mammoth/SheetJS/pdf.js — วัด % รายชื่อที่ดึงถูก
3. POC ผ่านทั้งคู่ → GO เต็มรูปแบบ; POC-1 ไม่ผ่าน → สลับไป Plan B (HTML→ภาพความละเอียดสูง→PDF) ซึ่งการันตีไทยถูกแต่ไฟล์ใหญ่

### ความเสี่ยงหลัก (เรียงตามผลกระทบ)

1. **Preview ≠ PDF จริง** — preview เป็น HTML/React แต่ไฟล์จริงมาจาก pdfmake → เลย์เอาต์อาจเหลื่อมกัน 💬 ทางแก้: เก็บ layout constants (ตำแหน่ง/ขนาด/ฟอนต์) ชุดเดียว ใช้ทั้งสองฝั่ง + ทำ visual diff ตอน QA
2. **pdf.js กับ PDF ไทย** — ความแม่นดึงรายชื่ออาจต่ำจน UX ขั้น 2 เหนื่อย → clipboard fallback ต้องเด่น ไม่ใช่ซ่อน
3. **การตัดคำ/auto-fit ชื่อยาว** — ต้องทดสอบชื่อ+ยศยาวจริง (ว่าที่ร้อยตรีหญิง...) กับ logic ย่อฟอนต์
4. **SheetJS ecosystem แปลก** (ติดตั้งนอก npm ปกติ) — ผูก version ใน lockfile ให้ดี
5. **กฎหมายตรา/ลายเซ็น** — ห้าม ship template มีครุฑ; disclaimer รอความเห็นกฎหมายก่อน finalize ถ้อยคำ

---

## สถานะ fact-check ต่อสมมติฐานของ Minnie

| สมมติฐาน Minnie | ผล |
|---|---|
| autoCrat ต้องตั้งค่า Google Sheets ซับซ้อน | ✅ VERIFIED (บังคับ Sheets+template Google+merge tags) |
| Canva bulk create อยู่ tier จ่ายเงิน | ✅ VERIFIED (Pro ~1,850 บาท/ปี ไทย) |
| Template Canva ส่วนใหญ่สไตล์ฝรั่ง | ⚠️ UNVERIFIED — ต้องสำรวจใน Canva จริง |
| PDF ไทย extract แล้วเรียงเพี้ยน | ✅ VERIFIED (pdf.js #17191, #14493) |
| lib PDF ฝั่ง client ทำฟอนต์ไทยได้ | ✅ VERIFIED แบบมีเงื่อนไข — ได้เฉพาะสาย fontkit (pdfmake); jsPDF/pdf-lib ไม่ผ่าน |
| A4 แนวนอนคือมาตรฐานเกียรติบัตรไทย | ⚠️ UNVERIFIED เป็นธรรมเนียม ไม่ใช่ระเบียบ — ใช้ข้อมูลโรงพิมพ์ TANAPAT ยืนยันแทน |

— Reese, TANAPAT AI Studio
