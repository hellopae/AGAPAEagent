# ใบงาน (Dale): AVEGEE — รีวิว + รวม H2 (ห้ามเดินทับอาคาร / ปุ่มซูม+กล้อง / ศาลา / ปุ่ม / วงคำสั่ง / ทิศหน้า)

branch `toby/h2` commit `6e79718` (worktree `/Users/agapae/agapae-work/.toby-worktrees/h2`) — รวม origin/main ถึง `8175171` แล้ว เทสต์ 646/646
ใบงาน `Output/Claudy/briefs/2026-10-10-avegee-h2-fixes.md` · รายงาน `Output/Toby/2026-10-10-avegee-h2.md` · หลักฐาน `Output/Toby/h2-evidence/`
งานขนาน: Dale อีก 2 คนทำ H3/H4 และ H5b+cane — fetch ก่อน push ทุกครั้ง ชนให้ merge แล้วเทสต์ใหม่ ไม่ force

## ขั้นตอน
1. รีวิว diff: การบล็อกอาคาร (`art.blockRectsOf` → `walk.setBlocks`) ไม่ทำให้จุดเข้าสถานที่/NPC/ทางเดินหลักหาย · ปุ่มซูมใหม่ `#hud-zoom` ไม่บัง HUD อื่น · `TEAM_DRAWN_FACING_RIGHT` ที่ถอน asia/cyberhell ออก
2. เล่น Chrome (844×390 + 390×844) สั้นๆ: เดินชนอาคาร 2 โซน · ซูมแล้วเดิน กล้องนุ่ม · ศาลานั่ง/นอน · ศึกโซน 2: วงคำสั่งไม่ทับตัวละคร **รวมกรณีมีเพื่อนยืนข้าง** · ฟาดปกติแล้วหันขวา (ลองสวมดาบเขี้ยว/โซ่ด้วยถ้าทำเซฟได้)
3. merge → cache-bust ต่อท้าย → `node --check src/*.js` + `node --test tests/*.test.mjs` ผ่าน → push → ตรวจ Pages
4. รวมแล้วลบภาพใน `Output/Toby/h2-evidence/` (เก็บ .md)
ห้ามรัน make-manifest · ไม่ลบ worktree
ส่งผล: `Output/Dale/2026-10-10-avegee-merge-h2.md` PASS/FIX LIST · commit · Pages
