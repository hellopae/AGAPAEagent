# ใบงาน K3-merge: Dale รีวิว + รวมงานแก้ความเร็ว (Toby K3) เข้า main AVEGEE

## บริบท
- ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-15-avegee-k3-perf.md` · รายงาน Toby: `Output/Toby/2026-10-15-avegee-k3-perf.md` (อ่านก่อน)
- branch `toby/k3-perf` (worktree `/Users/agapae/agapae-work/.toby-worktrees/k3`) commit `994bbdd`, `8232b0c` ฐาน `b5614fa`
- main AVEGEE ตอนนี้ = `6d36dcb` (K2 ของคุณ merge แล้ว) — ต้อง rebase/merge
- จุดที่อาจชนกัน (Toby ประเมิน): `src/ui.js` (import + preload URL), `index.html` (query ui.js กับ preload), regex ใน `tests/skill-atk.test.mjs`, `tests/west-hit-facing.test.mjs`
- ผลของ Toby: เกม 10 fps → 60 fps ต้นเหตุหลัก = `ctx.filter` ย้อมสีต้นไม้ทุกเฟรม + LRU chunk เล็กเกิน + สร้าง pattern ใหม่ทุก chunk

## ขั้นตอน
1. รีวิว diff (ถูกต้อง, ไม่เปลี่ยนภาพที่เห็น, ไม่มีโค้ดตายหรือ hack)
2. rebase บน `6d36dcb` แก้ชน — cache-bust ให้ query ของ ui.js/preload ใน `index.html` และ `output/game-review/index.html` ตรงกันกับ preload import ใน ui.js (ใช้ suffix ใหม่ที่รวม `-k2b`+`-k3` เช่น `-k3m`)
3. `node --test tests/*.test.mjs` ต้องผ่านหมด (คาด ~925)
4. ตรวจด้วยตาเร็วๆ ด้วย Playwright (1440×900 DPR2): แผนที่ Zone1 ซูม 5× เดิน 5 วินาที + หน้าต่อสู้เปิดเมนูพลัง — ใช้ harness ของ Toby ได้ (`Output/Toby/k3-perf/run_scenes.py`) วัด fps หลัง merge ต้องใกล้ 60
5. ผ่าน → push main → ตรวจ GitHub Pages build ตรง SHA · ล้าง worktree `.toby-worktrees/k3` + branch

## ข้อห้าม
- ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` และ worktree Codex ของ K1
- **ห้ามเก็บภาพหน้าจอใน repo AGAPAE** — ถ้าต้องถ่ายเก็บที่ scratch `/tmp` แล้วใส่ตัวเลขในรายงานพอ

## เกณฑ์รับงาน
1. PASS + SHA บน main + Pages built ตรง SHA — หรือ FIX LIST
2. ตัวเลข fps หลัง merge 2 ฉาก + ผลเทสต์
3. รายงานสั้น `Output/Dale/2026-10-15-avegee-k3-merge.md`
