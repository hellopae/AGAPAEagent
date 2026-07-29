# โจทย์จาก Kittanate — MiroFish: ใช้ประโยชน์กับ TANAPAT ได้ยังไง

**วันที่รับโจทย์:** 30 ก.ค. 2026
**ประเภทงาน:** Research Sprint (SOP-05) + ประเมินความเป็นไปได้ทางเทคนิค
**สถานะ:** ยังไม่เริ่ม — รอ Claudy แตกงาน

---

## คำสั่งเดิมของ Kittanate

> "เห็นมีงาน MiroFish ให้ Agent Claudy มอบหมายงานให้ Agent แต่ละคน
> ศึกษา หาข้อมูล และแนะนำว่าสามารถนำมาใช้ประโยชน์ยังไงได้บ้าง"

แหล่งที่ Kittanate ส่งมา: https://apidog.com/th/blog/what-is-mirofish/ + โพสต์ Facebook ภาษาไทย + ภาพหน้าจอ Graph Relationship Visualization ของ MiroFish

---

## ข้อมูลตั้งต้น (scan เบื้องต้น — **ยังไม่ผ่าน Reese fact-check** ถือเป็นสมมติฐาน ไม่ใช่ข้อยืนยัน)

### MiroFish คืออะไร
เอนจินจำลองสังคม AI แบบ multi-agent — สร้าง AI agent หลายร้อยตัว แต่ละตัวมีบุคลิก
ความทรงจำ จุดยืน และความสัมพันธ์ต่างกัน แล้วปล่อยให้โต้ตอบกันในโลกจำลอง
(จำลอง Twitter + Reddit) เพื่อดูว่าเมื่อโยนเหตุการณ์เข้าไป — ข่าว นโยบาย วิกฤต PR —
ใครจะเชื่อ ใครจะต้าน narrative ไหนจะแพร่ และเหตุการณ์จะพัฒนาไปทางไหน

### ตัวเลขที่ต้องให้ Reese ตรวจ
| ข้ออ้าง | แหล่ง |
|---|---|
| ผู้สร้าง: Guo Hangjiang (郭航江) นักศึกษาปี 4 ม.ไปรษณีย์โทรคมนาคมปักกิ่ง อายุ 20 | TMTPost, 36Kr, PANews |
| สร้างเสร็จใน 10 วัน | โพสต์ FB + 36Kr |
| ขึ้นอันดับ 1 GitHub Trending โลก ~7 มี.ค. 2026 | หลายสำนัก |
| ดาว GitHub: **69.7k** (บางแหล่งรายงาน 42k — ตัวเลขต่างกัน ให้ยืนยันใหม่) | หน้า repo |
| ลงทุน 30 ล้านหยวน (~4.1 ล้าน USD) จาก Chen Tianqiao (Shanda Group) ภายใน 24 ชม. | TMTPost, 36Kr |

### เทคนิค
- Repo: `github.com/666ghj/MiroFish` — **License: AGPL-3.0**
- Backend: Python 3.10+ / FastAPI / OASIS framework / Zep Cloud (temporal knowledge graph)
- Frontend: Vue 3 / WebSocket / D3.js
- ต้องใช้: LLM API แบบ OpenAI-compatible (README แนะนำ Qwen-plus ผ่าน Bailian) + Zep Cloud API key
- Workflow 5 ขั้น: Ontology → GraphRAG → Config → Simulation (agent โพสต์/คอมเมนต์/ตอบโต้ 72 ชม.จำลอง) → Report

### 3 ข้อกังวลที่ต้องเคลียร์ก่อนตัดสินใจ
1. **AGPL-3.0** — ถ้าแก้โค้ดแล้วเปิดเป็นบริการออนไลน์ให้ลูกค้าใช้ ต้องเปิดเผย source
   ทั้งหมด กระทบโมเดลธุรกิจโดยตรง → **Dale ต้องอ่าน license จริงแล้วสรุป**
2. **ต้นทุน** — README เองบอกว่ากินทรัพยากรสูง แนะนำให้ลองต่ำกว่า 40 รอบก่อน
   ต้นทุนจริงต่อ 1 simulation ยังไม่มีใครเปิดเผย → **Nick ต้องประเมิน**
3. **ความแม่นยำ** — ยังไม่มี benchmark ยืนยัน และข้อมูลต้องอัปขึ้น Zep Cloud
   (ประเด็น privacy ถ้าใช้ข้อมูลลูกค้า) → **Reese + Chris**

---

## Sub-questions สำหรับทีม (ขั้น 1 ตาม SOP-05)

### Minnie — ไอเดีย
แตกเป็น idea card: MiroFish (หรือแนวคิดของมัน) ใช้กับ TANAPAT ได้ยังไงบ้าง
ตั้งเป็นสมมติฐาน + คำถามวิจัย อย่างน้อย 5 มุม ครอบคลุมทั้ง
- ธุรกิจโรงพิมพ์เดิม (ลูกค้าสถาบัน งานพิมพ์เชิงพาณิชย์)
- ธุรกิจใหม่ (printable template บน Etsy/Gumroad, web app)
- ระบบ AGAPAE Agent เอง (เรามี agent 14 ตัวอยู่แล้ว — แนวคิด MiroFish ต่อยอดได้ไหม)

### Reese [Research] — มองออกนอก
1. MiroFish ทำอะไรได้จริงบ้าง เทียบกับที่สื่อพาดหัว — แยก "ทำได้จริง" ออกจาก "hype"
2. ยืนยันตัวเลขในตารางข้างบนทุกบรรทัด (โดยเฉพาะดาว GitHub ที่ขัดกัน)
3. ทางเลือกอื่นที่ทำงานคล้ายกัน — OASIS, AgentSociety, Stanford Generative Agents,
   Concordia — ตัวไหนเบากว่า/license เป็นมิตรกว่า
4. มีเคสธุรกิจไหนใช้ social simulation แล้วได้ผลจริง (ไม่ใช่ demo) โดยเฉพาะ SME
5. ใช้กับบริบทไทยได้แค่ไหน — README ระบุว่าปรับจูนตามพฤติกรรมจีน/timezone จีน
   ข้อจำกัดนี้แก้ได้ไหม ต้องแก้อะไรบ้าง

### Dale [Technical] — ความเป็นไปได้
1. รันบนเครื่อง Kittanate (macOS) ได้ไหม ต้องอะไรบ้าง มี Docker ไหม
2. **AGPL-3.0 กระทบยังไง** — 3 กรณี: (ก) ใช้ภายในบริษัทอย่างเดียว
   (ข) เอา output ไปขาย (ค) เปิดเป็นบริการให้ลูกค้าใช้ผ่านเว็บ
3. ต้องสมัคร API อะไรบ้าง มีทางใช้ LLM ที่เรามีอยู่แล้วแทน Qwen ไหม
4. Zep Cloud — ข้อมูลไปอยู่ที่ไหน มี self-host ไหม ถ้าเป็นข้อมูลลูกค้าจะมีปัญหาไหม
5. ต่อกับระบบ AGAPAE Agent เดิม (Firestore + dashboard) ได้ไหม คุ้มไหม

### Nick [Analytics] — ต้นทุน/ROI
1. ประเมินต้นทุน token ต่อ 1 simulation (agent 100 ตัว × 40 รอบ) เป็นเงินเท่าไหร่
2. ถ้าจะทดลอง 1 เคสจริง งบขั้นต่ำเท่าไหร่
3. เทียบกับวิธีเดิม — จ้างวิจัยตลาด / ทำ survey / ใช้ทีม agent ที่มีอยู่ — คุ้มกว่าไหม
4. ถ้าข้อมูลภายในไม่พอให้บอกตรง ๆ ว่าไม่พอ

---

## Definition of Done

- [ ] Minnie ส่ง idea cards → `Output/Minnie/2026-07-30-mirofish-ideas.md`
- [ ] Reese ส่ง research → `Output/Reese/2026-07-30-mirofish-research.md`
- [ ] Dale ส่ง technical assessment → `Output/Dale/2026-07-30-mirofish-technical.md`
- [ ] Nick ส่ง cost/ROI → `Output/Nick/2026-07-30-mirofish-cost.md`
- [ ] Reese [Fact-check] ตรวจรวมทุกฉบับ → `Output/Reese/2026-07-30-mirofish-factcheck.md`
- [ ] Chris QA ผ่าน ✅
- [ ] Libby จัดเก็บ + index
- [ ] worklog + status อัปเดต, push ขึ้น Dashboard สำเร็จ

**คำตอบสุดท้ายที่ Kittanate ต้องการ:** ข้อเสนอแนะที่ตัดสินใจได้จริง —
ควรลองไหม / ลองแบบไหน / งบเท่าไหร่ / หรือไม่ควรลองเพราะอะไร
ห้ามจบด้วย "น่าสนใจ ควรศึกษาเพิ่ม" เฉย ๆ

---

## หมายเหตุเรื่อง pipeline

SOP-05 ปกติเป็น Reese + Nick ขนานกัน — โจทย์นี้เพิ่ม **Dale** เข้ามาขนานด้วย
เพราะเป็นคำถามเรื่องการรับเทคโนโลยีมาใช้ ไม่ใช่คำถามตลาดล้วน ๆ
Minnie ต้องเสร็จก่อน (เป็นคนตั้งกรอบคำถาม) แล้วอีก 3 คนค่อยรันขนาน

ขั้นที่ผลต้องส่งต่อทันที → รัน foreground (`run_in_background: false`) ตาม CLAUDE.md ข้อ 3
