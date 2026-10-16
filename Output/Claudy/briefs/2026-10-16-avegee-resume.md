# จุดพักงาน AVEGEE — 16 ต.ค. 2569 ~15:00 (Claude ใกล้ลิมิต) · อ่านไฟล์นี้ก่อนทำต่อ

คิวเต็ม: `Output/Claudy/briefs/2026-10-16-avegee-m-queue.md` (ชุด M + N) · ชุด L จบแล้ว (`2026-10-15-avegee-l-queue.md`)
main AVEGEE ล่าสุดที่รู้: `19d1afe` (Codex) — เช็ก `git -C /Users/agapae/agapae-work/AVEGEE log origin/main -5` ว่า Dale merge M ไปแล้วหรือยัง

## งานที่กำลังรันตอนพัก (ทุกงานทำใน worktree ของตัวเอง ไม่หาย — ทำต่อจาก branch ได้)
| งาน | ใคร | ใบงาน | branch / worktree | สถานะตอนพัก |
|---|---|---|---|---|
| M-merge (กล้อง M1 + เอฟเฟกต์ M2 + ภาพ M3 + วงสะกดจิตใหม่ M3c) | Dale | `2026-10-16-avegee-m-merge.md` | `toby/m1-camera` 1c10cfc, `toby/m2-fx` 75c2771 · ภาพ `/Users/agapae/agapae-work/backup/avegee-m3-fx/{A,B,C}` (C = hypno-circle ใหม่ ใช้แทนของ B) | กำลัง merge |
| M5 ภาพคั่นท่าพิเศษ เคลื่อนไหว/อลังการขึ้น (คุณเป้ให้**คงภาพคั่น**) | Toby | `2026-10-16-avegee-m5-cutin-fx.md` | `toby/m5-cutin` (`.toby-worktrees/m5`) | เพิ่งเริ่ม · รอ M-merge ขึ้น main ก่อนเขียนโค้ด |
| N1 ท่าเรือ (เดินเลยขอบ/ปุ่ม Fast Travel/ป้ายบอสยมทัต) + หอส่องกรรม (จุดฝึก/กระจก) | Toby | `2026-10-16-avegee-n1-harbour-krajok.md` | `toby/n1-harbour-krajok` (`.toby-worktrees/n1`) | กำลังทำ |
| N2 sprite ท่าโจมตียมทูตรั่วขอบ + ยมสอบสวนยืนนิ่ง | Toby | `2026-10-16-avegee-n2-sprite-bleed-trial-idle.md` | `toby/n2-sprite-idle` (`.toby-worktrees/n2`) | กำลังทำ |
| N3b ข้อความ 🪷 ใหม่ **10 ข้อ** + บุญสุ่มไม่ตรงเพศ | Toby | `2026-10-16-avegee-n3b-merit-apply.md` | `toby/n3b-merit` (`.toby-worktrees/n3b`) | กำลังทำ · คุณเป้ตัดสินแล้ว: ปล่อยปลา → "ปล่อยปลาทุกวันเกิดมาตลอดชีวิต" v:1 · ญาติอุทิศ → "ช่วยงานศพคนในหมู่บ้านไม่เคยเว้นสักงาน" v:1 (ข้อความอื่นจาก `Output/Rae/2026-10-16-avegee-merit-audit.md`) |
| N4 ลาวา/แม่น้ำ/น้ำตกไหล | Toby | `2026-10-16-avegee-n4-flowing-water-lava.md` | `toby/n4-flow` (`.toby-worktrees/n4`) | กำลังทำ |

## ทำต่อหลัง reset (Claude)
1. ถ้า session เดิมยังอยู่: SendMessage หา agent เดิมให้ "limit reset แล้ว ทำต่อจากที่ค้าง" (Dale M-merge, Toby M5/N1/N2/N3b/N4)
2. ถ้าเป็น session ใหม่: เปิด agent ใหม่ต่อใบงาน + บอก branch/worktree ข้างบน + "ทำต่อจาก commit ล่าสุดใน branch อย่าเริ่มใหม่" · ใช้ skill `long-sprint-survival`
3. ลำดับ merge (Dale): M-merge → M5 → N3b → N2 → N1 → N4 (ชนกันส่วนใหญ่แค่ cache-bust ใน `index.html`/`ui.js`/importmap)
4. เทสต์ฐาน main = 0 แดง · push ถูกปฏิเสธ → รายงาน SHA + คำสั่งให้คุณเป้ push

## งานค้างอื่น
- M4 มือถือ 390px: เมนูคำสั่งบังศัตรู/กดศัตรูไม่ได้ · หัวเมนูยักษ์ทวารบาลว่าง (ยังไม่เขียนใบงาน)
- ข้อความ i18n ชั่วคราว: ตั้งค่า "เอฟเฟกต์กล้อง" (M1), หน้าต่างหนี/ตั้งรับ (L2) → Rae
- ART-02C ตรวจชายฝั่ง/ท่าเรือบนแผนที่ใหม่ (พักไว้)
- เครื่องกัน sleep ด้วย `caffeinate` (background task ของ session เดิม)
