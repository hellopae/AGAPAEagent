# M2 — AVEGEE: ลดอาคารและย้าย st-lan ลงพื้นดิน

วันที่ 11 ต.ค. 2569 · ผู้ทำ Codex · ผู้ตรวจ Dale

**สถานะ: ยังไม่ครบเกณฑ์รับงาน และยังไม่รับรอง QA**

Worktree: `/Users/agapae/agapae-work/.codex-worktrees/20261011T091922Z-d0a3707a`
Branch: `codex/20261011T091922Z-d0a3707a`
ฐาน main ที่ตรวจ: `ec07870dc6e603eff4dbc080f52117b889ea58f1` (ตรงกับ HEAD ตอนเริ่ม ไม่มี local changes)
ไม่มี commit / merge / push / deploy ไม่เรียก agent ไม่แก้ hooks, status.json หรือ worklog.json ไม่แตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## สิ่งที่แก้

- ลดขนาดอาคารทั้ง 4 โซนลง 20%: map-v5 ผ่าน `mapScale` ส่วน lokan/tea ซึ่งใช้ theme-v4 ผ่าน `bw` รวม 44 อาคาร×โซน (map-v5 36)
- คง bx/by และพิกัดประตูของอาคารอื่น รวมทิศ flip และตัวคูณเดิมของ krajok CyberHell; reset ขนาดก่อน sync ป้องกันการย่อสะสม
- พื้นที่ชน H2 อ่าน alpha ตามขนาดใหม่ รวม cap ของ padding 6 → 4.8px และ cutoff 4 → 3.2px ใน `blockRectsOf` เท่านั้น ไม่แก้การวาด/ซูม
- จุดป้ายเข้าไปใช้ body/top เดิมที่ย่อตามภาพ; ระยะ station 100 → 80 และ frontier 105 → 84 ไม่เปลี่ยนระยะ NPC หรือปุ่มซ่อม
- ย้าย st-lan ทั้งอาคาร/ฐาน/กรอบคลิก/จุดงานในทั้ง 4 โซน: bx/by `(590,630)` → `(460,590)`, ประตูใหม่ `(455,605)`, จุดงาน `(460,566)` บนพื้นดินฝั่งซ้ายของธาร ไม่เปิด walk override บนลาวาหรือน้ำ
- ไม่มีการขยับ NPC/บอส: คอขวดพื้นระหว่างอาคารยังเล็กกว่าเกณฑ์แม้วัดโดยเอา NPC ออกแล้ว การขยับ NPC อย่างเดียวจึงไม่ทำให้ผ่าน
- cache-bust ที่ entry scripts preload/ui ต่อท้าย `-m2`

## ตารางอาคาร × โซน

map-v5 แสดงตัวคูณ mapScale เดิม → ใหม่; lokan/tea แสดง bw เดิม → ใหม่ซึ่งควบคุมขนาดภาพ legacy (ทั้งสองอย่างลดเหลือ 0.8 เท่า)

| อาคาร | th | asia | west | cyberhell |
|---|---|---|---|---|
| sala | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 |
| krata | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 |
| dab | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 |
| lokan | bw 255 → 204 | bw 255 → 204 | bw 255 → 204 | bw 255 → 204 |
| ngiw | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 |
| lan | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 |
| tea | bw 208 → 166.4 | bw 208 → 166.4 | bw 208 → 166.4 | bw 208 → 166.4 |
| tarang | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 |
| krajok | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 | 1.3 → 1.04 |
| sawan | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 |
| frontier | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 | 1 → 0.8 |

ตรวจ snapshot ก่อน/หลังเพิ่มเติม: body width และ height ทั้ง 44 รายการลดเหลือ 0.8 เท่าจริง; regression ตรวจ H2 bands ของ map-v5 ทั้ง 36 รายการย่อรอบฐานด้วยอัตราเดียวกัน

## ภาพก่อน/หลัง

ภาพต่อไปนี้เป็น **ภาพประกอบจาก asset เดิมและ geometry ของเกม พร้อม overlay ตรวจสอบ** ไม่ใช่ screenshot จาก browser หรือการรับรอง visual QA ในเกมสด พื้นที่แดงคือ H2 blocks สีเขียวคือ route ที่ findPath คืนและจุดประตู สีเหลืองคือจุดป้ายเข้าไป สคริปต์สร้างไฟล์ใหม่ใน run เท่านั้น ไม่แก้ไฟล์ภาพต้นฉบับ

| โซน | ก่อน | หลัง | มุมขวาล่างก่อน | มุมขวาล่างหลัง |
|---|---|---|---|---|
| th | [ภาพ](before-th.png) | [ภาพ](after-th.png) | [ภาพ](before-corner-th.png) | [ภาพ](after-corner-th.png) |
| asia | [ภาพ](before-asia.png) | [ภาพ](after-asia.png) | [ภาพ](before-corner-asia.png) | [ภาพ](after-corner-asia.png) |
| west | [ภาพ](before-west.png) | [ภาพ](after-west.png) | [ภาพ](before-corner-west.png) | [ภาพ](after-corner-west.png) |
| cyberhell | [ภาพ](before-cyberhell.png) | [ภาพ](after-cyberhell.png) | [ภาพ](before-corner-cyberhell.png) | [ภาพ](after-corner-cyberhell.png) |

อ่านภาพต้นฉบับ m2/m3/m5 ที่ใบงานอ้าง และตรวจฉากจริงทั้ง 4 โซนก่อนเลือกตำแหน่ง st-lan: th/asia/cyberhell เป็นเกาะล้อมลาวา; west เป็นเกาะล้อมน้ำในตำแหน่งเดียวกัน (runtime ใช้ฉาก th เป็น mask ของน้ำแข็ง) จึงเลือกย้ายอาคารทั้งหมดลงดิน ไม่ต้องวาดสะพานเพิ่มสำหรับ st-lan

## การเดินและจุดที่ยังติด

ใช้ `walk.buildWalk`, `findPath`, `stepTo` ของเกมจริง อ่านขนาด asset และ alpha ด้วย Pillow จริง (canvas shim สำหรับ Node ไม่มีการ fake พื้นที่เดิน) สร้างอาคารทุกหลังพร้อมกัน ทดสอบทั้ง spawn `(880,455)` และ zone-entry `(835,840)` รวม 88 กรณี โซน west ใช้ mask `scene-v2-opt.png` ตาม runtime

findPath คืนพิกัดประตูตรงทุก 88 กรณี แต่การคืนปลายทางไม่ได้พิสูจน์ว่าเดินจริงถึง: สคริปต์ตาม waypoint ใช้ระยะ <5px, sliding และ replan เหมือน `stepWorld` โดยก้าวละเอียด 1px ไม่ teleport ตรวจทุกตำแหน่งเท้ากับ terrain mask ที่สร้างโดยไม่ใส่ building holes และไม่ใส่ NPC เพื่อแยกปัญหาการเข้าถึงอาคารออกจากการเดินอ้อมคน

เดินจริงถึง 86/88 กรณี รวม st-lan ทุกโซนจากทั้งสอง spawn; เท้าที่ก้าวได้ไม่ผ่าน terrain ที่ห้ามเดิน มี 2 กรณีไม่ถึง:

1. **west/krata จาก `(835,840)`**: ติดที่ประมาณ `(1268.5174,507.5457)`; replan คืน waypoint ใกล้ `(1276,508)` แล้วติดซ้ำเกิน 20 ครั้ง
2. **cyberhell/tea จาก `(835,840)`**: ไม่จบเส้นทางภายใน 20,000 ก้าว (bounded movement regression)

ระหว่างตรวจ strict เส้น route ที่ interpolate ทุก 1px ยังพบ segment ใกล้หัวสะพานเล็ก `(602.11,431.73)` ต่ำกว่าขอบ WALK_OK y=432 เล็กน้อย; การตรวจเท้าที่ก้าวจริงใช้ sliding เพื่อไม่เดินเข้าช่องห้ามเดิน จึง **ไม่รับรองว่าเส้น polyline ทั้งเส้นไม่มีการตัดขอบ mask** สคริปต์ Node จำลองส่วนเดินของเกม ไม่ใช่ browser playtest

ยังไม่แก้ pathfinding/smoothing/replan ซึ่งเป็นตรรกะเกมนอกขอบเขตใบงาน และไม่เปิด mask ข้ามลาวาเพื่อทำให้ test ผ่าน

## ความกว้างช่องเดินขวาล่าง

วัด corridor ระหว่าง ngiw/krajok ใน ROI `[1340,500,1450,640]` ที่ความละเอียด 1px ด้วย distance transform + connectivity หาเส้นทางที่รองรับวงกลมขนาดใหญ่ที่สุด เอาช่องบริการทะลุตัวอาคารออก ตัวเลขเป็นความกว้างแบบ clearance ของทางนี้ ไม่ใช่ความกว้างทั้งหมดของโซน ไม่ใส่ NPC จึงเป็นขอบเขตด้านดีสุดสำหรับช่องนี้; วงรีสีส้ม/ฟ้าในภาพเป็นจุดบอส `(1390,690)` และ idle plerng `(1420,517)` อ้างอิง ไม่ใช่ snapshot สถานะเซฟ

ความกว้างสไปรท์ยมฯ คำนวณจาก `heroWalkSheet.frameSize` × ความสูง map ปัจจุบัน `92 × 0.8 = 73.6px` โดยไม่เปลี่ยนสเกลตัวละครหรือระบบซูม

| โซน | ช่องก่อน (px) | ช่องหลัง (px) | ตัวละคร (px) | เป้า 2× (px) | ผล |
|---|---:|---:|---:|---:|---|
| th | 18.8 | 50.9 | 34.6 | 69.3 | ยังไม่ถึง |
| asia | 11.9 | 45.9 | 37.4 | 74.8 | ยังไม่ถึง |
| west | 9.9 | 44.4 | 42.3 | 84.5 | ยังไม่ถึง |
| cyberhell | 23.9 | 58.2 | 38.1 | 76.3 | ยังไม่ถึง |

การย่อช่วยให้ช่องนี้กว้างขึ้น แต่ไม่ถึง 2× ในทั้ง 4 โซนภายใต้การคงฐานเดิม ต้องทบทวนข้อกำหนดฐานเดิม/ตำแหน่งอาคารขวาล่างหากต้องการช่องกว้างตามเป้า ไม่ย้ายอาคารอื่นหรือเปลี่ยน collision ให้เดินทับอาคารโดยพลการ

## Tests run

- `node --test tests/*.test.mjs` รอบสุดท้าย: **833 tests, 830 pass, 3 fail, exit 1** ([log](tests-final.log)); 3 fail คือ movement subtests 2 รายการข้างต้นและ parent test ที่นับ subtest failure ไม่ใช่ 3 จุดติด ชุดเดิม 743 tests ไม่มี failure หลังปรับ expectation ให้ตรง geometry/cache ใหม่
- `node --test tests/m2-map-access.test.mjs` หลายรอบ: พิสูจน์สัดส่วน H2/ฐาน/ป้าย/ระยะเข้าไป/reset; พบการเดินติดซึ่งเก็บ regression ไว้ ไม่ตัด assertion เพื่อให้ suite เขียว
- focused suite ของ 30F / E1 / scene-zones / construction-arrival / skill-atk / west-hit และ M2 ([log](focused-tests.log)) ใช้ระหว่างแก้ expectation; ผลระหว่างทางไม่ใช่ผลรอบสุดท้าย
- `node scripts/m2-map-audit.mjs before` รันก่อนแก้ production และ `node scripts/m2-map-audit.mjs after` หลังแก้ เพื่อเก็บ geometry/routes/mask
- `python3 scripts/m2-map-evidence.py`: สร้างภาพและ [measurement](corridor.json); ตรวจภาพ montage หลังทั้ง 4 โซนแล้ว ยังไม่มี browser screenshot
- ตรวจ body dimensions จาก before/after snapshot: ทั้ง 44 รายการ width/height = 0.8 ของเดิม
- `git diff --check`: ไม่มี whitespace error

## ไฟล์ที่เปลี่ยน

Production: `src/data.js`, `src/art.js` (เฉพาะ collision bands), `src/proximity.js` (ค่าระยะต่อ target), `index.html` (cache suffix)

Regression ที่ปรับค่าตาม geometry/cache: `tests/30f.test.mjs`, `tests/e1-building-flip.test.mjs`, `tests/scene-zones.test.mjs`, `tests/construction-arrival.test.mjs` (เปลี่ยน regression ที่เคยบันทึก lan ติดเกาะเป็นตรวจว่าถึงจุดบนดิน), `tests/skill-atk.test.mjs`, `tests/west-hit-facing.test.mjs`

เพิ่ม: `tests/helpers/m2-map.mjs`, `tests/m2-map-access.test.mjs`, `scripts/m2-map-audit.mjs`, `scripts/m2-map-evidence.py`, และหลักฐาน/รายงานใน `output/Codex/m2-20261011/`

## Self-check ตามเกณฑ์รับงาน

| เกณฑ์ | ผลตรวจ |
|---|---|
| 1. ตารางอาคาร×โซน และภาพก่อน/หลังทั้ง 4 โซน | มีตาราง 44 รายการและภาพครบ; เป็น composite จากข้อมูลเกม ไม่ใช่ browser screenshot |
| 2. เดินจริงจากจุดเกิดถึงทุกประตูโดยไม่ผ่านลาวา/น้ำ | **ยังไม่ผ่าน**: 86/88 ถึง, 2 กรณีติด และไม่รับรอง polyline ไม่ตัดขอบ mask; st-lan ทั้ง 8 กรณีถึงบนดิน |
| 3. ช่องขวาล่างอย่างน้อยประมาณ 2× ตัวละคร | **ยังไม่ผ่าน**: 44.4–58.2px เทียบเป้า 69.3–84.5px; ภาพและตัวเลขครบ ไม่มีการขยับ NPC/บอส |
| 4. node suite ผ่านหมด, cache -m2, report.md | **ยังไม่ผ่านทั้งข้อ**: cache/report มีแล้ว แต่ suite exit 1 ตามรายละเอียด |

ไม่สรุปว่างานรับได้หรือ QA ผ่าน ต้องให้ Dale ตรวจส่วนที่ทำและตัดสินขอบเขตแก้ปัญหาที่เหลือ
