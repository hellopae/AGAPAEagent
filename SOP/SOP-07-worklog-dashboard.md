# SOP-07 — Worklog, Dashboard & Git: กลไกบันทึกผลงานอัตโนมัติ

> Dashboard: https://hellopae.github.io/AGAPAEagent/ — Kittanate ดูหน้านี้เป็นหลัก
> ถ้า dashboard ไม่อัปเดต = งานยังไม่ถือว่าเสร็จ ไม่ว่าผลงานจะดีแค่ไหน

## กลไกอัตโนมัติ (hook)

`.claude/settings.json` ผูก hook ไว้กับ **Task tool เท่านั้น**:

| Event | คำสั่ง | ทำอะไร |
|---|---|---|
| PreToolUse(Task) | `node scripts/hook-status.mjs start` | ตั้ง agent เป็น `working` + task ลง status.json + Firestore |
| PostToolUse(Task) | `node scripts/hook-status.mjs done` | ตั้ง `done`, เพิ่ม worklog entry (local + Firestore `agents/worklog`), `git add status.json worklog.json Output && git commit && git push` แบบ detached |

**เงื่อนไข hook ทำงาน:** `subagent_type` ต้องอยู่ใน `MAP` ของ `scripts/hook-status.mjs`
**และ** agent id นั้นต้องมี entry ใน `status.json` — ขาดอย่างใดอย่างหนึ่ง hook จะเงียบ ๆ ข้ามไป

MAP ปัจจุบัน: minnie-ideas, reese-research, rae-writer, vera-design, chris-qa,
nick-analytics, claudy, news-daily, libby-index, mind-visual, dale-devops

## หน้าที่ของ Claudy หลังทุก task (บังคับ)

1. เซฟผลงานเต็มลง `Output/<Agent>/` **ก่อน** จบ Task (hook จะ commit โฟลเดอร์ Output ให้ด้วย)
2. หลังจบ: รัน `git status` — hook push แบบ best-effort อาจพลาดได้
3. ถ้าไม่สะอาด: commit + push เองทันทีด้วยรูปแบบนี้ (ไม่ต้องรอ Kittanate สั่ง):
   ```bash
   git add status.json worklog.json Output
   git commit -m "worklog: <AgentName> — <งานที่ทำ ไม่เกิน 60 ตัวอักษร>"
   git push origin main
   ```

## Schema (เมื่อต้องเขียนเอง — ใช้ skill `worklog-sync`)

### worklog.json — `{ updatedAt, entries[] }` — entry ใหม่ **unshift ไว้บนสุด**
```json
{
  "id": "wl-YYMMDD-<agentId>-<random4>",
  "datetime": "2026-07-05T08:35:00Z",
  "displayDate": "5 ก.ค. 2569",
  "displayTime": "15:35",
  "agent": "rae",
  "agentName": "Rae",
  "agentImg": "avatars/Rae.png",
  "pipeline": "content|design|quality|orchestrator|standalone",
  "status": "done",
  "title": "ชื่องานสั้น ๆ",
  "summary": "สรุปผลงาน ≤300 ตัวอักษร"
}
```
- `displayDate`/`displayTime` เป็น locale ไทย (พ.ศ.) | อัปเดต `updatedAt` ระดับบนสุดด้วยเสมอ

### status.json — `{ updatedAt, agents[] }` — แต่ละ agent:
`{ id, name, role, pipeline, img, persona, caps[], what[], status: "idle|working|done", task, report: { when, title, body } }`

### Firestore (dashboard ฟัง real-time)
- Project `agapae-studio` | สถานะ agent: doc `agents/<id>` | worklog: doc `agents/worklog`
  field `entries` (arrayUnion) | hook เขียนให้ผ่าน REST — เขียนเองเฉพาะกรณีซ่อม ดูโค้ดตัวอย่างใน
  `scripts/hook-status.mjs` และ `scripts/seed-firestore.mjs`

## GitHub Pages Gotchas (จ่ายค่าบทเรียนมาแล้ว — อย่าจ่ายซ้ำ)

1. **`.nojekyll` ที่ root ห้ามหาย** — ไม่มีไฟล์นี้ Pages จะ stall/หน้าขาว
2. Pages source ต้องตั้งเป็น branch `main` / root ใน repo settings — repo ใหม่เช็คก่อนงงว่าทำไมไม่ขึ้น
3. Vite app หน้าขาวบน Pages: เช็ค `base` ใน `vite.config` ให้ตรงชื่อ repo
4. Token สำหรับ GitHub API อยู่ใน keychain ของเครื่องนี้ (ดู memory `reference_pages_deploy`)
5. Push แล้วรอ ~1-2 นาที Pages ถึง rebuild — อย่าเพิ่งวินิจฉัยว่าพังก่อนครบ

## การตรวจสุขภาพระบบ (รันเมื่อสงสัยว่าอะไรเพี้ยน)

```bash
git status && git log --oneline -3        # push ล่าสุดขึ้นครบไหม
node -e "const s=require('./status.json'); console.log(s.updatedAt)"
node -e "const w=require('./worklog.json'); console.log(w.entries[0])"
```
เทียบ `updatedAt` กับเวลางานล่าสุด + เทียบ entry บนสุดกับสิ่งที่เพิ่งทำ — ไม่ตรง = hook พลาด ให้ sync เอง
