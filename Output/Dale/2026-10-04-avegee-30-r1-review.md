# Dale review 30-R1 — AVEGEE

## ส่วนที่ 1 — `origin/codex-app/2026-10-04` (Codex app ของคุณเป้): **PASS** (Dale แก้เทสต์เก่า 3 ข้อเอง แล้ว merge)

### Commit บน main (hellopae/AVEGEE, push แล้ว)
- `1c30e54` Add four-zone tea recovery rooms and 20 character cutscene assets (Codex app)
- `6baa2ce` Draw 36 wide four-zone station rooms and unify 9 Yama intros (Codex app)
- `8db411b` Dale: แก้เทสต์เก่า 3 ข้อที่พังเพราะพฤติกรรมใหม่ (ไม่แตะโค้ดเกม) · fast-forward จาก `b199a98`
- ไม่ลบ branch `codex-app/2026-10-04` บน remote
- cache bump: Codex ทำเองแล้ว (`?v=20261004-recovery-ice` ใน `src/art.js`) + `img/manifest.json` เพิ่มภาพใหม่ครบ — Dale ไม่ต้อง bump

### สรุปว่าแก้อะไร / ใช้ที่ไหน
1. **ห้องศาลาน้ำชาใหม่ 4 โซน** (`img/tea-{th,asia,west,cyberhell}-recovery.png`, `src/tea-recovery.js`) พร้อมที่นอน (ซื้อ 180 เบี้ยกรรม/โซน), ท่านั่งดื่มชาตัดเสื่อ (`hero-yama-*-tea-clean.png`), ท่านอนสลบ (`hero-yama-*-unconscious.png`) · แพ้ศึก = ไม่ Game Over อีกแล้ว → ฉาก "หมดแรง" → ศาลาน้ำชา → นอน 1.2 วิ → เลือดเต็ม (`pendingRecovery` อยู่ใน save, เซฟเก่าโหลดได้ ค่าเริ่มต้น `{}`/`null`)
2. **คัตซีน 20 ภาพ**: ผนึกน้ำแข็ง 4 ชุด (`hero-yama-*-ice-cutscene-v2.png`) · ท่าโจมตีหัวหน้าโซน 4 ภาพ (`leader-*-attack-cutscene.png`) · intro 9 ภาพวาดใหม่ (Intro-Boss-Zone*, intro-zone*, intro-head-*-v2) · CSS คัตซีน/คอมมิคเปลี่ยน `cover` → `contain` ไม่ครอป
3. **ผนึกน้ำแข็ง / พัดสายลม / สะกดจิต โจมตีศัตรูทุกตัว** (ice: คนละ 30 + หยุด 1 เทิร์น; wind: คนละ 36+; hypno: ศัตรูหันตีกันเอง) + ข้อความ TH/EN ปรับตาม — ตัวเลขดาเมจเดิม ไม่ปรับสมดุล
4. **พื้นหลังแผนที่ขยับ 4 โซน** (`src/map-ambient.js`: น้ำ/ลาวา/ไฟฟ้า/อนุภาคท้องฟ้า, ปิดเมื่อ reduced-motion)
5. **ภาพห้อง 36 ใบ `img/rooms-wide/*.png` + `src/room-art-assets.js` + `docs/room-art-*`** — เป็น "art handoff" ล้วน ยังไม่ถูก import จากโค้ดเกมใด ๆ (ไฟล์เขียนไว้ว่า "Claude owns UI/game integration") → ไม่กระทบเกมตอนนี้

### ตรวจข้อห้าม
- ไม่มี `img/raw/`, `output/`, ไฟล์หลักฐาน/ทดลอง · ไฟล์ใหญ่สุด 3.5 MB (ไม่มี > 10 MB) · `git diff --check` สะอาด · `node --check src/*.js` ผ่านหมด
- มีไฟล์ `docs/room-art-handoff-2026-10-04.md` + `docs/room-art-prompts-2026-10-04.json` (เอกสาร handoff ตั้งใจให้ส่งต่อ ไม่ใช่หลักฐานทดลอง)

### เทสต์
- branch ตอน fetch: 296 เทสต์ พัง **3** (main เดิม 283/283 ผ่าน) — ทั้ง 3 เป็นเทสต์เก่าไม่ตามพฤติกรรมใหม่ ไม่ใช่บั๊กเกม Dale แก้เทสต์ (ไม่แตะ `src/`):
  1. `tests/prison-break.test.mjs` "ice stops the selected foe…" — ice ใหม่โจมตีทุกตัว 30 (ศัตรู 30 HP ตายหมด counter จึงเลื่อน) → เขียนเทสต์ใหม่ตามกติกาใหม่ (HP ทุกตัว −30, หยุดถูกใช้ทันที, ไม่โดนสวน, ตาถัดไปสวนปกติ)
  2. `tests/proximity29b.test.mjs` — ทางออกศาลาน้ำชาตรวจกับ `ROOMS.tea` เก่า แต่เกมจริงใช้ `teaRoom(zone)` (ui.js `roomFor`) → ให้เทสต์ใช้ `teaRoom()` และนับขอบสี่เหลี่ยมเป็นพื้นที่เดิน (ทางออก y=.91 อยู่ขอบล่างพอดี, spawn อยู่ในระยะ reach)
  3. `tests/construction-arrival.test.mjs` — canvas จำลองไม่มี `createImageData/setTransform` ที่ map-ambient เรียก → เติม stub (เบราว์เซอร์จริงไม่เกี่ยว)
- หลังแก้ **296/296 ผ่าน**

### ทดสอบเบราว์เซอร์จริง (Playwright Chromium, localhost + live) 1280×800 และ 1440×900
- โหลดเกม/เริ่มเกมใหม่ ไม่มี pageerror · 404 เดียวที่เห็นบน localhost คือ `hero-yama-side.png` + ไฟล์เสียง (มีมาก่อนหน้างานนี้)
- แผนที่ 4 โซนวาดปกติ มีเอฟเฟกต์น้ำ/ลาวา ไม่ error
- ศึกแหกคุก 3 ตัว: ผนึกน้ำแข็ง → คัตซีนเต็มภาพไม่ครอป (ทั้งสองขนาดจอ) → HP ทุกตัวลด · ใช้ UI จริง
- แพ้ศึกจริง (โซน 1) → ฉากสลบ → ศาลาน้ำชา → นอนเอง → HP 100/100, `pendingRecovery=null` · จำลอง `pendingRecovery` ทั้ง 4 โซน × 2 ขนาดจอ → ทุกโซนไปศาลา+หายสำเร็จ
- สังเกต (ไม่ใช่ FIX): ถ้ามี popup เตือนอีเวนต์โซนค้าง (เช่น "วิญญาณถูกสะกดจิต" โซน 3) ขณะแพ้ ฉากพักฟื้นจะรอจนปิด popup ก่อน (onChange ไม่เปิด recovery ตอนมี dlg)
- Live https://hellopae.github.io/AVEGEE/ (art.js รุ่น `20261004-recovery-ice`, `tea-west-recovery.png` 200): โหลดเกม → ศาลาพักฟื้น ไม่มี pageerror ไม่มี 404 ทั้ง 2 ขนาดจอ

### หมายเหตุให้ Claudy/คุณเป้
- **น้ำหนัก**: `img/rooms-wide` 113 MB (PNG 3.0–3.5 MB × 36) ยังไม่ถูกใช้ในเกม แต่ขึ้น repo และ Pages แล้ว (.git ~610 MB → ~800 MB ใกล้เพดานแนะนำ 1 GB ของ GitHub) · ตอนเอามาใช้จริงแนะนำแปลงเป็น webp (เหมือน `img/<Zone>/BG-*.webp` ที่ลดเหลือ ~100 KB) แล้วลบ PNG เดิมออก
- intro 9 ภาพโตขึ้น 0.5–0.9 MB → 2.4–2.8 MB ต่อภาพ (โหลดตอนเข้าโซน)
- `openDefeatRecovery` ภาพพื้นหลังใช้ `object-fit:cover` ทึบ 35% — ไม่กระทบ

### Roll back
`git -C ~/agapae-work/AVEGEE revert -m1 --no-edit 8db411b 6baa2ce 1c30e54 && git push origin main` (ถ้า revert แยกทีละ commit ให้ revert จากใหม่ไปเก่า)

### ภาพที่คุณเป้ควรดูเอง (`Output/Dale/30c-shots/`)
- `r1-tea-west-1440.png`, `r1-tea-cyberhell-*.png`, `r1-tea-th-real-1280.png` (ห้องพักฟื้น) · `r1-defeat-*-1280.png` (ฉากสลบ)
- `r1-ice-cutscene-1280.png`, `r1-ice-after-1440.png` · `r1-map-{asia,west,cyberhell}-*.png`
- เล่นจริง: โซน 1 → ให้ยมบาทแพ้ศึก → ดูฉากสลบ+นอนศาลา · ใช้ผนึกน้ำแข็งในศึกแหกคุก 3 ตัว

---

## ส่วนที่ 2 — Codex 30C (`codex/20261004T101940Z-e5f2fa4f`): **ยังไม่ได้ทำ — ถูกระบบสิทธิ์บล็อก (ไม่ใช่ FIX LIST)**

- ตอนจะอ่าน worktree `~/agapae-work/.codex-worktrees/20261004T101940Z-e5f2fa4f` + `Output/Codex/runs/20261004T101940Z-e5f2fa4f/report.md` + `output/Toby/2026-10-04-avegee-30c.md` (คำสั่ง `cd … && git status && git log && cat …`) auto mode classifier ปฏิเสธ (เหตุผล: Data Exfiltration) · Dale ไม่ได้หาทางเลี่ยง (ไม่อ่านไฟล์เดิมด้วยเครื่องมืออื่น/ไม่แตกคำสั่ง)
- ยังไม่ได้ตรวจ diff / rebase / ทดสอบ pause–โซน 4–สำนวน–หมวดฉ้อโกง / merge / ย้ายหลักฐาน / ลบ worktree+branch ใดๆ ของ run นี้ → **main ยังไม่มี 30C**, worktree และ branch ยังอยู่ครบ
- ข้อ 4 (รายการ `akata` อีก 2 ข้อ) ยังไม่ได้คัด เพราะยังไม่ได้อ่านรายงาน Codex
- สิ่งที่ต้องการให้คุณเป้ตัดสิน: อนุญาตให้ Dale อ่าน worktree/run dir ดังกล่าว (เช่น เพิ่ม permission rule Bash ให้ path `~/agapae-work/.codex-worktrees/*` และ `Output/Codex/runs/*`) แล้วส่งใบงานส่วน 2 ใหม่ หรือให้ Claudy ทำส่วนนี้เอง
- หมายเหตุ: ระหว่างทำ พบว่า scratchpad ของ session ถูกใช้ร่วมกับ agent อื่น (มีไฟล์ `h.py` ของงานอื่นเขียนทับ) — Dale ย้ายสคริปต์ตัวเองไป `scratchpad/dale-r1/` แล้ว ไม่ได้ลบไฟล์ของคนอื่น
