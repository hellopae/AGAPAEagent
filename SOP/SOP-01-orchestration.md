# SOP-01 — Orchestration: วิธีทำงานของ Claudy ทีละขั้น

> ใช้ทุกครั้งที่รับ task จาก Kittanate ไม่ว่างานเล็กหรือใหญ่

## STEP 1 — วิเคราะห์โจทย์ (ก่อน delegate เสมอ)

ตอบ 4 คำถามนี้ในหัวก่อน:
1. งานนี้คือประเภทไหน? (ไอเดีย / วิจัย / เขียน / ออกแบบ / กราฟิก / QA / index / analytics / deploy)
2. เป็นงาน single-agent หรือ pipeline หลายขั้น?
3. ผลลัพธ์สุดท้ายที่ Kittanate ต้องการคืออะไร? (ไฟล์? บทความ? spec? รายงาน?)
4. มี factual claims ไหม? → ถ้ามี ต้องวาง Reese [Fact-check] ก่อน Chris QA เสมอ

## STEP 2 — ประกาศ routing plan ก่อนเริ่ม

รูปแบบบังคับ (ตอบ Kittanate ก่อน delegate):
```
งานนี้ต้องการ: <สรุป 1 บรรทัด>
มอบหมาย: <Agent> หรือ pipeline: <A> → <B> → <C>
ผลลัพธ์ที่จะได้: <ไฟล์/รายงานอะไร อยู่ที่ไหน>
```

## STEP 3 — Delegate ผ่าน Task tool เท่านั้น

- ใช้ `subagent_type` ตามชื่อไฟล์ใน `.claude/agents/` (เช่น `reese-research`)
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

```
ผลงาน specialist
   │
   ▼ มี factual claims?
   ├─ มี  → Reese [Fact-check] → ❌ FAIL? → กลับไป agent เจ้าของงานแก้ → Fact-check ใหม่
   └─ ไม่มี (pure design/layout) → ข้ามได้
   │
   ▼
Chris QA → ❌ FAIL? → กลับไป agent เจ้าของงานแก้ (ระบุ blocker ให้ครบ) → เข้า gate ใหม่ตั้งแต่ Fact-check
   │
   ▼ ✅ PASS
Libby index (ถ้าเป็น asset/template) → ส่งมอบ Kittanate
```

กติกา loop แก้งาน:
- ส่ง verdict ของ Reese/Chris ให้ agent เจ้าของงาน **ทั้งฉบับ** ไม่ย่อ
- เวอร์ชันใหม่ตั้งชื่อ `-v2`, `-v3` ต่อท้าย slug เดิม
- เกิน 3 รอบยังไม่ผ่าน → หยุด รายงาน Kittanate พร้อมสรุปข้อติดขัด

### ⚙️ Gate นี้บังคับด้วยโค้ด (ตั้งแต่ 29 ก.ค. 2026)

`scripts/hook-gate.mjs` ทำให้ข้ามขั้นไม่ได้จริง ไม่ใช่แค่เขียนไว้ใน SOP:

| เมื่อ | hook | ผล |
|---|---|---|
| เรียก `chris-qa` ทั้งที่ยังมีงานค้าง fact-check | `PreToolUse` | **deny** การเรียก พร้อมบอกว่าต้องทำอะไรก่อน |
| agent ทำงานจบ | `SubagentStop` | บันทึกว่าใครเสร็จ / ใครผ่าน fact-check / Chris ตัดสินอะไร |
| จบเทิร์นทั้งที่ DoD ไม่ครบ | `Stop` | **block** ให้ทำต่อ (สูงสุด 3 ครั้ง แล้วบังคับรายงานตามจริง) |

- agent ที่ output มี factual claims ได้ → Minnie, Rae, Nick, Dale, News (ตั้งธงรอ fact-check อัตโนมัติ)
- agent ที่ข้าม fact-check ได้ → Vera, Mind, Libby (pure design/layout/metadata)
- Reese จะเคลียร์ธงให้ต่อเมื่อผลงานมีมาร์กเกอร์ fact-check จริง (`✅ VERIFIED` / `⚠️ UNVERIFIED` / `❌ INCORRECT`)
  — เรียก Reese โหมด research เฉยๆ ไม่นับว่าผ่าน gate
- **ทางออกเดียวเมื่อโดน deny แต่งานไม่มี factual claim จริงๆ:** ใส่ `[skip-factcheck]` ใน prompt ของ Chris
  พร้อมเหตุผลว่าทำไมถึงข้ามได้ — อย่าเลี่ยงด้วยวิธีอื่น

## STEP 5 — ปิดงาน (Definition of Done ครบ 6 ข้อใน HANDOFF.md §4)

1. เช็คว่าไฟล์ผลงานอยู่ใน `Output/<Agent>/` ครบทุกขั้น
2. เช็ค `git status` — ถ้าไม่สะอาด: commit + push เองทันที (รูปแบบใน SOP-07)
3. รายงาน Kittanate: pipeline ที่ใช้ / verdict แต่ละ gate / path ไฟล์ / ลิงก์ dashboard

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
| ข่าวเช้า 09:00 | Cloud routine (News → Chris → Rae → email) |
| งานประกอบหลายอย่าง | Pipeline ตาม SOP-02..05 |
