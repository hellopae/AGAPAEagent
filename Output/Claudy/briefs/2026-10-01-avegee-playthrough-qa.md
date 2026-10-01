# ใบงาน: AVEGEE — QA เล่นจริงในเบราว์เซอร์ main `10733fc` (event 4 โซน)

**เจ้าของ:** Dale · **ผู้สั่ง:** Claudy · คุณเป้สั่ง "go ทำได้เลย ถ้าติดอะไรบอก" 1 ต.ค. 2569
Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` — main `10733fc` (= origin/main) · เทสต์ `node --test tests/*.test.mjs`
สถานะที่ต้องปิด: `IMPLEMENTATION_STATUS.md` ข้อค้างสุดท้าย "Play the whole four-zone story through the UI with a fresh save"
บริบท: ชุด 26B (`d0edf62`), ภาพ 12 ชิ้น (`1ddad05`), event 4 โซน + MP/EXP (`10733fc`) ถูก merge โดยไม่ผ่านรีวิวเบราว์เซอร์ของ Dale

## ขั้นตอน
1. รันเทสต์ทั้งหมด (คาด 124 ผ่าน)
2. เปิดเกมในเบราว์เซอร์ เซฟใหม่ ที่ 1440×810 — เดินเนื้อเรื่องตาม event ใน `IMPLEMENTATION_STATUS.md` หัวข้อ Story events ให้ได้มากที่สุด
   - ใช้ทางลัดได้ (แก้ state ผ่าน console / localStorage เพื่อข้ามไปจำนวนคดีที่ trigger) — ไม่ต้องเล่นคดีทุกคดีจริง แต่ **ทุก event ต้องเห็นฉากจริงอย่างน้อยครั้งละ 1** และระบุว่าข้ามมาด้วยวิธีไหน
   - จุดบังคับตรวจ: frontierBreach 3 wave (ป้าย wave, ฟื้นบารมีระหว่าง wave, รางวัลครั้งเดียว, แพ้ → ท้าซ้ำ) · ปุ่มสะกดจิตมีผลจริงในฉากสู้ · ภาพ event 12 ชิ้นแสดงถูกตัว/ถูกโซน ไม่มีภาพแตก · ฉากจบ continue/New Game · เซฟ/โหลดกลาง event
3. สุ่มเช็ก 390×844 อย่างน้อย: ฉากสู้หลายศัตรู, หน้าต่างเตือน event, แผนที่โลก
4. จด console error ทุกตัว

## ข้อห้าม
- ไม่ refactor · ไม่เปลี่ยนสมดุลตัวเลข · ไม่แตะ `CONCEPT.md`, `files/`, `Exam/`, `output/`, `img/raw/*` และไฟล์ untracked ที่มีอยู่
- บั๊กเล็ก (แก้ ≤ ~15 บรรทัด ชัดเจน) แก้ได้ + เทสต์ผ่าน → commit + push · บั๊กใหญ่/ไม่แน่ใจเจตนาออกแบบ → **ไม่แก้** จดลง FIX LIST

## เกณฑ์รับงาน
1. เทสต์ผ่านทั้งหมด (ก่อน+หลังแก้)
2. ตาราง event ทุกตัวใน Story events: เห็นจริงไหม · ผล OK/บั๊ก · วิธีที่ข้ามมา
3. จุดบังคับตรวจข้อ 2 ครบทุกข้อ
4. ไม่มี console error ใหม่ หรือจดไว้ครบ
5. ถ้าครบจริง ติ๊กข้อค้างใน `IMPLEMENTATION_STATUS.md` (ถ้าไม่ครบ เขียนว่าเหลืออะไร)

## รายงาน
`Output/Dale/2026-10-01-avegee-playthrough-qa.md` · ตอบกลับสั้น: PASS (+ commit ที่แก้) หรือ FIX LIST เรียงเลข
