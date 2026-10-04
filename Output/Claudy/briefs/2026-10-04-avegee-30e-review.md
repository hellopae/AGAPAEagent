# ใบงาน 30E-R (Dale): รีวิว + merge Codex 30E (ตะรางจัดระเบียบ + popup ลงทัณฑ์ตามโซน)

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · main = `6e4c20f` (มี B1) · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน
- Codex run `20261004T133036Z-e78bb4a0` · worktree `~/agapae-work/.codex-worktrees/20261004T133036Z-e78bb4a0` · branch เดียวกัน · ไฟล์ staged ไม่ได้ commit (commit ให้ก่อน rebase)
- ใบงาน `Output/Claudy/briefs/2026-10-04-avegee-30e-rooms.md` · รายงาน Codex `<worktree>/output/Toby/2026-10-04-avegee-30E.md`
- Codex: แก้ `index.html, src/{data,proximity,room,ui,flow29c.css,i18n}.js` + ใหม่ `soul-nameplate.js`, `punishment-scene.js`, เทสต์ · 351/351 · **ยังไม่ได้ดูภาพจริงเลย** → งานหลักของคุณคือตรวจด้วยตา
- ห้ามแตะ worktree ของ Codex B2 ที่กำลังรันอยู่

## ขั้นตอน
1. ตรวจ diff เทียบข้อห้าม · commit · rebase บน main · เทสต์ทั้งหมด + `node --check` + `git diff --check`
2. เบราว์เซอร์ 1280×800 + 1440×900 ตามเกณฑ์รับงาน 30E:
   - ตะรางโซน 2, 3, 4: วิญญาณเรียงแถวไม่ทับกัน/ไม่ทับยมบาท ผู้คุม · ป้ายชื่อเล็กใต้ตัว ชื่อยาวตัด … · นิรายืนบนพื้น ใกล้แผง/ประตู · ป้ายใต้ปุ่มทองอ่านได้ไม่ซ้อน
   - popup ลงทัณฑ์โซน 1–4: ฉากเป็นของโซนนั้น · ยมบาทอยู่ตรงกระทะในภาพ · มีไฟ/ไอด้านล่างปิดรอยตัดจริง (เปิดภาพดูทุกโซน)
3. จุดเล็ก (พิกัด/ขนาดเพี้ยน) แก้เอง · ผ่าน → merge + push + live · ไม่ผ่าน → FIX LIST
4. ลบ worktree/branch หลัง merge · ภาพหลักฐานเก็บเฉพาะที่จำเป็น (JPEG ย่อ) `Output/Dale/30e-shots/`

## รายงาน
`Output/Dale/2026-10-04-avegee-30e-review.md` · PASS/FIX LIST + commit + roll back + ภาพที่คุณเป้ควรดู
