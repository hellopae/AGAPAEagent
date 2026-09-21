# Science Video Routine + YouTube Uploader — รอตรวจรับ

## ไฟล์ที่ทำ

- `routines.html` — เพิ่มแท็บ Science Video, สถานะ pipeline, เลือก 3 หัวข้อใน browser และคัดลอกผล.
- `index.html` — เพิ่มแท็บ `Science` ในเมนูหลัก พร้อม 10 หัวข้อ/บทพากย์/การเลือก 3 เรื่องและสถานะผลิต.
- `science-video.json` — fallback schema version 1.
- `scripts/push-science-video.mjs` / `fetch-science-video.mjs` — validate, ส่ง และอ่าน Firestore `agents/science_video`.
- `scripts/youtube-auth.mjs` — OAuth Desktop flow + PKCE/state; token เก็บนอก Git สิทธิ์ 600.
- `scripts/youtube-upload.mjs` — dry-run default, approval gate, Channel ID check, resumable upload และ idempotency history.
- `scripts/youtube-job.example.json` — ตัวอย่าง approved job.
- `SOP/SOP-12-science-video.md` — Claude primary, ChatGPT fallback, Botnoi/Higgsfield gates และ YouTube schedule.
- `.gitignore` / `scripts/README.md` — ป้องกัน secret และบันทึกเครื่องมือใหม่.

## การทดสอบที่รันจริง

- `node --check` สคริปต์ใหม่ทั้ง 4 ไฟล์ — ผ่าน.
- Compile inline JavaScript ใน `routines.html` ด้วย `new Function` — ผ่าน.
- `git diff --check` — ผ่าน.
- `node scripts/fetch-science-video.mjs` กับ Firestore จริง — ผ่าน, ผล `exists:false` (ยังไม่มี batch).
- `youtube-upload.mjs` dry-run กับ `lightning_realistic_hybrid_final.mp4` ขนาด 17,399,300 bytes — ผ่าน, ไม่มี network/upload.
- Chrome headless screenshot 390×844 และ 1440×900 ที่ `#science` — layout ใช้งานได้, มือถือ scroll tab แนวนอนตามตั้งใจ.
- Compile inline JavaScript ใน `index.html` และ Chrome headless screenshot แท็บ `Science` 390×844 / 1440×900 — ผ่าน.
- Secret scan — ไม่พบ credential/token ที่ถูกสร้างใหม่.

## Self-check ตามเกณฑ์รับงาน

1. แท็บ Science Video + fallback/Firestore + mobile: **ผ่านใน local render**, ยังไม่ได้ตรวจ production URL.
2. สถานะ pipeline ครบ: **ผ่าน**.
3. OAuth/uploader ปฏิเสธ credential/token ที่หายและไม่ log secret: **ผ่านจาก code path + syntax**; สร้าง Google Cloud project/OAuth Client จริงแล้วและเก็บ client JSON นอก Git สิทธิ์ 600.
4. dry-run/default private/idempotency: **ผ่าน dry-run**, upload จริงยังไม่ได้ทำตามข้อห้าม.
5. Workflow primary/fallback/human gate/credit preflight/schedule: **ผ่านใน SOP**.
6. ไม่มี secret ใหม่และ syntax ผ่าน: **ผ่าน**.
7. ส่งเป็น branch แยกและรอตรวจรับ: **ผ่าน**.

## งานภายนอกที่ยังรอ

- บันทึก `agapaedesign@gmail.com` เป็น OAuth test user (เตรียมค่าแล้ว รอคำยืนยันก่อนเปลี่ยนสิทธิ์).
- รัน OAuth consent ครั้งแรกเพื่อสร้าง refresh token และตรวจ Channel ID ของช่อง YouTube.
- Dale/คุณเป้ review diff ก่อน merge; ยังไม่ push/deploy main.
- Scheduled tasks สร้างแล้วในสถานะ PAUSED: `science-video-weekly-fallback`, `youtube-publish-approved-science`.
