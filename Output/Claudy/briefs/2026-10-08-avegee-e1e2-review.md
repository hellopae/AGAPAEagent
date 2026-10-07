# ใบงานรีวิว (Dale): AVEGEE E1 + E2 — รีวิว diff Codex แล้ว merge/push

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · branch `codex-app/2026-10-04` (= origin/main, ฐาน `d754481`)
ใบงานต้นทาง: `2026-10-08-avegee-e1-building-flip.md`, `2026-10-08-avegee-e2-frontier-walk.md` + เอกสารกลาง `2026-10-08-avegee-ev-storyboard.md` (ทั้งหมดอยู่ใน `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/`)

| run | branch / worktree | ผล Codex |
|---|---|---|
| E1 `20261007T192755Z-2f145222` | `codex/20261007T192755Z-2f145222` · `../.codex-worktrees/20261007T192755Z-2f145222` | 478/478 · แก้ expected ใน `tests/30d`, `30f`, `ui28a` |
| E2 `20261007T192815Z-131b31b8` | `codex/20261007T192815Z-131b31b8` · `../.codex-worktrees/20261007T192815Z-131b31b8` | 487 pass · ย้ายจุดเริ่มใน `tests/frontier-navigation.test.mjs` |
diff/report: `Output/Codex/runs/<run>/diff.patch`, `report.md` (ใน AGAPAE Agent)

## ขั้นตอน
1. รีวิว diff ทั้งสองตามเกณฑ์รับงานในใบงานต้นทาง · **ตรวจเป็นพิเศษ: เทสต์เดิมที่ถูกแก้ expected ต้องเปลี่ยนเพราะ flip/mask ใหม่จริง ไม่ใช่ผ่อนเกณฑ์**
2. E2: polygon cyberhell เป็นร่างรออนุมัติ — merge ได้ (ดีกว่า SIMPLE เดิม) แต่คง comment "awaiting approval"
3. PASS → merge ทั้งสองเข้า `codex-app/2026-10-04` (commit ข้อความอังกฤษสั้น อ้าง run id) · **ไม่ commit ไฟล์ใน `output/`** (preview ใหญ่หลาย MB — handoff ระบุ output ไม่ commit) · stage เฉพาะไฟล์ src/tests/scripts ที่เกี่ยว ห้าม `git add .` (มีไฟล์ผู้ใช้ค้างใน `Exam/` ห้ามแตะ)
4. รัน `node --test tests/*.test.mjs` บนผลรวม + `node --check src/*.js` + `git diff --check`
5. push atomic ไป `main` และ `codex-app/2026-10-04` (ผู้ใช้อนุญาตตาม `docs/claude-handoff-2026-10-07.md`) · ตรวจ Pages build ผ่าน
6. **ก่อนลบ worktree** คัดลอก preview ที่คุณเป้ต้องดูไป `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e1e2/` (ย่อให้กว้าง ≤1600 px ด้วย `sips -Z 1600`): E1 th/asia/west/cyberhell.png · E2 frontier-overview.png + Map-Zone4-frontier-mask-draft.png · แล้วล้าง worktree + branch ทั้งสอง
7. ห้ามแตะ worktree ของ E3 (`codex/20261007T192835Z-e1bd7a13`) ยังรันอยู่

## ผลที่ต้องตอบ
PASS (merge commit + push hash + จำนวนเทสต์) หรือ FIX LIST เรียงเลข · รายงานสั้นที่ `Output/Dale/2026-10-08-avegee-e1e2-review.md`
