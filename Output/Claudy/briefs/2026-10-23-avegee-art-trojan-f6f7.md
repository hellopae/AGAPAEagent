# ใบงานวาด ART-trojan-f6f7: AVEGEE — บอสโซน 4 (Trojan ม้าไม้) เฟรม attack 6,7 · เจ้าของ Codex (วาดภาพเท่านั้น)

## บริบท
- คุณเป้อนุญาต 22 ต.ค. 2569 ให้ Claude สั่ง Codex วาดภาพ · คุณเป้แจ้ง 23 ต.ค. ว่า Codex reset แล้ว · Claude ไม่มี imagegen · โค้ดเป็นงานของ Claude (Toby) — **ห้ามแก้โค้ด**
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** — ห้ามเขียนลง clone หลัก ห้ามสร้าง worktree/branch/clone เอง ห้าม git commit/push (wrapper ทำให้)
- สเปก: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-21-avegee-o2-codex-art-requests.md` — **§2 บอสโซน 4** (ปัญหา + prompt EN) + กฎร่วมทุกชิ้นหัวไฟล์
- ต้นแบบ: `img/boss-combat-v1/cyberhell/boss-frontier.webp` 1152×2048 · ช่อง 384×512 · 3 คอลัมน์×4 แถว · เฟรม 0–2 idle / 3–8 attack / 9–11 hurt · อ่าน `docs/n2-sprite-bleed.md` ประกอบ

## งาน
1. วัดต้นแบบ: เส้นฐานล้อ, ขนาดตัวม้าในเฟรม 3–5 (alpha bbox)
2. วาดเฟรม 6,7 ใหม่ตาม prompt §2 (ม้าตัวเดียวต่อช่อง ลำแสงชมพูพุ่งซ้ายจบในช่อง ขอบโปร่ง ≥ 8px หันซ้าย ล้อบนเส้นฐานเดิม ขนาดเท่าเฟรม 3–5)
3. ประกอบเป็นแผ่นใหม่ทั้งแผ่น → `img/boss-combat-v1/cyberhell/boss-frontier-v2.webp` 1152×2048 (เฟรมอื่นคัดลอกจากต้นแบบเป๊ะ เปลี่ยนเฉพาะ 6,7)
4. ตรวจเอง: ไม่มีเศษเฟรมข้างเคียง · GIF attack 3–8 เทียบก่อน/หลัง
5. เขียน `output/art-queue-2026-10-23/trojan-f6f7.md`: ไฟล์ที่สร้าง + ขนาดจริง (วัดด้วย PIL) + prompt ที่ใช้จริง + จุดที่ต่างจากสเปกพร้อมเหตุผล + คอนแทคชีต/ภาพเปรียบเทียบก่อน-หลังใน `output/art-queue-2026-10-23/trojan-f6f7/`

## ข้อห้าม
ห้ามแก้ `src/`, `index.html`, `tests/`, catalog/manifest · **ห้ามเขียนทับไฟล์ภาพเดิม** (สร้างไฟล์ชื่อใหม่ตามที่กำหนด) · ห้ามบอกว่า "ผ่าน" เอง (Toby ตรวจตอนเสียบ)

## เกณฑ์รับงาน
ไฟล์ปลายทางครบ ขนาดตรง · README ชิ้นนี้ครบ · ไม่มีไฟล์อื่นนอก `img/` ปลายทางและ `output/art-queue-2026-10-23/` เปลี่ยน
