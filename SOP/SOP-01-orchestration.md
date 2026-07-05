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
