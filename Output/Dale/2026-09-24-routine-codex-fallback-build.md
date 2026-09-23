# Codex fallback สำหรับ Claude routines ทุกตัว + science precondition — build note

**วันที่:** 24 ก.ย. 2569
**ผู้ทำ:** Dale — รับช่วงต่อจาก Codex (ชน usage limit กลางงานขณะแก้ `article.md`/`manga.md` ด้วย python replace)
**ใบงาน:** `Output/Claudy/briefs/2026-09-24-routine-codex-fallback.md`
**Commit ที่ merge เข้า main:** `9a935bf` (บน branch `main`, push แล้ว: `1a5258e..9a935bf`)

## เปลี่ยนอะไร

16 ไฟล์ (+962/−16) — ระบบ fallback ให้ Codex (local automation บนเครื่อง Mac) ทำแทนเมื่อ Claude cloud routine
ชน weekly limit สำหรับ routine ทั้ง 7 ตัว (horoscope, todo, email, manga, daily, article, science):

- `scripts/push-science-video.mjs` — เพิ่ม optimistic precondition (`currentDocument.updateTime` หรือ
  `exists=false`), flag `--expect-update-time <ts|missing>` และ `--dry-run` — พังแล้วไม่ retry ไม่เขียนทับ
- `routines/fallback.json` — registry 7 routine: trigger id, Firestore doc, cadence, เวลา Claude/Codex
  (Codex รันหลัง Claude 2 ชม.), connector ที่ต้องใช้, เหตุผล freshness
- `scripts/routine-freshness.mjs` — GET Firestore แล้วตัดสิน "ทำวันนี้/สัปดาห์นี้แล้วหรือยัง" จาก **เนื้อหา**
  จริง (ไม่ใช่แค่ `updateTime`) exit 0=สด/ข้าม, 10=ค้าง/ทำต่อ, 1=error หยุด — มีโหมด `--all`
- `routines/fallback/common.md` — กติการ่วม (snapshot precondition, ห้าม retry, ห้ามแก้ repo)
  + Python writer ที่ทุก prompt เรียกใช้ตอนเขียน Firestore
- `routines/fallback/{horoscope,todo,email,manga,daily,article,science}.md` — 7 prompt สำหรับ Codex
  port มาจาก prompt เดิมของ Claude แต่ละตัว schema ปลายทางเหมือนเดิมทุกประการ
- `routines/fallback/horoscope.private.example.md` — โครงไฟล์ตัวอย่าง (ค่าสมมติ) สำหรับ horoscope ส่วนตัว
- `routines/CODEX-SETUP.md` — ข้อความสำเร็จรูปให้คุณเป้ copy ไปวางในแอป Codex ครั้งเดียว
- `SOP/SOP-12-science-video.md`, `scripts/README.md` — อัปเดตให้ตรงตารางเวลาใหม่ + ชี้ไปยัง `routines/`

**นอก repo (ไม่ commit):** สร้าง `~/Library/Application Support/AGAPAE/routine-private/horoscope.md`
(`chmod 600`) บรรจุวันเกิด/เวลาเกิด/ลัคนาจริงของคุณเป้ ที่ `routines/fallback/horoscope.md` จะอ่านตอนรัน
— คัดจาก prompt ต้นฉบับ Daily Horoscope เท่านั้น ไม่มีสำเนาอยู่ใน repo

## ทำไม

Claude cloud routines ล้มหลายวันติดเพราะชน weekly limit (Daily News ล้ม 12–16, 19–23 ก.ย.) คุณเป้สั่งให้ Codex
(local บน Mac) ทำแทนเมื่อ Claude ล้ม เหมือนที่ทำกับ Science Animation อยู่แล้ว — งานนี้ขยายรูปแบบเดียวกัน
ไปครบทั้ง 7 routine พร้อม guardrail กันเขียนทับ/เขียนซ้ำ/เขียนข้อมูลไม่ครบ

## รีวิว 7 ข้อเกณฑ์รับงาน (ทั้งหมด PASS — ไม่ต้องแก้อะไรเพิ่ม)

1. **push-science-video.mjs ใช้ precondition ทุกครั้ง, ล้มแล้วไม่ retry, มี `--expect-update-time`/`--dry-run`**
   PASS — ตรวจโค้ดแล้วทดสอบจริง: dry-run พิมพ์ URL/body ที่มี `currentDocument.updateTime`/`exists=false`
   และ `updateMask.fieldPaths` ครบ 5 ฟิลด์โดยไม่ยิง network เมื่อส่ง `--expect-update-time`; ทดสอบ unit
   ยืนยัน HTTP 400/409/412 → exit 1 ไม่ retry (ดูผลรันด้านล่าง)
2. **routine-freshness.mjs คืน exit 0/10/1 ตามสเปก ตัดสินจากเนื้อหา วันที่ Asia/Bangkok, `--all` รันกับ
   Firestore จริงได้** PASS — รันจริงแล้ว (ผลเต็มด้านล่าง) ทุก routine ได้ค่า `fresh:false` ตรงกับสภาพจริง
   (Claude ค้างมาตั้งแต่ ~18 ก.ย.)
3. **registry ครบ 7 routine ตรงตาราง พร้อมเหตุผล freshness** PASS — ตรวจ `routines/fallback.json`
   เทียบตารางในใบงานทีละแถว (เวลา Claude/Codex, trigger id, connector) ตรงทุกตัว
4. **prompt 7 ไฟล์: เริ่มด้วย freshness, เขียนด้วย precondition, schema ตรงต้นฉบับ, กฎครบ, email/todo หยุด
   เมื่อไม่มี connector** PASS — อ่านสุ่มตรวจทั้ง 7 ไฟล์ทีละบรรทัดเทียบกับ prompt ต้นฉบับ Claude: schema
   Firestore, กฎ privacy อีเมล (ชื่อผู้ส่งเท่านั้น), กฎห้ามราคา/outsource ของ article, กฎ Versus ต้องอ่าน
   niceoppai ด้วย curl ไม่ใช้ web search — ตรงครบ; `email.md`/`todo.md` มีบรรทัด "หยุด ห้ามเขียน Firestore
   รายงานว่า fallback ต้องการ connector Gmail/Todoist" ชัดเจน
5. **ไม่มีข้อมูลส่วนตัวของ horoscope ใน repo; มีไฟล์ตัวอย่างค่าสมมติ** PASS — secret scan ยืนยันไม่พบ
   วันเกิด/เวลาเกิด/ลัคนาจริงหรืออีเมลเต็มใน diff ที่ merge; `horoscope.private.example.md` ใช้ค่าสมมติ
   (2000-01-01 ฯลฯ) เท่านั้น; สร้างไฟล์จริงไว้นอก repo ตาม STEP 3 ของใบงานแล้ว
6. **CODEX-SETUP.md วางใช้ได้ทันที: 6 ตัวใหม่ + แก้ science + ไม่แตะ publisher** PASS — ตรวจเนื้อหาข้อความ
   สำเร็จรูป มีครบ 6 automation ใหม่ (`routine-fallback-{horoscope,todo,email,manga,daily,article}`)
   RRULE ตรงตาราง, แก้ `science-video-weekly-fallback` เป็นเสาร์ 11:00, มีบรรทัด "ห้ามแตะ
   `youtube-publish-approved-science` คงไว้ PAUSED" ชัดเจน
7. **SOP-12/README อัปเดต · syntax/secret scan ผ่าน** PASS — ดูผลรันด้านล่าง

## ผลตรวจจริง

### `node --check` ทุกสคริปต์
```
scripts/push-science-video.mjs   OK
scripts/routine-freshness.mjs    OK
scripts/test-routine-fallback.mjs OK
```

### `node --test scripts/test-routine-fallback.mjs`
```
tests 14, pass 14, fail 0
```
ครอบคลุม: Bangkok/ISO-week edge case, freshness ทุก routine (fresh/partial/stale), 404/network/malformed
JSON fail-closed, CLI exit code 0/10/1 + `--all` JSONL, precondition/dry-run/no-retry ของ
push-science-video.mjs, prompt files มี freshness gate + connector-stop ครบ, shared writer เขียนแบบ
precondition + readback verify

### `node scripts/routine-freshness.mjs --all` (GET จริง กับ Firestore)
```
horoscope  fresh=false  missing/stale/incomplete content for 2026-09-24  updateTime=2026-09-18T00:14:31Z
todo       fresh=false  missing/stale/incomplete content for 2026-09-24  updateTime=2026-09-18T00:39:27Z
email      fresh=false  missing/stale/incomplete content for 2026-09-24  updateTime=2026-09-18T01:07:12Z
manga      fresh=false  missing/stale/incomplete content for 2026-09-24  updateTime=2026-09-18T01:06:53Z
daily      fresh=false  missing/stale/incomplete content for 2026-09-24  updateTime=2026-09-18T02:04:14Z
article    fresh=false  missing/stale/incomplete content for 2026-W39    updateTime=2026-09-07T01:18:48Z
science    fresh=false  document missing (404)                          updateTime=null
exit=10
```
ทุกตัวค้าง — สอดคล้องกับสถานการณ์จริง (Claude cloud routine ล้มมาตั้งแต่ ~18 ก.ย.) เมื่อคุณเป้ตั้ง Codex
automation ตาม `routines/CODEX-SETUP.md` แล้ว ตัวที่ไม่ต้องใช้ connector (horoscope, manga, daily, science)
จะเริ่มเขียนได้ทันทีรอบถัดไป — todo/email ยังต้องมี Todoist/Gmail connector ผูกกับ Codex session ก่อน
ไม่งั้น prompt จะหยุดรายงาน "fallback ต้องการ connector X" ตามที่ออกแบบไว้

### `push-science-video.mjs --dry-run`
- ไฟล์ `science-video.json` ที่ root repo เป็น**ไฟล์ต้นแบบว่าง** (`week: ""`, ไม่มี items) — สคริปต์ reject
  ถูกต้องด้วย error `week ต้องอยู่ในรูป YYYY-Www` (พิสูจน์ว่า validation ทำงาน ไม่ใช่บั๊ก)
- ทดสอบด้วยไฟล์ synthetic ที่ payload ครบ 10 items: dry-run คืน request body/URL ที่มี
  `currentDocument.exists=false` (เมื่อ `--expect-update-time missing`) และ `updateMask.fieldPaths` ครบ
  5 ฟิลด์ ไม่มีการยิง network จริง — ตรงสเปก

### `git diff --check` (merge commit)
ไม่มี whitespace error

### Secret scan (บน diff ที่ merge เข้า main)
- วันเกิด/เวลาเกิด/ลัคนาจริง (29 มกราคม 2527, 1984, 20:12, ลัคนาสิงห์): **ไม่พบ**
- อีเมลเต็ม (`hellopae@gmail.com` ฯลฯ): **ไม่พบ**
- Firebase API key อื่นนอกจาก key สาธารณะเดิม (`AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E`): **ไม่พบ**
- token pattern อื่น (`sk-`, `ghp_`, AWS key, private key block): **ไม่พบ**

## Routine ไหนที่ fallback ยังทำไม่ได้จริงในตอนนี้

- **email** และ **todo** ต้องมี connector Gmail/Todoist ผูกกับ Codex session ก่อน — ถ้า automation รันโดย
  ไม่มี connector prompt จะหยุดเองและรายงาน "fallback ต้องการ connector Gmail/Todoist" (ตามกฎในใบงาน
  ข้อ 4) **ไม่เขียน Firestore ด้วยข้อมูลมั่ว** — คุณเป้ต้องผูก connector ในแอป Codex ก่อนสองตัวนี้จะทำงานได้จริง
- ตัวอื่น (horoscope, manga, daily, article, science) ไม่ต้องใช้ connector — พร้อมทำงานทันทีหลังตั้ง
  automation ตาม CODEX-SETUP.md (แต่ horoscope ต้องมีไฟล์ private ในเครื่องก่อน — สร้างให้แล้วตาม STEP 3)

## ข้อความสำเร็จรูปสำหรับคุณเป้ (คัดเต็มจาก `routines/CODEX-SETUP.md`)

วางในแอป Codex → project **AGAPAE Agent** ครั้งเดียว:

```text
ตั้ง automation fallback ตามรายการนี้ผ่าน tool automation_update ในแอปเท่านั้น ไม่แก้ automation.toml ด้วยมือ
ก่อนแก้ ตรวจรายการ automation เดิมเพื่อไม่สร้างชื่อซ้ำ และตรวจว่า cwd มี routines/fallback.json กับ promptFile ทุกตัวแล้ว หากไฟล์ยังไม่อยู่ให้หยุดรายงาน
cwd/cwds = /Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent
project = AGAPAE Agent
ค่าร่วมทุกตัว: kind=cron, status=ACTIVE, execution_environment=local, notification_policy=failed_runs_only
timezone=Asia/Bangkok (ทุกเวลาใน RRULE เป็นเวลาไทย ไม่ใช่ UTC)
หาก tool ไม่รองรับ timezone แยก ให้ตรวจ timezone ของแอป/เครื่องเป็น Asia/Bangkok ก่อนตั้ง หากไม่ตรงหยุดรายงาน ห้ามสร้างแล้วเดาว่าเวลาไทย
ใช้ model/reasoning ตามค่าปัจจุบันของ project; science คงค่าเดิม ไม่เปลี่ยนโดยไม่มีเหตุจำเป็น

สร้าง 6 ตัวใหม่ (หากมีชื่อตรงแล้ว ให้อัปเดตตัวนั้นไม่สร้างซ้ำ):
1. name=routine-fallback-horoscope
   rrule=RRULE:FREQ=DAILY;BYHOUR=9;BYMINUTE=15;BYSECOND=0
   prompt=อ่านและทำตาม `routines/fallback/horoscope.md` ทุกขั้น
2. name=routine-fallback-todo
   rrule=RRULE:FREQ=DAILY;BYHOUR=9;BYMINUTE=30;BYSECOND=0
   prompt=อ่านและทำตาม `routines/fallback/todo.md` ทุกขั้น
3. name=routine-fallback-email
   rrule=RRULE:FREQ=DAILY;BYHOUR=10;BYMINUTE=0;BYSECOND=0
   prompt=อ่านและทำตาม `routines/fallback/email.md` ทุกขั้น
4. name=routine-fallback-manga
   rrule=RRULE:FREQ=DAILY;BYHOUR=10;BYMINUTE=5;BYSECOND=0
   prompt=อ่านและทำตาม `routines/fallback/manga.md` ทุกขั้น
5. name=routine-fallback-daily
   rrule=RRULE:FREQ=DAILY;BYHOUR=11;BYMINUTE=0;BYSECOND=0
   prompt=อ่านและทำตาม `routines/fallback/daily.md` ทุกขั้น
6. name=routine-fallback-article
   rrule=RRULE:FREQ=WEEKLY;BYDAY=MO;BYHOUR=10;BYMINUTE=15;BYSECOND=0
   prompt=อ่านและทำตาม `routines/fallback/article.md` ทุกขั้น

แก้ automation เดิม id/name=science-video-weekly-fallback ไม่สร้างตัวที่สอง:
rrule=RRULE:FREQ=WEEKLY;BYDAY=SA;BYHOUR=11;BYMINUTE=0;BYSECOND=0
prompt=อ่านและทำตาม `routines/fallback/science.md` ทุกขั้น
status=ACTIVE และค่าร่วมด้านบน

ห้ามแตะ youtube-publish-approved-science คงไว้ PAUSED
ห้ามแก้ Claude cloud routines, ไฟล์ repo, hooks, status.json, worklog.json; ห้าม commit/push/deploy
หากไม่มี automation_update หรือ field ที่ต้องใช้ไม่รองรับ ให้หยุดและรายงานข้อจำกัด ไม่แก้ไฟล์ตั้งค่าเพื่อเลี่ยง tool
หลังตั้ง อ่านกลับและตรวจทั้ง 7 ตัว: name, เวลาไทย/next run, status, cwd, prompt, execution, notification ให้ตรง แล้วสรุปสั้น ๆ ว่าตัวใดตั้งสำเร็จหรือล้มเหลว
ไม่กด Run now เพราะงานอาจเขียน Firestore จริง
```

ก่อนใช้ข้อความนี้ คุณเป้ต้องเตรียม 2 เรื่องเพิ่ม:
1. ผูก connector **Gmail** และ **Todoist** ใน Codex session (ไม่งั้น 2 routine นั้น fallback จะหยุดเองทุกรอบ)
2. ไฟล์ `~/Library/Application Support/AGAPAE/routine-private/horoscope.md` — **สร้างให้แล้ว** (chmod 600)
   ไม่ต้องทำอะไรเพิ่ม เว้นแต่ต้องการแก้ข้อมูล

## วิธี verify

```bash
cd "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent"
node --check scripts/push-science-video.mjs scripts/routine-freshness.mjs scripts/test-routine-fallback.mjs
node --test scripts/test-routine-fallback.mjs
node scripts/routine-freshness.mjs --all      # GET เท่านั้น ปลอดภัย
node scripts/push-science-video.mjs science-video.json --dry-run   # จะ error เพราะไฟล์ต้นแบบว่าง (ตามคาด)
```

## วิธี rollback

```bash
cd "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent"
git revert 9a935bf   # revert เดี่ยว ไม่กระทบ commit อื่น เพราะ merge นี้ fast-forward เป็น commit เดียว
```
ไม่มีการเขียน Firestore จริงในงานนี้ (เฉพาะ GET + dry-run) จึงไม่มีข้อมูลปลายทางต้อง rollback
ถ้าคุณเป้ตั้ง automation ใน Codex แล้วอยากถอน ให้สั่ง Codex ปิด/ลบ 6 automation ใหม่ +
คืน `science-video-weekly-fallback` เป็น 08:15 ผ่าน `automation_update` เอง (ไม่มีสคริปต์อัตโนมัติสำหรับข้อนี้)
