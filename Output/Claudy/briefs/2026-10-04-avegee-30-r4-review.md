# ใบงาน 30-R4 (Dale): รีวิว + merge 30B (ฉากต่อสู้) ของ Toby — **ทำหลัง 30-R3 (30A) merge แล้วเท่านั้น**

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · ห้ามลองเข้า `Claude/AVEGEE` เดิม
- branch `toby/30b` · worktree `~/agapae-work/.codex-worktrees/toby-30b` · commit ล่าสุด `f434f77` (9 commit, ฐาน `8db411b`)
- ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-04-avegee-30b-battle.md` + `30b-toby.md`
- รายงาน Toby: `Output/Toby/2026-10-04-avegee-30b.md` · หลักฐาน + สคริปต์ Playwright `Output/Toby/30b/`

## งานเพิ่มในใบนี้ (Dale ทำเอง)
- **ภาพโปรไฟล์หัวหน้าโซน 3 (ข้อ 7)**: คุณเป้ส่งต้นฉบับมาแล้ว `Output/Claudy/briefs/assets/30/_hero-boss-west-profile.jpeg` (1024×1024) → ผ่าน `prep()` ใน `scripts/prep-art.py` (ห้ามรัน main ที่เรียก make-manifest) เป็น `img/West/hero-boss-west-profile.webp` 512×512 · ลง manifest ด้วยมือ · bump cache · ยืนยันในเบราว์เซอร์ว่าศึกพ่อโซน 3 มุมขวาล่างใช้ภาพนี้ (Toby ต่อโค้ดไว้แล้ว)

## ขั้นตอน
1. ตรวจ diff เทียบข้อห้าม 30B · rebase บน main ล่าสุด (มี 30C + 30A แล้ว — ระวัง conflict ใน `src/ui.js` และการกลับด้านคัตซีนของ 30A: `crew-guard-west-cutscene` / `crew-plerng-cyberhell-cutscene` ต้องหันขวาหลังรวม และคัตซีน crew-cut ต้องไม่มีแถบดำ) · เทสต์ทั้งหมด + `node --check` + `git diff --check`
2. เบราว์เซอร์จริง 1280×800 + 1440×900 ตามเกณฑ์รับงาน 30B ข้อ 1–4: หน้าต่างเตรียมศึก (บอสโซน 2, 3, พัก wave โซน 4) กดได้ทั้ง 3 ช่อง · ทีมหันขวาทุกโซน · Rage ขึ้นที่ยมบาท ดาเมจเทิร์นถัดไปเพิ่ม · HP/MP จำนวนเต็มมีแถบ (ลองนั่งพักศาลาน้ำชาแล้วเข้าศึก) · ปุ่ม "รับรางวัล" กลาง · "ฟังคำตัดสิน" · boon เรืองแสง · pause ของ 30C ยังทำงานในศึก
3. ผ่าน → merge + bump cache + push + live ไม่หน้าขาว · ไม่ผ่าน → FIX LIST ตามเกณฑ์ 30B
4. ลบ worktree + branch local `toby/30b` หลัง merge · ห้ามแตะ `toby-30d` (Toby ทำอยู่) และ worktree ของ Codex 30F

## รายงาน
`Output/Dale/2026-10-04-avegee-30-r4-review.md` + ภาพ `Output/Dale/30b-shots/` · PASS/FIX LIST + commit + roll back + ภาพที่คุณเป้ควรดู
