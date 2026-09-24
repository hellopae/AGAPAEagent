# เอา "ดูดวง" ออกจากระบบ routine + dashboard — build note

**วันที่:** 24 ก.ย. 2569
**ผู้ทำ:** Dale (โหมด `claude-only` — ไม่ได้เรียก Codex)
**ใบงาน:** `Output/Claudy/briefs/2026-09-24-remove-horoscope.md`
**ผู้สั่ง:** คุณเป้ — ลบ Claude cloud routine ดูดวงไปเองแล้ว, สั่งเอาออกจากระบบ fallback/dashboard ด้วย

## เปลี่ยนอะไร (12 ไฟล์ +40/−140)

- `routines/fallback.json` — ลบ entry `horoscope` ออกจาก registry เหลือ 6 ตัว: `todo, email, manga, daily, article, science`
- ลบไฟล์ `routines/fallback/horoscope.md` และ `routines/fallback/horoscope.private.example.md`
- `routines/fallback/common.md` — หัวเรื่อง "fallback ทั้ง 7 ตัว" → "6 ตัว", รายการปลายทางเขียน Firestore เอา `horoscope` ออก
- `scripts/routine-freshness.mjs` — เอาเงื่อนไขพิเศษของ horoscope ใน strategy `thai-report` ออก
  (`list(fields.items, routine.key==='horoscope'?5:1, ...?5:6)` → `list(fields.items, 1, 6)`) — email/daily
  ยังใช้ strategy เดิมทำงานเหมือนเดิมทุกอย่าง (ตรวจแล้วด้วย unit test)
- `scripts/test-routine-fallback.mjs` — ลบ fixture `horoscope` ออกจาก `examples`, แก้ `registry.map(r=>r.key)`
  ให้ตรง 6 ตัวใหม่, แก้ CLI test ที่นับ JSONL 7→6 บรรทัด และย้าย index error-priority test จาก 3→2 (ตำแหน่ง
  เดิมมันชี้ที่ manga หลัง horoscope หลุดออกจาก registry ตำแหน่งขยับ) — รันผ่านทั้ง 13 test
- `routines/CODEX-SETUP.md` — ตัดข้อ `routine-fallback-horoscope` ออกจากสคริปต์ตั้งค่า Codex, เรียงเลข 1-5
  ใหม่ (todo/email/manga/daily/article), ตัดข้อความ "เตรียมไฟล์ horoscope ส่วนตัวนอก repo" ออก,
  แก้ "ทั้ง 7 ตัว/6 ตัวใหม่" → "ทั้ง 6 ตัว/5 ตัวใหม่" ทุกจุดให้เลขตรงกับ registry ปัจจุบัน
- `routines.html` — เอาแท็บ "ดูดวง", panel `#p-horoscope`, ข้อความ empty-state ของ horoscope,
  ค่าคงที่ `NATAL_HTML` (ดวงกำเนิดของคุณเป้ที่ไม่ได้อ่านจาก Firestore) และ CSS `.r-natal` ที่ผูกกับมันออกทั้งหมด —
  แท็บ Daily/Weekly/Monthly/Science Video เหลือทำงานปกติ (เทสต์จริงด้วย Playwright headless แล้ว)
- `scripts/brief.mjs` — เอาหมวด "ดวง" ออกจากทุกจุด: comment header, `doc("horoscope")`,
  ตัวแปร `horo`, บรรทัด `push("ดวงวันนี้", ...)`, fallback `stamp` (เดิม `horo?.date || email?.date`
  → เหลือ `email?.date`) — หมวดมังงะยังอยู่เหมือนเดิม (แค่ไม่อยู่ใน routine ค่าเริ่มต้น ต้องขอ `--only มังงะ`/`--all`)
- `.claude/skills/morning-brief/SKILL.md` และ `.agents/skills/morning-brief/SKILL.md` (สำเนาซ้ำในไฟล์
  ที่สอง sync ให้ตรงด้วย เพราะเนื้อหาเดิมเหมือนกัน 100% และอยู่ใน repo ไม่ใช่ `~/.codex/`) — เอาหมวด "ดวง"
  ออกจาก description, ตัวอย่างคำสั่ง `--only ดวง`, รายการหมวดที่ `--only` รับ, และตารางแหล่งข้อมูล
- `index.html` — แก้ comment 2 จุดในฟีเจอร์ "อ่าน routine ออกเสียง" (ฝั่ง dashboard เว็บ, พอร์ตมาจาก brief.mjs)
  ที่เขียนว่า "ดวงกับมังงะไม่อยู่ใน routine" ให้ตรงกับความจริงใหม่คือ "มังงะไม่อยู่ใน routine" — ฟีเจอร์นี้ไม่ได้
  ดึง Firestore doc `horoscope` เดิมอยู่แล้ว (เป็นแค่ comment/label ผิดที่ตกค้าง) จึงเป็นแค่ text fix ไม่กระทบโค้ด

## ทำไม

คุณเป้ลบ Claude cloud routine ดูดวงไปเองแล้ว ("ไม่ค่อยได้ดูแล้ว") แต่ระบบ Codex fallback ที่สร้างไว้ก่อนหน้า
(`Output/Claudy/briefs/2026-09-24-routine-codex-fallback.md`) ยังนับ horoscope เป็น 1 ใน 7 routine — ถ้าไม่เอาออก
`routine-freshness.mjs --all` จะรายงาน stale ทุกวัน และสคริปต์ตั้งค่า Codex จะไปสร้าง automation ดูดวงขึ้นมาใหม่โดยไม่มีคนดูแล้ว

## ข้อห้ามที่ยึดไว้ (ตรวจแล้วไม่ได้แตะ)

- **ไม่ได้ลบ/เขียน Firestore `agents/horoscope`** — เอกสารเก่ายังอยู่ที่เดิม (ยืนยันด้วย
  `routine-freshness.mjs` ไม่มี key `horoscope` ให้เรียกอีกแล้ว ไม่มีทางเขียนโดยไม่ตั้งใจ)
- **ไม่ได้แก้ `Output/` เก่าหรือ `worklog.json`** — grep เจอ `horoscope` ใน
  `Output/Claudy/briefs/2026-09-24-routine-codex-fallback.md`, `Output/Dale/2026-09-24-routine-codex-fallback-build.md`,
  `Output/Reese/*` (บริบทคนละเรื่อง — งานวิจัยตลาด "มูเตลู"), `worklog.json`, `status.json` (hook จัดการเอง),
  `SOP/SOP-09-new-agent.md` (เตือนเรื่อง doc id `horoscope` ยังอยู่ใน collection `agents` จริง — ข้อมูล
  ยังตรงความจริง เลยไม่แก้) — ทั้งหมดนี้ปล่อยไว้ตามข้อห้าม
- **ไม่ได้แตะ `~/.codex/`** — ไม่ได้รัน automation_update หรือแก้ automation จริงใดๆ

**สิ่งที่พบนอกขอบเขต ยังไม่ได้ทำ (แจ้ง Claudy ตัดสิน):** ใบงานก่อนหน้า (`2026-09-24-routine-codex-fallback.md`)
ระบุว่ามีไฟล์ส่วนตัว `~/Library/Application Support/AGAPAE/routine-private/horoscope.md` (`chmod 600`,
บรรจุวันเกิด/เวลาเกิด/ลัคนาจริงของคุณเป้) ที่สร้างไว้นอก repo สำหรับให้ Codex fallback อ่าน — ไฟล์นี้ไม่อยู่ใน
git และไม่อยู่ในขอบเขตของใบงานนี้ (9 ข้อ) จึงไม่ได้ลบ ถ้าคุณเป้อยากให้เก็บกวาดไฟล์นี้ด้วยต้องสั่งเพิ่ม

## วิธีตรวจ (สำหรับ Chris/QA หรือคุณเป้)

```bash
cd "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent"
node scripts/test-routine-fallback.mjs        # ต้องผ่านทั้ง 13 test
node scripts/routine-freshness.mjs --all      # ต้องออก 6 บรรทัด JSONL ไม่มี horoscope
node scripts/brief.mjs --all                  # รันได้ ไม่มีหมวดดวง (แค่ ราคา/อีเมล/งาน/ข่าว/มังงะ)
python3 -m http.server 8791 &                 # เปิด routines.html ในเบราว์เซอร์จริง
open http://localhost:8791/routines.html      # เช็คว่ามีแค่ 4 แท็บ: Daily/Weekly/Monthly/Science Video
```

มือถือ: `routines.html` responsive เดิมอยู่แล้ว (`@media(max-width:640px)` ไม่ได้แก้ media query
มีแค่ลบ tab/panel ออก) ทดสอบ resize ในเบราว์เซอร์แล้วแท็บที่เหลือ 4 ตัวยัง scroll แนวนอนได้ปกติ

## Live URL

`routines.html` เป็นหน้า static บน GitHub Pages ของ repo นี้ (ไม่มี build step, ไม่ต้อง deploy แยก) —
เปลี่ยนแล้ว push ขึ้น `main` ก็ live ทันทีที่ Pages URL เดิมของโปรเจกต์

## Rollback

`git revert <commit นี้>` แล้ว push — คืนไฟล์ horoscope ที่ลบได้ครบเพราะอยู่ใน git history ทั้งหมด
(ไม่มีอะไรถูกลบแบบ force-delete นอก git)
