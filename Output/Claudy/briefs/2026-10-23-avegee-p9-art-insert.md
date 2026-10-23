# ใบงาน P9: AVEGEE — เสียบภาพ Codex รอบ 23 ต.ค. (นิรา 4 โซน · คนงาน asia/west/cyberhell · ม้าทรอย f6/f7) · Toby → Dale

## บริบท
- คุณเป้แจ้ง Codex reset 23 ต.ค. → Claudy ส่งงานวาด 6 run (ใบงาน `Output/Claudy/briefs/2026-10-23-avegee-art-*.md`) · ภาพอยู่บน branch ของแต่ละ run ใน `/Users/agapae/agapae-work/AVEGEE` (push ขึ้น origin แล้ว) + หลักฐาน `output/art-queue-2026-10-23/<slug>/` + README `output/art-queue-2026-10-23/<slug>.md`

| slug | branch | ไฟล์ภาพ |
|---|---|---|
| nira-th-asia | `codex/20261023T000745Z-57eb77b9` | `img/nira-combat/nira-{th,asia}-sheet-v2.webp` |
| nira-west-cyberhell | `codex/20261023T000749Z-848d07ed` | `img/nira-combat/nira-{west,cyberhell}-sheet-v2.webp` |
| workers-asia | `codex/20261023T000753Z-3e1be997` | `img/workers/worker-asia-sheet-v2.webp` |
| workers-west | `codex/20261023T000757Z-69d28762` | `img/workers/worker-west-sheet-v2.webp` |
| workers-cyberhell | `codex/20261023T000801Z-e545ce1b` (**หมดเวลา 30 นาที** — ภาพมี แต่ README อาจไม่ครบ ตรวจภาพเองละเอียด) | `img/workers/worker-cyberhell-sheet-v2.webp` |
| trojan-f6f7 | `codex/20261023T000805Z-0f296a44` | `img/boss-combat-v1/cyberhell/boss-frontier-v2.webp` |

- สเปกต้นทาง: นิรา/ม้าทรอย `Output/Toby/2026-10-21-avegee-o2-codex-art-requests.md` §1–2 · คนงาน `Output/Mind/2026-10-22-avegee-art-queue-codex.md` §4 · การเสียบ th v2 + ชดเชยสเกลเดิม: `Output/Toby/2026-10-22-avegee-p5b-art-insert.md`, ใบงาน P5c (`2026-10-22-avegee-p5c-worker-scale.md`)
- main ล่าสุด `272cf1f` (P4 ขึ้นเว็บแล้ว) · Codex ยังวาดหัวหน้าโซน 2–4 อีก 3 run ระหว่างนี้ (ไม่เกี่ยวกับใบนี้)

## ขอบเขต
1. **ตรวจภาพก่อนเสียบ** (เกณฑ์ของสเปกแต่ละชิ้น): ขนาด, ขอบโปร่ง ≥ 8px (นิรา/ม้า) / ≥ 6px (คนงาน), เส้นฐานเท้า, ไม่มีเศษข้ามช่อง, ตัวละครตรงโซน · ชิ้นไหนไม่ผ่าน → ไม่เสียบ ลิสต์เป็นคำขอวาดใหม่ในรายงาน (ระบุเฟรม/ปัญหา/ตัวเลข)
2. นิรา v2: สลับ path เป็น v2 ทั้ง 4 โซน · ทุกแถวหันขวาแล้ว → **เอาการพลิก idle/hurt ในโค้ดออก** · `stripNeighbourLeaks` ของเฟรม 7 ถ้าไม่จำเป็นแล้วให้ปิดเฉพาะ v2
3. คนงาน v2 asia/west/cyberhell: สลับ path + ตารางชดเชยสเกล/จุดเท้าแบบเดียวกับ th (P5c) ถ้าวัดแล้วยังต่างจาก v1 · แถวท่าใหม่ใช้ตามแผนที่แถวเดียวกับ th
4. ม้าทรอย v2: สลับ path · ตรวจ attack เฟรม 3–8 เล่นต่อเนื่อง
5. เก็บภาพเข้า branch ด้วย `git checkout <branch> -- <ไฟล์ภาพ>` เท่านั้น (ไม่เอาไฟล์อื่นจาก branch Codex ยกเว้น README/หลักฐานใน `output/art-queue-2026-10-23/` ถ้าต้องการอ้างอิง)

## ขั้นตอน
- worktree `/Users/agapae/agapae-work/.toby-worktrees/p9` branch `toby/p9-art-insert` จาก main `272cf1f` · ห้ามแก้ checkout หลัก · เจอไฟล์ค้างที่ไม่ใช่ของเราอย่าแตะ
- (ล้าง worktree `.toby-worktrees/p4` ได้ — merge แล้ว `272cf1f`)
- เทสต์ 0 แดง + เทสต์ path/flip ใหม่ · cache-bust `-p9`
- ตรวจในเบราว์เซอร์ 390×844 และ 1280×800: ศึกชายแดนที่มีนิรา (อย่างน้อย 2 โซน), คนงานแต่ละโซนเดิน/ทำงาน, บอสโซน 4 โจมตี · วิดีโอ/GIF หลักฐาน

## ข้อห้าม
ไม่เปลี่ยนตัวเลขเกม · ไม่วาดภาพเอง · ไม่ merge/push main (Dale ทำ)

## ส่งมอบ
รายงาน `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-23-avegee-p9-art-insert.md`: ตาราง ชิ้น → ผ่าน/ไม่ผ่าน (ตัวเลข) → เสียบแล้ว · ตารางชดเชยสเกล · เทสต์ · หลักฐาน · คำขอวาดใหม่ (ถ้ามี)

## เกณฑ์รับงาน
1. ทุกชิ้นตรวจแล้ว เสียบเฉพาะที่ผ่าน
2. นิราไม่พลิกแล้ว หันขวาทุกท่า · คนงานไม่เตี้ย/เท้าไม่เลื่อน · ม้าไม่ซ้อน
3. เทสต์ 0 แดง · Dale merge ขึ้นเว็บ
