# AVEGEE FB3-R2 · ข้อความเกมชุดรวม + คู่มือวิธีเล่น (ก–ฏ + MN1) · Rae · 26 พ.ย. 2569

ใบงาน: `Output/Claudy/briefs/2026-11-26-avegee-fb3-r2-copy.md` · โค้ดอ่านจาก `/Users/agapae/agapae-work/AVEGEE/src/` (main `f0007d8c`) อ่านอย่างเดียว

**ข้อจำกัดของรอบนี้ (อ่านก่อน)** รอบนี้ผมมีแค่ Read ไม่มี Grep/Bash จึงหาข้อความด้วยการเปิดไฟล์ตรง ๆ:
- ไฟล์ที่เปิดอ่านจริง: `lamp-text.js` `liberation-text.js` `z4g-return.js` `z1-events.js` `z2-gate.js` `z2b-ryujin.js` `z2b-harbor.js` `z2b-cerberus.js` `z3e-eirlin.js` `z3f-severin.js` `z4b-colosseum.js` `z4c-raw.js` `z4a-border.js` `z4a-raw.js` `z4f-lupin.js` `merit-count.js` `interrogation.js` `interrogation-ui.js` `data.js` (บางช่วง) `cases.js` (หัวไฟล์)
- ไม่ได้เปิด (หาไม่เจอโดยไม่มี grep): `game.js` (ข้อ ก), `i18n.js` (ข้อ ช ฎ ฏ), `ui.js` (ข้อ ฉ) → ผมใช้ "ข้อความเดิม" จากตารางรายงานของ Toby (T3/T5/T6/T7) แทน และบอกว่าเลขบรรทัดไม่มี ให้ Toby ค้นด้วยข้อความเดิมตรง ๆ
- **ข้อ ฌ ผมไล่ครบเท่าที่เปิดอ่านได้ (28 จุด) แต่รับรองไม่ได้ว่าครบทุกจุดในโค้ด** → ให้ Toby รัน `git grep -n หอกระจก -- src` หลังใส่ตาราง ถ้าเหลือจุดที่ผู้เล่นเห็นให้แทนด้วย "หอส่องกรรม" ตามกติกาเดียวกัน (แทนตรงตัว ไม่ต้องรอ Rae) · และ `git grep -n "ท่าไม้ตาย" -- src` ตรวจซ้ำเฉพาะข้อความที่พูดถึงตะเกียง

**วิธีใช้ตาราง** "เดิม" = ข้อความในโค้ดตอนนี้ (ย่อด้วย … เมื่อยาว แทนเฉพาะส่วนที่เปลี่ยน) · "ใหม่" = ข้อความที่ใส่ตรงตัว · ชื่อ "หอส่องกรรม" = Mirror Tower (อังกฤษคงเดิม) · ใช้ "เบี้ยกรรม" เป็นหน่วยเงินเหมือนทั้งเกม

---

## กติกาตะเกียงที่ทุกข้อ ง/จ/ช/ซ/MN1 ยึด (ตามใบงาน)
เรียกตัวอัญเชิญได้ 3 ครั้ง · แต่ละครั้งตัวอัญเชิญยืนในทีม ลงมือได้ 3 ตา · หมดแล้วไปเติมที่หอส่องกรรม · หอเปิดหลังจบอีเวนต์นางสีดา/หนุมาน (ได้ตะเกียง)
ผมตีความ "3 ครั้ง" เป็น **ต่อผู้ช่วยหนึ่งตน** ตามที่โค้ดเป็นอยู่ (`bag.movesLeft` "เรียกได้อีก n/3 ครั้ง", `battle.helperSpent` "{name}: เรียกครบ 3 ครั้งแล้ว") — ถ้าที่จริงเป็น 3 ครั้งรวมทั้งตะเกียง ให้เปลี่ยนคำว่า "ตนละ" เป็น "รวม" ในข้อ ง (ดูท้ายไฟล์ ข้อ 1)

---

## ก · บันทึกหลังเปิดโปงบุญปลอม

| | |
|---|---|
| ไฟล์ · จุด | `src/game.js` · ฟังก์ชันที่ตอบข้ออวดบุญ (`press` ชนิด `'boast'`) — ไม่มีเลขบรรทัด ค้นด้วยข้อความเดิม |
| เดิม | `…บุญปลอมถูกลบออกจากสำนวนแล้ว` (ส่วนท้ายของบันทึกหลังเปิดโปง) |
| ใหม่ ไทย | `…บุญข้อนี้ไม่นับ ทำเครื่องหมาย (ไม่นับ) ไว้ในสำนวนแล้ว` |
| ใหม่ อังกฤษ | `…That merit does not count. It is marked (Not counted) in the file.` |

หมายเหตุ: "(ไม่นับ)" ในประโยคต้องเป็นสตริงเดียวกับป้ายที่ `merit-count.js` แสดงจริง (ถ้าป้ายอังกฤษของเกมใช้คำอื่น เช่น "Doesn't count" ให้ Toby ใช้คำนั้น) · ตรวจแล้วบันทึกอื่นที่เปิดโปงบุญปลอม (กานต์ `interrogation.js` "…เป็นเรื่องแต่งขึ้น") ไม่ขัดระบบ ไม่ต้องแก้

---

## ข · MN6 บทยอมรับของบุญอีก 6 ข้อ

| | |
|---|---|
| ไฟล์ · จุด | `src/data.js` L156–164 `MERITS` (ตารางบุญของวิญญาณสุ่ม) → เพิ่มฟิลด์ `claim` (บทยืนยัน) ต่อบุญ · บทของคุณเป้ (หมาจร) ผูกไว้แล้วที่ T3 — ใช้ทรงเดียวกัน |
| รูปแบบ | บทเป็น "แม่แบบ" ใช้ token ตาม `PRON` ใน `data.js`: `{i}` = ผม/ดิฉัน · `{na}` = นะครับ/นะคะ · **ห้ามเขียน "ผม/ครับ" ตรง ๆ** · ทุกบทขึ้นด้วยการกระทำ + "เพื่อ/เพราะ…" + "จริงๆ{na}" ตามบทของคุณเป้ |

| บุญ (`t` เดิม) | ใหม่ ไทย (แม่แบบ) | ผลที่เห็น หญิง | ผลที่เห็น ชาย | อังกฤษ (อ้างอิง*) |
|---|---|---|---|---|
| เลี้ยงหมาจรมาทั้งชีวิต 14 ตัว | `{i}เลี้ยงหมาจร เพื่อช่วยชีวิตมันจริงๆ{na}` (**บทคุณเป้ ตรงตัว**) | ดิฉันเลี้ยงหมาจร เพื่อช่วยชีวิตมันจริงๆนะคะ | ผมเลี้ยงหมาจร เพื่อช่วยชีวิตมันจริงๆนะครับ | I took in stray dogs to save their lives, truly. |
| เคยบวชให้แม่หนึ่งพรรษา (`sex:'m'`) | `{i}บวชให้แม่ครบพรรษา เพื่อทดแทนคุณท่านจริงๆ{na}` | — (บุญนี้ชายเท่านั้น) | ผมบวชให้แม่ครบพรรษา เพื่อทดแทนคุณท่านจริงๆนะครับ | I was ordained for my mother for a full rains retreat, to repay her, truly. |
| บริจาคเลือดครบ 40 ครั้ง | `{i}บริจาคเลือด เพื่อให้คนอื่นได้มีชีวิตต่อจริงๆ{na}` | ดิฉันบริจาคเลือด เพื่อให้คนอื่นได้มีชีวิตต่อจริงๆนะคะ | ผมบริจาคเลือด เพื่อให้คนอื่นได้มีชีวิตต่อจริงๆนะครับ | I gave blood so that others could go on living, truly. |
| เคยกระโดดลงคลองช่วยเด็กจมน้ำ | `{i}กระโดดลงไปช่วยเด็กคนนั้น เพราะไม่อยากให้เขาจมน้ำตายจริงๆ{na}` | ดิฉันกระโดดลงไปช่วยเด็กคนนั้น เพราะไม่อยากให้เขาจมน้ำตายจริงๆนะคะ | ผมกระโดดลงไป… นะครับ | I jumped in after that child because I could not bear to let him drown, truly. |
| ส่งเสียหลานเรียนจนจบทั้งที่ไม่ใช่ลูก | `{i}ส่งหลานเรียนจนจบ เพราะอยากให้เขามีอนาคตจริงๆ{na}` | ดิฉันส่งหลานเรียนจนจบ เพราะอยากให้เขามีอนาคตจริงๆนะคะ | ผมส่งหลานเรียนจนจบ… นะครับ | I put my nephew through school because I wanted him to have a future, truly. |
| ปล่อยปลาทุกวันเกิดมาตลอดชีวิต | `{i}ปล่อยปลาทุกวันเกิด เพื่อให้ชีวิตมันได้รอดจริงๆ{na}` | ดิฉันปล่อยปลาทุกวันเกิด เพื่อให้ชีวิตมันได้รอดจริงๆนะคะ | ผมปล่อยปลาทุกวันเกิด… นะครับ | I released fish every birthday so that their lives could be spared, truly. |
| ช่วยงานศพคนในหมู่บ้านไม่เคยเว้นสักงาน | `{i}ไปช่วยงานศพทุกงาน เพื่อให้ครอบครัวเขาไม่ต้องเผชิญลำพังจริงๆ{na}` | ดิฉันไปช่วยงานศพทุกงาน เพื่อให้ครอบครัวเขาไม่ต้องเผชิญลำพังจริงๆนะคะ | ผมไปช่วยงานศพทุกงาน… นะครับ | I helped at every funeral so that no family had to face it alone, truly. |

*บทพูดของวิญญาณสุ่มเป็นไทยอย่างเดียวในเกม (i18n ไม่แปลสำนวน) อังกฤษไว้อ้างอิง/ถ้าวันหน้าแปล · ไม่มี "ผม/ดิฉัน" ในอังกฤษ จึงไม่แยกเพศ

---

## ค · หัวข้อฉาก e12 (กุมภัณฑ์เข้าช่วย)

| | |
|---|---|
| ไฟล์ · จุด | `src/z1-events.js` L350–351 `BREACH_STORIES['frontier-th-guard-joins']` (`title` ชั้นนอก + `page(..., title, line)` ชั้นใน — **สองที่ต้องเหมือนกัน**) |
| เดิม | `ยักษ์ทวารบาลออกมาช่วย` |
| ใหม่ ไทย | `กุมภัณฑ์เข้าช่วย` |
| ใหม่ อังกฤษ | `Kumphan Joins the Fight` (cutscene ไทยล้วนตามเดิม — ใส่ไว้เผื่อเปิดแปล) |
| บรรทัดข้อความ | คงตามคุณเป้ `ข้าชื่อ "กุมภัณฑ์" เดี๋ยวข้าช่วยจัดการเจ้าพวกนี้เอง` |

**ที่เกี่ยวเนื่อง ขอ Claudy ตัดสิน (ข้อ 2 ท้ายไฟล์):** ฉาก `z1-guard-name` (`z1-events.js` L308–314) และป้าย `guard.th.title` "ยักษ์ทวารบาลประจำสุวรรณภูมิ" (`lamp-text.js` L89) ยังเขียนว่าเขา "ยืนเฝ้าประตูชายแดนมาตลอดปี / ตั้งแต่รุ่นพ่อข้าเฝ้าด่านนี้" — ขัดกับข้อเท็จจริงที่ว่ากุมภัณฑ์เพิ่งปรากฏตัว ผมเขียนฉบับแก้ไว้ให้ที่ท้ายข้อนี้ ถ้า Claudy เห็นชอบให้ Toby ใส่ด้วย

<details><summary>ฉบับแก้ `z1-guard-name` (ถ้าอนุมัติ)</summary>

หัวหน้า: ชื่อหน้า `ข้าชื่อกุมภัณฑ์` (คงเดิม) · บรรทัดใหม่แทน L310–313:
```
บรรยาย: ยักษ์ร่างเขียวคล้ำผู้เพิ่งก้าวออกมาช่วยสู้ ยกมือเกาท้ายทอย มืออีกข้างยังกำกระบองไว้แน่น
ยักษ์เขียว: "เอ่อ ... ท่านยังไม่ทันถามชื่อข้าเลยนะ ข้าชื่อกุมภัณฑ์ (กระแอม) เพิ่งตามมาถึงด่านนี้ แต่ข้ายินดีช่วยท่านเต็มที่"
นิรา: "บันทึกชื่อแล้วค่ะ กุมภัณฑ์ ผู้เฝ้าด่านสุวรรณภูมิ"
กุมภัณฑ์: "ฮะ ฮะ ฟังแล้วเหมือนข้ามียศเลย"
```
ป้าย `guard.th.title`: `ผู้เฝ้าด่านสุวรรณภูมิ` / `Gate Guard of Suvarnabhumi` (ตัดคำว่ายักษ์ทวารบาลออก)
</details>

---

## ง · ข้อความ "ท่าไม้ตายใช้ได้ 3 ครั้ง" → กติกาตะเกียงใหม่

### ง-1 `src/lamp-text.js`
| key (บรรทัด) | เดิม | ใหม่ ไทย | ใหม่ อังกฤษ |
|---|---|---|---|
| `bag.note` (L22) | เลือกผู้ช่วยที่จะเรียกมาในศึก แต่ละตนใช้ท่าไม้ตายได้ 3 ครั้งก่อนต้องเติมพลังที่หอกระจก | เลือกผู้ช่วยที่จะเรียกมาในศึก เรียกได้ตนละ 3 ครั้ง ทุกครั้งผู้ช่วยจะยืนในทีมและลงมือได้ 3 ตา หมดแล้วไปเติมไฟที่หอส่องกรรม | Choose who answers your call in battle. Each helper can be called 3 times. Every time, they stand in your team and act for 3 turns. When the flames run out, recharge at the Mirror Tower. |
| `notice.received.text` (L73) | นางสีดามอบตะเกียงวิเศษให้ยามา จุดตะเกียงแล้วเรียกผู้ที่ยอมรับท่านมาช่วยในศึกได้ ผู้ช่วยแต่ละตนใช้ท่าไม้ตายได้ 3 ครั้ง เติมพลังที่หอกระจก | **ดูข้อ ซ (รวมหน้าต่าง)** — ถ้าไม่รวม ใช้: นางสีดามอบตะเกียงวิเศษให้ยามา จุดตะเกียงแล้วเรียกผู้ที่ยอมรับท่านมาสู้ข้างทีมได้ เรียกได้ตนละ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | **see ซ** — if not merged: Lady Sita has given Yama the Magic Lamp. Light it to call those who accepted you to fight at your side. Each can be called 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |
| `notice.low.text` (L79) | ผู้ช่วยในตะเกียงใช้ท่าไม้ตายครบแล้ว ไปเติมพลังที่หอกระจก | ผู้ช่วยในตะเกียงถูกเรียกครบ 3 ครั้งแล้ว ไปเติมไฟตะเกียงที่หอส่องกรรม | Your helpers have been called all 3 times. Go to the Mirror Tower to recharge the Lamp. |

### ง-2 หน้าต่าง "ฝากไฟไว้ในตะเกียง" ของตัวอัญเชิญทุกตัว (9 ตน · 8 ไฟล์)
ทุกข้อเปลี่ยน **เฉพาะประโยคท้าย** (ต่อจาก "ท่านเรียกเขา/เธอ… ในศึกได้") · ส่วนหน้าของแต่ละตัวคงเดิม · ใช้ประโยคท้ายเดียวกัน:
- **ท้าย ไทย:** `เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม`
- **ท้าย อังกฤษ:** `You can call {him/her} 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower.`

| ไฟล์ · บรรทัด | ผู้ช่วย | ข้อความไทยทั้งก้อน — ใหม่ | ข้อความอังกฤษทั้งก้อน — ใหม่ |
|---|---|---|---|
| `z2-gate.js` L34 (`flameNotice`) | ยมทัต | ยมทัตออกจากทีมเพราะสาขาบูรพาไม่ใช่เขตของเขา เขาฝากไฟไว้ในตะเกียงวิเศษ ท่านเรียกเขาในศึกได้ เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | Yomathat leaves the team because the eastern branch is not his jurisdiction. He leaves a flame in the Magic Lamp. You can call him in battle. You can call him 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |
| `z2b-ryujin.js` L20 (`win`) | ริวจิน | ริวจินฝากไฟไว้ในตะเกียงวิเศษ ท่านเรียกมังกรสายน้ำมาช่วยในศึกได้ เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | Ryujin leaves a flame in the Magic Lamp. You can call the dragon of the waters in battle. You can call him 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |
| `z2b-harbor.js` L29 (`HARBOR_FLAME_NOTICE`) | เหลียนกัง | เหลียนกังฝากไฟไว้ในตะเกียงวิเศษ ท่านเรียกเขาในศึกได้ เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | Lian Gang leaves a flame in the Magic Lamp. You can call him in battle. You can call him 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |
| `z2b-cerberus.js` L116 (`MUSASHI_FLAME_NOTICE`) | มูซาชิ | มูซาชิออกจากทีมเพราะรับปากเหลียนกังว่าจะพาท่านถึงประตูปัจฉิมเท่านั้น เขาฝากไฟไว้ในตะเกียงวิเศษ ท่านเรียกเขาในศึกได้ เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | Musashi leaves the team because he promised Lian Gang only to take you to the western gate. He leaves a flame in the Magic Lamp. You can call him in battle. You can call him 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |
| `z3e-eirlin.js` L29 | เอียร์ลิน | เอียร์ลินฝากไฟไว้ในตะเกียงวิเศษ ท่านเรียกเธอในศึกได้ เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | Eirlin leaves a flame in the Magic Lamp. You can call her in battle. You can call her 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |
| `z3f-severin.js` L52 | ยอร์มุนกันดร์ | ยอร์มุนกันดร์เลือกฝากไฟไว้ในตะเกียงวิเศษ ท่านเรียกเขาในศึกได้ เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | Jörmungandr chooses to leave a flame in the Magic Lamp. You can call him in battle. You can call him 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |
| `z4b-colosseum.js` L66 | ธอร์ | ธอร์ยอมรับเป็นพันธมิตรของท่าน เรียกเขาในศึกได้ เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | Thor accepts you as an ally. You can call him in battle. You can call him 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |
| `z4b-colosseum.js` L68 | ลูซิเฟอร์ | ลูซิเฟอร์รับคำท้าและฝากชื่อไว้ในตะเกียงวิเศษ ท่านเรียกเขาในศึกได้ เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | Lucifer accepts the challenge and leaves his name in the Magic Lamp. You can call him in battle. You can call him 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |
| `z4c-raw.js` L373 `NU-1` (**ไฟล์ generate**) | แพตช์ | แพตช์ฝากหน้ากากไว้ในตะเกียงวิเศษ ท่านเรียกเขาในศึกได้ เรียกได้ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วเติมไฟที่หอส่องกรรม | Patch leaves a mask in the Magic Lamp. You can call him in battle. You can call him 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower. |

(ท้ายประโยคอังกฤษถ้าอ่านซ้ำ "You can call him in battle. You can call him 3 times" ให้ Toby ยุบเป็นประโยคเดียว: "You can call him in battle, 3 times, for 3 turns each time." — เนื้อความเท่ากัน)
**`z4c-raw.js` และ `z4a-raw.js` เป็นไฟล์ที่สคริปต์สร้าง** ("GENERATED … do not edit by hand") → แก้ที่ `scripts/extract-rae-z4b.py` / `extract-rae-z4a.py` ด้วย ไม่งั้นรันสคริปต์ใหม่ข้อความเก่ากลับมา

### ง-3 บทกานต์ (`z1-kan-lamp` · `z1-events.js` L303–304)
| เดิม | ใหม่ |
|---|---|
| กานต์: "ผมไม่ค่อยพูดครับ แต่เรื่องนี้ต้องพูด ตะเกียงนั้นจุดด้วยไฟของคนที่ยอมรับท่าน ไฟแบบนั้นมีจำกัด **ใช้ท่าไม้ตายไปสามครั้งมันก็ริบ**" | กานต์: "ผมไม่ค่อยพูดครับ แต่เรื่องนี้ต้องพูด ตะเกียงนั้นจุดด้วยไฟของคนที่ยอมรับท่าน ไฟแบบนั้นมีจำกัด **เรียกเขามาสามครั้งมันก็ริบ**" |
| กานต์: "**หอกระจก**รับแสงมาเติมให้ได้ครับ ไม่ใช่แค่กระจกวิเศษ ตะเกียงก็เติมได้ นาฬิกาก็เติมได้ถ้าท่านมี ถ้าไฟริบเมื่อไหร่ กลับมาที่นี่" | กานต์: "**หอส่องกรรม**รับแสงมาเติมให้ได้ครับ ไม่ใช่แค่กระจกวิเศษ ตะเกียงก็เติมได้ นาฬิกาก็เติมได้ถ้าท่านมี ถ้าไฟริบเมื่อไหร่ กลับมาที่นี่" |
EN (ไว้อ้างอิง ฉากไทยล้วน): Kan: "…the flame is limited. Call them three times and it dims." / Kan: "The Mirror Tower takes in light and refills them, sir. Not only the Magic Mirror. The lamp too, and the clock if you have it. When the flame dims, come back here."

---

## จ · ข้อความตัวแทน `src/lamp-text.js` (5 ชุด)

| key (บรรทัด) | เดิม (Toby ตัวแทน) | ใหม่ ไทย | ใหม่ อังกฤษ | ใช้ที่ |
|---|---|---|---|---|
| `battle.present` (L43) | `{name} ยืนอยู่ในทีมแล้ว` | `{name} ยังอยู่ในทีม · รอให้ลงมือครบ 3 ตาก่อน จึงเรียกตัวต่อไปได้` | `{name} is still in your team. Wait until they have acted 3 times before calling the next helper.` | เหตุที่ปุ่มเรียกใช้ไม่ได้เมื่อมีผู้ช่วยยืนอยู่ |
| `battle.lampCut` (L44) | `ยามาจุดตะเกียงวิเศษ เรียก{name}ออกมา` | `ยามาจุดตะเกียงวิเศษ · {name}ก้าวออกมาจากแสงไฟ` | `Yama lights the Magic Lamp. {name} steps out of the flame.` | การ์ดเต็มจอ cutscene ตะเกียง (~1.3 วิ) · คู่กับภาพ C4 "ก้าวออกจากแสง" |
| `helper.attack` (L45) | `โจมตี` | `โจมตี` (คงเดิม) | `Attack` (คงเดิม) | ปุ่มในเมนูผู้ช่วย |
| `helper.acts` (L46) | `ลงมือได้อีก {n}/{max} ครั้ง` | `ลงมือได้อีก {n}/{max} ตา` | `{n}/{max} turns left` | หัวเมนูผู้ช่วย + ป้ายเหนือหัว (เปลี่ยน "ครั้ง"→"ตา" ให้ไม่ปนกับ "เรียก 3 ครั้ง") |
| `helper.farewell` (L47) | `{name} กลับเข้าตะเกียง` | `{name} กลับเข้าตะเกียง` (คงเดิม) | `{name} returns to the Lamp` (คงเดิม) | ข้อความหลังครบ 3 ตา |

ตรวจแล้วคีย์เดิมที่ไม่ต้องแก้: `bag.movesLeft` "เรียกได้อีก {n}/3 ครั้ง" · `battle.logCall` · `battle.logOut`

คีย์อื่นใน `lamp-text.js` ที่มี "หอกระจก" → ดูข้อ ฌ

---

## ฉ · tooltip ปุ่มพลัง/ขังไว้ก่อน ในคดีสีดา

| | |
|---|---|
| ไฟล์ · จุด | `src/ui.js` · `STORY_HEARING_LOCKED_NOTE` (ไม่มีเลขบรรทัด) — ใช้กับปุ่ม "พลัง" และ "ขังไว้ก่อน" |
| เดิม | `คดีนี้ใช้ไม่ได้` |
| ใหม่ ไทย | `ใช้ไม่ได้ในคดีนี้` |
| ใหม่ อังกฤษ | `Not available in this case` (หน้าสอบสวนสีดาเป็นไทยล้วน — ใส่ไว้เผื่อเปิดแปล) |

เหตุผล: เรียงแบบเดียวกับข้อความ "ใช้ไม่ได้ · …" ของปุ่มอื่นในเกม และไม่เฉลยว่าเพราะอะไร (ห้ามบอกว่า "เป็นคดีเนื้อเรื่อง" เพราะเปิดเผยพล็อต) · ถ้าคุณเป้ชอบของเดิม คงเดิมได้ ไม่ผิด

---

## ช · หอส่องกรรมเปิด

| key / ที่ | เดิม (Toby ตัวแทน) | ใหม่ ไทย | ใหม่ อังกฤษ |
|---|---|---|---|
| `notice.tower.title` (`lamp-text.js` L82) | หอกระจกเปิดแล้ว | หอส่องกรรมเปิดแล้ว | The Mirror Tower Is Open |
| `notice.tower.text` (L83) | ตอนนี้สร้างหอส่องกรรมได้แล้ว แล้วไปเติมไฟตะเกียงที่หอกระจกได้เลย | ได้ตะเกียงวิเศษแล้ว ตอนนี้สร้างหอส่องกรรมได้ ไว้เติมไฟตะเกียงเมื่อผู้ช่วยถูกเรียกครบ 3 ครั้ง | With the Magic Lamp in hand, you can build the Mirror Tower now. Use it to recharge the Lamp once a helper has been called 3 times. |
| `notice.tower.button` (L84) | รับทราบ | รับทราบ (คงเดิม) | Understood (คงเดิม) |
| `unlock.towerEvent` (ป้ายล็อกบนแผนที่/รายการสร้าง · `i18n.js`) | เปิดหลังจบคดีนางสีดา | เปิดหลังจบคดีนางสีดา (คงเดิม — ชัด สั้น พอดีป้าย) | Opens after Sita's case |
| `unlock.towerWhen` (วงเล็บคู่มือ · `i18n.js`) | สร้างได้หลังจบคดีนางสีดาและหนุมาน | สร้างได้หลังจบเหตุการณ์นางสีดาและหนุมาน (ได้ตะเกียงวิเศษ) | can be built after the Sita and Hanuman event (when you receive the Magic Lamp) |

หมายเหตุ: ป้ายล็อกกับวงเล็บคู่มือไม่ใส่ชื่อ "หอส่องกรรม" ซ้ำ เพราะติดกับชื่ออาคารอยู่แล้ว · ป้ายล็อกพูดแค่ "คดีนางสีดา" ส่วนวงเล็บพูดครบ "นางสีดาและหนุมาน" ตามที่คุณเป้ตัดสิน (ปลดตอนได้ตะเกียง = หลังชนะหนุมาน) — ถ้าต้องการให้ป้ายตรงเป๊ะ เปลี่ยนเป็น `เปิดหลังได้ตะเกียงวิเศษ` / `Opens once you have the Magic Lamp` (ผมแนะนำ เพราะเป็นเงื่อนไขจริงตาม T5 F5 — ให้ Claudy เลือก ข้อ 3 ท้ายไฟล์)

---

## ซ · ได้ตะเกียงแล้วขึ้น 2 หน้าต่างติดกัน → รวมเป็นหน้าต่างเดียว

**ข้อเสนอ: รวมได้ และควรรวม** (สองหน้าต่างเกิดจังหวะเดียวกัน เนื้อหาต่อเนื่อง และปุ่มทั้งสองพาไปที่ตะเกียงเหมือนกัน) → ให้ Toby ใช้หน้าต่าง `lamp-received` อันเดียวในเกมใหม่ แล้วไม่ queue `lamp-tower-open` ในจังหวะนั้น · **เก็บ `lamp-tower-open` ไว้** สำหรับเซฟเก่าที่ถือตะเกียงอยู่แล้วแต่ยังไม่เห็นหน้าต่างหอ (T5 F5 ปลดตอนโหลดแล้วขึ้นครั้งเดียว) — ข้อความ `notice.tower.*` ข้อ ช ใช้กรณีนั้น

**ข้อความรวม** (แทน `notice.received.text`; `notice.received.title`/`button`/`slot` คงเดิม):

| | ไทย | อังกฤษ |
|---|---|---|
| หัวเรื่อง `notice.received.title` | ได้รับ ตะเกียงวิเศษ (คงเดิม) | Magic Lamp Received (คงเดิม) |
| ข้อความ `notice.received.text` | นางสีดามอบตะเกียงวิเศษให้ยามา จุดตะเกียงแล้วเรียกผู้ที่ยอมรับท่านมาสู้ข้างทีมได้ เรียกได้ตนละ 3 ครั้ง ครั้งละ 3 ตา หมดแล้วไปเติมไฟที่หอส่องกรรม ซึ่งสร้างได้แล้วตั้งแต่ตอนนี้ | Lady Sita has given Yama the Magic Lamp. Light it to call those who accepted you to fight at your side. Each can be called 3 times, for 3 turns each time. When the flames run out, recharge at the Mirror Tower, which you can build from now on. |
| ต่อท้ายอัตโนมัติ `notice.received.slot` (คงเดิม) | ` · ตอนนี้ใส่ผู้ช่วยได้ 1 ตน มี หนุมาน อยู่ในตะเกียง` | ` The Lamp holds 1 helper for now, and Hanuman is already inside it.` |
| ปุ่ม `notice.received.button` | ดูตะเกียง (คงเดิม) | See the Lamp (คงเดิม) |

ข้อสังเกต: อังกฤษมีสองประโยคท้ายที่ขึ้นต้นด้วย "Each can be…" แล้วต่อด้วย slot — อ่านได้ ไม่ซ้ำคำ

---

## ฌ · "หอกระจก" → "หอส่องกรรม" ทุกจุดที่ผู้เล่นเห็น

กติกา: แทนที่ **เฉพาะคำว่า หอกระจก → หอส่องกรรม** ส่วนอื่นของประโยคคงเดิม (ที่ต้องปรับตามระบบใหม่อยู่ในข้อ ง แล้ว) · อังกฤษ "Mirror Tower" คงเดิมทุกจุด · comment ในโค้ดไม่ต้องแก้

| # | ไฟล์ · บรรทัด · key | เดิม → ใหม่ (ไทย) |
|---|---|---|
| 1 | `lamp-text.js` L14 `state.spent` | พลังหมด · เติมที่**หอกระจก** → พลังหมด · เติมที่**หอส่องกรรม** |
| 2 | L16 `state.partial` | เหลือ {n}/{max} · เติมที่หอกระจก → …หอส่องกรรม |
| 3 | L22 `bag.note` | (แก้ทั้งข้อความใน ง-1) |
| 4 | L24 `bag.locked` | ล็อก · เล่นมินิเกมที่หอกระจกโซน {n} → ล็อก · เล่นมินิเกมที่หอส่องกรรมโซน {n} |
| 5 | L32 `bag.low` | ไฟในตะเกียงริบหรี่ · เติมพลังที่หอกระจก → …หอส่องกรรม |
| 6 | L41 `battle.helperSpent` | {name}: เรียกครบ 3 ครั้งแล้ว · เติมพลังที่หอกระจก → …หอส่องกรรม |
| 7 | L48 `battle.allSpent` | ไฟในตะเกียงริบหรี่ · ไปเติมพลังที่หอกระจก → …หอส่องกรรม |
| 8 | L56 `tower.note` | แสงจากหอกระจกเติมพลังให้ของวิเศษทั้งสามชิ้น → แสงจากหอส่องกรรมเติมพลังให้ของวิเศษทั้งสามชิ้น |
| 9 | L68 `tower.upAlready` | หอกระจกแห่งนี้ยกระดับตะเกียงไปแล้ว → หอส่องกรรมแห่งนี้ยกระดับตะเกียงไปแล้ว |
| 10 | L73 `notice.received.text` | (แก้ใน ง-1 / ซ) |
| 11 | L79 `notice.low.text` | (แก้ใน ง-1) |
| 12–13 | L82–83 `notice.tower.title/text` | (แก้ใน ช) |
| 14 | `z1-events.js` L304 บทกานต์ | (แก้ใน ง-3) |
| 15 | `z2-gate.js` L34 | (ง-2) |
| 16 | `z2b-ryujin.js` L20 | (ง-2) |
| 17 | `z2b-harbor.js` L29 | (ง-2) |
| 18 | `z2b-cerberus.js` L116 | (ง-2) |
| 19 | `z3e-eirlin.js` L29 | (ง-2) |
| 20 | `z3f-severin.js` L52 | (ง-2) |
| 21–22 | `z4b-colosseum.js` L66, L68 | (ง-2) |
| 23 | `z4c-raw.js` L373 (generate) | (ง-2) |
| 24 | `z4a-border.js` L20 `z4-clock` | ท่านได้นาฬิกาวิเศษ ใช้คืนคูลดาวน์ให้ทีมกลางศึก เมื่อพลังหมดให้ไปเติมที่**หอกระจก** (รายละเอียดตามรางวัล cooldownClock เดิม) → …เติมที่**หอส่องกรรม** (รายละเอียดตามรางวัล cooldownClock เดิม) — ⚠ วงเล็บ "(รายละเอียดตามรางวัล cooldownClock เดิม)" เป็นข้อความช่างเทคนิคหลุดมาถึงผู้เล่น ขอตัดทิ้ง: ใหม่ ไทย = `ท่านได้นาฬิกาวิเศษ ใช้คืนคูลดาวน์ให้ทีมกลางศึก เมื่อพลังหมดให้ไปเติมที่หอส่องกรรม` / อังกฤษ = `You have received the Magic Clock. It returns the team's cooldowns mid-battle. When its power is spent, recharge it at the Mirror Tower.` |
| 25 | `z4a-raw.js` L137 ลูเมน-01 `z4-lumen-win` (generate · `extract-rae-z4a.py`) | ลูเมน-01: "นาฬิกานี้ย้อนเวลาของพลังที่ถูกใช้ไปแล้ว เมื่อพลังหมดต้องไปเติมที่**หอกระจก** ข้าไม่ให้ใครง่าย ๆ" → …เติมที่**หอส่องกรรม** ข้าไม่ให้ใครง่าย ๆ" |
| 26 | `z4a-raw.js` L137 (บรรทัดเดียวกัน อังกฤษ L142) | อังกฤษมี Mirror Tower อยู่แล้ว ไม่แก้ |
| 27 | `data.js` L287 desc ของสถานี `krajok` | หอกระจกริมแม่น้ำวิญญาณ — วางกระจกสะท้อนแสงเพื่อเติมกระจกวิเศษเป็นระยะ → **หอส่องกรรม**ริมแม่น้ำวิญญาณ — วางกระจกสะท้อนแสงเพื่อเติมกระจกวิเศษเป็นระยะ |
| 28 | `liberation-text.js` / `z4g-return.js` / `z1-events.js` L229–232 | ตรวจแล้ว ไม่มี "หอกระจก" |

(ตัวนับ 27–28 จุดตรงกับที่ Claudy ประมาณ ~27 · ยังไม่รับรองครบ ดูหัวไฟล์)

---

## ญ · ศึกปลดปล่อย (`src/liberation-text.js` + `src/z4g-return.js`)

### ญ-1 ฉากนิราปลดปล่อย Guard (`guardFreedStory` · `z4g-return.js` L33–34 · 3 โซน ใช้แม่แบบเดียว `${name}` = กุมภัณฑ์ / กวนอู / แวน เฮลซิง)
ปรับของ Toby ให้สั้นลง และ **ไม่ให้ Guard พูด "ข้าจะไปกับท่าน" ซ้ำ** (ย้ายไปบรรทัดท้ายฉากเมืองไหม้ ข้อ ญ-2 ตามที่ใบงานกำหนดไว้)

| | ไทย | อังกฤษ |
|---|---|---|
| หัวฉาก `title` | `นิราปลดสะกด · ${name.th}` (คงเดิม) | `Nira Breaks the Spell · ${name.en}` (คงเดิม) |
| บรรทัด `line` | บรรยาย: ${name.th}ทรุดเข่าลงกลางประตู แสงเขียวในตายังวูบวาบ นิราก้าวออกมา ยกแผ่นกระจกขึ้นเหนือไหล่เขา เส้นแสงเขียวที่พาดตาแตกเป็นเสี่ยง แล้วจางหายไป<br>นิรา: "ปลดแล้วค่ะ คำสั่งนั้นไม่ใช่ของท่านอีกต่อไป"<br>${name.th}: "ข้า... กลับมาเป็นตัวข้าแล้ว ขอบคุณ" | Narration: ${name.en} sinks to one knee in the gateway, the green light in his eyes still flickering. Nira steps forward and raises her mirror over his shoulder. The green line across his eyes shatters and fades.<br>Nira: "It is broken. That order is no longer yours."<br>${name.en}: "I... am myself again. Thank you." |

### ญ-2 บรรทัดท้ายฉากเมืองไหม้ของ Guard (`GUARD_RELEASE` · `z4g-return.js` L24–29 · แทนบรรทัดสุดท้ายของ `zN-fire`)
เดิมของ Toby ยาว/ซ้ำคำขอบคุณ จึงตัดให้ตรงประเด็น: ขอบคุณสั้น ๆ + บอกว่ายมทูตกับหัวหน้าด่านยังถูกสะกด + "ข้าจะไปกับท่าน" · คงบุคลิกเดิมของแต่ละคน

| โซน | ไทย | อังกฤษ |
|---|---|---|
| th | กุมภัณฑ์: "ข้าได้ถือกระบองด้วยใจข้าเองอีกครั้งแล้ว ขอบคุณท่านนิรา ยมทูตกับหัวหน้าด่านยังถูกสะกดอยู่ ข้าจะไปกับท่าน ช่วยปลดพวกเขาเอง" | Kumphan: "I hold my club by my own will again. Thank you, Nira. The reapers and the frontier boss are still under the spell. I am going with you to free them." |
| asia | กวนอู: "เสียงนั้นเงียบแล้ว ข้าติดค้างท่านหนึ่งชีวิต ยมทูตกับหัวหน้าด่านยังถูกสะกดอยู่ ข้าจะไปกับท่าน" | Guan Yu: "That voice is silent. I owe you a life. The reapers and the frontier boss are still under the spell. I am going with you." |
| west | แวน เฮลซิง: "เสียงในหัวข้าเงียบแล้ว ขอบคุณ ยมทูตทั้งห้ากับหัวหน้าด่านยังอยู่ใต้คำสั่งนั้น ข้าจะไปกับท่านและช่วยปลดพวกเขาเอง" | Van Helsing: "The voice in my head is silent. Thank you. The five reapers and the frontier boss are still under that order. I will go with you and help free them." |

ให้ Toby ตรวจว่าบรรทัดอื่นในฉาก `zN-fire` (เนื้อ Rae เดิม `z4g-raw.js`) ไม่ได้บอกว่า Guard "ยืนเฝ้าประตู/อยู่ที่นี่" ก่อนบรรทัดสุดท้าย — ผมไม่ได้เปิด `z4g-raw.js` (ข้อ 4 ท้ายไฟล์)

### ญ-3 ป้ายทีมบังคับ (`liberation-text.js` L5–9)
| key | เดิม | ใหม่ ไทย | ใหม่ อังกฤษ |
|---|---|---|---|
| `team.forcedHead` | ทีมบังคับ / Fixed team | ทีมบังคับ (คงเดิม) | Fixed team (คงเดิม) |
| `team.duel` | ที่ประตู ไปได้แค่ ยามา กับ นิรา | ที่ประตู มีเพียงยามากับนิราที่เข้าไปได้ | Only Yama and Nira can go in at the gate |
| `team.lord` | ยามา · นิรา · {guard} (ที่เพิ่งปลดสะกด) | ยามา · นิรา · {guard} (เพิ่งได้รับการปลดสะกด) | Yama · Nira · {guard} (freed from the spell) |
| `team.lockedReason` | ถูกสะกดอยู่ เข้าทีมไม่ได้ | ถูกสะกดอยู่ จึงเข้าทีมไม่ได้ | Under the spell · cannot join |
| `team.lockedAll` | ยมทูตทุกคนในเมืองถูกสะกดอยู่ จึงเข้าทีมไม่ได้ | ยมทูตทุกคนในเมืองถูกสะกดอยู่ จึงเข้าทีมไม่ได้ (คงเดิม) | Every reaper in the city is under the spell and cannot join (คงเดิม) |

(หน้าต่าง "ปลดสะกด <Guard>" และฉาก `zN-guard-signal` / `guardStory` ผมอ่านแล้วตรงกติกา ไม่ต้องแก้ — "ผมจะหยุดเขา แล้วพาเขากลับมาครับ" ตรงกับขั้นตอนใหม่พอดี)

---

## ฎ · หน้าต่าง "สร้าง<อาคาร>ได้แล้ว" + มินิเกมลูกไฟ

### ฎ-1 `build-open-<k>` (`z1-events.js` L198–207 `buildOpenNotices` · 5 อาคาร: ป่าดาบ ประตูสวรรค์ ดงงิ้ว ลานตรากตรำ โลกันตนรก)
| ส่วน | เดิม (Toby ตัวแทน) | ใหม่ ไทย | ใหม่ อังกฤษ |
|---|---|---|---|
| title | สร้าง{ชื่ออาคาร}ได้แล้ว | สร้าง{ชื่ออาคาร}ได้แล้ว (คงเดิม) | You can build {the building} now (คงเดิม) |
| text | ยามาเลื่อนขั้นแล้ว ตอนนี้สร้าง{ชื่อ}ได้ · เดินไปที่ป้ายก่อสร้างบนแผนที่ แล้วกดสร้าง | ยามาเลื่อนขั้นแล้ว ตอนนี้สร้าง{ชื่อ}ได้ เดินไปที่ป้ายก่อสร้างบนแผนที่แล้วกดสร้างได้เลย | Yama has risen in rank, and {the building} can now be built. Walk to its building spot on the map and press build. |
| button | รับทราบ | รับทราบ (คงเดิม) | Understood (คงเดิม) |

ชื่ออาคาร (ภาษาอังกฤษ — ตัวแทนของ Toby `BUILD_NAME_EN` ผมเห็นด้วย ยกเว้นข้อเดียว):
| `k` | ไทย (จาก `STATIONS`) | อังกฤษ |
|---|---|---|
| `dab` | ป่าดาบอสิปัตตะ | the Sword Forest |
| `sawan` | ประตูสวรรค์ | the Gate of Heaven |
| `ngiw` | ดงต้นงิ้ว | the Silk-Cotton Grove |
| `lan` | ลานตรากตรำ | the Toil Yard |
| `lokan` | โลกันตนรก | Lokantara Hell |

⚠ ผมไม่เห็นว่าเกมมีชื่อสถานีอังกฤษอยู่ที่อื่นแล้วหรือยัง (`i18n.js` ไม่ได้เปิด) — **ถ้ามีอยู่แล้วให้ใช้ชื่อเดิมของเกม** อย่าใช้ตารางนี้ซ้อน (ข้อ 5 ท้ายไฟล์) · ชื่อไทยของ `dab` ผมอ่านจากภาพคู่มือคุณเป้ ("ป่าดาบอสิปัตตะ") ถ้า `def.name` ใน `data.js` สั้นกว่านั้น ใช้ค่าจาก `def.name` ตามที่โค้ดดึงอยู่แล้ว

### ฎ-2 มินิเกมลูกไฟ
| key (`i18n.js`) | เดิม (Toby ตัวแทน) | ใหม่ ไทย | ใหม่ อังกฤษ |
|---|---|---|---|
| `g5.far` | ยังไกลอยู่ · ไม่นับพลาด | ยังไกลอยู่ · ไม่นับพลาด (คงเดิม) | Still far · no penalty |
| `g5.hintIdle` | …นับตอนกดลง ไม่ต้องรอปล่อยนิ้ว · กดไกลเกินไปไม่นับพลาด | กดตอนวงขาวทับวงเขียว · นับตอนกดลง ไม่ต้องรอปล่อยนิ้ว · กดตอนวงยังไกลไม่นับพลาด · โดน 5 ครั้งชนะ พลาด 3 ครั้งแพ้ | Press when the white ring lands on the green one. It counts the moment you press down, so no need to release. Pressing while the ring is still far costs nothing. 5 hits win, 3 misses lose. |

⚠ `g5.hintIdle` เดิมในโค้ดมีข้อความนำที่ผมไม่เห็น (Toby ใส่ "…") ผมเขียนทั้งประโยคใหม่ให้ครบกติกา (5 โดนชนะ / 3 พลาดแพ้ ตามรายงาน T6) — Toby แทนทั้งค่าเดิม ถ้ากรอบข้อความแคบให้ตัดท่อนท้าย "โดน 5 ครั้ง…" ออกได้

---

## ฏ · โรงอาหาร (T7)

| key / ที่ | เดิม (Toby ตัวแทน) | ใหม่ ไทย | ใหม่ อังกฤษ |
|---|---|---|---|
| `canteen.help` (`i18n.js` · ตัวแปร `{sec}` `{batch}` `{price}` `{cap}` **คงไว้ครบ**) | พ่อครัวทำข้าวปั้นเข้าคลังเสบียงเองทุก {sec} วินาที ครั้งละ {batch} ห่อ ค่าวัตถุดิบ {price} เบี้ยกรรม (คลังเต็ม {cap} ห่อแล้วหยุดรอ) · แล้วปั้นข้าวขึ้นชั้นพร้อมเสิร์ฟทุก 3 วินาที · คนเสิร์ฟเดินไปส่งถึงตัว ยิ่งมีหลายคนยิ่งส่งทัน · ซื้อจากพ่อค้าได้ถ้าอยากเร่ง | พ่อครัวปั้นข้าวเข้าคลังเสบียงเองทุก {sec} วินาที ได้ครั้งละ {batch} ห่อ ค่าวัตถุดิบ {price} เบี้ยกรรม (คลังเต็ม {cap} ห่อจะหยุดรอ) · ข้าวในคลังจะขึ้นชั้นพร้อมเสิร์ฟทุก 3 วินาที · คนเสิร์ฟเดินไปส่งถึงตัวคน ยิ่งมีคนเสิร์ฟมากยิ่งส่งทัน · อยากเร่งก็ซื้อเพิ่มจากพ่อค้าได้ | Cooks make rice balls for the shared pantry on their own: {batch} every {sec} seconds, for {price} karma coins of ingredients (they pause when the pantry holds {cap}). Rice from the pantry goes onto the serving shelf every 3 seconds. Servers walk each rice ball to the person who needs it, so more servers means faster service. You can still buy from the merchant to speed things up. |
| เหตุผลพ่อครัวรอ (`canteen.js` · ไทยอย่างเดียวตามข้อความเหตุผลคนงานอื่น) | ไม่มีเบี้ยซื้อวัตถุดิบ | เบี้ยไม่พอซื้อวัตถุดิบ | Not enough coins for ingredients (ไว้อ้างอิง) |
| `canteen.help.foreman` · `foreman.canteen.go` | — | ไม่ใช้แล้ว ไม่ต้องเขียน | — |

เหตุผลเปลี่ยน "ไม่มีเบี้ย…" → "เบี้ยไม่พอ…": พ่อครัวอาจมีเบี้ยเหลือแต่ไม่ถึง {price} — "ไม่พอ" ตรงกว่า "ไม่มี" · ถ้าคุณเป้/Claudy ชอบของเดิม คงเดิมได้

---

## MN1 · คู่มือวิธีเล่น (แท็บ "วิธีเล่น")

ฐาน: ข้อความของคุณเป้ในภาพ `Comment10-1.jpg` / `Comment10-2.jpg` — **ผมปรับเฉพาะ** (ก) แก้พิมพ์ผิด "กาญ" → **กานต์** (ชื่อจริงในเกม `kan.name`) / "มีจะ" → "จะ" / "ให้ กาญ ช่วยใช้พลัง" จัดวรรคใหม่ (ข) ตัดคำซ้ำ จัดวรรคให้พอดีกล่อง (ค) ใส่คำอังกฤษ (ง) เพิ่มสีเขียว + หน้าใหม่ตามที่คุณเป้อนุญาต ("ลักษณะสีวิญญาณที่ขาด และข้ออื่นๆ ใส่เพิ่มได้") · ตัวเลขตัวอย่างทั้งหมดใช้ของคุณเป้ตรงตัว
**ทุกกล่องมีหัวข้อ + เนื้อหา "คู่กับภาพไหน"** (ซ้ายข้อความ ขวาภาพ ตามโครงเดิม) · ภาพ "คู่กับ" ให้ Toby/T8 แคปจากเกมจริง ณ สถานการณ์ตัวอย่างเดียวกับคุณเป้ (คดีขับรถชนแล้วหนี)

### หน้า 1 (ตามภาพ Comment10-1)

**กล่อง 1 — หัวข้อ: `1. เลือกประเด็นที่จะสอบสวน` / `1. Choose what to question`** · คู่กับภาพจอสอบสวนขวาบน จุดหมายเลข **1** (ข้ออ้างของเขา) และ **2** (สำนวนที่นิราอ่านให้ฟัง)
| | ไทย | อังกฤษ |
|---|---|---|
| ข้อ | – เลือกหัวข้อที่ดูน่าสงสัยว่าน่าจะโกหก<br>– ใช้พลัง ข่มขู่ · กระจกวิเศษ · สะกดจิต เพื่อเปิดเผยความจริง<br>– ให้กานต์ช่วยใช้พลังเปิดความจริง | – Pick the statement that looks like a lie.<br>– Use your powers (Intimidate, Magic Mirror, Hypnosis) to bring out the truth.<br>– Ask Kan to help open the truth. |
| ตัวหนา | **สำนวนที่ถูกปกปิดไว้ จะเปิดเผยขึ้นมา** | **What was hidden in the file will come to light.** |

**กล่อง 2 — หัวข้อ: `2. บาปไหน ลงทัณฑ์ที่ไหน` / `2. Which sin, which place`** · คู่กับภาพเดียวกัน จุดหมายเลข **2** (รายการบาปในสำนวน) + แถบสี 6 ช่อง (ภาพชิป แดง=5 … เทา=0 ตามโครงเดิมของคุณเป้)
| | ไทย | อังกฤษ |
|---|---|---|
| บน | อ่านจากสำนวนว่า เป็นบาปชนิดไหน และบาปไหนแรงที่สุด เช่น | Read the file to see what kind of sin each one is, and which is the heaviest. For example: |
| ชิป | แดง = 5 · ส้ม = 4 · เหลือง = 3 · เขียว = 2 · ขาว = 1 · เทา = 0 | Red = 5 · Orange = 4 · Yellow = 3 · Green = 2 · White = 1 · Grey = 0 |
| กลาง | เลือกบาปจากสีที่มีคะแนนมากที่สุด ในรูปคือ <span แดง>ฆ่า/ทำร้าย ขับรถชนแล้วหนี ทิ้งคนเจ็บไว้กลางถนน</span> | Choose the sin whose colour scores highest. In the picture it is <red>Killing/Harming: hit-and-run, leaving the injured in the road</red>. |
| ท้าย | บาปนี้สีแดง ได้คะแนนสูงสุดในบาปที่ทำ ชนิดบาปคือ <span แดง>ฆ่า/ทำร้าย</span> | This sin is red, the highest score of everything he did. Its type is <red>Killing/Harming</red>. |

**กล่อง 3 — หัวข้อ: `3. ลงทัณฑ์ที่ไหน` / `3. Where to send them`** · คู่กับภาพจอสอบสวน จุดหมายเลข **3** (กล่อง พลัง/ที่ไหน/ใครคุม/ระดับทัณฑ์/ออกหมาย) + การ์ดสถานี 5 ใบ (ใช้ภาพ `img/` ของสถานีจริงตามโครงเดิม · ใบ "ป่าดาบอสิปัตตะ" ใส่กรอบทอง)
| | ไทย | อังกฤษ |
|---|---|---|
| บรรทัดนำ | ชนิดบาป <span แดง>ฆ่า/ทำร้าย</span> | Sin type: <red>Killing/Harming</red> |
| การ์ด 1 | กระทะทองแดง · ฉ้อโกง / มัวเมา | The Copper Cauldron · Fraud / Intoxication |
| การ์ด 2 (เน้น) | ป่าดาบอสิปัตตะ · ฆ่า/ทำร้าย / วจีทุจริต | The Sword Forest · Killing/Harming / Wrongful Speech |
| การ์ด 3 | โลกันตนรก · อกตัญญู | Lokantara Hell · Ingratitude |
| การ์ด 4 | ดงต้นงิ้ว · ผิดกาม | The Silk-Cotton Grove · Sexual Misconduct |
| การ์ด 5 | ลานตรากตรำ · เบียดเบียน | The Toil Yard · Oppression |
| ท้ายกล่อง (เพิ่ม) | จับคู่ชนิดบาปกับสถานีที่ตรงกรรม แล้วกด "ออกหมาย" | Match the sin type to its station, then press "Issue the Writ". |

ชื่ออังกฤษของชนิดบาป/สถานี: ตัวแทนของผม — ใช้ชื่อเดิมของเกมถ้ามีใน `i18n.js` (ข้อ 5 ท้ายไฟล์) · ชื่อสถานีตรงกับคู่มือคุณเป้ ("กระทะทองแดง" ฯลฯ) ส่วน "กระทะทองแดง = ฉ้อโกง/มัวเมา" ตรง `data.js` (`krata` `tags:['kong','mao']`)

### หน้า 2 (ตามภาพ Comment10-2)

**กล่อง 4 — หัวข้อ: `4. เลือกผู้คุม ตามสีของวิญญาณ` / `4. Pick a keeper by the spirit's colour`** · คู่กับภาพจอสอบสวนขวาบน จุดหมายเลข **4** (ชื่อ+ไอคอนวิญญาณ) + รูปโปรไฟล์ **กานต์** และ **เพลิง** ตามโครงเดิม · **เพิ่ม รูปโปรไฟล์ "บุญ" สำหรับสีเขียว** (ใช้ `crew-boon-profile` หรือไฟล์ที่เกมใช้ในหน้าเลือกผู้คุม — Toby ยืนยันชื่อไฟล์)
| ส่วน | ไทย | อังกฤษ |
|---|---|---|
| นำ | สีของชื่อวิญญาณและไอคอน จะบ่งบอกถึงลักษณะนิสัยของวิญญาณ (บอกนิสัย ไม่ได้บอกว่าผิดมากหรือน้อย) | The colour of a spirit's name and icon shows its nature. It shows how they behave, not how guilty they are. |
| ม่วง (หัวข้อ สีม่วง) | **🧿 สีม่วง – นิสัย ปิดบังความจริง** | **🧿 Purple – hides the truth** |
| ม่วง เนื้อ | มีสัญญาณว่าจะพูดไม่หมด แต่งเรื่องขึ้น มีความลับซ่อนอยู่ หรือซ่อนกรรมหนักไว้ในสำนวน | Signs: tells only half, makes things up, keeps a secret, or hides a heavy sin in the file. |
| ม่วง ผู้คุม | ผู้คุมที่เหมาะ : **กานต์** มีพลังช่วยเปิดข้อเท็จจริงที่ซ่อนอยู่ เปิดความจริงในสำนวนให้ 1 ประเด็นก่อนออกหมาย รวมถึงเหตุบรรเทาโทษ | Best keeper: **Kan** can open one hidden fact in the file before you issue the writ, including mitigating reasons. |
| แดง (หัวข้อ สีแดง) | **🔥 สีแดง – นิสัย ดื้อและต่อต้าน** | **🔥 Red – stubborn and defiant** |
| แดง เนื้อ | มีสัญญาณว่าจะขัดขืนไม่ยอมรับคำตัดสิน หรือปฏิเสธเสียงแข็งในข้อหาที่หนักที่สุด | Signs: will resist the verdict, or flatly deny the heaviest charge. |
| แดง ผู้คุม | ผู้คุมที่เหมาะ : **เพลิง** คุมวิญญาณต่อต้านได้โดยไม่เสียเวลาจากการขัดขืน แลกกับเสียเสบียงเพิ่ม 2 ห่อต่อ 1 หมาย | Best keeper: **Plerng** controls a defiant spirit without losing time to resistance, at the cost of 2 extra rice balls per writ. |
| **เขียว (เพิ่ม)** หัวข้อ | **🍃 สีเขียว – นิสัย ยอมรับและพร้อมแก้ไข** | **🍃 Green – accepting and ready to make amends** |
| เขียว เนื้อ | ฟังคำตัดสินอย่างสงบ ไม่ปิดบัง ไม่ต่อต้าน | Signs: takes the verdict calmly, hides nothing, does not resist. |
| เขียว ผู้คุม | ผู้คุมที่เหมาะ : **บุญ** ชำระกรรมให้ หากตัดสินถูกและงานลงทัณฑ์จบ กรรมของยามาลด 1 แลกกับใช้เวลาลงทัณฑ์เพิ่ม 20% | Best keeper: **Boon** cleanses karma. If you judged rightly and the punishment finishes, Yama's karma drops by 1, at the cost of 20% more punishment time. |

(ข้อมูลของบุญ/เพลิง/กานต์ อ่านจาก `interrogation.js` `traits` + `roles` — ตัวเลข 2 ห่อ / −1 / 20% ตรงโค้ด)

**กล่อง 5 — หัวข้อ: `5. อ่านค่าสีในสำนวน และคำนวณระดับทัณฑ์` / `5. Read the colours and work out the punishment level`** · คู่กับภาพจอสอบสวนขวาบน จุดหมายเลข **5** (รายการบาป/บุญ/เหตุบรรเทาโทษที่มีสีต่างกัน) + แถบสี 6 ช่องตามโครงเดิม
| | ไทย | อังกฤษ |
|---|---|---|
| นำ | ดูสีของข้อความกรรม บุญ และเหตุบรรเทาโทษ เพื่อแทนจำนวนตัวเลข | Read the colour of each sin, merit and mitigating reason in place of a number. |
| ชิป | แดง = 5 · ส้ม = 4 · เหลือง = 3 · เขียว = 2 · ขาว = 1 · เทา = 0 | Red = 5 · Orange = 4 · Yellow = 3 · Green = 2 · White = 1 · Grey = 0 |
| สูตร | วิธีคำนวณ : กรรมหนักสุด − บุญจริงรวม − เหตุบรรเทาโทษรวม = ระดับความแรงของทัณฑ์ | How to work it out: heaviest sin − total real merit − total mitigating reasons = punishment level. |
| ตัวอย่าง | ในรูปตัวอย่าง กรรมหนักสุด <red>ขับรถชนแล้วหนี ทิ้งคนเจ็บไว้กลางถนน = 5</red><br>บุญ <green>บริจาคเลือดครบ 40 ครั้ง = 2</green> / เหตุบรรเทาโทษ ไม่มี = 0<br>ระดับทัณฑ์ = <red>5</red> − <green>2</green> = 3 | In the example: heaviest sin <red>hit-and-run, leaving the injured in the road = 5</red><br>Merit <green>gave blood 40 times = 2</green> / mitigating reasons: none = 0<br>Punishment level = <red>5</red> − <green>2</green> = 3 |
| เพิ่ม (หมายเหตุ) | บุญที่มีป้าย (ไม่นับ) ไม่ถูกนำมาหัก | Merits marked (Not counted) are not subtracted. |

### หน้า 3 (ใหม่ — ผู้คุมที่ไม่ผูกกับสี + ข้ออ้างที่ไม่นับ)

**กล่อง 6 — `6. ผู้คุมที่ไม่ผูกกับสี` / `6. Keepers not tied to a colour`** · คู่กับภาพหน้าเลือกผู้คุม (ชิปผู้คุมทั้งแถว) แคปจากเกม · เห็นได้ตั้งแต่เริ่ม
| ไทย | อังกฤษ |
|---|---|
| ผู้คุมบางคนใช้ได้กับวิญญาณทุกสี<br>**ทัณฑ์** คุมงานเป็นระเบียบ หากตัดสินถูกและงานลงทัณฑ์จบ ระเบียบเมือง +2 แต่ต้องคุมจนจบ จึงไม่ว่างไปสร้างหรือซ่อมอาคาร<br>**ดำ** คุมงานหมู่ เมื่อมีคนงานมาช่วยถึงสถานีและมีวิญญาณอย่างน้อย 2 ดวง งานคุมเร็วขึ้น 25% | Some keepers suit every colour.<br>**Tan** keeps order: if you judged rightly and the punishment finishes, city order +2, but he must stay until the end, so he cannot build or repair.<br>**Dam** handles crowds: with a worker helping at the station and at least 2 spirits, the work goes 25% faster. |

**กล่อง 7 — `7. ข้ออ้างที่ไม่นับ (ไม่นับ)` / `7. Claims that do not count (Not counted)`** · คู่กับภาพการ์ดสำนวนหลังเปิดโปงข้ออวดบุญ ที่มีป้าย (ไม่นับ) ต่อท้ายบุญ (แคปจากคดีนักการเมือง "ตั้งกองทุนช่วยเด็กยากไร้…") · เห็นได้ตั้งแต่เริ่ม
| ไทย | อังกฤษ |
|---|---|
| วิญญาณบางดวงอ้างบุญที่ไม่จริง หรือไม่นับเป็นบุญ<br>ข้อที่ไม่นับยังอยู่ในสำนวน แต่เมื่อความจริงเปิดเผย จะมีป้าย **(ไม่นับ)** ต่อท้าย และไม่ถูกนำไปหักระดับทัณฑ์<br>ป้ายขึ้นหลังรู้ความจริงเท่านั้น: เมื่อกดข้ออวดบุญ ใช้กระจกหรือสะกดจิต ให้กานต์ช่วย หรือปิดคดีแล้ว | Some spirits claim merits that are false, or that are not merits at all.<br>Those claims stay in the file, but once the truth is out they are marked **(Not counted)** and are not subtracted from the punishment level.<br>The mark appears only after you find out: by pressing the boast, using the mirror or hypnosis, asking Kan, or closing the case. |

### หน้า 4 (ใหม่ — ตะเกียงวิเศษ + หอส่องกรรม) · **แนะนำให้ล็อกจนได้ตะเกียง**

**กล่อง 8 — `8. ตะเกียงวิเศษ` / `8. The Magic Lamp`** · คู่กับภาพหน้าต่างอัญเชิญในศึก (เปลวไฟ 3 ดวง + รายชื่อผู้ช่วย) และภาพผู้ช่วยยืนในทีมพร้อมเมนู "โจมตี" แคปจากเกม
| ไทย | อังกฤษ |
|---|---|
| ได้จากนางสีดาหลังชนะหนุมาน ใช้เรียกผู้ที่ยอมรับท่านมาช่วยในศึก ปุ่ม "อัญเชิญ" อยู่ในเมนูศึก<br>– เรียกผู้ช่วยได้ตนละ 3 ครั้ง<br>– ทุกครั้ง ผู้ช่วยยืนอยู่ในทีม และสั่งโจมตีได้ 3 ตา แล้วกลับเข้าตะเกียง<br>– เรียกครบแล้ว ต้องไปเติมไฟที่หอส่องกรรม | Given by Lady Sita after you beat Hanuman. Use it to call those who accepted you into battle. The "Summon" button is in the battle menu.<br>– Each helper can be called 3 times.<br>– Every time, the helper stands in your team and can act for 3 turns before returning to the Lamp.<br>– When the calls are spent, recharge at the Mirror Tower. |

**กล่อง 9 — `9. หอส่องกรรม` / `9. The Mirror Tower`** · คู่กับภาพหอส่องกรรมบนแผนที่ + หน้าต่าง "เติมพลังของวิเศษ" แคปจากเกม
| ไทย | อังกฤษ |
|---|---|
| สร้างได้หลังจบเหตุการณ์นางสีดาและหนุมาน (ได้ตะเกียงวิเศษ) เดินเข้าไปเติมพลังให้ของวิเศษทั้งสามชิ้น: กระจกวิเศษ ตะเกียงวิเศษ และนาฬิกาวิเศษ (เมื่อได้รับแล้ว) | Can be built after the Sita and Hanuman event, when you receive the Magic Lamp. Go in to recharge all three treasures: the Magic Mirror, the Magic Lamp and the Magic Clock (once you have it). |

### หน้า 5 (ใหม่ — เมืองถูกยึด) · **แนะนำให้ล็อกจนเกิดเหตุการณ์ (กันสปอยล์)**

**กล่อง 10 — `10. เมื่อเมืองถูกยึด` / `10. When a city is seized`** · คู่กับภาพหน้าต่าง "ทีมบังคับ" + ภาพ Guard ตาเขียวบนแผนที่ แคปจากเกม
| ไทย | อังกฤษ |
|---|---|
| เมื่อโซนใดถูกยึด ท่าเรือจะปิด และยมทูตในเมืองถูกสะกด เข้าทีมไม่ได้<br>1. ที่ประตูโซน ไปได้เฉพาะยามากับนิรา สู้ผู้เฝ้าด่านที่ถูกสะกด<br>2. ชนะแล้ว นิราปลดสะกด ผู้เฝ้าด่านเข้าทีม<br>3. ไปสู้ยมทูตที่ถูกสะกดและบอสชายแดนต่อ<br>4. ชนะแล้วท่าเรือของโซนนั้นเปิดอีกครั้ง | When a zone is seized, its harbour closes and the reapers in town are under the spell and cannot join you.<br>1. At the zone's gate only Yama and Nira can go. Fight the spellbound gate guard.<br>2. Win, and Nira breaks the spell. The guard joins your team.<br>3. Go on to fight the spellbound reapers and the frontier boss.<br>4. Win, and the zone's harbour opens again. |

**ข้อความช่องล็อกของหน้า 4–5** (ใช้รูปแบบเดียวกับ `bag.unmet`): ไทย `??? · ยังไม่ได้พบ` / อังกฤษ `??? · not yet met` · คำใต้หัวข้อที่ล็อก ไทย `หัวข้อนี้เปิดเมื่อเล่นถึงเนื้อเรื่อง` / อังกฤษ `This topic opens as the story reaches it`

### แผนผัง "กล่อง ↔ ภาพ" สรุป (ให้ Toby/T8)
| หน้า | กล่อง | ภาพคู่ | หมายเหตุ |
|---|---|---|---|
| 1 | 1 | จอสอบสวนขวาบน (callout 1 + 2) | แคปเดียวใช้ร่วมกล่อง 1–3 ได้ |
| 1 | 2 | จอเดียวกัน (callout 2) + ชิปสี | ชิปสีเป็นองค์ประกอบ UI ไม่ใช่ภาพถ่าย |
| 1 | 3 | จอเดียวกัน (callout 3) + การ์ดสถานี 5 ใบ | ใบป่าดาบอสิปัตตะใส่กรอบทอง |
| 2 | 4 | จอสอบสวนอีกคดี (callout 4) + โปรไฟล์ กานต์ · เพลิง · **บุญ (ใหม่)** | |
| 2 | 5 | จอเดียวกัน (callout 5) + ชิปสี | |
| 3 | 6 | แคปหน้าเลือกผู้คุม | |
| 3 | 7 | แคปการ์ดสำนวนที่มี (ไม่นับ) | |
| 4 | 8 | แคปหน้าต่างอัญเชิญ + เมนูผู้ช่วย | ล็อกจนได้ตะเกียง |
| 4 | 9 | แคปหอส่องกรรม + หน้าต่างเติมพลัง | ล็อกจนได้ตะเกียง |
| 5 | 10 | แคปหน้าต่างทีมบังคับ + Guard ตาเขียว | ล็อกจนเมืองถูกยึด |

---

## ข้อที่ไม่แน่ใจ / ให้ Claudy ตัดสิน (เรียงตามความสำคัญ)

1. **"3 ครั้ง" ต่อผู้ช่วยหนึ่งตน หรือรวมทั้งตะเกียง?** ผมเขียนว่า "ตนละ 3 ครั้ง" ตามโค้ด (`bag.movesLeft`, `battle.helperSpent`) · ใบงานเขียนว่า "ตะเกียง: เรียกตัวอัญเชิญได้ 3 ครั้ง" ซึ่งอ่านได้ทั้งสองแบบ — ถ้าเป็น "รวม" ต้องเปลี่ยนข้อ ง/ซ/MN1 กล่อง 8 และข้อความ 9 ฉบับของผู้ช่วย
2. **กุมภัณฑ์ "เพิ่งปรากฏตัว" ขัดกับฉาก `z1-guard-name` และป้าย `guard.th.title`** (ยังบอกว่าเฝ้าด่านมาตลอด/ตั้งแต่รุ่นพ่อ) — ผมเขียนฉบับแก้ให้ในข้อ ค (พับไว้) · ไม่ได้ใส่ในตารางหลัก เพราะอยู่นอกขอบเขตใบงาน · Claudy อนุมัติ → ให้ Toby ใส่พร้อมข้อ ค
3. **ป้ายล็อกหอ `unlock.towerEvent`** "เปิดหลังจบคดีนางสีดา" ไม่ตรงเงื่อนไขจริง (ปลดตอนได้ตะเกียง = หลังชนะหนุมาน ไม่ใช่แค่จบคดี) · ผมแนะนำ "เปิดหลังได้ตะเกียงวิเศษ" / "Opens once you have the Magic Lamp" · ใส่คำเดิมไว้ในตารางเป็นค่าเริ่มต้น รอ Claudy เลือก
4. **`z4g-raw.js` ฉาก `zN-fire` ไม่ได้เปิดอ่าน** — ตรวจว่าบรรทัดก่อนสุดท้ายไม่พูดว่า Guard ยืนเฝ้า/อยู่ที่ประตู (ซึ่งขัดกับข้อ ญ-2)
5. **ชื่ออังกฤษของสถานี/ชนิดบาป** (ข้อ ฎ-1 และ MN1 กล่อง 3) ผมเขียนตัวแทน เพราะไม่ได้เปิด `i18n.js` · ถ้าเกมมีชื่ออังกฤษของสถานี/บาปอยู่แล้ว ใช้ของเกม
6. **MN1 กล่อง 5 ตัวอย่างบุญ "บริจาคเลือดครบ 40 ครั้ง = 2"** (ตัวเลขคุณเป้) — แต่ `MERITS` ใน `data.js` L159 ให้ `v: 1` ไม่ตรงกัน · ให้ Toby/Reese เทียบกับสีที่เกมแสดงจริง (เขียว=2 หรือขาว=1) และสูตร `deservedOf` (`game.js` ~484) ว่า "กรรมหนักสุด − บุญ − เหตุบรรเทา" ตรงจริงหรือไม่ — ถ้าไม่ตรง ปรับตัวเลขตัวอย่างในคู่มือให้ตรงเกม ไม่ใช่ปรับเกม
7. **ชื่อพลัง "ข่มขู่"** (คุณเป้เขียนในกล่อง 1) — รายงาน T3 ของ Toby เรียก "ตวาด" · ผมใช้ "ข่มขู่" ตามคุณเป้ ให้ Toby เทียบกับชื่อปุ่มจริงในเมนู "พลัง"
8. **ข้อ ก:** ผมไม่ได้เห็นข้อความเต็มของบันทึกหลังเปิดโปง (เห็นแต่ส่วน "บุญปลอมถูกลบออกจากสำนวนแล้ว" ในรายงาน Toby) · แทนเฉพาะส่วนนั้น และให้ป้าย "(ไม่นับ)" อังกฤษตรงกับที่เกมแสดงจริง
9. **`g5.hintIdle`** (ฎ-2) เขียนใหม่ทั้งประโยคเพราะไม่เห็นข้อความเดิมเต็ม
10. **`z4c-raw.js` / `z4a-raw.js` เป็นไฟล์ generate** — ต้องแก้สคริปต์ `scripts/extract-rae-z4b.py` / `extract-rae-z4a.py` ด้วย (ข้อ ง-2, ฌ #24–25)
11. **MN1 หน้า 4–5 ล็อกกันสปอยล์** — เป็นข้อเสนอของผม (ผู้เล่นใหม่เปิดคู่มือแล้วเห็นเรื่องตะเกียง/เมืองถูกยึดก่อนถึงเนื้อเรื่อง) ถ้าคุณเป้อยากให้เห็นครบตั้งแต่ต้น ตัดข้อความช่องล็อกออก
12. **ข้อ ฉ** ผมเปลี่ยนจาก "คดีนี้ใช้ไม่ได้" เป็น "ใช้ไม่ได้ในคดีนี้" เพียงลำดับคำ — ถ้า Claudy ไม่ต้องการเปลี่ยน คงของเดิมได้

## ผลตรวจเกณฑ์รับงาน
1. ครบ ก–ฏ (12 ข้อ) + MN1 (10 กล่อง 5 หน้า) · ไทย+อังกฤษคู่ทุกข้อ (ยกเว้นเหตุผลพ่อครัวรอ/ข้อ ฉ ที่ระบบเป็นไทยล้วน — ใส่อังกฤษอ้างอิงให้)
2. ข้อเท็จจริงห้ามเปลี่ยน: ชื่อ "หอส่องกรรม"/Mirror Tower ✓ · กติกาตะเกียง 3 ครั้ง/3 ตา/เติมที่หอ ✓ · (ไม่นับ) บุญยังอยู่ในรายการ ✓ · ศึกปลดปล่อยลำดับตามคุณเป้ ✓ · โซน 4 ไม่ถูกเผา (ไม่เอ่ยถึงโซน 4 ในข้อความปลดปล่อย) ✓ · กุมภัณฑ์เพิ่งปรากฏตัว (หัวข้อ e12 ไม่สื่อเฝ้าประตู; ฉากอื่นที่ขัด → ข้อ 2) · ไม่เขียนว่าส่วนที่ทีมคิดเองเป็น "ตามวรรณคดี" ✓ · "หอกระจก" ไม่เหลือในข้อความผู้เล่นเท่าที่ไล่ได้ (รอ `git grep` ยืนยัน)
3. สั้น น้ำเสียงเข้าเกม ✓ บทตัวละครคงบุคลิก (กุมภัณฑ์ซื่อ กวนอูพูดสั้นตรง แวน เฮลซิงเยือกเย็น)
