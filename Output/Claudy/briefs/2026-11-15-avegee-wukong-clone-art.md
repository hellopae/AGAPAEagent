# WUKONG-CLONE-ART (Codex) — ร่างแยกหงอคง + การ์ดท่ากวาด · 15 พ.ย. 2569
Repo: AVEGEE worktree ของ run นี้ (แตกจาก main) · ImageGen ในตัว · ห้าม commit/push/merge เอง
- ส่งออก .webp: ภาพวาด q86, ภาพที่มีอัลฟาให้ใช้ lossless
- ห้ามมีตัวอักษรในภาพ
- หงอคงต้องหน้าตาและชุดตาม `img/z2-events/boss-wukong-asia.webp` (เกราะแดงทอง ห่วงทองที่หัว กระบองทอง)
- ฉากในศึกให้ดูจาก `img/z2-events/cut-wukong-arrives-asia.webp` และฉากศึกโซนบูรพา

## วาดทับไฟล์ placeholder เดิม (ชื่อเดิม ขนาดเดิม)
1. `img/z2-events/boss-wukong-clone-asia.webp` 512×512 RGBA — ร่างแยกจากขนหงอคง
   - รูปร่างเดียวกับหงอคงแต่เล็กกว่าเล็กน้อย
   - ตัวโปร่งแสงสีทองอ่อน ขอบเป็นเส้นขนปลิว ให้รู้ทันทีว่าเป็นร่างแยก (วาดในภาพ ไม่ใช่ย้อมด้วยโค้ด)
   - ท่าถือกระบองพร้อมสู้
2. `img/z2-events/boss-wukong-clone-asia-profile.webp` 512×512 RGB — ครึ่งตัวของร่างแยกข้อ 1 แบบ `boss-wukong-asia-profile.webp`
3. `img/z2-events/cut-wukong-sweep-asia.webp` 1672×941 RGB — การ์ดท่า "กระบองกวาดสิบทิศ"
   - หงอคงหมุนกระบองทองกวาดเป็นวงรอบตัว ลมและเศษหินพุ่งออกทุกทิศ
   - ไม่ต้องมียามาหรือทีมในภาพ
4. (ถ้าเหลืองบ) `img/z2-events/cut-wukong-clones-asia.webp` 1672×941 RGB — หงอคงถอนขนเป่าออก ขนกลายเป็นร่างแยกสีทองหลายตน
   - ไฟล์นี้ยังไม่มีในเกม ให้บอก Claudy ในรายงาน

## เกณฑ์และงบ
- check อัตโนมัติ: ไฟล์ครบ เปิดได้ ขนาดและโหมดสีถูก ขอบอัลฟาสะอาด
- retry ไม่เกิน 2 ครั้งต่อภาพ · งบ ImageGen ไม่เกิน 8 ครั้ง

## ส่งออก
- `docs/art-reviews/2026-11-15-wukong-clone-art/` มี contact sheet (jpg) และ README ภาษาไทย
