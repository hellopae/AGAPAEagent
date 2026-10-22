# ใบงาน P7-apply: AVEGEE — วางข้อความคู่มือ/โปรไฟล์ที่ผ่านแล้ว · เจ้าของ Toby

## บริบท
- Rae ตรวจคู่มือทั้งเล่มเทียบโค้ด → Reese FIX LIST 5 ข้อ → Rae แก้รอบเดียว → **Claudy รับงาน 22 ต.ค. 2569** (ไม่ตรวจซ้ำ)
- แหล่งข้อความ: `Output/Rae/2026-10-22-avegee-p7-copy-audit.md` — บล็อกพร้อมวาง หัวข้อ 1–6 + **หัวข้อ 7 "รอบแก้"** (7.1–7.6 ใช้แทนของเดิมเมื่อขัดกัน)
- ผลตรวจ: `Output/Reese/2026-10-22-avegee-p7-factcheck.md`
- **`// CHECK` ข้อ 7.1 ปิดแล้ว:** Claudy ค้น `metta` ทั้ง `src/` — ไม่อยู่ในสูตรกรรม/เร่งทัณฑ์ (มีแค่ data/roster/save/training/แสดงผล) → วางข้อความ 7.1 ได้เลย

## เริ่มเมื่อ
P3 (`toby/p3-verdict-cutscene`) merge เข้า main แล้ว — เพราะแก้ `src/ui.js` ชุดเดียวกัน · แตก branch `toby/p7-apply` จาก main ล่าสุด · worktree `/Users/agapae/agapae-work/.toby-worktrees/p7`

## ขั้นตอน
1. วางบล็อกคู่มือ `src/sentencing-guide.js` ทุกบทตามตาราง (บล็อก B/C ใช้ฉบับหัวข้อ 7)
2. `src/ui.js` `crewNote()` ~877-882 → ฟังก์ชันใหม่หัวข้อ 7.2 · openHelp ~2065 → 7.1 · `verdictCard()` ~674 ตัด `` `ระเบียบ ${r.rab}` `` ออกจาก `kv([...])` (7.3)
3. `soulTraitGuide` ย่อหน้าม่วง (7.4) · ข้อความ P1 (`src/i18n.js` `unlock.*` `hire.*` `sleep.needTea`, บทเรียน build ใน `src/data.js`)
4. P6: ย้ายข้อความฝังใน `src/minigames/krata-qte.js` เข้า i18n ตาม key ที่ Rae เสนอ
5. เทสต์ทั้งชุด 0 แดง (เทสต์ที่ล็อกข้อความเดิมให้อัปเดตตามข้อความใหม่ ไม่ลบเทสต์) · cache-bust ไฟล์ที่แก้
6. commit บน branch → รายงาน → Dale merge

## ข้อห้าม
ไม่เปลี่ยนตรรกะเกม/ตัวเลข — ข้อความเท่านั้น (ยกเว้นตัด rab ใน verdictCard) · ไม่เขียนข้อความใหม่เอง ถ้าบล็อกไม่พอดีตำแหน่ง จดไว้ในรายงาน

## ไม่อยู่ในงานนี้ → P8
NIT a–f ของ Reese (`TUTOR.fight` กล่องยา, "ห้าดาวครบห้าครั้ง = เลื่อนขั้น", explainBar ตะรางขยาย, `g5.hit/miss*` ครั้งสุดท้าย, ปุ่มสร้าง "Lv." ui.js ~590)

## เกณฑ์รับงาน
1. ทุกบล็อกในหัวข้อ 1–7 อยู่ในโค้ดครบ หรือจดเหตุผลที่วางไม่ได้
2. verdictCard ไม่โชว์ระเบียบ · crewNote ไม่อ้างผลที่ judge() ไม่มี
3. เทสต์ 0 แดง · รายงาน `Output/Toby/2026-10-22-avegee-p7-apply.md`
