# AVEGEE merge3 — LOAD-01b + R2 + B34 (Dale, 29 ต.ค. 2569)

- main: a2351a3 -> a957f83 (push ไม่ force) · Pages run 40843368524 success · live https://hellopae.github.io/AVEGEE/ (ui.js ?v=20261029-load01b-r2-battle-fx)
- Merge ตามลำดับ LOAD-01b, R2, B34 (--no-ff) · ชน ?v= ที่ index.html (ui.js) รวมเป็น `20261029-load01b-r2-battle-fx`
- แก้เอง 1 commit: `src/battle-fx-tex.js` ใส่ `procOnly:true` ให้ 6 texture ที่ไม่มีไฟล์ใน img/fx (ข้าม request ที่ 404 ทุกการต่อสู้, ยังวาด gradient stand-in) · bump battle-fx-tex ?v=20261029-no404
- เทสต์เต็ม: 1602 tests / 1601 pass / 1 fail (battle-camera strikeTime จับเวลา ตกเพราะเครื่องโหลด) -> รันไฟล์เดี่ยว 13/13 pass
- หลักฐานภาพ: Output/Dale/2026-10-29-avegee-merge3/
- Verify: เปิดเกม, ต่อสู้ใช้พลังน้ำแข็ง/พัดสายลม/สะกดจิต (ไม่มีลูกไฟ, cutscene ขึ้น), เดินชายแดนปัจฉิม-ไซเบอร์ (ประตูซ้ายบน -> ลานขวาล่าง), เดินมือถือเทียบก่อน/หลัง LOAD-01b
- Rollback: `git revert -m 1` merge commits (B34 a957f83, R2 61d30e8, LOAD-01b 6b4e3d3) แล้ว push; หรือ revert 404 fix commit เดี่ยว
- Follow-up: img/mob-bug.png, mob-bot.png, mob-skeleton.png ไม่มีในรีโป (404 ใน route 3-4, ของเดิม); audio/bgm-*.ogg, img/hero-yama-side.png 404 เดิม
