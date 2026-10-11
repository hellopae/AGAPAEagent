# AVEGEE skill atk — ส่งตรวจ Dale

ฐาน `9cea49e534b4f346b62ead3649b984dcb2fde1ae` (`toby/west-hit`)
ทำใน isolated worktree `/Users/agapae/agapae-work/.toby-worktrees/.codex-worktrees/20261011T015327Z-fc7ebbbc`
branch `codex/20261011T015327Z-fc7ebbbc` ไม่มี commit/merge/push/deploy

## ไฟล์ที่เพิ่ม/แก้

- `img/West/hero-yama-west-atk.png`
- `img/CyberHell/hero-yama-cyberhell-atk.png`
- `img/manifest.json`
- `img/preload-catalog.json`
- `src/art.js`
- `src/asset-preload.js`
- `src/battle-facing.js`
- `src/preload.js`
- `src/ui.js`
- `index.html`
- `tests/skill-atk.test.mjs`
- `tests/west-hit-facing.test.mjs`
- `output/skill-atk/atk-four-outfits.png`
- `output/skill-atk/art-prompts.json`
- `output/skill-atk/README.md`

## ภาพอ้างอิงและกระบวนการ

ท่า/สไตล์: `img/hero-yama-atk.png`
เครื่องแต่งกายปัจฉิม: `img/West/hero-yama-west-atk-R.png`, `img/West/hero-yama-west.png`
เครื่องแต่งกายไซเบอร์เฮลล์: `img/CyberHell/hero-yama-cyberhell-atk-R.png`, `img/CyberHell/hero-yama-cyberhell.png`
ภาพเทียบบูรพา: `img/Asia/hero-yama-asia-atk.png`

ใช้ built-in `image_gen.imagegen` สร้างภาพโปร่งใสชุดละหนึ่งภาพ แล้วแก้เฉพาะชายเสื้อคลุม/ช่วงเท้า/ระยะมือให้ใกล้ท่าไทย
สเปก prompt รอบแรกและ prompt รอบแก้สุดท้ายอยู่ใน `art-prompts.json`
ผลเครื่องมือ 1254×1254 ถูกตัด padding ที่แทบมองไม่เห็น (กรอบ alpha ≥128) แล้วจัดขนาดกรอบตัวเป็น 329×510 ด้วย nearest-neighbor ลงผืน 512×512 ที่ (91,2) โดยเก็บ alpha ภายในกรอบไว้
ไม่ได้วาดหรือแก้รายละเอียดตัวละครด้วยโค้ด ภาพอ้างอิงทั้งหกไฟล์ตรวจ byte เทียบกับ HEAD แล้วเหมือนเดิม

## การต่อสาย

เพิ่มไฟล์ใน manifest และ preload catalog ของโซน
`heroAtk()` ใช้ `artUrl('hero-yama-atk')` เดิม ซึ่ง resolve เป็นไฟล์ใหม่ตามโซนหรือ outfit
เพิ่มชื่อภาพใหม่ใน `POSE_DRAWN_FACING_RIGHT`; non-sword skill ได้ `.atk` จึงแสดงภาพหันขวา
skill atk ทั้งสี่ชุดอยู่ preload tier 0/rank 0
ต่อท้าย cache versions ที่เกี่ยวข้องด้วย `-skillatk` โดยเก็บ token เดิมครบ

## ตรวจเกณฑ์รับงาน

1. ภาพใหม่สองไฟล์: PNG 512×512 RGBA, alpha มี 0 และ 255, มุมทั้งสี่โปร่งใส ตรวจด้วย Pillow และเทสต์ หันขวา/ชุดตรงกับภาพอ้างอิงจากการเปิดดูภาพ ไม่ใช่ข้อสรุปจากทะเบียนทิศเพียงอย่างเดียว
2. ภาพเทียบ `output/skill-atk/atk-four-outfits.png` เรียง th / asia / west / cyberhell เปิดดูแล้ว ภาพใหม่ใช้ท่ายกกำปั้นและยื่นมือเหมือนไทย กรอบ alpha `(91,2,420,512)` เท่าขอบซ้าย/ขวาและแนวเท้าไทย `(91,0,420,512)` ต่างขอบบน 2px บูรพาเดิมมีท่าลูกไฟ/กรอบต่างอยู่แล้ว ความเข้าชุดและตำแหน่งเท้าโดยละเอียดให้ Dale ตรวจภาพ ไม่ได้อ้างว่ารูปทรงทุกพิกเซลเหมือนกัน
3. ผล `node --test tests/*.test.mjs` ของไฟล์สุดท้ายบันทึกด้านล่าง
4. รายชื่อไฟล์ ภาพอ้างอิง และ path ภาพเทียบครบในรายงานนี้

ยังไม่ได้ตรวจเล่นสกิลใน browser หรืออ้างว่า QA ผ่าน

## ผลทดสอบ

- `node --test tests/skill-atk.test.mjs tests/west-hit-facing.test.mjs`: 8 tests, pass 8, fail 0 (ก่อนปรับภาพรอบสุดท้าย)
- `node --test tests/*.test.mjs`: รันซ้ำหลังปรับภาพและ assertion สุดท้าย — 728 tests, pass 728, fail 0, skipped 0, exit 0; 31.711 วินาที
- `git diff --check`: exit 0
- ตรวจ byte ภาพอ้างอิงทั้งหกกับ `git show HEAD:<path>`: เหมือนเดิมทั้งหมด
