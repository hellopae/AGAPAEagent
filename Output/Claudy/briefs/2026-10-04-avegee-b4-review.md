# ใบงาน B4-R (Dale): รีวิว + merge Codex B4 (minigame ฝึก: ดาบ/ยกหิน/เร่งไฟ) — ทำหลัง B3-R

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน
- **Codex ไม่ได้ทำใน worktree ที่ให้** — ไปสร้างรีโปเองที่ `/private/tmp/avegee-b4` (ฐาน `a4df3e3`) · Claudy ดึงงานออกมาแล้ว: **`Output/Claudy/briefs/partial-b4/b4.patch`** (staged+unstaged, binary) + รายงาน `partial-b4/2026-10-04-avegee-b4.md`
- worktree ว่างที่ตัวรันสร้าง `~/agapae-work/.codex-worktrees/20261004T141425Z-f3ac4db6` → ลบทิ้งได้ · `/private/tmp/avegee-b4*` อย่าพึ่งพา (tmp อาจถูกล้าง)
- ใบงาน `Output/Claudy/briefs/2026-10-04-avegee-b4-minigames.md` · Codex: `src/{game,ui,training}.js`, `src/minigames/training/{index,host}.js`, เทสต์ 15 ข้อ · ชุดเต็ม 373/373 · **ยังไม่ได้ดู UI เลย** · hook สำหรับ B3 ยังไม่ต่อ (B3 ยังไม่อยู่ในฐานตอนนั้น)

## ขั้นตอน
1. branch ใหม่จาก main ล่าสุด (หลัง B2, B3) → `git apply --3way partial-b4/b4.patch` (ไม่เอา `output/Toby/...` เข้า repo) · แก้ conflict · **ต่อ hook ผลฝึกเข้ากับ progression ของ B3** ให้ดาบ/หิน/ไฟมีผลจริงในศึก
2. เทสต์ทั้งหมด + `node --check` + `git diff --check`
3. เบราว์เซอร์ 1280/1440 + 390: เข้า st-dab / st-lan / st-lokan / st-krata → เปิดเกมได้ เล่นจบได้ทั้งเมาส์และแตะ (จำลอง touch) 20–60 วิ · lan มีหน้าเลือกทัณฑ์/Guard ก่อนเล่น · ปิดกลางคันไม่ได้ผล · pause (30C) หยุดเกมได้ · หลังฝึก ค่าพลังในการ์ดเปลี่ยนตามจริง · โหมดเร่งงานสถานีเดิมยังทำงาน
4. ผ่าน → merge + push + live · ไม่ผ่าน → FIX LIST · ลบ worktree ว่าง + `partial-b4/` หลัง merge

## รายงาน
`Output/Dale/2026-10-04-avegee-b4-review.md` · PASS/FIX LIST + commit + roll back + ภาพแต่ละเกม (JPEG ย่อ `Output/Dale/b4-shots/`)

## งานเล็กเพิ่ม (Claudy ตัดสินจาก B3-R — commit แยกก่อนเริ่ม B4)
1. **คืนค่าหีบยาเป็น 42** (`ITEMS.health.hp` 40 → 42) — B3 รวมทุกทางให้อ่านค่าเดียวแล้วทำให้กลางศึกฟื้นน้อยลงโดยไม่ได้ตั้งใจ อัตราชนะโซน 4 ตก 82→72 · แก้ตารางโซน 1 ในข้อมูลให้ตรง · รันจำลองยืนยันกลับมา ~82–86% · ปรับเทสต์ที่ผูกค่า 40
2. หน้าต่างเตรียมศึก: กล่องยาขึ้น "ไม่มี" ทั้งที่มียาโซนใหม่ (ชิปกดได้) → นับยาทุกระดับ
