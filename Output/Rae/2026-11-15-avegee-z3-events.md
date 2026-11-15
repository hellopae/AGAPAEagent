# AVEGEE โซน 3 ปัจฉิม · บท event ครบชุด (คดี 0 / 5 / 10 / 15 + คดีญาติยมทูต 5 คดี + ข้อเสนอคดีนัวร์)
ผู้เขียน: Rae · 15 พ.ย. 2569 · อิงสเปกคุณเป้ (`Output/Claudy/briefs/2026-11-14-avegee-z234-events-owner-spec.md` ส่วนโซน 3 + คำตอบ + คำตัดสิน 14 พ.ย.) · ใบงาน `Output/Claudy/briefs/2026-11-15-avegee-z3-events-rae.md` · รูปแบบตามบทโซน 2 `Output/Rae/2026-11-14-avegee-z2-events.md` (ไทย + EN คู่กันทุกบรรทัดที่ผู้เล่นเห็น)
สถานะ: ร่างพร้อมเสียบ · ยังไม่ผ่าน Reese (หัวข้อ 11) · ไม่ได้แตะโค้ด (อ่านอย่างเดียวจาก `~/agapae-work/AVEGEE/src/`)
ทางลัด: ต้องให้คุณเป้ตัดสิน = หัวข้อ 10 · ให้ Reese ตรวจ = หัวข้อ 11 · รายการภาพ = หัวข้อ 8 · ของเดิมในโค้ด vs ที่แก้ = ข้อ 0.4
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

---

## 5. คดีญาติยมทูต (ปลดล็อกเมื่อจ้างคนนั้น) · 5 คดี

กติกา (ใช้เหมือนโซน 2): คดีญาติทั่วไปต้องจ้างก่อนจึงขึ้น ไม่ใช่คดีเนื้อเรื่องหลัก · เสนอ ให้คดีญาติขึ้น**หลังผ่านการทดสอบเอียร์ลิน (คดีครบ 10)** และขึ้นต่อท้ายคิว ไม่แซงคดีเนื้อเรื่อง เพราะโพเอน่าถูกจ้างตั้งแต่วันแรกของสาขาเหมือนโกคุ (ข้อสังเกตเดียวกับที่ Toby ทำในโซน 2) · ลำดับคดีที่เขียนตรงตามสเปก: 1 ผู้พิพากษา · 2 น้องชายอ็อกเนียน · 3 ลูกค้าซิบิล · 4 ลูกสาวผู้ป่วยเกรซ · 5 ยามที่ถูกสะกด

### 5.1 คดีญาติ 1 · ผู้พิพากษาที่ทำตามคำสั่งเท็จ / โพเอน่า

**NK1 · แจ้งเตือน**
- หัวข้อ: ผู้ยื่นหมายให้โพเอน่าคืนนั้น
- ข้อความ: วิญญาณอดีตผู้พิพากษาศาลท่าเรือมาถึงคิว เขาคือผู้ยื่นหมายคำสั่งเท็จให้โพเอน่าเมื่อสามสิบปีก่อน โพเอน่าจำหมายนั้นได้และขอพบท่านก่อนเริ่มคดี
- ปุ่ม: ฟังโพเอน่า
- EN หัวข้อ: The man who handed Poena the writ
- EN ข้อความ: A former harbour-court judge has reached the queue. Thirty years ago he handed Poena the false writ. Poena recognises it and asks to see you before the hearing begins.
- EN ปุ่ม: Hear Poena

```js
{
  k:'falseorder', quest:'z3KinTaan', zone:'west', sex:'m', sp:'soul-false-judge-west', kind:'twist',
  name:'ผู้พิพากษาศาลท่าเรือ', en_name:'The Harbour-Court Judge',
  who:'อดีตผู้พิพากษาที่ทำตามคำสั่งเท็จทั้งที่รู้ว่าผิด', en_who:'A former judge who obeyed a writ he knew was false',
  face:'ชุดคลุมผู้พิพากษาสีเทาถ่านรีดเรียบ หลังตรง สองมือกุมหมายม้วนหนึ่งไว้เหมือนไม่กล้าวางลง',
  en_face:'A charcoal-grey judge\'s robe pressed flat, back straight, both hands clutching a rolled writ as if he dared not set it down.',
  seen:[
    { t:'ออกหมายลงทัณฑ์ลูกมือช่างจุดโคมท่าเรือโดยไม่ไต่สวน ตามหมายที่อ้างว่ามาจากเบื้องบน ผู้ถูกลงทัณฑ์เสียชีวิตในคืนนั้น', en:'Issued a penalty order against the harbour lamp-lighter\'s apprentice without a hearing, on a writ claiming to come from above. The boy died that night.', s:'kha', w:5 },
  ],
  hidden:[
    { t:'เห็นหมึกตราประทับผิดสีและไม่มีเลขรับรองตั้งแต่ก่อนลงนาม แต่ไม่กล้าหยุดไว้ถามเพราะเพิ่งถูกตักเตือนว่าทำงานล่าช้า', en:'Saw before signing that the seal ink was the wrong colour and carried no certifying number, but dared not hold it back to ask because he had just been reprimanded for slowness.', s:'pak', w:3 },
    { t:'รู้ในอีกสามวันว่าหมายเป็นเท็จ แล้วซ่อนหมายไว้ในหีบและเงียบมาสามสิบปี', en:'Learned three days later that the writ was false, hid it in a chest and stayed silent for thirty years.', s:'pak', w:3 },
    { t:'ส่งเงินให้มารดาของลูกมือคนนั้นทุกเดือนโดยไม่ลงนามเป็นเวลาสามสิบปีจนนางสิ้น', en:'Sent money every month for thirty years, unsigned, to the apprentice\'s mother until she died.', s:'kha', w:-2 },
  ],
  merits:[
    { t:'ส่งเงินให้มารดาของผู้ตายทุกเดือนไม่ขาดสามสิบปีโดยไม่ลงนาม', en:'Sent the dead boy\'s mother money every month for thirty years, never signing.', v:1, fake:false },
    { t:'อ้างว่าตัดสินถูกต้องตามระเบียบมาตลอดชีวิต', en:'Claims he judged correctly by the rules all his life.', v:1, fake:true },
  ],
  line:'"ข้าทำตามหมาย ข้าไม่ใช่คนเขียนหมาย ท่านจะตัดสินข้าเรื่องนี้ได้อย่างไร"', en_line:'"I followed the writ. I was not the one who wrote it. How can you judge me for this?"',
  claims:[
    { kind:'deny', t:'ข้าไม่รู้ว่าหมายนั้นเท็จ ข้าเชื่อว่ามาจากเบื้องบนจริง', en:'I did not know the writ was false. I believed it came from above.',
      reveal:'"...ตราสีมันผิด ข้าเห็นกับตา ข้าบอกตัวเองว่าอาจเป็นหมึกชุดใหม่ ข้ารู้ แต่ไม่อยากรู้"', en_reveal:'"...The seal colour was wrong. I saw it with my own eyes. I told myself it might be a new batch of ink. I knew, and did not want to know."' },
    { kind:'boast', t:'ท่านดูบุญของข้าด้วย ข้าตัดสินถูกตามระเบียบมาตลอดชีวิต', en:'Count my merit too: I judged by the rules all my life.',
      merit:'อ้างว่าตัดสินถูกต้องตามระเบียบมาตลอดชีวิต',
      reveal:'ท่านถามว่าระเบียบข้อไหนบอกให้ลงทัณฑ์ก่อนไต่สวน เขานิ่งไป — ระเบียบข้อแรกของเล่ม คือหมายที่ไม่มีเลขรับรองต้องหยุดไว้ก่อน เขาท่องข้อนี้ได้ทุกตัวอักษร', en_reveal:'You ask which rule allows a penalty before a hearing. He falls silent. The first rule in the book says a writ without a certifying number must be held. He can recite it letter for letter.' },
    { kind:'solid', t:'เรื่องสั่งลงทัณฑ์เด็กคนนั้น ข้ายอมรับ ข้าลงนามด้วยมือข้าเอง', en:'As for the order against that boy, I admit it. I signed it with my own hand.' },
    { kind:'solid', truth:true, t:'ข้ารู้เมื่อสามวันหลังว่าหมายเท็จ ข้าไม่ได้เงียบเพราะกลัวถูกลงโทษ ข้าเงียบเพราะไม่รู้ว่าจะเอ่ยชื่อเด็กคนนั้นกับใครก่อน', en:'I learned three days later that the writ was false. I did not stay silent for fear of punishment. I stayed silent because I did not know whom to tell the boy\'s name to first.',
      reveal:'ยมบาทน้อยเปิดสมุดบัญชีบ้านของผู้พิพากษา พบรายการโอนเงินเล็ก ๆ ไปที่เดิมทุกต้นเดือน ไม่เคยมีชื่อผู้ส่ง', en_reveal:'Yama opens the judge\'s household ledger and finds a small transfer to the same address at the start of every month, never with a sender\'s name.' },
  ],
}
```
**บทคดีญาติ (KIN)** · โพเอน่า "ข้า" ห้วน (EN เก็บประโยคสั้น)
- ช่วงก่อนขึ้นแท่น:
  - โพเอน่า: "ท่าน ข้ามีเรื่องเรื่องเดียว คนที่จะขึ้นแท่นคือคนที่ยื่นหมายให้ข้าเมื่อสามสิบปีก่อน หมายนั้นสั่งให้ข้าลงทัณฑ์เด็กคนหนึ่ง ข้าลงมือโดยไม่ถามชื่อ เพราะข้าถือว่าหมายจากศาลย่อมถูก"
    EN Poena: "Sir, I have one matter. The man about to stand on the dais is the one who handed me a writ thirty years ago. It ordered me to punish a boy. I did it without asking his name, because I held that a writ from the court must be right."
  - โพเอน่า: "ข้ารู้ทีหลังว่าหมายนั้นเท็จ ข้าไม่เคยบอกใคร แต่ข้าจำน้ำหนักของมันได้ทุกคืน ข้าไม่ขอให้ท่านหนักหรือเบา ข้าขอให้ท่านอ่านหมายนั้นด้วยตาท่านเอง"
    EN Poena: "I learned later that it was false. I never told anyone, but I remember its weight every night. I do not ask you to be heavy or light. I ask you to read that writ with your own eyes."
- ช่วงระหว่างไต่สวน:
  - โพเอน่า: "ข้ามองหน้าเขาไม่ได้ เขาไม่ใช่คนโหดร้าย เขาเป็นคนที่กลัวถูกตำหนิ ข้ารู้เพราะข้าก็เป็นคนแบบนั้นเหมือนกัน"
    EN Poena: "I cannot look at his face. He is not a cruel man. He is a man who fears reproach. I know, because I am the same kind."
  - โพเอน่า: "ท่านอย่าลืมว่ามือที่ลงทัณฑ์คืนนั้นคือมือข้า ข้าไม่ขอให้ท่านเอาความผิดของเขามาหักเบาให้ข้า"
    EN Poena: "Do not forget that the hand that carried out the penalty that night was mine. I do not ask you to subtract his fault from mine."
- ช่วงหลังตัดสิน:
  - โพเอน่า: "ท่านตัดสินแล้ว ข้าขอถามข้อเดียว ข้าควรทำอะไรกับหมายฉบับนั้นที่เขาเก็บไว้ในหีบสามสิบปี"
    EN Poena: "You have judged. I ask one thing. What should I do with that writ he kept in a chest for thirty years?"
- ทางเลือก: **[ให้โพเอน่าอ่านชื่อของเด็กบนหมายออกเสียงต่อหน้าเขา]** / **[ให้โพเอน่าประทับตราของตนทับตราปลอมบนหมายแล้วส่งเก็บที่หอทะเบียน]**
  EN: **[Let Poena read the boy\'s name on the writ aloud before him]** / **[Let Poena stamp her own seal over the false seal and file the writ at the registry]**
  - (อ่านชื่อ) บรรยาย: โพเอน่าคลี่หมายออกบนแท่น อ่านชื่อ "เทโอ" ช้า ๆ ทีละพยางค์ ผู้พิพากษาหลับตา · โพเอน่า: "ข้าเพิ่งรู้ว่าสามสิบปีที่ผ่านมา ข้าไม่เคยเอ่ยชื่อนี้ออกมาเลยแม้แต่ครั้งเดียว" · ผู้พิพากษา: "ข้าก็ไม่เคย"
    EN Narration: Poena unrolls the writ on the dais and reads the name "Theo" slowly, syllable by syllable. The judge shuts his eyes. · Poena: "I have only just realised that in thirty years I never once said this name aloud." · Judge: "Nor I."
  - (ประทับตราทับ) โพเอน่า: "ข้าจะประทับตราของข้าเองทับตราปลอม ให้ทุกคนที่เปิดอ่านเห็นว่ามือที่เคยทำตามหมายนี้ ตอนนี้บอกให้หยุด" · บรรยาย: ตราของโพเอน่ากดลงบนหมึกผิดสี ผู้พิพากษามองตราซ้อนตรานั้นโดยไม่พูดสักคำ
    EN Poena: "I will stamp my own seal over the false one, so that everyone who opens it sees that the hand that once obeyed this writ now says stop." · Narration: Poena\'s seal presses down on the wrong-coloured ink. The judge watches the seal upon the seal and says nothing.

### 5.2 คดีญาติ 2 · น้องชายที่เดินตามพี่ / อ็อกเนียน

**NK2 · แจ้งเตือน**
- หัวข้อ: น้องชายของอ็อกเนียน
- ข้อความ: วิญญาณหนุ่มผู้วางเพลิงตามแบบที่เห็นพี่ชายทำมาถึงคิว เขาคือน้องชายของอ็อกเนียน อ็อกเนียนจำหน้าเขาได้และขอพบท่านก่อนเริ่มคดี
- ปุ่ม: ฟังอ็อกเนียน
- EN หัวข้อ: Ognien\'s younger brother
- EN ข้อความ: A young spirit who set a fire the way he once watched his brother do has reached the queue. He is Ognien\'s younger brother. Ognien recognises him and asks to see you before the hearing begins.
- EN ปุ่ม: Hear Ognien

```js
{
  k:'youngerbrother', quest:'z3KinPlerng', zone:'west', sex:'m', sp:'soul-younger-brother-west', kind:'tragic',
  name:'น้องชายผู้เดินตามพี่', en_name:'The Younger Brother Who Followed',
  who:'ชายหนุ่มผู้วางเพลิงโรงไม้ท้ายตลาดตามแบบที่เคยเห็นพี่ชายทำ', en_who:'A young man who set fire to the timber yard at the end of the market the way he once watched his brother do',
  face:'ผอมสูง ปลายนิ้วดำคล้ำด้วยเขม่า ยืนเอียงไปทางซ้ายเสมอเหมือนยังมีใครเดินอยู่ข้างตัว',
  en_face:'Tall and thin, fingertips blackened with soot, always leaning slightly left as if someone were still walking beside him.',
  seen:[
    { t:'จุดไฟเผาโรงไม้ท้ายตลาดจนลามไปอีกสามหลัง และมีผู้เฝ้าโรงไม้เสียชีวิตหนึ่งราย', en:'Set fire to the timber yard at the end of the market; it spread to three more buildings and one yard watchman died.', s:'kha', w:5 },
  ],
  hidden:[
    { t:'ตั้งใจจุดแค่กองฟางว่างหลังโรงไม้เหมือนที่เคยเห็นพี่ทำตอนเด็ก ไม่รู้ว่ามีคนนอนอยู่ข้างใน', en:'Meant to light only the empty heap of straw behind the yard, as he had seen his brother do as a boy. He did not know anyone slept inside.', s:'bian', w:-1 },
    { t:'เห็นไฟลามแล้ววิ่งกลับไปทุบประตูปลุกคนในโรงไม้จนรอดสามคน ก่อนตัวเองหนีไม่ทัน', en:'Saw the fire spread, ran back and pounded on doors to wake the people inside, saving three before he could not escape himself.', s:'kha', w:-3 },
    { t:'พี่ชายเคยบอกให้เลิกจุดไฟ เขารับปากแล้วยังซื้อน้ำมันตะเกียงสองขวดในวันก่อนเกิดเหตุ', en:'His brother had told him to stop lighting fires. He promised, and still bought two bottles of lamp oil the day before.', s:'pak', w:1 },
  ],
  merits:[
    { t:'ทุบประตูปลุกคนในโรงไม้จนรอดสามชีวิต', en:'Pounded on doors and saved three lives in the yard.', v:2, fake:false },
    { t:'อ้างว่าไม่เคยก่อเรื่องมาก่อนเลยในชีวิต', en:'Claims he never made trouble before in his life.', v:1, fake:true },
  ],
  line:'"พี่จุดไฟแล้วไม่มีใครว่า ข้าก็นึกว่ามันไม่ใช่เรื่องใหญ่ ท่านลองถามพี่ดูเถอะ"', en_line:'"My brother lit fires and no one said a word, so I thought it was no great matter. Go on, ask him."',
  claims:[
    { kind:'deny', t:'ตะเกียงข้าหล่นเองตอนเดินผ่านหลังโรงไม้ ข้าไม่ได้ตั้งใจเผา', en:'My lamp simply fell as I walked past the back of the yard. I did not mean to burn it.',
      reveal:'"...ข้าถือน้ำมันไปเองสองขวด ข้าตั้งใจเผากองฟาง ข้าแค่ไม่คิดว่าลมจะพัด"', en_reveal:'"...I carried the oil there myself, two bottles. I meant to burn the straw. I just never thought the wind would rise."' },
    { kind:'boast', t:'ท่านดูบุญของข้าด้วย ข้าไม่เคยก่อเรื่องมาก่อนเลย', en:'Count my merit too: I never caused trouble before.',
      merit:'อ้างว่าไม่เคยก่อเรื่องมาก่อนเลยในชีวิต',
      reveal:'ท่านถามว่ากองฟางหลังโรงน้ำมันปีก่อนใครจุด เขานิ่งไป — เขาจุดเองสองครั้ง ทั้งสองครั้งไม่มีใครรู้', en_reveal:'You ask who lit the straw behind the oil shed last year. He falls silent. He lit it himself, twice, and no one ever knew.' },
    { kind:'solid', t:'เรื่องจุดไฟ ข้าทำจริง และข้าไม่เคยบอกพี่ว่ากำลังจะทำ เพราะพี่จะห้าม', en:'As for the fire, I did it. And I never told my brother I was going to, because he would have forbidden it.' },
    { kind:'solid', truth:true, t:'ข้าวิ่งกลับไปทุบประตูก่อนไฟลามถึงห้องหลัง ข้ากลัวมาก แต่ข้าไม่ได้คิดจะวิ่งหนี', en:'I ran back and pounded on the doors before the fire reached the back room. I was terrified, but I never thought of running away.',
      reveal:'ยมบาทน้อยดูรอยมือบนบานประตูห้องหลังที่ยังไหม้ไม่หมด พบรอยฝ่ามือเขม่าหลายรอยที่ความสูงของเขา ทั้งที่ทางหนีอยู่ตรงข้าม', en_reveal:'Yama studies the half-burnt back door and finds several sooty handprints at his height, though the way out lay on the opposite side.' },
  ],
}
```
**บทคดีญาติ (KIN)** · อ็อกเนียน "ผม ... ครับ"
- ช่วงก่อนขึ้นแท่น:
  - อ็อกเนียน: "ท่านครับ ผมขอพูดสั้น ๆ คนที่กำลังจะขึ้นแท่นเดินตามผมมาตั้งแต่เขาเดินได้ ผมจุดไฟกองฟางเล่นสมัยเด็ก เขานั่งดูอยู่ข้าง ๆ ตาไม่กะพริบ ผมเพิ่งรู้ทีหลังว่านั่นคือบทเรียนครั้งแรกของเขา"
    EN Ognien: "Sir, let me be brief. The one about to stand on the dais has followed me since he could walk. I lit heaps of straw for fun when I was a boy, and he sat beside me and watched without blinking. Only later did I realise that was his first lesson."
  - อ็อกเนียน: "ผมเลิกจุดไฟมานานแล้วครับ เลิกเพราะกลัว ไม่ใช่เพราะสำนึก ผมไม่เคยบอกเขาว่าผมเลิก เขาเลยไม่รู้ว่ามันไม่ใช่เรื่องเล่น"
    EN Ognien: "I stopped lighting fires long ago, sir. I stopped out of fear, not remorse. I never told him I had stopped, so he never learned it was no game."
- ช่วงระหว่างไต่สวน:
  - อ็อกเนียน: "เขาเป็นเด็กขี้กลัวครับ ถ้าท่านเจออะไรที่ไม่ตรงกับที่เขาพูด อย่าเพิ่งตัดสินจากปากเขา ดูมือเขาด้วย"
    EN Ognien: "He is a timid boy, sir. If you find anything that does not match what he says, do not judge by his mouth alone. Look at his hands too."
  - อ็อกเนียน: "ผมไม่ได้ล้อเล่นนะครับ ผมแค่ล้อเล่นไม่ออกตอนนี้ ปกติผมล้อเล่นเวลาเรื่องหนักเกินไป"
    EN Ognien: "I am not joking, sir. I just cannot manage a joke right now. Normally I joke when things get too heavy."
- ช่วงหลังตัดสิน:
  - อ็อกเนียน: "ท่านตัดสินแล้ว ผมขอถามข้อเดียวครับ ผมควรพูดอะไรกับเขาก่อนเขาไป ผมไม่รู้ว่าคำไหนจะไม่กลายเป็นเชื้อไฟอีก"
    EN Ognien: "You have judged, sir. I ask one thing. What should I say to him before he goes? I do not know which word would not turn into kindling again."
- ทางเลือก: **[ให้อ็อกเนียนรับว่าตนเป็นต้นแบบ แล้วยืนข้างน้องจนถึงประตู]** / **[ให้อ็อกเนียนดับตะเกียงของตนต่อหน้าน้อง โดยไม่พูดอะไร]**
  EN: **[Let Ognien admit he was the example, and stand beside his brother to the gate]** / **[Let Ognien snuff his own lamp before his brother without a word]**
  - (รับว่าเป็นต้นแบบ) อ็อกเนียน: "รอยมือที่ทุบประตูห้องหลังคืนนั้น ผมภูมิใจในตัวเจ้า ส่วนเรื่องไฟ ผมสอนผิดเอง ผมขอรับส่วนนั้นไป" · น้องชาย: "พี่ไม่ต้องรับทั้งหมดหรอก ผมจุดเอง" · อ็อกเนียน: "เจ้าจุดเอง ข้าไม่เคยห้ามเจ้าจริงจัง ต่างฝ่ายต่างผิดคนละท่อน"
    EN Ognien: "The handprints you left on that back door that night, I am proud of you for those. As for the fire, I taught it wrongly. I will take that part." · Brother: "You need not take all of it. I lit it myself." · Ognien: "You lit it yourself, and I never forbade you in earnest. We each own a different stretch of the fault."
  - (ดับตะเกียง) บรรยาย: อ็อกเนียนหยิบตะเกียงเล็กที่ห้อยเข็มขัดเสมอ เป่าไฟดับต่อหน้าน้องชายแล้ววางลงบนแท่น น้องชายมองตะเกียงดับนานกว่าที่เคยมองไฟลุก · น้องชาย: "พี่ดับต่อหน้าผมครั้งแรกเลยนะ" · อ็อกเนียน: "ไม่ใช่ครั้งแรกหรอก แต่เป็นครั้งแรกที่ผมอยากให้เจ้าเห็น"
    EN Narration: Ognien takes the small lamp that always hangs from his belt, blows it out before his brother and sets it on the dais. The brother looks at the dead lamp longer than he ever looked at a blaze. · Brother: "That is the first time you have put it out in front of me." · Ognien: "It is not the first time. It is the first time I wanted you to see."

### 5.3 คดีญาติ 3 · ลูกค้าที่เชื่อคำทำนายของซิบิล

**NK3 · แจ้งเตือน**
- หัวข้อ: ลูกค้าผู้เชื่อคำทำนาย
- ข้อความ: วิญญาณหัวหน้าตระกูลพ่อค้าท่าเรือมาถึงคิว เขาทำตามคำทำนายของซิบิลที่ผิดเพียงครั้งเดียวจนเสียทั้งตระกูล ซิบิลจำเขาได้และขอพบท่านก่อนเริ่มคดี
- ปุ่ม: ฟังซิบิล
- EN หัวข้อ: The client who believed the prophecy
- EN ข้อความ: The head of a harbour merchant family has reached the queue. He followed one wrong prophecy of Sibyl\'s and lost his whole house. Sibyl recognises him and asks to see you before the hearing begins.
- EN ปุ่ม: Hear Sibyl

```js
{
  k:'doomclient', quest:'z3KinKan', zone:'west', sex:'m', sp:'soul-prophecy-client-west', kind:'tragic',
  name:'หัวหน้าตระกูลพ่อค้าท่าเรือ', en_name:'Head of a Harbour Merchant House',
  who:'ผู้สั่งทั้งตระกูลออกเรือหนีตามคำทำนายที่ผิดหนึ่งครั้ง', en_who:'The man who ordered his whole house to sail in flight on a single wrong prophecy',
  face:'เสื้อคลุมขนสัตว์เก่าแต่ตัดเย็บดี ตาแดงเหมือนไม่ได้หลับมานาน กำสมุดบัญชีเรือเล่มเล็กไว้แน่นจนข้อนิ้วขาว',
  en_face:'A fur-trimmed coat, old but well cut, eyes red as though he has not slept in ages, one small ship\'s ledger gripped so hard his knuckles are white.',
  seen:[
    { t:'สั่งให้คนทั้งตระกูลทิ้งบ้านและออกเรือในคืนเดียวตามคำทำนาย โดยไม่ฟังเสียงคัดค้าน เรือถูกพายุกลางทะเล สมาชิกสูญหายเก้าคน', en:'Ordered the whole house to abandon their home and put to sea in a single night on a prophecy, brushing aside every objection. A storm took the ship at sea and nine of his kin were lost.', s:'bian', w:4 },
  ],
  hidden:[
    { t:'ซิบิลบอกว่า "อาจเป็นคืนนั้น" เขาจดเพียงคำว่า "คืนนั้น" ลงสมุด และไม่ยอมรับว่ามีคำว่า "อาจ"', en:'Sibyl said "it may be that night". He wrote down only "that night" and would not admit the word "may" was there.', s:'pak', w:-1 },
    { t:'ผู้เฒ่าในตระกูลขอให้รอถึงรุ่งเช้าเพื่อตรวจลม เขาตวาดให้เงียบต่อหน้าทุกคน', en:'The family\'s eldest begged to wait until morning to read the wind. He shouted him silent before them all.', s:'pak', w:3 },
    { t:'ไม่ยอมทิ้งเด็กและคนชราไว้บนฝั่งแม้เรือจะแน่น เขาเลือกทิ้งสินค้าแทน', en:'Refused to leave children and the aged on the quay though the ship was crowded. He chose to cast off cargo instead.', s:'bian', w:-2 },
  ],
  merits:[
    { t:'ไม่ทิ้งเด็กและคนชราไว้บนฝั่งแม้คนเดียวในคืนนั้น เลือกทิ้งสินค้าทั้งหมดแทน', en:'Left no child or elder on the quay that night, and chose to cast off all the cargo instead.', v:2, fake:false },
    { t:'อ้างว่าที่ทำทั้งหมดเพื่อความปลอดภัยของตระกูล', en:'Claims everything he did was for his house\'s safety.', v:1, fake:true },
  ],
  line:'"ข้าเชื่อนาง เพราะนางไม่เคยพลาดมาก่อน ท่านจะโทษคนที่เชื่อใจหรือ"', en_line:'"I believed her because she had never been wrong before. Would you blame a man for trusting?"',
  claims:[
    { kind:'deny', t:'ซิบิลบอกชัดว่าต้องเป็นคืนนั้น ข้าแค่ทำตามที่ได้ยิน', en:'Sibyl said plainly it must be that night. I only did what I heard.',
      reveal:'"...นางบอกว่า \'อาจ\' ข้าเงยหน้ามองนาง แล้วบอกว่าอย่าอาจ ข้าไม่มีเวลาอาจ นางก็พยักหน้า ข้าอยากได้ความแน่นอนมากกว่าความจริง"', en_reveal:'"...She said \'may\'. I looked up at her and told her not to say \'may\', I had no time for \'may\'. She nodded. I wanted certainty more than truth."' },
    { kind:'boast', t:'ท่านดูบุญของข้าด้วย ทุกอย่างที่ข้าทำก็เพื่อความปลอดภัยของตระกูล', en:'Count my merit too: all I did was for my house\'s safety.',
      merit:'อ้างว่าที่ทำทั้งหมดเพื่อความปลอดภัยของตระกูล',
      reveal:'ท่านถามว่าใครในตระกูลขอให้รอถึงรุ่งเช้า เขาเงียบไปนาน — ผู้เฒ่า เจ้าของเรือลำเก่า ผู้ที่เขาไม่เคยกล้ามองหน้าตอบ', en_reveal:'You ask who in the house asked to wait until morning. He is silent a long while. It was the eldest, owner of the old ship, the one he never dared look in the face to answer.' },
    { kind:'solid', t:'เรื่องสั่งออกเรือคืนนั้น ข้าสั่งเอง ข้าไม่เคยโยนให้ซิบิลคนเดียว', en:'I gave the order to sail that night. I never put it on Sibyl alone.' },
    { kind:'solid', truth:true, t:'คืนนั้นข้ายอมทิ้งสินค้าทั้งลำเพื่อไม่ทิ้งเด็กกับคนชราไว้บนฝั่ง ข้าไม่เสียดายสักชิ้น', en:'That night I let the whole cargo go so as not to leave the children and elders on the quay. I do not grieve a single piece.',
      reveal:'ยมบาทน้อยเปิดสมุดบัญชีเรือหน้าสุดท้าย พบรายการสินค้าถูกขีดฆ่าทั้งหน้าด้วยลายมือเดียวกัน และชื่อเด็กสามคนเขียนเพิ่มไว้ท้ายหน้าแทน', en_reveal:'Yama opens the last page of the ship\'s ledger and finds the cargo list struck out in a single hand, with the names of three children written in its place at the foot of the page.' },
  ],
}
```
หมายเหตุ Toby: ข้อ `hidden` ข้อ 3 กับบุญจริง (ไม่ทิ้งเด็กและคนชรา) เป็นเรื่องเดียวกันตั้งใจ ให้ผู้เล่นเห็นด้านดีของเขาสองทาง (ผ่านแฟ้มซ่อนและผ่านบุญ) · น้ำหนักตั้งใจให้สรุปได้ว่าความผิดหลักคือการไม่ฟังเสียงคัดค้านและตวาดผู้เฒ่า ไม่ใช่การเชื่อคำทำนายเอง · ข้ออ้าง "เพื่อความปลอดภัยของตระกูล" เป็นบุญปลอม (`fake:true`)

**บทคดีญาติ (KIN)** · ซิบิล "ดิฉัน ... ค่ะ"
- ช่วงก่อนขึ้นแท่น:
  - ซิบิล: "ท่านคะ ดิฉันขอพูดตรง ๆ คนที่จะขึ้นแท่นคือลูกค้าที่ดิฉันเคยทำนายผิด ดิฉันผิดครั้งเดียวในสามสิบปี ครั้งเดียวนี้เองค่ะที่ทำให้ตระกูลของเขาสิ้น"
    EN Sibyl: "Sir, let me speak plainly. The one about to stand on the dais is a client whose fortune I once read wrongly. I have been wrong once in thirty years, and that single time ended his house."
  - ซิบิล: "ดิฉันไม่ขอให้ท่านเบาเพราะดิฉันเป็นลูกทีม และไม่ขอให้ท่านหนักเพื่อให้ดิฉันรู้สึกดีขึ้น ดิฉันขอแค่ให้ท่านแยก 'สิ่งที่ดิฉันพูด' ออกจาก 'สิ่งที่เขาได้ยิน' ค่ะ"
    EN Sibyl: "I do not ask you to go easy because I am on your team, nor to go hard so that I may feel better. I only ask you to separate what I said from what he heard."
- ช่วงระหว่างไต่สวน:
  - ซิบิล: "ดิฉันบอกเขาว่า 'อาจเป็นคืนนั้น' ค่ะ คำว่าอาจมาก่อนคืนนั้นเสมอ ดิฉันเห็นเขาไม่ได้ยินมัน แล้วดิฉันก็ไม่ย้ำ นั่นเป็นความผิดของดิฉัน"
    EN Sibyl: "I told him \'it may be that night\'. The word \'may\' always comes before the night. I saw that he did not hear it, and I did not repeat it. That is my fault."
  - ซิบิล: "ดิฉันทำนายด้วยความน่าจะเป็นค่ะ แต่คนที่มาหาดิฉันอยากได้ความแน่นอน ดิฉันเลยพูดให้ฟังแน่นอนกว่าที่ควร ดิฉันเพิ่งกล้ายอมรับตอนนี้"
    EN Sibyl: "I read in probabilities, but those who come to me want certainty, so I spoke more surely than I should. I have only now found the courage to admit it."
- ช่วงหลังตัดสิน:
  - ซิบิล: "ท่านตัดสินแล้ว ดิฉันขอถามข้อเดียวค่ะ ดิฉันควรรับส่วนของตัวเองอย่างไร ดิฉันไม่อยากหลบหลังคำว่า 'อาจ' อีก"
    EN Sibyl: "You have judged. I ask one thing. How should I carry my own share? I do not want to hide behind the word \'may\' any longer."
- ทางเลือก (ตามสเปก): **[ให้ซิบิลรับผิดส่วนของตนต่อหน้าเขา]** / **[ให้ซิบิลขอไปรับทัณฑ์เคียงข้างเขา]**
  EN: **[Let Sibyl own her share of the fault before him]** / **[Let Sibyl ask to serve a penalty beside him]**
  - (รับผิดบางส่วน) บรรยาย: ซิบิลวางลูกแก้วลงบนแท่นแล้วก้มศีรษะต่อหน้าหัวหน้าตระกูล · ซิบิล: "ดิฉันพูดคำว่า 'อาจ' เบากว่าที่ควร ดิฉันขอรับส่วนนั้น คนที่ออกเรือคือท่าน แต่คนที่ทำให้ท่านกล้าออกคือดิฉัน" · หัวหน้าตระกูล: "นางไม่ต้องก้ม ข้าสั่งเอง" · ซิบิล: "ท่านสั่งเอง ดิฉันทำนายเอง สองอย่างนี้ไม่หักล้างกัน ขออย่าลบส่วนของดิฉันออกไปเลยค่ะ"
    EN Narration: Sibyl sets her crystal on the dais and bows her head before the head of the house. · Sibyl: "I said \'may\' more softly than I should have. I take that share. You were the one who sailed, but I was the one who made you bold enough." · Head of house: "You need not bow. I gave the order." · Sibyl: "You gave the order and I gave the reading. The two do not cancel. Please do not strike my part out."
  - (ขอรับทัณฑ์ด้วย) บรรยาย: ซิบิลก้าวลงจากข้างแท่นมายืนข้างหัวหน้าตระกูลก่อนที่ใครจะเรียก · ซิบิล: "ดิฉันขอไปรับทัณฑ์เคียงข้างเขาค่ะ ไม่ใช่เพื่อแบ่งโทษให้เขาเบาลง แต่เพื่อไม่ให้เขาเดินไปคนเดียว" · หัวหน้าตระกูล: "เจ้าเป็นหมอดู ไม่ใช่นักโทษ" · ซิบิล: "คำทำนายที่ดิฉันพูดเป็นของดิฉัน ดิฉันก็ต้องแบกด้วยตัวเองบ้างค่ะ"
    EN Narration: Sibyl steps down from beside the dais and stands next to the head of the house before anyone calls her. · Sibyl: "I ask to go and serve a penalty beside him. Not to lighten his, but so that he does not walk it alone." · Head of house: "You are a seer, not a prisoner." · Sibyl: "The reading I spoke is mine. I must carry some of it myself."
  - ผลของทางเลือก B: ผมเสนอให้เป็นข้อความอย่างเดียว (ซิบิลหายไปทำงานไม่ได้ 3 วาระ ถ้า Toby ทำง่าย) · ให้คุณเป้ตัดสิน ข้อ 10 ข้อ 10

### 5.4 คดีญาติ 4 · ลูกสาวของผู้ป่วยที่เกรซดูแล

**NK4 · แจ้งเตือน**
- หัวข้อ: ลูกสาวของคุณป้าที่เกรซดูแล
- ข้อความ: วิญญาณหญิงผู้ทิ้งมารดาไว้ที่สถานพักจนถึงวาระสุดท้ายมาถึงคิว มารดาของเธอคือผู้ป่วยที่เกรซดูแลจนวันสุดท้าย เกรซขอพบท่านก่อนเริ่มคดี
- ปุ่ม: ฟังเกรซ
- EN หัวข้อ: The daughter of the woman Grace nursed
- EN ข้อความ: A woman who left her mother in a care home until her final hours has reached the queue. Her mother was the patient Grace tended to the very end. Grace asks to see you before the hearing begins.
- EN ปุ่ม: Hear Grace

```js
{
  k:'carerdaughter', quest:'z3KinBoon', zone:'west', sex:'f', sp:'soul-carer-daughter-west', kind:'tragic',
  name:'ลูกสาวผู้ไม่ได้มาเยี่ยม', en_name:'The Daughter Who Did Not Visit',
  who:'หญิงผู้ทิ้งมารดาไว้ที่สถานพักจนถึงวาระสุดท้าย', en_who:'A woman who left her mother in a care home until her last hour',
  face:'ผมรวบเรียบร้อย แต่เสื้อโค้ตกลัดผิดกระดุมหนึ่งเม็ด ถือช่อดอกไม้เล็กที่เหี่ยวแล้วไว้ในมือสองข้างเหมือนลืมว่าถืออยู่',
  en_face:'Hair neatly tied, but one coat button done up wrong, a small bunch of withered flowers held in both hands as if she had forgotten she carried them.',
  seen:[
    { t:'ทิ้งมารดาไว้ที่สถานพักโดยไม่ไปเยี่ยมเลยตลอดเก้าปี มารดาสิ้นใจโดยไม่มีญาติอยู่ข้างกาย', en:'Left her mother in a care home for nine years without a single visit. Her mother died with no kin at her side.', s:'akata', w:4 },
  ],
  hidden:[
    { t:'สามีไม่อนุญาตให้ออกจากบ้านลำพังเกือบตลอดเก้าปี และเก็บจดหมายที่เธอเขียนถึงแม่ทุกสัปดาห์ไว้ในลิ้นชักโดยไม่ส่ง', en:'Her husband let her leave the house alone almost never in nine years, and kept the letters she wrote to her mother every week in a drawer, unsent.', s:'akata', w:-2 },
    { t:'วันสุดท้าย สถานพักโทรบอกให้รีบมา เธอเลือกไปงานเลี้ยงของสามีก่อน และมาถึงหลังมารดาสิ้นใจสองชั่วโมง', en:'On the last day the home called and told her to come at once. She chose to attend her husband\'s banquet first and arrived two hours after her mother died.', s:'akata', w:3 },
    { t:'ส่งค่าสถานพักครบทุกเดือนผ่านพี่ชายด้วยเงินที่แอบเก็บไว้ ไม่เคยขาด', en:'Paid the home\'s fees in full every month through her brother, from money she had quietly set aside. Never once missed.', s:'akata', w:-1 },
  ],
  merits:[
    { t:'ส่งค่าสถานพักของมารดาครบทุกเดือนไม่ขาดเก้าปี', en:'Paid her mother\'s care-home fees in full every month for nine years.', v:1, fake:false },
    { t:'อ้างว่าเป็นคนเดียวในครอบครัวที่ดูแลแม่จนวาระสุดท้าย', en:'Claims she was the only one in the family who cared for her mother to the end.', v:1, fake:true },
  ],
  line:'"ดิฉันไม่ได้ลืมแม่เลยสักวัน ท่านจะเชื่อหรือไม่ก็แล้วแต่"', en_line:'"I did not forget my mother for a single day. Believe it or not, as you please."',
  claims:[
    { kind:'deny', t:'ดิฉันเขียนจดหมายส่งหาแม่ทุกสัปดาห์ แม่ต้องรู้ว่าดิฉันยังรัก', en:'I sent my mother a letter every week. She must have known I still loved her.',
      reveal:'"...ดิฉันไม่เคยได้ใบตอบรับสักใบ ลึก ๆ ดิฉันรู้ว่ามันอาจไปไม่ถึง แต่ไม่เคยกล้าเอาไปส่งเอง"', en_reveal:'"...I never received a reply. Deep down I knew they might never arrive, but I never dared carry them to be sent myself."' },
    { kind:'boast', t:'ท่านดูบุญของดิฉันด้วย ดิฉันเป็นคนเดียวที่ดูแลแม่จนวาระสุดท้าย', en:'Count my merit too: I alone cared for my mother to the end.',
      merit:'อ้างว่าเป็นคนเดียวในครอบครัวที่ดูแลแม่จนวาระสุดท้าย',
      reveal:'ท่านถามว่าใครเป็นคนกุมมือแม่ในคืนสุดท้าย เธอเงียบไปนาน — ไม่ใช่เธอ', en_reveal:'You ask who held her mother\'s hand on the last night. She is silent a long while. It was not she.' },
    { kind:'solid', t:'วันสุดท้ายดิฉันเลือกไปงานเลี้ยง ดิฉันเลือกเอง ไม่มีใครบังคับ', en:'On the last day I chose the banquet. I chose it myself. No one forced me.' },
    { kind:'solid', truth:true, t:'ดิฉันเขียนจดหมายทุกสัปดาห์ แม้ไม่เคยรู้ว่าไปถึงหรือไม่', en:'I wrote every week, though I never knew whether they arrived.',
      reveal:'ยมบาทน้อยเปิดลิ้นชักห้องหนังสือของสามี พบจดหมายถึงมารดาเก้าปีเรียงตามวันที่ ทุกฉบับยังปิดผนึกอยู่', en_reveal:'Yama opens the drawer in her husband\'s study and finds nine years of letters to her mother, in date order, every one still sealed.' },
  ],
}
```
**บทคดีญาติ (KIN)** · เกรซ "ดิฉัน ... ค่ะ"
- ช่วงก่อนขึ้นแท่น:
  - เกรซ: "ท่านคะ คนที่ขึ้นแท่นคือลูกสาวของคุณป้าที่ดิฉันดูแลจนวันสุดท้าย คุณป้าถามหาลูกวันละสามครั้ง ดิฉันตอบทุกครั้งว่า 'วันนี้ยังไม่ถึงค่ะ' ดิฉันไม่เคยโกหกว่าเธอจะมา และไม่เคยบอกว่าเธอจะไม่มา"
    EN Grace: "Sir, the one on the dais is the daughter of the old lady I tended to the end. She asked for her daughter three times a day. Each time I answered, \'Not today, ma\'am.\' I never lied that she would come, and I never said she would not."
  - เกรซ: "ดิฉันขอท่านเรื่องเดียวค่ะ อย่าให้ดิฉันเป็นคนให้อภัยแทนคุณป้า ดิฉันไม่มีสิทธิ์ ท่านตัดสินตามบัญชี ส่วนดิฉันขอเพียงบอกสิ่งที่ดิฉันเห็น"
    EN Grace: "I ask one thing, sir. Do not make me forgive on the old lady\'s behalf. I have no right. Judge by the ledger. I will only tell you what I saw."
- ช่วงระหว่างไต่สวน:
  - เกรซ: "ดิฉันจะไม่บอกว่าเธอเป็นคนดีหรือไม่ดีค่ะ ดิฉันบอกได้แค่ว่าคืนสุดท้าย คุณป้าถามว่า 'วันนี้ถึงหรือยัง' ดิฉันนิ่งไปนานกว่าทุกครั้ง แล้วคุณป้าก็พยักหน้าเหมือนเข้าใจ"
    EN Grace: "I will not say whether she is good or not. I can only say that on the last night the old lady asked, \'Is it today?\' I was silent longer than ever before, and she nodded as if she understood."
  - เกรซ: "ค่าสถานพักมาครบทุกเดือนค่ะ ไม่เคยขาดสักเดือน ดิฉันเห็นตัวเลขทุกเดือน ดิฉันไม่รู้ว่าเงินนั้นหมายถึงความรักหรือความรู้สึกผิด แต่มันมาครบ"
    EN Grace: "The care-home fees arrived in full every month, never missing one. I saw the figure every month. I do not know whether that money meant love or guilt, but it came in full."
- ช่วงหลังตัดสิน:
  - เกรซ: "ท่านตัดสินแล้ว ดิฉันขอถามข้อเดียวค่ะ ดิฉันควรบอกอะไรเธอจากคุณป้า คำสุดท้ายของคุณป้าไม่ได้บ่นถึงเธอเลย"
    EN Grace: "You have judged. I ask one thing. What should I tell her from the old lady? Her last words did not complain of her at all."
- ทางเลือก: **[ให้เกรซอ่านคำสุดท้ายของคุณป้าที่จดไว้ให้เธอฟัง]** / **[ให้เกรซวางถ้วยชาของคุณป้าตรงหน้าเธอโดยไม่พูดอะไร]**
  EN: **[Let Grace read the old lady\'s last words, as she wrote them down]** / **[Let Grace set the old lady\'s teacup before her without a word]**
  - (อ่านคำสุดท้าย) เกรซ: "คำสุดท้ายที่คุณป้าพูดกับดิฉันคือ 'ให้ลูกกินข้าวก่อนนะ เขามักลืมกินเวลาเหนื่อย' ดิฉันจดไว้เพราะกลัวจำผิดค่ะ" · ลูกสาว: "แม่ ... ยังห่วงเรื่องข้าวอยู่หรือ" · เกรซ: "ตลอดเก้าปีค่ะ ท่านไม่เคยถามว่าเธออยู่ที่ไหน ถามแค่ว่าเธอกินข้าวหรือยัง"
    EN Grace: "The last thing the old lady said to me was, \'Let my daughter eat first. She forgets to eat when she is tired.\' I wrote it down for fear of getting it wrong." · Daughter: "Mother ... still worried about my meals?" · Grace: "All nine years, ma\'am. She never asked where you were. She only asked whether you had eaten."
  - (ถ้วยชา) บรรยาย: เกรซวางถ้วยชาลายดอกไม้ใบเก่าที่คุณป้าใช้ทุกเช้าลงตรงหน้าลูกสาว ไอจากชาที่ยังอุ่นลอยขึ้นแตะปลายดอกไม้เหี่ยวในมือเธอ · ลูกสาว: "ชายังอุ่นอยู่" · เกรซ: "ดิฉันชงใหม่ทุกเช้าให้คุณป้าค่ะ แม้ตอนหลังคุณป้าจะไม่ได้ดื่มแล้ว"
    EN Narration: Grace sets the old flowered teacup the old lady used each morning before the daughter. Steam from the still-warm tea drifts up to touch the withered flowers in her hands. · Daughter: "The tea is still warm." · Grace: "I brewed it fresh every morning for her, ma\'am, even after she could no longer drink."

### 5.5 คดีญาติ 5 · ยามที่ถูกสะกดเปิดประตู / ยักษ์ทวารบาลโซน 3

**NK5 · แจ้งเตือน**
- หัวข้อ: ยามผู้ถูกสะกดเปิดประตู
- ข้อความ: วิญญาณอดีตยามประตูเมืองมาถึงคิว คืนที่เมืองแตก เขาถูกสะกดให้เปิดประตูต้อนรับผู้บุก ยักษ์ทวารบาลรู้เรื่องนี้ดีกว่าใครและขอพบท่านก่อนเริ่มคดี
- ปุ่ม: ฟังยักษ์ทวารบาล
- EN หัวข้อ: The sentry who opened the gate under a spell
- EN ข้อความ: A former city gate sentry has reached the queue. On the night the city fell, he was bound by a spell to open the gate to the invaders. The Gate Guardian knows this story better than anyone and asks to see you before the hearing begins.
- EN ปุ่ม: Hear the Gate Guardian

```js
{
  k:'gatesentry', quest:'z3KinGuard', zone:'west', sex:'m', sp:'soul-gate-sentry-west', kind:'tragic',
  name:'ยามประตูเมืองที่ถูกสะกด', en_name:'The Gate Sentry Under a Spell',
  who:'อดีตยามประตูเมืองผู้เปิดประตูให้กองบุกในคืนที่ถูกสะกด', en_who:'A former city gate sentry who opened the gate to an invading host on the night he was bound',
  face:'เกราะหนังเก่ารัดแน่น มือขวายังกำกุญแจเหล็กดอกใหญ่เหมือนไม่เคยปล่อยตั้งแต่คืนนั้น สายตาไม่มองหน้าใคร มองแต่ประตูห้อง',
  en_face:'Worn leather armour laced tight, his right hand still gripping a great iron key as though he never let go since that night. He looks at no one\'s face, only at the door of the room.',
  seen:[
    { t:'เปิดประตูใหญ่ของเมืองให้กองบุกเข้ามาในคืนเดียว ผู้คนจำนวนมากเสียชีวิตและเมืองถูกเผา', en:'Opened the city\'s great gate to an invading host in a single night. Many people died and the city burned.', s:'kha', w:5 },
  ],
  hidden:[
    { t:'ถูกสะกดด้วยเสียงสวดกล่อมจากกำแพงฝั่งตรงข้าม จำอะไรไม่ได้จนตื่นกลางเมืองที่กำลังลุกไหม้', en:'Bound by a lulling chant from the wall opposite, remembering nothing until he woke in the middle of the burning city.', s:'kha', w:-3 },
    { t:'ตื่นแล้วปิดประตูได้ครึ่งบาน ยื้อให้ผู้หญิงและเด็กสามสิบคนวิ่งออกทางหลังทัน', en:'On waking he managed to shut the gate half-way, buying time for thirty women and children to run out the back way.', s:'kha', w:-2 },
    { t:'ก่อนคืนนั้นมีผู้เตือนว่ากองบุกมีนักสะกดเสียง ให้ยัดขี้ผึ้งปิดหู เขาตอบว่าข้าไม่ใช่คนอ่อนแอพอจะถูกสะกด และไม่ยอมยัด', en:'Before that night someone warned him the invaders had voice-binders and told him to plug his ears with wax. He answered that he was no man weak enough to be bound, and refused.', s:'mao', w:2 },
  ],
  merits:[
    { t:'ปิดประตูครึ่งบานยื้อให้เด็กและผู้หญิงสามสิบคนหนีทัน', en:'Shut the gate half-way and bought time for thirty children and women to escape.', v:2, fake:false },
    { t:'อ้างว่าไม่ใช่ความผิดของข้าแม้แต่น้อยเพราะป้องกันไม่ได้เลย', en:'Claims it was not his fault in the slightest, since it could not be prevented at all.', v:1, fake:true },
  ],
  line:'"ข้าจำได้แค่เสียงกุญแจหมุนเสียงเดียว ข้าฟังมันซ้ำทุกคืนตั้งแต่นั้น"', en_line:'"All I remember is one sound, the key turning. I have heard it again every night since."',
  claims:[
    { kind:'deny', t:'ข้าไม่เคยได้ยินคำเตือนเรื่องนักสะกดเสียง ไม่มีใครบอกข้า', en:'I never heard any warning about voice-binders. No one told me.',
      reveal:'"...มีคนบอก ข้าได้ยินชัดเจน ข้าหัวเราะแล้วบอกว่าข้าไม่ใช่คนอ่อนแอ ข้าอยากให้ท่านลงโทษข้าเรื่องนั้นมากกว่าเรื่องประตู"', en_reveal:'"...Someone did tell me. I heard it clearly. I laughed and said I was no weakling. I would rather you punished me for that than for the gate."' },
    { kind:'boast', t:'ท่านดูบุญของข้าด้วย ที่เกิดขึ้นไม่ใช่ความผิดของข้าแม้แต่น้อย', en:'Count my merit too: none of what happened was my fault in the least.',
      merit:'อ้างว่าไม่ใช่ความผิดของข้าแม้แต่น้อยเพราะป้องกันไม่ได้เลย',
      reveal:'ท่านถามว่าก่อนคืนนั้นเขาปิดหูแล้วหรือยัง เขานิ่งไป — ขี้ผึ้งสามก้อนที่มีคนยื่นให้ ยังอยู่ในกระเป๋าเสื้อ ไม่เคยแกะห่อ', en_reveal:'You ask whether he had plugged his ears before that night. He falls silent. The three lumps of wax he was handed are still in his coat pocket, never unwrapped.' },
    { kind:'solid', t:'ข้าเปิดประตูนั้นด้วยมือข้า ต่อให้ข้าไม่รู้ตัว มือข้าก็คือมือข้า', en:'I opened that gate with my own hand. Even if I did not know it, my hand is my hand.' },
    { kind:'solid', truth:true, t:'ตอนตื่นข้ารีบวิ่งไปปิดประตู ข้าไม่ได้ตื่นแล้วหนี', en:'When I woke I ran to shut the gate. I did not wake and flee.',
      reveal:'ยมบาทน้อยดูรอยกุญแจบนบานประตูครึ่งปิด พบรอยสะบัดแรงของมือที่ฝืนปิดทั้งที่ประตูถูกดันจากอีกด้าน', en_reveal:'Yama examines the key marks on the half-shut door and finds the scrape of a hand forcing it closed while the door was shoved from the other side.' },
  ],
}
```
**บทคดีญาติ (KIN)** · ยักษ์ทวารบาล "ข้า" + "(กระแอม)" · คดีนี้คือเรื่องส่วนตัวที่สุดของเขา
- ช่วงก่อนขึ้นแท่น:
  - ยักษ์ทวารบาล: "ท่าน ... (กระแอม) อย่าเพิ่งมองข้า ข้าขอเล่าก่อนที่เขาจะขึ้นแท่น เมื่อชาติก่อนข้าก็เป็นยามประตูเหมือนเขา เสียงกล่อมที่เขาได้ยิน ข้าก็เคยได้ยิน ข้าตื่นขึ้นมากลางเมืองที่ไหม้ มือข้ายังกำกุญแจอยู่"
    EN Gate Guardian: "Sir ... (ahem) please do not look at me yet. Let me tell you before he is brought up. In my past life I was a gate sentry just like him. The lulling voice he heard, I heard too. I woke in the middle of a burning city with the key still in my hand."
  - ยักษ์ทวารบาล: "ข้าไม่เคยเล่าเรื่องนี้ให้ใครฟัง ท่านเป็นคนแรก คนที่จะขึ้นแท่นไม่ใช่ข้า แต่ข้ามองเขาเหมือนมองกระจก ข้าไม่ไว้ใจความเมตตาของข้าเองตอนนี้ ท่านตัดสินเอง"
    EN Gate Guardian: "I have never told this to anyone. You are the first. The man on the dais is not me, but I look at him as at a mirror. I do not trust my own mercy at the moment. You judge him."
- ช่วงระหว่างไต่สวน:
  - ยักษ์ทวารบาล: "คนถูกสะกดไม่ใช่คนไม่มีความผิดนะท่าน ข้าไม่เคยพูดอย่างนั้น ข้าแค่รู้ว่าความผิดของคนถูกสะกดเริ่มก่อนเสียงกล่อม มันเริ่มตอนที่เขาเชื่อว่าตัวเองแข็งแกร่งเกินกว่าจะโดน"
    EN Gate Guardian: "A man under a spell is not a man without fault, sir. I have never said so. I only know the fault of the bound begins before the lulling voice, at the moment he believes himself too strong to be taken."
  - ยักษ์ทวารบาล: "ข้ายังกลัวเสียงกล่อมอยู่ทุกวัน ท่านสะกดจิตได้ ข้ารู้ ข้าไม่ได้รังเกียจ ข้าแค่ขอ อย่าใช้มันกับข้า"
    EN Gate Guardian: "I still fear that lulling voice every day. You can bind minds, I know. I do not hold it against you. I only ask, do not use it on me."
- ช่วงหลังตัดสิน:
  - ยักษ์ทวารบาล: "ท่านตัดสินแล้ว ข้าขอเข้าไปยืนข้างเขาตรงปากประตูได้ไหม หรือท่านอยากให้ข้าเล่าก่อน ข้าไม่รู้ว่าทางไหนที่เขาจะยอมให้ข้าเข้าใกล้"
    EN Gate Guardian: "You have judged. May I go and stand beside him at the mouth of the gate? Or would you rather I told him my story first? I do not know which way he will let me near."
- ทางเลือก: **[ให้ยักษ์ยืนข้างเขาที่ปากประตูโดยไม่พูดอะไร]** / **[ให้ยักษ์เล่าเรื่องคืนที่ตนเองก็ถูกสะกดให้เขาฟัง]**
  EN: **[Let the Guardian stand beside him at the gate without a word]** / **[Let the Guardian tell him of the night he too was bound]**
  - (ยืนข้าง ๆ) บรรยาย: ยักษ์ทวารบาลก้าวไปยืนข้างทหารยามที่ปากประตู ไหล่ชนไหล่ ไม่เอ่ยสักคำ กุญแจเหล็กดอกใหญ่ในมือยามสั่นช้า ๆ แล้วนิ่ง · ยามที่ถูกสะกด: "ข้างข้ามีคนยืนอยู่ ... คืนนั้นไม่มีใครยืนข้างข้าเลย" · ยักษ์ทวารบาล: "ข้ามาช้าเหลือเกิน ขอโทษที่ช้า"
    EN Narration: The Gate Guardian steps up beside the sentry at the gate, shoulder to shoulder, saying nothing. The great iron key in the sentry\'s hand trembles slowly, then stills. · Sentry: "There is someone standing beside me ... that night no one stood beside me." · Gate Guardian: "I came far too late. Forgive me for being late."
  - (เล่าเรื่อง) ยักษ์ทวารบาล: "คืนนั้นข้าได้ยินคนร้องเพลงกล่อมจากกำแพงฝั่งโน้น ไพเราะมาก ข้าบอกตัวเองว่าฟังนิดเดียว แล้วข้าก็ไม่รู้เรื่องอะไรอีกเลยจนตื่นกลางไฟ" · ยามที่ถูกสะกด: "ท่านก็ ... ท่านยังเป็นยักษ์ได้อีกหรือ" · ยักษ์ทวารบาล: "ข้าเป็นได้เพราะมีคนยอมให้ข้าเป็นใหม่ ข้าหวังว่าจะมีคนยอมให้เจ้าเป็นเช่นกัน"
    EN Gate Guardian: "That night I heard someone singing a lullaby from the opposite wall, so sweet. I told myself I would listen for just a moment, and then I knew nothing until I woke in the fire." · Sentry: "You ... you can still be a guardian after that?" · Gate Guardian: "I can, because someone let me begin again. I hope someone will let you do the same."

---

## 6. ข้อเสนอเสริม

### 6.0 ศึกทดสอบยักษ์ทวารบาลโซน 3 (**ไม่อยู่ในสเปกคุณเป้** · โค้ดไม่มี `westGuardTest` · เขียนเป็นชุดเสริมค่าเริ่มต้นปิด · ถ้าไม่เอา ตัดทั้งหัวข้อนี้ได้ ไม่กระทบเรื่องอื่น)
เหตุที่เสนอ: โซน 2 มีทดสอบยักษ์ทวารบาล โซน 3 ไม่มี ทำให้ผู้เล่นอาจรู้สึกไม่เท่ากัน และยักษ์ทวารบาลโซน 3 มีเรื่องกลัวถูกสะกดจากคดีญาติ 5 ที่ต่อกับพลังสะกดจิตของผู้เล่นได้พอดี · ลำดับ: กดจ้าง → N6-1 → คัตซีน `z3-guard-test-open` → สู้ → ชนะจึงเข้าทีม (แพ้ = ยังไม่เข้า ลองใหม่ได้)

**N6-1** หัวข้อ: ยักษ์ทวารบาลขอทดสอบ · ข้อความ: ก่อนรับท่านเป็นนาย ยักษ์ทวารบาลแห่งปัจฉิมขอทดสอบว่าท่านเหมาะกับตำแหน่งนี้หรือไม่ เขาไม่ใช่ศัตรู แต่จะไม่ออมแรง · ปุ่ม: รับมือ
EN: The Gate Guardian asks to test you / Before taking you as his master, the Gate Guardian of the West wants to see whether you suit the post. He is no enemy, but he will not hold back. / Face him
**N6-2 แบนเนอร์** ไทย: ศึกพิสูจน์นาย · ยักษ์ทวารบาล · EN: Proving the master · Gate Guardian
**N6-3 ชนะ** หัวข้อ: ยักษ์ทวารบาลยอมรับ · ข้อความ: ท่านผ่านการทดสอบ ยักษ์ทวารบาลพร้อมเข้าร่วมทีม · ปุ่ม: ต่อ · EN: The Gate Guardian accepts / You passed the test. The Gate Guardian is ready to join your team. / Continue
**N6-4 แพ้** หัวข้อ: ยักษ์ทวารบาลรอท่านอยู่ · ข้อความ: ยักษ์ทวารบาลหยุดมือไว้ก่อน ท่านตั้งหลักแล้วลองอีกครั้งได้ · ปุ่ม: ทดสอบอีกครั้ง · EN: The Gate Guardian waits for you / The Gate Guardian lowers his club for now. Steady yourself and try again. / Test again
```js
'z3-guard-test-open': { title:{ th:'ยักษ์ทวารบาลขอทดสอบ', en:'The Gate Guardian Asks to Test You' }, pages:[
  { title:{ th:'ข้ายังไม่ได้พยักหน้านะ', en:'I Have Not Nodded Yet' }, line:{ th:
    'ยักษ์ทวารบาล: "เดี๋ยวก่อนท่าน ข้ายังไม่ได้พยักหน้าเลยนะ (กระแอม) ข้าเฝ้าประตูปัจฉิมมาก่อนท่านจะมาเป็นผู้ถือบัญชี ใครจะเป็นนายข้าต้องผ่านกระบองข้าก่อน"\n'
  + 'ยมบาทน้อย: "ผมเข้าใจครับ ขออนุญาตแสดงฝีมือให้ท่านเห็น"',
    en:
    'Gate Guardian: "Hold on, sir, I have not nodded yet. (Ahem.) I kept the gate of the West before you ever became keeper of the ledger. Whoever would be my master must get past my club first."\n'
  + 'Yama: "I understand. Allow me to show you what I can do."' } },
  { title:{ th:'ไม่ใช่เพราะอยากสู้', en:'Not Because I Want to Fight' }, line:{ th:
    'ยักษ์ทวารบาล: "ข้าไม่ได้อยากทำร้ายท่านหรอกนะ ข้าแค่รู้ว่านายที่ฝีมือไม่ถึงนั้นอันตราย ข้าเคยยืนประตูที่เปิดผิดคืน ข้าไม่อยากยืนอีกที่หนึ่งกับนายที่ไม่พร้อม"\n'
  + 'บรรยาย: ยักษ์ทวารบาลกำกระบองด้วยสองมือ ยืนกางขาบังประตูเหมือนที่ยืนมาตลอดชีวิต มือข้างหนึ่งสั่นเล็กน้อยก่อนจะนิ่ง',
    en:
    'Gate Guardian: "I do not want to hurt you, you know. I only know that a master who falls short is dangerous. I once stood at a gate that opened on the wrong night. I do not want to stand at another with a master who is not ready."\n'
  + 'Narration: The Gate Guardian grips his club in both hands and plants his feet to block the doorway the way he has all his life. One hand trembles slightly, then steadies.' } },
]},
'z3-guard-test-win': { title:{ th:'ยักษ์ทวารบาลยอมรับ', en:'The Gate Guardian Accepts' }, pages:[
  { title:{ th:'ข้ายอม', en:'I Yield' }, line:{ th:
    'ยักษ์ทวารบาล: "ได้ ข้ายอม! ท่านไม่ใช่คนแรงที่สุดที่ข้าเคยเจอ แต่ท่านไม่ถอยสักก้าว ข้านับถือคนแบบนี้ (กระแอม) จะเรียกท่านว่านายก็ได้ แต่อย่าเพิ่งให้ข้าเรียกบ่อยนะ"',
    en:
    'Gate Guardian: "All right, I yield! You are not the strongest I have faced, but you did not give a single step. I respect that. (Ahem.) You may be called master, but do not make me say it too often yet."' } },
]},
'z3-guard-test-lose': { title:{ th:'ยักษ์ทวารบาลรอท่านอยู่', en:'The Gate Guardian Waits' }, pages:[
  { title:{ th:'ข้ายืนรออยู่', en:'I Stand Waiting' }, line:{ th:
    'ยักษ์ทวารบาล: "ลุกเถอะท่าน ข้ายังไม่เรียกว่าแพ้ ท่านตั้งหลักแล้วมาใหม่ ข้ายืนรออยู่หน้าประตู"',
    en:
    'Gate Guardian: "Get up, sir. I do not call that a loss. Steady yourself and come again. I will be standing at the gate."' } },
]},
```
- ภาพ: `cut-guard-test-west` (P2 ข้อ 8) · ถ้าไม่เอาศึกนี้ ไม่ต้องวาด

---

## 7. ข้อเสนอแยก (ไม่ใช่ของคุณเป้): คดีญาติของนัวร์ 1 คดี · 2 แบบให้เลือก
ช่องว่างที่พบ: นัวร์ (ดำ ประจำปัจฉิม) ยังไม่มีคดีญาติ (สเปกโซน 3 ระบุ 5 คดี ไม่มีนัวร์) · นัวร์เป็นหัวหน้าคนงานที่ผู้เล่นเห็นทุกวัน (ปุ่ม "สั่งงานครัว") คดีของเขาจึงควรเข้ากับธีมครัวและการทำตามคำสั่ง · ถ้าเลือกแล้ว ผมเขียนสำนวนเต็มและบท KIN ต่อ (ให้ระดับเดียวกับ 5.1-5.5) · ขึ้นเมื่อจ้างนัวร์ตามกติกาคดีญาติทั่วไป

### แบบ A · เจ้านายเก่าผู้ให้ทำบัญชีสองเล่ม
- วิญญาณ: เจ้าของโรงทานท่าเรือผู้มอบหมายให้นัวร์ลอกตัวเลขสองเล่ม (เล่มจริง/เล่มโชว์) โดยไม่อธิบาย นัวร์ลอกตามคำสั่งทุกบรรทัดและไม่เคยถามว่าทำไม จนโรงทานถูกยึดและคนจนอดข้าวในฤดูหนาว
- บาปหลัก: `kong` ฉ้อโกงกองบุญ (w 4) · ส่วนเบาลง: เขาซ่อนข้าวสำรองเล็กน้อยไว้ในเล่มโชว์เผื่อฤดูแล้ง (w -2) · บุญจริง: ไม่เคยเอาเงินกองบุญเข้ากระเป๋าตนแม้เหรียญเดียว · บุญปลอม: อ้างว่าเล่มโชว์คือความโปร่งใส
- ทางเลือกท้ายคดี: [ให้นัวร์อ่านตัวเลขทั้งสองเล่มออกเสียงต่อหน้าเขา] / [ให้นัวร์เผาเล่มโชว์แล้วเก็บเล่มจริงไว้เป็นหลักฐาน]
- ตัวอย่างบท นัวร์: "ท่านครับ ผมลอกตามสั่งมาตลอด ผมนึกว่ายิ่งไม่ถามยิ่งเป็นลูกจ้างที่ดี" · EN Noir: "Sir, I copied exactly as told. I thought the less I asked, the better a servant I was."
- จุดเด่น: ต่อกับโพเอน่า (ทำตามหมาย) แต่เป็นฝั่งงานบัญชี · ข้อควรระวัง: ธีม "ทำตามคำสั่งโดยไม่ถาม" ซ้ำกับคดีญาติ 1 ค่อนข้างมาก

### แบบ B · แม่ครัวโรงทานที่เอาของค้างคืนมาปรุงใหม่
- วิญญาณ: แม่ครัวโรงทานที่นัวร์เคยสอนว่า "ไม่ทิ้งอาหาร" เธอเอาสตูว์ค้างคืนมาอุ่นให้เด็กข้างถนนกิน เด็กป่วยหนักสองคน หนึ่งในนั้นไม่ฟื้น เธออดมื้อนั้นเพื่อให้เด็กพอ
- บาปหลัก: `kha` ประมาทจนเป็นอันตราย (w 2) · ส่วนเบาลง: ไม่มีใครบอกเรื่องของบูด/ไม่มีตู้เย็น (w -2) · บุญจริง: เลี้ยงเด็กข้างถนนฟรีสิบปี · บุญปลอม: อ้างว่าไม่เคยมีใครป่วยเพราะอาหารของเธอ
- ทางเลือกท้ายคดี: [ให้นัวร์เขียนป้ายวันหมดอายุติดทุกหม้อในโรงอาหารของท่าน] / [ให้นัวร์ต้มโจ๊กใหม่ให้เธอกินก่อนไป]
- ตัวอย่างบท นัวร์: "ท่านครับ ผมเป็นคนบอกเธอเองว่าอย่าทิ้งอาหาร ผมไม่เคยบอกต่อว่าอาหารเก่าก็ทำให้คนป่วยได้" · EN Noir: "Sir, I was the one who told her never to throw food away. I never told her that old food can make people ill too."
- จุดเด่น: ต่อกับแผงโรงอาหารและปุ่ม "สั่งงานครัว" ที่ผู้เล่นใช้อยู่ · ผลดีต่อเกม: ตัวเลือก A ของท้ายคดีสามารถเป็นข้อความบันทึกเฉย ๆ ไม่ต้องมีผลในระบบ
- **ผมแนะนำแบบ B** (ธีมต่างจากคดีอื่นมากกว่า และผูกกับระบบที่ผู้เล่นเห็นจริง)

---

## 8. ภาพที่ต้องวาด (ส่ง Codex) · ไม่ซ้ำกับที่มีแล้ว
ชื่อไฟล์ `img/z3-events/*.webp` · คัตซีน 1672×941 · ภาพรอง/พร็อป 1375×768 · สไปรท์/โปรไฟล์วิญญาณขนาดตาม `soul-sita-th*.webp` ที่มีอยู่แล้ว · ไม่มีตัวอักษรในภาพ · ไม่มีภาพกัดคอ/เลือดชัด

**ใช้ของเดิมได้ ไม่ต้องวาด (ผมเห็นชื่อในโค้ดจริง):** `img/deva-intro/deva-intro-west-v1.webp` (เอียร์ลิน) · `img/frontier-west-hypnosis-v1.webp` (ระลอก 3) · `img/West/Boss Zone3-cutscene.webp` (เซเวอริน) · `img/story-west-01.webp`, `img/story-west-02.webp` · สไปรท์ `boss-tester-west` `boss-frontier-west` · การ์ดท่าบอสโซน 3 สี่ใบใน `boss-skills-data.js` (`cut-eirlin-spearrain-west` `cut-valdric-batstorm-west` `cut-cerberus-howl-west` `cut-jormungandr-tide-west`) และสไปรท์เซอร์เบอรัส/ยอร์มุนกันดร์ (ตามใบงาน BOSS-ART-2 ที่ใบงานนี้บอกว่ามีแล้ว · **ผมไม่ได้เปิดดูไฟล์จริง**)

**ตรวจก่อนวาด (ผมยืนยันชื่อไฟล์ไม่ได้):** ภาพเปิดชายแดนปัจฉิม (โซน 2 ใช้ `img/frontier-asia-intro-v1.webp` ในฉากเดียวกัน · โซน 3 น่าจะมีชื่อคล้าย ๆ `frontier-west-intro-v1`) · ภาพเปิดท่าเรือของเซเวอริน (โซน 2 ใช้ `img/Asia/Intro-Boss-Zone2-asia.webp` · โซน 3 น่าจะมี `img/West/Intro-Boss-Zone3-west.webp`) · พื้นหลังคฤหาสน์/ถ้ำที่วาลดริกกลับไปยืน · ถ้ามีชิ้นไหนอยู่แล้ว ตัดออกจากตารางด้านล่าง

### P1 · ต้องมี (11 รายการ)
| # | ไฟล์ที่เสนอ | ขนาด | คำบรรยาย | ใช้กับ |
|---|---|---|---|---|
| 1 | `cut-arrive-west.webp` | 1672×941 | ลานหินปัจฉิมปกคลุมหิมะบาง โคมเหล็กเรียงสองข้าง โพเอน่ากับพ่อค้านรกยืนใต้โคมแรก วิญญาณสองสามดวงเดินวนตาเรืองเขียวจาง ไกลสุดมีเงาสุนัขสามเศียรหน้าประตูชายแดน | `z3-arrive` |
| 2 | `cut-cerberus-wakes-west.webp` | 1375×768 | เซอร์เบอรัสทรุดนั่ง สามเศียรกะพริบตา แสงเขียวหลุดเป็นฝอย โพเอน่าวางมือบนเศียรกลาง หิมะปลิว | `z3-cerberus-win` |
| 3 | `cut-frontier-boss-to-dais-west.webp` | 1672×941 | วาลดริกเดินนำหน้าบนลานหินที่หิมะกำลังละลายตามรอยโคม ยามากับนิราเดินตาม ผู้เช่าที่ตื่นแล้วยืนสองข้างทางถือผ้าห่ม | `frontier-west-boss-to-dais` |
| 4 | `cut-frontier-boss-punished-west.webp` | 1672×941 | วาลดริกนั่งบนขอบกระทะทองแดง ไม่ถอดโค้ต ไอร้อนลอยขึ้น น้ำแข็งที่หนวดละลายเป็นหยด มองขอบฟ้าตะวันออกที่ยังมืด (ไม่มีภาพเลือด) | `frontier-west-boss-punished` |
| 5 | `cut-frontier-boss-released-west.webp` | 1672×941 | วาลดริกยืนหน้าประตูคฤหาสน์ ดึงม่านหน้าต่างเปิดครึ่งบาน แสงโคมจากลานสาดเข้าห้องมืด ยามายืนอยู่ปลายเนินมองขึ้นมา | `frontier-west-boss-released` |
| 6 | `cut-sev-jorm-arrive-west.webp` | 1672×941 | เซเวอรินในเกราะเงินลายกะโหลกน้ำเงินยืนบนท่าเรือฝั่งขวา ถือสมุดบัญชีเล่มหนา ด้านหลังเขาอสรพิษโลกเกล็ดเทาน้ำเงินโผล่หางสูงเหนือน้ำ ยามากับนิราตัวเล็กมากทางซ้ายล่าง | `z3-sev-open` |
| 7 | `soul-false-judge-west.webp` + `-profile.webp` | ตามขนาด soul-sita-th | อดีตผู้พิพากษาชุดคลุมเทาถ่าน หลังตรง กุมหมายม้วนไว้ไม่กล้าวาง | `falseorder` |
| 8 | `soul-younger-brother-west.webp` + `-profile.webp` | ตามขนาดเดียวกัน | ชายหนุ่มผอมสูง ปลายนิ้วเขม่า ยืนเอียงซ้ายเหมือนมีคนเดินข้าง ๆ | `youngerbrother` |
| 9 | `soul-prophecy-client-west.webp` + `-profile.webp` | ตามขนาดเดียวกัน | หัวหน้าตระกูลพ่อค้าเสื้อคลุมขนสัตว์เก่า ตาแดง กำสมุดบัญชีเรือเล่มเล็กแน่น | `doomclient` |
| 10 | `soul-carer-daughter-west.webp` + `-profile.webp` | ตามขนาดเดียวกัน | หญิงผมรวบเรียบร้อย โค้ตกลัดผิดกระดุม ถือช่อดอกไม้เหี่ยว | `carerdaughter` |
| 11 | `soul-gate-sentry-west.webp` + `-profile.webp` | ตามขนาดเดียวกัน | ยามเกราะหนังเก่า มือขวากำกุญแจเหล็กดอกใหญ่ มองแต่ประตู | `gatesentry` |
("รายการ" = ภาพหลัก + profile นับเป็น 1 · ภาพคัตซีนจริง 6 ใบ + สไปรท์วิญญาณ 5 ตัว)

### P2 · ใช้ภาพอื่นแทนก่อนได้ (9 รายการ)
| # | ไฟล์ที่เสนอ | ขนาด | คำบรรยาย | แทนด้วยอะไรก่อน |
|---|---|---|---|---|
| 12 | `cut-freeze-west.webp` | 1672×941 | ลานปัจฉิมกลางวิญญาณหยุดกลางก้าว หิมะลอยค้างกลางอากาศ โพเอน่ากับนิราเดินท่ามกลางรูปปั้นสีซีด | `frontier-west-hypnosis-v1` |
| 13 | `cut-valdric-down-west.webp` | 1375×768 | วาลดริกคุกเข่าข้างเดียวบนหิมะ ไม้เท้าหัวค้างคาวกลิ้งอยู่ข้างตัว ค้างคาวบินกลับเข้าชายเสื้อ | `frontier-west-hypnosis-v1` |
| 14 | `cut-jorm-yields-west.webp` | 1672×941 | ยอร์มุนกันดร์คลายขดจมลงน้ำ ปลายหางโผล่พ้นผิวน้ำ เซเวอรินเปิดสมุดมองด้วยสีหน้าประหลาดใจ ยามากับนิราริมท่า | การ์ด `cut-jormungandr-tide-west` |
| 15 | `frontier-west-intro-v1.webp` (ตรวจก่อนว่ามีอยู่) | 1672×941 | ชายแดนปัจฉิม หมอกขาวไหลลงเนิน ประตูเปิดครึ่งบาน ปีศาจยืนนิ่งในหมอก คฤหาสน์เก่าหน้าต่างสว่างวาบบนเนิน | ภาพชายแดนที่มีอยู่ |
| 16 | `prop-false-writ-west.webp` | 1375×768 | โคลสอัปหมายคำสั่งเท็จ ตราประทับหมึกผิดสี ไม่มีเลขรับรอง ใช้ตอนเฉลยในสำนวน | โปรไฟล์วิญญาณ |
| 17 | `prop-prophecy-slate-west.webp` | 1375×768 | แผ่นหินทำนายมีคำว่า "อาจ" ถูกรอยหมึกทับเหลือแต่คำว่า "คืนนั้น" | โปรไฟล์วิญญาณ |
| 18 | `soul-hypnotized-west-a/b.webp` | ตามสไปรท์วิญญาณทั่วไป | วิญญาณตาเรืองเขียวจางเดินวน 2 แบบ (ชายชรา/หญิงสาว) สำหรับคดี 0 | ภาพวิญญาณทั่วไป (kind 10 ของเดิม) |
| 19 | `cut-guard-test-west.webp` | 1672×941 | ยักษ์ทวารบาลโซน 3 ยืนกางขาบังประตู มือหนึ่งสั่นเล็กน้อย ยามาเผชิญหน้า (**เฉพาะถ้าเอาข้อ 6.0**) | ไม่ต้องวาดถ้าไม่เอา |
| 20 | `soul-noir-kin-west.webp` + `-profile.webp` | ตามขนาดเดียวกัน | วิญญาณคดีนัวร์ (**เฉพาะหลังคุณเป้เลือกแบบ A/B ข้อ 7**) | — |

---

## 9. สรุปจำนวน
- **event ตามสเปก:** คดี 0 · 5 · 10 · 15 (4 event) + คดีญาติ 5 คดี = 9 ข้อตามสเปก · บวกสำนวนไต่สวนวาลดริก 1 สำนวน = **6 สำนวนไต่สวนใหม่** (วาลดริก + ญาติ 5)
- **คัตซีนใหม่ที่เขียน 18 ชุด + ศึกทดสอบยักษ์เสนอเสริม 3 ชุด (รวม 21):** คดี 0 = 4 (`z3-arrive`, `z3-cerberus-open/win/lose`) · คดี 5 = 6 (`z3-freeze`, `z3-breach-intro`, `z3-valdric-down`, `frontier-west-boss-to-dais/punished/released`) · คดี 10 = 3 (`z3-eirlin-open/win/lose`) · คดี 15 = 5 (`z3-sev-open`, `z3-jorm-yields`, `z3-jorm-lose`, `z3-sev-win`, `z3-sev-lose`) · ศึกทดสอบยักษ์ (ข้อเสนอ) = 3 (`z3-guard-test-open/win/lose`)
- **คัตซีนเดิมที่ใช้ตรงตัว:** `west-hypnosis` · `deva-west` (+ i18n `deva.west.arrival`) · `STORY.west` 2 แผง · boss-guide โซน west
- **ภาพ:** P1 11 รายการ (คัตซีน 6 + สไปรท์วิญญาณ 5 ตัว) · P2 9 รายการ (รวมของเสริมที่ขึ้นกับคำตัดสิน 2)
- **บรรทัดเดิมจาก `data.js` ที่ใช้ตรงตัว:** `bossArrive` 4 บรรทัด + `bossWin` 2 บรรทัด ของ `ZONES.west`

---

## 10. ต้องให้คุณเป้ตัดสิน (เลือกแบบปลอดภัยไว้แล้ว ไม่หยุดงาน)
1. **ระลอก 3 ของคดีครบ 5:** สเปกเขียน "ปีศาจ 3 ระลอก" แต่โค้ดเดิมเป็นปีศาจ 2 ระลอก + ระลอก 3 เป็นลูกทีม (ทัณฑ์/ดำ) ที่ถูกสะกด (เนื้อเรื่องเก่า `west-hypnosis`) · ผมใช้โครงเดิมและนับเป็น 3 ระลอก · ถ้าอยากให้ระลอก 3 เป็นปีศาจล้วน ต้องตัดฉาก `west-hypnosis` ออก (ไม่แนะนำ เพราะรางวัล "สะกดจิต" ผูกกับฉากนั้น)
2. **ตัดสินวาลดริก (แท่น) ล็อกคำตอบ:** ผมเสนอ กระทะทองแดง · มัวเมา · ปานกลาง (3/5) เหมือนที่โซน 2 ล็อกลานตรากตรำให้อากุระ · คุณเป้เปลี่ยนสถานี/ระดับได้ แก้แค่หน้า `frontier-west-boss-punished` หน้าเดียวกับข้อความตัดสิน 3 บรรทัด
3. **เบื้องหลังวาลดริก (เขียนเพิ่มเอง):** ไม่ดื่มเลือดมาสองร้อยปีตามคำปฏิญาณ ใช้ไวน์แทน · ผู้เช่าหลับในหมอกเพราะกลัวการตัดสินพรากความทรงจำ · ไม่มีบทไหนอ้างตำนานจริง ใช้ได้ถาวรเหมือนเบื้องหลังอากุระหรือไม่
4. **เซอร์เบอรัสหลังตื่น:** ผมเขียนให้ไปนอนขดข้างเสาประตูล่าง (เป็นของประดับ/ผู้พิทักษ์ที่ยืนอยู่ต่อ) · ให้เข้าทีมหรือคุยได้หรือไม่ ให้คุณเป้ตัดสิน (ผมไม่ได้เขียนบทคุยกับเขา เพราะไม่พูด)
5. **แพ้เซเวอริน แล้วต้องสู้ยอร์มุนกันดร์ซ้ำไหม:** ผมเสนอ **ไม่ซ้ำ** (อสรพิษถอยแล้วถือว่าผ่าน สู้แต่เซเวอรินใหม่) · ถ้าให้ซ้ำ ฉาก `z3-jorm-yields` ต้องเล่นอีกรอบ
6. **เบาะแส PHANTOM-404 ในโซน 3:** สเปกไม่กำหนด ผมเตรียมไว้ 2 จุด ค่าเริ่มต้น**ปิด** ทั้งคู่ (ธง `Z3_PHANTOM_CLUE`): หน้า 3 ของ `z3-cerberus-win` (ใบเวรเซอร์เบอรัสถูกแก้) และหน้า 3 ของ `z3-sev-win` (เซเวอรินพบยอดค้างสามรายการไม่ตรง) · เปิดแล้วเบาะแสไล่ต่อเนื่อง สีดา → ฝูงลิง → เซอร์เบอรัส → เซเวอริน → โซน 4 · ปิดแล้วเรื่องหลักไม่เสียหาย
7. **ศึกทดสอบยักษ์ทวารบาลโซน 3 (ข้อ 6.0):** สเปกไม่ได้ขอ ผมเสนอเป็นชุดเสริม ค่าเริ่มต้น**ปิด** · เอาหรือไม่เอา
8. **ชื่อโพเอน่า:** ผมอนุมานว่าทัณฑ์ประจำปัจฉิมชื่อโพเอน่า (ข้อ 0.5) · ถ้า `CREW` ชื่ออื่น แทนทั้งไฟล์ได้ · ให้คุณเป้หรือ Toby ยืนยันชื่อห้าคน (โพเอน่า นัวร์ อ็อกเนียน ซิบิล เกรซ) กับ CREW
9. **เพศ/สรรพนามของโพเอน่า อ็อกเนียน ซิบิล เกรซ พ่อค้านรก:** อนุมานจากชื่อและบทบาท (ข้อ 0.1 / 0.5) ถ้าสไปรท์ขัด ผมแก้ให้ตามที่คุณเป้บอก
10. **คดีญาติ 3 ทางเลือก B "ซิบิลขอไปรับทัณฑ์ด้วย":** ให้เป็นข้อความอย่างเดียว หรือให้ซิบิลหายไปทำงานไม่ได้ 3 วาระ (ผมแนะนำข้อความอย่างเดียว เพราะผู้เล่นที่เลือกทางนี้ไม่ควรถูกลงโทษซ้ำ)
11. **คดีญาตินัวร์ (ข้อ 7):** เลือกแบบ A หรือ B (ผมแนะนำ B) หรือไม่เอาเลย
12. **เลขคดีที่เปลี่ยนจากโค้ดเดิม (ตามสเปก ไม่ต้องตัดสิน แต่ต้องรู้):** ปีศาจฝ่าชายแดน 3 → 5 · เทวดา 7 → 10 · บอสโซน 10 → 15 (`ZONE_BOSS_AT.west = 15`) · เซฟเก่าของผู้เล่นที่เลยคดี 3/7 ไปแล้วต้องจัดการเหมือนที่ Toby ทำใน migration โซน 2

---

## 11. ให้ Reese ตรวจ (สั้น ๆ)
1. **วาลคีรี** (3.5): "เลือกนักรบที่ล้มในศึกไปยังวัลฮัลลา" ตรงกับที่ Reese แก้ไว้ในรอบก่อน (R3) · หอก/ปีกของเอียร์ลินเป็นการออกแบบเกม · ชื่อท่า "หอกเลือกผู้ควร" เป็นการสื่อแนวคิด ไม่ใช่ท่าในตำนาน
2. **เซอร์เบอรัส** (1.3-1.6): สุนัขสามเศียรผู้เฝ้าประตูโลกใต้ดินตำนานกรีก (R5 ผ่านแล้ว) · "ถูกสะกด" เป็นการดัดแปลงเกม · "เคยกินอาหารจากมือโพเอน่า" เป็นเรื่องแต่งของเกม · ตำนานเดิมมีการกล่อมเขาด้วยขนมน้ำผึ้ง (ผมไม่ได้ใช้ ถ้าต้องการเกร็ดนี้ให้ Reese ยืนยันตัวบทก่อน)
3. **ยอร์มุนกันดร์** (4.3, 4.5): อสรพิษโลกล้อมโลกและกัดหางตัวเอง (R6 ผ่านแล้ว) · บทนี้ "ตัวมันถอยและจมน้ำ ไม่ตาย" และ "ปลายหางโผล่พ้นน้ำทั้งที่ควรอยู่ในปาก" สื่อลางรากนาโรก (Reese เคยยืนยันว่าสอดคล้อง) · ไม่ใช้พิษ ไม่ใช้ธอร์ · เซเวอรินพูดว่า "ขอยืมมา" เป็นเรื่องแต่งเกม ไม่ล้อเลียนต้นเรื่อง · คำที่เอียร์ลินพูดเรื่อง "ลางคลื่นถอย" (3.6) ตรวจน้ำเสียงเคารพตำนาน
4. **โพเอน่า / ซิบิล / อ็อกเนียน / เกรซ / นัวร์** (ข้อ 0.5): ชื่อ Poena = บุคลาธิษฐานของการลงโทษในตำนานโรมัน/กรีก · Sibyl = หมอดูหญิงในตำนานกรีก-โรมัน (ชื่อทั่วไป) · Ognien = สะกดใกล้ Ognjen ชื่อบุรุษเซอร์เบีย/โครเอเชีย จากคำว่า oganj แปลว่าไฟ และใกล้ ogień ของโปแลนด์ (ไม่พบ "Ognien" เป็นชื่อบุคคลที่ยืนยันได้ Rae ปรับเอง) · ขอให้ Reese ยืนยันว่าการใช้เป็นชื่อตัวละครไม่ชนชื่อแบรนด์หรือเกมใหญ่
5. **แวมไพร์** (2.x): ไวน์แทนเลือด ค้างคาว โค้ต ไม่มีภาพกัด (R4 ผ่านแล้ว) · "คำปฏิญาณไม่ดื่มเลือดสองร้อยปี" และ "ผู้เช่าหลับในหมอก" เป็นเรื่องแต่งเกม · ไม่ทำให้แวมไพร์ตายด้วยแสงอาทิตย์ (ใช้ "แสงโคม/ม่าน" เชิงสัญลักษณ์)
6. **ศัพท์ไทย:** "วัลฮัลลา" (ตรงที่ Reese ใช้) · "เซอร์เบอรัส" · "ยอร์มุนกันดร์" · "กระทะทองแดง" ตามชื่อสถานีในโค้ด · "ลานหิน/ท่าเรือ/แม่น้ำวิญญาณ" ตรงของเดิมในเกม
7. **คดีครบ 5 (วาลดริก)**: ไม่เทียบกับคดีจริงในปัจจุบัน · คดีญาติ 1 (หมายเท็จ) / 3 (คำทำนาย) / 4 (ทิ้งแม่ที่สถานพัก) / 5 (ยามถูกสะกด) เป็นเรื่องแต่ง ไม่เทียบกับเหตุการณ์หรือบุคคลจริง · คดีญาติ 4 ผูกกับสถานการณ์ผู้สูงอายุที่ละเอียดอ่อน ขอให้ chris-culture ดูน้ำเสียงเมื่อถึงโหมด ship
8. **ข้อความตรงกับโค้ด (ให้ Toby/Reese เทียบ):** บรรทัดเดิม 6 บรรทัดที่ใช้ตรงตัว (ข้อ 4.3, 4.6) กับ `data.js` ~2113-2120 · ข้อความ `deva.west.arrival` ที่ผมไม่แตะ

---

## 12. หมายเหตุ
- ผมไม่ได้แตะโค้ดหรือไฟล์ในโปรเจกต์เกม (อ่านอย่างเดียว) · ชื่อคีย์ทุกตัวเป็นข้อเสนอ ให้ Toby ปรับให้เข้ากับระบบ · ฟิลด์ `en_*` ในสำนวนไต่สวนเป็นข้อเสนอรูปแบบ (ถ้าระบบสำนวนมีที่เก็บ EN แบบอื่น ให้ย้ายตาม)
- ผมไม่ได้เขียนบทเฉลยตัวผู้อยู่เบื้องหลัง [PHANTOM-404] (เหมือนโซน 2) · เบาะแสโซน 3 เป็นของเสริมที่ปิดอยู่
- ป้ายผู้พูดในบทเดิม `deva.west.arrival` เป็น "yama:" ตัวพิมพ์เล็กปน "วาลคีรี:" ต่างจากป้ายอื่นที่ใช้ "ยมบาทน้อย:" (ไม่ใช่ความผิดของบทนี้ แจ้งไว้ ถ้าจะเก็บให้เนียนเปลี่ยนเป็น "ยมบาทน้อย:" ได้โดยไม่กระทบความหมาย)
- ไม่มี emoji · ไม่มีคำหยาบ · ไม่มีภาพกัดคอหรือเลือดชัด · ไม่มีฉากลงโทษที่ใช้เลือด



---
**Claudy 15 พ.ย. (หลัง Reese `Output/Reese/2026-11-15-avegee-z3-events-factcheck.md`):** ลางในตำนานคือทะเลปั่นป่วน/ท่วมเมื่อหางหลุดจากปาก — "คลื่นถอย" ในบทเอียร์ลินเป็นเกร็ดที่เกมแต่งเอง ไม่ต้องแก้บท · "ผู้ตรวจหอกวาคิวรี" เป็นการสะกดในตารางคุณเป้ (คำที่ถูกตามพจนานุกรมคือ "วาลคีรี") คงไว้ก่อน รอคุณเป้ยืนยัน
