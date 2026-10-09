# ใบงาน (Dale): AVEGEE — รวมภาพอาวุธ G3c-A + รีวิว/เล่นจริง/รวม G5 ห้องกระทะทองแดง

ฐาน main ปัจจุบัน `9c82f83` (G1+G3b+G2) · ทั้งสอง run แตกจาก `f7c56ff` · `git fetch` + `git pull --ff-only` ก่อน

## 1. G3c-A — คัตซีน 4 + ไอคอน 4 (Codex run `20261009T164438Z-1503faca`)
worktree `/Users/agapae/agapae-work/.codex-worktrees/20261009T164438Z-1503faca` (staged ยังไม่ commit) · รายงาน `output/Codex/g3c/REPORT.md` ใน worktree
**Claudy ตรวจภาพด้วยตาแล้ว PASS** รวมคัตซีนโซน 1 (fang) ตามข้อห้าม §9 — เอาเข้าเกมได้
- เอาเข้า main: `img/weapons/weapon-cutscene-{fang,chain,cane,trojan}.jpeg`, `img/weapons/weapon-icon-{...}.png` + รายการใน `img/manifest.json` / `img/preload-catalog.json` (ใส่เฉพาะรายการใหม่บนไฟล์ล่าสุด ห้ามก๊อปทับ) · ไม่เอา `output/Codex/g3c/`
- ตรวจใน Chrome: ไอคอนอาวุธขึ้นในกระเป๋า/การ์ดสวมอาวุธ · คัตซีนรับอาวุธแสดงภาพจริงแทน placeholder (ใช้ save/สถานะทดสอบให้ชนะ wave 10 ได้)

## 2. G5 — ห้องกระทะทองแดง พื้นที่เดิน + เร่งไฟ + ฝึกควบคุมไฟ (Codex run `20261009T165605Z-9e9b3e20`)
worktree `/Users/agapae/agapae-work/.codex-worktrees/20261009T165605Z-9e9b3e20` (staged ยังไม่ commit) · ใบงาน `Output/Claudy/briefs/2026-10-09-avegee-g5-krata-minigames.md` · รายงาน `output/Codex/g5/report.md` ใน worktree
ภาพอ้างอิงจากคุณเป้: `Output/Claudy/refs/2026-10-09-krata-minigame/`
- รีวิว diff ตามเกณฑ์รับงาน 1–6 ของใบงาน G5 (บั๊ก, เซฟเก่า, ไม่แตะสมดุลอื่น, TH+EN)
- **Codex ไม่ได้เล่นใน Chrome — คุณต้องเล่นจริง** ที่ 844×390 และ 390×844:
  - เดินในห้อง: ขอบพื้นที่ตรงภาพ `Inside-Zone1-krata-w.jpg` ไม่ทะลุแท่นกระทะ/ราว/เตา
  - เร่งไฟ: กดได้เมื่อมีวิญญาณในกระทะ · แถบจังหวะ · ถูกแล้วเวลาลด 20% · พัก 20 วิ
  - ฝึกควบคุมไฟ: เลือกยมบาท/ยมทูตเพลิง · ภาพ close-up · วงขาวหดเข้าวงเขียว · 5/5 ได้ระดับ · พลาด 3 จบ
  - ปุ่ม "เร่งไฟ" / "ฝึกควบคุมไฟ" ไม่บังกันและไม่บังปุ่มอื่น · console ไม่มี error ใหม่
  - ถ่ายภาพหน้าจอเป็นหลักฐานไว้ `Output/Dale/g5-evidence/` (ลบได้หลัง merge)
- ข้อเล็ก (ตำแหน่งปุ่ม/ขอบพื้นที่เพี้ยนเล็กน้อย) แก้เองได้ · ข้อใหญ่ → FIX LIST ไม่ต้อง merge G5

## ทั่วไป
- ลำดับ: G3c-A ก่อน แล้ว G5 · cache-bust ต่อท้าย (`?v=`, `CATALOG_VERSION`) ไม่แทนที่ · `node --check src/*.js` + `node --test tests/*.test.mjs` ผ่าน · push → ตรวจ Pages
- ห้ามรัน `scripts/make-manifest.py` · ไม่ force push · ไม่ลบ worktree ใดๆ · ไม่แตะ `.toby-worktrees/g4` และ Codex run G3c-B ที่กำลังรัน

## ส่งผล
`Output/Dale/2026-10-10-avegee-merge-g3ca-g5.md`: PASS/FIX LIST แยกสองงาน · commit hash · ผลเทสต์ · ผลเล่นจริง · ผลตรวจ Pages
