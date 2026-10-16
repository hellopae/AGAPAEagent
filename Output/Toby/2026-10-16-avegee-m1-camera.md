# Toby — AVEGEE M1: กล้องฉากต่อสู้/สอบสวน (2026-10-16)

repo `/Users/agapae/agapae-work/AVEGEE` · worktree `/Users/agapae/agapae-work/.toby-worktrees/m1` · branch `toby/m1-camera` (ยังไม่ merge — รอ Dale รีวิว)
ฐาน: rebase บน `origin/main` = `19d1afe` (Codex: animation ท่าต่อสู้ + แผนที่) แล้ว · commit: `bcae11d` (docs API) → `e4e0bdd` (module+tests) → `1c10cfc` (wiring)

## สิ่งที่ build
- `src/battle-camera.js` — กล้องตัวเดียว (singleton) ทำ CSS `transform` บน `.cam-world` เท่านั้น: `focus / reset / shake / hitStop / dim / flash / punch / cue / play / on / layer / screenLayer / pointOf / rectOf`
  - ตัวคูณความเร็วจุดเดียว `camera.timeScale` · ตั้งค่า "เอฟเฟกต์กล้อง" (`localStorage avegee.cameraFx`, แถวใหม่ในหน้าตั้งค่า) · เคารพ `prefers-reduced-motion` (ไม่ซูม/แพน/สั่น/แฟลช, dim ยังใช้ได้, event ยังยิงตรงเวลา)
  - ไม่ใช้ `filter`/blur — dim = overlay ทึบ opacity .42 · ตัวผู้ใช้/เป้าหมาย (`lit`) ยกเหนือ overlay (z 40 > 31)
  - cue ปริยาย: `select` (ดันเข้าตัวที่ถึงเทิร์น 1.10× + เห็นศัตรูครบทุกตัวเสมอ) · `attack` 1.16× → แพนไปเป้า → ถอย · `skill` 1.26× + มืดลง → แพน/ถอยกว้างถ้าท่าโจมตีหมู่ → ถอย · `foe-attack` · `heal` · `interrogate-ask/reveal`
  - โดนหนัก: สั่น 2/3/4 px × 150/200/250 ms + hit-stop 70/90 ms (หยุด CSS animation ในฉาก + นาฬิกากล้อง ไม่หยุด timer เกม) · คริ = แฟลช
  - cue ที่ถูกแทนกลางทางยังคงยิง `windup/impact/recover` ที่ค้างอยู่ครบหนึ่งครั้ง (M2 ไม่ค้าง)
- ฉากต่อสู้: `arena()` ห่อพื้นหลัง+ตัวละครใน `.cam-world`; HUD/เมนู/การ์ด/ไทม์ไลน์/ปุ่มพัก อยู่นอก world จึงไม่ซูม · CSS child selector ของ `.fig` เปลี่ยนเป็น `>:where(.cam-world)>.fig` (specificity เท่าเดิม)
- วัดตำแหน่งหลัง transform: `battle-scale.js` รับ rect-mapper (`setBattleRectMapper`) → `fitBattleSprites`/`battleSpriteRect(img, mode)` วัดแบบ "ไม่ซูม" ส่วนเมนูคำสั่ง/ปุ่มจบศึกวางตาม `settled` (ตำแหน่งที่กล้องจะไปจอด) · กล้องเคลื่อน = มี shield ใสกันคลิกฉาก (เมนู/HUD ไม่โดน)
- จังหวะเดียวกับ animation ใหม่ของ Codex: `strikeTime()` อ่าน `img/combat-animation-v1/manifest.json` (อ่านอย่างเดียว) หาเฟรมกระทบ ≈ 55% ของท่าโจมตี (manifest ไม่มีเฟรม hit จริง) แล้วส่งเป็น `impactAt` ให้ cue ของยมทูต/บอส · `combat-sprites.js` ได้ root ที่ rect ไม่ซูม (Proxy) canvas จึงไม่เพี้ยนตอนซูม — **ไม่ได้แก้ combat-sprites.js / manifest** (cache-bust `battle-scale` ผ่าน importmap ใน `index.html`)
- สอบสวน: เลือกประเด็น → ซูม 1.18× เข้าผู้ถูกสอบสวน · เปิดเผยความจริง/สารภาพ/ใช้พลัง (ตวาด/กระจก/สะกดจิต) → 1.32× + แฟลช + สั่น · เปิดเมนูศาล → กลับภาพรวม · แผงขวา/เมนู/การ์ดไม่ซูม (world = ทั้ง `.trial-comment8` ใต้แผง, ตัวละครอยู่ในกล่อง `.cam-stage-box` ทับ `.hud-stage` จริง)
- เวลาที่เพิ่ม: กล้องรันคู่กับ phase timer เดิม ไม่เพิ่ม timer · วัดคลิก→เมนูถัดไปพร้อมใช้: โจมตี base 2984/2968/2974 ms vs M1 2991/2992/2992 (+~20 ms) · ท่าพลัง base 2980/2984 vs M1 3008/2993
- `docs/battle-camera-api.md` — สัญญา API สำหรับ M2 (commit แรกสุด `bcae11d`, อัปเดตตามของจริงใน `e4e0bdd`/`1c10cfc`)

## ไฟล์ที่แตะ
ใหม่: `src/battle-camera.js`, `src/battle-camera.css`, `tests/battle-camera.test.mjs`, `docs/battle-camera-api.md`
แก้: `src/ui.js` (arena, hooks, ตั้งค่า, สอบสวน), `src/battle-scale.js`, `src/battle-turns.css`, `src/command-wheel.css` (selector `>.fig` เท่านั้น), `src/i18n.js` (2 key ใหม่ — ข้อความชั่วคราว ให้ Rae ตรวจ), `index.html` + `output/game-review/index.html` (link css, token `-m1`, importmap battle-scale), เทสต์ cache-token 5 ไฟล์ให้รับ `-m1`/`map-polish-v1` (`k2-menu`, `k5-battle-layout`, `l5-auto-encounter`, `skill-atk`, `west-hit-facing`) + `h2-fixes` (selector)
ไม่แตะ: `drawStandee`/animation ยม, `town-*`, `src/combat-sprites.js`, manifest/รูปของ Codex, `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## วิธีรัน/ทดสอบเอง
```
cd /Users/agapae/agapae-work/.toby-worktrees/m1
python3 scripts/serve-nocache.py 8777      # แล้วเปิด http://127.0.0.1:8777/index.html  (ห้ามใช้ localhost — มีโปรแกรมอื่นจับ ::1 บางพอร์ต)
node --test tests/*.test.mjs               # 1010/1010 ผ่าน, 0 แดง
```
ในเกม: เริ่มเกมใหม่ → ข้ามบทนำ → เดินให้เปรตมา/กด Space ใกล้เปรต → เข้าฉากต่อสู้
1. ดูเมนูคำสั่ง: ภาพซูมเข้าตัวยมบาทเล็กน้อย เห็นศัตรูครบ · กด "โจมตี" แล้วคลิกศัตรู: ดันเข้า → แพนไปเป้า → สั่น → ถอย
2. "พลัง" → ลูกไฟ/พัดสายลม: ฉากมืด ตัวผู้ใช้/เป้าสว่าง · พัดสายลมกับศัตรู 3 ตัว = ถอยกว้าง
3. ตั้งค่า (เฟือง) → ติ๊ก "เอฟเฟกต์กล้อง" ออก = ภาพนิ่ง ไม่ซูม/สั่น
4. เปิดศาล → เริ่มพิจารณาคดี → กดข้อกล่าวอ้าง: ซูมเข้าผู้ถูกสอบสวน · เปิดเมนู "พลัง/ที่ไหน…" แล้วกลับภาพรวม
ดีบัก: `window.__camera` (เช่น `__camera.cue('skill',{user:'you',targets:['foe:foe-1'],power:3})`)

## ผลทดสอบ (Playwright Chromium + GPU, ทำเอง)
- fps ตอนกล้องเคลื่อน, 1678×937 DPR1: โจมตี 59–61 fps (เฟรม >24 ms: 0–2) · ท่าพลัง 54 · ท่าหมู่ 40 (ช่วงภาพคั่นเต็มจอของเกมเอง) · 390×844 DPR2: โจมตี 58.5 · ท่าพลัง 56–59 (รอบที่เร็ว)
  - 1678×937 **DPR2** ทั้ง base และ M1 อยู่ราว 28–30 fps แม้ตอนนิ่ง (เกินกำลังเครื่องนี้) — มัธยฐานเฟรมเท่ากัน (32.7 vs 33.6 ms) กล้องไม่เพิ่มต้นทุน
  - ท่าที่มีภาพคั่นเต็มจอตกลง 17–25 fps ในบางรอบบน DPR2 ทั้ง base และ M1 (ภาพคั่น/สไปรต์ ไม่ใช่กล้อง) · มีเฟรมยาวครั้งเดียว 80–250 ms ตอน paint เปลี่ยนเฟส (มีใน base ด้วย)
- คลิกศัตรูหลังซูม 1.1×: **10/10** ที่ 1678 และ 390 (3 ศัตรู, `elementFromPoint` ตรง id) · ระหว่างกล้องเคลื่อนคลิกไม่ติด (shield) · หยุดแล้วคลิกติด (ที่ 390 ทดสอบซูมเทียม 1.45× ศัตรูซ้อนกันจึงคลิกพลาด — ในเกมซูมสูงสุดตอนรอคลิกคือ 1.10×)
- สั่น 2/3/4 px จบ 133/182/232 ms · hit-stop 87 ms · แฟลช .71→0 ใน 340 ms · dim .42 + lit z 40 · reduced-motion และ setting ปิด: z คงที่ 1 ตลอด, event ครบ, dim ยังทำงาน
- เทสต์: `tests/battle-camera.test.mjs` 13 ข้อ (คำนวณ transform, keepVisible, คลิกหลัง transform, สั่น, reduced-motion, toggle, speed knob, impact ครั้งเดียว, strikeTime กับ manifest จริง, wiring) · ทั้งชุด **1010/1010 ผ่าน** (base 19d1afe ก่อนแก้ = 0 แดง; ระหว่างทางเจอ conflict marker ค้างในเทสต์ 4 ไฟล์ตอน rebase — แก้แล้ว ประวัติ commit สะอาด)

## หลักฐาน (อยู่ใน /tmp/m1/final/)
วิดีโอ mp4: `attack-1678.mp4`, `crit-1678.mp4`, `skill-1678.mp4`, `team-1678.mp4`, `attack-390.mp4`, `interrogation-1678.mp4` · แผ่นเฟรม `*-sheet.jpg` · เทียบอ้างอิง Octopath: `skill-vs-octopath-reference.jpg` · มือถือ/สอบสวน: `portrait-390-base-vs-m1.png`, `interrogation-1-wide … 4-back-to-wide.png`, `interrogation-390-*.png`, `interrogation-base-vs-m1-layout.jpg` (ตำแหน่งตัวละครเท่า base) · `dim-lit-and-zoom.jpg`, `crew-atlas-zoomed-base-vs-m1.jpg` (ยมทูตที่ใช้ atlas ใหม่ยังตรงตำแหน่งตอนซูม)
สคริปต์ทดสอบ: `/tmp/m1/*.py` (scen, clicks, reduced, shk, fps, trial)

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มี (ไม่ได้แตะอาร์ต)

## สิ่งที่ยังไม่ทำ / ข้อจำกัดที่ต้องรู้
- ภาพคั่นท่าพิเศษเต็มจอเดิม (1.3 วิ) บังกล้องทั้งฉาก: การซูม/มืดลงช่วงแรกถูกบัง กล้องจึงตั้ง impact ให้ตกตอนภาพคั่นจาง (`cutMs-60`) — ถ้าอยากให้เห็นกล้องแบบ Octopath เต็ม ๆ ต้องตัดสินใจเรื่องภาพคั่น (Claudy/Vera + M2) ผมไม่ตัดภาพคั่นเอง
- เฟรมกระทบจาก manifest เป็นการประมาณ (55%) — ถ้า Codex เพิ่มฟิลด์ hit จริง แก้ที่ `strikeTime()` จุดเดียว · ยมบาท (ฟันดาบ) กับวิญญาณทั่วไปไม่มี atlas โจมตี ใช้จังหวะปริยาย
- ไม่มี crit flag ในกติกาเกม → ใช้สัดส่วนดาเมจ/กำลังใจสูงสุดของเป้าเป็นน้ำหนักหนัก (≥15%=2, ≥30%=3) ไม่แตะค่ากติกา
- `output/game-review/index.html` ไม่มี importmap: ไฟล์ `battle-scale.js` ที่แก้ใช้ URL เดิมในหน้า review (cache อาจเก่า) — หน้าเกมหลักถูกต้อง
- ข้อความ i18n `settings.camera/cameraHint` เป็นของชั่วคราว รอ Rae
- ยังไม่ได้ทดสอบบนมือถือจริง/Safari (ทดสอบ Chromium 390×844 เท่านั้น) · Chris ยังไม่ได้ QA
