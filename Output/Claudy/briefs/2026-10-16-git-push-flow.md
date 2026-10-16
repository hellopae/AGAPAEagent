# ใบงาน: แก้ระบบ push git ให้ทั้ง Claude และ Codex ส่งงานขึ้น GitHub ได้ โดยไม่ทับกัน · เจ้าของ Dale

## บริบท (คุณเป้ 16 ต.ค. ~19:10)
> อย่าลืมถามเรื่อง push กับ Codex ที่มีปัญหา ว่าทำไมไม่ได้ แล้วแก้ไขดู จะได้ push ขึ้น git ได้ทั้ง claude และ codex จัดการให้ดี อย่าให้งานทับกัน

### สาเหตุที่ Claudy หาเจอแล้ว
1. **Codex worker (`scripts/openai-worker.py --write`)** push ไม่ได้ **โดยการออกแบบ**:
   - prompt บังคับ "Do not commit, merge, push" (`rules` ~บรรทัด 113)
   - Codex รันใน `--sandbox workspace-write` ซึ่งเขียนได้แค่ใน worktree ส่วน metadata ของ git worktree อยู่ใน `<repo>/.git/worktrees/<id>` + objects ใน `<repo>/.git` อยู่นอก sandbox → commit/สร้าง branch ไม่ได้ (Codex รายงาน "เปลี่ยนชื่อ branch ถูก sandbox ปฏิเสธ" ทุกรอบ)
   - ผล: งาน Codex ค้างเป็นไฟล์ไม่ commit ใน worktree, บางรอบ worktree ไปอยู่ `/private/tmp` (เสี่ยงหาย), Dale ต้องตามเก็บเอง
   - network ไม่ใช่ปัญหา: `~/.codex/config.toml` ตั้ง `[sandbox_workspace_write] network_access = true` แล้ว
2. **Claude (Dale)**: ครั้งหนึ่ง `git push origin HEAD:main` ถูก auto-mode classifier ปฏิเสธ (มองเป็น Data Exfiltration) และ `gh api .../pages/builds` ถูกบล็อก — รอบหลังๆ `git push` ธรรมดาผ่าน · Claudy จะให้คุณเป้เพิ่ม permission rule เอง (แก้ settings ต้องให้คุณเป้ทำ)
3. **Codex app (GUI)** push main เองได้อยู่แล้ว — ไม่ต้องแก้

## งาน
### A. `scripts/openai-worker.py` — wrapper เป็นคน commit + push branch ของ Codex (ไม่ขยาย sandbox ของ Codex)
1. หลัง Codex รันจบ (ทุกสถานะที่มี diff — `ready_for_review`, `rate_limited`, `failed` ที่มีไฟล์เปลี่ยน) ใน `save_diff`/ต่อจากนั้น:
   - `git -C <worktree> add -A` → ถ้ามีการเปลี่ยน: `git commit -m "Codex <run_id>: <หัวข้อบรรทัดแรกของใบงาน> [<status>]"` (ใส่ trailer `Co-Authored-By: Codex <noreply@openai.com>`)
   - `git push -u origin codex/<run_id>` (branch ของ run เท่านั้น **ห้าม push main** ห้าม force)
   - บันทึก `commit`, `pushed: true/false`, `push_error` ใน status.json · push ล้มเหลวไม่ทำให้ run ล้ม
   - diff.patch/diff-stat ยังเก็บเหมือนเดิม (เทียบ base_commit)
2. แก้ prompt `rules` ให้สอดคล้อง: "Do not run git commit/push/merge yourself — the wrapper commits and pushes your branch after you finish. Never push or modify main." (คงข้อห้ามอื่น)
3. worktree ต้องอยู่ใต้ `<repo parent>/.codex-worktrees/` เสมอ — ตรวจว่ามีอะไรทำให้ไปอยู่ `/private/tmp` (run M3 PART A: `/private/tmp/avegee-part-a-m3`) ถ้าเป็นเพราะ Codex สร้าง worktree เองใน sandbox ให้ห้ามใน prompt ("ทำงานใน working directory ที่ให้เท่านั้น ห้ามสร้าง worktree/clone ใหม่")
4. ทดสอบจริงด้วย run เล็ก: ใบงานทดสอบที่ให้ Codex เพิ่มไฟล์ `docs/codex-push-test.md` 1 บรรทัดใน repo AVEGEE → ยืนยันว่า branch `codex/<run_id>` ขึ้น GitHub · แล้วลบ branch ทดสอบทั้ง remote/local และ worktree
5. อัปเดต `scripts/OPENAI-WORKERS.md` ส่วน `--write`

### B. กติกา push กลาง (กันงานทับกัน) — เขียนลง `docs/git-push-protocol.md` ใน repo AVEGEE + ลิงก์จาก `docs/ui-work-coordination-2026-10-15.md`
- **main**: push ได้ 2 ทางเท่านั้น — (1) Claude Dale (integrator ฝั่ง Claude) (2) Codex app (GUI ที่คุณเป้สั่งตรง) · subagent อื่น (Toby ฯลฯ) และ Codex worker **ไม่ push main**
- ทุกครั้งก่อน push main: `git fetch` → `git rebase origin/main` (หรือ merge) → `node --test tests/*.test.mjs` 0 แดง → push · **ห้าม `--force`** · ชน → แก้ชนแล้วลองใหม่ ไม่ทับไฟล์ของอีกฝั่ง
- branch: Claude = `toby/*`, `dale/*` · Codex worker = `codex/<run_id>` (push ได้) · Codex app = ตามที่มันใช้ (`codex-app/*` หรือ main)
- ความเป็นเจ้าของไฟล์ตาม coordination doc · cache-bust ชน → รวม suffix ไม่ตัดของอีกฝั่ง
- หลัง merge: ลบ branch ที่ merge แล้วทั้ง local/remote
- ข้อความ commit: ขึ้นต้นด้วยรหัสงาน (K1d, M2, …) ให้ไล่ย้อนได้

## ข้อห้าม
ไม่แก้ hook/status.json/worklog.json · ไม่แก้ `.claude/settings*.json` (คุณเป้ทำเอง) · ไม่ขยาย sandbox ของ Codex เกินจำเป็น · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## เกณฑ์รับงาน
1. run ทดสอบ: branch `codex/<id>` ขึ้น GitHub จริง (ลบแล้วหลังทดสอบ) + status.json มี commit/pushed
2. `docs/git-push-protocol.md` ใน AVEGEE (push main ตามกติกาตัวเอง) + OPENAI-WORKERS.md อัปเดต
3. รายงาน `Output/Dale/2026-10-16-git-push-flow.md`: สาเหตุ, ที่แก้, ผลทดสอบ
