# ใบงาน: AVEGEE — Codex gen ภาพ event 12 ชิ้นตาม prompt ของ Mind

**เจ้าของ:** Codex (สร้างภาพด้วยเครื่องมือสร้างภาพของ Codex) · **ผู้สั่ง:** Claudy (คุณเป้สั่ง "ส่งให้ codex วาดได้เลย" 29 ก.ย.) · **ตรวจ:** Claudy ดูภาพ → คุณเป้เลือก
Prompt ครบทุกภาพ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-09-29-avegee-event-art-prompts.md` — **ใช้ prompt EN ทั้งก้อน + negative prompt ตามไฟล์เป๊ะ** (Variant A เป็นค่าเริ่มต้น) · อ่านเช็กลิสต์หลัง gen ท้ายไฟล์
ข้อกำหนดวัฒนธรรม (บังคับ): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Reese/2026-09-29-avegee-zone-events-factcheck.md`

## งาน — gen ตามลำดับ (ภาพละ 1 ครั้ง; ถ้าผลผิดเช็กลิสต์ชัดเจน gen ใหม่ได้อีก 1 ครั้ง)
1. ยักษ์ผู้คุมชายแดน → `img/raw/boss-frontier-th.png`
2. บอสโซน 4 ใหม่ → `img/raw/CyberHell/Boss Zone4-cyberhell.png` (**อย่าเขียนทับไฟล์เดิมใน repo หลัก** — นี่คือไฟล์ใน worktree)
3–12. ภาพจำเป็นโซน 2–4 ตามตารางชื่อไฟล์ในไฟล์ของ Mind
- สไตล์อ้างอิงได้: `img/zone-boss.png` · **ห้ามแนบ/อ้าง `img/raw/Boss-frontier1.png`**
- ขนาด 1024×1024 พื้นโปร่งใส (ถ้าเครื่องมือให้โปร่งไม่ได้: พื้นขาวล้วน #FFFFFF ไม่มีลายเช็กเกอร์ ตัวมีเส้นขอบเข้มรอบตัว)
- บันทึกไฟล์ภาพไว้ใน worktree ตามพาธข้างบน (img/raw ถูก gitignore — ไม่เป็นไร Claudy จะคัดลอกจาก worktree เอง)

## ข้อห้าม
- ห้ามสัญลักษณ์ศาสนา: จักร/สังข์/ตรี/ดอกบัว/รัศมี/กางเขน/อักษรรูน/ปมนอร์ส ฯลฯ ตามไฟล์ Reese · ห้ามแก้โค้ด/ไฟล์อื่นใด · ไม่รัน prep-art

## รายงาน
ตาราง: ชื่อไฟล์ · พาธเต็ม · ขนาดพิกเซล · พื้นโปร่ง/ขาว · ผ่านเช็กลิสต์ไหม (ข้อไหนไม่ผ่าน) · ภาพที่ gen ไม่สำเร็จ + เหตุผล
