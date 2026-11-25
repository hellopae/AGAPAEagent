# Dale: AVEGEE FB3-CLEAN ลบไฟล์เกมที่ไม่ได้ใช้แล้ว · 26 พ.ย. 2569

ผล: **เสร็จ · merge เข้า main แล้ว** `5ca0ab78` (fast-forward จาก `b95ece93`) · Deploy Pages run **45685939924** success (ครั้งแรกล้มที่ `deploy-pages` "Deployment failed, try again later" หลังอัปโหลดผ่าน -> `gh run rerun --failed` -> success)
branch `dale/fb3-clean` ยัง push ไว้ · worktree `~/agapae-work/.dale-worktrees/clean`

## สรุปตัวเลข
| | ก่อน | หลัง |
|---|---|---|
| ลบ | | **65 ไฟล์ · 52.7 MB ใน repo** (ใน Pages จริง 34.7 MB เพราะ MP4 เทวดา 4 ไฟล์ 17.9 MB ถูกตัดออกจาก deploy อยู่แล้ว) |
| ชุด deploy (workflow staged bytes) | 980,979,541 (3147 ไฟล์) | **946,262,370 (3086 ไฟล์)** = **-34,717,171** |
| ที่ว่างใต้เพดาน 1,000,000,000 | ~19.0 MB | **~53.7 MB** |
| `asset-404-scan.py` (150 ขั้น 4 โซน ศึกทุกชนิด สอบสวน ปุ่มทุกปุ่ม) | 4xx 0 · ภาพเสีย 0 | 4xx **0** · ภาพเสีย **0** · page error 0 |
| `node --test tests/*.test.mjs` | 2581 pass | tests 2581 · pass **2581** · fail 0 · cancelled 0 |

ไม่มี `npm run build` ใน AVEGEE (เว็บ static ตรง ๆ) "ขนาด build" = ชุดที่ workflow stage ขึ้น Pages

## ตารางที่ลบแล้ว (ลบได้แน่)
วิธีพิสูจน์ทั้ง 3 ทาง: (a) ค้นชื่อตรงตัว/ส่วนชื่อ (ตัดเป็น token) ใน `src/` `index.html` `img/*.json` `tests/` `scripts/` · (b) ไล่โค้ดที่ประกอบ path ตอนรัน (zone-skin `PLANNED_ART`, `ZONE*_GROUND`, `route-geometry`, `story.panel()`, `cover-fx-h5b`) และ import `ZONE_SKIN` จริงใน Node ดูค่า `art` ที่ resolve แล้วของทุกโซน · (c) เสิร์ฟเกมด้วยเซิร์ฟเวอร์ที่ log ทุก request แล้วรัน scan เต็ม: 1,142 URL ที่เบราว์เซอร์ขอ (846 ไฟล์สื่อที่มีอยู่จริง) **ไม่มีไฟล์ในรายการลบเลยสักไฟล์**

| กลุ่ม | ไฟล์ | ขนาด | เหตุผล |
|---|---|---|---|
| D1 | `img/story-cyberhell-02-v3.mp4` `-03-v4.mp4` | 7.5 MB | `story.js` panel cyberhell-02/03 สร้างแค่ `.webp` ไม่มี `video:` · `z4h-final.js` ใช้ `.webp` · ui เล่นวิดีโอเฉพาะ `p.video` |
| D2 | `img/deva-intro/*.mp4` x4 | 17.9 MB (ใน Pages 0) | โค้ดใช้ `.webp` · workflow ตัดออกจาก deploy อยู่แล้ว · **ต้องลบสเต็ป `rm --` ใน `.github/workflows/pages.yml` ด้วย** ไม่งั้น deploy ล้มเพราะหาไฟล์ไม่เจอ (ทำแล้ว) |
| D3 | `img/frontier-route/` zone1-2-v1 v2 v3 · zone2-3-v1 v2-stairs v3-cave · zone3-4-v1 (7 ไฟล์) | 4.9 MB | `route-geometry.js` ใช้ zone1-2-v6 / zone2-3-v4 / zone3-4-v2 · ชื่อเก่าเหลือแค่ในข้อความ fixture ของเทสต์ (ไม่ได้เปิดไฟล์) |
| D4 | `theme-v4/town-judgment-asia-v2` · `town-lamp-asia-v1` · `town-district/house-{front-one,right-one,left-two,right-two}-asia-v1` (6 ไฟล์) | 7.5 MB | `PLANNED_ART('asia')` สร้างชื่อ v1/v2 แต่ถูก `ASIA_TOWN_SPRITES` (-v3) ทับ · `ZONE_SKIN.asia.art` ที่ resolve จริงชี้ v3 เท่านั้น · ไม่มีเทสต์/สคริปต์/catalog อ้าง |
| D5 | `img/map-zone1/v2/*` และ `v3/*` (42 ไฟล์ ชุดพื้นแผนที่โซน 1 รุ่นเก่า) | 11.7 MB | ไม่อยู่ใน `ZONE1_GROUND` (มีแค่ v5, v7r) ไม่มีโค้ดประกอบ path · เกมใช้ v7r · เทสต์ k1d แค่เช็คว่า `v2-full.png` ไม่มี |
| D6 | `img/cover-fx/{fire,lava,soul,volcano}-mask.png` | 14 KB | โค้ดโหลด `${kind}-v4-mask.png` |

commit `5ca0ab78` "FB3-CLEAN" (65 ไฟล์ลบ + แก้ workflow)

## ที่ไม่ได้ลบ (ควรรู้)
- **CSS `.flee-layer/.flee-card` ไม่ใช่โค้ดตาย** และอยู่ใน `src/battle-turns.css` (ไม่ใช่ index.html): หน้าต่าง "อัญเชิญ" ของตะเกียงวิเศษ (`ui.js:4808`, `lamp.css:41`) ยังใช้ทั้งสองคลาส · ลบแล้วหน้าต่างอัญเชิญจะพัง · ไม่ได้แตะ (ข้อสังเกตในรีวิว T1 ของฉันเดิมผิด ขอแก้)
- Worktree `z1-v5`: ดูหัวข้อท้าย
- ไฟล์ที่คิว Codex FB3 (C1a C1b C1c C2 C3 C4 C5a C5b C5c C6) จะวาดทับ: ไม่มีไฟล์ใดอยู่ในรายการลบ (ตรวจชื่อไฟล์ทุกตัวกับ `Output/Codex/runs/art-1126-*.md` + PLAN.md)

## ตารางไม่แน่ใจ (ไม่ลบ · รอคุณเป้ตอบ) 341 ไฟล์ ~117 MB
แผ่นภาพย่อ (ชื่อไฟล์ใต้ภาพ): `Output/Review/2026-11-26-fb3-clean-ask/sheet-A1 ... A6.png` (ภาพกลุ่ม A5/A6 เป็นพรีวิวของชุดพื้นแต่ละชุด)

| กลุ่ม | ไฟล์ | ขนาด | ทำไมไม่แน่ใจ | ข้อเสนอ |
|---|---|---|---|---|
| A1 | `nira-combat/nira-{th,asia,west,cyberhell}-sheet-v1.webp` (4) | 6.6 MB | โค้ดเลือก v2 ครบ 4 โซน v1 เข้าไม่ถึง แต่เทสต์ `p9-art-insert` เขียนว่า "v1 kept (art is never overwritten)" = กติกาเก็บต้นฉบับ | ลบได้ถ้าคุณเป้ยกเลิกกติกานี้ (ต้องแก้เทสต์บรรทัดเดียว) |
| A2 | `frontier-route/zone1-2-v4.webp` | 2.6 MB | อยู่ใน `preload-catalog.json` เกม **โหลดทุกครั้งที่เข้าเกม** ทั้งที่ใช้ v6 (เปลืองแบนด์วิดท์) | ลบ + ตัด 2 บรรทัดใน catalog |
| A2 | `frontier-route/zone1-2-v5.webp` | 0.9 MB | สคริปต์หลักฐาน `build-border12-pilot.py` อ่านเป็นภาพ "ก่อน" | ลบได้ (แลกกับรันสคริปต์นั้นซ้ำไม่ได้) |
| A3 | `theme-v4/town-tree-asia-v1` `town-tree-b-asia-v1` `town-tree-c-asia-v1` (3) | 5.3 MB | `ZONE_SKIN.asia.art` ไม่ชี้ ใช้ tree-pine/maple-v2 แทน แต่ไม่ใช่ "รุ่นใหม่ของไฟล์เดียวกัน" | ลบน่าจะปลอดภัย |
| A4 | CyberHell: `house-*-cyberhell-v1` x4, `town-lamp/landmark/tree/tree-b/tree-c-cyberhell-v1` (9) | 3.3 MB | skin โซน 4 เปิดใช้แค่ judgment ที่เหลือเป็นศิลป์ที่เตรียมไว้ ไม่มีรุ่นแทน อาจรอเปิดใช้ | เก็บ ถ้าจะเปิด skin โซน 4 เต็ม |
| A5 | ชุดพื้นแผนที่ rollback ที่ลงทะเบียนในโค้ด **และเทสต์ล็อกว่าต้องอยู่บนดิสก์**: โซน 1 v5 (+`repairs/`) 9.0 MB · โซน 2 v2 5.5 · โซน 2 v7 23.1 · โซน 3 v1 6.4 · โซน 3 v7 28.6 · โซน 4 v3 4.2 (ไฟล์ 236) | **~77 MB** | ผู้พัฒนาตั้งใจเก็บไว้ "ย้อนกลับได้ด้วยค่าคงที่เดียว" (comment ใน `zone-skin.js` + `z23-ground.test.mjs`) ใช้จริงเฉพาะถ้าสลับ `ZONE*_GROUND_SET` | **ก้อนใหญ่สุด** ถ้าคุณเป้ไม่ต้องการ rollback: v7 ของโซน 2/3 (51.7 MB) ลบได้ก่อน (ต้องแก้ `ZONE*_GROUND` + เทสต์) · ที่ git ยังย้อนดูได้ |
| A6 | พื้นเก่าที่ไม่มีโค้ดเรียกแล้วแต่สคริปต์เก่าอ่านเป็นภาพอ้างอิง: โซน 1 v4 (เก็บ `flow-v4.png` ที่ใช้อยู่) 6.3 MB · โซน 2 v1 6.0 · โซน 4 v1 5.2 · v2 3.5 (ไฟล์ 87) | 21.0 MB | `extract-town-owner-mask.py`, `make-town-mask-overlay.py`, `bake-town-flow.py` อ่านพรีวิว/ไทล์พวกนี้ (สคริปต์ครั้งเดียวสมัยทำ mask) | ลบได้ถ้าไม่รันสคริปต์เหล่านั้นอีก |

ที่ยังไม่ได้ไล่ละเอียดและ **เก็บไว้ทั้งหมด**: ไฟล์ที่ชื่อถูกประกอบแบบไดนามิกและไม่เห็นใน scan (เช่น `map-zone1/v5-fx/sheets` 5.4 MB โหมด `?fluid=frames`, `theme-v4/frontier-*`, `st-*-cyberhell-v2`) · ไม่ใช่ผู้สมัครลบเพราะมีเส้นทางโค้ดที่อาจเรียก

## ข้อควรระวังที่พบระหว่างทำ
- `workerSheet` v1 (`workers/worker-*-sheet-v1.webp`, 5.7 MB) ดูเหมือนถูกแทนด้วย v2 แต่ **ยังใช้เป็นภาพหน้าในแผงทีม/โรงอาหาร** (`team-hud.js`, `worker-ui.js`) -> ไม่ลบ
- เครื่องมือค้นชื่ออัตโนมัติพลาดได้ (เช่น `icon-lock.webp`, `intro-panel-02-v2.webp`, `mob-*-walk.webp` ใช้อยู่แต่ถูกประกอบในเทมเพลต) จึงลบเฉพาะที่พิสูจน์ด้วยมือรายตระกูล ไม่ลบตามรายชื่อที่เครื่องบอก

## ตรวจบนเว็บจริง
`https://hellopae.github.io/AVEGEE/` · `version.json` build = `5ca0ab78` · ไฟล์ที่ใช้จริงตอบ 200 (`map-zone1/v7r/r1-c1`, `frontier-route/zone1-2-v6`, `house-front-one-asia-v3`, `story-cyberhell-02-v3.webp`, `cover-fx/lava-v4-mask.png`) · ไฟล์ที่ลบตอบ 404 ตามคาด (ไม่มีโค้ดขอ)
เบราว์เซอร์จริง (Chrome, Playwright) บนเว็บที่ deploy แล้ว ที่ 390 px และ 1280 px: เข้าครบ 4 โซน + เปิดศึกโซน 2 -> response 4xx = 0 · build meta = `5ca0ab78` · error เดียวคือ `requestfailed intro-opening-v3.mp4` ซึ่งเป็นสคริปต์กด "ข้ามสปลัช" ตัดวิดีโอกลางทาง (ไฟล์ตอบ 200 ไม่ได้อยู่ในรายการลบ)

## วิธีตรวจ (Chris/คุณเป้)
1. เปิดเว็บ เล่นเข้าโซน 2 (เห็นบ้าน ตะเกียง ศาลายุติธรรมโซนบูรพาครบ) -> โซน 3 -> โซน 4
2. เดินออกชายแดน โซน 1->2 / 2->3 / 3->4 (ภาพพื้นหลังชายแดนขึ้นปกติ)
3. DevTools Network ติ๊ก "Img" กรอง 404: ต้องไม่มี

## Rollback
`git revert 5ca0ab78` (คืนไฟล์ 65 ไฟล์ + สเต็ป rm ใน workflow) แล้ว push · Deploy Pages รันเอง · หรือคืนไฟล์เดียว: `git checkout 5ca0ab78^ -- <path>`
ไฟล์ทั้งหมดยังอยู่ใน git history ที่ `b95ece93`

## ข้อเสนอเรื่อง worktree `z1-v5` (`~/agapae-work/.toby-worktrees/z1-v5`)
สถานะ: branch `claude/2026-11-05-zone1-v5-fx` ที่ `e90af8f3` **อยู่ใน main ครบแล้ว** (เป็น ancestor ของ origin/main) · งานค้างเดียวคือ stage ลบ `story-cyberhell-02-v3.mp4` `-03-v4.mp4` ซึ่งตอนนี้ main ลบไปแล้ว (ใน `5ca0ab78`)
ข้อเสนอ: **ทิ้ง worktree นี้ได้** · `git -C ~/agapae-work/AVEGEE worktree remove --force ~/agapae-work/.toby-worktrees/z1-v5` แล้วลบ branch ที่ merge แล้ว (`git branch -d claude/2026-11-05-zone1-v5-fx`) · ไม่มีอะไรหาย · ฉันไม่ได้แตะ (เป็นของ Toby/ไม่ได้ขอ)
ข้อสังเกตอื่น: worktree `z1-fx`, `z1-layout` (branch `claude/2026-11-05-zone1-*`) และ worktree `toby/*` เก่าจำนวนมากน่าจะ merge แล้วเช่นกัน แต่ไม่ได้ตรวจในใบงานนี้

## main ในเครื่อง
`~/agapae-work/AVEGEE` (local main) ยังอยู่ที่ `b95ece93` เพราะฉัน push จาก worktree `clean` ตรงเข้า origin/main (ไม่แตะ working tree ที่มีไฟล์ค้างของคนอื่น) · `git pull --ff-only` ที่นั่นเพื่อตามทัน
