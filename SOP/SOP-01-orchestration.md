# SOP-01 — Orchestration: วิธีทำงานของ Claudy ทีละขั้น

> ใช้ทุกครั้งที่รับ task จาก Kittanate ไม่ว่างานเล็กหรือใหญ่

## STEP 0 — เช็กโหมดทำงาน (งานโค้ดทุกครั้ง)

อ่าน `work-mode.json` ที่ root (`mode`: `both` / `claude-only` / `codex-only`)
`until` (ถ้ามี) = เวลาที่ลิมิตรีเซ็ต — เลยเวลาแล้วแจ้งคุณเป้ 1 บรรทัดว่ากลับเป็น `both` ได้ ไม่สลับเองโดยไม่บอก

- **`both`** (โควตาเหลือทั้งสองฝั่ง) — Codex เขียนโค้ด: Claudy เขียนใบงาน แล้วรันผ่าน Bash
  `python3 scripts/openai-worker.py --agent codex --task <ใบงาน> --project <repo> --write --run`
  → ได้ branch `codex/<run_id>` + `diff.patch` ใน `Output/Codex/runs/<run_id>/`
  → Dale รีวิว diff เทียบเกณฑ์รับงาน แล้ว merge หรือส่ง FIX LIST · งานตัดสินใจสถาปัตยกรรมให้ Astra (`--agent astra --run`) ก่อนเขียนได้
- **`claude-only`** (ChatGPT ติดลิมิต) — Dale/Toby เขียนโค้ดเหมือนเดิม ห้ามเรียก Codex/Astra
- **`codex-only`** (Claude ติดลิมิต) — คุณเป้สั่ง Codex ตรง Claude ไม่เกี่ยว Codex ทำตาม `AGENTS.md`
  (อ่านใบงาน ทำบน branch แยก ไม่ push main)

สลับโหมด: คุณเป้บอก "โหมด claude-only" ฯลฯ → Claudy แก้ `mode` + `updated` ใน `work-mode.json` แล้ว commit
ถ้า worker จบ `rate_limited` (exit code 3) → Claudy สลับเป็น `claude-only` เองทันที แล้วแจ้งคุณเป้ 1 บรรทัด

- เรียก Codex/Astra ผ่าน **Bash ตรง** (โควตา OpenAI) — ห้ามเรียก wrapper `codex-engineer`/`astra-architect` แทน (กินโควตา Claude)
- worker ไม่รันเกิน 1 ครั้งต่องาน ไม่ retry อัตโนมัติ

## STEP 1 — วิเคราะห์โจทย์ (ก่อน delegate เสมอ)

ตอบ 4 คำถามนี้ในหัวก่อน:
1. งานนี้คือประเภทไหน? (ไอเดีย / วิจัย / เขียน / ออกแบบ / กราฟิก / QA / index / analytics / deploy)
2. เป็นงาน single-agent หรือ pipeline หลายขั้น?
3. ผลลัพธ์สุดท้ายที่ Kittanate ต้องการคืออะไร? (ไฟล์? บทความ? spec? รายงาน?)
4. เป็นงานที่เผยแพร่/ขายได้และมี factual claims ไหม? → ถ้าใช่ ต้องวาง Reese [Fact-check] ก่อน Chris QA เสมอ
   (โค้ด/สถาปัตยกรรม/แผนภายในไม่ต้อง — ดู STEP 4)

## STEP 2 — ประกาศ routing plan ก่อนเริ่ม

รูปแบบบังคับ (ตอบ Kittanate ก่อน delegate):
```
งานนี้ต้องการ: <สรุป 1 บรรทัด>
มอบหมาย: <Agent> หรือ pipeline: <A> → <B> → <C>
ผลลัพธ์ที่จะได้: <ไฟล์/รายงานอะไร อยู่ที่ไหน>
```

## STEP 3 — Delegate ผ่าน Task tool เท่านั้น

- ใช้ `subagent_type` ตามชื่อไฟล์ใน `.claude/agents/` (เช่น `reese-research`)
- **เขียนใบงานเป็นไฟล์ก่อน** `Output/Claudy/briefs/YYYY-MM-DD-slug.md` (plan-relay) มี 5 หัวข้อ:
  บริบท / ขอบเขต / ขั้นตอน / ข้อห้าม / เกณฑ์รับงาน (เรียงเลข ใช้ตรวจรับได้จริง)
  แล้ว prompt ของ agent = "อ่านใบงาน <path> แล้วทำ" — agent ไม่ได้รับประวัติแชท ใบงานต้องพอในตัว
- 1 ชิ้นงาน = เจ้าของคนเดียว ไม่แบ่งไฟล์เดียวให้สอง agent เขียน
- เขียน prompt ให้ agent แบบ **self-contained**: บริบทครบ ไม่ต้องให้ agent เดา
  - แนบ path ไฟล์ input ที่ต้องอ่าน (เช่น output ของ agent ก่อนหน้า)
  - ระบุไฟล์ output ปลายทาง: `Output/<Agent>/YYYY-MM-DD-slug.md`
  - ระบุ format ผลลัพธ์ตาม scaffold ของ agent นั้น
- Pipeline หลายขั้น: รันทีละขั้น รอผลขั้นก่อนหน้า แล้วส่ง path ไฟล์ต่อให้ขั้นถัดไป
- งานอิสระหลายชิ้น (ไม่พึ่งกัน): delegate ขนานกันได้

### ⚠️ foreground vs background (พลาดแล้วส่งของว่างต่อ)

ตั้งแต่ Claude Code v2.1.198 **subagent รัน background เป็นค่าเริ่มต้น**

| สถานการณ์ | ต้องทำ |
|---|---|
| ขั้นที่ผลต้องส่งต่อให้ขั้นถัดไปทันที | รัน **foreground** (`run_in_background: false`) — ไม่งั้นได้แค่ "เริ่มทำงานแล้ว" |
| งานอิสระหลายชิ้นที่ไม่พึ่งกัน | ปล่อย background ขนานกัน เร็วกว่ามาก |
| agent ที่ต้องใช้ tool นอกชุดพื้นฐาน | รัน foreground — background subagent ได้ tool ชุดเล็กกว่า |
| **cloud routine / headless (`claude -p`)** | รัน foreground **เสมอ** — headless ฆ่า background task ที่ 600 วินาที |

> เจอจริง 29 ก.ค. 2569: ทดสอบ Chris แตก sub-checker 3 ตัวใน headless — ทั้ง 3 ตัวถูกตัด
> กลางคัน `API Error: Connection closed mid-response` เพราะชนเพดาน 600 วินาทีของ print mode
> ถ้าจำเป็นต้องใช้ background ใน routine จริง ๆ ให้ตั้ง `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=0`

### ห้ามเรียก `@claudy` ซ้ำ

session ที่ทำงานใน folder นี้เป็น Claudy อยู่แล้วตาม `CLAUDE.md`
เรียก `@claudy` อีก = main → claudy → specialist (3 ชั้น) เปลือง token
`.claude/agents/claudy.md` มีไว้สำหรับ headless/cron (`claude --agent claudy -p "…"`) เท่านั้น

### Chris แตกงานตรวจเองได้ (nested subagent)

Chris มี sub-checker 3 ตัวที่เรียกขนานกันได้: `chris-thai` · `chris-culture` · `chris-print`
- **Claudy ห้ามเรียก sub-checker ตรง ๆ** — เรียก `chris-qa` แล้ว Chris ตัดสินเองว่าจะแตกหรือตรวจเอง
- Chris เป็นคนตัดสิน verdict สุดท้ายคนเดียว sub-checker แค่ให้ข้อมูล
- ผลกลางของ sub-checker ไม่ไหลเข้า context ของ Claudy — เห็นแค่ verdict สรุปของ Chris

## STEP 4 — Quality Gates (ห้ามข้าม)

Gate ตามความเสี่ยง (ปรับ 16 ก.ย. 2569):

| ประเภทงาน | gate |
|---|---|
| เผยแพร่/ขายได้ (บทความ template listing ข่าว) — Minnie, Rae, Nick, Addy, News | Reese [Fact-check] → Chris |
| โค้ด/สถาปัตยกรรม/แผนภายใน — Dale, Toby, Codex, Astra | code review โดย Dale (หรือ Codex ในโหมด `both`) · ไม่ผ่าน Reese |
| pure design/layout — Vera, Mind, Libby | Chris อย่างเดียว |

```
ผลงาน specialist
   │
   ▼ เผยแพร่/ขายได้ + มี factual claims?
   ├─ ใช่  → Reese [Fact-check]
   └─ ไม่ใช่ → ข้าม
   │
   ▼
Chris QA (หรือ Dale code review) → PASS หรือ FIX LIST
   │  FIX LIST → เจ้าของงานแก้ 1 รอบ → ตรวจซ้ำเฉพาะข้อที่แก้ (delta)
   │            (Chris ติด [factual] = ข้อผิดเป็นข้อเท็จจริง → ผ่าน Reese ก่อนตรวจซ้ำ)
   ▼ ✅ PASS
Libby index (ถ้าเป็น asset/template) → ส่งมอบ Kittanate
```

กติกา loop แก้งาน (ไม่ถกกัน ไม่วน):
- ผู้ตรวจตอบคำเดียว: **PASS** หรือ **FIX LIST** เรียงเลขอ้างเกณฑ์รับงานในใบงาน — ข้อเล็กผู้ตรวจ/Claudy แก้เองเลย
- agent ไม่โต้แย้งกัน เห็นต่างส่งให้ Claudy — Claudy ตัดสินคนเดียว
- เวอร์ชันแก้ตั้งชื่อ `-v2` ต่อท้าย slug เดิม
- แก้ได้ **1 รอบ** ตรวจซ้ำเฉพาะข้อที่แก้ ไม่ตรวจทั้งงานใหม่ ยังไม่ผ่าน → Claudy ตัดสินเองหรือรายงาน Kittanate
- Chris ใส่แท็ก **`[factual]`** ใน verdict เมื่อข้อ FAIL เป็นเรื่องข้อเท็จจริง (ตัวเลข วันที่ แหล่งอ้างอิง)
  — มีแท็ก = รอบแก้ต้องผ่าน Reese ใหม่ · ไม่มีแท็ก = ส่งกลับ Chris ตรงได้เลย

### ⚙️ Gate นี้บังคับด้วยโค้ด (ตั้งแต่ 29 ก.ค. 2026)

`scripts/hook-gate.mjs` ทำให้ข้ามขั้นไม่ได้จริง ไม่ใช่แค่เขียนไว้ใน SOP:

| เมื่อ | hook | ผล |
|---|---|---|
| เรียก `chris-qa` ทั้งที่ยังมีงานค้าง fact-check | `PreToolUse` | **deny** การเรียก พร้อมบอกว่าต้องทำอะไรก่อน |
| agent ทำงานจบ | `SubagentStop` | บันทึกว่าใครเสร็จ / ใครผ่าน fact-check / Chris ตัดสินอะไร |
| จบเทิร์นทั้งที่ DoD ไม่ครบ | `Stop` | **block** ให้ทำต่อ (สูงสุด 3 ครั้ง แล้วบังคับรายงานตามจริง) |

- agent ที่ output มี factual claims ได้ → Minnie, Rae, Nick, Addy, News (ตั้งธงรอ fact-check อัตโนมัติ)
- Chris FAIL ได้ 2 รอบ (ตรวจแรก + แก้ 1 รอบ) — รอบที่ 2 ยัง FAIL hook ไม่ block แต่เตือนให้ Claudy ตัดสิน/รายงาน
- หลัง Chris FAIL งานที่แก้ไม่ถูกตั้งธง fact-check ใหม่ เว้นแต่ verdict มี `[factual]`
- agent ที่ข้าม fact-check ได้ → Vera, Mind, Libby (pure design/layout/metadata)
- Reese จะเคลียร์ธงให้ต่อเมื่อผลงานมีมาร์กเกอร์ fact-check จริง (`✅ VERIFIED` / `⚠️ UNVERIFIED` / `❌ INCORRECT`)
  — เรียก Reese โหมด research เฉยๆ ไม่นับว่าผ่าน gate
- **ทางออกเดียวเมื่อโดน deny แต่งานไม่มี factual claim จริงๆ:** ใส่ `[skip-factcheck]` ใน prompt ของ Chris
  พร้อมเหตุผลว่าทำไมถึงข้ามได้ — อย่าเลี่ยงด้วยวิธีอื่น

## STEP 5 — ปิดงาน (Definition of Done ครบ 6 ข้อใน HANDOFF.md §4)

1. เช็คว่าไฟล์ผลงานอยู่ใน `Output/<Agent>/` ครบทุกขั้น
2. เช็ค `git status` — ถ้าไม่สะอาด: commit + push เองทันที (รูปแบบใน SOP-07)
3. รายงาน Kittanate: pipeline ที่ใช้ / verdict แต่ละ gate / path ไฟล์ / ลิงก์ dashboard
4. งานถัดไปไม่เกี่ยวกับงานนี้ → บอกคุณเป้ `/clear` ก่อนเริ่ม (ประวัติแชทเก่ากินโควตาทุกเทิร์น)

## เมื่อไม่มี agent ที่เหมาะ

ตอบตามแบบ: `"ไม่มี Agent ที่เหมาะสมตอนนี้ — ควรสร้าง [ชื่อ] สำหรับงานด้าน [X]"`
แล้วชี้ไป SOP-09 (วิธีสร้าง agent ใหม่) — **อย่าทำงานนั้นเองแทน**

## ตารางตัดสินใจเร็ว (Quick Reference)

| สัญญาณในโจทย์ | Route |
|---|---|
| "อยากได้ไอเดีย", "คิดคอนเซ็ปต์" | Minnie |
| "ตลาดเป็นยังไง", "คู่แข่งขายเท่าไหร่", "จริงไหม" | Reese |
| "เขียน", "ข้อความ", "caption", "listing" | Rae |
| "layout", "หน้าตา", "wireframe", "ขนาดเท่าไหร่" | Vera |
| "ภาพประกอบ", "โลโก้", "สี", "brand" | Mind |
| "ตรวจ", "เช็คก่อนส่ง", "พร้อมขายยัง" | Chris |
| "จัดไฟล์", "หาไฟล์เก่า", "ทำ index" | Libby |
| "ยอดขาย", "ตัวเลข", "รายงาน metric" | Nick |
| "deploy", "เว็บพัง", "API", "ตั้ง repo" | Dale |
| เขียนโค้ดตามใบงาน (โหมด `both`) | Codex `--write` → Dale รีวิว |
| "ควรวางระบบแบบไหน" (โหมด `both`) | Astra |
| ข่าวเช้า 09:00 | Cloud routine (News → Chris → Rae → email) |
| งานประกอบหลายอย่าง | Pipeline ตาม SOP-02..05 |
