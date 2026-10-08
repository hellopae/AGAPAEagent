# ใบงานรีวิว (Dale): AVEGEE E6 — ป้ายชื่อตัวละครเล็กลง · รีวิวสั้น + ภาพ browser แล้ว merge (local)

Repo `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · branch `codex-app/2026-10-04` HEAD `ef3126f` (= origin/main)
ใบงานต้นทาง `2026-10-08-avegee-e6-name-labels.md` (โฟลเดอร์นี้) · Run `20261008T030159Z-ae1ff2d9` · worktree `../.codex-worktrees/20261008T030159Z-ae1ff2d9` (Codex ยังไม่ commit)
Codex: 520 pass/0 fail/1 skip · แก้ `src/scene.js` 15 บรรทัด + เทสต์ใหม่ · ไม่มีภาพ browser

## ขั้นตอน (งานเล็ก ทำให้กระชับ)
1. รีวิว diff: ชื่อตัวละครบนแผนที่ทุกจุดใช้ค่าเดียวกับ `bubble()` · `tag()`/ป้ายสถานที่/badge/frontier/room ไม่เปลี่ยน
2. commit ใน worktree (ไม่รวม `output/`) → merge `--no-ff` เข้า `codex-app/2026-10-04` · เทสต์รวม + `node --check src/*.js` + `git diff --check`
3. ภาพ browser 2 ภาพ (Playwright, 1600 px): โซน 4 ช่วงกำลังเสริมยืนฝั่งซ้ายใกล้ค่ายพัก (ป้ายไม่ทับ) + โซน 1 แผนที่ปกติ มีบทบ่นลอยให้เทียบขนาดกับชื่อ → `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e6/`
4. **ไม่ push** · ล้าง worktree + branch E6
## ตอบ
PASS (merge hash + เทสต์ + path ภาพ) หรือ FIX LIST · รายงาน `Output/Dale/2026-10-08-avegee-e6-review.md`
