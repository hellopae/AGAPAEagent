# SOP-09 — การสร้าง Agent ใหม่ (ครบทั้ง 7 จุดที่ต้องแตะ)

> ใช้เมื่อ Kittanate อนุมัติให้สร้าง agent ใหม่ — Claudy เสนอได้ แต่**สร้างเมื่อได้รับอนุมัติเท่านั้น**
> ถ้าแตะไม่ครบทั้ง 7 จุด agent จะ "มีตัวตนครึ่งเดียว" (ทำงานได้แต่ dashboard ไม่เห็น หรือกลับกัน)

## Checklist 7 จุด

### 1. Agent file — `.claude/agents/<id>.md`
```markdown
---
name: <id>                    # kebab-case เช่น social-media
description: <เมื่อไหร่ควรใช้ agent นี้ — เขียนละเอียด Claude ใช้ตัดสินใจ route>
tools: <เฉพาะที่จำเป็น เช่น Read, Write, WebSearch>
model: inherit
---
You are <ชื่อ>, <บทบาท> for TANAPAT Printing's AI studio.
<หน้าที่ / สิ่งที่ทำ-ไม่ทำ / output format / กติกา>
```
หลักการเขียน (ดูตัวอย่างดีที่สุด: `reese-research.md`, `chris-qa.md`):
- ระบุชัดว่า agent นี้ **ไม่ทำ** อะไร (กัน scope creep)
- Output format บังคับ ให้ตรวจได้ว่างานครบ
- ให้ tools น้อยที่สุดที่พอทำงาน

### 2. Hook MAP — ต้องแก้ **2 ไฟล์** ไม่ใช่ไฟล์เดียว
- `scripts/hook-status.mjs` → เพิ่มใน `MAP`: `"<agent-file-name>": "<statusId>",`
- `scripts/hook-gate.mjs` → เพิ่มใน `MAP` + `NAME` แล้วจัดกลุ่มให้ครบ:
  - `FACTUAL` — ถ้า output ของ agent นี้มี factual claims ได้ (จะถูกบังคับให้ผ่าน Reese ก่อน Chris)
  - `VISUAL` — ถ้าเป็น pure design/layout/metadata (ข้าม fact-check ได้)
  - `WRITES_OUTPUT` — ถ้าต้องมีไฟล์ผลงานใน `Output/<Name>/`

ลืมไฟล์ที่สองแปลว่า agent ใหม่หลุด quality gate ทั้งหมด

> **ข้อยกเว้น — sub-checker ของ Chris** (`chris-thai`, `chris-culture`, `chris-print`)
> ไม่ต้องใส่ MAP, ไม่ต้องมี entry ใน `status.json`, ไม่ต้องมี avatar
> เพราะเป็น worker ภายในของ Chris ไม่ใช่สมาชิกสตูดิโอ — hook จะข้ามไปเงียบ ๆ เอง
> และไม่ควรขึ้น dashboard เพราะ Kittanate ดูที่ verdict ของ Chris ไม่ใช่ผลย่อย

### 3. `status.json` — เพิ่ม entry ใน `agents[]`
```json
{ "id": "<statusId>", "name": "<ชื่อ>", "role": "<บทบาท>",
  "pipeline": "content|design|quality|standalone",
  "img": "avatars/<ชื่อ>.png", "persona": "<บุคลิกสั้น ๆ ภาษาไทย>",
  "caps": ["...", "...", "..."], "what": ["...", "...", "..."],
  "status": "idle", "task": "" }
```

### 4. Avatar — `avatars/<ชื่อ>.png`
ไม่มีไฟล์รออยู่แล้ว — `avatars/` มีครบทุกคนพอดี ต้องให้ Mind ออกแบบใหม่ทุกครั้ง
ถ้ายังไม่มีไฟล์ dashboard จะ fallback เป็นตัวอักษรแรกบน gradient (ไม่พัง แต่ดูแปลกแยกชัดมาก)

**กฎเหล็กของชุด avatar นี้** (Mind สรุปจากภาพจริง 21 ส.ค. 2569 — ห้ามเดาเอง):
- 768×1376 px แนวตั้ง 9:16 · ครึ่งตัวถึงสะโพก · กล้องระดับอก · **สบตาคนดูทุกตัว**
- อนิเมะ cel shading เส้นหมึกน้ำตาลเข้ม (ไม่ใช่ดำสนิท) สีหม่นบนโทนกระดาษอุ่น แสงนุ่มไม่มี rim light
- ฉากหลังวาดเต็ม **ชัดหมด ไม่เบลอ** แยกชั้นด้วยเส้นบางกว่า+คอนทราสต์ต่ำกว่า ไม่ใช่ด้วย blur
- **สีเสื้อ = สีประจำตัว** และ **มือต้องเห็นและกำลังทำอะไรอยู่**
- ⚠️ ห้ามมีข้อความไทยบนภาพ — avatar รุ่นก่อนตัวหนังสือไทยเพี้ยนทุกใบ

### 5. Firestore — doc `agents/<statusId>`
รัน pattern เดียวกับ `scripts/seed-firestore.mjs` เพื่อ seed doc ใหม่ (dashboard real-time อ่านจากนี่)

### 6. เอกสาร — อัปเดต 3 ที่ให้ตรงกัน
- `CLAUDE.md`: ROUTING TABLE + ลบออกจาก GAPS
- `.claude/agents/claudy.md`: AGENT ROSTER + ROUTING GUIDE
- `BACKLOG.md`: เพิ่ม section งานมอบหมายของ agent ใหม่

### 7. `index.html` — เพิ่มใน `SEED_AGENTS` (จุดที่ SOP เดิมตกไป)
`index.html` มี `SEED_AGENTS` hardcode ไว้เป็นสำเนาที่สามของ status.json
ถ้าไม่เพิ่ม agent ใหม่จะไปพึ่ง fallback ที่ append **ต่อท้ายสุด** = การ์ดโผล่ผิดกลุ่ม
และถ้า Firestore ล่มหรือโหลดไม่ทัน การ์ดจะหายไปเลย

⚠️ **Firestore คือแหล่งข้อมูลจริง ไม่ใช่ status.json** — dashboard subscribe ด้วย
`collection("agents").orderBy("sortOrder")` doc ที่ไม่มีฟิลด์ `sortOrder` Firestore จะไม่คืนมาเลย
อาการคือ push สำเร็จ ทุกอย่างดูถูก แต่ agent ใหม่ไม่ขึ้น หาสาเหตุยากมาก
→ **ต้องรัน `scripts/seed-firestore.mjs` อย่าแก้มือใน console**

⚠️ **ห้ามตั้ง `pipeline` เป็นค่าที่ไม่มีใน `PIPELINES`** — เดิม `render()` ไม่มี guard จะ throw
แล้วการ์ดหายทั้งกระดาน (แก้แล้ว 21 ส.ค. 2569 ใส่ `|| PIPELINES.standalone` ไว้ทุกจุด
แต่การ์ดก็จะได้สี/ป้ายผิดกลุ่มอยู่ดี)

⚠️ **id ห้ามชนกับ doc ที่ไม่ใช่ agent ใน collection `agents`** — มี `worklog`, `daily`,
`horoscope`, `finance`, `painpoint`, `claude_limit` ปนอยู่

## ทดสอบหลังสร้าง (บังคับ)

1. Delegate task เล็ก ๆ ผ่าน Task tool ด้วย `subagent_type` ใหม่
2. เช็คว่า: status.json เปลี่ยนเป็น working→done / worklog.json มี entry ใหม่บนสุด /
   dashboard แสดงผล / git push อัตโนมัติสำเร็จ
3. ถ้าจุดไหนเงียบ → ไล่ตาม checklist 6 จุดว่าข้ามอะไรไป

## Agent ที่ Kittanate ระบุว่าอาจสร้างในอนาคต (ยังไม่อนุมัติ — อย่าสร้างเอง)

_(Social ถูกยุบรวมเข้า **Addy** เมื่อ 21 ส.ค. 2569 — social เป็นแค่ 1 ช่องทางในแผนของ Addy)_

| Agent | ด้าน | โน้ตของ Architect |
|---|---|---|
| Finance | บัญชี/การเงิน | ควรเกิดเมื่อมียอดขาย Etsy/Gumroad สม่ำเสมอ — ต้องคุยเรื่องข้อมูลอ่อนไหวก่อน |
| Service | ลูกค้าสัมพันธ์ | ควรเกิดเมื่อมี volume คำถามลูกค้า — ต้องมี FAQ/knowledge base จาก Libby ก่อน |
| Photo | ถ่ายภาพสินค้า | mockup/preview images สำหรับ listing — อาจรวมกับ Mind ได้ ยังไม่จำเป็นต้องแยก |
