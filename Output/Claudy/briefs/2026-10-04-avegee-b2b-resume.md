# ใบงาน B2b-resume (Toby): ทำ B2b (event สุดท้าย) ต่อจาก Codex ที่ติดลิมิตกลางทาง — โหมด claude-only

**ใบงานหลัก (ขอบเขต/ลำดับ/ข้อห้าม/เกณฑ์รับงาน): `Output/Claudy/briefs/2026-10-04-avegee-b2b-final-event.md`** — อ่านก่อนทั้งใบ (มีคำแก้ของคุณเป้ 3 ข้อ: ลำดับตายตัว ลูกน้อง 4 wave → หัวหน้าทีละคน โซน 1→2→3→4 → บอสโซน 4 · ศึกหัวหน้า/บอสมีลูกน้องร่วมนิดหน่อย · ระหว่างขั้นเดินไปร้าน/นิรา/ศาลาได้)

## สถานะที่ค้าง
- worktree: `/Users/agapae/agapae-work/.codex-worktrees/20261004T145334Z-b50d2a4b` · branch `codex/20261004T145334Z-b50d2a4b` · ฐาน `e1fbd49` (ก่อน B3)
- Codex ทำไปแล้ว ~575 บรรทัด 17 ไฟล์ (staged ไม่ได้ commit): `src/final-event.js` ใหม่, `scripts/sim-final-event.mjs`, แก้ `art/data/game/i18n/npc-stand/proximity/scene/story/ui.js`, เทสต์ `b2b-final-event`, `final-event-helpers`, ปรับ `final-gauntlet`, `story-art`, `balance28b`, `b2-team6` · ไม่มีรายงาน ไม่รู้ว่าครบข้อไหน
- **repo: clone `/Users/agapae/agapae-work/AVEGEE` เท่านั้น** ห้ามลองเข้า `Claude/AVEGEE` เดิม · ห้ามแตะ main ใน clone (Dale merge B4 อยู่)

## ขั้นตอน
1. **commit งานที่ค้างของ Codex ทันที** (`git -C <worktree> commit -m "B2b partial (Codex, rate-limited)"`) กันหาย
2. อ่าน diff ตรวจกับใบงานหลักทีละข้อ — โดยเฉพาะ **ลำดับหัวหน้าทีละคน โซน 1→2→3→4** และลูกน้องในศึกหัวหน้า/บอส (Codex อาจยังไม่ทำ) · เช็กว่าเทสต์เก่าที่ปรับไม่ได้ผ่อนเกณฑ์
3. ทำส่วนที่ขาดให้ครบ **commit ทีละข้อ** (กันลิมิต Claude ตัดกลางทาง)
4. `git fetch` แล้ว rebase บน `origin/main` ล่าสุด (มี B3 + อาจมี B4) ก่อนส่ง · เทสต์ทั้งหมด + `node --check` + `git diff --check`
5. ทดสอบในเบราว์เซอร์จริง 1280/1440 (เซฟจำลองที่ถึงโซน 4): ลูกน้อง 4 wave + หน้าต่างรางวัลแต่ละ wave → cutscene → แผนที่มีตัวละครยืน → เดินไปร้าน/นิรา/ศาลาได้ → หัวหน้าโซน 1→2→3→4 ทีละศึก → บอส → ฉากจบ · โหลดเซฟกลางทางแล้วไม่ล้างความคืบหน้า · เซฟที่ค้าง event แบบเก่าโหลดได้
6. ไม่ merge ไม่ push · ภาพหลักฐานเฉพาะที่จำเป็น (JPEG ย่อ) `AGAPAE Agent/Output/Toby/b2b/`
7. รายงาน `AGAPAE Agent/Output/Toby/2026-10-04-avegee-b2b.md`: ข้อไหน Codex ทำ / Toby ทำ / ยังไม่ทำ, commit, ตัวเลขรางวัลเงินต่อ wave และจำนวนลูกน้องที่ตั้ง, ผลจำลองอัตราชนะทีม 6
