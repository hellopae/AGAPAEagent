# AVEGEE — รวม G4 (ค้าง รอ Claudy) + G3c-B สไปรท์ฟัน fang/chain · 10 ต.ค. 2569

## G4: **PASS — push แล้ว `8175171`** (Claudy เลือกข้อ ข)
- merge `toby/g4` (ชน i18n ที่เดียว) + `WEAPONS.cane.atk` .25 → .20 ตาม Claudy + cache-bust ui.js ต่อท้าย `-g4` (ชน index.html กับ H5a แก้โดยเก็บทั้ง `-h5a-g4`)
- **ควบคุมไฟ G5: +5% → +3% ต่อระดับ (สูงสุด +9%)** — ค่าคงที่ `FIRE_BONUS_PER_LEVEL = .03` ใน `src/krata-control.js` · แก้ข้อความ TH+EN (`g5.trainTip`, `g5.max`) และเทสต์ G5 (0/3/6/9%, ลูกไฟ 40 → 41/42/44 ปัดตามสูตร) · วัดซ้ำ benchmark 200 รอบ: **cyber breach 52% → 52% (เพิ่ม 0 จุด)** ทุกฉากเพิ่ม 0 จึงไม่ต้องลดเป็น 2% · ตัวเลขสุดท้ายคือ **+3% ต่อระดับ**
- เทสต์: `node --check src/*.js` ผ่าน · `node --test tests/*.test.mjs` **635/635**
- Pages: build `8175171` · ui.js `?v=...-h5a-g4`
- เล่นจริง Chrome บน Pages (https://hellopae.github.io/AVEGEE/):
  - กระเป๋า: น้ำชา / ข้าวปั้น / น้ำมนต์ / กล่องยา / กล่องยาขนาดใหญ่ / น้ำมนต์ขวดใหญ่ ชื่อเดียวทุกโซน
  - ร้านค้า (merchantStock): ไทยไม่มีของใหญ่ · บูรพา กล่องยาใหญ่ 125 / น้ำมนต์ใหญ่ 100 · ปัจฉิม 155/115 · เครือข่าย 170/135
  - ยมทูตไม่ใช่ Guard (ทัณฑ์) HP 23: โต๊ะนิรา มีปุ่ม "ไปพักที่ศาลาน้ำชา" (ปิดพร้อมเหตุผล "ต้องสร้างศาลาน้ำชาให้เสร็จก่อน" ระหว่างศาลายังสร้าง) → เมื่อศาลาเสร็จกดได้ → teaRest phase travel เดินไปศาลา
  - คูลดาวน์อาวุธในศึก (ดาบไม้เท้า): พร้อมใช้ → ดูดเลือด → พัก 3 → 2 → 1 → พร้อม ตรงสเปก มีป้ายบนจอ + ตัวเลข ไม่มี exception
- ไม่ได้เล่น: ศึกจริงใช้กล่องยาขนาดใหญ่ผ่านวงคำสั่ง · ภาษา EN ผ่านจอ · มือถือจริง
- ย้อนกลับ: `git revert -m 1 8175171` (merge commit) แล้ว push

## G3c-B: **PASS** — push แล้ว `8e63139` (merge เหนือ origin `24b3a7d` H5a)
- เพิ่มเฉพาะภาพ: `img/yama-sword-weapons/hero-yama-{th,asia,west,cyberhell}-sword-{fang,chain}.webp` (8 ไฟล์ 5120×640 RGBA ตรงสเปกแผ่น 8 เฟรม) + รายการ `img/manifest.json` / `img/preload-catalog.json` · ไม่เอา `output/` · ไม่รัน make-manifest
- ชั้นโหลด H1: ตรวจ `assetTier` = tier 1 (background) rank 4 (กฎ `yama-sword`)
- cache-bust: preload.js CATALOG_VERSION `...-h1-g5-g3cb` · art.js manifest `...-g5-g3cb`
- เทสต์: `node --check src/*.js` ผ่าน · `node --test tests/*.test.mjs` 624/624
- เล่นจริง Chrome (844×390) ศึกแหกคุก ฟาดปกติด้วยดาบเดิม/เขี้ยว/โซ่ ใน 4 ชุด (ไทย บูรพา ปัจฉิม เครือข่าย): จับเฟรมจาก canvas `yama-sword-animation` — ทุกชุดเห็นดาบเขี้ยว (ใบดำปลายเขี้ยว ลายส้ม) และดาบโซ่ (ใบฟ้า-เขียวดำมีโซ่) ฟาดไปทางขวาทุกเฟรมที่จับได้ แสงฟันตรงชุดเดิม · ภาพ contact sheet `Output/Dale/g5-evidence/g3cb-{th,asia,west,cyberhell}-frames.png` (แถวบน = ดาบเดิม กลาง = fang ล่าง = chain)
- ข้อจำกัด: จับเฟรมด้วย polling ใน headless จึงขาดบางเฟรมต่อรอบ (แต่ครบ 8 เฟรมเมื่อรวมกัน) · ไม่ได้ดูบนมือถือจริง
- ตรวจ Pages จริง: build `8e63139` · ไฟล์ 8 ภาพ 200 · เล่นซ้ำชุดปัจฉิมบน https://hellopae.github.io/AVEGEE/ เห็นเฟรมครบ ไม่มี exception
- ย้อนกลับ: `git revert 8e63139` (merge เหนือ origin ไม่มี conflict) หรือ revert commit G3c-B (`git log --grep G3c-B`) แล้ว push · ไม่ force

## worktree/branch
ไม่ได้ลบ worktree ใดๆ · ไม่แตะ `.toby-worktrees/g4` · ไม่แตะ Codex run G3c-B (ใช้แค่อ่านไฟล์ภาพ)
