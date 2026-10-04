# ใบงาน 30-R5 (Dale): รีวิว + merge (1) 30D แผนที่ (Toby) แล้ว (2) 30F ภาพ (Codex)

**Repo: `/Users/agapae/agapae-work/AVEGEE`** · main = `278d09c` · ห้ามลองเข้า `Claude/AVEGEE` เดิม · ถ้าโดนบล็อกสิทธิ์ให้หยุดและรายงาน
แบบรีวิวที่ผ่านมา: `Output/Dale/2026-10-04-avegee-30-r4-review.md` · **commit ทีละส่วน** (merge 30D เสร็จ push ก่อน แล้วค่อยเริ่ม 30F) กันลิมิตตัดกลางทาง

## ส่วนที่ 1 — 30D (branch `toby/30d`, worktree `~/agapae-work/.codex-worktrees/toby-30d`, ล่าสุด `bc0c586`, ฐาน `fcde11d`)
ใบงาน: `30d-map.md` + `30d-toby.md` · รายงาน Toby `Output/Toby/2026-10-04-avegee-30d.md` · หลักฐาน `Output/Toby/30d/`
- Claudy รับไว้แล้ว: #11 = `st-lokan-asia` (ถูกต้อง ใบงานเดาผิด) · #13 = `st-sala-west` · กลับด้านด้วย `STATION_FLIP` ไม่แก้ไฟล์ภาพ → **รับ** · taan โซน 4 ใช้ตัวคูณ `STANDEE_FIT` → **รับ**
- rebase บน main · เทสต์ทั้งหมด · เบราว์เซอร์ 1280/1440: คลิกน้ำ/ลาวา/อาคาร/ยมทูต ทุกโซน → ไม่เข้า · เข้าอาคารทุกหลังได้ (รวม 2 หลังที่กลับด้าน) · ปุ่ม "เข้าไป" ชิดอาคาร · ชายแดนโซน 4 ปุ่มกลับเดียวสีทองขึ้นเมื่อใกล้ · ป้ายปีศาจบุก · taan ขนาดเท่าคนอื่น · ไม่ทำให้ฉากต่อสู้/ห้อง/pause พัง
- ผ่าน → merge + bump cache ถ้าจำเป็น + push · ลบ worktree/branch local · **ลบ `Output/Toby/30d/`** (คุณเป้อนุญาตลบหลักฐานงานที่ merge แล้ว — เก็บ .md)

## ส่วนที่ 2 — 30F (Codex run `20261004T124533Z-8ff6fc07`)
- ใบงาน `30f-art.md` · รายงาน `Output/Codex/runs/20261004T124533Z-8ff6fc07/report.md`
- **ระวัง: Codex ทำงานในรีโปซ้อน** `~/agapae-work/.codex-worktrees/20261004T124533Z-8ff6fc07/avegee-30f/` (branch `codex/avegee-30f`) — ดึง diff/ไฟล์ภาพจากรีโปซ้อนลง branch สะอาดจาก main แบบที่ทำกับ 29H · ไม่ merge branch ชั้นนอก
- Codex บอก: ภาพ Rage ใหม่ `img/story-asia-03.png`, cyberhell tarang/krajok ใหม่, manifest, `src/art.js`, `src/data.js`, เทสต์ 331/331 · **ยังไม่ได้ตรวจเบราว์เซอร์เลย**
- เปิดภาพทุกใบด้วยตา: Rage perspective ถูก ไม่มีตัวหนังสือ · tarang/krajok สไตล์ cyberhell isometric พื้นโปร่งใส · แผนที่โซน 4 ไม่มีอาคารทับสิ่งก่อสร้าง เข้าอาคารได้ (หลังรวมกับมาสก์ห้ามเดินของ 30D) · ขนาดไฟล์ภาพไม่เกิน 2 MB ต่อใบ (เกิน → แปลง webp)
- ผ่าน → merge + bump cache + push + live · ไม่ผ่าน → FIX LIST ระบุไฟล์ · ลบ worktree หลัง merge · หลักฐาน Codex ไม่ commit เข้า AVEGEE

## รายงาน
`Output/Dale/2026-10-04-avegee-30-r5-review.md` + ภาพย่อ JPEG `Output/Dale/30d-shots/`, `30f-shots/` (เฉพาะที่จำเป็น) · แยกผลสองส่วน PASS/FIX LIST + commit + roll back
