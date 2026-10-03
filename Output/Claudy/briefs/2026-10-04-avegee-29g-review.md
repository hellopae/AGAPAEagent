# ใบงาน 29G-R (Dale): รีวิว + merge Codex 29G (ฉากห้องโซน 2 ใหม่ 8 ห้อง เต็มกรอบ)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ฐานของ Codex = `e1d2554` · **main ล่าสุดหลัง 29H merge** (เช็ค `git log -3`)
Codex run: `Output/Codex/runs/20261003T163827Z-84dbb3d4/` · worktree `../.codex-worktrees/20261003T163827Z-84dbb3d4` (worktree ปกติ ไม่มีรีโปซ้อน — ตรวจซ้ำ) · branch `codex/20261003T163827Z-84dbb3d4`
รายงาน Codex: `<worktree>/output/Toby/2026-10-03-avegee-29g.md` + `output/Toby/29g/` · ใบงานต้นทาง `Output/Claudy/briefs/2026-10-03-avegee-29g-art.md`
Codex รายงาน: ภาพ Asia 8 ห้อง + config `src/data.js` + `ROOM_EXITS` ใน `src/proximity.js` · เทสต์ 277/277 · **ยังไม่ตรวจในเบราว์เซอร์**

## ขั้นตอน
1. ตรวจ diff เทียบข้อห้าม (ไม่เปลี่ยนตรรกะ/ตัวเลข · ไม่แตะโซน 1/3/4 · ไม่รัน make-manifest · ไม่แตะ `img/raw/`)
2. commit บน branch แล้ว rebase บน main ล่าสุด (29H แตะ `src/data.js` ด้วย — แก้ conflict ให้คงทั้งสองงาน) · รันเทสต์ทั้งหมด + `node --check src/*.js` + `git diff --check`
3. **เปิดดูภาพทั้ง 8 ใบด้วยตา** (ก่อน/หลัง): ธีมบูรพา สไตล์พิกเซลเข้ากับเกม ไม่มีตัวหนังสือ/ลายน้ำ/ตัวละคร
4. ตรวจในเบราว์เซอร์จริง **จอคอม 1280×800 และ 1440×900** (มือถือไว้ทีหลัง): ห้องโซน 2 ทั้ง 8 ห้อง → เต็มกรอบไม่มีแถบดำ · จุดเกิด จุดนั่ง/ลงมือ ปุ่ม "ออกไปแผนที่" ตรงบันได/ประตูในภาพ กดแล้วปิด · ช่างซ่อมเดินถึงไซต์ (ถ้ามีห้องที่เกี่ยว)
5. ผ่าน → merge + bump manifest cache + push + ยืนยัน Pages ไม่หน้าขาว · จุดเล็ก (พิกัดเพี้ยน) แก้เอง · ภาพใบไหนไม่ผ่านชัดเจน → FIX LIST ระบุชื่อไฟล์
6. **หลักฐาน:** ย้าย `output/Toby/29g/` + รายงาน Codex ไปไว้ `AGAPAE Agent/Output/Toby/29g/` **ไม่ commit เข้า AVEGEE**
7. ลบ worktree + branch ของ run นี้หลัง merge

## ข้อห้าม
- ไม่แตะ worktree เก่า `120313Z`/`120317Z` · `Exam/`, `files/`, untracked อื่นใน `output/`

## เกณฑ์รับงาน
1. ห้องโซน 2 ทั้ง 8 เต็มกรอบ 2 ขนาดจอ (ภาพ)
2. จุดเกิด/จุดนั่ง/ปุ่มออกถูกที่ (ภาพ)
3. เทสต์ผ่าน · live ไม่หน้าขาว

## รายงาน
`Output/Dale/2026-10-04-avegee-29g-review.md` + ภาพ `Output/Dale/29g-shots/` · ตอบ **PASS** หรือ **FIX LIST** + commit บน main + roll back + ภาพที่คุณเป้ควรดูเอง
