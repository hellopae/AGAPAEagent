# ใบงานวาด ART-m1-zone2-s2b: AVEGEE — แก้ sprite บ้านโซน 2 (ขอบชมพู right-one + ตรวจ 4 หลัง) · เจ้าของ Codex (วาดภาพเท่านั้น)

## บริบท
- คุณเป้สั่ง 23 ต.ค. 2569: แผนที่โซน 2 ใหม่ตามโครง/ระบบโซน 1 ธีมอิงแผนที่เดิม · Claude สั่ง Codex วาดได้ · **ห้ามแก้โค้ด**
- สเปก: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-23-avegee-m1-zone2-art-spec.md`
- ผลตรวจ M3 (แหล่งความจริงของปัญหา + ภาพตรวจ): `/Users/agapae/agapae-work/.codex-worktrees/20261023T054046Z-d88c803d/output/m3/README.md` หัวข้อ "คำขอ Q5 / วาดแก้" · ไฟล์ต้นทางที่ M3 เก็บไว้: `/Users/agapae/agapae-work/.codex-worktrees/20261023T054046Z-d88c803d/output/m3/review/` (q1–q4, quadrants, s2/rejected)
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** — อ่านไฟล์จาก path ข้างบนได้ ห้ามเขียนลงที่อื่น ห้ามสร้าง worktree/branch/clone ห้าม git commit/push (wrapper ทำให้)
- สเปกบ้าน: §2 + §4.1 + §4.3 · ไฟล์บ้าน 4 หลังที่ถูกปฏิเสธ: `/Users/agapae/agapae-work/.codex-worktrees/20261023T054046Z-d88c803d/output/m3/review/s2/rejected/` (ดู `right-one-suspect-edge-400.png`)

## งาน
1. right-one: ตัด key/วาดขอบใหม่บริเวณ canvas x980–1050/y150–220 (โดยเฉพาะ (1014,187)) ให้ไม่มีขอบชมพู/ขาวบนพื้นเข้มและอ่อน · ห้ามแก้ด้วยการบีบ bbox
2. ตรวจทั้ง 4 หลังซ้ำ (front-one, right-one, left-two, right-two) ที่ 400% บน #202020 และ #E0E0E0 — แก้ทุกจุด halo จริง · ขนาดไฟล์/bbox คงเดิมตามสเปก
3. ส่งออกไฟล์ปลายทางชื่อเดิมตามสเปก §4.3 + contact sheet + crop 400% ก่อน/หลัง ใน `output/m1-zone2/s2b/` · README `output/m1-zone2/s2b.md`

## ข้อห้าม
ห้ามแก้ `src/`, `index.html`, `tests/` · ห้ามบอกว่า "ผ่าน" เอง
