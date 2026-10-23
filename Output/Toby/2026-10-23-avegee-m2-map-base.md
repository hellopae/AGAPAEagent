# AVEGEE M2 รอบ 0 — โค้ดฐานแผนที่ต่อโซน (Toby · 23 ต.ค. 2569)

repo `/Users/agapae/agapae-work/AVEGEE` · worktree `/Users/agapae/agapae-work/.toby-worktrees/m2map` · branch `toby/m2-map-base` · HEAD `f274b9e` · ฐาน main `a7f06e9` (P9 merge แล้ว) · ไม่ merge/push main
หมายเหตุ: ใบงานระบุ worktree `.toby-worktrees/m2` แต่ path นั้นเป็นของ branch `toby/m2-fx` (M2 รอบแบตเทิลเอฟเฟกต์เดิม) → ใช้ `m2map` แทน ไม่แตะของเดิม · ใบงานเขียนว่าซ้อนควอแดรนต์ 192 px ทุกขอบ ใช้ตามที่ Mind แก้ = ซ้าย-ขวา 192 / บน-ล่าง 128 px (preview)

## สิ่งที่ build
| ข้อ | ผล | commit |
|---|---|---|
| 1 Zone skin | `src/zone-skin.js` ตาราง `ZONE_SKIN[zone]`: ground (chunks/preview/ขนาด), flow map, sprite 6 กลุ่ม (แท่น/บ้าน/ต้นไม้/โคม/คบ/หิน), facade สถานี, แหล่งแสง (`light.emit` ไฟ + hue ของน้ำแข็ง/ไซแอน/ม่วงตาม Mind §6), ชุดเปลวคบ (โซน 4 = ไซแอน), `treeTint` (ปิดอัตโนมัติเมื่อโซนมีต้นไม้ของตัวเอง) · โซน 2–4 = `enabled:false` ใช้ระบบเก่าเหมือนเดิม · `isTownZone` อ่านตาราง · terrain/flow เก็บแยกต่อโซน · shade signature มีโซน | `f6aeacf` |
| 2 Layout data | `TOWN_ZONE_LAYOUT[zone]` + `applyTownZoneLayout()` ใส่ override ลง object ร่วมแบบ in-place (mask, patches, สถานี, spots, แท่น, บ้าน, prop) · โซน 2–4 ชี้ผังโซน 1 · mask ต่อโซนเป็นไฟล์ `src/town-owner-walkmask-<zone>.js` (ตอนนี้ `null` = ใช้ mask โซน 1) · `syncSceneZone`/`game.js` กลุ่มระบบเมือง (ชนอาคาร 60%, spawn ผี, เวทีเดินของนิรา, ตำแหน่ง label) ใช้ `isTownZone` ส่วนเรื่องราวโซน 1 คงเดิม | `f6aeacf` |
| 3 ROUTE_GEOMETRY | `src/route-geometry.js` 1 แถว/เส้นทาง: เส้น 31 จุด, จุดยอด checkpoint 7/15/23, pads, ลาดตระเวน 6 จุด (progress+foe), ต้นไม้/น้ำตกซ้อน, ภาพ, `bossCave` · `th:asia` = ค่าเดิมครบ + ถ้ำบอสโซน 1 · `asia:west`, `west:cyberhell` = เส้นเดียวกัน ลาดตระเวน 6 จุด **ไม่มีถ้ำบอส** `enabled:false` (ใช้ทางตั้งเก่าจนกว่าจะเปิด) · แทน `'th:asia'` 30 จุดใน dungeon-view/zone-travel/dungeon-art/frontier-ambient/game/ui | `18684fc` |
| 4 สคริปต์ต่อผืน | `scripts/stitch-town-terrain.py --zone asia` (ควอแดรนต์ 4 → ผืน 4915×3277 → `r{1-4}-c{1-5}.webp` q92 + preview 1536×1024) · `town_terrain_lib.py` · `stitch-selftest.py` · ปฏิเสธเขียนลง `img/map-zone1` | `314fe8f` |
| 5 migration เซฟ | `townSkinMigrated` ใน snapshot/restore · `migrateTownSkinZone()` ย้ายตำแหน่ง (ผู้เล่น/ยักษ์/ปีศาจ/ของ/ยมทูต, zoneSave, zoneEntry, roster) ไปจุดเกิดใหม่ครั้งเดียวต่อโซน ความคืบหน้าไม่แตะ · ไม่ทำงานจนกว่าจะเปิด skin | `d266cd2` |
| 6 เครื่องมือ mask | `make-town-mask-overlay.py` + `extract-town-owner-mask.py --zone/--layer` + `town-floor-dump.mjs` · `bake-town-flow.py --zone/--profile` | `8f08bc6` |
| — | cache-bust (importmap) + `docs/m2-zone-skin.md` | `a4a4658`, `f274b9e` |

## ไฟล์ที่แตะ (38 ไฟล์)
ใหม่: `src/zone-skin.js`, `src/route-geometry.js`, `src/town-owner-walkmask-{asia,west,cyberhell}.js`, `scripts/{town_terrain_lib.py,stitch-town-terrain.py,stitch-selftest.py,make-town-mask-overlay.py,town-floor-dump.mjs}`, `tests/{m2-zone-skin,m2-route-geometry,m2-skin-migration}.test.mjs`, `docs/m2-zone-skin.md`
แก้: `src/{data,game,scene,ui,preload,proximity,theme-assets,map-art-v5,town-layout,town-terrain,town-flow,town-lighting,town-scenery,town-shade,town-night-effects,town-map,dungeon-view,dungeon-art,zone-travel,frontier-ambient}.js`, `scripts/{bake-town-flow.py,extract-town-owner-mask.py}`, `index.html` (importmap), `tests/zone1-map-review.test.mjs` (ย้ายชื่อเฟรมเปลวไฟไปอยู่ในตาราง skin — แก้ regex 1 จุด)

## ผลเทสต์
- baseline main ก่อนแตะ: 1369 pass / 0 fail · หลังงาน (HEAD `f274b9e`): **1386 pass / 0 fail** (+17 เทสต์ใหม่; `node --test tests/*.test.mjs` ~3.5 นาที) · ไล่ ~33 ไฟล์ที่อ้างผัง 1678: ไม่มีไฟล์ไหนพัง (ที่ต้องแก้ มีแค่ 1 regex ของ flame-frame กับ cache-bust)
- เทสต์ใหม่: zone 1 resolve ไปไฟล์เดิมเป๊ะทุก key/ตัวเลข · โซน 2–4 ปิด=ระบบเก่า · เปิด skin ด้วย data (`use`) · layout override + กลับโซน 1 เท่าเดิม · emitter แสง · เส้นทาง 1–2 ตัวเลขเดิม/2–3 เปิดแล้วไม่มีถ้ำ · migration · cache-bust
- ทดลองจริงในเบราว์เซอร์ (Playwright Chromium): (ก) **skin ปลอม** `enableTownSkin('asia',{},{fake:true})` แล้วย้ายไปโซน 2 → ฉาก 3840×2560, ระบบเมืองทำงานครบ (ภาพ `zone2-fake-skin-town-1280.jpg`) ไม่มี pageerror (ข) **เส้นทาง 2–3 เปิดด้วยภาพแทน**: เข้า wilderness view, ลาดตระเวน 6 + ด่าน 3 ไม่มีบอส/ล็อก, เดินถึงปลายเส้นแล้วย้ายเข้า `west` เอง (ภาพ `route-2-3-enabled-standin-390.jpg`)

## โซน 1 เหมือนเดิมไหม — ใช่ (ข้อจำกัดของหลักฐานระบุด้านล่าง)
- ข้อมูล: เทสต์ล็อกว่า key/URL/ขนาด chunk/facade/จุดยอดเส้นทาง/ลาดตระเวน ของโซน 1 เท่าไฟล์เดิมทุกตัว · `bake-town-flow.py` รันซ้ำแล้ว **byte-identical** กับ `flow-v4.png`
- ภาพ (Chromium, นาฬิกาเสมือน + seed random): เมือง 7 จุด × 2 ซูม × (390×844, 1280×800) + ชายแดน 1–2 6 จุด × 2 ขนาด = 40 ภาพ ก่อน/หลัง รันซ้ำก่อน 2 ชุด หลัง 2 ชุด · **ข้อจำกัด:** เกมไม่ deterministic ล้วน (ผี/ปุ่ม "เริ่มพิจารณาคดี"/แสงสถานีเปลี่ยนตามจังหวะ) pixel-exact ทั้งภาพจึงทำไม่ได้ — วิธีวัด: นับพิกเซลที่ "ก่อนสองรอบตรงกัน, หลังสองรอบตรงกัน, แต่ก่อน≠หลัง" ได้ 0–464 px ต่อภาพ (<0.05% ของภาพ) ยกเว้น `city-bridge-z2-1280` 2,273 px ซึ่งดูแล้วเป็นเฟสแอนิเมชันพ่อค้า/ปาล์ม ภาพเทียบตาเปล่าเหมือนกัน · ไม่ใช่การพิสูจน์ pixel-exact
- ภาพเทียบ (ซ้าย=ก่อน ขวา=หลัง) ใน `Output/Toby/screenshots/2026-10-23-avegee-m2/` (รวม 2.7 MB): `zone1-city-plaza-390-before-after.jpg`, `zone1-city-overview-1280-before-after.jpg`, `zone1-frontier-cave-390-before-after.jpg`, `zone1-frontier-start-1280-before-after.jpg` · ครบ 40 ภาพ + สคริปต์: `/Users/agapae/agapae-work/evidence/m2/{before-A,before-B,after-A,after-B,tools}/` (`compare-consistent.json`)

## ผลสคริปต์ต่อผืน (เทียบโซน 1)
`stitch-selftest.py` ตัดโซน 1 จริงเป็น 4 ควอแดรนต์แล้วต่อกลับ (ผล `/Users/agapae/agapae-work/evidence/m2/stitch-selftest.json`):
- ควอแดรนต์ความละเอียดเต็ม (2765×1843): ผืนที่ต่อ **ตรงต้นฉบับเป๊ะ** (PSNR 99, ทั้งแถบซ้อน) — เรขาคณิตและการเบลนด์ถูกต้อง · ชิ้น webp เทียบไฟล์เดิม PSNR 38 dB (ต่างเพราะเข้ารหัส webp ซ้ำเท่านั้น) · preview เทียบ preview เดิม 38.8 dB
- ควอแดรนต์ 1536×1024 (ที่ Codex ส่งจริง ขยาย ~1.8×): ผืน PSNR 32.4 dB (แย่สุดชิ้น r3-c3 29.6) = นุ่มลงเล็กน้อย ตามที่ Mind ตั้งข้อตัดสิน D4 ไว้ — ต้องดูด้วยตาที่ 100% เมื่อได้ภาพโซน 2 จริง
- ความต่างจากไฟล์เดิมที่บันทึกไว้: ใช้ webp q92 (ขนาดไฟล์ใกล้โซน 1) · ต้นทาง `exec-*.png` ของโซน 1 ไม่มีจึงเทียบกับ chunk ที่ตัดแล้ว

## วิธีเปิด skin โซน 2 (ขั้นตอนที่รอบเสียบภาพต้องทำ — ไม่ต้องแก้โค้ดระบบ)
1. ภาพพื้น: วางควอแดรนต์ 4 ใบที่ `img/raw/map-zone2/q-{nw,ne,sw,se}.png` (3:2, ≥1536×1024) → `python3 scripts/stitch-town-terrain.py --zone asia` ได้ `img/map-zone2/v1/r*-c*.webp` + `zone2-terrain-v1-preview.webp`
2. sprite: วางไฟล์ตามชื่อใน `PLANNED_ART` (zone-skin.js; ตรงกับสเปกของ Mind) แล้วใส่กลุ่มที่เสร็จใน `ZONE_SKIN.asia.use` เช่น `['judgment','houses','trees','lamp','torch','rock']` **ใส่ก็ต่อเมื่อไฟล์มีแล้ว** (ไฟล์หายจะวาด placeholder เก่า ไม่ถอยไปโซน 1) · กลุ่มที่ไม่ใส่ = ใช้ sprite โซน 1 ชั่วคราว · มีต้นไม้ของโซนแล้ว `TREE_TINT` ปิดเอง
3. `stations.facade` (ถ้ามี v2) / `stationFlip` ถ้าต้องกลับด้านสถานี
4. mask: ใช้ครั้งแรกกับ mask โซน 1 (ดูข้อถัดไปเมื่อคุณเป้ปาดแล้ว) · ถ้าสถานี/บ้าน/prop เพี้ยน → `TOWN_ZONE_LAYOUT.asia` ใน town-layout.js
5. flow: `bake-town-flow.py --zone asia --profile <json>` แล้วใส่ `flowUrl` (null = ไม่มีน้ำ/ลาวาไหล)
6. `enabled: true` · ขยับ `?v=` ใน importmap (index.html) ของ `zone-skin.js` · เซฟเก่าย้ายตำแหน่งเองครั้งเดียว · เสร็จแล้วให้ Kittanate ทดสอบ 390 px
7. เส้นทาง 2–3: วางภาพ 1672×941 ที่ `img/frontier-route/zone2-3-v1.webp` (ถนนต้องตามเส้น 31 จุดของ 1–2) → `ROUTE_GEOMETRY['asia:west'].enabled = true`
ทดลองโดยไม่มีภาพ: `enableTownSkin('asia', {}, {fake:true})` (zone-skin.js)

## วิธีใช้เครื่องมือ mask (สำหรับคุณเป้ — 5 บรรทัด)
1. Toby รัน `python3 scripts/make-town-mask-overlay.py --zone asia` → ได้ 4 ไฟล์ใน `/Users/agapae/agapae-work/evidence/m2/mask-tool/asia/`: `asia-ground.png` (พื้นสะอาด), `asia-mask-layer.png` (เฉพาะสีแดง = เดินไม่ได้ พื้นหลังโปร่งใส), `asia-mask-overlay.png` (รวมแล้วไว้ดู), `HOWTO-mask.txt` · ตอนนี้ภาพที่ได้ใช้พื้นโซน 1 แทนเพราะโซน 2 ยังไม่มีภาพ (ทำชุดตัวอย่างไว้แล้ว)
2. เปิด `asia-ground.png` เป็นเลเยอร์ล่าง วาง `asia-mask-layer.png` ทับ แก้เฉพาะเลเยอร์แดง: ปาดแดงเพิ่มตรงที่เดินไม่ได้ · ลบแดงตรงที่เดินได้ (สีแดงสีไหนก็ได้ ขอแค่ทึบ)
3. ส่งออกเลเยอร์แดงเป็น PNG พื้นโปร่งใส 1536×1024 เท่าเดิม (ห้ามย่อ/ขยาย) ชื่อ `asia-mask-layer-edited.png` แล้วส่งให้ Toby
4. Toby รัน `python3 scripts/extract-town-owner-mask.py --zone asia --layer asia-mask-layer-edited.png --write` → เขียน `src/town-owner-walkmask-asia.js` (ไม่ต้องแก้โค้ด — ไฟล์ถูก import ไว้แล้ว และ polygon มือของโซน 1 ปิดเองเมื่อมี mask ของโซน) · เปิดเกมเดินลอง บอกจุดที่ยังผิด
5. ใช้กับ `--zone west` / `cyberhell` ได้เหมือนกัน · ถ้ามี overlay แบนราบรวมแล้ว (แบบ Map-Zone1-3.jpg) ใช้ `--source <ไฟล์>` แทน `--layer` (ลงทะเบียนกับ preview ด้วย SIFT เหมือนเดิม)
ทดสอบรอบเดินทาง: สร้าง layer จากพื้น mask ปัจจุบัน → สกัดกลับ → ตรวจ 98,304 จุดตัวอย่าง ต่างกัน 96 จุด (0.098%, ขอบแถบ ½ ช่อง) = อ่านกลับได้ตรงพอ

## สิ่งที่ยังไม่ทำ / ข้อควรรู้
- ไม่มีภาพโซน 2 รอบนี้ → ยังไม่ได้ทดสอบ skin จริง, ยังไม่ได้ดูความคมของภาพขยาย 1.8×, ยังไม่ได้ปาด mask · ลำดับสีกลางคืนโซน 3–4: ใส่ **emitter ตาม hue** (น้ำแข็ง/ไซแอน/ม่วง) และชื่อไฟล์เปลวไซแอน `img/fx/fx-cyan-flame-{a,b,c}.webp` เป็นข้อมูลแล้ว แต่ **สูตรเกรดกลางคืน (`#16254F` / `#1B0F3A`) บันทึกเป็นข้อมูลเท่านั้น ยังไม่ได้เขียนสูตร** — ต้องให้ Mind ให้ตัวคูณสี (ห้ามผมเดา) · ต้องวาดเปลวไซแอน 3 เฟรมก่อนเปิดโซน 4 (ดูสเปกด้านล่าง)
- facade v2 / ฉากรบ border-cave ของ 2–3, 3–4 เลื่อนตามที่ตัดสิน (เส้นทางใหม่ยังใช้ `arena-<zone>`)
- ข้อความ UI `town.title` = "เมืองอเวจี · โซน 1" (i18n) ยังเป็นคำของโซน 1 — **ถาม Rae** ขอคำกลางหรือต่อโซนก่อนเปิดโซน 2 (ผมไม่แก้ copy)
- อนุภาคลอยฟ้า `drawMapAmbientSky` ของโซน 2–4 ยังทำงานตามสไตล์เดิมเมื่อเป็นโซนเมือง (เบามาก) · `map-ambient/map-fx-h3` (ลาวา/น้ำแบบเก่า) ถูกข้ามในโซนเมือง ตามที่ M0 ระบุ — flow map เป็นตัวแทน
- ก่อน merge: Dale ตรวจ diff · ไม่ได้ push · worktree อื่นไม่แตะ

## สเปกอาร์ตที่ต้องการเพิ่ม
- เปลวคบโซน 4 (ไซแอน) 3 เฟรม: `img/fx/fx-cyan-flame-{a,b,c}.webp` 128×256 px RGB พื้นดำ (ผสมแบบ additive) เหมือน `img/fx/fx-fire-flame-{a,b,c}.webp` (วัดแล้ว) · ไม่เร่งจนกว่าจะถึงรอบโซน 4
- นอกนั้นใช้สเปกของ Mind (`Output/Mind/2026-10-23-avegee-m1-zone2-art-spec.md`) ตามเดิม ชื่อไฟล์ตรงกับ `PLANNED_ART`

## วิธีรัน/ทดสอบเอง
```
cd /Users/agapae/agapae-work/.toby-worktrees/m2map
node --test tests/*.test.mjs                 # 1386 pass
python3 -m http.server 8777                  # เปิด http://localhost:8777 (390 px ใน DevTools) — เกมโซน 1 เล่นเหมือนเดิม
python3 scripts/stitch-selftest.py           # ทดสอบสคริปต์ต่อผืนกับโซน 1
python3 scripts/make-town-mask-overlay.py --zone asia
```
Kittanate เช็ค: เปิดเกม → เมืองโซน 1 เดิน/ซูม/เข้าสถานี/ด่านชายแดน 1–2 (เดินถึงถ้ำ) ต้องเหมือนเดิม · ส่วนโซน 2–4 ยังเป็นแผนที่เก่า (ยังไม่เปลี่ยน) — ไม่มีอะไรใหม่ให้เห็นในเกมรอบนี้ นอกจากเทสต์ข้างบน
