# ใบงาน G3c (Codex image): AVEGEE — วาดอาวุธรางวัลชายแดน: คัตซีน 4 + ไอคอน 4 + สไปรท์ฟันอาวุธใหม่

Repo: `/Users/agapae/agapae-work/AVEGEE` · ฐาน = main ล่าสุด (origin/main ≥ 9d04ffa)
แบบงานวาดที่เคยสำเร็จ: F4 (`img/yama-sword-v4/`) และ 30F — ใช้ `prep()` ใน `scripts/prep-art.py` (ห้ามรัน main ที่เรียก make-manifest) · ลง manifest/preload ด้วยมือ

## ข้อมูลออกแบบ (แหล่งความจริง)
`/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Minnie/2026-10-09-avegee-frontier-weapons.md`
- หัวข้อ 1–4 ข้อ "รูปลักษณ์สำหรับวาด" + "คัตซีนรับอาวุธ" (มีไฟล์อ้างอิงบอส/ฉากหลัง/Yama)
- **หัวข้อ 9 "ข้อห้ามภาพ" บังคับทุกชิ้น** — โดยเฉพาะโซน 1 (ไม่มีพระมหาพิชัยมงกุฎ/ธารพระกร/พัด/แส้/พระพุทธรูป/เจดีย์/ใบเสมา/พระภิกษุ/ยักษ์วัดจริง) และโซน 3 (ไม่เลียน Béla Lugosi)

## ขอบเขตของ run นี้: **ชุด B-cyberhell เท่านั้น: สไปรท์ฟันของอาวุธโซน cyberhell × 4 ชุดยมบาท (th/asia/west/cyberhell)**
- **ชุด A (คัตซีน + ไอคอน):** คัตซีนรับอาวุธ 16:9 ไม่มีตัวหนังสือ 4 ภาพ สไตล์เดียวกับคัตซีนล่าสุดของเกม + ไอคอนอาวุธจัตุรัสพื้นใส 4 ภาพ (สไตล์ไอคอนไอเท็มในกระเป๋า)
- **ชุด B-<อาวุธ> (สไปรท์ฟัน):** อาวุธ 1 เล่ม × 4 ชุดยมบาท (th / asia / west / cyberhell) = 4 แอตลาส 8 เฟรม
  ใช้แอตลาสฟันดาบปัจจุบันของแต่ละชุดเป็นฐาน (`img/yama-sword-v4/` และของ th ใน v3) — **เปลี่ยนเฉพาะตัวอาวุธ** ตัวละคร ท่า จุดเท้า ขนาดเฟรม เหมือนเดิมทุกพิกเซลนอกตัวอาวุธเท่าที่ทำได้ · หันขวาทุกเฟรม · ความยาวอาวุธ ±15% ของดาบเดิม
- **ชื่อไฟล์ (ล็อกแล้วจากรายงาน Toby G3b — ห้ามใช้ชื่ออื่น เกมหยิบไฟล์ตามชื่อนี้เอง):**
  - รหัสอาวุธ: th=`fang` · asia=`chain` · west=`cane` · cyberhell=`trojan`
  - สไปรท์ฟัน: `img/yama-sword-weapons/hero-yama-<outfit>-sword-<weapon>.webp` (outfit = th/asia/west/cyberhell) · 5120×640 = 8 เฟรม 640×640 พื้นใส หันขวา · จุดเท้า (240,570) · ความสูงลำตัว th 355 / asia 352 / west 346 / cyberhell 320
  - ไอคอน: `img/weapons/weapon-icon-<weapon>.png` 512×512 พื้นใส
  - คัตซีน: `img/weapons/weapon-cutscene-<weapon>.jpeg` 1375×768 ไม่มีตัวอักษร
  - สเปกเต็ม: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-09-avegee-g3b.md`
- ลง manifest/preload ด้วยมือ · **ไม่ต้องต่อโค้ด** (Toby ทำระบบใน G3b)

## ข้อห้าม
- ห้ามรัน `scripts/make-manifest.py` · ไม่แตะ `img/raw/`, `Exam/` · ไม่ commit ลง main ไม่ merge/push · ไม่เขียนทับไฟล์ภาพเดิม

## เกณฑ์รับงาน
1. ภาพครบตามชุดของ run นี้ + prompt + filmstrip (ชุด B) ใน `output/Codex/g3c/`
2. ผ่านข้อห้ามภาพหัวข้อ 9 (เขียน checklist ยืนยันทีละข้อในรายงาน)
3. ชุด B: เฟรม 0–7 ต่อเนื่อง ไม่มีขนาด/ตำแหน่งกระโดด หันขวาทุกเฟรม
4. manifest/preload ครบ · `node --test tests/*.test.mjs` ผ่าน
