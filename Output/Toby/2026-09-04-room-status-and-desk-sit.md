# ป้ายสถานะระดับห้อง + เอเจนต์นั่งทำงานที่โต๊ะ

วันที่: 4 ก.ย. 2569 · Toby (@toby-gamedev) · ไฟล์แก้: `index.html` เท่านั้น
[skip-factcheck] งาน UI/behavior ล้วน ไม่มี factual claim

---

## งานที่ 1 — ป้ายสถานะระดับห้อง (แรงบันดาลใจจาก gethideout.app)

**ที่มา:** เจ้าของไปดูคู่แข่ง gethideout.app ที่โชว์ว่าห้องไหนมีใครอยู่/ห้องไหนว่างแบบเรียลไทม์

**สิ่งที่เพิ่ม:**
- `ofcFloorSVG()` (~บรรทัด 3279) — ต่อท้าย `<g class="ofc-room">` ของแต่ละห้อง เพิ่ม
  `<g class="ofc-rstat empty" data-room="...">` วางไว้ **ใต้** ป้ายชื่อห้อง (ไม่ใช่ต่อท้ายแนวนอน —
  คำนวณแล้วว่าห้องแคบอย่าง r1 "ห้องไอเดีย & วิจัย" กับ l1 "ห้องคลังไฟล์" ป้ายชื่อห้องกินพื้นที่จนเหลือ
  ว่างข้างขวาแค่ ~12-14px ไม่พอใส่จุด+ตัวเลข วางแนวตั้งใต้ป้ายชื่อปลอดภัยกว่าทุกขนาดห้อง)
  แต่ละกลุ่มมี pill พื้นหลัง (ใช้ class `.ofc-tagbg` เดิม) + `circle.ofc-rstat-dot` + `text.ofc-rstat-n`
- ฟังก์ชันใหม่ `ofcRoomStatusRender()` (~บรรทัด 3316):
  - นับคนจาก `OFC_ACTORS` ว่าพิกัด `ac.x, ac.y` ตกในกรอบ `r.x/y/w/h` ของห้องไหน (bounding-box hit test
    ตรงๆ ไม่ใช้ตาราง `seats`) ทำให้ห้องที่ `seats` ว่าง (`meet`/`pantry`/`lounge`) นับคนที่แวะไปทำกิจกรรม
    ในนั้นได้ด้วยตามที่โจทย์ขอ
  - หาสถานะรวมของห้องด้วยลำดับความสำคัญ `flagged > working > sent > done > idle` (ถ้าห้องมีคนหลาย
    สถานะ ให้จุดสีของห้องเอนเอียงไปทางสถานะที่ "ต้องสนใจก่อน")
  - สีจุดอ้างจาก `OFC_STATUS[status].c` ตรงๆ (`var(--working)` / `var(--idle)` / `var(--done)` /
    `var(--flagged)` / `var(--sent)`) — ไม่มีสีใหม่นอก token
  - ห้องว่าง (`n===0`) → เติม class `.empty` ให้ทั้งกลุ่ม (dot สี `var(--ink-faint)`, ไม่มีตัวเลข) CSS
    ลด opacity เหลือ `.32` — จางลงเฉยๆ ไม่ซ่อนหาย กันป้ายกระพริบเข้าออกตอนคนเดินผ่าน
- เรียกจาก `ofcTick()` ผ่าน throttle: เพิ่มตัวแปร `ofcRoomStatAcc` สะสม `dt` แล้วยิงทุก ≥500ms
  (ไม่ใช่ทุกเฟรมของ `requestAnimationFrame`) และเรียกซ้ำทันทีท้าย `ofcBuildActors()` ทุกครั้งที่ Firestore
  ส่งสถานะเอเจนต์ใหม่มา (`onSnapshot` เดิมเรียก `ofcBuildActors()` อยู่แล้วที่บรรทัด ~4080 — ไม่ต้องแก้จุดนั้น
  เพราะเรียกผ่าน `ofcBuildActors()` ให้แล้ว)
- **กฎที่ยึดตาม PHASE2-GAMES.md (เฟส 3, "ห้ามทำ"):** ไม่มี badge สีแดง ไม่มีตัวเลขเด้ง ไม่มีตัวนับถอยหลัง
  — จุดสี + ตัวเลขคนตัวเล็กเท่านั้น
- ไม่บังตัวละคร: ป้ายอยู่บนสุดของกรอบห้อง (`y+8` ถึง `y+54`) ส่วนตัวละครยืน/นั่งอยู่ต่ำกว่านั้นเสมอตามที่
  ตรวจพิกัด `seats`/`spots` ทุกห้อง — อ่านออกตอนย่อจอเพราะพิกัดอยู่ในระบบ `viewBox` เดียวกับป้ายชื่อห้องเดิม
  (สเกลตาม container query `cqw` ของ `.ofc-stage` โดยอัตโนมัติเหมือนป้ายชื่อห้อง ไม่ต้องเพิ่ม cqw เอง)

**CSS ที่เพิ่ม** (ใกล้ `.ofc-tagbg`/`.ofc-rname` ~บรรทัด 620):
```css
.ofc-rstat{transition:opacity .2s}
.ofc-rstat.empty{opacity:.32}
.ofc-rstat-dot{transition:fill .2s}
.ofc-rstat-n{font-family:"IBM Plex Mono",monospace;font-size:11.5px;fill:var(--ink-soft);letter-spacing:.02em}
```

---

## งานที่ 2 — เอเจนต์นั่งทำงานที่โต๊ะ

**สถานะไฟล์รูป:** ยังไม่มี `office/sprites/<Name>-SIT.png` สักไฟล์ (Mind กำลังเขียน prompt ให้เจ้าของไป gen)
งานนี้จึง**วางฐานให้ครบ + fallback เนียน 100%** รอแค่ไฟล์รูปมาเติม

1. `const OFC_SIT = {}` (~บรรทัด 2762) วางถัดจาก `OFC_WALK`/`OFC_CAT_WALK` คอมเมนต์อธิบายรูปแบบเดียว
   กันไว้ว่าเติมทีละบรรทัดยังไง เช่น `vera:'office/sprites/Vera-SIT.png',`

2. Helper ใหม่ (~บรรทัด 2926-2938):
   ```js
   function ofcDeskOffset(id){ return OFC_SIT[id] ? 18 : 42; }
   function ofcSitSet(ac, sit){
     const sitArt = OFC_SIT[ac.id];
     if(sit && sitArt){
       ac.el.dataset.sit = '1';
       if(ac.pixEl && ac.pixEl.getAttribute('src') !== sitArt) ac.pixEl.src = sitArt;
     } else {
       ac.el.dataset.sit = '';
       if(ac.pixEl && ac.standArt && ac.pixEl.getAttribute('src') !== ac.standArt) ac.pixEl.src = ac.standArt;
     }
   }
   ```
   ตอนนี้ `OFC_SIT` ว่าง → `ofcDeskOffset()` คืน 42 เสมอ และ `ofcSitSet()` ไม่แตะ `src` เลย
   (เพราะ `sitArt` เป็น `undefined` ตลอด) = **พฤติกรรมเดิมเป๊ะทุกพิกเซล** ตรวจแล้วด้วย `node --check`
   ว่า syntax ผ่าน และไล่โค้ดด้วยมือว่า path นี้เป็น no-op จริงเมื่อตารางว่าง

3. ต่อสายจุดที่ต้องสลับรูป:
   - `ofcBuildActors()` (~3239, 3255-3267): `start` ใช้ `ofcDeskOffset(a.id)` แทน `+42` ตรงๆ, เก็บ
     `pixEl`/`standArt` ไว้ใน object `ac`, เรียก `ofcSitSet(ac, true)` ทันทีตอนสร้าง (ทุกคนเริ่มที่โต๊ะตัวเอง)
   - `goHome()` ใน `ofcNextGoal()` (~3018-3020): `pos` ใช้ `ofcDeskOffset(ac.id)` แทน `+42`
   - `ofcTick()` ตอนถึงที่หมาย (~3167): `ofcSitSet(ac, ac.goal.act==='desk')` — ถึงโต๊ะตัวเองแล้วค่อยนั่ง
     กิจกรรมอื่น (กาแฟ/ประชุม/ตรวจงาน/ปิงปอง/PS5/ตกปลา) ไม่นั่ง ยืนทำเหมือนเดิม
   - `ofcStartWalk()` (~3153): `ofcSitSet(ac, false)` — เริ่มเดิน = ลุกยืนทันที ก่อนคำนวณเส้นทางเดินด้วยซ้ำ
   - ระยะ: มีรูปนั่ง → offset **+18** (ใกล้โต๊ะกว่า) / ไม่มีรูปนั่ง → offset **+42** (เท่าเดิม)
     `goVisit()` (คุยที่โต๊ะคนอื่น, act:`chat`) ไม่แตะ ยังคง `+42` เพราะเป็นการยืนคุย ไม่ใช่นั่งทำงาน

4. Preload (~3275): เพิ่ม `...Object.values(OFC_SIT)` เข้าไปในบล็อก preload เดิมที่มี
   `OFC_WALK`/`OFC_CAT_WALK`/`OFC_HAND` อยู่แล้ว

5. จูนพฤติกรรม "อยู่โต๊ะมากขึ้น" ใน `ofcNextGoal()`:
   - `goHome()` dwell (~3018-3020): เดิม `11000+Math.random()*15000` (11-26 วิ) ทุกคนเท่ากัน
     → ใหม่แยกตามสถานะจริง: `st==='working'` ได้ `24000+Math.random()*26000` (24-50 วิ),
     สถานะอื่นได้ `16000+Math.random()*16000` (16-32 วิ)
   - ความน่าจะเป็นตอน `st==='working'` (~3082-3088): เดิม goHome 74% / กาแฟ 10% / ไปคุย 10% / ประชุม 6%
     → ใหม่ goHome **85%** / กาแฟ 6% / ไปคุย 6% / ประชุม 3% — กิจกรรมอื่นยังเกิดอยู่ครบ แค่สัดส่วนลดลง
   - ไม่แตะ: เตะบอล (`goBall`), ปิงปอง (`goPP`), PS5 (`goPS5`), ตกปลา (ทั้งหมดเช็คก่อนเข้า branch สถานะ),
     branch `done`/`sent`/`flagged`/`claudy`/idle-fallback (ยังใช้สัดส่วนเดิม แต่ dwell ของ `goHome()`
     ที่เรียกจาก branch เหล่านี้ได้ช่วงเวลาที่นานขึ้นเล็กน้อยไปด้วยเพราะ dwell ใหม่ 16-32 วิ)

---

## เหลืออะไรรอ

- ไฟล์รูป `office/sprites/<Name>-SIT.png` ทั้งหมด — รอ Mind เขียน prompt แล้วเจ้าของไป gen ทีละคน
  พอได้ไฟล์มาแค่เพิ่มบรรทัดใน `OFC_SIT` เช่น `claudy:'office/sprites/Claudy-SIT.png',` ไม่ต้องแก้โค้ดจุดอื่น
- ยังไม่ได้ทดสอบด้วยตาจริงเพราะไม่มีรูปสไปรท์ตัวละคร/พื้นจริงในสภาพแวดล้อมนี้ให้เปิดเบราว์เซอร์ดู —
  ตรวจด้วย `node --check` (syntax ผ่าน) + ไล่โค้ด/คำนวณพิกัด `tagW`/room width ด้วยมือ (สคริปต์ Node
  แยกต่างหาก) ว่าป้ายห้องไม่ล้นขอบห้องแคบสุด (`r1`, `l1`) แนะนำเปิดเวปจริงเช็คภาพหน้าจออีกรอบเมื่อสะดวก
