# ใบงาน (Dale): รีวิว + รวม F1, F2, S เข้า main ของ AVEGEE + S1 cache-bust แล้ว push

Repo: `/Users/agapae/agapae-work/AVEGEE` · main = 18f1b5b (ตรงกับ origin, สะอาด ณ 14:38)

## branch ที่จะรวม (ตามลำดับ)
| branch | งาน | รายงาน |
|---|---|---|
| `dale/s-fixes` (02c636c) | S2–S6 | `AGAPAE Agent/Output/Dale/2026-10-09-avegee-s-fixes.md` |
| `toby/f1` (a7e5d53) | เดินกระตุก: `src/walk-motion.js` ใหม่, room.js, frontier.js | `AGAPAE Agent/Output/Toby/2026-10-09-avegee-f1.md` |
| `toby/f2` (f3ad7db) | UI 8 ข้อ | `AGAPAE Agent/Output/Toby/2026-10-09-avegee-f2.md` |
ใบงานต้นทาง: `AGAPAE Agent/Output/Claudy/briefs/2026-10-09-avegee-{s-fixes,f1-walk-stutter,f2-ui-batch}.md`

## ขั้นตอน
1. ก่อนเริ่ม: `git fetch` — ถ้า origin/main ขยับ (แอป Codex ของคุณเป้ push) ให้ ff ก่อน · ถ้า working tree main ไม่สะอาด **หยุดแล้วรายงาน** ห้ามแตะไฟล์ค้าง
2. รีวิว diff ของแต่ละ branch (Toby 2 branch เป็นงานที่คุณยังไม่เคยรีวิว) — บั๊ก logic, เซฟเก่า, เทสต์ที่ถูกแก้ (F2 แก้ `tests/30d.test.mjs` ข้อ 3 โดยตั้งใจ)
   ข้อเล็กแก้เองได้เลย · ข้อใหญ่ที่ต้องให้ Toby แก้ → อย่า merge branch นั้น รายงาน FIX LIST
3. merge ทีละ branch แก้ conflict (จุดชนที่รู้แล้ว: `src/ui.js`, `src/i18n.js`, `src/preload.js` บรรทัด catalog version, `src/room.js` F1×F2, `index.html`, tests 30a/e3/ending-video)
4. **ตัดไฟล์หลักฐานที่ถูก `git add -f` เข้ามาใน `output/Toby/`** (F1 force-add รายงาน) ไม่ให้เข้า main
5. **S1 cache-bust รอบเดียว**: bump `?v=` ของทุก CSS/JS ที่ถูกแก้ใน `index.html` + manifest ใน `art.js` + `CATALOG_VERSION` ใน `src/preload.js`
   (เทสต์ e3/e4/e5 grep สตริงเวอร์ชันอยู่ — ใช้วิธีต่อท้ายแบบ F2 หรือแก้เทสต์ให้เช็คแบบ prefix อย่างมีเหตุผล)
6. `node --test tests/*.test.mjs` ผ่านทั้งหมด · `node --check src/*.js` · `git diff --check`
7. smoke ใน Chrome จริง 1280×800: เข้าห้อง 2 โซน เดิน + ไม่มีปุ่มฝึก, ชายแดน 1 โซนเดิน, ศึกฟันดาบ 1 ครั้ง, Setting ปิดเสียง, หน้าคู่มือ, กระทะทองแดง · ไม่มี pageerror/404 ใหม่
8. push main → รอ GitHub Pages build เสร็จ แล้วเปิด https://hellopae.github.io/AVEGEE/ ยืนยันว่าเวอร์ชันใหม่ขึ้น
9. ลบ worktree `.toby-worktrees/{f1,f2,s-fixes}` และ branch ที่รวมแล้ว (ถ้าไม่มีอะไรค้าง)

## ข้อห้าม
- ไม่เปลี่ยนตัวเลขสมดุลเกม · ห้ามรัน `scripts/make-manifest.py` · ไม่แตะ `img/raw/`, `Exam/`
- ไม่ rewrite history · ไม่ force push
- ไม่แตะ branch `codex/*` (F3 ของ Codex จะเริ่ม ~17:10 บนฐาน main — ถ้าเสร็จก่อน 17:10 ยิ่งดี)

## เกณฑ์รับงาน
1. ทั้ง 3 branch รวมเข้า main และ push แล้ว (หรือ branch ไหนไม่รวมพร้อมเหตุผล + FIX LIST)
2. เทสต์ผ่านครบ ตัวเลขรวม · smoke ผ่าน · GitHub Pages แสดงเวอร์ชันใหม่
3. รายงาน `Output/Dale/2026-10-09-avegee-merge-f1-f2-s.md` (ใน repo AGAPAE Agent): ผลรีวิวแต่ละ branch / conflict ที่แก้ / เวอร์ชันที่ bump / commit hash บน main
