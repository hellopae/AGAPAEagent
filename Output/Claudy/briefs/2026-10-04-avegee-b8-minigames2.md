# ใบงาน B8: AVEGEE — minigame ฝึกที่เหลือ 4 เกม (กระจก / หายใจ / เรียงเอกสาร / ฟันต้นงิ้ว)

Repo: `/Users/agapae/agapae-work/AVEGEE` · ฐาน = main ล่าสุด (มี B4 framework `src/training.js`, `src/minigames/training/`) · แบบ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Astra/2026-10-04-avegee-30g0-design.md` หัวข้อ 3 + ใบ G4
## ขอบเขต (ใช้ API ของ B4 ห้ามแก้ core `game.js` ถ้าเลี่ยงได้)
- **st-krajok** หมุนองศากระจกให้แสงส่องไปทางออกวิหาร → **กานต์** (puzzle ต้องมีคำตอบจริงทุกด่าน)
- **st-sawan** นั่งสมาธิกำหนดลมหายใจ (จังหวะกด/ปล่อย) → **บุญ**
- **st-sala** puzzle เรียงเอกสารแบบ Bizzler (สลับเอกสารให้เรียงเลข/หมวด) → **นิรา** (เพิ่มระเบียบ ตามสเปก Astra)
- **st-ngiw** ฟันต้นงิ้ว → **ดำ**
- 20–60 วิ เมาส์+แตะ · เป้ากดบนมือถือ ≥44px · ปิดกลางคัน cleanup timer · pause หยุดได้
## เกณฑ์รับงาน
- เทสต์ `tests/b8-training.test.mjs`: ครบ 8 สถานี · กระจกมีทางแก้ทุกด่าน (solver ในเทสต์) · EXP ถึงคนที่ถูก · ยกเลิกไม่ได้ผล

## ข้อห้ามร่วม
- **ทำในโฟลเดอร์ worktree ที่ตัวรันให้มาเท่านั้น ห้ามสร้างรีโป/clone ใหม่ ห้ามใช้ /tmp หรือ /private/tmp**
- ไม่แตะ `img/raw/`, `Exam/`, `files/` · ห้ามรัน `scripts/make-manifest.py` · ไม่ commit/merge/push · ข้อความผู้เล่นเห็นมี TH+EN · เซฟเก่าต้องโหลดได้
- เทสต์เดิมห้ามผ่อนเกณฑ์ (แก้ได้เฉพาะที่ schema/พฤติกรรมเปลี่ยนตามใบงาน และอธิบายในรายงาน)
## เกณฑ์ร่วม
- `node --test tests/*.test.mjs` ผ่านหมด · `node --check src/*.js` · `git diff --check`
- รายงาน `output/Toby/2026-10-04-avegee-<ใบ>.md` ในโฟลเดอร์ worktree: ทำอะไร/ไม่ได้ทำ, ไฟล์:บรรทัด, ตรวจเบราว์เซอร์ได้หรือไม่
