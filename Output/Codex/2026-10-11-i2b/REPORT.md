# I2-B — รายงานการแก้พิกัดบอสชายแดน

สถานะ: แก้โค้ดแล้ว แต่ยังไม่ครบเกณฑ์รับงานด้าน browser / ยังไม่รับรอง QA

- ฐาน: `b3b69ef1956ebc17c6e4bbe1bc46bd006eca85e6`
- Branch: `codex/20261011T043017Z-00a0455e`
- Worktree: `/Users/agapae/agapae-work/.codex-worktrees/20261011T043017Z-00a0455e`
- หลักฐานเก็บใน `AGAPAE Agent/Output/Codex/2026-10-11-i2b/` ภายใน worktree นี้
- ไม่ commit / merge / push / deploy ไม่แก้ hooks, status.json, worklog.json หรือภาพ และไม่เรียก agent อื่น
- ไม่อ่านหรือแก้โฟลเดอร์ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## จุดที่พบ

ภาพอ้างอิง `boss-pos.png` แสดงป้าย “คุยกับทัณฑสูร” ของบอสประลองหลังผ่านอีเวนต์ชายแดน ไม่ใช่ `breach:boss` ใน `src/breach-approach.js` ซึ่งเป็นนักแสดงในฉาก approach ของอีเวนต์คนละส่วน จึงแก้เฉพาะ `CHALLENGE_STAND` และผู้ใช้งานพิกัดนี้

ดูภาพจริงทีละโซนผ่าน image viewer ทั้งภาพพื้นและซุ้มประตู `img/map-v5/st-frontier-<zone>.webp` โดยไม่แก้ไฟล์ภาพ ตีความชายแดนเป็นซุ้มที่วาดตรง `FRONTIER` (835,840) บนแหลมปลายสะพานด้านล่างกลางภาพ ไม่มีความไม่แน่ใจว่าประตูอยู่ส่วนไหน แต่ยังไม่ยืนยันความพอดีกับ UI/camera ใน browser

| โซน | ภาพพื้น | จุดเดิม | จุดใหม่ (เท้า) | พื้นที่ที่เลือก |
|---|---|---|---|---|
| th | img/scene-v2-opt.png | 940,886 | 930,924 | พื้นขวาของบันไดใต้ซุ้ม |
| asia | img/scene-asia-v3.png | 940,886 | 934,922 | พื้นขวาของบันได เว้นโคมและพุ่ม |
| west | img/scene-west-v2.png | 940,886 | 926,924 | พื้นหิมะขวาของบันได |
| cyberhell | img/scene-cyberhell-v2.png | 940,886 | 932,922 | พื้นขวาของบันได เว้นเสาไฟ |

พิกัดเป็นตัวเลือกจากการดู assets และตรวจ walk mask ยังเป็นงานที่ต้องตรวจภาพ browser ก่อนรับตำแหน่งสุดท้าย จุดเท้าอยู่ใกล้ขอบล่าง จึงตรวจด้านล่างที่ +8 px แทน +18 px ซึ่งเลยขอบภาพ 937 px

## เปลี่ยนอะไร

- `src/data.js`: พิกัด `CHALLENGE_STAND` แยก 4 โซน
- `src/scene.js`: จุดวาดบอส/ป้ายและ hitActor ใช้พิกัดโซน
- `src/proximity.js`: ปุ่มคุยตามบอส ใช้ระยะและ offset ป้ายเดิม
- `src/npc-stand.js`: วงกันทาง NPC ตามจุดใหม่
- `src/game.js`: ตรวจระยะคุยจากพิกัดโซน คงระยะ 150 px และเงื่อนไขเดิม
- `src/ui.js`: คลิกบอสและ walkTo ใช้พิกัดเดียวกัน คง INTERACTION_REACH 100 px
- `index.html`: ต่อท้าย UI module cache version ด้วย `-i2b`
- `tests/g3b-frontier-challenge.test.mjs`: ตรวจพิกัดทั้ง 4, จุดกด, ปุ่ม/ป้าย, ระยะคุย, การล็อก, path จากแท่นไปถึงบอส และเริ่ม wave 1 ของโซนถูกต้อง; ตรวจ cache suffix
- `tests/skill-atk.test.mjs`, `tests/west-hit-facing.test.mjs`: ยังคงตรวจ token เดิม แต่ยอมให้มี cache token ต่อท้าย

ไม่เปลี่ยน wave, stats, rewards, unlock flags หรือ combat handlers

## Browser ที่ยังตรวจไม่ได้

พยายามเปิด fixture แยกที่ `http://127.0.0.1:8779/AGAPAE%20Agent/Output/Codex/2026-10-11-i2b/browser-fixture.html?zone=th` ใน Brave พร้อม viewport 1600×900 แต่ browser security policy ปฏิเสธเนื่องจากสิทธิ์ URL ถูกปฏิเสธ จึงหยุด ไม่ใช้ browser/CDP/URL อื่นเลี่ยงการปฏิเสธ คืน viewport แล้วและลบ fixture ชั่วคราว

ไม่มีภาพก่อน/หลังจาก browser ทั้ง 4 โซน และไม่มีการกดคุย/เริ่มศึกใน browser ที่ยืนยันได้ ต้องตรวจป้ายบอส ซุ้ม และปุ่ม “พักพิจารณาคดี” ร่วมกับ camera จริง โดยเฉพาะจุดใกล้ขอบล่าง ก่อนรับงาน อย่าใช้ผล Node แทนหลักฐานภาพ

## Tests

- รอบแรก `node --test tests/*.test.mjs`: 729 รายการ, 725 ผ่าน, 4 ไม่ผ่าน (import MERCHANT ที่ตกหล่นในเทสต์ใหม่ 2 รายการ และ cache assertion เก่า 2 รายการ); เก็บใน `tests-initial.txt`
- หลังแก้ import: `node --test tests/g3b-frontier-challenge.test.mjs`: 26 ผ่าน, 0 ไม่ผ่าน; เก็บใน `coordinates-tests.txt` (ก่อนเพิ่ม cache suffix test)
- รอบสุดท้าย `node --test tests/*.test.mjs`: exit 0, 730 ผ่าน, 0 ไม่ผ่าน, 0 skipped; ใช้เวลา 86.063 วินาที; เก็บใน `tests.txt` (Node v26.7.0)
- `git diff --check`: ไม่มี whitespace error

## Self-check ตามเกณฑ์รับงาน

1. **ยังไม่ครบ** — ไม่มีภาพก่อน/หลัง browser 1600×900 ทั้ง 4 โซน จึงยังไม่ยืนยันว่าไม่ซ้อน UI
2. **ยืนยันเฉพาะระดับโค้ด** — เทสต์ใช้พิกเซลภาพจริงสร้าง walk mask (west ใช้ mask ไทยตามระบบเดิม), หาเส้นทางหลบวง NPC, ตรวจปุ่มคุยและเริ่มศึกทุกโซน แต่ยังไม่ได้เล่นผ่าน browser
3. **ครบในระดับเทสต์ที่รัน** — ทั้งชุด 730 ผ่าน, 0 ไม่ผ่าน; มีเทสต์พิกัดต่อโซนและ cache-bust `-i2b` ผลนี้ไม่ใช่การรับรอง QA ด้านภาพ
4. **บางส่วน** — มีรายงานและ test logs ในตำแหน่งหลักฐานภายใน worktree แต่ไม่มีภาพ browser ไม่ได้แก้ไฟล์ภาพเพื่อสร้างหลักฐานทดแทน
