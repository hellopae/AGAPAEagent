# คิวงาน AVEGEE ชุด L (15 ต.ค. 2569) — Claudy อัปเดตไฟล์นี้ทุกครั้งที่สถานะเปลี่ยน

คำสั่งต้นฉบับ: `Output/Kittanate-source/2026-10-15-avegee-l-requests.md` · โหมด `both` · ทุกงานโค้ด → Dale รีวิว + merge

| งาน | เจ้าของ | ใบงาน | ขึ้นกับ | สถานะ |
|---|---|---|---|---|
| K1e ของตกแต่ง 5 ชิ้น (ปาล์ม โคม คบ ต้นแดง ต้นหิมะ) | Codex | `2026-10-15-avegee-k1e-town-props-art.md` | — | ✅ ขึ้น main `a30b7e9` (คุณเป้ push 23:24) |
| L1 แผนที่ไม่ลอย: มาสก์เคลียร์พื้น + เงา + ย่อตัวละคร | Toby | `2026-10-15-avegee-l1-map-depth.md` | — | Toby เสร็จ `toby/l1-depth` b278303 (+นิราบนแท่น) → รอ Dale |
| L1b เคลียร์พื้นใต้ของที่วาง (inpaint แผนที่ละเอียด) | Codex | `2026-10-15-avegee-l1b-map-clear.md` | L1 ขั้น 1 (มาสก์เสร็จ 14:19) | Codex rate_limited ถึง 23:55 → รันใหม่ 23:57 |
| L2 ต่อสู้ ป้องกัน/หนี/ตำแหน่ง + สอบสวน รูปที่เลือก/ขาว/พลังเวท + pause | Toby | `2026-10-15-avegee-l2-battle-trial-pause.md` | — | Toby เสร็จ `toby/l2-ui` dd2813e (+ตัดกล่องเลือกผู้รับ, เอฟเฟกต์เติมเลือด) → Dale `l-merge-2` |
| L3 ปุ่มยมทูตพักศาลาน้ำชา + สะกดจิตเป็นรางวัลบอสชายแดนโซน 3 | Toby | `2026-10-15-avegee-l3-crew-rest-hypno.md` | — | Toby เสร็จ `toby/l3-crew-hypno` 7023140 (ริบสะกดจิตเซฟเก่าตามคุณเป้) → รอ Dale (หลัง K1e/L4) |
| L4a ดาบหน้าแท่น ป่าดาบอสิปัตตะ | Codex | `2026-10-15-avegee-l4a-asipatta-swords.md` | — | วาดเสร็จ (rate_limited กลางทาง) → Dale เก็บงาน (`l4-review`) |
| L4b ไอคอนชุดประจำโซน ร้านพ่อค้า | Codex | `2026-10-15-avegee-l4b-outfit-icons.md` | — | วาดเสร็จ (rate_limited กลางทาง) → Dale เก็บงาน (`l4-review`) |
| L5 ศัตรูระหว่างทางขยายชายแดน/ย้ายโซน เดินเข้าหา→ตัดเข้าศึกเอง | Toby | `2026-10-15-avegee-l5-auto-encounter.md` | ใช้หนีจาก L2 | Toby เสร็จ `toby/l5-encounter` 9dccf0f → Dale `l-merge-2` (หลัง L2) |
| L2b ไอคอนโล่ป้องกัน `img/ui/icon-defend-shield.png` 128×128 | Codex | (เขียนเมื่อ Codex ว่าง) | L2 merge | รอ (ตอนนี้ใช้โล่วาดด้วยโค้ด) |
| L2c ตรวจข้อความไทยใหม่ (หน้าต่างหนี/ตั้งรับ/เหตุผลหนีไม่ได้) | Rae | (สั้น) | L2 merge | รอ |
| ART-02C ตรวจชายฝั่ง/ท่าเรือ บนแผนที่ใหม่ | Toby→Mind | (เขียนใหม่) | L1+L1b merge | พัก (คุณเป้ให้ทำหลังแผนที่เสร็จ) |

ลำดับ merge (Dale): K1e → L1 → L1b → L2 → L3 → L4a → L4b (ใครเสร็จก่อนเข้าก่อนได้ ถ้าไม่ชนไฟล์) · ชนกันที่ cache-bust/`index.html` ให้ rebase
ถ้า Codex `rate_limited` → `work-mode.json` = claude-only แล้วงานวาดรอ, งานโค้ดของ Codex (การเสียบภาพ) ให้ Toby ทำแทน

**15 ต.ค. 14:45** Codex rate_limited ถึง 18:21 → claude-only · L1b รอ Codex

**15 ต.ค. 22:45** Claude limit reset 22:40 · Codex app push animation ยม (acc9c43) + แสงนรกโซน 1/เสาไฟไทย/แสงคบไฟ (69ed45e, 8f82178 — แตะ town-lighting/scenery/terrain/layout) → ทุกสายต้อง rebase บน 8f82178 · K1e คบไฟอาจซ้ำกับเสาไฟไทยของ Codex — Dale ตัดสินจากภาพ

**15 ต.ค. ~23:30** push AVEGEE main ถูก classifier ปฏิเสธ → คุณเป้ต้อง push `a30b7e9` เอง · เทสต์บน main 8f82178 แดง 10 ข้อจากงาน Codex app → โน้ต `2026-10-15-avegee-codex-app-test-failures.md` ให้ Codex app ตรวจ

**15 ต.ค. 23:25** คุณเป้ push a30b7e9 · Dale เริ่ม L-merge-1 (L3 → L1) · L2 รอ Toby เพิ่ม (ตัดกล่องเลือกเป้าหมายไอเท็ม + เอฟเฟกต์เติมเลือด) แล้วค่อย merge L2 → L5 · ตัวเฝ้า L1b เปลี่ยนให้ตอบเฉพาะ commit ของ Codex app (ไม่ใช่ K*/L*)
