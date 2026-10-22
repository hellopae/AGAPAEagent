# ใบงาน P1-merge: AVEGEE — รีวิวโค้ด + merge `toby/p1-early-game` ขึ้น main · เจ้าของ Dale

## บริบท
- ใบงาน: `Output/Claudy/briefs/2026-10-22-avegee-p1-early-game.md` · รายงาน Toby: `Output/Toby/2026-10-22-avegee-p1-early-game.md`
- branch `toby/p1-early-game` commit `b514690` (push แล้ว) rebase บน `a4d26b6` · Toby รายงาน 1,272/0
- เปลี่ยน: ตัดเตียง (`buyTeaBed`, `TEA_BED_COST`) → นอนได้เมื่อมีศาลา · ปลดล็อกอาคารตาม `g.level` (`src/unlocks.js` `BUILD_PLAN`) · ลำดับจ้าง · ตัดปุ่ม "งานบริหาร" บนโปรไฟล์ยามา · `nextNamedCase` กรองบาปหนักสุดที่ซ่อนด้วย
- คู่ขนาน: Toby P6 (กระทะ/มินิเกม), Toby P3 (คัตซีนหัวหน้า) — ไม่ merge ของพวกเขา

## ขั้นตอน
1. รีวิว: เซฟเก่า (อาคารที่สร้างแล้วใช้ได้แม้ level ต่ำ, `teaBeds` เก่าไม่พัง), `g.build` ปฏิเสธไม่หักเงิน, `nextNamedCase` ไม่ทำให้คิวว่างจนเกมตัน (ต้องมีคดีให้เล่นเสมอ), ไม่เปลี่ยนราคา/ค่าจ้าง, cache-bust (ui.js ลงท้าย `-o2`), ไม่มีโค้ดดีบัก
2. ผ่าน → merge (`P1:`) → เทสต์ 0 แดง → push (ห้าม force) → Pages → marker `p1` บนเว็บจริง + `src/unlocks.js` โหลด 200 · clone หลักจบบน main สะอาด
3. ข้อใหญ่ → FIX LIST ไม่ merge

## เกณฑ์รับงาน
PASS + merge commit + เทสต์ + Pages + marker — หรือ FIX LIST · รายงาน `Output/Dale/2026-10-22-avegee-p1-merge.md`
