---
name: fact-check-gate
description: ส่งผลงานใด ๆ ที่มี factual claims เข้า Reese Fact-check ตามกฎบังคับข้อ 6 ของ CLAUDE.md ใช้เมื่อมีผลงานจาก agent ไหนก็ตามที่ยังไม่ผ่าน fact-check หรือ Kittanate สั่ง "เช็คข้อเท็จจริง"
---

# Skill: fact-check-gate

กฎบังคับ: **ทุก output ที่มี factual claims ต้องผ่าน Reese [Fact-check] ก่อน Chris QA — ไม่มีข้อยกเว้น**

## กติกาจำนวนรอบ (`review-mode.json` — 17 ก.ย. 2569)
- `build` = **ตรวจได้รอบเดียว** · FIX LIST → เจ้าของงานแก้ 1 รอบ → **Claudy ตัดสินเอง ห้ามส่ง Reese ตรวจซ้ำ**
  (hook หยุดตั้งธง fact-check หลังครบ 1 รอบ — ถ้ายังวนส่งอีกคือเปลือง token เปล่า) · ต่อจากนี้ **ไม่ส่ง Chris**
- `ship` = ตรวจ + ตรวจซ้ำหลังแก้ได้ 1 รอบ แล้วส่งต่อ Chris (`qa-gate`)
- ถ้ารอบแก้ยังไม่ผ่าน: Claudy กำหนดทางออกให้เอง (เช่น กำหนดกลไก/ถ้อยคำตายตัวพร้อมรายการ "ห้าม") แล้วให้ตรวจยืนยันครั้งเดียวจบ

## ขั้นตอน

1. ระบุไฟล์เป้าหมายใน `Output/<Agent>/` ที่จะตรวจ
2. Delegate `reese-research` พร้อมสั่งชัดว่าเป็น **Fact-check mode** และแนบ path ไฟล์:
   - ทำ claim inventory ทุกข้อ
   - Verdict รายข้อ: ✅ VERIFIED (cite source) / ⚠️ UNVERIFIED / ❌ INCORRECT (บอกข้อมูลที่ถูก + source) / 💬 OPINION
   - Overall: ✅ PASS / ❌ FAIL
3. Output: `Output/Reese/YYYY-MM-DD-<slug>-factcheck.md`
4. ถ้า FAIL:
   - ส่ง FIX LIST (ข้อ ❌ INCORRECT / ⚠️ UNVERIFIED) กลับ agent เจ้าของงานให้แก้เป็น -v2 — ข้อเล็ก Claudy แก้เองได้
   - แก้เสร็จ → Reese ตรวจซ้ำเฉพาะ claim ที่แก้ (delta) ได้ 1 รอบ (SOP-01 STEP 4)
   - ยังไม่ผ่าน → หยุด Claudy ตัดสินหรือรายงาน Kittanate ไม่วน
5. ถ้า PASS → ไปต่อ `qa-gate` ได้

## ข้อยกเว้นเดียว
Pure design/layout ที่ไม่มี factual claims (เช่น spec ระยะขอบของ Vera) ข้าม gate นี้ได้ —
แต่ถ้ามีตัวเลขตลาด/วันสำคัญ/คำอ้างอิงปนอยู่แม้บรรทัดเดียว = ต้องเข้า gate
