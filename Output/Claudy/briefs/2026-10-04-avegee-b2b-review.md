# ใบงาน B2b-R (Dale): รวม + รีวิว + merge B2b (event สุดท้ายใหม่) — ทำหลัง B4-R

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน
- worktree `~/agapae-work/.codex-worktrees/20261004T145334Z-b50d2a4b` · branch `codex/20261004T145334Z-b50d2a4b` · ล่าสุด `f88a7b9` (Codex `7b056a4` + Toby 3 bugfix) · **ฐาน `e1fbd49` ยังไม่ได้รวมกับ main** (Toby rebase ไม่ได้ — ระบบปฏิเสธ)
- ใบงาน `2026-10-04-avegee-b2b-final-event.md` (+ resume) · รายงาน Toby `Output/Toby/2026-10-04-avegee-b2b.md` · หลักฐาน `Output/Toby/b2b/`
- Toby เล่นจริงครบตั้งแต่ wave 1 ถึงฉากจบ (บนฐานเก่า) · `git merge-tree` คาด conflict 5 ไฟล์: `src/data.js`, `src/game.js`, `src/ui.js`, `tests/b2-team6.test.mjs`, `tests/final-gauntlet.test.mjs`

## ขั้นตอน
1. **รวมกับ main ด้วยวิธีที่ไม่เขียนประวัติทับ**: branch ใหม่จาก `origin/main` ล่าสุด แล้ว `git merge --no-ff codex/20261004T145334Z-b50d2a4b` (หรือ cherry-pick ทีละ commit) — ไม่ต้อง rebase · แก้ conflict ให้คงทั้ง B3 (progression/ยา 42) + B4 (training) + B2b
2. เทสต์ทั้งหมด + `node --check` + `git diff --check` · **รันจำลอง `scripts/sim-final-event.mjs` ซ้ำบนโค้ดที่รวมแล้ว** (ของ Toby เป็นฐานก่อน B3/B4: หัวหน้า 100%, บอส 94%) — ถ้าบอส <80% รายงาน ไม่ต้องแก้สมดุลเอง
3. เบราว์เซอร์ 1280/1440 (+390): ลูกน้อง 4 wave + รางวัล → cutscene → แผนที่มีตัวละคร → ร้าน/นิรา(ทีม 6)/ศาลา → หัวหน้าโซน 1→2→3→4 ทีละศึก (มีลูกน้องร่วม) → บอส → ฉากจบ · โหลดเซฟกลางทาง · เซฟเก่าค้าง event แบบเดิมโหลดได้ · pause (30C) ใช้ได้ในศึกเหล่านี้
4. จุดเล็กแก้เอง (ป้ายชื่อหัวหน้าบนแผนที่ซ้อนกัน) · ข้อความโต๊ะนิรา "ยังทำงานประจำต่อ" ตอนศึกสุดท้าย → แก้ให้ตรง (ถ้อยคำสั้นๆ TH/EN) · ผ่าน → merge main + push + live · ไม่ผ่าน → FIX LIST
5. ลบ worktree/branch + `Output/Toby/b2b/` หลัง merge (เก็บ .md)

## รายงาน
`Output/Dale/2026-10-04-avegee-b2b-review.md` · PASS/FIX LIST + commit + roll back + ผลจำลองหลังรวม + ภาพที่คุณเป้ควรดู

## งานเล็กเพิ่ม (Claudy ตัดสินจาก B4-R — commit แยกก่อนรวม B2b)
- น้ำชากลางศึกฟื้น HP 40 (เดิม 24) เป็นผลข้างเคียงจาก B3 แบบเดียวกับหีบยา → **คืนค่ากลางศึกเป็น 24** (ค่าในกระเป๋าตามตาราง B3 ไม่ต้องแตะ ถ้าระบบแยกบริบทได้) · ปรับเทสต์ที่ผูกค่า · รันจำลองยืนยันไม่กระทบ
