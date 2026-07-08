# Design Upskill — Mind/Vera เรียน "Claude Design" (Claudy)
Date: 8 ก.ค. 2569 · Scope: อัปสกิลอย่างเดียว (ยังไม่ redo VeeGee)

## ที่มา
งาน VeeGee Box ของ Mind ผ่าน Chris ด้านภาษา/layout แต่คุณภาพยังไม่ถึงระดับภาพอ้างอิง + พบพลาดเชิง process 2 จุด:
1. ออกแบบผิดขนาด — ใช้ die-cut 200×200×100mm ทั้งที่กล่องจริง 11×24×10 cm (จาก `Box4`)
2. ไม่ใช้ภาพถ่ายสินค้าจริงที่มีใน `Veegee/Product/` — วาด SVG vector แทน
3. ได้แค่ HTML/CSS mockup ไม่ใช่ artwork print-ready

## รากปัญหา = ช่องว่าง skill/เครื่องมือ
Mind มี tool แค่ Read/Write/WebSearch → เรนเดอร์/ตรวจงานตัวเองไม่ได้ + ไม่มี SOP บังคับสำรวจ asset ต้นทาง

## สิ่งที่ทำ (delegate การเรียน skill)
- **SOP-10-visual-design.md (ใหม่)** — สอนใช้ Claude Design (`artifact-design`): Step 0 สำรวจ asset ต้นทาง, ล็อกขนาดจริง, ใช้ asset จริง, quality bar = ภาพอ้างอิง, escalate Figma/Canva เมื่อต้อง print vector
- **mind-visual.md** — เพิ่ม tool `Skill` + เดิน artifact-design/SOP-10 เข้า workflow
- **vera-design.md** — เพิ่ม tool `Skill` + บังคับดึงขนาดจาก dieline ต้นทางจริง
- **SOP-08 D (QA)** — เพิ่มเช็ก "ขนาดตรง dieline ต้นทางจริง" + "ใช้ asset ต้นทางครบ" กันพลาดซ้ำ
- **CLAUDE.md** — ขึ้นทะเบียน SOP-10 + skill design

## ค้างไว้ (next)
- VeeGee redo ด้วย skill ใหม่ + ขนาด 11×24×10 + ภาพจริง — **รอ regulatory จากลูกค้า** (น้ำหนักสุทธิ, อย./ชื่ออาหาร/โภชนาการ, บาร์โค้ด/lot/วันหมดอายุ) และยืนยัน "ผักสด ~50g"
