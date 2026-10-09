# ใบงาน S (Dale): AVEGEE — แก้ข้อเสนอแนะ S1–S6 จากรีวิว Codex app

Repo: `/Users/agapae/agapae-work/AVEGEE` · ฐาน = `main`
ทำใน worktree: `git worktree add ../.toby-worktrees/s-fixes -b dale/s-fixes main` (ห้ามทำบน main ตรง)
ที่มา: รายงานของ Dale เอง `AGAPAE Agent/Output/Dale/2026-10-09-avegee-review-codex-app-1008.md` (มีไฟล์:บรรทัดครบ)
คุณเป้อนุมัติให้ทำทั้ง S1–S6 (9 ต.ค. 2569)

## งานขนานที่กำลังรันอยู่ (ระวังชน)
- `toby/f1` — การเดิน (room.js/frontier.js ส่วน walk)
- `toby/f2` — UI 8 ข้อ (ui.js, i18n.js, index.html, battle-facing.js, settings, คู่มือ, กระทะ)
- `codex/<run>` F3 (เริ่ม ~17:10) — มินิเกมกระจก `src/mirror-charge.js` + ภาพ krajok
→ แก้ให้ **เล็กและแคบที่สุด** เพื่อให้ merge ง่าย

## ขอบเขต
- **S1 cache-bust CSS** — **ไม่ต้องทำใน branch นี้** ทำตอน merge รอบสุดท้ายของชุด F/S: bump `?v=` ของทุก CSS/JS ที่ถูกแก้ใน `index.html` ครั้งเดียว (กันชนกับ F2/F3)
- **S2 Cache Storage รูป** (`src/asset-preload.js`) — ผูกชื่อ cache กับเวอร์ชัน catalog และลบ key `avegee-images-*` ที่ไม่ตรงตอนเริ่มเกม
  (ถ้าพบว่า Cache Storage ซ้ำซ้อนกับ HTTP cache จนไม่จำเป็น เสนอเอาออกได้ แต่เลือกทางที่เสี่ยงน้อยที่สุด) + เทสต์
- **S3 คำบรรยาย** `src/story.js:55` "ตบบ่ายมบาทน้อย" → "ตบบ่าของยมบาทน้อย" (เช็ค EN ให้ตรงความหมายด้วย)
- **S4 ไฟล์ใหญ่**
  - ลบ `img/yama-intro-combined-v1.mp4` ถ้ายืนยันอีกครั้งว่าไม่มีที่อ้าง (grep ทั้ง repo รวม docs/handoff)
  - บีบ `intro-opening-v2.mp4` (6.8MB, preload=auto) ให้ ≤ ~2.5MB ด้วย ffmpeg (H.264, faststart) — เทียบเฟรมก่อน/หลังว่าคุณภาพยังดี · ถ้าบีบแล้วแย่ ให้เปลี่ยน `preload="metadata"` แทนและรายงาน
  - แปลง `frontier-west-hypnosis-v1.png`, `deva-intro-th-beggar-v2.png` เป็น webp (ใช้ชื่อไฟล์ใหม่ ไม่ทับชื่อเดิม) แก้ทุกที่อ้าง + manifest/preload-catalog ด้วยมือ
  - ห้ามแก้ประวัติ git (ไม่ rewrite history)
- **S5 i18n** — ย้ายข้อความไทยที่ฝังใน `src/ui.js` (~3980 'จัดเอกสาร', ~3988 'ปรับองศา', ~3989 'วางกระจก') และ tip ใน `src/minigames/sala.js` เข้า `src/i18n.js` TH/EN
- **S6** `src/ui.js:~4448` วิดีโอใน interlude กลางศึกต้องหยุดเมื่อปิด (root เป็น overlay ไม่ใช่ `<dialog>`) + เทสต์

## ข้อห้าม
- ไม่เปลี่ยนตัวเลขสมดุลเกม · เซฟเก่าต้องโหลดได้ · ห้ามรัน `scripts/make-manifest.py` · ไม่แตะ `img/raw/`, `Exam/`
- ไม่ merge เข้า main ไม่ push จนกว่า Claudy สั่งรวมชุด

## เกณฑ์รับงาน
1. S2–S6 ทำครบ แยก commit ต่อข้อบน `dale/s-fixes`
2. `node --test tests/*.test.mjs` ผ่าน · `node --check src/*.js` · ไม่มี 404 ใหม่ในเบราว์เซอร์ (splash, ฉากที่ใช้ webp ใหม่, มินิเกม 2 ตัวในโหมด EN)
3. รายงาน `Output/Dale/2026-10-09-avegee-s-fixes.md` (ใน repo AGAPAE Agent): ข้อละ ทำอะไร/ไฟล์/ขนาดก่อนหลัง (S4)/commit hash
