# ใบงาน Dale — รีวิว + รวม FOOD-SYSTEM ของ Codex เข้า branch เกม · 11 พ.ย. 2569

## บริบท
- ระบบข้าวปั้นใหม่ (ใบงาน `Output/Claudy/briefs/2026-11-10-avegee-food-system.md` ข้อ 1–8) มี 2 ชุด: Toby ทำค้าง (ไม่ผ่านเทสต์ 14 ข้อ สำรอง patch ที่ `Output/Toby/food-system-wip-1111/`) กับ **Codex ทำเสร็จ** → Claudy เลือกชุด Codex
- Codex: branch `codex/20261110T170257Z-8cc706fc` commit `9f80b850` (35 ไฟล์) ฐาน `3075bdf5` = HEAD ของ `claude/2026-11-05-zone1-v5-fx` (fast-forward ได้) · รายงาน Codex: `docs/handoffs/2026-11-10-food-system-codex.md` ใน branch นั้น + `Output/Codex/runs/20261110T170257Z-8cc706fc/` · Codex บอกเทสต์ผ่าน 2048/2048 แต่ยังไม่ตรวจใน browser/fps
- สาเหตุบั๊กเดิมที่ Toby ยืนยัน (ใช้ตรวจว่า Codex แก้ถูก): (1) HUD แสดง `g.food` แต่ปุ่มให้ข้าวปั้นเช็ก `g.inventory.food` (2) คนเสิร์ฟรับงานได้เฉพาะเมื่อผู้เล่นสั่งเพลิง/ดำทำที่เคาน์เตอร์ · เทสต์ `tests/food-system-bugs.test.mjs` (อยู่ใน 3075bdf5 แล้ว) ต้องผ่านหลังรวม
- รายงานส่วน A ของ Toby: ภารกิจต้องจ้างตัวละครก่อน + ปุ่ม สู้อีกครั้ง/พักไว้ก่อน (ยังไม่กดจริงใน browser)

## ที่ทำงาน
worktree `~/agapae-work/.toby-worktrees/z1-v5` (สะอาด HEAD 3075bdf5) · เซิร์ฟเวอร์ 8942 เสิร์ฟจาก worktree นี้

## ขั้นตอน
1. รีวิว diff `3075bdf5..9f80b850` ตามใบงานอาหารข้อ 1–8 + ความถูกต้อง (เซฟเก่า, คลังข้าวปั้นเดียว, คนเสิร์ฟเดินจริง, ไม่คำนวณ path ทุกเฟรม) → PASS หรือ FIX LIST
2. ถ้า PASS (หรือข้อเล็กแก้เอง): `git merge --ff-only 9f80b850` (ถ้าแก้เพิ่ม commit ต่อท้าย) → `node --test tests/*.test.mjs` ผ่านหมด → push `claude/2026-11-05-zone1-v5-fx`
3. ตรวจใน browser ที่ 390×844 และ 1792×958: ปุ่มให้ข้าวปั้น, โรงอาหาร (กำหนดพ่อครัว/คนเสิร์ฟ/เลือกผู้รับ), นิรา/พ่อค้ามีปุ่มตามใบงาน, ความหิวเพิ่มเองเมื่อมีพ่อครัว+คนเสิร์ฟ · และส่วน A: แพ้ฉากสู้ภารกิจ → ปุ่ม 2 ปุ่มใช้ได้ · ไม่มี error ใน console
4. fps ด้วย harness `Output/Toby/perf-1110/` (เครื่องว่าง load < 2.5) เมืองเดิน ต้องไม่ต่ำกว่าเดิมเกิน 2 fps
## ข้อห้าม
ห้าม merge/push main · ห้ามแตะ `Documents/Work PAE/Claude/AVEGEE`, `~/agapae-work/AVEGEE`, `~/agapae-work/.codex-worktrees` และ `~/agapae-work/.toby-worktrees/.codex-worktrees` (คิว Codex app รันอยู่) · ห้าม kill 8942 · ห้ามแตะ LaunchAgent `com.agapae.avegee-*`
## ส่งงาน
`Output/Dale/2026-11-11-avegee-food-codex-review.md` (ไทย): PASS/FIX LIST, สิ่งที่แก้เอง, commit, ผลเทสต์, ผล browser, fps, เรื่องที่ต้องให้คุณเป้ตัดสิน
## เกณฑ์รับงาน
1. ระบบอาหารข้อ 1–8 ทำงานจริงใน browser · บั๊ก 2 ข้อหาย 2. เทสต์ผ่านหมด · fps ไม่ตก 3. push branch แล้ว
