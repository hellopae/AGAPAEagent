# AVEGEE — prompt gen ภาพ event โซน 1–4 (12 ภาพ เรียงตามความด่วน)

**สั่งงานโดย:** Claudy · **ทำโดย:** Mind · **วันที่:** 29 ก.ย. 2569
**ผู้ gen:** คุณเป้ (gen เอง) · **ผู้นำเข้าเกม:** Dale / Codex
**ห้ามแก้ไฟล์ใน repo AVEGEE** — เอกสารนี้เป็น prompt กับขั้นตอนวางไฟล์เท่านั้น

ลำดับ: **(1)** บอสชายแดนโซน 1 → **(2)** บอสโซน 4 ใหม่ → **(3)** ภาพจำเป็น 10 ชิ้น (บูรพา 2 → ปัจฉิม 3 → นรกเครือข่าย 5)

---

## Step 0 — Asset inventory (SOP-10)

เปิดดูภาพจริงครบตามรายการนี้ ไม่ได้เดาสไตล์:

| ไฟล์ | สิ่งที่เห็น / ใช้ทำอะไร |
|---|---|
| `img/raw/Boss-deva1.png` (~1254 px) | สไตล์ที่ต้องไปให้ถึง: pixel art ละเอียดสูง เส้นขอบเข้มบาง ๆ รอบตัว เงาแบบ dither นุ่ม ลายไทยแน่นบนชุด รูปร่างบอส "chibi-heroic" (หัวใหญ่ ไหล่กว้าง ขาสั้น ราว 3 หัว) |
| `img/zone-boss.png` (512) | บอสโซน 1 (ผิวม่วง เกราะแดงดำ มงกุฎทอง) — ตัวแทนสไตล์บอสในเกมที่ **ห้ามซ้ำหน้าตา** (ผิวม่วง) เก็บไว้เป็น style reference |
| `img/CyberHell/Boss Zone4-cyberhell.png` (512) | บอสโซน 4 เดิม: ยืนตรง แต่งชุดคลุมยาวสีน้ำตาลลายเรืองม่วงลาเวนเดอร์ ถือ **ลูกคิด (มือซ้ายของภาพ)** กับ **หนังสือเปิด (มือขวาของภาพ)** มีถุง/ม้วนห้อยเอว รองเท้าบู๊ต ผิวหน้าดำเทา ตาขาวเรืองแสง มงกุฎเหลี่ยมสูงลายอักขระ — **คงท่า/ชุด/ของถือ เปลี่ยนผิวหน้าและมงกุฎ** |
| `img/raw/Boss-frontier1.png` (1024) | ภาพเดิมที่ **ใช้ไม่ได้**: ผิวเขียว 4 กร จักร สังข์ คทา มงกุฎยอดเดียว → prompt ใหม่ตัดทุกองค์ประกอบนี้ และ **ห้ามแนบภาพนี้เป็น reference ตอน gen** (โมเดลจะลอกกลับมา) |
| `img/Asia/mob-gaki-asia.png`, `mob-kasha-asia.png`, `mob-nukekubi-asia.png` (512) | มอนสเตอร์: ท่าไดนามิก เส้นขอบเข้มหนา สีอิ่ม พื้นใส ตัวเต็มพื้นที่ผืน |
| `img/mob-werewolf.png` (512) | มอนสเตอร์ปัจฉิมเดิม สไตล์ pixel หยาบกว่าบอสเล็กน้อย |
| `scripts/prep-art.py` | **กติกา pipeline ที่กำหนด prompt** (ดูหัวข้อถัดไป) |
| `Output/Mind/2026-09-29-avegee-st-dab-prompt.md` | โครงสร้าง prompt ที่เคยได้ผล (บล็อกสไตล์ + subject + composition + negative + เช็กลิสต์) |

**สิ่งที่ยังขาด / ทำไม่ได้ (รายงาน Claudy):**
- session นี้ไม่มี Bash/ls จึง **วัดพิกเซลจริงไม่ได้** ตัวเลขขนาดข้างบนอ่านจากภาพที่เรนเดอร์ และจากค่า `SIZE = 512` ใน `prep-art.py`
- ไม่ได้ดู scene/มอนสเตอร์ของโซน CyberHell (ผีกระหัง ปอบ ตานี) และฉากโซนนั้น → **จานสีนรกเครือข่ายใน prompt อนุมานจาก Boss Zone4 เดิม** (ม่วงลาเวนเดอร์ + ไซยาน + เหลืองอำพัน บนพื้นมืด) ถ้าคุณเป้เห็นว่าไม่เข้ากับฉากให้เปลี่ยนแค่ประโยค COLOR
- ไม่ได้เรียก `artifact-design` เพราะงานนี้ส่งมอบเป็น prompt ข้อความ ไม่มี artifact HTML/print
- ผลจาก gen ต้องผ่าน **Chris (chris-culture)** ก่อนโหมด `ship` ตามที่ Reese กำหนด — Mind ไม่ใช่ครูโขน

---

## กติกา pipeline ที่ prompt ต้องเคารพ (อ่านจาก `prep-art.py`)

1. สคริปต์ **ตัดขอบใสด้วย bbox ของพิกเซลที่ alpha ≥ 16** แล้วย่อให้ "พอดีทั้งกว้างและสูง" ใน 512×512 ชิดขอบล่าง กึ่งกลาง → **ฝุ่น/แสงฟุ้งใด ๆ ที่ alpha ≥ 16 จะขยายกรอบและทำให้ตัวละครเล็กลง** จึงห้าม glow ทุกชนิด และทรงตัวละครต้องไม่กว้างแบน (ตัวกว้างจะถูกย่อตามความกว้าง)
2. ลด palette เหลือ **96 สี ไม่ dither** → prompt สั่ง cel-shade แถบสีชัด ห้าม gradient เนียน
3. ถ้าเครื่องมือ gen ไม่ให้ alpha: ใช้ **พื้นขาวล้วนเรียบสีเดียว (#FFFFFF)** ได้ (`strip_flat_bg` ลอกพื้นเทา/ขาวที่ติดขอบภาพ) แต่ **ห้ามพื้นลายเช็กเกอร์** และตัวละครต้องมีเส้นขอบเข้มรอบตัวทั้งหมด (กันผิวซีด/เทาถูกลอกตาม) — จึงเลือกสีผิว/วัสดุของทุกตัวให้ "มีสี" ไม่ใช่เทาเป็นกลาง
4. gen ที่ **1024×1024** ทุกภาพ (ต้นฉบับ raw) แล้ววางที่ `img/raw/...` รัน `python3 scripts/prep-art.py` — ถ้าฝุ่นโผล่ให้ลอง `--alpha-threshold=48`
5. ห้ามแนบ reference ที่จะพาสัญลักษณ์ต้องห้ามกลับมา (`Boss-frontier1.png`, `Boss-deva1.png` มีปีก) แนบได้: `zone-boss.png` เพื่อคุมสไตล์เท่านั้น

---

## บล็อกมาตรฐาน (ทุก prompt ด้านล่างใส่ครบในตัวแล้ว — ไม่ต้องประกอบเอง)

**S (สไตล์)** · **SUBJECT (เฉพาะภาพ)** · **C (แคนวาส/พื้นโปร่ง/ห้ามฟุ้ง)** — prompt ที่ให้คือ S + SUBJECT + C ต่อกันแล้ว ก๊อปทั้งก้อน
เครื่องมือที่มีช่อง negative แยกให้ใส่บล็อก "NEGATIVE" ในช่องนั้น ถ้าไม่มีช่องแยก ให้ต่อท้าย prompt ด้วย `Avoid:` + บล็อกเดียวกัน (มีคำเตือนเรื่องคำต้องห้ามในแต่ละภาพ)

---
---

# 1) `boss-frontier-th` — ยักษ์ผู้คุมชายแดน (โซน 1) — ด่วนที่สุด

**ไฟล์ปลายทาง:** `img/raw/boss-frontier-th.png` → prep ได้ `img/boss-frontier-th.png`
**เก่า:** `img/raw/Boss-frontier1.png` เก็บไว้ ห้ามลบ เปลี่ยนชื่อเป็น `_Boss-frontier1-old.png` (ขึ้นต้น `_` = สคริปต์ไม่เอาเข้าเกม) เพื่อไม่ให้ภาพเก่ากลับเข้าเกมโดยไม่ตั้งใจ · **Dale ต้องแก้ key ที่อ้าง `Boss-frontier1` เป็น `boss-frontier-th`** (Mind ไม่แตะโค้ด)

**คำอธิบาย (ไทย):** ยักษ์ชายแดนตัวใหญ่ท่าเฝ้าประตู 2 กร ผิวแดงเลือดหมูเข้ม (ไม่เขียว ไม่ม่วง) เขี้ยวงอน เขาโค้งสั้น สวมมงกุฎเปลวกนกทรงเตี้ยกว้าง (ไม่มียอดสูงเดี่ยว) เกราะแล็กเกอร์ดำขอบทอง มือหนึ่งแบกกระบองเหล็กหนาม อีกมือกำหมัด ไม่มีสัญลักษณ์เทพ/ศาสนาใด ๆ ทั้งตัว

## Prompt (EN) — Variant A (ค่าเริ่มต้น)

```
High-detail modern pixel art game sprite in the style of a polished fantasy-RPG boss illustration:
clean crisp 1-pixel dark outline around the entire silhouette, chunky readable shapes, cel-shaded
with soft ordered-dither shading, limited palette of about 40 flat colors with no smooth gradients,
warm rim light from the upper left, dense fine ornament on armor and clothing, 3/4 front view,
full body visible from head to feet.

SUBJECT: a fictional frontier-gate giant guardian of a Thai underworld border checkpoint, an
original invented character (a giant "yaksha" gatekeeper, not any named epic character). Chibi-
heroic proportions, about 3 heads tall, very large head, broad heavy shoulders, thick short legs,
imposing and stern, planted wide stance like a gate guard. EXACTLY TWO ARMS and two hands.
Skin: deep oxblood crimson-maroon (clearly red-brown, not green, not purple, not blue, not a human
skin tone), lightly weathered. Face: broad snarling face, heavy brow, glowing amber eyes, two
upward-curving ivory tusks from the lower jaw, pointed ears with plain gold ear ornaments, two
short black horns curving backward from the temples.
Crown: a LOW, WIDE gold crown made of seven curved flame-tongue points fanning outward (Thai
flame-scroll motif), dark red gems, NO tall central spire, NO stacked tiers, NO tapering conical
spire crown.
Weapon: one thick black iron spiked club (a heavy war club studded with cone-shaped spikes, plain
leather-wrapped grip, dull metal, no gold ornament, no rounded golden head) resting on the
right shoulder gripped by one hand; the other hand is a clenched fist at the hip.
Armor: black lacquer scale-plate breastplate trimmed with antique gold, broad layered shoulder
guards with gold flame-scroll trim, red-lacquer wide belt, forearm bracers, a plum-purple layered
waist cloth with gold border and hanging hip flaps, dark boots with gold trim. Ornament limited to
Thai flame-scroll (kranok) and simple diamond lattice patterns only.
COLOR THEME: oxblood crimson skin, black lacquer, antique gold, plum accents, small ember-orange
eyes and gem highlights.

CANVAS: square 1024x1024, a single character centered, feet planted with the soles touching the
bottom edge of the canvas (no empty space below the feet), top of the crown within 3% of the top
edge, at least 6% side margin. BACKGROUND: fully transparent (alpha 0) everywhere outside the
character silhouette. If transparency is not supported, use one perfectly flat solid pure white
#FFFFFF background with no gradient, no vignette, no checkerboard. NO ground plane, no floor, no
cast shadow, no contact shadow or ellipse under the feet. NO glow, aura, halo, bloom, mist, smoke,
haze, sparkles, dust, embers, floating particles or semi-transparent pixels around or away from
the character; any light effect must be drawn as solid opaque pixels attached to the character with
hard pixel edges. No text, letters, numbers, logos, watermark, signature, UI, frame or border.
```

## Variant B (ถ้า A ออกมาเสี่ยง/ไม่เข้ามือ) — สลับ 2 ท่อน

- **ผิว:** แทน `Skin: ...` ด้วย `Skin: weathered dark slate-blue stone-grey with a clearly blue-grey tint, cracked like basalt, ember-orange thin crack lines (drawn as crisp opaque pixel lines, no glow), muted and desaturated, definitely not bright blue.`
- **อาวุธ:** แทน `Weapon: ...` ด้วย `Weapon: a long Thai-style halberd blade-on-pole ("ngao" curved single-edged glaive) in dull black iron with a plain dark wooden shaft, held in both hands across the body; no ornament on the shaft, no gold finial.` (Variant B นี้ใช้ 2 มือจับอาวุธ ตัดประโยค clenched fist ออก)

## NEGATIVE

```
green skin, jade skin, blue bright skin, purple skin, four arms, extra arms, more than two arms,
multiple heads, ten faces, stacked face crown, tall single-spire conical crown, chakra, discus,
spinning wheel, spoked wheel disc, conch shell, spiral shell, mace with golden round head, gada,
trident, lotus flower, lotus pattern, garuda, naga, Buddha, halo, religious symbol, amulet, prayer
beads, khon mask, mask, dropped or broken mask, deity, angel, wings, cross, text, letters, numbers,
watermark, signature, UI, frame, background scenery, ground, floor, cast shadow, drop shadow, glow,
aura, halo, bloom, haze, mist, particles, sparkles, dust, blur, soft anti-aliased edges, smooth
gradient shading, photorealistic, 3D render, multiple characters, extra fingers, cropped feet,
checkerboard background, gore, blood
```

> คำเตือน: ถ้าเครื่องมือไม่มีช่อง negative แยก การพิมพ์ "chakra/conch/trident" ท้าย prompt อาจ **กระตุ้น** ให้โมเดลวาดสิ่งเหล่านั้น — ให้ใช้เฉพาะประโยคบวกใน prompt (ระบุ "two arms", "plain club") แล้วค่อยเช็กด้วยตา ถ้าหลุดค่อยเติม `Avoid:` เฉพาะข้อที่หลุด

**เช็กหลัง gen (Reese ข้อ ก–จ ทั้งหมด):**
- [ ] 2 กร เท่านั้น · ไม่มีวงล้อ/จักร/สังข์/ตรี/ดอกบัว/คทาหัวทอง · อาวุธเป็นกระบองเหล็กหนามดำล้วน
- [ ] ผิวไม่เขียว ไม่ม่วง (ไม่ซ้ำ zone-boss) ไม่ใกล้สีผิวมนุษย์
- [ ] มงกุฎเตี้ยกว้างแบบเปลวไฟ ไม่มียอดสูงเดี่ยวแบบชฎา/มงกุฎเทพ
- [ ] ไม่เห็นเป็นหัวโขนที่ถูกสวม ไม่มีหัวโขนตก/แตก · ไม่มีปีก ไม่มีรัศมี
- [ ] ฐานเท้าแตะขอบล่าง · พื้นโปร่งจริง · ไม่มีฝุ่น

---

# 2) บอสโซน 4 ใหม่ — จอมข้อมูลไซเบอร์ (ผู้ตรวจการนรกเครือข่าย)

**ไฟล์ปลายทาง:** `img/raw/CyberHell/Boss Zone4-cyberhell.png` (ชื่อเดิมเป๊ะ มีช่องว่าง) → prep ได้ `img/CyberHell/Boss Zone4-cyberhell.png`
**ก่อนวาง:** ถ้ามี `img/raw/CyberHell/Boss Zone4-cyberhell.png` เดิมอยู่ ให้สำรองเป็น `img/raw/CyberHell/_Boss Zone4-cyberhell-old.png` (ขึ้นต้น `_`) · ไฟล์ใหม่ใหม่กว่าผลลัพธ์ สคริปต์จะทำทับเอง (หรือสั่ง `python3 scripts/prep-art.py "Boss Zone4" --all`)

**คำอธิบาย (ไทย):** คงบทบาท ท่า และชุดเดิม (ผู้ตรวจการยืนตรง ชุดคลุมยาวน้ำตาลลายไฟม่วง ถือลูกคิดกับหนังสือ) แต่เปลี่ยนตัวเป็น **หุ่นโลหะ** หน้ากากเหล็กเรียบ ไม่ใช่ผิวคน และเปลี่ยนมงกุฎเป็นวงแหวนชิปวงจร ไม่ใช่มงกุฎทรงอียิปต์

## Prompt (EN) — Variant A (หน้ากากเหล็ก gunmetal)

```
High-detail modern pixel art game sprite in the style of a polished fantasy-RPG boss illustration:
clean crisp 1-pixel dark outline around the entire silhouette, chunky readable shapes, cel-shaded
with soft ordered-dither shading, limited palette of about 40 flat colors with no smooth gradients,
warm rim light from the upper left, dense fine detail on clothing, 3/4 front view, full body
visible from head to feet.

SUBJECT: a stern cyber-underworld data-auditor boss, an artificial machine being (a metal
automaton, definitely NOT a human and NOT a dark-skinned person). Chibi-heroic proportions, about
2.7 heads tall, large head, standing upright and calm like a strict official, both forearms raised
slightly outward at chest height with the palms open.
HEAD: a smooth solid brushed gunmetal blue-steel faceplate (opaque, clearly metal, cold blue-grey
with lighter steel highlights), a fixed stern angled brow ridge, two narrow rectangular glowing
white-cyan eye slits, a small vertical speaker-grille where a mouth would be, no nose, no lips, no
hair, small side vents where ears would be. Hands are segmented metal gloves with jointed
fingers (same gunmetal steel).
CROWN: a low circlet-tiara built from small hexagonal microchip tiles and thin circuit traces in
bronze-copper, five short unequal antenna prongs on top each tipped with a small violet LED, plus
a slim floating metal ring hovering just behind the circlet. It must read as a circuit-board
crown, NOT a rectangular stepped headdress.
OUTFIT (keep the original's layout): a long floor-length-to-shin heavy robe in warm dark leather-
brown with wide sleeves and a raised collar, lavender-violet glowing circuit-trace patterns
running along the hems and sleeves (traces and hex-cell lines only, no letters, no symbols, no
script), a wide belt with small pouches and scroll cases hanging at the hips, sturdy dark brown
boots.
HELD ITEMS: in the hand on the LEFT side of the image, a wooden-and-bronze abacus with beads; in
the hand on the RIGHT side of the image, a thick open book whose pages show only glowing
lavender circuit lines (no readable writing).
COLOR THEME: gunmetal blue-steel, warm brown, bronze-copper, lavender-violet light, small cyan
accents.

CANVAS: square 1024x1024, a single character centered, feet planted with the soles touching the
bottom edge of the canvas (no empty space below the feet), top of the crown within 3% of the top
edge, at least 6% side margin. BACKGROUND: fully transparent (alpha 0) everywhere outside the
character silhouette. If transparency is not supported, use one perfectly flat solid pure white
#FFFFFF background with no gradient, no vignette, no checkerboard. NO ground plane, no floor, no
cast shadow, no contact shadow or ellipse under the feet. NO glow, aura, halo, bloom, mist, smoke,
haze, sparkles, dust, floating particles or semi-transparent pixels around or away from the
character; every light effect (eyes, LEDs, circuit lines) must be drawn as solid opaque pixels
attached to the character with hard pixel edges. No text, letters, numbers, logos, watermark,
signature, UI, frame or border.
```

## Variant B (ถ้าอยากให้ "ไซเบอร์" ชัดขึ้น) — สลับท่อน HEAD

`HEAD: a smooth solid faceplate of dark teal silicon-wafer ceramic with flat iridescent violet-teal sheen bands (opaque, cel-shaded, not see-through), two narrow glowing white-cyan eye slits, small speaker grille, no nose, no lips, no hair; segmented dark teal-steel gloves.` (ห้ามโปร่งแสง/โฮโลแกรมจริง — alpha ครึ่งใสจะกลายเป็นฝุ่นใน pipeline ให้ทำเป็นผิวทึบแทน)

## NEGATIVE

```
human face, human skin, black skin, dark skin, brown skin, realistic human features, exaggerated
lips, exaggerated nose, egyptian style, egyptian crown, pharaoh, nemes headdress, double crown,
stepped rectangular headdress, ankh, eye of horus, scarab, hieroglyphs, glyphs, runes, letters,
readable text, numbers, watermark, signature, UI, frame, cross, religious symbol, halo, wings,
translucent body, hologram see-through, glow, aura, bloom, haze, mist, particles, sparkles, dust,
blur, cast shadow, ground, floor, background scenery, photorealistic, 3D render, extra arms, extra
fingers, cropped feet, checkerboard background, gore
```

**เช็กหลัง gen:**
- [ ] หน้าเป็นแผ่นโลหะ/เซรามิกชัดเจน ไม่มีจมูก/ริมฝีปากแบบคน · ไม่ใช่โทนผิวคนทุกเฉด
- [ ] มงกุฎเป็นวงชิป/เสาอากาศ ไม่ใช่ทรงเหลี่ยมสูงอียิปต์ · ไม่มีลายคล้ายอักษรโบราณ
- [ ] ท่า/ชุด/ของถือตรงเดิม (ลูกคิดซ้ายภาพ หนังสือขวาภาพ)
- [ ] ผิวเป็นวัสดุทึบ ไม่โปร่งใสครึ่ง ๆ · พื้นโปร่ง ไม่มีฝุ่น

> ถ้าแนบ `Boss Zone4-cyberhell.png` เดิมเป็น reference ให้เขียนกำกับว่า `use it only for pose, robe cut and held props; replace the face, skin and crown completely as described` — โมเดลมักลอกหน้าดำและมงกุฎกลับมา ถ้าลอกให้ gen ใหม่แบบไม่แนบ

---
---

# 3) ภาพจำเป็น 10 ชิ้น โซน 2–4

ทุกภาพใช้บล็อก S และ C ชุดเดียวกับข้างบน (ใส่ครบใน prompt แล้ว) ที่ต่างกันคือ SUBJECT และ NEGATIVE

## 3.1 บูรพา (Asia) — วางที่ `img/raw/Asia/`

### 3.1.1 ชูเตนโดจิ — บอสชายแดนโซน 2
**ไฟล์:** `img/raw/Asia/boss-frontier-asia.png` → `img/Asia/boss-frontier-asia.png`
**ไทย:** ราชาโอนิร่างใหญ่ผิวแดงส้มชาด ผมยาวหยักศกสีขาวเงิน เขาสองเขา เขี้ยว นุ่งหนังลายเสือ ถือ **กระบองเหล็กหนามคะนาโบะ** ไม่ถือไหสุรา ไม่มีสัญลักษณ์ศาสนา/ศาล/ประตูโทริอิ

```
High-detail modern pixel art game sprite in the style of a polished fantasy-RPG boss illustration:
clean crisp 1-pixel dark outline around the entire silhouette, chunky readable shapes, cel-shaded
with soft ordered-dither shading, limited palette of about 40 flat colors with no smooth gradients,
warm rim light from the upper left, dense fine detail, 3/4 front view, full body visible from head
to feet.

SUBJECT: a towering ogre-king of Japanese folklore ("oni" chieftain), an original character design
in classic folk-tale style. Chibi-heroic proportions, about 3 heads tall, huge head, massively
muscular broad torso and thick arms, short strong legs, wide confident stance, grinning
overconfident menacing expression. Skin: vivid vermilion orange-red. Face: heavy brows, glowing
gold-yellow eyes, wide mouth with two large upward tusks, pointed ears. Two thick curved ivory
horns. Hair: wild long shaggy silver-white mane flowing down the back. Clothing: a tiger-striped
fur loincloth tied with a rope belt, dark indigo sleeveless open vest with worn hem, bare
muscular chest and arms, iron cuffs on both wrists with broken short chain links, plain straw sandals
or bare feet. Weapon: a huge black iron spiked club (kanabo: a thick octagonal iron bar studded
with rows of round iron studs), held upright in one hand resting on the shoulder, the other fist
clenched. Nothing in his hands except the club.
COLOR THEME: vermilion red skin, silver-white hair, black iron, tiger yellow-and-black stripes,
indigo cloth, small gold accents.

CANVAS: square 1024x1024, a single character centered, feet planted with the soles touching the
bottom edge of the canvas (no empty space below the feet), horn tips and top of hair within 3% of
the top edge, at least 6% side margin. BACKGROUND: fully transparent (alpha 0) everywhere outside
the character silhouette. If transparency is not supported, use one perfectly flat solid pure white
#FFFFFF background with no gradient, no vignette, no checkerboard. NO ground plane, no floor, no
cast shadow, no contact shadow or ellipse under the feet. NO glow, aura, halo, bloom, mist, smoke,
haze, sparkles, dust, embers, floating particles or semi-transparent pixels around or away from
the character; any light effect must be drawn as solid opaque pixels attached to the character
with hard pixel edges. No text, letters, numbers, logos, watermark, signature, UI, frame or border.
```
**NEGATIVE:** `sake jug, gourd, bottle, cup, drunk, swastika, manji symbol, tomoe, torii gate, shrine, temple, prayer beads, Buddhist symbol, religious symbol, severed head, decapitated head, captive woman, gore, blood, existing anime/game character design, text, letters, numbers, watermark, signature, UI, frame, background scenery, ground, floor, cast shadow, glow, aura, halo, bloom, haze, mist, particles, sparkles, dust, blur, smooth gradient shading, photorealistic, 3D render, extra arms, extra fingers, cropped feet, checkerboard background`
**เช็ก:** ถือกระบองอย่างเดียว · ไม่ใช้ท่า/หน้าตามเกม gacha ที่มีชูเตนโดจิ (Reese เตือน: ต้องออกแบบใหม่) · ไม่มีอักขระคล้าย 卍 บนผ้า

### 3.1.2 เท็งงุ — ผู้ทดสอบโซน 2
**ไฟล์:** `img/raw/Asia/boss-tester-asia.png` → `img/Asia/boss-tester-asia.png`
**ไทย:** อาจารย์ดาบปีศาจภูเขาหัวนกกา ปีกดำ ถือพัดขนนก ดาบสั้นเหน็บเอว ท่าสง่านิ่ง ผู้ทดสอบที่ให้เกียรติ **ไม่ใช่โซโจโบ ไม่ใช่เทพ** ไม่สวมชุดยามาบูชิ/ลูกประคำ/เชือกชิเมนาวะ · ดีไซน์ผสมขึ้นเอง (ตาม Reese ข้อ 6)

```
High-detail modern pixel art game sprite in the style of a polished fantasy-RPG boss illustration:
clean crisp 1-pixel dark outline around the entire silhouette, chunky readable shapes, cel-shaded
with soft ordered-dither shading, limited palette of about 40 flat colors with no smooth gradients,
warm rim light from the upper left, dense fine detail on clothing and feathers, 3/4 front view,
full body visible from head to feet.

SUBJECT: an original mountain swordmaster spirit of Japanese folklore design, a crow-beaked
"tengu"-style master (invented design, unnamed). Chibi-heroic proportions, about 3 heads tall,
large head, upright dignified calm posture, feet planted, wings folded partly open behind. Head:
black crow-like beak (short, straight, not a long human nose), wise narrow amber eyes, thick grey
eyebrow feathers, small head-feather crest, no hat, no headband. Two large black feathered wings
with blue-violet sheen on the feather edges, half-spread behind the shoulders. Clothing: dark
indigo wide-sleeved jacket over grey-white hakama trousers, plain cloth sash, no beads, no
sacred rope, no small black hat box, no religious articles. Left hand (LEFT side of the image):
holds a large eight-pointed fan of dark feathers (leaf-shaped feather fan) held slightly forward
as a guard. Right hand (RIGHT side of the image): rests on the hilt of a sheathed long katana at
the hip with a plain black scabbard; the blade is NOT drawn. Bearing: respectful, composed.
COLOR THEME: crow black, deep indigo, grey-white, small gold and blue-violet accents.

CANVAS: square 1024x1024, a single character centered, feet (wooden geta sandals) planted with the
soles touching the bottom edge of the canvas (no empty space below the feet), top of head and
wing tips within 3% of the top edge, at least 6% side margin (wings may be partly folded to keep
the silhouette compact). BACKGROUND: fully transparent (alpha 0) everywhere outside the character
silhouette. If transparency is not supported, use one perfectly flat solid pure white #FFFFFF
background with no gradient, no vignette, no checkerboard. NO ground plane, no floor, no cast
shadow, no contact shadow or ellipse under the feet. NO glow, aura, halo, bloom, mist, smoke,
haze, sparkles, dust, floating feathers, particles or semi-transparent pixels around or away from
the character; any light effect must be solid opaque pixels attached to the character with hard
pixel edges. No text, letters, numbers, logos, watermark, signature, UI, frame or border.
```
**NEGATIVE:** `red long-nosed face, long human nose, yamabushi costume, mountain ascetic hat, prayer beads, sacred rope, shimenawa, shrine, torii gate, Buddhist symbol, religious symbol, deity, halo, drawn sword aimed at viewer, gore, blood, comedic pose, mocking pose, existing character design, text, letters, numbers, watermark, signature, UI, frame, background scenery, ground, floor, cast shadow, glow, aura, bloom, haze, mist, floating feathers, particles, sparkles, dust, blur, smooth gradient shading, photorealistic, 3D render, extra arms, extra fingers, cropped feet, checkerboard background`
**เช็ก:** ท่าให้เกียรติ ไม่ตลก · ปีกไม่กว้างเกินไป (ถ้ากว้างจะถูกย่อตามความกว้างตอน prep — ขอพับปีกครึ่งเดียว)

## 3.2 ปัจฉิม (West) — วางที่ `img/raw/West/`

### 3.2.1 เคานต์แวมไพร์ — บอสชายแดนโซน 3
**ไฟล์:** `img/raw/West/boss-frontier-west.png` → `img/West/boss-frontier-west.png`
**ไทย:** ชายชราสูงผอมหนวดขาวยาวตามนิยาย 1897 ใส่ชุดสีดำล้วนสมัยวิกตอเรียน **ไม่ใช่ลุค Bela Lugosi** (ไม่มีผมดำเสยหน้าผากรูป V ไม่มีผ้าคลุมคอตั้งสูง) ไม่มีไม้กางเขน/เหรียญ/ตราใด ๆ · *ตั้งใจไม่ใส่คำว่า "Dracula" ใน prompt เพราะโมเดลจะดึงหน้าจากหนัง*

```
High-detail modern pixel art game sprite in the style of a polished fantasy-RPG boss illustration:
clean crisp 1-pixel dark outline around the entire silhouette, chunky readable shapes, cel-shaded
with soft ordered-dither shading, limited palette of about 40 flat colors with no smooth gradients,
warm rim light from the upper left, dense fine detail on clothing, 3/4 front view, full body
visible from head to feet.

SUBJECT: an ancient aristocratic vampire count of a remote frontier castle, a tall gaunt OLD MAN
in the manner of a late-19th-century gothic novel. Chibi-heroic proportions, about 3 heads tall,
large head, slightly stooped but commanding posture, cold patient smile. Face: deathly pale
grey-white skin, a strong hooked (aquiline) nose, bushy heavy white eyebrows, a LONG DROOPING WHITE
MOUSTACHE hanging past the chin, thin swept-back WHITE hair receding at the temples (no black hair,
no widow's peak), pointed ears, small red pinpoint eyes, two sharp white fangs visible over the
lower lip, long pale claw-like nails. Clothing: a plain buttoned black long frock coat with long
tails, dark charcoal waistcoat, black trousers, black boots, a small dark cravat, collar low and
soft (NO tall stiff standing cape collar, NO satin-lined opera cape, NO medallion, NO brooch, NO
emblem). Right hand (RIGHT side of the image): rests on a black walking cane with a plain round
silver knob. Left hand (LEFT side of the image): raised open at chest height, palm up, long
nails curled, as if inviting. Two small black bats perched tight against the coat hem are allowed,
otherwise nothing else.
COLOR THEME: black and charcoal cloth, cold grey-white skin, white hair and moustache, dark blood-
red eye and lining accents, pale silver knob.

CANVAS: square 1024x1024, a single character centered, feet planted with the soles touching the
bottom edge of the canvas (no empty space below the feet), top of the head within 3% of the top
edge, at least 6% side margin. BACKGROUND: fully transparent (alpha 0) everywhere outside the
character silhouette. If transparency is not supported, use one perfectly flat solid pure white
#FFFFFF background with no gradient, no vignette, no checkerboard. NO ground plane, no floor, no
cast shadow, no contact shadow or ellipse under the feet. NO glow, aura, halo, bloom, mist, smoke,
haze, fog, sparkles, dust, flying bats, particles or semi-transparent pixels around or away from
the character; any light effect must be solid opaque pixels attached to the character with hard
pixel edges. No text, letters, numbers, logos, watermark, signature, UI, frame or border.
```
**NEGATIVE:** `Bela Lugosi, black slicked-back hair, widow's peak, young handsome vampire, tall stiff standing collar cape, red satin-lined cape, medallion, cross, crucifix, holy symbol, religious symbol, Order of the Dragon emblem, dragon emblem, coat of arms, existing movie vampire design, existing game vampire design, gore, blood dripping, blood on mouth, text, letters, numbers, watermark, signature, UI, frame, background scenery, castle, ground, floor, cast shadow, glow, aura, bloom, haze, fog, mist, flying bats, particles, sparkles, dust, blur, smooth gradient shading, photorealistic, 3D render, extra arms, extra fingers, cropped feet, checkerboard background`
**เช็ก:** ผมขาวและหนวดขาว ไม่ใช่ผมดำเสยหลัง · ไม่มีคอปกสูง/ผ้าคลุมออเปร่า · ไม่มีวัตถุรูปกางเขนแม้ด้ามไม้เท้า (ด้ามเป็นลูกกลม) · ไม่มีเลือดที่ปาก

### 3.2.2 วาลคิรี — ผู้ทดสอบโซน 3
**ไฟล์:** `img/raw/West/boss-tester-west.png` → `img/West/boss-tester-west.png`
**ไทย:** หญิงนักรบผู้ทดสอบ ให้เกียรติ เกราะเหล็กเรียบ หอกยาว โล่กลม **ไม่มีอักษรรูนและสัญลักษณ์นอร์สทุกชนิด** (ไม่ปมวนเชือก ไม่ค้อน ไม่หมาป่า/กา ไม่ลายวงล้อสุริยะ ไม่ลายสายฟ้าคู่ ไม่ธงใด ๆ) หมวกเป็นแบบธรรมดา **ไม่มีปีก ไม่มีเขา** · ผมสีเงินขาวกับดวงตาอำพัน (เลี่ยงภาพจำผมบลอนด์+ตาฟ้า)

```
High-detail modern pixel art game sprite in the style of a polished fantasy-RPG boss illustration:
clean crisp 1-pixel dark outline around the entire silhouette, chunky readable shapes, cel-shaded
with soft ordered-dither shading, limited palette of about 40 flat colors with no smooth gradients,
warm rim light from the upper left, dense fine detail on armor, 3/4 front view, full body visible
from head to feet.

SUBJECT: a noble female warrior-judge of a northern legend, an original character, calm, fair and
respectful (a tester, not a villain). Chibi-heroic proportions, about 3 heads tall, large head,
upright athletic posture, feet planted in a ready but courteous stance. Face: youthful stern
fair-skinned face, amber eyes, long silver-white hair in one thick braid over the shoulder. Head:
a plain open steel helmet with a simple nose guard and a short plain crest ridge, completely
unornamented (NO wings, NO horns, NO markings). Armor: polished steel breastplate and
shoulder plates with plain smooth surfaces (no engraving, no pattern), chainmail sleeves, a
flowing cape in pale aurora teal-green lined with white, leather belt, greaves and boots.
Weapon: a tall straight spear with a plain leaf-shaped steel head and plain wooden shaft held
upright in the hand on the RIGHT side of the image, tip pointing up; a plain round wooden shield
with a plain steel rim and a plain domed steel center boss, held in the hand on the LEFT side of
the image at the hip, shield face completely blank (single flat color with wood plank lines only,
no painted design, no pattern, no marking).
COLOR THEME: polished steel silver, white, aurora teal-green, warm leather brown, small pale-gold
trim on buckles only.

CANVAS: square 1024x1024, a single character centered, feet planted with the soles touching the
bottom edge of the canvas (no empty space below the feet), the spear tip and top of helmet within
3% of the top edge, at least 6% side margin. BACKGROUND: fully transparent (alpha 0) everywhere
outside the character silhouette. If transparency is not supported, use one perfectly flat solid
pure white #FFFFFF background with no gradient, no vignette, no checkerboard. NO ground plane, no
floor, no cast shadow, no contact shadow or ellipse under the feet. NO glow, aura, halo, bloom,
mist, smoke, haze, sparkles, dust, floating particles or semi-transparent pixels around or away
from the character; any light effect must be solid opaque pixels attached to the character with
hard pixel edges. No text, letters, numbers, logos, watermark, signature, UI, frame or border.
```
**NEGATIVE:** `runes, rune letters, norse symbols, knotwork, interlace pattern, triquetra, valknut, hammer emblem, wolf emblem, raven emblem, sun wheel, sun cross, circle with cross, twin lightning bolts, hooked wolf symbol, flag, banner emblem, crest emblem, cross, religious symbol, winged helmet, horned helmet, wings, blonde braids, blue eyes, sexualized armor, bikini armor, gore, blood, text, letters, numbers, watermark, signature, UI, frame, background scenery, ground, floor, cast shadow, glow, aura, halo, bloom, haze, mist, particles, sparkles, dust, blur, smooth gradient shading, photorealistic, 3D render, extra arms, extra fingers, cropped feet, checkerboard background`
**เช็ก (สำคัญที่สุดของชิ้นนี้):** ซูมดูทุกพื้นผิวเกราะ/โล่/เข็มขัด/ผ้าคลุม — **ต้องไม่มีลายขีด ปม วงกลมมีขีด หรืออักขระใด ๆ แม้แต่เศษ** ถ้ามี gen ใหม่ ห้ามแก้ด้วยมือแบบครึ่งๆ · เกราะเรียบสุภาพ ไม่โป๊
**Variant (ถ้าคุณเป้ชอบหมวกมีปีก):** แทนประโยค helmet ด้วย `a plain steel helmet with two small smooth feathered wing shapes at the sides` และตัด "winged helmet" ออกจาก NEGATIVE — (Reese: หมวกปีกมาจากชุดโอเปร่า 1876 ไม่ใช่ตำนาน เป็นสไตล์ยอดนิยม) — ค่าเริ่มต้นคือแบบเรียบ

### 3.2.3 ทหารโครงกระดูก — มอนสเตอร์โซน 3 (W2 x3)
**ไฟล์:** `img/raw/West/mob-skeleton-west.png` → `img/West/mob-skeleton-west.png`
**ไทย:** ทหารโครงกระดูกยุคกลางยุโรป หมวกเหล็กเก่า โล่กลมเรียบ ดาบสั้นสนิม เสื้อคลุมขาดรุ่ยไม่มีตราไม่มีกางเขน ท่าเดินบุกไดนามิกเหมือนมอนสเตอร์เดิม

```
High-detail modern pixel art game monster sprite: clean crisp 1-pixel dark outline around the
entire silhouette, chunky readable shapes, cel-shaded with soft ordered-dither shading, limited
palette of about 40 flat colors with no smooth gradients, warm rim light from the upper left,
dynamic pose, 3/4 front view, full body visible from head to feet.

SUBJECT: a medieval European undead skeleton foot-soldier marching forward, bone-white and yellowed
ivory bones with darker brown shading between the ribs, hollow eye sockets each holding a small
solid cold blue pixel light, cracked jaw slightly open. Worn rusty iron kettle helmet (plain, dented,
no crest), rusty round wooden shield with a plain iron rim (blank face, no painted design) held in
the hand on the LEFT side of the image, a chipped rusty short sword in the hand on the RIGHT side of
the image raised to strike, a tattered dark grey-brown cloth tunic in rags hanging from the waist
(plain, no emblem, no cross, no heraldry), a few leather straps, one bare foot bone stepping forward.
Slightly hunched aggressive stance, compact silhouette about as tall as wide. Proportions:
stylised, large skull, about 3 heads tall.
COLOR THEME: ivory bone, rust orange-brown, iron grey, tattered grey-brown cloth, cold blue eye
lights.

CANVAS: square 1024x1024, a single creature centered, foot bones touching the bottom edge of the
canvas (no empty space below), top of the helmet within 3% of the top edge, at least 6% side margin.
BACKGROUND: fully transparent (alpha 0) everywhere outside the silhouette. If transparency is not
supported, use one perfectly flat solid pure white #FFFFFF background with no gradient, no vignette,
no checkerboard; the bones must have a clear dark outline so they separate from the white. NO
ground plane, no floor, no cast shadow, no contact shadow. NO glow, aura, halo, bloom, mist, smoke,
haze, sparkles, dust, floating bone bits, particles or semi-transparent pixels around or away from
the creature. No text, letters, numbers, logos, watermark, signature, UI, frame or border.
```
**NEGATIVE:** `cross, crusader tabard, heraldry, coat of arms, emblem, religious symbol, cape with emblem, crown, gore, flesh, blood, multiple skeletons, text, letters, numbers, watermark, signature, UI, frame, background scenery, graveyard, ground, floor, cast shadow, glow, aura, bloom, haze, mist, particles, sparkles, dust, blur, smooth gradient shading, photorealistic, 3D render, extra arms, extra fingers, cropped feet, checkerboard background`

## 3.3 นรกเครือข่าย (CyberHell) — วางที่ `img/raw/CyberHell/`

จานสี: พื้นเข้มม่วงกรมท่า + ลาเวนเดอร์-ม่วงไฟ + ไซยาน + เหลืองอำพันเตือน (อนุมานจากบอส Zone4 เดิม — ดูหมายเหตุใน Step 0) · ทุกภาพเลียนแสงเป็น "พิกเซลทึบติดตัว" ไม่ใช้ glow

### 3.3.1 บั๊กกลิตช์ — มอนสเตอร์ W1 (x3)
**ไฟล์:** `img/raw/CyberHell/mob-bug-cyberhell.png` → `img/CyberHell/mob-bug-cyberhell.png`
**ไทย:** แมลงบั๊กตัวอ้วนคล้ายด้วงเปลือกเป็นจอมอนิเตอร์ที่แตกเป็นบล็อกพิกเซลเพี้ยน ขาเป็นสายวงจร ตาแดงอำพันสองดวง

```
High-detail modern pixel art game monster sprite: clean crisp 1-pixel dark outline around the
entire silhouette, chunky readable shapes, cel-shaded with soft ordered-dither shading, limited
palette of about 40 flat colors with no smooth gradients, dynamic pose, 3/4 front view, full body
visible.

SUBJECT: a "software bug" creature: a chunky beetle-like insect whose rounded shell is a cracked
old CRT computer monitor screen (dark navy screen with bright cyan and hot magenta corrupted
pixel-block stripes shifted sideways INSIDE the shell area only, like a glitching image), six
thin jointed legs made of copper circuit-board traces with tiny solder-dot joints, two short
antennae made of thin cable ending in small amber LED bulbs, a small metal head with two round
amber-red glowing eyes drawn as solid opaque discs and small pincer mandibles. Crouched, ready to
lunge, compact silhouette about as tall as wide. A few solid square pixel fragments may be chipped
off but must remain touching the body.
COLOR THEME: dark navy-violet shell, cyan, hot magenta, copper, amber accents.

CANVAS: square 1024x1024, a single creature centered, lowest leg tips touching the bottom edge of
the canvas (no empty space below), body filling most of the frame, at least 6% side margin.
BACKGROUND: fully transparent (alpha 0) everywhere outside the silhouette. If transparency is not
supported, use one perfectly flat solid pure white #FFFFFF background with no gradient, no
vignette, no checkerboard. NO ground plane, no floor, no cast shadow, no contact shadow. NO glow,
aura, halo, bloom, mist, smoke, haze, sparkles, dust, RGB-split ghost copies outside the body,
scanline noise outside the body, floating pixels, particles or semi-transparent pixels around or
away from the creature. No text, letters, numbers, logos, watermark, signature, UI, frame or border.
```
**NEGATIVE:** `ladybug, real insect photo, realistic bug, cockroach, logo, brand logo, screen text, readable code, letters, numbers, watermark, signature, UI, frame, background scenery, ground, floor, cast shadow, glow, aura, bloom, haze, mist, particles, sparkles, dust, chromatic aberration ghosting outside body, blur, smooth gradient shading, photorealistic, 3D render, multiple creatures, cropped feet, checkerboard background, gore`
**เช็ก:** เอฟเฟกต์กลิตช์อยู่ในตัวเท่านั้น ไม่มีเงา RGB แยกลอยนอกตัว (ตัวการทำให้ alpha เป็นฝุ่น)

### 3.3.2 หนอน (worm) — มอนสเตอร์ W2 (x2)
**ไฟล์:** `img/raw/CyberHell/mob-worm-cyberhell.png` → `img/CyberHell/mob-worm-cyberhell.png`
**ไทย:** หนอนคอมพิวเตอร์ตัวเป็นข้อบล็อกวงจรเรียงต่อกัน ขดตัวตั้งขึ้นเป็นตัว S ให้ทรงเกือบจัตุรัส (ถ้ายาวแนวนอนจะถูกย่อจนเล็ก)

```
High-detail modern pixel art game monster sprite: clean crisp 1-pixel dark outline around the
entire silhouette, chunky readable shapes, cel-shaded with soft ordered-dither shading, limited
palette of about 40 flat colors with no smooth gradients, dynamic pose, 3/4 front view, full body
visible.

SUBJECT: a "computer worm" creature: a fat segmented worm whose body is a chain of about twelve
chunky rounded metal-and-plastic ring segments (dark violet casing with thin cyan LED strips and
tiny circuit patterns on each segment), coiled upright into a tall S-shaped spiral so the whole
silhouette is roughly as tall as it is wide, the front third of the body raised like a striking
cobra-pose worm (NOT a snake with a hood), head: a round blunt metal head with a wide circular
mouth full of small ring-arranged metal teeth and two small amber eyes drawn as solid opaque
dots. The tail end curls at the bottom, lowest segment touching the bottom edge.
COLOR THEME: dark violet casing, cyan LED strips, pale lavender segment highlights, amber eyes,
a little hot magenta on the mouth interior.

CANVAS: square 1024x1024, a single creature centered, lowest part of the body touching the bottom
edge of the canvas (no empty space below), top of the head within 3% of the top edge, at least 6%
side margin. BACKGROUND: fully transparent (alpha 0) everywhere outside the silhouette. If
transparency is not supported, use one perfectly flat solid pure white #FFFFFF background with no
gradient, no vignette, no checkerboard. NO ground plane, no floor, no cast shadow, no contact
shadow. NO glow, aura, halo, bloom, mist, smoke, haze, sparkles, dust, trailing data streams,
floating pixels, particles or semi-transparent pixels around or away from the creature. No text,
letters, numbers, logos, watermark, signature, UI, frame or border.
```
**NEGATIVE:** `snake with hood, cobra hood, real earthworm, sandworm from a film, dune worm, tentacles, eyes on stalks, logo, letters, numbers, binary code, watermark, signature, UI, frame, background scenery, ground, floor, cast shadow, glow, aura, bloom, haze, mist, trailing data, particles, sparkles, dust, blur, smooth gradient shading, photorealistic, 3D render, multiple creatures, cropped body, checkerboard background, gore`

### 3.3.3 บอต — มอนสเตอร์ W2 (x1) และลูกสมุน W3 (x2)
**ไฟล์:** `img/raw/CyberHell/mob-bot-cyberhell.png` → `img/CyberHell/mob-bot-cyberhell.png`
**ไทย:** หุ่นบอตลอยตัวสั้น ๆ ทรงกลมป้อม มีแขนเล็กสองข้างและเสาอากาศ จอหน้าเป็นแถบตาสองตา (ไม่ใช่ตาแดงดวงเดียวแบบ HAL) · ฐานเท้า = ปลายขาตั้งสั้น ๆ ให้แตะขอบล่าง

```
High-detail modern pixel art game monster sprite: clean crisp 1-pixel dark outline around the
entire silhouette, chunky readable shapes, cel-shaded with soft ordered-dither shading, limited
palette of about 40 flat colors with no smooth gradients, dynamic pose, 3/4 front view, full body
visible.

SUBJECT: a small hostile "spam bot" robot: a chubby rounded body (capsule/egg shaped) of matte
dark violet plastic-metal with lavender panel lines, a wide dark visor screen showing two
narrow angled cyan eye bars (two eyes, NOT a single round lens), a thin antenna on top with a small
amber LED bulb, a small dish-like ear on each side, two stubby jointed arms with three-fingered
pincer hands raised aggressively, and three short landing-strut legs with round feet, standing
firmly (not floating). Compact silhouette about as tall as wide. A small hatch on the belly
half-open showing dark inside.
COLOR THEME: dark violet, lavender, cyan eye bars, amber antenna light, a little copper trim.

CANVAS: square 1024x1024, a single creature centered, the foot pads touching the bottom edge of the
canvas (no empty space below), antenna tip within 3% of the top edge, at least 6% side margin.
BACKGROUND: fully transparent (alpha 0) everywhere outside the silhouette. If transparency is not
supported, use one perfectly flat solid pure white #FFFFFF background with no gradient, no
vignette, no checkerboard. NO ground plane, no floor, no cast shadow, no contact shadow. NO glow,
aura, halo, bloom, mist, smoke, haze, sparkles, dust, floating pixels, particles or semi-
transparent pixels around or away from the creature. No text, letters, numbers, logos, watermark,
signature, UI, frame or border.
```
**NEGATIVE:** `single red camera lens eye, HAL 9000, glowing red eye, GLaDOS, WALL-E, R2-D2, Android logo, Roomba, humanoid woman, holographic woman, letters, numbers, logo, watermark, signature, UI, frame, background scenery, ground, floor, cast shadow, glow, aura, bloom, haze, mist, particles, sparkles, dust, blur, smooth gradient shading, photorealistic, 3D render, multiple robots, cropped feet, checkerboard background, gore`

### 3.3.4 ม้าโทรจัน — บอสชายแดนโซน 4 (W3)
**ไฟล์:** `img/raw/CyberHell/boss-frontier-cyberhell.png` → `img/CyberHell/boss-frontier-cyberhell.png`
**ไทย:** ม้าไม้ยักษ์ตั้งบนแท่นล้อ แผ่นไม้บางส่วนแทนที่ด้วยวงจร/บล็อกพิกเซลเพี้ยน **ท้องเปิดอยู่** เห็นภายในมืดมีเส้นวงจรเรืองสีม่วงแดง ไม่มีตัวอะไรโผล่ (สื่อ "ของขวัญที่เปิดประตูให้ข้าเอง") ท่ายืนสามส่วนสี่ เชิดหัวเพื่อให้ทรงไม่แบน

```
High-detail modern pixel art game boss sprite: clean crisp 1-pixel dark outline around the entire
silhouette, chunky readable shapes, cel-shaded with soft ordered-dither shading, limited palette
of about 40 flat colors with no smooth gradients, warm rim light from the upper left, dense fine
detail, 3/4 front view, full body visible.

SUBJECT: a giant wooden horse of legend ("Trojan horse") corrupted by malware: a large ancient
wooden horse standing on a low wooden platform with four big spoked wooden wheels, head raised high
and turned toward the viewer, neck arched, standing legs stiff, mane made of jagged rope-and-
cable strands. Body built of weathered dark oak planks held with iron bands and rivets, about a
quarter of the planks replaced by cracked circuit-board panels and glitching pixel-block patches
(cyan and hot magenta blocks inside the body outline only). The eyes are two glowing amber-red
discs drawn as solid opaque pixels. On the belly, a large square hatch door hangs OPEN on its
hinges, the inside is pitch black with a few thin lavender-violet circuit lines drawn as solid
lines (nothing inside, no creatures, no figures). Proportion: chunky and stylised, the silhouette
close to square (about as tall as wide) so it stays large when scaled, platform edge flat on the
bottom.
COLOR THEME: dark oak brown, iron grey, dark violet-navy, cyan and hot magenta glitch blocks,
lavender lines, amber eyes.

CANVAS: square 1024x1024, a single object centered, the wheel bottoms touching the bottom edge of
the canvas (no empty space below), ears within 3% of the top edge, at least 6% side margin.
BACKGROUND: fully transparent (alpha 0) everywhere outside the silhouette. If transparency is not
supported, use one perfectly flat solid pure white #FFFFFF background with no gradient, no
vignette, no checkerboard. NO ground plane, no floor, no cast shadow, no contact shadow. NO glow,
aura, halo, bloom, mist, smoke, haze, sparkles, dust, RGB-split ghost copies outside the body,
floating pixels, particles or semi-transparent pixels around or away from the object. No text,
letters, numbers, logos, watermark, signature, UI, frame or border.
```
**NEGATIVE:** `soldiers inside, people, creatures inside, real horse photo, cavalry horse with rider, unicorn, wings, movie Troy design, existing game design, logo, letters, numbers, code text, watermark, signature, UI, frame, background scenery, city walls, ground, floor, cast shadow, glow, aura, bloom, haze, mist, particles, sparkles, dust, chromatic aberration ghosting outside body, blur, smooth gradient shading, photorealistic, 3D render, multiple horses, cropped wheels, checkerboard background, gore`
**เช็ก:** ทรงไม่แบนยาว (สูง:กว้าง ≥ 0.8) · ไม่มีคนโผล่ในท้อง · เอฟเฟกต์กลิตช์อยู่ในตัวเท่านั้น

### 3.3.5 ผู้ตรวจสอบคลาวด์ — ผู้ทดสอบโซน 4
**ไฟล์:** `img/raw/CyberHell/boss-tester-cyberhell.png` → `img/CyberHell/boss-tester-cyberhell.png`
**ไทย:** เอไอผู้ตรวจสอบจากระบบกลาง ร่างเพรียวยืนบนขาสองข้าง หัวเป็นจอกระจกเรียบ มีวงล้อโหลดเป็นวงแบ่งท่อนติดหลัง **เอียงและติดกับหลังเหมือนจานเรดาร์ ไม่ลอยเหนือหัว** (กันอ่านเป็นรัศมีนางฟ้า/พระ) ปีกเป็นแผงระบายความร้อนเหลี่ยม 2 แผง ไม่ใช่ปีกขนนก ไม่ใช่ 6 ปีก ถือแผ่นแท็บเล็ตตรวจสอบ

```
High-detail modern pixel art game sprite in the style of a polished fantasy-RPG boss illustration:
clean crisp 1-pixel dark outline around the entire silhouette, chunky readable shapes, cel-shaded
with soft ordered-dither shading, limited palette of about 40 flat colors with no smooth gradients,
warm rim light from the upper left, dense fine detail, 3/4 front view, full body visible from head
to feet.

SUBJECT: a calm authoritative "cloud auditor" artificial intelligence, an original robotic
inspector sent from a central server system, a tester rather than a villain. Slender-heroic
proportions, about 3.5 heads tall, standing upright on two slim jointed legs, feet planted.
Head: a smooth rounded mirror-black glass screen face (no eyes, no mouth) showing two thin cyan
horizontal scan lines. Body: a sleek suit of dark slate-navy armored panels with thin luminous
white-cyan seam lines and lavender panel accents, a short open cape-like coat of layered translucent-
look flat panels (drawn opaque). Behind the back, mounted like a radar dish and tilted at three-
quarter angle (NOT above the head, NOT a halo): a large segmented circular loading-spinner ring made
of eight separate arc pieces, six in dark violet and two in bright cyan. Two folded angular heat-
sink fin panels (rectangular, with LED strips, slanting down and back, NOT feather-shaped, NOT
spread wide) attached at the shoulder blades. In the hand on the LEFT side of the image, a
slim semi-transparent-looking flat audit tablet (drawn opaque, glass-blue with a plain checklist
of empty checkbox squares and no readable text); the hand on the RIGHT side of the image is
open, palm up, offering a "prove it" gesture.
COLOR THEME: dark slate-navy, white-cyan light seams, lavender-violet, cyan, small amber status
lights.

CANVAS: square 1024x1024, a single character centered, feet planted with the soles touching the
bottom edge of the canvas (no empty space below the feet), top of the head within 3% of the top
edge, at least 6% side margin. BACKGROUND: fully transparent (alpha 0) everywhere outside the
character silhouette. If transparency is not supported, use one perfectly flat solid pure white
#FFFFFF background with no gradient, no vignette, no checkerboard. NO ground plane, no floor, no
cast shadow, no contact shadow or ellipse under the feet. NO glow, aura, halo, bloom, mist, smoke,
haze, sparkles, dust, floating pixels, particles, data streams or semi-transparent pixels around
or away from the character; every light effect must be solid opaque pixels attached to the
character with hard pixel edges. No text, letters, numbers, logos, watermark, signature, UI, frame
or border.
```
**NEGATIVE:** `angel, feathered wings, six wings, seraph, halo above head, nimbus, ring above head, glowing orb ring, cross, religious symbol, single red lens eye, HAL 9000, GLaDOS, Cortana, translucent blue woman, hologram woman, Ultron, existing AI character, existing game AI design, logo, Google logo, Microsoft logo, letters, readable text, numbers, watermark, signature, UI, frame, background scenery, ground, floor, cast shadow, glow, aura, bloom, haze, mist, data streams, particles, sparkles, dust, blur, smooth gradient shading, photorealistic, 3D render, extra arms, extra fingers, cropped feet, checkerboard background, gore`
**เช็ก:** วงล้อไม่อยู่บนหัว · ไม่มีปีกขนนก · ไม่คล้าย AI จากหนัง/เกม (เทียบด้วยตา — Reese ให้ Mind ตรวจตอนเห็นภาพ)

---

# เช็กลิสต์กลางทุกภาพ (ก่อนบันทึกลง `img/raw/`)

- [ ] ไม่มีตัวอักษร/ตัวเลข/ลายคล้ายอักขระแม้เศษเดียว
- [ ] พื้นโปร่งจริง (หรือขาวล้วน ไม่ใช่เช็กเกอร์) · ไม่มี glow/ควัน/ฝุ่น/เศษลอย/เงาพื้น
- [ ] ฐานเท้า (หรือฐานตัว) ชิดขอบล่าง · หัว/ปลายสูงสุดใกล้ขอบบน · ทรงไม่แบนกว้างเกินจำเป็น
- [ ] ไม้กางเขนหรือรูปกางเขน 0 ชิ้น · สัญลักษณ์ศาสนาบนตัวร้าย 0 ชิ้น
- [ ] ย่อเป็น ~128 px แล้วยังอ่านออกว่าเป็นตัวอะไร (ไม่เละเป็นก้อนเดียว)
- [ ] เส้นขอบเข้มบาง ๆ รอบตัว ครบทั้งตัว (กันผิวซีดถูกลอกตอนพื้นขาว)
- [ ] ไม่ตรงกับตัวละครสำเร็จรูปของเกม/หนังที่มีลิขสิทธิ์
- [ ] ก่อนขายจริง (โหมด `ship`): ส่ง Chris (chris-culture) ตรวจซ้ำ 4 ชิ้นที่ละเอียดอ่อน: ยักษ์ผู้คุมชายแดน, วาลคิรี, เท็งงุ, บอสโซน 4

---

# ขั้นตอนวางไฟล์ (สำหรับคุณเป้ → Dale/Codex)

1. gen ที่ 1024×1024 ตรวจตามเช็กลิสต์ กลางและเช็กเฉพาะภาพ
2. สำรองของเดิมที่ชื่อชน (2 ไฟล์): `img/raw/Boss-frontier1.png` → `_Boss-frontier1-old.png` · `img/raw/CyberHell/Boss Zone4-cyberhell.png` → `_Boss Zone4-cyberhell-old.png`
3. วางไฟล์ตามชื่อในเอกสาร แล้วรัน `python3 scripts/prep-art.py` (ผ่านชื่อ `-th` เฉพาะโซน 1 ที่ไม่มีโฟลเดอร์; `-asia` `-west` `-cyberhell` เติมต่อท้ายตรงอยู่แล้ว ไม่โดนเตือน)
4. Dale/Codex: เชื่อม key ใหม่ (`boss-frontier-th`, `boss-frontier-{asia,west,cyberhell}`, `boss-tester-{asia,west,cyberhell}`, `mob-{skeleton-west,bug,worm,bot-cyberhell}`) ในโค้ด event — **Mind ไม่แตะ repo** · ชื่อกลุ่มมอนสเตอร์ในเกมให้ใช้ตามที่ Reese แก้ (เช่น "สุนัขนรก" ไม่ใช่มนุษย์หมาป่า)
5. ตรวจว่าไม่มีภาพเก่า (`Boss-frontier1`) ถูกอ้างอยู่ในโค้ด/ manifest ก่อน merge

## สรุปตารางไฟล์

| # | ภาพ | ไฟล์ raw |
|---|---|---|
| 1 | ยักษ์ผู้คุมชายแดน (โซน 1) | `img/raw/boss-frontier-th.png` |
| 2 | บอสโซน 4 ใหม่ | `img/raw/CyberHell/Boss Zone4-cyberhell.png` |
| 3 | ชูเตนโดจิ | `img/raw/Asia/boss-frontier-asia.png` |
| 4 | เท็งงุ | `img/raw/Asia/boss-tester-asia.png` |
| 5 | เคานต์แวมไพร์ | `img/raw/West/boss-frontier-west.png` |
| 6 | วาลคิรี | `img/raw/West/boss-tester-west.png` |
| 7 | ทหารโครงกระดูก | `img/raw/West/mob-skeleton-west.png` |
| 8 | บั๊ก | `img/raw/CyberHell/mob-bug-cyberhell.png` |
| 9 | หนอน | `img/raw/CyberHell/mob-worm-cyberhell.png` |
| 10 | บอต | `img/raw/CyberHell/mob-bot-cyberhell.png` |
| 11 | ม้าโทรจัน | `img/raw/CyberHell/boss-frontier-cyberhell.png` |
| 12 | ผู้ตรวจสอบคลาวด์ | `img/raw/CyberHell/boss-tester-cyberhell.png` |
