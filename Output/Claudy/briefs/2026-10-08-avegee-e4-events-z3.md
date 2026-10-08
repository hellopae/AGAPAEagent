# ใบงาน E4 (Codex): AVEGEE — ลำดับ event โซน 3 ตามสตอรีบอร์ด

**รันหลัง E3 merge แล้วเท่านั้น** (ใช้ระบบ "เทวดายืนรอบนแผนที่" จาก E3 — ดูรายงาน E3)
**อ่านก่อน:** `Output/Claudy/briefs/2026-10-08-avegee-ev-storyboard.md` หัวข้อ C โซน 3 + "กติการ่วม" · ภาพ Map-Zone3-1..3-4

## ขอบเขต
1. **เปิดโซน 3 ใหม่** (แทนเนื้อ `westHypnotized` — คง key เดิม): มาถึงโซน → บนแผนที่มีแค่ Taan กับพ่อค้านรกยืนฝั่งซ้าย ถูกปีศาจ 3 ตัวรุม (โครงกระดูก 2 + มนุษย์หมาป่า 1 — ใช้ kind ศัตรูตะวันตกที่มี) · NPC/ยมทูตอื่นยังไม่โผล่ · เดินเข้าใกล้ → เข้าศึก ฝั่งเรา = yama + Taan · ชนะ → ทุกคนกลับมาตามปกติ + สร้างสถานที่ได้ (ล็อกสร้างเดิม `build.westBlocked` ยังใช้ได้ แก้ข้อความให้ตรงเรื่องใหม่) · ปรับ title/alert ไทย+อังกฤษ
2. หลังคดีที่ 3: วิญญาณบนแผนที่ **หยุดนิ่งทั้งหมด** มี "!!!" เหนือหัว + หน้าต่างแจ้งเตือนว่ามีปีศาจทรงพลังบุกชายแดน ทำให้วิญญาณในดินแดนโดนผลกระทบ · หยุดนิ่งจนกว่าชนะ `westVampireBreach`
3. `westVampireBreach`: เดินลงชายแดนเข้าใกล้ → `frontier-west-intro-v1` → 3 wave + แวมไพร · ชนะ = hypno (ของเดิม)
4. `westDevaTest` หลังคดีที่ 7: เทวดาวิ่งเข้ามาจากล่าง (ประตูชายแดน/บันได) ขึ้นมาหน้าบัลลังก์ → cutscene `img/deva-intro/deva-intro-west-v1.png` พร้อมบทพูด 5 บรรทัดตามเอกสารกลาง (แปลอังกฤษด้วย) → เทวดาเดินไปยืนรอที่ลานขวาของบัลลังก์ (~1380,460 ในสกรีนช็อต) → คุยแล้วเข้าศึก · ชนะ = valkyrieSpear (ของเดิม)
5. preload deva-intro-west + bump cache version

## ข้อห้าม
- ไม่เปลี่ยนสมดุล/รางวัล/key · save เก่าที่ cleared `westHypnotized` แล้วต้องไม่ต้องสู้ใหม่

## เกณฑ์รับงาน
1. เทสต์ `tests/e4-events-z3.test.mjs`: เปิดโซนมีแค่ Taan+พ่อค้า+ปีศาจ 3 → ศึก yama+Taan → สร้างได้ · หลังคดี 3 วิญญาณหยุด → ชนะแวมไพรแล้วขยับ · หลังคดี 7 cutscene+บท → เทวดายืนรอ → ศึก → spear · save เก่าไม่พัง
2. ภาพตรวจใน browser → `output/Codex/e4-preview/` · เทสต์เดิมผ่าน · รายงาน `output/Codex/2026-10-08-avegee-e4.md`

## ระบบกลางจาก E3 (Dale สรุป 8 ต.ค.) — ใช้ต่อ ห้ามเขียนใหม่ซ้ำ
- `src/deva-map.js`: ลงทะเบียน `DEVA_MAP[zone] = { key, prerequisite, x, y }` · `devaMapActors(g, now)` คืน actor `id deva:<zone>`, `art`, `enabled`, `label`
- state ใน save: `g.devaVisits[zone] = { phase: descending|intro|waiting|fighting, battle? }`
- `mapInteractions` / `hitActor` / `standPoints` ใช้ kind `devaEncounter` · `openDevaEncounter(key)` ใน `ui.js` เช็กระยะแล้วเปิด event alert
- `finishDevaDescent` / `completeDevaArrival` เป็นท่าของโซน 2 เท่านั้น → โซนนี้เขียน choreography ของตัวเอง (เช่น วิ่งเข้ามาจากล่าง/ยืนหน้าบัลลังก์) โดยใช้ phase เดิม
- `src/breach-approach.js`: actor แสดงผลช่วงเดินเข้าหาบอสชายแดน
- **กฎ key ภาพ (บั๊กที่ Dale เจอใน E3):** th = `boss-tester-th`, โซนอื่น = `boss-tester` (`artUrl` ต่อ suffix โซนให้เอง) **ห้ามใส่** `boss-tester-<zone>` / `boss-frontier-<zone>` เอง — ไม่งั้นได้ path 404 หรืออีโมจิแทนภาพ
- effect ไฟของ E3 (`src/scene.js`) เคยเป็นแถบลูกไฟบังตึก — effect ใหม่ (สายฟ้า/วาร์ป) ต้องไม่บังตัวอาคาร/ตัวละครหลัก
- ตรวจ browser: Playwright chromium เปิดได้ในเครื่อง (Dale ใช้ได้) — ถ้า Codex เปิดไม่ได้ ระบุในรายงาน Dale จะตรวจแทน
