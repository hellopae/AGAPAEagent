# ใบงาน K5: AVEGEE — กล่องคำแนะนำ/เมนูย่อยหน้าต่อสู้ไม่บังศัตรู · เจ้าของ Toby

## บริบท
- ต่อจาก K2 (Dale review: `Output/Dale/2026-10-15-avegee-k2-review.md` หัวข้อ "ข้อสังเกตเล็กที่ไม่ได้แก้")
  1. กล่องคำแนะนำ "คลิกศัตรูบนสนามเพื่อโจมตีทันที" (`.battle-command-preview`) ยังบังตัวศัตรูตัวแรกทางสายตา (คลิกทะลุได้แล้ว)
  2. flyout พลัง/ไอเท็มกว้าง ~280px ทับแถบ HP ของศัตรูตัวที่สอง
- ภาพตัวอย่างที่ต้องการ: `Output/Claudy/briefs/assets/2026-10-15-avegee-k/k2-ref-battle-Battle9.jpg` · ภาพเทียบหลัง K2: `Output/Dale/k2-review/compare-battle.jpg`
- repo `/Users/agapae/agapae-work/AVEGEE` · อ่าน `docs/ui-work-coordination-2026-10-15.md` — Codex app ถือไฟล์ animation ยม (`drawStandee`, sprite ยม) ห้ามแตะ · Dale กำลัง merge K1d (แผนที่) — ห้ามแตะ `town-*`

## งาน
1. ย้าย/ย่อกล่องคำแนะนำให้ไม่ทับศัตรูทุกตัวและไม่ทับทีมเรา (เช่น แถบบางใต้หัวเมนู หรือข้อความเล็กเหนือแถวศัตรู) — คำนวณจากตำแหน่งศัตรูจริง ไม่ใช่ค่าตายตัว
2. flyout พลัง/ไอเท็ม: จำกัดความกว้าง/ตำแหน่งไม่ให้ทับแถบ HP หรือตัวศัตรู ถ้าที่ไม่พอให้เปิดไปอีกด้านหรือย่อชื่อด้วย ellipsis ท้ายคำ (ห้ามตัดกลางคำแบบเดิม)
3. ทดสอบ 1, 2, 3 ศัตรู และบอส (ภาพ 1678×937 DPR2) · คลิกศัตรูหลังเลือกพลังยังติด 10/10 (`page.mouse`)
4. `node --test tests/*.test.mjs` ผ่าน · cache-bust `-k5` · ทำใน worktree `../.toby-worktrees/k5` branch `toby/k5-battle` แล้ว rebase บน main ล่าสุดก่อนจบ (ไม่ merge — Dale รีวิว)

## ข้อห้าม
- ไม่เปลี่ยนสไตล์เมนูที่ K2 ทำไว้ (เอียง/ขั้นบันได/สี) · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ภาพหลักฐาน `/tmp` เท่านั้น

## เกณฑ์รับงาน
ภาพ 4 แบบ (1/2/3 ศัตรู/บอส) ไม่มีอะไรบังศัตรูหรือแถบ HP · คลิกติด · เทสต์ผ่าน · รายงาน `Output/Toby/2026-10-15-avegee-k5-battle-overlap.md`
