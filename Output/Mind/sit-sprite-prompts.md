# Sit-Sprite Gen Prompts — 13 Agents (Office Dashboard)

สำหรับ: เจ้าของ (นำไปวางใน image-gen tool เอง — ไม่มีการ gen/แก้โค้ดในงานนี้)
อ้างอิงจากการเปิดดูจริงทุกไฟล์ `office/sprites/<Name>-SD.png` และ `office/sprites/<id>.png`

---

## 1. Style Block ร่วม (ผนวกท้ายทุก prompt รายคน)

```
Style: flat cartoon chibi illustration, clean thick black outlines, flat cel-shaded
coloring with minimal soft shading, no gradients, no background, no drop shadow,
no frame or border, no text or watermark. Same exact art style, line weight, and
color palette as the reference character — this is the SAME character in a new
pose, not a redesign.

Pose: sitting in a simple office chair, facing forward toward the viewer (same
head-on camera angle as the standing reference — NOT a side view, NOT a 3/4 view,
NOT a top-down or bird's-eye angle). Character is working at a desk: hands resting
on the desk/keyboard, or holding their usual signature item. Knees bent at roughly
90°, both feet resting near the chair base (desk itself does not need to be drawn
in full — a small desk edge or keyboard sliver in front is enough, or omit the desk
entirely and just show the seated pose with hands in working position).

Chair: simple modern office task chair, dark charcoal-gray/near-black seat and
back, thin metal or dark plastic armrests, chair base/casters visible at the very
bottom of the frame. Chair tone should read dark neutral, consistent with the
office floor plan's cream/tan-brown/charcoal palette — not colorful, not branded.

Critical framing rules:
- Head must be the EXACT same size (in pixels, relative to canvas width) as in the
  standing reference — this file will be swapped 1:1 in place of the standing
  sprite with no code changes, so head scale must match exactly.
- The seated pose is SHORTER than the standing pose, so leave the extra empty
  space at the TOP of the canvas (above the character), not the bottom.
- The bottom of the chair (seat base / chair legs / casters) must sit flush against
  the very bottom edge of the canvas frame — do not leave any transparent margin
  below the chair.
- Canvas dimensions and background: transparent PNG, no visible canvas border.
```

---

## 2. Prompt รายคน (13 คน)

### Addy — save as `office/sprites/Addy-SIT.png`
```
Chibi female office character, same character as reference: brown hair in a high
wavy ponytail with loose wavy strands cascading down, straight-across bangs,
warm brown eyes, cheerful open smile. Wearing a rust/terracotta-orange blazer
over a white top, with a gray lanyard and ID badge hanging around her neck
(visible over the white top under the open blazer), gray trousers, black flats.
She is normally shown holding a smartphone showing a chat bubble UI in one hand.

Now show her SEATED in an office chair, facing forward: one hand holding the
smartphone up near chest height (same phone as reference, showing the chat
bubble UI), the other hand resting on the desk/keyboard in front of her, same
cheerful smile, same ponytail flowing behind the chair back.

[Insert Style Block from Section 1]
```

### Chris — save as `office/sprites/Chris-SIT.png`
```
Chibi male office character, same character as reference: messy spiky brown
hair, round black-frame glasses, a red pencil tucked behind his right ear,
light neutral smile. Wearing a plain gray hoodie, dark charcoal/navy pants,
black shoes. No lanyard.

Now show him SEATED in an office chair, facing forward: both hands resting on
a keyboard/desk in front of him (instead of arms crossed), same glasses, same
pencil behind ear, relaxed working posture.

[Insert Style Block from Section 1]
```

### Claudy — save as `office/sprites/Claudy-SIT.png`
```
Chibi male office character, same character as reference: dark navy/blue-black
wavy hair swept upward, no glasses, calm confident half-smile. Wearing a dark
navy suit jacket, white dress shirt, olive-green tie. Normally shown holding a
gray tablet with both hands in front of his chest.

Now show him SEATED in an office chair, facing forward: holding the same gray
tablet propped upright on the desk/his lap with both hands, same suit and tie,
same calm expression.

[Insert Style Block from Section 1]
```

### Dale — save as `office/sprites/Dale-SIT.png`
```
Chibi male office character, same character as reference: messy brown hair, no
glasses, calm neutral expression. Wearing a plain white/light dress shirt (top
button open, no tie), gray trousers, gray shoes. Normally shown holding a coiled
blue ethernet/network cable with a connector clip.

Now show him SEATED in an office chair, facing forward: one hand on the
keyboard/desk, the other hand holding the same coiled blue ethernet cable resting
on the desk in front of him, same plain shirt, same relaxed expression.

[Insert Style Block from Section 1]
```

### Libby — save as `office/sprites/Libby-SIT.png`
```
Chibi female office character, same character as reference: brown hair styled
in a braided bun updo with side-swept bangs, amber/gold eyes, gentle smile.
Wearing a sage-green cardigan over a cream top, a blue lanyard with an ID tag
reading "LIBBY", a brown/olive floral-print skirt, brown shoes. Normally shown
holding a cardboard archive box labeled "LIBRARY ARCHIVE - LOGS".

Now show her SEATED in an office chair, facing forward: the same labeled
cardboard box resting on the desk/her lap, one hand resting on top of the box,
the other hand near a keyboard, same braided bun and cardigan, same gentle smile.

[Insert Style Block from Section 1]
```

### Mind — save as `office/sprites/Mind-SIT.png`
```
Chibi female office character, same character as reference: light lavender/purple
hair with a side part, a small gold star-shaped pin/sticker near her hairline,
warm brown eyes, soft blush, gentle smile. Wearing a green cardigan/jacket over
a cream top with a matching star pin on the chest, a dark navy/gray skirt, and a
brown tool-belt pouch around her waist holding colored pencils/markers and a
paint-swatch fan card. Normally shown holding a stylus/paintbrush in one hand.

Now show her SEATED in an office chair, facing forward: one hand holding the
same stylus/paintbrush near a tablet or sketch on the desk, the other hand
resting on the desk, tool belt with pencils and color-swatch fan still visible
at her waist, same lavender hair and star pin.

[Insert Style Block from Section 1]
```

### Minnie — save as `office/sprites/Minnie-SIT.png`
```
Chibi office character, same character as reference: short wavy brown hair with
a pen tucked behind one ear, freckles, small stud earrings, warm friendly smile.
Wearing a light-gray blazer over a white turtleneck, dark trousers, black shoes.
Normally shown holding a small fan of colorful sticky notes/idea cards (with a
small icon and handwritten Thai text) in one hand.

Now show them SEATED in an office chair, facing forward: one hand holding the
same fan of colorful idea cards up near chest height, the other hand resting on
the desk, same pen behind ear, same friendly smile.

[Insert Style Block from Section 1]
```

### News — save as `office/sprites/News-SIT.png`
```
Chibi male office character, same character as reference: dark tousled hair,
round thin wire-frame glasses, calm neutral expression. Wearing a blue-gray
blazer over a blue striped shirt, gray trousers, black shoes. Normally shown
holding a folded/rolled newspaper or notepad in one hand.

Now show him SEATED in an office chair, facing forward: one hand holding the
same folded newspaper/notepad resting on the desk, the other hand near the
keyboard, same round glasses, same calm expression.

[Insert Style Block from Section 1]
```

### Nick — save as `office/sprites/Nick-SIT.png`
```
Chibi male office character, same character as reference: messy brown hair,
black rectangular glasses, calm content smile. Wearing a blue-gray cable-knit
sweater over a white collared shirt, gray trousers, brown shoes, an analog
wristwatch on each wrist. Normally shown holding a cream coffee mug in one hand
and a smartphone/small tablet tucked against the other arm.

Now show him SEATED in an office chair, facing forward: the coffee mug resting
on the desk near one hand, the smartphone/tablet held or propped on the desk by
the other hand, both wristwatches visible, same glasses and content expression.

[Insert Style Block from Section 1]
```

### Rae — save as `office/sprites/Rae-SIT.png`
```
Chibi female office character, same character as reference: long straight dark
brown hair with a center part, round glasses, soft gentle smile. Wearing a dark
green blazer over a white collared shirt, a blue lanyard with a photo ID tag
reading "RAE", gray trousers, black shoes. Normally shown holding a small
notebook in one hand and a pen in the other.

Now show her SEATED in an office chair, facing forward: the same small notebook
resting open on the desk, pen in hand as if writing, same glasses, lanyard, and
gentle smile.

[Insert Style Block from Section 1]
```

### Reese — save as `office/sprites/Reese-SIT.png`
```
Chibi female office character, same character as reference: dark brown hair in
a ponytail tied with a blue bow/ribbon, round glasses, gentle confident smile.
Wearing a dark navy blazer, a tan/khaki skirt, brown shoes. Normally shown
holding a thick stack of white document papers in both arms.

Now show her SEATED in an office chair, facing forward: the same stack of white
documents resting on the desk in front of her, one hand on top of the stack, the
other hand near the keyboard, same blue hair bow and glasses.

[Insert Style Block from Section 1]
```

### Toby — save as `office/sprites/Toby-SIT.png`
```
Chibi male office character (younger/kid-like proportions), same character as
reference: messy orange/ginger hair, big laughing closed-eye grin, black
headphones resting around his neck. Wearing a mustard-yellow hoodie, blue jeans
with orange stitching, brown shoes/boots. Normally shown holding a black game
controller in both hands.

Now show him SEATED in an office/gaming chair, facing forward: both hands
holding the same black game controller at chest height, same headphones around
neck, same big joyful laughing expression.

[Insert Style Block from Section 1]
```

### Vera — save as `office/sprites/Vera-SIT.png`
```
Chibi office character, same character as reference: short black hair with a
side-swept fringe, round glasses, neutral/serious expression. Wearing a green
blazer over a mustard-yellow shirt, dark navy trousers, black shoes, a brown
lanyard with a badge reading "VERA — UI Designer". Normally shown holding a
wooden ruler in one hand and a white wireframe/UI mockup sheet in the other.

Now show them SEATED in an office chair, facing forward: the wireframe mockup
sheet resting on the desk, the wooden ruler held against it or resting on the
desk beside it, same glasses, lanyard badge, and serious expression.

[Insert Style Block from Section 1]
```

---

## 3. ตารางสรุป

| id | ไฟล์ต้นฉบับ (SD) | ขนาด SD (ต้อง gen เท่านี้) | ไฟล์ผลลัพธ์ที่ต้องได้ |
|---|---|---|---|
| addy | Addy-SD.png | 572 × 1024 | `office/sprites/Addy-SIT.png` |
| chris | Chris-SD.png | 572 × 1024 | `office/sprites/Chris-SIT.png` |
| claudy | Claudy-SD.png | 768 × 1376 | `office/sprites/Claudy-SIT.png` |
| dale | Dale-SD.png | 572 × 1024 | `office/sprites/Dale-SIT.png` |
| libby | Libby-SD.png | 768 × 1376 | `office/sprites/Libby-SIT.png` |
| mind | Mind-SD.png | 572 × 1024 | `office/sprites/Mind-SIT.png` |
| minnie | Minnie-SD.png | 571 × 1024 | `office/sprites/Minnie-SIT.png` |
| news | News-SD.png | 572 × 1024 | `office/sprites/News-SIT.png` |
| nick | Nick-SD.png | 572 × 1024 | `office/sprites/Nick-SIT.png` |
| rae | Rae-SD.png | 571 × 1024 | `office/sprites/Rae-SIT.png` |
| reese | Reese-SD.png | 768 × 1376 | `office/sprites/Reese-SIT.png` |
| toby | Toby-SD.png | 571 × 1024 | `office/sprites/Toby-SIT.png` |
| vera | Vera-SD.png | 571 × 1024 | `office/sprites/Vera-SIT.png` |

(ขนาดอ่านจริงด้วย `sips -g pixelWidth -g pixelHeight` — Claudy/Libby/Reese ใหญ่กว่าคนอื่นเพราะไฟล์
-SD ต้นฉบับของ 3 คนนี้เป็น 768×1376 ส่วนที่เหลือ ~572×1024)

---

## 4. หมายเหตุ — ถ้าหัวใหญ่/เล็กไม่เท่ารูปยืน

ระบบสลับไฟล์ตรงๆ โดยยึด **สัดส่วนหัวต่อ canvas ให้เท่ากับรูปยืน** ถ้า gen ออกมาแล้วหัวไม่ตรง:

1. เทียบสัดส่วน "ความสูงหัว ÷ ความสูง canvas" ระหว่างไฟล์ -SD เดิม กับไฟล์ -SIT ใหม่ ด้วยตา
   หรือเปิดใน Preview/Photoshop วัด pixel
2. ถ้าหัวรูปนั่ง **เล็กกว่า** รูปยืน → crop ภาพนั่งให้แคบลง (ลด margin รอบตัว) แล้ว resize
   ให้ canvas กลับไปเป็นขนาดเดิม (572×1024 หรือ 768×1376 ตามคน) วิธีนี้จะขยายหัวให้ใหญ่ขึ้นตามสัดส่วน
3. ถ้าหัวรูปนั่ง **ใหญ่กว่า** รูปยืน → เพิ่ม transparent padding รอบภาพ (โดยเฉพาะด้านบน ตามกติกา
   "ช่องว่างต้องอยู่บน") แล้ว resize กลับไปที่ canvas เดิม จะลดสัดส่วนหัวลง
4. ทางที่ไวสุด: สั่ง gen ใหม่พร้อมเติมประโยคใน prompt ว่า
   `"the head must occupy approximately X% of the total canvas height, matching a standing
   reference character exactly"` — แทน X ด้วยสัดส่วนที่วัดได้จากไฟล์ -SD เดิมของคนนั้น
5. เก็บก้นเก้าอี้ให้ชิดขอบล่างเสมอ — ถ้า gen มาแล้วมีขอบใสใต้เก้าอี้ ให้ crop ขอบล่างออกแล้ว
   resize ให้ครบขนาด canvas เดิม (จะดันภาพทั้งหมดลงชิดขอบล่างพอดี)
