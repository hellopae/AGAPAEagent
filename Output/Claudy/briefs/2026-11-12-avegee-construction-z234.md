# CONSTRUCTION-Z234 (Codex) — animation ก่อสร้างโซน 2–4 ตามสไตล์แต่ละโซน · 12 พ.ย. 2569
คุณเป้: "ของเก่าน่าจะเป็นภาพเดียวกันหมด ให้ Codex วาดตามสไตล์แต่ละโซนได้"
Repo: AVEGEE worktree ของ run นี้ (แตกจาก main) · งานวาด ImageGen ในตัว · ห้าม commit/push/merge เอง
ต้นแบบที่ผ่านแล้ว (โซน 1): `img/construction/th/stage-{1,2,3}.webp` + `construction.json` (704×704, 8 เฟรม, 8 fps, worldWidth 256) — โครง/ขนาด/จุดเท้า/จำนวนเฟรมเหมือนกันทุกโซน
สไตล์: asia = นรกจีน/ญี่ปุ่น ไม้แดงดำ หลังคาโค้ง (ดู `img/Asia/BG-*-asia.webp`, `img/map-zone2/`) · west = นรกตะวันตก หินเทา เหล็ก น้ำแข็ง (`img/West/`) · cyberhell = เหล็ก นีออนฟ้า/ม่วง สายไฟ (`img/CyberHell/`) · คนงานใช้ sprite คนงานโซนนั้น (`img/workers/worker-<zone>-sheet-v2.webp`) · ไม่มีหลังคา/อาคารเสร็จ (ใช้ได้กับทุกสถานี)
งบ: ImageGen ≤ 14 ครั้ง/โซน · ทำ asia ก่อน แล้ว west, cyberhell · ส่งเท่าที่เสร็จ
ส่งออก `docs/art-reviews/2026-11-12-construction-z234/<zone>/stage-{1,2,3}.webp` (**webp**: ภาพมีอัลฟา lossless) + `construction.json` + `preview/*.gif` + README ไทย
check อัตโนมัติ = ไฟล์ครบ/เปิดได้/ขนาดถูก เท่านั้น · retry ≤ 2 ไม่รีเซ็ต (skill codex-reset-queue "กันวนซ้ำ")
