# AVEGEE R2 ส่วน A · โซน 1 → ประตูโซน 2 (บทหลัก v2)
ผู้เขียน: Rae · 19 พ.ย. 2569 · ใบงาน `Output/Claudy/briefs/2026-11-19-avegee-r2-story-v2-rae.md` (ส่วน A) · ต้นฉบับคุณเป้ `Output/Claudy/briefs/2026-11-18-avegee-owner-feedback-night.md` (G8 G10 G11 G14–G17 G19 G20 G21 + แก้หอกระจก + D1–D7 + H2)
สถานะ: แก้ตามผลตรวจ Reese แล้ว 19 พ.ย. (ดูหัว "แก้ตาม Reese 19 พ.ย." ท้ายไฟล์) · Claudy ตัดสินว่าแก้ครบไม่ต้องตรวจซ้ำ · ไม่ได้แตะโค้ดและไม่ได้แก้ไฟล์บทเดิม
ข้อจำกัดเครื่องมือรอบนี้: อ่านไฟล์ได้อย่างเดียว ค้นข้อความในโค้ดไม่ได้ และดูรายชื่อไฟล์ใน `img/` ไม่ได้ ช่อง "มีภาพเดิมใช้แทนได้ไหม" ในตารางภาพจึงตอบจากชื่อที่เห็นในไฟล์บทเดิมเท่านั้น ที่ไม่แน่ใจใส่ "ตรวจ img/ ก่อน"
คีย์ทั้งหมดเป็นข้อเสนอ Toby ปรับได้ · ตัวเลขศึก/คะแนนเป็นค่าตั้งต้น ไม่ได้รันซิม

---

## 0. ภาพรวมส่วน A

### 0.1 ลำดับเรื่องโซน 1 → ประตูโซน 2 (ฉบับ v2)
| ลำดับ | เหตุการณ์ | หัวข้อในไฟล์นี้ | สถานะ |
|---|---|---|---|
| 1 | คดี 3 วิญญาณแหกคุก · 5 พยาบาล · 6 ขอทาน/เทวดา · 9 ปีศาจฝ่าชายแดน (Guard เข้าทีม) | — | ใช้บทเดิม ไม่แตะ ยกเว้นชื่อ Guard (หัวข้อ 1) |
| 2 | คดี 12 นางสีดา/หนุมาน → e2 สีดาห้าม → e3 [PHANTOM-404] → **สีดามอบตะเกียงวิเศษ (ใหม่)** → ส่งพระนางกลับ | 3 | R1 A ใช้ต่อ + แทรก `sita-lamp` |
| 3 | **คดี 13 วันทองสองใจ → ขุนแผน → กุมารทอง (ใหม่)** | 4 | ใหม่ |
| 4 | คดี 15 ยมทัต (บอสโซน 1) | — | ศึกเดิม แต่ **ตัดฉากเดินไปส่ง** (boss-guide เดิมของโซน 1 ถูกแทน) |
| 5 | **ยมทัตยืนท่าเรือ ชวนไปด้วยกัน (ใหม่ G20)** | 5 | ใหม่ แทน T5 เดิม |
| 6 | **ชายแดน 1-2: ทัณฑสูรถูกพ่อขัง (ใหม่ G21)** | 6 | ใหม่ |
| 7 | **ประตูโซน 2: กวนอูไม่ให้ผ่าน สู้ → Guard โซน 2 (ใหม่ G11/G21)** | 7 | ใหม่ แทนศึกทดสอบยักษ์ทวารบาลโซน 2 |
| 8 | **ยมทัตให้เสื้อผ้า+เงิน แล้วออกจากทีม (อัญเชิญได้)** | 8 | ใหม่ |
| 9 | quest เสริมกวนอู (คดีทหารผู้หนีทัพ ฉบับกวนอู) | 9 | แทน `z2-guard-test-*` และบท Guard ของ `deserter` |
| 10 | คนพายเรือ + quest | 10 | ใหม่ (G8) |
| — | ระบบตะเกียง/ของวิเศษ ข้อความ UI | 2 | ใหม่ (G15–G17, H2) |

### 0.2 สิ่งในบทเดิมที่ส่วน A เขียนทับ (ไม่แก้ไฟล์เดิม · Toby ยึดไฟล์นี้)
| บทเดิม | ที่ถูกแทน | เหตุผล |
|---|---|---|
| ฉาก boss-guide ของโซน 1 (ยมทัตเดินไปส่งถึงประตู · "ของฝาก" 800 เบี้ยกรรม + ชุดโซน 2) | แทนด้วยหัวข้อ 5 (ท่าเรือ) และหัวข้อ 8 (ให้ของที่ประตูโซน 2) | G20 · บอสโซนอื่นไม่ต้องเดินไปส่ง · เฉพาะยมทัต |
| `2026-11-14-avegee-z2-events.md` หัวข้อ 7.1 `z2-guard-test-open/win/lose` + N7K-1..4 | แทนด้วยหัวข้อ 7 (ศึกประตู กวนอู) | G11 |
| z2 หัวข้อ 7.2 คดีญาติ `deserter` ส่วนที่ยักษ์ทวารบาลพูด | แทนด้วยหัวข้อ 9 (กวนอูพูดแทน ตัวสำนวนคดีใช้ของเดิมได้) | G11 "quest เสริมใกล้เคียงเดิม" |
| R1 A6 `sita-return` | ยังใช้ · เล่น **หลัง** `sita-lamp` | G14 ต่อท้าย |
| z2 หัวข้อ 5.6 boss-guide เหลียนกัง | ไม่ใช่ส่วน A (ส่วน B ตัดสินต่อ) | G22 |

### 0.3 น้ำเสียงตัวละครใหม่ในส่วน A
| ตัวละคร | สรรพนาม / ท่วงทำนอง |
|---|---|
| ยมทัต (พี่ชาย · บอสโซน 1) | "พี่ / น้อง" เรียกยามาว่า "น้อง" · ขรึม พูดสั้น ห่วงด้วยการกระทำไม่ใช่คำพูด · ไม่เคยได้คำชมจากพ่อเหมือนกัน แต่ไม่พูดถึงตรง ๆ |
| ทัณฑสูร | "ข้า" ห้วน เรียกยามาว่า "ตัวกระเปี๊ยก" (ตามบทเดิม) · ฉากนี้เงียบกว่าปกติ |
| บิดาของทัณฑสูร | "ข้า / เจ้า" ไม่ขึ้นเสียง เย็น พูดเหมือนอ่านระเบียบ · ไม่ต่อสู้ในฉากนี้ |
| ขุนแผน | "ข้า / ท่าน" องอาจแบบนักรบเก่า สุภาพต่อผู้ใหญ่ ไม่โอ้อวดเรื่องเสน่ห์ · ตรงเมื่อต้องขอโทษ |
| นางวันทอง | "หม่อมฉัน … เจ้าค่ะ" นิ่ง ยอมรับตรง ๆ ไม่ร้องไห้ฟูมฟาย |
| กุมารทอง | เด็กชายผมจุก พูดสั้น ตรง ซื่อ เรียกยามาว่า "นายท่าน" |
| กวนอู | "ข้า / ท่าน" สุขุม สง่า พูดน้อยคำ ไม่ตลก ไม่ถูกล้อ · ยึดคำสัตย์เหนือสิ่งอื่น |
| คนพายเรือ | "ข้า / ท่าน" พูดช้า เสียงแหบเหมือนเสียงน้ำ ไม่ถามชื่อใคร |
| กานต์ (บท tutorial หอกระจก) | "ผม … ครับ" ตามเดิม ไม่ค่อยพูด |
| ยามา / นิรา | ตามเดิม ("ยมบาทน้อย" เป็นชื่อผู้พูดในบท · "ยามา" ในหน้าต่างแจ้งเตือน) |

### 0.4 ข้อตกลงที่ใช้ในไฟล์นี้
- D2: ตัวอัญเชิญ = **ใช้ท่าไม้ตายได้ 3 ครั้ง** เติมที่หอกระจก · D4: ปลดล็อกเมื่อผ่าน event ของตัวนั้น · D7: ทีมเดินทางชายแดน = ยามา + นิรา + แขก (ยมทัต)
- ชื่อตัวอัญเชิญที่ปลดล็อกในส่วน A: **หนุมาน · กุมารทอง · ยมทัต** (กวนอูไม่อยู่ในรายชื่อ 11 ตัวของคุณเป้ จึงเป็น Guard อย่างเดียว ไม่อัญเชิญ — ดู "ต้องให้คุณเป้ตัดสิน")

## 1. ชื่อ Guard ยักษ์เขียวโซน 1 (G10)

คุณเป้: "ช่วยตั้งชื่อ Guard ยักษ์เขียวของโซน 1 ให้ด้วย" · ชื่อต้องไม่ซ้ำกับ Guard โซน 2–4 (กวนอู · แวน เฮลซิง · WATSON-03)

**ชื่อที่เสนอ: กุมภัณฑ์** · EN **Kumphan** (อ่านว่า กุม-พัน)
- เหตุผล: กุมภัณฑ์เป็นคำไทยเก่าที่หมายถึงยักษ์จำพวกหนึ่งในคติไทย-พุทธ ซึ่งอยู่ในบริวารของท้าววิรุฬหก (หนึ่งในท้าวจาตุมหาราชิกาประจำทิศใต้) อยู่แล้ว เหมาะกับ "ยักษ์ผู้เฝ้าด่าน" · เป็นชื่อประเภท ไม่ใช่ชื่อตัวละครเฉพาะในรามเกียรติ์ จึงไม่ชนกับทศกัณฐ์หรือยักษ์ตัวใดที่คนไทยรู้จัก · สั้น อ่านง่าย พิมพ์บนป้ายผู้พูดได้ (Reese ยืนยันความหมายของคำแล้ว 19 พ.ย. · ผ่าน)
- ชื่อสำรอง (ถ้าคุณเป้ไม่ชอบ): **ขุนทวาร** (Khun Thawan · "ผู้เฝ้าประตู" ตรงตัวที่สุด) · **เขียวหิน** (Khiao Hin · ชื่อเล่นแบบลูกทีม สื่อผิวเขียวกับความทึ่ม)
- ชื่อที่ 31 ต.ค. ในไฟล์ lore bible (กุมภัณฑ์ · เมซุ · มูนิน · ไฟร์วอลล์) **ไม่ได้ถูกใช้ในเกม** ตามที่คุณเป้ยืนยันว่า Guard โซน 2–4 ยังไม่มีชื่อ · ส่วนนี้นำ "กุมภัณฑ์" กลับมาใช้เฉพาะโซน 1 ส่วน เมซุ/มูนิน/ไฟร์วอลล์ **เลิกใช้** (โซน 2–4 เป็นกวนอู / แวน เฮลซิง / WATSON-03)

### 1.1 จุดที่ต้องเปลี่ยนข้อความ (Toby ไล่หาคำว่า "ยักษ์ทวารบาล" เฉพาะโซน `th`)
| ที่ใช้ | ของเดิม | ใหม่ |
|---|---|---|
| ป้ายชื่อผู้พูด / ป้ายบนแผนที่ / ชื่อในรายชื่อทีม | ยักษ์ทวารบาล | **กุมภัณฑ์** |
| ตำแหน่งรอง (ใต้ชื่อในการ์ดโปรไฟล์) | — | **ยักษ์ทวารบาลประจำสุวรรณภูมิ** · EN `Gate Guard of Suvarnabhumi` |
| หน้าต่างแจ้งเตือนที่เรียก "ยักษ์ทวารบาล" ในโซน 1 | ยักษ์ทวารบาล | **กุมภัณฑ์** (ถ้าข้อความเป็นประโยค ใช้ "กุมภัณฑ์ ผู้เฝ้าด่าน") |
| โซนอื่น | ยักษ์ทวารบาล | ไม่ใช่ส่วน A (ส่วน B–D ตั้งชื่อใหม่ตามตัวละคร) |
- ป้ายสำหรับ Guard ทุกโซนรวมกัน (เช่น ในเมนูตั้งค่า/ปุ่ม cooldown) ใช้คำกลาง **"ผู้เฝ้าด่าน"** · EN `Gate Guard`

### 1.2 บทแนะนำชื่อ (แทรกตอนกุมภัณฑ์เข้าทีมหลังชนะคดี 9 · 1 หน้า · ถ้าบทเดิมของฉากนั้นไม่มีการเอ่ยชื่อให้ใส่ต่อท้ายฉาก)
```js
'z1-guard-name': { title:'ชื่อของผู้เฝ้าด่าน', pages:[
  { title:'ข้าชื่อกุมภัณฑ์', line:
    'บรรยาย: ยักษ์ร่างเขียวคล้ำผู้ยืนเฝ้าประตูชายแดนมาตลอดปี ยกมือเกาท้ายทอย มืออีกข้างยังกำกระบองไว้แน่น\n'
  + 'ยักษ์เขียว: "เอ่อ ... ท่านเรียกข้าว่ายักษ์ทวารบาลมาตั้งนาน ข้าไม่ได้ว่าอะไรนะ แต่ข้ามีชื่อ ข้าชื่อกุมภัณฑ์ (กระแอม) ตั้งแต่รุ่นพ่อข้าเฝ้าด่านนี้"\n'
  + 'นิรา: "บันทึกชื่อแล้วค่ะ กุมภัณฑ์ ผู้เฝ้าด่านสุวรรณภูมิ"\n'
  + 'กุมภัณฑ์: "ฮะ ฮะ ฟังแล้วเหมือนข้ามียศเลย"' },
]},
```
EN
```js
Page 1  Narration: The green-skinned giant who has watched the frontier gate all year scratches the back of his neck, the other hand still gripping his club.
        Green Giant: "Er ... you have called me gate guard all this time and I never minded. But I have a name. Kumphan. (cough) My father kept this gate before me."
        Nira: "Recorded. Kumphan, Gate Guard of Suvarnabhumi."
        Kumphan: "Ha ha. Sounds like I have a rank now."
```
- "ยักษ์เขียว" ในบรรทัดแรกเป็นป้ายผู้พูดชั่วคราว (ก่อนรู้ชื่อ) แล้วเปลี่ยนเป็น "กุมภัณฑ์" ตั้งแต่บรรทัดที่ 3
- ท่วงท่า "หัวเราะกลบความเขิน มือสั่นเวลามีเรื่องในใจ" คงตามบทเดิมของ Guard (z2 หัวข้อ 0.1) และใช้กับกุมภัณฑ์ได้ตรง ๆ

### 1.3 บรรทัดคุยสั้นเมื่อแตะกุมภัณฑ์ (เสริม 3 บรรทัด · สุ่ม · ไม่ใบ้คดี)
1. "ข้าชื่อกุมภัณฑ์นะท่าน ไม่ใช่ยักษ์เฉย ๆ (กระแอม)" · EN "It's Kumphan, you know, not just 'the giant'. (cough)"
2. "ประตูนี้ข้าเฝ้ามานาน ท่านจะผ่านเมื่อไหร่ก็ได้ แต่ข้าขอรู้ก่อนว่าไปไหน" · EN "I have kept this gate a long time. Pass whenever you like, but tell me where you are going."
3. "ข้าไม่ได้ตัวใหญ่เพราะอยากให้ใครกลัว ข้าตัวใหญ่เพราะประตูมันกว้าง" · EN "I am not big to scare anyone. I am big because the gate is wide."

## 2. ของวิเศษ 3 ชิ้น · หอกระจกเติมพลัง · ตะเกียงอัญเชิญ · ข้อความ UI (G15 G16 G17 + แก้หอกระจก + H2)

กติกาที่ใช้ (จากต้นฉบับ + แก้หอกระจก + D2):
- ของวิเศษ 3 ชิ้น: **กระจกวิเศษ** เปิดเผยความจริง · **ตะเกียงวิเศษ** อัญเชิญผู้ช่วย · **นาฬิกาวิเศษ** รีเซ็ตเวลาพัก (cooldown) · ใช้แล้ว **พลังหมด** ต้องกลับมาเติมที่หอกระจกทุกครั้ง · หอกระจกเติมได้ทั้ง 3 ชิ้น
- ตะเกียง: ใส่ผู้ช่วยได้ตามระดับตะเกียง **1 / 2 / 3 / 4 ตัว** ตามมินิเกมที่หอกระจกโซน 1 / 2 / 3 / 4 (รูปแบบมินิเกมรอคุณเป้ · ระหว่างนี้ใช้ปุ่มอัปเกรดชั่วคราว)
- ผู้ช่วยแต่ละตัว **ใช้ท่าไม้ตายได้ 3 ครั้ง** ก่อนต้องเติมที่หอกระจก (D2)
- นาฬิกาวิเศษได้ในโซน 4 (ส่วน D) · ส่วน A ใส่ข้อความตอนยังไม่มีไว้ให้
- ในฉากสู้ ปุ่ม "หนี" ถูกแทนด้วย **"อัญเชิญ"** · ก่อนได้ตะเกียง (ก่อน event สีดา) ปุ่มซ่อนหรือล็อก (H2)

### 2.1 การ์ดของวิเศษ (ใช้ในกระเป๋า / ทูลทิป)
| ของ | ชื่อ TH | ชื่อ EN | คำอธิบายสั้น TH | EN |
|---|---|---|---|---|
| กระจก | กระจกวิเศษ | Magic Mirror | ส่องดูความจริงที่ซ่อนอยู่ในคำให้การและในใจของผู้ถูกพิจารณา | Look into the truth hidden in testimony and in the heart of the one before you. |
| ตะเกียง | ตะเกียงวิเศษ | Magic Lamp | ไฟของผู้ที่ยอมรับท่าน ตามลำดับ จุดตะเกียงแล้วเรียกเขามาช่วยในศึก | The flame of those who have accepted you. Light the lamp and call one of them to your side in battle. |
| นาฬิกา | นาฬิกาวิเศษ | Magic Clock | ล้างเวลาพักของพลังและผู้ช่วยให้พร้อมใช้ทันที | Wipe away the waiting time of your powers and helpers so they are ready at once. |

**สถานะพลัง** (ป้ายเล็กบนการ์ด · ใช้กับของวิเศษทั้ง 3)
| สถานะ | TH | EN |
|---|---|---|
| เต็ม | พลังเต็ม | Charged |
| หมด | พลังหมด · เติมที่หอกระจก | Spent · recharge at the Mirror Tower |
| ยังไม่ได้รับ (นาฬิกา ก่อนโซน 4) | ยังไม่ได้รับ | Not yet found |
| ยังไม่ได้รับ (ตะเกียง ก่อน event สีดา) | ยังไม่ได้รับ | Not yet found |

ข้อความตอนกดของที่ยังไม่ได้รับ
- ตะเกียง TH: "ยังไม่มีตะเกียงวิเศษ" · EN: "You do not have the Magic Lamp yet."
- นาฬิกา TH: "ยังไม่ได้รับนาฬิกาวิเศษ" · EN: "You do not have the Magic Clock yet."

### 2.2 กระเป๋า · แถบเมนู "ตะเกียงวิเศษ" (G17)
| ตำแหน่ง | TH | EN |
|---|---|---|
| ชื่อแถบ | ตะเกียงวิเศษ | Magic Lamp |
| หัวข้อในแถบ | ผู้ช่วยในตะเกียง | Helpers in the Lamp |
| คำอธิบายใต้หัวข้อ | เลือกผู้ช่วยที่จะเรียกมาในศึก แต่ละตนใช้ท่าไม้ตายได้ 3 ครั้งก่อนต้องเติมพลังที่หอกระจก | Choose who answers your call in battle. Each helper can use a special move 3 times before needing a recharge at the Mirror Tower. |
| ช่องว่าง | ว่าง · แตะเพื่อเลือกผู้ช่วย | Empty · tap to choose a helper |
| ช่องล็อก (n = โซนของมินิเกมที่ปลดช่องนั้น) | ล็อก · เล่นมินิเกมที่หอกระจกโซน {n} | Locked · play the minigame at the Mirror Tower of Zone {n} |
| ผู้ช่วยที่ยังไม่ได้พบ (ในรายการเลือก) | ??? · ยังไม่ได้พบ | ??? · not yet met |
| ผู้ช่วยที่พบแล้ว บรรทัดสถานะ | ท่าไม้ตาย เหลือ {n}/3 | Special move: {n}/3 left |
| ปุ่มใส่ | ใส่ในตะเกียง | Place in Lamp |
| ปุ่มเปลี่ยนตัว | เปลี่ยนผู้ช่วย | Swap helper |
| ปุ่มเอาออก | เอาออก | Remove |
| ข้อความหลังใส่ | {name} อยู่ในตะเกียงแล้ว | {name} is in the Lamp. |
| ถ้าช่องเต็ม | ช่องเต็ม · เลือกเปลี่ยนแทนตัวเดิม | Lamp is full · swap with someone already in it |
| ถ้าของวิเศษพลังหมด (ทั้งแถบ) | ไฟในตะเกียงริบหรี่ · เติมพลังที่หอกระจก | The Lamp's flame is low · recharge at the Mirror Tower |

### 2.3 ฉากสู้ · ปุ่ม "อัญเชิญ" (แทน "หนี" · H2)
| ที่ | TH | EN |
|---|---|---|
| ปุ่มบนวงคำสั่ง | อัญเชิญ | Summon |
| ก่อนได้ตะเกียง (ถ้าเกมเลือกแสดงแบบล็อกแทนซ่อน) | ล็อก · ยังไม่มีตะเกียงวิเศษ | Locked · no Magic Lamp yet |
| หัวหน้าต่างเลือกผู้ช่วย | อัญเชิญผู้ช่วย | Summon a Helper |
| บรรทัดใต้ชื่อผู้ช่วย | ท่าไม้ตาย เหลือ {n}/3 | Special move: {n}/3 left |
| ปุ่มยืนยัน | เรียกมา | Call |
| ปุ่มยกเลิก | ไม่เรียก | Not now |
| ตะเกียงว่าง ไม่มีผู้ช่วยในตะเกียง | ตะเกียงยังว่าง · ใส่ผู้ช่วยที่เมนูกระเป๋า | The Lamp is empty · place a helper from the bag menu |
| ผู้ช่วยตัวนั้นพลังหมด | {name}: ท่าไม้ตายครบ 3 ครั้งแล้ว · เติมพลังที่หอกระจก | {name} has used all 3 special moves · recharge at the Mirror Tower |
| ทุกตัวหมด | ไฟในตะเกียงริบหรี่ · ไปเติมพลังที่หอกระจก | The Lamp's flame is low · go and recharge at the Mirror Tower |
| ศึกที่อัญเชิญไม่ได้ (เช่น ศึกทดสอบบางศึก ถ้า Toby ล็อก) | ศึกนี้อัญเชิญไม่ได้ · ตะเกียงนิ่งสนิท | You cannot summon in this fight · the Lamp stays still |
| บรรทัดแจ้งในบันทึกศึกตอนเรียก | อัญเชิญ {name} · {move} | Summoned {name} · {move} |
| บรรทัดแจ้งหลังใช้ท่า | {name} ใช้ท่าไม้ตายครั้งที่ {k}/3 | {name} used special move {k}/3 |
| บรรทัดแจ้งเมื่อครบ 3 | แสงของ {name} ในตะเกียงดับลงแล้ว | {name}'s light in the Lamp has gone out. |
- ข้อสมมติที่ใช้ (ตามคำตอบ D2): การกด "อัญเชิญ" 1 ครั้ง = เรียกผู้ช่วย 1 ตนมาใช้ท่าไม้ตาย 1 ครั้ง นับเป็น 1 ใน 3 ครั้ง · ผู้ช่วยไม่ค้างอยู่ในสนาม ดูข้อ "ต้องให้คุณเป้ตัดสิน"

### 2.4 หอกระจก · แผงเติมพลัง + ยกระดับตะเกียง
| ที่ | TH | EN |
|---|---|---|
| หัวแผง | เติมพลังของวิเศษ | Recharge the Treasures |
| คำอธิบาย | แสงจากหอกระจกเติมพลังให้ของวิเศษทั้งสามชิ้น | Light from the Mirror Tower refills all three treasures. |
| ปุ่มเติมแต่ละชิ้น | เติมพลัง | Recharge |
| ปุ่มเติมทั้งหมด | เติมพลังทั้งหมด | Recharge All |
| เมื่อเติมสำเร็จ (ชิ้นเดียว) | {item} พลังเต็มแล้ว | {item} is fully charged. |
| เมื่อเติมสำเร็จ (ทั้งหมด) | ของวิเศษทุกชิ้นพลังเต็มแล้ว | All treasures are fully charged. |
| ถ้าเต็มอยู่แล้ว | พลังเต็มอยู่แล้ว | Already fully charged. |
| ถ้าไม่มีของชิ้นนั้น | ยังไม่ได้รับ {item} | You do not have the {item} yet. |
| หัวหัวข้อยกระดับตะเกียง | ยกระดับตะเกียงวิเศษ | Upgrade the Magic Lamp |
| บรรทัดระดับปัจจุบัน | ตะเกียงตอนนี้ใส่ผู้ช่วยได้ {n} ตน | The Lamp now holds {n} helper(s). |
| ปุ่มเล่นมินิเกม (รอคุณเป้) | เล่นมินิเกมยกระดับ | Play the Upgrade Minigame |
| ปุ่มชั่วคราวระหว่างยังไม่มีมินิเกม | ยกระดับ (ชั่วคราว) | Upgrade (temporary) |
| เมื่อยกระดับสำเร็จ | ตะเกียงวิเศษสว่างขึ้น · ใส่ผู้ช่วยได้ {n} ตน | The Lamp burns brighter · it now holds {n} helpers. |
| ถ้าระดับของโซนนี้เล่นไปแล้ว | หอกระจกแห่งนี้ยกระดับตะเกียงไปแล้ว | This Mirror Tower has already upgraded the Lamp. |
| ถ้ายังไม่มีตะเกียง | ต้องมีตะเกียงวิเศษก่อนจึงยกระดับได้ | You need the Magic Lamp before you can upgrade it. |
- ตัวเลข `{n}`: ระดับ 1 = มินิเกมโซน 1 · 2 = โซน 2 · 3 = โซน 3 · 4 = โซน 4 (ตามที่คุณเป้แก้ ไม่ใช่เพียงสร้างหอ)

### 2.5 บทกานต์อธิบายตะเกียงที่หอกระจก (ครั้งแรกที่เข้าหอกระจกหลังได้ตะเกียง · 1 หน้า)
กานต์เป็นยมทูตประจำหอกระจก (ตามต้นฉบับ G6) และ lore bible ว่า "ไม่ค่อยพูด" จึงเขียนสั้นและพูดตรง
```js
'z1-kan-lamp': { title:'แสงที่เติมได้', pages:[
  { title:'แสงจากกระจก', line:
    'บรรยาย: กานต์มองตะเกียงในมือยามาอยู่ครู่หนึ่ง ก่อนยื่นมือไปหมุนกระจกบานเล็กบนแท่นให้รับแสงเข้าหาเปลวไฟ\n'
  + 'กานต์: "ผมไม่ค่อยพูดครับ แต่เรื่องนี้ต้องพูด ตะเกียงนั้นจุดด้วยไฟของคนที่ยอมรับท่าน ไฟแบบนั้นมีจำกัด ใช้ท่าไม้ตายไปสามครั้งมันก็ริบ"\n'
  + 'กานต์: "หอกระจกรับแสงมาเติมให้ได้ครับ ไม่ใช่แค่กระจกวิเศษ ตะเกียงก็เติมได้ นาฬิกาก็เติมได้ถ้าท่านมี ถ้าไฟริบเมื่อไหร่ กลับมาที่นี่"\n'
  + 'นิรา: "ดิฉันจดไว้แล้วค่ะ ท่านคะ ไฟดับกลางศึกไม่ใช่ความผิดของใคร แต่ตะเกียงที่ไม่ได้เติมเป็นความผิดของคนถือ"' },
]},
```
EN
```js
Page 1  Narration: Kan studies the lamp in Yama's hands for a moment, then reaches out and turns a small mirror on the stand to catch the light and bend it toward the flame.
        Kan: "I am not a talker. But this needs saying. That lamp is lit with the flame of people who have accepted you. That kind of flame is limited. Use a special move three times and it dims."
        Kan: "The Mirror Tower takes in light and can refill it. Not only the Magic Mirror. The lamp too, and the clock if you have it. When the flame runs low, come back here."
        Nira: "Noted. Sir, a flame that dies mid-battle is no one's fault. A lamp that was never refilled is the carrier's."
```
(บรรทัดสุดท้ายของนิรา ตัดได้โดยไม่กระทบเนื้อเรื่อง)

### 2.6 หน้าต่างแจ้งเตือนของระบบ (ส่วน A)
**NA-1 · ได้ตะเกียงวิเศษ (หลัง `sita-lamp`)**
- หัวข้อ: ได้รับ ตะเกียงวิเศษ · EN: Magic Lamp Received
- ข้อความ: นางสีดามอบตะเกียงวิเศษให้ยามา จุดตะเกียงแล้วเรียกผู้ที่ยอมรับท่านมาช่วยในศึกได้ ผู้ช่วยแต่ละตนใช้ท่าไม้ตายได้ 3 ครั้ง เติมพลังที่หอกระจก · ตอนนี้ใส่ผู้ช่วยได้ 1 ตน มี หนุมาน อยู่ในตะเกียง
- EN: Lady Sita has given Yama the Magic Lamp. Light it to call those who have accepted you to your side in battle. Each helper can use a special move 3 times; recharge at the Mirror Tower. The Lamp holds 1 helper for now, and Hanuman is already inside it.
- ปุ่ม: ดูตะเกียง · EN: See the Lamp (เปิดแถบกระเป๋า "ตะเกียงวิเศษ")

**NA-2 · ผู้ช่วยตนใหม่พร้อมแล้ว** (ใช้กับ กุมารทอง / ยมทัต / ฯลฯ ทุกตัวที่ปลดล็อก)
- หัวข้อ: ผู้ช่วยตนใหม่ในตะเกียง · EN: A New Helper in the Lamp
- ข้อความ: {name} ยอมรับท่านแล้ว และฝากไฟไว้ในตะเกียงวิเศษ เลือกใส่ในช่องได้ที่เมนูกระเป๋า
- EN: {name} has accepted you and left a flame in the Magic Lamp. Place them in a slot from the bag menu.
- ปุ่ม: ดูตะเกียง · EN: See the Lamp

**NA-3 · ครั้งแรกที่ไฟตะเกียงหมด (หลังศึก)**
- หัวข้อ: ไฟในตะเกียงริบหรี่ · EN: The Lamp's Flame Is Low
- ข้อความ: ผู้ช่วยในตะเกียงใช้ท่าไม้ตายครบแล้ว ไปเติมพลังที่หอกระจก
- EN: Your helpers have used up their special moves. Go to the Mirror Tower to recharge.
- ปุ่ม: รับทราบ · EN: Understood

## 3. นางสีดามอบตะเกียงวิเศษ + ตัวอัญเชิญแรก: หนุมาน (G14 · ต่อจาก R1 A6)

หลักที่ล็อก (ตามบท R1 A): ไม่แตะเรื่องลุยไฟ เนรเทศ หรือความบริสุทธิ์ · พระรามไม่ปรากฏตัว · หนุมานไม่เสียศักดิ์ศรี · "พระนาง" / "ท่านหนุมาน" ตามสรรพนามเดิม
**ที่มาของตะเกียง** [เสนอ · เรื่องแต่งของเกม]: ประทีปที่นางสีดาจุดทุกค่ำตลอดช่วงรอคอย ไฟของมันจุดติดเมื่อ "ผู้ที่ยอมรับผู้ถือ" ฝากไฟไว้ · ผูกกับกติกา D4 (ต้องผ่าน event ของตัวนั้นก่อนจึงอัญเชิญได้ = ต้องผ่านการยอมรับก่อน) · ไม่อ้างว่าเป็นตำนานรามเกียรติ์ **[R] ให้ Reese ยืนยันว่ารับได้**

### 3.1 ลำดับฉากช่วงท้ายคดี 12 (ฉบับ v2)
1. `sita-hanuman-win` (e2 · R1 A6 · สีดาห้าม หนุมานก้มขอโทษ) →
2. `sita-phantom` (e3 · นิราเปิดแฟ้ม [PHANTOM-404]) + หน้าต่าง N5/N6 บันทึกสมุด (บทเดิม) →
3. **`sita-lamp` (ใหม่ · 3 หน้า)** + NA-1 (ได้ตะเกียง) →
4. `sita-return` (R1 A6 ตาราง 3 ทาง · ส่งพระนางกลับ) → ปลดล็อกปุ่ม "อัญเชิญ" ในฉากสู้
- ไม่ต้องเปลี่ยนบรรทัดแรกของ `sita-return` เพราะนางสีดายังกล่าวขอบคุณอยู่ตามเดิม แต่ **ถ้า Toby เห็นว่าหน้าของ `sita-return` ซ้ำคำขอบคุณกับ `sita-lamp` หน้า 1 ให้ตัดหน้า 1 ของ `sita-lamp` ออก** (ผมเขียนหน้า 1 ให้ตัดได้)

### 3.2 หน้าต่างแจ้งเตือน
ใช้ NA-1 (หัวข้อ 2.6) · ไม่เพิ่มหน้าต่างอื่น

### 3.3 คัตซีน `sita-lamp` (3 หน้า)
```js
'sita-lamp': { title:'ประทีปของพระนาง', pages:[
  { title:'สิ่งเดียวที่หม่อมฉันมี', line:
    'บรรยาย: แสงสุดท้ายของเหตุการณ์ในห้องพิพากษาจางลง นางสีดาเดินมาหยุดตรงหน้าแท่น ในมือถือตะเกียงทองดวงเล็กที่ฐานเป็นกลีบบัว ไส้ตะเกียงยังไม่มีเปลว\n'
  + 'นางสีดา: "ท่านยมบาทน้อย หม่อมฉันไม่ได้นำสิ่งใดมาด้วยนอกจากประทีปดวงนี้ ท่านไม่ตัดสินจากบัญชีเพียงอย่างเดียว และยอมให้หม่อมฉันรอจนเห็นความจริง หม่อมฉันไม่มีสิ่งใดตอบแทนได้เท่าไร ขอท่านรับสิ่งนี้ไว้เจ้าค่ะ"' },
  { title:'ไฟของผู้ที่ยอมรับ', line:
    'นางสีดา: "ประทีปดวงนี้หม่อมฉันจุดทุกค่ำตลอดวันที่หม่อมฉันรอคอย ไฟของมันไม่จุดด้วยไม้ขีดหรือน้ำมัน มันจุดติดเมื่อมีผู้ที่ยอมรับผู้ถือ ฝากไฟของเขาไว้ ท่านหนุมานเป็นผู้แรกที่ยอมรับท่านต่อหน้าหม่อมฉัน"\n'
  + 'หนุมาน: "พระนาง ข้ายินดี"\n'
  + 'บรรยาย: หนุมานคุกเข่าลงข้างหนึ่ง ประนมมือเหนือไส้ตะเกียง เปลวสีทองไหลจากระหว่างฝ่ามือลงมาจุดไส้ตะเกียงที่ว่างอยู่ เปลวสั่นครั้งเดียวแล้วนิ่ง' },
  { title:'เรียกข้าเมื่อต้องการ', line:
    'หนุมาน: "ท่านยมบาทน้อย ข้ายกมือใส่ท่านเมื่อครู่ ข้าไม่ลืม แต่ท่านไม่ถือโทษ เมื่อใดที่ท่านจุดตะเกียงนี้แล้วเรียกชื่อข้า ข้าจะมาช่วยท่านปกป้องผู้ที่ท่านต้องปกป้อง แต่ไฟของข้ามีจำกัด จงใช้ให้คุ้ม"\n'
  + 'นางสีดา: "ไฟของใครที่ฝากไว้ จะดับเมื่อผู้ถือทิ้งสิ่งที่เขายอมรับ หม่อมฉันเชื่อว่าท่านไม่ทิ้งเจ้าค่ะ"\n'
  + 'ยมบาทน้อย: "ผมรับไว้ด้วยความเคารพครับ และจะใช้อย่างระวัง"\n'
  + 'บรรยาย: ยามารับตะเกียงจากสองมือของนางสีดา ไส้ตะเกียงอุ่นขึ้นเล็กน้อยในมือเขา เหมือนมีใครหายใจอยู่ข้างใน' },
]},
```
EN
```js
Page 1  Narration: The last glow of the commotion fades from the judgment hall. Lady Sita walks up to the dais, a small golden lamp in her hands, its base shaped like lotus petals, its wick without a flame.
        Lady Sita: "Lord Yama, I have brought nothing with me but this lamp. You did not judge by the ledger alone, and you let me wait until the truth showed. I have little to give in return. Please accept this."
Page 2  Lady Sita: "I lit this lamp every evening through the days I waited. Its flame is not lit by match or oil. It catches when someone who has accepted its bearer leaves a flame in it. Lord Hanuman is the first to have accepted you in my sight."
        Hanuman: "My lady, gladly."
        Narration: Hanuman drops to one knee and presses his palms together over the wick. A golden flame pours from between his hands and settles on the empty wick. It trembles once, then holds still.
Page 3  Hanuman: "Lord Yama, I raised my hands against you a moment ago. I do not forget it, and you did not hold it against me. Whenever you light this lamp and call my name, I will come and help you protect those you must protect. But my flame is limited. Spend it well."
        Lady Sita: "The flame of whoever leaves one will go out if the bearer abandons what they accepted. I believe you will not abandon it."
        Yama: "I accept it with respect, and I will use it carefully."
        Narration: Yama takes the lamp from Lady Sita's two hands. The wick grows faintly warm in his grasp, as if someone were breathing inside.
```
หมายเหตุ: ตัวเลข "ไฟมีจำกัด" ตรงกับกติกา "ท่าไม้ตาย 3 ครั้ง" แต่ไม่ระบุตัวเลขในบท · ไม่มีบรรทัดที่ทำให้พระรามปรากฏ

### 3.4 ตัวอัญเชิญที่ 1 · หนุมาน (ปลดล็อก: จบ `sita-lamp` · ใน NA-1)
| ฟิลด์ | TH | EN |
|---|---|---|
| ชื่อ | หนุมาน | Hanuman |
| ท่าไม้ตาย | **เหาะเหนือเมฆ** | **Beyond the Clouds** |
| คำบรรยายท่า (ทูลทิป) | หนุมานเหาะทะลวงฟ้า พุ่งผ่านศัตรูทั้งสนามด้วยฝ่ามือเปล่า | Hanuman streaks across the sky and sweeps through every foe with an open palm. |
| ชนิดท่า (ข้อเสนอให้ Toby) | ตีหมู่ แรงปานกลาง | Group hit, moderate power |
| บรรทัดตอนอัญเชิญ | หนุมาน: "พระนางฝากข้ามา ท่านยมบาทน้อย ถอยหลังข้าไว้" | Hanuman: "My lady sent me. Lord Yama, stand behind me." |
| บรรทัดตอนใช้ท่า | หนุมาน: "ข้าไม่ชักอาวุธ แต่ข้าไม่ออมมือ!" | Hanuman: "I draw no weapon, but I hold nothing back!" |
| บรรทัดตอนจบท่า (กลับเข้าตะเกียง) | หนุมาน: "ไฟของข้าเหลือเท่านี้ ท่านใช้ให้คุ้ม" | Hanuman: "That is all my flame allows. Spend it well." |
- ชื่อท่าไม่ซ้ำกับท่าบอสของหนุมาน ("เหาะกวาดลาน" / "ขยายกายฟาดฝ่ามือ" ในไฟล์ boss-skills) · ท่านี้ "ไม่ชักอาวุธ" ตรงกับหลักเดิมว่าหนุมานในโซน 1 ไม่ถืออาวุธ
- หนุมานพูดในศึกได้เมื่อเป็นผู้ช่วย (ต่างจากศึกทดสอบที่ไม่พูด) เพราะไม่ใช่การทดสอบแล้ว
- ภาพ: ดูตารางภาพ หัวข้อ 11

## 4. คดีที่ 13 · นางวันทองสองใจ → ขุนแผน → กุมารทอง (G19)

ต้นฉบับคุณเป้: เพิ่มคดีนางวันทองสองใจ · ตัดสินเสร็จ มีขุนแผนโผล่มาช่วย (วาดเพิ่ม) ไม่ยอมให้ลงโทษ · เราสู้ชนะ · นางวันทองห้ามขุนแผน ขอยอมรับคำตัดสินและรับบาป · ขุนแผนเข้าใจ ไปลานางวันทอง ไว้เจอกันใหม่ชาติหน้า · ขุนแผนขอโทษเรา ให้กุมารทองแทนคำขอโทษ (อัญเชิญได้)

**ข้อควรระวังเนื้อหา (ตามใบงาน):** ไม่บรรยายวิธีทำกุมารทองตามตำนาน · ไม่มีภาพหรือคำบรรยายทารก (กุมารทองในเกมเป็นเด็กชายผมจุกวัยราว 7–8 ปี ผู้ติดตามที่ซื่อสัตย์ ไม่เล่าที่มา) · เน้นขุนแผนมอบเป็นคำขอโทษ · ไม่ใช้คำว่า "เสน่ห์" "ไสยศาสตร์" เป็นจุดขายหรือมุกตลก · นางวันทองไม่ถูกทำให้เป็นตัวร้ายหรือตัวตลก

### 4.1 ตำแหน่งในลำดับ
- เสนอ: **คดีครบ 12 แล้วคดีที่ 13 เป็นคดีวันทอง** (`{ k:'wanthong', after:12, needsEvent:'sitaHanuman' }` ในแถว `TH_STORY_CASES`) · อยู่หลังได้ตะเกียงเพื่อให้การได้กุมารทองเป็น "ไฟดวงที่สองในตะเกียง" เชื่อมกับบท `sita-lamp` · ก่อนคดี 15 (ยมทัต)
- ขุนแผนมาทุกทางที่ผู้เล่นตัดสิน (รวมไม่ลงโทษ) เพื่อไม่ให้การปลดล็อกกุมารทองขาด · มี 2 รุ่นของบรรทัดนำ ดูหัวข้อ 4.4

### 4.2 หน้าต่างแจ้งเตือน
**NW-1 · คดีเข้าคิว**
- หัวข้อ: วิญญาณจากเรื่องเล่าเก่า · EN: A Soul from an Old Tale
- ข้อความ: วิญญาณนางวันทองมาถึงคิวพิจารณา ตามบัญชีระบุข้อหาใจสองใจ ผู้คนในสำนวนเก่าต่างมีส่วนในเรื่องนี้ โปรดไต่สวนด้วยความละเอียด
- EN: The soul of Lady Wanthong has reached the queue. The ledger names the charge as a divided heart. Many people in the old record had a hand in this. Please hear her carefully.
- ปุ่ม: เริ่มไต่สวน · EN: Begin the hearing

**NW-2 · ขุนแผนบุกเข้ามา (หลังออกคำตัดสิน)**
- หัวข้อ: ขุนแผนบุกเข้ามา · EN: Khun Phaen Bursts In
- ข้อความ: ขุนแผนนักรบเก่ามาขวางไม่ให้ลงโทษนางวันทอง เขาไม่ใช่ศัตรู แต่จะไม่ยอมถอยจนกว่าจะเห็นฝีมือท่าน
- EN: The old warrior Khun Phaen has come to stop Wanthong's sentence. He is no enemy, but he will not yield until he has seen your mettle.
- ปุ่ม: รับมือ · EN: Face him

**NW-3 · แบนเนอร์ศึก**
- ศึกปกป้องนางวันทอง · ขุนแผน · EN: Defending Wanthong · Khun Phaen

**NW-4 · ชนะ**
- หัวข้อ: ขุนแผนวางดาบ · EN: Khun Phaen Lays Down His Sword
- ข้อความ: ขุนแผนยอมรับ นางวันทองขอรับคำตัดสินด้วยตัวเอง
- EN: Khun Phaen yields. Wanthong asks to accept the verdict herself.
- ปุ่ม: ต่อ · EN: Continue

**NW-5 · แพ้ (ให้ลองใหม่)**
- หัวข้อ: ขุนแผนรอท่านอยู่ · EN: Khun Phaen Waits
- ข้อความ: ขุนแผนหยุดดาบไว้ก่อน ท่านตั้งหลักแล้วลองอีกครั้งได้
- EN: Khun Phaen stays his blade for now. Steady yourself and try again.
- ปุ่ม: สู้อีกครั้ง · EN: Try again

### 4.3 สำนวนคดี: นางวันทอง (ฟิลด์ตาม `cases.js` · รหัสบาป kam = กาเม · bian = เบียดเบียน · ตัวเลข `w` `v` ให้ Toby/ซิมปรับ)
```js
{
  k:'wanthong', quest:'z1Wanthong', zone:'th', sex:'f', sp:'soul-wanthong-th', kind:'twist', calm:true, story:true,
  name:'นางวันทอง', who:'หญิงในเรื่องเล่าเก่า ผู้ถูกกล่าวหาว่ามีใจให้ชายสองคน',
  face:'ผมเกล้าเรียบ สีหน้าสงบแบบคนที่เตรียมใจรับคำตัดสินมานาน มือกุมชายผ้าแน่นจนข้อนิ้วซีด',
  seen:[
    { t:'ใจเอนเอียงไปทั้งสองฝ่าย ไม่เลือกให้ชัดว่าจะอยู่กับใคร', s:'kam', w:2 },
    { t:'การแย่งชิงตัวนางก่อให้เกิดความบาดหมางและเดือดร้อนหลายครั้ง', s:'bian', w:3 },
  ],
  hidden:[
    { t:'ถูกบังคับให้ไปอยู่เรือนขุนช้างหลังมีข่าวว่าขุนแผนตายในศึก โดยไม่มีโอกาสเลือกด้วยตนเอง', s:'bian', w:-2 },
    { t:'ภายหลังเมื่อมีโอกาสเลือกจริง นางก็ไม่เลือกใคร เพราะเสียดายความสุขสบายในเรือนหลังนั้นอยู่ส่วนหนึ่งด้วย', s:'kam', w:2 },
  ],
  merits:[
    { t:'เลี้ยงลูกชายให้เติบโตเป็นคนกล้าและมีน้ำใจ ทั้งที่ตนเองต้องพลัดพรากหลายครั้ง', v:2, fake:false },
    { t:'ซื่อสัตย์ต่อสามีทั้งสองตลอดมา', v:1, fake:true },
  ],
  line:'"หม่อมฉันรู้ว่าหม่อมฉันผิดเจ้าค่ะ จะให้ผิดมากหรือน้อย หม่อมฉันขอฟังจากท่าน"',
  claims:[
    { kind:'deny',  t:'หม่อมฉันไม่เคยมีใจให้ใครนอกจากพี่ขุนแผนเลยเจ้าค่ะ',
      reveal:'นางนิ่งไปนาน แล้วพูดเบา ๆ ว่า "...หม่อมฉันเสียดายเรือนหลังนั้นอยู่บ้างเจ้าค่ะ ท่านถามตรง ๆ หม่อมฉันก็ไม่กล้าโกหก"' },
    { kind:'boast', t:'ท่านดูบุญของหม่อมฉันด้วยเจ้าค่ะ หม่อมฉันซื่อสัตย์ต่อสามีทั้งสองตลอดมา',
      merit:'ซื่อสัตย์ต่อสามีทั้งสองตลอดมา',
      reveal:'ท่านถามว่าซื่อสัตย์ต่อใครในวันไหน นางนิ่งไป — นางเก็บสิ่งของจากทั้งสองฝ่ายไว้ในหีบใบเดียวกัน ไม่เคยคืนให้ใคร และไม่เคยบอกใครว่ายังเก็บอยู่' },
    { kind:'solid', t:'เรื่องที่ผู้คนเดือดร้อนเพราะการแย่งชิงหม่อมฉัน หม่อมฉันรับเจ้าค่ะ ไม่ว่าหม่อมฉันตั้งใจหรือไม่' },
    { kind:'solid', t:'หม่อมฉันไม่ขอให้ท่านเมตตาเพราะหม่อมฉันเป็นหญิง หรือเพราะผู้คนเล่าเรื่องหม่อมฉันด้วยความสงสาร ขอเพียงให้ท่านเขียนความจริงลงหมาย' },
  ],
  secret:'ส่องกระจกแล้ว ไม่พบความอาฆาตในใจนางเลย พบเพียงความรู้สึกผิดที่ไม่เคยพูด และความรักต่อลูกที่ยังไม่จาง',
  reward:'นางวันทองก้มศีรษะรับหมายด้วยสองมือ แล้วเดินตามผู้คุมไปโดยไม่หันกลับ',
  fail:'ยมบาทน้อยยังมองหมายบนโต๊ะ ปลายปากกาค้างเหนือกระดาษโดยไม่ลง',
}
```
หมายเหตุ Toby
- `kind:'twist'` เพราะมีบุญปลอม 1 ข้อกับ `deny` 1 ข้อให้ผู้เล่นจับด้วย `reveal` ตามรูปแบบคดีบอสเดิม · บาปแท้ของคดีนี้ (kam 2 + bian 3 + kam 2 ที่เปิดจาก hidden ข้อ 2) อยู่ระดับเบา-กลาง ไม่ใช่โทษหนัก
- นางวันทอง "รับโทษได้ทุกระดับที่ผู้เล่นเลือก" ในเชิงเรื่อง (นางรับเสมอ) · ถ้าผู้เล่นเลือกไม่ลงโทษ ใช้รุ่น B ของบรรทัดนำหัวข้อ 4.4
- รูปแบบเดียวกับ Sita: ขุนแผนมา **ก่อนผู้คุมถึงมือ** นางวันทอง · ไม่มีภาพหรือฉากการลงทัณฑ์นางโดยตรง

### 4.4 คัตซีน `z1-khunphaen-open` (2 หน้า · 2 รุ่นตามทางที่ผู้เล่นเลือก · 3 ตัวแปรตามทาง: `lead` `khunTail` `yamaLine`)
| ทาง | บรรทัดแรกของหน้า 1 (`lead`) | บรรทัดแรกของหน้า 2 (`yamaLine`) |
|---|---|---|
| A ลงโทษ (ทุกระดับ) | บรรยาย: ตราหมายกดลงบนกระดาษ ผู้คุมยังไม่ทันก้าวเข้ามา ประตูโถงพิพากษาก็ถูกถีบเปิดจนบานกระแทกผนัง | ยมบาทน้อย: "ท่านขุนแผน ผมออกหมายตามระดับที่บัญชีและคำให้การรองรับครับ ผมไม่ได้ตัดสินเพราะเกลียดพระนางผู้นี้" |
| B ไม่ลงโทษ | บรรยาย: ยมบาทน้อยเพิ่งวางปากกา ประตูโถงพิพากษาก็ถูกถีบเปิดจนบานกระแทกผนัง | ยมบาทน้อย: "ท่านขุนแผน ผมไม่ได้ลงโทษนางครับ ท่านไม่ต้องห่วง" |
`{khunTail}` (ท้ายบรรทัดขุนแผนในหน้า 1 · แยกตามทาง ตามผล Reese 4.1 เพื่อไม่ให้บรรทัดขุนแผนขัดกับทาง B ที่ยังไม่ได้ลงโทษ)
| ทาง | `khunTail` TH | `khunTail` EN |
|---|---|---|
| A ลงโทษ (ทุกระดับ) | ผู้ถือบัญชีที่จะลงโทษนางวันทอง ต้องผ่านข้าก่อน | Whoever would sentence Wanthong must pass me first. |
| B ไม่ลงโทษ | ข้าไม่เชื่อว่าสำนักนี้ปล่อยใครง่าย ๆ ข้ามาดูเองว่านางถูกปล่อยจริงหรือไม่ ผู้ที่คิดจะลงโทษนางวันทองทีหลัง ต้องผ่านข้าก่อน | I do not believe this office lets anyone go so easily. I have come to see for myself. Whoever thinks to punish Wanthong later must pass me first. |
(ทั้ง 2 รุ่นยังเดินเรื่องเดียวกันต่อไป · รุ่น B ขุนแผนเข้ามาเพราะ "ไม่เชื่อว่าสำนักนี้ปล่อยใครง่าย ๆ" ตามบรรทัด `khunTail` ในหน้า 1)
```js
'z1-khunphaen-open': { title:'นักรบผู้มาขวาง', pages:[
  { title:'ข้าชื่อขุนแผน', line:
    '{lead}\n'
  + 'บรรยาย: ชายร่างกำยำในผ้าโพกศีรษะลายยันต์เก่า ผ้านุ่งโจงสีเข้ม ผ้าประเจียดสีเหลืองซีดพันต้นแขน ก้าวเข้ามาท่ามกลางหมอก ดาบฟ้าฟื้นเก่าคร่ำประดับอยู่ข้างเอว ด้านนอกประตู ม้าสีหมอกตัวหนึ่งยืนนิ่งอยู่ในหมอกบาง ๆ\n'
  + 'ขุนแผน: "ข้าชื่อขุนแผน ข้าเคยพานางกลับมาจากเรือนนั้นกลางดึกครั้งหนึ่ง และข้าไม่ยอมเสียนางอีก {khunTail}"' },
  { title:'ข้าไม่ได้มาเพื่อฆ่า', line:
    '{yamaLine}\n'
  + 'ขุนแผน: "ข้ารู้ว่าท่านไม่ได้เกลียด ข้าเคยตัดสินคนด้วยดาบมามากพอที่จะดูออก แต่นางไม่ได้ผิดคนเดียว ข้ามีส่วน ข้าไม่ยอมให้นางรับคนเดียว"\n'
  + 'ขุนแผน: "ข้าไม่ได้มาเพื่อฆ่าท่าน ข้าแค่อยากรู้ว่าท่านปกป้องความถูกต้องได้ถึงที่สุดหรือไม่ จงตั้งหลัก!"\n'
  + 'บรรยาย: ขุนแผนชักดาบออกจากฝักครึ่งเล่ม ประกายเหล็กสะท้อนเข้าตานางวันทองที่ยืนอยู่ข้างแท่น นางไม่ขยับ' },
]},
```
EN
```js
Page 1  {lead}
                A: Narration: The writ-seal presses onto the page. Before the guard can step forward, the doors of the judgment hall are kicked open and slam against the walls.
                B: Narration: Yama has only just set down his pen when the doors of the judgment hall are kicked open and slam against the walls.
        Narration: A broad-shouldered man in a headcloth marked with old charms, a dark wrapped lower garment in the old Siamese warrior style, and a faded yellow prajiad cloth bound around his upper arm steps in through the mist. An old sword, the Fa Fuen blade, hangs at his hip. Outside the door the mist-grey horse Si Mok stands still in the drifting haze.
        Khun Phaen: "I am Khun Phaen. Once before I took her back from that house in the dead of night, and I will not lose her again. {khunTail}"
Page 2  {yamaLine}
                A: Yama: "Lord Khun Phaen, I issued the writ at the level the ledger and her testimony support. I did not judge her out of hatred."
                B: Yama: "Lord Khun Phaen, I have not sentenced her. You need not worry."
        Khun Phaen: "I know you do not hate her. I have judged men by the sword long enough to tell. But she is not the only one at fault. I have a share in it. I will not let her bear it alone."
        Khun Phaen: "I did not come to kill you. I came to see whether you can defend what is right all the way to the end. Steady yourself!"
        Narration: Khun Phaen draws his sword half out of its scabbard. The glint of steel crosses Wanthong's eyes where she stands beside the dais. She does not move.
```
(ถ้าเกมไม่มีภาพม้าให้ตัดประโยคม้าสีหมอกออก · ชื่อดาบ "ฟ้าฟื้น" และม้า "สีหมอก" ใช้ตามเรื่องขุนช้างขุนแผน · Reese ยืนยันชื่อม้าเป็น "สีหมอก" แล้ว)

### 4.5 บทในฉากสู้ + ท่าไม้ตายของขุนแผน (ข้อเสนอ · ตัวเลข Toby จูน)
- เริ่มสู้ ขุนแผน: "ดาบฟ้าฟื้นของข้าไม่เคยหักเพราะใคร ตั้งหลักให้ดี"
- เลือดเหลือครึ่ง ขุนแผน: "ฝีมือดี ท่านไม่ใช่ผู้ถือบัญชีที่รู้แต่เขียน!"
- EN: Start: "The Fa Fuen blade has never broken for anyone. Steady yourself." · Half HP: "Good steel in you. You are no scribe who only writes!"
```js
khunphaen:[
  { id:'simoCharge', kind:'groupHit', warn:1, power:.7,
    name:{ th:'ม้าสีหมอกควบทะลวง', en:"Si Mok's Charge" },
    warnText:{ th:'ม้าสีหมอกข้างนอกประตูตะกุยเท้า ขุนแผนหันดาบเข้าหาทีม — รอบหน้าจะควบทะลวงทั้งทีม!', en:'The mist-grey horse Si Mok paws at the door as Khun Phaen turns his blade toward the team — next turn he charges through all of you!' },
    useText:{ th:'ขุนแผน: "ตามข้ามา!" แล้วควบทะลวงผ่านทั้งทีม', en:'Khun Phaen: "With me!" and he charges through the whole team' },
    when:{ firstAct:3, everyActs:4 } },
  { id:'faFuenSlash', kind:'heavyHit', warn:1, power:1.8,
    name:{ th:'ดาบฟ้าฟื้นฟาดเดี่ยว', en:'Fa Fuen Strike' },
    warnText:{ th:'ขุนแผนกำด้ามดาบฟ้าฟื้นสองมือ — รอบหน้าจะฟันหนักใส่คนเดียว!', en:'Khun Phaen grips the Fa Fuen blade in both hands — next turn a heavy cut falls on one of you!' },
    useText:{ th:'ขุนแผนฟันเต็มแรงเพียงครั้งเดียว แล้วถอยหนึ่งก้าว', en:'Khun Phaen strikes once with everything he has, then steps back' },
    when:{ hpBelow:.55, everyActs:3 } },
],
```
(ไม่มีท่าเกี่ยวกับเสน่ห์ มนต์ หรือยาสั่ง · ชื่อท่าเป็นม้ากับดาบเท่านั้น)

### 4.6 คัตซีนชนะ `z1-khunphaen-win` (3 หน้า)
```js
'z1-khunphaen-win': { title:'ใจของผู้ที่ต้องรับ', pages:[
  { title:'พอเถิดเจ้าค่ะ', line:
    'บรรยาย: ขุนแผนเข่าข้างหนึ่งทรุดลง ปลายดาบฟ้าฟื้นปักพื้น เขาพยายามพยุงตัวขึ้นอีกครั้ง นางวันทองก้าวออกมายืนกลางโถง ยกมือขึ้นเสมออก\n'
  + 'ขุนแผน: "ข้ายังยืนได้ ข้ายังไม่แพ้"\n'
  + 'นางวันทอง: "พอเถิดเจ้าค่ะ พี่ขุนแผน หม่อมฉันขอรับคำตัดสินของท่านด้วยตัวเอง ใจหม่อมฉันเอนไปสองทางจริง จะให้พี่ต้องรบแทนหม่อมฉันอีกไม่ได้ บาปที่หม่อมฉันทำไว้ หม่อมฉันขอรับเอง"' },
  { title:'ไว้พบกันชาติหน้า', line:
    'บรรยาย: ขุนแผนนิ่งอยู่นาน แล้วค่อย ๆ ปล่อยด้ามดาบ นิ้วที่เคยกำจนซีดคลายออกทีละนิ้ว\n'
  + 'ขุนแผน: "ข้าเข้าใจแล้ว ครั้งก่อนข้าพานางหนีด้วยมือข้าเอง ครั้งนี้นางไม่ได้ขอให้ข้าพา นางขอให้ข้ายืนดู นั่นยากกว่ารบเสียอีก"\n'
  + 'ขุนแผน: "ลาก่อนวันทอง ไว้เราพบกันใหม่ชาติหน้า ชาตินั้นข้าจะถามนางก่อนที่จะชักดาบ"\n'
  + 'นางวันทอง: "เจ้าค่ะ ขอให้ชาติหน้า เราไม่ต้องรบกันเพราะหม่อมฉันอีก"\n'
  + '{farewellLine}' },
  { title:'คำขอโทษของนักรบ', line:
    'บรรยาย: ขุนแผนหันมาหายามา วางมือขวาทาบอก ก้มศีรษะต่ำกว่าที่ชายที่เคยชักดาบใส่ใครจะก้ม\n'
  + 'ขุนแผน: "ท่านยมบาทน้อย ข้ายกดาบใส่ผู้ที่ทำหน้าที่ถูกต้อง ข้าผิดเอง ข้าขออภัย คำพูดอย่างเดียวไม่พอ ข้ามีผู้ติดตามที่ซื่อสัตย์อยู่ข้างกายข้ามานาน ข้าขอมอบให้ท่านแทนคำขอโทษ"\n'
  + 'บรรยาย: ละอองแสงสีทองสายหนึ่งลอยออกมาจากชายผ้าของขุนแผน เล็ก ๆ ลอยเรี่ยพื้น แล้วรวมกันเป็นเด็กชายผมจุกวัยราวเจ็ดแปดขวบ กายเรืองแสงทองจาง ๆ ยืนเงยหน้ามองยามา\n'
  + 'กุมารทอง: "นายท่าน ข้าชื่อกุมารทอง ท่านขุนแผนบอกให้ข้ามาอยู่กับท่าน ข้ายินดี ข้าจะไม่ให้ใครแตะต้องท่าน"\n'
  + 'ยมบาทน้อย: "ผมรับไว้ครับ ขอบคุณท่านขุนแผน และผมสัญญาว่าจะดูแลเขาให้ดี"\n'
  + 'บรรยาย: ประกายทองดวงเล็กลอยเข้าไปในตะเกียงวิเศษที่ห้อยข้างเอวยามา ไส้ตะเกียงสว่างขึ้นอีกดวง' },
]},
```
`{farewellLine}` (ทางที่ผู้เล่นเลือก):
| ทาง | บรรทัด TH | EN |
|---|---|---|
| A ลงโทษ | บรรยาย: ผู้คุมเดินเข้ามาเงียบ ๆ นางวันทองก้มศีรษะให้ขุนแผนอีกครั้งแล้วเดินตามผู้คุมไปยังสถานีที่ยมบาทน้อยกำหนดไว้ ขุนแผนมองตามจนลับตา | Narration: The guard steps in quietly. Wanthong bows once more to Khun Phaen and follows the guard toward the station Yama assigned. Khun Phaen watches until she is out of sight. |
| B ไม่ลงโทษ | นางวันทอง: "หม่อมฉันขอเรียนท่านยมบาทน้อยเจ้าค่ะ ท่านปล่อยหม่อมฉันด้วยความเมตตา แต่หม่อมฉันมีบาป ขอให้ท่านบันทึกโทษเบาที่สุดไว้ในแฟ้มเถิด" · ยมบาทน้อย: "ผมบันทึกตามที่พระนางขอครับ" · บรรยาย: นางวันทองก้มศีรษะให้ขุนแผน แล้วเดินไปรอที่ประตูสวรรค์ ขุนแผนมองตามจนลับตา | Wanthong: "I must tell you, Lord Yama. You let me go out of mercy, but I have sins. Please enter the lightest penalty in my file." · Yama: "I will record it as you ask." · Narration: Wanthong bows to Khun Phaen and goes to wait at the gate of heaven. Khun Phaen watches until she is out of sight. |
(ทาง B: ผลคะแนนและการบันทึกโทษเบา ให้ Toby/คุณเป้ตัดสิน ดูท้ายไฟล์)

EN หน้า 1–3
```js
Page 1  Narration: Khun Phaen drops to one knee, the Fa Fuen blade planted in the floor, and tries to rise again. Wanthong steps out into the middle of the hall and lifts a hand to her chest.
        Khun Phaen: "I can still stand. I have not lost."
        Wanthong: "Enough, my lord Khun Phaen. I ask to accept the verdict myself. My heart did lean two ways, and I cannot let you fight in my place again. The sin I have done, I will bear."
Page 2  Narration: Khun Phaen is still for a long moment. Then he lets go of the hilt, the fingers that had gripped it white easing open one by one.
        Khun Phaen: "I understand. Last time I carried her off by my own hand. This time she has not asked me to take. She has asked me to stand and watch. That is harder than any battle."
        Khun Phaen: "Farewell, Wanthong. We will meet again in the next life, and then I will ask you before I draw my blade."
        Wanthong: "Yes. In the next life, may we not have to fight because of me again."
        {farewellLine}
Page 3  Narration: Khun Phaen turns to Yama, lays his right hand on his chest, and bows lower than a man who has drawn his sword on others ever bows.
        Khun Phaen: "Lord Yama, I raised my blade against one who was doing right. The fault is mine. Words alone are not enough. I have a loyal follower who has stood beside me a long time. I give him to you in place of an apology."
        Narration: A thread of golden light drifts from the hem of Khun Phaen's garment, small, hugging the floor, and gathers into a boy of seven or eight with a topknot, his body faintly glowing gold, looking up at Yama.
        Kuman Thong: "Master, I am Kuman Thong. Lord Khun Phaen told me to stay with you. I am glad. I will not let anyone touch you."
        Yama: "I accept him. Thank you, Lord Khun Phaen. I promise I will look after him well."
        Narration: A tiny golden spark floats into the Magic Lamp at Yama's side. Another wick glows.
```
- ชื่อ EN ของกุมารทอง: **Kuman Thong** (ถอดเสียง · ไม่แปลว่า "golden child" ในชื่อ เพื่อไม่ให้ภาพกลายเป็นเด็กทารก)
- `z1-khunphaen-lose` ใช้ NW-5 อย่างเดียว ไม่ต้องมีคัตซีน (หรือบรรทัดเดียว ขุนแผน: "ลุกเถอะ ข้าไม่ฟันผู้ที่ล้ม ตั้งหลักแล้วมาใหม่")

### 4.7 ตัวอัญเชิญที่ 2 · กุมารทอง (ปลดล็อก: จบ `z1-khunphaen-win` · NA-2)
| ฟิลด์ | TH | EN |
|---|---|---|
| ชื่อ | กุมารทอง | Kuman Thong |
| ท่าไม้ตาย | **แสงทองคุ้มกาย** | **Golden Aegis** |
| คำบรรยายท่า | กุมารทองกางแสงทองเป็นม่านคุ้มกันทั้งทีม และพยุงผู้ที่ล้มให้ลุกขึ้นได้ | Kuman Thong spreads a curtain of golden light over the team and helps the fallen back to their feet. |
| ชนิดท่า (ข้อเสนอ) | ป้องกันทั้งทีม 1 รอบ + ฟื้นพลังเล็กน้อย | Team shield for one round plus a small heal |
| บรรทัดตอนอัญเชิญ | กุมารทอง: "นายท่านเรียกข้าแล้ว ข้ามาแล้ว ไม่ต้องกลัว" | Kuman Thong: "Master called me. I am here. Do not be afraid." |
| บรรทัดตอนใช้ท่า | กุมารทอง: "ข้าจะไม่ให้ใครแตะต้องพวกท่าน!" | Kuman Thong: "I will not let anyone touch you!" |
| บรรทัดตอนจบท่า | กุมารทอง: "ไฟข้าเหลือน้อยแล้ว แต่ข้าไม่เหนื่อยหรอก" | Kuman Thong: "My flame is low, but I am not tired." |

### 4.8 บทคุยเพิ่มของขุนแผน (หลังจบ · ถ้าขุนแผนอยู่บนแผนที่ไม่ได้ ตัดทั้งหมด)
ขุนแผนไม่อยู่บนแผนที่หลังจบ (จากไปตามบท "ไว้พบกันชาติหน้า") จึงไม่มีบทคุยเพิ่ม · ถ้าคุณเป้อยากให้กุมารทองมีบรรทัดคุยในตะเกียง (แตะผู้ช่วยในหน้ากระเป๋า) เสนอ 2 บรรทัดสุ่ม: 1) "ท่านขุนแผนบอกให้ข้าเตือนว่าท่านต้องกินข้าวตรงเวลา" · EN "Lord Khun Phaen told me to remind you to eat on time." 2) "ข้าไม่ได้เศร้านะ ท่านขุนแผนบอกว่าชาติหน้าเขาจะถามก่อน" · EN "I am not sad. Lord Khun Phaen said that next life he will ask first."

## 5. ยมทัต (พี่ชาย) ยืนท่าเรือ ชวนไปด้วยกัน (G20 · แทน T5 เดิม)

ต้นฉบับ: เฉพาะบอสโซน 1 ยมทัตเดินไปส่งที่ชายแดนคนเดียว (เพราะเป็นพี่ชาย) บอสโซนอื่นไม่ต้องเดินไปส่ง · เมื่อชนะ ยมทัตยืนแถวท่าเรือ ให้เราคุย ถ้าตอบว่าจะเดินทางไปดินแดนใหม่ด้วยกัน พี่ชายเข้ารวมทีม (ยามา นิรา ยมทัต) แล้วเดินไปชายแดน 1-2 ด้วยกัน

### 5.1 ลำดับ
1. ชนะศึกบอสโซน 1 (เดิม) → 2. คัตซีน `z1-yomathat-wait` (หลังศึกจบ ยมทัตไปรอท่าเรือ · แทน boss-guide `welcome/farewell` เดิม) → 3. หน้าต่าง NY-1 → 4. ผู้เล่นเดินไปคุยที่ท่าเรือ → 5. ถามยืนยัน: ไปด้วยกัน / เตรียมตัวก่อน → 6. เข้าทีม (NY-2) → 7. เดินไปชายแดน 1-2 (หัวข้อ 6)
- ไม่มีฉาก "บอสโซนยืนรอประตู" (T5 เดิมยกเลิก) · ไม่มีฉากเดินไปส่งของบอสโซน 2–4

### 5.2 หน้าต่างแจ้งเตือน
**NY-1 · หลังชนะ**
- หัวข้อ: พี่ชายรอท่านที่ท่าเรือ · EN: Your Brother Waits at the Harbor
- ข้อความ: ยมทัตผู้เป็นพี่ชายยอมรับฝีมือท่านแล้ว เขารออยู่แถวท่าเรือ เตรียมทีมให้พร้อม แล้วเดินไปคุยกับเขา
- EN: Your elder brother Yomathat has acknowledged your skill. He is waiting near the harbor. Ready your team, then go and speak with him.
- ปุ่ม: รับทราบ · EN: Understood

**NY-2 · เมื่อตอบตกลง**
- หัวข้อ: ยมทัตร่วมทีม · EN: Yomathat Joins the Team
- ข้อความ: ยมทัตเข้าร่วมทีมเดินทางไปดินแดนใหม่ ทีมของท่านคือ ยามา นิรา และยมทัต มุ่งหน้าสู่ชายแดน 1-2
- EN: Yomathat joins the journey to the new land. Your team is Yama, Nira, and Yomathat, heading for the Border 1-2.
- ปุ่ม: ออกเดินทาง · EN: Set out

### 5.3 คัตซีน `z1-yomathat-wait` (1 หน้า · ต่อจากบทชนะเดิมของบอสโซน 1)
```js
'z1-yomathat-wait': { title:'พี่รอที่ท่าเรือ', pages:[
  { title:'พี่รอน้องที่ท่าเรือ', line:
    'บรรยาย: ยมทัตสอดดาบเพลิงกลับเข้าฝัก ยืนนิ่งมองน้องชายอยู่ครู่หนึ่ง ก่อนเอ่ยด้วยเสียงต่ำที่แทบไม่ผิดไปจากเวลาสั่งงาน\n'
  + 'ยมทัต: "พี่ตรวจสาขาแล้ว ได้เห็นของจริงแล้ว พี่ไม่มีอะไรจะสอนเพิ่ม"\n'
  + 'ยมทัต: "ดินแดนข้างหน้าไม่ได้ใจดีเหมือนที่นี่ พี่จะรอที่ท่าเรือ เมื่อน้องพร้อม มาหาพี่"' },
]},
```
EN: Narration: Yomathat sheathes his flame blade and regards his younger brother for a moment, then speaks in a low voice almost no different from when he gives orders. / Yomathat: "I have inspected the branch. I have seen the real thing. I have nothing more to teach you." / Yomathat: "The land ahead is not as kind as this one. I will wait at the harbor. When you are ready, come to me."

### 5.4 บทคุยที่ท่าเรือ (ไม่มีคัตซีนเต็ม · รูปแบบ dialogue + ตัวเลือก ตาม `KIN_CONTENT`)
**ครั้งแรกที่คุย (ก่อนตอบ)**
- ยมทัต: "น้อง พี่ไม่ถนัดพูดยาว พี่จะพูดสั้น ๆ พี่ขอไปกับน้องถึงประตูบูรพา ไม่ใช่เพราะพี่ห่วงฝีมือ พี่ห่วงที่ผู้เฝ้าประตูตรงนั้นไม่ฟังคำใครนอกจากคำสัตย์ของตัวเอง"
- ยมทัต: "ว่าไง จะไปด้วยกันไหม"
- EN: Yomathat: "Little brother, I am no good at long speeches, so I will be brief. I am asking to go with you as far as the gate of the east. Not because I doubt your skill. Because the one who keeps that gate listens to no one but his own sworn word." / "So. Shall we go together?"
- ปุ่ม: **[ไปด้วยกันครับ]** · EN [Let's go together] / **[ขอเตรียมตัวก่อน]** · EN [Let me prepare first]

**ตอบ "ไปด้วยกัน"**
- ยามา: "ไปด้วยกันครับ พี่"
- ยมทัต: "ดี แต่พี่ขอไว้ข้อเดียว ถ้าพี่ห้ามอะไร น้องฟังพี่ก่อนครั้งเดียว ที่เหลือพี่ไม่ก้าวก่าย"
- นิรา: "ดิฉันจดไว้แล้วค่ะ ท่านคะ ทั้งสองข้อ"
- EN: Yama: "Together, brother." / Yomathat: "Good. I ask only one thing. If I tell you to stop, listen to me that one time. Everything else I will not interfere with." / Nira: "Noted, sir. Both points."
→ NY-2 → เข้าทีม

**ตอบ "ขอเตรียมตัวก่อน"**
- ยามา: "ขอผมเตรียมตัวก่อนครับ พี่"
- ยมทัต: "พี่รออยู่ ไม่มีใครรีบพี่"
- EN: Yama: "Give me a moment to prepare, brother." / Yomathat: "I will be here. No one is rushing me."

**แตะอีกครั้งหลังตอบ "ยังก่อน" (สุ่ม 2 บรรทัด)**
1. ยมทัต: "พี่ไม่ได้นับเวลา" · EN: "I am not counting the time."
2. ยมทัต: "ถ้าลืมอะไร ไปเอาก่อนก็ได้ ท่าเรือไม่หนีไปไหน" · EN: "If you forgot something, go and fetch it. The harbor is not going anywhere."

### 5.5 บทพูดระหว่างเดินทางไปชายแดน 1-2 (บทคุยสุ่มของยมทัต · ผู้เล่นแตะยมทัตในทีม)
1. ยมทัต: "พ่อไม่เคยชมพี่เหมือนกัน แต่ไม่ใช่เรื่องที่พี่อยากให้น้องจำ" · EN "Father never praised me either. But that is not something I want you to remember."
2. ยมทัต: "ดาบเพลิงของพี่ไม่ร้อนกับคนที่พี่ไม่คิดทำร้าย ไม่ต้องเก็บไว้ห่างตัว" · EN "My flame blade is not hot to anyone I do not mean to hurt. You need not keep your distance."
3. ยมทัต: "แม่นิรา ฝากดูน้องให้ด้วย เขาลืมกินข้าวเวลาทำงานเพลิน" · EN "Miss Nira, please keep an eye on him. He forgets to eat when he is absorbed in work."
4. นิรา: "ค่ะ ท่านคะ ดิฉันจดไว้ในสมุดเล่มเดียวกับแฟ้มค้างแล้วค่ะ" · EN "Yes, sir. I have noted it in the same book as the pending files."
(ข้อ 1 เป็นเกร็ดจาก lore bible "ไม่เคยชมพี่ใหญ่เหมือนกัน" H31 · ตัดได้)

### 5.6 บรรทัดเตือนผู้เล่นเมื่อออกเดินจากท่าเรือก่อนชวนยมทัต (ถ้าผู้เล่นเดินไปชายแดน 1-2 โดยยังไม่คุยกับยมทัต)
- ข้อความ: พี่ชายยังรอท่านอยู่ที่ท่าเรือ ท่านควรคุยกับเขาก่อนออกเดินทางไปดินแดนใหม่ · EN: Your brother is still waiting at the harbor. You should speak with him before you set out for the new land.
- ปุ่ม: รับทราบ · EN: Understood

## 6. ชายแดน 1-2 · ทัณฑสูรถูกพ่อขัง (G21 ช่วงแรก)

ต้นฉบับ: ชายแดนโซน 1-2 ในถ้ำ จะเจอ event บอสชายแดนที่มาบุกเราแล้วแพ้ไป · เมื่อเราปล่อยกลับไปแล้ว จะเจอพ่อของบอสชายแดน จับขังไว้ โดนลงโทษที่ทำงานไม่สำเร็จ

ข้อสมมติ (เลือกแบบปลอดภัย ไม่หยุดงาน · ดูท้ายไฟล์):
- **บิดาของทัณฑสูร** ไม่มีชื่อในต้นฉบับและไม่มีในไฟล์บทเดิม ผมใช้ป้ายผู้พูด **"บิดาของทัณฑสูร"** (EN `Tanthasura's Father`) ไม่ตั้งชื่อเฉพาะ เพื่อไม่ผูกกับตัวละครในตำนานใด · ไม่ต่อสู้ในฉากนี้
- ถือว่ายมทัตอยู่ในทีม (ตามหัวข้อ 5) และใช้ประโยค "ฟังพี่ก่อนครั้งเดียว" จากบทที่ท่าเรือเป็นตัวเดินเรื่อง · ถ้าเล่นทางอื่นที่ยมทัตไม่อยู่ในทีม ไม่มีทางนั้น (ยมทัตต้องร่วมทีมเพื่อไปชายแดน 1-2 ตามต้นฉบับ)
- ทัณฑสูรถูกขังในกรงเหล็กในถ้ำลึก ไม่ใช่การล่ามตรวนเต็มตัว (ตรวนเป็นประเด็นเฉพาะของอากุระในโซน 2)

### 6.1 ลำดับ
1. ออกจากท่าเรือไปชายแดน 1-2 พร้อมยมทัต (บทคุยระหว่างเดิน 5.5) → 2. เข้าถ้ำ ถึงจุดกลางถ้ำ หน้าต่าง NF-1 → 3. คัตซีน `z1-frontier12-father` (3 หน้า) → 4. เดินต่อไปประตูโซน 2 (หัวข้อ 7) → ไม่มีศึกในฉากนี้
- กรงของทัณฑสูรว่างหลังคัตซีนจบ (บิดาลากเขาเข้าไปลึกกว่าเดิม) · ถ้า Toby ไม่อยากทำภาพกรงว่าง ให้ทัณฑสูรหายไปจากถ้ำเฉย ๆ

### 6.2 หน้าต่างแจ้งเตือน
**NF-1 · เสียงจากลึกในถ้ำ**
- หัวข้อ: เสียงโลหะกระทบกันในถ้ำ · EN: Metal Clangs Within the Cave
- ข้อความ: จากลึกเข้าไปในถ้ำมีเสียงเหล็กกระทบกันและเสียงคนพูดต่ำ ๆ ท่านและยมทัตรู้สึกว่าเป็นเสียงที่คุ้นเคย เดินเข้าไปดู
- EN: Deep in the cave, metal rings on metal and a low voice speaks. You and Yomathat feel the sound is familiar. Go in and see.
- ปุ่ม: เดินเข้าไป · EN: Go in

### 6.3 คัตซีน `z1-frontier12-father` (3 หน้า)
```js
'z1-frontier12-father': { title:'ผู้ที่ทำงานไม่สำเร็จ', pages:[
  { title:'กรงเหล็กกลางถ้ำ', line:
    'บรรยาย: ลึกเข้าไปในถ้ำ แสงคบไฟสีส้มส่องให้เห็นกรงเหล็กสนิมที่ตั้งอยู่กลางลานหิน ทัณฑสูรนั่งขัดสมาธิอยู่ข้างใน กระบองหนามถูกวางไว้นอกกรง รอยช้ำเรียงบนไหล่และแขน เขาไม่เงยหน้าเมื่อเห็นยามา\n'
  + 'ทัณฑสูร: "ตัวกระเปี๊ยก ... ไม่ต้องมามอง ข้าไม่ได้ต้องการให้ใครมาเห็น"\n'
  + 'บรรยาย: ร่างสูงใหญ่คลุมเสื้อคลุมยาวสีดำสนิทยืนอยู่ข้างกรง เงาของเขาทอดยาวทับพื้นถ้ำจนเกือบถึงรองเท้าของยามา เขาไม่ได้หันมา' },
  { title:'ข้าไม่เรียกว่าลูก', line:
    'บิดาของทัณฑสูร: "ผู้ที่ถือบัญชีแห่งสุวรรณภูมิ ท่านมาถึงเร็วกว่าที่ข้าคาด ข้าไม่ได้ขวางทางท่าน นี่เป็นเรื่องในบ้านของข้า"\n'
  + 'บิดาของทัณฑสูร: "ข้าส่งเขาไปคุมทัพที่ชายแดนด้วยงานเดียว คือบุกให้สำเร็จ เขากลับมาโดยมีหมายตัดสินในมือ ข้าไม่เรียกผู้ที่ทำงานไม่สำเร็จว่าลูก ข้าเรียกว่าผู้ที่ยังต้องเรียนรู้"\n'
  + 'ยมบาทน้อย: "ท่านครับ เขารับโทษตามหมายครบแล้วครับ การลงโทษซ้ำโดยไม่ผ่านศาล—"\n'
  + 'บิดาของทัณฑสูร: "ไม่ใช่โทษตามหมาย ข้าไม่ได้ลงโทษ ข้าอบรม นี่คือบ้านของข้า ศาลของท่านไม่มีหมายมาถึงที่นี่"' },
  { title:'ครั้งเดียวที่พี่ขอ', line:
    'บรรยาย: ยามาก้าวไปข้างหน้าหนึ่งก้าว ฝ่ามือที่หนักและอุ่นวางลงบนไหล่เขาจากด้านหลัง\n'
  + 'ยมทัต: "น้อง หยุด นี่คือครั้งเดียวที่พี่ขอ"\n'
  + 'ยมบาทน้อย: "พี่ แต่เขา—"\n'
  + 'ยมทัต: "พี่รู้ พี่เห็นเหมือนกัน พี่เติบโตมากับความเข้มงวดแบบนี้ แต่ถ้าน้องก้าวเข้าไปตอนนี้ น้องจะเป็นผู้บุกบ้านเขา ไม่ใช่ผู้ตัดสิน ให้พี่ไปส่งน้องที่ประตูก่อน ที่เหลือพี่จะหาทางเอง"\n'
  + 'ทัณฑสูร: "...ตัวกระเปี๊ยก ไปได้ ข้าไม่ต้องการให้ใครสงสาร"\n'
  + 'บรรยาย: ยามากำหมัดแน่น แล้วคลายออกช้า ๆ เขาหันหลังเดินตามทางที่ยมทัตชี้ นิราเดินเป็นคนสุดท้าย หันไปมองกรงนั้นอีกครั้งก่อนลับโค้งถ้ำ' },
]},
```
EN
```js
Page 1  Narration: Deep in the cave, torchlight shows a rusted iron cage at the centre of a stone yard. Tanthasura sits cross-legged inside, his spiked club laid outside the bars, bruises along his shoulders and arms. He does not look up when he sees Yama.
        Tanthasura: "Little runt ... do not look. I did not ask anyone to come and see."
        Narration: A tall figure in a long jet-black cloak stands beside the cage. His shadow stretches across the cave floor almost to Yama's boots. He does not turn.
Page 2  Tanthasura's Father: "Keeper of the ledger of Suvarnabhumi. You arrived sooner than I expected. I am not blocking your way. This is a matter inside my house."
        Tanthasura's Father: "I sent him to command the army at the frontier with a single task: break through. He came back with a verdict in his hand. I do not call one who fails his task my son. I call him one who has yet to learn."
        Yama: "Sir, he has served his sentence in full. Punishing him again without a court—"
        Tanthasura's Father: "It is not a sentence. I do not punish, I train. This is my house. Your court holds no writ that reaches here."
Page 3  Narration: Yama steps forward once. A heavy, warm hand settles on his shoulder from behind.
        Yomathat: "Brother, stop. This is the one time I ask."
        Yama: "Brother, but he--"
        Yomathat: "I know. I see it too. I grew up under strictness like this. But if you step in now, you are the one who invaded his house, not the judge. Let me take you to the gate first. I will find my own way with the rest."
        Tanthasura: "...Little runt, go. I do not need anyone's pity."
        Narration: Yama clenches his fist, then loosens it slowly. He turns and follows the path Yomathat points out. Nira walks last, looking back at the cage once more before the cave bends out of sight.
```
หมายเหตุ
- ครั้งเดียวที่พี่ขอ = ย้อนกลับไปที่ประโยคที่ท่าเรือ ("ถ้าพี่ห้ามอะไร น้องฟังพี่ก่อนครั้งเดียว") · ถ้าคุณเป้ไม่อยากให้ยมทัตห้าม ตัดหน้า 3 แล้วให้ยามาถูกบิดาไล่ออกจากถ้ำเอง (ดูท้ายไฟล์)
- "พี่เติบโตมากับความเข้มงวดแบบนี้" ตรงกับ lore bible (พ่อของทั้งสองไม่ชมใคร) แต่ไม่เอ่ยชื่อพ่อ จึงไม่ทำให้พญายมบาทกลายเป็นตัวร้าย
- ข้อความนี้ไม่มี [PHANTOM-404] หรือการควบคุมจากภายนอก · บิดาของทัณฑสูรปรากฏเพียงครั้งนี้ในส่วน A

### 6.4 บทคุยทัณฑสูรหลังคัตซีน (ถ้ากรงยังมีทัณฑสูรอยู่ในเกม · ถ้ากรงว่างตัดทั้งหมด)
- ทัณฑสูร: "...ข้าไม่ได้ขอให้ใครช่วย" · EN: "...I did not ask for anyone's help."
- ทัณฑสูร: "ตัวกระเปี๊ยก ถ้าวันหนึ่งท่านอยากรู้ว่าเกียรติของข้ามาจากไหน ข้าไม่เล่า" · EN: "Little runt, if one day you want to know where my pride comes from, I will not tell you."

### 6.5 ภาพที่ต้องวาด (หัวข้อ 6)
ดูตารางภาพ หัวข้อ 11 กลุ่ม E (E1 E2)

## 7. ประตูโซน 2 · กวนอูไม่ให้ผ่าน สู้ → Guard โซน 2 (G11 + G21 ช่วงที่สอง)

ต้นฉบับ: เมื่อเดินไปถึงประตูโซน 2 จะเจอ Guard ของโซน 2 (ปรับเป็น กวนอู) ยืนเฝ้าอยู่ ไม่ให้เราเข้า · ต้องสู้ให้ชนะก่อนเขาถึงยอมรับ ให้ผ่านประตูได้ และได้กวนอูเป็น Guard ของโซน 2 · (คุณเป้ 18 พ.ย.) แทนยักษ์ทวารบาลโซน 2 เดิม

**ข้อควรระวังเนื้อหา:** กวนอูเป็นบุคคลในประวัติศาสตร์จีนที่ได้รับการเคารพบูชาเป็นเทพในศาสนาพื้นบ้านจีน/เต๋า · เขียนด้วยความเคารพ ไม่ล้อ ไม่ให้เป็นตัวร้าย ไม่ให้แพ้แบบเสียศักดิ์ศรี (เขายอมรับผู้เล่นเพราะคำสัตย์ ไม่ใช่เพราะกลัว) · ไม่มีบทที่นำเขาไปเทียบกับศาสนาใดในเชิงลบ **[R] ให้ Reese/chris-culture ตรวจ**

**ข้อสมมติ:** เหตุผลที่กวนอูเฝ้าประตู = เขาเคยเฝ้าเมืองที่เสียไปเพราะผู้อยู่ในเปิดประตูให้ข้าศึก (เค้าโครงจากสามก๊กเรื่องการเสียเมืองเกงจิ๋ว ในรูปเรื่องเล่าย่อที่ไม่ระบุชื่อคนหรือเมือง) จึงยึดคำสัตย์และความไว้ใจเป็นแกนของตัวละคร · ตรงกับ quest เสริม (หัวข้อ 9) เรื่องทหารที่ทิ้งด่าน · ถ้าคุณเป้ไม่ชอบ ใช้เหตุผล "สาบานเฝ้าประตูตามคำของผู้ที่ตนเคารพ" แทนได้ (ตัดประโยคเรื่องเมืองเสีย 2 จุด)

### 7.1 ลำดับ
1. ออกจากชายแดน 1-2 ถึงประตูโซน 2 → 2. หน้าต่าง NG-1 → 3. คัตซีน `z2-guanyu-open` (3 หน้า) → 4. สู้ (ทีม ยามา นิรา ยมทัต · ยมทัตเข้าสู้ตามปกติ หรือยืนข้างสนามถ้า Toby เห็นว่าสมดุลเสีย · บรรทัดสนับสนุนในหัวข้อ 7.4) → 5. ชนะ `z2-guanyu-win` (2 หน้า) + NG-3 → 6. ยมทัตให้ของ (หัวข้อ 8) → 7. กวนอูเป็น Guard โซน 2 ยืนที่ประตู (NG-4)
- แพ้ = ลองใหม่ได้ ไม่เสียอะไร (NG-2 / `z2-guanyu-lose`)
- ในโซน 2 ไม่มีศึกทดสอบยักษ์ทวารบาลอีก

### 7.2 หน้าต่างแจ้งเตือน
**NG-1 · ถึงประตู**
- หัวข้อ: ผู้เฝ้าประตูบูรพา · EN: The Keeper of the Eastern Gate
- ข้อความ: ประตูบูรพามีผู้เฝ้าอยู่ เขายืนหันหน้าเข้าหาท่านและไม่ขยับหลบ ยมทัตกระซิบว่าเขาไม่ฟังคำของใครนอกจากคำสัตย์ของตัวเอง เตรียมทีมให้พร้อม
- EN: The eastern gate has a keeper. He faces you and does not step aside. Yomathat whispers that he listens to no one but his own sworn word. Ready your team.
- ปุ่ม: เข้าไปพบ · EN: Approach

**NG-2 · แบนเนอร์ศึก**
- ศึกประตูบูรพา · กวนอู · EN: Battle at the Eastern Gate · Guan Yu

**NG-3 · ชนะ**
- หัวข้อ: กวนอูยอมรับ · EN: Guan Yu Accepts You
- ข้อความ: กวนอูผู้เฝ้าประตูบูรพายอมรับท่านแล้ว ประตูเปิดให้ท่านผ่าน
- EN: Guan Yu, keeper of the eastern gate, has accepted you. The gate opens.
- ปุ่ม: ต่อ · EN: Continue

**NG-4 · เป็น Guard โซน 2**
- หัวข้อ: กวนอูเป็นผู้เฝ้าด่านบูรพา · EN: Guan Yu Keeps the East for You
- ข้อความ: กวนอูจะยืนเฝ้าด่านบูรพาในนามของท่าน เรียกใช้ได้เหมือนผู้เฝ้าด่านของโซนอื่น เวลาพักระหว่างการเรียกคือ 1 นาที
- EN: Guan Yu will guard the east in your name. Call on him like the gate guards of other zones. The wait between calls is 1 minute.
- ปุ่ม: รับทราบ · EN: Understood
(ตัวเลข 1 นาที ตาม H1 · ป้าย "ผู้เฝ้าด่านบูรพา" ใช้เป็นตำแหน่งรองใต้ชื่อกวนอู · EN `Gate Guard of the East`)

**NG-5 · แพ้ (ลองใหม่)**
- หัวข้อ: กวนอูรอท่านอยู่ · EN: Guan Yu Waits
- ข้อความ: กวนอูลดง้าวลงก่อน ท่านตั้งหลักแล้วลองอีกครั้งได้
- EN: Guan Yu lowers his blade. Steady yourself and try again.
- ปุ่ม: สู้อีกครั้ง · EN: Try again

### 7.3 คัตซีน `z2-guanyu-open` (3 หน้า)
```js
'z2-guanyu-open': { title:'ผู้เฝ้าประตูบูรพา', pages:[
  { title:'ข้าชื่อกวนอู', line:
    'บรรยาย: ประตูไม้แดงบานสูงของบูรพาตั้งตระหง่านอยู่กลางหมอกบาง ๆ หน้าประตูมีชายร่างสูงใหญ่ใบหน้าแดงเข้ม เคราดำยาวเกือบถึงอก สวมเกราะและเสื้อคลุมสีเขียวเข้มลายมังกร มือหนึ่งถือง้าวด้ามยาวปลายโค้งตั้งตรงกับพื้น เขาไม่ขยับแม้ลมจะพัดชายเสื้อคลุม\n'
  + 'กวนอู: "ผู้ถือบัญชีแห่งสุวรรณภูมิ ข้าชื่อกวนอู ข้าเฝ้าประตูบูรพานี้ ผู้ใดจะผ่าน ต้องผ่านข้าก่อน"\n'
  + 'ยมทัต: "กวนอู พี่ขออนุญาตพาน้องชายข้ามผ่านด้วยกัน"\n'
  + 'กวนอู: "ท่านยมทัต ข้าให้เกียรติท่าน แต่ข้าไม่เปิดทางเพราะเกียรติของใคร ข้าเปิดเมื่อข้าเชื่อ"' },
  { title:'ประตูที่ถูกเปิดจากข้างใน', line:
    'กวนอู: "ข้าเคยเฝ้าเมืองหนึ่ง ประตูเมืองไม่เคยถูกบุกจากข้างนอก มันถูกเปิดจากข้างใน โดยคนที่ข้าฝากเมืองไว้ นับแต่นั้นมา ข้าไม่เชื่อสิ่งใดที่ข้ายังไม่เห็น"\n'
  + 'กวนอู: "ท่านถือบัญชีตัดสินวิญญาณ ผู้ที่ถือของหนักเช่นนั้น ต้องมีคำสัตย์ของตนเอง ท่านสาบานสิ่งใดไว้"\n'
  + 'ยมบาทน้อย: "ผมสาบานว่าจะอ่านทุกบรรทัดให้จบก่อนตัดสินครับ ไม่ว่าคนที่ยืนอยู่ตรงหน้าจะเป็นใคร"\n'
  + 'นิรา: "ท่านคะ ดิฉันขอยืนยัน ท่านไม่เคยข้ามบรรทัดสุดท้ายเลยค่ะ"' },
  { title:'จงแสดงให้ข้าเห็น', line:
    'กวนอู: "คำสัตย์ที่ทำได้ทุกวัน เป็นคำสัตย์ที่ดี แต่คำพูดกับมือต่างกัน ข้าเชื่อมือ"\n'
  + 'บรรยาย: กวนอูยกง้าวขึ้นจากพื้นหนึ่งชั่วลมหายใจ เสียงลมแหวกอากาศดังขึ้นก่อนที่ใครจะเห็นใบมีด เขาตั้งท่าแล้ว ยืนนิ่งเหมือนภูเขา\n'
  + 'กวนอู: "ข้าไม่ถือว่าท่านเป็นศัตรู แต่ข้าไม่ลดมือ จงแสดงให้ข้าเห็นว่าคำสัตย์ของท่านหนักแค่ไหน"' },
]},
```
EN
```js
Page 1  Narration: The tall red-lacquered gate of the east stands in a thin haze. Before it waits a tall man with a deep-red face and a black beard falling almost to his chest, in green armour and a dark-green robe patterned with dragons. One hand holds a long-hafted, curve-bladed polearm upright against the ground. He does not stir though the wind lifts the hem of his robe.
        Guan Yu: "Keeper of the ledger of Suvarnabhumi. I am Guan Yu. I keep this eastern gate. Whoever would pass must pass me first."
        Yomathat: "Guan Yu, I ask leave to cross with my younger brother."
        Guan Yu: "Lord Yomathat, I honour you, but I do not open the way for anyone's honour. I open it when I believe."
Page 2  Guan Yu: "I once kept a city whose gates were never broken from outside. They were opened from within, by the man I had left the city in charge of. Since then I have believed nothing I have not seen."
        Guan Yu: "You hold a ledger that judges souls. One who carries so heavy a thing must have his own sworn word. What have you sworn?"
        Yama: "I have sworn to read every line to the end before I judge, no matter who stands before me."
        Nira: "Sir, I can vouch for that. You have never skipped the last line."
Page 3  Guan Yu: "A sworn word that can be kept every day is a good one. But words and hands are not the same. I trust hands."
        Narration: Guan Yu lifts his polearm from the ground for the length of a breath. The whistle of air comes before anyone sees the blade. He has set his stance, still as a mountain.
        Guan Yu: "I do not count you an enemy, but I will not lower my hand. Show me how heavy your sworn word is."
```

### 7.4 บทในฉากสู้ + ท่าไม้ตายกวนอู
- เริ่มสู้ กวนอู: "ข้าไม่ลดมือ เพราะข้าไม่อยากให้ท่านคิดว่าข้าออมแรง"
- เลือดเหลือครึ่ง กวนอู: "ท่านยืนได้นานกว่าที่ข้านึก ฟันที่สองข้าไม่ถอยแล้ว"
- ยมทัต (ถ้าเข้าสู้): "ลุยเลยน้อง พี่อยู่ข้างหลัง"
- EN: Start: "I will not lower my hand, lest you think I held back." · Half HP: "You stand longer than I thought. The second cut I do not pull." · Yomathat: "Go on, brother. I am right behind you."
```js
guanyu:[
  { id:'greenDragonSweep', kind:'groupHit', warn:1, power:.8,
    name:{ th:'ง้าวมังกรเขียวกวาดลาน', en:'Green Dragon Sweep' },
    warnText:{ th:'กวนอูหมุนง้าวช้า ๆ ปลายง้าวเริ่มมีแสงเขียว — รอบหน้าจะกวาดทั้งทีม!', en:'Guan Yu turns his polearm slowly, its tip taking on a green glow — next turn it sweeps the whole team!' },
    useText:{ th:'กวนอู: "ข้ายังไม่ถอย!" แล้วกวาดง้าวผ่านทั้งทีม', en:'Guan Yu: "I do not retreat!" and he sweeps through the whole team' },
    when:{ firstAct:3, everyActs:4 } },
  { id:'oneCutNoRetreat', kind:'heavyHit', warn:1, power:1.8,
    name:{ th:'ฟันเดียวไม่ถอย', en:'One Cut, No Retreat' },
    warnText:{ th:'กวนอูยืนนิ่งและยกง้าวขึ้นเหนือไหล่ — รอบหน้าจะฟันหนักใส่คนเดียว!', en:'Guan Yu stands still and raises his polearm over his shoulder — next turn a heavy cut falls on one of you!' },
    useText:{ th:'กวนอูฟันลงครั้งเดียวด้วยแรงทั้งหมด แล้วตั้งท่าเหมือนเดิม', en:'Guan Yu cuts down once with all his strength, then resumes his stance' },
    when:{ hpBelow:.5, everyActs:3 } },
],
```
(ท่าเป็นง้าวกับการยืนมั่นเท่านั้น ไม่มีบทที่ฟังเป็นการสาปหรือเวทมนตร์ · ตัวเลขให้ Toby จูน)

### 7.5 คัตซีนชนะ/แพ้
```js
'z2-guanyu-win': { title:'กวนอูยอมรับ', pages:[
  { title:'ข้าเห็นแล้ว', line:
    'บรรยาย: กวนอูหยุดง้าวกลางอากาศ ลดปลายลงช้า ๆ แล้วปักด้ามลงที่พื้น เขาประสานมือหน้าอก ก้มศีรษะให้ยามาหนึ่งครั้ง\n'
  + 'กวนอู: "พอแล้ว ข้าเห็นแล้ว ท่านไม่ละคำที่พูดไว้เลยแม้ตอนข้าฟันแรงที่สุด ข้าไม่ยอมรับท่านเพราะข้าแพ้ ข้ายอมรับเพราะท่านไม่ปล่อยมือจากคำสัตย์ของท่าน"' },
  { title:'ข้าจะเฝ้าให้ท่าน', line:
    'กวนอู: "ตั้งแต่วันนี้ ข้าจะเฝ้าประตูบูรพาแทนท่าน ท่านจะเรียกข้าเมื่อใด ข้าจะมา ข้าขอเพียงอย่างเดียว อย่าให้ผู้ใดเปิดประตูนี้จากข้างใน"\n'
  + 'ยมบาทน้อย: "ผมสัญญาครับ"\n'
  + 'บรรยาย: กวนอูถอยไปยืนข้างประตู ใช้ง้าวผลักบานประตูไม้แดงให้เปิดออกเพียงพอให้คนเดินผ่านได้ ลมจากบูรพาพัดเข้ามา กลิ่นไม้ไผ่และดินชื้น' },
]},
'z2-guanyu-lose': { title:'กวนอูรอท่านอยู่', pages:[
  { title:'ลุกเถิด', line:
    'กวนอู: "ลุกเถิด ข้าไม่ฟันผู้ที่ล้ม ตั้งหลักแล้วมาใหม่ ข้ายืนรออยู่ที่ประตู"' },
]},
```
EN
```js
Win 1   Narration: Guan Yu halts his polearm in mid-air, lowers its tip slowly, and plants the haft in the ground. He brings his hands together before his chest and bows once to Yama.
        Guan Yu: "Enough. I have seen. You did not let go of your word even when I struck hardest. I do not accept you because I lost. I accept you because you did not drop your oath."
Win 2   Guan Yu: "From today I will keep the eastern gate for you. Whenever you call, I will come. I ask only one thing: let no one open this gate from within."
        Yama: "I promise."
        Narration: Guan Yu steps to the side of the gate and pushes the red doors open just wide enough for a person to pass with the haft of his polearm. A wind from the east blows in, smelling of bamboo and damp earth.
Lose    Guan Yu: "Rise. I do not strike one who has fallen. Steady yourself and come again. I stand waiting at the gate."
```

## 8. ยมทัตให้เสื้อผ้า+เงิน ออกจากทีม · ตัวอัญเชิญที่ 3: ยมทัต (G21 ช่วงท้าย + G30)

ต้นฉบับ: เมื่อชนะกวนอู พี่ชาย ยมทัต ก็จะมอบเสื้อผ้าและเงินก่อนเข้าประตูไป · ยมทัตจะออกจากทีมไป แต่สามารถอัญเชิญได้ · (ต้นฉบับตัวอัญเชิญ) ยมทัต อัญเชิญได้หลังจากที่ยมทัตพายามา นิรา ไปส่งที่ประตูโซน 2

ค่าเดิมที่ย้ายมา: เงิน **800 เบี้ยกรรม** + **ชุดประจำดินแดนใหม่** (ตามข้อความ "ของฝาก" ของ boss-guide เดิม · z2 หัวข้อ 5.6) · ชุดโซน 2 = ชุดกิโมโนลายซากุระสีแดงที่ Toby มีอยู่แล้ว (ไม่ต้องวาดชุดใหม่)

### 8.1 ลำดับ
`z2-guanyu-win` (ประตูเปิด) → `z2-yomathat-gift` (คัตซีน 3 หน้า) → NY-3 (ได้ของ) → NY-4 (ออกจากทีม + ได้ตัวอัญเชิญ) → ยามาและนิราเดินเข้าประตูโซน 2 ลำพัง

### 8.2 หน้าต่างแจ้งเตือน
**NY-3 · ได้ของ**
- หัวข้อ: ของฝากจากพี่ชาย · EN: A Gift from Your Brother
- ข้อความ: ยมทัตมอบชุดประจำบูรพาและเงิน 800 เบี้ยกรรมให้ยามา
- EN: Yomathat gives Yama the eastern robes and 800 karma coins.
- ปุ่ม: ขอบคุณ · EN: Thank him

**NY-4 · ออกจากทีม ฝากไฟไว้**
- หัวข้อ: ยมทัตฝากไฟไว้ในตะเกียง · EN: Yomathat Leaves a Flame in the Lamp
- ข้อความ: ยมทัตออกจากทีมเพราะสาขาบูรพาไม่ใช่เขตของเขา เขาฝากไฟไว้ในตะเกียงวิเศษ ท่านเรียกเขาในศึกได้ ท่าไม้ตายใช้ได้ 3 ครั้งก่อนต้องเติมพลังที่หอกระจก
- EN: Yomathat leaves the team because the eastern branch is not his jurisdiction. He leaves a flame in the Magic Lamp. You can call him in battle, 3 special moves before a recharge at the Mirror Tower.
- ปุ่ม: ดูตะเกียง · EN: See the Lamp

### 8.3 คัตซีน `z2-yomathat-gift` (3 หน้า)
```js
'z2-yomathat-gift': { title:'ของฝากจากพี่', pages:[
  { title:'ก่อนเข้าประตู', line:
    'บรรยาย: ประตูแดงบานสูงเปิดออกครึ่งหนึ่ง ลมกลิ่นไผ่พัดผ่านช่องว่าง ยมทัตหยิบห่อผ้าและถุงเงินใบเล็กออกมาจากอกเสื้อ ยื่นให้ยามาด้วยสองมือ\n'
  + 'ยมทัต: "ชุดบูรพาของน้อง พี่เตรียมไว้ตั้งแต่ก่อนศึก กับเงินแปดร้อยเบี้ย ที่นั่นไม่มีใครรู้จักน้อง น้องต้องซื้อทุกอย่างด้วยมือตัวเอง"\n'
  + 'ยมบาทน้อย: "พี่ ผมไม่ได้ขอ—"\n'
  + 'ยมทัต: "ไม่ต้องขอ พี่ให้"' },
  { title:'ที่นี่ไม่ใช่เขตพี่', line:
    'ยมทัต: "พี่ไปต่อไม่ได้ น้องจำเรื่องสาขาได้ใช่ไหม ผู้ตรวจการมีเขตที่ตนดูแล บูรพาเป็นเขตอื่น ถ้าพี่เดินเข้าไป พี่จะกลายเป็นผู้บุกรุกในสายตาคนที่นั่น"\n'
  + 'ยมทัต: "พี่ต้องกลับไปรายงานพ่อ ตรวจสาขา และเรื่องทัณฑสูรที่ถ้ำนั้น พี่ยังไม่ลืม พี่จะหาทางเอง ตามที่บอกไว้"\n'
  + 'นิรา: "ดิฉันจะดูแลท่านยมบาทน้อยให้ค่ะ ท่านยมทัต"\n'
  + 'ยมทัต: "ฝากด้วย แม่นิรา"' },
  { title:'เรียกพี่เมื่อต้องการ', line:
    'บรรยาย: ยมทัตวางฝ่ามือเหนือตะเกียงวิเศษที่ห้อยข้างเอวยามา เปลวสีแดงส้มของดาบเพลิงไหลลงมาจากข้อมือ จุดไส้ตะเกียงอีกดวงหนึ่ง เปลวสีแดงนิ่งสนิท ไม่ร้อนกับมือใครเลย\n'
  + 'ยมทัต: "น้องไปที่ใด พี่ไปไม่ได้ แต่ถ้าน้องจุดตะเกียงนี้แล้วเรียกพี่ พี่จะมา ไม่ว่าน้องจะอยู่ที่ใดของเมืองนรก"\n'
  + 'ยมทัต: "ไปเถอะ พี่ไม่ได้ลาเพราะเราจะไม่เจอกันอีก พี่ลาเพราะมีงานต้องทำ"\n'
  + 'ยมบาทน้อย: "ครับพี่ ผมจะใช้อย่างระวัง"\n'
  + 'บรรยาย: ยามากับนิราเดินผ่านประตูเข้าสู่บูรพา ยมทัตยืนมองตามจนประตูแดงปิดลงช้า ๆ ด้านหลังทั้งสอง' },
]},
```
EN
```js
Page 1  Narration: The tall red gate stands half open, a wind scented with bamboo passing through the gap. Yomathat takes a bundle of cloth and a small purse from inside his coat and hands them to Yama with both hands.
        Yomathat: "Your eastern robes. I prepared them before the battle. And eight hundred coins. No one there knows you. You will have to buy everything with your own hands."
        Yama: "Brother, I did not ask--"
        Yomathat: "You do not have to ask. I am giving."
Page 2  Yomathat: "I cannot go on. You remember how the branches work, yes? An inspector has the district he watches. The east is another district. If I walk in, I become a trespasser in their eyes."
        Yomathat: "I have to go back and report to Father, inspect the branch, and the matter of Tanthasura in that cave. I have not forgotten it. I will find my own way, as I told you."
        Nira: "I will look after Lord Yama, Lord Yomathat."
        Yomathat: "I leave him to you, Miss Nira."
Page 3  Narration: Yomathat lays his palm over the Magic Lamp at Yama's side. The red-orange flame of his blade pours from his wrist and lights another wick. The red flame stays perfectly still, and burns no one's hand.
        Yomathat: "Wherever you go, I cannot follow. But if you light this lamp and call me, I will come, wherever in the underworld you are."
        Yomathat: "Go. I am not saying goodbye because we will never meet again. I am saying it because I have work to do."
        Yama: "Yes, brother. I will use it carefully."
        Narration: Yama and Nira walk through the gate into the east. Yomathat watches until the red doors slowly close behind them.
```
หมายเหตุ
- ยมทัตออกจากทีมเพราะ "เขตสาขา" (ตรงกติกาที่ lore bible A2: ยมทูตเป็นคนของสาขา) ไม่ใช่เพราะขัดแย้ง
- กวนอูไม่อัญเชิญ จึงไม่มีบทอัญเชิญของกวนอู · ถ้าคุณเป้ต้องการ กวนอูเป็นตัวอัญเชิญได้ ให้แจ้ง Rae เพิ่มท่าไม้ตาย (ดูท้ายไฟล์)

### 8.4 ตัวอัญเชิญที่ 3 · ยมทัต (ปลดล็อก: จบ `z2-yomathat-gift` · NY-4)
| ฟิลด์ | TH | EN |
|---|---|---|
| ชื่อ | ยมทัต | Yomathat |
| ท่าไม้ตาย | **ดาบเพลิงคุ้มน้อง** | **Flame Blade, Brother's Guard** |
| คำบรรยายท่า | ยมทัตชักดาบเพลิงฟันเดี่ยวหนักใส่ศัตรูตัวหนึ่ง แล้วยืนบังหน้าทีม ลดความเสียหายที่ทีมได้รับ 1 รอบ | Yomathat cuts one foe with a heavy flame-blade strike, then stands before the team, reducing the damage they take for one round. |
| ชนิดท่า (ข้อเสนอ) | ตีเดี่ยวแรง + ลดดาเมจทีม 1 รอบ | Heavy single hit plus team damage reduction for one round |
| บรรทัดตอนอัญเชิญ | ยมทัต: "น้อง พี่มาแล้ว หลบหลังพี่" | Yomathat: "Brother, I am here. Get behind me." |
| บรรทัดตอนใช้ท่า | ยมทัต: "พี่ไม่ออมมืออีกแล้ว!" | Yomathat: "I will not hold back any more!" |
| บรรทัดตอนจบท่า | ยมทัต: "ไฟพี่เหลือเท่านี้ ดูแลตัวเอง" | Yomathat: "That is all my flame allows. Look after yourself." |
- ชื่อท่าไม่ซ้ำ "ดาบเพลิงพี่ใหญ่" (ท่าบอสในไฟล์ boss-skills) · บรรทัด "ไม่ออมมืออีกแล้ว" ดึงจากท่าที่สองของบอสยมทัตเดิม จึงเป็นเสียงเดียวกัน

## 9. Quest เสริมกวนอู · ทหารผู้หนีทัพ (G11 · ฉบับกวนอู แทนบท Guard ของ `deserter`)

ต้นฉบับ: "ขอปรับเนื้อเรื่อง quest เสริมเพิ่มด้วย น่าจะใกล้เคียงกัน" · quest เดิมของ Guard โซน 2 คือ **คดีญาติข้อ 1 ทหารผู้หนีทัพ** (z2 หัวข้อ 7.2) ที่ Guard พูดบทก่อน/ระหว่าง/หลังคดี · ส่วนนี้ **คงตัวสำนวนคดี `deserter` ตาม z2 หัวข้อ 7.2 ทุกอย่าง** (face / seen / hidden / merits / claims) แก้เฉพาะ `line` และเปลี่ยนผู้พูดจากยักษ์ทวารบาลเป็นกวนอู พร้อมเติมบทรับ quest และบทจบ (เพื่อให้เป็น quest ครบวงจร)

**ข้อควรระวังเนื้อหา:** กวนอูไม่ใช่ผู้ที่ถูกวิจารณ์ในเรื่องนี้ · เรื่องที่เขาเรียนรู้คือ "ผู้ที่ทิ้งด่านเพราะลูกป่วย" กับ "ผู้ที่เปิดประตูให้ข้าศึก" ไม่ใช่คนเดียวกัน · ไม่ตัดสินความผิดของบุคคลในประวัติศาสตร์จริงที่อยู่เบื้องหลังเรื่องเมืองเสีย (ไม่ระบุชื่อ)

### 9.1 ลำดับ (4 ขั้น แบบ `SIDE_CONTENT`)
1. คุยกับกวนอูหลังเป็น Guard (รับเรื่อง) → 2. คดีทหารผู้หนีทัพขึ้นคิว (NQ-1) เมื่อถึงจำนวนคดีที่ Toby กำหนด (ตำแหน่งเดียวกับ `deserter` เดิม ไม่ผูกกับการจ้าง) → 3. บทคดีญาติ (ก่อน/ระหว่าง/หลังตัดสิน + ตัวเลือก) → 4. คุยกับกวนอูอีกครั้ง (ปิดเรื่อง · รางวัล)
- ระดับรางวัลเสนอ: `hard` เหมือนภารกิจข้างอื่น ไม่มีท่าไม้ตายใหม่ · เป็นของที่ Toby เลือกตามตารางรางวัล (ไม่ใช่ตัวอัญเชิญ เพราะกวนอูไม่อยู่ในรายชื่ออัญเชิญ)

### 9.2 ขั้น 1 · รับเรื่อง (คุยกับกวนอูที่ประตูบูรพา)
**TH**
- กวนอู: "ท่านผู้ถือบัญชี ข้ามีเรื่องจะขอ ข้าไม่ชอบขอ แต่เรื่องนี้ข้าขอ"
- กวนอู: "ข้าเคยมีทหารร่วมกองคนหนึ่งที่หายไปในคืนก่อนศึกสุดท้าย ข้าโกรธเขามายี่สิบปี ข้าบอกตัวเองว่านั่นคือการทิ้งด่าน เท่ากับเปิดประตูให้ข้าศึก ข้าไม่เคยถามว่าเขาไปไหน"
- กวนอู: "ถ้าวิญญาณของเขามาถึงคิวของท่าน ข้าไม่ขอให้ท่านตัดสินเบาหรือหนัก ข้าขอเพียงให้ท่านอ่านบรรทัดสุดท้ายให้จบ และให้ข้ายืนฟังอยู่ข้างแท่น"
**EN**
- Guan Yu: "Keeper of the ledger, I have a request. I dislike making requests, but I make this one."
- Guan Yu: "I once had a comrade in my unit who vanished the night before the final battle. I have been angry at him for twenty years. I told myself it was desertion of the post, the same as opening the gate to the enemy. I never asked where he had gone."
- Guan Yu: "If his soul reaches your queue, I do not ask you to judge him lightly or harshly. I ask only that you read the last line to the end, and let me stand beside the dais and listen."

### 9.3 ขั้น 2 · หน้าต่างแจ้งเตือน (แทน N7K-5 ของเดิม)
**NQ-1**
- หัวข้อ: ทหารเก่าของกวนอู · EN: Guan Yu's Old Comrade
- ข้อความ: วิญญาณดวงหนึ่งในคิวคืออดีตทหารร่วมกองของกวนอู เขาหนีทัพในคืนสุดท้ายของศึก กวนอูจำเขาได้และขอพบท่านก่อนเริ่มคดี
- EN: One soul in the queue is a former comrade of Guan Yu's, who deserted on the last night before the final battle. Guan Yu recognises him and asks to speak with you before the hearing.
- ปุ่ม: ฟังกวนอู · EN: Hear Guan Yu

### 9.4 ขั้น 3 · แก้ไขสำนวนคดี `deserter` (เฉพาะ `line`) และบทคดีญาติ
`line` เดิม: "ข้าหนีจริงท่าน ข้าไม่เคยเถียง แต่ข้าวิ่งออกทางประตูหลัง เพราะข้ากลัวเจอยักษ์ที่ยืนเฝ้าประตูหน้า กลัวเขาถามว่าจะไปไหน"
**`line` ใหม่:** "ข้าหนีจริงท่าน ข้าไม่เคยเถียง แต่ข้าวิ่งออกทางประตูหลัง เพราะข้ากลัวเจอท่านกวนอูที่ยืนเฝ้าประตูหน้า กลัวเขาถามว่าจะไปไหน"
(ส่วนอื่นของสำนวน `deserter` ใน z2 หัวข้อ 7.2 ใช้ตามเดิม ไม่แก้)

**บทคดีญาติ (KIN) · กวนอู**
- ช่วงก่อนขึ้นแท่น
  - กวนอู: "ท่านอย่าเพิ่งมองว่าข้านิ่ง ข้าแค่สงบ มือข้าไม่สั่นแม้ในศึก แต่วันนี้สั่น คนที่กำลังจะขึ้นแท่นเคยนอนข้างข้าในค่ายสามปี เขาเป็นคนที่ข้าไว้ใจให้ถือกุญแจประตูหลังค่าย"
  - กวนอู: "ข้าไม่ขอให้ท่านเบา ไม่ขอให้ท่านหนัก ข้าโกรธเขามายี่สิบปี ข้าไม่ไว้ใจความโกรธของข้าเองแล้ว ท่านตัดสินเอง ข้าขอยืนข้างแท่นเงียบ ๆ ได้ไหม"
  - EN: Guan Yu: "Do not mistake me for unmoved. I am only calm. My hands did not shake even in battle, but today they do. The man about to take the dais slept beside me in camp for three years. He was the one I trusted with the key to the back gate of the camp." / "I do not ask you to be lenient or harsh. I have been angry at him for twenty years, and I no longer trust my own anger. You judge. May I stand beside the dais in silence?"
- ช่วงระหว่างไต่สวน
  - กวนอู: "เสบียงเช้าวันนั้นหายไปจริง ข้ากับเพื่อนอีกสามคนกินน้ำเปล่ากับรากไม้เฝ้าประตูหน้า ข้าไม่ได้พูดเพื่อให้ท่านหนักมือ ข้าพูดเพราะข้าไม่อยากโกหกตัวเอง"
  - กวนอู: "เรื่องลูกสาวเขา ข้าไม่เคยถาม เพราะข้ากลัวคำตอบ ถ้าเขามาบอกข้าคืนนั้น ข้าอาจเปิดประตูหลังให้เขาเองก็ได้"
  - EN: "The supplies that morning were truly gone. Three comrades and I kept the front gate on plain water and roots. I do not say it to make you harsher. I say it because I will not lie to myself." / "About his daughter, I never asked, because I feared the answer. If he had told me that night, I might have opened the back gate for him myself."
- ช่วงหลังตัดสิน
  - กวนอู: "ท่านตัดสินแล้ว ข้าขอยืนหน้าเขาสักครู่ได้ไหม ข้าขอพูดแค่ชื่อของเพื่อนสามคนที่ไม่ได้กลับมา"
  - EN: "You have ruled. May I stand before him for a moment? I want to speak only the names of the three comrades who did not come back."
- ทางเลือก: **[ให้กวนอูเอ่ยชื่อเพื่อนสามคนให้เขาฟัง]** EN [Let Guan Yu speak the three names] / **[ให้กวนอูยืนเงียบจนเขาผ่านประตูไป]** EN [Let Guan Yu stand silent until he passes the gate]
  - (เอ่ยชื่อ) บรรยาย: กวนอูเอ่ยสามชื่อช้า ๆ ชายผู้หนีทัพหลับตา · ทหารเก่า: "ข้าจำได้ทุกชื่อ" · กวนอู: "ข้ารู้ว่าเจ้าจำได้ ข้าไม่ยกโทษให้เจ้าวันนี้ แต่ข้าไม่ลืมที่เจ้าส่งเงินให้บ้านพวกเขา ข้าเห็นหมด"
    EN: Narration: Guan Yu speaks the three names slowly. The deserter closes his eyes. · Old comrade: "I remember every name." · Guan Yu: "I know you do. I do not forgive you today, but I do not forget that you sent money to their homes. I saw it all."
  - (ยืนเงียบ) บรรยาย: ชายผู้หนีทัพก้มศีรษะต่ำที่สุดเท่าที่เคยก้ม · กวนอู: "ข้าไม่มีคำพูดให้เขาวันนี้ แต่ข้ายืนอยู่ตรงนี้ เขารู้ว่าข้ายังอยู่"
    EN: Narration: The deserter bows lower than he has ever bowed. · Guan Yu: "I have no words for him today. But I stand here. He knows I am still here."

### 9.5 ขั้น 4 · ปิดเรื่อง (คุยกับกวนอูหลังตัดสิน)
**TH**
- กวนอู: "ท่านอ่านบรรทัดสุดท้ายจริง ข้าเพิ่งเข้าใจว่าข้าเหมารวมผู้ที่ทิ้งด่านทุกคนไว้ในกล่องเดียวกับผู้ที่เปิดประตูให้ข้าศึก ทั้งที่คนที่หนีเพราะลูกป่วยกับคนที่เปิดประตูเพราะผลประโยชน์ไม่ใช่คนเดียวกัน"
- กวนอู: "ข้าไม่สาบานว่าจะไม่โกรธอีก ข้าสาบานว่าจะถามก่อนโกรธ ท่านถือคำสัตย์ของท่าน ข้าถือคำสัตย์ของข้า"
**EN**
- Guan Yu: "You did read the last line. I only now understand that I put everyone who left a post in the same box as the one who opens the gate to the enemy. A man who runs because his child is ill and a man who opens the gate for profit are not the same."
- Guan Yu: "I do not swear that I will never be angry again. I swear that I will ask before I am angry. You keep your sworn word. I keep mine."
- รางวัล: ตามระดับ `hard` ของตารางรางวัล (Toby เลือก) + ข้อความรับรางวัล: ได้ **"ตราประจำกองของกวนอู"** (ไอเท็มเรื่องราว ไม่มีผลต่อสถิติ ถ้า Toby ไม่มีที่ใช้ เปลี่ยนเป็นเบี้ยกรรมได้) · EN `Guan Yu's Unit Badge`
  - คำอธิบายไอเท็ม TH: ตราไม้เก่าประจำกองของกวนอู เขามอบให้เพื่อขอบคุณที่ท่านอ่านจนถึงบรรทัดสุดท้าย · EN: An old wooden badge from Guan Yu's unit, given in thanks for reading to the last line.

## 10. คนพายเรือ + quest "เพลงเรือท่อนสุดท้าย" (G8)

ต้นฉบับ: "ควรวาดตัวละคร คนพายเรือ และเพิ่มเนื้อเรื่อง quest ของคนพายเรือด้วย" (เกี่ยวกับ Fast travel · ท่า ยามา/นิรา กระโดดลงเรือและนั่งบนเรือเป็นงานวาดแยก G7 ไม่อยู่ในไฟล์นี้)

### 10.1 ตัวละคร [เสนอ · เรื่องแต่งของเกม]
| ฟิลด์ | ข้อมูล |
|---|---|
| ชื่อ | **ลุงแจว** · EN **Lung Chaew** ("ลุง" + "แจว" = พายเรือแบบไทยที่ยืนท้ายเรือ) · ชื่อสำรอง: ตาพาย · ลุงเรือ · ให้คุณเป้เลือก |
| หน้าตา | ชายสูงวัย ผิวคล้ำจากแดด ผมหงอกรวบ นุ่งโจงกระเบนสีน้ำเงินเก่า สวมงอบสานจากใบลาน ยืนท้ายเรือไม้ถือไม้แจวยาว ไม่เคยลงจากเรือ |
| นิสัย | พูดช้า เสียงแหบเหมือนเสียงน้ำ ไม่ถามชื่อใคร ไม่ขอค่าโดยสารเป็นคำพูด แต่ตาไวต่อทุกอย่างบนผิวน้ำ |
| ที่มา (เหมือนลูกทีมคนอื่นใน lore bible: วิญญาณที่รับ "วาระรับใช้") | ในชาติก่อนเป็นคนแจวเรือรับจ้างข้ามคลอง ภรรยาร้องเพลงเรือให้ฟังทุกค่ำตอนเขาแจวกลับบ้าน วันสุดท้ายเขาเหนื่อยจนบอกให้เธอเงียบ เธอหยุดร้องกลางเพลง คืนนั้นเธอหลับไปไม่ตื่น เขาจึงไม่เคยฟังท่อนสุดท้ายจนจบ · ไม่มีบาปหนัก · มารับงานพายเรือที่นี่เพื่อ "ฟังเพลงให้จบสักครั้ง" |
| ที่ยืน | ท้ายเรือที่จอดท่าเรือทุกโซน (ตัวเดียวกันทุกท่า · ไม่ลงจากเรือ) |
| ธีมที่เชื่อมกับเกม | "อ่านบรรทัดสุดท้ายให้จบ" ของนิรา/กานต์ · เป็นเรื่องเล็กที่ไม่ผูกกับเรื่องหลัก [PHANTOM-404] |
**[R]** เพลงเรือไทย (เพลงเรือ) เป็นประเพณีร้องโต้ตอบในหน้าน้ำ เนื้อเพลงในไฟล์นี้เป็นของแต่งขึ้นใหม่ ไม่ได้ยกจากเพลงเรือเก่า (Reese 1.10: ผ่าน · ค้นจำกัด) · **ตัดสินแล้ว (Rae 19 พ.ย.):** เพลงนี้เป็นเพลงที่ภรรยาของลุงแจวร้อง **คนเดียว** ไม่ใช่เพลงเรือโต้ตอบตามประเพณี · ในเกมคำว่า "เพลงเรือ" หมายถึง "เพลงที่ร้องกันบนเรือของสองคนนี้" เท่านั้น ห้ามใส่ข้อความหรือคำอธิบายในเกมที่อ้างว่าเป็นเพลงเรือไทยตามประเพณี

### 10.2 บรรทัดบนเรือ (ใช้ตอน Fast travel · ข้อความลอยสั้น ไม่ใช่คัตซีน · สุ่มหนึ่งบรรทัดต่อช่วง)
**ครั้งแรกที่นั่งเรือ (1 ครั้ง · 1 หน้า)**
- ลุงแจว: "ขึ้นมาเถิด ข้าไม่ถามชื่อใคร ท่านก็ไม่ต้องถามชื่อข้า เรียกลุงแจวก็พอ น้ำสายนี้ไปได้ทุกท่า ท่านนั่งเฉย ๆ ข้าพาไปเอง"
- EN: Lung Chaew: "Climb aboard. I do not ask anyone's name, and you need not ask mine. Call me Uncle Chaew. This river reaches every harbor. Sit still and I will take you."
**ขึ้นเรือ (สุ่ม 3)**
1. "ขึ้นเถิด น้ำสงบอยู่" · EN "Come aboard. The water is calm."
2. "นั่งให้มั่น ข้าไม่แจวเร็ว แต่ไม่เคยพลาดท่า" · EN "Sit steady. I do not row fast, but I never miss a landing."
3. "ท่านอยากไปท่าไหนก็บอก ข้ารู้ทางทุกสาย" · EN "Tell me which harbor. I know every channel."
**กลางทาง (สุ่ม 3)**
1. "น้ำนี้ไม่ย้อนทิศ เหมือนวาระที่ผ่านไป" · EN "This water does not flow backward, like terms already served."
2. "ข้าได้ยินเสียงเพลงมากับน้ำบางคืน ฟังไม่ชัด แต่ไม่ใช่เสียงใครที่ข้ารู้จัก" · EN "Some nights I hear a song on the water. I cannot make it out, but it is no one I know."
3. "นิราเงียบจังนะ แม่นางอ่านน้ำอยู่หรือ" · EN "Miss Nira is quiet. Are you reading the water?" · นิรา: "ดิฉันนับระลอกค่ะ" · EN Nira: "I am counting ripples."
**ถึงท่า (สุ่ม 3)**
1. "ถึงแล้ว ลงเถิด ข้ารออยู่ตรงนี้" · EN "We have arrived. Step off. I will be waiting here."
2. "ขอบใจที่ไม่ถามอะไรข้า" · EN "Thank you for not asking me anything."
3. "ท่านกลับมาเมื่อไหร่ ข้าก็อยู่ที่นี่" · EN "Whenever you come back, I will be here."

### 10.3 Quest "เพลงเรือท่อนสุดท้าย" · EN *The Last Verse of the Boat Song*
- คีย์เสนอ: `sqBoatman` · ปลดล็อก: **หลังนั่งเรือครั้งที่ 2** (หลังเปิดโซน 2 แล้ว เพราะเรือวิ่งระหว่างโซนได้เมื่อมีสองโซน · Toby ยืนยันเงื่อนไขจริงของ Fast travel) · อ่านรู้เรื่องแม้ไม่เคยทำ quest อื่น
- ความยาว 4 ขั้น ไม่มีศึก · ระดับรางวัลเสนอ `normal` · **ต้องเสร็จก่อนโซน 3–4 ไม่ได้บังคับ** (ทำได้เฉพาะโซน 1–2 · ไม่ต้องรอท่าเรือโซน 3–4 เพื่อไม่ให้ quest ถูกตัดหลังโซน 4 ถูกยึด)

**เนื้อเพลง (ของแต่งขึ้น · ภรรยาของลุงแจวร้องคนเดียว ไม่ใช่เพลงเรือโต้ตอบตามประเพณี · 3 บท บทละ 2 วรรค)**
| บท | TH | EN | ใครจำได้ |
|---|---|---|---|
| 1 | น้ำเอ๋ยน้ำไหล ไม่เคยย้อนหลังกลับมา / เรือเอ๋ยเรือลอย ไม่เคยหลงทางกลับบ้าน | Oh water, flowing water, never turning back. / Oh boat, drifting boat, never lost on the way home. | ลุงแจวจำได้เอง |
| 2 | ฝั่งเอ๋ยฝั่งไกล ใจไม่ไกลจากกัน / มีคนนั่งรอท่า แม้ฟ้ามืดค่ำลง | Oh shore, far shore, the heart is not far from you. / Someone sits waiting at the landing, though the sky turns dark. | เสียงที่ปลายท่าเรือโซน 1 |
| 3 | ถึงฝั่งเอ๋ยถึงฝั่ง จงวางพายอย่าหันหลัง / ขอบใจผู้ที่ฟังจนจบบทเพลง | Oh landing, you have reached the landing. Lay down the oar and do not look back. / Thank you, whoever listened to the end of the song. | เสียงที่ปลายท่าเรือโซน 2 |

**ขั้น 1 · รับเรื่อง (เมื่อถึงท่าหลังนั่งเรือครั้งที่ 2 · ลุงแจวเรียกให้หยุด)**
TH
- ลุงแจว: "ท่านผู้ถือบัญชี ข้าไม่ชอบขอ แต่ท่านนั่งเรือข้ามาสองหนแล้ว ข้ามีเรื่องจะบอก"
- ลุงแจว: "เมียข้าร้องเพลงเรือให้ข้าฟังทุกค่ำ วันสุดท้ายข้าเหนื่อย ข้าบอกให้เธอเงียบ เธอหยุดร้องกลางเพลง คืนนั้นเธอไม่ตื่นอีก ข้าจำได้แค่ท่อนแรก ท่อนอื่นข้าไม่เคยฟังจนจบ"
- ลุงแจว: "บางคืนมีเสียงเพลงลอยมากับน้ำ ท่อนที่ข้าไม่เคยได้ยิน ข้าไปตามฟังไม่ได้ เพราะข้าลงจากเรือไม่ได้ ท่านไปฟังแทนข้าได้ไหม ที่ปลายท่าของแต่ละโซน"
EN
- Lung Chaew: "Keeper of the ledger, I do not like asking. But you have ridden my boat twice now, and I have something to tell you."
- Lung Chaew: "My wife sang me the boat song every evening. On the last day I was tired and told her to be quiet. She stopped in the middle of the verse. That night she did not wake again. I remember only the first verse. The rest I never listened to the end of."
- Lung Chaew: "Some nights a song drifts over the water, the part I never heard. I cannot follow it, because I cannot leave the boat. Will you go and listen in my place, at the end of the landing in each zone?"
- บันทึกใน quest log: "ฟังเสียงเพลงที่ปลายท่าเรือโซน 1 และโซน 2 · 0/2" · EN "Listen to the song at the end of the landing in Zone 1 and Zone 2 · 0/2"

**ขั้น 2 · ฟังที่ปลายท่า (ผู้เล่นเดินไปจุดปลายท่าแต่ละโซน กด "ฟังเสียงน้ำ")**
- ปุ่ม: ฟังเสียงน้ำ · EN Listen to the Water
- โซน 1 (บทที่ 2) TH: บรรยาย: ลมเย็นพัดผ่านปลายท่า เสียงน้ำกระทบเสาไม้เบาลง ใต้เสียงน้ำมีเสียงผู้หญิงร้องแผ่ว ๆ เป็นทำนองเพลงเรือ: "ฝั่งเอ๋ยฝั่งไกล ใจไม่ไกลจากกัน / มีคนนั่งรอท่า แม้ฟ้ามืดค่ำลง" แล้วเสียงก็จางหาย · นิรา: "ดิฉันจดทำนองไว้แล้วค่ะ ท่านคะ"
  EN: Narration: A cool wind crosses the end of the landing. The sound of water on the wooden posts softens, and beneath it a woman's voice sings faintly in the tune of a boat song: "Oh shore, far shore, the heart is not far from you. / Someone sits waiting at the landing, though the sky turns dark." Then it fades. · Nira: "I have noted the melody, sir."
- โซน 2 (บทที่ 3) TH: บรรยาย: ที่ปลายท่าบูรพา โคมแดงเล็กลอยเอื่อยอยู่กลางน้ำ เสียงผู้หญิงคนเดิมร้องต่อจากที่ฟังมา: "ถึงฝั่งเอ๋ยถึงฝั่ง จงวางพายอย่าหันหลัง / ขอบใจผู้ที่ฟังจนจบบทเพลง" เสียงหยุดตรงคำสุดท้าย แล้วโคมแดงดับไป · ยมบาทน้อย: "เธอร้องจบแล้วครับ"
  EN: Narration: At the end of the eastern landing, a small red lantern drifts out on the water. The same woman's voice picks up where it left off: "Oh landing, you have reached the landing. Lay down the oar and do not look back. / Thank you, whoever listened to the end of the song." The voice stops on the last word, and the red lantern goes dark. · Yama: "She has finished."
- ห้ามบอกว่าเสียงนี้คือภรรยาของลุงตรง ๆ ในบท (ให้ผู้เล่นตีความเอง) · NB-2 ใช้ตอนได้แต่ละบท

**ขั้น 3 · ร้องให้ลุงแจวฟัง (กลับไปคุยที่ท่าเมื่อได้ครบสองบท)**
TH
- ลุงแจว: "ท่านได้ยินแล้วหรือ ช้า ๆ ข้าไม่เคยร้อง ท่านร้องให้ข้าฟังได้ไหม"
- บรรยาย: ยามาและนิราร้องเนื้อสองบทสุดท้ายเบา ๆ นิราจดทำนองไว้ ยามาจำเนื้อได้ ลุงแจวยืนท้ายเรือนิ่ง ไม้แจวหยุดกลางอากาศ ก่อนเริ่มร้องบทที่หนึ่งเสียงแหบ แล้วต่อสองบทที่ฟังมา ร้องจนจบ น้ำใต้เรือสงบเหมือนกระจก
- ลุงแจว: "...จบแล้ว ข้าฟังจนจบแล้ว ขอบใจนะ ข้าไม่ถามชื่อท่าน แต่ข้าจะจำท่านไว้"
EN
- Lung Chaew: "You heard it? Slowly. I have never sung. Will you sing it for me?"
- Narration: Yama and Nira sing the last two verses softly. Nira has jotted the melody and Yama remembers the words. Lung Chaew stands still at the stern, his oar halting in mid-air, then begins the first verse in a rasping voice and carries on into the two verses he has heard, singing until the end. The water under the boat is smooth as glass.
- Lung Chaew: "...It is finished. I listened to the end. Thank you. I do not ask your name, but I will remember you."

**ขั้น 4 · รางวัล**
- รางวัลเสนอ: เบี้ยกรรม 60 + ไอเท็มเรื่องราว **"ไม้แจวเพลงเรือ"** (ไม่มีผลสถิติ) + **เพลงเรือประกอบตอนนั่งเรือ** (เสียงเพลง 3 บทเล่นเบา ๆ ตอน Fast travel ตั้งแต่นี้ · ไม่มีผลเกม · ตัดได้ถ้าไม่มีเพลงประกอบ)
- ไอเท็ม TH: ไม้แจวเล็กที่ลุงแจวแกะเก็บไว้ ใช้เป็นที่ขีดบอกว่าฟังเพลงจนจบแล้ว · EN: A small oar Lung Chaew carved and kept, a mark that the song was heard to the end.
- ข้อความหลังจบ (ลุงแจวบนเรือ ทุกครั้งที่นั่ง · แทนบรรทัดกลางทางข้อ 2): "ข้าร้องเพลงทุกค่ำแล้ว ไม่ต้องมีใครฟังก็ได้" · EN "I sing every evening now. It does not matter if no one listens."

**NB-1 · รับ quest** · หัวข้อ: ลุงแจวขอความช่วยเหลือ · EN: Lung Chaew Asks for Help · ข้อความ: คนพายเรือขอให้ท่านไปฟังเสียงเพลงที่ปลายท่าเรือของแต่ละโซน · EN: The boatman asks you to listen for a song at the end of the landing in each zone. · ปุ่ม: รับทราบ · EN Understood
**NB-2 · ได้ท่อน** · หัวข้อ: ได้ยินเพลงเรือ · EN: You Heard the Song · ข้อความ: ท่านได้ยินเพลงเรือบทที่ {k} จดไว้แล้ว {m}/2 · EN: You heard verse {k} of the boat song and noted it. {m}/2 · ปุ่ม: ต่อ · EN Continue
**NB-3 · จบ quest** · หัวข้อ: เพลงเรือจบแล้ว · EN: The Boat Song Is Finished · ข้อความ: ลุงแจวฟังเพลงจนจบ เขาขอบใจและมอบของที่ระลึกให้ท่าน · EN: Lung Chaew heard the song to the end. He thanks you and gives you a keepsake. · ปุ่ม: ขอบคุณ · EN Thank him

## 11. รายการภาพที่ต้องวาด (ส่วน A) · Claudy ใช้เขียนคิว Codex

กติการ่วมของทุกภาพ: ไม่มีตัวอักษรในภาพ · คัตซีนขนาด 1672×941 · สไปรท์/โปรไฟล์ตามขนาดของ `boss-hanuman-th*.webp` / `soul-sita-th*.webp` (ตรวจ `img/z1-events/` ก่อน) · ไอคอนตามขนาดไอคอนท่าไม้ตายเดิมในฉากสู้ · **แนบสไปรท์ตัวละครหลักของเกมเป็นภาพอ้างอิงทุกครั้ง** · ภาพเดิมที่ Rae ระบุ "ใช้แทนได้" ยังไม่ได้เปิดดูจริง (เครื่องมือรอบนี้ดูรายชื่อไฟล์ไม่ได้) ให้ Claudy/Toby ตรวจก่อนสั่งวาด
ลักษณะตัวละครหลักที่ใช้ซ้ำ (จาก R1 A7): **ยามาชุดโซน 1** = ผิวแดง มงกุฎทองยอดแหลมแบบไทย เสื้อคลุมแดงเข้มดำขลิบทอง ถือสมุดบัญชี · **นิรา** = ผิวม่วง เขาเล็ก มวยผม ชุดดำขลิบทอง · **ชุดโซน 2** = กิโมโนลายดอกซากุระสีแดง (มีอยู่แล้ว)

### กลุ่ม A · ระบบตะเกียง/UI
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| A1 | `img/ui/item-magic-lamp.webp` + `-lit.webp` | ไอคอนตะเกียงวิเศษในกระเป๋า (ดับ / จุด) | ตะเกียงทองดวงเล็กแบบประทีปไทย ฐานเป็นกลีบบัว หูหิ้วโค้ง ไส้ตะเกียงตรงกลาง · รุ่น "ดับ" ไม่มีเปลว · รุ่น "จุด" มีเปลวสีทองนิ่ง ไม่ใช่โคมอะลาดินและไม่มีควันพุ่งออกจากปากตะเกียง | ไม่มี |
| A2 | `img/ui/cmd-summon.webp` | ไอคอนปุ่ม "อัญเชิญ" บนวงคำสั่งในฉากสู้ (แทนไอคอน "หนี") | ตะเกียงทองเปลวสีทองลอยเหนือฝ่ามือเปิดแบบวงกลม สไตล์เดียวกับไอคอนคำสั่งเดิม | ไม่มี · ทิ้งไอคอน "หนี" เดิมได้ |
| A3 | `img/ui/summon-slot-empty.webp` | ช่องว่างและช่องล็อกในแถบกระเป๋า "ตะเกียงวิเศษ" (2 สถานะ ในไฟล์เดียว) | กรอบทองลายกลีบบัวสี่เหลี่ยมจัตุรัส ช่องว่างมีวงกลมจาง ๆ ตรงกลาง ช่องล็อกมีแม่กุญแจทองเล็ก | ใช้กรอบช่องกระเป๋าเดิมแล้วเติมกุญแจก็ได้ (ให้ Toby ทำด้วยโค้ด) |
| A4 | `img/z1-events/cut-sita-lamp-th.webp` | คัตซีน `sita-lamp` หน้า 2 | ห้องพิพากษาเดิม (ตามฉาก e2/e3 ของคดีสีดา) นางสีดา (ชุดไทยขาวทอง) ยื่นตะเกียงทองดวงเล็กฐานกลีบบัวด้วยสองมือ หนุมาน (ขนขาว เกราะแดงทอง) คุกเข่าข้างหนึ่งประนมมือเหนือไส้ตะเกียง เปลวทองไหลลงมาจากระหว่างฝ่ามือ ยามา (ชุดโซน 1) และนิรายืนด้านซ้ายมองด้วยท่าเคารพ · ไม่มีพระรามในภาพ | ไม่มี · ใช้ภาพ e2 `cut-hanuman-yields-th` เป็นฉากหลังชั่วคราวได้ |

### กลุ่ม B · หนุมาน (ตัวอัญเชิญ)
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| B1 | `img/summon/icon-hanuman.webp` | ไอคอนผู้ช่วยในกระเป๋า | ใบหน้าหนุมานขนขาว มงกุฎทอง ตาเด็ดเดี่ยว กรอบทองกลม | ตัดจาก `boss-hanuman-th-profile.webp` ได้ |
| B2 | `img/summon/battle-hanuman.webp` | ตัวอัญเชิญในฉากสู้ | หนุมานเต็มตัว ท่ายืนเตรียมพร้อม มือเปล่า ไม่ถืออาวุธ (ตามสไปรท์ศึกเดิม) | ใช้ `boss-hanuman-th.webp` ได้ |
| B3 | `img/summon/cut-hanuman-beyond-clouds.webp` | ท่าไม้ตาย "เหาะเหนือเมฆ" | หนุมานเหาะทะลวงเมฆดำลงมาจากบนฟ้าเข้าหากล้อง มือเปล่ากางออก ขนปลิว แสงสีทองตามหลัง ฉากเป็นสนามรบนรกแบบเดียวกับฉากสู้โซน 1 | ใช้ `cut-hanuman-sweep-th.webp` แทนก่อนได้ |

### กลุ่ม C · คดีวันทอง / ขุนแผน / กุมารทอง
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| C1 | `img/z1-events/soul-wanthong-th.webp` + `-profile.webp` | นางวันทอง (สไปรท์ในศาล + การ์ดโปรไฟล์) | หญิงไทยวัยสาว ผมเกล้าเรียบ ห่มสไบสีอ่อน นุ่งโจงกระเบนผ้าไหมเรียบ มือกุมชายผ้า สีหน้าสงบแบบคนเตรียมใจรับคำตัดสิน ไม่ร้องไห้ · ไม่แต่งหน้าจัด | ไม่มี |
| C2 | `img/z1-events/boss-khunphaen-th.webp` + `-profile.webp` | ขุนแผน (บอส event) | ชายร่างกำยำวัยกลางคน ผ้าโพกศีรษะลายยันต์เก่า ผ้าประเจียดสีเหลืองซีดพันต้นแขน นุ่งโจงกระเบนสีเข้ม ดาบ "ฟ้าฟื้น" ประดับขอบฝักข้างเอว ยืนท่าตั้งการ์ด ไม่โอ้อวด · ไม่มีภาพมนตร์/เสน่ห์ | ไม่มี |
| C3 | `img/z1-events/cut-khunphaen-arrives-th.webp` | คัตซีน `z1-khunphaen-open` หน้า 1 | ประตูโถงพิพากษาถูกถีบเปิดบานกระแทกผนัง ขุนแผนก้าวเข้ามาท่ามกลางหมอก ด้านนอกประตูเห็นม้าสีหมอก (เทาหม่นเหมือนหมอก) ตัวหนึ่งยืนนิ่ง นางวันทองยืนข้างแท่นไม่ขยับ ยามา (ชุดโซน 1) ยืนหลังแท่นมองไปทางประตู นิราถือแฟ้มแนบอก | ไม่มี |
| C4 | `img/z1-events/cut-khunphaen-yields-th.webp` | คัตซีน `z1-khunphaen-win` หน้า 1–2 | ขุนแผนคุกเข่าข้างหนึ่ง ดาบฟ้าฟื้นปักพื้น นางวันทองยืนกลางโถงยกมือเสมออก ขวางระหว่างเขากับยามา สีหน้าสงบมั่นคง ยามากับนิราอยู่ด้านหลังขวา | ไม่มี |
| C5 | `img/z1-events/cut-khunphaen-gift-th.webp` | คัตซีน `z1-khunphaen-win` หน้า 3 | ขุนแผนวางมือขวาทาบอก ก้มศีรษะต่ำให้ยามา ข้างตัวเขามีเด็กชายผมจุกวัยราว 7–8 ปี กายเรืองแสงทองจาง ๆ ยืนเงยหน้ามองยามา ประกายทองเล็ก ๆ ลอยอยู่ระหว่างกลาง **ไม่มีทารก ไม่มีสัญลักษณ์ที่เกี่ยวกับวิธีทำกุมารทอง** | ไม่มี |
| C6 | `img/summon/kuman-thong.webp` + `-icon.webp` + `-battle.webp` | กุมารทอง (3 ขนาดในชุดเดียว: ตัวเต็ม · ไอคอน · ฉากสู้) | เด็กชายผมจุกวัยราว 7–8 ปี นุ่งผ้าโจงสีแดงทองเรียบ ตัวเรืองทองจาง ๆ สีหน้าซื่อ ตั้งใจ มือกำแน่น ยืนท่าป้องกัน ไม่ใส่เครื่องประดับที่ชวนให้นึกถึงเครื่องราง | ไม่มี |
| C7 | `img/summon/cut-kuman-golden-aegis.webp` | ท่าไม้ตาย "แสงทองคุ้มกาย" | กุมารทองยกสองมือกางม่านแสงสีทองเป็นโดมกลมคลุมยามา นิรา และทีมทั้งหมด ขอบม่านเป็นกลีบบัวซ้อน ฉากหลังเป็นสนามรบนรกโซน 1 · ไม่ใส่คำหรือยันต์ในแสง | ไม่มี |

### กลุ่ม D · ยมทัต (พี่ชาย) ท่าเรือ ประตูโซน 2 ตัวอัญเชิญ
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| D1 | `img/z1-events/cut-yomathat-harbor-th.webp` | คัตซีน `z1-yomathat-wait` | ท่าเรือโซน 1 ตอนเย็น ยมทัตสอดดาบเพลิงกลับฝัก ยืนหันหน้าเข้าหากล้องครึ่งตัว ยามา (ชุดโซน 1) กับนิรายืนฝั่งตรงข้ามด้วยท่าเคารพ ตรงขอบท่ามีเรือไม้ลำเล็กจอด คนพายเรือเห็นเป็นเงาท้ายเรือ | ตรวจ `Intro-Boss-Zone1` / ฉากท่าเรือเดิมก่อน ใช้เป็นฉากหลังได้ |
| D2 | `img/z2-events/cut-yomathat-gift-asia.webp` | คัตซีน `z2-yomathat-gift` หน้า 1 และ 3 | ประตูแดงบานสูงของบูรพาเปิดครึ่งหนึ่ง ลมพัดผ่านช่องไผ่ ยมทัตยื่นห่อผ้าและถุงเงินให้ยามาด้วยสองมือ (หน้า 1) แล้วเปลวแดงส้มจากข้อมือยมทัตจุดไส้ตะเกียงที่ข้างเอวยามา (หน้า 3 · แยกเป็นสองภาพ D2a / D2b ก็ได้) ยามาเป็นชุดโซน 1 | ไม่มี |
| D3 | `img/summon/icon-yomathat.webp` + `battle-yomathat.webp` | ไอคอน + ตัวในฉากสู้ | ไอคอน: ใบหน้ายมทัตขรึม เปลวแดงส้มเรืองข้างแก้ม · ฉากสู้: ยืนเตรียมชักดาบเพลิง | ใช้สไปรท์ `boss-th` ของยมทัตเดิมได้ (ตรวจ img/) |
| D4 | `img/summon/cut-yomathat-flame-guard.webp` | ท่าไม้ตาย "ดาบเพลิงคุ้มน้อง" | ยมทัตฟันดาบเพลิงลงเดี่ยวหนักใส่ศัตรู ด้านหลังเขาม่านเปลวแดงส้มกางออกเป็นกำแพงบังทีมที่ยืนอยู่เบื้องหลัง | ใช้ภาพท่า groupHit ของบอสยมทัตเดิมเป็นฐานได้ |

### กลุ่ม E · ชายแดน 1-2
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| E1 | `img/z1-events/cut-frontier12-cage-th.webp` | คัตซีน `z1-frontier12-father` หน้า 1–2 | กลางลานหินในถ้ำลึก คบไฟสีส้ม กรงเหล็กสนิมตั้งอยู่กลางภาพ ทัณฑสูร (ตัวแดง มงกุฎทองลายไทย เกราะเกล็ดดำ) นั่งขัดสมาธิในกรง รอยช้ำที่ไหล่ กระบองหนามวางนอกกรง บิดาของทัณฑสูรเป็นเงาร่างสูงใหญ่คลุมเสื้อยาวดำสนิทยืนข้างกรง **ไม่เห็นใบหน้า** (หันหลังครึ่งตัว) | ใช้ฉากถ้ำ `bg-cave-th` เดิมเป็นฉากหลัง (ตรวจ img/) |
| E2 | `img/z1-events/cut-frontier12-stop-th.webp` | คัตซีน `z1-frontier12-father` หน้า 3 | ยมทัตวางฝ่ามือหนักบนไหล่ยามาจากด้านหลัง ยามากำหมัดแน่นหันหน้ามองกรง ใบหน้ายมทัตเคร่งขรึม นิรายืนข้างหลังมองกรงเงียบ ๆ ฉากเดียวกับ E1 | ไม่มี |

### กลุ่ม F · กวนอู
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| F1 | `img/z2-events/boss-guanyu-asia.webp` + `-profile.webp` + `-guard.webp` | กวนอู (บอสประตู / การ์ดโปรไฟล์ / สไปรท์ Guard ยืนประจำประตูบนแผนที่) | ชายร่างสูงใหญ่ใบหน้าแดงเข้ม เคราดำยาวเกือบถึงอก ตาเรียวนิ่ง สวมเกราะและเสื้อคลุมสีเขียวเข้มลายมังกร ถือง้าวด้ามยาวปลายโค้งตั้งตรง ท่ายืนสง่าไม่ขยับ ไม่โอ้อวด ไม่ตลก · เทียบรูปลักษณ์ภาพมาตรฐานของกวนอูในศิลปะจีน ไม่ลอกการ์ตูน/เกมใดโดยเฉพาะ | ไม่มี |
| F2 | `img/z2-events/cut-guanyu-gate-asia.webp` | คัตซีน `z2-guanyu-open` หน้า 1–3 | ประตูไม้แดงบานสูงของบูรพาในหมอกบาง ๆ กวนอูยืนหน้าประตูถือง้าวปักพื้น ลมพัดชายเสื้อคลุม ยามา (ชุดโซน 1) นิรา และยมทัตยืนด้านล่างซ้ายหันหน้าเข้าหาเขา บรรยากาศตึงแต่ไม่โกรธ | ไม่มี |
| F3 | `img/z2-events/cut-guanyu-sweep-asia.webp` | การ์ดท่า "ง้าวมังกรเขียวกวาดลาน" (groupHit) | กวนอูหมุนง้าวกวาดเป็นครึ่งวงกลมกว้าง มีประกายแสงสีเขียวตามปลายง้าวเข้าหากล้อง ฉากเป็นลานหน้าประตูบูรพา | ไม่มี |
| F4 | `img/z2-events/cut-guanyu-yields-asia.webp` | คัตซีน `z2-guanyu-win` | กวนอูปักด้ามง้าวลงพื้น ประสานมือหน้าอกก้มศีรษะให้ยามา ประตูแดงเปิดอยู่ด้านหลัง ลมพัดใบไผ่เข้ามาในกรอบภาพ | ไม่มี |
| F5 | `img/z2-events/item-guanyu-badge.webp` | ไอคอนไอเท็ม "ตราประจำกองของกวนอู" | ตราไม้เก่าสี่เหลี่ยมมุมมน แกะลายมังกรเรียบ ผูกเชือกสีแดงจาง ไม่มีตัวอักษร | ไม่มี |

### กลุ่ม G · คนพายเรือ + quest
| # | ไฟล์ที่เสนอ | ใคร/ฉาก | คำบรรยายภาพ | ภาพเดิมใช้แทนได้ไหม |
|---|---|---|---|---|
| G1 | `img/boat/boatman-lung-chaew.webp` + `-profile.webp` | ลุงแจว (สไปรท์ท้ายเรือ + การ์ดโปรไฟล์ในบทคุย) | ชายสูงวัยผิวคล้ำจากแดด ผมหงอกรวบ สวมงอบสานจากใบลาน นุ่งโจงกระเบนสีน้ำเงินเก่า ยืนท้ายเรือไม้ ถือไม้แจวยาว สีหน้านิ่ง ตาเหม่อมองผิวน้ำ | ไม่มี · ต้องนัดกับ G7 (ท่าเรือ+เรือ) ให้เรือลำเดียวกัน |
| G2 | `img/boat/cut-boatman-song-asia.webp` | คัตซีนขั้น 3 (ฟังเพลงจนจบ) | ท้ายเรือไม้กลางน้ำที่นิ่งเหมือนกระจก ลุงแจวยืนไม้แจวหยุดกลางอากาศ ปากเปิดร้องเพลง ยามา (ชุดตามโซนที่ฉาก) กับนิรายืนหัวเรือหันมามอง แสงเย็นของยามเย็นทอดลงมา โคมแดงเล็กลอยอยู่ไกลลิบ | ไม่มี |
| G3 | `img/boat/fx-water-song.webp` | เอฟเฟกต์จุดฟังเสียงน้ำที่ปลายท่า 2 จุด (โซน 1 / โซน 2) | วงน้ำกระเพื่อมซ้อนกันที่ปลายท่าไม้ ละอองแสงทองจาง ๆ ลอยขึ้นเหนือผิวน้ำ · โซน 2 เพิ่มโคมแดงเล็กลอยกลางน้ำ | ใช้เอฟเฟกต์น้ำเดิมได้ถ้ามี |
| G4 | `img/boat/item-oar.webp` | ไอคอนไอเท็ม "ไม้แจวเพลงเรือ" | ไม้แจวเล็กแกะมือ ปลายใบพายมน ผูกริบบิ้นสีน้ำเงินเก่า มีรอยขีดสั้น ๆ เรียงที่ด้าม ไม่มีตัวอักษร | ไม่มี |

รวมภาพที่ **ต้องวาดใหม่**: A1(2) A2 A3 A4 · B3(ใช้ของเดิมแทนได้) · C1(2) C2(2) C3 C4 C5 C6(3) C7 · D1 D2(1–2) D3(ใช้ของเดิมแทนได้) D4 · E1 E2 · F1(3) F2 F3 F4 F5 · G1(2) G2 G3 G4
- **จำนวนที่ต้องวาดใหม่: 32 ไฟล์** = ภาพคัตซีน 14 (A4 C3 C4 C5 C7 D1 D2 D4 E1 E2 F2 F3 F4 G2) + สไปรท์/โปรไฟล์ 12 (C1×2 C2×2 C6×3 F1×3 G1×2) + ไอคอน/UI/เอฟเฟกต์ 6 (A1×2 A2 F5 G3 G4)
- **ใช้ของเดิมแทนได้ (ไม่นับ · ตรวจ img/ ก่อน):** A3 · B1 B2 B3 · D3 · ถ้าของเดิมใช้ไม่ได้ ให้บวกเพิ่ม ≤ 6 ไฟล์
- **ตัวอัญเชิญ 3 ตัวที่ปลดล็อกในส่วน A** (ไอคอน + ภาพสู้ + ท่าไม้ตาย = 9 ชิ้นตามกติกาคุณเป้): หนุมาน 3 ชิ้น (ของเดิมแทนได้ทั้งหมด) · กุมารทอง 4 ไฟล์ (C6×3 + C7) · ยมทัต 3 ชิ้น (D3 ของเดิมแทนได้ · D4 วาดใหม่)
- ภาพ G7 (ยามา/นิรากระโดดลงเรือ นั่งบนเรือ) และ G4/G5 (ทางเข้าชายแดน) ไม่นับในที่นี้ เป็นงานแยกในคิว
- ภาพที่ **ควรวาดก่อน** (ไม่มีภาพนี้เสียบบทไม่ได้): A4 C1 C2 C3 C4 C5 C6 · F1 F2 F4 · E1 E2 · D1
- ภาพที่ **ตัดไปได้ก่อน** (บทอ่านได้เหมือนเดิม): A3 B3 C7 D4 F3 F5 G3 G4

## 12. สรุปตัวอัญเชิญที่ปลดล็อกในส่วน A (ตามกติกา D2 D4)
| # | ตัวอัญเชิญ | ปลดล็อกเมื่อ | ท่าไม้ตาย TH | EN | หัวข้อ |
|---|---|---|---|---|---|
| 1 | หนุมาน | จบ `sita-lamp` (ได้ตะเกียงจากสีดา) | เหาะเหนือเมฆ | Beyond the Clouds | 3.4 |
| 2 | กุมารทอง | จบ `z1-khunphaen-win` (คดีวันทอง ขุนแผนมอบ) | แสงทองคุ้มกาย | Golden Aegis | 4.7 |
| 3 | ยมทัต | จบ `z2-yomathat-gift` (พาไปส่งถึงประตูโซน 2) | ดาบเพลิงคุ้มน้อง | Flame Blade, Brother's Guard | 8.4 |
- ไม่ปลดล็อกในส่วน A: หงอคง · เหลียนกัง (ส่วน B ตาม D4) · มูซาชิ · มังกรริวจิน · วาลคิรี · ยอร์มุนกันดร์ (ส่วน B–C) · ธอร์ · ลูซิเฟอร์ · ลูแปง (ส่วน C–D)
- กวนอู **ไม่** เป็นตัวอัญเชิญ (ไม่อยู่ในรายชื่อของคุณเป้) เป็น Guard โซน 2 เท่านั้น

## 13. สรุปคีย์ที่เสนอสำหรับ Toby
| คีย์ | ความหมาย |
|---|---|
| `z1-guard-name` | แนะนำชื่อกุมภัณฑ์ (หัวข้อ 1.2) |
| `z1-kan-lamp` | กานต์อธิบายตะเกียงที่หอกระจก (2.5) |
| `sita-lamp` | สีดามอบตะเกียง (3.3) · เล่นหลัง `sita-phantom` ก่อน `sita-return` |
| `wanthong` · `z1-khunphaen-open` · `z1-khunphaen-win` · `khunphaen` (ท่าบอส) | คดีวันทอง · แถว `TH_STORY_CASES` `{ k:'wanthong', after:12, needsEvent:'sitaHanuman' }` |
| `z1-yomathat-wait` | หลังชนะบอสโซน 1 (5.3) · แทน boss-guide เดิม |
| `z1-frontier12-father` | ถ้ำชายแดน 1-2 (6.3) |
| `z2-guanyu-open` · `z2-guanyu-win` · `z2-guanyu-lose` · `guanyu` (ท่าบอส) | ศึกประตูโซน 2 (7) |
| `z2-yomathat-gift` | ให้ของ + ออกจากทีม + ฝากไฟ (8.3) |
| `sqGuanyu` (เสนอ · ใช้แถว `deserter` เดิมเป็นฐาน) · `NQ-1` | quest เสริมกวนอู (9) |
| `sqBoatman` · `NB-1..3` | quest คนพายเรือ (10) |
| `NA-1..3` `NW-1..5` `NY-1..4` `NF-1` `NG-1..5` | หน้าต่างแจ้งเตือน |

---

## ให้ Reese ตรวจ (ตำนาน/วรรณคดี/ศาสนา · ส่วน A)
(ผลตรวจรอบแรกของ Reese 19 พ.ย. = FIX LIST แก้แล้ว ดูหัว "แก้ตาม Reese 19 พ.ย." ท้ายไฟล์ · รายการด้านล่างคงไว้เป็นประวัติ)
1. **กุมภัณฑ์ (หัวข้อ 1):** ความหมายของคำ "กุมภัณฑ์" ในคติไทย-พุทธ (ยักษ์ที่อยู่ในบริวารของท้าววิรุฬหก ทิศใต้) ตรงตามที่ผมเขียนหรือไม่ และใช้เป็นชื่อเฉพาะของยักษ์ผู้เฝ้าด่านได้ไหม (Reese: ผ่าน)
2. **รามเกียรติ์ (หัวข้อ 3):** (ก) ตะเกียง/ประทีปที่นางสีดาจุด "ทุกค่ำตลอดช่วงรอคอย" เป็นเรื่องแต่งของเกม ไม่ใช่ตัวบทรามเกียรติ์ ยอมรับได้หรือไม่ (ข) หนุมานคุกเข่าประนมมือมอบเปลวไฟให้นางสีดา · สรรพนาม "พระนาง/ท่านหนุมาน/ข้า" สอดคล้องกับบท R1 และลักษณะที่คนไทยรู้จัก (ค) ไม่มีพระรามปรากฏ ไม่มีเรื่องลุยไฟ เนรเทศ หรือความบริสุทธิ์
3. **ขุนช้างขุนแผน (หัวข้อ 4):**
   - ลักษณะนางวันทองในสำนวน: "ใจเอนเอียงสองฝ่าย" · hidden ข้อ 1 (ถูกบังคับให้ไปอยู่เรือนขุนช้างหลังมีข่าวว่าขุนแผนตายในศึก โดยไม่มีโอกาสเลือก · แก้ตาม Reese 1.3) · hidden ข้อ 2 และ `deny` reveal "เสียดายเรือนหลังนั้นอยู่บ้าง" **เป็นรายละเอียดที่ผมแต่งเอง** เพื่อให้คดีมีปมคนจริง ตรวจว่าไม่ทำร้ายตัวละครเกินตัวบท และไม่ขัดกับฉบับที่คนไทยรู้จัก (รวมถึงที่ผมไม่ได้พูดถึงตอนจบของนางในเรื่อง)
   - ขุนแผน: "ดาบฟ้าฟื้น" · "ม้าสีหมอก" · ผ้าประเจียดพันต้นแขน/ผ้าโพกศีรษะลายยันต์ · "พานางกลับมาจากเรือนนั้นกลางดึก" · ตรวจชื่อและการสะกด และว่าไม่เกินตัวบท (แก้ตาม Reese 1.1 1.2 1.4 แล้ว)
   - **กุมารทอง:** ผมให้เป็นเด็กชายผมจุกวัยราว 7–8 ปีที่ขุนแผน "เลี้ยงไว้ข้างกาย" มอบเป็นคำขอโทษ **โดยไม่เล่าที่มาและวิธีทำ** · ตรวจว่าการวางกุมารทองเป็น "ผู้ติดตามที่ซื่อสัตย์" ที่ยกให้ผู้อื่นได้ ไม่ชนกับความเชื่อที่คนไทยเคารพ และไม่เข้าข่ายการอ้างเรื่องเครื่องรางจนเกินควร
   - ท่าของขุนแผนไม่มีเสน่ห์/มนต์ใด ๆ (เฉพาะม้ากับดาบ)
4. **กวนอู (หัวข้อ 7 และ 9):** (ก) ลักษณะ: หน้าแดงเข้ม เคราดำยาว เกราะเขียว เสื้อคลุมเขียวเข้มลายมังกร ถือง้าวด้ามยาวปลายโค้ง ตรงตามภาพมาตรฐานหรือไม่ (ข) เหตุผลเฝ้าประตู = "เคยเฝ้าเมืองที่ประตูถูกเปิดจากข้างใน" ย่อจากเรื่องเสียเมืองเกงจิ๋ว ถูกต้องในเค้าโครงหรือไม่ (ผมไม่ระบุชื่อเมืองหรือผู้ใด) (ค) การเขียนกวนอูซึ่งได้รับการเคารพเป็นเทพในศาสนาพื้นบ้านจีน ให้ "ยอมรับผู้เล่นเพราะคำสัตย์" ไม่เสียศักดิ์ศรี ท่าทีคารวะ (ประสานมือหน้าอก) เหมาะสมหรือไม่ (ง) ชื่อไทย "กวนอู" (ตัดโน้ตเรื่องชื่อง้าวออกแล้วตาม Reese 1.9 · ชื่อท่า "ง้าวมังกรเขียวกวาดลาน" คงไว้)
5. **เพลงเรือ (หัวข้อ 10):** เนื้อเพลง 3 บทเป็นของแต่งใหม่ ตรวจว่าไม่ซ้ำหรือคล้ายเนื้อเพลงเรือเก่ามากเกินไป · "แจว" "โจงกระเบน" "งอบ" ใช้ถูกกับภาพคนแจวเรือไทย
6. **ยมทัต/ทัณฑสูร/บิดาของทัณฑสูร (หัวข้อ 5–6):** ล้วนเป็นเรื่องแต่งภายในเกม ไม่อ้างศาสนา · ข้อเดียวที่ขอให้ดู: บทพูด "พี่เติบโตมากับความเข้มงวดแบบนี้" ของยมทัต (แก้จาก "ใต้มือที่หนัก" แล้วตาม Reese 2.1) ไม่ทำให้พญายมบาท (พ่อ) กลายเป็นตัวร้าย (ตามข้อควรระวังใน lore bible ว่าห้ามให้พญายมเป็นตัวตลกหรือตัวร้าย)
7. ไม่ต้องตรวจซ้ำ: การสะกด "วาลคิรี" (ส่วน B–C) · "ยามา" ใช้เป็นชื่อในบท

---

## ต้องให้คุณเป้ตัดสิน (ใช้ค่าเริ่มต้นไว้ก่อน ไม่หยุดงาน · ส่วน A)
1. **ชื่อ Guard ยักษ์เขียวโซน 1** (G10): ใช้ **กุมภัณฑ์** (สำรอง ขุนทวาร / เขียวหิน) · และยืนยันว่าชื่อเดิมในไฟล์ lore bible (เมซุ · มูนิน · ไฟร์วอลล์) เลิกใช้
2. **วิธีนับ "ตัวอัญเชิญช่วยสู้ 3 ครั้ง"** (D2 ที่ตอบไว้ว่า "ใช้ท่าไม้ตายได้ 3 ครั้ง"): ผมตีความ **กด "อัญเชิญ" 1 ครั้ง = เรียกมา 1 ตนใช้ท่าไม้ตาย 1 ครั้ง นับเป็น 1 ใน 3 ครั้งของตนนั้น ผู้ช่วยไม่ค้างอยู่ในสนาม** · ถ้าคุณเป้ตั้งใจให้ผู้ช่วย "อยู่ในสนามจนใช้ท่าครบ 3 ครั้ง" ต้องแก้ข้อความ 2.3 สามบรรทัด
3. **เติมพลังที่หอกระจกเสียเงินไหม:** ผมเขียนเป็น **ฟรี** (ไม่มีราคาในข้อความ) · ต้องไปที่หอกระจกเท่านั้น
4. **ที่มาของตะเกียง:** ผมตั้งเป็น "ไฟของผู้ที่ยอมรับท่าน ผู้นั้นฝากไว้" เพื่อผูกกับกติกา D4 (ต้องผ่าน event ก่อนอัญเชิญ) · ยอมรับไหม หรืออยากให้ตะเกียงมีที่มาอื่น
5. **คดีวันทอง:** ใส่เป็น **คดีที่ 13** (หลังสีดา 12 ก่อนยมทัต 15) · ขุนแผนมาทุกทางที่ผู้เล่นเลือก (ลงโทษ/ไม่ลงโทษ) เพื่อไม่ให้ปลดล็อกกุมารทองขาด · ทาง "ไม่ลงโทษ" นางวันทองขอให้บันทึกโทษเบาที่สุด (ผลคะแนน/การบันทึก Toby ตัดสิน) · อีกทางเลือก: ปิดปุ่ม "ไม่ลงโทษ" ในคดีนี้ (ผมไม่แนะนำ)
6. **ภาพกุมารทอง:** เด็กชายผมจุกวัยราว 7–8 ปี กายเรืองแสงทอง ไม่มีทารก ไม่เล่าที่มา · ยอมรับไหม · ชื่อ EN ถอดเสียง "Kuman Thong"
7. **บิดาของทัณฑสูร** (G21): ไม่มีชื่อเฉพาะ · ไม่ต่อสู้ · ยมทัตห้ามยามาไว้ ("ครั้งเดียวที่พี่ขอ" ย้อนกับท่าเรือ) · กรงว่างหลังฉาก · ต้องการให้บิดาเป็นศึก/มีชื่อ/ผูกกับ [PHANTOM-404] หรืออาร์คอน-ศูนย์ไหม (ผมไม่ผูก)
8. **กวนอู:** (ก) ไม่เป็นตัวอัญเชิญ (ไม่อยู่ในรายชื่อ 11/12 ตัวของคุณเป้) · ต้องการให้เป็นหรือไม่ (ข) เหตุผลเฝ้าประตู "เคยเฝ้าเมืองที่ประตูถูกเปิดจากข้างใน" · ถ้าไม่ชอบ ใช้ "สาบานเฝ้าประตูตามคำของผู้ที่ตนเคารพ" (ค) quest เสริม: ใช้คดีทหารผู้หนีทัพเดิม + บทรับ/บทปิดใหม่ + ตราประจำกองเป็นรางวัลเรื่องราว (ง) ยมทัตลงสนามสู้กวนอูหรือยืนข้างสนาม (ผมเขียนบรรทัดไว้ทั้งสองแบบ)
9. **คนพายเรือ** (G8): ชื่อ "ลุงแจว" (สำรอง ตาพาย / ลุงเรือ) · quest เริ่มหลังนั่งเรือครั้งที่ 2 · ไม่มีศึก · รางวัลเบี้ย 60 + ไม้แจวเพลงเรือ + เพลงประกอบตอนนั่งเรือ · ตัวละครเดียวกันทุกท่าเรือ
10. **ยมทัตออกจากทีมเพราะ "เขตสาขา"** (เหตุผลตาม lore ว่ายมทูตเป็นคนของสาขา) · ไม่ใช่เพราะคุณเป้สั่งไว้ · ยืนยันหรืออยากให้เหตุผลอื่น
11. **ระหว่างเดินทางไปชายแดน 1-2:** ผมเขียนให้ยมทัตเดินกับทีมจากท่าเรือถึงชายแดน 1-2 แล้วถึงประตูโซน 2 ตามต้นฉบับ · ไม่มีฉากพิเศษอื่นนอกจากฉากถ้ำ (หัวข้อ 6) และบทคุยสุ่มของยมทัต (5.5)
12. **ต้นฉบับขาด/คลุมเครือที่ผมเลือกแบบปลอดภัย:** (ก) "11 lupin (อัญเชิญได้ หลังจากได้" ขาด → ไม่เกี่ยวส่วน A (ส่วน D ใช้เงื่อนไข quest HOME-67) (ข) รายชื่อตัวอัญเชิญของคุณเป้เขียน "11 ตัว" แต่ลิสต์ 12 รายการ → ผมใช้ลิสต์เป็นหลัก (ค) "นางวันทองห้ามขุนแผน" เมื่อใด → ผมวางหลังขุนแผนแพ้ (เหมือนสีดา/หนุมาน)
13. **ช่องตะเกียงช่องแรกได้ตอนไหน** (Reese 4.2): ต้นฉบับคุณเป้บอก "ของโซน 1 เลือกได้แค่ 1 ตัวละคร" และ "minigame โซน 1 → 1 ตัว" ซึ่งอ่านได้ 2 แบบ · **ค่าเริ่มต้นที่ใช้ในไฟล์นี้ (ใช้ไปก่อน): ได้ช่องแรกตอนรับตะเกียงจากสีดา (NA-1 บอก "ใส่ผู้ช่วยได้ 1 ตน มีหนุมานอยู่ในตะเกียง")** เพื่อให้ปุ่ม "อัญเชิญ" ใช้ได้ทันทีหลัง event สีดา ตามข้อ H2 · มินิเกมโซน 1 ที่หอกระจกเมื่อทำแล้วให้เป็นการ "ยืนยันระดับ 1" ไม่เพิ่มช่อง · **ทางเลือกอื่น:** ช่องแรกได้ตอนเล่นมินิเกมโซน 1 (หอกระจก) · ถ้าเลือกทางนี้ ต้องแก้ NA-1 (ตัดประโยค "ตอนนี้ใส่ผู้ช่วยได้ 1 ตน มี หนุมาน อยู่ในตะเกียง") · ปุ่ม "อัญเชิญ" ในฉากสู้ต้องล็อกจนกว่าจะเล่นมินิเกม · ข้อความ 2.4 "ถ้ายังไม่มีตะเกียง" / 2.3 "ตะเกียงยังว่าง" ปรับตามด้วย

---

## เช็กเกณฑ์รับงาน (ส่วน A)
1. ทุกฉากในต้นฉบับส่วนนี้มีบท TH/EN: ชื่อ Guard (1) · ของวิเศษ/หอกระจก/ตะเกียง/ปุ่มอัญเชิญ (2) · สีดามอบตะเกียง (3) · วันทอง/ขุนแผน/กุมารทอง (4) · ยมทัตท่าเรือ (5) · ชายแดน 1-2 บิดาขัง (6) · กวนอูประตู (7) · ยมทัตให้ของ+ออกทีม (8) · quest กวนอู (9) · คนพายเรือ+quest (10) · ครบ
2. ตัวอัญเชิญที่ปลดล็อก 3 ตัว มีท่าไม้ตาย + บรรทัดอัญเชิญ/ใช้ท่า/จบท่า TH/EN · ครบ (หนุมาน 3.4 · กุมารทอง 4.7 · ยมทัต 8.4)
3. ตารางภาพที่ต้องวาด · ครบ (หัวข้อ 11 · 32 ไฟล์ใหม่)
4. หัว "ให้ Reese ตรวจ" + "ต้องให้คุณเป้ตัดสิน" · ครบ

---

## แก้ตาม Reese 19 พ.ย.
ผลตรวจ: `Output/Reese/2026-11-19-avegee-r2a-factcheck.md` (FIX LIST ข้อ 1–7 บังคับ · 8–10 แก้เล็ก · Claudy ตัดสินว่าแก้ครบไม่ต้องตรวจซ้ำ) · แก้ด้วย Edit ทีละจุด ไม่ได้เขียนทับทั้งไฟล์ · ไม่ได้แตะโค้ดหรือไฟล์บทเดิม

| ข้อ | เรื่อง | แก้ที่ไหน (หัวข้อในไฟล์นี้) |
|---|---|---|
| 1 | "สีมอ" → "สีหมอก" ทุกจุด (TH+EN) | 4.4 บรรยายหน้า 1 TH ("ม้าสีหมอกตัวหนึ่งยืนนิ่งอยู่ในหมอกบาง ๆ") และ EN ("the mist-grey horse Si Mok") · หมายเหตุท้าย 4.4 · 4.5 ชื่อท่า TH `ม้าสีหมอกควบทะลวง` / EN `Si Mok's Charge` + `warnText` TH/EN (id `simoCharge` คงเดิม) · ตารางภาพ 11 C3 ("ม้าสีหมอก (เทาหม่นเหมือนหมอก)") · "ให้ Reese ตรวจ" ข้อ 3 |
| 2 | "แย่งนางกลับมาด้วยคมดาบ" → พานางหนีตอนดึก | 4.4 หน้า 1 TH ("ข้าเคยพานางกลับมาจากเรือนนั้นกลางดึกครั้งหนึ่ง และข้าไม่ยอมเสียนางอีก") + EN ("Once before I took her back from that house in the dead of night, and I will not lose her again.") · 4.6 หน้า 2 บรรทัดขุนแผน ("ครั้งก่อนข้าพานางหนีด้วยมือข้าเอง ครั้งนี้นางไม่ได้ขอให้ข้าพา นางขอให้ข้ายืนดู") TH+EN · "ให้ Reese ตรวจ" ข้อ 3 |
| 3 | ปมซ่อนข้อ 1 ของวันทอง | 4.3 `hidden` ข้อ 1 = "ถูกบังคับให้ไปอยู่เรือนขุนช้างหลังมีข่าวว่าขุนแผนตายในศึก โดยไม่มีโอกาสเลือกด้วยตนเอง" (`s:'bian', w:-2` คงเดิม) · "ให้ Reese ตรวจ" ข้อ 3 |
| 4 | ประเจียด ไม่ใช่ผ้าคาดอก/ปัก | 4.4 บรรยายหน้า 1 TH ("ผ้าประเจียดสีเหลืองซีดพันต้นแขน") + EN ("a faded yellow prajiad cloth bound around his upper arm") · ตารางภาพ 11 C2 |
| 5 | หมวกลุงแจว → งอบ | 10.1 ตารางตัวละคร ("สวมงอบสานจากใบลาน") · ตารางภาพ 11 G1 · "ให้ Reese ตรวจ" ข้อ 5 |
| 6 | "ใต้มือที่หนัก" → ความเข้มงวด | 6.3 หน้า 3 TH ("พี่เติบโตมากับความเข้มงวดแบบนี้") + EN ("I grew up under strictness like this.") · หมายเหตุ 6.3 · "ให้ Reese ตรวจ" ข้อ 6 |
| 7 | ทาง B หน้า 1 ขุนแผนขัดกันเอง | 4.4 เพิ่มตัวแปร `{khunTail}` แยกตามทาง (ตาราง TH/EN) · ทาง A: "ผู้ถือบัญชีที่จะลงโทษนางวันทอง ต้องผ่านข้าก่อน" · ทาง B: "ข้าไม่เชื่อว่าสำนักนี้ปล่อยใครง่าย ๆ ข้ามาดูเองว่านางถูกปล่อยจริงหรือไม่ ผู้ที่คิดจะลงโทษนางวันทองทีหลัง ต้องผ่านข้าก่อน" / EN ตามที่ Reese เสนอ · ทั้งบท TH และ EN หน้า 1 ใช้ `{khunTail}` ท้ายบรรทัดขุนแผน |
| 8 | บรรทัด 324 "ผู้บาดเจ็บล้มตายหลายราย" | 4.3 `seen` ข้อ 2 = "การแย่งชิงตัวนางก่อให้เกิดความบาดหมางและเดือดร้อนหลายครั้ง" · แก้ `claims` ข้อ solid ที่อ้าง "ผู้ล้มตาย" ให้ตรงกัน = "เรื่องที่ผู้คนเดือดร้อนเพราะการแย่งชิงหม่อมฉัน…" (เพิ่มเองให้ไม่ขัดกับข้อ 8) |
| 9 | ตัดโน้ตชื่อง้าว | ลบหมายเหตุใต้ 7.3 ("ง้าวในบรรยายใช้ภาพเดียวกับ…ไม่ใส่ชื่ออาวุธในบท") · "ให้ Reese ตรวจ" ข้อ 4(ง) ตัดคำว่า "ง้าวไม่ระบุชื่อ" · ชื่อท่า "ง้าวมังกรเขียวกวาดลาน / Green Dragon Sweep" คงไว้ (Reese ไม่ได้ติง) |
| 10 | กวนอู 653 / 658 | 7.3 หน้า 1 TH "สวมเกราะและเสื้อคลุมสีเขียวเข้มลายมังกร" + EN "in green armour and a dark-green robe patterned with dragons" · ตารางภาพ 11 F1 · 7.3 หน้า 2 TH "โดยคนที่ข้าฝากเมืองไว้" + EN "by the man I had left the city in charge of" |
| — | บรรทัด 58 "ผู้รับใช้" | 1 (เหตุผลชื่อกุมภัณฑ์) = "อยู่ในบริวารของท้าววิรุฬหก (หนึ่งในท้าวจาตุมหาราชิกาประจำทิศใต้)" · "ให้ Reese ตรวจ" ข้อ 1 · เปลี่ยนป้าย [R] เป็น "Reese ยืนยันแล้ว" |
| 4.2 | ช่องตะเกียงช่องแรก | เพิ่มเป็นข้อ 13 ใน "ต้องให้คุณเป้ตัดสิน" · ใช้ค่า Rae ไปก่อน: ได้ช่องแรกตอนรับตะเกียง (NA-1) |
| 3.3 (ไม่บังคับ) | "หม่อมฉัน" ของนางวันทอง | **ตัดสิน: คงไว้** · เหตุผล: (ก) เป็นสรรพนามสตรีที่คนไทยคุ้นในวรรณคดีเมื่อพูดกับผู้มีเกียรติ (ข) ตรงกับนางสีดาในเกมที่ใช้คำเดียวกัน ผู้เล่นจะได้ฟังเป็นเสียงนางในเรื่องเล่าเก่าเหมือนกัน (ค) ทั้งคดีไม่มีบรรทัดไหนที่ทำให้ฟังเป็นเจ้าหญิง เพราะนางเรียกขุนแผนว่า "พี่" ตลอด · ถ้าคุณเป้หรือ chris-culture รอบ ship อยากให้ลดเป็น "ดิฉัน" แก้ได้ทั้งคดี 4.3 กับ 4.6 ด้วยการแทนคำ |
| 1.10 (ไม่บังคับ) | เพลงเรือแต่งใหม่ | **ตัดสิน: คงชื่อ quest** แต่ระบุว่าเป็นเพลงที่ภรรยาของลุงแจวร้องคนเดียว ไม่อ้างว่าเป็นเพลงเรือตามประเพณี · แก้ที่ 10.1 (หมายเหตุ [R]) และหัวตารางเนื้อเพลงใน 10.3 |

ตรวจหลังแก้: ค้นด้วยตาทั้งไฟล์หาคำ "สีมอ" "Simo" "smoke-coloured" "ผ้าคาดอก" "หมวกกะโล่" "ใต้มือที่หนัก" "คมดาบ" "ผู้ล้มตาย" ไม่เหลือในส่วนที่อ่านเจอ (เครื่องมือรอบนี้ไม่มี grep จึงอ่านทั้งไฟล์ตรวจเอง · ให้ Claudy รัน grep ซ้ำก่อนส่งต่อ Toby)

