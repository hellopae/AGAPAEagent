# ใบงาน Toby — เสียบงาน Codex ชุด 13 พ.ย. (4 ชิ้น) · 13 พ.ย. 2569
อ่านอย่างเดียวจาก worktree Codex (ห้ามเขียน) · ทุกภาพเป็น .webp ในเกม · ตรวจด้วยตาก่อนเสียบ ชิ้นไหนไม่ผ่าน (หน้าเพี้ยน/ตัวอักษร/ขอบเลอะ/ขนาดผิด) ไม่เสียบ จดไว้ + prompt แก้
1. **SPIRIT-POSES** `/Users/agapae/agapae-work/.codex-worktrees/20261113T040600Z-4e901b34/docs/art-reviews/2026-11-12-spirit-poses/` (รอบแรก `20261113T033543Z-0933a118` failed อาจมีชิ้นเพิ่ม) → วางลง `img/soul-poses/` ชื่อตามตาราง Vera → `node scripts/soul-pose-manifest.mjs` → commit คู่ · นับว่าได้กี่จาก 39 ต่อโซน · ท่าร้องไห้ต้อง "ซึ้งที่รู้ความจริง ไม่โหดร้าย"
2. **CONSTRUCTION-Z234** `/Users/agapae/agapae-work/.codex-worktrees/20261113T033603Z-c4feccdf/docs/art-reviews/2026-11-12-construction-z234/<zone>/` → `img/construction/<asia|west|cyberhell>/stage-N.webp` + json · loader เลือกตามโซน · ดูในเกมทั้ง 3 โซน
3. **TRASH-ICON** `/Users/agapae/agapae-work/.codex-worktrees/20261113T042257Z-ccec6e91/docs/art-reviews/2026-11-13-trash-icon/icon-trash.webp` → แทน `img/ui/icon-trash.webp` · ดูที่ 26 px คู่กับ icon-close
4. **Z1-TOUCHUP** `/Users/agapae/agapae-work/.codex-worktrees/20261113T042711Z-bcb88ec6/docs/art-reviews/2026-11-13-z1-touchup/` → ประกอบ native 2 จุดเข้า v7r ด้วยวิธีเดียวกับ v7r assemble (min-cost seam + feather, นอกพื้นที่ไม่เปลี่ยน) → ติดตั้งด้วย `scripts/install-z1-ground.py` (ชุดใหม่ `v7r2` หรือแทน v7r ตามสะดวก) · ภาพเทียบ 2 จุด
## ที่ทำงาน/ข้อห้าม
worktree `~/agapae-work/.toby-worktrees/z1-v5` (ff ตาม origin/main) · Claudy merge main · ห้าม `pgrep -f "node --test"` ในลูปรอ · หลักฐาน ≤ 20 MB · **คัดลอกภาพเทียบสำคัญไป `~/Desktop/AVEGEE-ตรวจงาน-1113/`** (คุณเป้เปิดโฟลเดอร์ซ่อนไม่ได้)
## ส่งงาน
`Output/Toby/2026-11-13-avegee-codex-batch1-integrate.md` · commit แยกต่อชิ้น · push · เทสต์ผ่าน
