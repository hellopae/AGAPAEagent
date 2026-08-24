# ออฟฟิศทีม AGAPAE — พรอมต์สำหรับ Gen รูป

## สถานะตอนนี้

- **พื้นออฟฟิศ** — ใช้รูปที่ Gen มาแล้ว อยู่ที่ `office/floor.jpeg` · พิกัดห้อง ทางเดิน ประตู และโต๊ะทุกตัวใน `index.html` วัดจากรูปนี้ตรง ๆ
  **ถ้า gen พื้นใหม่ ผังจะไม่ตรงกับที่วัดไว้ ต้องวัดใหม่ทั้งชุด** — ถ้าจะเปลี่ยนบอกก่อนนะครับ
- **ตัวละคร** — ยังไม่มีไฟล์ ใช้หัว avatar เดิมกับลำตัวสีของสายงานไปก่อน
  Claudy แบบ SD ที่ gen มาแล้ว **ใช้เป็นต้นแบบของทั้งทีม** — พรอมต์ด้านล่างล็อกสไตล์ตามตัวนั้น

## วิธีเอารูปตัวละครมาใส่

1. บันทึกไฟล์เป็น `office/sprites/<id>.png` — id ใช้ตามนี้:
   `claudy · minnie · reese · addy · rae · vera · mind · chris · libby · nick · dale · toby · news`
2. เปิด `index.html` หาบรรทัด

```js
const OFC_ART = { floor:'office/floor.jpeg', sprites:{} };
```

   แล้วเติมทีละคน (ใครยังไม่มีรูปก็ใช้หัว avatar เดิมไปก่อน ไม่พัง):

```js
const OFC_ART = { floor:'office/floor.jpeg', sprites:{
  claudy:'office/sprites/claudy.png',
  minnie:'office/sprites/minnie.png',
}};
```

> ⚠️ **พื้นหลังต้องโปร่งใสจริง ๆ (PNG มี alpha)** — ตัว Claudy ที่ส่งมาพื้นหลังเป็นสีขาวทึบ
> ถ้าเอาไปวางในออฟฟิศจะเห็นเป็นกล่องขาวรอบตัว · ตอน gen ให้สั่ง "transparent background, PNG with alpha"
> หรือส่งไฟล์มา เดี๋ยวผมลบพื้นขาวออกให้

---

## พรอมต์ตัวละคร — สไตล์เดียวกับ Claudy

พรอมต์ฐาน ใช้ร่วมกันทุกคน แล้วต่อท้ายด้วยบล็อกของแต่ละคน:

```
Chibi SD-style anime character, full body, standing straight and facing the viewer,
head about one third of the total body height, big expressive eyes, small simple nose,
soft rounded body proportions, short stubby limbs.
Clean flat cel-shaded coloring with bold dark navy outlines of even thickness,
minimal shading, no gradients, no background details.
Transparent background (PNG with alpha), no shadow, no text, no border.
Centered, full body fits inside the frame with the feet touching the bottom edge,
portrait aspect ratio about 9:16.
```

ต่อท้ายรายคน:

| id | ต่อท้ายพรอมต์ |
|---|---|
| `claudy` | *(มีแล้ว — ใช้เป็นต้นแบบ)* `A calm composed young man in a dark navy three-piece suit with an olive green tie, tousled dark navy hair, slight confident smile, holding a light grey tablet with both hands.` |
| `minnie` | `A bright cheerful young woman in a mustard yellow cardigan over a white blouse, short dark bob haircut, wide excited eyes, holding a fan of colorful sticky notes in one hand.` |
| `reese` | `A focused young woman in a warm brown blouse and beige skirt, round glasses, dark hair tied back in a low ponytail, hugging a thick stack of documents against her chest.` |
| `addy` | `An energetic young woman in a rust-red blazer over a white shirt, long wavy dark hair, bright confident grin, holding a smartphone up in one hand.` |
| `rae` | `A gentle thoughtful young woman in a soft teal knit sweater, long straight dark hair, calm half-smile, holding a small notebook and a fountain pen.` |
| `vera` | `A precise young woman in a slate blue button-up shirt and dark trousers, neat straight shoulder-length hair, serious focused expression, holding a ruler and a paper wireframe sheet.` |
| `mind` | `A sharp-eyed young woman in a cherry-red blazer over a white top, dark hair in a high ponytail, confident smirk, holding a drawing stylus, a color swatch fan clipped to her belt.` |
| `chris` | `A stern middle-aged man in a deep plum vest over a white shirt, short greying dark hair, thin reading glasses low on his nose, arms crossed, a red pen tucked behind one ear.` |
| `libby` | `A tidy young woman in a muted plum cardigan and long skirt, dark hair in a low bun, small polite smile, carrying a labelled archive box with both hands.` |
| `nick` | `A relaxed young man in a grey henley shirt, dark messy hair, headphones resting around his neck, holding a coffee mug in one hand.` |
| `dale` | `A hands-on young man in a grey work shirt with rolled-up sleeves and a tool pouch on his belt, short dark hair, easy grin, holding a coiled blue network cable.` |
| `toby` | `A playful young man in a grey hoodie and sneakers, messy light brown hair, wide happy grin, holding a black game controller with both hands.` |
| `news` | `A composed young man in a forest-green blazer and white shirt, neat short dark hair, an earpiece in one ear, holding a script sheet in one hand.` |

> อยากได้ **ท่าเดิน** ด้วยก็ gen เพิ่มเป็น sprite sheet 4 เฟรมเรียงแนวนอน
> (ยืน · ก้าวซ้าย · ยืน · ก้าวขวา) พื้นหลังโปร่ง ขนาดเฟรมเท่ากันทุกเฟรม
> แล้วบอกผม เดี๋ยวแก้โค้ดให้เล่นเป็นแอนิเมชันแทนการเด้งขึ้นลง

---

## ผังที่ใช้อยู่ (วัดจาก `office/floor.jpeg` — ระบบพิกัด 1296 × 816)

| ห้อง | ใครอยู่ | x | y | กว้าง | สูง |
|---|---|---|---|---|---|
| ห้องไอเดีย & วิจัย | Minnie · Reese | 41 | 47 | 282 | 185 |
| สตูดิโอภาพ | Mind | 325 | 47 | 155 | 185 |
| ห้องเซิร์ฟเวอร์ | Dale | 482 | 47 | 145 | 187 |
| มุมเขียน | Rae | 692 | 48 | 146 | 186 |
| ห้องสเปค | Vera | 838 | 48 | 120 | 186 |
| ห้องข่าว & ข้อมูล | News · Nick | 979 | 48 | 272 | 184 |
| ห้องคลังไฟล์ | Libby | 41 | 236 | 229 | 96 |
| โต๊ะขาย | Addy | 41 | 334 | 223 | 255 |
| ห้องตรวจงาน | Chris | 41 | 596 | 277 | 184 |
| ห้องเกม | Toby | 325 | 596 | 286 | 184 |
| ศูนย์คุมงาน | Claudy | 323 | 316 | 295 | 206 |
| ห้องประชุม | ส่วนกลาง | 681 | 314 | 291 | 210 |
| แพนทรี่ | ส่วนกลาง | 681 | 591 | 237 | 191 |
| ห้องพัก | ส่วนกลาง | 972 | 591 | 277 | 191 |

ทางเดิน: แนวตั้ง x≈300 · x≈650 · x≈1058 — แนวนอน y≈272 · y≈556
