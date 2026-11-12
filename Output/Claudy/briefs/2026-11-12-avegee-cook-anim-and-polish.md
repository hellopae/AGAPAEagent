# ใบงาน Toby — animation พ่อครัว/คนเสิร์ฟ (เก็บจาก Codex) + แก้เล็ก 3 ข้อ · 12 พ.ย. 2569

## ที่ทำงาน
worktree `~/agapae-work/.toby-worktrees/z1-v5` branch `claude/2026-11-05-zone1-v5-fx` (= main `1ee18746` แล้ว, 8942 เสิร์ฟจากที่นี่) · **คุณเป้อนุญาต merge main เองเมื่องานเสร็จ+เทสต์ผ่าน (ให้ Claudy เป็นคน merge)**
⚠️ ตั้งแต่ 1ee18746 ภาพเกมเป็น **.webp** ทั้งหมด (ภาพวาด q86 m6, sprite/อัลฟา lossless) · deploy เฉพาะ index.html/src/img/audio

## 1. animation พ่อครัว + ถือข้าวปั้นเดินเสิร์ฟ (ใช้ของ Codex ไม่วาดใหม่)
- ชุดส่งมอบ Codex: `/Users/agapae/agapae-work/.codex-worktrees/.codex-worktrees/20261111T170902Z-d171c309/docs/art-reviews/2026-11-10-worker-cook/` (cook 4 โซน + carry TH · README/loop-review บอกจุดค้าง: หัว/สัดส่วนช่วงเฟรม 4→5, 8→1, cyberhell ซ้าย 4→5, TH ซ้ายเฟรม 7)
- แก้เองด้วย Pillow/SPA (skill `sprite-animation-spa`): จัดจุดเท้าให้นิ่งเทียบ sheet เดิม, ตัด/ซ้ำเฟรมที่หัวกระโดด, ล็อกขนาดตัวให้เท่าคนงานเดิม (90% ยามา), ขอบอัลฟาสะอาด · **ห้ามเลื่อน/เฟดภาพนิ่งแทน animation**
- เสียบที่จุดเสียบที่มีแล้ว `img/workers/worker-<zone>-cook-v1.webp` + json · carry ใช้กับคนเสิร์ฟ TH (โซนอื่นใช้ท่าเดินเดิม + ข้าวปั้นเล็กในมือถ้าทำได้ด้วยโค้ด)
- GIF เทียบ ก่อน/หลังแก้ 4 โซน
## 2. ป้ายศัตรูตอน 3 ตัวที่ 390 px (Dale เจอ)
ป้ายแคบ ตัวหนังสือ 9–10 px "กำลังใจ 94 / 94" ตก 3 บรรทัด · ชื่อ "เปรตปากเท่ารูเข็ม" ตัดกลางชื่อ · ปุ่ม "หนี" ทับขอบกล่องคำบรรยาย 13 px → ปรับ layout ให้อ่านได้ (ย่อชื่อด้วย … หรือ 2 บรรทัด, HP บรรทัดเดียว, ปุ่มไม่ทับ) ทั้ง 1/2/3 ตัว และ 1792
## 3. preload: เอา preview v5 (0.96 MB) ที่ไม่ใช้ออกจาก catalog · ใส่ preview v7r แทน
## 4. `scripts/prep-art.py` เซฟเป็น webp (กฎเดียวกับ Dale) เพื่อภาพใหม่ไม่หลุดเป็น PNG
## ข้อห้าม
ห้ามแตะ `Documents/Work PAE/Claude/AVEGEE`, LaunchAgent, เขียน `.codex-worktrees` · หลักฐาน ≤ 20 MB
## ส่งงาน
`Output/Toby/2026-11-12-avegee-cook-anim-and-polish.md` (ไทย) · commit แยกต่อข้อ · push branch · เทสต์ทั้งหมดผ่าน
## เกณฑ์รับงาน
1. พ่อครัว 4 โซนปั้นข้าวปั้นในเกม loop ไม่กระโดด ขนาด/จุดเท้าตรง 2. ป้ายศัตรู 3 ตัวที่ 390 อ่านครบไม่ทับ 3. preload/prep-art ตามข้อ 3–4 · เทสต์ผ่าน
