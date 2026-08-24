# ออฟฟิศทีม AGAPAE — พรอมต์สำหรับ Gen รูป

ตอนนี้ผังออฟฟิศบนหน้า Team Console **วาดด้วยโค้ดล้วน** (SVG + DOM) ยังไม่ต้องมีไฟล์รูปก็ทำงานได้
เอกสารนี้คือพรอมต์สำหรับ gen รูปมาแทนของที่วาดไว้ เมื่อไหร่ก็ได้

## วิธีเอารูปมาใส่

ในไฟล์ `index.html` มองหาบล็อกนี้ (อยู่ต้นส่วน OFFICE):

```js
const OFC_ART = { floor:null, sprites:{} };
```

- **พื้นออฟฟิศทั้งใบ** → วางไฟล์ที่ `office/floor.png` แล้วแก้เป็น `floor:'office/floor.png'`
  รูปจะถูกวางทับผังที่วาดด้วยโค้ด (ห้อง/เฟอร์นิเจอร์ที่วาดไว้จะไม่ถูกวาดซ้ำ) แต่ตัวเดินยังเดินตามผังเดิม
  **ดังนั้นรูปต้องวางห้องตรงตำแหน่งเดิมเป๊ะ ๆ** — ดูตารางพิกัดท้ายเอกสาร
- **ตัวเอเจนต์** → วางไฟล์ที่ `office/sprites/<id>.png` แล้วแก้เป็น
  `sprites:{ claudy:'office/sprites/claudy.png', minnie:'office/sprites/minnie.png', ... }`
  ใส่ทีละคนได้ ใครยังไม่มีรูปก็ใช้หัว avatar เดิมไปก่อน

---

## 1) พื้นออฟฟิศทั้งใบ (1 รูป)

ต้องเป็น **top-down floor plan** สัดส่วน **1000 × 640** (อัตราส่วน 25:16) พื้นหลังทึบ

```
Top-down 2D office floor plan illustration, flat vector style, soft warm editorial
palette: cream paper background (#F4F2EE), off-white rooms (#FFFFFF), muted ink lines
(#D2CEC4), accent colors limited to dusty navy #2A3344, warm brass #9A7B4F, slate teal
#4A6670, muted plum #8A5A66, sage green #3A6B50. No text, no labels, no people.
15 rectangular rooms arranged around a cross-shaped corridor, seen strictly from above.
Furniture drawn simply and readably: desks with chairs, bookshelves, filing cabinets,
server racks, a pinboard wall, a round meeting table, sofas, a pantry counter with a
coffee machine, potted plants. Clean thin outlines, subtle drop shadows, no gradients,
no perspective, no isometric tilt — pure orthographic top view. Aspect ratio 25:16.
```

## 2) ตัวเอเจนต์ (13 รูป — คนละไฟล์)

ตัวเล็ก ๆ เดินได้ ยืนหันหน้าเข้าหาคนดู ต้อง **พื้นหลังโปร่งใส (PNG transparent)**
ให้ตัวสูงประมาณ 4–5 เท่าของหัว และ **ตัดขอบชิดตัว** (เท้าอยู่ขอบล่างของรูปพอดี — โค้ดยึดจุดยืนที่เท้า)

พรอมต์ฐาน (ใช้ร่วมกันทุกคน):

```
Tiny 2D character sprite for a top-down office game, full body, standing, facing the
viewer, flat vector style with clean outlines, soft warm editorial palette, chunky
readable shapes, no background (transparent PNG), no text, no shadow baked in,
centered, full body fits the frame with feet at the bottom edge, head slightly oversized
(about 1/4 of body height) so the face reads at small size.
```

ต่อท้ายด้วยคำอธิบายรายคน — ยึดสีตาม pipeline ของแต่ละคน:

| Agent | สี pipeline | ต่อท้ายพรอมต์ |
|---|---|---|
| Claudy | navy `#2A3344` | `A calm, composed young man in a dark navy blazer over a white shirt, holding a slim tablet, neat short black hair, quietly confident expression.` |
| Minnie | brass `#9A7B4F` | `A bright, curious young woman in a mustard cardigan, short bob haircut, holding a fan of sticky notes, wide excited eyes.` |
| Reese | brass `#9A7B4F` | `A focused professional woman in a warm brown blouse, glasses, hair tied back, carrying a thick folder of documents under one arm.` |
| Addy | brass `#9A7B4F` | `An energetic saleswoman in a rust-red jacket, phone headset on, one hand raised mid-pitch, confident stance.` |
| Rae | teal `#4A6670` | `A thoughtful writer in a soft teal knit sweater, long hair, holding a fountain pen and a small notebook, gentle expression.` |
| Vera | teal `#4A6670` | `A precise UX designer in a slate blue shirt, straight neat hair, holding a ruler and a paper wireframe, measured posture.` |
| Mind | teal `#4A6670` | `A sharp-eyed visual designer with a high ponytail and a cherry-red blazer, holding a drawing stylus, color swatch fan clipped to her belt.` |
| Chris | plum `#8A5A66` | `A stern quality inspector in a deep plum vest, arms crossed, reading glasses low on the nose, red pen tucked behind one ear.` |
| Libby | plum `#8A5A66` | `A tidy librarian in a muted plum cardigan, hair in a low bun, carrying a labelled archive box.` |
| Nick | grey `#8C8A86` | `A data analyst in a grey henley, headphones around the neck, holding a coffee mug and looking at a floating chart.` |
| Dale | grey `#8C8A86` | `A hands-on DevOps engineer in a grey work shirt with rolled sleeves, tool pouch on the belt, holding a network cable.` |
| Toby | grey `#8C8A86` | `A playful game developer in a grey hoodie, sneakers, holding a game controller, relaxed grin.` |
| News | green `#3A6B50` | `A neutral news anchor in a forest-green blazer, earpiece, holding a script sheet, composed newsroom posture.` |

> ถ้าอยากได้ท่าเดินด้วย ให้ gen เพิ่มเป็น sprite sheet 4 เฟรม (ยืน · ก้าวซ้าย · ยืน · ก้าวขวา)
> เรียงแนวนอน พื้นหลังโปร่ง แล้วบอกผมไว้ เดี๋ยวผมแก้โค้ดให้เล่นเป็นแอนิเมชันแทนการเด้งขึ้นลง

---

## พิกัดห้อง (ถ้าจะ gen พื้นออฟฟิศให้ตรงผังเดิม)

ระบบพิกัด `1000 × 640` มุมซ้ายบน = (0,0)

| ห้อง | เจ้าของ | x | y | กว้าง | สูง |
|---|---|---|---|---|---|
| ห้องไอเดีย | Minnie | 32 | 32 | 164 | 144 |
| ห้องวิจัย | Reese | 228 | 32 | 182 | 144 |
| ห้องข่าว | News | 410 | 32 | 182 | 144 |
| มุมเขียน | Rae | 592 | 32 | 180 | 144 |
| สตูดิโอภาพ | Mind | 804 | 32 | 164 | 144 |
| โต๊ะขาย | Addy | 32 | 208 | 164 | 110 |
| ห้องคลังไฟล์ | Libby | 32 | 320 | 164 | 110 |
| ศูนย์คุมงาน | Claudy | 228 | 208 | 544 | 222 |
| ห้องสเปค | Vera | 804 | 208 | 164 | 110 |
| ห้องตรวจงาน | Chris | 804 | 320 | 164 | 110 |
| ห้องข้อมูล | Nick | 32 | 462 | 164 | 146 |
| ห้องเซิร์ฟเวอร์ | Dale | 228 | 462 | 182 | 146 |
| ห้องเกม | Toby | 410 | 462 | 182 | 146 |
| ห้องพัก | ส่วนกลาง | 592 | 462 | 180 | 146 |
| แพนทรี่ | ส่วนกลาง | 804 | 462 | 164 | 146 |

ทางเดิน: แนวตั้งที่ x≈212 และ x≈788 · แนวนอนที่ y≈192 และ y≈446
