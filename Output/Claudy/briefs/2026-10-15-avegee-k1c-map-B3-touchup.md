# ใบงาน K1c: AVEGEE — เก็บงานภาพหลัก B2 อีก 2 จุด → B3 (inpaint) · suffix `-k1c`

## บริบท
- ต่อจาก K1a (`2026-10-15-avegee-k1a-map-B-edit.md`) วิธีเดิมทุกอย่าง: mask เฉพาะจุด → imagegen แก้บางส่วน → composite กลับ นอก mask เหมือนเดิม 100%
- ภาพตั้งต้น B2: `/Users/agapae/agapae-work/.codex-worktrees/20261015T035059Z-c07f7ea5/img/map-zone1/v2-draft/terrain-master-v2-B2.png` (1536×1024)
- ภาพซูมก่อน/หลังของ K1a: `.../v2-draft/B2-zoom.png` (worktree เดียวกัน)
- ภาพที่คุณเป้วางอาคารคร่าวๆ ทับ B2 (ดูบริบทว่าอะไรอยู่ตรงไหน ไม่ต้องวาดตาม): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-15-avegee-k/k1-placement-Kittanate.jpg` (2500×1667 = B2 ขยาย 1.628×)

## งาน (2 จุด px ของภาพ 1536×1024)
1. **ซ้าย — ขอบลาน ngiw ลงแม่น้ำ** (ราว x 130–310, y 680–715): ตอนนี้เป็นเส้นตรงตัดลงน้ำเฉยๆ → วาดเป็น**ตลิ่งหินดำมีพุ่มแดง/ส้มเล็กน้อย** แบบเดียวกับตลิ่งข้างเคียง (เช่นใต้ลาน tea x 600–720) ลานดินด้านบนคงขนาดเดิม
2. **ขวา — แท่งหินแนวตั้งที่ค้างในน้ำ** (ราว x 1265–1295, y 685–770): ลบออกให้เป็นน้ำม่วงต่อเนื่อง และให้ตลิ่งฝั่งบน (ใต้ป่าเขียว x 1280–1536, y ~670–700) เป็นแนวหินลงน้ำที่ต่อเนื่องเป็นธรรมชาติ

## ผลลัพธ์ (worktree `img/map-zone1/v2-draft/`)
- `terrain-master-v2-B3.png` 1536×1024 · `B3-zoom.png` (ก่อน/หลัง 2 จุด) · `B3-diff.png` · `prompts-k1c.md`

## ข้อห้าม
- ห้ามแก้ส่วนอื่น ห้ามใส่อาคาร/เรือ/ตัวหนังสือ · ห้ามแก้ `src/` `index.html` `tests/` · ห้าม commit/merge/push · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## เกณฑ์รับงาน
1. ทั้ง 2 จุดดูเป็นตลิ่ง/น้ำธรรมชาติ ไม่เห็นขอบ mask ที่ซูม 2×
2. B3-diff ต่างเฉพาะ 2 จุด
