# ใบงาน Toby — เสียบภาพ Codex ที่ค้าง + ต้นไม้แดง + รั้วสะพาน + เทียบเมฆ · 13 พ.ย. 2569
## ขอบเขต
1. **ภาพภารกิจ (QUEST-ART):** `/Users/agapae/agapae-work/.toby-worktrees/.codex-worktrees/20261111T074021Z-ce096628/docs/art-reviews/2026-11-10-quest-art/` → ศัตรู 6 ตัว (mob-q-debtor/collector/gauze-big/gauze/tale-big/tale) + ท่าใหม่ 3 ท่า (ไอคอน, cutscene 2 เฟรม, effect) · เสียบตามจุดใน `src/quest-fights.js` และลบแถวใน `QUEST_ART_PLACEHOLDER` ของ `src/combat-skill-assets.js` · **แปลงเป็น .webp** (ภาพวาด q86 m6, อัลฟา lossless) · ตรวจตัวละครซาโตริ/เกรซ/ยักษ์หน้าเหมือนเดิม ถ้าภาพไหนไม่ผ่าน (หน้าเพี้ยน มีตัวอักษร ขอบเลอะ) ไม่เสียบ จดไว้ให้ Codex วาดใหม่
2. **ต้นไม้ใบแดงเป็น sprite แยก (โซน 1):** คุณเป้: ต้นไม้แดงหายจากพื้น v7 "เพิ่มรูปต้นไม้แยกไว้ด้านบนได้" · เทียบพื้น v5 กับ v7r หาตำแหน่งที่ต้นไม้ใบแดงหาย แล้ววาง sprite ต้นไม้แดงที่มีอยู่ (เช่น `img/theme-v4/town-tree-red-th-v1.webp` และชุดต้นไม้โซน 1) ไม่ขวางทางเดิน/บันได เรียง depth ตามจุดเท้า · ไม่ย้อมสี
3. **รั้วสะพาน river-back/front:** ตัด sprite ใหม่จากพื้น v7r native ด้วย Pillow ที่สัดส่วนจริง (สูง 1315 px, กว้าง ~455/430 ตามรายงาน FB2-A) ห้ามวาดใหม่/ย้อมสี แล้วลบ `GROUND_SPRITE_X_FIX`
4. **เทียบเมฆ:** ชั้นเมฆ Codex `/Users/agapae/agapae-work/.toby-worktrees/.codex-worktrees/20261111T024557Z-ac27b779/docs/art-reviews/2026-11-05-z1v7-clouds/` vs เมฆ shader ปัจจุบัน · ภาพเทียบ 3 มุม (ประตูสวรรค์, ขอบซ้าย, หุบกลาง) ที่ซูมเกม · **ยังไม่เปลี่ยน** ส่งภาพให้คุณเป้เลือก (ใส่ flag `?clouds=codex` ให้ลองในเกมได้)
## ที่ทำงาน/ข้อห้าม
worktree `~/agapae-work/.toby-worktrees/z1-v5` (ff ตาม origin/main eed7afb8 ก่อน) · อ่าน .codex-worktrees ได้ ห้ามเขียน · ห้ามแตะ AVEGEE หลัก/LaunchAgent · Claudy merge main · หลักฐาน ≤ 20 MB · ห้าม `pgrep -f "node --test"` ในลูปรอ
## ส่งงาน
`Output/Toby/2026-11-13-avegee-art-integrate.md` · commit แยกต่อข้อ · push · เทสต์ผ่าน · Chromium 390/1792
