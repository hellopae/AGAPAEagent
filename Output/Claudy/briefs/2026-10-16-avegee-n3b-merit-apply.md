# ใบงาน N3b: AVEGEE — ใส่ข้อความข้อบรรเทา 🪷 ใหม่ตามผลตรวจของ Rae + แก้บุญสุ่มไม่ตรงเพศ · เจ้าของ Toby

## บริบท
- ผลตรวจ Rae: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Rae/2026-10-16-avegee-merit-audit.md` (75 ข้อ, ไม่ผ่าน 10) — **อ่านทั้งไฟล์** มีเลขบรรทัด + ข้อความใหม่ + ข้อ `solid` ที่ต้องแก้พ่วง (asia A14 A15 A18 A20)
- Claudy ตัดสิน:
  - ใส่ข้อความใหม่ **8 ข้อ**: อดีตข้าราชการ ("ยอมเสียงานและอนาคตตัวเอง ไม่หวังตอบแทน"), boy ม.๓, เจ้าของกิจการ, healer ข้อ 2, asia A14 A15 A18 A20 (+ solid ที่ทวน)
  - **ยังไม่แตะ 2 ข้อ** (รอคุณเป้ตัดสิน): MERITS สุ่ม "ปล่อยปลาทุกวันเกิด (ปลาที่ซื้อมาเอง)" `v:0` และ "ญาติทำบุญอุทิศให้ทุกปี ไม่เคยขาด"
  - **บั๊กเพศ (Claudy ยืนยันแล้ว)**: `src/game.js` ~บรรทัด 247–253 สุ่ม `MERITS` ก่อนเลือก `who`/`sex` โดยไม่สนเพศ → "เคยบวชให้แม่หนึ่งพรรษา" ไปตกกับวิญญาณหญิงได้ · แก้: ใส่ `sex:'m'` ให้ merit ที่ผูกเพศ แล้วกรองตาม `SEX_OF[who]` (ย้ายการสุ่ม merit ไปหลังเลือก who) · ไล่หา merit อื่นที่ผูกเพศด้วย
- repo `/Users/agapae/agapae-work/AVEGEE` main ล่าสุด · worktree `../.toby-worktrees/n3b` branch `toby/n3b-merit`
- grep ข้อความเดิมทั้ง 8 ข้อทั่ว repo (src, tests, i18n, output) แก้ทุกสำเนา · ข้อความต้องไม่ล้นแผงสำนวน (ตรวจด้วย Playwright 1678 และ 390)

## เกณฑ์รับงาน
8 ข้อเปลี่ยนครบทุกสำเนา · merit ผูกเพศถูกกรอง (เทสต์: สุ่ม 2000 วิญญาณหญิงไม่มี "บวชให้แม่") · `node --test tests/*.test.mjs` 0 แดง · cache-bust `-n3b` (data.js import ไม่มี `?v=` — ใส่ผ่าน importmap ตามแบบที่ Dale ทำกับ i18n) · commit ใน branch (Dale รีวิว) · รายงาน `Output/Toby/2026-10-16-avegee-n3b-merit.md`
