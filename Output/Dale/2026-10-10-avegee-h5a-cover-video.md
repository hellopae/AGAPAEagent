# Dale — AVEGEE H5a: วิดีโอเปิดหน้าปก (ต่อ 2 ช่วง + มืดค่อยสว่าง + จบที่ cover-v5)

**ผล: PASS (ทดสอบ Chrome ทั้ง localhost และ Pages จริง)** · รวมเข้า AVEGEE main แล้ว (fast-forward ไม่ force) commit `24b3a7d` · Pages build `built` ที่ `24b3a7d`
Live: https://hellopae.github.io/AVEGEE/ · วิดีโอ: https://hellopae.github.io/AVEGEE/img/home-intro-v5.mp4
ฐานรวม: ต่อจาก origin/main `9f54605` (มี H1 + G5 + G2b แล้ว) · worktree `/Users/agapae/agapae-work/.dale-worktrees/h5a` (branch `dale/h5a`)

## ลำดับที่ผู้เล่นเห็นตอนนี้
โลโก้ไฟ (intro-opening-v2 ถึง 4.9 วิ = ไฟลุกสุด; ไฟล์เดิมตัดเป็นฉากพญายมมืดที่ 5.0 วิ จึงหยุดก่อนถึง) → หรี่เข้าสี `#090407` 0.5 วิ → วิดีโอปก `home-intro-v5.mp4` (12.04 วิ) เริ่มที่สี `#090407` เดียวกัน ค่อยสว่างด้วย smoothstep 2.2 วิ → รอยต่อ part1/2 ที่ ~4.0 วิ → จบที่องค์ประกอบ cover-v5 → dissolve 0.5 วิ เข้าภาพนิ่ง `cover-v5.webp` (ซึ่งอยู่ใต้วิดีโอตลอด) → ค้างที่ปกนิ่ง
**หมายเหตุพฤติกรรมที่ตัดสินเอง:** (1) สแปลชเดิมเล่นต่อจนถึงฉากพญายมเปิดตัว 19 วิ — ตอนนี้ตัดที่ 4.9 วิ เพราะวิดีโอใหม่คือ "ฉากต่อจากโลโก้ไฟ" แทนส่วนนั้น (ไฟล์ `intro-opening-v2.mp4` ไม่ถูกแก้/ลบ) (2) ปุ่ม "ข้าม →" ของสแปลช = ไปปกนิ่งเลย ไม่เล่นวิดีโอปก (3) เมนู/โลโก้ชื่อเกมบนปกแสดงตั้งแต่วิดีโอเริ่ม (ไม่ซ่อนจนจบ) — ถ้าคุณเป้อยากให้เมนูค่อยโผล่ตอนวิดีโอจบ บอกได้ แก้เล็กน้อย

## ไฟล์/ตัวเลข
- `img/home-intro-v5.mp4`: H.264 High, ไม่มีเสียง (ต้นฉบับ part1/2 ไม่มีสตรีมเสียง), 1300×708 24fps 289 เฟรม 12.04 วิ, **3,080,073 B (2.94 MiB) ≤ 4MB**, faststart (moov อยู่หัวไฟล์), crf 23 preset slow
- ต้นฉบับเต็มก่อนบีบ (ต่อแล้ว ไม่มีเฟด crf 12): `Output/Claudy/refs/2026-10-10-cover-video/joined-full.mp4` (12.47 MB)
- ต่อ part1+part2: ตัดเฟรมแรกของ part2 ซึ่งซ้ำกับเฟรมสุดท้ายของ part1 (289 = 97 + 192) · ความต่างเฟรมที่รอยต่อ 0.47 (ค่าเฉลี่ย |Δ| ระดับพิกเซล) ต่ำกว่าเฟรมติดกันปกติในช่วงนั้น (0.1–1.4) → **ไม่ต้อง crossfade** ภาพหลักฐาน `h5a-evidence/seam-frames-94-99.png`
- เวลาโหลด: Pages (curl) 3.08 MB ใน 0.48 วิ (~6.4 MB/s) · ดึงเบื้องหลังตอนสแปลชเริ่มเล่น (มีเวลานำ ~5 วิ) · ในรอบทดสอบ Pages วิดีโอ readyState=4 ก่อนถึงจุดตัด 4.9 วิ ทุกรอบ
- ไม่อยู่ใน preload วิกฤตของ H1 (ไม่อยู่ใน manifest/catalog; โหลดผ่าน JS ตอนสแปลช) · ไม่ได้รัน make-manifest.py

## สีเริ่มต้น / การเข้ากันของเฟรมสุดท้ายกับปก
- สีเฟรมแรกของวิดีโอ RGB (8,2,7) ≈ `#090407` ของ `#splash` (ต่าง 1–2 ระดับ มองไม่เห็น) — คำนวณ blend จาก `#090407` ใน ffmpeg
- เฟรมสุดท้ายเทียบ cover-v5 (ECC หาการเลื่อน/สเกลที่จอต่างๆ): ที่ viewport กว้าง ≥ 2.16:1 ตรงเป๊ะ · ที่ 1300×720 / 1920×1080 / มือถือแนวตั้ง วิดีโอ**ซูมใหญ่กว่าภาพนิ่ง ~1.5–2.5%** (เพราะวิดีโอ 1.836:1 กับปก 1.792:1 ถูก object-fit:cover ต่างกันตอนจอแคบกว่า) และรายละเอียดภาพต่างกันเล็กน้อย (AI เรนเดอร์ใหม่) → ใช้ **dissolve 0.5 วิ** (ข้ามเร็ว 0.3 วิ) แทนการปรับสเกล; ดูภาพ `lastframe-vs-cover-v5.png`, `browser-*-video-t11.5.png` เทียบ `browser-*-settled-cover.png`

## โค้ดที่เปลี่ยน (เล็กสุดที่ทำได้ ไม่แตะงานอื่น)
- `index.html`: CSS `.cover-vfx` (+ transition opacity, `.fading`), `#splash.dim`; `<video id="cover-vfx">` ตัด `loop` (ยัง `hidden`, `poster=cover-v5.webp`, `muted playsinline preload="none"`, ไม่มี `src` ใน HTML); cache-bust ui.js ต่อท้าย `-h5a` (token ปัจจุบัน `...-h1-g5-h5a`)
- `src/ui.js` (ส่วนหน้าปก/สแปลช): `prepareCoverVideo`, `handoffToCoverVideo`, `playCoverVideo`, `settleCover`, `skipCoverVideo`, `armStallWatch`, ค่าคงที่ `SPLASH_CUT=4.9`, `COVER_WAIT_MS=1500`, `COVER_STALL_MS=1800`; `startPlay()` ปล่อย src วิดีโอทิ้งเมื่อเข้าเกม
- `img/home-intro-v5.mp4` (ใหม่), `tests/h5a-cover-video.test.mjs` (ใหม่ 3 เทสต์)
- **จุดต่อ H5b (Codex เอฟเฟกต์บนปก):** วาง `<canvas>` ใน `#title` หลัง `#cover-vfx` และก่อน `.scrim` (z-order ปัจจุบัน art → video → scrim → เมนู) · เริ่มเอฟเฟกต์เมื่อได้ event `avegee:cover-settled` (บน `document`) หรือคลาส `.cover-settled` บน `#title` — ยิงตอนวิดีโอจบ/ข้าม/ล้มเหลว/reduced-motion (เกิดครั้งเดียว) · ถ้าอยากให้เอฟเฟกต์เริ่มพร้อมช่วงสุดท้ายของวิดีโอก็ทำได้ด้วย `#cover-vfx` event `ended`/เวลา

## กรณีขอบ (ทดสอบแล้ว Chrome, Playwright + Google Chrome จริง)
| กรณี | ผล |
|---|---|
| เล่นปกติ 1300×720 / 844×390 / 390×844 (localhost + Pages) | โลโก้ไฟ → มืด → สว่าง → รอยต่อเนียน → dissolve ปก ไม่มี exception; จบที่ ~12 วิหลังเริ่มวิดีโอ |
| กดข้ามสแปลช | ปกนิ่งทันที ยกเลิกดึงวิดีโอ (readyState 0) |
| แตะ/คลิกพื้นที่ปกระหว่างวิดีโอเล่น | dissolve 0.3 วิ เข้าปกนิ่ง (ปุ่ม/เมนูไม่ถือเป็นการข้าม) |
| `prefers-reduced-motion` | ปกนิ่งทันที ไม่โหลดวิดีโอ |
| ประหยัดดาต้า (`saveData`) | ปกนิ่งที่จุดตัด ไม่โหลดวิดีโอ |
| เน็ตช้า 150 KB/s (< บิตเรต) | สะดุดสั้นๆ แล้วเล่นต่อได้ จบปกปกติ |
| เน็ตช้ามาก 30 KB/s | สะดุดเกิน 1.8 วิ → dissolve เข้าปกนิ่งอัตโนมัติ ไม่ค้างจอดำ |
| iOS/Safari จริง | **ยังไม่ได้ทดสอบ** (ไม่มีเครื่อง) — ใช้ `muted playsinline` + `play()` หลังแตะ enter-gate; ถ้า autoplay ถูกปฏิเสธ → catch → ปกนิ่ง |

## ผลเทสต์
- `node --check src/ui.js` ผ่าน · `node --test tests/*.test.mjs` **624 ผ่าน / 0 ล้ม** (บนโค้ดที่ merge G5+H1 แล้ว) · เทสต์ G2 เดิม (video ต้อง hidden + poster v5 + ไม่มี src) ยังผ่านโดยไม่แก้
- 404 ในคอนโซลเป็นของเดิม (`audio/*.ogg` probe, `hero-yama-side.png`, favicon)

## วิธีตรวจ (Chris)
1. Chrome เปิด https://hellopae.github.io/AVEGEE/ (ใส่ `?x=1` กัน cache) ล้างข้อมูลเว็บถ้าเคยเปิดมา · รอหน้าโหลด → กด "เข้าเกม" (ถ้ามี) 
2. ดู: โลโก้ไฟ ~5 วิ → จอมืด → ยมบาทน้อยโผล่ค่อยสว่างขึ้น (ถึงปกติ ~2.2 วิ) → กล้องถอยเผยฉาก → จบเป็นปก ไม่กระโดด
3. ทดสอบแตะข้าม (บนปกระหว่างวิดีโอ) / ปุ่ม "ข้าม →" ตอนโลโก้ / ตั้ง OS ให้ลดการเคลื่อนไหว / ขนาดจอ 1300×720 และมือถือ 390×844 (หมุนแนวนอนตามเกม)
4. เกมใหม่/เล่นต่อทำงานปกติระหว่างและหลังวิดีโอ

## Rollback
`git revert 24b3a7d` (หรือ revert commit ของ H5a ใน main แล้ว push) — วิดีโอเดิม/สแปลชเดิมไม่ถูกแตะ จึงกลับไปเล่นสแปลช 19 วิ + ปกนิ่งตามเดิมได้ · ควรต่อท้าย token ui.js `-h5ar` กัน cache เก่า

## หลักฐานภาพ
`/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/h5a-evidence/` — seam-frames-94-99.png (รอยต่อ), fade-in-0-2.5s.png, lastframe-vs-cover-v5.png, browser-* (localhost), pages-* (Pages จริง)
(ลบภาพได้หลัง merge ตามกติกา เก็บ .md ไว้)
