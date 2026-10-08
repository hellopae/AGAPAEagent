# Minnie: เลือกฉากทำ Animation เพิ่มใน AVEGEE (Kling AI)
วันที่ 8 ต.ค. 2569 · ใบงาน `Output/Claudy/briefs/2026-10-08-avegee-kling-animation-ideas.md`

> ทั้งหมดนี้เป็น **สมมติฐาน** ว่าฉากไหนคุ้มที่สุด ยังไม่ใช่ข้อสรุป ไม่ได้ตรวจราคา/เครดิต Kling ตามขอบเขต ภาพต้นทางทุก path ผ่าน Glob แล้วและเปิดดูภาพจริงแล้ว

## สรุป 3 บรรทัด
- **ฉากจบทั้ง 2 ใบควรได้ก่อน** เพราะเป็นจุดสูงสุดทางอารมณ์ เป็นฉากบังคับ และภาพต้นทางพร้อมแล้ว
- ใบที่ง่ายที่สุดสำหรับ image-to-video คือ `story-ending-02-v3.png` เพราะเป็นภาพกว้าง ขยับแค่ฉากหลังกับกล้อง
- ถ้ามีเครดิตเหลือแค่ 1 คลิป ทำ ending-02 ถ้า 2 คลิปทำ ending-01 + ending-02 เป็นชุดเดียวกัน

## ผู้สมัคร 10 ฉาก (ไม่มีฉากไหนซ้ำกับวิดีโอที่มีอยู่)

| # | ฉาก | ภาพต้นทาง | ใครเห็น | ความง่าย I2V | หมายเหตุ |
|---|---|---|---|---|---|
| 1 | จบ: ผู้ปกครองทั้งสี่โซน | `img/story-ending-02-v3.png` | ทุกคนที่เล่นจบ (บังคับ) | ง่ายมาก | อารมณ์สูงสุด |
| 2 | จบ: จบการควบคุม (บอสโดนล่ามโซน) | `img/story-ending-01-v4.png` | ทุกคนที่เล่นจบ (บังคับ) | ปานกลาง (ตัวละคร 6 ตัว) | catharsis |
| 3 | เทวดาโซน 1 เปิดตัว (เฉลยคดีที่ 5) | `img/deva-intro/deva-intro-th-v1.png` | ทุกคนเจอ (โซน 1 เป็นโซนแรก) | ง่าย | ปีก แสง ผ้าไหล |
| 4 | บอสโซน 4 ควบคุมหัวหน้าทั้ง 4 | `img/story-cyberhell-02-v3.png` | ทุกคนที่ถึงโซน 4 (บังคับ) | ง่าย (ตัวละครนั่งนิ่ง โซ่เรืองแสง) | จุดหักเห |
| 5 | บอสโซน 4 ประจันหน้ายมบาท (ก่อนศึกตัดสิน) | `img/story-cyberhell-03-v4.png` | ทุกคนที่ถึงโซน 4 (บังคับ) | ง่าย-ปานกลาง | ต่อเข้าฉากต่อสู้ |
| 6 | กองหนุนพุ่งตะลุยลูกน้อง | `img/story-cyberhell-reinforcements-02.png` | ทุกคนที่ถึงโซน 4 | **ยาก** (ตัวละครเยอะ ชุลมุน ตัวจะเพี้ยน) | เด่นแต่เสี่ยงเสียเครดิต |
| 7 | กองหนุนมาถึง | `img/story-cyberhell-reinforcements-01.png` | ทุกคนที่ถึงโซน 4 | ง่าย (โพสต์เดินเข้าหากล้อง) | ผลทางอารมณ์ปานกลาง |
| 8 | ม้าโทรจันกลิ้งเข้าชายแดนโซน 4 | `img/frontier-cyberhell-intro-v1.png` | เจอตามเงื่อนไขคดี | ง่ายมาก (ล้อหมุน ตาเรืองแสง) | อารมณ์ต่ำกว่า |
| 9 | เทวดาโซน 4 (ลูเมน) จับ Taan | `img/deva-intro/deva-intro-cyberhell-v1.png` | ทุกคนที่ถึงโซน 4 (ต้องสู้ถึงปล่อยตัว) | ปานกลาง | ถ้าเหลือเครดิต |
| 10 | หัวหน้าบูรพาลงโทษ (ตัวอย่างกลุ่ม punish) | `img/head-asia-punish-cutscene-v1.png` | ผ่านบ่อย | ปานกลาง | **ตัดออก** เห็นซ้ำบ่อยจนเฝือ ฉากความรุนแรง |

ที่ตัดออกด้วยเหตุผลอื่น: ฉากรางวัลของบอส (`story-th-01..05`, `story-asia-01..05-v2`, `story-west-01..02`) เป็นการ์ตูนหลายช่อง ต้องทำหลายคลิปต่อ 1 เหตุการณ์ ไม่คุ้มเครดิตที่เหลือ

## Top 5 เรียงตามความคุ้ม

หมายเหตุร่วมสำหรับทุกฉาก
- ภาพต้นทางของ `story-*` มีแถบดำ letterbox ติดมาในภาพ เกมครอปด้วย `CONTENT_ROWS` ใน `src/cutscene-presentation.js` (ending-01 แถว 121–602, ending-02 แถว 89–633, cyberhell-02 แถว 104–640, cyberhell-03 แถว 88–632)
- แนะนำอัปโหลดภาพ 16:9 เดิมทั้งใบ แล้วสั่งใน prompt ว่าแถบดำต้องนิ่งและดำสนิท จากนั้นครอปแถบทิ้งตอนเอาเข้าเกมหรือใน editor
- ถ้า Kling ขยับแถบดำ ให้ครอปแถบออกก่อนอัปโหลดแล้วค่อยแก้อัตราส่วน ตรวจสเปกอัตราส่วนของ Kling เองก่อน
- ภาพที่มีตัวละครถูกล่ามโซน (ending-01, cyberhell-02) **อาจโดนตัวกรองเนื้อหา** ไฟล์ `docs/yama-intro-animation-higgsfield-2026-10-08.json` บันทึกว่า PDF หน้า 9 โดนติดธง nsfw ทั้งที่เป็นตัวละครแต่งกายปกติ ไม่ทราบนโยบาย Kling ให้ลองคลิปที่เสี่ยงน้อยก่อน และห้ามพยายามเลี่ยงตัวกรอง
- ภาพที่มีตัวละครหลายตัวเล็กๆ (ending-02) ให้ขยับเฉพาะฉากหลังกับกล้อง อย่าสั่งให้ตัวละครเดิน

### อันดับ 1 · ฉากจบ: ผู้ปกครองทั้งสี่โซน
- **จังหวะ:** ภาพสุดท้ายของเกม (`ending` panel 2 ใน `src/story.js`) ยมบาทน้อยนั่งบัลลังก์มองสี่โซน
- **ทำไมคุ้ม:** เป็นภาพที่ผู้เล่นจะจำเป็นภาพสุดท้าย ภาพกว้างมีของให้ขยับเยอะ (ลาวา น้ำตก หิมะ ผี ไฟเซิร์ฟเวอร์) โดยตัวละครแทบไม่ต้องขยับ เสี่ยงเพี้ยนต่ำสุด
- **ภาพต้นทาง:** `AVEGEE/img/story-ending-02-v3.png`
- **ความยาวแนะนำ:** 8 วินาที (ค้างภาพสุดท้ายให้ผู้เล่นอ่านข้อความได้ ไม่ต้อง loop)
- **Prompt:**
```
Slow cinematic push-in, 16:9 pixel-art game ending cutscene. Keep the exact composition, characters, colors and painting style of the reference image. Six characters stand on a stone balcony seen from behind, overlooking four hell realms; the small red demon sits on the golden throne in the center. Motion: the camera creeps slowly forward toward the throne. The characters stay almost still with subtle breathing and gentle sway of cloaks, fur and robes; the lavender clerk's papers flutter slightly. Background motion only: lava on the left glows and flows, blue waterfalls cascade, lanterns flicker, pale ghost spirits drift above the glowing river, light snow falls on the right, cyan data lights blink on the purple servers, the setting sun brightens with warm golden rays. Mood: peaceful, triumphant, warm. Keep the black letterbox bars at the top and bottom pure black and perfectly static. Preserve every character's face, costume and count.
Negative: new characters, text, logos, subtitles, 3D render, realistic style, fast motion, camera shake, scene cut, morphing faces, changing the number of characters.
```

### อันดับ 2 · ฉากจบ: จบการควบคุม
- **จังหวะ:** หลังชนะบอสโซน 4 (`ending` panel 1) บอสคุกเข่าถูกล่ามโซน หัวหน้าทั้งสี่และยมบาทน้อยยืนมอง
- **ทำไมคุ้ม:** เป็นจุดปลดปล่อยของศึกสุดท้าย โซ่แตกเป็นประกายคือภาพเคลื่อนไหวที่เล่าเรื่องได้ทันทีโดยไม่ต้องอ่าน
- **ภาพต้นทาง:** `AVEGEE/img/story-ending-01-v4.png`
- **ความยาวแนะนำ:** 5–6 วินาที
- **Prompt:**
```
16:9 pixel-art game cutscene. Keep the exact composition, characters and painting style of the reference image. At the right, the kneeling bowed defeated inspector in an ornate purple-gold robe and tall patterned hat is bound by glowing purple chains. Motion: the chains flicker, then crack link by link and dissolve into drifting purple sparks that float upward; the cracked servers beside him flicker and dim. The four rulers and the small red demon with a book at the left stand watching, with subtle breathing, cloak and fur sway, the raven on the viking judge's shoulder shifts its head slightly. The warm golden light shafts from the throne in the background grow gently brighter. Very slow camera push-in toward the group. Keep the black letterbox bars at the top and bottom pure black and static. The inspector stays kneeling with his head bowed and his hat hiding his face; he does not stand or attack. Preserve every character's face, costume and count.
Negative: text, logos, new characters, blood, the inspector standing up or attacking, 3D render, realistic style, fast motion, camera shake, scene cut, morphing faces.
```

### อันดับ 3 · เทวดาโซน 1 เปิดตัว (เฉลยคดีที่ 5)
- **จังหวะ:** คดีที่ 5 ของโซน 1 ตัดสินแล้ว วิญญาณพระกลายเป็นเทวดา (event `devaTest` ตาม storyboard `Output/Claudy/briefs/2026-10-08-avegee-ev-storyboard.md`)
- **ทำไมคุ้ม:** ผู้เล่นทุกคนเห็น ตั้งแต่ต้นเกม และเป็น "ไอ้หยา" ครั้งแรกของระบบเทวดา ปีก แสง ผ้าทอง ขยับแล้วสวยโดยไม่ต้องใช้ท่าทางซับซ้อน
- **ภาพต้นทาง:** `AVEGEE/img/deva-intro/deva-intro-th-v1.png` (ภาพเฉลยตาม storyboard) · สังเกต: `src/story.js` ตอนนี้ใช้ `deva-intro-th-beggar-v2.png` สำหรับคำชม/ตักเตือน ให้ยืนยันกับ Dale ว่าภาพเฉลยใช้ v1
- **ความยาวแนะนำ:** 5–6 วินาที
- **Prompt:**
```
16:9 pixel-art game cutscene. Keep the exact composition, characters and style of the reference image. A radiant Thai celestial guardian with large white-blue wings, gold crown and white-gold armor holds a spear in his left hand and extends his right palm toward the small red demon at the left. Motion: the wings flutter gently and spread slightly wider, golden god-rays pulse softly, golden cloth ribbons and sparkles around the ghostly monk at the upper right drift and flow sideways, red petals and embers float through the air, lava glows in the background. The small red demon with a gold crown holding a red book takes a tiny step back and looks up in surprise. Slow camera push-in toward the celestial guardian. Preserve every face, crown, costume and the spear in his hand.
Negative: text, logos, extra characters, 3D render, realistic style, fast motion, camera shake, scene cut, morphing faces, changing the armor design.
```

### อันดับ 4 · บอสโซน 4 ควบคุมหัวหน้าทั้งสี่
- **จังหวะ:** ก่อนด่านช่วยหัวหน้าทั้ง 4 (`cyber-control` ใน `src/story.js`, Map-Zone4-5 ใน storyboard)
- **ทำไมคุ้ม:** เป็นจุดหักเหของเรื่องว่าตัวร้ายคือใคร และภาพมีองค์ประกอบ "โซ่เรืองแสง + ตัวละครนั่งนิ่ง" ซึ่ง AI ทำได้ง่าย
- **ภาพต้นทาง:** `AVEGEE/img/story-cyberhell-02-v3.png`
- **ความยาวแนะนำ:** 5–6 วินาที
- **Prompt:**
```
16:9 pixel-art game cutscene. Keep the exact composition, characters and style of the reference image. The tall inspector in an ornate purple-gold robe stands behind four kneeling bound rulers and controls them with glowing purple chains from his raised hand. Motion: pulses of purple energy travel along the chains from his hand to the four rulers' wrists and chests; the rulers' eyes flicker with glowing purple light and their bodies sway very slightly as if drained; the inspector's fingers twitch and his robe hem sways. Cyan ghosts drift on the river at the right, lava falls at the left, server lights blink. The small demon seen from behind at the lower left stands still, with a slight tremble of his coat. Slow camera push-in. Keep the black letterbox bars at the top and bottom pure black and static. Preserve every face, costume, and the exact number of chains and characters.
Negative: text, logos, new characters, the rulers breaking free, blood, 3D render, realistic style, fast motion, camera shake, scene cut, morphing faces.
```

### อันดับ 5 · บอสโซน 4 ประจันหน้ายมบาทน้อย
- **จังหวะ:** หลังชนะหัวหน้าทั้ง 4 ก่อนเข้าศึกตัดสิน (`cyber-duel`, Map-Zone4-6 ใน storyboard)
- **ทำไมคุ้ม:** เป็นฉาก "ก่อนศึกตัดสิน" ที่ปั้นอารมณ์ได้ดี และเป็นคู่กับอันดับ 4 ถ้าเหลือเครดิตทำเป็นชุดได้
- **ภาพต้นทาง:** `AVEGEE/img/story-cyberhell-03-v4.png`
- **ความยาวแนะนำ:** 5 วินาที
- **Prompt:**
```
16:9 pixel-art game cutscene. Keep the exact composition, characters and style of the reference image. At the right, the tall inspector in an ornate purple-gold robe holds a glowing rune book in one hand and crackles data runes in the other; at the lower center, the small red demon in a black coat stands in a ready stance seen from behind. Motion: the glowing runes around the inspector pulse and orbit his palm, his wide sleeves and robe hem sway, the purple lamp pillars along the stairs pulse in rhythm, lava glows and flows behind the throne. The four freed rulers crouch at the left, breathing slightly. The small demon shifts his weight and tightens his fists. Slow low-angle push-in toward the confrontation. Keep the black letterbox bars at the top and bottom pure black and static. The inspector does not attack or move toward the camera. Preserve every face, costume and count.
Negative: text, logos, new characters, blood, an attack animation, 3D render, realistic style, fast motion, camera shake, scene cut, morphing faces.
```

## ถ้าเครดิตเหลือแค่ 1–2 คลิป

| เครดิตเหลือ | ทำอะไร | เหตุผล |
|---|---|---|
| **1 คลิป** | อันดับ 1 `story-ending-02-v3.png` | ความเสี่ยงเพี้ยนต่ำสุด อารมณ์ฉากจบสูงสุด ถ้าคลิปเสียแล้วลองใหม่ก็ยังคุ้ม |
| **2 คลิป** | อันดับ 2 + อันดับ 1 (เล่นต่อกันตามลำดับในเกม: จบการควบคุม แล้วผู้ปกครองสี่โซน) | ได้ฉากจบครบทั้งชุด ไม่ต้องให้ผู้เล่นเห็นคลิปตามด้วยภาพนิ่งแล้วสลับไปมา |
| **2 คลิป (ทางเลือก)** | อันดับ 1 + อันดับ 3 (เทวดาโซน 1) | ถ้าอยากให้คนเห็นเยอะที่สุด เพราะผู้เล่นที่เล่นไม่จบก็ยังได้เห็นเทวดา |

เคล็ดลับประหยัดเครดิต (ไม่เกี่ยวกับราคา)
- ส่งภาพเริ่มต้นอย่างเดียว ไม่ต้องใช้ภาพสิ้นสุด
- เลือกความยาวสั้นที่สุดที่ฉากเล่าได้
- สั่งให้กล้อง **หรือ** ตัวละครขยับอย่างใดอย่างหนึ่งเป็นหลัก อย่าสั่งทั้งคู่แรงๆ
- เมื่อได้คลิปที่ใช้ได้ให้หยุดทันที อย่าลองเพื่อให้สมบูรณ์แบบ

## ข้อสังเกต
- งานนี้ไม่ได้แก้ไฟล์ใดใน AVEGEE อ่านอย่างเดียว
- การเอาวิดีโอไปแทนภาพนิ่งในเกม (story panel ใช้ `<img>` + CSS ครอปแถบดำ) ต้องมีงานโค้ดแยก ส่งต่อ Dale/Codex ตอนมีคลิปจริง
- ยังไม่ตรวจข้อกำหนดอัตราส่วน/ความยาวสูงสุด/ตัวกรองเนื้อหาของ Kling (นอกขอบเขต)
- Claudy ตัดสิน: ไม่ส่ง Reese เพราะเป็นไอเดียภายใน ไม่มีข้ออ้างข้อเท็จจริงนอก repo (path ภาพตรวจด้วย Glob แล้ว)
