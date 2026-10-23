# ใบงานวาด ART-m1-zone2-q2: AVEGEE — พื้นโซน 2 ควอแดรนต์ NE · เจ้าของ Codex (วาดภาพเท่านั้น)

## บริบท
- คุณเป้สั่ง 23 ต.ค. 2569: วาดแผนที่โซน 2–4 ใหม่ตามโครง/ระบบโซน 1 ธีมอิงแผนที่เดิม · Claude สั่ง Codex วาดได้ · **ห้ามแก้โค้ด**
- สเปกเต็ม: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-23-avegee-m1-zone2-art-spec.md` — **§2 + §3.1–3.3 + §3.6 + §3.9–3.10** · prompt EN / negative ตามสเปกเป๊ะ
- **Q1 (NW) เสร็จแล้ว** — ไฟล์อยู่ใน worktree ของ run Q1 (อ่านอย่างเดียว ห้ามเขียนทับ): `/Users/agapae/agapae-work/.codex-worktrees/20261023T051200Z-34708b2f`
  - ภาพ NW: `/Users/agapae/agapae-work/.codex-worktrees/20261023T051200Z-34708b2f/output/m1-zone2/q1/q-nw-srgb.png` (1536×1024, byte-identical กับ `img/raw/map-zone2/q-nw.png` ของ run นั้น)
  - refs ที่ Q1 เตรียมไว้ (ใช้ซ้ำ ไม่ต้องสร้างใหม่): `/Users/agapae/agapae-work/.codex-worktrees/20261023T051200Z-34708b2f/output/m1-zone2/refs/` — ใช้ `ref-q-ne-layout.png`, `ref-q-ne-walk.png`, `ref-theme-asia.png` (guide ใช้ตรวจเท่านั้น ไม่แนบให้ตัววาด)
  - README Q1: `/Users/agapae/agapae-work/.codex-worktrees/20261023T051200Z-34708b2f/output/m1-zone2/q1.md` — **ช่วงซ้อนจริงที่ canvas 1536: แนวนอน ≈341 px, แนวตั้ง ≈228 px** (ไม่ใช่ 192/128 — นั่นคือหน่วย preview)
  - seed = แถบขวาของ NW ตาม §3.6
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** — ห้ามเขียนลง clone หลักหรือ worktree ของ Q1 ห้ามสร้าง worktree/branch/clone ห้าม git commit/push (wrapper ทำให้)

## งาน
1. คัดลอก NW + refs ที่ต้องใช้เข้ามาใน worktree ของคุณ (`output/m1-zone2/q2/inputs/`)
2. วาด NE ตาม §3.6 (outpaint จาก seed — รอยต่อกับ NW ต้องเนียน) → `img/raw/map-zone2/q-ne.png` 1536×1024 RGB sRGB **และสำเนา byte-identical** `output/m1-zone2/q2/q-ne-srgb.png` (เพราะ img/raw ถูก gitignore)
3. ตรวจเองตาม §3.10 + ภาพตรวจรอยต่อจริงกับ NW (`output/m1-zone2/qa/q-ne-seam.png`) + overlay guide
4. README `output/m1-zone2/q2.md`: ไฟล์ + ขนาด + prompt ที่ใช้จริง + จุดที่ต่างจากสเปก

## ข้อห้าม
ห้ามแก้ `src/`, `index.html`, `tests/`, catalog/manifest · ห้ามเขียนทับไฟล์ภาพเดิม · ห้ามบอกว่า "ผ่าน" เอง

## เกณฑ์รับงาน
ภาพ NE + สำเนาใน output ครบ ขนาดตรง · ภาพตรวจรอยต่อกับ NW · README ครบ
