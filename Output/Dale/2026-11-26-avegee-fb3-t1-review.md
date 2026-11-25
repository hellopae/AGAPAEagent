# Dale review: AVEGEE FB3-T1 (ศึก: จังหวะ + บั๊ก) · 26 พ.ย. 2569

ผล: **PASS** · merge fast-forward เข้า main เป็น `b95ece93` (ฐาน `3c8476bc`, 10 commit ของ Toby) · push แล้ว

## สิ่งที่ตรวจ
- diff `origin/main..toby/fb3` ครบ 25 ไฟล์ (src 9, index.html, tests 12 + fixture, scripts 2) · ไม่มีไฟล์ img/audio เปลี่ยน
- BT1: ค้นทั้ง repo ไม่มี `fleeBattle/fleeWhy/FLEEABLE_KINDS/performFlee/openFleeConfirm/battle.flee.*` ค้าง · เหลือแค่ `over='flee'` ภายใน (ปุ่ม ✕ ออกโหมดซ้อม `ui.js:5399`, ข้อความปุ่มจบ, เทสต์ endBattle) และ `battle-fx-map.js` ที่คืน null สำหรับ 'flee' (ไม่เป็นไร) · `confirmBattleCommand('flee')` คืน false ทุกชนิดศึก
- cache token: ไฟล์ที่แก้ทุกไฟล์ถูก bump ใน importmap ตรงกัน (ui, game x3 alias, i18n, sfx, battle-scale x2 alias, combat-skills, battle-turns.css) · `battle-camera.js` ถูก import ที่เดียว (ui.js) ด้วย `?v=...-fb3` จึงไม่มี module ซ้ำสองชุด · ไม่หว่านทั้งเกม
- battle-scale.js: refactor `applyMember`/`reapplyLastLayout` ให้ผลเหมือนเดิมกับการจัดเลย์เอาต์เดิม (ค่าเดียวกัน แค่ใช้ซ้ำ) มี guard ขนาดจอ/ทีมไม่ตรง
- EV14: `done` รอ `!skillView` + `executeSkill` ครอบ try/finally ล้าง skillView ทุกทางออก · เพดานบอส 60% ทำที่ `applyCombo` ตัวเดียว (ส่วนเกินตกลูกสมุน) · `breachFinale` ไม่ผ่านเพดาน
- เทสต์ซิมสมดุล:
  - `balance2`: เปลี่ยนจาก `|ชนะ-ประวัติ| <= 30` เป็น `ชนะ >= ประวัติ-30` (ขอบล่างคงเดิม ยกเฉพาะขอบบน) · ยังตรวจ hash หลักฐานผ่าน fixture `fb3-t1-runtime-changes.json` (snippet ย้อนกลับได้ before/after ครบ game.js/combat-skills.js)
  - `boss-skills-set-a`: win% บน 98 -> 100 · ขอบล่าง 40 คงเดิม · rounds 4..9 คงเดิม
  - `quest-rewards`: win% บน 97 -> 100 ขอบล่าง 55 คงเดิม · **rounds ขอบล่าง 3 -> 2** (ขอบล่างของรอบ ไม่ใช่ของอัตราชนะ) ผ่อนเพราะศึกสั้นลง — ยอมรับได้ แต่ T11 ต้องกลับมาปรับ
  - ไม่มีเทสต์ถูกปิด/skip
- เทสต์เก่าที่ถูกลบ/แก้ (flee) เป็นของฟีเจอร์ที่ใบงานสั่งเอาออก ไม่ใช่การลดเกณฑ์

## เทสต์เต็มรอบ (ใน worktree toby/fb3 commit b95ece93, เหมือน main หลัง ff)
`node --test tests/*.test.mjs` -> exit=0 · tests 2581 · pass 2581 · fail 0 · cancelled 0 (`workers.test` ผ่านรอบเดียว ไม่ต้องรันซ้ำ)

## Merge / Deploy
- `git pull --ff-only` (up to date) -> `git merge --ff-only toby/fb3` -> `git push origin main` (`3c8476bc..b95ece93`)
- Deploy Pages run **45680973783**: ครั้งแรกล้มที่ step `deploy-pages` ("No artifacts named github-pages" ฝั่ง GitHub, ขั้น stage+upload ผ่านปกติ) -> `gh run rerun --failed` -> **success** (1m37s)
- ตรวจหน้าเว็บจริง `https://hellopae.github.io/AVEGEE/`: `version.json` build = `b95ece93` · `<meta avegee-deploy>` = `b95ece93` · importmap มี `sfx.js?v=20261110-battlefx-fb3` · `combat-skills.js` live มี `COMBO_BOSS_CAP`

## ขนาดชุด deploy
staged bytes **980,979,541** (941 MB, 3147 ไฟล์) เทียบ deploy ก่อนหน้า (22 พ.ย.) 980,976,704 = **+2,837 bytes** (โค้ดล้วน ไม่มีรูป/เสียง)
หมายเหตุสำคัญ: ชุด deploy จริงคือ ~941 MB ไม่ใช่ ~19 MB ตามที่ระบุในใบงาน และเหลือที่ว่างใต้เพดาน 1 GB ของ workflow (1,000,000,000) เพียง ~19 MB — **ภาพ/วิดีโอใหม่ชุด FB3 ถัดไป (Codex art queue C1-C6) จะชนเพดานได้** ควรวางแผนตัดของที่ไม่ใช้/บีบอัดก่อนเพิ่มภาพ

## ข้อสังเกตเล็ก (ไม่บล็อก)
- CSS `.flee-layer/.flee-card` ใน index.html น่าจะกลายเป็นโค้ดตาย (ไม่ได้ลบ ปล่อยไว้ตามหลักเปลี่ยนน้อย)
- เสียง `restore` และความรู้สึกแรงของท่าประสานพิพากษายังต้องคุณเป้ฟัง/เล่นจริง
- ปุ่ม ✕ ออกโหมดซ้อมยังอยู่ (Toby ถามคุณเป้ไว้แล้ว)

## Rollback
`cd ~/agapae-work/AVEGEE && git revert -m1 ...` ไม่ต้อง: main เป็น ff ธรรมดา ให้ `git revert 3c8476bc..b95ece93` (หรือ `git reset --hard 3c8476bc` + force push เมื่อคุณเป้อนุญาต) แล้ว Deploy Pages จะรันเอง · branch `toby/fb3` ยังอยู่
