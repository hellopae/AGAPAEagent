# SAD : Super Sprite — รายงานวิจัยสำหรับ AVEGEE (10 พ.ย. 2569)

ผู้ทำ: Reese · ตามใบงาน `Output/Claudy/briefs/2026-11-10-sad-super-sprite-research.md`

## สรุป 5 บรรทัดแรก

1. **คืออะไร:** ระบุตัวเครื่องมือ "SAD : Super Sprite" ไม่ได้ (ยืนยันไม่ได้) เพราะเปิดคลิป Facebook ไม่ได้ (ต้องล็อกอิน เห็นแค่คำว่า "Facebook") และค้นด้วยชื่อ 10+ แบบแล้วไม่พบผลิตภัณฑ์ AI ชื่อนี้ในเว็บสาธารณะเลย
2. **ราคา:** ยืนยันไม่ได้ เพราะไม่รู้ตัวเครื่องมือ (ตัวเทียบเคียงในหมวดเดียวกัน Ludo.ai Sprite Generator เริ่ม $15/เดือน เมื่อจ่ายรายปี)
3. **ใช้เชิงพาณิชย์ได้ไหม:** ยืนยันไม่ได้สำหรับ SAD · ต้องอ่านเงื่อนไขของเครื่องมือจริงก่อนใช้ · Steam ยอมให้ขายเกมที่มี AI ที่สร้างไว้ล่วงหน้าได้ แต่ต้องแจ้งในแบบสำรวจเนื้อหา
4. **เหมาะกับ AVEGEE ไหม:** **ตัดสินไม่ได้ตอนนี้** (ไม่ใช่ "ใช่" และยังไม่ควรเสียเงิน) · หมวดเครื่องมือ AI sprite ลองได้เฉพาะงานเสริม เช่น ทดสอบท่าเดิน/ท่ายืนของศัตรูโซนที่ยังไม่ล็อกสไตล์ ไม่ควรแทน pipeline หลักของยามา
5. **ขั้นถัดไป:** ให้คุณเป้ส่งข้อมูลจากคลิป (ชื่อเพจ/ผู้โพสต์, แคปชันเต็ม, ลิงก์ในคอมเมนต์, สกรีนช็อตหน้าจอเครื่องมือ) แล้ว Reese ค้นต่อ หรือถ้าได้ URL เว็บทางการ จะอ่านราคา/ข้อกำหนดจริงให้ภายในรอบเดียว

---

## 1. SAD : Super Sprite คืออะไร

### สถานะการระบุตัวตน: ระบุไม่ได้

- **ลิงก์ Facebook เปิดไม่ได้:** `https://www.facebook.com/share/v/1M5MdM12JF/` ดึงมาได้เพียงคำว่า "Facebook" ไม่มีชื่อคลิป คำอธิบาย หรือผู้โพสต์ (ต้องล็อกอิน) จึงไม่รู้ว่าในคลิปเขียน/พูดอะไรเกี่ยวกับเครื่องมือ
- **ค้นด้วยชื่อ** "SAD Super Sprite", "SAD: Super Sprite", "Super Sprite AI sprite", "Sprite Animation Designer", ชื่อภาษาไทย + คำว่า AI sprite, "Shado Game Studio Super Sprite", ค้น itch.io / GitHub / Product Hunt แล้ว **ไม่พบเครื่องมือ AI ชื่อนี้ในผลค้นหาสาธารณะ** (ผลลัพธ์ที่ขึ้นมาล้วนเป็นเครื่องมือชื่ออื่น)
- ไม่พบความหมายของตัวย่อ "SAD" ในบริบท AI sprite ในผลค้นหาใดเลย อย่าเดาว่าย่อมาจากอะไร
- สาเหตุที่เป็นไปได้ (ข้อสันนิษฐาน ไม่ใช่ข้อเท็จจริง): เครื่องมือใหม่/เล็กมากจนยังไม่ถูกจัดทำดัชนี, เป็นของที่โปรโมตผ่านโฆษณา Facebook เป็นหลัก, หรือชื่อที่คุณเป้เห็นสะกดต่างจากชื่อจริง

### ตัวที่ชื่อคล้ายกันและเจอจริง (ตรวจแล้ว ไม่น่าใช่ตัวในคลิป)

| ชื่อ | คืออะไร | โอกาสเป็นตัวในคลิป | เหตุผล |
|---|---|---|---|
| Super Sprites (Blender add-on) โดย Sebastian Nebaeus | add-on แปลงโมเดล 3D เป็น sprite pixel art, ราคา $1, MIT, ยังใช้บน Mac ไม่ได้, ลงขายราว 4 ปีก่อน ([ที่มา](https://superhivemarket.com/products/supersprites)) | ต่ำ | ไม่ใช่ AI, ไม่มีคำว่า SAD, เก่า |
| SuperSprite for GameMaker (masharcade) | แพ็กเอฟเฟกต์ sprite ของ GameMaker ([ที่มา](https://masharcade.itch.io/supersprite)) | ต่ำมาก | เป็น library ไม่ใช่เครื่องมือสร้าง sprite |
| SuperSprite2D (Godot add-on) | ส่วนขยายของ AnimatedSprite2D ([ที่มา](https://godotengine.org/asset-library/asset/3190)) | ต่ำมาก | เป็นโค้ด ไม่ใช่ AI |
| Super Sprite Extractor | เครื่องมือแยก animation จากเกมที่มีอยู่ (เจอจากวิดีโอสอนบน YouTube, [ที่มา](https://www.youtube.com/watch?v=9rQiHM4nSpI)) | ต่ำ | ใช้ดึงงานเกมคนอื่น ไม่ใช่ AI สร้างใหม่ |
| "SAD" ไฟล์ Sprite Actor Data ของเกม LBA | ฟอร์แมตไฟล์เกมเก่า ([ที่มา](https://lbafileinfo.kaziq.net/index.php/Sprite_actor_data)) | ไม่เกี่ยว | ชื่อพ้องเท่านั้น |

**ข้อสรุป:** ไม่มีตัวไหนมีหลักฐานว่าเป็น "SAD : Super Sprite" ในคลิป จึงไม่ควรประเมินว่าตัวใดตัวหนึ่งคือคำตอบ

ผู้พัฒนา / เว็บทางการ / วันเปิดตัว: **ยืนยันไม่ได้**

## 2. ทำอะไรได้ (ฟีเจอร์)

**ยืนยันไม่ได้สำหรับ SAD** (ไม่มีหน้าทางการให้อ่าน) คุณเป้ต้องดูจากคลิปเองว่ามีอะไรบ้าง ใช้เช็กลิสต์นี้ตอนดู:

- สร้างจาก ข้อความ / ภาพอ้างอิง / วิดีโอ?
- กี่เฟรมต่อท่า? กี่ทิศ (4 / 8)?
- สไตล์ pixel art ที่ snap กริดจริง หรือ painterly?
- export อะไร (PNG sheet, JSON atlas, GIF, แยกเฟรม, Aseprite)?
- ตัวละครหน้าตาคงเดิมทุกเฟรมไหม และมีจุดเท้านิ่งไหม (ดู 2 ข้อนี้ในคลิปให้ชัด เพราะเป็นปัญหาหลักของ AVEGEE)
- คลิปโชว์ผลที่ตัดต่อแล้วหรือโชว์ขั้นตอนจริงตั้งแต่ต้นจนจบ?

**ตัวอย่างความสามารถของเครื่องมือหมวดเดียวกัน (เพื่ออ้างอิงเท่านั้น ไม่ใช่ข้อมูลของ SAD)** — Ludo.ai Sprite Generator ตามหน้าทางการ ([ที่มา](https://ludo.ai/features/sprite-generator)):
- input: ข้อความ (32 สไตล์) / อัปโหลดภาพตัวละครเอง / keyframe ได้ 3 จุด / วิดีโออ้างอิง / preset ท่า 641 แบบ
- สูงสุด 64 เฟรม, animation ยาวสูงสุด 5 วินาที
- เปลี่ยนมุมได้ 8 ทิศ (แปลงจากภาพนิ่ง) และมี Directional Sprites จากโมเดล 3D สูงสุด 8 ทิศ
- export: PNG sheet โปร่งใส, GIF, MP4, แยกเฟรม, JSON atlas (รูปแบบ TexturePacker), normal map
- รองรับ Unity, Godot, Unreal, GameMaker, RPG Maker, และ Phaser/PixiJS ผ่าน JSON
- สไตล์ pixel 5 แบบ (4 แบบแรก snap กริด) และสไตล์อื่นเช่น hand-painted, anime
- ข้อจำกัดที่หน้าทางการเขียนเอง: Forge model จัดการรูปทรง/ท่าซับซ้อนได้ไม่ดี
- หมายเหตุ: ทั้งหมดนี้เป็นคำอธิบายของผู้ขายเอง ยังไม่มีการทดสอบอิสระ

## 3. ทำงานบนอะไร · ราคา · ใช้ AI ของใคร

SAD : Super Sprite: **ยืนยันไม่ได้ทั้ง 3 ข้อ**

ราคาของเครื่องมือหมวดเดียวกัน (ไว้ตั้งงบอ้างอิง):

| เครื่องมือ | ราคา | ที่มา |
|---|---|---|
| Ludo.ai Indie | $15/เดือน ($180/ปี), 3,000 credits/ปี (หน้าแสดงราคาแบบรายปี) | [ludo.ai/pricing](https://ludo.ai/pricing) |
| Ludo.ai Pro | $35/เดือน ($420/ปี), 12,000 credits/ปี | เดียวกัน |
| Ludo.ai Studio | $300/เดือน ($3,600/ปี) | เดียวกัน |
| Ludo.ai บัญชีใหม่ | 30 credits ฟรี ไม่ต้องใส่บัตร | [ludo.ai/features/sprite-generator](https://ludo.ai/features/sprite-generator) |
| Sorceress (ใช้ Retro Diffusion rd-animation) | จ่ายครั้งเดียว $49 (ตามบล็อกของผู้ขายเอง ยังไม่ได้ตรวจกับหน้าทางการ) | [sorceress.games](https://sorceress.games/blog/how-to-make-a-sprite-sheet-in-2-minutes-with-ai-in-2026) |

## 4. สิทธิ์เชิงพาณิชย์ และนโยบาย Steam

### เครื่องมือ SAD
**ยืนยันไม่ได้** ยังไม่มีเงื่อนไขการใช้งานให้อ่าน กฎก่อนใช้งานจริง: ต้องอ่านข้อกำหนดของตัวเครื่องมือเองก่อนจ่ายเงินหรือใส่ภาพลงเกม อย่าเชื่อคำโฆษณาในคลิป

### ตัวอย่างหมวดเดียวกัน: Ludo.ai
- ข้อกำหนดฉบับ ธ.ค. 2568 ตามผลค้นหา: ใช้ materials ได้ทั้งส่วนตัวและเชิงพาณิชย์ ตราบที่ถูกกฎหมายและเป็นไปตามข้อกำหนด และหน้าเปรียบเทียบของ Ludo เองระบุว่าไม่แยกแผนฟรี/จ่ายเงิน ([ที่มา](https://ludo.ai/compare/ludo-vs-scenario), [ไฟล์ข้อกำหนด](https://ludo.ai/documents/Jet%20Play%20Terms%20of%20Service%20and%20EULA%20(4%20Dec%202025).pdf))
- สถานะ: **ยังไม่ยืนยันเต็มรูปแบบ** เพราะไฟล์ PDF ข้อกำหนดอ่านเนื้อหาเต็มไม่ได้ (ได้เฉพาะข้อความที่ยกมาจากผลค้นหา) และฉบับ มี.ค. 2568 ใช้ถ้อยคำ "limited, revocable license" ต่างกัน ถ้าจะใช้จริงต้องให้คนเปิดอ่านไฟล์เต็มเอง
- ข้อควรระวังทั่วไป (ไม่ใช่คำของ Ludo): ภาพที่สร้างจาก AI อาจมีปัญหาลิขสิทธิ์ในหลายประเทศ ควรปรึกษานักกฎหมายก่อนขายจริง (นอกขอบเขตงานวิจัยนี้)

### นโยบาย Steam เรื่อง AI (ทางการ)
- แบบสำรวจเนื้อหา (Content Survey) ของ Steamworks แบ่ง 2 ประเภท: **Pre-Generated** = เนื้อหาที่ส่งมากับเกมและผู้เล่นได้ใช้ ที่สร้างด้วยเครื่องมือ AI ระหว่างพัฒนา Valve ตรวจเหมือนเนื้อหาที่ไม่ใช่ AI; **Live-Generated** = สร้างระหว่างเล่น ต้องอธิบาย guardrail เพิ่ม ([Steamworks Content Survey](https://partner.steamgames.com/doc/gettingstarted/contentsurvey) — อ้างจากข้อความที่ผลค้นหายกมา ตัวหน้าเว็บดึงตรงไม่สำเร็จ)
- ม.ค. 2569 Valve ปรับให้เน้นเนื้อหาที่ผู้เล่นเห็น/ได้ใช้ ไม่เน้นเครื่องมือช่วยงานเบื้องหลัง เช่น coding assistant ([PC Gamer](https://www.pcgamer.com/software/ai/steam-updates-ai-disclosure-form-to-specify-that-its-focused-on-ai-generated-content-that-is-consumed-by-players-not-efficiency-tools-used-behind-the-scenes/), [Generation Amiga](https://www.generationamiga.com/2026/01/17/valve-rewrites-steams-ai-disclosure-rules-for-developers/))
- **ผลต่อ AVEGEE:** sprite ที่ส่งมากับเกมและผู้เล่นเห็น ถือเป็นเนื้อหาที่ผู้เล่นใช้ → เข้าข่าย Pre-Generated ต้องแจ้งในแบบสำรวจ (ใช้แบบเดียวกันไม่ว่าจะใช้ Codex ImageGen หรือเครื่องมืออื่น ดังนั้น **การเพิ่มเครื่องมือ AI ใหม่ไม่ได้เพิ่มภาระนโยบาย Steam** ถ้าตอนนี้แจ้งอยู่แล้ว)
- ข้อควรระวังแหล่งข้อมูล: รายละเอียดของบทความรอง (Generation Amiga) มีบางจุดที่ขัดกัน (เช่นระบุว่า disclosure "ยังเป็นความสมัครใจ") จึงใช้เฉพาะประเด็นที่ตรงกับ PC Gamer และหน้า Steamworks · **ก่อนส่งเกมขึ้น Steam ต้องอ่านข้อความล่าสุดในแบบสำรวจเองอีกครั้ง**

## 5. ความน่าเชื่อถือ / รีวิว

- รีวิวจริงของ SAD : Super Sprite: **ไม่พบเลย** (ไม่มีหน้าเครื่องมือ ไม่มีกระทู้ ไม่มีรีวิว) ซึ่งในตัวมันเองเป็นสัญญาณให้ระวัง: เครื่องมือที่ตรวจสอบจากภายนอกไม่ได้ ไม่ควรจ่ายเงินหรือใส่ข้อมูลบัตร
- ข้อมูลเกี่ยวกับเครื่องมือหมวดนี้ที่ค้นเจอส่วนใหญ่เป็นบล็อก/ไดเรกทอรีของผู้ขายเองหรือเว็บ SEO ถือว่าเป็นโฆษณา ไม่ใช่รีวิวอิสระ
- สัญญาณจากฝั่งนักพัฒนา (แหล่งรอง): ผู้พัฒนา MP4toSprite เขียนว่า การให้ AI สร้าง sprite sheet ต่อเนื่องสมบูรณ์โดยตรงยัง "ยากมาก" จึงทำเครื่องมือแปลงวิดีโอ AI เป็น sprite แทน ([itch.io](https://yewlark.itch.io/mp4tosprite)) — สอดคล้องกับปัญหาเฟรมไม่ต่อเนื่องของ AVEGEE แต่เป็นความเห็นคนเดียว
- งานวิจัยวิชาการ Sprite Sheet Diffusion (CMU, 2024) ระบุว่าการสร้าง sprite sheet ที่คงความสม่ำเสมอของตัวละครยังเป็นโจทย์วิจัย ([arXiv 2412.03685](https://arxiv.org/html/2412.03685))

## 6. เทียบกับ pipeline ปัจจุบันของ AVEGEE

**หมายเหตุ:** คอลัมน์ "เครื่องมือ AI sprite ทั่วไป" เป็นการประเมินระดับหมวด จาก Ludo.ai เป็นตัวอย่าง **ไม่ใช่ผลของ SAD** ซึ่งประเมินไม่ได้

| ปัญหาของ AVEGEE | Codex ImageGen + SPA + Shado (ปัจจุบัน) | เครื่องมือ AI sprite หมวดเดียวกัน (ตามที่ผู้ขายอ้าง) | SAD : Super Sprite |
|---|---|---|---|
| เฟรมไม่ต่อเนื่อง / ตัวเพี้ยนระหว่างเฟรม | ยังเป็นปัญหา | ผู้ขายอ้างว่าแก้ได้ด้วยการ animate จากภาพตัวละครต้นฉบับ แต่ยังไม่มีการทดสอบอิสระ และตัวละครซับซ้อนยังเสี่ยง | ยืนยันไม่ได้ |
| จุดเท้าไม่นิ่ง | SPA จัดจุดเท้าได้ (หลังตัดเฟรม) | ไม่มีข้อมูลยืนยันว่าจัดให้ · ต้องพึ่ง SPA ต่ออยู่ดี | ยืนยันไม่ได้ |
| สไตล์ไม่เข้ากันข้ามชุด | ควบคุมด้วย prompt/ภาพอ้างอิงเอง | animate จากภาพของเราเองช่วยคุมสไตล์ได้ แต่ถ้าสร้างจากข้อความจะได้สไตล์ของโมเดล | ยืนยันไม่ได้ |
| หลายทิศทาง | ยาก (ทำมือทีละทิศ) / Shado ทำ 3D→2.5D ได้ | ผู้ขายอ้างเปลี่ยนมุม 8 ทิศ ([Ludo](https://ludo.ai/features/sprite-generator)) ส่วน FrameSprite ระบุเองว่า 8 ทิศยังเป็นฟีเจอร์ทดลอง ([framesprite.com](https://www.framesprite.com/)) | ยืนยันไม่ได้ |
| export sheet + JSON + GIF | SPA ทำได้อยู่แล้ว | หลายตัวมี PNG + JSON atlas + GIF ซ้ำกับ SPA | ยืนยันไม่ได้ |
| ต้นทุน | Codex/Shado ที่มีอยู่ | ค่าสมัครรายเดือน/ปี (ตัวอย่าง $15–35/เดือน) | ยืนยันไม่ได้ |

**ข้อสังเกตเชิงตรรกะ:** export เป็นส่วนที่ SPA ทำได้อยู่แล้ว คุณค่าที่เครื่องมือใหม่ควรเพิ่มคือ "ความต่อเนื่องของตัวละครระหว่างเฟรม" และ "หลายทิศทาง" เท่านั้น — ถ้า SAD ทำสองข้อนี้ไม่ได้จริงในคลิป ไม่ต้องสนใจ

## คำแนะนำ

- **คำตัดสินตอนนี้: ยังไม่ควรลง (ตัดสินไม่ได้)** — ไม่ใช่ "ไม่คุ้ม" และไม่ใช่ "ลองได้" เพราะไม่มีข้อมูลเครื่องมือเลย
- **ถ้ายืนยันตัวเครื่องมือได้ และมีแผนทดลอง** ให้ทดสอบแบบจำกัดความเสี่ยง (ฟรี/ไม่จ่ายก่อน):
  1. งานทดสอบ: ท่าเดิน 4 ทิศของ "คนงานวิญญาณ" หรือศัตรูโซน 1 ตัวหนึ่ง (ตัวที่สไตล์ยังไม่ล็อก ไม่ใช่ยามา) ใช้ภาพอ้างอิงที่ Codex ImageGen วาดไว้แล้ว
  2. เกณฑ์ผ่าน: ตัวละครหน้าตาเดิมครบทุกเฟรม · เท้าไม่ลอย (วัดหลังผ่าน SPA) · สีเข้ากับชุดเดิม · ได้ PNG โปร่งใส
  3. ก่อนใส่ภาพเข้าเกมจริง: อ่านเงื่อนไขการใช้เชิงพาณิชย์ฉบับเต็ม และเก็บสกรีนช็อต/วันที่ของข้อกำหนดไว้
- **ข้อควรระวัง:** อย่าสมัคร อย่าใส่บัตร อย่าติดตั้งโปรแกรมจากคลิปที่หาแหล่งทางการไม่เจอ (ความเสี่ยงมัลแวร์/หลอกขาย) จนกว่าจะมีเว็บทางการที่ตรวจสอบได้

## ข้อมูลที่ขอจากคุณเป้ เพื่อปิดงานนี้

1. ชื่อเพจ/ผู้โพสต์ของคลิป และแคปชันเต็ม
2. ลิงก์ที่แปะในคอมเมนต์หรือใต้คลิป (ถ้ามี)
3. สกรีนช็อต 2–3 ภาพจากคลิป โดยเฉพาะตอนที่เห็นหน้าจอเครื่องมือ/ชื่อ/ราคา
4. ถ้าเห็นกี่ทิศ กี่เฟรม ในคลิป จดมาด้วย

## รายการแหล่งอ้างอิง

- Facebook (เปิดไม่ได้): https://www.facebook.com/share/v/1M5MdM12JF/
- Super Sprites (Blender): https://superhivemarket.com/products/supersprites
- SuperSprite GameMaker: https://masharcade.itch.io/supersprite
- SuperSprite2D Godot: https://godotengine.org/asset-library/asset/3190
- Super Sprite Extractor (YouTube): https://www.youtube.com/watch?v=9rQiHM4nSpI
- SAD ใน LBA: https://lbafileinfo.kaziq.net/index.php/Sprite_actor_data
- Ludo.ai sprite generator: https://ludo.ai/features/sprite-generator
- Ludo.ai pricing: https://ludo.ai/pricing
- Ludo.ai เปรียบเทียบ/ข้อกำหนด: https://ludo.ai/compare/ludo-vs-scenario · https://ludo.ai/documents/Jet%20Play%20Terms%20of%20Service%20and%20EULA%20(4%20Dec%202025).pdf
- Steamworks Content Survey: https://partner.steamgames.com/doc/gettingstarted/contentsurvey
- PC Gamer (Steam AI disclosure): https://www.pcgamer.com/software/ai/steam-updates-ai-disclosure-form-to-specify-that-its-focused-on-ai-generated-content-that-is-consumed-by-players-not-efficiency-tools-used-behind-the-scenes/
- Generation Amiga (Steam AI rewrite ม.ค. 2569): https://www.generationamiga.com/2026/01/17/valve-rewrites-steams-ai-disclosure-rules-for-developers/
- MP4toSprite: https://yewlark.itch.io/mp4tosprite
- Sprite Sheet Diffusion (arXiv): https://arxiv.org/html/2412.03685
- FrameSprite: https://www.framesprite.com/
- Sorceress: https://sorceress.games/blog/how-to-make-a-sprite-sheet-in-2-minutes-with-ai-in-2026

## ข้อจำกัดของรายงานนี้
- ผล WebSearch/WebFetch ส่วนหนึ่งเป็นการสรุปของเครื่องมือค้น ไม่ได้อ่านหน้าต้นฉบับครบทุกหน้า (Steamworks Content Survey และไฟล์ข้อกำหนดของ Ludo.ai อ่านได้บางส่วนผ่านข้อความที่ผลค้นหายกมา)
- ไม่ได้ทดสอบเครื่องมือใดเลยตามข้อห้ามของใบงาน
- ราคาและข้อกำหนดเปลี่ยนได้ ตรวจเมื่อ 10 พ.ย. 2569

---

## อัปเดตโดย Claudy (10 พ.ย. 2569 ~13:30) — ระบุตัวได้แล้วจากคลิปที่คุณเป้อัดหน้าจอ
แหล่ง: เพจ https://www.facebook.com/Zunshiro · โพสต์โดย **Art Phanurak Rubpol** · คลิปอัดหน้าจอ `~/Desktop/Screen Recording 2569-11-10 at 13.11.09.mov` (10 นาที)
- **ไม่ใช่สินค้าที่ขาย** เป็นเครื่องมือ R&D ส่วนตัวใน **Unity 6 (URP)** (ชื่อโปรเจกต์บนแถบหน้าต่าง "URP Normal RnD – Enviro…") แคปชันบอกว่าทำขึ้นจาก "การผลาญ token เมื่อเดือนที่แล้ว" (เขียนด้วย AI ช่วย)
- ทำให้ **ภาพ 2D แบน ๆ (ภาพวาดตึกแถวไทย) รับแสงแบบ 3D**: Directional Light, Self/Cast/Receive/Soft Shadow, Point Light, Fog, Wetness (พื้นเปียก), Enviro Lighting + Reflection · ทดสอบต้นไม้พริ้วไหวแล้ว
- ผู้ทำบอกเองว่ายังขาด Metallic/Smoothness mask และยังต้องดู performance — "มีแนวโน้มใช้งานได้จริงแบบเฉพาะเจาะจงในบางโจทย์"
- ราคา/สิทธิ์เชิงพาณิชย์: ไม่มี (ยังไม่ได้ปล่อยให้ใช้) → ข้อ 2–4 ของรายงานเดิมจึงไม่ต้องตามต่อ

**กับ AVEGEE:** เอาเครื่องมือมาใช้ตรง ๆ ไม่ได้ (AVEGEE เป็นเว็บ JS ไม่ใช่ Unity) แต่ **เทคนิค** (ภาพวาด + normal/depth map → แสงเงาเคลื่อนไหวได้) ทำบน WebGL ได้ — เหมาะกับอาคาร/สถานีโซน 1 ที่ต้องรับแสงคบเพลิง/ลาวา/กลางวัน-กลางคืน · ต้องให้คุณเป้ตัดสินก่อนว่าอยากได้ (คนละเรื่องกับ DOF/parallax ที่ห้าม)
