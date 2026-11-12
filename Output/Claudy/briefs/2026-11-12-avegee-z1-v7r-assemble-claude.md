# ใบงาน Toby — ประกอบพื้นโซน 1 ชุดซ่อม (v7r) เองด้วยสคริปต์ แทน Codex · 12 พ.ย. 2569

## บริบท
- Codex ซ่อม 7 จุด fallback ของ v7: **REPAIR-2 (3 จุด) ผ่าน** `/Users/agapae/agapae-work/.codex-worktrees/.codex-worktrees/20261111T212700Z-98218760/docs/art-reviews/2026-11-11-z1-v7-native-repairs/` · **REPAIR-1 (4 จุด) ภาพ native ครบ แต่รอยต่อกับ native รอบนอกยังไม่ทำ** `/Users/agapae/agapae-work/.codex-worktrees/.codex-worktrees/20261111T214451Z-8741fd14/docs/art-reviews/2026-11-11-z1-v7-native-repairs/` (README + test-results.json ระบุค้าง: แนวต่อกับ native รอบนอก, ขอบบนสะพาน, foam)
- คิว Codex หยุดแล้ว (ไม่ผ่าน check 2 ครั้ง ตามกติกาใหม่) · Codex weekly เหลือ ~6% → **งานประกอบ/ตัดต่อรอยต่อไม่ต้องวาดใหม่ ให้ Claude ทำ** (กติกา skill codex-reset-queue ข้อ 5–6)
- สคริปต์ประกอบต้นแบบของ Codex: `~/agapae-work/.codex-worktrees/20261110T115811Z-6ad6e037/docs/art-reviews/2026-11-05-z1-v5-hd-assemble/scripts/` (assemble.py min-cost seam + feather, verify.py) · ชุด v7 ปัจจุบันในเกม `img/map-zone1/v7/`
- คุณเป้: เน้นความชัด · merge main เมื่อพื้นโซน 1 เสร็จ

## ที่ทำงาน
worktree `~/agapae-work/.toby-worktrees/z1-v5` (ต่อจากงาน shader เต็มแผนที่ — เริ่มหลังงานนั้น push แล้ว) · สร้างภาพใน worktree/scratch ของ Toby เท่านั้น อ่าน .codex-worktrees ได้ ห้ามเขียน

## ขั้นตอน
1. วาง native ของ 7 จุดซ่อมลงบนพื้น v7 2× ตาม registration ของแต่ละ run · ตัดต่อรอยต่อกับ native รอบนอกด้วย min-cost seam + feather แบบ assemble.py · ปรับสี/ความสว่างเฉพาะแถบรอยต่อ
2. ขอบบนสะพาน: ถ้าตัดต่อไม่สวย ใช้ v7 เดิมตรงแถบนั้นแทน (ระบุใน README)
3. ตรวจ structure (≤ 5 px ยอมรับ) + seam-check ภาพขยาย 7 จุด + ทดสอบ foam/ของเหลว shader ทับตรง
4. ติดตั้ง: `python3 scripts/install-z1-ground.py <pack>/v7 --name v7r --activate` · ตรวจราวบันไดท่าเรือ (ลบ off ของ pier ถ้าชุดซ่อมไม่มีราวฝัง)
5. ภาพเทียบ v7 | v7r ทั้ง 7 จุด · fps · เทสต์ทั้งหมด
## ข้อห้าม
ห้ามวาดใหม่/ImageGen · ห้าม merge main · ห้ามแตะ LaunchAgent/AVEGEE หลัก · หลักฐาน ≤ 20 MB
## ส่งงาน
`Output/Toby/2026-11-12-avegee-z1-v7r.md` (ไทย) · commit · push branch
## เกณฑ์รับงาน
1. 7 จุดคมเท่ารอบข้าง ไม่เห็นรอยต่อที่ซูมเกม 2. walkmask/ของเหลวตรง · เทสต์ผ่าน 3. เกมใช้ v7r
