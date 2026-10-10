# AVEGEE — รวม G4 (ค้าง รอ Claudy) + G3c-B สไปรท์ฟัน fang/chain · 10 ต.ค. 2569

## G4: **ยังไม่ push — บล็อกด้วยเทสต์ G5 balance ล้ม** (รอ Claudy ตัดสิน)
- รวมเสร็จแล้วบน branch local `dale/merge-g4` (commit `5e5ec14`, แตกจาก main `9f54605`) · main/origin ไม่มี G4
- ทำแล้ว: merge `toby/g4` (ชน `src/i18n.js` ที่เดียว แก้โดยเก็บคีย์ g5.* + `Rice Ball` ของ Toby) · `WEAPONS.cane.atk` .25 → .20 ตาม Claudy · แก้ `tests/g4-items-balance.test.mjs` ตามเลข +20% · cache-bust ui.js ต่อท้าย `-g4` · `node --check` ผ่าน
- ผลเทสต์: 632 ข้อ ผ่าน 631 · **ล้ม 1:** `G5 balance: level 3 on both trainees increases each story encounter by at most 10 percentage points` → `cyber breach: +15.5 percentage points` (baseline 52% → 67.5% ที่ระดับควบคุมไฟ 3 ทั้งสองคน) · ฉากอื่นทุกฉาก delta 0
- สาเหตุ: G4 เพิ่ม atk ศัตรู cyber breach ×1.5 ทำให้ฉากนี้เป็น "หน้าผา" (ไม่ใช่ 100% อีกแล้ว) พอลูกไฟแรงขึ้น +15% อัตราชนะจึงขยับเกิน 10 จุด · G5 วัดบอทกล่องยาปกติ ไม่ใช่ขนาดใหญ่
- **ต้องให้ Claudy เลือก 1 ข้อ:** (ก) ผ่อนเกณฑ์ G5 สำหรับ cyber breach เป็น ≤16 จุด เพราะฉากนี้ตั้งใจให้ 70–90% และเป็นการลงทุนฝึก 3 ระดับ × 2 คน · (ข) ลดเพดานระดับควบคุมไฟ (เช่น +3%/ระดับ = +9%) · (ค) ปรับ atk cyber breach ลงเล็กน้อย
- พอตัดสิน: แก้ 1 จุด (ข้อ ก = `output/Codex/g5/balance.mjs` บรรทัด `row.delta <= 10`) แล้ว `git checkout main && git merge dale/merge-g4` → เทสต์ → push (ทำได้ภายในไม่กี่นาที)
- ยังไม่ได้เล่น Chrome ของ G4 (ร้านโซน 2 / ชื่อไอเท็ม / ปุ่มพักศาลา / คูลดาวน์อาวุธ) — จะเล่นหลัง merge จริง

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
