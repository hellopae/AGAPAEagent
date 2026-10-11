# ใบงาน: AVEGEE — ท่าโจมตีด้วยสกิล (atk) ชุดปัจฉิม + ไซเบอร์เฮลล์

- วันที่: 11 ต.ค. 2569 · ผู้ทำ: Codex (`--write`) · ผู้ตรวจ: Dale
- ฐาน: `toby/west-hit` (`9cea49e`) — มีทะเบียนทิศ `POSE_DRAWN_FACING_RIGHT` ใน `src/battle-facing.js` แล้ว

## บริบท
ชุดไทย (th) และบูรพา (asia) มีท่าโจมตีด้วยสกิล `img/hero-yama-atk.png` / `img/Asia/hero-yama-asia-atk.png`
(ท่ายกกำปั้นข้างหนึ่ง อีกมือยื่นไปข้างหน้า — ดู `img/hero-yama-atk.png`) แต่ชุดปัจฉิม (west) และไซเบอร์เฮลล์ (cyberhell)
ไม่มีไฟล์ท่านี้ ตอนใช้สกิลที่ไม่ใช่ฟันดาบ (เช่นลูกไฟ) เกมจึงถอยไปโชว์ท่ายืน คุณเป้สั่ง "วาดเพิ่มเลย"
(รายละเอียดจาก Toby: `AGAPAE Agent/Output/Toby/2026-10-10-avegee-west-hit.md` หัวข้อ "สเปกอาร์ตที่ต้องการเพิ่ม")

## ขอบเขต
1. วาด 2 ไฟล์ **512×512 PNG พื้นโปร่งใส** pixel art:
   - `img/West/hero-yama-west-atk.png` — ยมฯ ในชุดปัจฉิม
   - `img/CyberHell/hero-yama-cyberhell-atk.png` — ยมฯ ในชุดไซเบอร์เฮลล์
   - **ท่าเดียวกับ `img/hero-yama-atk.png`** (ยกกำปั้น + ยื่นมือร่ายพลัง) แต่เป็นชุด/หน้าตาของแต่ละโซน — อ้างอิงเครื่องแต่งกายจาก
     `img/West/hero-yama-west-atk-R.png`, `hero-yama-west.png` และ `img/CyberHell/hero-yama-cyberhell-atk-R.png`, `hero-yama-cyberhell.png`
   - **หันขวา** · สเกลตัว ตำแหน่งเท้า และขอบว่างเท่าไฟล์ th/asia (วางเทียบแล้วไม่กระโดด)
2. ต่อสาย: เพิ่มใน `img/manifest.json` · ให้ `heroAtk()`/`artUrl('hero-yama-atk')` คืนไฟล์ใหม่ในโซน 3–4 ·
   ขึ้นทะเบียน `'hero-yama-west-atk'`, `'hero-yama-cyberhell-atk'` ใน `POSE_DRAWN_FACING_RIGHT` · preload tier เดียวกับท่า atk โซน 1–2
3. เทสต์: เพิ่มใน `tests/west-hit-facing.test.mjs` หรือไฟล์ใหม่ — ไฟล์มีจริง 512×512, อยู่ใน manifest, โซน 3–4 ใช้สกิลแล้วได้ไฟล์ atk ใหม่ และหันขวา
4. cache-bust ต่อท้าย `-skillatk` (ห้ามตัดของเดิม)

## ข้อห้าม
- ห้ามแก้ไฟล์ภาพเดิม · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ห้าม commit/merge/push (Dale ทำ)

## เกณฑ์รับงาน
1. 2 ไฟล์ 512×512 RGBA มุมโปร่งใส หันขวา ชุดถูกต้องตามโซน
2. ภาพเทียบ 4 ชุดเรียงกัน (th / asia / west / cyberhell atk) ดูเป็นชุดเดียวกัน
3. `node --test tests/*.test.mjs` ผ่านหมด
4. รายงาน: ไฟล์ที่แก้ + ภาพอ้างอิงที่ใช้ + path ภาพเทียบ
