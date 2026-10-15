# คิวงาน AVEGEE ชุด L (15 ต.ค. 2569) — Claudy อัปเดตไฟล์นี้ทุกครั้งที่สถานะเปลี่ยน

คำสั่งต้นฉบับ: `Output/Kittanate-source/2026-10-15-avegee-l-requests.md` · โหมด `both` · ทุกงานโค้ด → Dale รีวิว + merge

| งาน | เจ้าของ | ใบงาน | ขึ้นกับ | สถานะ |
|---|---|---|---|---|
| K1e ของตกแต่ง 5 ชิ้น (ปาล์ม โคม คบ ต้นแดง ต้นหิมะ) | Codex | `2026-10-15-avegee-k1e-town-props-art.md` | — | Codex เสร็จ → Dale รีวิว (`k1e-review`) |
| L1 แผนที่ไม่ลอย: มาสก์เคลียร์พื้น + เงา + ย่อตัวละคร | Toby | `2026-10-15-avegee-l1-map-depth.md` | — | กำลังรัน |
| L1b เคลียร์พื้นใต้ของที่วาง (inpaint แผนที่ละเอียด) | Codex | (เขียนเมื่อได้มาสก์จาก L1) | L1 ขั้น 1 | รอ |
| L2 ต่อสู้ ป้องกัน/หนี/ตำแหน่ง + สอบสวน รูปที่เลือก/ขาว/พลังเวท + pause | Toby | `2026-10-15-avegee-l2-battle-trial-pause.md` | — | กำลังรัน |
| L3 ปุ่มยมทูตพักศาลาน้ำชา + สะกดจิตเป็นรางวัลบอสชายแดนโซน 3 | Toby | `2026-10-15-avegee-l3-crew-rest-hypno.md` | — | Toby เสร็จ `toby/l3-crew-hypno` fac5c9f → รอ Dale (หลัง K1e/L4) |
| L4a ดาบหน้าแท่น ป่าดาบอสิปัตตะ | Codex | `2026-10-15-avegee-l4a-asipatta-swords.md` | — | วาดเสร็จ (rate_limited กลางทาง) → Dale เก็บงาน (`l4-review`) |
| L4b ไอคอนชุดประจำโซน ร้านพ่อค้า | Codex | `2026-10-15-avegee-l4b-outfit-icons.md` | — | วาดเสร็จ (rate_limited กลางทาง) → Dale เก็บงาน (`l4-review`) |
| ART-02C ตรวจชายฝั่ง/ท่าเรือ บนแผนที่ใหม่ | Toby→Mind | (เขียนใหม่) | L1+L1b merge | พัก (คุณเป้ให้ทำหลังแผนที่เสร็จ) |

ลำดับ merge (Dale): K1e → L1 → L1b → L2 → L3 → L4a → L4b (ใครเสร็จก่อนเข้าก่อนได้ ถ้าไม่ชนไฟล์) · ชนกันที่ cache-bust/`index.html` ให้ rebase
ถ้า Codex `rate_limited` → `work-mode.json` = claude-only แล้วงานวาดรอ, งานโค้ดของ Codex (การเสียบภาพ) ให้ Toby ทำแทน

**15 ต.ค. 14:45** Codex rate_limited ถึง 18:21 → claude-only · L1b รอ Codex
