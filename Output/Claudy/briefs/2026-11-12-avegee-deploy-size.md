# ใบงาน Dale — ลดขนาด GitHub Pages deploy ของ AVEGEE ให้ต่ำกว่า 1 GB · 12 พ.ย. 2569

## บริบท
- หลัง merge `89fb1a35` ไฟล์ที่ deploy = 1,108 MB · GitHub เตือน "artifact exceeds the allowed size of 1 GB. Deployment might fail" (รายงาน `Output/Dale/2026-11-12-avegee-merge-zone1-v5fx.md`)
- ไม่ใช่ไฟล์เกมแต่ถูก deploy: `output/` (173 MB), `art-src/` (29 MB) และอาจมี `docs/art-reviews/` ภาพเทียบ, เฟรมวาดเก่าที่ไม่มีโค้ดอ้าง
- เป้า: ≤ 850 MB (เผื่อโต) โดยเกมเล่นได้เหมือนเดิม

## ขั้นตอน
1. ดูวิธี deploy ปัจจุบัน (GitHub Actions workflow / Pages จาก branch) · ถ้าเป็น Actions: ทำ artifact เฉพาะไฟล์ที่เกมใช้ (index.html, src/, img/, audio/, ฟอนต์, manifest ฯลฯ) ไม่ต้องย้ายไฟล์ใน repo · ถ้าเป็น branch: เปลี่ยนเป็น Actions แบบ allowlist (skill `deploy-pages`)
2. หาไฟล์ใน img/ audio/ ที่ไม่มีโค้ดอ้าง (grep src/ index.html) → ไม่ใส่ใน artifact (ลบได้ถ้าแน่ใจว่าไม่ใช้ แยก commit พร้อมรายการ)
3. เทสต์ที่อ้าง `output/` หรือ `art-src/` ยังรันในเครื่อง/CI ได้ (ไม่ต้องย้ายไฟล์ถ้าใช้ allowlist)
4. deploy จริง → ขนาด artifact · เปิด https://hellopae.github.io/AVEGEE/ เล่นหน้าแรก → เมืองโซน 1 → สู้ 1 ครั้ง · console/HTTP 404 = 0 (ตรวจ network ว่าไม่มีไฟล์หาย)
5. อัปเดต 8942 ไม่ต้อง (เสิร์ฟจาก worktree ทั้งหมด)
## ข้อห้าม
ห้าม force-push · ห้ามลบไฟล์ที่เกมโหลด (ตรวจ 404) · ห้ามแตะ `Documents/Work PAE/Claude/AVEGEE`, LaunchAgent, `.codex-worktrees` · ทำงานใน `~/agapae-work/AVEGEE` (main) หรือ worktree ใหม่
## ส่งงาน
`Output/Dale/2026-11-12-avegee-deploy-size.md` (ไทย): วิธี deploy เดิม/ใหม่, ขนาดก่อน/หลัง, รายการที่ตัดออก, ผล 404, commit
## เกณฑ์รับงาน
1. artifact ≤ 850 MB ไม่มีคำเตือน 2. เกมบน URL จริงเล่นได้ 404 = 0 3. เทสต์ผ่าน
