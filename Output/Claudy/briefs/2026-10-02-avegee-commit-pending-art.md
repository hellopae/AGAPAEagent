# ใบงาน: AVEGEE — commit ภาพที่แก้ค้าง 14 ไฟล์ + img/manifest.json

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · main (`071bdc0`) · เทสต์ `node --test tests/*.test.mjs`
ที่มา: คุณเป้ 2 ต.ค. 2569 — "commit 1 และ 2" (กลุ่ม 1 = ภาพ tracked ที่แก้ค้าง, กลุ่ม 2 = manifest)

## ขอบเขต
1. commit ภาพ tracked ที่ modified ทั้ง 14 ไฟล์ตาม `git diff --name-only` (ยกเว้น manifest) — คุณเป้ยืนยันว่าเป็นภาพใหม่ตั้งใจเปลี่ยน
   `img/Asia/st-dab-asia.png`, `img/CyberHell/Boss Zone4-cyberhell.png`, `img/CyberHell/st-dab-cyberhell.png`,
   `img/CyberHell/zone-boss-cyberhell.png`, `img/West/st-dab-west.png`, `img/crew-guard-cutscene.jpeg`,
   `img/crew-guard-profile.png`, `img/crew-guard.png`, `img/fx-heal.png`, `img/fx-slash.png`, `img/item-tea.png`,
   `img/merchant.png`, `img/scene-west.png`, `img/st-dab.png`
2. commit `img/manifest.json` — **⚠️ กับดัก:** ฉบับใน working tree ลิสต์ภาพ untracked ~99 ไฟล์ที่จะไม่ขึ้นเว็บ
   ก่อน commit ต้องดูว่าโค้ดใช้ manifest อย่างไร (preload?) ถ้ารายการที่ไม่มีไฟล์ใน git จะทำให้เกิด 404 บนเว็บจริง
   → ให้ commit เฉพาะรายการที่ไฟล์ถูก track ใน git (กรองออก หรือ regenerate ด้วยสคริปต์เดิมแบบ tracked-only)
   ทุกรายการใน manifest ที่ commit ต้องมีไฟล์อยู่ใน git จริง (รวม `icon-lock.png`, `icon-skip.png`)
3. push main แล้วเช็ค HTTP ภาพ 14 ไฟล์บน live ว่าได้ 200 และเป็นเวอร์ชันใหม่ (ขนาดไฟล์ตรงกับในเครื่อง)

## ข้อห้าม
- ห้าม add ไฟล์ untracked ใดๆ (ภาพ 99 ไฟล์, `Exam/`, `files/`, `output/`, `img/raw/`) · ห้าม `git add -A` / `git add .`
- ไม่แก้โค้ดเกม ไม่ปรับขนาดภาพ

## เกณฑ์รับงาน
1. commit มีเฉพาะ 14 ภาพ + manifest (`git show --stat`)
2. ทุกรายการใน manifest ที่ commit มีไฟล์ใน git (สคริปต์ตรวจ = 0 รายการหาย)
3. เทสต์ผ่านทั้งหมด · manifest parse ได้
4. live ภาพ 14 ไฟล์ตอบ 200 ขนาดตรง
5. `git status` เหลือเฉพาะ untracked ของเดิม (ไม่มี M ค้าง)

## รายงาน
`Output/Dale/2026-10-02-avegee-commit-pending-art.md` — commit hash, ตารางเกณฑ์, จำนวนรายการ manifest ที่กรองออก (ถ้ามี)
