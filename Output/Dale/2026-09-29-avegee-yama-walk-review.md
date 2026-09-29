# Dale review — AVEGEE: ยมทูตเดิน (hero walk sprite, Codex ของคุณเป้)

**ผล: FIX LIST — ยังไม่ commit/push (ค้างข้อ 3 บางส่วน + ต้องขอสิทธิ์เพิ่ม)**

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
