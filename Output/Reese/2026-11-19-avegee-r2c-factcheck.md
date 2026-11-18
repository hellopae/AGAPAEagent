# Reese Fact-check — AVEGEE R2 ส่วน C (`Output/Rae/2026-11-19-avegee-r2c-zone3.md`) · 19 พ.ย. 2569

> Claudy บันทึกจากข้อความที่ Reese ส่งกลับ · โหมด build ตรวจรอบเดียว

**คำตัดสิน: FIX LIST**
- ไม่มีข้อเท็จจริงหลักทางตำนานหรือวรรณคดีที่ผิด
- ต้องแก้ 4 จุดก่อนรับงาน:
  - 4.1 นิราถูกสะกด
  - 3.1 ชื่อเรียกเซอร์เบอรัส
  - 1.4 จมูกงุ้มของแม่มด
  - 3.2 EN ของวาลดริก
- ข้อที่เหลือเป็นแก้เล็ก

**ผ่าน (VERIFIED):**
- Van Helsing อยู่ใน Dracula (Stoker, 1897) และสะกดจิตมินาในบทที่ 23 และ 25
- โลกิเป็นบิดาของยอร์มุนกันดร์ (มารดาคืออังกร์โบดา) งูกัดหางตัวเอง
- โลกิเปลี่ยนรูปได้
- วาลคิรีเป็นผู้เลือกผู้ตายในศึก และถือหอก
- ศาสนา Ásatrú ยังมีผู้นับถือ (ไอซ์แลนด์รับรองปี 1973)
- Grimm KHM 26 (หนูน้อยหมวกแดง) และ KHM 15 (ฮันเซลกับเกรเทล)
- งานโฮมส์ของ Conan Doyle เป็นสาธารณสมบัติในสหรัฐครบชุดตั้งแต่ 1 ม.ค. 2023
- กติกาอัญเชิญตรงกับส่วน A และ B
- ชื่อสะกดตรงกันทั้งไฟล์
- ไม่มีที่ไหนเรียกเซอร์เบอรัสว่า Guard

## 1. ตำนานและวรรณคดี
- **1.1 (หมายเหตุภายใน)** ในนวนิยาย Van Helsing สะกดจิตมินา ซึ่งไม่ได้เป็นคนไข้
  - เปลี่ยน "การสะกดจิตคนไข้" เป็น "ความรู้เรื่องการสะกดจิต (ในนวนิยายคือการสะกดมินา ฮาร์เกอร์)"
  - เติม "เคยสะกดคนไข้มาสี่สิบปี" ลงในรายการเรื่องแต่งของ Rae (ข้อ (ค) และข้อ 8 ของคุณเป้)
- **1.2** `z3-loki-reveal` หน้า 2 (บรรทัด 458, 462): "ลูกของใครต่อใครหลายคน" ยืนยันไม่ได้ ตำนานระบุพ่อแม่ไว้ชัดคือ Fárbauti กับ Laufey
  - TH: "โลกิ ผู้เปลี่ยนรูปได้ทุกรูป และเป็นพ่อของหลายสิ่ง รวมถึงบางสิ่งที่นอนอยู่ใต้ท่าเรือของท่านด้วย ข้าเบื่อ ..."
  - EN: "Loki. Shapeshifter, and father of many things, one of them lying under your harbour, as it happens. I was bored. ..."
- **1.3** โลกิในบทเป็นแบบเบาลง ไม่ต้องแก้บท แต่ในเอกสารส่งต่อให้เขียนว่า "แรงบันดาลใจจากโลกิในปกรณัมนอร์ส ปรับให้เบาลง" ห้ามเขียนว่า "ตรงตำนาน"
- **1.4 (ต้องแก้)** `face` ของ `gingerwitch` (บรรทัด 518) และภาพ G2 (บรรทัด 831): กริมม์ไม่ได้บรรยายว่าแม่มดจมูกงุ้ม แต่บอกว่าตาแดง มองไกลไม่ชัด และดมกลิ่นไว ภาพจมูกงุ้มเป็นภาพเหมารวมที่อ่อนไหว
  - TH: "หลังค่อม ผ้ากันเปื้อนเปื้อนแป้งกับน้ำตาลไหม้ ฝ่ามือหนาด้านเพราะนวดแป้งมาทั้งชีวิต ตาแดงเรื่อและมองไกลไม่ถนัดอย่างที่เรื่องเล่าให้เป็น แต่เหนื่อยแบบคนนอนน้อย"
  - EN: "Stooped, her apron floury and flecked with burnt sugar, her palms thick from a lifetime of kneading dough. Her eyes are reddened and see poorly at a distance, as the old tale has it, and tired like those of someone who sleeps too little."
  - ภาพ G2: "ตาแดงเรื่อ มองไกลไม่ถนัด ไม่เน้นจมูก"
- **1.5 HOME-67 ผ่าน** ไม่มีประโยคหรือฉากเด่นจากฉบับดัดแปลงที่ยังมีลิขสิทธิ์
  - (ไม่บังคับ) บรรทัด 726 เผยปมแวน เฮลซิงเร็วเกินไป
  - TH: "คุณมีก้อนขี้ผึ้งหนึ่งก้อนในกระเป๋าเสื้อ ผมจำได้ว่ามันเป็นของคนที่ระวังเสียงมานาน เก็บไว้ให้ดีครับ"
  - EN: "You carry a lump of beeswax in your coat pocket. I recognise it as belonging to someone who has long been wary of certain sounds. Keep it well."
- **1.6** เอียร์ลิน วาลคิรี และยอร์มุนกันดร์ผ่าน ปีกและหมวกมีปีกเป็นภาพแบบสมัยใหม่ ห้ามเขียนว่า "ตามตำนาน"

## 2. ความเคารพ — ผ่านแบบมีเงื่อนไข
- โลกิปลอมเป็นบาทหลวงไม่ล้อศาสนาคริสต์ แต่ภาพ L1 และ L3 ต้องไม่มีสัญลักษณ์ศาสนา และไม่แต่งชุดนักบวชแบบตลก
- รอบ ship ให้ chris-culture ตรวจ

## 3. ภาษาและชื่อ
- **3.1 (ต้องแก้) ชื่อเรียกให้ตรงกับส่วน B**
  - เซอร์เบอรัส = "ผู้พิทักษ์ประตูปัจฉิม" / `Guardian of the Western Gate`
  - แวน เฮลซิง = "ผู้เฝ้าด่านปัจฉิม" / `Gate Guard of the West`
  - แก้ตาราง 0.3, ข้อ 0.4 ข้อ 4 และหัวข้อ 7
  - หัว `z3-arrive`: TH "ผู้พิทักษ์ประตูปัจฉิมยอมเปิดให้ท่าน" / EN "The Guardian of the Western Gate Let You Through"
  - หัว `z3-vh-guard` EN: "The Gate Guard of the West"
- **3.2 (ต้องแก้)** `claims` ของวาลดริกที่เพิ่มใหม่ในหัวข้อ 2.10 (บรรทัด 331) ยังไม่มี EN
  - `en`: "I never drew first against Van Helsing, not once in the seven times he came."
  - `en_reveal`: "Yama opens the notebook Van Helsing himself holds out. Across seven visits there is not one line recording that Valdric struck first. The last line is in Van Helsing's own hand, written short: 'I still do not understand.'"
- **3.3** สำนวนไต่สวนของ 3 คดีใหม่ (`redhood`, `lokipriest`, `gingerwitch`) มีแต่ TH → **Claudy ตัดสิน: ต้องมี EN ครบเหมือนคดีเดิม** (ใบงานกำหนด TH/EN)
- 3.4 (ไม่บังคับ) ยามาใช้ "ข้า/เจ้า" ใน `z3-hypnosis-v2` ซึ่งคงมาจากโค้ดเดิม
- **3.5** ข้อ 6.1 เขียนเวลาของคดีญาติ 5 ขัดกันเอง แก้เป็น "คดีญาติ 5 ยังขึ้นหลังคดีครบ 10 และต้องจ้างก่อน ตามกติกาเดิม ซึ่งถึงตอนนั้นแวน เฮลซิงเป็น Guard แล้วแน่นอน (ได้ตั้งแต่คดีครบ 5) จึงไม่ติดเงื่อนไขเพิ่ม"

## 4. เทียบต้นฉบับคุณเป้
- **4.1 (ต้องแก้ · Claudy พบ)** ต้นฉบับเขียนว่า "สะกดจิต เพื่อนในทีมเราทุกคน … ยกเว้น แวน เฮลซิง ที่ทนได้" ดังนั้นนิราต้องถูกสะกดด้วย จุดที่ต้องแก้:
  - บรรทัด 241, 246, 255
  - ข้อ 2.1 ข้อ 6 และข้อ 2.4 บรรทัด 233–234
  - ภาพ V4 (บรรทัด 818)
  - ข้อ 2 ของ "คุณเป้ตัดสิน" (บรรทัด 902) ให้ลบ
  - ข้อ 6 ของ "ผลต่อส่วน D" (บรรทัด 884)

  ข้อความที่เสนอ:
  - `z3-hypnosis-v2` หน้า 1
    - TH: "เขายกไม้เท้าขึ้นอีกครั้ง หมอกบางเป็นเส้นพุ่งผ่านลานเข้าหูของโพเอน่า นัวร์ และนิรา ตาของทั้งสามหมองลงทีละน้อย มือที่เคยถืออาวุธและสมุดบันทึกข้างเดียวกับยามาค่อย ๆ หันปลายมาหาเขา"
    - EN: "He raises his cane again. Thin threads of mist shoot across the yard into the ears of Poena, Noir and Nira. Their eyes dim by degrees. The hands that held weapons and the ledger beside Yama slowly turn their points toward him."
  - หน้า 2 บรรทัดนิรา
    - TH: "ท่านคะ ... ดิฉันได้ยินเสียงเดียว บอกว่า 'ปราบ' ... ดิฉันนับเสียงเท้าอย่างที่ท่านมูซาชิเตือน หนึ่ง สอง ... ขออภัยค่ะท่าน ดิฉัน ... นับไม่ทัน"
    - EN: "Sir ... I hear one voice saying 'subdue' ... I am counting footsteps as Lord Musashi warned. One, two ... forgive me, sir. I ... cannot count fast enough."
  - ตอนตื่นจากการสะกด บรรทัดนิรา
    - TH: "ท่านคะ ดิฉันขออภัย ดิฉันนับเสียงเท้าได้เพียงสามก้าวก่อนเสียงนั้นกลืนไป ดิฉันขอจดไว้ว่าการนับอย่างเดียวไม่พอต้านมนต์นี้ค่ะ"
    - EN: "Forgive me, sir. I counted three footsteps before that voice swallowed the rest. I note for the record that counting alone is not enough to resist this spell."
  - บรรทัดแวน เฮลซิง
    - TH: "...ท่านทั้งสามไม่ผิดที่โดน"
    - EN: "...You three are not at fault for being caught."
  - บรรทัด 231
    - TH: "ท่านผู้ถือบัญชี ทุกคนที่ยืนอยู่เบื้องหลังท่านตอนหมอกหนาที่สุด ขอให้ท่านอย่าเอาหลังให้ใครโดยไม่ระวัง"
    - EN: "Keeper of the ledger, everyone who stands at your back when the mist is thickest. Please do not turn your back on anyone without care."
  - ภาพ V4: "นิราตาหมองเช่นกัน มือที่ถือสมุดบันทึกกำแน่น หันมาทางยามา"
  - ข้อ 6 ส่วน D: "นิราพยายามนับเสียงเท้าแต่ไม่ทัน แล้วเธอพูดในฉากตื่นว่าการนับอย่างเดียวไม่พอ"
  - **Claudy ตัดสิน:** นิราเป็นศัตรูในระลอก 4 พร้อมโพเอน่าและนัวร์ (ระลอกเดียวกัน)
- **4.2** ต้นฉบับเขียนว่าแวน เฮลซิง "กำลังสู้กับ" วาลดริก ให้เติมท้ายบรรยาย `z3-vh-frontier` หน้า 1 และปรับภาพ V2 ให้ตรง
  - TH: "ที่เท้าของชายเสื้อคลุมเทา ปีศาจสองสามตนนอนนิ่งอยู่บนหิมะ ชายเสื้อของเขามีรอยไหม้ที่ขอบ และลมหายใจหนักเหมือนคนที่สู้มาทั้งคืน"
  - EN: "At the grey-coated man's feet, two or three demons lie still on the snow. Scorch marks edge his coat, and he breathes like a man who has been fighting all night."
- **4.3** ย้าย N5-5 (ปุ่ม "ไปที่แท่น") ไปไว้หลัง `z3-vh-guard` จบ เพราะตอนนี้บทซ้ำกัน และผู้เล่นกดข้ามขั้น Guard ได้
- **4.4** ตาราง 0.2 ให้เติม 3 แถว:
  - z3 4.1 → ถูกแทน (5.1)
  - z3 3.1 → ใช้ + เพิ่มขั้นฝากไฟ (4.1)
  - z3 1.7/2.10 → ถูกแทนด้วยหัวข้อ 9
- 4.5 ฉาก G12, G24–G26 และ D2–D7 ครบ

## Claudy ตรวจภาพ `img/frontier-west-hypnosis-v1.webp` (19 พ.ย.)
- ในภาพมีวาลดริกยืนตรงกลาง ยื่นมือร่ายมนต์ มีวิญญาณหรือลูกเรือ 6 ตัวตาวงม่วงถูกสะกด ไม่มีแวน เฮลซิง และไม่มีตัวที่ชัดว่าเป็นโพเอน่า นัวร์ หรือนิรา
- ใช้แทนช่วง "วิญญาณถูกสะกด" ไปก่อนได้ แต่ฉากสะกดทีมยกเว้นแวน เฮลซิงต้องวาดภาพ V4 ใหม่

## Sources
- https://en.wikipedia.org/wiki/Abraham_Van_Helsing
- https://www.litcharts.com/lit/dracula/chapter-23
- https://standardebooks.org/ebooks/bram-stoker/dracula/text/chapter-25
- https://en.wikipedia.org/wiki/J%C3%B6rmungandr
- https://mythopedia.com/topics/loki/
- https://www.ebsco.com/research-starters/literature-and-writing/valkyries-norse-mythology
- https://en.wikipedia.org/wiki/%C3%81satr%C3%BAarf%C3%A9lagi%C3%B0
- https://sites.pitt.edu/~dash/grimm015.html
- https://sites.pitt.edu/~dash/grimm026.html
- https://www.pbs.org/newshour/arts/sherlock-holmes-classic-tales-and-songs-enter-public-domain-in-2023
- https://www.ksat.com/news/politics/2022/12/30/2023-public-domain-debuts-include-last-sherlock-holmes-work/
- หมายเหตุ Reese: ผลค้นหา 1 รายการ (เรื่อง Ásatrú) มีข้อความสั่ง AI แทรกมา ไม่ได้ทำตาม
