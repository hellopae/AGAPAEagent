# ใบงาน (Dale): AVEGEE — รวมภาพ G2 (intro-panel 01–05 v2 + cover-v4) เข้า main

Codex run `20261009T163044Z-828fda98` — งานอยู่ใน **โฟลเดอร์ซ้อน** `/Users/agapae/agapae-work/.codex-worktrees/20261009T163044Z-828fda98/g2` (branch `codex/g2-intro-cover`, ฐาน `75924a4`) **ยังไม่ commit**
รายงาน Codex: `Output/Codex/runs/20261009T163044Z-828fda98/report.md` + `g2/output/Codex/g2/README.md` · ใบงานเดิม `Output/Claudy/briefs/2026-10-09-avegee-g2-intro-cover-art.md`

## Claudy ตรวจภาพด้วยตาแล้ว: PASS (นิราสัดส่วนตรงตัวในเกม ทั้ง 6 ภาพใช้ได้)

## ขั้นตอน
1. `git fetch` + `git pull --ff-only` บน main (ปัจจุบัน `f7c56ff` = รวม G1+G3b แล้ว)
2. เอาเข้า main เฉพาะ: `img/intro-panel-0[1-5]-v2.webp`, `img/cover-v4.webp`, `tests/g2-intro-art.test.mjs`, และการเปลี่ยนใน `src/ui.js`, `src/preload.js`, `index.html`, `img/manifest.json`, `img/preload-catalog.json`
   — main ขยับไปแล้ว ไฟล์โค้ด/manifest **ห้ามก๊อปทับทั้งไฟล์** ให้ใส่เฉพาะส่วนที่ G2 เปลี่ยน (ชี้ภาพใหม่ + รายการ manifest/preload) บนไฟล์ล่าสุดของ main
   — `CATALOG_VERSION` / `?v=`: ต่อท้าย ไม่แทนที่ (เทสต์ e3/e4/e5/f2 grep prefix)
   — ไม่เอา `output/Codex/g2/` เข้า main
3. `node --check src/*.js` + `node --test tests/*.test.mjs` ผ่าน
4. Chrome local: intro เลื่อนครบ 5 แผ่นเห็นภาพใหม่ · หน้าปกเป็น cover-v4 · ไม่มี 404 ใหม่
5. push main → ตรวจ https://hellopae.github.io/AVEGEE/ ว่าภาพใหม่ขึ้น
6. ไม่ต้องลบ worktree นี้ (Claudy จะขออนุญาตคุณเป้ลบรวมทีเดียว)

## ข้อห้าม
- ห้ามรัน `scripts/make-manifest.py` · ไม่ force push · ไม่แตะ worktree ของ Codex run อื่นที่รันอยู่ (G3c, G5) และ `.toby-worktrees/g4`

## ส่งผล
`Output/Dale/2026-10-09-avegee-merge-g2.md`: PASS/FIX LIST · commit hash · ผลเทสต์ · ผลตรวจ Pages
