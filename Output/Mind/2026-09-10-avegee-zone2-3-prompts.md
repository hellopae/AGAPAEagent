# AVEGEE — prompt รูปโซน 2 (จิโงกุ ญี่ปุ่น) และโซน 3 (เฮล นอร์ส)

**ผู้ทำ:** Mind · **วันที่:** 10 ก.ย. 2569
**อ้างอิง:** Reese `Output/Reese/2026-09-10-avegee-zone2-3-research.md` (ตาราง + ธงวัฒนธรรม) ·
`AVEGEE/ASSET-PROMPTS.md` (รูปแบบโซน 1) · Toby `Output/Toby/2026-09-05-game-feasibility-v2.md` (กฎอาร์ต) ·
`AVEGEE/src/data.js` (คีย์จริง)

---

## 0. สรุปสั้นสำหรับคุณเป้

- **โซน 2 จิโงกุ** = นรกญี่ปุ่นแบบม้วนภาพสมัยเฮอัน: หินภูเขาไฟดำ ลาวาส้มเหมือนเดิม เสาแดงชาด ทองหม่น เมฆม่วง · ขอบบนเป็นภูเขาดาบ · แม่น้ำล่างเป็นแม่น้ำซันซุ
- สถานีโซน 2: กระทะ→หม้อเหล็กยักษ์ · ป่าดาบ→ภูเขาดาบ · โลกันต์→นรกบัวแดง (น้ำแข็งแตกเป็นกลีบบัว) · งิ้ว→ป่าใบมีด · ลานตรากตรำ→เชือกเหล็กดำ · หอทะเบียน→ศาลยมแบบจีน · หอส่องกรรม→กระจกโจฮาริ · ประตูสวรรค์→สะพานทองขึ้นเมฆม่วง
- ยมทูตโซน 2: ทัณฑ์→โกซุหัววัว · นิรา→โดโชเสมียนหญิง · กานต์→โดเมียวเสมียนชาย · เพลิง→ยักษ์แดง · บุญ→ยักษ์ฟ้าใจดี · ดำ→ยักษ์จิ๋ว · ยาม→เมซุหัวม้า · พ่อยังเป็นพญายมคนเดิม (องค์เดียวกับเอ็นมะ)
- **โซน 3 เฮล** = แดนคนตายนอร์ส: น้ำแข็งดำ หมอกเทา ธารพิษเขียว ทองมีแค่ที่สะพานกับกิมเล · **ไม่มีไฟลงทัณฑ์เลย**
- สถานีโซน 3: กระทะ→บ่อเดือดฮแวร์เกลเมียร์ (น้ำเดือดมีงู ไม่มีไฟ) · ป่าดาบ→ธารดาบสลีดร์ · โลกันต์→หุบหมอกนิฟล์เฮล · งิ้ว→โถงกระดูกงูนาสตรอนด์ · ลาน→โม่ยักษ์กรอตติ · หอทะเบียน→โถงไม้ของเฮล · ตะราง→ประตูเหล็กเฮล · หอส่องกรรม→เนินหลุมหมอดู · ประตูสวรรค์→โถงหลังคาทองกิมเล
- ยมทูตโซน 3: ทัณฑ์→ดราวเกอร์ (ศพนักรบเฝ้าเนิน) · นิรา→นอร์นเสมียนชะตา · กานต์→ปราชญ์ชราขับลำนำ · เพลิง→ยักษ์ไฟมุสเปล · บุญ→นันนา · ดำ→กังลาติคนรับใช้ขี้เกียจ · ยาม→โมดกุดร์หญิงเฝ้าสะพาน · พ่อยังเป็นพญายม เฮลเป็นเจ้าสาขา
- งบ: **ชุด A 12 ชิ้นต่อโซน** (ขาดไม่ได้) · A+B 23 ชิ้นต่อโซน · ชุด C ทำเมื่อว่าง
- **ของที่มีอยู่แล้วต้องทิ้ง:** `scene-asia` `scene-west` ผังไม่ตรงโซน 1 และ scene-asia มีโทริอิกับรูปปั้นจิโซ (ผิดธงของ Reese) · `hero-boss-asia` เป็นซามูไร `hero-boss-west` ดูเป็นโอดินใส่หมวกมีเขา ไม่แนะนำให้ใช้ทั้งคู่
- **ต้องให้คุณเป้ตัดสิน:** ยมทูตเป็น "ตัวใหม่ตามตำนาน" หรือ "ตัวเดิมเปลี่ยนชุด" (แบบ `crew-nira-asia` ที่ทำไว้แล้ว) — ดูข้อ 5

---

## 1. สำรวจของที่มีก่อนเขียน (Step 0)

| ที่เจอ | ความหมาย |
|---|---|
| `img/scene-asia.png` `img/scene-west.png` มีอยู่แล้ว | **ต้อง gen ใหม่ทั้งคู่** — เป็นมุมเอียงไอโซเมตริกคนละผังกับ `img/scene.png` (ผังโซน 1 เป็นมุมบนลงล่าง) พิกัดใน data.js จะไม่ตรง · scene-asia มี **โทริอิ + รูปปั้นจิโซ + เทพหลายกร** ผิดธงข้อ 1-2 ของ Reese · prompt เดิมใน ASSET-PROMPTS 5.4 สั่งให้ใส่ของพวกนี้เอง ต้องยกเลิก prompt 5.4 |
| `img/Asia/` มี `crew-nira-asia` `hero-boss-asia` `hero-yama-asia(-profile)` · `img/Asia/` `img/West/` มีชุดคู่กัน | คุณเป้เริ่มแนว **"ตัวเดิมเปลี่ยนชุด"** ไว้แล้ว · ใช้รูปแบบชื่อนี้ต่อ: `<key>-asia` / `<key>-west` |
| โค้ดใน `src/` **ยังไม่อ่านโฟลเดอร์ Asia/West เลย** | ต้องให้ Toby ต่อสาย: หา `img/<Zone>/<key>-<zone>.png` ก่อน ไม่เจอค่อยถอยไปใช้ `img/<key>.png` ของโซน 1 — ชุด B/C ถึงจะ "ใช้ของโซน 1 ไปก่อน" ได้จริง |
| `crew-nira-west.png` มุมขวาล่างมีรูปดาวสี่แฉก และพื้นเป็นลายตาราง | น่าจะเป็น **ลายน้ำ Gemini + พื้นลายตารางที่ติดมาเป็นพิกเซลจริง** (ความมั่นใจกลาง — ดูจากภาพพรีวิว) ต้องเช็กก่อนรัน prep-art |
| `hero-boss-asia` = พญายมใส่เกราะซามูไร · `hero-boss-west` = ชายเคราขาวหมวกมีเขา หอก อีกา | เอ็นมะไม่ใช่ซามูไร (Reese: ชุดขุนนางจีนสีแดง) · แบบ west อ่านเป็น **โอดิน** (Reese ไม่แนะนำ) + หมวกมีเขา (ธงนอร์สข้อ 5) |
| ฉากในห้อง `BG-<Key>.webp` เป็นภาพ **จัตุรัส 1024×1024** เต็มใบ มุมหน้าตรงมองลงเล็กน้อย | จุดยืนใน `ROOMS` เป็นสัดส่วน 0-1 ของภาพ → ฉากโซนใหม่ต้อง **ใช้โหมดแก้ภาพจากไฟล์โซน 1** เพื่อคงองค์ประกอบ ไม่งั้นต้องวัด ROOMS ใหม่ทุกห้อง |
| โปรไฟล์ `crew-*-profile` = ภาพครึ่งตัวจัตุรัสมีฉากหลัง · ท่าทำงาน `crew-*-work` 4 ตัว | ถ้ายมทูตเปลี่ยนหน้าตา สองชุดนี้จะไม่ตรงกัน → Toby ต้องกันไว้ (ดูข้อ 7) |

---

## 2. กติกาใช้ร่วมทั้งสองโซน

**ชื่อไฟล์** (ตามที่คุณเป้เริ่มไว้แล้ว) — key ยึดตาม `k` ในโค้ด ไม่ใช่ตามตัวละครใหม่
- โซน 2: `img/Asia/<key>-asia.png` เช่น `st-krata-asia.png` `crew-taan-asia.png` `BG-Krata-asia.webp`
- โซน 3: `img/West/<key>-west.png` (zone k ในโค้ดคือ `west` ถึงจะเปลี่ยนชื่อไทยเป็น "อุดร" ก็ไม่ต้องเปลี่ยนไฟล์)
- ฉากโซน: `scene-asia.png` / `scene-west.png` **1527×704 พื้นทึบ** (ทับของเดิม)

**วิธี gen มี 3 แบบ**
1. **ชิ้นพื้นใส** (สถานี ยมทูต ผี) — บล็อกสไตล์ของโซน + prompt ต่อท้าย + บล็อกห้าม (ข้อ 2.2)
2. **ฉากโซน** — **โหมดแก้ภาพ แนบ `img/scene.png`** เท่านั้น ห้าม gen จาก prompt เปล่า (บทเรียนจาก scene-asia ที่ผังหลุด)
3. **ฉากในห้องสถานี** — **โหมดแก้ภาพ แนบ `img/BG-<Key>.webp` ของโซน 1** (ต้นฉบับ jpeg อยู่ที่ `img/raw/_BG-<Key>.jpeg`)

### 2.1 สัดส่วนสถานี (ใช้ทั้งสองโซน — ต้องเท่าโซน 1 ไม่งั้นทับโซนข้างบน)

| key | สัดส่วนที่ต้องได้ | ใส่ท้าย prompt |
|---|---|---|
| `st-sala` | กว้างกว่าสูงเล็กน้อย | `slightly wider than tall` |
| `st-krata` | กว้างราว 2 เท่าของสูง | `wide and low, about twice as wide as tall` |
| `st-dab` | กว้างมาก เตี้ยมาก | `very wide and very low, a single row` |
| `st-lokan` | กว้าง เตี้ย | `wide and low` |
| `st-ngiw` | สูงกว่ากว้าง (~0.7) | `taller than wide` |
| `st-lan` | เล็ก เกือบจัตุรัส | `small and nearly square` |
| `st-tea` | เกือบจัตุรัส | `nearly square` |
| `st-tarang` | กว้างราว 2 เท่าของสูง | `long and low, about twice as wide as tall` |
| `st-krajok` | สูงชะลูด (~0.42) | `tall and narrow, about twice as tall as wide` |
| `st-sawan` | สูงกว่ากว้าง (~0.57) | `taller than wide` |

> ได้รูปจริงแล้ว Toby ต้องวัด `bx/by/bw/hit/sx/sy` ใหม่ถ้าสัดส่วนเนื้อภาพต่างจากโซน 1 เกิน ~10%

### 2.2 บล็อกห้าม — ต่อท้าย **ทุกชิ้น** (ใช้ทั้งสองโซน)

```
AVOID: any text, letters, numbers, calligraphy, kanji, runes, or glyph-like marks anywhere —
including on signs, scrolls, books, banners, lanterns, shields, stones and clothing;
watermark, signature, logo, UI; checkerboard pattern baked into the background;
more than one pose or animation frames; blood, gore, exposed organs, rotting flesh;
photorealism, 3D render, painterly blur
```

แล้วต่อด้วยบล็อกห้ามของโซนนั้น (ข้อ 3.2 / 4.2)

---

## 3. โซน 2 — จิโงกุ (นรกญี่ปุ่น) · ไฟล์ต่อท้าย `-asia`

### 3.1 บล็อกสไตล์โซน 2

**(ก) ยมทูต ผี ของประดับ** — แปะนำหน้า
```
top-down 3/4 isometric-ish view game asset, high-detail modern pixel art in the style of
a beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with warm rim light, rich saturated palette, clean crisp pixel edges,
single object centered on a fully transparent background, square canvas, no ground shadow baked in,
no text, no letters, no numbers, no watermark, no UI
COLOR THEME: Japanese Buddhist hell (Jigoku) as in Heian-era hell scrolls — cinnabar vermilion
lacquer, sumi-ink black iron, weathered dull gold, ash-grey stone, dusky purple cloud,
molten orange fire glow
```

**(ข) สถานี** — แปะนำหน้า
```
top-down 3/4 view pixel art game asset, high-detail modern pixel art in the style of a
beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with warm rim light, clean crisp pixel edges, single structure centered on a fully
transparent background, square canvas, viewed from the same angle as a top-down game map,
no ground plate under it beyond its own footprint,
no text, no letters, no numbers, no watermark, no characters, no people, no creatures
COLOR THEME: Japanese Buddhist hell (Jigoku) as in Heian-era hell scrolls — cinnabar vermilion
lacquer, sumi-ink black iron, weathered dull gold, ash-grey stone, dusky purple cloud,
molten orange fire glow
```

**(ค) ยมทูตเพิ่มท้าย** (เหมือนโซน 1)
```
cute chibi proportions about 3 heads tall, standing idle facing slightly toward the viewer,
full body with feet visible at the bottom edge, outline weight matching the other crew sprites
```
> แนะนำแนบ `img/crew-taan.png` เป็นภาพอ้างอิงสไตล์ด้วย (บอกว่า `match the pixel style and outline of the reference, NOT the character`)

**ชุดสีโซน 2 (hex สำหรับ Toby ย้อมสี UI/โค้ด)**
| บทบาท | สี | hex |
|---|---|---|
| หลัก | แดงชาด | `#B8322A` |
| พื้น/เงา | ดำหมึก | `#1C1A1F` |
| เน้น | ทองหม่น | `#B8963E` |
| บรรยากาศ | ม่วงเมฆ | `#6B4D8A` |
| หิน | เทาเถ้า | `#5E5A5C` |
| ไฟ/ลาวา | ส้มลาวา (เท่าโซน 1) | `#F26A1B` |

### 3.2 บล็อกห้ามโซน 2 — ต่อหลังบล็อกห้ามร่วม

```
also AVOID: torii gate; shimenawa rope or zigzag shide paper streamers; manji or any
swastika-like symbol; rising-sun ray pattern; Jizo / Ksitigarbha statue or any monk figure
holding a ringed staff and jewel; Buddha or Amida figure; child ghosts; small stacked pebble
cairns by a river; samurai armor on the judge; ninja; geisha
```

เหตุผลแต่ละข้อ (จาก Reese ข้อ 5 ญี่ปุ่น)
- โทริอิ ห่วงเชือก shimenawa กระดาษ shide = ของชินโต ไม่ใช่นรกพุทธ
- จิโซ = ผู้โปรดสัตว์และร่างเดิมของเอ็นมะ **ตัดออกทั้งหมด** ไม่ใส่แม้เป็นรูปปั้นประดับ
- 卍 ผู้เล่นต่างชาติเห็นเป็นนาซี · ลายอาทิตย์อุทัยแผ่รัศมีเป็นประเด็นอ่อนไหวในเกาหลี/จีน (เพิ่มโดย Mind)
- **กองหินเตี้ยริมแม่น้ำ** = ภาพ Sai no Kawara (เด็กกองหิน) — ฉากที่ Reese ร่างไว้มี "หินกองเตี้ย ๆ" ริมฝั่ง **Mind ตัดออก** เพราะขัดธงข้อ 4 ของ Reese เอง
- ห้ามวาดองค์พระอมิตาภะ · เอ็นมะต้องเป็นผู้พิพากษา ไม่ใช่ปีศาจ ไม่ใช่ซามูไร

### 3.3 ฉากโซน 2 — `scene-asia.png` (ชุด A)

**โหมดแก้ภาพ แนบ `img/scene.png`** แล้วใช้ prompt นี้ (ไม่ต้องแปะบล็อกสไตล์ แต่ต้องต่อบล็อกห้ามทั้งสอง)
```
Edit this image. Keep the EXACT same layout, top-down camera angle, composition, scale and
pixel art style. Every rock ledge, cliff edge, lava channel, fence, the two wooden docks,
the central stone judgment platform with its throne, the rope bridge and ALL the empty open
ground plots must stay in exactly the same positions and sizes. Do not add any building.

CHANGE ONLY THE SURFACE DRESSING, from a Thai hell to a Japanese Buddhist hell (Jigoku)
in the mood of Heian-era hell scrolls:
- TOP BORDER: the dark rock spikes become the Mountain of Needles — black crags bristling
  with upright sword blades and iron needles, a red-orange fire glow behind them.
- LEFT AND RIGHT CLIFFS: same shape, dark volcanic basalt.
- GROUND: black volcanic rock with grey ash and a few bones instead of purple rock.
  The lava channels keep exactly the same shape and the same molten orange color.
- CENTRAL PLATFORM: the court of King Enma — add vermilion lacquered railings and corner
  posts with small gold caps around the same stone platform; the throne becomes a tall
  vermilion lacquered Chinese magistrate's chair with a plain gold back, same footprint.
- BRIDGE: same planks, same position, rails now vermilion lacquer with gold caps.
- RIVER along the bottom: the Sanzu river — a lighter shallow ford band with pebbles
  along the near shore, a deep dark fast current beyond it with two or three black water
  serpents, a faint gold shimmer on the surface. Keep the ghost wisps in the water.
- a single gnarled bare tree on a tiny rock islet at the far left of the river,
  its branches draped with pale discarded robes.
- thin wisps of dusky purple cloud drifting in the upper-left corner only.
Palette: cinnabar vermilion, sumi-ink black, weathered dull gold, ash grey, dusky purple,
molten orange lava.
No text, no letters, no kanji, no numbers, no characters, no people, no statues.
```

> **เช็กก่อนใช้:** วางซ้อน `scene.png` แบบโปร่ง 50% — ขอบลาวา แท่น สะพาน ท่าเรือ ต้องทับกันสนิท
> ถ้าเลื่อนแม้แต่ช่องเดียว ตัวละครจะไปยืนกลางลาวา · ที่ว่างสร้างสถานีต้องว่างจริง (ห้ามมีต้นไม้/อาคารงอก)
> **ไม่ใส่กระจกกลมข้างบัลลังก์** ตามที่ Reese ร่าง เพราะกระจกคือสถานี `krajok` ที่ต้องสร้างเอง ถ้าวาดติดฉากจะเห็นก่อนสร้าง

### 3.4 ตาราง prompt โซน 2

ชิ้นพื้นใสทั้งหมด: **บล็อกสไตล์ (ก) หรือ (ข)** + prompt + สัดส่วน (ข้อ 2.1) + บล็อกห้ามร่วม + บล็อกห้ามโซน 2

#### สถานี (บล็อก ข)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `st-sala-asia` | ศาลยมราช (หอทะเบียน) | A | the court of King Enma used as a hall of records: a Tang-dynasty Chinese magistrate's hall on a raised stone base, vermilion lacquered pillars, white plaster walls, a sweeping dark green glazed-tile roof with upturned eaves and plain gold ridge ends, a wide stone staircase at the front, closed heavy vermilion double doors with gold studs, a row of black lacquered document chests along one side, two plain blank white paper lanterns at the corners, slightly wider than tall |
| `st-krata-asia` | หม้อเดือดเคียวคัง | A | the great boiling cauldrons of the Screaming hell: one enormous black iron cauldron in the middle with a smaller one on each side, all sitting in a row on square black stone furnaces with roaring orange fire in their mouths, dark liquid boiling with thick white steam, heavy iron ring handles, a long wooden stirring pole leaning on the middle rim, a small iron balance scale with a heap of glowing red-hot iron weights beside it, wide and low, about twice as wide as tall |
| `st-dab-asia` | ภูเขาดาบ | A | the Mountain of Swords: a low jagged ridge of black volcanic rock bristling with dozens of straight upright swords driven in hilt-first so every blade points to the sky, packed densely like a forest, blade tips stained dark red, cold steel glints, very wide and very low, a single row |
| `st-lokan-asia` | นรกบัวแดง | A | the Crimson Lotus cold hell: a thick low slab of pale blue glacier ice cracked into sharp shards, with five or six large crystal formations of deep crimson ice splitting open like red lotus flowers in full bloom, frost haze drifting across, hard cold white rim light, beautiful and cruel, no figures inside the ice, wide and low |
| `st-ngiw-asia` | ป่าใบมีด | A | the Blade-Leaf Forest: a tight grove of three tall slender trees with black iron trunks, every leaf a small sharp steel knife blade glinting silver, fallen blade-leaves scattered around the roots on cracked red-glowing soil, a faint pink-red haze at the treetops, taller than wide |
| `st-lan-asia` | เชือกเหล็กดำ | B | the Black Rope hell labour yard: two small black iron crags facing each other, a taut red-hot glowing iron chain-rope strung between their peaks, three heavy black iron blocks with rope carrying-harnesses lying at the foot, a sunken square pit of glowing embers below the rope, small and nearly square |
| `st-krajok-asia` | กระจกโจฮาริ | B | the Crystal Mirror of Enma: a large perfectly round mirror of clear crystal glass mounted in a tall carved dark wooden stand shaped like swirling clouds, a stepped vermilion lacquered base, the mirror surface glowing with soft moving silver light but showing no picture, a small bronze incense burner at the foot, tall and narrow, about twice as tall as wide |
| `st-sawan-asia` | สะพานทองสู่สุขาวดี | B | the golden way to the Pure Land: a short steep arched bridge of gold inlaid with small jewels in seven colors rising up toward a two-storey Buddhist temple gate with dark tiled double roofs, the gate opening flooded with warm white-gold light, soft dusky purple clouds wrapped around the upper half, no figure, no statue inside the gate, it must look clean and bright — the only structure in the zone that is not black or burning, taller than wide |
| `st-tea-asia` | โรงน้ำชา | C | a small Japanese roadside teahouse: an open-fronted wooden hut with a thick thatched straw roof, a low bench covered in plain red felt cloth, an iron kettle hanging over a small charcoal hearth, a plain unmarked indigo curtain across the doorway, one blank white paper lantern, nearly square |
| `st-tarang-asia` | คุกศาลยม | C | an old Japanese wooden jail: a long low building whose front wall is a lattice cage of thick square dark timber bars, a heavy crossbeam door with a black iron lock, a dark tiled roof, pale ghost light leaking between the bars, long and low, about twice as wide as tall |

#### ยมทูต ยาม บอส (บล็อก ก + บล็อก ค)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `crew-taan-asia` | ทัณฑ์ → โกซุ ยมบาลหัววัว | A | Gozu, the ox-headed hell warden: a stocky muscular jailer with the head of a dark brown ox, thick curved horns with one tip chipped, an iron nose ring, old battle scars on his arms, bare chest, a tiger-skin loincloth, a heavy black iron three-pronged fork resting on his shoulder, grumpy tired veteran expression |
| `crew-nira-asia` | นิรา → โดโช เสมียนหญิง | A | Dōshō, a female recording spirit of the underworld court: a slim young woman in dark crimson Tang-dynasty Chinese court official robes with wide sleeves, a tall black official's cap, holding an ink brush in one hand and a half-unrolled blank scroll in the other, a small ink stone hanging at her belt, precise no-nonsense expression |
| `crew-kan-asia` | กานต์ → โดเมียว เสมียนชาย | A | Dōmyō, a male recording spirit of the underworld court: a young man in deep indigo Tang-dynasty court robes with a tall black official's cap, sharp narrow observant eyes, holding a round polished crystal lens over a half-open blank scroll, calm thoughtful expression |
| `crew-plerng-asia` | เพลิง → ยักษ์แดง | A | an eager young red oni: bright red skin, one short horn on the forehead, wild curly black hair, a tiger-skin loincloth, a big toothy grin with small fangs, a spiked black iron club slung over one shoulder, tiny flames licking at his bare feet |
| `crew-boon-asia` | บุญ → ยักษ์ฟ้าใจดี | A | a gentle blue oni: soft pale blue skin, two small blunt horns, kind droopy eyes and a sad small smile, a plain grey cloth draped over one shoulder, holding a single pink lotus flower and one smoking incense stick together in both hands |
| `crew-dam-asia` | ดำ → ยักษ์จิ๋ว | A | a small scruffy little oni: grey-green skin, two tiny nub horns, round belly, a patched straw-rope loincloth, a big bundle of firewood tied to his back with rope, mid-yawn with sleepy half-lidded eyes |
| `crew-guard-asia` | ยักษ์ทวารบาล → เมซุ หัวม้า | B | Mezu, the horse-headed hell warden standing guard: tall and broad, the head of a grey-black horse with a wild shaggy mane, dark iron lamellar armor with vermilion cords, holding a long straight spear upright, stern alert posture — **taller than the crew, about 4 heads tall** (ใช้สัดส่วนเดียวกับ `crew-guard.png` ไม่ใช่บล็อก ค) |
| `hero-boss-asia` | พญายม/เอ็นมะ (ไม่บังคับ) | C | Enma, king-judge of hell, seated on a tall vermilion lacquered throne: stern red face, thick black eyebrows, full black beard, crimson Chinese imperial-official robes with gold trim, a tall black official's crown with a plain blank gold plaque on the front, holding a flat wooden court tablet upright in both hands, beside the throne a tall staff topped with two small serene carved faces, dignified judge not demon — same framing as `img/hero-boss.png` · **ค่าตั้งต้นคือใช้ `hero-boss.png` โซน 1 ต่อ** (Reese: พ่อคนเดิมไปสาขาได้เลย) และ **อย่าใช้ `img/Asia/hero-boss-asia.png` ตัวซามูไรที่มีอยู่** |

#### ผีก่อกวน (บล็อก ก ไม่ต้องใส่ chibi)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `mob-kasha-asia` | คาชะ แมวไฟขโมยศพ | B | Kasha, a large black cat demon wreathed in orange flames, two tails, one paw on a small burning cart wheel, crouched ready to pounce, glowing yellow eyes, arched back |
| `mob-nukekubi-asia` | นุเคะคุบิ หัวหลุดลอย | B | Nukekubi: the floating detached head of a pale woman with long loose black hair streaming behind her, sharp eyes and a sly grin, a thin ghostly wisp trailing from the neck, no body, no blood |
| `mob-hitodama-asia` | ดวงไฟวิญญาณ | C | a hitodama soul-fire: a floating pale blue-white fireball with a long wavy tail, soft inner glow, no face, eerie and quiet |
| `mob-gaki-asia` | กากิ เปรตญี่ปุ่น | C | a Japanese gaki hungry ghost from a Heian scroll: skeletal limbs, huge swollen belly, very thin neck, pale ash-grey skin, tiny ragged loincloth, crouching and reaching · **ใช้ `mob-pret` โซน 1 แทนไปก่อนได้เนียน** |

> "เปรตปากเท่ารูเข็ม" ใช้ `mob-pret2` โซน 1 ได้เลย (ตรงตัวกับ 針口餓鬼) · "สุนัขนรก" ใช้ `mob-werewolf` ต่อได้

### 3.5 ฉากในห้องสถานีโซน 2 (โหมดแก้ภาพ แนบ BG โซน 1)

**ประโยคหลัก** — ใช้ทุกห้อง แล้วเติมบรรทัด CHANGE ของห้องนั้น + บล็อกห้ามทั้งสอง
```
Edit this image. Keep the EXACT same composition, camera angle, horizon line, staircase,
floor area and the position and size of the central object — characters will be placed on
the floor by code, so the open floor in the lower part must stay open, flat and uncluttered.
Same pixel art style and level of detail. No text, no letters, no characters, no people.
CHANGE ONLY the cultural dressing:
```

| ไฟล์ | แนบ | ชุด | บรรทัด CHANGE |
|---|---|---|---|
| `BG-Sala-asia.webp` | `BG-Sala` | B | the interior becomes a Tang-dynasty Chinese magistrate's court of records: vermilion pillars, dark wooden shelves of black lacquered document boxes and rolled blank scrolls, a tall judge's desk at the top of the stairs with an ink stone and brush stand, hanging blank paper lanterns, cinnabar and dull gold palette |
| `BG-Krata-asia.webp` | `BG-Krata` | B | the three cauldrons become one huge black iron cauldron flanked by two smaller ones on stone furnaces, the Thai statues become plain black iron post lanterns, the volcano stays, ash grey stone instead of Thai carvings |
| `BG-Dab-asia.webp` | `BG-Dab` | B | the blade forest becomes a steep black mountain covered in upright swords pointing to the sky, sword blades catching red fire light, needle-like iron spikes on the ridges |
| `BG-Lokan-asia.webp` | `BG-Lokan` | B | the ice prison becomes a vast pale blue frozen plain where crimson ice crystals burst open like red lotus flowers, cold white mist, faint purple sky |
| `BG-Ngiw-asia.webp` | `BG-Ngiw` | B | the thorn trees become tall iron trees whose leaves are all small steel knife blades glinting silver, fallen blade-leaves on the ground, pink-red haze in the canopy |
| `BG-Tea-asia.webp` | `BG-Tea` | C | the Thai pavilion becomes a thatched Japanese roadside teahouse with red felt benches, an iron kettle over a charcoal hearth and blank paper lanterns |
| `BG-Tarang-asia.webp` | `BG-Tarang` | C | the gaol becomes an old Japanese wooden jail with a lattice of thick square timber bars and a crossbeam door |
| `BG-Krajok-asia.webp` | `BG-Krajok` | C | the mirror tower becomes a single huge round crystal mirror on a carved cloud-shaped wooden stand, glowing silver, vermilion base |
| `BG-Sawan-asia.webp` | `BG-Sawan` | C | the Thai heaven gate becomes a golden arched bridge rising into dusky purple clouds toward a two-storey temple gate full of warm light, no figure in the light |

### 3.6 ใช้ของโซน 1 ซ้ำได้ (ไม่ต้อง gen) — โซน 2

| ของโซน 1 | ใช้แทน | ต้องทำอะไร |
|---|---|---|
| `mob-pret` `mob-pret2` `mob-werewolf` | กากิ · เปรตปากเข็ม · สุนัขนรก | ไม่ต้องทำ |
| `st-tarang` | คุกศาลยม | ย้อมโทนด้วยโค้ดให้หลังคาไปทางดำ-แดงชาด (รูปเดิมหลังคาไทยเล็กมาก อ่านไม่ออก) |
| `st-tea` | โรงน้ำชา | ใช้ได้ชั่วคราว — ช่อฟ้าไทยยังเห็นชัด ควร gen ภายหลัง |
| `st-lan` | เชือกเหล็กดำ | ใช้ได้ชั่วคราว (หลุมหินกลาง ๆ ไม่มีชาติ) |
| `hero-boss` | พญายม | ไม่ต้องทำ (องค์เดียวกับเอ็นมะ) |
| `hero-yama-asia` | ตัวเรา | มีแล้วใน `img/Asia/` |
| `prop-boat` `prop-lantern` `item-*` `fx-*` `spirit*` `soul-*` `BG-Turn-Base` | เหมือนเดิม | ไม่ต้องทำ |

---

## 4. โซน 3 — เฮล (แดนคนตายนอร์ส) · ไฟล์ต่อท้าย `-west`

### 4.1 บล็อกสไตล์โซน 3

ต่างจากโซน 1-2 ตรง **แสงขอบเย็น (cold rim light) แทนแสงอุ่น** — โซนนี้ไม่มีไฟ ยกเว้นยักษ์ไฟ (เพลิง) กับเตาเล็กในโถงมี้ด

**(ก) ยมทูต ผี ของประดับ**
```
top-down 3/4 isometric-ish view game asset, high-detail modern pixel art in the style of
a beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with cold pale-blue rim light, rich but cold palette, clean crisp pixel edges,
single object centered on a fully transparent background, square canvas, no ground shadow baked in,
no text, no letters, no numbers, no watermark, no UI
COLOR THEME: Norse realm of the dead (Hel) — blue-black glacier stone, cold fog grey,
sickly poison green, pale ice blue, dark tarred pine wood, tarnished dull gold only on sacred things
```

**(ข) สถานี**
```
top-down 3/4 view pixel art game asset, high-detail modern pixel art in the style of a
beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with cold pale-blue rim light, clean crisp pixel edges, single structure centered on a
fully transparent background, square canvas, viewed from the same angle as a top-down game map,
no ground plate under it beyond its own footprint,
no text, no letters, no numbers, no watermark, no characters, no people
COLOR THEME: Norse realm of the dead (Hel) — blue-black glacier stone, cold fog grey,
sickly poison green, pale ice blue, dark tarred pine wood, tarnished dull gold only on sacred things
```
> บล็อกนี้ตัด `no creatures` ออก เพราะบางสถานีมีงู/นกกระสาเป็นส่วนหนึ่งของตัวอาคาร

**(ค) ยมทูตเพิ่มท้าย** — ใช้บล็อก (ค) ของโซน 2 ได้เลย (เหมือนกัน)

**ชุดสีโซน 3 (hex)**
| บทบาท | สี | hex |
|---|---|---|
| หลัก/พื้น | น้ำเงินดำ | `#1B2233` |
| บรรยากาศ | เทาหมอก | `#8A93A0` |
| เน้น (อันตราย) | เขียวพิษ | `#7E9F3A` |
| น้ำแข็ง | ฟ้าซีด | `#BCD3E0` |
| ไม้ | สนทาน้ำมันดิน | `#3B2F26` |
| ศักดิ์สิทธิ์เท่านั้น | ทองหม่น | `#B89A4A` |

### 4.2 บล็อกห้ามโซน 3 — ต่อหลังบล็อกห้ามร่วม

```
also AVOID: runes or rune-like carvings of any kind; valknut or any interlocking triangles;
Othala rune; wolfsangel; sun-wheel or black sun; double lightning-bolt shapes; swastika;
horned or winged helmets; Christian cross; Thor's hammer pendant; an old one-eyed man with
eyepatch, wide-brimmed hat and spear (must not read as Odin); rotting half-corpse woman;
child ghosts; flaming giant sword
```

เหตุผล (จาก Reese ข้อ 5 นอร์ส)
- สัญลักษณ์ที่กลุ่มเหยียดผิวยึดไป ห้ามทั้งหมด · **AI ชอบใส่รูนสุ่มบนหินกับโล่** อาจออกมาเป็นตัวต้องห้าม จึงห้ามรูนทุกแบบ
- ความเชื่อนอร์สยังมีคนนับถือจริง → ห้ามโอดิน/ฟรายยา/บัลเดอร์เป็นผี เป้าให้ฟาด หรือตัวตลก · ห้ามตัวละครอื่นดูเหมือนโอดิน
- หมวกมีเขาเป็นของแต่งยุคโรแมนติก · เฮล "ครึ่งสวยครึ่งเน่า" เป็นของแต่งยุคหลัง
- ไม่มีดาบไฟ = กันไม่ให้ยักษ์ไฟกลายเป็น Surtr (ตัวจุดจบโลก)
- ค้อนทอร์เป็นสัญลักษณ์ศาสนาของผู้นับถือปัจจุบัน ไม่เอามาแขวนบนศพเดินได้ (Mind เพิ่ม)

### 4.3 ฉากโซน 3 — `scene-west.png` (ชุด A)

**โหมดแก้ภาพ แนบ `img/scene.png`**
```
Edit this image. Keep the EXACT same layout, top-down camera angle, composition, scale and
pixel art style. Every rock ledge, cliff edge, channel, fence, the two wooden docks, the
central stone judgment platform with its throne, the bridge and ALL the empty open ground
plots must stay in exactly the same positions and sizes. Do not add any building.

CHANGE ONLY THE SURFACE DRESSING, from a Thai hell to the Norse realm of the dead (Hel):
- TOP BORDER: the dark rock spikes become frozen black ice cliffs half-swallowed by thick
  grey freezing fog; a few enormous gnarled tree roots hang down over the top edge from
  above; far back in the fog, small and faint, the dark silhouette of a huge serpent-dragon
  gnawing one of the roots.
- LEFT AND RIGHT CLIFFS: same shape, frost-covered black rock.
- GROUND: black stone with patches of grey snow and frost and a few old bones, instead of
  purple rock. The lava channels keep EXACTLY the same shape but become a slow, sickly,
  softly glowing green poison stream, clearly different in color from the ground.
- CENTRAL PLATFORM: the same stone platform in dark grey stone with a border of plain
  carved interlaced serpents; the throne becomes a high-backed dark pine-wood seat with
  carved serpent-head arm ends, same footprint.
- BRIDGE: same planks, same position — the rails and planks are now covered in gleaming
  gold leaf, the only bright gold in the whole scene.
- RIVER along the bottom: the river Gjöll — wide, pitch black water with floating chunks
  of pale ice. Keep the ghost wisps in the water.
- DOCKS: same docks, weathered dark tarred pine.
Palette: blue-black stone, fog grey, pale ice blue, sickly poison green, gold only on the bridge.
No text, no letters, no runes, no numbers, no characters, no people, no statues.
```
> **ธารพิษเขียว:** Reese ข้อ 4 บอกว่าต้องให้ Toby ตั้งสี walk.js ใหม่ — แต่คอมเมนต์ใน data.js บอกว่า walk.js อ่านสีจาก `img/scene.png`
> ถ้าเป็นแบบนั้นจริง ผังที่ตรงเป๊ะก็พอ ไม่ต้องแก้สี · Toby ต้องเช็กว่าอ่านจากฉากโซน 1 ใบเดียวหรืออ่านจากฉากโซนนั้น (ข้อ 7)

### 4.4 ตาราง prompt โซน 3

#### สถานี (บล็อก ข)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `st-sala-west` | โถงเอลยูดนีร์ (หอทะเบียน) | A | Éljúðnir, the long hall of the realm of the dead used as a hall of records: a long low Norse longhouse of dark tarred timber on a stone footing, a steep turf roof heavy with snow, carved serpent-headed gable ends, tall door posts carved with plain interlaced serpents, a rack of blank wooden tally sticks beside the door, frost on the eaves, faint cold light at the doorway, slightly wider than tall |
| `st-krata-west` | บ่อเดือดฮแวร์เกลเมียร์ | A | Hvergelmir, the roaring boiling spring: a wide round well of black stone set into glacier ice, dark water boiling violently with thick white steam columns, many small black serpents coiling over the rim and in the water, a single grey heron perched on a rim stone, NO fire, NO flames, NO furnace, wide and low, about twice as wide as tall |
| `st-dab-west` | ธารดาบสลีดร์ | A | the river Slíðr: a short wide stretch of icy black stream in a shallow rocky gully, the clear water full of sunken swords and single-edged long knives lying blade-up and glinting under the surface, frost-covered boulders along both banks, a thin green poison mist over the water, very wide and very low, a single row |
| `st-lokan-west` | นิฟล์เฮล | A | Niflhel: a wide low hollow of black ice and frozen rock swallowed by a thick bank of freezing grey fog, jagged black ice spikes and two dead frozen trees poking out of the fog, no light source, only pale cold fog, the silhouette must stay readable, wide and low |
| `st-ngiw-west` | โถงนาสตรอนด์ | A | the hall on the Corpse Shore: a narrow tall hall woven entirely from the giant spines and ribs of serpents, bone-white vertebrae arching together into a pointed roof, a dark doorway facing the viewer, green venom dripping from a smoke-hole in the roof and pooling into a small poison stream at its foot, taller than wide |
| `st-lan-west` | โม่กรอตติ | B | the giant mill Grotti: two enormous round grey millstones stacked on a low stone platform, a long wooden push-bar sticking out of the upper stone, a small heap of grey ground dust and white salt around the base, a worn circular track trodden into the frost around it, small and nearly square |
| `st-krajok-west` | เนินหลุมหมอดู | B | the seeress's burial mound: a tall narrow grassy grave mound dusted with snow, capped with a plain uncarved standing stone, a thin crack in the mound glowing with eerie pale green light, a crooked iron staff planted upright beside it, tall and narrow, about twice as tall as wide |
| `st-sawan-west` | กิมเล | B | Gimlé: a small hall roofed in shining gold standing on a snowy peak, warm golden light brighter than the sun pouring from its open doorway, a short pale stone stair up to it, soft golden clouds around the peak, it must look clean and bright — the only structure in the zone that is not dark or cold, taller than wide |
| `st-tea-west` | ม้านั่งมี้ด | C | a cosy corner of a Norse hall: a low wooden bench with a fur throw and a few plain gold rings scattered on it, a large copper mead cauldron on a short iron tripod, a small stone-ringed hearth with a low warm fire, nearly square |
| `st-tarang-west` | ประตูเฮล | C | the Hel-gate: a long black iron fence-gate of tall spear-pointed bars with heavy iron hinges and a thick crossbar lock, set between two black stone posts crusted with frost, pale ghost light glowing behind the bars, long and low, about twice as wide as tall |

#### ยมทูต ยาม เจ้าสาขา (บล็อก ก + บล็อก ค)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `crew-taan-west` | ทัณฑ์ → ดราวเกอร์ศพเฝ้าเนิน | A | a veteran draugr barrow-guard: a stocky undead warrior with swollen dark blue-black skin, a grey braided beard, a rusty chainmail shirt over a faded wool tunic, a plain round iron helmet with no horns, an old notched axe resting on his shoulder, pale glowing eyes, tired grumpy expression, eerie but not rotting |
| `crew-nira-west` | นิรา → นอร์นเสมียนชะตา | A | a minor norn, a clerk of fate: a slim woman wrapped in a hooded silver-grey wool cloak, holding a flat blank wooden tally stick in one hand and a small drop spindle with a single glowing thread in the other, calm stern face, precise upright posture |
| `crew-kan-west` | กานต์ → þulr ปราชญ์ขับลำนำ | A | a thulr, an old sage and reciter of lore: a wiry old man with long grey braided hair and beard, both eyes clearly visible and sharp, a heavy brown fur mantle over a dark wool tunic, bareheaded, holding a small plain wooden lyre against his chest, a cord of carved bone lots at his belt, knowing half-smile (no staff, no raven, no hat, no spear — must not read as Odin · แก้ตาม Chris 10 ก.ย. 2569) |
| `crew-plerng-west` | เพลิง → ยักษ์ไฟมุสเปล | A | an eager young fire giant from the realm of fire: cracked black lava-rock skin with glowing orange seams, hair made of living flame, bare arms, a simple dark iron belt, carrying a burning pine torch, heat shimmer around him, cocky grin, the only warm thing in a frozen land |
| `crew-boon-west` | บุญ → นันนา | A | Nanna, gentle wife of the shining god: a young woman with pale golden hair in a loose braid, a simple white linen dress, a soft warm glow around her, holding a folded linen cloth and a small plain gold ring together in both hands, serene sad smile, dignified and kind |
| `crew-dam-west` | ดำ → กังลาติ คนรับใช้ | A | Ganglati, the slow servant of the hall of the dead: a pale thin hunch-backed man in a drab grey wool tunic with wrapped leg bindings, feet dragging, a bundle of pine logs tied to his back, droopy half-closed eyes, mid-yawn |
| `crew-guard-west` | ยักษ์ทวารบาล → โมดกุดร์ | B | Móðguðr, the maiden who guards the golden bridge: a tall broad-shouldered young woman in a mail shirt and a plain round iron helmet with no horns, long thick braids, holding a long spear upright, a round wooden shield with a plain painted boss and no symbols, stern challenging stare — **taller than the crew, about 4 heads tall** (สัดส่วนเดียวกับ `crew-guard.png`) |
| `npc-hel-west` | เฮล เจ้าสาขา | C | Hel, ruler of the realm of the dead, seated on a high dark pine-wood throne: a tall grim woman whose body is divided vertically down the middle — the left half dark blue-black skin, the right half normal pale human skin — long dark hair, a stern gloomy face, simple dark robes and a heavy plain iron circlet, not rotting, not skeletal, not seductive — same framing as `img/hero-boss.png` · **คีย์ใหม่ โค้ดยังไม่มีช่อง** (ถ้าเลือกให้เฮลเป็นบอส เปลี่ยนชื่อไฟล์เป็น `hero-boss-west` แทนตัวแบบโอดินที่มีอยู่) |

#### ผีก่อกวน (บล็อก ก ไม่ต้องใส่ chibi)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `mob-draugr-west` | ดราวเกอร์ตัวเล็ก | B | a small shambling draugr: swollen dark blue-black skin, rotted-looking grey rags of old clothing, hunched, arms reaching forward, pale glowing eyes, eerie but not gory |
| `mob-mara-west` | มารา ผีนั่งทับอก | B | a mara nightmare spirit: a thin pale woman with very long tangled black hair, crouched low as if about to sit on someone's chest, bony hands, hollow dark eyes, a torn grey shift, cold mist curling around her, no other figure |
| `mob-ormr-west` | งูพิษนาสตรอนด์ | C | a black venom serpent: a thick glossy black snake reared up to strike, mouth open with green venom dripping from its fangs, small green glow in the eyes |
| `mob-garmr-west` | การ์ม หมาเฝ้าแดน | C | Garmr, the great hound of the underworld: a huge black shaggy dog with a dark stained chest, bared teeth, glowing pale eyes, low menacing stance · **ใช้ `mob-werewolf` โซน 1 แทนไปก่อนได้** |
| `mob-helhestr-west` | ม้าผีสามขา | C | a three-legged ghost horse: gaunt black horse standing on three legs, patchy hide, pale mist from its nostrils, hollow white eyes · **นิทานพื้นบ้านเดนมาร์กยุคหลัง** ไม่ใช่ตำนานเก่า ถ้าใส่ต้องไม่อ้างว่าเป็นตำนาน |

> "เปรต" โซน 3 ใช้ `mob-pret` ต่อได้ถ้าจำเป็น แต่ดราวเกอร์ตรงกว่า · หลีกเลี่ยงผีเด็ก (útburðr) ตามธงของ Reese

### 4.5 ฉากในห้องสถานีโซน 3 (โหมดแก้ภาพ แนบ BG โซน 1)

ใช้ **ประโยคหลักเดียวกับข้อ 3.5** แล้วเติมบรรทัด CHANGE ข้างล่าง + บล็อกห้ามร่วม + บล็อกห้ามโซน 3

| ไฟล์ | แนบ | ชุด | บรรทัด CHANGE |
|---|---|---|---|
| `BG-Sala-west.webp` | `BG-Sala` | B | the interior becomes a long dim Norse timber hall: carved serpent-interlace posts, a central long hearth pit gone cold, shelves of blank wooden tally sticks and rolled hides, a dark wooden high seat at the top of the stairs, blue-grey light through the smoke-hole |
| `BG-Krata-west.webp` | `BG-Krata` | B | the cauldrons and furnaces become one wide round black-stone well of violently boiling dark water with thick white steam and coiling black serpents, the volcano becomes a glacier wall, NO fire anywhere, cold blue light |
| `BG-Dab-west.webp` | `BG-Dab` | B | the blade forest becomes an icy black stream running through a narrow poison-misted gully, swords and long knives lying blade-up under the clear water, frost on the boulders |
| `BG-Lokan-west.webp` | `BG-Lokan` | B | the ice prison becomes a hollow of black ice lost in thick freezing fog, dead frozen trees, no light source at all, only grey fog glow |
| `BG-Ngiw-west.webp` | `BG-Ngiw` | B | the thorn trees become a tall hall woven from giant serpent spines and ribs, green venom dripping from the roof into a poison stream, a dark shore of black sand in front |
| `BG-Tea-west.webp` | `BG-Tea` | C | the Thai pavilion becomes a warm corner of a Norse hall with fur-covered benches, a copper mead cauldron and a small stone hearth |
| `BG-Tarang-west.webp` | `BG-Tarang` | C | the gaol becomes a tall black iron spear-pointed gate between frosted stone posts, pale ghosts glowing behind the bars |
| `BG-Krajok-west.webp` | `BG-Krajok` | C | the mirror tower becomes a snowy burial mound with a plain uncarved standing stone and a crack glowing pale green, fog all around |
| `BG-Sawan-west.webp` | `BG-Sawan` | C | the Thai heaven gate becomes a gold-roofed hall on a snowy peak with warm golden light pouring from its doorway, golden clouds |

### 4.6 ใช้ของโซน 1 ซ้ำได้ (ไม่ต้อง gen) — โซน 3

| ของโซน 1 | ใช้แทน | ต้องทำอะไร |
|---|---|---|
| `mob-werewolf` | หมาเฮล / การ์ม | ไม่ต้องทำ |
| `st-tarang` | ประตูเฮล | ย้อมโทนเย็นด้วยโค้ด (น้ำเงินดำ) |
| `st-lan` | โม่กรอตติ | ใช้ได้ชั่วคราว (หลุมหินกลาง ๆ) |
| `st-tea` | ม้านั่งมี้ด | ใช้ได้ชั่วคราว — ช่อฟ้าไทยเห็นชัด ควร gen ภายหลัง |
| `hero-boss` | พญายม (พ่อ) | ไม่ต้องทำ ถ้าเลือกค่าตั้งต้น |
| `hero-yama-west` `crew-nira-west` | ตัวเรา · นิราชุดไวกิ้ง | มีแล้วใน `img/West/` (เช็กลายน้ำก่อน) |
| `fx-ice` | ทัณฑ์นิฟล์เฮล | ไม่ต้องทำ |
| `prop-boat` `item-*` `fx-*` `spirit*` `soul-*` `BG-Turn-Base` | เหมือนเดิม | ไม่ต้องทำ |

---

## 5. ทางเลือกอีกทาง (เรื่องที่คุณเป้ยังไม่ตัดสิน)

### 5.1 ยมทูต: ตัวใหม่ตามตำนาน (ค่าตั้งต้นในไฟล์นี้) หรือ ตัวเดิมเปลี่ยนชุด

| | ตัวใหม่ตามตำนาน (Reese) | ตัวเดิมเปลี่ยนชุด (แบบ `crew-nira-asia` ที่มีอยู่) |
|---|---|---|
| ข้อดี | ถูกตำนาน ผู้รู้เห็นแล้วเข้าใจทันที | ตรงกับโค้ด "คนติดตัวไปทุกโซน" · หน้าเดิม ผู้เล่นจำได้ · gen ง่ายกว่าเพราะแนบรูปเดิมได้ |
| ข้อเสีย | ต้องทำโปรไฟล์ + ท่าทำงานใหม่ตาม ไม่งั้นหน้าไม่ตรง (+11 ชิ้นต่อโซน) | ความเป็นญี่ปุ่น/นอร์สเหลือแค่ชุด |

**ถ้าเลือกเปลี่ยนชุด** — โหมดแก้ภาพ แนบ `img/crew-<k>.png` แล้วใช้
```
keep the exact same character, same face, skin color, horns, hair and the same chibi
head-to-body proportions as the reference image — change ONLY the outfit and the held item to: ...
```
| key | โซน 2 (ต่อท้าย "to: …") | โซน 3 (ต่อท้าย "to: …") |
|---|---|---|
| taan | a tiger-skin loincloth, a dark iron helmet with ox horns, a black iron three-pronged fork | a rusty chainmail shirt, a plain round iron helmet, an old notched axe |
| nira | มีแล้ว `crew-nira-asia` (กิโมโน) | มีแล้ว `crew-nira-west` (ผ้าคลุมขนสัตว์) |
| kan | deep indigo Chinese court robe and tall black official's cap, a round crystal lens | a heavy fur mantle over a wool tunic, a tall plain wooden staff |
| plerng | a tiger-skin loincloth, a spiked black iron club | a dark iron belt, bare arms, a burning pine torch |
| boon | a plain grey robe, a lotus and an incense stick | a white linen tunic, a folded linen cloth |
| dam | a patched straw-rope loincloth, firewood bundle on his back | a drab grey wool tunic, pine logs on his back |
| guard | dark iron lamellar armor with vermilion cords, a long spear | a mail shirt, round iron helmet without horns, spear and plain round shield |

### 5.2 บอสโซน 3
- **ค่าตั้งต้น (Reese แนะนำ):** พญายมเป็นพ่อเหมือนเดิม ใช้ `hero-boss.png` · เฮลเป็นเจ้าสาขา = `npc-hel-west` (ชุด C โค้ดต้องมีช่องใหม่)
- **อีกทาง:** เฮลเป็นบอส → ใช้ prompt `npc-hel-west` แต่เซฟเป็น `hero-boss-west.png` ทับตัวแบบโอดิน + แก้บท DAD / ORDER_WARN ของโซนนี้ให้เป็นเสียงผู้หญิง

### 5.3 บุญโซน 3
- **ค่าตั้งต้น:** นันนา (Reese เอนไปทางนี้) — **บทพูดของบุญในโค้ดใช้ "ผม...ครับ"** ต้องเปลี่ยนสรรพนามในโซนนี้
- **อีกทาง บัลเดอร์ (คงเพศชาย):** `Baldr, the shining god: a young man with golden hair whose face and skin softly glow with warm light, a plain white linen tunic, holding a small bowl of warm light in both hands, gentle serene smile` — ห้ามถือกิ่งมิสเซิลโท (อาวุธที่ฆ่าเขา) ห้ามทำเป็นตัวตลก

### 5.4 กานต์โซน 3
- **ค่าตั้งต้น:** þulr ชาย (คงเพศเดิม) — ใส่ `both eyes clearly visible, bareheaded` ไว้แล้ว กันไม่ให้ดูเป็นโอดิน
- **อีกทาง völva หญิง:** `a völva seeress: a woman in a black hooded cloak trimmed with pale fur, holding a tall iron staff topped with a plain brass knob, pale unsettling eyes, a pouch of charms at her belt` — ข้อควรรู้: หอส่องกรรมโซน 3 เป็น "เนินหลุมหมอดู (völva)" อยู่แล้ว ถ้ากานต์เป็น völva ด้วย ธีมจะซ้ำกัน

### 5.5 โซน 2 ญี่ปุ่นล้วน
- **ค่าตั้งต้น:** ญี่ปุ่นล้วน ทุก prompt ในไฟล์นี้เขียนแบบนี้ (ศาลขุนนางจีนยังอยู่ เพราะภาพนรกญี่ปุ่นดั้งเดิมวาดขุนนางแบบจีนเสมอ)
- sub ใน `ZONES` ยังเขียน "จีน · ญี่ปุ่น · เกาหลี · อินเดีย" → ต้องแก้เป็น "สาขาจิโงกุ (ญี่ปุ่น)"
- **อีกทาง (รวมหลายชาติ):** ต้องให้ Reese วิจัยจีน/เกาหลี/อินเดียเพิ่มก่อน และงบรูปจะเพิ่มอีกราว 8-10 ชิ้น

---

## 6. งบรูปรวม

| | โซน 2 | โซน 3 |
|---|---|---|
| **ชุด A** ขาดไม่ได้ | 12 — ฉาก 1 · sala · krata · dab · lokan · ngiw · ยมทูต 6 | 12 — เหมือนกัน |
| **ชุด B** ใช้โซน 1 ไปก่อนได้ | 11 — lan · krajok · sawan · ยาม · ผี 2 · ฉากห้อง 5 | 11 — เหมือนกัน |
| **ชุด C** เก็บตก | 9 — tea · tarang · บอสเอ็นมะ · ผี 2 · ฉากห้อง 4 | 10 — tea · tarang · เฮล · ผี 3 · ฉากห้อง 4 |
| C เพิ่ม ถ้าเลือก "ตัวใหม่ตามตำนาน" | +11 — โปรไฟล์ 7 · ท่าทำงาน 4 | +11 |

- A+B = **23 ชิ้นต่อโซน** (ตรงกับที่ Reese ประเมิน 22-24)
- น้ำหนักประมาณ **4-5 MB ต่อโซน** (ใช้ค่าเฉลี่ยโซน 1 ราว 0.18 MB/ไฟล์) — สองโซนรวมยังต่ำกว่าเพดาน 50 MB มาก
- ลำดับ gen ที่แนะนำ: ฉากโซน → sala → สถานีทัณฑ์ 4 → ยมทูต 6 → ชุด B
- อัตรา 6-10 ชิ้นต่อสัปดาห์ของ Toby → ชุด A ของหนึ่งโซนใช้ราว 1.5-2 สัปดาห์

**โปรไฟล์ (C)** — โหมดแก้ภาพ แนบ 2 รูป: สไปรท์ใหม่ + `img/crew-<k>-profile.png` โซน 1
```
Make a bust portrait of the character in image 1, using exactly the framing, camera distance,
lighting and pixel style of image 2. Keep image 1's face, colors, outfit and props exactly.
Replace the background with [โซน 2: a hazy Jigoku landscape of sword mountains, iron cauldrons
and vermilion court pillars | โซน 3: a foggy black-ice landscape with a dark river and a
gold-railed bridge far away]. Square, full background, no text.
```
**ท่าทำงาน (C)** — ใช้วิธีของ ASSET-PROMPTS ชุดที่ 4 เป๊ะ ๆ (แนบสไปรท์โซนใหม่ + ประโยคล็อกตัวละคร + ท่าเดียวกับโซน 1) · **โซน 3 ทัณฑ์กับเพลิง:** เปลี่ยน "fire pit / cauldron" เป็น "boiling spring"

---

## 7. ส่งต่อ Toby (เรื่องโค้ดที่รูปชุดนี้ต้องใช้)

1. **ต่อสายโฟลเดอร์โซน** — หา `img/Asia/<key>-asia.png` / `img/West/<key>-west.png` ก่อน ไม่เจอค่อยใช้ `img/<key>.png` · ตอนนี้โค้ดยังไม่อ่านโฟลเดอร์นี้ · `prep-art.py` ต้องอ่านโฟลเดอร์ย่อยด้วย
2. **กันหน้าไม่ตรง** — ถ้ามีสไปรท์ยมทูตของโซนแต่ยังไม่มีท่าทำงาน/โปรไฟล์ของโซน **อย่าสลับไปใช้ท่าทำงานโซน 1** (จะกลายเป็นคนละตัว) ให้ใช้ท่ายืนของโซนแทน
3. **กระทะโซน 3 ไม่มีไฟ** — `krata` มี `fire:true` ใช้ฟืน 1.4 และวาด fx ไฟ · โซน 3 ควรเปลี่ยนเป็นไอน้ำ ส่วนเรื่องกินฟืนเป็นเรื่องออกแบบเกม ไม่ใช่เรื่องรูป
4. **walk.js** — เช็กว่าอ่านสีลาวาจาก `scene.png` ใบเดียวหรือจากฉากโซน ถ้าจากฉากโซน ต้องตั้งให้อ่านธารพิษเขียวของโซน 3 ได้
5. **ผีใหม่** — เพิ่มใน `MOB.kinds` แล้วใส่ index ใน `ZONES[].mobs` ของโซนนั้น
6. **ข้อความโซน** — แก้ sub ใน `ZONES` (โซน 2 "สาขาจิโงกุ (ญี่ปุ่น)" · โซน 3 "สาขาเฮล (นอร์ส)") · ถ้าบุญเป็นนันนา ต้องเปลี่ยนสรรพนาม
7. **ASSET-PROMPTS.md ข้อ 5.4** (prompt scene-asia/scene-west เดิม) มีคำสั่งให้ใส่โทริอิกับรูปปั้นจิโซ — ควรลบแล้วชี้มาที่ไฟล์นี้แทน

## เช็กก่อนส่งเข้าเกม (เพิ่มจากของโซน 1)
- [ ] ไม่มีตัวอักษร คันจิ หรือรูน **แม้แต่ลายที่ดูคล้าย** บนป้าย ม้วนหนังสือ โล่ หิน
- [ ] ไม่มีลายน้ำ Gemini (ดาวสี่แฉกมุมขวาล่าง) และพื้นใสจริง ไม่ใช่ลายตารางที่ติดมาเป็นพิกเซล
- [ ] โซน 2: ไม่มีโทริอิ จิโซ 卍 กองหินริมน้ำ · โซน 3: ไม่มีหมวกมีเขา สัญลักษณ์ต้องห้าม ไม่มีตัวที่ดูเป็นโอดิน
- [ ] ฉากโซนวางซ้อน `scene.png` แล้วผังตรงกันทุกจุด · ฉากห้องวางซ้อน BG โซน 1 แล้วพื้นที่เดินอยู่ที่เดิม
- [ ] สถานีวางเรียงกันแล้วสัดส่วนตรงตาราง 2.1
