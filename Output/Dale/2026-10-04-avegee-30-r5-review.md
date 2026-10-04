# Dale — 30-R5: รีวิว + merge AVEGEE 30D (แผนที่) และ 30F (ภาพ)

วันที่ 2026-10-04 · repo `/Users/agapae/agapae-work/AVEGEE` · ไม่ได้แตะ `Claude/AVEGEE` เดิม · Live: https://hellopae.github.io/AVEGEE/

## ผลส่วนที่ 1 — 30D (Toby): PASS (merge + push + live แล้ว)
- **commit บน main: `33376bd`** (fast-forward ต่อจาก `278d09c`; rebase 6 commit ของ Toby บน main ไม่ชน) · ไม่ bump cache (ไม่มีไฟล์ภาพ/manifest ใหม่)
- เทสต์ 342/342 ผ่านก่อนและหลัง merge · `node --check src/*.js` ผ่าน · `git diff --check` สะอาด
- เบราว์เซอร์จริง 1280/1440 (Playwright Chromium, รันซ้ำบนโค้ดที่ rebase แล้ว ไม่ใช่เชื่อหลักฐานเก่าของ Toby):
  - ห้ามเดินน้ำ/ลาวา/อาคาร/ยมทูต ทั้ง 4 โซน: `walktest.py` คลิกน้ำ 3 จุด + ลาวา + ทุกอาคาร + ทับตัวยมทูตทุกคน = problems 0, notWalkable 0, เข้าวงรอบยมทูตไม่ได้ · `reach.py` ทุกอาคารทุกโซนเดินถึง (unreachable ว่าง)
  - เข้าอาคารได้ รวม 2 หลังที่กลับด้าน (#11 `st-lokan-asia`, #13 `st-sala-west`): ปุ่ม "เข้าไป" กดได้ (ไล่ 1280/1440) และเปิดห้องหอทะเบียนกรรมโซน 3 ได้จริง
  - ปุ่ม "เข้าไป" ชิดอาคาร · ชายแดนทุกโซนมีปุ่มกลับสีทองปุ่มเดียว ขึ้นเมื่อเข้าใกล้ (ตรวจ 1280/1440/390 ทั้ง 4 โซน; 390 ไม่ชนปุ่ม pause) · คลิกศัตรูในชายแดนแล้วไม่ทับตัวมัน
  - ป้ายปีศาจบุก: west/asia/cyberhell เป็นรูปบอสปีศาจ (boss-frontier-*) ไม่ใช่วิญญาณขาว
  - taan โซน 4 ขนาดเท่าคนอื่น (ภาพ crew เทียบ) · ห้อง/pageerror = 0
- Claudy รับไว้แล้ว: `STATION_FLIP` (ไม่แก้ไฟล์ภาพ), `STANDEE_FIT` — ไม่ทบทวน
- Cleanup: ลบ worktree `toby-30d` + branch local `toby/30d` · ลบ `Output/Toby/30d/` (เก็บ `Output/Toby/2026-10-04-avegee-30d.md`) · เหลือ remote branch `origin/toby/30d` (ไม่ได้ลบ — ถ้าต้องการ `git push origin --delete toby/30d`)

## ผลส่วนที่ 2 — 30F (Codex): PASS หลัง Dale แก้ 2 ข้อเล็ก (merge + push + live แล้ว)
- **commit บน main: `6792cc8`** (ต่อจาก 30D) · ดึงจาก branch ซ้อน `avegee-30f` ด้วย patch 3-way ลง branch สะอาด (ไม่ merge branch ชั้นนอก, ไม่ commit หลักฐาน Codex) · ชน `src/data.js` กับ 30D (STATION_FLIP กับ offset cyberhell) → รวมสองฝั่งได้ ไม่ทิ้งของใคร
- ตรวจภาพด้วยตา (`30f-shots/30f-rage-new.jpg`, `30f-bld.jpg`): Rage ใหม่ 1664×936 perspective เดียว บัลลังก์อยู่ไกลตามทางหิน ไม่มีตัวหนังสือ ไม่มีแถบดำ (1.0 MB) · tarang = คุกหินดำลูกกรงเหล็กไฟม่วง · krajok = หอกระจกจอแสง · ทั้งคู่ RGBA โปร่งใส 512² (130/245 KB) · isometric เข้ากับ lokan-cyberhell
- แผนที่โซน 4 (1280/1440, มาสก์รวมกับ 30D): tarang/krajok รุ่นใหม่ขึ้น · ไม่ทับสิ่งก่อสร้างในพื้น (Codex ย้ายพิกัด lokan/krajok/dab/krata ไปพื้นว่าง ไม่แก้ภาพแผนที่) · ไล่เดินเข้า 10 อาคารในโซน 4 — ทุกหลังมีปุ่ม "เข้าไป" · `reach.py` ไม่มีหลังไหน unreachable
- **Dale แก้ 2 ข้อ (Codex ไม่ได้ตรวจเบราว์เซอร์ จึงพลาด)**
  1. `src/cutscene-presentation.js`: ลบรายการ crop แถบดำเก่า `'story-asia-03.png':[99,621]` — ภาพใหม่เต็มเฟรมแล้ว ถ้าคงไว้จะตัดบน 99px ล่าง 315px เหลือแถบแคบ (ตรวจในเบราว์เซอร์ 1280/1440/390 หลังแก้ ภาพเต็ม 16:9) · ปรับ `tests/30a.test.mjs` ให้ข้ามหน้านี้ + เพิ่มเทสต์ใน `tests/30f.test.mjs`
  2. `tests/30f.test.mjs`: "path endpoint ตรงจุดประตูเป๊ะ" ล้มหลังรวม 30D (กันทั้งตัวอาคาร → krata หยุดห่างประตู ~41px) → เปลี่ยนเป็น "ถึงในระยะ INTERACTION_REACH (100)" ซึ่งคือเงื่อนไขที่เกมใช้จริง (ยืนยันในเบราว์เซอร์ krata มีปุ่ม "เข้าไป")
- cache bump: `art.js` manifest `20261004-30b-art` → `20261004-30f-art` (Codex ทำไว้) · เทสต์ 346/346 · node --check/diff --check ผ่าน
- ยืนยัน live (hellopae.github.io/AVEGEE): `art.js` มี `30f-art` + `STANDEE_FIT`, `cutscene-presentation.js` ไม่มี asia-03, ภาพ krajok/asia-03 โหลด 200, โซน 4 ขึ้นปกติ 1280 และหน้าแรก 390, pageerror = 0
- Cleanup: ลบ worktree + branch local ของ Codex run `20261004T124533Z-8ff6fc07` · มี worktree ของ Codex run ใหม่อื่นอยู่ (`…T132048Z-74f1bf9a`, `…T133036Z-e78bb4a0`) ไม่ใช่ของใบงานนี้ ไม่แตะ

## ข้อสังเกตเพื่อ QA (ไม่ใช่ blocker)
- krajok รุ่นใหม่เป็นหอแหลมเล็ก (กว้าง ~56 หน่วยฉาก) อยู่ข้างต้น ngiw — ถูกบังบางส่วนด้วยป้ายนิราและตัวละครที่ยืนข้างๆ (`krajok-closeup.jpg`) ถ้าคุณเป้ต้องการให้เด่นกว่านี้ ต้องวาดกว้างขึ้น (งานใหม่)
- krata ในโซน 4: ยมบาทเดินไปหยุดห่างจุดประตู ~41px (ยังกดเข้าได้) เพราะมาสก์อาคารใหญ่ขึ้นของ 30D
- ฉาก Rage ทดสอบโดยโหลดหน้าคอมิกตรงด้วย `STORY.asia.pages[2]` ไม่ได้เล่นผ่านการปลดพลังจริง → ให้ Chris/คุณเป้ลองเล่นโซน 2 ถึงจุดปลด Rage
- ปุ่ม × ของกล่องคอมิกทับเลขหน้า "3 / N" ที่มุมขวาบน — มีอยู่ก่อนแล้ว ไม่ได้แก้

## ภาพ
- `Output/Dale/30d-shots/` — คลิกน้ำ (ยมบาทไม่ลง), มาสก์ cyberhell, อาคารกลับด้าน asia/west + ปุ่ม, ปุ่มกลับชายแดนเดียว, ป้ายอีเวนต์, ห้อง sala · `walktest.py` (สคริปต์)
- `Output/Dale/30f-shots/` — Rage เก่า/ใหม่, อาคารใหม่, แผนที่ cyberhell + มาสก์, เข้า tarang/krajok, Rage ในกล่องคอมิก 1280/390, live

## Roll back
- ย้อนเฉพาะ 30F: `cd /Users/agapae/agapae-work/AVEGEE && git revert --no-edit 6792cc8 && git push origin main`
- ย้อน 30D ด้วย: `git revert --no-edit 278d09c..33376bd` (6 commit เส้นตรง) — ย้อน 30D แล้ว 30F ยังใช้ได้แต่ `STATION_FLIP` หาย ควรย้อน 30F ก่อน
- ย้อนแล้วต้อง bump `?v=` ของ manifest ใน `src/art.js` ใหม่ ไม่งั้น Pages อาจค้าง manifest เก่า
