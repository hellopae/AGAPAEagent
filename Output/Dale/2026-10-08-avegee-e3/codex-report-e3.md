# AVEGEE E3 — โซน 1–2

สถานะ: แก้โค้ดและตรวจด้วย Node แล้ว; **ยังไม่ครบเกณฑ์ภาพจาก browser และไม่ได้รับรอง QA**

ทำใน worktree ที่ได้รับ `/Users/agapae/Documents/Work PAE/Claude/.codex-worktrees/20261007T192835Z-e1bd7a13` บน branch `codex/20261007T192835Z-e1bd7a13` ฐาน `d754481` ไม่ commit/merge/push/deploy ไม่แก้ hooks, status.json, worklog.json และไม่เรียก agent อื่น

## การเปลี่ยนแปลง

- `monk` ในฐานเดิมเป็นเจ้าอาวาสที่มีบาป ไม่ตรงกับ brief จึงปรับเป็นพระจำวัดผู้บริสุทธิ์/เทวดาปลอมตัว คง case key เดิม กันออกจากการสุ่ม เมื่อปิดคดีที่ 4 แทรกเป็นคดีถัดไป ไม่ให้เลื่อนหรือขังคดีนี้เพื่อข้ามคดีที่ 5 โหลด save ที่ค้างคดีที่ 4 จะเติมคดีนี้ให้ด้วย
- หลังตัดสิน `monk` เป็นคดีที่ 5 เข้าคิว cutscene `deva-intro-th-v1.png` มีบทชม/ตักเตือนต่างกัน ผ่าน i18n ไทย/อังกฤษ จบ cutscene แล้วเริ่ม `devaTest` ทันที แม้ผู้เล่นยังไม่ได้ปิด prisonBreak; ทางเริ่ม test เดิมยังคง prerequisite เดิม กระจกยังใช้รางวัลชัยชนะเดิมและเริ่มซ้ำไม่ได้เมื่อ cleared
- `asiaPrisonFire` เผาตะรางโดยตรงและวาดไฟ canvas บนอาคารตลอดช่วง pending/active ไม่ต้องมีเปรตกำลังเผา จบ event แล้วเหลือสภาพเสียหายให้ซ่อมตามระบบเดิม
- เทวดามาหลังจัดการสองตน พัก battle ไว้ใน save กลับแผนที่ บินลง 3.2 วินาที จากขอบบนมาที่ world (1120,400) โดยประมาณตำแหน่ง screenshot ที่ brief ให้ เปิด `deva-intro-asia-v1.png` แล้วให้เทวดาจัดการตนสุดท้ายด้วยเส้นทางประกาศชัยชนะ/รางวัลเดิม ได้ 90 เบี้ยตามเดิม และตั้ง `asiaDevaTest` pending
- เทวดายืนรอที่ตำแหน่งเดิม เดินใกล้จึงเห็นปุ่มทดสอบ ใช้ nearestInteraction/mapInteractions แบบเดียวกับ final actors คลิกตัวเทวดาจากไกลจะเดินเข้าหา ชนะ test ได้ windFan ตามเดิมและ actor หาย แพ้แล้วกลับมารอทดสอบใหม่
- โจมตีหมู่และศัตรูตีตัวเองก็เข้าลำดับเทวดาได้ โดยเก็บตนสุดท้ายไว้ให้เทวดา โหลดระหว่างบินลง/intro จะดำเนินต่อ ไม่เล่น event ที่ cleared ซ้ำ save เก่าที่ fire active แต่ไม่มีสถานะใหม่ยังใช้การเริ่มศึกใหม่ตาม migration เดิม; fire cleared แต่ tester pending แสดง actor รอได้
- ชายแดนโซน 1/2 เพิ่มช่วงเดินบนแผนที่ชายแดน เห็นบอสและปีศาจยืนรอ เดินใกล้บอสแล้วกดเริ่มจึงเปิด frontier intro และเตรียมทีม ใช้ navigation เดิม ไม่แก้ geometry จำนวนระลอกเดิมคือ th 2 / asia 3 โดยบอสอยู่ระลอกสุดท้าย
- เพิ่มภาพ intro th/asia ใน preload catalog ของแต่ละโซน และเปลี่ยน cache token เป็น `20261008-e3-events`

## ระบบกลางสำหรับ E4/E5

ชื่อระบบ: **Deva Map Actors** ที่ `src/deva-map.js`

- `DEVA_MAP`: ลงทะเบียน zone → event key, prerequisite, จุดยืน
- `devaMapActors(g, now)`: คืน actor `deva:<zone>` พร้อม sprite `boss-tester-<zone>`, ตำแหน่ง, enabled และป้ายแปลภาษา
- `devaVisits[zone]`: save field เก็บ phase (`descending`, `intro`, `waiting`, `fighting`) และ suspended battle เมื่อจำเป็น; cleared ตรวจจาก zoneEvents เดิม
- `mapInteractions` ใช้ kind `devaEncounter`; renderer, hitActor, standPoints ใช้ actor ชุดเดียวกัน; `openDevaEncounter` เช็ก proximity ก่อนเปิด test
- ตัวกรอง alert/actor เดิมอ่าน `DEVA_MAP` จึงเพิ่มโซนใหม่โดยลงทะเบียนและตั้ง phase waiting หลัง intro ของโซนนั้นได้ ส่วน choreography `finishDevaDescent`/`completeDevaArrival` เป็นของ Asia โดยเฉพาะ E4/E5 ต้องเพิ่ม choreography ของตัวเอง ไม่ใช้ helper Asia กับโซนอื่น

`src/breach-approach.js` คืน display actors สำหรับการเดินเข้าหาบอสชายแดน ค่าสู้/รางวัลยังมาจาก ZONE_EVENTS เดิม

## ผลทดสอบ

- `node --test tests/e3-events-z1z2.test.mjs`: **9/9**, fail 0 — ดู `e3-focused.log`
- `node --test tests/*.test.mjs`: **485/485**, fail 0, skip 0 — ดู `e3-tests-final.log`
- `node --check` กับทุกไฟล์ `src/*.js`: **53 ไฟล์**, syntax failure 0
- `git diff --check`: exit 0
- เทียบ HP/ATK/reward/healing/loss ของ ZONE_EVENTS th/asia กับ HEAD: **33 entries ไม่เปลี่ยน** — ดู `e3-self-check.log`

ปรับเทสต์เดิมเฉพาะพฤติกรรมที่เปลี่ยน: event progression ตรวจไม่มาหลังตนแรกและต้องผ่าน descent/intro; story-art ตรวจ 23 panels รวม intro และตรวจ preload; 30A ตรวจ full-bleed intro แบบไม่ crop พร้อมคงข้อยืนยัน crop ของภาพเก่า; helper ทดสอบ EXP รองรับช่วงพักศึก ส่วน fixture ทดสอบสถานที่ที่ตั้งว่าผ่านทุก boss แล้วเติมสถานะ event th ให้สอดคล้องกัน คงข้อยืนยันการส่งวิญญาณทุกสถานที่เดิมทั้งหมด เพิ่ม E3 แยกยืนยันการบังคับคดีที่ 5

## Self-check ตามเกณฑ์รับงาน

1. **ตรวจด้วยเทสต์แล้ว**: คดี 5/cutscene/บทสองแบบ/test/mirror ครั้งเดียว; Asia หลังสองตน ตนสุดท้ายโดยเทวดา actor proximity windFan หายหลังชนะ และ save เก่า/กลางเหตุการณ์ มีเทสต์ 9 ข้อ ครอบคลุมโจมตีหมู่และ self-hit เพิ่มด้วย
2. **ยังไม่ครบ**: ไม่มีภาพ runtime browser ทั้งไฟ/บินลง/ยืนรอ/เฉลยโซน 1 local server ที่ลองเปิดพบ port 8765 ใช้อยู่ จึงไม่ได้ยืนยันว่าเสิร์ฟ worktree นี้; Playwright เปิด Chromium ไม่ได้ (sandbox MachPortRendezvousServer permission denied) browser ในตัวไม่มี และ Brave extension ปฏิเสธเปิด `http://127.0.0.1:8765` โดยระบุว่าผู้ใช้ไม่อนุญาต จึงหยุด browser ไม่ใช้ช่องทางอื่นเลี่ยงข้อจำกัด รายละเอียดอยู่ `e3-preview/README.md` ต้องตรวจภาพจริงก่อนรับงานด้าน visual
3. **ส่วนเทสต์และรายงานครบ**: ชุด Node เดิมพร้อมข้อใหม่ 485/485 รายงานฉบับนี้ระบุจุดระบบกลางสำหรับ E4/E5 แล้ว ทั้งนี้ผล Node ไม่เท่ากับ QA ใน browser

## ไฟล์เปลี่ยน

Runtime: `src/cases.js`, `src/data.js`, `src/game.js`, `src/deva-map.js` (ใหม่), `src/breach-approach.js` (ใหม่), `src/frontier.js`, `src/i18n.js`, `src/npc-stand.js`, `src/preload.js`, `src/proximity.js`, `src/scene.js`, `src/story.js`, `src/ui.js`, `img/preload-catalog.json`

Tests: `tests/e3-events-z1z2.test.mjs` (ใหม่), `tests/30a.test.mjs`, `tests/event-progression.test.mjs`, `tests/story-art.test.mjs`, `tests/trial-destinations29c.test.mjs`, `tests/ui27d-map-items.test.mjs`

Evidence: รายงานนี้, `output/Codex/e3-*.log`, `output/Codex/e3-preview/README.md` ไม่มีภาพ browser ที่สร้างสำเร็จ

ไม่เปลี่ยน `src/map-art-v5.js`, `src/frontier-navigation.js`, station positions/flip หรือ event keys ไม่มีภาพใหม่และไม่แตะพื้นที่ที่ห้าม
