# ใบงาน (Dale): AVEGEE — รวม G2b หน้าปก cover-v5 (ยมบาทหันหน้า) เข้า main

Codex run `20261009T172127Z-171a64d4` · งานอยู่ในโฟลเดอร์ซ้อน `/Users/agapae/agapae-work/.codex-worktrees/20261009T172127Z-171a64d4/avegee-g2b` (branch `codex/g2b-cover-v5`, ฐาน `6eb32e5`, ยังไม่ commit) — มีโฟลเดอร์ `avegee-git` ซ้อนด้วย ไม่ต้องสนใจ
ใบงาน: `Output/Claudy/briefs/2026-10-10-avegee-g2b-cover-yama-fix.md`
**Claudy ตรวจภาพด้วยตาแล้ว PASS**

## ขั้นตอน
1. `git fetch` + `git pull --ff-only` บน main
2. เอาเข้า main: `img/cover-v5.webp` + การชี้หน้าปก v4→v5 (`src/ui.js`, `src/art.js` ถ้าจำเป็น) + manifest/preload catalog + เทสต์ G2 ที่ปรับ — ใส่เฉพาะส่วนที่เปลี่ยนบนไฟล์ล่าสุดของ main (main อาจมีงาน H1 preload ของ Dale อีกคนเข้ามา — ให้ cover อยู่กลุ่มเดียวกับ cover-v4 เดิม)
   - Codex แก้ `scripts/prep-art.py` ด้วย: ตรวจว่าจำเป็นไหม ถ้าเป็นแค่สคริปต์ช่วยของ run นี้ **ไม่เอาเข้า**
   - ไม่เอา `output/Codex/g2b/` · cache-bust ต่อท้าย
3. `node --check src/*.js` + `node --test tests/*.test.mjs` ผ่าน
4. Chrome: หน้าปกเป็น v5 (ยมบาทหันหน้า) · push → ตรวจ Pages
5. ห้ามรัน `scripts/make-manifest.py` · ไม่ force push · ไม่ลบ worktree

## ส่งผล
`Output/Dale/2026-10-10-avegee-merge-g2b.md`: PASS/FIX LIST · commit hash · ผลตรวจ Pages
