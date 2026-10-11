# AVEGEE — รายงานตัดไฟล์ที่ไม่มีการอ้างอิง

วันที่ตรวจ: 11 ต.ค. 2569 (2026-10-11) · ผู้ทำ: Codex · ผู้ตรวจงานตาม brief: Dale

Worktree: `/Users/agapae/agapae-work/.codex-worktrees/20261011T090027Z-ffc540c1`

Branch: `codex/20261011T090027Z-ffc540c1`

ฐาน main: `3ba2cda36bf1d50ec26a9062663c02ffcd181ea6`; ตรวจด้วย `git ls-remote origin refs/heads/main refs/heads/codex-app/2026-10-04` แล้วตรงกับ refs ที่ใช้สแกน

Branch ที่คุ้มครอง: `origin/codex-app/2026-10-04` = `69a08c523a4255988320eebdc4a7cb5c19611900`

ไม่ได้ commit, stage, merge, push, deploy, แก้ hooks, status.json หรือ worklog.json; ไม่เรียก agent อื่น และไม่แก้พื้นที่ต้นฉบับ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## ผลที่ตรวจได้

ลบ 60 ไฟล์ รวม 5,930,902 bytes (5.66 MiB): output 58 ไฟล์ และ HTML ทดสอบ root 2 ไฟล์ ไม่มีภาพ/เสียง runtime ถูกลบหรือแก้ไข

ขนาด runtime ไม่ลดในรอบนี้: เก็บภาพและเสียงทั้งหมด เพราะ manifest/catalog และ path ไดนามิกยังคุ้มครองไฟล์เหล่านั้น การมีชื่อรุ่นเก่าไม่ใช่หลักฐานพอสำหรับลบ

## ข้อจำกัดตำแหน่งส่งรายงาน

ตำแหน่งที่ brief กำหนด: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-11-prune/REPORT.md`

session นี้มีสิทธิ์เขียนเฉพาะ worktree และ temporary directories พร้อม approval policy = never จึงเขียนตำแหน่งนั้นไม่ได้ รายงานฉบับนี้อยู่ที่ `/private/tmp/2026-10-11-prune/REPORT.md` ไม่สร้าง `AGAPAE Agent/` ใน repo และเกณฑ์ตำแหน่งส่งยังไม่ครบ

## วิธีสแกนและข้อจำกัดการพิสูจน์

`node scripts/find-unused-assets.mjs > /tmp/unused-assets.json` เป็นคำสั่งอ่านอย่างเดียว ไม่ลบไฟล์เอง ไม่ execute โค้ดที่สแกน และไม่เปลี่ยน Git

สแกน tracked text files ที่ยังมีอยู่ ได้แก่ index.html, src JS/CSS, manifest/preload-catalog, JSON/CSS อื่น, scripts, tests, output previews รวมถึงเอกสารเพื่อคุ้มครอง reference เพิ่มเติม จากทั้ง worktree และ branch ที่กำหนด โดยไม่แก้ Exam/docs

ตรวจ literal paths, CSS url(...) ทั้งมี/ไม่มี quote, relative paths, JSON paths ใต้ img และ semantic keys เช่น artUrl("hero-yama-atk") พร้อม suffix variants ที่มีจริง Template strings/Python f-strings ที่คำนวณค่าไม่ได้ถูกแปลงเป็น wildcard แล้วแจกแจงไฟล์จริงทุกไฟล์ที่ตรงไว้ใน unresolvedPatterns; wildcard อนุญาต path separator จึงไม่เดาสุ่มขอบเขตของค่า

กรณี `img/deva-intro/deva-intro-${zone}-v1-web.mp4` เก็บทุกไฟล์ที่ตรงรูปแบบ รวมค่าที่ไม่รู้ล่วงหน้า กรณี `"img/" + path` / generic artUrl fallback เก็บ img ทั้ง subtree อย่างอนุรักษ์นิยม Split joins ใน scripts คุ้มครอง directory ทั้งต้น ไม่ลบไฟล์ต้นฉบับเพื่อแลกขนาด

แยก base href, ข้อความ i18n และ assertion prefixes ออกจากการอ้างทั้ง subtree ของไฟล์เสริม; concrete references ในเอกสาร/เทสต์ยังคุ้มครองไฟล์ รายการ unused เป็น candidate ที่ต้องทบทวน ไม่ใช่ static-analysis proof ทั่วไปสำหรับโค้ดทุกชนิด และไม่พิสูจน์ว่า retained ทุกไฟล์ถูกใช้ระหว่างเล่นจริง

ภาพทุกไฟล์คงเดิม และไม่มี deletion ใน manifest/catalog จึงไม่จำเป็นต้อง regenerate หรือแก้ entry; ไม่มีการปรับเทสต์เพื่อลดมาตรฐาน

## จำนวน/ขนาดก่อน–หลัง

หน่วยในตารางเป็น MiB = 1,048,576 bytes; มี bytes จริงสำหรับเทียบเพดานที่เอกสารใช้คำว่า MB

| ชุดไฟล์ | ก่อน (ไฟล์) | หลัง (ไฟล์) | ก่อน (bytes / MiB) | หลัง (bytes / MiB) |
|---|---:|---:|---:|---:|
| Runtime bundle upper bound | 872 | 872 | 552,033,586 / 526.46 | 552,033,586 / 526.46 |
| Footprint ตามการนับกว้างใน brief | 912 | 910 | 582,455,670 / 555.47 | 582,449,351 / 555.47 |
| Tracked files ที่ยังอยู่บนดิสก์ | 1178 | 1118 | 640,950,005 / 611.26 | 635,019,103 / 605.60 |
| output/ | 89 | 31 | 16,546,902 / 15.78 | 10,622,319 / 10.13 |

Runtime upper bound = index.html + .nojekyll + src/** + img/** + audio/** โดยตัด master ที่แจกแจงด้านล่างและ .md/.txt ออก ยังรวม fallback/catalog assets ที่ยังพิสูจน์ว่าเลิกใช้ไม่ได้ ไม่ใช่ zip build ที่ทดสอบบน itch.io แล้ว

Footprint ตาม brief ตัด tests/scripts/docs/output/Exam แต่ยังรวมเอกสาร root และ HTML ทดสอบ จึงต่างจาก runtime นับจาก tracked files ที่มีจริง; Git index ยังมี 1,178 entry เพราะไม่ได้ stage การลบ สคริปต์ใหม่ยัง untracked และไม่รวมในสถิติ tracked ก่อน–หลัง หากรวมสคริปต์ใหม่ ชุดไฟล์ที่เหลือมี 1,119 ไฟล์

สคริปต์ใหม่มี 7,525 bytes; net ลดขนาด worktree เมื่อรวมสคริปต์ใหม่ 5,923,377 bytes (5.65 MiB)

## Exam/docs — รายงานแยก ไม่แก้หรือลบ

| โฟลเดอร์ | ไฟล์ tracked | bytes | MiB |
|---|---:|---:|---:|
| Exam/ | 12 | 40,750,791 | 38.86 |
| docs/ | 24 | 229,146 | 0.22 |

## ต้นฉบับ/authoring ที่เก็บไว้ ไม่ใช่ runtime bundle

รายการนี้ควรตัดออกจากชุดส่ง itch.io ภายหลัง โดยเก็บใน repo สำหรับสร้างงานต่อ ไม่ได้ลบในงานนี้

| path | bytes | เหตุผล |
|---|---:|---|
| `img/cover-v4-full.png` | 2,684,462 | ต้นฉบับ cover ที่ h5b-cover-masks-v4.py อ่าน; make-preload-catalog.mjs ไม่ preload master |
| `img/raw/yama-sword-v1/asia-aligned.png` | 1,609,682 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v1/asia.png` | 1,553,091 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v1/cyberhell-aligned.png` | 1,311,631 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v1/cyberhell.png` | 1,274,950 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v1/th-aligned.png` | 1,236,656 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v1/th.png` | 1,191,578 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v1/west-aligned.png` | 1,702,989 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v1/west.png` | 1,665,489 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v2/asia-aligned.png` | 1,354,801 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v2/asia.png` | 1,330,450 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v2/cyberhell-aligned.png` | 1,209,683 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v2/cyberhell.png` | 1,189,184 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v2/th-aligned.png` | 1,192,771 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v2/th.png` | 1,173,743 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v2/west-aligned.png` | 1,379,421 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v2/west.png` | 1,364,765 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v3/th-aligned.png` | 1,227,119 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/raw/yama-sword-v3/th-facing-right.png` | 676,347 | raw master / aligned authoring intermediate สำหรับ export sword |
| `img/yama-sword-v2/hero-yama-asia-sword.webp` | 1,039,796 | atlas รุ่นก่อนที่ export-yama-sword-facing.py อ่านเป็น source; ไม่มีใน catalog/manifest ปัจจุบัน |
| `img/yama-sword-v2/hero-yama-cyberhell-sword.webp` | 857,062 | atlas รุ่นก่อนที่ export-yama-sword-facing.py อ่านเป็น source; ไม่มีใน catalog/manifest ปัจจุบัน |
| `img/yama-sword-v2/hero-yama-th-sword.webp` | 935,902 | atlas รุ่นก่อนที่ export-yama-sword-facing.py อ่านเป็น source; ไม่มีใน catalog/manifest ปัจจุบัน |
| `img/yama-sword-v2/hero-yama-west-sword.webp` | 1,007,310 | atlas รุ่นก่อนที่ export-yama-sword-facing.py อ่านเป็น source; ไม่มีใน catalog/manifest ปัจจุบัน |

รวม 23 ไฟล์ 30,168,882 bytes (28.77 MiB)

## รายการไฟล์ที่ลบ

ทุกแถวไม่มี incoming reference ที่พบใน worktree/branch ที่คุ้มครอง, catalogs/JSON/CSS, scripts และ auxiliary tests/previews/documents รวมทั้งไม่มี unresolved protected pattern ที่ตรง มี scan-before.json เป็นหลักฐานขนาดก่อนลบ ไม่อ้างว่าไฟล์ถูกแทนด้วยรุ่นใหม่หากไม่ได้พิสูจน์

| path | bytes | เหตุผล |
|---|---:|---|
| `_depthtest.html` | 4,427 | หน้า debug ทดสอบ root ไม่มี incoming reference และไม่ใช่ entry point เกม |
| `_walktest.html` | 1,892 | หน้า debug ทดสอบ root ไม่มี incoming reference และไม่ใช่ entry point เกม |
| `output/Toby/2026-10-03-avegee-29b.md` | 5,902 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/Toby/2026-10-03-avegee-29d.md` | 16,585 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/Toby/2026-10-03-avegee-29e.md` | 6,362 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/Toby/2026-10-03-avegee-29f.md` | 13,552 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/construction/preview.html` | 3,100 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/construction/prompts.json` | 9,569 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/crew-walk/generation.json` | 42,546 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/crew-walk/preview.html` | 2,573 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/crew-walk/preview.jpg` | 167,464 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/crew-walk/prompts.json` | 37,366 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/crew-walk/sheets.json` | 19,913 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/crew-walk/test-results.txt` | 39,524 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/final-reinforcements/frontal-camera-edit.json` | 3,934 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/final-reinforcements/preview.html` | 4,425 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/final-reinforcements/preview.jpg` | 599,856 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/final-reinforcements/prompts.json` | 15,561 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/final-reinforcements/test-results.txt` | 39,897 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/frontier/README.md` | 1,615 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/frontier/push-test-results.txt` | 37,088 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/frontier/test-results.txt` | 37,204 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/frontier/zone1.png` | 131,640 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/frontier/zone2.png` | 133,579 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/frontier/zone3-mobile.png` | 65,444 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/frontier/zone3.png` | 167,365 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/frontier/zone4-mobile.png` | 62,461 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/higgsfield/avegee-opening-preview.mp4` | 3,249,564 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/higgsfield/render_home_motion.py` | 4,276 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/leaders/README.md` | 2,020 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/leaders/final-inspector-wave-8.png` | 56,222 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/leaders/guard-proportions.json` | 1,434 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/leaders/guard-zone-proportions.json` | 3,032 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/leaders/rest-after-demons.png` | 57,736 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/leaders/rest-before-final.png` | 54,088 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/oriverse/mobile-cyberhell.png` | 77,606 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/oriverse/th-behind.png` | 213,933 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/oriverse/th-front.png` | 213,426 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/story/README.md` | 3,482 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/story/army-edit.json` | 1,272 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/story/duel-edit.json` | 1,464 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/story/ending-cast-edits.json` | 5,296 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/story/ending-yama-pose-edit.json` | 1,759 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/story/map-assets.json` | 22,292 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/story/minion-assets.json` | 3,389 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/story/nira-perspective-edit.json` | 2,821 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/story/source-assets.json` | 7,297 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/yama-walk/preview.html` | 2,282 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/yama-walk/preview.jpg` | 113,631 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/yama-walk/prompts.json` | 5,749 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/yama-walk/test-results.txt` | 39,769 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/zone-update/README.md` | 1,570 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/zone-update/claude-log.txt` | 59 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/zone-update/claude-review-followup.txt` | 2,466 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/zone-update/claude-review-task.txt` | 610 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/zone-update/claude-task.txt` | 3,116 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/zone-update/soul-result.md` | 1,670 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/zone-update/spirit-cast-proof.png` | 65,945 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/zone-update/test-results.txt` | 39,027 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |
| `output/zone-update/ui-result.md` | 1,755 | ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน |

## เพดาน itch.io ที่ตรวจจากเอกสารปัจจุบัน

แหล่งหลัก: [itch.io — Uploading HTML5 games / ZIP file requirements](https://itch.io/docs/creators/html5#zip-file-requirements), เปิดตรวจ 2026-10-11

ZIP หลังแตกต้องไม่เกิน 1,000 ไฟล์, ขนาดรวมไม่เกิน 500 MB, ไฟล์เดี่ยวไม่เกิน 200 MB, ชื่อรวม path ไม่เกิน 240 characters; ชื่อ case-sensitive และ UTF-8, มี index.html เป็น entry point

Runtime upper bound หลังงาน 872 ไฟล์ / 552,033,586 bytes (526.46 MiB) ยังเกิน 500 MB ทั้งเมื่ออ่านเป็น decimal MB และ binary MiB จึงไม่อ้างว่าพร้อมอัปโหลด ไม่ได้สร้างแพ็กเกจหรืออัปโหลด

## ผลการตรวจ

- `node --test tests/*.test.mjs` ก่อนลบ: exit 0; 743 tests, 743 pass, 0 fail / skipped / cancelled
- `node --test tests/*.test.mjs` หลังลบ: exit 0; 743 tests, 743 pass, 0 fail / skipped / cancelled
- Scanner fixtures ใน temporary directory: direct path, unquoted CSS, relative JSON, catalog, branch-only ref, script source, semantic suffix, unresolved zone templates, irrelevant placeholders/base href/assertion prefixes, split joins, broad fallback และ missing branch fail-closed ได้ผลตาม assertions; fixture ใช้ git shim ไม่ commit
- `node --check scripts/find-unused-assets.mjs`: exit 0
- `git diff --check`: exit 0
- สแกนซ้ำหลังลบ: exit 0; unused 0 ในชุดที่ยังอยู่ ไม่พบ protected candidate ถูกลบ เทียบรายการลบกับ scan-before และ git diff แล้วตรงกัน
- ตรวจ `node scripts/check-image-archive.mjs` เพิ่มเติม: ไม่สำเร็จ (exit 1) ระหว่าง import src/i18n.js เพราะ mock document ในสคริปต์ไม่มี documentElement; ไม่ได้แก้สคริปต์เดิมเพื่อขยายขอบเขต และไม่อ้างว่าการตรวจเสริมนี้ผ่าน

ไม่มี browser gameplay QA หรือการอนุมัติ QA จาก Dale ในงานนี้ ผลเทสต์ข้างต้นเป็นผลคำสั่งที่รันเท่านั้น

หลักฐานใน `/private/tmp/2026-10-11-prune/`: scan-before.json, scan-after.json, tests-before.tap, tests-after.tap, scanner-fixtures.mjs และ asset-check.txt

## Self-check ตามเกณฑ์รับงาน

1. **เนื้อหารายงานครบ แต่ตำแหน่งส่งยังไม่ครบ**: มีตารางลบพร้อมขนาด/เหตุผล, runtime ก่อน–หลัง, authoring originals, Exam/docs และเพดาน itch.io ที่ตรวจแล้ว รายงานอยู่ temporary path เพราะ sandbox ไม่อนุญาต path ที่กำหนด
2. **เทสต์ที่กำหนดได้ผลผ่านครบ**: 743/743 หลังลบ ไม่มีการแก้ tests ไม่อ้าง QA ผ่าน; การตรวจเสริม archive script มีข้อขัดข้องตามรายละเอียดด้านบน
3. **สคริปต์ใช้ซ้ำอยู่ใน scripts/**: scripts/find-unused-assets.mjs, read-only JSON output, คุ้มครอง branch ที่กำหนดและ fail เมื่อไม่มี branch ทดสอบด้วย fixtures และสแกน repo ก่อน/หลังแล้ว

ยังไม่บรรลุเป้าลดขนาด runtime; รอบนี้ลดเฉพาะไฟล์นอก runtime ที่พิสูจน์ได้ตามนโยบายอนุรักษ์นิยม ไม่ขยายงานไปปรับ catalog/โค้ดเพื่อปลดการอ้างอิงภาพ
