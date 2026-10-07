# ใบงาน R1 (Codex image): AVEGEE — วาดภาพ "ตวาดข่มขู่" โซน 1 และ 4 ใหม่ ให้ชุดตรงตัวละครในเกม

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ฐาน = `c6fcd97` (origin/main = codex-app/2026-10-04)
ที่มา: คุณเป้ 7 ต.ค. 2569 ดูภาพข่มขู่ v4 แล้วบอกว่า "เหมือนชุดของโซน 1 และ 4 จะไม่ตรงครับ" → "ส่งให้ codex ไปวาดใหม่ได้ครับ"
บริบทเต็ม: `docs/claude-handoff-2026-10-07.md` หัวข้อ "งานค้างล่าสุดที่ผู้ใช้แจ้ง" · prompt เดิม `img/roar-v4-prompts.json`

## ขอบเขต
วาดใหม่ 2 ภาพ **เขียนทับไฟล์เดิม ชื่อเดิม ขนาดเดิม 1671×941** (resolver ใน `src/power-cutscene-assets.js` ไม่ต้องแก้):

1. `img/hero-yama-th-roar-cutscene-v4.png` (โซน 1) — ชุดต้องตรง `img/hero-yama.png`:
   ชฎาทองทรงเรียว · เสื้อดำขอบทอง · ผ้ากลาง/ด้านในแดง · คอเสื้อแดง · ชุดเรียบ
   **ไม่มี** บ่าเกราะใหญ่ สายคาดอก หรือเครื่องประดับอลังการ
2. `img/hero-yama-cyberhell-roar-cutscene-v4.png` (โซน 4) — ชุดต้องตรง `img/CyberHell/hero-yama-cyberhell.png`:
   หมวกดำม่วงทรงเฉพาะมีปีกด้านหน้าตรงกลาง · เสื้อคลุมดำม่วงขอบลายเรียบ · คอ/ผ้าขอบเทา
   **ไม่มี** บ่าเกราะ หรือเสื้อแดงแซมดำ

ทั้งสองภาพ: คงองค์ประกอบ v4 — close-up ใบหน้าขู่ + ออร่าหัวเสือด้านหลัง ความอลังการต่ำ (ไม่มีวงคลื่น ระเบิด หินลอย ฉากมหากาพย์) · โทน/แสง/สไตล์เดียวกับ v4 โซน 2 และ 3 (`img/hero-yama-asia-roar-cutscene-v4.png`, `img/hero-yama-west-roar-cutscene-v4.png`) ที่คุณเป้ไม่ทักท้วง

## ขั้นตอน
1. เปิดดู sprite อ้างอิงทั้งสอง + ภาพ v4 ปัจจุบันทั้ง 4 ชุด ก่อนวาด ใช้ sprite ในเกมเป็น reference ชุด **ไม่ใช้** cutscene v3 (รายละเอียดคลาดเคลื่อน)
2. สร้างด้วย built-in `image_gen` (แนบ sprite อ้างอิงเป็นภาพ input) → ครอป/ย่อให้ได้ 1671×941 พอดี
3. อัปเดต prompt ของสองภาพใน `img/roar-v4-prompts.json`
4. bump cache ใน `src/preload.js` จาก `?v=20261007-asset-cleanup` (บรรทัด 8) เป็น `?v=20261008-roar-outfit`
5. ทำภาพเทียบ `output/roar-v4/outfit-fix-compare.jpg` (ซ้าย sprite อ้างอิง · ขวาภาพใหม่ ทั้ง 2 โซน)

## ข้อห้าม
- ไม่แตะภาพโซน 2/3 · ไม่แตะโค้ดตรรกะ · ไม่แตะ `Exam/`, `files/`, `AVEGEE-backup/`
- ไม่วาดภาพด้วย Python (Python ใช้แค่ครอป/ย่อ) · ไม่ commit / merge / push

## เกณฑ์รับงาน
1. ชุดโซน 1 ตรง `img/hero-yama.png` ครบทุกจุดในขอบเขต ข้อ 1
2. ชุดโซน 4 ตรง `img/CyberHell/hero-yama-cyberhell.png` ครบทุกจุดในขอบเขต ข้อ 2
3. ยังเป็น close-up หน้าขู่ + ออร่าเสือ ความอลังการต่ำ สไตล์เข้ากับโซน 2/3
4. ไฟล์ชื่อเดิม 1671×941 PNG · ข้อความไม่ทับใบหน้า (ภาพไม่มีตัวหนังสือในตัว)
5. `node --test tests/*.test.mjs` ผ่านทั้งชุด · `node scripts/check-image-archive.mjs` ผ่าน · `git diff --check`

## รายงาน
ใน report ของ run: ไฟล์ที่เปลี่ยน, prompt ที่ใช้, path ภาพเทียบ, ผลเทสต์, self-check ทีละเกณฑ์
