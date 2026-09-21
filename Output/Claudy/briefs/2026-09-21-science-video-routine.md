# ใบงาน: Science Video Routine + YouTube Uploader

## 1. บริบท

คุณเป้ต้องการเพิ่มสายการผลิตคลิปวิทยาศาสตร์ภาษาไทยเข้า AGAPAE Agent โดยให้ Claude เป็นตัวหลักและ ChatGPT/Codex เป็นตัวสำรองเมื่อผลของสัปดาห์ยังไม่เกิด พร้อมมี human approval ก่อนสร้างเสียง วิดีโอ และเผยแพร่ YouTube ช่องที่เป็นเจ้าของโดย `agapaedesign@gmail.com`.

## 2. ขอบเขต

1. เพิ่มหน้า Science Video ใน `routines.html` และแท็บ `Science` ใน `index.html` เพื่อแสดง 10 หัวข้อประจำสัปดาห์ สถานะการเลือก 3 หัวข้อ และสถานะผลิต/ตรวจ/เผยแพร่.
2. เพิ่มไฟล์ fallback และสคริปต์ส่งข้อมูล Science Video ไป Firestore โดยไม่ฝัง secret ใหม่.
3. เพิ่ม YouTube OAuth helper และ uploader ที่อ่าน credential/token จากไฟล์นอก repository หรือ environment เท่านั้น.
4. เพิ่มเอกสาร workflow: Claude primary เสาร์ 08:00, ChatGPT fallback เสาร์ 08:15, เผยแพร่เฉพาะรายการ APPROVED จันทร์/พุธ/ศุกร์ 08:00 Asia/Bangkok.
5. เตรียม prompt สำหรับ Codex scheduled task และขั้นตอนตั้ง Claude routine โดยป้องกันงานซ้ำด้วย week/job id.
6. ยังไม่สร้างชื่อช่อง และยังไม่เผยแพร่วิดีโอจริงในงานนี้.

## 3. ขั้นตอน

1. สำรวจโครงสร้าง Firestore/routines/scripts เดิมและใช้รูปแบบเดิม.
2. เพิ่ม data schema และ rendering โดยรักษา design token/ภาษาไทย/มือถือ.
3. ทำ OAuth แบบ localhost callback พร้อม PKCE/state หรือ device-safe installed-app flowตามที่ Google รองรับ และเก็บ token นอก Git.
4. ทำ uploader ให้ default เป็น `private`; การเผยแพร่ Public ต้องมีสถานะ APPROVED ชัดเจนและระบุไฟล์/metadata ครบ.
5. เพิ่ม dry-run และ validation เพื่อไม่อัปโหลดซ้ำ.
6. ตรวจ syntax, DOM basics, secret scan, และ git diff.

## 4. ข้อห้าม

- ห้ามแก้ `scripts/hook-*.mjs`, `.claude/`, `.codex/hooks.json`, `status.json`, `worklog.json`, `work-mode.json`.
- ห้าม commit OAuth client secret, refresh token, access token, API key ส่วนตัว หรือรหัสผ่าน.
- ห้ามอัปโหลด/เผยแพร่วิดีโอจริงโดยยังไม่มี OAuth consent และสถานะ APPROVED.
- ห้ามให้ Claude และ ChatGPT สร้าง batch เดียวกันพร้อมกัน; fallback ต้องตรวจ week/job id ก่อน.
- ห้าม push หรือ merge เข้า `main`; ผลลัพธ์อยู่บน branch เพื่อรอ Dale/คุณเป้ตรวจ.

## 5. เกณฑ์รับงาน

1. `routines.html` มีแท็บ Science Video และ `index.html` มีแท็บ Science อ่านข้อมูล fallback/Firestore ได้และยังทำงานบนมือถือ.
2. มี schema สถานะอย่างน้อย: ideas_ready, selected, voice_ready, video_ready, review, approved, scheduled, published, blocked.
3. สคริปต์ OAuth/uploader ปฏิเสธการทำงานเมื่อ credential/token หาย และไม่ log secret.
4. uploader มี dry-run, ป้องกันซ้ำด้วย video/job id และ default privacy เป็น private.
5. workflow ระบุ Claude primary, ChatGPT fallback, human gates, Higgsfield credit preflight และตารางเวลา Asia/Bangkok ครบ.
6. ไม่มี secret ใหม่ใน Git; syntax check ที่เกี่ยวข้องผ่าน.
7. รายงานผลเป็น `รอตรวจรับ` พร้อม diff stat และสิ่งที่ยังต้องให้คุณเป้ทำเอง.
