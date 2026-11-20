# AVEGEE · เกลาข้อความ TODO(Rae) + EN ของบทเดิม · Rae · 20 พ.ย. 2569

ใบงาน `Output/Claudy/briefs/2026-11-20-avegee-rae-todo-strings.md` · อ่านโค้ดอย่างเดียว ไม่แก้โค้ด ไม่แก้ไฟล์บทเดิม
สถานะ: **เขียนทีละหัวข้อ บันทึกทุกหัวข้อ** · ถ้าไฟล์นี้ค้าง ให้ดูตาราง "ความคืบหน้า" แล้วทำต่อจากหัวข้อที่ยังไม่ติ๊ก

## ความคืบหน้า
- [x] A. ข้อความ TODO(Rae) ที่เป็นข้อความเดี่ยว (นิราปลุก · แพ้ quest · ลูแปงปล่อยไป · ป้ายประตู/ท่าเรือ · เซอร์เบอรัส 2 จุด · ชื่อหน้า 3 จุด)
- [x] B. ท่าบอส: ข้อความ "ใช้ท่า/เตือน" ของโคลอสเซียม 10 ท่า · ลูแปง · หุ่นศาลา
- [x] C. EN ของบทเดิม: `cyber-duel` · `ending-capture` · `ending`
- [x] D. EN ของบทเดิม: `cyber-signal-win` หน้า 1 · `signal-*` (ครบ 9 ซีนของ `SIGNAL_STORIES`)
- [x] E. หมายเหตุ `z3-sev-open` (ให้ Toby ต่อสาย)
- [x] F. ให้ Reese ตรวจ · ต้องให้คุณเป้ตัดสิน

**ครบทุกหัวข้อแล้ว** (ส่วนที่ผมอ่านไม่ได้เพราะไม่มีเครื่องมือค้นไฟล์: บรรทัดของข้อความท่าเรือล็อก A6)

กติกาเสียงที่ใช้: ยามา "ผม…ครับ" · นิรา "ดิฉัน…ค่ะ" เรียกยามาว่า "ท่าน" · HOME-67 "ผม/คุณ" เรียก "คุณยมบาทน้อย" · WATSON-03 เรียก "ท่านยมบาทน้อย" · เซอร์เบอรัสไม่พูด ใช้ "บรรยาย:" · ข้อความระบบเป็นกลาง สุภาพ ไม่ใช้ "ข้า"

---

## A. ข้อความเดี่ยว (ตาราง วางแทนได้ทันที)

| # | ไฟล์:บรรทัด | คีย์ / บริบท | TH ใหม่ | EN ใหม่ |
|---|---|---|---|---|
| A1 | `src/tea-recovery.js:32-35` | `NIRA_WAKE_LINE` · นิราพูด 1 บรรทัดหลังวิ่งเข้า ป้ายใต้ฉากแสดง 2 วิ (คงรูปแบบเดิม ไม่ใส่เครื่องหมายคำพูด) | `นิรา: ท่านคะ ตื่นได้แล้วค่ะ ดิฉันอยู่ตรงนี้ ทุกคนลุกได้แล้วนะคะ` | `Nira: Sir, time to wake. I am right here. Everyone, you may rise now.` |
| A2 | `src/quest-fights.js:143` | `loseNoteTea` · ข้อความระบบใต้บทแพ้ของศึกภารกิจเสริม ก่อนปุ่ม "พักไว้ก่อน" | `แพ้ไม่เสียอะไร ความคืบหน้าของภารกิจยังอยู่ครบ · ไปพักที่ศาลาน้ำชาก่อน แล้วกลับมาคุยเพื่อสู้ใหม่ได้` | `A defeat costs you nothing, and your quest progress is kept. Rest at the tea house, then come back and talk to fight again.` |
| A3 | `src/ui.js:1545` | ตัวเลือก 2 ของคนงานแปลกหน้า "ขอโทษ ผมเข้าใจผิดครับ" · เขาหัวเราะแล้วยืนที่เดิม (quest ไม่ปิด) · ใช้เสียงคนงานเหมือนบทคุยของ Rae ("คนงาน: ผม…ครับ") ไม่เรียกชื่อลูแปง เพราะผู้เล่นยังไม่ได้จับเขา · แสดงเป็น 2 บรรทัด (`<p>` ละบรรทัด) | `คนงาน: "ไม่เป็นไรครับ ผมไม่รีบ"` / `บรรยาย: เขาหัวเราะเบา ๆ ในลำคอ แล้วหันกลับไปมองประตูหลังโรงอาหารเหมือนเดิม เขายังยืนอยู่ที่เดิม` | `Worker: "No trouble, sir. I am in no hurry."` / `Narration: He gives a soft laugh in his throat and turns back to watch the door behind the canteen. He is still standing where he was.` |
| A3b | `src/ui.js:1545` | ปุ่มปิดของหน้าต่างเดียวกัน (คงเดิม ใช้ได้แล้ว) | `ไว้คราวหน้า` | `Later` |
| A4 | `src/ui.js:4116` | ป้ายลูกศรออกชายแดน · ทางเดินกลับเปิด (`walkBackTarget`) | `เดินกลับผ่านชายแดน · ไปโซนก่อนหน้า` | `Walk back through the frontier · previous zone` |
| A5 | `src/ui.js:4116` | ป้ายลูกศร · โลกถูกยึดและผู้ถูกควบคุมของโซนนี้ยังไม่ได้รับการช่วย (`seizedActive`) · ใช้ "ผู้ถูกควบคุม" ไม่ใช่ "ผู้ครอบงำ" (ดูข้อตัดสินในหัว F) | `ประตูถูกแสงเขียวปิดไว้ · ช่วยผู้ถูกควบคุมของโซนนี้ก่อน` | `Gate sealed with green light · free this zone's lord first` |
| A6 | (ข้อความท่าเรือล็อก · ตามรายงาน T8c ข้อ 3 · ผมหาบรรทัดในโค้ดไม่เจอเพราะไม่มีเครื่องมือค้นไฟล์ ให้ Toby หาจาก `harbourOpen` / `TODO(Rae)` ใน `ui.js`) | แสดงเมื่อกดท่าเรือขณะ `harbourOpen` = false | `ท่าเรือถูกล็อกจากภายนอก เรือยังออกไม่ได้จนกว่าจะช่วยผู้ถูกควบคุมของแต่ละโซนให้เป็นอิสระ ต้องเดินกลับผ่านชายแดนไปทีละโซน` | `The harbour has been locked from outside. No boat can sail until the controlled lord of each zone is freed. Walk back through the frontiers, one zone at a time.` |
| A7 | `src/z3c-frontier.js:30-31` | `between[4]` รายการสุดท้าย · เซอร์เบอรัสตื่นจากสะกด (บรรยายล้วน) · ลำดับเดิมคือต่อจากบรรทัดแวน เฮลซิง | `บรรยาย: เซอร์เบอรัสสะบัดสามเศียรพร้อมกัน แสงเขียวในดวงตาแตกเป็นเส้นบาง ๆ แล้วกลับเป็นสีแดงเข้ม มันก้มศีรษะให้ยามาหนึ่งครั้ง แล้วถอยกลับไปยืนที่ปากทางเหมือนเดิม` | `Narration: Cerberus shakes all three heads together. The green light in his eyes breaks into thin threads and fades back to deep red. He bows to Yama once, then steps back to his post at the mouth of the frontier.` |
| A8 | `src/z3c-frontier.js:112-113` | ฉาก `z3-hypnosis-v2` หน้า 1 · เซอร์เบอรัสโดนสะกด · แก้ความกำกวมเดิม ("ผู้ที่ยืนอยู่ข้างหลังวาลดริก" ทำให้เหมือนเขาหันไปหาฝั่งตรงข้ามทีม) | `บรรยาย: ที่ปากทางชายแดน เซอร์เบอรัสผู้พิทักษ์ประตูปัจฉิมสะบัดสามเศียร ดวงตาสีแดงเข้มของมันกลายเป็นสีเขียวทีละคู่ แล้วมันก็ก้าวมายืนเคียงวาลดริก หันสามเศียรมาทางยามา` | `Narration: At the mouth of the frontier, Cerberus, Guardian of the Western Gate, shakes all three heads. His deep red eyes turn green, pair by pair. Then he steps forward to stand beside Valdric and turns all three heads toward Yama.` |
| A9 | `src/z4h-final.js:63-65` | `ARCHON_DOWN` · ชื่อซีน (ระดับ story) | `อาร์คอน-ศูนย์ล้ม` | `Archon-Zero Falls` |
| A9b | `src/z4h-final.js:64-65` | ชื่อหน้า (`pages[0].title`) · อ่านเนื้อหา `RAW_Z4H_AFTER_WIN` แล้ว อาร์คอน-ศูนย์พูดว่า "รายการ ... ยัง ... ไม่ ... ปิด" จึงใช้คำของเขาเองเป็นชื่อหน้า (ชื่อเดิม "ปลายสายที่ปิดไม่ได้" ไม่ผิด แต่ไม่โยงกับบท) | `รายการที่ยังไม่ปิด` | `Item Not Yet Closed` |
| A10 | `src/z4h-final.js:55` | `cyber-approach` ชื่อซีน (ระดับ story · ชื่อหน้าเป็นของ Rae อยู่แล้ว) · ให้ตรงกับแบนเนอร์ NF-3 "ศึกสุดท้าย / The Final Battle" ที่ Rae เขียนไว้ | `โซน 4 · ศึกสุดท้าย` (คงเดิม) | `Zone 4 · The Final Battle` (คงเดิม) |
| A11a | `src/z4h-final.js:61-62` | `freeStory('th')` · พญายมบาท / Yamabat · ชื่อ**หน้า** (ชื่อซีนคือชื่อหัวหน้าอยู่แล้ว) · อ้างจากบรรทัด "ได้ยินเสียงเจ้าเรียกข้าว่าท่านพ่อ" | `เสียงเรียกท่านพ่อ` | `The Word "Father"` |
| A11b | `freeStory('asia')` | จ้าวเหวิน / Zhao Wen · อ้างจาก "บัลลังก์ของข้าไม่ได้เป็นของใครอื่น" | `บัลลังก์ที่ไม่ใช่ของใคร` | `A Throne Nobody Else Holds` |
| A11c | `freeStory('west')` | ฮาลวาร์ / Halvar · อ้างจาก "ความเย็นของข้ากลับมาเป็นของข้าเอง" | `ความเย็นของตัวเอง` | `A Cold of His Own` |
| A11d | `freeStory('cyberhell')` | เน็กซาร / Nexar · อ้างจาก "ข้าเป็นสายที่ถูกตัดแล้ว" | `สายที่ถูกตัดให้เป็นอิสระ` | `A Line Cut Free` |
| A12 | `src/z4g-return.js:20-21` | `col-pass` ชื่อซีน + ชื่อหน้า ตรวจกับบทของลูซิเฟอร์แล้วใช้ได้ ไม่ต้องเปลี่ยน | คงเดิม `สังเวียนที่ถูกตัดสาย` / หน้า `ประตูข้างของสังเวียน` | คงเดิม `The Arena With Its Lines Cut` / `The Arena's Side Gate` |

---

## B. ท่าบอส · ข้อความ "เตือน" (warnText) และ "ใช้ท่า" (useText)

### B1. โคลอสเซียม 10 ด่าน · `src/z4b-colosseum.js:32-34` (`skillOf`)
วิธีวาง: เปลี่ยนจากสูตรสร้างอัตโนมัติ (`${ชื่อ}ตั้งท่า${ท่า} — รอบหน้า…`) เป็นตารางข้อความรายด่านด้านล่าง (ใส่เป็น `warn:L2(...)`, `use:L2(...)` ใน `BOUTS` หรือตารางแยก แล้วให้ `skillOf` อ่านจากตาราง) · ชื่อท่า TH/EN ยังเป็นของ Rae จาก `RAW_BOUTS` ไม่เปลี่ยน · รูปแบบคงเดิม: ประโยคเตือนหนึ่งบรรทัด ขีดกลาง ผลที่จะเกิดรอบหน้า · ท่าตีหมู่ (ด่าน 5 6 7 9) บอกว่า "ทั้งทีม" ท่าตีเดี่ยวบอก "คนเดียว" ให้ตรงกับ `kind` ในเอนจิน

| ด่าน | ท่า (ของ Rae) | TH เตือน | EN เตือน | TH ใช้ท่า | EN ใช้ท่า |
|---|---|---|---|---|---|
| 1 ซามูไรไร้นาย · เดี่ยว | ประกายดาบหนึ่งเดียว / One-Draw Flash | ซามูไรไร้นายวางมือบนด้ามดาบ นิ่งสนิท — รอบหน้าเขาจะชักดาบฟันหนักใส่คนเดียว! | The Masterless Samurai rests a hand on his hilt, perfectly still. Next turn he draws and strikes one of you hard! | ซามูไรไร้นาย: "ประกายดาบหนึ่งเดียว!" | The Masterless Samurai: "One-Draw Flash!" |
| 2 นินจาธรรมดา · เดี่ยว | เงาหลังฉาก / Shadow Behind the Curtain | นินจาธรรมดาหายเข้าเงาหลังม่านสังเวียน — รอบหน้าเขาจะโผล่มาฟันหนักใส่คนเดียว! | The Plain Ninja slips into the shadow behind the arena curtain. Next turn he comes out and strikes one of you hard! | นินจาธรรมดาโผล่ออกมาจากเงาหลังฉาก — เงาหลังฉาก! | The Plain Ninja steps out of the shadow behind the curtain: Shadow Behind the Curtain! |
| 3 นายขนมต้ม · เดี่ยว | ศอกกลับ / Reverse Elbow | นายขนมต้มตั้งการ์ดต่ำ ตาจับอยู่ที่คนเดียว — รอบหน้าเขาจะส่งศอกกลับหนักใส่คนนั้น! | Nai Khanom Tom drops his guard low, his eyes on one of you. Next turn he throws a reverse elbow at that one, hard! | นายขนมต้ม: "ศอกกลับ!" | Nai Khanom Tom: "Reverse Elbow!" |
| 4 มิโนทอร์ · เดี่ยว | พุ่งขวิดเขาวงกต / Labyrinth Charge | มิโนทอร์ก้มเขาลงและขูดกีบกับพื้นหิน — รอบหน้ามันจะพุ่งขวิดหนักใส่คนเดียว! | The Minotaur lowers his horns and scrapes a hoof on the stone. Next turn he charges one of you hard! | มิโนทอร์: "พุ่งขวิดเขาวงกต!" | The Minotaur: "Labyrinth Charge!" |
| 5 เมดูซา · หมู่ | สายตาหินแข็ง / Gaze of Stone | ประกายเงินน้ำเงินเริ่มสว่างในดวงตาเมดูซา — รอบหน้าสายตาของเธอจะกวาดทั้งทีม! | A silver-blue glow wakes in Medusa's eyes. Next turn her gaze sweeps the whole team! | เมดูซา: "สายตาหินแข็ง!" | Medusa: "Gaze of Stone!" |
| 6 กัปตันคลื่นเงิน · หมู่ | ปืนใหญ่ไล่คลื่น / Broadside | ปืนใหญ่ทั้งแถวหันปากกระบอกมาทางทีม — รอบหน้ากัปตันคลื่นเงินจะสั่งยิงใส่ทั้งทีม! | A whole row of cannon swings round to face your team. Next turn Captain Silverwave orders them to fire on all of you! | กัปตันคลื่นเงิน: "ปืนใหญ่ไล่คลื่น!" | Captain Silverwave: "Broadside!" |
| 7 ผู้มาเยือนจากดาวเก่า · หมู่ | ลำแสงสแกนร่าง / Scanning Beam | ผู้มาเยือนจากดาวเก่าเงียบลง เส้นแสงบาง ๆ เริ่มสว่างในดวงตา — รอบหน้าลำแสงจะกวาดสแกนทั้งทีม! | The Visitor From an Old Star goes quiet, and a thin line of light grows in its eyes. Next turn a beam sweeps and scans the whole team! | ผู้มาเยือนจากดาวเก่า: "ลำแสงสแกนร่าง!" | The Visitor From an Old Star: "Scanning Beam!" |
| 8 C-8 · เดี่ยว | หมัดเหล็กจากฟ้า / Iron Fist From Above | C-8 ยกกำปั้นเหล็กขึ้นเหนือหัว จอหน้าอกขึ้นว่า [กำลังล็อกเป้าหมาย] — รอบหน้าหมัดจะตกหนักใส่คนเดียว! | C-8 raises an iron fist overhead. Its chest display reads [Locking target]. Next turn the fist falls on one of you, hard! | C-8: "[ดำเนินการ] หมัดเหล็กจากฟ้า!" | C-8: "[Executing] Iron Fist From Above!" |
| 9 ธอร์ · หมู่ | ค้อนฟ้าคำราม / Roaring Hammer | ธอร์ยกค้อนขึ้นเหนือหัว ประกายฟ้าไต่ตามด้าม — รอบหน้าสายฟ้าจะฟาดทั้งทีม! | Thor lifts the hammer overhead and sparks climb the haft. Next turn lightning strikes the whole team! | ธอร์: "ค้อนฟ้าคำราม!" | Thor: "Roaring Hammer!" |
| 10 ลูซิเฟอร์ · เดี่ยว | ม่านปิดสังเวียน / Final Curtain | ลูซิเฟอร์ยกปลายไม้เท้าชี้ไปที่คนหนึ่ง — รอบหน้าม่านแสงของสังเวียนจะปิดลงใส่คนนั้นอย่างหนัก! | Lucifer raises the tip of his staff and points at one of you. Next turn the arena's curtain of light falls on that one, hard! | ลูซิเฟอร์: "ม่านปิดสังเวียน" (ไม่ใส่ "!" เขาพูดนิ่งแบบผู้ประกาศ) | Lucifer: "Final Curtain." |

ข้อควรระวังสำหรับ Toby (พบตอนอ่าน `RAW_BOUTS` ใน `src/z4a-raw.js`)
1. **ภาษาไทยหลุดใน EN**: `RAW_BOUTS[5].move.en` = `"Gaze of Stone (ลดความเร็วทีม 1 รอบ)"` ตัวหนังสือในวงเล็บเป็นหมายเหตุสถานะของ Rae ถึง Toby ไม่ใช่ชื่อท่า ถ้าเอาไปใช้ตรง ๆ ผู้เล่น EN จะเห็นไทยในแบนเนอร์/การ์ดท่า · ให้ตัดวงเล็บออก ใช้ `Gaze of Stone`
2. **หมายเหตุในชื่อ**: `RAW_BOUTS[2].name.en` = `"The Plain Ninja (D3)"` "(D3)" เป็นรหัสภายใน ไม่ใช่ชื่อ · ให้ตัดออก ใช้ `The Plain Ninja` (ผมอ้างชื่อแบบตัดแล้วในตารางข้างบน)
3. ท่า "สายตาหินแข็ง" ที่ Rae ตั้งใจให้ลดความเร็วทีม ตอนนี้เป็นท่าตีหมู่ธรรมดาตามเอนจิน ข้อความเตือนข้างบนจึง**ไม่สัญญาเรื่องลดความเร็ว** (ถ้าเพิ่มสถานะนี้ในเอนจินภายหลัง ให้เติมท้ายประโยคเตือนว่า "และทำให้ทีมช้าลง 1 รอบ")

### B2. ท่าลูแปงและหุ่นศาลา · เฉพาะ "ใช้ท่า" (Rae ให้ชื่อท่ากับข้อความเตือนไว้แล้วใน `RAW_Z4C_LUPIN_LINES` / `RAW_Z4C_SALA_LINES` ใช้ต่อได้ ไม่ต้องเขียนใหม่)

| ไฟล์:บรรทัด | ท่า | TH ใช้ท่า | EN ใช้ท่า | เหตุผล |
|---|---|---|---|---|
| `src/z4f-lupin.js:21` `useText` | ขโมยจังหวะ / Steal the Beat | `ลูแปง: "จังหวะของท่าน ข้าขอรับไว้"` | `Lupin: "That beat of yours. I will take it."` | ลูแปงพูด "ข้า…ท่าน" เหมือนบทตัวอัญเชิญของ Rae · ต่างจากประโยคของตัวอัญเชิญ ("ขอยืมจังหวะหน่อยนะ") เพราะตรงนี้เขาเป็นศัตรู ไม่ขอยืม แต่ขโมย |
| `src/z4e-sala.js:24-25` `useText` | เสียงที่เหมือนคนรัก / Voice Like One You Love | `AI Scammer Robot: "ไม่ต้องกลัวนะ ... ฉันเอง"` | `AI Scammer Robot: "Do not be afraid. ... It is me."` | ท่านี้คือการเลียนเสียงคนที่เป้าหมายรัก (ผู้ถูกเล็งชะงัก) จึงให้หุ่นพูดประโยคหลอกลวงทั่วไปแทนการใส่ชื่อท่าในปากหุ่น · เป็นประโยคเดียวกันทุกครั้งที่ใช้ ไม่ระบุว่าเลียนเสียงใคร เพื่อไม่ผูกกับผู้เล่นคนใด |

---

## C. EN ของบทเดิม · `src/story.js` (บรรทัด 60-69) · TH คงเดิม ไม่แก้
วิธีวาง: เติม `en:{ title }` ที่ระดับซีน และ `en:{ title, line }` ในแต่ละหน้า (รูปแบบเดียวกับซีนของ R2 · `localizeStory` ใน `story.js:74` อ่านให้เอง) · ชื่อเรียก: ยมบาทน้อย = Yama · พ่อ = Father (ตรงกับ `ending-coda` / บทพญายมบาทของ R2)

| ไฟล์:บรรทัด | คีย์ / ระดับ | TH (คงเดิม) | EN ใหม่ |
|---|---|---|---|
| `story.js:60` | `cyber-duel` · ชื่อซีน | โซน 4 · ตัดสายควบคุม | Zone 4 · Cutting the Line of Control |
| `story.js:61` | `cyber-duel` หน้า 1 · ชื่อหน้า | เหลือบอสคนสุดท้าย | The Last Boss Remains |
| `story.js:61` | `cyber-duel` หน้า 1 · เนื้อ | หัวหน้าทั้งสี่เป็นอิสระแล้ว ยมบาทน้อยและทีมที่เตรียมพร้อมก้าวเข้าสู่ศึกตัดสินกับผู้ตรวจการโซน 4 | The four lords are free. Yama and his ready team step into the deciding battle with the Inspector of Zone 4, Archon-Zero. |
| `story.js:63` | `ending-capture` · ชื่อซีน | อเวจี · คำตัดสินสุดท้าย | Avici · The Final Verdict |
| `story.js:64` | `ending-capture` หน้า 1 · ชื่อหน้า | จบการควบคุม | The Control Ends |
| `story.js:64` | `ending-capture` หน้า 1 · เนื้อ | บอสใหญ่พ่ายแพ้ ทุกคนเป็นอิสระ แต่เขายังต้องตอบต่อกรรมของตนที่แท่นตัดสิน | The great boss has fallen and everyone is free. But he must still answer for his own karma at the dais of judgment. |
| `story.js:66` | `ending` · ชื่อซีน | อเวจี · สันติสุขทั้งสี่สาขา | Avici · Peace Across the Four Branches |
| `story.js:67` | `ending` หน้า 1 · ชื่อหน้า | ผู้ปกครองทั้งสี่โซน | Ruler of the Four Zones |
| `story.js:67` | `ending` หน้า 1 · เนื้อ | ยมบาทน้อยปกครองทั้ง 4 โซนด้วยความสงบสุข โดยมีนิรา พ่อ และหัวหน้าโซน 2–4 ร่วมดูแลอยู่เคียงข้าง | Yama governs all four zones in peace, with Nira, his father and the lords of Zones 2 to 4 watching over them at his side. |
| `story.js:68` | `ending` หน้า 2 · ชื่อหน้า | พ่อยอมรับ | Father Approves |
| `story.js:68` | `ending` หน้า 2 · เนื้อ | พ่อเดินมาตบบ่าของยมบาทน้อยเบาๆ แล้วพูดว่า “ทำได้ดีมากลูกพ่อ” ขณะที่นิรายืนยิ้มอยู่ข้างๆ ด้วยความภูมิใจ | Father walks over and pats Yama lightly on the shoulder. "Well done, my son," he says, while Nira stands beside them, smiling with pride. |

หมายเหตุหัว C
- `cyber-duel` TH ยังเรียก "ผู้ตรวจการโซน 4" ส่วนบท R2 เรียก Archon-Zero ผมจึงใส่ทั้งสองชื่อใน EN เพื่อไม่ให้ผู้เล่น EN สะดุดก่อนศึก · ถ้าคุณเป้ให้แก้ TH ด้วย ดูหัว F ข้อ 2
- "Avici" เป็นคำแปลของ "อเวจี" (นรกขุมลึกสุด) เป็นศัพท์ศาสนา ต้องให้ Chris/Reese ยืนยันก่อนขาย และให้ Toby ใช้ชื่อโลกเกมใน EN ที่ `i18n.js` ใช้อยู่แล้วถ้ามี (ผมไม่ได้เปิด `i18n.js`)
- ชื่อซีนของ `cyber-approach` / `cyber-control` / `cyber-reinforcements*` มี Rae เขียนแล้วใน `Z4H_STORY_OVERRIDES` ไม่ต้องแตะ (ข้อความเก่าใน `story.js:48-59` ถูกทับด้วย `Object.assign` บรรทัด 71)

---

## D. EN ของบทเดิม · `src/e1-content.js` (`SIGNAL_STORIES`) · TH คงเดิม ไม่แก้
เกินใบงานเล็กน้อย: ใบงานระบุ `cyber-signal-win` หน้า 1 กับ `signal-*` แต่ `cyber-signal-open` และ `cyber-signal-close` อยู่ในไฟล์เดียวกันและยังเป็นไทยล้วนเช่นกัน ถ้าไม่ใส่ ผู้เล่น EN จะเห็นไทยกลางเส้นทางสัญญาณ จึงเขียนให้ครบ 9 ซีน (ไม่เสียค่าอะไรเพิ่มถ้า Toby ไม่ใช้ ลบแถวได้)
วิธีวาง: เติม `en:{ title }` ที่ระดับซีน และ `en:{ title, line }` ในแต่ละ `pages[]` · `z4g-return.js:18` สร้าง `cyber-signal-win` จาก `pages[0]` เดิม ดังนั้นหน้า 1 ต้องมี `en` ในต้นฉบับ `e1-content.js` จึงจะติดไปด้วย · เสียงถูกสะกดใช้รูป "คำ ... คำ ... คำ" ให้ตรงกับของ R2 ("Block ... every ... road.")

### D1. `cyber-signal-win` (บรรทัด 23-37) · หน้า 1 เท่านั้น (หน้า 2 เป็นของ R2 มี EN แล้ว)
| บรรทัด | ระดับ | TH (คงเดิม) | EN ใหม่ |
|---|---|---|---|
| 24 | ชื่อซีน | ประตูที่ถูกเปิดจากอีกฝั่ง | The Door Opened From the Other Side |
| 27 | ชื่อหน้า 1 | ประตูที่ถูกเปิดจากอีกฝั่ง | The Door Opened From the Other Side |
| 28 | เนื้อหน้า 1 (3 บรรทัด) | โทรจัน-9: "[คำสั่งภายนอกถูกตัดออก] ระบบ เบา ขึ้น ... ขอบใจ ผู้ถอนสิทธิ์" / โทรจัน-9: "ข้าเป็นประตูหลังที่ถูกสร้างไว้ให้คนอื่นเดินเข้า ไม่ได้ถูกสร้างไว้ให้เลือกว่าจะเปิดให้ใคร คืนนี้มีมือเอื้อมเข้ามาในท้องข้าอีกครั้ง" / โทรจัน-9: "คำสั่งที่ผ่านข้าไปแล้ว ไปถึงสามด่านที่ท่านเคยเดินผ่าน คนที่ท่านเคยชนะในแต่ละด่าน ถูกปลุกกลับมาด้วยเสียงเดียวกัน" | `Trojan-9: "[External command severed] System ... lighter ... Thank you, you who revoked its access."` / `Trojan-9: "I am a back door, built for others to walk through, not built to choose whom I open for. Tonight a hand reached into my belly again."` / `Trojan-9: "The command that passed through me has already reached the three frontiers you once crossed. Those you defeated at each one have been woken again by the same voice."` |

### D2. `cyber-signal-open` (บรรทัด 3-22)
| บรรทัด | ระดับ | TH (คงเดิม) | EN ใหม่ |
|---|---|---|---|
| 4 | ชื่อซีน | เสียงติ๊ดที่ไม่มีเจ้าของ | The Beep With No Owner |
| 7 | ชื่อหน้า 1 | เสียงติ๊ดที่ไม่มีเจ้าของ | The Beep With No Owner |
| 8 | เนื้อหน้า 1 | บรรยาย: ทุกครั้งที่ท่านเดินผ่านด่านชายแดนโซน 4 มีเสียงติ๊ดสั้น ๆ ดังซ้ำในจังหวะเดียวกัน ทั้งที่ไม่มีใครกดสัญญาณ / นิรา: "ท่านคะ ดิฉันจดเวลาไว้แล้ว มันดังทุกสามสิบวาระตรงเป๊ะ ไม่ใช่เสียงของด่านค่ะ เป็นเสียงของบางอย่างที่ถูกเปิดค้างไว้" | `Narration: Every time you pass the Zone 4 frontier post, a short beep sounds again in the same rhythm, though no one has pressed a signal.` / `Nira: "Sir, I have logged the time. It sounds every thirty terms exactly. It is not the sound of the post. It is the sound of something that has been left switched on."` |
| 12 | ชื่อหน้า 2 | โทรจัน-9 ไม่ใช่ตัวเอง | Trojan-9 Is Not Himself |
| 13 | เนื้อหน้า 2 | บรรยาย: โทรจัน-9 ยืนที่เดิม ฝาท้องม้าไม้เปิดอ้า มีแสงเขียวมิ้นต์กะพริบจากข้างใน ดวงตากลายเป็นเส้นสแกนพาดขวาง / ยมบาทน้อย: "โทรจัน-9! ผมเอง ยมบาทน้อยไงล่ะ" / โทรจัน-9: "[รับคำสั่งใหม่จากผู้ใช้เดิม] ขวาง ไว้ ทุก ทาง ... [สิทธิ์ควบคุมชายแดนถูกถอน] ... แต่ ประตู หลัง ... ยัง เปิด ... ขอโทษ ข้า หยุด ไม่ ได้" | `Narration: Trojan-9 stands where he always stands, the belly hatch of the wooden horse hanging open, a mint-green light blinking inside. His eyes have become scanning lines drawn straight across.` / `Yama: "Trojan-9! It is me. Yama, remember?"` / `Trojan-9: "[New command received from former user] Block ... every ... road ... [Frontier control rights revoked] ... but ... the back ... door ... is still ... open ... sorry ... I ... cannot ... stop."` |
| 17 | ชื่อหน้า 3 | สี่ทางพร้อมกัน | Four Roads at Once |
| 18 | เนื้อหน้า 3 | นิรา: "ดิฉันอ่านเลขกำกับคำสั่งออกค่ะ มันถูกส่งไปสี่ทางพร้อมกัน ทางหนึ่งคือตัวเขาเอง อีกสามทางคือชายแดนสุวรรณภูมิ บูรพา และปัจฉิมค่ะ" / ยมบาทน้อย: "งั้นเขาเป็นแค่ปลายสายหนึ่ง ต้องหยุดเขาก่อนสัญญาณจะส่งต่อ แล้วค่อยตามไปทีละโซน" | `Nira: "I have read the number stamped on the command, sir. It was sent down four roads at once. One was to him. The other three are the Suvarnabhumi, Eastern and Western frontiers."` / `Yama: "Then he is only one end of the line. We must stop him before the signal passes on, and then follow it zone by zone."` |

### D3. `signal-th-open` (บรรทัด 38-52) และ `signal-th-win` (53-62) · ทัณฑสูร / Tanthasura
| บรรทัด | ระดับ | TH (คงเดิม) | EN ใหม่ |
|---|---|---|---|
| 39 / 42 | ชื่อซีน / ชื่อหน้า 1 (`th-open`) | ด่านที่เงียบเกินไป | A Frontier Too Quiet |
| 43 | เนื้อหน้า 1 | บรรยาย: เมื่อท่านกลับถึงชายแดนสุวรรณภูมิ ทัพปีศาจที่เคยตะโกนข่มขู่ยืนนิ่งเป็นแถว ไม่มีเสียงอาวุธกระทบกัน กลางแถวมีทัณฑสูรยืนชูดาบขวางทาง เส้นแสงเขียวพาดอยู่บนดวงตาเขา / ทัณฑสูร: "ขวาง ไว้ ทุก ทาง ... ตัว ... กระเปี๊ยก ... ผ่าน ... ไป ... ไม่ ... ได้" / นิรา: "ท่านคะ เขายังเรียกท่านว่าตัวกระเปี๊ยกอยู่ค่ะ เสียงเดิมของเขายังอยู่ข้างใน เป็นแต่คำสั่งทับอยู่ข้างบน" | `Narration: When you return to the Suvarnabhumi frontier, the demon army that once shouted threats stands motionless in rows, with no clash of weapons. In the middle of the ranks Tanthasura stands with his sword raised across the road, a line of green light drawn across his eyes.` / `Tanthasura: "Block ... every ... road ... little ... squirt ... you ... shall ... not ... pass."` / `Nira: "Sir, he still calls you little squirt. His own voice is still inside. There is only an order laid over it."` |
| 47 | ชื่อหน้า 2 | หนึ่ง | One |
| 48 | เนื้อหน้า 2 | ทัณฑสูร: "หนึ่ง ... หนึ่ง ... ข้า ... นับ ... ตาม ... เสียง" / ยมบาทน้อย: "ทัณฑสูร ผมรู้ว่าคุณได้ยินผม ผมจะพาคุณออกมาเอง" | `Tanthasura: "One ... one ... I ... count ... by ... the voice."` / `Yama: "Tanthasura, I know you can hear me. I will bring you out myself."` |
| 54 / 57 | ชื่อซีน / ชื่อหน้า (`th-win`) | สัญญาณครอบงำชายแดน | The Signal Over the Frontier |
| 58 | เนื้อ | ทัณฑสูร: "ฮึ่ม ... หัวข้าหนักเหมือนโดนค้อนของทัพข้าเองฟาด ... เมื่อกี้ข้าทำอะไรลงไป" / ยมบาทน้อย: "คุณขวางทางผม แต่ผมไม่เป็นไรครับ" / ทัณฑสูร: "ไอ้ตัวกระเปี๊ยก อย่าเอาไปเล่าให้ใครฟังว่าข้าถูกสะกด ทัพข้าจะเสียขวัญ" / นิรา: "ดิฉันไม่ได้ยินอะไรเลยค่ะ" / ทัณฑสูร: "มีเสียงคนนับอยู่ในหัวข้า นับ 'หนึ่ง' ทั้งคืน แล้วข้าก็กลายเป็นหนึ่ง ถ้าเจ้าได้ยินเสียงนับ อย่าตอบมัน" | `Tanthasura: "Ugh ... my head feels as if my own army's hammer had struck it ... what did I just do?"` / `Yama: "You blocked my way, but I am all right."` / `Tanthasura: "Little squirt, do not go telling anyone that I was spellbound. My army would lose heart."` / `Nira: "I did not hear a thing."` / `Tanthasura: "There was a voice counting in my head. It counted 'one' all night, and then I became one. If you hear that counting, do not answer it."` |

### D4. `signal-asia-open` (63-77) และ `signal-asia-win` (78-87) · อากุระ / Akura
| บรรทัด | ระดับ | TH (คงเดิม) | EN ใหม่ |
|---|---|---|---|
| 64 / 67 | ชื่อซีน / ชื่อหน้า 1 (`asia-open`) | โซ่ที่ไม่มีใครถือ | Chains Nobody Holds |
| 68 | เนื้อหน้า 1 | บรรยาย: ที่ชายแดนบูรพา โคมแดงดับลงทั้งแถว อากุระยืนกลางทางโดยมือทั้งสองแบกโซ่เส้นยาวที่ปลายไม่ผูกกับสิ่งใด ลากบนพื้นเป็นเสียงกรอกแกรก / อากุระ: "ล่าม ไว้ ทุก ทาง ... คน ต่าง ถิ่น ... ห้าม ผ่าน" / นิรา: "เขาเกลียดการถูกล่ามมากที่สุดค่ะ แต่คำสั่งนี้เอาความเกลียดนั้นมาเป็นแรง ทำให้เขาเป็นฝ่ายล่ามเสียเอง" | `Narration: At the Eastern frontier the red lanterns have gone dark, the whole row. Akura stands in the middle of the road with both hands bearing a long chain whose end is tied to nothing, dragging along the ground with a dry rattle.` / `Akura: "Chain ... every ... road ... outsiders ... shall not ... pass."` / `Nira: "He hates being chained more than anything, sir. But this command has taken that hatred and made it his strength, so that now he is the one who chains."` |
| 72 | ชื่อหน้า 2 | สอง | Two |
| 73 | เนื้อหน้า 2 | อากุระ: "สอง ... สอง ... ข้อ ... มือ ... เบา ... ข้า ... ไม่ ... เคย ... ล่าม ... ใคร" / ยมบาทน้อย: "ผมรู้ครับ คุณไม่ใช่คนล่าม" | `Akura: "Two ... two ... my ... wrists ... light ... I ... never ... chained ... anyone."` / `Yama: "I know. You are not the one who chains."` |
| 79 / 82 | ชื่อซีน / ชื่อหน้า (`asia-win`) | สัญญาณครอบงำชายแดน | The Signal Over the Frontier |
| 83 | เนื้อ | อากุระ: "ข้อมือข้า ... เบาลง ... (มองมือตัวเอง) ข้ารู้สึกเหมือนถูกล่ามอีกรอบ แต่ครั้งนี้ข้าไม่เห็นมือของคนล่าม" / ยมบาทน้อย: "ผมเห็นครับ มือนั้นอยู่ไกลกว่านี้" / อากุระ: "เจ้าคนต่างถิ่น ศักดิ์ศรีข้าไม่ได้พัง แต่มันบุบ ข้าจะซ่อมเอง ... เสียงนับในหัวข้านับ 'สอง' มันนับเหมือนนับนักโทษ จำไว้" | `Akura: "My wrists ... are lighter ... (looks at his own hands) I feel as if I were chained again, but this time I could not see the hand that chained me."` / `Yama: "I can see it. That hand is much farther away than this."` / `Akura: "Outsider, my pride is not broken, but it is dented. I will mend it myself ... The voice in my head counted 'two'. It counted the way one counts prisoners. Remember that."` |

### D5. `signal-west-open` (88-102) และ `signal-west-win` (103-112) · วาลดริก / Valdric
| บรรทัด | ระดับ | TH (คงเดิม) | EN ใหม่ |
|---|---|---|---|
| 89 / 92 | ชื่อซีน / ชื่อหน้า 1 (`west-open`) | ราตรีที่มีคนเขียนให้ | A Night Written by Someone Else |
| 93 | เนื้อหน้า 1 | บรรยาย: หิมะที่ชายแดนปัจฉิมตกหนักผิดปกติ วาลดริกยืนนิ่งกลางลานหิมะ ไม้เท้าในมือถูกชักใบมีดออกมาครึ่งเล่ม เส้นแสงเขียวพาดอยู่บนดวงตาที่เคยเยือกเย็น / วาลดริก: "ราตรี ... ปิด ... ทุก ... ทาง ... ท่าน ... ผู้มาเยือน ... ขออภัย ... ข้า ... ไม่ ... อาจ ... เชิญ ... ท่าน ... ผ่าน" / นิรา: "แม้ตอนถูกสะกด เขายังสุภาพอยู่เลยค่ะ" | `Narration: The snow at the Western frontier falls abnormally heavy. Valdric stands motionless in the middle of the snowy square, the cane in his hand drawn halfway to show the blade, a line of green light across eyes that were once so calm.` / `Valdric: "Night ... shuts ... every ... road ... honoured ... guest ... forgive ... me ... I ... cannot ... invite ... you ... to ... pass."` / `Nira: "Even under the spell, he is still polite, sir."` |
| 97 | ชื่อหน้า 2 | สาม | Three |
| 98 | เนื้อหน้า 2 | วาลดริก: "สาม ... สาม ... ข้า ... เคย ... สะกด ... คน ... อื่น ... แต่ ... ไม่เคย ... ถูก ... เขียน ... ฝัน ... ให้" / ยมบาทน้อย: "ครั้งก่อนคุณสะกดลูกทีมของผมด้วยวิชาของคุณเอง ครั้งนี้มีคนใช้วิชาเดียวกันกับคุณ ผมจะพาคุณออกไปให้ถึงเช้า" | `Valdric: "Three ... three ... I ... have ... mesmerised ... others ... but ... never ... been ... written ... a dream."` / `Yama: "Last time you put my team under a spell with your own art. This time someone has used the same art on you. I will bring you through to the morning."` |
| 104 / 107 | ชื่อซีน / ชื่อหน้า (`west-win`) | สัญญาณครอบงำชายแดน | The Signal Over the Frontier |
| 108 | เนื้อ | วาลดริก: "ท่าน ... ขออภัย ข้าเพิ่งตื่นจากฝันที่ไม่ใช่ของข้า ราตรีของข้ายาวมาแสนนาน แต่ไม่เคยมีใครเขียนมันแทนข้ามาก่อน" / นิรา: "ท่านได้ยินอะไรไหมคะ" / วาลดริก: "เสียงนับ 'สาม' แล้วมันก็หยุด ราวกับมีคนรอ 'สี่' อยู่ โปรดระวัง ผู้ที่นับเสียงได้แบบนั้น ไม่ได้นับเพื่อความสนุก" | `Valdric: "Honoured guest ... forgive me. I have only just woken from a dream that was not mine. My night has been long beyond counting, but no one has ever written it for me before."` / `Nira: "Did you hear anything, my lord?"` / `Valdric: "The counting said 'three', and then it stopped, as though someone were waiting for 'four'. Take care. Whoever counts like that does not count for amusement."` |

### D6. `cyber-signal-close` (บรรทัด 113-132)
| บรรทัด | ระดับ | TH (คงเดิม) | EN ใหม่ |
|---|---|---|---|
| 114 | ชื่อซีน | กลับมาที่ประตูหลัง | Back at the Back Door |
| 117 | ชื่อหน้า 1 | กลับมาที่ประตูหลัง | Back at the Back Door |
| 118 | เนื้อหน้า 1 | โทรจัน-9: "[ระบบกลับสู่โหมดเฝ้าประตู] ท่านกลับมาแล้ว ข้าตามเสียงนับได้ครบ หนึ่ง สอง สาม สี่ เสียงเดียว คนเดียว" | `Trojan-9: "[System returning to gate-guard mode] You have come back. I followed the counting to the end. One, two, three, four. One voice, one person."` |
| 122 | ชื่อหน้า 2 | ลำดับที่ยังนับไม่จบ | A Count Not Yet Finished |
| 123 | เนื้อหน้า 2 | นิรา: "สัญญาณนี้นับตามลำดับโซน หนึ่ง สอง สาม สี่ แต่คนที่ถูกนับครั้งนี้เป็นปีศาจชายแดนเท่านั้นค่ะ ดิฉันกลัวว่านี่เป็นแค่การทดลอง" / ยมบาทน้อย: "ทดลองกับคนที่ผมเคยชนะแล้ว แล้วคนต่อไปที่เขาจะลองคือใคร" / นิรา: "คนที่ตัดสินแทนสาขาทั้งสี่ค่ะ ดิฉันไม่อยากพูดชื่อ" | `Nira: "This signal counts in the order of the zones, sir: one, two, three, four. But those counted this time were only the frontier demons. I fear this was only a trial run."` / `Yama: "A trial on people I have already beaten. So who will he try next?"` / `Nira: "Those who decide for all four branches, sir. I would rather not say the name."` |
| 127 | ชื่อหน้า 3 | ปิดจากข้างใน | Closed From the Inside |
| 128 | เนื้อหน้า 3 | โทรจัน-9: "ข้าจะเฝ้าประตูหลังนี้ต่อ คราวนี้ข้าจะปิดมันจากข้างในเอง ถ้ามือนั้นเอื้อมมาอีก ข้าจะบอกท่านเป็นคนแรก" / ยมบาทน้อย: "ขอบคุณ งั้นเราไปกันครับ นิรา" | `Trojan-9: "I will keep guarding this back door. This time I will close it from the inside myself. If that hand reaches out again, I will tell you first."` / `Yama: "Thank you. Then let us go, Nira."` |

หมายเหตุหัว D
- "วาระ" (หน่วยเวลาของเกม) ในแถว D2 บรรทัด 8 ผมแปลว่า "terms" ให้ Toby ตรวจกับคำที่ `i18n.js` ใช้กับ "วาระ" ในที่อื่น (เช่นข้อความ "พัก 3 วาระ") แล้วใช้คำเดียวกัน
- "ตัวกระเปี๊ยก" แปลเป็น "little squirt" ให้เข้ากับน้ำเสียงทัณฑสูรที่หยาบแต่เอ็นดู · ถ้าคุณเป้ไม่ชอบเลือก "little one"
- Nira เรียกวาลดริกว่า "my lord" (D5) เพราะเธอใช้ "ท่าน" กับเขา · เรียกยามาว่า "sir" ตามบท R2

---

## E. `z3-sev-open` · ไม่ต้องเขียนใหม่ · ให้ Toby ต่อสาย
- ฉาก `z3-sev-open` (4 หน้า · `src/z3f-severin.js`) มี `en:{ title, line }` ครบแล้วตามรายงาน T7b-2 และมีเทสต์ยืนยันว่าไม่มีอักษรไทยปน
- ปัญหาอยู่ที่ตัวนำเสนอฉากมาถึงของบอสโซน (ที่อ่าน `ZONES.west.bossArrive` / เรียกฉากนี้แทน 4 บรรทัดเดิม) ซึ่งวาดแต่ภาษาไทย (รายงาน T7b-2 หัว "ค่าที่รอคุณเป้ตัดสิน" ข้อ 2)
- งานของ Toby: ให้ตัวนำเสนอเรียกผ่าน `storyOf('z3-sev-open')` (ซึ่งผ่าน `localizeStory` ใน `story.js:74` อยู่แล้ว) หรือเลือก `page.en` ตาม `getLang()` เหมือนที่หน้าฉากอื่นทำ · ผมไม่ได้อ่านโค้ดตัวนำเสนอนั้น จึงไม่ระบุบรรทัด
- ตัวนำเสนอแบบเดียวกันนี้ใช้กับฉากมาถึงของบอสโซนอื่น (เช่นเหลียนกัง) ซึ่งเป็นไทยล้วนเหมือนกัน ไม่อยู่ในใบงานนี้ แต่ถ้า Toby แก้ที่ตัวนำเสนอ ก็จะได้ครบทุกโซนในครั้งเดียว

หมายเหตุหัว A
- A7 และ A8 ต่างจากร่างของ Toby เพียงจุดเดียวที่จำเป็นคือ A8 (ทิศที่เซอร์เบอรัสหัน) ส่วน A7 เกลาสำนวนเล็กน้อย ถ้า Toby ไม่อยากแก้ ใช้ร่างเดิมได้ ไม่ผิดตำนาน
- A12 ผมตั้งใจให้ "คงเดิม" เพราะชื่อที่ Toby ตั้งไว้สอดคล้องกับบรรทัดของลูซิเฟอร์ ("สังเวียนข้าถูกตัดสายเหมือนกัน") และอ่านเป็นธรรมชาติ ใบงานขอให้เขียนครบทุกจุด จึงระบุว่า "ตรวจแล้วใช้ต่อ" แทนการเปลี่ยนเพื่อเปลี่ยน
- A10 ก็คงเดิมด้วยเหตุผลเดียวกัน (ตรงกับแบนเนอร์ NF-3 ของ Rae)
- จำนวนจุดที่ครบ: ใบงานนับ 12 จุด ผมแยกตามที่เจอในโค้ดได้ A1-A12 (ซึ่งรวมจุดย่อย) + ท่าบอส B1 (10 ท่า) + B2 (2 ท่า) = ทุกจุดที่ติด `TODO(Rae)` ตามรายการ `…-list.txt` และรายงาน Toby T5/T7a/T8a-d ครบ ยกเว้นข้อความท่าเรือล็อก (A6) ที่ผมระบุบรรทัดไม่ได้

---

## F. ส่งต่อ

### ให้ Reese ตรวจ
**ไม่มีข้ออ้างตำนานใหม่** · ข้อความทั้งหมดอ้างจากบทและภาพที่มีอยู่แล้ว (ท่าโคลอสเซียมอ้างสเปกภาพของ Toby: แสงเงินน้ำเงินของเมดูซา · ค้อนสายฟ้าของธอร์ · ปลายไม้เท้าและม่านแสงของลูซิเฟอร์ · ลำแสงสแกนของผู้มาเยือน) สิ่งเดียวที่เป็นฉากใหม่เล็กน้อยคือ A8 (เซอร์เบอรัสก้าวมายืนเคียงวาลดริกก่อนถูกสะกด) ซึ่งสอดคล้องกับระลอก 4 ที่เซอร์เบอรัสเป็นศัตรูอยู่แล้ว
ศัพท์ศาสนา/วัฒนธรรมที่ควรให้ Chris ยืนยันเมื่อเข้าโหมด `ship`: "Avici" (อเวจี) · "karma" (กรรม) ในหัว C

### ต้องให้คุณเป้ตัดสิน
1. **คำว่า "ผู้ครอบงำ"**: บท R2-D หัว 7 (บรรทัดของโทรจัน-9 ในไฟล์ `Output/Rae/2026-11-19-avegee-r2d-zone4-end.md` / `z4g-raw.js` บรรทัด 8) เขียนว่า "ผู้ครอบงำของแต่ละโซนพ่าย" แต่ EN เขียน "controlled lord" ซึ่งหมายถึงผู้ที่**ถูก**ควบคุม ภาษาไทยที่ถูกควรเป็น "ผู้ถูกควบคุม" หรือ "ผู้ถูกครอบงำ" · ป้ายใหม่ของผม (A5, A6) ใช้ "ผู้ถูกควบคุม" · ขออนุญาตให้ Rae แก้ TH บรรทัดนั้นในไฟล์บทเดิม (ใบงานนี้ห้ามแก้) แล้วให้ Toby รันสคริปต์ดึงบทซ้ำ หรือจะคงคำเดิมก็ได้ แต่ป้ายกับบทจะใช้คำไม่ตรงกัน
2. **`cyber-duel` ยังเรียก "ผู้ตรวจการโซน 4"** ขณะที่บท R2 เรียก "อาร์คอน-ศูนย์" · ผมใส่ทั้งสองชื่อใน EN · จะให้แก้ TH ใน `story.js:61` เป็น "…ศึกตัดสินกับอาร์คอน-ศูนย์ ผู้ตรวจการโซน 4" ไหม (ไม่ใช่งานของผม ต้องให้ Toby แก้)
3. **ชื่อโลกใน EN ของ `ending` / `ending-capture`**: ผมใช้ "Avici" ตามคำแปลมาตรฐานของอเวจี · ถ้าเกมใช้ชื่ออื่นใน EN (เช่นชื่อเกมหรือ "the Underworld") ให้บอกชื่อ
4. **ขอบเขตเกินใบงาน**: ผมเขียน EN ให้ `cyber-signal-open` และ `cyber-signal-close` ด้วย (D2, D6) จะเอาหรือตัดแถวทิ้งก็ได้
5. (ไม่บังคับ) บรรทัดของยมบาทน้อยใน `z3-hypnosis-v2` หน้า 2 (`z3c-frontier.js` ราว บรรทัด 121) เป็นบทเดิมของ Rae ที่ใช้ "ข้า" ซึ่งขัดกับกติกา "ผม…ครับ" ของยามา ถ้าจะแก้: `ยมบาทน้อย: "ตั้งสติไว้ครับ! ผมจะทำลายมนต์สะกดแล้วพาทุกคนกลับมา"` (EN ของบรรทัดนี้ผมไม่ได้อ่านครบจึงไม่เสนอ)

### ข้อสังเกตสำหรับ Toby (ไม่ใช่ข้อตัดสิน)
- `RAW_BOUTS[5].move.en` มีไทยในวงเล็บ และ `RAW_BOUTS[2].name.en` มี "(D3)" ต้องตัดก่อนแสดงผล EN (ดูท้ายหัว B1)
- A6 (ท่าเรือล็อก) หาบรรทัดไม่เจอ ให้ค้น `harbourOpen` ใน `ui.js` แล้ววางข้อความ
