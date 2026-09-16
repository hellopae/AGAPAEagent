# ระบบประหยัดโควตา: 3 โหมดทำงาน + Codex relay + gate ตามความเสี่ยง

**วันที่:** 16 ก.ย. 2569 · **โดย:** Dale · **repo:** AGAPAE Agent (main)
**สาเหตุ:** คุณเป้ชนลิมิต Claude และ ChatGPT บ่อย — ลด token ที่เสียไปกับโมเดลแพง การถกกัน และลูปตรวจซ้ำ

## โหมดตอนนี้

`work-mode.json` = **`claude-only`** จนถึง `2026-09-20T12:02:00+07:00` (ChatGPT weekly limit เหลือ 1%)
ระหว่างนี้ Dale/Toby เขียนโค้ด ห้ามเรียก Codex/Astra — ครบเวลาแล้ว Claudy แจ้งคุณเป้ว่ากลับเป็น `both` ได้

## เปลี่ยนอะไรบ้าง

1. **`work-mode.json`** (ใหม่) — `mode` / `until` / `updated` / `note`
   - `both` Codex เขียนโค้ดบน branch แยก → Dale รีวิว diff · `claude-only` Dale/Toby เขียนเอง · `codex-only` คุณเป้สั่ง Codex ตรง
2. **`scripts/openai-worker.py`**
   - หา binary: `codex` ใน PATH → `/Applications/ChatGPT.app/Contents/Resources/codex` → ไม่เจอหยุดพร้อมข้อความชัด
   - `--model` ค่าเริ่มต้น = ไม่ส่ง → ใช้ `~/.codex/config.toml` (`gpt-5.6-sol`) แทน `gpt-6-astra` ที่ยังไม่ได้ยืนยันว่ามีจริง
   - `--write` (codex เท่านั้น): worktree `<parent>/.codex-worktrees/<run_id>` + branch `codex/<run_id>` จาก HEAD,
     `--sandbox workspace-write`, จำกัด 30 นาที · จบแล้วเก็บ `diff-stat.txt` + `diff.patch` (รวมไฟล์ใหม่) และบันทึก
     `branch` / `worktree` / `base_commit` ใน `status.json` ของ run · ไม่ commit ไม่ merge ไม่ push ไม่แตะ working tree หลัก
   - สถานะ `rate_limited` (exit code 3) แยกจาก `failed` (1) — ดูจาก stderr และเฉพาะ event ประเภท error/failed
     (ข้อความงานปกติที่พูดถึง "rate limit" ไม่นับ) · ตรวจเฉพาะเมื่อ run ไม่สำเร็จ
3. **`scripts/hook-gate.mjs`**
   - FACTUAL เหลือ minnie, rae, nick, news, addy (เอา codex, astra, dale, toby ออก — งานโค้ดใช้ code review เป็น gate)
   - `MAX_QA_ROUNDS` 3 → 2
   - Chris FAIL แล้วรอบแก้ **ไม่ตั้งธง fact-check ใหม่** เว้นแต่ verdict มีแท็ก `[factual]` · ข้อความ hint อัปเดตตาม
4. **กติกา no-debate + plan-relay** — `CLAUDE.md` (routing Codex/Astra, ข้อ 6 ปรับเป็น gate ตามความเสี่ยง, ข้อ 9–11 ใหม่),
   `SOP/SOP-01` (STEP 0 โหมด, ใบงาน `Output/Claudy/briefs/`, STEP 4 PASS/FIX LIST แก้ 1 รอบ delta, แท็ก `[factual]`),
   `.claude/agents/claudy.md`, `.claude/agents/chris-qa.md` (แท็ก `[factual]`, เรียกเฉพาะ sub-checker ที่เกี่ยว, ตรวจซ้ำเฉพาะข้อ),
   `CONTEXT.md` (บอก `/clear` ระหว่างงานไม่เกี่ยวกัน)
   - แก้ให้สอดคล้อง: skill `fact-check-gate`, `qa-gate` (ทั้ง `.claude/skills` และ `.agents/skills`), `SOP-02` ข้อวน 3 รอบ
5. **โมเดลต่อ agent** (frontmatter `model:`)
   - `sonnet`: dale, toby, rae, minnie, addy, nick, vera, mind, reese, chris-qa, chris-thai, chris-culture
   - `haiku`: libby, news, chris-print, codex-engineer, astra-architect · `claudy` คง `inherit`
   - alias `sonnet`/`haiku` ถูกต้องตามเอกสาร Claude Code subagents (รับ `sonnet`, `opus`, `haiku`, `fable`, model ID เต็ม หรือ `inherit`)
     และไม่มี env `CLAUDE_CODE_SUBAGENT_MODEL` ทับไว้ในเครื่องนี้
6. **ฝั่ง Codex**
   - `AGENTS.md` เขียนใหม่เป็นคู่มือสั้นของ Codex (ผู้ลงมือทำ ไม่ใช่ผู้คุมงาน, อ่านใบงาน, branch แยก, ห้าม push main,
     ห้ามแก้ hook/status/worklog/work-mode, ส่ง diff + self-check ตามเกณฑ์รับงาน, ชี้ CONTEXT/DESIGN/SOP-11)
   - `.codex/agents/claudy.toml` เขียนใหม่: การคุมงานเป็นของ Claudy ใน Claude, โหมด `codex-only` คุณเป้เป็นผู้คุมงาน
   - แก้คำที่ถูกแทนแบบตาบอด: `mind-visual.toml` (Claude Design), `chris-qa.toml` (`claude -p`), `dale-devops.toml` (path `Work PAE/Claude/`),
     `.agents/skills/` — `web-design` (path), `skill-harvest` (`.claude/`, `CLAUDE.md`), `morning-brief` (connector Claude, `AGAPAE_SPEAK=1 claude`),
     `fact-check-gate` / `weekly-review` (อ้าง `CLAUDE.md`) — ตอนนี้ `.agents/skills` ตรงกับ `.claude/skills` ทุกไฟล์
   - **`.codex/hooks.json` เปลี่ยนเป็น `{"hooks": {}}`** — ของเดิมผูก `hook-status.mjs` (auto commit + **push main**) และ Stop gate
     (สั่ง "commit + push ขึ้น origin/main") เข้ากับ Codex ด้วย path สัมบูรณ์ของ repo หลัก จะยิงแม้รันใน worktree — ขัดกฎ "Codex ห้าม push main"
7. **`scripts/OPENAI-WORKERS.md`** — binary path, model จาก config, `--write` + ขั้นตอน Dale merge/ล้าง worktree, โหมด, exit code
8. **`status.json`** — Toby `working` → `idle` (คง task "Toby งาน UI อเวจี 4 ข้อ" ให้เห็นว่าค้าง), Dale → `done`

## วิธีใช้

- สลับโหมด: บอก Claudy "โหมด claude-only" / "โหมด both" / "โหมด codex-only"
- โหมด `both` งานโค้ด:
  ```sh
  python3 scripts/openai-worker.py --agent codex --task Output/Claudy/briefs/YYYY-MM-DD-slug.md --project "/abs/path/repo" --write          # ดูแผน ไม่ใช้โควตา
  python3 scripts/openai-worker.py --agent codex --task Output/Claudy/briefs/YYYY-MM-DD-slug.md --project "/abs/path/repo" --write --run    # รันจริง
  ```
  แล้ว Dale อ่าน `Output/Codex/runs/<run_id>/diff.patch` → PASS: commit ใน worktree แล้ว merge + build + push · FIX LIST: 1 รอบ
  → ล้าง `git worktree remove <worktree>` + `git branch -D codex/<run_id>`
- exit code 3 = `rate_limited` → Claudy แก้ `work-mode.json` เป็น `claude-only` แล้วแจ้งคุณเป้

## ทดสอบอะไรไปแล้ว

- `python3 scripts/test-openai-worker.py` → **14 tests OK** (เดิม 7 + ใหม่ 7: หา binary 3 ทาง, ไม่เจอ binary = error ไม่รัน,
  ไม่ส่ง `--model` โดย default, write mode ใช้ worktree/branch `codex/`/`workspace-write`/เก็บ diff/ไม่มี push-merge-commit,
  `--write` ใช้กับ astra ไม่ได้, `rate_limited` exit 3, คำว่า rate limit ในข้อความปกติไม่นับ) — ทุกเทสต์ mock subprocess ไม่เรียกโมเดลจริง
- git จริงบน repo ทดลองใน scratchpad: `make_worktree` + `save_diff` สร้าง branch `codex/test-run`, diff-stat เห็นทั้งไฟล์แก้และไฟล์ใหม่, repo หลักยัง clean อยู่บน `main`
- plan mode กับ binary จริง: resolve เป็น `/Applications/ChatGPT.app/Contents/Resources/codex`, sandbox `workspace-write`, model `(config.toml)`
- `codex exec --help` ยืนยัน flag `-C`, `--sandbox workspace-write`, `--ephemeral`, `--json`, `--output-last-message` มีจริงใน 0.154.0-alpha.6.2
- `node --check scripts/hook-gate.mjs` ผ่าน · จำลอง event ผ่าน stdin (session ทดสอบ ลบออกจาก state แล้ว):
  - rae จบ → เรียก chris = **deny** · reese VERIFIED → allow · Chris FAIL (ไม่มีแท็ก) → rae แก้ → chris **allow** · FAIL รอบ 2 → Stop ขึ้นเป็นหมายเหตุ ไม่ block
  - dale/toby/codex จบ → chris **allow** (ไม่ตั้งธง)
  - Chris `❌ FAIL [factual]` → rae แก้ → chris **deny** (ต้องผ่าน Reese ก่อน)
- TOML ทุกไฟล์ใน `.codex/agents/` parse ผ่าน · `work-mode.json`, `status.json`, `.codex/hooks.json` เป็น JSON ถูกต้อง
- **ไม่ได้รัน Codex จริงแม้แต่ครั้งเดียว** (ไม่ใช้โควตา) — `--write --run` ของจริงจะถูกทดสอบครั้งแรกเมื่อกลับเป็นโหมด `both`

## ยังไม่ได้ตรวจ / ข้อจำกัด

- Codex ใน `workspace-write` อาจ `git commit` ใน worktree ไม่ได้ (ไฟล์ `.git` ของ worktree ชี้ออกนอก writable root) — ไม่กระทบ เพราะ diff อ่านจาก working tree
- หลัง Chris FAIL ที่ไม่มี `[factual]` ถ้าใน session เดียวกันเริ่มงาน Rae ชิ้นใหม่ที่ไม่เกี่ยวกัน hook จะไม่ตั้งธง fact-check ให้งานใหม่นั้น — `/clear` ระหว่างงานช่วยกันได้ (session ใหม่ = state ใหม่)
- `status.json`: Chris ยังค้าง `working` "ตรวจสเปกไฟล์ภาพโซน 2" จาก commit ก่อนหน้า (นอกขอบเขตงานนี้ ไม่ได้แตะ)
- ยังไม่มีการรองรับ `.codex/hooks.json` ว่างจาก CLI จริง — ถ้า Codex เตือน schema ให้ลบไฟล์ทิ้งได้เลย

## Rollback

`git revert <commit นี้>` แล้ว push — ไฟล์ทั้งหมดอยู่ใน commit เดียว ไม่มี deploy เว็บหรือ Firestore ที่ต้องย้อน
worktree ที่ worker สร้าง (ถ้ามีในอนาคต) ลบด้วย `git worktree remove` + `git branch -D codex/<run_id>`
