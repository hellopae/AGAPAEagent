# ใบงาน Z1-LAYOUT-B1 — ต่อแผนที่โซน 1 ฉบับใหม่เข้าเกม + พื้นที่เดิน/collision/เรียงหน้าหลัง

- เจ้าของ: **Toby** · ผู้ตรวจรับ: Claudy (+ Dale รีวิวโค้ดก่อน merge) · 5 พ.ย. 2569 · โหมด `both` (Codex วาดเท่านั้น)
- ต่อจาก Z1-LAYOUT-A (`Output/Claudy/briefs/2026-11-05-avegee-zone1-layout.md`, รายงาน `Output/Toby/2026-11-05-z1-layout-a.md`)

## คำตัดสินของคุณเป้ (5 พ.ย.)
1. ฟ้า/ภูเขา: **ใช้ชุดใหม่ของ Codex** (terrain-seamless `layers/` sky + mountains) ไม่ใช้ของเดิมใน AI
2. ตัด 4.ai Im20 / Im21 ออก **ถูกต้อง** (คง `exclusions.json`)
3. ของเหลว/หมอก/เมฆ/ใบไม้: คุณเป้ต้องการ **animation sprite ที่วาด** (ไม่ใช่ effect เลื่อนภาพ) — Codex กำลังวาดตามใบงาน FX-ART-Z1
   รอบ B1 นี้ **ยังไม่ทำระบบบรรยากาศ** (เป็นรอบ B2) แต่ให้เผื่อชั้น/จุดเสียบไว้ (ดูขั้น 5)

## ที่ทำงาน
worktree เดิม `/Users/agapae/agapae-work/.toby-worktrees/z1-layout` branch `claude/2026-11-05-zone1-layout` (HEAD `d55d08ac`)
ห้ามแตะ main · ห้าม merge · push เฉพาะ branch นี้

## เป้าหมาย
เมืองโซน 1 (`th`) ในเกมใช้แผนที่แยกชั้นใหม่แทนภาพวาดเดิม (`img/map-zone1/v2`, `src/town-layout.js`, `town-walkmask*`) โดยตำแหน่งตาม `layout.json` ของรอบ A
โซน 2–4 ต้องทำงานเหมือนเดิม (ยังใช้แผนที่เก่า) — ใส่เป็น path ใหม่ที่เปิดเฉพาะ `th` ได้ ไม่รื้อของโซนอื่น

## ขั้นตอน
1. อ่านโค้ดปัจจุบันก่อน: `src/town-map.js`, `town-layout.js`, `town-walkmask.js`, `town-owner-walkmask.js`, `town-scenery.js`, `scene.js` (วาดแท่น), `zone-skin.js`
   และโมดูลใหม่ของ Codex บน branch นี้: `src/map-layers.js`, `map-stream-cache.js`, `map-follow-camera.js`, `map-object-depth.js`, `map-structures.js`, `map-surface-material.js`, `map-depth-effects.js` (+ tests) — ใช้ซ้ำให้มากที่สุด
   เขียนแผนสั้น ๆ ลงโน้ตก่อนลงมือ (world units ↔ ok-space, ลำดับ render, ไฟล์ที่จะแก้)
2. **Asset ในเกม**: ย้ายเฉพาะไฟล์ที่ใช้เข้า `img/map-zone1/v3/` (terrain webp tiles, sky, mountains, sprite วัตถุ 93 ชิ้นจากรอบ A, ของเหลวชั้นฐานนิ่ง) + manifest เดียว · ขนาดรวมให้น้อยที่สุด (เป้า ≤ 40 MB) · โหลดเฉพาะรอบกล้อง
3. **Render**: Sky → Mountains → ของเหลวชั้นฐาน → Terrain → วัตถุเรียงตาม foot ร่วมกับตัวละคร/NPC (ต้นไม้/ซุ้ม/ราวหน้าบังตัวละครได้) — ตัวละครขนาดเท่าเดิมเทียบกับอาคาร (ตรวจกับสัดส่วนใน ok.jpg)
4. **Walkmask/collision ใหม่** จาก alpha ของ terrain + ตัดฐานวัตถุ (`hit` จาก foot/ขนาด) · บันได/สะพานเดินได้ ตลิ่ง/หน้าผา/ของเหลวเดินไม่ได้ · ผืนเดินต่อเนื่องจากประตูล่าง → สะพาน → ลาน → ลานบน/ตะราง, ฝั่งลาวา, ฝั่งน้ำแข็ง, ประตูสวรรค์
   overlay mask บนภาพเป็นหลักฐาน · ใช้ skill `map-markup-extract` ถ้าต้องการ walk mask PNG ขนาดภาพจริง
5. **จุดเสียบรอบ B2** (ยังไม่ต้องทำเอฟเฟกต์): ชั้น/hook สำหรับ animation sprite ของเหลว/หมอก (อ่าน `fx-manifest.json` รูปแบบ `id, sheet, frameW, frameH, frames, fps, loop, tileable, blend, placement`), เมฆ parallax, DOF, เงาเมฆ, ใบไม้หล่น — แค่โครงที่ไม่ทำอะไรเมื่อไม่มีข้อมูล
6. **สถานี/จุดเกม**: จับคู่วัตถุใน layout.json กับ `TOWN_STATION_SITES` (`krata` กระทะ, `tarang` ตะราง, `sawan` ประตูสวรรค์, `lokan` ถ้ำน้ำแข็ง, `krajok` ศาลากระจก, `lan`, `tea`, `sala`, `dab`, `ngiw`, `canteen`) + แท่นตัดสิน `TOWN_DAIS`/`TOWN_SPOTS` (plaza, throne, bossPier, ferry), จุดประตูไปชายแดน, ท่าเรือ
   สถานีที่ **ไม่มีในผังใหม่** → อย่าเดาวาง ให้จดรายการกลับมา (คุณเป้ตัดสิน/Codex วาด)
7. ทดสอบ: `node --test tests/*.test.mjs` ทั้งชุด (ฐาน 1,933) เขียน log ลงไฟล์ ไม่ pipe เข้า tail · เพิ่มเทสต์ walkmask (ผืนเดียว, จุดสถานีอยู่บนพื้นเดิน, ประตู↔ลาน↔ท่าเรือถึงกัน) · เดินจริงด้วย Playwright desktop + 390 px: ประตูล่าง → ลาน → แท่น → ลานบน → ฝั่งลาวา → ฝั่งน้ำแข็ง → ท่าเรือ, เปลี่ยนฉากเข้า/ออก, pause/save/load
8. commit + push branch · โน้ต `Output/Toby/2026-11-05-z1-layout-b1.md`

## ข้อห้าม
- ห้ามแตะ main/merge · ห้ามเขียนในโฟลเดอร์ Codex/คุณเป้ · ห้ามวาดภาพใหม่
- ห้ามทำให้โซน 2–4 เปลี่ยน · ห้ามลบไฟล์แผนที่เก่า (ยังใช้กับโซนอื่น / fallback)
- ห้ามแก้ `status.json`, `worklog.json`, `work-mode.json`

## เกณฑ์รับงาน
1. โซน 1 ในเกมแสดงแผนที่ใหม่ตรงผัง (ภาพหน้าจอเทียบ proof-composite) · โซน 2–4 ภาพหน้าจอเหมือนเดิม
2. walkmask overlay + เทสต์ผืนเดียว/สถานีบนพื้นเดิน ผ่าน · เดินจริงครบเส้นทางข้อ 7 ไม่ทะลุหน้าผา/ของเหลว/ฐานวัตถุ
3. เรียงหน้า–หลังถูก: เดินหลังต้นไม้/ซุ้มประตูแล้วถูกบัง เดินหน้าแล้วไม่ถูกบัง (ภาพหลักฐาน ≥ 3 จุด)
4. เทสต์เต็ม 0 fail (รายงานจำนวน) · ไม่มี console error · มือถือ 390 px เล่นได้
5. รายการสถานีที่ไม่มีในผัง + จุดเสียบ B2 พร้อม · commit hash + push branch
