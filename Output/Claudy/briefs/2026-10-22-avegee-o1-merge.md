# ใบงาน O1-merge: AVEGEE — รีวิวโค้ด + merge `toby/o1-frontier` ขึ้น main · เจ้าของ Dale

## บริบท
- ใบงานต้นเรื่อง: `Output/Claudy/briefs/2026-10-21-avegee-o1-frontier-fullscreen.md`
- รายงาน Toby (รวมรอบแก้): `Output/Toby/2026-10-21-avegee-o1-frontier.md`
- branch `toby/o1-frontier` = `1d75d67` + `4f5e8e6` (ฐาน main `5ec8c17`) · worktree `/Users/agapae/agapae-work/.toby-worktrees/o1` · Toby รายงานเทสต์ 1,231/0
- คำตอบคุณเป้ (22 ต.ค.): บอสหายจากเส้นทาง+เมืองหลัง farewell แต่ **ยังยืนที่ด่านชายแดน** (ประลอง 10 ระลอกได้) · ทีมเดินซ้ำ = ยามา+นิรา · เก็บ ☰ · ยืนบนประตูตอนโหลดต้องก้าวออกก่อน · คำใบ้ล่างปล่อยว่าง
- Codex app หยุดแล้ว ไม่มีใคร push main นอกจาก Dale · Toby O2 (battle) ยังทำอยู่บน `toby/o2-battle-audit` — ชนที่ `index.html` (import map คนละบรรทัด) O2 จะ rebase ทีหลัง
- กติกา push: `docs/git-push-protocol.md` ใน repo

## ขั้นตอน
1. รีวิว diff `main..toby/o1-frontier`: ความถูกต้อง, latch เข้าประตู (ไม่ trigger ระหว่างศึก/คัตซีน/โหลด), เงินบอสจ่ายครั้งเดียว, เซฟเก่า restore, ไม่มีจุดคลิกที่มองไม่เห็น, cache-bust `?v=` ตรงกันระหว่าง index/preload/import, ไม่มีโค้ดดีบักค้าง
2. ข้อเล็กแก้เองใน branch ได้ · ข้อใหญ่ → FIX LIST ถึง Claudy (ไม่ merge)
3. ผ่าน → ใน clone `/Users/agapae/agapae-work/AVEGEE` (tree ต้องสะอาด): `git fetch` → merge `toby/o1-frontier` เข้า main (ข้อความขึ้นต้น `O1:`) → `node --test tests/*.test.mjs > $TMPDIR/t.log 2>&1` แล้ว grep `ℹ (tests|pass|fail)` ต้อง 0 แดง → `git push origin HEAD:main` (ห้าม force)
4. รอ GitHub Pages deploy สำเร็จ → เช็ก `https://hellopae.github.io/AVEGEE/` ว่า `index.html` มี cache-bust `-o1` และไฟล์ `src/dungeon-view.js?v=…-o1` โหลดได้ (200)

## ข้อห้าม
ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` (clone ของ Codex) · ห้าม merge `toby/o2-battle-audit` · ห้าม force push

## เกณฑ์รับงาน
PASS + merge commit + จำนวนเทสต์ + Pages run สำเร็จ + marker บนเว็บจริง — หรือ FIX LIST · รายงาน `Output/Dale/2026-10-22-avegee-o1-merge.md`
