# QA รอบสุดท้าย — เว็บแอป "เกียรติบัตร Express" (MVP)

- **Agent:** Chris (QA & Content Reviewer)
- **วันที่:** 14 กรกฎาคม 2026
- **URL ที่ตรวจ:** https://hellopae.github.io/CertExpress/ (bundle `index-B_kkZOng.js` — ยืนยันเป็นตัวล่าสุดที่เสิร์ฟจริง)
- **วิธีตรวจ:** headless Chrome (puppeteer-core) บน production URL จริง — 5 ชุดสคริปต์ (flow หลัก + อัปโหลดไฟล์ + premium/autofit/export + confirmReplace + mobile 360px + a11y) + copy audit เทียบ bundle + rasterize PDF ที่ export จริง + network log ตรวจ privacy
- **หมวด SOP-08:** B (ภาษาไทย) + C (วัฒนธรรม) + E (web)
- **หมายเหตุ:** ใช้ fixtures + สคริปต์ที่ Chris คนก่อนเตรียมไว้ (`scratchpad/qa-cert/`, `CertExpress/scripts/e2e/`) ต่อยอด ไม่ทำใหม่ทั้งหมด

---

## Verdict: ❌ FAIL

พบ blocker 3 ข้อ (1 ข้อเป็นบั๊กฟังก์ชันหลัก, 1 ข้อวัฒนธรรม, 1 ข้อ revenue path) — ที่เหลือผ่านคุณภาพดีมาก โดยเฉพาะ Thai rendering, a11y, privacy, mobile

---

## Blockers (ต้องแก้ก่อน ship)

### B1. อัปโหลด PDF พังทั้งหมดบน production — บั๊กฟังก์ชันหลัก
- **ตำแหน่ง:** ขั้น 1 อัปโหลดไฟล์ .pdf | โค้ด `src/parsers/readFile.js:129` `await doc.destroy()`
- **สิ่งที่ผิด:** อัปโหลด PDF แบบตัวอักษรทุกไฟล์ → เด้ง error `upload.error.parseFail` ("อ่านไฟล์นี้ไม่สำเร็จค่ะ...") + console error `TypeError: n.destroy is not a function` — **ไปขั้น 2 ไม่ได้เลย**
  - ทดสอบ 2 ไฟล์แยกกัน: (ก) PDF ตัวอักษร Sarabun ที่ผมสร้างเอง (ข) **`poc1.pdf` ของ Dale เอง** — ล้มเหลวเหมือนกันทั้งคู่ 100%
  - text extraction ทำงานได้ แต่ `doc.destroy()` (pdfjs-dist 6.1.200) โยน exception → ตกเข้า catch → map เป็น parseFail แม้อ่านชื่อได้แล้ว
- **ทำไมเป็น blocker:** PDF คือ 1 ใน 3 ช่องทาง input ที่**โฆษณาชัดเจน** — `landing.subhead` ("Word, Excel หรือ PDF"), `landing.how.1`, `upload.fileTypes` ("รองรับ .pdf แบบตัวอักษร") และทั้ง flow ของ `upload.warning.pdfAccuracy` (งานที่ Reese/Rae/Vera ออกแบบมา) **ไม่มีทางถูกเรียกได้เลย**
- **หลุด QA ของ Dale ได้เพราะ:** POC-1 ทดสอบ pdfmake *generation* (สร้าง PDF ขาออก) และ E2E ใช้ PasteBox วาง 250 ชื่อ — **ไม่เคยทดสอบอัปโหลด PDF ผ่าน UI จริง**
- **ควรเป็น:** อัปโหลด PDF ตัวอักษร → ดึงรายชื่อ → ไปขั้น 2 พร้อมแถบเหลือง pdfAccuracy | แก้: ครอบ `doc.destroy()` ด้วย try/catch (หรือแก้ให้เข้ากับ API pdfjs 6.x) แล้วทดสอบอัปโหลด PDF ผ่าน UI ซ้ำ
- **หลักฐาน:** `scratchpad/qa-cert/run-pdf/` (test-names.pdf.png, poc1.pdf.png), log `run-part3/qa-log.txt` บรรทัด `[pdf-text] ไปขั้น 2: false`

### B2. ชื่อ template "ราชนาวีทอง" (TP-P02) — เสี่ยงสื่อโยงกองทัพเรือ
- **ตำแหน่ง:** ขั้น 3 การ์ดพรีเมียมใบที่ 2 | `template.premium2.name`
- **สิ่งที่ผิด:** "ราชนาวี" = กองทัพเรือ (Royal Thai Navy) โดยตรง + คำนำหน้า "ราช" — เกียรติบัตร template ทั่วไปที่ตั้งชื่อนี้อาจสื่อว่าเกี่ยวข้องกับหน่วยงานทหาร/สถาบัน ทั้งที่ตัวลายเป็นแค่ธีมน้ำเงิน-ทองสากล (desc เองก็บอก "สถาบันสากล... มหาวิทยาลัย องค์กรใหญ่")
- **ทำไมเป็น blocker:** SOP-08 หมวด C ระบุ "ราชวงศ์/สถาบัน... ไม่มั่นใจ = escalate" เป็นความเสี่ยงสูงสุดของธุรกิจ + Rae flag เรื่องนี้ถึง Chris โดยตรงเพื่อขอคำตัดสิน — และเป็น**เนื้อหาที่แสดงบน production ให้ลูกค้าเห็นแล้ว**
- **คำตัดสินของ Chris:** **เปลี่ยนชื่อ** — ใช้ **"กรมท่าทองคำ"** (คำว่า "กรมท่า" คือชื่อสีน้ำเงินเข้มในภาษาไทย คงคอนเซปต์สีไว้ครบโดยไม่โยงทหาร) หรือ "น้ำเงินสถาบัน" — แก้แค่ 1 key ไม่กระทบโค้ด (artwork/manifest ใช้ id `p-royal` เหมือนเดิมได้)

### B3. ปุ่ม LINE ตายทุกจุด (href="#") — revenue path ใช้ไม่ได้
- **ตำแหน่ง:** PremiumContactModal ปุ่ม `template.premium.lineButton` + การ์ดพรีเมียมปุ่ม "ติดต่อซื้อทาง LINE" + หน้า export ปุ่ม `upsell.lineButton` — ทุกตัว `href="#"`
- **สิ่งที่ผิด:** ปุ่มที่เขียนว่า "ติดต่อซื้อทาง LINE" / "ขอใบเสนอราคาทาง LINE" กดแล้วไม่ไปไหน — เป็นเส้นทางขายพรีเมียม + upsell (รายได้) ที่ตายสนิท | รอค่า `{LINE_OA_URL}` จริงจาก Kittanate (Vera §12 Q1, Dale §6 ข้อ 8)
- **ระดับ:** **Blocker เฉพาะการเปิดตัวสาธารณะ** (Dale เตือนเองว่า "ห้ามปล่อยผ่าน production ถ้า Kittanate ประกาศเปิดตัวจริง") — ยอมรับได้เฉพาะรอบ internal/preview
  - ฝั่งพรีเมียมมี fallback อีเมล (`mailto:hellopae@gmail.com` ทำงานถูกต้อง ✓) — แต่ **upsell มีแค่ปุ่ม LINE ปุ่มเดียว ไม่มี fallback** → กดแล้วตายสนิท
- **ควรเป็น:** ใส่ LINE OA URL จริงก่อนเปิดตัว | อย่างน้อยเพิ่มปุ่ม/ลิงก์อีเมล fallback ในกล่อง upsell
- **หมายเหตุดี:** placeholder ตัวหนังสือ `{LINE_OA_URL}`/`{CONTACT_EMAIL}` **ไม่หลุด**ขึ้น production (ถูกแทนเป็น "#"/mailto จริงแล้ว) — เงื่อนไข F4 ของ Reese เรื่อง "placeholder ไม่หลุด" ผ่าน

---

## Warnings (ควรแก้)

1. **ถ้อยคำ disclaimer ครุฑ "มีโทษตามกฎหมาย" ยังไม่ผ่านความเห็นกฎหมาย** — ตำแหน่งการแสดงผล**ถูกต้องแล้ว** (แถบเหลืองถาวรติดใต้ปุ่มอัปโหลดโลโก้ มองเห็นโดยไม่ต้อง hover ✓ ไม่ใช่ tooltip) แต่ตัวถ้อยคำยังมีเงื่อนไขค้างจาก Reese D1 + Rae note 3 ว่าต้องผ่าน legal sign-off ก่อน finalize — ยืนยันกับ Kittanate/กฎหมายก่อนเปิดตัวสาธารณะ
2. **Heuristic แถวน่าสงสัยพลาด "หัวตาราง"** — แถว "123 หัวตาราง" ถูก strip เลขนำหน้าเหลือ "หัวตาราง" แล้ว**ไม่ถูกไฮไลต์เหลือง** (ระบบตรวจซ้ำ = duplicate ทำงานถูกต้อง ✓ แต่ตรวจ suspicious พลาดคำหัวตารางโดด ๆ) — ผลกระทบต่ำ เพราะ `review.instruction` บอกผู้ใช้ให้ลบหัวตารางเองอยู่แล้ว และผู้ใช้ลบได้ในตาราง
3. **Parity preview↔PDF สำหรับชื่อที่ยาวกว่า sampleName ที่ 24pt (min):** ฝั่ง PDF ใช้ characterSpacing ติดลบ vs ฝั่ง preview ใช้ scaleX (Dale §6 ข้อ 4) — เป็น edge case ชื่อยาวสุดขั้วเท่านั้น ภาพยอมรับได้ | Chris ยังไม่ได้วัดเหลื่อมเป็น mm (เครื่องนี้ไม่มี pdftoppm/gs — rasterize ได้แค่หน้าแรกด้วย qlmanage) — ชื่อระดับ sampleName ปกติ parity ตรงด้วยตา

---

## Notes / สิ่งที่ผ่าน (ตรวจแล้ว PASS)

**ภาษาไทย (หมวด B):**
- Copy audit: ตรง bundle **165/168 key** — 3 ตัวที่ "ไม่พบ" (`landing.how.1/2/3`) เป็น false alarm: มี markdown `**...**` ที่ระบบ render เป็นตัวหนาถูกต้อง (เห็นในภาพ landing) — ไม่ใช่ string เพี้ยน
- สะกดถูก สำนวนธรรมชาติ ไม่มีสำนวนแปล — สุ่มเทียบ >30 key ทุกขั้นตรง copy v4
- เลขไทย ๒๕๖๙ / ๑๓ กรกฎาคม แสดงครบทั้ง Sarabun และ Srisakdi
- ช่อง `customize.event` retired ถูกตัดออกจากฟอร์มจริง (ไม่แสดงบน UI) — key ยังอยู่ใน bundle พร้อม comment ตามที่ Dale ระบุ ✓

**Thai rendering + PDF output (หัวใจ):**
- PDF ที่ export จริง (rasterize ดู): ชื่อยาว "ว่าที่ร้อยตรีหญิงกัลยรัตน์ ศรีสุริยวงศ์สกุล" **fit 1 บรรทัดพอดีกรอบ ไม่ตกขอบ** ขนาดอ่านสบาย — วรรณยุกต์สองชั้น (น้ำ/คล้ำ/ปั้น) ลอยถูกตำแหน่ง สระบน-ล่างครบ
- Auto-fit: sampleName ~36px ไม่ติดธง notice / ชื่อยาวสุดขั้ว (60+ ตัวอักษร) → แสดง `preview.autofit.notice` ฟ้า + fit ที่ ~24.6px ไม่ overflow กรอบ (w 585 ใน parent 595)
- Parity preview↔PDF: buddhist template ภาพ preview ขั้น 5 ตรงกับ PDF จริงด้วยตา (layoutConstants ชุดเดียว D4)

**วัฒนธรรม (หมวด C):**
- สำนวนพร buddhist "ขออำนาจคุณพระศรีรัตนตรัย โปรดอภิบาลให้เจริญด้วยอายุ วรรณะ สุขะ พละ ปฏิภาณ ธนสารสมบัติ ทุกประการเทอญ" — **เหมาะกับใบอนุโมทนาบัตร** (จตุรพิธพร + ส่วนขยายที่ใช้จริงแพร่หลาย ตามที่ Reese verify; "ธนสารสมบัติ" เป็นส่วนมาตรฐาน เหมาะกับบริบทอวยพรผู้ทำบุญ) — PASS
- template buddhist ใช้บัวประดับที่กรอบเท่านั้น ไม่มีพุทธรูป/สัญลักษณ์ศักดิ์สิทธิ์ใต้ข้อความ ✓
- ชื่อวัดตัวอย่าง "วัดตัวอย่างธรรมาราม" มีคำว่า "ตัวอย่าง" ไม่ชนวัดจริง ✓
- (ชื่อ "ราชนาวีทอง" = Blocker B2)

**Web / flow (หมวด E):**
- flow ครบ 6 ขั้น: PasteBox → ตาราง → เลือกแบบ → customize → preview → **export PDF จริงสำเร็จ** (ได้ไฟล์ `เกียรติบัตร-Nใบ.pdf`)
- อัปโหลด docx/xlsx สำเร็จ (พบ 8 ชื่อ) — เฉพาะ PDF พัง (B1)
- Error states ครบ: unsupported (.csv), docOld (.doc), pdfScanned, pasteEmpty, notSelected, required, emptyNext — แสดงถูกทุกตัว
- ตรวจซ้ำ (duplicate) + empty state + `review.error.emptyNext` ทำงานถูก (ไฮไลต์เหลือง row ซ้ำ + แถบเตือน)
- ConfirmDialog แทนที่รายชื่อ: ใช้ copy v4 จริง ปุ่ม safe "เก็บรายชื่อเดิมไว้" ได้ focus แรก ✓
- Premium guard: เลือกพรีเมียมแล้ว export ไม่ได้ / กดถัดไปเจอ error, ลายน้ำ "ตัวอย่าง — เกียรติบัตร Express" ทแยงแสดง, ปุ่มการ์ดพรีเมียมเป็น "ติดต่อซื้อทาง LINE" แทน "ใช้แบบนี้" ✓
- State persistence: browser back + stepper jump — รายชื่อและข้อความไม่หาย ✓
- startOver ผ่าน ConfirmDialog ล้าง store กลับ Landing ✓
- Console: มี error เดียว = `n.destroy` จาก B1 (ไม่มี error แดงอื่น)

**Mobile 360px:**
- ไม่มี horizontal scroll ทั้ง 6 ขั้น (scrollWidth = innerWidth = 360 ทุกขั้น)
- PasteBox มองเห็นตลอด (สูง 178px, display block) ✓
- Touch target ทุกปุ่ม ≥44px (ไม่พบปุ่มต่ำกว่าเกณฑ์)

**Accessibility (Vera §8):**
- Keyboard-only เต็ม flow ผ่าน: Tab→CTA→Enter, พิมพ์ PasteBox, Tab→ปุ่ม→Enter ไปขั้น 2 ได้
- โฟกัสย้ายไป H1 (tabindex=-1) ทุกครั้งที่เปลี่ยนขั้น + `document.title` อัปเดต ("ตรวจรายชื่อ — เกียรติบัตร Express") ✓
- Stepper: `<nav aria-label>` + `<ol>` + `aria-current="step"` + `aria-disabled="true"` × 5 ขั้นที่ยังไม่ถึง ✓
- ตาราง `<table>` จริง, input `aria-label="ชื่อ-นามสกุล แถวที่ 1"`, ปุ่มลบ `aria-label="ลบแถวนี้"` ✓
- Error banner `role="alert"` ✓ | aria-live polite ที่ counter ขั้น 5 ✓
- Modal: focus trap (Tab×8 อยู่ในนั้นตลอด), Esc ปิด + focus กลับปุ่มที่เปิด ✓
- ปุ่ม LINE: ตัวอักษร `rgb(7,59,30)` เขียวเข้ม บนพื้น `rgb(6,199,85)` — ไม่ใช่ขาวบนเขียว ผ่านเกณฑ์ contrast ตาม token ✓
- focus ring มองเห็นชัด (outline 2px + ring), ArrowRight เลื่อนใบ preview ได้ ✓

**Privacy invariants 5 ข้อ (network log):**
- รวม 42 requests — ออกนอก origin `hellopae.github.io` = **0 host จริง** (มี 1 รายการเป็น `data:image/svg+xml,...` = artwork inline ไม่ใช่ external host)
- ไม่มี analytics / ไม่มี CDN ฟอนต์ (self-host) / ไม่มี API ภายนอก / ไม่มี localStorage-sessionStorage-indexedDB-cookie ใน bundle (grep = 0) / prefill LINE-email ไม่แนบรายชื่อผู้รับ
- **ผ่านครบ 5/5**

---

## สรุปส่งกลับ Claudy

**Verdict: ❌ FAIL** — คุณภาพงานโดยรวมดีมาก (Thai rendering, a11y, privacy, mobile ผ่านหมด) แต่มี 3 blocker:

1. **[บั๊กหลัก] อัปโหลด PDF พัง 100%** — parseFail + `n.destroy is not a function` (`readFile.js:129`) แม้แต่ `poc1.pdf` ของ Dale เองก็ล้ม; PDF เป็น input ที่โฆษณาไว้ 1 ใน 3 → ต้องแก้ + ทดสอบอัปโหลด PDF ผ่าน UI ซ้ำ (Dale เทสต์แต่ generation/PasteBox ไม่เคยเทสต์ upload PDF)
2. **[วัฒนธรรม] "ราชนาวีทอง" สื่อโยงกองทัพเรือ** — ตัดสินให้เปลี่ยนชื่อ → "กรมท่าทองคำ" (แก้ 1 key)
3. **[revenue] ปุ่ม LINE ตายทุกจุด (#)** — block การเปิดตัวสาธารณะ, รอ LINE OA URL จาก Kittanate; upsell ควรมี fallback อีเมลด้วย

**Warnings สำคัญ:** ถ้อยคำ disclaimer ครุฑ "มีโทษตามกฎหมาย" ยังรอ legal sign-off (ตำแหน่งแสดงผลถูกแล้ว)

งานแก้ blocker แล้วต้องเข้า gate ใหม่ตั้งแต่ fact-check (ถ้าแตะ copy — เช่นชื่อ template ใหม่) แล้วกลับมา Chris QA อีกรอบ

— Chris, TANAPAT AI Studio
