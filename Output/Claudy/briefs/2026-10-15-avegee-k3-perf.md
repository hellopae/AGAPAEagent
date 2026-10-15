# ใบงาน K3: AVEGEE — เกมช้าและกระตุกมาก: วัดหาต้นเหตุแล้วแก้ · เจ้าของ Toby

## บริบท
- คำสั่งต้นฉบับ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Kittanate-source/2026-10-15-avegee-k-requests.md` ข้อ 3
- คุณเป้เล่นบน MacBook (Brave, จอ Retina DPR 2) ที่ https://hellopae.github.io/AVEGEE/ — ช้าลงชัดเจนหลัง release ล่าสุดของ Codex app
  (`a955ea8` + `b5614fa` 15/10: Zone1 พื้น tile หลายชั้น `src/town-terrain.js`, scenery 110 ชิ้นมีเงา, LRU chunk cache, Battle9/Comment8 UI) — อ่าน `docs/claude-update-2026-10-15.md`
- repo `/Users/agapae/agapae-work/AVEGEE` main = `b5614fa` · ทำใน worktree `../.toby-worktrees/k3` branch `toby/k3-perf`
- งานคู่ขนาน: K1 (ภาพแผนที่ใหม่ — ภายหลังจะ**แทน**ระบบพื้น tile ของ `town-terrain.js` ด้วยภาพวาดแบ่งชิ้น) · K2 (Codex แก้ UI ต่อสู้/สอบสวน ใน `battle-turns.css`, `trial-comment8.css`, ส่วนต่อสู้ใน `ui.js`/`index.html`)

## ขั้นตอน
1. **วัดก่อนแก้** ด้วย Playwright Chromium (python มี chromium-1243) ที่ 1440×900 `device_scale_factor=2` เปิด static server ในเครื่อง (ไม่ใช้เว็บจริง) เทียบ 2 commit: `81e5ddb` (ก่อน release) กับ `b5614fa`
   ฉากที่วัด: แผนที่ Zone1 ยืนนิ่ง / เดินยาว 10 วินาที / ซูมทุกระดับ, หน้าต่อสู้, หน้าสอบสวน (ใช้หน้า `output/zone1-2d/` และ `output/game-review/` หรือเกมจริงด้วยเซฟจำลองในหน่วยความจำ — ห้ามเขียนเซฟผู้เล่น)
   เก็บ: FPS เฉลี่ย/ต่ำสุด, frame time p95, long tasks, เวลาต่อเฟรมแยกฟังก์ชัน (Chrome trace / `performance.mark`), หน่วยความจำ, จำนวน canvas และขนาด, ภาพที่ decode
2. ไล่ต้นเหตุที่น่าสงสัยเป็นอย่างน้อย: requestAnimationFrame ซ้อนหลาย loop, วาดพื้น/เงาใหม่ทุกเฟรม (`shadowBlur`, `ctx.filter`, alpha mask), sort/วาด 110 scenery ทุกเฟรม, LRU chunk cache ทิ้ง-สร้างวนไป, canvas ใหญ่เกินที่ DPR 2,
   DOM/innerHTML ถูกสร้างใหม่ทุก tick (HUD/ต่อสู้), backdrop-filter/box-shadow หนักใน CSS, preload ภาพ 4K ระหว่างเล่น
3. แก้ตามต้นเหตุที่วัดได้จริง เรียงจากได้ผลมากสุด — **ไม่ต้องลงแรงปรับระบบพื้น tile ของ `town-terrain.js` ลึกๆ** เพราะจะถูกแทนใน K1 ถ้ามันเป็นต้นเหตุหลัก ใส่แค่การแก้ราคาถูก (เช่น cache ผลวาด) แล้วเขียนในรายงานว่าระบบใหม่ต้องระวังอะไร
4. ห้ามแตะไฟล์ของ K2 (`battle-turns.css`, `trial-comment8.css`) — ถ้าต้นเหตุอยู่ในโค้ดต่อสู้/สอบสวน เขียนเป็นข้อเสนอในรายงาน ไม่แก้เอง
5. วัดซ้ำหลังแก้ ด้วยวิธีเดียวกัน
6. cache-bust ไฟล์ที่แก้ด้วย suffix `-k3` (index.html กับ ui.js preload import ต้องตรงกัน ตาม `docs/claude-update-2026-10-15.md`)

## ข้อห้าม
- ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` (clone ของ Codex app) และ `AVEGEE-reference`
- ห้าม merge/push main (Dale ทำ) — commit ใน branch `toby/k3-perf` ได้
- ห้ามลดคุณภาพที่คุณเป้เห็นได้ชัด (ซ่อนฉาก ลดความละเอียดภาพตัวละคร) เพื่อแลกความเร็ว เว้นแต่เขียนเป็นตัวเลือกให้ตัดสิน
- ห้ามเก็บหลักฐาน/สคริปต์วัดใน repo เกม → `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf/`

## เกณฑ์รับงาน
1. ตารางก่อน/หลัง ต่อฉาก: FPS เฉลี่ย, frame p95, long tasks — เทียบ `81e5ddb` / `b5614fa` / หลังแก้
2. ต้นเหตุ 3 อันดับแรกพร้อมหลักฐานตัวเลข (ไม่ใช่เดา)
3. `node --test tests/*.test.mjs` ผ่านหมด (บอกจำนวน)
4. รายงาน `Output/Toby/2026-10-15-avegee-k3-perf.md`: ต้นเหตุ, ที่แก้ (ไฟล์+commit), ที่ยังไม่แก้และเหตุผล, ข้อควรระวังสำหรับระบบแผนที่ใหม่ K1
