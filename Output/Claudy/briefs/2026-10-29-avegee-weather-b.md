# WEATHER-B — หมอก+หิมะโซน 3 · พายุฝนฟ้าผ่าโซน 4 · น้ำไหลตรวจใหม่ (29 ต.ค. 2569)
Repo: AVEGEE (worktree ของ run นี้ จาก main ล่าสุด) · ห้าม commit/push/merge เอง · bump `?v=` เฉพาะไฟล์ที่แก้ · browser ใน sandbox เปิดไม่ได้ — ทำภาพประกอบจาก renderer แบบ offscreen/Node ถ้าทำได้ · เทสต์เต็มครั้งเดียวตอนท้าย
ภาพประกอบ (ถ้าต้องใช้): **built-in `image_gen` เท่านั้น** ห้าม Shado · ระบบเดิมที่ต้องต่อยอด ไม่สร้างซ้ำ: `map-ambient.js`, `frontier-ambient.js`, `town-night-effects.js`, `map-fx-h3.js`, flow field น้ำ/ลาวา L3 (`docs/zone2-surface-flow-2026-10-27.md`, `docs/zone3-border-effects-2026-10-27.md`), เงา L1/L2 (`town-shade.js`)
ข้อบังคับทุกเอฟเฟกต์: ไม่ทับ UI/ป้าย · ไม่ทำให้ตัวละครอ่านไม่ออก · reduced-motion = นิ่ง/ลดลง · มือถือ: จำกัด particle ตาม DPR/ขนาดจอ ไม่ทำให้ frame time แย่ลงเกิน ~2 ms (วัดด้วย harness LOAD-01b `output/coordination/2026-10-28-load01b/`) · เปิด/ปิดได้ใน settings ถ้ามีระบบอยู่แล้ว
ที่มา: BACKLOG คุณเป้ 27 ต.ค. `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/BACKLOG.md` §P6 (อ่านเกณฑ์เต็ม + ชื่อคลิป reference)

1. **โซน 3** หมอกลอยต่ำ + หิมะตกมากขึ้น (เมือง + ชายแดน 2–3 ฝั่งหิมะ + 3–4 ฝั่งตะวันตก)
2. **โซน 4** พายุฝน + ฟ้าผ่า (แสงแฟลชสั้น ไม่กะพริบถี่ — ปลอดภัยต่อผู้ไวต่อแสง: ≤3 แฟลช/วินาที, reduced-motion = ไม่มีแฟลช) + ชายแดน 3–4 ฝั่งไซเบอร์
3. **WATER-01** เปิดตรวจรับน้ำเดิมใหม่ตาม feedback: ผิวน้ำไหลต่อเนื่องตามทิศทาง/น้ำตกและฟอง **ไม่ใช่แสงประกายวิ่งเป็นเส้น** ทุกเมืองและชายแดนที่มีน้ำ (ต่อยอด flow field L3)
## เกณฑ์รับงาน
1. ภาพก่อน/หลังต่อโซน + ภาพน้ำ 3 จุด · เกณฑ์แฟลชผ่าน · ตาราง frame time
2. เทสต์เต็ม 0 fail · `output/coordination/2026-10-29-weather-b/`
