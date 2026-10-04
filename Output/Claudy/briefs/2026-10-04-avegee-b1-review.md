# ใบงาน B1-R (Dale): รีวิว + merge Codex B1 (roster ID + migration เซฟ) — ทำหลัง 30-R5 เสร็จ

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน
- Codex run `20261004T132048Z-74f1bf9a` · worktree `~/agapae-work/.codex-worktrees/20261004T132048Z-74f1bf9a` (ไม่มีรีโปซ้อน) · branch `codex/20261004T132048Z-74f1bf9a`
- ใบงาน `Output/Claudy/briefs/2026-10-04-avegee-b1-roster.md` · แบบ `Output/Astra/2026-10-04-avegee-30g0b-battle-design.md` · รายงาน Codex `<worktree>/output/Toby/2026-10-04-avegee-b1.md`
- Codex: `src/roster.js` ใหม่, `src/game.js` (+61/-11), เทสต์ + fixture เซฟ v3 · 349/349 · ยังไม่ตรวจเบราว์เซอร์

## จุดที่ต้องดูเป็นพิเศษ (งานนี้เสี่ยงเซฟผู้เล่น)
1. อ่าน diff `game.js` ทุกบรรทัด — พฤติกรรมเกมต้องไม่เปลี่ยน (ทีม 2 คน, กำลังใจ, งาน, ศึก, moveZone)
2. Migration: เก็บสำเนาเซฟก่อน migrate จริงไหม · idempotent · fixture ตรงกับโครงเซฟจริง
3. **ทดสอบกับเซฟจริงในเบราว์เซอร์**: (ก) เล่นบน main ปัจจุบันจนมีเซฟกลางโซน 2–3 (หรือสร้างจากการเล่นผ่าน harness) → สลับเป็นโค้ด B1 → โหลด → ยมทูต/กำลังใจ/ทีม/ความคืบหน้าครบ (ข) เล่นต่อ ย้ายโซนไปกลับ เซฟ/โหลดซ้ำ · (ค) เกมใหม่เริ่มได้ปกติ
4. rebase บน main ล่าสุด (หลัง 30D/30F) · เทสต์ทั้งหมด · `node --check` · `git diff --check`
5. ผ่าน → merge + push + live ไม่หน้าขาว · ไม่ผ่าน → FIX LIST · ลบ worktree หลัง merge

## รายงาน
`Output/Dale/2026-10-04-avegee-b1-review.md` · PASS/FIX LIST + commit + roll back · ภาพไม่จำเป็น (เก็บแค่ที่ยืนยันเซฟโหลดได้ 1–2 ใบ)
