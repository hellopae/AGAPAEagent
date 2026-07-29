# ชั้นที่ 2 — ปรับโครงการ delegate ของ Claudy

**วันที่:** 29 ก.ค. 2569 · **ผู้ทำ:** Claudy (Opus 5) · **ประเภท:** infrastructure
**ต่อจาก:** `2026-07-29-quality-gate-automation.md` (ชั้นที่ 1)

## 1. เลิกซ้อนชั้น Claudy

เดิม `claudy.md` มี description ว่า "ใช้ agent นี้สำหรับทุกงาน" ทั้งที่ session ที่ทำงานใน
โฟลเดอร์นี้เป็น Claudy อยู่แล้วตาม `CLAUDE.md` → เรียก `@claudy` = main → claudy → specialist
3 ชั้น เปลือง token และ worklog บันทึก Claudy เป็น "ผลงาน" ทั้งที่ไม่ได้ทำอะไร

แก้ description ให้ชัดว่าไฟล์นี้มีไว้สำหรับ **headless/cron เท่านั้น**
(`claude --agent claudy -p "…"`) พร้อมตารางบอกว่าสถานการณ์ไหนใช้อะไร

## 2. `tools: Task` → `Agent(...)` allowlist

`Task` เป็นชื่อเก่า (เปลี่ยนเป็น `Agent` ตั้งแต่ v2.1.63 — ยังใช้ได้แบบ alias)
เปลี่ยนเป็น allowlist ระบุชื่อ 10 agent ที่ Claudy เรียกได้ ป้องกันการเรียก agent นอกทีม

หมายเหตุ: รายชื่อในวงเล็บมีผลจริงเฉพาะตอนรันเป็น main thread (`claude --agent claudy`)
ถ้ารันเป็น subagent ระบบจะอ่านแค่ว่ามี `Agent` — ซึ่งตรงกับการใช้งานที่ตั้งใจไว้พอดี

## 3. Chris แตกงานตรวจแบบขนานได้ (nested subagent)

Claude Code v2.1.219+ ให้ subagent แตกลูกได้ลึก 3 ชั้น เลยให้ Chris มี sub-checker 3 ตัว:

| ไฟล์ | รับผิดชอบ |
|---|---|
| `chris-thai` | ภาษาไทยเชิงลึก — สะกด ไวยากรณ์ วรรคตอน ระดับภาษา **สำนวนแปล** |
| `chris-culture` | วัฒนธรรม/ศาสนา/พิธีกรรม/สถาบัน — ด่านเดิมพันสูงสุด |
| `chris-print` | สเปกพิมพ์ — ขนาด bleed safe margin CMYK 300dpi ฟอนต์ไทย export |

กติกาที่ฝังไว้:
- Chris ตัดสินเองว่าจะแตกหรือตรวจเอง — งานสั้น ๆ ไม่คุ้ม coordination overhead
- **Chris เป็นคนตัดสิน verdict คนเดียว** sub-checker แค่ให้ข้อมูล
- BLOCKER จาก sub-checker ตัวไหนก็ตาม = verdict ต้องเป็น ❌ FAIL
- sub-checker ที่บอกว่า "ตรวจไม่ได้เพราะข้อมูลไม่พอ" ต้องถูกยกขึ้นมาใน verdict
  เพิ่มหัวข้อ **ตรวจไม่ได้:** ใน output format ของ Chris
- ผลกลางไม่ไหลเข้า context ของ Claudy — เห็นแค่ verdict สรุป
- sub-checker ไม่ต้องมี entry ใน `status.json` / MAP / avatar เพราะเป็น worker ภายในของ Chris
  ไม่ใช่สมาชิกสตูดิโอ (บันทึกข้อยกเว้นนี้ไว้ใน SOP-09 แล้ว)

## 4. กฎ foreground vs background

ตั้งแต่ v2.1.198 subagent รัน background เป็นค่าเริ่มต้น ถ้าไม่ระบุ Claudy จะได้แค่
"เริ่มทำงานแล้ว" กลับมา แล้ว**ส่งของว่างต่อให้ขั้นถัดไปโดยไม่รู้ตัว** — เป็นบั๊กเงียบที่อันตราย

เขียนกฎลง `CLAUDE.md` ข้อ 3, `SOP-01` STEP 3, `claudy.md`, `HANDOFF.md` §5:
- ขั้นที่ผลต้องส่งต่อทันที → foreground
- งานอิสระที่ไม่พึ่งกัน → background ขนานกัน
- agent ที่ต้องใช้ tool นอกชุดพื้นฐาน → foreground (background ได้ tool ชุดเล็กกว่า)

## การทดสอบ

**ทดสอบแบบ static แล้ว:** frontmatter ทั้ง 14 ไฟล์ parse ได้, ไม่มีชื่อซ้ำ,
tools ของทุกตัวถูกต้อง, `chris-qa` ได้ `Agent` เพิ่มแล้ว

**ทดสอบ end-to-end แล้ว (รอบสอง, 18:52 น.):** รัน headless ให้ Chris ตรวจบทความจริง

✅ **nesting ทำงาน** — transcript ยืนยันว่า Chris (`agent-ac84d8b6`) เรียกครบทั้ง 3 ตัว:
```
subagents/agent-a2192fb4  → chris-culture
subagents/agent-a869b594  → chris-thai
subagents/agent-ae6fe332  → chris-print
```
✅ **dashboard ไม่รก** — `status.json` ขึ้นแค่ `Chris → working` ตัวเดียว
sub-checker ไม่โผล่เลย ตรงตามที่ออกแบบ

❌ **แต่ sub-checker ทั้ง 3 ตัวถูกฆ่ากลางคัน** — `API Error: Connection closed mid-response`
สาเหตุ: headless print mode (`claude -p`) **ฆ่า background task ทิ้งที่ 600 วินาที**
Chris ส่ง sub-checker ไปแบบ background (ค่าเริ่มต้นตั้งแต่ v2.1.198) จึงโดนตัดก่อนทำเสร็จ

### แก้แล้ว

บังคับใน `chris-qa.md` ว่า sub-checker **ต้องรัน foreground เสมอ** (`run_in_background: false`)
— ส่งพร้อมกันใน message เดียวก็ยังขนานกันอยู่ ไม่ช้าลง
บันทึกกับดักนี้ลง `HANDOFF.md` §5 และ `SOP-01` แล้ว พร้อมทางเลือก
`CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=0` ถ้าจำเป็นต้องใช้ background ใน routine

**นี่คือกับดักที่กระทบ cloud routine ทั้งหมด** ไม่ใช่แค่ Chris — routine ข่าวเช้า/มังงะ/ดูดวง
ที่รันด้วย headless ก็ต้องรัน subagent แบบ foreground เหมือนกัน

### ที่ยังไม่ได้พิสูจน์

verdict สุดท้ายที่ Chris สรุปจากผล sub-checker ทั้ง 3 — เพราะรอบทดสอบถูกตัดก่อน
และรอบถัดไปชนลิมิตการใช้งาน (`resets 11:40pm`) ต้องรันซ้ำหลังลิมิตรีเซ็ต:
```
claude -p "delegate ให้ chris-qa ตรวจ QA เต็มรูปแบบของไฟล์ \
Output/Rae/2026-07-06-5-print-mistakes-article-v3.md — งานนี้เดิมพันสูง ตรวจให้ครบทุกมิติ \
รายงานว่า Chris แตกงานให้ใครบ้างและ verdict คืออะไร"
```
สิ่งที่ต้องเห็น: sub-checker ทั้ง 3 ทำงานจนจบ (ไม่มี Connection closed)
แล้ว Chris สรุป verdict เดียวกลับมา

## ของทดสอบชั้นที่ 1 ที่ลบทิ้ง

บทความ 3 ชิ้นที่ Rae เขียนตอนทดสอบ gate ถูกลบตามที่ Kittanate สั่ง
พร้อมลบ worklog entry และรีเซ็ต Rae กลับเป็น idle เพราะเป็นของทดสอบ ไม่ใช่งานจริง

## ขั้นถัดไป (ชั้นที่ 3 — ยังไม่ทำ)

- ย้าย/copy `.claude/agents/` ไป `~/.claude/agents/` ให้ทุกโปรเจกต์ใช้ทีมเดียวกัน
- ตั้ง `weekly-review` เป็น cloud routine วันจันทร์เช้า (ตอนนี้ยังต้องสั่งเอง)
- Agent Teams — ยังไม่แนะนำเป็น default (token สูง, resume ไม่ได้, teammate สร้าง teammate ไม่ได้)
  เปิดเฉพาะครั้งเมื่ออยากให้ Reese กับ Chris เถียงกันในงาน research sprint
