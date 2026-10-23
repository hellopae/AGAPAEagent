# ใบงานวาด ART-m1-zone2-s2: AVEGEE — sprite บ้าน 4 แบบโซน 2 · เจ้าของ Codex (วาดภาพเท่านั้น)

## บริบท
- คุณเป้สั่ง 23 ต.ค. 2569: วาดแผนที่โซน 2–4 ใหม่ตามโครง/ระบบโซน 1 ธีมอิงแผนที่เดิมของแต่ละโซน · คุณเป้อนุญาตให้ Claude สั่ง Codex วาดภาพ · **ห้ามแก้โค้ด**
- สเปกเต็ม (อ่านทั้งไฟล์ แต่ทำเฉพาะชิ้นนี้): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-23-avegee-m1-zone2-art-spec.md` — **§2 + §4.1 + §4.3** · ใช้ prompt EN / negative / ไฟล์ปลายทาง / เช็กลิสต์ ตามสเปกเป๊ะ
- ผลสำรวจระบบ (ขนาด/พิกัด): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-23-avegee-m0-map-survey.md` · ภาพ guide ผังโซน 1: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-23-avegee-m0-map-survey/zone1-layout-guide.png`
- คำตัดสิน Claudy: ภูมิภาคตาม §2.3 ของ Mind · มวลต้นไม้ฉากหลังได้เฉพาะนอกพื้นที่เดินได้ (§2.4) · **ห้ามรูปเคารพ ลายม่านจื่อ ตัวอักษร** (§2.6)
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** — ห้ามเขียนลง clone หลัก ห้ามสร้าง worktree/branch/clone เอง ห้าม git commit/push (wrapper ทำให้)

## งาน
1. วัดไฟล์อ้างอิงที่สเปกระบุ (PIL) บันทึก
2. วาดตามสเปก → ไฟล์ปลายทางตามสเปก (ขนาด/โหมดสี/สี key ตามสเปก)
3. ตรวจเองตามเช็กลิสต์ในสเปก · คอนแทคชีต/ภาพเทียบกับโซน 1 ใน `output/m1-zone2/s2/`
4. README `output/m1-zone2/s2.md`: ไฟล์ที่สร้าง + ขนาดจริง + prompt ที่ใช้จริง + จุดที่ต่างจากสเปกพร้อมเหตุผล

## ข้อห้าม
ห้ามแก้ `src/`, `index.html`, `tests/`, catalog/manifest · ห้ามเขียนทับไฟล์ภาพเดิม · ห้ามบอกว่า "ผ่าน" เอง (Toby ตรวจตอนเสียบ)

## เกณฑ์รับงาน
ไฟล์ปลายทางครบ ขนาดตรงสเปก · README ครบ · ไม่มีไฟล์อื่นนอก `img/` ปลายทาง, `img/raw/map-zone2/` (ถ้าสเปกกำหนด) และ `output/m1-zone2/` เปลี่ยน
