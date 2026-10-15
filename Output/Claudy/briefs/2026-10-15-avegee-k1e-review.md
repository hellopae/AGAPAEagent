# ใบงาน K1e-review: Dale รีวิว + merge sprite ของตกแต่งแผนที่ (Codex K1e)

## บริบท
- ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-15-avegee-k1e-town-props-art.md`
- run: `Output/Codex/runs/20261015T071321Z-6527178d/` (report.md, diff.patch, diff-stat 53 ไฟล์) · worktree `/Users/agapae/agapae-work/.codex-worktrees/20261015T071321Z-6527178d` ฐาน `99ec562`
- Codex อ้าง: 5 sprite (ปาล์ม โคมทอง คบไฟ ต้นแดง ต้นหิมะ) เสียบผ่าน `theme-assets.js`/`town-scenery.js` เทสต์ 941/941 — **ยังไม่ได้ตรวจในเกมจริง**
- contact sheet: `.../output/k1e/contact-sheet.jpg` (Claudy ดูแล้ว สไตล์เข้ากับไทรเดิม)
- คู่ขนาน: Toby L1 (เงา/ย่อตัวละคร — แตะ `town-scenery.js`/`scene.js` เหมือนกัน) จะ rebase ตามหลัง K1e · Codex app อาจ push animation ยม — ถ้า main เลื่อน rebase แก้ชนเฉพาะ cache-bust

## ขั้นตอน
1. รีวิว diff — **ลบ `output/k1e/` (หลักฐาน) ออกก่อน commit** · ไม่มี `ctx.filter` ต่อเฟรม · ตัวแทนวาดด้วยโค้ด/tint เดิมถูกถอดจริง
2. Playwright 1440×900 DPR2: ประตูสวรรค์ (โคม), ลานกระทะ (คบไฟ), บันไดกลาง (ปาล์ม+ไทร), ฝั่งลาวา (ต้นแดง), ประตูน้ำแข็ง (ต้นหิมะ) ซูม 5× · ขนาด/ฐานวางพื้นถูก · fps ซูม 5× เดิน (`Output/Toby/k3-perf/run_scenes.py`)
3. ข้อเล็กแก้เอง · ผ่าน → commit → rebase main ล่าสุด → `node --test tests/*.test.mjs` → push → Pages built · ล้าง worktree/branch codex

## ข้อห้าม
ห้ามแตะไฟล์ animation ยม · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ภาพหลักฐาน /tmp

## เกณฑ์รับงาน
PASS + SHA + Pages + fps + เทสต์ — หรือ FIX LIST · รายงาน `Output/Dale/2026-10-15-avegee-k1e-review.md`
