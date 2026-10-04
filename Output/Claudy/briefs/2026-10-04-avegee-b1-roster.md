# ใบงาน B1 (Codex): AVEGEE — roster ยมทูต/Guard แบบ ID รายตัว + migration เซฟ (ฐานของระบบต่อสู้ใหม่และทีมข้ามโซน)

Repo: `/Users/agapae/agapae-work/AVEGEE` · ฐาน = main ล่าสุด (`git log -3`) · เทสต์ `node --test tests/*.test.mjs`
**แบบที่ต้องทำตาม: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Astra/2026-10-04-avegee-30g0b-battle-design.md` หัวข้อ 1, 4, 6 (ลำดับ 1) และ "Migration เซฟที่ควรอยู่ในใบแรก"** · แผนเดิม `.../Output/Astra/2026-10-04-avegee-30g0-design.md`
คำตัดสินคุณเป้: ท้ายไฟล์ `.../Output/Claudy/briefs/2026-10-04-avegee-30-plan.md` (ระดับฝึกแยกโซน · ชนิดเดียวกันต่างโซนลงพร้อมกันได้ นับคนละคน · ข้ามโซน = เรียกเข้าศึก คงเจ้าของสาขาเดิม)

## ขอบเขต (ใบนี้เป็นข้อมูล/โครงสร้างเท่านั้น ไม่มี UI ใหม่)
1. โมดูล roster ใหม่ (เช่น `src/roster.js`): ทุกยมทูตทุกสาขา + Guard มี ID คงที่จาก โซน+ชนิด · นิราเป็นคนเดียวทั้งเกม · ฟังก์ชันอ่าน/หา/รายการตามโซน · เก็บกำลังใจ ความอิ่ม ค่าฝึก ต่อ ID
2. ต่อ `game.js` จุด snapshot/restore/moveZone ให้ใช้ roster โดยพฤติกรรมเกมปัจจุบัน **ไม่เปลี่ยน** (ทีม 2 คน, กำลังใจ, งาน, ศึก ทำงานเหมือนเดิม)
3. Migration เซฟ: คง key `avegee.save.v2` เพิ่ม version/marker · เก็บสำเนาเซฟก่อน migrate · แปลงคนเดิมทุกสาขาเป็น ID · คงกำลังใจ/อิ่ม/ค่าฝึก · Guard เก่าไม่มี morale → 100 · ทีมเดิมแปลง key → ID · migrate ซ้ำแล้วผลเหมือนเดิม (idempotent)
4. เตรียมฟิลด์สำหรับใบถัดไป (ยังไม่ใช้): `recoverUntil`, เพดานทีมศึกสุดท้าย

## ข้อห้าม
- ไม่เปลี่ยนสมดุล/UI/ภาพ · ไม่แตะ `img/`, `Exam/`, `files/` · ห้ามรัน `scripts/make-manifest.py` · ไม่ commit/merge/push
- **ทำในรีโป worktree ที่ตัวรันให้มาโดยตรง ห้ามสร้างรีโปซ้อน/clone ซ้อนข้างใน**

## เกณฑ์รับงาน
1. เทสต์ใหม่ `tests/b1-roster.test.mjs`: ID ไม่ชนกันทุกโซน · เซฟ v3 เก่า (ทำ fixture จากโครงจริง) โหลดแล้วได้คนครบ ค่าเดิมครบ · migrate ซ้ำไม่สร้างคนเพิ่ม · moveZone ไปกลับไม่ทำข้อมูลหาย
2. เทสต์เดิมผ่านทั้งหมด · `node --check src/*.js` · `git diff --check`
3. รายงาน `output/Toby/2026-10-04-avegee-b1.md`: schema ใหม่, จุดที่แก้ใน game.js (ไฟล์:บรรทัด), migration ทำอะไร, ความเสี่ยงที่เหลือ
