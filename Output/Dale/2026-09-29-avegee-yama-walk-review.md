# Dale review — AVEGEE: ยมทูตเดิน (hero walk sprite, Codex ของคุณเป้)

**ผลล่าสุด (29 ก.ย. 2569 รอบ 2): PASS — commit + push แล้ว** ดูหัวข้อ "อัปเดตรอบ 2" ท้ายไฟล์
รอบแรกด้านล่างคือ FIX LIST เดิมที่ค้างไว้ (เก็บไว้อ้างอิงว่าทำไมรอบแรกไม่ผ่าน)

---

**ผลรอบแรก: FIX LIST — ยังไม่ commit/push (ค้างข้อ 3 บางส่วน + ต้องขอสิทธิ์เพิ่ม)**

- งานอยู่ที่: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` — **ตรงใน working tree ของ main ยังไม่ commit** (ตามที่ระบุมา)
- ไฟล์ที่แก้: `src/art.js`, `src/scene.js`, `scripts/prep-art.py`, `img/manifest.json` + ภาพ untracked `img/hero-yama-walk.png`, `img/Asia/hero-yama-asia-walk.png`, `img/West/hero-yama-west-walk.png`, `img/CyberHell/hero-yama-cyberhell-walk.png`
- Screenshot อ้างอิง: `Output/Dale/screenshots/2026-09-29-avegee-yama-walk/`

## วิธีตรวจ
1. อ่านโค้ด `src/art.js` (`drawHeroWalk`, `POSE` regex เพิ่ม `walk`, `zoneStem`) และ `src/scene.js` (`heroWalkDistance`, จุดเรียก `drawHeroWalk` ก่อน fallback `drawStandee`) เทียบกับดีไซน์เดิมของท่าพิเศษอื่น (`-profile/-work/-atk/-side`)
2. รัน local server (`python3 -m http.server 8803`) แล้วเปิดด้วย Playwright (Chromium 1440×810) — ฉีดเซฟที่มีสถานีครบเหมือนรีวิว 18F, `outfit` ตรงกับ `zone` — คลิกจุดว่างไกลจากตัวละครเพื่อสั่งเดิน ถ่าย screenshot ทุก ~120ms ระหว่างเดิน
3. เช็ค network requests กรองด้วยคำว่า `hero-yama-walk` ว่าโหลดไฟล์ 200 ไม่ใช่ 404
4. รัน `node --test tests/*.test.mjs`

## ผลตามเกณฑ์

**1) เดินลื่น ไม่กระพริบ/สะดุด เท้าติดพื้น ท่าฟาดยังใช้ `hero-yama-atk` — ผ่าน**
Screenshot 4 เฟรมต่อกัน (`walk-1-start.png` → `walk-4-arrived.png`) ตัวละครเดินจากจุดเริ่ม (ใกล้บัลลังก์) ไปถึงจุดที่คลิกไว้ (มุมซ้ายบน ใกล้โลกันตนรก) ภายใน ~500ms ท่าทางระหว่างเดินต่างจากท่ายืนชัดเจน (ขาก้าว/แขนแกว่ง) เท้าอยู่บนพื้นสม่ำเสมอ ไม่มีอาการกระโดด/สะดุดที่เห็นได้ระหว่างเปลี่ยนสถานะยืน↔เดิน โค้ด `swingUntil` เช็คก่อน `drawHeroWalk` เสมอ (`if (!swinging && walking && drawHeroWalk(...))`) — ท่าฟาดจึงไม่ถูกสไปรท์เดินทับ ตรงตามที่ตั้งใจ

**2) โซนที่ใช้ชุดยมโซนนั้นได้สไปรท์เดินของโซนถูกตัว ไม่หยิบข้ามโซน / ไม่มีไฟล์ → ถอยท่ายืน — ผ่าน (อ่านโค้ดยืนยัน)**
`drawHeroWalk` เรียก `img('hero-yama-walk')` → `artUrl()` ใช้ `heroStyleOf() || zoneOf()` แล้ว map ผ่าน `zoneStem()` ซึ่งเป็นกลไกเดียวกับที่ `-profile/-work/-atk/-side` ใช้อยู่แล้วในโปรดักชัน (ผ่านการตรวจหลายรอบมาก่อน) — คีย์ `hero-yama-walk` (POSE regex เพิ่ม `walk` ใน `src/art.js` และ `scripts/prep-art.py` เรียบร้อย) จะได้ path `Asia/hero-yama-asia-walk.png` เป็นต้นเมื่ออยู่โซนบูรพา ไม่มีไฟล์ของโซนนั้น `artUrl` คืน `null` (ตาม logic เดิมบรรทัด 62-64) → `drawHeroWalk` เช็ค `if (!im || ...) return false` → `scene.js` ตกไปที่ `drawStandee(..., walking && !swinging)` ซึ่งเป็น 2-เฟรมกระเด้งเดิมที่มีอยู่แล้ว ไม่ใช่ภาพยืนนิ่งเฉย ๆ (ดีกว่าที่ใบงานขอด้วยซ้ำ) — ตรวจ request log จริงว่าไฟล์โซนไทยโหลด 200 (`http://localhost:8803/img/hero-yama-walk.png -> 200`)

**3) ขนาดไฟล์ไม่เกิน ~150KB/ไฟล์ — ทำสำเร็จเฉพาะไฟล์โซนไทย (1/4)**
- แก้ `scripts/prep-art.py`: เดิม `-walk` แค่ `shutil.copyfile` ต้นฉบับดิบตรง ๆ (2172×724, 0.9–1.3MB) → เปลี่ยนเป็นครอปทีละเฟรม (4 เฟรมเท่ากัน) ย่อแยกแต่ละเฟรมเหลือสูง 256px (กันสีเฟรมข้างเคียงเลือนเข้าหากันตอนย่อทั้งแถบทีเดียว) แล้วต่อกลับเป็นแถบเดิม + ลด palette แบบเดียวกับสไปรท์อื่น (`COLORS=96`, คง alpha เดิม)
- รันใหม่เฉพาะไฟล์โซนไทย → `img/hero-yama-walk.png`: **876KB → 112KB** ตรวจภาพด้วยตา (`hero-yama-walk-optimized-th.png`) คมชัด 4 เฟรมแยกกันชัดเจน ไม่มีสีเลือนข้ามเฟรม พื้นหลังโปร่งใสปกติ
- **`img/Asia/hero-yama-asia-walk.png`, `img/West/hero-yama-west-walk.png`, `img/CyberHell/hero-yama-cyberhell-walk.png` ยังเป็นไฟล์ดิบขนาดเดิม (1.1MB/1.3MB/1.1MB)** — พยายามรันคำสั่งเดียวกันซ้ำ (`python3 scripts/prep-art.py walk --all`) เพื่อให้ทำทั้ง 4 ไฟล์พร้อมกัน แต่ **ถูกระบบ sandbox permission ของ Claude Code ปฏิเสธคำสั่งซ้ำ 2 ครั้ง** ด้วยเหตุผล "Irreversible Local Destruction" (ไฟล์ภาพเหล่านี้เป็น untracked/ไม่มีใน git ยังไม่ commit — เขียนทับแล้วกู้คืนผ่าน git ไม่ได้ ระบบเลยกันไว้) — ไม่ได้พยายามหลีกเลี่ยงข้อจำกัดนี้ด้วยวิธีอื่นตามนโยบาย
  - **ทางแก้ที่เสนอ (เลือกอย่างใดอย่างหนึ่ง):**
    1. คุณเป้รันเองนอก sandbox: `cd "AVEGEE" && python3 scripts/prep-art.py walk --all` (โค้ด `prep-art.py` แก้เสร็จแล้ว พร้อมใช้ — filter `walk` ตรงเฉพาะ 4 ไฟล์นี้เท่านั้น ไม่กระทบไฟล์อื่น) แล้วให้ Dale ตรวจขนาด/ภาพอีกรอบก่อน push
    2. อนุมัติสิทธิ์เพิ่มให้ Dale รันคำสั่งนี้ในเซสชันถัดไป
    3. ส่งต่อให้ Codex ทำในโหมด `both` (worktree แยก) ซึ่งอาจไม่ชนกฎ sandbox เดียวกัน แล้ว Dale ตรวจ diff ตามปกติ

**4) เทสต์ผ่าน / ไม่มี alert-confirm-prompt — ผ่าน**
`node --test tests/*.test.mjs` → 58/58 ผ่าน (รันกับ working tree สถานะปัจจุบันที่มีการแก้นี้ค้างอยู่) ไม่มี `alert/confirm/prompt` ใหม่ในทั้ง 3 ไฟล์โค้ดที่แก้ (`art.js`, `scene.js`, `prep-art.py`)

**5) ป่าดาบ 18F ในโซน 2–4 ถูกไฟล์โซนทับหรือไม่ — รายงานตามที่ถาม**
ตรวจแล้ว: `img/West/st-dab-west.png`, `img/Asia/st-dab-asia.png`, `img/CyberHell/st-dab-cyberhell.png` เป็นไฟล์แยกที่**มีอยู่ก่อน 18F แล้ว** (ขนาด 512×512 เดิม ไม่ถูกแตะ) — โซน 2–4 **ไม่ได้ใช้ภาพป่าดาบใหม่จาก 18F เลย** ใช้ภาพรีสกินของตัวเองเหมือนเดิมทุกประการ (คนละไฟล์คนละคีย์ `st-dab-asia`/`st-dab-west`/`st-dab-cyberhell` vs `st-dab` ที่ 18F แก้) — ดูเหมือนความตั้งใจเดิมของระบบรีสกินตามโซน (ทุกสถานีมีภาพเฉพาะโซนอยู่แล้ว ไม่ใช่ fallback ไปใช้ภาพโซน 1) ไม่ใช่บั๊ก **ไม่ได้แก้อะไรเพิ่ม** ตามที่สั่งไว้ว่าไม่ต้องแก้ภาพโซนถ้าเป็นความตั้งใจ

## ทำไมไม่ push
ใบงานนี้ให้เกณฑ์รับงานข้อ 3 (ขนาดไฟล์) ไว้ชัดเจน และปัจจุบันทำสำเร็จแค่ 1 ใน 4 ไฟล์ (ไทย) ส่วนอีก 3 ไฟล์ (Asia/West/CyberHell) ยังหนัก 1.1–1.3MB ต่อไฟล์เท่าเดิม — ถ้า push ตอนนี้จะได้หน้าเว็บที่โหลดหนักขึ้น ~3.5MB เฉพาะสไปรท์เดินอย่างเดียว (ยังไม่รวมภาพอื่น) ทั้งที่โค้ด `prep-art.py` ที่แก้ไว้พร้อมทำให้เบาลงเหลือเท่าไทยได้ (~112KB) เพียงแต่รันคำสั่งไม่ผ่านสิทธิ์ sandbox ของเซสชันนี้ — เก็บสถานะไว้ตรงนี้ให้ชัด ไม่เดายิงคำสั่งซ้ำเรื่อย ๆ จนกว่าจะมีคนตัดสินใจตามทางแก้ 3 ข้อด้านบน

## หมายเหตุ
- ไม่ได้แตะ `CONCEPT.md`, `Exam/`, `files/`, `output/`, `img/scene-cyberhell.jpeg`, `img/st-dab-v2.png` ตามที่ห้ามไว้ (ทั้งหมดยังอยู่สถานะเดิมที่ค้างมาจากก่อนหน้านี้)
- `img/manifest.json` มีการเปลี่ยนแปลงเพิ่มเติมจากตอนที่ Codex แก้ไว้เดิม (แค่รายชื่อไฟล์ที่ prep-art.py แสดง ไม่ใช่เนื้อหาที่ผิดจากที่ตั้งใจ) — ตรวจแล้วว่ายังตรงกับ diff เดิมที่รายงานมา (+4 รายการ `hero-yama*-walk.png`) ไม่มีอะไรเกิน
- Repo ยังมี git status เดิมที่ยังไม่ commit (5 ไฟล์ tracked + untracked เดิม) — ตรงกับสถานะที่ 18F ทิ้งไว้ บวกกับการแก้ `scripts/prep-art.py` รอบนี้

---

## อัปเดตรอบ 2 (29 ก.ย. 2569) — PASS, commit + push แล้ว

**ผล: PASS — commit `46a2e53` → `origin/main`**

คุณเป้อนุมัติ "ทำได้เลย" — Claudy รัน `python3 scripts/prep-art.py asia-walk west-walk cyberhell-walk --all` นอกเซสชันนี้ให้ (ย่อ 3 ไฟล์ที่เหลือ) ก่อนส่งงานกลับมาให้ตรวจต่อ

### ยืนยันข้อ 3 (ขนาดไฟล์) ที่เป็น FIX LIST เดียวจากรอบแรก — ผ่านแล้ว
| ไฟล์ | ก่อน | หลัง |
|---|---|---|
| `img/hero-yama-walk.png` (ไทย) | 876KB | 112–115KB |
| `img/Asia/hero-yama-asia-walk.png` | 1.1MB | 134KB |
| `img/West/hero-yama-west-walk.png` | 1.3MB | 160KB |
| `img/CyberHell/hero-yama-cyberhell-walk.png` | 1.1MB | 159KB |

ทั้ง 4 ไฟล์ 768×256 ตรวจภาพด้วยตา (`spritesheet-{th,asia,west,cyberhell}.png` ใน screenshots) — 4 เฟรมคมชัด แยกกันชัดเจน ไม่มีสีเลือนข้ามเฟรม ชุดตรงกับโซน (ไทย/บูรพา/ปัจฉิม/ไซเบอร์)

### ตรวจซ้ำทุกข้อในเกณฑ์รับงานด้วย Playwright จริง (ไม่ใช่แค่อ่านโค้ด)
เปิดเกม 1440×810 ทั้ง 4 โซน (`th/asia/west/cyberhell`) ฉีดเซฟที่มีสถานีครบ + `taught` ครบทุกบท (กันโมดัลสอนเล่นบัง) เรียก `window.G.walkTo(x,y)` ตรง ๆ แล้วอ่านตำแหน่งจริง `window.G.player.{x,y,face}` **ก่อน**ถ่าย screenshot ทุกเฟรม (~70ms/เฟรม) เพื่อครอปภาพให้ตามตัวละครแม่นยำ:

1. **เดินลื่น เท้าติดพื้น ขนาดไม่เปลี่ยน — ผ่าน** `th-walk-right-cycle.png`/`th-walk-left-cycle.png` (ครอปตามตำแหน่งจริงทีละเฟรม) แสดงวงแหวนเลือก (selection ring = พื้นที่ยืน) อยู่ตำแหน่งเดียวกับเท้าทุกเฟรม ขนาดตัวละครเท่ากันทุกเฟรม ไม่มีการกระโดด/สะดุด
2. **หันซ้าย-ขวาถูก — ผ่าน** `walkTo(x+900,y)` → `face:1` (มองขวา), `walkTo(x-900,y)` → `face:-1` (มองซ้าย) สไปรท์กลับด้านถูกทิศทุกเฟรม (เทียบ `th-walk-right-cycle.png` vs `th-walk-left-cycle.png`)
3. **ยมใส่ชุดของโซนนั้น — ผ่าน** `asia-walk-right-cycle.png` (ชุดกิโมโนอาซีย) · `west-walk-right-cycle.png` (ชุดไวกิ้งขนสัตว์) · `cyberhell-walk-right-cycle.png` (ชุดไซเบอร์เข้ม) — ทั้ง 3 โซนโหลดสไปรท์เดินของตัวเอง ไม่ใช่ของโซนไทย
4. **สลับยืน↔เดินไม่กระโดด — ผ่าน** หยุดเดินแล้วถ่าย `th-idle-after-walk.png` — กลับเป็นท่ายืนถือคัมภีร์ปกติ ตำแหน่ง/ขนาดต่อเนื่องกับเฟรมเดินสุดท้าย ไม่มีการเปลี่ยนขนาด/กระตุก
5. **ท่าฟาดยังใช้ `hero-yama-atk` แม้กำลังเดิน — ผ่าน** ตั้ง `g.swingUntil` พร้อมสั่ง `walkTo` พร้อมกัน (จำลองกดฟาดระหว่างเดิน) → `th-atk-pose-while-walking-flag.png` แสดงท่าฟาด (แขนเหวี่ยง) ไม่ใช่ท่าเดิน ยืนยันโค้ด `if (!swinging && walking && drawHeroWalk(...)) return;` ทำงานถูกต้องจริงในเบราว์เซอร์ ไม่ใช่แค่อ่านโค้ดเฉย ๆ
6. **`node --test tests/*.test.mjs` — ผ่าน** 58/58 (รันซ้ำ 2 รอบ ครั้งแรกมีเทสต์ 1 ตัวไทม์เอาต์-เซนซิทีฟ `combat-power.test.mjs` ที่รู้จักอยู่แล้วว่าไม่เกี่ยวกับ diff ชุดนี้ — รันเดี่ยวผ่าน)
7. ไม่มี error ใน `page.on('pageerror', ...)` ทั้ง 4 โซนระหว่างทดสอบทั้งหมด

### Commit + push
- แยก `manifest.json` เฉพาะ hunk รายการ `-walk.png` (4 บรรทัด: `hero-yama-walk.png`, `Asia/hero-yama-asia-walk.png`, `CyberHell/hero-yama-cyberhell-walk.png`, `West/hero-yama-west-walk.png`) ด้วยวิธีเดียวกับรอบ st-dab — รัน `make-manifest.py` เทียบ JSON กับ HEAD ยืนยันว่าของที่ต้อง insert มีแค่ 4 บรรทัดนี้ ส่วนที่เหลือ (ui icons, `scene-v2.png`, `st-dab-v2.png`, `Boss ZoneN-cutscene.jpeg`) เป็นงานค้างอื่นที่ไม่ใช่ของชุดนี้ ไม่ commit
- Commit `46a2e53`: `src/art.js`, `src/scene.js`, `scripts/prep-art.py`, `img/hero-yama-walk.png`, `img/{Asia,West,CyberHell}/hero-yama-*-walk.png`, `img/manifest.json` (เฉพาะ 4 บรรทัด) — **ไม่แตะ** `CONCEPT.md`, `img/st-dab-v2.png`, `img/scene-cyberhell.jpeg`, `Exam/`, `files/`, `output/`
- Push → `origin/main` สำเร็จ
- ตรวจ Pages จริง: `img/manifest.json` มีรายการ `hero-yama-walk.png` ครบ, ไฟล์ทั้ง 4 ตอบ `200` ขนาดตรงกับที่ build เป๊ะ (`hero-yama-walk.png` 114,814B · `Asia` 133,906B · `West` 160,411B · `CyberHell` 159,077B) `last-modified` ขยับตามเวลา push

### Rollback
```
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
git revert 46a2e53
git push origin main
```

### หมายเหตุ
- `CONCEPT.md` ยังมีงานแก้ไข "ตัดแนวคิดลงทัณฑ์เอง" ค้างอยู่ใน working tree เหมือนเดิม (ไม่เกี่ยวกับชุดนี้ ไม่ได้แตะ)
- Screenshot ทั้งหมด (รอบ 1 + รอบ 2): `Output/Dale/screenshots/2026-09-29-avegee-yama-walk/`
