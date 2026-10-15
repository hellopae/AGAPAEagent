# AVEGEE L-merge-2 (L2 -> L5) — Dale

Live: https://hellopae.github.io/AVEGEE/ · Pages built ตรง a511143 · smoke test บน live 390x844: โหลดได้ ไม่มี pageerror, ui token `yama-live-20261015-main-l4b-l3-l1-l2-l5`, สะกดจิตล็อก

| งาน | ผล | main SHA |
|---|---|---|
| L2 | PASS | 1b7ab52 |
| L5 | PASS | a511143 (merge ต่อจาก Codex docs commit e7210b4) |

Merge ทำแบบ merge main เข้า branch · แก้ชน: ui.js import, index/review tokens (ต่อ -l2 / -l5), data.js hypno (ใช้ desc L3 + howTo "พลังเวท" L2), regex cache ในเทสต์ (k2/skill-atk/west-hit/k5)
การรวมเพิ่มของ Dale: (1) ต้องกู้ css token ของ L2 (menu-ui/battle-turns/trial-comment8 -l2) และ title "พลังเวท" ที่หายตอนเลือก theirs (2) เพิ่ม importmap `./src/i18n.js` -> `?v=l2` กัน i18n เก่าแคชค้างกับ ui.js ใหม่ (3) k2-menu test รับ `-l2` css token

## ตรวจ L2 (Chromium 1678x937 + 390x844)
ทีม 4 คน (ยักษ์+เพลิง+กานต์+ยมบาทน้อย) ตัวที่ถึงเทิร์นก้าวออกขวา ไม่ทับใคร (วัด sprite bounds) · ป้องกัน: ไม่มี fx ฟัน, โล่ 2 จุด, turnhint ตั้งรับ · หนี: หน้าต่างยืนยัน, ยกเลิก/Esc คงฉาก, ยืนยัน = battle null · บอส: ปุ่ม disabled+เหตุผล "หนีบอสไม่ได้" · เลือกโจมตี = ไม่มีกล่องคำแนะนำ มีแต่ป้าย "เลือกเป้าหมาย", Esc ยกเลิก · สอบสวน "พลังเวท 40/40" · pause ทุกปุ่ม border 0 outline none
## ตรวจ L5 (390x844)
เดินเข้าสายตา -> ❗ + หมาป่าเดินเข้าหา -> เข้าศึก mob เอง 1.6s · หนีผ่านหน้าต่าง L2 -> กลับดันเจี้ยนที่ต้นทาง (y .925) · เดินกลับทันที เข้าศึกซ้ำที่ 4.99s หลังยืนยัน (cooldown 4s) · ไม่มี pageerror
## เทสต์
L2: 980 / แดง 7 ก่อนแก้ k2 token (1 ข้อใหม่) -> แก้แล้ว 6 · L5: 991 รัน แดง 6 = I1-A x3, h5b v4 masks, construction two builds, F1/F3 cache-bust (ฐาน 10 ข้อของ Codex app -> เหลือ 6; ไม่มีแดงใหม่)
## ข้อสังเกต
- docs/claude-handoff-2026-10-16.md สั่ง Codex "merge L5" — ทำแล้ว (a511143) Codex ไม่ต้องทำซ้ำ; ล้าง toby/l1,l2,l3,l5 worktree+branch แล้ว
- data.js/story.js/sentencing-guide.js ยัง import แบบไม่มี ?v= (เดิมเป็นแบบนี้) — ผู้เล่นที่แคชไว้อาจเห็น data เก่า ≤ ~10 นาทีหลัง deploy
## Rollback
fast-forward — revert เป็นช่วง: L2 `git revert --no-commit 965130f..1b7ab52` · L5 `git revert --no-commit 1b7ab52..a511143` (ข้าม docs commit e7210b4 ถ้าไม่ต้องการ) แล้ว commit + push
