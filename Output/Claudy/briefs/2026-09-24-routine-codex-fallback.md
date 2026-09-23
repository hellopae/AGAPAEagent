# ใบงาน: Codex Fallback สำหรับ Claude Routines ทุกตัว + แก้ Science push precondition

## 1. บริบท

Claude cloud routines ของคุณเป้ล้มหลายวันติดเพราะ Claude ชน **weekly limit** (Daily News ล้ม 12–16, 19–23 ก.ย. ฯลฯ) คุณเป้สั่ง 24 ก.ย. 2569:
"เมื่อ Claude ติด limit ให้ Codex ทำแทน ถ้า Codex ชน limit ให้ Claude ทำแทน" — ทำแบบเดียวกับ Science Animation

รูปแบบที่ตัดสินแล้ว (Claudy):
- **Claude cloud routine = primary** (เวลาเดิม ไม่แตะ) · **Codex app automation (local บน Mac) = fallback** รันหลัง Claude ~2 ชม.
- Fallback เริ่มด้วยการ **ตรวจความสด** ของ Firestore doc ปลายทาง: ถ้า Claude ทำของวันนี้/สัปดาห์นี้แล้ว → จบเงียบ · ถ้ายังไม่มี → Codex ทำงานนั้นเองตาม prompt ที่ port มา
- ทิศกลับ (Codex limit → Claude) ครอบคลุมโดยอัตโนมัติ เพราะ Claude รันก่อนเสมอ
- Codex สร้าง automation ได้ผ่าน tool `automation_update` ในแอป Codex เท่านั้น → งานนี้ **เตรียมไฟล์ทั้งหมด + ข้อความสำเร็จรูป** ให้คุณเป้วางในแอป Codex

Prompt ต้นฉบับของ Claude routine ทั้ง 7 ตัว (อ่านอย่างเดียว อยู่นอก repo):
`/private/tmp/claude-501/-Users-agapae-Documents-Work-PAE-Claude-AGAPAE-Agent/ac81664d-f35d-4476-88c8-58625d4e43b5/scratchpad/claude-routine-prompts.md`

| key | Claude routine | Firestore doc | Claude (Asia/Bangkok) | Codex fallback |
|---|---|---|---|---|
| horoscope | Daily Horoscope | agents/horoscope | ทุกวัน 07:13 | ทุกวัน 09:15 |
| todo | To Do Sync (Todoist) | agents/todo | ทุกวัน 07:30 | ทุกวัน 09:30 |
| email | Email Check (Gmail) | agents/email | ทุกวัน 08:00 | ทุกวัน 10:00 |
| manga | Manga Sync | agents/manga | ทุกวัน 08:05 | ทุกวัน 10:05 |
| daily | Daily News Digest | agents/daily | ทุกวัน 09:00 | ทุกวัน 11:00 |
| article | Weekly Article Topics | agents/article | จันทร์ 08:15 | จันทร์ 10:15 |
| science | Science Video | agents/science_video | เสาร์ 08:00 | เสาร์ 11:00 (เดิม 08:15 PAUSED) |

## 2. ขอบเขต

1. **`scripts/push-science-video.mjs`** — เพิ่ม optimistic precondition: GET doc ก่อน → PATCH ด้วย `currentDocument.updateTime=<ที่อ่าน>` (หรือ `currentDocument.exists=false` ถ้า 404) · precondition ล้ม (HTTP 400/409/412 FAILED_PRECONDITION) → exit non-zero พร้อมข้อความชัด **ไม่ retry ไม่เขียนทับ** · รองรับ `--expect-update-time <ts>` ให้ผู้เรียกส่งค่าจากตอนเริ่มงานได้ (ใช้ค่านี้แทนการ GET ใหม่ เพื่อกันกรณี Claude เขียนระหว่างที่ Codex กำลังค้นคว้า)
2. **`routines/fallback.json`** — registry ตามตารางด้านบน: key, name, claudeTriggerId, firestoreDoc, cadence (`daily`/`weekly`), claude schedule, codex rrule, connectors ที่ต้องใช้, `freshness` (วิธีตัดสินว่าทำแล้ว), `promptFile`
3. **`scripts/routine-freshness.mjs <key>`** — อ่าน registry → GET Firestore doc (ใช้ project/key สาธารณะเดียวกับ `scripts/push-science-video.mjs` ห้ามเพิ่ม credential ใหม่) → ตัดสินตามวันที่ Asia/Bangkok
   - exit **0** = ทำแล้ว (ข้าม) · exit **10** = ยังไม่ทำ/ค้าง (ให้ fallback ทำ) · exit **1** = error (network/parse) → fallback หยุดและรายงาน ห้ามเดา
   - พิมพ์ JSON 1 บรรทัด: `{key, doc, fresh, reason, updateTime}` เพื่อส่ง `updateTime` ต่อให้ขั้นเขียน
   - ความสดต้องดู **เนื้อหา** (เช่น field วันที่ของรายงาน/ISO week ใน dataJson) ไม่ใช่แค่ `updateTime` ของ doc เพราะ run ที่ล้มกลางทางอาจเขียนสถานะบางส่วน — อ่าน prompt ต้นฉบับแต่ละตัวเพื่อหาว่า Claude เขียน field วันที่ไหน แล้วบันทึกเหตุผลที่เลือกใน registry
   - มีโหมด `--all` พิมพ์สถานะทุก routine (ไว้ให้คุณเป้/Claudy เช็คสุขภาพ)
4. **`routines/fallback/<key>.md`** × 7 — prompt สำหรับ Codex port จาก prompt ของ Claude ให้ได้ผลลัพธ์ schema เดียวกันใน doc เดียวกัน
   - ขั้นแรกทุกไฟล์: `node scripts/routine-freshness.mjs <key>` → 0 จบเงียบ / 1 หยุดรายงาน / 10 ทำต่อ
   - ขั้นเขียน Firestore ต้องใช้ precondition `updateTime` จากขั้นแรก (กันเขียนทับถ้า Claude ถูกกด Try again แล้วเสร็จก่อน)
   - เปลี่ยนเครื่องมือเฉพาะของ Claude เป็นของ Codex: WebSearch → web search ของ Codex · `/tmp` ใช้ได้ · ใส่ `source:"codex-fallback"` ถ้า schema มีที่ให้ใส่
   - **email / todo ต้องใช้ connector (Gmail / Todoist)**: ถ้า Codex ไม่มี tool นั้นใน session → หยุด **ห้ามเขียน Firestore** รายงานว่า "fallback ต้องการ connector X" · ห้ามใช้ browser/computer-use เปิด Gmail แทน · ห้ามขอ token/password
   - คงกฎทุกข้อของต้นฉบับ: privacy ของ email (ชื่อผู้ส่งเท่านั้น), ห้ามตัวเลขราคาใน article, horoscope โทนสนุก, Todoist อ่านอย่างเดียว, ห้าม git commit/push
   - **horoscope**: ข้อมูลวันเกิด/เวลาเกิด/ลัคนาของคุณเป้ **ห้ามลง repo** — ให้ prompt อ่านจากไฟล์ local `~/Library/Application Support/AGAPAE/routine-private/horoscope.md` (ถ้าไม่มี → หยุดรายงาน) และเขียนไฟล์ตัวอย่างโครงสร้างไว้ใน `routines/fallback/horoscope.private.example.md` โดยใช้ค่าสมมติ
5. **`routines/fallback/science.md`** — ย้ายเนื้อหา prompt ของ automation เดิม `science-video-weekly-fallback` มาเป็นไฟล์ + ใช้ freshness/precondition ใหม่
6. **`routines/CODEX-SETUP.md`** — ข้อความสำเร็จรูปภาษาไทยให้คุณเป้ copy ไปวางในแอป Codex (project AGAPAE Agent) ครั้งเดียว ให้ Codex:
   - สร้าง 6 automation ใหม่ (`routine-fallback-<key>`) kind cron, ACTIVE, execution local, cwd = repo AGAPAE Agent, rrule ตามตาราง (Asia/Bangkok), notification `failed_runs_only`, prompt สั้น: "อ่านและทำตาม `routines/fallback/<key>.md` ทุกขั้น"
   - แก้ `science-video-weekly-fallback` เป็นเสาร์ 11:00 + prompt ชี้ `routines/fallback/science.md` + ACTIVE
   - **ไม่แตะ** `youtube-publish-approved-science` (คงไว้ PAUSED)
   - บอกข้อจำกัด: Mac ต้องเปิดและไม่ sleep ตอนเวลา fallback
7. **`SOP/SOP-12-science-video.md`** — แก้ตาราง fallback 08:15 → 11:00 และอธิบาย precondition · เพิ่มหัวข้อสั้น "Routine fallback ทั้งระบบ" ใน `scripts/README.md` ชี้ไป `routines/`

## 3. ขั้นตอน

1. อ่าน prompt ต้นฉบับทั้ง 7 + `scripts/push-science-video.mjs`, `scripts/fetch-science-video.mjs`, SOP-12
2. ทำ precondition ใน push script ก่อน แล้วทดสอบ dry path (ไม่เขียน Firestore จริง — ใช้ flag `--dry-run` ที่พิมพ์ request body/URL แทนการส่ง ถ้ายังไม่มีให้เพิ่ม)
3. เขียน registry + freshness script แล้ว **รัน `node scripts/routine-freshness.mjs --all` กับ Firestore จริง (GET อย่างเดียว)** บันทึกผลลงรายงาน
4. เขียน prompt 7 ไฟล์ + setup doc + แก้ SOP/README
5. `node --check` ทุกสคริปต์, `git diff --check`, secret scan

## 4. ข้อห้าม

- ห้ามแก้ `scripts/hook-*.mjs`, `.claude/`, `status.json`, `worklog.json`, `work-mode.json`, `review-mode.json`, `index.html`, `routines.html`
- ห้าม **เขียน** Firestore จริง (GET ได้) · ห้ามสร้าง/แก้ automation เอง (เป็นหน้าที่คุณเป้ผ่าน setup doc)
- ห้ามใส่ข้อมูลส่วนตัว (วันเกิด เวลาเกิด อีเมลเต็ม token) ลงไฟล์ใน repo · ห้ามเพิ่ม credential ใหม่ นอกจาก Firebase web key สาธารณะที่มีอยู่แล้ว
- ห้ามแก้ Claude cloud routine
- ห้าม push/merge `main` — ผลอยู่บน branch รอ Dale ตรวจ

## 5. เกณฑ์รับงาน

1. push-science-video.mjs ใช้ precondition (updateTime / exists=false) ทุกครั้ง, ล้มแล้วไม่ retry, มี `--expect-update-time` และ `--dry-run`
2. `routine-freshness.mjs` คืน exit 0/10/1 ตามสเปก, ตัดสินจากเนื้อหาตามวันที่ Asia/Bangkok, `--all` รันกับ Firestore จริงได้ (แนบผล)
3. registry ครบ 7 routine ตรงตาราง พร้อมเหตุผล freshness ของแต่ละตัว
4. prompt 7 ไฟล์: เริ่มด้วย freshness, เขียนด้วย precondition, schema ปลายทางตรงกับต้นฉบับ, กฎต้นฉบับครบ, email/todo หยุดเมื่อไม่มี connector
5. ไม่มีข้อมูลส่วนตัวของ horoscope ใน repo; มีไฟล์ตัวอย่างค่าสมมติ
6. CODEX-SETUP.md วางใช้ได้ทันที: 6 ตัวใหม่ + แก้ science + ไม่แตะ publisher
7. SOP-12/README อัปเดต · syntax/secret scan ผ่าน
