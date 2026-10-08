# ใบงานรีวิว (Dale): AVEGEE E5 — event โซน 4 + ศึกสุดท้าย · รีวิว diff + ตรวจใน browser แล้ว merge (local)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · branch `codex-app/2026-10-04` HEAD `fbf905f` (E4 merge local, ยังไม่ push)
ใบงานต้นทาง: `2026-10-08-avegee-e5-events-z4.md` + เอกสารกลาง `2026-10-08-avegee-ev-storyboard.md` (โฟลเดอร์ `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/`)
Run: `20261008T012107Z-dd11699d` · branch `codex/20261008T012107Z-dd11699d` · worktree `../.codex-worktrees/20261008T012107Z-dd11699d` · diff/report ใน `Output/Codex/runs/20261008T012107Z-dd11699d/`
Codex รายงาน: 516 pass / 0 fail / 1 skip · E5 9/9 · **ไม่มีภาพ browser**

## ขั้นตอน
1. รีวิว diff ตามเกณฑ์รับงาน E5 · ตรวจพิเศษ:
   - `final-event.js` migration: save เก่าทุก phase (`locked/ready/staging/reinforcementCutscene/bossReady/reward/ending/completed`) โหลดแล้วเดินต่อได้ ไม่ค้าง ไม่ได้รางวัลซ้ำ
   - ลำดับ cutscene a→e ไม่ซ้ำ/ไม่ข้าม (story.js เดิมมี `cyberhell-02-v3` 2 ที่) · คำเตือนทีมไม่ครบ (B9) ยังอยู่
   - กำลังเสริมเป็นคนละ sprite จริง (ไม่ใช่ taan ซ้ำ) · key ภาพตามกฎ `boss-tester`
   - บทลูเมน 3 บรรทัดตรงเอกสารกลาง · effect สายฟ้า/วาร์ปไม่บังอาคาร/ตัวละครหลัก · ไม่เปลี่ยนสมดุล/รางวัล
2. merge บน `codex-app/2026-10-04` · stage เฉพาะไฟล์ที่เกี่ยว ไม่ commit `output/` ห้าม `git add .` ห้ามแตะ `Exam/`
3. เทสต์รวม + `node --check src/*.js` + `git diff --check`
4. **ตรวจใน browser จริง** ภาพ: (a) มาถึงโซน 4 Taan+พ่อค้าในคุกสายฟ้า + cutscene `deva-intro-cyberhell-v1` + บท (b) หลังชนะ สายฟ้าหาย 2 คนออกมา (c) เดินใกล้โทรจัน-9 → `frontier-cyberhell-intro` (d) บอสวาร์ปพร้อมกองทัพ → `story-cyberhell-01-v2` → หน้าต่างเตรียมศึก (e) หลัง 4 wave → reinforcements-01 → แผนที่กำลังเสริมฝั่งซ้าย → reinforcements-02 (f) `story-cyberhell-02-v3` → แผนที่บอส+หัวหน้า 4 โซน + หน้าต่างเตรียมตัว 3 ทาง (g) หลังหัวหน้าครบ → `story-cyberhell-03-v4` → yama เผชิญบอส (h) ชนะบอส → ending-01-v4 → ending-02-v3 · ย่อ ≤1600 px → `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e5/`
5. บั๊กเล็ก → แก้เอง commit แยก · ใหญ่ → FIX LIST ไม่ merge
6. **ไม่ push** · ล้าง worktree + branch E5 หลัง merge

## ผลที่ต้องตอบ
PASS (merge hash + เทสต์ + path ภาพ + บั๊กที่แก้) หรือ FIX LIST · รายงาน `Output/Dale/2026-10-08-avegee-e5-review.md`
