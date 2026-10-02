# AVEGEE — hotfix ศึกวิญญาณ + merge 28C (2 ต.ค. 2569)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · Live: https://hellopae.github.io/AVEGEE/

## ขั้น 1 — Hotfix `5b14bb4`
- สาเหตุ: `f075d79` ใส่ `f.sp?.startsWith('leader-')` ใน HUD บอสของฉากต่อสู้ (`src/ui.js` ~2605) แต่ศึกวิญญาณทั่วไป (`kind:'soul'`) `sp` เป็นตัวเลข → TypeError ฉากวาดครึ่งเดียว ปุ่มไม่ผูก handler
- แก้: `String(f.sp ?? '').startsWith('leader-')` — ค้นทั้ง `src/` แล้ว ไม่มีจุดอื่นที่เรียก string method บน `sp` ตรง ๆ (`storyFoeArt` เช็ค `typeof sp` อยู่แล้ว; `scene.js:26` ใช้กับ foe ของ ZONE_EVENTS ที่เป็นสตริงเสมอ)
- เทสต์ใหม่ `tests/soul-battle-sp.test.mjs` (2 เทสต์): ศึกวิญญาณได้ sp ตัวเลขและนิพจน์ไม่ throw + ตรวจซอร์ส ui.js ไม่มี `.sp?.<stringMethod>(` อีก
  ข้อจำกัด: ui.js ผูก DOM แน่น ไม่ได้ export ฟังก์ชัน จึงไม่ได้ render ฉากต่อสู้จริงในเทสต์ (ใช้เทสต์ระดับซอร์สแทน)
- เทสต์ 179/179 · `node --check` · `git diff --check` ผ่าน · push แล้ว · ไฟล์ live `src/ui.js` มีโค้ดที่แก้ (curl ยืนยัน)

## ขั้น 2 — รีวิว + merge 28C `25b86a9` (merge commit ของ `toby/28c` `45fb0cb`)
| # | เกณฑ์ | ผล | หมายเหตุรีวิว |
|---|---|---|---|
| 1 | สาเหตุเสียงแตกระบุและแก้ | ผ่าน | อ่านโค้ด: `<audio>` ต่อเพลง สร้างใน `getTrack` ครั้งเดียว ตั้ง `src` ครั้งเดียว ไม่มีการสลับ src; crossfade 700 ms; `applyVolumes` หารผลรวม lvl ไม่ให้เกิน `AUDIO.bgm` + `clamp01` กัน RangeError → ไม่ clip; ไม่มีการอ้างตัวแปร `el` เดิมหลงเหลือ; เทสต์ 10 รอบ (AudioContext=1, ซ้อน <=2) |
| 2 | ทุกท่าไม้ตายมีเสียง / ปิดแล้วเงียบ | ผ่าน | `powerSfx` map ครบ (fire/bigFire→bigfire, flameCharge, windFan, rage, valkyrieSpear, cooldownClock, ice, hypno, roar, mirror); `bigFire` ตรงกับ `g.abilities.bigFire` ใน game.js; `tone`/`noise` ไม่สร้างโหนดเมื่อ `AUDIO.on=false` หรือ `AUDIO.sfx<=0` |
| 3 | ไม่มีไฟล์เสียงใหม่ใหญ่ | ผ่าน | สังเคราะห์ WebAudio ทั้งหมด 0 ไฟล์ |
| 4 | เทสต์ / check / diff-check | ผ่าน | บน main หลัง merge: 187/187 · `node --check` sfx.js/ui.js/audio28c.test.mjs · `git diff --check` สะอาด |

ไม่มีข้อที่ต้องแก้ ไม่มี FIX LIST · ไม่แตะ worktree/branch 28a/28b (และไม่ลบ 28c ด้วย — worktree `.toby-worktrees/28c` ยังอยู่)

## Live verify
- `src/ui.js` และ `src/sfx.js` บน GitHub Pages มี `powerSfx` และ `String(f.sp ?? '')` แล้ว · หน้าแรก HTTP 200
- QA (Chris/คุณเป้): เข้าศึกวิญญาณที่ขัดขืนบนมือถือ ฉากต้องวาดครบ ปุ่มกดได้ · เข้า-ออกศึก 5–10 รอบ ฟังว่าเพลง fade นุ่มไม่สะดุด · กดท่าไม้ตายแต่ละท่าได้เสียงต่างกัน · ปุ่ม 🔊 ปิดแล้วเงียบ
- ข้อจำกัด (จาก Toby): ไม่มีใครฟังด้วยหูจริง ผลเสียงยืนยันจาก event log เท่านั้น · iOS Safari `el.volume` อ่านอย่างเดียว fade ไม่ทำงานบนไอโฟน (ข้อจำกัดเดิม)

## Rollback
`git revert -m 1 25b86a9` (ถอด 28C) · `git revert 5b14bb4` (ถอด hotfix — ไม่แนะนำ ทำให้ศึกวิญญาณพังอีก) แล้ว push
