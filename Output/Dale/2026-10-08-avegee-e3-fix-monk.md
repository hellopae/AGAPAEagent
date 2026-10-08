# AVEGEE E3-fix: คืนเจ้าอาวาส แยก devaMonk เอาคดีขอทานออก

Repo: AVEGEE · branch codex-app/2026-10-04 · commit local (ยังไม่ push)

## ที่เปลี่ยน
- `src/cases.js`: คดี `monk` (เจ้าอาวาสดัง) คืนตรงกับ d754481 ทุกตัวอักษร (diff ไม่มีบรรทัด monk) · เพิ่ม `devaMonk` (พระจำวัด, sp soul-monk, kind deva) ต่อจาก monk · ลบคดี `deva` (ชายชราขอทาน) ออก
- `src/game.js`: ensureDevaCase / jail / defer / assignBlock / verdict คดีที่ 5 th ชี้ `devaMonk` · nextNamedCase ตัด `devaMonk` ออกจากการสุ่ม (monk สุ่มได้ตามเดิม) · restore() ตัด soul `case:'deva'` ออกจาก queue/held · ensureDevaCase ย้าย soul `monk` ที่ pure (จาก build E3 ช่วงสั้น) เป็น devaMonk
- tests: e3-events-z1z2 (เปลี่ยนเป็น devaMonk + เทสต์ใหม่ E3-fix), soul-portraits (deva -> devaMonk)

## ผลตรวจ
- `node --test tests/*.test.mjs`: 500 tests, pass 499, fail 0, skipped 1
- `node --check src/*.js` ผ่าน · `git diff --check` สะอาด

## หมายเหตุ
- usedCases เก่าที่มี 'deva' ปล่อยไว้ (ไม่มีผล)
- ไม่แตะ Exam/ และไฟล์ untracked อื่น
- Rollback: `git revert <hash>` หรือ reset ไป 120e952
