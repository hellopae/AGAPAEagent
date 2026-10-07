# ใบงาน E1 (Codex): AVEGEE — กลับด้านอาคารบนแผนที่ 4 โซน + ย้าย/ขยายหอส่องกรรมโซน 4

**อ่านก่อน:** `Output/Claudy/briefs/2026-10-08-avegee-ev-storyboard.md` หัวข้อ A + "กติการ่วม"
(path เต็ม `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/...`)
ภาพอ้างอิง: `files/UI map/Map-Zone1-1.jpg`, `Map-Zone2-0.jpg`, `Map-Zone3-0.jpg`, `Map-Zone4-0.jpg` (path เต็มในเอกสารกลาง)

## ขอบเขต
1. กลับด้านซ้าย↔ขวาตอนวาด (ไม่แก้ไฟล์ภาพ) ตามตาราง A ทั้ง 8 จุด: th `krata` · asia `lokan`, `tea`, `krata` · west `tarang`, `krata`, `tea` · cyberhell `krata`
   - ผลที่ต้องได้ = **ทิศที่แสดงจริงตรงข้ามกับสกรีนช็อตปัจจุบัน** ระวัง flip ซ้อนที่มีอยู่แล้ว (`reviewStationBox` ใน `src/map-art-v5.js` flip west tarang, `tea` asia flip:true ใน `src/data.js` ~1915, ข้อ 30D ~1918) → รวมเป็นตาราง flip ต่อโซนที่เดียว อ่านง่าย
   - ตรวจว่า station key ในตาราง A ตรงกับอาคารที่วงจริง (เทียบ bx/by) ถ้าไม่ตรงให้ยึดตำแหน่งในภาพ และเขียนในรายงาน
   - กรอบคลิก/จุดยืนบริการ (hit, x,y) ต้องยังตรงกับตัวอาคารหลังกลับด้าน
2. cyberhell `krajok` (หอส่องกรรม): ขยับไปทางขวาและขยายใหญ่ขึ้น (~1.3×) ให้ไม่ทับ NPC/ทางเดิน/ท่าเรือ · ปรับ hit/จุดยืน/ทางเดินโซนนั้นให้ตาม · เฉพาะโซน 4
3. ทำภาพ preview หลังแก้ของแผนที่ทั้ง 4 โซน (render จริงด้วย Playwright/browser ถ้ามี) ใส่ `output/Codex/e1-preview/`

## เกณฑ์รับงาน
1. 8 อาคารหันตรงข้ามกับสกรีนช็อตเดิม · อาคารอื่นทิศเดิม · krajok โซน 4 ใหญ่ขึ้นและอยู่ขวากว่าเดิม คลิก/เดินไปใช้งานได้
2. เทสต์ใหม่ `tests/e1-building-flip.test.mjs` ยืนยันตาราง flip ต่อโซน + ตำแหน่ง krajok โซน 4 · เทสต์เดิมผ่านหมด
3. preview 4 ภาพ + รายงาน `output/Codex/2026-10-08-avegee-e1.md`
