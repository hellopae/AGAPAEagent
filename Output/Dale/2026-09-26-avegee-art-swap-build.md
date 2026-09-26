# AVEGEE — สลับปก + ฉากโซนบูรพาใหม่ (ชุด 14 ข้อ D1/D2) — build note

**อนุมัติ:** คุณเป้ 26 ก.ย. 2569 ("เปลี่ยนในเกมได้เลยครับ") บันทึกใน
`Output/Kittanate-source/2026-09-26-avegee-requests.md` ข้อเพิ่มเติม 1, 3, 4
**Repo:** `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`
**Commits:** `7eacaa9` (D1 ปก) → `316e30e` (D2 ฉากบูรพา) — push ขึ้น `origin/main` แล้วทั้งคู่
**พื้นหลัง:** Toby ทำ D1/D2 ไม่ได้ในรอบก่อน เพราะไฟล์ต้นทาง (`img/cover2.png`,
`img/ChatGPT Image Sep 26, 2026, 11_43_18 AM.png`) อยู่ในรายการ "ห้ามแตะ" ของใบงานเดิม —
สิทธิ์ Dale กว้างกว่าจึงมาทำต่อ (ไม่ใช่เลี่ยง permission แต่ทำตามที่ Claudy สั่งเพิ่มเจาะจงรอบนี้)

---

## สิ่งที่เปลี่ยน

### D1 — ปกเกม
- `img/cover2.png` (2.5 MB, เจ้าของอัปเดตเป็น "version3" 26 ก.ย. ~15:00 — ยักษ์สองตัวสัดส่วน
  ใกล้เคียงกันแล้วตามที่สั่ง) → แปลง resize (1376×768) + WEBP quality=82 method=6
  (วิธีเดียวกับตอนแปลง cover.webp เดิมใน commit `0c4a08f`) → ไฟล์ใหม่ **`img/cover-v3.webp`**
  (207,084 ไบต์)
- `src/ui.js` `buildTitle()` → `probeCover()` ลอง `img/cover-v3.webp` ก่อนเสมอ ไม่มีค่อยถอย
  `img/cover.webp` (ปกเวอร์ชัน 2 เดิม) แล้ว `img/cover.png` ตามลำดับเดิม
- `img/manifest.json` (critical) เพิ่ม `cover-v3.webp`
- `index.html` แก้คอมเมนต์ที่อ้างชื่อไฟล์ปกให้ตรงของจริง (ไม่กระทบพฤติกรรม)
- **ไม่แตะ** `img/cover.webp`, `img/cover-v1.webp`, `img/cover2.png` เดิม — ของเก่ายังอยู่ครบ

### D2 — ฉากโซนบูรพา (asia)
- `img/ChatGPT Image Sep 26, 2026, 11_43_18 AM.png` (1848×851) = ฉากใหม่ที่เจ้าของ gen มา
  26 ก.ย. ~11:43 — เทียบกับ `img/scene-asia.png` เดิม (1527×704) แล้วองค์ประกอบ (รูปปั้น/สะพาน/
  ลาวา/ศาลา/แท่น) ตรงตำแหน่งเดียวกันทุกจุด (Toby วัดไว้ต่างกัน 0.04%) → **แค่ resize ตรง ๆ
  ไม่ต้องวางผังใหม่**
- แปลง resize (1527×704) + `quantize(colors=256, dither=None)` (วิธีเดียวกับที่
  `scripts/prep-art.py` ใช้กับไฟล์ `scene-*.png` อื่น) → ไฟล์ใหม่ **`img/scene-asia-v2.png`**
  (687,961 ไบต์ ใกล้เคียงของเดิม 671 KB)
- `src/data.js` — `ZONES` รายการ `k:'asia'` เปลี่ยน `scene:'scene-asia'` → `scene:'scene-asia-v2'`
  (โซนบูรพาใช้ path นี้ตรง ๆ ผ่าน `img(zk)` ใน `src/scene.js` — ไม่ผ่านระบบโฟลเดอร์ `img/Asia/`
  เพราะไฟล์ scene ของโซนนี้ไม่เคยอยู่ในโฟลเดอร์ย่อยนั้นตั้งแต่แรก)
- `img/manifest.json` (rest) เพิ่ม `scene-asia-v2.png`
- สำเนาไฟล์ต้นฉบับ ChatGPT ไปไว้ที่ `img/raw/Asia/scene-asia-v2-source.png` (คัดลอก ไม่ย้าย —
  `img/raw/` ไม่ผ่าน git อยู่แล้ว) เผื่อใครทำต่อ
- **ไม่แตะ** `img/scene-asia.png` เดิม — ยังอยู่ครบ, ไฟล์ต้นฉบับ `img/ChatGPT Image...png`
  ปล่อยไว้ให้คุณเป้ลบเอง (ไม่ลบให้ ตามที่ใบงานสั่ง)

---

## ทดสอบแล้ว

- `node --test tests/*.test.mjs` → **37/37 ผ่าน**
- Playwright บน Chromium จริง ที่ **1440×900** และ **390×844**:
  - หน้าเมนู (title screen) ขึ้นปกใหม่ถูกต้อง (ยักษ์สองตัวสัดส่วนใกล้เคียงกัน) ทั้งสองขนาดจอ
  - เข้าโซนบูรพาจริง (ผ่าน `window.G.zone='asia'` + ปิด intro dialog) เห็นฉากใหม่: ศาลา/แท่น/
    สะพาน/แม่น้ำลาวา/อาคารกระทะทองแดง (ขวา) วางตำแหน่งถูกต้อง ไม่ลอย ไม่ทับกัน
  - เดินจริงด้วยคลิกเมาส์บน canvas → พิกัดผู้เล่นเปลี่ยนจริง (`{x:860,y:396}` → `{x:652,y:554}`)
    ตัวละครยืนบนพื้นถูกจุดหลังเดิน ไม่ลอย/ไม่จมพื้น
  - console: มี 404 เดิมที่ไม่เกี่ยวกับงานนี้เท่านั้น (`img/hero-yama-side.png`,
    `audio/bgm-title.ogg`, `audio/bgm-zone.ogg` — ไฟล์เหล่านี้ไม่มีอยู่แล้วตั้งแต่ก่อนแก้
    ยืนยันด้วยการเช็ค `ls` ตรง ๆ) — **ไม่มี 404 ใหม่จากไฟล์ปก/ฉากที่เพิ่ม**
- ภาพก่อน/หลังเก็บไว้ที่
  `Output/Dale/assets/2026-09-26-avegee-art-swap/` (before-cover-v2.jpg, after-cover-1440.jpg,
  after-cover-390x844.jpg, before-scene-asia.jpg, after-scene-asia-1440.jpg,
  after-scene-asia-390x844.jpg, after-scene-asia-walk-1440.jpg)

---

## Live / วิธี verify เอง

ไม่มี deploy สาธารณะ (AVEGEE รันเป็นเกม local ผ่าน `./launch.sh` → `http://localhost:8777`)

```bash
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
./launch.sh                       # เปิด http://localhost:8777
```
1. หน้าเมนู — ต้องเห็นปกใหม่ (ยักษ์สองตัวสัดส่วนพอกัน ไม่มีตัวไหนตกขอบ)
2. กด "เริ่มเกมใหม่" → ข้ามบทนำ → เดินไปโซนบูรพา (ต้องปราบบอสโซน 1 ก่อนถึงจะย้ายได้ตามปกติ
   หรือใช้ `window.G.zone='asia'` ใน console เพื่อดูฉากลัด) → ต้องเห็นฉากใหม่ อาคาร/แท่น/สะพาน
   วางตรงตำแหน่งเดิม เดินได้ปกติ ไม่มี NPC/อาคารลอย

## Rollback

```bash
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
git revert 316e30e 7eacaa9 --no-edit   # หรือ revert ทีละคอมมิตถ้าจะคืนแค่ D1 หรือ D2 อย่างเดียว
git push origin main
```
ไฟล์เดิม (`cover.webp`, `scene-asia.png`) ไม่เคยถูกลบ — revert แค่คืนค่า `data.js`/`ui.js`/
`manifest.json` ให้ชี้กลับไปไฟล์เดิม เกมกลับไปใช้ปก/ฉากก่อนหน้าทันที ไม่ต้องกู้ไฟล์ภาพเพิ่ม

---

## ที่ Chris ควร QA ต่อ (ถ้าจะขาย/เผยแพร่)

- งานนี้เป็น asset-swap ล้วน ไม่แตะ gameplay/ข้อความ — ตาม review-mode ปัจจุบัน (`build`) ไม่ผ่าน
  Reese/Chris (โค้ด/asset ภายใน ไม่ใช่งานขาย) แต่ถ้าจะ ship จริงแนะนำให้ Chris เช็คภาพปกที่ขนาด
  จอเล็กสุดที่รองรับ (มือถือแนวตั้งแคบกว่า 390px) อีกครั้ง เพราะยังไม่ได้ทดสอบ 360×740 รอบนี้
  (รอบ Playwright นี้ทำแค่ 1440/390 ตามที่ใบงานนี้ระบุ)
