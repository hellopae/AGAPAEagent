# AVEGEE E2 — Frontier navigation · 2026-10-08

งานอยู่ใน worktree `/Users/agapae/Documents/Work PAE/Claude/.codex-worktrees/20261007T192815Z-131b31b8` และ branch `codex/20261007T192815Z-131b31b8` จากฐาน `d754481`.

สถานะ: ส่งโค้ดสกัด polygon, preview และหลักฐานทดสอบแล้ว แต่เกณฑ์พิกัดศัตรู/บอสของ event ยังตรวจได้ไม่ครบ เพราะ runtime ปัจจุบันไม่มีพิกัดเหล่านั้นในฉากเดิน ส่วน cyberhell เป็นร่างที่รอคุณเป้อนุมัติ จึงยังไม่สรุปว่า QA ผ่าน.

## ไฟล์ที่เปลี่ยน

- `scripts/extract-frontier-nav.py` — สกัดภาพต้นฉบับแบบอ่านอย่างเดียว, register กับพื้นหลังจริง, สร้าง outer/holes, ลดจุดด้วย Douglas–Peucker และสร้างภาพเปรียบเทียบจาก `FRONTIER_NAV` ที่ runtime export จริง.
- `src/frontier-navigation.js` — แทน geometry ทั้ง 4 โซน พร้อมชื่อภาพต้นฉบับ/วันที่; ใช้ระบบ blocker และ pathfinding เดิม.
- `tests/e2-frontier-nav.test.mjs` — ตรวจ runtime anchors, เส้นทางศัตรูสุ่ม, ค่าความคลาดเคลื่อน, SHA-256 ของ geometry และระยะคลาดจากการลดจุด.
- `tests/frontier-navigation.test.mjs` — ย้ายจุดเริ่มของเทสต์เดินอ้อมหอคอยจาก `[.15,.32]` ซึ่งภาพใหม่ทาแดง ไป `[.145,.265]` ซึ่งอยู่บนพื้นเดินได้; เพิ่ม assertion ว่าจุดเริ่มเดินได้. เงื่อนไขหอคอย/รั้วเดินไม่ได้, ต้องเดินอ้อมมากกว่า 1 ช่วง และตรวจทุก segment ยังอยู่ครบ.
- `output/Codex/e2-preview/` — ภาพ overlay 4 โซน, binary walkable mask, reference mask, comparison, overview, metrics และ log ทดสอบ.
- `output/Codex/2026-10-08-avegee-e2.md` — รายงานนี้.

ไม่มี commit, merge, push หรือ deploy; ไม่มีการเรียก agent อื่น. ภาพต้นฉบับใน `files/` ถูกอ่านเท่านั้น.

## วิธีสกัดและความตรงกับภาพ

พื้นหลัง runtime คือ `img/theme-v4/frontier-{th,asia,west,cyberhell}.webp` ตาม `themeBackground()` ใน `src/theme-assets.js`. ภาพจริงมีขนาด 1678×937 (west 1679×937); สกรีนช็อตทาแดงมีขนาด 2500×1365.

ใช้ SIFT + RANSAC จับคู่รายละเอียดที่มองเห็นของพื้นหลัง แล้วหา affine แบบ scale/rotation/translation. Scale ของ th/asia/west = 1.489825 / 1.489805 / 1.488840; offset (x,y) ≈ (0.454,-0.734) / (0.964,-1.171) / (0.280,-0.474) พิกเซลสกรีนช็อต. Inliers = 1866 / 2292 / 3438; median registration error = 0.282 / 0.218 / 0.218 พิกเซลสกรีนช็อต. Matrix เต็มอยู่ใน `extraction-metrics.json`.

การตรวจสีแดงใช้ความต่างจากพื้นหลังเดิมในตำแหน่งเดียวกัน จึงแยกไฟ/ลาวาสีแดงเดิมใน th ได้ดีกว่าการตรวจ HSV ของภาพเพียงอย่างเดียว. ทำ median 5 px + closing 7 px เพื่อลด JPEG noise, เก็บพื้นที่เดินที่เชื่อมกับลานหลัก, เติมช่องเล็กในสีทาแดงที่เกิดจาก highlights และกำจัด red specks ขนาดต่ำกว่า 500 px². กล่องตัวละครในสคริปต์แยกเป็นรายโซน; รอยบนยักษ์/นิรา/ยมบาท/ศัตรูจึงไม่กลายเป็น permanent holes. พื้นที่ใต้ HUD, กล่องตัวละคร และส่วนล่างที่สกรีนช็อตไม่ครอบคลุมถูกตัดออกจากตัวหารการวัด.

| โซน | ไม่ตรงกับ mask สีที่ตรวจพบ | ไม่ตรงกับ reference หลัง cleanup | พื้นที่ตัดออก/ไม่เห็น | คลาดขอบหลังลดจุดสูงสุด | จุด outer / จุดแต่ละ hole |
|---|---:|---:|---:|---:|---|
| th | 2.878% | 0.628% | 15.062% | 14.0 px | 147 / 4,4 |
| asia | 1.140% | 0.754% | 15.516% | 5.0 px | 267 / 18,40 |
| west | 2.832% | 2.237% | 15.433% | 5.0 px | 308 / 9,13,8,7,9 |

ตัวเลขสองคอลัมน์แรกคือ XOR pixels ÷ pixels ที่วัดได้ ×100. คอลัมน์แรกเทียบ mask หลังตรวจสี/median/closing/ยกเว้นตัวละคร ก่อนเก็บ connected floor และเติมช่อง highlights; คอลัมน์ที่สองเทียบ reference หลัง cleanup ก่อนเปิด portal corridors. ทั้งสองคอลัมน์นับความต่างจากการเปิดประตู/บันไดและ edge clearance ด้วย. ตัวเลขนี้เป็นผลจากวิธีสกัดที่ระบุ ไม่ใช่ค่าที่วัดจาก ground-truth mask แบบ binary ที่คุณเป้จัดให้ และไม่ครอบคลุมพื้นที่ที่ตัดออกประมาณ 15%.

Douglas–Peucker epsilon = 0.25% ของความกว้าง (ประมาณ 4.2 px). วัดระยะขอบแบบสองทิศทางจาก raster ก่อน/หลัง simplification เพิ่มด้วย distance transform; สูงสุดทั้ง 3 โซนน้อยกว่า 1% ความกว้าง (16.78–16.79 px).

ข้อปรับ geometry ที่ระบุไว้ในสคริปต์:

- เปิดทางประตูบน `x=.475–.525, y=.10–.19` และบันไดกลางล่าง `x=.465–.535, y=.80–1` ให้เชื่อมกับลาน. ภาพ west ทาแดงทับบันไดล่าง แต่ brief กำหนดให้เชื่อม; ส่วนนี้ถูกนับเป็น mismatch.
- เก็บ edge clearance ที่ขอบหอคอยซ้าย th ประมาณ 6 px และตีนรั้วขวาประมาณ 16 px ตามช่วงพิกัดในสคริปต์.
- cyberhell ร่างจาก `frontier-cyberhell.webp` และอ้างฉาก `Map-Zone4-2.jpg`: ลานกลาง/ประตู/บันไดกลางเชื่อมกัน ส่วนรั้ว คริสตัล อาคาร และบันไดข้างถูกทาแดง. ยังไม่มี reference สีแดงที่คุณเป้อนุมัติ.

## Preview สำหรับตรวจภาพ

- [ภาพรวม 4 โซน](e2-preview/frontier-overview.png)
- [th overlay](e2-preview/frontier-th-overlay.png) · [asia overlay](e2-preview/frontier-asia-overlay.png) · [west overlay](e2-preview/frontier-west-overlay.png) · [cyberhell overlay](e2-preview/frontier-cyberhell-overlay.png)
- [ภาพทาแดงโซน 4 รออนุมัติ](e2-preview/Map-Zone4-frontier-mask-draft.png)
- `frontier-{th,asia,west}-comparison.png`: สกรีนช็อตที่จัดแนวแล้ว; สีม่วงแสดง pixel ที่ runtime polygon ต่างจาก reference หลัง cleanup ในส่วนที่วัดได้.
- [ค่าการสกัดและ hash](e2-preview/extraction-metrics.json)

ตรวจดู overview แล้ว รวมถึงแก้รอยเขาของปีศาจ asia ที่รอบแรกถูกสกัดเป็น hole ผิด. การดูภาพนี้ยังไม่แทนการอนุมัติร่างโซน 4 ของคุณเป้.

## ผลทดสอบ

| คำสั่ง | ผล |
|---|---|
| `python3 scripts/extract-frontier-nav.py --write-nav` | สร้าง geometry/preview สำเร็จ |
| `python3 scripts/extract-frontier-nav.py` | สร้าง metrics/preview จาก geometry runtime ปัจจุบันสำเร็จ |
| `node --test tests/e2-frontier-nav.test.mjs` | 12 tests: 11 pass, 0 fail, 1 skip |
| `node --test tests/*.test.mjs` | 488 tests: 487 pass, 0 fail, 1 skip |
| `node --check` ทีละไฟล์ใน `src/*.js` | exit 0 ครบ 51 ไฟล์ |
| `node --check` สำหรับไฟล์ทดสอบทั้งสอง | exit 0 |
| Python syntax compile | สำเร็จ |
| `git diff --check` | exit 0 |

Skip เป็นการตรวจ source-mask discrepancy ของ cyberhell ซึ่งยังไม่มี approved source. Log อยู่ที่ `e2-preview/tests-e2.log`, `tests-full.log`, `syntax-check.log`.

เทสต์เส้นทางอ่านจุดเริ่มจาก `frontierSession()` และอ่าน GATE/NIRA/GUARD รวมทั้ง spawn ranges จาก `src/frontier.js` เพื่อกัน fixture หลุดจาก runtime. ตรวจ anchors, จุดประตูบน/บันไดล่าง, ปลายช่วง spawn `.47–.53` ที่ `y=.955`, และ grid ตัวอย่าง 13×7 จุดครอบคลุมช่วงสุ่มศัตรู `.20–.80, .47–.70` โดยตรวจทุก destination ที่ runtime ยอมรับ. ทุกเส้นทางต้องจบที่ target เดิมจริงและทุก segment ต้องอยู่บนพื้นเดินได้.

ข้อจำกัดเรื่องศัตรู/บอส event: `ZONE_EVENTS` ใน `src/data.js` เก็บ waves และชนิดศัตรูของ `frontierBreach`, `asiaRageBreach`, `westVampireBreach`, `cyberBreach` แต่ไม่มี world x/y. `openFrontier()` ใน `src/ui.js` เข้าฉาก battle ของ event โดยตรง; `makeFrontierWalk()` สร้างศัตรูธรรมดาแบบสุ่ม. จึงตรวจพิกัดศัตรูสุ่มในฉากเดินได้ แต่ยังพิสูจน์ว่า “ศัตรู/บอสทุกตัวใน event ยืนในพื้นที่เดินได้” ไม่ได้. พิกัดเหล่านั้นต้องมีจากงาน event placement ก่อน จึงเพิ่มการตรวจกับข้อมูลจริงได้.

## Self-check ตามเกณฑ์รับงาน

1. **Overlay th/asia/west ตรงและ mismatch <3%:** ผลเชิงตัวเลขในพื้นที่ที่วัดได้เป็น 2.878% / 1.140% / 2.832% จาก mask ตรวจสี; มีข้อจำกัดการยกเว้น HUD/ตัวละคร/ส่วนภาพที่ไม่เห็นตามตาราง. ส่ง comparison ให้ตรวจด้วยภาพแล้ว.
2. **Start, ศัตรู/บอส event ทุกตัว, ทางเข้า/ออก เดินได้และหา path ถึงกัน:** start/anchors/portal/spawn และตัวอย่างจุดสุ่มผ่านเทสต์. **ยังไม่ครบ** ส่วน event enemy/boss positions เพราะ runtime ไม่มีพิกัดโลกเหล่านั้น.
3. **ร่าง mask โซน 4 + preview 4 โซน + เทสต์เดิม + รายงาน:** ไฟล์ครบและชุดรวมไม่มี fail หลังแก้ fixture จุดเริ่มที่ขัดกับภาพใหม่ โดยคงทุกเงื่อนไข obstacle/detour เดิมและเพิ่ม walkable-start assertion. **ร่างโซน 4 ยังรอคุณเป้อนุมัติ**; ไม่สรุป QA ผ่าน.

## วิธีรันซ้ำ

ต้องมี Python 3, OpenCV (`cv2`), NumPy และ Node.js. รันจาก worktree:

```sh
python3 scripts/extract-frontier-nav.py --write-nav
node --test tests/e2-frontier-nav.test.mjs
node --test tests/*.test.mjs
```

ใช้ `--source-dir '/path/to/UI map'` เมื่อย้ายตำแหน่งภาพต้นฉบับ. การรันโดยไม่ใส่ `--write-nav` สร้าง preview/metrics จาก `FRONTIER_NAV` ที่ใช้จริง และไม่แก้ไฟล์ runtime.
