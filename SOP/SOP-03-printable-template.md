# SOP-03 — Printable Template: จากไอเดียถึงไฟล์พร้อมขาย Etsy/Gumroad

> ใช้เมื่อโจทย์คือสร้าง template ขาย เช่น การ์ดทำบุญ, planner ปฏิทินพุทธ, ใบประกาศนียบัตร
> Skill ที่เกี่ยวข้อง: `new-template`

## Pipeline เต็ม (8 ขั้น)

```
Minnie → Reese [Research] → Rae (copy) → Reese [Fact-check]
→ Vera (layout spec) → Mind (visual assets) → Chris QA → Libby (index)
```

## ขั้นตอนละเอียด

### ขั้น 1 — Minnie: Concept Card
- ผลิต idea card: concept / target buyer ไทย / hypothesis / research questions / format hint
- Output: `Output/Minnie/YYYY-MM-DD-<slug>-concept.md`

### ขั้น 2 — Reese [Research]
ต้องได้ครบ 5 หมวด (ตาม scaffold ของ Reese):
1. Competitor scan บน Etsy/Gumroad (ราคา, สไตล์, review count)
2. Keywords ที่ผู้ซื้อไทย/สากลใช้ค้น
3. ช่วงราคาแนะนำพร้อมเหตุผล (กรอบธุรกิจ: $5–25)
4. **Cultural accuracy notes** — วันสำคัญ, คำศัพท์ทางศาสนา, iconography ที่ต้องถูกต้อง
5. Gaps & opportunities
- Output: `Output/Reese/YYYY-MM-DD-<slug>-research.md`

### ขั้น 3 — Rae: Copy ทุกชิ้นบน template + listing
ต้องส่งมอบครบ:
- ข้อความบนตัว template (ไทย + อังกฤษถ้ามี) พร้อมระบุว่าแต่ละ block อยู่ตรงไหน
- ชื่อสินค้า Etsy/Gumroad (SEO-aware) + คำอธิบาย listing + tags/keywords
- Output: `Output/Rae/YYYY-MM-DD-<slug>-copy.md`

### ขั้น 4 — Reese [Fact-check]
- เน้นหนักที่สุด: **วันที่ตามปฏิทินไทย/พุทธ, คำบาลี-สันสกฤต, ธรรมเนียมพิธี** — ผิดคือ blocker
- Output: `Output/Reese/YYYY-MM-DD-<slug>-factcheck.md`

### ขั้น 5 — Vera: Layout Spec
Spec บังคับสำหรับงานพิมพ์ (ทุกข้อ ห้ามขาด):
- ขนาดจริง (mm) + orientation | bleed 3mm | safe margin ≥5mm
- CMYK / 300dpi / export PDF/X
- Font pairing ที่ render ไทยถูกต้อง (เช่นตระกูล Sarabun) + ขนาด pt + hierarchy
- Grid + ตำแหน่งทุก element (text block จาก Rae, ภาพจาก Mind, โลโก้, QR)
- Output: `Output/Vera/YYYY-MM-DD-<slug>-spec.md`

### ขั้น 6 — Mind: Visual Assets
- ทำตาม spec ของ Vera + สไตล์แบรนด์: Thai cultural + minimalist elegant,
  anime/illustration ได้ตามความชอบ Kittanate, Buddhist iconography ต้องผ่านโน้ตของ Reese ขั้น 2
- ส่งมอบ: รายการ asset + คำอธิบาย/ไฟล์ + สี (CMYK values) + แนวทางการใช้
- Output: `Output/Mind/YYYY-MM-DD-<slug>-assets.md` (+ ไฟล์ภาพถ้าสร้างได้)

### ขั้น 7 — Chris QA (gate สุดท้าย)
Checklist เฉพาะ template (เพิ่มจาก QA มาตรฐานใน SOP-08):
- [ ] ภาษาไทยบนชิ้นงานถูก 100% (สะกด, วรรคตอน, ระดับภาษาเหมาะกับพิธี)
- [ ] ศาสนา/วัฒนธรรมถูกต้อง เคารพ ไม่มีอะไรผิดที่ผิดทาง
- [ ] Print spec ครบ: ขนาด / bleed / CMYK / 300dpi / text ใน safe margin
- [ ] Listing พร้อม: title, description, keywords, preview images ระบุครบ
- Output: `Output/Chris/YYYY-MM-DD-qa-<slug>.md`

### ขั้น 8 — Libby: Index
- เพิ่มเข้า library index พร้อม metadata: SKU, category, ขนาด, สี, ฟอนต์, ราคา, แพลตฟอร์ม, path ไฟล์
- Output: อัปเดต `Output/Libby/template-library.csv` (สร้างครั้งแรกถ้ายังไม่มี)

## เกณฑ์ธุรกิจ

- ราคา $5–25 | แพลตฟอร์ม Etsy + Gumroad | ตลาดหลัก: ไทย + ชุมชนพุทธ
- เป้า: มี template ใหม่พร้อมขายทุกเดือน (success metric ใน CLAUDE.md)
