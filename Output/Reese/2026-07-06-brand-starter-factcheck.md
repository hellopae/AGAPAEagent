# Fact-check Report: "TANAPAT Printing — Brand Asset Starter Pack"

**File reviewed:** `Output/Mind/2026-07-06-brand-starter.md`
**Reviewer:** Reese [Fact-check]
**Date:** 2026-07-06
**ขอบเขต:** ตรวจทุก factual claim ในเอกสาร — ครอบคลุม 5 จุดที่ Mind mark ไว้ (FC-1 ถึง FC-5) + claim เชิงข้อเท็จจริงอื่นที่พบ (ค่าสี, ธรรมเนียม, ข้อมูลเทคนิคการพิมพ์) — design spec/นโยบายสตูดิโอที่ไม่ใช่ข้อเท็จจริงถูก mark เป็น 💬

---

## Claim Inventory (16 claims + 1 advisory)

### C1 — Production baseline: CMYK / 300dpi / bleed 3mm / safe margin ≥5mm (บรรทัด 7)
**Verdict:** ✅ VERIFIED
มาตรฐานเดียวกับที่ verify แล้วในรายงาน `2026-07-06-print-mistakes-v3-factcheck.md` (C6, C7, C9) — 300dpi ที่ขนาดจริง + bleed 3mm เป็นมาตรฐานสากล; safe margin ≥5mm อยู่ฝั่ง conservative ของช่วงแนะนำ (3–5mm) ยิ่งปลอดภัย
**Sources:** [PrintNinja — Recommended Resolution](https://printninja.com/printing-resource-center/printninja-file-setup-checklist/offset-printing-guidelines/recommended-resolution/), [ColorCopiesUSA — Bleed Guide](https://www.colorcopiesusa.com/complete-guide-to-creating-files-with-bleed.html)

### C2 — ตารางค่าสี Hex ↔ CMYK ทั้ง 7 สี (ข้อ 1)
**Verdict:** ✅ VERIFIED (ในฐานะ "ค่าปัด" ตามที่เอกสารระบุเอง)
ตรวจด้วยการคำนวณ (hex → naive CMYK และ render ค่า CMYK ในเอกสารกลับเป็น hex):
- ส้มจีวร, ครามไทย, ชมพูบัว, ทองบุญ, แดงชาด, ครีมงาช้าง → ค่า CMYK ในเอกสาร render กลับมาใกล้เคียง hex ต้นทาง (คลาดเคลื่อนระดับค่าปัด ยอมรับได้)
- **หมายเหตุ (ไม่ใช่ blocker):** น้ำตาลไม้สัก `#4A3728` — ค่า CMYK 45/60/70/60 เป็น rich-brown build ที่ render เข้มกว่า hex ราวหนึ่งขั้น (≈`#38291F`) ขณะที่ naive conversion ได้ ~0/26/46/71 — build แบบเติม C เป็น practice ที่ถูกต้องสำหรับน้ำตาลเข้มบน coated แต่ให้ Chris เช็ค proof จุดนี้เป็นพิเศษตาม disclaimer ที่เอกสารเขียนไว้แล้ว
Disclaimer "ค่าปัดสำหรับ coated — proof กับโรงพิมพ์ก่อนผลิต" ในเอกสารครอบคลุมความคลาดเคลื่อนเหล่านี้อย่างถูกต้อง

### C3 — ส้มจีวร + ทอง = สีที่คนไทยผูกกับทำบุญ/ผ้าไตร/ทองเปลว (ข้อ 1, เหตุผลการเลือก)
**Verdict:** ✅ VERIFIED
พระสงฆ์เถรวาทไทยครองจีวรสี saffron/ochre ตามพุทธานุญาตเรื่องสีย้อมธรรมชาติ; การปิดทองเปลวพระพุทธรูปเป็นการแสดงความเคารพ/ทำบุญที่แพร่หลาย — ความเชื่อมโยงสี↔การทำบุญมีฐานจริง
**Sources:** [NobleChatter — Saffron robes significance](https://noblechatter.com/faq/4788/thai-buddhism/what-is-the-significance-of-the-saffron-robes-worn-by-thai-monks), [Encyclopedia.com — Robes and Clothing](https://www.encyclopedia.com/religion/encyclopedias-almanacs-transcripts-and-maps/robes-and-clothing), [Travelglaze — Meaning of Colours in Thailand](https://travelglaze.com/meaning-of-colours-in-thailand/)

### C4 — 🔍 **[FC-1]** คู่สีดำ-ขาว/ม่วงเข้ม-ดำ = โทนไว้ทุกข์ ไม่เหมาะงานมงคลในบริบทไทย (ข้อ 1)
**Verdict:** ✅ VERIFIED — พร้อม nuance เรื่องขอบเขตของ "ม่วง" ตามที่ Mind ถามไว้
1. **ดำ-ขาว = สีไว้ทุกข์ไทยปัจจุบัน** — ยืนยัน: งานศพ/ช่วงไว้ทุกข์ไทยใช้ดำ, ขาว, หรือโทนหม่น (ขาวเป็นสีไว้ทุกข์ดั้งเดิมก่อนรับธรรมเนียมดำจากตะวันตก; ครอบครัวเชื้อสายจีน-ไทยใช้ขาวเป็นหลัก)
2. **ม่วง** — มีสองบริบทจริงตามที่ Mind สงสัย:
   - บริบทไว้ทุกข์: ธรรมเนียมไทยเดิมม่วงเป็นสีไว้ทุกข์ของ **แม่ม่าย** โดยเฉพาะ (แขกอื่นใส่ดำ)
   - บริบทมงคล: ม่วงเป็น **สีประจำวันเสาร์** และเป็นสีธงประจำพระองค์สมเด็จพระนางเจ้าสุทิดาฯ (ประสูติวันเสาร์) — ช่วงวันเฉลิมฯ 3 มิ.ย. ทั่วประเทศประดับธงม่วง
   - **สรุปขอบเขต:** กติกาของ Mind ("เลี่ยงม่วงเข้ม-ดำบนการ์ดงานบุญเฉลิมฉลอง") สมเหตุสมผลและปลอดภัย — แต่ม่วงไม่ใช่สีต้องห้ามโดยตัวมันเอง ถ้าอนาคตมีงานธีมวันเสาร์/เฉลิมพระเกียรติ ม่วงใช้ได้ในบริบทนั้น แนะนำ Mind เติมวงเล็บขอบเขตนี้ 1 บรรทัด (ไม่บังคับ ไม่ใช่ blocker)
**Sources:** [Thailand Foundation — Thai Funerals](https://thailandfoundation.or.th/thai-funeral/), [Funeral Guide — Colours of Mourning](https://www.funeralguide.co.uk/blog/mourning-colours), [Cravens — Colours of mourning around the world](https://www.cravens-funerals.com/blog/colours-of-mourning-around-the-world/), [The Thailand Life — Days & Their Colors](https://www.thethailandlife.com/color-day-thailand), [CRW Flags — Personal Flag of H.M. Queen Suthida](https://www.crwflags.com/fotw/flags/th_qsut.html)

### C5 — 🔍 **[FC-2]** แคมเปญ "Buddha is not for decoration" ของ Knowing Buddha Organization (ข้อ 3.2)
**Verdict:** ✅ VERIFIED
องค์กรมีจริง: **Knowing Buddha Organization (KBO)** ก่อตั้ง พ.ศ. 2555 (2012) โดยอาจารย์อัจฉราวดี วงศ์สกล สโลแกนหลักตรงตามที่อ้าง: "Buddha is not for decoration" และ "Respect is common sense" — ป้ายรณรงค์ติดที่สนามบิน/บิลบอร์ดเข้ากรุงเทพฯ จริง จุดยืนต่อสินค้าเชิงพาณิชย์ตรงตามที่ Mind เขียน: คัดค้านการพิมพ์พระพุทธรูปบน merchandise, ใช้เป็นของตกแต่ง, ใช้ชื่อ Buddha ในเชิงการค้า — เคยกดดันแบรนด์ระดับ Zara Home / Louis Vuitton / Disney และโรงงานฝรั่งเศสที่พิมพ์พระพักตร์บนสุขภัณฑ์สำเร็จมาแล้ว
**Sources:** [knowingbuddha.org (เว็บทางการ — do's & don'ts)](https://www.knowingbuddha.org/), [The Bali Times — KBO founder](https://www.thebalitimes.com/headlines/knowing-buddha-organization-founder-awakening-the-world/), [The World (PRX) — Thai organization's crusade](https://theworld.org/stories/2021/03/09/thai-organization-s-crusade-against-blaspheming-buddha), [Bangkok Post — False idols upset crusading Buddhists](https://www.bangkokpost.com/thailand/politics/342085/false-idols-upset-crusading-buddhists)
**Source credibility:** สูง — เว็บทางการขององค์กร + สื่อระดับชาติ/นานาชาติหลายแหล่งอิสระตรงกัน

### C6 — 🔍 **[FC-3]** การใช้พระพุทธรูปเชิงการค้า "อาจเข้าข่าย" ความผิดตามกฎหมายไทย (ข้อ 3.2)
**Verdict:** ✅ VERIFIED (ในรูป hedged claim ตามที่เขียน — "อาจเข้าข่าย" ถูกต้อง อย่าตัด hedge ออก)
มาตราที่เกี่ยวข้อง: **ประมวลกฎหมายอาญา มาตรา 206** — "ผู้ใดกระทำด้วยประการใด ๆ แก่วัตถุหรือสถานอันเป็นที่เคารพในทางศาสนา...ในลักษณะที่น่าจะเป็นการเหยียดหยามศาสนา" โทษจำคุก 1–7 ปี หรือปรับ 20,000–140,000 บาท หรือทั้งจำทั้งปรับ (แหล่งเก่าบางแห่งยังแสดงค่าปรับ 2,000–14,000 บาท ซึ่งเป็นอัตราก่อนการปรับค่าปรับสิบเท่า — ใช้ตัวเลขปัจจุบัน) + พ.ร.บ.คณะสงฆ์คุ้มครองการหมิ่นพระสงฆ์เพิ่มอีกชั้น
**ขอบเขตการบังคับใช้จริง (สำคัญ):** การผลิต/จำหน่ายพระพุทธรูป-พระเครื่องโดยเคารพเป็นเรื่องถูกกฎหมายและแพร่หลายในไทย — มาตรา 206 เอาผิดที่ **ลักษณะการกระทำที่น่าจะเหยียดหยาม** ไม่ใช่การค้าโดยตัวมันเอง ความเสี่ยงหลักของงานพิมพ์เชิงพาณิชย์คือกระแสสังคม/แพลตฟอร์ม (ดู C7) มากกว่าคดีอาญา — การเขียนแบบ hedge ของ Mind จึงแม่นยำแล้ว
**Sources:** [Thai Law Online — Section 206](https://www.thailawonline.com/thai-criminal-code/section-206/), [Siam Legal Library — Criminal Code Religion 206–208](https://library.siam-legal.com/thai-law/criminal-code-religion-sections-206-208/), [End Blasphemy Laws — Thailand](https://end-blasphemy-laws.org/countries/asia-central-southern-and-south-eastern/thailand/), [US State Dept — Religious Freedom Report: Thailand](https://www.state.gov/reports/2019-report-on-international-religious-freedom/thailand)

### C7 — "การนำไปใช้เชิงการค้าเสี่ยงกระแสตีกลับรุนแรง" (ข้อ 3.2)
**Verdict:** ✅ VERIFIED
มีกรณีจริงต่อเนื่อง: แคมเปญ boycott ของที่ระลึกรูปพระพุทธรูป, กรณีสุขภัณฑ์/พรม/รองเท้าแตะ/ชุดว่ายน้ำลายพระที่ถูกกดดันจนแบรนด์ต่างชาติต้องขอโทษ/เลิกผลิต
**Sources:** [Coconuts Bangkok — 'Misused' Buddha images](https://coconuts.co/bangkok/features/tattoos-toilet-seats-misused-buddha-images-make-blood-boil/), [The Buddhist News — Boycott Buddha souvenirs](https://thebuddhist.news/headline-news/campaign-calls-on-tourists-to-boycott-buddha-souvenirs/), [Bangkok Post — Dutch apology for Buddha toilet images](https://bangkokpost.com/news/politics/332248/netherlands-apologises-for-buddha-images-on-toilets)

### C8 — "ห้ามวาดพระพุทธเจ้า/พระพุทธรูปเป็นตัวการ์ตูน anime เด็ดขาด" (ข้อ 3.2)
**Verdict:** 💬 OPINION / นโยบายสตูดิโอ — ผ่าน
เป็นกติกาภายใน ไม่ใช่ factual claim — สอดคล้องกับจุดยืน KBO (C5) และลดความเสี่ยง C6/C7 จริง ถือเป็น policy ที่มีฐานข้อเท็จจริงรองรับ

### C9 — เงื่อนไขการวาดพระสงฆ์ (เฉพาะอิริยาบถสำรวม) (ข้อ 3.2)
**Verdict:** 💬 OPINION / นโยบายสตูดิโอ — ผ่าน
กติกาภายใน สอดคล้องทิศทางเดียวกับ C5/C7

### C10 — 🔍 **[FC-4]** ธรรมเนียม "สัญลักษณ์เคารพต้องไม่อยู่ต่ำ/ถูกเหยียบ" ครอบคลุม เสื่อ พรม รองเท้า เสื้อผ้าท่อนล่าง (ข้อ 3.2)
**Verdict:** ✅ VERIFIED — ขอบเขตที่ Mind ระบุตรงกับความเข้าใจตลาดไทยจริง
หลักฐานตรง: KBO และสื่อไทย/นานาชาติระบุว่าการวางพระเศียร/รูปพระบนพื้นหรือ "ของที่ถูกเหยียบ" เป็นการเหยียดหยามที่ชัดเจนที่สุด — ตัวอย่างสินค้าที่เคยเป็นกรณีจริง: **พรม/rugs, รองเท้าแตะ, skateboard, ชุดว่ายน้ำ, สุขภัณฑ์** และหลักว่าพระพุทธรูป "ต้องอยู่ที่สูงสุดในบ้าน ห้ามเข้าใกล้เท้า" ตรงกับสามัญสำนึกหัว-สูง/เท้า-ต่ำของวัฒนธรรมไทย — รายการสินค้าที่ Mind ห้าม (เสื่อรองจาน, พรม, รองเท้า, เสื้อผ้าท่อนล่าง) อยู่ในขอบเขตนี้ทั้งหมด
**Sources:** [Coconuts Bangkok](https://coconuts.co/bangkok/features/tattoos-toilet-seats-misused-buddha-images-make-blood-boil/), [The World (PRX)](https://theworld.org/stories/2021/03/09/thai-organization-s-crusade-against-blaspheming-buddha), [knowingbuddha.org — Do's & Don'ts](https://www.knowingbuddha.org/), [Explore — Souvenir rule in Thailand](https://www.explore.com/1755654/one-rule-tourists-should-know-before-buying-souvenirs-thailand/)

### C11 — 🔍 **[FC-5]** นโยบาย Etsy / Gumroad เรื่อง religious items (ข้อ 3.2)
**Verdict:** ✅ VERIFIED — ทั้งสองแพลตฟอร์ม **ไม่มีข้อห้าม/tag บังคับเฉพาะสินค้าศาสนา** ณ วันที่ตรวจ
1. **Gumroad** (ตรวจจากหน้า official โดยตรง): รายการ prohibited ~55 หมวด **ไม่มีหมวด religious/spiritual items** — หมวดใกล้เคียงที่สุดคือ "fortune telling services" ซึ่งไม่เกี่ยวกับ printable template → ขายได้
2. **Etsy**: นโยบาย Prohibited Items ไม่มีหมวดห้ามสินค้าศาสนาและไม่มี tag บังคับ — ข้อที่เกี่ยวทางอ้อมคือ (ก) ห้าม items that promote/glorify hatred (รวมถึงเชิงศาสนา — งานของเราไม่เข้าข่าย) (ข) กฎ IP/handmade ทั่วไป
3. **ข้อควรจับตา:** หน้านโยบาย Etsy ปัจจุบันระบุ "Effective Until **August 11, 2026**" — มี version ใหม่กำลังจะบังคับใช้ → ขั้นตอน "เช็คนโยบายก่อนขึ้น listing แรก" ที่ Mind เขียนไว้ต้องทำจริง และให้เช็คซ้ำหลัง 11 ส.ค. 2026
**Sources:** [Gumroad — Prohibited products (official)](https://gumroad.com/prohibited), [Etsy — Prohibited Items Policy (official)](https://www.etsy.com/legal/prohibited/), [LitCommerce — Etsy Prohibited Items 2026](https://litcommerce.com/blog/etsy-prohibited-items/), [ShopShield — Etsy Prohibited Items List](https://shop-shield.com/blog/etsy-prohibited-items-list-2025)
**Source credibility note:** Gumroad ตรวจจากหน้า official โดยตรง (สูง); หน้า official ของ Etsy บล็อกการดึงเนื้อหาอัตโนมัติ (403) จึงยืนยันผ่านชื่อ/URL หน้า official + คู่มือ seller ปี 2025–2026 หลายแหล่งอิสระที่ตรงกัน (กลาง-สูง) — ให้คนเปิดหน้า official ด้วยตาตอน pre-listing check ตามข้อ 3

### C12 — ครามไทยเป็น "สีไทยดั้งเดิม (ผ้าย้อมคราม)" (ข้อ 1, เหตุผลการเลือก)
**Verdict:** ✅ VERIFIED
ผ้าย้อมครามธรรมชาติเป็นภูมิปัญญาไทยจริง — "ผ้าครามธรรมชาติสกลนคร" ขึ้นทะเบียน **GI** เมื่อ 11 มี.ค. 2558 และสกลนครได้รับการรับรองเป็น World Craft City for Natural Indigo
**Sources:** [Agrinews Thai — ผ้าครามธรรมชาติสกลนคร GI](https://www.agrinewsthai.com/did-you-know/170886), [TAT — สีครามแห่งสกลนคร](https://thai.tourismthailand.org/Articles/indigo-sakon-nakhon-th)

### C13 — "gradient ไล่เฉดยาว พิมพ์ CMYK เสี่ยง banding" (ข้อ 2)
**Verdict:** ✅ VERIFIED
Banding ในงานพิมพ์ gradient เป็นปัญหาจริงที่วงการ prepress เตือนตรงกัน โดยเฉพาะ gradient ช่วงยาว/สีอ่อน — คำแนะนำเลี่ยง gradient ยาวหรือเติม noise ตรงกับ practice มาตรฐาน
**Sources:** [Selfnamed — Fixing Gradient Banding in Print Files](https://help.selfnamed.com/en/articles/10031908-fixing-gradient-banding-in-print-files), [KCB Graphics — Correcting Banding in Gradients](https://www.kcbgraphics.com/blog/correcting-banding-in-gradients)

### C14 — "ทอง CMYK เป็นทองด้าน — ทองเมทัลลิกจริงต้อง spot color/foil" (ข้อ 1, กติกา contrast)
**Verdict:** ✅ VERIFIED
หมึก CMYK สะท้อนแสงแบบโลหะไม่ได้ — พิมพ์ออกมาเป็นโทนเหลือง-น้ำตาลด้าน; ประกายโลหะจริงต้องใช้ metallic spot ink (เช่นตระกูล Pantone 871–877) หรือ foil stamping
**Sources:** [PrintNinja — Metallic Ink and Spot Color Setup](https://printninja.com/printing-resource-center/printninja-file-setup-checklist/specialty-options-setup-guides/metallic-ink-and-spot-color-setup-guide/), [CMYKgold.com](https://cmykgold.com/), [Jack and Mo — Gold foil printing](https://jackandmo.com/gold-foil-is-stunningly-beautiful-but-how-do-you-print-it/)

### C15 — ลายกนก / พุ่มข้าวบิณฑ์ เป็นลายไทยแม่บทจริง ใช้ในงานเชิงศาสนา (ข้อ 2, 3.1)
**Verdict:** ✅ VERIFIED
กนก/กระหนกเป็นแม่ลายไทยพื้นฐาน (ทรงเปลวไฟ/ใบไม้ม้วน ใช้ในตู้พระธรรม บานประตูวัด); พุ่มข้าวบิณฑ์มาจากทรงข้าวบิณฑ์ที่ใช้ในการบูชา นิยมในงานเชิงศาสนา — การเลือกสองลายนี้เป็นภาษาแบรนด์เหมาะสมตรงบริบท
**Sources:** [Wikipedia — Kranok pattern](https://en.wikipedia.org/wiki/Kranok_pattern), [JitdraThanee — Basic traditional Thai designs](https://www.jitdrathanee.com/studio/lesson04.htm)

### C16 — สเปกภาพประกอบ: line weight 2–2.5pt, chibi 3–4 หัว, cel-shading 2 ระดับ, เงา ~15% (ข้อ 2)
**Verdict:** 💬 OPINION / design spec — ผ่าน
เป็นข้อกำหนดสไตล์ภายใน ไม่ใช่ factual claim (สัดส่วน 3–4 หัวอยู่ในช่วง convention ปกติของ chibi/super-deformed — ไม่มีอะไรขัดข้อเท็จจริง)

---

### A1 — ⚠️ Advisory (จุดที่ Mind ไม่ได้ mark): "ตราครุฑ-style seal" ในตารางสีแดงชาด (บรรทัด 35)
**Verdict:** ⚠️ UNVERIFIED-RISK — ต้อง reword ก่อนใช้เป็น guideline จริง (warning, ไม่ใช่ blocker)
ตราครุฑเป็นตราแผ่นดิน คุ้มครองโดย **พ.ร.บ. เครื่องหมายครุฑพ่าห์ พ.ศ. 2534** — การทำ/ใช้ตราครุฑหรือตราตั้งโดยไม่ได้รับอนุญาตมีโทษอาญา และครุฑผูกกับหน่วยราชการ/ตราตั้งพระราชทานเท่านั้น การแนะนำให้ทำ "ครุฑ-style seal" บนใบประกาศเชิงพาณิชย์เสี่ยงทั้ง (ก) เลียนเอกสารราชการ (ข) ประเด็นความเหมาะสมทางวัฒนธรรมแบบเดียวกับสัญลักษณ์เคารพอื่น
**ข้อแนะนำ:** เปลี่ยนคำเป็น "ตราประทับ/medallion สไตล์มงคล" หรือระบุลายที่ปลอดภัย (พุ่มข้าวบิณฑ์/ธรรมจักรเส้นเรขาคณิต) แทนการอ้างถึงครุฑ
**Sources:** [Garuda Emblem Act, BE 2534 — Wikisource](https://en.wikisource.org/wiki/Translation:Garuda_Emblem_Act,_BE_2534_(1992)), [Wikipedia — Emblem of Thailand](https://en.wikipedia.org/wiki/Emblem_of_Thailand), [Royal warrant of appointment (Thailand)](https://en.wikipedia.org/wiki/Royal_warrant_of_appointment_(Thailand))

---

## สรุปผล

| Verdict | จำนวน |
|---|---|
| ✅ VERIFIED | 13 (C1–C7, C10–C15) |
| ⚠️ UNVERIFIED/RISK | 1 (A1 — "ตราครุฑ-style seal") |
| ❌ INCORRECT | 0 |
| 💬 OPINION / design spec / นโยบายสตูดิโอ | 3 (C8, C9, C16) |

**ผล 5 จุดที่ Mind mark:** FC-1 ✅ / FC-2 ✅ / FC-3 ✅ / FC-4 ✅ / FC-5 ✅ — ครบทั้งห้า

**สิ่งที่ควรปรับก่อนส่ง Chris QA (warnings — ไม่ใช่ blocker):**
1. **A1:** reword "ตราครุฑ-style seal" (บรรทัด 35) — เลี่ยงการอ้างครุฑ (พ.ร.บ. เครื่องหมายครุฑพ่าห์ 2534)
2. **C4:** (ไม่บังคับ) เติมวงเล็บขอบเขต FC-1 ว่าม่วงยังใช้ได้ในบริบทมงคลเฉพาะทาง (สีวันเสาร์/งานเฉลิมพระเกียรติ) — กันทีมตีความเป็นสีต้องห้ามถาวร
3. **C11:** ใส่ note ว่านโยบาย Etsy version ใหม่บังคับใช้ 11 ส.ค. 2026 — ต้องเช็คซ้ำก่อน/หลังวันนั้น
4. **C2:** ให้ Chris เช็ค proof น้ำตาลไม้สัก (build เข้มกว่า hex หนึ่งขั้น) เป็นพิเศษ

## Overall Verdict: ✅ PASS — ไม่มี ❌ blocker; แก้ warning A1 แล้วส่งต่อ Chris QA ได้

---
*Reese — Research & Fact-check, AGAPAE AI Studio*
