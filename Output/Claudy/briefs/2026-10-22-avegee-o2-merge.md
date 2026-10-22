# ใบงาน O2-merge: AVEGEE — รีวิวโค้ด + merge `toby/o2-battle-audit` ขึ้น main · เจ้าของ Dale

## บริบท
- ใบงานต้นเรื่อง: `Output/Claudy/briefs/2026-10-21-avegee-o2-battle-visual-audit.md` (+ ข้อ J/K ภาพ 7/8)
- รายงาน Toby: `Output/Toby/2026-10-21-avegee-o2-battle-audit.md` · art requests: `Output/Toby/2026-10-21-avegee-o2-codex-art-requests.md` (ไม่ใช่งานของ Dale)
- branch `toby/o2-battle-audit` commit `c34936a` + `a4aff7d` rebase บน main `11658b0` แล้ว — **ยังไม่ได้ push branch** อยู่ใน worktree `/Users/agapae/agapae-work/.toby-worktrees/o2` (merge จาก local branch ได้เลย) · Toby รายงานเทสต์ 1,240/0
- แก้: ท่า hurt รอการ์ดคัตซีนจาง, ยามาพุ่งโจมตี, นิราทิศ attack/heal, เมนูมือถือไม่บังศัตรู, การ์ดคัตซีนขอบแหว่ง (clip-path), ยามาภาพแตก (DPR canvas), ตัดเศษเฟรมข้างเคียงนิราตอนโหลด (`stripNeighbourLeaks`)
- ไฟล์: `src/ui.js`, `src/nira-combat.js`, `src/combat-sprites.js`, `src/yama-sword.js`, `src/battle-scale.js`, `index.html`, `tests/o2-battle-audit.test.mjs`
- คู่ขนาน: Toby P2 (หน้าสอบสวน), Toby P5 (แผนที่) ยังทำบน branch ของตัวเอง — ไม่ merge ของพวกเขา

## ขั้นตอน
1. รีวิว diff `main..toby/o2-battle-audit`: ไม่เปลี่ยนตัวเลข gameplay, DPR cap/perf (canvas ใหญ่ขึ้นบนจอ 3x ไหม), `stripNeighbourLeaks` ไม่ลบส่วนตัวละครจริง/ไม่ทำงานซ้ำทุกเฟรม, cache-bust ตรงกัน, ไม่มีโค้ดดีบัก
2. ข้อเล็กแก้เองใน branch · ข้อใหญ่ → FIX LIST ถึง Claudy ไม่ merge
3. ผ่าน → clone `/Users/agapae/agapae-work/AVEGEE` (tree สะอาด): fetch → merge (ข้อความ `O2:`) → `node --test tests/*.test.mjs > $TMPDIR/t.log 2>&1` grep `ℹ (tests|pass|fail)` 0 แดง → `git push origin HEAD:main` (ห้าม force) → push branch `toby/o2-battle-audit` ด้วยเพื่อเก็บประวัติ
4. Pages สำเร็จ → เช็ก marker `-o2` บนเว็บจริง + ไฟล์ 5 ตัวโหลด 200

## ข้อห้าม
ห้ามแตะ clone ของ Codex · ห้าม merge branch อื่น · ห้าม force push

## เกณฑ์รับงาน
PASS + merge commit + เทสต์ + Pages + marker — หรือ FIX LIST · รายงาน `Output/Dale/2026-10-22-avegee-o2-merge.md`
