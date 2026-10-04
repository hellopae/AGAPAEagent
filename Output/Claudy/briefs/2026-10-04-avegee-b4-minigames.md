# ใบงาน B4 (Codex): AVEGEE — ระบบ minigame ฝึกยมทูต + 3 เกมแรก (ดาบ / ยกหิน / เร่งไฟ)

Repo: `/Users/agapae/agapae-work/AVEGEE` · ฐาน = main ล่าสุด (มี B1 roster) · เทสต์ `node --test tests/*.test.mjs`
**แบบ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Astra/2026-10-04-avegee-30g0-design.md` หัวข้อ 3 (framework + สเปก) และใบ G3 ในหัวข้อ 5** · ลำดับ 4–5 ใน `.../2026-10-04-avegee-30g0b-battle-design.md`
คำตัดสินคุณเป้ (ท้าย `.../Output/Claudy/briefs/2026-10-04-avegee-30-plan.md`): ระดับฝึกแยกโซน · **st-lan ยกหิน: เลือก ทัณฑ์ หรือ Guard 1 ตัวก่อนเล่น** · **st-dab ฟันดาบ: เพิ่มเฉพาะโจมตีปกติของยมบาท** · lan ฝึกคนที่เลือก **แยกจากขั้นเร่งสถานีเดิม** (`station.speedLv`)

## ขอบเขต
1. Framework `src/training.js` + `src/minigames/training/` (host/registry): เปิดจากสถานี (ใช้ lock ห้องของ `room.js` เดิม) · เลือกผู้ฝึก · คะแนน → EXP → ระดับ (ผูก roster ID, แยกโซน) · จำกัดครั้ง/คูลดาวน์กันฟาร์ม · ปิดกลางคัน/โหลดใหม่ไม่ให้ผลซ้ำ ไม่คืนโควตา · timer cleanup · pause ของเกม (30C) หยุด minigame ได้
2. เกม 3 ตัว (20–60 วินาที เมาส์+แตะได้):
   - **st-dab ฝึกฟันดาบ → ยมบาท** (เพิ่มโจมตีปกติเท่านั้น)
   - **st-lan / st-lokan ยกก้อนหิน** (กลไกเดียวกัน) → lan: ทัณฑ์หรือ Guard (เลือกก่อน) · lokan: Guard
   - **st-krata เร่งไฟ → เพลิง**
3. ผลฝึกต่อสู้ใช้ค่าจาก progression (ถ้า B3 ยังไม่ merge ให้ทำ hook ที่ B3 ต่อได้ แล้วบอกในรายงาน)
4. โหมดเร่งงานเดิมของสถานียังทำงาน

## ข้อห้าม
- ไม่แตะระบบทีม/ศึกสุดท้าย · ไม่เปลี่ยนสมดุลนอกผลฝึก · ไม่แตะ `img/raw/`, `Exam/`, `files/` · ห้ามรัน make-manifest · ไม่ commit/merge/push · **ห้ามสร้างรีโปซ้อน**
- ภาพ: ใช้ asset ที่มีอยู่ / CSS / canvas วาดง่ายๆ ก่อน (ภาพสวยค่อยสั่งวาดทีหลัง) · TH+EN

## เกณฑ์รับงาน
1. เทสต์ `tests/b4-training.test.mjs`: EXP/ระดับแยกโซน · lan ให้ผลคนที่เลือกคนเดียว · ยกเลิกไม่ให้ผล · โควตา Guard แชร์ lan/lokan · ผลซ้ำไม่ได้ EXP ซ้ำ · ดาบเพิ่มเฉพาะโจมตีปกติ · speedLv สถานีไม่เปลี่ยนจากการฝึก
2. เทสต์เดิมผ่าน · `node --check` · `git diff --check` · รายงาน `output/Toby/2026-10-04-avegee-b4.md` (สเปกการเล่นแต่ละเกม + ตรวจเบราว์เซอร์ได้หรือไม่)
