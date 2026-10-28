---
name: codex-handoff-intake
description: รับช่วงงานที่ Codex app ทำและ push เองใน AVEGEE (หรือ repo อื่น) — หาโน้ตสรุปถึง Claude, ตรวจว่าโค้ดจาก commit งานไม่หายตอน merge, รันเทสต์ และแยกงานที่ทำได้โดยไม่ชน Codex ใช้เมื่อคุณเป้ถามว่า "Codex ทำอะไรไปบ้าง / สรุปมาให้หรือยัง / เอามาทำต่อจะชนไหม" หลัง Claude หรือ Codex ชนลิมิต
---

# รับช่วงงานจาก Codex app

Codex app ทำงานใน clone ของตัวเอง (`/Users/agapae/Documents/Work PAE/Claude/AVEGEE` — sandbox ของเราอ่านไม่ได้)
แล้ว push main เอง · clone ของเราคือ `/Users/agapae/agapae-work/AVEGEE` · ห้ามแตะ clone ของ Codex

## 1. หาว่าทำอะไรไป (อ่านอย่างเดียว)
```bash
cd /Users/agapae/agapae-work/AVEGEE && git fetch --quiet origin
git status -sb                                   # behind กี่ commit
git log --all --since=<วันที่> --date=format:'%d/%m %H:%M' --pretty='%h %ad %D | %s'
git diff --name-status main origin/main -- docs '*.md' output/coordination   # โน้ตใหม่
git show origin/main:docs/claude-update-<YYYY-MM-DD>.md                      # โน้ตถึง Claude
```
โน้ตที่ Codex มักทิ้งไว้: `docs/claude-update-*.md` (สรุปงาน), `docs/claude-handoff-*.md` (ใบงานฝาก Claude),
`docs/ui-work-coordination-*.md` (ใครถือไฟล์ไหน — **อ่านก่อนรับงาน**), `output/coordination/claude-task-*.md`
commit message ที่มีคำว่า "note for Claude" = มีโน้ต
ตั้งแต่ 19 ต.ค. Codex ทิ้งโน้ตใน `docs/handoffs/YYYYMMDD-*.md` ด้วย (status-audit, reset-continuation — รายการค้างละเอียดอยู่ในนี้)
และโน้ตหลักอาจถูกต่อหัวไฟล์หลายรอบ — อ่านทั้งไฟล์ อัปเดตล่าสุดอยู่ **บนสุด** ไม่ใช่ท้าย

**อ่านโน้ตใน clone ของ Codex ไม่ได้** (28 ต.ค.: `output/coordination/*-HANDOFF.md` ไม่อยู่ใน git และ macOS บล็อกแม้ปิด sandbox)
→ แหล่งสรุปที่อ่านได้คือ `AGAPAE Agent/Output/Codex/AVEGEE-WORK-QUEUE.md` (Codex ต่อท้ายทุกชุดงาน: commit, เทสต์, งานค้าง) — `git diff` ไฟล์นี้ใน repo AGAPAE
ไฟล์ภาพที่คุณเป้แนบจาก `~/Desktop` ก็อ่านไม่ได้เช่นกัน → ขอให้ลากใส่ `AGAPAE Agent/Output/Claudy/<slug>/input/` ด้วย Finder

## 2. ดึงเข้า clone ของเรา — เฉพาะตอน tree สะอาด
`git status --porcelain` ว่าง → `git pull --ff-only` · ไม่ว่าง → หยุด ถามคุณเป้

## 3. ตรวจว่าโค้ดจาก commit งานยังอยู่ที่ HEAD (กับดัก merge เลือกฝั่ง main ทั้งหมด)
zsh ไม่แยกคำในตัวแปร → ใช้ function ไม่ใช้ `for pair in "a b"`
```bash
chk(){ git show HEAD:"$2" > /tmp/.h 2>/dev/null; echo "--- $1 $2"
  git show $1 -- "$2" | grep '^+' | grep -v '^+++' | sed 's/^+//' | grep -vE '^\s*$' | sort -u | grep -vxFf /tmp/.h | cut -c1-170; }
for f in $(git show --name-only --format= <commit> -- src index.html); do chk <commit> "$f"; done
```
บรรทัดที่ "หาย" ส่วนใหญ่ไม่ใช่ปัญหา: query `?v=` เก่า, `CATALOG_VERSION`, โค้ดที่ merge เขียนรวมใหม่
→ `git grep -n -F '<ชิ้นสำคัญของบรรทัด>' HEAD -- src` ยืนยันทีละจุด · ไฟล์ทั้งไฟล์หาย → `git show --name-status --format= <commit> -- <file>` ดูว่าตั้งใจลบ (D) หรือไม่
ทำทั้ง commit งานของ Codex **และ** commit ฝั่ง main ที่ถูก merge เข้ามา

สาขา WIP ของ Claude (`toby/*`, `codex/<run_id>`) ที่ `git merge-base --is-ancestor <branch> HEAD` ตอบว่า **ไม่อยู่ใน main**
ไม่ได้แปลว่างานหาย — Codex มักรับช่วงแบบ "takeover" (เขียนรวมใหม่ / cherry-pick) → รัน `chk` กับ commit ของสาขานั้นแทน
แล้วตัดบรรทัดดีบัก (`TMPDEBUG`, `globalThis.__*`) ที่ไม่ควรขึ้นอยู่แล้ว · ฟีเจอร์ที่ทำต่างวิธี ให้เช็กผลลัพธ์ เช่น ค่าที่ไม่มีใครกำหนดแล้ว = ไม่ถูกวาด

## 4. เทสต์
`node --test tests/*.test.mjs` (ไม่ใช่ `tests/`) รัน background ~4 นาที (1,221 ข้อ ณ 21 ต.ค.) เทียบจำนวนกับที่ Codex อ้างในโน้ต
**อย่า pipe เข้า `tail`** — error ยาวของข้อที่ timeout ดันบรรทัดสรุปหลุด และ exit code ที่เห็นเป็นของ tail
เขียนลงไฟล์แล้ว grep สรุป (reporter เป็น spec: บรรทัดขึ้นต้น `ℹ` ไม่ใช่ `# ` แบบ TAP):
```bash
node --test tests/*.test.mjs > "$TMPDIR/t.log" 2>&1; echo "exit=$?"; grep -E 'ℹ (tests|pass|fail|cancelled)' "$TMPDIR/t.log"; grep '✖' "$TMPDIR/t.log" | head
```

**เทสต์เต็มตก ทั้งที่ Codex อ้างว่าผ่าน** — Codex มักรันแค่ focused tests · แยกว่าเป็นบั๊กหรือเทสต์เก่า:
หาไฟล์เทสต์ที่ตกด้วย `grep -l -F '<ชื่อข้อ>' tests/*.test.mjs` → รันเฉพาะไฟล์นั้นใน `git worktree add --detach` ที่ HEAD เก่า แล้วไล่ `git rev-list --reverse <old>..origin/main` ทีละ commit
(zsh: ใส่ไฟล์ใน array `FILES=(…)` แล้ว `"${FILES[@]}"` — string เดียวจะได้ "Could not find")
แบบที่เจอบ่อย: เทสต์ตรวจ cache-bust token ยาวแบบเดิม (`-o2`, `-p8`) แต่ Codex ย่อ token · เทสต์ slice โค้ดไปรันใน `vm` แล้วโค้ดใหม่ใช้ตัวแปร import ที่ context ไม่มี → แก้ที่เทสต์ ไม่ใช่ src

## 5. แยกงานว่าชน Codex ไหม
- **ไม่ชน**: อ่าน/เทสต์ใน clone ของเรา · เขียนในโฟลเดอร์ output ที่ใบงาน Codex กำหนดให้ Claude (เช่น `output/claude-2d-art/`) โดยไม่ commit/push
- **ชน — รอ/ตกลงก่อน**: แก้ไฟล์ที่ coordination doc บอกว่า Codex ถือ (src/index/tests/img/catalog) · push main ระหว่าง Codex มีงานไม่ commit
- Codex ชนลิมิตไม่ได้แปลว่าว่าง — เช็ก `ps -o pcpu,etime -p $(pgrep -f 'Codex (Service)')`
- ใบงาน Codex มักบังคับ "ตอบรับพร้อมรายชื่อไฟล์ก่อนเริ่ม" → ทำเก็บไว้ local ได้ แต่ให้คุณเป้แจ้ง Codex ก่อนเชื่อมเข้าเกม
- Claude ไม่มี imagegen → งานภาพส่งเป็นรายงาน + prompt ให้ Codex วาด
- คุณเป้บอก "ให้ Codex หยุดแล้ว รอรับงานวาด" → Claude ถือโค้ดทั้งหมด ไม่ต้องรอ coordination doc · สลับ `work-mode.json` เป็น `claude-only`
  แล้วแตกงานเป็นใบงาน Toby คู่ขนานใน `git worktree` แยก (ห้าม checkout สลับ branch ใน clone หลัก) → Dale รีวิว + merge + push
