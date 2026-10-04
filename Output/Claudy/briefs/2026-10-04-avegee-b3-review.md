# ใบงาน B3-R (Dale): รีวิว + merge Codex B3 (พลังตามโซน + ฝึกแยกโซน + ร้านตามโซน) — ทำหลัง B2-R

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน
- Codex run `20261004T135629Z-a8d6d79f` · worktree `~/agapae-work/.codex-worktrees/20261004T135629Z-a8d6d79f` · ฐาน `6e4c20f` · ไฟล์ staged ไม่ได้ commit
- ใบงาน `Output/Claudy/briefs/2026-10-04-avegee-b3-progression.md` · แบบ `Output/Astra/2026-10-04-avegee-30g0-design.md` หัวข้อ 2 · รายงาน `<worktree>/output/Toby/2026-10-04-avegee-b3.md`
- Codex: 363/363 · จำลอง 100 รอบ: เทิร์นชนะบอสแทบเท่าเดิม แต่ **อัตราชนะโซน 4 (รวมศึกสุดท้าย) ลด 82% → 72%**

## จุดที่ต้องดูเป็นพิเศษ
1. **Codex แก้เทสต์เดิม 5 ไฟล์** (`balance28b`, `combat-power`, `event-progression`, `final-gauntlet`, `ui27e-events`) — ตรวจทีละจุดว่าแก้เพราะ schema/ร้านเปลี่ยนจริง ไม่ได้ผ่อนเกณฑ์ให้ผ่าน · ถ้าผ่อนเกณฑ์ → FIX LIST
2. อัตราชนะโซน 4 ลด 10 จุด — หาสาเหตุ (ยาร้านใหม่? ตัวคูณพลัง?) รายงานให้ Claudy ตัดสิน (คุณเป้อนุญาตปรับความยากได้ แต่ต้องรู้ว่าทำไม) · ไม่ต้องแก้สมดุลเอง
3. เซฟเก่า: `upLv` เดิมย้ายเข้า schema ใหม่ครบ (ทดสอบเซฟจริงแบบที่ทำใน B1)

## ขั้นตอน
- commit · rebase บน main ล่าสุด (หลัง 30E, B2 — conflict `game.js/ui.js/roster.js` คาดว่ามี ให้คงทั้งสองงาน) · เทสต์ทั้งหมด + `node --check` + `git diff --check`
- เบราว์เซอร์ 1280/1440: การ์ดยมทูตแสดงพลังตรงกับดาเมจที่เห็นในศึกจริง (ลองอย่างน้อย 2 โซน) · ร้านพ่อค้านรกโซน 1 กับโซน 3 ขายยาต่างระดับ ราคา/ค่าเติมตรงตาราง · ใช้ยาในกระเป๋า/ในศึก/หน้าต่างเตรียมศึก ได้ค่าเดียวกัน
- ผ่าน → merge + push + live · ไม่ผ่าน → FIX LIST · ลบ worktree หลัง merge

## รายงาน
`Output/Dale/2026-10-04-avegee-b3-review.md` · PASS/FIX LIST + commit + roll back + สาเหตุอัตราชนะโซน 4 ลด
