# ถึง Codex app: เทสต์ไม่ผ่านบน AVEGEE main หลัง push animation + แสงโซน 1 (15 ต.ค. 2569)

คุณเป้ขอให้ Codex app ตรวจเมื่อกลับมา · รันบน `origin/main` = `8f82178` (`acc9c43` animation ยม, `69ed45e` แสงนรก/เสาไฟไทย, `8f82178` แสงคบไฟ) ด้วย `node --test tests/*.test.mjs`
ผลเต็ม: `Output/Claudy/briefs/assets/2026-10-15-avegee-l/main-8f82178-tests.txt` · ก่อน 3 commit นี้ (`99ec562`) ผ่าน 939/939

## ไม่ผ่าน 10 ข้อ

**พฤติกรรมจริง — ควรดูก่อน**
1. `I1-A mirror stand is drawn in the room canvas, depth-sorted against Yama by feet y`
2. `I1-A adjusting panel switches Yama to the atk pose facing the mirror; closing returns the standing pose` — animation ยมใหม่อาจไม่สลับท่า atk ตอนส่องกระจก
3. `two builds approach concurrently and retain each owner and build-work render state` (construction-arrival) — Toby พบว่า stub ภาพในเทสต์ไม่มี dimension หลังเปลี่ยนการวาด (อาจเป็นเทสต์หรือโค้ดจริง)

**cache-bust / URL ไม่ตรงกัน (token `yama-live`)**
4. `I1-A cache-bust: -i1a is appended ...`
5. `ไม่แตะ walk*/room walking และมินิเกมกระจก (ใบ F1/F3) · เวอร์ชัน cache-bust ขยับแล้ว`
6. `fx loads the v4 masks and the h5b module cache-busts with the intro-v3-coverfx suffix`
7. `K2 changed entry URLs match, including review imports`
8. `K5 wiring: ui.js measures enemies, hint strip is thin, cache-bust is -k5 in both entry pages`
9. `skill atk: release cache retains facing tokens and shares one preload module URL`
10. `west-hit: arena() — ท่าโดนตีไม่เคยได้ .atk ...`

## ฝั่ง Claude แก้ไปแล้วบางส่วน (ยังไม่อยู่บน main)
- Dale stack `a30b7e9` (K1e/L4a/L4b รอคุณเป้ push) และ Toby `toby/l1-depth` `b278303` แก้ regex cache-token ของ k2-menu, skill-atk, west-hit-facing, k5 แล้ว · `output/game-review/index.html` preload ใช้ `yama-live-20261015-hell1` ให้ตรง index
- **ที่ยังเหลือให้ Codex app**: ข้อ 1–3 (พฤติกรรม) และ 4–6 (I1-A/F1-F3/h5b cache) — ตรวจหลัง pull main ล่าสุด
- งานฝั่ง Claude ที่กำลังเข้าคิว main: L1 (`town-shade.js` เงา + ย่อตัวละคร -25% + นิราบนแท่น) — ถ้า Codex ทำทิศแสงใน `town-lighting.js` ให้ใช้ `SUN` จาก `town-shade.js` ให้ตรงกัน
