# AVEGEE Z4-POLES (+ งานเพิ่ม Z4 ขนาดอาคาร/โรงอาหาร/แท่นตัดสิน) — Toby, 30 ต.ค. 2569

Worktree `/Users/agapae/agapae-work/.toby-worktrees/z4-poles` · branch `toby/z4-poles` · commit `b2f7006` (เสาไฟ + ลบหลักฐาน) และ `aefb0fc` (งานเพิ่ม) · ไม่ push main

## สิ่งที่ build

**ส่วน 0 — ลบหลักฐาน Codex**: ลบ 291 ไฟล์ (png/jpg/webp/log/txt ที่ไม่ถูกอ้างจาก src/tests/index.html/scripts) · `output/coordination` 274M -> 62M (worktree; ที่ main ตอนเริ่ม 272M) · เก็บ .md/.json และ harness `2026-10-28-load01b` ครบ

**ส่วน 1 — เสาไฟ/สายไฟ/ไฟฟ้าช็อต โซน 4 (วาดด้วย canvas)**
- 287 เสา, 293 สาย (คู่เสา) ไล่จากพิกเซล markup `Map-Zone4-2.jpg` (เสา = น้ำเงินเข้ม, สาย = ฟ้า) ไม่ใช่จาก noise ของ zone4-poles.json · `scripts/extract-z4-poles.py` รันซ้ำได้ ได้ไฟล์ข้อมูลเหมือนเดิมทุกไบต์
- ความสูงเสาตามที่คุณเป้วาด (23–84 หน่วย world) · 2 แบบสลับ (แถบนีออนฟ้า / ยอดแหลมม่วง+ขดลวด) · depth sort กับตัวละครผ่าน layer `at(y,fn)` เดิม
- สายโค้งหย่อน สีเข้ม + เรืองฟ้า · ประกายวิ่งตามสาย (desktop 10 ตัว, มือถือ 2) · ช็อตแตกกิ่งสั้นที่ปลายฉนวน ครั้งละ 1 จุด ไม่เกิน 2.5 ครั้ง/วินาที (มือถือ 1.7) ไม่มีแฟลชเต็มจอ
- reduced-motion หรือปิด toggle สภาพอากาศ = สายเรืองนิ่ง ไม่มีประกาย/ช็อต
- สลับเป็นสไปรต์ภาพทีหลัง: แก้แค่ `paintPoleBody` ใน `src/z4-poles.js` (ตอนนี้ bake เป็น sprite ต่อ variant/ความสูงแล้ว blit)

**ผลเทสต์**: `node --test tests/*.test.mjs` = 1743 tests, 1743 pass, 0 fail (รัน `--test-concurrency=3`; รันเต็มแบบขนานปกติตอนเครื่อง load สูงมี 1 เทสต์ `workers.test.mjs` frame-local atlas โดน timeout 30 วินาทีของ python subprocess — รันเดี่ยวผ่าน ไม่เกี่ยวกับงานนี้)
เทสต์ใหม่ `tests/z4-poles.test.mjs` 5 ข้อ: จำนวนเสา/สายคงที่ (287/293), reduced/ปิด weather ไม่มีแฟลช, ≤3 แฟลช/วินาที + ไม่เต็มจอ, cap ตามจอ, cull เฉพาะที่เห็น

**Frame time (A/B ใน browser จริง, harness load01b ปรับ: stub โมดูลเสาเป็น base)** — `perf.json`
- desktop 1440x900: base 16.67 ms, new 16.67–16.84 ms (ต่าง ~0)
- มือถือ 390x844 dpr2 + CPU throttle x4: base 16.68, new 19.54/19.61 (+~2.9 ms ที่ x4 = ราว 0.7 ms ที่ความเร็วจริง) · รอบแรกก่อน bake sprite เป็น +10 ms จึงปรับ (bake body, ลดเส้นสายตอนซูมออก) · เครื่องมี load สูงระหว่างวัด ตัวเลขมีสัญญาณรบกวน

**ส่วนเพิ่ม (คุณเป้ลองเล่น 10:45) — Z4-TOWN-B** `src/town-cyberhell-layout.js`
1. **อาคารใหญ่ขึ้น x1.5** ทุกหลัง (11 สถานี + ประตูชายแดน) ขยายรอบจุดเท้า — ประตู/คิว/จุดเดินคงเดิม, hit box + collision ตาม · ขนาดกว้างตอนนี้ 188–353 หน่วย world (โซน 1 = 209–292) · เทสต์เส้นทาง z4-town-a 48 จุด (initial + all built) ผ่านโดยไม่แก้เงื่อนไข
2. **โรงอาหาร** ย้ายไปลานบนซ้ายของลานตัดสิน (ลานเดียวกับหอ tarang ฝั่งขวาที่ว่าง) foot (1845,440) bw 187.5 ประตู (1870,490) · ตรวจกับ mask ว่าเดินถึงได้ · ปรับ pin ในเทสต์ FOOD-A ให้ตรงพิกัดใหม่ (ตามที่คุณเป้สั่งย้าย)
3. **แท่นตัดสิน** ย้ายมากลางลานกลมใหญ่ foot (1855,1062) กว้าง 245 (เดิม 175) · throne (1855,950), plaza/bench (1850,1100), คิวเริ่ม (1850,1130), Nira ยืนบนแท่นฝั่งขวา · แท่นเป็นภาพ ไม่กั้นทาง (เหมือนโซน 1) — รูแดงเดิมที่ขอบบนยังบล็อกตามเทสต์
4. **ภาพพื้นหลังซูมแตก — ไม่ใช่บั๊กโหลด ไม่แก้ตามใบงาน**
   - renderer โหลด tiles ถูกชุด: ซูมแล้ว `townTerrainStats()` = desktop ready 9 / มือถือ ready 12, error 0, preview true, chunk มาจาก `img/map-zone4/v3/` (เริ่มโหลดที่ scale >= 0.7 device px/หน่วย world; โซนเมืองใช้ `town-terrain.js` ไม่ใช่ `cyberhell-terrain.js`)
   - แต่ tiles 4915x3277 แทบไม่มีรายละเอียดเกินระดับ 1536 px: พลังงานความถี่เกิน 0.31 Nyquist (= เกินความละเอียด 1536 px) เหลือ 2.0% (r2-c2) และ 1.4% (r3-c3), เกิน 0.5 Nyquist = 0.13–0.17% · ภาพ 1536x1024 ต้นฉบับจริงมี 31% และ 34% ใน band เดียวกัน (วัดบน crop เทียบสเกลเดียวกัน) · สรุป: เป็นภาพขยายจาก quadrant ~1536 (stitch-report: image_gen 4 quadrant native 1536x1024) → ต้องวาดใหม่ที่ความละเอียดสูงจริง (Codex 4 พ.ย.)

## ไฟล์ที่แตะ
- ใหม่: `src/z4-poles.js`, `src/z4-poles-data.js`, `scripts/extract-z4-poles.py`, `tests/z4-poles.test.mjs`, `output/coordination/2026-10-30-z4-poles/`
- แก้: `src/scene.js` (import + 1 บรรทัดเรียก `addZ4PoleLayers`), `src/town-cyberhell-layout.js`, `tests/z4-town-a.test.mjs` (pin โรงอาหาร), `index.html` (bump `?v=` ของ scene.js เป็น `20261030-z4-poles`, town-cyberhell-layout.js เป็น `20261030-z4-town-b`)
- ลบ: 291 ไฟล์หลักฐานใน `output/coordination/**`

## วิธีรัน/ทดสอบเอง
```
cd /Users/agapae/agapae-work/.toby-worktrees/z4-poles
python3 scripts/serve-nocache.py 8777     # แล้วเปิด http://localhost:8777/index.html (หรือใช้ serve.py ใน load01b ที่รองรับหลาย connection)
node --test tests/z4-poles.test.mjs tests/z4-town-a.test.mjs
```
เล่น: เริ่มเกมใหม่ → ไปโซน 4 → ดูเสา/สาย/ประกายตามทางเดิน · กดปุ่ม ⚙ ปิด "สภาพอากาศ" = สายเรืองนิ่ง ไม่มีประกาย · ลานกลางมีแท่นตัดสินกลางวง · เดินขึ้นลานบนซ้ายเจอโรงอาหาร (ช่อง "สร้าง · โรงอาหาร")

ภาพหลักฐาน (`output/coordination/2026-10-30-z4-poles/`): `overlay-vs-markup.jpg` (เสา=วงม่วง สาย=เหลือง ทับ markup), `contact-poles.jpg` (2 แบบ x 3 ความสูง + ช็อต), `z4-desktop-default/zoom/sparks/overview.jpg`, `z4-mobile-default/zoom/overview.jpg` (390), `b-desktop-court.jpg` (ลานตัดสินหลังย้ายแท่น), `b-desktop-overview.jpg` (ภาพรวมเมืองโซน 4), `b-*-canteen.jpg`, `b-mobile-*`

ข้อจำกัดความตรงของ overlay: เสา 287 ตำแหน่งอ่านจากพิกเซล markup ตรง · สาย 293 เส้นจับคู่เสาโดย fit พาราโบลาให้ตรงเส้นฟ้า ≥90% — ครอบคลุมพิกเซลสายฟ้า ~63% (สายที่คุณเป้วาดเป็นรูปตัว S/ขึ้นสูงบางเส้นไม่ถูกจับ และสายคู่ขนานรวมเป็นเส้นเดียวต่อคู่เสา) · 9 เสาไม่มีสาย · อยากให้ตรงกว่านี้ต้องแก้มือในไฟล์ข้อมูล

## สเปกอาร์ตที่ต้องการเพิ่ม (ถ้าจะให้ Codex/Kittanate วาดเสาจริงแทน code)
`img/z4-poles/pole-a-v1.webp` และ `pole-b-v1.webp` — ภาพข้าง/มุมเดียวกับแผนที่ (3/4 มองลงเล็กน้อย) พื้นโปร่งใส, 1 เฟรม, ขนาด 192x384 px, จุดเท้าอยู่กึ่งกลางล่างสุด, คานขวางกว้างเต็ม 192 px ที่ y=12% จากบน, ฉนวนเรืองปลายคานซ้าย-ขวา (ที่ 8%/92% ของความกว้าง) · ทำ glow แยกชั้นไม่ได้ ให้ใส่ใน sprite · ไม่แตะสี/ฟิลเตอร์ในโค้ด

## สิ่งที่ยังไม่ทำ
- เสายังไม่มี collision (เป็นของประดับ เดินทะลุได้เหมือนแท่น) — ไม่อยู่ในใบงาน
- ช็อตฟ้าผ่ายังไม่มีเสียง · ยังไม่ได้ QA บนมือถือจริง (วัดด้วย Chrome headless 390x844 + throttle เท่านั้น)
- ภาพ bolt จริงในเกมจับไม่ได้ชัด (ช็อตสุ่ม ≤2.5/วิ) จึงใส่ contact sheet ที่วาดฟังก์ชันจริงแทน; ประกายบนสายเห็นในภาพ sparks/default
- ยังไม่ merge/push (ให้ Dale) · tiles โซน 4 ความละเอียดต่ำ รอวาดใหม่ 4 พ.ย.
