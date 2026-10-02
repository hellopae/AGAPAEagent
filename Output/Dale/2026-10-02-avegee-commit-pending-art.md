# AVEGEE — commit ภาพที่แก้ค้าง 14 ไฟล์ (2 ต.ค. 2569)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · main `071bdc0` → **`377f3f8`** (pushed)
Live: https://hellopae.github.io/AVEGEE/

## ผลลัพธ์
- commit `377f3f8` มีเฉพาะภาพ 14 ไฟล์ (0 insertions/deletions ของโค้ด) — add ทีละ path ไม่ใช้ `-A`/`.`
- **manifest: ไม่มีอะไรต้อง commit** — กรอง `img/manifest.json` ใน working tree ให้เหลือเฉพาะรายการที่ไฟล์ถูก track ใน git
  (critical/rest/zones กรองออก **89 รายการ**; boxes/stationSizes ไม่มีคีย์ต้องตัด) ผลคือเนื้อหาตรงกับ HEAD เป๊ะ
  (`git diff` ว่าง) — ส่วนต่างทั้งหมดของ manifest ฉบับเดิมคือรายการภาพ untracked ล้วน ๆ (ที่จะ 404 บนเว็บจริง)
  จึงเหลือ manifest ฉบับ HEAD ที่ปลอดภัยอยู่แล้ว (มี `icon-lock.png`, `icon-skip.png` อยู่ใน rest และไฟล์ถูก track)
- ไม่มีการแก้โค้ดเกม ไม่ปรับขนาดภาพ ไม่ add ไฟล์ untracked

## ตารางเกณฑ์
| # | เกณฑ์ | ผล |
|---|---|---|
| 1 | commit มีเฉพาะ 14 ภาพ + manifest | PASS — 14 ภาพ (manifest ไม่ต่างจาก HEAD จึงไม่เข้า commit) |
| 2 | ทุกรายการ manifest มีไฟล์ใน git | PASS — สคริปต์ตรวจ missing = 0 |
| 3 | เทสต์ผ่าน / manifest parse ได้ | PASS — 160/160, JSON parse ok |
| 4 | live 14 ไฟล์ 200 ขนาดตรง | PASS — ตรงทั้ง 14 (ตารางด้านล่าง) |
| 5 | git status ไม่มี M ค้าง | **ไม่ครบ** — ดูหมายเหตุ |

### Live check (cache-bust query, ขนาด live = ขนาดในเครื่อง)
| ไฟล์ | HTTP | bytes |
|---|---|---|
| img/Asia/st-dab-asia.png | 200 | 302384 |
| img/CyberHell/Boss Zone4-cyberhell.png | 200 | 186038 |
| img/CyberHell/st-dab-cyberhell.png | 200 | 330338 |
| img/CyberHell/zone-boss-cyberhell.png | 200 | 186038 |
| img/West/st-dab-west.png | 200 | 290415 |
| img/crew-guard-cutscene.jpeg | 200 | 332571 |
| img/crew-guard-profile.png | 200 | 386010 |
| img/crew-guard.png | 200 | 173333 |
| img/fx-heal.png | 200 | 120468 |
| img/fx-slash.png | 200 | 141298 |
| img/item-tea.png | 200 | 123489 |
| img/merchant.png | 200 | 196825 |
| img/scene-west.png | 200 | 710631 |
| img/st-dab.png | 200 | 258984 |

## หมายเหตุ — M ค้างนอกขอบเขตใบงาน
`git status` ยังมี **7 ไฟล์ modified ที่ไม่อยู่ในใบงาน** (ไม่ได้แตะ ไม่ได้ commit):
`scripts/prep-art.py`, `src/art.js`, `src/data.js`, `src/game.js`, `src/i18n.js`, `src/scene.js`, `src/ui.js`
(รวม ~57+/45-; เป็นงานโค้ดค้างจาก session อื่น — เทสต์ 160 ตัวผ่านทั้งที่มีมันอยู่)
ต้องให้ Claudy/คุณเป้ตัดสินว่าจะ commit หรือทิ้ง · untracked เดิม (Exam/ files/ output/ ภาพ ~99 ไฟล์) คงเดิม

## Rollback
`git revert 377f3f8` แล้ว push (คืนภาพ 14 ไฟล์เป็นเวอร์ชันก่อนหน้า)
