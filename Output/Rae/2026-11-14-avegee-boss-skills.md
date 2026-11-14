# AVEGEE · ตารางท่าไม้ตายบอสทุกตัว (BOSS-SKILLS ข้อ 2) · TH/EN

ผู้เขียน: Rae · 15 พ.ย. 2569 · ตามใบงาน `Output/Claudy/briefs/2026-11-14-avegee-boss-skills-plan.md` ข้อ 2
คำคุณเป้ 14 พ.ย.: "พวกบอสเทวดา บอสชายแดน บอส event บอสแต่ละโซน สามารถเพิ่มความยาก ท่าไม้ตาย ได้ตามบทบาทความเหมาะสมในเนื้อเรื่องเลยครับ"
สถานะ: ร่างพร้อมเสียบ · ยังไม่ผ่าน Reese / chris-culture · ไม่ได้แตะโค้ดใน repo (อ่านอย่างเดียว) · **ตัวเลขทุกตัวเป็นข้อเสนอตั้งต้น ให้ Toby จูนด้วยซิมให้ได้เป้าตามแผน** (ผมไม่ได้รันซิม)

อ่านจาก: `src/boss-skills.js` (4 ชนิดท่า + เงื่อนไข `when`) · `src/z2-events.js` `Z2_BOSS_SKILLS` · `src/data.js` `ZONE_EVENTS` / `ZONES` / `BOSS_ULTIMATE` · `src/i18n.js` (ชื่อ EN ที่เกมใช้อยู่) · `Output/Rae/2026-10-28-avegee-lore-bible.md` (บทบาทตัวละคร) · `Output/Rae/2026-11-14-avegee-z2-events.md` · `Output/Toby/2026-11-14-avegee-wukong-harder.md` · ภาพบอสโซนทั้ง 4 (cutscene) และสไปรท์บอสชายแดน 4 ตัวที่มีอยู่แล้ว

---

## 0. สรุป 6 ข้อที่ Toby / Claudy ต้องรู้ก่อน

1. **ชื่อท่าไม้ตายของบอสโซน (`BOSS_ULTIMATE` ใน data.js "รอ Rae ตั้งชื่อจริง") ผมตั้งให้แล้ว และพบว่าชื่อชั่วคราวของโซน 2 กับโซน 3 สลับกัน** — ภาพโซน 2 (`img/Asia/Boss Zone2-asia-cutscene.webp`) คือเหลียนกังเหวี่ยงตุ้มหินสลักตราที่ผูกโซ่ แต่ชื่อเดิมคือ "เปลวน้ำเงิน" · ภาพโซน 3 (`img/West/Boss Zone3-cutscene.webp`) คือเซเวอรินกับเปลวไฟสีน้ำเงิน แต่ชื่อเดิมคือ "ตราโซ่" · ชื่อใหม่ดูหัวข้อ 3
2. **ท่า groupHit ของบอสโซนทั้ง 4 ใช้ภาพ cutscene เดิมได้เลย ไม่ต้องวาดใหม่** (ยมทัต · เหลียนกัง · เซเวอริน · อาร์คอน-ศูนย์) · ถ้าเปิดท่าใหม่ ควรปิดจังหวะ `BOSS_ULTIMATE_RHYTHM` (ใช้ทุก 2 การโจมตี ไม่มีเตือน ×1.1) ของบอสพวกนี้ เพราะจะซ้อนกับท่าใหม่และผิดกติกา "ท่าแรงต้องเตือน 1 รอบ" — ให้ท่า groupHit ใหม่เป็นตัวเดียวที่ใช้การ์ดนี้
3. **ลูเมน-01 / ลูเมน-02**: ตอนนี้ใน `ZONE_EVENTS.cyberhell.cyberRescue` เป็นแถวเดียว `count:2` ถ้าแยกเป็นสองแถว (01 กับ 02) จะให้ท่าต่างกันได้ ถ้าไม่แยก ให้ทั้งสองตัวได้ท่า `scanBeam` อย่างเดียว (ข้อ 17)
4. **บอสโซนและหัวหน้าถูกสิงสร้าง foe เอง** (`startZoneBoss`, `startFinalEncounter`) ต้องต่อท่อ `skills` ตามที่ Toby เขียนไว้ในรายงาน · บอสชายแดน (ทัณฑสูร อากุระ วาลดริก โทรจัน-9) ถูกใช้ซ้ำในศึก "สัญญาณครอบงำ" (`SIGNAL_EVENTS`) ด้วย ท่าชุดนี้จึงใช้ในศึกนั้นไปพร้อมกัน — ข้อความท่าของสี่ตัวนี้ผมเขียนให้ใช้ได้ทั้งตอนปกติและตอนถูกครอบงำ (ไม่มีบทที่ขัดกัน)
5. **ชื่อผู้พูดในบรรทัดท่า** ผมใช้ชื่อไทยตามตารางคุณเป้ · ชื่อ EN ใช้ตามที่เกมมีอยู่ (`Lord Yama`, `Gate Guard`, `Valkyrie`) ถ้าไม่มีใช้การถอดเสียงตรง ๆ (ดูตารางชื่อหัวข้อ 1.2) ถ้า i18n มีชื่อ EN ของบอสตัวไหนอยู่แล้วต่างจากนี้ ให้ตามของเกม
6. **ชื่อร่างลูกน้องที่เรียก (`summon.name` / `summon.sub`) ในโค้ดเป็นสตริงเดียว ไม่ใช่ `{th,en}`** — ผมให้ทั้งสองภาษาไว้ Toby ต้องต่อให้เลือกตามภาษา (หรือใช้คีย์ i18n)

---

## 1. กติกาที่ผมใช้ทั้งชุด

### 1.1 แรงและจังหวะ (ตัวเลขตั้งต้น ไม่ใช่ค่าสุดท้าย)
| ระดับบอส | เป้าชนะรอบแรกทีม 3 คน (จากแผน) | groupHit `power` | heavyHit `power` | จังหวะ |
|---|---|---|---|---|
| เทวดาทดสอบ | 75–85 % | 0.6 | 1.6–1.7 | `firstAct 3` ทุก 4 เทิร์น |
| บอสชายแดน | 60–75 % | 0.7 | 1.8–1.9 | `firstAct 3` ทุก 4 · ท่าหนักเมื่อ HP ≤ 50–55 % |
| บอส event | 65–80 % | 0.6–0.8 | 1.8–1.9 | เหมือนบอสชายแดน |
| บอสโซน | 55–70 % | 0.85–0.9 | 1.7–1.9 | `firstAct 3` ทุก 3 · ท่าหนักเมื่อ HP ≤ 40–50 % |
| หัวหน้าถูกสิง | 45–65 % | 0.8 | 2.0 | `firstAct 3` ทุก 4 · ท่าหนักเมื่อ HP ≤ 50–55 % |
- ทุกท่าตั้ง `warn:1` (เตือนล่วงหน้า 1 ตา) รวมท่าฟื้นพลังด้วย เพื่อให้ผู้เล่นเลือกได้ว่าจะรีบทุบก่อนบอสฟื้นหรือไม่ · ท่าที่ตั้ง `charge:true` มีแห่งเดียว คือ `lateVerdict` ของจ้าวเหวิน (เทิร์นเตือนเขานิ่งฟัง ไม่โจมตี)
- ไม่มีท่าไหนทำให้ผู้เล่นขยับไม่ได้หลายตา (ระบบไม่มีสถานะนั้นอยู่แล้ว) · ท่าของ "บอสที่ไม่ใช่ศัตรู" (เทวดา หนุมาน หงอคง ยมทัต) ตั้งแรงต่ำกว่าท่าของบอสที่เป็นศัตรูจริง และข้อความเตือนไม่ใช้คำที่ฟังเหมือนจะฆ่า
- ตั้ง `max` ลูกน้องที่เรียกไว้ที่ 2–3 ตัวพร้อมกัน เหมือนหงอคง

### 1.2 ชื่อและน้ำเสียง
| ไทย (ตารางคุณเป้) | EN ที่ใช้ในข้อความท่า |
|---|---|
| อรุณเดช · ทัณฑสูร · หนุมาน · ยมทัต · พญายมบาท | Arunadet · Tanthasura · Hanuman · Yomathat · Lord Yama |
| คุโรฮะ · อากุระ · หงอคง · เหลียนกัง · จ้าวเหวิน | Kuroha · Akura · Wukong · Lian Gang · Zhao Wen |
| เอียร์ลิน · วาลดริก · เซอร์เบอรัส · ยอร์มุงกันด์ · เซเวอริน · ฮาลวาร์ | Eirlin · Valdric · Cerberus · Jörmungandr · Severin · Halvar |
| ลูเมน-01/02 · โทรจัน-9 · PHANTOM-404 · AI Scammer Robot · อาร์คอน-ศูนย์ · เน็กซาร | Lumen-01/02 · Trojan-9 · PHANTOM-404 · AI Scammer Robot · Archon-Zero · Nexar |
- **คำไทยของ Cerberus / Jörmungandr ("เซอร์เบอรัส" / "ยอร์มุงกันด์") เป็นการสะกดที่ผมเสนอ ยังไม่ได้ยืนยัน** — ถ้าคุณเป้หรือ chris-thai จะใช้สะกดอื่น แก้เฉพาะสองคำนี้ได้ทั้งไฟล์
- น้ำเสียงตามตัวละครเดิมในเกม: ทัณฑสูรห้วน เรียกยามาว่า "ตัวกระเปี๊ยก" · ยมทัตเรียก "น้อง" · วาลดริกสุภาพเยือกเย็น · เหลียนกังสั้นเป็นระเบียบ · บอสโซน 4 และเทวดาโซน 4 ใช้ทะเบียนระบบ · หัวหน้าถูกสิงพูดขาด ๆ เว้นจังหวะเหมือนบทสัญญาครอบงำใน `SIGNAL_STORIES` ("ขวาง ไว้ ทุก ทาง ...") แต่ยังมีประโยคจากบทตัวเองแทรกอยู่เสมอ เพื่อให้รู้ว่าเสียงเดิมยังต้านอยู่
- **หนุมานและเซอร์เบอรัสและยอร์มุงกันด์ใช้บรรทัดบรรยาย ไม่พูด** (ตามค่าที่ Claudy ล็อกให้หนุมานในโซน 1 · อีกสองตัวเป็นสัตว์)
- ท่าของตัวละครที่ผมไม่มั่นใจเรื่องตำนาน ใส่หมายเหตุ **[R]** ให้ Reese / chris-culture ตรวจ (ดูหัวข้อ 5)

### 1.3 วิธีอ่านบล็อกข้อมูล
ทุกบอสมี 1 บล็อก JS พร้อมวางในรูปแบบเดียวกับ `Z2_BOSS_SKILLS` (`kind`, `warn`, `power`, `when`, `name`, `warnText`, `useText`, `image`, `summon`, `heal`) · ชื่อคีย์ของตารางผมตั้งเสนอไว้เป็น `Z1_BOSS_SKILLS` ... `Z4_BOSS_SKILLS` Toby ย้ายไปไฟล์ไหนก็ได้ · ภาพที่เกมมีอยู่แล้วใส่ชื่อไฟล์จริง ภาพใหม่ใส่ชื่อที่ผมเสนอ (ตารางภาพรวมอยู่หัวข้อ 4)

---

## 2. รายบอส (23 รายการ)

### โซน 1 สุวรรณภูมิ

#### 2.1 อรุณเดช — เทวดาทดสอบ (`devaTest`)
- บทบาท: เทวทูตกระจกกรรมที่ปลอมเป็นขอทานในวัด ลงมาดูว่าผู้คุมใหม่แยกคนดีออกหรือไม่ เป็นผู้ทดสอบ ไม่ใช่ศัตรู
- ท่า: 1 ท่า · ตีหมู่ ×0.6 · ใช้ได้เมื่อถึงเทิร์นที่ 3 แล้วทุก 4 เทิร์น · ราว 1–2 ครั้งต่อศึก
- เหตุผลกับเรื่อง: แสงกระจกสะท้อนแรงต่ำและเตือนก่อนเสมอ เพราะเขาถือกระจกกรรมเพื่อ "ให้ท่านเห็น" ไม่ใช่เพื่อทำร้าย
```js
arunadet:[
  { id:'karmaMirror', kind:'groupHit', warn:1, power:.6,
    name:{ th:'แสงกระจกกรรม', en:'Karma-Mirror Flash' },
    warnText:{ th:'อรุณเดชยกกระจกรับแสง — รอบหน้าแสงจะสาดทั้งทีม!', en:'Arunadet raises his mirror to the light — next turn it floods the whole team!' },
    useText:{ th:'อรุณเดช: "ดูตัวท่านเองในกระจกเถิด"', en:'Arunadet: "Look at yourselves in the mirror."' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z1-events/cut-arunadet-mirror-th.webp' },
],
```
- การ์ด: `img/z1-events/cut-arunadet-mirror-th.webp` · 1672×941 · เทวดาอรุณเดชในร่างเทวทูต (ตามสไปรท์ `boss-tester-th`) ยืนกลางลานวัดบนแผ่นหินนรก ยกกระจกกลมขอบทองเหนืออก แสงขาวทองสะท้อนกวาดเป็นวงกว้างเข้าหากล้อง · ไม่มีตัวอักษร

#### 2.2 ทัณฑสูร — บอสชายแดน (`frontierBreach` ระลอกสุดท้าย · ใช้ซ้ำใน `signal-th`)
- บทบาท: ขุนกระบองชายแดน ทัพปีศาจคือที่เดียวที่ยอมรับเขา หวงเกียรติผู้เฝ้าด่านและดูถูกว่ายามาตัวเล็กเสมอ
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.7 เป็นท่าแรก (2) ตีเดี่ยว ×1.9 เมื่อ HP ≤ 50 % ทุก 3 เทิร์น
- เหตุผลกับเรื่อง: ท่าแรกคือ "ทัพ" ของเขา ท่าหลังคือศักดิ์ศรี "ด่านนี้ข้ายังเฝ้าอยู่" (บทเดิมใน `event.frontierBreach.bossLine`)
```js
tanthasura:[
  { id:'armyCharge', kind:'groupHit', warn:1, power:.7,
    name:{ th:'ทัพปีศาจบุกพร้อมกัน', en:'Army Charge' },
    warnText:{ th:'ทัณฑสูรชูกระบองให้ทัพข้างหลัง — รอบหน้าทัพจะบุกทั้งทีม!', en:'Tanthasura raises his club to rally his army — next turn it charges the whole team!' },
    useText:{ th:'ทัณฑสูร: "ทัพของข้า บุก!"', en:'Tanthasura: "My army! Charge!"' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z1-events/cut-tanthasura-army-th.webp' },
  { id:'gatekeeperBlow', kind:'heavyHit', warn:1, power:1.9,
    name:{ th:'ฟาดเกียรติผู้เฝ้าด่าน', en:"Gatekeeper's Blow" },
    warnText:{ th:'ทัณฑสูรกำกระบองสองมือ — รอบหน้าจะฟาดหนักใส่คนเดียว!', en:'Tanthasura grips his club in both hands — a crushing blow lands on one target next turn!' },
    useText:{ th:'ทัณฑสูร: "ด่านนี้ ข้ายังเฝ้าอยู่!"', en:'Tanthasura: "I still guard this gate!"' },
    when:{ hpBelow:.5, everyActs:3 } },
],
```
- การ์ด: `img/z1-events/cut-tanthasura-army-th.webp` · 1672×941 · ทัณฑสูร (ตัวแดง มงกุฎทองลายไทย เกราะเกล็ดดำ กระบองหนาม ตามสไปรท์ `boss-frontier-th`) ชูกระบองกลางด่านหิน ทหารปีศาจหลายสิบตนกรูตามหลังเข้าหากล้อง ฝุ่นฟุ้ง โคมแดงสั่น · ไม่มีตัวอักษร

#### 2.3 หนุมาน — บอส event (`sitaHanuman`) · ผู้ทดสอบ ไม่ใช่ศัตรู
- บทบาท: ทหารเอกของพระราม ลงมารับนางสีดา ต้องการเห็นว่ายามาปกป้องพระนางได้จริง
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.7 (2) ตีเดี่ยว ×1.8 เมื่อ HP ≤ 60 % ทุก 4 เทิร์น
- เหตุผลกับเรื่อง: เหาะได้และขยายกายได้คือฤทธิ์ของหนุมานที่คนไทยรู้จัก **[R1]** · ไม่พูดกลางศึกและไม่มีบรรทัดที่ฟังเป็นการสังหาร (ตามบทที่ Claudy ล็อก: ปุ่มเขียน "ทดสอบ" ไม่ใช่ "สู้") · ผมใช้คำนำ "ท่านหนุมาน" เหมือนแบนเนอร์ "ท่านหนุมาน" ที่มีอยู่แล้ว
```js
hanuman:[
  { id:'skyDash', kind:'groupHit', warn:1, power:.7,
    name:{ th:'เหาะกวาดลาน', en:'Skyward Sweep' },
    warnText:{ th:'ท่านหนุมานลอยขึ้นเหนือลาน — รอบหน้าจะพุ่งผ่านทั้งทีม!', en:'Hanuman rises above the courtyard — next turn he sweeps past the whole team!' },
    useText:{ th:'ท่านหนุมานพุ่งผ่านลานเร็วจนลมกระชากทุกคน', en:'Hanuman streaks across the courtyard, the wind tearing at everyone.' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z1-events/cut-hanuman-sweep-th.webp' },
  { id:'toweringPalm', kind:'heavyHit', warn:1, power:1.8,
    name:{ th:'ขยายกายฟาดฝ่ามือ', en:'Towering Palm' },
    warnText:{ th:'ท่านหนุมานขยายกายสูงขึ้นเรื่อย ๆ — รอบหน้าจะฟาดฝ่ามือลงมาหนึ่งครั้ง!', en:'Hanuman swells to a towering size — next turn a great palm comes down on one of you!' },
    useText:{ th:'ท่านหนุมานฟาดฝ่ามือใหญ่ลงมา แล้วหดกายกลับเท่าเดิม', en:'Hanuman brings his great palm down, then shrinks back to his usual size.' },
    when:{ hpBelow:.6, everyActs:4 } },
],
```
- การ์ด: `img/z1-events/cut-hanuman-sweep-th.webp` · 1672×941 · หนุมานขนขาว เครื่องทรงแดงทองลายไทย (ตามสไปรท์ `boss-hanuman-th` และภาพ `cut-hanuman-descends-th`) เหาะผ่านบันไดหินนรกเข้าหากล้อง **มือเปล่ากางออก ไม่ชักอาวุธ** แผ่นกระดาษและชายผ้าปลิวตามลม · ไม่มีตัวอักษร

#### 2.4 ยมทัต — บอสโซน 1 (พี่ใหญ่ · `thBorderBoss`)
- บทบาท: พี่ชายของยามา ผู้ตรวจการสาขา ออมมือครึ่งแรกแล้วปล่อยจริง ตอนจบฟาดดาบเพลิงแล้วยอมรับน้อง
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.9 ใช้ภาพ cutscene เดิมของเขา (2) ตีเดี่ยว ×1.7 เมื่อ HP ≤ 50 % ทุก 4 เทิร์น
- เหตุผลกับเรื่อง: บทเดิม "พี่มาดูของจริง" · ท่าที่สองชื่อว่า "พี่ไม่ออมมืออีกแล้ว" เพราะ 50 % แรกเขาตั้งใจเก็บแรงให้น้องเห็นทางรับ
```js
yomathat:[
  { id:'blazeBlade', kind:'groupHit', warn:1, power:.9,
    name:{ th:'ดาบเพลิงพี่ใหญ่', en:"Elder Brother's Flame Blade" },
    warnText:{ th:'ยมทัตชักดาบเพลิงขึ้นเหนือไหล่ — รอบหน้าจะฟันกวาดทั้งทีม!', en:'Yomathat lifts his flame blade over his shoulder — next turn it sweeps the whole team!' },
    useText:{ th:'ยมทัต: "รับให้ไหวนะน้อง!"', en:'Yomathat: "Hold on tight, little brother!"' },
    when:{ firstAct:3, everyActs:3 }, image:'img/zone-boss-cutscene.webp' },   // ภาพเดิม ไม่ต้องวาด
  { id:'noMoreHolding', kind:'heavyHit', warn:1, power:1.7,
    name:{ th:'พี่ไม่ออมมืออีกแล้ว', en:'No More Holding Back' },
    warnText:{ th:'ยมทัตกำดาบสองมือ เปลวไฟเข้มขึ้น — รอบหน้าจะฟันหนักใส่คนเดียว!', en:'Yomathat grips the blade in both hands, the flames deepening — a heavy cut at one target next turn!' },
    useText:{ th:'ยมทัต: "ถ้าผ่านท่านี้ได้ พี่ค่อยยอม!"', en:'Yomathat: "Take this one and I will yield!"' },
    when:{ hpBelow:.5, everyActs:4 } },
],
```
- การ์ด: ไม่ต้องวาดใหม่ · ใช้ `img/zone-boss-cutscene.webp` (ยมทัตม่วง มงกุฎทอง ฟันดาบเปลวไฟ)

#### 2.5 พญายมบาท (ถูกสิง) — หัวหน้าถูกสิง (`cyberFinal` แถวที่ 5 · `leader-th-possessed`)
- บทบาท: พ่อของยามา ถูก PHANTOM-404 ควบคุมผ่านจอมข้อมูล เสียงของเขาที่ยังต้านอยู่คือสิ่งที่ทำให้ศึกนี้เจ็บ
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.8 เริ่มเทิร์นที่ 2 ทุก 4 (2) ตีเดี่ยว ×2.0 เมื่อ HP ≤ 50 % ทุก 4
- เหตุผลกับเรื่อง: ท่าที่สอง "ฝ่ามือเดียวจากบัลลังก์" ย้อนฉาก "พญายมลงโทษ" (`YAMA_FIGHT`) ที่เขายกฝ่ามือครั้งเดียวโดยไม่ลุก · คำว่า "หลบ ... ลูก ..." คือส่วนของเขาที่ยังต้านคำสั่ง
```js
yamaPossessed:[
  { id:'ledgerTide', kind:'groupHit', warn:1, power:.8,
    name:{ th:'คลื่นบัญชีกรรม', en:'Tide of Ledgers' },
    warnText:{ th:'แผ่นบัญชีกรรมลอยขึ้นรอบบัลลังก์ — รอบหน้าจะถาโถมทั้งทีม!', en:'Ledger pages rise around the throne — next turn they crash over the whole team!' },
    useText:{ th:'พญายมบาท: "ตัดสิน ... ตาม ... บัญชี ..."', en:'Lord Yama: "Judge ... by ... the ... ledger ..."' },
    when:{ firstAct:2, everyActs:4 }, image:'img/z4-events/cut-yama-ledger-tide-th.webp' },
  { id:'palmFromThrone', kind:'heavyHit', warn:1, power:2.0,
    name:{ th:'ฝ่ามือเดียวจากบัลลังก์', en:'One Palm from the Throne' },
    warnText:{ th:'พญายมบาทยกฝ่ามือขึ้นโดยไม่ลุกจากบัลลังก์ — รอบหน้าจะฟาดลงมา!', en:'Lord Yama raises one palm without leaving the throne — next turn it comes down!' },
    useText:{ th:'พญายมบาท: "หลบ ... ไป ... ลูก ..."', en:'Lord Yama: "Move ... away ... son ..."' },
    when:{ hpBelow:.5, everyActs:4 } },
],
```
- การ์ด: `img/z4-events/cut-yama-ledger-tide-th.webp` · 1672×941 · พญายมบาทนั่งบนบัลลังก์ใหญ่ในห้องพิพากษา (ตามสไปรท์ `leader-th-possessed`) ดวงตามีเส้นแสงเขียวพาด แผ่นบัญชีกรรมนับร้อยแผ่นลอยหมุนเป็นคลื่นกระดาษพุ่งเข้าหากล้อง · ไม่มีตัวอักษรบนแผ่นกระดาษ (เป็นเส้นลายเฉย ๆ)

---

### โซน 2 บูรพา

#### 2.6 คุโรฮะ — เทวดาทดสอบ (`asiaDevaTest`)
- บทบาท: ผู้ตรวจแห่งวายุ เทนงุอีกาถือพัดขนนก ในบทเดิมเขาบอกว่า "ข้าไม่ได้วัดกำลังของท่าน ข้าวัดว่าท่านยังตั้งสติได้หรือไม่"
- ท่า: 1 ท่า · ตีหมู่ ×0.6 เทิร์นที่ 3 ทุก 4
- เหตุผลกับเรื่อง: ลมแรงต่ำ เตือนชัด ท่าที่ทดสอบสติ ไม่ใช่ท่าที่ล้างทีม
```js
kuroha:[
  { id:'featherGale', kind:'groupHit', warn:1, power:.6,
    name:{ th:'พายุขนนกวายุ', en:'Feather Gale' },
    warnText:{ th:'คุโรฮะกางพัดขนนกออกเต็มที่ — รอบหน้าลมจะซัดทั้งทีม!', en:'Kuroha spreads his feather fan wide — next turn the gale hits the whole team!' },
    useText:{ th:'คุโรฮะ: "ตั้งสติไว้ ลมกำลังเปลี่ยนทิศ"', en:'Kuroha: "Keep your head. The wind is turning."' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z2-events/cut-kuroha-gale-asia.webp' },
],
```
- การ์ด: `img/z2-events/cut-kuroha-gale-asia.webp` · 1672×941 · คุโรฮะ (เทนงุอีกา ปีกน้ำเงินเข้ม เสื้อคลุมครามลายคลื่นทอง ตามภาพ `deva-intro-asia-v1`) กางพัดขนนกใหญ่ ลมวนเป็นเกลียวพาใบไม้และเถ้าลอยเข้าหากล้อง ลานหน้าศาลบูรพา โคมแดงโยกแรง · ไม่มีตัวอักษร

#### 2.7 อากุระ — บอสชายแดน (`asiaRageBreach` ระลอกสุดท้าย · ใช้ซ้ำใน `signal-asia`)
- บทบาท: โอนิกระบองหนามผู้ถูกล่ามสามปี เกลียดตรวนเข้ากระดูก ทดสอบว่ายามาเป็นคนล่ามหรือไม่ "ข้าไม่เชื่อคำพูด ข้าเชื่อแต่มือ"
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.75 (2) ตีเดี่ยว ×1.9 เมื่อ HP ≤ 55 % ทุก 3 เทิร์น
- เหตุผลกับเรื่อง: ท่าแรกคือ "ข้าไม่ออมแรง" ท่าที่สองชื่อ "ทุบตรวนแตก" เพราะเขาทุบทุกอย่างที่ให้ความรู้สึกถูกล่าม · ตอนท้ายศึกยังมีท่าทีมใหม่ที่ HP 30 % (`BREACH_FINALE_AT`) ซึ่งเป็นของผู้เล่น ไม่ชนกับท่าของเขา
```js
akura:[
  { id:'thornStorm', kind:'groupHit', warn:1, power:.75,
    name:{ th:'พายุกระบองหนาม', en:'Thorn-Club Storm' },
    warnText:{ th:'อากุระหมุนกระบองหนามรอบตัว — รอบหน้าจะกวาดทั้งทีม!', en:'Akura spins his thorned club around him — next turn it sweeps the whole team!' },
    useText:{ th:'อากุระ: "ข้าไม่ออมแรง!"', en:'Akura: "I hold nothing back!"' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z2-events/cut-akura-thornstorm-asia.webp' },
  { id:'shackleBreaker', kind:'heavyHit', warn:1, power:1.9,
    name:{ th:'ทุบตรวนแตก', en:'Shackle-Breaker' },
    warnText:{ th:'อากุระยกกระบองสุดแขน กัดฟันแน่น — รอบหน้าจะทุบลงหนักใส่คนเดียว!', en:'Akura heaves his club overhead, teeth clenched — a crushing blow at one target next turn!' },
    useText:{ th:'อากุระ: "ข้าจะไม่ถูกล่ามอีก!"', en:'Akura: "I will never be chained again!"' },
    when:{ hpBelow:.55, everyActs:3 } },
],
```
- การ์ด: `img/z2-events/cut-akura-thornstorm-asia.webp` · 1672×941 · อากุระ (โอนิแดง ผมขาว ผ้าลายเสือ กระบองเหล็กหนามใหญ่ ตามสไปรท์ `boss-frontier-asia`) หมุนตัวฟาดกระบองเป็นวงเข้าหากล้อง ข้อมือมีรอยด้านของตรวนเก่าแต่ **ไม่มีตรวนหรือโซ่ในภาพ** (กติกาเดิมของคดีอากุระ) ประตูไม้ชายแดนพังและเศษไม้ปลิวเป็นฉากหลัง · ไม่มีตัวอักษร

#### 2.8 หงอคง — บอส event (`asiaWukong`) · เกลาของ Toby
- บทบาท: เจ้าแห่งเขาฮั้งกัวซัน โกรธแทนฝูงลิงที่บัญชีผิด ไม่ใช่ศัตรู ไม่ซ้ำเติมผู้ที่ล้ม
- ท่า: 2 ท่าตามที่ Toby ใส่ไว้แล้ว (เป่าขนแยกร่าง · กระบองกวาดสิบทิศ) · ผมเกลาข้อความและชื่อร่างแยกเท่านั้น ไม่เปลี่ยนตัวเลข (ซิมของ Toby ได้ 70 % ที่ทีม 3 คน)
- **[R2]** การเป่าขนเป็นร่างแยกคือฤทธิ์ของหงอคงในไซอิ๋ว
```js
wukong:[
  { id:'hairClones', kind:'summon', warn:1,
    name:{ th:'เป่าขนแยกร่าง', en:'Hair Clones' },
    warnText:{ th:'หงอคงถอนขนหนึ่งกำขึ้นมา — เตรียมเป่าเป็นร่างแยก!', en:'Wukong plucks a tuft of hair — he is about to blow it into clones!' },
    useText:{ th:'หงอคง: "ออกมาเถิด พวกเรา!"', en:'Wukong: "Out you come, all of you!"' },
    when:{ hpBelow:.8, firstAct:2, everyActs:5, maxUses:2 },
    summon:{ count:[2, 3], hp:26, atk:[6, 10], sp:'boss-wukong-clone-asia',
      name:'ร่างแยกหงอคง', sub:'ร่างจากขนวิเศษ', max:3 } },   // EN: name 'Wukong clone' · sub 'Born of a strand of hair'
  { id:'staffSweep', kind:'groupHit', warn:1, power:.75,
    name:{ th:'กระบองกวาดสิบทิศ', en:'Ten-Direction Sweep' },
    warnText:{ th:'หงอคงหมุนกระบองรอบตัว — รอบหน้าจะกวาดทั้งทีม!', en:'Wukong spins his staff — next turn it sweeps the whole team!' },
    useText:{ th:'หงอคง: "รับไปให้ทั่ว!"', en:'Wukong: "Take it, every one of you!"' },
    when:{ firstAct:3, everyActs:3 }, image:'img/z2-events/cut-wukong-sweep-asia.webp' },
],
```
- การ์ด: `img/z2-events/cut-wukong-sweep-asia.webp` · 1672×941 (ชื่อและขนาดเดิมของ Toby ตอนนี้เป็น placeholder) · หงอคง (ขนทองน้ำตาล หมวกขนหงส์ เกราะทองแดงลายแดง ตามภาพ `cut-wukong-arrives-asia`) ยืนบนเมฆสีทองกลางโถงศาลที่โคมแดงสั่น หมุนไม้เท้ากายสิทธิ์ทองเป็นวงแสงสีทองกว้างเข้าหากล้อง ยามากับนิราตั้งท่ารับมุมล่างซ้าย กระดาษแฟ้มปลิว · ไม่มีตัวอักษร

#### 2.9 เหลียนกัง — บอสโซน 2 (แม่ทัพตรวนบูรพา)
- บทบาท: แม่ทัพผู้ถือตรวนและวินัย "ไม่ล่ามผู้ที่ล้ม" ทดสอบว่าคนต่างถิ่นยืนได้ไหม
- ท่า: 1 ท่าหลัก + 1 ท่าเสริม · (1) ตีหมู่ ×0.85 ใช้ภาพ cutscene เดิม (2) เสริม (ตัดได้): ตีเดี่ยว ×1.8 ครั้งเดียวเมื่อ HP ≤ 40 %
- เหตุผลกับเรื่อง: ตุ้มตรวนผนึกคือสิ่งที่เขาเหวี่ยงในภาพเดิม · ท่าเสริมคือบทเดิม "ข้ายังเหลือหนึ่งท่าไว้ใช้ตอนที่ใครคิดว่าชนะแล้ว" ที่ผมเขียนไว้ใน `Z2_TEXT.lian.lines.half` — **ถ้า Toby เห็นว่าซ้ำกับฉาก "ท่าไม้ตายใส่ขณะเผลอ นิราเข้ารับแทน" (`STORY.asia`) ให้ตัดท่าเสริมนี้ออก เหลือท่าเดียวได้เลย** · ไม่มีท่าติดสถานะ "ล่าม" ใดเพราะเขาไม่ล่ามผู้ที่ล้ม
```js
lianGang:[
  { id:'sealedWeight', kind:'groupHit', warn:1, power:.85,
    name:{ th:'ตุ้มตรวนผนึก', en:'Sealed Chain-Weight' },
    warnText:{ th:'เหลียนกังหมุนตุ้มตรวนเหนือศีรษะ — รอบหน้าจะซัดทั้งแถว!', en:'Lian Gang whirls the chain-weight overhead — next turn it lashes the whole line!' },
    useText:{ th:'เหลียนกัง: "ยืนให้ตรงแถว!"', en:'Lian Gang: "Hold the line!"' },
    when:{ firstAct:3, everyActs:3 }, image:'img/Asia/Boss Zone2-asia-cutscene.webp' },   // ภาพเดิม ไม่ต้องวาด
  { id:'lastLink', kind:'heavyHit', warn:1, power:1.8,
    name:{ th:'ห่วงตรวนสุดท้าย', en:'The Last Link' },
    warnText:{ th:'เหลียนกังเหลือตรวนอีกห่วงเดียวในมือ — รอบหน้าเขาจะลงมือจริง!', en:'Lian Gang holds the last link of the chain — next turn he strikes in earnest!' },
    useText:{ th:'เหลียนกัง: "ข้ายังเหลือหนึ่งท่า"', en:'Lian Gang: "I still have one move left."' },
    when:{ hpBelow:.4, once:true } },
],
```
- การ์ด: ไม่ต้องวาดใหม่ · ใช้ `img/Asia/Boss Zone2-asia-cutscene.webp`

#### 2.10 จ้าวเหวิน (ถูกสิง) — หัวหน้าถูกสิง (`cyberFinal` แถวที่ 6 · `leader-asia-possessed`)
- บทบาท: ผู้ดูแลบัลลังก์บูรพา อดีตผู้พิพากษาที่ "ฟังจนจบก่อนตัดสิน" เคยตัดสินช้าจนจำเลยตายในคุก
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.8 (2) ตีเดี่ยว ×2.0 เมื่อ HP ≤ 55 % · **ท่าที่สองใช้ `charge:true`** เทิร์นเตือนเขานิ่งฟังและไม่โจมตี
- เหตุผลกับเรื่อง: การตัดสินที่ช้ามาถึงคือแผลเก่าของเขา · PHANTOM-404 กดตรงนั้น · ประโยค "ตราที่ประทับแล้วเรียกคืนไม่ได้" ยกมาจากบทร่างของเขาเอง (`data.js` บทชม/ตำหนิ)
```js
zhaoWenPossessed:[
  { id:'sealPress', kind:'groupHit', warn:1, power:.8,
    name:{ th:'ตราประทับกดทั่วลาน', en:'The Seal Descends' },
    warnText:{ th:'ตราประทับบัลลังก์ลอยขึ้นเหนือลาน — รอบหน้าจะกดลงทั้งทีม!', en:'The throne seal floats above the hall — next turn it presses down on the whole team!' },
    useText:{ th:'จ้าวเหวิน: "ตรา ... ที่ประทับ ... เรียกคืน ... ไม่ได้ ..."', en:'Zhao Wen: "A seal ... once stamped ... cannot be recalled ..."' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z4-events/cut-zhaowen-seal-asia.webp' },
  { id:'lateVerdict', kind:'heavyHit', warn:1, charge:true, power:2.0,
    name:{ th:'คำตัดสินที่มาถึงช้า', en:'The Late Verdict' },
    warnText:{ th:'จ้าวเหวินนิ่งเงียบรับฟังจนจบ — รอบหน้าคำตัดสินจะลงใส่คนเดียว!', en:'Zhao Wen falls silent, listening to the end — next turn the verdict falls on one target!' },
    useText:{ th:'จ้าวเหวิน: "ฟัง ... จบ ... แล้ว ..."', en:'Zhao Wen: "I have ... heard ... it all ..."' },
    when:{ hpBelow:.55, everyActs:4 } },
],
```
- การ์ด: `img/z4-events/cut-zhaowen-seal-asia.webp` · 1672×941 · จ้าวเหวินนั่งบนบัลลังก์บูรพา (ตามสไปรท์ `leader-asia-possessed`) ดวงตามีเส้นแสงเขียวพาด ตราประทับหยกสลักใหญ่เท่าประตูลอยเหนือลาน แสงสีเขียวหยกกดลงเข้าหากล้อง โคมแดงดับเป็นแถว · ไม่มีตัวอักษรบนตรา (เป็นลายสลัก)

---

### โซน 3 ปัจฉิม

#### 2.11 เอียร์ลิน — เทวดาทดสอบ (`westDevaTest`)
- บทบาท: วาลคีรีผู้ถือหอก มาช้าไปก้าวเดียวจึงขอทดสอบแทน
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.6 (2) ตีเดี่ยว ×1.7 เมื่อ HP ≤ 50 %
- เหตุผลกับเรื่อง: วาลคีรีคือผู้คัดผู้ควรขึ้นฟ้า **[R3]** หอกจึง "เลือก" เป้า ไม่ใช่กวาดสุ่ม
```js
eirlin:[
  { id:'spearRain', kind:'groupHit', warn:1, power:.6,
    name:{ th:'ฝนหอกวาลคีรี', en:'Valkyrie Spear Rain' },
    warnText:{ th:'เอียร์ลินชูหอกขึ้นฟ้า แสงหอกเรียงเป็นสาย — รอบหน้าจะพุ่งใส่ทั้งทีม!', en:'Eirlin raises her spear skyward, lines of light forming — next turn they fall on the whole team!' },
    useText:{ th:'เอียร์ลิน: "ให้ข้าเห็นว่าท่านยืนได้"', en:'Eirlin: "Show me you can stand."' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z3-events/cut-eirlin-spearrain-west.webp' },
  { id:'chosenSpear', kind:'heavyHit', warn:1, power:1.7,
    name:{ th:'หอกเลือกผู้ควร', en:'Spear of the Chosen' },
    warnText:{ th:'เอียร์ลินเล็งหอกไปที่เป้าหมายเดียว — รอบหน้าหอกจะพุ่งตรง!', en:'Eirlin takes aim at one target — next turn the spear flies straight!' },
    useText:{ th:'เอียร์ลิน: "หอกนี้เลือกผู้ที่ไม่ถอย"', en:'Eirlin: "This spear picks those who do not retreat."' },
    when:{ hpBelow:.5, everyActs:4 } },
],
```
- การ์ด: `img/z3-events/cut-eirlin-spearrain-west.webp` · 1672×941 · เอียร์ลิน (หน้าตาและชุดตามสไปรท์ `boss-tester-west`) ลอยเหนือลานปราสาทหิมะ ยกหอกขึ้นสูง หอกแสงสีฟ้าขาวนับสิบเรียงเฉียงลงมาเข้าหากล้องเหมือนฝนตก ละอองหิมะและแสงเหนือเป็นฉากหลัง · ไม่มีตัวอักษร

#### 2.12 วาลดริก — บอสชายแดน (`westVampireBreach` ระลอกสุดท้าย · ใช้ซ้ำใน `signal-west`)
- บทบาท: เจ้าแห่งแวมไพร์ สุภาพเยือกเย็น ผู้ครองคฤหาสน์ที่ยึดชีวิตผู้เช่ามานาน "ราตรียังยาว"
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.7 (2) ฟื้นพลัง 15 % ครั้งเดียวเมื่อ HP ≤ 45 % (ตั้ง `warn:1` เพื่อให้ผู้เล่นรีบทุบก่อนได้)
- เหตุผลกับเรื่อง: ค้างคาวติดชายเสื้อโค้ตในสไปรท์ · ท่าฟื้นเป็นการจิบไวน์ ไม่ใช่การกัดคน (เลี่ยงภาพเลือดตามกติกาเนื้อหา) **[R4]**
```js
valdric:[
  { id:'batStorm', kind:'groupHit', warn:1, power:.7,
    name:{ th:'พายุค้างคาวราตรี', en:'Night Bat Storm' },
    warnText:{ th:'วาลดริกยกไม้เท้า เงาค้างคาวหมุนรอบตัว — รอบหน้าจะพุ่งใส่ทั้งทีม!', en:'Valdric lifts his cane, bat-shadows circling him — next turn they swarm the whole team!' },
    useText:{ th:'วาลดริก: "ราตรียังยาวนัก ท่านผู้มาเยือน"', en:'Valdric: "The night is long yet, honoured guest."' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z3-events/cut-valdric-batstorm-west.webp' },
  { id:'sipOfNight', kind:'heal', warn:1, heal:{ pct:.15 },
    name:{ th:'จิบไวน์ราตรี', en:'A Sip of Night' },
    warnText:{ th:'วาลดริกหยิบแก้วไวน์แดงขึ้นมา — รอบหน้าเขาจะจิบฟื้นกำลัง!', en:'Valdric picks up a glass of dark wine — next turn he will sip and recover!' },
    useText:{ th:'วาลดริก: "ขออภัย ขอข้าจิบสักนิด"', en:'Valdric: "Forgive me. A sip, if you please."' },
    when:{ hpBelow:.45, once:true } },
],
```
- การ์ด: `img/z3-events/cut-valdric-batstorm-west.webp` · 1672×941 · วาลดริก (ชายชราผมขาว หนวดยาว โค้ตดำซับแดง ไม้เท้า ตามสไปรท์ `boss-frontier-west`) ยืนกลางโถงคฤหาสน์ จันทร์แดงทางหน้าต่างบานใหญ่ ฝูงค้างคาวนับร้อยพุ่งออกจากโค้ตเป็นวงเข้าหากล้อง · ไม่มีตัวอักษร

#### 2.13 เซอร์เบอรัส (Cerberus) — บอส event (`westHypnotized`, คดี 0)
- บทบาท: ผู้พิทักษ์สามเศียรที่ถูกสะกด ยืนหน้าประตูชายแดนล่าง ต้องปราบก่อนจึงสร้างสถานที่ได้ · แรงดิบแต่ไม่มีเจตนา
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.6 (2) ตีเดี่ยว ×1.8 เมื่อ HP ≤ 60 % ทุก 3 เทิร์น · ศึกนี้อยู่ต้นโซน จึงตั้งแรงต่ำกว่าบอส event ตัวอื่นของโซน
- เหตุผลกับเรื่อง: ผู้พิทักษ์ประตูนรกในตำนานกรีก **[R5]** · หลังโจมตีเขา "ชะงักราวกับสะดุ้งตื่น" เพื่อบอกผู้เล่นว่าเขาถูกสะกด ไม่ได้อยากทำร้าย (ภาพของ "ความผิดไม่ใช่ของเขา" ก่อนปล่อยทัณฑ์กับพ่อค้า)
```js
cerberus:[
  { id:'triHowl', kind:'groupHit', warn:1, power:.6,
    name:{ th:'เสียงหอนสามเศียร', en:'Three-Headed Howl' },
    warnText:{ th:'เซอร์เบอรัสทั้งสามเศียรสูดลมหายใจลึก — รอบหน้าเสียงหอนจะกระแทกทั้งทีม!', en:'All three heads of Cerberus draw a deep breath — next turn the howl slams the whole team!' },
    useText:{ th:'เสียงหอนสามเสียงซ้อนกันสะเทือนทั่วลาน', en:'Three howls stack into one and shake the whole yard.' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z3-events/cut-cerberus-howl-west.webp' },
  { id:'triBite', kind:'heavyHit', warn:1, power:1.8,
    name:{ th:'สามเศียรงับพร้อมกัน', en:'Triple Bite' },
    warnText:{ th:'เซอร์เบอรัสหันทั้งสามเศียรมาที่เป้าหมายเดียว — รอบหน้าจะงับพร้อมกัน!', en:'Cerberus turns all three heads on a single target — next turn they bite as one!' },
    useText:{ th:'ทั้งสามเศียรงับลงพร้อมกัน แล้วชะงักราวกับสะดุ้งตื่น', en:'All three heads snap down together, then flinch as if waking.' },
    when:{ hpBelow:.6, everyActs:3 } },
],
```
- การ์ด: `img/z3-events/cut-cerberus-howl-west.webp` · 1672×941 · สุนัขนรกสามเศียรตัวใหญ่ ดวงตาทั้งหกมีแสงเขียวจางของการสะกด ยืนหน้าประตูชายแดนปัจฉิมที่หิมะปกคลุม เงยหน้าหอนพร้อมกัน คลื่นเสียงเป็นวงกว้างแผ่เข้าหากล้อง ทีมยามามุมล่างซ้าย · ไม่มีตัวอักษร · **ต้องวาดตัวละครนี้ใหม่ทั้งตัวด้วย** (ยังไม่มีสไปรท์ — ดูตารางภาพ)

#### 2.14 ยอร์มุงกันด์ (Jörmungandr) — บอส event (ก่อนบอสโซน 3 · คดีครบ 15)
- บทบาท: อสรพิษโลก มากับเซเวอริน ต้องปราบก่อนจึงสู้บอสโซนได้
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.8 (2) ตีเดี่ยว ×1.9 เมื่อ HP ≤ 50 %
- เหตุผลกับเรื่อง: อสรพิษโลกในตำนานนอร์สนอนล้อมโลก **[R6]** ใช้หางและลำตัวเป็นอาวุธ ไม่ใช้พิษ (ระบบสถานะพิษยังไม่มี และผมไม่ใส่เรื่องของเทพองค์อื่นที่ปราบมัน) · บรรยายล้วน ไม่พูด
```js
jormungandr:[
  { id:'tailTide', kind:'groupHit', warn:1, power:.8,
    name:{ th:'คลื่นหางอสรพิษโลก', en:'World-Serpent Tidal Lash' },
    warnText:{ th:'ยอร์มุงกันด์ม้วนหางขึ้นเหนือผิวน้ำ — รอบหน้าคลื่นจะซัดทั้งทีม!', en:'Jörmungandr lifts its tail above the water — next turn a wave crashes over the whole team!' },
    useText:{ th:'หางอสรพิษฟาดผิวน้ำ คลื่นยักษ์ซัดข้ามชายแดน', en:"The serpent's tail lashes the water and a great wave breaks across the frontier." },
    when:{ firstAct:3, everyActs:4 }, image:'img/z3-events/cut-jormungandr-tide-west.webp' },
  { id:'worldCoil', kind:'heavyHit', warn:1, power:1.9,
    name:{ th:'ขดรัดแห่งโลก', en:"The World's Coil" },
    warnText:{ th:'ลำตัวอสรพิษขดวงเข้ามาหาเป้าหมายเดียว — รอบหน้าจะรัดแน่น!', en:'The serpent coils in around one target — next turn it will crush!' },
    useText:{ th:'ลำตัวใหญ่รัดแน่น แล้วคลายออกอย่างช้า ๆ', en:'The vast body tightens, then slowly loosens.' },
    when:{ hpBelow:.5, everyActs:4 } },
],
```
- การ์ด: `img/z3-events/cut-jormungandr-tide-west.webp` · 1672×941 · อสรพิษมหึมาเกล็ดเทาน้ำเงินโผล่จากน้ำหน้าชายแดนปัจฉิม หางยักษ์ยกสูงเหนือผิวน้ำแล้วฟาดลง คลื่นสูงเท่ากำแพงพุ่งเข้าหากล้อง ท้องฟ้าหม่น ทีมยามามุมล่างซ้ายเล็กมากเทียบตัวมัน · ไม่มีตัวอักษร · **ต้องวาดตัวละครนี้ใหม่ทั้งตัว**

#### 2.15 เซเวอริน — บอสโซน 3 (อัศวินบัญชีปัจฉิม)
- บทบาท: ผู้ตรวจบัญชีผู้เชื่อว่าบัลลังก์ควรเป็นของคนที่บัญชีสะอาด คู่แข่งฮาลวาร์ ตรวจทุกตัวเลขสองรอบ
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.85 ใช้ภาพ cutscene เดิม (2) ตีเดี่ยว ×1.9 เมื่อ HP ≤ 50 %
- เหตุผลกับเรื่อง: ภาพเดิมคือเขากางฝ่ามือกับเปลวสีน้ำเงินที่มีหัวกะโหลกเป็นลายเกราะ → "ปิดบัญชี" ด้วยเปลวนั้น · ท่าที่สองคือ "ตราปิดยอดค้าง" แทนการตรวจตัวเลขสองรอบ
```js
severin:[
  { id:'blueFlameClose', kind:'groupHit', warn:1, power:.85,
    name:{ th:'เปลวน้ำเงินปิดบัญชี', en:'Blue Flame of the Closing Books' },
    warnText:{ th:'เซเวอรินกางฝ่ามือ เปลวน้ำเงินลามตามแขน — รอบหน้าจะเผาทั้งทีม!', en:'Severin spreads his palm, blue flame creeping up his arm — next turn it engulfs the whole team!' },
    useText:{ th:'เซเวอริน: "ยอดนี้ ข้าขอปิดเดี๋ยวนี้!"', en:'Severin: "I close this account now!"' },
    when:{ firstAct:3, everyActs:3 }, image:'img/West/Boss Zone3-cutscene.webp' },   // ภาพเดิม ไม่ต้องวาด
  { id:'overdueSeal', kind:'heavyHit', warn:1, power:1.9,
    name:{ th:'ตราปิดยอดค้าง', en:'Seal of the Overdue Balance' },
    warnText:{ th:'เซเวอรินเปิดสมุดบัญชีเล่มหนา — รอบหน้าจะประทับตราใส่คนเดียว!', en:'Severin opens a thick ledger — next turn he stamps his seal on one target!' },
    useText:{ th:'เซเวอริน: "ตัวเลขไม่เคยโกหก!"', en:'Severin: "Numbers never lie!"' },
    when:{ hpBelow:.5, everyActs:4 } },
],
```
- การ์ด: ไม่ต้องวาดใหม่ · ใช้ `img/West/Boss Zone3-cutscene.webp`

#### 2.16 ฮาลวาร์ (ถูกสิง) — หัวหน้าถูกสิง (`cyberFinal` แถวที่ 7 · `leader-west-possessed`)
- บทบาท: ผู้ดูแลบัลลังก์ปัจฉิม อดีตผู้พิพากษาท่าเรือที่ตัดสินด้วยโคมดวงเดียว เกลียดคำพูดยาวและเกลียดคำตัดสินพลาดซ้ำ
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.8 (2) ตีเดี่ยว ×2.0 เมื่อ HP ≤ 50 %
- เหตุผลกับเรื่อง: ท่าที่สองคือ "คำตัดสินสั้น ๆ" ตรงกับที่เขาชอบพูดสั้นและตรง · เสียงขาดของเขามีแต่คำสั้นอยู่แล้ว จึงอ่านเป็นธรรมชาติ
```js
halvarPossessed:[
  { id:'lanternNight', kind:'groupHit', warn:1, power:.8,
    name:{ th:'โคมคืนยาว', en:'The Long-Night Lantern' },
    warnText:{ th:'ฮาลวาร์ยกโคมดวงเดียวขึ้นสูง แสงนิ่งสนิท — รอบหน้าแสงจะกวาดทั้งทีม!', en:'Halvar raises his single lantern, its light utterly still — next turn it sweeps the whole team!' },
    useText:{ th:'ฮาลวาร์: "คืน ... นี้ ... ยาว ..."', en:'Halvar: "This ... night ... is long ..."' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z4-events/cut-halvar-lantern-west.webp' },
  { id:'shortVerdict', kind:'heavyHit', warn:1, power:2.0,
    name:{ th:'คำตัดสินสั้น ๆ', en:'The Short Verdict' },
    warnText:{ th:'ฮาลวาร์เงียบลง มือกำค้อนศาลแน่น — รอบหน้าจะตัดสินลงใส่คนเดียว!', en:'Halvar falls silent, gripping the gavel — next turn the verdict falls on one target!' },
    useText:{ th:'ฮาลวาร์: "พอ ... แล้ว ..."', en:'Halvar: "Enough ... now ..."' },
    when:{ hpBelow:.5, everyActs:4 } },
],
```
- การ์ด: `img/z4-events/cut-halvar-lantern-west.webp` · 1672×941 · ฮาลวาร์นั่งบนบัลลังก์ปัจฉิมในโถงกลางคืน (ตามสไปรท์ `leader-west-possessed`) ดวงตามีเส้นแสงเขียวพาด ชูโคมเหล็กดวงเดียว แสงโคมสีเหลืองซีดสาดกว้างเข้าหากล้อง เงาเสาโถงยาวทอดบนพื้น · ไม่มีตัวอักษร

---

### โซน 4 นรกเครือข่าย

#### 2.17 ลูเมน-01 / ลูเมน-02 — เทวดาผู้คุม (`cyberRescue`, คดี 0)
- บทบาท: เทวดาผู้คุมระบบแสง จับทัณฑ์กับพ่อค้านรกตามระเบียบ "ระเบียบของเขาไม่ได้ผิดทั้งหมด เพียงใช้ไม่ครบ" (lore bible C42) ผู้ทดสอบ ไม่ใช่ศัตรูถึงตาย
- ท่า: 01 ตีหมู่ ×0.6 · 02 ตีเดี่ยว ×1.6 (ถ้าไม่แยกแถว ให้ทั้งสองใช้ `scanBeam` เท่านั้น)
- เหตุผลกับเรื่อง: 01 สแกนทั้งทีมตามระเบียบตรวจสิทธิ์ · 02 ล็อกเป้าทีละคนตามระเบียบจับกุม
```js
lumen01:[
  { id:'scanBeam', kind:'groupHit', warn:1, power:.6,
    name:{ th:'ลำแสงตรวจสิทธิ์', en:'Credential Scan' },
    warnText:{ th:'ลูเมน-01 เปิดตาแสง เส้นสแกนไล่ข้ามพื้น — รอบหน้าจะกวาดทั้งทีม!', en:'Lumen-01 opens its eyes of light, scan-lines crossing the floor — next turn they sweep the whole team!' },
    useText:{ th:'ลูเมน-01: "ตรวจสิทธิ์ของนายก่อน!"', en:'Lumen-01: "Credentials first!"' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z4-events/cut-lumen-scan-cyberhell.webp' },
],
lumen02:[
  { id:'lockOn', kind:'heavyHit', warn:1, power:1.6,
    name:{ th:'ล็อกเป้าประตู', en:'Gate Lock-On' },
    warnText:{ th:'ลูเมน-02 ล็อกวงแสงบนเป้าหมายเดียว — รอบหน้าจะพุ่งตรง!', en:'Lumen-02 fixes a ring of light on one target — next turn the strike lands.' },
    useText:{ th:'ลูเมน-02: "เป้าหมายล็อกแล้ว"', en:'Lumen-02: "Target locked."' },
    when:{ firstAct:3, everyActs:4 } },
],
```
- การ์ด: `img/z4-events/cut-lumen-scan-cyberhell.webp` · 1672×941 · เทวดาแสงสองตน (ตามสไปรท์ `boss-tester-cyberhell`) ยืนหน้าคุกกระจกใส ตาเป็นลำแสงฟ้าขาวกวาดเส้นสแกนเป็นตารางเข้าหากล้อง ทัณฑ์กับพ่อค้านรกเห็นเลือนรางหลังกระจก (ไม่ต้องเห็นหน้าชัด) · ไม่มีตัวอักษรบนเส้นสแกน

#### 2.18 โทรจัน-9 — บอสชายแดน (`cyberBreach` ระลอกสุดท้าย · ใช้ซ้ำใน `cyber-signal`)
- บทบาท: ม้าไม้ปีศาจ ประตูหลังของนรกเครือข่าย ถูกสร้างให้เปิดท้องส่งของที่มีกับดัก เป็นเครื่องมือของผู้สร้าง ไม่ได้เลือกเอง
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.7 (2) เรียกลูกน้อง 2 ตัว (HP 28 ตีเบา) เมื่อ HP ≤ 70 % ได้ 2 ครั้ง
- เหตุผลกับเรื่อง: ม้าโทรจันคือของขวัญที่ซ่อนของไว้ในท้อง · บทเดิมของเขาเตือนผู้ใช้เรื่องกับดักในท้องตัวเอง ผมจึงใส่คำเตือนไว้ในบรรทัดท่า
- ลูกน้องที่เรียกใช้สไปรท์ศัตรูโซน 4 ที่มีอยู่แล้ว (บั๊ก/หนอน — Toby เลือกคีย์ `sp`) ไม่ต้องวาดใหม่
```js
trojan9:[
  { id:'gateRush', kind:'groupHit', warn:1, power:.7,
    name:{ th:'พุ่งชนประตูหลัง', en:'Backdoor Rush' },
    warnText:{ th:'ล้อม้าไม้ของโทรจัน-9 เริ่มหมุน เส้นสแกนวิ่งขวางตา — รอบหน้าจะพุ่งชนทั้งทีม!', en:"Trojan-9's wheels begin to turn, scan-lines racing across its eyes — next turn it rams the whole team!" },
    useText:{ th:'โทรจัน-9: "[พุ่งชน] หลีก ... ทาง ..."', en:'Trojan-9: "[Ram] Clear ... the ... way ..."' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z4-events/cut-trojan9-rush-cyberhell.webp' },
  { id:'bellyHatch', kind:'summon', warn:1,
    name:{ th:'เปิดท้องม้า', en:'Hatch Open' },
    warnText:{ th:'ฝาท้องม้าไม้เปิดอ้า แสงเขียวกะพริบข้างใน — รอบหน้าจะมีของออกมา!', en:'The hatch in the wooden belly swings open, green light flickering within — something comes out next turn!' },
    useText:{ th:'โทรจัน-9: "[ส่งของขวัญ] ... ระวัง ... กับดัก ..."', en:'Trojan-9: "[Delivering gift] ... mind ... the ... trap ..."' },
    when:{ hpBelow:.7, firstAct:2, everyActs:5, maxUses:2 },
    summon:{ count:[2, 2], hp:28, atk:[6, 10], sp:'<zone-4 bug sprite>', name:'บั๊กในท้องม้า', sub:'ของขวัญติดกับดัก', max:3 } },   // EN: name 'Bug from the belly' · sub 'Trapped gift'
],
```
- การ์ด: `img/z4-events/cut-trojan9-rush-cyberhell.webp` · 1672×941 · โทรจัน-9 (ม้าไม้ล้อใหญ่ รอยเรืองชมพูแบบบั๊ก ฝาท้องเปิดมีแสงเขียว ตามสไปรท์ `boss-frontier-cyberhell`) พุ่งเข้าหากล้องบนพื้นกริดข้อมูล เส้นสแกนสีเขียวมิ้นต์พาดตา ฝุ่นข้อมูลปลิว ทีมยามามุมล่างซ้ายกระโดดหลบ · ไม่มีตัวอักษร

#### 2.19 AI Scammer Robot — บอส event ย่อย (คดีครบ 10)
- บทบาท: ต้นเหตุของบัญชีที่ผิดทั้งหมดในโซน 4 (เฉลยตอนคดีครบ 10) หุ่นโกหกที่ทำตัวเป็นมิตร
- ท่า: 2 ท่า · (1) เรียกบอตหลอกลวง 2–3 ตัว (HP 24) (2) ตีหมู่ ×0.75
- เหตุผลกับเรื่อง: สองกลโกงตรง ๆ คือโทรหลอกจากหลายสายพร้อมกัน กับท่วมลิงก์หลอกลวง · ประโยคเรียกเหยื่อเป็นแนว "ยินดีด้วย" ของกลโกงทั่วไป ไม่ล้อเลียนใครหรือหน่วยงานจริง · ใช้สไปรท์บอตโซน 4 ที่มีอยู่เป็นลูกน้อง
```js
aiScammer:[
  { id:'scamBots', kind:'summon', warn:1,
    name:{ th:'ฝูงบอตโทรหลอก', en:'Scam-Bot Swarm' },
    warnText:{ th:'AI Scammer Robot ส่งสัญญาณโทรออกทุกช่องทาง — รอบหน้าบอตหลอกลวงจะโผล่มา!', en:'The AI Scammer Robot dials out on every channel — scam-bots will appear next turn!' },
    useText:{ th:'AI Scammer Robot: "ยินดีด้วย! ท่านถูกเลือกแล้ว"', en:'AI Scammer Robot: "Congratulations! You have been selected!"' },
    when:{ firstAct:2, everyActs:4, maxUses:2 },
    summon:{ count:[2, 3], hp:24, atk:[5, 9], sp:'<zone-4 bot sprite>', name:'บอตหลอกลวง', sub:'สายโทรปลอม', max:3 } },   // EN: name 'Scam-bot' · sub 'Spoofed caller'
  { id:'phishingFlood', kind:'groupHit', warn:1, power:.75,
    name:{ th:'พายุลิงก์หลอก', en:'Phishing Flood' },
    warnText:{ th:'หน้าจอบนตัวหุ่นเด้งแจ้งเตือนรัว ๆ — รอบหน้าจะซัดใส่ทั้งทีม!', en:"Notifications burst across the robot's screens — next turn the flood hits the whole team!" },
    useText:{ th:'AI Scammer Robot: "กดตอนนี้ รับสิทธิ์ทันที!"', en:'AI Scammer Robot: "Click now and claim your reward!"' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z4-events/cut-scammer-phishing-cyberhell.webp' },
],
```
- การ์ด: `img/z4-events/cut-scammer-phishing-cyberhell.webp` · 1672×941 · หุ่นยนต์ทรงกลมสีขาวยิ้มเกินจริง จอหน้าอกหลายจอ (ต้องวาดตัวละครนี้ใหม่ทั้งตัว) หน้าต่างแจ้งเตือนลอยกระจายเป็นพายุเข้าหากล้อง · **ข้อความบนจอและหน้าต่างเป็นแถบสี ไอคอน และเส้น ไม่มีตัวอักษรหรือลิงก์จริง**

#### 2.20 PHANTOM-404 — บอส event (ดูข้อให้คุณเป้ตัดสินหัวข้อ 6 ว่าใช้ที่จุดไหน)
- บทบาท: ผู้แก้บัญชีจากภายนอก เห็นเป็นเงาและรหัสในบัญชีมาตลอด 3 โซน ศึกนี้คือครั้งแรกที่ผู้เล่นเจอเขาซึ่ง ๆ หน้า
- ท่า: 2 ท่า · (1) เรียกบรรทัดปลอม 2 ตัว (HP 30) (2) ตีหมู่ ×0.75
- เหตุผลกับเรื่อง: ตัวตนของเขาคือ "การเพิ่มและลบรายการ" ท่าทั้งสองเลยเป็นการเขียนและลบ ไม่ใช่การต่อยตรง · ข้อความเป็นทะเบียนระบบ ไม่ใช้ "ข้า/เจ้า"
```js
phantom404:[
  { id:'forgedEntries', kind:'summon', warn:1,
    name:{ th:'บรรทัดปลอม', en:'Forged Entries' },
    warnText:{ th:'ตัวอักษรบนบัญชีเริ่มเลื่อนเอง — รอบหน้าจะมีบรรทัดปลอมโผล่ออกมา!', en:'The writing on the ledger starts to shift on its own — forged entries crawl out next turn!' },
    useText:{ th:'[PHANTOM-404]: "เพิ่ม ... รายการ ... ใหม่ ..."', en:'[PHANTOM-404]: "Adding ... new ... entries ..."' },
    when:{ hpBelow:.8, firstAct:2, everyActs:5, maxUses:2 },
    summon:{ count:[2, 2], hp:30, atk:[6, 10], sp:'phantom404-entry-cyberhell', name:'บรรทัดปลอม', sub:'รายการที่ถูกเขียนเพิ่ม', max:2 } },   // EN: name 'Forged entry' · sub 'Written in from outside'
  { id:'deleteRow', kind:'groupHit', warn:1, power:.75,
    name:{ th:'ลบทั้งแถว', en:'Delete Row' },
    warnText:{ th:'เงามืดไล่ผ่านบัญชีทีละแถว — รอบหน้าจะกวาดทั้งทีม!', en:'A shadow sweeps down the ledger row by row — next turn it sweeps the whole team!' },
    useText:{ th:'[PHANTOM-404]: "ไม่พบ ... ผู้ใช้ ..."', en:'[PHANTOM-404]: "User ... not ... found ..."' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z4-events/cut-phantom404-delete-cyberhell.webp' },
],
```
- การ์ด: `img/z4-events/cut-phantom404-delete-cyberhell.webp` · 1672×941 · ร่างเงามืดไม่มีหน้า สูงเกือบชนเพดาน สวมเสื้อคลุมที่ประกอบด้วยแถวตัวอักษรบัญชีเรืองสีเขียวมิ้นต์ ยกมือลากเส้นลบทับบัญชีกรรมยาวเป็นแนวกว้างเข้าหากล้อง แถวบนบัญชีหายเป็นแสงทีละแถว (ไม่ต้องเห็นตัวหนังสืออ่านได้) · ไม่มีตัวอักษรที่อ่านออก
- ภาพเสริม (ลูกน้อง): `img/z4-events/phantom404-entry-cyberhell.webp` 512×512 RGBA พื้นโปร่ง + `-profile.webp` 512×512 RGB · บรรทัดบัญชีที่ลอยเป็นแถบแคบเรืองเขียว มีสองตาเรียวเล็กจากช่องตัวอักษร (ถ้า Toby อยากประหยัดภาพ ใช้สไปรท์บั๊กโซน 4 ที่มีอยู่แทนได้)

#### 2.21 อาร์คอน-ศูนย์ — บอสโซน 4 (จอมข้อมูลไซเบอร์)
- บทบาท: ผู้ตรวจการระบบที่เชื่อว่าคำตัดสินที่ถูกคือคำตัดสินที่ไม่ต้องมีใครเลือก ครอบหัวหน้าทั้งสี่โซน
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.85 ใช้ภาพ cutscene เดิม (2) ฟื้นพลัง 20 % ครั้งเดียวเมื่อ HP ≤ 35 %
- เหตุผลกับเรื่อง: สายฟ้าม่วงที่ฝ่ามือในภาพเดิมกลายเป็น "ถอนสิทธิ์" · การฟื้นพลังคือการ "กู้คืนจากสำรอง" ตรงกับตัวตนของระบบที่ไม่ยอมให้เสียอะไร (ผู้เล่นรีบทุบก่อนได้เพราะมีเตือน)
```js
archonZero:[
  { id:'revokeBolt', kind:'groupHit', warn:1, power:.85,
    name:{ th:'สายฟ้าม่วงถอนสิทธิ์', en:'Revocation Lightning' },
    warnText:{ th:'อาร์คอน-ศูนย์ชูมือ ประกายม่วงรวมที่ฝ่ามือ — รอบหน้าจะฟาดทั้งทีม!', en:'Archon-Zero raises a hand, violet sparks gathering — next turn lightning strikes the whole team!' },
    useText:{ th:'อาร์คอน-ศูนย์: "สิทธิ์ของคุณถูกเพิกถอน"', en:'Archon-Zero: "Your access is revoked."' },
    when:{ firstAct:3, everyActs:3 }, image:'img/CyberHell/Boss Zone4-cutscene.webp' },   // ภาพเดิม ไม่ต้องวาด
  { id:'restoreBackup', kind:'heal', warn:1, heal:{ pct:.2 },
    name:{ th:'กู้คืนจากสำรอง', en:'Restore from Backup' },
    warnText:{ th:'ลายอักขระบนมงกุฎอาร์คอน-ศูนย์กะพริบ — รอบหน้าเขาจะกู้คืนตัวเอง!', en:"The glyphs on Archon-Zero's crown flicker — next turn he will restore himself!" },
    useText:{ th:'อาร์คอน-ศูนย์: "โหลดสถานะก่อนหน้า"', en:'Archon-Zero: "Loading previous state."' },
    when:{ hpBelow:.35, once:true } },
],
```
- การ์ด: ไม่ต้องวาดใหม่ · ใช้ `img/CyberHell/Boss Zone4-cutscene.webp`

#### 2.22 เน็กซาร (ถูกสิง) — หัวหน้าถูกสิง (`cyberFinal` แถวที่ 8 · `leader-cyberhell-possessed`)
- บทบาท: ผู้ดูแลบัลลังก์นรกเครือข่าย อดีตผู้ไกล่เกลี่ยออนไลน์ที่ตัดสินจากบันทึกอย่างเดียว คำติดปากคือ "ระบบไม่ผิดพลาด"
- ท่า: 2 ท่า · (1) ตีหมู่ ×0.8 (2) ตีเดี่ยว ×2.0 เมื่อ HP ≤ 50 %
- เหตุผลกับเรื่อง: ท่าทั้งสองคือการ "ตัดสินจากบันทึก" ในรูปที่ทำให้เจ็บ · ประโยค "ผลลัพธ์ตรงกับข้อมูลทุกจุด" ยกจากบทร่างของเขาเอง
```js
nexarPossessed:[
  { id:'logSweep', kind:'groupHit', warn:1, power:.8,
    name:{ th:'ไล่ตรวจบันทึกทั้งแถว', en:'Log Sweep' },
    warnText:{ th:'แถบบันทึกไหลผ่านหน้าเน็กซาร — รอบหน้าจะกวาดทั้งทีม!', en:"Logs scroll across Nexar's face — next turn they sweep the whole team!" },
    useText:{ th:'เน็กซาร: "ผลลัพธ์ ... ตรง ... ข้อมูล ..."', en:'Nexar: "The result ... matches ... the data ..."' },
    when:{ firstAct:3, everyActs:4 }, image:'img/z4-events/cut-nexar-logsweep-cyberhell.webp' },
  { id:'systemRuling', kind:'heavyHit', warn:1, power:2.0,
    name:{ th:'คำตัดสินจากบันทึก', en:'Ruling by Record' },
    warnText:{ th:'เน็กซารชี้ไปที่เป้าหมายเดียว ข้อมูลล็อกตาม — รอบหน้าคำตัดสินจะลงมา!', en:'Nexar points at a single target, the data locking on — next turn the ruling lands!' },
    useText:{ th:'เน็กซาร: "ระบบ ... ไม่ ... ผิดพลาด ..."', en:'Nexar: "The system ... does not ... err ..."' },
    when:{ hpBelow:.5, everyActs:4 } },
],
```
- การ์ด: `img/z4-events/cut-nexar-logsweep-cyberhell.webp` · 1672×941 · เน็กซารนั่งบนบัลลังก์ไซเบอร์ (ตามสไปรท์ `leader-cyberhell-possessed`) ดวงตามีเส้นแสงเขียวพาด แถบบันทึกข้อมูลเรืองแสงไหลเป็นสายยาวรอบตัว แล้วกวาดเข้าหากล้องเป็นคลื่นเส้นกริด · ไม่มีตัวอักษรที่อ่านออก

---

### ยักษ์ทวารบาลทดสอบ (โซน 2 · มีในโค้ดแล้ว) — เกลาข้อความ
#### 2.23 ยักษ์ทวารบาล — ก่อนรับเป็นลูกทีม (`asiaGuardTest`)
- ท่า: 1 ท่าตามที่ Toby ใส่ไว้ (`gateSmash` ตีเดี่ยว ×1.8) เกลาเฉพาะข้อความ · ไม่ต้องมีการ์ด (heavyHit ไม่ใช้ภาพ)
- เหตุผลกับเรื่อง: เขาเรียกผู้เล่นว่า "ท่าน" ในบทเดิม และทดสอบ ไม่ใช่ศัตรู เลยให้เขาเตือนด้วยเสียงห่วงมากกว่าท้า
```js
gateGuardTest:[
  { id:'gateSmash', kind:'heavyHit', warn:1, power:1.8,
    name:{ th:'ฟาดประตูหนัก', en:'Gate Smash' },
    warnText:{ th:'ยักษ์ทวารบาลยกกระบองเหนือหัว — รอบหน้าจะฟาดหนักใส่คนเดียว!', en:'The Gate Guard raises his club overhead — next turn a heavy blow lands on one target!' },
    useText:{ th:'ยักษ์ทวารบาล: "ยืนให้มั่นนะท่าน!"', en:'Gate Guard: "Stand firm, my lord!"' },
    when:{ firstAct:3, everyActs:3 } },
],
```

---

## 3. ข้อความชั่วคราวที่เกลาแล้ว (ตามที่ใบงานสั่ง)

### 3.1 `Z2_BOSS_SKILLS` (หงอคง · ยักษ์ทวารบาลทดสอบ)
บล็อกในหัวข้อ 2.8 และ 2.23 แทนของเดิมได้ทั้งหมด · สรุปที่เปลี่ยน
| ท่า | เดิม (Toby ชั่วคราว) | ใหม่ | เหตุที่เปลี่ยน |
|---|---|---|---|
| หงอคง · เป่าขน · เตือน | หงอคงถอนขนขึ้นมาหนึ่งกำ เตรียมเป่าเรียกร่างแยก! | หงอคงถอนขนหนึ่งกำขึ้นมา — เตรียมเป่าเป็นร่างแยก! | "เรียกร่างแยก" ฟังเป็นศัพท์เกม ใช้ "เป่าเป็นร่างแยก" ตรงภาพมากกว่า |
| หงอคง · เป่าขน · ตอนใช้ | หงอคง: "ออกมา พวกเรา!" | หงอคง: "ออกมาเถิด พวกเรา!" | เติม "เถิด" ให้ตรงน้ำเสียงองอาจแต่ไม่ห้วนเหมือนสั่งลูกน้อง |
| หงอคง · กวาด · เตือน | หงอคงหมุนกระบองรอบตัว — รอบหน้าจะกวาดทั้งทีม! | **คงเดิม** | อ่านลื่น ชัด |
| หงอคง · กวาด · ตอนใช้ | หงอคง: "รับไปทั้งหมด!" | หงอคง: "รับไปให้ทั่ว!" | "รับไปทั้งหมด" ฟังเหมือนข้อความระบบ |
| ร่างแยก ชื่อ/คำรอง | ร่างแยกหงอคง / ร่างแยกจากขน | ร่างแยกหงอคง / ร่างจากขนวิเศษ | "ร่างแยก" ซ้ำสองครั้งในบรรทัดเดียว · EN: Wukong clone / Born of a strand of hair |
| ยักษ์ทวารบาล · เตือน | …รอบหน้าจะฟาดหนัก! | …รอบหน้าจะฟาดหนักใส่คนเดียว! | บอกว่าเป็นตีเดี่ยว ผู้เล่นรู้ว่าไม่ต้องกลัวทั้งทีม |
| ยักษ์ทวารบาล · ตอนใช้ | ยักษ์ทวารบาล: "ยืนให้มั่น!" | ยักษ์ทวารบาล: "ยืนให้มั่นนะท่าน!" | ตรงบทเดิมที่เขาเรียกผู้เล่นว่า "ท่าน" และเสียงห่วงของเขา |

### 3.2 `Z2_KIN_REPEAT_LINE` (`src/z2-events.js` · คดีจอมโจรตลาดเก่ากลับมาเป็นคดีญาติของคุโร)
- เดิม: `บรรยาย: วิญญาณดวงนี้เคยขึ้นแท่นของท่านมาแล้วครั้งหนึ่ง วันนี้เขากลับมาที่คิวอีกครั้งเพราะคุโรขอให้ท่านฟังเรื่องของเขาอีกด้าน`
- ใหม่ TH: `บรรยาย: จอมโจรแห่งตลาดเก่าเคยขึ้นแท่นของท่านมาแล้วหนหนึ่ง วันนี้เขากลับมายืนในคิวอีกครั้ง เพราะคุโรขอให้ท่านฟังเรื่องของเขาจากอีกด้าน`
- ใหม่ EN: `Narration: The thief of the old market has stood at your dais once before. Today he is back in the queue because Kuro has asked you to hear his story from the other side.`
- เหตุที่เปลี่ยน: ระบุตัวเขา ("จอมโจรแห่งตลาดเก่า") แทน "วิญญาณดวงนี้" ผู้เล่นจะได้ไม่ต้องจำว่าดวงไหน · "จากอีกด้าน" อ่านลื่นกว่า "อีกด้าน" ลอย ๆ · ถ้า Toby ใช้คำนำ "Narration:" ไม่ได้ในฉบับ EN ตัดคำนำออกได้ ประโยคอยู่ได้เอง

### 3.3 `BOSS_ULTIMATE` ชื่อท่าไม้ตายของบอสโซน (`src/data.js` "รอ Rae ตั้งชื่อจริง")
| โซน | ชื่อเดิม (ชั่วคราว) | ภาพจริงที่เห็น | ชื่อใหม่ TH | ชื่อใหม่ EN |
|---|---|---|---|---|
| th ยมทัต | ดาบเพลิง | ยมทัตม่วงฟันดาบเปลวไฟ | **ดาบเพลิงพี่ใหญ่** | Elder Brother's Flame Blade |
| asia เหลียนกัง | เปลวน้ำเงิน ✗ | เหลียนกังเหวี่ยงตุ้มหินสลักตราผูกโซ่ | **ตุ้มตรวนผนึก** | Sealed Chain-Weight |
| west เซเวอริน | ตราโซ่ ✗ | เซเวอรินกางฝ่ามือเปลวสีน้ำเงิน | **เปลวน้ำเงินปิดบัญชี** | Blue Flame of the Closing Books |
| cyberhell อาร์คอน-ศูนย์ | สายฟ้าม่วง | อาร์คอน-ศูนย์ปล่อยสายฟ้าม่วงจากฝ่ามือ | **สายฟ้าม่วงถอนสิทธิ์** | Revocation Lightning |
- สามอันแรกตรงกับชื่อท่าในหัวข้อ 2.4 / 2.9 / 2.15 / 2.21 ทุกตัวอักษร ให้ใช้ชื่อเดียวกันทั้งสองที่

---

## 4. รายการภาพให้ Codex วาด

### 4.1 ข้อกำหนดร่วมการ์ดท่า (ทุกใบ)
- ขนาด 1672×941 RGB นามสกุล `.webp` (ชื่อและขนาดแบบ `img/z2-events/cut-wukong-sweep-asia.webp`)
- **ไม่มีตัวอักษรในภาพทุกใบ** (ชื่อท่าเกมวางทับเอง) · ถ้าฉากมีกระดาษ จอ ป้าย ให้เป็นลาย เส้น แถบสี
- สไตล์เดียวกับ `cut-wukong-arrives-asia.webp` และ `cut-hanuman-descends-th.webp` (ภาพวาดสีสด สไตล์ anime/เกม ฉากนรกที่มีโคม ลาวา ทอง) · ตัวบอสหันเข้าหากล้องและทำท่าโจมตีที่ฝั่งขวาหรือกลางภาพ · ทีมผู้เล่นอยู่มุมล่างซ้าย ตัวเล็กกว่า ตั้งท่ารับ: ยามา (เด็กผิวแดงมีเขาเล็ก ชุดกิโมโน) กับนิรา (ผิวม่วง ถือสมุด) เหมือนภาพ `cut-wukong-arrives-asia`
- ห้ามลอกท่า ฉาก หรือการออกแบบจากเกม/การ์ตูนอื่น: ใช้ต้นแบบจากตำนาน (หนุมาน หงอคง วาลคีรี Cerberus Jörmungandr) ตามหัวข้อ 5 แล้วดัดเป็นลายเส้นของเกมนี้เอง

### 4.2 ตารางการ์ดท่า (ลำดับความสำคัญ A = ศึกที่เนื้อเรื่องต้องผ่าน/เห็นครั้งแรก · B = ใช้การ์ดบอสโซนของโซนนั้นเป็นตัวสำรองได้ ตามที่ระบบรองรับ)
| # | ไฟล์ | บอส / ท่า | ต้องวาด | ระดับ |
|---|---|---|---|---|
| 1 | `img/z1-events/cut-arunadet-mirror-th.webp` | อรุณเดช · แสงกระจกกรรม | ใหม่ | B |
| 2 | `img/z1-events/cut-tanthasura-army-th.webp` | ทัณฑสูร · ทัพปีศาจบุกพร้อมกัน | ใหม่ | A |
| 3 | `img/z1-events/cut-hanuman-sweep-th.webp` | หนุมาน · เหาะกวาดลาน | ใหม่ | A |
| 4 | `img/zone-boss-cutscene.webp` | ยมทัต · ดาบเพลิงพี่ใหญ่ | **มีแล้ว** | — |
| 5 | `img/z4-events/cut-yama-ledger-tide-th.webp` | พญายมบาท (สิง) · คลื่นบัญชีกรรม | ใหม่ | B |
| 6 | `img/z2-events/cut-kuroha-gale-asia.webp` | คุโรฮะ · พายุขนนกวายุ | ใหม่ | B |
| 7 | `img/z2-events/cut-akura-thornstorm-asia.webp` | อากุระ · พายุกระบองหนาม | ใหม่ | A |
| 8 | `img/z2-events/cut-wukong-sweep-asia.webp` | หงอคง · กระบองกวาดสิบทิศ | ใหม่ (placeholder อยู่) | A |
| 9 | `img/Asia/Boss Zone2-asia-cutscene.webp` | เหลียนกัง · ตุ้มตรวนผนึก | **มีแล้ว** | — |
| 10 | `img/z4-events/cut-zhaowen-seal-asia.webp` | จ้าวเหวิน (สิง) · ตราประทับกดทั่วลาน | ใหม่ | B |
| 11 | `img/z3-events/cut-eirlin-spearrain-west.webp` | เอียร์ลิน · ฝนหอกวาลคีรี | ใหม่ | B |
| 12 | `img/z3-events/cut-valdric-batstorm-west.webp` | วาลดริก · พายุค้างคาวราตรี | ใหม่ | A |
| 13 | `img/z3-events/cut-cerberus-howl-west.webp` | เซอร์เบอรัส · เสียงหอนสามเศียร | ใหม่ + **ตัวละครใหม่** | A |
| 14 | `img/z3-events/cut-jormungandr-tide-west.webp` | ยอร์มุงกันด์ · คลื่นหางอสรพิษโลก | ใหม่ + **ตัวละครใหม่** | A |
| 15 | `img/West/Boss Zone3-cutscene.webp` | เซเวอริน · เปลวน้ำเงินปิดบัญชี | **มีแล้ว** | — |
| 16 | `img/z4-events/cut-halvar-lantern-west.webp` | ฮาลวาร์ (สิง) · โคมคืนยาว | ใหม่ | B |
| 17 | `img/z4-events/cut-lumen-scan-cyberhell.webp` | ลูเมน-01 · ลำแสงตรวจสิทธิ์ | ใหม่ | B |
| 18 | `img/z4-events/cut-trojan9-rush-cyberhell.webp` | โทรจัน-9 · พุ่งชนประตูหลัง | ใหม่ | A |
| 19 | `img/z4-events/cut-scammer-phishing-cyberhell.webp` | AI Scammer Robot · พายุลิงก์หลอก | ใหม่ + **ตัวละครใหม่** | A |
| 20 | `img/z4-events/cut-phantom404-delete-cyberhell.webp` | PHANTOM-404 · ลบทั้งแถว | ใหม่ + **ตัวละครใหม่** | A |
| 21 | `img/CyberHell/Boss Zone4-cutscene.webp` | อาร์คอน-ศูนย์ · สายฟ้าม่วงถอนสิทธิ์ | **มีแล้ว** | — |
| 22 | `img/z4-events/cut-nexar-logsweep-cyberhell.webp` | เน็กซาร (สิง) · ไล่ตรวจบันทึกทั้งแถว | ใหม่ | B |
- **รวมการ์ดใหม่ 18 ใบ** (A 9 ใบ · B 9 ใบ) · ใบที่ 4 / 9 / 15 / 21 ใช้ภาพเดิม · ท่า heavyHit / summon / heal ไม่ใช้ภาพ
- โซน 3 ที่ตัวละครยังไม่มีสไปรท์ (Cerberus Jörmungandr) และโซน 4 (AI Scammer Robot PHANTOM-404) การ์ดท่าเป็นภาพแรกของตัวนั้น ควรให้ Codex วาดสไปรท์ยืน (512×512 RGBA + `-profile.webp` 512×512 RGB ตามแบบ `boss-wukong-clone-asia`) ไปพร้อมกัน ชื่อเสนอ `boss-cerberus-west` · `boss-jormungandr-west` · `boss-aiscammer-cyberhell` · `boss-phantom404-cyberhell`
- ถ้างบวาดไม่พอ ตัดระดับ B ทิ้งก่อน ท่า groupHit ของบอสเหล่านั้นจะตกไปใช้การ์ดบอสโซนของโซนนั้นเองตามกลไกใน `boss-skills.js` ("falls back to the zone's boss card")

---

## 5. ข้อที่ให้ Reese / chris-culture ตรวจ (ผมไม่แน่ใจเรื่องที่มา)
- **[R1] หนุมาน** เหาะและขยายกายได้ในรามเกียรติ์ฉบับไทย · ผมไม่ใช้ท่าเฉพาะอื่น (ไม่ใส่อาวุธ ไม่แปลงกายเป็นสิ่งอื่น) · ยังขอให้ตรวจว่าการเรียก "ท่านหนุมาน" ในบรรทัดท่ากับการให้เขาตีผู้เล่นแม้ในฐานะผู้ทดสอบเหมาะกับเสียงของฉบับไทยหรือไม่
- **[R2] หงอคง** เป่าขนเป็นร่างแยกอยู่ในไซอิ๋ว · เหตุที่ลงนรกคือการดัดแปลงของเกม (ตามใบงาน W4)
- **[R3] วาลคีรี** คือผู้เลือกผู้ตายที่ควรขึ้นไปในคติสแกนดิเนเวีย · "หอกเลือกผู้ควร" เป็นการสื่อแนวคิดนี้ ไม่ใช่ท่าในตำนาน
- **[R4] วาลดริก** ฉากฟื้นพลังใช้ไวน์ ไม่ใช่เลือด · ผมเลี่ยงภาพการกัดเพื่อไม่ให้เด่นเกินกติกาเนื้อหา
- **[R5] Cerberus** ผู้พิทักษ์ประตูโลกใต้ดินสามเศียรในตำนานกรีก · การสะกดไทย "เซอร์เบอรัส" เป็นข้อเสนอ
- **[R6] Jörmungandr** อสรพิษโลกในตำนานนอร์ส · ไม่ใช้พิษและไม่มีเรื่องการต่อสู้กับเทพองค์ใด · การสะกดไทย "ยอร์มุงกันด์" เป็นข้อเสนอ
- ชื่อท่าทุกท่าที่ผมตั้งเป็นคำไทยทั่วไปที่ประกอบเอง ไม่ได้ยกชื่อท่าจากเกมหรือการ์ตูนเรื่องใด แต่ผม**ไม่ได้ค้นเทียบกับชื่อท่าของเกมอื่นทั้งหมด** (ทำไม่ได้ในรอบนี้) ขอให้ Reese ตรวจชื่อ EN ด้วย ถ้าพบท่าที่ซ้ำให้แจ้ง จะเปลี่ยนทันที

---

## ให้คุณเป้ตัดสิน (ผมเลือกแบบปลอดภัยไว้ก่อนในไฟล์แล้ว)
1. **PHANTOM-404 ใช้ที่จุดไหน** — แผนนับเขาเป็นบอส event โซน 4 แต่สเปกคุณเป้ 14 พ.ย. มีแค่ "AI Scammer Robot — บอสย่อย [PHANTOM-404]" (คดีครบ 10) กับ "ถูกสิง = มีเงา PHANTOM-404" · ผมออกแบบท่าไว้ครบ (ข้อ 2.20) ให้เสียบได้ทั้ง 3 ทาง: (ก) ศึกแยกต่างหากหลัง AI Scammer Robot ก่อนศึกสุดท้าย (ข) เป็นเฟสสองของ AI Scammer Robot (ค) ไม่ทำศึกแยก ใช้ท่า `forgedEntries` / `deleteRow` เป็นท่าเสริมของหัวหน้าถูกสิงตัวสุดท้าย · **ค่าที่เลือกไว้: (ก) แต่ยังไม่ตัดสินว่าเสียบหรือไม่ จนกว่าคุณเป้ยืนยัน**
2. **เหลียนกัง ท่าเสริม "ห่วงตรวนสุดท้าย"** — ซ้ำกับฉาก "ท่าไม้ตายใส่ขณะเผลอ นิราเข้ารับแทน" ในบทเดิมหรือไม่ · ค่าที่เลือก: ใส่ไว้แต่ตัดได้ ไม่กระทบอย่างอื่น
3. **จังหวะ `BOSS_ULTIMATE_RHYTHM` ของบอสโซน** — แนะนำปิดเมื่อบอสมี `skills` เพราะท่าใหม่เตือนล่วงหน้าและใช้ภาพเดียวกัน · ค่าที่เลือก: ให้ Toby ปิดเฉพาะบอสที่ได้ท่าใหม่
4. **ลูเมน-01/02 แยกแถว** — แยกให้ท่าต่างกัน (ข้อเสนอ) หรือให้ทั้งสองใช้ท่าเดียวกัน · ค่าที่เลือก: ถ้า Toby ไม่แยก ใช้ `scanBeam` อย่างเดียวกับทั้งคู่
5. **การสะกดไทยของ Cerberus / Jörmungandr** (เซอร์เบอรัส / ยอร์มุงกันด์) และชื่อ EN ที่ไม่มีใน i18n · ค่าที่เลือก: ตามหัวข้อ 1.2
6. **ภาพการ์ดใหม่ 18 ใบ** — งบวาด Codex · ค่าที่เลือก: วาดระดับ A (9 ใบ) ก่อน ระดับ B รอผลทดสอบ
7. **ตัวเลขทั้งหมด** — ผมไม่ได้รันซิม · เป้าความยากตามแผนอยู่ในหัวข้อ 1.1 ให้ Toby จูน
