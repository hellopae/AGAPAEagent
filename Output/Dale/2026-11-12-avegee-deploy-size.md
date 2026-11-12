# AVEGEE — ลดขนาด deploy ต่ำกว่า 1 GB + แปลงภาพเป็น WebP · 12 พ.ย. 2569

ใบงาน: `Output/Claudy/briefs/2026-11-12-avegee-deploy-size.md` · ผู้ทำ: Dale · live: https://hellopae.github.io/AVEGEE/

## ผล: PASS (เกณฑ์ 3 ข้อ)

| เกณฑ์ | ผล |
|---|---|
| artifact <= 850 MB ไม่มีคำเตือน | **681 MB** (681,192,315 bytes) · Actions ไม่มีคำเตือน "exceeds 1 GB" |
| เกมบน URL จริงเล่นได้ 404 = 0 | ผ่าน ทั้ง 390x844 และ 1792x958 (ดูข้อ 404) |
| เทสต์ผ่าน | 2063 / 2063 (ดูหมายเหตุ flake) |

## วิธี deploy เดิม / ใหม่

- **เดิม**: GitHub Pages แบบ legacy (branch main / root) เสิร์ฟทั้ง branch รวม `tests/` `scripts/` `docs/` `output/` `art-src/` = **1,145 MB** (1,145,096,438 bytes) เกิน 1 GB และมีคำเตือนทุกครั้ง
- **ใหม่**: GitHub Actions workflow `.github/workflows/pages.yml` (ชื่อ "Deploy Pages") — รันเมื่อ push main หรือสั่งมือ · คัดไฟล์แบบ allowlist ลง `_site/` = `index.html` `.nojekyll` `src/` `img/` `audio/` แล้ว upload-pages-artifact + deploy-pages · มีด่านล้มถ้า staged > 1,000,000,000 bytes · ตั้ง Pages `build_type=workflow` ด้วย `gh api -X PUT repos/hellopae/AVEGEE/pages -f build_type=workflow`
- ไม่ได้ย้ายหรือลบไฟล์ใน repo เพื่อลดขนาด — ทดสอบในเครื่อง/CI ที่อ้าง `output/` `art-src/` ยังรันได้เหมือนเดิม

## ขนาดก่อน / หลัง

| ขั้น | commit | artifact |
|---|---|---|
| เดิม (ทั้ง branch) | `89fb1a35` | 1,145,096,438 bytes (1,145 MB) |
| allowlist | `4635d8c8` | 916,626,877 bytes (917 MB) |
| allowlist + WebP | `1ee18746` | **681,192,315 bytes (681 MB)** |

ขั้น WebP โดยเฉพาะ: ไฟล์ PNG/JPEG ที่แปลง 594 ไฟล์ **414.3 MB -> 171.3 MB** (-243 MB, -59%) · `img/` ทั้งหมด 917 -> 674 MB
- ภาพวาด/ฉาก/คัตซีนทึบ 246 ไฟล์ (lossy q86 method 6): 228.6 -> 48.0 MB
- สไปรต์/ไอคอน/UI/ภาพมีอัลฟา 452 ไฟล์ (lossless): 185.7 -> 123.3 MB
- repo บน GitHub (.git) **4.36 GB ไม่เปลี่ยน** (ประวัติยังเก็บ PNG เดิม ไม่ได้เขียนประวัติใหม่)

## รายการที่ตัดออกจาก artifact (ยังอยู่ใน repo)

`tests/` `scripts/` `docs/` (20 MB) `output/` (176 MB) `art-src/` (29 MB) `*.md` ที่ root `launch.sh` `.github/` — สแกนหาไฟล์ใน `img/` `audio/` ที่ไม่มีโค้ด runtime อ้างด้วย `scripts/find-unused-assets.mjs` (ตัดแหล่งอ้างอิงที่ไม่ใช่ runtime ออก): **ไม่พบไฟล์ใช้ไม่ได้ใน `img/` `audio/` เลย** (ที่ไม่ถูกอ้างอยู่แต่ `output/`) จึงไม่ลบไฟล์เกมใดแม้แต่ไฟล์เดียว

## แปลง WebP — รายละเอียด

- แปลงเฉพาะที่เกมโหลด (เจอชื่ออ้างใน src / index.html / manifest) ขนาดพิกเซลเท่าเดิมทุกไฟล์ · 594 ไฟล์ · ไฟล์ที่ WebP ไม่เล็กลง >= 15% = ข้าม (มี 1 ไฟล์ คือ flow ของโซน 3)
- **ไม่แปลง (คงเป็น PNG)**: `img/map-zone1/v5-fx/shader/*.flow.png` (94) + `flow-v*.png` (4) = ข้อมูลทิศการไหลที่ shader อ่านเป็นตัวเลข ประหยัดแค่ 3 MB ไม่คุ้มเสี่ยง · `img/cover-fx/*-mask.png` (4 มาสก์ เล็กมาก) · `img/icon-sword.png` เก็บไว้เป็น favicon (ไฟล์ WebP ของไอคอนเดียวกันมีไว้ให้เกมใช้)
- แก้ path: `src/` (36 ไฟล์) · `index.html` · `img/manifest.json` + `img/preload-catalog.json` · `tests/` (89 ไฟล์) · สคริปต์ 3 ตัวที่อ่านไฟล์ (`measure-yama-fit.py`, `s1-soul-pose-evidence.mjs`, `make-preload-catalog.mjs`) · `artUrl(key,'png')` ใน `art.js` คืน `.webp` เมื่อชื่อลงท้าย png (ผู้เรียกเดิมไม่ต้องแก้) · regex ใน `asset-preload.js` เปลี่ยนเป็น webp
- **cache-bust**: ต่อท้าย `-w1112` ให้รายการ importmap ที่มีอยู่แล้ว 44 รายการ (ทุก alias ของโมดูลที่แก้) + สคริปต์ `ui.js` + `battle-turns.css` + เพิ่มรายการใหม่ 14 รายการ (8 โมดูลที่ไม่เคยมีเวอร์ชัน และ alias ของ specifier ที่ฝัง `?v=` ในโค้ด 6 ตัว (mirror-charge x3, sala, asipatta-swords, sword-school-props) · กันผู้เล่นเก่าที่แคช JS เก่าไว้ขอ .png ที่ไม่มีแล้ว
- ลบ PNG/JPEG เดิม 593 ไฟล์ (ย้อนได้จาก git)

### เทียบภาพ (>= 10 ภาพ ตามที่สั่ง)

ตรวจ **ทั้ง 594 ไฟล์** ด้วยโปรแกรม: ขนาดตรงทุกไฟล์ · ไฟล์ lossless ทั้งหมด (452) **ตรงกับต้นฉบับทุกพิกเซลรวมอัลฟา** (ซ้อนบนพื้นดำ/ขาว/ม่วงแล้ว diff = 0) จึงไม่มี fringe และเฟรมใน sprite sheet ไม่ขยับ · lossy 246 ไฟล์ diff เฉลี่ยสูงสุด 5.1/255 (ภาพคัตซีน story-cyberhell-03) ตรวจด้วยตา 12 ภาพ ภาพเทียบ ต้นฉบับ | webp | diff x8:
- `Output/Dale/2026-11-12-avegee-deploy-size-evidence/sheet-lossy.png` — คัตซีน/ฉาก/พื้นหลัง 6 ภาพ (story-cyberhell-03-v4, tea-th-recovery, hero-yama-th-ice-cutscene-v2, leader-th-attack-cutscene, Intro-Boss-Zone4-cyberhell, BG-frontier) ไม่เห็นความต่างที่ 100% มีแค่ noise ตามขอบใน diff
- `.../sheet-alpha.png` — ตัวละคร/สไปรต์/UI 6 ภาพ (hero-yama, mob-bot-walk, hero-yama-walk-4dir-v2, crew-taan-profile, ui/icon-bg, hero-yama-west-atk) diff ดำสนิท

## ผล 404 (URL จริง)

Chromium + Playwright บน https://hellopae.github.io/AVEGEE/ หลัง deploy `1ee18746`: หน้าแรก -> START -> ข้ามอินโทร -> สู้ในโซน 1-4 (เปิดหน้าต่างสู้จริงด้วยปุ่ม "กดเพื่อเข้าสู้" แล้วจบสู้) -> เดินเมืองโซน 1 ตามเส้นทาง 10 ช่วง
- 390x844 @2 (มือถือ): 1,097 responses / 979 URL **HTTP 4xx/5xx = 0 · console error = 0 · pageerror = 0**
- 1792x958 @2: 1,097 responses / 988 URL **0 / 0 / 0**
- มีรายการเดียวที่ถูกยกเลิก (ไม่ใช่ error): `intro-opening-v3.mp4` ตอนสคริปต์กดข้ามอินโทร (เหมือนรอบก่อน)
- ไฟล์ทุกชื่อใน `preload-catalog.json` + `manifest.json` (1,559 รายการ) ตรวจว่ามีในดิสก์ครบ ขาด 0
- ที่ไม่ได้ทดสอบ: มือถือจริง · ฉากเรื่อง/คัตซีนโซน 2-4 ที่ต้องเล่นถึงเงื่อนไข (ตรวจผ่านเทสต์ + แคตตาล็อก ไม่ได้เล่นถึง)

## commit

| commit | เนื้อหา |
|---|---|
| `4635d8c8` | Pages: deploy จาก allowlist workflow |
| `1ee18746` | แปลง PNG/JPEG เป็น WebP (594 ไฟล์) + แก้ path / เทสต์ / cache-bust |

ทั้งคู่ push ปกติเข้า main ไม่ force · ทำงานใน worktree `~/agapae-work/.dale-worktrees/deploy-size` (branch `dale/webp`) · ไม่แตะ `Documents/Work PAE/Claude/AVEGEE`, LaunchAgent, `.codex-worktrees` · clone `~/agapae-work/AVEGEE` ยังไม่ได้ pull (เซิร์ฟเวอร์ 8942 ไม่ต้องอัปเดตตามใบงาน)

## เทสต์

`node --test tests/*.test.mjs`: **2063 ผ่าน / 0 ไม่ผ่าน** บน commit `1ee18746`
- แก้เทสต์: ที่อ่าน header PNG ตรง ๆ ใช้ `tests/helpers/image-meta.mjs` (อ่านขนาด/อัลฟาของ PNG, JPEG, WebP ไม่พึ่งไลบรารี) · ที่ถอดพิกเซลใช้ `tests/helpers/decode-rgba.mjs` (python3 + Pillow ซึ่งเทสต์อื่นใช้อยู่แล้ว) · เทสต์ที่ล็อกเลขเวอร์ชัน release รับ `-w1112` ต่อท้าย · `balance2` เพิ่ม fixture ย้อนข้อความ `tests/fixtures/webp-1112-asset-ext-changes.json` (data.js / game.js เปลี่ยนแค่นามสกุลไฟล์ภาพ ไม่แตะสูตรสู้) · `map-z4-terrain` ข้ามการตรวจ hash ของไฟล์ภาพที่แปลงแล้ว (ต้นฉบับอยู่ใน git)
- หมายเหตุ: `workers.test.mjs` เคย timeout 30 วินาทีรอบรันเต็มเพราะเครื่องโหลดหนัก (python ถอดภาพ) รันเดี่ยวผ่าน 20/20 ใน 15 วินาที

## วิธีตรวจ (Chris / คุณเป้)

1. เปิด https://hellopae.github.io/AVEGEE/ (ล้างแคช หรือหน้าต่างส่วนตัว) ย่อ 390 px -> START -> เมืองโซน 1 -> สู้ 1 ครั้ง -> เปิด DevTools Network ต้องไม่มีแดง
2. สลับไปโซน 2-4 ดูภาพบอส/คัตซีน/ตัวละคร ต้องขึ้นและคมเท่าเดิม
3. ดู Actions: https://github.com/hellopae/AVEGEE/actions workflow "Deploy Pages" ต้องเขียว

## วิธีย้อนกลับ

- ย้อนเฉพาะ WebP: `git revert 1ee18746` บน main แล้ว push (workflow deploy ให้เอง) -> artifact กลับเป็น 917 MB
- ย้อนทั้งหมดกลับ Pages แบบเดิม: `git revert 1ee18746 4635d8c8` + `gh api -X PUT repos/hellopae/AVEGEE/pages -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/'` (กลับไปเกิน 1 GB)

## เรื่องที่คุณเป้ต้องตัดสิน / ส่งต่อ

1. **สคริปต์สร้างภาพยังเขียน PNG**: `scripts/prep-art.py` (และงานวาดใหม่ที่วางเป็น PNG) -- เกมตอนนี้หา `.webp` ภาพใหม่ที่ drop เป็น PNG จะ**ไม่ขึ้น** ต้องแปลงเป็น WebP ก่อนวาง หรือให้ Toby/Dale ปรับ `prep-art.py` ให้เซฟ WebP (ผมไม่ได้แก้เพราะเป็นไปป์ไลน์ศิลป์ ขอสั่งแยก)
2. ลดต่อได้อีกถ้าต้องการ: `img/map-zone1/` v2-v4 ภาพพื้นเก่า (~18 MB) + `map-v5` (73 MB) อาจเป็น fallback ที่ยังถูกเรียก ไม่ได้แตะเพราะสแกนแล้วยังมีโค้ดอ้าง · ปัจจุบัน 681 MB เผื่อโตได้อีก ~170 MB ก่อนถึงเป้า 850 MB
3. ภาพคัตซีน/ฉากที่เป็น lossy q86 แก้กลับเป็นต้นฉบับ PNG ได้จาก git ถ้าคุณเป้เห็นว่าภาพนุ่มไปในจุดไหน (เทียบแล้ว 12 ภาพไม่เห็นต่าง)
4. ของ Toby ที่ค้างจากรอบก่อน (ป้ายศัตรู 390 px ฯลฯ) ยังอยู่ ไม่เกี่ยวกับงานนี้
