# ใบงาน B2-R (Dale): รีวิว + merge Codex B2 (ทีมข้ามโซน 6 คน ศึกสุดท้าย) — ทำหลัง 30E-R เสร็จ

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน
- Codex run `20261004T134326Z-80a9a744` · worktree `~/agapae-work/.codex-worktrees/20261004T134326Z-80a9a744` · ไฟล์ staged ไม่ได้ commit (commit ให้ก่อน rebase)
- ใบงาน `Output/Claudy/briefs/2026-10-04-avegee-b2-team6.md` · แบบ `Output/Astra/2026-10-04-avegee-30g0b-battle-design.md` หัวข้อ 4 · รายงาน Codex `<worktree>/output/Toby/2026-10-04-avegee-b2.md`
- Codex: `src/{game,roster,art,ui}.js`, `command-wheel.css`, เทสต์ · 360/360 · **ยังไม่ได้ดูภาพเลย**

## ขั้นตอน
1. ตรวจ diff เทียบข้อห้าม (ศึกทั่วไปยังทีม 2 · ไม่เปลี่ยนสมดุล) · commit · rebase บน main ล่าสุด (หลัง 30E — ระวัง `src/ui.js`) · เทสต์ทั้งหมด + `node --check` + `git diff --check`
2. เบราว์เซอร์ 1280×800 / 1440×900 / 390×844:
   - ศึกสุดท้ายโซน 4: โต๊ะนิราแสดงยมทูตทุกโซนที่ปลด (ภาพ/ชื่อตามโซนต้นทาง) เลือกได้ 6 · คนกำลังใจ 0 เลือกไม่ได้พร้อมเหตุผล · ชนิดเดียวกันต่างโซนเลือกพร้อมกันได้
   - ฉากต่อสู้ 6 ยมทูต 2 แถว + ยมบาท + Guard ไม่ทับกัน หันขวาถูก · แถบการ์ด 8 ใบไม่ล้นจอ · มือถือเลื่อนแนวนอนได้
   - หลังศึก กำลังใจ/ฝึกเขียนกลับคนเดิมในสาขาเดิม · ศึกทั่วไปยังเลือกได้ 2
   - ย้ายโซนไปกลับระหว่างซ่อมอาคาร → ช่างคนเดิมทำต่อ (buildK)
   - เซฟก่อน B2 โหลดได้
3. จุดเล็กแก้เอง · ผ่าน → merge + push + live · ไม่ผ่าน → FIX LIST · ลบ worktree หลัง merge

## รายงาน
`Output/Dale/2026-10-04-avegee-b2-review.md` · PASS/FIX LIST + commit + roll back + ภาพที่คุณเป้ควรดู (JPEG ย่อ `Output/Dale/b2-shots/`)
