# ใบงานวาด ART-workers-th: AVEGEE — animation คนงานโซน 1 (th) · เจ้าของ Codex (วาดภาพเท่านั้น)

## บริบท
- คุณเป้อนุญาต 22 ต.ค. 2569 ให้ Claude สั่ง Codex วาดภาพ · Claude ไม่มี imagegen · โค้ดเป็นงานของ Claude (Toby) — **ห้ามแก้โค้ด**
- สเปกเต็ม (อ่านทั้งไฟล์ แต่ทำเฉพาะชิ้นนี้): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-22-avegee-art-queue-codex.md` — **§4 ชิ้นที่ 3 — เฉพาะโซน th (P0)** + §1 (asset inventory) + §8 (pre-flight)
- ภาพต้นเรื่องจากคุณเป้: `/Users/agapae/agapae-work/feedback/2026-10-22/`
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** — สคริปต์ §8 ที่ `cd /Users/agapae/agapae-work/AVEGEE` ให้รันใน working directory ปัจจุบันแทน (ไฟล์เหมือนกัน) ห้ามเขียนลง clone หลัก ห้ามสร้าง worktree/branch/clone เอง ห้าม git commit/push (wrapper ทำให้)

## งาน
1. รัน pre-flight §8 วัดขนาดจริงของภาพต้นทางที่เกี่ยวกับชิ้นนี้ · ค่าที่ติด "≈" ใช้ค่าที่วัดได้
2. วาดด้วย image generation ในตัว ตาม prompt EN ในสเปก → ไฟล์ปลายทาง: `img/workers/worker-th-sheet-v2.webp` 1280×3840 (ช่อง 320×320 × 4 คอลัมน์ × 12 แถว) — แถว 0–2 คัดลอกจาก v1, แถว 3–11 วาดใหม่
3. ตรวจผลเอง: ขนาด/โหมดสี/ช่องโปร่งตรงสเปก · ไม่เขียนทับไฟล์เดิม · สไตล์เข้ากับภาพอ้างอิง
   - ทำ GIF พรีวิวต่อแถว (160 ms/เฟรม) + metadata แถว→ท่า ใน evidence · **ยังไม่ทำ asia/west/cyberhell** (คุณเป้ดูโซน 1 ก่อน)
4. เขียน `output/art-queue-2026-10-22/workers-th.md`: ไฟล์ที่สร้าง + ขนาดจริง (วัดด้วย PIL) + prompt ที่ใช้จริง + จุดที่ต่างจากสเปกพร้อมเหตุผล + ภาพเปรียบเทียบก่อน/หลัง (ถ้าเป็นงานแก้ภาพเดิม) ใน `output/art-queue-2026-10-22/workers-th/`

## ข้อห้าม
ห้ามแก้ `src/`, `index.html`, `tests/`, catalog/manifest · ห้ามเขียนทับไฟล์ภาพเดิม · ห้ามบอกว่า "ผ่าน" เอง (Toby ตรวจตอนเสียบ)

## เกณฑ์รับงาน
ไฟล์ปลายทางครบ ขนาดตรง · README ชิ้นนี้ครบ · ไม่มีไฟล์อื่นนอก `img/` ปลายทางและ `output/art-queue-2026-10-22/` เปลี่ยน
