# ใบงาน (Dale): AVEGEE — เล่นจริง + รวม H5b (เอฟเฟกต์บนปก) และสไปรท์ดาบไม้เท้าราตรี (cane)

`git fetch` + main ล่าสุด (≥ `8175171`) · Dale อีกคนทำ H3/H4 ขนาน — fetch ก่อน push ทุกครั้ง ไม่ force

## 1. H5b — Codex run `20261010T015024Z-ed5e4ef4` (worktree root, ยังไม่ commit)
ใบงาน `Output/Claudy/briefs/2026-10-10-avegee-h5b-cover-fx.md` (มีหัวข้อ "จุดต่อจาก H5a" ท้ายไฟล์) · รายงาน `output/Codex/h5b/REPORT.md`
- Codex ไม่ได้เล่นใน Chrome — เล่นจริงที่ 1300×720 และ 390×844 ทั้ง localhost และ Pages หลัง push:
  - เอฟเฟกต์เริ่มหลังวิดีโอปกจบ (`avegee:cover-settled`) fade-in นุ่ม · ลาวาไหล ไฟสั่น ประกายลอย ภูเขาไฟเรือง วิญญาณเรือง — **ละมุน** ภาพยังเหมือนปกเดิม
  - ไม่ทับตัวละคร โลโก้ ปุ่ม · มือถือแนวตั้งครอปแล้ว mask ยังตรง · reduced-motion ปิด · ออกจากหน้าปกแล้วหยุด (ไม่กิน CPU)
  - fps ด้วย Performance + CPU throttle 4× ที่ 390×844: ≥ 50fps (ถ้าต่ำกว่า ลดความหนาแน่นเอง)
- Codex แก้ `scripts/prep-art.py` และเพิ่ม `scripts/h5b-*.{py,mjs}` → **ไม่เอา prep-art.py** ถ้าเป็น hack เฉพาะ run · สคริปต์ h5b เอาได้ถ้าจำเป็นต่อการสร้าง mask ใหม่ ไม่งั้นไม่เอา · ไม่เอา `output/Codex/`
## 2. ดาบไม้เท้าราตรี (cane) — Codex run `20261010T012244Z-c51db612` (ฉบับแก้แล้ว Claudy ตรวจภาพ PASS)
- เอาเฉพาะ `img/yama-sword-weapons/hero-yama-{th,asia,west,cyberhell}-sword-cane.webp` + รายการ manifest/preload ชั้นเบื้องหลัง
- เล่นจริง: สวมดาบไม้เท้า ฟาดปกติทั้ง 4 ชุด เห็นอาวุธใหม่ หันขวาทุกเฟรม
## ทั่วไป
cache-bust ต่อท้าย · `node --check src/*.js` + `node --test tests/*.test.mjs` ผ่าน · push → ตรวจ Pages · ห้ามรัน make-manifest · ไม่ลบ worktree
ส่งผล: `Output/Dale/2026-10-10-avegee-merge-h5b-cane.md` PASS/FIX LIST แยกงาน · commit · fps · ภาพหลักฐาน `Output/Dale/h5b-evidence/`
