# ใบงาน: เอา "ดูดวง" ออกจากระบบ routine + dashboard

- เจ้าของงาน: **Dale** (โหมด `claude-only` — ห้ามเรียก Codex)
- วันที่: 24 ก.ย. 2569
- ผู้สั่ง: คุณเป้ — "ดูดวงผมลบไปเองครับ ไม่ค่อยได้ดูแล้ว … เอาออกได้เลยครับ"

## บริบท
คุณเป้ลบ Claude routine ดูดวงทิ้งเองแล้ว (Firestore `agents/horoscope` ค้างที่ 18 ก.ย.)
แต่ระบบ Codex fallback ที่เพิ่งสร้าง (ใบงาน `2026-09-24-routine-codex-fallback.md`) ยังนับดูดวงเป็น 1 ใน 7 routine
ถ้าไม่เอาออก: Codex จะสร้าง automation ดูดวงขึ้นมาใหม่ และ `routine-freshness.mjs --all` จะรายงาน stale ทุกวัน

## ขอบเขต (ทำ)
1. `routines/fallback.json` — ลบ entry `key: "horoscope"` (เหลือ 6: todo email manga daily article science)
2. ลบไฟล์ `routines/fallback/horoscope.md` และ `routines/fallback/horoscope.private.example.md`
3. `routines/fallback/common.md` — เอา horoscope ออกจากรายการปลายทาง
4. `scripts/routine-freshness.mjs` — ลบเงื่อนไขพิเศษของ horoscope ใน `thai-report` (email ยังใช้ strategy นี้ ต้องทำงานเหมือนเดิม)
5. `scripts/test-routine-fallback.mjs` — ปรับ fixture/assert ให้ตรง registry ใหม่ แล้วรันผ่าน
6. `routines/CODEX-SETUP.md` — ลบข้อ `routine-fallback-horoscope` + ข้อความเตรียมไฟล์ horoscope ส่วนตัว, เรียงเลขใหม่ ให้ prompt ในไฟล์นี้ก๊อปไปวาง Codex ได้ทันที
7. `routines.html` — เอาแท็บ/panel/ข้อความ horoscope และ NATAL_HTML ที่ผูกกับมันออก หน้าอื่นต้องทำงานปกติ
8. `scripts/brief.mjs` + `.claude/skills/morning-brief/SKILL.md` — เอาหมวด `ดวง` ออก (มังงะคงไว้)
9. grep `horoscope|ดวง` ซ้ำทั้ง repo (ยกเว้นข้อห้าม) ให้ไม่เหลือจุดที่ยังใช้งานจริง

## ข้อห้าม
- **ห้ามลบ/เขียน Firestore** `agents/horoscope` (ข้อมูลเก่าเก็บไว้)
- ห้ามแก้ไฟล์ประวัติใน `Output/` (บันทึกเก่า) และ `worklog.json`
- ห้ามแตะ automation ใน `~/.codex/` — คุณเป้วาง prompt เอง
- ห้ามเปลี่ยนพฤติกรรม routine อื่นทั้ง 6 ตัว

## เกณฑ์รับงาน
1. `node scripts/test-routine-fallback.mjs` ผ่าน
2. `node scripts/routine-freshness.mjs --all` ออก 6 บรรทัด ไม่มี horoscope และ exit ≠ 1
3. `node scripts/brief.mjs --all` รันได้ ไม่มีหมวดดวง
4. `routines.html` เปิดได้ ไม่มี console error ไม่มีแท็บดูดวง
5. ส่งกลับ prompt ฉบับสุดท้ายจาก `routines/CODEX-SETUP.md` (ข้อความเต็ม) ให้ Claudy ส่งต่อคุณเป้
6. commit + push, `git status` สะอาด · บันทึกผลที่ `Output/Dale/2026-09-24-remove-horoscope.md`
