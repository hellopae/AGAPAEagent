# Build Log: เกียรติบัตร Express — แก้ QA blocker B1 + B2

- **Agent:** Dale (DevOps & Technical Specialist)
- **วันที่:** 15 กรกฎาคม 2026
- **Repo:** https://github.com/hellopae/CertExpress (commit `b213fff`)
- **URL จริง:** https://hellopae.github.io/CertExpress/ ✅
- **Bundle ที่เสิร์ฟจริง:** `index-BnO8hyzo.js` (แทน `index-B_kkZOng.js` ที่ Chris ตรวจ)
- **อ้างอิง:** Chris QA FAIL 14 ก.ค. (`Output/Chris/2026-07-14-qa-cert-express.md`) + Rae copy v5 (`Output/Rae/2026-07-13-cert-express-ui-copy.md`)

---

## 1) สิ่งที่แก้

### B1 — อัปโหลด PDF พังทั้งหมด (`src/parsers/readFile.js`)

- **สาเหตุจริง:** pdfjs-dist 6.x ย้าย `destroy()` ไปอยู่บน `PDFDocumentLoadingTask` — `PDFDocumentProxy` (ตัว `doc`) **ไม่มี** `destroy()` แล้ว (มีแค่ `cleanup()` — ยืนยันจาก `node_modules/pdfjs-dist/types/src/display/api.d.ts`) → `await doc.destroy()` โยน `TypeError: n.destroy is not a function` **หลัง** text extraction สำเร็จ → ตกเข้า catch → ถูก map เป็น `parseFail` ทุกครั้ง
- **แก้:** เก็บ reference `loadingTask` จาก `pdfjs.getDocument()` แล้วเรียก `await loadingTask.destroy()` (API ที่ถูกต้องของ 6.x) + ครอบ try/catch — ต่อให้ cleanup ล้มในอนาคต จะ log ในเครื่องอย่างเดียว ไม่กลบ parse ที่สำเร็จแล้วอีก
- ไม่แตะ logic extraction/heuristic ใด ๆ — smallest change

### B2 — เปลี่ยนชื่อ template พรีเมียม 2 (`src/copy.js`)

- `template.premium2.name`: "ราชนาวีทอง" → **"กรมท่าทองคำ"** (คำตัดสิน Chris — เลี่ยงสื่อโยงกองทัพเรือ)
- `template.premium2.desc`: ใช้ v5 ของ Rae เป๊ะ — "สนามน้ำเงินกรมท่าเข้มขรึม กรอบทองคู่ ดาวประกายแปดแฉก — สง่างามแบบสถาบันสากล คู่ควรมหาวิทยาลัย องค์กรใหญ่ และงานพิธีการสำคัญ" (เปลี่ยนท้ายจาก "ระดับชาติ" → "สำคัญ" ตาม v5)
- id `p-royal` / รหัส TP-P02 / artwork **ไม่แตะ** — หมายเหตุ: ใน `src/assets/templates/p-royal.svg` ยังมี comment ภายใน "ชื่อเสนอ: ราชนาวีทอง" (ไม่แสดงต่อผู้ใช้ — ปล่อยไว้เพื่อไม่แตะ artwork; Rae ฝากแจ้ง Mind อัปเดตเอกสาร template ฝั่งเขาเอง)

### B3 (ปุ่ม LINE) — **ไม่แตะ** ตามคำสั่ง รอ LINE OA URL จริงจาก Kittanate

### เพิ่มใหม่: `scripts/e2e-pdf.cjs`

E2E อัปโหลด PDF ผ่าน UI จริง (ช่องโหว่ที่ทำให้ B1 หลุด QA รอบก่อน — เดิมเทสต์แต่ PasteBox):
อัปโหลด `scripts/poc1.pdf` ผ่าน `input[type=file]` → ต้องถึงขั้น 2 + แถบเหลือง pdfAccuracy + มีรายชื่อ → ขั้น 3 ต้องพบ "กรมท่าทองคำ" และต้องไม่พบ "ราชนาวีทอง"
รันได้ทั้ง local (`npx vite preview` แล้ว `node scripts/e2e-pdf.cjs`) และ production (`BASE_URL=https://hellopae.github.io/CertExpress/ node scripts/e2e-pdf.cjs`)

## 2) การทดสอบ (ผลจริง)

| ขั้น | ผล |
|---|---|
| `npm run build` | ✅ ผ่าน (bundle ใหม่ `index-BnO8hyzo.js`) |
| E2E local (vite preview, production build) | ✅ PASS — poc1.pdf → ขั้น 2, พบ 12 รายชื่อ (13 แถวรวมแถวเพิ่ม), แถบเหลือง pdfAccuracy แสดง, ขั้น 3 พบ "กรมท่าทองคำ" |
| E2E production (URL จริง) | ✅ PASS — เงื่อนไขเดียวกันครบ, bundle `index-BnO8hyzo.js`, **ไม่มี console error เลย** (รอบก่อนมี `n.destroy`) |
| การ์ดพรีเมียม 2 บน production | ✅ เห็นด้วยตาจากภาพ: "กรมท่าทองคำ (TP-P02)" + desc v5 |

**หลักฐาน:**
- ใน repo: `CertExpress/scripts/e2e/pdf-local-*.png`, `pdf-prod-step2.png`, `pdf-prod-step3-templates.png`, `pdf-prod-premium2-card.png`, `pdf-local-log.txt`, `pdf-prod-log.txt` (โฟลเดอร์นี้ gitignore — เป็น artifact ในเครื่อง)
- สำเนาถาวร: `Output/Dale/cert-express-evidence/pdf-prod-step2.png`, `pdf-prod-step3-templates.png`, `pdf-prod-premium2-card.png`, `pdf-prod-log.txt`, `pdf-local-log.txt`
- log บรรทัดสำคัญ: `[pdf-text] ไปขั้น 2: true` (รอบ Chris เป็น `false`)

## 3) Deploy

- วิธีเดิมของ repo นี้: build ลง `docs/` (commit ใน main), Pages source = main `/docs`, `.nojekyll` ติดไปกับ `public/` ทุก build ✅ ตรวจแล้วยังอยู่
- Push `b213fff` → Pages rebuild → ยืนยัน `index-BnO8hyzo.js` เสิร์ฟบน URL จริงแล้ว (curl + headless Chrome)
- มือถือ/ฟอนต์ไทย: ไม่แตะ layout/ฟอนต์ในรอบนี้ — ผล QA เดิมของ Chris (mobile 360px + Thai rendering PASS) ยังใช้ได้

## 4) วิธี rollback

- `git revert b213fff` บน main แล้ว push — docs/ เป็น build artifact ใน repo, Pages กลับเวอร์ชันก่อนใน ~1-2 นาที (แต่จะพา B1/B2 กลับมาด้วย)
- ปิดเว็บชั่วคราว: `DELETE /repos/hellopae/CertExpress/pages` (token ใน keychain)

## 5) สถานะ blocker + ขั้นต่อไป

| Blocker | สถานะ |
|---|---|
| B1 อัปโหลด PDF | ✅ แก้แล้ว + e2e ผ่านบน production |
| B2 ชื่อ template | ✅ "กรมท่าทองคำ" ขึ้น production แล้ว (copy ตรง v5 ของ Rae ที่ผ่านการเกลาแล้ว) |
| B3 ปุ่ม LINE | ⏳ รอ LINE OA URL จาก Kittanate — ยังเป็น `#` (ห้ามเปิดตัวสาธารณะจนกว่าจะใส่) |

**ให้ Chris QA รอบใหม่:** จุดตรวจหลัก = อัปโหลด PDF ตัวอักษร (ใช้ `scripts/e2e-pdf.cjs` ซ้ำได้เลย หรือไฟล์ test-names.pdf ของ Chris เอง) + การ์ดพรีเมียม 2 + regression รอบข้าง (docx/xlsx ยังต้องอัปโหลดได้ — โค้ด parser ตัวอื่นไม่ถูกแตะ)

— Dale, TANAPAT AI Studio
