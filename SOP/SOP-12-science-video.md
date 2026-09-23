# SOP-12 — Science Video Pipeline

> Time zone ทุกจุด: `Asia/Bangkok` · ช่องเป็นเจ้าของโดย `agapaedesign@gmail.com`
> เป้าหมาย: Claude เป็น primary, ChatGPT/Codex เป็น fallback, มี human gate ก่อนเสียเครดิตและก่อนเผยแพร่

## 1. State และแหล่งข้อมูลร่วม

- Dashboard อ่าน Firestore document `agents/science_video`.
- Routine เขียน payload ทั้งก้อนใน field `dataJson` และเขียน `checkedAt` ทุกครั้ง.
- `week` รูปแบบ `YYYY-Www` คือ idempotency key ระดับ batch.
- `item.id` และ YouTube `job.id` ต้องไม่เปลี่ยนเมื่อทำงานเดิมต่อ.
- Firestore/doc นี้ถือเป็นข้อมูลสาธารณะ: ห้ามใส่ OAuth, absolute path, draft ลับ หรือข้อมูลบัญชี.

สถานะที่รองรับ:

`awaiting_ideas → ideas_ready → selected → voice_ready → video_ready → review → approved → scheduled → published`

ใช้ `blocked` เมื่อรอเครดิต, OAuth, ไฟล์ หรือการตัดสินใจจากคุณเป้.

## 2. Weekly — สร้าง 10 หัวข้อ

### Claude primary — เสาร์ 08:00

สร้างหัวข้อวิทยาศาสตร์ใกล้ตัว 10 เรื่องที่ไม่ซ้ำกัน แต่ละเรื่องมี:

- `id`, `title`, `hook`, `why`, `sources[]`
- บทพากย์ภาษาไทย 45–75 วินาทีใน `script`
- โครงภาพ 5–8 ช็อตใน `visualPlan[]`
- ระดับความเสี่ยงข้อเท็จจริงและคำเตือนด้านความปลอดภัยเมื่อเกี่ยวข้อง

ค้นและอ้างอิงแหล่งปฐมภูมิ/หน่วยงานวิทยาศาสตร์ ตรวจข้อเท็จจริงก่อนส่ง แล้วเขียน JSON schemaVersion 1 ผ่าน `scripts/push-science-video.mjs` โดย `source:"claude"`, `status:"ideas_ready"`.

### ChatGPT/Codex fallback — เสาร์ 11:00

1. อ่าน `routines/fallback/science.md` และรัน `node scripts/routine-freshness.mjs science` ก่อน.
2. exit 0 จบเงียบ; exit 1 หยุดรายงาน; exit 10 เก็บ JSON snapshot และ updateTime เดิมแล้วทำต่อ.
3. สร้าง/fact-check เฉพาะงานที่ขาด รักษา id/approval/production; มี production ค้างให้หยุด ไม่แทน batch.
4. ส่ง JSON ชั่วคราวนอก Git ด้วย `node scripts/push-science-video.mjs <file> --expect-update-time <snapshot.updateTime>` และ `source:"codex-fallback"`.
5. ถ้า snapshot เริ่มจาก 404 ใช้ `--expect-update-time missing` ซึ่งส่ง `currentDocument.exists=false`.
6. ทุก PATCH มี optimistic precondition: updateTime ต้องตรงค่าที่อ่านตอนเริ่มงาน จึงป้องกัน Claude Try again เขียนเสร็จระหว่าง Codex ค้นคว้า. ถ้าไม่ส่ง flag สคริปต์ GET ก่อน PATCH แต่ไม่ครอบคลุมช่วงค้นคว้า จึงบังคับ flag สำหรับ fallback.
7. HTTP 400/409/412 หรือ FAILED_PRECONDITION ให้ exit non-zero ห้าม retry/เปลี่ยน timestamp/เขียนทับ. `--dry-run` พิมพ์ URL/body ไม่ส่ง PATCH (อาจ GET หากไม่ได้ให้ snapshot).
8. GET อ่านกลับตรวจ week, ids, script ก่อนรายงานผล. ห้ามแก้ tracked files, commit/push, สร้างเสียง/วิดีโอ หรืออัป YouTube ในรอบนี้.

ดู registry และคู่มือตั้ง fallback ทั้งระบบที่ `routines/fallback.json` และ `routines/CODEX-SETUP.md`.

## 3. Human selection และ production

1. คุณเป้เลือก 3 หัวข้อในแท็บ Science Video; การเลือกเก็บใน browser ของเครื่องนั้นและคัดลอกส่งให้ Claude/ChatGPT.
2. Agent อัปเดต `status:"selected"` และสร้าง production record 3 รายการ.
3. เตรียมบท Botnoi แยก take และระบุจังหวะพัก. คุณเป้เป็นผู้ล็อกอิน/กดสร้างเสียงถ้า Botnoi ไม่มี API ที่อนุญาตไว้.
4. ก่อนเรียก Higgsfield ทุกครั้ง:
   - อ่าน balance และ estimate ปัจจุบัน.
   - ถ้า `balance < estimated_cost + 20` ให้ตั้ง `blocked` และแจ้งคุณเป้ ห้ามส่ง generation.
   - ถ้าพอจึงสร้างวิดีโอและบันทึกเฉพาะสถานะ/ลิงก์สาธารณะ ไม่ส่ง credential.
5. ส่ง draft ให้คุณเป้ตรวจ. ต้องได้รับคำว่าอนุมัติหรือสถานะ `approved` ก่อนเข้า publish queue.

## 4. YouTube OAuth — ทำครั้งแรก

1. ล็อกอิน Google Cloud Console ด้วย `agapaedesign@gmail.com`.
2. สร้าง/เลือก project เช่น `AGAPAE Science Video`.
3. เปิดใช้ **YouTube Data API v3**.
4. ตั้ง Google Auth Platform/OAuth consent:
   - Audience: External (กรณี Gmail ส่วนตัว).
   - เพิ่ม `agapaedesign@gmail.com` เป็น test user ระหว่างตั้งค่า.
   - Scopes: `youtube.upload` และ `youtube.readonly` (readonly ใช้ตรวจ Channel ID ก่อนอัปโหลด).
5. สร้าง OAuth Client แบบ **Desktop app** แล้วดาวน์โหลด JSON.
6. รัน:

   `node scripts/youtube-auth.mjs --client /absolute/path/client_secret.json`

7. เปิด URL ที่สคริปต์แสดง เลือก `agapaedesign@gmail.com` และกดยินยอม.
8. Token จะอยู่ที่ `~/Library/Application Support/AGAPAE/youtube-oauth.json` สิทธิ์ไฟล์ 600 และไม่อยู่ใน Git.

หมายเหตุ: OAuth app สถานะ Testing ทำให้ consent/refresh token สำหรับ YouTube scopes หมดอายุใน 7 วัน. ก่อนเปิด routine ระยะยาวให้เปลี่ยน Publishing status เป็น In production; บัญชีอาจเห็นหน้าเตือน unverified app จนกว่าจะผ่าน verification.

## 5. Publish queue และ uploader

เก็บ job ส่วนตัวไว้ใน:

`/Users/agapae/Documents/Work PAE/Claude/Science Animation/Publish Queue/jobs/`

เริ่มจาก `scripts/youtube-job.example.json`. ทุก job ต้องมี:

- `status:"approved"` หรือ `scheduled`
- `approvedAt`, `approvedBy`, absolute `videoPath`
- title, description, tags และ privacyStatus

ตรวจโดยไม่อัปโหลด:

`node scripts/youtube-upload.mjs --job /absolute/path/job.json`

อัปโหลดจริงต้องใส่ `--execute`. ตัวอัปโหลดตรวจ Channel ID, บังคับ approval fields, เก็บ upload history ป้องกันซ้ำ และ default เป็น Private.

## 6. Schedule เผยแพร่ — จันทร์/พุธ/ศุกร์ 08:00

1. เรียง job ที่ approved และยังไม่มี history ตาม `approvedAt`.
2. รัน dry-run ก่อนทุกครั้ง.
3. ถ้า OAuth หาย/หมดอายุ, channel ไม่ตรง, queue ว่าง หรือ validation ไม่ผ่าน ให้หยุดและแจ้งคุณเป้.
4. ถ้าผ่านจึงรัน `--execute` หนึ่ง jobต่อรอบเท่านั้น.
5. อัปเดต public status เป็น `published` พร้อม YouTube video ID; ห้ามใส่ local path/token ใน Firestore.

## 7. ขอบเขตความปลอดภัย

- ห้ามแชร์ Google password, 2FA, OAuth JSON หรือ refresh token ผ่านแชท/Firestore/GitHub.
- ห้ามให้ Claude และ ChatGPT เป็น publisher พร้อมกัน. Scheduled publisher มีเจ้าของเดียว; อีกตัวทำได้แค่ตรวจสถานะ.
- ถ้า queue ว่างให้ข้าม ห้ามหาไฟล์อื่นมาอัปโหลดแทน.
- การเปลี่ยนชื่อช่อง, ลบวิดีโอ, monetization และสิทธิ์ Manager อยู่นอก routine นี้.
