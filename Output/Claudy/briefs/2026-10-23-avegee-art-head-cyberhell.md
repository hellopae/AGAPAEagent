# ใบงานวาด ART-head-cyberhell: AVEGEE — cutscene หัวหน้าโซน cyberhell ชม / ตำหนิ · เจ้าของ Codex (วาดภาพเท่านั้น)

## บริบท
- คุณเป้อนุญาต 22 ต.ค. 2569 ให้ Claude สั่ง Codex วาดภาพ · คุณเป้แจ้ง 23 ต.ค. ว่า Codex reset แล้ว · Claude ไม่มี imagegen · โค้ดเป็นงานของ Claude (Toby) — **ห้ามแก้โค้ด**
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** — ห้ามเขียนลง clone หลัก ห้ามสร้าง worktree/branch/clone เอง ห้าม git commit/push (wrapper ทำให้)
- สเปกเต็ม: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-22-avegee-art-queue-codex.md` — **§5 ชิ้นที่ 4: prompt โซน 1 (§5.1) เป็นโครง + §5.2 บล็อกโซน `cyberhell`** + §8 (pre-flight) · สคริปต์ §8 ให้รันใน working directory ปัจจุบัน
- ตัวละครอ้างอิง: `img/head-cyberhell-punish-cutscene-v1.png` (ใช้เฉพาะตัวละคร/ชุด/ของถือ ห้ามลอกวังวนเวทมนตร์) · โทน/องค์ประกอบให้เข้าชุดกับภาพโซน 1 ที่อยู่ในเกมแล้ว `img/head-th-praise-cutscene-v1.png` / `img/head-th-scold-cutscene-v1.png`

## งาน
1. pre-flight §8 วัดภาพอ้างอิง
2. วาด → `img/head-cyberhell-praise-cutscene-v1.png` และ `img/head-cyberhell-scold-cutscene-v1.png` 1672×941 PNG
3. ตรวจเองตาม "เกณฑ์ตรวจรับ" 1–5 ท้าย §5.2 (ตัวละครเดิม · ชมมีรางวัล โทนอุ่น · ตำหนิไม่มีวังวน ไม่มีเลือด · ไม่มีตัวอักษร/สัญลักษณ์ศาสนา · ส่วนสำคัญเหนือ 70% ของความสูง)
4. เขียน `output/art-queue-2026-10-23/head-cyberhell.md`: ไฟล์ที่สร้าง + ขนาดจริง (วัดด้วย PIL) + prompt ที่ใช้จริง + จุดที่ต่างจากสเปกพร้อมเหตุผล + คอนแทคชีต/ภาพเปรียบเทียบก่อน-หลังใน `output/art-queue-2026-10-23/head-cyberhell/`

## ข้อห้าม
ห้ามแก้ `src/`, `index.html`, `tests/`, catalog/manifest · **ห้ามเขียนทับไฟล์ภาพเดิม** (สร้างไฟล์ชื่อใหม่ตามที่กำหนด) · ห้ามบอกว่า "ผ่าน" เอง (Toby ตรวจตอนเสียบ)

## เกณฑ์รับงาน
ไฟล์ปลายทางครบ ขนาดตรง · README ชิ้นนี้ครบ · ไม่มีไฟล์อื่นนอก `img/` ปลายทางและ `output/art-queue-2026-10-23/` เปลี่ยน
