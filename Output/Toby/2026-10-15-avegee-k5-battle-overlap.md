# AVEGEE K5 — กล่องคำแนะนำ/flyout หน้าต่อสู้ไม่บังศัตรู (Toby, 15 ต.ค. 2569)

repo `/Users/agapae/agapae-work/AVEGEE` · worktree `../.toby-worktrees/k5` · branch `toby/k5-battle` · commit `83cf1a2` (rebase บน origin/main `0f771f2` = K1d แล้ว ไม่ merge — รอ Dale รีวิว)

## สิ่งที่ build
- กล่องคำแนะนำ "คลิกศัตรูบนสนาม..." เป็นแถบบางใต้เมนู (หรือข้างเมนูถ้าที่ไม่พอ) คำนวณจากตำแหน่งจริงของศัตรู ไม่ใช่ค่าตายตัว
- flyout พลัง/ไอเท็ม เลือกตำแหน่ง (ขวา/ซ้าย/เลื่อนลงใต้แถวศัตรู) และความกว้างจากตำแหน่งจริง; ชื่อยาวใช้ ellipsis ท้ายคำ (ไม่ตัดกลางคำ)
- เมนูหลักแคบลง/ลงต่ำกว่าแถวศัตรูอัตโนมัติเมื่อมีศัตรู 3 ตัว (เดิมแถบเมนูทับแถบ HP ตัวแรก) สไตล์ K2 (เอียง/ขั้นบันได/สี) ไม่เปลี่ยน
- ตัวคำนวณเป็นฟังก์ชันล้วน `planPlacement()` (obstacle แข็ง = sprite/ป้ายชื่อ/HP ศัตรู/HUD บอส, obstacle อ่อน = ทีมเรา/กล่องบทพูด/timeline)
- แก้เล็กในขอบเขตเดียวกัน: ป้ายในกล่องคำแนะนำเคยติดกัน "ลูกไฟMP 8" -> "ลูกไฟ"; หัวเมนู "ยมบาทน้อย / Yama" ไม่ตัดบรรทัด
- cache-bust `-k5` (ui.js, battle-turns.css; index + output/game-review)

## ไฟล์ที่แตะ
`src/battle-menu-layout.js` (ใหม่) · `src/ui.js` (เฉพาะ placeMenu ของ battle9 + import + label 1 บรรทัด) · `src/battle-turns.css` (ต่อท้าย) · `index.html`, `output/game-review/index.html` (เฉพาะ `?v=` ของ ui.js/battle-turns.css) · `tests/k5-battle-layout.test.mjs` (ใหม่ 8 ข้อ) · regex cache suffix ใน `tests/k2-menu|skill-atk|west-hit-facing.test.mjs` รับ `-k5`
ไม่แตะ: `drawStandee`/sprite ยม, `town-*`, `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## ผลที่รันเอง
- ภาพ 1678x937 DPR2 (Playwright Chromium, `output/game-review/index.html`) 4 แบบ x 3 สถานะ (เปิดพลัง / เปิดไอเท็ม / เลือกพลังแล้ว=กล่องคำแนะนำ) ที่ `/tmp/k5/final/`:
  - `k5-1foe-sheet.jpg`, `k5-2foe-sheet.jpg`, `k5-3foe-sheet.jpg`, `k5-boss-sheet.jpg` (3 สถานะซ้อนกัน) และไฟล์ดิบ `k5-{1foe,2foe,3foe,boss}-{power,item,chosen}.png`
  - ตรวจด้วยตาทุกภาพ + วัด rect ใน DOM: ไม่มีเมนู/flyout/กล่องคำแนะนำทับ sprite, ป้ายชื่อ, แถบ HP ศัตรู หรือ HUD บอส (ทั้ง 12 สถานะ)
  - เพิ่ม: บอสโซนบูรพา (บอส+ลูกสมุน 3 ตัว) ไม่ทับเช่นกัน · 390x844 (ศัตรู 3 ตัว) `k5-m390-3foe-{power,chosen}.png` ไม่ทับศัตรู (กล่องคำแนะนำไปอยู่ซ้ายเมนูและบังตัวยมบาทน้อยบางส่วน — ยอมให้บังทีมเรามากกว่าศัตรู)
- คลิกจริงด้วย `page.mouse.down/up` หลังเลือกพลัง คลิกกลางตัวศัตรู: 1 ศัตรู 10/10, 2 ศัตรู 10/10 (สลับตัว), 3 ศัตรู 10/10 (วนครบ 3 ตัว), บอส 10/10 — ทุกรอบ `elementFromPoint` = ปุ่มศัตรู และ HP ศัตรูลดจริง · รันซ้ำหลัง rebase 3/3
- `node --test tests/*.test.mjs` = 939/939 ผ่าน (หลัง rebase บน K1d)

## วิธีรัน/ทดสอบเอง (Kittanate)
```
cd /Users/agapae/agapae-work/.toby-worktrees/k5 && python3 -m http.server 8791
```
เปิด `http://localhost:8791/index.html` แล้วเล่นไปสู้ผี/บอสตามปกติ (ศัตรู 1/2/3 ตัว และบอสโซน) — ภาพ/ตัวเลขข้างบนมาจากสคริปต์ Playwright ของ Toby (`/tmp/k5/run.py`, `/tmp/k5/clicks.py`) ที่เปิดฉากสู้ผ่านหน้า review เพราะ `openBattle` ไม่ถูก export
สิ่งที่ต้องดู: กด "พลัง" -> flyout ไม่ทับป้าย/แถบ HP ศัตรู · กดท่า -> แถบคำแนะนำไม่บังศัตรู · คลิกที่ตัวศัตรูต้องโจมตีทันที

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มี (ไม่ได้แตะอาร์ต)

## สิ่งที่ยังไม่ทำ / ข้อสังเกต
- ตำแหน่ง flyout/แถบอาจต่างกันเล็กน้อยระหว่างโหมด 1/2/3 ศัตรู (ซ้าย/ขวา/ใต้แถวศัตรู) เพราะเลือกอัตโนมัติจากที่ว่างจริง — ถ้าเจ้าของอยากล็อกด้านเดียวให้บอก
- ตอนเปิดฉากต่อสู้ครั้งแรก ปุ่มเมนูกดไม่ติดอยู่ช่วงสั้นๆ (~2 วินาที ตรวจพบตอนสคริปต์คลิกเร็วเกินไป `elementFromPoint` ได้ HTML) — ไม่ได้สืบสาเหตุ ไม่ใช่ของ K5 แต่ Chris ควรดูตอน QA
- ไม่ได้วัดบนเครื่องจริง/เบราว์เซอร์อื่นนอกจาก Chromium
