---
name: new-template
description: รัน pipeline ผลิต printable template พร้อมขาย Etsy/Gumroad ครบ 8 ขั้น — Minnie → Reese → Rae → Fact-check → Vera → Mind → Chris → Libby ใช้เมื่อ Kittanate สั่งสร้าง template ใหม่ เช่น การ์ดทำบุญ planner ใบประกาศ
---

# Skill: new-template

ทำตาม `SOP/SOP-03-printable-template.md` ครบ 8 ขั้น — งานพิมพ์พลาดแล้วแก้แพง ห้ามลัด

## ลำดับ delegate

1. `minnie-ideas` → concept card
2. `reese-research` → research 5 หมวด (คู่แข่ง/keyword/ราคา/**cultural accuracy**/gaps)
3. `rae-writer` → copy บนชิ้นงาน + listing copy (title/description/tags)
4. `reese-research` [Fact-check] → เข้มสุดที่วันที่ปฏิทินไทย-พุทธ + คำศัพท์ศาสนา
5. `vera-design` → layout spec: ขนาด mm / bleed 3mm / safe margin / CMYK / 300dpi /
   font ไทย + pt / grid + ตำแหน่งทุก element / export PDF/X
6. `mind-visual` → visual assets ตาม spec ของ Vera + โน้ต cultural ของ Reese
7. `chris-qa` → SOP-08 หมวด B, C, D, F ครบทุกข้อ
8. `libby-index` → เพิ่มเข้า `Output/Libby/template-library.csv` พร้อม metadata
   (SKU, category, ขนาด, สี, ฟอนต์, ราคา, แพลตฟอร์ม, path)

## จุดที่พลาดบ่อย
- ข้อความชิดขอบเกิน safe margin → Chris ตี blocker แน่นอน — Vera ต้อง spec ตำแหน่งชัดตั้งแต่ต้น
- วันสำคัญทางพุทธเลื่อนตามจันทรคติทุกปี — ห้ามใช้วันที่ปีก่อนโดยไม่ verify
- Listing ลืมระบุว่าเป็น digital download → คะแนนรีวิวพังจากผู้ซื้อเข้าใจผิด

## เกณฑ์สำเร็จ
Chris ✅ PASS ครบ 4 หมวด + อยู่ใน library index + dashboard อัปเดต + รายงานสรุปพร้อมราคาแนะนำ
