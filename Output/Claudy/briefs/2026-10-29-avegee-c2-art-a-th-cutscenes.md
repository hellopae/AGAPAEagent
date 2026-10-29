# C2-ART-A — วาด cutscene ท่าใหม่ โซนไทย 10 ภาพ (29 ต.ค. 2569)

Repo: AVEGEE (worktree ของ run นี้) · ห้าม commit/push/merge เอง · **งานวาดล้วน ไม่แก้โค้ดเกม** (โค้ดท่าใหม่ C1 จะผูกภาพทีหลัง)

## วาดด้วยอะไร
- **ใช้ built-in `image_gen` เท่านั้น** ตาม skill `~/.codex/skills/.system/imagegen/SKILL.md` · **ห้ามใช้ Shado MCP / CLI fallback**
- ใช้ภาพ cutscene/ตัวละครเดิมเป็น reference image ทุกภาพ (หน้า ชุด สี ลายเส้นเดิม)

## สเปก (จาก Astra A1 §4: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Astra/2026-10-28-avegee-a1-combat-moves-design.md` อ่าน §2 และ §4 ก่อน)
ยึด `img/nira-combat/nira-th-heal-cutscene-v1.webp` เป็นแบบการจัดฉาก cutscene · ตัวละครฝ่ายผู้เล่นหันขวา

| ไฟล์ | ท่า (ชื่อไทย) | ขนาด | reference |
|---|---|---|---|
| plerng-copperInferno-cut-01.webp / -02.webp | เพลิงอาญาทองแดง: รวมไฟ / ปล่อยไฟ (แรงกว่าท่าเดิมชัดเจน) | 1375×768 | `img/crew-plerng-cutscene.jpeg`, `img/crew-combat-v1/th/plerng.webp` |
| nira-mercySeal-cut-01.webp | ตราเมตตาพิทักษ์: ฮีล + โล่ + บัฟโจมตี | 1672×941 | `img/nira-combat/nira-th-heal-cutscene-v1.webp` |
| boon-lotusSanctuary-cut-01.webp | บัวบุญคุ้มชีพ: ฮีล + โล่บัว | 1375×768 | `img/crew-boon-cutscene.jpeg` |
| taan-laborJudgment-cut-01.webp | กระบองพิพากษาหินผา | 1375×768 | `img/crew-taan-cutscene.jpeg` |
| dam-shadowCleaver-cut-01.webp | คมเงาทลายตรวน | 1375×768 | `img/crew-dam-cutscene.jpeg` |
| guard-abyssGatebreaker-cut-01.webp | ทวารบาลทลายโลกันต์ (ยักษ์) | 1375×768 | `img/crew-guard-cutscene.jpeg` |
| kan-karmaFracture-cut-01.webp | กระจกกรรมสะท้อนคม (กานต์) | 1375×768 | `img/crew-kan-cutscene.jpeg` |
| yama-teamJudgment-cut-01.webp / -02.webp | บัญชาการยมทูตประสานพิพากษา: ยามาสั่งทีม / ยามาปิดท้ายฟันหนัก — **ห้ามวาดเพื่อนร่วมทีมลงภาพ** (คอมโบประกอบจาก sprite จริง) | 1375×768 | ภาพยามาโซนไทย + ดาบ `yama-sword*` |

บันทึกที่ `img/skills-v1/th/<ไฟล์>` · ยามาเป็นเด็ก ตัวเล็กกว่าผู้ใหญ่ · ไม่มีตัวอักษร/ตัวเลขในภาพ

## ส่งมอบ
- `output/coordination/2026-10-29-c2-art-a/`: contact sheet เทียบ reference ↔ ภาพใหม่ทุกคู่, `prompts.md` (prompt จริงทุกภาพ), `manifest.json` (ไฟล์ → ท่า → ขนาด)
- ถ้าวาดไม่ทัน 30 นาที ส่งเท่าที่ผ่านคุณภาพ ระบุที่ค้าง

## เกณฑ์รับงาน
1. ทุกภาพเป็นตัวละครเดิมชัดเจน ขนาดตามตาราง
2. ท่าใหม่ดูต่างและแรงกว่าท่าเดิม (เทียบใน contact sheet)
3. ไม่แตะ `src/` · `node --test tests/*.test.mjs` ไม่ต้องรัน (ไม่แก้โค้ด) แต่ต้องไม่เพิ่มไฟล์ที่ทำให้ manifest test ตก — ไม่แก้ `img/manifest.json`
