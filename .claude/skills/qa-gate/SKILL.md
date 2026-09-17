---
name: qa-gate
description: ส่งผลงานเข้า Chris QA เป็น gate สุดท้ายก่อน ship ใช้เมื่อผลงานผ่าน fact-check แล้ว (หรือไม่มี factual claims) และพร้อมตรวจรอบสุดท้าย
---

# Skill: qa-gate

Gate สุดท้ายก่อนถึงมือ Kittanate/ลูกค้า — Chris ตรวจตาม `SOP/SOP-08-qa-standards.md`

## STEP 0 — เช็ค `review-mode.json` ก่อนเสมอ (17 ก.ย. 2569)
- `"mode": "build"` → **หยุด อย่า delegate Chris** (hook `scripts/hook-gate.mjs` จะ deny ทิ้งอยู่ดี = เสีย token ฟรี)
  ระหว่างสร้างงานคุณเป้สั่งให้ใช้ผู้ตรวจคนเดียว (Reese) รอบเดียว · Chris ตรวจรวดเดียวตอนจะขาย/เผยแพร่
  บอกคุณเป้ว่า "งานนี้พร้อมแล้ว รอตรวจตอน ship" แล้วจบ
- `"mode": "ship"` → ทำตามขั้นตอนด้านล่างตามปกติ
- คุณเป้เป็นคนสั่งสลับโหมด (เช่น "โหมดตรวจ ship" / "เตรียมขาย") — Claudy แก้ไฟล์ให้ ไม่สลับเอง

## Precondition (เช็คก่อน delegate)
- งานมี factual claims → ต้องมีรายงาน fact-check ✅ PASS แนบ ถ้าไม่มีให้รัน `fact-check-gate` ก่อน
- ไฟล์ผลงานอยู่ใน `Output/<Agent>/` เรียบร้อย

## ขั้นตอน

1. Delegate `chris-qa` แนบ: path ผลงาน + path รายงาน fact-check + ระบุหมวด checklist ที่ต้องใช้
   | ประเภทงาน | หมวดใน SOP-08 |
   |---|---|
   | บทความ/สคริปต์ | B (ไทย) + C (วัฒนธรรม) |
   | Printable template | B + C + D (print) + F (listing) |
   | Web feature | B + E (web) |
   | รายงาน research | B + ตรรกะ/overclaim |
2. Output: `Output/Chris/YYYY-MM-DD-qa-<slug>.md` ในรูปแบบ Verdict/Blockers/Warnings/Notes
3. ❌ FAIL → ส่ง FIX LIST กลับ agent เจ้าของงาน แก้ 1 รอบ → Chris ตรวจเฉพาะข้อที่แก้ · ผ่าน Reese ใหม่**เฉพาะเมื่อ verdict ติด `[factual]`** · ยังไม่ผ่าน → Claudy ตัดสิน/รายงาน Kittanate
4. ✅ PASS → ship ได้: รายงาน Kittanate + (ถ้าเป็น asset) ส่ง `libby-index` เก็บเข้า library

## กติกาตรวจ verdict ของ Chris เอง
- ทุก blocker ต้องระบุตำแหน่ง + สิ่งที่ผิด + ควรเป็นอะไร — verdict ลอย ๆ ให้ตีกลับ Chris ทำใหม่
- Chris ไม่แก้งานเอง — ตรวจอย่างเดียว งานแก้เป็นของ agent เจ้าของ
