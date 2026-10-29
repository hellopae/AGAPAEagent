# WEATHER-A — เงาเมฆ + ควันโซน 1 + ลำแสง/ละอองโซน 2 (29 ต.ค. 2569)
Repo: AVEGEE (worktree ของ run นี้ จาก main ล่าสุด) · ห้าม commit/push/merge เอง · bump `?v=` เฉพาะไฟล์ที่แก้ · browser ใน sandbox เปิดไม่ได้ — ทำภาพประกอบจาก renderer แบบ offscreen/Node ถ้าทำได้ · เทสต์เต็มครั้งเดียวตอนท้าย
ภาพประกอบ (ถ้าต้องใช้): **built-in `image_gen` เท่านั้น** ห้าม Shado · ระบบเดิมที่ต้องต่อยอด ไม่สร้างซ้ำ: `map-ambient.js`, `frontier-ambient.js`, `town-night-effects.js`, `map-fx-h3.js`, flow field น้ำ/ลาวา L3 (`docs/zone2-surface-flow-2026-10-27.md`, `docs/zone3-border-effects-2026-10-27.md`), เงา L1/L2 (`town-shade.js`)
ข้อบังคับทุกเอฟเฟกต์: ไม่ทับ UI/ป้าย · ไม่ทำให้ตัวละครอ่านไม่ออก · reduced-motion = นิ่ง/ลดลง · มือถือ: จำกัด particle ตาม DPR/ขนาดจอ ไม่ทำให้ frame time แย่ลงเกิน ~2 ms (วัดด้วย harness LOAD-01b `output/coordination/2026-10-28-load01b/`) · เปิด/ปิดได้ใน settings ถ้ามีระบบอยู่แล้ว
ที่มา: BACKLOG คุณเป้ 27 ต.ค. `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/BACKLOG.md` §P6 (อ่านเกณฑ์เต็ม + ชื่อคลิป reference)

1. **CLOUD-01** เงาเมฆนุ่มเคลื่อนบนพื้น **และตัวละครพร้อมกัน** ทุกเมือง (ความเข้ม/ความเร็วต่อโซน) ไม่ทับ UI ไม่มืดจนอ่านตัวละครไม่ได้
2. **โซน 1** ควันไฟ — ลอยจากกระทะ/คบไฟ/จุดลาวาที่มีในภาพ (ใช้ตำแหน่งแหล่งไฟเดิม)
3. **โซน 2** ลำแสงส่องลง (god rays) + ละอองลอย
4. ชายแดน 1–2 / 2–3 ใช้เงาเมฆ + เอฟเฟกต์ตาม biome ของสองฝั่ง
## เกณฑ์รับงาน
1. ภาพก่อน/หลังต่อโซน (desktop + 390) · reduced-motion นิ่ง · ตาราง frame time ก่อน/หลัง
2. เทสต์ particle cap ตามจอ + ปิดตาม reduced-motion · เทสต์เต็ม 0 fail · `output/coordination/2026-10-29-weather-a/`
