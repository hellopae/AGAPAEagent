# ตั้ง Codex fallback ในแอปครั้งเดียว

เตรียมไฟล์ชุดนี้ให้มีใน repo หลัก AGAPAE Agent หลังผู้รับตรวจรับงานก่อนใช้ข้อความด้านล่าง (งานนี้ยังไม่ merge)
Claude cloud routine ทั้ง 7 ตัวคงเวลาเดิม Codex เป็น fallback หลัง Claude; ถ้า Codex ชน limit Claude ยังรันก่อนในรอบปกติถัดไป ไม่ใช่การเรียก Claude ซ้ำทันทีในวันเดียวกัน
Mac ต้องเปิด ไม่ sleep แอปต้องเปิดและ project อยู่ในเครื่อง ณ เวลา fallback ตามข้อจำกัด [OpenAI scheduled tasks](https://learn.chatgpt.com/docs/automations?surface=app)
เตรียม Gmail/Todoist connector ใน Codex และไฟล์ horoscope ส่วนตัวตามตัวอย่างนอก repo ก่อนให้ routine ที่เกี่ยวข้องทำงาน

## คัดลอกข้อความในกรอบนี้ทั้งหมดไปวางในแอป Codex project AGAPAE Agent

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

## ตรวจสุขภาพโดยอ่านอย่างเดียว

`node scripts/routine-freshness.mjs --all`

stdout เป็น JSONL 7 บรรทัด; exit 0=ทุกตัวสด, 10=มีงานขาด/ค้าง, 1=มี error (สำคัญกว่า stale)
`fresh:null` คือ error ต้องหยุด ไม่ใช่ใบอนุญาตให้เขียน; `updateTime:null` พร้อม reason 404 เท่านั้นจึงเป็น doc ไม่มี
registry ระบุเวลา Claude/Codex, trigger ID, connector และเหตุผลความสดของแต่ละตัว
Manga ใช้ checkedAt + payload ครบ เพราะต้นฉบับไม่มีวันที่ตรวจใน dataJson และ updatedAt เปลี่ยนเมื่อเนื้อหาเปลี่ยนเท่านั้น
การรันจริงยังขึ้นกับ network/connector/สิทธิ์ของ session; งานเตรียมไฟล์นี้ไม่ได้ทดสอบการสร้าง automation จริง
