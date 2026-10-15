# L5 — ศัตรูบนเส้นทางชายแดนเดินเข้าหา แล้วตัดเข้าฉากต่อสู้เอง (AVEGEE)

branch `toby/l5-encounter` (worktree `/Users/agapae/agapae-work/.toby-worktrees/l5`) · commit `9dccf0f` · รอ Dale รีวิว ยังไม่ merge

## ระบบเดิมทำงานอย่างไร
- "ขยายชายแดน/ย้ายโซน" = ดันเจี้ยนเส้นทางชายแดน (`src/zone-travel.js` DUNGEON_ROUTES, ฉาก `src/dungeon-view.js`) เข้าจากประตูชายแดนหลังชนะบอสโซน
- ฉากเป็นทางเดินเส้นเดียว (corridor) 3 จุด ศัตรูยืนนิ่งที่จุดของมัน (1 ตัว/จุด) ยมเดินได้ถึงก่อนศัตรูเล็กน้อยเท่านั้น (limit = จุด − .018)
- เข้าศึกต้องเดินจนถึงระยะ .045 แล้วกดปุ่ม "เริ่มต่อสู้" → `g.startDungeonEncounter()` (ต้องอยู่ที่ checkpoint) → `startMobBattle` → `endBattle` ปิดด้วย `resolveDungeonEncounter` (ชนะ = ผ่านจุด, หนี/แพ้ = จุดเดิม ศัตรูอยู่เดิม)
- ศัตรูในเมือง (`nearestMob` + ปุ่มสู้) และการป้องกันชายแดน (`frontier.js`) เป็นระบบแยก — ไม่แตะ
- ด่านเส้นทางนี้ไม่มีบทพูดก่อนสู้ (บทพูด/`storyInterlude` เป็นของบอส/อีเวนต์ และ `openBattle` ขึ้นเองก่อนเมนูอยู่แล้ว) จึงไม่ต้องเพิ่มลำดับ

## ที่เปลี่ยน
- `src/dungeon-chase.js` (ใหม่, ไม่มี DOM): sight .16 · ❗ 450ms แล้วเดินเข้าหา (ความเร็ว .00016 ช้ากว่ายม .00019 จึงหนีได้) · ถึงระยะ .045 = contact · ห่างเกิน sight×1.2 = เลิกไล่แล้วเดินกลับจุดเดิม · cooldown 4s · ถอยหลังหนี .2
  ทุกอย่างวัดตามความยาวทางเดิน → ศัตรูอยู่บนเส้นทางเดินเท่านั้น ไม่ตัดข้ามเขตเดินไม่ได้ · จุดเริ่มดันเจี้ยนอยู่นอก leash ของตัวแรก (ยมหนีกลับจุดเริ่มพ้นเสมอ)
- `src/dungeon-view.js`: ใช้ chase, วาด ❗ เหนือหัว, ศัตรูเดินตามตำแหน่งจริง, ตัดเข้าฉาก (แฟลชสว่าง→มืด 450ms, ปิดการควบคุมระหว่างนั้น) แล้วเรียก `onEncounter(loc,{chased:true})`; ส่งออก `DUNGEON_TOTAL`, `dungeonChaseReach`
- `src/game.js`: `startDungeonEncounter({chased})` ตรวจว่ายมอยู่ในรัศมีที่ศัตรูไล่ถึง (ไม่ผ่านปุ่ม checkpoint) · `endBattle` เมื่อ dungeonToken จบด้วย **flee หรือ lose** → `retreatFromDungeonFoe()`: วางยมถอยออกนอก sight + ตั้ง `g.dungeonChaseCooldown` (view อ่านครั้งเดียวตอน mount) · ชนะ = ระบบเดิม
- `src/ui.js`: `onEncounter` ส่ง opts ต่อ; ถ้าเริ่มศึกไม่สำเร็จ ตั้ง cooldown กันเด้งซ้ำ
- cache-bust `-l5`: `ui.js` (index + game-review), `game.js`, `dungeon-view.js?v=l5`, `dungeon-chase.js?v=l5`
- ไม่แตะ drawStandee / animation ยม / town-lighting / ค่าพลัง-รางวัลศัตรู ปุ่มเดิม "เริ่มต่อสู้" ยังใช้ได้ที่ checkpoint (สำรอง)

## จุดต่อกับ L2 (flee) — ต้อง merge L5 หลัง L2
L2 (`toby/l2-ui` fe1e9ad) ทำ flee เป็นจุดเดียว: ปุ่มหนี → `openFleeConfirm` → `performFlee()` → `g.fleeBattle()` (`fleeWhy(kind)` ตรวจ `FLEEABLE_KINDS` ซึ่งมี `mob`) → `confirmBattleCommand('flee')` ตั้ง `B.over='flee'` → `finish()` → `g.endBattle()`
L5 ผูกที่ `endBattle()` ตอน `B.dungeonToken && B.over!=='win'` จึง **เข้ากับ L2 ได้โดยไม่ต้องแก้โค้ด L5** (ไม่ต้อง cherry-pick) ศึกในดันเจี้ยนเป็น kind `mob` หนีได้ ผ่านหน้าต่างยืนยันของ L2
- ตรวจจริง: merge L2+L5 ในที่ชั่วคราว (ลบแล้ว) → เทสต์ L5/L2/zone-travel/dungeon-view 38 ผ่าน · Playwright 390×844: เดินเข้ารัศมี → เข้าศึกเอง 1.38 วิ → กด "หนี" → หน้าต่างยืนยัน L2 ขึ้น → ยืนยัน → ศึกปิด กลับดันเจี้ยนที่ต้นทาง (y .925) checkpoint 0 pending เคลียร์ → เดินกลับทันที เข้าศึกซ้ำที่ 3.4 วิ (cooldown ทำงาน) · ไม่มี pageerror
- **merge L5 หลัง L2**: ชนกัน 3 จุดเป็นบรรทัด cache-bust เท่านั้น — `src/ui.js` (import game.js `?v=…-j-k1d-l2` vs `-l5`), `index.html`, `output/game-review/index.html` (`ui.js?v=…-l2` vs `-l5`) → แก้โดยใช้ฝั่ง L2 ต่อท้าย `-l5` (`…-l2-l5`) ส่วน `src/game.js` merge อัตโนมัติ
- ถ้าอนาคต L2 เปลี่ยนให้ flee ไม่จบเป็น `over==='flee'` หรือไม่ผ่าน `endBattle()` ต้องย้าย hook `retreatFromDungeonFoe()` ตามไป

## วิธีรัน/ทดสอบเอง
```
cd /Users/agapae/agapae-work/.toby-worktrees/l5
python3 -m http.server 8861 --bind 127.0.0.1   # แล้วเปิด http://127.0.0.1:8861/index.html (viewport 390x844)
node --test tests/l5-auto-encounter.test.mjs    # 11 เทสต์ใหม่
node --test tests/*.test.mjs                    # 954 เทสต์ ผ่าน 944 / ล้ม 10 (ล้มชุดเดียวกับ main ก่อนแก้ — ดูข้างล่าง)
```
ลองในเกม: เริ่มเกมใหม่ → console: `G.bossCleared.th=true; G.hp=G.hpMax` → ไปประตูชายแดน (หรือ `Object.assign(G.player,{x:FRONTIER.x,y:FRONTIER.y})` ผ่าน devtools) → ออกเดินทาง
1. กด W/ลูกศรขึ้น/แตะเดินไปหาหมาป่า → ❗ ขึ้น หมาป่าเดินเข้าหา → ถึงตัวแล้วจอสว่าง-มืดแล้วเข้าฉากสู้เองโดยไม่กดปุ่ม
2. ยืนนิ่งในรัศมี (เดินแค่ ~0.5 วิ) → หมาป่าเดินมาเอง ~1.1 วิ แล้วเข้าศึก
3. เดินถอยหนีก่อนถึงตัว → หมาป่าเลิกไล่กลับที่
4. ในศึกกด "หนี" → "กลับไปตั้งหลัก" → กลับเข้าทางเดินที่จุดเริ่มห่างหมาป่า เดินกลับไปทันทีก็ไม่เข้าศึกจน ~4 วิ แล้วไล่ใหม่
5. ศัตรูในเมืองยังต้องเดินเข้าใกล้แล้วกดปุ่มเหมือนเดิม

## ผลทดสอบที่รันจริง (Playwright, 390×844, DSF2)
- เดินเข้ารัศมี → เข้าศึกอัตโนมัติ ที่ 1.45 วิหลังเริ่มเดิน (`battle kind mob`, pending token ตั้ง)
- ยืนนิ่ง → ศัตรูเดินมาเอง เข้าศึกที่ 1.09–1.44 วิ
- หนีผ่านปุ่ม UI → ฉากสู้ปิด, `G.battle=null`, ดันเจี้ยนเปิดใหม่, ยมอยู่ที่ต้นทาง (y .925), checkpoint ยัง 0, pending เคลียร์ · เดินกลับทันที → เข้าศึกซ้ำที่ 3.95 วิ (cooldown 4 วิ)
- pageerror: ไม่มี (404 ที่เห็นเป็นไฟล์เสียง/ภาพที่ขาดอยู่แล้ว `bgm-*.ogg`, `hero-yama-side.png`)
- ส่วนหนีทดสอบทั้งบน branch L5 เดี่ยว (ปุ่มหนีเดิม) และบน merge L2+L5 (หน้าต่างยืนยัน L2)
- ไม่ได้ทดสอบที่ 360px และบนทัชจริง (เลย์เอาต์ฉากไม่ได้เปลี่ยน ที่เพิ่มมีแค่ ❗ และแฟลชบน canvas)
- ภาพ/วิดีโอใน `/tmp/l5-evidence/`: `chase-contact-sheet.png` (❗→เดินเข้าหา→แฟลช→ฉากสู้), `chase-sheet.png` (ชนระหว่างเดินเข้า), `04-back-after-flee.png` (กลับจุดหลังหนี), `02-battle.png`, `video/`, `video-d/` (webm), สคริปต์ `run.py`/`run_b.py`
- เทสต์ล้ม 10 ข้อ = เดิมบน main (`8f82178`) ทุกข้อ เป็นเทสต์ regex cache-bust ที่ Codex เปลี่ยนเป็น `yama-live-…` (I1-A x3, K2, K5, fx h5b, skill-atk, west-hit x2, F1/F3 walking ฯลฯ) ไม่เกี่ยวกับ L5 · ชุดที่ล้มก่อน/หลังเหมือนกันทุกชื่อ

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มีบังคับ ❗ ตอนนี้เป็นตัวอักษรวาดบน canvas (placeholder) ถ้าอยากให้ Kittanate วาดเอง: `img/ui/alert-mark.png` 64×64 px พื้นโปร่งใส 1 เฟรม มุมมองหน้าตรง (เปลี่ยนในโค้ดจุดเดียวใน `dungeon-view.js` ส่วนวาด ❗) — ยังไม่ได้ทำเพราะรอ Vera/Kittanate ตัดสิน
ศัตรูไม่มีท่าเดิน (ใช้ standee นิ่งเลื่อนตำแหน่ง) ถ้าต้องการท่าเดินต้องมี spec แยกตัว

## สิ่งที่ยังไม่ทำ
- ไม่มีบทพูดก่อนสู้ในเส้นทางนี้ (ไม่มีให้ยกขึ้นก่อน) · ไม่ทำเสียง ❗/ฝีเท้า · ศัตรูหันหน้าคงที่ (ไม่แตะ standee)
- ศัตรู 1 ตัวต่อจุด เดินได้เฉพาะแนวทางเดิน ไม่มีไล่ 2D อิสระ
- ตัวเลขจูนได้ที่ `CHASE` ใน `dungeon-chase.js` (sight/speed/alert/cooldown/retreat) — ยังไม่ได้ให้ Kittanate ลองจับความรู้สึก
- หลังแพ้ (lose) ก็ถอยตำแหน่ง + cooldown เหมือนหนี (นอกเหนือใบงานเล็กน้อย เพื่อกันเด้งเข้าศึกซ้ำหลังฟื้น)
- ยังไม่ merge, ยังไม่ผ่านรีวิว Dale
