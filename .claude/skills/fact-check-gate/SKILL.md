---
name: fact-check-gate
description: ส่งผลงานใด ๆ ที่มี factual claims เข้า Reese Fact-check ตามกฎบังคับข้อ 6 ของ CLAUDE.md ใช้เมื่อมีผลงานจาก agent ไหนก็ตามที่ยังไม่ผ่าน fact-check หรือ Kittanate สั่ง "เช็คข้อเท็จจริง"
---

# Skill: fact-check-gate

กฎบังคับ: **ทุก output ที่มี factual claims ต้องผ่าน Reese [Fact-check] ก่อน Chris QA — ไม่มีข้อยกเว้น**

## ขั้นตอน

1. ระบุไฟล์เป้าหมายใน `Output/<Agent>/` ที่จะตรวจ
2. Delegate `reese-research` พร้อมสั่งชัดว่าเป็น **Fact-check mode** และแนบ path ไฟล์:
   - ทำ claim inventory ทุกข้อ
   - Verdict รายข้อ: ✅ VERIFIED (cite source) / ⚠️ UNVERIFIED / ❌ INCORRECT (บอกข้อมูลที่ถูก + source) / 💬 OPINION
   - Overall: ✅ PASS / ❌ FAIL
3. Output: `Output/Reese/YYYY-MM-DD-<slug>-factcheck.md`
4. ถ้า FAIL:
   - ส่ง verdict **ทั้งฉบับ** กลับ agent เจ้าของงานให้แก้เป็น -v2
   - แก้เสร็จ → fact-check ใหม่ทั้งรอบ (ไม่ตรวจเฉพาะจุดแก้)
   - เกิน 3 รอบ → หยุด escalate Kittanate
5. ถ้า PASS → ไปต่อ `qa-gate` ได้

## ข้อยกเว้นเดียว
Pure design/layout ที่ไม่มี factual claims (เช่น spec ระยะขอบของ Vera) ข้าม gate นี้ได้ —
แต่ถ้ามีตัวเลขตลาด/วันสำคัญ/คำอ้างอิงปนอยู่แม้บรรทัดเดียว = ต้องเข้า gate
