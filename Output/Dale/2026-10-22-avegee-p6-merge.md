# AVEGEE P6-merge — PASS (Dale, 22 ต.ค. 2569)

- verdict: PASS + แก้เล็ก 1 จุดเอง · merge commit `f777602` (--no-ff, push ไม่ force) · เทสต์ 1,281 ผ่าน / 0 แดง (1,272 + 9 ใหม่ของ P6)
- ชนกัน index.html: room.js suffix รวมเป็น `20261022-p5-p1-p6`; ui.js ยังลงท้าย `-o2`; importmap parse ได้
- Pages run: 39733780733 success · marker บนเว็บจริง: `room.js ...-p5-p1-p6`, `pot-souls.js?v=20261022-p6`, `krata-qte.js?v=20261022-p6` ทั้งหมด 200
- รีวิว: listener ทั้งหมดผูก `events.signal` + timer เก็บใน Set แล้วล้างใน `stop()` (ไม่รั่ว) · pointer ทั้งจอข้าม `.mg-head,.g5-choices` (ปุ่มปิด/เลือกคนไม่ถูกกิน) + dedupe ด้วย WeakSet · บัฟเฟอร์แดงใช้ซ้ำต่อกระทะ (`bufFor`) สร้างใหม่เฉพาะเมื่อขนาดเปลี่ยน, haze วาดครั้งเดียว, `matchMedia` cache · reduced-motion ครอบคลุม (แดงคงที่/ไฟนิ่ง) · ไม่แตะตัวเลขความยาก/รางวัล
- แก้เล็กเอง: keydown ระดับ document ของ Space/Enter ใน krata-qte.js จะ preventDefault ปุ่มใน `<dialog>` ที่เด้งทับตอนมินิเกมเปิด (Enter กดยืนยัน dialog ไม่ติด) → เพิ่ม `dialog` ในรายการที่ข้าม
- ข้อสังเกตไม่บล็อก (มีมาก่อน P6): window keydown ของ ui.js (Space -> `tryFight()`) ยังทำงานตอนมินิเกมเปิด ไม่ได้มาจาก P6 · ถ้าคุณเป้เจอ Space ไปสู้เปรตระหว่างมินิเกม ให้ออกใบงานแยกเพิ่มเงื่อนไข `minigameQuit`
- Rollback: `git revert -m 1 f777602`
