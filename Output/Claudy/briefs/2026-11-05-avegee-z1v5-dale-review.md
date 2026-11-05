# Dale — รีวิวโค้ด branch โซน 1 v5 FX ก่อน merge (ยังไม่ merge) · 5 พ.ย. 2569

- repo `/Users/agapae/agapae-work/AVEGEE` · branch `claude/2026-11-05-zone1-v5-fx` @ `bace9f6c` (worktree `/Users/agapae/agapae-work/.toby-worktrees/z1-v5`, server 8942 คุณเป้เล่นอยู่ — อย่าปิด) · base main `812152d2`
- **ห้าม merge / ห้าม push main** — คุณเป้ยังรอพื้น HD ครบ (Codex 15 chunk หลัง reset) · โหมด claude-only ห้ามเรียก Codex
- โน้ตผู้ทำ: `Output/Toby/2026-11-05-z1-v5-fx.md` (FX, FX2, FX3, FX4) · ใบงาน `Output/Claudy/briefs/2026-11-05-avegee-z1v5-fx*.md`

## รีวิวอะไร
1. diff ทั้ง branch (`git diff 812152d2..bace9f6c -- src index.html tests scripts`) — บั๊ก, error path, ของค้าง debug, โค้ดที่กระทบโซน 2–4 / ชายแดน
2. **cache-bust**: Toby bump แค่ `CATALOG_VERSION` + release id ของ `preload.js` — ตรวจว่า module ที่แก้/เพิ่ม (`town-terrain.js`, `town-lighting.js`, `town-grade.js` + worker, `scene.js`, `art.js`, `zone-skin.js`, `construction-sheets.js`, `town-fluid-fx.js`, `canteen-art-layout.js`, `map-ambient.js`, `town-flow.js`) โหลดเวอร์ชันใหม่จริงบนเบราว์เซอร์ที่เคยเล่น (ดูรูปแบบ `?v=` ของ repo) แก้ให้สม่ำเสมอ
3. loader ใหม่ (LRU, Web Worker grading + fallback): ความถูกต้องเมื่อ worker ไม่มี/ล้ม, ไม่มี memory leak, Safari/WebKit ไม่จอดำ (Playwright webkit smoke)
4. ขนาด asset ที่เพิ่มเข้า repo (`img/map-zone1/v5-fx/`, `v7-partial/`, sprites) — ไฟล์ทดลองที่ไม่ใช้, ไฟล์ใหญ่ผิดปกติ
5. เทสต์เต็ม `node --test tests/*.test.mjs > log 2>&1` (ไม่ pipe tail) 0 fail · เทสต์ที่ Toby แก้ (count/period) ยังมีความหมาย
6. ทางเลือกสลับกลับ `ZONE1_GROUND_SET='v5'` ยังทำงาน (โหลด, walkmask, fx) — ถ้าต้อง merge ก่อนพื้นครบ จะ merge ด้วยค่า `v5` หรือ `v7-partial` (เสนอ)

## ผลลัพธ์
- ข้อเล็ก (cache-bust, ไฟล์ทิ้ง, typo) **แก้เองบน branch นี้** commit + push branch
- ข้อใหญ่ → FIX LIST เรียงเลข (ไม่ต้องแก้เอง)
- คำตัดสินเดียว: **READY TO MERGE (รอคุณเป้)** หรือ **FIX LIST**
- โน้ต `Output/Dale/2026-11-05-z1v5-review.md` · ห้ามแก้ `status.json`, `worklog.json`, `work-mode.json`
