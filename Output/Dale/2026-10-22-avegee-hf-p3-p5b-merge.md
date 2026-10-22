# AVEGEE HOTFIX + P3 + P5b merge — PASS (Dale, 22 ต.ค. 2569)

คุณเป้อนุมัติแล้ว 22 ต.ค. 2569 · ทำใน worktree `/Users/agapae/agapae-work/.dale-worktrees/hf3` (branch ชั่วคราว `dale/merge-hf-p3-p5b` → fast-forward เข้า main → ลบแล้ว) · push main ไม่ force

## commit บน main (--no-ff ทีละอัน, เทสต์ทั้งชุดหลังทุกขั้น)
| ขั้น | commit | เทสต์ |
|---|---|---|
| 1 `HOTFIX:` dale/hotfix-deva-heaven (`72e3da0`) | `ca3af31` | 1,289 ผ่าน / 0 แดง |
| 2 P3 toby/p3-verdict-cutscene (`b147caa`) | `603f6ca` | 1,303 ผ่าน / 0 แดง |
| 3 P5b toby/p5b-art-insert (`9b8b665`) | `c3cd364` (HEAD main) | 1,309 ผ่าน / 0 แดง |
main เดิม `f777602` → `c3cd364`

## conflict ที่แก้
- game.js: ไม่ชนระดับข้อความ ตรวจด้วยตาแล้วอยู่ร่วมกัน — `applyVerdict` มีทั้ง `devaCaseOwed()`/เปิดด่านเทวดาหลังตัดสินขอทาน (hotfix ~1278) และคิว `pendingVerdictScene` (P3 ~1200/1254) · `stationName` ส่งเข้า `applyVerdict` ของ P3 ไม่กระทบ hotfix
- index.html ขั้น 2: `game.js` suffix รวมเป็น `20261021-worker-supplies-o1-p2-p1-hf1-p3` (importmap 2 จุด)
- index.html ขั้น 3 (4 จุด): `ui.js` = `...-p2-p5-p1-p3-p5b-o2` (importmap + script tag ตรงกัน ลงท้าย `-o2`) · `scene.js` คง `-p1` · `worker-ui.js` คง `-p1` · `town-terrain-repair.js`/`workers.js`/`story.js`/`weapons.js` ใช้ `-p5b` ของ Toby
- แก้เทสต์ 1 บรรทัด: `tests/p3-verdict-scene.test.mjs` regex ui.js เดิมบังคับลงท้าย `-p3-o2` ซึ่งขัดกับ `p5b-o2` ของ P5b เมื่อต่อ suffix ครบ → ผ่อนเป็น `-p3[^"]*-o2` (เจตนาเทสต์เดิมคงอยู่: มี p3 และลงท้าย -o2)

## รีวิว diff Toby
- P3: ฉากชม/ตำหนิสร้างครั้งเดียวใน `applyVerdict` เก็บในเซฟ (reload ไม่ซ้ำ/ไม่จ่ายรางวัลตอนเปิดฉาก) · ลำดับเปิดฉากก่อน pendingWarn/dadFight ถูกต้อง · ปิดได้ด้วยปุ่ม · fallback ภาพ `onerror` · ข้อความผ่าน `esc()` · ไม่แตะสูตรคะแนน/รางวัล
- P5b: คัตซีนเคน v2 ไฟล์ใหม่ไม่ทับของเก่า · repair r3-c3 ไม่แตะ walk mask (มีเทสต์) · ชีต worker v2 เฉพาะ th, โซนอื่นคงตรรกะเดิม
- ข้อสังเกตไม่บล็อก: ตัดสินขอทาน (devaMonk) แล้วอาจได้ฉากชม/ตำหนิของ P3 ตามด้วยบทเรื่อง `deva-th-praise/warning` ต่อกัน (เล่นเรียงกัน ไม่ทับ) — ให้ Chris/คุณเป้ดูจังหวะตอนเล่นจริง

## Pages
- push `f777602..c3cd364` · Pages run `39788363005` success
- URL: https://hellopae.github.io/AVEGEE/ → 200 · importmap parse ได้
- marker บนเว็บจริง (ทั้งหมด 200): `game.js?v=20261021-worker-supplies-o1-p2-p1-hf1-p3` · `ui.js?v=20261021-worker-supplies-p2-p5-p1-p3-p5b-o2` · `workers.js?v=...-p5b` · `weapons.js?v=20261022-p5b` · `src/verdict-scene.js` · `img/head-th-praise-cutscene-v1.png` · `img/weapons/weapon-cutscene-cane-v2.jpeg` · `img/workers/worker-th-sheet-v2.webp` · `img/map-zone1/repairs/r3-c3-pier-v1.webp` · game.js ที่เสิร์ฟมี `devaCaseOwed`/`buildVerdictScene`
- headless Chrome (390px) เปิดหน้า: ขึ้นหน้าโหลด "อเวจี" progress ทำงาน ไม่ขาว (ยังไม่ได้เล่นต่อจนถึงเกมจริง — ไม่ได้ทดสอบ flow ตัดสินบน URL จริง)

## วิธี verify (ให้ Chris/คุณเป้)
1. เซฟใหม่ ตัดสิน 4 คดีโดยไม่สร้างประตูสวรรค์ → ขอทานไม่ถูกดันเข้าคิว คดี 5+ ไหลต่อ · สร้างประตูเสร็จ → ขอทานมาที่คำตัดสินถัดไป
2. ตัดสินห้าดาว → ฉากหัวหน้าชม (รางวัลตรงกับที่ได้) · ตัดสินแดง → ฉากตำหนิ ระดับตามจำนวนแดงติด
3. ด่านเรือโซน 3 คัตซีนเคนยื่นดาบทั้งฝัก · ท่าเรือ r3-c3 · คนงานโซน 1 ท่าทางตามงาน

## Rollback
`git revert -m 1 c3cd364 603f6ca ca3af31` (ย้อนทีละ merge ตามลำดับใหม่→เก่า; ย้อนเฉพาะ P5b ได้ด้วย `git revert -m 1 c3cd364`)
