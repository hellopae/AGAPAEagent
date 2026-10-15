# L1 — แผนที่ไม่ลอย: มาสก์ + เงา + ย่อตัวละคร + นิราบนแท่น

repo `/Users/agapae/agapae-work/AVEGEE` · worktree `/Users/agapae/agapae-work/.toby-worktrees/l1` · branch `toby/l1-depth` (HEAD `b278303`, rebase บน main `8f82178` แล้ว) · ยังไม่ merge — รอ Dale รีวิว

## สิ่งที่ build
1. **มาสก์รอยวาง (ส่ง Codex L1b)** — `/Users/agapae/agapae-work/backup/avegee-l1-clear-mask/` : `clear-mask.png` (4915x3277 ขาว=เคลียร์) · `footprints.json` (86 ชิ้น: ชนิด/id/กล่อง px+world/ไบโอม/ground_hint/สีรอบ ๆ/sprite box) · `mask-overlay.jpg`
   - **v2** หลัง Codex เพิ่มเสาไฟ 10 ต้น: `/Users/agapae/agapae-work/backup/avegee-l1-clear-mask-v2/` (96 ชิ้น) — โฟลเดอร์แรกไม่ถูกแตะ
   - รันซ้ำเมื่อผังเปลี่ยน: `python3 scripts/l1-clear-mask.py [--out DIR] [--pad 16]` (ถามตำแหน่งจริงจากเกมที่รันอยู่ ไม่กรอกมือ)
2. **เงา/แสงของ L1 แยกโมดูลเอง `src/town-shade.js`** (ไม่แตะ `town-lighting.js` ของ Codex และไม่จูนค่าสีของมัน)
   - ดวงอาทิตย์เดียว `SUN={kx:.42,ky:.3}` เงาตกขวาล่างทุกชิ้น ยาวตามความสูง · ของที่เป็นผู้ทอดเงา: ต้นไม้ หิน เสาไฟ (ใช้ sprite เดียวกับที่ scenery วาด) บ้าน 12 หลัง อาคารสถานีที่สร้างแล้ว ประตูชายแดน แท่น (เงาสั้น)
   - silhouette อบครั้งเดียวเป็น canvas เล็ก 2 ชั้น (คม+นุ่ม) ไม่มี `shadowBlur`/`ctx.filter` ต่อเฟรม · เงาสัมผัส (AO) ไล่เฉดใต้ฐาน
   - **ค้นพบ**: sprite ของ prop/บ้านมีขอบโปร่งใสด้านล่าง (หิน: ฐานจริงอยู่ที่ 86.5% ของภาพ ⇒ ลอยเหนือจุดวาง ~16 หน่วย) เงา/AO จึงยึด "ฐานที่มองเห็น" ที่วัดจาก alpha ไม่ใช่จุด anchor — ใบ L1b ควรรู้เรื่องนี้ตอนเคลียร์พื้น
   - ตัวละครบนเมือง: เงาทอดบนพื้น + ถ้าเท้าอยู่ในเงาอาคาร/ต้นไม้ จะวาดผ่าน layer เล็ก ๆ แล้วทับความมืด ~32% เฉพาะส่วนที่อยู่ในเงา (field 1/4 ความละเอียด สร้างเมื่อชุดผู้ทอดเงาเปลี่ยนเท่านั้น; ปกติไม่มีตัวละครอยู่ในเงา = ไม่เสียอะไร) · ไม่แตะ `drawStandee`/sprite ยม/`yama-animation.js` (ห่อด้วย callback ใน scene.js)
3. **ย่อตัวละคร -25%** บนแผนที่เมืองโซน 1 เท่านั้น (`TOWN_CHAR_K=0.75`, โซนอื่นคง 0.8): ยม ยมทูต วิญญาณ ผู้คุม พ่อค้า เปรต · วงเท้า ป้าย หมุด 📜💬 hit-radius ตาม (`mapCharK()`, `charH()` ใน ui.js) · animation ยมใหม่ย่อผ่าน `h` ที่ส่งเข้า `drawHeroWalk` อยู่แล้ว
4. **นิราย้ายขึ้นแท่นพิพากษา** (คำสั่งเพิ่ม): `TOWN_CREW.nira` และ `TOWN_ENTRY.niraGoal` = (1938,950) · เดินเล่นช้า ๆ เฉพาะ `TOWN_NIRA_STAGE=[1914,934,1962,968]` (ขวาของบัลลังก์ บนพื้นแท่นที่วัดจากภาพ) ห่างบัลลังก์ (1862,917) > 50, ห่างบันได/คิววิญญาณ/จุดเข้าเมืองของยม · คุยได้ ปุ่ม E "จัดทีมยมทูต" ขึ้นปกติ (ถ่ายภาพยืนยัน) · stage ใช้เฉพาะ zone th

## ไฟล์ที่แตะ
`scripts/l1-clear-mask.py` (ใหม่) · `src/town-shade.js` (ใหม่) · `src/scene.js` (เฉพาะส่วนวาดเมือง/ตัวละคร/ฟังก์ชัน scale) · `src/town-scenery.js` (AO + export `townPropArt`) · `src/town-map.js` (AO บ้าน) · `src/town-layout.js` (นิรา + `TOWN_CREW_STAGE`) · `src/game.js` (clamp จุดเดินเล่น 3 บรรทัด) · `src/data.js` ไม่เปลี่ยนสุทธิ · `src/ui.js` (หมุดใช้ `charH()`, import scene/town-map/preload suffix) · `index.html` + `output/game-review/index.html` (ui.js `?v=…-r1-l1`, review preload ให้ตรงกับ index) · tests: ใหม่ `tests/l1-town-depth.test.mjs`; แก้ regex `boss-hero-art29m, k2-menu, k5-battle-layout, skill-atk, west-hit-facing`

## วิธีรัน/ทดสอบเอง
```
cd /Users/agapae/agapae-work/.toby-worktrees/l1
python3 scripts/serve-nocache.py 8931      # เปิด http://localhost:8931/index.html  เกมใหม่
node --test tests/*.test.mjs
```
คลิกที่ Kittanate: (1) ลานกลาง ซูม 3.5/5/6.5 — เห็นเงาต้นไม้/บ้านตกขวาล่าง ตัวละครเล็กลง (2) เดินยมเข้าใต้เงาต้นไม้ข้างบันไดแท่น (~1815,1160) — ตัวมืดลง (3) ขึ้นแท่น: นิราอยู่ขวาบัลลังก์ กด E คุยได้ (4) ประตูน้ำแข็ง (3430,640) หินสองก้อนมีเงา (5) ท่าเรือ (2224,1700)

## หลักฐาน (ทั้งหมดใน /tmp/l1/)
ก่อน/หลัง 3 จุด x 3 ซูม: `cmp-{plaza,ice,pier}-z{1,2,3}.jpg` (ซ้าย=main 8f82178, ขวา=L1) · A/B ตัวมืดในเงา: `ab-cmp.png` (ซ้าย=ปิด ขวา=เปิด) · หินก่อน/หลัง `cmp-rock.png` · นิรา `nira-cmp.jpg`, `nira-talk.png` · 390x844 `m390-plaza.png` · กริดแท่น `dais-grid.jpg`

## เทสต์ / fps
- `node --test tests/*.test.mjs`: **946 ผ่าน / 3 ไม่ผ่าน** — ทั้ง 3 (I1-A mirror x2, construction-arrival ใช้ stub รูป) **แดงบน main `8f82178` อยู่แล้ว** (ต้นเหตุ commit Codex yama-live/แสง) ไม่ใช่จาก L1 · ที่ main แดง 3 ข้ออื่น (k2/skill-atk/west-hit: cache token `yama-live`) ผมแก้ regex ให้ผ่านแล้ว
- fps (Playwright 1440x900 DPR2 `run_scenes.py` เครื่อง Intel UHD 630, โหลดเครื่องสูงจากงานคู่ขนาน): เทียบ main 8f82178 กับ L1 ในช่วงโหลดเท่ากัน — main: idle z5 57.9 · walk 57.5 · z3.5 60 · z5 56.4 · z6.5 60 · z6.5 walk 59 ; L1: 56.4 · 52.2 · 60 · 60 · 60 · 59.1 (walk ต่ำกว่า ~5 fps ในรอบนั้น min1s 29 ต้องวัดซ้ำเมื่อเครื่องว่าง) · รอบที่เครื่องโหลดหนักทั้งคู่ได้ ~24-32 fps เท่ากัน

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มีอาร์ตใหม่ที่ L1 ต้องการ · ข้อสังเกตให้ L1b/Kittanate: sprite `prop-rock-v1` มีขอบใสด้านล่าง ~13.5% (ถ้าวาด/ตัดใหม่ให้ชิดฐาน หินจะไม่ลอย) · เคลียร์พื้นใต้ footprint ตาม `footprints.json` v2

## สิ่งที่ยังไม่ทำ
- ภาพแผนที่ยังมีต้นไม้/หินวาดซ้อนใต้ sprite จนกว่า Codex L1b inpaint เสร็จ — ความรู้สึก "ลอย" จะหายสนิทหลังขั้นนั้น (เงา/AO ใส่แล้วช่วยได้บางส่วน)
- ความเร็วเดินของตัวละคร/stride ท่าเดินยมไม่ปรับตามขนาดที่ย่อ (ไฟล์ animation ห้ามแตะ) · ระยะคุยเชิงตรรกะ (game.js) ไม่เปลี่ยน มีแค่ hit-radius คลิกที่ย่อตาม
- เงาตัวละครเป็น blob นุ่ม ไม่ใช่ silhouette จริงของ sprite (ท่าเดิน/animation ต่างกันหลายชุด)
- โซนอื่น (asia/west/cyberhell) ไม่ได้รับเงา/ย่อตัวละคร
- ไม่ได้ merge · `src/town-lighting.js` ไม่ถูกแตะ — เมื่อ Codex มีทิศแสง ให้ import `SUN` จาก `town-shade.js` หรือส่งค่ามาให้ตรงกัน
- SendMessage ไม่มีในชุดเครื่องมือของ Toby — แจ้ง path มาสก์ผ่านไฟล์นี้และรายงานสุดท้ายแทน
