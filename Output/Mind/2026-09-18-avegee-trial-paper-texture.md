# Asset Spec: พื้นผิวกระดาษแฟ้มคดี (`tex-paper-hell.png`)

**โดย:** Mind · **ให้:** คุณเป้ (gen เองใน Gemini) → เข้าเกมผ่าน `AVEGEE/img/` · **อ้างอิง:**
Vera `Output/Vera/2026-09-18-avegee-trial-battle-ui.md` หัวข้อ 5 + หัวข้อ 6 (ของ "ทำได้ถ้ามีเวลา"
ที่คุณเป้ไฟเขียวแล้ว) · สไตล์อ้างอิง `AVEGEE/ASSET-PROMPTS.md`

**สถานะแหล่งภาพ (Step 0 — สำรวจก่อนออกแบบ):** ตรวจ `AVEGEE/img/` และ `img/raw/` แล้ว — **ยังไม่มีไฟล์นี้อยู่เดิม**
ไม่ใช่ของที่ต้องรื้อของเก่ามาใช้ซ้ำ เป็นชิ้นใหม่ชิ้นเดียวตามที่ Vera ระบุไว้ในหัวข้อ 5 ของสเปกเธอ — สเปกนี้มี
**ภาพเดียว** (Vera ไม่มีของ "ทำได้ถ้ามีเวลา" ที่เป็นภาพชิ้นอื่นอีก อีก 2 ข้อในหัวข้อ 6 ของเธอ
ไม่ใช่งานภาพ: ครีบ `.orn` ใช้ SVG เดิมที่มีอยู่แล้วในหน้า ไม่ต้อง gen ใหม่ / ส่วน stop สี scrim เป็นงาน CSS ของ Toby)

---

## 1. รายการ asset

| # | ไฟล์ | ใช้ที่ไหน (grid ของ Vera) | ขนาด |
|---|---|---|---|
| 1 | `img/tex-paper-hell.png` | `background-image` ของ `.hud-rec` (การ์ด "สำนวนที่นิราอ่านให้ฟัง" — บล็อกบนสุดฝั่งขวาของหน้าสอบสวน หัวข้อ 3.1/3.3 ของ Vera) แทนพื้นเรียบ `rgba(...)` เดิม | **256×256px**, seamless tileable, ไฟล์ < 80KB |

จุดที่ต้องระวัง (จาก Vera โดยตรง): `.hud-rec` คือกล่องที่ **ห้ามมีสกอลล์ภายใน** และเป็นสิ่งที่คุณเป้อ่านทุกคดี —
เนื้อรูปต้องเบามาก ไม่แย่งสายตาจากตัวอักษรไทยที่ลอยทับอยู่ด้านบน โดยเฉพาะที่ font ย่อเหลือ 12.5px บนจอ 360×640

---

## 2. ทิศทางสไตล์ (concrete พอให้ผลตรงกันทุกรอบ gen)

พื้นผิวนี้เป็น **UI chrome texture** ไม่ใช่ game-world asset (ไม่ใช่ของที่ยืนอยู่บนแผนที่แบบ `tile-rock`/`crew-*`)
เลยไม่ใช้บล็อกสไตล์พิกเซลหลักตรง ๆ (ตัวนั้นออกแบบมาสำหรับวัตถุตั้งบนพื้นหลังใส มุมมอง 3/4 บนลงล่าง) —
ให้ยึดแพทเทิร์นเดียวกับกลุ่ม "พื้นต้อง seamless" (`tile-rock`/`tile-path`/`tile-lava` ในชุดที่ 3) คือ
**มุมมองตรงจากด้านบน ไม่มี perspective ไม่มีวัตถุยื่นออกนอกกรอบ เต็มขอบภาพ พื้นทึบ (ไม่โปร่งใส)** —
เปลี่ยนแค่หัวข้อจาก "หินภูเขาไฟ" เป็น "กระดาษ/หนังเก่าแฟ้มคดี" และปรับโทนสีให้เข้ม-อมม่วง-น้ำตาลไหม้
เพื่อให้ตัวอักษรไทยสีอ่อนที่ลอยทับยังอ่านออกชัด (คนละโจทย์กับพื้นดินกลางแจ้งที่ contrast จัดได้เต็มที่)

- **เส้น/รายละเอียด:** ริ้วเสี้ยนกระดาษ/หนังสัตว์เก่า รอยไหม้ขอบจาง ๆ รอยจุดคราบ — เกรนละเอียด ไม่ใช่ลายใหญ่
  (คนละสเกลกับ `tile-rock` ที่ก้อนหินอ่านชัด เพราะพื้นผิวนี้ผู้เล่นไม่ต้อง "อ่าน" ลาย แค่ "รู้สึก" ว่าเป็นกระดาษ)
- **แสง/เงา:** เรียบ แบน ไม่มี rim light จัด ไม่มี vignette มืดขอบ (จะชนกับกรอบทอง 2 ชั้น + `.corner-tick`
  ที่ Toby ทำด้วย CSS ทับอยู่แล้วตามหัวข้อ 1.2 ของ Vera) — คอนทราสต์ในตัวรูปต้อง **ต่ำและสม่ำเสมอทั้งภาพ**
- **ระดับรายละเอียด:** เบากว่าพื้นผิวเกมทั่วไปอย่างตั้งใจ — เทียบแล้วต้อง "เงียบกว่า" `tile-rock` มาก
  เพราะมีตัวอักษรไทยลอยทับตลอดเวลา ไม่ใช่พื้นเปล่าให้เดินผ่าน

---

## 3. Prompt พร้อมใช้ (คัดลอกไปวางใน Gemini ได้เลย)

```
Seamless tileable texture, flat top-down view straight from directly above, no perspective,
no objects sticking out of the frame, fills the entire square canvas edge to edge, opaque
background (not transparent).

SUBJECT: old aged parchment / worn leather case-file paper, the kind of surface an ancient
underworld court ledger would be written on. Fine paper-fiber grain and faint worn leather
creases, a few small scattered burn-edge marks and faint water-stain blotches, very subtle
and irregular so the repeat is not obvious, no visible seams.

LOOK AND FEEL: flat, even, LOW CONTRAST throughout the whole tile — no strong highlights,
no dark vignette, no dramatic lighting, no glossy sheen. This texture sits directly behind
small Thai text in a game UI panel, so it must read as a quiet, muted backdrop, not a loud
pattern — think "barely-there paper grain," not "hero texture."

COLOR THEME: deep burnt sepia-brown leather (dominant), blending toward a dark aubergine-purple
in the shadows (to match a dark purple-red game background), with only the faintest warm hint
of antique gold in the grain highlights (to sit well under a gold picture frame) — no bright
or saturated colors anywhere, keep the whole tile dark-toned and muted.

No text, no letters, no numbers, no watermark, no UI elements, no characters, no creatures,
no ground shadow, no drop shadow, no border, no frame drawn into the image.
```

**ถ้ารอบแรก contrast ยังแรงไป** (สังเกตจากขอบลายเห็นชัดเกินไปเมื่อย่อดูเล็ก ๆ) ต่อท้าย prompt ด้วย:
`even flatter, lower contrast, more muted, almost monochrome brown` แล้ว gen ใหม่ — อย่าปรับด้วยการลด
ขนาดลายเพียงอย่างเดียว เพราะปัญหาจริงคือ "ความจัดของสี" ไม่ใช่ "ขนาดลาย"

---

## 4. Palette (สีจอ — เกมนี้เป็นเว็บเกม ไม่ใช่งานพิมพ์ ใช้ hex ล้วน ไม่ต้องมี CMYK)

| บทบาท | เฉดที่ต้องได้ | อ้างอิง token เดิมในเกม |
|---|---|---|
| Dominant (พื้นเกรนหลัก) | น้ำตาลไหม้เข้ม ประมาณ `#2b1810`–`#3d2415` | ใกล้เคียง `--hell-purple-1:#241129` แต่เอียงไปทางน้ำตาลแทนม่วง เพื่อให้ยังอ่านเป็น "กระดาษ" ไม่ใช่ "ผนัง" |
| เงา/ริ้วลึก | ม่วงเข้มเกือบดำ `#1a0f14` | ให้กลืนกับพื้นการ์ด `.hud-rec` ที่อยู่บนกรอบไล่สี `linear-gradient(180deg, var(--hell-purple-1)…)` ของ Vera |
| ไฮไลต์จาง (เกรนกระดาษ) | ทองอมน้ำตาลจาง ๆ ใกล้ `#7a5a35` (ห้ามใกล้ `--gold:#d4a355` เต็มเฉด — จะแย่งกรอบทองจริงที่อยู่รอบนอก) | เจือจาง ไม่ใช่สีเด่น |

**ข้อควรระวังเรื่องวัฒนธรรม/สี:** เอกสารนี้ไม่ใช่ของมงคล/ของทำบุญ (เป็นฉากนรก-สอบสวนในเกม) จึงไม่มีข้อห้ามเรื่อง
"หลีกเลี่ยงโทนไว้ทุกข์" แบบงานเทศกาล — โทนน้ำตาลไหม้/ม่วงเข้มตรงกับธีม "นรกพุทธ" ที่ล็อกไว้แล้วในเกม ไม่มีจุดขัดแย้ง

---

## 5. Typography pairing — เช็คกับสเปก Vera + ความเสี่ยงเรื่องภาษาไทย

- Vera กำหนดให้ `.hud-rec` เป็นบล็อก **ห้ามสกอลล์**, font ย่อได้ถึง **12.5px ที่จอ 360×640** (หัวข้อ 3.3) — ที่ขนาดนี้
  สระบน/ล่างและวรรณยุกต์ไทย (เช่น ่ ้ ๊ ๋ ่ ิ ี ึ ื) บางและอยู่ชิดตัวอักษรมาก **ถ้าพื้นหลังมี contrast สูงหรือลายรก
  จุดพวกนี้จะเบลอหายเป็นจุดแรก** — นี่คือเหตุผลที่ prompt ข้อ 3 บังคับ "low contrast ทั้งภาพ" ไม่ใช่แค่ความชอบ
- ตรวจกับสีตัวอักษรจริงที่ Toby น่าจะใช้ (ข้อความในเกมส่วนใหญ่เป็นโทนครีม/ทองอ่อนบนพื้นเข้ม ตามธีมรวมของ `.hud`) —
  พื้นผิวนี้ต้อง**เข้มกว่าตัวอักษรเสมอ** ไม่มีจุดไหนในภาพที่สว่างจนใกล้เคียงสีตัวอักษร ไม่งั้นจะเกิดจุดอ่านไม่ออกเป็นหย่อม ๆ
- ไม่มีตัวอักษรใด ๆ อยู่ในรูปเอง (ตามกฎเหล็กข้อ 1 ของ `ASSET-PROMPTS.md`) — พื้นผิวนี้เป็น background เปล่า
  100% ตัวอักษรไทยทั้งหมดโค้ดวาดทับทีหลัง ไม่มีความเสี่ยงเรื่อง AI สะกดไทยผิดในภาพนี้โดยตรง

---

## 6. Production notes

- **ขนาดไฟล์ที่ gen:** 256×256px ตามที่ Vera ล็อกไว้ (หัวข้อ 5 ของเธอ) — อย่า gen ใหญ่กว่านี้แล้วย่อ เพราะ pattern
  จะเบี้ยว seam ตอน tile
- **โปร่งใส:** **ไม่ต้องมี** — ส่งเป็นภาพทึบเต็มขอบ (ตามแพทเทิร์นเดียวกับ `tile-rock`/`tile-path`/`tile-lava` ที่มีอยู่แล้ว
  ในเกม) เพราะ Vera ระบุให้มันเป็น "พื้นหลัง" ของ `.hud-rec` แทนพื้นเรียบเดิม ไม่ใช่ overlay โปร่งแสง
- **tile/repeat:** ต้อง **seamless tileable จริง** — ก่อนใช้ ให้เอาไฟล์มาวางเรียง 2×2 (copy-paste ต่อกัน) เช็คด้วยตาว่า
  seam ไม่เห็นรอยต่อ ถ้าเห็นรอยต่อชัด ให้ gen ใหม่ อย่าส่งเข้าเกม
- **ไฟล์:** PNG, < 80KB (ตามเพดานที่ Vera ตั้ง) — ถ้า gen มาไฟล์ใหญ่กว่านี้ ให้รัน `scripts/prep-art.py`
  หรือบีบอัดเพิ่มก่อนวางที่ `AVEGEE/img/tex-paper-hell.png` (เข้างบภาพรวมเกม ปัจจุบันใช้ 24MB จากเพดาน 50MB
  ตามที่ `ASSET-PROMPTS.md` บันทึกไว้ — ไฟล์นี้กระทบงบน้อยมากอยู่แล้ว)
- **ชื่อไฟล์ + ตำแหน่ง:** `AVEGEE/img/tex-paper-hell.png` ตรงตามที่ Vera ระบุเป๊ะ — วางแล้วบอก Toby ต่อ
  เพื่อใส่ `background-image` ให้ `.hud-rec` (ไม่ต้องแก้โค้ด logic ใด ๆ ตามที่ Vera ย้ำในหัวข้อ 7)
- **คำแนะนำเพิ่มสำหรับ Toby (ไม่ใช่ของบังคับ):** ถ้าใส่ภาพแล้วยังรู้สึกว่าดึงโทนม่วงของการ์ดเดิมหายไป
  (การ์ด `.hud-rec` ใช้ `linear-gradient(180deg, rgba(74,31,61,.55)…rgba(20,10,14,.92))` ของ Vera อยู่แล้ว)
  ลองใส่ `background-blend-mode:multiply` ระหว่างพื้นผิวนี้กับ gradient เดิม แทนการเอาพื้นผิวมาวางทับเดี่ยว ๆ —
  จะได้ทั้งเกรนกระดาษและโทนม่วงเข้มของกรอบพร้อมกัน โดยไม่ต้อง gen ไฟล์เพิ่ม
- **เช็คก่อนใช้จริง (ตาม checklist มาตรฐานของไฟล์ `ASSET-PROMPTS.md`):**
  - [ ] tile ต่อกัน 2×2 แล้วไม่เห็นรอยต่อ
  - [ ] ไม่มีตัวอักษรหลุดมาแม้แต่ตัวเดียว
  - [ ] พื้นทึบจริง ไม่มีลาย checkerboard โปร่งใสติดมา
  - [ ] วางตัวอักษรไทยสีครีม/ทองอ่อนทับดูจริง (จำลองในเบราว์เซอร์) แล้วยังอ่านออกชัดที่ font 12.5px
  - [ ] วางเทียบกรอบทอง `.corner-tick` แล้วโทนไม่ตีกัน (พื้นผิวต้องดู "เข้ากับ" กรอบทอง ไม่ใช่แข่งความสว่าง)

---

## 7. สรุปสถานะสำหรับ Claudy

- งานนี้เป็น **pure visual asset spec** สำหรับภาพที่คุณเป้าเป็นคน gen เอง (ไม่ใช่ Mind gen เอง) — ไม่มี
  factual claim ที่ต้อง fact-check (ไม่ใช่บทความ/ข้อมูล) → เข้าเกณฑ์ pure design ตามกฎข้อ 6 ของ CLAUDE.md
  ส่งตรวจ Chris อย่างเดียวได้ถ้าต้องการ ไม่ต้องผ่าน Reese
- ยังไม่ได้เรียก Chris เพราะเป็นงาน spec ข้อความล้วน รอไฟล์ภาพจริงจากคุณเป้าก่อนถึงจะมีอะไรให้ Chris ตรวจสอบ
  (ขนาด, ไฟล์, การ tile) — แนะนำให้ Chris ตรวจตอนไฟล์ `tex-paper-hell.png` เข้ามาจริงในโฟลเดอร์ `AVEGEE/img/`
