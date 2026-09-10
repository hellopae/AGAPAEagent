# [Research] ตรวจสอบบทความ AI Agent 2 ชิ้น — Google Crash Course & เคส Linara Bozieva

**ผู้จัดทำ:** Reese (Research / Fact-check) · **วันที่:** 10 ก.ย. 2569
**ต้นทาง:** `Output/Kittanate-source/2026-09-10-agent-articles-source.md`
**SOP:** SOP-05 Research Sprint

---

## 1. คำตอบสั้น

1. **บทความ A (Google) — จริงเกือบทั้งหมด** playlist "AI Agent Crash Course" ของ Google Cloud Tech มีจริง **11 วิดีโอ** (พาดหัวถูก) และ **15 หัวข้อในโพสต์ก็ถูก** — แต่มันคือ "หัวข้อย่อยที่กระจายอยู่ใน 11 ตอน" ไม่ใช่ 15 ตอน โพสต์ไม่ผิดข้อเท็จจริง แต่วางโครงชวนเข้าใจผิด
2. **ฟรีจริง** ทั้งวิดีโอและ codelab แต่ **ADK ≠ ฟรีทั้งหมด**: ตัว framework เป็น Apache-2.0 รันบนเครื่องตัวเองได้ (LiteLLM/Ollama ก็ได้) ส่วน **Memory Bank บังคับผูก Google Cloud และเริ่มเก็บเงินจริง 1 ก.ย. 2569**
3. **บทความ B (Linara Bozieva) — ตัวคนจริง เคสจริง แต่ตัวเลขทุกตัวเป็นคำบอกเล่าเจ้าตัวใน essay แบบ "as told to" ของ Business Insider (20 พ.ค. 2569) ไม่มีหลักฐานภายนอกยืนยันแม้ตัวเดียว** ที่หนักกว่านั้น: จำนวน agent ของเธอเองขยับจาก 27 → 35 → "30+" → "100+" ภายใน 4 เดือน
4. **โครงสร้าง 3 ชั้นไม่มี repo/สไลด์สาธารณะ** — ถูกแปลงเป็น **สินค้าขาย $497–$4,997** บน built-not-hired.com
5. **ข้อสังเกตเรื่องภาพ diagram — ยืนยัน** ชื่อ node จริงใน n8n คือ "Groq Chat Model" (หรือ "xAI Grok Chat Model") ไม่มี "Grog" และ stack ที่เธอเผยแพร่เองไม่มี n8n เลย → ภาพนั้นไม่ใช่ระบบของเธอ

---

## 2. หลักฐานรายข้อ

### A. Google Cloud Tech — "AI Agent Crash Course"

#### A1. playlist มีจริง / ชื่อจริง / จำนวนตอน — ✅ **ยืนยันแล้ว**

| รายการ | ข้อมูลจริง |
|---|---|
| ชื่อ playlist | **AI Agent Crash Course** (ตรงกับที่โพสต์อ้าง) |
| ช่อง | **Google Cloud Tech** (`@googlecloudtech`, channel ID `UCJS9pqu9BzkAMNTmzNMNhvg`) |
| ลิงก์จริง | https://www.youtube.com/playlist?list=PLIivdWyY5sqLNeW9MPxldbbevMEJGMWBG |
| จำนวนวิดีโอ | **11 รายการ** |
| ยอดดูหน้า playlist | 64,913 ครั้ง (ณ 10 ก.ย. 2569) |
| อัปเดตล่าสุด | 27 ส.ค. 2569 |
| ผู้บรรยาย | **Annie Wang** (ทุกตอน) |

> ดึงจาก `ytInitialData` ของหน้า playlist โดยตรง — ข้อความไทยในหน้า: "วิดีโอ 11 รายการ · การดู 64,913 ครั้ง · อัปเดตล่าสุดเมื่อ 27 ส.ค. 2026"

**รายการ 11 ตอนจริง** (ยืนยันชื่อผ่าน YouTube oEmbed API ทีละตัว):

| # | ชื่อตอน | วันเผยแพร่ | ยอดดู | ลิงก์ |
|---|---|---|---|---|
| 1 | Foundations of multi-agent systems with ADK | 1 ต.ค. 2568 | 30,651 | https://youtu.be/pX0_iIfRilU |
| 2 | Workflow agents and communication in ADK | 8 ต.ค. 2568 | 13,661 | https://youtu.be/WfJcCeLZD2I |
| 3 | Connecting ADK Agents to MCP Servers | 7 พ.ย. 2568 | 23,484 | https://youtu.be/JnKkdHaatwU |
| 4 | Building your own MCP server with ADK | 17 พ.ย. 2568 | 25,134 | https://youtu.be/XwlVHm3JKWU |
| 5 | The agent evaluation revolution | 3 ธ.ค. 2568 | 26,110 | https://youtu.be/WZZLtwnZ4w0 |
| 6 | How to evaluate agents in practice | 12 ธ.ค. 2568 | 47,765 | https://youtu.be/vuBvf7ZRKTA |
| 7 | AI agent design patterns | 27 ก.พ. 2569 | **446,418** | https://youtu.be/GDm_uH6VxPY |
| 8 | 3 Advanced AI agent design patterns | 17 มี.ค. 2569 | 88,628 | https://youtu.be/89KKm_a4M7A |
| 9 | How to add short-term memory to your AI agent (Sessions & State Explained) | 26 มี.ค. 2569 | 45,720 | https://youtu.be/vfVcDUCucSs |
| 10 | How to add persistent memory to your AI agent | 8 เม.ย. 2569 | 35,441 | https://youtu.be/HDqzJJhZsxw |
| 11 | AI agent long-term memory with memory bank | 16 เม.ย. 2569 | 30,898 | https://youtu.be/KZPo15M2DbM |

**คำตัดสิน "11 ตอน vs 15 ข้อ":** ✅ **11 = จำนวนตอน ถูกต้อง** และหัวข้อทั้ง 15 ข้อในโพสต์ก็ **มีอยู่จริงทั้งหมด** แต่เป็นหัวข้อย่อย/chapter ภายใน 11 ตอน เช่น
- ข้อ 1 "3 โครงสร้างพื้นฐาน" = ตอน 7 (chapter: Single / Sequential / Parallel agent)
- ข้อ 2–4 (Loop / Coordinator / Agent-as-Tool) = ตอน 8 ทั้งก้อน (3 chapter ในตอนเดียว)
- ข้อ 8–9 (SessionService vs MemoryService, PreloadMemoryTool) = ตอน 11 (chapter 1:14 "Session vs memory", 1:30 "MemoryService options")
- ข้อ 14 (MCP Toolbox) = ตอน 4 (chapter 5:02 "Building a database MCP server with MCP Toolbox")
- ข้อ 15 (Testing Pyramid) = ตอน 6

⚠️ **ยอดดู "~57,789" ในโพสต์**: ตัวเลขนี้คือยอดดู "หน้า playlist" ไม่ใช่ยอดดูรวมของวิดีโอ ยอดจริงของ playlist วันนี้คือ 64,913 (โตขึ้นตามเวลา = สอดคล้อง) แต่ **ยอดดูรวมของ 11 ตอนคือ ~813,000 ครั้ง** — ถ้าจะเขียนถึง อย่าใช้เลข playlist มาเป็น "ความนิยมของคอร์ส" เพราะต่ำกว่าความจริง 12 เท่า

#### A2. ฟรีจริงไหม — ✅ **ยืนยันแล้ว (มีเงื่อนไข)**

- **วิดีโอ:** ฟรี ไม่ต้องล็อกอิน ไม่ต้องมี Google Cloud account
- **Lab ประกอบ:** เป็น **Google Codelabs** (ฟรี) ไม่ใช่ Cloud Skills Boost ที่ต้องใช้เครดิต — ตรวจโดย resolve short link:
  - `goo.gle/agenticpattern` → https://codelabs.developers.google.com/adkcourse/instructions
  - `goo.gle/agentmemorylab` → https://codelabs.developers.google.com/codelabs/agent-memory/instructions
  - `goo.gle/testagent` → https://codelabs.developers.google.com/adk-eval/instructions
- ⚠️ **จุดที่เสียเงิน:** lab ที่แตะ Memory Bank ต้องมี Google Cloud project + `gcloud auth` (ดู A3)

#### A3. framework = Google ADK และผูกกับ GCP แค่ไหน — ✅ **ยืนยันแล้ว**

**ใช่ — ทุกตอนสอนบน ADK (Agent Development Kit)** ยืนยันจาก metadata ของวิดีโอเอง: field "Products Mentioned: Agent Development Kit" ปรากฏใน 9/11 ตอน และ hashtag `#ADK`

**ADK ฟรีและรันบนเครื่องตัวเองได้จริง** — ✅ ยืนยันแล้ว
- License **Apache 2.0** (https://github.com/google/adk-python/blob/main/LICENSE)
- README: *"While optimized for Gemini, ADK is **model-agnostic, deployment-agnostic**, and compatible with other frameworks."* (https://github.com/google/adk-python)
- ต่อ LiteLLM ได้ → ใช้ OpenAI / Anthropic / Ollama / Mistral ฯลฯ (https://adk.dev/agents/models/litellm/)
- มีทั้ง Python / Java / Kotlin / Go / TypeScript
- ⚠️ **ADK ขึ้น 2.0 แล้วและมี breaking changes** — README เตือน: *"This release includes breaking changes to the agent API, event model, and session schema."* วิดีโอชุดนี้ถ่ายช่วง ADK 1.x (ต.ค. 2568 – เม.ย. 2569) **โค้ดในคลิปอาจรันไม่ผ่านบน ADK 2.0** ← ข้อนี้โพสต์ไทยไม่ได้บอก และเป็นกับดักจริงถ้าจะทำตาม

**Memory Bank ต้องเสียเงิน** — ✅ ยืนยันแล้ว
- ADK doc: Memory Bank คือ *"a fully managed Google Cloud service"* prerequisite = *"a Google Cloud Project", "an Agent Runtime on Agent Platform", `gcloud auth application-default login`* (https://adk.dev/sessions/memory/)
- **ราคาทางการ** (Gemini Enterprise Agent Platform pricing, ดึงจากหน้าเว็บ Google 10 ก.ย. 2569 — https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing):
  - *"Memory Bank billing on this pricing structure will **commence on September 1st, 2026**"* ← เพิ่งเริ่มเก็บจริงเมื่อ 9 วันก่อน
  - Storage: **$0.30 / GiB-month** (Agent Storage)
  - Read: 1 Agent Compute vCPU-h (**$0.085**) ต่อ **3 ล้าน** read operations
  - Write: 1 Agent Compute vCPU-h (**$0.085**) ต่อ **1 ล้าน** write operations
  - Token สำหรับ memory generation + embedding **คิดแยก** ตาม model SKU
  - **Free tier ต่อเดือนต่อ account:** Agent Compute 50 vCPU-h, Agent Memory 100 GiB-h, Agent Storage 1 GiB-month
- ⚠️ ตัวเลข **"$0.25 ต่อ 1,000 events/memories"** ที่พบในบล็อกภายนอกหลายแห่ง **ไม่ปรากฏบนหน้าราคาทางการปัจจุบัน** — ถือว่าเป็นโครงสร้างราคาเก่า/ไม่ยืนยัน ห้ามอ้างอิง
- ทางเลี่ยง: มี **express mode** สมัครด้วย Gmail ได้ API key ใช้ Sessions + Memory Bank ในโควตา free tier (https://cloud.google.com/blog/products/ai-machine-learning/vertex-ai-memory-bank-in-public-preview, 9 ก.ค. 2568)
- ถ้าไม่อยากจ่าย: ใช้ `InMemoryMemoryService` (keyword matching, หายเมื่อ restart) หรือ `DatabaseSessionService` (persistent, DB ของเราเอง) ได้ฟรี

**สรุประดับการผูก GCP:** ADK core = ฟรี/รันเองได้ · Memory Bank + Agent Engine/Agent Runtime = **ผูก GCP 100% และมีค่าใช้จ่าย** · Agent Runtime deployment = ผูก GCP

#### A4. Concept หลักตามเอกสาร Google จริง — ✅ **ยืนยันแล้ว (มีจุดที่โพสต์เรียกชื่อไม่ครบ)**

**(ก) Loop pattern (Generator/Critic)**
Google เรียกใน video description ตอน 8 ว่า *"The Loop Pattern (**Review & Critique**): Build self correcting AI using a **generator and critic agent** to iteratively refine outputs until strict conditions are met."* → โพสต์ไทยถูก
กลไก: `LoopAgent` รัน sub-agents ซ้ำจนครบ `max_iterations` **หรือ** จนมี agent ส่ง `escalate=True` ใน `EventActions` (https://adk.dev/agents/workflow-agents/loop-agents/)
ตัวอย่างมาตรฐานของ Google เป็น **3 ตัว** ไม่ใช่ 2: Generator → Critic → Refiner

**(ข) Coordinator pattern**
Google: *"The Coordinator Pattern (Dynamic Routing): Create a 'smart manager' that uses **hierarchical task decomposition** to dynamically route complex LLM requests to specialized sub-agents."* (ตอน 8, chapter 3:08 + 3:26)
ADK doc: *"Declaring `SubAgents` on the coordinator agent causes ADK to **automatically generate a delegation tool for each subagent**, named after the subagent itself."* (https://adk.dev/workflows/collaboration/)
บล็อก Google Developers "Developer's guide to multi-agent patterns in ADK" (Shubham Saboo, 16 ธ.ค. 2568) ระบุ pattern ทั้งหมด **8 แบบ**: Sequential Pipeline / Coordinator-Dispatcher / Parallel Fan-Out-Gather / Hierarchical Decomposition / Generator-and-Critic / Iterative Refinement / Human-in-the-Loop / Composite

**(ค) "Agent-as-Tool" vs "Sub-agent delegation" — ต่างกันตรงไหน**
นี่คือจุดที่โพสต์ไทยพูดสั้นเกินไป ของจริงตามบล็อกทางการ Google Cloud (Dharini Chandrashekhar, 8 พ.ย. 2568 — https://cloud.google.com/blog/topics/developers-practitioners/where-to-use-sub-agents-versus-agents-as-tools):

| | **Agent as Tool** (`AgentTool`) | **Sub-Agent** (`sub_agents` / `transfer_to_agent`) |
|---|---|---|
| ใครคุมบทสนทนา | **agent แม่คุมเต็ม** — เรียกเหมือนเรียก API แล้วรับ output กลับ | **agent ลูกรับช่วงคุม** เอง multi-step ได้ |
| Context | **isolated** — รันใน session ตัวเอง **เข้าถึงประวัติ/state ของแม่ไม่ได้** | **shared** — อยู่ session เดียวกัน เห็นประวัติและ state ของแม่ |
| ลักษณะ | stateless, มี input/output contract ชัด, reusable สูง | stateful, hierarchical delegation, coupling สูง |
| เหมาะกับงาน | ความซับซ้อนต่ำ–กลาง | ความซับซ้อนสูง |
| Autonomy | ต่ำ | สูง |

**Golden Rule ของ Google:** *"Use **tools** for discrete, stateless, and reusable capabilities. Use **sub-agents** for complex, stateful, and context-dependent processes."*
ADK doc ยังแยกช่องทางสื่อสาร 3 แบบ (ตอน 2, chapter 1:50–3:26): **Shared Session State / LLM-Driven Delegation / Explicit Invocation (AgentTool)**
⚠️ กับดัก production ที่ Google **ไม่** เตือนในคลิป แต่คนใช้จริงเจอ: sub-agent ลูกมักไม่ยอม `transfer_to_agent` กลับหาแม่ ทำให้ผู้ใช้ติดอยู่กับ agent ลูก (แหล่ง: https://github.com/google/adk-python/issues/729, https://practicallyagents.com/articles/adk-sub-agents-vs-agent-tool/ — **แนวโน้ม** ไม่ใช่เอกสารทางการ)

**(ง) SessionService vs MemoryService / Memory Bank / PreloadMemoryTool** — ✅ ยืนยันแล้ว (https://adk.dev/sessions/memory/)

| | ทำอะไร |
|---|---|
| **SessionService** | *"a `Session` tracks the history (`events`) and temporary data (`state`) of a single conversation"* — ความจำในบทสนทนาเดียว |
| **MemoryService** | *"a searchable archive or knowledge library the agent can consult, potentially containing information from many past chats or other sources"* — ความจำข้ามบทสนทนา |
| `InMemoryMemoryService` | *"basic keyword matching"* ไม่ persist หายเมื่อ restart — สำหรับ prototype |
| `DatabaseSessionService` | session ลง DB จริง — นี่คือตัวที่ทำ "persistent memory" ในตอน 10 |
| `VertexAiMemoryBankService` | ต่อ Memory Bank บน GCP — *"advanced semantic search"* + memory ที่ **LLM-extracted** (สกัดใจความ ไม่เก็บ transcript ดิบ) |
| **PreloadMemoryTool** | *"automatically retrieves memory at the beginning of each turn, similar to a callback"* — ต่างจาก `LoadMemory` ที่ agent ตัดสินใจเรียกเองเมื่อคิดว่าจำเป็น |

⚠️ **แก้ความเข้าใจผิดของโพสต์:** โพสต์เขียน "ทำ Semantic search ด้วย PreloadMemoryTool" — ไม่ถูกทั้งหมด **semantic search มาจาก Memory Bank ไม่ใช่จาก PreloadMemoryTool** ตัว PreloadMemoryTool แค่ตัดสินใจ *เวลา* ที่จะดึง (ทุกเทิร์นอัตโนมัติ vs ให้ LLM เลือก) ถ้าใช้ `InMemoryMemoryService` ก็ได้แค่ keyword matching ไม่มี semantic

**(จ) Workflow agents: Sequential / Parallel / Loop** — ✅ ยืนยันแล้ว
ADK แบ่ง agent เป็น 3 ประเภท: **LLM Agents / Workflow Agents (Sequential, Parallel, Loop) / Custom Agents** (ตอน 1, chapter 2:24–3:13) — Workflow agents คือ *"template workflows extended from BaseAgent [that] provide fixed execution logic structures"* (https://adk.dev/workflows/) กล่าวคือเป็น **deterministic ไม่ใช้ LLM ตัดสินใจ flow** ← จุดสำคัญที่โพสต์ไม่บอก

**(ฉ) MCP + MCP Toolbox for Databases** — ✅ ยืนยันแล้ว
- MCP = *"an open standard acting as a universal adapter for AI agents to interact with external systems"* (ตอน 3)
- **MCP Toolbox for Databases** เป็นของจริง: *"an open source Model Context Protocol (MCP) server that connects your AI agents, IDEs, and applications directly to your enterprise databases"* — License **Apache 2.0** maintainer `googleapis` (https://github.com/googleapis/mcp-toolbox)
- ⚠️ **repo ย้ายชื่อแล้ว**: `googleapis/genai-toolbox` → **`googleapis/mcp-toolbox`** doc ที่ https://mcp-toolbox.dev/
- README ระบุตรง ๆ ว่ารองรับ **Claude Code / Codex / Gemini CLI / Antigravity** เป็น MCP client ได้ทันที ด้วย prebuilt tools (`list_tables`, `execute_sql`) → **ใช้กับ stack ของ AGAPAE ได้เลยไม่ต้องมี ADK**
- มี SDK: Python `toolbox-core`, JS `@toolbox-sdk/core`, Go, Java

**(ช) Testing pyramid 3 ระดับ + trajectory evaluation** — ✅ ยืนยันแล้ว
video description ตอน 6 ระบุชัด: *"Learn about the **3-Tier Testing Pyramid**, covering component level unit tests, trajectory level integration tests, and human review."* chapter:

| Tier | ชื่อจริง | วัดอะไร |
|---|---|---|
| 1 | **Component level unit tests** (1:15) | ฟังก์ชัน/tool แต่ละตัวทำงานถูกไหม |
| 2 | **Trajectory level integration tests** (1:55) | ลำดับการตัดสินใจ/เรียก tool ถูกไหม |
| 3 | **End to end human review** (2:22) | คนตรวจคุณภาพจริง |

**trajectory evaluation วัดอะไร** — ตาม ADK doc (https://adk.dev/evaluate/, https://adk.dev/evaluate/criteria/):
- *"Due to the probabilistic nature of models, deterministic 'pass/fail' assertions are often unsuitable for evaluating agent performance."*
- วัด **"the sequence of steps taken to reach the solution"** โดยเทียบ *"actual trajectory to an expected, or ideal, one"* เพื่อ *"reveal errors and inefficiencies in the agent's process"*
- เกณฑ์ tool trajectory เทียบลำดับ tool ที่เรียกจริงกับ expected list แล้วให้คะแนนตาม match type: **EXACT / IN_ORDER / ANY_ORDER**
- เกณฑ์ที่สองคือ **response quality** (เทียบคำตอบสุดท้ายกับ reference answer)
- เครื่องมือ: `adk web` (UI) / `adk eval` (CLI) / `pytest` (programmatic) / `adk conformance` (regression กับ baseline recording)
- ⚠️ **หมายเหตุความไม่ตรงกัน:** เอกสาร ADK เอง (adk.dev/evaluate/) อธิบายเป็น **2 ระดับ** (unit test file สำหรับ session ง่าย / evalset สำหรับ multi-turn ซับซ้อน) — "3 ระดับ" มาจาก **วิดีโอ** ที่เพิ่ม "human review" เป็น tier 3 ทั้งสองไม่ขัดกันแต่ไม่ใช่คำเดียวกัน ถ้าจะเขียนบทความควรอ้างว่า "3-tier ตามที่ Google สอนในคลิป"

#### A5. เทียบกับ Claude Code / Claude Agent SDK ที่ AGAPAE ใช้อยู่

| Concept ของ ADK | Claude Code / Agent SDK | ระดับความเทียบเท่า |
|---|---|---|
| **Sub-agent delegation** | `.claude/agents/*.md` (YAML frontmatter + system prompt) — *"Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions"* | ✅ **มีแล้ว** แต่ semantics **ต่างจาก ADK**: Claude Code subagent ได้ **fresh isolated context** *"It doesn't see your conversation history"* → พฤติกรรมใกล้ **AgentTool** ของ ADK มากกว่า sub-agent |
| **Agent-as-Tool** (isolated context, แม่คุม) | subagent ปกติของ Claude Code = โมเดลนี้เลย (*"returns only the summary"*) | ✅ **มีแล้ว = ค่าเริ่มต้น** |
| **Sub-agent ที่ share session state กับแม่** | `subagent_type: "fork"` — *"A fork is a subagent that inherits the entire conversation so far instead of starting fresh"* | ⚠️ **มีบางส่วน** — fork ได้ประวัติ แต่ไม่ใช่ state ที่เขียนกลับร่วมกันแบบ ADK `session.state` |
| **Coordinator / dynamic routing** | AGAPAE ทำเองด้วย ROUTING TABLE ใน `CLAUDE.md` + Claudy | ⚠️ **ทำเองด้วย prompt ไม่มี primitive** — ADK มี `sub_agents` ที่ generate delegation tool ให้อัตโนมัติ |
| **Workflow agents: Sequential / Parallel / Loop (deterministic)** | ❌ **ไม่มีของเทียบเท่า** — Claude Code เป็น LLM-driven ทั้งหมด; parallel ทำได้แค่ยิง subagent หลายตัวพร้อมกัน (background) แต่ไม่มี `SequentialAgent`/`LoopAgent` ที่การันตีลำดับด้วยโค้ด | ❌ **ไม่มี** (AGAPAE ทดแทนด้วย SOP + hook `hook-gate.mjs` — ซึ่งจริง ๆ คือ deterministic gate แบบเดียวกันในเชิงผลลัพธ์) |
| **Loop / Generator-Critic** | pattern นี้ AGAPAE ใช้อยู่แล้วโดยไม่ต้องมี primitive: Rae (generator) → Reese (critic) → Chris (QA gate) | ✅ **มีในทางปฏิบัติ** ผ่าน pipeline + hook แต่ ❌ ไม่มี `LoopAgent`/`escalate` ที่ระบบบังคับวนซ้ำเอง |
| **SessionService (events + state)** | Sessions ของ Agent SDK — *"Maintain context across exchanges, resume or fork later"* (`--resume`/`--continue`) | ✅ **มีแล้ว** |
| **MemoryService / Memory Bank (ความจำข้ามบทสนทนา + semantic search)** | `CLAUDE.md` / `~/.claude/.../MEMORY.md` = memory แบบ **ไฟล์ข้อความที่โหลดทุกครั้ง** ไม่มี semantic search, ไม่มี LLM-extraction, ไม่มี managed store | ❌ **ไม่มีของเทียบเท่า** ← **ช่องว่างใหญ่ที่สุด** ของ AGAPAE |
| **PreloadMemoryTool (ดึง memory อัตโนมัติทุกเทิร์น)** | `CLAUDE.md`/`MEMORY.md` โหลดอัตโนมัติทุก session = ใกล้เคียงเชิงพฤติกรรม แต่เป็น static file ไม่ใช่ retrieval | ⚠️ **มีบางส่วน** |
| **MCP client** | ✅ รองรับเต็ม (AGAPAE ต่ออยู่แล้ว: Todoist, Gmail, Drive, Figma, Canva, Chrome) | ✅ **มีแล้ว** |
| **MCP server เขียนเอง / MCP Toolbox for Databases** | ใช้ได้ตรง ๆ — README ของ Toolbox ระบุ Claude Code เป็น client ที่รองรับ | ✅ **ใช้ของ Google ได้เลย** ยังไม่ได้ใช้ |
| **Testing pyramid / trajectory evaluation (`adk eval`)** | ❌ **ไม่มี built-in** — Agent SDK มี hooks (`PreToolUse`/`PostToolUse`/`SubagentStop`) ให้ instrument ได้ แต่ eval framework ต้องพึ่งของนอก (promptfoo, MLflow autolog, claude-evals) | ❌ **ไม่มี** ← **ช่องว่างอันดับ 2** AGAPAE ปัจจุบันวัดแค่ "ผลลัพธ์สุดท้าย" ผ่าน Chris QA = ตรงกับสิ่งที่โพสต์วิจารณ์ว่า "สาย demo" ทำ |
| **Hooks / lifecycle control** | ✅ มีเต็ม (`hook-gate.mjs`, `hook-status.mjs`, `hook-skill.mjs` ที่ AGAPAE ใช้) — ADK มี callbacks แต่ไม่ได้เป็น config-level แบบนี้ | ✅ **Claude Code เหนือกว่า** |
| **Skills / Plugins** | ✅ `.claude/skills/` + plugins | ✅ **Claude Code มี ADK ไม่มีของเทียบตรง** |
| **Permissions ต่อ subagent** | ✅ `tools` allowlist / `disallowedTools` / `permissionMode` | ✅ **Claude Code เหนือกว่า** |

> แหล่ง: https://code.claude.com/docs/en/sub-agents · https://code.claude.com/docs/en/agent-sdk/overview

**สรุปช่องว่างที่ AGAPAE ควรสนใจจริง ๆ (เรียงตามผลกระทบ):**
1. **ไม่มี long-term memory ที่ค้นแบบ semantic** — memory ของ AGAPAE เป็น markdown ที่โตขึ้นเรื่อย ๆ (MEMORY.md ปัจจุบัน 28 รายการ) วันหนึ่งจะกินโทเคนและค้นไม่เจอ
2. **ไม่มี trajectory evaluation** — วัดแค่ output สุดท้าย ไม่มีตัวจับว่า agent เรียก tool ผิดลำดับ/เรียกเกิน
3. **ไม่มี deterministic workflow primitive** — ลำดับ pipeline พึ่ง prompt + hook ซึ่ง hook ช่วยได้แต่ไม่ใช่ orchestrator

---

### B. เคส Linara Bozieva / 27 AI agents

#### B1. มีตัวจริงไหม — ✅ **ยืนยันแล้ว ทั้งคน แบรนด์ และบทความต้นฉบับ**

| รายการ | สถานะ | หลักฐาน |
|---|---|---|
| ตัวบุคคล | ✅ จริง | LinkedIn: https://www.linkedin.com/in/linara-bozieva/ |
| Ravenopus | ✅ จริง | https://ravenopus.com/ , https://ravenopus.com/about |
| "Built, Not Hired" | ✅ จริง | https://built-not-hired.com/ |
| **บทความต้นฉบับภาษาอังกฤษ** | ✅ จริง | **Business Insider** โดย **Agnes Applegate**, อัปเดต **20 พ.ค. 2569** — syndicate ที่ https://www.aol.com/articles/laid-off-ebay-now-run-091101000.html · ทวีตทางการ BI: https://x.com/BusinessInsider/status/2056301910748000754 |
| **รูปแบบบทความ** | ⚠️ **"as-told-to essay"** | เขียนจากปากเจ้าตัว = BI **ไม่ได้ตรวจสอบตัวเลขเอง** |
| ประวัติ | ✅ ตรงบางส่วน | ravenopus.com/about ระบุ Google (Russia & CIS, 2010–2013) + **eBay 2013–2024** ตำแหน่ง Senior Industry Analyst → GTM Manager → **11 ปีที่ eBay ตรง** |
| อายุ 39 / San Jose / ย้ายจากสวิตเซอร์แลนด์ | ⚠️ **คำบอกเล่า** | มีแต่ใน BI as-told-to ไม่มีแหล่งอื่นยืนยัน |

⚠️ **สะกดชื่อบริษัทให้ถูก: "Ravenopus"** — บางแหล่ง (Indian Startup News) สะกดผิดเป็น "Ravenopous" ถ้าบทความไทยลอกมาจากแหล่งนั้นจะผิดตาม

#### B2. ตัวเลขทุกตัว — แยกชั้นความมั่นใจ

| ข้ออ้าง | สถานะ | ที่มา |
|---|---|---|
| **27 agents** | ⚠️ **คำบอกเล่าเจ้าตัวใน BI (พ.ค. 2569)** | BI as-told-to. ⚠️ **ไม่นิ่ง**: Forbes (Elaine Pofeldt, **17 ส.ค. 2569**) พาดหัว **"35 AI Agents"**; ravenopus.com เอง = **"30+ agents"**; built-not-hired.com = **"100+ AI agents in production"** → เลข 27 ถูกต้อง "ณ พ.ค. 2569" เท่านั้น และตอนนี้ **ล้าสมัยแล้ว** |
| **งบ < $1,000/เดือน (≈ 32,000 บาท)** | ⚠️ **คำบอกเล่า** | BI: *"under $1,000 a month"* ครอบคลุม Claude Code, Codex, ChatGPT, HeyGen, ElevenLabs + APIs. การแปลงเป็นบาท: 1 USD = **32.675 THB** (20 พ.ค. 2569, frankfurter.dev) → $1,000 ≈ **32,675 บาท** ดังนั้น "< 32,000 บาท" **ต่ำกว่าความจริงเล็กน้อย** ควรเขียน "ไม่ถึงราว 33,000 บาท" |
| **ทดสอบกับลูกค้า 14 ราย** | ⚠️ **คำบอกเล่า** — BI เขียนว่า *"14 client **profiles**"* ไม่ใช่ลูกค้าจริง 14 ราย | BI as-told-to. ⚠️ **บทความไทยตีความเกินต้นฉบับ**: "profiles" อาจหมายถึงเคสทดสอบ/persona ไม่ใช่ลูกค้าที่จ่ายเงิน |
| **ปัจจุบันดูแล 5 ราย** | ⚠️ **คำบอกเล่า** ไม่มีชื่อลูกค้าเปิดเผยที่ไหน | BI as-told-to |
| **~2 ชม./สัปดาห์/ลูกค้า** | ⚠️ **คำบอกเล่า** | BI: *"about two hours a week"* |
| **สเกลได้ 20–25 ราย** | 💬 **คำทำนายของเจ้าตัว ไม่ใช่ข้อเท็จจริง** | BI/X: *"I think I could **comfortably manage** 20 to 25 clients on my own"* — คำว่า "I think" อยู่ในต้นฉบับ |
| **แทบไม่เขียนโค้ดเอง** | ⚠️ **คำบอกเล่า** — แต่ **สนับสนุนโดยหลักฐานอ้อม** | built-not-hired.com ขายไฟล์เป็น "plain-text agent and workflow files" + `GEMINI.md`/`CLAUDE.md` + Python scripts → สอดคล้องกับการทำงานแบบเขียน prompt ไม่เขียนโค้ด (**แนวโน้ม**) |
| **รายได้ / ยอดขาย** | ❌ **หาไม่เจอเลย** | ไม่มีแหล่งใดระบุรายได้ของ Ravenopus |
| **เริ่มด้วย Google Antigravity ก่อนย้ายมา Claude Code เพราะ token limit ของ Gemini Pro** | ⚠️ **คำบอกเล่า** (ปรากฏใน BI) | AOL/BI summary; สอดคล้องกับที่ built-not-hired.com มีคู่มือ "Antigravity Setup Guide" |
| **รางวัล**: 3-time 2026 Stevie American Business Award / "Gold Stevie 2026 Marketer of the Year" | ⚠️ **อ้างเองบนเว็บตัวเอง** ยังไม่ตรวจกับ stevieawards.com | built-not-hired.com |
| **"208 markets launched globally"**, **"0 employees needed"**, **"15+ years at Google and eBay"** | ⚠️ **marketing copy บนเว็บตัวเอง** | built-not-hired.com |

**สรุปหมวด:** ✅ ยืนยันแล้ว = 0 ตัวเลข · ⚠️ คำบอกเล่าเจ้าตัว = ทุกตัวเลขในบทความไทย · ❌ หาไม่เจอ = รายได้, ชื่อลูกค้า, การยืนยันจากลูกค้าคนใดคนหนึ่ง

**บทความไทยขยายตัวเลขไหม?** — ❌ **ไม่** ตรวจแล้วตัวเลขทุกตัวตรงกับ BI ต้นฉบับ (นี่คือข้อดี) แต่มี **2 จุดที่แปลคลาดเคลื่อน**:
1. "ลูกค้า 14 ราย" ← ต้นฉบับ "14 client **profiles**"
2. "อ้างว่าสเกลได้ 20–25 ราย" ← ต้นฉบับมี "I think I could comfortably manage" = ความเห็น ไม่ใช่ผลที่ทำได้แล้ว
และ **1 จุดที่ล้าสมัย**: เลข 27 ถูกแทนที่ด้วย 35/30+/100+ ไปแล้ว

#### B3. โครงสร้าง 3 ชั้น — มีเอกสาร/สไลด์/repo ไหม? — ❌ **ไม่มีของสาธารณะ · เป็นสินค้าขาย**

โครงสร้างตรงกับ BI ทุกตัว:
- **Directives** — ชั้นกำหนดตัวตน/ความรู้/กฎ
- **Orchestration — 6 ตัว**: market researcher, data analyst, creative director, finance, legal, orchestrator ✅ ตรงกับ BI
- **Execution — 18 ตัว**: **3** technical groundwork + **10** traffic/awareness + **5** revenue conversion ✅ ตรงกับ BI (3+10+5=18, 18+6=24 + Directives layer → รวมนับ 27 ตามที่เธออ้าง)

**เอกสารต้นฉบับ:**
- ❌ **ไม่มี public repo** (ตรวจแล้ว built-not-hired.com ระบุ *"Downloaded files; no public repository"*)
- ❌ **ไม่มีสไลด์/whitepaper ฟรี**
- ✅ **มีเป็นสินค้าขาย**: **"AI Marketing Agency Blueprint"** — https://built-not-hired.com/templates/ai-marketing-agency-blueprint
  - ประกาศตัวเองว่าเป็น **"27-subagent"** configuration
  - ประกอบด้วย: orchestration file (`GEMINI.md` สำหรับ Antigravity / `CLAUDE.md` สำหรับ Claude Code) + *"skill configurations for 20+ marketing roles"* + Python execution scripts
  - **ราคา: $497 (Blueprint) / $997 (Pro, มี onboarding 60 นาที + support 30 วัน) / $4,997 (Enterprise, founder-led install + customize 5 ชม.)**
  - เว็บระบุว่าเอเจนซี่ตัวเอง (Ravenopus) รัน **"30+ agents"** ซึ่ง **ไม่ตรง** กับ template ที่ขาย (27)
  - อื่น ๆ: templates from **$197**, community **$49/เดือน**, custom build **from $15,000**

⚠️ **นี่คือประเด็นสำคัญที่บทความไทยไม่บอก**: เคสนี้ไม่ใช่ engineering case study ที่เผยแพร่เพื่อความรู้ — มันคือ **funnel ขายคอร์ส/เทมเพลต** ตัวเลข 27 คือ **ชื่อสินค้า** ไม่ใช่ผลการวัด

#### B4. ข้อสังเกตเรื่อง diagram n8n — ✅ **ยืนยันข้อสังเกต (ภาพไม่ตรงกับเนื้อหา)**

หลักฐาน 3 ชั้น:

1. **"Grog Chat Model" ไม่มีอยู่จริง** — node จริงใน n8n ชื่อ **"Groq Chat Model"** (`n8n-nodes-langchain.lmchatgroq`, https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq) และมี **"xAI Grok Chat Model"** (`lmchatxaigrok`) ด้วย → "Grog" คือ **การอ่าน/สะกดผิด** จากอันใดอันหนึ่ง ✅ ข้อสังเกตของ Kittanate ถูก
2. **node อื่นในภาพเป็น node มาตรฐาน n8n ทั้งหมด** — "Tools Agent" (root node `n8n-nodes-langchain.agent`, https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent), Switch, HTTP Request, Auto-fixing Output Parser → เป็น workflow n8n ทั่วไปแบบที่มีเป็นพันตัวอย่างในเน็ต
3. **stack ที่เธอเผยแพร่เองไม่มี n8n เลย** — BI ระบุเครื่องมือ: **Claude Code, Codex, ChatGPT, HeyGen, ElevenLabs + APIs**; blueprint ที่เธอขายเป็น `CLAUDE.md`/`GEMINI.md` + skills + **Python scripts**; ค้นเว็บทั้ง ravenopus.com และ built-not-hired.com **ไม่พบการอ้างถึง n8n**

**คำตัดสิน:** ✅ **ยืนยัน** — diagram นั้น **ไม่ใช่** สถาปัตยกรรม 27 agent ของ Linara Bozieva เป็นภาพประกอบ/stock ที่ไม่เกี่ยวข้อง (ความมั่นใจ: **สูง** — 3 หลักฐานอิสระสอดคล้องกัน แต่ยังจัดเป็น "แนวโน้ม" เพราะไม่มีใครยืนยันแหล่งภาพอย่างเป็นทางการ)
⚠️ ข้อนี้เป็นสัญญาณ **content farm**: ถ้าบทความไทยใส่ภาพที่ไม่ตรงเนื้อหา อย่าเชื่อรายละเอียดอื่นในบทความนั้นโดยไม่ตรวจต้นฉบับ

---

## 3. สิ่งที่ยังไม่รู้ / ข้อจำกัดของข้อมูล

**บทความ A**
1. **ยังไม่ได้ดู transcript ในคลิป** — ยืนยันได้แค่ระดับ title + description + chapter markers (ซึ่ง Google เขียนเอง = น่าเชื่อถือสูง) ถ้าจะอ้างคำพูดในคลิปตรง ๆ ต้องดึง transcript (ต้องติดตั้ง `yt-dlp` ก่อน — เครื่องนี้ยังไม่มี)
2. **ยังไม่ยืนยันว่าโค้ดในคลิปรันบน ADK 2.0 ได้จริงไหม** — รู้แค่ว่า README ประกาศ breakingChanges และคลิปถ่ายยุค 1.x → **สมมุติฐาน** ว่าจะพัง ต้องทดลองจริงถึงจะยืนยัน
3. **Memory Bank pricing เพิ่งเปลี่ยนโครงสร้าง 1 ก.ย. 2569** ตัวเลขทั้งหมดที่พบในบล็อกภายนอก (เช่น $0.25/1,000 memories) จึงอ้างอิงไม่ได้ ใช้เฉพาะหน้าราคาทางการ
4. **ไม่ได้ตรวจว่า codelab แต่ละตัวต้องเปิด billing บน GCP หรือไม่** — Codelabs ส่วนใหญ่ใช้ free tier ได้ แต่ตัวที่แตะ Memory Bank น่าจะต้องมี project จริง (**สมมุติฐาน**)

**บทความ B**
5. **ไม่มีหลักฐานภายนอกยืนยันตัวเลขใด ๆ ได้เลย** — ไม่มีชื่อลูกค้า ไม่มีงบการเงิน ไม่มีคำยืนยันจากลูกค้าคนไหน ทั้งหมดเป็น self-report ใน as-told-to essay สองชิ้น (BI, Forbes)
6. **Forbes (17 ส.ค. 2569) ดึงเนื้อหาไม่ได้** (HTTP 403) — ยืนยันได้แค่พาดหัว "35 AI Agents" จาก URL + การอ้างอิงบน ravenopus.com/about
7. **ไม่ได้ตรวจรางวัล Stevie** กับฐานข้อมูล stevieawards.com — ยังเป็นคำอ้างบนเว็บตัวเอง
8. **ไม่รู้ว่าบทความไทย 100WEALTH ระบุแหล่งที่มาว่า BI หรือไม่** (ไม่มี URL ต้นทางในไฟล์ source) — ถ้าไม่ระบุ = ปัญหาเรื่อง attribution ด้วย
9. **ไม่ยืนยันได้ว่าภาพ n8n มาจากไหน** — พิสูจน์ได้แค่ว่า "ไม่ใช่ระบบของเธอ" ไม่ได้พิสูจน์ว่า "เป็นภาพ stock จากที่ไหน"
10. **ไม่ได้ตรวจว่า blueprint $497 ให้ของตรงตามที่โฆษณาไหม** — ต้องซื้อจึงจะรู้ **ไม่แนะนำให้ซื้อเพื่อการตรวจสอบ**

---

## 4. Action ที่แนะนำ

### ถ้าจะเขียนบทความจากเรื่องนี้ (ส่งต่อ Rae / Minnie)

**A. บทความ Google Crash Course — เขียนได้ แต่ต้องแก้ 5 จุด**
1. เปลี่ยนพาดหัวให้ตรง: **"11 ตอน · 15 หัวข้อย่อย"** ไม่ใช่ 15 ตอน
2. ใส่ลิงก์จริง + ชื่อผู้บรรยาย (Annie Wang) + ระบุว่า **สอนบน ADK ล้วน** ไม่ใช่คอร์ส agent ทั่วไป
3. **เตือนเรื่อง ADK 2.0 breaking changes** — นี่คือ value ที่โพสต์ต้นทางไม่มี
4. แก้ประโยค "Semantic search ด้วย PreloadMemoryTool" → semantic search มาจาก **Memory Bank**; PreloadMemoryTool คุมแค่ *จังหวะ* การดึง
5. แยกให้ชัดว่า **อะไรฟรี อะไรไม่ฟรี**: ADK/Codelab ฟรี · Memory Bank เก็บเงินแล้วตั้งแต่ 1 ก.ย. 2569

**B. บทความ Linara Bozieva — ❌ ไม่แนะนำให้เขียนเป็น "เคสความสำเร็จ"**
ถ้าจะเขียน ต้องเขียนในมุม **"อ่านเคสนี้อย่างไรไม่ให้ถูกหลอก"** และต้องมี:
- ระบุตรง ๆ ว่าเป็น **as-told-to essay** ตัวเลขทุกตัวคือคำบอกเล่า ไม่มีการตรวจสอบ
- ระบุว่า **27 กลายเป็น 35 / 30+ / 100+** ใน 4 เดือน — เลข agent ไม่ใช่หน่วยวัดที่มีความหมาย
- ระบุว่า **โครงสร้างนี้เป็นสินค้าขาย $497–$4,997** ผู้อ่านควรรู้ว่าเรื่องเล่านี้มีปลายทางเป็นการขาย
- แก้ "ลูกค้า 14 ราย" → "โปรไฟล์ลูกค้าทดสอบ 14 ชุด"
- แก้ "สเกลได้ 20–25 ราย" → "เจ้าตัว**คาด**ว่าจะรับได้ 20–25 ราย"
- **ห้ามใช้ diagram n8n นั้น** ถ้าต้องมีภาพ ให้ Mind วาดผัง 3 ชั้นขึ้นใหม่เอง
- ⚠️ **ถ้า Kittanate ไม่ต้องการเขียนแนววิพากษ์ → ทิ้งบทความ B ไปเลย** เพราะไม่มีข้อเท็จจริงที่ยืนยันได้พอจะเขียนเชิงบวกอย่างสุจริต

### ถ้าจะเอาความรู้มาใช้กับ AGAPAE (ส่งต่อ Dale / Claudy)

| ลำดับ | Action | เหตุผล | ความยาก |
|---|---|---|---|
| 1 | **ปิดช่องว่าง trajectory evaluation** — เพิ่ม hook `PostToolUse`/`SubagentStop` เก็บ log ลำดับ tool ที่แต่ละ agent เรียก แล้วเทียบกับลำดับที่ SOP กำหนด | ตอนนี้ AGAPAE วัดแค่ output สุดท้าย = ตรงกับสิ่งที่ Google วิจารณ์ว่า "สาย demo" ทำ | กลาง — ต่อยอดจาก `hook-status.mjs` ที่มีอยู่ |
| 2 | **ลอง MCP Toolbox for Databases** (`googleapis/mcp-toolbox`, Apache-2.0) ต่อ Claude Code เข้ากับ Firestore/Postgres โดยตรง | README ระบุรองรับ Claude Code เป็น client อยู่แล้ว ไม่ต้องแตะ ADK เลย — ใช้กับ printorder/PrintCost/budget2569 ได้ | ต่ำ |
| 3 | **แก้ปัญหา memory โต** — MEMORY.md มี 28 รายการแล้ว วางแผนย้ายเป็น index + ไฟล์ย่อยที่ค้นด้วย grep (ทำอยู่แล้วบางส่วน) หรือทำ retrieval จริง | นี่คือ "จุดตายของงาน production" ที่ Google ชี้ และเป็นช่องว่างจริงของเรา | กลาง |
| 4 | **ทบทวน routing table ด้วยแว่น Agent-as-Tool vs Sub-agent** — Claude Code subagent = isolated context (พฤติกรรมแบบ AgentTool) ดังนั้นขั้นที่ต้องเห็นบริบทของขั้นก่อนหน้า **ต้องส่ง context ไปให้ชัดเจนใน prompt** หรือใช้ `subagent_type: "fork"` | อธิบายกับดักที่ HANDOFF.md เคยบันทึกไว้ (ส่งของว่างต่อให้ขั้นถัดไป) ได้ในเชิงหลักการ | ต่ำ — เป็นการปรับ SOP |
| 5 | ❌ **ไม่แนะนำให้ย้ายไป ADK** | AGAPAE ได้ hooks / skills / permissions / plugins ที่ ADK ไม่มีของเทียบตรง สิ่งที่ ADK มีเหนือกว่า (deterministic workflow, managed memory, eval) แก้ได้ด้วย hook + MCP โดยไม่ต้องเปลี่ยน stack | — |

### ขั้นถัดไปตาม SOP-05
- **Reese [Fact-check]** — รายงานนี้พร้อมให้ตรวจซ้ำในโหมด fact-check (ทุกตัวเลขมี source URL แนบแล้ว)
- **Chris QA** — ตรวจว่าข้อสรุปไม่ overclaim โดยเฉพาะข้อ B4 (ที่จัดเป็น "แนวโน้ม" ไม่ใช่ "ยืนยันแล้ว")
- **Libby** — จัดเก็บเข้า index; รายงานนี้เป็น reference ระยะยาวเรื่องสถาปัตยกรรม agent

---

## ภาคผนวก — Source URL ทั้งหมด

**Google / ADK**
- Playlist: https://www.youtube.com/playlist?list=PLIivdWyY5sqLNeW9MPxldbbevMEJGMWBG
- ช่อง: https://www.youtube.com/@googlecloudtech
- ADK repo (Apache 2.0): https://github.com/google/adk-python
- ADK docs: https://adk.dev/ (ย้ายจาก google.github.io/adk-docs)
- Memory: https://adk.dev/sessions/memory/
- Evaluate: https://adk.dev/evaluate/ · https://adk.dev/evaluate/criteria/
- Loop agent: https://adk.dev/agents/workflow-agents/loop-agents/
- Collaboration/coordinator: https://adk.dev/workflows/collaboration/
- LiteLLM: https://adk.dev/agents/models/litellm/
- Sub-agents vs agents-as-tools (Google Cloud blog, Dharini Chandrashekhar, 8 พ.ย. 2568): https://cloud.google.com/blog/topics/developers-practitioners/where-to-use-sub-agents-versus-agents-as-tools
- Developer's guide to multi-agent patterns in ADK (Shubham Saboo, 16 ธ.ค. 2568): https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/
- Memory Bank public preview (9 ก.ค. 2568): https://cloud.google.com/blog/products/ai-machine-learning/vertex-ai-memory-bank-in-public-preview
- ราคาทางการ: https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing
- MCP Toolbox for Databases (Apache 2.0): https://github.com/googleapis/mcp-toolbox · https://mcp-toolbox.dev/
- Codelabs: https://codelabs.developers.google.com/adkcourse/instructions · .../codelabs/agent-memory/instructions · .../adk-eval/instructions

**Claude Code / Agent SDK**
- Subagents: https://code.claude.com/docs/en/sub-agents
- Agent SDK overview: https://code.claude.com/docs/en/agent-sdk/overview

**Linara Bozieva**
- Business Insider as-told-to (Agnes Applegate, 20 พ.ค. 2569, syndicate): https://www.aol.com/articles/laid-off-ebay-now-run-091101000.html
- BI ทวีตทางการ: https://x.com/BusinessInsider/status/2056301910748000754
- Forbes (Elaine Pofeldt, 17 ส.ค. 2569 — "35 AI Agents", ดึงไม่ได้ 403): https://www.forbes.com/sites/elainepofeldt/2026/08/17/this-ebay-alum-built-a-one-person-marketing-agency-with-35-ai-agents/
- LinkedIn: https://www.linkedin.com/in/linara-bozieva/
- Ravenopus: https://ravenopus.com/ · https://ravenopus.com/about
- Built, Not Hired: https://built-not-hired.com/
- Blueprint ($497–$4,997): https://built-not-hired.com/templates/ai-marketing-agency-blueprint

**n8n**
- Groq Chat Model: https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq
- xAI Grok Chat Model: https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatxaigrok
- Tools Agent: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent

**อัตราแลกเปลี่ยน**
- USD/THB 20 พ.ค. 2569 = 32.675 · 9 ก.ย. 2569 = 32.875 — https://api.frankfurter.dev/v1/2026-05-20?base=USD&symbols=THB
