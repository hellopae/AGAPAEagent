# M1 — AVEGEE canvas map zoom

วันที่ 11 ต.ค. 2569 · ผู้ทำ Codex · ผู้ตรวจ Dale

สถานะ: แก้ implementation และตรวจด้วย automated tests แล้ว; ยังไม่ครบเกณฑ์รับงานด้านภาพจริงและการเล่นในเบราว์เซอร์ ไม่รับรอง QA

## พื้นที่ทำงานและฐาน

- Worktree: `/Users/agapae/agapae-work/.codex-worktrees/20261011T091920Z-8340a2e9`
- Branch แยกที่มีอยู่แล้ว: `codex/20261011T091920Z-8340a2e9`
- HEAD / local main / remote main ที่ตรวจด้วย `git ls-remote origin refs/heads/main`: `ec07870dc6e603eff4dbc080f52117b889ea58f1`
- ไม่ commit, merge, push, deploy หรือเรียก agent อื่น

## ต้นเหตุที่ยืนยัน

`src/ui.js:updateMapCamera()` เดิมใช้ CSS translate/scale กับ `.scene-box` ทั้งกล่อง ขณะที่ `src/scene.js:render()` ตั้ง backing canvas เป็น SCENE.w × SCENE.h (1678×937) ทุกเฟรม จึงขยาย bitmap ที่วาดเสร็จแล้วเมื่อซูม 2.5× และไม่ได้ใช้ DPR ของจอ

renderer เดิมตั้ง `imageSmoothingEnabled=false` หลังวาดพื้น ทำให้ตัวละครและวิญญาณที่ย่อจากไฟล์จริงแสดงขอบเป็นจุด อ่านภาพอ้างอิง m4.png แล้วพบลักษณะเดียวกัน โค้ดใน `src/art.js` ใช้ Image ต้นฉบับใน drawStandee/drawSoul/drawHeroWalk/drawCrewWalk/drawBuilding อยู่แล้ว จึงไม่จำเป็นต้องแก้ภาพหรือ renderer ที่ใช้ร่วมกับห้องและศึก

## สิ่งที่เปลี่ยน

- canvas ครอบ viewport ของ stage โดยคงกรอบพิกัดฉากเดิมไว้สำหรับชั้น DOM
- backing = ขนาด CSS ของ viewport × devicePixelRatio, cap 2; เปลี่ยน width/height เฉพาะเมื่อขนาดจริงเปลี่ยน
- ฉากวาดด้วย `ctx.setTransform()` จากกล้องในหน่วย CSS และสัดส่วน backing จริง รวมกรณีปัดเศษ DPR
- คง zoom 1× ↔ 2.5×, exponential follow 130ms, reduced-motion และ clamp ขอบภาพ
- `toScene()` กลับ projection เดียวกันสำหรับ mouse/click ซึ่ง handler เดิมใช้ต่อได้
- `#ov` และ `.fabs` ใช้ CSS transform เฉพาะ DOM ให้ตรงกับกล้อง โดยไม่ขยาย canvas เป็น bitmap
- smoothing ของ renderer แผนที่เป็น enabled / high สำหรับพื้นและสไปรต์ทุกชนิด
- พื้นวาดจาก decoded Image ต้นฉบับโดยตรง ตัด intermediate canvas ที่ความละเอียดคงที่ออก; ไม่เพิ่ม offscreen อาคารเนื่องจากยังไม่มี profiling ที่ชี้ว่าจำเป็น
- ต่อ cache version ของ UI และ scene ด้วย `-m1`; ปรับ 2 assertion ที่ตรวจท้าย version แบบตายตัว

## ไฟล์ที่เปลี่ยน

- `src/ui.js` — กล้อง canvas กับ DOM projection
- `src/scene.js` — viewport backing, transform, smoothing, pointer inversion
- `index.html` — cache-bust UI
- `tests/m1-map-zoom.test.mjs` — regression tests ใหม่
- `tests/skill-atk.test.mjs`, `tests/west-hit-facing.test.mjs` — ท้าย cache version
- `output/m1/report.md`, `output/m1/node-tests.txt`, `output/m1/browser-attempt.txt` — รายงานและหลักฐานการรัน

## การทดสอบที่รันจริง

1. `node --test tests/m1-map-zoom.test.mjs`: 3 ผ่าน, 0 ล้มเหลว
   - กล้องที่ขอบภาพและ pointer round trip ที่ 1×, ระหว่างซูม, 2.5× สำหรับจอแนวนอน/แนวตั้งและ letterbox
   - DPR 1 / 1.5 / 2 / 3, cap 2, resize เมื่อ viewport เปลี่ยน, ไม่ resize ซ้ำในเฟรมถัดไป และ smoothing high
   - execute `updateMapCamera()` จริงด้วย DOM fixture: canvas, ป้าย DOM และปุ่ม `.fabs` ใช้ projection ตรงกันระหว่างซูม ตามตัว ไปขอบภาพ และซูมกลับ; ตรวจค่า easing 130ms
2. `node --test tests/*.test.mjs` หลังการแก้ครั้งสุดท้าย: exit 0, 746 tests, 746 ผ่าน, 0 ล้มเหลว, 0 ข้าม, เวลา 28829.40342 ms ผลเต็มอยู่ใน `node-tests.txt`
3. `git diff --check`: exit 0

การรันทั้งชุดครั้งแรกพบ 2 assertion ที่ cache version จบที่ `-i2b` จึงปรับให้จบที่ `-i2b-m1` ตาม requirement แล้วรันทั้งชุดอีกครั้งจนได้ผลข้างต้น

## Self-check ต่อเกณฑ์รับงาน

| เกณฑ์ | หลักฐาน / สถานะ |
|---|---|
| 1. ภาพก่อน/หลัง 2.5× จุดเดียวกัน วิญญาณข้างบัลลังก์ ยมฯ อาคาร ทั้ง 4 โซน | **ยังไม่ยืนยัน** ไม่มีภาพก่อน/หลังที่เก็บสำเร็จ ห้ามใช้ผล unit tests แทนการตรวจความคมจริง |
| 2. คลิก/เดิน/ป้ายเข้าไปและคุยตรงตำแหน่งทั้ง 1× และ 2.5× | **ยืนยันเฉพาะ projection ใน automated tests** ทดสอบพิกัด click กับ DOM และกล้องจริงใน fixture แล้ว การคลิก/แตะ/เดินและป้ายในเบราว์เซอร์จริงยังไม่ได้ตรวจ |
| 3. node --test tests/*.test.mjs ผ่านหมด และ cache-bust -m1 | **ตรวจแล้ว** 746/746, exit 0; UI URL ลงท้าย -m1 และ scene import ลงท้าย -m1 |

Self-check ข้อกำหนดอื่น: โค้ดรองรับ DPR capped 2 และ smoothing high แล้ว; ยังไม่ได้วัด 60fps บนเครื่อง dev จึงไม่อ้าง performance ผ่าน ไม่แก้ภาพ/ตำแหน่ง/ขนาดอาคาร ไม่แก้ data.js/map-art-v5.js/art.js หรือ logic ฉากต่อสู้/ห้อง/Home ไม่แตะ hooks/status.json/worklog.json หรือโฟลเดอร์ AVEGEE ที่ใบงานห้าม รายงานและหลักฐานอยู่ใน worktree ไม่อยู่ใน /tmp

## ข้อจำกัดของหลักฐานเบราว์เซอร์

การเปิด Chrome และ Chromium headless shell จาก restricted shell ออกด้วย SIGABRT ก่อนสร้างหน้า จึงไม่มี screenshot หรือ timing จากวิธีนี้ จากนั้นลองแท็บใหม่ของเบราว์เซอร์ที่เชื่อมต่อ แต่ระบบปฏิเสธการเปิด `http://127.0.0.1:8765` โดยระบุว่า “The user declined permission for this action.” จึงหยุดการใช้เบราว์เซอร์ ไม่ลองช่องทางอื่นอ้อมการปฏิเสธ ปิดแท็บและหยุด local server แล้ว ลบ dependencies/harness ชั่วคราวที่สร้างเอง เหลือบันทึกสั้นใน `browser-attempt.txt`

งานตรวจรับที่เหลือคือภาพก่อน/หลังทั้ง 4 โซน ณ viewport/DPR/เวลา/ตำแหน่งเดียวกัน, ทดลองเดิน/คลิก/แตะ/ป้ายจริงที่ทั้งสองระดับซูม รวม resize และวัด frame time ขณะเล่นบนเครื่อง dev พื้นแผนที่ยังจำกัดด้วยต้นฉบับ 1678×937 ตามใบงาน
