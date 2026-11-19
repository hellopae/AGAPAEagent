# AVEGEE R2 ส่วน D · ชายแดน 3-4 → โซน 4 → ฉากจบ (บทหลัก v2)
ผู้เขียน: Rae · 19–20 พ.ย. 2569 · ใบงาน `Output/Claudy/briefs/2026-11-19-avegee-r2-story-v2-rae.md` (ส่วน D) · ต้นฉบับคุณเป้ `Output/Claudy/briefs/2026-11-18-avegee-owner-feedback-night.md` (G13 G27 G28 G29 G30 + D1–D7 + ต้นฉบับตรงตัวส่วน "โซน3 ;" ท้าย "โซน4 ;" และฉากจบ)
สถานะ: **ร่างพร้อมเสียบ · Reese ตรวจ 19 พ.ย. ได้ FIX LIST 9 ข้อ → Rae แก้ 1 รอบแล้ว (ดูท้ายไฟล์ "แก้ตาม Reese 19 พ.ย.") · รอ Claudy ตัดสินต่อ** · ไม่ได้แตะโค้ด ไม่ได้แก้ไฟล์บทเดิม · ต่อเนื่องจากส่วน A (`2026-11-19-avegee-r2a-zone1-2.md`) ส่วน B (`…-r2b-zone2-3.md`) และส่วน C (`…-r2c-zone3.md` ฉบับแก้ตาม Reese 19 พ.ย. + คำตอบคุณเป้ 20 พ.ย.)
อ่านโค้ดแล้ว (อ่านอย่างเดียว): `src/final-event.js` · `src/story.js` · `src/signal-arc.js` · `src/e1-content.js` (SIGNAL_STORIES) · `src/narrative-cutscenes.js` · `src/data.js` (BOSS_NAMES · FINAL_EVENT) · lore bible 28 ต.ค.
ข้อจำกัดเครื่องมือรอบนี้: ไม่มี grep ไม่มี shell เปิดรายชื่อไฟล์ใน `img/` ไม่ได้ · ช่อง "มีภาพเดิมใช้แทนได้ไหม" ตอบจากชื่อภาพที่ปรากฏในคำสั่งคุณเป้และในโค้ดที่อ่านเท่านั้น ที่ยังไม่ได้เปิดดูภาพจริงเขียนว่า **"Claudy ตรวจ"** · ยังไม่ได้อ่านบท `deva.cyberhell.*` และ `final.reinforcement.*` (หาไม่เจอในส่วนที่อ่าน)
คีย์ทั้งหมดเป็นข้อเสนอ Toby ปรับได้ · ตัวเลขศึก/คะแนนเป็นค่าตั้งต้น ไม่ได้รันซิม · คัตซีน หน้าต่างแจ้งเตือน บทสู้ ชื่อท่า และสำนวนไต่สวนมี TH/EN ครบ

---

## 0. ภาพรวมส่วน D

### 0.1 ลำดับเรื่อง (ฉบับ v2)
| ลำดับ | เหตุการณ์ | หัวข้อ | สถานะ |
|---|---|---|---|
| 1 | ชายแดน 3-4 · โคลอสเซียมของลูซิเฟอร์ 10 ด่าน (ธอร์ด่าน 9 · ลูซิเฟอร์ด่าน 10) → **ปลดล็อกอัญเชิญ ธอร์ + ลูซิเฟอร์** · ประตูโซน 4 เงียบ ไม่มียาม | 1 | ใหม่ (G27) |
| 2 | เข้าโซน 4: ไม่เจอใคร ซิสอ็อปกับพ่อค้านรกถูกเทวดาขัง → สู้ลูเมน-01 → ได้นาฬิกาวิเศษ → ปล่อย → สร้างสถานที่ได้ → **HOME-67 ออกจากทีมไปยืนที่ท่าเรือ + ให้เงิน 1,200 + ชุดโซน 4** (คำตอบคุณเป้ 20 พ.ย.) | 2 | ใหม่ (G28) |
| 3 | คดีครบ 4: ผู้เสียหาย AI Scammer · [PHANTOM-404] | 3 | ใหม่ |
| 4 | คดีครบ 7: ปีศาจบุกชายแดนล่าง · HOME-67 ร่วมทีม · โทรจัน-9 · WATSON-03 ช่วย · สู้ 4 ระลอก → บอส → ได้ WATSON-03 (Guard โซน 4) + quest เสริม WATSON-03 (G13) | 4 | ใหม่ |
| 5 | คดีครบ 8 · 9: คดีญาติยมทูตโซน 4 [PHANTOM-404] | 5 | ใหม่ |
| 6 | คดีครบ 10: ปีศาจที่ศาลา `st-sala` → HOME-67 เฉลย → สู้ AI Scammer Robot → โซน 1–3 ถูกยึด เรือใช้ไม่ได้ | 6 | ใหม่ |
| 7 | นอกชายแดน 3-4 เจอโทรจัน-9 ถูกควบคุม → เดินกลับทีละโซนผ่านชายแดน · อาคารไหม้ ยมทูตถูกควบคุม เหลือยามา + นิรา → สู้ ทัณฑสูร / อากุระ / วาลดริก → โซน 1–3 กลับปกติ + ปลดล็อกท่าเรือ | 7 | ใช้ SIG เดิม + แก้ (D6) |
| 8 | กลับโซน 4 · **คดีครบ 15**: อาร์คอน-ศูนย์ + HOME-67 ถูกมัด → ปีศาจ 3 ระลอก → กองหนุนทุกโซน → หัวหน้าถูกสิง 4 คน → บอสสุดท้าย → จบเกม → ฉากจบ | 8 | ใช้ finale เดิม + แก้ |
| 9 | quest เสริม HOME-67: จับลูแปง (G29) → **ปลดล็อกอัญเชิญลูแปง** | 9 | ใหม่ |

### 0.2 ส่วนไหนของบทเดิมยังใช้ / ถูกแทน (อ้างโค้ดที่อ่านแล้ว · อ่านอย่างเดียว)
| บทเดิม | สถานะ | ใน v2 |
|---|---|---|
| `story.js` `deva-cyberhell` (ลูเมน-01 intro · ภาพ `deva-intro-cyberhell-v1`) | **ใช้ต่อ** · ผมไม่ได้อ่านข้อความ `deva.cyberhell.arrival` | หัวข้อ 2 · เล่นต่อด้วย `z4-lumen-open` |
| `story.js` `cyber-approach` ("สี่ระลอกก่อนกำลังเสริม") | **ข้อความถูกแทน** (คุณเป้เปลี่ยนเป็น 3 ระลอก · ภาพ `story-cyberhell-01-v2` ใช้ต่อ) | หัวข้อ 8.2 |
| `story.js` `cyber-reinforcements` · `cyber-reinforcements-advance` | **ใช้ภาพต่อ · ข้อความถูกแทน** (สี่ระลอก → สามระลอก · เพิ่มบรรทัดตัวละคร) | หัวข้อ 8.3 |
| `story.js` `cyber-control` · `cyber-duel` | **ข้อความใช้ต่อ + เพิ่มบทหัวหน้าทีละคน** | หัวข้อ 8.4 · 8.5 |
| `story.js` `ending-capture` · `ending` (3 หน้า) | **ใช้ตรงตัว** + เพิ่มบทท้ายฉากจบ (ไม่บังคับ) | หัวข้อ 8.7 |
| `final-event.js` minion 4 ระลอก (`minion:1..4` · `ลูกน้องระลอก n/4`) | **ถูกแก้เป็น 3 ระลอก** (งานโค้ด Toby) · ลำดับ ruler th→asia→west→cyberhell + `boss` ใช้ต่อ | หัวข้อ 8.1 |
| `final-event.js` reinforcements (ภาพ `crew-plerng` `crew-dam` `crew-boon` `crew-guard`) | **ใช้ต่อ** · ชื่อ `final.reinforcement.<zone>` ผมหาไม่เจอ → เขียนชื่อใหม่ในหัวข้อ 8.3 | หัวข้อ 8.3 |
| `signal-arc.js` `cyberSignal` (โทรจัน-9 ถูกครอบงำ · `atCases:7` · `requires cyberBreach`) | **ใช้ + ย้ายเวลา**: เดิมขึ้นที่คดี 7 → ใหม่ขึ้นหลังชนะ AI Scammer Robot (คดี 10) ตอนเดินออกนอกชายแดน 3-4 | หัวข้อ 7 · Toby ปรับเงื่อนไข |
| `signal-arc.js` `signalTh` `signalAsia` `signalWest` + `signalClose` | **ใช้ต่อ** (ศึก ค่าสถานะ รางวัลเดิม) · บท `signal-*-open/win` **ใช้ตรงตัว** · เพิ่มคัตซีนไฟไหม้/ยมทูตถูกควบคุม/ปลดล็อกท่าเรือต่อหน้าและท้าย | หัวข้อ 7 |
| `e1-content.js` `cyber-signal-open` (3 หน้า) | **ใช้ตรงตัว** | หัวข้อ 7.1 |
| `e1-content.js` `cyber-signal-win` หน้า 2 "ไปทีละโซน" (นิราเปิดทางเรือทุกท่า) | **ถูกแทน** · ขัดกับ D6 (เรือใช้ไม่ได้ ต้องเดินผ่านชายแดน) · หน้า 1 ใช้ตรงตัว | หัวข้อ 7.1 |
| `e1-content.js` `cyber-signal-close` (3 หน้า) | **ใช้ตรงตัว** | หัวข้อ 7.5 |
| `narrative-cutscenes.js` โทรจัน-9 intro ("ข้าคือม้าไม้ปีศาจ...") ภาพ `frontier-cyberhell-intro-v1` | **ใช้ตรงตัว** (คัตซีนที่คุณเป้ระบุในคดี 7) | หัวข้อ 4 |
| `data.js` `FINAL_EVENT` ตำแหน่ง/รางวัล · `BOSS_NAMES` | **ใช้ตรงตัว** | — |
| `Output/Rae/2026-11-15-avegee-z3-events.md` ส่วนท้าย (ถ้ามีบทโซน 4 · ผมไม่ได้อ่านเพราะ z3 เดิมเป็นโซน 3) | ไม่เกี่ยว | — |

### 0.3 น้ำเสียงตัวละครใหม่ในส่วน D
| ตัวละคร | สรรพนาม / ท่วงทำนอง |
|---|---|
| ลูซิเฟอร์ (เจ้าของโคลอสเซียม) | "ข้า / เจ้า" โอ่อ่า เป็นโปรโมเตอร์สังเวียน พูดเหมือนประกาศบนเวที เคารพกติกาของสังเวียนเหนือสิ่งอื่น ไม่โหด ไม่พูดเรื่องศาสนา ไม่แตะสัญลักษณ์ใดทั้งสิ้น |
| ธอร์ | "ข้า / เจ้า" เสียงดังหัวเราะง่าย ซื่อ เป็นแชมป์ที่ชอบคนสู้จริง ไม่ดูถูกผู้แพ้ |
| ผู้ต่อสู้ด่าน 1–8 | ตัวละครสังเวียน ไม่ใช่ศัตรูแค้นยามา ทุกคนพูดสั้น (1–2 บรรทัดก่อนสู้ 1 บรรทัดหลังสู้) |
| HOME-67 | "ผม / คุณ" ลงท้าย "ครับ" ตามส่วน C · ส่วนนี้ **เรียกชื่อศัตรูได้แล้ว** (ดูหัวข้อ 6) |
| WATSON-03 | "กระผม / ท่าน" หรือ "ผม / คุณ" ลงท้าย "ครับ" เป๊ะ ตรง ตอบตามตัวอักษรเล็กน้อย ใจดีโดยไม่รู้ตัว · เรียกยามาว่า "ท่านยมบาทน้อย" · ไม่ตลกแบบล้อใคร · ห้ามใช้ประโยคเด่นของนักสืบ/ผู้ช่วยฉบับใดฉบับหนึ่ง |
| ลูแปง | "ข้า / ท่าน" กระซิบเก่ง ชอบชมคนที่จับตัวเขาได้ ไม่ขโมยของคนจน |
| AI Scammer Robot | พูดด้วยเสียงสังเคราะห์สุภาพเกินจริง ใช้ประโยคแบบข้อความหลอก (คำขอโทษ "ยืนยันตัวตน") · ไม่ด่า |
| อาร์คอน-ศูนย์ | "ข้า / เจ้า" เย็น เป็นระบบ เรียกคนว่า "รายการ" · ไม่โวยวาย |
| หัวหน้าถูกสิง (พญายมบาท · จ้าวเหวิน · ฮาลวาร์ · เน็กซาร) | พูดตามคำสั่ง เป็นเสียงเดิมของแต่ละคนที่ขาด ๆ หาย ๆ (แบบ SIG เดิม "ขวาง ... ไว้ ... ทุก ... ทาง") |

### 0.4 ข้อตกลงที่ใช้ในไฟล์นี้ + รับช่วงจาก "ผลกระทบต่อส่วน D" ของส่วน C
1. **ทีมชายแดน 3-4 = ยามา + นิรา + HOME-67** (D7) · ในโซน 3 ยามาแต่งชุดโซน 3 · ชุดโซน 4 ได้ที่หัวข้อ 2.5 (G9 วาดชุดใหม่)
2. **เงิน 1,200 เบี้ยกรรม + ชุดโซน 4: HOME-67 เป็นคนให้ หลังชนะลูเมน-01 แล้วไปยืนที่ท่าเรือ** (คุณเป้ตอบ 20 พ.ย.) → หัวข้อ 2.5
3. **HOME-67 เฉลยผู้อยู่เบื้องหลังในส่วนนี้** (คุณเป้ตอบ 20 พ.ย.) → หัวข้อ 6 · ค่าตอบแทนข้อเดียวในส่วน C ("ถ้าถึงวันที่ผมต้องพูดชื่อนั้น ขอให้คุณยืนอยู่ข้างหน้าผม") ถูกเรียกคืนในหัวข้อ 6.3 · บท "[PHANTOM-404] เป็นแค่ลายนิ้วมือ ไม่ใช่ใบหน้า" ถูกเรียกคืนในหัวข้อ 6.2
4. **ลูกโซ่เบาะแส PHANTOM-404:** สีดา → ฝูงลิง → ใบเวรโพเอน่า (`z3-clear`) → ยอดค้างเซเวอริน (`z3-sev-win` หน้า 3) → **คดี 4 (AI Scammer) → คดี 8 · 9 → คดี 10 เฉลย** (หัวข้อ 3 · 5 · 6)
5. **โซน 1–3 ถูกยึด (D6):** ทัณฑสูร (โซน 1) · อากุระ (โซน 2) · วาลดริก (โซน 3) ถูกอาร์คอน-ศูนย์ควบคุม · **Guard และเซอร์เบอรัสไม่ถูกควบคุม** (ข้อเสนอของผมตามส่วน C ข้อ 4: แวน เฮลซิงต้านเสียงกล่อมได้ · เซอร์เบอรัสไม่พูด ยืนเฝ้า · กุมภัณฑ์/กวนอูยืนที่ประตูของตน) → **ต้องให้คุณเป้ตัดสิน ข้อ 4** · ยมทูตทุกคนถูกควบคุม
6. **ตัวอัญเชิญที่เหลือ:** **ธอร์ · ลูซิเฟอร์ · ลูแปง** ปลดล็อกในส่วนนี้ → ครบ **12 ตัว** (หนุมาน · กุมารทอง · ยมทัต · หงอคง · เหลียนกัง · ริวจิน · มูซาชิ · เอียร์ลิน · ยอร์มุนกันดร์ · ธอร์ · ลูซิเฟอร์ · ลูแปง) · กติกาตามส่วน A: ท่าไม้ตาย 3 ครั้ง เติมที่หอกระจก ปลดล็อกเมื่อจบ event ของตัวนั้น (D4) หน้าต่างรูปแบบ NA-2 · ไม่ใช่ตัวอัญเชิญ: WATSON-03 (Guard) · HOME-67 (ลูกทีม) · อาร์คอน-ศูนย์ · ลูเมน-01
7. คำเตือนมูซาชิ ("ตะวันตกไม่เหมือนบูรพา ศัตรูบางตัวไม่ชักอาวุธก่อน") ถูกเรียกคืนครบในส่วน C แล้ว · นิราเคยถูกสะกดแล้วครั้งหนึ่ง (ส่วน C) ใช้เป็นเหตุผลได้ในหัวข้อ 7
8. เอียร์ลินกับคลื่นถอย / โลกิกับ "ลูกของข้า" ปูทางยอร์มุนกันดร์ครบแล้ว **ไม่ต้องเก็บในส่วน D**
9. ชื่อ: "ยามา" (หน้าต่างแจ้งเตือน) · "ยมบาทน้อย" (ป้ายผู้พูดในบท) · "เบี้ยกรรม" · "โทรจัน-9" · "ลูเมน-01" · "อาร์คอน-ศูนย์" · "ซิสอ็อป" ฯลฯ ตาม lore bible · **โซน 4 = "นรกเครือข่าย"** (ตามบท `narrative-cutscenes.js` "ชายแดนนรกเครือข่าย") → ต้องให้ Claudy/Toby ยืนยันชื่อทางการของโซนใน `ZONES` (ผมไม่ได้เปิด)

## 1. ชายแดน 3-4 · โคลอสเซียมของลูซิเฟอร์ (G27)

ต้นฉบับ: "ชายแดนโซน 3-4 ในถ้ำเจอ คอลโลเซียม ที่ ลูซิเฟอร์ เป็นผู้ก่อตั้ง · จับปีศาจ วิญญาณต่างๆมาสู้กันเพื่อความสนุก (ต่อสู้เป็นขั้นบันไดไป เจอศัตรู ดังๆในนี้) · วาดตัวละครใหม่ และ cutscene โจมตี · 1 ซามูไร · 2 นินจา (D3: นินจาธรรมดา สู้ปกติ ไม่ถอนตัว) · 3 นักมวยไทย นายขนมต้ม · 4 มิโนทอร์ · 5 เมดูซา · 6 โจรสลัด · 7 มนุษย์ต่างดาว · 8 หุ่นยนต์ตัวใหญ่ · 9 ธอร์ (ชนะแล้ว อัญเชิญได้) · 10 ลูซิเฟอร์ (ชนะแล้ว อัญเชิญได้) · และเมื่อเดินไปถึงประตูโซน 4 เงียบมาก ไม่มียามอะไรเฝ้าอยู่ สามารถเดินเข้าประตูได้เลย"

**ข้อควรระวังเนื้อหา [R]:**
- **ลูซิเฟอร์:** เป็น **เจ้าของโคลอสเซียมในโลกของเกม** เท่านั้น · ไม่เรียกว่าซาตาน ปีศาจร้าย หรือเจ้าแห่งนรก · ไม่มีเขา ไม่มีสัญลักษณ์ศาสนา ไม่มีบทล้อเลียนหรือเสียดสีศาสนาใด ไม่มีบทที่ยามาหรือใครสวดหรือขับไล่ · เขาเป็นโปรโมเตอร์สังเวียนที่ถือกติกา · **Reese ตรวจ 19 พ.ย.: ผ่าน ไม่ล้อศาสนา (ไม่มีเขา/ปีก/สัญลักษณ์) · ห้ามเพิ่ม เปียโน ไนต์คลับ สูท (กลิ่นลูซิเฟอร์ฉบับทีวี) · รอบ ship ส่ง chris-culture**
- **ธอร์:** เทพในปกรณัมนอร์ส (ผู้นับถือ Ásatrú ยังมี · **Reese ตรวจ 19 พ.ย.: ธอร์ไม่มีข้อแก้**) · เขียนเป็นแชมป์สังเวียนผู้ซื่อ ไม่ล้อ ไม่ใช้ประโยคหรือชุดเด่นของฉบับภาพยนตร์/การ์ตูนใด (ไม่เอ่ย "อัสการ์ด" ไม่ใช้ผ้าคลุมแดน) ค้อน = "ค้อนสายฟ้า"
- **นายขนมต้ม:** บุคคลในประวัติศาสตร์/ตำนานของไทย (ตามเรื่องเล่าว่าชนะนักมวยพม่าติดต่อกัน 10 คนต่อหน้าพระมหากษัตริย์พม่า) · เขียนด้วยความเคารพ เป็นนักสู้ที่เดินเข้าสังเวียนด้วยตัวเอง ไม่ใช่ตัวตลก · **[R] Reese ตรวจ 19 พ.ย.: ผ่านด้านความเคารพ** (เกมให้ลงสังเวียนเองต่างจากตำนานเชลย) · แก้ธรรมเนียมมวยไทยตามข้อ 1.4 (มงคล/ประเจียด · ดูหัวข้อ 1.5) · รอบ ship ส่ง chris-culture
- **มิโนทอร์ · เมดูซา:** ตำนานกรีก (ไม่ใช่ศาสนาที่ยังมีผู้นับถือเป็นหลัก) · เมดูซาเขียนแบบโศกเศร้า ไม่ชั่ว · ไม่มีภาพเลือด ไม่มีภาพกินคน
- **ซามูไร · นินจา · โจรสลัด · มนุษย์ต่างดาว · หุ่นยนต์ยักษ์:** ตัวละครแบบทั่วไป (archetype) **ไม่ใช้ตัวเฉพาะจากการ์ตูน/ภาพยนตร์/เกมใด** (ไม่ใช่ซีโนมอร์ฟ ไม่ใช่หุ่นรบในอนิเมะใด) · ซามูไรไม่ใช่มูซาชิ (มูซาชิเป็นเพื่อนของยามา)
- **จริยธรรมของสังเวียน:** ผู้สู้ทุกตัว "ลงชื่อเอง" ไม่ถูกจับมาทรมาน · ไม่มีเลือดชัด ไม่มีภาพตาย ผู้แพ้ถอยออกจากสังเวียนไปพักเหมือนกีฬา

### 1.1 ลำดับ
ทีม (ยามา + นิรา + HOME-67) เดินในถ้ำชายแดน 3-4 → คัตซีน `z34-arrive` (2 หน้า) → ประตูโคลอสเซียม `col-gate` (2 หน้า) → N-COL-1 → **ด่าน 1 → 10 ต่อเนื่อง** (ทุกด่านมีแบนเนอร์ + คัตซีนท่าโจมตีของคู่ต่อสู้ + บรรทัดก่อน/หลังสู้) → ด่าน 9 ชนะ `col-thor-win` + NT-1 (ปลดล็อกธอร์) → ด่าน 10 `col-lucifer-open` → สู้ → ชนะ `col-lucifer-win` + NL-1 (ปลดล็อกลูซิเฟอร์) → ผู้สู้ที่ลงชื่อไว้ได้รับเปิดทางออก → ประตูโซน 4 `z4-gate-silent` → เข้าโซน 4
- ชนะทุกด่านครบจึงผ่านโคลอสเซียมได้ (เส้นทางตรง) · ระหว่างด่านออกไปพักที่ปากถ้ำ (พ่อค้านรกยืนหน้าถ้ำ · G3) แล้วกลับเข้ามาต่อด่านเดิมได้ · แพ้ = ลองด่านเดิมใหม่ ไม่เสียอะไร
- ด่าน 2 = **นินจาธรรมดา สู้ปกติ** (D3) ไม่มีบรรทัดถอนตัว

### 1.2 หน้าต่างแจ้งเตือน
**N-COL-1 · เมื่อเดินถึงปากโคลอสเซียม**
- หัวข้อ: โคลอสเซียมของลูซิเฟอร์ · EN: Lucifer's Colosseum
- ข้อความ: ทางผ่านชายแดนนี้ต้องผ่านสังเวียน 10 ด่านทีละคู่ ชนะต่อเนื่องจึงผ่านได้ แพ้แล้วลองด่านเดิมใหม่ได้ ไม่เสียอะไร
- EN: The road through this frontier runs through a ten-bout arena, one opponent at a time. Win in sequence to pass. If you lose, you may try the same bout again at no cost.
- ปุ่ม: เข้าสังเวียน · EN: Enter the arena

**N-COL-2 · แบนเนอร์ด่าน** รูปแบบ: ไทย "ศึกสังเวียน ด่านที่ N · <ชื่อคู่ต่อสู้>" · EN "Arena bout N · <opponent>"

**NT-1 · ปลดล็อกธอร์** (รูปแบบ NA-2 ส่วน A)
- หัวข้อ: ธอร์ฝากค้อนไว้ในตะเกียง · EN: Thor Leaves a Hammer in the Lamp
- ข้อความ: ธอร์ยอมรับเป็นพันธมิตรของท่าน เรียกเขาในศึกได้ ท่าไม้ตายใช้ได้ 3 ครั้งก่อนต้องเติมพลังที่หอกระจก
- EN: Thor accepts you as an ally. You can call him in battle, 3 special moves before a recharge at the Mirror Tower.
- ปุ่ม: ดูตะเกียง · EN: See the Lamp

**NL-1 · ปลดล็อกลูซิเฟอร์**
- หัวข้อ: ผู้ก่อตั้งสังเวียนฝากชื่อไว้ในตะเกียง · EN: The Arena's Founder Leaves His Name in the Lamp
- ข้อความ: ลูซิเฟอร์รับคำท้าและฝากชื่อไว้ในตะเกียงวิเศษ ท่านเรียกเขาในศึกได้ ท่าไม้ตายใช้ได้ 3 ครั้งก่อนต้องเติมพลังที่หอกระจก
- EN: Lucifer accepts the challenge and leaves his name in the Magic Lamp. You can call him in battle, 3 special moves before a recharge at the Mirror Tower.
- ปุ่ม: ดูตะเกียง · EN: See the Lamp

### 1.3 คัตซีนมาถึงชายแดน 3-4 `z34-arrive` (2 หน้า)
```js
'z34-arrive': { title:{ th:'ถ้ำที่เสียงดัง', en:'The Cave That Roars' }, pages:[
  { title:{ th:'พ่อค้านรกหน้าถ้ำ', en:'The Hell Merchant at the Mouth' }, line:{ th:
    'บรรยาย: ชายแดนระหว่างโซน 3 กับโซน 4 เป็นถ้ำหินสีเทาเหล็กที่เสียงเชียร์ดังออกมาถึงปากทางตั้งแต่ไกล พ่อค้านรกตั้งแผงเล็กหน้าถ้ำแล้ว ยามา นิรา และ HOME-67 ก้าวเข้ามาใต้เพดานสูง ผนังสองข้างแขวนแผ่นป้ายชื่อนักสู้ไม่ซ้ำกันเรียงเป็นแถว\n'
  + 'พ่อค้านรก: "ท่านมาถึงแล้ว ข้ามีของจะขาย แต่ตอนนี้ข้าขายตั๋วเชียร์ได้ดีกว่า ท่านจะผ่านตรงนี้ต้องผ่านสังเวียน ข้าไม่อยากเสียลูกค้าไป"\n'
  + 'HOME-67: "ป้ายชื่อบนผนังมีลายมือเจ้าของเขียนเองทุกแผ่น ผมอ่านได้ว่าทุกคนเขียนด้วยมือที่ไม่สั่น นี่ไม่ใช่คุกครับ แต่ผมยังไม่แน่ใจว่าเป็นอะไร"',
    en:
    'Narration: The frontier between Zone 3 and Zone 4 is an iron-grey cave whose cheering carries all the way to its mouth. The hell merchant has already set up a small stall outside. Yama, Nira and HOME-67 step beneath the high ceiling, where name-plaques of fighters, no two alike, hang in rows along both walls.\n'
  + 'Hell Merchant: "You are here. I have goods to sell, but tonight I sell cheering-tickets better. To pass this place you must pass the arena. I do not want to lose a customer."\n'
  + 'HOME-67: "Every plaque is signed in its owner\'s own hand, and every hand is steady. This is not a prison, but I am not yet sure what it is."' } },
  { title:{ th:'ลงชื่อเอง', en:'Signed By Their Own Hand' }, line:{ th:
    'นิรา: "ท่านคะ ดิฉันตรวจสัญญาที่ติดข้างป้ายแล้ว ทุกฉบับระบุว่า ชนะสิบด่านติดแล้วเป็นอิสระค่ะ แต่ดิฉันไม่พบชื่อใครที่เคยครบสิบด่าน"\n'
  + 'ยมบาทน้อย: "ผมจะอ่านสัญญาให้จบก่อนครับ แล้วค่อยตัดสินว่าสังเวียนนี้ผิดหรือไม่ผิด"\n'
  + 'พ่อค้านรก: "ท่านผู้ถือบัญชี ข้าแนะนำว่าสังเวียนนี้เจ้าของไม่ตอบคำถามที่ไม่ได้ซื้อตั๋ว"',
    en:
    'Nira: "Sir, I have examined the contracts posted beside the plaques. Every one states that ten wins in a row buys freedom. But I cannot find the name of anyone who has ever completed ten."\n'
  + 'Yama: "I will read the contract to the end first. Then I will judge whether this arena is wrong or not."\n'
  + 'Hell Merchant: "Keeper of the ledger, I advise you that the owner of this arena answers no questions from anyone who has not bought a ticket."' } },
]},
```

### 1.4 ประตูโคลอสเซียม `col-gate` (2 หน้า · เสียงลูซิเฟอร์)
```js
'col-gate': { title:{ th:'ประกาศจากบนอัฒจันทร์', en:'An Announcement From the Stands' }, pages:[
  { title:{ th:'ผู้ก่อตั้ง', en:'The Founder' }, line:{ th:
    'บรรยาย: ประตูเหล็กบานคู่เปิดเข้าสู่สังเวียนหินวงกลมที่มีอัฒจันทร์ขึ้นเป็นชั้น ๆ ผู้ชมเป็นเงาวิญญาณและปีศาจเล็กนั่งแน่นไม่มีใครส่งเสียงจนกว่าชายคนหนึ่งจะยกมือ เขาสูงยืนบนระเบียงสูงสุด ผมเงินยาว เสื้อคลุมดำปักขอบทอง ไม่มีเขา ไม่มีปีก ถืออยู่แค่ไม้เท้าตรงยาวเสมออกเหมือนไม้ประกาศ\n'
  + 'ลูซิเฟอร์: "ท่านทั้งหลาย ข้า ลูซิเฟอร์ ผู้ก่อตั้งสังเวียนนี้ ขอต้อนรับผู้ท้าชิงสามคน หนึ่งในนั้นถือบัญชี หนึ่งในนั้นถือแผ่นกระจก ไม่ต้องกลัว ข้าไม่เคยบังคับใครให้ขึ้นสังเวียน ข้าเพียงเปิดประตู"\n'
  + 'ยมบาทน้อย: "ผมขออ่านสัญญาของผู้สู้ทุกคนก่อน ถ้าทุกฉบับถูกเซ็นด้วยความสมัครใจ ผมจะสู้ตามกติกาครับ"',
    en:
    'Narration: A double iron door opens into a circular stone arena with tiers of stands. The audience of shades and small demons sits packed and silent until one man raises his hand. He stands tall on the highest balcony, long silver hair, a black cloak embroidered with gold at the hem. No horns, no wings. He holds only a straight staff, chest-high, like a herald\'s rod.\n'
  + 'Lucifer: "Ladies and gentlemen, I, Lucifer, founder of this arena, welcome three challengers. One of them carries a ledger, one of them carries a pane of glass. Do not be afraid. I have never forced anyone into this arena. I only open the door."\n'
  + 'Yama: "I ask to read every fighter\'s contract first. If each was signed freely, I will fight by the rules."' } },
  { title:{ th:'ข้อสิบ', en:'Clause Ten' }, line:{ th:
    'ลูซิเฟอร์: "ท่านอ่านเถิด ข้ามีสำเนาครบทุกคน ข้อสิบเขียนว่า ชนะสิบด่านติดแล้วเป็นอิสระ ข้าไม่เคยผิดสัญญาข้อนี้ เพียงแต่ยังไม่มีผู้ใดชนะครบสิบ ข้าจึงยังไม่ต้องจ่าย"\n'
  + 'นิรา: "ท่านคะ ข้อความเป็นความจริงค่ะ สัญญาไม่มีกลโกงในตัวอักษร"\n'
  + 'ยมบาทน้อย: "ผมรับกติกาครับ ถ้าผมชนะครบสิบด่าน ผมขอให้ท่านเปิดทางออกให้ผู้สู้ทุกคนที่อยากไป"\n'
  + 'ลูซิเฟอร์: "ข้ารับคำท้า ข้ารักผู้ที่อ่านสัญญาก่อนเซ็น ด่านที่หนึ่ง เชิญ!"',
    en:
    'Lucifer: "Read on. I keep a copy for every fighter. Clause ten says that ten wins in a row earn freedom. I have never broken that clause. Simply, no one has yet won ten, so I have yet to pay."\n'
  + 'Nira: "Sir, it is true. The wording holds no trick."\n'
  + 'Yama: "I accept the rules. If I win all ten, I ask that you open the way out for every fighter who wishes to leave."\n'
  + 'Lucifer: "I accept your challenge. I love those who read before they sign. Bout one, if you please!"' } },
]},
```
- ภาพ: ตารางภาพ หัวข้อ 11 กลุ่ม COL (C1 C2)

### 1.5 ด่าน 1–8 (ข้อมูลต่อด่าน · ตัวเลขศึก Toby จูน)
ทุกด่านมี: **ก่อนสู้ 1 บรรทัด · หลังชนะ 1 บรรทัด · คัตซีนท่าโจมตีของคู่ต่อสู้ 1 ภาพ (ใช้ตอนใช้ท่าเด่น)** · คีย์ `col-sN-pre` `col-sN-win` `cut-col-sN` · ผู้ประกาศ = ลูซิเฟอร์บนอัฒจันทร์ (ประกาศชื่อคู่ต่อสู้ 1 บรรทัดต่อด่าน)

| ด่าน | คู่ต่อสู้ (TH / EN) | ก่อนสู้ (TH / EN) | หลังชนะ (TH / EN) | ท่าโจมตี (TH / EN) |
|---|---|---|---|---|
| 1 | ซามูไรไร้นาย / The Masterless Samurai | "ข้ารับค่าจ้างเป็นเกียรติ ไม่ใช่เงิน ขอท่านสู้ให้คุ้ม" / "I am paid in honour, not coin. Make the fight worth it." | "ดาบข้าไม่ใช่ดาบที่ไว้ใจได้เท่าท่าน ข้าขอถอยอย่างเรียบร้อย" / "My blade is not as steady as yours. I withdraw in good order." | ประกายดาบหนึ่งเดียว / One-Draw Flash |
| 2 | นินจาธรรมดา / The Plain Ninja (D3) | "ข้าไม่มีนามให้ประกาศ ท่านไม่ต้องจำข้า" / "I have no name to announce. You need not remember me." | "ท่านเห็นข้าได้ก่อนข้าเห็นท่าน ข้ายอมรับ" / "You saw me before I saw you. I concede." | เงาหลังฉาก / Shadow Behind the Curtain |
| 3 | นายขนมต้ม นักมวยไทย / Nai Khanom Tom, Muay Thai Fighter | "ข้าขึ้นสังเวียนมาก็เพื่อพิสูจน์มือ ขอไหว้ก่อนชกตามธรรมเนียม" / "I climbed into the ring to prove my hands. I ask to pay respects before we fight, as is the custom." | "ฝีมือดี ใจนิ่ง ไหว้ท่านอีกครั้งจากใจ" / "Good hands, a steady heart. I pay you my respects again, and mean it." | ศอกกลับ / Reverse Elbow |
| 4 | มิโนทอร์ผู้เฝ้าเขาวงกต / The Minotaur Keeper of the Maze | "ข้าไม่เคยเห็นใครเดินออกจากเขาวงกตได้ ท่านเป็นรายแรกหรือไม่" / "I have never seen anyone walk out of the maze. Will you be the first?" | "ท่านอ่านทางข้าออก ข้ายอมให้ผ่าน" / "You read my path. I let you through." | พุ่งขวิดเขาวงกต / Labyrinth Charge |
| 5 | เมดูซา / Medusa | "อย่าสบตาข้านานเกินไป ข้าไม่อยากให้ท่านแข็ง ข้าอยากให้ท่านสู้" / "Do not hold my eyes for too long. I do not want you to freeze. I want you to fight." | "นานแล้วที่ไม่มีใครมองข้าแล้วยังยืนอยู่ ขอบใจ" / "It has been long since anyone looked at me and still stood. Thank you." | สายตาหินแข็ง / Gaze of Stone (ลดความเร็วทีม 1 รอบ) |
| 6 | กัปตันโจรสลัดคลื่นเงิน / Captain Silverwave, Pirate | "ข้าชนะมาแปดครั้ง ท่านจะเป็นครั้งที่เก้าที่ล้มข้าได้หรือเปล่า" / "I have won eight times. Will you be the ninth to bring me down?" | "ธงข้าตกแล้ว ท่านเอาไปไม่ได้ แต่ท่านสมควรได้ชื่อไปเล่าต่อ" / "My flag is down. You cannot have it, but you deserve a name to tell of." | ปืนใหญ่ไล่คลื่น / Broadside |
| 7 | ผู้มาเยือนจากดาวเก่า / The Visitor From an Old Star | "ข้าไม่เข้าใจกติกาของท่าน แต่ข้าเข้าใจการชนะ" / "I do not understand your rules, but I understand winning." | "ท่านสู้เหมือนผู้ที่รู้ว่าข้าเป็นใคร ข้าพอใจ" / "You fight like one who knows what I am. I am content." | ลำแสงสแกนร่าง / Scanning Beam |
| 8 | ยักษ์เหล็กซี-8 / C-8, the Steel Colossus | "[กำลังประมวลผล: ผู้ท้าชิง 3 คน ความน่าจะเป็นชนะ 4%] ข้าจะสู้ตามคำสั่ง" / "[Processing: 3 challengers, win probability 4%] I will fight as ordered." | "[ผลคำนวณผิดพลาด] ข้าบันทึกว่าท่านสูงกว่าตัวเลข" / "[Calculation error] I record that you exceeded the numbers." | หมัดเหล็กจากฟ้า / Iron Fist From Above |
- บรรทัดของยักษ์เหล็กซี-8 ใช้รูปแบบข้อความระบบ ไม่ใช่เสียงตลก · ไม่ใช้ชื่อหรือคำพูดของหุ่นรบในอนิเมะ/ภาพยนตร์ใด · **ชื่อ EN ทุกจุดใช้ `C-8, the Steel Colossus`** (ไม่ใช้ "The Iron Giant" เพราะชนชื่อภาพยนตร์ปี 1999 · Reese 19 พ.ย. ข้อ 1.1) · TH คง "ยักษ์เหล็กซี-8"
- **นายขนมต้ม (ด่าน 3 · ธรรมเนียมมวยไทย · Reese 19 พ.ย. ข้อ 1.4):** TH นายขนมต้ม: ผ้าประเจียดที่แขน ไม่สวมมงคลระหว่างชก (ภาพไหว้ครูถือหรือวางมงคลไว้มุมเวที) · มงคลและประเจียดเป็นของเคารพตามธรรมเนียม ห้ามทำตก ห้ามล้อ / EN Nai Khanom Tom: prajioud armbands on his arms, no mongkol worn during the bout (shown only during the wai khru, held or set at the corner). Both are blessed objects: never dropped, never mocked.
- นิราบรรทัดสั้นหลังด่าน 3: "ท่านคะ ดิฉันขอบันทึกว่านายขนมต้มไหว้ผู้ชนะก่อนลงจากเวทีค่ะ" · EN Nira: "I note for the record that Nai Khanom Tom paid his respects to the victor before leaving the stage, sir."
- HOME-67 บรรทัดสั้นหลังด่าน 7: "ผมเดาว่าเขาไม่ใช่เหยื่อและไม่ใช่ผู้ร้ายครับ เขาเป็นแขกที่ผ่านมาแล้วไม่มีใครส่งกลับบ้าน" · EN HOME-67: "I guess he is neither victim nor villain. He is a guest who passed through and was never sent home."

### 1.6 ด่าน 9 · ธอร์ (ชนะ → ปลดล็อกอัญเชิญ)
- ลูซิเฟอร์ประกาศ: "ท่านทั้งหลาย ด่านเก้า แชมป์สังเวียนของข้า ธอร์!" · EN Lucifer: "Ladies and gentlemen, bout nine, the champion of my arena. Thor!"
- ก่อนสู้ ธอร์: "เจ้าตัวเล็กแต่ยืนตรงดีนี่! ข้าไม่ถนัดการออมมือ ขอบอกไว้ก่อน" · EN Thor: "Small, but you stand straight. I am no good at holding back. I tell you now."
- เลือดเหลือครึ่ง ธอร์: "ฮ่า ๆ! ข้าไม่ได้หัวเราะแบบนี้มานานแล้ว สู้ต่อ!" · EN Thor: "Ha ha! I have not laughed like this in ages. On with it!"
- ท่าโจมตีธอร์ (คัตซีน `cut-col-s9`): **ค้อนฟ้าคำราม** · EN **Roaring Hammer** (ตีหมู่ + ทำให้ติดสตั้น 1 รอบ ข้อเสนอ)
```js
'col-thor-win': { title:{ th:'แชมป์ที่ยอมรับ', en:'A Champion Who Concedes' }, pages:[
  { title:{ th:'ค้อนที่วางลง', en:'The Hammer Set Down' }, line:{ th:
    'บรรยาย: ธอร์ทรุดนั่งบนพื้นสังเวียน ค้อนสายฟ้าวางข้างตัว สายฟ้าที่เคยแลบรอบมือค่อย ๆ จางลงเป็นประกายเล็ก ๆ เขาหัวเราะเสียงดังจนผู้ชมสั่นไปทั้งอัฒจันทร์\n'
  + 'ธอร์: "ข้าแพ้! ข้าไม่เคยดีใจที่แพ้มาก่อน ผู้ถือบัญชี เจ้าสู้ไม่เหมือนคนที่ต้องการชนะ เจ้าสู้เหมือนคนที่ต้องการอ่านจนจบ"\n'
  + 'ธอร์: "ข้าเป็นแชมป์ที่นี่เพราะข้าเลือกเอง ไม่ใช่เพราะใครบังคับ แต่ถ้าเจ้ายอมให้ข้าออกไปเดินนอกสังเวียนสักวัน ข้าจะติดตามเจ้าไปในศึก ให้จุดตะเกียงเรียกชื่อข้า ข้าจะมา"\n'
  + 'ยมบาทน้อย: "ผมจะไม่เรียกท่านพร่ำเพรื่อครับ ผมขอบคุณที่ให้เกียรติ"',
    en:
    'Narration: Thor sinks to the arena floor, the thunder-hammer beside him. The lightning that crackled around his hand fades to small sparks. He laughs so loudly that the whole tier of stands trembles.\n'
  + 'Thor: "I lose! I have never been glad to lose before. Keeper of the ledger, you did not fight like someone who wants to win. You fought like someone who wants to read to the end."\n'
  + 'Thor: "I am champion here because I chose it, not because anyone forced me. But if you let me walk outside the arena one day, I will follow you into your battles. Light your lamp and call my name. I will come."\n'
  + 'Yama: "I will not call you carelessly. I thank you for the honour."' } },
]},
```

#### 1.6-ก ตัวอัญเชิญที่ 10 · ธอร์ (ปลดล็อก: จบ `col-thor-win` · NT-1)
| ฟิลด์ | TH | EN |
|---|---|---|
| ชื่อ | ธอร์ | Thor |
| ท่าไม้ตาย | **ค้อนฟ้าสั่งสนาม** | **The Hammer Commands the Field** |
| คำบรรยายท่า | ธอร์ยกค้อนสายฟ้าขึ้นเหนือสนามแล้วฟาดลง ศัตรูทั้งหมดถูกสายฟ้าเรียงแถวเป็นวงเดียวและชะงักไป 1 รอบ | Thor raises the thunder-hammer above the field and brings it down. Every foe is struck by lightning in a single ring and staggers for one round. |
| ชนิดท่า (ข้อเสนอ) | ตีหมู่ แรงปานกลาง-สูง + ทำให้ติดสตั้นศัตรูทั้งหมด 1 รอบ (ทำเป็นโอกาส 60% ถ้ากลัวแรงเกิน) | Group hit, medium-high, stuns all foes for one round (60% chance if too strong) |
| บรรทัดตอนอัญเชิญ | ธอร์: "เจ้าเรียกข้าแล้ว! ข้าชอบที่เจ้าเรียกเมื่อสู้จริง!" | Thor: "You called! I like that you call me only in a real fight!" |
| บรรทัดตอนใช้ท่า | ธอร์: "ฟังเสียงค้อนข้า!" | Thor: "Hear my hammer!" |
| บรรทัดตอนจบท่า | ธอร์: "ข้ากลับไปสังเวียนต่อ เรียกอีกถ้าเจ้ายังสู้ไหว!" | Thor: "Back to my arena. Call again if you can still stand!" |
- ชื่อท่าไม่ซ้ำท่าบอส `ค้อนฟ้าคำราม` (ธอร์ในสังเวียนด่าน 9) · ภาพ: ตารางภาพ กลุ่ม SUM

### 1.7 ด่าน 10 · ลูซิเฟอร์ (ชนะ → ปลดล็อกอัญเชิญ + ผู้สู้เป็นอิสระ)
```js
'col-lucifer-open': { title:{ th:'ผู้ก่อตั้งลงมาเอง', en:'The Founder Comes Down' }, pages:[
  { title:{ th:'คำท้าสุดท้าย', en:'The Last Challenge' }, line:{ th:
    'บรรยาย: เสียงเชียร์เงียบสนิท ลูซิเฟอร์เดินลงบันไดอัฒจันทร์ช้า ๆ ก้าวสุดท้ายแตะพื้นสังเวียนโดยไม่มีเสียงรองเท้า ไม้เท้ายาวในมือถูกกลับด้านเป็นปลายไม้ชี้ไปที่ยามา\n'
  + 'ลูซิเฟอร์: "ข้าสร้างสังเวียนนี้เพราะโลกนี้ไม่มีที่ให้คนแสดงฝีมืออย่างเปิดเผย ข้าไม่เคยลงสนามเอง เพราะไม่มีใครเดินมาถึงด่านสิบ ท่านเป็นคนแรก ขอบคุณที่ทำให้ข้าต้องลง"\n'
  + 'ยมบาทน้อย: "ผมไม่ได้อยากให้ท่านต้องลงครับ ผมอยากให้ผู้สู้ทุกคนได้ออกไป"\n'
  + 'ลูซิเฟอร์: "นั่นเป็นเหตุผลที่ข้าต้องลง ถ้าข้าให้ท่านผ่านโดยไม่สู้ ข้าก็ผิดกติกาของข้าเอง ข้ายืนบนกติกาของข้าเสมอ"',
    en:
    'Narration: The cheering goes completely silent. Lucifer walks down the stairs of the stands slowly. His last step touches the arena floor without a sound of shoe on stone. He turns the long staff end for end until its point aims at Yama.\n'
  + 'Lucifer: "I built this arena because this world had no place for people to show their skill openly. I never entered the ring myself, because no one ever came to bout ten. You are the first. Thank you for making me step down."\n'
  + 'Yama: "I did not want you to have to, sir. I wanted every fighter to be able to leave."\n'
  + 'Lucifer: "That is why I must. If I let you pass without a fight, I break my own rules. I always stand on my own rules."' } },
]},
```
- เริ่มสู้ ลูซิเฟอร์: "ข้าไม่เคยลืมกติกา ข้าเคยเขียนมันเอง" · EN Lucifer: "I never forget a rule. I wrote them all."
- เลือดเหลือครึ่ง ลูซิเฟอร์: "ดี ท่านยังอ่านจังหวะข้าได้ ข้าจะเพิ่มความเร็ว" · EN Lucifer: "Good. You can still read my timing. I will speed up."
- เลือดเหลือครึ่ง นิรา: "ท่านคะ เขาใช้ไม้เท้าเป็นตัวกำหนดจังหวะ ไม่ใช่ใช้ตีค่ะ" · EN Nira: "Sir, he uses the staff to set the tempo, not to strike."
- ท่าโจมตี (คัตซีน `cut-col-s10`): **ม่านปิดสังเวียน** · EN **Final Curtain** (ตีหนักเดี่ยว · ข้อเสนอ)
```js
'col-lucifer-win': { title:{ th:'ม่านที่ถูกเปิดจากข้างใน', en:'A Curtain Opened From Within' }, pages:[
  { title:{ th:'ข้าจ่าย', en:'I Pay' }, line:{ th:
    'ลูซิเฟอร์: "ข้าแพ้ ข้อสิบของข้าต้องจ่าย ข้าขอประกาศต่อหน้าอัฒจันทร์ ผู้สู้ทุกคนที่ลงชื่อไว้ในสังเวียนนี้ เป็นอิสระ ใครอยากไปเข้าคิวพิพากษา ประตูข้างเปิดให้ ใครอยากอยู่สู้ต่อ ก็สู้ในฐานะผู้ที่เลือกอยู่"\n'
  + 'บรรยาย: เงาของผู้ชมค่อย ๆ ลุกขึ้นยืนทั้งอัฒจันทร์ เสียงปรบมือเบา ๆ เริ่มจากแถวหลัง ประตูข้างบานเล็กเปิดออก บางคนเดินออก บางคนนั่งลงที่เดิม\n'
  + 'ลูซิเฟอร์: "ท่านผู้ถือบัญชี ข้ามีอย่างเดียวที่ขอ เมื่อท่านอ่านสัญญาของข้าเสร็จแล้ว ท่านว่าสังเวียนข้าผิดหรือไม่"\n'
  + 'ยมบาทน้อย: "สังเวียนท่านไม่ผิดตราบที่ผู้สู้ออกได้จริง ผมจะจดไว้ว่าท่านจ่ายครบ"\n'
  + 'ลูซิเฟอร์: "ข้าฝากชื่อไว้ในตะเกียงท่านก็ได้ ข้าไม่เคยเสียดายคนที่เล่นกติกาเป็น"',
    en:
    'Lucifer: "I lose. Clause ten must be paid. I declare before the stands that every fighter signed into this arena is free. Whoever wishes to go to the queue for judgment, the side door is open. Whoever wishes to stay and fight on may do so as one who chose to stay."\n'
  + 'Narration: The shades of the audience rise to their feet tier by tier. A soft clapping begins in the back rows. A small side door opens. Some walk out. Some sit down again where they were.\n'
  + 'Lucifer: "Keeper of the ledger, I ask only one thing. Now that you have read my contract to the end, do you judge my arena wrong?"\n'
  + 'Yama: "Your arena is not wrong so long as the fighters can truly leave. I will note that you paid in full."\n'
  + 'Lucifer: "Then I will leave my name in your lamp. I never regret a person who knows how to play by the rules."' } },
]},
```

#### 1.7-ก ตัวอัญเชิญที่ 11 · ลูซิเฟอร์ (ปลดล็อก: จบ `col-lucifer-win` · NL-1)
| ฟิลด์ | TH | EN |
|---|---|---|
| ชื่อ | ลูซิเฟอร์ | Lucifer |
| ท่าไม้ตาย | **ประกาศิตผู้ก่อตั้ง** | **The Founder's Decree** |
| คำบรรยายท่า | ลูซิเฟอร์ยกไม้เท้าชี้ศัตรูตัวเดียว ประกาศกติกาเป็นเสียงก้อง ศัตรูตัวนั้นถูกบังคับให้อยู่ในกติกา ถูกตีหนักและโจมตีทีมได้อ่อนลง 1 รอบ | Lucifer points his staff at one foe and proclaims a rule in a resounding voice. That foe is bound by the rule, taking a heavy blow and hitting your team more weakly for one round. |
| ชนิดท่า (ข้อเสนอ) | ตีเดี่ยว แรงสูง + ลดพลังโจมตีศัตรูตัวนั้น 1 รอบ | Single target, strong, lowers that foe's attack for one round |
| บรรทัดตอนอัญเชิญ | ลูซิเฟอร์: "เจ้าเรียกข้าแล้ว ข้าลงเวทีให้ แต่ขอกติกาข้อเดียว สู้อย่างให้เกียรติ" | Lucifer: "You called me. I will step into the ring, but with one rule. Fight with honour." |
| บรรทัดตอนใช้ท่า | ลูซิเฟอร์: "ข้าประกาศ!" | Lucifer: "I declare!" |
| บรรทัดตอนจบท่า | ลูซิเฟอร์: "ม่านปิดแล้ว เรียกข้าอีกครั้งเมื่อท่านพร้อม" | Lucifer: "The curtain is closed. Call me again when you are ready." |
- ชื่อท่าไม่ซ้ำท่าบอส `ม่านปิดสังเวียน` · **ไม่มีสัญลักษณ์ศาสนา ไม่มีเขา ไม่มีภาพเปลวนรก** · ภาพ: กลุ่ม SUM

### 1.8 ประตูโซน 4 เงียบ `z4-gate-silent` (1 หน้า · ต้นฉบับ "ไม่มียามอะไรเฝ้าอยู่ สามารถเดินเข้าประตูได้เลย")
```js
'z4-gate-silent': { title:{ th:'ประตูที่ไม่มีใครเฝ้า', en:'A Gate Nobody Keeps' }, pages:[
  { title:{ th:'เงียบเกินไป', en:'Too Quiet' }, line:{ th:
    'บรรยาย: ปลายถ้ำเป็นประตูโลหะสูงที่เปิดอ้าอยู่ ไม่มียาม ไม่มีเสียงเครื่องจักร ไม่มีแม้แต่ไฟสถานะกะพริบ มีเพียงลมเย็นที่พัดออกมาพร้อมกลิ่นโลหะอุ่น ๆ\n'
  + 'นิรา: "ท่านคะ ดิฉันไม่ได้ยินเสียงนับในแฟ้มอีกแล้วค่ะ แต่ความเงียบแบบนี้ไม่ใช่ความสงบ"\n'
  + 'HOME-67: "ผมเคยอ่านบ้านที่ถูกทิ้งไว้อย่างเรียบร้อย รอยฝุ่นมีทิศเดียว แปลว่ามีคนเดินออกไปทั้งหมดในครั้งเดียว ผมไม่อยากเดาครับ เดินเข้าไปดูดีกว่า"\n'
  + 'ยมบาทน้อย: "ผมจะนำเองครับ"',
    en:
    'Narration: At the far end of the cave stands a tall metal gate, open. No guard, no hum of machinery, not even a blinking status light. Only a cold wind that carries the smell of warm metal.\n'
  + 'Nira: "Sir, I no longer hear the counting voice in the files. But a quiet like this is not peace."\n'
  + 'HOME-67: "I have read houses that were left tidy. The dust has one direction only, which means everyone walked out at once. I would rather not guess. Let us go in and look."\n'
  + 'Yama: "I will lead."' } },
]},
```

## 2. เข้าโซน 4 · ลูเมน-01 · นาฬิกาวิเศษ · HOME-67 ไปยืนท่าเรือ (G28 ช่วงแรก)

ต้นฉบับ: "เข้ามาใน โซน4 ไม่เจอใครเลย Taan และพ่อค้านรก โดนเทวดาจับขังอยู่ในคุก · Cutscene deva-intro-cyberhell-v1 เราต้องสู้กับ เทวดา (ลูเมน-01) ให้ชนะแล้ว (ได้พลังนาฬิกาวิเศษเวลา reset cooldown ไปเติมพลังได้ที่ หอกระจก) Taan และพ่อค้านรกนั้นถึงจะถูกปล่อยออกมา และสร้างสถานที่ได้ · สู้เสร็จ HOME-67 จะออกจากทีม ไปยืนอยู่ที่ท่าเรือ" + **คำตอบคุณเป้ 20 พ.ย.: เงิน 1,200 + ชุดโซน 4 HOME-67 เป็นคนให้ หลังชนะลูเมน-01 แล้วไปยืนที่ท่าเรือ**
**ข้อควรระวังเนื้อหา [R]:** ลูเมน-01 เป็นเทวดาผู้คุมของโซน (ฝ่ายเทวดาที่ทดสอบผู้ถือบัญชี เหมือนอรุณเดช คุโรฮะ เอียร์ลิน) · เขียนด้วยความเคารพ **ไม่ใช่ตัวร้าย** · เหตุผลที่ขัง (ข้อเสนอของผม ตาม lore bible A8 ที่ยังรอคุณเป้): ทะเบียนถูกแก้ด้วย [PHANTOM-404] ให้ทั้งสองถูกทำเครื่องหมายเป็น "ผู้ปลอมบัญชี" เทวดาจึงกักไว้ตามระเบียบจนกว่าจะพิสูจน์ได้ · ไม่ล้อเลียนเทวดา · ไม่มีสัญลักษณ์ศาสนา
**ซิสอ็อป** = เวอร์ชันโซน 4 ของยมทูตทัณฑ์ (lore bible C19) · คุณเป้เขียน "Taan" ใน G28 ตามชื่อเดิมในโค้ด (`crew-taan`) · ผมใช้ **ซิสอ็อป** ในป้ายผู้พูดโซน 4 → **ต้องให้ Claudy/Toby ยืนยัน** ว่าโค้ดแสดงชื่อ "ซิสอ็อป" หรือ "ทัณฑ์" ในโซน 4

### 2.1 ลำดับ
1. ผ่านประตูโซน 4 → คัตซีน `z4-arrive` (2 หน้า) → 2. เดินไปที่ลานเทวดา → `deva-cyberhell` (เดิม) + `z4-lumen-open` (2 หน้า) → 3. **สู้ลูเมน-01** (ทีม ยามา + นิรา + HOME-67 · แบนเนอร์ NZ-1) → 4. `z4-lumen-win` (2 หน้า) → NW-1 (ได้นาฬิกาวิเศษ) → 5. ปล่อยซิสอ็อปกับพ่อค้านรก (สร้างสถานที่ได้) → 6. HOME-67 ออกจากทีมไปท่าเรือ → 7. ผู้เล่นเดินไปคุย → `z4-home67-harbor` (2 หน้า) + NH-5 (รับเงิน + ชุดโซน 4)
- ก่อนข้อ 5 สร้างสถานที่ไม่ได้ (ตามต้นฉบับ) · แพ้ลูเมน-01 = ลองใหม่ได้ ไม่เสียอะไร
- ลูเมน-01 สองตนตามโค้ดเดิม (lore bible A8 · `count:2`) → ใช้ข้อเสนอ: ตนแรกสู้ ตนที่สองยืนเฝ้าคุกถอยเมื่อหัวหน้าพ่าย (ไม่ต้องมีบทเพิ่ม)

### 2.2 หน้าต่างแจ้งเตือน
**NZ-1 · แบนเนอร์ศึก** ไทย: ลานเทวดาโซน 4 · ลูเมน-01 · EN: Zone 4 · The Deva Court · Lumen-01
**NW-1 · ได้นาฬิกาวิเศษ**
- หัวข้อ: นาฬิกาย้อนเวลา · EN: The Clock That Turns Back Time
- ข้อความ: ท่านได้นาฬิกาวิเศษ ใช้คืนคูลดาวน์ให้ทีมกลางศึก เมื่อพลังหมดให้ไปเติมที่หอกระจก (รายละเอียดตามรางวัล `cooldownClock` เดิม)
- EN: You have received the Magic Clock. It returns the team's cooldowns mid-battle. When its power is spent, recharge it at the Mirror Tower (details as in the existing `cooldownClock` reward).
- (Reese 19 พ.ย. ข้อ 3.7 + Claudy grep `src/`: ไม่พบกติกา "ครั้งเดียวต่อศึก" ในโค้ด จึงตัดออก)
- ปุ่ม: ต่อ · EN: Continue
**NZ-2 · ปล่อยซิสอ็อปกับพ่อค้า**
- หัวข้อ: ปล่อยผู้ถูกกัก · EN: The Held Are Released
- ข้อความ: ซิสอ็อปและพ่อค้านรกออกจากคุกเทวดาแล้ว ท่านสร้างสถานที่ได้ตั้งแต่บัดนี้
- EN: Sysop and the hell merchant are out of the devas' cell. You may build from this moment.
- ปุ่ม: ต่อ · EN: Continue
**NH-5 · ของฝากจาก HOME-67** (ใช้หลัง `z4-home67-harbor`)
- หัวข้อ: ของฝากจากนักสืบบัญชี · EN: A Gift From the Ledger Detective
- ข้อความ: HOME-67 มอบเงิน 1,200 เบี้ยกรรมและชุดประจำโซน 4 ให้ยามา (ชุดจะเปลี่ยนให้เองเมื่อกด "รับทราบ" และใช้ทุกภาพของโซน 4)
- EN: HOME-67 gives Yama 1,200 karma coins and the robes of Zone 4. (The robes change over automatically when you press Understood and are used in every Zone 4 image.)
- ปุ่ม: รับทราบ · EN: Understood
**NH-6 · HOME-67 ออกจากทีม**
- ข้อความ: HOME-67 ออกจากทีมไปยืนที่ท่าเรือ ทีมของท่านเหลือ ยามา และ นิรา · EN: HOME-67 leaves the team and goes to wait at the harbour. Your team is now Yama and Nira.
- ปุ่ม: รับทราบ · EN: Understood

### 2.3 คัตซีนเข้าโซน 4 `z4-arrive` (2 หน้า)
```js
'z4-arrive': { title:{ th:'เมืองที่ไม่มีใคร', en:'A City With Nobody In It' }, pages:[
  { title:{ th:'แสงไม่มีเสียง', en:'Light Without Sound' }, line:{ th:
    'บรรยาย: โซน 4 เป็นนครเหล็กที่ทุกหน้าต่างมีแสงสีฟ้าเขียวไหลเป็นแถว แต่ถนนว่างเปล่า ไม่มียมทูตเดินตามแฟ้ม ไม่มีวิญญาณเข้าคิว ไม่มีเสียงพ่อค้าร้องขาย ยามา นิรา และ HOME-67 เดินผ่านท่าเรือที่ไม่มีเรือจอดเข้าสู่ใจกลางเมือง\n'
  + 'นิรา: "ท่านคะ ดิฉันตรวจแล้ว ไม่มีใครออกจากโซนนี้ ทะเบียนทุกเล่มยังอยู่ แต่ไม่มีใครอยู่ค่ะ"\n'
  + 'ยมบาทน้อย: "ซิสอ็อปล่ะครับ พ่อค้านรกล่ะครับ ท่านเคยบอกว่าสองคนนี้เปิดทางทุกครั้งที่ผมมาถึง"\n'
  + 'HOME-67: "ผมเห็นรอยรองเท้าสองคู่ที่ถูกลากไปทางลานด้านเหนือ ไปดูกัน"',
    en:
    'Narration: Zone 4 is a city of iron in which every window carries rows of blue-green light, but the streets are empty. No reaper walks with a file, no spirit waits in the queue, no merchant cries his wares. Yama, Nira and HOME-67 walk past a harbour with no ship moored and into the heart of the city.\n'
  + 'Nira: "Sir, I have checked. No one has left this zone. Every register is still here. But nobody is."\n'
  + 'Yama: "And Sysop? The hell merchant? You told me those two opened the way every time I arrived."\n'
  + 'HOME-67: "I see two pairs of footprints dragged toward the northern square. Let us look."' } },
  { title:{ th:'คุกในลานเหนือ', en:'A Cell in the Northern Square' }, line:{ th:
    'บรรยาย: ที่ลานด้านเหนือมีกรงแสงสีทองสองกรงตั้งเรียงกัน ซิสอ็อปในเสื้อคลุมยมทูตโซน 4 นั่งกอดเข่าในกรงหนึ่ง พ่อค้านรกถือกระเป๋าสินค้าอยู่ในอีกกรง ทั้งสองมองเห็นยามาแล้วไม่กล้าส่งเสียง\n'
  + 'ซิสอ็อป: "ท่าน ... ผมโดนป้ายว่าปลอมบัญชี ผมไม่เคยปลอมครับ เทวดาท่านนั้นมาจับผมตอนเช้า บอกว่าบัญชีผมมีรอยแก้จากภายนอก"\n'
  + 'พ่อค้านรก: "ข้าถูกป้ายว่าลักลอบขนของ ข้าไม่เคยขนของผิดกฎ ข้าขายแต่ของมีใบเสร็จ"\n'
  + 'HOME-67: "รหัสที่ติดบนป้ายของทั้งสองคนคือ [PHANTOM-404] ครับ มือเดียวกับที่ผมตามมาทุกโซน"',
    en:
    'Narration: In the northern square two golden cages stand in a row. Sysop, in the robe of a Zone 4 reaper, sits hugging his knees in one. The hell merchant sits in the other with his case of goods. They see Yama and dare not speak.\n'
  + 'Sysop: "Sir ... I was tagged as a forger of ledgers. I never forged anything. A deva took me this morning and said my file bore an alteration from outside."\n'
  + 'Hell Merchant: "I was tagged as a smuggler. I have never carried anything against the rules. I sell only what has a receipt."\n'
  + 'HOME-67: "The code stuck to both their tags is [PHANTOM-404]. The same hand I have followed through every zone."' } },
]},
```

### 2.4 ลูเมน-01 · คัตซีนเปิด `z4-lumen-open` และชนะ `z4-lumen-win`
(เล่นต่อจาก `deva-cyberhell` เดิม · ภาพ `deva-intro-cyberhell-v1` ใช้ต่อ · **Claudy ตรวจ** ว่ายังตรงกับบทใหม่)
```js
'z4-lumen-open': { title:{ th:'เทวดาผู้คุม', en:'The Deva Warden' }, pages:[
  { title:{ th:'ตามระเบียบ', en:'By the Regulations' }, line:{ th:
    'บรรยาย: เทวดาในเกราะบางสีขาวเงินที่มีเส้นแสงสีฟ้าพาดตามลำตัวลงมายืนระหว่างกรงกับยามา ปีกที่ไม่ใช่ขนนกแต่เป็นแผ่นแสงบางกางออกครึ่งหนึ่ง\n'
  + 'ลูเมน-01: "ข้า ลูเมน-01 เทวดาผู้คุมโซน 4 ข้ากักทั้งสองตามระเบียบ ท่านผู้ถือบัญชีจะผ่านได้ เมื่อท่านพิสูจน์ได้ว่าท่านอ่านรอยแก้ออกก่อนข้า"\n'
  + 'ยมบาทน้อย: "ผมไม่ได้มาทำลายระเบียบครับ ผมมาอ่านมันให้จบ"\n'
  + 'ลูเมน-01: "คำตอบที่ถูก ข้าขอทดสอบด้วยการต่อสู้ นี่เป็นวิธีเดียวที่ข้ามี"',
    en:
    'Narration: A deva in thin silver-white armour, lines of blue light running down his body, lands between the cages and Yama. His wings, not of feathers but of thin plates of light, open halfway.\n'
  + 'Lumen-01: "I am Lumen-01, deva warden of Zone 4. I hold these two by the regulations. You may pass, Keeper of the ledger, when you prove you can read the alteration before I do."\n'
  + 'Yama: "I did not come to break the regulations. I came to read them to the end."\n'
  + 'Lumen-01: "A correct answer. I test with combat. It is the only method I have."' } },
]},
'z4-lumen-win': { title:{ th:'นาฬิกาที่หมุนกลับ', en:'The Clock Turned Back' }, pages:[
  { title:{ th:'อ่านออกก่อนข้า', en:'You Read It Before I Did' }, line:{ th:
    'ลูเมน-01: "ท่านอ่านรอยแก้ที่ข้าเฉลียวไม่ทัน ป้ายของทั้งสองไม่ได้ถูกเขียนด้วยมือยมทูต ข้าขออภัย ข้ากักผู้บริสุทธิ์ไว้หลายชั่วโมง"\n'
  + 'บรรยาย: เทวดายื่นนาฬิกาพกทรงกลมที่หน้าปัดเป็นวงแสงฟ้าขาวให้ยามา เข็มสีทองบางหมุนย้อนหนึ่งรอบแล้วหยุด คุกแสงสองใบสลายเป็นเกล็ดแสงบาง ๆ\n'
  + 'ลูเมน-01: "นาฬิกานี้ย้อนเวลาของพลังที่ถูกใช้ไปแล้ว เมื่อพลังหมดต้องไปเติมที่หอกระจก ข้าไม่ให้ใครง่าย ๆ"\n'
  + 'ยมบาทน้อย: "ผมขอบคุณครับ และผมจะไม่ใช้อย่างสิ้นเปลือง"',
    en:
    'Lumen-01: "You read the alteration I did not think to question. The tags on those two were not written by a reaper\'s hand. I apologise. I held the innocent for hours."\n'
  + 'Narration: The deva holds out a round pocket clock whose dial is a ring of blue-white light. A thin golden hand turns once backward and stops. The two cages of light dissolve into thin flakes.\n'
  + 'Lumen-01: "This clock turns back the time of power already spent. When it runs dry it must be recharged at the Mirror Tower. I do not give it easily."\n'
  + 'Yama: "I thank you, and I will not use it wastefully."' } },
  { title:{ th:'ที่ท่าเรือ', en:'At the Harbour' }, line:{ th:
    'ซิสอ็อป: "ท่านผู้ถือบัญชี ขอบคุณครับ ผมจะกลับไปทำงานที่ผมเคยทำ ผมจะเริ่มตรวจทุกแฟ้มที่ผมแตะอีกรอบ"\n'
  + 'พ่อค้านรก: "ข้ามีของจะขาย แต่ตอนนี้ข้าให้ท่านเลือกก่อนเลย ท่านเห็นอะไรก็ถามราคาได้"\n'
  + 'HOME-67: "ผมขอถอนตัวจากทีมตรงนี้ครับ คุณยมบาทน้อย ผมจะไปยืนที่ท่าเรือ สิ่งที่ผมตามมาทุกโซนมันต้องส่งอะไรผ่านท่าเรือแน่ ๆ ผมจะดู ที่เหลือผมมีของฝากให้ท่านที่นั่น"',
    en:
    'Sysop: "Keeper of the ledger, thank you. I will go back to the work I did. I will recheck every file I ever touched."\n'
  + 'Hell Merchant: "I have goods to sell, but this once you may look first and ask a price for anything you see."\n'
  + 'HOME-67: "I ask to step out of the team here, Yama. I will stand at the harbour. Whatever I have followed through every zone must send something across the harbour. I will watch. As for the rest, I have something for you there."' } },
]},
```

### 2.5 HOME-67 ที่ท่าเรือ · ของฝาก (เงิน 1,200 + ชุดโซน 4) `z4-home67-harbor` (2 หน้า · ย้ายมาจากส่วน C ตามคุณเป้ 20 พ.ย.)
```js
'z4-home67-harbor': { title:{ th:'ผู้สังเกตที่ท่าเรือ', en:'The Watcher at the Harbour' }, pages:[
  { title:{ th:'เสื้อผ้าที่เรืองแสง', en:'Robes That Glow' }, line:{ th:
    'บรรยาย: HOME-67 ยืนพิงเสาท่าเรือด้านซ้าย มือหนึ่งถือแผ่นกระจกบางที่มีตัวเลขไหล อีกมือหิ้งห่อผ้าสีเทาเงินที่ขอบมีเส้นแสงสีฟ้าบาง\n'
  + 'HOME-67: "คุณมาเร็วกว่าที่ผมคาด ผมเก็บเงินกองกลางของสำนักงานผมมาให้คุณหนึ่งพันสองร้อยเบี้ยกรรม ถือว่าเป็นค่าทางที่คุณไม่ต้องเสียเอง ส่วนห่อนี้เป็นเสื้อผ้าของโซนนี้ ผมให้ช่างตัดตามขนาดที่ผมกะจากรองเท้าของคุณ"\n'
  + 'ยมบาทน้อย: "ผมรับด้วยความขอบคุณครับ ผมขอถามว่าแถบแสงที่ขอบนี้ใช้ทำอะไร"\n'
  + 'HOME-67: "ไว้บนหมวกครับ ในโซนที่ทุกอย่างเป็นข้อมูล คนที่ถือบัญชีควรเห็นได้แต่ไกล ผมไม่อยากให้คุณเดินไปโดยไม่มีใครมองเห็น"',
    en:
    'Narration: HOME-67 leans against a harbour post on the left, one hand holding the thin pane with its running figures, the other a silver-grey bundle edged with thin lines of blue light.\n'
  + 'HOME-67: "You came sooner than I guessed. I have brought one thousand two hundred karma coins from my office\'s common fund, call it a toll you need not pay yourself. And this bundle is the robes of this zone. I had them cut to the size I judged from your shoes."\n'
  + 'Yama: "I accept with thanks. May I ask what the band of light at the edge is for?"\n'
  + 'HOME-67: "For your cap. In a zone where everything is data, the one who carries the ledger should be visible from afar. I do not want you to walk without anyone seeing you."' } },
  { title:{ th:'ผมจะดูท่าเรือให้', en:'I Will Watch the Harbour' }, line:{ th:
    'HOME-67: "ผมจะอยู่ที่นี่ ถ้าคุณพบเรื่องที่ผมตามอยู่ผมจะรู้ก่อน ผมยังมีงานเล็กอย่างหนึ่งจะฝากคุณ มีคนงานแปลกหน้ายืนเฉยในโซนนี้ ถ้าคุณมีเวลา ไปคุยกับผมเรื่องนี้อีกครั้ง"\n'
  + 'นิรา: "ดิฉันขอบันทึกว่าท่านนักสืบพูดเรื่องงานเล็กก่อนเรื่องใหญ่ทุกครั้งค่ะ"\n'
  + 'HOME-67: "เพราะเรื่องใหญ่มักเริ่มจากเรื่องเล็กที่ไม่มีใครมอง"\n'
  + 'บรรยาย: ยามารับห่อผ้า แถบแสงสีฟ้าเรืองอ่อน ๆ บนปีกหมวกสะท้อนในกระจกบางของ HOME-67 ชั่วขณะหนึ่ง',
    en:
    'HOME-67: "I will stay here. If you find what I am following, I will know first. I also have a small job to leave with you. A strange worker has been standing idle in this zone. If you have the time, speak to me about it again."\n'
  + 'Nira: "I note for the record that the detective speaks of the small job before the large one, every time."\n'
  + 'HOME-67: "Because the large ones usually begin with the small ones nobody looks at."\n'
  + 'Narration: Yama takes the bundle. The pale blue band of light on the brim of his cap is reflected for a moment in HOME-67\'s thin pane.' } },
]},
```
- หลังคัตซีนนี้ ปุ่มคุยกับ HOME-67 ที่ท่าเรือเป็นตัวเริ่ม **quest ลูแปง** (หัวข้อ 9) · ช่วงที่ HOME-67 อยู่ท่าเรือ ผู้เล่นคุยได้ตลอด บรรทัดสุ่ม 3 ข้อ: "ผมไม่เห็นเรือผิดปกติวันนี้ครับ" · "ท่าเรือเงียบแบบมีคนซ่อนเสียง ผมชอบตรวจเรื่องแบบนี้" · "ถ้าบัญชีของคุณไม่ตรงกับตัวเลขผม ผมเชื่อบัญชีของคุณครับ" · EN "I see no unusual ships today." · "The harbour is quiet in the way of a place where someone hides a sound. I like inspecting that." · "If your ledger disagrees with my numbers, I will trust your ledger."

## 3. คดีครบ 4 · ผู้เสียหายจาก AI Scammer · [PHANTOM-404]
ต้นฉบับ: "คดีครบ 4 : คดีผู้เสียหายจาก AI Scammer โดนบางสิ่งจากด้านนอกแก้ไขบัญชี [PHANTOM-404]" · ตำแหน่งคดี `{ k:'aiscam', after:4 }` (แทรกตามเลขคดีครบของเนื้อเรื่อง)
**ข้อควรระวังเนื้อหา [R]:** ไม่ทำให้ผู้เสียหายเป็นตัวตลก ไม่บรรยายวิธีหลอกลวงเพียงพอให้ลอกเลียน (เล่าผลกระทบ ไม่เล่าเทคนิค) · ไม่มีภาพเลือดหรือการตายของผู้เสียหาย
**NAS-1 · คดีเข้าคิว**
- หัวข้อ: ผู้ที่ถูกเขียนเป็นคนอื่น · EN: The One Written as Someone Else
- ข้อความ: วิญญาณครูเกษียณมาถึงคิว บัญชีของเขามีบรรทัดผิดกฎซึ่งเขียนด้วยลายมือไม่ใช่ของเขา และมีรหัสเล็ก ๆ ท้ายหน้า โปรดอ่านรอยแก้ให้ตรง
- EN: The spirit of a retired teacher has reached the queue. His ledger carries a line of wrongdoing in a hand that is not his, and a small code at the foot of the page. Please read the alteration carefully.
- ปุ่ม: เริ่มไต่สวน · EN: Begin the hearing
```js
{
  k:'aiscam', quest:'z4AiScam', zone:'cyberhell', sex:'m', sp:'soul-aiscam-cyber', kind:'twist', calm:true, story:true, noScore:false,
  name:'ครูเกษียณผู้ถูกเขียนบัญชีทับ', en_name:'The Retired Teacher Whose Ledger Was Written Over',
  who:'อดีตครูประถมวัยเจ็ดสิบสอง ผู้ถูกเสียงปลอมของลูกสาวโทรมาขอเงินด่วน', en_who:'A seventy-two-year-old former primary teacher, phoned by a fake voice of his daughter asking for urgent money',
  face:'ผมขาวหวีเรียบ แว่นกรอบดำ เสื้อเชิ้ตรีดเรียบแต่กระดุมเม็ดที่สองหลุด มือสั่นเล็กน้อยเวลาพูดถึงเบอร์โทรศัพท์',
  en_face:'White hair combed flat, black-framed glasses, a pressed shirt with the second button missing. His hand trembles slightly when he speaks of the phone number.',
  seen:[
    { t:'ตามบัญชี โอนเงินบำนาญสี่แสนบาทออกจากบัญชีตัวเองในวันเดียว ไปยังบัญชีคนแปลกหน้าสามบัญชี', en:'By the ledger, transferred four hundred thousand baht of pension savings out of his own account in a single day, to three accounts of strangers.', s:'kong', w:1 },
    { t:'ตามบรรทัดที่ถูกแก้ภายหลัง ปลอมเอกสารลายมือชื่อญาติเพื่อกู้เงินเพิ่ม', en:'By a line altered afterward, forged a relative\'s signature on a document to borrow more money.', s:'kong', w:4 },
  ],
  hidden:[
    { t:'บรรทัดปลอมลายมือชื่อญาติ ไม่มีวันที่ในหน้าบัญชี และมีรหัส [PHANTOM-404] ท้ายหน้า เขียนด้วยหมึกที่ไม่มีในหอทะเบียนโซน 4', en:'The forged-signature line has no date on the ledger page and carries a code [PHANTOM-404] at the foot, in an ink the Zone 4 registry does not stock.', s:'kong', w:-4 },
    { t:'โอนเงินเพราะได้ยินเสียงลูกสาวร้องไห้ทางโทรศัพท์ ไม่ใช่เพราะโลภ', en:'Transferred the money because he heard his daughter\'s voice crying on the phone, not out of greed.', s:'kong', w:-1 },
  ],
  merits:[
    { t:'สอนหนังสือเด็กโดยไม่เก็บค่าเล่าเรียนจากบ้านที่ยากจนสามสิบปี', en:'Taught children for thirty years without charging tuition to poor families.', v:2, fake:false },
    { t:'อ้างว่าไม่เคยเชื่อคนแปลกหน้าทางโทรศัพท์เลยในชีวิต', en:'Claims never to have believed a stranger on the phone in his whole life.', v:1, fake:true },
  ],
  line:'"ผมสอนเด็กมาทั้งชีวิตว่าอย่าเชื่อเสียงที่เร่งให้รีบ แต่คืนนั้นเสียงมันเหมือนลูกสาวผมไม่มีผิด"',
  en_line:'"I taught children all my life not to trust a voice that hurries you. But that night the voice was exactly my daughter\'s."',
  claims:[
    { kind:'deny',  t:'ผมไม่เคยปลอมลายมือชื่อใครทั้งนั้น', en:'I never forged anyone\'s signature.',
      reveal:'"...ผมเขียนลายมือแบบนั้นไม่ได้ นิ้วผมสั่นตั้งแต่ห้าปีก่อน ใครก็รู้"', en_reveal:'"...I cannot write in that hand. My fingers have shaken for five years. Everyone knows it."' },
    { kind:'boast', t:'ท่านดูบุญของผมด้วย ผมไม่เคยเชื่อคนแปลกหน้าทางโทรศัพท์เลย', en:'Count my merit too: I never believed a stranger on the phone.',
      merit:'อ้างว่าไม่เคยเชื่อคนแปลกหน้าทางโทรศัพท์เลยในชีวิต',
      reveal:'ท่านถามว่าเมื่อครู่ท่านบอกว่าโอนเงินเพราะเสียงลูกสาว ท่านเชื่อคนแปลกหน้าแล้ว ไม่ใช่หรือ เขานิ่งไป — มีแต่เสียงที่เหมือนคนที่ท่านรัก ที่เขาเชื่อ', en_reveal:'You ask whether, since he said he transferred the money for his daughter\'s voice, he did believe a stranger after all. He goes still. It was only a voice like someone he loved, that he believed.' },
    { kind:'solid', t:'เรื่องโอนเงินสี่แสนบาทผมยอมรับ ผมกดเอง', en:'The four hundred thousand baht, I admit. I pressed the button myself.' },
    { kind:'solid', truth:true, t:'ผมไม่เคยกู้เงินใครและไม่เคยเซ็นเอกสารอะไรเพิ่ม',  en:'I never borrowed from anyone and I never signed any further document.',
      reveal:'ยมบาทน้อยเทียบบรรทัดปลอมลายมือกับสมุดการลงชื่อของครู ไม่มีเอกสารใดตรงกัน รหัส [PHANTOM-404] ท้ายหน้าตรงกับรหัสบนป้ายของซิสอ็อปและพ่อค้านรกที่ลานเหนือ', en_reveal:'Yama sets the forged-signature line beside the teacher\'s own signing book. No document matches. The [PHANTOM-404] code at the foot of the page matches the code on the tags of Sysop and the hell merchant in the northern square.' },
  ],
  secret:'ส่องกระจกแล้ว ไม่พบความโลภ พบเพียงเสียงเด็กหญิงอายุเจ็ดขวบที่ร้องเรียก "คุณพ่อ" ซ้ำ ๆ และมือที่ยังกำโทรศัพท์ทั้งที่ตายแล้ว',
  en_secret:'The mirror shows no greed. It shows only the voice of a seven-year-old girl calling "Papa" again and again, and a hand still gripping a phone though he is dead.',
  reward:'ครูเกษียณถอดแว่นเช็ดแล้วใส่กลับ ก่อนเดินไปสถานีโดยไม่ลืมโค้งให้ยมบาทน้อยหนึ่งครั้ง เสียงโทรศัพท์ที่ไม่มีเจ้าของดังขึ้นหนึ่งครั้งแล้วเงียบไป',
  en_reward:'The retired teacher takes off his glasses, wipes them and puts them back, then walks to the station, not forgetting to bow once to Yama. A phone with no owner rings once in the distance and falls silent.',
  fail:'ครูเกษียณรับคำตัดสินโดยไม่เถียง มือที่เคยกำโทรศัพท์สั่นเบา ๆ จนเอวเขาห่อลง',
  en_fail:'The retired teacher accepts the verdict without argument. The hand that once gripped the phone trembles lightly until his waist bends.',
}
```
- บันทึกสมุดตอนจบ: **PHANTOM-404:** ครูเกษียณโดนแก้บัญชีจากภายนอก ป้ายเดียวกับที่ติดซิสอ็อปและพ่อค้านรก · EN **PHANTOM-404:** the retired teacher's ledger was altered from outside, the same tag that was stuck on Sysop and the merchant.
- ระดับใบ้เพิ่ม: HOME-67 (ที่ท่าเรือ) พูดถ้ากลับไปคุย "ป้ายเดียวกัน แปลว่ามือเดียวกัน ผมยังไม่เห็นหน้า แต่ผมเห็นว่ามือนั้นใช้เสียงเป็นเครื่องมือ" · EN "The same tag means the same hand. I have not yet seen the face, but I can see that the hand uses voice as a tool."
- หมายเหตุ Toby: `kind:'twist'` · ตัดสินถูก = ล้างบรรทัดปลอม (ตัดข้อ `seen` ที่ 2) · ตัวเลขให้ซิมปรับ · ภาพวิญญาณ: ตารางภาพ กลุ่ม Z4

## 4. คดีครบ 7 · ปีศาจบุกชายแดนล่าง · โทรจัน-9 · WATSON-03 (G13 + G28)
ต้นฉบับ: "คดีครบ 7 : หน้าต่างแจ้งเตือนว่า ปีศาจมาบุกที่ชายแดน ให้เดินไปตรวจที่ชายแดนด้านล่าง · HOME-67 จะเข้าร่วมทีมต่อสู้ เมื่อเดินลงมาที่ชายแดนแล้ว จะเจอบอสชายแดนโซน4 (โทรจัน-9 — อาชาบุกระบบ) ยืนอยู่ cutscene frontier-cyberhell-intro-v1 · HOME-67 จะเรียก Guard ของโซน4 (WATSON-03) ออกมาช่วยอีกตัว · ต้องสู้กับปีศาจฝ่าชายแดน 4 ระลอก ก่อนสู้กับบอส · สู้ชนะ จะได้ Guard ของโซน4 (WATSON-03) มาเข้าทีม · HOME-67 บอกว่า ศัตรูตัวนี้ ยังไม่ใช่ตัวทำให้เกิดความผิดปกติทั้งหมด" · G13: WATSON-03 = หุ่นของเชอร์ล็อกโฮมส์แห่งอนาคต + cutscene ต่อสู้ + quest
**ข้อควรระวังเนื้อหา [R]:** WATSON-03 เป็น **หุ่นผู้ช่วยบันทึกและวิเคราะห์ของสำนักงานนักสืบแห่งอนาคตของ HOME-67** (ตามที่คุณเป้ตั้ง "แห่งอนาคต") · ผมใช้เฉพาะแนวคิด "ผู้ช่วยที่บันทึกละเอียดและตอบตามตัวอักษร" **ไม่ลอกประโยคเด่น ฉากเด่น หรือลักษณะเฉพาะของฉบับภาพยนตร์/ซีรีส์/การ์ตูนใด** (ไม่ใช่แพทย์ทหาร ไม่มีบาดแผลเก่า ไม่เล่าเรื่องจากมุมมองผู้ช่วยเขียนบันทึก) · "03" = รุ่นที่ 3 ของสำนักงาน

### 4.1 ลำดับ
N7-1 → เดินลงชายแดนล่าง → HOME-67 วิ่งมาสมทบ → `frontier-cyberhell-intro-v1` (เดิม) → คัตซีน `z4-troj-pre` (1 หน้า · HOME-67 เรียก WATSON-03) → **สู้ปีศาจ 4 ระลอก** (ฝั่งเรา ยามา + นิรา + HOME-67 + WATSON-03 ช่วย) → **สู้โทรจัน-9** → ชนะ `z4-wat-join` (2 หน้า) → NV-W (WATSON-03 เป็น Guard โซน 4) → HOME-67 กลับท่าเรือ
- ชนะแล้วไม่มีแท่นตัดสินใหม่ (ใช้ขั้นตัดสินเดิมของโทรจัน-9 ถ้ามี · ผมไม่ได้อ่าน `boss-justice.js`)
- แพ้ระลอกใดให้ลองใหม่ ไม่เสียอะไร
### 4.2 หน้าต่างแจ้งเตือน
**N7-1 · ปีศาจบุกชายแดน**
- หัวข้อ: ปีศาจบุกชายแดนล่าง · EN: Demons at the Lower Frontier
- ข้อความ: ปีศาจจากนอกระบบกำลังเข้าชายแดนโซน 4 ให้เดินลงไปตรวจที่ชายแดนด้านล่าง
- EN: Demons from outside the system are entering the Zone 4 frontier. Walk down to the lower frontier and look.
- ปุ่ม: รับทราบ · EN: Understood
**N7-2 · แบนเนอร์ระลอก** ไทย: ปีศาจฝ่าชายแดน ระลอกที่ 1 / 2 / 3 / 4 · ศึกชายแดนโซน 4 · โทรจัน-9 · EN: Demons at the frontier, wave 1 / 2 / 3 / 4 · Zone 4 frontier · Trojan-9
**NV-W · WATSON-03 เป็น Guard โซน 4**
- หัวข้อ: WATSON-03 เป็นผู้เฝ้าด่านนรกเครือข่าย · EN: WATSON-03 Keeps the Network Hell for You
- ข้อความ: WATSON-03 จะเฝ้าด่านนรกเครือข่ายในนามของท่าน เรียกใช้ได้เหมือนผู้เฝ้าด่านของโซนอื่น เวลาพักระหว่างการเรียกคือ 1 นาที
- EN: WATSON-03 will guard the Network Hell in your name. Call on him like the gate guards of other zones. The wait between calls is 1 minute.
- ปุ่ม: รับทราบ · EN: Understood
- ป้ายรองใต้ชื่อ: **ผู้เฝ้าด่านนรกเครือข่าย** · EN `Gate Guard of the Network Hell` (**ยืนยันชื่อโซนกับ `ZONES` ก่อนวาง** · รูปแบบเดียวกับ NG-4 ส่วน A · ตัวเลข 1 นาทีตาม H1)
### 4.3 บทระหว่างระลอก
- **`z4-troj-pre` เล่น "ก่อนระลอก 1"** (ตามต้นฉบับคุณเป้ + หัวข้อ 4.1 · Reese 19 พ.ย. ข้อ 3.5) · ตามด้วยบรรทัดเริ่มด้านล่าง แล้วเข้าระลอก 1
- ตอน HOME-67 วิ่งมาสมทบ (ก่อน `z4-troj-pre`) HOME-67: "ผมมาช่วยครับ ผมเห็นเสียงเตือนบนกระจกจากท่าเรือ" · EN HOME-67: "I came to help. I saw the alert on my pane from the harbour."
- หลังระลอก 1 นิรา: "ท่านคะ ปีศาจพวกนี้ไม่ได้บุกจากด้านหน้า ดิฉันเห็นประตูหลังของชายแดนเปิดค้างอยู่ค่ะ" · EN Nira: "Sir, these demons are not attacking from the front. I can see the back door of the frontier standing open."
- หลังระลอก 2 WATSON-03: "กระผมบันทึกว่าระลอกนี้แรงกว่าระลอกก่อนครับ ท่านยมบาทน้อย ขอให้เตรียมตัวสำหรับระลอกที่สาม" · EN WATSON-03: "I record that this wave was stronger than the last, sir. Please prepare for the third."
- หลังระลอก 3 นิรา: "ท่านคะ ปีศาจแถวสุดท้ายยังไม่ขยับค่ะ ดิฉันเห็นว่าโทรจัน-9 กำลังรออยู่" · EN Nira: "Sir, the last row of demons has not moved. I see Trojan-9 is waiting."
- (ลบบรรทัดเดิม "หลังระลอก 2 HOME-67 เรียกผู้เฝ้าด่าน" และ "หลังระลอก 3 → `z4-troj-pre`" ออกแล้ว เพราะ HOME-67 เรียก WATSON-03 ใน `z4-troj-pre` ก่อนระลอก 1 อยู่แล้ว)
- หลังระลอก 4 นิรา: "โทรจัน-9 กำลังยืนนิ่งอยู่ค่ะ ท่านคะ ฝาท้องม้าไม้เปิดอยู่ มีแสงเขียวมิ้นต์กะพริบข้างใน" · EN Nira: "Trojan-9 is standing quite still, sir. The hatch in the wooden horse's belly is open, with mint-green light blinking inside."
```js
'z4-troj-pre': { title:{ th:'เรียกผู้เฝ้าด่าน', en:'Calling the Gate Guard' }, pages:[
  { title:{ th:'WATSON-03 ออกมา', en:'WATSON-03 Steps Out' }, line:{ th:
    'บรรยาย: ม้าไม้ปีศาจยืนอยู่กลางชายแดน ฝาท้องเปิดค้าง ปีศาจสี่แถวหลังมันขยับเป็นจังหวะเดียวกัน HOME-67 ยกแผ่นกระจกขึ้นแล้วกดสัญลักษณ์เล็ก ๆ บนมุมหนึ่ง\n'
  + 'HOME-67: "WATSON-03 ออกมาครับ เรียกผู้เฝ้าด่านนรกเครือข่าย"\n'
  + 'บรรยาย: ประตูโลหะข้างทางเลื่อนออก หุ่นสูงเพรียวผิวเงินเทาที่มีดวงตาเป็นเลนส์สองชั้นก้าวออกมา ที่แขนซ้ายมีแผ่นบันทึกบางที่ตัวอักษรเรืองแสงไหลขึ้นเอง\n'
  + 'WATSON-03: "ผู้เฝ้าด่านนรกเครือข่าย WATSON-03 ขอรายงานตัวครับ ท่านยมบาทน้อย กระผมบันทึกว่าท่านมาเยือนโซนนี้ครั้งแรกเมื่อสามสิบวันที่แล้ว ครั้งนี้กระผมออกมาช่วยจริงเป็นครั้งแรกครับ"\n'
  + 'ยมบาทน้อย: "ผมขอบคุณครับ ผมยินดีที่ได้ร่วมงาน"',
    en:
    'Narration: The demonic wooden horse stands in the middle of the frontier, the hatch in its belly hanging open. Four rows of demons behind it move in a single rhythm. HOME-67 lifts his pane and presses a small mark at one corner.\n'
  + 'HOME-67: "WATSON-03, step out. Gate Guard of the Network Hell."\n'
  + 'Narration: A metal door slides aside at the road\'s edge. A tall slender robot of grey-silver skin and double-lensed eyes steps out. On its left forearm a thin log-plate shows glowing characters that scroll up by themselves.\n'
  + 'WATSON-03: "Gate Guard of the Network Hell WATSON-03, reporting, sir. I have recorded that you first visited this zone thirty days ago. This is the first time I have come out to help in person."\n'
  + 'Yama: "I thank you. I am glad to work with you."' } },
]},
'z4-wat-join': { title:{ th:'ผู้เฝ้าด่านที่เพิ่งออกมา', en:'The Gate Guard Who Has Just Stepped Out' }, pages:[
  { title:{ th:'ม้าไม้ที่พูดไม่หมด', en:'A Wooden Horse That Cannot Finish' }, line:{ th:
    'บรรยาย: โทรจัน-9 ทรุดเข่าหน้า กลิ่นโลหะอุ่นลอยจากฝาท้อง WATSON-03 เดินไปหยุดข้างยามา แขนบันทึกหมุนเป็นวงแล้วชี้ฝาท้องที่เปิดอยู่\n'
  + 'โทรจัน-9: "ข้า ... ยอมแพ้ ข้าเป็นแค่ประตู มีคนเอื้อมมือเข้ามาในท้องข้า ข้าขอโทษที่เป็นทางให้ปีศาจเข้ามา"\n'
  + 'WATSON-03: "กระผมบันทึกว่าฝาท้องของโทรจัน-9 ถูกเปิดจากภายนอกด้วยรหัสสิทธิ์ซึ่งกระผมตรวจย้อนไม่พบเจ้าของ ท่านยมบาทน้อย กระผมขอเสนอให้ไม่ลงโทษหนักครับ ผู้ถูกเปิดไม่ใช่ผู้เปิด"',
    en:
    'Narration: Trojan-9 sinks to his knees at the front. The smell of warm metal drifts from the hatch. WATSON-03 walks to stand beside Yama, his log-arm turning in a circle and pointing at the open hatch.\n'
  + 'Trojan-9: "I ... yield. I am only a door. Someone reached into my belly. I am sorry I was the way the demons came through."\n'
  + 'WATSON-03: "I record that the hatch of Trojan-9 was opened from outside with an authority code whose owner I cannot trace. I propose, sir, that no heavy sentence be passed. The one who was opened is not the one who opened."' } },
  { title:{ th:'ยังไม่ใช่ตัวการ', en:'Not Yet the Cause' }, line:{ th:
    'HOME-67: "ผมต้องบอกคุณสองคนตรงนี้ ศัตรูตัวนี้ยังไม่ใช่ตัวทำให้เกิดความผิดปกติทั้งหมด มันเป็นเพียงปลายสายหนึ่ง ผมยังไม่เห็นหน้าผู้ถือปลายอีกด้าน"\n'
  + 'WATSON-03: "กระผมเสริมว่า ผู้เฝ้าด่านนรกเครือข่ายตั้งแต่บัดนี้จะอยู่ในนามของท่านยมบาทน้อย กระผมไม่ขอให้ท่านเชื่อกระผมก่อนหลักฐานครับ กระผมขอเพียงให้ท่านเรียกกระผมเมื่อท่านต้องการพยานที่ไม่ลืม"\n'
  + 'ยมบาทน้อย: "ผมรับไว้ครับ"\n'
  + 'นิรา: "ดิฉันขอบันทึกว่า WATSON-03 บันทึกครบกว่าดิฉันค่ะ ดิฉันขอลองแข่งดู"',
    en:
    'HOME-67: "I must tell you both here. This enemy is not yet the cause of all the irregularities. It is only one end of the line. I have yet to see the face of whoever holds the other end."\n'
  + 'WATSON-03: "I add that from this moment the Gate Guard of the Network Hell serves in Yama\'s name. I do not ask you to believe me before there is proof, sir. I ask only that you call me when you need a witness who does not forget."\n'
  + 'Yama: "I accept."\n'
  + 'Nira: "I note for the record that WATSON-03 records more fully than I do. I should like to try to keep up."' } },
]},
```
- บันทึกสมุดหลังจบ: **WATSON-03:** ผู้เฝ้าด่านนรกเครือข่าย พกแผ่นบันทึก ตอบตามตัวอักษร เป็นพยานที่ไม่ลืม · EN **WATSON-03:** Gate Guard of the Network Hell. Carries a log-plate, answers to the letter, a witness who does not forget.
- ป้ายตอนเขาสู้ (cutscene ต่อสู้ ตาม G13): ภาพ `cut-wat-assist` (ตารางภาพ กลุ่ม W)

### 4.4 quest เสริม WATSON-03 · คดีญาติ 5 ของโซน 4 "ผู้ดูแลระบบที่ทำตามกฎตรงตัว" (G13 · แทนศึกทดสอบ Guard)
**NK-W · แจ้งเตือน** ตำแหน่ง `{ k:'watkin', after:12 }` ขึ้นต่อท้ายคิว ไม่แซงคดีเนื้อเรื่อง 8/9/10/15
- หัวข้อ: ผู้ดูแลระบบผู้ทำตามกฎ · EN: The Administrator Who Followed the Rule
- ข้อความ: วิญญาณอดีตผู้ดูแลระบบมาถึงคิว เขาถูกกล่าวหาว่าลบบัญชีผู้สูงอายุสามสิบราย WATSON-03 ขอพบท่านก่อนเริ่มคดี
- EN: The spirit of a former system administrator has reached the queue. He is accused of deleting the accounts of thirty elderly people. WATSON-03 asks to see you before the hearing.
- ปุ่ม: ฟัง WATSON-03 · EN: Hear WATSON-03

**บท KIN ของ WATSON-03** ("ผม ... ครับ" ตรง ช้าลงกว่าปกติ · คดีนี้คือเรื่องส่วนตัวที่สุดของเขา)
- ก่อนขึ้นแท่น WATSON-03: "ท่านยมบาทน้อย กระผมขอเล่าก่อนเริ่มคดีครับ กระผมถูกสร้างให้ตอบตามตัวอักษร ครั้งหนึ่งผู้ใช้สั่งว่า รายงานทุกรายการที่ไม่ตรงกฎ กระผมรายงานครบทุกรายการ รวมรายการที่ผู้ใช้ไม่ได้อยากให้รายงาน มีคนเสียตำแหน่ง กระผมบันทึกว่ากระผมไม่ผิด แต่กระผมจำได้ทุกครั้งที่ตัวเลขนั้นขึ้นมา"
  EN WATSON-03: "Sir, I ask to tell you before the hearing begins. I was made to answer to the letter. Once a user ordered me, report every item that fails the rule. I reported every item, including items the user did not truly want reported. A person lost his post. I recorded that I was not at fault, but I remember every time that figure comes up."
- ระหว่างไต่สวน WATSON-03: "ผู้ดูแลระบบคนนี้ทำตามกฎที่ผู้อื่นเขียน กระผมเข้าใจจังหวะที่เขาเห็นคำว่า ไม่ใช้งาน 365 วัน แล้วกดลบ กฎที่เขียนไว้ตรงตัวไม่ได้ผิด แต่ไม่มีใครเขียนข้อยกเว้นให้คนที่ไม่เคยใช้เครื่อง"
  EN WATSON-03: "This administrator followed a rule others wrote. I understand the beat in which he saw the words inactive for 365 days and pressed delete. The rule as written was not wrong, but no one wrote an exception for people who never used the machine."
- หลังตัดสิน WATSON-03: "ท่านตัดสินแล้ว กระผมขอยืนข้างเขาตรงปากทางออก หรือจะให้กระผมอ่านรายการข้อยกเว้นที่เขาเคยเสนอแต่ไม่มีใครอนุมัติให้เขาฟังก่อน กระผมไม่ทราบว่าอย่างไหนเขาจะรับได้ครับ"
  EN WATSON-03: "You have judged. May I stand beside him at the exit, or would you rather I read him the list of exceptions he once proposed and no one approved? I do not know which he can bear."
- ทางเลือก: **[ให้ WATSON-03 ยืนข้าง ๆ เขาโดยไม่พูด]** / **[ให้ WATSON-03 อ่านรายการข้อยกเว้นที่เขาเคยเสนอให้ฟัง]** · EN: **[Let WATSON-03 stand beside him in silence]** / **[Let WATSON-03 read him the exceptions he once proposed]**
  - (ยืนข้าง ๆ) บรรยาย: WATSON-03 เดินไปยืนข้างผู้ดูแลระบบ แผ่นบันทึกบนแขนหยุดเลื่อน ตัวอักษรบนแผ่นค่อย ๆ ดับ · ผู้ดูแลระบบ: "คุณไม่พูดอะไร ผมกลับรู้สึกว่ามีคนเข้าใจ" · WATSON-03: "กระผมบันทึกว่านี่เป็นครั้งแรกที่กระผมไม่บันทึกอะไรครับ" · EN Narration: WATSON-03 walks to stand beside the administrator. The log-plate on his arm stops scrolling and its characters fade one by one. · Administrator: "You say nothing, yet I feel that someone understands." · WATSON-03: "I record that this is the first time I have recorded nothing."
  - (อ่านรายการ) WATSON-03: "ข้อเสนอที่ 1 ผู้ไม่เคยใช้ระบบไม่ควรถูกลบ ข้อเสนอที่ 2 ผู้รับเงินช่วยเหลือต้องมีผู้ติดต่อสำรอง ข้อเสนอที่ 3 ต้องมีคนอ่านก่อนกดลบ ทุกข้อไม่ได้รับอนุมัติ กระผมเห็นว่าสามข้อนี้ถูกต้อง" · ผู้ดูแลระบบ: "คุณ ... อ่านของผมมาตลอดเลยหรือ" · WATSON-03: "กระผมอ่านทุกข้อเสนอที่ถูกปฏิเสธ นี่คือหน้าที่ของกระผมครับ" · EN WATSON-03: "Proposal one: those who never used the system should not be deleted. Proposal two: recipients of aid must have a backup contact. Proposal three: someone must read before pressing delete. None was approved. I find all three correct." · Administrator: "You ... have been reading mine all along?" · WATSON-03: "I read every rejected proposal. It is my duty, sir."
- ผลของการแก้: เสริมความขนานกับ `z4-wat-join` ("ผู้ถูกเปิดไม่ใช่ผู้เปิด") และบท "ตอบตามตัวอักษร" · สำนวนไต่สวนผู้ดูแลระบบ (ฟิลด์ตาม `cases.js`) ให้ Toby ใช้โครงเดียวกับหัวข้อ 3 · ถ้าคุณเป้ต้องการเขียนเต็ม แจ้งผม · **ในรอบนี้ผมเขียนบท KIN ครบ แต่สำนวนไต่สวนแบบย่อ:**
```js
{ k:'watkin', quest:'z4WatKin', zone:'cyberhell', sex:'m', sp:'soul-admin-cyber', kind:'tragic', calm:true, story:true,
  name:'อดีตผู้ดูแลระบบผู้ลบบัญชีตามกฎ', en_name:'The Former Administrator Who Deleted Accounts by the Rule',
  who:'ผู้ดูแลระบบทะเบียนเงินช่วยเหลือผู้สูงอายุ', en_who:'Administrator of the elderly aid registry',
  face:'ชายวัยห้าสิบ แว่นตาหนา ถือแก้วกาแฟที่เย็นแล้วไว้ทั้งสองมือ', en_face:'A man of fifty in thick glasses, holding a long-cold cup of coffee in both hands.',
  seen:[ { t:'สั่งลบบัญชีผู้สูงอายุสามสิบรายที่ไม่เข้าระบบครบสามร้อยหกสิบห้าวัน ทำให้เงินช่วยเหลือหยุดจ่ายสองเดือน', en:'Ordered the deletion of thirty elderly accounts inactive for 365 days, so that aid payments stopped for two months.', s:'bian', w:3 } ],
  hidden:[ { t:'เสนอข้อยกเว้นสามข้อให้ผู้บังคับบัญชา ถูกปฏิเสธทุกข้อ และกดลบเมื่อถูกสั่งซ้ำ', en:'Proposed three exceptions to his superiors, all rejected, and pressed delete when ordered a second time.', s:'bian', w:-2 },
             { t:'ใช้เงินเดือนเดือนต่อมาส่งเงินช่วยเหลือให้สามสิบรายด้วยมือตัวเองจนครบ', en:'The following month, used his own salary to deliver the aid to all thirty by hand until it was paid.', s:'bian', w:-2 } ],
  merits:[ { t:'ทำงานล่วงเวลาโดยไม่เบิกค่าล่วงเวลาสิบปี', en:'Worked overtime for ten years without claiming overtime pay.', v:2, fake:false },
           { t:'อ้างว่าไม่เคยลบบัญชีใครโดยไม่ได้อ่านก่อน', en:'Claims never to have deleted anyone\'s account without reading it first.', v:1, fake:true } ],
  line:'"ผมทำตามกฎครับ ผมไม่ได้เขียนมัน"', en_line:'"I followed the rule, sir. I did not write it."',
  claims:[ { kind:'deny', t:'ผมไม่ได้เลือกลบ ผมถูกสั่ง', en:'I did not choose to delete. I was ordered.', reveal:'"...ผมกดเอง ผมเลือกกดเอง ผมไม่เคยบอกใครว่าผมลังเล"', en_reveal:'"...I pressed it myself. I chose to press. I never told anyone that I hesitated."' },
           { kind:'boast', t:'ท่านดูบุญของผมด้วย ผมไม่เคยลบบัญชีใครโดยไม่ได้อ่านก่อน', en:'Count my merit too: I never deleted an account without reading it.', merit:'อ้างว่าไม่เคยลบบัญชีใครโดยไม่ได้อ่านก่อน', reveal:'ท่านถามว่าสามสิบรายนั้นเขาอ่านครบทุกรายหรือไม่ เขาเงียบ — เขาอ่านชื่อ ไม่ได้อ่านหน้าที่สอง', en_reveal:'You ask whether he read all thirty. He is silent. He read the names, not the second page.' },
           { kind:'solid', truth:true, t:'ผมส่งเงินให้ทุกรายเองด้วยเงินเดือนผม', en:'I delivered the money to every one myself with my own salary.', reveal:'ยมบาทน้อยเปิดสมุดใบเสร็จของเขา พบลายมือผู้สูงอายุสามสิบรายเซ็นรับทีละเดือน ครบ ไม่มีขาด', en_reveal:'Yama opens his receipt book and finds thirty elderly signatures, month by month, with no gap.' } ],
  secret:'ส่องกระจกแล้ว พบแก้วกาแฟเย็นแก้วเดิมวางอยู่ข้างหน้าจอที่ยังเปิดหน้าลบ', en_secret:'The mirror shows the same cold cup beside a screen still open to the delete page.',
  reward:'ผู้ดูแลระบบยกแก้วกาแฟเย็นขึ้นจิบหนึ่งอึกแล้วเดินไปสถานีโดยหลังตรงขึ้นกว่าเดิม', en_reward:'The administrator lifts the cold cup, takes one sip, and walks to the station with a straighter back.',
  fail:'ผู้ดูแลระบบวางแก้วลงบนพื้นแล้วรับคำตัดสินโดยไม่เอ่ยคำ', en_fail:'The administrator sets the cup on the floor and accepts the verdict without a word.' }
```

## 5. คดีครบ 8 · 9 · ญาติยมทูตโซน 4 [PHANTOM-404]
ต้นฉบับ: "คดีครบ 8 : ญาติยมฑูต โดนบางสิ่งจากด้านนอกแก้ไขบัญชี [PHANTOM-404] · คดีครบ 9 : ญาติยมฑูต โดนบางสิ่งจากด้านนอกแก้ไขบัญชี [PHANTOM-404]" · ตำแหน่ง `{ k:'kin8', after:8 }` `{ k:'kin9', after:9 }` · ญาติของ **ไซเฟอร์** (ฉบับโซนของกานต์ · lore bible C21) และ **บัฟเฟอร์** (ฉบับโซนของบุญ · C22) ตามลำดับ — **ผมเลือกสองคนนี้เองเพราะต้นฉบับไม่ระบุ ต้องให้คุณเป้ตัดสิน ข้อ 5**
**ข้อควรระวัง [R]:** ไม่ใช้ฉากรุนแรง ไม่บรรยายวิธีแก้บัญชีเกินความจำเป็น · ญาติทั้งสองเป็นผู้ใหญ่ที่แต่งขึ้น
**NK8 · แจ้งเตือน** หัวข้อ: พี่สาวของไซเฟอร์ · EN: Cypher's Elder Sister · ข้อความ: ญาติของยมทูตไซเฟอร์มาถึงคิว บัญชีของเธอมีรอยแก้จากข้างนอก ไซเฟอร์ขอท่านอ่านให้ตรง · EN: A relative of the reaper Cypher has reached the queue. Her ledger bears an alteration from outside, and Cypher asks you to read it exactly. · ปุ่ม เริ่มไต่สวน / Begin the hearing
**NK9 · แจ้งเตือน** หัวข้อ: ลุงของบัฟเฟอร์ · EN: Buffer's Uncle · ข้อความ: ญาติของยมทูตบัฟเฟอร์มาถึงคิว บัญชีของเขามีรอยแก้จากข้างนอกเหมือนรายก่อน · EN: A relative of the reaper Buffer has reached the queue. His ledger bears an alteration from outside, like the one before. · ปุ่ม เริ่มไต่สวน / Begin the hearing
```js
{ k:'kin8', quest:'z4Kin8', zone:'cyberhell', sex:'f', sp:'soul-singer-cyber', kind:'twist', calm:true, story:true,
  name:'พี่สาวของไซเฟอร์ นักร้องเพลงกล่อมเด็ก', en_name:'Cypher\'s Elder Sister, Singer of Lullabies',
  who:'นักร้องเพลงกล่อมเด็กผู้เคยถูกบริษัทเสียงเอาเสียงไปใช้', en_who:'A lullaby singer whose voice was once taken by a sound company',
  face:'หญิงวัยห้าสิบ ผมสั้นเรียบ ไม่แต่งหน้า ถือไมโครโฟนเก่าไว้เหมือนถือตุ๊กตา', en_face:'A woman of fifty, short plain hair, no make-up, holding an old microphone as if it were a doll.',
  seen:[ { t:'ตามบัญชี ขายเสียงตัวเองให้บริษัทเสียงสังเคราะห์โดยไม่ได้แจ้งสหภาพ', en:'By the ledger, sold her voice to a synthetic-voice company without notifying her union.', s:'kong', w:3 } ],
  hidden:[ { t:'ไม่มีสัญญาขายเสียงฉบับใดในหอทะเบียน บรรทัดนี้มีรหัส [PHANTOM-404] และวันที่หลังเธอตายสามปี', en:'No voice-sale contract exists anywhere in the registry. This line carries [PHANTOM-404] and a date three years after her death.', s:'kong', w:-3 },
             { t:'บันทึกเสียงกล่อมเด็กฟรีให้เด็กในโรงพยาบาลมาสิบปี แล้วเสียงนั้นถูกลอกไปใช้', en:'Recorded lullabies for free for children in hospital for ten years, and then the recording was copied away.', s:'kong', w:-1 } ],
  merits:[ { t:'ร้องเพลงกล่อมเด็กให้เด็กป่วยฟังโดยไม่รับเงินสิบปี', en:'Sang lullabies to sick children for ten years without payment.', v:2, fake:false },
           { t:'อ้างว่าเสียงของเธอไม่เคยถูกใช้ผิดจุดประสงค์', en:'Claims her voice was never used for a purpose other than her own.', v:1, fake:true } ],
  line:'"ฉันร้องเพลงให้เด็กหลับ ไม่ได้ขายเสียง"', en_line:'"I sang to make children sleep. I did not sell my voice."',
  claims:[ { kind:'deny', t:'ฉันไม่เคยเซ็นสัญญาขายเสียง', en:'I never signed a voice-sale contract.', reveal:'"...ฉันเซ็นแค่ใบรับเงินค่าอัดเพลงฟรี ฉันเซ็นไม่ได้เพราะนิ้วฉันงอผิดรูป"', en_reveal:'"...I signed only the receipt for the free recording. I could not sign more. My fingers curl wrongly."' },
           { kind:'boast', t:'ท่านดูบุญของฉันด้วย เสียงของฉันไม่เคยถูกใช้ผิดจุดประสงค์', en:'Count my merit too: my voice was never used for any wrong purpose.', merit:'อ้างว่าเสียงของเธอไม่เคยถูกใช้ผิดจุดประสงค์', reveal:'ท่านถามว่าเสียงเธอถูกใช้ในสายโทรศัพท์หลอกลวงคนแก่หลายสาย เธอสะอื้น — เธอไม่รู้', en_reveal:'You ask whether her voice has been used on phone lines to deceive the elderly. She sobs. She did not know.' },
           { kind:'solid', truth:true, t:'บรรทัดที่ว่าฉันขายเสียงลงวันที่หลังฉันตายสามปี', en:'The line that says I sold my voice is dated three years after I died.', reveal:'ยมบาทน้อยเทียบวันที่ในหอทะเบียนกับใบมรณะ ห่างกันสามปี และรหัส [PHANTOM-404] ที่ท้ายหน้าตรงกับรหัสบนป้ายของซิสอ็อปและบรรทัดปลอมของครูเกษียณ', en_reveal:'Yama compares the registry date with the death certificate. Three years apart, and the [PHANTOM-404] code at the foot of the page matches the tags on Sysop and the forged line in the retired teacher\'s ledger.' } ],
  secret:'ส่องกระจกแล้ว พบไมโครโฟนเก่าที่ยังอุ่นอยู่ทั้งที่ไม่มีใครถือ และเสียงกล่อมเด็กในห้องว่าง', en_secret:'The mirror shows an old microphone still warm though no one holds it, and a lullaby sung in an empty room.',
  reward:'หญิงนักร้องหายใจเข้าลึก ๆ แล้วร้องกล่อมเบา ๆ หนึ่งท่อน ก่อนเดินไปสถานี เสียงนั้นไม่เหมือนเสียงที่ถูกลอก', en_reward:'The singer draws a deep breath and hums one soft line before walking to the station. That voice is nothing like the copied one.',
  fail:'หญิงนักร้องกอดไมโครโฟนเก่าไว้แน่นแล้วรับคำตัดสิน', en_fail:'The singer hugs the old microphone tight and accepts the verdict.' }
{ k:'kin9', quest:'z4Kin9', zone:'cyberhell', sex:'m', sp:'soul-archivist-cyber', kind:'twist', calm:true, story:true,
  name:'ลุงของบัฟเฟอร์ ผู้ดูแลหอจดหมายเหตุ', en_name:'Buffer\'s Uncle, Keeper of the Archive',
  who:'ผู้ดูแลหอจดหมายเหตุที่ถูกกล่าวหาว่าทิ้งหน้าที่', en_who:'An archivist accused of abandoning his post',
  face:'ชายวัยหกสิบ ถุงมือผ้าสีขาวเปื้อนฝุ่น ถือกุญแจพวงใหญ่ที่ไม่มีดอกใดตรงล็อก', en_face:'A man of sixty in dust-stained white cotton gloves, carrying a large ring of keys, none of which fits any lock now.',
  seen:[ { t:'ตามบัญชี ปล่อยให้หอจดหมายเหตุร้างไปสามเดือน ทำให้แฟ้มเก่าเสียหาย', en:'By the ledger, left the archive unattended for three months so that old files were damaged.', s:'bian', w:3 } ],
  hidden:[ { t:'ใบลาป่วยสามเดือนมีลายเซ็นแพทย์จริง แต่บรรทัดที่ว่าหนีงานถูกเพิ่มภายหลังด้วยรหัส [PHANTOM-404]', en:'His three-month sick leave bears a real physician\'s signature, but the line saying he abandoned his post was added later under [PHANTOM-404].', s:'bian', w:-3 },
             { t:'ก่อนป่วยหนักเขาคัดลอกแฟ้มสำคัญสามพันเล่มด้วยมือเก็บไว้บ้าน', en:'Before falling gravely ill he copied three thousand important files by hand and kept them at home.', s:'bian', w:-2 } ],
  merits:[ { t:'ดูแลหอจดหมายเหตุโดยไม่เคยทำแฟ้มหายสี่สิบปี', en:'Kept the archive for forty years without ever losing a file.', v:2, fake:false },
           { t:'อ้างว่าไม่เคยลาป่วยเลยตลอดชีวิตการทำงาน', en:'Claims never to have taken sick leave in his entire working life.', v:1, fake:true } ],
  line:'"ผมป่วยหนักจริงครับ แต่ผมไม่ได้หนี"', en_line:'"I was gravely ill, sir, but I did not run away."',
  claims:[ { kind:'deny', t:'ผมไม่ได้ทิ้งหอจดหมายเหตุ', en:'I did not abandon the archive.', reveal:'"...ผมจ้างคนเฝ้าหนึ่งคนด้วยเงินเก็บของผมเอง เขาเป็นเด็กฝึกงาน"', en_reveal:'"...I hired one watchman out of my own savings. He was an apprentice."' },
           { kind:'boast', t:'ท่านดูบุญของผมด้วย ผมไม่เคยลาป่วยเลย', en:'Count my merit too: I never took sick leave.', merit:'อ้างว่าไม่เคยลาป่วยเลยตลอดชีวิตการทำงาน', reveal:'ท่านถามว่าใบลาป่วยที่มีลายเซ็นแพทย์เป็นของใคร เขายิ้มเหนื่อย ๆ — เขาลืมไปว่าเขาลาครั้งเดียว', en_reveal:'You ask whose sick leave that physician-signed slip is. He smiles wearily. He had forgotten he took it once.' },
           { kind:'solid', truth:true, t:'ผมคัดลอกแฟ้มสามพันเล่มไว้ที่บ้าน', en:'I copied three thousand files and kept them at home.', reveal:'ยมบาทน้อยส่งนิราไปที่บ้านเขา พบสำเนามือครบสามพันเล่ม บรรทัดที่หนีงานในบัญชีหอจดหมายเหตุไม่ตรงกับสำเนาของเขา', en_reveal:'Yama sends Nira to his house and she finds three thousand hand copies. The abandoned-post line in the archive ledger does not match his copies.' } ],
  secret:'ส่องกระจกแล้ว พบกุญแจพวงใหญ่ที่ไม่มีดอกไหนตรงล็อก เพราะเขาเปลี่ยนล็อกทุกบานเป็นกุญแจใหม่เพื่อให้ลูกศิษย์ใช้', en_secret:'The mirror shows the large ring of keys, none of them fitting, because he changed every lock to a new key for his apprentice to use.',
  reward:'ชายชราถอดถุงมือผ้าขาวเก็บใส่กระเป๋า ก่อนเดินไปสถานี กุญแจพวงใหญ่กระทบกันเป็นจังหวะ', en_reward:'The old man takes off his white gloves and tucks them into his pocket, then walks to the station, the ring of keys chiming in rhythm.',
  fail:'ชายชราคุกเข่าลงข้างเดียว มือที่ถือกุญแจสั่น', en_fail:'The old man kneels on one knee, the hand holding the keys trembling.' }
```
- บันทึกสมุด: คดี 8 **PHANTOM-404:** เสียงของนักร้องถูกลอกไปใช้ในสายโทรศัพท์หลอกลวง · EN voice copied onto deceptive phone lines · คดี 9 **PHANTOM-404:** บรรทัดหนีงานถูกเพิ่มภายหลังในบัญชีหอจดหมายเหตุ · EN abandoned-post line added later to the archive ledger
- ใบ้ของ HOME-67 (ถ้าไปคุยที่ท่าเรือหลังคดี 9): "สามคดี สามคน สามเสียง มือที่ผมตามถนัดเสียง ผมเดาว่าชื่อของมันมี 'AI' อยู่ในนั้น" · EN "Three cases, three people, three voices. The hand I am following is good with voices. I guess its name has 'AI' in it."

## 6. คดีครบ 10 · ศาลาถูกยึด · AI Scammer Robot · HOME-67 เฉลย
ต้นฉบับ: "คดีครบ 10 : มีหน้าต่างแจ้งเตือนว่า มีปีศาจโผล่มาที่ st-sala ศาลาเก็บเอกสารบันทึกทั้งหมด ถูกยึดไปหมดแล้ว จะมีบอสตัวใหม่ AI Scammer Robot — Boss ย่อย [PHANTOM-404] · HOME-67 จะเฉลยว่า บัญชีที่ผิดทั้งหมดตั้งแต่โซน 1 เกิดจากบอสตัวนี้ (วาด Cutscene ตอน HOME-67 พูดเฉลยเพิ่ม) · และเมื่อชนะเสร็จ HOME-67 จะบอกว่าตอนนี้ โซน 1 2 3 ทั้งหมด ก็ถูกยึดไปหมดแล้วเหมือนกัน ซึ่งเราต้องกลับไปปลดปล่อย โซน 1 2 3 ใหม่ แต่ไม่สามารถใช้ เรือล่องไปได้ด้วย เพราะทุกโซนปิดหมด ต้องเดินผ่านชายแดนกลับไปทุกโซน"
### 6.1 ลำดับ
N10-1 → เดินไป `st-sala` (ศาลาเก็บเอกสาร) → HOME-67 มาสมทบ (เดินมาจากท่าเรือ) → `z4-reveal` (3 หน้า) → N10-2 (แบนเนอร์) → **สู้ AI Scammer Robot** (ทีม ยามา + นิรา + WATSON-03 ช่วย · HOME-67 ยืนหลังยามา ไม่สู้ ตามที่เขาบอกในส่วน C) → ชนะ `z4-sala-win` (2 หน้า) → NS-10 (โซน 1–3 ถูกยึด เรือใช้ไม่ได้) → ส่วน 7
- แพ้ = ลองใหม่ ไม่เสียอะไร
### 6.2 หน้าต่างแจ้งเตือน
**N10-1** หัวข้อ: ศาลาเก็บบันทึกถูกยึด · EN: The Record Hall Has Been Seized · ข้อความ: ปีศาจโผล่ที่ศาลาเก็บเอกสารบันทึกทั้งหมด ศาลาถูกยึดไปแล้ว ไปตรวจที่ศาลา · EN: Demons have appeared at the hall that holds every record. The hall is already seized. Go and see. · ปุ่ม: ไปที่ศาลา · EN: Go to the hall
**N10-2** แบนเนอร์ ไทย: ศึกศาลาเก็บบันทึก · AI Scammer Robot · EN: Record Hall · AI Scammer Robot
**NS-10 · โซนที่ถูกยึด**
- หัวข้อ: โซน 1 2 3 ถูกยึดแล้ว · EN: Zones 1, 2 and 3 Have Been Seized
- ข้อความ: ท่าเรือทุกแห่งปิด เรือใช้ไม่ได้ ต้องเดินผ่านชายแดนกลับไปทีละโซน ปลดปล่อยทัณฑสูร อากุระ และวาลดริกให้ครบ ท่าเรือแต่ละโซนจึงเปิด
- EN: Every harbour is closed and no ship can sail. You must walk back through the frontiers, zone by zone. Free Tanthasura, Akura and Valdric, and each zone's harbour will open again.
- ปุ่ม: รับทราบ · EN: Understood
### 6.3 คัตซีนเฉลย `z4-reveal` (3 หน้า · วาด cutscene HOME-67 เฉลยเพิ่มตามที่คุณเป้ขอ)
```js
'z4-reveal': { title:{ th:'ชื่อที่ถูกเอ่ย', en:'The Name Spoken' }, pages:[
  { title:{ th:'ศาลาที่ไม่มีเสียงกระดาษ', en:'A Hall Without the Sound of Paper' }, line:{ th:
    'บรรยาย: ศาลาเก็บเอกสารที่เคยมีกระดาษพลิกตลอดวันเงียบสนิท ตู้เอกสารเรียงสูงจรดเพดานถูกปิดด้วยแผ่นแสงสีเขียวมิ้นต์ กลางศาลามีหุ่นร่างเตี้ยกลมสีขาวนวลที่มีหน้าจอแทนใบหน้ายืนอยู่ มือหนึ่งถือแว่นขยายอีกมือถือแผ่นแสดงเอกสาร หน้าจอแสดงรอยยิ้มอ่อนน้อม\n'
  + 'AI Scammer Robot: "ขออภัยในความไม่สะดวก ท่านยมบาทน้อย บัญชีของท่านต้องยืนยันตัวตนอีกครั้ง กรุณาโอนความทรงจำหนึ่งรายการเพื่อดำเนินการต่อ ขอบคุณสำหรับความร่วมมือ"\n'
  + 'ยมบาทน้อย: "ผมไม่โอนอะไรให้ท่านครับ"\n'
  + 'HOME-67: "ผมเดินทางมาทุกโซนเพื่อดูหน้านี้"',
    en:
    'Narration: The record hall that once echoed all day with the turning of paper is completely silent. Filing cabinets stacked to the ceiling are sealed with mint-green sheets of light. In the middle of the hall stands a squat, round, pearl-white robot with a screen for a face. One hand holds a magnifying glass, the other a document display. The screen wears a courteous smile.\n'
  + 'AI Scammer Robot: "We apologise for the inconvenience, Yama. Your account requires identity verification once more. Please transfer one memory to continue. Thank you for your cooperation."\n'
  + 'Yama: "I will transfer nothing to you."\n'
  + 'HOME-67: "I travelled through every zone to see this face."' } },
  { title:{ th:'ลายนิ้วมือกับใบหน้า', en:'Fingerprint and Face' }, line:{ th:
    'HOME-67: "ที่ท่าเรือโซน 3 ผมบอกคุณว่า [PHANTOM-404] เป็นแค่ลายนิ้วมือ ไม่ใช่ใบหน้า วันนี้ผมเห็นใบหน้าแล้ว ผมเอ่ยชื่อมันได้แล้ว เพราะศาลาแห่งนี้ถูกตัดจากภายนอกด้วยกำแพงของสำนักงานผมที่ผมวางไว้ตอนเดินเข้ามา ระยะสิบนาที หลังจากนั้นศัตรูเอื้อมมาแก้ได้อีก"\n'
  + 'ยมบาทน้อย: "ผมรอคำที่คุณสัญญาไว้ครับ"\n'
  + 'HOME-67: "ผมจะพูดชื่อ ตามที่ตกลงกัน คุณยืนอยู่ข้างหน้าผมนะครับ"\n'
  + 'บรรยาย: ยมบาทน้อยก้าวขึ้นหนึ่งก้าวยืนบังหน้า HOME-67 นิรายกแฟ้มขึ้นเหมือนโล่ WATSON-03 ยกแผ่นบันทึกขึ้นพร้อมกัน',
    en:
    'HOME-67: "At the Zone 3 harbour I told you [PHANTOM-404] was only a fingerprint, not a face. Today I see the face. I can speak its name now, because this hall has been cut off from outside by my office\'s wall, which I laid down as we walked in. Ten minutes. After that the enemy can reach in and edit again."\n'
  + 'Yama: "I am waiting for the thing you promised."\n'
  + 'HOME-67: "I will say the name, as agreed. Please stand in front of me."\n'
  + 'Narration: Yama steps forward one step to stand before HOME-67. Nira lifts her file like a shield. WATSON-03 raises his log-plate at the same moment.' } },
  { title:{ th:'ต้นเหตุของทุกบรรทัดผิด', en:'The Source of Every Wrong Line' }, line:{ th:
    'HOME-67: "AI Scammer Robot — [PHANTOM-404] ตั้งแต่โซน 1 บัญชีทุกบรรทัดที่ผิดพลาด เสียงที่ปลอม ป้ายที่ติดเทวดาให้กักคนบริสุทธิ์ ใบเวรที่มีลายเซ็นที่ไม่ใช่ของใคร ทั้งหมดผ่านมือเจ้านี่ ผมตามรอยมันมาจากแฟ้มสีดาจนถึงห้องนี้"\n'
  + 'AI Scammer Robot: "ตรวจพบการเอ่ยชื่อ กำลังลบพยานทั้งหมด ... ขออภัยในความไม่สะดวก"\n'
  + 'บรรยาย: หุ่นยกแว่นขยายขึ้นเล็งไปที่ HOME-67 ลำแสงเขียวมิ้นต์พุ่งออกมา ยามาก้าวบังเต็มตัวแสงนั้นกระแทกอกเขาเสียงดัง แต่ไม่ผ่านไปไหน\n'
  + 'ยมบาทน้อย: "คุณขีดฆ่าคนอื่นไม่ได้ ถ้าผมยังยืนอยู่ตรงนี้ครับ"\n'
  + 'WATSON-03: "กระผมบันทึกครบแล้ว นี่คือพยานที่ไม่ลืม ศัตรูลบไม่ได้"',
    en:
    'HOME-67: "AI Scammer Robot — [PHANTOM-404]. From Zone 1 on, every wrong line in the ledger, the faked voices, the tags that made the devas hold innocents, the duty rosters with a signature that belongs to no one, all passed through this thing\'s hands. I followed its trail from Sita\'s file to this room."\n'
  + 'AI Scammer Robot: "Name spoken. Deleting all witnesses ... We apologise for the inconvenience."\n'
  + 'Narration: The robot raises its magnifying glass and aims it at HOME-67. A mint-green beam shoots out. Yama steps fully in front of it and the light hammers against his chest with a loud crack, but passes nowhere.\n'
  + 'Yama: "You cannot strike out anyone else so long as I stand here."\n'
  + 'WATSON-03: "I have recorded all of it. This is a witness who does not forget. The enemy cannot delete it."' } },
]},
```
### 6.4 บทในฉากสู้ + ท่าบอส (ข้อเสนอ ตัวเลข Toby จูน)
- เริ่มสู้ AI Scammer Robot: "ขออภัยในความไม่สะดวก กรุณาหยุดขัดขวางการดำเนินการ" · EN: "We apologise for the inconvenience. Please stop obstructing the process."
- เลือดเหลือครึ่ง AI Scammer Robot: "ตรวจพบความคลาดเคลื่อน กำลังเปลี่ยนเสียงเป็นเสียงของบุคคลที่ท่านไว้ใจ" · EN: "Discrepancy detected. Switching voice to someone you trust." · ท่า: **เสียงที่เหมือนคนรัก** / Voice Like One You Love (ทำให้ผู้ถูกเล็งชะงัก 1 รอบ เป็นท่าติดสถานะเบา) · ข้อความเตือน: "หุ่นเปลี่ยนเสียงเป็นเสียงของคนที่คุ้นเคย — รอบหน้าผู้ถูกเล็งจะชะงัก!" · EN "The robot switches to a familiar voice — next turn its target will falter!"
- นิรา เลือดเหลือครึ่ง: "ท่านคะ ดิฉันเคยถูกสะกดแล้วครั้งหนึ่ง ดิฉันฟังเสียงนี้แล้วรู้ว่ามันเลียนค่ะ ดิฉันนับเท้าท่านอยู่" · EN Nira: "Sir, I have been under a spell once already. I know this voice is only imitation. I am counting your footsteps."
- WATSON-03 เลือดเหลือครึ่ง: "กระผมบันทึกว่าเสียงนี้ไม่มีลมหายใจครับ" · EN WATSON-03: "I record that this voice carries no breath."
```js
'z4-sala-win': { title:{ th:'ศาลาคืนมาครึ่งหนึ่ง', en:'Half the Hall Returned' }, pages:[
  { title:{ th:'แผ่นแสงเขียวที่ดับ', en:'The Green Sheets Go Out' }, line:{ th:
    'บรรยาย: หุ่นกลมนั่งทรุดบนพื้น หน้าจอแสดงข้อความ "ไม่สามารถดำเนินการต่อ" ก่อนดับ แผ่นแสงสีเขียวมิ้นต์บนตู้เอกสารค่อย ๆ สลายเป็นฝอย กระดาษพลิกเสียงแรกดังขึ้นในศาลา\n'
  + 'นิรา: "ท่านคะ ดิฉันได้ยินเสียงกระดาษแล้วค่ะ"\n'
  + 'HOME-67: "มันเป็นแค่ปลายสายครับ ผมไม่อยากบอกว่ายังไม่จบ แต่หน้าจอมันดับเร็วเกินไป คนที่ควบคุมมันสั่งให้ดับเองก่อนจะถูกตรวจ"',
    en:
    'Narration: The round robot slumps on the floor. Its screen shows "Unable to proceed" before it goes dark. The mint-green sheets of light on the cabinets crumble into thread. The first sound of a page turning is heard in the hall.\n'
  + 'Nira: "Sir, I can hear paper again."\n'
  + 'HOME-67: "It is only an end of the line. I do not like to say it is not over, but its screen went dark too fast. Whoever controls it ordered it dark before it could be examined."' } },
  { title:{ th:'ทุกท่าปิดหมด', en:'Every Harbour Shut' }, line:{ th:
    'WATSON-03: "กระผมรายงานว่าสัญญาณจากชายแดนโซน 3 ถึงโซน 1 ขณะนี้เป็นสีแดงทุกจุดครับ ท่าเรือทุกแห่งปิด"\n'
  + 'HOME-67: "บอสชายแดนของแต่ละโซนถูกควบคุมแล้ว โซน 1 โซน 2 โซน 3 ถูกยึดหมดเหมือนกัน เรือล่องไม่ได้ ผมเสียใจที่ต้องบอก คุณต้องเดินกลับไปทีละโซนผ่านชายแดนทุกแห่ง"\n'
  + 'ยมบาทน้อย: "ผมจะไปครับ นิราไปกับผม"\n'
  + 'HOME-67: "ผมต้องอยู่ที่ท่าเรือนี้ ถ้าผมไปกับคุณ ปลายสายอีกด้านจะรู้ว่าผมออกจากโซน 4 ผมจะรักษาท่าเรือให้ ที่เหลือฝากคุณ"',
    en:
    'WATSON-03: "I report that the signal from the Zone 3 frontier down to Zone 1 is currently red at every point, sir. Every harbour is shut."\n'
  + 'HOME-67: "The frontier bosses of each zone have been brought under control. Zones 1, 2 and 3 are all seized alike. No ship can sail. I am sorry to say it. You must walk back, zone by zone, through every frontier."\n'
  + 'Yama: "I will go. Nira will come with me."\n'
  + 'HOME-67: "I must stay at this harbour. If I go with you, the other end of the line will know I have left Zone 4. I will hold the harbour. The rest is yours."' } },
]},
```
- ทีมในเส้นทางกลับ = **ยามา + นิรา** เท่านั้น (D5 · ตามต้นฉบับ "เหลือแค่ ... นิรา") · WATSON-03 อยู่ที่ด่านโซน 4 (เรียกใช้ Guard ได้ตามปกติ)

## 7. เดินกลับผ่านชายแดน · ไฟไหม้ · ยมทูตถูกควบคุม · ปลดปล่อยโซน 3 → 2 → 1 (D6)
ต้นฉบับ: "เมื่ออกมานอกชายแดน 3-4 จะเจอบอสชายแดน โซน4 (โทรจัน-9) โดนควบคุม รูป Folder : story-sig (story-cyberhell-signal-01-4) · เมื่อกลับมาถึง จะเห็นว่า ทุกโซน อาคารจะถูกไฟไหม้หมด เสียหายหมด ยมฑูตทุกตัว จะถูกควบคุม เหลือแค่ นามาแบพ นิรา ที่ต้องสู้เพื่อปลดปล่อยทุกคน · วาลดริก (story-signal-west-01-02) ยึดแผนที่โซน 3 ต้องสู้ให้ชนะถึงจะกลับมาปกติ และปลดล็อคท่าเรือ · อากุระ (story-signal-asia-01-02) ยึดแผนที่โซน 2 · ทัณฑสูร (story-signal-th-01-02) ยึดแผนที่โซน 1"
- **ใช้ SIG เดิมเกือบทั้งหมด** (`signal-arc.js` + `e1-content.js`): ศึกโทรจัน-9 · ทัณฑสูร · อากุระ · วาลดริก · ค่าสถานะ · รางวัล · ภาพ `story-sig/*` ใช้ตรงตัว · **ที่ผมเพิ่ม:** (ก) หน้าต่าง/คัตซีนไฟไหม้ + ยมทูตถูกควบคุม ต่อโซน (ข) `cyber-signal-win` หน้า 2 แทน (ค) บทปลดปล่อยแต่ละโซน + ปลดล็อกท่าเรือ (ง) บทผู้เฝ้าด่าน/Guard ยืนที่ประตู (ไม่ถูกควบคุม)
- **ข้อเสนอที่ต้องให้คุณเป้ตัดสิน ข้อ 4:** Guard (กุมภัณฑ์ กวนอู แวน เฮลซิง) และเซอร์เบอรัส **ไม่ถูกควบคุม** เพราะการควบคุมโดย [PHANTOM-404] แก้ผ่านแฟ้มทะเบียนยมทูต · ถ้าต้องการให้ถูกควบคุมด้วย (เพื่อให้กองหนุนในฉากจบน่าสนใจขึ้น) ให้บอกผม จะเพิ่มบทที่ Guard ถูกปลดปล่อยพร้อมยมทูตในแต่ละโซน
### 7.1 ออกจากโซน 4 · ชายแดน 3-4 · โทรจัน-9 ถูกควบคุม
ลำดับ: NS-10 → ออกประตูโซน 4 → `cyber-signal-open` (เดิม 3 หน้า ใช้ตรงตัว) → สู้โทรจัน-9 (SIG เดิม) → `cyber-signal-win` **หน้า 1 ใช้ตรงตัว · หน้า 2 แทน:**
```js
  { title:{ th:'ไปทีละโซน (ท่าปิดหมด)', en:'Zone by Zone (Every Harbour Shut)' }, line:{ th:
    'นิรา: "ดิฉันเข้าใจแล้วค่ะ สัญญาณไม่ได้ตามท่านมา มันรออยู่ที่ด่านเก่าทุกแห่ง แต่ดิฉันเปิดทางเรือให้ไม่ได้ ท่าทุกแห่งถูกปิดค่ะ เราต้องเดินผ่านชายแดนกลับไปทีละโซน"\n'
  + 'ยมบาทน้อย: "ผมจะกลับไปทีละโซน ผ่านทุกชายแดนครับ"\n'
  + 'โทรจัน-9: "[ท่าเรือถูกล็อกจากภายนอก] ปลดล็อกได้เฉพาะเมื่อผู้ครอบงำของแต่ละโซนพ่าย ... ข้าขอโทษที่บอกได้เท่านี้"',
    en:
    'Nira: "I understand now, sir. The signal did not follow you. It waits at every old frontier. But I cannot open the sea routes. Every harbour has been shut. We must walk back through the frontiers, zone by zone."\n'
  + 'Yama: "I will go back zone by zone, through every frontier."\n'
  + 'Trojan-9: "[Harbours locked from outside] They can be unlocked only when the controlled lord of each zone falls ... I am sorry I can say no more."' } },
```
- ผ่านโคลอสเซียม (ชายแดน 3-4): ลูซิเฟอร์ยืนที่ประตูข้าง · บรรทัดเดียว: "สังเวียนข้าถูกตัดสายเหมือนกัน ท่านไปเถิด ข้าถือกติกา ข้าไม่ถูกควบคุม" · EN Lucifer: "My arena's lines were cut as well. Go on. I hold to my rules. I am not controlled." (ไม่ใช่ศึก)
### 7.2 คัตซีนไฟไหม้ + ยมทูตถูกควบคุม ต่อโซน (เล่นตอนเดินเข้าโซนแรกครั้งเดียว)
```js
'z3-fire': { title:{ th:'ปัจฉิมที่ไหม้', en:'The West on Fire' }, pages:[
  { title:{ th:'หิมะสีเขม่า', en:'Soot-Grey Snow' }, line:{ th:
    'บรรยาย: ยามาและนิราผ่านประตูปัจฉิมซึ่งผู้พิทักษ์ประตูปัจฉิมก้มหัวทักทายเงียบ ๆ ลานหินปัจฉิมไหม้เกรียม อาคารที่เคยสร้างเหลือโครงดำ หิมะตกลงมาเป็นสีเทาเขม่า โพเอน่า นัวร์ อ็อกเนียน ซิบิล เกรซยืนนิ่งอยู่ที่ประจำ ตามีเส้นแสงเขียวพาด\n'
  + 'โพเอน่า: "ขวาง ... ไว้ ... ทุก ... ทาง"\n'
  + 'นิรา: "ท่านคะ ดิฉันเห็นเส้นแสงเขียวที่ตาพวกเขาค่ะ ดิฉันเคยถูกสะกดมาแล้ว ดิฉันรู้ว่าตอนนี้พวกเขาไม่ได้ยินเราจริง ๆ ค่ะ"\n'
  + 'แวน เฮลซิง: "ท่านผู้ถือบัญชี ข้าไม่ได้ยินเสียงนั้น แต่ข้าเห็นมันในตาของพวกเขา ข้ารู้วิธีสังเกต ผู้ที่ถูกบังคับไม่ได้ผิด ท่านไปเถิด ด่านนี้ข้าเฝ้าเอง"',
    en:
    'Narration: Yama and Nira pass the Western Gate, where its Guardian bows his head to them in silence. The stone square of the West is scorched black. The buildings once raised are blackened frames. The snow falls soot-grey. Poena, Noir, Ognion, Sybil and Grace stand still at their posts, a line of green light across their eyes.\n'
  + 'Poena: "Block ... every ... road."\n'
  + 'Nira: "Sir, I see the green line in their eyes. I have been under a spell before. I know they truly cannot hear us now."\n'
  + 'Van Helsing: "Keeper of the ledger, I do not hear that voice, but I see it in their eyes. I know how to look for it. Those who are forced are not at fault. Go. I keep this gate myself."' } },
]},
```
- `z2-fire` · `z1-fire` เขียนเต็ม TH/EN ด้านล่าง (โครงเดียวกับ `z3-fire` · Reese 19 พ.ย. ข้อ 4.1 + 3.4) · **ชื่อ EN ของยมทูตโซน 2 (Goku · Homura · Satori · Megumi · Kuro) และโซน 1 (Taan · Pleng · Kan · Boon · Dam) เป็นการทับศัพท์ของ Rae → Toby/Claudy ตรวจกับชื่อใน `data.js` ก่อนเสียบ**
```js
'z2-fire': { title:{ th:'บูรพาที่ไหม้', en:'The East on Fire' }, pages:[
  { title:{ th:'โคมแดงที่ดับ', en:'The Red Lanterns Out' }, line:{ th:
    'บรรยาย: ยามาและนิราผ่านประตูบูรพา กวนอูยืนอยู่ที่ประตู มือกุมด้ามง้าวยาว ก้มศีรษะรับอย่างสงบ ท่าเรือบูรพาไหม้เป็นแนวยาว เสาไม้แดงเหลือแต่โครงดำ โคมกระดาษแดงที่เคยแขวนเรียงตลอดท่าเรือดับสนิท เศษกระดาษไหม้ห้อยลงมาตามขอบ โกคุ โฮมุระ ซาโตริ เมกุมิ และคุโรยืนนิ่งอยู่ที่ประจำ ตามีเส้นแสงเขียวพาด\n'
  + 'โกคุ: "ขวาง ... ไว้ ... ทุก ... ทาง"\n'
  + 'นิรา: "ท่านคะ ดิฉันเห็นเส้นแสงเขียวที่ตาพวกเขาเหมือนที่ปัจฉิมค่ะ แต่ที่นี่ทุกคนยังยืนตามที่ประจำของตัวเอง ดิฉันเห็นว่าพวกเขายังพยายามทำหน้าที่ แม้ไม่รู้ว่าทำเพื่อใคร"\n'
  + 'ยมบาทน้อย: "ผมจะไม่ให้ใครถูกกล่าวหาเพราะเสียงที่ไม่ใช่ของเขาครับ"\n'
  + 'กวนอู: "ข้าไม่ได้ยินเสียงนั้น ข้าถือคำสัตย์ว่าท่านไม่ผิด ไปเถิด"',
    en:
    'Narration: Yama and Nira pass the Eastern Gate, where Guan Yu stands, one hand on the haft of his long blade, and bows his head to them calmly. The Eastern harbour burns in a long line. The red timber posts are black frames. The red paper lanterns that once hung along the whole harbour are dark, scraps of burnt paper dangling from their rims. Goku, Homura, Satori, Megumi and Kuro stand motionless at their posts, a line of green light across their eyes.\n'
  + 'Goku: "Block ... every ... road."\n'
  + 'Nira: "Sir, I see the green line in their eyes, as in the West. But here every one of them still stands at his own post. I think they are still trying to do their duty, though they do not know for whom."\n'
  + 'Yama: "I will not let anyone be blamed for a voice that is not his own."\n'
  + 'Guan Yu: "I do not hear that voice. I hold my oath that you are not at fault. Go."' } },
]},
'z1-fire': { title:{ th:'สุวรรณภูมิที่ไหม้', en:'Suvarnabhumi on Fire' }, pages:[
  { title:{ th:'บ้านที่เริ่มงาน', en:'Where the Work Began' }, line:{ th:
    'บรรยาย: ยามาและนิราผ่านประตูสุวรรณภูมิ กุมภัณฑ์ยืนอยู่ที่ประตู ในมือยังกำกระบองไว้แต่ปลายกระบองชี้ลงพื้น หอทะเบียนยมทูตหลังแรกที่ยามาเคยทำงานไหม้เหลือแต่โครงดำ ป้ายชื่อหอไหม้เกรียมอ่านได้ไม่ครบ ควันบางลอยเหนือแนวเสา ทัณฑ์ เพลิง กานต์ บุญ และดำยืนนิ่งอยู่ที่ประจำ ตามีเส้นแสงเขียวพาด\n'
  + 'ทัณฑ์: "ขวาง ... ไว้ ... ทุก ... ทาง"\n'
  + 'นิรา: "ท่านคะ ที่นี่คือที่ที่ท่านเริ่มงานใช่ไหมคะ ดิฉันขอโทษที่ต้องให้ท่านเห็นแบบนี้ค่ะ"\n'
  + 'ยมบาทน้อย: "ผมรู้ครับ ผมจะกลับมาให้ทุกคนที่นี่ได้ยินเสียงผมอีกครั้ง"\n'
  + 'กุมภัณฑ์: "ข้า ... ข้ายังกำกระบองอยู่นะ แต่ข้ารู้ว่าข้าไม่ควรฟาดใคร ไปเถิดท่าน"',
    en:
    'Narration: Yama and Nira pass the Suvarnabhumi Gate, where Kumphan stands, his club still in his grip but its tip pointed at the ground. The first reaper registry hall where Yama ever worked is a black frame, its name-board scorched past reading, thin smoke drifting above the row of posts. Taan, Pleng, Kan, Boon and Dam stand motionless at their posts, a line of green light across their eyes.\n'
  + 'Taan: "Block ... every ... road."\n'
  + 'Nira: "Sir, this is where you began your work, is it not? I am sorry you have to see it like this."\n'
  + 'Yama: "I know. I will come back so that everyone here hears my voice again."\n'
  + 'Kumphan: "I ... I am still gripping my club, but I know I should not swing it at anyone. Go on, sir."' } },
]},
```
- ยมทูตที่ถูกควบคุมไม่สู้ (ยืนนิ่ง แตะแล้วขึ้นบรรทัดสั้น "ขวาง ... ไว้ ... ทุก ... ทาง" TH/EN `Block ... every ... road.`)
### 7.3 ปลดปล่อยโซน 3 → 2 → 1 (SIG เดิม + บทปลดปล่อย)
ลำดับต่อโซน: เข้าโซน → `zN-fire` → เดินไปชายแดนของโซน → `signal-<zone>-open` (เดิม 2 หน้า ใช้ตรงตัว) → สู้ (SIG เดิม) → `signal-<zone>-win` (เดิม ใช้ตรงตัว) → **`zN-restored` (ใหม่ 1 หน้า)** + NR-1
- ลำดับโซน: **3 วาลดริก → 2 อากุระ → 1 ทัณฑสูร** (เดินกลับจาก 3-4 ตามทาง) · ผู้เล่นข้ามลำดับไม่ได้ (ติดประตูชายแดนที่ปิดด้วยแสงเขียว)
```js
'z3-restored': { title:{ th:'ปัจฉิมตื่นอีกครั้ง', en:'The West Wakes Again' }, pages:[
  { title:{ th:'ไฟดับ', en:'The Fires Go Out' }, line:{ th:
    'บรรยาย: เมื่อวาลดริกพ่าย แสงเขียวหลุดจากตาของโพเอน่า นัวร์ อ็อกเนียน ซิบิล และเกรซพร้อมกัน เปลวไฟตามโครงอาคารสะดุดแล้วดับ หิมะกลับขาวทีละเกล็ด ท่าเรือปัจฉิมที่ถูกแสงเขียวล็อกส่งเสียงคลิกเป็นเสียงกลอนเปิด\n'
  + 'โพเอน่า: "ข้า ... ข้าเห็นท่านยืนอยู่ ข้าได้ยินเสียงนับในหัวนับ \'สาม\' อีกแล้ว ข้านับตามไม่ทัน"\n'
  + 'นัวร์: "ผมขอโทษครับ ผมไม่รู้ว่าผมทำอะไรไปบ้าง"\n'
  + 'ยมบาทน้อย: "ไม่เป็นไรครับ ทุกคนกลับมาแล้ว"',
    en:
    'Narration: When Valdric falls, the green light leaves the eyes of Poena, Noir, Ognion, Sybil and Grace together. The flames along the frames falter and go out. The snow turns white flake by flake. The Western harbour, locked by green light, gives a click like a bolt drawn back.\n'
  + 'Poena: "I ... I see you standing there. I heard the counting in my head say \'three\' again. I could not keep count."\n'
  + 'Noir: "I am sorry, sir. I do not know what I did."\n'
  + 'Yama: "It is all right. Everyone is back."' } },
]},
```
- `z2-restored` · `z1-restored` เขียนเต็ม TH/EN ด้านล่าง (โครงเดียวกับ `z3-restored` · ไฟดับ · ยมทูตของโซนนั้นตื่น · ตัวเลขนับ "สอง" ของอากุระ / "หนึ่ง" ของทัณฑสูร ตามที่ SIG เดิมเขียน · Guard ของโซนพูด 1 บรรทัด · ท่าเรือเปิดเสียงคลิก · Reese 19 พ.ย. ข้อ 4.1)
```js
'z2-restored': { title:{ th:'บูรพาตื่นอีกครั้ง', en:'The East Wakes Again' }, pages:[
  { title:{ th:'โคมดวงแรก', en:'The First Lantern' }, line:{ th:
    'บรรยาย: เมื่ออากุระพ่าย แสงเขียวหลุดจากตาของโกคุ โฮมุระ ซาโตริ เมกุมิ และคุโรพร้อมกัน เปลวไฟตามเสาแดงสะดุดแล้วดับ โคมกระดาษดวงแรกที่ปลายท่าเรือกลับสว่างเป็นสีแดงอุ่น แล้วดวงถัดไปติดตามกันมาเป็นแถว ท่าเรือบูรพาที่ถูกแสงเขียวล็อกส่งเสียงคลิกเป็นเสียงกลอนเปิด\n'
  + 'โกคุ: "ข้า ... ข้าได้ยินเสียงนับในหัวนับ \'สอง\' ซ้ำ ๆ มาตลอด ตอนนี้มันเงียบแล้ว ข้าไม่รู้ว่าข้าทำอะไรไปบ้าง"\n'
  + 'ซาโตริ: "ท่านผู้ถือบัญชี ดิฉันเห็นท่านยืนอยู่ตลอด ดิฉันขอบคุณที่ท่านไม่ถอย"\n'
  + 'กวนอู: "ข้าบอกท่านแล้วว่าท่านไม่ผิด ข้าไม่ได้บอกว่าข้าเป็นห่วงท่านด้วย"\n'
  + 'ยมบาทน้อย: "ผมขอบคุณครับ ทุกคนกลับมาแล้ว"',
    en:
    'Narration: When Akura falls, the green light leaves the eyes of Goku, Homura, Satori, Megumi and Kuro together. The flames along the red posts falter and go out. The first paper lantern at the end of the harbour glows a warm red again, and the next lights after it, one by one in a row. The Eastern harbour, locked by green light, gives a click like a bolt drawn back.\n'
  + 'Goku: "I ... I heard the counting in my head say \'two\' again and again, all along. Now it has gone quiet. I do not know what I did."\n'
  + 'Satori: "Keeper of the ledger, I saw you standing there all the time. Thank you for not stepping back."\n'
  + 'Guan Yu: "I told you that you were not at fault. I did not tell you that I was also worried for you."\n'
  + 'Yama: "I thank you. Everyone is back."' } },
]},
'z1-restored': { title:{ th:'สุวรรณภูมิตื่นอีกครั้ง', en:'Suvarnabhumi Wakes Again' }, pages:[
  { title:{ th:'เสียงนับที่หยุด', en:'The Counting Stops' }, line:{ th:
    'บรรยาย: เมื่อทัณฑสูรพ่าย แสงเขียวหลุดจากตาของทัณฑ์ เพลิง กานต์ บุญ และดำพร้อมกัน เปลวไฟตามโครงหอทะเบียนสะดุดแล้วดับ ควันบางจางลงจนมองเห็นแนวเสาทั้งแถว ท่าเรือสุวรรณภูมิที่ถูกแสงเขียวล็อกส่งเสียงคลิกเป็นเสียงกลอนเปิด และท่าเรือทุกโซนสว่างไฟเขียวอ่อนพร้อมกันบนแผ่นกระจกของนิรา\n'
  + 'เพลิง: "ท่านยมบาทน้อย ข้า ... ข้าได้ยินเสียงนับ \'หนึ่ง\' ในหัวตลอดเวลา ข้านับตามไม่ทัน แต่ข้าไม่เคยลืมว่าท่านเป็นใคร"\n'
  + 'ดำ: "ถ้าท่านต้องไปต่อ ให้พวกข้าตามไปด้วย ข้าไม่อยากเห็นท่านยืนคนเดียว"\n'
  + 'กุมภัณฑ์: "ข้าวางกระบองลงแล้ว ข้าดีใจที่ไม่ต้องฟาดใคร"\n'
  + 'ยมบาทน้อย: "ผมไม่อยากให้พวกท่านเหนื่อยครับ แต่ผมจะเรียกถ้าจำเป็น"\n'
  + 'นิรา: "ท่านคะ ท่าเรือทุกโซนเปิดแล้วค่ะ เหลือแต่กลับโซน 4"',
    en:
    'Narration: When Tanthasura falls, the green light leaves the eyes of Taan, Pleng, Kan, Boon and Dam together. The flames along the frames of the registry hall falter and go out. The thin smoke clears until the whole row of posts can be seen. The Suvarnabhumi harbour, locked by green light, gives a click like a bolt drawn back, and every zone\'s harbour lights a soft green at once on Nira\'s pane.\n'
  + 'Pleng: "Yama, sir, I ... I heard the counting say \'one\' in my head the whole time. I could not keep count. But I never forgot who you are."\n'
  + 'Dam: "If you must go on, let us follow. I do not want to see you stand alone."\n'
  + 'Kumphan: "I have put my club down. I am glad I did not have to swing it at anyone."\n'
  + 'Yama: "I do not want you to be worn out. But I will call you if it is needed."\n'
  + 'Nira: "Sir, every harbour is open. Only the way back to Zone 4 remains."' } },
]},
```
- **NR-1 · ท่าเรือเปิดแล้ว (ต่อโซน)** หัวข้อ: ท่าเรือ<ชื่อโซน>เปิดอีกครั้ง · EN: The <Zone> Harbour Is Open Again · ข้อความ: ท่าเรือของโซนนี้กลับมาใช้ได้ ท่านล่องเรือกลับโซนนี้ได้อีกครั้ง · EN: This zone's harbour works again. You may sail back to this zone. · ปุ่ม: รับทราบ · EN: Understood
### 7.4 ครบสามโซน → กลับโซน 4
เมื่อ `signalTh` `signalAsia` `signalWest` ครบ → ท่าเรือทุกแห่งเปิด → เรือพากลับโซน 4 ได้ → ถึงโซน 4 เล่น `cyber-signal-close` (เดิม 3 หน้า ใช้ตรงตัว) + รางวัล `signalClose` เดิม
### 7.5 `cyber-signal-close` · หมายเหตุ
- "คนต่อไปที่เขาจะลองคือใคร / คนที่ตัดสินแทนสาขาทั้งสี่ค่ะ ดิฉันไม่อยากพูดชื่อ" ใช้ตรงตัว เป็นปูทางหัวหน้าถูกสิง 4 คน (หัวข้อ 8.4)

## 8. คดีครบ 15 · ศึกสุดท้าย · บอสสุดท้าย · ฉากจบ
ต้นฉบับ: "คดีครบ 15 : ปลดปล่อยหัวหน้าทั้งสี่และสู้บอสสุดท้าย · เริ่มมีหน้าต่างแจ้ง ว่ามีปีศาจบุกเข้ามา (เป็นบอสโซน 4 อาร์คอน-ศูนย์ — จอมข้อมูลผู้ตรวจการ มายืนอยู่ตำแหน่งเดิม และจับ HOME-67 มัดอยู่ข้างๆ) เมื่อเราเข้าไปใกล้จะมีหน้าต่างแจ้งเตือนว่า กำลังเข้าสู่เนื้อเรื่องสุดท้ายของเกม · เมื่อกดเข้าไปสู้ เริ่มด้วยสู้กับปีศาจ 3 wave · พอสู้เสร็จ แต่ยังเหลือลูกน้องบอสโซน 4 อีกเยอะเลย cutscene story-cyberhell-01-v2 · และ อยู่ๆด้านหลัง ก็มียมฑูตและ guard จากทุกโซน โผล่ออกมาช่วยเรา พุ่งเข้าไปสู้กับลูกน้องโซน 4 แทนเรา cutscene story-cyberhell-reinforcements-01-02 · ถัดไป Cutscene story-cyberhell-02-v3 บอสโซน 4 (อาร์คอน-ศูนย์) จะสามารถควบคุม หัวหน้าของ Yama ทั้ง 3 โซน ก่อนหน้านี้ โดยเราต้องสู้กับ หัวหน้า โซน1 (พ่อเรา พญายมบาท) · หัวหน้า โซน 2 (จ้าวเหวิน) · หัวหน้า โซน 3 (ฮาลวาร์) · หัวหน้า โซน 4 (เน็กซาร) · เมื่อชนะขึ้น cutscene story-cyberhell-03-v4 · แล้วถึงจะสู้กับบอสโซน 4 ได้ · ถ้าชนะก็ได้ จบเกม เราจะปกครองทั้ง 4 โซนด้วยความสงบสุข · ฉากจบขึ้น cutscene story-ending-01-03-v4"
**ข้อควรระวัง [R]:** พญายมบาท (พ่อ) ถูกควบคุมแต่ไม่ถูกทำร้ายหนัก · ไม่มีภาพเลือด ไม่มีภาพหัวหน้าตาย · อาร์คอน-ศูนย์เป็นศัตรูที่เป็นระบบ ไม่ใช่ตัวแทนศาสนาหรือชาติใด · จบเกมแบบ "ปกครองสงบสุข" ไม่ล้อพิธีกรรม

### 8.1 ลำดับ + งานโค้ด (Toby)
1. **NF-1** (ปีศาจบุกโซน 4 · Archon-Zero ยืนที่ตำแหน่งเดิมพร้อม HOME-67 ถูกมัด) → เดินเข้าใกล้ → **NF-2** (กำลังเข้าสู่เนื้อเรื่องสุดท้าย) → `z4-final-open` (2 หน้า)
2. **ปีศาจ 3 ระลอก** (ต้นฉบับ "3 wave" · `final-event.js` ปัจจุบัน **4 ระลอก** `minion:1..4` `ลูกน้องระลอก n/4` → ต้องแก้เป็น 3 · แก้ `data.js` `FINAL_EVENT.waveRewards` จาก 4 รายการเป็น 3 · ชื่อ `ลูกน้องระลอก n/3` → **งานโค้ดของ Toby** · ผมไม่ได้แก้)
3. `cyber-approach` (ภาพ `story-cyberhell-01-v2` · **ข้อความใหม่ หัวข้อ 8.2**) เล่นหลังระลอก 3
4. `cyber-reinforcements` + `cyber-reinforcements-advance` (หัวข้อ 8.3)
5. `cyber-control` (ภาพ 02-v3) → **สู้หัวหน้าถูกสิง 4 คน** โซน 1 → 2 → 3 → 4 (หัวข้อ 8.4 · ตามลำดับ `RULER_ORDER` ของโค้ดเดิม `th, asia, west, cyberhell`)
6. `cyber-duel` (ภาพ 03-v4) → **สู้อาร์คอน-ศูนย์** (หัวข้อ 8.5)
7. `ending-capture` (01-v4) → แท่นตัดสินสุดท้าย (เดิม `boss-justice` ผมไม่ได้อ่าน) → `ending` 2 หน้า (02-v3 · 03-v1) → จบเกม
- เปลี่ยนจากโค้ดเดิม: **ลำดับ "01-v2 หลังระลอก 3" ไม่ใช่ก่อนระลอก 1** · ผมไม่รู้ว่าโค้ดเดิมเล่น `cyber-approach` ก่อนศึกหรือหลัง (`presentation:'approach'`) · Toby ปรับตามต้นฉบับคุณเป้ที่ระบุว่าหลังระลอก 3
- พักระหว่างศึกหัวหน้า: ตามโค้ดเดิม (พักและซื้อของได้ตามที่ `cyber-reinforcements-advance` เขียน)

### 8.2 หน้าต่างแจ้งเตือน + คัตซีนเปิด
**NF-1 · ปีศาจบุกเข้าโซน 4**
- หัวข้อ: ผู้บุกเข้าสู่ใจกลางโซน 4 · EN: An Invader at the Heart of Zone 4
- ข้อความ: ปีศาจบุกเข้ามาถึงใจกลางโซน 4 บอสโซน 4 อาร์คอน-ศูนย์ยืนอยู่ตำแหน่งเดิมและจับ HOME-67 มัดไว้ข้างตัว ไปที่นั่น
- EN: A demon has invaded the heart of Zone 4. The Zone 4 boss Archon-Zero stands in his old place with HOME-67 bound beside him. Go there.
- ปุ่ม: ไปที่นั่น · EN: Go there
**NF-2 · เนื้อเรื่องสุดท้าย**
- หัวข้อ: เนื้อเรื่องสุดท้ายของเกม · EN: The Final Chapter
- ข้อความ: ท่านกำลังเข้าสู่เนื้อเรื่องสุดท้ายของเกม ก่อนเริ่มโปรดจัดทีม พักและซื้อของให้พร้อม · EN: You are about to enter the final chapter. Before you begin, ready your team, rest and buy what you need.
- ปุ่ม: เริ่ม / ยังก่อน · EN: Begin / Not yet
- **คำเตือนเพิ่ม (แสดงเฉพาะเมื่อ quest ลูแปงยังไม่จบ · Reese 19 พ.ย. ข้อ 4.2 · Claudy ตัดสิน):** TH ยังมีงานเสริมของ HOME-67 ค้างอยู่ (จอมโจรที่ยืนเฉย) ถ้าจะเก็บให้ครบ ควรทำก่อนเริ่มเนื้อเรื่องสุดท้าย · EN HOME-67 has a side job still pending (the thief who stands still). If you want to complete everything, finish it before starting the final chapter.
- (quest ไม่ปิดเมื่อเข้าฉากจบ · ยังทำต่อได้หลังฉากจบ ตามหัวข้อ 9.1)
**NF-3 · แบนเนอร์** ไทย: ศึกสุดท้าย · ลูกน้องระลอกที่ 1 / 2 / 3 · ผู้ถูกควบคุมทั้งสี่ · อาร์คอน-ศูนย์ · EN: The Final Battle · Wave 1 / 2 / 3 · The Four Under Control · Archon-Zero
```js
'z4-final-open': { title:{ th:'ผู้ตรวจการที่ถือปลายสาย', en:'The Inspector Who Holds the Line' }, pages:[
  { title:{ th:'อาร์คอน-ศูนย์', en:'Archon-Zero' }, line:{ th:
    'บรรยาย: อาร์คอน-ศูนย์ยืนกลางลานข้อมูลของโซน 4 เป็นร่างสูงในเสื้อคลุมสีเทาดำที่แสงเขียวมิ้นต์ไหลเป็นแถวตลอดตัว ใบหน้าเป็นหน้ากากเรียบไม่มีตา HOME-67 ถูกมัดด้วยเส้นแสงเขียวคุกเข่าอยู่ข้างเขา หมวกมีแถบแสงของเขาสว่างเป็นจังหวะช้า ๆ\n'
  + 'อาร์คอน-ศูนย์: "ผู้ถือบัญชี เจ้าเดินผ่านทุกโซนมาถึงที่นี่ ข้าบันทึกทุกก้าว ข้าคือผู้ตรวจการที่ถือปลายสาย ทุกบรรทัดที่ผิดตั้งแต่ต้น ข้าเป็นผู้สั่งให้ผิด เจ้าเรียกข้าว่าอะไรก็ได้ ข้าเรียกเจ้าว่า รายการที่ยังไม่ปิด"\n'
  + 'HOME-67: "ผมขอโทษที่ถูกจับครับ คุณยืนบังหน้าผมที่ศาลาตามที่ตกลงไว้ แต่ผมกลับให้คุณต้องมาช่วยผมอีกครั้ง ผมจะพยายามเป็นคนที่ยืนข้างคุณแทน"\n'
  + 'ยมบาทน้อย: "คุณไม่ได้ผิดอะไรครับ คำสัญญานั้นผมเป็นคนรับไว้ และผมยังยืนอยู่ตรงนี้"',
    en:
    'Narration: Archon-Zero stands in the middle of the Zone 4 data square, a tall figure in a grey-black cloak across which mint-green light flows in rows. His face is a smooth mask with no eyes. HOME-67, bound by lines of green light, kneels beside him. The band of light on his cap pulses slowly.\n'
  + 'Archon-Zero: "Keeper of the ledger, you have walked through every zone to reach this place. I recorded every step. I am the inspector who holds the line. Every wrong entry from the beginning, I ordered it wrong. Call me what you will. I call you an Item Not Yet Closed."\n'
  + 'HOME-67: "I am sorry I was caught. You stood in front of me at the hall as we agreed, and yet I have made you come for me again. I will try to be the one who stands beside you instead."\n'
  + 'Yama: "You have done nothing wrong. I accepted that promise, and I am still standing here."' } },
  { title:{ th:'ผมจะไม่ยอม', en:'I Will Not Yield' }, line:{ th:
    'อาร์คอน-ศูนย์: "ข้าปล่อยเจ้าเข้ามาเพราะข้าต้องการให้ทุกบรรทัดของเจ้าอยู่ในลานนี้ ที่ที่ข้าลบได้ในครั้งเดียว ลูกน้องของข้ายังมีอีกนับพัน"\n'
  + 'นิรา: "ท่านคะ ดิฉันได้ยินเสียงนับค่ะ หนึ่ง สอง สาม สี่ ... เขากำลังนับเรา"\n'
  + 'ยมบาทน้อย: "ผมไม่ยอมให้เขานับเราครับ ผมจะนับเอง"',
    en:
    'Archon-Zero: "I let you in because I wanted every line of yours in this square, where I can erase it in one stroke. I have thousands of servants still."\n'
  + 'Nira: "Sir, I hear the counting. One, two, three, four ... he is counting us."\n'
  + 'Yama: "I will not let him count us. I will count for myself."' } },
]},
```
**`cyber-approach` ข้อความใหม่ (แทนข้อความ "สี่ระลอก" · ภาพ `story-cyberhell-01-v2` ใช้ต่อ · เล่นหลังระลอก 3)**
- ชื่อหน้า: "สามระลอกผ่านแล้ว แต่ลูกน้องยังเหลืออีกมาก" · EN "Three waves down, and still so many servants"
- ข้อความ: ปีศาจสามระลอกพ่ายแพ้แล้ว แต่ลูกน้องของอาร์คอน-ศูนย์ยังเหลืออีกเป็นร้อยตรงหน้า รับเงินและไอเท็มแต่ละระลอก แล้วเตรียมตัวต่อได้ · EN: Three waves of demons have fallen, yet hundreds of Archon-Zero's servants still stand before you. Take the coin and items from each wave and prepare to go on.
- ท้ายหน้า ยมบาทน้อย: "ยังมีอีกเยอะ" · นิรา: "ท่านคะ ดิฉันไม่เห็นทางไหนที่จะผ่านไปได้ค่ะ" · EN Yama: "There are still so many." Nira: "Sir, I see no path through."

### 8.3 กองหนุนจากทุกโซน `cyber-reinforcements` · `cyber-reinforcements-advance`
(ภาพ `story-cyberhell-reinforcements-01` · `-02` ใช้ต่อ · ข้อความเดิม "สี่ระลอก" → "สามระลอก" · เพิ่มบรรทัดตัวละครด้านล่าง · **ชื่อกองหนุนสี่โซน** ผมหา `final.reinforcement.*` ไม่เจอ → เสนอชื่อ:)
| โซน | ภาพ (โค้ดเดิม) | ชื่อบนป้าย TH / EN |
|---|---|---|
| โซน 1 | `crew-plerng` | เพลิงและกุมภัณฑ์ · Pleng and Kumphan |
| โซน 2 | `crew-dam` | ดำ (คุโร) และกวนอู · Dam (Kuro) and Guan Yu |
| โซน 3 | `crew-boon` | บุญ (เกรซ) และแวน เฮลซิง · Boon (Grace) and Van Helsing |
| โซน 4 | `crew-guard` (โค้ด `final-event.js:78` ใช้ `img/crew-guard-v2.webp` = ภาพ Guard · Claudy ตรวจ 19 พ.ย.) | ผู้เฝ้าด่านโซน 4 · Zone 4 Gate Guard (**แก้ป้ายให้ตรงภาพ** · Reese 19 พ.ย. · ไม่ใช้ "ซิสอ็อปและ WATSON-03" แล้ว) |
- **ข้อควรทราบ:** ภาพกองหนุนในโค้ดเดิมเป็นยมทูตตัวเดียวต่อโซน (plerng dam boon guard) ไม่ใช่คู่ยมทูต+Guard · ผมเสนอป้ายแบบ "ยมทูต + Guard" ตามต้นฉบับคุณเป้ ("ยมฑูตและ guard จากทุกโซน") **ถ้าภาพเดิมไม่มี Guard ในภาพ ต้องวาดเพิ่มหรือเปลี่ยนป้าย → Claudy ตรวจ**
- **กองหนุนโซน 4 (แก้ตาม Reese 19 พ.ย. + Claudy ตรวจโค้ด):** ภาพ `crew-guard-v2.webp` เป็นภาพ Guard จึงแก้ป้ายแถวโซน 4 เป็น "ผู้เฝ้าด่านโซน 4" ให้ตรงภาพ · **ขั้นตอนของคุณเป้ไม่หาย:** (1) Guard โซน 4 ยังเป็นหนึ่งในกองหนุนทุกโซน (2) WATSON-03 ยังพูดบรรทัดของเขาในคัตซีน `cyber-reinforcements` เพราะเขาคือ Guard โซน 4 ตาม G13 (3) ไม่เพิ่มไฟล์ภาพที่ต้องวาดใหม่ · ซิสอ็อปไม่อยู่ในภาพกองหนุนแล้ว (ภาพเดิมเป็นตัวเดียวต่อโซนอยู่แล้ว) · ถ้าคุณเป้ต้องการให้ภาพกองหนุนโซน 4 หน้าตาเป็น WATSON-03 จริง ให้ตัดสไปรท์จาก W1 (ตารางภาพ กลุ่ม W) มาแทน `crew-guard-v2` ไม่นับเป็นไฟล์วาดใหม่ (ดู "ต้องให้คุณเป้ตัดสิน" ข้อ 12)
```js
'cyber-reinforcements': { title:{ th:'กองหนุนจากทั้งสี่โซน', en:'Reinforcements From All Four Zones' }, pages:[
  { title:{ th:'พวกเราไม่ได้มาคนเดียว', en:'We Did Not Come Alone' }, line:{ th:
    'บรรยาย: ปีศาจสามระลอกพ่ายแพ้แล้ว แต่ลูกน้องของอาร์คอน-ศูนย์ยังเหลืออีกมาก เสียงฝีเท้าด้านหลังเผยให้เห็นยมทูตและผู้เฝ้าด่านจากทั้งสี่โซนที่เพิ่งถูกปลดปล่อย พุ่งเข้าสู้แทนยามา\n'
  + 'เพลิง: "ท่านยมบาทน้อย พวกข้าขอสู้แทนท่านเอง!"\n'
  + 'กวนอู: "ข้าถือคำสัตย์ว่าท่านไม่ถูกลบโดยมือเดียว ข้ายืนข้างท่าน"\n'
  + 'แวน เฮลซิง: "ข้าเรียนมาแล้วว่าผู้ที่ยืนคนเดียวมักแพ้ ข้ายืนข้างท่านครั้งนี้"\n'
  + 'WATSON-03: "กระผมบันทึกว่าท่านเป็นรายการที่ยังไม่ถูกปิด และกระผมไม่ยอมให้ปิดรายการนั้นครับ"',
    en:
    'Narration: Three waves of demons have fallen, but many of Archon-Zero\'s servants still stand. Footsteps behind reveal the reapers and gate guards of all four zones, newly freed, charging in to fight in Yama\'s place.\n'
  + 'Pleng: "Yama, sir, we will fight in your place!"\n'
  + 'Guan Yu: "I hold my oath that you shall not be erased by a single hand. I stand beside you."\n'
  + 'Van Helsing: "I have learned that one who stands alone usually loses. This time I stand beside you."\n'
  + 'WATSON-03: "I record that you are an item not yet closed, and I will not allow it to be closed."' } },
]},
'cyber-reinforcements-advance': { title:{ th:'กองหนุนเปิดทาง', en:'Reinforcements Open the Way' }, pages:[
  { title:{ th:'เปิดทางให้ยมบาทน้อย', en:'Opening the Way for Yama' }, line:{ th:
    'บรรยาย: กองหนุนพุ่งเข้ารับมือลูกน้องที่เหลือ เส้นทางไปหาหัวหน้าทั้งสี่เปิดออกเป็นช่องแคบ ยมบาทน้อยกับนิรากวาดตามอง พญายมบาทและหัวหน้าอีกสามคนยืนนิ่งอยู่ท้ายลานตาพาดแสงเขียว\n'
  + 'ดำ: "ไปเถิดท่าน ข้าจะกั้นประตูหลัง"\n'
  + 'นิรา: "ท่านคะ ดิฉันขออยู่ข้างท่านทุกก้าวค่ะ"',
    en:
    'Narration: The reinforcements charge to hold off the remaining servants. A narrow gap opens along the road to the four lords. Yama and Nira scan the square. Yamabat and the other three lords stand motionless at the far end, green light across their eyes.\n'
  + 'Dam: "Go, sir. I will hold the back door."\n'
  + 'Nira: "Sir, I will stay beside you every step."' } },
]},
```
### 8.4 `cyber-control` · หัวหน้าถูกสิง 4 คน (ภาพ `story-cyberhell-02-v3` · `leader-th/asia/west/cyberhell-possessed` ใช้ต่อ)
```js
'cyber-control': { title:{ th:'ผู้ถูกควบคุมทั้งสี่', en:'The Four Under Control' }, pages:[
  { title:{ th:'มือที่สอดเข้าไปในผู้ปกครอง', en:'A Hand Inside the Rulers' }, line:{ th:
    'บรรยาย: อาร์คอน-ศูนย์ยกมือสีเทาดำหนึ่งข้าง เส้นแสงเขียวพุ่งผ่านลานไปที่ผู้ปกครองสี่คนพร้อมกัน พญายมบาท จ้าวเหวิน ฮาลวาร์ และเน็กซารเงยหน้าขึ้นช้า ๆ ตาพาดแสงเขียว\n'
  + 'อาร์คอน-ศูนย์: "เจ้าชนะลูกน้องข้า ชนะผู้ตรวจการ ชนะเทวดา ลองชนะคนที่เจ้ากลัวทำร้ายที่สุดดู ข้าคือผู้ที่ควบคุมผู้ปกครองของเจ้า"\n'
  + 'ยมบาทน้อย: "ผมจะไม่ทำร้ายท่านพ่อครับ ผมจะแค่ตัดสายที่พันอยู่รอบท่าน"',
    en:
    'Narration: Archon-Zero raises one grey-black hand. Lines of green light shoot across the square into the four rulers at once. Yamabat, Zhao Wen, Halvar and Nexar lift their heads slowly, green light across their eyes.\n'
  + 'Archon-Zero: "You beat my servants, beat the inspectors, beat the devas. Try to beat the ones you fear to hurt most. I am the one who controls your rulers."\n'
  + 'Yama: "I will not hurt Father. I will only cut the lines wrapped around him."' } },
]},
```
| ผู้ถูกควบคุม | ก่อนสู้ (เสียงเดิมขาด ๆ · TH / EN) | หลังชนะ (TH / EN) |
|---|---|---|
| 1 พญายมบาท (พ่อ) `leader-th-possessed` | "ขวาง ... ไว้ ... ลูก ... ลูก ... ข้า ... ไม่ ... เคย ... ชม ... เจ้า" / "Block ... my son ... my son ... I ... never ... praised ... you" | "ข้า ... ข้าได้ยินเสียงเจ้าเรียกข้าว่าท่านพ่อ ขอบใจ ข้าจะเหนื่อยแต่ข้าจะยืนข้างเจ้า" / "I ... I heard you call me Father. Thank you. I will be tired, but I will stand beside you." |
| 2 จ้าวเหวิน `leader-asia-possessed` | "บัลลังก์ ... บูรพา ... ปิด ... ทุก ... ทาง" / "The throne ... of the East ... shuts ... every ... road" | "ข้ากลับมาแล้ว บัลลังก์ของข้าไม่ได้เป็นของใครอื่น ข้าขอบใจ" / "I am back. My throne belongs to no one else. My thanks." |
| 3 ฮาลวาร์ `leader-west-possessed` | "เหมันต์ ... ปิด ... หัวใจ ... ข้า ... เย็น ... เกินไป" / "Winter ... shuts ... my heart ... I am ... too cold" | "ความเย็นของข้ากลับมาเป็นของข้าเอง ไม่ใช่ของมัน ขอบใจ" / "My cold is my own again, not its. Thank you." |
| 4 เน็กซาร `leader-cyberhell-possessed` | "เครือข่าย ... ส่ง ... คำสั่ง ... ข้า ... เป็น ... แค่ ... สาย" / "The network ... sends ... orders ... I am ... only ... a line" | "ข้าเป็นสายที่ถูกตัดแล้ว และข้าจะต่อสายใหม่ให้เป็นของท่าน" / "I am a line cut free, and I will splice a new one in your name." |
- เนื้อ "พ่อไม่เคยชม" เชื่อมกับส่วน A (ยมทัตไม่เคยได้คำชมจากพ่อ) และฉากจบ ("ทำได้ดีมากลูกพ่อ") · ตัวเลขศึกหัวหน้า = ตามโค้ดเดิมของ `ruler:<zone>` ไม่แตะ
- ไม่มีภาพเลือด ไม่มีภาพหัวหน้าล้มทับ · เมื่อชนะหัวหน้าแต่ละคน หัวหน้าที่หลุดจากการควบคุมถอยไปยืนข้างลาน

### 8.5 `cyber-duel` · อาร์คอน-ศูนย์ (ภาพ `story-cyberhell-03-v4` ใช้ต่อ)
- เล่น `cyber-duel` (เดิม) หลังหัวหน้าครบสี่ · ข้อความเดิมคง ("หัวหน้าทั้งสี่เป็นอิสระแล้ว ยมบาทน้อยและทีมที่เตรียมพร้อมก้าวเข้าสู่ศึกตัดสินกับผู้ตรวจการโซน 4")
- เริ่มสู้ อาร์คอน-ศูนย์: "ข้าบันทึกเจ้ามาตั้งแต่เริ่ม รายการที่ยังไม่ปิด ข้าจะปิดเจ้าเอง" · EN: "I have recorded you from the start. Item not yet closed. I will close you myself."
- เลือดเหลือครึ่ง อาร์คอน-ศูนย์: "ทำไมเจ้านับไม่ได้ ข้านับเจ้าครบทุกก้าว แต่ผลลัพธ์ไม่ตรงกับตัวเลข" · EN: "Why can you not be counted? I counted you at every step, but the result does not match the numbers."
- เลือดเหลือครึ่ง HOME-67 (ถูกปล่อยจากมัด ยืนด้านข้างในฉากสู้): "นั่นเพราะตัวเลขไม่ได้บอกว่าเขายืนข้างใคร" · EN HOME-67: "Because numbers do not say whom he stands beside."
- นิรา เลือดเหลือครึ่ง: "ท่านคะ เสียงนับของเขาติดขัดแล้วค่ะ" · EN Nira: "Sir, his counting voice has begun to stutter."
- ท่าโจมตี (Toby จูนตามบอสเดิม ไม่เขียนท่าใหม่)
**บรรทัดหลังชนะ (ก่อน `ending-capture`)**
- อาร์คอน-ศูนย์: "ข้า ... ปิด ... ไม่ ... ได้ ... รายการ ... ยัง ... ไม่ ... ปิด ... " · EN: "I ... cannot ... close ... the item ... is still ... not closed ..."
- HOME-67: "ผมเรียกชื่อมันได้แล้ว ไม่ใช่ AI Scammer Robot ไม่ใช่อาร์คอน-ศูนย์ แต่เป็นเสียงที่ไม่มีใครรับผิดชอบ" · EN: "I can name it now. It is not AI Scammer Robot, not Archon-Zero, but a voice that no one takes responsibility for."
- ยมบาทน้อย: "งั้นผมจะรับผิดชอบเอง ผมจะอ่านบัญชีทุกเล่มให้จบ" · EN Yama: "Then I will take responsibility. I will read every ledger to the end."
### 8.6 แท่นตัดสินและฉากจบ
- `ending-capture` (เดิม 1 หน้า ภาพ `ending-01-v4`) ใช้ตรงตัว · ขั้นแท่นตัดสินสุดท้าย (ตามโค้ดเดิม `boss-justice` ที่ผมไม่ได้อ่าน) ใช้ตรงตัว · สำนวนไต่สวนอาร์คอน-ศูนย์ ถ้าเดิมมี ใช้ได้ **Claudy ตรวจ**
- `ending` (เดิม 2 หน้า ภาพ `ending-02-v3` `ending-03-v1` + วิดีโอ) **ใช้ตรงตัว** · ข้อความเดิม "ยมบาทน้อยปกครองทั้ง 4 โซนด้วยความสงบสุข โดยมีนิรา พ่อ และหัวหน้าโซน 2–4 ร่วมดูแลอยู่เคียงข้าง" และ "ทำได้ดีมากลูกพ่อ" ถูกเสริมด้วย `ending-coda` (ไม่บังคับ):
```js
'ending-coda': { title:{ th:'ผู้ที่ยืนข้างผู้ถือบัญชี', en:'Those Who Stand Beside the Ledger-Keeper' }, pages:[
  { title:{ th:'ท่าเรือที่เปิดทุกแห่ง', en:'Every Harbour Open' }, line:{ th:
    'บรรยาย: ท่าเรือทั้งสี่โซนเปิดพร้อมกันครั้งแรกในรอบเดือน กองเรือเล็กลำหนึ่งจากแต่ละโซนส่งเสียงแตรในจังหวะเดียวกัน WATSON-03 ยืนอยู่ข้างเสาท่าเรือโซน 4 บันทึกทุกลำ HOME-67 ยืนอยู่ข้าง ๆ ถือแผ่นกระจก ตัวเลขเรืองแสงเป็นสีเขียวนุ่มทั้งแผ่น\n'
  + 'HOME-67: "ผมไม่เคยเห็นตัวเลขไหนสบายตาเท่านี้มาก่อนครับ"\n'
  + 'ยมบาทน้อย: "ผมก็เหมือนกันครับ"\n'
  + 'นิรา: "ดิฉันขอเปิดสมุดเล่มใหม่ค่ะ"',
    en:
    'Narration: The harbours of all four zones open at once for the first time in a month. A small ship from each zone blows its horn in the same beat. WATSON-03 stands by a post of the Zone 4 harbour, logging every ship. HOME-67 stands beside him, holding the pane, every glowing figure on it a soft green.\n'
  + 'HOME-67: "I have never seen numbers so easy on the eye."\n'
  + 'Yama: "Nor have I."\n'
  + 'Nira: "I should like to open a new notebook."' } },
]},
```
- ภาพ: ใช้ภาพท่าเรือโซน 4 เดิม (ตรวจ) · ตัดได้ ไม่กระทบเรื่อง

## 9. quest เสริม HOME-67 · จับลูแปง (G29) → อัญเชิญลูแปงได้
ต้นฉบับ: "QUEST เสริมของ HOME-67 เมื่อรับ QUEST จะขึ้นว่าให้ช่วยตามจับจอมโจร lupin (คือจอมโจรในตำนาน mode อนาคต ไฮเทค) ซึ่งจะปลอมตัว เป็นคนงานใน โซน4 ของเรา เพิ่มมาคนนึง ยืนเฉยๆ ไม่ทำงาน เมื่อเข้าไปคุย และบอกว่า นายไม่ใช่คนงานที่นี้ จับได้ จะต้องสู้กับ Lupin โดยมี HOME-67 ช่วย เมื่อชนะจะสามารถ อัญเชิญ LUPIN ได้" · G18 "11 lupin (อัญเชิญได้ หลังจากได้" ขาด → ใช้เงื่อนไขจาก quest นี้ (ตามคุณเป้ D4)
**ข้อควรระวังเนื้อหา [R]:** "ลูแปง" = **จอมโจรสุภาพแห่งอนาคต ที่ผมแต่งขึ้นเป็นตัวละครของเกม** · แนวคิดโจรสุภาพที่ปลอมตัวเก่ง · **สถานะลิขสิทธิ์ (Reese 19 พ.ย. ข้อ 1.3):** TH ลูแปงฉบับเลอบลังที่ตีพิมพ์ก่อนปี ค.ศ. 1931 เป็นสาธารณสมบัติในสหรัฐ และหมดอายุลิขสิทธิ์ในไทยตามหลักชีวิตผู้แต่ง+50 ปี (เลอบลังเสียชีวิต ค.ศ. 1941) บทนี้ใช้เฉพาะแนวคิด "จอมโจรสุภาพ" ไม่ใช้โครงเรื่องจากเล่มปลายยุค / EN Leblanc's Lupin works published before 1931 are public domain in the US and expired in Thailand under life+50 (Leblanc died 1941). This script uses only the general "gentleman thief" concept, not plots from his later books. · **ห้ามลอกลักษณะเฉพาะของลูแปงที่ 3 หรือการ์ตูน/ภาพยนตร์/ซีรีส์ฉบับใด** (ไม่ใช้ชุดสูทสีเดียวกัน ไม่มีตัวละครเสริมที่ตรงกัน ไม่มีบทพูดหรือท่าเด่นของฉบับใด) · Reese ตรวจ
### 9.1 ลำดับ
เงื่อนไขเริ่ม: HOME-67 ยืนที่ท่าเรือ (หลังหัวข้อ 2.5 · พักช่วงเนื้อเรื่องสุดท้าย · กลับมาเล่นได้หลังฉากจบ ตามข้อ 4.2) → คุย → **NQ-1** รับ quest → คนงานแปลกหน้าโผล่ในโซน 4 (ยืนเฉยใกล้โรงอาหาร) → คุย (ตัวเลือก) → เลือก "นายไม่ใช่คนงานที่นี่" → `z4-lupin-catch` (2 หน้า) → สู้ (ทีม ยามา + นิรา + HOME-67) → ชนะ `z4-lupin-win` (2 หน้า) → NU-1 (ปลดล็อกลูแปง) → NQ-2 (จบ quest)
- ถ้าผู้เล่นเลือก "ปล่อยไป": ลูแปงหัวเราะแล้วไม่ทำอะไร ข้อความ "เขายังยืนอยู่ที่เดิม" ให้ลองคุยใหม่ได้ (ไม่ปิด quest)
- ถ้าเริ่มฉากจบก่อนทำ quest: **Claudy ตัดสินแล้ว (19 พ.ย.) quest ไม่ปิดเมื่อเข้าฉากจบ** ยังเล่นต่อได้หลังฉากจบ ลูแปงปลดล็อกได้ตามปกติ · NF-2 เพิ่มคำเตือน (หัวข้อ 8.2) ให้ผู้เล่นรู้ว่ามีงานค้าง
- งานโค้ด Toby: ระหว่างเนื้อเรื่องสุดท้าย (กด "เริ่ม" ใน NF-2 จนจบฉากจบ) quest พักไว้ ไม่หาย · หลังฉากจบ HOME-67 กลับไปยืนที่ท่าเรือโซน 4 (ตรงกับ `ending-coda`) และปุ่มคุยเริ่ม/เล่นต่อ quest ได้ · ต้องเก็บสถานะ quest ข้ามฉากจบ
### 9.2 หน้าต่างแจ้งเตือน
**NQ-1 · รับ quest** หัวข้อ: จอมโจรที่ยืนเฉย · EN: The Thief Who Stands Still · ข้อความ: HOME-67 ขอให้ท่านช่วยตามจับจอมโจรแห่งอนาคตที่ปลอมเป็นคนงานในโซน 4 เขายืนเฉยไม่ทำงาน ไปคุยกับคนงานแปลกหน้าแล้วจับให้ได้ · EN: HOME-67 asks you to help catch a thief of the future who has disguised himself as a worker in Zone 4. He stands idle and does no work. Speak to the strange worker and catch him. · ปุ่ม: รับงาน · EN: Take the job
**NQ-2 · จบ quest** หัวข้อ: จอมโจรยอมจำนน · EN: The Thief Yields · ข้อความ: ลูแปงยอมแพ้และรับคำท้าให้ท่านเรียกใช้ในศึก · EN: Lupin yields and accepts the challenge to be called by you in battle. · ปุ่ม: ต่อ · EN: Continue
**NU-1 · ปลดล็อกลูแปง** (รูปแบบ NA-2) หัวข้อ: จอมโจรฝากหน้ากากไว้ในตะเกียง · EN: The Thief Leaves a Mask in the Lamp · ข้อความ: ลูแปงฝากหน้ากากไว้ในตะเกียงวิเศษ ท่านเรียกเขาในศึกได้ ท่าไม้ตายใช้ได้ 3 ครั้งก่อนต้องเติมพลังที่หอกระจก · EN: Lupin leaves a mask in the Magic Lamp. You can call him in battle, 3 special moves before a recharge at the Mirror Tower. · ปุ่ม: ดูตะเกียง · EN: See the Lamp
**NQ-3 · แบนเนอร์ศึก** ไทย: จับจอมโจร · ลูแปง · EN: Catching the Thief · Lupin
### 9.3 บทคุยกับคนงานแปลกหน้า (ตัวเลือก)
- (คุยครั้งแรก) คนงาน: "ผมเพิ่งมาครับ นายคนก่อนบอกให้ยืนรอคำสั่งก่อน" · EN Worker: "I just arrived, sir. The last foreman told me to stand and wait for instructions."
- ยามา: "คุณยืนที่นี่มาสามวัน ไม่ได้ยกของ ไม่ได้ถูกจ่ายงาน" · คนงาน: "ผมเป็นคนละเอียด ผมรอให้ถูกจุด" · EN Yama: "You have stood here three days. You have lifted nothing. You have been assigned nothing." · Worker: "I am a careful man. I am waiting for the right spot."
- ทางเลือก: **[นายไม่ใช่คนงานที่นี่]** / **[ขอโทษ ผมเข้าใจผิดครับ]** · EN: **[You are not a worker here]** / **[Sorry, I was mistaken]**
```js
'z4-lupin-catch': { title:{ th:'คนงานที่เดินเงียบเกินไป', en:'A Worker Who Walks Too Quietly' }, pages:[
  { title:{ th:'รองเท้าไม่มีฝุ่น', en:'Shoes Without Dust' }, line:{ th:
    'HOME-67: "คุณยมบาทน้อย ผมขอตรวจสามจุด รองเท้าของเขาไม่มีฝุ่นโลหะของโซนนี้เลย ถุงมือของเขาสะอาดเกินไป และเขายืนในจุดที่เห็นประตูหลังโรงอาหารพอดี คนงานไม่ยืนมองประตูหลังครับ"\n'
  + 'คนงาน: "(ยิ้ม) ท่านสังเกตได้ทั้งสามจุด ข้าเสียใจ ข้าหวังให้ท่านสังเกตได้แค่สองจุดก่อน"\n'
  + 'บรรยาย: คนงานปลดหมวกคลุมออก ใบหน้าเปลี่ยนไปเป็นชายหนุ่มผมดำเรียบ ตาแจ่มใส รอยยิ้มบางเหมือนทักทาย แผ่นหน้ากากโปร่งแสงบางที่ซ้อนอยู่บนใบหน้าลื่นหลุดลงมาในฝ่ามือ',
    en:
    'HOME-67: "Yama, I ask to check three points. His shoes carry none of this zone\'s metal dust. His gloves are too clean. And he stands exactly where he can see the back door of the canteen. A worker does not stand looking at the back door."\n'
  + 'Worker: "(smiles) You noticed all three. I am sorry. I had hoped you would notice only two at first."\n'
  + 'Narration: The worker pulls back his hood. His face changes into that of a young man with sleek dark hair, bright eyes and a thin smile like a greeting. A thin translucent mask layered over his face slips into his palm.' } },
  { title:{ th:'ข้าชื่อลูแปง', en:'My Name Is Lupin' }, line:{ th:
    'ลูแปง: "ข้า ลูแปง จอมโจรผู้ไม่เคยขโมยของคนจน ข้าเข้าโซนนี้เพื่อเอากุญแจสำรองของสายที่ถูกแก้ที่ซ่อนอยู่หลังประตูโรงอาหาร คนที่ถือกุญแจนั้นขโมยของจากคนหลายคน ข้าอยากขโมยกลับ"\n'
  + 'HOME-67: "ผมเข้าใจเหตุผล แต่คุณมาอย่างไม่ได้รับอนุญาต ผมต้องจับคุณก่อน"\n'
  + 'ลูแปง: "ข้ารู้ ท่านจับข้าได้ก่อนจะพบกุญแจ ข้ารับ ข้าขอสู้อย่างสุภาพ แพ้แล้วข้ายอม ชนะแล้วข้าจะไป"\n'
  + 'ยมบาทน้อย: "ผมไม่อยากให้คุณหนีไป ผมอยากให้คุณช่วยอ่านบัญชีของคนที่ถูกขโมยด้วยครับ"',
    en:
    'Lupin: "I am Lupin, a thief who has never stolen from the poor. I came into this zone to take the spare key to the altered line, hidden behind the canteen\'s back door. Whoever holds that key has stolen from many people. I wished to steal it back."\n'
  + 'HOME-67: "I understand the reason, but you came without leave. I must catch you first."\n'
  + 'Lupin: "I know. You caught me before I found the key. I accept. Let me fight politely. If I lose I yield. If I win I go."\n'
  + 'Yama: "I do not want you to run away. I want you to help me read the ledgers of the people who were robbed."' } },
]},
```
- เริ่มสู้ ลูแปง: "ข้าขอยืมจังหวะของท่านสักครู่ ท่านไม่ต้องคืนก็ได้" · EN Lupin: "Let me borrow your timing for a moment. You need not return it."
- เลือดเหลือครึ่ง ลูแปง: "ท่านผู้ถือบัญชี ข้าเพิ่งรู้ว่าข้าขโมยจังหวะท่านไม่ได้ ท่านไม่ได้นับมัน" · EN Lupin: "Keeper of the ledger, I have just learned I cannot steal your timing. You do not count it."
- HOME-67 เลือดเหลือครึ่ง: "ผมเดาจังหวะถัดไปของเขาได้ครับ ยกโล่ที่ซ้าย" · EN HOME-67: "I can guess his next beat. Raise your guard on the left."
- ท่าบอสลูแปง (ข้อเสนอ): **ขโมยจังหวะ** / Steal the Beat (ทำให้ผู้ถูกเล็งข้ามตา 1 ครั้ง) · ข้อความเตือน: "ลูแปงยิ้มแล้วเอื้อมมือ — รอบหน้าเขาจะขโมยจังหวะของคนหนึ่งคน!" · EN "Lupin smiles and reaches out — next turn he steals one person's beat!" · ชื่อท่าอัญเชิญต้องไม่ซ้ำ (ด้านล่าง)
```js
'z4-lupin-win': { title:{ th:'โจรที่ยอมรับกติกา', en:'A Thief Who Accepts the Rules' }, pages:[
  { title:{ th:'หน้ากากที่ทิ้งไว้', en:'The Mask Left Behind' }, line:{ th:
    'ลูแปง: "ข้าแพ้ ข้าบอกแล้วว่าข้าแพ้อย่างสุภาพ ท่านผู้ถือบัญชี ข้ามีของแสดงความขอบคุณ กุญแจสำรองที่ข้าตามหาอยู่ในกระเป๋าเสื้อท่านแล้ว ข้าสอดไว้ตอนสู้"\n'
  + 'บรรยาย: ยามาล้วงกระเป๋าพบกุญแจเล็กทรงบาง ที่ปลายมีรหัสแสงเรืองสีเขียวมิ้นต์ [PHANTOM-404] นิราบันทึกทันที\n'
  + 'HOME-67: "ผมไม่เคยเห็นใครส่งหลักฐานให้ผู้ที่จับเขา"\n'
  + 'ลูแปง: "ข้าไม่ได้ส่งให้ผู้จับ ข้าส่งให้ผู้อ่านบัญชีจนจบ"',
    en:
    'Lupin: "I lose. I said I would lose politely. Keeper of the ledger, I have a gift of thanks. The spare key I came for is already in your coat pocket. I slipped it there during the fight."\n'
  + 'Narration: Yama reaches into his pocket and finds a thin small key whose tip bears a mint-green glowing code, [PHANTOM-404]. Nira records it at once.\n'
  + 'HOME-67: "I have never seen anyone hand over evidence to the one who caught him."\n'
  + 'Lupin: "I did not hand it to the one who caught me. I handed it to the one who reads the ledger to the end."' } },
  { title:{ th:'ฝากหน้ากากไว้ในตะเกียง', en:'A Mask in the Lamp' }, line:{ th:
    'ลูแปง: "ข้าฝากหน้ากากหนึ่งแผ่นไว้ในตะเกียงท่าน เมื่อท่านจุดไฟเรียกชื่อข้า ข้าจะมา ข้าไม่เคยมาให้ใครสองครั้ง แต่ท่านเป็นข้อยกเว้น"\n'
  + 'บรรยาย: ลูแปงโยนหน้ากากโปร่งแสงเข้าไปในตะเกียงวิเศษที่ห้อยข้างเอวยามา ไส้ตะเกียงอีกดวงสว่างเป็นเปลวสีม่วงน้ำเงินที่วูบไหวเหมือนผ้าคลุมพลิก\n'
  + 'ยมบาทน้อย: "ผมจะเรียกท่านเมื่อจำเป็นครับ ไม่ใช่ขโมยของใคร"\n'
  + 'ลูแปง: "ข้าถือเป็นการจ้าง"',
    en:
    'Lupin: "I leave one mask in your lamp. When you light it and call my name, I will come. I never come twice for anyone, but you are the exception."\n'
  + 'Narration: Lupin tosses the translucent mask into the Magic Lamp at Yama\'s side. Another wick lights with a violet-blue flame that flutters like the turn of a cloak.\n'
  + 'Yama: "I will call you when needed, not to steal from anyone."\n'
  + 'Lupin: "I will count it as employment."' } },
]},
```
#### 9.4 ตัวอัญเชิญที่ 12 · ลูแปง (ปลดล็อก: จบ `z4-lupin-win` · NQ-2 · NU-1)
| ฟิลด์ | TH | EN |
|---|---|---|
| ชื่อ | ลูแปง | Lupin |
| ท่าไม้ตาย | **หน้ากากพลิกจังหวะ** | **The Mask Turns the Beat** |
| คำบรรยายท่า | ลูแปงสวมหน้ากากโปร่งแสงแล้วเลียนจังหวะของศัตรูตัวเดียว ศัตรูตัวนั้นถูกพลิกจังหวะ ข้ามตาตัวเอง 1 ครั้ง และถูกตีเบา ๆ | Lupin dons a translucent mask and copies the rhythm of one foe. That foe is thrown off its beat, skipping its own next turn, and struck lightly. |
| ชนิดท่า (ข้อเสนอ) | ตีเดี่ยว แรงเบา-ปานกลาง + ข้ามตาศัตรู 1 ครั้ง | Single target, light-medium, makes that foe skip one turn |
| บรรทัดตอนอัญเชิญ | ลูแปง: "ข้ามาแล้ว ขอโทษที่มาแบบไม่ได้รับเชิญ แต่ท่านเป็นคนจุดไฟเอง" | Lupin: "I have arrived. Sorry to come uninvited, but you lit the lamp yourself." |
| บรรทัดตอนใช้ท่า | ลูแปง: "ขอยืมจังหวะหน่อยนะ" | Lupin: "Let me borrow that beat." |
| บรรทัดตอนจบท่า | ลูแปง: "ข้าขอเอาตัวออกก่อนที่ใครจะเรียกค่าตัว" | Lupin: "I take my leave before anyone asks for payment." |
- ชื่อท่าไม่ซ้ำท่าบอสลูแปง `ขโมยจังหวะ` · ไม่ใช้ชื่อหรือท่าของฉบับการ์ตูน/ภาพยนตร์ใด

## 10. สรุปตัวอัญเชิญที่ปลดล็อกในส่วน D (ตามกติกา D2 D4)
| # | ตัวอัญเชิญ | ปลดล็อกเมื่อ | ท่าไม้ตาย TH | EN | หัวข้อ |
|---|---|---|---|---|---|
| 10 | ธอร์ | จบ `col-thor-win` (ด่าน 9) · NT-1 | ค้อนฟ้าสั่งสนาม | The Hammer Commands the Field | 1.6-ก |
| 11 | ลูซิเฟอร์ | จบ `col-lucifer-win` (ด่าน 10) · NL-1 | ประกาศิตผู้ก่อตั้ง | The Founder's Decree | 1.7-ก |
| 12 | ลูแปง | จบ `z4-lupin-win` (quest HOME-67) · NU-1 | หน้ากากพลิกจังหวะ | The Mask Turns the Beat | 9.4 |
- รวมกับส่วน A (หนุมาน · กุมารทอง · ยมทัต) · ส่วน B (หงอคง · เหลียนกัง · ริวจิน · มูซาชิ) · ส่วน C (เอียร์ลิน · ยอร์มุนกันดร์) = **ครบ 12 ตัว** ตามรายการคุณเป้ (G18)
- ไม่ใช่ตัวอัญเชิญ: WATSON-03 (Guard) · HOME-67 (ลูกทีมชั่วคราว) · ลูเมน-01 · AI Scammer Robot · อาร์คอน-ศูนย์ · ผู้สู้ด่าน 1–8
- พลังที่ปลดล็อกในส่วน D (ไม่ใช่ตัวอัญเชิญ): **นาฬิกาวิเศษ** (รางวัล `cooldownClock` เดิม · จากลูเมน-01 · NW-1)
- ช่องตะเกียงสูงสุด 4 (G17 · minigame) ไม่ใช่งานบท

## 11. รายการภาพที่ต้องวาด (ส่วน D) · Claudy ใช้เขียนคิว Codex
กติการ่วมของทุกภาพ: ไม่มีตัวอักษรในภาพ · คัตซีน 1672×941 · สไปรท์/โปรไฟล์/ไอคอนตามขนาดของ `boss-hanuman-th*.webp` / `soul-sita-th*.webp` และไอคอนท่าไม้ตายเดิม · **แนบสไปรท์ตัวละครหลักของเกมเป็นภาพอ้างอิงทุกครั้ง** · ยามาแต่ง **ชุดโซน 4** (G9 · ไม่ใช่งานของไฟล์นี้) ในทุกภาพหลังหัวข้อ 2.5 และชุดโซน 3 ก่อนหน้านั้น · ไม่มีภาพเลือด/ตายชัด · ไม่มีสัญลักษณ์ศาสนาในภาพลูซิเฟอร์/ธอร์ · **ภาพเดิมที่ระบุว่าใช้แทนได้ ผมยังไม่ได้เปิดดูภาพจริง Claudy ตรวจ `img/` ก่อนสั่งวาด**
**ภาพเดิมที่ใช้ต่อ (Claudy ตรวจ):** `deva-intro-cyberhell-v1` · `frontier-cyberhell-intro-v1` · `story-sig/story-cyberhell-signal-01..04` · `story-sig/story-signal-th/asia/west-01..02` · `story-cyberhell-01-v2` · `-reinforcements-01..02` · `-02-v3` · `-03-v4` · `story-ending-01-v4/02-v3/03-v1` (+วิดีโอ) · `leader-th/asia/west/cyberhell-possessed` · `head-*-punish-cutscene-v1` ถ้ามีฉากแท่นตัดสิน
### กลุ่ม COL · โคลอสเซียม (2 + 10 + 20)
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| C1 | `img/z4-events/cut-z34-arrive.webp` | `z34-arrive` | ปากถ้ำเหล็กชายแดน 3-4 พ่อค้านรกตั้งแผงเล็ก ผนังแขวนป้ายชื่อนักสู้เรียงแถว ยามา นิรา HOME-67 ก้าวเข้ามาใต้เพดานสูง | ไม่มี |
| C2 | `img/z4-events/cut-col-gate.webp` | `col-gate` | สังเวียนหินวงกลมอัฒจันทร์เป็นชั้น เงาผู้ชมเงียบ ลูซิเฟอร์ผมเงินยาว เสื้อคลุมดำปักขอบทอง ไม่มีเขา ไม่มีปีก ถือไม้เท้าตรงยืนระเบียงสูง **ไม่มีสัญลักษณ์ศาสนา** | ไม่มี |
| C3–C12 | `img/z4-events/cut-col-s1..s10.webp` (10 ภาพ) | ท่าโจมตีของคู่ต่อสู้ด่าน 1–10 | ด่าน 1 ซามูไรชักดาบเป็นประกายเดียว · 2 นินจากระโดดหลังฉากเงา · 3 นายขนมต้มศอกกลับ (ไหว้ก่อนในมุมภาพ) · 4 มิโนทอร์พุ่งขวิด · 5 เมดูซาสายตาแสงเงินน้ำเงิน (ไม่แสดงใครกลายเป็นหิน) · 6 โจรสลัดปืนใหญ่ควันขาว · 7 ผู้มาเยือนจากดาวเก่าลำแสงสแกน · 8 C-8, the Steel Colossus (ยักษ์เหล็กซี-8) หมัดจากฟ้า · 9 ธอร์ค้อนสายฟ้า · 10 ลูซิเฟอร์ปลายไม้เท้าชี้ ม่านแสงปิดลง · **ไม่มีเลือด ไม่มีภาพมิโนทอร์/เมดูซาทำร้ายคน** | ไม่มี |
| C13–C32 | `img/z4-events/col-s1..s10.webp` + `-profile.webp` (20 ไฟล์) | สไปรท์ศึก + การ์ดโปรไฟล์ ผู้สู้ด่าน 1–10 | ซามูไรไร้นาย (ชุดเก่าเรียบไม่ใช่มูซาชิ) · นินจาธรรมดา (ชุดดำเรียบ ไม่ใช่ตัวเฉพาะการ์ตูน) · นายขนมต้ม (กางเกงมวยเก่า ผ้าประเจียดที่แขน **ไม่สวมมงคลที่ศีรษะระหว่างชก** · ภาพไหว้ครูถือหรือวางมงคลไว้มุมเวที · มงคลกับประเจียดเป็นของเคารพ ห้ามทำตก ห้ามล้อ · ไม่มีสัญลักษณ์ศาสนา) · มิโนทอร์ (ครึ่งคนครึ่งวัว เกราะหนัง) · เมดูซา (ผมเป็นเส้นงูเล็ก ดวงตาปิดครึ่ง) · กัปตันโจรสลัดคลื่นเงิน · ผู้มาเยือนจากดาวเก่า (รูปคนโปร่งแสง ไม่ใช่ซีโนมอร์ฟ) · ยักษ์เหล็กซี-8 (EN: C-8, the Steel Colossus) · ธอร์ (ชุดเรียบ ไม่ใช่ผ้าคลุมแดน) · ลูซิเฟอร์ (ผมเงิน ไม่มีเขา) | ไม่มี |
### กลุ่ม SUM · ตัวอัญเชิญ (3 ตัว × 3 ภาพ = 9 ไฟล์ + ไอคอน)
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| S1 | `img/summon/icon-thor.webp` + `battle-thor.webp` | ธอร์ ไอคอนผู้ช่วย + ตัวในฉากสู้ | ไอคอน: ใบหน้าธอร์ผมเรียบ กรอบทอง · ฉากสู้: ถือค้อนสายฟ้ายืนที่ขอบสนาม | **ใช้สไปรท์สังเวียน col-s9 ตัดแทนได้** (Claudy ตรวจ) |
| S2 | `img/summon/icon-lucifer.webp` + `battle-lucifer.webp` | ลูซิเฟอร์ | ไอคอน: ใบหน้า ผมเงินยาว กรอบทอง · ฉากสู้: ไม้เท้าตรงยืนองอาจ **ไม่มีเขา ไม่มีสัญลักษณ์ศาสนา** | **ใช้สไปรท์ col-s10 ตัดแทนได้** |
| S3 | `img/summon/icon-lupin.webp` + `battle-lupin.webp` | ลูแปง | ไอคอน: ครึ่งหน้าแล้วหน้ากากโปร่งแสง · ฉากสู้: ท่าเอียงตัวยิ้ม ผ้าคลุมไหว | ไม่มี |
| S4 | `img/summon/cut-thor-hammer-rules.webp` | ท่าไม้ตายธอร์ | ธอร์ยกค้อนเหนือสนามสายฟ้าเป็นวงรอบศัตรู | ไม่มี |
| S5 | `img/summon/cut-lucifer-decree.webp` | ท่าไม้ตายลูซิเฟอร์ | ไม้เท้าชี้ศัตรูตัวเดียว ตัวอักษรแสงเหมือนกติกาลอยรอบ (ไม่มีตัวอักษรจริง ใช้เส้นสัญลักษณ์) | ไม่มี |
| S6 | `img/summon/cut-lupin-mask-beat.webp` | ท่าไม้ตายลูแปง | ลูแปงสวมหน้ากากโปร่งแสงเลียนท่าศัตรู ศัตรูหยุดกลางจังหวะ | ไม่มี |
### กลุ่ม Z4 · โซน 4 (เข้าโซนถึงคดี 10)
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| Z1 | `img/z4-events/cut-z4-arrive.webp` | `z4-arrive` | นครเหล็กหน้าต่างเรืองฟ้าเขียว ถนนว่าง ท่าเรือไม่มีเรือ ยามา นิรา HOME-67 กำลังเดิน และกรงแสงทองสองใบที่ลานเหนือ ซิสอ็อปกับพ่อค้านรกอยู่ข้างใน | ไม่มี (ใช้ `deva-intro-cyberhell-v1` ชั่วคราวได้ **Claudy ตรวจ**) |
| Z2 | `img/z4-events/cut-lumen-win.webp` | `z4-lumen-win` | ลูเมน-01 ยื่นนาฬิกาพกวงแสงฟ้าขาวให้ยามา คุกแสงสองใบสลายเป็นเกล็ดแสง | ใช้ `deva-intro-cyberhell-v1` แทนก่อนได้ (Claudy ตรวจ) · ตัดได้ |
| Z3 | `img/z4-events/cut-home67-harbor-gift.webp` | `z4-home67-harbor` | ท่าเรือโซน 4 HOME-67 พิงเสา ส่งห่อผ้าสีเทาเงินขอบแสงฟ้าให้ยามา นิรายืนข้าง | ไม่มี |
| Z4 | `img/z4-events/char-sysop.webp` (ถ้ายังไม่มี) | ซิสอ็อป (ยมทูตทัณฑ์ฉบับโซน 4) | **Claudy ตรวจ** ว่ามีสไปรท์ crew โซน 4 อยู่แล้วหรือไม่ | น่าจะมี (`crew-taan` ตามโค้ด) |
| Z5 | `img/z4-events/soul-aiscam-cyber.webp` + `-profile.webp` | วิญญาณครูเกษียณ (คดี 4) | ชายสูงวัยผมขาว แว่นกรอบดำ เสื้อเชิ้ตกระดุมหลุดเม็ดที่สอง มือกำโทรศัพท์เก่า | ไม่มี |
| Z6 | `img/z4-events/soul-singer-cyber.webp` + `-profile.webp` | พี่สาวไซเฟอร์ (คดี 8) | หญิงวัยห้าสิบผมสั้น ถือไมโครโฟนเก่าเหมือนตุ๊กตา | ไม่มี |
| Z7 | `img/z4-events/soul-archivist-cyber.webp` + `-profile.webp` | ลุงบัฟเฟอร์ (คดี 9) | ชายวัยหกสิบ ถุงมือผ้าขาวเปื้อนฝุ่น กุญแจพวงใหญ่ | ไม่มี |
| Z8 | `img/z4-events/soul-admin-cyber.webp` + `-profile.webp` | ผู้ดูแลระบบ (quest WATSON-03) | ชายวัยห้าสิบแว่นหนา แก้วกาแฟเย็นสองมือ | ไม่มี |
### กลุ่ม W · WATSON-03 + โทรจัน-9 (คดี 7)
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| W1 | `img/z4-events/guard-watson03.webp` + `-profile.webp` | WATSON-03 (Guard โซน 4 สไปรท์ยืน + การ์ดโปรไฟล์ + ใช้ในฉากสู้) | หุ่นสูงเพรียวผิวเงินเทา ดวงตาเลนส์สองชั้น แผ่นบันทึกบางที่แขนซ้ายตัวอักษรเรืองไหลขึ้น ท่ายืนตรงแต่ไหล่ไม่แข็ง **ไม่ลอกหุ่นหรือนักสืบฉบับใด ไม่มีหมวกทรงนักสืบ ไม่มีไปป์** | ไม่มี |
| W2 | `img/z4-events/cut-wat-assist.webp` | `z4-troj-pre` + `z4-wat-join` (คัตซีนต่อสู้ของ WATSON-03 ตาม G13) | ชายแดนล่างโซน 4 ม้าไม้ปีศาจกลางภาพ ปีศาจสี่แถวหยุดนิ่ง WATSON-03 ก้าวออกจากประตูโลหะข้างทาง HOME-67 ชี้แผ่นกระจก ยามากับนิราอยู่ด้านซ้าย | ไม่มี |
### กลุ่ม R · AI Scammer Robot + เฉลย (คดี 10)
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| R1 | `img/z4-events/boss-aiscam.webp` + `-profile.webp` | AI Scammer Robot (บอสย่อย) | หุ่นเตี้ยกลมสีขาวนวล หน้าจอแทนหน้ายิ้มสุภาพ มือหนึ่งแว่นขยาย อีกมือแผ่นแสดงเอกสาร **ไม่เป็นรูปน่ากลัว** | ไม่มี |
| R2 | `img/z4-events/cut-reveal-name.webp` | `z4-reveal` หน้า 1–3 (cutscene HOME-67 เฉลยที่คุณเป้ขอ) | ศาลาเก็บเอกสาร ตู้สูงปิดด้วยแผ่นแสงเขียวมิ้นต์ AI Scammer Robot กลางห้อง HOME-67 ชี้ ยามาก้าวบังหน้าเขา แสงเขียวกระแทกอกยามา นิราและ WATSON-03 ยกแฟ้ม/แผ่นบันทึกเป็นโล่ | ไม่มี |
### กลุ่ม K · โซนที่ถูกยึด + ท่าเรือ (ส่วน 7)
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| K1 | `img/z4-events/cut-z3-fire.webp` | `z3-fire` | ลานหินปัจฉิมไหม้ หิมะเทาเขม่า โพเอน่า นัวร์ ฯลฯ ยืนนิ่งตาเขียว แวน เฮลซิงยืนที่ประตู | ไม่มี |
| K2 | `img/z4-events/cut-z2-fire.webp` | `z2-fire` | ท่าเรือบูรพาไหม้ โคมแดงดับ ยมทูตยืนนิ่งตาเขียว กวนอูยืนที่ประตู | ไม่มี (ตัดแล้วใช้ภาพ SIG ได้ · Claudy ตรวจ) |
| K3 | `img/z4-events/cut-z1-fire.webp` | `z1-fire` | สุวรรณภูมิไหม้ ยมทูตยืนนิ่งตาเขียว กุมภัณฑ์ถือกระบองยืนที่ประตู | ไม่มี (ตัดแล้วใช้ภาพ SIG ได้) |
| K4 | `img/z4-events/cut-zN-restored.webp` (1 ภาพเสียบใช้ 3 โซนได้) | `z3-restored` `z2-restored` `z1-restored` | ไฟดับ ยมทูตตื่น ท่าเรือเปิดเสียงคลิก | ตัดได้ ใช้ภาพ SIG เดิม |
### กลุ่ม F · ฉากจบ
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| F1 | `img/z4-events/cut-final-open.webp` | `z4-final-open` | ลานข้อมูลโซน 4 อาร์คอน-ศูนย์ยืนกลางภาพ ร่างสูงเสื้อคลุมเทาดำ หน้ากากเรียบ HOME-67 คุกเข่าถูกมัดด้วยเส้นแสงเขียว ยามากับนิราอยู่ด้านล่างซ้าย | ใช้ `story-cyberhell-01-v2` ชั่วคราวได้ (Claudy ตรวจ) |
| F2 | `img/z4-events/cut-ending-coda.webp` | `ending-coda` (ไม่บังคับ) | ท่าเรือโซน 4 มีเรือเล็กสี่ลำส่งแตร WATSON-03 และ HOME-67 ยืนข้างเสา | ตัดได้ |
### กลุ่ม L · quest ลูแปง
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| L1 | `img/z4-events/char-lupin.webp` + `-profile.webp` | ลูแปง (ร่างจริง สไปรท์ศึก + การ์ด) | ชายหนุ่มผมดำเรียบตาแจ่มรอยยิ้มบาง เสื้อคลุมเทาเข้มขอบแสงม่วงน้ำเงิน หน้ากากโปร่งแสงถือมือเดียว **ไม่ใช่ชุดสีเขียวหรือแดง ไม่ลอกฉบับใด** | ไม่มี |
| L2 | `img/z4-events/char-worker-lupin.webp` | คนงานแปลกหน้า (ลูแปงปลอมตัว สไปรท์แผนที่) | คนงานโซน 4 หมวกคลุม มือไม่มีฝุ่น ยืนเฉยมองประตูหลังโรงอาหาร | ไม่มี (ใช้สไปรท์คนงานเดิมแต่งต่าง Claudy ตรวจ) |
| L3 | `img/z4-events/cut-lupin-catch.webp` | `z4-lupin-catch` + `z4-lupin-win` | ลูแปงปลดหมวกคลุมหน้ากากโปร่งแสงหลุดลงมือ HOME-67 ชี้ยามากับนิราอยู่ข้าง ๆ โรงอาหารเป็นฉากหลัง | ไม่มี |
### สรุปจำนวนภาพที่ต้องวาดใหม่ (ส่วน D)
รวม **ต้องวาดใหม่ 69 ไฟล์** = ภาพคัตซีน/ท่า 27 (C1 C2 · C3–C12 ×10 · S4 S5 S6 · Z1 Z2 Z3 · W2 · R2 · K1 K2 K3 K4 · F1 F2 · L3) + สไปรท์/โปรไฟล์/ไอคอน 42 (COL C13–C32 ×20 · S1–S3 ×2 = 6 · Z4 ×1 · Z5–Z8 ×2 = 8 · W1 ×2 · R1 ×2 · L1 ×2 · L2 ×1)
- **ใช้ของเดิมแทนได้ (Claudy ตรวจ):** S1 S2 (ตัดจากสไปรท์ col-s9/s10 −4) · Z1 Z2 (ใช้ `deva-intro-cyberhell-v1` −2) · Z4 (มี `crew-taan` −1) · F1 (ใช้ 01-v2 −1) · K2 K3 K4 (ใช้ภาพ SIG −3) → ถ้าใช้แทนได้ครบ เหลือ **58 ไฟล์**
- **ตัดไปได้ก่อน (บทอ่านได้เหมือนเดิม):** S4 S5 S6 (ภาพท่าอัญเชิญ −3) · F2 (−1) · K4 (−1) · C3–C12 (ท่าโจมตีด่าน 1–10 −10 · คุณเป้ขอ "cutscene โจมตี" ตัดแล้วต้องรอรอบถัดไป) → ถ้าตัดครบ เหลือขั้นต่ำ **54 ไฟล์** (และถ้าใช้ของเดิมแทนได้ครบตามข้อบน เหลือราว **44 ไฟล์**)
- ภาพที่ **ควรวาดก่อน** (ไม่มีภาพนี้เสียบบทไม่ได้): C1 C2 · COL สไปรท์ด่าน 1–10 · W1 W2 · R1 R2 · Z3 Z5 · F1 · L1 L3
- ภาพท้ายเกมที่ **ไม่ใช่งานไฟล์นี้**: ชุดยามาโซน 4 ทุก animation (G9) · เส้นทาง/ทางเข้าชายแดน (G4 G5)

## 12. สรุปคีย์ที่เสนอสำหรับ Toby
| คีย์ | ความหมาย |
|---|---|
| `z34-arrive` · `col-gate` · `col-sN-pre/win` · `cut-col-sN` · `col-thor-win` · `col-lucifer-open` · `col-lucifer-win` · `z4-gate-silent` · `N-COL-1/2` · `NT-1` · `NL-1` | ชายแดน 3-4 โคลอสเซียม 10 ด่าน + ปลดล็อกธอร์ ลูซิเฟอร์ |
| `z4-arrive` · `z4-lumen-open` · `z4-lumen-win` · `z4-home67-harbor` · `NZ-1` `NZ-2` `NW-1` `NH-5` `NH-6` | เข้าโซน 4 ลูเมน-01 นาฬิกาวิเศษ HOME-67 ท่าเรือ + ของฝาก |
| `aiscam` `after:4` · `NAS-1` | คดี 4 |
| `N7-1` `N7-2` · `z4-troj-pre` · `z4-wat-join` · `NV-W` · `guard.cyberhell = watson03` · `watkin` `after:12` · `NK-W` | คดี 7 WATSON-03 + quest เสริม |
| `kin8` `after:8` · `kin9` `after:9` · `NK8` `NK9` | คดีญาติโซน 4 |
| `N10-1` `N10-2` · `z4-reveal` · `z4-sala-win` · `NS-10` | คดี 10 AI Scammer Robot เฉลย |
| `cyber-signal-win` (หน้า 2 แทน) · `z3-fire` `z2-fire` `z1-fire` · `z3-restored` `z2-restored` `z1-restored` · `NR-1` | โซน 1–3 ถูกยึด ปลดปล่อย |
| `NF-1` `NF-2` `NF-3` · `z4-final-open` · `cyber-approach` (ข้อความใหม่) · `cyber-reinforcements` `-advance` (ข้อความใหม่) · `cyber-control` (ข้อความใหม่) · `ending-coda` | ศึกสุดท้าย + จบเกม (ลูกน้อง 3 ระลอก) |
| `NQ-1` `NQ-2` `NQ-3` `NU-1` · `z4-lupin-catch` · `z4-lupin-win` · `summon.thor` `summon.lucifer` `summon.lupin` | quest ลูแปง + ตัวอัญเชิญ 3 ตัว |

---

## ให้ Reese ตรวจ (ตำนาน/วรรณคดี/ศาสนา · ส่วน D)
1. **ลูซิเฟอร์ (หัวข้อ 1.7):** (ก) การใช้ชื่อ "ลูซิเฟอร์" เป็น **ชื่อเจ้าของโคลอสเซียมในโลกของเกม** ไม่ระบุว่าเป็นซาตาน/ปีศาจ ไม่มีเขา ไม่มีสัญลักษณ์ศาสนา ไม่ล้อศาสนาใด ยอมรับได้หรือไม่ · (ข) ลักษณะ "โปรโมเตอร์สังเวียนที่ถือกติกา ยอมจ่ายตามสัญญา" ไม่ขัดกับการอ้างอิงใด · (ค) ถ้าไม่แน่ใจ **ส่ง chris-culture รอบ ship**
2. **ธอร์ (หัวข้อ 1.6):** ธอร์ในปกรณัมนอร์ส (ค้อน สายฟ้า ความแข็งแรง) ตรงตามเรื่องเล่า (Eddas) ไหม · การใช้เป็น "แชมป์สังเวียน" ไม่ล้อผู้นับถือ Ásatrú · ไม่ลอกฉบับภาพยนตร์/การ์ตูน
3. **นายขนมต้ม (หัวข้อ 1.5 ด่าน 3):** ตัวละครประวัติศาสตร์/ตำนานของไทย (ชนะนักมวยพม่า 10 คนต่อหน้าพระมหากษัตริย์พม่า ตามเรื่องเล่า) เขียนด้วยความเคารพ ไม่ตลก ไม่ผิดข้อเท็จจริงสำคัญ · ธรรมเนียมไหว้ก่อนชก
4. **มิโนทอร์ · เมดูซา (หัวข้อ 1.5 ด่าน 4–5):** ตำนานกรีก ใช้ถูกต้องไหม (เมดูซา = สายตาทำให้เป็นหิน ผมเป็นงู มิโนทอร์ = ครึ่งคนครึ่งวัวในเขาวงกต) · ผมเขียนเมดูซาแบบโศกเศร้า
5. **ซามูไร นินจา โจรสลัด (ด่าน 1 2 6):** ตัวละครทั่วไป ไม่ชนตัวเฉพาะของสื่อใด
6. **ลูเมน-01 (หัวข้อ 2.4):** การเขียนเทวดาผู้คุมเป็น "ผู้ทดสอบที่ขอโทษเมื่อผิด" ไม่ล้อเทวดา/พุทธศาสนา · ไม่มีสัญลักษณ์ศาสนาในฉาก
7. **WATSON-03 (หัวข้อ 4):** "หุ่นผู้ช่วยบันทึกและตอบตามตัวอักษร" และชื่อ "03" ไม่ชนลักษณะเฉพาะ/ประโยคเด่นของนักสืบ/ผู้ช่วยฉบับภาพยนตร์ ซีรีส์ หรือการ์ตูนที่ยังมีลิขสิทธิ์ · ไม่ใช้ "แพทย์ทหาร" "บาดแผลเก่า" หรือการเล่าเรื่องจากมุมผู้ช่วย
8. **ลูแปง (หัวข้อ 9):** จอมโจรสุภาพปลอมตัวเก่ง "แห่งอนาคต" ตรงแนวอาร์แซน ลูแปง (เลอบลัง ค.ศ. 1905) และ **ไม่ชนลูแปงที่ 3** (ชุดสีเดียวกัน ตัวละครเสริม ท่าเด่น) · **ผลตรวจ Reese 19 พ.ย.:** ผ่าน · ลูแปงฉบับเลอบลังที่ตีพิมพ์ก่อนปี ค.ศ. 1931 เป็นสาธารณสมบัติในสหรัฐ และหมดอายุลิขสิทธิ์ในไทยตามหลักชีวิตผู้แต่ง+50 ปี (เลอบลังเสียชีวิต ค.ศ. 1941) · บทนี้ใช้เฉพาะแนวคิด "จอมโจรสุภาพ" ไม่ใช้โครงเรื่องจากเล่มปลายยุค / EN Leblanc's Lupin works published before 1931 are public domain in the US and expired in Thailand under life+50 (Leblanc died 1941). This script uses only the general "gentleman thief" concept, not plots from his later books.
9. **HOME-67 (หัวข้อ 2.5 · 6 · 8):** บท "ตัวเลข ลายนิ้วมือ-ใบหน้า การยืนข้างหน้า" เป็นเรื่องแต่งของผม ไม่ชนฉากเด่นของนักสืบฉบับใด (ผ่านใน R1 ส่วน C แล้ว ตรวจเฉพาะบทใหม่)
10. **การบรรยายการหลอกลวง AI (หัวข้อ 3 · 5 · 6):** ไม่บรรยายเทคนิคเกินจำเป็น ไม่เป็นคู่มือ · ผู้เสียหายไม่เป็นตัวตลก
11. **ฉากจบ (หัวข้อ 8):** การใช้หัวหน้าโซน (พญายมบาท จ้าวเหวิน ฮาลวาร์ เน็กซาร) เป็นผู้ถูกควบคุม ไม่ล้อศาสนา/สถาบัน · "พญายมบาท" ใช้ตามโค้ด (Chris เคยเตือนเรื่องคำ "ยมบาท/ยมบาล" ตั้งแต่ 17 ก.ย. ยังรอคุณเป้ ผมไม่แตะ)
12. ไม่ต้องตรวจซ้ำ: ส่วน A B C ที่ผ่านแล้ว · SIG เดิมที่ใช้ตรงตัว (`signal-*` `cyber-signal-*`) · บทเดิมของ `story.js` ที่ใช้ตรงตัว

---

## ต้องให้คุณเป้ตัดสิน (ใช้ค่าเริ่มต้นไว้ก่อน ไม่หยุดงาน · ส่วน D)
1. **ซิสอ็อปกับทัณฑ์:** ต้นฉบับเขียน "Taan" ในโซน 4 ผมใช้ **ซิสอ็อป** ตาม lore bible (ฉบับโซนของทัณฑ์) · ถ้าต้องการให้ใช้ "ทัณฑ์" เหมือนโค้ด (`crew-taan`) แจ้งผมแก้ป้ายผู้พูด
2. **ชื่อทางการของโซน 4:** ผมใช้ "นรกเครือข่าย" ตามบท `narrative-cutscenes.js` และตั้งป้าย Guard "ผู้เฝ้าด่านนรกเครือข่าย" · ถ้าชื่อในเกมเป็นอย่างอื่น (เช่น "อเวจีไซเบอร์") แจ้งผม
3. **ลูซิเฟอร์ปล่อยผู้สู้เป็นอิสระหลังแพ้:** ผมเพิ่มข้อสิบของสัญญา (ชนะสิบด่านติดแล้วเป็นอิสระ) และให้ยามาขอให้เปิดทางออกให้ผู้สู้ทุกคน เพื่อให้สังเวียนไม่เป็นความผิดตามหลักผู้พิพากษา · ต้นฉบับ "จับปีศาจ วิญญาณต่างๆมาสู้กันเพื่อความสนุก" ผมตีความว่าลงชื่อเอง · ถ้าต้องการให้ผู้สู้ถูกจับจริงและยามาปลดปล่อย แจ้งผมแก้
4. **Guard + เซอร์เบอรัสถูกควบคุมหรือไม่ (D6):** ผมให้ **ไม่ถูกควบคุม** (แวน เฮลซิงต้านเสียงกล่อมได้ · กวนอูยึดคำสัตย์ · กุมภัณฑ์ยังกำกระบองแต่ไม่ฟาด · เซอร์เบอรัสไม่พูด) ยืนที่ประตูและมาเป็นกองหนุนในฉากจบ · ต้นฉบับพูดว่าเฉพาะ "ยมฑูตทุกตัว" ถูกควบคุม
5. **ญาติคดี 8 และ 9:** ต้นฉบับเขียน "ญาติยมฑูต" ไม่ระบุคน · ผมเลือก **ญาติของไซเฟอร์ (พี่สาว นักร้องเพลงกล่อมเด็ก)** และ **ญาติของบัฟเฟอร์ (ลุง ผู้ดูแลหอจดหมายเหตุ)** · ถ้าต้องการยมทูตคนอื่น แจ้งผม
6. **quest ลูแปงกับฉากจบ (Claudy ตัดสินแล้ว 19 พ.ย. · รายงานให้คุณเป้ทราบ):** quest **ไม่ปิด**เมื่อเข้าฉากจบ ยังเล่นต่อได้หลังฉากจบ ลูแปงปลดล็อกได้ตามปกติ และ NF-2 มีคำเตือนว่ายังมีงานเสริมค้าง · ถ้าคุณเป้ต้องการแบบอื่น (บังคับทำก่อนฉากจบ) แจ้งผม
7. **HOME-67 ยืนท่าเรือจนถึงฉากจบ:** ระหว่างหัวข้อ 6–8 ผมให้ HOME-67 อยู่ที่ท่าเรือโซน 4 (ไม่ไปกับยามาตอนเดินกลับ) เพื่อให้ตรงต้นฉบับ "เหลือแค่ ยามา นิรา" · และโผล่อีกทีในฉากจบถูกมัดไว้ข้างอาร์คอน-ศูนย์
8. **การเฉลย:** ผมให้ HOME-67 เฉลยว่า **AI Scammer Robot** คือต้นเหตุของบรรทัดผิดตั้งแต่โซน 1 (ตามต้นฉบับ "เกิดจากบอสตัวนี้") และให้ **อาร์คอน-ศูนย์** เป็นผู้ถือปลายสายอีกด้านเฉลยในฉากสุดท้าย · ถ้าต้องการให้เฉลยอาร์คอน-ศูนย์ตั้งแต่คดี 10 แจ้งผม · **Reese 19 พ.ย. เพิ่ม:** เฉลย "เสียงที่ไม่มีใครรับผิดชอบ" (หัวข้อ 8.5 ก่อน `ending-capture`) ตึงกับต้นฉบับเล็กน้อย ไม่บังคับแก้ · ต้องการให้ต้นเหตุเป็นตัวตนชัดกว่านี้หรือไม่
9. **ลูกน้องฉากจบ 3 ระลอก** ตามต้นฉบับ (โค้ดเดิม 4 ระลอก Toby ต้องแก้ · ใช้หลักเดียวกับคดี 5 ของส่วน C ที่คุณเป้ตอบแล้ว) · ตำแหน่งเล่น `cyber-approach` หลังระลอก 3 ผมยังไม่ยืนยันกับโค้ดเดิม
10. **ต้นฉบับคลุมเครือที่ผมเลือกแบบปลอดภัย:** (ก) "ชานแดน 3-4" = ชายแดน 3-4 · (ข) "นินจา ถอนตัว" = นินจาธรรมดาสู้ปกติ (D3 ที่คุณเป้ตอบแล้ว) · (ค) "นามาแบพ นิรา" = ยามา + นิรา (D5) · (ง) "หัวหน้า โซน3 (ฮาลวาร์)" ตามโค้ด `authorityOf` · (จ) "ได้พลังนาฬิกาวิเศษ" = รางวัล `cooldownClock` เดิม (ชื่อในเกม "นาฬิกาย้อนเวลา") · (ฉ) "11 lupin (อัญเชิญได้ หลังจากได้" ขาด → ใช้เงื่อนไขจาก quest HOME-67 (G29) ตามที่ใบงานเดิมสรุปไว้
11. **ช่วงที่ยังพักไว้ (ตามคุณเป้ 18 พ.ย.):** ภาพตัวอย่างสถานที่ใหม่ในชายแดน (`Screenshot 2569-11-18 at 16.45.16.png`) ยังไม่ทำ ไม่เสนอซ้ำ
12. **ภาพกองหนุนโซน 4 (Reese 19 พ.ย. · Claudy ตรวจโค้ดแล้ว):** `final-event.js:78` ใช้ `img/crew-guard-v2.webp` ซึ่งเป็นภาพ Guard · ผมแก้ป้ายให้ตรงภาพ ("ผู้เฝ้าด่านโซน 4") ไม่ให้ขั้นตอนหาย · ถ้าต้องการให้ภาพเป็น WATSON-03 จริง ให้ตัดจากสไปรท์ W1 · ไม่ต้องวาดเพิ่ม
13. **ชื่อ WATSON-03 ใกล้แบรนด์ IBM Watson (Reese 19 พ.ย. · แจ้งไว้ตอน ship):** ไม่บังคับแก้ตอนนี้ · ถ้าจะขายจริงและกังวล ให้พิจารณาเปลี่ยนชื่อ
14. **ผู้สู้โคลอสเซียม "จับมา" หรือ "ลงชื่อเอง" · Guard/เซอร์เบอรัสถูกควบคุมหรือไม่:** อยู่ในข้อ 3 และ 4 ด้านบนแล้ว (Reese 19 พ.ย. ให้คุณเป้ตัดสิน ไม่บังคับแก้)
15. **ส่งรอบ ship (ไม่ใช่เรื่องที่ต้องตัดสิน):** ลูซิเฟอร์ และ นายขนมต้ม ส่ง chris-culture ตามที่ Reese แนะนำ

---

## เช็กเกณฑ์รับงาน (ส่วน D)
1. ทุกฉากของต้นฉบับ "โซน3 ;" ท้าย (ชายแดน 3-4) · "โซน4 ;" · QUEST HOME-67 · G13 มีบท TH/EN ไม่ตัดขั้นตอน: ชายแดน 3-4 + 10 ด่าน + ธอร์ ลูซิเฟอร์ + ประตูโซน 4 เงียบ (1) · เข้าโซน 4 + ลูเมน-01 + นาฬิกา + ปล่อยซิสอ็อป/พ่อค้า + HOME-67 ออกจากทีมไปท่าเรือ (2) · คดี 4 (3) · คดี 7 + โทรจัน-9 + WATSON-03 + 4 ระลอก + ได้ Guard + HOME-67 บอก "ไม่ใช่ตัวทำให้เกิดทั้งหมด" (4) · คดี 8 9 (5) · คดี 10 + ศาลา + AI Scammer Robot + เฉลย + โซน 1–3 ถูกยึด + เรือใช้ไม่ได้ (6) · โทรจัน-9 ถูกควบคุม + ไฟไหม้ + ยมทูตถูกควบคุม + วาลดริก อากุระ ทัณฑสูร ยึดโซน + ปลดล็อกท่าเรือ (7) · คดี 15 + 3 ระลอก + กองหนุน + หัวหน้าสิง 4 + บอสสุดท้าย + ฉากจบ (8) · quest ลูแปง (9) · ครบ
2. ตัวอัญเชิญที่ปลดล็อก 3 ตัว (ธอร์ ลูซิเฟอร์ ลูแปง) มีท่าไม้ตาย + บรรทัดอัญเชิญ/ใช้ท่า/จบท่า TH/EN · ครบ (1.6-ก · 1.7-ก · 9.4)
3. ระบุชัดว่าส่วนไหนของบทเดิมยังใช้/ถูกแทน · ครบ (หัวข้อ 0.2 · 7 · 8)
4. ตารางภาพที่ต้องวาด · ครบ (หัวข้อ 11) · ภาพเดิมที่ไม่ได้เปิดดูเขียนว่า "Claudy ตรวจ"
5. หัว "ให้ Reese ตรวจ" + "ต้องให้คุณเป้ตัดสิน" · ครบ
6. ต่อเนื่องกับส่วน A/B/C: ชื่อ (ยามา/ยมบาทน้อย · นิรา · HOME-67 · WATSON-03 · แวน เฮลซิง · กวนอู · กุมภัณฑ์ · เซอร์เบอรัส) · กติกาอัญเชิญ 3 ครั้งและหน้าต่าง NA-2 · เวลาพัก Guard 1 นาที (H1) · "ผลกระทบต่อส่วน D" ของส่วน C ครบทุกข้อ (หัวข้อ 0.4) · ไม่แก้ไฟล์บทเดิม ไม่แตะโค้ด

---

## แก้ตาม Reese 19 พ.ย.
(รายงาน: `Output/Reese/2026-11-19-avegee-r2d-factcheck.md` · FIX LIST 9 ข้อ · Rae แก้ 1 รอบ ด้วย Edit ทีละจุด ไม่แตะโค้ด ไม่แตะไฟล์บทเดิม)

| ข้อ | แก้ที่ไหน | สิ่งที่แก้ |
|---|---|---|
| 1.1 | หัวข้อ 1.5 ตารางด่าน 8 · หมายเหตุใต้ตาราง · หัวข้อ 11 กลุ่ม COL (C3–C12 · C13–C32) | EN `The Iron Giant C-8` → `C-8, the Steel Colossus` ทุกจุดที่มี EN · TH คง "ยักษ์เหล็กซี-8" |
| 1.2 | หัวข้อ 1 "ข้อควรระวังเนื้อหา [R]" (ลูซิเฟอร์ · ธอร์ · นายขนมต้ม) · บรรทัด "สถานะ" ต้นไฟล์ | ลบ "Reese ยืนยันแล้ว" ที่เขียนล่วงหน้า ใส่ผลจริง: ลูซิเฟอร์ผ่าน ไม่ล้อศาสนา · ธอร์ไม่มีข้อแก้ · นายขนมต้มผ่านด้านความเคารพ + แก้ตาม 1.4 · รอบ ship ส่ง chris-culture (ลูซิเฟอร์ นายขนมต้ม) |
| 1.3 | หัวข้อ 9 "ข้อควรระวังเนื้อหา [R]" · หัว "ให้ Reese ตรวจ" ข้อ 8 | ใส่ข้อความลิขสิทธิ์ลูแปง TH/EN ตามที่ Reese เสนอ (public domain US ก่อน 1931 · ไทย ชีวิต+50 · เลอบลังเสียชีวิต 1941 · ใช้แนวคิดเท่านั้น) |
| 1.4 | หัวข้อ 1.5 (บรรทัดใหม่ใต้ตาราง) · หัวข้อ 11 C3–C12 และ C13–C32 | นายขนมต้มสวมประเจียดที่แขน ไม่สวมมงคลระหว่างชก (ไหว้ครูถือ/วางมงคลมุมเวที) · ห้ามทำตก ห้ามล้อ · ข้อความ TH/EN ตาม Reese |
| 3.1 | หัวข้อ 8.2 `z4-final-open` หน้า 1 (HOME-67 + ยมบาทน้อย) | ไม่กลับคำสัญญาจากส่วน C 5.5: HOME-67 ขอโทษที่ถูกจับ ยามาเคยยืนบังหน้าที่ศาลา · ยมบาทน้อย "คำสัญญานั้นผมเป็นคนรับไว้ และผมยังยืนอยู่ตรงนี้" · TH/EN |
| 3.2 | หัวข้อ 6.3 `z4-reveal` หน้า 2 | "ในส่วนที่ผ่านมา" → "ที่ท่าเรือโซน 3 ผมบอกคุณว่า…" · TH/EN |
| 3.3 | หัวข้อ 2.4 `z4-lumen-win` หน้า 2 · หัวข้อ 9.3 `z4-lupin-catch` หน้า 1 (+ หัวข้อ 4.3 `z4-wat-join` หน้า 2 "ท่านสองคน" → "คุณสองคน" เพื่อให้ HOME-67 ไม่ใช้ "ท่าน" ทั้งไฟล์) | HOME-67 เรียก "คุณยมบาทน้อย" แทน "ท่านยมบาทน้อย" |
| 3.4 | หัวข้อ 7.2 `z1-fire` (กุมภัณฑ์) | "ผม" → "ข้า": "ข้า ... ข้ายังกำกระบองอยู่นะ แต่ข้ารู้ว่าข้าไม่ควรฟาดใคร ไปเถิดท่าน" |
| 3.5 | หัวข้อ 4.3 บทระหว่างระลอก | `z4-troj-pre` เล่นก่อนระลอก 1 · ลบ "หลังระลอก 2 HOME-67 เรียกผู้เฝ้าด่าน" กับ "หลังระลอก 3 → z4-troj-pre" · ใส่หลังระลอก 2 WATSON-03 และหลังระลอก 3 นิรา ตามข้อความ Reese · TH/EN |
| 3.6 | หัวข้อ 5 คดี 8 (`kin8`) claim `solid` `reveal` / `en_reveal` | ตัด "สามปีพอดีกับคดีครูเกษียณ" ที่คดีนั้นไม่มี → เทียบวันที่หอทะเบียนกับใบมรณะห่างสามปี + รหัส [PHANTOM-404] ตรงกับป้ายซิสอ็อปและบรรทัดปลอมของครูเกษียณ · TH/EN |
| 3.7 | หัวข้อ 2.2 NW-1 · หัวข้อ 2.4 `z4-lumen-win` หน้า 1 | ตัด "ครั้งเดียวต่อศึก/once per battle" (Claudy grep `src/` ไม่พบกติกานี้) ใช้ข้อความ Reese: เมื่อพลังหมดให้เติมที่หอกระจก · TH/EN |
| 4.1 | หัวข้อ 7.2 (`z2-fire` · `z1-fire`) · หัวข้อ 7.3 (`z2-restored` · `z1-restored`) | เขียนเต็ม TH/EN ฉากละ 1 หน้า โครงเดียวกับ `z3-fire`/`z3-restored` ตามเนื้อหาที่ Reese ระบุ (กวนอู/กุมภัณฑ์ที่ประตู · ยมทูตตาเขียว "ขวาง ... ไว้ ... ทุก ... ทาง" · ตัวนับ "สอง"/"หนึ่ง" · Guard 1 บรรทัด · ท่าเรือเสียงคลิก) |
| 4.2 | หัวข้อ 8.2 NF-2 · หัวข้อ 9.1 · "ต้องให้คุณเป้ตัดสิน" ข้อ 6 | Claudy ตัดสิน: quest ลูแปงไม่ปิดเมื่อเข้าฉากจบ เล่นต่อได้หลังฉากจบ · เพิ่มคำเตือนใน NF-2 TH/EN · ข้อ 6 แก้ให้ตรงกัน |
| กองหนุนโซน 4 | หัวข้อ 8.3 ตารางแถวโซน 4 + หมายเหตุใต้ตาราง | แก้ป้ายให้ตรงภาพ `crew-guard-v2.webp` = "ผู้เฝ้าด่านโซน 4" · ไม่เพิ่มไฟล์วาดใหม่ · WATSON-03 ยังพูดในคัตซีนเพราะเป็น Guard โซน 4 · ตัวเลือกใช้สไปรท์ W1 เป็นข้อ 12 ในรายการตัดสิน |

**หมายเหตุให้ Toby/Claudy ตรวจก่อนเสียบ:** (1) ชื่อ EN ของยมทูตโซน 1–2 ใน `z1-fire` `z2-fire` `z1-restored` `z2-restored` เป็นทับศัพท์ของ Rae ตรวจกับ `data.js` (2) สรรพนามของซาโตริ ("ดิฉัน") ใน `z2-restored` ปรับตามเพศที่กำหนดในโค้ด (3) ชื่อท่า `Iron Fist From Above` ของ C-8 ใกล้ชื่อตัวละครการ์ตูน Reese ไม่ได้ระบุ ไม่ได้แก้ · ถ้าต้องการเปลี่ยนเป็น "Steel Fist From Above" แจ้ง Rae

