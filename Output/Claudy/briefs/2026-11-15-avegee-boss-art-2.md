# ใบงาน Codex — BOSS-ART-2: บอส event ตัวใหม่ 4 ตัว (สไปรท์ + การ์ดท่า) · 15 พ.ย. 2569
บอส event โซน 3–4 ยังไม่มีภาพในเกม · มีต้นแบบที่ Codex วาด 1 พ.ย. (W4): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-11-01-art-w4/assets/` `w4-cerberus-v1.png`, `w4-jormungandr-v1.png`, `w4-ai-scammer-robot-v1.png` (อ่านอย่างเดียว ใช้เป็นแบบหน้าตา) · PHANTOM-404 ยังไม่มีต้นแบบ ออกแบบตามคำบรรยาย Rae

## ข้อกำหนดร่วม (อ่านก่อน)
- สเปกท่าและคำบรรยายภาพทุกใบ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Rae/2026-11-14-avegee-boss-skills.md` หัวข้อ 2–4 (ค้นชื่อไฟล์ในตารางแล้วอ่านบรรทัด "การ์ด:" ของบอสนั้น)
- การ์ดท่า: 1672×941 RGB webp · สไตล์เดียวกับ `img/z2-events/cut-wukong-arrives-asia.webp` และ `cut-wukong-sweep-asia.webp` (Codex วาดแล้วใน worktree `~/agapae-work/.codex-worktrees/20261114T174152Z-4dfd205d` อ่านได้) · บอสหันเข้ากล้อง ทีมยามา+นิราเล็กมุมล่างซ้าย · **ไม่มีตัวอักษรเลย**
- หน้าตาบอสต้องตรงสไปรท์ที่ใบงานอ้าง (`img/...` ใน repo) ห้ามเปลี่ยนตัวละคร · ห้ามลอกจากเกม/การ์ตูนอื่น
- repo `~/agapae-work/AVEGEE` main · ส่งภาพที่ path ตามตาราง (สร้างโฟลเดอร์ใหม่ได้) · ห้ามแก้ src/ tests/ หรือภาพเดิม · webp เท่านั้น (PNG ทำงานชั่วคราวใน art-src/ ได้) · ห้ามย้อมสีด้วยโค้ด
- หลักฐาน: contact sheet + ภาพเทียบกับสไปรท์ต้นแบบ ที่ `docs/art-reviews/<วันที่>-<ชื่องาน>/` + README บอกไฟล์ที่ส่ง/ที่ค้าง
- เกณฑ์รับงาน: 1) ไฟล์ครบ ขนาด/โหมดตรง 2) ตัวละครตรงต้นแบบ 3) ไม่มีตัวอักษร 4) สไตล์เข้ากับการ์ดหงอคง
- งบ: ใกล้หมดให้ส่งเท่าที่เสร็จตามลำดับในตาราง แล้วจดที่ค้างใน README

## ภาพที่ส่ง (ตัวละครละชุด ทำทีละตัวครบชุดก่อนไปตัวถัดไป)
สไปรท์ยืน 512×512 RGBA พื้นโปร่ง + `-profile.webp` 512×512 RGB (แบบ `img/z2-events/boss-wukong-clone-asia*`) + การ์ดท่า
1. Cerberus: `img/z3-events/boss-cerberus-west.webp` + `-profile` + `img/z3-events/cut-cerberus-howl-west.webp` (ตาเรืองเขียวจางของการถูกสะกด)
2. Jörmungandr: `img/z3-events/boss-jormungandr-west.webp` + `-profile` + `img/z3-events/cut-jormungandr-tide-west.webp`
3. AI Scammer Robot: `img/z4-events/boss-aiscammer-cyberhell.webp` + `-profile` + `img/z4-events/cut-scammer-phishing-cyberhell.webp` (จอ/หน้าต่างเป็นแถบสีกับไอคอน ไม่มีตัวอักษรหรือลิงก์)
4. PHANTOM-404: `img/z4-events/boss-phantom404-cyberhell.webp` + `-profile` + `img/z4-events/cut-phantom404-delete-cyberhell.webp` · ลูกน้อง `img/z4-events/phantom404-entry-cyberhell.webp` + `-profile` (ถ้างบพอ)

งบ ImageGen ≤ 14 ครั้ง · ≤ 60 นาที
