# AVEGEE: สถานที่ประจำโซน (Signature Locations) — Minnie 2 ต.ค. 2569

> บันทึกโดย Claudy จากรายงานของ Minnie (Minnie ไม่มีเครื่องมือเขียนไฟล์) · สถานะ: ไอเดียออกแบบเกมภายใน ยังไม่เผยแพร่ ทุกข้อเป็นสมมติฐาน

## สรุปสั้น
- เสนอ 12 แห่ง โซนละ 3 (th / asia / west / cyberhell) แต่ละแห่ง **ยึดช่องสถานีเดิม** ไม่ต้องวัดพิกัดฉากใหม่ ไม่กระทบสมดุล 28B
- ภาพสถานีแยกโซนมีอยู่แล้ว (`img/<Zone>/st-<k>-<zone>.png` ผ่าน `artUrl`) และ `syncSceneZone` override ตำแหน่ง tea/lan ต่อโซนอยู่แล้ว
  ส่วนที่ขาดคือ **ชื่อ/คำอธิบายต่อโซน** → เสนอ field `zoneVariants:{asia:{name,glyph,desc,use}}` ใน `STATIONS` แบบเดียวกับ `CREW[].names`
- เลือกสถานที่ที่ไม่เน้นทัณฑ์โหด (หอ/ศาลา/ประตู) ให้เข้ากับนโยบายลดความรุนแรงใน CONCEPT §8
- ความยาก: S = ชื่อ/ข้อความ + ภาพ 1 ไฟล์ · M = ภาพใหม่ + เอฟเฟกต์/ข้อความเล็ก · L = กลไกใหม่
- บาป 7 ชนิด: kong ฉ้อโกง · kam ผิดกาม · kha ฆ่า · pak วจีทุจริต · mao มัวเมา · bian เบียดเบียน · akata อกตัญญู
  (ปัจจุบัน krata=kong,mao · dab=kha,pak · lokan=akata · ngiw=kam · lan=bian)

## โซนสุวรรณภูมิ (th): ไตรภูมิ / ศิลปะวัดไทย
### TH-1 หอทะเบียนกรรมกลางสระ (Stilted Registry Hall) — แทน `sala` · S–M
- ⚠️ Reese: ชื่อในเกมใช้ "หอทะเบียนกรรม"/"เรือนทะเบียนกลางสระ" ห้ามใช้คำว่า "หอไตร" ในข้อความผู้เล่น · เก็บ "ทะเบียน/แฟ้ม" ไม่ใช่คัมภีร์ · พิจารณาถอดช่อฟ้า
- แรงบันดาลใจ: หอไตรวัดไทย เรือนไม้ยกใต้ถุนสูงกลางสระกันปลวก (ลักษณะสถาปัตยกรรมทั่วไป ไม่อ้างวัดใด)
- หน้าที่: หอทะเบียนกรรม กลไกเดิม · flavor "ข้าราชการนรกก็ต้องกันปลวกเหมือนกัน"
- ภาพ: "Thai teak scripture library on tall stilts in a pond, red-orange tiered roof, dim lava glow reflected in water, pixel art 3/4 view, no text, no Buddha image, no monks"
### TH-2 ศาลาท่าน้ำวิญญาณ (Riverside Landing Pavilion) — แทน `tea` · S
- แรงบันดาลใจ: ศาลาท่าน้ำวัด/บ้านริมน้ำ เข้ากับแม่น้ำวิญญาณและท่าเรือในฉาก · flavor "รอเรือนานจนต้องมีที่นั่ง"
- ภาพ: "Thai riverside landing pavilion (sala tha nam), open-sided wooden hall with gabled red roof on pier over dark river, hanging paper lanterns, wooden bench, pixel art, no text"
### TH-3 ซุ้มประตูโขงชั้นฟ้า (Khong Gate to the Heavens) — แทน `sawan` · S–M
- แรงบันดาลใจ: ประตูโขงยอดซ้อนชั้น (จำลองซุ้มวิมานเทพ — ทรงล้านนาเป็นหลัก) · ⚠️ Reese: ห้ามเขียนในเกมว่าประตูโขงคือประตูสู่ดาวดึงส์ตามคติ · ใช้นาค/มกร ไม่ใช้ครุฑ · ไม่ลอกประตูวัด/วังจริง · เสริมแสงทองเมื่อส่งดวงขึ้น
- ภาพ: "Thai ornate multi-tier gate (prathu khong) with spired roof, golden mythical naga-head finials, soft white-gold light spilling from the opening, pixel art, no text, no deity figures"
- สำรอง: ลานกรวดน้ำอุทิศบุญ — เสี่ยงข้อห้าม "ห้ามล้อพิธีกรรม" ไม่แนะนำรอบแรก

## โซนบูรพา (asia): นรกจีน / ญี่ปุ่น
### AS-1 ศาลาสิบนครา (Hall of the Ten Courts) — แทน `sala` · M
- แรงบันดาลใจ: สิบพระยม (十殿閻羅) · flavor "เสร็จหนึ่งศาล ยังเหลืออีกเก้า" (เสียดสีราชการ ไม่ล้อความเชื่อ)
- ภาพ: "Chinese underworld court hall, red lacquer pillars, row of ten small judge desks with brass seals, jade-green ghost fire, cave skull-green palette, red lanterns, pixel art, no text"
### AS-2 ร้านน้ำชาเมิ่งโพ (Meng Po Tea House / Naihe Bridge) — แทน `tea` · S (L ถ้าเพิ่มขั้นตะราง)
- แรงบันดาลใจ: เมิ่งโพ (孟婆) น้ำแกงลืมอดีตที่สะพานไน่เหอ (奈何橋) · flavor "ชาถ้วยนี้ลืมได้ทุกอย่าง ยกเว้นงานค้าง"
- ภาพ: "Small Chinese tea stall at the foot of an arched stone bridge, old woman silhouette ladling soup from a large pot, red lanterns, green-blue cave glow, pixel art, no text"
### AS-3 ต้นไม้ชั่งอาภรณ์ (Garment-Weighing Tree, Datsue-ba) — แทน `krajok` · M (L ถ้าทำกลไกใบ้)
- แรงบันดาลใจ: ดาตสึเอะบะ (奪衣婆) ริมแม่น้ำซันซุ **ริบ**เสื้อวิญญาณ แล้วคู่หูชาย Ken'e-ō (懸衣翁) เป็นคน**แขวน**บนต้น 衣領樹 กิ่งหย่อนตามน้ำหนักบาป (แก้ตาม Reese) · เป็นคติญี่ปุ่นล้วน อย่ารวมภาพกับสิบพระยม/เมิ่งโพของจีน · กลไกใบ้กำกวม ไม่แทนกระจกที่ "จริงเสมอ"
- ภาพ: "Gnarled pale tree beside a dim river, heavy kimono-like robes hanging, one branch sagging low, small hunched old-woman and old-man figures beside it, pixel art, no text"
- เลี่ยง ไซโนะกาวาระ (賽の河原) เพราะเกี่ยวกับเด็กที่เสียชีวิต

## โซนปัจฉิม (west): Helheim / ยุโรปยุคกลาง / Dante
### WE-1 หอบัญชีหลวงยุคกลาง (Exchequer Counting House) — แทน `sala` · M
- แรงบันดาลใจ: Exchequer อังกฤษยุคกลาง ผ้าตารางหมากรุก + ไม้ทอลลี เข้ากับบอส "อัศวินบัญชีปัจฉิม" · flavor "ทุกกรรมมีไม้ทอลลีหักครึ่ง"
- ภาพ: "Medieval stone counting hall, long table covered in black cloth with chequered lines, brass scales, bundles of notched tally sticks, frost on windows, ice-blue palette, pixel art, no text"
### WE-2 ประตูสะพานรุ้งบิฟรอสต์ (Bifröst Gate, Heimdall's Horn) — แทน `sawan` · M (L แตรเตือน)
- แรงบันดาลใจ: บิฟรอสต์ + แตร Gjallarhorn (ห้ามใช้ดีไซน์ Marvel) · ⚠️ Reese: ในตำนานเป่าครั้งเดียวตอน Ragnarök — กลไกแตรเตือนต้องระบุว่าเป็นการ "ดัดแปลง" · กลไกเสนอ: แตรเตือนก่อนส่งคนบาปขึ้นสวรรค์ N ครั้ง/ช่วงคดี
- ภาพ: "Glowing rainbow-light arched bridge-gate in an ice cave, tall Norse-style carved wooden posts, a large curved horn on a stand beside the gate, snowflakes, pixel art, no text, no Marvel-style character"
### WE-3 โถงของเฮล (Éljúðnir) — ชื่อไทยทับศัพท์ไม่มีแหล่งยืนยัน คงวงเล็บไว้ — แทน `tea` · S–M
- แรงบันดาลใจ: โถงของเฮล (Prose Edda/Gylfaginning) จาน "ความหิว" มีด "ความอดอยาก" · flavor "ยมทูตยิ่งพักยิ่งหิว"
- ภาพ: "Long dim Norse hall of dark timber and frost, bare plate and knife on a table, thin bed with blanket, doorway with a raised threshold, cold blue light, pixel art, no text"
- สำรอง: ทะเลสาบน้ำแข็ง Caina/Cocytus (Dante) แทน `lokan` — ต่างจากเดิมไม่มาก

## นรกเครือข่าย (cyberhell)
### CY-1 ตู้เซิร์ฟเวอร์สำรองกรรม (Backup Vault) — แทน `sala` · M (L ถ้าเพิ่มใบ้)
- แรงบันดาลใจ: intro โซน "สิ่งที่ลบไปแล้วก็ยังถูกบันทึกอยู่ที่นี่" · กลไกเสริม: เอกสาร "ข้อความที่ถูกลบ" ใบ้ 1 ครั้ง/ช่วงคดี
- ภาพ: "Dark data-center hall, tall server racks with purple glowing LEDs and cable bundles, one open rack drawer leaking pale light, circuit-pattern floor, pixel art, no text, no real brand logos"
### CY-2 ห้องขุดเหรียญนรก (Mining Rig Hall) — แทน `krata` · M
- แรงบันดาลใจ: บาปดิจิทัล (พนัน/คริปโต = mao/kong) · ไฟใต้กระทะ → ไอร้อนจากระบายความร้อน · flavor "ฟืนในโซนนี้คือค่าไฟ"
- ภาพ: "Rows of overheated crypto mining rigs with spinning fans and heat haze, coolant pipes, purple and orange glow, a large hamster-wheel-like fan in the middle, pixel art, no text, no logos"
### CY-3 ประตูยืนยันตัวตน (Verification Gate) — แทน `sawan` · S–M (L กลไกตัวตน)
- แรงบันดาลใจ: CAPTCHA/2FA "พิสูจน์ว่าไม่ใช่บอท" · เสริม: คู่กับสำนวนบัญชีถูกขโมย/ภาพตัดต่อ (innocent)
- ภาพ: "Glowing arched gateway made of circuit lines, a shield-and-checkmark hologram in the center, scan-line beams, violet-white light, pixel art, no text, no real UI logos"
- สำรอง: ห้องกักกัน Sandbox แทน `tarang` (ข้อความล้วน S)

## ผลตรวจ Reese (2 ต.ค. 2569) — FIX LIST 6 ข้อ แก้แล้วโดย Claudy (โหมด build ไม่ตรวจซ้ำ)
- รายงาน: `Output/Reese/2026-10-02-factcheck-avegee-zone-locations.md`
- ข้อ 6 ค้างตัดสินใจ: subtitle โซนบูรพา (CONCEPT §12.6) ระบุเกาหลี/อินเดีย แต่ข้อเสนอมีแค่จีน/ญี่ปุ่น → เพิ่มของเกาหลี/อินเดีย หรือแก้ subtitle
- ห้ามเรียกแม่น้ำวิญญาณในเกมว่า "เวตรณี" (เวตรณีเป็นนรกบริวาร ไม่ใช่แม่น้ำที่วิญญาณข้าม)
- CY: ตรวจภาพที่ได้จริงว่าไม่มีโลโก้/ไอคอนเลียนแบบซอฟต์แวร์จริง/เหรียญคริปโตจริง · ห้ามแสดงชื่อ "CyberHell" ในเกมไทย
- ลำดับภาพ: สั่งได้ TH-1 (ตามเงื่อนไข), AS-1, WE-1, CY-1 · AS-3/WE-2/WE-3 ใช้ prompt ที่แก้แล้ว

## ตัวเลือกแนะนำ: "ชุดหอทะเบียน 4 โซน" (TH-1, AS-1, WE-1, CY-1)
- `sala` อยู่มุมขวาบน ใหญ่ (bw=196) และเปิดบ่อยสุด → เห็นความต่างชัดทุกโซน
- งาน: ภาพ 4 ไฟล์ + ชื่อ/คำอธิบายต่อโซน (field ใหม่ใน data.js) — ไม่แตะกลไก/พิกัด/สมดุล
- เฟส 2: เมิ่งโพ (AS-2) + บิฟรอสต์ (WE-2) แล้วกลไกใบ้ AS-3 / CY-1 (L) หลังสมดุล 28B นิ่ง
- สมมติฐาน: เปลี่ยนภาพ+ชื่อของสถานีที่เปิดบ่อยสุด พอให้รู้สึกว่า 4 โซนไม่ซ้ำ (ทดสอบ: ถามหลังเล่นโซน 2 ว่า "ต่างจากโซนไทยตรงไหน")

## คำถามวิจัย / ความเสี่ยงทางวัฒนธรรม (ส่ง Reese)
**โซนไทย/พุทธ (เสี่ยงสุด)**
1. หอไตร (เก็บคัมภีร์) ในฉากนรกฐานะ "ที่เก็บแฟ้ม" ผ่านเกณฑ์ความเคารพไหม (CONCEPT §5, §9) — ภาพห้ามมีพระพุทธรูป พระสงฆ์ อักษรคัมภีร์
2. ประตูโขง/ปราสาทยอดสำหรับดาวดึงส์: ข้อห้ามทรงสถาปัตยกรรมหลวง/ศาสนสถาน? ชื่อ "ประตูสวรรค์" vs คติไตรภูมิ
3. ศาลาท่าน้ำ/แม่น้ำวิญญาณ vs แม่น้ำเวตรณี (ไตรภูมิ) — ชื่อที่ถูกกว่า
4. ลานกรวดน้ำ (อนาคต) ต้องให้ Chris/Reese ชี้ขาดก่อน
**โซนบูรพา**
5. สะกดไทย เมิ่งโพ/เมิ่งโผ, ลำดับสิบศาล, ผสมจีน+ญี่ปุ่นในโซนเดียว · sub-title โซนเขียนว่ามีเกาหลี/อินเดีย
6. ที่มา 衣領樹
**โซนปัจฉิม**
7. Exchequer = อังกฤษ แต่โซนคือ ยุโรป/อเมริกา/รัสเซีย
8. ความละเอียดอ่อน Ásatrú · ไม่ใกล้ Marvel Heimdall
9. ฉบับแปล Dante ที่เป็นสาธารณสมบัติ
**นรกเครือข่าย**
10. ห้ามโลโก้/trade dress บริษัทจริง
11. คดีบัญชีถูกขโมย/ภาพตัดต่อ ตามกติกา N1–N8/N11
**เทคนิค**
12. field ชื่อต่อโซนใน STATIONS + UI ทุกจุดอ่านชื่อจากที่เดียว
13. ภาพไม่มีตัวอักษรไทย · เข้ากับ crop/จุดยึดเดิม

## Handoff
เริ่มวิจัยที่ชุดหอทะเบียน 4 โซน (ข้อเสี่ยง 1, 5, 7, 10) — ต้องผ่านตรวจความเคารพโซนไทยก่อนสั่งภาพ
อ้างอิง: `AVEGEE/src/data.js` (STATIONS ~209, ZONES ~1662, syncSceneZone ~1725), `AVEGEE/CONCEPT.md`
