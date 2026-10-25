# A1 — Guard special cutscene

Root cause reproduced from baselinec01167b: Guard follows B1 physical melee early return through runDash, bypassing legacy playActionCutscene. Correction inserts existing1.3s Guard-only cutscene after setup and before dash launch, with damage/morale/cooldown at the existing onHit only. Existing timings for other melee actions stay unchanged. Reduced-motion Guard keeps readable lead-in and no translation. No art, balance or save schema changes.

Actual Guard actor supplies home branch to regionalCrewCutscene, independent of Yama outfit; title says Guard name and shared special move name. Unit tests execute the production runDash with real combat API and controlled clock, not a duplicate transaction model. Browser fixture isolates memory and serves old ui.js for before comparison or current ui.js for after, records DOM cut presence/image, hit/cost deltas and timeline; no player save writes. Owner visual acceptance pending. Worktree retained.


## ผล self-check ตามเกณฑ์ A1

- ผ่าน: ทำซ้ำรุ่นเดิม c01167b ได้คัตซีน 0 ครั้ง แต่โจมตีจริง 1 ครั้ง; รุ่นแก้ 24beecd แสดงคัตซีน Guard ก่อนพุ่งโจมตี
- ผ่าน: browser runtime จริง (1.3 วินาที) โซน th และ asia ใช้ชุดยามา cyberhell แต่ภาพ Guard ถูกภูมิภาค; asia มี 50 เฟรมที่โหลดภาพสำเร็จ, HP 10000→9928 ครั้งเดียว, กำลังใจ 100→92 และ cooldown 20000ms ครั้งเดียว ไม่มี console error
- ผ่าน: มือถือ 390×844 ภาพ Guard west พอดีพื้นที่, แตะข้ามภาพแล้วไม่ซ้ำคำสั่ง; HP 10000→9916 ครั้งเดียว; browser-held-west-mobile-skip.json
- ผ่าน: unit เรียก production runDash + real combat API ครอบคลุมกดซ้ำ, ปิด/เปลี่ยน battle, ไม่มีภาพ, timing ปกติและ reduced motion, lookup ทั้ง 4 ภูมิภาค; reduced motion เป็น controlled test ไม่ใช่การเปลี่ยน OS
- ผ่าน: targeted 19/19, full 1465/1465, syntax 130 ไฟล์, diff check ผ่าน; validation-final/full.results.json
- ไม่มีขั้นตอน npm build: โปรเจกต์นี้เป็น static ES modules ไม่มี package.json
- ไฟล์เกม 5 ไฟล์: index.html, src/ui.js, src/battle-dash.js, tests/guard-cutscene.test.mjs, docs/guard-cutscene.md; 83 insertions / 8 deletions

ภาพ guard-cutscene-held-preview-1280.png และ -390.png ใช้เว็บ QA ที่ยืด ACTION_CUT_MS เป็น 10 วินาทีเฉพาะ HTTP response เพื่อถ่ายภาพ ไม่มีการเปลี่ยนไฟล์เกม การจับภาพอยู่ช่วง animation เริ่มต้น ส่วน browser-after-th.json / browser-after-asia.json ใช้เวลาเกมจริง 1.3 วินาที การแตะข้ามปิดรูปแต่ยังรอ timeline เดิมก่อนพุ่งโจมตี

QA fixture เป็น memory-only, ปิดการเซฟผู้เล่น ไม่มีการเปิดโซนที่ยังรอ mask ในเกมจริง; browser-before-invalid-fixture.json เป็นข้อผิดพลาดของ fixture รุ่นแรก ไม่ใช่ผลทดสอบเกม ใช้ browser-before.json ที่แก้ fixture แล้วเท่านั้น

ผลเป็น Codex self-check; รอคุณเป้ตรวจรับภาพ ไม่อ้างว่า Claude หรือ QA ตรวจแล้ว คิวถัดไป A2 นั่ง/นอนพักศาลาน้ำชา 60 วินาที ยังไม่ได้ทำในชุดนี้ Worktree/branch เก็บไว้ตาม handoff ไม่ลบ

เผยแพร่ main be45a8d376a38ebd33d6cfc6338f8bc2dd5c3509; merged tree เท่ากับ tested24beecd; Pages builtตรงSHA; live-verification.json ผ่าน3/3; browserเว็บจริงโหลดสำเร็จและไม่มีconsoleerror/warn.
