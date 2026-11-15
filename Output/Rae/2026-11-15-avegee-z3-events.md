# AVEGEE โซน 3 ปัจฉิม · บท event ครบชุด (คดี 0 / 5 / 10 / 15 + คดีญาติยมทูต 5 คดี + ข้อเสนอคดีนัวร์)
ผู้เขียน: Rae · 15 พ.ย. 2569 · อิงสเปกคุณเป้ (`Output/Claudy/briefs/2026-11-14-avegee-z234-events-owner-spec.md` ส่วนโซน 3 + คำตอบ + คำตัดสิน 14 พ.ย.) · ใบงาน `Output/Claudy/briefs/2026-11-15-avegee-z3-events-rae.md` · รูปแบบตามบทโซน 2 `Output/Rae/2026-11-14-avegee-z2-events.md` (ไทย + EN คู่กันทุกบรรทัดที่ผู้เล่นเห็น)
สถานะ: ร่างพร้อมเสียบ · ยังไม่ผ่าน Reese (หัวข้อ 11) · ไม่ได้แตะโค้ด (อ่านอย่างเดียวจาก `~/agapae-work/AVEGEE/src/`)
ข้อจำกัดตามจริงของรอบนี้: เครื่องมือที่ผมมีรอบนี้ค้นข้อความในโค้ดและเปิดดูรายการโฟลเดอร์ไม่ได้ ผมจึงอ้างโค้ดเฉพาะบรรทัดที่เปิดอ่านเห็นจริง (`data.js` ZONE_EVENTS.west / ZONES.west / ZONE_BOSS_AT, `story.js`, `i18n.js` deva.west, `e1-content.js` signal-west, `boss-skills-data.js`, `z2-events.js`) และเช็กไฟล์ภาพได้เฉพาะชื่อที่โค้ดอ้างถึง · ข้อที่ไม่ได้ยืนยันติดป้าย "ตรวจก่อน" ไว้ให้ Toby/Claudy

---

## 0. กติกาที่ใช้ทั้งชุด (Toby ยึดตามนี้ตอนเสียบ)

### 0.1 น้ำเสียงตัวละคร
| ตัวละคร | สรรพนาม / ท่วงทำนอง | ที่มา |
|---|---|---|
| ยมบาทน้อย | "ผม ... ครับ" ในบท ผู้พูดใช้ป้าย "ยมบาทน้อย" · หน้าต่างแจ้งเตือน/แบนเนอร์ใช้ "ยามา" | ตามโซน 1-2 |
| นิรา | "ดิฉัน ... ค่ะ" เรียกผู้เล่นว่า "ท่านคะ" ศัพท์ทะเบียน นิ่ง ละเอียด | ตามโซน 1-2 |
| โพเอน่า (ทัณฑ์ ประจำปัจฉิม) | "ข้า" ห้วน เก่าแก่ ไม่ใช้ครับ/ค่ะ (ไม่ฟันธงเพศ) | ตาม `talk-lines.js` ของทัณฑ์ + อนุมานชื่อ (ข้อ 0.5) |
| นัวร์ (ดำ ประจำปัจฉิม) | "ผม ... ครับ" ผู้ช่วยขยัน เงียบ ๆ | ตาม pointer-foreman-lines ("ผม" + "ครับ") |
| พ่อค้านรก | "ข้า" ตลกแห้ง ไม่ลงท้ายครับ/ค่ะ (ผมไม่เห็นบทเดิมของเขา เขียนให้เป็นกลางที่สุด) | อนุมาน |
| เซอร์เบอรัส / ยอร์มุนกันดร์ | **ไม่พูด** บรรยายล้วน (ตามคำตัดสินท่าบอส: สัตว์) | boss-skills ข้อ 1.2 |
| วาลดริก | "ข้า / ท่าน / ท่านผู้มาเยือน" สุภาพ เยือกเย็น พูดช้า ขอโทษก่อนทำเสมอ | `useText` ท่าบอส + `signal-west-win` ("ขออภัย ... ราตรีของข้ายาวมาแสนนาน") |
| เอียร์ลิน | "ข้า / เจ้า" ตรง ร่าเริงแบบทหาร เรียกยามาว่า "เจ้าตัวเล็ก" ลงท้าย "นิ" ได้ | บทเดิม `deva.west.arrival` ("ไม่ต้องห่วงเจ้าตัวเล็ก ข้ามาช่วยเจ้าแล้ว" / "ฝีมือไม่ธรรมดานิ") |
| เซเวอริน | "ข้า / เจ้า" ผู้ตรวจบัญชี พูดเป็นตัวเลข เย็นแต่ไม่ดูถูกเกินเหตุ | `bossArrive` เดิม + `useText` ท่าบอส ("ตัวเลขไม่เคยโกหก!") |
| อ็อกเนียน (เพลิง ประจำปัจฉิม) | "ผม ... ครับ" ใจร้อน ล้อเล่นเวลาเรื่องหนัก | ตามบทบาทเพลิง/โฮมุระ (อนุมาน ข้อ 0.5) |
| ซิบิล (กานต์ ประจำปัจฉิม) | "ดิฉัน ... ค่ะ" ระวังคำ ชอบแยก "สิ่งที่พูด" กับ "สิ่งที่ได้ยิน" | อนุมานจากชื่อและบทบาทหมอดู (ข้อ 0.5) |
| เกรซ (บุญ ประจำปัจฉิม) | "ดิฉัน ... ค่ะ" อ่อนโยน ไม่ตัดสินแทนใคร | อนุมานจากชื่อและบทบาทผู้ดูแล (ข้อ 0.5) |
| ยักษ์ทวารบาล | "ข้า" หัวเราะกลบความเขิน "(กระแอม)" มือสั่นเวลามีเรื่องในใจ ป้ายผู้พูด "ยักษ์ทวารบาล" ไม่มีชื่อเฉพาะ | ตาม `sqGuard` และคำตัดสินโซน 2 |
| บรรยาย | "บรรยาย:" นำหน้า · EN ใช้ "Narration:" | |

EN ใช้ชื่อ: Yama · Nira · Poena · Noir · Ognien · Sibyl · Grace · Valdric · Eirlin · Severin · Cerberus · Jörmungandr · Gate Guardian (ตามตารางท่าบอส)

### 0.2 รูปแบบข้อความ
- หน้าต่างแจ้งเตือน = หัวข้อ / ข้อความ / ปุ่ม แต่ละช่องเขียน `ไทย` แล้วตามด้วย `EN` · แบนเนอร์เขียนบรรทัดเดียว
- บทคัตซีน = `{ title, pages:[{ title, line }] }` ตาม `STORY` · ผมเขียน `title` และ `line` เป็นวัตถุ `{ th, en }` ให้ Toby แยกไปตามระบบที่ใช้ (โซน 2 ใช้ไทยล้วนในไฟล์บท แล้ว Toby ทำ EN แยก ฉบับนี้ให้ EN มาเลย)
- สำนวนไต่สวน = รูปแบบ `QUEST_CASES` (k, zone:'west', sex, sp, kind, name, who, face, seen, hidden, merits, line, claims) · รหัสบาป kong kam kha pak mao bian akata · `w` ติดลบ = ข้อที่ทำให้เบาลง · `fake:true` = บุญอ้างที่ไม่จริง · ทุกข้อความมี `en` ต่อท้ายในบรรทัดเดียวกัน
- บทคดีญาติ = `KIN_CONTENT` (ก่อนขึ้นแท่น / ระหว่างไต่สวน / หลังตัดสิน + ทางเลือก + คำตอบ)
- ศัตรูที่ไม่ใช่ตัวละครมีชื่อ (วิญญาณถูกสะกด ปีศาจลูกน้อง) ไม่มีช่องพูดในฉากสู้ · เซอร์เบอรัสกับยอร์มุนกันดร์ใช้บรรทัดบรรยาย
- ปุ่มใช้คำ "ทดสอบ / รับมือ" กับเทวดาและยักษ์ทวารบาล · "สู้อีกครั้ง" กับบอส event และบอสโซน · "ทดสอบอีกครั้ง" กับเทวดา/ยักษ์ทวารบาล (คำตัดสินคุณเป้ 14 พ.ย.)
- แวมไพร์: ไม่มีภาพหรือบทกัดคอ เลือดชัด ฉากฟื้นพลังเป็นการจิบไวน์ (ตามแนวท่าบอส)

### 0.3 ลำดับ event โซน 3 (คีย์เป็นข้อเสนอ ให้ Toby ปรับได้)
| คดีครบ | event | คีย์ที่เสนอ |
|---|---|---|
| 0 | มาถึง: โพเอน่า + พ่อค้านรก · วิญญาณถูกสะกดเดินวน 2-3 ตน + เซอร์เบอรัสยืนหน้าประตูชายแดนล่าง · สู้หมดก่อนจึงสร้างได้ | `z3-arrive` · `z3-cerberus-open/win/lose` · `westHypnotized` (แก้) |
| 5 | วิญญาณหยุดนิ่งทั้งดินแดน → ปีศาจฝ่าชายแดน 3 ระลอก (ระลอก 3 = ลูกทีมถูกสะกด ตามเดิม) → วาลดริก → แท่นตัดสิน → ปล่อยกลับ | `z3-freeze` · `z3-breach-intro` · `west-hypnosis` (เดิม) · `z3-valdric-down` · `frontier-west-boss-*` · `valdric` (สำนวน) |
| 10 | เอียร์ลินบินลงมา (ฉากเดิม) → ทดสอบด้วยหอก | `deva-west` (เดิม) · `z3-eirlin-open/win/lose` |
| 15 | เซเวอรินมาพร้อมยอร์มุนกันดร์ → สู้อสรพิษก่อน → สู้เซเวอริน → boss-guide เดิม | `z3-sev-open` · `z3-jorm-yields` · `z3-sev-win` · `z3-sev-lose` |
| ญาติยมทูต | คดี 1-5 (จ้างก่อนจึงขึ้น) + ศึกทดสอบยักษ์ทวารบาล (ข้อเสนอ ข้อ 6.0) | `falseorder` · `youngerbrother` · `doomclient` · `carerdaughter` · `gatesentry` |
| ข้อเสนอ | คดีญาตินัวร์ 1 คดี 2 แบบ | หัวข้อ 7 |

### 0.4 ของเดิมในโค้ดที่เกี่ยวกับโซนนี้ (ตรวจแล้ว) และที่บทนี้ใช้/แก้
| จุดในโค้ด | ของเดิม | ในบทนี้ |
|---|---|---|
| `data.js` ZONE_EVENTS.west `westHypnotized` (บรรทัด ~1985) | `atCases:0` · alert "ทัณฑ์และพ่อค้านรกถูกปีศาจสามตนรุมอยู่ฝั่งซ้าย ..." · ศัตรู = ปีศาจ 3 ตน (kind 10 ×2, kind 2 ×1) | **แก้**: ข้อความใหม่ (1.2) · ศัตรูเป็นวิญญาณถูกสะกด 2-3 ตน + เซอร์เบอรัสที่ประตูล่าง (Toby ตั้งตัวเลข) · เงื่อนไข "สู้ให้หมดก่อนสร้างได้" ใช้เดิม |
| `i18n.js` `west.rescue.approach` (~1108) | "เดินเข้าไปช่วยทัณฑ์และพ่อค้านรก" / EN "Approach Taan and the hell merchant to help" | **แทนที่**: โพเอน่าและพ่อค้านรกไม่ได้ถูกรุมแล้ว ใช้ข้อความใหม่ 1.2 N0-2 |
| `ZONE_EVENTS.west` `westVampireBreach` (~1989) | `atCases:3` · ระลอก 1-2 ปีศาจ · **ระลอก 3 = ทัณฑ์กับดำที่ถูกสะกด** · ระลอก 4 วาลดริก · รางวัล `hypno` | **ใช้โครงเดิม** แก้ `atCases` 3 → **5** · alert เดิมพูดถึง "ลูกน้องสองระลอก" แทนข้อความใหม่ 2.2 (นับเป็น 3 ระลอกตามสเปก โดยระลอก 3 คือลูกทีมถูกสะกด) |
| `story.js` `west-hypnosis` (41-44) | บทวาลดริก: "ลูกน้องสองระลอกล้มลงแล้วหรือ? ..." + "ช่วยทุกคนกลับมา" | **ใช้เดิมตรงตัว ไม่แตะ** |
| `story.js` `deva-west` + `i18n.js` `deva.west.arrival` (~1103) | วาลคีรี: "ไม่ต้องห่วงเจ้าตัวเล็ก ข้ามาช่วยเจ้าแล้ว" · yama: ....... · "อ้าว! ปีศาจแวมไพร์ หายไปไหนแล้ว.." · "..... เจ้าตัวเล็ก ฝีมือไม่ธรรมดานิ" (+ EN) | **ใช้เดิมตรงตัว** — ตรงกับสเปก "จะมาปราบแวมไพร์ แต่เราปราบไปแล้ว" พอดี |
| `ZONE_EVENTS.west` `westDevaTest` (~1996) | `atCases:7` · alert "เทวดามาปราบแวมไพร์ แต่ยมบาทน้อยปราบไปแล้ว จึงขอทดสอบฝีมือ" · รางวัล `valkyrieSpear` · ไม่มี openStory/win/lose | แก้ `atCases` 7 → **10** · alert เดิมใช้ได้ (เสนอฉบับมีชื่อ 3.2) · **เพิ่ม** open/win/lose |
| `data.js` `ZONE_BOSS_AT` (~1908) | `{ asia:15 }` (โซน 3 ใช้ค่าเริ่มต้น 10) | เพิ่ม `west:15` |
| `ZONES.west` `bossArrive` 4 บรรทัด + `bossWin` 2 บรรทัด (~2113-2120) | ดู 4.3 | **ใช้ทั้ง 4+2 บรรทัดเดิม** วางใน `z3-sev-open` / `z3-sev-win` (ระบุ [เดิม] ในบท) |
| `story.js` `STORY.west` 2 แผง + รางวัล `ice` (45-48) | "ผู้ท้าชิงยอมรับ" · "ผนึกน้ำแข็ง" | **ใช้เดิม** (เป็นฉากรับของขวัญหลังชนะ) |
| boss-guide ของโซน west (`boss-guides.js`) | ชม → ยืนรอที่ประตูชายแดน → welcome → farewell + เงิน 1,200 + ชุด | **ใช้เดิม** (ข้อ 4.8) |
| `boss-skills-data.js` eirlin / valdric / cerberus / jormungandr / severin | มี `useText` ครบ | บทนี้ไม่ขัดกับ `useText` ทุกท่า |
| `westGuardTest` | **ไม่มีในโค้ด** (มีแต่ `asiaGuardTest` ของโซน 2) | สเปกโซน 3 ไม่ได้ขอ · เขียนเป็นข้อเสนอเสริมข้อ 6.0 |

### 0.5 สมมติฐานที่ผมตั้ง (ต้องให้ Toby ยืนยันกับ `CREW` และสไปรท์จริง ผมหา `CREW` ในโค้ดไม่เจอด้วยเครื่องมือรอบนี้)
1. **ทัณฑ์ ประจำปัจฉิม = โพเอน่า** (ใบงานบอกให้ใช้ชื่อโซน west ตาม CREW และสเปกคดีญาติ 1 เขียนว่า "ผู้สั่งโพเอน่า" เหมือนโซน 2 ที่ "ผู้สั่งล่ามอากุระ → โกคุ" ซึ่งเป็นทัณฑ์) · ถ้า CREW ใช้ชื่ออื่น ให้แทนที่คำว่า "โพเอน่า/Poena" ทั้งไฟล์ได้ด้วยการค้นแล้วแทน
2. ดำ ประจำปัจฉิม = **นัวร์** (ตรงกับ `{name}` ในไฟล์ pointer-foreman-lines: ดำ/คุโร/นัวร์/ดาร์กเน็ต)
3. เพลิง = อ็อกเนียน · กานต์ = ซิบิล · บุญ = เกรซ (ตามรูปแบบโซน 2: ซาโตริ=กานต์ โกคุ=ทัณฑ์ โฮมุระ=เพลิง คุโร=ดำ เมกุมิ=บุญ)
4. สรรพนามของโพเอน่า อ็อกเนียน ซิบิล เกรซ พ่อค้านรก เป็นการอนุมานจากชื่อและบทบาท ยังไม่ได้เห็นสไปรท์ · ถ้าสไปรท์ขัด (เช่น ซิบิลเป็นชาย) ให้แก้ที่เดียวด้วยการแทน "ดิฉัน/ค่ะ" เป็น "ผม/ครับ" ของคนนั้น
5. ระลอก 3 ของวาลดริกเรียก `crew:'taan'` กับ `crew:'dam'` ตามเดิม (= โพเอน่ากับนัวร์) ข้อความตื่นจากสะกดของสองคนนี้อยู่ 2.5

---

## 1. คดี 0 · มาถึงปัจฉิม: วิญญาณถูกสะกด + เซอร์เบอรัส

### 1.1 ลำดับฉาก
1. มาถึงโซน → คัตซีน `z3-arrive` (2 หน้า) → 2. หน้าต่างแจ้งเตือน N0-1 → 3. สู้วิญญาณถูกสะกด 2-3 ตน (แบนเนอร์ N0-3) → 4. หน้าต่าง N0-4 (เหลือเซอร์เบอรัสที่ประตูล่าง) → 5. เดินลงประตูชายแดนล่าง (เซอร์เบอรัสต้องโผล่ทันที ไม่ต้องเข้า-ออกซ้ำ เหมือนบั๊ก f1/f2 โซน 1) → 6. คัตซีน `z3-cerberus-open` → 7. สู้เซอร์เบอรัส (ท่าบอสตาม boss-skills ข้อ 2.13) → 8. ชนะ `z3-cerberus-win` + N0-6 → 9. ปลดล็อกสร้างสถานที่ · แพ้ `z3-cerberus-lose` + N0-7 ให้ลองใหม่
- ก่อนผ่านข้อ 8 สร้างสถานที่ไม่ได้ (เงื่อนไขเดิมของ `westHypnotized`)
- เบาะแสต้นทางของมนต์: **หมอกที่ลอยลงมาจากคฤหาสน์ริมชายแดนด้านเหนือ** ไม่เอ่ยชื่อวาลดริก (ให้ผู้เล่นเจอชื่อเขาที่คดีครบ 5)

### 1.2 หน้าต่างแจ้งเตือน
**N0-1 · เมื่อมาถึง (แทน alert เดิมของ `westHypnotized`)**
- หัวข้อ: วิญญาณถูกสะกดจิต
- ข้อความ: วิญญาณหลายดวงเดินวนในลานโดยไม่รู้ตัว และสุนัขสามเศียรยืนขวางประตูชายแดนด้านล่าง ปลดมนต์ให้หมดก่อน จึงจะสร้างสถานที่ได้
- ปุ่ม: ไปปลดสะกด
- EN หัวข้อ: Spirits under a spell
- EN ข้อความ: Several spirits are pacing the square without knowing it, and a three-headed hound stands across the lower frontier gate. Break the spell on all of them first. Nothing can be built until you do.
- EN ปุ่ม: Break the spell

**N0-2 · ข้อความบนปุ่ม/ป้ายนำทาง (แทน `west.rescue.approach`)**
- ไทย: เดินเข้าไปปลดสะกดวิญญาณหลงทาง
- EN: Approach the wandering spirits and break the spell

**N0-3 · แบนเนอร์ศึกวิญญาณ**
- ไทย: ปลดสะกด · วิญญาณหลงทาง
- EN: Breaking the spell · wandering spirits

**N0-4 · เมื่อวิญญาณหมดแล้ว**
- หัวข้อ: เหลือผู้พิทักษ์ประตู
- ข้อความ: วิญญาณทุกดวงหลุดจากมนต์แล้ว เหลือเพียงเซอร์เบอรัสที่ยืนขวางประตูชายแดนด้านล่าง เดินลงไปดู
- ปุ่ม: ไปที่ประตู
- EN หัวข้อ: Only the gate guardian remains
- EN ข้อความ: Every spirit is free of the spell. Only Cerberus is left, standing across the lower frontier gate. Walk down and see.
- EN ปุ่ม: To the gate

**N0-5 · แบนเนอร์ศึกเซอร์เบอรัส**
- ไทย: ศึกประตูชายแดน · เซอร์เบอรัส
- EN: Frontier gate · Cerberus

**N0-6 · ชนะ**
- หัวข้อ: เซอร์เบอรัสตื่นแล้ว
- ข้อความ: มนต์สะกดหลุดจากทั้งสามเศียรแล้ว ท่านสร้างสถานที่ได้ตั้งแต่บัดนี้
- ปุ่ม: ต่อ
- EN หัวข้อ: Cerberus is awake
- EN ข้อความ: The spell has left all three heads. You may build from this moment.
- EN ปุ่ม: Continue

**N0-7 · แพ้ (ให้ลองใหม่)**
- หัวข้อ: เซอร์เบอรัสยังไม่ตื่น
- ข้อความ: สามเศียรหยุดหอนไว้ก่อน ท่านตั้งหลักแล้วลองอีกครั้งได้
- ปุ่ม: สู้อีกครั้ง
- EN หัวข้อ: Cerberus is still under the spell
- EN ข้อความ: The three heads fall quiet for now. Steady yourself and try again.
- EN ปุ่ม: Fight again

### 1.3 คัตซีนมาถึง `z3-arrive` (2 หน้า)
```js
'z3-arrive': { title:{ th:'ปัจฉิมที่เงียบเกินไป', en:'A West That Is Too Quiet' }, pages:[
  { title:{ th:'ลูกค้าที่เดินผ่านข้าไปเหมือนข้าเป็นเสา', en:'They Walk Past Me As If I Were a Post' }, line:{ th:
    'บรรยาย: เรือจอดเทียบท่าที่ลานหินปกคลุมหิมะบาง โคมเหล็กเรียงสองข้างทางยังจุดอยู่ แต่ไม่มีใครเดินสวนมา มีเพียงโพเอน่ากับพ่อค้านรกยืนรออยู่ใต้โคมดวงแรก ส่วนไกลออกไปมีวิญญาณสองสามดวงเดินวนเป็นวงช้า ๆ ตาเปิดแต่ไม่มองอะไร\n'
  + 'โพเอน่า: "ท่านมาแล้ว ดี ข้าไม่ถนัดต้อนรับ ดูเอาเอง วิญญาณที่ลงมาปัจฉิมไม่เข้าคิว ไม่ตอบ เดินวนทั้งวันทั้งคืน ข้าเรียกชื่อสามรอบ ไม่มีใครหัน"\n'
  + 'พ่อค้านรก: "ข้ามีของจะขาย แต่ตอนนี้ไม่มีใครซื้อ ลูกค้าทุกคนเดินผ่านข้าไปเหมือนข้าเป็นเสาโคม"',
    en:
    'Narration: The ship docks at a stone square dusted with thin snow. Iron lamps still burn along both sides of the road, but nobody walks toward you. Only Poena and the hell merchant stand waiting under the first lamp. Farther off, two or three spirits circle slowly, eyes open, looking at nothing.\n'
  + 'Poena: "You came. Good. I am no hand at welcomes, so see for yourself. The spirits that reach the West will not queue and will not answer. They walk in circles day and night. I called out names three times. Not one of them turned."\n'
  + 'Hell Merchant: "I have goods to sell, but nobody is buying. Every customer walks past me as if I were a lamp-post."' } },
  { title:{ th:'หมอกที่ไม่ได้หนาว', en:'A Mist That Is Not Cold' }, line:{ th:
    'นิรา: "ท่านคะ ดิฉันตรวจแล้ว ไม่ใช่โรคและไม่ใช่ความลืมค่ะ หมอกบาง ๆ ลอยมาจากชายแดนทางเหนือและตกลงบนบ่าของวิญญาณทุกดวง ดวงที่หมอกหนาที่สุดเดินวนเร็วที่สุดค่ะ"\n'
  + 'โพเอน่า: "และที่ประตูล่างมีผู้พิทักษ์สามเศียรยืนขวางอยู่ ข้าไม่กล้าเข้าใกล้ มันเคยกินอาหารจากมือข้า ตอนนี้มันมองข้าเหมือนไม่รู้จัก"\n'
  + 'ยมบาทน้อย: "ผมเข้าใจครับ ผมจะปลดมนต์วิญญาณพวกนี้ก่อน แล้วค่อยไปที่ประตู ผมไม่อยากให้ใครเจ็บเกินจำเป็น"',
    en:
    'Nira: "Sir, I have examined them. This is neither illness nor forgetting. A thin mist drifts down from the northern frontier and settles on the shoulders of every spirit, and the ones under the thickest mist circle fastest."\n'
  + 'Poena: "And at the lower gate a three-headed guardian stands across the road. I dare not go near. It used to eat from my hand. Now it looks at me as if it had never known me."\n'
  + 'Yama: "I understand. I will break the spell on these spirits first, then go to the gate. I do not want anyone hurt more than needed."' } },
]},
```

### 1.4 บทในฉากสู้วิญญาณถูกสะกด (วิญญาณไม่มีช่องพูด · นิราพูดได้)
- เริ่มสู้ นิรา: "ท่านคะ อย่าฟาดแรงเกินไปนะคะ พวกเขาไม่ได้เจตนา ปลดมนต์ได้แล้วพวกเขาจะหยุดเอง"
  EN Nira: "Sir, please do not strike too hard. They mean no harm. Once the spell is broken they will stop on their own."
- หลังตนแรกล้ม นิรา: "ดวงแรกสร่างแล้วค่ะ เขากำลังถามหาชื่อของตัวเอง"
  EN Nira: "The first one has come to himself. He is asking for his own name."
- หลังตนสุดท้ายล้ม โพเอน่า: "ทุกดวงกลับเข้าคิวแล้ว ข้านับให้ ขอบใจ ที่เหลือคือตัวที่ประตู"
  EN Poena: "All of them are back in the queue. I counted. My thanks. What remains is the one at the gate."

### 1.5 คัตซีนก่อนสู้ `z3-cerberus-open` (2 หน้า)
```js
'z3-cerberus-open': { title:{ th:'สามเศียรที่ไม่รู้จักใคร', en:'Three Heads That Know No One' }, pages:[
  { title:{ th:'ผู้พิทักษ์ประตู', en:'The Gate Guardian' }, line:{ th:
    'บรรยาย: ประตูชายแดนด้านล่างถูกหิมะกลบครึ่งบาน สุนัขสามเศียรร่างใหญ่เท่าเกวียนยืนขวางกลางทาง ดวงตาทั้งหกมีแสงเขียวจางไม่กะพริบ ลมหายใจเป็นไอขาวสามสายพ่นออกพร้อมกันเป็นจังหวะเดียว\n'
  + 'นิรา: "ท่านคะ ดวงตาทั้งหกดวงมีลายสะกดเดียวกัน เป็นมนต์ชั้นเบา แต่แรงพอจะสั่งให้เขาขวางทุกคนที่เข้าใกล้ค่ะ"',
    en:
    'Narration: The lower frontier gate is half buried in snow. A three-headed hound the size of a cart stands across the road, all six eyes lit with a faint unblinking green. Three plumes of white breath leave it together, on a single beat.\n'
  + 'Nira: "Sir, all six eyes carry the same binding mark. It is a light spell, but strong enough to order him to bar everyone who comes near."' } },
  { title:{ th:'ขอโทษล่วงหน้า', en:'An Apology in Advance' }, line:{ th:
    'โพเอน่า: "เซอร์เบอรัสเฝ้าประตูนี้มาก่อนข้าจะเข้าเวร ข้าไม่อยากให้ท่านทำร้ายมัน แต่ถ้าไม่ปลดมนต์ มันจะขวางอยู่อย่างนี้ตลอดไป"\n'
  + 'ยมบาทน้อย: "ผมจะไม่ทำให้เขาเจ็บเกินจำเป็นครับ ผมแค่ต้องทำให้เขาตื่น"\n'
  + 'บรรยาย: สามเศียรก้มลงพร้อมกัน กรงเล็บเกาะพื้นหินจนหิมะแตกกระจาย',
    en:
    'Poena: "Cerberus guarded this gate before I ever took my watch. I do not want you to hurt him. But unless the spell is broken he will bar this road forever."\n'
  + 'Yama: "I will not hurt him more than I must. I only need to wake him."\n'
  + 'Narration: All three heads lower together. Claws bite into the stone and the snow bursts apart.' } },
]},
```
- บรรทัดในฉากสู้ (บรรยาย ไม่ใช่คำพูด · เซอร์เบอรัสไม่พูด): เริ่มสู้ "สามเศียรสูดลมหายใจพร้อมกัน เหมือนยังไม่รู้ว่าใครอยู่ตรงหน้า" · เลือดเหลือครึ่ง "ทั้งสามเศียรสะบัดหัวพร้อมกัน ราวกับสะดุ้งตื่นไปครึ่งหนึ่ง"
  EN start: "All three heads draw breath together, as if still unaware of who stands before them." · EN half: "All three heads shake at once, as if half startled awake."

### 1.6 คัตซีนชนะ/แพ้
```js
'z3-cerberus-win': { title:{ th:'ผู้พิทักษ์ตื่นแล้ว', en:'The Guardian Wakes' }, pages:[
  { title:{ th:'ตื่น', en:'Awake' }, line:{ th:
    'บรรยาย: เศียรซ้ายกะพริบก่อน แล้วเศียรกลาง แล้วเศียรขวา แสงเขียวในดวงตาหลุดลอยเป็นฝอยบางหายไปในหิมะ เซอร์เบอรัสทรุดนั่งลงและครางต่ำสามเสียงซ้อนกันเหมือนถามว่าเกิดอะไรขึ้น\n'
  + 'โพเอน่า: "ตื่นสักที เจ้าตัวโต ข้ารู้ว่าเจ้าไม่ได้ตั้งใจ"',
    en:
    'Narration: The left head blinks first, then the middle, then the right. The green light drifts out of the eyes in thin threads and vanishes into the snow. Cerberus sinks onto his haunches and gives three low whines, stacked together, like a question.\n'
  + 'Poena: "Wake up at last, big one. I know you did not mean it."' } },
  { title:{ th:'หมอกจากทางเหนือ', en:'Mist From the North' }, line:{ th:
    'นิรา: "ท่านคะ ดิฉันขออ่านรอยสะกดที่เหลือบนปลอกคอของเขา ต้นทางไม่ใช่มนต์เก่าของที่นี่ค่ะ เป็นหมอกชุดเดียวกับที่เกาะบ่าวิญญาณ มาจากชายแดนด้านเหนือ"\n'
  + 'ยมบาทน้อย: "ถ้าหมอกมาจากชายแดน ผมคงต้องไปดูด้วยตาตัวเองสักวัน แต่วันนี้ผมต้องสร้างที่ทำงานให้เสร็จก่อนครับ"\n'
  + 'บรรยาย: เซอร์เบอรัสเดินไปนอนขดข้างเสาประตู เศียรทั้งสามวางพิงกันแล้วหลับตา',
    en:
    'Nira: "Sir, I have read the binding marks left on his collar. The source is not an old spell of this place. It is the same mist that clung to the spirits, and it came from the northern frontier."\n'
  + 'Yama: "If the mist comes from the frontier, I will have to see it with my own eyes one day. Today I have to get the workplace built."\n'
  + 'Narration: Cerberus pads over and curls up beside the gatepost, the three heads leaning on one another, eyes closed.' } },
  /* หน้า 3 เป็นของเสริม เปิดด้วยธง Z3_PHANTOM_CLUE (ค่าเริ่มต้นปิด ดูข้อ 10 ข้อ 6) */
  { title:{ th:'ใบเวรที่ถูกแก้', en:'A Duty Roster Altered' }, line:{ th:
    'นิรา: "แต่มีอีกบรรทัดหนึ่งค่ะ ใบเวรของเซอร์เบอรัสที่หอทะเบียนถูกแก้ ช่องหน้าที่จาก \'ผู้พิทักษ์ประตู\' กลายเป็น \'ผู้ขวางประตู\' ด้วยหมึกที่ไม่มีเลขรับรอง รหัสผู้แก้คือ [PHANTOM-404] ค่ะ"\n'
  + 'ยมบาทน้อย: "หมึกชุดเดียวกับที่แก้บัญชีพระนางสีดากับฝูงลิงหรือครับ"\n'
  + 'นิรา: "ใช่ค่ะ ดิฉันยังไม่รู้ว่าเขาต้องการอะไร แต่ดิฉันจะจดไว้ทุกครั้ง"',
    en:
    'Nira: "There is one more line, sir. Cerberus\'s duty roster at the registry has been altered. Under duties, \'Guardian of the gate\' now reads \'Barrier of the gate\', in ink with no certifying number. The alterer\'s code is [PHANTOM-404]."\n'
  + 'Yama: "The same ink that rewrote Lady Sita\'s file and the monkeys\' file?"\n'
  + 'Nira: "Yes, sir. I do not yet know what they want, but I will note it every time."' } },
]},
'z3-cerberus-lose': { title:{ th:'ผู้พิทักษ์ยังไม่ตื่น', en:'The Guardian Is Still Asleep' }, pages:[
  { title:{ th:'ไม่ซ้ำเติม', en:'No Blow Upon a Fallen One' }, line:{ th:
    'บรรยาย: เซอร์เบอรัสหยุดนิ่ง ไม่ก้าวเข้ามาหาผู้ที่ล้มลง ทั้งสามเศียรมองหิมะที่ปลิวเงียบ ๆ เหมือนรอให้ใครตั้งหลักได้\n'
  + 'โพเอน่า: "ลุกเถอะ มันไม่ซ้ำเติมคนที่ล้ม ข้ารู้จักมันดี"',
    en:
    'Narration: Cerberus stops. He does not step toward the one who has fallen. All three heads watch the snow drift in silence, as if waiting for someone to find their feet.\n'
  + 'Poena: "Get up. He will not strike a man who is down. I know him well."' } },
]},
```
- บันทึกสมุด (journal) เฉพาะตอนเปิดหน้า 3: **PHANTOM-404 (ครั้งที่ 3):** ใบเวรของเซอร์เบอรัสที่ประตูชายแดนล่างถูกแก้ด้วยรหัสเดียวกับแฟ้มนางสีดาและฝูงลิง · EN **PHANTOM-404 (third sighting):** Cerberus's duty roster at the lower frontier gate was altered with the same code as Lady Sita's file and the monkeys' file.

### 1.7 รายการภาพคดี 0 → ดูหัวข้อ 8

---

## 2. คดีครบ 5 · วิญญาณหยุดนิ่ง → ปีศาจฝ่าชายแดน 3 ระลอก → วาลดริก

### 2.1 ลำดับฉาก
1. N5-1 + คัตซีน `z3-freeze` → 2. เดินลงชายแดนล่าง → 3. คัตซีน `z3-breach-intro` → 4. ระลอก 1 → 5. ระลอก 2 → 6. **ระลอก 3 = ลูกทีมที่ถูกสะกด** (เล่นคัตซีนเดิม `west-hypnosis` ก่อน) → 7. ตื่นจากสะกด (บท 2.5) → 8. สู้วาลดริก (ฉากสู้ 2.6) → 9. `z3-valdric-down` + N5-5 → 10. คัตซีนพาไปแท่น → 11. หน้าไต่สวนล็อกคำตอบ (2.9) → 12. คัตซีนลงโทษ → 13. คัตซีนปล่อยกลับ + N5-6
- รางวัลหลังชนะ `hypno` (สะกดจิต) ตามเดิม ไม่แก้
- ไม่เพิ่มท่าปิดฉากกลางศึกเหมือนโซน 1-2 (สเปกไม่ได้ขอ · ท่าสะกดจิตที่ได้จากชนะนี้ผูกกับธีมสะกดอยู่แล้ว)

### 2.2 หน้าต่างแจ้งเตือน
**N5-1 · คดีครบ 5 (แทน alert เดิมของ `westVampireBreach`)**
- หัวข้อ: ปัจฉิมหยุดนิ่ง
- ข้อความ: วิญญาณทุกดวงหยุดกลางก้าว ไม่ขยับ ไม่ตอบ และชายแดนด้านล่างมีบางอย่างผิดปกติ เดินลงไปตรวจ
- ปุ่ม: รับทราบ
- EN หัวข้อ: The West stands still
- EN ข้อความ: Every spirit has stopped mid-step. None move, none answer, and something is wrong at the lower frontier. Walk down and look.
- EN ปุ่ม: Understood

**N5-2 · แบนเนอร์ระลอก**
- ไทย: ปีศาจฝ่าชายแดน · ระลอกที่ 1 / ระลอกที่ 2 / ระลอกที่ 3 · ลูกทีมถูกสะกด
- EN: Demons at the frontier · Wave 1 / Wave 2 / Wave 3 · Our own, under the spell

**N5-3 · แบนเนอร์บอส**
- ไทย: ศึกชายแดนปัจฉิม · วาลดริก
- EN: Western frontier · Valdric

**N5-4 · (ว่าง ใช้ไม่ต้อง · ข้ามเลขเพื่อให้ตรงตารางโซน 2)**

**N5-5 · วาลดริกพ่าย → พาไปแท่น**
- หัวข้อ: วาลดริกขอเดินไปแท่น
- ข้อความ: วาลดริกพ่ายแล้ว เขาไม่ขอความเมตตาและเลือกเดินไปที่แท่นตัดสินด้วยตัวเอง
- ปุ่ม: ไปที่แท่น
- EN หัวข้อ: Valdric asks to walk to the dais
- EN ข้อความ: Valdric has fallen. He asks for no mercy and chooses to walk to the judgment dais himself.
- EN ปุ่ม: To the dais

**N5-6 · หลังปล่อยกลับ**
- หัวข้อ: วาลดริกกลับคฤหาสน์
- ข้อความ: วาลดริกรับทัณฑ์เสร็จแล้วและกลับไปยังคฤหาสน์ริมชายแดน แวะไปคุยกับเขาได้
- ปุ่ม: รับทราบ
- EN หัวข้อ: Valdric returns to his manor
- EN ข้อความ: Valdric has served his sentence and gone back to the manor at the edge of the frontier. You may stop by and speak with him.
- EN ปุ่ม: Understood

### 2.3 คัตซีนวิญญาณหยุดนิ่ง `z3-freeze` (1 หน้า)
```js
'z3-freeze': { title:{ th:'หยุดพร้อมกัน', en:'All at Once' }, pages:[
  { title:{ th:'เสียงที่ถูกปิด', en:'The Sound Switched Off' }, line:{ th:
    'บรรยาย: ลานหินกลางปัจฉิมเงียบลงเหมือนมีใครปิดเสียงทั้งโลก วิญญาณที่เดินวนในคิวหยุดกลางก้าวพร้อมกัน หิมะที่ตกบางเบาลอยค้างกลางอากาศชั่วอึดใจ แล้วค่อยตกต่อเมื่อไม่มีใครขยับ\n'
  + 'นิรา: "ท่านคะ ไม่ใช่ความตายซ้ำและไม่ใช่การพักค่ะ ชีพจรบนแฟ้มยังเดิน แต่ตัววิญญาณเหมือนถูกนับให้หยุดไว้ก่อน ต้นทางของแรงนี้อยู่ที่ชายแดนด้านล่างค่ะ"\n'
  + 'โพเอน่า: "ข้าได้กลิ่นหมอกอีกแล้ว ครั้งนี้หนากว่าครั้งก่อนมาก"',
    en:
    'Narration: The stone square at the heart of the West falls silent, as if someone had switched off the whole world. The spirits circling in the queue stop mid-step, all together. The thin snow hangs in the air for a heartbeat, then drifts down again, since nothing is moving to disturb it.\n'
  + 'Nira: "Sir, this is not a second death and not rest. The pulse on every file still runs, but the spirits themselves have been counted still. The source of this force lies at the lower frontier."\n'
  + 'Poena: "I smell the mist again. Thicker this time than before."' } },
]},
```

### 2.4 คัตซีนชายแดน `z3-breach-intro` (2 หน้า)
```js
'z3-breach-intro': { title:{ th:'ชายแดนปัจฉิม', en:'The Western Frontier' }, pages:[
  { title:{ th:'คฤหาสน์เหนือชายแดน', en:'The Manor Above the Frontier' }, line:{ th:
    'บรรยาย: หมอกขาวไหลลงมาตามเนินเหมือนน้ำนมเทลงหุบ ประตูชายแดนเปิดอ้าครึ่งบาน ปีศาจแถวหนึ่งยืนนิ่งในหมอก ตาประกายเหลือง ไกลออกไปบนเนิน หน้าต่างบานใหญ่ของคฤหาสน์เก่าสว่างวาบครั้งหนึ่งแล้วดับลง\n'
  + 'นิรา: "ท่านคะ ดิฉันนับจากฝีเท้าในหมอกแล้ว ปีศาจจะมาสามระลอกค่ะ และระลอกที่สามไม่ใช่ปีศาจทั้งหมด"',
    en:
    'Narration: White mist pours down the slope like milk tipped into a ravine. The frontier gate stands half open. A row of demons waits motionless in the fog, eyes glinting yellow. Far up the hill a great window of an old manor flares once, then goes dark.\n'
  + 'Nira: "Sir, I have counted the footsteps in the mist. The demons will come in three waves, and the third wave is not all demons."' } },
  { title:{ th:'ราตรียังยาว', en:'The Night Is Long' }, line:{ th:
    'ยมบาทน้อย: "ไม่ใช่ปีศาจทั้งหมดหรือครับ"\n'
  + 'นิรา: "ค่ะ ดิฉันได้ยินเสียงโซ่ยมทูตของเราเองอยู่ในหมอกด้วย"\n'
  + 'บรรยาย: นาฬิกาในคฤหาสน์ตีหนึ่งครั้ง แล้วเงียบไปเหมือนไม่เคยมีเสียงนั้น',
    en:
    'Yama: "Not all demons?"\n'
  + 'Nira: "No, sir. I can hear our own reapers\' chains somewhere in the mist."\n'
  + 'Narration: A clock in the manor strikes once, then falls silent as though it never sounded.' } },
]},
```

### 2.5 บทระหว่างระลอกและหลังระลอก 3
- หลังระลอก 1 นิรา: "ระลอกที่หนึ่งผ่านแล้วค่ะ เหลืออีกสองระลอก ปีศาจพวกนี้หลับตาเดินเหมือนวิญญาณในลาน ไม่ใช่ทัพที่ตื่นค่ะ"
  EN Nira: "The first wave is down, sir. Two remain. These demons walk with their eyes shut, like the spirits in the square. This is no army awake."
- หลังระลอก 2 นิรา: "อีกระลอกเดียวค่ะ แต่ดิฉันเริ่มได้ยินเสียงฝีเท้าที่คุ้นหูจากในหมอก ท่านเตรียมใจไว้ก่อนนะคะ"
  EN Nira: "One more, sir. But I have started to hear footsteps I know from inside the mist. Please brace yourself."
- **ระลอก 3: เล่นคัตซีนเดิม `west-hypnosis` ตรงตัว** (วาลดริก: "ลูกน้องสองระลอกล้มลงแล้วหรือ? ..." / ยมบาทน้อย: "ตั้งสติไว้! ข้าจะทำลายมนต์สะกดและพาพวกเจ้ากลับมา") **[เดิม ไม่แก้]**
- หลังระลอก 3 (ตื่นจากสะกด · ใหม่):
  - โพเอน่า: "ข้า ... ข้าทำอะไรลงไป ข้าหวดท่านไปกี่ครั้ง ข้าไม่รู้ตัวเลย หมอกเข้าตาข้าก่อนข้าจะทันเตือนใคร"
    EN Poena: "I ... what did I do? How many times did I strike you? I never knew it. The mist got into my eyes before I could warn anyone."
  - นัวร์: "ผมขอโทษครับ ผมได้ยินเสียงสวดอยู่ในหัว เสียงเดียวบอกว่า 'พักก่อน พักก่อน' ผมก็เลยพัก ... เป็นการพักที่เหนื่อยที่สุดในชีวิตผมเลยครับ"
    EN Noir: "I am sorry, sir. A chant was running in my head, one voice saying 'rest a while, rest a while', so I rested. ... It was the most tiring rest of my life."
  - ยมบาทน้อย: "ไม่เป็นไรครับ ผมไม่เป็นอะไรมาก ขอบคุณที่กลับมา"
    EN Yama: "It is all right. I am not badly hurt. Thank you for coming back."

### 2.6 บทในฉากสู้วาลดริก (วาลดริกพูดได้ · ปีศาจลูกน้องไม่มีช่องพูด)
- เริ่มสู้ วาลดริก: "ขออภัยล่วงหน้า ท่านผู้มาเยือน ข้าไม่ถนัดการเป็นฝ่ายแพ้"
  EN Valdric: "My apologies in advance, honoured guest. I am not practised at losing."
- เลือดเหลือครึ่ง วาลดริก: "ท่านยืนได้ดีกว่าที่ข้าคาด ราตรีของข้าเริ่มสั้นลงแล้ว"
  EN Valdric: "You stand better than I expected. My night is beginning to grow short."
- (ท่า `batStorm` / `sipOfNight` มี `useText` ของตัวเองแล้ว ไม่เขียนซ้ำ)

### 2.7 วาลดริกพ่าย `z3-valdric-down` (1 หน้า)
```js
'z3-valdric-down': { title:{ th:'ข้าขอเดินไปเอง', en:'I Will Walk There Myself' }, pages:[
  { title:{ th:'ไม้เท้าบนหิมะ', en:'A Cane on the Snow' }, line:{ th:
    'บรรยาย: ไม้เท้าหัวค้างคาวหลุดจากมือแล้วกลิ้งไปบนหิมะ วาลดริกคุกเข่าลงข้างเดียว ปัดผงหิมะออกจากโค้ตอย่างเรียบร้อย ฝูงค้างคาวที่เคยหมุนรอบตัวบินกลับเข้าชายเสื้อทีละตัวจนเงียบ\n'
  + 'วาลดริก: "ข้าแพ้แล้ว ท่านผู้มาเยือน ข้าไม่ขอความเมตตา ข้าขอเพียงให้ท่านตัดสินข้าด้วยบัญชีที่ท่านอ่านเอง ไม่ใช่ด้วยหมอกที่ท่านเห็น ข้าจะเดินไปเอง"\n'
  + 'ยมบาทน้อย: "ผมจะอ่านบัญชีของท่านให้จบก่อนครับ แล้วค่อยตัดสิน"',
    en:
    'Narration: The bat-headed cane slips from his hand and rolls across the snow. Valdric goes down on one knee and brushes the snow from his coat with care. The bats that wheeled about him fly back into the lining of his coat, one by one, until all is still.\n'
  + 'Valdric: "I am beaten, honoured guest. I ask no mercy. I ask only that you judge me by the ledger you read yourself, not by the mist you saw. I shall walk there myself."\n'
  + 'Yama: "I will read your ledger to the end first, and then I will judge."' } },
]},
```

### 2.8 คัตซีนพาไปแท่น / ลงโทษ / ปล่อยกลับ
```js
'frontier-west-boss-to-dais': { title:{ th:'พาไปแท่นตัดสิน', en:'To the Dais' }, pages:[
  { title:{ th:'เดินเข้าแสงโคม', en:'Walking Into Lamplight' }, line:{ th:
    'บรรยาย: วาลดริกเดินนำหน้าบนลานหินที่หิมะเริ่มละลายเป็นทางตามรอยโคม ยมบาทน้อยกับนิราเดินตามหลัง ผู้เช่าที่เคยหลับอยู่ในคฤหาสน์ค่อย ๆ ตื่นมายืนสองข้างทาง บางดวงถือผ้าห่มหนา ๆ ไว้ในอ้อมแขน ไม่มีใครพูด ไม่มีใครหลบสายตา',
    en:
    'Narration: Valdric walks ahead across the stone yard where the snow has begun to melt into a trail along the lamplight. Yama and Nira follow. The tenants who once slept in the manor wake little by little and stand along both sides of the road, some with thick blankets in their arms. Nobody speaks. Nobody looks away.' } },
]},
'frontier-west-boss-punished': { title:{ th:'ลงโทษเรียบร้อย', en:'Sentence Served' }, pages:[
  { title:{ th:'ไอร้อนจากกระทะ', en:'Steam From the Pan' }, line:{ th:
    'บรรยาย: วาลดริกนั่งบนขอบกระทะทองแดงที่ตั้งกลางลานโดยไม่ถอดโค้ต ไอร้อนลอยขึ้นปะทะใบหน้าจนน้ำแข็งที่หนวดค่อย ๆ ละลายเป็นหยดตามคาง เขาไม่ร้อง ไม่ขยับ เพียงจ้องไปที่ขอบฟ้าทางตะวันออกที่ยังมืด\n'
  + 'วาลดริก: "ร้อน ... ข้าลืมไปแล้วว่าความร้อนเป็นเช่นนี้ สองร้อยปีที่ข้าไม่ยอมให้ใครในบ้านหลังนั้นรู้สึกอะไรเลย แม้แต่ข้า"',
    en:
    'Narration: Valdric sits on the rim of the copper pan set in the middle of the yard, still wearing his coat. Hot steam rises against his face until the frost in his moustache melts and runs down his chin in drops. He does not cry out or stir. He only gazes at the eastern horizon, still dark.\n'
  + 'Valdric: "Hot. ... I had forgotten what heat is like. Two hundred years I allowed no one in that house to feel anything at all. Not even myself."' } },
]},
'frontier-west-boss-released': { title:{ th:'ปล่อยกลับชายแดน', en:'Returned to the Frontier' }, pages:[
  { title:{ th:'ราตรีสั้นลงหนึ่งคืน', en:'One Night Shorter' }, line:{ th:
    'บรรยาย: เมื่อครบวาระ ยมบาทน้อยเปิดทางให้วาลดริกกลับขึ้นเนินไปยังคฤหาสน์ด้วยตัวเอง เขาหยุดหน้าประตูใหญ่ แล้วดึงม่านหน้าต่างบานหนึ่งเปิดออกครึ่งบาน แสงโคมจากลานสาดเข้าไปในห้องที่มืดมาสองร้อยปี\n'
  + 'วาลดริก: "ข้ายังเป็นเจ้าของบ้านหลังนี้ ท่านผู้มาเยือน แต่ข้าเลิกเป็นเจ้าของราตรีแล้ว ถ้าใครมาแตะชายแดนนี้อีก ข้าจะออกไปยืนขวางเอง และข้าจะไม่ใช้หมอก"',
    en:
    'Narration: When the sentence is done, Yama opens the way and Valdric climbs the hill back to his manor on his own. At the great door he stops and draws one curtain half open. Lamplight from the yard spills into a room that has been dark for two hundred years.\n'
  + 'Valdric: "I am still master of this house, honoured guest, but I am no longer master of the night. If anyone touches this frontier again, I shall go out and stand in the way myself, and I shall not use the mist."' } },
]},
```

### 2.9 สำนวนไต่สวน + สำนวนตัดสิน: วาลดริก
```js
{
  k:'valdric', quest:'z3Valdric', zone:'west', sex:'m', sp:'boss-frontier-west', kind:'twist', calm:true, story:true,
  name:'วาลดริก — เคานต์โลหิตรัตติกาล', en_name:'Valdric, Count of the Crimson Night',
  who:'เจ้าแห่งคฤหาสน์ราตรีริมชายแดนปัจฉิม', en_who:'Lord of the Manor of Night at the Western frontier',
  face:'ชายชราผมขาว หนวดยาวเรียบร้อย โค้ตดำซับแดง ไม้เท้าหัวค้างคาวอยู่ในมือ ยืนตัวตรงเยือกเย็น แต่แก้วไวน์ที่ถืออยู่สั่นนิดเดียวเวลาถูกเอ่ยถึงผู้เช่า',
  en_face:'An old man with white hair and a neatly kept moustache, in a black coat lined with red, a bat-headed cane in hand. He stands upright and cool, but the wine glass he holds trembles faintly whenever his tenants are mentioned.',
  seen:[
    { t:'ใช้หมอกราตรีสะกดวิญญาณหลายสิบดวงให้หลับเกินวาระ ไม่ให้ลงมาตัดสิน และปล่อยให้หมอกลอยไปถึงประตูล่างจนผู้พิทักษ์ถูกสะกด', en:'Used the night mist to keep dozens of spirits asleep past their term so that none came down for judgment, and let the mist drift to the lower gate until its guardian was bound.', s:'mao', w:4 },
    { t:'สะกดยมทูตของผู้ถือบัญชีให้หันอาวุธใส่เพื่อนร่วมทีม', en:'Bound the reaper team of the ledger-keeper and turned their weapons on their own comrades.', s:'bian', w:3 },
  ],
  hidden:[
    { t:'ไม่เคยดื่มเลือดผู้ใดมากว่าสองร้อยปี ปฏิญาณไว้ว่าจะใช้ไวน์แทน ผู้เช่าไม่มีรอยกัดแม้แต่ดวงเดียว', en:'Has drunk no one\'s blood in over two hundred years. He swore to take wine instead. Not one tenant bears a bite mark.', s:'kha', w:-2 },
    { t:'ผู้เช่าส่วนใหญ่หนีมาเอง เพราะกลัวว่าการตัดสินจะพรากความทรงจำของคนที่รักไป เขาจึงให้หลับแทนที่จะให้ตื่นไปเผชิญ', en:'Most tenants fled to him of their own accord, afraid that judgment would take the memory of those they loved. He let them sleep rather than wake and face it.', s:'bian', w:-1 },
    { t:'ไม่ได้สั่งให้เซอร์เบอรัสขวางประตู แต่รู้ว่าหมอกลอยไปถึงประตูล่างแล้วเพิกเฉยมานานหลายวัน', en:'He never ordered Cerberus to bar the gate, but he knew the mist had reached the lower gate and ignored it for days.', s:'mao', w:2 },
  ],
  merits:[
    { t:'ดูแลผู้เช่าที่ไม่มีใครรับสองร้อยปี ไม่ให้ใครอด หนาว หรือถูกทำร้าย', en:'For two hundred years kept unclaimed tenants fed, warm and unharmed.', v:2, fake:false },
    { t:'อ้างว่าผู้เช่าทุกดวงอยู่กับเขาโดยสมัครใจ', en:'Claims every tenant stayed of their own free will.', v:1, fake:true },
  ],
  line:'"ราตรียังยาวนัก ท่านผู้มาเยือน ข้าเพียงรักษาไม่ให้ใครต้องตื่นไปพบสิ่งที่เขายังไม่พร้อมพบ"',
  en_line:'"The night is long yet, honoured guest. I only kept anyone from waking to what they were not ready to meet."',
  claims:[
    { kind:'deny', t:'ข้าไม่เคยสะกดผู้ใดโดยไม่ได้รับอนุญาต ผู้เช่าทุกดวงเซ็นสัญญาเช่าด้วยตัวเอง', en:'I never bound anyone without leave. Every tenant signed his lease himself.',
      reveal:'"...สัญญาน่ะหรือ ข้อความเขียนว่า \'จนกว่าราตรีจะสิ้น\' และข้าไม่เคยปล่อยให้ราตรีสิ้น"', en_reveal:'"...The lease? It reads \'until the night is over\', and I never once let the night be over."' },
    { kind:'boast', t:'ท่านดูบุญของข้าด้วย ผู้เช่าทุกดวงอยู่กับข้าโดยสมัครใจ', en:'Count my merit too: every tenant stayed with me willingly.',
      merit:'อ้างว่าผู้เช่าทุกดวงอยู่กับเขาโดยสมัครใจ',
      reveal:'ท่านถามว่ามีผู้เช่าดวงไหนขอตื่นแล้วได้ตื่นบ้าง เขานิ่งไป — ไม่มีใครขอ เพราะเขาไม่เคยให้โอกาสผู้ใดถามว่าอยากตื่นหรือไม่', en_reveal:'You ask whether any tenant who asked to wake was allowed to. He falls silent. None asked, because he never gave anyone the chance to ask.' },
    { kind:'solid', t:'เรื่องสะกดยมทูตของท่านให้หันอาวุธใส่กัน ข้ายอมรับ ข้าทำ ข้าคิดว่าท่านจะมาปิดราตรีของข้า', en:'As for binding your reapers against one another, I admit it. I did it. I thought you had come to end my night.' },
    { kind:'solid', truth:true, t:'ข้าไม่เคยดื่มเลือดผู้ใด ตั้งแต่ข้าปฏิญาณไว้เมื่อสองร้อยปีก่อน บัญชีไวน์ของข้าครบทุกวัน', en:'I have drunk no one\'s blood since I swore my vow two hundred years ago. My wine ledger is complete for every day.',
      reveal:'ยมบาทน้อยเปิดสมุดห้องเก็บไวน์ พบบันทึกขวดทุกวันตลอดสองร้อยปี ไม่มีบรรทัดใดขาด และไม่มีรอยกัดบนผู้เช่าสักดวง', en_reveal:'Yama opens the cellar book and finds a bottle logged for every day of two hundred years, no line missing, and not a single bite on any tenant.' },
  ],
  secret:'ส่องกระจกแล้วพบแก้วไวน์ที่ไม่เคยพร่อง และสมุดผู้เช่าที่ทุกชื่อมีรอยนิ้วหัวแม่มือเขียนคำขอว่า "ขอพักก่อน" แต่ไม่มีช่อง "ขอตื่น"', en_secret:'The mirror shows a wine glass never emptied, and a tenant book where every name carries a thumbprint beside the words "let me rest a while", with no box for "let me wake".',
}
```
**สำนวนตัดสิน (ล็อกคำตอบ เหมือนบอสชายแดนโซน 1-2 · เป็นข้อเสนอ ให้คุณเป้ยืนยัน ข้อ 10 ข้อ 2)**
- นิราอ่าน: "ความผิดของวาลดริก คือใช้หมอกราตรีสะกดวิญญาณหลายสิบดวงให้หลับเกินวาระ ปล่อยหมอกลอยไปถึงประตูล่างจนผู้พิทักษ์ถูกสะกด และสะกดยมทูตของผู้ถือบัญชีให้หันอาวุธใส่กัน แม้ไม่มีผู้ใดถึงชีวิต ความดีที่นำมาหักได้ คือไม่ดื่มเลือดผู้ใดมาสองร้อยปี ไม่ปล่อยให้ผู้เช่าหนาวหรืออดค่ะ"
  EN Nira: "Valdric's offences are these: using the night mist to keep dozens of spirits asleep past their term, letting it drift to the lower gate until its guardian was bound, and binding the ledger-keeper's reapers against one another. No one was killed. The good that may be set against it is that he drank no blood for two hundred years and let no tenant go cold or hungry."
- ยมบาทน้อย: "ผมสั่งทัณฑ์ระดับปานกลางที่กระทะทองแดงครับ ให้ท่านได้รู้สึกร้อนจริง ๆ สักครั้ง แล้วเปิดหน้าต่างของท่านเอง"
  EN Yama: "I sentence you to a middling penance at the copper pan. Feel heat in earnest, just once, and then open your own windows."
- วาลดริก: "ความร้อนที่ทำให้ข้ารู้สึกอีกครั้ง ข้ารับ โทษนี้ข้ามองหน้าตัวเองได้"
  EN Valdric: "A heat that lets me feel again, I accept. This is a sentence I can face myself in."
- สถานีที่ล็อก (เสนอ): `krata` กระทะทองแดง · ชนิดบาป `mao` (มัวเมา) · ระดับปานกลาง (3 จาก 5) · เหตุผล: ความผิดหลักคือมัวเมาในราตรียาวของตัวเอง (กระทะ = "ทอดจนกว่าจะรู้สึกตัว" ตามคำอธิบายสถานีในโค้ด) · ไม่มีภาพเลือดหรือการกัด · ข้อความร้อน/น้ำแข็งละลายใน `frontier-west-boss-punished` ตรงกับสถานีนี้ ถ้าคุณเป้เลือกสถานีอื่น ต้องแก้หน้านั้นหน้าเดียว

### 2.10 ภาพคดีครบ 5 → ดูหัวข้อ 8

---

## 3. คดีครบ 10 · เอียร์ลิน วาลคีรี มาช้าไปก้าวเดียว → ทดสอบด้วยหอก

### 3.1 ลำดับฉาก
1. คดีครบ 10 → **คัตซีนเดิม `deva-west` (ใช้ตรงตัว ไม่แตะ)** → 2. N10-1 (รออยู่) → 3. ผู้เล่นเดินไปคุย (พูดสุ่มหนึ่งบรรทัด 3.4) → 4. N10-2 (ยืนยัน) → 5. คัตซีน `z3-eirlin-open` → 6. สู้ → 7. ชนะ `z3-eirlin-win` ได้ท่าหอกวาลคีรี (ของเดิม `valkyrieSpear`) แล้วเอียร์ลินบินกลับฟ้า (ไม่ยืนค้างบนแผนที่ ตามบั๊ก e1 โซน 1) / แพ้ `z3-eirlin-lose`
- จุดที่เธอยืนรอ ต้องเป็นจุดที่เดินถึง (ที่โซน 2 Toby พบว่าจุดเดิมเป็นหน้าผาบนพื้น 2×) · โซน 3 ให้ตรวจเหมือนกัน

### 3.2 หน้าต่างแจ้งเตือน
**N10-1 · เมื่อฉากเดิมจบ**
- หัวข้อ: เทวดาผู้ตรวจรอท่านอยู่
- ข้อความ: เอียร์ลิน ผู้ตรวจหอกวาคิวรี ลงมาช้าไปก้าวเดียว และรออยู่เพื่อทดสอบท่าน เตรียมทีมให้พร้อมแล้วเดินไปคุยกับเธอ
- ปุ่ม: รับทราบ
- EN หัวข้อ: The inspector awaits you
- EN ข้อความ: Eirlin, spear-inspector of the Valkyries, arrived one step too late and now waits to test you. Ready your team and go speak with her.
- EN ปุ่ม: Understood

**N10-2 · เมื่อกดคุย (แทน alert เดิมของ `westDevaTest` ถ้าอยากได้ฉบับมีชื่อ · ของเดิม "เทวดามาปราบแวมไพร์ แต่ยมบาทน้อยปราบไปแล้ว จึงขอทดสอบฝีมือ" ใช้ต่อได้ ไม่ผิด)**
- หัวข้อ: เทวดาทดสอบแห่งปัจฉิม
- ข้อความ: เอียร์ลิน ผู้ตรวจหอกวาคิวรี มาปราบแวมไพร์ไม่ทัน จึงขอทดสอบท่านด้วยหอก เธอไม่ใช่ศัตรู แต่อยากเห็นว่าท่านยืนได้เมื่อหอกพุ่งเข้าหา
- ปุ่ม: รับการทดสอบ / ยังก่อน
- EN หัวข้อ: The West's deva tests you
- EN ข้อความ: Eirlin, spear-inspector of the Valkyries, came too late for the vampire and asks to test you with her spear instead. She is no enemy. She wants to see you stand when the spear comes.
- EN ปุ่ม: Take the test / Not yet

**N10-3 · แบนเนอร์**
- ไทย: ศึกทดสอบหอกวาลคีรี · เอียร์ลิน
- EN: Valkyrie spear test · Eirlin

**N10-4 · ชนะ**
- หัวข้อ: ผ่านการทดสอบของเอียร์ลิน
- ข้อความ: ท่านผ่านการทดสอบของเอียร์ลิน หอกถูกเก็บเข้าฝักแล้ว
- ปุ่ม: ต่อ
- EN หัวข้อ: You passed Eirlin's test
- EN ข้อความ: You have passed Eirlin's test. The spear is sheathed.
- EN ปุ่ม: Continue

**N10-5 · แพ้ (ให้ลองใหม่)**
- หัวข้อ: หอกหยุดชั่วคราว
- ข้อความ: เอียร์ลินลดหอกลงก่อน ท่านตั้งหลักแล้วลองอีกครั้งได้
- ปุ่ม: ทดสอบอีกครั้ง
- EN หัวข้อ: The spear pauses
- EN ข้อความ: Eirlin lowers her spear for now. Steady yourself and try again.
- EN ปุ่ม: Test again

**N10-6 · ของรางวัล** ดึงจาก `ABILITY_REWARDS.valkyrieSpear` ของเดิม (หอกวาลคีรี · "กวาดแทงศัตรูทุกคนด้วยหอก ความเสียหายต่อคนเท่าเดิม") ไม่เพิ่มรางวัลซ้ำ

### 3.3 บทในฉากสู้ (เอียร์ลินพูดได้)
- เริ่มสู้ เอียร์ลิน: "ให้ข้าเห็นว่าเจ้ายืนได้นะ"
  EN Eirlin: "Show me you can stand."
- เลือดเหลือครึ่ง เอียร์ลิน: "ดี! เจ้ายังไม่ถอยสักก้าว"
  EN Eirlin: "Good! You have not given one step."

### 3.4 คำพูดเมื่อคุยก่อนรับการทดสอบ (สุ่มหนึ่งบรรทัด ไม่ใบ้คำตอบคดี)
1. "ไม่ต้องรีบหรอกเจ้าตัวเล็ก ข้ามาช้าเองแท้ ๆ รอเจ้าอีกหน่อยไม่ตาย" · EN: "No hurry, little one. I was the late one. I can wait for you a while longer."
2. "จัดทีมให้เรียบร้อยก่อน ข้าไม่นับว่าการเตรียมตัวเป็นความขี้ขลาด" · EN: "Sort out your team first. I do not count preparation as cowardice."
3. "ข้าเลือกคนที่ล้มในศึกมาตลอด วันนี้ไม่มีใครล้มให้เลือก ก็เลยอยากเลือกคนที่ยืนอยู่แทน" · EN: "All my life I have chosen those who fell in battle. Today no one fell to choose, so I would rather choose someone who is still standing."

### 3.5 คัตซีนเปิดศึก `z3-eirlin-open` (2 หน้า)
```js
'z3-eirlin-open': { title:{ th:'หอกวาลคีรี', en:'The Valkyrie\'s Spear' }, pages:[
  { title:{ th:'ข้าชื่อเอียร์ลิน', en:'My Name Is Eirlin' }, line:{ th:
    'บรรยาย: เอียร์ลินยืนบนลานหินที่เพิ่งเลิกมีหมอก หอกสีฟ้าขาวปักปลายลงพื้น ปีกทั้งสองข้างพับแนบหลังเหมือนนกที่ยังไม่อยากหุบจริง ๆ\n'
  + 'เอียร์ลิน: "ข้าชื่อเอียร์ลิน วาลคีรี ผู้ตรวจหอก ข้าตามเสียงศึกจากทะเลเหนือมาสามวัน มาถึงปุ๊บศึกจบปั๊บ ข้ายังไม่ทันเห็นหน้าแวมไพร์ด้วยซ้ำ"\n'
  + 'ยมบาทน้อย: "เขาไปรับทัณฑ์ที่แท่นตัดสินแล้วครับ ผมไม่ได้ปลิดชีพเขา"',
    en:
    'Narration: Eirlin stands on the stone square, now clear of mist, her blue-white spear planted point-down. Her wings are folded against her back like a bird not quite willing to close them.\n'
  + 'Eirlin: "I am Eirlin, Valkyrie, inspector of the spear. I followed the sound of battle from the northern sea for three days. I arrive and the battle is over, just like that. I have not even seen the vampire\'s face."\n'
  + 'Yama: "He has served his sentence at the judgment dais. I did not take his life."' } },
  { title:{ th:'ผู้ที่ยืนอยู่', en:'The One Still Standing' }, line:{ th:
    'เอียร์ลิน: "รับทัณฑ์ ไม่ใช่ปลิดชีพหรือ น่าสนใจ วาลคีรีอย่างข้ามีหน้าที่เดียว คือเลือกนักรบที่ล้มในศึกไปยังวัลฮัลลา ข้าไม่เคยต้องถามว่าใครควรอยู่ต่อ แต่วันนี้ไม่มีใครล้มให้ข้าเลือก ข้าเลยอยากเลือกคนที่ยืนอยู่แทน"\n'
  + 'เอียร์ลิน: "หอกข้าไม่ได้วัดว่าเจ้าแรงแค่ไหน มันวัดว่าเจ้าถอยหรือไม่ เมื่อพร้อมก็ยกอาวุธขึ้นเถอะ เจ้าตัวเล็ก"\n'
  + 'บรรยาย: เอียร์ลินยกหอกขึ้นเหนือไหล่ แสงฟ้าขาวไล่ตามด้ามหอกจนถึงปลาย',
    en:
    'Eirlin: "A penance, not a killing? Interesting. A Valkyrie has one task: to choose the warriors who fall in battle and carry them to Valhalla. I have never had to ask who ought to stay. Today no one fell for me to choose, so I would rather choose the one who is still standing."\n'
  + 'Eirlin: "My spear does not measure how strong you are. It measures whether you give ground. When you are ready, lift your weapon, little one."\n'
  + 'Narration: Eirlin raises the spear over her shoulder. Blue-white light runs along the shaft to the tip.' } },
]},
```

### 3.6 คัตซีนชนะ/แพ้
```js
'z3-eirlin-win': { title:{ th:'ผ่านหอก', en:'Past the Spear' }, pages:[
  { title:{ th:'ไม่ถอย', en:'No Retreat' }, line:{ th:
    'เอียร์ลิน: "พอ! ข้าไม่ต้องเลือกเจ้าหรอก เจ้าเลือกที่จะยืนเองตั้งแต่ก้าวแรก ฝีมือไม่ธรรมดานิ ข้าพูดจริง"\n'
  + 'บรรยาย: เอียร์ลินหมุนหอกเก็บไว้ข้างลำตัว แล้วยื่นปลายด้ามให้ยมบาทน้อยแตะเบา ๆ แสงฟ้าขาวไหลจากหอกเข้าสู่มือเขา',
    en:
    'Eirlin: "Enough! I have no need to choose you. You chose to stand yourself, from the very first step. Not bad at all, you know. I mean it."\n'
  + 'Narration: Eirlin spins the spear back to her side and offers the butt end for Yama to touch lightly. Blue-white light flows from the spear into his hand.' } },
  { title:{ th:'ท่าหอกกับคลื่นที่ถอย', en:'The Spear Technique, and a Tide That Drew Back' }, line:{ th:
    'เอียร์ลิน: "ท่าหอกนี้ข้าใช้เวลาหลายร้อยปีฝึก ข้ายกให้เจ้า ใช้ให้ดี อย่าเอามาแทงคนที่ไม่ยืนขวาง"\n'
  + 'เอียร์ลิน: "อีกเรื่อง ตอนข้าบินผ่านชายแดน คลื่นถอยออกไปไกลกว่าน้ำลงตามปกติ ถ้าเจ้าเห็นอะไรผิดจังหวะที่นั่น อย่าชะล่าใจ มีบางอย่างกำลังขยับตัวอยู่ใต้น้ำ"\n'
  + 'นิรา: "ดิฉันจะบันทึกไว้ค่ะ"\n'
  + 'บรรยาย: เอียร์ลินกางปีก ลมหิมะม้วนเป็นเกลียวพาร่างขึ้นฟ้า ลานเหลือเพียงขนนกขาวใบเดียวลอยตกลงช้า ๆ',
    en:
    'Eirlin: "It took me several hundred years to learn this spear technique. I give it to you. Use it well. Do not spend it on anyone who is not standing in your way."\n'
  + 'Eirlin: "One more thing. When I flew over the frontier, the tide had drawn back farther than any ordinary ebb. If you see anything out of rhythm there, do not grow careless. Something is stirring under the water."\n'
  + 'Nira: "I will note it down."\n'
  + 'Narration: Eirlin spreads her wings. A spiral of snowy wind lifts her skyward, and a single white feather drifts slowly down onto the empty square.' } },
]},
'z3-eirlin-lose': { title:{ th:'หอกหยุดชั่วคราว', en:'The Spear Pauses' }, pages:[
  { title:{ th:'ข้ารอได้', en:'I Can Wait' }, line:{ th:
    'เอียร์ลิน: "ลุกเถอะเจ้าตัวเล็ก หอกข้าไม่ทิ้งคนที่ล้ม ตั้งหลักได้เมื่อไหร่ค่อยมาใหม่ ข้ารอได้ ข้ามาช้ามาเองด้วยซ้ำ"\n'
  + 'บรรยาย: เอียร์ลินปักหอกลงพื้นแล้วยืนนิ่ง',
    en:
    'Eirlin: "Get up, little one. My spear does not strike a man who is down. Come again when you have your footing. I can wait. I was the late one, after all."\n'
  + 'Narration: Eirlin plants her spear in the ground and stands still.' } },
]},
```
- บรรทัด "คลื่นถอยออกไปไกลกว่าน้ำลง" เป็นเกร็ดปูทางไปยอร์มุนกันดร์ (คดีครบ 15) ตัดได้โดยไม่กระทบเนื้อเรื่อง

### 3.7 ภาพคดีครบ 10
ไม่ต้องวาดใหม่: ใช้ภาพฉากเดิม `img/deva-intro/deva-intro-west-v1.webp` (ที่ `deva-west` ใช้อยู่) กับทุกหน้าของ `z3-eirlin-*` และสไปรท์ `boss-tester-west` เดิม · การ์ดท่า `cut-eirlin-spearrain-west` อยู่ใน boss-skills แล้ว (ตรวจชื่อไฟล์จริง)

---

## 4. คดีครบ 15 · เซเวอรินมาพร้อมยอร์มุนกันดร์ (บอสโซน ไม่ถูกตัดสิน)

### 4.1 ลำดับฉาก
1. N15-1 → 2. เซเวอรินเดินเข้าประตูชายแดนล่างไปท่าเรือ (คุยได้) → 3. คัตซีน `z3-sev-open` → 4. **สู้ยอร์มุนกันดร์ก่อน** (N15-2) → 5. ชนะ `z3-jorm-yields` + N15-4 → 6. **สู้เซเวอริน** (N15-3) → 7. ชนะ: เล่นคัตซีน `z3-sev-win` → แผงเดิม `STORY.west` 2 แผง (ได้ผนึกน้ำแข็ง) → boss-guide เดิม (ชม → ยืนรอที่ประตูชายแดน → welcome → farewell + เงิน 1,200 + ชุด) · ไม่ผ่านแท่นตัดสิน
- แพ้ยอร์มุนกันดร์: เล่น `z3-jorm-lose` ลองใหม่ · **แพ้เซเวอริน: เสนอให้ไม่ต้องสู้ยอร์มุนกันดร์ซ้ำ** (ข้อ 10 ข้อ 5)
- ลำดับแผงเดิม: `z3-sev-win` ผมเขียนไม่ทับเนื้อหาแผงเดิม (แผงเป็นบรรยายยอมรับ + ผนึกน้ำแข็ง) ถ้า Toby เล่นแผงก่อน ให้สลับได้ ไม่ต้องแก้ข้อความ

### 4.2 หน้าต่างแจ้งเตือน
**N15-1 · แจ้งเตือน**
- หัวข้อ: ผู้ตรวจบัญชีแห่งปัจฉิมมาถึงแล้ว
- ข้อความ: เซเวอริน อัศวินบัญชีปัจฉิม เดินเข้าประตูชายแดนด้านล่างมุ่งหน้าสู่ท่าเรือ โดยมีบางสิ่งใหญ่โตเลื้อยตามหลังมาในแม่น้ำ ไปคุยกับเขาที่ท่าเรือ
- ปุ่ม: ไปที่ท่าเรือ
- EN หัวข้อ: The West's auditor has arrived
- EN ข้อความ: Severin, the Knight of the Western Ledger, walks through the lower frontier gate toward the pier, with something vast sliding along behind him in the river. Go and speak with him at the pier.
- EN ปุ่ม: To the pier

**N15-2 · แบนเนอร์ศึกอสรพิษ** ไทย: ศึกอสรพิษโลก · ยอร์มุนกันดร์ · EN: The World-Serpent · Jörmungandr
**N15-3 · แบนเนอร์ศึกบอส** ไทย: ศึกบอสปัจฉิม · เซเวอริน · EN: Western zone boss · Severin
**N15-4 · หลังชนะยอร์มุนกันดร์**
- หัวข้อ: อสรพิษโลกถอยแล้ว
- ข้อความ: ยอร์มุนกันดร์คลายขดและจมลงสู่แม่น้ำวิญญาณ เซเวอรินก้าวขึ้นท่าเรือมาเอง
- ปุ่ม: สู้ต่อ
- EN หัวข้อ: The World-Serpent withdraws
- EN ข้อความ: Jörmungandr loosens its coils and sinks into the river of souls. Severin steps up onto the pier himself.
- EN ปุ่ม: Fight on

**N15-5 · แพ้ยอร์มุนกันดร์** หัวข้อ: อสรพิษโลกรออยู่ · ข้อความ: ยอร์มุนกันดร์หยุดนิ่งไว้ก่อน ท่านตั้งหลักแล้วสู้อีกครั้งได้ · ปุ่ม: สู้อีกครั้ง
EN: The World-Serpent waits / Jörmungandr holds still for now. Steady yourself and fight again. / Fight again
**N15-6 · แพ้เซเวอริน** หัวข้อ: เซเวอรินรอท่านอยู่ · ข้อความ: เซเวอรินปิดสมุดบัญชีไว้ก่อน ท่านตั้งหลักแล้วสู้อีกครั้งได้ · ปุ่ม: สู้อีกครั้ง
EN: Severin awaits you / Severin closes his ledger for now. Steady yourself and fight again. / Fight again

### 4.3 คัตซีนเปิดศึก `z3-sev-open` (4 หน้า · แทน `bossArrive` 4 บรรทัดเดิมของ `ZONES.west`)
บรรทัดที่ทำเครื่องหมาย **[เดิม]** คือ 4 บรรทัดเดิมใน `data.js` ~2114-2117 ใช้ตรงตัว · ที่เหลือเป็นของใหม่
```js
'z3-sev-open': { title:{ th:'ผู้ตรวจบัญชีปัจฉิม', en:'The Auditor of the West' }, pages:[
  { title:{ th:'บัญชีที่ท่าเรือ', en:'Accounts at the Pier' }, line:{ th:
    'บรรยาย: เรือสินค้าลำเดียวเทียบท่าเรือฝั่งขวา ไม่มีธงและไม่มีลูกเรือ ชายร่างสูงในเกราะเงินลายกะโหลกสีน้ำเงินก้าวลงมาพร้อมสมุดบัญชีเล่มหนาหนีบใต้แขน น้ำแม่น้ำวิญญาณด้านหลังเขากระเพื่อมเป็นวงใหญ่ แล้วค่อยกระเพื่อมเป็นวงที่ใหญ่กว่านั้น\n'
  + 'เซเวอริน: "ข้าเป็นคู่แข่งของฮาลวาร์ หัวหน้าโซน 3 และบัลลังก์ปัจฉิมควรเป็นของข้า"   /* [เดิม] */',
    en:
    'Narration: A single merchant ship docks at the right-hand pier, without flag or crew. A tall man in silver armour patterned with blue skulls steps down, a thick ledger under his arm. Behind him the river of souls ripples in a wide ring, and then in a wider one.\n'
  + 'Severin: "I am Halvar\'s rival, the head of Zone 3, and the throne of the West ought to be mine."' } },
  { title:{ th:'สิ่งที่โผล่จากน้ำ', en:'What Rose From the Water' }, line:{ th:
    'เซเวอริน: "เจ้าก็แค่เด็กน้อย จะมีฝีมือปกครองดินแดนนี้ได้อย่างไร ข้าไม่ยอมรับ!"   /* [เดิม] */\n'
  + 'บรรยาย: ผืนน้ำหลังเขายกตัวขึ้นเป็นกำแพงเกล็ดสีเทาน้ำเงิน หางขนาดเท่าเสาประภาคารโผล่พ้นผิวน้ำแล้วฟาดลงจนเรือสินค้าโคลงเคลง\n'
  + 'นิรา: "ท่านคะ นั่น ... นั่นคืออสรพิษที่ล้อมโลกทั้งใบ ดิฉันเคยเห็นแต่ในหนังสือค่ะ"',
    en:
    'Severin: "You are only a child. How could you have the skill to rule this land? I do not accept it!"\n'
  + 'Narration: The water behind him heaves up into a wall of blue-grey scales. A tail the size of a lighthouse mast breaks the surface and crashes down, and the merchant ship rocks hard.\n'
  + 'Nira: "Sir, that is ... that is the serpent that circles the whole world. I have only seen it in books."' } },
  { title:{ th:'หลักประกัน', en:'Collateral' }, line:{ th:
    'เซเวอริน: "ข้าไม่ได้นำทหารมา ข้านำหลักประกัน ยอร์มุนกันดร์ ผู้ล้อมโลกหนึ่งรอบแล้วกัดหางตัวเอง ยอดรวมของโลกอยู่ในขดของมันทั้งหมด ข้าขอยืมมาสอบทานเจ้า ตัวเลขที่ผ่านมันไม่ได้ ก็ไม่ควรถือบัญชีที่นี่"\n'
  + 'บรรยาย: ดวงตาสีเหลืองซีดของอสรพิษเปิดขึ้นช้า ๆ ไม่มีความโกรธ มีแต่ความง่วงของผู้ที่ถูกปลุกมาโดยไม่ได้ต้องการ',
    en:
    'Severin: "I brought no soldiers. I brought collateral: Jörmungandr, who circles the world once and bites his own tail. The world\'s whole balance lies in his coils. I have borrowed him to audit you. Figures that cannot get past him have no business keeping the ledger here."\n'
  + 'Narration: The serpent\'s pale yellow eye opens slowly. There is no anger in it, only the weariness of one woken without wanting to be.' } },
  { title:{ th:'ถ้าอยากรู้ว่าข่าวจริงแค่ไหน', en:'If You Want to Know How True the Rumour Is' }, line:{ th:
    'ยมบาทน้อย: "ถ้าอยากรู้ว่าข่าวจริงแค่ไหน ก็มาลองดูสิ"   /* [เดิม] */\n'
  + 'เซเวอริน: "ตามนั้น เตรียมตัวให้ดี"   /* [เดิม] */\n'
  + 'บรรยาย: เซเวอรินถอยไปหลังเสาท่าเรือ เปิดสมุดบัญชีทีละหน้า อสรพิษโลกเลื้อยขึ้นมาขวางระหว่างเขากับทีมของท่าน',
    en:
    'Yama: "If you want to know how true the rumour is, come and try me."\n'
  + 'Severin: "As you wish. Prepare yourself well."\n'
  + 'Narration: Severin retreats behind a pier post and turns his ledger page by page. The world-serpent slides up to bar the way between him and your team.' } },
]},
```

### 4.4 บทในฉากสู้ (ยอร์มุนกันดร์บรรยายล้วน · เซเวอรินพูดได้)
- ศึกอสรพิษ เริ่มสู้ (บรรยาย): "ยอร์มุนกันดร์เลื่อนขดช้า ๆ เหมือนยังไม่รู้ว่าใครอยู่ตรงหน้า"
  EN: "Jörmungandr shifts his coils slowly, as if not yet aware who stands before him."
- ศึกอสรพิษ เลือดเหลือครึ่ง (บรรยาย): "ลำตัวใหญ่สั่นสะท้านทั้งสาย เหมือนเพิ่งรู้ว่ามีผู้ยืนอยู่"
  EN: "The vast body shudders along its whole length, as if only now aware that someone is standing there."
- ศึกเซเวอริน เริ่มสู้: "ข้าตรวจตัวเลขของเจ้าสองรอบแล้ว ลงมือได้"
  EN Severin: "I have checked your figures twice. You may begin."
- ศึกเซเวอริน เลือดเหลือครึ่ง: "ยอดยังไม่ปิด! ข้ายังเหลืออีกหนึ่งหน้า"
  EN Severin: "The account is not closed! I still have one more page."

### 4.5 คัตซีนอสรพิษถอย `z3-jorm-yields` (2 หน้า)
```js
'z3-jorm-yields': { title:{ th:'คลายขด', en:'The Coil Loosens' }, pages:[
  { title:{ th:'ไม่ล้ม แต่ถอย', en:'Not Fallen, Withdrawn' }, line:{ th:
    'บรรยาย: ขดทั้งหมดของยอร์มุนกันดร์คลายออกช้า ๆ จนชั่วขณะหนึ่งปลายหางโผล่พ้นน้ำทั้งที่ควรอยู่ในปาก มันหันมามองยมบาทน้อยนิ่ง ๆ เหมือนผู้เฒ่าที่รู้ว่ายังไม่ใช่เวลาของตน แล้วจมลงสู่แม่น้ำวิญญาณโดยไม่มีคลื่น\n'
  + 'นิรา: "ท่านคะ ดิฉันไม่เห็นเขาล้มค่ะ เห็นเพียงเขาตัดสินใจกลับไป"\n'
  + 'ยมบาทน้อย: "ผมก็รู้สึกอย่างนั้นครับ ขอบคุณที่ไม่ฝืนถึงที่สุด"',
    en:
    'Narration: Jörmungandr\'s coils loosen slowly, until for a moment the tip of his tail lies free of the water when it should be in his mouth. He turns and looks at Yama without moving, like an old one who knows this is not yet his hour, then sinks into the river of souls without a ripple.\n'
  + 'Nira: "Sir, I did not see him fall. I saw him decide to go back."\n'
  + 'Yama: "I felt the same. Thank you for not forcing it to the end."' } },
  { title:{ th:'ยอดนี้ ข้าขอปิดเดี๋ยวนี้', en:'I Close This Account Now' }, line:{ th:
    'เซเวอริน: "ข้าไม่เคยเห็นยอร์มุนกันดร์ถอยให้ใครมาก่อน ในบัญชีของข้าไม่เคยมีบรรทัดนั้น ข้าจะบันทึกใหม่ แล้วค่อยคิดยอดของเจ้าอีกครั้ง"\n'
  + 'บรรยาย: เซเวอรินเปิดสมุดเล่มหนา เปลวสีน้ำเงินลามจากฝ่ามือตามแขนทีละนิ้ว\n'
  + 'เซเวอริน: "ยอดนี้ ข้าขอปิดเดี๋ยวนี้! ขึ้นมาเถอะ เด็กน้อย"',
    en:
    'Severin: "I have never seen Jörmungandr give ground to anyone. There is no such line in my books. I shall record it anew, and then work out your total once more."\n'
  + 'Narration: Severin opens the thick ledger. Blue flame creeps from his palm up his arm, one finger at a time.\n'
  + 'Severin: "I close this account now! Come up here, child."' } },
]},
'z3-jorm-lose': { title:{ th:'อสรพิษโลกรออยู่', en:'The World-Serpent Waits' }, pages:[
  { title:{ th:'ไม่ซ้ำเติม', en:'No Second Blow' }, line:{ th:
    'บรรยาย: ยอร์มุนกันดร์หยุดนิ่ง ไม่ซ้ำเติมผู้ที่ล้ม เสียงน้ำในแม่น้ำวิญญาณค่อย ๆ เรียบลงอีกครั้ง เหมือนทั้งแม่น้ำรอให้ใครสักคนตั้งหลักได้',
    en:
    'Narration: Jörmungandr stops. He does not strike a fallen foe. The sound of the river of souls settles slowly, as if the whole river waited for someone to find their feet.' } },
]},
'z3-sev-lose': { title:{ th:'เซเวอรินรอท่านอยู่', en:'Severin Awaits You' }, pages:[
  { title:{ th:'ยอดยังไม่ปิด', en:'The Account Is Still Open' }, line:{ th:
    'เซเวอริน: "ยอดนี้ยังไม่ปิด กลับไปตั้งหลักแล้วมาใหม่ ข้าไม่ลบบัญชีของเจ้า ข้าจดไว้ตามที่ข้าเห็น"\n'
  + 'บรรยาย: เซเวอรินปิดสมุดแล้วยืนรอ',
    en:
    'Severin: "This account is not closed. Go and steady yourself, then come back. I will not strike your name from the books. I record what I see."\n'
  + 'Narration: Severin shuts the ledger and stands waiting.' } },
]},
```

### 4.6 คัตซีนชนะ `z3-sev-win` (2 หน้า + หน้า 3 เสริม)
```js
'z3-sev-win': { title:{ th:'ยอดตรวจสอบ', en:'The Audit Result' }, pages:[
  { title:{ th:'ตัวเลขไม่เคยโกหก', en:'Numbers Never Lie' }, line:{ th:
    'เซเวอริน: "ยอดตรวจสอบออกมาสมกับที่เขาลือกันจริง ๆ"   /* [เดิม bossWin 1] */\n'
  + 'บรรยาย: เปลวน้ำเงินดับ เซเวอรินปิดสมุดแล้วกางฝ่ามือให้เห็นว่าว่างเปล่า\n'
  + 'เซเวอริน: "ข้าตรวจทุกตัวเลขสองรอบ รอบแรกข้าเห็นเด็กน้อย รอบที่สองข้าเห็นผู้ถือบัญชี ตัวเลขไม่เคยโกหก ข้าต่างหากที่อ่านผิดรอบแรก"',
    en:
    'Severin: "The audit result is exactly what the rumours claimed."\n'
  + 'Narration: The blue flame dies. Severin shuts the ledger and opens his empty palm.\n'
  + 'Severin: "I check every figure twice. The first time I saw a child. The second time I saw a keeper of the ledger. Numbers never lie. It was I who misread them the first time."' } },
  { title:{ th:'บัลลังก์ที่ไม่ได้ชนะด้วยการแย่ง', en:'A Throne Not Won by Seizing' }, line:{ th:
    'เซเวอริน: "ข้าขอปิดบัญชีนี้ด้วยการยกปัจฉิมให้เจ้าปกครอง"   /* [เดิม bossWin 2] */\n'
  + 'เซเวอริน: "ข้ากับฮาลวาร์วัดกันด้วยบัญชีมาทั้งชีวิต ข้าไม่เคยชนะเขา และข้าก็ไม่ได้ชนะเจ้า แต่ข้าไม่เสียใจที่แพ้ให้ตัวเลขที่ถูกต้อง"',
    en:
    'Severin: "I close this account by yielding the West to you to govern."\n'
  + 'Severin: "Halvar and I have measured each other by ledgers all our lives. I never beat him, and I have not beaten you. But I do not regret losing to figures that are correct."' } },
  /* หน้า 3 เสริม เปิดด้วยธง Z3_PHANTOM_CLUE (ค่าเริ่มต้นปิด) */
  { title:{ th:'ตัวเลขที่ไม่ใช่ของโลกนี้', en:'A Figure Not of This World' }, line:{ th:
    'เซเวอริน: "อีกเรื่องหนึ่ง ข้าตรวจสมุดปัจฉิมทั้งเล่มก่อนมา ยอดค้างสามรายการไม่ตรงกับยอดของสำนักคัดกรรม ข้าคิดสองรอบสามรอบก็ไม่ตรง ราวกับมีมือนอกบัญชีแก้ทีละบรรทัด"\n'
  + 'เซเวอริน: "ถ้าเจ้าเจอมือนั้น จดชื่อมันไว้ให้ข้า ข้าอยากรู้ว่าตัวเลขตัวไหนไม่ได้เกิดในโลกนี้"\n'
  + 'นิรา: "ดิฉันจะตรวจรหัสผู้แก้ให้ค่ะ"',
    en:
    'Severin: "One more thing. Before I came I audited the whole of the West\'s ledger. Three outstanding balances do not agree with the registry\'s. I worked them two times, three times, and they still would not agree, as though a hand from outside the books had altered them line by line."\n'
  + 'Severin: "If you ever find that hand, write its name down for me. I want to know which figure was never born in this world."\n'
  + 'Nira: "I will check the alterer\'s code, sir."' } },
]},
```

### 4.7 บทเพิ่มให้แผงเดิม `STORY.west` (ใช้ได้เมื่อ Toby เปิดช่องบทพูดบนแผง · ไม่บังคับ)
- แผง `west-01` ผู้ท้าชิงยอมรับ · เซเวอริน: "ธรรมเนียมผู้ตรวจบัญชีปัจฉิม ผู้แพ้ต้องมอบหลักประกันให้ผู้ชนะ" · EN Severin: "It is the custom of the West's auditors that the loser hands his collateral to the winner."
- แผง `west-02` ผนึกน้ำแข็ง · ยมบาทน้อย: "เย็นจัง แต่ไม่ได้เย็นชา" · EN Yama: "It is cold, but it is not cold-hearted."

### 4.8 boss-guide ของเซเวอริน: ใช้บทเดิม ไม่ต้องเขียนใหม่
บทเดิม `bossGuideStory()` ใช้ได้กับโซนนี้ (ชื่อผู้พูดดึงจาก `ZONES[west].bossName` อัตโนมัติ) · ที่ผมไม่แนะนำให้ทำตอนนี้ แต่ถ้าคุณเป้อยากได้น้ำเสียงเฉพาะเซเวอริน ข้อความเสนอ: praise "เจ้ายืนอยู่ได้ตั้งแต่ขดแรกจนถึงยอดสุดท้าย ปัจฉิมนี้ฝากไว้กับเจ้าได้" · farewell "พามาถึงประตูแล้ว ข้าตรวจบัญชีของเจ้าแล้วไม่พบข้อผิดพลาด ขอให้ที่ข้างหน้า ไม่มีใครมาแก้ตัวเลขของเจ้า" (EN: praise "You stood from the first coil to the last figure. The West may be left in your hands." · farewell "I have brought you to the gate. I audited your ledger and found no error. May no one alter your figures where you go next.")

### 4.9 ภาพคดีครบ 15 → ดูหัวข้อ 8

<!--PART-C-->
