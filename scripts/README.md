# scripts/ — เครื่องมือหลังบ้านของ AGAPAE Agent

| ไฟล์ | ทำอะไร | ใครเรียก |
|---|---|---|
| `hook-status.mjs` | status.json + worklog.json + Firestore + git push | hook อัตโนมัติ (ดู SOP-07) |
| `hook-gate.mjs` | บังคับ fact-check gate + Definition of Done | hook อัตโนมัติ |
| `set-status.mjs` | ตั้งสถานะ agent ด้วยมือ | คน |
| `seed-firestore.mjs` | อัปโหลด status.json ขึ้น Firestore (ครั้งเดียวตอน setup) | คน |
| `push-daily.mjs` · `push-limit.mjs` | widget รายวัน / Claude limit | routine + hook |
| **`build-meeting.mjs`** | ประกอบ + ตรวจ **บันทึกการประชุม** → `meetings.json` + Firestore `agents/meetings` | agent (Libby) ตอนปิดโจทย์ |

---

## build-meeting.mjs — บันทึกการประชุม

### ใครป้อนเนื้อหา (สำคัญที่สุด — อ่านก่อนใช้)

สคริปต์นี้ **ไม่อ่านความหมาย** ของไฟล์ใน `Output/`
การสรุปว่า "ใครเสนออะไร ใครค้านใคร" ต้องเข้าใจภาษาไทยและบริบทของงาน — regex ทำไม่ได้
และถ้าเดา ก็จะได้บันทึกประชุมที่ใส่ความให้เพื่อนร่วมทีม ซึ่งแย่กว่าไม่มีบันทึกเลย

หน้าที่จึงแบ่งกันแบบนี้:

| ขั้น | ใครทำ | ทำอะไร |
|---|---|---|
| 1 | **Dale / คนสั่งงาน** | รัน `template` ได้โครง JSON ที่เติม `agent` + `file` ให้แล้ว |
| 2 | **Libby (agent)** | อ่านไฟล์ใน `Output/` ที่โครงชี้ไว้ แล้วกรอก `role` / `proposal` / `keyPoints` / `disagreements` (พร้อม `severity`) / `conclusion` / `decisions` |
| 3 | **สคริปต์** | ตรวจ (validate) → เติมฟิลด์ที่คำนวณได้ (`agentName`, `agentImg`, `participants`, `createdAt`) → เขียน `meetings.json` + Firestore |

> Libby เป็นคนกรอกเพราะบทบาทของ Libby คือ metadata/index — **ไม่แก้เนื้อหางานของใคร**
> ตรงกับงานนี้พอดี: สกัดจุดยืนจากงานที่เขียนเสร็จแล้ว ไม่ใช่เขียนแทน
> ถ้าไม่แน่ใจว่า agent คนนั้นเสนออะไร ให้ยกคำในไฟล์มา **อย่าตีความเกินที่เขาเขียน**

รันครั้งเดียวตอน **ปิดโจทย์** — ไม่ใช่ระบบ live chat และไม่ใช่ debate หลายรอบ
ต้นทุนควรประมาณงานสรุป 1 ชิ้น

### ขั้นตอนใช้จริง

```bash
# 1) สร้างโครงจากไฟล์ที่เป็นของโจทย์เดียวกัน (agent เดาจากโฟลเดอร์ Output/<Agent>/)
node scripts/build-meeting.mjs template \
  --id 2026-07-30-mirofish \
  --topic "MiroFish ใช้ประโยชน์กับ TANAPAT ได้ยังไง" \
  --sop SOP-05 \
  --files Output/Minnie/2026-07-30-mirofish-ideas.md,Output/Dale/2026-07-30-mirofish-technical.md,Output/Nick/2026-07-30-mirofish-cost.md \
  --out /tmp/mirofish-draft.json

# 2) Libby กรอกเนื้อหาใน /tmp/mirofish-draft.json

# 3) ตรวจก่อน (ไม่เขียนอะไร)
node scripts/build-meeting.mjs add /tmp/mirofish-draft.json --dry-run

# 4) เขียนจริง (meetings.json + Firestore agents/meetings)
node scripts/build-meeting.mjs add /tmp/mirofish-draft.json
```

คำสั่งอื่น:

```bash
node scripts/build-meeting.mjs validate              # ตรวจ meetings.json ทั้งก้อน
node scripts/build-meeting.mjs validate draft.json   # ตรวจไฟล์เดียว
node scripts/build-meeting.mjs add x.json --replace  # เขียนทับ record ที่ id ซ้ำ (แก้/เติม factcheck)
node scripts/build-meeting.mjs add x.json --no-firestore   # เขียนแค่ไฟล์ในเครื่อง
cat x.json | node scripts/build-meeting.mjs add --stdin    # ป้อนทาง stdin
node scripts/build-meeting.mjs sync                  # ดัน meetings.json ที่มีขึ้น Firestore (ซ่อม/seed)
```

### กฎที่สคริปต์บังคับ (ไม่ผ่าน = ไม่เขียนไฟล์ exit 1)

- `id` ต้องเป็น `YYYY-MM-DD-slug` และ `date` ต้องตรงกับวันที่ใน id
- `topic`, `status`, `conclusion` ห้ามว่าง — ประชุมที่ไม่มีข้อสรุปให้เขียนว่า *ทำไม* ยังไม่สรุป
- ทุก `agent` และทุก `disagreements[].with` ต้องเป็น id ที่มีจริงใน `status.json`
  (agent ใหม่ที่เพิ่มตาม SOP-09 จะใช้ได้ทันทีโดยไม่ต้องแก้สคริปต์)
- ทุก entry ต้องอยู่ใน `participants` และค้านได้เฉพาะคนที่อยู่ในประชุมเดียวกัน (ค้านตัวเองไม่ได้)
- `file` (และ `factcheckFile` ถ้าใส่) ต้องขึ้นต้นด้วย `Output/` และ **มีอยู่จริงบนดิสก์**
- `entries` ต้องมีอย่างน้อย 1 — บันทึกประชุมที่ไม่มีใครพูดคือ worklog ไม่ใช่ meeting
- `severity` / `factcheck` / `stance` ถ้าใส่ ต้องเป็นค่าในชุดเท่านั้น — **พิมพ์ผิด = error ไม่ใช่เตือน**
  เพราะ UI ใช้ 3 ตัวนี้เรียงลำดับและเลือกสี ค่าที่ตกไปเป็นค่ากลางเงียบ ๆ จะทำให้
  ข้อค้านระดับ blocker ไปโผล่ล่างสุดของหน้าโดยไม่มีใครรู้
- id ซ้ำต้องใส่ `--replace` เท่านั้น

**เตือน (ไม่บล็อก):** `status`/`role` ที่ไม่อยู่ในชุดมาตรฐาน, `proposal` ยาวเกิน 600 ตัวอักษร,
participant ที่ไม่มี entry, ไฟล์ SOP ที่อ้างถึงไม่มีในโฟลเดอร์ `SOP/`,
`disagreements[].severity` ที่ไม่ได้ระบุ (ใช้ `challenge` ให้), `factcheck` ที่ไม่ใช่ `pending` แต่ไม่อ้าง `factcheckFile`

### ค่าที่ UI ใช้

**ข้อความอิสระ (ค่าใหม่ใช้ได้ แต่ badge จะเป็นสีกลาง):**

- `status`: `กำลังประชุม` · `รอ PAE ตัดสินใจ` · `ตัดสินใจแล้ว` · `เก็บเข้าคลัง`
  (31 ก.ค. 2026 เปลี่ยนจาก "รอ Kittanate ตัดสินใจ" — ค่านี้ถูกเทียบตรง ๆ ใน `index.html` (`MT_WAIT`)
  และใน `build-meeting.mjs` (`STATUS_WAIT`) แก้คำเมื่อไหร่ต้องแก้พร้อมกันทั้ง 3 ที่ ไม่งั้นสถิติจะนับไม่ขึ้นเงียบ ๆ)
- `role`: `เสนอไอเดีย` · `ตรวจสอบข้อเท็จจริง` · `ประเมินต้นทุน` · `ประเมินเทคนิค` · `ออกแบบ` · `QA` · `จัดระบบ/สรุป`

**enum ปิด (ค่านอกชุด = error):**

| ฟิลด์ | ที่ | ค่า | ไม่ใส่แล้วเป็นยังไง |
|---|---|---|---|
| `disagreements[].severity` | ต่อข้อค้าน | `blocker` (ข้อเสนอเดินต่อไม่ได้) · `challenge` (ค้านสาระสำคัญแต่ยังเดินต่อได้) · `note` (ข้อสังเกต) | ได้ `challenge` + คำเตือน · UI เรียง blocker → challenge → note |
| `entries[].factcheck` | ต่อ entry | `pending` · `passed` · `failed` | ได้ `pending` · ป้ายบน dashboard = "⚠ รอ fact-check" |
| `entries[].stance` | ต่อ entry | `propose` · `support` · `oppose` · `neutral` | ได้ `null` · **UI เดาให้เอง**: มี `disagreements` = ค้าน / ไม่มี = เสนอ |

**ฟิลด์ optional อื่น:**

- `disagreements[].quote` — ประโยคจริงที่ยกมาจากไฟล์ (ห้ามเรียบเรียงใหม่ ไม่มีก็เว้นว่าง)
- `disagreements[].impact` — ค้านแล้วเกิดอะไรขึ้นกับงาน
- `entries[].factcheckFile` — path ไฟล์ผล Reese fact-check (ป้ายสถานะบน dashboard จะกดไปอ่านได้)
- `participants` — ไม่ใส่ = derive จาก `entries[].agent` · ใส่เมื่อมีคนร่วมประชุมที่ไม่ได้เขียนเอกสาร
- `decisions[]` — ข้อความ หรือ `{ question, options: [], owner }`

### schemaVersion

| รุ่น | เมื่อ | เปลี่ยนอะไร |
|---|---|---|
| 1 | 31 ก.ค. 2026 (เช้า) | โครงตั้งต้น — `entries[].verified` เป็น boolean |
| **2** | 31 ก.ค. 2026 (บ่าย) | `verified` → **`factcheck`** (`pending`/`passed`/`failed`) · เพิ่ม `severity`/`quote`/`impact` ในข้อค้าน · เพิ่ม `stance` + `factcheckFile` · `participants` เป็น optional · `decisions` รับ object · root มี `source` |

> ไฟล์รุ่น 1 ยังอ่านได้ — สคริปต์แปลง `verified: true/false` → `factcheck: "passed"/"pending"`
> ให้อัตโนมัติพร้อมคำเตือน รัน `add <file> --replace` ครั้งเดียวก็ย้ายรุ่นเรียบร้อย

### ข้อต่างจาก worklog ที่ต้องรู้

- **Firestore เขียนแบบ PATCH ทั้ง array** (`agents/meetings` field `meetings`)
  ไม่ใช่ `arrayUnion` แบบ worklog — เพราะ record ประชุมถูกแก้ทีหลังได้ (เช่นเติม `verified`
  หรืออัปเดต `conclusion` ตอน PAE ตัดสินใจ) ถ้าใช้ arrayUnion จะได้ของซ้ำสองก้อน
  วิธีนี้เขียนซ้ำกี่รอบผลก็เท่าเดิม (idempotent) และเป็นทางเดียวที่ `--replace` ทำงานถูก
- doc `agents/meetings` ไม่มี field `sortOrder`/`id` → ไม่โผล่ใน listener รายชื่อ agent
  ของ dashboard (`orderBy("sortOrder")`) เหมือน `agents/worklog` — ปลอดภัย
- **สคริปต์ไม่ git commit/push** — ปล่อยให้ hook `hook-status.mjs` หรือ Claudy จัดการตอนจบเทิร์นตาม SOP-07
