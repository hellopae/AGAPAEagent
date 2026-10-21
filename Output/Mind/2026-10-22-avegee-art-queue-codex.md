# AVEGEE — สเปก + prompt งานวาด 5 ชิ้นให้ Codex (ชุด 22 ต.ค. 2569)

ทำโดย Mind · ใบงาน `Output/Claudy/briefs/2026-10-22-avegee-art-queue-codex.md` · ตาม SOP-10
repo อ้างอิง (อ่านอย่างเดียว): `/Users/agapae/agapae-work/AVEGEE` · ภาพต้นเรื่อง: `/Users/agapae/agapae-work/feedback/2026-10-22/`
**Mind ไม่ได้แก้ไฟล์ใน repo** — ทุก path ปลายทางด้านล่างเป็นไฟล์ที่ Codex ต้องสร้างใหม่ (ไม่เขียนทับของเดิม ให้ Toby สลับ path + cache-bust)

---

## 0. ตารางสรุป (ชิ้นละ 1 บรรทัด)

| # | ชิ้นงาน | ไฟล์ปลายทาง | ขนาด | ลำดับ |
|---|---|---|---|---|
| 1 | บอสโซน 3 ยื่นอาวุธทั้งฝัก | `img/weapons/weapon-cutscene-cane-v2.jpeg` | 1375×768 JPEG (16:9) | P0 |
| 2 | ท่าเรือโซน 1 เบี้ยว | `img/map-zone1/repairs/r3-c3-pier-v1.webp` (ชิ้นทับ chunk r3-c3) | 1024×1024 WebP lossless | P0 |
| 3 | Animation คนงาน | `img/workers/worker-<zone>-sheet-v2.webp` (zone = th, asia, west, cyberhell) | 1280×3840 (4 คอลัมน์ × 12 แถว, ช่อง 320×320) ต่อโซน · P1 ต่อแถวที่ 12–16 เป็น 1280×5440 | P0 = th ก่อน, P1 = อีก 3 โซน |
| 4 | Cutscene หัวหน้า ชม/ตำหนิ | `img/head-th-praise-cutscene-v1.png` + `img/head-th-scold-cutscene-v1.png` (P1: เพิ่ม asia/west/cyberhell อีก 6 ภาพ) | 1672×941 PNG (16:9) ภาพละไฟล์ | P0 = th 2 ภาพ |
| 5 | วิญญาณตกใจ/สารภาพ | เลือกทาง overlay: `img/fx/fx-soul-{sweat-drops,gloom-lines,shock-burst,tremble-marks}.webp` | 512×128 / 512×256 / 512×512 / 512×128 (ALPHA) | P0 |

---

## 1. Step 0 — Asset inventory (SOP-10)

อ่านจริงแล้ว (ไฟล์ + สิ่งที่ล็อกได้):

| ไฟล์ | ใช้ทำอะไร | สิ่งที่ล็อก |
|---|---|---|
| `src/workers.js` | โค้ดคนงาน | ช่อง 320 px, 4×4, แถว 0=ยืน 1=เดิน 2=ทำงาน 3=นำส่งวิญญาณ, 4 เฟรม/แถว วนทุก 160 ms, จุดเท้า = ขอบล่างช่อง, `workerSheet = img/workers/worker-<zone>-sheet-v1.webp` |
| `img/workers/worker-{th,asia,west,cyberhell}-sheet-v1.webp` | สไตล์/ตัวละครคนงานเดิม 4 โซน | 1280×1280 (วัดจากภาพที่เรนเดอร์ + ตาราง inset หาร 320) |
| `src/town-layout.js`, `src/town-terrain.js`, `src/town-terrain-repair.js` | แผนที่โซน 1 | โลก 3840×2560, ภาพวาด 4915×3277 (1.28 px/หน่วย), chunk 1024 px ชื่อ `img/map-zone1/v5/r{row}-c{col}.webp`, กลไก "repair overlay" มีอยู่แล้ว |
| `img/map-zone1/v5/r3-c3.webp` | chunk ที่มีท่าเรือ | 1024×1024 ท่าเรืออยู่มุมขวาบน |
| `img/weapons/weapon-cutscene-{fang,chain,cane,trojan}.jpeg` | คัตซีนมอบอาวุธ 4 โซน | 1375×768 ทั้งหมด (16:9) · `-cane` = โซน 3 = ตรงกับ `9.jpeg` ทุกพิกเซล |
| `img/weapons/weapon-icon-cane.png` | หน้าตาอาวุธโซน 3 | ดาบโค้งยาว ด้ามพันแดง การ์ดปีกค้างคาวเหล็ก (ในคัตซีนใส่ฝักดำยาว) |
| `img/hero-boss.png`, `hero-boss-profile.png`, `hero-boss-cutscene.jpeg` | หัวหน้าโซน 1 = พญายม | ผิวน้ำตาลแดงเข้ม ตาส้มเรือง มงกุฎทองหลายชั้นยอดแหลม เกราะทองลายกนก คทาทอง นั่งบัลลังก์ดำ |
| `img/head-{asia,west,cyberhell}-punish-cutscene-v1.png` | คัตซีนหัวหน้าโซน 2–4 (ลงโทษ) | 1672×941 PNG |
| `Thai/spirit-*-th-v2.png` และของโซนอื่น, `src/regional-spirits.js` | วิญญาณหน้าสอบสวน | 10 แบบ (worker executive officer cleric woman clerk boy girl business elder-woman) × 4 โซน = 40 ไฟล์ + `spirit-recruit-th-v3` + `spirit-graduate-west-v3` · ตัวอย่าง business-th ≈ 1199×1311 · ตาวิญญาณเป็นสีขาวเรียบ ไม่มีรูม่านตา |
| `img/fx/README.md` + `docs/battle-fx-art-spec-2026-10-16.md` | รูปแบบสเปก FX | ชื่อ `fx-<กลุ่ม>-<ชื่อ>.webp`, ALPHA = พื้นโปร่ง, โค้ดไม่ tint ภาพ |
| `img/boss-justice/final-bound-sprite-v1.prompt.md` | แบบ prompt ที่ Codex วาดได้ดี | ใช้โครงเดียวกัน (อ้างภาพต้นแบบ + canvas + ห้ามอะไร) |

**สิ่งที่ Mind ทำไม่ได้ในรอบนี้ (ต้องให้ Codex ตรวจก่อนวาด)**
- session นี้ไม่มี shell วัดพิกเซล: ขนาดภาพและพิกัดบนภาพ (ท่าเรือ ท่าคนงาน) ได้จาก (ก) ค่าในโค้ด = แม่นยำ หรือ (ข) การดูภาพที่เรนเดอร์ = ±8 px · พิกัดแบบ (ข) ทำเครื่องหมาย "≈" ให้ Codex วัดซ้ำก่อนเริ่ม ด้วยคำสั่งใน §8
- ไม่ได้เปิดไฟล์ `.webp` ตัวจริงเทียบ alpha bbox ของเฟรมคนงาน → ค่า "ความสูงตัวละคร ≈ 300 px ในช่อง 320" เป็นค่าประมาณ ให้ Codex วัดจากแถว 0 ของ v1 แล้วใช้ค่าจริง
- ไม่ได้ตรวจว่าโค้ดจุดไหนเรียก `weapon-cutscene-cane` (Toby หาเอง ค้นคำนี้)

---

## 2. ชิ้นที่ 1 — บอสโซน 3 (เคานต์แวมไพร์) ยื่นอาวุธทั้งฝัก

**ปัญหาที่เห็นใน `9.jpeg`:** เคานต์คุกเข่าข้างเดียว มือขวาของภาพ (มือซ้ายของเขา) จับด้ามและ **ชักดาบออกจากฝักไปครึ่งเล่ม** ใบดาบโค้งสีเงินเปลือยพุ่งไปทางยมน้อย ท่านี้อ่านว่ากำลังชักดาบใส่ ไม่ใช่มอบให้ — ผิดความหมายฉาก "ผู้ทดสอบยกอาวุธให้อย่างให้เกียรติ" ที่ชุดโซน 1–2 ทำไว้ (โซน 1 ยื่นดาบทั้งเล่มบนสองมือ โซน 2 ยื่นดาบพร้อมโซ่ในฝ่ามือ)

**ไฟล์ปลายทาง:** `img/weapons/weapon-cutscene-cane-v2.jpeg` — 1375×768, JPEG quality ≥ 90, sRGB, ไม่โปร่งใส (ไฟล์เดิมเป็น JPEG)
**อ้างอิงสไตล์ (แนบทุกครั้ง):** `img/weapons/weapon-cutscene-cane.jpeg` (ภาพที่จะแก้ — ใช้เป็นฐาน) · `img/weapons/weapon-icon-cane.png` (หน้าตาอาวุธ) · `img/weapons/weapon-cutscene-fang.jpeg` (ท่ามอบที่ถูกของโซน 1)

**ล็อกไว้ ห้ามเปลี่ยน:** ฉากหลังทั้งหมด (ประตูหินโค้ง รูปปั้นการ์กอยล์ 2 ตัว ไฟน้ำเงิน 2 ถ้วย เดือนเสี้ยว ค้างคาวบนฟ้า หิมะ ลานหินแตก) · เคานต์อยู่ซ้ายภาพคุกเข่าข้างซ้ายของเขาลงพื้น หนวดขาวยาว ผมขาว โค้ทดำซับแดง ค้างคาวปักที่ชาย · ยมน้อยอยู่ขวาภาพ ผิวแดง หมวกเหล็กเขาโค้ง ผ้าขนสัตว์คลุมไหล่ เสื้อเขียวลายทอง · แสงสีน้ำเงินกลางคืน · ตำแหน่งตัวละครทั้งสอง · สัดส่วนภาพ 16:9

**เปลี่ยนเฉพาะ:** ท่าแขนทั้งสองของเคานต์ + อาวุธ + มือของยมน้อย

**ท่าใหม่ (ท่าเคารพ):**
- อาวุธอยู่ **ในฝักดำปิดสนิท ทั้งเล่ม** วางแนวนอนเสมอระดับอก พาดบนฝ่ามือหงายสองข้างของเคานต์ (ฝ่ามือซ้ายรองใกล้ปากฝัก ฝ่ามือขวารองกลางฝัก) เหมือนยื่นถาด
- ด้ามอยู่ปลายขวาภาพ (ใกล้ยมน้อย) หันด้านจับเข้าหาผู้รับ: ด้ามพันแดง การ์ดปีกค้างคาวเหล็ก ลูกตุ้มปลายด้ามตามไอคอน · ปลายฝักชี้ไปซ้ายภาพ
- ไม่เห็นใบดาบเปลือยแม้แต่นิดเดียว ไม่มีมือใดแตะด้าม ปากฝักปิด
- เคานต์ก้มศีรษะลงเล็กน้อย ตามองต่ำ สีหน้าสงบเคร่ง (ไม่ยิ้มเยาะ ไม่โชว์เขี้ยว)
- ยมน้อยยื่นสองมือหงายเข้ารับ (เดิมยื่นมือเดียว) ท่าเข้ารับของเคารพ สีหน้าเดิม (ตั้งใจ จริงจัง เล็กน้อยกังวล)

### Prompt (EN) — ใช้แบบ edit โดยแนบ `weapon-cutscene-cane.jpeg` เป็นฐาน

```
Edit the attached image. It is a 16:9 pixel-art game cutscene. Keep the ENTIRE background, lighting,
palette, camera, art style, the count's face, hair, moustache, coat and cape, and the red imp's
face, helmet, cloak and clothes EXACTLY as they are, pixel for pixel wherever possible.
Change ONLY the two arms and hands of the old vampire count, the weapon he holds, and the two hands
of the small red imp.

New pose, a respectful offering: the count kneels on one knee as before. The weapon is a long
curved-sabre-style blade that stays FULLY SHEATHED inside a long black lacquered scabbard
(black scabbard with a small silver tip fitting). He holds the sheathed weapon perfectly
horizontal at chest height, resting across both of his open upturned palms like a tray, left palm
under the mouth of the scabbard, right palm under the middle. The grip end points to the RIGHT of
the image, toward the imp: a red leather-wrapped grip, a dark iron winged-bat crossguard, a small
bat-head pommel with a red gem eye. The scabbard tip points LEFT. The blade is NOT drawn: NO bare
steel visible anywhere, NO hand touching the grip, the scabbard mouth is closed against the guard.
The count's head is bowed slightly and his eyes are lowered; his expression is stern, calm and
courteous, not threatening, no smile, no fangs shown.
The imp stands in the same place and reaches out with BOTH hands, palms up and cupped, to receive
the weapon, fingers slightly spread, with a wary but earnest expression as in the original.

Style: same detailed modern pixel art as the original, crisp dark pixel outlines, soft dithered
shading, cool moonlit blue palette with deep red accents. No new characters, no new props, no
text, no logos, no cross or religious symbols, no glow around the weapon, no blood.
Output: 16:9 landscape, as close to 1375x768 as the tool allows.
```

**Negative / ห้าม:** `drawn sword, exposed blade, bare steel, hand on hilt, pointing the blade at the imp, sword raised, combat stance, smile, fangs, blood, glow, aura, cross, crucifix, holy symbol, text, watermark, logo, changed background, changed faces, extra characters, extra weapons, rotated camera`

**ขั้นหลังวาด:** ย่อ/ครอปเป็น 1375×768 ด้วย Lanczos (ครอปได้ไม่เกิน 4% ด้านเดียว) → เซฟ JPEG q92 → เทียบกับต้นฉบับทับกันด้วย diff (สร้าง `output/art-queue-2026-10-22/cane-v2-diff.png`) ยืนยันว่า **นอกบริเวณแขน/อาวุธ/มือยมน้อย พื้นหลังไม่เปลี่ยน** · ถ้าโมเดลเปลี่ยนฉากหลัง ให้วาดเฉพาะส่วนแล้ว composite กลับด้วยมาสก์นุ่ม (ทำแบบ `output/n1b/build-evidence.py`)

**เกณฑ์ตรวจรับ (Toby/Chris):**
1. ไม่มีใบดาบเปลือยในภาพเลย อาวุธทั้งเล่มอยู่ในฝัก ปากฝักติดการ์ด
2. ดาบแนวนอน ขนานพื้น (เอียงไม่เกิน 5°) วางบนฝ่ามือสองข้างของเคานต์ ด้ามหันหายมน้อย
3. ยมน้อยใช้สองมือรับ ท่าเคารพ
4. ฉากหลัง ใบหน้า เสื้อผ้า ของทั้งสองตัวละครไม่เปลี่ยน (เทียบ diff)
5. ขนาด 1375×768 พอดี · อ่านออกว่าเป็นอาวุธเดียวกับ `weapon-icon-cane.png` (ด้ามแดง การ์ดค้างคาว)
6. ไม่มีสัญลักษณ์กางเขน/ศาสนา (การ์ดดาบเป็นปีกค้างคาวตามไอคอน ไม่ใช่กางเขนเรียบ)

---

## 3. ชิ้นที่ 2 — ท่าเรือโซน 1 เบี้ยว (วาดทับเฉพาะส่วน)

**ที่อยู่ในเกม:** `src/town-layout.js` ระบุท่าเรือ (`bossPier` 2240,1680 · `ferry` 2225,1780 · หมุดบันได `dock` 2224,1724) และกฎพื้นเดินได้ของท่าเรือ · อยู่ใน chunk **`img/map-zone1/v5/r3-c3.webp`** (แถว 3 คอลัมน์ 3) พิกัดในช่อง 1024×1024 ของ chunk ≈ x 730–935, y 110–300

**ปัญหาที่เห็นใน `11.png` (วงฟ้า) เทียบกับสะพานหลักข้าง ๆ** (สะพานหลักสมมาตร ราวตั้งฉาก บันไดกับพื้นกว้างเท่ากัน ศูนย์กลางเดียวกัน):
1. **ราวบันไดเอียงเป็นเส้นทแยง** (ซ้ายเอียงออกซ้ายล่าง ≈ 20–25° ขวาเอียงออกขวาล่าง) ขณะที่ราวสะพานหลักเป็นเส้นตั้งฉากขนานกัน → ท่าเรือดูบิดเป็นรูปตัววี
2. **บันไดกับพื้นไม่ตรงแกนเดียวกัน**: บันได ≈ x 745–855 (กลาง ≈ 800) แต่พื้นท่า ≈ x 765–912 (กลาง ≈ 838) เหลื่อมกัน ≈ 38 px และพื้นกว้างกว่าบันได ≈ 35%
3. **ผนังหินด้านหน้าและเสามุม**: เสาซ้ายสูงอ้วนกว่าเสาขวา ผนังหน้ามองจากด้านหน้าตรง ๆ ขณะที่บันไดมองจากบนลงล่าง สองส่วนใช้คนละมุมกล้อง
4. ลายปูหินพื้นท่าละเอียดน้อยกว่าสะพานหลัก (หินก้อนเล็ก ลายไม่ต่อเนื่อง)

**ของที่ต้องคงตำแหน่ง (เดินได้ห้ามเปลี่ยน — คำนวณจากโค้ด):** กฎพื้นท่าเรือใน `townFloorAt` คือพื้นเดินได้ x โลก 2188–2292, y ≤ 1796 · แปลงเป็นพิกัดช่อง r3-c3 (×1.28 แล้วลบ 2048 / 2048):
- แถบเดินได้ **x 752–886, y 128–251** (กลางแกน ≈ **x 819**)
- จุดเรือข้าม (ferry) ≈ (800, 230) · จุดบันได (dock) ≈ (799, 159) · ปลายทางบกด้านบน (bossPier) ≈ (819, 102)
- ห้ามขยับแถบนี้ — ภาพใหม่ต้องให้ "พื้นท่า + บันได" ครอบแถบนี้พอดี ขอบพื้นที่มองเห็นอยู่ภายใน ±6 px ของ x 752 และ 886 · ขอบล่างของพื้นดาดฟ้า ≈ y 251 แล้วต่อด้วยผนังหินหน้า (ลง ≈ y 298)

**เป้าหมายภาพ:** ท่าเรือใหม่ **สมมาตรรอบแกน x ≈ 819** บันไดหินแนวตั้ง 5 ขั้น (กว้าง ≈ 134 px = เท่าพื้นเดินได้) ลงสู่ดาดฟ้าหินสี่เหลี่ยม ราวสองข้างเป็นเส้นตั้งฉากขนานกัน ทำเลียนราวสะพานหลักข้างซ้าย (เสาหินเข้มพันแถบทอง ปลายเสาเป็นยอดทอง ราวทองฝัง) ผนังหินด้านหน้าเตี้ยมีเสามุมสองต้นขนาดเท่ากัน ปลายยอดทอง · ลายปูหินเท่าสะพานหลัก (หินแผ่นใหญ่ มีรอยต่อ สีทรายอุ่น) · เงาตกน้ำเข้มใต้ฐานเล็กน้อย

**ไฟล์ปลายทาง:** `img/map-zone1/repairs/r3-c3-pier-v1.webp` — **1024×1024 พอดี** (ขนาดเต็ม chunk) · WebP lossless (quality 100 / `lossless=True`) · RGB(A) ไม่ต้องโปร่ง · **เนื้อหาต้องเท่ากับ `r3-c3.webp` ทุกพิกเซล ยกเว้นบริเวณท่าเรือ** เพราะระบบ repair overlay จะวางทับ chunk ผ่านมาสก์ (ไม่แตะไฟล์เดิม ไม่แตะ preview ตรง ๆ — กลไกใน `src/town-terrain-repair.js` ทับ preview ให้เองจากไฟล์เดียวกัน)
**ข้อมูลให้ Toby ใส่ใน `TOWN_TERRAIN_REPAIRS`:**
`{row:3,col:3,url:'img/map-zone1/repairs/r3-c3-pier-v1.webp',border:16,fade:16,boxes:[[630,60,1000,340]]}` (กล่องใหญ่กว่าท่าเรือ ≈ 40 px ให้ขอบนุ่มของมาสก์ 42 px ตกบนน้ำ/หินว่าง ไม่ตกบนท่า) · ยืนยันว่า chunk นี้ยังไม่มี repair เดิม (ตอนนี้มีแค่ r2-c3 และ r1-c3)

**อ้างอิงสไตล์:** `img/map-zone1/v5/r3-c3.webp` (สะพานหลักซ้ายคือแบบของราว/ขั้น/ปูหิน) · `img/map-zone1/v5/r3-c3.webp` ส่วนน้ำม่วงเรืองเส้นขาว (ต้องต่อเนื่อง) · เทียบตัวอย่างงานวาดทับเฉพาะส่วนที่ Codex เคยทำ: `output/n1b/README.md`

**วิธีทำ (แบบ N1b):**
1. ครอปจาก `r3-c3.webp` กล่อง **x 630–1000, y 60–340** (370×280) → ขยาย 3× ด้วย nearest/Lanczos เป็นภาพอ้างอิง
2. ส่ง image_gen แบบ edit: แก้เฉพาะท่าเรือ ภาพออกมา normalize กลับ 370×280
3. composite กลับเข้า chunk 1024×1024 ด้วยมาสก์ (วงรี/สี่เหลี่ยมมนครอบท่าเรือ ≈ x 700–950, y 100–320 + Gaussian blur 3–4 px) — นอกมาสก์ = พิกเซลเดิมเป๊ะ
4. บันทึก evidence ใน `output/art-queue-2026-10-22/pier/`: source-crop, generated, mask, before-after, diff-map, `verification.json` (ขนาด, จำนวนพิกเซลที่เปลี่ยนนอกมาสก์ = 0)

### Prompt (EN) — edit ภาพครอป

```
Edit the attached crop of a top-down 3/4-view pixel-art game map (same view as a classic
isometric-leaning RPG ground painting). In the crop there is a small stone pier with a short
staircase going into purple glowing lava-water. It is drawn crooked. Redraw ONLY the pier and keep
everything else (the water, the glowing white ripple lines, the dark grey rocks and orange leaves
at the top edge, the paving above the stairs) exactly the same.

Redraw the pier perfectly SYMMETRIC around one vertical centre line, using the same projection,
materials and level of detail as the big stone bridge in the reference (the bridge's balustrades):
- At the top, a 5-step stone staircase seen with horizontal treads and short riser faces, 134 px
  wide in the original pixel scale, leading down from the land edge onto a rectangular stone deck
  of the SAME width as the stairs.
- Both balustrades are perfectly VERTICAL, parallel, identical mirror images: dark grey stone
  posts with thin gold bands and a small gold finial cap on top, joined by a slim gold-inlaid
  handrail. NO diagonal or leaning rails.
- The deck is paved with the same warm sand-beige irregular large flagstones as the main bridge,
  with thin dark mortar lines.
- The front edge of the deck is a low dark stone wall with TWO identical corner posts of equal
  height, each topped with a small gold finial, standing in the water. A thin dark contact shadow
  and a few purple ripple highlights where the stone meets the water.
Warm top-left lighting like the rest of the map. Same pixel density and crisp dark outlines as the
reference. No boat, no people, no text, no new objects, no glow, nothing outside the pier.
```

**Negative / ห้าม:** `leaning rails, diagonal railings, asymmetric pier, perspective change, front-on elevation view, boat, people, lantern added, extra stairs, changed water pattern, new colors, blur, smooth gradients, text`

**เกณฑ์ตรวจรับ (Toby):**
1. ไฟล์ 1024×1024 · นอกกล่อง [630,60,1000,340] เท่ากับ `r3-c3.webp` ทุกพิกเซล · ในกล่อง นอกท่าเรือ ต่างไม่เกิน noise ของมาสก์ขอบ (diff-map)
2. ราวสองข้าง **ตั้งฉาก** (เอียงจากแนวตั้ง ≤ 2°) และสมมาตรซ้าย-ขวารอบ x 819 ±4 px
3. บันไดกว้างเท่าดาดฟ้า (±4 px) ขอบเขตมองเห็นสอดคล้องแถบเดินได้ 752–886 (±6 px)
4. ลายปูหินและราวเหมือนสะพานหลัก (เทียบภาพซ้อนที่ซูม 200%)
5. ในเกม: เดินลงท่า เรือข้ามตรงจุด ferry ไม่ลอยออกนอกดาดฟ้า ไม่เห็นรอยต่อกล่อง ที่ซูมเข้า-ออก และบน minimap/พรีวิว
6. `node --test tests/*.test.mjs` ผ่าน (ไม่มีการแก้ walkmask)

---

## 4. ชิ้นที่ 3 — Animation คนงาน

**ที่เห็นใน `12.png` (วงฟ้า):** คนงานนำวิญญาณจากท่าเรือไปแท่นตัดสิน "ลอยไปมา" — ตัวไถลโดยไม่ก้าวขา ใช้ภาพท่าชี้มือเดียวกันตลอดทาง

**สาเหตุจากโค้ด `drawWorker` (src/workers.js:222-233):**
- แถวนำส่ง (แถว 3) เป็นท่ายืนชี้มือ 4 เฟรม **ขาไม่ก้าว** แต่ตัวเคลื่อนที่ → ลอย
- แถวเดิน (แถว 1) มีด้านข้างด้านเดียว ใช้พลิกซ้าย/ขวา · เดินขึ้น/ลงบนจอก็ใช้ด้านข้างเดิม (`face` พลิกซ้ายขวาอย่างเดียว) → เดินลงเหมือนไถลข้าง
- แถวทำงาน (แถว 2) ท่าเดียว (ตีค้อน) ใช้กับ **ทุกงาน** สร้าง/ซ่อม/เก็บของ (`['build','repair','gather']`) · ตัดต้นหนาม และเก็บเศษดาบ จึงตีค้อนอยู่กับที่
- งานคุมงาน (`supervise`) ไม่มีท่าเลย ใช้ท่ายืนแถว 0
- ตอนแบกของไปขาย (`w.cargo` มี) ใช้ท่าเดินมือเปล่า ไม่เห็นว่าถืออะไร
- พักงาน (`rest`/`recovering`) ใช้ท่ายืนเฉย

**ไฟล์ปลายทาง (ต่อโซน):** `img/workers/worker-<zone>-sheet-v2.webp` · zone ∈ `th`, `asia`, `west`, `cyberhell` · **ช่อง 320×320 px, 4 คอลัมน์ (4 เฟรม/แถว), RGBA พื้นโปร่ง** · ตัวละครหันขวา (โค้ดพลิกเป็นซ้าย) เหมือน v1 · ห้ามเปลี่ยนไฟล์ v1 (ให้ Toby สลับ path ตอนเสียบ)
**สเกลและจุดเท้า (ต้องเท่า v1):** ความสูงตัวละครยืนตรง ≈ 300 px ในช่อง 320 (วัดจาก v1 แถว 0: alpha bbox ของ 4 เฟรมแล้วใช้ค่านั้น) · **ฝ่าเท้าอยู่ขอบล่างของช่อง** (v1: ล่างสุด ≈ y 316–320) กึ่งกลางเท้า x ≈ 160 ± 6 · ใช้สเกลเดียวทั้งชีต ห้ามปรับรายเฟรม · ท่าย่อ/คุกเข่าให้เท้ายังติดเส้นฐานเดิม (ตัวเตี้ยลง ไม่ลอยขึ้น) · เว้นระยะในช่อง ≥ 6 px จากขอบซ้าย/ขวา/บน ไม่ให้ค้อน เศษ เครื่องมือล้ำช่องข้าง (v1 ต้องใช้ตาราง `WORKER_FRAME_INSETS` ตัดเศษเพราะข้อนี้พลาด — ชุดใหม่ห้ามเป็นอีก)
**เวลาเฟรม:** โค้ดเดิมวน 4 เฟรมเท่ากัน 160 ms (รอบละ 640 ms) — เขียนท่าให้เล่นสวยที่ความเร็วนี้

**แผนที่แถว (v2):**

| แถว | ท่า | ใช้เมื่อ | เฟรม 1–4 (สรุป) | สถานะ |
|---|---|---|---|---|
| 0 | ยืนรอ (idle) | ไม่มีงาน | **คัดลอกจาก v1 แถว 0 ไม่แก้** | P0 |
| 1 | เดินด้านข้าง (หันขวา) | เคลื่อนที่ซ้าย/ขวา | **คัดลอกจาก v1 แถว 1 ไม่แก้** (ถือเชือกม้วน) | P0 |
| 2 | สร้างอาคาร (ตีค้อนใหญ่) | `build` | **คัดลอกจาก v1 แถว 2** | P0 |
| 3 | **นำวิญญาณเดิน** (ด้านข้างหันขวา) | `escort` | ก้าวขาเต็มรอบ (ติดพื้น → ผ่าน → ติดพื้น → ผ่าน) ขณะแขนหน้าผายมือชี้ทางเรียกตามเหมือน v1 แถว 3 · แขนแกว่งเบา · ตัวกระเพื่อมขึ้นลง 2–3 px ตามก้าว | **P0 แก้ปัญหาหลัก** |
| 4 | **เดินลง (หน้าตรง)** | เคลื่อนที่ลงจอ | เดินเข้าหากล้อง ขาสลับ แขนแกว่ง เชือกม้วนที่มือข้างเดียวกับ v1 | P0 |
| 5 | **เดินขึ้น (หันหลัง)** | เคลื่อนที่ขึ้นจอ | เห็นหลัง หมวก เขา ถุงเครื่องมือที่เอว เดินสลับขา | P0 |
| 6 | **ตัดต้นหนาม** (ต้นงิ้ว) | `gather` ไม้งิ้ว ช่วงเก็บ | ข้างหันขวา · ถือมีดพร้าสั้น/ขวานมือเดียว ง้าง→ฟันกิ่งหนามที่ขอบขวาช่อง→เศษหนาม/ใบกระเด็น→ดึงกลับ · สวมถุงมือหนัง (ไม่มีเลือด) | P0 |
| 7 | **เก็บเศษดาบ** | `gather` เศษดาบ ช่วงเก็บ | ข้างหันขวา · ย่อ คีบเศษดาบโลหะดำด้วยคีมไม้/ถุงมือ → ยกขึ้น → หย่อนลงตะกร้าเล็กข้างตัว (เศษเล็ก ไม่มีคม/เลือด) | P0 |
| 8 | **ซ่อมอาคาร** | `repair` | หน้า 3/4 ขวา · ย่อครึ่งตัว มือหนึ่งถือประแจ อีกมือถือเกรียงฉาบ ขันแล้วปาดปูน · ต่างจากแถว 2 (ไม่ใช้ค้อนใหญ่) | P0 |
| 9 | **คุมงาน** | `supervise` | ยืน มือหนึ่งถือแผ่นบัญชีไม้ (ไม่มีตัวอักษร) อีกมือถือไม้เรียวสั้นเคาะฝ่ามือ/ชี้ไปข้างหน้า มองซ้าย-ขวา พยักหน้า · ห้ามแส้/ท่าทำร้าย | P0 |
| 10 | **แบกกิ่งหนามไปขาย** (ด้านข้างหันขวา) | `gather` ไม้งิ้ว ช่วงขาย (`cargo=ngiwWood`) | เดินก้าวขาเต็มรอบ แบกมัดกิ่งหนามพาดบ่าผูกเชือก มือหนึ่งจับมัด | P0 |
| 11 | **ถือตะกร้าเศษดาบไปขาย** (ด้านข้างหันขวา) | `gather` เศษดาบ ช่วงขาย (`cargo=dabShards`) | เดินก้าวขาเต็มรอบ ถือตะกร้าไว้หน้าตัวสองมือ เศษดาบโผล่พ้นปากตะกร้า | P0 |
| 12 | พักเหนื่อย | `rest` / `recovering` | นั่งบนพื้น/ก้อนหิน ปาดเหงื่อ พัดด้วยหมวก ถอนหายใจ | P1 |
| 13–14 | แบกกิ่งหนาม เดินลง/ขึ้น | ขายแล้วเดินแนวตั้ง | หน้าตรง / หลัง | P1 |
| 15–16 | ถือตะกร้าเศษดาบ เดินลง/ขึ้น | เหมือนกัน | หน้าตรง / หลัง | P1 |

ถ้ายังไม่ทำแถว 13–16 โค้ดใช้แถว 10/11 (ด้านข้าง) แทนตอนเดินแนวตั้ง — ยอมรับได้ใน P0
**P0 = แถว 0–11 ของโซน `th` ก่อน** (แล้วให้คุณเป้ดู GIF) → P1 = อีก 3 โซน (แต่ละโซนใช้ v1 ของโซนนั้นเป็นต้นแบบตัวละคร) → แถว 12–16

**ตัวละครต่อโซน (ล็อกตาม v1 ของโซนนั้น — ห้ามเปลี่ยนหน้า ชุด สี):**
- `th`: ยักษ์เล็กผิวแดง เขาทองสองข้างบนหมวกหนังสีน้ำตาลปีกกว้าง เสื้อดำคาดเอวถักทอง ถุงเครื่องมือหนังที่เอว
- `asia`: โอนิตัวเล็กผิวเขียวอ่อน เขาเดี่ยวสีงาช้าง หมวกฟางทรงกรวย ชุดฮัปปิ น้ำเงินเข้ม สายคาดแดง
- `west`: ก็อบลินผิวน้ำเงินเทา หูใหญ่ หมวกเหล็กเขาควาย ขนสัตว์คลุมไหล่ ผ้ากันเปื้อนหนังน้ำตาล ถุงมือหนัง เชือกห้อยเอว
- `cyberhell`: ผิวม่วงเข้ม หมวกนิรภัยดำเขาโค้ง มีแถบไฟฟ้าสีฟ้าและไฟหน้าหมวกสีส้มทองแดง ชุดดำเส้นวงจรเรืองฟ้า ถุงมือดำ

### Prompt (EN) — ใช้ซ้ำทุกโซน: แทน `[ZONE BLOCK]` ด้วยตัวละครของโซน และสร้างทีละ 2 แถว (ไม่เกิน 8 เฟรมต่อภาพ)

```
Production 2D pixel-art game sprite sheet, the SAME character as the attached reference sheet
(identity, face, outfit, colors, proportions and pixel style must match the reference exactly:
[ZONE BLOCK]). Chibi proportions, crisp 1-pixel dark outline, soft dithered cel shading, detailed
pixel shading like the reference. Top-down 3/4 RPG view camera, same camera height as the reference.
Draw a strip of 4 animation frames per row, left to right, each frame in an equal 320x320 cell
laid out on a regular grid, one character per cell, every cell the same scale, the character's
soles touching the same baseline at the bottom of each cell and the feet centered horizontally in
the cell. Leave at least 6 px of empty margin between the drawing and the left, right and top cell
edges; props and tools must stay inside their own cell and never touch neighbouring cells.
Plain flat solid magenta (#FF00FF) background, no ground, no shadow, no glow, no text.
The character height from the horn/hat tip to the soles is 300 px in every frame.

ROW A: [POSE A]
ROW B: [POSE B]

Animation quality: 4 frames must read as one smooth loop at 160 ms per frame (640 ms cycle),
with clear key poses (contact, passing, contact, passing for walks; wind-up, strike, impact, recover
for work). Keep the face, hat/helmet, tool belt and clothes identical in every frame; only limbs,
tools and body lean change.
```

**[POSE …] ต่อแถว (คัดไปแทนที่):**
- แถว 3 นำวิญญาณ: `side view facing right, a full walk cycle (4 frames: right foot contact, passing, left foot contact, passing), body bobbing 2-3 px, the front arm extended forward with an open palm, beckoning/guiding someone to follow, the rear arm swinging lightly, friendly guiding expression`
- แถว 4 เดินลง: `front view walking toward the camera, 4-frame walk cycle, arms swinging, a rope coil carried in one hand as in the reference walk row`
- แถว 5 เดินขึ้น: `back view walking away from the camera, 4-frame walk cycle, we see the back of the hat/helmet, horns, back of the tool belt, arms swinging`
- แถว 6 ตัดต้นหนาม: `side view facing right, chopping thorny tree branches with a short single-handed billhook/hatchet wearing thick leather gloves, 4 frames: raise, swing, impact with a few small thorn twigs and leaves flying off to the right, recover. A bundle of thorny dark branches with long spikes stands at the right edge of the cell`
- แถว 7 เก็บเศษดาบ: `side view facing right, crouching, picking broken dark-steel sword fragments off the ground with wooden tongs and gloved hands and dropping them into a small woven basket at his side; 4 frames: reach down, grab, lift, drop into basket. Fragments are small dull metal shards, no blood`
- แถว 8 ซ่อมอาคาร: `three-quarter view facing right, kneeling on one knee, tightening a bolt with a wrench in one hand and smoothing mortar with a small trowel in the other, 4 frames alternating wrench turn, trowel smear, wipe brow, trowel smear; not using a big hammer`
- แถว 9 คุมงาน: `standing, holding a small wooden tally board (blank, no writing) in one hand and a short wooden baton in the other, 4 frames: glance at the board, tap the baton in the palm, point forward, nod; calm supervising expression, no whip, no aggression`
- แถว 10 แบกกิ่งหนาม: `side view facing right, a full walk cycle, carrying a rope-tied bundle of thorny dark branches on one shoulder with one hand holding it, slightly leaning under the weight`
- แถว 11 ถือตะกร้าเศษดาบ: `side view facing right, a full walk cycle, carrying a woven basket in front of the body with both hands, dull dark metal sword fragments sticking out of the top, slightly leaning back`

**Negative / ห้าม:** `changed face, different outfit, different hat, different colors, realistic proportions, 3D render, smooth gradient, blur, glow, shadow under feet, ground, text, weapons aimed at people, blood, gore, whip, cropped hat or tool, tool crossing into the neighbouring cell, frames of different scale, floating feet, anti-aliased soft edges`

**ขั้นหลังวาด (ตามสกิล `sprite-animation-spa`):** ตัดพื้นแมเจนต้าเป็นโปร่งใส (alpha) → ตัดเฟรมตามกริด → **สเกลเดียวทั้งชีต** → วางลงช่อง 320×320 โดยกึ่งกลางเท้าตรงเส้นฐานเดียวกันทุกเฟรม → ต่อเป็นชีต `worker-<zone>-sheet-v2.webp` (WebP q≥92 หรือ lossless alpha) + `metadata.json` (ขนาดช่อง, ตารางแถว, anchor, scale, sha256 ต้นทาง) + **GIF พรีวิวทุกแถว** บนพื้นเข้ม + contact sheet ทั้งชีต · ใช้สคริปต์แบบ `output/spa-pilot-20261015/build.py` / `idle-v2/prepare.py` · ไม่ยืด/หด/ดัดภาพเดิมแทนท่าใหม่ · ตรวจความต่อเนื่องของหน้า/หมวก/ชุดข้ามเฟรม (imagegen มักเพี้ยนทีละเฟรม — ถ้าเพี้ยน gen แถวนั้นใหม่)
ส่ง **ตาราง inset** ที่คำนวณใหม่ให้ Toby (แทน `WORKER_FRAME_INSETS` เดิม ซึ่งผูกกับ v1 เท่านั้น) ในรูป JSON ต่อโซน × 12–17 แถว × 4 เฟรม

**เกณฑ์ตรวจรับ (Toby ใช้ตอนเสียบ):**
1. ชีตกว้าง 1280 สูง 3840 (P0) หรือ 5440 (P0+P1) · ทุกเฟรมช่อง 320×320 · พื้นโปร่ง ขอบไม่มีเมเจนต้า
2. แถว 0–2 เหมือน v1 ทุกพิกเซล (ตรวจ sha ของช่อง)
3. ทุกเฟรมอยู่ในสเกลเดียว (ส่วนสูงตัวยืน ±2%) และฝ่าเท้าตรงเส้นฐานเดียวกัน (±2 px) กึ่งกลางเท้า x ±6 px
4. **แถว 3, 4, 5, 10, 11 มีขาก้าวจริง** (ขาสองข้างต่างตำแหน่งในเฟรมที่ 1 กับ 3) ไม่เป็นท่านิ่งเลื่อนตำแหน่ง
5. ท่าทำงาน 6, 7, 8, 9 ต่างกันชัดเมื่อดูแยกเป็นภาพนิ่ง · ไม่มีเศษเครื่องมือโผล่ช่องข้าง
6. หน้า หมวก/หมวกนิรภัย ชุด สี ตรง v1 ของโซนนั้น
7. ในเกม: คนงานนำวิญญาณก้าวขาจริง · เดินขึ้น/ลงเห็นหน้า/หลัง · ท่าตามชนิดงานตรง (ไม้งิ้ว ≠ เศษดาบ ≠ ซ่อม ≠ คุมงาน) · พลิกซ้ายได้ถูก
8. ตรวจ GIF กับคุณเป้ก่อนเสียบ

---

## 5. ชิ้นที่ 4 — Cutscene หัวหน้าประเมินคำตัดสิน (ชม / ตำหนิ)

**ที่เห็นใน `5.png`:** ตอนนี้หัวหน้า (พญายม โซน 1) แสดงแค่สไปรต์นั่งบัลลังก์บนแท่นกับกล่องข้อความ ("นี่แหละที่เรียกว่าตรงกรรม — ท่านคืนบารมีให้ส่วนหนึ่ง…") และดาวคะแนนหล่นไปมุมล่างขวา · ไม่มีภาพคัตซีนอารมณ์ชมหรือตำหนิ (มีแต่ภาพ "ลงโทษ" ที่ใช้ตอนใช้อำนาจ)

**ตัวละครเดิม (ห้ามประดิษฐ์ใหม่):**
- โซน 1 หัวหน้า = พญายม: `img/hero-boss.png` (นั่งบัลลังก์) · `img/hero-boss-profile.png` (ใบหน้า) · `img/hero-boss-cutscene.jpeg` (คัตซีนลงโทษ 1375×768)
- โซน 2: `img/head-asia-punish-cutscene-v1.png` ผู้พิพากษาหนวดดำ หมวกขุนนางดำทรงสูงมีแผ่นทอง เสื้อคลุมแดงขลิบทอง ถือแผ่นทอง
- โซน 3: `img/head-west-punish-cutscene-v1.png` หน้าแดงหนวดขาวยาว หมวกเหล็กเขาโค้ง ขนสัตว์ ถือขวาน มีอีกาเกาะไหล่
- โซน 4: `img/head-cyberhell-punish-cutscene-v1.png` หน้าแดง ผมหนวดขาว เขาแดงโค้ง มงกุฎเงิน-ฟ้า ถือแท็บเล็ตเรืองแสง
- (ภาพลงโทษเหล่านี้คือ "ด่านที่ 3" ที่มีอยู่แล้ว: ภาพใหม่คือก่อนลงโทษ = ตำหนิ และด้านดี = ชม)

**ขนาดและสไตล์:** 16:9 · **1672×941 PNG** (เท่าชุด `head-*-punish-cutscene-v1.png` ซึ่งใหม่กว่า; `hero-boss-cutscene.jpeg` 1375×768 เป็นชุดเก่า — ถ้า Toby อยากได้ 1375×768 ย่อได้ไม่เสียอัตราส่วน) · ไม่โปร่งใส (เต็มเฟรม) · ภาพกึ่งตัว มองตรงเข้ากล้อง (ผู้เล่น = ยมน้อยยืนตรงหน้า) · เส้นขอบพิกเซลเข้ม ลายเปลวไฟ/ผ้าลายทองของเกม

**แยกจากภาพลงโทษ:** ภาพลงโทษใช้วังวนเวทมนตร์สีแดงเต็มจอ ท่ากางมือร่าย **ภาพตำหนิห้ามมีวังวน** เป็นแค่การตวาด/ชี้นิ้ว · ภาพชมต้องโทนอุ่นสว่าง ต่างจากโทนแดงดำของลงโทษชัดเจน

### 5.1 โซน 1 (P0): `img/head-th-praise-cutscene-v1.png` และ `img/head-th-scold-cutscene-v1.png`

**อ้างอิงแนบ:** `img/hero-boss-profile.png` (หน้า + มงกุฎ), `img/hero-boss.png` (ชุด + คทา), `img/hero-boss-cutscene.jpeg` (ระดับสีและเส้น), `img/head-asia-punish-cutscene-v1.png` (องค์ประกอบกึ่งตัว 16:9 ที่ต้องไปให้ถึง), `img/ui/icon-coin.png` (เหรียญรางวัลของเกม)

**ชม (รางวัล):**
```
A 16:9 pixel-art game cutscene, 1672x941, same modern detailed pixel-art style, crisp dark pixel
outlines, soft dithered shading and ornate Thai gilded pattern work as the attached references.
The SAME character as the reference, exactly: the stern ruler of the underworld court (Phaya Yom):
dark maroon-brown skin, pointed ears, glowing amber eyes, a tall multi-tiered gold Thai crown with
a central spire, ornate gold chest armor and shoulder plates with flame-scroll (kranok) patterns,
a gold sceptre with an ornate finial in his left hand. Do NOT redesign him.
Shot: waist-up, three-quarter view, looking straight at the viewer, seated on his black throne
with a dark red backrest.
Mood: PLEASED and approving. His brow is relaxed, the eyes soft and warm with a faint satisfied
smile at one corner of the mouth, a slow approving nod. His right hand is extended toward the
viewer, palm up, offering a small stack of gold coins (the coin has a laurel wreath and a letter
"A"-like emblem; draw them as plain round gold coins with a laurel wreath, no readable text) with
a few small pixel gold sparkles rising from the coins. The sceptre rests upright on his other
side.
Setting: the palace judgment hall at warm night: black stone pillars with gold inlay, red hanging
banners with gold scroll patterns, tall brass braziers with orange flames, a warm golden glow
washing across his face from the coins. Palette: warm gold, amber and deep maroon with dark
brown shadows; brighter and warmer than his punishment cutscene.
Safe content: no Buddha images, no halo, no religious symbols, no text, no letters, no logos,
no watermark. No gore.
```

**ตำหนิ (ก่อนลงโทษ):**
```
A 16:9 pixel-art game cutscene, 1672x941, same modern detailed pixel-art style, crisp dark pixel
outlines, soft dithered shading and ornate Thai gilded pattern work as the attached references.
The SAME character as the reference, exactly: the stern ruler of the underworld court (Phaya Yom):
dark maroon-brown skin, pointed ears, glowing amber eyes, a tall multi-tiered gold Thai crown with
a central spire, ornate gold chest armor and shoulder plates with flame-scroll (kranok) patterns,
a gold sceptre with an ornate finial. Do NOT redesign him.
Shot: waist-up, low three-quarter camera looking slightly up at him, he leans forward out of his
black throne toward the viewer.
Mood: ANGRY, scolding, severe but controlled. Deeply furrowed heavy brows, the amber eyes
glaring and brighter, the mouth open mid-shout showing his teeth and short fangs, the jaw tight.
His right hand points a stiff index finger straight at the viewer in accusation, his left fist
grips the sceptre, held across his body. Subtle red heat shimmer lines radiate from his shoulders.
NO magic vortex, NO swirling spell circle, NO punishment effect, NO attack; this is the moment
BEFORE the punishment.
Setting: the same palace judgment hall at night but darker and colder: black stone pillars with
gold inlay, torn red banners, braziers with hard orange flames casting strong red rim light
from below and behind him, deep black shadows on the face. Palette: crimson, black, ember
orange and tarnished gold.
Safe content: no Buddha images, no halo, no religious symbols, no text, no letters, no logos, no
watermark. No gore, no blood.
```

**Negative ทั้งสองภาพ:** `different face, different crown, green skin, extra arms, wings, halo, Buddha, religious symbol, cross, swastika, text, letters, watermark, logo, magic vortex (scold image only), gore, blood, photorealistic, 3D render, smooth gradients, blur, cropped crown, multiple characters, child, soft cartoon style`

### 5.2 โซน 2–4 (P1): 6 ภาพ — `img/head-{asia,west,cyberhell}-{praise,scold}-cutscene-v1.png`

ใช้ prompt โซน 1 ทั้งสองแบบ แต่แทน 3 ย่อหน้าแรก (ตัวละคร/ฉาก) ด้วยบล็อกด้านล่าง และแนบภาพ `head-<zone>-punish-cutscene-v1.png` ของโซนนั้นเป็นตัวละครอ้างอิง (ใช้ "เฉพาะตัวละคร/ชุด/ของถือ ห้ามลอกวังวนเวทมนตร์") · อารมณ์/ท่าชม-ตำหนิ ใช้ตามข้อความเดิม (ชี้นิ้ว/ยื่นเหรียญ ปรับตามของถือ)

- **asia:** `the SAME character as the reference: the bearded red-faced court judge with thick black beard and heavy brows, a tall black official hat with a gold plaque and gold dangling ornaments, a red robe with gold-patterned trim, holding a flat gold tablet. Setting: red-lantern palace hall, stone guardian lion statues, red cloud-pattern banners. Palette: crimson, black, gold.`
- **west:** `the SAME character as the reference: the red-faced old judge with a long white beard, a riveted steel helm with two curved golden horns, white fur mantle and silver scale armor, holding a wooden-handled axe, a black raven on his shoulder. Setting: frozen gothic hall, blue flames on stone braziers, frosty pillars. REPLACE the cross emblems on the banners and shoulder plates with plain round-shield or diamond motifs. Palette: ice blue, steel, white, with red accents.`
- **cyberhell:** `the SAME character as the reference: the red-skinned old judge with swept white hair and a short white beard, two curled red horns, a silver-and-cyan circlet crown, black robes with cyan circuit lines, holding a glowing cyan holographic tablet. Setting: neon cyber-throne hall with purple crystals and cyan light strips. Palette: violet, cyan, black, silver.`

**เกณฑ์ตรวจรับ (Toby/Chris):**
1. ทุกภาพ 1672×941 PNG · ใบหน้า มงกุฎ ชุด ตรงตัวละครเดิมของโซนนั้น (เทียบกับ profile/punish) — ไม่ใช่ตัวละครใหม่
2. **ชม** อ่านออกในทันทีว่าพอใจ + มีของรางวัลในมือ · โทนอุ่นสว่างกว่าภาพลงโทษชัด
3. **ตำหนิ** อ่านออกว่าโกรธ/ตวาด/ชี้นิ้ว · **ไม่มีวังวนเวทมนตร์** (ต่างจากภาพลงโทษ) · ไม่มีเลือด
4. ไม่มีตัวอักษร ตัวเลข ลายน้ำ ไม่มีสัญลักษณ์ศาสนา (โซน 3: ไม่มีกางเขนบนผ้าธง/เกราะ)
5. หน้าและมงกุฎไม่โดนขอบภาพตัด · พื้นที่ล่างภาพว่างพอวางกล่องข้อความ/ดาวคะแนน (ส่วนสำคัญอยู่เหนือ 70% ของความสูงภาพ)
6. Chris (chris-culture) ตรวจพญายมไม่เข้าข่ายล้อเลียนศาสนา ตามกฎเดิมของโครงการ

---

## 6. ชิ้นที่ 5 — วิญญาณตกใจ/หวาดกลัวจนสารภาพ (P2: หน้าสอบสวน)

**ที่เห็นใน `judge3.png`:** วิญญาณ (ภาพนี้ = เจ้าของกิจการ `spirit-business`) ยืนตรงกลางจอด้วยท่าเดียวตลอด ตอนจี้ถูกต้องไม่มีอะไรเปลี่ยน — ต้องการให้กล้องซูมเข้าวิญญาณแล้ววิญญาณทำท่าตกใจจนสารภาพ

**ตรวจจำนวนแบบวิญญาณ (จากโค้ด `src/regional-spirits.js` + manifest):**
- `SPIRIT_ARCHETYPES` = 10 แบบ: worker, executive, officer, cleric, woman, clerk, boy, girl, business, elder-woman
- ต่อโซน 4 โซน → **40 ไฟล์** `…/spirit-<type>-<zone>-v2.png` + `spirit-recruit-th-v3` + `spirit-graduate-west-v3` = **42 ภาพ** · มี key เก่า `soul-*`/`spirit1-10` ชี้ไป 10 แบบเดียวกันนี้
- สไปรต์ใหญ่ ≈ 1199×1311 ตัวเต็ม ตาวิญญาณเป็นสีขาวเรียบ (ไม่มีลูกตา) ใบหน้าเล็กเมื่อเทียบหน้าจอ
- แปลว่า ท่า "ตกใจ" ต่อภาพจะต้องวาดใหม่ 42 ครั้งหรืออย่างน้อย 10 ครั้งต่อโซน และแต่ละครั้งต้องรักษาหน้า/ชุดให้เหมือนเดิม (ความเสี่ยงเพี้ยนสูง ค่าใช้จ่ายสูง)

**ตัวเลือก**

| ทาง | วาดอะไร | จำนวนภาพ | ผล | ข้อเสีย |
|---|---|---|---|---|
| A วาดท่าตกใจเต็มตัวทุกแบบ | สไปรต์ใหม่ต่อแบบ | 42 | หน้าเปลี่ยนจริง | แพง เพี้ยนหน้า ลืมบางแบบแล้วเกมไม่สม่ำเสมอ |
| B overlay + เคลื่อนไหวจากโค้ด (**เลือก**) | ชุดเอฟเฟกต์ร่วม 4 ไฟล์ ใช้กับวิญญาณทุกตัว + โค้ดสั่นตัว/เอียงถอยหลัง/ซีดลง | **4 ไฟล์** | ใช้ได้ครบ 42 แบบทันที อ่านออกว่าตกใจ | ใบหน้าไม่เปลี่ยน ต้องพึ่งเอฟเฟกต์ |
| C เฟรมตกใจเฉพาะโซน 1 | 11 ภาพ + overlay | 11 + 4 | โซนแรกที่ผู้เล่นเจอเยอะสุดดูดีขึ้น | โซนอื่นไม่เท่ากัน |

**เลือก B** เพราะ (1) ต้นทุนต่ำสุด รับประกันเหมือนกันทุกแบบ (2) ตาวิญญาณสีขาวเรียบอยู่แล้ว จึงไม่มี "ตาเบิกโพลง" ให้เปลี่ยน อารมณ์อ่านจากเอฟเฟกต์ + ท่าทางตัว ซึ่ง overlay และโค้ดทำได้ครบ (3) ไม่เสี่ยงหน้าตัวละครเพี้ยนข้ามเฟรมแบบ imagegen (4) ถ้าคุณเป้อยากได้หน้าเปลี่ยน ต่อ C ภายหลังได้โดยไม่ทิ้งงานที่ทำ

**สิ่งที่ Toby ทำในโค้ด (ไม่ใช่งานวาด):** ซูมกล้องเข้าวิญญาณ · สั่นตัวซ้าย-ขวา 2–4 px ที่ ~20 Hz ประมาณ 600 ms · กระแทกถอยหลัง (สเกล 1→1.04 แล้วเอียง −4° เลื่อนลง 6 px) · ปรับให้ซีดลงเล็กน้อย (ลดความอิ่มสี) · วางเอฟเฟกต์ 4 ชิ้นด้านล่างตามจุดยึดบนหัว · แล้วค้างท่าก้มศีรษะตอนสารภาพ (เอียง −6° + ลงอีก 10 px)

**ไฟล์ทั้งหมด (ALPHA พื้นโปร่ง ตามกติกา `img/fx/README.md`, WebP q≈90):**

| ไฟล์ | ขนาด | เนื้อหา |
|---|---|---|
| `img/fx/fx-soul-sweat-drops.webp` | 512×128 (atlas 4 ช่อง ช่องละ 128×128 ชิดกัน) | หยดเหงื่อเย็นสีขาว-ฟ้าอ่อน ขอบน้ำเงินเข้ม: ช่อง 1 หยดเล็ก 2 หยด · 2 หยดกลาง 1 หยด · 3 หยดใหญ่ใกล้กระเด็น · 4 หยดกำลังหล่น (มีเส้นลาก) |
| `img/fx/fx-soul-gloom-lines.webp` | 512×256 | เส้นตั้งแบบมังงะ "ขนลุก/สยอง" 5–6 เส้นหนาเว้นระยะไม่เท่ากัน สีน้ำเงินม่วงเข้ม มีแรเงาจางท้ายเส้น วางเหนือหน้าผาก |
| `img/fx/fx-soul-shock-burst.webp` | 512×512 | เส้นรัศมีแหลมสั้น 12–16 เส้นยาวไม่เท่ากัน สีขาวอมฟ้าน้ำแข็ง **ช่องกลางโล่งกว้าง 45%** เห็นวิญญาณผ่านได้ · วางหลังวิญญาณ |
| `img/fx/fx-soul-tremble-marks.webp` | 512×128 (2 ช่อง ช่องละ 256×128) | ช่อง 1 เส้นโค้งสั่นขวา `))` ซ้อน 3 ชั้น · ช่อง 2 เส้นโค้งสั่นซ้าย `((` (วางข้างหัว/ไหล่) |

**ทุกไฟล์:** เส้นหนา ≥ 6 px ในช่อง (ตัวใหญ่เห็นชัดเมื่อย่อเหลือ ~ 25%) · ขอบพิกเซลคมตามสไตล์เกม ไม่ฟุ้ง ไม่ glow · ไม่มีตัวอักษร/เครื่องหมาย ❗/? · ไม่มีใบหน้า · สีเย็นอ่านออกบนพื้นแท่นหินน้ำตาลทองของฉากสอบสวน (ดู `judge3.png`) · ห้ามมีขอบขาว/ดำค้าง (halo) · ไม่ premultiply ซ้ำ

### Prompt (EN) — สร้างทีละไฟล์ (เปลี่ยนเฉพาะบล็อก `ITEM`)

```
Transparent-background pixel-art game effect sprite in the same crisp modern pixel style as the
attached reference (ornate dark-fantasy Thai-hell game, hard pixel edges, a dark outline, soft
dithered shading, NO glow, NO blur, NO anti-aliased soft edges). Canvas: [SIZE] px, flat
transparent background (if transparency is unavailable, use a perfectly flat #FF00FF magenta
background with no gradient), the effect centered in its cell(s), bold shapes, minimum stroke width
6 px, no text, no letters, no symbols, no faces, no characters.
ITEM: [ITEM]
Palette: cold ghostly pale blue-white, ice white, deep indigo-navy outlines. It must read clearly
over a warm brown-gold stone floor and over a pale grey-blue ghost body.
```
- `fx-soul-sweat-drops`: `an atlas of 4 equal 128x128 cells in a row, no gaps. Cell 1: two small cold-sweat drops. Cell 2: one medium teardrop-shaped sweat drop with a bright highlight. Cell 3: three big drops splashing outward. Cell 4: one drop falling with short vertical speed streaks. Each drop pale blue-white with a deep indigo outline and a tiny white highlight pixel cluster.`
- `fx-soul-gloom-lines`: `five or six thick vertical hand-drawn manga-style gloom lines of uneven length and spacing, wavy tips, dark indigo-violet with a darker fading shadow at the bottom of each line, arranged like a curtain of dread hanging from the top edge of the canvas.`
- `fx-soul-shock-burst`: `a radial burst of 12 to 16 short sharp spike lines of uneven length arranged around a circle, ice-white with pale blue edges, with the center 45 percent of the canvas completely empty and transparent. Like an anime "shock" burst behind a character's head.`
- `fx-soul-tremble-marks`: `two cells of 256x128, no gap. Left cell: three nested curved vibration arcs like "))" on the right side, pale ice-blue with indigo outline. Right cell: the mirror image "((" arcs.`

**Negative / ห้าม:** `face, eyes, mouth, character, body, text, exclamation mark, question mark, letters, symbols, cross, glow, aura, blur, gradient halo, soft shadow, photorealistic, 3D render, white outline halo, background scenery, floor`

**เกณฑ์ตรวจรับ (Toby):**
1. 4 ไฟล์ขนาดตามตาราง · WebP มี alpha จริง · ขอบไม่มีเส้นขาว/ดำค้าง (วางบนพื้นเข้มและสว่างแล้วไม่มีรอยล้อม)
2. atlas ช่องเท่ากัน ชิดกัน ไม่เว้นระยะ
3. ในหน้าสอบสวนจริง: เห็นเหงื่อ เส้นสยอง ตกใจ ชัดบนวิญญาณทั้ง 10 แบบ (ลองอย่างน้อย business, boy, elder-woman, officer) ทั้งโซน 1 และ 3
4. ไม่บังหน้า/ชุดมากกว่า ~15% ของสไปรต์ · ช่องกลางของ shock-burst ไม่ทึบ
5. เปิด `prefers-reduced-motion` แล้วโค้ดลดการสั่น (เป็นเรื่องโค้ดของ Toby)

---

## 7. ข้อที่ต้องให้คุณเป้ตัดสิน

1. **ชิ้นที่ 3 ขอบเขตงานวาด:** 12 แถว × 4 เฟรม = 36 เฟรมใหม่ต่อโซน (P0 ทำโซน 1 ก่อนแล้วให้ดู GIF) → อีก 3 โซนรวม ≈ 108 เฟรม · ตัดสิน: ทำ 4 โซนทั้งหมด หรือทำโซน 1 ให้ดีก่อนแล้วค่อยขยาย (Mind แนะนำอย่างหลัง ลดความเสี่ยงหน้าเพี้ยน)
2. **ชิ้นที่ 4 ขอบเขตโซน:** ภาพชม/ตำหนิทำเฉพาะพญายมโซน 1 (2 ภาพ) ก่อน หรือทั้ง 4 โซน (8 ภาพ) · Mind แนะนำโซน 1 ก่อน เพราะงานในเกม P3 เริ่มจากโซน 1
3. **ชิ้นที่ 5 ทางเลือก:** เห็นด้วยกับทาง B (overlay 4 ไฟล์ + โค้ด) หรืออยากได้ทาง C (หน้าตกใจจริงเฉพาะวิญญาณโซน 1 อีก 11 ภาพ)
4. **โซน 3 (ภาพหัวหน้า):** ผ้าธงและเกราะเดิมมีกางเขน — ภาพใหม่ของ Mind สั่งให้เปลี่ยนเป็นเครื่องหมายกลม/ข้าวหลามตัด ถ้าไม่อยากให้ภาพใหม่ต่างจากชุดเดิมให้บอก (Mind แนะนำให้เปลี่ยน ตามหลักของโครงการ — ให้ Chris ตรวจ)
5. **ชิ้นที่ 3 อัตราเฟรม:** ใช้โค้ดเดิม 160 ms/เฟรมเท่ากันทุกท่า เหมาะกับทุกแถว — ถ้าต้องการเวลาต่อเฟรมต่างกัน ต้องให้ Toby เพิ่ม metadata ต่อแถว (ไม่จำเป็นสำหรับ P0)

ไม่มีข้อที่ **ขาด asset จากใคร** — ใช้ asset จริงทั้งหมด ยกเว้น (ก) ภาพตัวอย่างท่าเรือที่ "ถูกต้อง" ไม่มี ใช้สะพานหลักเป็นต้นแบบ (ข) ภาพท่าตกใจของวิญญาณไม่มี จึงเลือกทาง B

---

## 8. Pre-flight ที่ Codex ต้องรันก่อนวาด (วัดซ้ำค่าที่ Mind ทำเครื่องหมาย ≈)

```bash
cd /Users/agapae/agapae-work/AVEGEE   # อ่านอย่างเดียวจนกว่าจะเขียนไฟล์ใหม่ลงโฟลเดอร์ปลายทาง
python3 - <<'PY'
from PIL import Image
import glob
for p in ['img/weapons/weapon-cutscene-cane.jpeg','img/map-zone1/v5/r3-c3.webp',
          'img/head-asia-punish-cutscene-v1.png','img/hero-boss-cutscene.jpeg',
          'img/Thai/spirit-business-th-v2.png']+glob.glob('img/workers/worker-*-sheet-v1.webp'):
    im=Image.open(p); print(p, im.size, im.mode)
im=Image.open('img/workers/worker-th-sheet-v1.webp').convert('RGBA')
for r in range(4):
    for c in range(4):
        b=im.crop((c*320,r*320,c*320+320,r*320+320)).getchannel('A').point(lambda a:255 if a>16 else 0).getbbox()
        print('cell',r,c,b)        # วัดความสูงตัวละคร/เส้นฐานเท้าจริงของ v1
PY
```
ถ้าตัวเลขต่างจากที่สเปกนี้ระบุ ให้ใช้ค่าที่วัดได้และจดเหตุผลใน `output/art-queue-2026-10-22/README.md`

---

## 9. ข้อความสั้นสำหรับคุณเป้ copy ส่ง Codex app

```
งานวาด AVEGEE ชุด 22 ต.ค. — อ่านสเปกเต็มที่
/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-22-avegee-art-queue-codex.md
(repo AVEGEE: /Users/agapae/agapae-work/AVEGEE · ภาพต้นเรื่อง: /Users/agapae/agapae-work/feedback/2026-10-22/)

ทำตามลำดับ ใช้ image_gen ในตัว ไม่ใช้ CLI/API สำรอง · สร้างไฟล์ใหม่ตาม path ในสเปกเท่านั้น ห้ามเขียนทับไฟล์เดิม ห้ามแก้โค้ด
1. img/weapons/weapon-cutscene-cane-v2.jpeg  1375x768 — เคานต์แวมไพร์ยื่นอาวุธ "ทั้งฝัก" สองมือแนวนอน ห้ามชักดาบ (edit จาก weapon-cutscene-cane.jpeg เปลี่ยนเฉพาะแขน/อาวุธ/มือยมน้อย)
2. img/map-zone1/repairs/r3-c3-pier-v1.webp  1024x1024 lossless — วาดท่าเรือใหม่ให้สมมาตร ราวตั้งฉาก เท่ากับสะพานหลัก ให้ตรงแถบเดินได้ x 752-886 y 128-251 ของ chunk r3-c3 · นอกท่าเรือต้องเท่า r3-c3.webp ทุกพิกเซล + evidence แบบ output/n1b
3. img/workers/worker-th-sheet-v2.webp  1280x3840 (ช่อง 320x320 แถว 0-11) — แถว 0-2 คัดลอกจาก v1, แถว 3-11 วาดใหม่ (นำวิญญาณเดินขาก้าวจริง, เดินลง/ขึ้น, ตัดต้นหนาม, เก็บเศษดาบ, ซ่อม, คุมงาน, แบกกิ่งหนาม, ถือตะกร้าเศษดาบ) + GIF พรีวิว + metadata + inset table · ส่งให้คุณเป้ดูก่อนทำอีก 3 โซน
4. img/head-th-praise-cutscene-v1.png และ img/head-th-scold-cutscene-v1.png  1672x941 — พญายม (ชม+ยื่นเหรียญ / ตำหนิ+ชี้นิ้ว ไม่มีวังวนเวท)
5. img/fx/fx-soul-{sweat-drops,gloom-lines,shock-burst,tremble-marks}.webp  (ALPHA 512x128 / 512x256 / 512x512 / 512x128)

ก่อนวาดรันสคริปต์วัดขนาดใน §8 · ค่าที่ติด "≈" ให้วัดซ้ำ · วาดเสร็จทุกชิ้นสรุปไฟล์+ขนาดจริงกลับมา ห้ามบอกว่าผ่านเอง (Toby ตรวจตอนเสียบ, Chris ตรวจวัฒนธรรม)
```
