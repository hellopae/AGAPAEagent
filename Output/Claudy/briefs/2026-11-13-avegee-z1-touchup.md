# Z1-TOUCHUP (Codex) — ซ่อมพื้นโซน 1 อีก 2 จุดเล็ก · 13 พ.ย. 2569
Repo: AVEGEE worktree ของ run นี้ (แตกจาก main ที่ใช้พื้น `img/map-zone1/v7r/`) · ImageGen ในตัว (แก้ภาพโดยแนบ crop ต้นฉบับ) · ห้าม commit/push/merge เอง
ข้อมูลประกอบ/ตำแหน่ง: `docs/art-reviews/2026-11-12-z1-v7r-assemble/` (README, compare/, game-zoom/) · รายงาน `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-11-12-avegee-z1-v7r.md`
## 2 จุด
1. **lava-north-stair มุมล่างขวา**: ขอบตรงแนวตั้ง ~25 px (เอาต์พุต) ที่ใบไม้แดงตัดกับพื้น (~60×40 map px) → วาดให้ใบไม้/พื้นต่อกันเป็นธรรมชาติ
2. **heaven-bridge ล่างซ้าย**: ก้อนเมฆขอบตัดตรง → ขอบเมฆนุ่มต่อเนื่อง
- คงรูปทรงบันได/ราว/สะพาน/ทางเดิน (structure ≤ 4 px) · สี/แสงเท่ารอบข้าง · ไม่เพิ่มวัตถุ
## ส่งออก
`docs/art-reviews/2026-11-13-z1-touchup/<จุด>/native.webp` (lossless) + `registration.json` (rect ใน map px 2× ของ v7r, affine) + `compare.jpg` (ก่อน | หลัง ที่ซูมเกม) + README ไทย · Claude จะประกอบเข้า v7r เอง
งบ ImageGen ≤ 6 · check = ไฟล์ครบ/เปิดได้ · retry ≤ 2
