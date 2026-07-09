# Research Brief: PrintQuote AI SaaS (+ quick scan เกียรติบัตร Express)

- **Agent:** Reese (Research — MODE 1)
- **วันที่:** 9 กรกฎาคม 2026
- **Input:** Idea cards จาก Minnie (`Output/Minnie/2026-07-09-webapp-revenue-ideas.md`)
- **Legend:** ✅ VERIFIED (มีแหล่งอ้างอิง) / ⚠️ UNVERIFIED (เจอข้อมูลแต่แหล่งไม่แข็งหรือยังยืนยันไม่ได้) / 💬 OPINION (การตีความของ Reese)

---

# PRIMARY — Idea 1: PrintQuote AI SaaS

## 1. Competitor Scan

### 1.1 คู่แข่งไทย (สำคัญที่สุด: **ไม่พบคู่แข่งตรง**)

- ⚠️ UNVERIFIED (evidence of absence) — ค้นด้วยคำว่า "โปรแกรมโรงพิมพ์ ระบบเสนอราคา", "print MIS Thailand", "ERP โรงพิมพ์" **ไม่พบ SaaS ไทยที่ทำระบบเสนอราคาเฉพาะโรงพิมพ์เลย** ผลค้นหาภาษาไทยทั้งหมดเป็นโปรแกรมบัญชี/ใบเสนอราคาทั่วไป (FlowAccount, PEAK, ivomaker, GetmyCRM, SMEMOVE) ไม่มีตัวไหนเข้าใจ logic การคิดราคางานพิมพ์ (กระดาษ/เพลท/ยก/เคลือบ) — *หมายเหตุ: การไม่เจอใน search ไม่ได้แปลว่าไม่มี 100% อาจมี software house รับทำระบบเฉพาะรายที่ไม่ทำ SEO*
- ✅ VERIFIED — ฝั่ง enterprise มี [Konica Minolta Thailand ขาย print management software](https://www.konicaminolta.co.th/th/solutions_services/print-management-software/) แต่เป็น solution ระดับองค์กร ติดตั้งพร้อมเครื่องพิมพ์ ไม่ใช่ SaaS รายเดือนสำหรับ SME
- ✅ VERIFIED — ERP ทั่วไปในไทยราคาแพงกว่า target ของเรามาก: โปรเจกต์ ERP สำหรับ SME เริ่มต้นราว 300,000–1,000,000 บาท ([Packhai](https://packhai.com/erp-price/), [Quick Transformation](https://quick-transformation.com/blog-erp-cost-price-how-much/)) หรือแบบ per-user ราว ฿667–1,167/คน/เดือน ([Ecount](https://www.ecount.com/us/ecount/product/erp_affordable-erp-solution)) — ทั้งหมดเป็น ERP ทั่วไป ไม่ใช่เฉพาะโรงพิมพ์

### 1.2 คู่แข่ง global (Print MIS / estimating)

- ✅ VERIFIED — ผู้เล่นหลัก: [Ordant](https://ordant.com/pricing/), [PrintSmith Vision (ePS)](https://printepssw.com/printsmith-vision-print-shop-management-software), [DocketManager](https://www.softwareadvice.com/print-estimating/docketmanager-profile/vs/eps-printsmith-vision/), [PrintVis](https://printvis.com/), [PrintXpand](https://www.printxpand.com/print-erp-software-solution/) — ทุกตัวเป็นภาษาอังกฤษ ไม่มี localization ไทย ไม่มี LINE integration
- ⚠️ UNVERIFIED — แพ็กเกจ Ordant ระดับครบเครื่องราคา "เกือบ $1,000/เดือน" (ข้อมูลจาก [softwareconnect](https://softwareconnect.com/roundups/best-print-estimating-software/) ผ่าน search summary — ตัวเลขแน่นอนต้องขอ quote) ส่วน PrintSmith/DocketManager ไม่เปิดราคา public — ทั้งคู่ต้องติดต่อ sales
- 💬 OPINION — สำหรับโรงพิมพ์ SME ไทย เครื่องมือ global เหล่านี้ "แพงเกิน + ภาษาอังกฤษ + ซับซ้อนเกิน" — ช่องว่างตลาด (gap) ที่ Minnie ตั้งสมมติฐานไว้ **มีอยู่จริงตามหลักฐานที่หาได้**

### 1.3 AI chat quoting — มีใครทำแล้วไหม?

- ✅ VERIFIED — แนวคิด AI quoting ถูกพิสูจน์แล้วในตลาดโลก: [Gelato เปิดตัว AI Estimator](https://www.gelato.com/news/gelato-launches-ai-estimator-the-print-industry-s-first-ai-powered-quoting-engine) (อ้างว่าเป็น AI quoting engine ตัวแรกของวงการพิมพ์ ฝังหน้าเว็บ PSP ได้), ePS มี [iQuote — พิมพ์/พูดสเปกงานแล้ว AI หา estimate ใกล้เคียง](https://printepssw.com/insight/ai-print-estimating), [Jotform มี Printing Quotation AI Agent template](https://www.jotform.com/agent-templates/printing-quotation-ai-agent)
- ⚠️ UNVERIFIED — คำกล่าวในสื่อวงการว่า "กว่า 1 ใน 3 ของ commercial printers ใช้ AI แล้ว โดย estimating เป็นจุดใช้งานหลัก" ([printepssw insight](https://printepssw.com/insight/ai-print-estimating)) — เป็นข้อมูลจาก vendor ที่มีผลประโยชน์ ใช้เป็นสัญญาณทิศทางเท่านั้น
- 💬 OPINION — **ไม่พบ** ผู้เล่นรายใดทำ AI chat quoting ภาษาไทย + LINE-first + ราคาระดับ SME ไทย ณ วันที่ค้น — นี่คือ positioning ที่ยังว่างอยู่ แต่ barrier ต่ำ (Jotform template ก็มีแล้ว) ความได้เปรียบจริงคือ domain data 1,666 ใบเสนอราคา + ภาษาไทยเฉพาะทาง ไม่ใช่ตัว tech

## 2. Demand Signals

### 2.1 ขนาดตลาด (จำนวนโรงพิมพ์)

- ⚠️ UNVERIFIED — "ประเทศไทยมีโรงพิมพ์มากกว่า 3,000 แห่ง" ([thaiwebsites.com](https://www.thaiwebsites.com/printing.asp) — เว็บ directory เอกชน ไม่ใช่สถิติทางการ อายุข้อมูลไม่ชัด) ยังไม่พบตัวเลขทางการจากกรมโรงงาน/DBD ใน search รอบนี้ — แนะนำดึงจาก [Open-DBD](https://opendata.dbd.go.th/dataset/dataset_12_05) (มีชุดข้อมูลจำนวนนิติบุคคลแยกประเภทกิจการ) ก่อนใช้ตัวเลขนี้ใน pitch ใด ๆ
- ✅ VERIFIED — มูลค่าอุตสาหกรรมการพิมพ์+บรรจุภัณฑ์ไทยราว 3–3.5 แสนล้านบาท/ปี (~1.8% ของ GDP) ([Marketeer](https://marketeeronline.co/archives/285334), [The Standard](https://thestandard.co/printing-packaging-and-e-commerce/)) — *ระวัง: ตัวเลขนี้รวมบรรจุภัณฑ์ซึ่งเป็นก้อนใหญ่ ไม่ใช่ commercial print ล้วน*
- ⚠️ UNVERIFIED — โรงพิมพ์ ~80% กระจุกใน กทม.+ปริมณฑล และส่วนใหญ่บริหารแบบครอบครัว มีเพียง ~10% เป็นโรงพิมพ์ใหญ่ที่มีระบบ ([penprinting.co.th](http://www.penprinting.co.th/trip_sp01.html) — แหล่งเก่า ไม่ระบุปี) — สอดคล้องกับสมมติฐาน "SME เยอะ ยังไม่มีระบบ" แต่ต้องยืนยันอีกชั้น
- 💬 OPINION — สมมติ 3,000 ราย, SME ~90% = ตลาดเป้าหมาย ~2,700 ร้าน หากได้ 1% = 27 ร้าน × ฿590 = ~฿16,000/เดือน — เพดานเป็น "รายได้เสริมหลักหมื่น" ไม่ใช่ startup scale เว้นแต่ขยายไป ร้านป้าย/ร้าน DTF/print-on-demand ซึ่งมีจำนวนมากกว่าโรงพิมพ์ดั้งเดิม

### 2.2 SME ไทยจ่าย SaaS ไหม + ช่องทางเข้าถึง

- ✅ VERIFIED — SME ไทยคุ้นกับ subscription SaaS แล้ว: FlowAccount ขายแพ็กเกจรายปี (Pro ฿2,990/ปี ≈ ฿249/เดือน, Pro Business ฿5,490/ปี ≈ ฿458/เดือน) ([PM Accounting review](https://pmaccounting.net/flowaccount/), [flowaccount.com](https://flowaccount.com/en/)) และตลาดโปรแกรมบัญชีออนไลน์มีผู้เล่นแข่งกันหลายราย (PEAK, SMEMOVE) แสดงว่าตลาด "SME ไทยจ่ายรายเดือน/รายปีให้ software" มีจริง
- ✅ VERIFIED — LINE OA คือช่องทางหลักของ SME ไทย: บัญชี LINE OA กว่า 90% เป็นผู้ประกอบการ SME, ผู้ใช้ SME รวมหลายล้านบัญชี, ข้อความแชทร้านค้าปี 2023 สูงถึง ~7,288 ล้านข้อความ ([Marketing Oops](https://www.marketingoops.com/news/tech-update/sme-tech-update/sme-line-oa/), [Marketing Oops — LINE for Business insight](https://www.marketingoops.com/news/biz-news/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B9%84%E0%B8%8B%E0%B8%95%E0%B9%8C-line-for-business-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD-sme-%E0%B8%A2%E0%B8%B8%E0%B8%84/)) — ยืนยัน product ควรเป็น LINE-first
- ✅ VERIFIED — มีชุมชนวงการพิมพ์บน Facebook จริง เช่น กลุ่ม [งานพิมพ์ สิ่งพิมพ์ ช่างพิมพ์ หางาน-สมัครงาน](https://www.facebook.com/groups/798097103677119/), [ช่างพิมพ์หางานทำ และช่างหลังพิมพ์](https://www.facebook.com/groups/2967540973535577/) และมี [สมาคมการพิมพ์ไทย (ก่อตั้ง 2489)](https://www.thaiprint.org/) + [สหพันธ์อุตสาหกรรมการพิมพ์](https://www.printfederation.or.th/) — แต่กลุ่ม FB ที่เจอเน้น "หางาน/ช่าง" มากกว่ากลุ่มเจ้าของกิจการ; จำนวนสมาชิกแต่ละกลุ่มยังไม่ได้ยืนยัน
- 💬 OPINION — ช่องทางที่แรงที่สุดของ Kittanate ไม่ใช่ FB group แต่คือ **connection ตรงในสมาคม 40 ปี** — B2B ตลาดนิชแบบนี้ปิดการขายด้วยความไว้ใจส่วนตัว ไม่ใช่ ads

## 3. Pricing Reality Check (฿590–990/เดือน)

- ✅ VERIFIED — จุดอ้างอิงตลาด: FlowAccount ฿249–458/เดือน (จ่ายรายปี), ERP per-user ฿667–1,167/เดือน, Ordant ระดับ ~$1,000/เดือน (⚠️ ตัวเลขหลังนี้ unverified แน่นอน)
- 💬 OPINION — ฿590/เดือน **อยู่ในช่วงที่เป็นไปได้** — แพงกว่าโปรแกรมบัญชี mass-market ~2 เท่า ซึ่งสมเหตุผลถ้า pitch เป็น "พนักงานตอบราคา AI เงินเดือน ฿590" (เทียบค่าแรงคนตอบราคาจริงหลักหมื่น/เดือน) แต่ ฿990 tier ต้องมีฟีเจอร์ต่างชัดเจน (multi-user, hard-lock ราคา, รายงาน) จึงจะไม่โดนต่อรองลงมา
- 💬 OPINION — setup fee ฿2,000 สำหรับ import ราคานั้น สมเหตุผลและเป็นตัวกรองลูกค้าจริงจัง แต่ควรทดสอบ: โรงพิมพ์ไทยคุ้นกับ "จ่ายครั้งเดียวจบ" มากกว่า subscription — อาจต้องมีทางเลือก รายปี ฿5,900 (จ่ายทีเดียว) เป็นตัวหลักตามที่ Minnie เสนอ ซึ่งเข้ากับพฤติกรรมมากกว่ารายเดือน
- ⚠️ UNVERIFIED — willingness to pay จริงของโรงพิมพ์ SME ไทย **ไม่มีข้อมูล public เลย** — ตอบได้ทางเดียวคือสัมภาษณ์/pre-sell จริง (ดู Verdict)

## 4. Key Risks

1. **ความลับราคา (data privacy)** — 💬 OPINION แต่มีน้ำหนักสูง: ราคาคือความลับการค้าอันดับหนึ่งของโรงพิมพ์ และ TANAPAT **เป็นโรงพิมพ์คู่แข่งเอง** — conflict of interest ชัดเจนกว่ากรณี vendor กลาง ๆ ต้องมี (ก) แบรนด์แยกจาก TANAPAT (ข) ข้อตกลง data isolation เป็นลายลักษณ์ (ค) อาจต้องให้ tenant เก็บราคาใน storage ของตัวเอง จึงจะข้ามกำแพงนี้ได้
2. **Churn / adoption** — 💬 OPINION: ผู้ใช้เป้าหมายอายุมาก คุ้น Excel+ความจำ ถ้า AI ตอบราคาผิดครั้งเดียว (เสนอต่ำกว่าทุน) ความเชื่อถือพังทันที → ต้องมี human-approve ก่อนส่งลูกค้าในเฟสแรก ไม่ใช่ auto-send
3. **Sales effort สำหรับ solo founder** — 💬 OPINION: B2B ตลาดนิช ขายทีละร้าน onboarding ทีละร้าน (import ราคาเก่าคือแรงงานจริง) — 10 ร้านแรกคือ 10 โปรเจกต์ mini-consulting ไม่ใช่ self-serve SaaS; สอดคล้องกับที่ Minnie ประเมิน Effort L ไว้ถูกแล้ว
4. **Barrier ต่ำเชิง tech** — ✅ VERIFIED ว่ามี template/engine สำเร็จรูป (Jotform AI agent, Gelato) — moat ต้องมาจาก data + ภาษาไทยเฉพาะวงการ + ความไว้ใจในสมาคม ไม่ใช่ตัวแชท
5. **ต้นทุน AI API** — ⚠️ UNVERIFIED ยังไม่ได้คำนวณ (คำถามของ Minnie ข้อ 5): 300 queries/ร้าน/เดือน × โมเดลระดับกลาง น่าจะหลักสิบ–ร้อยบาท/ร้าน 💬 OPINION ว่าไม่ใช่ risk หลัก แต่ Dale ควรคำนวณจริงจาก token ของ printorder ก่อนตั้งราคา

## 5. VERDICT — Idea 1: **GO (แบบมีเงื่อนไข — validate ก่อน build)**

เหตุผล:
- ช่องว่างตลาดมีจริงตามหลักฐาน: ไม่พบคู่แข่งไทยตรงตัว, เครื่องมือ global แพง/อังกฤษ/ไม่มี LINE, และเทรนด์ AI quoting ถูกพิสูจน์แล้วในตลาดโลก
- Demand infrastructure พร้อม: SME ไทยจ่าย SaaS แล้ว (FlowAccount เป็นหลักฐาน), LINE OA คือช่องทางที่ตลาดเป้าหมายใช้อยู่แล้ว, และ Kittanate มี access ถึงตลาดผ่านสมาคม
- แต่คำถามชี้ขาด 2 ข้อ **ยังไม่มีหลักฐาน**: (1) โรงพิมพ์ยอมเอาราคาลับใส่ระบบของโรงพิมพ์อื่นไหม (2) willingness to pay จริง

**เงื่อนไขก่อนเขียนโค้ด multi-tenant (2–3 สัปดาห์, ต้นทุน ~0 บาท):**
1. สัมภาษณ์เจ้าของโรงพิมพ์ SME 10 ราย (ผ่าน connection สมาคม) — ถามเรื่องเวลาที่เสียกับการตอบราคา + ความกังวลเรื่องข้อมูล
2. Pre-sell: เสนอ pilot ฿2,000 setup + ฟรี 2 เดือน กับ 3 ร้าน — ถ้าไม่มีร้านไหนยอมแม้ฟรี = สัญญาณ NO-GO ชัดเจน
3. ให้ Dale คำนวณต้นทุน AI/ร้าน/เดือนจากข้อมูล printorder จริง
- ถ้า pilot ≥2 ใน 3 ร้านใช้ต่อเนื่องเดือนที่ 2 → build เต็ม; ถ้าไม่ → PIVOT เป็นเครื่องมือ internal + ขาย consulting setup รายครั้งแทน subscription

---

# SECONDARY — Idea 2: เกียรติบัตร Express (quick scan)

**ทางเลือกฟรีที่มีอยู่แล้ว — ตลาดนี้ "ของฟรีครองอยู่":**
- ✅ VERIFIED — Canva Bulk Create ทำเกียรติบัตรหมู่จาก Excel/CSV ได้ แต่**ต้อง Canva Pro (~$12.99/เดือน)** ไม่มีในแผนฟรี ([ActivityMessenger](https://activitymessenger.com/blog/how-to-create-and-issue-certificates-in-bulk-using-canva/), [CertPie comparison](https://certpie.com/blog/canva-bulk-create-vs-certpie-detailed-comparison)) — และเป็นวิธีที่ครูไทยนิยม มีคู่มือภาษาไทยแพร่หลาย ([คู่มือ ม.อุบลฯ](https://www.ubu.ac.th/web/mod/km/files/cf202409191033035510.pdf))
- ✅ VERIFIED — สาย Google ฟรี 100% แพร่หลายมากในวงการครูไทย: คู่มือ Google Sheets + Slides + Apps Script จากมหาวิทยาลัย ([มรภ.สงขลา PDF](https://edu.skru.ac.th/file/practice/noy8.pdf)), บทความ [KruJakkrapong](https://krujakkrapong.com/%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B8%84%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%B2%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%94%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C/), [Blockdit Code บ้านๆ](https://www.blockdit.com/posts/5fcf10ab2bb5ba0759fef1d9)
- ✅ VERIFIED — **มีเว็บไทยทำแล้วและแจกฟรี**: [cert.in.th](https://cert.in.th/) ระบบเกียรติบัตรออนไลน์โดยครูโรงเรียนพิริยาลัย จ.แพร่, ระบบของ [สพฐ./obec](https://sites.google.com/obec.moe.go.th/cert/home), และเว็บครูแจกไฟล์ template ฟรีจำนวนมาก ([kruchiangrai](https://www.kruchiangrai.net/2026/01/05/%E0%B9%81%E0%B8%88%E0%B8%81%E0%B8%9F%E0%B8%A3%E0%B8%B5-%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82/), [kruthaifree](https://www.kruthaifree.com/%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3-%E0%B8%9F%E0%B8%A3%E0%B8%B5-doc-%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B9%84%E0%B8%94%E0%B9%89/))
- 💬 OPINION — willingness to pay ต่ำ: วัฒนธรรมวงการครูไทยคือ "แจกฟรี/แลกเครดิต" และงบส่วนตัวครูจำกัด; ช่องจ่ายที่พอมีคือความสะดวก (ฟรีทุกทางที่มีอยู่ล้วน "ตั้งค่ายุ่ง") กับ font/ดีไซน์ราชการไทยที่ถูกต้อง — แต่บาง ๆ เกินกว่าจะยืนเป็น product เดี่ยว

**Verdict (one line): NO-GO ในรูปแบบขาย ฿99/batch — PIVOT เป็นเครื่องมือฟรี lead-gen ที่จบด้วย upsell "สั่งพิมพ์จริง+ปั๊มทองส่งถึงโรงเรียน" ซึ่งเป็นสิ่งเดียวที่ของฟรีทั้งตลาดทำไม่ได้**

---

# Open Risks ที่ต้องปิดก่อนตัดสินใจสุดท้าย (Idea 1)

1. จำนวนโรงพิมพ์ที่แม่นยำ — ดึงข้อมูลนิติบุคคลจาก Open-DBD (ตัวเลข ">3,000" ยัง unverified)
2. Willingness to pay + กำแพงความลับราคา — ไม่มีทางรู้จาก desk research ต้องสัมภาษณ์จริง 10 ราย
3. ต้นทุน AI API ต่อร้าน — Dale คำนวณจาก token log ของ printorder
4. ตรวจซ้ำว่ามี software house ไทยรับทำระบบโรงพิมพ์แบบเงียบ ๆ (ถาม connection ในสมาคมโดยตรง — เร็วกว่าค้นเว็บ)

*ทุก verdict ข้างต้นอิงหลักฐานที่ค้นได้ ณ 9 ก.ค. 2026 — ตัวเลขที่ mark ⚠️ ห้ามนำไปใช้ใน pitch/บทความจนกว่าจะยืนยัน — Reese*
