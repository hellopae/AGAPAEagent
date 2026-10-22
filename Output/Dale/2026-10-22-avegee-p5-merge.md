# AVEGEE P5 merge — PASS

- Verdict: PASS (`toby/p5-map-exits` 182b834 + 46fec0f)
- Merge commit: `a4d26b6` (main, push แล้ว ไม่ force) · เทสต์ 1,263 / pass 1,263 / fail 0
- ชน index.html: preload.js ใช้ฝั่ง P2 (`-p2`), room.js ใช้ฝั่ง P5 (`20261022-p5`), ui.js (importmap + script tag) รวมเป็น `20261021-worker-supplies-p2-p5-o2` (ลงท้าย -o2 ผ่านเทสต์ O2), meta build `20261021-worker-supplies-p2-p5`
- Pages: run success (ล่าสุดหลัง push a4d26b6) · marker `avegee-build` = `20261021-worker-supplies-p2-p5` · `src/exit-marker.js`, `frontier.js`, `town-shade.js`, `ui.js?v=…p2-p5-o2`, `room.js?v=20261022-p5` โหลด 200
- ผลรีวิว: latch ใช้ `exitStep` เดียวกันทุกฉาก (เข้าฉากแล้ว latched=true ต้องเดินออกก่อน) · blocked ครอบคลุม ศึก/pendingRecovery/ตาย/มินิเกม/หอทะเบียน/ฝึก/หลับ/คัตซีน(cut)/encounter dispatch · เงาอาคาร bake ครั้งเดียวต่อ art+ขนาด แคชใน WeakMap/Map ไม่คำนวณทุกเฟรม · โพลิกอน TOWN_CAULDRON_COURT เปิดเฉพาะพื้นปูหินฝั่งตะวันออก ขอบตะวันตกห่างตัวกระทะ 12 หน่วย ตัวกระทะ/prop collider ยังตัน · ไม่มีโค้ดดีบัก
- ข้อสังเกต: การทดสอบมือบนมือถือจริง (ลูกศรออก/โพลิกอนกระทะ) ยังเป็นหน้าที่ Chris/คุณเป้ ตาม QA ปกติ
- Rollback: `git revert -m 1 a4d26b6` แล้ว push (P2 ยังอยู่)
