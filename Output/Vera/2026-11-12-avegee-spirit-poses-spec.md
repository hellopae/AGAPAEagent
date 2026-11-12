# Vera — สเปกท่า "ตกใจ" (scared) และ "ร้องไห้" (cry) ของวิญญาณ AVEGEE · 12 พ.ย. 2569

ใบงาน: `Output/Claudy/briefs/2026-11-12-avegee-spirit-poses-spec.md`
อ่านโค้ดจาก worktree `~/agapae-work/.toby-worktrees/z1-v5` (branch `claude/2026-11-05-zone1-v5-fx`) · ไม่ได้แก้โค้ดหรือภาพใด ๆ

---

## 0. ข้อค้นพบที่เปลี่ยนแผน (อ่านก่อน)

**ท่า "ตกใจ" และ "ร้องไห้" มีอยู่แล้ว แต่ใช้ชื่ออื่น** ใบงานตั้งต้นว่า "ยังไม่มีท่าตกใจ/ร้องไห้" เพราะ Toby เห็นว่า `soul-poses.js` มีแค่ `caught_lie` กับ `necessity` ผมเปิดดูไฟล์ภาพจริงแล้ว:

| ชื่อในโค้ด | ภาพจริงที่เห็น | ตรงกับท่าที่ขอ |
|---|---|---|
| `caught_lie` | ตาโต ปากอ้า เหงื่อหยดที่ขมับ มือแตะอก ตัวเอนหนี (`officer-th-caught-lie-v1.webp`, `worker-asia-caught-lie-v1.webp`) | **scared** |
| `necessity` | คิ้วตกเศร้า น้ำตาไหลสองทาง ปากเบะ (`girl-th-necessity-v1.webp`, `officer-th-necessity-v1.webp`) | **cry** |

ดังนั้นสิ่งที่ขาดจริงไม่ใช่ "ท่า" แต่คือ **ความครอบคลุม** อีกสองข้อที่อ่านโค้ดแล้วเห็น:

1. `soulPoseForPress` (src/soul-poses.js บรรทัด 34-44) ทำงานเฉพาะวิญญาณ **สำนวนมีชื่อ** (`soul.case` ต้องอยู่ใน `CASE_POSE_TYPES`) วิญญาณสุ่มและคดีหนักสุ่ม (`mkSoul`, `mkHardSoul` ใน game.js บรรทัด 231-311) ไม่มี `soul.case` จึงได้แค่เอฟเฟกต์ CSS (สั่น/เหงื่อ/น้ำตาโล่งใจ) ไม่ได้ภาพท่า
2. สำนวนมีชื่อโผล่ไม่ทั่ว: TH ทุก 3 คดี (`CASE_EVERY=3`, game.js `nextNamedCase`), Asia มี A1-A20 (ครบท่า `caught_lie` 7 ชนิดที่ใช้อยู่แล้ว), **West มีแต่สำนวนเควส ส่วน Cyberhell ไม่มีสำนวนมีชื่อเลย** (`CASES_BY_ZONE` ใน cases.js บรรทัด 720-721 ไม่มี key cyberhell) แปลว่าวิญญาณเกือบทุกดวงใน West/Cyberhell และราว 2 ใน 3 ใน TH ไม่เคยได้ท่าพิเศษ

**ข้อเสนอ:** ไม่วาด 80 ภาพ (10 ชนิด x 4 โซน x 2 ท่า) แต่
- ใช้ไฟล์ `caught_lie` / `necessity` ที่มีอยู่เป็น `scared` / `cry` ต่อ (ผูกในทะเบียน ไม่คัดลอกไฟล์)
- วาดเพิ่มเฉพาะช่องที่เกมเรียกใช้จริง = **39 ภาพ** (scared 21 + cry 18)
- ให้ Toby เพิ่ม fallback ในโค้ดให้วิญญาณสุ่มได้ท่าด้วย ไม่งั้นภาพ West/Cyberhell ไม่มีวันถูกแสดง (ดูหัวข้อ 7)

ถ้าคุณเป้ต้องการท่าที่ "แรงกว่า" ที่มีอยู่ (เช่น ทรุด ร้องโหยหวน) ต้องบอก เพราะสเปกนี้ถือว่าท่าเดิมใช้ได้

---

## 1. จังหวะใช้ท่าในเกม (อ่านจากโค้ด)

ห้องสอบสวน (`openTrial` ใน src/ui.js) เป็นที่เดียวที่วิญญาณถูกวาดใหญ่พอให้เห็นสีหน้า

### 1.1 ลำดับเหตุการณ์ตอนกดจี้ (ui.js บรรทัด 2977-3005)

1. ผู้เล่นกดข้อคำให้การ (`[data-line]`) ที่ไม่ใช่ `solid` และ `fearBusy` ยังเป็น false
2. โค้ดคำนวณ `reaction = pressReaction(...)` (interrogation-ui.js บรรทัด 117-121): `'relief'` ถ้าเรื่องที่เพิ่งเปิดเป็นเหตุบรรเทาล้วน (น้ำหนัก w ติดลบ ไม่มี w บวก) นอกนั้น `'fear'`
3. โค้ดหาท่า `nextSoulPose = soulPoseForPress(...)` แล้วเรียก `g.press()` (game.js บรรทัด 1004-1057)
4. ถ้าได้ภาพท่า: สลับ `src` ของ `.fig.foe img` ทันที ใส่คลาส `has-soul-pose` (CSS บรรทัด 97-99 ของ interrogation-ui.css ปิดเอฟเฟกต์สั่น/เหงื่อ/ป้ายโล่งใจ)
5. กล้องซูมที่วิญญาณ ยามาออกนอกเฟรม (`is-fear-zoom`)
6. หลัง `FEAR_BEAT_MS = 1100` ms: วาดห้องใหม่ ข้อความสารภาพขึ้น
7. หลังอีก `FEAR_AFTER_MS = 650` ms (รวม 1.75 วินาที): สลับกลับภาพยืนเดิม กล้องคลาย

**ผลต่องานวาด:** ภาพท่าแสดง 1.75 วินาทีแล้วกลับ เป็นภาพนิ่งภาพเดียวเพียงพอ (ไม่ต้อง 2-4 เฟรม) ตอนแสดงกล้องซูมใกล้ใบหน้า สีหน้าต้องอ่านออกชัด

### 1.2 ตารางจังหวะ

| จังหวะในเกม | เงื่อนไขในโค้ด | ท่า | หมายเหตุ |
|---|---|---|---|
| กดข้อ "ปฏิเสธ" (`deny`) แล้วเปิดความจริง/สารภาพ | `line.kind==='deny'` ทุกคดีมีอย่างน้อย 1 ข้อ | **scared** | ข้อ deny ที่ 2 (เรื่องที่ซ่อน) ก็นับ |
| กดข้อ "อวดบุญ" (`boast`) ที่เป็นบุญปลอมยังไม่ถูกเปิด | `merit.fake && !exposed` | **scared** | |
| กดข้อ "ขอร้อง" (`plea`) ที่เปิดเหตุบรรเทา (คดีหนักสุ่ม 5 เรื่อง + สำนวน necessity) | `pressReaction==='relief'` | **cry** | ป้ายเดิม "น้ำตาแห่งความโล่งใจ..." จะถูกซ่อนเมื่อมีภาพ (ดูคำถามข้อ 4) |
| กดข้อ `solid` (กดผิด) | `kind==='solid'` | ไม่มีท่า ไม่ซูมกล้อง | ตามกติกาเดิม |
| จี้ครบ 2 ครั้งแล้ว / วิญญาณถูกส่งกลับ (`soul.back`) | `presses<=0` / `back` | ไม่มีท่า | ตามกติกาเดิม |
| สำนวนมีชื่อประเภท `other` (nurse, scapegoat, A5, A11, A13, A19, devaMonk, campelder, silentman) | `CASE_POSE_TYPES==='other'` | ไม่มีท่า | คัดไว้แล้วว่าไม่ควรมีท่า คงเดิม |
| ใช้พลัง (กระจก/สะกดจิต/ตวาด/น้ำแข็ง) | ผ่าน `g.usePower` ไม่ใช่ `press` | ไม่มีท่า | ตัวเลือกอนาคต (คำถามข้อ 5) |

### 1.3 ที่ไม่ใช้ท่า (และเหตุผล)

- **แผนที่/เดินส่ง/คิวหน้าแท่น:** วิญญาณตัวเล็กมาก (ASSET-PROMPTS: ราว 12 px) อ่านสีหน้าไม่ออก
- **กระทะทองแดง (pot-souls.js):** วาดที่ `U*0.085` จมลง 30% มีไฟ/เหงื่อ/แดงกะพริบจากโค้ดอยู่แล้ว ภาพท่าไม่เพิ่มอะไร
- **ฉากสู้กับวิญญาณขัดขืน (`startBattle`, kind `'soul'`):** ใช้ `soul.sp` เดียวกัน แต่ผมยังไม่ได้อ่านตัววาดฝั่งศึกใน ui.js จึงไม่ออกสเปกส่วนนี้ ถามคุณเป้ในข้อ 5

### 1.4 ความถี่ที่ชนิดวิญญาณปรากฏ (วิญญาณสุ่ม)

`WHO` ใน data.js บรรทัด 147-151 (12 แบบเท่ากัน) แปลงเป็นชนิดภาพด้วย `soulArchetype` (soul-portraits.js บรรทัด 27-55):

| ชนิดภาพ | มาจาก WHO | โอกาส (ต่อวิญญาณสุ่ม) |
|---|---|---|
| worker | ชายวัยกลางคน, คนขับรถรับจ้าง | 2/12 |
| woman | แม่ค้าตลาดนัด, เจ้าของหอพัก | 2/12 |
| business | เจ้าของกิจการ, นายหน้าที่ดิน | 2/12 |
| elder-woman | หญิงวัยเกษียณ | 1/12 |
| executive | พนักงานออฟฟิศ | 1/12 |
| officer | อดีตข้าราชการ | 1/12 |
| clerk | แม่ค้าออนไลน์ | 1/12 |
| graduate | นักศึกษาเพิ่งจบ | 1/12 (ใช้ภาพ West v3 ภาพเดียวทุกโซน — art.js บรรทัด 107) |
| girl | นักเรียนหญิง | 1/12 |
| cleric, boy | ไม่มีในวิญญาณสุ่ม | ปรากฏเฉพาะสำนวนมีชื่อ (cleric: monk/prophet/A1/A7 มีท่าแล้ว · boy: TH เท่านั้น มี `necessity` แล้ว) |

คดีหนัก `HARD_CASES` (game.js `mkHardSoul`, เกิดราว 22% หลังคดีที่ 2) มี 5 แบบ: ชายวัยกลางคน (worker), หญิงวัยกลางคน (woman), เจ้าของกิจการ (business), อดีตข้าราชการ (officer), แม่ค้าออนไลน์ (clerk) นี่คือ **วิญญาณสุ่มเพียงกลุ่มเดียวที่มี `plea` และเหตุบรรเทา w ติดลบ** → ท่า cry สำหรับวิญญาณสุ่มจึงต้องใช้แค่ 5 ชนิดนี้ ไม่ใช่ 10 (วิญญาณสุ่มปกติ DEEDS ทุกข้อ w >= 1 ไม่มีทางได้ relief)

---

## 2. จำนวนภาพ

| รายการ | scared | cry |
|---|---|---|
| ช่องที่เกมเรียกใช้จริง (วิญญาณสุ่ม 8 ชนิดโซน x 4 โซน + graduate 1) / (5 ชนิด x 4 โซน) | 33 | 20 |
| ใช้ไฟล์เดิมได้ (ผูกทะเบียน) | 12 | 2 |
| **ต้องวาดใหม่** | **21** | **18** |

**วาดใหม่รวม 39 ภาพ** (เทียบ 80 ตามสูตรในใบงาน, Toby นับ 40 ต่อท่า)

ไฟล์เดิมที่ผูกเป็น alias (ไม่ต้องวาด) 14 รายการ:

| ท่า | โซน | ชนิด | ไฟล์เดิม |
|---|---|---|---|
| scared | th | officer, worker, woman, business, executive, clerk | `img/soul-poses/<ชนิด>-th-caught-lie-v1.webp` |
| scared | asia | worker, officer, executive, woman, business, clerk | `img/soul-poses/<ชนิด>-asia-caught-lie-v1.webp` |
| cry | th | worker, officer | `img/soul-poses/<ชนิด>-th-necessity-v1.webp` |

ช่องที่ไม่ต้องทำเลย (ไม่มีจังหวะในเกมปัจจุบัน): boy นอก TH · cleric ที่เป็นวิญญาณสุ่ม · cry ของ elder-woman/girl/executive/graduate (ไม่มี plea) · ทุกท่าของ `other`/`devaMonk` · recruit และ boy ของ TH (มี necessity แล้ว)

---

## 3. ลำดับความสำคัญ

| ชุด | งาน | จำนวนภาพ |
|---|---|---|
| **P0 (โค้ด, Toby)** | fallback วิญญาณสุ่ม + ทะเบียน alias + แก้เทสต์ (หัวข้อ 7) ทำก่อนหรือขนานกับ P1 | 0 |
| **P1 ขั้นต่ำ: TH + Asia ครบทุกจังหวะ** | scared 5 (elder-woman-th, girl-th, elder-woman-asia, girl-asia, graduate-west) · cry 8 (woman/business/clerk ของ th · worker/officer/woman/business/clerk ของ asia) | **13** |
| P2 West | scared 8 · cry 5 | 13 |
| P3 Cyberhell | scared 8 · cry 5 | 13 |

ลำดับวาดภายใน P1 (เห็นผลต่อผู้เล่นมากสุดก่อน): cry ของ TH (woman, business, clerk) → scared ของ graduate (โผล่ทุกโซน) → scared ของ girl/elder-woman TH → cry ของ Asia → scared ของ Asia

หมายเหตุ: โดยความถี่ที่ผู้เล่นเจอ West/Cyberhell ขาดมากกว่า (ไม่มีท่าเลยทั้งโซน) แต่ผู้เล่นไปถึงทีหลัง จึงคงลำดับ TH/Asia ก่อนตามใบงาน

---

## 4. สเปกภาพ (ใช้กับทุกชิ้น)

เทียบกับไฟล์ต้นฉบับ `img/<Thai|Asia|West|CyberHell>/spirit-<ชนิด>-<โซน>-v2.webp` (graduate = `img/West/spirit-graduate-west-v3.webp`)

| หัวข้อ | สเปก |
|---|---|
| ขนาดผืน | **กว้างxสูงเท่าไฟล์ต้นฉบับเป๊ะ** (ส่วนใหญ่เป็นจัตุรัสราว 1254 px แต่บางไฟล์ไม่จัตุรัส เช่น West/CyberHell elder-woman และ CyberHell business ให้อ่านขนาดจากไฟล์ ห้ามเดา) เทสต์เดิม `soul-poses.test.mjs` บังคับขนาดเท่ากัน |
| รูปแบบ | WebP lossless, RGBA, พื้นโปร่งใสจริง (มุมภาพ alpha = 0) ไม่มีเงาพื้น |
| จุดยืน/ท่อนล่าง | ท่อนหางวิญญาณและปลายหางอยู่ตำแหน่งพิกเซลเดิม (ภาพถูกยึดฐานล่างตอนสลับ ถ้าหางขยับตัวจะกระโดด) |
| กรอบตัว | bounding box ของตัวละครเลื่อนจากต้นฉบับไม่เกิน 4% ของความกว้างผืน และไม่ล้นผืน |
| ชุด/ของถือ/สี | เหมือนต้นฉบับทุกจุด (ชุด ทรงผม ไม้เท้า แท็บเล็ต ผ้าเช็ดหน้า กระเป๋า ลายสี) ห้ามเอาชุดข้ามโซนมาใช้ |
| สไตล์พิกเซล | ความหนาเส้นขอบ ขนาดพิกเซล เฉดสีเดียวกับต้นฉบับ ไม่ใช้ gradient ลื่นกว่าต้นฉบับ |
| สิ่งที่เปลี่ยนได้ | สีหน้า มุมศีรษะ (ไม่เกิน 6 องศา) ท่าแขน/มือข้างที่ **ไม่ได้ถือของ** ของที่ถืออยู่ต้องอยู่ที่เดิม |
| ห้าม | ตัวอักษร ตัวเลข สัญลักษณ์อารมณ์ลอย (!, ?, วงเหงื่อนอกใบหน้า) กรอบคำพูด เส้นความเร็ว เอฟเฟกต์ซ้อนที่ขยายกรอบ (เอฟเฟกต์ burst/gloom ของเกมถูกซ่อนเมื่อมีภาพท่า และห้ามวาดซ้ำ) |
| อ่านออกที่ซูม | ใบหน้าต้องอ่านอารมณ์ได้เมื่อย่อภาพสูง 200 px (หน้าสูงอย่างน้อย 15% ของความสูงตัว) |
| น้ำหนักไฟล์ | เป้า <= 1.5 เท่าของไฟล์ต้นฉบับ |

ตัวละครตาขาวว่าง (West/CyberHell worker, executive, officer และ CyberHell woman ที่ใส่แว่นเลนส์ขาว): **คงตาแบบเดิม** ถ่ายทอดอารมณ์ด้วยคิ้ว ปาก เหงื่อ/น้ำตาที่ขอบตา ท่าแขน อย่าเปลี่ยนเป็นตามีม่านตาเพราะจะดูเป็นคนละตัว (ภาพ `worker-asia-caught-lie-v1` ทำแบบนี้อยู่แล้ว ใช้เป็นแบบ)

### 4.1 ท่า scared (ตกใจ/ถูกจับได้)

- คิ้วยกสูง ปลายในชี้ขึ้น ตาเบิกกว้าง
- ปากอ้าเป็นรูปตัว o เล็ก ๆ หรือขากรรไกรตก
- เหงื่อสองถึงสามหยดสีฟ้าอ่อนที่ขมับ/หน้าผาก (ตรงกับของเดิม)
- ลำตัวเอนหนีผู้ถามราว 4-6 องศา ไหล่ยก
- มือข้างว่างยกแตะอก หรือยกขึ้นกันตัวระดับอก (มือเล็ก ไม่ชี้ไปนอกกรอบ)
- อารมณ์: หน้าซีด ช็อก "โดนจับได้" ไม่ใช่กรีดร้อง ไม่ใช่โกรธ
- ตัวที่ฐานเดิมมีสีหน้าเยาะ/ยิ้ม (CyberHell business: ยิ้มเจ้าเล่ห์เหลือบมอง) ให้ลบรอยยิ้มทั้งหมด

### 4.2 ท่า cry (ร้องไห้ เมื่อมีคนรับฟังความจริง)

- คิ้วปลายในยกและชิดกัน ตาปิดครึ่งหรือเศร้าลงต่ำ มีน้ำคลอ
- น้ำตาไหลสองทางตามแก้ม สีขาวฟ้าอ่อนมีไฮไลต์ ตรงกับของเดิม มีหยดน้ำตาตกได้ 1-2 หยด
- ปากเบะเล็กน้อยหรือเผยอเหมือนถอนหายใจ ไม่อ้ากว้าง
- ศีรษะก้มลง 5-8 องศา ไหล่ตก
- มือข้างว่างอาจยกขึ้นเช็ดน้ำตา/แตะหน้าอก ถ้ามีของถือสองมือ (ผ้าเช็ดหน้า) ให้ยกผ้าเข้าใกล้แก้มโดยยังเป็นผ้าผืนเดิม
- อารมณ์: "โล่งใจที่มีคนฟัง" ปนเศร้า มีศักดิ์ศรี ไม่โวยวาย
- **ข้อระวัง:** เหตุบรรเทาของคดีหนักเกี่ยวกับความรุนแรงในครอบครัว/การทารุณ ท่าต้องสุภาพ ไม่ยั่ว ไม่เห็นบาดแผล เลือด หรือท่าทางเชิงเพศ โดยเฉพาะ girl และ woman

ภาพแนวทางสีหน้าที่ต้องแนบให้ Codex คู่กับต้นฉบับ: scared = `img/soul-poses/officer-th-caught-lie-v1.webp` และ `worker-asia-caught-lie-v1.webp` · cry = `img/soul-poses/girl-th-necessity-v1.webp` และ `officer-th-necessity-v1.webp`

---

## 5. ตารางงาน 39 ภาพ

ชื่อไฟล์: `img/soul-poses/<ชนิด>-<โซน>-scared-v1.webp` และ `-cry-v1.webp` (โซน = th, asia, west, cyberhell ตัวพิมพ์เล็ก เหมือนไฟล์เดิม) ข้อสังเกตเป็นของที่ผมเห็นจากไฟล์ต้นฉบับ Codex ต้องเปิดไฟล์ดูเองและยึดภาพเป็นหลักถ้าขัดกับตาราง

### P1 (13)

| # | ไฟล์ที่ส่ง | ต้นฉบับที่แนบ | ข้อสังเกต |
|---|---|---|---|
| 1 | `woman-th-cry-v1` | `Thai/spirit-woman-th-v2` | ตรวจไฟล์ก่อน · ใช้กับคดีหนัก "หญิงวัยกลางคน" และแม่ค้า/เจ้าของหอพัก |
| 2 | `business-th-cry-v1` | `Thai/spirit-business-th-v2` | คดีหนัก "เจ้าของกิจการ" |
| 3 | `clerk-th-cry-v1` | `Thai/spirit-clerk-th-v2` | คดีหนัก "แม่ค้าออนไลน์" |
| 4 | `graduate-west-scared-v1` | `West/spirit-graduate-west-v3` | ใช้ทุกโซน (ภาพต้นฉบับเดียวทุกโซน) ถ้าต่อไปวาด graduate แยกโซนต้องทำท่านี้ใหม่ |
| 5 | `girl-th-scared-v1` | `Thai/spirit-girl-th-v2` | ชุดนักเรียน ผมมัดโบว์ขาว ถือสายกระเป๋าด้วยมือขวา มือซ้ายห้อยข้างตัว: ให้มือซ้ายยกแตะอก มือขวากำสายกระเป๋าแน่น ใบหน้าต้องไม่ลดความเยาว์ (เด็ก ไม่สยอง) |
| 6 | `elder-woman-th-scared-v1` | `Thai/spirit-elder-woman-th-v2` | ตรวจไฟล์ก่อน |
| 7-11 | `worker/officer/woman/business/clerk-asia-cry-v1` | `Asia/spirit-<ชนิด>-asia-v2` | ชุดเอเชียตะวันออกแบบเดิมของแต่ละไฟล์ (worker เป็นชายชรามวยผม ตาขาว ถือไม้เท้าไม้ไผ่) |
| 12 | `girl-asia-scared-v1` | `Asia/spirit-girl-asia-v2` | ตรวจไฟล์ก่อน (ไฟล์ต้นฉบับมีอยู่ตามทะเบียน ยังไม่ได้เปิดดู) |
| 13 | `elder-woman-asia-scared-v1` | `Asia/spirit-elder-woman-asia-v2` | ตรวจไฟล์ก่อน |

### P2 West (13)

scared: worker, officer, executive, woman, business, clerk, elder-woman, girl · cry: worker, officer, woman, business, clerk
ต้นฉบับ `West/spirit-<ชนิด>-west-v2`

| ชนิด | ข้อสังเกตจากไฟล์ที่เปิดดู |
|---|---|
| worker | ชายชราตาขาว เสื้อโค้ตขนปกกับผ้าพันคอ ไม้เท้าในมือซ้าย มือขวาซุกกระเป๋า: scared ให้ดึงมือขวาออกมายกแตะอก · cry น้ำตาไหลจากขอบตาขาว |
| elder-woman | ผืนไม่จัตุรัส ถือผ้าเช็ดหน้าสองมือ สีหน้าเดิมเศร้าอ่อนอยู่แล้ว: scared ตาโต ปากเปิด กำผ้าแน่นที่อก · cry น้ำตาไหลชัดกว่าฐานและยกผ้าแตะแก้ม (ฐานดูเศร้าอยู่แล้ว ต้องต่างจากฐานให้เห็นชัด) |
| ที่เหลือ | ยังไม่ได้เปิดดู ตรวจจากไฟล์ |

### P3 Cyberhell (13)

scared: worker, officer, executive, woman, business, clerk, elder-woman, girl · cry: worker, officer, woman, business, clerk
ต้นฉบับ `CyberHell/spirit-<ชนิด>-cyberhell-v2` (โฟลเดอร์สะกด `CyberHell` ไฟล์สะกด `cyberhell` ตัวเล็ก)

| ชนิด | ข้อสังเกตจากไฟล์ที่เปิดดู |
|---|---|
| worker | ชายชราตาขาว แจ็กเก็ตเทคนีออนฟ้าม่วง แท็บเล็ตในมือซ้าย มือขวาห้อยมีนาฬิกา: scared ยกมือขวาแตะอก |
| executive | ตาขาว สูทเทา ไทม่วง ไม้เท้าไฟฟ้ามือซ้าย มือขวากำหลวม: scared ยกมือขวาแตะอก |
| officer | ตาขาว เครื่องแบบขาวทองมีผ้าคลุมม่วง ไม้เท้ามือซ้าย: scared ยกมือขวาแตะอก · cry น้ำตาจากขอบตาขาว |
| business | ผืนไม่จัตุรัส ชายอ้วนยิ้มเจ้าเล่ห์เหลือบมอง มือหนึ่งจับปกสูท อีกมือสวมนาฬิกาทอง แหวนทอง: ลบรอยยิ้ม คงนาฬิกาและแหวน ไม่ต้องยกของใหม่ |
| woman | แว่นเลนส์ขาวทึบ ถือแท็บเล็ตมือซ้าย: อารมณ์แสดงที่คิ้วเหนือแว่นและปาก น้ำตาไหลจากขอบล่างเลนส์ |
| clerk | ผมมวย ป้ายห้อยคอ ถือแฟ้มเรืองแสงชิดอกมือซ้าย: scared ตาโต มือขวาแตะอก · cry |
| girl | ผมหางม้า เสื้อฮู้ดขาว แท็บเล็ตมือซ้าย: scared (ยังเป็นเด็ก ไม่สยอง) |
| elder-woman | ผืนไม่จัตุรัส ผ้าเช็ดหน้าสองมือ สีหน้าเดิมเศร้าอ่อน: scared ตาโต ปากเปิด |

---

## 6. Prompt ให้ Codex

วิธีทำ: ใช้โหมดแก้ภาพ (image edit) แนบไฟล์ต้นฉบับของตัวนั้นเสมอ ตามกฎ "ห้าม gen จาก prompt เปล่า" ใน ASSET-PROMPTS.md ชุดที่ 4 และแนบภาพตัวอย่างสีหน้าตามหัวข้อ 4.2 หนึ่งภาพ ตรวจเทียบต้นฉบับก่อนส่ง ถ้าชุด/หัว/ของถือเพี้ยน gen ใหม่

### 6.1 บล็อกที่ต้องแปะนำหน้าทุกชิ้น (บล็อกสไตล์จาก ASSET-PROMPTS.md คัดมาตรง ๆ)

```
top-down 3/4 isometric-ish view game asset, high-detail modern pixel art in the style of
a beautifully drawn Pokemon-style overworld map, chunky readable silhouette, soft dithered
shading with warm rim light, rich saturated palette, clean crisp pixel edges,
single object centered on a fully transparent background, square canvas, no ground shadow baked in,
no text, no letters, no numbers, no watermark, no UI
COLOR THEME: Thai buddhist underworld — obsidian black-purple stone, blood-red lacquer,
molten orange lava glow, antique temple gold trim
```

บล็อกนี้ขัดกับงานแก้ภาพสองจุด จึงต้องตามด้วยบล็อกล็อก (6.2) ที่ทับ: "square canvas" (ผืนบางไฟล์ไม่จัตุรัส) และ "COLOR THEME" (สีต้องตามภาพอ้างอิง ไม่ย้อมใหม่)

### 6.2 บล็อกล็อก (ต่อท้ายบล็อกสไตล์ ใช้ทั้ง scared และ cry)

```
EDIT the attached reference image of a standing ghost. The reference image overrides
the COLOR THEME and the "square canvas" above: output canvas = EXACT same pixel width and
height as the reference, same palette, same outline weight, same pixel density.
Keep EXACTLY as in the reference: the character's identity, hair, outfit, every prop and its
colors, the lower ghost tail (same shape and same position of the tail tip), the overall
silhouette position. Move the figure no more than 4 percent of the canvas width.
Change ONLY: facial expression, head tilt (max 6 degrees), and the pose of the free hand
(the hand that is not holding a prop). A held prop stays in the same hand and place.
If the reference character has blank white eyes or white glasses lenses, keep them blank
white and express emotion with eyebrows, mouth, sweat or tears at the eye edge.
Fully transparent background, no ground shadow.
Forbidden: any text, letters, numbers, speech bubbles, emote symbols, motion lines, extra
effects, blood, gore, suggestive posing, a second character, costume changes.
```

### 6.3 บล็อกท่า (เลือกหนึ่งอย่าง)

scared:
```
POSE: startled and caught out. Eyebrows raised high with inner ends up, eyes wide open,
mouth open in a small round "o", two or three small pale-blue sweat drops at the temple,
face slightly paler. Body leaning back about 5 degrees, shoulders lifted. The free hand
rises to the chest in a flinch. Expression is shock at being exposed, not screaming and not
anger. Remove any smirk or smile from the reference.
```

cry:
```
POSE: quietly weeping with relief that someone finally listened. Eyebrows with inner ends
raised and drawn together, eyes half closed and glistening, two streams of pale white-blue
tears running down both cheeks with small highlights, one or two drops falling, mouth in a
small trembling frown or slightly parted like a sigh. Head bowed about 6 degrees, shoulders
dropped. The free hand may lift to wipe a tear; if both hands hold a handkerchief, lift the
same handkerchief toward the cheek. Dignified sorrow, not wailing, no open screaming mouth.
Respectful and gentle in tone.
```

### 6.4 บรรทัดต่อชิ้น (ท้าย prompt)

```
Reference to edit: img/<Folder>/spirit-<type>-<zone>-v2.webp
Expression style reference: img/soul-poses/<ภาพตัวอย่างตาม 4.2>
Output file name: img/soul-poses/<type>-<zone>-<scared|cry>-v1.webp  (lossless WebP RGBA)
Character-specific note: <ข้อสังเกตจากตารางหัวข้อ 5 ถ้ามี>
```

---

## 7. งานโค้ดที่ต้องมี (ของ Toby ไม่ใช่ของผม)

ผมไม่ได้แก้โค้ด นี่คือสิ่งที่งานนี้ต้องพึ่ง เพื่อให้ภาพที่วาดถูกแสดง

1. **ทะเบียนท่า generic** ใน `src/soul-poses.js`: map ต้นฉบับ (`baseSrc`) -> `{scared, cry}` รวม alias 14 รายการจากหัวข้อ 2 ชี้ไปไฟล์เดิม (ไม่คัดลอกไฟล์)
2. **fallback ใน `soulPoseForPress`** (เรียกหลังหาท่าเฉพาะสำนวนไม่เจอ):
   - `CASE_POSE_TYPES[soul.case]==='other'` -> `null` (คงเดิม)
   - ชนิด `caught_lie` ที่ไม่มีไฟล์เฉพาะ และเป็นข้อ deny/boast ปลอม -> `scared`
   - ชนิด `necessity` ที่ไม่มีไฟล์เฉพาะ และเป็น plea เปิดเหตุบรรเทาที่ยังไม่รู้ -> `cry`
   - **ไม่มี `soul.case`** (สุ่ม/หนักสุ่ม): ใช้ `pressReaction` ที่มีอยู่ (`'fear'` -> scared, `'relief'` -> cry) บนข้อที่ `kind !== 'solid'` ผ่านกติกาเดิม `!line.used`, `presses>0`, `!soul.back`
   - ลำดับยืนยัน: ท่าเฉพาะสำนวน (caught_lie/necessity เดิม) ชนะ generic เสมอ ไม่เดาจากคะแนน/สี/ผลตัดสิน (ตามกติกาใน soul-poses.js บรรทัด 1-2)
3. **preload:** `soulPoseAssets(baseSrc)` และ `zoneAssets` (asset-preload.js) ต้องรวมไฟล์ generic โหลดครั้งเดียวต่อไฟล์ (เทสต์เดิมตรวจเรื่องนี้)
4. **ต้องแก้เทสต์เดิม** `tests/soul-poses.test.mjs`: บรรทัด 39 (`{case:undefined}` ต้องได้ `null`) และบรรทัด 127 (necessity + `{case:undefined}` ต้องได้ `null`) จะล้มเมื่อมี fallback เพราะวิญญาณสุ่มได้ท่าแล้ว ต้องเขียนใหม่เป็น "วิญญาณสุ่มได้ generic เฉพาะเมื่อ reaction ตรง" ส่วนเทสต์ `registered assets exist, preserve canvas size...` ขยายให้ครอบคลุมไฟล์ใหม่ทั้ง 39
5. (แนะนำ) ป้าย `.relief-label` "น้ำตาแห่งความโล่งใจ · มีผู้รับฟังความจริงแล้ว" ถูกซ่อนเมื่อมีภาพท่า (interrogation-ui.css บรรทัด 98) ภาพ cry อาจอ่านเป็นแค่ "เศร้า" ถ้าจะให้ผู้เล่นรู้ว่าเป็นความโล่งใจ ควรให้ป้ายยังแสดงเมื่อเป็น cry (ถามคุณเป้ข้อ 4)

---

## 8. เกณฑ์รับงาน (Chris/Toby ตรวจ)

1. ไฟล์ครบตามหัวข้อ 5 ชื่อตรงรูปแบบ มีเฉพาะ `-scared-v1` / `-cry-v1`
2. WebP lossless RGBA ขนาดกว้างxสูงเท่าต้นฉบับทุกไฟล์ (เทสต์อัตโนมัติ)
3. มุมภาพ alpha = 0 ไม่มีกรอบ/เงา/ตัวอักษร
4. วางซ้อนต้นฉบับแล้วท่อนล่าง (ใต้เอว) และปลายหางตรงกัน กรอบตัวเลื่อนไม่เกิน 4% ของความกว้าง
5. ชุด/ทรงผม/ของถือ/สี เหมือนต้นฉบับ (เทียบข้างกันทีละไฟล์)
6. ย่อสูง 200 px แล้ว scared อ่านเป็นตกใจ และ cry อ่านเป็นร้องไห้ ชัดและต่างจากภาพยืนเดิม
7. ตัวตาขาว/เลนส์ขาว ยังตาขาว
8. cry ไม่เห็นบาดแผล ท่าเชิงเพศ หรือท่าเกินเหตุ
9. ขนาดไฟล์ไม่เกิน 1.5 เท่าของต้นฉบับ
10. เปิดในเกมจริง: คดีหนักสุ่มที่ TH กดข้อขอร้อง เห็น cry · กดข้อปฏิเสธของวิญญาณสุ่มเห็น scared · กลับท่ายืนหลัง 1.75 วินาที · ป้ายชื่อ/เลย์เอาต์ไม่ขยับ

---

## 9. คำถามถึงคุณเป้ (ตัดสินก่อนสั่ง Codex)

1. **ใช้ท่าเดิมเป็น scared/cry ได้ไหม** (แนะนำ: ได้) เพราะ caught_lie = ตกใจ และ necessity = ร้องไห้อยู่แล้ว วาดเพิ่ม 39 ภาพแทน 80 ถ้าอยากได้ท่าใหม่ที่ต่างจากของเดิม ต้องบอกว่าต่างอย่างไร
2. **อนุญาตให้ Toby แก้โค้ดให้วิญญาณสุ่มได้ท่าด้วยไหม** (แนะนำ: ได้) ถ้าไม่ ภาพ West/Cyberhell ทั้ง 26 ภาพจะไม่ถูกแสดงเลย และ TH ได้ท่าเฉพาะ 1 ใน 3 ของคดี
3. **ลำดับ:** ตกลงทำ P1 (13 ภาพ) ก่อน หรืออยากข้ามไป West/Cyberhell ก่อน เพราะตอนนี้ทั้งสองโซนไม่มีท่าเลย
4. **ป้าย "น้ำตาแห่งความโล่งใจ"** ให้คงแสดงคู่ภาพ cry หรือปล่อยหายตามกติกาเดิม
5. **ขยายไปฉากอื่นไหม** ในอนาคต: ท่า scared ตอนใช้กระจก/สะกดจิต และท่า cry/scared ตอนวิญญาณแพ้ในฉากสู้ (ผมยังไม่ได้อ่านโค้ดฝั่งศึก จึงไม่ได้ออกสเปกให้)
6. **เนื้อหาละเอียดอ่อน:** cry ของคดีหนักผูกกับเหตุบรรเทาหนัก ๆ (ถูกทารุณ/ล่วงละเมิด) ผมกำหนดให้ท่าสุภาพและไม่เห็นรายละเอียด ขอให้คุณเป้ยืนยัน

---

## 10. ข้อจำกัดของการตรวจครั้งนี้ (ไม่ได้ยืนยัน)

- เครื่องมือที่ใช้ได้มีแค่อ่านไฟล์ ไม่มี grep/ls จึงอ่านโค้ดตามเส้นทางที่เกี่ยวข้อง ไม่ได้สแกนทั้งรีโป อาจมีที่อื่นใน ui.js/room.js ที่ใช้ภาพวิญญาณใหญ่ที่ผมไม่เจอ
- ขนาดพิกเซลจริงของแต่ละไฟล์ไม่ได้วัดตัวเลข (เห็นจากภาพว่า 1254 จัตุรัสเป็นส่วนใหญ่ และอย่างน้อย 3 ไฟล์ไม่จัตุรัส) ให้ Codex/Toby อ่านจากไฟล์
- ไฟล์ต้นฉบับที่เปิดดูแล้วว่ามีจริง: TH girl · Asia boy · West worker, elder-woman · CyberHell woman, worker, executive, officer, business, clerk, girl, elder-woman · ท่าเดิม officer-th (caught-lie, necessity), girl-th-necessity, worker-asia-caught-lie ที่เหลือเชื่อตามทะเบียน `regionalSpiritAliases` แต่ยังไม่ได้เปิดดูทีละไฟล์ (West executive/officer/business/woman/clerk/girl · Asia elder-woman/girl/woman/business/clerk/officer · TH elder-woman/woman/business/clerk)
- ยังไม่ได้อ่านตัววาดวิญญาณในฉากสู้ (kind `'soul'`) และ `room.js` ส่วนวาดวิญญาณในห้องสถานี สรุปว่า "ใช้เฉพาะห้องสอบสวน" มาจากขนาดตัวที่อ่านได้ ไม่ใช่การไล่ทุกจุดเรียก
- ไม่ได้ตรวจว่า quest case (hirefire, feudgran) ถูกส่งในโซนไหนและใช้ชนิดภาพอะไร พบว่า `feudgran` (necessity) ไม่มีบรรทัด `plea` ท่า necessity จึงไม่มีทางทำงานกับคดีนี้ (ไม่เกี่ยวกับงานวาด แต่ Toby อาจอยากรู้)
- ค่า FEAR_BEAT_MS/FEAR_AFTER_MS อ่านจาก ui.js บรรทัด 2674 ถ้า Toby ปรับค่า ระยะแสดงภาพก็เปลี่ยนตาม
