# Z234-HD-FULL — วาดพื้นเมืองโซน 2–4 ความละเอียด 2× แบบเดียวกับโซน 1 · 10 พ.ย. 2569 (Codex)

คุณเป้ (10 พ.ย. 23:10): "ในคิวงานไม่เห็นว่ามีวาดแผนที่ 4 โซน ถ้าวาดแผนที่ 4 โซนเสร็จแล้ว push ขึ้น main ได้เลย"
โซน 1 เสร็จแล้ว (HD-FULL 1–8 + ASSEMBLE `20261110T115811Z-6ad6e037`) · คุณเป้ดูพื้น HD โซน 1 แล้ว "ชัดดีครับ โอเคเลย"

Repo: AVEGEE worktree ของ run นี้ (แตกจาก branch `claude/2026-11-05-zone1-v5-fx`) · งานวาดล้วน · ห้าม commit/push/merge เอง · **ImageGen ในตัวเท่านั้น** ห้าม Shado

## วิธี = ใบงานโซน 1 ทุกข้อ
อ่านและทำตาม: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-11-05-avegee-z1v5-hd-full-3.md` (วิธี 2×2 ต่อ chunk + ขอบซ้อน 64 px, register ≤ 4 px, ลบวัตถุที่ยามาเดินทับ, ของเหลว/เมฆวาดคงไว้เป็นฐาน, ห้ามเปลี่ยนรูปทรงลาน/บันได/หน้าผา/ตลิ่ง)
ต้นแบบผลจริงของโซน 1 (ดูสไตล์/สคริปต์/registration): `/Users/agapae/agapae-work/.codex-worktrees/20261105T025229Z-00c52f6e/docs/art-reviews/2026-11-05-z1-v5-plaza-detail/` และ `/Users/agapae/agapae-work/.codex-worktrees/20261110T105803Z-bc08e0c8/docs/art-reviews/2026-11-05-z1-v5-hd-full/`

## ต่างจากโซน 1
- ภาพตั้งต้น (master 1×, grid r1–r4 × c1–c5 เหมือนโซน 1): โซน 2 asia `img/map-zone2/v2/` · โซน 3 west `img/map-zone3/v1/` · โซน 4 cyberhell `img/map-zone4/v3/` (ดู `src/zone-skin.js` ว่าเกมโหลดชุดไหน + repairs ของโซนนั้นถ้ามี)
- สไตล์ของแต่ละโซนต้องคงเดิม (asia = นรกจีน/ญี่ปุ่น, west = นรกตะวันตก น้ำแข็ง, cyberhell = เมืองไซเบอร์ แสงฟ้า/ม่วง) — เพิ่มแค่ความคม/รายละเอียด
- วัตถุที่ยามาเดินทับ: ทำ `objects-inventory.json` ของโซนนั้นเอง (เทียบ walkmask/วัตถุใน `src/` ของโซน) แล้วลบตามหลักเดียวกัน
- ส่งออก `docs/art-reviews/2026-11-10-z<N>-hd-full/<chunk>/` (N = 2,3,4) โครงไฟล์เหมือนโซน 1 · ≤ 80 MB ต่อ run
- run ละ 4 chunk · ImageGen ≤ 16 ครั้ง · ไม่ทันส่งเท่าที่เสร็จ ระบุส่วนค้างใน run-summary

## เกณฑ์รับงาน = โซน 1 (sharpness ≥ ×10, structure ≤ 4 px, ไม่เห็นรอยภายใน chunk, native+registration ครบให้ ASSEMBLE)
