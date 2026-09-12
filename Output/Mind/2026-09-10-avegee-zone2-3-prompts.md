# AVEGEE — prompt รูปโซน 2 (บูรพา · เอเชียรวม เปลือกหลักจิโงกุ) · โซน 3-4 รอโครงจาก Minnie

**ผู้ทำ:** Mind · **วันที่:** 10 ก.ย. 2569 · **แก้จบ r2:** 12 ก.ย. 2569
**อ้างอิง:** Reese `Output/Reese/2026-09-10-avegee-zone2-3-research.md` (ตาราง + ธงวัฒนธรรม) ·
`AVEGEE/ASSET-PROMPTS.md` (รูปแบบโซน 1) · Toby `Output/Toby/2026-09-05-game-feasibility-v2.md` (กฎอาร์ต) ·
`AVEGEE/src/data.js` `src/art.js` `src/scene.js` (คีย์และการโหลดรูปจริง) · `img/manifest.json` · `AVEGEE/CONCEPT.md` หัวไฟล์ + §22

**r2 (11-12 ก.ย. 2569)**
- **แก้ตาม Chris** `Output/Chris/2026-09-10-avegee-monk-zone23-qa.md` **ชิ้นที่ 2** ครบทุกข้อของโซน 2:
  W1 ริมฝั่งซันซุ **ไม่มีกรวด** (§3.3) · W3 ประตูสวรรค์โซน 2 = **"ประตูเทวภูมิ"** · `the golden way up to the heavenly realm` (§3.4 · Reese ยืนยันจาก ja.wikipedia 十王 แล้วว่าปลายทางคนดีคือ **天道** ไม่ใช่ 浄土) ·
  Note 1 `st-dab-asia` → `blade tips glowing dull red with heat` · Note 2 `crew-boon-asia` → `a plain grey sash tied at the waist, not a robe` · Note 3 คาชะ **หางเดียว** ·
  Note 4 เขียน **"ทูลร์ (þulr)"** ทุกจุด (ไม่มี þ ลอยเดี่ยวเหลือในไฟล์แล้ว) · W6 ธงบท 2 ข้อ (§8 ข้อ 10-11) ·
  Mind เพิ่มเอง: `st-dab-asia` ระบุว่า **ด้ามจมหิน ใบดาบชี้ฟ้า** · ไม้เท้าหัวคนของเอ็นมะระบุว่าเป็น **หินแกะ**
  · B2 / W2 ของโซน 3 แก้ไว้ในร่างนอร์สแล้ว (§4.3) แต่ **ยังไม่เอาไป gen**
- **เจ้าของตัดสิน 11 ก.ย.** (ส่งผ่าน Claudy): บอสโซน 2 = **เอ็นมะ ผู้พิพากษาชุดขุนนางจีน** ครบชุดเท่า `hero-boss` โซน 1
  (สไปรท์ §3.6 + **โปรไฟล์** §5.1) · **ตัวซามูไรที่เจ้าของ gen ไว้ ห้ามใช้** · ชื่อโซนคง "บูรพา" · โซน 2 เป็นเอเชียรวม ·
  **ตัวละครและฉากใหม่ทั้งหมด** คงไว้แค่ยมบาทกับนิราที่เปลี่ยนชุด → ยกเลิกแนวใช้รูปโซน 1 ซ้ำ · **ไฟล์นี้มี prompt ครบทั้ง 59 ชิ้น**
- **เจ้าของเปลี่ยนใจเรื่องโซนหลัง** — โซน 3 **ไม่ใช่นอร์สล้วนแล้ว** เป็น **กรีก + นอร์สร้อน + กอทิก รวมเป็นนรกร่วมเกาะเดียว**
  และเปิด **โซน 4 นรกองค์กรนีออน (ไซเบอร์พังก์)** เพิ่ม · **Minnie กำลังออกแบบโครง** → รอบนี้ **ไม่เขียน prompt สองโซนนี้**
  ร่างนอร์สใน §4 **เก็บไว้ ไม่ลบ** เพราะนอร์สยังเป็น 1 ใน 3 ธีมของโซน 3 · §4.0 คือข้อสังเกตที่ Mind ฝากให้ Minnie ก่อนวางโครง
- **§7.2 ขนาดไฟล์เขียนใหม่** อิงตัวเลขจริงในหัว `AVEGEE/CONCEPT.md` (วัด 11 ก.ย. **137 ไฟล์ 24.0 MB**) ไม่ใช่ตัวเลขบอกต่อ
- **เทียบรูปที่เจ้าของ gen แล้ว** ใน `AVEGEE/img/raw/Asia/` กับ prompt ใหม่ ดู **§10 ท้ายไฟล์**

---

## 0. สรุปสั้นสำหรับคุณเป้

- **โซน 2 บูรพา** = เอเชียรวม · เปลือกหลักเป็นนรกญี่ปุ่นแบบม้วนภาพสมัยเฮอัน (ศาลขุนนางจีน ยักษ์โอนิ) แล้วเติมกลิ่นจีน-เกาหลี-อินเดียในชิ้นใหม่ที่ไม่เพิ่มความเสี่ยง: ผีกระโดด (จีน) · ด็อกแกบี (เกาหลี) · วิญญาณในคิวคละสี่ชาติ · นั่งร้านไม้ไผ่ · เรือแจวแบบจีน · **ไม่มีรูปเคารพพุทธหรือฮินดูเลย**
- สถานีโซน 2: กระทะ→หม้อเหล็กยักษ์ · ป่าดาบ→ภูเขาดาบ · โลกันต์→นรกบัวแดง · งิ้ว→ป่าใบมีด · ลานตรากตรำ→เชือกเหล็กดำ · หอทะเบียน→ศาลยมแบบจีน · หอส่องกรรม→กระจกโจฮาริ · ตะราง→คุกไม้ · ศาลาน้ำชา→โรงน้ำชา · ประตูสวรรค์→**ประตูเทวภูมิ** (สะพานทองขึ้นเมฆม่วง)
- ยมทูตโซน 2: ทัณฑ์→โกซุหัววัว · กานต์→โดเมียวเสมียนชาย · เพลิง→ยักษ์แดง · บุญ→ยักษ์ฟ้าใจดี · ดำ→ยักษ์จิ๋ว · ยาม→เมซุหัวม้า · **นิราตามไปในชุดกิโมโนที่มีแล้ว** · **บอส = เอ็นมะ** (ผู้พิพากษาชุดขุนนางจีน ไม่ใช่ซามูไร)
- **งบรูปโซน 2: ครบชุด 59 ชิ้น** (ชุด A ขาดไม่ได้ 25 · ชุด B 34) — ลง `img/Asia/` แล้ว **42 ไฟล์ 7.5 MB** · ที่เหลืออีก 22 ชิ้น ≈ **+4 MB** → เกมโหลดรวมราว **28 MB จากเพดาน 50 MB** (§7.2)
- **ความคืบหน้า:** เจ้าของ gen ไปแล้ว 37 ใน 59 ชิ้น — **ใช้ได้เลย 17 · แก้ภาพ 12 · gen ใหม่ 8** · ยังไม่มี 22 ชิ้น · บวกยมบาทที่ต้องแก้ 2 ไฟล์ (§10)
- **ปัญหาที่เจอซ้ำ:** ฉากหลังของ **โปรไฟล์ทั้ง 8 ใบ** และฉากห้อง 3 ใบ มี **โทริอิ** โผล่มา (บางใบมีเชือกชิเมนาวะ) · `BG-Tarang-asia` มี **คันจิ 地獄** สลักบนหิน · `hero-yama-asia` + โปรไฟล์ **มีคันจิ 知識 บนปกสมุด** → prompt โปรไฟล์และฉากห้องในไฟล์นี้เติม `no torii` ไว้แล้ว
- **โซน 3 = กรีก + นอร์สร้อน + กอทิก เกาะเดียว · โซน 4 = นรกองค์กรนีออน (ไซเบอร์พังก์)** — รอโครงจาก Minnie ก่อนเขียน prompt (§4) · งบสี่โซนเฉียดเพดาน ต้องคุมตั้งแต่ตอนวางโครง (§7.2)

---

## 1. สำรวจของที่มีก่อนเขียน (Step 0)

| ที่เจอ | ความหมาย |
|---|---|
| `img/scene-asia.png` `img/scene-west.png` มีอยู่แล้ว | **ต้อง gen ใหม่ทั้งคู่** — เป็นมุมเอียงไอโซเมตริกคนละผังกับ `img/scene.png` พิกัดใน data.js จะไม่ตรง · scene-asia มี **โทริอิ + รูปปั้นจิโซ + เทพหลายกร** ผิดธงข้อ 1-2 ของ Reese · prompt เดิมใน ASSET-PROMPTS 5.4 ต้องยกเลิก |
| `img/raw/Asia/` (เปิดดูทีละชื่อ 11 ก.ย. — เปิดดูรายชื่อทั้งโฟลเดอร์ไม่ได้) | เจอ 37 ชิ้นที่อยู่ในชุด: สถานีครบ 10 · ยมทูต 6 · บอสเอ็นมะ · ผี 3 · โปรไฟล์ 8 (`.jpeg`) · ฉากห้อง 9 (`.jpeg`) · และนอกชุด: นิรา · ยมบาท + โปรไฟล์ · ดวงไฟวิญญาณ · **ไม่เจอ:** ฉากโซน · ไซต์ก่อสร้าง · ฉากต่อสู้ · ท่าทำงาน · ท่าฟาด · วิญญาณ · เรือ · ผี 3 ตัวใหม่ |
| `hero-boss-asia` ใน `raw/Asia` | **เป็นเอ็นมะแล้ว** ตรง prompt · ตัวซามูไรเดิมเหลืออยู่ในประวัติ git เท่านั้น (CONCEPT §22.2) **ห้ามเอากลับมาใช้** |
| `hero-yama-asia` + โปรไฟล์ | ปกสมุดมี **คันจิ 知識** ทั้งสองใบ · โปรไฟล์มี **ดาวสี่แฉกลายน้ำ Gemini** มุมขวาล่าง → แก้ตาม §5.4 |
| `raw/Asia/crew-nira-asia.png` | **ลายตารางติดมาเป็นพิกเซลจริง** (พื้นไม่ใส) · ตัวที่เคยอยู่ใน `img/Asia/` พื้นใสสะอาด → ใช้ตัวที่สะอาด อย่ารัน prep-art จากไฟล์ raw นี้ |
| โค้ดใน `src/` **อ่านโฟลเดอร์โซนแล้ว** (Toby ต่อสาย 11 ก.ย. · CONCEPT §22) | `art.js artUrl()` หาไฟล์ของโซนก่อนเสมอ · รายชื่อมาจาก `manifest.json` (`zones` + `boxes`) · "กันหน้าไม่ตรง" ทำแล้ว · `prep-art.py` อ่าน `img/raw/<Zone>/` แล้ว → §8 เหลือเฉพาะข้อที่ยังไม่ปิด |
| ฉากในห้อง `BG-<Key>.webp` และ `BG-Turn-Base.webp` เป็นภาพเต็มใบ | จุดยืนใน `ROOMS` เป็นสัดส่วน 0-1 ของภาพ → ต้อง **ใช้โหมดแก้ภาพจากไฟล์โซน 1** เพื่อคงองค์ประกอบ · ห้องที่ฉากโซนต่างจากโซน 1 จริง ๆ ใส่จุดยึดแยกได้ที่ `ROOMS[k].zones.<zone>` (ตอนนี้มี `sala.asia` `sawan.asia`) · `BG-Turn-Base` (ฉากต่อสู้) มีรูปปั้นยักษ์ไทย ต้องทำใหม่ |
| `st-building.png` (ไซต์ก่อสร้าง) มี **ปั้นจั่นหัวนาค** · `prop-boat.png` เรือหัวนาค | เป็นเปลือกไทย ต้องทำใหม่ · `prop-boat` วาดบนแม่น้ำจริง (`drawBoat` ใน art.js) |
| `tile-*` ใช้เฉพาะตอนฉากโหลดไม่ขึ้น · `item-*` `fx-*` ของในระบบ · `soul-*` วิญญาณของคดีที่มีชื่อ (เรื่องไทยใน `cases.js`) · `cover` ใช้ทั้งเกม | **ใช้ร่วมทุกโซน ไม่ต้องทำใหม่** (ข้อ 2.3) |
| `spirit1-10` = วิญญาณสุ่มในคิว เป็น **คนไทย** ทั้งหมด ผูกกับ `SPIRIT_OF` `SPIRIT_SEX` | ทำใหม่ 10 ใบ **คงแบบคนเดิมทุกเลข** (เพศ วัย อาชีพ) → โค้ดใช้ตารางเดิมได้เลย |

---

## 2. กติกาใช้ร่วม

**ชื่อไฟล์** (ยึดรูปแบบที่คุณเป้ตั้งไว้แล้ว เช่น `hero-yama-asia-profile`) — ชื่อหลัก + โซน + ท่า
- ต้นฉบับเซฟที่ `img/raw/Asia/` (ตามที่เจ้าของย้ายไว้ 11 ก.ย.) แล้วให้ prep-art ส่งออกไป `img/Asia/`
- ตัวอย่าง: `st-krata-asia.png` `crew-taan-asia.png` `crew-taan-asia-work.png` `crew-taan-asia-profile.jpeg` `hero-yama-asia-atk.png` `spirit3-asia.png` `BG-Krata-asia.jpeg`
- ฉากโซน: `scene-asia.png` **1527×704 พื้นทึบ** (ทับของเดิม)

**วิธี gen มี 3 แบบ**
1. **ชิ้นพื้นใส** (สถานี ยมทูต ผี วิญญาณ ของประดับ) — บล็อกสไตล์ + prompt ต่อท้าย + บล็อกห้าม (ข้อ 2.2)
2. **ฉากโซน** — **โหมดแก้ภาพ แนบ `img/scene.png`** เท่านั้น ห้าม gen จาก prompt เปล่า (บทเรียนจาก scene-asia ที่ผังหลุด)
3. **แก้ภาพจากไฟล์โซน 1** — ฉากในห้อง · ฉากต่อสู้ · ไซต์ก่อสร้าง · เรือ · บอส · โปรไฟล์ · ท่าทำงาน (แนบไฟล์โซน 1 เป็นกรอบเสมอ)

### 2.1 สัดส่วนสถานี (ต้องเท่าโซน 1 ไม่งั้นทับโซนข้างบน)

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

> **อัปเดต 11 ก.ย. (CONCEPT §22.2):** Toby ทำ `stationBox` แล้ว — อาคารของโซนอื่นถูก **บีบลงกรอบของโซน 1 ให้อัตโนมัติ**
> (กว้างไม่เกินเนื้อภาพโซน 1 · สูงไม่เกิน 1.5 เท่า · ฐานกึ่งกลางเดิม) สัดส่วนที่ไม่ตรงตารางนี้จึง **ไม่ทำให้ทับทางเดินอีกแล้ว**
> แต่ยังทำให้ของดู **เตี้ย/ป้อมกว่าที่ควร** → ตารางนี้ยังเป็นเป้าตอน gen อยู่ · ค่าที่วัดจริงแล้วไม่ตรง: กระทะ 1.33 (ควร 2.12) · ภูเขาดาบ 2.47 (ควร 4.79) · ป่าใบมีด 1.10 (ควร 0.70)

### 2.2 บล็อกห้าม — ต่อท้าย **ทุกชิ้น**

```
AVOID: any text, letters, numbers, calligraphy, kanji, hangul, devanagari, runes, or glyph-like
marks anywhere — including on signs, scrolls, books, book covers, banners, lanterns, shields,
stones and clothing; watermark, signature, logo, UI; checkerboard pattern baked into the background;
more than one pose or animation frames; blood, gore, exposed organs, rotting flesh, severed heads;
photorealism, 3D render, painterly blur
```

แล้วต่อด้วยบล็อกห้ามโซน 2 (ข้อ 3.2)

### 2.3 ใช้ร่วมทุกโซน ไม่ต้องทำใหม่

| ของ | เหตุผล |
|---|---|
| `hero-yama-asia*` `crew-nira-asia` | เจ้าของให้ตามไปในชุดของตัวเอง — มีแล้ว (ต้องแก้ตาม §5.4) |
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
also AVOID: torii gate; shimenawa rope or zigzag shide paper streamers; Shinto shrine; manji or any
swastika-like symbol or fret pattern; rising-sun ray pattern; Jizo / Ksitigarbha statue or any
monk figure holding a ringed staff and jewel; Buddha, Amida or bodhisattva figure, statue or relief;
any Hindu god or goddess figure; many-armed or many-headed figures; child ghosts; small stacked
pebble cairns by a river; samurai armor on the judge; ninja; geisha
```

เหตุผลแต่ละข้อ (จาก Reese ข้อ 5 ญี่ปุ่น + เจ้าของ 11 ก.ย.)
- โทริอิ ห่วงเชือก shimenawa กระดาษ shide ศาลเจ้า = ของชินโต ไม่ใช่นรกพุทธ · **AI ใส่โทริอิเองในฉากหลังเกือบทุกใบที่ไม่ได้ห้ามตรง ๆ** (เจอ 11 ใบใน §10)
- จิโซ = ผู้โปรดสัตว์และร่างเดิมของเอ็นมะ **ตัดออกทั้งหมด** ไม่ใส่แม้เป็นรูปปั้นประดับ
- 卍 ผู้เล่นต่างชาติเห็นเป็นนาซี (ลายกรอบเหลี่ยมแบบจีนก็กลายเป็น 卍 ได้ จึงห้ามลายนั้นด้วย) · ลายอาทิตย์อุทัยแผ่รัศมีเป็นประเด็นอ่อนไหวในเกาหลี/จีน (เพิ่มโดย Mind)
- **ห้ามรูปเคารพพุทธและฮินดูทุกแบบ** (เจ้าของสั่ง 11 ก.ย. เมื่อโซนนี้เป็นเอเชียรวม) — ฉากเก่ามีเทพหลายกรเป็นของประดับนรก คือสิ่งที่ต้องกันไม่ให้เกิดซ้ำ
- **กองหินเตี้ยริมแม่น้ำ** = ภาพ Sai no Kawara (เด็กกองหิน) — ฉากที่ Reese ร่างไว้มี "หินกองเตี้ย ๆ" ริมฝั่ง **Mind ตัดออก** เพราะขัดธงข้อ 4 ของ Reese เอง (Chris W1 ย้ำอีกรอบ → §3.3 สั่ง `no pebbles, no stones on the shore` ตรง ๆ)
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
No text, no letters, no kanji, no numbers, no characters, no people, no statues, no torii gates.
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
| `st-lokan-asia` | นรกบัวแดง | A | the Crimson Lotus cold hell: a thick low slab of pale blue glacier ice cracked into sharp shards, with five or six large crystal formations of deep crimson ice splitting open like red lotus flowers in full bloom, frost haze drifting across, hard cold white rim light, beautiful and cruel, no figures on or inside the ice, no carved emblem on the ice floor, no red streaks or splatters, wide and low |
| `st-ngiw-asia` | ป่าใบมีด | A | the Blade-Leaf Forest: a tight grove of three tall slender trees with black iron trunks, every leaf a small sharp steel knife blade glinting silver, fallen blade-leaves scattered around the roots on cracked red-glowing soil, a faint pink-red haze at the treetops, taller than wide |
| `st-lan-asia` | เชือกเหล็กดำ | A | the Black Rope hell labour yard: two small black iron crags facing each other, a taut red-hot glowing iron chain-rope strung between their peaks, three heavy black iron blocks with rope carrying-harnesses lying at the foot, a sunken square pit of glowing embers below the rope, small and nearly square |
| `st-krajok-asia` | กระจกโจฮาริ | A | the Crystal Mirror of Enma: a large perfectly round mirror of clear crystal glass mounted in a tall carved dark wooden stand shaped like swirling clouds, a stepped vermilion lacquered base, the mirror surface glowing with soft moving silver light but showing no picture, a small bronze incense burner at the foot, tall and narrow, about twice as tall as wide |
| `st-sawan-asia` | ประตูเทวภูมิ (สะพานทอง) | A | the golden way up to the heavenly realm: a short steep arched bridge of gold inlaid with small jewels in seven colors rising up toward a two-storey Buddhist temple gate with dark tiled double roofs, the gate opening flooded with warm white-gold light, soft dusky purple clouds wrapped around the upper half, no figure, no statue inside the gate, it must look clean and bright — the only structure in the zone that is not black or burning, taller than wide |
| `st-tea-asia` | โรงน้ำชา | A | a small Japanese roadside teahouse: an open-fronted wooden hut with a thick thatched straw roof, a low bench covered in plain red felt cloth, an iron kettle hanging over a small charcoal hearth, a plain unmarked indigo curtain across the doorway, one blank white paper lantern, nearly square |
| `st-tarang-asia` | คุกศาลยม | A | an old Japanese wooden jail: a long low building whose front wall is a lattice cage of thick square dark timber bars, a heavy crossbeam door with a black iron lock, a dark tiled roof, pale ghost light leaking between the bars, long and low, about twice as wide as tall |
| `st-building-asia` | ไซต์ก่อสร้าง | A | **โหมดแก้ภาพ แนบ `img/st-building.png`** · `keep the exact same construction site layout, footprint, size, camera angle and the translucent ghost workers — change ONLY the cultural dressing: the naga-headed Thai crane becomes a plain bamboo-and-rope crane with a wooden pulley, bamboo scaffolding lashed with rope around the posts, grey stone blocks and dark timber beams, no carvings, no dragon or naga heads` (ต่อบล็อกห้ามทั้งสอง) |

> **`st-sawan-asia` — Chris W3:** ชื่อไทยคือ **"ประตูเทวภูมิ"** (天道) ไม่ใช่ "สุขาวดี" และ prompt ต้องเป็น `the golden way up to the heavenly realm`
> เหตุผล: ในคติสิบราชา (十王) ปลายทางของคนดีที่ผ่านการชั่งบุญคือ **ภพเทวดา** ส่วนสุขาวดี (浄土) ไปถึงด้วยพระปณิธานของพระอมิตาภะ คนละเรื่องกัน — **Reese ยืนยันจาก ja.wikipedia 十王 แล้ว**
> ภาพไม่ต้องเปลี่ยนอะไรเลย เปลี่ยนแค่ชื่อที่แสดงในเกม (§8 ข้อ 7)

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
> **`crew-boon-asia` — Chris Note 2:** ห้ามผ้าพาดไหล่ทุกแบบ ต้องเป็น `a plain grey sash tied at the waist, not a robe` + `bare shoulders`
> เหตุผล: ผ้าพาดบ่า + ดอกบัว + ธูป จะออกมาเป็น "ยักษ์ห่มจีวร" ซึ่งไปพ้องกับภาพล้อ 鬼の念仏 (ยักษ์แต่งเป็นพระ = คนหน้าไหว้หลังหลอก) ตรงข้ามกับนิสัยของบุญ
> `crew-dam-asia` ที่เจ้าของ gen แล้ว **กอดท่อนซุงท่อนเดียวไว้หน้าอก** ไม่ได้แบกมัดฟืนบนหลัง — ใช้รูปนั้นได้ ท่าทำงานใน §5.2 จึงเขียนให้ตรงกับรูปจริง

### 3.6 บอสโซน 2 — เอ็นมะ (A) · `hero-boss-asia.png` + โปรไฟล์ (B, §5.1)

**เจ้าของตัดสิน 11 ก.ย.:** บอสโซน 2 คือ **เอ็นมะ ผู้พิพากษาชุดขุนนางจีน** · **ตัวซามูไรที่ gen ไว้ ห้ามใช้เด็ดขาด**
(ตอนนี้เหลืออยู่ในประวัติ git อย่างเดียวแล้ว · ถ้าเจอไฟล์ค้างที่ไหน ให้ขึ้นต้นชื่อด้วย `_` หรือย้ายไป `img/raw/_old/` จะได้ไม่ถูก prep-art เก็บเข้าเกมและไม่กินงบ)
**ครบชุดเท่า `hero-boss` โซน 1 = สไปรท์ (ข้างล่าง) + โปรไฟล์ (`hero-boss-asia-profile` · §5.1)**

**สถานะ:** `raw/Asia/hero-boss-asia.png` ที่เจ้าของ gen แล้ว **ตรง prompt นี้** (หน้าแดง เคราดำ ชุดขุนนางจีนสีแดง มงกุฎดำแผ่นทองเปล่า แผ่นไม้ ไม้เท้าหัวหินแกะ) → **ใช้ได้ ไม่ต้อง gen ใหม่** (Toby ต่อสายเข้าเกมแล้ว · CONCEPT §22.2)
prompt ข้างล่างเก็บไว้ใช้ถ้าต้อง gen ซ้ำ — **โหมดแก้ภาพ แนบ `img/hero-boss.png`** (ใช้เป็นกรอบเท่านั้น) + บล็อกห้ามทั้งสอง
```
Use the reference image ONLY for framing, pose, camera angle, chibi head-to-body proportions,
canvas size, background treatment and pixel style — replace the character and the throne completely.
Enma, king-judge of hell, seated upright and front-facing on a tall vermilion lacquered Chinese
magistrate's chair with a plain gold back: stern red face, thick black eyebrows, full black beard,
crimson Chinese imperial-official robes with gold trim and wide sleeves, a tall black official's
crown with a flat top board and a plain blank gold plaque on the front, holding a flat wooden court
tablet upright in both hands, beside him a tall staff topped with two small serene faces clearly
carved from pale stone, dignified judge — not a demon, no horns, no fangs, no samurai armor,
no weapon. Single figure with the throne, centered.
```
- ไม้เท้าหัวคน (人頭杖) คือเครื่องหมายของเอ็นมะในภาพญี่ปุ่นดั้งเดิม (Reese) · ในรูปที่ gen แล้วอ่านออกว่าเป็นหินแกะ ไม่ใช่หัวคนจริง · ถ้าย่อลงขนาดในเกมแล้วดูเป็นหัวคนถูกตัด ให้ Chris ตัดสินว่าจะลบไม้เท้าออกหรือไม่
- มงกุฎต้องเป็น **แผ่นทองเปล่า** ห้ามมีอักษร 王 (ธงข้อ 7 ห้ามตัวอักษรในรูป · Chris W5) — โปรไฟล์ที่ gen แล้วยังเป็นเหรียญรูปหน้าคน ต้องแก้ (§10.2)

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

- **คาชะ — Chris Note 3:** ใช้ **`a single tail`** · สองหางเป็นลักษณะของเนโกะมาตะ ไม่ใช่คาชะ (รูปที่ gen แล้วมีสองหาง → §10.3)
- **เกียงซี:** ห้ามยันต์กระดาษบนหน้า เพราะ AI จะเขียนตัวอักษรมั่วลงไปเกือบแน่นอน · ห้ามวาดตราปักบนอกเสื้อ (ลายนก/ตัวอักษร) · ท่ากระโดดแขนเหยียดก็อ่านออกว่าเป็นเกียงซีแล้ว
- **ด็อกแกบี:** ภาพด็อกแกบีมีเขาแบบโอนิเป็นภาพที่ติดมาจากยุคอาณานิคมญี่ปุ่น คนเกาหลีวิจารณ์เรื่องนี้อยู่ จึงสั่ง `NO horns` · ในนิทานเป็นตัวแกล้งคน ใช้เป็นผีก่อกวนได้ (ความมั่นใจกลาง **ขอ Chris ดูอีกรอบ**)
- ไม่ใส่ยายถอดผ้า (奪衣婆) เป็นผีเด็ดขาด (ธง §8 ข้อ 11)

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
Same pixel art style and level of detail. No text, no letters, no kanji carved on rocks or signs,
no characters, no people, no figures in the background, no torii gates, no shimenawa rope, no shrines.
CHANGE ONLY the cultural dressing:
```

| ไฟล์ | แนบ | บรรทัด CHANGE |
|---|---|---|
| `BG-Sala-asia` | `BG-Sala` | the interior becomes a Tang-dynasty Chinese magistrate's court of records: vermilion pillars, dark wooden shelves of black lacquered document boxes and rolled blank scrolls, a tall judge's desk at the top of the stairs with an ink stone and brush stand, hanging blank paper lanterns, cinnabar and dull gold palette |
| `BG-Krata-asia` | `BG-Krata` | the three cauldrons become one huge black iron cauldron flanked by two smaller ones on stone furnaces, the Thai statues become plain black iron post lanterns, the volcano stays, ash grey stone instead of Thai carvings |
| `BG-Dab-asia` | `BG-Dab` | the blade forest becomes a steep black mountain covered in upright swords pointing to the sky, sword blades catching red fire light, needle-like iron spikes on the ridges |
| `BG-Lokan-asia` | `BG-Lokan` | the ice prison becomes a vast pale blue frozen plain where crimson ice crystals burst open like red lotus flowers, cold white mist, faint purple sky, no figures on the ice, no carved emblem on the floor, no red streaks or splatters |
| `BG-Ngiw-asia` | `BG-Ngiw` | the thorn trees become tall iron trees whose leaves are all small steel knife blades glinting silver, fallen blade-leaves on the ground, pink-red haze in the canopy, no hands or limbs coming out of the ground |
| `BG-Tea-asia` | `BG-Tea` | the Thai pavilion becomes a thatched Japanese roadside teahouse with red felt benches, an iron kettle over a charcoal hearth and blank paper lanterns |
| `BG-Tarang-asia` | `BG-Tarang` | the gaol becomes an old Japanese wooden jail with a lattice of thick square timber bars and a crossbeam door |
| `BG-Krajok-asia` | `BG-Krajok` | the mirror tower becomes a single huge round crystal mirror on a carved cloud-shaped wooden stand, glowing silver, vermilion base |
| `BG-Sawan-asia` | `BG-Sawan` | the Thai heaven gate becomes a golden arched bridge rising into dusky purple clouds toward a two-storey temple gate full of warm light, no figure in the light |
| `BG-Turn-Base-asia` | `BG-Turn-Base` | the Thai guardian statues become plain black iron post lanterns with no figures, the carved figure panels on the lower wall become plain carved cloud-scroll panels, the floor pattern becomes plain square stone paving with a simple straight border, the throne becomes a vermilion lacquered magistrate's chair, the bronze cauldron becomes a black iron cauldron, the volcano and lava stay |
| `prop-boat-asia.png` | `prop-boat` (พื้นใส) | ใช้ประโยคนี้แทนประโยคหลัก: `keep the exact same size, angle, and LEFT-facing direction as the reference — change ONLY the boat's style: a small flat-bottomed black wooden ferry sampan with a low curved woven bamboo canopy at the back and a long wooden pole, no figurehead, no carvings, fully transparent background` |

> ฉากต่อสู้ `BG-Turn-Base` เป็นลานที่ตัวละครยืนสู้กัน — พื้นกลางต้องโล่งเหมือนเดิม · ลายพื้นเดิมเป็นลายกรอบเหลี่ยม สั่งให้เรียบไว้ก่อน เพราะลายนี้กลายเป็น 卍 ได้
> ฉากห้องทุกใบต้อง **วางซ้อนกับ BG โซน 1 ก่อนใช้** — ใบที่ gen แล้ว 9 ใบ Mind ยังไม่ได้วางซ้อน (รอบนี้ทำได้แค่เปิดดู) บางใบ (Tea, Tarang) องค์ประกอบดูต่างจากห้องเดิมมาก
> ถ้าองค์ประกอบต่างจริงจนย้ายจุดยืนไม่ได้ ยังมีทางออก: ใส่จุดยึดแยกของโซนที่ `ROOMS[k].zones.asia` (ที่ทำไว้แล้วคือ `sala.asia` `sawan.asia`)

---

## 4. โซน 3 · โซน 4 — ยังไม่เขียน prompt รอบนี้

> ## ⏸ รอโครงจาก Minnie (เจ้าของเปลี่ยนใจ 11 ก.ย. 2569)
> **โซน 3 เปลี่ยนธีม** — ไม่ใช่นอร์สล้วนแล้ว แต่เป็น **กรีก + นอร์สร้อน + กอทิก รวมเป็นนรกร่วมเกาะเดียว**
> **โซน 4 เปิดใหม่** — **นรกองค์กรนีออน (ไซเบอร์พังก์)**
> Minnie กำลังออกแบบโครงทั้งสองโซน · **Mind ยังไม่เขียน prompt** จนกว่าโครงจะนิ่ง แล้วค่อยเขียนตามแบบเดียวกับโซน 2
> **ห้ามเอาอะไรในส่วนนี้ไป gen ตอนนี้** · **ร่างนอร์สข้างล่างเก็บไว้ ไม่ลบ** เพราะนอร์สยังเป็น 1 ใน 3 ธีมของโซน 3 — หยิบไปใช้ได้ทันทีเมื่อ Minnie กำหนดว่าส่วนไหนของเกาะเป็นนอร์ส
> ของที่มีอยู่แล้วใน `img/West/` (4 ไฟล์ 0.8 MB — ยมบาทใส่หมวกมีเขา + คันจิบนปกสมุด + ลายคล้ายรูนในฉากหลังโปรไฟล์ · นิราชุดขนสัตว์) รอธีมใหม่เหมือนกัน
> ต้นฉบับที่ Toby กันไว้ด้วย `_` (`_hero-boss-west*` ตัวแบบโอดินที่เจ้าของห้าม · `_st-{dab,krata,lokan,sala}-west`) **ยังไม่เข้าเกม ถูกแล้ว อย่าเพิ่งปลด**

### 4.0 ข้อสังเกตของ Mind ส่งให้ Minnie ก่อนวางโครง (สามธีมรวมเกาะ + ไซเบอร์พังก์)

| เรื่องที่ต้องตัดสินในโครง | ทำไมต้องตัดสินก่อน Mind เขียน prompt |
|---|---|
| **ธีมไหนอยู่ตรงไหนบนผัง** | ผัง `scene.png` ใช้ร่วมทุกโซน (ลาวา ท่าเรือ สะพาน แท่นพิพากษาอยู่ที่เดิมทุกโซน) → ต้องกำหนดว่ากรีก/นอร์ส/กอทิกกินพื้นที่ส่วนไหนของภาพ ไม่งั้นฉากจะเป็นของสามอย่างปนกันจนอ่านไม่ออกใน 1 วินาที |
| **ชุดสีเดียว หรือ สามชุด** | โซนหนึ่งควรมีชุดสีเดียวที่อ่านออกทันที · เสนอ **ชุดสีเดียวของโซน** แล้วให้สามธีมต่างกันที่ **รูปทรงกับวัสดุ** (หินอ่อน-ไฟกรีก / เหล็กดำ-น้ำแข็งนอร์ส / หินกอทิก-กระจกสี) ไม่ใช่ต่างกันที่สี |
| **ธงวัฒนธรรมสามชุด** | นอร์สมีธงครบแล้ว (§4.2) · **กรีก** — เทพโอลิมปัสยังมีผู้นับถือจริง (Hellenism) ต้องมีธงแบบเดียวกับนอร์ส · **กอทิก** — กางเขนและโบสถ์คริสต์ห้ามเด็ดขาด (Chris ชิ้น 2 Blocker 1 เจอโบสถ์ออร์โธดอกซ์กับโกธิกในฉากเก่ามาแล้ว) → **ต้องให้ Reese ทำธงกรีก + กอทิกก่อน** ถึงจะเขียน prompt ได้ |
| **ไซเบอร์พังก์ปะทะกฎ "ห้ามตัวอักษรในรูป"** | ป้ายนีออนคือหัวใจของธีม แต่กฎเกมห้ามตัวอักษรทุกภาษา และ AI จะเขียนตัวอักษรมั่วลงบนป้ายแน่นอน → ต้องออกแบบตั้งแต่ต้นว่าป้ายนีออนเป็น **รูปทรง/ไอคอน/แถบแสงล้วน** ไม่ใช่ไปตามแก้ทีหลัง |
| **จำนวนชิ้นต่อโซน** | สี่โซนเต็มชุดชนเพดาน 50 MB พอดี (§7.2) → โซน 3 ที่รวมสามธีม **ไม่ควรทำสถานี/ยมทูตสามชุด** ให้ใช้ชุดเดียว ~59 ชิ้นเท่าโซนอื่น แล้วต่างกันที่ฉากกับฉากในห้อง |
| **บอสของโซน 3-4** | โซน 2 ตั้งบรรทัดฐานไว้แล้วว่าบอสต้องมี **สไปรท์ + โปรไฟล์** และต้องไม่ใช่เทพของศาสนาที่ยังมีคนนับถือในฐานะลูกน้อง (Chris W4) → ถ้าโซน 3 จะใช้เฮดีส/เฮล ต้องเขียนเป็น "แดนพันธมิตร" ไม่ใช่ลูกน้องพญายม |

### 4.1 บล็อกสไตล์ธีมนอร์ส (ร่าง · เก็บไว้ใช้กับส่วนนอร์สของโซน 3)

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

**(ข) สถานี** — เหมือน (ก) แต่เปลี่ยนเป็น `single structure … viewed from the same angle as a top-down game map, no ground plate under it beyond its own footprint, no characters, no people` (ไม่ใส่ `no creatures` เพราะบางสถานีมีงู/นกกระสา)

> เจ้าของสั่งว่าธีมนอร์สของโซน 3 ต้องเป็น **"นอร์สร้อน"** ไม่ใช่นอร์สเย็นล้วน → ถ้าใช้บล็อกนี้กับเกาะรวม ต้องสลับ `cold pale-blue rim light` เป็นแสงไฟ และเติมมุสเปลเฮมเข้ามาแทนที่นิฟล์เฮล **รอโครงของ Minnie ก่อนแก้จริง**

### 4.2 ธงห้ามธีมนอร์ส (ร่าง · ยังใช้ได้ทั้งชุด)

```
also AVOID: runes or rune-like carvings of any kind; valknut or any interlocking triangles;
Othala rune; wolfsangel; sun-wheel or black sun; double lightning-bolt shapes; swastika;
horned or winged helmets; Christian cross; Thor's hammer pendant; an old one-eyed man with
eyepatch, wide-brimmed hat and spear (must not read as Odin); rotting half-corpse woman;
child ghosts; flaming giant sword; ravens or crows perched on a person
```
เหตุผลย่อ: สัญลักษณ์ที่กลุ่มเหยียดผิวยึดไป · ความเชื่อนอร์สยังมีคนนับถือ (ห้ามเทพเป็นผี/เป้า/ตัวตลก) · อีกาเกาะตัวคน = โอดิน (Chris B2) · หมวกมีเขาเป็นของแต่งยุคโรแมนติก · ดาบไฟ = Surtr · ค้อนทอร์เป็นสัญลักษณ์ศาสนาปัจจุบัน
> **ห้ามกางเขนและโบสถ์คริสต์** อยู่ในบล็อกนี้อยู่แล้ว — **ต้องคงไว้แม้ธีมกอทิกเข้ามา** เพราะกอทิกที่เจ้าของอยากได้คือ *รูปทรงสถาปัตยกรรม* ไม่ใช่ศาสนสถานคริสต์ (Chris ชิ้น 2 Blocker 1)

### 4.3 ร่างนอร์สที่ทำไว้แล้ว (ไม่ขยายต่อจนกว่าโครงจะนิ่ง)

| ส่วน | ร่าง |
|---|---|
| ฉาก `scene-west` | แก้ภาพจาก `scene.png`: หน้าผาน้ำแข็งดำในหมอก · รากไม้ยักษ์ห้อยขอบบน · ธารลาวากลายเป็นธารพิษเขียว (รูปทรงเดิม) · สะพานหุ้มทองคำเปลว · แม่น้ำเยิลล์ดำมีน้ำแข็งลอย · ไม่มีรูน ไม่มีรูปปั้น |
| สถานี | ศาล→โถงเอลยูดนีร์ · กระทะ→**บ่อเดือดคำราม (Hvergelmir)** ไม่มีไฟ · ป่าดาบ→ธารดาบสลีดร์ · โลกันต์→นิฟล์เฮล · งิ้ว→โถงกระดูกงูนาสตรอนด์ · ลาน→โม่กรอตติ · หอส่องกรรม→เนินหลุมหมอดู · ประตูสวรรค์→กิมเล · ศาลาน้ำชา→ม้านั่งมี้ด · ตะราง→ประตูเฮล |
| ยมทูต | ทัณฑ์→ดราวเกอร์ `swollen corpse-blue grey skin (clearly blue, not brown)` (Chris W2) · กานต์→**เวิลวา (völva)** ไม้เท้าเหล็กเปล่า ห้ามแมว/ขนเหยี่ยว/สร้อยใหญ่ (ของฟรายยา) **ห้ามอีกาเกาะไหล่** (Chris B2 — อีกา + ชายแก่เคราเทา + ไม้เท้า = โอดิน) · เพลิง→ยักษ์ไฟมุสเปล · บุญ→**บัลเดอร์** ห้ามมิสเซิลโทและอาวุธ ไม่มีวงแสงรอบหัว · ดำ→กังลาติ · ยาม→โมดกุดร์ · **ทูลร์ (þulr)** เดิมยกเลิก |
| บอส | **เฮล** ร่างแบ่งครึ่งซ้าย-ขวา `the cold livid blue-grey of a frozen corpse (clearly blue, not brown), the right half living human skin` (Chris W2 — ตัดคำว่า `normal` ออกแล้ว ป้องกันการอ่านเป็นประเด็นสีผิว) · เป็น **ผู้ครองแดนของตัวเองที่เปิดให้สำนักยมบาทมาตั้งสาขา ไม่ใช่ลูกน้องพญายม** |
| ผี | ดราวเกอร์เล็ก · มารา · งูพิษ · การ์ม · ม้าผีสามขา (คติยุคหลัง) · ผีตะเกียง lyktgubbe (คติยุคหลัง) |
| ค้างให้ Chris | ถ้าเฮลเป็นบอส ฉาก `YAMA_FIGHT` จะให้ผู้เล่น "ฟาดเฮล" ขัดธงนอร์สข้อ 1 · บัลเดอร์เป็นยมทูต (Chris W4 — เสนอให้ใช้ **วิญญาณมนุษย์ผู้ใจดี** แทนเทพ) |

---

## 5. โปรไฟล์ · ท่าทำงาน · ท่าฟาด · แก้ไฟล์ยมบาท (โซน 2)

### 5.1 โปรไฟล์ (B) — 8 ใบ

**โหมดแก้ภาพ แนบ 2 รูป:** รูป 1 = สไปรท์ใหม่ของโซน · รูป 2 = โปรไฟล์โซน 1 ของตัวเดียวกัน (`img/crew-<k>-profile.png` / `img/hero-boss-profile.png`)
```
Make a bust portrait of the character in image 1, using exactly the framing, camera distance,
lighting and pixel style of image 2. Keep image 1's face, skin, horns, colors, outfit and props exactly —
same number and shape of horns as image 1.
Replace the background with a hazy Jigoku landscape of sword mountains, black iron cauldrons and
vermilion court pillars, molten orange lava glow, dusky purple cloud. Square, full background.
No text, no letters, no kanji, no carved glyphs or symbols anywhere in the background,
no torii gates, no shimenawa rope, no shrines, no figures of gods, buddhas or saints,
no small people or ghosts in the background.
```

ไฟล์: `crew-taan-asia-profile` `crew-kan-asia-profile` `crew-plerng-asia-profile` `crew-boon-asia-profile` `crew-dam-asia-profile` `crew-guard-asia-profile` `crew-nira-asia-profile` `hero-boss-asia-profile`
> **`hero-boss-asia-profile` คือครึ่งที่สองของชุดบอสเอ็นมะ** (เจ้าของสั่งให้ครบชุดเท่า `hero-boss` โซน 1) — หน้ามงกุฎต้องเป็น **แผ่นทองเปล่า** เท่าสไปรท์ ไม่ใช่เหรียญรูปหน้าคน
> **ทั้ง 8 ใบที่ gen แล้วมีโทริอิในฉากหลัง** (ดู §10) · ถ้าจะแก้แทน gen ใหม่: แนบรูปนั้นแล้วสั่ง `keep the character exactly the same — change ONLY the background: remove every torii gate, shimenawa rope and shrine, replace them with dark rock and mist`

### 5.2 ท่าทำงาน (B) — 4 ใบ

ใช้วิธีของ ASSET-PROMPTS ชุดที่ 4 เป๊ะ ๆ: **โหมดแก้ภาพ แนบสไปรท์ยืนของโซน** + ประโยคล็อก
`keep the exact same character, same outfit, same colors and the same chibi head-to-body proportions as the reference image — change ONLY the pose` + ท่าข้างล่าง + บล็อกห้ามทั้งสอง

| key | ท่า |
|---|---|
| `crew-taan-asia-work` | both hands gripping his black iron three-pronged fork and jabbing it down into a fire pit, leaning into the push, ember sparks around it · same ox head, horns, nose ring and tiger-skin loincloth |
| `crew-plerng-asia-work` | crouching low, fanning flames under a black iron cauldron with a plain round paper fan with no pattern, wild curly hair blown sideways · same single horn, grey shoulder guard, tiger-skin loincloth, small flames at the feet |
| `crew-nira-asia-work` | pressing her wooden seal stamp down onto an open blank scroll, other hand steadying the paper, leaning forward slightly · same dark gold-patterned kimono with red under-layer, same hair bun |
| `crew-dam-asia-work` | staggering forward hugging the big log against his chest with both arms, back bent, knees buckling, tongue out from the effort · same grey-green skin, small horns, straw-rope loincloth (ตรงกับสไปรท์ที่ gen แล้ว ซึ่งกอดซุงไว้หน้าอก) |

### 5.3 ท่าฟาดยมบาท (B) — `hero-yama-asia-atk.png`

**แนบ `hero-yama-asia.png` ที่แก้ตาม 5.4 แล้ว** + ประโยคล็อก + ท่านี้ (บทเรียนจาก ASSET-PROMPTS ชุดที่ 4: หันขวา · ไม่มีลูกไฟ)
```
mid-throw attack pose FACING TO THE RIGHT side of the canvas: one arm thrown forward, the other arm
pulled back, torso twisted with weight behind the throw, one foot forward, expression turns from
worried to determined, no projectile, just the throwing motion — the court robe, tall black court cap,
horns and the plain blank book tucked under one arm stay exactly as in the reference
```

### 5.4 แก้ไฟล์ยมบาทที่มีอยู่ (ไม่ใช่ชิ้นใหม่ · ต้องทำก่อนเข้าเกม)

**โหมดแก้ภาพ แนบไฟล์นั้นเอง** · ขึ้นต้นด้วย `keep everything in the image exactly the same — change ONLY:`

| ไฟล์ | ปัญหา | change ONLY |
|---|---|---|
| `raw/Asia/hero-yama-asia.png` | ปกสมุดมี **คันจิ 知識** (ขัดกฎ "ห้ามตัวอักษรในรูป" ของเกม) · มีพิกเซลหลงสองสามจุดข้างหัวด้านขวา | `the book cover: a plain blank dark leather cover with no characters, no letters, no symbols; remove the stray pixels to the right of his head` |
| `raw/Asia/hero-yama-asia-profile.png` | ปกสมุดมี **คันจิ 知識** · **ดาวสี่แฉกลายน้ำ Gemini** มุมขวาล่าง | `the book cover: a plain blank dark leather cover with no characters, no letters, no symbols; remove the small four-pointed sparkle in the bottom-right corner` |

> เป็นกฎของเกมเอง (ห้ามตัวอักษร · ห้ามลายน้ำ) แก้ได้เลย ไม่ต้องรอ Chris · ถ้าแก้ภาพแล้วหน้าเพี้ยน gen ใหม่จาก `img/hero-yama.png` ด้วยประโยคเปลี่ยนชุดแทน

---

## 6. เรื่องที่เจ้าของตัดสินแล้ว (11 ก.ย. 2569) และที่ยังต้องให้ Chris ดู

| เรื่อง | ตัดสิน | ผลในไฟล์นี้ |
|---|---|---|
| ยมทูต: ตัวใหม่ตามตำนาน หรือ ตัวเดิมเปลี่ยนชุด | **ตัวใหม่ทั้งหมด** ยกเว้นยมบาทกับนิราที่ใช้ชุดของโซนที่มีแล้ว | ตารางเปลี่ยนชุดของรอบก่อน **ยกเลิก** · prompt โดโช **ยกเลิก** |
| บอสโซน 2 | **เอ็นมะ** ชุดขุนนางจีน ครบชุดเท่า `hero-boss` โซน 1 (สไปรท์ + โปรไฟล์) · **ซามูไรห้ามใช้** | §3.6 · §5.1 |
| ชื่อโซน | คง **"โซนบูรพา"** | sub คง "จีน · ญี่ปุ่น · เกาหลี · อินเดีย" |
| โซน 2 | **เอเชียรวม** — ไม่รื้อ prompt ญี่ปุ่นเดิม เติมชาติอื่นในชิ้นใหม่ · ห้ามรูปเคารพพุทธ/ฮินดู | §3.7 (เกียงซี ด็อกแกบี) · §3.8 (วิญญาณสี่ชาติ) · §3.9 (เรือแจว นั่งร้านไม้ไผ่) · บล็อกห้าม §3.2 |
| งบอาร์ต | **ครบชุด 59 ชิ้น** ยกเลิกแนวใช้รูปโซน 1 ซ้ำ | §7 |
| **โซน 3** | **กรีก + นอร์สร้อน + กอทิก รวมเป็นนรกร่วมเกาะเดียว** (ยกเลิก "นอร์สล้วน") | §4 — Minnie วางโครงก่อน · ร่างนอร์สเก็บไว้เป็น 1 ใน 3 ธีม |
| **โซน 4 (เปิดใหม่)** | **นรกองค์กรนีออน (ไซเบอร์พังก์)** | §4 — Minnie วางโครงก่อน · §4.0 มีข้อควรระวังเรื่องป้ายนีออนกับกฎห้ามตัวอักษร |

**ยังต้องให้ Chris ดู (Mind ไม่ตัดสินเอง)**
1. **ด็อกแกบี** (§3.7) — ความมั่นใจกลาง
2. **ล้อใต้อุ้งเท้าคาชะ** ซี่ 8 ซี่ — จะอ่านเป็นธรรมจักรใต้เท้าผีไหม (§10)
3. **ลายดอกบัวสลักบนพื้นน้ำแข็ง** ที่ผู้คนเดินทับ ใน `st-lokan-asia` / `BG-Lokan-asia` (§10) — prompt ใหม่ห้ามไว้แล้ว แต่ถ้าเจ้าของอยากเก็บรูปเดิม ต้องให้ Chris ดู
4. **มือโผล่จากดิน** ใน `BG-Ngiw-asia` — เกินเส้น "ไม่ gore" ไหม
5. **ไม้เท้าหัวหินแกะของเอ็นมะ** — ย่อลงขนาดในเกมแล้วยังอ่านเป็นหินแกะไหม (§3.6)

---

## 7. งบรูปและขนาดไฟล์ (โซน 2)

### 7.1 ชิ้นต่อโซน

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

- **ครบชุด 59 ชิ้น** · ตัวเลือกดวงไฟวิญญาณเพิ่มได้อีก 1 (ชุด C — เจ้าของ gen ไว้แล้ว)
- **เทียบกับรอบก่อน:** เดิม A+B 23 ชิ้น (ใช้ของโซน 1 ซ้ำ) → ตอนนี้ 59 ชิ้น = **เพิ่ม 36 ชิ้น** มาจาก วิญญาณ 10 · โปรไฟล์ 8 · ท่าทำงาน+ท่าฟาด 5 · ฉากในห้องที่เคยเป็น C 4 + ฉากต่อสู้ 1 · สถานีที่เคยเป็น C 2 + ไซต์ก่อสร้าง 1 · ผีเพิ่ม 4 · บอส 1 · เรือ 1 · (ลบนิราที่มีแล้ว −1)
- **ความคืบหน้าจากรูปใน `raw/Asia/`:** มีแล้ว 37 ชิ้น (ใช้ได้เลย 17 · แก้ภาพ 12 · gen ใหม่ 8) · **ยังไม่มี 22 ชิ้น:** ฉากโซน · ไซต์ก่อสร้าง · ผี 3 (เปรตปากเข็ม เกียงซี ด็อกแกบี) · วิญญาณ 10 · ฉากต่อสู้ · ท่าทำงาน 4 · ท่าฟาด · เรือ

### 7.2 ขนาดไฟล์ — อิงตัวเลขจริงในหัว `AVEGEE/CONCEPT.md`

**ฐานที่ใช้ (วัดจริง 11 ก.ย. 2569 · หัว CONCEPT.md + §22.4):** เกมโหลดจริง **137 ไฟล์ 24.0 MB จากเพดาน 50 MB = 48%**

| โฟลเดอร์ | ไฟล์ | ขนาด | เฉลี่ย/ไฟล์ |
|---|---|---|---|
| `img/` (โซน 1 + ของใช้ร่วมทุกโซน) | 91 | 15.7 MB | 0.17 MB |
| `img/Asia/` (โซน 2 ที่ลงไปแล้ว) | 42 | 7.5 MB | **0.18 MB** |
| `img/West/` (โซน 3 ของเก่า) | 4 | 0.8 MB | 0.20 MB |
| **รวมที่เกมโหลด** | **137** | **24.0 MB** | |

> `img/raw/` (ต้นฉบับ 105 MB) ผู้เล่นไม่โหลด ไม่นับในงบนี้ แต่ถ่วง repo
> ตัวเลขเก่าที่ **เลิกใช้แล้ว**: "79 ไฟล์ 15.3 MB" (CONCEPT §18.3) และ "43 ไฟล์ 7.9 MB" — ทั้งคู่เป็นของก่อนต่อสายโฟลเดอร์โซน

**โซน 2 เต็มชุดกินกี่ MB**
- ลง `img/Asia/` ไปแล้ว **42 ไฟล์ 7.5 MB** = 37 ชิ้นในชุด 59 + นอกชุดอีกราว 5 (ยมบาท 2 · นิรา + โปรไฟล์ · ดวงไฟวิญญาณ)
- เหลืออีก **22 ชิ้น** × 0.18 MB ≈ **+4.0 MB** → `img/Asia/` เต็มชุดราว **64 ไฟล์ 11.5 MB**
- **กรณีหนักกว่าเฉลี่ย:** ใน 22 ชิ้นที่เหลือมีฉากโซนเต็มใบ png 1527×704 (ใบเดียวอาจ 1-2 MB) + ฉากต่อสู้ webp → เผื่อเป็น **+5.5 MB → 13 MB**

| | ไฟล์ | ขนาด | % ของ 50 MB |
|---|---|---|---|
| ตอนนี้ | 137 | 24.0 MB | 48% |
| **+ โซน 2 ครบชุด (อีก 22 ชิ้น)** | **159** | **~28 MB** (กรณีหนัก ~29.5 MB) | **56-59%** |
| − ถอดฉากเก่า `scene-asia`/`scene-west` ที่ผิดธง | −2 | ประมาณ −0.5 MB | |

**คำตอบเรื่องเพดาน 50 MB เมื่อมีสี่โซน — เฉียดฉิว ต้องคุมตั้งแต่วางโครง**
- ถ้าโซน 3 และโซน 4 ใช้ชุดเท่าโซน 2 (โซนละ 59 ชิ้น ≈ 11.5 MB) → **28 + 11.5 + 11.5 ≈ 51 MB = เกินเพดาน**
- วิธีที่ประหยัดได้โดย **ไม่ต้องตัดของออกสักชิ้น**:

| วิธี | ประหยัด |
|---|---|
| โปรไฟล์ 8 ใบ/โซน เก็บเป็น webp q82 เหมือน `BG-*` แทน jpeg/png | ~0.8 MB/โซน |
| วิญญาณในคิว 10 ใบ ย่อเหลือ 256² (บนจอสูงแค่ 38-72 px อยู่แล้ว) | ~1.0 MB/โซน |
| ฉากในห้อง 10 ใบ ใช้ webp q78 แทน q82 | ~0.3 MB/โซน |
| ไล่บีบ `img/` โซน 1 ที่ยังเป็น png เต็ม (91 ไฟล์ 15.7 MB — ก้อนหนักที่สุดในเกม) | 2-4 MB ครั้งเดียว |

  รวมแล้วสี่โซนจะอยู่ราว **44-46 MB** — ยังใต้เพดาน แต่ **ไม่เหลือที่เผื่อโซน 5**
- **ข้อเสนอของ Mind:** โซน 3 ที่รวมสามธีมต้องใช้ **ชุดเดียว ~59 ชิ้นเท่าโซนอื่น** ให้ธีมต่างกันที่ฉากโซนกับฉากในห้อง — ถ้าทำสถานี/ยมทูตแยกสามธีมจะกลายเป็น 100+ ชิ้น และชนเพดานแน่นอน
- **ข้อควรรู้:** ผู้เล่นโหลดเฉพาะโซนที่ไปถึง (CONCEPT §22.4 · `art.js` อุ่นชุดของโซนตอนเข้าโซน) ต่อหนึ่งเซสชันจึงเบากว่านี้มาก — แต่ตัวที่ชนเพดานคือ **ผลรวมทั้งเกม** ที่ผู้เล่นต้องโหลดครบเมื่อเล่นจนจบ
- **ของที่ต้องย้ายออกจาก `img/`** (ไม่งั้นกินงบฟรี ๆ): `scene-asia.png` `scene-west.png` ตัวเก่า → `img/raw/_old/` หรือขึ้นต้นชื่อด้วย `_`

### 7.3 ลำดับ gen ที่แนะนำ
ฉากโซน → ไซต์ก่อสร้าง → regen 3 ชิ้นที่เห็นบนแผนที่ (ภูเขาดาบ นรกบัวแดง บุญ) → ผีใหม่ 3 → แก้โทริอิในโปรไฟล์ + ฉากห้อง → วิญญาณ 10 → ฉากต่อสู้ → ท่าทำงาน 4 + ท่าฟาด → เรือ
อัตรา 6-10 ชิ้นต่อสัปดาห์ของ Toby → ส่วนที่ยังไม่มี 22 ชิ้นใช้ราว 2-4 สัปดาห์ บวกงานแก้ภาพ 12 ชิ้น + ยมบาท 2 และ gen ใหม่ 8 ชิ้น

---

## 8. ส่งต่อ Toby (เรื่องโค้ดที่รูปชุดนี้ต้องใช้)

> **อัปเดต 11 ก.ย. (CONCEPT §22):** ข้อ 1 · 2 · 8 **ทำเสร็จแล้ว** — `art.js artUrl()` หาไฟล์ของโซนก่อน · `manifest.json` มี `zones`/`boxes` · `prep-art.py` อ่าน `img/raw/<Zone>/` และรับ `.jpeg` · กันหน้าไม่ตรงทำแล้ว · `hero-boss-asia` ต่อสายแล้ว · `stationBox` บีบสัดส่วนอาคารให้เอง
> ข้อที่ยังไม่ปิดคือ **3 · 4 · 5 · 6 · 7 · 9 · 10 · 11**

1. ~~**ต่อสายโฟลเดอร์โซน**~~ ✅ ทำแล้ว — ทุกคีย์หา `img/Asia/<ชื่อหลัก>-asia[-ท่า]` ก่อน (ชื่อโซนอยู่ **ก่อน** คำท้าย `-profile` `-work` `-atk`) · **ดรอปรูปใหม่แล้วต้องรัน `prep-art.py` เสมอ** ไม่งั้นไม่เข้า manifest
2. ~~**กันหน้าไม่ตรง**~~ ✅ ทำแล้ว — ไม่มีท่านั้นในโซน `artUrl` คืน `null` แล้วใช้ท่ายืนของโซนแทน ไม่หยิบของโซน 1 มาปน
3. **`raw/Asia/crew-nira-asia.png` มีลายตารางติดเป็นพิกเซล** — อย่ารัน prep-art ทับตัวที่สะอาดที่เคยอยู่ใน `img/Asia/`
4. **walk.js** — `buildWalk` จำภาพใบแรกที่โหลดได้ (scene.js 51-55) · ถ้าเริ่มจากเซฟโซน 2 ภาพแรกคือ `scene-asia` ต้องเช็กว่าสีลาวาอ่านได้เหมือนเดิม
5. **ผีใหม่** — ตอนนี้ `MOB.kinds` 7-10 คือ กากิ คาชะ นุเคะคุบิ ดวงไฟวิญญาณ และ `ZONES.asia.mobs = [7,1,2,8,9,10]` ซึ่ง **ยังมี index 1-2 ที่เป็นผีไทยของโซน 1 ปนอยู่** → พอได้ `mob-harikuchi` `mob-jiangshi` `mob-dokkaebi` แล้วให้แทนที่ 1,2 ทิ้ง · `mob-pret`/`mob-werewolf` โซน 1 **ไม่ใช้ในโซน 2**
6. **วิญญาณในคิว** — `spirit1-10-asia` คงแบบคนเดิมทุกเลข → `SPIRIT_OF` / `SPIRIT_SEX` ใช้ตารางเดิมได้ แค่เปลี่ยนคีย์รูปตามโซน
7. **ข้อความโซน** — คงชื่อ "โซนบูรพา" · sub คง "จีน · ญี่ปุ่น · เกาหลี · อินเดีย" · ชื่อที่แสดงของ `sawan` โซน 2 = **"ประตูเทวภูมิ"** (ไม่ใช่สุขาวดี — Chris W3 · Reese ยืนยันแล้ว)
8. ~~**บอสแยกโซน**~~ ✅ ทำแล้ว — `hero-boss` อ่านตามโซน (โซน 2 = เอ็นมะ) · ตัวซามูไรเหลืออยู่ในประวัติ git เท่านั้น ห้ามเอากลับมา
9. **ASSET-PROMPTS.md ข้อ 5.4** (prompt scene-asia/scene-west เดิม) มีคำสั่งให้ใส่โทริอิกับรูปปั้นจิโซ และโบสถ์โกธิก/ออร์โธดอกซ์ — **ควรลบแล้วชี้มาที่ไฟล์นี้แทน** ไม่งั้นจะมีคนหยิบไป gen ซ้ำ · และเช็กว่า `ZONES[].scene` ไม่ได้ชี้ไปฉากเก่าสองใบนั้นแล้ว (Chris ชิ้น 2 Blocker 1)
10. **ธงบทธีมนอร์ส (Reese ธงนอร์สข้อ 3 · Chris W6)** — _ใช้กับส่วนนอร์สของโซน 3 (1 ใน 3 ธีม)_ · บทโซน 3 **ห้ามบอกว่าวิญญาณตายเพราะป่วยหรือแก่แล้วโดนลงโทษ** · เฮลคือแดนของคนตายทั่วไป ทัณฑ์มีเฉพาะที่นาสตรอนด์กับนิฟล์เฮล · ห้ามผูกโทษกับสาเหตุการตาย · **ธงกรีกกับกอทิกยังไม่มี — ต้องให้ Reese ทำก่อนเขียนบทโซน 3**
11. **ธงโค้ดโซน 2 (Reese ธงญี่ปุ่นข้อ 5 · Chris W6)** — **ยายถอดผ้า (奪衣婆 ดัตสึเอบะ) ห้ามเป็นผีก่อกวนให้ฟาด** เพราะยังมีคนบูชาจริง · ห้ามใส่ใน `MOB.kinds` และห้ามเป็นเป้าของ `smite` · ไฟล์นี้ไม่มี prompt ของเธอ ต้นไม้แขวนเสื้อผ้าในฉากโซน 2 เป็นแค่ร่องรอย ไม่มีตัวคน

---

## 9. เช็กก่อนส่งเข้าเกม (เพิ่มจากของโซน 1)
- [ ] ไม่มีตัวอักษร คันจิ ฮันกึล หรือรูน **แม้แต่ลายที่ดูคล้าย** บนป้าย ม้วนหนังสือ **ปกสมุด** โคม หิน และ **ฉากหลังของโปรไฟล์/ฉากห้อง**
- [ ] ไม่มีลายน้ำ Gemini (ดาวสี่แฉกมุมขวาล่าง) และพื้นใสจริง ไม่ใช่ลายตารางที่ติดมาเป็นพิกเซล
- [ ] ไม่มีโทริอิ เชือกชิเมนาวะ ศาลเจ้า จิโซ 卍 (รวมลายกรอบเหลี่ยม) กองหินหรือกรวดริมน้ำ **รูปเคารพพุทธหรือฮินดู** — **ดูฉากหลังให้ทั่ว** เพราะ AI ใส่โทริอิไว้ไกล ๆ บ่อยมาก
- [ ] สถานีและฉากห้องไม่มีคนหรือยักษ์ตัวเล็ก ๆ วาดติดมา (โค้ดวางตัวละครเอง) · ไม่มีรอยแดงที่อ่านเป็นเลือด
- [ ] เกียงซีไม่มียันต์ · ด็อกแกบีไม่มีเขา · คาชะหางเดียว · โปรไฟล์มีจำนวนเขาเท่ากับสไปรท์
- [ ] เอ็นมะ: ไม่ใช่ซามูไร ไม่มีเขา ไม่มีเขี้ยว · หน้ามงกุฎเป็นแผ่นทองเปล่า ไม่มีอักษร 王 (ทั้งสไปรท์และโปรไฟล์)
- [ ] วิญญาณในคิว: เพศ/วัยตรงกับเลขเดิม (`SPIRIT_SEX`) · ไม่มีเครื่องหมายศาสนาบนตัว · หันขวา
- [ ] ฉากโซนวางซ้อน `scene.png` แล้วผังตรงกันทุกจุด · ฉากห้อง/ฉากต่อสู้วางซ้อนไฟล์โซน 1 แล้วพื้นที่เดินอยู่ที่เดิม
- [ ] สถานีวางเรียงกันแล้วสัดส่วนตรงตาราง 2.1 (โค้ดบีบกรอบให้ก็จริง แต่บีบแล้วของจะดูเตี้ยกว่าที่ควร)

---

## 10. รูปที่เจ้าของ gen แล้วใน `img/raw/Asia/` เทียบกับ prompt ใหม่ (r2 · 11-12 ก.ย.)

เปิดดูรูปจริงทีละชื่อ · **รอบนี้เปิดดูรายชื่อทั้งโฟลเดอร์ไม่ได้** ถ้ามีไฟล์ชื่ออื่นในโฟลเดอร์ ให้เทียบกับ prompt ในไฟล์นี้ก่อนใช้
Mind บอกแค่ว่ารูปต่างจาก prompt ใหม่ตรงไหน **เรื่องวัฒนธรรมให้ Chris ตัดสิน** · "แก้ภาพ" = แนบรูปนั้นแล้วสั่ง `keep everything exactly the same — change ONLY …`
นับเฉพาะ 37 ชิ้นที่อยู่ในชุด 59: **ใช้ได้เลย 17 · แก้ภาพ 12 · gen ใหม่ 8** · ยมบาท 2 ไฟล์กับนิรานับแยก (§10.4)

### 10.1 ใช้ได้เลย (17)

| ไฟล์ | หมายเหตุ |
|---|---|
| `st-sala-asia.png` | ตรง prompt ครบ (หลังคาเขียว เสาแดงชาด โคมเปล่า หีบดำ บันได) |
| `st-krata-asia.png` | เนื้อหาตรง · **สัดส่วนราว 1.3:1 ไม่ใช่ 2:1** → `stationBox` บีบกรอบให้แล้ว ไม่ทับทางเดิน แต่จะดูป้อมกว่ากระทะโซน 1 |
| `st-lan-asia.png` | ตรง prompt |
| `st-krajok-asia.png` | ตรง · กระจกออกเป็นลูกแก้วกลมมากกว่าแผ่นกระจก (ไม่ต้องแก้) · พรีวิวพื้นขาวต่างจากรูปอื่น ต้องเช็กว่าพื้นใสจริง |
| `st-sawan-asia.png` | ตรง prompt ใหม่ · W3 แก้แค่ชื่อไทย → เปลี่ยนชื่อที่แสดงเป็น "ประตูเทวภูมิ" |
| `st-tea-asia.png` | ตรง prompt |
| `st-tarang-asia.png` | ตรง prompt |
| `st-ngiw-asia.png` | **ปรับคำตัดสิน 12 ก.ย.: ใช้ได้** — เดิมสั่ง gen ใหม่เพราะ **กว้างกว่าสูง** (1.10 ทั้งที่ควร 0.70) แต่ `stationBox` บีบลงกรอบโซน 1 ให้แล้ว จึงไม่ล้นทางเดิน · ต้นไม้ 8 ต้นแทน 3 ไม่เสียหาย · **ข้อแลก:** ดงไม้จะดูเตี้ยกว่าต้นงิ้วโซน 1 ชัดเจน — ถ้าเจ้าของรับไม่ได้ค่อย gen ใหม่ด้วย `taller than wide` |
| `crew-taan-asia.png` | ตรง · ตัวสูงราว 4 หัว ไม่ใช่ชิบิ 3 หัว → วางเทียบ `crew-taan.png` ขนาดในเกมก่อน |
| `crew-kan-asia.png` | ตรง (ถือแว่นขยายมีด้าม แทนเลนส์กลม — ไม่ต้องแก้) |
| `crew-plerng-asia.png` | ตรง · มีเกราะไหล่ลายเมฆเพิ่มมา (ไม่เสียหาย) |
| `crew-dam-asia.png` | กอด **ท่อนซุงท่อนเดียวไว้หน้าอก** ไม่ใช่แบกมัดฟืนบนหลัง → ใช้ได้ ปรับท่าทำงานให้ตรงแล้ว (§5.2) |
| `crew-guard-asia.png` | ตรง · เกราะออกเป็นชุดเกราะซามูไร (บล็อกห้ามซามูไรใช้กับผู้พิพากษาเท่านั้น) · สูงราว 5 หัว |
| `hero-boss-asia.png` | **เป็นเอ็นมะแล้ว ตรง prompt** (§3.6) · ไม้เท้าหัวหินแกะ ให้ Chris ดูที่ขนาดจริงในเกม |
| `mob-nukekubi-asia.png` | ตรง prompt |
| `mob-gaki-asia.png` | ตรง prompt |
| `BG-Sawan-asia.jpeg` | ตรง ไม่มีโทริอิหรือรูปคน · ยังต้องวางซ้อน `BG-Sawan` โซน 1 |

### 10.2 แก้ภาพพอ (12)

| ไฟล์ | ต่างจาก prompt ใหม่ตรงไหน | change ONLY |
|---|---|---|
| `hero-boss-asia-profile.jpeg` | ฉากหลังมี **โทริอิแดง** (ซ้าย) และ **ศาลเจ้ามีเชือกชิเมนาวะกับกระดาษชิเดะ** (ขวา) · หน้ามงกุฎเป็นเหรียญรูปหน้าคน ไม่ใช่แผ่นทองเปล่าแบบในสไปรท์ | ลบโทริอิ/ศาลเจ้า/เชือก · หน้ามงกุฎเป็นแผ่นทองเปล่า |
| `crew-taan-asia-profile.jpeg` | ขวากลางมีโครงเสาคานคล้ายโทริอิ (ความมั่นใจกลาง) · มีร่างคนเล็ก ๆ ห้อยบนต้นไม้ใบมีด | ลบโครงคล้ายโทริอิและร่างคนบนต้นไม้ |
| `crew-kan-asia-profile.jpeg` | ผนังมีภาพวาด **โทริอิแดง** ทั้งสองข้าง + ภาพโครงกระดูก | ลบโทริอิบนผนัง |
| `crew-plerng-asia-profile.jpeg` | **มีสองเขา** แต่สไปรท์มีเขาเดียว · โทริอิมุมซ้ายบน · ยักษ์ตัวเล็กในฉากหลัง | เหลือเขาเดียวกลางหน้าผาก · ลบโทริอิ |
| `crew-dam-asia-profile.jpeg` | โทริอิสองหลัง · เขาใหญ่กว่าเขาจิ๋วในสไปรท์ | ลบโทริอิ · เขาเล็กลงเท่าสไปรท์ |
| `crew-guard-asia-profile.jpeg` | โทริอิสองหลัง | ลบโทริอิ |
| `crew-nira-asia-profile.jpeg` | โทริอิสองหลัง | ลบโทริอิ |
| `BG-Sala-asia.jpeg` | ช่องหน้าต่างกลางห้องมองออกไปเห็น **โทริอิสองหลัง** | ลบโทริอิ แทนด้วยหินและหมอก |
| `BG-Krata-asia.jpeg` | มี **ยักษ์ตัวเล็ก 4 ตัววาดติดมา** (ล่างซ้าย-ขวา) · ภาพสลักหน้ายักษ์บนผนังไม่เป็นไร | ลบยักษ์ตัวเล็กทั้ง 4 |
| `BG-Krajok-asia.jpeg` | **โทริอิ** ในฉากหลังด้านขวา · ขาตั้งมีมังกรแกะ (ไม่เป็นไร) | ลบโทริอิ |
| `BG-Dab-asia.jpeg` | ตรงเกือบหมด · รอยแดงบนดาบอ่านเป็นแสงไฟได้ · มีหัวกะโหลกเล็ก ๆ ปนอยู่ | ถ้า Chris เห็นว่ารอยแดงเป็นเลือด: `sword blades catch orange fire light, no dark red streaks` |
| `BG-Ngiw-asia.jpeg` | ป่าใบมีดตรง prompt แต่มี **มือ/แขนโผล่จากดิน** หลายจุด (Chris ดูว่าเกินเส้นไหม) · ภาพสลักหน้ายักษ์บนหน้าผาไม่เป็นไร | `remove every hand and arm coming out of the ground` |

> **แก้โทริอิทีเดียวได้ทั้ง 9 ใบ** (โปรไฟล์ 7 + ฉากห้อง 2): `keep the character/room exactly the same — change ONLY the background: remove every torii gate, shimenawa rope and shrine, replace them with dark rock and mist`

### 10.3 ควร gen ใหม่ (8)

| ไฟล์ | ต่างจาก prompt ใหม่ตรงไหน |
|---|---|
| `st-dab-asia.png` | ปลายบนสุดของดาบทุกเล่มเป็น **สีแดงคล้ำ** อ่านเป็นคราบเลือด (Chris Note 1 — prompt ใหม่: `blade tips glowing dull red with heat` แดงหม่นเพราะร้อน) · โกร่งทองอยู่ใกล้ยอด อ่านเป็นดาบปักคมลง ด้ามชี้ขึ้น ไม่ใช่ใบดาบชี้ฟ้า (prompt ใหม่สั่ง `hilts and crossguards buried in the rock`) · พรีวิวพื้นขาว เช็กพื้นใส |
| `st-lokan-asia.png` | มี **คนตัวเล็กราว 20 ตัว** เดินบนน้ำแข็ง (สถานีห้ามมีคน) · **รอยแดงคล้ายเลือดสาด** · **ลายดอกบัวสลักกลางพื้น** ที่คนเดินทับ (Chris ดู) · เกือบจัตุรัส ไม่ใช่กว้าง-เตี้ย · ดอกบัวแดงเล็ก ไม่ใช่ผลึกใหญ่ |
| `crew-boon-asia.png` | ผ้าเทา **พาดเฉียงจากบ่าซ้ายแล้วพันลงถึงสะโพกเป็นผืนเดียว** + ดอกบัว + ธูป = ภาพที่ Chris Note 2 ขอให้แก้ (เสี่ยงอ่านเป็น "ยักษ์ห่มจีวร" 鬼の念仏) · แก้ภาพได้: `change ONLY the grey cloth: nothing over the shoulders, bare shoulders, a plain grey sash tied at the waist over a short grey hip wrap, not a robe` |
| `crew-boon-asia-profile.jpeg` | ผ้าคลุม **ทั้งสองบ่า** แบบจีวร (ขัด Note 2) · โทริอิสองหลัง · หน้าร้องไห้ ต่างจากสไปรท์ที่ยิ้มเศร้า → ทำใหม่หลังได้สไปรท์บุญใหม่ |
| `mob-kasha-asia.png` | **มีสองหาง** (Chris Note 3 — สองหางคือเนโกะมาตะ ไม่ใช่คาชะ · prompt ใหม่: `a single tail`) · **ข้อสังเกตให้ Chris ดู:** ล้อใต้อุ้งเท้าเป็นล้อกลม **ซี่ 8 ซี่** มีดุมกลาง จะอ่านเป็นธรรมจักรใต้เท้าผีไหม (ประเด็นเดียวกับ soul-monk W3) · ถ้าเสี่ยง ให้เปลี่ยนเป็น `a broken wooden cart wheel with many thin uneven spokes` |
| `BG-Lokan-asia.jpeg` | ปัญหาเดียวกับ `st-lokan-asia`: คนตัวเล็กเต็มพื้น · รอยแดงคล้ายเลือด · ลายดอกบัวสลักกลางพื้น |
| `BG-Tea-asia.jpeg` | **โทริอิ** ในฉากหลัง · โคมมีลายคล้ายตัวอักษร · มีกล่องแดงทองบนม้านั่งคล้ายศาลเจ้าเล็ก (ความมั่นใจกลาง) · องค์ประกอบเป็นโถงสองชั้น ดูต่างจาก `BG-Tea` โซน 1 มาก → gen ใหม่จากไฟล์โซน 1 |
| `BG-Tarang-asia.jpeg` | **คันจิ 地獄 และตัวอักษรอื่นสลักบนหินและป้ายประตู** หลายจุด · มี **ยักษ์ซามูไรวาดติดมา** มุมขวาล่าง · องค์ประกอบเป็นคุกทั้งเมือง ดูต่างจาก `BG-Tarang` โซน 1 มาก → gen ใหม่จากไฟล์โซน 1 |

### 10.4 นอกชุด 59 และที่ไม่เจอ
- `hero-yama-asia.png` · `hero-yama-asia-profile.png` — **คันจิ 知識 บนปกสมุด** + โปรไฟล์มีลายน้ำ Gemini → **แก้ภาพตาม §5.4**
- `crew-nira-asia.png` (raw) — **ลายตารางติดเป็นพิกเซล** ใช้ตัวที่สะอาดเดิมแทน (§8 ข้อ 3) · ชุดกิโมโนตรงกับที่เจ้าของตั้งใจ ไม่ต้อง gen ใหม่
- `mob-hitodama-asia.png` (ชุด C) — ตรง prompt ใช้ได้
- **บอสซามูไรตัวเก่า** — ไม่อยู่ใน `raw/Asia/` แล้ว เหลือในประวัติ git เท่านั้น (CONCEPT §22.2) · **ห้ามเอากลับมาใช้** ตามคำสั่งเจ้าของ 11 ก.ย.
- ไม่เจอไฟล์: `scene-asia` · `st-building-asia` · `BG-Turn-Base-asia` · `crew-*-asia-work` · `hero-yama-asia-atk` · `spirit*-asia` · `prop-boat-asia` · `mob-harikuchi/jiangshi/dokkaebi-asia` → prompt ในไฟล์นี้มีผลตั้งแต่ gen ครั้งแรก
