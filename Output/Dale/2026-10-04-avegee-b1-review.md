# B1-R (Dale): รีวิว + merge Codex B1 (roster ID + migration เซฟ) — PASS

วันที่ 2026-10-04 · repo `/Users/agapae/agapae-work/AVEGEE` (ไม่ได้แตะ `Claude/AVEGEE` เดิม, ไม่ได้แตะ worktree 30E `...T133036Z-e78bb4a0`) · Live: https://hellopae.github.io/AVEGEE/

## ผล: PASS (merge + push + live แล้ว)
- main = `6e4c20f` (fast-forward จาก `6792cc8`) · Codex ค้างเป็นไฟล์ staged ไม่ได้ commit → Dale commit เองแล้ว rebase บน main หลัง 30D/30F (ไม่มี conflict)
- worktree + branch `codex/20261004T132048Z-74f1bf9a` ลบแล้ว

## ตรวจตามใบงาน
1. **diff game.js ทุกบรรทัด** — พฤติกรรมไม่เปลี่ยน: ทีม 2 คน (`TEAM_LIMITS` normal 2), กำลังใจ, งานก่อสร้าง/ซ่อม, ศึก, moveZone เดิม · `mkCrew` ผ่าน `actorFromLegacy` ได้ค่าเดิม + id/kind/homeZone/upLv:0/recoverUntil:0 · Guard มี morale/hunger/upLv เพิ่มแต่ไม่มีโค้ดอื่นอ่าน (grep แล้ว) · นิรา = `global:nira` คนเดียว
2. **Migration** — เก็บสำเนาเซฟเดิมที่ key `avegee.save.v2.before-roster-v1` ก่อน migrate (เขียนครั้งเดียว, เซฟ v1 แล้วไม่เขียนซ้ำ, เขียนไม่ได้ → restore คืน false ไม่ทับเซฟ) · `migrateRosterSave` pure/idempotent (เทสต์ + ผมรัน save→reload→save ซ้ำ) · fixture `b1-v3.json` สังเคราะห์ แต่ผมทดสอบกับเซฟจริงที่สร้างจากโค้ด main เพิ่ม (ด้านล่าง)
3. **เซฟจริงในเบราว์เซอร์ (Playwright Chromium)** — เล่นบน main `6792cc8` ผ่าน harness จนมีเซฟกลางโซน asia (3 สาขา: th มี ทัณฑ์/กานต์/บุญ + ยักษ์ + ฝึก, asia มียมทูตของตัวเอง, กำลังใจ 0/33/55/71, ทีม 2 คน) → สลับเป็นโค้ด B1 โหลดเซฟเดิม:
   - view ตรงกับ main ทุกช่อง (โซน, ชื่อ, กำลังใจ, หิว, upLv, 4 stat, สถานี, ทีม, zoneSave ของสาขาอื่น, frontier)
   - ย้ายโซน th ↔ asia, save, reload ซ้ำ 2 รอบ: กำลังใจ 33/55/0 และ upLv ของสาขา th คงอยู่, สำรองเซฟไม่ถูกเขียนทับ
   - เกมใหม่ (context ว่าง): เริ่มปกติ ทัณฑ์+นิรา 900 เบี้ย
   - เปรียบเทียบเชิงอนุพันธ์ใน node (main vs B1, seed เดียวกัน, 300+200+100 tick, hire/build/upgrade/repair/ย้ายโซน 4 ครั้ง): output เหมือนกันทุกจุด ยกเว้นสำเนาเก่าใน `zoneSave` ของสาขาที่กำลังเล่นอยู่ (main เก็บค่าตอนจากไป = ค้าง, B1 ผูกกับ actor จริง = ตรงกว่า) — ผู้เล่นไม่เห็น
   - ขนาดเซฟโตขึ้นราว 6–8% (80.7KB → 85.8KB) + สำรองอีก 1 ชุด ยังห่างเพดาน localStorage มาก
   - 404 ใน console เป็นของเดิมบน main ด้วย ไม่ใช่ B1
4. **rebase + เทสต์** — 353/353 ผ่าน (main 346 + B1 7) · `node --check` src/*.js ผ่าน · `git diff --check` สะอาด
5. **Live** — hellopae.github.io/AVEGEE deploy แล้ว (`src/roster.js` 200): โหลดเซฟ pre-B1 จริงบน live ได้ (asia, kan 71, upLv 1, สร้างสำรองเซฟ) · เกมใหม่ 390px ขึ้นปกติ · pageerror = 0 ทั้ง 1280 และ 390

## ข้อสังเกตไม่บล็อก (ไม่แก้รอบนี้)
- `moveZone` ตอนกลับสาขา: `sv.buildK` อ่านหลังล้าง field ของ actor เดียวกัน (sv === actor) จึงได้ null เสมอ แล้ว `restoreBuilders()` จัดคนสร้าง/ซ่อมใหม่ให้ (ทดสอบซ่อมข้ามโซนแล้วผลเหมือน main) — ถ้าผู้สร้างเป็นคนที่ไม่ใช่คนแรกที่ว่าง คนสร้างอาจเปลี่ยนคน ผลลัพธ์งานยังเหมือนเดิม แนะนำให้ B2 จับเก็บ `buildK` ก่อนล้าง
- `recoverUntil` / `finalTeamMax:6` ยังเป็น field สำรอง ไม่มีโค้ดใช้ (ตามที่ Codex แจ้ง)
- Codex output report (`output/Toby/...-b1.md`) ถูก gitignore ไปกับ worktree ที่ลบ — อ่านแล้ว ไม่ได้เก็บ

## Roll back
`cd /Users/agapae/agapae-work/AVEGEE && git revert 6e4c20f && git push origin main` (หรือกลับไป `6792cc8`)
ผู้เล่นที่โหลดเซฟด้วยโค้ด B1 แล้ว: เซฟเดิมยังอยู่ที่ `localStorage['avegee.save.v2.before-roster-v1']` — กู้โดยคัดลอกค่านั้นกลับไป `avegee.save.v2` (ไม่ได้ทดสอบว่าโค้ดเก่าอ่านเซฟรูปแบบ B1 ได้ จึงให้ใช้ชุดสำรองเป็นทางกู้)

## หลักฐาน
`Output/Dale/b1-shots/b1-old-save-loaded-asia.jpg` — หน้าเมนูโหลดเซฟ pre-B1 บนโค้ด B1 ("เล่นต่อ" ขึ้น)
