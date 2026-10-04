# ใบงาน B6-R (Dale): รีวิว + merge Codex B6 (เมนูคำสั่งรายตัว) — ทำหลัง B8-R

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ห้าม rebase/force push · **อย่าเปลี่ยน branch ของ clone หลักออกจาก main** · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน · commit ทีละขั้น
- Codex run `20261004T195022Z-39e8a9e9` · worktree `~/agapae-work/.codex-worktrees/20261004T195022Z-39e8a9e9` · ฐาน `822ed51` · staged ไม่ได้ commit (commit ให้ก่อน)
- ใบงาน `Output/Claudy/briefs/2026-10-04-avegee-b6-command.md` · คำบรรยายภาพตัวอย่าง Battle8-1/8-2 ใน `Output/Kittanate-source/2026-10-04-avegee-battle-v2-requests.md` · รายงาน Codex `<worktree>/output/Toby/2026-10-04-avegee-b6.md`
- Codex: `src/{game,ui,command-wheel}.js`, `command-wheel.css`, เทสต์ B6 8/8 · ชุดเต็ม 417/417 รวมสมดุล · แก้ `tests/b3-card-actor.test.mjs` 4 บรรทัด (ตรวจว่าไม่ผ่อนเกณฑ์) · **ยังไม่ได้ดูภาพเลย**

## ขั้นตอน
1. commit · รวมกับ main ล่าสุด (หลัง B8) ด้วย merge · เทสต์ทั้งหมด (รวมสมดุล) + `node --check` + `git diff --check`
2. เบราว์เซอร์ 1280/1440/390 เทียบภาพตัวอย่าง Battle8-1/8-2:
   - คลิกการ์ด/ตัวละคร = เลือกผู้ลงมือ · วงคำสั่งขึ้นรอบตัว ตรงกลางเป็นหน้าผู้ลงมือ
   - ยมบาท 3 กลีบ (โจมตี/พลัง/ไอเท็ม) · ยมทูต/Guard 2 กลีบ (โจมตี/ไอเท็ม) · โจมตี → ท่าย่อย → ลูกศร "▼ เป้าหมาย" เลือกศัตรู · บุญเลือกผู้รับรักษา · กานต์เลือกศัตรู
   - ไอเท็ม → เลือกผู้รับ (ตัวเอง/เพื่อน/Guard/ยมบาท) · น้ำมนต์เฉพาะยมบาท · ใช้กับคนเต็มไม่เสียของ/ตา
   - ยกเลิกไม่เสียตา · 1 คำสั่ง → ศัตรูสวน 1 · ไม่มี double action · CD ส้มขึ้นหลังใช้ท่า
   - ศึกสุดท้าย 8 หน่วย · ห้องไต่สวนยังใช้วงเดิมได้ · pause ไม่พัง
3. จุดเล็ก (ตำแหน่งวง/ลูกศร) แก้เอง · ผ่าน → merge + push + live · ไม่ผ่าน → FIX LIST · ลบ worktree หลัง merge

## รายงาน
`Output/Dale/2026-10-05-avegee-b6-review.md` · PASS/FIX LIST + commit + roll back + ภาพวงคำสั่งยมบาท/ยมทูต/เลือกเป้า/เลือกผู้รับไอเท็ม (JPEG ย่อ `Output/Dale/b6-shots/`)
