# Dale — AVEGEE merge P5c + P7-apply (22 ต.ค. 2569)

- main `c3cd364` -> `b22c81b` (push ปกติ ไม่ force) · เป็น merge --no-ff 2 อัน ทำใน worktree `/Users/agapae/agapae-work/.dale-worktrees/p5c-p7` (branch `dale/p5c-p7-merge`) แล้ว ff เข้า main
- `58a6231` = merge `toby/p5c-worker-scale` (`3e54b43`) · `b22c81b` = merge `toby/p7-apply` (`9c6ca76`)

## รีวิว diff
- P5c: แตะแค่ workers.js (ตาราง `WORKER_FIT_TH_V2` + `workerFit` + drawWorker; แถวที่ไม่มีค่า = scale 1 dx 0 -> พิกัดวาดเท่าเดิม), index.html workers.js บรรทัดเดียว, สคริปต์วัดใหม่, เทสต์ใหม่ 4, regex p5b
- P7: ข้อความล้วน (guide, i18n, data desc/TUTOR.build, crewNote, openHelp, ป้าย Lv.->ขั้น, krata-qte ย้ายสตริงเข้า i18n g5.*) · ตรรกะ/ตัวเลขเกมไม่เปลี่ยน · ตัดแค่ `ระเบียบ ${r.rab}` ในแถวแสดงผล verdictCard (ไม่ตัด r.rab ใน game.js) · ตรวจสูตรคะแนน game.js:1142 (0.50 tham + 0.33 ked)/0.83 ตรงกับข้อความใหม่ "ประมาณ 60/40 ไม่นับผู้คุม/ระเบียบ"

## Conflict
- merge ที่ 1 (P5c): ไม่ชน
- merge ที่ 2 (P7): ชน 1 จุด `tests/p5b-art-insert.test.mjs` บรรทัด ~65 (regex 2 บรรทัด) · แก้โดยรวม = workers.js regex ของ P5c (`p5b[^"]*`) + ui.js regex ของ P7 (`p5b(-[a-z0-9]+)*-o2`) · index.html merge อัตโนมัติ ไม่ชน (workers.js `-p5b-p5c`; ui.js `...-p5b-p7-o2`) · ไม่มี conflict ในโค้ด

## เทสต์ (`node --test tests/*.test.mjs`)
- หลัง merge 1: 1313 pass / 0 fail
- หลัง merge 2 (ก่อน push): 1318 pass / 0 fail (1313 + p7 ใหม่ 5)

## Pages (https://hellopae.github.io/AVEGEE/)
- Pages build `built b22c81b` · HTML 200 ไม่หน้าขาว (Playwright 390x844: title ถูก, ไม่มี pageerror, scrollWidth 390; 404 เดียวคือ `img/hero-yama-side.png` เรื่องเก่า)
- marker ใน HTML ที่เสิร์ฟ: `workers.js?v=20261021-worker-supplies-p5b-p5c` · `ui.js?v=20261021-worker-supplies-p2-p5-p1-p3-p5b-p7-o2` · `i18n.js ...-p1-p7` · `krata-qte.js ...-p6-p7` · `sentencing-guide.js ...-p2-p7` ทั้งหมดโหลด 200 · workers.js ที่เสิร์ฟมี `WORKER_FIT_TH_V2` · ui.js ที่เสิร์ฟไม่มี `ระเบียบ ${r.rab}` แล้ว

## Rollback
`git revert -m 1 b22c81b 58a6231` (ตามลำดับ) หรือ revert รวม แล้ว push · ฐานก่อนหน้า `c3cd364`

## ที่ยังเปิด (จาก Toby)
- P5c: แถว 7/8 ใหญ่ขึ้น ~10% (ปรับ scale ได้บรรทัดเดียว) · แถว 0-2 เท้าไม่กลางช่อง อาจกระตุกข้าง 3-8 px ตอนสลับท่า
- P7: P8 NIT a–f, TUTOR T1-T3 ยังเป็นข้อความเดิม; ป้ายล็อก "ขั้น" ฝังไทยแม้โหมด EN
- QA บนมือถือจริงตามขั้นตอนใน Output/Toby/2026-10-22-avegee-p5c-worker-scale.md และ ...-p7-apply.md
