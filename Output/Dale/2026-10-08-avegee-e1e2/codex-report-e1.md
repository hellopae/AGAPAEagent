# AVEGEE E1 — ผลแก้และหลักฐานตรวจ 8 ต.ค. 2026

ทำใน worktree ที่ตัวรันให้มา: `/Users/agapae/Documents/Work PAE/Claude/.codex-worktrees/20261007T192755Z-2f145222` บน branch `codex/20261007T192755Z-2f145222` ฐาน `d754481` ไม่ commit/merge/push/deploy ไม่ใช้ agent อื่น และไม่แก้ภาพต้นฉบับ hooks, status.json หรือ worklog.json

อ่านหัวข้อ A และกติการ่วมใน brief กลางแล้ว และเปิดดูภาพอ้างอิงทั้ง 4 ภาพจาก repo หลักโดยไม่เขียนลง `files/` ภาพอ้างอิงใช้ asset ก่อนชุด map-v5 จึงไม่ใช่ภาพสไปรท์เดียวกันทุกหลังกับฐานปัจจุบัน หลักฐานเปรียบเทียบทิศใช้ภาพอ้างอิงประกอบกับ draw flags ที่มีผลจริงในฐานนี้ ไม่มีการวาดภาพใหม่

## ทิศอาคาร

รวมค่า final flip ใน `STATION_FLIP` ที่ `src/data.js` ทั้ง tea และ renderer v5 ใช้ค่าจากจุดเดียว ไม่มี flip west/tarang ซ้ำใน `reviewStationBox` อีก

| โซน / อาคาร | flip ที่มีผลก่อน E1 | flip หลัง E1 | bx/by ที่ตรงกับอาคารที่วง |
|---|---:|---:|---|
| th / krata | false | true | 1443 / 503 |
| asia / lokan | true | false | 262 / 309 |
| asia / tea | true | false | 365 / 670 |
| asia / krata | false | true | 1443 / 503 |
| west / tarang | true | false | 1007 / 295 |
| west / krata | false | true | 1443 / 503 |
| west / tea | false | true | 218 / 674 |
| cyberhell / krata | false | true | 1443 / 545 |

station key ทั้ง 8 ตรงกับตำแหน่งที่วง ไม่มีการเปลี่ยน key ตามภาพ ค่าพิกัดใน brief เป็นจุดบนอาคารโดยประมาณในภาพที่มีขอบและย่อขยาย ไม่ใช่ bx/by ซึ่งเป็นกึ่งกลางขอบล่างของสไปรท์

ข้อที่ต้องระวัง: lokan และ tea ใช้ renderer เดิม จึงต้องเลิก flip asia ทั้งสองหลัง ส่วน west sala แม้เคยมี `def.flip=true` แต่ renderer v5 ไม่เคยใช้ค่านั้น ทิศที่แสดงจริงเป็น false ก่อน E1 และยังคง false หลัง E1 เพื่อไม่กลับอาคารนอกใบงาน ค่าตาราง final คือ th `[krata]`, asia `[krata]`, west `[krata,tea]`, cyberhell `[krata]` อาคารอื่นทิศเดิม

กรอบ alpha ที่ `bodyBoxOf` / `footOf` อ่านใช้ flip เดียวกับภาพวาด และ cache แยกตาม flip อยู่แล้ว จึงทำให้ click/block ตามภาพที่กลับด้าน พิกัดบริการของ 8 หลังคงเดิม: krata อยู่ฝั่งซ้ายของฐานหลังกลับ และ lokan asia อยู่ฝั่งขวาหลังเลิกกลับ; tea/tarang ใช้จุดกลาง ตรวจเส้นทางบนพื้นและ alpha จริงทั้ง 40 จุดแล้ว

## หอส่องกรรมโซน 4

- ก่อน: bx/by `(1360,650)`, จุดบริการ `(1360,664)`, ขนาด cap `155×130`
- หลัง: bx/by `(1560,675)`, จุดบริการ `(1530,685)`, cap `201.5×169` = 1.3×; ขนาดภาพจริงตาม aspect ratio ประมาณ `167.65×169`
- ขยับขวา 200 world units, ลง 25; bw 150 → 195 และปรับ fallback hit เป็น `[1459.25,480,1660.75,675]` ส่วน click ใน renderer ใช้ alpha body จริง `[1480.83,508.35,1641.50,672.65]`
- ใช้ `mapScale` เฉพาะ cyberhell; ย้ายโซนอื่นคืน bw, hit, bx/by, x/y และ scale โดยไม่สะสม offset
- `syncBlocks` เดิมอ่านฐาน/ตัวอาคารที่ขยายแล้ว และเปิดช่องบริการ 32 px จาก x/y ใหม่ลงพ้นฐาน จึงย้ายทางเข้าตามหอโดยไม่เปิดทางข้ามลาวาหรือน้ำเพิ่มเติม
- เส้นทางจาก `(835,680)` จบตรง `(1530,685)` ซึ่งเดินได้ และอยู่ในระยะเข้าใช้งาน 100 px ของ `mapInteractions`
- ตรวจกรอบ actor ที่จุดยืนปกติครบ 6 คน, boss ที่ท่าเรือ และ deck ท่าเรือ: ไม่ซ้อน body ของหอใหม่ ดู `render-checks.json`; ไม่ครอบคลุมทุกตำแหน่งสุ่มเดินเล่นของ NPC

## Preview และข้อจำกัด

ไฟล์ `e1-preview/th.png`, `asia.png`, `west.png`, `cyberhell.png` ขนาด 1678×937 ใช้ `src/scene.js` และ `src/art.js` จริง พร้อมพื้นหลัง/alpha ของ asset เดิม และ NPC ครบที่จุดยืนปกติ แสดงสถานีสร้างเสร็จทุกหลังและสถานะ event cleared เฉพาะใน harness เพื่อดูพื้นที่ได้ชัด ไม่แก้ event ในเกม

สร้างด้วย Skia Canvas ใน Node (`@napi-rs/canvas@1.0.10`) ไม่ใช่ browser screenshot ฟอนต์และ rasterization อาจต่างจาก browser เก็บสคริปต์ทำซ้ำ `e1-preview/render.mjs` และผลตรวจ `render-checks.json` ไม่มี dependency/cache ที่ติดตั้งชั่วคราวค้างในงาน

Playwright Chromium เปิดไม่ได้ใน sandbox (`MachPortRendezvousServer: Permission denied`) browser ในแอปไม่พร้อมใช้งาน และการตรวจสิทธิ์ของ browser ที่เชื่อมต่อปฏิเสธ localhost เพราะผู้ใช้ไม่อนุญาต ไม่ลอง browser ช่องทางอื่นหลังถูกปฏิเสธ ไม่ได้ทดสอบการกดปุ่มเข้า room ผ่าน UI browser จริง

## ไฟล์เปลี่ยน

- `src/data.js`: final flip table, geometry/scale/service หอโซน 4 และการคืนค่า
- `src/map-art-v5.js`: ใช้ def.flip กับ scale ใน draw box
- `tests/e1-building-flip.test.mjs`: เปลี่ยนทิศครบ 8 จุดเท่านั้น, ตาราง final, renderer box, ขยาย/ย้ายหอและคืนค่า
- `tests/30d.test.mjs`, `tests/ui28a.test.mjs`: เปลี่ยน expected ทิศเก่าที่ถูก E1 แทนที่ โดยคงการตรวจทิศและการเปลี่ยนโซน
- `tests/30f.test.mjs`: เปลี่ยน expected หอโซน 4 เป็น geometry ใหม่ ยังคงตรวจคืน geometry ของทั้ง 4 อาคารและเส้นทาง alpha เดิมครบ
- รายงานนี้ และ `e1-preview/`: 4 PNG, render harness, JSON หลักฐาน, logs ผลเทสต์/ตรวจ syntax

## เทสต์และ self-check ตามเกณฑ์รับงาน

1. **ทิศ / ตำแหน่ง / ใช้งาน:** เทสต์ยืนยัน toggles ครบ 8 จุด อาคารอื่นทิศเดิม; render-checks ยืนยัน click selection และเส้นทางถึงระยะบริการ 40/40 จุด รวมหอใหม่; ดู preview ครบ 4 โซนแล้ว หอใหญ่และขวากว่าเดิม ไม่มีการยืนยัน browser UI interaction หรือการอนุมัติภาพโดยผู้ใช้
2. **เทสต์:** `node --test tests/*.test.mjs` และ targeted `node --test tests/30f.test.mjs tests/e1-building-flip.test.mjs`; ผลสุดท้าย: full suite ผ่าน 478/478, targeted ผ่าน 7/7 ดู logs ในโฟลเดอร์ preview ตาราง flip/หอใหม่มี regression test เฉพาะ ไม่ผ่อนเกณฑ์เดินหรือเอา assertion เดิมออกเพื่อให้เทสต์ผ่าน ตรวจ syntax ทั้ง 51 ไฟล์ `src/*.js` exit 0 และ `git diff --check` exit 0
3. **ส่งมอบ:** มี preview 4 PNG และรายงานตาม path ที่กำหนด พร้อมวิธีทำซ้ำและหลักฐานตรวจ ไม่มี browser screenshot เนื่องจากข้อจำกัดที่อธิบายข้างต้น

ผลนี้เป็นผลเทสต์และตรวจ renderer ตามขอบเขตข้างต้น ไม่ใช่การรับรอง QA หรือการรับงานภาพขั้นสุดท้าย
