# Fact-check Report: "5 ความผิดพลาดที่ทำให้งานพิมพ์ออกมาไม่ตรงปก" (v3)

**File reviewed:** `Output/Rae/2026-07-06-5-print-mistakes-article-v3.md`
**Reviewer:** Reese [Fact-check]
**Date:** 2026-07-06
**รอบก่อนหน้า:** v2 → ❌ FAIL (1 blocker) — รายงาน `Output/Reese/2026-07-06-print-mistakes-v2-factcheck.md`
**ขอบเขตรอบนี้:** ตรวจใหม่ทั้งบทความตามกฎ fact-check-gate — claim ที่เนื้อหาไม่เปลี่ยนจาก v2 อ้างอิงผลค้นคว้าเดิม (source เดิมยังใช้ได้) จุดแก้ 3 จุด verify ซ้ำละเอียด

---

## Claim Inventory (14 claims)

### C1 — "TANAPAT Printing รับงานพิมพ์มา 40 กว่าปี" (บรรทัด 14, 63)
**Verdict:** ✅ VERIFIED (แหล่งภายใน) — ไม่เปลี่ยนจาก v2
ตรงกับ company record ใน `CLAUDE.md` (Founded: 40+ years ago)

### C2 — "จอ RGB / เครื่องพิมพ์หมึก CMYK / gamut ต่างกัน สีสด (ฟ้าจัด เขียวนีออน ม่วง) พิมพ์แล้วหม่นลง" (บรรทัด 19)
**Verdict:** ✅ VERIFIED — ไม่เปลี่ยนจาก v2
RGB = ระบบสีบวก (แสง), CMYK = ระบบลบ (หมึก), gamut CMYK แคบกว่า สีนอก gamut ถูกบีบให้หม่น
**Sources:** [Adobe Illustrator — Make colors printable](https://helpx.adobe.com/illustrator/using/adjusting-colors.html), [Jukebox — Converting Colors to CMYK](https://support.jukeboxprint.com/en/articles/3189298-converting-colors-to-cmyk-in-adobe-illustrator)

### C3 — "ตั้ง CMYK ตั้งแต่เปิดไฟล์ใหม่ ดีกว่าแปลงทีหลัง" (บรรทัด 21)
**Verdict:** ✅ VERIFIED — ไม่เปลี่ยนจาก v2
**Sources:** [Ashworth Creative](https://www.ashworthcreative.com/blog/2019/06/understanding-color-modes/), [Chicago Printworks](https://www.chicagoprintworks.com/resource-posts/how-to-change-color-mode-to-cmyk)

### C4 — 🔍 **[จุดแก้ที่ 1]** "ใน Illustrator เช็ก/เปลี่ยนได้ที่ File > Document Color Mode ส่วน InDesign ไม่มี Color Mode ระดับเอกสาร ให้กำหนดสีใน Swatches เป็น CMYK และเลือกแปลงสีเป็น CMYK ตอน Export PDF ได้อีกชั้น" (บรรทัด 21)
**Verdict:** ✅ VERIFIED — แก้ถูกต้องครบทุกส่วน (เดิม ❌ blocker ใน v2)
1. Illustrator: เมนู **File > Document Color Mode > CMYK Color** ถูกต้อง (และเลือกได้ตอน File > New)
2. InDesign: ถูกต้องที่ระบุว่าไม่มี document color mode — InDesign จัดการสีราย swatch (New Color Swatch เลือก Color Mode ได้) และแปลงสีปลายทางตอน Export PDF (Output > Color Conversion) ได้จริง
**Sources:** [Illustrator How — Change Color Mode](https://illustratorhow.com/how-to-change-color-mode/), [Adobe Community — Should InDesign be in RGB or CMYK](https://community.adobe.com/t5/indesign-discussions/should-indesign-be-in-rgb-or-cmyk-setting/td-p/12721503), [PFL — Transparency Blend Space](https://www.printingforless.com/Choosing-a-Transparency-Blend-Space.html)

### C5 — "ใน Photoshop เช็กที่ Image > Mode" (บรรทัด 21)
**Verdict:** ✅ VERIFIED — ไม่เปลี่ยนจาก v2
**Source:** [1st Impressions](https://1stimpressions.com/color-mode-photoshop-illustrator/)

### C6 — "เครื่องตัดกระดาษมีการเหลื่อมเล็กน้อยเสมอ" (บรรทัด 26)
**Verdict:** ✅ VERIFIED — ไม่เปลี่ยนจาก v2 (tolerance ~0.5–1.5 มม.)
**Sources:** [PDF Press — Print Bleed Guide](https://pdfpress.app/blog/print-bleed-guide), [Tray Inc](https://www.trayinc.com/printing-bleed-basics-explained/)

### C7 — "Bleed = ยืดสี/พื้นหลังออกจากขอบจริงอีก 3 มม. / checklist: 3 มม. ขึ้นไป" (บรรทัด 26, 55)
**Verdict:** ✅ VERIFIED — ไม่เปลี่ยนจาก v2 (มาตรฐานสากล 3 มม. / 0.125")
**Sources:** [ColorCopiesUSA](https://www.colorcopiesusa.com/complete-guide-to-creating-files-with-bleed.html), [VistaPrint](https://www.vistaprint.com/hub/crop-marks-explained)

### C8 — 🔍 **[จุดแก้ที่ 2]** "ไฟล์ภาพสำหรับเว็บหรือโซเชียลมักถูกบันทึกที่ความละเอียดต่ำเพื่อให้โหลดเร็ว" (บรรทัด 33)
**Verdict:** ✅ VERIFIED — แก้ถูกต้อง (เดิม ⚠️ ใน v2)
เปลี่ยนประธานจาก "จอแสดงผลใช้ 72–96 dpi" (คลาดเคลื่อน) เป็นพูดถึงไฟล์ภาพเว็บ/โซเชียล — ถูกต้อง: ภาพเว็บถูก optimize/บีบอัดให้ไฟล์เล็กและ export ที่ ~72 ppi ตามธรรมเนียม จึงมี pixel ไม่พอสำหรับพิมพ์ที่ขนาดจริง ไม่มีตัวเลขที่ต้องปกป้องอีก
**Source:** [PrintNinja — 72 vs 300 DPI](https://printninja.com/printing-resource-center/printninja-file-setup-checklist/offset-printing-guidelines/recommended-resolution/)

### C9 — "งานพิมพ์ต้องการอย่างน้อย 300 dpi ที่ขนาดจริง" (บรรทัด 33, 56)
**Verdict:** ✅ VERIFIED — ไม่เปลี่ยนจาก v2 (150 lpi × 2 = 300 dpi มาตรฐาน offset)
**Sources:** [PrintNinja](https://printninja.com/printing-resource-center/printninja-file-setup-checklist/offset-printing-guidelines/recommended-resolution/), [PrintingForLess](https://www.printingforless.com/resources/image-resolution-for-printing/)

### C10 — "ถ้าต่ำกว่า 300 dpi ให้หาไฟล์ต้นฉบับใหญ่กว่า หรือใช้ Vector / เช็กที่ Image > Image Size" (บรรทัด 35)
**Verdict:** ✅ VERIFIED — ไม่เปลี่ยนจาก v2
**Source:** [Let's Enhance — Best DPI for printing](https://letsenhance.io/blog/all/image-resolution-print-quality/)

### C11 — "ไฟล์ไม่ได้พาฟอนต์ไปด้วยอัตโนมัติ → font substitution → Layout พัง" (บรรทัด 40)
**Verdict:** ✅ VERIFIED — ไม่เปลี่ยนจาก v2
**Source:** [PDF Association — Requirements of PDF/X](https://pdfa.org/technical-side-and-requirements-of-pdfx/)

### C12 — "Outline Font: Illustrator Type > Create Outlines / ปลอดภัยแต่แก้ข้อความไม่ได้ ควรเก็บต้นฉบับ" (บรรทัด 42)
**Verdict:** ✅ VERIFIED — ไม่เปลี่ยนจาก v2 (เมนูถูกต้อง, ข้อจำกัดจริง)

### C13 — 🔍 **[จุดแก้ที่ 3]** "Export เป็น PDF มาตรฐาน PDF/X-1a หรือ PDF/X-4 ซึ่งจะฝังฟอนต์ทั้งหมดลงในไฟล์ให้อัตโนมัติ ไม่ต้องตั้งค่าอะไรเพิ่ม" (บรรทัด 42, 57)
**Verdict:** ✅ VERIFIED — แก้ถูกต้อง (เดิมมีวลีซ้ำซ้อนใน v2)
มาตรฐาน PDF/X ทุก conformance level (ISO 15930) **บังคับ** embed ฟอนต์ทั้งหมด — PDF/X-1a (ISO 15930-1/-4), PDF/X-4 (ISO 15930-7) การเลือก preset PDF/X ใน Adobe จึงฝังฟอนต์ให้โดยอัตโนมัติจริง ข้อความ "ไม่ต้องตั้งค่าอะไรเพิ่ม" ถูกต้องสำหรับ preset มาตรฐาน
*หมายเหตุเล็กน้อย (ไม่ใช่ blocker):* ฟอนต์บางตัวมี license ห้าม embed — กรณีนั้น export จะ fail/เตือน ซึ่งยิ่งสนับสนุนให้ผู้ใช้รู้ตัวก่อนส่งไฟล์ ไม่ขัดกับสาระของบทความ
**Sources:** [PDF Association — Technical requirements of PDF/X](https://pdfa.org/technical-side-and-requirements-of-pdfx/), [PDF/X — Wikipedia](https://en.m.wikipedia.org/wiki/PDF/X), [Prepressure — PDF/X-1a](https://www.prepressure.com/pdf/basics/pdfx-1a)

### C14 — "ฟอนต์ภาษาไทยเรื่องนี้สำคัญมากเป็นพิเศษ" (บรรทัด 42)
**Verdict:** 💬 OPINION (สมเหตุสมผล) — ไม่เปลี่ยนจาก v2
เชิงเทคนิคมีมูล: substitution เป็นฟอนต์ที่ไม่รองรับสระ/วรรณยุกต์ซ้อนทำให้พังหนักกว่าอักษรละติน — ผ่าน

### หมายเหตุเพิ่มเติม
- **บรรทัด 47** anecdote "เราเจอกรณีเบอร์โทรผิด..." → 💬 OPINION/ประสบการณ์บริษัท — ผ่าน
- **บรรทัด 45–49** คำแนะนำตรวจ proof + ให้คนอื่นอ่านทวน → 💬 best practice — ผ่าน
- **บรรทัด 61** "ตรวจไฟล์ให้ก่อนโดยไม่มีค่าใช้จ่าย" → 💬 **POLICY — pending owner approval**: คงไว้ตาม v2 โดยตั้งใจ Claudy escalate ให้ Kittanate ตัดสินนโยบายแล้ว — **ไม่นับเป็น blocker** ตามคำสั่ง Claudy (2026-07-06) แต่ต้องได้รับการยืนยันก่อนเผยแพร่จริง

---

## สรุปผล

| Verdict | จำนวน |
|---|---|
| ✅ VERIFIED | 12 (C1–C13 ยกเว้น C14) |
| ⚠️ UNVERIFIED | 0 |
| ❌ INCORRECT | 0 |
| 💬 OPINION | 2 (C14 + anecdotes) + 1 policy pending (บรรทัด 61) |

**การเปลี่ยนแปลงจาก v2:**
- C4 (blocker) → แก้ถูกต้อง ✅
- C8 (warning) → แก้ถูกต้อง ✅
- C13 (warning) → แก้ถูกต้อง ✅
- ส่วนอื่นเนื้อหาตรงกับ v2 ที่ผ่านแล้วทุกจุด (diff ตรวจแล้วไม่มีการแก้แอบแฝงนอก 3 จุด)

## Overall Verdict: ✅ PASS — ส่งต่อ Chris QA ได้

**เงื่อนไขแนบ (ไม่ใช่ blocker ของ fact-check):**
- ประโยค "ตรวจไฟล์ให้ฟรี" (บรรทัด 61) รอ Kittanate อนุมัตินโยบายก่อนเผยแพร่จริง — Claudy รับไป escalate แล้ว

---
*Reese — Research & Fact-check, AGAPAE AI Studio*
