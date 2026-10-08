# ใบงาน E5 (Codex): AVEGEE — ลำดับ event โซน 4 + ศึกสุดท้ายตามสตอรีบอร์ด

**รันหลัง E4 merge แล้วเท่านั้น**
**อ่านก่อน:** `Output/Claudy/briefs/2026-10-08-avegee-ev-storyboard.md` หัวข้อ C โซน 4 + "กติการ่วม" · ภาพ Map-Zone4-1..4-6 · ระบบเดิม `src/final-event.js`, `src/story.js` (มี panel `cyberhell-02-v3` ซ้ำ 2 ที่ — จัดให้ตรงลำดับใหม่)

## ขอบเขต
1. `cyberRescue` (มาถึงโซน 4): Taan+พ่อค้านรกถูกขังในคุก (บนกลาง) **มี effect สายฟ้าล้อมจับอยู่** · เทวดาลูเมนยืนหน้าบัลลังก์ · cutscene `img/deva-intro/deva-intro-cyberhell-v1.png` + บทพูด 3 บรรทัดตามเอกสารกลาง (แปลอังกฤษ) → ศึกเทวดา → ชนะ: สายฟ้าหาย ปล่อย 2 คน + item cooldownClock (ของเดิม)
2. `cyberBreach` หลังคดี 5: เดินลงชายแดนใกล้บอส → `frontier-cyberhell-intro-v1` → 4 wave + โทรจัน-9 · ชนะ spareHeart (ตรวจของเดิม แก้เฉพาะที่ขาด)
3. ศึกสุดท้าย หลังคดี 10 — ลำดับใหม่:
   a. บอสอาร์คอน-ศูนย์ + กองทัพลูกน้อง **วาร์ปปรากฏ** หน้า yama บนแผนที่ (effect วาร์ป) → cutscene `story-cyberhell-01-v2` → หน้าต่างเตรียมเข้าศึก
   b. ชนะลูกน้อง 4 wave → `story-cyberhell-reinforcements-01` → แผนที่: กำลังเสริม (ยมทูต/ยักษ์จากหลายโซน ใช้ sprite จริงของแต่ละคน ไม่ใช่ taan ซ้ำ 4 ตัว) ยืนฝั่งซ้ายหลัง yama → `story-cyberhell-reinforcements-02`
   c. `story-cyberhell-02-v3` (บอสควบคุมหัวหน้า 4 โซน) → แผนที่: yama, บอส, หัวหน้า 4 โซนที่ถูกควบคุมยืนฝั่งขวา · หน้าต่าง "เตรียมตัวสู้": ไปหาพ่อค้านรกซื้อของ / ไปหานิราจัดทีม / ไปนอนพักที่ศาลาน้ำชา (3 ปุ่มพาเดินไป + ปุ่มปิด)
   d. ชนะหัวหน้าครบ 4 → `story-cyberhell-03-v4` → แผนที่ yama ยืนเผชิญหน้าบอส + หน้าต่างเตรียมตัวสู้แบบเดียวกัน
   e. ชนะบอส → `story-ending-01-v4` → `story-ending-02-v3`
4. preload deva-intro-cyberhell + bump cache version · migration ของ `finalEvent` state ให้ save เก่าทุก phase เดินต่อได้

## ข้อห้าม
- ไม่เปลี่ยนสมดุล/รางวัล/key · ไม่ลบคำเตือนทีมไม่ครบ (B9)

## เกณฑ์รับงาน
1. เทสต์ `tests/e5-events-z4.test.mjs`: ลำดับ a→e ครบ cutscene ไม่ซ้ำ/ไม่ข้าม · กำลังเสริมเป็นคนละ sprite · หน้าต่างเตรียมตัว 3 ทางพาไปถูกที่ · save เก่าทุก phase ไม่ค้าง
2. ภาพตรวจใน browser → `output/Codex/e5-preview/` · เทสต์เดิมผ่าน · รายงาน `output/Codex/2026-10-08-avegee-e5.md`

## ระบบกลางจาก E3 (Dale สรุป 8 ต.ค.) — ใช้ต่อ ห้ามเขียนใหม่ซ้ำ
- `src/deva-map.js`: ลงทะเบียน `DEVA_MAP[zone] = { key, prerequisite, x, y }` · `devaMapActors(g, now)` คืน actor `id deva:<zone>`, `art`, `enabled`, `label`
- state ใน save: `g.devaVisits[zone] = { phase: descending|intro|waiting|fighting, battle? }`
- `mapInteractions` / `hitActor` / `standPoints` ใช้ kind `devaEncounter` · `openDevaEncounter(key)` ใน `ui.js` เช็กระยะแล้วเปิด event alert
- `finishDevaDescent` / `completeDevaArrival` เป็นท่าของโซน 2 เท่านั้น → โซนนี้เขียน choreography ของตัวเอง (เช่น วิ่งเข้ามาจากล่าง/ยืนหน้าบัลลังก์) โดยใช้ phase เดิม
- `src/breach-approach.js`: actor แสดงผลช่วงเดินเข้าหาบอสชายแดน
- **กฎ key ภาพ (บั๊กที่ Dale เจอใน E3):** th = `boss-tester-th`, โซนอื่น = `boss-tester` (`artUrl` ต่อ suffix โซนให้เอง) **ห้ามใส่** `boss-tester-<zone>` / `boss-frontier-<zone>` เอง — ไม่งั้นได้ path 404 หรืออีโมจิแทนภาพ
- effect ไฟของ E3 (`src/scene.js`) เคยเป็นแถบลูกไฟบังตึก — effect ใหม่ (สายฟ้า/วาร์ป) ต้องไม่บังตัวอาคาร/ตัวละครหลัก
- ตรวจ browser: Playwright chromium เปิดได้ในเครื่อง (Dale ใช้ได้) — ถ้า Codex เปิดไม่ได้ ระบุในรายงาน Dale จะตรวจแทน
