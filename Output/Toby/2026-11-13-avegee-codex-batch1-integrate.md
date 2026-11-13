# Toby — AVEGEE: เสียบงาน Codex ชุด 13 พ.ย. (4 ชิ้น) · 13 พ.ย. 2569

worktree `~/agapae-work/.toby-worktrees/z1-v5` · branch `claude/2026-11-05-zone1-v5-fx` · ใบงาน `Output/Claudy/briefs/2026-11-13-avegee-codex-batch1-integrate.md`
ภาพเทียบทั้งหมด: `~/Desktop/AVEGEE-ตรวจงาน-1113/` (21 ไฟล์ 19 MB — เปิดเรียงตามเลขหน้าชื่อไฟล์ 1- 2- 3- 4-)

## สิ่งที่ build

### 1. SPIRIT-POSES — เสียบได้ 34 จาก 39 (commit f1d2d1fe)
ใช้โฟลเดอร์รอบสอง `20261113T040600Z-4e901b34` (ครอบคลุมรอบแรก `0933a118` ที่ fail ครบแล้ว — รอบแรกมี 26 ไฟล์ซึ่งรอบสองรับช่วงมาทั้งหมด)

| โซน | ได้ / ต้องการ |
|---|---|
| TH | 5 / 5 |
| Asia | 7 / 7 |
| West (รวม graduate ที่ใช้ทุกโซน) | 14 / 14 |
| Cyberhell | 8 / 13 |
| รวม | **34 / 39** (scared 18 · cry 16) |

ตรวจก่อนเสียบ: ทุกไฟล์ขนาดตรงต้นฉบับ, RGBA, มุม alpha 0 (บางไฟล์ 1 = มองไม่เห็น), ขนาดไฟล์ 0.98–1.09 เท่าต้นฉบับ, ปลายหางไม่ขยับ (ขอบล่างเท่าเดิม); ดูด้วยตาเทียบต้นฉบับทีละไฟล์ + ซูมหน้า cry ที่ตาขาว 12 ตัว
- ตาขาวคงอยู่ใน scared ทุกตัว · cry ของตัวตาขาว (worker/officer/woman ใน Asia/West/Cyberhell) เปลี่ยนเป็น **ตาหลับปรือมีน้ำตา** ไม่มีม่านตา — อ่านเป็นร้องไห้โล่งใจ ไม่โหดร้าย ไม่มีบาดแผล/เลือด ผมรับ (ตรงสเปก 4.2 "ตาปิดครึ่ง")
- **ข้อสังเกตให้คุณเป้ดู** (ผมรับไว้แต่ไม่ 100%): `business-{th,asia,west}-cry` ยังมีรอยยิ้มเจ้าเล่ห์ติดอยู่ทั้งที่น้ำตาไหล อ่านได้ทั้ง "ซึ้ง" และ "ยิ้มทั้งน้ำตา" · `business-th-cry` โทนแสงอุ่นกว่าต้นฉบับเล็กน้อย (rim light สีส้ม) ถ้าไม่ชอบ ใช้ prompt แก้ด้านล่าง
- ไฟล์: วางลง `img/soul-poses/` → `node scripts/soul-pose-manifest.mjs` (54 ไฟล์) → commit คู่
- เทสต์ `tests/soul-poses.test.mjs` 5 ชุดล้มเพราะใช้ช่อง West/Asia-cry เป็นตัวอย่าง "ยังไม่มีไฟล์" → ย้ายตัวอย่างไปช่องที่ยังขาดจริง (Cyberhell business/clerk) พฤติกรรมโค้ดไม่เปลี่ยน
- ในเกม (Chromium 390×844): West officer/elder-woman, Cyberhell worker/girl กดข้อปฏิเสธ → ภาพสลับเป็น `*-scared-v1.webp` แล้วกลับท่ายืนหลัง ~1.75 วิ · TH business คดีหนักกด plea → `business-th-cry-v1.webp` · **ไม่มี error ไม่มี request 404** · ท่า cry ของ Asia/West/Cyberhell ยังไม่ได้เห็นในเกมจริง (สุ่มคดีหนักไม่เจอในโซนนั้น + เซิร์ฟเวอร์ทดสอบค้างระหว่างลอง) — ครอบคลุมด้วยเทสต์ + ภาพเทียบเท่านั้น

**ที่ไม่ได้เสียบ 5 ภาพ (Cyberhell ทั้งหมด — Codex ไม่ส่งไฟล์ เพราะติดเพดาน 40 ครั้ง/ผิดขนาด) + prompt แก้**
อ่านสเปกเต็มได้ที่ `Output/Vera/2026-11-12-avegee-spirit-poses-spec.md` หัวข้อ 6 (บล็อกสไตล์ 6.1 + บล็อกล็อก 6.2 + บล็อกท่า 6.3 แปะนำหน้าทุกชิ้น) แล้วต่อท้ายด้วยบรรทัดต่อชิ้นนี้ · แนบต้นฉบับ + ภาพสีหน้าตัวอย่าง (scared: `img/soul-poses/worker-cyberhell-scared-v1.webp`; cry: `img/soul-poses/officer-cyberhell-cry-v1.webp`)

| ไฟล์ที่ขาด | เหตุผลจาก Codex | บรรทัดต่อท้าย prompt |
|---|---|---|
| `business-cyberhell-scared-v1` | ครั้งที่ 33 ได้ 1112×1414 แทน 1208×1302 และตัวชิดขอบ | `Reference to edit: img/CyberHell/spirit-business-cyberhell-v2.webp (1208x1302). Output canvas MUST be exactly 1208x1302 — do not recompose, do not enlarge the figure; keep >= 4 percent empty margin at every edge. Character note: fat man with a sly sideways smirk, one hand on the suit lapel, other wrist with gold watch and ring; REMOVE the smirk entirely; keep watch and ring unchanged.` |
| `clerk-cyberhell-scared-v1` | ครั้งที่ 34 ลบม่านตาเดิมเป็นตาขาว | `Reference to edit: img/CyberHell/spirit-clerk-cyberhell-v2.webp. KEEP the original irises and eye colour exactly; do not turn the eyes white. Bun hair, neck badge, glowing folder held to the chest in the left hand; wide eyes, small round open mouth, sweat drops, right hand rises to the chest.` |
| `elder-woman-cyberhell-scared-v1` | ครั้งที่ 35 ได้ 1083×1453 แทน 1145×1374 | `Reference to edit: img/CyberHell/spirit-elder-woman-cyberhell-v2.webp (1145x1374). Output canvas MUST be exactly 1145x1374. Handkerchief held in both hands stays; eyes wide, mouth open, sweat drops.` |
| `business-cyberhell-cry-v1` | ครั้งที่ 40 ได้ 1112×1414 แทน 1208×1302 | เหมือน business scared แต่ท่า cry (6.3) — ขนาดผืน 1208×1302 เป๊ะ; **ให้เปลี่ยนรอยยิ้มเจ้าเล่ห์เป็นปากเผยอเหมือนถอนหายใจ** (อย่าให้ยิ้มค้าง) |
| `clerk-cyberhell-cry-v1` | ยังไม่ได้วาด (ถึงเพดาน 40 ครั้ง) | เหมือน clerk scared แต่ท่า cry · คงม่านตาเดิม น้ำตาไหลสองทาง ยกมือขวาปาดน้ำตา โฟลเดอร์แท่งแฟ้มคงอยู่ในมือซ้าย |

เคล็ดลับ: ขนาดผืนผิดซ้ำ 3 ครั้ง (33, 35, 40) → ใส่ขนาดเป๊ะเป็นบรรทัดแรกของ prompt และให้ Codex ตรวจขนาดหลัง gen ก่อนส่งออก ไม่ย่อ/ขยายเอง · เมื่อได้ไฟล์: วางลง `img/soul-poses/` + `node scripts/soul-pose-manifest.mjs` ท่าขึ้นเองโดยไม่แก้โค้ด

### 2. CONSTRUCTION-Z234 — เสียบครบ 3 โซน (commit 5d1a1751)
`img/construction/{asia,west,cyberhell}/stage-{1,2,3}.webp` + `construction.json` (5632×704 = 8 เฟรม 704×704, 8 fps, foot [352,640], worldWidth 256 เหมือนโซน 1) · **ไม่ต้องแก้โค้ด** — `src/construction-sheets.js` โหลด `img/construction/<zone>/construction.json` ตามโซนของเกมอยู่แล้ว
ดูแล้ว: ทั้ง 12 แถบ (th + 3 โซน × 3 ระยะ) เปิดได้ RGBA · เรียก `drawConstruction` จริงของเกมต่อโซน ที่ progress 15/50/85% ได้ภาพ นรกจีนไม้แดงดำ / หินเหล็กน้ำแข็ง / เหล็กนีออนม่วง คนงานเป็นของโซนนั้น ไม่มีหลังคา · ในเกมจริง เบราว์เซอร์ดึง json+3 แถบของโซนที่เล่นอยู่ (200 ทั้งหมด ไม่มี error) · คนงานบนฉากเล็ก (256 world px) เหมือนโซน 1
ภาพ: `2-ก่อสร้าง-th-asia-west-cyberhell-3ระยะ.png` (แถว = th, asia, west, cyberhell; คอลัมน์ = 15/50/85%)

### 3. TRASH-ICON — แทนแล้ว (commit 6276117d)
`img/ui/icon-trash.webp` 256×256 RGBA เส้นทองเหลี่ยมสไตล์เดียวกับ icon-close (ฝาถัง + ซี่แนวตั้ง) · ที่ 26 px อ่านออกเป็นถังขยะชัด · ดูในเกมที่หน้าเลือกเซฟ 390 px (`3-ถังขยะ-ในเกม-390.png`, ภาพเทียบ `3-ถังขยะ-เก่า-ใหม่-close-26px.png`) — หมายเหตุ: ไอคอนปิดมุมขวาบนเป็นแผ่นทองเต็มช่อง ส่วนถังขยะเป็นเส้นโครงทอง ต่างรูปแบบกันเล็กน้อยแต่โทนสีเดียวกัน

### 4. Z1-TOUCHUP — ติดตั้งลง v7r แล้ว 2 จุด (commit ดูท้ายโน้ต)
- `native.webp` ของ Codex เป็นแพตช์ 512×512 บนกริด 2× ที่ **พิกเซลนอก mask เท่าต้นฉบับ v7r ทุกพิกเซลอยู่แล้ว + ขอบ feather 8 px ทำมาแล้ว** → ไม่ต้องทำ min-cost seam/feather ซ้ำ ผมวางตรงที่ `contextRectPx2x` แบบไม่ resize (ตรวจเอง: พิกเซลที่เปลี่ยนจริงอยู่ในกรอบ 80×70 px ต่อจุด ตรงกับ README)
- สคริปต์ใหม่ `scripts/apply-z1-touchup.py <pack> [--set v7r] [--dry]` (บันทึกวิธีไว้ในคอมมิต) — ตรวจ SHA-256 ของไทล์ต้นทางกับ registration.json ก่อน (ทำซ้ำไม่ได้ = กันวางซ้ำ) แล้วเขียนทับ **เฉพาะ 4 ไทล์** `r2-c2 r3-c2 r2-c7 r2-c8` ที่ q88 เท่า install-z1-ground.py + อัปเดต `manifest.json` (**เบี่ยงจากใบงาน:** ไม่ได้ใช้ `install-z1-ground.py` เพราะมันตัดไทล์ใหม่ทั้ง 70 ไฟล์จากชิ้น 2048 px (`~/agapae-work/.toby-scratch/z1-v7r/v7r` ยังอยู่) ต้องแพตช์ชิ้นต้นทางก่อนแล้วเข้ารหัสไทล์ที่ไม่เกี่ยวอีก 66 ไฟล์ ซึ่งเพิ่มความเสียหายจากการบีบอัดและทำ diff ใหญ่โดยไม่จำเป็น — ผลสุดท้ายเหมือนกัน: ไทล์ที่ถูกแตะเข้ารหัส q88 เท่ากัน · ใช้ชื่อ `v7r` เดิม ไม่สร้างชุดใหม่ ถอยกลับด้วย git revert ได้ · ข้อควรรู้: ชิ้น 2048 px ใน scratch ยังเป็นของก่อนแก้ ถ้าติดตั้ง v7r ใหม่จากชิ้นนั้นจะเสียการซ่อมนี้ ต้องรัน apply-z1-touchup.py ซ้ำ)
- ดูในเกม 390 px แล้ว: lava-north-stair — ขอบตรงแนวตั้งของใบไม้แดงที่ตีนบันไดหายไป เป็นแนวใบเฉียงต่อกับพื้นหิน · heaven-bridge — ก้อนเมฆขอบตัดตรงกลายเป็นขอบนุ่ม · บันได/ราว/สะพานไม่เปลี่ยน
- ภาพ: `4-พื้น-lava-north-stair-ก่อน-หลัง.png`, `4-พื้น-heaven-bridge-ก่อน-หลัง.png` (ซ้าย = ก่อน ขวา = หลัง) และ `4-ในเกม-*-หลัง.png`

## ไฟล์ที่แตะ
- `img/soul-poses/` +34 ไฟล์ · `src/soul-pose-manifest.js` (generated) · `tests/soul-poses.test.mjs`
- `img/construction/{asia,west,cyberhell}/` +12 ไฟล์
- `img/ui/icon-trash.webp`
- `img/map-zone1/v7r/{r2-c2,r3-c2,r2-c7,r2-c8}.webp` + `manifest.json` · `scripts/apply-z1-touchup.py` (ใหม่)
- ไม่ได้แตะโค้ดเกม (`src/`) นอกจาก manifest ที่ generate

## วิธีรัน/ทดสอบเอง
```
cd ~/agapae-work/.toby-worktrees/z1-v5
python3 scripts/serve-nocache.py 8777      # เปิด http://localhost:8777 ใน Chrome ย่อเป็น 390
node --test tests/*.test.mjs               # ~3.5 นาที
```
Kittanate ลอง:
1. ท่าวิญญาณ: โซน West/Cyberhell เปิดห้องสอบสวน กดข้อ "ปฏิเสธ" → ท่าตกใจ ~1.75 วิ แล้วกลับท่ายืน · คดีหนักของ TH (เจ้าของกิจการ/แม่ค้าออนไลน์/หญิงวัยกลางคน) กดข้อขอร้อง → ท่าร้องไห้
2. ก่อสร้าง: ไปโซน 2/3/4 กดสร้างสถานี → ดูเครน+คนงานของโซนนั้น
3. เมนูเริ่มเกม → เลือกช่องบันทึก → ปุ่มถังขยะข้าง SLOT ที่มีเซฟ
4. โซน 1 ส่องที่ตีนบันไดทางเหนือของลาวา และชานสะพานสวรรค์ (ซ้ายล่างของสะพาน)

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มีสเปกใหม่ — แค่ส่ง prompt แก้ 5 ภาพ Cyberhell (ตารางข้างบน) กลับให้ Codex

## สิ่งที่ยังไม่ทำ
- ท่า Cyberhell 5 ภาพ (ด้านบน) — ช่องเหล่านั้นยังเป็นเอฟเฟกต์ CSS เดิม ไม่มีภาพแตก
- ไม่ได้ดูท่า cry ของ Asia/West/Cyberhell ในเกมจริง (ดูเฉพาะ TH business cry) — เทสต์ขนาด/RGBA/ทะเบียนผ่านทุกไฟล์
- ยังไม่ได้ทดสอบบนเครื่องจริง/Pages — Chromium (Playwright) เท่านั้น
- ท่า scared ยังไม่ผูกกับ "ตวาด/น้ำแข็ง" และการ์ดโปรไฟล์ในฉากสู้ (ไม่อยู่ในใบงานนี้)
