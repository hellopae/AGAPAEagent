---
name: codex-handoff-intake
description: รับช่วงงานที่ Codex app ทำและ push เองใน AVEGEE (หรือ repo อื่น) — หาโน้ตสรุปถึง Claude, ตรวจว่าโค้ดจาก commit งานไม่หายตอน merge, รันเทสต์ และแยกงานที่ทำได้โดยไม่ชน Codex ใช้เมื่อคุณเป้ถามว่า "Codex ทำอะไรไปบ้าง / สรุปมาให้หรือยัง / เอามาทำต่อจะชนไหม" หลัง Claude หรือ Codex ชนลิมิต
---

# รับช่วงงานจาก Codex app

> สำเนาใน `.agents/` ใช้เป็นโน้ตกลางระหว่าง Codex ↔ Claude เวลาฝั่งใดฝั่งหนึ่งชนลิมิต (คุณเป้สั่งเก็บ 15 ต.ค. 2569) — ต้นฉบับคือ `.claude/skills/codex-handoff-intake/SKILL.md` แก้ที่นั่นแล้วคัดลอกมา **ห้ามแทนคำ Claude→Codex ทั้งไฟล์** (ชื่อไฟล์โน้ต `docs/claude-update-*.md` ใน AVEGEE เป็นชื่อจริง)

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

## 4. เทสต์
`node --test tests/*.test.mjs` (ไม่ใช่ `tests/`) รัน background ~2–3 นาที เทียบจำนวนกับที่ Codex อ้างในโน้ต

## 5. แยกงานว่าชน Codex ไหม
- **ไม่ชน**: อ่าน/เทสต์ใน clone ของเรา · เขียนในโฟลเดอร์ output ที่ใบงาน Codex กำหนดให้ Claude (เช่น `output/claude-2d-art/`) โดยไม่ commit/push
- **ชน — รอ/ตกลงก่อน**: แก้ไฟล์ที่ coordination doc บอกว่า Codex ถือ (src/index/tests/img/catalog) · push main ระหว่าง Codex มีงานไม่ commit
- Codex ชนลิมิตไม่ได้แปลว่าว่าง — เช็ก `ps -o pcpu,etime -p $(pgrep -f 'Codex (Service)')`
- ใบงาน Codex มักบังคับ "ตอบรับพร้อมรายชื่อไฟล์ก่อนเริ่ม" → ทำเก็บไว้ local ได้ แต่ให้คุณเป้แจ้ง Codex ก่อนเชื่อมเข้าเกม
- Claude ไม่มี imagegen → งานภาพส่งเป็นรายงาน + prompt ให้ Codex วาด (Codex สร้างภาพได้แล้ว)
