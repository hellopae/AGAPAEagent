# Dale · รีวิว + merge AVEGEE FB3-T4 (ระบบอัญเชิญ v2) · 26 พ.ย. 2569

ผล: **PASS ทั้ง 5 ข้อ** · merge แล้ว (fast-forward `41b68754..6e752785`) · deploy สำเร็จ · ไม่มีบั๊กที่ต้องแก้เอง

## เกณฑ์รับงาน
| ข้อ | ผล | หมายเหตุ |
|---|---|---|
| 1 ตัวอัญเชิญในทีม | PASS | ดูหัวข้อ "ตรวจ diff" |
| 2 importmap + cache token | PASS | `lamp.js` `lamp-text.js` เข้า importmap แล้ว (`20261126-fb3t4`) · bump ครบ: game (4 ที่) ui (2) battle-facing (2) battle-dash battle-turns combat-skills character-scale lamp.css · ไม่มีไฟล์ src ที่แก้แล้วตกหล่น |
| 3 เทสต์เต็มรอบ | PASS | tests 2617 · pass 2617 · fail 0 · cancelled 0 (concurrency 6) · fixture `fb3-t4-runtime-changes.json` ผ่าน |
| 4 merge + deploy | PASS | ดูด้านล่าง |
| 5 ข้อความตัวแทน | ไม่บล็อก | จดไว้ท้ายรายงาน |

## ตรวจ diff (หัวข้อที่สั่ง)
- **ศัตรูเลือกเป้าไม่โดนตัวอัญเชิญ:** `enemyTarget()` อ่านจาก `battleCrew()` ซึ่งไม่มีตัวอัญเชิญ · `foeTarget` (aim) กรองตาม `k` ที่เป็น guard/boon/nira/kan จึงไม่เข้า · ท่าตีทั้งทีมของบอส (`victims`) กรอง `!c.summoned` แล้ว
- **ไม่ทำให้ศัตรูได้เทิร์นเพิ่ม:** `orderRound` นับ `foeTurnTotal` จากพันธมิตรที่ไม่ใช่ `summoned` · ขนาดทีมใน scaleEncounter / questFightFoes / foeFit / balance migration กรอง `!a.summoned` ครบ · `teamCombo` ไม่รวมตัวอัญเชิญ
- **หายหลัง 3 ครั้ง:** `afterAnim` เมื่อ `summonActed` และ `left<=0` → `dismissSummoned()` หลังปิดเทิร์น (ไม่ค้างในคิว) · `summonedActor()` คืน null เมื่อ `leaving` พ้นเวลา · เอฟเฟกต์ลาเล่น 1.1 วินาที แล้ว repaint ปล่อยออก
- **ศึกจบกลางทาง:** state อยู่ใน `battle.summoned` (ไม่ใช่ state ถาวร) จึงหายไปพร้อมวัตถุ battle · `summonedActor()` คืน null เมื่อ `battle.over` · ศึกเนื้อเรื่องอยู่ใน `SUMMON_BLOCKED_KINDS` เรียกไม่ได้อยู่แล้ว · `farewellTimer` เช็ค `g.battle === b` ก่อน paint
- **เซฟเก่า:** ไม่มีฟิลด์ใหม่ในสถานะตะเกียง (นับ 3 ครั้งเดิม `spendSummon` ไม่เปลี่ยน) · `battle.summoned` ถูกอ่านแบบ optional จึงโหลดเซฟเก่าได้ · เทสต์ `t4-lamp-state` ผ่าน
- **fallback ภาพ cutscene:** `resolveLampCut` ลองไฟล์โซนก่อน แล้วภาพตะเกียงเดิม แล้วไม่มีภาพ (การ์ดยังขึ้นชื่อ+แสงทอง) · probe มี timeout 2.5 วิ · แคช Promise ต่อไฟล์ (รวมผล false) จึงไม่โหลดซ้ำ/ไม่วน · วางไฟล์จริงที่ `img/summon/cut-lamp-summon-{th,asia,west,cyberhell}.webp` ก็ใช้ได้ (README อยู่ใน `img/summon/`)
- **ทิศ:** รีจิสทรี `TEAM_DRAWN_FACING_RIGHT` แยกจาก `FOE_DRAWN_FACING_RIGHT` (ศัตรูใช้ทะเบียนศัตรู) · ภาพ `img/summon/battle-*.webp` ถูกอ้างจากตะเกียงเท่านั้น (grep ทั้ง src) ศัตรูหงอคง/หนุมาน/ธอร์/ลูซิเฟอร์ใช้ sprite บอสคนละไฟล์ จึงไม่หันผิด · แผ่นรวมเทียบก่อน/หลังดูแล้ว 12 ตัวหันขวา/หันตรงตามที่รายงาน
- **ไม่มี "ท่าไม้ตาย เหลือ x/3":** grep ใน src + index.html ไม่เหลือ · หน้าต่างอัญเชิญใช้จุดไฟ 3 ดวง (aria-label ใช้ข้อความ "เรียกได้อีก n/3 ครั้ง" สำหรับ screen reader เท่านั้น)

## Merge / deploy
- merge: fast-forward `origin/toby/fb3` (`6e752785`) → push `41b68754..6e752785`
- Actions "Deploy Pages" run 45742985414: ครั้งแรกล้มที่ "Fetching artifact metadata failed" (ปัญหาฝั่ง GitHub) → `gh run rerun --failed` → success
- https://hellopae.github.io/AVEGEE/version.json → `{"build":"6e752785"}` ตรงกับ main

## จดไว้ (ไม่บล็อก)
1. ข้อความตัวแทน (Rae จะเขียนใหม่): `battle.present` `battle.lampCut` `helper.attack` `helper.acts` `helper.farewell` ใน `src/lamp-text.js`
2. `bag.movesLeft` ยังมีอยู่ในไฟล์ข้อความ แต่ถูกเปลี่ยนเป็น "เรียกได้อีก {n}/3 ครั้ง" ใช้เป็น aria-label ของจุดไฟเท่านั้น ไม่แสดงบนจอ
3. ภาพ cutscene ใหม่ของ Codex C4 ยังไม่มา (ใช้ fallback) · ภาพตัวอัญเชิญในทีมใช้ภาพ battle เดิมของแต่ละตัว
4. ความแรงตัวอัญเชิญ: ท่าเฉพาะ 3 × 0.40 = 1.2 เท่าของตีเดียวเดิม (เทิร์นเรียกไม่ตีแล้ว) · T11 ซิมสมดุลอีกรอบ
5. ยังไม่ได้เล่นจริงบน deploy (ตรวจ diff + เทสต์ + ภาพของ Toby) · QA: เล่นถึงศึกหนุมาน → รับตะเกียง → อัญเชิญหนุมานในศึกธรรมดา → ตีครบ 3 ครั้ง → หายไป · ลองมือถือ 390 px

## Rollback
`git revert -m` ไม่จำเป็น (fast-forward ไม่มี merge commit): `git revert 6e752785 06581be5 f2f4a27b` แล้ว push (เซฟไม่ต้อง migrate) หรือ reset กลับ `41b68754` ตามที่คุณเป้อนุญาต
