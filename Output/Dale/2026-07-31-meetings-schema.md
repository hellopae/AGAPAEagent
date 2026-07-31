# บันทึกการประชุม (Meeting) — โครงข้อมูล + สคริปต์ประกอบ record

**โดย Dale (DevOps) | 31 ก.ค. 2026 | ขั้นที่ 1 จาก 2 (ขั้นที่ 2 = ต่อ UI บน dashboard หลัง Vera ส่ง UX spec)**

---

## สิ่งที่ส่งในขั้นนี้

| ไฟล์ | สถานะ |
|---|---|
| `meetings.json` (root) | ใหม่ — โครงว่าง `{ schemaVersion, updatedAt, meetings: [] }` |
| `scripts/build-meeting.mjs` | ใหม่ — ตัวประกอบ + ตัววาลิเดต + ตัวเขียน Firestore |
| `scripts/README.md` | ใหม่ — คู่มือใช้งาน + ระบุชัดว่าใครป้อนเนื้อหา |
| Firestore doc `agents/meetings` | สร้างแล้ว (array ว่าง, `schemaVersion: 1`) — ทดสอบ path เขียนจริงแล้ว |

**ไม่ได้แตะ** `index.html` (Vera ทำ UX spec ขนานกัน), ไม่ได้แก้ SOP, ไม่ได้ commit/push

---

## สิ่งที่สำรวจก่อนลงมือ (ต่อของเดิม ไม่สร้างระบบคู่ขนาน)

- `scripts/hook-status.mjs` — MAP `subagent_type → agent id` 11 ตัว, เขียน Firestore ผ่าน REST + API key
  (`fsVal()` แปลง JS → Firestore value), worklog ใช้ `appendMissingElements` (arrayUnion) บน `agents/worklog`
- `worklog.json` — `{ updatedAt, entries[] }` entry ใหม่ `unshift` บนสุด, entry มี `agent` + `agentName` + `agentImg`
- `status.json` — `{ updatedAt, agents[] }` 11 agent (claudy, minnie, reese, rae, vera, mind, chris, libby, nick, dale, news)
  แต่ละตัวมี `id`/`name`/`img`/`pipeline` — **ใช้เป็นแหล่งความจริงเดียวของทะเบียน agent**
- `index.html` บรรทัด 807 `mergeWorklog()` — รวม `WL_JSON` (จากไฟล์) + `WL_FS` (Firestore real-time)
  ลง Map ที่คีย์ `id` แล้วเรียงตาม `datetime` ถอยหลัง; บรรทัด 1357 `loadWorklog()` fetch ไฟล์;
  บรรทัด 1549 listener `agents/worklog`
- `seed-firestore.mjs` — รูปแบบ PATCH doc ทีละตัวพร้อม `fsVal()` เดียวกัน

`build-meeting.mjs` ใช้ helper/รูปแบบเดียวกันทั้งหมด (คัดลอก `fsVal()` มาตรง ๆ, project/key เดียวกัน,
โครงไฟล์ `{ updatedAt, <array> }` เหมือนกัน, record ใหม่อยู่บนสุดเหมือน worklog)

---

## การตัดสินใจทางเทคนิค

### 1. สคริปต์เป็น "ตัวประกอบ + ตัววาลิเดต" ไม่ใช่ตัว parse ภาษาไทย (ข้อสำคัญที่สุด)

สรุปว่าใครเสนออะไร ใครค้านใคร = งานที่ต้องเข้าใจบริบท regex ทำไม่ได้ และการเดา
จะกลายเป็นการ **ใส่ความให้เพื่อนร่วมทีม** ซึ่งแย่กว่าไม่มีบันทึกเลย

แบ่งงานเป็น: `template` (สคริปต์เดา agent จากโฟลเดอร์ `Output/<Agent>/` ให้) →
**Libby กรอกเนื้อหาจากการอ่านไฟล์จริง** → `add` (สคริปต์ตรวจ + เติมฟิลด์ที่คำนวณได้ + เขียน)
รันครั้งเดียวตอนปิดโจทย์ ต้นทุน ≈ งานสรุป 1 ชิ้น ตรงตามขอบเขตที่ Kittanate ตัดสินใจไว้

### 2. ฟิลด์ที่เพิ่มจาก schema ตั้งต้น (ทั้งหมดสคริปต์เติมเอง ไม่ต้องกรอก)

| ฟิลด์ | อยู่ที่ | เหตุผล |
|---|---|---|
| `schemaVersion` | root | มีเวอร์ชันไว้ตั้งแต่ต้น เผื่อ schema ขยับแล้ว UI ต้องรู้ว่ากำลังอ่านของรุ่นไหน |
| `updatedAt` | root + ต่อ record | ตรงกับ `worklog.json`/`status.json`; ระดับ record ใช้ตัดสินตอน merge ไฟล์ vs Firestore |
| `createdAt` | ต่อ record | `date` มีแค่ระดับวัน เรียงประชุมวันเดียวกันไม่ได้ — `createdAt` ทำให้ลำดับนิ่ง และ `--replace` ไม่ดันประวัติเลื่อน |
| `agentName`, `agentImg` | ต่อ entry | worklog มีอยู่แล้ว UI จะได้ไม่ต้อง hardcode map ชื่อ/รูป ดึงจาก `status.json` (ได้ `?v=3` cache-bust ติดมาด้วย) |

**ไม่เปลี่ยน** ชื่อฟิลด์ `file` ให้เป็น `outputFile` แม้ worklog seed ใน `index.html` จะใช้ `outputFile`
— เพราะ Vera กำลังเขียน UX spec จาก schema ที่ตกลงกันไว้ การเปลี่ยนชื่อตอนนี้จะทำให้ spec ไม่ตรงโค้ด
ความสม่ำเสมอไม่คุ้มกับความเสี่ยงตรงนี้ (ถ้าจะรวมชื่อ ค่อยทำทีเดียวทั้งระบบทีหลัง)

### 3. `status` / `role` เป็นข้อความอิสระ แต่มี "ชุดที่ UI รู้จัก"

ทำเป็น enum แข็ง = ประชุมกรณีใหม่จะถูกบล็อกโดยไม่จำเป็น
ทำเป็น free text ล้วน = UI เลือกสี badge ไม่ได้
เลือกทางกลาง: ค่านอกชุด **เตือนแต่ผ่าน** และ UI fallback เป็นสีกลาง

- `status`: `กำลังประชุม` · `รอ Kittanate ตัดสินใจ` · `ตัดสินใจแล้ว` · `เก็บเข้าคลัง`
- `role`: `เสนอไอเดีย` · `ตรวจสอบข้อเท็จจริง` · `ประเมินต้นทุน` · `ประเมินเทคนิค` · `ออกแบบ` · `QA` · `จัดระบบ/สรุป`

### 4. Firestore เขียนแบบ PATCH ทั้ง array — ไม่ใช่ arrayUnion แบบ worklog

worklog เป็น append-only จึงใช้ `appendMissingElements` ได้
แต่ record ประชุม **ถูกแก้ทีหลัง** (เติม `verified` หลัง Reese fact-check, อัปเดต `conclusion`
ตอน Kittanate ตัดสินใจ) — arrayUnion จะได้ของซ้ำสองก้อนที่ต่างกันนิดเดียว UI แยกไม่ออก
PATCH ทั้ง array เขียนกี่รอบผลก็เท่าเดิม และเป็นทางเดียวที่ `--replace` ทำงานถูก
จำนวนประชุมต่อปีอยู่หลักสิบ ขนาด doc ไม่ใกล้เพดาน 1 MB

ตรวจแล้วว่า doc `agents/meetings` **ไม่กระทบ listener เดิม**: `index.html` บรรทัด 1536
ใช้ `collection("agents").orderBy("sortOrder")` — Firestore ตัด doc ที่ไม่มี field นั้นทิ้งเอง
และบรรทัด 1537 ยังกรองด้วย `x.id` ซ้ำอีกชั้น doc ใหม่จึงเงียบเหมือน `agents/worklog`

### 5. ทะเบียน agent อ่านจาก `status.json` ไม่ hardcode MAP

`hook-status.mjs` ต้องมี MAP เพราะแปลง `subagent_type` → id แต่ที่นี่รับ agent id ตรง ๆ
อ่าน `status.json` จึงพอ และ **agent ใหม่ที่เพิ่มตาม SOP-09 ใช้ได้ทันทีโดยไม่ต้องแก้สคริปต์**
(ลดกับดัก "ลืมเพิ่ม MAP" ที่ HANDOFF ข้อ 5 เตือนไว้ ไม่ให้เพิ่มไฟล์ที่ต้องแก้พร้อมกันเป็นไฟล์ที่สาม)

### 6. สคริปต์ไม่ git commit/push

`hook-status.mjs` push ให้อยู่แล้วตอน SubagentStop และการ push ซ้อนกันสองที่ทำให้ debug ยาก
ปล่อยให้ hook/Claudy จัดการตาม SOP-07

---

## กฎที่ validate บังคับ (ไม่ผ่าน = ไม่เขียนไฟล์ exit 1)

- `id` = `YYYY-MM-DD-slug` และ `date` ตรงกับวันที่ใน id
- `topic` / `status` / `conclusion` ห้ามว่าง (ยังไม่สรุปให้เขียนว่า *ทำไม* ยังไม่สรุป)
- ทุก `agent` และ `disagreements[].with` ต้องมีจริงใน `status.json`
- entry ทุกตัวต้องอยู่ใน `participants`; ค้านได้เฉพาะคนในประชุมเดียวกัน; ค้านตัวเองไม่ได้
- `file` ต้องขึ้นต้นด้วย `Output/` และมีอยู่จริงบนดิสก์
- `entries` ≥ 1; id ซ้ำต้องใส่ `--replace`

เตือนแต่ไม่บล็อก: ค่า `status`/`role` นอกชุด, `proposal` > 600 ตัวอักษร,
participant ที่ไม่มี entry, `sop` ที่ไม่มีไฟล์จริงใน `SOP/`

---

## ผลการทดสอบ (รันจริงบนเครื่อง 31 ก.ค. 2026)

| เคส | ผล |
|---|---|
| `template` จากไฟล์ MiroFish 3 ไฟล์ | ✅ เดา agent จากโฟลเดอร์ถูกทั้ง 3 (minnie/dale/nick) |
| ไฟล์เสีย 11 จุด (id ผิดรูป, agent ไม่มีจริง, path ไม่มี, ค้านคนนอกประชุม, `decisions` ไม่ใช่ array …) | ✅ ฟ้องครบทั้ง 11 ข้อพร้อมกัน exit 1 ไม่เขียนไฟล์ |
| `add` ปกติ → `--replace` → `validate` | ✅ ผ่าน, `agentName`/`agentImg` เติมถูก, `createdAt` เดิมไม่ถูกดันตอน replace |
| `add` id ซ้ำโดยไม่ใส่ `--replace` | ✅ บล็อก exit 1 |
| `--stdin`, `--dry-run`, `--no-firestore` | ✅ ทำงานถูกทุกตัว |
| `sync` → Firestore | ✅ doc `agents/meetings` ถูกสร้าง อ่านกลับมายืนยันแล้ว |

หลังทดสอบเสร็จ `meetings.json` ถูกคืนเป็นโครงว่าง (record ทดสอบไม่ค้างอยู่ในไฟล์)

---

## สิ่งที่ Vera ต้องรู้ (สำหรับ UX spec)

1. **ฟิลด์ที่มีจริงต่อ entry**: `agent`, `agentName`, `agentImg`, `role`, `proposal`,
   `keyPoints[]`, `disagreements[{with, point}]`, `file`, `verified`
   ต่อ meeting: `id`, `topic`, `date`, `sop`, `status`, `participants[]`, `entries[]`,
   `conclusion`, `decisions[]`, `createdAt`, `updatedAt`
2. `keyPoints` / `disagreements` / `decisions` **ว่างได้** — ต้องมีสถานะ "ไม่มีข้อเห็นต่าง" ในดีไซน์
   (ประชุมที่ทุกคนเห็นตรงกันเป็นเรื่องปกติ ไม่ใช่ error)
3. `verified: false` เป็นค่าเริ่มต้นและจะเป็น **ส่วนใหญ่** ตอนแรก — ป้าย "ยังไม่ fact-check"
   ต้องอ่านแล้วไม่ตกใจ แต่ต้องเห็น
4. `status`/`role` มีชุดมาตรฐาน (ข้อ 3 ด้านบน) แต่ **ค่านอกชุดเกิดขึ้นได้** ต้องมี fallback สีกลาง
5. `proposal` ตั้งใจให้ 2-4 บรรทัด (~300 ตัวอักษร, เตือนที่ 600) — การ์ดออกแบบเผื่อความยาวนี้ได้
6. `agentImg` มี query string ติดมา (`avatars/Minnie.png?v=3`) — ใช้ต่อได้เลย อย่าตัดทิ้ง
7. **ข้อควรระวังตอน merge ไฟล์ + Firestore (ขั้นที่ 2)**: worklog ใช้ last-wins ได้เพราะ append-only
   แต่ meeting แก้ทีหลังได้ → ต้องเทียบ `updatedAt` แล้วเลือกตัวใหม่กว่า ไม่ใช่ทับมั่ว

## สิ่งที่ Libby ต้องรู้ (คนกรอกเนื้อหา)

1. ขั้นตอน 3 ขั้นและตัวอย่างคำสั่งเต็มอยู่ใน `scripts/README.md`
2. **ห้ามตีความเกินที่เจ้าของงานเขียน** — ไม่แน่ใจให้ยกคำในไฟล์มา; นี่คือบันทึก ไม่ใช่การวิเคราะห์
3. `disagreements` ใส่เฉพาะที่เห็นต่างจริงในเอกสาร ไม่ใช่ปั้นความขัดแย้งให้ดูมีสีสัน
4. `verified: true` ใส่ได้เฉพาะงานที่ผ่าน Reese fact-check แล้วจริง ๆ
5. รันครั้งเดียวตอนปิดโจทย์ — ไม่ใช่รันสะสมทีละรอบ
6. โครงจาก `template` มี `_howto` อยู่ในไฟล์ (ฟิลด์ขึ้นต้น `_` ถูกตัดทิ้งตอน `add` ใช้จดโน้ตได้)

---

## ข้อเสนอแก้ SOP (เสนอ ไม่ลงมือแก้เอง — รอ Kittanate/Claudy อนุมัติ)

1. **SOP-07** — เพิ่มหัวข้อ "meetings.json + Firestore `agents/meetings`" ต่อจาก schema ของ worklog
   (ตอนนี้รายละเอียดอยู่ใน `scripts/README.md` ชั่วคราว)
2. **SOP-05 (Research Sprint)** — เพิ่มขั้นสุดท้าย: ปิดโจทย์แล้วให้ Libby ประกอบบันทึกการประชุม
   ด้วย `build-meeting.mjs` ก่อนส่งมอบ Kittanate — เป็นจุดที่ฟีเจอร์นี้เกิดประโยชน์ที่สุด
   เพราะ SOP-05 คือ workflow ที่มีหลาย agent เสนอเรื่องเดียวกันแล้วเห็นไม่ตรงกัน
3. **`.claude/skills/`** — ถ้าใช้บ่อยควรมี skill `new-meeting` ห่อ 3 ขั้นนี้ (ยังไม่ทำ รอดูว่าใช้จริงแค่ไหน)

## งานที่เหลือของขั้นที่ 2

ต่อแท็บที่ 5 ใน `index.html`: `loadMeetings()` (fetch `meetings.json` แบบเดียวกับ `loadWorklog()`)
+ listener `agents/meetings` + `mergeMeetings()` ที่เทียบ `updatedAt` ตามข้อ 7 ด้านบน
— ทำหลัง Vera ส่ง UX spec
