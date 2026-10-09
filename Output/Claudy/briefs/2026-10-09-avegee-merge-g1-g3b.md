# ใบงาน (Dale): AVEGEE — รีวิว + รวม G1 และ G3b เข้า main แล้วขึ้นเว็บ

Repo: `/Users/agapae/agapae-work/AVEGEE` · ก่อนเริ่ม `git fetch` + `git pull --ff-only` (แอป Codex ของคุณเป้อาจ push main เพิ่ม) · ถ้า working tree ของ main มีไฟล์ค้างที่ไม่ใช่ของเรา **อย่าแตะ** ทำใน worktree แยกแล้วรายงาน

## งานที่ต้องรวม
1. **G1 ไอเท็ม 4 ชนิด + Guard พักศาลา** — branch `codex/20261009T150157Z-7cb03085` commit `9ddf93f` (worktree `/Users/agapae/agapae-work/.codex-worktrees/20261009T150157Z-7cb03085`)
   ใบงาน `Output/Claudy/briefs/2026-10-09-avegee-g1-items-guard-rest.md` · รายงาน `Output/Toby/2026-10-09-avegee-g1.md`
2. **G3b ประลองชายแดน 10 wave + ระบบอาวุธ** — branch `toby/g3b` commit `b3954e6`, `84a7657` (+ `913e8a6` = รายงาน force-add ใน `output/Toby/` → **ไม่เอาเข้า main**)
   ใบงาน `Output/Claudy/briefs/2026-10-09-avegee-g3b-frontier-challenge.md` · รายงาน `Output/Toby/2026-10-09-avegee-g3b.md`

ทั้งคู่แตก branch จากฐาน `75924a4` และแก้ไฟล์ชุดเดียวกัน (`src/data.js`, `src/ui.js`, `src/i18n.js`, เทสต์สมดุล) — คาดว่าจะชน แก้ชนโดยรักษาพฤติกรรมของทั้งสองงาน

## การตัดสินของ Claudy (ใช้ตามนี้)
- ตัวเลขของ G1 (กล่องยา 65%) และ G3b (อาวุธ fang +20 / chain +25 / cane +25 / trojan +30) **รับตามที่เป็น** — คุณเป้จะตัดสินภายหลัง ไม่ต้องปรับ
- เทสต์ที่ G1 ขยายช่วง balance28b เป็น 90–100%: ตรวจว่ายังมีความหมาย (ไม่หลวมจนจับอะไรไม่ได้) ถ้าเห็นปัญหาให้รายงาน ไม่ต้องแก้ตัวเลขเกม
- ไม่มีภาพใหม่ในรอบนี้ → ไม่ต้องแตะ manifest/preload (**ห้ามรัน `scripts/make-manifest.py`** แม้รายงาน Toby จะบอกให้รัน)

## ขั้นตอน
1. รีวิว diff ทั้งสอง branch ตามเกณฑ์รับงานของใบงานแต่ละใบ (บั๊ก, save เก่าโหลดได้, ไม่แตะตัวเลขเนื้อเรื่องเดิมนอกที่สั่ง, ข้อความ TH+EN ครบ)
2. รวมเข้า main (merge commit หรือ cherry-pick ก็ได้ ห้าม force push/เขียนประวัติใหม่)
3. cache-bust ครั้งเดียว: `?v=` ใน index.html + import ที่เกี่ยว · ถ้าต้องขยับ `CATALOG_VERSION` ใน `src/preload.js` ให้ต่อท้ายแทนการแทนที่ (เทสต์ e3/e4/e5/f2 grep prefix)
4. `node --check src/*.js` + `node --test tests/*.test.mjs` ผ่านทั้งหมด
5. เปิดเกมใน Chrome (local) ตรวจเร็ว: กระเป๋าใช้ข้าวปั้น/กล่องยากับยมทูตได้ · หน้าทีมนิราเห็น HP Guard + ปุ่มพักศาลา · บอสยืนประตูชายแดน th คุยได้ เริ่มประลองได้ · console ไม่มี error ใหม่
6. push main → รอ GitHub Pages แล้วเปิด https://hellopae.github.io/AVEGEE/ ยืนยันว่าเวอร์ชันใหม่ขึ้นจริง
7. ลบ worktree/branch ที่รวมแล้ว (`../.toby-worktrees/g3b`, codex G1) และ worktree ขยะที่ rate_limited: `.codex-worktrees/20261009T150212Z-ea485fe0`, `.codex-worktrees/20261009T150227Z-a3285037` (ตรวจก่อนว่าไม่มี commit ที่ไม่ได้รวม)
   **ห้ามแตะ** worktree ของ Codex run ที่กำลังรัน (`20261009T163044Z-828fda98` และ run ใหม่ที่ขึ้นหลัง 23:30)

## ข้อห้าม
- ไม่เปลี่ยนตัวเลขสมดุล · ไม่ force push · ไม่แตะ `img/raw/`, `Exam/` · ไม่เอา `output/Toby/` เข้า main

## ส่งผล
`Output/Dale/2026-10-09-avegee-merge-g1-g3b.md`: PASS หรือ FIX LIST (เรียงตามข้อ) · commit hash บน main · ผลเทสต์ · ผลตรวจ Pages
