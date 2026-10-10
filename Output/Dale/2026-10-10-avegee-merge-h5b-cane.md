# Dale — AVEGEE: รวม H5b (เอฟเฟกต์บนปก) + ดาบไม้เท้าราตรี (cane) + ดาบท้องม้าโทรจัน (trojan)

**ผลแยกงาน:** H5b = **PASS (มีข้อสังเกตเรื่อง fps)** · cane = **PASS** · trojan = **PASS** · push แล้ว ไม่ force
Commit บน main: **`3d7584b`** (merge ของ `9f44e6e` + origin/main `1d31853` ที่มี H3/H4) · Pages build `built` ที่ `3d7584b`
Live: https://hellopae.github.io/AVEGEE/ · worktree `/Users/agapae/agapae-work/.dale-worktrees/h5b` (branch `dale/h5b`, ไม่ลบ)
เทสต์: `node --check src/*.js` ผ่าน · `node --test tests/*.test.mjs` **656 ผ่าน / 0 ล้ม** (หลัง merge H3/H4)

## สิ่งที่รวม / ไม่รวม
**H5b (Codex run `20261010T015024Z-ed5e4ef4`)** — เอา: `src/cover-fx-h5b.js`, `img/cover-fx/{lava,fire,volcano,soul}-mask.png` (รวม ~16 KB), `<canvas id="cover-fx-h5b">` + CSS ใน `index.html`, manifest/preload-catalog (มือ ไม่รัน make-manifest), กฎ background tier `^img/cover-fx/` ใน `asset-preload.js`, `tests/h5b-cover-fx.test.mjs`
- **ไม่เอา** `scripts/prep-art.py` (ตัวแก้เป็น hack เฉพาะ run: ลดขนาด mask 688×384 ด้วย NEAREST เมื่อ out_dir=cover-fx) · **ไม่เอา** `scripts/h5b-cover-masks.py`, `scripts/render-h5b-cover-fx.mjs` (mask สร้างเสร็จแล้ว ไม่ต้องสร้างใหม่) · **ไม่เอา** `output/Codex/`
- เพราะเทสต์ของ Codex อ้างถึงไฟล์ที่ไม่เอา ผมแก้เทสต์: ตัด assertion ที่อ่าน prep-art.py/h5b-cover-masks.py และเทสต์ raster ที่อิง `output/Codex/h5b/*` ออก แทนด้วยเทสต์ตรวจ mask 4 ไฟล์จริง (688×384, alpha เป็น 0/255 เท่านั้น, จุดตัวละคร/บัลลังก์ไม่ถูก mask) — เทสต์เนื้อ runtime (layer/crop/lifecycle/reduced-motion/anchor) เหมือนเดิมครบ
- ผลข้างเคียงที่ต้องรู้: ใครสร้าง mask ใหม่ต้องเขียนสคริปต์เอง (ต้นฉบับยังอยู่ใน worktree Codex `.codex-worktrees/20261010T015024Z-ed5e4ef4/scripts/h5b-cover-masks.py`)

**cane (run `20261010T012244Z-c51db612`)** — เอาเฉพาะ `hero-yama-{th,asia,west,cyberhell}-sword-cane.webp` + manifest + preload-catalog (กฎ tier ของ `asset-preload.js` เดิม `yama-sword` ครอบคลุมแล้ว จึงไม่เพิ่มกฎซ้ำ — ตรวจแล้วทั้ง 4 ไฟล์อยู่ background ไม่ใช่ critical)
**trojan (run `20261010T020240Z-bf7b689d`)** — เอาเฉพาะ `hero-yama-{th,asia,west,cyberhell}-sword-trojan.webp` + manifest + preload-catalog · ไม่ใช้ trojan จาก run `...011856Z-712275e7`
cache-bust: `preload.js?v=h1-g5-h4-h5b-cane-trojan` · `asset-preload.js?v=h1-h5b` · CATALOG_VERSION ต่อท้าย `-h5b-cane-trojan` · `cover-fx-h5b.js?v=h5b` · ui.js ไม่ได้แก้ (token ของ H4 `-h4` คงเดิม)

## เล่นจริง Chrome (Playwright + Google Chrome จริง) — localhost และ Pages จริง
**H5b — 1300×720 และ 390×844** (เล่นผ่านโลโก้ → วิดีโอปก → `cover-settled` จริง ~17 วิ แล้วดู 0.25/2/6 วิ)
- เอฟเฟกต์เริ่มหลังวิดีโอจบ; ปกยังเหมือนเดิมแวบแรก (ดูภาพ `pages-cover-*`) ไม่ทับตัวละคร โลโก้ ปุ่ม · canvas `pointer-events:none`, ปุ่ม "เริ่มเกมใหม่" ยังรับคลิก (elementFromPoint = ปุ่ม) · canvas ครอปตรงกับภาพ (มือถือ 390×844 canvas เต็มกรอบ object-fit:cover)
- ความแรง: เฟรมห่างกัน 0.4 วิ พิกเซลเปลี่ยน >2 ระดับ ~1–5% (สูงสุด ~28/255) ที่จอ 1300×720; ภาพ `cover-diff-x12-1300x720.png` (ต่างขยาย 12 เท่า) เห็นความเปลี่ยนแปลงอยู่เฉพาะลาวา/ไฟคบเพลิง/ภูเขาไฟ/ขอบวิญญาณ (วิญญาณเป็น glow คงตำแหน่ง) ไม่หลุดไปตัวละคร · ลาวาไหล/ประกายดูได้ใน `cover-lava-crop-seq.png`
- **มือถือแนวตั้ง 390×844 ละมุนมาก:** ครอปกลางเห็นลาวาน้อย เปลี่ยนเพียง ~0.12% ของพิกเซล (มองด้วยตาแทบไม่เห็น) — ไม่ผิดตามใบงาน ("ละมุน") แต่ถ้าคุณเป้ต้องการให้เห็นชัดบนมือถือแนวตั้ง ต้องสั่งปรับเพิ่มความแรง/ความหนาแน่นในรอบถัดไป
- reduced-motion: ภาพนิ่งสนิท (เฟรมต่างกัน 0 พิกเซล) · ปิด canvas ด้วย CSS · ยังไม่เห็น exception; 404 ในคอนโซลเป็นของเดิม (audio probe/hero-yama-side/favicon)
- ออกจากหน้าปก → เทสต์ lifecycle (mock) ยืนยันยกเลิก rAF; ไม่ได้วัด CPU ระหว่างเกมในเบราว์เซอร์จริง
- **fps (ผลที่ต้องรายงานตรง ๆ):** ไม่ได้ ≥50fps ที่ 4× CPU throttle ในเครื่องนี้ แต่ **เครื่องโหลดหนักมาก (load average ~51 ตอนวัด)** และกลุ่ม "ปิดเอฟเฟกต์ (reduced-motion)" ก็ได้ต่ำเท่ากัน:

| 390×844 (Pages) | เอฟเฟกต์เปิด | เอฟเฟกต์ปิด (reduced) |
|---|---|---|
| ไม่ throttle | 60 fps | — |
| CPU 2× | 46.4 / 53.0 | 42.7 / 51.1 |
| CPU 4× | 41.9 / 22.1 (และ localhost 56.1 / 37.1) | 27.0 / 45.6 (และ localhost 30.6 / 48.5) |

  สรุป: ผล on/off ปนกันภายในความแกว่งของเครื่อง → ตรวจจับผลกระทบของเอฟเฟกต์ไม่ได้ · ต้นทุนต่อเฟรมของ `drawCoverFrame` วัดตรงในหน้า: median 0.4 ms (ไม่ throttle) / 1.0 ms (4×) / 1.9 ms (6×), p95 7.8 ms ที่ 4× (งบ 16.7 ms) → ไม่ลดความหนาแน่น แนะนำ Chris/คุณเป้ลองบนมือถือจริงอีกรอบเมื่อเครื่องว่าง · **ไม่ได้ทดสอบ iOS/Safari**

**cane + trojan — ฟาดปกติ 4 ชุด (th/asia/west/cyberhell) ใน Chrome ทั้ง localhost และ Pages** (844×390, เข้าศึกผีเปรตผ่านปุ่ม "กดเพื่อเข้าสู้" สวมอาวุธแล้วกด โจมตี→ยืนยัน, จับเฟรมจาก canvas `yama-sword-animation`)
- ทั้ง 8 กลุ่ม (2 อาวุธ × 4 ชุด) เห็นอาวุธใหม่ครบ 8 เฟรม (รวมหลายรอบจับเฟรมเพราะเครื่องโหลด; Pages รอบเดียวจับได้ 3–7 เฟรมต่อกลุ่ม ยืนยันว่าไฟล์ Pages โหลดและวาดจริง) · หันขวาทุกเฟรม · ไม่มี exception · ไฟล์ sprite คำขอ 200 · แสงฟัน: cane = ขาว/ทองตามชุด, trojan = ชมพูมาเจนต้าใบเขียวฟ้า irid (ตรงสเปก Codex)
- ภาพ: `local-{cane,trojan}-frames.png` (8 เฟรมครบ), `pages-{cane,trojan}-frames.png` (แถวบนลงล่าง: th, asia, west, cyberhell)
- ข้อสังเกตเล็ก: cane ใบดาบบาง (ดาบซ่อนในไม้เท้า) เห็นได้ชัดบนพื้นเข้ม แต่เล็กกว่า trojan — ตรงตามชื่ออาวุธ

## วิธีตรวจ (Chris)
1. Chrome เปิด https://hellopae.github.io/AVEGEE/?x=2 (ล้างข้อมูลเว็บถ้าเคยเปิด) → เข้าเกม → ดูโลโก้ไฟ → วิดีโอปก → รอปกนิ่ง 2–3 วิ: ต้องเห็นลาวา/ไฟคบเพลิง/ควันภูเขาไฟ/วิญญาณเรืองเบา ๆ ที่ 1300×720 และ 390×844 ตัวละคร/โลโก้/ปุ่มไม่สั่นหรือเปลี่ยน
2. ตั้ง OS ลดการเคลื่อนไหว → ปกต้องนิ่งสนิท · กดเริ่มเกมใหม่ → ออกจากปกแล้ว Performance monitor CPU ไม่ค้างสูง
3. Console: `G.weapons={owned:{cane:true,trojan:true},equipped:'cane'}` (หรือ `'trojan'`), `G.outfit='asia'` (th/asia/west/cyberhell); `G.outfitsOwned=['th','asia','west','cyberhell']` → เข้าศึกผี (รอเปรตผุด/กด "กดเพื่อเข้าสู้") → โจมตี → เห็นดาบใหม่ หันขวา

## Rollback
`git revert -m 1 3d7584b` (กลับไป `1d31853` = H3+H4 เดิม) แล้ว push · ไฟล์ภาพใหม่ไม่กระทบถ้าไม่ revert เพราะอ้างผ่าน manifest เท่านั้น; ถ้าจะปิดเฉพาะเอฟเฟกต์ปก: ลบ `<script ...cover-fx-h5b.js>` ใน `index.html` (canvas ไม่วาดอะไรถ้าไม่มีสคริปต์) แล้ว bump `preload.js?v=`

## หลักฐาน
`/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/h5b-evidence/` (ลบภาพได้หลัง merge เก็บ .md ไว้)
