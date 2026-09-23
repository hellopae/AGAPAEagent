รัน `node scripts/routine-freshness.mjs todo` เป็นขั้นแรกจาก root ของ project
- exit 0: จบเงียบ ไม่เขียนอะไร
- exit 1: หยุดและรายงาน error ห้ามเดาหรือเขียน Firestore
- exit 10: เก็บ JSON 1 บรรทัดทั้งหมดเป็น snapshot ในโฟลเดอร์ชั่วคราวเฉพาะ run (`mktemp -d`) แล้วทำต่อ
ห้ามรัน freshness ซ้ำเพื่อเปลี่ยน updateTime ของ snapshot ระหว่างงาน
อ่านและทำตาม `routines/fallback/common.md` โดยใช้ key `todo` ทุกขั้น รวมถึงการเขียนแบบ precondition จาก snapshot แรก
ใช้ web search ของ Codex แทน WebSearch; ทำทุกขั้นด้วยตัวเอง ไม่เรียก agent และไม่อ้างว่าผ่าน Reese/Chris QA

ต้องมี connector Todoist ใน session; ถ้าไม่มี/เรียกไม่ได้ ให้หยุด ห้ามเขียน Firestore และรายงานว่า "fallback ต้องการ connector Todoist" พร้อม tool/error ถ้ามี ห้ามใช้ browser/computer-use แทน ห้ามขอ token/password
Todoist อ่านอย่างเดียว ห้ามสร้าง แก้ ปิด หรือลบ task
อ่านวันจริง `TZ=Asia/Bangkok date '+%Y-%m-%d %A'`; อ่าน todo.json ดู schema เท่านั้น

## STEP 1 — ดึงข้อมูลจาก Todoist

ผ่าน connector Todoist ที่มีใน Codex session ใช้เครื่องมือค้น tasks/sections ที่เทียบเท่าของเดิม:
- งานใน project `PAE To Do` (projectId `6h7wcgqCVqFF5gJM`) — find-tasks ด้วย projectId นี้ limit 100
- งานใน **Inbox** — find-tasks ด้วย projectId `inbox`
- รายชื่อเซคชันของ project — find-sections ด้วย projectId `6h7wcgqCVqFF5gJM` (จะได้ sectionOrder มาด้วย)
- เอาเฉพาะงานที่ยังไม่เสร็จ (`checked: false`)
- ถ้าเรียก tool ไม่ได้ (permission denied / tool not found) → **หยุดทันที ห้ามเขียน Firestore** แล้วรายงานชื่อ tool กับ error ที่ได้

## STEP 2 — ประกอบ payload

```json
{
  "source": "Todoist · project PAE To Do + Inbox",
  "projectId": "6h7wcgqCVqFF5gJM",
  "updatedAt": "<TODAY รูปแบบ YYYY-MM-DD>",
  "sections": [ ... ],
  "items": [ ... ]
}
```

**`sections`** เรียงแบบนี้:
- ตัวแรกเสมอ: `{ "id": "inbox", "name": "Inbox · ยังไม่จัดเข้า project" }` (ใส่ไว้เสมอแม้ Inbox จะว่าง — ฝั่ง render ซ่อนกลุ่มว่างให้อยู่แล้ว)
- ตามด้วยเซคชันจริงจาก Todoist **เรียงตาม `sectionOrder`**
- `id` = ชื่อเซคชันเป็นตัวพิมพ์เล็กล้วนไม่มีเว้นวรรค (Shopping→`shopping`, Idea→`idea`, Note→`note`, SomeDay→`someday`, Monthly→`monthly`, Yearly→`yearly`) · `name` = ชื่อตามที่ Todoist ให้มา
- ถ้ามีเซคชันใหม่/ถูกลบ/สลับลำดับให้สะท้อนตามนั้น อย่า hardcode รายชื่อเดิม

**`items`** เรียงตามลำดับเซคชันข้างบน แต่ละ item มี 6 คีย์ตามลำดับนี้:
- `id` — task id จาก Todoist
- `section` — id ของเซคชัน (งานใน Inbox ใช้ `"inbox"`)
- `title` — เนื้องาน เก็บภาษาไทยตามต้นฉบับ ตัด markdown link ออกให้เหลือข้อความอ่านง่าย
- `when` — ข้อความไทยสั้นๆ: มีวันครบกำหนด → วันที่ไทยย่อ พ.ศ. 2 หลัก (`2026-08-02` → `"2 ส.ค. 69"`) · ไม่มีวันแต่ทำซ้ำ → รอบการทำซ้ำ (`"ทุกวันที่ 12"`, `"ทุกเดือน"`) · ไม่มีทั้งคู่ → `"ไม่มีกำหนด"`
- `due` — `YYYY-MM-DD` (ตัดเวลาทิ้ง) ไม่มีใส่ `null`
- `repeat` — `true` ถ้า Todoist บอกว่าทำซ้ำ (มีค่า `recurring`) หรือข้อความบ่งบอกว่าทำทุกเดือน/ทุกปี ไม่งั้น `false`

เขียน payload ลงไฟล์ `todo_new.json ใน RUN_DIR`


ดึงทุกหน้าให้ครบ (ถ้ามี pagination ต่อให้จบ ห้ามส่งผลที่ถูกตัดเหลือ 100 รายการ); EXPECTED = จำนวนงานค้างจริง project + inbox จาก connector ไม่ใช่นับไฟล์เพื่อให้ assert ผ่าน
ตรวจ items เป็น array, len(items)==EXPECTED, sections[0].id==inbox, ทุก item.section อยู่ใน sections และ id งานไม่ซ้ำ
รักษาค่า source เดิมใน payload ซึ่งบอกที่มาของรายการ; เพิ่ม source="codex-fallback" ที่ fields ระดับ doc
fields: dataJson=JSON.stringify(payload), updatedAt=TODAY (YYYY-MM-DD), checkedAt=nowUTC, count=จำนวน items (Firestore integer), by="To Do Sync routine", source="codex-fallback"
ใช้ common.md เขียนด้วย snapshot เดิม งานที่ปิดแล้วต้องไม่อยู่ใน payload แม้ข้อมูลไม่เปลี่ยนต้องเขียนเมื่อ freshness exit 10
ถ้า assert ล้มให้แก้ payload ห้ามปิด assert หรือเปลี่ยน EXPECTED ให้ตรงกับไฟล์
อ่านกลับแล้วรายงานจำนวนงานและผล sync หรือ error; ไม่ต้องรายงานเมื่อตรวจครั้งแรกได้ exit 0
