# ใบงาน 29E-R (Dale): รีวิว + merge Codex 29E

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · main = `d3b0974`
Codex run: `Output/Codex/runs/20261003T143050Z-d9aa9b96/` (diff.patch, report.md) · branch `codex/20261003T143050Z-d9aa9b96` · worktree `../.codex-worktrees/20261003T143050Z-d9aa9b96`
ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-03-avegee-29e-resume.md` · Codex รายงานเทสต์ 272/272 แต่ **ยังไม่ได้ตรวจในเบราว์เซอร์**

## ขั้นตอน
1. อ่าน diff ทุกบรรทัด เทียบขอบเขต/ข้อห้ามของใบงานต้นทาง
2. รันเทสต์ทั้งหมด + `node --check src/*.js` + `git diff --check`
3. ตรวจในเบราว์เซอร์จริง (1280×800 และ 390×844 สัมผัส):
   - เข้าโซน 2 ใหม่ (ยังไม่มีสถานีลงทัณฑ์) → ห้องสอบสวน → ข้อความแนะนำขึ้น อ่านรู้เรื่อง ทำตามแล้วไปต่อได้จริง (TH+EN)
   - หน้าต่างเตือน event (เช่น `frontierBreach`) → ปุ่มปิดเหลืออันเดียว ไม่มี pause/✕ ซ้อน ปิดได้ เริ่มได้
4. ผ่าน → commit บน branch แล้ว merge เข้า main + push + ยืนยัน Pages (bump cache ถ้าจำเป็น) · ไม่ผ่านจุดเล็ก → แก้เองได้ · จุดใหญ่ → FIX LIST
5. ลบ worktree/branch ของ run นี้หลัง merge

## ข้อห้าม
- ไม่แตะ worktree/branch ของ 29F (`codex/20261003T143050Z-feb2dab7`) ที่ Codex กำลังวาดอยู่
- ไม่แตะ `img/raw/`, `Exam/`, `files/`, untracked ใน `output/` ที่ไม่ใช่ของงานนี้ · ห้ามรัน `make-manifest.py`

## เกณฑ์รับงาน
1. ข้อความแนะนำขึ้นจริงในเบราว์เซอร์ (ภาพ 2 ขนาด)
2. หน้าต่างเตือน event ปุ่มปิดเดียว ปิด/เริ่มได้ (ภาพ)
3. เทสต์ผ่านทั้งหมด · live เปิดได้ไม่หน้าขาวหลัง push

## รายงาน
`Output/Dale/2026-10-03-avegee-29e-review.md` — ผลแต่ละเกณฑ์ + commit บน main + roll back · ตอบ **PASS** หรือ **FIX LIST**
