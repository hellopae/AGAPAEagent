# AVEGEE — รวม G3c-A (ภาพอาวุธ) + G5 (ห้องกระทะทองแดง) · 10 ต.ค. 2569

Live: https://hellopae.github.io/AVEGEE/ · push main `9d04ffa..9f54605` · Pages built ที่ `9f54605`

## ผลตัดสิน
- **G3c-A: PASS** รวมแล้ว commit `6eb32e5` (ขึ้น origin ไปกับ merge ของ Dale อีกคน)
- **G5: PASS (รวมแล้ว หลัง Dale แก้ 3 ข้อเล็ก)** commit `862d93c` → merge origin/main (G2b) `96a365d` → merge origin/main (H1) `9f54605`

## G3c-A
- เอา `img/weapons/weapon-cutscene-{fang,chain,cane,trojan}.jpeg` + `weapon-icon-{...}.png` + รายการ manifest/preload (เพิ่มบนไฟล์ล่าสุด) · ไม่เอา `output/Codex/g3c/`
- cache-bust ต่อท้าย `-g3ca` (preload.js CATALOG_VERSION, art.js manifest)
- Chrome: คัตซีนทั้ง 4 แสดงภาพจริง (naturalWidth 1375) ไม่ใช่ placeholder · ไอคอน 4 เล่มในกระเป๋า/การ์ดอาวุธโหลดจริง (512px)

## G5 — รีวิวตามเกณฑ์ 1–6
1. พื้นที่เดิน: polygon ครอบพื้นลานสว่าง+พรม · เดินจริงใน Chrome 10 จุด (กลาง/ซ้าย/ขวา/พรม/แท่นกระทะ/ราว/บันได/ไห/เตา/นอกพรม) ทุกจุดจบในพื้นที่เดินได้ ตำแหน่งต้องห้ามถูก snap เข้าขอบ · ภาพ overlay ใน `g5-1300x720-walkpoly.png` · ขอบบนยืนชิดฐานราวพอดี (ยอมรับ)
2. เร่งไฟ: ไม่มีวิญญาณ = กดไม่ได้ + เหตุผล "ต้องมีวิญญาณกำลังลงทัณฑ์ในกระทะ" · กดถูก 0→200/1000 (ลด 20%) · พลาดไม่เปลี่ยน · MP ไม่ลด · คูลดาวน์ ~19 วิ แสดง "พักปุ่ม 20 วินาที" · หมดแล้วกดได้อีก
3. ฝึกควบคุมไฟ: เลือกยมบาท/ยมทูตเพลิง · close-up + วงขาวหดเข้าวงเขียว · ถูก 5/5 → ระดับ +1 (ลูกไฟ 40→42) · พลาด 3 จบ ไม่เสีย · พักฝึกคนละ 5 นาที (ปุ่มยมบาท disabled หลังฝึก) · เซฟมี fireControl · เซฟเก่า = 0 (เทสต์)
4. ภาพ+prompt+สมดุล: ครบ ใน `output/Codex/g5/` (เอา balance.mjs, balance-results.json, prompts.md, report.md เข้า main เพราะเทสต์อ้างถึง) · สมดุลจำลอง max +1 จุด%
5. `node --check src/*.js` ผ่าน · `node --test tests/*.test.mjs` **621/621** ผ่าน (รวม g5 9 ข้อ + h1)
6. TH+EN ใน i18n (เทสต์ตรวจ)

### บั๊กที่ Codex ไม่ได้เห็น (ไม่ได้เล่นใน Chrome) — Dale แก้เอง
1. **แถบจังหวะเร่งไฟยุบเหลือสูง 2px** (เห็นแต่เส้นบาง ไม่เห็นโซนเขียว/เข็ม) เพราะ flex shrink ใน `.g5-stoke .g5-content{flex:0}` → แก้ `flex:0 0 auto` + `.g5-bar{flex:0 0 22px}` + `.g5-content p{flex:none}` (index.html)
2. **วงขาว/เขียวของฝึกไฟเป็นวงรี** (img inline เพิ่มช่องว่าง 9px) → `.g5-orb img{display:block}`
3. **จอ 844×390 ห้องสูงกว่าจอ** (ห้องกว้างต้องเลื่อน) ทำให้ยมบาท/กระทะอยู่ใต้ขอบจอระหว่างเร่งไฟ → `openKrata()` เรียก `#st-cv.scrollIntoView({block:'center'})` (ui.js 1 บรรทัด)

### ข้อสังเกตไม่บล็อก
- ข้อความเหตุผลของปุ่มเร่งไฟที่ถูกปิด อ่านยากเล็กน้อยเมื่อทับแสงไฟกระทะ (844×390)
- ปุ่มส่งลูกไฟสูง 40px (ตั้งใจ min 44px) — ไม่กระทบการกด
- `ui.js` import `game.js`/`room.js`/`i18n.js` แบบไม่มี `?v=` (แบบเดิมของโปรเจกต์) → ผู้เล่นที่เคยโหลดเกมอาจได้ไฟล์เก่าจากแคชสูงสุด ~10 นาที (GitHub Pages) ถ้า error ให้ hard refresh

## การรวมกับ origin/main
- ชน 2 รอบ (G2b cover-v5, H1 preload 3 ชั้น) แก้โดยต่อท้าย suffix ทุกอัน: preload.js `...-g3ca-g2b-cover-v5-h1-g5` · index.html `preload.js?v=h1-g5`, `ui.js?v=...-g2-g2b-cover-v5-h1-g5` · art.js manifest `...-g3ca-g2b-cover-v5-g5`
- ภาพ G5 ใส่ชั้นโหลดเบื้องหลัง H1: เพิ่มกฎ `[1,4,/^img\/krata-minigame\//]` ใน `src/asset-preload.js` ก่อนกฎ cutscene (ตรวจ assetTier แล้ว tier 1) · ภาพอาวุธ: คัตซีน = late (กฎ cutscene เดิม) ไอคอน = background
- manifest/preload-catalog เก็บทั้ง weapons, krata-minigame และ cover-v5

## ตรวจบน Pages จริง (`https://hellopae.github.io/AVEGEE/`)
- `index.html` เสิร์ฟ `preload.js?v=h1-g5`, `ui.js?v=...-h1-g5` · `src/krata-control.js`, `src/minigames/krata-qte.js`, `img/krata-minigame/fireball.png`, `img/weapons/*` = 200
- Chrome (Playwright) บน Pages: 844×390 เร่งไฟถูก 0→200/1000 · 390×844 ฝึกยมบาท 5/5 ระดับ +1 ลูกไฟ 42 · ไม่มี exception (404 เดิม hero-yama-side.png/audio เท่านั้น)

## วิธีตรวจสำหรับ Chris
1. เกมใหม่ → ปิดบทนำ → (Console) `G.coin=5000;G.hire('plerng')` → เดินไปสถานีกระทะทองแดง กด "เข้าไป"
2. ไม่มีวิญญาณ: "เร่งไฟ" จาง + เหตุผล · ใส่วิญญาณ (ส่งสำนวนเข้ากระทะ) → "เร่งไฟ" กดได้ → ยมบาทเดินไปหน้ากระทะ → กด "ลูกไฟ" ตอนเข็มแดงอยู่ในโซนเขียว → เวลาลด 20%
3. "ฝึกควบคุมไฟ" (เหนือยมทูตเพลิง) → เลือกผู้ฝึก → กดตอนวงขาวทับวงเขียว 5 ครั้ง
4. ทดสอบที่ 844×390 และ 390×844

## ย้อนกลับ
`git revert -m 1` ไม่ใช้ (ไม่ใช่ merge commit แบบ --no-ff) — ย้อน G5: `git revert 9f54605 96a365d 862d93c` (ตามลำดับ) แล้ว push · ย้อน G3c-A: `git revert 6eb32e5` · ห้าม force push

## หลักฐาน
`Output/Dale/g5-evidence/` (ภาพเล่นจริง 844×390 / 390×844 / desktop; ลบได้หลัง merge)
