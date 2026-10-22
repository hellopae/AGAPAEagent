# Dale: AVEGEE P8 merge + deploy (23 ต.ค. 2569)

**ผล: PASS — merge, push, Pages สำเร็จ**

## สิ่งที่เปลี่ยน
- merge `toby/p8-copy` (829f12d) เข้า `main` ด้วย --no-ff → **merge commit `c1cd99f`** (parent: b22c81b)
- push `b22c81b..c1cd99f` ที่ https://github.com/hellopae/AVEGEE (ก่อน merge `git fetch` แล้ว origin/main ยัง b22c81b, working tree สะอาด ไม่มีไฟล์ค้างของ Codex app)
- ข้อความล้าสมัยที่เหลือจาก P7 (TUTOR, KARMA_TIERS, openHelp, explainBar, ป้ายล็อกผ่าน i18n, ข้อความรอบสุดท้ายมินิเกมลูกไฟ, คู่มือบท 4) + เทสต์ใหม่ `tests/p8-copy.test.mjs`

## ผลรีวิว (ตามใบงาน)
1. diff เป็นข้อความเป็นหลัก ตรรกะแตะแค่ `krata-qte.js` บรรทัดเดียว: `t((hit?'g5.hit':...)+(state.done?'Last':''))` — ใช้ `state.done` ที่ตั้งก่อนบรรทัดนั้น ตรงกับ `if (state.done) finish(...)` ถัดไป คีย์ `g5.*Last` ครบ TH+EN ไม่มีตัวเลข/ตรรกะเกมอื่นเปลี่ยน · `town-map.js` เพิ่ม import `t` จาก i18n.js (i18n.js ไม่ import อะไร ไม่มี circular)
2. คำสั่ง 23 ต.ค. ยืนยันแล้ว: `KARMA_TIERS[0].eff` = `'ไม่มีโทษอะไร'` · TUTOR.karma ไม่มี "ต่ำกว่า 25 / ทายาทบัลลังก์" · บนเว็บจริงโหลด data.js ได้ค่าตรงกัน · `tests/p8-copy.test.mjs` เฝ้าไว้ · เลข "กรรมเหลือ 70" ที่เขียนใน TUTOR ตรงกับ `game.js:4000` (`this.karma = 70`)
3. cache-bust `-p8` ต่อท้ายถูกทั้ง 5 ไฟล์ + ui.js (`...-p7-p8-o2` คงท้าย `-o2`) · เทสต์ cache-bust เดิม (o2/p5b/p6) ผ่านหมด
4. `node --test tests/*.test.mjs` บน main หลัง merge: **1325 pass / 0 fail / 0 cancelled** (191 วินาที)
5. Pages: run **39823450251** (`pages build and deployment`) = success, headSha c1cd99f

## ตรวจบนเว็บจริง https://hellopae.github.io/AVEGEE/ (Playwright Chromium 390x844)
- โหลด `ui.js?v=...-p7-p8-o2`, `data.js?v=...-p7-p8`, `i18n.js?v=...-p7-p8` จริง
- ไม่มี pageerror · scrollWidth 390 (ไม่ล้นจอ)
- import data.js เวอร์ชัน -p8 จากหน้าเว็บ: KARMA_TIERS[0].eff = "ไม่มีโทษอะไร", [3].eff มีข้อความ "พญายมลงมาปราบ"
- มี 404 4 รายการ **เป็นของเดิมก่อน P8** ไม่ใช่ regression: `audio/bgm-{title,zone,battle}.ogg` (ไฟล์ใน repo เป็น .mp3 แทน, ฝั่งเล่นเสียงลอง ogg ก่อน) และ `img/hero-yama-side.png` (ไฟล์ทางเลือก, โค้ดมี fallback — ui.js:87-91) ไม่มี console error อื่น

## วิธีตรวจให้ Chris/คุณเป้ (ถ้าต้องการ)
เปิด URL บนมือถือ (ล้างแคชหรือโหลดซ้ำแรงๆ) → เริ่มเกม → ปุ่มคู่มือ ดูการ์ดกระจกวิเศษ/เลื่อนขั้นด้วย EXP/ลงทัณฑ์เกินกรรม → แตะชิปกรรม ดูขั้นแรก "ไม่มีโทษอะไร" → แท็บก่อสร้างดูป้าย 🔒 ขั้น N → ตั้ง EN ดู "Rank N"

## Rollback
`cd /Users/agapae/agapae-work/AVEGEE && git revert -m 1 c1cd99f && git push` (หรือ reset ไป b22c81b ถ้าไม่มีใครดึงแล้ว) แล้วรอ Pages run ใหม่

## ที่ยังค้าง (จากรายงาน Toby ไม่ใช่ปัญหา merge)
- ชิปบารมี (`data-ex="hp"`) ไม่อยู่ใน HUD ข้อความ U8 ผู้เล่นเห็นไม่ได้ → ให้ Vera ตัดสินว่าจะเปิดกลับไหม
- ยังไม่ได้ดูภาพแถบโค้ช TUTOR.fight ที่ 360px (D6 ยาวขึ้น ~60 ตัวอักษร) → ให้ Chris ดูได้
- dead code `game.js talkKan()`, i18n `room.nearKan/kanWait` ไม่แตะ
- worktree `/Users/agapae/agapae-work/.toby-worktrees/p8` และ branch `toby/p8-copy` ยังอยู่ (ไม่ได้ลบ)
