# Toby — AVEGEE: เสียบภาพ Codex ที่ค้าง 3 run · 15 พ.ย. 2569

worktree `~/agapae-work/.toby-worktrees/z1-v5` · branch `claude/2026-11-05-zone1-v5-fx` (ฐาน main `788dc52b`) · ใบงาน `Output/Claudy/briefs/2026-11-15-avegee-codex-leftovers-toby.md`
ภาพหลักฐานทั้งหมด: `Output/Review/2026-11-15-codex-leftovers/` (ภาพในเกมถ่ายที่ 390x844)

## สิ่งที่ build

### 1. YAMA-BLINK — เสียบครบ 4 โซน (th, asia, west, cyberhell)
แทนที่ `img/yama-animation-v1/<โซน>/book-idle.webp` ทั้ง 4 ไฟล์ (ไม่แก้โค้ด)
- ตรวจพิกเซลเอง (Pillow/NumPy): แถว 1-3 ของแอตลาสเท่าเดิมทุกพิกเซล · เฟรม 0 ใหม่ = เฟรม 0 เดิม · เฟรม 3 = เฟรม 0 · เฟรม 1 (มองข้าง) และเฟรม 2 (หลับตา) ต่างจากเฟรม 0 **เฉพาะกรอบตา** (~76x28 และ ~84x35 พิกเซล)
- เทียบกับของเดิม (ต้นเหตุกระตุก): ของเดิมเฟรม 1-3 ต่างจากเฟรม 0 ทั้งตัว 37,000-76,000 พิกเซลต่อเฟรม (เป็นภาพวาดคนละใบ) · ของใหม่ต่าง 981-2,039 พิกเซล อยู่ในกรอบตาทั้งหมด (ไฟล์ `yama-blink-<โซน>-old-top-new-bottom.png` บนสุด = เดิม ล่าง = ใหม่, `yama-blink-th-old.gif` / `-new.gif` = จังหวะ 0,2,0,1 ของห้องสอบสวน)
- ในเกมจริง (ห้องสอบสวน 390 px): อ่านเฟรมที่เกมประกอบเอง (หลังขั้น registration) → เฟรมหลับตาต่างจากเฟรมยืน 2,039 พิกเซลอยู่ในกรอบ x110-194 y132-167 · เฟรมมองข้าง 1,227 พิกเซล x114-190 y136-163 · เฟรม 3 ต่าง 0 → **registration ไม่ต้องเลื่อนอะไรเลย หัวและตัวนิ่ง ขยับเฉพาะตา** (ภาพ `room-yama-blink-closed-390.png`)
- `src/yama-fit.js` สร้างใหม่จากอัลฟาด้วย `scripts/art/measure-yama-fit.py --write` (เทสต์ A7 บังคับ): เปลี่ยนเฉพาะ footX ของท่ายืนถือหนังสือหันหน้า — th 166.527 → 163.503 (เดิมเท้าแต่ละเฟรมคนละที่ จึงเฉลี่ยเพี้ยน) โซนอื่นเปลี่ยนไม่ถึง 0.4 พิกเซล · เฟรมใหม่ตัวเท่ากันทุกเฟรม
- ผลข้างเคียงที่ตั้งใจ: แผนที่ใช้แอตลาสเดียวกัน (แถวหันหน้า, จังหวะ 0,1,2,3) ท่ายืนถือหนังสือหันหน้าบนแผนที่จึงกะพริบแบบใหม่ด้วย

### 2. SPIRIT-CARD-SCARED — เสียบ 24 ภาพ + ต่อสายการ์ด
- ภาพ 24 ไฟล์ → `img/soul-card-scared/<ชื่อต้นฉบับไม่มี .webp>-scared.webp` (TH 11, Asia 10, West 3) · ตรวจแล้ว: ขนาดตรงต้นฉบับ 24/24, RGBA, มุมโปร่งใส
- ดูด้วยตา (contact sheet + ขยายคู่ business-asia / cleric-asia / woman-asia / clerk-asia / cleric-th / recruit-th): ตัวละครเดิม ตาโต ปากอ้า เหงื่อ ถือของเดิมครบ ไม่น่ากลัวเกิน ไม่มีตัวอักษรเพิ่ม — ลายบนเข็มขัด business-asia เป็นของต้นฉบับ ไม่ใช่ตัวอักษรใหม่
- ต่อสาย: เมื่อวิญญาณขัดขืนแพ้ (`battle.over === 'win'`) การ์ดมุมขวาล่างใช้ภาพ scared ลำดับ = การ์ดวาดเฉพาะ → ท่า scared ของตัวบนสนามที่มีอยู่ (เช่น Cyberhell ที่ยังไม่มีการ์ดวาด) → ภาพปกติ · เงื่อนไขเดียวกับตัวบนสนาม (ไม่ใช้กับคดี `other` / วิญญาณที่ส่งกลับ) · โหลดล่วงหน้าผ่าน `soulPoseAssets`
- ในเกม (390x844, ฉากสู้จริงจนชนะ): TH officer / TH recruit / Asia officer / West officer — การ์ดเปลี่ยนจาก `img/<โซน>/spirit-…-v2.webp` เป็น `img/soul-card-scared/…-scared.webp` · Cyberhell officer — การ์ดเปลี่ยนเป็น `img/soul-poses/officer-cyberhell-scared-v1.webp` (fallback) · ไม่มี error ไม่มี request ล้มเหลว (`card-before-after-sheet.png`)
- **ข้อควรรู้:** ภาพการ์ดนี้เป็นคนละใบกับท่า scared ของตัวบนสนาม (soul-poses) ทั้งที่ Codex วาดจากต้นฉบับเดียวกัน ตอนแพ้จึงเห็นสองภาพคล้ายกันแต่ไม่ใช่ใบเดียวกัน (การ์ดเล็ก ~55 px แยกไม่ออกบนมือถือ)

### 3. SPIRIT-POSES-CYBER5 — เสียบ 5 ภาพ
`img/soul-poses/{business,clerk}-cyberhell-{scared,cry}-v1.webp` + `elder-woman-cyberhell-scared-v1.webp` → `node scripts/soul-pose-manifest.mjs` (59 ไฟล์ท่า + 24 ไฟล์การ์ด) · ไม่ต้องแก้โค้ดท่า
- ตรวจ: ขนาดตรงต้นฉบับ (เทสต์เดิม `registered assets exist, preserve canvas size`) ผ่านทั้ง 5 · ดูด้วยตาเทียบต้นฉบับแล้วเสียบทั้ง 5 ภาพ ตัวละครถูกต้อง ไม่มีตัวอักษร ม่านตา clerk คงเดิม clerk-cry ยกมือปาดน้ำตา
- ในเกม: Cyberhell business กดข้อ "ฉัน...ไม่ได้ทำ" ในห้องสอบสวน → ภาพเปลี่ยนเป็น `business-cyberhell-scared-v1.webp` (`room-cyberhell-business-scared-390.png`) ไม่มี error · ท่า cry ทั้งสอง + elder-woman scared ยังไม่ได้เห็นในเกมจริง (ครอบด้วยเทสต์ขนาด/ทะเบียนเท่านั้น)
- **ข้อสังเกตให้คุณเป้ดู (เสียบไว้แต่ไม่ 100%)** ตรงกับที่ Codex รายงานเอง:
  - `business-cyberhell-cry` มีแสงขอบสีส้มอุ่นเพิ่มจากต้นฉบับ (ม่วง-เทา) ชัดกว่า business-th-cry — ไม่ได้แก้ด้วยโค้ด (ห้ามย้อมสี) ถ้าไม่ชอบต้องวาดใหม่ · ท่ายิ้มทั้งน้ำตาตามที่คุณเป้รับไว้กับ business โซนอื่น
  - `elder-woman-cyberhell-scared` มือหนึ่งแตะอก อีกมือถือผ้า (สเปกขอถือผ้าสองมือ) ตัวละครถูกต้อง ผมเสียบ
  - ปลายหางต่างจากต้นฉบับเล็กน้อยทุกภาพ (ImageGen วาดใหม่) ไม่เห็นด้วยตาที่ขนาดในเกม

### ภาพที่ข้าม
**ไม่มี** — ทั้ง 33 ภาพ (4 atlas + 24 การ์ด + 5 ท่า) ผ่านการดูด้วยตาและเสียบแล้ว · ที่ยังไม่ได้วาด (ไม่เกี่ยวกับการข้าม): การ์ด scared West 8 ภาพ + Cyberhell 10 ภาพ (Codex หมดงบ 24 ครั้ง) รายชื่ออยู่ใน README ของ run `…/20261114T074445Z-333d3984/docs/art-reviews/2026-11-13-spirit-card-scared/` — โซนเหล่านี้ใช้ fallback ท่า scared ตัวบนสนามไปก่อน

## ไฟล์ที่แตะ
- ภาพ: `img/yama-animation-v1/{th,asia,west,cyberhell}/book-idle.webp` (แทนที่) · `img/soul-card-scared/` (ใหม่ 24, 16 MB) · `img/soul-poses/` +5
- โค้ด: `src/soul-poses.js` (`soulCardScaredFile`, `soulCardForScare`, preload) · `src/ui.js` (การ์ดมุมขวาล่าง 1 จุด + import) · `src/yama-fit.js` (generated) · `src/soul-pose-manifest.js` (generated) · `scripts/soul-pose-manifest.mjs` (เพิ่ม `SOUL_CARD_FILES`) · `index.html` (cache id: ui เป็น …-questdamb-cardscared, soul-poses, manifest, yama-fit)
- เทสต์: ไฟล์ที่ pin รูปแบบ cache id ของ ui.js (battle-fx-1110, fb-ui-1110, ko-crew, perf-1110, quest-rewards, z1-fx5) เพิ่ม suffix `-cardscared` ตามธรรมเนียมเดิม · `tests/soul-poses.test.mjs` (ย้ายตัวอย่าง "ยังไม่มีไฟล์" จาก Cyberhell business/clerk ไปช่อง boy/cleric ที่ยังว่างจริง + เทสต์การ์ดใหม่ 2 ชุด) · `scripts/leftovers-evidence.py` (สคริปต์หลักฐาน)
- ไม่แตะ game.js / data.js / party-balance.js → ไม่ต้อง rebuild hash fixture · ไม่แตะท่าบอส/ขนนก/ดำ

## วิธีรัน/ทดสอบเอง
```
cd ~/agapae-work/.toby-worktrees/z1-v5
python3 -m http.server 8978 --bind 127.0.0.1      # (serve-nocache.py เธรดเดียว Playwright ค้าง)
node --test tests/*.test.mjs      # 2279 ผ่านทั้งหมด (รอบแรกล้ม 7 ข้อ = cache id pattern + hash แอตลาส A7 แก้แล้ว)
BASE=http://127.0.0.1:8978/index.html CH=chromium python3 scripts/leftovers-evidence.py <outdir> card    # การ์ดก่อน/หลังแพ้
BASE=http://127.0.0.1:8978/index.html CH=chromium python3 scripts/leftovers-evidence.py <outdir> trial   # ยามากะพริบ + ท่า Cyberhell
```
Kittanate ลอง (Chrome ย่อ 390):
1. ห้องสอบสวนทุกโซน — ยามาด้านซ้ายกะพริบตา/มองข้าง หัว-ตัว-มงกุฎต้องนิ่ง ไม่กระตุก · แผนที่ ยืนหันหน้าถือหนังสือ ก็กะพริบเหมือนกัน
2. สู้วิญญาณขัดขืน (กดออกหมายให้วิญญาณที่ขัดขืน) ชนะ → การ์ดมุมขวาล่างเปลี่ยนเป็นท่าตกใจพร้อมตัวบนสนาม (TH/Asia/บางตัว West); Cyberhell ใช้ท่า scared ตัวบนสนาม
3. Cyberhell: business / clerk / elder-woman กดข้อปฏิเสธ → ท่า scared · business / clerk คดีขอร้อง (plea) → ท่า cry

## สเปกอาร์ตที่ต้องการเพิ่ม
- การ์ด scared ที่เหลือ 18 ภาพ (West 8: cleric, woman, clerk, boy, girl, business, elder-woman, graduate · Cyberhell 10) ชื่อ `img/soul-card-scared/<ต้นฉบับ>-scared.webp` ขนาดเท่าต้นฉบับ — ไม่เร่ง เพราะมี fallback แล้ว
- (ไม่บังคับ) `business-cyberhell-cry-v1` วาดใหม่ถ้าคุณเป้ไม่ชอบแสงส้ม

## สิ่งที่ยังไม่ทำ
- ท่า cry ของ Cyberhell business/clerk และ elder-woman scared ยังไม่ได้เห็นในเกมจริง · ทดสอบ Chromium (Playwright) เท่านั้น ไม่ได้ลองเครื่องจริง/Pages
- ไม่ได้ผูกการ์ดใน "ลำดับเทิร์น" (รูปเล็กด้านบน) ให้เปลี่ยนท่า — ใบงานระบุเฉพาะการ์ดมุมขวาล่าง
- ไม่ได้ merge main (ตามใบงาน)
