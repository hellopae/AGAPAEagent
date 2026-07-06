# Fact-check Report: "5 ความผิดพลาดที่ทำให้งานพิมพ์ออกมาไม่ตรงปก" (v2)

**File reviewed:** `Output/Rae/2026-06-25-5-print-mistakes-article-v2.md`
**Reviewer:** Reese [Fact-check]
**Date:** 2026-07-06
**เอกสารประกอบ:** `Output/Reese/2026-06-25-print-mistakes-research-brief.md`

---

## Claim Inventory (14 claims)

### C1 — "TANAPAT Printing รับงานพิมพ์มา 40 กว่าปี" (บรรทัด 4, 53)
**Verdict:** ✅ VERIFIED (แหล่งภายใน)
ตรงกับข้อมูลบริษัทใน `CLAUDE.md` (Founded: 40+ years ago) — เป็น company record ไม่ใช่ claim ภายนอก

### C2 — "จอคอมแสดงสีระบบ RGB / เครื่องพิมพ์ใช้หมึก CMYK / gamut ต่างกัน สีสด (ฟ้าจัด เขียวนีออน ม่วง) พิมพ์แล้วหม่นลงหรือเปลี่ยนโทน" (บรรทัด 9)
**Verdict:** ✅ VERIFIED
RGB เป็นระบบสีแบบบวก (แสง) CMYK เป็นระบบลบ (หมึก) และ gamut ของ CMYK แคบกว่า — สีสดนอก gamut จะถูกบีบให้หม่นลงเมื่อพิมพ์ เป็นหลักการมาตรฐาน prepress
**Sources:** [Adobe Illustrator — Make colors printable](https://helpx.adobe.com/illustrator/using/adjusting-colors.html), [Jukebox — Converting Colors to CMYK](https://support.jukeboxprint.com/en/articles/3189298-converting-colors-to-cmyk-in-adobe-illustrator)

### C3 — "ตั้ง Color Mode เป็น CMYK ตั้งแต่เปิดไฟล์ใหม่ ดีกว่าแปลงทีหลัง" (บรรทัด 11)
**Verdict:** ✅ VERIFIED
คำแนะนำมาตรฐานของโรงพิมพ์/Adobe — การออกแบบใน CMYK ตั้งแต่ต้นทำให้เห็นสีใกล้เคียงผลพิมพ์จริง ลด surprise ตอนแปลง
**Sources:** [Ashworth Creative — CMYK/RGB setup](https://www.ashworthcreative.com/blog/2019/06/understanding-color-modes/), [Chicago Printworks](https://www.chicagoprintworks.com/resource-posts/how-to-change-color-mode-to-cmyk)

### C4 — "ใน Illustrator หรือ InDesign เช็กที่ Document Setup" (บรรทัด 11)
**Verdict:** ❌ INCORRECT — **Blocker**
ผิดทั้งสองโปรแกรม:
1. **Illustrator:** Color mode ของเอกสารอยู่ที่ **File > Document Color Mode** (เลือกตอนสร้างไฟล์ใหม่ได้ที่ File > New) — ไดอะล็อก Document Setup **ไม่มี** ตัวเลือก color mode
2. **InDesign:** **ไม่มี document color mode เลย** — InDesign จัดการสีราย swatch/ราย object และแปลงตอน export ได้ จุดที่เกี่ยวคือ Edit > Transparency Blend Space และการสร้าง swatch เป็น CMYK
**ข้อความที่ถูกต้อง (เสนอ):** "ใน Illustrator เช็กที่ File > Document Color Mode ส่วน InDesign กำหนดสีเป็น CMYK ที่ Swatches และตั้งค่าแปลงสีตอน Export PDF ใน Photoshop เช็กที่ Image > Mode"
**Sources:** [Illustrator How — Change Color Mode](https://illustratorhow.com/how-to-change-color-mode/), [Adobe Community — Should InDesign be in RGB or CMYK](https://community.adobe.com/t5/indesign-discussions/should-indesign-be-in-rgb-or-cmyk-setting/td-p/12721503), [PFL — Transparency Blend Space](https://www.printingforless.com/Choosing-a-Transparency-Blend-Space.html)

### C5 — "ใน Photoshop เช็กที่ Image > Mode" (บรรทัด 11)
**Verdict:** ✅ VERIFIED
ถูกต้อง — Photoshop เปลี่ยน color mode ที่ Image > Mode > CMYK Color
**Source:** [1st Impressions — Change color mode Photoshop/Illustrator](https://1stimpressions.com/color-mode-photoshop-illustrator/)

### C6 — "เครื่องตัดกระดาษไม่ได้ตัดตรงร้อยเปอร์เซ็นต์ มีการเหลื่อมเล็กน้อยเสมอ" (บรรทัด 16)
**Verdict:** ✅ VERIFIED
เครื่องตัดมี mechanical tolerance ประมาณ 0.5–1.5 มม. ต่อการตัด — เหตุผลหลักที่ต้องมี bleed
**Sources:** [PDF Press — Print Bleed Guide](https://pdfpress.app/blog/print-bleed-guide), [Tray Inc — Printing Bleed Basics](https://www.trayinc.com/printing-bleed-basics-explained/)

### C7 — "Bleed = ยืดสี/พื้นหลังออกจากขอบจริงอีก 3 มม." (บรรทัด 16, 45)
**Verdict:** ✅ VERIFIED
3 มม. (0.125"/3.175 มม. ในระบบอเมริกัน) เป็นมาตรฐานสากลสำหรับงานพิมพ์ทั่วไป (นามบัตร โบรชัวร์ โปสเตอร์ ฯลฯ) ตรงกับ research brief; ข้อความ "3 มม. ขึ้นไป" ใน checklist ครอบคลุมกรณีงานใหญ่ที่ต้องเผื่อมากกว่า — ถูกต้อง
**Sources:** [ColorCopiesUSA — Bleed guide](https://www.colorcopiesusa.com/complete-guide-to-creating-files-with-bleed.html), [VistaPrint — Crop Marks & Bleed](https://www.vistaprint.com/hub/crop-marks-explained)

### C8 — "จอแสดงผลใช้ 72–96 dpi" (บรรทัด 23)
**Verdict:** ⚠️ UNVERIFIED (คลาดเคลื่อนเชิงเทคนิค — ไม่ใช่ blocker)
72 ppi (Mac) / 96 ppi (Windows) เป็นค่า *nominal ดั้งเดิม* ที่วงการพิมพ์ใช้อ้างอิง แต่จอปัจจุบัน (Retina, มือถือ) จริง ๆ อยู่ที่ 200–460+ ppi ใจความหลัก ("ภาพจากเว็บมัก 72 ppi ไม่พอพิมพ์") ยังถูกต้อง
**เสนอปรับ:** "ภาพสำหรับเว็บมักถูกบันทึกที่ 72–96 dpi" — เปลี่ยนประธานจาก "จอ" เป็น "ไฟล์ภาพ" จะแม่นยำกว่า
**Source:** [PrintNinja — 72 vs 300 DPI](https://printninja.com/printing-resource-center/printninja-file-setup-checklist/offset-printing-guidelines/recommended-resolution/)

### C9 — "งานพิมพ์ต้องการอย่างน้อย 300 dpi ที่ขนาดจริง" (บรรทัด 23, 46)
**Verdict:** ✅ VERIFIED
300 dpi ที่ trim size คือมาตรฐานอุตสาหกรรม — มาจาก halftone screen 150 lpi × 2 ตามแนวทาง prepress ของ Adobe และโรงพิมพ์ offset ทั่วไป
**Sources:** [PrintNinja — Recommended Resolution](https://printninja.com/printing-resource-center/printninja-file-setup-checklist/offset-printing-guidelines/recommended-resolution/), [PrintingForLess — Image Resolution](https://www.printingforless.com/resources/image-resolution-for-printing/)

### C10 — "Upscale ไม่ช่วย — ต้องหาไฟล์ต้นฉบับใหญ่กว่า หรือใช้ Vector" (บรรทัด 25)
**Verdict:** ✅ VERIFIED
Upsampling เพิ่มพิกเซลด้วยการเดา ไม่เพิ่มรายละเอียดจริง; Vector ไม่ขึ้นกับ resolution — สอดคล้อง research brief และแหล่งมาตรฐาน
**Source:** [Let's Enhance — Best DPI for printing](https://letsenhance.io/blog/all/image-resolution-print-quality/)

### C11 — "ไฟล์ไม่ได้พาฟอนต์ไปด้วยอัตโนมัติ → เครื่องอื่นไม่มีฟอนต์ → ระบบ substitute ฟอนต์ Layout พัง" (บรรทัด 30)
**Verdict:** ✅ VERIFIED
Font substitution เป็นปัญหา prepress คลาสสิก — ไฟล์ native (.ai/.indd) ไม่ embed ฟอนต์ ต้อง package/outline/embed ใน PDF
**Source:** [PDF Association — Requirements of PDF/X](https://pdfa.org/technical-side-and-requirements-of-pdfx/) (เหตุผลที่มาตรฐานบังคับ embed)

### C12 — "Outline Font ใน Illustrator ใช้ Type > Create Outlines / ปลอดภัยแต่แก้ข้อความไม่ได้ ควรเก็บไฟล์ต้นฉบับ" (บรรทัด 32)
**Verdict:** ✅ VERIFIED
เมนูถูกต้อง (Type > Create Outlines, Cmd+Shift+O) และข้อจำกัดเรื่องแก้ไขไม่ได้เป็นจริง — คำแนะนำให้เก็บต้นฉบับเป็น best practice มาตรฐาน
**Source:** Adobe Illustrator documentation (Type > Create Outlines) — สอดคล้อง research brief ข้อ 5

### C13 — "Export PDF เลือก PDF/X-1a หรือ PDF/X-4 และเปิด Embed All Fonts" (บรรทัด 32, 47)
**Verdict:** ✅ VERIFIED (มีหมายเหตุเล็กน้อย)
PDF/X ทุก conformance level (ISO 15930) **บังคับ** embed ฟอนต์ทั้งหมดอยู่แล้ว — การเลือก PDF/X-1a (ISO 15930-1/-4) หรือ PDF/X-4 (ISO 15930-7) จึงแก้ปัญหาฟอนต์ได้จริง
หมายเหตุ: วลี "เปิด Embed All Fonts" ซ้ำซ้อนเล็กน้อย (มาตรฐานบังคับอยู่แล้ว ไม่มีสวิตช์แยกใน preset PDF/X) — ไม่ผิดสาระ ไม่ใช่ blocker
**Sources:** [PDF Association — Technical requirements of PDF/X](https://pdfa.org/technical-side-and-requirements-of-pdfx/), [PDF/X — Wikipedia](https://en.m.wikipedia.org/wiki/PDF/X), [Prepressure — PDF/X-1a](https://www.prepressure.com/pdf/basics/pdfx-1a)

### C14 — "ฟอนต์ภาษาไทยเรื่องนี้สำคัญมากเป็นพิเศษ" (บรรทัด 32)
**Verdict:** 💬 OPINION (สมเหตุสมผล)
เป็นข้อสังเกตจากประสบการณ์ — เชิงเทคนิคมีมูล เพราะเครื่องที่ไม่มีฟอนต์ไทยตัวเดียวกันมัก substitute เป็นฟอนต์ที่ไม่รองรับสระ/วรรณยุกต์ซ้อน ทำให้พังหนักกว่าอักษรละติน — ผ่านได้

### หมายเหตุเพิ่มเติม (ไม่ใช่ factual claim ภายนอก)
- **บรรทัด 37** "เราเจอกรณีเบอร์โทรผิด โลโก้ขาดหาย..." — คำบอกเล่าประสบการณ์บริษัท → 💬 OPINION/anecdote ผ่านได้
- **บรรทัด 35–39** คำแนะนำตรวจ proof + ให้คนอื่นอ่านทวน — best practice ทั่วไป ไม่มีตัวเลขต้องตรวจ → 💬 ผ่านได้
- **บรรทัด 51** "ตรวจไฟล์ให้ก่อนโดยไม่มีค่าใช้จ่าย" — เป็น **ข้อเสนอทางธุรกิจ** ไม่ใช่ factual claim ภายนอก แต่ควรให้ Kittanate ยืนยันว่านโยบายนี้มีจริง ก่อนเผยแพร่ (ผูกพันบริษัท)

---

## สรุปผล

| Verdict | จำนวน |
|---|---|
| ✅ VERIFIED | 10 (C1–C3, C5–C7, C9–C13) |
| ⚠️ UNVERIFIED/imprecise | 1 (C8) |
| ❌ INCORRECT | 1 (C4) |
| 💬 OPINION | 2 (C14 + anecdotes) |

## Overall Verdict: ❌ FAIL — ต้องแก้ 1 จุดก่อนส่ง Chris QA

**Blocker (ต้องแก้):**
- **C4 (บรรทัด 11):** "ใน Illustrator หรือ InDesign เช็กที่ Document Setup" — ผิดทั้งสองโปรแกรม แก้เป็น: Illustrator → **File > Document Color Mode**; InDesign → ไม่มี document color mode ให้กำหนด swatch เป็น CMYK และตั้งค่าแปลงสีตอน Export PDF

**Warnings (ควรปรับ ไม่บังคับ):**
- **C8 (บรรทัด 23):** เปลี่ยน "จอแสดงผลใช้ 72–96 dpi" → "ไฟล์ภาพสำหรับเว็บมักบันทึกที่ 72–96 dpi" (จอสมัยใหม่ ppi สูงกว่านั้นมาก)
- **C13 (บรรทัด 32):** ตัดหรือปรับวลี "เปิด Embed All Fonts" — PDF/X บังคับ embed อยู่แล้ว
- **บรรทัด 51:** ยืนยันนโยบาย "ตรวจไฟล์ฟรี" กับ Kittanate ก่อนเผยแพร่

แก้ C4 แล้ว re-check เฉพาะจุด → ส่งต่อ Chris QA ได้

---
*Reese — Research & Fact-check, AGAPAE AI Studio*
