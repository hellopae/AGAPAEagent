# Build Note — CertExpress template ตัวที่ 6 "ขาวมุกชาดทอง" (id: tanapat)

- **วันที่:** 2026-07-18
- **โดย:** Dale (DevOps)
- **Repo:** CertExpress (branch main) — commit `03471b6` (**ยังไม่ push / ยังไม่ deploy** รอ Chris QA)
- **Live URL (หลัง deploy เท่านั้น):** https://hellopae.github.io/CertExpress/

## เปลี่ยนอะไร
| ไฟล์ | การเปลี่ยน |
|---|---|
| `src/assets/templates/tanapat.svg` | ใหม่ — artwork ต้นฉบับของ Kittanate แปลงจาก `Files/Certificate A4 303x216mm.ai` |
| `src/cert/templates.js` | เพิ่ม entry ที่ 6 (จัดกลุ่มกับ template ฟรี ก่อน premium) + import |
| `src/copy.js` | คีย์ของ Rae ที่วางไว้ล่วงหน้า (`template.free4.*` + `cert.default.tanapat.*`) — เข้ามาพร้อม commit นี้ |
| `docs/*` | build output ใหม่ (Pages source) |

## วิธีแปลง .ai → SVG (1.2 MB → 17 KB)
1. `.ai` เป็น PDF 1.6 อยู่แล้ว (MediaBox 858.898×612.283 pt = 303×216 mm พอดี)
2. `pdftocairo -svg` (poppler) → SVG 193 KB — bloat จาก **1845 gradient stop** (Illustrator smooth gradient)
3. สคริปต์ RDP บนสี (eps 1.2%) ลด stop 1845→192
4. `svgo` (precision 1) → **17 KB**, ไม่มี banding (เทียบ render กับต้นฉบับแล้ว)

## เรื่อง bleed 303×216 — ตัดสินใจ: ไม่ต้อง crop, ใช้ตามระบบเดิม (option ข)
Pipeline เดิม **ออกแบบมาเพื่อ 303×216 เต็ม bleed อยู่แล้ว** — `layoutConstants.js` มี `BLEED=3`,
`BLEED_CANVAS`; `CertPreview.jsx` และ `rasterizeArtwork()` ใน `pdfExport.js` เลื่อน artwork -3 mm
แล้ว crop เหลือ trim 297×210 ให้เอง artwork ของ Kittanate เป็น 303×216 พอดี = drop-in ไม่แตะ layout
engine, ไม่ทำ 5 template เดิมพัง เนื้อลาย (กรอบทองใน) อยู่ลึกจากขอบมาก crop 3 mm ไม่โดนเนื้อลาย

## Verify (puppeteer ขับ flow จริงบน `npm run preview`)
- `npm run build` ผ่าน — tanapat.svg bundle 18 KB (gzip 4 KB)
- Landing → paste 3 ชื่อ → Step2 → **Step3 แสดงครบ 6 การ์ด**, การ์ด "ขาวมุกชาดทอง" เป็น CertPreview
  จริง (ไม่ใช่ภาพนิ่ง) badge "ฟรี" + ปุ่ม "ใช้แบบนี้"
- กด "ใช้แบบนี้" → เข้า Step4 ได้ (free ผ่าน guard 3→4) preview ข้างฟอร์มเรนเดอร์ถูกต้อง
- Screenshot: `scratchpad/step3_grid.png`, `step3_selected.png`, `step4_customize.png`,
  `final_render.png` (เทียบ artwork กับต้นฉบับ)

## Roll back
`git revert 03471b6` (ยังไม่ push จึง reset ได้ตรง ๆ เช่นกัน)

## จุดที่ Chris ควรตรวจเป็นพิเศษ
- **Contrast ตัวอักษรบนพื้นขาวมุก** โดยเฉพาะ recipientName ชาด #7A1E1E และ orgName ที่มุมบน — โซน
  กลาง artwork มี gradient เทาอ่อน ตรวจว่าทุก slot ยังอ่านชัด (คำนวณไว้ ~8–10:1 แต่ควรดูตาจริง)
- **ตำแหน่งข้อความ vs ริบบิ้นมุม** — SLOTS จัดกึ่งกลาง โซนกลางว่าง แต่ควรเช็คว่าชื่อยาวสุด (autofit)
  ไม่ชนริบบิ้นทองมุมล่างขวา/บนซ้าย
- **PDF export จริง** ผมทดสอบถึง Step4 ไม่ได้ทดสอบ raster→PDF ปลายทางของ tanapat โดยเฉพาะ
  (rasterizeArtwork ใช้ path เดียวกับ template อื่นที่ผ่านแล้ว แต่ควร export ลองสัก 1 ใบ)
- ชื่อ id = `tanapat` (ตรงกับที่ Rae สมมติไว้) — คีย์ copy ทั้งหมด map ครบ
