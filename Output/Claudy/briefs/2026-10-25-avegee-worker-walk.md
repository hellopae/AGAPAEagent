# A3 — คนงานเดินชูมือ

คุณเป้สั่งทำคิวต่อ; ภาพ8.pngคนงานโซน2เดินยื่นแขนไปด้านหน้าตลอด และให้ตรวจทุกโซน. Base d5fd268. Branchcodex/2026-10-25-worker-walk ใช้worktreeสะอาดเดิมtea-rest-20261025ตามลำดับ ไม่มีagent/งานซ้อน.

สาเหตุจากภาพatlasและcode: workerRowให้escortrow3เหนือmoving/directionเสมอ จึงใช้ท่ายื่นแขนทุกโซน. ให้ผู้พาวิญญาณใช้walkingrow1/4/5ตามทิศทาง เมื่อหยุดใช้idle0; อัปเดตheadingและmovingจากระยะที่ตำแหน่งtimelineเปลี่ยนจริง. คงท่าแบกวัสดุและทำงานเมื่อถึงจุด. ไม่แก้ภาพ/ความเร็ว/เส้นทาง/ระยะคนงาน-วิญญาณ(A4คิวถัดไป)/เศรษฐกิจ.

รับงาน: side/up/down/หยุดทุก4โซนเลือกเฟรมถูก ไม่มีescortarmforwardขณะเดิน; drawWorkerใช้rowจริงโดยfeet/insets/fitเดิม; ไม่มีผลต่อเส้นทางส่งวิญญาณ,ตัวนับส่งครั้งเดียว,สร้าง/ซ่อม/เก็บวัสดุ,พัก2นาที. ทดสอบrealadvanceWorkerEscort/rendererและregressions, fullzero-red, browserภาพก่อน/หลังและPages/live. คิวA3ติ๊กหลังpublishเท่านั้น. รอคุณเป้ตรวจรับภาพ; เก็บbranch/worktreeตามhandoff.
