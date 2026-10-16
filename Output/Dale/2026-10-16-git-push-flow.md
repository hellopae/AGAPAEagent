# Build note: git push flow ของ Claude + Codex (16 ต.ค. 2569)

ใบงาน: `Output/Claudy/briefs/2026-10-16-git-push-flow.md` · เจ้าของ Dale

## สาเหตุ
1. Codex worker push ไม่ได้โดยการออกแบบ: prompt สั่ง "Do not commit, merge, push" และ sandbox `workspace-write` เขียน `.git` ของ repo หลักไม่ได้ (metadata worktree + refs อยู่ใต้ `<repo>/.git`) หลักฐานจาก run `20261016T070305Z-e36ca370`: `git switch -c ...` ได้ `Unable to create '.../AVEGEE/.git/refs/heads/...lock': Operation not permitted`
2. worktree ไปอยู่ `/private/tmp/avegee-part-a-m3`: ไม่ใช่ wrapper — `make_worktree` สร้างใต้ `<repo parent>/.codex-worktrees/` เสมอ (status.json ของ run นั้นก็ชี้ที่ถูก) Codex เองสร้าง worktree ใหม่ใน `/private/tmp` หลัง commit/switch ใน worktree ที่ให้ไม่ได้ จึงเพิ่มข้อห้ามใน prompt
3. ฝั่ง Claude (auto-mode classifier ปฏิเสธ `git push origin HEAD:main`) แก้ที่ settings — คุณเป้ทำเอง ไม่แตะ

## ที่แก้
- `scripts/openai-worker.py`: เพิ่ม `commit_and_push()` — หลัง `save_diff` ทุกสถานะที่มี worktree: `add -A` → commit (`Codex <run_id>: <หัวข้อใบงาน> [<status>]` + trailer Co-Authored-By Codex) → `git push -u origin codex/<run_id>` · ปฏิเสธถ้า branch ไม่ใช่ `codex/*` · ไม่ force ไม่ push main · ถ้า Codex ย้าย/ถอด branch ใช้ `git switch -C` ดึงกลับ · บันทึก `commit` / `pushed` / `push_error` ใน status.json · ล้มเหลวไม่ทำ run ล้ม · diff.patch เหมือนเดิม
- prompt `rules` (โหมด `--write`): ไม่รัน commit/push/merge เอง (wrapper ทำให้) · ห้ามแตะ main · ทำงานใน working directory ที่ให้เท่านั้น ห้ามสร้าง worktree/clone/branch ห้ามสลับ/เปลี่ยนชื่อ branch
- `scripts/OPENAI-WORKERS.md` ส่วน `--write` อัปเดตตามพฤติกรรมใหม่
- AVEGEE: `docs/git-push-protocol.md` (ใหม่) + ลิงก์จาก `docs/ui-work-coordination-2026-10-15.md`
- ไม่ขยาย sandbox ไม่แตะ settings/hook/status.json/worklog.json และไม่แตะโฟลเดอร์ `Documents/.../Claude/AVEGEE` (ใช้ clone `~/agapae-work/AVEGEE`)

## ผลทดสอบ
- run จริง `20261016T120534Z-54c648c3` (ใบงานให้เพิ่ม `docs/codex-push-test.md`): `ready_for_review`, `pushed: true`, commit `7893eb0` ขึ้น `origin/codex/20261016T120534Z-54c648c3` จริง (`git ls-remote` เจอ) มีไฟล์เดียวตามสั่ง, message ถูกรูปแบบ, Codex ไม่สร้าง worktree นอก `.codex-worktrees`
- ลบหลังทดสอบแล้ว: remote branch, local branch, worktree (`ls-remote` = 0)
- ยังไม่ได้ทดสอบกรณี push ล้มเหลว (offline) และ Codex เปลี่ยน branch เอง — โค้ดมี path รองรับ แต่ไม่ได้รันจริง

## ตรวจ / rollback
- ตรวจ: run `--write --run` ครั้งถัดไป ดู `status.json` มี `pushed: true` และ `git ls-remote origin 'refs/heads/codex/*'`
- rollback: `git revert` commit ของ `scripts/openai-worker.py` + `OPENAI-WORKERS.md` (AGAPAE Agent) · AVEGEE: revert commit docs protocol
