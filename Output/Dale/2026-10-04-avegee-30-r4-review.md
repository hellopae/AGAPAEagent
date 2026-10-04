# Dale — 30-R4: รีวิว + merge AVEGEE 30B (ฉากต่อสู้)

วันที่ 2026-10-04 · repo `/Users/agapae/agapae-work/AVEGEE` · ไม่ได้แตะ `Claude/AVEGEE` เดิม

## ผล: PASS (merge + push + live แล้ว)

- **commit บน main: `278d09c`** (ต่อจาก `012ca53` แบบ fast-forward; rebase 9 commit ของ Toby บน main ไม่ชนเลย รวม `src/ui.js` และคัตซีน 30A)
- Live: https://hellopae.github.io/AVEGEE/ — ยืนยัน `src/art.js` ใหม่ (`30b-art`), manifest มีรายการโปรไฟล์ใหม่, `hero-boss-west-profile.webp` โหลดได้ 512×512, หน้าชื่อเกมขึ้นปกติที่ 1280 และ 390, pageerror = 0 (404 ของ `bgm-*.ogg` / `hero-yama-side.png` มีอยู่ก่อนแล้ว เป็นไฟล์ fallback ที่เกมลองโหลด ไม่เกี่ยวกับรอบนี้)

## ตรวจ diff เทียบข้อห้าม 30B
- แตะเฉพาะ `index.html, src/{ui,battle-scale,command-wheel.css,data,game,i18n,room}.js` + ใหม่ `battle-facing.js`, `mp-regen.js`, `tests/30b.test.mjs` — ไม่แตะ `img/raw/`, `Exam/`, `files/`, `CONCEPT.md` · ไม่รัน make-manifest · ไม่เปลี่ยนเลขสมดุล · ข้อความมี TH+EN
- เทสต์ 328/328 ผ่าน (ก่อน merge บน branch rebase แล้ว และหลัง merge บน main) · `node --check src/*.js` ผ่าน · `git diff --check` สะอาด

## เบราว์เซอร์จริง (Playwright Chromium 1280×800, 1440×900 + 390×844 เพิ่ม) — ผ่านทุกข้อ
1. หน้าต่างเตรียมศึก (บอสโซน 2, 3, พัก wave 4/8 โซน 4): หน้าตาแบบแจ้งเตือนอีเวนต์ กด 3 ช่องได้ — พ่อค้า → เปิดร้านแล้วปิดกลับมาหน้าเตรียมศึกเดิม · นิรา → เปิดโต๊ะนิราแล้วกลับมาเหมือนกัน · น้ำมนต์ MP 10→40 และจำนวน 2→1 (หีบยากดไม่ได้ในรอบทดสอบ เพราะ HP ในศึกเต็ม — ปุ่ม disabled ตามเงื่อนไขเดิม) · ปุ่ม pause ใน prep และในศึกทำงาน ปิดแล้วหน้าเดิมยังอยู่ (pause ของ 30C ไม่พัง)
2. ทีมหันขวาทุกโซน: ยมทูตโซน 3 ทั้งสาม + เพลิงโซน 4 ไม่ถูกพลิก (วาดหันขวาอยู่แล้ว) · กากิโซน 2 ถูกพลิกให้หันซ้าย · ขนาดยมทูต/ยมบาท = 0.96 ทุกโซน
3. Rage: ภาพยมบาทเปลี่ยนเป็นท่าชาร์จที่ตำแหน่งยมบาททั้ง 4 โซน (`fxInYou: true`, `fxInFoe: false`, ศัตรูไม่สะดุ้ง) · rageTurns = 3 · ป้ายคงเดิม
4. MP จำนวนเต็ม + แถบฟ้า (กว้าง 53–68px ไม่ใช่ 0) ทั้งโซน 1 และ 4 · "รับรางวัล" อยู่กลางจอ (665,385) · "ฟังคำตัดสิน" · ไอคอนหัวใจเป็น glyph แทนกล่องยา · คัตซีน `crew-guard-west` / `crew-plerng-cyberhell` หันขวาหลังรวมกับ 30A (ไม่มี mirror) และภาพคลุมกรอบ ไม่มีแถบดำ

## งานที่ Dale ทำเพิ่ม
1. **โปรไฟล์หัวหน้าโซน 3**: `_hero-boss-west-profile.jpeg` (1024²) → `prep()` ใน `scripts/prep-art.py` (เรียก `prep()` ตรง ไม่รัน main) → แปลงเป็น `img/West/hero-boss-west-profile.webp` 512×512 (68 KB) · ใส่ manifest `zones.west` ด้วยมือ · bump manifest cache `20261004-recovery-ice` → `20261004-30b-art` · ยืนยันในเบราว์เซอร์: ศึกพ่อโซน 3 มุมขวาล่างใช้ภาพนี้ (`hudImg = img/West/hero-boss-west-profile.webp`)
2. **แก้เล็กใน boon เรืองแสง (ข้อ 9)** — ของ Toby ผ่านตามเกณฑ์ แต่เห็นจากภาพว่า glow กว้าง 170% ไปครอบยักษ์ข้าง ๆ ดูเหมือนยักษ์เรืองแสงแทนยมบาท → ลดเหลือ 125% + เพิ่ม drop-shadow เขียว-ทองที่สไปรต์ยมบาท (สีเดิมของ Toby ไม่เพิ่ม token ใหม่ · reduced-motion เป็นแสงนิ่ง) ตรวจภาพหลังแก้แล้ว ยมบาทเรืองชัด

## ภาพที่คุณเป้ควรดู (`Output/Dale/30b-shots/`)
- `dale-1-prep-boss-west-1280.jpg` — หน้าต่างเตรียมศึกใหม่
- `dale-1-rest-wave4-1440.jpg` — พัก wave โซน 4
- `dale-7-dad-lose-west-1440.jpg` — โปรไฟล์ใหม่มุมขวาล่าง + ปุ่ม "ฟังคำตัดสิน" + ทีมหันขวา
- `dale-4-rage-cyberhell-1280.jpg` — Rage ที่ตัวยมบาท
- `dale-9-boon-glow-fixed-1280.jpg` — boon หลังแก้
- `dale-10-cut-west-guard-1280.jpg` — คัตซีนยักษ์หันขวา เต็มกรอบ
- `results.json` + `scenario-r4.py` / `harness.py` (สคริปต์ Playwright ที่ใช้)

## ข้อสังเกตเพื่อ QA (ไม่ใช่ blocker)
- ทดสอบด้วย harness ตั้ง state ด้วยโค้ด ไม่ได้เล่นเดินจริงถึงบอส → ให้ Chris/คุณเป้ลองเล่นจริงอีกครั้ง โดยเฉพาะ: นั่งพักศาลาน้ำชาแล้วเข้าศึก MP ต้องเป็นจำนวนเต็ม · กดหีบยาในหน้าเตรียมศึกตอน HP ไม่เต็ม
- หน้าเตรียมศึกใช้ภาพพ่อค้ารุ่นเดียว (`merchant-profile.jpeg`) ทุกโซน และนิราตามโซน (`crew-nira-profile`) — ตรงกับหน้าต่าง "ปลดปล่อยหัวหน้าทั้งสี่" เดิม ไม่ได้แยกพ่อค้ารุ่น cyberhell ถ้าต้องการให้แยกเป็นงานใหม่
- ไอคอนหัวใจยังเป็น glyph ชั่วคราว รอ `img/item-heart.png` (512×512 RGBA) · ท่าโจมตียมบาทโซน 3/4 (`hero-yama-<zone>-atk`) ยังไม่มี Rage ใช้ `atk-R` (สเปคอาร์ตตามรายงาน Toby)

## Roll back
ย้อนทั้ง 30B (10 commit ของ Toby + 1 ของ Dale; history เป็นเส้นตรง ไม่มี merge commit): `cd /Users/agapae/agapae-work/AVEGEE && git revert --no-edit 012ca53..278d09c && git push origin main` · ย้อนเฉพาะส่วนของ Dale (โปรไฟล์ + glow): `git revert 278d09c`
ย้อนแล้ว manifest cache ต้อง bump ใหม่เพื่อให้ Pages ไม่ค้างของเก่า

## Cleanup
ลบ worktree `toby-30b` + branch local `toby/30b` แล้ว · ไม่แตะ `toby-30d` และ worktree Codex 30F (`20261004T102020Z-b10d4d39`, `20261004T102716Z-6fa6f4d7`)
