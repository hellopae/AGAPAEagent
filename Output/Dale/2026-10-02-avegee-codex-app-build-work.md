# AVEGEE — รีวิว + commit งาน Codex app (ภาพ taan/dam ตอนก่อสร้าง)

วันที่: 2 ต.ค. 2569 · Repo: AVEGEE · commit `98aebd0` (main, push แล้ว) · live: https://hellopae.github.io/AVEGEE/

## ผล: PASS (แก้ข้อเล็ก 1 ข้อเอง)

## Codex เปลี่ยนอะไร
- ภาพ `crew-{taan,dam}-build-work` 8 ไฟล์ (ไทย + asia/west/cyberhell) · `art.js` เพิ่มท่า `build-work` ใน POSE, `prep-art.py` เพิ่มใน POSES, bump manifest `?v=20261002-builders`
- `scene.js`: ถ้า `buildingHere` ใช้ `-build-work` ผ่าน `poseOr(..., base)` → ไม่มีไฟล์ถอยไปภาพปกติ; ตอนทำงานอื่นใช้ `-work` เดิม
- **ตรรกะเกมเปลี่ยนเกินแค่ภาพ (ระบุตามใบงานข้อ 2):** `dam` เป็นช่างสร้าง/ซ่อมได้เหมือน `taan` (`builders()`, `availableBuilder()`, `restoreBuilders()` ใน `game.js`) สร้าง/ซ่อมพร้อมกันได้ 2 ไซต์, เจ้าของไซต์ถูกเก็บใน save (`buildK` ใน moveZone snapshot, `buildExtra` ต่อไซต์, `build` ตอน buildWait = BUILD_TIME), `data.js` duty ของ taan/dam, `i18n.js`/`ui.js` ข้อความปุ่ม "เรียก{name}มาซ่อม" / "ช่างไม่ว่าง" · ไม่แตะค่าสมดุล (cost/เวลา/ซ่อมฟรีเท่าเดิม) แต่พฤติกรรมเปลี่ยนจริง: เดิมสร้างได้ทีละหลังโดยทัณฑ์คนเดียว
- เทสต์ใหม่ 2 ไฟล์ (`construction-art`, `construction-workers`)

## ข้อที่แก้เอง
ภาพ 8 ไฟล์เป็น 1254×1254 ไม่ผ่าน pipeline (0.8–1.2 MB/ไฟล์ รวม ~7 MB; crew เดิม 512² ~150 KB) → รันผ่าน `prep()` ของ `scripts/prep-art.py` (512×512, 96 สี, ชิดขอบล่าง) ได้ 128–209 KB/ไฟล์ · ต้นฉบับเก็บไว้ใน scratchpad session (ไม่ใช่ repo)

## ตารางเกณฑ์
| # | เกณฑ์ | ผล |
|---|---|---|
| 1 | ใช้ตอนก่อสร้าง ตามโซน มี fallback | PASS (scene.js + poseOr + zoneStem) ไม่อ้าง img/raw หรือ output/ |
| 2 | ภาพ 8 ไฟล์ใช้ได้ อยู่ใน git + manifest | PASS — ดู contact sheet เทียบ sprite เดิม: พื้นใส, สเกล/พื้นยืนสม่ำเสมอ, ไม่แตก |
| 3 | manifest ไม่มีรายการที่ไฟล์ไม่อยู่ใน git | PASS — เช็ค critical/rest/zones ทุกรายการอยู่ใน git ครบ diff manifest มีแต่ build-work 8 รายการ |
| 4 | เทสต์ + check | PASS — `node --test tests/*.test.mjs` 162/162, `node --check` 6 ไฟล์ JS, py_compile, `git diff --check` |
| 5 | commit เฉพาะชุดไฟล์ · push · live 200 | PASS — 18 ไฟล์, add ทีละ path · `98aebd0` · ภาพ 8 ไฟล์ 200 ที่ Pages + manifest มี build-work 8 + scene.js live มี build-work |
| 6 | 390×844 | ตรวจไม่ได้ (ไม่มีเบราว์เซอร์/อุปกรณ์ใน session นี้) — ภาพเป็น sprite canvas ขนาดเดียวกับ crew เดิม ไม่มี layout ใหม่; ข้อความปุ่มซ่อม/สร้างยาวขึ้นเล็กน้อย (`เรียก{ชื่อ}ซ่อม{อาคาร}`) ควรให้ Chris/คุณเป้ ดูบนมือถือ |

## ข้อควรรู้ / ไม่ได้ทำ
- ไม่ได้ commit: `Exam/`, `files/`, `output/`, ภาพ untracked อื่น, `CONCEPT.md` (ตามข้อห้าม)
- ยังไม่ได้เล่นจริงบนเบราว์เซอร์: เทสต์ครอบคลุม logic แต่ภาพจริงในฉากต้องให้คน QA

## ทดสอบบน live
1. จ้าง `ดำ` ที่โต๊ะนิรา → สั่งสร้างอาคาร 2 หลังติดกัน → taan/dam ต่างคนต่างเดินไปไซต์ แสดงท่าตีค้อน (สลับท่าทุก 0.5 วิ)
2. ให้อาคารไหม้ → กดเรียกช่างซ่อม → ช่างที่ว่างมาซ่อม
3. ลองทั้ง 4 โซน (ภาพตามโซน) · hard refresh ถ้าไม่เห็นภาพ (manifest cache)

## Rollback
`cd AVEGEE && git revert 98aebd0 && git push` (ย้อนทั้ง logic + ภาพ) · save เก่าอ่านได้ (restoreBuilders รองรับ)
