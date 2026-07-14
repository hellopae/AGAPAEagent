# Build Log: เกียรติบัตร Express (MVP) — Build + Deploy

- **Agent:** Dale (DevOps & Technical Specialist)
- **วันที่:** 13–14 กรกฎาคม 2026
- **Repo:** https://github.com/hellopae/CertExpress
- **URL จริง:** https://hellopae.github.io/CertExpress/ ✅ (ตรวจ render จริงด้วย headless Chrome แล้ว — ไม่ใช่แค่ HTTP 200)
- **Spec ที่ทำตาม:** Vera UX spec / Rae UI copy v3 (166 keys) / Mind templates 5 ไฟล์ / Reese research + copy fact-check

---

## 1) ผล POC-1 (gate ก่อน build เต็ม) — ✅ ผ่าน

- **วิธีทดสอบ:** `scripts/poc1.cjs` — pdfmake 0.2.23 + Sarabun (Regular/SemiBold/Bold) + Srisakdi Bold สร้าง PDF สตริงทดสอบ
  `"น้ำ ปั้น ว่าที่ร้อยตรีหญิงกัลยรัตน์ ศรีสุริยวงศ์สกุล ไทยปน English ๑๒๓๔๕"` + ชุด edge case (คล้ำ กตัญญู ฐิติญาภรณ์ John สมชาย ที่ 1, เชิงล่าง ญ/ฐ กับสระอุ)
  → rasterize ด้วย `sips` แล้วตรวจภาพ
- **ผล:** วรรณยุกต์สองชั้น (น้ำ/คล้ำ/ปั้น) ลอยถูกตำแหน่ง, ไทยปน English วรรณยุกต์ไม่หาย, เลขไทย ๑๒๓๔๕ ครบทั้งสองฟอนต์, เชิง ญ/ฐ ถูกตัดเมื่อมีสระอุ (GSUB ทำงาน) — Claudy ยืนยันผ่านแล้ว
- **หลักฐาน:** `Output/Dale/cert-express-evidence/poc1.jpg` (ต้นฉบับ: `CertExpress/scripts/poc1.cjs`)
- **ยืนยัน glyph เพิ่มเติม (Mind §6):** ตรวจไฟล์ .ttf จริงด้วย fontkit — Srisakdi Bold มีเลขไทย ๐–๙ ครบ + มี GSUB/GPOS ทั้ง 6 ไฟล์ฟอนต์ → ไม่ต้องใช้ fallback stack แบบพิเศษ (แต่ CSS/manifest ยังตั้ง `Srisakdi, Sarabun` ตามที่ Vera กำหนด)
- **ไม่ต้องใช้ Plan B** (HTML→canvas→PDF) — ตัวหนังสือใน PDF เป็น vector เลือก/ค้นได้ ฝัง subset ฟอนต์จริง

## 2) สิ่งที่ build

**Stack:** Vite 7 + React 19 (JSX) + Tailwind v3.4 | pdfmake 0.2.23 | mammoth 1.12 | SheetJS CE **0.20.3 จาก cdn.sheetjs.com** (ไม่ใช่ npm 0.18.5 — ผูกใน lockfile แล้ว) | pdfjs-dist 6.1.200 | ฟอนต์ Sarabun 4 น้ำหนัก + Srisakdi 2 น้ำหนัก self-host (SIL OFL ทั้งคู่)

**โครงตาม Vera spec:**

- **SPA stepper 6 ขั้น ไม่ใช้ router** (D1) — store เดียว useReducer+Context (D2), ย้อนขั้นข้อมูลไม่หาย, `history.pushState` ต่อขั้น + ดัก popstate + `beforeunload` เมื่อมีรายชื่อและยังไม่ export สำเร็จ (D3)
- **`src/cert/layoutConstants.js` = ความจริงหนึ่งเดียว** (D4/D5) — slot geometry mm/pt ชุดเดียว, `computeCertLayout()` ใช้ร่วมทั้ง CertPreview (mm→px) และ pdfmake (mm→pt) ไม่มีการ hard-code ตำแหน่งซ้ำ
- **Auto-fit ชื่อยาว** (§6.4): วัดด้วย canvas 4× หลัง `document.fonts.ready` (D8 — ฟอนต์ .ttf ชุดเดียวกับ pdfmake vfs), ลดขนาด 40→24pt ทีละ 0.5 → letter-spacing −2% → scaleX ≥0.92 — ค่า fit เดียวกันส่งเข้า pdfmake — `cert.sampleName` fit ที่ ≥24pt โดยไม่ใช้ scaleX ทั้ง 3 template ฟรี ✅ (เห็นในภาพ preview + PDF)
- **PasteBox first-class** (D6): ขั้น 1 desktop 2 คอลัมน์เท่า dropzone, mobile ใต้ divider มองเห็นตลอด
- **ทุก state ครบตาราง §5.1**: loading/success/error/empty ทุกขั้น รวม `upload.warning.pdfAccuracy` ที่แสดงทุกครั้งเมื่อ source=pdf และตามไปค้างขั้น 2, ตาราง review มี undo toast 6 วิ, guard สะสมเมื่อเดินหน้า, premium บล็อก 3→4 พร้อม PremiumContactModal (LINE บนเสมอ)
- **Copy ทั้งหมดจาก `src/copy.js`** (166 keys ของ Rae v3, มี `t()` แทนค่า `{token}`) — ไม่มีการแต่ง string ใหม่ ยกเว้น 2 จุดที่ระบุใน §6
- **Template manifest** `src/cert/templates.js`: formal/buddhist/corporate (ฟรี) + p-wichit TP-P01/p-royal TP-P02 (พรีเมียม+ลายน้ำ 45° ทึบ 18%+ล็อก) — SVG ทั้ง 5 ลบ group `GUIDES__DELETE_BEFORE_EXPORT` ออกแล้วด้วยสคริปต์ (ตรวจว่าไม่เหลือ GUIDES ในไฟล์), inkColors ตามตาราง Mind §3, corporate ใช้ Sarabun 700 เป็นฟอนต์ชื่อผู้รับตาม manifest
- **PDF artwork:** rasterize SVG → PNG 300dpi (3508×2480 หลัง crop bleed) ด้วย canvas ของเบราว์เซอร์ตอน export — เลี่ยงข้อจำกัด svg-to-pdfkit เรื่อง pattern/gradient ที่ Mind เตือน และได้ภาพเหมือน preview 100% (pdfmake ฝังภาพครั้งเดียวทั้งเล่ม ไฟล์ไม่บวมตามจำนวนใบ)
- **Bundle strategy ตาม D7:** parser ทุกตัว + pdfmake + ฟอนต์เป็น dynamic import — first load = React app ~285KB (gzip 85KB); mammoth/xlsx/pdfjs/pdfmake แยก chunk โหลดเมื่อใช้
- **Deploy:** vite `base: '/CertExpress/'`, build ลง `docs/`, `.nojekyll` ใน `public/` (ติดไป docs ทุก build) + root, Pages source = main `/docs` ตั้งผ่าน API ด้วย keychain token

## 3) ค่าที่วัดได้จริง (ห้ามเดา — Reese F1/F2)

| ค่า | ตั้งไว้ | หลักฐานการวัด |
|---|---|---|
| `{maxSize}` | **10 MB** | SheetJS: xlsx 20,000 แถว×6 คอลัมน์ = 7.15MB → parse 0.68s / heap 69MB (เกินเคสครูจริงมาก — ไฟล์รายชื่อจริง <1MB) เพดาน 10MB กันไฟล์หลุดโลกที่จะทำตารางขั้น 2 (ไม่มี virtual scroll) ค้าง |
| `{batchSize}` | **300** | Node (`scripts/loadtest.cjs`): 300 ใบ = 1.4s / PDF 0.6MB / heap +2MB; 500 ใบ = 1.6s / 0.9MB — **เบราว์เซอร์จริง (headless Chrome, production build): 250 ใบ = 2.4s / heap 8→16MB / PDF 0.5MB** ระบบรับได้เกิน 300 สบาย แต่ 300 สอดคล้องเพดานตารางขั้น 2 ของ Vera §3.2 |

ทั้งสองค่าอยู่ที่เดียวใน `src/config.js` พร้อม comment ที่มาของตัวเลข — ไม่ hard-code ในข้อความ

## 4) การทดสอบ (ทำแล้ว + วิธีให้ Chris ทำซ้ำ)

**E2E บน Chrome จริง (`scripts/e2e.cjs` — production build ผ่าน `npx vite preview`):**
1. วางรายชื่อ 250 ชื่อ (รวม cert.sampleName, ไทยปน English, น้ำ/ปั้น/คล้ำ) ใน PasteBox → ตาราง 250 แถว render 83ms
2. เดินครบ 6 ขั้น → export → ได้ `เกียรติบัตร-250ใบ.pdf` 0.5MB ใน 2.4s ไม่มี error
3. Rasterize PDF หน้าแรกเทียบ screenshot preview → ตำแหน่งทุก slot ตรงกัน (ภาพ `pdf-page1.jpg` vs `5-preview.png`)
4. Mobile 360px: ไม่มี scroll แนวนอน ✅
5. URL จริง: render H1 + hero cert สำเร็จ, ไม่มี request fail (`live-landing.png`)

**ให้ Chris ทำซ้ำบน URL จริง:** วางชุดสตริงทดสอบ §2.3 ของ Vera ใน PasteBox → ไล่ครบ 6 ขั้น → เปิด PDF ซูม 400% ตรวจวรรณยุกต์ + วาง PDF ทับ screenshot ตาม §6.5 (เหลื่อม ≤1mm) + ทดสอบ error states: ไฟล์ .doc เก่า, ไฟล์ผิดชนิด, PDF สแกน, ลบรายชื่อหมดแล้วกด next, กด next โดยไม่เลือกแบบ, ลบช่องบังคับขั้น 4

## 5) Privacy invariants 5 ข้อ (Reese fact-check) — ยืนยันรายข้อ

1. **ไม่มี analytics ใด ๆ** — ไม่มี script ภายนอกแม้แต่ตัวเดียว (grep ทั้ง src ไม่มี fetch/XHR ออกนอก origin ยกเว้นข้อ 2) ✅
2. **ฟอนต์ self-host 100%** — .ttf 6 ไฟล์อยู่ใน `src/assets/fonts` bundle ไปกับแอป; `@font-face` และ pdfmake vfs ใช้ไฟล์ชุดเดียวกัน fetch จาก origin ตัวเองเท่านั้น ไม่มี CDN/`text=` parameter ✅
3. **ไม่ส่งเนื้อหาผู้ใช้เข้า API/error reporting** — ไม่มี Sentry/analytics; error ทุกจุดลง `console.error` ในเครื่องเท่านั้น ✅
4. **ไม่ persist รายชื่อข้าม session** — ไม่มี localStorage/IndexedDB/cookie ในโค้ดเลย state อยู่ในหน่วยความจำ React ล้วน (ปิดแท็บ = หาย ตรงตาม `landing.privacyLine`) ✅
5. **prefill LINE/email ไม่แนบรายชื่อผู้รับ** — prefill มีแค่ชื่อ template + {code} (ขั้น 3) และ {count} (ขั้น 6) ตาม copy ของ Rae เป๊ะ ✅

เพิ่มเติมตามเงื่อนไข fact-check: `export.summary` ("ฝังฟอนต์ไทย...ไม่เพี้ยน") ใช้ได้เพราะ POC-1 ผ่านด้วย pdfmake ไม่ได้สลับ Plan B ✅ | G1 state persistence ตอนย้อนขั้นทำจริง (store ไม่ถูกล้าง) ✅ | G2: ไม่มี transform ชื่อหลังขั้น 2 (การ strip เลขลำดับทำก่อนเข้าตารางเท่านั้น ไม่มี Unicode normalize ใน pipeline) ✅

## 6) จุดที่ตัดสินใจเอง / คำถามค้าง (รอ Claudy/ทีม)

1. **ช่อง "ชื่องาน/กิจกรรม" (customize.event) ไม่มี slot บนใบ** — Vera §6.2 ไม่มี slot event และ Rae ไม่มี `cert.default.*.event` (ชื่องานฝังอยู่ใน achievement default แล้ว) → เก็บช่องไว้ในฟอร์มตาม spec แต่**ไม่ render บนใบ** ⚠️ ผู้ใช้พิมพ์แล้วไม่เห็นผลบนใบ — ต้องให้ Vera ตัดสิน: ตัดช่องออก หรือเพิ่ม slot
2. **ConfirmDialog "แทนที่รายชื่อที่แก้แล้ว"** — Vera §5 บังคับมี dialog นี้ แต่ Rae ไม่มี key → ใช้ข้อความชั่วคราว "รายชื่อชุดใหม่จะแทนที่รายชื่อเดิมที่คุณแก้ไขไว้ในตาราง — แทนที่เลยไหมคะ?" (จุดเดียวในแอปที่ไม่ใช่ copy ของ Rae — มี TODO ในโค้ด) **รอ Rae เพิ่ม key**
3. **Label ผู้ลงนามคนที่ 2** — ไม่มี key แยก ใช้ key คนที่ 1 แทนเลข 1→2 อัตโนมัติ — ถ้า Rae อยากได้ถ้อยคำต่างให้เพิ่ม key
4. **scaleX บน PDF** — pdfmake ไม่มี horizontal scaling (Tz) → ฝั่ง PDF เทียบเท่าด้วย characterSpacing ติดลบให้ความกว้างรวมเท่ากัน (กระทบเฉพาะชื่อที่ยาวกว่า sampleName ที่ 24pt ซึ่งหายากมาก) — จุด parity เดียวที่ไม่เป๊ะ 100% ให้ Chris เช็คถ้ามีชื่อระดับนั้น
5. **ยอมรับ .xls เก่าด้วย** (SheetJS อ่านได้) แต่ copy `upload.fileTypes` ยังบอกแค่ .xlsx — Reese C1 บอก "เขียนแคบกว่าความจริง = ปลอดภัย" จึงคงไว้ — แจ้ง Rae เผื่ออยากอัปเดต
6. **ปุ่มยืนยัน crash boundary** ใช้ `common.confirm` ("ตกลง") — ไม่มี key "รีเฟรช" เฉพาะ
7. **ชื่อไฟล์ PDF** = `เกียรติบัตร-{count}ใบ.pdf` (ไทย) — ทำงานทุกเบราว์เซอร์สมัยใหม่ ถ้าอยากได้รูปแบบอื่นแจ้งได้
8. **{LINE_OA_URL} ยังเป็น `#`** + TODO comment (`src/config.js`) — ปุ่ม LINE ทุกจุดยังกดไม่ไปไหน **รอค่าจริงจาก Kittanate** / `{CONTACT_EMAIL}` ใช้ `mailto:hellopae@gmail.com` ไปก่อน
9. **สวิตช์ export เต็ม bleed (โหมดโรงพิมพ์)** — Vera §6.1 ให้เตรียมภายในไม่โชว์ UI: โครงพร้อมแล้ว (artwork rasterize เก็บเต็ม bleed ได้ แค่เปลี่ยนค่า crop/pageSize ใน `pdfExport.js`) แต่ยังไม่ทำ toggle — เฟส upsell

## 7) สิ่งที่ Chris ต้องเช็คเป็นพิเศษ (นอกเหนือ checklist Vera §13)

- **ปุ่ม LINE ยังเป็น placeholder** — ห้ามปล่อยผ่าน production ถ้า Kittanate ประกาศเปิดตัวจริง (F4 ของ fact-check)
- ข้อ 1 (ช่อง event ไม่ขึ้นบนใบ) — UX confusion ที่อาจโดนผู้ใช้จริงถาม
- Parity preview↔PDF ตาม §6.5 ด้วยตาจริง (Dale เทียบด้วยภาพแล้วตรงกัน แต่ยังไม่ได้วัดเหลื่อมเป็น mm)
- ธรรมเนียมคำอวยพร buddhist + ชื่อ "ราชนาวีทอง" (flag เดิมของ Rae ถึง Chris)
- ทดสอบ iOS Safari จริง (Dale ทดสอบบน Chrome desktop + viewport 360px เท่านั้น — ยังไม่มี hardware iOS ใน loop)
- Accessibility ไล่คีย์บอร์ดเต็ม flow + axe scan (โครง aria/focus ทำตาม §8 ครบ แต่ยังไม่ scan)

## 8) วิธี rollback

- Pages: `git revert` commit ล่าสุดบน main แล้ว push (docs/ เป็น build artifact ใน repo — revert = กลับเวอร์ชันก่อนทันทีหลัง Pages rebuild ~1-2 นาที)
- ปิดเว็บชั่วคราว: ลบ Pages ผ่าน `DELETE /repos/hellopae/CertExpress/pages`

## หลักฐานแนบ (`Output/Dale/cert-express-evidence/`)

`poc1.jpg` (POC-1) · `5-preview.png` (ขั้น 5 บนจอ) · `pdf-page1.jpg` (PDF จริงหน้าแรก — เทียบ parity) · `3-templates.png` (การ์ด 5 แบบ+ลายน้ำพรีเมียม) · `7-mobile-landing.png` (360px) · `live-landing.png` (URL จริง)

— Dale, TANAPAT AI Studio

---

## v2 — patch ตามคำตอบทีม (14 ก.ค. 2026, commit `6a03708`)

1. **ตัดช่อง `customize.event` ออก** ตาม Vera spec v1.1 (ทางเลือก B) — ลบจากฟอร์มขั้น 4, `defaultFields()`, และ merge list ใน store; achievement ทำหน้าที่แทน — คำถามค้างข้อ 1 (§6) **ปิดแล้ว**; state เดิมที่มี `event` ไม่ crash (key ส่วนเกินใน store ไม่มีใครอ่าน)
2. **ConfirmDialog แทนที่รายชื่อใช้ copy จริงจาก Rae v4** (170 keys) — `upload.confirmReplace.title/body/confirm/cancel` (body มี `{count}` = จำนวนรายชื่อเดิม), ปุ่ม "เก็บรายชื่อเดิมไว้" เป็น safe action: variant primary + อยู่ก่อนใน DOM = ได้ focus แรกใน modal — คำถามค้างข้อ 2 (§6) **ปิดแล้ว** ตอนนี้ **ทุก string ในแอป map กลับ copy key ของ Rae 100%**
3. คีย์ `customize.event.*` คงไว้ใน `src/copy.js` พร้อม comment RETIRED (ห้ามใช้ใน UI) เพื่อ traceability กับไฟล์ v4 ของ Rae
4. ตรวจซ้ำ: `npm run build` ผ่าน, E2E 250 ชื่อครบ flow ผ่าน (export 2.6s), push แล้ว Pages rebuild — **ยืนยัน bundle ใหม่ (`index-B_kkZOng.js`) เสิร์ฟบน URL จริงแล้ว**

— Dale (v2), TANAPAT AI Studio
