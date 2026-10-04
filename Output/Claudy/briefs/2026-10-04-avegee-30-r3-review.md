# ใบงาน 30-R3 (Dale): รีวิว + merge 30A (cutscene / intro บอส) ที่ Toby ทำต่อจาก Codex

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · main = `fcde11d` (หลัง 30C) · ห้ามลองเข้า `Claude/AVEGEE` เดิม
- branch `codex/20261004T102000Z-9871f6fb` · worktree `~/agapae-work/.codex-worktrees/20261004T102000Z-9871f6fb` · commit ของ Toby `a730e34` · ฐาน `b199a98`
- ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-04-avegee-30a-cutscene.md` (+ `30a-resume.md`)
- รายงาน Toby: `Output/Toby/2026-10-04-avegee-30a.md` · หลักฐาน `Output/Toby/30a/` (สคริปต์ Playwright ของ Toby อยู่ในนั้น ใช้ซ้ำได้)
- แบบรีวิวที่ผ่านมา: `Output/Dale/2026-10-04-avegee-30-r2-review.md`

## Claudy ตัดสินไว้แล้ว (ไม่ต้องถาม)
- intro บอสโซน 2 ใช้ภาพฉาก `Intro-Boss-Zone2-asia.png` เสมอ (Toby เปลี่ยนจาก closeup) → **รับ**
- คัตซีนยมทูต (`crew-cut`) แถบดำ → อยู่ใน 30B ไม่ใช่ใบนี้

## ขั้นตอน
1. ตรวจ diff เทียบข้อห้าม 30A · rebase บน `fcde11d` (30C แก้ `src/ui.js` ด้วย — แก้ conflict ให้คงทั้งสองงาน โดยเฉพาะส่วน pause/dialog ของ 30C) · เทสต์ทั้งหมด + `node --check` + `git diff --check`
2. เบราว์เซอร์จริง 1280×800 และ 1440×900 ตามเกณฑ์รับงาน 30A ข้อ 1–4: caption ไม่ซ้อนภาพ (วัด rect), ไม่มีแถบดำ, popup ฉากจบภาพย่อเต็มกรอบ, intro บอสโซน 3 และ 4 ใช้ภาพฉาก, cutscene `crew-guard-west-cutscene` และ `crew-plerng-cyberhell-cutscene` หันขวา
   - **ลองเส้นทางจริงอย่างน้อย 1 ครั้ง** ไปถึง intro บอสโซน 3 หรือ 4 (Toby ยังไม่ได้ทำ — ใช้เซฟจำลองได้)
   - ตรวจซ้ำว่า pause ของ 30C ยังทำงานระหว่าง cutscene หลัง rebase
3. ผ่าน → merge + bump cache ถ้าแตะ asset/CSS + push + live ไม่หน้าขาว · ข้อไหนไม่ผ่าน → FIX LIST ตามเกณฑ์ 30A
4. ลบ worktree + branch local ของ run นี้หลัง merge · ห้ามแตะ `toby-30b` และ worktree 30F `20261004T102020Z-b10d4d39`

## รายงาน
`Output/Dale/2026-10-04-avegee-30-r3-review.md` + ภาพ `Output/Dale/30a-shots/` · PASS/FIX LIST + commit + roll back + ภาพที่คุณเป้ควรดู
