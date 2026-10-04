# B8-R — รีวิว + merge B8 (minigame ฝึก krajok / sawan / sala / ngiw) ของ Toby

**ผล: PASS** · repo `/Users/agapae/agapae-work/AVEGEE` · main = `a5cd39c` (push แล้ว, fast-forward จาก `822ed51` ไม่มี rebase/force)
live: https://hellopae.github.io/AVEGEE/ (เช็กแล้ว `src/minigames/training/mirror.js` 200 และ ui.js มีโค้ดแก้ปุ่ม · เล่นซ้ำบน live ที่ 1280/390 ไม่มี page error)

## commit ที่เข้า main
- `f9763fb` `58cf58a` `1a02bea` `1e982d1` — B8-1..4 ของ Toby (ไม่แก้เนื้อหา)
- `3f9e390` merge main (B5-R `822ed51`) เข้ากิ่ง — ไม่มี conflict
- `a5cd39c` B8-R แก้บั๊กปุ่ม "ออกไปแผนที่" ทับวงทองจุดฝึกที่ 390px (`src/ui.js` onFrame, +10 บรรทัด)

## ตรวจ diff
แตะเฉพาะ `src/minigames/training/*` (host.js +2, index.js, kit/panel-host/mirror/breath/documents/targets ใหม่, training.css ใหม่), `index.html` 1 บรรทัด (`<link>` css), `src/training.js` 1 บรรทัด (`trainingTargets` ให้ผู้ฝึก shared คือนิรา/ยมบาทผ่านตัวกรองโซน — `isShared` มีอยู่แล้ว) · ไม่แตะ game.js/data.js · ไม่ใช้ asset · logic ปลอดภัย: ผลซ้ำ/session ผิด/ยกเลิก ไม่ได้ EXP (มีเทสต์) · ด่านกระจกมี solver brute-force 300 seed
เทสต์: **433/433** หลัง merge (main 409 + B8 24) · `node --check` ทุกไฟล์ `src/` ผ่าน · `git diff --check` สะอาด · repo ไม่มี build step

## บั๊กที่ใบงานสั่งแก้ (ข้อ 3)
สาเหตุ: ปุ่ม `#st-exit` ถูกวางเหนือหัวยมบาท −42px เสมอ ฉากที่ 390px สูงแค่ ~190px ปุ่มสูง 44px เลยทับวงทองจุดฝึก (act) ในห้อง **dab, lokan, krata** (วัดจริง; 360px ก็ทับ dab/lokan)
แก้: ถ้าตำแหน่งปกติทับวง (กรอบวง + เผื่อแตะ ±36×20px) ให้ลองเลื่อนซ้าย → ขวาข้างตัวละคร → ลอยเหนือวง ตามลำดับ · จอกว้างที่ไม่ทับอยู่ที่เดิม
ผลวัดทั้ง 8 ห้อง × (390, 360, 1280): **ไม่ทับทั้งหมด** (ก่อนแก้ 390: dab/lokan/krata ทับ; 360: dab/lokan ทับ) — ภาพ `Output/Dale/b8-shots/01-...`

## เบราว์เซอร์ (Playwright Chrome headless; ตรงกับ live ซ้ำ)
- 1280×800 (เมาส์) และ 390×844 (touch จริงผ่าน `touchscreen` + CDP touch สำหรับ hold ของ sawan)
- **เปิดครบ 8 สถานีฝึก**: dab/lan/lokan/krata (B4) เปิดได้ ผู้ฝึกถูกคน ปุ่มเริ่มกดได้ · dab เริ่มเล่นแล้วปิด ✕ ปกติ
- **เล่นจบ 4 เกมใหม่ × 2 รอบ** ทั้งสองขนาดจอ — EXP ไปถึงคนเดียวที่ถูก (กานต์/บุญ/นิรา/ดำ; ตรวจ diff ของ `g.training` ทุกรอบ ไม่มีคนอื่นขยับ)
  - รอบที่ 2 ถึง Lv2: การ์ดเปลี่ยน `Power ×1.00 → ×1.06` และ `allyStats.order` 9 → 10 ทั้ง กานต์ / บุญ / นิรา; ดำ Lv2 ได้ที่ 390 (รอบ 1+2 = 60 EXP), ที่ 1280 ดำได้ 50/60 เพราะแตะหนาม 1 ครั้งและพลาด 2 จุดตามที่ตั้งใจ (ถูกต้องตามสูตร)
  - คะแนนตัวอย่าง: กระจก 100 (ลำแสงถึงประตู) · ลมหายใจ 96–98 (8/8 รอบ) · เอกสาร 100 (2 ชุด) · ต้นงิ้ว 79–83 (พลาด 2 จุดตั้งใจ)
- pause (กระจก): เวลาหยุด (0.97 → 0.97 หลังรอ 1.2 วิ) ข้อความ "หยุดพัก" · เล่นต่อได้
- layout 390: `.mg-stage` ไม่มี overflow แนวตั้ง/นอน · ไม่มีปุ่ม/จุดแตะเล็กกว่า 44px ในเกมใหม่ · การ์ด/ปุ่มอ่านภาษาไทยปกติ
- ไม่มี page error; 404 ที่เห็นคือ `audio/*.ogg` / `hero-yama-side.png` (optional มี fallback เหมือนที่เห็นใน B5-R)

## ข้อสังเกต (ไม่ block)
1. ปุ่มทางออกในห้อง sawan/krajok ที่ 1280 วางเหนือหัวตัวละครเหมือนเดิม — ไม่ทับวงทอง ไม่ต้องย้าย
2. กติกา sala แบบ "สลับเอกสารติดกัน" ยังเป็นข้อเสนอของ Astra รอคุณเป้ยืนยัน (ตามรายงาน Toby) · ค่าสมดุลเกมใหม่ยังเป็นค่าตั้งต้น
3. ภาพยังเป็น placeholder CSS/SVG/emoji สเปกอาร์ตอยู่ใน `Output/Toby/2026-10-05-avegee-b8.md`
4. ไม่ได้ทดสอบ iOS Safari จริง (Chrome จำลอง touch)

## ล้างงาน
ลบ worktree `~/agapae-work/.codex-worktrees/toby-b8` + branch local `toby/b8` (ไม่เคย push ขึ้น remote) · ลบ `Output/Toby/b8/` (เก็บ .md) · หยุดเซิร์ฟเวอร์ทดสอบพอร์ต 8813 · ไม่แตะ worktree Codex B6 · clone หลักยังอยู่บน `main`

## Roll back
`cd /Users/agapae/agapae-work/AVEGEE && git revert --no-edit a5cd39c 1e982d1 1a02bea 58cf58a f9763fb` (ใหม่→เก่า; `3f9e390` เป็น merge ฝั่งกิ่ง ไม่ต้อง revert) · ก่อน B8 = `822ed51`
เฉพาะบั๊กปุ่ม: `git revert a5cd39c` · เฉพาะนิราฝึกไม่ได้ (training.js:42) ถ้า revert B8 ทั้งชุดจะกลับมาเป็นบั๊กเดิม

## ภาพ (`Output/Dale/b8-shots/`)
01 ปุ่มทางออก 390 ก่อน/หลัง (dab ก่อน · dab หลัง · krata หลัง) · 02 สี่เกมที่ 390 (กระจก/ลมหายใจ/เอกสาร/ต้นงิ้วผลลัพธ์) · 03 sawan 1280 · 05 krajok 1280
