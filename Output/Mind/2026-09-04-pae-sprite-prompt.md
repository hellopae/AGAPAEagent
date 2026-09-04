# Prompt สร้างสไปรท์ "เป้" ให้เข้าชุดกับทีมในผังออฟฟิศ

อ้างจาก `avatars/Pae.png` (หน้า) + `office/sprites/toby.png` `office/sprites/claudy.png` (สไตล์/สัดส่วน)

**แนบรูปอ้างอิง 2 ใบเสมอ** — ใบหน้า = `avatars/Pae.png` · สไตล์ = `office/sprites/toby.png`
ถ้าเครื่องมือแนบได้ใบเดียว ให้แนบใบหน้า แล้วพึ่งคำบรรยายสไตล์ในพรอมป์แทน

---

## 1) ท่ายืน → `office/sprites/pae.png`

```
Full-body chibi anime character sprite of an Asian man in his early 40s, standing
facing the viewer, friendly confident half-smile.

Face and hair must match the reference portrait exactly: short messy black hair with
a side-swept fringe and spiky tips, thick dark eyebrows, large warm brown eyes, small
beauty mark just below his right eye, light warm skin, subtle orange blush marks on
the cheeks.

Wearing large black over-ear headphones resting on his head, a plain black short-sleeve
t-shirt, dark grey slim jeans, simple black-and-white sneakers. Holding a white stylus
pen in his right hand at chest height.

Art style: cute chibi proportions, roughly 3 heads tall, big head and small body, thick
clean black outlines, flat cel shading with soft simple highlights, bright and friendly
game-avatar look. Same style and proportions as the reference sprite sheet.

Composition: single character, standing upright, whole body visible including both feet,
centered in frame, tall portrait canvas.

Background: fully transparent PNG. No floor, no ground shadow, no drop shadow, no text,
no logo, no border, no extra characters.
```

## 2) ท่านั่งทำงาน → `office/sprites/Pae-SIT.png`

ใช้พรอมป์เดียวกับข้อ 1 แล้วเปลี่ยนย่อหน้า pose เป็น:

```
Pose: sitting on a modern black office chair with five-star caster base, seen straight
from the front, knees together, feet flat on the floor, relaxed posture, holding a white
stylus pen in his right hand.

Composition: single character seated, the whole chair including all wheels fully visible
and resting on the bottom edge of the frame, character centered, tall portrait canvas.

Background: fully transparent PNG. No floor, no ground shadow, no drop shadow, no text,
no logo, no border, no extra characters.
```

---

## หลัง gen เสร็จ — ทำ 3 ขั้นนี้เสมอ

```bash
# 1. ท่านั่งต้องรีดขอบใส + ย่อขนาดก่อนเข้าเว็บทุกครั้ง (ท่ายืนไม่ต้อง)
python3 scripts/fit-sit-sprite.py office/sprites/Pae-SIT.png

# 2. ท่ายืนย่อเองให้สูง 512px เท่าคนอื่น แล้วเช็คว่าพื้นหลังใสจริง
python3 -c "from PIL import Image; im=Image.open('office/sprites/pae.png'); print(im.size, im.mode)"
```

3. เสียบเข้าเว็บที่ `OFC_PAE.art` / `OFC_PAE.sitArt` ใน `office-live.js`
   ✅ ทำแล้ว 4 ก.ย. 2569 — ถ้า gen ใหม่ทับไฟล์เดิม ไม่ต้องแก้โค้ดอีก

## กับดักที่เจอมาแล้วกับ 13 คนก่อนหน้า — อย่าเหยียบซ้ำ

- **ชื่อไฟล์ห้ามมีเว้นวรรคนำหน้า** — GitHub Pages เสิร์ฟไม่ตรงพาธ (เคยเจอกับ News)
- **ตัว gen ทิ้งขอบใสใต้เก้าอี้** 12-87px ทำให้ตัวลอยเหนือพื้น → `fit-sit-sprite.py` จัดการให้
- **ตัว gen ทิ้งพิกเซลจาง alpha=1 เต็มเฟรม** — อย่าวัดขอบด้วย `getbbox()` เปล่า ๆ
- **ไฟล์ที่ gen มาหนัก ~1MB** ถ้าไม่ย่อ ผังจะโหลดช้ามาก
