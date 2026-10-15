# K1e review (Dale) — PASS (รอ push)

- งานต้นทาง: Codex run 20261015T071321Z-6527178d · commit **545f53f** (stack: K1e -> L4a b6276c7 -> L4b a30b7e9 บน origin/main 8f82178)
- **สถานะ push: ยังไม่ push** — permission classifier ปฏิเสธ `git push origin HEAD:main` (Pages จึงยังไม่ได้ตรวจ)
- ผล: PASS พร้อมแก้เอง 3 ข้อ (ด้านล่าง)

## ที่ทำ
- รีวิว diff: ไม่มี `ctx.filter` ต่อเฟรม (tint ยัง bake ครั้งเดียวผ่าน tintedArt) · ลบ `output/k1e/` ออกจาก commit (เก็บที่ /tmp/avegee-evidence/k1e/)
- เหลือ sprite 4 ชิ้น: ปาล์ม (1), โคมทอง (10), ต้นแดง (8), ต้นหิมะ (2) — `theme-assets.js` + `town-scenery.js` (`townPropArtKey`) + manifest/catalog + `tests/k1e-sprites.test.mjs`
- **คบไฟ K1e ไม่ใช้**: main (69ed45e/8f82178) ให้ทุก `kind:'torch'` (คบไฟลานกระทะ 14 ต้น + เสาไฟไทยใหม่ 10 ต้น) ใช้ `img/map-zone1/torch-pillar-v1.webp` + แสงเรืองอยู่แล้ว ตำแหน่งเดียวกัน — ดูภาพแล้วเสาของ Codex ตรงตำแหน่งและสไตล์ จึงตัด `town-torch-th-v1.webp` ออก ไม่วางซ้ำ
- tint: Codex ปรับ `TREE_TINT` (city แดงมืด) — คงไว้; ถอด lava/ice tint เพราะต้นแดง/ต้นหิมะมีภาพเอง (tint เฉพาะต้นเขียว `town-tree-th`)

## แก้เอง (นอก diff Codex K1e)
1. cache-bust ใช้ importmap ของ Codex (ไม่แตะ `art.js`/`ui.js` ลูกโซ่เดิม): `theme-assets.js?v=k1e`, `town-scenery.js?v=hell-fire-v2-k1e`, preload/CATALOG_VERSION `...hell1-k1e`
2. เทสต์ 3 ตัวที่ **พังอยู่แล้วบน main หลัง Codex push** (k2-menu, skill-atk, west-hit-facing — assert token cache เก่า) แก้ assert ให้ตรงสคีมา importmap (+ review page ใช้ ui.js token เดียวกับ index)
3. ไม่แตะไฟล์ animation ยม

## ผลเทสต์
- full suite: 946 tests · pass 939 · **fail 7 — เหมือน origin/main เป๊ะ (ยืนยันด้วยการรันไฟล์เหล่านั้นบน main สะอาด)**: I1-A x3 (i1a-scenes/i1a-gate: atk pose กระจก, mirror stand, cache -i1a), K5 wiring (-k5), h5b cover-fx cache, construction-arrival "two builds approach concurrently", F1/F3 cache-bust — เป็นผลของ Codex push (acc9c43 animation ยม / importmap) ไม่ใช่ K1e · บางตัวเป็นพฤติกรรม (mirror/atk pose, concurrent builds) ควรให้ Codex ดู
- stack ปลายทาง (L4b) 951 tests · pass 944 · fail 7 ชุดเดิม

## fps (Playwright 1440x900 DPR2, run_scenes.py zoom, Intel UHD 630; เครื่องโหลดหนัก load avg 40-100 จาก Toby/เทสต์ จึงเทียบ A/B สลับกัน)
| ฉาก | main (base1/base2) | K1e (k1e2/k1e3) |
|---|---|---|
| ซูม 5x idle | 23.4 / 45.5 | 37.3 / 46.8 |
| ซูม 6.5x idle | 30.7 / 51.1 | 47.1 / 51.9 |
| ซูม 6.5x เดิน | 27.8 / 49.3 | 46.6 / 53.7 |
ไม่มี regression (ค่าแกว่งตามโหลดเครื่อง) · ไม่มี pageerror/404 จากงานนี้ (404 เดิม: audio .ogg, hero-yama-side.png)

## ภาพ (/tmp/avegee-evidence/k1e/)
heaven-lamps.png · cauldron-torches.png (เสาไฟ Codex) · central-stair-palm.png · lava-red-trees.png · ice-snow-trees.png (ซูม ~5x)
ข้อสังเกต: ปาล์มเขียวสดกว่าต้นไทรแดงมืดของ Codex ในโซนที่ไฟมืดลง — ถ้าอยากกลืน ให้ bake tint ปาล์มครั้งเดียว (ไม่ได้ทำ ไม่อยู่ในใบงาน)

## Roll back
`git revert 545f53f` (หลัง push) · ไฟล์ภาพใหม่ 4 ชิ้นอยู่ `img/theme-v4/town-{palm,lamp-gold,tree-red,tree-snow}-th-v1.webp`

## ค้าง
push + ตรวจ Pages built + ล้าง worktree/branch codex/20261015T071321Z-6527178d
