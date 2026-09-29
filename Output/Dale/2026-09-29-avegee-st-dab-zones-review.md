# Dale review+build — AVEGEE: ป่าดาบใหม่โซน 2–4 (`st-dab-asia` / `st-dab-west` / `st-dab-cyberhell`)

**ผล: PASS — commit + push แล้ว**

- Commit: `da8bcbb` ("AVEGEE: new sword-forest art for zones 2-4 (st-dab-asia/west/cyberhell)") → `origin/main`
- Live: https://hellopae.github.io/AVEGEE/ — ยืนยัน redeploy จริง: `img/manifest.json` มี `boxes.st-dab-asia = [0.0117,0.0,0.9863,1.0]` ตรงกับที่ commit, ไฟล์ภาพทั้ง 3 บน Pages ขนาดตรงกับไฟล์ที่ prep ในเครื่องเป๊ะ (`Asia` 302,600 B · `West` 289,255 B · `CyberHell` 332,106 B, `last-modified` ขยับเป็นเวลา push จริง)
- Screenshot: `Output/Dale/screenshots/2026-09-29-avegee-st-dab-zones/`

## บริบทก่อนเริ่ม (สำคัญ — อธิบายทำไม git status ไม่ตรงใบงานเป๊ะตอนเริ่ม)
ก่อนเริ่มงาน คุณเป้/ระบบรัน `python3 scripts/prep-art.py asia-walk west-walk cyberhell-walk --all` (งานสไปรท์เดินยม คนละงาน) บน main แล้ว — ผลข้างเคียงของ `ingest()` ในสคริปต์คือเห็น `img/{Asia,West,CyberHell}/st-dab-*.png` (raw 1254² ที่ถูกคัดลอกมาตรง ๆ) เป็น "ต้นฉบับวางผิดที่" แล้วลบไฟล์เหล่านั้นออกจาก `img/` (ต้นฉบับใน `img/raw/<Zone>/` ไม่ถูกแตะ mtime เดิม) ก่อนผมจะเริ่มแตะอะไรเลย — Claudy แจ้งเรื่องนี้เข้ามาระหว่างงาน ตรงกับที่ผมตรวจ `git status` เจอเองพอดี (`git status` ตอนนั้นแสดง 3 ไฟล์ภาพเป็น `D`)

## สิ่งที่ทำ
1. `python3 scripts/prep-art.py Asia/st-dab-asia West/st-dab-west CyberHell/st-dab-cyberhell --alpha-threshold=8`
   (กรองด้วย path เต็มแทนแค่คำว่า `st-dab` เพื่อไม่ให้กระทบ `img/st-dab.png` โซนไทย/18F เลย ต่อให้ mtime บังเอิญตรงเงื่อนไข skip ก็ไม่เสี่ยง)
   - ตรวจก่อนรันว่า `ingest()` วนเฉพาะโฟลเดอร์ย่อยของ `img/` (`Asia`/`West`/`CyberHell`/`ui`/`raw`) — ไฟล์ระดับรากอย่าง `img/st-dab-v2.png`, `img/scene-cyberhell.jpeg` (ต้องห้ามแตะ) **ไม่ถูกสคริปต์นี้มองเห็นเลย** เพราะไม่ใช่ไดเรกทอรีย่อย ปลอดภัย
   - ผลลัพธ์: 1254×1254 (1.9–2.1MB) → **512×512** (Asia 303KB · West 289KB · CyberHell 332KB)
   - ตรวจ alpha dust: ยังเหลือพิกเซล alpha 1–7 ราว 800–1100 จุด/ไฟล์ — ตรวจเทียบกับสถานีโซนอื่นที่ขึ้นโปรดักชันแล้ว (`st-krata-asia` 677px, `st-tea-asia` 899px) พบว่าเป็นพฤติกรรมมาตรฐานของ pipeline ฝั่งโฟลเดอร์โซน (เกิดจาก `canvas.paste(im,...,im)` ตอนวางลงผืน 512² ไม่ใช่บั๊กจากการรันของผม) — ไม่ต้องแก้เพิ่ม
2. **แยก `manifest.json` เฉพาะ hunk ของงานนี้** — สคริปต์รัน `make-manifest.py` ท้ายทุกครั้งซึ่ง regenerate ทั้งไฟล์จาก state ปัจจุบันของ `img/` (มีของค้างจากงานอื่นปนอยู่: ไอคอน UI ชุดใหม่, ภาพ walk sprite, `st-dab-v2`, คัตซีนบอส ฯลฯ — ไม่ใช่ของผม) → เทียบ manifest ที่ regenerate เต็มกับ HEAD ด้วย python (โหลด json เทียบทุก key ใน `boxes`/`stationSizes`) ยืนยันว่าต่างจาก HEAD **เฉพาะ 3 คีย์ที่แก้** (`stationSizes` ไม่เปลี่ยนเลยเพราะภาพเดิมก็ 512×512 อยู่แล้ว) ส่วนอื่นต่างเพราะไฟล์ค้างจากงานอื่นล้วน ๆ → เขียนไฟล์ manifest ที่จะ commit เอง = HEAD + แพตช์เฉพาะ `boxes.st-dab-{asia,west,cyberhell}` ไม่ปนรายการอื่นเลย (ตรวจ `git diff --cached` ยืนยันมี 3 hunk พอดี)
3. `git add` เฉพาะ 4 ไฟล์ (3 ภาพ + manifest) — `CONCEPT.md`, `scripts/prep-art.py`, `src/art.js`, `src/scene.js` (งานสไปรท์เดินที่ค้างอยู่) และไฟล์ untracked อื่นทั้งหมด **ไม่ถูกแตะ/ไม่ถูก commit**
4. `node --test tests/*.test.mjs` → 58/58 ผ่าน (มีเทสต์ 1 ตัวที่ไทม์เอาต์-เซนซิทีฟเป็นบางรอบ, รันซ้ำแยกไฟล์ผ่านเดี่ยว ยืนยันไม่เกี่ยวกับ diff ชุดนี้)
5. เปิดเกมจริงด้วย Playwright (Chromium, 1440×810 + มือถือ 390×844) — ฉีด `localStorage` save (`avegee.save.v2`) ที่สร้างสถานีครบทุกหลัง (`build:0, slots:[]`) + `taught` ครบทุกบทเรียน (กันโมดัลสอนเล่นบัง) → ผ่านหน้าปก (`#enter-button` → `#splash-skip` → `#t-resume`) ดูทั้ง 3 โซน (asia/west/cyberhell) + โซนไทยที่มือถือเพื่อยืนยันว่าไม่ถูกแตะ

## ผลตามเกณฑ์
**คมชัด ไม่ยืด ฐานอยู่พื้น — ผ่าน** ทั้ง 3 โซน ภาพคมทุกพิกเซล ฐานกองดาบชิดพื้นในตำแหน่งเดิม (`bx:200,by:470` เหมือน 18F/โซน 1)

**ขนาดสมดุล ไม่ทับของตกแต่งในฉากจนอ่านไม่ออก — ผ่าน**
- Asia: ดาบสีแดง/ทองอยู่หน้าเทวรูปหินที่วาดอยู่ในพื้นหลังฉาก (`scene-asia`) — ไม่บัง ไม่ถูกบัง อ่านออกทันทีว่าเป็นป่าดาบ (`hover-crop-asia.png`)
- West: ดาบน้ำแข็งอยู่หน้าปราสาทน้ำแข็ง ไม่ชนกำแพงโกธิกด้านหลัง (`hover-crop-west.png`)
- CyberHell: ดาบพลังงานสีม่วง-ชมพูเรืองแสงอยู่หน้าตู้เซิร์ฟเวอร์/แท่นคริสตัล ไม่บังกัน อ่านออกว่าเป็นกลุ่มดาบพลังงานชัดเจน เข้ากับธีมไซเบอร์ (`hover-crop-cyberhell.png`)
- ทดสอบมือถือ 390px (`asia-mobile-crop.png`) — ยังอ่านออกชัดในผืนที่เล็กลง

**ป้าย/จุดกดตรงภาพ — ผ่าน** ฮาวเวอร์ไฮไลต์ (กรอบทอง) ล้อมกรอบเนื้อภาพจริงพอดีทั้ง 3 โซน (คำนวณจาก `boxes` ใหม่ที่แก้ในแมนิเฟสต์) ไม่มีช่องว่างเหลื่อมเหมือนก่อนแก้ (ก่อนแก้ ใช้ box ของไฟล์ราว 1254² ซึ่งผิดขนาดไฟล์จริงไปมาก)

**ป่าดาบไทยโซน 1 ไม่เปลี่ยน — ผ่าน** ตรวจ `img/st-dab.png` mtime/ขนาดไม่ถูกแตะ (คำสั่งกรองด้วย path เต็มไม่มีทางแมตช์ path โซน 1), screenshot มือถือโซนไทยยืนยันภาพเดิมจาก 18F

**`node --test` ผ่าน — ผ่าน** 58/58

## Rollback
```
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
git revert da8bcbb
git push origin main
```
GitHub Pages redeploy อัตโนมัติจาก `main` ภายใน ~1-2 นาที

## หมายเหตุ — งานค้างอื่นในเครื่องเดียวกัน (ไม่ใช่ของชุดนี้ ไม่ได้แตะ)
- `CONCEPT.md`, `scripts/prep-art.py` (ส่วน POSES เพิ่ม `walk`), `src/art.js`, `src/scene.js` — ฟีเจอร์สไปรท์เดินยม (Codex/คุณเป้กำลังทำ) ยังค้างอยู่ใน working tree เหมือนเดิมทุกบรรทัด ไม่ถูกงานนี้แตะ
- untracked: `img/*/hero-yama-*-walk.png`, `img/hero-yama-walk.png`, `img/st-dab-v2.png`, `img/scene-cyberhell.jpeg`, `Exam/`, `files/`, `output/*` — คงสถานะเดิมทั้งหมด
- ห้ามแตะทั้งหมดตามใบงาน (`CONCEPT.md`, `files/`, `Exam/`, `output/`, `img/raw/*`, `img/scene-cyberhell.jpeg`, `img/st-dab-v2.png`) — ยืนยันไม่ถูกแก้เลย
