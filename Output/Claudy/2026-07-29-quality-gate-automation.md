# Quality Gate Automation — ย้ายกฎจาก SOP มาเป็นโค้ดที่บังคับได้จริง

**วันที่:** 29 ก.ค. 2569 · **ผู้ทำ:** Claudy (Opus 5) · **ประเภท:** infrastructure

## โจทย์

Kittanate ถามเรื่อง automation ให้ Claudy มอบหมายงานให้ agent อื่นตามความเหมาะสม
สำรวจระบบแล้วพบว่าโครง orchestration ครบ แต่ **quality gate ทั้งหมดเป็นแค่ข้อความใน SOP**
— ถ้า Claudy ลืมหรือเลือกไม่ทำตาม ก็ข้ามได้ทันที ไม่มีอะไรหยุด
(HANDOFF §5 บันทึกไว้เองว่าเคยมีบทความข้าม fact-check แล้วโดน Chris ตี FAIL ต้องวนกลับ)

## สิ่งที่ทำ

### 1. `scripts/hook-gate.mjs` (ไฟล์ใหม่) — บังคับ gate ด้วยโค้ด

| Event | ทำอะไร |
|---|---|
| `PreToolUse(Agent)` | **deny** การเรียก `chris-qa` ถ้ายังมีงานค้าง fact-check |
| `SubagentStop` | บันทึก state: ใครเสร็จ / ใครผ่าน fact-check / Chris ตัดสินอะไร |
| `Stop` | **block** ไม่ให้จบเทิร์นถ้า DoD ไม่ครบ (สูงสุด 3 ครั้ง) |

กติกาที่ฝังไว้:
- `FACTUAL` = Minnie, Rae, Nick, Dale, News → ทำงานจบเมื่อไหร่ ตั้งธงรอ fact-check อัตโนมัติ
- `VISUAL` = Vera, Mind, Libby → pure design/layout ข้าม fact-check ได้ตาม SOP
- Reese เคลียร์ธงได้เฉพาะเมื่อผลงานมีมาร์กเกอร์ fact-check จริง (`✅ VERIFIED` / `⚠️ UNVERIFIED` /
  `❌ INCORRECT`) — เรียก Reese โหมด research เฉย ๆ ไม่นับว่าผ่าน gate
- Stop hook เช็ค 3 อย่าง: fact-check ค้าง / Chris ตี FAIL ยังไม่แก้ / `git status` ไม่สะอาด
- เตือน (ไม่บล็อก) ถ้าไม่เจอไฟล์ผลงานใน `Output/<Agent>/` — เช็คจาก mtime จึงเป็นแค่การเดา
- ทางออกเดียวเมื่องานไม่มี factual claim จริง ๆ: ใส่ `[skip-factcheck]` ใน prompt ของ Chris

กันลูป: บล็อกได้มากสุด 3 ครั้งต่อ session แล้วเปลี่ยนเป็นเตือนครั้งเดียวว่า
"อย่าบอกว่างานเสร็จ ให้รายงาน Kittanate ตามจริง" จากนั้นเงียบ
state เก็บที่ `scripts/.gate-state.json` (gitignored, แยกตาม session, เก็บ 10 session ล่าสุด)

### 2. แก้บั๊ก `scripts/hook-status.mjs` — รายงานบน dashboard ว่าง/ผิด

เดิม `done` ผูกกับ `PostToolUse(Task)` ซึ่ง**พังตั้งแต่ Claude Code v2.1.198**
เพราะ subagent รัน background เป็นค่าเริ่มต้น → `tool_response` กลับมาตั้งแต่ agent ยังไม่ทำงานเสร็จ
รายงานที่เขียนลง `status.json` / `worklog.json` จึงว่างหรือไม่ใช่ผลงานจริง

แก้เป็น `SubagentStop` ซึ่งยิงตอน agent จบจริง และให้ `last_assistant_message` มาตรง ๆ
รองรับ nested subagent ด้วย (Claude Code v2.1.219+ ให้ subagent แตกลูกได้ลึก 3 ชั้น)
โค้ดรับ payload ทั้งแบบเก่าและใหม่ เพื่อไม่ให้พังถ้า rollback

### 3. `.claude/settings.json` — ผูก hook ใหม่

`PreToolUse(Agent)` × 2 · `SubagentStop` × 2 · `Stop` × 1 · ลบ `PostToolUse` ทิ้ง

### 4. เอกสาร

- `CLAUDE.md` — ข้อ 6 ระบุว่า hook บังคับจริง + เพิ่มข้อ 8 (DoD GATE)
- `HANDOFF.md` — system map, DoD §4, กับดัก §5 (เพิ่ม 3 ข้อ)
- `SOP-01` — ตาราง gate ที่บังคับด้วยโค้ด + วิธีใช้ `[skip-factcheck]`
- `SOP-07` — ตาราง hook ใหม่ + คำเตือนห้ามย้ายกลับ `PostToolUse`
- `SOP-09` — สร้าง agent ใหม่ต้องแก้ MAP **2 ไฟล์** ไม่ใช่ไฟล์เดียว

## การทดสอบ

ทดสอบด้วย payload จำลอง 12 เคส (`pre` / `agent-done` / `stop`) ผ่านหมด:
Rae จบ → เรียก Chris โดน deny → Stop โดน block → Reese fact-check → เรียก Chris ผ่าน →
Chris FAIL → Stop block → Chris PASS → เหลือแค่ git dirty → ชนเพดาน 3 ครั้ง → เตือนครั้งเดียว → เงียบ
เทสต์ `hook-status.mjs` แยกในสำเนา sandbox ยืนยันว่า `last_assistant_message` ไหลเข้า
`status.json.report.body` และ `worklog.entries[0].summary` ถูกต้อง

ตรวจเพิ่ม: `node --check` ทั้ง 2 สคริปต์ · `settings.json` parse ได้ · MAP ตรงกันทั้ง 2 ไฟล์ (11 agents)

**ยังไม่ได้ทดสอบแบบ end-to-end จริง** เพราะ session ที่ทำงานนี้ cwd อยู่นอกโปรเจกต์
hook ระดับโปรเจกต์จึงไม่ถูกโหลด → ต้องเปิด session ใน `AGAPAE Agent/` แล้วลอง delegate จริง 1 งาน

## ขั้นถัดไป (ยังไม่ทำ)

- ชั้นที่ 2: แก้ `claudy.md` ให้ใช้ `Agent(...)` allowlist, เลิกซ้อนชั้น Claudy, ใช้ nested subagent กับ Chris
- ชั้นที่ 3: ย้าย agents ไป `~/.claude/agents/` ให้ทุกโปรเจกต์ใช้ร่วมกัน, routine `weekly-review`
