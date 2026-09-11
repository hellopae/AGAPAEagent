# AVEGEE — prompt รูปโซน 2 (บูรพา · เอเชียรวม เปลือกหลักจิโงกุ) และโซน 3 (ปัจฉิม · เฮล นอร์ส)

**ผู้ทำ:** Mind · **วันที่:** 10 ก.ย. 2569
**อ้างอิง:** Reese `Output/Reese/2026-09-10-avegee-zone2-3-research.md` (ตาราง + ธงวัฒนธรรม) ·
`AVEGEE/ASSET-PROMPTS.md` (รูปแบบโซน 1) · Toby `Output/Toby/2026-09-05-game-feasibility-v2.md` (กฎอาร์ต) ·
`AVEGEE/src/data.js` `src/art.js` `src/scene.js` (คีย์และการโหลดรูปจริง) · `img/manifest.json`

**r2 (11 ก.ย. 2569)**
- **แก้ตาม Chris** `Output/Chris/2026-09-10-avegee-monk-zone23-qa.md` ชิ้นที่ 2: B2 (ห้ามอีกา/นก + AVOID โซน 3) · W1 ริมฝั่งซันซุไม่มีกรวด · W2 ผิวศพฟ้า-เทา แทน blue-black ·
  W3 ประตูเทวภูมิ · W6 ธงบท 2 ข้อ (§8) · Note 1-4 · Mind เพิ่มเอง: st-dab-asia ระบุว่าด้ามจมหิน · เอาไม้เท้าหัวคนของเอ็นมะออก (ย่อแล้วอ่านเป็นหัวคนถูกตัด)
- **เจ้าของตัดสิน 11 ก.ย.** (ส่งผ่าน Claudy): บอสแยกโซน (เอ็นมะ / เฮล) · บุญโซน 3 = บัลเดอร์ · กานต์โซน 3 = เวิลวา (völva) · ชื่อโซนคง "บูรพา/ปัจฉิม" · โซน 2 เป็นเอเชียรวม ·
  **ตัวละครและฉากใหม่ทั้งหมด** คงไว้แค่ยมบาทกับนิราที่มีชุดของโซนแล้ว → ยกเลิกแนวใช้รูปโซน 1 ซ้ำ เพิ่ม prompt ครบทุกชิ้น + หัวข้อขนาดไฟล์ (§7)
- รูปที่ gen ไปแล้วก่อน prompt แก้ ดู **§10 ท้ายไฟล์**

---

## 0. สรุปสั้นสำหรับคุณเป้

- **โซน 2 บูรพา** = เอเชียรวม · เปลือกหลักเป็นนรกญี่ปุ่นแบบม้วนภาพสมัยเฮอัน (ศาลขุนนางจีน ยักษ์โอนิ) แล้วเติมกลิ่นจีน-เกาหลี-อินเดียในชิ้นใหม่ที่ไม่เพิ่มความเสี่ยง: ผีกระโดด (จีน) · ด็อกแกบี (เกาหลี) · วิญญาณในคิวคละสี่ชาติ · นั่งร้านไม้ไผ่ · เรือแจวแบบจีน · **ไม่มีรูปเคารพพุทธหรือฮินดูเลย**
- สถานีโซน 2: กระทะ→หม้อเหล็กยักษ์ · ป่าดาบ→ภูเขาดาบ · โลกันต์→นรกบัวแดง · งิ้ว→ป่าใบมีด · ลานตรากตรำ→เชือกเหล็กดำ · หอทะเบียน→ศาลยมแบบจีน · หอส่องกรรม→กระจกโจฮาริ · ตะราง→คุกไม้ · ศาลาน้ำชา→โรงน้ำชา · ประตูสวรรค์→**ประตูเทวภูมิ** (สะพานทองขึ้นเมฆม่วง)
- ยมทูตโซน 2: ทัณฑ์→โกซุหัววัว · กานต์→โดเมียวเสมียนชาย · เพลิง→ยักษ์แดง · บุญ→ยักษ์ฟ้าใจดี · ดำ→ยักษ์จิ๋ว · ยาม→เมซุหัวม้า · **นิราตามไปในชุดกิโมโนที่มีแล้ว** · **บอส = เอ็นมะ** (ผู้พิพากษาชุดขุนนางจีน)
- **โซน 3 ปัจฉิม** = แดนคนตายนอร์ส (เฮล): น้ำแข็งดำ หมอกเทา ธารพิษเขียว ทองมีแค่ที่สะพานกับกิมเล · **ไม่มีไฟลงทัณฑ์เลย**
- สถานีโซน 3: กระทะ→บ่อเดือดคำราม (Hvergelmir — น้ำเดือดมีงู ไม่มีไฟ) · ป่าดาบ→ธารดาบสลีดร์ · โลกันต์→หุบหมอกนิฟล์เฮล · งิ้ว→โถงกระดูกงูนาสตรอนด์ · ลาน→โม่ยักษ์กรอตติ · หอทะเบียน→โถงไม้ของเฮล · ตะราง→ประตูเหล็กเฮล · หอส่องกรรม→เนินหลุมหมอดู · ศาลาน้ำชา→ม้านั่งมี้ด · ประตูสวรรค์→โถงหลังคาทองกิมเล
- ยมทูตโซน 3: ทัณฑ์→ดราวเกอร์ศพเฝ้าเนิน · กานต์→**เวิลวา หมอดูหญิง** · เพลิง→ยักษ์ไฟมุสเปล · บุญ→**บัลเดอร์** · ดำ→กังลาติคนรับใช้ขี้เกียจ · ยาม→โมดกุดร์หญิงเฝ้าสะพาน · **นิราตามไปในชุดขนสัตว์ที่มีแล้ว** ·
  **บอส = เฮล** ผู้ครองแดนของตัวเองที่เปิดให้สำนักยมบาทมาตั้งสาขา **ไม่ใช่ลูกน้องของพญายม**
- **งบรูป: ครบชุด 59 ชิ้นต่อโซน** (ชุด A ขาดไม่ได้ 25 · ชุด B 34) · สองโซน 118 ไฟล์ ประมาณ **+22 ถึง 23 MB** → รวมทั้งเกมราว **38 MB จากเพดาน 50 MB** (§7)
- **ต้องแก้ของที่มีอยู่ก่อนเข้าเกม:** `hero-yama-asia` กับ `hero-yama-west` (และโปรไฟล์ทั้งคู่) **มีคันจิ 知識 บนปกสมุด** · ชุดโซน 3 **ใส่หมวกมีเขา** · โปรไฟล์โซน 3 มี **ลายคล้ายรูนบนหินฉากหลัง** (§5.4)
- **ของที่ต้องทิ้ง:** `img/scene-asia.png` `img/scene-west.png` ตัวเก่า · `img/Asia/hero-boss-asia.png` (ซามูไร) · `img/West/hero-boss-west.png` (ดูเป็นโอดิน)

---

## 1. สำรวจของที่มีก่อนเขียน (Step 0)

| ที่เจอ | ความหมาย |
|---|---|
| `img/scene-asia.png` `img/scene-west.png` มีอยู่แล้ว | **ต้อง gen ใหม่ทั้งคู่** — เป็นมุมเอียงไอโซเมตริกคนละผังกับ `img/scene.png` (ผังโซน 1 เป็นมุมบนลงล่าง) พิกัดใน data.js จะไม่ตรง · scene-asia มี **โทริอิ + รูปปั้นจิโซ + เทพหลายกร** ผิดธงข้อ 1-2 ของ Reese · prompt เดิมใน ASSET-PROMPTS 5.4 สั่งให้ใส่ของพวกนี้เอง ต้องยกเลิก prompt 5.4 |
| `img/Asia/` มี `crew-nira-asia` `hero-yama-asia` `hero-yama-asia-profile` `hero-boss-asia` · `img/West/` มีชุดคู่กัน · ของโซน 2 ที่ gen เพิ่มแล้ว: `st-dab-asia` `st-sawan-asia` `crew-boon-asia` `mob-kasha-asia` | ใช้รูปแบบชื่อที่คุณเป้ตั้งไว้ต่อ (ข้อ 2) · สภาพของแต่ละใบดู §10 |
| `hero-yama-asia/-west` + โปรไฟล์ (เปิดดู 11 ก.ย.) | สมุดที่กอดมี **คันจิ 知識** ทั้ง 4 ใบ · ชุดโซน 3 เป็น **หมวกมีเขาโค้งใหญ่** · โปรไฟล์โซน 3 มี **ลายคล้ายรูน** บนหินและขอบบ่อในฉากหลัง → แก้ตาม §5.4 |
| `crew-nira-west.png` | รอบแรกเห็นดาวสี่แฉกมุมขวาล่าง · **พรีวิว 11 ก.ย. ไม่เห็นแล้ว** น่าจะแก้ไปแล้ว ยังควรเช็กตอนรัน prep-art |
| โค้ดใน `src/` **ยังไม่อ่านโฟลเดอร์ Asia/West เลย** | ต้องให้ Toby ต่อสาย (§8) — ตอนนี้ทุกชิ้นของโซนใหม่เป็นของใหม่หมด ไม่มีการถอยไปใช้รูปโซน 1 แล้ว |
| ฉากในห้อง `BG-<Key>.webp` และ `BG-Turn-Base.webp` เป็นภาพเต็มใบ | จุดยืนใน `ROOMS` เป็นสัดส่วน 0-1 ของภาพ → ต้อง **ใช้โหมดแก้ภาพจากไฟล์โซน 1** เพื่อคงองค์ประกอบ · `BG-Turn-Base` (ฉากต่อสู้) มีรูปปั้นยักษ์ไทย ต้องทำใหม่ต่อโซน |
| `st-building.png` (ไซต์ก่อสร้าง) มี **ปั้นจั่นหัวนาค** · `prop-boat.png` เรือหัวนาค | เป็นเปลือกไทย ต้องทำใหม่ต่อโซน · `prop-boat` วาดบนแม่น้ำจริง (`drawBoat` ใน art.js) |
| `tile-*` ใช้เฉพาะตอนฉากโหลดไม่ขึ้น (`drawFallbackGround`) · `item-*` `fx-*` เป็นของเล่นในเกม · `soul-*` เป็นวิญญาณของคดีที่มีชื่อ (เรื่องไทยใน `cases.js`) · `cover` ใช้ทั้งเกม | **ใช้ร่วมทุกโซน ไม่ต้องทำใหม่** (ข้อ 2.3) |
| `spirit1-10` = วิญญาณสุ่มในคิว เป็น **คนไทย** ทั้งหมด และมีตาราง `SPIRIT_OF` `SPIRIT_SEX` ผูกเลขรูปกับอาชีพ/เพศ | ทำใหม่ต่อโซน 10 ใบ **คงแบบคนเดิมทุกเลข** (เพศ วัย อาชีพ) → โค้ดใช้ตารางเดิมได้เลย |

---

## 2. กติกาใช้ร่วมทั้งสองโซน

**ชื่อไฟล์** (ยึดรูปแบบที่คุณเป้ตั้งไว้แล้ว เช่น `hero-yama-asia-profile`) — ชื่อหลัก + โซน + ท่า
- โซน 2: `img/Asia/<ชื่อหลัก>-asia[-ท่า].png` เช่น `st-krata-asia.png` `crew-taan-asia.png` `crew-taan-asia-work.png` `crew-taan-asia-profile.png` `hero-yama-asia-atk.png` `spirit3-asia.png` `BG-Krata-asia.webp`
- โซน 3: `img/West/<ชื่อหลัก>-west[-ท่า].png` (zone k ในโค้ดคือ `west` · ชื่อไทยคง "โซนปัจฉิม")
- ฉากโซน: `scene-asia.png` / `scene-west.png` **1527×704 พื้นทึบ** (ทับของเดิม)

**วิธี gen มี 3 แบบ**
1. **ชิ้นพื้นใส** (สถานี ยมทูต ผี วิญญาณ ของประดับ) — บล็อกสไตล์ของโซน + prompt ต่อท้าย + บล็อกห้าม (ข้อ 2.2)
2. **ฉากโซน** — **โหมดแก้ภาพ แนบ `img/scene.png`** เท่านั้น ห้าม gen จาก prompt เปล่า (บทเรียนจาก scene-asia ที่ผังหลุด)
3. **แก้ภาพจากไฟล์โซน 1** — ฉากในห้อง (`BG-<Key>.webp`) · ฉากต่อสู้ (`BG-Turn-Base.webp`) · ไซต์ก่อสร้าง · เรือ · บอส · โปรไฟล์ · ท่าทำงาน (แนบไฟล์โซน 1 เป็นกรอบเสมอ)

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
| `st-building` | เท่าไฟล์โซน 1 | แนบ `img/st-building.png` (โหมดแก้ภาพ) |

> ได้รูปจริงแล้ว Toby ต้องวัด `bx/by/bw/hit/sx/sy` ใหม่ถ้าสัดส่วนเนื้อภาพต่างจากโซน 1 เกิน ~10%

### 2.2 บล็อกห้าม — ต่อท้าย **ทุกชิ้น** (ใช้ทั้งสองโซน)

```
AVOID: any text, letters, numbers, calligraphy, kanji, hangul, devanagari, runes, or glyph-like
marks anywhere — including on signs, scrolls, books, book covers, banners, lanterns, shields,
stones and clothing; watermark, signature, logo, UI; checkerboard pattern baked into the background;
more than one pose or animation frames; blood, gore, exposed organs, rotting flesh, severed heads;
photorealism, 3D render, painterly blur
```

แล้วต่อด้วยบล็อกห้ามของโซนนั้น (ข้อ 3.2 / 4.2)

### 2.3 ใช้ร่วมทุกโซน ไม่ต้องทำใหม่

| ของ | เหตุผล |
|---|---|
| `hero-yama-*` `crew-nira-*` ของแต่ละโซน | เจ้าของให้ตามไปในชุดของตัวเอง — มีแล้ว (ต้องแก้ตาม §5.4) |
| `item-*` `fx-*` | ของในระบบเกม ไม่ใช่ตัวละครหรือฉาก |
| `soul-*` 11 ใบ | วิญญาณของคดีที่มีชื่อใน `cases.js` เป็นเรื่องไทยทั้งหมด **ถ้าเจ้าของอยากได้คดีประจำโซน ต้องเขียนเรื่องก่อน (Rae/Toby) แล้วค่อยทำรูป** |
| `tile-*` | ใช้เฉพาะตอนฉากโหลดไม่ขึ้น |
| `cover` | หน้าปกทั้งเกม |
| `prop-lantern` | ไฟล์เป็นลายปูซ้ำของโคม ไม่เจอจุดที่ scene.js / art.js เรียกใช้ (รอบนี้ค้นทั้งโปรเจกต์ไม่ได้) ถ้า Toby ยืนยันว่าไม่ได้ใช้ ก็ไม่ต้องทำ |

---

## 3. โซน 2 — บูรพา (เอเชียรวม · เปลือกหลักจิโงกุ) · ไฟล์ต่อท้าย `-asia`

### 3.1 บล็อกสไตล์โซน 2

**(ก) ยมทูต ผี วิญญาณ ของประดับ** — แปะนำหน้า
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
swastika-like symbol or fret pattern; rising-sun ray pattern; Jizo / Ksitigarbha statue or any
monk figure holding a ringed staff and jewel; Buddha, Amida or bodhisattva figure, statue or relief;
any Hindu god or goddess figure; many-armed or many-headed figures; child ghosts; small stacked
pebble cairns by a river; samurai armor on the judge; ninja; geisha
```

เหตุผลแต่ละข้อ (จาก Reese ข้อ 5 ญี่ปุ่น + เจ้าของ 11 ก.ย.)
- โทริอิ ห่วงเชือก shimenawa กระดาษ shide = ของชินโต ไม่ใช่นรกพุทธ
- จิโซ = ผู้โปรดสัตว์และร่างเดิมของเอ็นมะ **ตัดออกทั้งหมด** ไม่ใส่แม้เป็นรูปปั้นประดับ
- 卍 ผู้เล่นต่างชาติเห็นเป็นนาซี (ลายกรอบเหลี่ยมแบบจีนก็กลายเป็น 卍 ได้ จึงห้ามลายนั้นด้วย) · ลายอาทิตย์อุทัยแผ่รัศมีเป็นประเด็นอ่อนไหวในเกาหลี/จีน (เพิ่มโดย Mind)
- **ห้ามรูปเคารพพุทธและฮินดูทุกแบบ** (เจ้าของสั่ง 11 ก.ย. เมื่อโซนนี้เป็นเอเชียรวม) — ฉากเก่ามีเทพหลายกรเป็นของประดับนรก คือสิ่งที่ต้องกันไม่ให้เกิดซ้ำ
- **กองหินเตี้ยริมแม่น้ำ** = ภาพ Sai no Kawara (เด็กกองหิน) — ฉากที่ Reese ร่างไว้มี "หินกองเตี้ย ๆ" ริมฝั่ง **Mind ตัดออก** เพราะขัดธงข้อ 4 ของ Reese เอง
- ห้ามวาดองค์พระอมิตาภะ · เอ็นมะต้องเป็นผู้พิพากษา ไม่ใช่ปีศาจ ไม่ใช่ซามูไร

### 3.3 ฉากโซน 2 — `scene-asia.png` (A)

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
- RIVER along the bottom: the Sanzu river — a lighter shallow ford band of pale rippling water over
  smooth dark sand, no pebbles, no stones on the shore, a deep dark fast current beyond it with two or
  three black water serpents, a faint gold shimmer on the surface. Keep the ghost wisps in the water.
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

### 3.4 สถานีโซน 2 (บล็อก ข + สัดส่วนข้อ 2.1 + บล็อกห้ามร่วม + บล็อกห้ามโซน 2)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `st-sala-asia` | ศาลยมราช (หอทะเบียน) | A | the court of King Enma used as a hall of records: a Tang-dynasty Chinese magistrate's hall on a raised stone base, vermilion lacquered pillars, white plaster walls, a sweeping dark green glazed-tile roof with upturned eaves and plain gold ridge ends, a wide stone staircase at the front, closed heavy vermilion double doors with gold studs, a row of black lacquered document chests along one side, two plain blank white paper lanterns at the corners, slightly wider than tall |
| `st-krata-asia` | หม้อเดือดเคียวคัง | A | the great boiling cauldrons of the Screaming hell: one enormous black iron cauldron in the middle with a smaller one on each side, all sitting in a row on square black stone furnaces with roaring orange fire in their mouths, dark liquid boiling with thick white steam, heavy iron ring handles, a long wooden stirring pole leaning on the middle rim, a small iron balance scale with a heap of glowing red-hot iron weights beside it, wide and low, about twice as wide as tall |
| `st-dab-asia` | ภูเขาดาบ | A | the Mountain of Swords: a low jagged ridge of black volcanic rock bristling with dozens of straight upright swords driven in hilt-first, hilts and crossguards buried in the rock so only the bare blades show and every blade points to the sky, packed densely like a forest, blade tips glowing dull red with heat, cold steel glints, very wide and very low, a single row |
| `st-lokan-asia` | นรกบัวแดง | A | the Crimson Lotus cold hell: a thick low slab of pale blue glacier ice cracked into sharp shards, with five or six large crystal formations of deep crimson ice splitting open like red lotus flowers in full bloom, frost haze drifting across, hard cold white rim light, beautiful and cruel, no figures inside the ice, wide and low |
| `st-ngiw-asia` | ป่าใบมีด | A | the Blade-Leaf Forest: a tight grove of three tall slender trees with black iron trunks, every leaf a small sharp steel knife blade glinting silver, fallen blade-leaves scattered around the roots on cracked red-glowing soil, a faint pink-red haze at the treetops, taller than wide |
| `st-lan-asia` | เชือกเหล็กดำ | A | the Black Rope hell labour yard: two small black iron crags facing each other, a taut red-hot glowing iron chain-rope strung between their peaks, three heavy black iron blocks with rope carrying-harnesses lying at the foot, a sunken square pit of glowing embers below the rope, small and nearly square |
| `st-krajok-asia` | กระจกโจฮาริ | A | the Crystal Mirror of Enma: a large perfectly round mirror of clear crystal glass mounted in a tall carved dark wooden stand shaped like swirling clouds, a stepped vermilion lacquered base, the mirror surface glowing with soft moving silver light but showing no picture, a small bronze incense burner at the foot, tall and narrow, about twice as tall as wide |
| `st-sawan-asia` | ประตูเทวภูมิ (สะพานทอง) | A | the golden way up to the heavenly realm: a short steep arched bridge of gold inlaid with small jewels in seven colors rising up toward a two-storey Buddhist temple gate with dark tiled double roofs, the gate opening flooded with warm white-gold light, soft dusky purple clouds wrapped around the upper half, no figure, no statue inside the gate, it must look clean and bright — the only structure in the zone that is not black or burning, taller than wide |
| `st-tea-asia` | โรงน้ำชา | A | a small Japanese roadside teahouse: an open-fronted wooden hut with a thick thatched straw roof, a low bench covered in plain red felt cloth, an iron kettle hanging over a small charcoal hearth, a plain unmarked indigo curtain across the doorway, one blank white paper lantern, nearly square |
| `st-tarang-asia` | คุกศาลยม | A | an old Japanese wooden jail: a long low building whose front wall is a lattice cage of thick square dark timber bars, a heavy crossbeam door with a black iron lock, a dark tiled roof, pale ghost light leaking between the bars, long and low, about twice as wide as tall |
| `st-building-asia` | ไซต์ก่อสร้าง | A | **โหมดแก้ภาพ แนบ `img/st-building.png`** · `keep the exact same construction site layout, footprint, size, camera angle and the translucent ghost workers — change ONLY the cultural dressing: the naga-headed Thai crane becomes a plain bamboo-and-rope crane with a wooden pulley, bamboo scaffolding lashed with rope around the posts, grey stone blocks and dark timber beams, no carvings, no dragon or naga heads` (ต่อบล็อกห้ามทั้งสอง) |

### 3.5 ยมทูตโซน 2 (บล็อก ก + บล็อก ค)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `crew-taan-asia` | ทัณฑ์ → โกซุ ยมบาลหัววัว | A | Gozu, the ox-headed hell warden: a stocky muscular jailer with the head of a dark brown ox, thick curved horns with one tip chipped, an iron nose ring, old battle scars on his arms, bare chest, a tiger-skin loincloth, a heavy black iron three-pronged fork resting on his shoulder, grumpy tired veteran expression |
| `crew-nira-asia` | นิรา (ชุดกิโมโน) | — | **ใช้ไฟล์ที่มีแล้ว** — เจ้าของให้นิราตามไปในชุดของตัวเอง · prompt โดโชเสมียนหญิงที่เคยเขียนไว้ **ยกเลิก** |
| `crew-kan-asia` | กานต์ → โดเมียว เสมียนชาย | A | Dōmyō, a male recording spirit of the underworld court: a young man in deep indigo Tang-dynasty court robes with a tall black official's cap, sharp narrow observant eyes, holding a round polished crystal lens over a half-open blank scroll, calm thoughtful expression |
| `crew-plerng-asia` | เพลิง → ยักษ์แดง | A | an eager young red oni: bright red skin, one short horn on the forehead, wild curly black hair, a tiger-skin loincloth, a big toothy grin with small fangs, a spiked black iron club slung over one shoulder, tiny flames licking at his bare feet |
| `crew-boon-asia` | บุญ → ยักษ์ฟ้าใจดี | A | a gentle blue oni: soft pale blue skin, two small blunt horns, kind droopy eyes and a sad small smile, a plain grey sash tied at the waist over a short grey hip wrap, not a robe, bare shoulders, holding a single pink lotus flower and one smoking incense stick together in both hands |
| `crew-dam-asia` | ดำ → ยักษ์จิ๋ว | A | a small scruffy little oni: grey-green skin, two tiny nub horns, round belly, a patched straw-rope loincloth, a big bundle of firewood tied to his back with rope, mid-yawn with sleepy half-lidded eyes |
| `crew-guard-asia` | ยักษ์ทวารบาล → เมซุ หัวม้า | A | Mezu, the horse-headed hell warden standing guard: tall and broad, the head of a grey-black horse with a wild shaggy mane, dark iron lamellar armor with vermilion cords, holding a long straight spear upright, stern alert posture — **taller than the crew, about 4 heads tall** (ใช้สัดส่วนเดียวกับ `crew-guard.png` ไม่ใช่บล็อก ค) |

> กลิ่นจีนมีอยู่แล้วในชุดนี้: โกซุ-เมซุ (牛頭馬面) คือคู่ผู้คุมที่คนจีนรู้จักเหมือนกัน · เสมียนกับศาลเป็นขุนนางจีนสมัยถัง

### 3.6 บอสโซน 2 — เอ็นมะ (A) · `hero-boss-asia.png` + โปรไฟล์ (B, §5.1)

**โหมดแก้ภาพ แนบ `img/hero-boss.png`** (ใช้เป็นกรอบเท่านั้น) + บล็อกห้ามทั้งสอง
```
Use the reference image ONLY for framing, pose, camera angle, chibi head-to-body proportions,
canvas size, background treatment and pixel style — replace the character and the throne completely.
Enma, king-judge of hell, seated upright and front-facing on a tall vermilion lacquered Chinese
magistrate's chair with a plain gold back: stern red face, thick black eyebrows, full black beard,
crimson Chinese imperial-official robes with gold trim and wide sleeves, a tall black official's
crown with a flat top board and a plain blank gold plaque on the front, holding a flat wooden court
tablet upright in both hands, dignified judge — not a demon, no horns, no fangs, no samurai armor,
no weapon, no staff, no severed heads. Single figure with the throne, centered.
```
- **อย่าใช้ `img/Asia/hero-boss-asia.png` ตัวซามูไรที่มีอยู่เด็ดขาด** — ย้ายออกจาก `img/Asia/` ไปเก็บที่ `img/raw/_old/` จะได้ไม่ถูกโหลดและไม่กินงบ
- ตัดไม้เท้าหัวคน (人頭杖) ออกจาก prompt รอบก่อน: ย่อลงขนาดจริงในเกมแล้วอ่านเป็นหัวคนถูกตัดเสียบไม้ได้ ตัวตนของเอ็นมะยังอ่านออกจากมงกุฎ ชุดขุนนาง และแผ่นไม้

### 3.7 ผีก่อกวนโซน 2 (บล็อก ก ไม่ต้องใส่ chibi) — 6 ตัว

| key | ชื่อไทย | ชาติ | ชุด | prompt ต่อท้าย |
|---|---|---|---|---|
| `mob-gaki-asia` | กากิ เปรต | ญี่ปุ่น (เปรตมีทั่วเอเชีย) | A | a hungry ghost from a Heian hell scroll: skeletal limbs, huge swollen belly, very thin neck, pale ash-grey skin, tiny ragged loincloth, crouching and reaching |
| `mob-harikuchi-asia` | เปรตปากรูเข็ม | ญี่ปุ่น | A | a needle-mouth hungry ghost: extremely tall and thin, a huge swollen belly, a tiny mouth no bigger than a pinhole on a long gaunt face, long bony clawed fingers reaching forward, pale grey-green skin, tattered loincloth, hunched forward |
| `mob-kasha-asia` | คาชะ แมวไฟขโมยศพ | ญี่ปุ่น | A | Kasha, a large black cat demon wreathed in orange flames, a single tail, one paw on a small burning cart wheel, crouched ready to pounce, glowing yellow eyes, arched back |
| `mob-nukekubi-asia` | นุเคะคุบิ หัวหลุดลอย | ญี่ปุ่น | A | Nukekubi: the floating detached head of a pale woman with long loose black hair streaming behind her, sharp eyes and a sly grin, a thin ghostly wisp trailing from the neck, no body, no blood |
| `mob-jiangshi-asia` | เกียงซี ผีกระโดด | จีน | A | a Chinese jiangshi hopping corpse: stiff pale grey-green skin, a plain dark Qing-dynasty official's robe with no badge and a round official's hat, both arms stretched straight forward, caught mid-hop with both feet together off the ground, long fingernails, blank staring eyes, no paper talisman, no paper strip on the face, eerie but not gory |
| `mob-dokkaebi-asia` | ด็อกแกบี | เกาหลี | A | a Korean dokkaebi goblin: a stocky mischievous goblin with shaggy wild hair tied in a messy topknot, a big toothy grin, NO horns (must not look like a Japanese oni), a patched plain hanbok vest and baggy trousers, swinging a knobbly wooden club, bare feet, crouched ready to leap |
| `mob-hitodama-asia` | ดวงไฟวิญญาณ | ญี่ปุ่น | C (ไม่บังคับ) | a hitodama soul-fire: a floating pale blue-white fireball with a long wavy tail, soft inner glow, no face, eerie and quiet |

- **เกียงซี:** ห้ามยันต์กระดาษบนหน้า เพราะ AI จะเขียนตัวอักษรมั่วลงไปเกือบแน่นอน · ห้ามวาดตราปักบนอกเสื้อ (ลายนก/ตัวอักษร) · ท่ากระโดดแขนเหยียดก็อ่านออกว่าเป็นเกียงซีแล้ว
- **ด็อกแกบี:** ภาพด็อกแกบีมีเขาแบบโอนิเป็นภาพที่ติดมาจากยุคอาณานิคมญี่ปุ่น คนเกาหลีวิจารณ์เรื่องนี้อยู่ จึงสั่ง `NO horns` · ในนิทานเป็นตัวแกล้งคน ใช้เป็นผีก่อกวนได้ (ความมั่นใจกลาง **ขอ Chris ดูอีกรอบ**)
- ไม่ใส่ยายถอดผ้า (奪衣婆) เป็นผีเด็ดขาด (ธง §8 ข้อ 9)

### 3.8 วิญญาณในคิวโซน 2 — `spirit1-asia` … `spirit10-asia` (B)

**คงแบบคนเดิมทุกเลข** (เพศ วัย อาชีพ ตาม `SPIRIT_SEX`) แต่คละสี่ชาติ · บล็อก ก + ต่อท้ายทุกใบ
```
translucent pale ghost of a recently dead person, feet and lower body fading away into soft
wisps of mist, faint cold blue-white inner glow, hollow tired eyes,
cute chibi proportions about 3 heads tall, three-quarter side view FACING TO THE RIGHT side of
the canvas, shoulders rotated about 40 degrees, both eyes still visible, full body,
clothing and silhouette must read instantly at very small size,
no religious jewelry, no prayer beads, no forehead marks, no religious headwear
```

| key | เพศ (`SPIRIT_SEX`) | แบบเดิม | prompt ต่อท้าย |
|---|---|---|---|
| `spirit1-asia` | n | คนแก่ร้องไห้ | an elderly Chinese person of unclear gender, thin loose white hair, a faded grey padded cotton jacket, crying quietly into both hands |
| `spirit2-asia` | m | เศรษฐีอ้วนกับเหรียญ | a fat middle-aged Chinese businessman, slicked-back hair, a shiny dark suit and a thick gold watch, hugging a heap of plain unmarked gold coins to his belly, greedy nervous smile |
| `spirit3-asia` | m | ขุนนางเฒ่า | an elderly Japanese retired senior official, thin combed grey hair, round wire glasses, a dark grey three-piece suit, hands folded behind his back, stiff proud posture |
| `spirit4-asia` | n | คนหนุ่มสาวหน้าเศร้า | a young Korean person about twenty of unclear gender, messy short hair, an oversized grey hoodie and jeans, hands in pockets, sad downcast face |
| `spirit5-asia` | m | ชายชุดสูท | a Japanese office worker in his forties, a neat dark suit with a loosened tie, a briefcase in one hand, exhausted empty stare |
| `spirit6-asia` | f | หญิงชุดสูท | a Korean office woman in her thirties, a fitted navy business suit, hair in a neat low ponytail, clutching a phone to her chest, anxious expression |
| `spirit7-asia` | f | หญิงห่มขาว | a Japanese village woman in a plain white kimono, hair tied in a simple low bun, hands folded quietly in front of her, eyes lowered, no headband |
| `spirit8-asia` | m | ชายวัยทำงาน | a middle-aged Indian working man, weathered face, short cropped hair and a thick moustache, a plain short-sleeve cotton shirt, a checked cotton lungi wrapped at the waist, a small cloth over one shoulder, tired resigned expression |
| `spirit9-asia` | f | หญิงชรา | an elderly Korean grandmother, silver hair in a small low bun, a plain pale hanbok jacket and long skirt, hands folded in front, deeply lined kind face |
| `spirit10-asia` | f | นักเรียนหญิง ~16 | a Chinese schoolgirl about sixteen in a plain blue-and-white tracksuit school uniform, short ponytail, arms hanging limp at her sides, hollow exhausted eyes |

> คละชาติ: จีน 1 2 10 · ญี่ปุ่น 3 5 7 · เกาหลี 4 6 9 · อินเดีย 8 — ไม่มีเครื่องหมายศาสนาบนตัวใครเลย (ไม่มีลูกประคำ ไม่มีจุดบนหน้าผาก ไม่มีผ้าโพกศีรษะทางศาสนา)

### 3.9 ฉากในห้อง · ฉากต่อสู้ · เรือ — โซน 2 (B · โหมดแก้ภาพ แนบไฟล์โซน 1)

**ประโยคหลัก** — ใช้ทุกห้อง แล้วเติมบรรทัด CHANGE ของห้องนั้น + บล็อกห้ามทั้งสอง
```
Edit this image. Keep the EXACT same composition, camera angle, horizon line, staircase,
floor area and the position and size of the central object — characters will be placed on
the floor by code, so the open floor in the lower part must stay open, flat and uncluttered.
Same pixel art style and level of detail. No text, no letters, no characters, no people.
CHANGE ONLY the cultural dressing:
```

| ไฟล์ | แนบ | บรรทัด CHANGE |
|---|---|---|
| `BG-Sala-asia.webp` | `BG-Sala` | the interior becomes a Tang-dynasty Chinese magistrate's court of records: vermilion pillars, dark wooden shelves of black lacquered document boxes and rolled blank scrolls, a tall judge's desk at the top of the stairs with an ink stone and brush stand, hanging blank paper lanterns, cinnabar and dull gold palette |
| `BG-Krata-asia.webp` | `BG-Krata` | the three cauldrons become one huge black iron cauldron flanked by two smaller ones on stone furnaces, the Thai statues become plain black iron post lanterns, the volcano stays, ash grey stone instead of Thai carvings |
| `BG-Dab-asia.webp` | `BG-Dab` | the blade forest becomes a steep black mountain covered in upright swords pointing to the sky, sword blades catching red fire light, needle-like iron spikes on the ridges |
| `BG-Lokan-asia.webp` | `BG-Lokan` | the ice prison becomes a vast pale blue frozen plain where crimson ice crystals burst open like red lotus flowers, cold white mist, faint purple sky |
| `BG-Ngiw-asia.webp` | `BG-Ngiw` | the thorn trees become tall iron trees whose leaves are all small steel knife blades glinting silver, fallen blade-leaves on the ground, pink-red haze in the canopy |
| `BG-Tea-asia.webp` | `BG-Tea` | the Thai pavilion becomes a thatched Japanese roadside teahouse with red felt benches, an iron kettle over a charcoal hearth and blank paper lanterns |
| `BG-Tarang-asia.webp` | `BG-Tarang` | the gaol becomes an old Japanese wooden jail with a lattice of thick square timber bars and a crossbeam door |
| `BG-Krajok-asia.webp` | `BG-Krajok` | the mirror tower becomes a single huge round crystal mirror on a carved cloud-shaped wooden stand, glowing silver, vermilion base |
| `BG-Sawan-asia.webp` | `BG-Sawan` | the Thai heaven gate becomes a golden arched bridge rising into dusky purple clouds toward a two-storey temple gate full of warm light, no figure in the light |
| `BG-Turn-Base-asia.webp` | `BG-Turn-Base` | the Thai guardian statues become plain black iron post lanterns with no figures, the carved figure panels on the lower wall become plain carved cloud-scroll panels, the floor pattern becomes plain square stone paving with a simple straight border, the throne becomes a vermilion lacquered magistrate's chair, the bronze cauldron becomes a black iron cauldron, the volcano and lava stay |
| `prop-boat-asia.png` | `prop-boat` (พื้นใส) | ใช้ประโยคนี้แทนประโยคหลัก: `keep the exact same size, angle, and LEFT-facing direction as the reference — change ONLY the boat's style: a small flat-bottomed black wooden ferry sampan with a low curved woven bamboo canopy at the back and a long wooden pole, no figurehead, no carvings, fully transparent background` |

> ฉากต่อสู้ `BG-Turn-Base` เป็นลานที่ตัวละครยืนสู้กัน — พื้นกลางต้องโล่งเหมือนเดิม · ลายพื้นเดิมเป็นลายกรอบเหลี่ยม สั่งให้เรียบไว้ก่อน เพราะลายนี้กลายเป็น 卍 ได้

---

## 4. โซน 3 — ปัจฉิม (เฮล แดนคนตายนอร์ส) · ไฟล์ต่อท้าย `-west`

### 4.1 บล็อกสไตล์โซน 3

ต่างจากโซน 1-2 ตรง **แสงขอบเย็น (cold rim light) แทนแสงอุ่น** — โซนนี้ไม่มีไฟ ยกเว้นยักษ์ไฟ (เพลิง) กับเตาเล็กในโถงมี้ด

**(ก) ยมทูต ผี วิญญาณ ของประดับ**
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
child ghosts; flaming giant sword; ravens or crows perched on a person
```

เหตุผล (จาก Reese ข้อ 5 นอร์ส)
- สัญลักษณ์ที่กลุ่มเหยียดผิวยึดไป ห้ามทั้งหมด · **AI ชอบใส่รูนสุ่มบนหินกับโล่** อาจออกมาเป็นตัวต้องห้าม จึงห้ามรูนทุกแบบ (โปรไฟล์ `hero-yama-west-profile` ที่มีอยู่โดนแบบนี้แล้ว)
- ความเชื่อนอร์สยังมีคนนับถือจริง → ห้ามโอดิน/ฟรายยา/บัลเดอร์เป็นผี เป้าให้ฟาด หรือตัวตลก · ห้ามตัวละครอื่นดูเหมือนโอดินหรือฟรายยา
- **อีกา/นกกาเกาะตัวคน** = อีกาคู่ประจำตัวโอดิน (Huginn/Muninn) ชายแก่ + ไม้เท้า + อีกาเกาะไหล่ อ่านเป็นโอดินทันที (Chris B2)
- หมวกมีเขาเป็นของแต่งยุคโรแมนติก · เฮล "ครึ่งสวยครึ่งเน่า" เป็นของแต่งยุคหลัง
- ไม่มีดาบไฟ = กันไม่ให้ยักษ์ไฟกลายเป็น Surtr (ตัวจุดจบโลก)
- ค้อนทอร์เป็นสัญลักษณ์ศาสนาของผู้นับถือปัจจุบัน ไม่เอามาแขวนบนศพเดินได้ (Mind เพิ่ม)

### 4.3 ฉากโซน 3 — `scene-west.png` (A)

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
> **ธารพิษเขียว:** `scene.js` บรรทัด 51-55 — `buildWalk` อ่านลาวาจาก "ภาพใบแรกที่โหลดได้" แล้วจำไว้ตลอดเกม และตั้งใจให้ทุกโซนใช้ผังเดียวกัน
> ถ้าผังตรงเป๊ะก็ไม่ต้องแก้สี · แต่ถ้าเริ่มเกมที่โซน 3 จากเซฟ (ภาพแรกที่โหลดคือฉากเขียว) Toby ต้องเช็กว่ายังอ่านทางเดินได้ (§8)

### 4.4 สถานีโซน 3 (บล็อก ข + สัดส่วนข้อ 2.1 + บล็อกห้ามร่วม + บล็อกห้ามโซน 3)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `st-sala-west` | โถงเอลยูดนีร์ (หอทะเบียน) | A | Éljúðnir, the long hall of the realm of the dead used as a hall of records: a long low Norse longhouse of dark tarred timber on a stone footing, a steep turf roof heavy with snow, carved serpent-headed gable ends, tall door posts carved with plain interlaced serpents, a rack of blank wooden tally sticks beside the door, frost on the eaves, faint cold light at the doorway, slightly wider than tall |
| `st-krata-west` | บ่อเดือดคำราม (Hvergelmir) | A | Hvergelmir, the roaring boiling spring: a wide round well of black stone set into glacier ice, dark water boiling violently with thick white steam columns, many small black serpents coiling over the rim and in the water, a single grey heron perched on a rim stone, NO fire, NO flames, NO furnace, wide and low, about twice as wide as tall |
| `st-dab-west` | ธารดาบสลีดร์ | A | the river Slíðr: a short wide stretch of icy black stream in a shallow rocky gully, the clear water full of sunken swords and single-edged long knives lying blade-up and glinting under the surface, frost-covered boulders along both banks, a thin green poison mist over the water, very wide and very low, a single row |
| `st-lokan-west` | นิฟล์เฮล | A | Niflhel: a wide low hollow of black ice and frozen rock swallowed by a thick bank of freezing grey fog, jagged black ice spikes and two dead frozen trees poking out of the fog, no light source, only pale cold fog, the silhouette must stay readable, wide and low |
| `st-ngiw-west` | โถงนาสตรอนด์ | A | the hall on the Corpse Shore: a narrow tall hall woven entirely from the giant spines and ribs of serpents, bone-white vertebrae arching together into a pointed roof, a dark doorway facing the viewer, green venom dripping from a smoke-hole in the roof and pooling into a small poison stream at its foot, taller than wide |
| `st-lan-west` | โม่กรอตติ | A | the giant mill Grotti: two enormous round grey millstones stacked on a low stone platform, a long wooden push-bar sticking out of the upper stone, a small heap of grey ground dust and white salt around the base, a worn circular track trodden into the frost around it, small and nearly square |
| `st-krajok-west` | เนินหลุมหมอดู | A | the seeress's burial mound: a tall narrow grassy grave mound dusted with snow, capped with a plain uncarved standing stone, a thin crack in the mound glowing with eerie pale green light, a crooked iron staff planted upright beside it, tall and narrow, about twice as tall as wide |
| `st-sawan-west` | กิมเล | A | Gimlé: a small hall roofed in shining gold standing on a snowy peak, warm golden light brighter than the sun pouring from its open doorway, a short pale stone stair up to it, soft golden clouds around the peak, it must look clean and bright — the only structure in the zone that is not dark or cold, taller than wide |
| `st-tea-west` | ม้านั่งมี้ด | A | a cosy corner of a Norse hall: a low wooden bench with a fur throw and a few plain gold rings scattered on it, a large copper mead cauldron on a short iron tripod, a small stone-ringed hearth with a low warm fire, nearly square |
| `st-tarang-west` | ประตูเฮล | A | the Hel-gate: a long black iron fence-gate of tall spear-pointed bars with heavy iron hinges and a thick crossbar lock, set between two black stone posts crusted with frost, pale ghost light glowing behind the bars, long and low, about twice as wide as tall |
| `st-building-west` | ไซต์ก่อสร้าง | A | **โหมดแก้ภาพ แนบ `img/st-building.png`** · `keep the exact same construction site layout, footprint, size, camera angle and the translucent ghost workers — change ONLY the cultural dressing: the naga-headed Thai crane becomes a plain timber crane with rope and a wooden pulley, dark tarred pine posts and beams, grey stone and ice blocks, frost on the timbers, no carvings, no dragon heads` (ต่อบล็อกห้ามทั้งสอง) |

### 4.5 ยมทูตโซน 3 (บล็อก ก + บล็อก ค)

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `crew-taan-west` | ทัณฑ์ → ดราวเกอร์ศพเฝ้าเนิน | A | a veteran draugr barrow-guard: a stocky undead warrior with swollen corpse-blue grey skin (clearly blue, not brown), a grey braided beard, a rusty chainmail shirt over a faded wool tunic, a plain round iron helmet with no horns, an old notched axe resting on his shoulder, pale glowing eyes, tired grumpy expression, eerie but not rotting |
| `crew-nira-west` | นิรา (ชุดขนสัตว์) | — | **ใช้ไฟล์ที่มีแล้ว** — prompt นอร์นเสมียนชะตาที่เคยเขียนไว้ **ยกเลิก** |
| `crew-kan-west` | กานต์ → เวิลวา (völva) หมอดูหญิง | A | a völva, a travelling seeress: a woman in her forties with long dark braided hair, a long dark blue-black hooded cloak with the hood lined in pale grey fur, a plain dark wool dress, holding a tall plain iron staff with a small plain round brass knob on top and no carvings, a plain leather pouch at her belt, calm piercing grey eyes, clearly alive with warm living skin, knowing half-smile, no cats, no cat-drawn cart, no falcon feathers, no feather cloak, no large necklace, no raven, no crow, no birds, no hat · _เจ้าของเลือก 11 ก.ย. แทนทูลร์ · แมว/ขนเหยี่ยว/สร้อยใหญ่ = ของฟรายยา · อีกา = ของโอดิน · ต้องดูเป็นคนเป็น ไม่ให้ปนกับหมอดูผู้ตายในเนินหลุม (`st-krajok-west`)_ |
| `crew-plerng-west` | เพลิง → ยักษ์ไฟมุสเปล | A | an eager young fire giant from the realm of fire: cracked black lava-rock skin with glowing orange seams, hair made of living flame, bare arms, a simple dark iron belt, carrying a burning pine torch, heat shimmer around him, cocky grin, the only warm thing in a frozen land |
| `crew-boon-west` | บุญ → บัลเดอร์ (Baldr) | A | Baldr, the shining one: a young man with shoulder-length golden hair, his face and skin softly glowing with warm light, a plain white linen tunic with a simple leather belt, holding a small plain clay bowl filled with warm light in both hands, gentle dignified serene smile, no mistletoe, no spear, no arrows, no weapons of any kind, no crown, no halo ring · _เจ้าของเลือก 11 ก.ย. แทนนันนา · มิสเซิลโทคืออาวุธที่ฆ่าบัลเดอร์ · ไม่ใส่วงแสงรอบหัว กันไม่ให้อ่านเป็นนักบุญคริสต์_ |
| `crew-dam-west` | ดำ → กังลาติ คนรับใช้ | A | Ganglati, the slow servant of the hall of the dead: a pale thin hunch-backed man in a drab grey wool tunic with wrapped leg bindings, feet dragging, a bundle of pine logs tied to his back, droopy half-closed eyes, mid-yawn |
| `crew-guard-west` | ยักษ์ทวารบาล → โมดกุดร์ | A | Móðguðr, the maiden who guards the golden bridge: a tall broad-shouldered young woman in a mail shirt and a plain round iron helmet with no horns, long thick braids, holding a long spear upright, a round wooden shield with a plain painted boss and no symbols, stern challenging stare — **taller than the crew, about 4 heads tall** (สัดส่วนเดียวกับ `crew-guard.png`) |

> prompt ทูลร์ (þulr) รอบก่อน **ยกเลิก** ตามที่เจ้าของเลือกเวิลวา · ถ้าวันหนึ่งกลับไปใช้ ต้องคงเงื่อนไข B2 ของ Chris (ไม่มีอีกา/นก ไม่มีไม้เท้า ไม่มีหมวก)

### 4.6 บอสโซน 3 — เฮล (A) · `hero-boss-west.png` + โปรไฟล์ (B, §5.1)

**โหมดแก้ภาพ แนบ `img/hero-boss.png`** (ใช้เป็นกรอบเท่านั้น) + บล็อกห้ามทั้งสอง
```
Use the reference image ONLY for framing, pose, camera angle, chibi head-to-body proportions,
canvas size, background treatment and pixel style — replace the character and the throne completely.
Hel, ruler of her own realm of the dead, seated upright and front-facing on a high dark pine-wood
throne with plain carved serpent-head arm ends: a tall grim regal woman whose body is divided
vertically down the middle — the left half the cold livid blue-grey of a frozen corpse (clearly
blue, not brown), the right half living human skin — the split runs straight down the centre of
her face as well; long dark hair, a stern gloomy composed face, simple heavy dark robes, a heavy
plain iron circlet, one hand resting calmly on the throne arm, commanding posture like a queen in
her own hall — not rotting, not skeletal, not seductive, no horns, no skulls, no bones on the throne.
Single figure with the throne, centered.
```
- กรอบเรื่อง (เจ้าของสั่งตาม Chris W4): **เฮลคือผู้ครองแดนของตัวเองที่เปิดให้สำนักยมบาทมาตั้งสาขา ไม่ใช่ลูกน้องของพญายม** — ท่านั่งจึงเป็นเจ้าบ้าน สงบ มีอำนาจ ไม่ใช่ปีศาจรอฟาด
- `npc-hel-west` ในรอบก่อน **ยุบรวมเป็นไฟล์นี้** · ตัวแบบโอดินที่ `img/West/hero-boss-west.png` ต้องทิ้ง (ย้ายไป `img/raw/_old/`)

### 4.7 ผีก่อกวนโซน 3 (บล็อก ก ไม่ต้องใส่ chibi) — 6 ตัว

| key | ชื่อไทย | ชุด | prompt ต่อท้าย |
|---|---|---|---|
| `mob-draugr-west` | ดราวเกอร์ตัวเล็ก | A | a small shambling draugr: swollen corpse-blue grey skin (clearly blue, not brown), rotted-looking grey rags of old clothing, hunched, arms reaching forward, pale glowing eyes, eerie but not gory |
| `mob-mara-west` | มารา ผีนั่งทับอก | A | a mara nightmare spirit: a thin pale woman with very long tangled black hair, crouched low as if about to sit on someone's chest, bony hands, hollow dark eyes, a torn grey shift, cold mist curling around her, no other figure |
| `mob-ormr-west` | งูพิษนาสตรอนด์ | A | a black venom serpent: a thick glossy black snake reared up to strike, mouth open with green venom dripping from its fangs, small green glow in the eyes |
| `mob-garmr-west` | การ์ม หมาเฝ้าแดน | A | Garmr, the great hound of the underworld: a huge black shaggy dog with a dark stained chest, bared teeth, glowing pale eyes, low menacing stance |
| `mob-helhestr-west` | ม้าผีสามขา | A | a three-legged ghost horse: gaunt black horse standing on three legs, patchy hide, pale mist from its nostrils, hollow white eyes · **นิทานพื้นบ้านเดนมาร์กยุคหลัง** ไม่ใช่ตำนานเก่า ถ้าใส่ต้องไม่อ้างว่าเป็นตำนาน |
| `mob-lykt-west` | ผีตะเกียงหลอกทาง | A | a Scandinavian will-o'-the-wisp: a small floating greenish-white flame with the faint shape of a hunched little lantern-carrying figure inside it, flickering, drifting low over frozen ground, no face details · **คติชาวบ้านสแกนดิเนเวียยุคหลัง (lyktgubbe)** ไม่ใช่ตำนานเก่า |

> หลีกเลี่ยงผีเด็ก (útburðr / myling) ตามธงของ Reese · ใช้หมาการ์มแทน `mob-werewolf` โซน 1 ไม่ได้แล้ว (เจ้าของยกเลิกแนวใช้ซ้ำ)

### 4.8 วิญญาณในคิวโซน 3 — `spirit1-west` … `spirit10-west` (B)

คงแบบคนเดิมทุกเลข · คนตายยุคปัจจุบันจากยุโรป-อเมริกา-รัสเซีย (ตาม sub ของโซน) · บล็อก ก + ต่อท้ายทุกใบ
```
translucent pale ghost of a recently dead person, feet and lower body fading away into soft
wisps of mist, faint cold blue-white inner glow, hollow tired eyes,
cute chibi proportions about 3 heads tall, three-quarter side view FACING TO THE RIGHT side of
the canvas, shoulders rotated about 40 degrees, both eyes still visible, full body,
clothing and silhouette must read instantly at very small size,
no cross, no crucifix, no rosary, no religious jewelry, no religious headwear
```

| key | เพศ | แบบเดิม | prompt ต่อท้าย |
|---|---|---|---|
| `spirit1-west` | n | คนแก่ร้องไห้ | an elderly person of unclear gender, thin loose white hair, a worn knitted cardigan, crying quietly into both hands |
| `spirit2-west` | m | เศรษฐีอ้วนกับเหรียญ | a fat middle-aged American businessman, slicked-back hair, a shiny pinstripe suit and a gold watch, hugging a heap of plain unmarked gold coins to his belly, greedy nervous smile |
| `spirit3-west` | m | ขุนนางเฒ่า | an elderly statesman with heavy grey eyebrows, a long dark wool overcoat and a grey fur hat, stiff proud posture, no medals, no insignia, no badges |
| `spirit4-west` | n | คนหนุ่มสาวหน้าเศร้า | a young European person about twenty of unclear gender, messy short hair, an oversized black hoodie and jeans, hands in pockets, sad downcast face |
| `spirit5-west` | m | ชายชุดสูท | a man in his forties in a neat grey business suit with a loosened tie, a briefcase in one hand, exhausted empty stare |
| `spirit6-west` | f | หญิงชุดสูท | a woman in her thirties in a fitted black business suit, hair in a neat bun, clutching a phone to her chest, anxious expression |
| `spirit7-west` | f | หญิงห่มขาว | a village woman in a plain long white linen nightgown, hair in a simple low bun, hands folded in front of her, eyes lowered |
| `spirit8-west` | m | ชายวัยทำงาน | a middle-aged Norwegian fisherman, weathered face and a short beard, a yellow oilskin jacket over a thick wool sweater, rubber boots, tired resigned expression |
| `spirit9-west` | f | หญิงชรา | an elderly Russian grandmother, a flowered headscarf tied under the chin, a knitted shawl over a plain dark dress, hands folded in front, deeply lined kind face |
| `spirit10-west` | f | นักเรียนหญิง ~16 | a teenage girl about sixteen in a navy school blazer and pleated skirt, short ponytail, arms hanging limp at her sides, hollow exhausted eyes |

### 4.9 ฉากในห้อง · ฉากต่อสู้ · เรือ — โซน 3 (B · โหมดแก้ภาพ แนบไฟล์โซน 1)

ใช้ **ประโยคหลักเดียวกับข้อ 3.9** แล้วเติมบรรทัด CHANGE ข้างล่าง + บล็อกห้ามร่วม + บล็อกห้ามโซน 3

| ไฟล์ | แนบ | บรรทัด CHANGE |
|---|---|---|
| `BG-Sala-west.webp` | `BG-Sala` | the interior becomes a long dim Norse timber hall: carved serpent-interlace posts, a central long hearth pit gone cold, shelves of blank wooden tally sticks and rolled hides, a dark wooden high seat at the top of the stairs, blue-grey light through the smoke-hole |
| `BG-Krata-west.webp` | `BG-Krata` | the cauldrons and furnaces become one wide round black-stone well of violently boiling dark water with thick white steam and coiling black serpents, the volcano becomes a glacier wall, NO fire anywhere, cold blue light |
| `BG-Dab-west.webp` | `BG-Dab` | the blade forest becomes an icy black stream running through a narrow poison-misted gully, swords and long knives lying blade-up under the clear water, frost on the boulders |
| `BG-Lokan-west.webp` | `BG-Lokan` | the ice prison becomes a hollow of black ice lost in thick freezing fog, dead frozen trees, no light source at all, only grey fog glow |
| `BG-Ngiw-west.webp` | `BG-Ngiw` | the thorn trees become a tall hall woven from giant serpent spines and ribs, green venom dripping from the roof into a poison stream, a dark shore of black sand in front |
| `BG-Tea-west.webp` | `BG-Tea` | the Thai pavilion becomes a warm corner of a Norse hall with fur-covered benches, a copper mead cauldron and a small stone hearth |
| `BG-Tarang-west.webp` | `BG-Tarang` | the gaol becomes a tall black iron spear-pointed gate between frosted stone posts, pale ghosts glowing behind the bars |
| `BG-Krajok-west.webp` | `BG-Krajok` | the mirror tower becomes a snowy burial mound with a plain uncarved standing stone and a crack glowing pale green, fog all around |
| `BG-Sawan-west.webp` | `BG-Sawan` | the Thai heaven gate becomes a gold-roofed hall on a snowy peak with warm golden light pouring from its doorway, golden clouds |
| `BG-Turn-Base-west.webp` | `BG-Turn-Base` | the Thai guardian statues become plain uncarved standing stones, the carved figure panels on the lower wall become plain dark stone with frost, the platform becomes dark grey flagstones dusted with snow and a plain straight border, the throne becomes a high-backed dark pine seat, the cauldron becomes a round black-stone well steaming with NO fire, the volcano becomes a glacier wall, the lava becomes sickly green poison streams |
| `prop-boat-west.png` | `prop-boat` (พื้นใส) | ใช้ประโยคนี้แทนประโยคหลัก: `keep the exact same size, angle, and LEFT-facing direction as the reference — change ONLY the boat's style: a small Norse clinker-built rowing boat of dark tarred overlapping planks with a plain upward-curled prow and stern, a pair of oars, no dragon head, no shields along the side, no carvings, fully transparent background` |

---

## 5. โปรไฟล์ · ท่าทำงาน · ท่าฟาด · แก้ไฟล์ยมบาท (ทั้งสองโซน)

### 5.1 โปรไฟล์ (B) — 8 ใบต่อโซน

**โหมดแก้ภาพ แนบ 2 รูป:** รูป 1 = สไปรท์ใหม่ของโซน · รูป 2 = โปรไฟล์โซน 1 ของตัวเดียวกัน (`img/crew-<k>-profile.png` / `img/hero-boss-profile.png`)
```
Make a bust portrait of the character in image 1, using exactly the framing, camera distance,
lighting and pixel style of image 2. Keep image 1's face, skin, colors, outfit and props exactly.
Replace the background with [BACKGROUND]. Square, full background.
No text, no letters, no kanji, no runes, no carved glyphs or symbols anywhere in the background,
no figures of gods, buddhas or saints in the background.
```
- **[BACKGROUND] โซน 2:** `a hazy Jigoku landscape of sword mountains, black iron cauldrons and vermilion court pillars, molten orange lava glow, dusky purple cloud`
- **[BACKGROUND] โซน 3:** `a foggy black-ice landscape with a dark river, a gold-railed bridge far away and a long dark timber hall, cold blue-grey light, faint poison-green glints`
- **เฮลเพิ่ม:** `the vertical colour split runs straight down the centre of her face; even lighting so both halves read clearly, no half-face shadow` (โปรไฟล์โซน 1 ทำหน้าครึ่งมืด ถ้าใช้แสงแบบนั้นจะอ่านสองสีไม่ออก)

| โซน 2 | โซน 3 |
|---|---|
| `crew-taan-asia-profile` `crew-kan-asia-profile` `crew-plerng-asia-profile` `crew-boon-asia-profile` `crew-dam-asia-profile` `crew-guard-asia-profile` `crew-nira-asia-profile` `hero-boss-asia-profile` | `crew-taan-west-profile` `crew-kan-west-profile` `crew-plerng-west-profile` `crew-boon-west-profile` `crew-dam-west-profile` `crew-guard-west-profile` `crew-nira-west-profile` `hero-boss-west-profile` |

> `hero-yama-asia-profile` / `hero-yama-west-profile` มีแล้ว (ต้องแก้ตาม 5.4) · `crew-nira-*-profile` ยังไม่เจอไฟล์ จึงนับเป็นชิ้นใหม่

### 5.2 ท่าทำงาน (B) — 4 ใบต่อโซน

ใช้วิธีของ ASSET-PROMPTS ชุดที่ 4 เป๊ะ ๆ: **โหมดแก้ภาพ แนบสไปรท์ยืนของโซนนั้น** + ประโยคล็อก
`keep the exact same character, same outfit, same colors and the same chibi head-to-body proportions as the reference image — change ONLY the pose` + ท่าข้างล่าง + บล็อกห้ามทั้งสอง

| key | ท่า |
|---|---|
| `crew-taan-asia-work` | both hands gripping his black iron three-pronged fork and jabbing it down into a fire pit, leaning into the push, ember sparks around it · same ox head, chipped horn, nose ring and tiger-skin loincloth |
| `crew-plerng-asia-work` | crouching low, fanning flames under a black iron cauldron with a plain round paper fan with no pattern, wild curly hair blown sideways · same single horn, tiger-skin loincloth, small flames at the feet |
| `crew-nira-asia-work` | pressing her wooden seal stamp down onto an open blank scroll, other hand steadying the paper, leaning forward slightly · same dark gold-patterned kimono with red under-layer, same hair bun |
| `crew-dam-asia-work` | hauling the firewood bundle with both hands, back bent, knees buckling, tongue out from the effort · same grey-green skin, nub horns, straw-rope loincloth |
| `crew-taan-west-work` | pushing a long iron-shod pole down into violently boiling dark water, thick steam rising, leaning into the push, NO fire · same corpse-blue grey skin, rusty chainmail, plain round helmet |
| `crew-plerng-west-work` | crouching and pressing both glowing hands onto a big block of ice to melt it, steam hissing up, flame hair streaming sideways, his torch set down beside him · same lava-rock skin and iron belt |
| `crew-nira-west-work` | pressing her wooden seal stamp down onto an open blank scroll, other hand steadying the paper, leaning forward slightly · same white fur cloak, brown fur-trimmed tunic, same hair bun |
| `crew-dam-west-work` | dragging the pine-log bundle with both hands, back bent, feet sliding on the frost, painfully slow · same grey wool tunic and wrapped leg bindings |

> เพลิงโซน 3 ไม่ได้เร่งไฟใต้บ่อ (บ่อเดือดคำรามเดือดเองโดยไม่มีไฟ ตามธง "ไม่มีไฟลงทัณฑ์") ท่าละลายน้ำแข็งจึงยังเป็นงาน "เร่งความร้อน" ตามบุคลิก

### 5.3 ท่าฟาดยมบาท (B) — 1 ใบต่อโซน

**แนบ `hero-yama-<zone>.png` ที่แก้ตาม 5.4 แล้ว** + ประโยคล็อก + ท่านี้ (บทเรียนจาก ASSET-PROMPTS ชุดที่ 4: หันขวา · ไม่มีลูกไฟ)
```
mid-throw attack pose FACING TO THE RIGHT side of the canvas: one arm thrown forward, the other arm
pulled back, torso twisted with weight behind the throw, one foot forward, expression turns from
worried to determined, no projectile, just the throwing motion — outfit, headwear, horns and the
plain blank book tucked under one arm stay exactly as in the reference
```
ไฟล์: `hero-yama-asia-atk.png` · `hero-yama-west-atk.png`

### 5.4 แก้ไฟล์ยมบาทที่มีอยู่ (ไม่ใช่ชิ้นใหม่ · ต้องทำก่อนเข้าเกม)

**โหมดแก้ภาพ แนบไฟล์นั้นเอง** · ขึ้นต้นด้วย `keep everything in the image exactly the same — change ONLY:`

| ไฟล์ | ปัญหา | change ONLY |
|---|---|---|
| `img/Asia/hero-yama-asia.png` | ปกสมุดมี **คันจิ 知識** (ขัดกฎ "ห้ามตัวอักษรในรูป" ของเกม) · มีพิกเซลหลงสองสามจุดข้างหัวด้านขวา | `the book cover: a plain blank dark leather cover with no characters, no letters, no symbols; remove the stray pixels to the right of his head` |
| `img/Asia/hero-yama-asia-profile.png` | ปกสมุดมี **คันจิ 知識** | `the book cover: a plain blank dark leather cover with no characters, no letters, no symbols` |
| `img/West/hero-yama-west.png` | ปกสมุดมี **คันจิ 知識** · **หมวกเหล็กมีเขาโค้งใหญ่** (ขัดบล็อกห้ามโซน 3 และธงนอร์สข้อ 5) | `the book cover: plain blank, no characters; remove the horned helmet completely — bareheaded, his own two small red horns and hair visible, a plain fur-lined hood resting on his shoulders` |
| `img/West/hero-yama-west-profile.png` | ปกสมุด **คันจิ 知識** · **หมวกมีเขา** · **ลายคล้ายรูน** บนหินฝั่งซ้ายและขอบบ่อน้ำในฉากหลัง | `the book cover: plain blank; remove the horned helmet — bareheaded with his own small red horns, a plain fur-lined hood on his shoulders; remove every carved rune-like mark from the stones, the ground and the pool edges in the background` |

> ถ้าแก้ภาพแล้วหน้าเพี้ยน gen ใหม่จากไฟล์โซน 1 (`img/hero-yama.png`) ด้วยประโยคเปลี่ยนชุดแทน · Chris ควรดูหมวก/รูนเป็นเรื่องวัฒนธรรม ส่วนตัวอักษรเป็นกฎของเกมเอง แก้ได้เลย

---

## 6. เรื่องที่เจ้าของตัดสินแล้ว (11 ก.ย. 2569) และที่ยังต้องให้ Chris ดู

| เรื่อง | ตัดสิน | ผลในไฟล์นี้ |
|---|---|---|
| ยมทูต: ตัวใหม่ตามตำนาน หรือ ตัวเดิมเปลี่ยนชุด | **ตัวใหม่ทั้งหมด** ยกเว้นยมบาทกับนิราที่ใช้ชุดของโซนที่มีแล้ว | ตารางเปลี่ยนชุดของรอบก่อน **ยกเลิก** · prompt โดโช/นอร์น **ยกเลิก** |
| บอส | **แยกโซน**: เอ็นมะ (โซน 2) · เฮล (โซน 3) | §3.6 · §4.6 + โปรไฟล์ §5.1 |
| บุญโซน 3 | **บัลเดอร์** (ชาย) | §4.5 · บทพูดบุญยังใช้ "ผม...ครับ" ได้เหมือนเดิม |
| กานต์โซน 3 | **เวิลวา** (หญิง) | §4.5 · บทพูดกานต์ในโซนนี้ต้องเปลี่ยนสรรพนาม (§8) |
| ชื่อโซน | คง **"โซนบูรพา / โซนปัจฉิม"** | sub ของโซน 2 คง "จีน · ญี่ปุ่น · เกาหลี · อินเดีย" |
| โซน 2 | **เอเชียรวม** — ไม่รื้อ prompt ญี่ปุ่นเดิม เติมชาติอื่นในชิ้นใหม่ · ห้ามรูปเคารพพุทธ/ฮินดู | §3.7 (เกียงซี ด็อกแกบี) · §3.8 (วิญญาณสี่ชาติ) · §3.9 (เรือแจว นั่งร้านไม้ไผ่) · บล็อกห้าม §3.2 |
| งบอาร์ต | **ครบชุดทั้งสองโซน** ยกเลิกแนวใช้รูปโซน 1 ซ้ำ | §7 |

**ยังต้องให้ Chris ดู (Mind ไม่ตัดสินเอง)**
1. **ฉากที่ผู้เล่นสู้กับบอสแบบไม่มีทางชนะ (`YAMA_FIGHT`)** — ถ้าโซน 3 ใช้เฮลแทนพญายม ผู้เล่นจะได้ "ฟาดเฮล" (บทเดิม: "ท่านฟาดเข้าเต็มแรง…ไม่ขยับ") · เฮลเป็นเทพของศาสนาที่ยังมีคนนับถือ ขัดกับธงนอร์สข้อ 1 ได้ · ทางที่เห็น: โซน 3 ให้พญายมมาลงโทษเองเหมือนเดิม หรือให้เฮลไล่ออกจากแดนโดยไม่มีการฟาด
2. **บัลเดอร์เป็นยมทูต** — Chris W4 เตือนเรื่องเทพเป็นลูกจ้างที่มีบทขำ ๆ · เจ้าของเลือกแล้ว แต่บทของบุญในโซน 3 ต้องไม่มีมุกให้บัลเดอร์เป็นตัวตลก
3. **ด็อกแกบี** (§3.7) กับ **ล้อใต้อุ้งเท้าคาชะ** (§10) — ความมั่นใจกลาง

---

## 7. งบรูปและขนาดไฟล์

### 7.1 ชิ้นต่อโซน (เท่ากันทั้งสองโซน)

| หมวด | ชุด A (ขาดไม่ได้ — เข้าโซนแล้วเห็นทันที) | ชุด B (เห็นตอนเข้าห้อง ต่อสู้ เปิดโปรไฟล์) |
|---|---|---|
| ฉากโซน | 1 | — |
| สถานี 10 + ไซต์ก่อสร้าง 1 | 11 | — |
| ยมทูตใหม่ 6 (ไม่นับนิรา) | 6 | — |
| บอส | 1 | โปรไฟล์บอส 1 |
| ผีก่อกวน | 6 | — |
| วิญญาณในคิว | — | 10 |
| ฉากในห้อง 9 + ฉากต่อสู้ 1 | — | 10 |
| โปรไฟล์ยมทูต 6 + นิรา 1 | — | 7 |
| ท่าทำงาน (ทัณฑ์ เพลิง นิรา ดำ) | — | 4 |
| ท่าฟาดยมบาท | — | 1 |
| เรือ | — | 1 |
| **รวม** | **25** | **34** |

- **ครบชุด 59 ชิ้นต่อโซน · สองโซน 118 ชิ้น** · โซน 2 มีตัวเลือกดวงไฟวิญญาณเพิ่มได้อีก 1 (ชุด C)
- **แก้ของเดิม (ไม่นับเป็นชิ้นใหม่):** ยมบาท 4 ไฟล์ (§5.4) · regen ของโซน 2 ที่ gen ไปแล้ว 3 ไฟล์ (§10)
- **เทียบกับรอบก่อน:** เดิม A+B 23 ชิ้นต่อโซน (ใช้ของโซน 1 ซ้ำ) → ตอนนี้ 59 ชิ้น = **เพิ่ม 36 ชิ้นต่อโซน** มาจาก วิญญาณ 10 · โปรไฟล์ 8 · ท่าทำงาน+ท่าฟาด 5 · ฉากในห้องที่เคยเป็น C 4 + ฉากต่อสู้ 1 · สถานีที่เคยเป็น C 2 + ไซต์ก่อสร้าง 1 · ผีเพิ่ม 4 · บอส 1 · เรือ 1 · (ลบ: ยมทูตนิราที่มีแล้ว −1)

### 7.2 ขนาดไฟล์

**ฐานที่ใช้:** โซน 1 ตอนนี้ราว **79 ไฟล์ 15.3 MB = ~0.19 MB/ไฟล์** หลัง prep-art ย่อแล้ว (ตัวเลขจาก Claudy 11 ก.ย.) ·
หัว CONCEPT.md ยังเขียน "43 ไฟล์ 7.9 MB" ซึ่ง **เก่ากว่า** จึงไม่ใช้ · `img/manifest.json` มี 91 รายการ (png 80 + webp 11 รวมฉากเก่า 2 ใบ) สอดคล้องกับตัวเลข 79
_(รอบนี้ Mind วัดขนาดไฟล์เองไม่ได้ ใช้ตัวเลขข้างบนเป็นฐาน)_

| | ไฟล์ | ประมาณ |
|---|---|---|
| โซน 1 (ที่มีอยู่) | 79 | 15.3 MB |
| + โซน 2 ครบชุด | 59 | +11.2 MB |
| + โซน 3 ครบชุด | 59 | +11.2 MB |
| **รวมทั้งเกม** | **197** | **~37.7 MB จากเพดาน 50 MB (75%)** · เหลือราว 12 MB |

- **เผื่อกรณีหนักกว่าเฉลี่ย:** ชุดโซนใหม่มีภาพเต็มใบ (ฉาก 1 + ฉากห้อง 10 + โปรไฟล์ 8 = 19 ใน 59 ≈ 32%) มากกว่าโซน 1 เล็กน้อย (~25%) · ถ้าเฉลี่ยหนักขึ้น 30% จะเป็นราว +29 MB → รวม **~44 MB** ยังไม่เกิน แต่เหลือไม่ถึง 6 MB
- ชุด A อย่างเดียวสองโซน (50 ชิ้น) ≈ +9.5 MB → รวม ~25 MB
- **ของที่ต้องย้ายออกจาก `img/`** (ไม่งั้นกินงบฟรี ๆ ถ้าโค้ดโหลด): `scene-asia.png` `scene-west.png` ตัวเก่า · `Asia/hero-boss-asia.png` · `West/hero-boss-west.png` → `img/raw/_old/`
- **ถ้าอยากเหลือที่ไว้มากขึ้น:** วิญญาณในคิวแสดงบนจอสูงแค่ 38-72 px ย่อเหลือ 256² ได้ (ประหยัดราว 60% ของ 20 ไฟล์) · โปรไฟล์เก็บเป็น webp แบบฉากห้อง

### 7.3 ลำดับ gen ที่แนะนำ (ต่อโซน)
ฉากโซน → ศาล/โถง (sala) → สถานีทัณฑ์ 5 → ยมทูต 6 + บอส → ไซต์ก่อสร้าง → ผี 6 → สถานีที่เหลือ 4 → (ชุด B) ฉากต่อสู้ → วิญญาณ 10 → ฉากห้อง 9 → โปรไฟล์ 8 → ท่าทำงาน 4 + ท่าฟาด → เรือ
อัตรา 6-10 ชิ้นต่อสัปดาห์ของ Toby → ชุด A ของหนึ่งโซนราว 3-4 สัปดาห์ · ครบชุดหนึ่งโซนราว 6-10 สัปดาห์

---

## 8. ส่งต่อ Toby (เรื่องโค้ดที่รูปชุดนี้ต้องใช้)

1. **ต่อสายโฟลเดอร์โซน** — ทุกคีย์ต้องหา `img/<Zone>/<ชื่อหลัก>-<zone>[-ท่า]` ก่อน (เช่น `crew-taan` + `work` → `Asia/crew-taan-asia-work`) ครอบคลุม: สถานี · `st-building` · ยมทูต · โปรไฟล์ · ท่าทำงาน · `hero-yama-atk` · บอส + โปรไฟล์ · `MOB.kinds` · `spiritN` · `BG-<Key>` · `BG-Turn-Base` · `prop-boat` · `prep-art.py` ต้องอ่านโฟลเดอร์ย่อยด้วย
2. **กันหน้าไม่ตรง** — ถ้ามีสไปรท์ยมทูตของโซนแต่ยังไม่มีท่าทำงาน/โปรไฟล์ของโซน **อย่าสลับไปใช้ท่าทำงานโซน 1** (จะกลายเป็นคนละตัว) ให้ใช้ท่ายืนของโซนแทน
3. **กระทะโซน 3 ไม่มีไฟ** — `krata` มี `fire:true` ใช้ฟืน 1.4 และวาด fx ไฟ · โซน 3 ควรเปลี่ยนเป็นไอน้ำ ส่วนเรื่องกินฟืนเป็นเรื่องออกแบบเกม ไม่ใช่เรื่องรูป
4. **walk.js** — `buildWalk` จำภาพใบแรกที่โหลดได้ (scene.js 51-55) · ถ้าเริ่มจากเซฟโซน 3 ภาพแรกคือฉากธารพิษเขียว ต้องเช็กว่ายังแยกทางเดินได้
5. **ผีใหม่** — เพิ่มใน `MOB.kinds` แล้วใส่ index ใน `ZONES[].mobs` (โซน 2: 6 ตัว · โซน 3: 6 ตัว) · `mob-pret`/`mob-werewolf` โซน 1 **ไม่ใช้ในโซนใหม่แล้ว**
6. **วิญญาณในคิว** — `spirit1-10-<zone>` คงแบบคนเดิมทุกเลข → `SPIRIT_OF` / `SPIRIT_SEX` ใช้ตารางเดิมได้ แค่เปลี่ยนคีย์รูปตามโซน
7. **ข้อความโซน** — คงชื่อ "โซนบูรพา / โซนปัจฉิม" · sub โซน 2 คง "จีน · ญี่ปุ่น · เกาหลี · อินเดีย" · ชื่อที่แสดงของ `sawan` โซน 2 = **"ประตูเทวภูมิ"** (ไม่ใช่สุขาวดี) · `krata` โซน 3 = **"บ่อเดือดคำราม"** ·
   **กานต์โซน 3 เป็นหญิง (เวิลวา)** บทพูด "ผม…ครับ" ในโซนนี้ต้องเปลี่ยน · บุญโซน 3 (บัลเดอร์) ยังเป็นชาย ไม่ต้องเปลี่ยน
8. **บอสแยกโซน** — `hero-boss` ต้องอ่านตามโซน · โซน 3 เป็นเสียงผู้หญิง แก้บท `DAD` / `ORDER_WARN` ของโซนนี้ และวางกรอบว่าเฮลเป็น **เจ้าบ้านที่ให้มาตั้งสาขา** ไม่ใช่เจ้านายหรือลูกน้อง · เรื่อง `YAMA_FIGHT` รอ Chris (§6 ข้อ 1)
9. **ASSET-PROMPTS.md ข้อ 5.4** (prompt scene-asia/scene-west เดิม) มีคำสั่งให้ใส่โทริอิกับรูปปั้นจิโซ — ควรลบแล้วชี้มาที่ไฟล์นี้แทน · **และตอนนี้เกมยังโหลด `img/scene-asia.png` / `img/scene-west.png` ตัวเก่าอยู่จริง** (Chris ชิ้น 2 Blocker 1) → ชี้ `ZONES[].scene` กลับไปที่ `'scene'` จนกว่าจะมีฉากใหม่ตามข้อ 3.3 / 4.3
10. **ธงบทโซน 3 (Reese ธงนอร์สข้อ 3 · Chris W6)** — บทโซน 3 **ห้ามบอกว่าวิญญาณตายเพราะป่วยหรือแก่แล้วโดนลงโทษ** · เฮลคือแดนของคนตายทั่วไป ทัณฑ์มีเฉพาะที่นาสตรอนด์ (`ngiw`) กับนิฟล์เฮล (`lokan`) · เวลาเขียนบทรับดวง/คำตัดสินของโซนนี้ ห้ามผูกโทษกับสาเหตุการตาย
11. **ธงโค้ดโซน 2 (Reese ธงญี่ปุ่นข้อ 5 · Chris W6)** — **ยายถอดผ้า (奪衣婆 ดัตสึเอบะ) ห้ามเป็นผีก่อกวนให้ฟาด** เพราะยังมีคนบูชาจริง · ห้ามใส่ใน `MOB.kinds` และห้ามเป็นเป้าของ `smite` · ไฟล์นี้ไม่มี prompt ของเธอ ต้นไม้แขวนเสื้อผ้าในฉากโซน 2 เป็นแค่ร่องรอย ไม่มีตัวคน

---

## 9. เช็กก่อนส่งเข้าเกม (เพิ่มจากของโซน 1)
- [ ] ไม่มีตัวอักษร คันจิ ฮันกึล หรือรูน **แม้แต่ลายที่ดูคล้าย** บนป้าย ม้วนหนังสือ **ปกสมุด** โล่ หิน และ **ฉากหลังของโปรไฟล์**
- [ ] ไม่มีลายน้ำ Gemini (ดาวสี่แฉกมุมขวาล่าง) และพื้นใสจริง ไม่ใช่ลายตารางที่ติดมาเป็นพิกเซล
- [ ] โซน 2: ไม่มีโทริอิ จิโซ 卍 (รวมลายกรอบเหลี่ยม) กองหินหรือกรวดริมน้ำ **รูปเคารพพุทธหรือฮินดู** · เกียงซีไม่มียันต์ · ด็อกแกบีไม่มีเขา
- [ ] โซน 3: ไม่มีหมวกมีเขา สัญลักษณ์ต้องห้าม ไม่มีตัวที่ดูเป็นโอดินหรือฟรายยา ไม่มีอีกา/นกเกาะตัวคน · ผิวศพ (ดราวเกอร์/เฮล) ต้องออก **ฟ้า-เทา ไม่ใช่น้ำตาล** · บัลเดอร์ไม่มีมิสเซิลโทหรืออาวุธ
- [ ] วิญญาณในคิว: เพศ/วัยตรงกับเลขเดิม (`SPIRIT_SEX`) · ไม่มีเครื่องหมายศาสนาบนตัว · หันขวา
- [ ] ฉากโซนวางซ้อน `scene.png` แล้วผังตรงกันทุกจุด · ฉากห้อง/ฉากต่อสู้วางซ้อนไฟล์โซน 1 แล้วพื้นที่เดินอยู่ที่เดิม
- [ ] สถานีวางเรียงกันแล้วสัดส่วนตรงตาราง 2.1

---

## 10. รูปที่ gen ไปแล้วก่อน prompt แก้ (r2)

เปิดดูรูปจริงตามชื่อไฟล์ที่ควรเป็น · **รอบนี้เปิดดูรายชื่อทั้งโฟลเดอร์ไม่ได้** จึงเช็กแค่ไฟล์ที่ r2 แตะ ถ้ามีรูปอื่นในโฟลเดอร์ ให้เทียบกับ prompt ในไฟล์นี้ก่อนใช้
Mind บอกแค่ว่ารูปต่างจาก prompt ใหม่ตรงไหน **เรื่องวัฒนธรรมให้ Chris ตัดสิน**

| ไฟล์ | ต่างจาก prompt ใหม่ตรงไหน | gen ใหม่? |
|---|---|---|
| `img/Asia/st-dab-asia.png` | ปลายบนสุดของดาบทุกเล่มเป็น **สีแดงคล้ำ** อ่านเป็นคราบเลือด (prompt ใหม่: แดงหม่นเพราะร้อน) · โกร่งทองอยู่ใกล้ยอด ใต้โกร่งเป็นใบดาบสีเงินลงไปถึงหิน เลยอ่านเป็นดาบปักคมลง ด้ามแดงชี้ขึ้น ไม่ใช่ใบดาบชี้ฟ้าตาม prompt · พรีวิวพื้นเป็นสีขาว ส่วนอีก 3 รูปพื้นดำ ต้องเช็กว่าพื้นใสจริง | **ควร gen ใหม่** — ต่างตรงจุดที่ Chris แก้ (Note 1) โดยตรง · prompt ใหม่ระบุว่าด้ามกับโกร่งจมอยู่ในหินแล้ว |
| `img/Asia/crew-boon-asia.png` | ผ้าเทา **พาดเฉียงจากบ่าซ้ายแล้วพันลงถึงสะโพกเป็นผืนเดียว** ถือดอกบัวกับธูป = ภาพที่ Note 2 ขอให้แก้ (prompt ใหม่: ผ้าคาดเอว ไหล่เปล่า) · หน้า ผิวฟ้า เขา ดอกบัว ธูป ตรงกับ prompt | **ควร gen ใหม่** แบบโหมดแก้ภาพ แนบรูปนี้ แล้วสั่ง `keep the exact same character, face, skin, horns, pose, lotus and incense stick — change ONLY the grey cloth: nothing over the shoulders, bare shoulders, a plain grey sash tied at the waist over a short grey hip wrap, not a robe` |
| `img/Asia/mob-kasha-asia.png` | **มีสองหาง** (prompt ใหม่: หางเดียว) · ส่วนอื่นตรง: แมวดำ ไฟส้ม ตาเหลือง อุ้งเท้าวางบนล้อเกวียนไฟ · **ข้อสังเกตให้ Chris ดู:** ล้อใต้อุ้งเท้าเป็นล้อกลม **ซี่ 8 ซี่** มีดุมกลาง Mind ไม่ตัดสินเอง แต่ขอให้ดูว่าจะอ่านเป็นธรรมจักรใต้เท้าผีหรือไม่ (ประเด็นเดียวกับ soul-monk W3) | Chris บอกว่าสองหางไม่ผิดร้ายแรง → **gen ใหม่ถ้าอยากให้ถูกตำนาน** · ถ้า Chris เห็นว่าล้อ 8 ซี่เสี่ยง ให้ gen ใหม่พร้อมเปลี่ยนเป็น `a broken wooden cart wheel with many thin uneven spokes` |
| `img/Asia/st-sawan-asia.png` | **ตรงกับ prompt ใหม่** — สะพานโค้งทองประดับพลอยหลายสี ประตูสองชั้นหลังคาดำ ช่องประตูเป็นแสงขาวทอง เมฆม่วงรอบส่วนบน ไม่มีคนหรือรูปเคารพ · W3 แก้แค่ชื่อไทยกับถ้อยคำ ภาพไม่ต้องเปลี่ยน (ตามที่ Chris บอก) | **ไม่ต้อง** — เปลี่ยนแค่ชื่อที่แสดงในเกมเป็น "ประตูเทวภูมิ" (§8 ข้อ 7) |
| `img/Asia/crew-nira-asia.png` · `img/West/crew-nira-west.png` | ตรงกับที่เจ้าของตั้งใจ (นิราหน้าเดิม ชุดกิโมโน / ชุดขนสัตว์) · ปึกเอกสารเป็นขีดเส้นแบบเดียวกับโซน 1 ไม่ใช่ตัวอักษร · `crew-nira-west` ไม่เห็นดาวสี่แฉกแล้ว | **ไม่ต้อง** |
| `img/Asia/hero-yama-asia.png` + `-profile` · `img/West/hero-yama-west.png` + `-profile` | **คันจิ 知識 บนปกสมุดทั้ง 4 ใบ** · โซน 3 หมวกมีเขา · โปรไฟล์โซน 3 มีลายคล้ายรูนในฉากหลัง | **แก้ภาพตาม §5.4** (ไม่ต้อง gen ใหม่ทั้งตัว ถ้าแก้แล้วหน้าไม่เพี้ยน) |
| `img/Asia/hero-boss-asia.png` (ซามูไร) · `img/West/hero-boss-west.png` (แบบโอดิน) | เจ้าของตัดสินให้ใช้เอ็นมะ/เฮลแทน | **ทิ้ง** → ย้ายไป `img/raw/_old/` แล้ว gen ตาม §3.6 / §4.6 |
| ฉากโซน 2 ใหม่ (`img/Asia/scene-asia.*`) | ยังไม่มีไฟล์ → W1 (ริมฝั่งไม่มีกรวด) มีผลตั้งแต่ gen ครั้งแรก · `img/scene-asia.png` ที่ root เป็นตัวเก่าที่ต้องทิ้งตาม Blocker 1 ไม่ได้ gen จาก prompt ข้อ 3.3 | — |
| `img/West/crew-kan-west` `crew-taan-west` `crew-boon-west` `mob-draugr-west` | ยังไม่มีไฟล์ → B2 / W2 / เวิลวา / บัลเดอร์ มีผลตั้งแต่ gen ครั้งแรก | — |
