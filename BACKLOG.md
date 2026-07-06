# 📋 BACKLOG — งานมอบหมายของทุก Agent

> จัดทำโดย Senior Architect (Fable 5) เมื่อ 5 ก.ค. 2026 — Opus 4.8/Claudy เป็นผู้รัน
> กติกา: ทำตามลำดับ Priority | งานเสร็จ = ติ๊ก ✅ + ใส่วันที่ + path ผลงาน | รีวิวทุกสัปดาห์ด้วย skill `weekly-review`
> P0 = ทำทันที | P1 = สัปดาห์นี้ | P2 = เดือนนี้ | P3 = เมื่อมีเวลา/รอเงื่อนไข

---

## 🔥 P0 — งานค้างที่ต้องปิดก่อนทุกอย่าง

- [x] **ปิด pipeline บทความ "5 ความผิดพลาดงานพิมพ์"** ✅ 6 ก.ค. 2569 — v2 โดน fact-check FAIL
  (blocker: วิธีเช็ค color mode ใน Illustrator/InDesign ผิด) → Rae แก้เป็น v3 → Reese ✅ PASS →
  Chris ✅ PASS · ผลงาน: `Output/Rae/2026-07-06-5-print-mistakes-article-v3.md` ·
  factcheck: `Output/Reese/2026-07-06-print-mistakes-v3-factcheck.md` ·
  QA: `Output/Chris/2026-07-06-qa-print-mistakes-article-v3.md`
  ✅ (1) นโยบาย "ตรวจไฟล์ฟรี" — Kittanate สั่งตัดออก → Rae แก้แล้ว → Chris delta re-QA ✅ PASS 6 ก.ค. 2569
  (`Output/Chris/2026-07-06-qa-print-mistakes-v3-edit-recheck.md`) — บทความพร้อม ship
  ✅ (2) เผยแพร่แล้ว — Kittanate ลงบทความบนเว็บ Tanapat.co.th (แจ้ง 6 ก.ค. 2569) — **ปิดงานสมบูรณ์**

- [ ] **ทดสอบ agent ใหม่ 3 ตัว (Libby / Mind / Dale)** — delegate งานเล็ก 1 ชิ้นต่อตัวผ่าน Task tool
  แล้วเช็คว่า hook อัปเดต dashboard ครบ (ตามขั้นทดสอบใน SOP-09) — งานเล็กที่ใช้ทดสอบ = งาน P1 ของแต่ละตัวด้านล่าง
  ⚠️ สถานะ 6 ก.ค. 2569 (ค่ำ): งาน P1 ของทั้ง 3 ตัวเสร็จครบ (Mind ผ่าน QA แล้ว) แต่ hook ยังไม่เคย
  ยิงอัตโนมัติ — วินิจฉัยเจอ 2 สาเหตุ: (1) matcher ใน `.claude/settings.json` เป็น `"Task"` แต่ tool
  delegate ปัจจุบันชื่อ `Agent` → **แก้เป็น `"Task|Agent"` แล้ว** (2) session ที่เปิดจากนอก project
  folder จะไม่โหลด agent files ใน `.claude/agents/` ทำให้ต้อง delegate ผ่าน general-purpose ซึ่งไม่อยู่
  ใน MAP ของ hook → **วิธีปิด: session หน้าเปิด Claude Code จาก folder นี้ตรง ๆ แล้ว delegate 1 งานเล็ก
  ด้วย subagent_type จริง (เช่น chris-qa) เพื่อยืนยัน hook ยิง** จึงติ๊กปิดได้
  · งานตาม: Libby อัปเดต output-index.md ให้รวมไฟล์ใหม่รอบ QA loop นี้ (ทำ session หน้า ประหยัด token)

---

## 🎭 Claudy (Orchestrator)

- [ ] P0: สองรายการข้างบน — Claudy เป็นเจ้าภาพ
- [ ] P1: รัน `weekly-review` ครั้งแรก ตั้ง baseline รายงานสัปดาห์
- [ ] P2: เสนอ Kittanate ว่า template แรกที่จะดันให้ "พร้อมขายจริงบน Etsy" ควรเป็นตัวไหน
  (ใช้ผล research sprint ของ Reese ประกอบ — ดู backlog Reese P1)
- [ ] เสมอ: ทุก session เปิดด้วย HANDOFF.md → BACKLOG.md → เช็ค git/dashboard สุขภาพดี

## 💡 Minnie (Ideas)

- [ ] P1: **Idea cards ชุดเทศกาลครึ่งปีหลัง 2026** — 5 cards ต่อเทศกาล:
  วันอาสาฬหบูชา/เข้าพรรษา, วันแม่ (12 ส.ค.), วันออกพรรษา/กฐิน, ลอยกระทง, ปีใหม่/ส.ค.ส. 2570
  (วันที่ตามจันทรคติให้ตั้งเป็น research question ให้ Reese verify — ห้าม fix วันเอง)
- [ ] P2: Idea cards หมวด **institutional certificates** (จุดแข็งเดิมของ TANAPAT 40 ปี):
  ใบประกาศโรงเรียน/วัด/หน่วยงาน แบบ printable + custom
- [ ] P3: Concept "template bundle" — ขายเป็นชุดตามเทศกาลแทนขายแยกชิ้น

## 🔍 Reese (Research & Fact-check)

- [x] P0: Fact-check บทความ print-mistakes ✅ 6 ก.ค. 2569 — v2 FAIL → v3 PASS (12✅/2💬)
- [ ] P1: **Research sprint: "printable ไทย/พุทธหมวดไหนขายได้จริงบน Etsy"** — ตาม SOP-05
  ผลลัพธ์ต้องชี้ได้ว่า template แรกที่ควรผลิตจริงคือหมวดไหน ราคาเท่าไหร่
- [ ] P1: Verify วันสำคัญทางพุทธครึ่งปีหลัง 2026 (พ.ศ. 2569) จากปฏิทินหลวง/แหล่งทางการ
  → ส่งให้ Libby เก็บเป็น reference กลาง `Output/Libby/thai-buddhist-dates-2569.md`
- [ ] เสมอ: fact-check ทุกงานที่มี claims ก่อนถึง Chris (กฎบังคับ)

## ✍️ Rae (Writer)

- [x] P0: แก้บทความ print-mistakes เป็น v3 ตาม fact-check ✅ 6 ก.ค. 2569
- [ ] P1: **Listing copy template** — โครงมาตรฐาน title/description/tags สำหรับ Etsy + Gumroad
  (ไทย+อังกฤษ) ให้งาน template ต่อ ๆ ไปหยิบใช้ได้เลย → `Output/Rae/listing-copy-template.md`
- [ ] P2: เขียนข้อความอวยพร/ทำบุญมาตรฐาน 3 ระดับภาษา (พิธีทางการ / ทั่วไป / อบอุ่น)
  เป็นคลังให้ template หยิบใช้ — ทุกชิ้นต้องผ่าน fact-check เรื่องคำศัพท์ศาสนา

## 📐 Vera (UX/Layout)

- [ ] P1: **Layout spec การ์ดทำบุญ A5** ตัวแรก (รอผล research ของ Reese เลือกหมวด) —
  spec เต็มตาม SOP-03 ขั้น 5 ให้เป็น "spec ต้นแบบ" ที่งานต่อไป copy โครงได้
- [ ] P2: Audit dashboard (`index.html`) บนมือถือ — จอแคบ 360px มีอะไรพัง/อ่านยากบ้าง
  ส่ง findings ให้ Dale แก้
- [ ] P3: Spec โครง planner ปฏิทินพุทธ พ.ศ. 2570 (เริ่มได้หลังการ์ดทำบุญตัวแรกจบ)

## 🎨 Mind (Visual) — agent ใหม่ เพิ่งเปิดใช้

- [x] P1 (งานทดสอบ agent): **Brand asset starter pack** ✅ 6 ก.ค. 2569 — palette กลาง +
  illustration style + กติกา iconography พุทธ → `Output/Mind/2026-07-06-brand-starter.md` (r3)
  ผ่าน pipeline เต็ม: Reese fact-check ✅ → Chris QA r2 ❌ FAIL (B1 ขอบเขตสีม่วง) → แก้ r3 →
  Reese delta ✅ → Chris re-QA ✅ PASS — ใช้เป็น brand guideline จริง
  · action item ค้าง: งานพิมพ์จริงชิ้นแรกที่ใช้น้ำตาลไม้สัก #4A3728 ต้องมี physical proof ก่อนอนุมัติ
- [ ] P2: Asset spec สำหรับการ์ดทำบุญตัวแรก (ตาม spec ของ Vera เมื่อเสร็จ)
- [ ] P3: Preview image guideline สำหรับ Etsy listing (mockup style ให้สม่ำเสมอทุกสินค้า)

## ✅ Chris (QA)

- [x] P0: Re-QA บทความ print-mistakes v3 ✅ PASS 6 ก.ค. 2569 — 2 blockers เดิมปิดครบ
- [ ] P1: อ่าน `SOP/SOP-08-qa-standards.md` แล้วใช้เป็น checklist หลักทุก verdict ตั้งแต่นี้ไป
  (ถ้าเจอเกณฑ์ที่ควรเพิ่ม — เสนอผ่าน Claudy อย่าแก้ SOP เอง)
- [ ] เสมอ: gate สุดท้ายของทุก pipeline

## 📚 Libby (Index) — agent ใหม่ เพิ่งเปิดใช้

- [x] P1 (งานทดสอบ agent): **สร้าง `Output/Libby/output-index.md`** ✅ 6 ก.ค. 2569 — index ครบ
  34 ไฟล์จาก 6 agent folders พร้อมโยง chain: research → draft → factcheck → QA
- [x] P1: สร้างโครง `Output/Libby/template-library.csv` ✅ 6 ก.ค. 2569 — header ตาม scaffold รอ template แรก
- [ ] P2: ตรวจไฟล์ที่ชื่อไม่ตรง convention `YYYY-MM-DD-slug.md` แล้วรายงาน (อย่า rename เอง)

## 📊 Nick (Analytics)

- [ ] P1: **Baseline report** — สถานะ 3 แอปที่ deploy แล้ว (Quotation Assistant, Print Order
  Assistant v2, InvestAI v2): URL ใช้งานได้ไหม, มี analytics เก็บอยู่หรือยัง, ถ้าไม่มี เสนอวิธีเก็บแบบเบาที่สุด
- [ ] P2: นิยาม metric ชุดแรกของธุรกิจ template (views→sales conversion, revenue/template)
  เตรียมไว้ก่อนเปิดขายจริง
- [ ] P3: รายงานยอดขาย Etsy/Gumroad เดือนแรกหลังเปิดขาย

## 🔧 Dale (DevOps) — agent ใหม่ เพิ่งเปิดใช้

- [x] P1 (งานทดสอบ agent): **Repo health check** ✅ 6 ก.ค. 2569 — ผ่าน 5/5 (.nojekyll, hook
  ไม่ crash, Pages โหลด 200, avatars ครบ 11, remote/hooks ถูกต้อง) + เพิ่ม card Dale ที่ขาดใน
  `index.html` → `Output/Dale/2026-07-06-repo-health.md`
- [ ] P2: แก้ประเด็นที่ Vera เจอจาก mobile audit ของ dashboard
- [ ] P3: วางโครง TANAPAT web app ตัวใหม่ (Target stack: React+TS / Express / PostgreSQL) —
  **เริ่มเมื่อ Kittanate สั่งเท่านั้น** ตอนนี้แค่เตรียม checklist การตั้งโปรเจกต์ไว้

## 📰 News (Cloud Routine)

- [ ] เสมอ: รันอัตโนมัติ 09:00 — Claudy เช็คทุกเช้าว่ามี worklog entry + อีเมลถึง Kittanate
- [ ] P2: ถ้าพลาด ≥2 วันในสัปดาห์เดียว → Dale ตรวจ routine + รายงาน Kittanate (ตาม SOP-06)

---

## เงื่อนไขการเพิ่ม/แก้ backlog

- Kittanate เพิ่มงานได้ตลอด — Claudy จัด priority ให้แล้วแจ้งกลับ
- Claudy เพิ่มงานที่ค้นพบเองได้ใน P2/P3 แต่ P0/P1 ใหม่ต้องแจ้ง Kittanate
- งานที่ block กันให้เขียนระบุ (เช่น "รอผล research ของ Reese") — อย่าเริ่มงานที่ input ยังไม่พร้อม
