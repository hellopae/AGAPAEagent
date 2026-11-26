# Dale: AVEGEE FB3-CLEAN2 ลบไฟล์กลุ่มไม่แน่ใจ A1 A2 A3 A5 A6 · 26 พ.ย. 2569

ผล: **เสร็จ · merge เข้า main แล้ว** `e3ca71e8` (fast-forward จาก `6e752785`) · Deploy Pages run **45748565914** success (ครั้งแรกล้มที่ "Fetching artifact metadata failed" -> `gh run rerun --failed` -> success) · `version.json` = `e3ca71e8` ตรงกับ main
ทำใน worktree `~/agapae-work/.dale-worktrees/clean` (branch `dale/fb3-clean2`) · ไม่แตะ clone ของ Codex · Toby เริ่ม T5 ได้ (ฐาน = `e3ca71e8`)

## ตัวเลข
| | ก่อน (`6e752785`) | หลัง (`e3ca71e8`) |
|---|---|---|
| ลบจาก repo | | **330 ไฟล์ · 104.4 MB** (ไฟล์ทั้งหมดอยู่ใน Pages จริง ไม่มีไฟล์ที่ workflow ตัดออกอยู่แล้ว) |
| ชุด deploy (workflow staged bytes) | 946,269,856 (3088 ไฟล์) | **836,809,409 (2758 ไฟล์)** = **-109,460,447 (-104.4 MB)** |
| ที่ว่างใต้เพดาน 1,000,000,000 | ~53.7 MB | **~163.2 MB** |
| `node --test --test-concurrency=6 tests/*.test.mjs` | tests 2617 · pass 2617 | tests **2615** · pass **2615** · fail 0 · cancelled 0 (ลดไป 2 เทสต์ที่ล็อกไฟล์ที่ลบ) |
| `asset-404-scan.py` (390 px, 4 โซน, ศึกทุกชนิด, สอบสวน, ปุ่มทุกปุ่ม) | 4xx 0 | 4xx **0** · ภาพเสีย **0** · page error 0 |

คำขอ HTTP ทั้งหมดของ scan (1,977 รายการ) ไม่มีไฟล์ในรายการลบแม้แต่ไฟล์เดียว

## ที่ลบ (330 ไฟล์)
| กลุ่ม | รายการ | ขนาด |
|---|---|---|
| A1 | `nira-combat/nira-{th,asia,west,cyberhell}-sheet-v1.webp` x4 · เทสต์ `p9-art-insert` ที่ล็อก "v1 kept" กลับด้านเป็น "v1 หายแล้ว" | 6.6 MB |
| A2 | `frontier-route/zone1-2-v4.webp` (ตัดออกจาก `preload-catalog.json` 2 ที่ — เกมไม่โหลดทุกครั้งที่เข้าเกมอีก) + `zone1-2-v5.webp` | 3.5 MB |
| A3 | `theme-v4/town-tree-b-asia-v1.webp` เท่านั้น (อีก 2 ไฟล์ **ไม่ลบ** ดูหัวข้อ "ใช้จริง") | 1.7 MB |
| A5 | ชุดพื้น rollback: โซน 1 `v5/` + `repairs/` · โซน 2 `v2/` (ยกเว้น `flow-v2.png`) + `v7/` · โซน 3 `v1/` (ยกเว้น `flow-v1.png`) + `v7/` · โซน 4 `v3/` | ~77 MB |
| A6 | พื้นเก่า: โซน 1 `v4/` (เก็บ `flow-v4.png`) · โซน 2 `v1/` · โซน 4 `v1/` `v2/` | ~21 MB |

ชุดที่ active ยังอยู่ครบ: โซน 1 `v7r` · โซน 2 `v8` · โซน 3 `v8` · โซน 4 `v7` · A4 (CyberHell 9 ไฟล์) ไม่แตะ

## ไฟล์ที่พบว่าใช้จริง (ไม่ลบ)
1. **`map-zone2/v2/flow-v2.png` และ `map-zone3/v1/flow-v1.png` และ `map-zone1/v4/flow-v4.png`** — `flowUrl` ของโซน 1/2/3 ใน `zone-skin.js` ชี้มาที่ไฟล์พวกนี้ (ไฟล์อื่นในโฟลเดอร์ลบหมด เหลือไฟล์เดียว) สคริปต์ bake ยังเขียนไฟล์นี้ที่เดิม
2. **`theme-v4/town-tree-asia-v1.webp` + `town-tree-c-asia-v1.webp`** (3.7 MB) — `src/dungeon-view.js:290` `legacyTreeArt` อ้างเป็นภาพสำรองของต้นไม้ในเส้นทางชายแดน, เทสต์ `f12-input` ล็อกชื่อนี้, และเทสต์ `clean-404` (literal URL ใน src ต้องมีไฟล์) บังคับ · ในข้อมูลจริงทุกเส้นทางมี `trees:[]` จึงไม่น่าถูกเรียก แต่เป็นโค้ดอ้างตรง ๆ → ไม่ลบ · ถ้าคุณเป้ต้องการ ลบได้ในใบงานหน้าโดยตัด `legacyTreeArt` + แก้เทสต์ f12 (ไม่ได้ทำเพราะอยู่นอกขอบเขต "ลบไฟล์")
3. **`src/cyberhell-terrain.js`** (โหลดเดอร์พื้นโซน 4 รุ่นเก่า ที่อ่าน `map-zone4/v3`) — ไล่แล้วเข้าถึงได้เฉพาะ `scene.js drawMapGround` ซึ่งทำงานเฉพาะโซนที่ไม่ใช่ town zone ส่วนทั้ง 4 โซนเป็น town zone จึงไม่เคยรัน (วัดจริง: เปิดโซน 4 ซูมเต็ม ไม่มีคำขอไป `map-zone4/v3` แม้แต่ครั้งเดียว) → ลบ v3 ได้ · ปล่อยตัวโมดูลไว้ ใส่ comment กำกับ

## โค้ด/เทสต์ที่แก้ตาม (เฉพาะที่จำเป็น)
- `src/zone-skin.js`: เอา `v5` (โซน 1), `v2`/`v7` (โซน 2), `v1`/`v7` (โซน 3), `v3` (โซน 4) ออกจากรายการลงทะเบียน · comment ทุกจุดบอกว่าย้อนได้ด้วย `git checkout 6e752785 -- <path>` แล้วใส่รายการคืน
- `src/town-terrain-repair.js`: รายการซ่อม 3 รายการของ v5 ถูกเอาออก → `TOWN_TERRAIN_REPAIRS = []` (ไม่ freeze เพื่อให้เทสต์ใส่คืนได้) · ตัวโค้ดซ่อมยังอยู่ แต่ไม่มีอะไรให้ซ่อม
- `tests/helpers/zone1-ground-v5.mjs`: ตอนนี้ประกาศ v5 + รายการซ่อมเอง (เทสต์ loader ของ k1d / m2 / m3 / terrain-loading-recovery ใช้ภาพจำลอง ไม่แตะไฟล์จริง จึงยังรันโค้ดเดิมด้วยตัวเลขเดิม)
- เทสต์ที่ล็อก "ไฟล์ต้องอยู่บนดิสก์" ถูกกลับเป็น "ต้องไม่อยู่ / ต้องไม่ถูกลงทะเบียน": `p9-art-insert` (Nira v1) · `p5b-art-insert` (repairs) · `z23-ground` (3 โซน) · `z3-west-integration` · `z1-v5-fx` · `map-z4-terrain` · `k1d-terrain`
- **ลบ 2 เทสต์** (ล็อกไฟล์ที่ไม่มีแล้ว): `map-z4-terrain` "delivered tile dimensions ... Zone 2 size class" (อ่าน stitch-report ของ v3) · `k1d-terrain` "chunk pixel sizes ... under 6 MB" (วัดไฟล์ v5) · ใส่ comment ชี้ commit
- `index.html`: bump cache token `fb3c2` ของ `zone-skin` `cyberhell-terrain` `town-terrain-repair` (`scripts/bump-cache-id.py`)
- `img/preload-catalog.json`: ตัด `zone1-2-v4` 2 ที่ + `map-zone1/repairs/*` 3 ที่ (เดิมโหลดทุกครั้งที่เข้าเกม ทั้งที่ไม่ได้ใช้)
- สคริปต์ที่อ้างภาพที่ลบ 15 ตัว: ใส่ comment หัวไฟล์ "ภาพอยู่ใน git commit `6e752785`" (`build-v5-fx2-assets` `build-zone-cloud-density` `build-z3-fog-density` `build-z4-town-a` `build-map-z4` `extract-town-owner-mask` `make-town-mask-overlay` `stitch-town-terrain` `bake-town-flow` `bake-zone2-flow` `build-border12-pilot` `n1-dock-clip` `build-z3-snow` `stitch-selftest` `find-v5-white-lumps`)

## ตรวจ
- เปิดเกมจริง Chromium 1792x1120 บนเครื่อง (ก่อน/หลัง) และบนเว็บที่ deploy แล้ว: พื้น 4 โซนขึ้นครบ (กระเบื้องคมชัด) · ภาพ `Output/Review/2026-11-26-fb3-clean2/zones-1792x1120-after.jpg` และ `zones-live-e3ca71e8-1792x1120.jpg` (โซน 1, 2, 3, 4)
- ไฟล์ที่ใช้จริงบนเว็บตอบ 200 (`map-zone{1v7r,2v8,3v8,4v7}/r1-c1`, `flow-v2/v1/v4`, `nira-th-sheet-v2`) · `map-zone1/v5/r1-c1.webp` ตอบ 404 ตามคาด (ไม่มีโค้ดขอ)
- `balance28b.test.mjs` ค้างในรอบเต็มรอบแรกของ concurrency 6 (CPU 100% เกิน 11 นาที, ต้อง kill) แต่รันเดี่ยวผ่านใน 2 วินาที และรอบเต็มรอบถัดมาผ่าน (ช้า ~10 นาที) · เป็นอาการสะดุดเดิมที่เคยจดไว้ ไม่เกี่ยวกับงานนี้

## จดไว้ (ไม่บล็อก)
- เจอ `404 img/town-tree-willow.webp` ครั้งเดียว ตอนสคริปต์ผมกระโดดโซน asia → west → cyberhell → th ผ่าน `syncSceneZone` (ซีนสะสมต้นไม้ asia ข้ามโซน) · **เกิดทั้งก่อนและหลังงานนี้ ไม่เกี่ยวกับไฟล์ที่ลบ** (key `town-tree-willow` ไม่มีรูปในชุดโซน 1) · `asset-404-scan.py` ที่เดินปกติให้ 0 · ถ้าอยากเก็บ ให้ Toby ดูตอนมีงานเกี่ยวกับต้นไม้โซน 2
- โฟลเดอร์ `map-zone2/v2`, `map-zone3/v1`, `map-zone1/v4` เหลือไฟล์เดียว (flow mask) · ย้ายไปที่ชื่อใหม่ได้ในอนาคต แต่ไม่ทำตอนนี้เพราะแก้ `flowUrl` + สคริปต์ + เทสต์เพิ่ม

## Rollback
ทั้งงานอยู่ใน commit เดียว `e3ca71e8`: `git revert e3ca71e8` แล้ว push (Deploy Pages รันเอง) · หรือคืนบางไฟล์ `git checkout 6e752785 -- <path>` (แล้วใส่รายการลงทะเบียนคืนใน `zone-skin.js` ตาม comment)
