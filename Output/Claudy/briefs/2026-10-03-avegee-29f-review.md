# ใบงาน 29F-R (Dale): รีวิว + merge Codex 29F (ภาพห้องโซน 3–4 + คัตซีนยมทูตโซน 2–4)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · main = `0f87f71` (29E merge แล้ว) · Codex ฐาน `d3b0974`
Codex run: `Output/Codex/runs/20261003T143050Z-feb2dab7/` — status `failed` เพราะ **TimeoutExpired ตอนท้าย** แต่งานครบตามรายงาน
Worktree: `../.codex-worktrees/20261003T143050Z-feb2dab7` (ไฟล์ staged ไว้ ยังไม่ commit) · branch `codex/20261003T143050Z-feb2dab7`
รายงาน Codex: `<worktree>/output/Toby/2026-10-03-avegee-29f.md` + `output/Toby/29f/` (ภาพก่อน/หลัง, prompt) · ใบงานต้นทาง `Output/Claudy/briefs/2026-10-03-avegee-29f-resume.md`
Codex รายงาน: ห้อง 7 ใบ (webp) + คัตซีน 18 ใบ (PNG 512² → JPEG 1375×768) · manifest แก้มือ · `src/zone-introductions.js` เปลี่ยน path · เทสต์ 273/273 · **เปิด Chromium ไม่ได้ (sandbox) → ยังไม่ตรวจในเบราว์เซอร์**

## ขั้นตอน
1. ตรวจ diff (`git -C <wt> diff --cached --stat` + เนื้อ) เทียบขอบเขต/ข้อห้าม: ไม่แตะตรรกะ, `img/raw/`, `Exam/`, `files/`, `CONCEPT.md` · ไม่ได้รัน make-manifest
2. commit บน branch แล้ว rebase/merge บน main `0f87f71` (29E แตะ index.html/ui.js/i18n — คาดว่าไม่ชน) · รันเทสต์ทั้งหมด + `node --check src/*.js` + `git diff --check`
3. **เปิดดูภาพทุกใบด้วยตา** (ภาพก่อน/หลังใน `output/Toby/29f/`): สไตล์พิกเซลเข้ากับเกม ไม่มีตัวหนังสือ/ลายน้ำ/UI ปลอม ตัวละครคัตซีนตรงตัวเดิม ไม่ตกขอบ
4. ตรวจในเบราว์เซอร์จริง (1280×800 และ 390×844 สัมผัส):
   - ห้อง 7 ห้องในโซน 3–4 (ศาลา/ตะราง/กระจก/สวรรค์): โหลดภาพใหม่ ไม่ใช่ภาพโซน 1 · ขนาด/สัดส่วนตรงกับฉากโซน 1 ชื่อเดียวกัน · จุดเกิด จุดนั่ง ปุ่มออกตรงบันได/ประตูในภาพใหม่ (ถ้าไม่ตรง ปรับพิกัดใน config ให้เฉพาะโซนได้)
   - คัตซีนยมทูตโซน 2, 3, 4 (อย่างน้อย 2 ตัวต่อโซน): เต็มกรอบ 16:9 พื้นทึบ ไม่ตกขอบ · ขนาด 1375×768 เทียบคัตซีนโซน 1 จริงว่าสัดส่วนเดียวกัน
5. ผ่าน → merge เข้า main + bump manifest cache + push + ยืนยัน Pages ไม่หน้าขาว · จุดเล็กแก้เอง · ภาพใบไหนไม่ผ่านชัดเจน → ระบุชื่อไฟล์ใน FIX LIST (merge ส่วนที่ผ่านได้ ถ้าแยกได้สะอาด)
6. หลักฐานใน `output/Toby/29f/` ถ้าหนักเกิน ~3 MB ลดเหลือเฉพาะภาพเปรียบเทียบ · ลบ worktree/branch ของ run นี้หลัง merge

## ข้อห้าม
- ห้ามรัน `make-manifest.py` · ไม่แตะ `img/raw/`, `Exam/`, `files/`, untracked อื่นใน `output/`
- ไม่แตะ worktree เก่า `.codex-worktrees/20261003T120313Z-*` และ `20261003T120317Z-*` (คุณเป้ลบเอง)

## เกณฑ์รับงาน
1. ห้อง 7 ห้องโหลดภาพใหม่ สัดส่วน/จุดออกถูก (ภาพหน้าจอ)
2. คัตซีนโซน 2–4 เต็ม 16:9 ทึบ ไม่ตกขอบ (ภาพหน้าจอ)
3. เทสต์ผ่าน · live เปิดได้ไม่หน้าขาว

## รายงาน
`Output/Dale/2026-10-03-avegee-29f-review.md` — ผลแต่ละเกณฑ์ + commit บน main + roll back + ภาพที่คุณเป้ควรดูเอง · ตอบ **PASS** หรือ **FIX LIST**
