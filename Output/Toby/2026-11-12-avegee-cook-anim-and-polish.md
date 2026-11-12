# Toby — AVEGEE: animation พ่อครัว/คนเสิร์ฟ + แก้ป้ายศัตรู + preload/prep-art + งานด่วน (รูปหาย / construction) · 12 พ.ย. 2569

worktree `~/agapae-work/.toby-worktrees/z1-v5` · branch `claude/2026-11-05-zone1-v5-fx` (push แล้ว) · Claudy เป็นคน merge main

## สิ่งที่ build

### 1. animation พ่อครัว 4 โซน + คนเสิร์ฟ TH ถือข้าวปั้นเดิน (ของ Codex ไม่วาดใหม่)
- `scripts/build-worker-cook.py <โฟลเดอร์ส่งมอบ Codex>` ย้ายแต่ละเฟรมด้วยจำนวนพิกเซลเต็มเท่านั้น (ไม่ยืด ไม่ย่อ ไม่แต่งสี): ชดเชยทั้งแถวด้วยค่าคงที่ 1 ค่า ให้กลางฝ่าเท้าอยู่ที่ x=160 (กลางช่องที่ renderer วาด) — Codex วาดให้ตัวอยู่ที่ x≈204/116 ซึ่งทำให้พ่อครัวเยื้องจากจุดยืน ~14% ของความสูง
  - หัวทุกเฟรมเป็นพิกเซลเดียวกันที่ Codex วางทับ จึงไม่ขยับต่อเฟรม (ชดเชยรายเฟรมจะทำให้หัวสั่น)
  - ขนาด: สูง 303–308 px เท่าท่ายืนเดิมของแต่ละโซน (v1 standing 308) → วาดที่ `mapWorkerHeight()` = 90% ยามา เหมือนเดิม ไม่ต้อง scale
  - คนเสิร์ฟ TH (carry 4 ทิศ): scale ตอน render (ไม่ resample) = 308/ความสูงแถว → 1.041 / 1.041 / 1.058 / 1.124 ตรงกับค่า fit ของแถวเดินเดิม (down 1.063, up 1.122)
- แก้เป็นรายโซน (ตัวเลขวัดจริง, ฐานเท้า y เท่า idle เดิม: th/asia/west y319, cyberhell y314)
  - **TH**: เลื่อนขวา −44 px / ซ้าย +44 px; เฟรม 7 ของแถวซ้ายกระเป๋าคาดเอวอยู่คนละสะโพกกับ 7 เฟรมที่เหลือ → ถือท่าเฟรม 6 แทนในช่อง 7 (แถวขวาไม่แตะ)
  - **Asia**: −22 / +22 px
  - **West**: −40 / +40 px
  - **Cyberhell**: −32 / +34 px
  - ที่ไม่ได้แก้ (ทำไม่ได้ถ้าไม่วาดใหม่): สนับเข่า/สัดส่วนลำตัวของ cyberhell แถวซ้ายเปลี่ยนช่วง 3→6; รอยต่อท่า 7→8 ใหญ่ที่สุดของทุกโซนเพราะเป็นท่าวางข้าวปั้นแล้วกลับท่าเตรียมตัก (เป็นท่าทางจริง ไม่ใช่หัวกระโดด) — ที่ขนาดในเกม (พ่อครัวสูง ~25 px ที่ 390) ความต่างระดับนี้ต่ำกว่า 1 px
- renderer (`src/workers.js`): อ่านแถวจาก json (`rows`), cook เลือกแถวขวา/ซ้ายตาม face (ห้อง canteen ส่ง `face` ของ `canteenCookPose` เข้า — เดิมไม่ได้ส่ง), คนเสิร์ฟ TH ที่ถืออาหารวาดท่า carry ตามทิศ heading/face แทนภาพนิ่ง `worker-rice` (ยังใช้เป็นสำรองจนภาพ carry โหลดเสร็จ) · ยืนเฉย ๆ ขณะถืออาหาร = เฟรมแรกของ carry
- ไฟล์: `img/workers/worker-{th,asia,west,cyberhell}-cook-v1.webp|json` (enabled:true), `worker-th-carry-v1.webp|json`

### 2. ป้ายศัตรู 390 px (Dale เจอ)
- 3 ตัว: กลุ่มศัตรูกว้าง 48% → 76% (59 px/ป้าย → 102 px) ชื่อ 9 → 10.5 px จำกัด 2 บรรทัด + `…` · "กำลังใจ 94 / 94" บรรทัดเดียว (9.5 px) · กล่องคำบรรยายขยับลงใต้ปุ่ม "หนี" (เดิมทับ 13 px)
- 1 ตัว: ชื่อใน HUD ขวาล่างเดิมตัดกลางชื่อ ("…รู/เข็ม") → บรรทัดเดียว + `…`; ปุ่ม "หนี" เดิมห้อยทับการ์ดทีม ~16 px → วงคำสั่งหยุดเหนือการ์ด (`ui.js` bounds ของ placeMenu)
- ตรวจจริง 1/2/3 ตัวที่ 390, 3 ตัวที่ 360, 3 ตัวที่ 1792 (เดสก์ท็อปไม่เปลี่ยน — กฎใหม่อยู่ใน `@media(max-width:700px)` เท่านั้น)

### 3. preload
- เอา `img/map-zone1/v5/zone1-terrain-v5-preview.webp` (0.96 MB, เกมไม่ใช้แล้ว แต่ catalog ยังสั่งโหลด — ยืนยันจาก request log) ออกจาก `img/preload-catalog.json` ใส่ `v7r/zone1-terrain-v7-preview.webp` แทน
- regex tier ใน `asset-preload.js` รู้จักโฟลเดอร์ `v7r` (เดิมรู้จักแค่ `v[2-9]` → v7r จะตกไป tier 1) · test เพิ่มใน `tests/k1d-terrain.test.mjs`

### 4. `scripts/prep-art.py` เซฟเป็น webp
- ทุกผลลัพธ์เป็น `.webp`: สไปรท์/โปร่งใส/สีน้อย (quantize) = lossless · ภาพวาดทึบ (คัตซีน เดิม JPEG q90) = lossy q86 method 6 (กฎเดียวกับ Dale 1ee18746) · เตือนสถานีที่ขาดตรวจ `.webp` · test `tests/prep-art-webp.test.mjs` (รัน prep() กับภาพสังเคราะห์ 12 ชนิด)

## งานด่วนจากคุณเป้ (18:21–18:23)
### (a) รูป/ไอคอนหาย
- **ต้นเหตุ (ทำซ้ำได้)**: แท็บที่เปิดค้างก่อน commit แปลง webp (18:15) ยังรันโค้ดเก่าซึ่งขอ `.png/.jpeg` ที่ถูกลบไปแล้ว — จำลองด้วยโค้ดเก่า (`1ee18746~1`) + ภาพใหม่: ได้ภาพขาด/alt "สุนัขนรก"/ไอคอนเทิร์น/การ์ดทีม เหมือนในคลิปทุกจุด และ 196 request ที่ 404 ในศึกเดียว · เปิดหน้าใหม่ (reload) = 0
- สแกนจริงด้วยเบราว์เซอร์ใหม่ทั้งหมด: `scripts/asset-404-scan.py` (151 ขั้น: ชื่อเกม → เมือง 4 โซน → ทุกปุ่ม HUD/fab → ศึก ศัตรู 1 และ 3 ตัวทุกพันธุ์ → ห้องพิจารณา) = **404: 0 · `<img>` พัง: 0**
- ทางเทียบ universe ของ `artUrl` (crew × ท่า × 4 โซน + สถานี + มอนสเตอร์ + ไอเท็ม + วิญญาณ + นามสกุล png/webp/jpeg) ระหว่างโค้ดก่อน/หลังแปลง: regressions = 0
- ที่เจอและแก้จริง: `artUrl(key,'jpeg'|'jpg')` ยังสร้าง `.jpeg` (ไม่มีผู้เรียกใช้ในตอนนี้ แต่เป็นชนิดเดียวกับบั๊ก) → แมปทุกนามสกุลเก่าเป็น webp · เพิ่ม `tests/asset-paths-runtime.test.mjs` (7 test: path ที่สร้างตอนรัน, manifest, preload catalog, alias วิญญาณ, soul poses, json ของ strip art, construction)
- 31 path ที่ฝ่ายคุณเป้สแกนเจอ: `yama-sword-v1` เป็น catalog ที่ถูกเก็บถาวรโดยตั้งใจ (ไม่มี import, `clean-404.test` ยกเว้นไว้) · `fx-layout.json`/`scene-fx-layout.json` เป็นชื่อไฟล์สัมพัทธ์ต่อโฟลเดอร์ที่โค้ดต่อเอง (เบราว์เซอร์ไม่ 404) · ที่เหลือเป็นคอมเมนต์
- **การตัดสินใจที่ค้างอยู่ให้คุณเป้**: แท็บเก่าค้างจะเจออาการนี้ทุกครั้งที่ deploy ภาพเปลี่ยนชื่อ (รวม Pages) — ถ้าต้องการ ทำแถบ "มีเวอร์ชันใหม่ แตะเพื่อโหลดใหม่" (เทียบ importmap กับ index.html ตัวล่าสุด) ได้ ยังไม่ทำเพราะเป็นการตัดสินใจเรื่องผลิตภัณฑ์/ข้อความ (Rae)

### (b) ท่าทางวิญญาณ ตกใจ/ร้องไห้
- **ไม่เคยมีไฟล์** ไม่ได้หายจากการแปลง: ไม่มีไฟล์ท่า cry/scared ของวิญญาณใน history ทั้งหมด (มีแต่ `hero-yama-cry` ของยามา) · `soul-poses.js` มีแค่ท่า `caught_lie` และ `necessity` และไฟล์ครบ 18 ตัว (ตรวจแล้วอยู่จริงทั้งหมด) — ครอบคลุม TH 10/10, Asia 7/10, West 0/10, Cyberhell 0/10
- ต้องมี spec อาร์ตก่อนจึงจะทำได้ (ดูด้านล่าง) และต้องให้ Vera ตัดสินว่าท่า "ตกใจ/ร้องไห้" เกิดตอนไหนของสอบสวน (ตอนนี้โค้ด `pressReaction` ให้แค่ 'fear'/'relief' ยังไม่ผูกกับภาพ)

### (c) animation ก่อสร้าง
- เสียบ `img/construction/th/stage-1..3.webp` + `construction.json` (Codex `20261111T005000Z-6ecec939`: 704×704 × 8 เฟรม 8 fps lossless, ปั้นจั่น+เสา+นั่งร้านล้วน ไม่มีตัวอาคาร) · loader `construction-sheets.js` รองรับ `worldWidth:256` (วาดกว้าง 256 หน่วยโลกตามที่ Codex วาดให้ ไม่ขึ้นกับ `def.bw`) · ตรวจในเกม: เห็นไซต์ก่อสร้างเคลื่อนไหวที่ความคืบหน้า 15% (นั่งร้าน+คนงาน) — โซนอื่นยังไม่มีชุด (fallback เป็นภาพ `st-building` เดิมตามกติกาของ loader)

## ไฟล์ที่แตะ
`src/workers.js` `src/scene.js` `src/room.js` `src/art.js` `src/ui.js` `src/construction-sheets.js` `src/asset-preload.js` `src/battle-turns.css` `index.html` (cache-bust `-cook1`/`-label1`) · `img/workers/*cook*` `img/workers/worker-th-carry-v1.*` `img/construction/th/*` `img/preload-catalog.json` · `scripts/build-worker-cook.py` `scripts/cook-anim-compare-gif.py` `scripts/asset-404-scan.py` `scripts/prep-art.py` · tests: `food-system` (แก้) `asset-paths-runtime` `prep-art-webp` `battle-label-390` (ใหม่) + regex cache-bust ใน fb-ui/perf/fx5/ko-crew/quest-rewards/battle-fx/p9/k1d/z1-v5-fx2 · หลักฐาน `docs/art-reviews/2026-11-12-cook-anim/` (GIF ก่อน/หลัง 4 โซน + carry 4 ทิศ + GIF จาก renderer ของเกม) และ `docs/art-reviews/2026-11-12-battle-label/` (ภาพก่อน/หลัง) รวม ~5.3 MB

## วิธีรัน/ทดสอบเอง
```
cd ~/agapae-work/.toby-worktrees/z1-v5
node --test tests/*.test.mjs            # ทั้งหมด
python3 scripts/serve-nocache.py 8942   # (8942 เสิร์ฟอยู่แล้ว)
BASE=http://127.0.0.1:8942/index.html CH=chrome python3 scripts/asset-404-scan.py   # สแกน 404 จริง (~5 นาที)
python3 -I scripts/cook-anim-compare-gif.py <โฟลเดอร์ Codex> docs/art-reviews/2026-11-12-cook-anim   # GIF เทียบ
```
คุณเป้/Kittanate: เปิด 8942 **รีเฟรชแบบ hard reload** → จ้างพ่อครัว+คนเสิร์ฟที่โรงอาหาร → เข้าห้องโรงอาหารดูพ่อครัวปั้นข้าวปั้น (หันซ้าย/ขวา) → ให้คนเสิร์ฟเดินส่งข้าวปั้น (TH) ดูท่าถือถาด 4 ทิศ → สร้างอาคารใหม่ดูไซต์ก่อสร้าง → ศึกชายแดนที่ 390 px ดูป้ายศัตรู 1/2/3 ตัว

## สเปกอาร์ตที่ต้องการเพิ่ม
1. ท่าวิญญาณ "ตกใจ" และ "ร้องไห้" (ถ้าต้องการจริง ต้องให้ Vera กำหนดจังหวะก่อน): ต่อวิญญาณ 1 ตัว/ท่า, PNG→WebP lossless พื้นโปร่ง, ขนาดและมุมมองเท่าภาพ `img/<Thai|Asia|West|CyberHell>/spirit-<ชนิด>-<โซน>-v*.webp` ของตัวนั้น, ชื่อ `img/soul-poses/<ชนิด>-<โซน>-scared-v1.webp` / `-cry-v1.webp` — 40 ตัว (10 ชนิด × 4 โซน) ต่อท่า; ขั้นต่ำที่เห็นผลคือ TH 10 + Asia 10
2. ชุด construction ของ Asia/West/Cyberhell (โครงเดียวกับ th: 704×704 × 8 เฟรม × 3 ระยะ, foot [352,640])
3. ข้าวปั้นในมือของคนเสิร์ฟโซนอื่น (ตอนนี้ใช้เครื่องหมาย 🍙 ลอยเดิม) — carry ของ Asia/West/Cyberhell ตามผัง 4 ทิศ × 8 เฟรม 320 px เหมือน TH

## สิ่งที่ยังไม่ทำ / ยังไม่ได้ทดสอบ
- พ่อครัวในเกมจริง: ตรวจ TH ในห้องโรงอาหารแล้ว (เห็นตัวและหันถูกด้าน) · อีก 3 โซนและ carry ตรวจผ่าน renderer ของเกม (`drawWorker` บน canvas, GIF `game-renderer-all-variants.gif`) แต่**ยังไม่ได้ดูในเกมจริงขณะเล่น** (ต้องเข้าโซน 2–4 และให้คนเสิร์ฟส่งอาหารจริง)
- ไม่ได้ดู GIF ก่อน/หลังด้วยตาในเบราว์เซอร์เป็นภาพเคลื่อนไหว (ดูเฟรมนิ่งจาก GIF และ filmstrip) — Kittanate ควรเปิดดู
- ข้าวปั้นเล็กในมือของโซนอื่น "ถ้าทำได้ด้วยโค้ด": ไม่ทำ (ตำแหน่งมือเปลี่ยนทุกเฟรม/ทิศ วางลอยจะดูผิด) คงเครื่องหมาย 🍙 เดิม
- แท็บเก่าค้างหลัง deploy (รอคุณเป้ตัดสิน)
- เทสต์ `z1-v5-fx2` ("no walkmask file changed") ล้มก่อนงานนี้อยู่แล้วเพราะ regex กว้างเกินจับไฟล์ `*-walk.png→webp` — แก้ให้แยกสไปรท์เดินออกจากมาสก์ (commit แยก)
