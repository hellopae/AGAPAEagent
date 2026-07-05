# SOP-09 — การสร้าง Agent ใหม่ (ครบทั้ง 6 จุดที่ต้องแตะ)

> ใช้เมื่อ Kittanate อนุมัติให้สร้าง agent ใหม่ — Claudy เสนอได้ แต่**สร้างเมื่อได้รับอนุมัติเท่านั้น**
> ถ้าแตะไม่ครบทั้ง 6 จุด agent จะ "มีตัวตนครึ่งเดียว" (ทำงานได้แต่ dashboard ไม่เห็น หรือกลับกัน)

## Checklist 6 จุด

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

### 2. Hook MAP — `scripts/hook-status.mjs`
เพิ่มบรรทัดใน `MAP`: `"<agent-file-name>": "<statusId>",`

### 3. `status.json` — เพิ่ม entry ใน `agents[]`
```json
{ "id": "<statusId>", "name": "<ชื่อ>", "role": "<บทบาท>",
  "pipeline": "content|design|quality|standalone",
  "img": "avatars/<ชื่อ>.png", "persona": "<บุคลิกสั้น ๆ ภาษาไทย>",
  "caps": ["...", "...", "..."], "what": ["...", "...", "..."],
  "status": "idle", "task": "" }
```

### 4. Avatar — `avatars/<ชื่อ>.png`
มีรอแล้ว: Dale.png, Mind.png | ถ้ายังไม่มี: มอบ Mind ทำตามสไตล์ avatar ชุดเดิม (anime-style)

### 5. Firestore — doc `agents/<statusId>`
รัน pattern เดียวกับ `scripts/seed-firestore.mjs` เพื่อ seed doc ใหม่ (dashboard real-time อ่านจากนี่)

### 6. เอกสาร — อัปเดต 3 ที่ให้ตรงกัน
- `CLAUDE.md`: ROUTING TABLE + ลบออกจาก GAPS
- `.claude/agents/claudy.md`: AGENT ROSTER + ROUTING GUIDE
- `BACKLOG.md`: เพิ่ม section งานมอบหมายของ agent ใหม่

## ทดสอบหลังสร้าง (บังคับ)

1. Delegate task เล็ก ๆ ผ่าน Task tool ด้วย `subagent_type` ใหม่
2. เช็คว่า: status.json เปลี่ยนเป็น working→done / worklog.json มี entry ใหม่บนสุด /
   dashboard แสดงผล / git push อัตโนมัติสำเร็จ
3. ถ้าจุดไหนเงียบ → ไล่ตาม checklist 6 จุดว่าข้ามอะไรไป

## Agent ที่ Kittanate ระบุว่าอาจสร้างในอนาคต (ยังไม่อนุมัติ — อย่าสร้างเอง)

| Agent | ด้าน | โน้ตของ Architect |
|---|---|---|
| Social | Social media | ควรเกิดเมื่อเริ่มทำ marketing content จริงจัง — pipeline: Minnie→Rae→Social→Chris |
| Finance | บัญชี/การเงิน | ควรเกิดเมื่อมียอดขาย Etsy/Gumroad สม่ำเสมอ — ต้องคุยเรื่องข้อมูลอ่อนไหวก่อน |
| Service | ลูกค้าสัมพันธ์ | ควรเกิดเมื่อมี volume คำถามลูกค้า — ต้องมี FAQ/knowledge base จาก Libby ก่อน |
| Photo | ถ่ายภาพสินค้า | mockup/preview images สำหรับ listing — อาจรวมกับ Mind ได้ ยังไม่จำเป็นต้องแยก |
