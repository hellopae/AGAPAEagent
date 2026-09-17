# AVEGEE โซน 4 "นรกเครือข่าย" (CyberHell) — prompt ภาพที่ยังขาด

> **✅ Claudy ตรวจไฟล์จริงแล้ว (17 ก.ย. 2569) — ใช้ข้อนี้แทนหมายเหตุ ⚠️ ด้านล่าง**
> 1. **#12 `st-sala-cyberhell` = หอทะเบียนกรรม** (คีย์ `sala` ใน `src/data.js`) — ใบงานของ Claudy เขียนผิดว่าศาลาน้ำชา → **ใช้ prompt สำรอง (หอทะเบียนกรรม)** ไม่ใช่ prompt หลัก
> 2. **#13 รูปหน้าบอสโซน 4** — โซน 3 มี `Boss Zone3-west-profile.png` จริง → ทำด้วย และตั้งชื่อ **`Boss Zone4-profile`** (วางใน `img/raw/CyberHell/` แล้ว pipeline จะต่อ `-cyberhell` ให้เอง) แทนชื่อ `hero-boss-cyberhell-profile`


**จาก:** Mind · **ใบงาน:** `Output/Claudy/briefs/2026-09-17-avegee-zone4-asset-prompts.md`
**ปลายทาง:** คุณเป้เอา prompt ไป gen เองด้วย Gemini แล้ววางไฟล์ลง `img/raw/CyberHell/` (หรือวางตรง `img/CyberHell/` แล้วให้ `scripts/prep-art.py` ย้ายให้เอง — ดู §22.3 ของ `CONCEPT.md`) จากนั้นรัน `python3 scripts/prep-art.py`

## อ่านมาแล้ว
- `AVEGEE/ASSET-PROMPTS.md` ทั้งไฟล์ (บล็อกสไตล์ กฎเหล็ก สเปกหน้าตายมทูตทั้ง 6 คน)
- `AVEGEE/CONCEPT.md` ทั้งไฟล์ 1,167 บรรทัด (§12.6 กติกาย้ายโซน · §18–22 ระบบโซนหลายชุด กติกาชื่อไฟล์ งบไฟล์ บอสประจำโซน)
- `AVEGEE/INTRO_PROMPTS.md`

## ⚠️ ข้อจำกัดของรอบนี้ — อ่านก่อนใช้งาน
เซสชันนี้ไม่มีเครื่องมือเปิดโฟลเดอร์ (`ls`/`find`) หรือดูรูปได้โดยตรง จึงเทียบ `img/CyberHell/` และ `img/West/`
ได้แค่จาก **สิ่งที่เขียนไว้เป็นลายลักษณ์อักษร** ใน `CONCEPT.md`/`ASSET-PROMPTS.md` และรายการที่ใบงานให้มา
ไม่ได้เปิดไฟล์จริงดูทีละใบ — ก่อน gen ชุดใหญ่ ให้เช็ค 2 จุดที่ทำเครื่องหมาย ⚠️ ด้านล่างก่อน (เรื่องชื่อไฟล์ `st-sala`
และโปรไฟล์บอส) เพราะเดาจากข้อความล้วนมีความเสี่ยงผิดจุดเดียวคือ "เนื้อหาไม่ตรงกับที่โค้ดเรียกใช้จริง"

จากข้อความใน §22.3 พบว่า **โซน 3 (ปัจฉิม) เองก็ยังไม่ครบ** — มีแค่ `st-{dab,krata,lokan,sala}-west`
ส่วน `ngiw/lan/tea/tarang/krajok/sawan` ยังไม่มีรูป (ถอยไปใช้โซน 1) ดังนั้น "เทียบกับโซน 3" ในใบงาน
หมายถึงเทียบเฉพาะ **ชุดที่โซน 3 มีจริง** (ยมบาท+นิรา+ยมทูต 5 คน+4 สถานี) ไม่ใช่ทั้ง 8 สถานี — เอกสารนี้ยึดตามนั้น

---

## 1) เช็กลิสต์ — ต้อง gen ให้ครบ

| # | ไฟล์ที่ต้องได้ | คืออะไร | สถานะ | ภาพอ้างอิงที่ต้องแนบตอน gen (edit mode) |
|---|---|---|---|---|
| 1 | `crew-taan-cyberhell.png` | ทัณฑ์ยักษ์ตาน ชุดไซเบอร์ | ขาด | `img/crew-taan.png` (ล็อกหน้าตา) + `img/CyberHell/crew-nira-cyberhell.png` (จับโทนไซเบอร์ให้ตรงของเดิม) |
| 2 | `crew-taan-cyberhell-profile.png` | โปรไฟล์ตาน | ขาด | ไฟล์จากข้อ 1 ที่เพิ่ง gen เสร็จ |
| 3 | `crew-plerng-cyberhell.png` | ทัณฑ์เพลิง ชุดไซเบอร์ | ขาด | `img/crew-plerng.png` + `img/CyberHell/crew-nira-cyberhell.png` |
| 4 | `crew-plerng-cyberhell-profile.png` | โปรไฟล์เพลิง | ขาด | ไฟล์จากข้อ 3 |
| 5 | `crew-kan-cyberhell.png` | ทัณฑ์กานต์ ชุดไซเบอร์ | ขาด | `img/crew-kan.png` + `img/CyberHell/crew-nira-cyberhell.png` |
| 6 | `crew-kan-cyberhell-profile.png` | โปรไฟล์กานต์ | ขาด | ไฟล์จากข้อ 5 |
| 7 | `crew-boon-cyberhell.png` | ทัณฑ์บุญ ชุดไซเบอร์ | ขาด | `img/crew-boon.png` + `img/CyberHell/crew-nira-cyberhell.png` |
| 8 | `crew-boon-cyberhell-profile.png` | โปรไฟล์บุญ | ขาด | ไฟล์จากข้อ 7 |
| 9 | `crew-dam-cyberhell.png` | ทัณฑ์ดำ ชุดไซเบอร์ | ขาด | `img/crew-dam.png` + `img/CyberHell/crew-nira-cyberhell.png` |
| 10 | `crew-dam-cyberhell-profile.png` | โปรไฟล์ดำ | ขาด | ไฟล์จากข้อ 9 |
| 11 | `st-ngiw-cyberhell.png` | ดงต้นงิ้ว ชุดไซเบอร์ | ขาด | `img/st-ngiw.png` + `img/CyberHell/st-dab-cyberhell.png` (จับวัสดุ/โทนสีสถานีที่มีแล้ว) |
| 12 | `st-sala-cyberhell.png` | ⚠️ ดูหมายเหตุด้านล่างก่อน gen | ขาด | ดูหมายเหตุ |
| 13 | `hero-boss-cyberhell-profile.png` | ภาพหน้าใกล้บอสโซน 4 | ขาด (ถ้าจำเป็น — ดูหมายเหตุ) | `img/CyberHell/zone-boss-cyber.png` หรือไฟล์ "Boss Zone4" ที่มีอยู่แล้ว |

**ไม่ต้องทำ:** หัวหน้าที่มาแทนพ่อในโซน 4 (Minnie เสนอตัวเลือกอยู่ รอคุณเป้เลือก) ·
ท่าที่สองของยมทูตโซน 4 (work/atk/side) — โซน 3 เองก็ยังไม่มี ไม่ใช่ของที่บล็อกการเล่น

### ⚠️ หมายเหตุ #12 — ชื่อไฟล์ `st-sala-cyberhell` กับเนื้อหาไม่ตรงกัน
ใบงานเขียนกำกับว่า `st-sala-cyberhell (ศาลาน้ำชา)` แต่ใน `ASSET-PROMPTS.md` ชุดที่ 1 คำอธิบายของคีย์ `sala`
คือ **"หอทะเบียนกรรม" (โถงใหญ่ ใช้เก็บสำนวน)** ส่วน **"ศาลาน้ำชา" (ที่พักยมทูต/เติมกำลังใจ) คือคีย์ `tea`**
สองคีย์นี้เป็นคนละอาคารกันในเอกสารต้นทาง — เซสชันนี้เปิด `src/data.js` ดูไม่ได้ (ไม่มีเครื่องมือ)
จึงยืนยันไม่ได้ว่าคีย์ `sala` ในโค้ดจริงตอนนี้หมายถึงอาคารไหน

**สิ่งที่ทำไว้ให้:** เขียน prompt เนื้อหาแบบ "ศาลาน้ำชา" ตามคำกำกับในใบงาน (เชื่อว่า Claudy เห็นโค้ดจริงมา)
แต่แนบสลับไว้ให้ด้วยว่าถ้าจริง ๆ ต้องรีสกิน "หอทะเบียนกรรม" แทน ต้องเปลี่ยนอะไร — **ก่อน gen ชุดนี้
ให้เปิด `img/st-sala.png` ดูก่อน 1 ครั้ง**: ถ้าเห็นเป็นศาลาเล็กมีโคมกระดาษ = ตรงกับ "ศาลาน้ำชา" ใช้ prompt หลักได้เลย
ถ้าเห็นเป็นโถงใหญ่มีบันไดนาคประตูทอง = คือ "หอทะเบียนกรรม" ให้ใช้ prompt สำรองท้ายข้อ 12

### หมายเหตุ #13 — โปรไฟล์บอส เป็นของ "ทำถ้าจำเป็น" ไม่ใช่บังคับ
ใบงานเขียนว่า "ถ้ายังไม่มีภาพระยะใกล้แบบโซน 3" — เซสชันนี้ยืนยันไม่ได้ว่าโซน 3 (ปัจฉิม) มีไฟล์ boss profile
อยู่จริงหรือเปล่า (ไม่มีตัวอย่างในเอกสารที่อ่านได้) **ถ้าเปิดดู `img/West/` แล้วไม่เจอไฟล์ boss profile เลย
ให้ข้ามชิ้นนี้ไปก่อน** ไม่ใช่ของที่บล็อกอะไรในเกม — prompt เตรียมไว้ท้ายเอกสารเผื่อใช้

---

## 2) บล็อกสไตล์ที่ต้องแปะนำหน้าทุก prompt

### 2.1 บล็อกยมทูต/ตัวละคร (สำหรับข้อ 1–10)
```
top-down 3/4 isometric-ish view game asset, high-detail modern pixel art in the style of
a beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with cold rim light, rich saturated palette, clean crisp pixel edges,
single object centered on a fully transparent background, square canvas 1024x1024,
no ground shadow baked in, cute chibi proportions about 3 heads tall,
standing idle facing slightly toward the viewer, full body with feet visible at the bottom edge,
no text, no letters, no numbers, no watermark, no UI
COLOR THEME: Thai buddhist underworld fused with a corroded cyber-network hell — obsidian
black stone veined with exposed dark copper wiring, tangled black cables, cracked monitor
glass, static-glitch light, cold neon purple and electric blue glow replacing the molten
orange of the other zones, tarnished chrome instead of bright temple gold, faint dying
ember-orange only as a secondary accent
```

### 2.2 บล็อกอาคารสถานี (สำหรับข้อ 11–12)
```
top-down 3/4 view pixel art game asset, high-detail modern pixel art in the style of a
beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with cold rim light, clean crisp pixel edges, single structure centered on a fully
transparent background, square canvas 1024x1024, viewed from the same angle as a top-down
game map, no ground plate under it beyond its own footprint,
no text, no letters, no numbers, no watermark, no characters, no people, no creatures
COLOR THEME: Thai buddhist underworld fused with a corroded cyber-network hell — obsidian
black stone veined with exposed dark copper wiring, tangled black cables, cracked monitor
glass, static-glitch light, cold neon purple and electric blue glow replacing the molten
orange of the other zones, tarnished chrome instead of bright temple gold, faint dying
ember-orange only as a secondary accent — must read as the same world as the lava-network
map (BG-Lan) and the existing cyberhell stations (st-dab, st-krata, st-lokan)
```

### 2.3 บล็อกโปรไฟล์ (bust portrait) — ต่อท้ายบล็อก 2.1
```
close-up bust portrait crop, head and shoulders to waist, three-quarter view facing
slightly toward the viewer, same face, same identity, same outfit and same colors as the
reference image — change ONLY the framing/crop to a closer portrait shot, nothing else
```

### 2.4 กฎเหล็ก (ซ้ำจาก ASSET-PROMPTS.md — บังคับทุกชิ้น)
- ❌ ห้ามมีตัวอักษรในรูปทั้งไทย/อังกฤษ
- ❌ ห้าม gen เฟรมอนิเมชัน — 1 ท่านิ่ง 1 ไฟล์
- ✅ 1 ชิ้น = 1 ไฟล์ พื้นหลังใส (ยกเว้นบอสโปรไฟล์ที่เป็นภาพเต็มแบบ `hero-boss` เดิม) จัตุรัส มุมมองเดียวกันทั้งเกม
- ❌ ห้ามโลโก้/แบรนด์ · ห้ามล้อพระ/ศาสนา (ข้อ `crew-boon-cyberhell` ถือดอกบัว — ต้องยังดูสง่างามเคารพได้ ไม่ใช่สัญลักษณ์ที่ถูกบิดเบือนให้ดูขบขัน)

---

## 3) prompt พร้อมคัดลอก — ยมทูต 5 คน (ตัวเต็ม + โปรไฟล์)

**วิธีใช้ทุกตัว:** เปิดโหมดแก้ภาพ (edit / image-to-image) แนบไฟล์อ้างอิงตามตารางข้อ 1 แล้ววางบล็อก 2.1
นำหน้า ตามด้วย prompt ด้านล่าง gen ตัวเต็มก่อน ผ่านแล้วค่อยเอาไฟล์ที่ได้ไป gen โปรไฟล์ต่อ (แปะบล็อก 2.1 + 2.3
แนบไฟล์ตัวเต็มที่เพิ่งได้)

### `crew-taan-cyberhell`
สเปกต้องคงไว้ (จาก ASSET-PROMPTS.md): ยักษ์อ้วนล่ำ ผิวแดงเข้ม มวยผมสีเทา เขี้ยวล่างยื่น เปลือยอก
เกราะไหล่หนังข้างเดียว กระบองเหล็ก เท้าเปล่า สีหน้าเหนื่อยหงุดหงิด — เปลี่ยนแค่ชุด/อุปกรณ์เป็นธีมไซเบอร์นรก

```
Edit this image. Keep the exact same character identity as the reference: a stocky old
yaksha hell-guard, dark red skin, small lower tusks, grey topknot, bare chest, the same
face, body proportions and the same chibi head-to-body ratio as the reference.

Change ONLY his outfit and props to a CyberHell aesthetic: replace his worn bronze
single shoulder plate with a cracked chrome-and-obsidian shoulder plate that has exposed
dark wiring running out of the joints, replace the plain brown wrap-cloth and waist tie
with a dark tactical wrap threaded with thin glowing purple fiber-optic cords, keep him
resting a heavy club on his shoulder but resurface it as a corroded iron pipe wrapped in
sparking black cable with a small cracked monitor fragment embedded near the striking end,
add faint circuit-line markings glowing cold electric blue across both forearms, same
tired grumpy expression, same flat gold necklace (now slightly tarnished chrome), same
bare feet.

single figure centered on a fully transparent background, square canvas, full body with
feet visible at the bottom edge, no text, no letters, no numbers, no shadow baked in
```

### `crew-plerng-cyberhell`
สเปกต้องคงไว้: ชิบิผิวส้มแดง รอยแตกเรืองแสงที่แขน ผมเปลวไฟจริง ตาทอง ยิ้มเห็นเขี้ยว เท้าเปล่ามีเปลวไฟเล็ก ๆ

```
Edit this image. Keep the exact same character identity as the reference: an eager young
fire demon, bright orange-red skin, gold eyes, a cocky fanged grin, same face and the
same chibi head-to-body proportions as the reference.

Change ONLY his outfit and effects to a CyberHell aesthetic: his hair is still made of
living flame but the outer tips now flicker with glitching electric-blue static sparks
mixed into the orange fire, replace his minimal one-shoulder dark red wrap with a
scavenged cracked circuit-board chest plate over the same silhouette, keep the same
one-shoulder asymmetric cut and the dark purple trousers but thread thin glowing wires
along the seams, the glowing lava-crack lines on his arms now read as glowing
purple-and-blue circuit cracks instead of orange lava, the small flames at his bare feet
now spark with tiny electric arcs mixed into the fire, same bare feet.

single figure centered on a fully transparent background, square canvas, full body with
feet visible at the bottom edge, no text, no letters, no numbers, no shadow baked in
```

### `crew-kan-cyberhell`
สเปกต้องคงไว้: ผิวม่วงคราม ผมยาวมัดหลัง เสื้อคลุมเข้มขลิบทอง ถือเครื่องรางตาสีฟ้า สีหน้าครุ่นคิด

```
Edit this image. Keep the exact same character identity as the reference: a calm
scholarly demon, deep indigo skin, long dark hair tied back, a thoughtful quiet
expression, same face and the same chibi head-to-body proportions as the reference.

Change ONLY his outfit and prop to a CyberHell aesthetic: keep the same simple dark
robe silhouette but replace the gold trim with thin embedded fiber-optic piping that
glows cold blue along the seams and collar, replace the carved Thai amulet with a small
cracked circular device that blends an old amulet frame and a scan-screen, still showing
the same single glowing blue eye motif at its center now rendered like a HUD scanner
icon, add one thin cable running from behind his ear down to his collar like an earpiece,
same thoughtful hands-together holding pose.

single figure centered on a fully transparent background, square canvas, full body with
feet visible at the bottom edge, no text, no letters, no numbers, no shadow baked in
```

### `crew-boon-cyberhell`
สเปกต้องคงไว้: ผิวหยกอ่อน หน้ากลม เขาสั้น ชุดคลุมสีเหลืองอมน้ำตาลเรียบ ถือดอกบัวชมพู ยิ้มอ่อนโยนแฝงเศร้า
**ข้อควรระวัง:** ดอกบัวเป็นของประดับที่อนุมัติแล้วในโซน 1 — เวอร์ชันไซเบอร์ต้องยังดูสง่างามเคารพได้ ห้ามทำให้ดูขบขันหรือถูกบิดเบือน

```
Edit this image. Keep the exact same character identity as the reference: a gentle
demon monk-attendant, pale jade skin, a soft round face, small blunt horns, a serene
slightly sad smile, same face and the same chibi head-to-body proportions as the
reference.

Change ONLY his outfit and prop to a CyberHell aesthetic: keep the same plain
ochre wrap-robe silhouette but give the fabric a very subtle faint printed-circuit-board
texture woven into the cloth pattern (subtle, not loud), he is still holding a single
pink lotus flower with both hands exactly as before — keep the lotus itself dignified,
gentle and clearly a real flower silhouette, only add a few fine glowing thread-thin blue
lines along a couple of outer petal edges as if lit from within, nothing mocking or
distorted about the flower, same serene gentle holding pose.

single figure centered on a fully transparent background, square canvas, full body with
feet visible at the bottom edge, no text, no letters, no numbers, no shadow baked in
```

### `crew-dam-cyberhell`
สเปกต้องคงไว้: ชิบิอ้วนกลม ผิวเทาอมม่วง หูค้างคาวใหญ่ ปีกเล็ก เปลือยอก กางเกงขาสั้นดำมีแป๊ะปะ หิ้วถังถ่าน ตาปรือง่วง

```
Edit this image. Keep the exact same character identity as the reference: a small
scruffy bat-winged imp, charcoal-grey skin, oversized bat ears, small wings on the back,
bare chest, sleepy half-lidded eyes, same face and the same chibi head-to-body
proportions as the reference.

Change ONLY his outfit and prop to a CyberHell aesthetic: his patched black shorts now
have a few patches made of scavenged circuit-board scraps instead of plain cloth, thin
glowing blue vein-like circuit lines run along the membrane of his small wings, he is
still carrying a bucket with both hands but it now holds glowing blue-white e-waste
embers and a few broken chip fragments instead of plain coal, with a small cracked
screen fragment taped to the side of the bucket, same sleepy droopy expression.

single figure centered on a fully transparent background, square canvas, full body with
feet visible at the bottom edge, no text, no letters, no numbers, no shadow baked in
```

---

## 4) prompt พร้อมคัดลอก — สถานี 2 หลัง

### `st-ngiw-cyberhell` (ดงต้นงิ้ว)
สัดส่วนต้นทาง `st-ngiw`: **สูงกว่ากว้าง** — คงสัดส่วนนี้ไว้เสมอ (โค้ดวางอาคารยึดฐานกลางล่าง)

```
Edit this image. Keep the exact same layout, silhouette and proportions as the reference
— a grove of four tall crooked trees, taller than it is wide.

CHANGE ONLY the material and lighting to a CyberHell aesthetic: the trunks are now
corroded dark metal pylons instead of wood, the huge black iron spikes are now jagged
shards of broken monitor glass and twisted server-rack metal jutting out at the same
angles and density as the original spikes, the bare leafless branches are strung with
tangled black cables hanging like vines instead of bare twigs, the cracked glowing soil
around the roots now pulses with cold purple-blue light leaking from the cracks instead
of red, one trunk has a small dead cracked screen fragment embedded in it flickering
with faint static.

single structure centered on a fully transparent background, square canvas, no ground
plate under it beyond its own footprint, no text, no letters, no numbers, no characters
```

### `st-sala-cyberhell` — เนื้อหาหลัก: "ศาลาน้ำชา" ตามคำกำกับในใบงาน
สัดส่วนต้นทาง `st-tea` (ศาลาน้ำชา): **เกือบจัตุรัส**

```
Edit this image. Keep the exact same layout, silhouette and proportions as the reference
— a small cosy raised-deck rest pavilion, roughly square in overall shape.

CHANGE ONLY the material and lighting to a CyberHell aesthetic: the red clay tiled roof
is now corroded and patched with sheets of dark scrap metal, the gold trim and chofa
finial are now tarnished chrome etched with faint circuit-line patterns, the open wooden
sides and carved railings are still wood but cracked and reinforced with metal brackets
and a few loose cables, the two paper lanterns at the front corners are now replaced with
cracked flat monitor-panel lanterns glowing cold purple-blue static instead of warm
orange paper light, the raised wooden deck floor has faint pulsing blue circuit lines
running between the planks.

single structure centered on a fully transparent background, square canvas, no ground
plate under it beyond its own footprint, no text, no letters, no numbers, no characters
```

**⚠️ prompt สำรอง** — ใช้อันนี้แทนถ้าเปิด `img/st-sala.png` แล้วเจอว่าเป็น "หอทะเบียนกรรม" (โถงใหญ่ มีบันไดนาค
ประตูทอง) ไม่ใช่ศาลาเล็ก — สัดส่วนต้นทาง `st-sala` เดิม: **กว้างกว่าสูงเล็กน้อย**

```
Edit this image. Keep the exact same layout, silhouette and proportions as the reference
— a grand hall on a wide staircase, slightly wider than it is tall.

CHANGE ONLY the material and lighting to a CyberHell aesthetic: the deep red walls are
now dark server-rack panelling lined with exposed wiring, the gold window frames and
multi-tiered roof trim are now tarnished chrome etched with faint circuit patterns, the
naga staircase balustrades keep their exact carved shape but are now cast in corroded
dark metal with thin glowing purple light running along the carved grooves, the closed
gold double doors are now dark metal doors with a large cracked circular monitor
embedded at the center flickering with cold static instead of a gold emblem.

single structure centered on a fully transparent background, square canvas, no ground
plate under it beyond its own footprint, no text, no letters, no numbers, no characters
```

---

## 5) prompt เผื่อใช้ — บอสโซน 4 ระยะใกล้ (ทำเฉพาะถ้าจำเป็น ดูหมายเหตุ #13)

```
Edit this image. Keep the exact same character identity, colors and CyberHell design as
the reference full-body boss art — do not invent a new design.

Close-up bust portrait crop: head and upper torso only, three-quarter view, dramatic
tight framing that shows facial detail and the cyber-hell corruption details already on
him (cracked circuitry embedded in skin or armor, glowing purple-blue veins, tangled
cable accents around the shoulders and crown), same intense imposing expression, same
color identity as the full-body reference.

square canvas 1024x1024, painted scene style same as the existing full-body boss art —
not a transparent sprite, no text, no letters, no numbers, no watermark, no UI
```

---

## 6) สรุป Asset Spec แบบย่อ (ตามฟอร์แมตงานของ Mind)

1. **รายการชิ้นงาน** — ดูตารางข้อ 1 (13 ไฟล์: ยมทูต 5 คน×2 ท่า + สถานี 2 หลัง + บอสโปรไฟล์ 1 ไฟล์)
   ทุกชิ้นเติมช่องว่างของโซน 4 ให้ทัดเทียมโซน 1/3 ตามผังใน `src/data.js` (ยมทูตยืนประจำสถานี · ป้าย/หมุดบนแผนที่)
2. **ทิศทางสไตล์** — ต่อยอดจากบล็อกสไตล์เดิมของเกม (pixel art isometric แบบ Pokémon-overworld, เส้นคม
   เงาไล่โทนนุ่ม) เปลี่ยนแค่ COLOR THEME จากโทนลาวา/ทอง เป็น "นรกเครือข่าย" — ดำออบซิเดียนผสมสายไฟ/จอแตก/
   แสงม่วง-ฟ้าเรืองแสงแทนแสงส้มลาวา โครเมียมหมองแทนทองวัด รายละเอียดระดับเดียวกับของเดิม (ไม่เพิ่ม/ลดความซับซ้อน)
3. **จานสี** (หน้าจอ ใช้ hex อ้างอิงคร่าว ๆ เท่านั้น — งานนี้เป็น generative AI art ไม่ใช่ vector คุมสีเป๊ะ)
   - หลัก: ดำม่วงออบซิเดียน `#15101f`–`#1c1230`
   - เน้น: ม่วงนีออน `#8b3dff` / ฟ้าไฟฟ้า `#3dd6ff` (แทนส้มลาวาของโซนอื่น)
   - รอง: โครเมียมหมอง `#8a8f9a` (แทนทองวัด) · ส้มเอมเบอร์จาง ๆ เป็นจุดเน้นรอง ไม่ใช่สีหลัก
   - หมายเหตุวัฒนธรรม: ไม่มีศาสนาในชุดนี้นอกจากดอกบัวของ `crew-boon` — คุมให้ยังดูสง่างามตามที่ระบุในกฎเหล็ก
4. **การจับคู่ตัวอักษร** — ไม่เกี่ยวข้อง (สไปรท์เกมห้ามมีตัวอักษรในรูปทั้งหมด ตัวหนังสือทุกจุดโค้ดวาดทับเอง)
5. **หมายเหตุการผลิต**
   - gen ที่ 1024×1024 พื้นหลังใส (ยกเว้นบอสโปรไฟล์ = ภาพเต็มแบบ `hero-boss`)
   - เซฟชื่อไฟล์ตรงตามตารางข้อ 1 ลง `img/raw/CyberHell/<key>.png` (หรือวางตรง `img/CyberHell/` ก็ได้ สคริปต์ย้ายเอง)
   - รัน `python3 scripts/prep-art.py` — ตัดขอบใส/ลด palette/ย่อ 512 ให้อัตโนมัติ ไม่ต้องแก้โค้ด
   - เช็คตามลิสต์ท้าย `ASSET-PROMPTS.md` ก่อนส่งเข้าเกม: พื้นหลังใสจริง ไม่มีตัวอักษรหลุด มุมมองตรงกับชิ้นอื่น
     ขนาดสัมพัทธ์สมเหตุสมผล (ยมทูตต้องเล็กกว่าอาคารเสมอ)

---

## 7) สิ่งที่ยังต้องยืนยันจากคน/เอเจนต์ที่เข้าถึงไฟล์จริงได้ (ไม่ใช่ Mind รอบนี้)
- เปิด `img/st-sala.png` เทียบว่าตรงกับ prompt หลัก (ศาลาน้ำชา) หรือ prompt สำรอง (หอทะเบียนกรรม) — ข้อ 4
- เปิด `img/West/` เช็คว่ามีไฟล์ boss profile จริงไหม ก่อนสั่ง gen ข้อ 5
- ให้ Toby/Dale ไล่ diff `img/West/manifest` กับ `img/CyberHell/manifest` จริงอีกรอบ เผื่อมีชิ้นอื่นที่ข้อความ
  ในเอกสารไม่ได้พูดถึง (เซสชันนี้ไม่มีเครื่องมือ `ls`/`find` เปิดดูโฟลเดอร์ได้ตรง ๆ)
