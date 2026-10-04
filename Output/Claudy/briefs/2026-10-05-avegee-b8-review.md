# ใบงาน B8-R (Dale): รีวิว + merge B8 (minigame ฝึก 4 เกม: krajok/sawan/sala/ngiw) ของ Toby — ทำหลัง B5-R

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ห้าม rebase/force push · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน
- branch `toby/b8` · worktree `~/agapae-work/.codex-worktrees/toby-b8` · ล่าสุด `1e982d1` (4 commit) · ฐาน `94c7e47` (ยังไม่มี B2b/B5)
- ใบงาน `Output/Claudy/briefs/2026-10-04-avegee-b8-minigames2.md` · รายงาน Toby `Output/Toby/2026-10-05-avegee-b8.md` · ภาพ `Output/Toby/b8/`
- Toby: 418/418 · เล่นจบ 4 เกมในเบราว์เซอร์ 1280/1440 (เมาส์) + 390/360 (แตะ) · แก้บั๊ก B4 `src/training.js:42` (นิรา homeZone 'global' ไม่เคยถูกคืน → ฝึก sala ไม่ได้)

## ขั้นตอน
1. ตรวจ diff (แตะแค่ `src/minigames/training/`, `index.html` 1 บรรทัด, `src/training.js` 1 บรรทัด) · รวมกับ main ล่าสุดด้วย merge · เทสต์ทั้งหมด + `node --check` + `git diff --check`
2. เบราว์เซอร์ 1280 + 390: เปิดครบ 8 สถานีฝึกได้ (รวม 4 ของ B4) · เล่นจบอย่างน้อย 1 รอบต่อเกมใหม่ · EXP ถึงคนที่ถูก · ค่าพลังในการ์ดเปลี่ยน
3. **บั๊กที่ Toby เจอ (แก้ในใบนี้)**: ที่ 390px ห้อง dab ปุ่ม "ออกไปแผนที่" ทับจุดฝึก → ขยับให้ไม่ทับ ตรวจห้องฝึกอื่นที่ 390 ด้วย
4. ผ่าน → merge main + push + live · ลบ worktree/branch + `Output/Toby/b8/` หลัง merge (เก็บ .md)

## รายงาน
`Output/Dale/2026-10-05-avegee-b8-review.md` · PASS/FIX LIST + commit + roll back
