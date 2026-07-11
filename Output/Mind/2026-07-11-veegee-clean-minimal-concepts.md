# VeeGee — Clean Minimal Box Artwork (3 Concepts)

- **วันที่:** 11 ก.ค. 2569
- **Agent:** Mind (visual) + Vera (layout) · orchestrated by Claudy
- **โจทย์ (Kittanate):** เปลี่ยนแนว artwork กล่อง VeeGee เป็นคลีน/มินิมอลตามตัวอย่าง (มู้ดบอร์ด AG1 / Athletic Greens 8 รูป) ปรับสี+ฟอนต์ให้เข้ากับตัวอย่าง ตัดข้อความส่วนเกิน เหลือเฉพาะที่จำเป็น ขอ 3 ตัวอย่าง
- **Fact-check:** ข้าม (งาน pure design/layout ไม่มี factual claims — ตามกฎ 6)
- **QA (Chris):** ยังไม่ได้รัน — session นี้เปิดจากนอก project folder จึง delegate persona agent ไม่ได้ (เหมือนเคสใน BACKLOG P0) ต้องเข้า QA รอบหน้าก่อน ship จริง

## Asset ต้นทางที่ใช้ (ตาม SOP-10)
- Dieline จริง: `Veegee/Box4.jpg` → กล่อง **กว้าง 11 × ยาว 24 × สูง 10 cm**
  - พาเนลหน้า (หลัก) = 24×10 · ฝาบน = 24×11 · พาเนลข้าง = 11×10
- โลโก้จริง: `Veegee/logo/VeeGee Logo Beet with Tagline.png` (script + "LIVE BRIGHT") — ฝังเป็น data URI, พื้นเข้มใช้ CSS filter ทำเป็นขาว
- Copy master: `Veegee/VeeGee_Box_Copy_Master.docx` — 15 ซองคละรส, 4 รส (Strawberry Beetroot / Kiwi Lime / Blueberry Red Grape / Japanese Melon)

## 3 คอนเซปต์
1. **Beet Minimal** — พื้นบีทเข้ม #7a1e44 โลโก้ขาว (คงเอกลักษณ์ VeeGee) — **แนะนำ**
2. **Orchard Green** — พื้นเขียวสน #1e3a32 (ใกล้พาเลตต์ตัวอย่างที่สุด) เก็บบีทเป็นแอกเซนต์รส
3. **Cream & Beet** — พื้นครีม #f1e9da โลโก้บีทสีเดิม โปร่ง/พรีเมียมสุด

## สิ่งที่ตัด vs. คงไว้
- **หน้ากล่องเหลือ:** โลโก้ + 1 บรรทัด ("Pure fruit & veggie blends") + จำนวนซอง
- **ฝาบน:** โลโก้อย่างเดียว (ตาม copy master)
- **รส:** ย้ายเป็น 4 จุดสีบนพาเนลข้าง (จุดสีเดียวที่มีสีสัน แบบตัวอย่าง)
- **วิธีชง/allergen/ผู้จัดจำหน่าย:** ย้ายไปพาเนลหลัง/ข้าง
- **ฟอนต์ในม็อกอัป** = Georgia + Helvetica Neue (stand-in) — งานพิมพ์จริงค่อยสลับเป็นฟอนต์ลิขสิทธิ์ที่ตรงตัวอย่าง

## ผลงาน
- ไฟล์: `Veegee/VeeGee_Box_CleanMinimal_Concepts.html`
- Artifact (ลูกค้าเปิด/แชร์ได้): https://claude.ai/code/artifact/45644201-ecbd-4e8d-a411-6354ff642a85

## Next step
Kittanate เลือกทิศทาง (หรือผสม) → Vera ล็อก dieline spec เต็ม → Mind ทำ print-ready CMYK/300dpi/bleed 3mm → Chris QA ก่อน proof
