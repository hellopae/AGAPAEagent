# Dale review 29G-R — AVEGEE (ฉากห้องโซน 2 ใหม่ 8 ห้อง เต็มกรอบ)

**ผล: PASS** (ไม่มี FIX LIST)

## Commit บน main (hellopae/AVEGEE, push แล้ว)
- `ce365ff` 29G: ภาพ `img/Asia/BG-{Sala,Krata,Dab,Ngiw,Lan,Sawan,Krajok,Tarang}-asia.webp` + config `zones.asia` ใน `src/data.js` + `ROOM_EXITS.asia` ใน `src/proximity.js` + `tests/room-asia29g.test.mjs` (Codex run `20261003T163827Z-84dbb3d4` rebase บน main `0ab24ca` ไม่ชน แล้ว fast-forward)
- `a7bacff` bump manifest cache เป็น `?v=20261004-29g-art` ใน `src/art.js` (จุดเล็ก Dale แก้เอง — Codex ไม่ได้ bump)
- ลบ worktree + branch ของ run นี้แล้ว · worktree เก่า `120313Z`/`120317Z` ไม่แตะ

## Diff vs ข้อห้าม
- แก้เฉพาะ: ภาพ asia 8 ใบ, `ROOMS[*].zones.asia` ของ 8 ห้อง, `ROOM_EXITS` (เพิ่มรายการ asia ไม่แก้ฟังก์ชัน/ระยะเอื้อม), เทสต์ใหม่ 1 ไฟล์
- ไม่เปลี่ยนตรรกะ/ตัวเลขสมดุล · ไม่แตะโซน 1/3/4 · lokan/tea (29D/29M) คงเดิม · `img/manifest.json` ไม่เปลี่ยน (path เดิมมีครบ) · ไม่รัน make-manifest · ไม่แตะ `img/raw/`, `Exam/`, `files/`, untracked อื่น
- หลักฐาน Codex ย้ายไป `AGAPAE Agent/Output/Toby/29g/` และ `Output/Toby/2026-10-03-avegee-29g.md` — ไม่ commit เข้า AVEGEE

## ผลตามเกณฑ์รับงาน
1. **เต็มกรอบ 8 ห้อง 2 ขนาดจอ — ผ่าน**
   - ภาพใหม่ทุกใบ 1024×549 (สัดส่วน 1913:1025 ตรงกรอบ CSS `.st-hud.zone1-room`) · ตรวจด้วยตาก่อน/หลังทั้ง 8 ใบ: สไตล์พิกเซลบูรพา (ลาวา/แดง/ทอง) เข้ากับเกม ไม่มีตัวหนังสือ/ลายน้ำ/ตัวละคร/วิญญาณในภาพ องค์ประกอบห้องเดิมครบ
   - เบราว์เซอร์จริง (Chromium/Playwright) 1280×800 (canvas 1246×667) และ 1440×900 (canvas 1406×752): ภาพเต็ม canvas ไม่มีแถบดำ ไม่มี pageerror
2. **จุดเกิด/จุดลงมือ/ปุ่มออก — ผ่าน** (กดเดินจริงบน canvas 16 รอบ = 8 ห้อง × 2 จอ)
   - เกิดตามพิกัดใหม่ · ปุ่ม "ออกไปแผนที่" ซ่อนตอนเกิด · เดินไปจุดลงมือแล้ว `inReach()` = true ทุกห้อง (lan เดินอ้อมบันไดขวาขึ้นแท่นได้และกลับได้)
   - เดินกลับถึงบันไดล่าง (0.5, ~0.935) ปุ่มออกขึ้นตรงบันไดในภาพ · กดแล้วห้องปิดทุกห้อง (หลังปิดมี popup "ได้พลังใหม่ · ตวาดข่มขู่" ของ 29H เด้งต่อ เพราะผมบังคับ zone เป็น asia ในเกมใหม่ — ไม่เกี่ยวกับ 29G)
   - ผู้คุมยืนบนพื้นที่เดินได้ ไม่ทับปุ่ม act
   - ช่างซ่อมเดินถึงไซต์: ไม่ได้ทดสอบ — 29M ย้ายปุ่มซ่อมไปอยู่บนแผนที่ ไม่ขึ้นกับพิกัดห้อง และ 29G ไม่แตะตรรกะนั้น
3. **เทสต์ / live — ผ่าน**
   - `node --test tests/*.test.mjs` = **283/283** pass (277 ของ 29G + 29H) · `node --check src/*.js` ผ่าน · `git diff --check` สะอาด
   - Live https://hellopae.github.io/AVEGEE/ : `art.js` รุ่น `20261004-29g-art` ขึ้นแล้ว, `BG-Sala-asia.webp` 118396 ไบต์ (ตรงไฟล์ใหม่) · รันชุดทดสอบเดินเดิมบน live 1280×800 ครบ 8 ห้องผ่านหมด ไม่มี pageerror · 404 เดียวคือ `img/hero-yama-side.png` (มีมาก่อนงานนี้)

## หมายเหตุ (ไม่ใช่ FIX)
- ยังไม่ได้ตรวจมือถือ (ใบงานสั่งไว้ทีหลัง)
- ทดสอบโดยฉีด `window.__openStation/__mkStation` ผ่าน Playwright route เท่านั้น ไม่มีอะไรเข้า repo
- ป้ายคำเล็กใต้ปุ่มทองในบางห้อง (krajok, ngiw, sawan) อ่านยากเล็กน้อยเพราะพื้นหลังลายถี่ — สไตล์ UI เดิม ไม่ใช่งานนี้

## Roll back
`git -C AVEGEE revert a7bacff ce365ff && git push origin main` (ได้ภาพ asia 1024×1024 เดิม + config เดิมกลับ)

## ภาพที่คุณเป้ควรดูเอง
- `Output/Toby/29g/{sala,krata,dab,ngiw,lan,sawan,krajok,tarang}-before-after.jpg` โดยเฉพาะ `lan` (ต้องเดินอ้อมบันไดขึ้นแท่น) และ `sawan`
- `Output/Dale/29g-shots/sheet-1280x800-{spawn,act,exit}.jpg`, `sheet-1440x900-{spawn,act,exit}.jpg` (ภาพจากเกมจริง 8 ห้องต่อแผ่น) + `live-*.png` (จาก Pages)
- เล่นจริง: เข้าโซน 2 → เปิดทั้ง 8 ห้อง ดูว่าเต็มกรอบ และตัวเราเดินถึงจุดลงมือ/ออกได้
