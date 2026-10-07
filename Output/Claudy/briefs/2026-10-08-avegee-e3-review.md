# ใบงานรีวิว (Dale): AVEGEE E3 — event โซน 1–2 · รีวิว diff + ตรวจใน browser แล้ว merge/push

**ทำหลัง E1+E2 merge แล้ว** (ใบงาน `2026-10-08-avegee-e1e2-review.md`) — E3 base `d754481` ต้อง merge บนผลรวม E1+E2 (E1 กับ E3 แก้ `src/data.js` ทั้งคู่ ระวัง conflict)
Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · branch `codex-app/2026-10-04`
ใบงานต้นทาง: `2026-10-08-avegee-e3-events-z1z2.md` + เอกสารกลาง `2026-10-08-avegee-ev-storyboard.md` (โฟลเดอร์ `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/`)
Run: `20261007T192835Z-e1bd7a13` · branch `codex/20261007T192835Z-e1bd7a13` · worktree `../.codex-worktrees/20261007T192835Z-e1bd7a13` · diff/report ใน `Output/Codex/runs/20261007T192835Z-e1bd7a13/`
Codex รายงาน: 485/485 · E3 9/9 · ไฟล์ใหม่ `src/deva-map.js`, `src/breach-approach.js` · **ยังไม่มีภาพตรวจใน browser** (Codex เปิด localhost ไม่ได้)

## ขั้นตอน
1. รีวิว diff ตามเกณฑ์รับงาน E3 · ตรวจเป็นพิเศษ:
   - เทสต์เดิมที่แก้ (`30a`, `event-progression`, `story-art`, `trial-destinations29c`, `ui27d-map-items`) แก้เพราะลำดับใหม่จริง ไม่ใช่ผ่อนเกณฑ์
   - `src/cases.js` (62 บรรทัด) — คดีพระ/เทวดาปลอมตัวเป็นคดีที่ 5 ของ th และไม่ทำให้คดีอื่นหาย/ซ้ำ
   - save เก่า: ผ่าน `devaTest`/`asiaPrisonFire` แล้วไม่เล่นซ้ำ, ค้างกลาง event ไม่ติด
   - ไม่เปลี่ยน event key / สมดุล / รางวัล
2. merge บน `codex-app/2026-10-04` (หลัง E1+E2) · stage เฉพาะไฟล์ที่เกี่ยว ไม่ commit `output/` ห้าม `git add .` ห้ามแตะ `Exam/`
3. เทสต์รวมทั้งชุด + `node --check src/*.js` + `git diff --check`
4. **ตรวจใน browser จริง** (เปิด dev server/ไฟล์ local ด้วย Playwright หรือเครื่องมือที่มี; ตั้ง save ให้ถึงจุดนั้นผ่าน localStorage/ฟังก์ชันทดสอบ) เก็บภาพ: (a) คดีที่ 5 th หลังตัดสิน → cutscene `deva-intro-th-v1` + บทถูก/ผิด (b) โซน 2 effect ไฟบนอาคาร (c) เทวดาบินลงมา (d) เทวดายืนรอ + ป้ายคุย · ย่อ ≤1600 px ใส่ `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e3/`
   - ถ้าเปิด browser ไม่ได้จริง ให้รายงานตามจริง ห้ามอ้างว่าผ่าน
5. PASS → push atomic `main` + `codex-app/2026-10-04` · ตรวจ Pages build · ล้าง worktree + branch E3
6. FIX LIST ข้อเล็ก → แก้เอง · ข้อใหญ่ → ตอบ FIX LIST เรียงเลขกลับมา ไม่ merge

## ผลที่ต้องตอบ
PASS (merge/push hash + เทสต์ + path ภาพ) หรือ FIX LIST · รายงาน `Output/Dale/2026-10-08-avegee-e3-review.md` · บอกชื่อ/API ระบบกลาง "Deva Map Actors" สั้นๆ เพื่อใช้ในใบงาน E4
