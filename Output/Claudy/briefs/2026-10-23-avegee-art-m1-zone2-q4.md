# ใบงานวาด ART-m1-zone2-q4: AVEGEE — พื้นโซน 2 ควอแดรนต์ SE · เจ้าของ Codex (วาดภาพเท่านั้น)

## บริบท
- คุณเป้สั่ง 23 ต.ค. 2569: วาดแผนที่โซน 2–4 ใหม่ตามโครง/ระบบโซน 1 ธีมอิงแผนที่เดิม · Claude สั่ง Codex วาดได้ · **ห้ามแก้โค้ด**
- สเปกเต็ม: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-23-avegee-m1-zone2-art-spec.md` — **§2 + §3.1–3.3 + §3.8 + §3.9–3.10** · prompt EN / negative ตามสเปกเป๊ะ
- ควอแดรนต์ที่เสร็จแล้ว (อ่านอย่างเดียว ห้ามเขียนทับ worktree อื่น):
  - NW: `/Users/agapae/agapae-work/.codex-worktrees/20261023T051200Z-34708b2f/output/m1-zone2/q1/q-nw-srgb.png` · README `/Users/agapae/agapae-work/.codex-worktrees/20261023T051200Z-34708b2f/output/m1-zone2/q1.md`
  - NE: `/Users/agapae/agapae-work/.codex-worktrees/20261023T052116Z-b359fc74/output/m1-zone2/q2/q-ne-srgb.png` · README `/Users/agapae/agapae-work/.codex-worktrees/20261023T052116Z-b359fc74/output/m1-zone2/q2.md`
  - SW: `/Users/agapae/agapae-work/.codex-worktrees/20261023T052120Z-08a8de2c/output/m1-zone2/q3/q-sw-srgb.png` · README `/Users/agapae/agapae-work/.codex-worktrees/20261023T052120Z-08a8de2c/output/m1-zone2/q3.md`
  - refs: `/Users/agapae/agapae-work/.codex-worktrees/20261023T051200Z-34708b2f/output/m1-zone2/refs/` (`ref-q-se-layout.png`, `ref-q-se-walk.png`, `ref-theme-asia.png`; guide ใช้ตรวจเท่านั้น)
- ช่วงซ้อนจริงที่ canvas 1536: แนวนอน ≈341 px, แนวตั้ง ≈228 px · seed = ตัดกรอบ SE จาก composite NW+NE+SW ตาม §3.8 (ขอบบนต่อ NE, ขอบซ้ายต่อ SW, มุมบนซ้ายต่อทั้งสาม)
- **ท่าเรืออยู่ในส่วนนี้** — ตำแหน่ง/ดาดฟ้าตามหมุด §3.2 และค่าที่ Q1 วัดใน README Q1 (ดาดฟ้า x875–923/y697–724 preview, ข้อจำกัดเดินในโค้ด x875.2–916.8)
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** — ห้ามสร้าง worktree/branch/clone ห้าม git commit/push (wrapper ทำให้)

## งาน
1. คัดลอก NW/NE/SW + refs เข้า `output/m1-zone2/q4/inputs/` · ประกอบ composite ตรวจว่าสามส่วนต่อกันได้ (ถ้ารอยต่อเดิมระหว่าง NE–NW หรือ SW–NW มีปัญหา บันทึกไว้ให้ Q5 ซ่อม ไม่ต้องแก้ในรอบนี้)
2. วาด SE ตาม §3.8 → `img/raw/map-zone2/q-se.png` 1536×1024 RGB sRGB **และสำเนา byte-identical** `output/m1-zone2/q4/q-se-srgb.png`
3. ตรวจเองตาม §3.10 + ภาพรอยต่อกับ NE และ SW (`output/m1-zone2/qa/q-se-seam.png`) + **composite ทั้งผืน 4 ส่วน** ที่สเกล preview 1536×1024 (`output/m1-zone2/q4/composite-preview.png`) เทียบกับ guide
4. README `output/m1-zone2/q4.md`: ไฟล์ + ขนาด + prompt ที่ใช้จริง + จุดที่ต่างจากสเปก + รายการรอยต่อ/จุดไม่ตรง mask ที่ควรซ่อมใน Q5 (พิกัด)

## ข้อห้าม
ห้ามแก้ `src/`, `index.html`, `tests/`, catalog/manifest · ห้ามเขียนทับไฟล์ภาพเดิม · ห้ามบอกว่า "ผ่าน" เอง

## เกณฑ์รับงาน
ภาพ SE + สำเนาครบ · ภาพรอยต่อ + composite 4 ส่วน · README พร้อมรายการซ่อม Q5
