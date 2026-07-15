# เกียรติบัตร Express — Template Artwork ชุด MVP (5 แบบ)

> ผู้ทำ: **Mind** (visual) | วันที่: 13 ก.ค. 2026
> อ้างอิง: Vera UX spec §6.2/§10 (`Output/Vera/2026-07-13-cert-express-ux-spec.md`), copy ของ Rae (`Output/Rae/2026-07-13-cert-express-ui-copy.md`), SOP-10
> ไฟล์: `Output/Mind/cert-express-templates/*.svg` (5 ไฟล์)
> **Changelog 15 ก.ค. 2026:** เปลี่ยนชื่อไทย TP-P02 "ราชนาวีทอง" → "กรมท่าทองคำ" ตาม Chris QA B2 — "ราชนาวี" สื่อโยงกองทัพเรือ (ชื่ออังกฤษ Royal Blue & Gold, id `p-royal`, รหัส TP-P02 คงเดิม)

## 0. Asset Inventory (SOP-10 Step 0)

- ขนาดล็อกจาก Vera §10: canvas เต็ม bleed **303×216mm** (A4 แนวนอน 297×210 + bleed 3mm) — ทุกไฟล์ viewBox `0 0 303 216`
- Slot geometry ชุดเดียวทุก template ตาม Vera §6.2 (D5) — origin trim, ไฟล์ SVG บวก offset +3mm เป็นพิกัด bleed
- ไม่มีโลโก้/ภาพถ่ายต้นทางที่ต้องฝัง — slot โลโก้ **เว้นว่างโดยเจตนา** (ผู้ใช้อัปโหลดเอง, กฎ Reese Q13 ห้ามตราครุฑ/ตราหน่วยงานจริง — ทุกไฟล์ปฏิบัติตาม)
- ฟอนต์อ้างด้วย `font-family` เท่านั้น ไม่ฝังไฟล์: **Sarabun** (เนื้อความ) + **Srisakdi** (ชื่อผู้รับ ยกเว้น corporate ใช้ Sarabun 700 ตาม Vera §6.2)

## 1. รายชื่อ template (ให้ Rae ใช้ตั้ง key)

| # | ไฟล์ | id / รหัส | ชื่อไทย | ชื่ออังกฤษ | copy key |
|---|---|---|---|---|---|
| ฟรี 1 | `template-free-1-thai-formal.svg` | `formal` | แบบทางการ | Thai Formal | `template.free1.name` (มีแล้ว) |
| ฟรี 2 | `template-free-2-buddhist-lotus.svg` | `buddhist` | แบบพุทธ-ไทย | Buddhist Lotus | `template.free2.name` (มีแล้ว) |
| ฟรี 3 | `template-free-3-modern-minimal.svg` | `corporate` | แบบโมเดิร์นองค์กร | Modern Minimal | `template.free3.name` (มีแล้ว) |
| พรีเมียม 1 | `template-premium-1-thai-wichit-gold.svg` | `p-wichit` / **TP-P01** | ลายไทยวิจิตรทอง | Thai Ornate Gold | `template.premium1.name` — **รอ Rae เพิ่ม** |
| พรีเมียม 2 | `template-premium-2-royal-blue-gold.svg` | `p-royal` / **TP-P02** | กรมท่าทองคำ | Royal Blue & Gold | `template.premium2.name` — **รอ Rae เพิ่ม** |

desc เสนอให้ Rae ขัดเกลา:
- **TP-P01:** "กรอบลายไทยเฟื่องประจำยาม โทนชาด-ทองอร่าม สมเกียรติงานระดับจังหวัดและพิธีใหญ่"
- **TP-P02:** "สนามน้ำเงินกรมท่า กรอบทองคู่ ดาวประกายแปดแฉก — สง่างามแบบสถาบันสากล เหมาะกับมหาวิทยาลัยและหน่วยงานราชการ"

## 2. คอนเซปต์ต่อแบบ

1. **แบบทางการ (formal)** — การ์ดครีมบน mat ทองอ่อน กรอบทองสองชั้น มุมกนกประยุกต์เชิงเรขาคณิต ดอกประจำยามกลางขอบบน-ล่าง ลายน้ำประจำยามจาง 4% กลางใบ — ภาษาภาพราชการไทยที่คุ้นตาโรงเรียน/อำเภอ
2. **แบบพุทธ-ไทย (buddhist)** — ครีมอุ่น กรอบมุมมนน้ำตาลทอง ดอกบัวเชิงประดับ 4 มุม + บัวตูมกลางขอบ ลายน้ำดอกบัว 5% — **วัฒนธรรม:** ใช้บัวประดับที่กรอบเท่านั้น ไม่มีพุทธรูป/สัญลักษณ์ศักดิ์สิทธิ์ ไม่วางองค์ประกอบศาสนาใต้ข้อความ
3. **แบบโมเดิร์นองค์กร (corporate)** — ขาวล้วน สี teal เดียวทั้งใบ แถบสันซ้ายเต็ม bleed + วงเล็บมุม ไม่มีลายน้ำ — สากล สะอาด เหมาะวุฒิบัตรอบรม
4. **ลายไทยวิจิตรทอง (TP-P01)** — ชั้นกรอบชาด→ฟอยล์ทอง(gradient)→ชาด→ครีม, แถบเฟื่องประจำยาม pattern รอบสี่ด้าน, มุมวิจิตรซ้อนชั้น, ลายน้ำดาว 8 แฉก 5% — ความแน่นของลายคือจุดขายพรีเมียม
5. **กรมท่าทองคำ (TP-P02)** — ต่างจาก TP-P01 ชัดเจน: นิ่ง สงบ เส้นสะอาดแบบสถาบันสากล — สนามน้ำเงินกรมท่า #14204A เต็ม bleed, กรอบทองคู่ (หนา 1.2 + hairline), การ์ดงาช้าง, เส้นคู่พิธีการน้ำเงิน+ทองด้านใน, ดาวประกาย 8 แฉก (compass rosette) 4 มุม, ยอดเพชรทองกลางขอบบน-ล่าง, ลายน้ำรัศมีดาว 4%

## 3. ชุดสีต่อ slot ต่อ template (`inkColors` สำหรับ manifest ของ Dale)

| Template | พื้นโซนข้อความ | orgName | certifyLine | recipientName | body (achievement/blessing/dateLine) | signer |
|---|---|---|---|---|---|---|
| formal | `#FDF8EC` | `#4A2E10` | `#3D3327` | `#6E1D1D` | `#3D3327` | `#3D3327` |
| buddhist | `#FBF1E2` | `#5B3A1E` | `#4A3B2A` | `#7B3306` | `#4A3B2A` | `#4A3B2A` |
| corporate | `#FFFFFF` | `#134E4A` | `#334155` | `#115E59` | `#334155` | `#334155` |
| TP-P01 | `#FAF3E0` | `#6B1F23` | `#43301C` | `#6B1F23` | `#43301C` | `#43301C` |
| TP-P02 | `#FBF9F2` | `#14204A` | `#2E3440` | `#1A2F6B` | `#2E3440` | `#2E3440` |

สีโครงสร้าง/ลาย (อ้างอิงงานต่อยอด): formal ทอง `#8C6A1F/#A9832F/#C9A85C`; buddhist น้ำตาลทอง `#8A5A2B/#B06A2A/#C98A45/#DCAF6E`; corporate teal `#115E59`; TP-P01 ชาด `#7B1E26` + ทอง `#EBD08A/#C9A227/#8C6512`; TP-P02 กรมท่า `#14204A` + ทอง `#EBD08A/#C9A227/#8C6512/#B08D2E`

## 4. ผล contrast check (WCAG, คำนวณจริงด้วยสูตร relative luminance — เกณฑ์ ≥4.5:1)

| Template | slot | ratio | ผล |
|---|---|---|---|
| formal | orgName | 11.73:1 | ผ่าน |
| formal | certifyLine/body/signer | 11.65:1 | ผ่าน |
| formal | recipientName | 10.67:1 | ผ่าน |
| buddhist | orgName | 9.08:1 | ผ่าน |
| buddhist | certifyLine/body/signer | 9.63:1 | ผ่าน |
| buddhist | recipientName | 8.10:1 | ผ่าน |
| corporate | orgName | 9.48:1 | ผ่าน |
| corporate | certifyLine/body/signer | 10.35:1 | ผ่าน |
| corporate | recipientName | 7.58:1 | ผ่าน |
| TP-P01 | orgName/recipientName | 10.27:1 | ผ่าน |
| TP-P01 | certifyLine/body/signer | 11.30:1 | ผ่าน |
| TP-P02 | orgName | 14.93:1 | ผ่าน |
| TP-P02 | certifyLine/body/signer | 11.86:1 | ผ่าน |
| TP-P02 | recipientName | 11.99:1 | ผ่าน |

**ผ่านครบ 14/14 คู่** (ต่ำสุด 7.58:1 — เผื่อจากเกณฑ์ 4.5:1 มาก) ลายน้ำในโซนข้อความทึบ 4–5% ทุกใบ (เกณฑ์ ≤6%) จึงไม่กระทบ ratio อย่างมีนัยสำคัญ

## 5. ผลตรวจ 4 ไฟล์เดิม + สิ่งที่แก้

ตรวจ 4 หัวข้อ: viewBox / slot geometry / guide group / contrast

- ✅ viewBox `0 0 303 216` + width/height `mm` ถูกทั้ง 4 ไฟล์
- ✅ slot geometry ตรง Vera §6.2 ทุกช่อง (ตรวจเลขทีละ slot: trim+3mm offset ถูกหมด รวม signer 2 คน ซ้าย 48 / ขวา 165)
- ✅ guide group `GUIDES__DELETE_BEFORE_EXPORT` มีครบทุกไฟล์ ลบได้ทั้งก้อน
- ✅ contrast ผ่านหมด (ตาราง §4)
- 🔧 **แก้ 2 ไฟล์ — ลายมุมล้ำเกิน 14mm จาก trim** (เกณฑ์ Vera §10 ข้อ 1):
  - `template-free-1-thai-formal.svg`: จุดวงกลมมุม (21,21) ลึก 18mm → ย้ายเป็นคู่จุดที่ (21.5,12.5)/(12.5,21.5); ข้าวหลามตัดมุมยอดในลึก 14.5mm → ขยับเป็นศูนย์กลาง (15.5,15.5) ยอดพอดี 14mm
  - `template-premium-1-thai-wichit-gold.svg`: จุดวงกลม (20.5,20.5) ลึก 17.5mm → ย้ายเป็นคู่จุด (24,12)/(12,24); ข้าวหลามตัดมุมลึก 14.5mm → ขยับเป็นศูนย์กลาง (15,15) ยอดพอดี 14mm
- ไฟล์ buddhist และ corporate ไม่ต้องแก้

## 6. ยืนยันฟอนต์ (Vera §10 ข้อ 5 / ข้อควรระวัง Rae ข้อ 7)

- **Srisakdi** (Google Fonts, ผู้ผลิต Cadson Demak) มี 2 น้ำหนัก: Regular 400 / **Bold 700** — ใช้ Bold สำหรับชื่อผู้รับ
- ตามสเปกฟอนต์ Google Fonts ครอบคลุมชุดอักขระไทยรวมเลขไทย ๐–๙ — **แต่ให้ Dale ยืนยันซ้ำจากไฟล์ .ttf จริงตอนทำ pdfmake vfs** (fc-query หรือเปิดดู glyph ๒๕๖๙) และคง fallback stack `Srisakdi, Sarabun` ทั้งใน CSS และ pdfmake ตามที่ Vera กำหนดเสมอ
- เลขไทยในเนื้อความ (๑๒ ชั่วโมง, พ.ศ. ๒๕๖๙) ใช้ Sarabun — มี glyph ครบแน่นอน (ใช้ในโปรเจกต์เดิมของเราแล้ว)

## 7. Note ถึง Dale

**วิธีใช้ไฟล์ SVG:**
1. ทุกไฟล์มี 2 group ระดับบน: `<g id="artwork">` (ใช้จริง) และ `<g id="GUIDES__DELETE_BEFORE_EXPORT">` (guide + ตัวอย่างข้อความ default ของ Rae) — **ลบ group หลังทั้งก้อนก่อนใช้เป็น artworkUrl** เหลือแต่ artwork ล้วน ๆ
2. พิกัดในไฟล์ = mm บน bleed canvas (0,0 = มุม bleed) — CertPreview/pdfmake วางข้อความด้วย layoutConstants ของ Vera (origin trim) ทับ artwork นี้; MVP export ที่ trim = crop 3mm รอบ
3. guide สีชมพู = trim, ฟ้า = text zone inset 20mm, เทา = slot ทุกช่อง (รวม signer 2 คนแบบเส้นประถี่) — ใช้เทียบตำแหน่งตอน dev ได้ก่อนลบ
4. ข้อความตัวอย่างใน guide เป็นแค่ mock ระบบจริงต้อง render ผ่าน CertPreview + auto-fit เสมอ (ขนาดฟอนต์ในไฟล์จำลอง auto-fit ของ `cert.sampleName` ไว้ที่ ~32pt แล้ว)

**จุดที่ควรระวัง/rasterize:**
- **gradient "ฟอยล์ทอง"** ใน TP-P01 (`#p1-gold`) และ TP-P02 (`#p2-gold`): ถ้า pipeline PDF/print มีปัญหา gradient banding หรือ pdfmake ไม่รองรับ SVG โดยตรง → **rasterize artwork ทั้งใบเป็น PNG 3579×2551px (300dpi)** ตามค่า Vera §6.3 แล้วใช้ PNG เป็น artworkUrl แทน (ฟรี 3 ใบเป็น flat color ล้วน ปลอดภัยกว่า แต่ rasterize ชุดเดียวกันเพื่อ parity ก็ได้)
- **pattern เฟื่อง TP-P01** (`#p1-frieze`, `patternUnits="userSpaceOnUse"`): renderer บางตัววาง tile ไม่ตรงขอบ — เช็ครอยต่อ pattern ที่มุมหลัง rasterize
- ลายน้ำกลางใบ opacity 0.04–0.05 — ตอน rasterize ให้ export จากไฟล์ตรง อย่า re-encode ซ้ำหลายชั้นจน banding
- งานพิมพ์ฟอยล์ทองจริง (เฟสโรงพิมพ์): gradient เป็นแค่ proof บนจอ ต้องแยก spot/foil layer ที่ prepress — แจ้ง Mind ทำเวอร์ชันแยก layer เมื่อถึงเฟสนั้น
- corporate ใช้ **Sarabun 700** เป็นฟอนต์ชื่อผู้รับ (ไม่ใช่ Srisakdi) — อย่าลืมตั้งใน manifest (`nameFont`)

**Manifest ที่เสนอ (สรุปจาก §1+§3):** ฟรี `formal/buddhist/corporate`, พรีเมียม `p-wichit (TP-P01)` + `p-royal (TP-P02)`; `nameFont`: Srisakdi Bold ทุกใบยกเว้น corporate = Sarabun 700

## 8. งานค้าง / ส่งไม้ต่อ

- **Rae:** เพิ่ม key `template.premium1.name/desc`, `template.premium2.name/desc` (ชื่อเสนอ §1) + ถ้าต้องการ default text เฉพาะพรีเมียม (ตอนนี้ guide ใช้ `cert.default.formal.*` ชั่วคราว)
- **Kittanate:** อนุมัติจำนวน/ชื่อพรีเมียมชุดเปิดตัว (Vera §12 ข้อ 2) — ถ้าต้องการครบ 3–5 ใบตามที่ Vera แนะนำ Mind ทำเพิ่มได้ (แนวที่เสนอ: เขียวหยก-ทอง "มรกตราชพฤกษ์", ม่วงกล้วยไม้)
- **Chris QA:** ตรวจตาม checklist Vera §13 + ธรรมเนียมคำอวยพร buddhist (งานของ Rae ที่ค้างอยู่)
- **ไม่มี factual claims ใหม่ในชิ้นงาน artwork** (ตัวเลข geometry อ้าง Vera ทั้งหมด, ข้อมูลฟอนต์ระบุให้ Dale ยืนยันจากไฟล์จริง) — เข้า Chris QA ได้ตามกฎข้อ 6
