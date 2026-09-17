# Code review — AVEGEE art batch zone 2-4 (Toby, commits fdf7283..a126c6e)

**ผู้ตรวจ:** Dale · **เจ้าของงาน:** Toby · **repo:** `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`
**ใบงาน:** `Output/Claudy/briefs/2026-09-17-avegee-art-batch-zone2-4.md`
**รายงาน Toby:** `Output/Toby/2026-09-17-avegee-art-batch-zone2-4.md`

## ผล: **PASS** (แก้ 1 จุดเล็กเองระหว่างรีวิว — commit `f804d16` push แล้ว)

## สิ่งที่ตรวจ

### 1. `git diff fdf7283..a126c6e` — บัค / syntax error / path ภาพหาย
- `node --check` ผ่านทั้ง `src/data.js`, `src/game.js`, `src/ui.js`, `src/cases-asia.js` — ไม่มี syntax error
- ไล่ path ทุกไฟล์ที่ `img/manifest.json` อ้างถึง (174 คีย์) เทียบกับไฟล์จริงบนดิสก์ — **0 ไฟล์หาย**
- ไล่ path เดียวกันเทียบกับ `git ls-files img/` — **ทุกไฟล์ถูก track จริง** (ไม่มีไฟล์ที่โค้ดใช้แต่หลุดไม่ commit)
- อ่าน diff `src/data.js`/`src/game.js`/`src/ui.js` ทีละบรรทัด — logic ของ `bossArriveSeen` มี backward-compat
  ให้เซฟเก่า (`this.bossArriveSeen = d.bossArriveSeen || { ...this.bossCleared, ...this.bossGuarding }`)
  กันผู้เล่นเก่าโดนฉากมาถึงย้อนหลังทั้งที่สู้บอสไปแล้ว — ถูกต้อง
- `ZONE4_BOSS_DRAFT` แยกจาก `ZONES[]` ตามใบงานสั่งจริง ไม่ได้เผลอเปิดโซน 4

### 2. `9cc19f7` (.gitignore + `git rm --cached img/raw/`)
- ยืนยัน `img/raw/` ยังอยู่บนดิสก์ครบ **188 entries** (`ls -R` หลัง commit) — ไม่ได้ลบไฟล์จริง มีแค่เลิก track
- `.gitignore` ใหม่ (`img/raw/`, `agent-pilot/`) ไม่ชนกับไฟล์ที่เกมใช้จริง — เทียบ manifest paths ทั้งหมด
  กับ ignore rules แล้วไม่มีไฟล์ไหนหลุดโดนกันโดยไม่ตั้งใจ (`img/Zone*.png` เป็นกฎเดิมก่อนหน้านี้อยู่แล้ว
  สำหรับภาพคอนเซปต์เทียบโซนของ Kittanate ไม่ใช่ asset เกม)

### 3. `safeSp()` ใน `687b1db`
- ไล่ทุกสำนวนเขียนมือ (TH 11 ตัว sp เป็น string เฉพาะตัว → bypass check ถูกต้อง, Asia A1-A20 sp เป็นตัวเลข)
  เทียบ `sex` ที่ประกาศกับ `SPIRIT_SEX` ทีละคู่ด้วยสคริปต์ — ตรงกับตารางในรายงาน Toby ทุกแถว
  มีเฉพาะ A4 ที่ชน (sex:'m', sp:4 ซึ่งตอนนี้เป็น 'f') → `safeSp` สลับให้เป็น sp:2 อัตโนมัติ ถูกต้องตามที่ตั้งใจ
- `spiritFor()` (วิญญาณสุ่ม) refactor เป็น wrapper เรียก `safeSp()` — เทียบ logic เก่ากับใหม่บรรทัดต่อบรรทัด
  พฤติกรรมเหมือนเดิมทุกกรณี ไม่กระทบของเก่า

### 4. Smoke test จริงด้วย Playwright headless (390×844)
- เข้าเกม → ข้าม intro comic → ไม่มี console error / page error ใหม่ (มีแค่ 404 เดิมที่รู้อยู่แล้ว:
  `hero-yama-side.png`, `bgm-title.ogg`, `bgm-zone.ogg`)
- ทดสอบฉากมาถึงบอสทั้ง 3 โซนที่เล่นได้ (`g.bossPending=true; g.onChange()`) — ขึ้นพื้นหลังถูกโซนทุกครั้ง:
  - th → `img/Intro-Boss-Zone1.png`
  - asia → `img/Asia/Intro-Boss-Zone2-asia.png`
  - west → `img/West/Intro-Boss-Zone3-west.png`
  - หัวข้อ/บทพูดขึ้นถูกต้อง ("👑 ยมราชพี่ใหญ่มาถึงแล้ว" ฯลฯ) ไม่มี error ระหว่างกดผ่านทุกบรรทัด
- Screenshot ยืนยัน (เก็บใน scratchpad ของ session นี้): `boss-arrive-th.png`, `boss-arrive-asia.png`, `boss-arrive-west.png`

## จุดที่พบแล้วแก้เอง (เล็ก ตามที่คุณเป้สั่ง)

**`.foot`/`.disclaimer` หายทั้งหมดที่ 360×640** (ไม่ใช่แค่ล้น) — Toby รายงานไว้แล้วว่าเป็นบั๊กเดิมก่อนงานนี้
และส่งต่อให้ตัดสินใจ แต่ตรวจแล้วพบว่ากระทบเกณฑ์รับงานข้อ 4 (ทดสอบที่ 360×640) และข้อ 5
(ข้อความท้ายหน้าปกต้องอยู่ล่างสุด = ต้องมองเห็นได้) โดยตรง จึงแก้เอง:

- **ก่อนแก้**: `.foot` bottom = 656px, `.disclaimer` bottom = 688px ที่วิวพอร์ตสูง 640px → ข้อความ 2 บรรทัด
  ล่างสุดหายไปทั้งหมด (โดน `#title{overflow:hidden}` ตัดทิ้งเงียบ ๆ ไม่ใช่แค่เลื่อนไม่ถึง)
- **แก้**: เพิ่ม `max-height:100vh;overflow-y:auto` ที่ `#title .menu` ตรง ๆ ไม่ผูกกับ breakpoint เดิม
  (`@media(max-height:520px)` ที่มีอยู่ไม่ครอบคลุมจอแคบแต่สูงแบบ 360×640)
- **ยืนยันหลังแก้** ด้วย screenshot จริง 3 ขนาด — disclaimer อยู่ในวิวพอร์ตครบทุกจอ:
  - 360×640: disclaimer bottom = 616px ✅
  - 390×844: disclaimer bottom = 820px ✅
  - desktop 1280×800: disclaimer bottom = 740px ✅
  ไม่กระทบเลย์เอาต์จอที่พอดีอยู่แล้ว (ไม่มีอะไรให้เลื่อน = ไม่เห็น scrollbar)
- Commit `f804d16` push ขึ้น `origin/main` แล้ว — ไม่แตะถ้อยคำ (ตามข้อห้ามในใบงาน)

## ของที่ไม่แตะตามคำสั่งคุณเป้

**Untracked ใน `img/West/`** (สร้าง 16:09–16:28): `crew-boon-west.png`, `crew-dam-west.png`,
`crew-kan-west.png`, `crew-plerng-west.png`, `crew-taan-west.png`, `st-ngiw-west.png`
— ไม่มีโค้ดอ้างถึงไฟล์เหล่านี้เลย (เช็คแล้ว) น่าจะเป็นภาพชุดใหม่จากคุณเป้ที่ยังไม่ได้มอบหมายงานต่อสาย
**ไม่ commit ไม่ลบ ไม่ย้าย** ตามที่สั่ง — ปล่อยไว้เป็น untracked รอใบงานถัดไป

## ของที่ยังไม่ตัดสิน (ส่งต่อ Kittanate/Claudy ตามที่ Toby แจ้งไว้ — ไม่ใช่ของที่ Dale ตัดสินเอง)

1. `hidden[]`/`seen[]` ของ A7/A11/A16/A18/A20 ไม่ตรงกับ `claims[]` ใหม่ — ต้องส่ง Rae แก้แฟ้มคดีอีกรอบ
2. `Boss Zone<N>` portrait 3 ไฟล์ (`West/Boss Zone3-west.png` ฯลฯ) ยังไม่ได้ต่อสาย — ไม่รู้จุดใช้งานแน่ชัด
3. `intro-zone2-asia.png` / `intro-zone3-west.png` — ไฟล์พร้อมแต่ยังไม่ชัดว่าต้องเปลี่ยน UI กล่องย้ายโซนไหม
4. โซน 4 ยังเปิดเล่นไม่ได้ตามตั้งใจ (`ZONE4_BOSS_DRAFT` รอย้ายเข้า `ZONES[]`)

## สรุป

โค้ดสะอาด ไม่มี syntax error ไม่มีภาพหาย ไม่มีไฟล์ต้นฉบับถูกลบ `safeSp()` ครอบคลุมถูกต้องไม่กระทบเคสอื่น
สมอลล์โค้กเทสต์เกมจริงผ่านหมดไม่มี console error ใหม่ แก้บั๊กเล็ก 1 จุดที่กระทบเกณฑ์รับงานโดยตรงแล้ว
push ขึ้น origin/main เรียบร้อย `git status` สะอาด (เหลือแค่ untracked art ที่สั่งห้ามแตะ)

**PASS**
