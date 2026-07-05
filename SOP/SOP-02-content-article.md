# SOP-02 — Content Pipeline: บทความ / สคริปต์ / คอนเทนต์

> ใช้เมื่อโจทย์คือ "เขียนบทความ", "ทำสคริปต์วิดีโอ", "คอนเทนต์ให้ความรู้"
> Skill ที่เกี่ยวข้อง: `new-article`

## Pipeline

```
Minnie (idea cards) → Claudy เลือก card → Reese [Research] → Rae (draft)
→ Reese [Fact-check] → Chris QA → ส่งมอบ
```

## ขั้นตอนละเอียด

### ขั้น 1 — Minnie: Idea Cards
- Input: หัวข้อดิบจาก Kittanate (เช่น "อยากได้บทความเรื่องงานพิมพ์")
- สั่ง Minnie ผลิต **5 idea cards** ต่อหัวข้อ แต่ละ card มี: Concept / Target / Hypothesis /
  Research questions 3-5 ข้อ / Format hint
- Output: `Output/Minnie/YYYY-MM-DD-<topic>-concepts.md`
- Claudy เลือก 1 card พร้อมเหตุผล (ถ้า Kittanate ไม่ได้เลือกเอง) แล้วบันทึกการเลือกไว้ในไฟล์

### ขั้น 2 — Reese [Research]: Research Brief
- Input: card ที่เลือก + research questions ของ card นั้น
- Reese ตอบทุก research question พร้อมแหล่งอ้างอิง แยกชัด: ข้อเท็จจริง (มี source) vs สมมุติฐาน
- Output: `Output/Reese/YYYY-MM-DD-<topic>-research-brief.md`

### ขั้น 3 — Rae: Draft
- Input: idea card + research brief (แนบ path ทั้งสองไฟล์ให้ Rae อ่านเอง)
- กติกาเนื้อหา: ภาษาไทยธรรมชาติ / โครงเรื่องตาม card / **ทุกตัวเลข-ข้อเท็จจริงต้องมาจาก
  research brief เท่านั้น** ห้าม Rae เพิ่ม claim ใหม่ที่ไม่มีใน brief
- Output: `Output/Rae/YYYY-MM-DD-<topic>-article.md` (v1)

### ขั้น 4 — Reese [Fact-check] (บังคับ)
- Input: draft ของ Rae
- Reese ทำ claim inventory → verdict รายข้อ (✅/⚠️/❌/💬) → overall PASS/FAIL
- Output: `Output/Reese/YYYY-MM-DD-<topic>-factcheck.md`
- ถ้า FAIL: ส่ง verdict เต็มกลับให้ Rae แก้เป็น v2 → Fact-check ใหม่ (วนจนกว่า PASS, เพดาน 3 รอบ)

### ขั้น 5 — Chris QA
- Input: draft ที่ผ่าน fact-check + รายงาน fact-check
- Chris ตรวจ: ภาษาไทย / วัฒนธรรม / ความครบถ้วนตาม concept / ความพร้อมเผยแพร่
- Output: `Output/Chris/YYYY-MM-DD-qa-<topic>.md`
- ถ้า FAIL: กลับขั้น 3 (Rae แก้) → เข้า gate ใหม่ตั้งแต่ขั้น 4

### ขั้น 6 — ส่งมอบ
- รายงาน Kittanate: path ฉบับสมบูรณ์ / verdict ทุก gate / จุดที่แก้ระหว่างทาง
- เช็ค worklog + git push ตาม SOP-07

## มาตรฐานบทความ TANAPAT

- ความยาวมาตรฐาน: 800–1,500 คำ (ยกเว้น Kittanate กำหนดอื่น)
- โทน: professional but warm — เหมือนช่างพิมพ์รุ่นใหญ่เล่าให้ลูกค้าฟัง ไม่ใช่ตำราเรียน
- โครงบังคับ: hook เปิด → ปัญหา/ประเด็น → เนื้อหาเป็นข้อ ๆ → สรุป + CTA ที่โยงบริการ TANAPAT
- ทุกบทความจบด้วย 1 บรรทัด CTA เชื่อม TANAPAT Printing แบบไม่ hard-sell
- คำเทคนิคการพิมพ์: ใช้ไทยนำ วงเล็บอังกฤษครั้งแรก เช่น "ระยะตัดตก (bleed)"
