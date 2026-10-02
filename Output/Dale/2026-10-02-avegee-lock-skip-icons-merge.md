# AVEGEE — ไอคอนปุ่ม ขังไว้ก่อน / พักคดีนี้ — รีวิว + merge (Dale, 2 ต.ค. 2569)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · Live: https://hellopae.github.io/AVEGEE/
Codex run `20261002T030245Z-cb3032a1` · branch `codex/20261002T030245Z-cb3032a1` (base `c674737`)
ผล: **PASS** · commit ของ Codex (ค้าง staged ใน worktree → Dale commit) `7b9ccc8` · merge เข้า main `071bdc0` · push แล้ว (`c674737..071bdc0`)

## ไฟล์ที่แก้
- `img/icon-lock.png` (117x128 RGBA พื้นใส, กุญแจทอง) · `img/icon-skip.png` (128x121 RGBA พื้นใส, ปุ่มทองลูกศรข้าม) — ใหม่
- `img/manifest.json` — เพิ่ม 2 รายการ
- `src/ui.js` — `openTrial` ปุ่ม `#t-jail` / `#t-skip` ชี้ `img/icon-lock.png` / `img/icon-skip.png` (class `tab-ico` เดิม ไม่แตะ CSS) + คอมเมนต์ไม่อ้าง `img/raw/` แล้ว
- `src/game.js` — ตัด emoji 🔒 / ⏭️ ออกจากข้อความ log ของการขัง/พักคดี 2 บรรทัด

## สาเหตุจริง
ก่อนหน้านี้ปุ่มชี้ `img/ui/icon-lock.png` / `icon-skip.png` ซึ่งเป็นภาพชุด 15 ที่ถูก quantize มีพื้นหลังม่วงทึบ ไม่ใช่ภาพทองพื้นใสที่คุณเป้ต้องการ → ใช้ภาพใหม่ที่ `img/` แทน (ไฟล์ใน `img/ui/` ไม่ได้ลบ ไม่มีโค้ดอื่นใช้แล้วในปุ่มนี้)

## ตารางเกณฑ์
| # | เกณฑ์ | ผล |
|---|---|---|
| 1 | ปุ่มใช้ `<img>` icon-lock / icon-skip จริง ไม่มี emoji (🔒/⏭️ ในความหมายนี้) | ผ่าน — ดูภาพไฟล์แล้วเป็นกุญแจทอง/ปุ่มทองลูกศรข้าม; grep 🔒/⏭ ทั้ง repo เหลือเฉพาะความหมายอื่น (ตะรางล็อก/ป้ายโซนล็อก/glyph ตะราง) + `CONCEPT.md` (ห้ามแตะ) + เทสต์ที่ยืนยันว่าบทสอน*ไม่*มี emoji |
| 2 | ไฟล์อยู่ใน `img/` โหลดได้ รวม `icon-fang.png` | ผ่าน — `icon-fang.png` ถูก track อยู่ใน git แล้ว (1375x768 ไม่ต้องคัดลอกใหม่); live URL ทั้ง 3 ไฟล์ HTTP 200; ไม่อ้าง `img/raw/` ในโค้ดปุ่ม (ที่เหลือเป็นคอมเมนต์/ fallback เดิมของบอส นอกขอบเขต) |
| 3 | disabled จางเหมือนเดิม ขนาด/ตำแหน่งไม่เปลี่ยน | ผ่านตามโค้ด — ไม่แตะ CSS (`.tab-ico` 20/33/27px เดิม), ไอคอนอยู่ในปุ่มเดียวกัน → จางพร้อมปุ่ม |
| 4 | 390x844 ไม่ล้น | ตรวจไม่ได้ในเบราว์เซอร์ (ไม่ได้เปิดเกมจริง) — ขนาดไอคอนในช่องไม่เปลี่ยนจึงความเสี่ยงต่ำ ให้ Chris/คุณเป้ดูบนจอจริง |
| 5 | เทสต์ / node --check / diff --check | ผ่าน — 155/155 (ทั้งใน worktree และหลัง merge บน main), `node --check` ui.js+game.js, `git diff --cached --check`, manifest.json parse ได้ |
| ข้อห้าม | ไม่แตะ `img/raw/*`, `files/`, `CONCEPT.md`, `Exam/`, `output/` | ผ่าน — diff มี 5 ไฟล์ข้างบนเท่านั้น |

## หมายเหตุการ merge
- main working tree ของ AVEGEE มี `img/manifest.json` ที่ regenerate ค้างไว้ (ลิสต์ไฟล์ untracked ของเดิม ไม่ใช่งานนี้) ชนกับ merge → stash เฉพาะไฟล์นี้, merge, แล้วคืนฉบับเดิมของคุณเป้พร้อมเติม `icon-lock.png`/`icon-skip.png` เข้าไปด้วย (ยังเป็น uncommitted เหมือนเดิม ไม่ได้ commit/ไม่ได้แตะ) · stash ลบแล้ว สำรองไว้ในรอบนี้เท่านั้น
- ไฟล์ untracked/modified ใน `img/` ของเดิม ไม่ได้แตะ

## วิธีตรวจ (Chris/คุณเป้)
เปิด https://hellopae.github.io/AVEGEE/ (hard refresh) → เปิดหน้าสอบสวนคดีใดก็ได้ → ปุ่มบนแถว "ขังไว้ก่อน" ต้องเป็นกุญแจทอง, "พักคดีนี้" เป็นปุ่มทองลูกศรข้าม · ลองตอนคิวเหลือ 1 คดี → "พักคดีนี้" ต้องจาง · ย่อจอ 390 ดูไม่ล้น · DevTools Network ไม่มี 404

## Rollback
`cd AVEGEE && git revert -m 1 071bdc0 && git push` (branch `codex/20261002T030245Z-cb3032a1` ยังอยู่)
