# AVEGEE P1-merge — PASS (Dale, 22 ต.ค. 2569)

- verdict: PASS (ไม่มี FIX LIST) · merge commit `d10b5a5` (--no-ff, push ไม่ force) · เทสต์ 1,272 ผ่าน / 0 แดง
- Pages run: 39733195485 success · live https://hellopae.github.io/AVEGEE/ · marker `ui.js?v=...-p5-p1-o2`, `room.js ...-p5-p1`, `worker-ui.js ...-p1`; `src/unlocks.js` 200
- รีวิว: เซฟเก่า (`buildLocked` ไม่ล็อกอาคารที่สร้างแล้ว; `teaBeds` เก่าไม่พัง — มีเทสต์ restore ทั้งสองกรณี) · `g.build` ปฏิเสธก่อนหักเงิน (เช็กก่อน `coin -=`; เทสต์ยืนยัน coin ไม่เปลี่ยน) · `nextNamedCase` คืน null เมื่อไม่มีคดีผ่านกรอง = เหมือนพฤติกรรมเดิม ผู้เล่นยังได้วิญญาณสุ่มตามปกติ + เทสต์ 60 รอบยืนยันว่ามีคดีชื่อให้เล่นเสมอในชุด krata-only · ไม่เปลี่ยนราคา/ค่าจ้าง · cache-bust ui.js ลงท้าย -o2 · ไม่มี console/debugger
- Rollback: `git revert -m 1 d10b5a5` (ต้อง revert P6 ก่อน f777602 ถ้าจะถอยทั้งคู่)
