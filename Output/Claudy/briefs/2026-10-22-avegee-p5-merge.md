# ใบงาน P5-merge: AVEGEE — รีวิวโค้ด + merge `toby/p5-map-exits` ขึ้น main (ต่อจาก P2) · เจ้าของ Dale

## บริบท
- ใบงาน: `Output/Claudy/briefs/2026-10-22-avegee-p5-map-exits.md` · รายงาน Toby: `Output/Toby/2026-10-22-avegee-p5-map-exits.md`
- branch `toby/p5-map-exits` commit `182b834` + `46fec0f` (push แล้ว) rebase บน `4a3fd91` · Toby รายงาน 1,252/0
- เปลี่ยน: ห้องสถานี 10 หลัง/ชายแดนบน-ล่าง/เส้นทาง → เดินถึงจุดออกแล้วออกเอง (ลบปุ่ม ← ของ O1, `src/exit-marker.js` ลูกศรพื้น), โพลิกอน `TOWN_CAULDRON_COURT` เปิดลานกระทะทองแดง, เงาอาคารฉายจากเส้นสัมผัสพื้นต่อคอลัมน์ (`town-shade.js`)
- **ทำหลัง P2 merge เสร็จเท่านั้น** — P2 กับ P5 ชนกันที่ `index.html` (suffix ui.js: P2 = `…-p2-o2`, P5 = `…-p5-o2`) → รวมเป็น suffix เดียวที่มีทั้ง p2 และ p5 และลงท้าย `-o2` (เทสต์ O2 บังคับ) · regex เทสต์ต้องรับได้

## ขั้นตอน
1. รีวิว diff: latch ทางออก (ไม่เด้งกลับ, ไม่ trigger ระหว่างมินิเกม/ศึก/หลับ/คัตซีน), เงา perf (คำนวณครั้งเดียวต่อสไปรท์ ไม่ใช่ทุกเฟรม), โพลิกอนกระทะไม่เปิดทางทะลุอาคาร, ไม่มีโค้ดดีบัก
2. merge เข้า main หลัง P2 (แก้ชน index.html/ui.js รวมของทั้งสองฝั่ง) → เทสต์ทั้งชุด 0 แดง → push (ห้าม force) → Pages → marker `p5` บนเว็บจริง + `src/exit-marker.js` โหลด 200
3. ข้อใหญ่ → FIX LIST ไม่ merge

## เกณฑ์รับงาน
PASS + merge commit + เทสต์ + Pages + marker — หรือ FIX LIST · รายงาน `Output/Dale/2026-10-22-avegee-p5-merge.md`
