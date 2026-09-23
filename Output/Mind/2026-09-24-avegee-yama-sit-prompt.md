# AVEGEE — Asset Spec: ยมน้อยท่านั่งพัก (`hero-yama-sit`)

**วันที่:** 24 ก.ย. 2569 · **ผู้ทำ:** Mind
**บริบท:** ต้องการจุดพักฟื้นในห้องศาลาน้ำชา (`img/raw/_BG-Tea.jpeg`) ให้ยมน้อยนั่งพักหลังโดนพ่อลงโทษ
**ไฟล์ปลายทางที่โค้ดรอ:** `img/hero-yama-sit.png`
**[skip-factcheck]** — งาน pure visual/prompt spec ไม่มี factual claim ต้องเช็ค

---

## 0. Source asset inventory (ก่อนเขียน prompt)

อ่านของจริงแล้ว ไม่ได้เดาไซส์/สไตล์:

| ไฟล์ | สิ่งที่พบ |
|---|---|
| `img/hero-yama.png` | สไปรท์ตัวละครหลัก จัตุรัส พื้นหลังใส ชิบิยืนตรง หันหน้าเข้ากล้องเล็กน้อย — **นี่คืออ้างอิงหน้าตา/ชุด/สัดส่วนที่ต้องล็อกเป๊ะ** |
| `img/hero-yama-profile.png` | เป็นภาพ **cover-art แบบมีฉากพื้นหลังลาวา/ภูเขา** ไม่ใช่สไปรท์พื้นใส — ใช้ดูเพื่อยืนยันหน้าตา/สีผิว/มงกุฎเท่านั้น **ห้ามเอาโทนแสง/พื้นหลังของภาพนี้มาปนกับสไปรท์** |
| `img/raw/_BG-Tea.jpeg` | ฉากศาลาน้ำชา มุมมอง isometric 3/4 จากบนลงล่าง เห็นเสื่อ/พรมสีแดง-ส้มทรงกลม-สี่เหลี่ยมเล็ก ๆ วางกระจายบนพื้นไม้ตรงจุดที่ตัวละคร NPC นั่งกินข้าว/เล่นดนตรี — **นี่คือลวดลายเสื่อที่ควรใช้อ้างอิง ไม่ใช่เสื่อฟางเปล่า ๆ** |
| `AVEGEE/ASSET-PROMPTS.md` | มี pattern ที่ใช้แล้วได้ผลจริงสำหรับ "ท่าที่สองของตัวละครเดิม" (ชุดที่ 4 และ 6.1 `hero-yama-atk`, `hero-yama-side`) — ต้องใช้ **โหมดแก้ภาพ (edit) แนบไฟล์อ้างอิงเสมอ** ไม่ gen จาก prompt เปล่า |

**ขนาดพิกเซลจริง:** สไปรท์ตัวละครทั้งหมดในเกมนี้ผ่าน `scripts/prep-art.py` ซึ่ง **จัดขนาดสุดท้ายเป็น 512×512 px** พื้นหลังใส (ดูหมายเหตุ 5 ก.ย. ในไฟล์ ASSET-PROMPTS.md) — `hero-yama.png` เป็น 512×512 → `hero-yama-sit.png` ต้องออกมาไซส์เดียวกันเพื่อวางแทนที่/สลับกันได้ทันที

---

## 1. Asset list

| Asset | Purpose | ตำแหน่งในฉาก |
|---|---|---|
| `hero-yama-sit.png` | ยมน้อยนั่งพักฟื้น ถือถ้วยชา — โผล่แทนสไปรท์ยืนตอนเข้าจุดพักในศาลาน้ำชา | overlay สไปรท์เดี่ยว วางทับบนเสื่อจุดใดจุดหนึ่งในฉาก `_BG-Tea.jpeg` (โค้ดกำหนดพิกัด x,y เอง เหมือนสไปรท์ตัวอื่น) |

ชิ้นเดียว ไม่ใช่ชุด — ตาม scope งานที่ขอ (1 ภาพ) + เสนอ variant ที่ 2 แยกไว้ท้ายเอกสาร ให้เลือกใช้แทนหรือเก็บสำรอง

---

## 2. Style direction (concrete พอให้ AI/คนวาดคนไหนก็ได้ผลตรงกัน)

**ใช้โหมดแก้ภาพ (image edit) แนบ `img/hero-yama.png` เป็นภาพอ้างอิงเสมอ — ห้าม gen จาก prompt เปล่า**
เหตุผล: บทเรียนจากชุดที่ 4 — gen จาก prompt เปล่าได้ตัวละครหน้าตา/สัดส่วน/ชุดคนละตัว ใช้ไม่ได้

- เส้นขอบ (outline weight): เท่ากับ `hero-yama.png` เป๊ะ — เส้นบาง ไม่หนาแบบการ์ตูน
- Shading: pixel art dithered แบบเดียวกับสไปรท์อื่นทั้งเกม (soft dithered shading, warm rim light)
- ระดับรายละเอียด: เท่าสไปรท์ตัวละครอื่น ไม่ใช่ระดับ cover-art ของ `hero-yama-profile.png`
- มุมกล้อง: top-down 3/4 isometric-ish เดียวกับสไปรท์ยืนและเดียวกับฉาก `_BG-Tea.jpeg` — **นั่งหันหน้าเฉียงเข้ากล้องเล็กน้อย ไม่ใช่นั่งด้านข้างเต็มโปรไฟล์**
- อารมณ์: เหนื่อยแต่สงบ ผ่อนคลาย ได้พัก — **ห้ามมีบาดแผล/เลือด/รอยฟกช้ำใด ๆ ในภาพ** (โทนเรื่องคือ "โดนลงโทษมาแล้ว" ไม่ใช่ "กำลังเจ็บ" — โชว์ผลลัพธ์ทางอารมณ์ ไม่โชว์ความรุนแรง ตรงตาม mood เกมที่ระบุไว้ในพรอมป์หน้าปก "not gory, not evil")

### Prompt หลัก (พร้อมใช้)

```
Edit this image. Use img/hero-yama.png as the reference image.

Keep the exact same character, same outfit, same colors and the same chibi
head-to-body proportions as the reference image — change ONLY the pose.

NEW POSE — resting after his punishment: he is now SITTING cross-legged on a
small round woven mat on a wooden deck floor, spine slightly slumped forward
with tiredness, head tilted gently down, eyes half-lowered but calm — worn
out and relieved to finally rest, NOT crying, NOT injured, no visible wounds,
no blood, no bruises. Both hands are wrapped around a small plain unglazed
clay tea cup held close to his chest, as if about to take a sip. A single
thin wisp of steam rises from the cup, drawn as part of this same static
image (not a separate effect).

The mat he sits on is a small round Thai woven floor mat with a warm
red-orange tone and a faint gold-trimmed edge, matching the mats already
used on the tea pavilion's deck — plain pattern, no text, no writing on it.

Keep exactly as in the reference: his tall pointed gold Thai mongkut crown,
his dark navy-black long robe with the blood-red front panel and thin gold
trim, his small blunt horns, pointed ears, dark red skin, and bare feet —
now tucked to one side beneath him. No cape, no armor plates, no full-body
gold ornament. Same outline weight, same palette, same lighting style as
the reference image.

Camera: same top-down 3/4 isometric-ish angle as the reference and as the
rest of the game's sprites — he is seated facing slightly toward the viewer,
not turned to a full side profile.

Single figure centered on a fully transparent background, square canvas,
whole seated figure and mat visible, with the base of the mat flush with
the bottom edge of the canvas (same ground line as the standing sprite),
no cast shadow baked in, no other scenery, no ground plate beyond the mat's
own footprint.

No text, no letters, no numbers, no watermark, no UI.
```

**ข้อควรระวัง / negative เพิ่มเติมถ้าผลออกมาไม่ตรง:**
- ถ้า AI วาดชุดคลุม/มงกุฎเพี้ยนไป (เช่น มงกุฎสั้นลง เสื้อเปลี่ยนสี) → gen ใหม่ อย่าใช้ ตามกฎเหล็กของชุดที่ 4
- ถ้าได้ถ้วยชาใหญ่เกิน/มีกาน้ำชาลอยมาด้วย → ตัดออก ระบุเพิ่ม `no teapot, only a single small cup`
- ถ้าท่านั่งออกมาเป็นโปรไฟล์เต็มข้าง (หันข้างล้วน) → ระบุเพิ่ม `at least 60% of the face must remain visible to the viewer`
- ถ้าเผลอมีเลือด/รอยแผล → gen ใหม่ทันที ห้ามใช้ ตรงข้ามกับโทนเกม

---

## 3. Color palette

Asset นี้เป็นสไปรท์เกม (หน้าจอ, ไม่พิมพ์) — ใช้ **hex** ตามพาเลตที่มีอยู่แล้วในตัวละคร ไม่ต้องคิดใหม่ เพราะภาพนี้คือ "ท่าเดียวกัน สีเดียวกัน" ของ `hero-yama.png`:

| Role | สี (โดยประมาณจากสไปรท์เดิม) | หมายเหตุ |
|---|---|---|
| Dominant (ผิว/ตัวละคร) | ผิวแดงอมน้ำตาล (~#B5443A ช่วง) | คงเดิมจากไฟล์อ้างอิง ห้ามเปลี่ยนโทน |
| Accent (มงกุฎ/ขลิบทอง) | ทองเก่าโบราณ (~#D9A441 ช่วง) | คงเดิม |
| Robe base | กรม-ดำ (~#1B1B2E ช่วง) + แผงอกแดงเลือดหมู (~#7A1F2B ช่วง) | คงเดิม |
| ใหม่ในภาพนี้ — เสื่อ | แดง-ส้มอุ่น ให้เข้ากับเสื่อในฉาก `_BG-Tea.jpeg` (~#C0552E ถึง #E08A3D) ขลิบทองบาง | ต้องกลืนกับโทนฉากศาลาน้ำชา ไม่ใช่สีสุ่มใหม่ |
| ใหม่ในภาพนี้ — ถ้วยชา | ดินเผาไม่เคลือบ สีน้ำตาลอ่อนหม่น (~#8A6A4E) | เรียบ ไม่มีลาย ไม่มีตัวหนังสือ |

**Cultural color note:** ไม่มีองค์ประกอบทางศาสนา/พิธีในภาพนี้ (ไม่ใช่ Buddhist iconography) — ไม่มีข้อกังวลเรื่องสีไว้ทุกข์/สีมงคลปน เพราะเป็นฉากพักผ่อนของตัวละครเกม ไม่ใช่งานพิมพ์พิธีการ

Print-contrast check: ไม่เกี่ยว (asset นี้เป็นสไปรท์โปร่งใสบนพื้นเกม ไม่ใช่งานพิมพ์ที่มีข้อความทับ)

---

## 4. Typography pairing

ไม่เกี่ยวกับ asset นี้ — **กฎเหล็กของเกมคือห้ามมีตัวอักษรในรูปทุกชิ้น** ป้าย/ข้อความใด ๆ (ถ้ามีในอนาคต เช่น ป้าย "จุดพัก") โค้ดวาดทับเองเสมอ ไม่ gen ติดมาในภาพ

---

## 5. Production notes

- **ขนาดที่ต้อง gen:** อย่างน้อย 1024×1024 px (ให้มีรายละเอียดพอ) แล้วเซฟ raw ไว้ที่ `img/raw/hero-yama-sit.png`
- **หลัง gen:** รัน `python3 scripts/prep-art.py` ตามขั้นตอนมาตรฐานของโปรเจกต์ — สคริปต์จะตัดขอบใส จัดขนาดลงเหลือ **512×512 px** (เท่า `hero-yama.png`) และลด palette ให้เข้าชุดกับสไปรท์อื่น
- **Transparency:** ต้องเป็น alpha จริง (ไม่ใช่พื้นขาว/เช็กเกอร์บอร์ดที่โปรแกรม gen บางตัวใส่มาให้ดูเฉย ๆ)
- **Format:** PNG
- **Margin/ground line:** ฐานเสื่อต้องชิดขอบล่างของ canvas เหมือนสไปรท์ยืนตัวอื่น เพื่อให้โค้ดวางตำแหน่งบนพื้นฉากได้ระดับเดียวกัน ไม่ต้องปรับ offset ในโค้ด
- **ไม่ต้องแก้โค้ด** — ทำตาม pattern เดิมของชุดที่ 4/6: ดรอปไฟล์ที่ `img/hero-yama-sit.png` แล้วรีเฟรชหน้าเกม (ถ้าจุดเรียกใช้ยังไม่มีในโค้ด ให้แจ้ง Dale/Toby เพิ่ม 1 บรรทัดเรียกไฟล์นี้ตอนเข้าเงื่อนไข "จุดพักในศาลาน้ำชา")

---

## 6. Variant ที่ 2 (เสนอเพิ่ม สั้น ๆ)

`hero-yama-sit-sip` — ท่าเดียวกันทุกอย่าง แต่ **หลับตาสนิท** ขณะจิบชา ยกถ้วยแตะริมฝีปากเบา ๆ มุมปากยกขึ้นเล็กน้อยเป็นรอยยิ้มจาง ๆ (ไม่ใช่ยิ้มกว้าง) ให้ความรู้สึก "ได้พักจริง ๆ สักครู่" ต่างจากตัวหลักที่ตายังลืมมองอะไรบางอย่างอยู่ — ใช้สลับได้เผื่อโค้ดอยากมีอนิเมชันสลับสองท่านิ่ง (ยังนับเป็น static 2 ไฟล์ ไม่ใช่เฟรมอนิเมชัน ตามกฎเดิม)

---

## Self-check (SOP-10 §3)

- [x] สำรวจ source asset จริงก่อนเขียน prompt (`hero-yama.png`, `hero-yama-profile.png`, `_BG-Tea.jpeg`, `ASSET-PROMPTS.md`)
- [x] ใช้ asset จริงเป็นอ้างอิง (edit-mode แนบไฟล์) ไม่ได้เดาหน้าตาตัวละครใหม่
- [x] ล็อกขนาดจริงจากไฟล์ต้นทาง/pipeline ที่มีอยู่ (512×512 ตาม prep-art.py) ไม่ได้เดาตัวเลข
- [x] ไม่มีองค์ประกอบทางศาสนา/พุทธศิลป์ในภาพนี้ — ไม่เข้าเงื่อนไขต้องเช็คกับ Reese
- [x] สีกำหนดเป็น hex (งานหน้าจอ/เกม) พร้อม usage role
- [x] Production notes ครบ: resolution, transparency, format, margin/ground line
- [x] ไม่ต้องยกระดับไป Figma/Canva — เป็นสไปรท์เกม 2D ไม่ใช่ไฟล์พิมพ์
