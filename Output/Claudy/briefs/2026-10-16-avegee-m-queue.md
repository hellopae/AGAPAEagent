# คิวงาน AVEGEE ชุด M (16 ต.ค. 2569) — กล้อง + เอฟเฟกต์ฉากต่อสู้/สอบสวน

คำสั่ง: `Output/Kittanate-source/2026-10-16-avegee-m-requests.md` · อ้างอิงวิดีโอ Octopath 0 · โหมด `both`

| งาน | เจ้าของ | ใบงาน | ขึ้นกับ | สถานะ |
|---|---|---|---|---|
| M1 กล้องซูมเข้า-ออก/สั่น/มืดฉากหลัง (ต่อสู้+สอบสวน) | Toby | `2026-10-16-avegee-m1-battle-camera.md` | — | Toby เสร็จ `toby/m1-camera` 1c10cfc (1010/0) → Dale `m-merge` |
| M2 เอนจินเอฟเฟกต์ + สูตรทุกท่า + สเปกอาร์ต | Toby | `2026-10-16-avegee-m2-battle-fx.md` | API กล้องจาก M1 | Toby เสร็จ `toby/m2-fx` 75c2771 (22 สูตร, เทสต์ 1013/0) → รอ M1 แล้ว Dale |
| M3 วาด texture เอฟเฟกต์ `img/fx/*` + ไอคอนโล่ | Codex | `2026-10-16-avegee-m3{a,b}-fx-art.md` (สเปก `Output/Toby/2026-10-16-avegee-m2-art-spec.md`) | — | A 33 ไฟล์ + B 24 ไฟล์ เสร็จ (backup `agapae-work/backup/avegee-m3-fx/`) · ⚠️ `fx-hypno-circle` มีดาวหกแฉก (สัญลักษณ์ศาสนายิว) → วาดใหม่เป็นยันต์/ลายไทย (M3c) |
| M4 มือถือ 390px: เมนูคำสั่งบังศัตรู/กดศัตรูไม่ได้ · หัวเมนูยักษ์ทวารบาลว่าง | Toby | (ถัดไป) | M-merge | รอ |
| M5 ภาพคั่นท่าพิเศษ คงไว้ + เคลื่อนไหว/อลังการขึ้น | Toby | `2026-10-16-avegee-m5-cutin-fx.md` | M-merge | กำลังรัน (ออกแบบระหว่างรอ merge) |
| M-merge | Dale | `2026-10-16-avegee-m-merge.md` (กำลังรัน) | M1, M2 (M3 สลับภาพทีหลังได้) | รอ |

ชุด L ที่ค้าง (Codex app ตาม `docs/claude-handoff-2026-10-16.md`): แสงโซน 1, L1b, L2b, เทสต์แดง 6

**16 ต.ค. 14:05** Claude reset · Codex app ปิด handoff ครบ (main `19d1afe`: แผนที่ v4 เคลียร์พื้น, แสง, ❗, เทสต์ 996/996; `be307b5` animation ท่าต่อสู้ 4 โซน) · resume Toby M1/M2 + แจ้ง rebase บน 19d1afe

## ชุด N (16 ต.ค. ~14:30 คำสั่งคุณเป้ ภาพ 7–10 + ลาวาไหล)
| งาน | เจ้าของ | ใบงาน | สถานะ |
|---|---|---|---|
| N1 ท่าเรือ (เดินเลยขอบ/ปุ่ม Fast Travel/ป้ายบอส) + ห้องหอส่องกรรม (จุดฝึก/กระจก) | Toby | `2026-10-16-avegee-n1-harbour-krajok.md` | กำลังรัน |
| N2 sprite ท่าโจมตียมทูตรั่วขอบ + ยมสอบสวนยืนนิ่ง | Toby | `2026-10-16-avegee-n2-sprite-bleed-trial-idle.md` | Toby เสร็จ `toby/n2-sprite-idle` b8512a9 (1001/0) → รอ Dale · ⚠️ 203/448 เฟรมตัวละครถูกตัดขอบ ต้อง export atlas ใหม่ช่อง 512 (Codex app — สเปก `docs/n2-sprite-bleed.md`, `docs/n2-clipped-frames.json`) |
| N3 ตรวจข้อความข้อบรรเทา 🪷 ทุกคดี | Rae | `2026-10-16-avegee-n3-merit-audit.md` | ✅ 75 ข้อ ไม่ผ่าน 10 (`Output/Rae/2026-10-16-avegee-merit-audit.md`) |
| N3b ข้อความ 🪷 ใหม่ 10 ข้อ + บุญสุ่มไม่ตรงเพศ | Toby | `2026-10-16-avegee-n3b-merit-apply.md` | Toby เสร็จ `toby/n3b-merit` 2cbe3e1 (1002/0) → รอ Dale หลัง M-merge |
| N4 ลาวา/แม่น้ำ/น้ำตกไหล | Toby | `2026-10-16-avegee-n4-flowing-water-lava.md` | กำลังรัน |
