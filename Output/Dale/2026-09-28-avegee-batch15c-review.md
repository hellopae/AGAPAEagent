# รีวิว AVEGEE ชุด 15c (Codex) — ขนาดฉากแยกตามโซน แก้โซน 2-4 ถูกยืด

ตรวจโดย: Dale · วันที่: 28 ก.ย. 2569
Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`
ใบงาน: `Output/Claudy/briefs/2026-09-28-avegee-batch15c-zone-scene-size.md`
Run: `Output/Codex/runs/20260928T081004Z-b808e5de/` · worktree `.codex-worktrees/20260928T081004Z-b808e5de`
เริ่มตรวจที่: main @ 5055ed3 (base ของ branch) → main เคลื่อนไปที่ 77297c4 ระหว่างตรวจ (commit ของ session อื่น
เรื่องวิดีโอเปิดเกม ไม่แตะไฟล์ที่เกี่ยวข้อง) → จบที่: **main @ d8897c9** (merge commit)

## ผลตรวจ: PASS — merge แล้ว push ขึ้น origin/main สำเร็จ

## วิธีตรวจ

1. อ่าน diff ทุกบรรทัด (`diff.patch`, 6 ไฟล์ 176+/22-) เทียบพิกัดที่ `STATIONS_OLD`/`SPOTS`/`GUARD_POST`/
   `NO_WALK`/`WALK_OK`/`QUEUE_LINE` เก็บไว้ กับพิกัดจริงใน commit `f6b8bce` (ก่อนชุด 15b) ทีละสถานี —
   ตรงกันครบทุกจุด (sala, krata, dab, lokan, ngiw, lan, tea, tarang, krajok, sawan)
2. รัน `node --test tests/*.test.mjs` ใน worktree — **46/46 ผ่าน** (รวมเทสต์ใหม่ 3 รายการ)
3. เปิดเกมจริงผ่าน `python3 -m http.server` (worktree พอร์ต 8788 ไม่ชน 8777) + headless Chromium
   (Playwright) กดปุ่ม "เริ่มเกมใหม่" จริง แล้วบังคับ `g.level=5` + `bossCleared` ผ่าน console (จำเป็นเพราะ
   ต้องปลดล็อกโซน 2-4 โดยไม่เล่นยาว) ทดสอบเทียบภาพ **build เดียวกันแบบมี/ไม่มีแพตช์นี้** (patched พอร์ต
   8788 vs baseline ที่ archive จาก commit 5055ed3 มาเสิร์ฟแยกพอร์ต 8789) เพื่อแยกให้ชัดว่าอะไรคือผลจากแพตช์
4. ทดสอบย้ายโซน th → asia → west → cyberhell → th (ผ่าน `g.moveZone()`) จับภาพหน้าจอ canvas จริงทุกจุด
5. ทดสอบ save/reload: ย้ายไปโซน asia แล้ว `g.save()` → reload หน้าเว็บใหม่ → กด "เล่นต่อ" → ตรวจ
   `SCENE`/canvas size และตำแหน่งผู้เล่น

## ผลตรวจตามเกณฑ์รับงาน

### 1 — โซน 2-4 ไม่ยืด สัดส่วน/พิกัดเท่าก่อน 15b · โซน 1 ไม่เปลี่ยนจากหลัง 15b — PASS

- เทียบโค้ด: พิกัดใน `STATIONS_OLD`/`SPOTS`/`GUARD_POST`/`NO_WALK`/`WALK_OK`/`QUEUE_LINE` ที่แพตช์เก็บไว้
  ตรงกับค่าใน `f6b8bce` ทุกตัวเลข (ตรวจทีละสถานีด้วย `git show f6b8bce:src/data.js`)
- เทียบภาพหน้าจอ canvas จริง (asia/west/cyberhell) ระหว่าง build มีแพตช์กับไม่มีแพตช์: **เห็นผลต่างชัดเจน
  ด้วยตา** — baseline (บั๊กเดิม) เสาหิน/บัลลังก์/อาคารถูกยืดสูงกว่าจริงราว 19-21%, patched กลับมาสัดส่วน
  ปกติทันที — ตรงกับตัวเลขที่วัดไว้ในรีวิว 15b (1527:704=2.169 vs 1678:937=1.791)
- ตรวจ canvas `#cv` size ทาง JS ยืนยัน: th → `{w:1678,h:937}`, asia/west/cyberhell → `{w:1527,h:704}`
  (baseline ค้างที่ 1678×937 ทุกโซน — คือบั๊กเดิมที่ยืนยันซ้ำ)
- โซนไทย (th): เทียบภาพ back-th ระหว่าง patched กับ baseline — **เหมือนกันทุกพิกเซลที่มองด้วยตา**
  ไม่มีอะไรเปลี่ยนจากหลัง 15b

### 2 — ย้ายโซน/โหลดเซฟไม่พัง — PASS

- ย้าย th→asia→west→cyberhell→th ผ่าน UI จริงไม่มี error, ไม่มีตัวละครติดลาวา/นอกแผนที่
  (เทียบภาพทุกจุดเดินได้ปกติ ตัวละครยืนบนพื้นแข็งข้างบัลลังก์เสมอ)
- Save (`g.save()`) ตอนอยู่โซน asia → reload หน้าเว็บ → กด "เล่นต่อ" → โหลดกลับมาโซน asia ถูกต้อง,
  canvas ขนาด 1527×704 ถูกต้อง, ตำแหน่งผู้เล่น (850, 442) อยู่บนพื้นไม่ใช่ลาวา
- Console errors ที่เจอ = 8 รายการ 404 (ไฟล์เสียง/รูปที่ไม่เคยมีอยู่จริงมาก่อน — ตรงกับที่ตรวจไว้แล้วในรีวิว
  15b) ไม่มี pageerror ใหม่จากแพตช์นี้เลย
- พบ error หนึ่งจุดระหว่างเซ็ตอัปทดสอบ (`LEVELS[g.level-1]` undefined เมื่อบังคับ `g.level=10` ตรงๆ ผ่าน
  console) — **ยืนยันแล้วว่าเป็นบั๊กเดิมที่มีอยู่ก่อนแพตช์นี้แล้ว** (reproduce ได้เหมือนกันทั้งใน baseline
  5055ed3 กับ patched) ไม่เกี่ยวกับชุด 15c เลย เป็นแค่ข้อจำกัดของวิธีทดสอบ (บังคับ level ข้ามระบบเลื่อนขั้น
  ปกติ) ไม่ใช่บั๊กที่ผู้เล่นจะเจอจากการเล่นจริง — ไม่รายงานเป็น FIX LIST เพราะนอกสโคป

### 3 — ไม่แตะไฟล์ต้องห้าม · diff เล็ก — PASS

- `git diff --stat` ยืนยัน: แก้เฉพาะ `src/data.js, src/game.js, src/scene.js, src/view3d.js, src/walk.js` +
  ไฟล์ทดสอบใหม่ `tests/scene-zones.test.mjs` — ไม่แตะ `index.html`, `src/ui.js`, `src/preload.js`,
  `CONCEPT.md` ตามข้อห้าม
- diff เล็ก: 176 insertions / 22 deletions รวม 6 ไฟล์ (ไม่รวมไฟล์เทสต์ใหม่คือ 98/22)
- ตรวจ `git status --porcelain` ที่ repo หลักก่อน/หลัง merge — ไฟล์ค้างของ session อื่น
  (`CONCEPT.md`, `index.html`, `src/preload.js`, `src/ui.js`, `Exam/*`, `files/`, `img/*`, `output/*`)
  **เหมือนเดิมทุกตัวอักษร** ไม่ถูกแตะ/ทับ/stash เลย

### 4 — เทสต์เดิม + ใหม่ผ่าน — PASS

- `node --test tests/*.test.mjs` ผ่าน **46/46** ทั้งใน worktree ก่อน merge และบน main หลัง merge
- เทสต์ใหม่ 3 รายการครอบคลุม: ขนาด/grid/พิกัดสลับตามโซนและกลับไทย, โหลดเซฟโซน 2-4, walk mask สร้างใหม่
  ถูกขนาดตอนย้ายโซน

## วิธีแก้ (สรุปจากรายงาน Codex + ยืนยันด้วยการอ่านโค้ด)

`SCENE` เดิมเป็นค่าคงที่ตัวเดียวใช้ร่วมทุกโซน ชุด 15b เปลี่ยนเป็นขนาดของโซนไทยแล้วลืมว่าโซน 2-4 วัดพิกัด
ไว้คนละขนาด ตอนนี้แต่ละ `ZONES[k]` เก็บ `w/h` ของตัวเอง แล้ว `syncSceneZone()` ใน `data.js` อัปเดตค่าบน
`SCENE` object เดิม (ไม่สร้าง object ใหม่ เพื่อให้จุดที่ `import { SCENE }` แล้วอ่านค่าตอนรันไทม์ยังใช้ค่า
ถูกได้เองโดยไม่ต้องแก้ `ui.js`) พร้อมสลับพิกัดสถานี/จุดสำคัญ/ขอบเดินไปด้วยกัน `walk.js` เพิ่ม `resetWalk()`
ให้สร้างตารางเดินใหม่ตามขนาดปัจจุบันทุกครั้งที่ย้ายโซน `scene.js`/`view3d.js` อ่านขนาดปัจจุบันแทนค่าที่จำ
ไว้ตอนโหลดโมดูลครั้งแรก `game.js` เรียก `syncSceneZone()` + `resetWalk()` ใน `syncFrontierPos()` ซึ่งถูก
เรียกทุกครั้งที่ย้ายโซนอยู่แล้ว

## Push / Merge

- Branch `codex/20260928T081004Z-b808e5de` (base 5055ed3) → commit `c9f4ea7` (Dale commit ในนามให้เครดิต
  Codex — โค้ดเป็นของ Codex ทั้งหมด, Dale ตรวจ+commit+merge เท่านั้น)
- Main เคลื่อนไปที่ `77297c4` ระหว่างตรวจ (commit "Animate Avegee Home lava smoke spirits and embers" —
  แตะแค่ `img/home-animated.mp4`, `output/higgsfield/*` ไม่ชนกับไฟล์ของชุดนี้เลย) → ใช้
  `git merge --no-ff` แทน `--ff-only` (ปกติ) → merge commit สะอาด ไม่มี conflict
- Push สำเร็จ: `5055ed3..d8897c9 main -> main`
- ลบ worktree `.codex-worktrees/20260928T081004Z-b808e5de` และ branch `codex/20260928T081004Z-b808e5de`
  แล้ว — ไม่แตะ worktree ของ run อื่น (`20260928T081004Z-5f1d1425`, ชุด 16B UI) เลย

## Rollback

```
git revert d8897c9   # revert merge commit (ต้องระบุ -m 1)
git revert -m 1 d8897c9
```
หรือถ้าต้องการกลับไปจุดก่อน merge แบบ hard: `git reset --hard 77297c4` (ระวัง — จะทำให้ working tree
ที่มีไฟล์ค้างของ session วิดีโอ merge กับ state เก่าไม่ตรงกัน แนะนำใช้ `git revert` แทน)

## คำแนะนำงานถัดไป (ไม่บล็อกรอบนี้ ตรงกับที่ระบุไว้ในรีวิว 15b)

1. contain-fit โซน 2-4 แบบเต็มจอไม่ครอปของสำคัญ — ยังเป็น follow-up แยก ต้องคุย Vera เรื่อง mobile
   crop tolerance ก่อน (ไม่ใช่สโคปของชุด 15c — ชุดนี้แค่คืนสัดส่วนที่ถูกต้อง ตามข้อห้ามในใบงาน)
2. ปุ่ม HUD 36px ใน landscape มือถือ — นอกสโคป ยังไม่แก้

## วิธี Chris ทดสอบเอง (ถ้าต้องการ)

```
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
python3 -m http.server 8777
เปิด http://localhost:8777/index.html
node --test tests/*.test.mjs   # ต้องผ่าน 46/46
```
กด "เริ่มเกมใหม่" เล่นจนปลดล็อกโซนบูรพา (asia) จริง (หรือใช้ console `G.level=5;
['th','asia','west','cyberhell'].forEach(z=>G.bossCleared[z]=true)` เพื่อข้ามการเล่นยาว) แล้วกดย้ายโซน —
สังเกตว่าเสาหิน/บัลลังก์/อาคารในโซน 2-4 มีสัดส่วนปกติ ไม่ดูยืดสูงผิดรูปเหมือนก่อนหน้านี้ ย้ายกลับโซน 1
ต้องเหมือนเดิมทุกอย่าง
