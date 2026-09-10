# Technical Assessment — AGAPAE อยู่ตรงไหนเทียบ pattern ใน 2 บทความ

**ผู้ทำ:** Dale (DevOps) · **วันที่:** 10 ก.ย. 2569
**ต้นทาง:** `Output/Kittanate-source/2026-09-10-agent-articles-source.md`
**ขอบเขต:** อ่านโค้ดจริงในระบบเราแล้วเทียบ — ไม่มีข้อไหนเดาจากความจำ ทุกข้ออ้างชี้ไฟล์ได้
**ข้อควรระวัง:** ข้ออ้างจาก 2 บทความยังไม่ verify (Reese กำลังตรวจ) — ทุกจุดที่พึ่งบทความมาร์ก `[รอ Reese ยืนยัน]`
ข้อเสนอทั้ง 5 ข้อในส่วนที่ 3 **ไม่พึ่งข้ออ้างในบทความเลย** พึ่งแต่หลักฐานในโค้ดของเราเอง

---

## 0. สรุปก่อน (อ่านแค่นี้ก็ได้)

**เจอของใหญ่ที่ไม่คาดคิด:** ระบบ enforcement ที่ CLAUDE.md/HANDOFF.md โฆษณาว่า "บังคับด้วยโค้ด ไม่ใช่ honor system"
— **ตายเงียบอยู่**

| หลักฐาน | ค่าที่วัดได้ |
|---|---|
| `scripts/.gate-state.json` แก้ล่าสุด | **29 ก.ค. 2569** (มี 1 session, verdict UNKNOWN) |
| `scripts/.skill-state.json` | **ไม่มีไฟล์เลย** (hook เข้า settings 27 ส.ค. 2569) |
| `status.json` / `worklog.json` แก้ล่าสุด | 10 ก.ย. 2569 00:01 (189 entries, ถึงวันนี้) |

`hook-status.mjs` (hook **ตัวแรก** ในทุก event block) ทำงานอยู่ตามปกติ
`hook-gate.mjs` (ตัวที่ 2 ของ `PreToolUse`/`SubagentStop`, ตัวที่ 1 ของ `Stop`) และ `hook-skill.mjs` (ตัวที่ 2 ของ `Stop`)
ไม่เคยเขียน state เลยตั้งแต่วันติดตั้ง ทั้งที่ช่วง 24–28 ส.ค. มี worklog 48 entries

**พิสูจน์แล้วว่าตัวสคริปต์ไม่ผิด:** ผมคัด `hook-gate.mjs` ไปรันในโฟลเดอร์ชั่วคราวแล้วป้อน payload ปลอม
(`{"session_id":"testsid","agent_type":"dale-devops",...}`) โหมด `agent-done` → เขียน `.gate-state.json`
ครบทั้ง `ran`, `pendingFactCheck`, `missingOutput` ถูกต้องทุกฟิลด์ และไดเรกทอรี `scripts/` เขียนได้จริง (`test -w` ผ่าน)
ดังนั้นปัญหาอยู่ที่ **การถูกเรียกจริงในโปรดักชัน ไม่ใช่ลอจิก**

สมมติฐานสาเหตุ (ยังต้องยืนยันด้วยการทดลอง 15 นาที ไม่ใช่ข้อสรุป):
hook หลายตัวใน array เดียวกันอ่าน `readFileSync(0)` — ถ้า Claude Code ให้ stdin pipe ก้อนเดียว
ตัวแรกที่อ่านจะกินหมด ตัวถัดไปได้ string ว่าง → `ev = {}` → `MAP[undefined]` → `process.exit(0)` เงียบ ๆ
เข้ากับข้อมูลที่เห็นทุกจุด (ตัวแรกของทุก block ทำงาน ตัวที่ 2/3 ไม่ทำงาน)

**3 ช่องว่างที่ใหญ่จริง** (เรียงตามความเจ็บ):
1. Quality gate + DoD gate + skill harvest ไม่ทำงานจริง — ระบบตรวจตัวเองไม่มีอยู่ตั้งแต่ 29 ก.ค.
2. ไม่มีทางรู้ว่า agent ทำงานถูกกระบวนการไหม — ไม่มี regression test ใด ๆ (ข้อ 1 อยู่รอด 6 สัปดาห์เพราะข้อนี้)
3. Long-term memory / retrieval — `Output/Libby/output-index.md` ค้างที่ 6 ก.ค. ครอบคลุม 34 ไฟล์ จากทั้งหมด **119 ไฟล์**

---

## 1. Gap analysis — 15 หัวข้อของคอร์ส Google

_รายการ 15 หัวข้อมาจากโพสต์ `[รอ Reese ยืนยัน]` — พาดหัวบอก 11 ตอน แต่หัวข้อในโพสต์มี 15 ข้อ_

| # หัวข้อ | สถานะ | หลักฐาน / สิ่งที่ขาด |
|---|---|---|
| 1 Foundational patterns (3 โครงสร้าง) | 🟡 | มี pattern จริงแต่ไม่ได้ตั้งชื่อ: `CLAUDE.md` ROUTING TABLE = coordinator, `SOP/SOP-01` STEP 4 = gate chain, `chris-qa.md` บรรทัด 18–44 = fan-out/fan-in · ขาด: ไม่มีที่ไหนบอกว่าเราใช้ pattern อะไรอยู่ ทำให้เถียงกันเรื่องโครงสร้างทุกครั้ง |
| 2 Loop pattern (Generator/Critic) | 🟡 | `SOP-01` บรรทัด 76–79 + `hook-gate.mjs:54` `MAX_QA_ROUNDS = 3` · ขาด: loop ขับด้วยคน ไม่ใช่โค้ด (ดู §1.2) |
| 3 Coordinator / dynamic routing | 🟡 | `CLAUDE.md:28–46` static routing 13 แถว + `SOP-01:109–123` quick reference · ขาด: dynamic routing — **และเราไม่ควรมี** (ดู §1.3) |
| 4 Agent-as-Tool vs Sub-agent | ✅ | มีทั้งสองแบบจริง: sub-agent = `Agent` tool ตาม `SOP-01:22`; agent-as-tool = `chris-qa.md:4` มี `Agent` ใน tools แล้วเรียก `chris-thai`/`chris-culture`/`chris-print` เอง (`chris-qa.md:20–44`) และผลย่อยไม่ไหลเข้า context ของ Claudy (`SOP-01:58`) |
| 5 Short-term memory (Session/Event/State) | 🟡 | Claude Code จัดการ context/transcript ให้ + เรามี session store ของเราเองที่ `hook-gate.mjs:62–89` (`db.sessions[sid]`, เก็บ 10 session ล่าสุด) · ขาด: state ตายเมื่อเปลี่ยน session (ดู §1.1) |
| 6 Persistent memory (ข้ามรีสตาร์ต) | ✅ | มีเกินพอ 4 ที่: `status.json` (13 agent), `worklog.json` (189 entries), Firestore `agents/<id>` + `agents/worklog` (`hook-status.mjs:120–142`), `Output/<Agent>/` 119 ไฟล์ md + git history |
| 7 Long-term memory / Memory Bank | ❌ | ไม่มี · เจ็บจริง: `Output/Libby/output-index.md` = 6 ก.ค. ครอบคลุม 34 ไฟล์ ตอนนี้มี 119 ไฟล์ → 85 ไฟล์ค้นไม่เจอถ้าไม่จำ path เอง และ Libby เคย flag เองแล้วว่ามีเวอร์ชันซ้อนที่ไม่ชัดว่าฉบับไหน canonical (ท้ายไฟล์ output-index.md) |
| 8 SessionService vs MemoryService | ⛔ | เป็นชื่อคลาสของ ADK (Python/Vertex) เราไม่ได้ใช้ ADK — Claude Code เป็น runtime ของเรา การเลียนโครง service 2 ชั้นคือเพิ่มโค้ดที่ไม่มีใครเรียก |
| 9 Semantic search / PreloadMemoryTool | ❌ | ไม่มี · การค้นวันนี้ = `Grep`/`Glob` บน `Output/` (`libby-index.md:16`) ซึ่งได้ผลถ้ารู้คำ แต่หา "เคยทำเรื่องคล้ายกันไหม" ไม่ได้ — แต่ทางแก้ที่คุ้มคือ index ที่สดเสมอ ไม่ใช่ vector DB (ดู §3 ข้อ 4) |
| 10 Multi-agent & hierarchy | ✅ | 3 ชั้นจริง: Claudy → 12 specialists → sub-checker 3 ตัวของ Chris · มี guard ครบ: ห้ามเรียก `@claudy` ซ้ำ (`CLAUDE.md:50–53`), ห้ามเรียก sub-checker ตรง (`CLAUDE.md:40`, `HANDOFF.md:86`) |
| 11 Workflow agents (Sequential/Parallel/Loop) | 🟡 | Sequential = `SOP-01` STEP 4 · Parallel = `chris-qa.md:34–39` (ส่ง 3 ตัวใน message เดียว, foreground) · Loop = `MAX_QA_ROUNDS` · ขาด: จุดพังซ้ำอยู่ที่ foreground/background (ดู §1.4) |
| 12 ต่อ MCP servers | ✅ | ต่ออยู่ 8 ตัว ทั้งหมดเป็น connector ที่ตั้งจาก claude.ai + extension: Todoist, Gmail, Google Drive, Google Calendar, Figma, Canva, WordPress.com, claude-in-chrome · ยืนยัน: ไม่มี `.mcp.json` ในโปรเจกต์ และ `~/.claude.json` มี `mcpServers: []` |
| 13 เขียน MCP server เอง | ❌ | ยังไม่มีเลย · เจ็บจริงแต่ไม่ใช่ที่ MCP (ดู §1.5 — ตอบตรง ๆ ว่าคุ้มหรือไม่) |
| 14 Database MCP ผ่าน MCP Toolbox | ⛔ | เราไม่มี SQL database ที่ไหน — Firestore ตัวที่ใช้อ่านด้วย API key ที่ฝังในหน้าเว็บสาธารณะ (`CONTEXT.md:57`) เป็น key-value ให้ dashboard อ่านฝั่ง client ไม่ใช่ warehouse ที่ต้อง query · Target stack PostgreSQL ยังเป็นแผน (`CLAUDE.md:134–138`, `BACKLOG.md` Dale P3) — ค่อยคุยเมื่อมี DB จริง |
| 15 Testing Pyramid & Evaluation | ❌ | ไม่มี test ใด ๆ ในระบบ — `grep -ri "regression\|eval\|trajectory"` เจอแต่คำในเนื้อบทความ ไม่มีไฟล์ test เลย · เจ็บจริงและพิสูจน์แล้ว: §0 คือของที่หลุดมา 6 สัปดาห์เพราะไม่มีใครเทสต์ตัวตรวจ |

**นับ:** ✅ 4 · 🟡 5 · ❌ 4 · ⛔ 2

---

### §1.1 Memory — ตอนนี้เราจำข้ามรอบด้วยอะไร และ "จุดตาย" จริงคืออะไร

**สิ่งที่มีอยู่จริง แยกตามหน้าที่:**

| ชั้น | ของเราคือ | เทียบ ADK |
|---|---|---|
| คำสั่ง/ตัวตน (instruction memory) | `CLAUDE.md` (auto-load), `CONTEXT.md`, `HANDOFF.md`, `SOP/` 11 ฉบับ, `.claude/skills/` 10 ตัว, `.claude/agents/` 16 ไฟล์ | ตรงกับ "Directives" ของบทความ B มากกว่าจะเป็น memory |
| Session state | context window ของ Claude Code + `scripts/.gate-state.json` keyed ด้วย `session_id` | ≈ SessionService (state + events) |
| Persistent | `status.json`, `worklog.json`, Firestore `agents/*`, `Output/` 119 ไฟล์, git | ≈ persistent memory ผ่าน |
| Long-term / retrievable | `Output/Libby/output-index.md` (ทำมือ, ค้าง 2 เดือน) | ≈ Memory Bank แต่**ไม่มีของจริง** |
| ความชอบของ Kittanate | auto-memory ของ Claude 33 ไฟล์ ที่ `~/.claude/projects/-Users-agapae/memory/` | ไม่มีคู่เทียบใน ADK |

**"จุดตาย" ที่บทความอ้าง `[รอ Reese ยืนยัน]` ว่าเป็น persistence — ในระบบเราไม่ใช่**
เรา persist มากเกินไปด้วยซ้ำ (4 ที่) จุดตายจริงของเราคือ **retrieval + การตายของ state ข้าม session** 4 ข้อนี้:

1. **`.gate-state.json` ผูกกับ `session_id`** (`hook-gate.mjs:89` `db.sessions[sid] || blankSession()`)
   → เริ่ม pipeline แล้วปิด/เปลี่ยน session `pendingFactCheck` หายทันที **fact-check gate เปิดโล่งโดยไม่มีสัญญาณ**
   นี่คือช่องว่าง memory ที่เป็นรูปธรรมที่สุดของเรา และมันเป็น *ช่องว่าง memory ที่กลายเป็นช่องว่างความถูกต้อง*
2. **DoD ข้อ 1 เช็คด้วย mtime 6 ชั่วโมง** (`hook-gate.mjs:95` `hasRecentOutput(name, hours = 6)`)
   → session ที่ยาวกว่า 6 ชม. หรือ session ที่ resume ได้ false "ไฟล์ผลงานหาย"
   HANDOFF.md:66 ยอมรับเองว่า "เป็นการเดา" — จึงเตือนไม่บล็อก แปลว่า DoD ข้อ 1 ไม่มีผลบังคับเลย
3. **ไม่มี index ที่สด** → agent หาของเก่าไม่เจอ ทำซ้ำ/ขัดกันเอง (Libby flag ไว้เองแล้วในไฟล์ index)
4. **`CONTEXT.md` เป็น mirror ทำมือของ memory ในเครื่อง** (`CONTEXT.md:3–7`) — ไฟล์ mirror แก้ล่าสุด 7 ก.ย. 23:28
   ขณะที่ memory ต้นทางมีไฟล์ที่ใหม่กว่า (`project_avegee.md` = 10 ก.ย. 09:37) → drift เกิดขึ้นแล้วจริง
   หมายเหตุ: ไม่มีโฟลเดอร์ memory ที่ผูกกับ path `AGAPAE Agent` เลย — memory ทั้งชุดอยู่ที่ scope `-Users-agapae`

ข้อ 1 + 2 = สิ่งที่ต้องแก้ ข้อ 3 = ข้อเสนอ #4 ข้อ 4 = รับได้ แต่ควรลด mirror ทำมือลงเรื่อย ๆ

---

### §1.2 Loop pattern — Reese → Chris เป็น Critic แล้วหรือยัง

**เป็น Critic แล้ว และเป็น 2 ชั้นด้วยซ้ำ** ซึ่งละเอียดกว่า Generator/Critic คู่เดียวของ ADK:
- `reese-research.md:26–44` = critic ด้าน "จริงหรือไม่" มี verdict รายข้อ ✅/⚠️/❌/💬 + overall PASS/FAIL
- `chris-qa.md:46–52` = critic ด้าน "ส่งได้หรือไม่" มี Blockers/Warnings/Notes/ตรวจไม่ได้
- ทั้งคู่ห้ามแก้งานเอง (`reese:9`, `chris:9`, `qa-gate/SKILL.md` ท้ายไฟล์) — แยก generator/critic ชัดกว่าที่บทความบรรยาย

**ต่างจาก Loop pattern ของ ADK 3 อย่าง:**

1. **เรามี loop จริง แต่ตัวหมุน loop คือคน ไม่ใช่ runtime**
   ADK LoopAgent วน generator→critic เองจนเข้าเงื่อนไขหยุด ของเรา `SOP-01:76–79` เขียนไว้ว่าให้ส่ง verdict
   กลับให้เจ้าของงานแก้เป็น `-v2` แล้วเข้า gate ใหม่ — แต่ **ไม่มีโค้ดตัวไหนวน** `hook-gate.mjs` แค่ *บล็อกไม่ให้จบเทิร์น*
   แล้วให้ Claudy (โมเดล) เป็นคนตัดสินใจว่าจะวนต่อไหม ถ้า Claudy ตีความผิด loop ก็ไม่เกิด
2. **เงื่อนไขหยุดมีจริงและตั้งไว้ดี** — `MAX_QA_ROUNDS = 3` (`hook-gate.mjs:54`) + `MAX_BLOCKS = 3` (บรรทัด 53)
   ตรงนี้เราทำถูกกว่าตัวอย่างสอนทั่วไปที่มักลืมทางออก
3. **ตอนนี้ทั้งกลไกไม่ทำงาน** (§0) → ที่เหลือคือ SOP บนกระดาษ + วินัยของ Claudy เท่านั้น

**สรุปตรง ๆ:** เราไม่ได้ขาด Critic เราขาด **หลักฐานว่า gate ยังทำงาน** — ซึ่งย้อนกลับไปที่หัวข้อ 15 (Testing)

---

### §1.3 Coordinator — static routing ของ Claudy ควรเปลี่ยนเป็น dynamic ไหม

**ไม่ควรเปลี่ยน** — และเหตุผลไม่ใช่ "ขี้เกียจ" แต่เพราะ static routing ของเราแลกมาถูกกว่าที่คิด

ของที่มีอยู่: `CLAUDE.md:28–46` ตาราง 13 แถว + `SOP-01:109–123` quick reference
บวก `description` ยาว ๆ ในทุก agent file ที่ Claude ใช้ตัดสินเอง (`SOP-09` ข้อ 1 สั่งให้เขียนละเอียดเพราะเหตุนี้)

**ที่จริงเราเป็น hybrid อยู่แล้ว ไม่ใช่ static ล้วน:** ตารางเป็น hint ที่โหลดทุก session
แต่การเลือกจริงเกิดในหัวโมเดลจาก description ของ agent — dynamic ในระดับที่เราต้องการมีอยู่แล้ว

ข้อดีของ static ที่เราได้อยู่และจะเสียถ้าเปลี่ยน:
- **debug ได้** — routing ผิดครั้งไหน แก้ที่ตาราง 1 บรรทัด ไม่ต้องไล่ prompt
- **ตรวจได้ด้วย test** — ข้อเสนอ #3 เทสต์ trajectory ได้ก็เพราะ expected route เขียนไว้เป็นข้อความ
- **ต้นทุน token = 0** — dynamic router ที่แท้จริงต้องเสีย 1 รอบโมเดลต่อ 1 การตัดสินใจ ก่อนงานจริงจะเริ่ม
- **ราคาความผิดพลาดของเราไม่สมมาตร** — route ผิดไป Rae แทน Reese = ได้บทความที่แต่งข้อมูล
  ระบบที่คนคุมคนเดียวควรผิดแบบเดาได้ ไม่ใช่ผิดแบบใหม่ทุกครั้ง

จุดที่ static เจ็บจริง แต่แก้ได้โดยไม่ต้องรื้อ: งานที่ไม่เข้าตาราง `CLAUDE.md:60` สั่งให้ตอบว่า
"ควรสร้าง Agent ใหม่สำหรับ [X]" ซึ่งเป็นทางออกที่ถูกแล้ว (ให้คนตัดสิน ไม่ใช่ให้ระบบด้นสด)

**คำตอบ: ไม่ควรเปลี่ยน · ถ้าจะปรับ ให้ปรับแค่ตาราง ไม่ใช่ปรับกลไก**

---

### §1.4 Workflow agents — Sequential/Parallel/Loop และจุดที่พังบ่อย

| แบบ | ของเรา | หลักฐาน |
|---|---|---|
| Sequential | SOP pipeline: idea → research → write → fact-check → QA → index | `SOP-01:60–74`, `SOP-02` |
| Parallel | Chris ส่ง sub-checker 3 ตัวใน message เดียว · งานอิสระปล่อย background ขนาน | `chris-qa.md:34–39`, `CLAUDE.md:59` |
| Loop | QA/fact-check loop 3 รอบ | `SOP-01:76–79`, `hook-gate.mjs:54` |

**จุดที่พังบ่อยที่สุด = foreground vs background** และมันไม่ใช่ปัญหา pattern มันคือปัญหา runtime
บันทึกไว้ 3 ที่แล้วเพราะพลาดซ้ำ: `HANDOFF.md:75–78` + `84–85` + `88–91`, `SOP-01:32–45`, `CLAUDE.md:56–59`
สรุปกับดักจริง 2 อัน:
- ตั้งแต่ Claude Code v2.1.198 subagent รัน background เป็นค่าเริ่มต้น → ขั้นที่ต้องส่งผลต่อ
  ถ้าไม่ระบุ `run_in_background: false` จะได้แค่ "เริ่มทำงานแล้ว" **แล้วส่งของว่างต่อโดยไม่มีใครรู้**
- headless (`claude -p`) ฆ่า background task ที่ 600 วินาที (เจอจริง 29 ก.ค. 2569 — sub-checker ตายทั้ง 3 ตัว)

นี่คือ failure mode ที่ ADK ไม่มี เพราะ ADK สั่งลำดับด้วยโค้ด (`SequentialAgent`) ส่วนเราสั่งด้วยคำสั่งในเอกสาร
→ **เป็นเหตุผลอันดับ 1 ที่ควรมี trajectory test** (ข้อเสนอ #3): เคส "pipeline ส่งของว่างต่อ" เทสต์ได้ถูก ๆ

---

### §1.5 MCP — เขียน server ของเราเองคุ้มไหม

**ต่ออะไรอยู่ (ยืนยันจากของจริง):** 8 ตัว ทั้งหมดเป็น connector สำเร็จรูป — Todoist, Gmail, Google Drive,
Google Calendar, Figma, Canva, WordPress.com, claude-in-chrome
**ไม่มี MCP server ที่เราเขียนเอง 0 ตัว** (`~/.claude.json` → `mcpServers: []` และไม่มี `.mcp.json` ในโปรเจกต์)

**คุ้มไหม — ตอบแยก 2 กรณี:**

- **Remote / hosted MCP server: ไม่คุ้ม ไม่ควรทำ** ต้องมี host + auth + ต่ออายุ token
  ทุกโปรเจกต์ของเราเป็น GitHub Pages ไม่มี backend เลย (`CONTEXT.md:54–58` ยืนยันว่า cloud routine
  ยังต้องยิง Firestore REST เพราะ push ไม่ได้) — เพิ่ม service ที่ต้องดูแลให้คนเดียวคุม ไม่คุ้ม
- **Local stdio MCP server: คุ้ม แต่เป็นอันดับ 4–5 ไม่ใช่อันดับแรก** และมีเงื่อนไขต้องทำก่อน

**ถ้าทำ ตัวแรกต้องเป็น `tanapat-print` — ราคากระดาษ/ต้นทุน/สเปก** ไม่ใช่ตัวอื่น เพราะ:

1. **ข้อมูลมีอยู่จริงแล้วและถูกล็อกอยู่ในที่ที่เรียกใช้ไม่ได้** — `Printing costs/index.html:579` `const MATS = [...]`
   มี **71 รายการ** (กระดาษ/หมึก/เคลือบ/ฟอยล์) ใน 5 หมวด `ck` (paper, ink, coating, foil, other)
   โดย **21 รายการเป็นราคายืนยันจริง** (`fixed:true` + `src:'คุณกระดาษ 5 ส.ค. 69'`) ที่เหลือเป็นค่าประมาณ
2. **มันซ้ำอยู่ 2 ไฟล์แบบต้องเหมือนกันเป๊ะ** — `index.html` และ `PrintCost-Dashboard.html`
   ขนาด 113,140 ไบต์เท่ากันทั้งคู่ และ `diff` = 0 บรรทัด แปลว่าแก้ราคาต้องแก้ 2 ที่ทุกครั้ง
3. **มันคือจุดที่ agent เราพลาดแพงที่สุด** — สูตรแปลง `(แกรม ÷ 1000) × พื้นที่แผ่น × ราคา/กก.` (`CONTEXT.md:49`)
   ถ้าให้โมเดลคิดเลขเอง มันคลาดได้ และกับดักแบรนด์ HIKOTE/GB (`CONTEXT.md:45`) เป็นความผิดที่เคยเกิดจริง
   → tool call ที่ deterministic ปิดทั้งสองความเสี่ยงในครั้งเดียว
4. **ใช้ได้ทุกโปรเจกต์** ถ้าลงเป็น user scope — `Printing costs`, `PrintCal`, `AI Print Order Assistant`
   และ AGAPAE Agent ใช้ตัวเดียวกัน ซึ่ง skill ทำแทนไม่ได้ (skill ผูก directory)

**เงื่อนไขบังคับก่อนแตะ MCP:** ต้องแยก `MATS` ออกไปเป็น `data/materials.json` ที่เดียวก่อน
ถ้าห่อ MCP รอบข้อมูลที่ยังซ้ำ 2 ไฟล์ เราจะได้แหล่งความจริง 3 ที่ แย่กว่าเดิม
**เสนอ 1 ตัวเท่านั้น** — ไม่มีตัวที่ 2 จนกว่าตัวแรกจะถูกใช้จริงติดกัน 1 เดือน

---

### §1.6 Testing / Evaluation — เราไม่มี regression test เลยใช่ไหม และจะเทสต์ trajectory ยังไง

**ใช่ ไม่มีเลย** ค้นทั้งโปรเจกต์แล้วไม่มีไฟล์ test, ไม่มี `package.json` ที่มี test script, ไม่มีโฟลเดอร์ `tests/`
สิ่งที่เราเรียกว่า "การวัดคุณภาพ" วันนี้มี 2 อย่าง และทั้งสองอย่างวัด **ผลงาน** ไม่ได้วัด **ระบบ**:
- `hook-gate.mjs` — ตัวบังคับ ไม่ใช่ตัววัด และตอนนี้ไม่ทำงาน (§0)
- Chris QA — ตรวจ artifact ทีละชิ้น ไม่ได้ตรวจว่ากระบวนการเดินถูกทาง

**§0 คือราคาที่จ่ายไปแล้ว** — gate ตายมา 6 สัปดาห์ ผ่านงาน ~50 entries โดยไม่มีใครรู้
เพราะไม่มีอะไรถามว่า "gate ยังทำงานอยู่ไหม" นี่ตรงกับข้ออ้างของบทความ A ว่าสาย demo
"ดูแค่ผลลัพธ์สุดท้าย" `[รอ Reese ยืนยัน]` — แต่เคสของเรายืนยันตัวเองได้ในโค้ด ไม่ต้องพึ่งบทความ

**เอา trajectory test มาใช้โดยไม่ต้องรื้อระบบ — 3 ระดับ เริ่มจากถูกสุด:**

- **ระดับ 1 — hook contract test (ไม่เรียกโมเดลเลย, ถูกและเสถียรที่สุด, ควรทำ)**
  ยิง payload JSON ปลอมเข้า `hook-gate.mjs` แล้ว assert decision ที่ควรได้ — วิธีนี้ผมใช้ไปแล้วในการวิเคราะห์นี้ มันเวิร์ก
  เคสที่ต้องมี: (a) `agent-done` ของ agent กลุ่ม FACTUAL ต้องตั้ง `pendingFactCheck`
  (b) `pre` ที่เรียก `chris-qa` ขณะมีงานค้าง ต้องคืน `permissionDecision: "deny"`
  (c) `pre` ที่มี `[skip-factcheck]` ต้องผ่าน (d) `stop` ที่ git ไม่สะอาด ต้องคืน `decision: "block"`
  (e) `agent-done` ของ agent กลุ่ม VISUAL ต้องไม่ตั้งธง
  → นี่คือ **trajectory test แท้ ๆ**: มันเทสต์ว่า "ลำดับการตัดสินใจ" ถูก ไม่ได้เทสต์ว่าบทความเขียนดีไหม
- **ระดับ 2 — routing test (เรียกโมเดล 1 รอบ, report-only ไม่ทำให้ fail)**
  `claude -p --agent claudy "…"` พร้อมคำสั่ง "ตอบเฉพาะ routing plan ห้าม delegate"
  แล้ว assert ว่าชื่อ agent ในคำตอบตรง expected — ทำได้เพราะ routing ของเราเป็น static (§1.3)
  เก็บแค่ 3 เคสที่กำกวมจริง: "ราคากระดาษเท่าไหร่" → Reese ไม่ใช่ Rae · "เว็บพัง" → Dale · "จริงไหม" → Reese
- **ระดับ 3 — pipeline smoke test (เดือนละครั้ง, ทำมือได้)**
  รัน pipeline สั้น 1 รอบด้วยโจทย์ที่รู้คำตอบ แล้วเช็ค 3 อย่าง: `.gate-state.json` mtime ขยับ,
  worklog มี entry ครบทุกขั้น, Chris verdict มีจริง — ตรวจว่าท่อยังต่อกันอยู่ ไม่ตรวจคุณภาพเนื้อหา

ไม่ต้องมี LLM-as-judge ไม่ต้องมี eval framework — ระดับ 1 คือ 80% ของมูลค่าที่ ~3 ชม.

---

## 2. เคส 27 agents — เทียบโครงสร้าง

_โครงสร้าง 3 ชั้นและตัวเลขทุกตัวในหัวข้อนี้มาจากบทความ B `[รอ Reese ยืนยัน]`
โดยเฉพาะข้อสังเกตในไฟล์ต้นทางว่าภาพประกอบเป็น workflow n8n ไม่ใช่โครง 27 agent — อาจเป็นภาพ stock_

| ชั้นของเธอ | ของเรา | ประเมิน |
|---|---|---|
| **Directives** (ตัวตน/ความรู้/กฎ) | `.claude/agents/` 16 ไฟล์ + `CLAUDE.md` + `CONTEXT.md` + `HANDOFF.md` + `SOP/` 11 + `.claude/skills/` 10 + `DESIGN.md` | **เราแข็งกว่า** ของเรามี SOP-09 checklist 7 จุดสำหรับสร้าง agent ใหม่ และมี hook ที่ *พยายาม* บังคับกฎด้วยโค้ด ไม่ใช่แค่ prompt |
| **Orchestration** (6 ตัว = สมองก่อนลงมือ) | Claudy 1 ตัว + Minnie/Reese/Nick/Addy ที่ทำงานสมองอยู่แล้ว | **ขาดบางส่วน แต่ไม่ใช่ขาดชั้น** (ดูล่าง) |
| **Execution** (18 ตัว: 3 tech / 10 acquisition / 5 conversion) | Rae, Vera, Mind, Dale, Toby, Chris(+3 sub), Libby | โครงเหมือน แต่สัดส่วนต่างกันคนละเรื่อง (ดูล่าง) |

### เราขาด "ชั้นสมอง" ที่แยกจากตัวลงมือทำจริงไหม

**ขาดครึ่งเดียว และครึ่งที่ขาดเรารู้อยู่แล้ว** เทียบ 6 บทบาทสมองของเธอ:

- วิจัยตลาด → **มี** Reese (`reese-research.md` MODE 1)
- วิเคราะห์ข้อมูล → **มี** Nick (`nick-analytics.md`)
- ครีเอทีฟ → **มี** Minnie (`minnie-ideas.md`)
- ตัวประสาน → **มี** Claudy
- การเงิน → **ไม่มี** — `CLAUDE.md:82` ระบุเป็น GAP ไว้แล้วเอง
- กฎหมาย → **ไม่มี** และไม่ได้อยู่ใน GAP ด้วย

ความต่างที่แท้จริงไม่ใช่จำนวน แต่คือ **agent สมองของเราถือของส่งมอบด้วย**
Reese ทั้ง research และ fact-check (2 โหมดในไฟล์เดียว), Nick ทั้งวิเคราะห์และเขียนรายงาน
ของเธอชั้นสมองคิดแล้วส่งลงชั้นล่างไปทำ ของเราคิดแล้วทำเอง

**นี่เป็นข้อเสียไหม — ไม่ใช่สำหรับสเกลของเรา** ชั้นสมองที่ไม่ผลิตอะไรเลยจะคุ้มเมื่อชั้นล่างมี 18 ตัวที่ต้องป้อนงาน
ของเรามีชั้นล่าง 7 ตัว และคนคุม 1 คน — ชั้นสมองที่ผลิตของด้วยคือการออกแบบที่ถูกต้องแล้ว
**สิ่งที่เราขาดจริง ๆ ไม่ใช่ชั้นสมอง แต่คือ "ชั้นตรวจว่าตัวเองยังทำงานอยู่ไหม"** ซึ่งไม่มีในโครงของเธอเลย

### 16 → มากกว่านี้คุ้มไหม (ตอบตรง ๆ: ไม่คุ้ม)

หลักฐานจากของจริง — จำนวนไฟล์ผลงานใน `Output/<Agent>/`:

- Reese 30 · Dale 22 · Chris 20 · Mind 15 · Minnie 15 · Rae 12 · Claudy 11
- **Nick 5 · Libby 3 · Toby 3 · Addy 2 · Vera 2**

**agent 4 ตัวจาก 12 ตัวที่ผลิตของ มีผลงาน ≤ 3 ชิ้นตลอดอายุระบบ** (Libby / Toby / Addy / Vera) — Addy เปิดใช้ 21 ส.ค. มี 2 ชิ้น
และ Vera ซึ่งควรเป็นต้นน้ำของ Mind/Dale ตาม `dale-devops.md:9` ("Vera's spec + Rae's copy are your requirements")
มี 2 ชิ้น แปลว่า pipeline design ยังไม่เดินจริง

คอขวดของเราไม่ใช่จำนวนตัวทำงาน มันคือ:
1. Kittanate เป็นคนอนุมัติทางแยกทุกจุด — ข้อจำกัดที่ Linara ยอมรับเองว่า AI แทนไม่ได้
   (ตัดสินใจตอนข้อมูลไม่พอ / อ่านว่าลูกค้ากังวลอะไรจริง) `[รอ Reese ยืนยัน]`
2. **ต้นทุนแฝงต่อ agent 1 ตัวของเราสูงกว่าของเธอ** — `SOP-09` ต้องแตะครบ 7 จุด: agent file,
   MAP ใน **2** hook ไฟล์, `status.json`, avatar 768×1376 ที่ Mind ต้องวาดใหม่ตามกฎเหล็ก 6 ข้อ,
   Firestore seed, routing table, BACKLOG · ลืมจุดเดียว = agent "มีตัวตนครึ่งเดียว" (`SOP-09` คำเตือนบรรทัดที่ 4)
3. `Output/Libby/output-index.md` ค้าง 2 เดือน = ต้นทุนประสานงานของ 16 ตัวก็เกินกำลังอยู่แล้ว

**คำตอบ: หยุดที่ 16 · ถ้าจะเพิ่ม ให้เพิ่ม Finance ตอนที่มีตัวเลขจริงต้องดูแล ไม่ใช่ตอนนี้**
และห้ามเพิ่มตามจำนวนเพื่อให้ดูเหมือนของเธอ

### acquisition 10 / conversion 5 — map มาที่เราจะได้อะไรต่างออกไป

สัดส่วน 2:1 ฝั่ง acquisition สะท้อนว่าเธอขายบริการการตลาด ให้ลูกค้า 5 ราย
ที่ทุกรายต้องการ traffic — งานคือกรอกปากกรวยให้เต็ม

ของเรามี 2 ธุรกิจที่รูปทรงไม่เหมือนกันเลย:

**โรงพิมพ์ (รายได้หลักวันนี้)** — ปากกรวยไม่ได้อยู่ออนไลน์ ลูกค้ามาทาง LINE ส่วนตัว โทรศัพท์
และลูกค้าเก่า 40 ปี (project `PrintJob` ใน memory ระบุว่าลูกค้าอยู่ LINE ส่วนตัวที่บอทแตะไม่ได้)
คอขวดคือ **ความเร็วและความถูกต้องของใบเสนอราคา** ไม่ใช่จำนวนคนเข้าเว็บ
ยืนยันจาก backlog ของ Addy เอง: P0 ของเธอคือ "baseline จากใบสั่งงาน" และ
"ชีตนับมือ M2 (คำขอราคาต่อสัปดาห์) + M3 (อัตราปิดใบเสนอราคา)" (`BACKLOG.md:259, 263–264`)
→ **นั่นคือ conversion measurement ไม่ใช่ acquisition** ถ้า map สัดส่วน 10:5 ของเธอมาตรง ๆ
เราจะลงทุนผิดฝั่งทันที

**ขาย template (ธุรกิจใหม่)** — อันนี้เป็น funnel จริงตามที่เธอบรรยาย
**แต่เรายังไม่มีสินค้าให้ funnel ขน:** `Output/Libby/template-library.csv` = 104 ไบต์ = มีแต่ header
ยังไม่มี template ที่ shipped แม้ตัวเดียว → agent acquisition วันนี้จะไม่มีอะไรให้พาคนไปดู

**สรุปการ map:** ของเธอ = agent เยอะฝั่งดึงคน เพราะสินค้าพร้อมและลูกค้าเยอะ
ของเรา = ควรลงแรงฝั่ง **"ทำให้ของที่มีแปลงเป็นเงินได้เร็วและถูกต้อง"** — ต้นทุน/ใบเสนอราคาแม่น (ข้อเสนอ #5),
ของค้นเจอ (ข้อเสนอ #4), gate ที่ตรวจจริง (ข้อเสนอ #1–2) แล้วค่อยพูดถึง acquisition
เมื่อมี template ที่ shipped ครบ 5 ตัวขึ้นไป

---

## 3. ข้อเสนอ — เรียงตาม impact/effort

### #1 ยืนยันและซ่อม hook ที่ตายเงียบ (P0 — ทำก่อนอย่างอื่นทั้งหมด)

- **ทำอะไร:** (ก) ทดลองยืนยันสาเหตุด้วย hook ทดสอบที่เขียน stdin ที่ได้ลงไฟล์ log 1 บรรทัด
  ใส่เป็นตัวที่ 2 ของ block แล้วรัน task เดียว → รู้ทันทีว่าได้ payload หรือได้ว่าง
  (ข) ถ้าเป็นเรื่อง stdin จริง: รวมเป็น `scripts/hook-chain.mjs` ที่อ่าน stdin **ครั้งเดียว**
  แล้วส่ง payload ต่อให้ลอจิกของ gate/skill/speak เป็นฟังก์ชัน (ไม่ใช่ process แยก)
  (ค) เพิ่ม `scripts/.hook-log.jsonl` (gitignore) บันทึก 1 บรรทัดต่อการยิง — ทำให้ข้อ 3 ตรวจได้ตลอดไป
- **แก้ไฟล์:** `.claude/settings.json`, ใหม่ `scripts/hook-chain.mjs`, `scripts/hook-gate.mjs`,
  `scripts/hook-skill.mjs`, `scripts/hook-speak.mjs`, `.gitignore`
- **Effort:** 3 ชม. (วินิจฉัย 0.5 + รวม hook 1.5 + ทดสอบ 1)
- **วัดผลได้ยังไง:** หลังรัน pipeline 1 รอบ — `scripts/.gate-state.json` mtime = วันนี้ และมี entry ของ session ปัจจุบัน ·
  `scripts/.skill-state.json` **ต้องมีไฟล์เกิดขึ้น** · ทดสอบตรง: เรียก `chris-qa` โดยยังไม่ผ่าน Reese
  ต้องถูก deny จริงพร้อมข้อความจาก `hook-gate.mjs:141–146`
- **ความเสี่ยง:** รวม hook ผิดอาจได้ block วนไม่จบตอนจบเทิร์น → คง `MAX_BLOCKS = 3` และ
  `if (ev.stop_hook_active) exit` ไว้ทุกตัว ทดสอบใน session ทิ้งก่อน · ถ้าสาเหตุไม่ใช่ stdin
  ให้หยุดที่ (ค) แล้วรายงาน อย่าเดารื้อต่อ

### #2 ทำให้ gate state รอดข้าม session (P0 — ทำต่อจาก #1 ทันที)

- **ทำอะไร:** (ก) `.gate-state.json` เพิ่ม key `current` ที่ merge ข้าม session — งานที่ค้าง fact-check
  ต้องยังค้างอยู่แม้เปลี่ยน session และเพิ่มคำสั่งเคลียร์มือ `node scripts/hook-gate.mjs clear`
  (ข) เลิกใช้ mtime window: `hook-status.mjs` เขียน `startedAt` ลง `status.json` ตอน start
  แล้ว `hasRecentOutput()` เทียบกับ `startedAt` ของ agent นั้นแทน 6 ชั่วโมงลอย ๆ → DoD ข้อ 1 เลิกเป็นการเดา บล็อกได้จริง
- **แก้ไฟล์:** `scripts/hook-gate.mjs` (บรรทัด 65–89, 95–104, 200), `scripts/hook-status.mjs` (บรรทัด 57–59),
  `HANDOFF.md:63–66` (แก้คำอธิบายให้ตรงพฤติกรรมใหม่)
- **Effort:** 2 ชม.
- **วัดผลได้ยังไง:** เริ่ม pipeline ให้มีงานค้าง fact-check → ปิด session → เปิดใหม่ → เรียก `chris-qa`
  **ต้องยังโดน deny** (วันนี้ผ่านฉลุย) · และ `missingOutput` ต้องไม่ขึ้นชื่อ agent ที่เพิ่งเซฟไฟล์ไปใน session ที่ยาวกว่า 6 ชม.
- **ความเสี่ยง:** ธงค้างข้าม session แบบ false positive → ต้องมีคำสั่งเคลียร์ (ก) และให้ข้อความ block
  บอก path คำสั่งเคลียร์ทุกครั้ง ไม่งั้นจะติดตัน

### #3 Trajectory test ระดับ 1 — hook contract test 5 เคส

- **ทำอะไร:** `tests/hook/*.json` เก็บ payload + expected แล้ว `scripts/run-tests.mjs` รันทั้งชุดในโฟลเดอร์ temp
  (ROOT แยก ไม่แตะ state จริง — วิธีเดียวกับที่ผมใช้ตรวจในรอบนี้แล้วได้ผล) เคสตาม §1.6 ระดับ 1 (a)–(e)
  เพิ่มบรรทัดใน `SOP-09` ว่าสร้าง agent ใหม่ต้องเพิ่มเคส FACTUAL/VISUAL 1 เคส
- **แก้ไฟล์:** ใหม่ `tests/hook/`, ใหม่ `scripts/run-tests.mjs`, `SOP/SOP-09-new-agent.md`, `CLAUDE.md` (ข้อ 4)
- **Effort:** 3 ชม.
- **วัดผลได้ยังไง:** `node scripts/run-tests.mjs` → `5/5 PASS` และรันได้ใน < 5 วินาที ·
  ทดสอบว่าเทสต์มีค่าจริง: แก้ `FACTUAL` ใน `hook-gate.mjs` ให้ผิดชั่วคราว → ต้องมีเคส fail
- **ความเสี่ยง:** ต่ำ ไม่แตะ production path เลย · ความเสี่ยงจริงคือคนไม่รัน → ผูกไว้ใน `SOP-09`
  และ `.claude/skills/` ที่เกี่ยว hook ให้เรียกก่อน commit
  _(ระดับ 2 routing test ยังไม่ต้องทำ — flaky และต้องเสียโมเดล 1 รอบต่อเคส รอให้ระดับ 1 อยู่ตัวก่อน)_

### #4 Index อัตโนมัติ แทน index ทำมือของ Libby

- **ทำอะไร:** `scripts/build-index.mjs` สแกน `Output/**/*.md` ดึง H1 + วันที่จากชื่อไฟล์ + agent จากโฟลเดอร์
  → เขียน `Output/Libby/output-index.md` ใหม่ทั้งไฟล์ (group ตามเดือน, 1 บรรทัด/ไฟล์) เรียกจาก hook chain ตอน done
  แล้วแก้ `libby-index.md` ให้ Libby เลิกทำ index ด้วยมือ เหลือหน้าที่ที่โค้ดทำไม่ได้: โยง chain
  (idea→research→draft→factcheck→QA), flag เวอร์ชันซ้อน, flag ชื่อผิด convention
- **แก้ไฟล์:** ใหม่ `scripts/build-index.mjs`, `scripts/hook-chain.mjs` (จาก #1), `.claude/agents/libby-index.md`
- **Effort:** 2.5 ชม.
- **วัดผลได้ยังไง:** index ต้องครอบคลุมทุกไฟล์ที่มี (ณ 10 ก.ย. = 120 ไฟล์ · วันนี้ index ครอบคลุม 34) และ mtime ขยับทุกครั้งที่มีผลงานใหม่ ·
  เทสต์ค้นหา: ถาม "เคยทำเรื่องต้นทุนกระดาษไหม" ต้องได้ path ครบจาก index ไม่ต้อง grep ทั้งโฟลเดอร์
- **ความเสี่ยง:** index บวมตามเวลา → บังคับ 1 บรรทัด/ไฟล์และ group ตามเดือน · ถ้าเจนผิดจะทับงานที่ Libby
  ใส่มือไว้ → เก็บส่วน chain/flag ของ Libby ไว้ใน **ไฟล์แยก** `output-chains.md` ที่สคริปต์ไม่แตะ

### #5 แยกข้อมูลวัสดุออกจาก HTML → แล้วค่อยห่อเป็น MCP `tanapat-print`

- **ทำอะไร:** **เฟส A (ต้องทำ):** ย้าย `MATS` 71 รายการจาก `Printing costs/index.html:579`
  ไปเป็น `Printing costs/data/materials.json` แหล่งเดียว ให้ทั้ง `index.html` และ `PrintCost-Dashboard.html`
  โหลดจากไฟล์นี้ (สองไฟล์นี้ต้องเหมือนกันเป๊ะ — ตอนนี้ `diff` = 0 บรรทัด ต้องรักษาไว้)
  **เฟส B (ทำต่อเมื่อ A นิ่งแล้ว):** stdio MCP server 3 tool — `paper_find` (ชื่อ/แบรนด์/แกรม → สเปก + `fixed` flag),
  `sheet_price` (แกรม+ขนาด+ราคา/กก. → บาท/แผ่น, บาท/รีม ตามสูตร `CONTEXT.md:49`),
  `spec_check` (bleed 3mm / CMYK / 300dpi / จำนวนหน้าหาร 4)
- **แก้ไฟล์:** `Printing costs/index.html`, `Printing costs/PrintCost-Dashboard.html`,
  ใหม่ `Printing costs/data/materials.json` · เฟส B: repo ใหม่ `mcp-tanapat-print/` +
  `.claude/agents/reese-research.md`, `rae-writer.md`, `addy-marketing.md` (frontmatter `tools:` ต้องเพิ่ม MCP tool ไม่งั้นเรียกไม่ได้)
- **Effort:** เฟส A 3 ชม. · เฟส B 4 ชม. (รวม 7 ชม.)
- **วัดผลได้ยังไง:** เฟส A — แก้ราคา 1 รายการที่ `materials.json` แล้วทั้ง 2 หน้าเปลี่ยนตาม
  โดยไม่แตะ HTML เลย · เฟส B — สุ่ม 10 เคส ราคาจาก tool ต้องตรงกับเลขบนเวป 100% และ
  `fixed:true` ต้องแยกออกจากค่าประมาณได้ในคำตอบทุกครั้ง (21 รายการยืนยันจริง จาก 71)
- **ความเสี่ยง:** GitHub Pages + `fetch` JSON = path ผิดแล้วหน้าว่างทันที (เคยเจอกับ `.nojekyll` มาแล้ว
  `HANDOFF.md:70`) → ต้องมี fallback inline หรือ build step ที่ฝัง JSON กลับเข้าไฟล์ ·
  **เฟส A ต้องผ่าน Chris QA ก่อนแตะเฟส B** เพราะเป็นเวปที่ใช้จริง (`dale-devops.md:23` งานเวปที่ live = แก้เล็กที่สุด)

---

## 4. สิ่งที่ไม่ควรทำ (บอกตรง ๆ ว่าไม่ควร)

- **⛔ เพิ่ม agent ให้ไปทาง 27 ตัว** — 4 จาก 12 agent ที่ผลิตของมีผลงาน ≤ 3 ชิ้น
  และ `SOP-09` มีต้นทุน 7 จุดต่อ 1 ตัว (รวมวาด avatar ใหม่) เพิ่มตอนนี้คือเพิ่มพื้นผิวที่ต้องดูแล ไม่ใช่เพิ่มกำลังผลิต
- **⛔ เปลี่ยน routing table เป็น dynamic router** — เสีย debuggability + testability + token
  แลกกับความยืดหยุ่นที่เรายังไม่ต้องการ (§1.3)
- **⛔ Vector DB / semantic memory bank** — ปัญหาการค้นของเราคือ index ที่ค้าง 2 เดือน
  ไม่ใช่ ranking แย่ ข้อเสนอ #4 แก้ตรงเหตุที่ 2.5 ชม. vector store คือของที่ต้อง sync + จ่ายค่าโฮสต์ตลอดไป
- **⛔ MCP Toolbox for Databases** — เราไม่มี SQL DB และ Firestore ตัวที่ใช้ก็เปิดเผยข้อมูลทั้งหมด
  ตามธรรมชาติของมัน (`CONTEXT.md:57`) จับต่อ DB tool ไม่มีอะไรให้ query
- **⛔ Remote / hosted MCP server** — เพิ่ม service ที่ต้อง auth + ต่ออายุ token ให้คนเดียวดูแล
  ทุกโปรเจกต์เราเป็น static hosting และ cloud routine ยัง push ไม่ได้อยู่แล้ว
- **⛔ ลอกโครง SessionService/MemoryService ของ ADK** — Claude Code เป็น runtime ของเรา
  ไม่ใช่ ADK สร้างชั้น abstraction ที่ไม่มีใครเรียกคือหนี้
- **⛔ trajectory test ระดับ 2/3 ในรอบนี้** — flaky และเสียโมเดลต่อเคส รอให้ระดับ 1 (#3) รันอยู่ตัวก่อน

---

## 5. รายการที่พึ่งข้ออ้างในบทความ (รอ Reese ยืนยัน)

1. รายการ 15 หัวข้อของคอร์ส Google — พาดหัวบอก 11 ตอน แต่หัวข้อในโพสต์ 15 ข้อ (ไฟล์ต้นทางตั้งข้อสังเกตไว้เอง)
2. ข้ออ้างว่า "memory คือจุดตายของงาน production" — ในระบบเราจุดตายคือ retrieval + state ตายข้าม session ไม่ใช่ persistence
3. ตัวเลขของ Linara ทุกตัว (27 agent, งบ ~32,000 บาท/เดือน, ลูกค้า 14/5 ราย, 2 ชม./สัปดาห์/ลูกค้า, สเกล 20–25 ราย)
4. โครงสร้าง 3 ชั้น Directives/Orchestration 6/Execution 18 และการแบ่ง acquisition 10 / conversion 5
5. ข้อจำกัดที่เธออ้างว่า AI ทำไม่ได้ (อ่านความกังวลลูกค้า / ตัดสินใจตอนข้อมูลไม่พอ)
6. ภาพประกอบบทความ B เป็น workflow n8n ไม่ใช่โครง 27 agent — อาจเป็นภาพ stock

**ย้ำ:** ข้อเสนอ #1–#5 ไม่มีข้อไหนพึ่ง 6 ข้อนี้ ทุกข้ออ้างอิงหลักฐานในโค้ดของเราเอง
ถ้า Reese พบว่าบทความเกินจริงทั้งหมด แผนงานไม่เปลี่ยน

---

## ภาคผนวก — วิธีตรวจซ้ำ (ทำได้ใน 2 นาที)

```
ls -la scripts/.gate-state.json scripts/.skill-state.json status.json worklog.json
find Output -type f -name "*.md" | wc -l          # 120 (119 ก่อนนับรายงานฉบับนี้)
head -6 Output/Libby/output-index.md              # index 2026-07-06, 34 ไฟล์
grep -c "fixed:\s*true" "../Printing costs/index.html"           # 21 จาก 71 รายการ
diff "../Printing costs/index.html" "../Printing costs/PrintCost-Dashboard.html" | wc -l   # 0
```

