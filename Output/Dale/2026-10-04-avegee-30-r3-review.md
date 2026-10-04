# Dale review 30-R3 — 30A (cutscene / intro บอส, Codex → Toby): **PASS** (merge แล้ว)

## Commit บน main (hellopae/AVEGEE, push แล้ว, fast-forward จาก `fcde11d`)
- `012ca53` 30A: cutscene captions below art, crop painted letterbox, boss intro scenes for zones 2-4, right-facing zone 3/4 crew cutscenes
  (index.html, src/ui.js, src/cutscene-presentation.js ใหม่, tests/30a.test.mjs ใหม่)
- Dale ไม่ได้แก้โค้ดของ Toby · แก้ rebase conflict เท่านั้น (ดูล่าง) · ไม่ต้อง bump cache: ไม่มี asset/manifest ใหม่ (JS/CSS ไม่มี version query ในโปรเจกต์นี้)
- Live https://hellopae.github.io/AVEGEE/ มี `cutscene-presentation.js` + `pause-dlg` · 1280×800 และ 1440×900: ไม่หน้าขาว, ไม่มี pageerror, ไม่มี 4xx/5xx

## Rebase บน fcde11d
- conflict เฉพาะ `index.html` 2 จุด (บล็อก CSS `.intro-comic-*` / `.zone-arrival-*`) · main มีการเปลี่ยน `object-fit:cover` → `contain` จากชุดห้องกว้าง (6baa2ce) → เลือกฝั่ง 30A ทั้งสองจุด เพราะ 30A แก้แถบดำด้วยตาราง crop + กรอบสัดส่วนจริง (contain จะทำให้แถบดำกลับมา) · `src/ui.js` merge อัตโนมัติ ส่วน pause/dialog ของ 30C ไม่ถูกแตะ
- ตรวจ diff: 4 ไฟล์ตามขอบเขต · ไม่แตะสมดุล/img/raw/Exam/files/CONCEPT · ไม่รัน make-manifest · ไม่มีสีใหม่ (ใช้ `--card/--gold/--foreground`) · ไม่มีข้อความผู้เล่นใหม่ (ไม่ต้องเพิ่ม i18n)
- `node --test tests/*.test.mjs` **313/313** · `node --check src/*.js` ผ่าน · `git diff --check` สะอาด

## เบราว์เซอร์จริง (Playwright Chromium, เซฟใหม่ + จำลองสถานะผ่าน `window.G`)
เกณฑ์ 30A ข้อ 1–2: วัด `getBoundingClientRect` + สแกนแถวดำจากภาพกรอบ ที่ **1280×800 และ 1440×900** · ทุกหน้าผ่านทั้ง 26 หน้า/ความละเอียด: caption.top >= frame.bottom, controls.top >= caption.bottom, dialog อยู่ในจอ, caption ไม่ถูกตัด, ไม่มี scroll แนวนอน, แถบดำบน/ล่าง = 0px
| ฉาก | ผล |
|---|---|
| arrival โซน 2/3/4 (ผ่าน `moveZone` จริง) 2 หน้าแต่ละโซน | ผ่าน |
| **intro บอสโซน 2** | ภาพฉาก `Intro-Boss-Zone2-asia.png` ครบ 4 หน้า |
| **intro บอสโซน 3 (เส้นทางจริง)** ย้ายโซน → ปิดคดีโซนครบ → `bossPending` → `onChange` ปกติ | ภาพฉาก `West/Intro-Boss-Zone3-west.png` (อัศวินแดงบนบันไดพรม + ยมบาทหมวกเขา) ครบ 4 หน้า → ต่อด้วยป้ายเตือนบอสตามปกติ |
| **intro บอสโซน 4** (เส้นทางเดียวกัน แต่บังคับ `bossPending` เพราะโซน 4 ไม่ใช้ `bossReady`) | ภาพฉาก `CyberHell/Intro-Boss-Zone4-cyberhell.png` ครบ 3 หน้า |
| story: asia 5 หน้า, west 2 หน้า, ending 2 หน้า ("ผู้ปกครองทั้งสี่โซน" ผ่าน) | ผ่าน |
| popup ฉากจบ (`finalWin`) | ภาพย่อ 150×150 เต็มกรอบ แถบดำ 0 (ภาพ cover 148×196 ซูมเข้า) |
- **cutscene หันขวา**: `crew-guard-west-cutscene.jpeg` และ `crew-plerng-cyberhell-cutscene.jpeg` → class `right-facing`, `animation actionRushRight`, transform scaleX เป็นบวก (หันขวา) ที่ทั้งสองความละเอียด · ตัวควบคุม `crew-plerng-west-cutscene.jpeg` และ `crew-kan-west-cutscene.jpeg` ยัง `scaleX` ลบเหมือนเดิม (ไม่กระทบที่อื่น) · ข้อจำกัด: ยิงผ่านศึกบอสโซน 3 จริงกับยักษ์/ยมทูต; ของโซน 4 สลับ `G.zone='cyberhell'` ก่อนกดท่า เพราะโซน 4 เปิดศึกบอสแบบปกติไม่ได้ในสภาพเซฟจำลอง
- **pause ของ 30C ยังทำงานหลัง rebase** (ยิง blur+focus 3 รอบ): ระหว่าง intro บอส → หยุดเกม 1 ชั้น, "เล่นต่อ" ครั้งเดียว, intro ยังอยู่ ปุ่มถัดไปใช้ได้ · ระหว่าง cutscene ท่า → 1 ชั้น, เล่นต่อแล้ว cutscene จบ, สั่งโจมตีต่อได้ (HP ศัตรู 278 → 266) · ระหว่าง story comic → 1 ชั้น, เล่นต่อ, ปุ่มถัดไปทำงาน · ไม่มี pageerror

## ข้อสังเกต (ไม่ใช่ FIX)
1. คัตซีนยมทูต (`crew-cut`, contain) ยังมีแถบดำบน/ล่างราว 50px (กรอบ 1254×774 ภาพ 1229×686) — ตามที่ Claudy จัดไว้ใน 30B ไม่ได้แตะ
2. ตาราง crop `CONTENT_ROWS` ผูกกับชื่อไฟล์: ถ้า Kittanate วาดทับไฟล์ที่อยู่ในตารางต้องลบ/ปรับรายการนั้น ไม่งั้นภาพถูกตัด
3. ผมไม่ได้เล่นเกมเดินจริงจากเซฟใหม่ถึงบอสโซน 3–4 ด้วยมือ (ใช้เซฟจำลองตามที่ใบงานอนุญาต) — ควรให้ Chris/คุณเป้กดผ่านเส้นทางจริงอีกครั้ง

## Roll back
`git -C ~/agapae-work/AVEGEE revert --no-edit 012ca53 && git -C ~/agapae-work/AVEGEE push origin main`

## ทำความสะอาด
ลบ worktree + branch local `codex/20261004T102000Z-9871f6fb` แล้ว · ไม่แตะ `toby-30b`, `toby-30d`, 30F `20261004T102020Z-b10d4d39` และ worktree อื่น

## ภาพที่คุณเป้ควรดู (`Output/Dale/30a-shots/`)
- `bossintro-z3-1-1280.png` (intro บอสโซน 3 ใหม่ ข้อความใต้ภาพ) · `bossintro-z4-1-1280.png` · `bossintro-z2-4-1280.png`
- `ending-1280.png` (popup ฉากจบ ภาพย่อเต็มกรอบ) · `story-ending-2-1280.png` · `arrival-z3-1-1280.png`
- `cut-west-guard-1280.png` (นกอินทรีหันขวา) · `cut-west-plerng-1280.png` (ไฟล์นี้ถูกเขียนทับด้วยรอบสลับโซน 4 จึงอาจเป็นภาพ Plerng โซน 4 หันขวา; ค่าวัดของทุกกรณีอยู่ในรายงานด้านบน)
- `live-bossintro-z3-1280.png`, `live-arrival-z3-1440.png` (จาก URL จริง) · `pause-over-cutscene.png`
- ผลวัดดิบ `measure-1280.txt` / `measure-1440.txt` · สคริปต์ Playwright `run_a.py`, `run_c.py`, `run_p.py`, `lib.py` (ในโฟลเดอร์เดียวกัน)
