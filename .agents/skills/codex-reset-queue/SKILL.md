---
name: codex-reset-queue
description: ตั้งคิวงาน Codex (openai-worker.py --write) ให้เริ่มเองตอน Codex reset — ปล่อยทีละ 2 ตามลำดับขึ้นกับกัน, หยุดเอง+สลับ work-mode เมื่อชนลิมิต ใช้เมื่อคุณเป้บอก "Codex reset ตอน X โมง" "ตั้งเวลาไว้" "ระหว่างรอ codex reset ตามพวกนี้รอ" หรือมีใบงานวาดค้างรอ Codex
---

> หมายเหตุ mirror สำหรับ Codex: คัดลอกจาก `.claude/skills/codex-reset-queue/SKILL.md` ตรงตัว — **ห้ามแทนคำ Claude→Codex ทั้งไฟล์** (path `Documents/Work PAE/Claude/...` และค่า work-mode `claude-only` เป็นชื่อจริง)


# ตั้งคิว Codex รอ reset

## กับดัก (เคยพลาด)
- **สคริปต์คิวใน scratchpad หายเมื่อ session จบ** (run-hd-queue2.sh ของ 5 พ.ย. หายไปแล้ว ต้องเขียนใหม่ 10 พ.ย.)
  → เก็บสคริปต์ + log ที่ `Output/Codex/runs/queue-<date>.py|.log` (โฟลเดอร์นี้ gitignore → ไม่ทำให้ git สกปรก ไม่ติด DoD hook)
- ไฟล์ที่สคริปต์สร้างระหว่างทาง (เช่น ใบงานที่เติมรายชื่อ worktree) **อย่าเขียนลง `Output/Claudy/briefs/`** (tracked) → ใส่ `Output/Codex/runs/` เช่นกัน
- foreground `sleep` ถูกบล็อก และ `run_in_background` ของ Bash จะปลุก Claude ตอนจบ → ใช้ `nohup caffeinate -i python3 <script> >/dev/null 2>&1 &` (caffeinate กัน Mac หลับ แต่ปิดฝาแล้วยังหลับ — บอกคุณเป้)
- ปล่อย 2 run พร้อมกันให้เว้น ~20 วิ (run_id มาจากเวลา วินาทีเดียวกันเสี่ยงชน)
- `--write` แตก branch จาก **HEAD ของ `--project`** → ใช้ clone ที่ HEAD ตรงกับฐานในใบงาน (AVEGEE: `~/agapae-work/AVEGEE` บน main) ห้ามใช้โฟลเดอร์หลัก `Documents/Work PAE/Claude/AVEGEE` (ค้าง branch Codex app)
- ใบงานที่ต้องรู้ผลรอบก่อน (เช่น ASSEMBLE ต้องรู้ worktree ของทุก chunk) → สคริปต์อ่าน `worktree` จาก JSON ที่ worker พิมพ์ตอนจบ แล้วเขียนใบงานสำเนาใหม่ ไม่แก้ต้นฉบับ
- ใบงานเก่าหลายวันก่อน: เช็คว่าฐาน (`git rev-parse origin/main`) ยังตรงกับที่ใบงานอ้าง ถ้า main ขยับ ต้องแก้ใบงานก่อนตั้งคิว

## ขั้นตอน
1. หาใบงานที่ค้าง: `work-mode.json` → note ล่าสุด, memory `avegee-handoff-*`, `Output/Claudy/briefs/` (หัวใบงานมักเขียน "ลำดับคิว: …")
2. ดู setting ของ run รอบก่อนจากชุดเดียวกัน: `Output/Codex/runs/<id>/status.json` (`base_commit`, `model`, `effort`)
3. เขียนสคริปต์ (ต้นแบบ: `Output/Codex/runs/queue-2026-11-10.py`):
   - รอถึงเวลา reset + 2 นาที → `set_mode('both', note)` (แก้ `work-mode.json` แล้ว `git add/commit/pull --rebase --autostash/push`)
   - `batch([...])` ทีละ ≤ 2 run (กติกา Codex ขนาน ≤ 2) → `subprocess.run(['python3','scripts/openai-worker.py','--agent','codex','--task',brief,'--project',repo,'--effort','high','--write','--run'])` แล้ว parse JSON จาก stdout (`status`, `worktree`, `result_directory`)
   - ถ้ามี `status == 'rate_limited'` → `set_mode('claude-only', …)` แล้วหยุด (exit 3) — กฎข้อ 9 ของ CLAUDE.md
   - log ทุก start/end ลง `queue-<date>.log`
4. `python3 -m py_compile` ก่อนปล่อย → ปล่อยด้วย nohup+caffeinate → เช็ค log บรรทัด "queue armed, waiting Ns" + `pgrep -fl queue-`
5. บอกคุณเป้: เวลาเริ่ม, ลำดับคิว, ที่อยู่ log, งานที่ไม่ได้ใส่คิวเพราะยังไม่มีใบงาน, อย่าปิดฝาเครื่อง
6. ตรวจรับตอนจบ: อ่าน log → แต่ละ run ใช้ขั้นรีวิว/merge ตาม `scripts/OPENAI-WORKERS.md` (ถ้า run ค้าง `running` ดู skill `codex-handoff-intake`)
