# ผลวิเคราะห์ artwork ต้นทางของ Kittanate — เกียรติบัตร Express

> วิเคราะห์โดย Claudy 16 ก.ค. 2569
> **ไฟล์ต้นฉบับไม่ได้อยู่ที่นี่** — อยู่ที่ `Documents/Work PAE/Claude/CertExpress/Files/`
> โฟลเดอร์นี้เก็บเฉพาะ **ผลวัด** ที่ Vera/Dale ต้องใช้ เพื่อไม่ให้มีไฟล์ซ้ำ 2 ที่
> ⚠️ โฟลเดอร์นี้ไม่มีใน system map ของ `HANDOFF.md §3` — เสนอให้ Libby จัดที่อยู่ถาวรตาม SOP
> (Kittanate อนุมัติก่อน)

## ไฟล์ต้นทาง — อยู่ที่ `CertExpress/Files/`

| ไฟล์ | คืออะไร | ใช้ได้ไหม |
|---|---|---|
| `Certificate A4 303x216mm.ai` | **artwork ตัวจริงที่จะใช้** ลบข้อความออกหมดแล้ว | ✅ **ตัวนี้** |
| `Certificate A4 edit3c.ai` | ตัวเก่า 297×210 ข้อความ bake ติดอยู่ | ❌ อ้างอิงเฉย ๆ |
| `Lists Certificate 2 edit.pdf` | ผล data-merge จาก InDesign มีชื่อผู้รับแล้ว | ❌ อ้างอิงเฉย ๆ |
| `Lists Certificate 2.indd` | ต้นฉบับ InDesign 41MB | ❌ **เบราว์เซอร์อ่านไม่ได้ ตัดจาก scope** |
| `เกียรติบัตร-9ใบ.pdf` | output ที่ Kittanate ลองทำจากเว็บ (ถูกต้องดี) | ตัวอย่างผลลัพธ์ |

`Certificate A4 303x216mm.ai` · SHA256 `4312eca9f9d9356b35d96d60a2a75689b2b8945b516cf55d20cc52854f1c1581`
· 1,221,141 bytes · แก้ล่าสุด 16 ก.ค. 2569 13:59

⚠️ **`CertExpress/Files/` ยัง untracked ใน git** (ณ 16 ก.ค. 2569) — ยังไม่มีสำรองที่ไหน
รอ Kittanate ตัดสินว่าจะ commit เข้า repo ไหม (`.indd` 41MB ควรพิจารณาแยก — หนักและใช้ไม่ได้อยู่ดี)

## ไฟล์ในโฟลเดอร์นี้

| ไฟล์ | คืออะไร |
|---|---|
| `2026-07-16-artwork-slot-overlay.png` | artwork + กรอบ SLOTS ทับ — Vera ใช้ดูว่า slot ไหนชนกราฟิก |
| `2026-07-16-cert-express-output-sample.png` | หน้า 1 ของ `เกียรติบัตร-9ใบ.pdf` |

## สเปกของ artwork ตัวที่ใช้ได้

- **ขนาด** `MediaBox[0 0 858.898 612.283]pt` = **303×216mm** = trim 297×210 + bleed 3mm ✅ ตรงกับ
  `layoutConstants.js` (`BLEED_CANVAS`)
- **ชนิด** `.ai` ที่ save แบบ PDF-compatible (`%PDF-1.6`) → **เบราว์เซอร์อ่านได้ผ่าน `pdfjs-dist`
  ที่ CertExpress มีอยู่แล้ว** (ใช้ดึงรายชื่อจาก PDF อยู่) ไม่ต้องเพิ่ม dependency
- **มี** gradient (`/Shading Sh0–Sh4`) + pattern (`/Pattern P0`) — ตรงกับที่ Mind §7 เตือนใน
  `pdfExport.js:4` แต่เส้นทาง rasterize ผ่าน canvas รองรับอยู่แล้ว
- **หน้าตา** ริบบิ้นแดง-ทองมุมบนซ้าย + ล่างขวา, กรอบทองแปดเหลี่ยม, กลางหน้าโล่งเทาอ่อน
  (ตราสภาผู้แทนราษฎร + ภาพวัด/อาคาร ถูกลบออกตามที่ Kittanate สั่ง เพื่อไม่ผูกกับงานสภา)

## ผลวัดการชนของ SLOTS (Claudy วัดด้วยสคริปต์ 16 ก.ค. 2569)

วิธีวัด: นับ pixel ที่ saturation สูง (`max(RGB)−min(RGB) > 40` = ริบบิ้น/เส้นทอง ไม่ใช่พื้นหลังเทา)
ในกรอบของแต่ละ slot บนภาพ render 1818×1295 (6 px/mm)

| slot | กราฟิกล้ำ | ความสว่างต่ำสุดของพื้นหลัง | ผล |
|---|---|---|---|
| logo | 0.00% | 235 | โล่ง |
| orgName | 0.00% | 232 | โล่ง |
| certifyLine | 0.00% | 230 | โล่ง |
| recipientName | 0.00% | 224 | โล่ง |
| achievement | 0.00% | 225 | โล่ง |
| blessing | 0.00% | 226 | โล่ง |
| dateLine | 0.00% | 226 | โล่ง |
| signerSingle | 0.00% | 229 | โล่ง |
| signerLeft | 0.00% | 226 | โล่ง |
| **signerRight** | **2.15%** | **97** | **ชนริบบิ้นแดง** |

- **contrast** พื้นหลังทุก slot ที่โล่งสว่าง 224–235 → `inkColors` สีเข้มชุดเดิมของ Mind ได้ contrast
  ราว 10:1 เกินเกณฑ์ 4.5:1 มาก — **ประเด็นเรื่องสีที่กลัวไว้ตอนแรก ตกไป** สำหรับ artwork ตัวนี้
  (แต่ยังเป็นปัญหาถ้าอนาคตมีคนอัปโหลด artwork พื้นเข้ม — Vera ต้องคิดเผื่อ)
- **signerRight** ริบบิ้นล่างขวาล้ำเข้ามาถึง `x=232.5mm, y=179.7mm` (slot กิน x 162–252mm)
  · ถ้าจะขยับให้โล่ง ต้อง `xc ≤ 187mm` (เดิม 207)
  · **Kittanate ตัดสิน 16 ก.ค. 2569: เอาผู้ลงนามคนเดียวไปก่อน** → ปัญหานี้ไม่บล็อก MVP

_สคริปต์ที่ใช้วัดเป็นของชั่วคราวใน scratchpad ไม่ได้เก็บ — ถ้า Vera ต้องวัด artwork ตัวใหม่
วิธีคือ: render `.ai` เป็น PNG (`sips -s format png --resampleWidth 1818`) แล้วนับ pixel saturation
ในกรอบ SLOTS ที่แปลงจาก mm ด้วย `ppm = width/303` และ offset bleed 3mm_
