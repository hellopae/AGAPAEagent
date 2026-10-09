# ใบงาน F4 (Codex image): AVEGEE — วาดเฟรม 0 และ 7 ของท่าฟันดาบยมบาทใหม่ (asia / west / cyberhell) ให้หันขวา

Repo: `/Users/agapae/agapae-work/AVEGEE` · ฐาน = main ล่าสุด
แบบงานวาดที่เคยสำเร็จ: ใบ 30F/29G — ใช้ `prep()` ใน `scripts/prep-art.py` (ห้ามรัน main ที่เรียก make-manifest) · ลง manifest/preload ด้วยมือ · bump cache version
ที่มา: รายงาน Toby F2 `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-09-avegee-f2.md` (หัวข้อสเปกอาร์ต ข้อ 1)

## บริบท
หลังโจมตีธรรมดา (ฟันดาบ) ยมบาทต้องหันขวาเข้าหาศัตรู · โซน 1 (th) แก้ภาพแล้วใน v3 (commit ff35da7)
แต่แอตลาสฟันดาบชุด **asia / west / cyberhell** เฟรม 0 (ท่าเตรียม) และเฟรม 7 (ท่าคืนตัว) ยังวาดหันซ้าย
ตอนนี้ Toby ใช้ทางเลี่ยง `FRAME_FACING_FIX` ใน `src/yama-sword.js` (ใช้เฟรม 1 แทน 0, เฟรม 6 แทน 7) — ต้องการภาพจริงแทน

## ขอบเขต
1. วาดเฟรม 0 และ 7 ใหม่ของ 3 ชุด ให้ลำตัวและสายตาหันขวา ดาบชี้ขวาขึ้น เหมือนโซน 1 v3 · ชุด/ทรงผม/สี ตรงกับเฟรม 1–6 ของชุดเดียวกันทุกอย่าง
   - เฟรม 640×640 โปร่งใส · จุดเท้า (240,570) · ความสูงตัว asia 352 / west 346 / cyberhell 320 · เฟรม 1–6 ใช้ของเดิม (ห้ามแก้)
2. ประกอบเป็นแอตลาสใหม่ `img/yama-sword-v4/hero-yama-<style>-sword.webp` (ไม่เขียนทับไฟล์เดิม)
3. ชี้ `src/yama-sword-v2-assets.js` ไปไฟล์ใหม่ และลบแถวของชุดนั้นออกจาก `FRAME_FACING_FIX`
4. เทียบภาพเฟรม 0–7 ต่อกันเป็น filmstrip ให้เห็นว่าเคลื่อนไหวต่อเนื่อง ไม่มีเฟรมกระโดดขนาด/ตำแหน่ง

## ข้อห้าม
- ไม่เปลี่ยนเวลาท่า (580ms) / ดาเมจ / ตัวเลขสมดุล · ห้ามรัน `scripts/make-manifest.py` · ไม่แตะ `img/raw/`, `Exam/` · ไม่ commit ลง main ไม่ merge/push

## เกณฑ์รับงาน
1. filmstrip ก่อน/หลัง 3 ชุด + prompt ที่ใช้ ใน `output/Codex/f4/`
2. ในศึกจริง 1280×800: หลังฟันดาบยมบาทหันขวาทั้ง 4 ชุด
3. manifest/preload ครบ · cache bump · `node --test tests/*.test.mjs` ผ่าน · `node --check src/*.js`
