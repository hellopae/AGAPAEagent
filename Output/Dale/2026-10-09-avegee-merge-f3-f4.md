# Dale — AVEGEE: รีวิว + merge Codex F3 (กระจกหอส่องกรรม) และ F4 (เฟรมฟันดาบ)

วันที่ 2026-10-09 · Repo `/Users/agapae/agapae-work/AVEGEE` · Live: https://hellopae.github.io/AVEGEE/
ใบงาน: `Output/Claudy/briefs/2026-10-09-avegee-merge-f3-f4.md`

## สรุป
- F3 = **PASS** (มีข้อสังเกต 1 ข้อเรื่องขนาดไฟล์) · F4 = **PASS** (แก้โครงสร้าง worktree ที่ซ้อนผิด)
- main ก่อนเริ่ม: สะอาด และตรง origin (623ac69) ตามที่ใบงานกำหนด
- push สำเร็จ main = `a54ec0d` · Pages แสดงเวอร์ชันใหม่แล้ว

## ผลรีวิว

### F3 — กระจกหอส่องกรรม (run 20261009T112415Z-e04d8b76) — PASS
- ตรรกะ/มุมคำตอบไม่เปลี่ยน: `mirrorBeam`/`mirrorSolution`/`MIRROR_LAYOUT`/`game.js` ตรงเดิม · เล่นจริงทุกโซนได้ +1 ที่ 26° เท่าเดิม
- พื้นหลัง 4 ห้อง (th/asia/west/cyberhell): เทียบภาพก่อน/หลังด้วยตา ลบเฉพาะกระจกตั้งพื้น/ฐาน/ตัวปล่อยแสง/ลำแสงที่วาดติด ส่วนอื่นเหมือนเดิม · `background-check.json` ระบุพิกเซลนอก mask เปลี่ยน 0 ช่องสัญญาณ
- บานกระจกหมุนได้ ฐานนิ่ง (เล่นจริง: `style` ของ base คงที่ ส่วน `pane` transform เปลี่ยนตามมุม) ลำแสงทอง + จุดกระทบ ไม่มีสีฟ้าเดิม
- **ข้อสังเกต (ไม่ block):** ไฟล์ `img/rooms-wide/*-krajok.webp` เป็น lossless ใหญ่ขึ้นจาก ~0.5 MB เป็น ~2.3 MB ต่อโซน (รวม 2.1 → 9.3 MB) เพื่อรักษาพิกเซลนอกบริเวณแก้ให้เหมือนเดิม โหลดเพิ่มประมาณ +1.8 MB ต่อโซนบนมือถือ ถ้าคุณเป้ต้องการลด แนะนำให้ Mind/Dale encode เป็น lossy คุณภาพสูงในงานแยก (ไม่ทำรอบนี้เพราะใบงานห้ามแตะภาพนอกขอบเขต)

### F4 — เฟรมฟันดาบ (run 20261009T112435Z-0435e8a0) — PASS
- **งานจริงอยู่ที่ไหน:** Codex สร้าง clone ซ้อน `avegee-repository/` ใน worktree แล้วทำงานบน worktree ย่อย `avegee-f4/` (branch `codex/f4-sword-facing`) ส่วน branch ของ run เองมีแต่โฟลเดอร์ซ้อนสองอันที่ stage ไว้ (ขยะ) — ผมคัดลอกเฉพาะไฟล์งานจริง 11 ไฟล์ + `img/yama-sword-v4/` ขึ้นไปที่ root ของ worktree แล้ว commit (ยืนยัน `git diff` ตรงกับของ `avegee-f4` ทุกบรรทัด) ไม่เอาโฟลเดอร์ซ้อนและ `output/Codex/**` เข้า repo
- เฟรม 1–6 ของ asia/west/cyberhell เทียบ RGBA กับ v2 เดิม: **ตรงทุกพิกเซล** · เฟรม 0 และ 7 เท่านั้นที่ต่าง
- เฟรม 0/7 หันขวา ชุด/สี/หมวกตรงกับท่าอื่น (ดู filmstrip) · `FRAME_FACING_FIX` ถูกลบเป็น `{}` (ครบทั้ง 3 แถว) · เวลา 580ms ไม่เปลี่ยน · th ยังใช้ v3 เดิม
- manifest.zones + preload-catalog ลงทะเบียน v4 แล้ว (แทน v2 ในแคตตาล็อก)

## Conflict และสิ่งที่แก้เอง
1. F3 กับ F4 ชนที่ `index.html`, `src/art.js`, `src/preload.js` ตามคาด (สตริงเวอร์ชัน cache) → รวมเป็นเวอร์ชันเดียว
2. **ระหว่างทำงาน origin/main เดินหน้าไป 2 commit** (`bf2fe17`, `add1f19` คุณเป้เปลี่ยนมินิเกม sala เป็น match-three แบบสองภาษา) ผม merge origin/main เข้ามา (ไม่ rewrite history) ชนที่ `index.html`, `src/i18n.js`, `src/minigames/sala.js`, `src/preload.js`
   - `sala.js` ใช้ของ origin ทั้งไฟล์ (มี i18n ครบแล้ว) → **งาน i18n ของ sala ที่ผมทำไว้ก่อนหน้า (key `mg.sala.*` ใหม่) ถูกทิ้งทั้งหมดเพราะซ้ำซ้อน**
   - `i18n.js` เก็บ key `doc.*` ของ origin + key `mirror.*` ของผม
3. i18n ที่ค้าง: **`mirror-charge.js` ทำเสร็จ** — ข้อความไทยทั้งหมด (label มุม, ปุ่มเก็บกระจก, aria-label, alt ภาพ, ข้อความสถานะ 4 แบบ) ย้ายเข้า `src/i18n.js` TH/EN (10 key `mirror.*`) และอัปเดตสดเมื่อสลับภาษา (`onLangChange`) · `t()` เพิ่ม argument `vars` สำหรับ `{n}` (ย้อนกลับเข้ากันได้)
4. เพิ่มเวอร์ชันใน import ที่ F3/F4 แก้ไฟล์แต่ผู้เรียกไม่ได้ใส่ `?v=`: `ui.js → mirror-charge.js`, `training/host.js → yama-sword.js` (ไม่งั้น host ของมินิเกมฝึกอาจได้ `yama-sword.js` เก่าจากแคช)

## เวอร์ชันที่ bump (รอบเดียว)
`20261009-f2-merge-f3-f4-sala-books` ที่: `flow29c.css`, `compact-ui.css`, `preload.js`, `ui.js` (index.html), `img/manifest.json?v=` ใน `art.js`, `CATALOG_VERSION` (ต่อท้ายรุ่นเดิม), import ของ `yama-sword.js`/`yama-sword-v2-assets.js`/`mirror-charge.js` · คง prefix `20261009-f2` ให้ test F2 ผ่าน

## ผลเทสต์
- `node --test tests/*.test.mjs` → **568/568 ผ่าน** (หลัง merge origin/main)
- `node --check` ทุกไฟล์ใน `src/`, `src/minigames/`, `src/minigames/training/` ผ่าน · `git diff --check` สะอาด

## เล่นจริงใน Chrome (Playwright + Google Chrome headless, local server + live Pages)
**หอส่องกรรม (กดปุ่มจริง วางกระจก → ปรับองศา → หมุน slider):**
| โซน | 1280×800 | 844×390 |
|---|---|---|
| th | ผ่าน | ผ่าน (EN) |
| asia | ผ่าน | — |
| west | ผ่าน | — |
| cyberhell | ผ่าน | ผ่าน (EN) |
- มุมผิด (26+50°) ค้าง 2.6 วินาที → ไม่ได้พลัง (0) · มุม 26° → พลังเป็น 1 ทุกโซน
- ระหว่างค้างแสง: `.mirror-charge-base` style ไม่เปลี่ยน, `.mirror-charge-pane` rotate ตามมุม · ลำแสงเป็นสีทอง จุดกระทบเรืองทอง ไม่มีกระจก/ลำแสงเก่าค้างในพื้นหลัง (ดูภาพ)
- โหมด EN: "Mirror angle", "Take mirror back", "Magic mirror charged +1", alt ภาษาอังกฤษ ฯลฯ
- ที่ 844×390 มุมจอเล็กมาก แผงควบคุมกระจกบังฐานกระจกบางส่วนที่ขอบล่างห้อง — เป็น geometry เดิม (พิกัด pivot และ CSS แผงควบคุมไม่ได้แก้) ไม่ใช่ regression จาก F3 แต่ควรให้ Vera ดูถ้าต้องการให้เห็นฐานเต็ม

**ศึกฟันดาบ (บันทึกเฟรมจาก canvas จริงทุก rAF):**
- th/asia/west/cyberhell ที่ 1280×800 และ 844×390: ยมบาทหันขวาตลอด ลำดับเฟรมต่อเนื่อง 0→7 (ที่ 844 asia/cyberhell เห็นครบ 0–7) ไม่มีเฟรมกระโดดหรือหันซ้าย
- บน Pages จริง (หลัง push) ทดสอบซ้ำ: west 1280×800 เห็นเฟรม 0–7 ครบ และ cyberhell 844×390 ครบ 0–7 ใช้ `yama-sword-v4`

**Network/error:** ไม่มี pageerror · 404 ที่เห็น = `img/hero-yama-side.png` (ไฟล์ทางเลือก โค้ดมี fallback), `audio/bgm-*.ogg` (repo มีแต่ `.mp3`) — มีมาก่อนงานนี้ ไม่ใช่ของ F3/F4 (ทั้งบน local และบน Pages)
- Pages: `curl` ยืนยัน 200 ที่ `img/yama-sword-v4/hero-yama-asia-sword.webp`, `img/mirror-charge-base.png`, `img/mirror-charge-pane.png`, `img/rooms-wide/{th,west}-krajok.webp` และ `index.html` แสดง `ui.js?v=20261009-f2-merge-f3-f4-sala-books`

## ภาพหน้าจอที่ดู (เก็บนอก repo ใน scratchpad ของ session — ชั่วคราว)
`…/scratchpad/f34/` : `a1280-th-3hold.png`, `h1280-west-3hold.png`, `g844-cyberhell-3hold.png`, `f844-th-1placed.png`, `sw/all.png` (filmstrip 4 ชุด), `sw/asia-1280-strip.png` และภาพเทียบก่อน/หลังพื้นหลัง 4 ห้อง `cmp-{th,asia,west,cyberhell}.png`

## Commit hash บน main (AVEGEE)
| hash | ข้อความ |
|---|---|
| `69a294b` | F3 (branch run) |
| `05e6f19` | F4 (branch run) |
| `920c66c` | Merge codex F3 |
| `f02ea62` | Merge codex F4 + cache-bust + i18n mirror |
| `a54ec0d` | Merge origin/main (sala match-three) — **HEAD main ที่ push แล้ว** |

## วิธีตรวจสำหรับ QA / Rollback
- ตรวจ: เปิด https://hellopae.github.io/AVEGEE/ (กด Ctrl+Shift+R) → โซนไหนก็ได้ที่ปลดกระจกแล้ว เปิดหอส่องกรรม → วางกระจก → ปรับองศาไป 26° ค้างประมาณ 2 วินาที ควรได้ +1; สลับ EN ตรวจข้อความ; ศึกสู้ (ตีธรรมดา) ดูยมบาทหันขวา
- Rollback: revert ทีละ merge: `git revert -m 1 f02ea62` (F4 + cache-bust + i18n mirror) และ/หรือ `git revert -m 1 920c66c` (F3) แล้วค่อย bump cache อีกรอบและ push — `a54ec0d` คือ merge ของ origin/main (sala) ห้าม revert · **ไม่ force push**

## ที่เก็บกวาด
ลบ worktree + branch ของสอง run แล้ว (`git worktree remove`, `git branch -d`) · ไม่แตะ `codex/20261005T002509Z-e0a65816` · หยุด local server ที่เปิดไว้ · ไม่แตะ `img/raw/`, `Exam/`, ไม่รัน `make-manifest.py`
