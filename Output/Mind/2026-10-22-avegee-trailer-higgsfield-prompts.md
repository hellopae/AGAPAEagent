# AVEGEE: CEO of Hell — Trailer · Higgsfield Prompt Pack V1

ผู้ทำ: Mind · วันที่: 22 ต.ค. 2569 · ใบงาน: `Output/Claudy/briefs/2026-10-22-avegee-trailer.md` ขั้นที่ 3
อินพุต: `Output/Vera/2026-10-22-avegee-trailer-shotlist.md` (หัวข้อ 5) · `Output/Rae/2026-10-22-avegee-trailer-script.md` · รูปแบบ prompt อิง `AVEGEE/docs/yama-intro-animation-higgsfield-2026-10-08.json`
Repo เกม (อ่านอย่างเดียว ไม่มีไฟล์ถูกแก้): `/Users/agapae/Documents/Work PAE/Claude/AVEGEE/` — path `img/...` อยู่ใต้ root นี้

---

## 0. สรุป

| รายการ | ค่า |
|---|---|
| จำนวน prompt | **6 คลิป** (ตรงกับ Vera) · เผื่อรีโรลได้อีก 2 ครั้งภายใต้เพดาน 8 คลิป |
| Start image ที่ใช้ | `intro-panel-01-v2.webp` · `intro-panel-02-v2.webp` · `intro-panel-05-v2.webp` (3 ไฟล์) + เฟรมสุดท้ายที่ export เอง 2 เฟรม (จากคลิป 02 และ 19) |
| End image | ไม่ใช้ทั้ง 6 คลิป (ตามตาราง Vera 5.1) |
| ความยาวที่ขอรวม | 5 + 6 + 5 + 5 + 4 + 5 = **30 วินาที** ของคลิป (ใช้บนไทม์ไลน์ 27.8 วินาที) |
| ลำดับผลิตที่แนะนำ | pre-flight อัปโหลด 3 ภาพ → **02 → 19 → 01 → 20 → 04 → 05** |
| ตัดได้ถ้าเครดิตไม่พอ | **05 → 04 → 20** (ตามลำดับ) · ห้ามตัด 01 / 02 / 19 · สำรองฟรีของแต่ละช็อตอยู่ในตาราง 4.2 |
| เครดิตต่อคลิป | **ว่างไว้ให้คุณเป้กรอก (หัวข้อ 5)** ไม่มีการเดาราคา |

**สิ่งที่ต้องรู้ก่อนเริ่ม (ซื่อตรงตามจริง):**
1. ไฟล์ตัวอย่าง `yama-intro-animation-higgsfield-2026-10-08.json` มีสถานะ `blocked_by_connected_account_plan` **ไม่เคยได้วิดีโอออกมาจริง** — รูปแบบ prompt (ย่อหน้าเดียว มีช่วงเวลา "0-2 seconds:" และประโยคล็อกสไตล์ท้าย) ยึดจากไฟล์นั้น แต่ยังไม่มีหลักฐานว่าโมเดลทำตามได้ดีแค่ไหน ถือรอบแรกเป็นรอบทดสอบ
2. ไฟล์เดียวกันบันทึกว่าภาพที่อัปโหลดเคยถูกระบบ Higgsfield แท็ก **nsfw** ทั้งที่เป็นตัวละครแต่งกายครบ → ดูข้อ 1.2 (ภาพพญายมในแผง 02 ไม่สวมเสื้อท่อนบน มีเครื่องประดับทอง เสี่ยงโดนแท็ก)
3. ภาพ start ที่เปิดดูจริงแล้วครบทั้ง 3 ไฟล์ (ไม่เดาจากชื่อไฟล์) — รายละเอียดตัวละครในหัวข้อ 2 มาจากภาพจริง ไม่ใช่จากข้อความล้วน

---

## 1. Pre-flight

### 1.1 ไฟล์ต้นทาง (เปิดดูจริงแล้ว)

| ช็อต | start image | ขนาดที่เห็น | เห็นอะไร (สรุปที่ใช้เขียน prompt) |
|---|---|---|---|
| 01 | `img/intro-panel-01-v2.webp` | ≈ 1376×768 | อเวจีมุมสูง แท่นหินพิพากษากลางภาพ กองแฟ้มรอบแท่น ยามาเล็กกลางแท่น ถือแฟ้ม · นิราถือกองแฟ้มข้างบันไดขวา · ยักษ์เทาแดงถือกระบองวางบนไหล่ขวาสุด · วิญญาณโปร่งแสงสีฟ้าซีดเรียงแถวบนสะพานไม้จากมุมซ้ายบนลงมาที่แท่น · ลาวาไหลรอบ คบไฟ |
| 02 | `img/intro-panel-02-v2.webp` | ≈ 1672×941 | ห้องบัลลังก์ ภูเขาไฟปะทุเป็นฉากหลัง ยักษ์หินสองข้างจอ พญายม (ผิวแดงเข้ม มงกุฎดำทอง ไม่สวมเสื้อท่อนบน เครื่องประดับทอง ผ้านุ่งดำลายทอง) ยื่นตราทองเล็กทรงระฆังมีด้ามจับลงเหนือฝ่ามือยามา · ยามาเท้าเปล่า |
| 05 | `img/intro-panel-05-v2.webp` | ≈ 1376×768 | ยามากลางภาพ ชุดคลุมยาวดำ-ทอง แผงกลางแดง ปกคอทอง รองเท้าแตะทอง ถือตราชั่งทองเรืองแสง (ถาดซ้าย = กองกระดาษ, ถาดขวา = ถ่านดำ) · พญายมเป็นเงามืดสูงใหญ่ยืนหลัง ใบหน้าอยู่ในเงา · ยักษ์หินสองข้าง กระทะลาวาขวาบน |

**ห้ามใช้เป็น start image:** `intro-panel-0N.png` (รุ่นแรก ไม่ใช่ 16:9) · `cover-v5.webp` (ภาพแขวนคอ/กะโหลก) · `intro-panel-04-v2.webp` (ดาบเปื้อนเลือด) · `story-ending-*` (สปอยล์)

### 1.2 ก่อนใช้เครดิต (ฟรี ทำก่อนเสมอ)

1. **อัปโหลดทั้ง 3 ภาพก่อน (01, 02, 05) แล้วดูว่าถูกแท็ก nsfw หรือไม่** ถ้าโดนแท็ก **ห้ามหาทางเลี่ยงระบบกรอง** (ครอป/ปรับภาพให้หลุด) — หยุดแล้วแจ้ง Claudy ใช้ตัวสำรองฟรีของช็อตนั้น (ตาราง 4.2) ภาพที่เสี่ยงที่สุดคือ 02 (ดังนั้นช็อต 02 และ 04 ต้องมีแผนสำรองเสมอ)
2. ไฟล์ต้นทางเป็น `.webp` — ถ้าแอปไม่รับ ให้แปลง**สำเนา**เป็น PNG แบบไม่สูญเสีย **ห้าม resize/upscale** (Vera สั่ง) อย่าแก้ไฟล์ใน repo เกม
3. ภาพ 01 และ 05 กว้าง 1376×768 (อัตราส่วน ≈ 1.79 เทียบ 16:9 = 1.78) โมเดลอาจครอปขอบเสี้ยวหนึ่ง ไม่กระทบการ์ดข้อความ
4. ตั้งค่าเดียวกันทุกคลิป (โมเดล/ความละเอียด/ไม่มีเสียง) เพื่อให้สไตล์คลิปต่อกันได้ — ค่าตั้งต้นตามไฟล์ตัวอย่างคือ `seedance_2_5`, `aspect_ratio 16:9`, `resolution 720p`, `generate_audio false` · **ต้องยืนยันในแอป:** โมเดลนี้ยังเลือกได้ไหม · รองรับ 4/5/6 วินาทีไหม (ไฟล์ตัวอย่างใช้ 10 วินาที) · โหมด `omni_reference` รับ start image อย่างเดียวได้ไหม (ถ้าไม่ได้ ใช้โหมด image-to-video / start frame ปกติ)
5. **เรื่องความละเอียด 720p:** ช็อต 05 Vera ให้ครอป 70% แล้วดึงออก = ครอปจากคลิป 720p ≈ 896 px กว้าง ขยาย ≈ 2.1 เท่าบนจอ 1080p จะนุ่ม · ทางเลือก: (ก) ถ้าแอปมี 1080p ในราคาที่รับได้ ใช้ 1080p เฉพาะคลิป 05 (ข) ลดครอปเริ่มต้นเป็น 82–85% (ค) ใช้เวอร์ชันตัดต่อในหัวข้อ 5.2 ของ Vera (ฟรี) — คุณเป้/Vera ตัดสิน ไม่กระทบตัว prompt

---

## 2. บล็อกกลาง (ล็อกตัวละครและสไตล์ — ใช้ซ้ำทุกคลิป)

### 2.1 Character lock (เขียนจากภาพจริง ใช้คำนี้เมื่อต้องกล่าวถึงตัวละคร ห้ามสร้างตัวใหม่จากข้อความ)

| ตัวละคร | คำบรรยายที่ใช้ใน prompt | หมายเหตุจากภาพ |
|---|---|---|
| ยามา (Yama) | "the small red-skinned young demon Yama, tall gold Thai crown with a pointed top, two small red horns, short black hair, black robe with gold trim and a red center panel" | **02:** เท้าเปล่า · **05:** รองเท้าแตะทอง ปกคอทอง ชุดยาวกว่า — **ห้ามสลับคำเรื่องเท้า/รองเท้าข้ามช็อต ใช้ตามภาพของช็อตนั้น** · ห้ามเปลี่ยนชุด สีผิว มงกุฎ เขา |
| พ่อ (พญายม) | "the tall dark-red-skinned king in a black-and-gold crown, gold collar and armbands, black skirt with gold pattern" (02) · "the huge dark-red king standing as a motionless shadowy silhouette, face in shadow" (05) | ในกล่อง prompt ใช้คำว่า "the king" ไม่ใช้ชื่อ "Yama" กับพ่อ กันโมเดลสับสนกับยามา · 05 ใบหน้าอยู่ในเงา คงไว้ |
| นิรา (Nira) | "the silver-haired lilac-skinned clerk Nira holding a stack of files, black robe with a red front panel" | ใช้ในช็อต 01 และ 05 เท่านั้น |
| ยักษ์ถือกระบอง | "the stout tusked gray-haired cudgel bearer, bronze armor, spiked club resting on his shoulder" | ต้องนิ่ง ห้ามเหวี่ยงกระบอง |
| วิญญาณ | "translucent pale-blue souls" | แถวสงบ เป็นระเบียบ ไม่ทุกข์ทรมาน |

คำศัพท์: ในเกมเรียก "สถานีลงทัณฑ์ / punishment station" — ไม่มีสถานีลงทัณฑ์เป็นจุดเด่นในคลิป AI ชุดนี้ (อาคารในแผง 01 เป็นฉากหลังนิ่ง)

### 2.2 Style tail (ประโยคปิดท้ายทุก prompt — ตามแนวไฟล์ตัวอย่าง)

> Preserve the crisp 2D pixel-art style, palette, lighting, exact character designs, character counts and costume silhouettes of the start image; no 3D or realistic makeover, no painterly smoothing, no new characters, no text, logos, menus or subtitles, no cuts, crossfades, flashes or camera shake.

### 2.3 Negative / ข้อห้ามกลาง (ใส่ในช่อง negative ถ้าโมเดลมี · ถ้าไม่มี ประโยค Style tail ครอบคลุมแล้ว)

`3D render, realistic, photorealistic, painterly, anime redraw, smooth blur, morphing, melting, extra characters, duplicated characters, extra limbs, changed costume, changed crown, changed skin color, text, letters, logo, watermark, UI, subtitles, camera shake, zoom, whip pan, scene cut, crossfade, flash, blood, gore, injury, weapon swinging, fire burst on characters`

### 2.4 กล้อง — ข้อตัดสินใจของ Mind

ทุกคลิป prompt สั่ง **กล้องนิ่ง (locked-off)** แล้วให้ Vera/ตัดต่อทำ push-in ตามตัวเลขในตาราง shot list (100→106%, 100→108% ฯลฯ) เพราะ (1) โมเดล image-to-video มักซูมเกินสั่ง ทำให้ตราชั่งหลุดแถบการ์ด (ช็อต 19 จำกัด ≤ 106%) (2) การซูมในตัดต่อฟรีและคุมได้แม่นกับบีต (3) องค์ประกอบภาพที่ Vera วางการ์ดไว้ไม่เลื่อน

---

## 3. Prompt ทีละช็อต

พารามิเตอร์ที่ใช้ร่วมกัน (ค่าตั้งต้น ปรับตามที่ยืนยันในแอป): `model seedance_2_5 · aspect_ratio 16:9 · resolution 720p · generate_audio false · mode omni_reference (หรือ image-to-video) · medias: [{role: start_image, value: <upload id>}]` — ช่อง `<upload id>` ได้หลังอัปโหลดในแอป

---

### AI-2 · ช็อต 02 · พญายมมอบตรา · **P1** · ผลิตเป็นคลิปแรก

| ฟิลด์ | ค่า |
|---|---|
| ใช้บนไทม์ไลน์ | 5.0–10.5 (+ ช็อต 03 เฟรมค้าง 10.5–12.0) |
| start image | `img/intro-panel-02-v2.webp` |
| end image | ไม่มี |
| ความยาวที่ขอ | **6 วินาที** (ถ้าโมเดลให้แค่ 5: ใช้เฟรมค้างต่อท้าย 0.5 วินาทีตาม Vera) |
| aspect | 16:9 |
| เครดิตต่อคลิป | `[ ____ ]` (คุณเป้กรอก) |

**Prompt**
```
One continuous 6-second game cinematic, animating the supplied pixel-art image exactly as drawn. The camera is completely locked off: no zoom, pan or tilt. The tall dark-red-skinned king in a black-and-gold crown, gold collar and armbands and black skirt with gold pattern stands stern and controlled. 0-1.5 seconds: he slowly lowers a small golden handheld seal with a round knob and a wider base from his raised hand toward the open palm of the small red-skinned young demon Yama, who wears a tall gold Thai crown with a pointed top, two small red horns, short black hair, a black robe with gold trim and a red center panel, and bare feet. Yama watches the seal with an anxious but determined expression, then lifts his eyes to his father's face. At about 1.5 seconds the seal settles onto Yama's palm with a soft golden glint. 1.5-3 seconds: Yama's small fingers curl slightly to steady the seal, which stays clearly visible on his palm; the king withdraws his hand and lets his arm rest at his side, expression unchanged and stern, no smile. 3-6 seconds: both stand quietly facing each other, only breathing, one slow blink from Yama, a slight sway of cloth edges. Throughout: embers and ash drift slowly upward, the lava glows and shimmers in the polished floor reflections, the brazier flames flicker; the two stone guardian statues, the stairs and the empty throne stay perfectly still. There is exactly one seal and it keeps the same shape, size and gold colour. Preserve the crisp 2D pixel-art style, palette, lighting, exact character designs, character counts and costume silhouettes of the start image; no 3D or realistic makeover, no painterly smoothing, no new characters, no text, logos, menus or subtitles, no cuts, crossfades, flashes or camera shake.
```

**Negative / ข้อห้ามการเคลื่อนไหว (เพิ่มจาก 2.3):** ตราเปลี่ยนรูปทรง/หายไป/กลายเป็นสองชิ้น · ลำแสงพุ่งออกจากตรา · พญายมยิ้ม หรือยามาหัวเราะ · ยามาเปลี่ยนชุด มงกุฎ เขา · กล้องขยับ · พญายมก้าวถอย/หันหลัง (คลิปนี้ยังไม่ออกจากเฟรม — ช็อต 04 ทำต่อ)

**ตรวจรับคลิป:** (1) ตราชิ้นเดียวทรงเดิมตลอด (2) ตราแตะฝ่ามือประมาณวินาทีที่ 1.5 (ตรงเสียง "ติ๊ง" ที่ 6.5 ของไทม์ไลน์) (3) เฟรมสุดท้าย: ยามาถือตราอยู่บนฝ่ามือเห็นชัด · พ่อแขนลงข้างตัว สีหน้าเข้ม · ใบหน้าพ่อชัดพอสำหรับช็อต 03 push-in (4) ชุดยามาไม่เปลี่ยน
**ถ้าตราเพี้ยน:** รีโรลโดยเพิ่ม "the seal never changes shape, never glows brighter than the start image" · ถ้าสองรอบแล้วยังเพี้ยน → ใช้สำรองฟรี (Ken Burns จากภาพนิ่ง + ประกายถ่านในตัดต่อ)
**สำคัญ:** export เฟรมสุดท้ายของคลิปที่ผ่านแล้วเป็น PNG ไม่สูญเสียเก็บไว้ — เป็น start image ของช็อต 04 และเฟรมค้างช็อต 03

---

### AI-5 · ช็อต 19 · ตราชั่ง · **P1**

| ฟิลด์ | ค่า |
|---|---|
| ใช้บนไทม์ไลน์ | 45.0–50.0 |
| start image | `img/intro-panel-05-v2.webp` |
| end image | ไม่มี |
| ความยาวที่ขอ | **5 วินาที** |
| aspect | 16:9 |
| เครดิตต่อคลิป | `[ ____ ]` (คุณเป้กรอก) |

**Prompt**
```
One continuous 5-second climactic game cinematic, animating the supplied pixel-art image exactly as drawn. The camera is completely locked off: no zoom, pan or tilt (a slow push-in is added later in editing). In the foreground the small red-skinned young demon Yama, wearing a tall gold Thai crown with a pointed top, two small red horns, a long black robe with gold trim, red center panel and gold collar, and gold sandals, stands upright and firm, holding up a glowing golden balance scale between his open palms: the left pan holds a small stack of case papers, the right pan holds a dark glowing ember. Behind him the huge dark-red king stands as a motionless shadowy silhouette, face in shadow, fists at his sides, not moving at all. 0-4.5 seconds: the beam of the scale rocks gently left and right about 4 degrees, swinging slowly and settling a little more with each swing, the pans swaying with it, the golden glow pulsing softly. 4.5-5 seconds: the beam comes to rest perfectly level and completely still. Yama keeps a serious, resolute expression, only a slow breath. Lava falls and flows slowly in the background, the molten cauldron at the upper right shimmers, the brazier flames flicker, embers and sparks drift slowly upward; the two stone guardian statues and the stairs stay perfectly still. The papers and the ember stay in their pans the whole time; nothing drops or spills. Preserve the crisp 2D pixel-art style, palette, lighting, exact character designs, character counts and costume silhouettes of the start image; no 3D or realistic makeover, no painterly smoothing, no new characters, no text, logos, menus or subtitles, no cuts, crossfades, flashes or camera shake.
```

**Negative / ข้อห้ามการเคลื่อนไหว (เพิ่มจาก 2.3):** ตราชั่งหลุดมือ/ลอยออก/หักเอียงเกิน 5° · กระดาษหรือถ่านตกหรือหก · เปลวไฟพุ่งใส่ตัวละคร · พญายมขยับ/หันหน้า/ออกจากเงา · ยามาก้าวเดิน เปลี่ยนท่า · แสงวาบเต็มจอ · กล้องซูมเข้า (ซูมในตัดต่อไม่เกิน 106%)

**ตรวจรับคลิป:** (1) ตราชั่งอยู่ในมือยามาตลอด ของในถาดไม่เปลี่ยน (2) เอียงซ้าย-ขวาค่อย ๆ ลดและนิ่งระดับ **ก่อนวินาทีสุดท้าย** (ตรงระฆังที่ 50.0) (3) พญายมนิ่งเป็นเงา ใบหน้าไม่ถูกเปิดเผย (4) ชุดยามาไม่เปลี่ยน
**ข้อสังเกตเชิงวัฒนธรรม:** ตราชั่งในคลิปเป็นสัญลักษณ์ "ความยุติธรรมของผู้ตัดสิน" ตามภาพแผงนี้ ไม่มีคำใน prompt ที่อ้างหลักพุทธ/การชั่งบุญบาป — prompt เรียกของในถาดว่า "case papers" และ "dark ember" เท่านั้น (Reese ตรวจต่อในขั้นที่ 4)
**สำคัญ:** export เฟรมสุดท้าย (ระดับนิ่งที่สุดของ 4.5–5.0 วินาที) เป็น PNG ไม่สูญเสีย เป็น start image ช็อต 20 · ถ้าเฟรมสุดท้ายยังเอียงอยู่ ให้เลือกเฟรมที่ระดับที่สุดใน 0.3 วินาทีสุดท้าย

---

### AI-1 · ช็อต 01 · Hook อเวจี · **P1**

| ฟิลด์ | ค่า |
|---|---|
| ใช้บนไทม์ไลน์ | 0.0–5.0 |
| start image | `img/intro-panel-01-v2.webp` |
| end image | ไม่มี |
| ความยาวที่ขอ | **5 วินาที** |
| aspect | 16:9 |
| เครดิตต่อคลิป | `[ ____ ]` (คุณเป้กรอก) |

**Prompt**
```
One continuous 5-second cinematic establishing shot, animating the supplied pixel-art image of the underworld judgment platform exactly as drawn. The camera is completely locked off: no zoom, pan or tilt (a slow push-in is added later in editing). Motion comes only from the world: the long queue of translucent pale-blue souls shuffles slowly and calmly forward in single file along the wooden bridge from the upper left toward the central stone platform, small steady walking steps, and the line never seems to end because new souls keep entering from the far upper-left end of the bridge; the lava rivers glow and flow slowly, the torch and brazier flames flicker, small embers drift upward. On the central stone platform the small red-skinned young demon Yama, wearing a tall gold Thai crown, two small red horns and a black robe with gold trim and a red panel, stands in place holding his file, moving only with a tiny breathing motion; the silver-haired lilac-skinned clerk Nira beside the stairs holds her stack of files and shifts her weight slightly; the stout tusked gray-haired cudgel bearer on the far right stands still with his spiked club resting on his shoulder. The stacks of papers on the platform stay exactly where they are. The mood is calm, vast and overwhelming, never frightening. Preserve the crisp 2D pixel-art style, palette, lighting, exact character designs, character counts and costume silhouettes of the start image; no 3D or realistic makeover, no painterly smoothing, no new characters beyond souls entering the bridge from its far end, no text, logos, menus or subtitles, no cuts, crossfades, flashes or camera shake.
```

**Negative / ข้อห้ามการเคลื่อนไหว (เพิ่มจาก 2.3):** ยามา/นิรา/ยักษ์เดินออกจากตำแหน่ง · กระบองถูกเหวี่ยง · วิญญาณโผล่กลางอากาศหรือกลางลาวา · วิญญาณวิ่ง/ล้ม/ตกสะพาน · กองแฟ้มพังหรือขยับ · ลาวาทะลักเกินร่อง · สีภาพเปลี่ยนโทน

**ตรวจรับคลิป:** (1) กล้องนิ่งจริง (2) แถววิญญาณเคลื่อนต่อเนื่องช้า ๆ ไม่กระตุก จำนวนสมเหตุสมผล (3) ตัวละครบนแท่นไม่ย้ายที่ (4) ครึ่งล่างของภาพ (ที่การ์ด "นรกไม่เคยปิดทำการ" จะทับ 2.0–4.5 วินาที) ไม่มีอะไรสว่างจ้าผิดปกติ
**ถ้าตัวละครบนแท่นเดินหลุด:** รีโรลโดยย้ำ "Yama, Nira and the cudgel bearer remain exactly in their starting positions" ท้ายส่วนบรรยายตัวละคร

---

### AI-6 · ช็อต 20 · ตราชั่งนิ่ง ยามามองกล้อง · **P2**

| ฟิลด์ | ค่า |
|---|---|
| ใช้บนไทม์ไลน์ | 50.0–55.0 |
| start image | **เฟรมสุดท้ายของคลิป 19** (PNG export เอง) · สำรองที่เป็นไฟล์จริง: `img/intro-panel-05-v2.webp` |
| end image | ไม่มี |
| ความยาวที่ขอ | **5 วินาที** |
| aspect | 16:9 |
| เครดิตต่อคลิป | `[ ____ ]` (คุณเป้กรอก) |

**Prompt**
```
One continuous 5-second game cinematic that continues directly from the supplied pixel-art image. The camera is completely locked off: no zoom, pan or tilt. The small red-skinned young demon Yama, wearing a tall gold Thai crown with a pointed top, two small red horns, a long black robe with gold trim, red center panel and gold collar, and gold sandals, stands holding the glowing golden balance scale perfectly level between his open palms, the case papers in the left pan and the dark ember in the right pan. Behind him the huge dark-red king stands as a motionless shadowy silhouette, face in shadow. 0-2 seconds: Yama slowly lifts his head a little and his eyes settle steadily on the viewer with a quiet, resolute expression, one slow blink. 2-5 seconds: the ember in the right pan gradually dims from a bright glow to a dull smolder while the beam stays perfectly level and still; the golden glow of the scale steadies; sparks and embers drift slowly upward; lava flows slowly in the background. The king's silhouette, the stone guardian statues, the stairs and the molten cauldron stay perfectly still. Nothing drops or spills from the pans. Preserve the crisp 2D pixel-art style, palette, lighting, exact character designs, character counts and costume silhouettes of the start image; no 3D or realistic makeover, no painterly smoothing, no new characters, no text, logos, menus or subtitles, no cuts, crossfades, flashes or camera shake.
```

**Negative / ข้อห้ามการเคลื่อนไหว (เพิ่มจาก 2.3):** ตราชั่งเอียงอีก/แกว่งอีก · ถ่านระเบิด/ลุกวาบ · พญายมขยับหรือหันมา · ยามายิ้ม/ร้องไห้/ตะโกน · ตราชั่งเปลี่ยนรูปทรง · เปลี่ยนสีชุด

**ตรวจรับคลิป:** (1) ตราชั่งระดับนิ่งตลอด (2) ถ่านฝั่งขวาหรี่ลงเห็นชัดภายใน 2–5 วินาที (3) ยามาสบตากล้องตอนหลังวินาทีที่ 2 ขณะการ์ด "ไม่มีใครควรถูกลงทัณฑ์เกินกว่าที่ตนกระทำ" ขึ้น (4) ตัวละครตรงกับเฟรมสุดท้ายของ 19 ไม่เพี้ยนสไตล์
**ข้อควรระวังความต่อเนื่อง:** คลิปที่ต่อจากเฟรมสุดท้ายมักเสื่อมคุณภาพเล็กน้อย ตรวจว่าตราชั่งและปกคอทองไม่พร่า ถ้าพร่า → ใช้สำรองฟรี (ค้างเฟรมสุดท้ายของ 19 + ประกายลอย)

---

### AI-3 · ช็อต 04 · พ่อเดินออก ยามาอยู่คนเดียว · **P2**

| ฟิลด์ | ค่า |
|---|---|
| ใช้บนไทม์ไลน์ | 12.0–15.0 (+ เฟรมค้างช็อต 18 ที่ 43.75–45.0 ใช้เฟรมที่ยามาอยู่คนเดียว) |
| start image | **เฟรมสุดท้ายของคลิป 02** (PNG export เอง) · สำรองที่เป็นไฟล์จริง: `img/intro-panel-02-v2.webp` |
| end image | ไม่มี |
| ความยาวที่ขอ | **4 วินาที** (เผื่อหัวท้าย — ใช้จริง 3 วินาที) |
| aspect | 16:9 |
| เครดิตต่อคลิป | `[ ____ ]` (คุณเป้กรอก) |

**Prompt**
```
One continuous 4-second game cinematic that continues directly from the supplied pixel-art image. The camera is completely locked off: no zoom, pan or tilt. The small red-skinned young demon Yama, wearing a tall gold Thai crown with a pointed top, two small red horns, short black hair, a black robe with gold trim and a red center panel, and bare feet, stands looking up at the tall dark-red-skinned king in a black-and-gold crown, the small golden seal resting on his open palm. Yama's mouth stays closed. 0-1.5 seconds: stillness, only breathing, a slow worried blink and a slight head movement, embers drifting. 1.5-3 seconds: the king turns away without a word and walks calmly toward the right edge of the frame with natural alternating footsteps, and exits the frame to the right, his black-and-gold costume unchanged. 3-4 seconds: Yama is left alone in the center holding the seal on his palm, his gaze following where his father left, then lowering to the seal with a small uncertain look; nobody else enters. Throughout: embers drift upward, lava glows and shimmers in the floor reflections, brazier flames flicker; the stone guardian statues, the stairs and the empty throne stay perfectly still. The seal keeps the same shape, size and gold colour. Preserve the crisp 2D pixel-art style, palette, lighting, exact character designs, character counts and costume silhouettes of the start image; no 3D or realistic makeover, no painterly smoothing, no new characters, no text, logos, menus or subtitles, no cuts, crossfades, flashes or camera shake.
```

**Negative / ข้อห้ามการเคลื่อนไหว (เพิ่มจาก 2.3):** ตราหาย/เปลี่ยนรูป · พญายมหันมามองยามาอีก/ตอบ/ยิ้ม · พญายมหายวับ (ต้องเดินออกให้เห็นเป็นก้าว) · ตัวละครที่สามเข้าเฟรม · ยามาเดินตามพ่อ · ยามาปากขยับพูด (บทพูดอยู่ในกล่องข้อความของเกม)

**ตรวจรับคลิป:** (1) พ่อออกจากเฟรมขวาภายในประมาณวินาทีที่ 3 (2) วินาทีที่ 3–4 ยามาอยู่คนเดียว ถือตราเห็นชัด (3) ไม่มีการหายวับหรือครอสเฟด (4) เฟรมสุดท้ายสะอาด ใช้เป็นช็อต 18 ได้
**จุดเสี่ยง:** การหันกลับ 180° ของตัวละครพิกเซลเป็นจุดที่โมเดลมักเพี้ยน (พ่อเคยหันหน้าเข้าหายามา) · ถ้าเพี้ยนหลังรีโรลหนึ่งครั้ง **ตัดคลิปนี้** แล้วใช้สำรองฟรีของ Vera (ค้างเฟรมสุดท้ายของ 02 + vignette ไล่ความสว่างฝั่งพ่อดับลง) — การ์ดช่วง 12.0–14.0 ยังอ่านได้ครบเพราะบทพูดอยู่ในกล่องข้อความ
**หมายเหตุตัดต่อ:** ช็อต 18 เลือกเฟรมช่วง 3.2–4.0 วินาทีของคลิปนี้ (ยามาอยู่คนเดียว) ไม่ใช่เฟรมสุดท้ายที่ใช้บนไทม์ไลน์ 12.0–15.0

---

### AI-4 · ช็อต 05 · นิราวางแฟ้มเพิ่ม มุกกองเอน · **P3 (เสริม)**

| ฟิลด์ | ค่า |
|---|---|
| ใช้บนไทม์ไลน์ | 15.0–19.3 (Smash cut ที่ 15.0 · การ์ด 16.0–18.0 · นิราวางแฟ้ม 18.0–19.0) |
| start image | `img/intro-panel-01-v2.webp` |
| end image | ไม่มี |
| ความยาวที่ขอ | **5 วินาที** (ใช้จริง 4.3) |
| aspect | 16:9 |
| เครดิตต่อคลิป | `[ ____ ]` (คุณเป้กรอก) |

**Prompt**
```
One continuous 5-second game cinematic, animating the supplied pixel-art image exactly as drawn. The camera is completely locked off: no zoom, pan or tilt (the zoom-out is done later in editing). 0-3 seconds: quiet idle. The translucent pale-blue souls in the long queue shuffle slowly forward along the wooden bridge, the lava glows and flows, the torch flames flicker. On the central stone platform the small red-skinned young demon Yama, wearing a tall gold Thai crown, two small red horns and a black robe with gold trim and a red panel, stands in place holding his file; he takes a slow breath, his shoulders sagging slightly and his posture stiffening as he looks at the stacks of papers around him. 3-4 seconds: the silver-haired lilac-skinned clerk Nira takes one short step toward the edge of the platform and sets her small stack of files on top of the tall stack of papers beside her; the tall stack sways and tilts about 3 degrees and a few sheets slide off and flutter down, but the stack does not collapse. 4-5 seconds: everything settles; Yama stays frozen in place; the stout tusked gray-haired cudgel bearer on the far right stays still with his spiked club resting on his shoulder. No one else enters the platform, and Yama's skin and clothing colours do not change. Preserve the crisp 2D pixel-art style, palette, lighting, exact character designs, character counts and costume silhouettes of the start image; no 3D or realistic makeover, no painterly smoothing, no new characters beyond souls entering the bridge from its far end, no text, logos, menus or subtitles, no cuts, crossfades, flashes or camera shake.
```

**Negative / ข้อห้ามการเคลื่อนไหว (เพิ่มจาก 2.3):** ยามาหน้าซีด/เปลี่ยนสีผิว (ซีดทำในตัดต่อช็อต 06 ไม่ใช่ใน AI) · กองแฟ้มล้มพังทั้งหมด · กระดาษระเบิด · นิราเดินออกนอกแท่น · ยักษ์ขยับกระบอง

**ตรวจรับคลิป:** (1) เหตุการณ์วางแฟ้ม + กองเอนเกิดภายในช่วงวินาทีที่ 3–4 (ตรง 18.0–19.0 ของไทม์ไลน์ ถ้าเริ่มคลิปที่ 15.0) (2) ยามาเห็นว่าอยู่นิ่ง ไม่เดินหนี (3) ไม่มีตัวละครใหม่
**สำรองฟรี:** ทำเลเยอร์กองแฟ้มเอนในตัดต่อตาม Vera 5.2 (ครอปกองแฟ้มกลางแท่น หมุน 0→3° ใน 8 เฟรม + กระดาษปลิว 3 แผ่น + สั่นจอ ±6 px 5 เฟรม) — มุกอ่านได้จากบทพูดนิรา + กองเอน ไม่ต้องใช้เครดิต

---

## 4. ลำดับผลิตและลำดับตัด

### 4.1 ลำดับผลิตที่แนะนำ

| ขั้น | งาน | เหตุผล |
|---|---|---|
| 0 | อัปโหลดภาพ 01, 02, 05 เช็กแท็ก nsfw (ฟรี) | 02 เสี่ยงที่สุด รู้ก่อนใช้เครดิต |
| 1 | **02** | ภาพสำคัญที่สุดของเรื่อง (ส่งมอบตรา + เมล็ดมุก "ชั่วคราว") เป็นต้นทางของ 03 และ 04 และมือ/วัตถุเป็นจุดเสี่ยงสุด ถ้าเพี้ยนต้องรู้เร็ว |
| 2 | **19** | ไคลแมกซ์ P1 · ต้นทางของ 20 · ตราชั่ง/แสงเรืองเป็นจุดเสี่ยงที่สอง |
| 3 | **01** | Hook · ง่ายที่สุด (ฉากกว้าง ตัวละครนิ่ง) แต่ต้องมีแน่ |
| 4 | 20 | ต้อง export เฟรมสุดท้ายของ 19 ก่อน |
| 5 | 04 | ต้อง export เฟรมสุดท้ายของ 02 ก่อน |
| 6 | 05 | เสริม ทำเมื่อเครดิตเหลือเท่านั้น |

หมายเหตุ: ถ้าอยากประหยัดให้แยกรอบ — **รอบ A (บังคับ):** 02 + 19 + 01 · **รอบ B (ทำถ้าเหลือ):** 20 → 04 → 05 ตามลำดับ

### 4.2 ถ้าเครดิตไม่พอ — ตัดตามลำดับนี้

| ลำดับตัด | ช็อต | ผลที่เสียไป | สำรองฟรี (จาก Vera 5.1) | เวลา AI ที่ลด |
|---|---|---|---|---|
| 1 | **05** | มุกกองเอนเคลื่อนไหวจริง | เลเยอร์ตัดต่อ (Vera 5.2) · ไม่กระทบมุก | −4.3 วินาที |
| 2 | **04** | ฉากพ่อเดินออก | ค้างเฟรมสุดท้ายของ 02 + vignette ฝั่งพ่อ | −3.0 วินาที |
| 3 | **20** | ยามาเงยมอง ถ่านหรี่ | ค้างเฟรมสุดท้ายของ 19 + ประกายลอย + scrim | −5.0 วินาที |
| ห้ามตัด | 01 · 02 · 19 | — | มีสำรองฟรี (Ken Burns) แต่เสียพลังของ hook / ฉากมอบตรา / ไคลแมกซ์ — ตัดเป็นทางสุดท้าย | — |

ถ้าตัดครบ 05 + 04 + 20 จะเหลือคลิป AI 3 คลิป (01, 02, 19) = 16 วินาที ของคลิปที่ขอ — trailer ยังครบโครงเพราะทุกช็อตมีสำรองฟรี

---

## 5. ช่องเครดิต (คุณเป้กรอกตามโมเดลที่เลือกในแอป — Mind ไม่ได้เดาราคา)

**โมเดลที่เลือก:** `[ ____ ]` · **ความละเอียด:** `[ ____ ]` · **เครดิตคงเหลือก่อนเริ่ม:** `[ ____ ]` (ใบงานบอกเหลือ 200)

| ช็อต | ความยาวที่ขอ | เครดิตต่อคลิป | จำนวนรอบที่คาด (1 = ไม่รีโรล) | รวมที่ใช้ |
|---|---|---|---|---|
| 02 | 6 วินาที | `[ ____ ]` | `[ ]` | `[ ]` |
| 19 | 5 วินาที | `[ ____ ]` | `[ ]` | `[ ]` |
| 01 | 5 วินาที | `[ ____ ]` | `[ ]` | `[ ]` |
| 20 | 5 วินาที | `[ ____ ]` | `[ ]` | `[ ]` |
| 04 | 4 วินาที | `[ ____ ]` | `[ ]` | `[ ]` |
| 05 | 5 วินาที | `[ ____ ]` | `[ ]` | `[ ]` |
| **รวม** | 30 วินาที | | | `[ ____ ]` |

วิธีใช้: กรอกเครดิตต่อคลิปแล้วเอา "รอบที่คาด" คูณ · ถ้ารวม > เครดิตที่มี ให้ตัดช็อตตามลำดับ 4.2 ก่อน แล้วค่อยลดรอบรีโรลของช็อต P2/P3 · ถ้าความยาวที่ขอต่างจากแอปรองรับ (เช่น แอปมีแต่ 5 หรือ 10 วินาที) แจ้ง Claudy/Vera ก่อน เพราะบางช็อตเปลี่ยนจังหวะ (02 ต้องเฟรมค้างต่อท้าย 0.5 วินาที; 04 ใช้ 5 วินาทีแล้วตัดทิ้ง)

---

## 6. คู่มือรีโรลสั้น ๆ (แก้ก่อนใช้เครดิตเพิ่ม)

| อาการ | แก้ใน prompt (รีโรลได้ 1 ครั้ง) |
|---|---|
| ตัวละครเปลี่ยนหน้า/ชุด | ย้ำท้ายคำบรรยายตัวละคร: "keep the face, crown, horns and robe identical to the start image in every frame" |
| กล้องซูมหรือแพนเอง | ย้ำต้น prompt: "static locked-off camera, the frame never moves" |
| ตัวละครเดินหลุดตำแหน่ง | "remains exactly in the starting position, only breathing" |
| ของในมือเปลี่ยนรูป/ซ้ำ | "exactly one [object], same shape, size and colour in every frame" |
| ภาพนุ่ม/สไตล์หลุดเป็น 3D | ย้ำ "flat 2D pixel art, hard pixel edges, no smoothing" และลดจำนวนการเคลื่อนไหวใน prompt |
| คลิปสั้นกว่าที่ต้องใช้ | ใช้เฟรมค้างต่อท้าย (Vera ระบุแล้วสำหรับ 02) ไม่ซื้อรอบเพิ่ม |

กติกา: รีโรลได้ช็อตละ 1–2 ครั้งในเพดาน 8 คลิป (เหลือที่ว่าง 2) · ถ้าสองรอบยังไม่ผ่าน ใช้สำรองฟรี ไม่ต่อรอบ

---

## 7. ข้อมูลส่งต่อตัดต่อ (Vera / คุณเป้)

- ทุกคลิปกล้องนิ่ง → push-in ทำในตัดต่อตามตาราง shot list (19 ≤ 106%)
- เฟรมที่ต้อง export จากคลิปที่ผ่านแล้ว (PNG ไม่สูญเสีย): **เฟรมสุดท้ายคลิป 02** (→ 03 ค้าง + start ของ 04) · **เฟรมสุดท้ายคลิป 19** (→ start ของ 20) · **เฟรมที่ยามาอยู่คนเดียวของคลิป 04** (→ ช็อต 18)
- ภาพนิ่ง 06 (ยามาซีด) ใช้ `hero-yama.png` ตามที่ Vera วางไว้ ไม่ใช้ AI
- ไม่มีเสียงในคลิป (`generate_audio false`) เสียงทั้งหมดใส่ในตัดต่อตามจังหวะของ Rae
- เวอร์ชัน 9:16 (ภาคผนวก A ของ Vera) ใช้คลิป 16:9 เดิมทั้งหมด ไม่ต้องสร้างเพิ่ม
- โลโก้/ไตเติลไม่ใช่งาน AI (ช็อต 22–23 ใช้ `img/ui/logo-th.png` / `logo-eng.png`)

---

## 8. สิ่งที่ไม่ได้ยืนยัน

1. คุณภาพผลลัพธ์จริงของ prompt รูปแบบนี้ — ไฟล์ตัวอย่างไม่เคยได้วิดีโอ
2. โมเดล/ความยาว/ความละเอียด/โหมด ที่แอปรองรับตอนนี้ และเครดิตต่อคลิป (ช่องว่างหัวข้อ 5)
3. ภาพ 02 จะผ่านตัวกรอง nsfw หรือไม่
4. ขนาดพิกเซลของภาพต้นทาง (ค่าประมาณจากตัวเปิดภาพ)
5. ความเหมาะสมทางวัฒนธรรมของตราชั่ง/พญายม/นรกในคลิป (ส่ง Reese ขั้นที่ 4) — prompt ไม่ใช้คำว่า karma/merit/sin และไม่มีพระ วัด หรือสัญลักษณ์พิธีกรรม
6. ไม่ได้เปิดดูวิดีโอเดิมใน repo (`intro-opening-v2.mp4` ฯลฯ) — ไม่เกี่ยวกับขั้นนี้

## เช็กตามเกณฑ์รับงาน (ส่วนของ Mind)

- ข้อ 4: prompt ครบทุกช็อต AI (6/6) เป็น image-to-video จากภาพที่มีจริง คงชุดตัวละครตามภาพ ไม่สร้างตัวละครใหม่จากข้อความ ไม่เปลี่ยนชุด/สียามา · ไฟล์ start เป็น path จริง 3 ไฟล์ + เฟรมที่ export จากคลิป 2 เฟรม (ทุกช็อตที่ใช้เฟรม export มี path สำรองจริง)
- ข้อ 5: ไม่มีไฟล์ใน repo AVEGEE ถูกแก้ (อ่านอย่างเดียว)
- ข้อ 6: ไม่มีเนื้อหาล้อศาสนา/สถาบัน · ไม่ขยายความรุนแรง/เลือด · ไม่ใช้ `intro-panel-04` (ดาบเปื้อนเลือด) `cover-v5` และ `story-ending-*`
