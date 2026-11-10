# QUEST-ART — วาดศัตรูฉากต่อสู้ภารกิจ 6 ตัว + ท่าไม้ตายใหม่ 3 ท่า · 10 พ.ย. 2569 (Codex)

Repo: AVEGEE worktree ของ run นี้ (แตกจาก branch `claude/2026-11-05-zone1-v5-fx` ที่มี `src/quest-fights.js` แล้ว) · **ImageGen ในตัวเท่านั้น** ห้าม Shado · ห้าม commit/push/merge เอง
สเปกครบ (ชื่อไฟล์ ขนาด prompt ข้อควรระวัง): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-11-10-avegee-quest-rewards.md` หัวข้อ "สเปกอาร์ตที่ต้องการเพิ่ม" · บทฉาก: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Rae/2026-11-10-avegee-quest-battle-script.md`
นำหน้า prompt ด้วยบล็อกสไตล์จาก `ASSET-PROMPTS.md` · ห้ามมีตัวอักษรในภาพ

## ชิ้นงาน (ลำดับความสำคัญ)
1. ศัตรู 6 ตัว PNG พื้นใส 512×512 ท่ายืน: `mob-q-debtor`, `mob-q-collector`, `mob-q-gauze-big`, `mob-q-gauze`, `mob-q-tale-big`, `mob-q-tale`
2. ท่า 3 ท่า (เนตรรอคำอนุญาต · คำฝากถึงมือ · ทวารบาลยืนรับแค้น): ไอคอน 256×256 RGBA วงกลม · cutscene 2 เฟรม 1375×768 `<kind>-<id>-cut-01/02.webp` · effect 1 ไฟล์ (512 หรือ 768) — ตัวละครต้องเป็นตัวเดิมในเกม (ดู sprite/cutscene เดิมของซาโตริ เกรซ ยักษ์ทวารบาล)
3. ถ้าเวลาเหลือ: เสียบเข้าเกมตามที่สเปกบอก (แก้ 1 บรรทัดต่อตัวใน `src/quest-fights.js`, ลบแถวใน `QUEST_ART_PLACEHOLDER` ของ `src/combat-skill-assets.js`) แล้วรัน `node --test tests/*.test.mjs` ต้องผ่านหมด
- ข้อควรระวัง: ผ้าก๊อซห้ามคล้ายผ้าห่อศพ/ผ้าไตร ไม่ล้อเลียนผู้ป่วย · เงาแค้นไม่มีใบหน้า

## ส่งออก
`docs/art-reviews/2026-11-10-quest-art/` (ไฟล์ทั้งหมด + `contact-sheet.jpg` + README ไทย) ≤ 40 MB · ถ้าเสียบแล้ว ใส่ไฟล์ที่ `img/` ตามสเปก

## เกณฑ์รับงาน
1. ศัตรู 6 ตัวครบ พื้นใสสะอาด สไตล์เข้ากับปีศาจเดิม 2. ท่า 3 ท่าครบ ตัวละครหน้าเหมือนเดิม 3. ถ้าเสียบ เทสต์ผ่านหมด
