# ใบงาน L-merge-2: Dale รีวิว + merge L2 แล้ว L5 (ต่อจาก L-merge-1)

## บริบท
- ทำหลัง L-merge-1 (L3 → L1) เสร็จ · กติกาเดิมทุกข้อของ `2026-10-15-avegee-l-merge-1.md` (ฐานเทสต์แดง 10 ข้อของ Codex app, push ถูกปฏิเสธ → รายงาน SHA+คำสั่ง ห้ามอ้อม)
- **L2** `toby/l2-ui` HEAD `dd2813e` (worktree `.toby-worktrees/l2`) — รายงาน `Output/Toby/2026-10-15-avegee-l2-ui.md` (รอบ 2 ยังไม่เติมในรายงาน: ตัดกล่องเลือกผู้รับไอเท็ม/พลัง + ไฮไลต์เขียว "เลือกเป้าหมาย" · เอฟเฟกต์เติมเลือด/พลังเวท `src/heal-fx.js` CSS ล้วน) · ใบงาน `2026-10-15-avegee-l2-battle-trial-pause.md`
  ตรวจ: ป้องกัน (โล่ + x0.5), หนี (หน้าต่างยืนยัน, บอสจาง), ตัวที่ถึงเทิร์นไม่ทับ, เมนูไม่ทับทีม, ไม่มีกล่องคำแนะนำใดๆ, สอบสวนรูปที่เลือก/ตัวขาว/พลังเวท, pause ไม่มีขอบทอง, เอฟเฟกต์เติมเลือดหลายตัวพร้อมกัน
  ภาพของ Toby: `/tmp/l2/` (Claudy ดู `healfx-multi-300.png` แล้ว ผ่าน)
- **L5** `toby/l5-encounter` `9dccf0f` (worktree `.toby-worktrees/l5`) — รายงาน `Output/Toby/2026-10-15-avegee-l5-auto-encounter.md` · **merge หลัง L2** ชนแค่ cache-bust (`ui.js`, `index.html`, `output/game-review/index.html` → ใช้ฝั่ง L2 ต่อ `-l5`)
  ตรวจ: ดันเจี้ยนชายแดน ศัตรูเห็น → ❗ → ไล่ → เข้าศึกเอง · หนีผ่านหน้าต่าง L2 → ถอยกลับ + cooldown 4 วิ · ศัตรูในเมืองยังใช้ปุ่ม
- ทำความสะอาด CSS `.fig.you.healing` ที่ไม่ใช้แล้วได้ถ้าเทสต์ `30b` ปรับตาม (ไม่บังคับ)

## เกณฑ์รับงาน
PASS/FIX LIST ต่องาน + SHA + Pages (หรือคำสั่ง push ที่ค้าง) + เทสต์เทียบฐาน · รายงาน `Output/Dale/2026-10-15-avegee-l-merge-2.md` · ล้าง worktree/branch toby ที่ merge แล้ว
