# ใบงานรีวิว (Dale): AVEGEE E4 — event โซน 3 · รีวิว diff + ตรวจใน browser แล้ว merge (local)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · branch `codex-app/2026-10-04` HEAD `7d82107` (= origin/main, ขึ้นเว็บแล้ว)
ใบงานต้นทาง: `2026-10-08-avegee-e4-events-z3.md` + เอกสารกลาง `2026-10-08-avegee-ev-storyboard.md` (โฟลเดอร์ `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/`)
Run: `20261008T010224Z-eb74599f` · branch `codex/20261008T010224Z-eb74599f` · worktree `../.codex-worktrees/20261008T010224Z-eb74599f` · diff/report ใน `Output/Codex/runs/20261008T010224Z-eb74599f/`
Codex รายงาน: 507 pass / 0 fail / 1 skip · E4 8/8 · ไฟล์ใหม่ `src/west-events.js` · **ไม่มีภาพ browser** (Chromium ใน sandbox Codex เปิดไม่ได้)

## ขั้นตอน
1. รีวิว diff ตามเกณฑ์รับงาน E4 · ตรวจพิเศษ:
   - key ภาพตามกฎ (`boss-tester` ไม่ใส่ suffix โซนเอง) · `scene.js` เปลี่ยน 65 บรรทัด — ไม่ทำ effect ไฟโซน 2 ที่แก้ไว้ใน E3 พัง
   - `westHypnotized` คง key · save เก่าที่ cleared แล้วไม่ต้องสู้ใหม่ · ระหว่างเปิดโซน NPC อื่นซ่อนจริง แล้วกลับมาหลังชนะ
   - วิญญาณหยุดนิ่ง + "!!!" หลังคดี 3 และกลับมาขยับหลังชนะแวมไพร · ไม่ทำให้รับ/ส่งวิญญาณค้างถาวร
   - บทวาคิวรี 5 บรรทัดตรงเอกสารกลาง (ไทย) · ไม่เปลี่ยนสมดุล/รางวัล
2. merge บน `codex-app/2026-10-04` · stage เฉพาะไฟล์ที่เกี่ยว ไม่ commit `output/` (ยกเว้นไฟล์ที่เทสต์อ่านจริง) ห้าม `git add .` ห้ามแตะ `Exam/`
3. เทสต์รวม + `node --check src/*.js` + `git diff --check`
4. **ตรวจใน browser จริง** (Playwright chromium ที่ใช้ใน E3) ภาพ: (a) เปิดโซน 3 มีแค่ Taan+พ่อค้าโดนปีศาจ 3 ตัวรุม (b) ศึก yama+Taan (c) วิญญาณหยุดนิ่ง+!!! (d) เดินเข้าใกล้แวมไพร → cutscene `frontier-west-intro` (e) วาคิวรีวิ่งเข้ามา + cutscene `deva-intro-west-v1` พร้อมบท (f) วาคิวรียืนรอ+ป้ายคุย · ย่อ ≤1600 px → `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e4/`
5. บั๊กเล็ก → แก้เอง commit แยก · ใหญ่ → FIX LIST ไม่ merge
6. **ไม่ push** (Claudy ขออนุมัติคุณเป้เอง) · ล้าง worktree + branch E4 หลัง merge

## ผลที่ต้องตอบ
PASS (merge hash + เทสต์ + path ภาพ + บั๊กที่แก้) หรือ FIX LIST · รายงาน `Output/Dale/2026-10-08-avegee-e4-review.md`
