# Codex และ Astra

สองบทบาทบน OpenAI: Codex ช่วยตรวจโค้ดและทดสอบ; Astra ช่วยวิเคราะห์สถาปัตยกรรมและเหตุผล ตัวรันไม่ส่ง `--model` โดยค่าเริ่มต้น จึงใช้โมเดลจาก `~/.codex/config.toml` (ตอนนี้ `gpt-5.6-sol`; บังคับรุ่นอื่นได้ด้วย `--model`) ชื่อการ์ดจึงเป็นบทบาท ไม่ได้แปลว่าเป็นบัญชีหรือโควตาแยกกัน

เรียกจากเครื่องที่ติดตั้ง Codex CLI และล็อกอินอยู่ ไม่จำเป็นต้องเปิด Claude. ตัวรันหา `codex` จาก PATH ก่อน ถ้าไม่เจอใช้ตัวที่มากับแอป `/Applications/ChatGPT.app/Contents/Resources/codex` (เครื่องนี้เป็นแบบหลัง) ไม่เจอทั้งคู่จะหยุดพร้อมข้อความบอกชัด:

```sh
python3 scripts/openai-worker.py --agent codex --task /absolute/path/brief.md --project /absolute/path/project
python3 scripts/openai-worker.py --agent astra --task /absolute/path/brief.md --project /absolute/path/project --run
```

คำสั่งแรกแสดงแผน ไม่มีการเรียกโมเดล; `--run` ใช้โควตา OpenAI ของบัญชีที่ล็อกอิน ไม่ใช่โควตา Claude. ค่าเริ่มต้นคือ sandbox `read-only` ทั้งสองบทบาท เสนอแนวทาง/แพตช์ในรายงานได้ แต่ไม่แก้ไฟล์

## โหมดเขียนโค้ด `--write` (Codex เท่านั้น, ใช้ในโหมดทำงาน `both`)

```sh
python3 scripts/openai-worker.py --agent codex --task Output/Claudy/briefs/YYYY-MM-DD-slug.md --project /absolute/path/repo --write --run
```

- สร้าง git worktree ที่ `<โฟลเดอร์แม่ของ repo>/.codex-worktrees/<run_id>` บน branch ใหม่ `codex/<run_id>` จาก HEAD ปัจจุบัน แล้วรัน `--sandbox workspace-write` ในนั้น (จำกัด 30 นาที)
- จบแล้วเก็บ `diff-stat.txt` + `diff.patch` (เทียบ base commit รวมไฟล์ใหม่) ลงโฟลเดอร์ run และบันทึก `branch` / `worktree` / `base_commit` ใน `status.json`
- ไม่ commit ไม่ merge ไม่ push ไม่แตะ working tree หลัก — **Dale เป็นคนตัดสิน**:
  - PASS: `git -C <worktree> commit -am "..."` (หรือ `git apply diff.patch` ใน repo หลัก) → merge → `npm run build`/เทสต์ → push ตามปกติ
  - FIX LIST: ข้อเล็กแก้เองใน worktree · ข้อใหญ่เขียนใบงาน -v2 รัน Codex อีก 1 รอบเท่านั้น
  - เสร็จแล้วล้าง: `git worktree remove <worktree>` และ `git branch -D codex/<run_id>`

## โหมดทำงาน (`work-mode.json` ที่ root)

- `both` — Codex เขียน (`--write`) → Dale รีวิว diff · Astra ช่วยตัดสินสถาปัตยกรรมก่อนได้
- `claude-only` — ChatGPT ติดลิมิต: Dale/Toby เขียนเอง ไม่เรียก worker นี้
- `codex-only` — Claude ติดลิมิต: คุณเป้สั่ง Codex ตรง (ตาม `AGENTS.md`) ใช้ใบงานไฟล์เดียวกัน ห้าม push main

Claudy เรียก worker ผ่าน Bash ตรง ไม่ใช่ wrapper `.claude/agents/codex-engineer.md` (wrapper กินโควตา Claude)

ผลเก็บใน `Output/Codex/runs/<id>/` หรือ `Output/Astra/runs/<id>/`: ใบงาน รายงาน บันทึกเหตุการณ์ ข้อผิดพลาด และสถานะ แยก `failed` / `rate_limited` / `ready_for_review` อย่างชัดเจน (exit code 1 / 3 / 0) จำกัด 10 นาที (read-only) ไม่มีการ retry ใช้โควตาอัตโนมัติ. `rate_limited` = stderr หรือ event error มีคำว่า rate limit / usage limit / 429 → Claudy สลับ `work-mode.json` เป็น `claude-only`. Read-only ไม่ใช่การจำกัดว่าอ่านได้เฉพาะโฟลเดอร์ project

`--publish` เผยแพร่เฉพาะสถานะจำกัดของ Agent ที่เลือกไป Firestore ไม่ส่งใบงาน/รายงาน/เส้นทางส่วนตัว ไม่อัปเดตงานเก่าหรือ Work Log และไม่ push Git. ผลที่ได้ยังรอตรวจรับ ไม่ได้หมายความว่าผ่าน Reese หรือ Chris. ถ้าฝั่ง Claude ใช้งานไม่ได้ ให้คนตรวจผล หรือใช้ขั้นตรวจที่เจ้าของอนุญาตโดยบันทึกผู้ตรวจจริง

เว็บเป็น dashboard ดูข้อมูลและคัดลอกคำสั่งเท่านั้น ไม่มีช่องรับคำสั่งอัตโนมัติจากเว็บหรือ Firestore. ไม่มีโมเดล API key ฝังในเว็บ. `.claude/agents/` เป็น wrapper สำหรับ Claude และยังใช้ Claude quota; `.codex/agents/` กำหนดบทบาทใน Codex. การรันตรงจากคำสั่งข้างบนไม่เรียก wrapper ของ Claude และไม่เรียก hook-status ที่มี auto-push

เพิ่มสองการ์ดเข้า Firestore โดยไม่ seed สถานะของ Agent เดิม:

```sh
node scripts/seed-firestore.mjs codex astra
```

คำสั่ง seed เดิมเมื่อไม่ระบุชื่อยังคง seed ทุกคน ต้องระบุชื่อสองตัวนี้สำหรับการเพิ่มครั้งนี้

โฟลเดอร์ runs ถูก gitignore เพราะมีใบงานและบันทึกส่วนตัว; ไม่ควรเพิ่มไฟล์เหล่านี้ด้วย git add -f. ส่งรายงานที่ตรวจแล้วแยกเป็น Output/<Agent>/YYYY-MM-DD-topic.md เมื่อได้รับอนุญาตให้เผยแพร่

ตัวรันใช้ --ephemeral ไม่บันทึก session ของ Codex ถาวร; เมื่อ --publish จะส่ง working ก่อนเริ่ม และส่งผล ready_for_review/failed/rate_limited ตอนจบ โดยใช้ข้อความตายตัวที่ไม่เปิดเผยเนื้อหา. hook-status ข้าม wrapper ของสองตัวนี้ เพื่อไม่ให้การจบ wrapper ถูกนับเป็นงาน OpenAI สำเร็จ หรือส่งข้อความดิบขึ้นเว็บ
