# AVEGEE · พื้น HD โซน 4 (cyberhell) เสียบเข้าเกม · 14 พ.ย. 2569

branch `claude/2026-11-05-zone1-v5-fx` (worktree `~/agapae-work/.toby-worktrees/z1-v5`) · commit `a804a97c` (+ `97069fa5` แก้ README) · push แล้ว · ไม่ merge main · วิธีเดียวกับโซน 2/3 (c7bc395e) · ไม่มี DOF/parallax/ย้อมสี ไม่แตะ pixel (แค่ตัดชิ้นใหม่)

## สิ่งที่ build
- `scripts/install-ground.py` รับ `--zone 4` (img/map-zone4 · `ZONE4_GROUND_SET`) · ติดตั้งแล้ว: `img/map-zone4/v7/` = 70 ไทล์ 1024 px .webp q88 + preview 1536×1024 + manifest · **22.4 MB** (งบ deploy เทสต์ไว้ < 40 MB) · ตรวจแพ็กครบ 20 chunk ขนาดถูกก่อนติดตั้ง
- `src/zone-skin.js`: `ZONE4_GROUND = { v3 (1x เดิม), v7 (2x) }` · `ZONE4_GROUND_SET = 'v7'` (ค่าเริ่มต้น) · `ZONE_SKIN.cyberhell.terrain` อ่านจากชุดนี้ · **คืนชุดเดิมด้วยค่าเดียว**: `ZONE4_GROUND_SET = 'v3'` (คอมเมนต์ที่ไฟล์ · โฟลเดอร์ v3 ยังอยู่)
- โซน 4 วาดผ่าน loader พื้นร่วมของโซน 1–3 อยู่แล้ว (`isTownZone('cyberhell')`) ไม่ต้องแก้ loader (README ของ Codex บอกว่าต้องปรับ `cyberhell-terrain.js` แต่ตัวนั้นเป็น loader เก่า ใช้เฉพาะ fallback และยังอ่าน v3)
- เทสต์: `tests/z23-ground.test.mjs` ครอบโซน 4 (ไทล์ 10×7, ขนาดคอลัมน์/แถวท้าย 646/410, preview, WebP ล้วน, ครอบโลก 3840×2560, งบไบต์, ชุด v3 ยังอยู่) · `tests/map-z4-terrain.test.mjs` แก้ข้อเช็ก dir เป็น v7
- สคริปต์หลักฐาน: `scripts/z23-ground-evidence.py` / `z23-walkmask-overlay.py` รองรับ `cyberhell` (+ `W=1792 H=958 DPR=1`)

## ตรวจจริง (Chromium 1792×958 จอคอม)
| ข้อ | ผล |
|---|---|
| fps เดินทั้งเมือง (~210 u/s ครบทุกมุม 33 วินาที) | เดิม 59.8 fps · ใหม่ **59.1 fps** (ตกไม่ถึง 1; เกณฑ์ ≤ 2) · p95 16.7 → 16.8 ms · เฟรมช้าสุด 67 ms ทั้งคู่ · stall > 100 ms = 0 · ภาพเบลอ (ได้แต่ preview) 0 · request ล้มเหลว 0 · หน่วยความจำพื้นที่อบ 65 → 99–111 MB (เพดานเดิม 120) · ที่ 1440×900 ได้ 59.9 ทั้งคู่ |
| walkmask / บันได / สะพาน / ของเหลว / อาคาร | ทำภาพซ้อน walkmask 6 จุด (ลานหลัก, สะพานกลาง, ฝั่งลาวา, ฝั่งน้ำเงิน, ประตูสวรรค์, ลานใต้) **ผมดู 5 ใบ** (ยกเว้นลานหลัก): ขอบเดินได้ตามบันได สะพาน ขอบลาน ขอบลาวา/น้ำ ฐานเสา อยู่ภายใน ~1 ช่อง walk (≈ ≤ 5 px โลก 1×) ทั้ง 5 ไม่เห็นจุดเกิน 5 px |
| รอยต่อ 1024 | ไม่เห็นรอยในภาพเกมจริงที่ดู (ลานหลัก, ฝั่งลาวา, ประตูสวรรค์ + ซ้อน walkmask 5 ใบ) · ภาพเทียบสะพานกลาง/ฝั่งน้ำเงิน/ลานใต้ สร้างแล้วแต่ **ไม่ได้ดูทีละใบ** |
| ของหาย / สีเพี้ยน | เทียบ v3 | v7: คมกว่าชัด, โทนมืดและเย็นกว่า, ลายทองบนลานคมขึ้น, ลาวาแดงเข้มกว่า (ไฮไลต์ขาวเหลืองน้อยลง) · ไม่เห็นของหายในที่ดู · ฟ้าผ่าในภาพ "เดิม" บางใบคือสภาพอากาศสุ่ม ไม่ใช่ความต่างของพื้น |

ภาพเทียบ **เดิม | ใหม่ 6 มุม** + ซ้อน walkmask 6 ใบ → `Output/Review/2026-11-14-z4-ground/` (jpg 12 ใบ ≤ 0.68 MB) · บันทึกการตรวจ + fps: `docs/art-reviews/2026-11-14-z4-ground-integrate/` (README, fps-desktop-1792x958.jsonl)

## ปัญหาภาพ / รายการให้ Codex (ไม่ต้องรอ ไม่ได้แก้เอง)
- ที่ผมตรวจ ไม่พบของหาย สีเพี้ยนชัดเจน รอยต่อ หรือจุด > 5 px
- ที่ **ยังไม่ได้ตรวจ**: จุด landmark 19 จุดที่เกิน 4 px ของ Codex (สูงสุด 10.44 px, `structure.json`) ไม่ได้ไล่ทีละจุดในเกม · ภาพเทียบ 3 ใบกับซ้อน walkmask ลานหลักไม่ได้ดู · ไม่ได้ตรวจที่ 390 px (โฟกัส Steam)
- prompt Codex (ถ้าคุณเป้เห็นปัญหาตอนดูภาพ): "โซน 4 v7: รักษาตำแหน่งเดิม แก้เฉพาะจุดที่ระบุจากภาพเทียบ Output/Review/2026-11-14-z4-ground — ใช้ผัง registration เดิม กริด chunk 2048 เดิม ห้าม ImageGen ซ้ำกับโครงสร้าง"

## ไฟล์ที่แตะ
ใหม่: `img/map-zone4/v7/*` (73 ไฟล์) · `docs/art-reviews/2026-11-14-z4-ground-integrate/`
แก้: `scripts/install-ground.py` · `src/zone-skin.js` · `scripts/z23-ground-evidence.py` · `scripts/z23-walkmask-overlay.py` · `tests/z23-ground.test.mjs` · `tests/map-z4-terrain.test.mjs`

## วิธีรัน/ทดสอบเอง
```
cd ~/agapae-work/.toby-worktrees/z1-v5 && python3 scripts/serve-nocache.py 8777    # http://localhost:8777 → ไปโซน 4 เดินดูพื้น
node --test tests/z23-ground.test.mjs tests/map-z4-terrain.test.mjs
BASE=http://127.0.0.1:8777/index.html CH=chromium W=1792 H=958 python3 scripts/z23-ground-evidence.py fps out.jsonl cyberhell new desktop
```
คืนพื้นเดิม: `src/zone-skin.js` → `ZONE4_GROUND_SET = 'v3'`

## ผลเทสต์
`node --test tests/*.test.mjs` หลังแก้โค้ดครั้งสุดท้าย (หลังเสียบพื้นโซน 4 · ต่อจากภาพ Z2-ART A/B และงาน fixup): **tests 2184 · pass 2184 · fail 0** (หลังรันมีแก้ README ใน docs อย่างเดียว)

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มี

## สิ่งที่ยังไม่ทำ
- ไม่ได้ merge main (Claudy) · ไม่ได้ตรวจ 390 px · จุดเกิน 4 px ของ Codex ไม่ได้ไล่ครบ · `src/cyberhell-terrain.js` (loader เก่า) ยังชี้ v3 ไม่ได้ลบ
