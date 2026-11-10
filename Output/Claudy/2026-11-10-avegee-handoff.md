# AVEGEE handoff 10 พ.ย. 2569 23:05 — Claude weekly 93% (reset 11 พ.ย. ~23:00)

## งานที่อยู่ใน branch `claude/2026-11-05-zone1-v5-fx` (worktree `~/agapae-work/.toby-worktrees/z1-v5`, เปิดดู http://127.0.0.1:8942) — ยังไม่ merge main
| commit | งาน | รายงาน |
|---|---|---|
| a3a94aee | แก้กระตุก 6→60 fps | Output/Toby/2026-11-10-avegee-perf-stutter.md |
| 87aa690b, 5b499d80 | UI/แผนที่ 7 ข้อ + vignette | Output/Toby/2026-11-10-avegee-fb-ui-fixes.md |
| f122f1db, 639c3ab2 | ตั้งค่ากราฟิก 2 โหมด + คนงาน 90% | Output/Toby/2026-11-10-avegee-graphics-setting.md |
| 7b89da8f, 95db83c7 | บทภารกิจ (Rae) | Output/Rae/2026-11-10-avegee-quest-*.md |
| 7154b0f1 | effect ต่อสู้ + บอส cutscene + ชายแดน 1–3 ตัว | Output/Toby/2026-11-10-avegee-battle-fx-encounters.md |
| 92ad3bec | รางวัลภารกิจ + ฉากสู้ 3 ภารกิจ + ท่าใหม่ 3 ท่า | Output/Toby/2026-11-10-avegee-quest-rewards.md |
| (กำลังทำ) | ส่วน A (ภารกิจต้องจ้างตัวละครก่อน, ปุ่ม สู้อีกครั้ง/พักไว้ก่อน) + ระบบข้าวปั้นใหม่ — Toby (Fable) | Output/Toby/2026-11-10-avegee-food-system.md (เมื่อเสร็จ) |

## คิว Codex (อัตโนมัติ ดู log ใน `Output/Codex/runs/`)
1. `queue-2026-11-10-2300.log`: V7-FLUIDS-3 + CONSTRUCTION-2 (ทำต่อจากรอบค้าง) → V7-CLOUDS + WORKER-COOK
2. `queue-2026-11-10-after2300.log`: หลังข้อ 1 จบ → QUEST-ART (ศัตรู 6 + ท่า 3) และ **FOOD-CONTINUE อัตโนมัติ ถ้า Toby ยังไม่ส่งรายงานอาหารและไม่มี commit ใหม่ 45 นาที** (= Claude ชนลิมิต)
- ถ้า Codex ชนลิมิต: คิวหยุดเอง + work-mode → claude-only
- งานเสร็จแล้วรอตรวจ: HD-FULL 3–8, ASSEMBLE (`20261110T115811Z-6ad6e037` ยังเกินเกณฑ์ structure 7 จุด ≤5 px)

## ถ้า Claude หมด weekly ก่อนงานเสร็จ (คุณเป้สั่ง Codex app ได้เอง)
- ระบบอาหารยังไม่เสร็จ และคิวอัตโนมัติไม่ได้ปล่อย FOOD-CONTINUE → ให้ Codex app อ่าน `Output/Claudy/briefs/2026-11-10-avegee-food-system-continue.md` แล้วทำใน worktree ใหม่จาก branch `claude/2026-11-05-zone1-v5-fx`
- รวมงานวาดเข้าเกม (ทำหลัง Claude กลับ หรือ Codex app): ASSEMBLE v7 → fluids/clouds/construction/cook ตามรายงานแต่ละ run
- ห้ามแตะโฟลเดอร์ `Documents/Work PAE/Claude/AVEGEE` ถ้ายังมีงาน Codex app ค้าง · ห้าม merge main จนกว่าคุณเป้สั่ง (เงื่อนไขเดิม: พื้น HD ครบ + Dale รีวิว)

## ค้างคำตัดสินคุณเป้
- สัดส่วนศัตรูชายแดน 30/45/25 และรางวัล ×1/1.25/1.5 · บอสอึด ×1.8 · สีแสงวาบโซน · หัวหน้าชายแดนใช้จังหวะ 2,4,6 ไหม
- ข้อความระบบชั่วคราวในฉากสู้ภารกิจ (ให้ Rae เกลา)
- ภายหลัง: WebGL หลังพื้น HD ครบ · ถอดตั้งค่ากราฟิกเมื่อ WebGL ลื่น

## เพิ่ม 23:10 — พื้น HD โซน 2–4 + อนุญาต merge
- คุณเป้: "ถ้าวาดแผนที่ 4 โซนเสร็จแล้ว push ขึ้น main ได้เลย"
- คิวยาว `Output/Codex/runs/queue-z234-hd.py` (log `queue-z234-hd.log`): รอ after2300 จบ → โซน 2, 3, 4 โซนละ 5 run (4 chunk/run, ขนาน 2) + ASSEMBLE · ใบงาน `Output/Claudy/briefs/2026-11-10-avegee-z234-hd-*.md`
- **ชนลิมิตแล้วรอ reset เองและรันต่อ** (สลับ work-mode ให้) — ใช้หลายวัน · ถ้า Mac รีสตาร์ท คิวหาย ต้องสั่งใหม่: `cd "<AGAPAE Agent>" && nohup caffeinate -dims python3 Output/Codex/runs/queue-z234-hd.py &` (ระวัง run ที่เสร็จแล้วจะรันซ้ำ — แก้ GROUPS ก่อน)
- งานที่คิว 23:00 ค้างถ้าชนลิมิต (CLOUDS/COOK/QUEST-ART/FOOD-CONTINUE) **ไม่ resume เอง** — Claudy ต้องสั่งใหม่
- merge: ครบ 4 โซน → Toby เสียบพื้นทุกโซน → Dale รีวิว → merge main
