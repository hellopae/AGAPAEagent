# ใบงาน B7-R (Dale): รีวิว + merge Codex B7 (ไอคอน b1–b4 + สมดุลรอบสุดท้าย) — ใบสุดท้ายของระบบต่อสู้ใหม่

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ห้าม rebase/force push · อย่าเปลี่ยน branch ของ clone หลักออกจาก main · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน · commit ทีละขั้น
- Codex run `20261004T210730Z-c6f4e53c` · worktree `~/agapae-work/.codex-worktrees/20261004T210730Z-c6f4e53c` · ฐาน `b71e16e` · staged ไม่ได้ commit (commit ให้ก่อน)
- ใบงาน `Output/Claudy/briefs/2026-10-04-avegee-b7-icons-balance.md` · ต้นฉบับไอคอน `Output/Claudy/briefs/assets/30/b1..b4.png` · รายงาน Codex `<worktree>/output/Toby/2026-10-04-avegee-b7.md` (มีตารางสมดุล)
- Codex: `img/ui/b1–b4.webp`, manifest+cache, `command-wheel.js/css`, `data.js`, `game.js`, `art.js`, `scripts/sim-b7.mjs`, เทสต์ · 443/443 · **ยังไม่ได้ดูภาพเลย** · Codex ยอมรับว่ารอบเทสต์แรกเขียนไฟล์ temp นอก worktree (ไม่ตั้ง TMPDIR) — ตรวจว่าไม่มีไฟล์หลงเข้า repo

## จุดที่ต้องดู
1. **แก้เทสต์ `balance28b.test.mjs` 6 บรรทัด** — ตรวจว่าไม่ผ่อนเกณฑ์
2. ผลสมดุล Codex: บอสศึกสุดท้าย 67/70/83% (ทีม 1/2/6) · บอสไทย/เอเชีย "ยังง่ายเกินเป้า" → รายงานตัวเลขจริงหลังรวม ไม่ต้องปรับเพิ่มถ้าอยู่ในกรอบเทสต์ (เกณฑ์บอสโซน 1–3 ≥90% ยังรอคุณเป้ตัดสิน)
3. ไอคอน: ไม่มีขอบขาว · สัดส่วน/ตำแหน่งตรงภาพกลีบเดิมที่ B6-R ใช้ (clip-path) · วงยมบาท b1 บน + b2 ขวา + b3 ล่าง · วงยมทูต/Guard b1 บน + **b4 ขวา** · กดตรงรูปกลีบ (hit area)

## ขั้นตอน
- commit · รวมกับ main ล่าสุดด้วย merge · เทสต์ทั้งหมด + `node --check` + `git diff --check`
- เบราว์เซอร์ 1280/1440/390 (แตะ): วงยมบาท/ยมทูต/Guard หน้าตาตามภาพ Battle8-1/8-2 · กดทุกกลีบได้ตรง · ศึกสุดท้าย 8 หน่วย · ห้องไต่สวนยังใช้วงเดิม · ไม่มี page error
- ผ่าน → merge + push + live · ไม่ผ่าน → FIX LIST · ลบ worktree หลัง merge · **ลบ `Output/Dale/b2b-review/`, `b3-shots`, `b4-shots`, `b5-shots`, `b8-shots` และหลักฐานงานที่ merge แล้วอื่นๆ ใน `Output/Dale/`, `Output/Toby/` (เก็บ .md)** — คุณเป้อนุญาตลบหลักฐานหลัง merge · เก็บ `b6-shots` + `b7-shots` ไว้ให้คุณเป้ดู

## รายงาน
`Output/Dale/2026-10-05-avegee-b7-review.md` · PASS/FIX LIST + commit + roll back + ตารางสมดุลหลังรวม + ภาพวงคำสั่งใหม่ (JPEG ย่อ `Output/Dale/b7-shots/`)
