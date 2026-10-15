# ใบงาน K1d-review: Dale รีวิว + merge แผนที่ใหม่ Zone1 (Toby K1d)

## บริบท
- ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-15-avegee-k1d-map-integrate.md` · รายงาน Toby: `Output/Toby/2026-10-15-avegee-k1d-map.md` (อ่านทั้งสอง)
- branch `toby/k1d-map` commit `f90c85f` worktree `/Users/agapae/agapae-work/.toby-worktrees/k1d` ฐาน main `21add07` (มี K4 แล้ว)
- Toby อ้าง: เทสต์ 931/931, เดินถึงทุกประตู, fps 57–60 ทุกซูม, อาคารตรงภาพวาง (ภาพเทียบ `Output/Claudy/briefs/assets/2026-10-15-avegee-k/k1d-placement-vs-game.jpg` — Claudy ดูแล้ว ตรง)
- **จุดที่แตะนอกไฟล์แผนที่ (ตรวจละเอียด):**
  1. `game.js syncBlocks`: โซนเมือง `th` อาคารกันทางเดินเฉพาะ 40% ล่าง (ให้ยมเดินหลังอาคารได้) — ตรวจว่าโซน 2–4 ไม่เปลี่ยน และยมไม่เดินทะลุตัวอาคารด้านหน้า
  2. `game.js` ยมทูตเดินตาม path จำกัดก้าวไม่ข้ามจุดแวะ (แก้บั๊กเด้งไปมา)
  3. `walk.js clearLine` ขอบ 3 หน่วยในเมือง
  4. `game.js spawnMob` ใช้ `TOWN_SHORE_SPANS`
  5. import ไม่มี `?v=` (`town-layout.js`, `town-walkmask.js` ฯลฯ) — **ใส่ `?v=` ให้ครบ** กันเบราว์เซอร์คุณเป้แคชของเก่า (คุณเป้เคยเห็น "แผนที่ยังเป็นอันเดิม")
- Codex app กำลังทำ animation ยม (`docs/ui-work-coordination-2026-10-15.md`) — ถ้า main เลื่อนจากงาน Codex ให้ rebase แก้ชนเฉพาะบรรทัด cache-bust อย่าทับงานเขา

## ขั้นตอน
1. รีวิว diff (ไม่มีโค้ดตาย, ระบบพื้น tile เก่าถูกถอดจริง ไม่โหลด asset เก่า, ไม่มี `ctx.filter` ต่อเฟรม)
2. rebase บน main ล่าสุด → `node --test tests/*.test.mjs` ผ่านหมด
3. Playwright 1440×900 DPR2: ถ่ายซูม 1×/5×/6.5× ที่ลานกลาง + ท่าเรือ, เดินจากลานกลางไป 3 ประตูสุ่ม, ยมเดินหลังอาคาร 1 หลัง + หลังต้นไม้ 1 ต้น, วัด fps ด้วย `Output/Toby/k3-perf/run_scenes.py`
4. ผ่าน → merge → push main → Pages built ตรง SHA → เปิดเว็บจริงตรวจว่าโหลด chunk ใหม่ (`img/map-zone1/v2/`) ไม่ใช่ `terrain-*-v1`
5. ล้าง worktree/branch toby/k1d-map

## ข้อห้าม
- ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` และไฟล์ animation ยม · ภาพหลักฐานเก็บ `/tmp` เท่านั้น (ห้ามลง repo ใดๆ)

## เกณฑ์รับงาน
PASS + SHA + Pages built + fps 3 ฉาก + ผลเทสต์ — หรือ FIX LIST · รายงานสั้น `Output/Dale/2026-10-15-avegee-k1d-review.md`
