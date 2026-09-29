# AVEGEE — prompt gen ใหม่ `st-dab` (ป่าดาบอสิปัตตะ)

**สั่งงานโดย:** Claudy · **ทำโดย:** Mind (visual)
**อ้างอิงปัญหา:** `Output/Dale/2026-09-29-avegee-batch18e-review.md` — ภาพเดิมครอปแล้วเหลือ 512×107
(สูง:กว้าง ≈ 1:4.8) แบนเกินไป โดนหลังคาศาลาน้ำชา (`st-tea`) บังบางส่วนเพราะเตี้ยกว่าที่ผังต้องการ
**ห้ามแก้ไฟล์ใด ๆ ใน repo AVEGEE** — เอกสารนี้ให้คุณเป้เอา prompt ไป gen เองแล้ววางไฟล์ตามขั้นตอนท้ายเอกสาร

---

## Step 0 — สิ่งที่ดูมาก่อนเขียน prompt (source inventory)

อ่าน/ดูภาพจริงแล้ว ไม่ได้เดาสไตล์:

| ไฟล์ | สิ่งที่เห็น |
|---|---|
| `AVEGEE/img/raw/st-dab.png` (ของเดิม) | แถวดาบ/หอกโค้ง 8 เล่มปักเรียงแนวนอนเส้นเดียว หน้ากำแพงหินพังเตี้ย ๆ — **นี่คือต้นตอปัญหา**: เป็นแถวเดียวแบนราบ ไม่มีมิติสูง |
| `AVEGEE/img/raw/st-lokan.png` | วิหารน้ำแข็งทรงจัตุรัสเกือบเป๊ะ สูงชัดเจน มีรายละเอียดหลายชั้น (โซ่น้ำแข็ง เสา หลังคาซ้อนชั้น) — สัดส่วนสูง:กว้างใกล้ 0.8 |
| `AVEGEE/img/raw/st-sala.png` | ศาลาไทยหลังคาซ้อนชั้น มีบันไดนาคยื่นออกมาด้านหน้า แต่ตัวอาคารหลักยังสูงเด่น สัดส่วนใกล้ 0.85 |
| `AVEGEE/img/raw/st-krata.png` | สามกระทะทองแดง แนวนอนแต่ตัวกระทะกลางสูงเด่นเป็นจุดโฟกัส ไม่แบนราบเหมือน dab เดิม |
| `AVEGEE/img/scene-v2.png` | ฉากพื้นหลังโทนม่วง-แดง-ส้มลาวา หินออบซิเดียนแตกลาย พื้นที่ตั้งสถานีอยู่รอบแท่นพิพากษากลางจอ |

**สรุปสิ่งที่ต้องแก้จากของเดิม:** ของเดิมผิดที่ "เรียงแถวเดียวแนวนอน" ไม่ใช่ผิดที่เนื้อหา (ดาบปักพื้นถูกคอนเซปต์
อสิปัตตวันอยู่แล้ว) → ทางแก้คือเปลี่ยนผังการจัดวางเป็น **กลุ่ม/ดงที่มีความลึก 2-3 ชั้น** ให้ใบดาบชั้นหลังสูงกว่าชั้นหน้า
เกิดทรงเกือบจัตุรัสโดยไม่ขยายฐานกว้างขึ้น — ไม่ใช่ไปเปลี่ยนเป็นคอนเซปต์อื่น

---

## 1) Prompt หลัก (EN) — คัดลอกไปวางทั้งก้อน

```
top-down 3/4 isometric-ish view game asset, high-detail modern pixel art in the style of a
beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with warm rim light, clean crisp pixel edges, single structure centered on a fully
transparent background, square canvas, viewed from the same angle as a top-down game map,
no ground plate under it beyond its own footprint,
no text, no letters, no numbers, no watermark, no characters, no people, no creatures
COLOR THEME: Thai buddhist underworld — obsidian black-purple stone, blood-red lacquer,
molten orange lava glow, antique temple gold

SUBJECT: the blade forest of Asipattana (ป่าดาบอสิปัตตะ) as a dense standing thicket, built
for HEIGHT rather than width. Arrange roughly twelve to sixteen huge curved Thai-style swords
and spears of VARYING HEIGHTS driven upright into cracked dark obsidian soil, grouped in three
overlapping depth layers instead of one flat row:
- FRONT layer: four to five shorter blades, roughly a third of the final height, closest to
  the viewer, casting the tallest ones behind them into partial view
- MIDDLE layer: five to six medium blades, roughly two-thirds height, staggered left-right so
  blade tips interleave rather than lining up
- BACK layer: three to four of the tallest blades reaching near the top of the frame, angled
  slightly outward like a fan, with ornate gold hilt guards and dark wrapped grips catching
  warm rim light
Blade material: dull steel with a faint dark red tarnish near the tips (old dried stains, not
fresh blood, not dripping), gold filigree on hilts in Thai weapon style, some hilts shaped like
naga or yaksha heads matching the original reference. A low broken stone fence with carved Thai
relief panels sits ONLY behind the back layer, partially hidden by the tallest blades — it must
not add extra width to the silhouette. Small cracks in the ground glow faint orange between the
blade bases. A thin drift of ash in the air, no wind-blown leaves.

COMPOSITION AND PROPORTION (critical — this is what the last version got wrong):
The whole structure must read TALL, not wide. Target silhouette height-to-width ratio between
0.85 and 1.05 — close to a square, matching how st-lokan.png and st-sala.png read in this same
game. Do NOT spread the blades into a single horizontal line. The base footprint (where the
blades meet the ground) should be NO WIDER than the reference image st-dab.png — all the added
height must come from the back layer of blades rising up, not from the group spreading sideways.
The base of the whole cluster sits flush with the bottom edge of the canvas, matching every
other station sprite in this set.

Avoid: text, letters, numbers, watermark, UI, people, creatures, animation frames, a single flat
row of blades all the same height, a wide horizontal silhouette, blades that look like tree
trunks or thorns (this is a field of metal swords, not the thorn-tree grove asset elsewhere in
the game), fresh dripping blood or blood spray, gore, long cast drop shadows, a checkerboard or
solid-color background, cropped blade tips cut off at the top edge of the canvas.
```

---

## 2) ตัวแปร (variant) — เลือก gen ได้ทั้งคู่แล้วเทียบ

### Variant A (ค่าเริ่มต้นในพรอมต์หลักด้านบน) — "ดงดาบ 3 ชั้นความลึก"
ดาบปักพื้นแยกเล่ม จัดเป็น 3 แถวซ้อนความลึก แถวหลังสูงสุด ใกล้เคียงของเดิมที่สุด (ยังเป็น "ดาบปักดิน")
แค่เปลี่ยนผังจากแถวเดียวเป็นสามชั้น — **แนะนำอันนี้ก่อน** เพราะเสี่ยงน้อยสุดที่จะได้ภาพหลุดคอนเซปต์

### Variant B — "ต้นไม้ใบดาบ" (ตรงตามคติอสิปัตตวันเป๊ะกว่า)
แทนที่ท่อนพรอมต์ `SUBJECT` ด้วยเวอร์ชันนี้ ถ้าอยากได้ภาพที่ตรงคติไตรภูมิมากขึ้น (อสิปัตตวัน = ป่าที่ *ใบไม้*
เป็นดาบ ไม่ใช่ดาบปักดินเฉย ๆ) และอยากได้ความสูงจากทรงต้นไม้ตามธรรมชาติ:

```
SUBJECT: the blade forest of Asipattana (ป่าดาบอสิปัตตะ) reimagined as two to three gnarled
black iron tree trunks, each about the height of the ice temple st-lokan, growing upward and
outward from cracked obsidian soil. Instead of leaves, each branch tip holds a curved Thai
sword blade catching the light — dozens of small and medium blades forming the "canopy",
overlapping like foliage, dull steel with faint dark red tarnish near the tips, a few gold-hilt
blades mixed in near the crown. The trunks are narrow enough that the overall footprint stays
no wider than the reference image st-dab.png, while the canopy of blades rises tall above,
making the whole silhouette read nearly square. A scattering of fallen blades stands upright
in the soil at the base like undergrowth. Small ground cracks glow faint orange at the roots.
```
เช็กพิเศษของ Variant B: ต้อง **ไม่** เหมือนต้นงิ้วหนาม (`st-ngiw`) — ย้ำในพรอมต์ทุกครั้งว่าปลายกิ่งคือ "ใบดาบโลหะ
เงาวับ" ไม่ใช่หนามดำทึบ ถ้า gen ออกมาดูเป็นหนามให้เติมประโยค `the tips must clearly read as flat metal
sword blades with a visible cutting edge, not thorns or spikes` แล้ว gen ใหม่

---

## 3) Negative / สิ่งที่ห้าม (ต่อท้ายทุกครั้งถ้าเครื่องมือมีช่อง negative แยก)

```
Avoid: text, letters, numbers, watermark, signature, UI elements, people, creatures, monsters,
animation frames, motion blur, a single flat horizontal row of blades all the same height,
a wide low silhouette, tree trunks or thorn spikes instead of sword blades, fresh dripping
blood, blood spray, gore, severed limbs, long cast drop shadow, solid color or checkerboard
background, blades cropped or cut off at the top edge of the frame, extra structures that
widen the base footprint beyond the original reference image.
```

---

## 4) เช็กลิสต์ตรวจภาพก่อนบันทึกทับไฟล์จริง

ตรวจทีละข้อ ถ้าข้อไหนไม่ผ่าน **อย่าเซฟทับ** — gen ใหม่หรือแก้ prompt ตามหมายเหตุ:

- [ ] **สัดส่วนใกล้จัตุรัส** — วัดกรอบเนื้อภาพจริง (ไม่นับพื้นที่ใสรอบขอบ) ได้ สูง:กว้าง ระหว่าง 0.8–1.1
      (เทียบง่าย ๆ: เอาไปวางข้าง ๆ `st-lokan.png` หรือ `st-sala.png` แล้วดูว่าสัดส่วนใกล้เคียงกันไหม)
- [ ] **ฐานชิดขอบล่างภาพ** — ไม่มีพื้นที่ใสเหลือใต้ฐานดาบ/โคนต้น เหมือนสถานีอื่นทุกหลัง
- [ ] **พื้นหลังโปร่งใสจริง** (alpha = 0) ไม่ใช่สีขาวหรือเช็กเกอร์บอร์ดที่โปรแกรมวาดค้างไว้ — ถ้าเครื่องมือให้แต่พื้นขาวล้วน
      ก็ใช้ได้ (ตัดง่ายด้วย `prep-art.py`) แต่ **ห้ามเป็นพื้นลายเช็กเกอร์**
- [ ] **ไม่มีตัวอักษรหลุดมาแม้แต่ตัวเดียว** ทั้งไทย/อังกฤษ/สัญลักษณ์คล้ายตัวอักษร
- [ ] **ไม่มีเงาตกยาว** (cast shadow) ทาบพื้นออกไปนอกฐานของตัวสถานี
- [ ] **อ่านออกว่าเป็นดาบ ไม่ใช่หนาม** — ถ้าเลือก gen Variant B ต้องดูออกชัดว่าเป็นใบดาบโลหะเงาวับ ไม่ใช่หนามดำแบบ `st-ngiw`
- [ ] **ไม่มีเลือดสาด/หยดสด** — คราบแดงเข้มจาง ๆ ใกล้ปลายดาบพอรับได้ (ของเดิมก็มี) แต่ต้องดูเป็นสนิม/คราบเก่า ไม่ใช่เลือดสด
- [ ] **โทนสีเข้าชุด** — ดำ-ม่วงออบซิเดียน / แดงเลือดหมู / ส้มลาวา / ทองโบราณ เหมือนสถานีอื่น ไม่ใช้โทนอื่นแปลกแยก
- [ ] **ฐานไม่กว้างกว่าของเดิม** — เทียบความกว้างของกลุ่มดาบทั้งหมดกับ `st-dab.png` เดิม ต้องไม่กว้างขึ้น (สูงขึ้นได้ กว้างขึ้นไม่ได้)
- [ ] **มุมมองเดียวกับสถานีอื่น** (top-down 3/4 isometric-ish) ไม่ใช่มองตรงหน้าแบบภาพเดิม
- [ ] ย่อภาพลงเทียบขนาดจริงในเกม (จัตุรัสสถานีประมาณ 96px ในโค้ด) แล้วยังอ่านออกว่าเป็น "ดงดาบ" ชัดเจน ไม่เบลอเป็นก้อนสีเดียว

---

## 5) ขั้นตอนวางไฟล์

1. สำรองของเดิมก่อน (ห้ามลบทิ้ง):
   ```
   cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
   cp img/raw/st-dab.png img/raw/st-dab-old.png
   ```
2. เซฟไฟล์ที่ gen ใหม่ (แนะนำ gen ที่ 1024×1024 อย่างน้อย) ทับที่:
   ```
   img/raw/st-dab.png
   ```
3. รันสคริปต์เตรียมภาพตามขั้นตอนปกติของโปรเจกต์:
   ```
   python3 scripts/prep-art.py
   ```
   (ตัดขอบใส จัดขนาด อัปเดต `img/manifest.json` → `stationSizes.st-dab` จะเปลี่ยนจาก `[512,107]` เป็นสัดส่วนใหม่เอง)
4. **ไม่ต้องแก้โค้ดใด ๆ** เกมจะอ่านไฟล์ใหม่ทันทีที่รีเฟรช — แต่ **ให้ Dale ตรวจอีกรอบ** หลังเปลี่ยนภาพ เพราะ
   ความสูงใหม่ของ `st-dab` อาจกระทบตำแหน่งซ้อนทับกับ `st-tea` (ศาลาน้ำชาที่อยู่ใกล้กันในผัง ตามที่ระบุใน
   `Output/Dale/2026-09-29-avegee-batch18e-review.md`) — ส่งต่อให้ Claudy สั่ง Dale ตรวจ hit-box/ลำดับการวาดอีกครั้ง
   ไม่ใช่ให้ Mind แก้เอง

---

## สรุปสั้นสำหรับคุณเป้

ปัญหาของเดิมคือ "แถวดาบเดียวแนวนอน" ทำให้แบน แก้ด้วยการจัดใหม่เป็น **ดงดาบ 3 ชั้นความลึก** (หรือถ้าอยาก
ตรงคติมากกว่าใช้ Variant B ต้นไม้ใบดาบ) ให้ชั้นหลังสูงพ้นแนวหลังคาศาลาน้ำชา โดย **ห้ามขยายฐานให้กว้างขึ้น**
เอา prompt หลักในข้อ 1 ไป gen ก่อน ถ้าไม่พอใจค่อยลอง Variant B ในข้อ 2 แล้วตรวจตามเช็กลิสต์ข้อ 4 ก่อนเซฟทับ
