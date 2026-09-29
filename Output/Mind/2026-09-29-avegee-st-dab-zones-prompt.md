# AVEGEE — prompt gen ป่าดาบ 3 โซน: `st-dab-asia` · `st-dab-west` · `st-dab-cyberhell`

**สั่งงานโดย:** Claudy · **ทำโดย:** Mind (visual) · **อ้างอิงงานก่อนหน้า:** `Output/Mind/2026-09-29-avegee-st-dab-prompt.md` (โซนไทย ผ่านแล้ว ขึ้นเกมแล้ว)
**ห้ามแก้ไฟล์ใด ๆ ใน repo AVEGEE** — เอกสารนี้ให้คุณเป้เอา prompt ไป gen เองแล้ววางไฟล์ตามขั้นตอนท้ายเอกสาร

---

## Step 0 — สิ่งที่ดูมาก่อนเขียน prompt (source inventory)

| ไฟล์ | สิ่งที่เห็นจริง |
|---|---|
| `AVEGEE/img/raw/st-dab.png` (ต้นแบบที่ผ่านแล้ว) | ดงดาบ/หอกไทยด้ามทอง ~12 เล่ม จัด 3 ชั้นความลึก ชั้นหลังสูงพ้นชั้นหน้า ฐานหินออบซิเดียนร้าวเรืองลาวา กำแพงหินสลักอยู่หลังสุดเท่านั้น เนื้อภาพ 922×1192 (สูง:กว้าง ≈ 1.29) — **นี่คือมาตรฐานที่ 3 โซนต้องเทียบ** |
| `AVEGEE/img/Asia/st-dab-asia.png` (ของเดิม) | ดาบเรียงแถวเดียวแนวนอนแน่นมาก ~40 เล่ม บนเนินหินกลม เตี้ยมาก (bbox จริงใน manifest สูงแค่ ~40% ของผืน 512) — เนื้อหาโอเค (เป็นดาบจริง) แต่แบนแบบเดียวกับปัญหาโซนไทยเดิม |
| `AVEGEE/img/West/st-dab-west.png` (ของเดิม) | อ่านออกเป็น "ปราการ/คูหินหิมะ" ที่มีเสี้ยนไม้-เหล็กแหลมโผล่พื้นในหลุมตรงกลาง ไม่อ่านว่าเป็น "ป่าดาบ" เลย เตี้ยแบนเหมือนกัน — **ต้องแก้ทั้งทรงและการอ่านออกว่าเป็นดาบ** |
| `AVEGEE/img/CyberHell/st-dab-cyberhell.png` (ของเดิม) | เป็นกลุ่มหอคอย/เสาเซิร์ฟเวอร์ปลายแหลมมีวงพลังงานม่วง มีบันไดนำสายตา — อ่านเป็น "หอคอยเทค" ไม่ใช่ดาบเลยสักเล่ม แม้จะสูงกว่าอีกสองโซน — **ต้องแก้เนื้อหาทั้งหมดให้เป็นใบดาบ ไม่ใช่แค่ปรับสัดส่วน** |
| `AVEGEE/img/raw/scene-asia-v3.png` | โทนเขียวเข้ม-หินเทา ใบเมเปิลแดงกระจาย โคมแดง ศาลเจ้าเอเชีย รูปสลักเทวรูปหิน กระดูกกระจาย ธารลาวาส้มยังอยู่ จุดที่สถานี `dab` ตั้ง (ซ้ายภาพ) เป็นพื้นดินร้าวสีเข้มมีใบไม้แดงตกอยู่ |
| `AVEGEE/img/raw/scene-west-v2.png` | โทนน้ำแข็ง-หิมะฟ้าอมขาวทั้งหมด กำแพงกระจกสีแบบโกธิกพัง เสาหินแตก ไม่มีธารลาวาสีส้มให้เห็นในภาพ (ช่องเดิมที่โซนไทย/เอเชียเป็นลาวา ถูกแทนด้วยธารน้ำแข็งสีฟ้าอมเขียวแทน) จุดที่สถานี `dab` ตั้ง (ซ้ายภาพ) เป็นลานน้ำแข็งร้าวลายรังผึ้ง |
| `AVEGEE/img/raw/scene-cyberhell-v2.png` | โทนม่วง-ดำ เส้นวงจรเรืองม่วง/ฟ้า ตู้เซิร์ฟเวอร์ สายไฟส้ม-ม่วงพันกำแพง ธารลาวาส้มยังอยู่เหมือนโซนไทย/เอเชีย จุดที่สถานี `dab` ตั้งเป็นพื้นดินร้าวมีตู้เซิร์ฟเวอร์ตั้งเรียงเป็นฉากหลัง |
| `AVEGEE/img/manifest.json` (`boxes`, `stationSizes`) | ยืนยันว่า `st-dab-asia/-west/-cyberhell` ทั้งสามไฟล์ปัจจุบันถูกจัดลงผืน 512×512 แล้ว bbox เนื้อภาพจริงของ asia/west สูงแค่ ~40% ของผืน (แบนตรงกับที่เห็น) ส่วน cyberhell สูง ~89% (ทรงสูงอยู่แล้วแต่เนื้อหาผิด) |
| `AVEGEE/scripts/prep-art.py` | ยืนยัน pipeline: ไฟล์โซนย่อย (`img/raw/Asia|West|CyberHell/<key>-<zone>.png`) จะถูก **ย่อให้พอดีแล้ววางชิดขอบล่างกึ่งกลางบนผืน 512×512 เสมอ** (ไม่ได้รับการยกเว้นแบบโซนไทยที่เก็บสัดส่วนจริงไว้) — เพราะงั้น**ไม่ต้อง gen เป็นผืนสี่เหลี่ยมยาวเหมือน `st-dab.png` ต้นฉบับ** ขอแค่ตัวดงดาบภายในภาพ (หลัง crop โปร่งใส) มีสัดส่วนสูง:กว้างใกล้จัตุรัส (0.85–1.05) พอ ที่เหลือสคริปต์จัดการเอง |

**สรุปสิ่งที่ต้องแก้ต่อโซน:**
- **asia**: ผังถูก (ดาบจริง) แต่ต้องจัดเป็น 3 ชั้นความลึกให้สูงขึ้นแบบเดียวกับโซนไทย ไม่ใช่แถวเดียว
- **west**: ต้องเปลี่ยนทั้งทรงและการอ่านออก จาก "ปราการมีเสี้ยนแหลม" เป็น "ดงดาบยุโรปปักดิน" 3 ชั้นความลึก
- **cyberhell**: ต้องเปลี่ยนเนื้อหาทั้งหมด จาก "หอคอยเซิร์ฟเวอร์" เป็น "ดงใบดาบเรืองแสงจากชิ้นส่วนเทค" 3 ชั้นความลึก

---

## 1) Prompt หลัก EN — ครบในตัว ก้อนละโซน คัดลอกวางได้ทันที

### 1A) `st-dab-asia`

```
top-down 3/4 isometric-ish view game asset, high-detail modern pixel art in the style of a
beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with warm rim light, clean crisp pixel edges, single structure centered on a fully
transparent background, square canvas, viewed from the same angle as a top-down game map,
no ground plate under it beyond its own footprint,
no text, no letters, no numbers, no watermark, no characters, no people, no creatures

COLOR THEME: the East and South Asian branch of the Buddhist underworld — deep jade green and
dark iron-grey stone, cinnabar-red lacquer, weathered antique bronze and faint old gold trim,
molten orange lava glow in ground cracks, a scattering of blood-red maple leaves.

SUBJECT: the blade forest of Asipattana, reimagined for the eastern branch of hell, as a dense
standing thicket built for HEIGHT rather than width. Arrange roughly twelve to sixteen huge
swords and polearms of VARYING HEIGHTS driven upright into cracked dark stone soil, grouped in
three overlapping depth layers instead of one flat row:
- FRONT layer: four to five shorter blades, roughly a third of the final height, closest to the
  viewer — mix in a straight double-edged Chinese jian with a red silk tassel at the pommel and a
  curved Korean hwando.
- MIDDLE layer: five to six medium blades, roughly two-thirds height, staggered left-right so
  blade tips interleave rather than lining up — mix in a curved Japanese katana and an Indian
  talwar with a curved disc cross-guard, faded cinnabar-red lacquer scabbard fragments still
  clinging to a couple of the blades.
- BACK layer: three to four of the tallest blades reaching near the top of the frame, angled
  slightly outward like a fan — long naginata and nagamaki with dark iron tsuba guards, a few
  hilts finished with a small stylised dragon-head or lion-head pommel in tarnished bronze,
  catching warm rim light.
Blade material: dull tempered steel with a faint dark red tarnish near the tips (old dried
stains, not fresh blood, not dripping), dark wrapped grips, bronze and faded-gold fittings — no
bright new gold, this metal is old and weathered. A low broken stone wall with a faint carved
relief pattern (echoing East Asian temple stonework, no readable text, no deity faces, no
religious symbols) sits ONLY behind the back layer, partially hidden by the tallest blades — it
must not add extra width to the silhouette. The ground is cracked dark grey-green stone, not
obsidian purple, with thin orange lava-glow cracks between the blade bases and a few scattered
blood-red maple leaves resting near the roots. A thin drift of ash in the air, no wind-blown
leaves in motion.

COMPOSITION AND PROPORTION (critical): the whole structure must read TALL, not wide. Target
silhouette height-to-width ratio between 0.85 and 1.05, close to a square — use
img/raw/st-dab.png (the Thai version of this same station, already approved) as the exact
proportion and depth-layering reference. Do NOT spread the blades into a single horizontal line.
The base footprint (where the blades meet the ground) should be no wider than it is tall. All
added height must come from the back layer of blades rising up, not from the group spreading
sideways. The base of the whole cluster sits flush with the bottom edge of the canvas.

Avoid: text, letters, numbers, watermark, signature, UI elements, people, creatures, monsters,
animation frames, a single flat row of blades all the same height, a wide low silhouette, deity
faces, buddha or bodhisattva figures, torii gates, swastikas, any religious symbol on the hilts
or wall relief, fresh dripping blood, blood spray, gore, long cast drop shadow, a checkerboard or
solid-color background, blades cropped or cut off at the top edge of the canvas, tree trunks or
thorn spikes instead of sword blades, server parts, ice, snow.
```

### 1B) `st-dab-west`

```
top-down 3/4 isometric-ish view game asset, high-detail modern pixel art in the style of a
beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with cold rim light, clean crisp pixel edges, single structure centered on a fully
transparent background, square canvas, viewed from the same angle as a top-down game map,
no ground plate under it beyond its own footprint,
no text, no letters, no numbers, no watermark, no characters, no people, no creatures

COLOR THEME: the European and Slavic branch of hell, frozen — charcoal-grey stone, pale ice
blue, bone white frost, weathered verdigris-copper green trim, cold iron and pewter fittings, a
faint cold cyan-white glow in ground cracks instead of lava. No warm gold anywhere in this zone.

SUBJECT: the blade forest of Asipattana, reimagined for the frozen western branch of hell, as a
dense standing thicket built for HEIGHT rather than width, rising out of a frozen battlefield.
Arrange roughly twelve to sixteen huge European swords and polearms of VARYING HEIGHTS driven
upright into cracked ice-crusted ground, grouped in three overlapping depth layers instead of
one flat row:
- FRONT layer: four to five shorter blades, roughly a third of the final height, closest to the
  viewer — a broken arming sword and a sabre, both rimed with a thin crust of frost.
- MIDDLE layer: five to six medium blades, roughly two-thirds height, staggered left-right so
  blade tips interleave rather than lining up — a longsword and a rapier, dark leather-wrapped
  grips with tarnished pewter cross-guards, small icicles hanging off a couple of the guards.
- BACK layer: three to four of the tallest blades reaching near the top of the frame, angled
  slightly outward like a fan — a huge claymore and a halberd-style poleaxe, heavy iron
  cross-guards, catching cold pale rim light.
Blade material: dull tempered steel dusted with frost and rime, dark leather-wrapped grips,
tarnished pewter and verdigris-copper fittings (no gold). A low broken wall of frost-crusted
gothic ruin stone, with weathered blind-arch tracery (no cross shapes, no religious symbols,
no stained glass) sits ONLY behind the back layer, partially hidden by the tallest blades — it
must not add extra width to the silhouette. The ground is cracked dark grey stone dusted with
snow and patches of clear ice, with thin pale cyan-white glowing frost cracks between the blade
bases instead of lava. A light drift of blown snow dust in the air, no falling snowflakes as
separate animated shapes.

COMPOSITION AND PROPORTION (critical): the whole structure must read TALL, not wide. Target
silhouette height-to-width ratio between 0.85 and 1.05, close to a square — use
img/raw/st-dab.png (the Thai version of this same station, already approved) as the exact
proportion and depth-layering reference. Do NOT spread the blades into a single horizontal line,
and do NOT build a walled pit or fortress shape — this is a standing thicket of upright blades,
not a bunker. The base footprint (where the blades meet the ground) should be no wider than it
is tall. All added height must come from the back layer of blades rising up, not from the group
spreading sideways. The base of the whole cluster sits flush with the bottom edge of the canvas.

Avoid: text, letters, numbers, watermark, signature, UI elements, people, creatures, monsters,
animation frames, a single flat row of blades all the same height, a wide low silhouette, a
walled pit or fortress with spikes in a hole, any cross shape or religious symbol on hilts or
wall tracery, fresh dripping blood, blood spray, gore, long cast drop shadow, a checkerboard or
solid-color background, blades cropped or cut off at the top edge of the canvas, gold trim,
tree trunks or wooden stakes instead of metal sword blades, lava, warm orange glow.
```

### 1C) `st-dab-cyberhell`

```
top-down 3/4 isometric-ish view game asset, high-detail modern pixel art in the style of a
beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with strong neon rim light, clean crisp pixel edges, single structure centered on a
fully transparent background, square canvas, viewed from the same angle as a top-down game map,
no ground plate under it beyond its own footprint,
no text, no letters, no numbers, no watermark, no characters, no people, no creatures

COLOR THEME: the digital-network branch of hell — deep violet-black gunmetal, glowing neon
magenta and cyan circuit lines, molten orange lava glow in ground cracks (same lava as the rest
of this zone), dark exposed server-rack metal.

SUBJECT: the blade forest of Asipattana, reimagined as a corrupted server graveyard, as a dense
standing thicket built for HEIGHT rather than width. Arrange roughly twelve to sixteen huge
blade-shaped objects of VARYING HEIGHTS driven upright into cracked dark ground, grouped in
three overlapping depth layers instead of one flat row. Every single object MUST clearly read as
a SWORD BLADE first — a flat tapering blade shape with a visible cutting edge and a hilt — even
though the material is technological, not a server tower, antenna, or spike:
- FRONT layer: four to five shorter blades, roughly a third of the final height, closest to the
  viewer — dark brushed-metal blades etched with faint glowing purple circuit-trace patterns
  along the flat of the blade, thin bright magenta light tracing the cutting edge like an
  energised coating (not a full glowing lightsaber blade — the blade is solid dark metal with a
  glowing edge line and glowing surface traces).
- MIDDLE layer: five to six medium blades, roughly two-thirds height, staggered left-right so
  blade tips interleave rather than lining up — hilts wrapped in salvaged ribbon cable and thin
  fibre-optic cord that glows faint cyan, small cracked circuit-board fragments forming the
  cross-guard.
- BACK layer: three to four of the tallest blades reaching near the top of the frame, angled
  slightly outward like a fan — the largest blades, hilts topped with a small glowing server
  chip or LED cluster in place of an ornamental pommel, faint magenta rim light along every edge.
A low broken wall of stacked, cracked server-rack chassis with dangling torn cables sits ONLY
behind the back layer, partially hidden by the tallest blades — it must not add extra width to
the silhouette; the circuit patterns and status lights on it must NOT resemble readable text or
code characters. The ground is cracked dark violet-black composite stone with thin magenta
circuit-trace lines running through it and thin orange lava-glow cracks between the blade bases
(same lava as the rest of the zone). A light drift of glowing data-spark motes in the air.

COMPOSITION AND PROPORTION (critical): the whole structure must read TALL, not wide, and above
all it must read as a FOREST OF SWORDS, not a cluster of towers, antennas, or server racks — this
is the single biggest risk with this reskin. Target silhouette height-to-width ratio between 0.85
and 1.05, close to a square — use img/raw/st-dab.png (the Thai version of this same station,
already approved) as the exact proportion, blade-shape, and depth-layering reference. Do NOT
spread the blades into a single horizontal line, and do NOT taper every blade to a thin straight
spike — each one needs a readable flat blade with a distinct cutting edge and a distinct hilt,
the same silhouette language as a sword, just built from tech materials. The base footprint
(where the blades meet the ground) should be no wider than it is tall. All added height must
come from the back layer of blades rising up, not from the group spreading sideways. The base of
the whole cluster sits flush with the bottom edge of the canvas.

Avoid: text, letters, numbers, watermark, signature, UI elements, readable code or terminal text
anywhere in the image, people, creatures, monsters, animation frames, a single flat row of
blades all the same height, a wide low silhouette, server towers, antenna masts, radio towers,
crystal spikes, or anything that reads as a building rather than a sword, fresh dripping blood,
blood spray, gore, long cast drop shadow, a checkerboard or solid-color background, blades
cropped or cut off at the top edge of the canvas, gold trim, ice, snow, wood.
```

---

## 2) เช็กลิสต์ตรวจภาพ — ใช้ร่วมกันทั้ง 3 โซน (ตรวจทีละไฟล์ก่อนเซฟทับ)

- [ ] **อ่านออกทันทีว่าเป็น "ดาบ/ใบมีด"** ไม่ใช่หนาม เสาอากาศ หอคอย หรือแท่งไม้ — ข้อนี้สำคัญที่สุดสำหรับ `st-dab-cyberhell` เพราะของเดิมหลุดจากคอนเซปต์ไปไกลสุด
- [ ] **สัดส่วนใกล้จัตุรัส** — วัดกรอบเนื้อภาพจริง (ไม่นับพื้นที่ใสรอบขอบ) ได้ สูง:กว้าง ระหว่าง 0.85–1.05 เทียบข้าง ๆ `img/raw/st-dab.png` (ต้นแบบไทยที่ผ่านแล้ว) ต้องใกล้เคียงกัน
- [ ] **จัดเป็น 3 ชั้นความลึกจริง** (หน้า-กลาง-หลัง สูงไม่เท่ากัน) ไม่ใช่แถวเดียวแนวนอนแบบของเดิมทั้ง asia/west
- [ ] **ฐานชิดขอบล่างภาพ** ไม่มีพื้นที่ใสเหลือใต้ฐานดาบ
- [ ] **พื้นหลังโปร่งใสจริง** (alpha = 0) ไม่ใช่สีขาวหรือเช็กเกอร์บอร์ดที่โปรแกรมวาดค้างไว้
- [ ] **ไม่มีตัวอักษรหลุดมาแม้แต่ตัวเดียว** ทั้งไทย/อังกฤษ/สัญลักษณ์คล้ายตัวอักษร — สำหรับ cyberhell ต้องเช็คเป็นพิเศษว่าลายวงจร/ไฟสถานะไม่ดูเหมือนตัวหนังสือ
- [ ] **ไม่มีเงาตกยาว** (cast shadow) ทาบพื้นออกไปนอกฐานของตัวสถานี
- [ ] **ไม่มีเลือดสาด/หยดสด** — คราบแดงเข้มจาง ๆ ใกล้ปลายดาบพอรับได้ (เฉพาะ asia ที่ยังใช้คอนเซปต์เดียวกับไทย) แต่ต้องดูเป็นสนิม/คราบเก่า ไม่ใช่เลือดสด — west/cyberhell ไม่ต้องมีคราบแดงเลย
- [ ] **ไม่มีสัญลักษณ์ศาสนา** — asia ห้ามหน้าเทวรูป/พระพุทธรูป/โทริอิ/สวัสดิกะบนด้ามหรือกำแพงหลัง · west ห้ามรูปกางเขนหรือลวดลายศาสนาบนกำแพงโกธิกหลัง (กฎเดิมที่ Chris ตีกลับตอนทำฉาก scene-asia/scene-west)
- [ ] **โทนสีตรงโซน ไม่ใช้โทนออบซิเดียนม่วง-ทองแบบไทย** — asia: เขียวเข้ม/แดงชาด/บรอนซ์เก่า · west: เทาถ่าน/ฟ้าน้ำแข็ง/ทองแดงเก่า ไม่มีทองเลย · cyberhell: ม่วง-ดำ/นีออนม่วงฟ้า/ลาวาส้ม (ลาวายังอยู่ได้เฉพาะโซนนี้กับ asia — west ห้ามมีลาวา ให้ใช้แสงเย็นแทน)
- [ ] **ฐานไม่กว้างกว่าที่ควร** — กลุ่มดาบทั้งหมดกว้างไม่เกินความสูงของตัวเอง (ไม่จำเป็นต้องแคบเท่าของเดิมเป๊ะ เพราะของเดิมสองโซนผิดคอนเซปต์อยู่แล้ว)
- [ ] **มุมมองเดียวกับสถานีอื่นในโซนเดียวกัน** (top-down 3/4 isometric-ish)
- [ ] ย่อภาพลงเทียบขนาดจริงในเกม (จัตุรัสสถานีประมาณ 96px ในโค้ด) แล้วยังอ่านออกว่าเป็น "ดงดาบ" ชัดเจน ไม่เบลอเป็นก้อนสีเดียว — สำหรับ cyberhell ต้องเช็คว่าลายวงจรเล็ก ๆ ไม่หายไปตอนย่อจนเหลือแต่สีม่วงตัน

---

## 3) ที่มาของ path จริงในโค้ด (ตรวจจาก `manifest.json` + `scripts/prep-art.py` แล้ว) และขั้นตอนวางไฟล์

**path ต้นทาง (raw) ที่ต้องวางไฟล์ที่ gen ใหม่:**
```
img/raw/Asia/st-dab-asia.png
img/raw/West/st-dab-west.png
img/raw/CyberHell/st-dab-cyberhell.png
```
**path ปลายทางที่เกมโหลดจริง (สคริปต์สร้างให้อัตโนมัติ ไม่ต้องแตะ):**
```
img/Asia/st-dab-asia.png
img/West/st-dab-west.png
img/CyberHell/st-dab-cyberhell.png
```

> หมายเหตุสำคัญจาก `prep-art.py`: ไฟล์โซนย่อยพวกนี้ **ไม่ได้รับการยกเว้นแบบ `st-dab.png` โซนไทย** (โซนไทยเก็บสัดส่วนจริงไว้เพราะเขียนเงื่อนไขเฉพาะ `out_dir == img/` เท่านั้น) — ไฟล์โซน 2-3-4 ทุกไฟล์จะถูกย่อให้พอดีแล้ว**วางชิดขอบล่างกึ่งกลางบนผืน 512×512 เสมอ** ดังนั้น gen เป็นผืนสี่เหลี่ยมจัตุรัสตามที่ prompt กำหนดได้เลย ไม่ต้อง crop เป็นทรงสูงชะลูดเอง สคริปต์จัดกึ่งกลางให้อัตโนมัติ

### ขั้นตอน

1. สำรองของเดิมก่อนทับ (ทั้งไฟล์ที่ใช้จริงและไฟล์ดิบถ้ามี — ห้ามลบทิ้ง):
   ```bash
   cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
   cp img/Asia/st-dab-asia.png            img/Asia/st-dab-asia-old.png
   cp img/West/st-dab-west.png            img/West/st-dab-west-old.png
   cp img/CyberHell/st-dab-cyberhell.png  img/CyberHell/st-dab-cyberhell-old.png
   # ถ้ามีไฟล์ดิบเดิมอยู่แล้วใน img/raw/<Zone>/ ให้สำรองด้วยแบบเดียวกัน
   [ -f img/raw/Asia/st-dab-asia.png ]           && cp img/raw/Asia/st-dab-asia.png           img/raw/Asia/st-dab-asia-old.png
   [ -f img/raw/West/st-dab-west.png ]           && cp img/raw/West/st-dab-west.png           img/raw/West/st-dab-west-old.png
   [ -f img/raw/CyberHell/st-dab-cyberhell.png ] && cp img/raw/CyberHell/st-dab-cyberhell.png img/raw/CyberHell/st-dab-cyberhell-old.png
   ```
2. เซฟไฟล์ที่ gen ใหม่ (แนะนำ gen ที่ 1024×1024 อย่างน้อย ผืนจัตุรัส พื้นใส) ทับที่:
   ```
   img/raw/Asia/st-dab-asia.png
   img/raw/West/st-dab-west.png
   img/raw/CyberHell/st-dab-cyberhell.png
   ```
3. รันสคริปต์เตรียมภาพตามปกติ (ทำทีเดียวครบทั้ง 3 โซน):
   ```bash
   python3 scripts/prep-art.py
   ```
   ถ้าขอบภาพมีแสงเรืองจาง ๆ ที่โดนตัดหายไป ลองรันเฉพาะไฟล์นั้นด้วย threshold ต่ำลง เช่น
   ```bash
   python3 scripts/prep-art.py st-dab-asia --alpha-threshold=8
   ```
4. `img/manifest.json` (`boxes` / `stationSizes` ของ `st-dab-asia` / `st-dab-west` / `st-dab-cyberhell`) จะถูกเขียนทับใหม่อัตโนมัติโดย `scripts/make-manifest.py` ที่ `prep-art.py` เรียกต่อท้ายให้เองแล้ว — ไม่ต้องแก้มือ
5. **ไม่ต้องแก้โค้ดใด ๆ** เกมอ่านไฟล์ใหม่ทันทีที่รีเฟรช — แต่หลังเปลี่ยนภาพ **ให้ Dale ตรวจ hit-box/ตำแหน่งซ้อนทับอีกรอบทั้ง 3 โซน** เพราะสถานี `dab` ใช้พิกัด `bx,by,bw` ชุดเดียวกันกับโซนไทย (`src/data.js` ไม่มีพิกัดแยกต่อโซน) ความสูงใหม่ของภาพอาจไปทับของประดับ/สถานีอื่นที่วางต่างตำแหน่งกันในแต่ละฉาก (เช่น รูปสลักเทวรูปในฉาก asia, กำแพงกระจกโกธิกในฉาก west, ตู้เซิร์ฟเวอร์ในฉาก cyberhell) — ส่งต่อให้ Claudy สั่ง Dale ตรวจ ไม่ใช่ให้ Mind แก้เอง

---

## สรุปสั้นสำหรับคุณเป้

ของเดิมมีปัญหาคนละแบบ: `asia` แค่แบน (เนื้อหาโอเค) ส่วน `west`/`cyberhell` เนื้อหาหลุดคอนเซปต์ไปเป็นปราการกับหอคอยเทคไปแล้ว ไม่อ่านว่าเป็น "ดาบ" เลย ทั้ง 3 ก้อน prompt ข้างบนคุมโครงให้เหมือน `st-dab.png` ไทยทุกจุด (มุมมอง, 3 ชั้นความลึก, สัดส่วนสูง:กว้าง 0.85–1.05, พื้นใส, ห้ามตัวอักษร/เลือดสด) เปลี่ยนแค่วัสดุอาวุธ-ฐาน-ฉากหลังเล็ก-โทนสีให้ตรงแต่ละโซน gen แล้วตรวจตามเช็กลิสต์ข้อ 2 ก่อนเซฟทับ แล้ววางไฟล์ตามขั้นตอนข้อ 3 (backup ก่อนเสมอ) จากนั้นแจ้ง Claudy ให้ Dale ตรวจ hit-box อีกรอบ
