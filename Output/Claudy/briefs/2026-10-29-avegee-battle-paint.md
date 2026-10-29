# PERF-BATTLE — ฉากต่อสู้ไม่ rebuild DOM ทั้งฉากทุกคำสั่ง (29 ต.ค. 2569) · ทำหลัง C1 merge
Repo: AVEGEE (worktree ของ run นี้ จาก main ล่าสุด) · ห้าม commit/push/merge เอง · bump `?v=` เฉพาะไฟล์ที่แก้ · browser ใน sandbox เปิดไม่ได้ — ไม่ต้องลอง (Dale ถ่ายภาพตอนรีวิว) · เทสต์เต็มรันครั้งเดียวตอนท้าย เขียนผลลงไฟล์

คุณเป้อนุมัติ 29 ต.ค. ("ฉากต่อสู้ แก้ได้เลย") จากข้อเสนอ Toby LOAD-01b: `paint` ใน `src/ui.js` rebuild DOM ทั้งฉากด้วย innerHTML ทุกคลิกคำสั่ง และถูกเรียกซ้ำจาก setInterval 400 ms → Long Animation Frame 140–230 ms บนมือถือ (CPU ×4) เป็นต้นเหตุ p95 ฉากต่อสู้สูง
รายงาน Toby: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-28-avegee-load01b.md` (harness วัดเฟรมอยู่ใน `output/coordination/2026-10-28-load01b/`)

## ขั้นตอน
1. แยกส่วนฉากต่อสู้ที่นิ่ง (พื้นหลัง, การ์ดทีม, layout) ออกจากส่วนที่เปลี่ยน (HP/MP, ลำดับเทิร์น, เมนูคำสั่ง, เป้าหมาย) — patch เฉพาะ node ที่เปลี่ยน
2. setInterval 400 ms: อัปเดตเฉพาะค่าที่เปลี่ยนจริง ไม่ rebuild
3. พฤติกรรม/ภาพ/ลำดับเทิร์น/ปุ่ม/keyboard ต้องเหมือนเดิมทุกอย่าง
## เกณฑ์รับงาน
1. วัดด้วย harness ของ Toby (Node/VM ถ้า browser ไม่ได้) จำนวน innerHTML rebuild ต่อคำสั่งลดลง · Dale วัด LoAF จริงตอนรีวิว
2. เทสต์ต่อสู้เดิมผ่านทั้งหมด + เทสต์ใหม่ว่า node คงอยู่ข้ามคำสั่ง · เทสต์เต็ม 0 fail
