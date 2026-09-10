# 📌 สรุปเก็บไว้ — บทความ AI Agent 2 ชิ้น (10 ก.ย. 2569)

> **วิธีใช้ไฟล์นี้:** พูดกับ agent ว่า _"อ่าน `refs/agent-patterns.md`"_ แล้วสั่งงานต่อได้เลย
> ไฟล์นี้เป็น **สรุปย่อ** ของงานที่ผ่าน Reese fact-check + Chris QA (✅ PASS) แล้ว — ไม่มีข้ออ้างใหม่
> อยากดูหลักฐาน/source URL ทุกข้อ → ไปที่รายงานเต็มท้ายไฟล์

---

## ⚡ อ่าน 30 วินาที

| บทความ | เชื่อได้แค่ไหน | ทำอะไรกับมัน |
|---|---|---|
| คอร์ส Multi-Agent ของ Google Cloud Tech | **จริง ใช้ได้** (มี 2 กับดักที่โพสต์ไม่บอก) | เรียนเอาแนวคิด ไม่ต้องย้าย framework |
| เคส "สร้าง AI agent 27 ตัว" (Linara Bozieva) | **คนจริง ตัวเลขยืนยันไม่ได้** เป็น funnel ขายคอร์ส | ใช้เป็นตัวอย่าง "อ่านเคสให้เป็น" เท่านั้น |

**สรุปหนึ่งบรรทัด:** จำนวน agent ไม่ใช่หน่วยวัดที่มีความหมาย — สิ่งที่แยกของเล่นจากของจริงคือ
**memory ที่ค้นได้ · การตรวจงานที่พิสูจน์ได้ว่ายังทำงานอยู่ · การเทสต์กระบวนการคิด ไม่ใช่แค่ผลลัพธ์**

---

## 1️⃣ คอร์ส Google Cloud Tech — "AI Agent Crash Course"

**สิ่งที่ยืนยันแล้ว**
- playlist มีจริง **11 ตอน** (พาดหัวโพสต์ถูก) — 15 หัวข้อที่โพสต์ไล่มาก็ถูกทั้ง 15 แต่เป็น **chapter ย่อยในคลิป ไม่ใช่ 15 ตอน**
- **ฟรีจริง** (คลิป + lab เป็น Google Codelabs) ผู้บรรยาย Annie Wang
- สอนบน **ADK (Agent Development Kit)** ซึ่งเป็น **Apache-2.0 · model-agnostic · รันบนเครื่องเองได้** ไม่บังคับ GCP

**⚠️ 2 กับดักที่โพสต์ไม่บอก**
1. **Memory Bank ไม่ฟรี** — ผูก GCP 100% และเริ่มเก็บเงินจริง **1 ก.ย. 2569** ($0.30/GiB-เดือน + read/write ops)
   _(เลข "$0.25/1,000 memories" ที่ลอยในเน็ตไม่มีบนหน้าราคาทางการ — ห้ามอ้าง)_
2. **ADK ขึ้น 2.0 แล้วมี breaking changes** — คลิปถ่ายยุค 1.x โค้ดในคลิปอาจรันไม่ผ่าน

**จุดที่โพสต์ผิด 1 จุด:** "semantic search ด้วย PreloadMemoryTool" — semantic search มาจาก **Memory Bank** ไม่ใช่ tool ตัวนั้น

### 15 หัวข้อ → เราอยู่ตรงไหน

**Core Architecture & Routing**
1–3. Foundational patterns · **Loop pattern** (Generator + Critic ตรวจงานกันเอง) · **Coordinator pattern** (dynamic routing)
4. **"Agent เป็น Tool" vs "ส่งต่อให้ Sub-agent"** — ต่างกันที่ context: agent-as-tool ได้คำตอบกลับมาในบริบทเดิม, sub-agent ยกงานไปทั้งก้อน

> **ของเรา:** Reese fact-check → Chris QA **คือ Critic อยู่แล้ว** แต่เป็น *gate ครั้งเดียว* ไม่ใช่ *loop*
> routing table ของ Claudy เป็น **static routing** — ทีมสรุปว่า **ไม่ควรเปลี่ยนเป็น dynamic** (เสีย debuggability + testability + เปลือง token แลกความยืดหยุ่นที่ยังไม่ต้องการ)
> Claude Code subagent = isolated context (พฤติกรรมแบบ agent-as-tool) → ขั้นที่ต้องเห็นบริบทของขั้นก่อน **ต้องส่ง context ไปให้ชัดใน prompt** หรือใช้ `subagent_type: "fork"`

**Memory Architecture** — บทความเรียกว่า "จุดตายของงาน production"
5. Short-term: Sessions / Events / State
6. Persistent: จำข้ามการรีสตาร์ต
7. Long-term: Memory Bank
8. SessionService vs MemoryService
9. Semantic search (มาจาก Memory Bank)

> **ของเรา:** จำข้ามรอบด้วย `CLAUDE.md` + `CONTEXT.md` + `Output/` + `worklog.json` + Firestore + auto-memory
> **ช่องว่างจริง:** ไม่มี long-term memory ที่ **ค้นได้แบบ semantic** — ตอนนี้ค้นด้วย grep และ index ของ Libby ค้างที่ 34 จาก ~120 ไฟล์
> **แต่ทีมไม่แนะนำ** ไป vector DB / Memory Bank ตอนนี้ — ยังไม่ถึงขนาดที่คุ้ม

**Scaling & Integration**
10. Multi-agent systems & hierarchy
11. **Workflow agents: Sequential / Parallel / Loop** (แบบ deterministic — ไม่ปล่อยให้ LLM ตัดสินลำดับ)
12–14. ต่อ **MCP servers** · เขียน MCP server เอง · **MCP Toolbox for Databases**
15. **Testing Pyramid 3 ระดับ + trajectory evaluation** — วัด "ทางที่ agent เดินไปถึงคำตอบ" ไม่ใช่แค่คำตอบสุดท้าย

> **ของเรา:** SOP pipeline ทำหน้าที่คล้าย workflow agent แต่พึ่ง LLM ทำตาม ไม่ใช่ deterministic
> **MCP:** ต่อของคนอื่นอยู่หลายตัว (Todoist / Google / Figma / Canva / Chrome) — **เขียนเองคุ้มเฉพาะแบบ local stdio**
> ตัวแรกที่ควรทำคือ `tanapat-print` (ข้อมูลวัสดุ 71 รายการ, 21 ตัวเป็นราคาจริง `fixed:true`) **แต่ต้องแยกเป็น `data/materials.json` ก่อน** — Dale จัดไว้อันดับ 5 ไม่ใช่งานด่วน
> **MCP Toolbox for Databases** น่าลอง — Apache-2.0 รองรับ Claude Code อยู่แล้ว ต่อ Firestore/Postgres ตรงได้ **ไม่ต้องแตะ ADK**
> **Testing:** เราไม่มี regression test ของ agent เลยแม้แต่ไฟล์เดียว ← ช่องว่างที่ใหญ่จริง

**ข้อสรุปของทีม: ไม่ย้ายไป ADK** — เอาแนวคิดมา ไม่เอา framework (hooks / skills / permissions ของ Claude Code เหนือกว่าในงานที่เราทำ)

---

## 2️⃣ เคส Linara Bozieva — "สร้าง AI agent 27 ตัวหลังถูกเลิกจ้าง"

**สิ่งที่จริง:** ตัวคนจริง · Ravenopus จริง · แบรนด์ "Built, Not Hired" จริง · อดีตพนักงาน eBay สาย Analytics จริง

**⚠️ แต่ต้นฉบับคือ Business Insider แบบ "as-told-to" (20 พ.ค. 2569)** = เจ้าตัวเล่า **BI ไม่ตรวจตัวเลขให้**
→ **ตัวเลขทุกตัวในบทความยืนยันจากภายนอกไม่ได้แม้ตัวเดียว**

| ข้ออ้าง | ความจริง |
|---|---|
| 27 agent | **ล้าสมัย** — Forbes ส.ค. = 35 · ravenopus.com = "30+" · built-not-hired.com = "100+" |
| ลูกค้า 14 ราย | ต้นฉบับเขียน "14 client **profiles**" — บทความไทยแปลคลาด |
| สเกลได้ 20–25 ราย | ต้นฉบับมี "**I think** I could comfortably manage" กำกับ |
| งบ < 32,000 บาท/เดือน | คำบอกเล่าเจ้าตัว ไม่มีหลักฐาน |
| โครงสร้าง 3 ชั้น | **ไม่มี repo / สไลด์สาธารณะ** — ถูกทำเป็นสินค้าขาย **$497 / $997 / $4,997** |

**บทความไทยไม่ได้ขยายตัวเลข** (ตรงกับต้นฉบับ) แต่แปลคลาด 2 จุดข้างบน
**ภาพประกอบไม่ใช่ระบบเธอ** — เป็น n8n workflow ทั่วไป (node "Grog" ไม่มีในโลกจริง ของจริงคือ Groq/Grok) และ stack ที่เธอเผยแพร่เองไม่มี n8n เลย

### โครงสร้าง 3 ชั้นที่บทความบรรยาย (ใช้เป็นแนวคิดได้ ถึงจะไม่มีหลักฐาน)

1. **Directives** — ตัวตน ความรู้ กฎการทำงานของแต่ละ agent → **เรามีแล้ว** = `CLAUDE.md` + `SOP/` + `.claude/agents/`
2. **Orchestration** (6 ตัว: วิจัยตลาด / วิเคราะห์ข้อมูล / ครีเอทีฟ / การเงิน / กฎหมาย / ประสานงาน) → **เรามี Claudy ตัวเดียว** เป็น "ชั้นสมอง"
3. **Execution** (18 ตัว: เทคนิค 3 / ดึงคนเข้ามา 10 / เปลี่ยนเป็นรายได้ 5) → เราเป็น 15 specialist

> **ที่เขาแบ่งแบบนั้นเพราะเขาทำเอเจนซีการตลาด** — เราเป็นโรงพิมพ์ + ขาย template โครงเลยไม่ควรก็อป
> **ข้อสรุปของทีม: หยุดที่ 16 agent ไม่เพิ่ม** — ตอนนี้ 4 จาก 12 ตัวที่ผลิตของยังมีผลงาน ≤3 ชิ้น เพิ่มตัวใหม่มีต้นทุน 7 จุดต่อตัวตาม SOP-09

### สิ่งที่เธอบอกเองว่า AI ทำไม่ได้ (ส่วนที่มีค่าที่สุดของบทความ)
- อ่านไม่ออกว่าลูกค้ากังวลอะไรจริง ๆ / ตอนไหนพูด "โอเค" แต่ไม่โอเค
- ตัดสินใจขั้นสุดท้ายเมื่อ agent เจอทางแยกที่ข้อมูลไม่พอ
- **ถ้าเจ้าของไม่มี domain expertise ก็สร้าง agent สายนั้นไม่ได้** — เพราะไม่รู้ว่าจะใส่แนวทางอะไรลงไป และไม่รู้ว่าต้องอัปเดตอะไรเมื่อเวลาผ่านไป

---

## 3️⃣ ของที่ได้จากงานนี้จริง (ไม่ได้มาจากบทความ)

**Dale จับได้ว่า quality gate ของเราตายเงียบมาประมาณ 6 สัปดาห์** — hook ตัวแรกของแต่ละ event block ทำงาน
ตัวที่ 2/3 ไม่ทำงาน (`.gate-state.json` ค้าง 29 ก.ค. · `.skill-state.json` ไม่เคยเกิดขึ้นเลยทั้งที่ hook เข้า
`settings.json` ตั้งแต่ 27 ส.ค. ขณะที่ `worklog.json` สดปกติ) → ที่ `CLAUDE.md` เขียนว่า gate
"บังคับด้วยโค้ด ไม่ใช่ honor system" **ไม่เป็นความจริงมา 6 สัปดาห์**

→ ลง `BACKLOG.md` เป็น **P0 ใหม่ รอ Kittanate อนุมัติ** · สาเหตุยังเป็นสมมุติฐาน (hook แย่ง stdin) ลอจิกในสคริปต์ไม่ผิด

**มุมคอนเทนต์ที่ Minnie เชียร์:** AGAPAE เองคือ case study ที่มีของจริง —
เรื่อง **"ระบบพังแบบเงียบแล้วจับได้ยังไง"** มีค่ากับคนเรียนมากกว่าเรื่องความสำเร็จ และไม่ต้องขายฝันเหมือนเคส 27 agent

---

## 📂 รายงานเต็ม (มี source URL ทุกข้อ)

| ไฟล์ | เนื้อหา |
|---|---|
| `Output/Reese/2026-09-10-agent-architecture-research.md` | วิจัย + verify ทั้ง 2 บทความ (358 บรรทัด) |
| `Output/Dale/2026-09-10-agent-pattern-gap-analysis.md` | เทียบ 15 หัวข้อกับโค้ดเราจริง + ข้อเสนอ 5 ข้อ (427 บรรทัด) |
| `Output/Minnie/2026-09-10-agent-articles-opportunities.md` | 9 idea cards 3 ทิศทาง + ที่ตัดทิ้ง (243 บรรทัด) |
| `Output/Reese/2026-09-10-agent-study-factcheck.md` | fact-check — PASS-WITH-FIXES |
| `Output/Chris/2026-09-10-qa-agent-study-sprint.md` | QA — FAIL รอบแรก แล้ว PASS |
| `Output/Kittanate-source/2026-09-10-agent-articles-source.md` | ข้อความต้นทางที่ Kittanate ส่งมา |
