---
name: new-article
description: รัน content pipeline เต็มรูปแบบเพื่อผลิตบทความ/สคริปต์ 1 ชิ้น ตั้งแต่ไอเดียจนผ่าน QA — Minnie → Reese Research → Rae → Reese Fact-check → Chris QA ใช้เมื่อ Kittanate สั่ง "เขียนบทความเรื่อง X" หรือ "ทำสคริปต์เรื่อง X"
---

# Skill: new-article

ทำตาม `SOP/SOP-02-content-article.md` ทีละขั้น ห้ามข้าม gate

## Input ที่ต้องมีก่อนเริ่ม
- หัวข้อ/ธีมจาก Kittanate (ถ้าคลุมเครือ ให้ Minnie ตีความเป็น 5 มุมใน idea cards — ไม่ต้องถามกลับ)
- วันนี้วันที่เท่าไหร่ (ใช้ตั้งชื่อไฟล์ YYYY-MM-DD)

## ลำดับ delegate (ผ่าน Task tool เท่านั้น — hook จะบันทึก dashboard ให้)

1. `minnie-ideas` → 5 idea cards → `Output/Minnie/YYYY-MM-DD-<topic>-concepts.md`
2. Claudy เลือก 1 card + บันทึกเหตุผล (หรือเสนอให้ Kittanate เลือกถ้าเขา online)
3. `reese-research` → research brief ตอบทุก research question ของ card → `Output/Reese/...-research-brief.md`
4. `rae-writer` → draft v1 โดยแนบ path ของ card + brief; ย้ำกติกา: ห้ามเพิ่ม claim นอก brief
   → `Output/Rae/...-article.md`
5. `reese-research` [Fact-check mode] → claim inventory + verdict → `Output/Reese/...-factcheck.md`
   - FAIL → ส่ง verdict เต็มให้ `rae-writer` ทำ v2 → fact-check ใหม่ (เพดาน 3 รอบแล้ว escalate)
6. `chris-qa` → ตรวจตาม SOP-08 หมวด B, C → `Output/Chris/YYYY-MM-DD-qa-<topic>.md`
   - FAIL → กลับข้อ 4 แล้วเข้า gate ใหม่ตั้งแต่ fact-check
7. ปิดงาน: เช็ค `git status` สะอาด → รายงาน Kittanate (path ฉบับสมบูรณ์ + verdict ทุก gate)

## เกณฑ์สำเร็จ
บทความผ่านทั้ง Fact-check และ QA เป็น ✅ PASS, ไฟล์ครบทุกขั้นใน Output/, dashboard อัปเดต
