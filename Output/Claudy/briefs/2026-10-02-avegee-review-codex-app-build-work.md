# ใบงาน: AVEGEE — รีวิว + commit งาน Codex app (ภาพ taan/dam ตอนก่อสร้าง)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · main `377f3f8` · เทสต์ `node --test tests/*.test.mjs`
ที่มา: คุณเป้ 2 ต.ค. 2569 — สั่ง Codex desktop app ตรง "วาดรูป taan และ dam ตอนทำงานเพิ่ม" แล้วบอก "code น่าจะเสร็จแล้ว ลองตรวจสอบ"
งานนี้ทำใน working tree หลักโดยตรง (ไม่มี branch/worktree, ไม่มีใบงานเดิม) — ไฟล์แก้ล่าสุด 10:18

## ชุดไฟล์ของงานนี้ (ตามเวลาแก้ 10:10–10:18)
- โค้ด M: `scripts/prep-art.py`, `src/art.js`, `src/data.js`, `src/game.js`, `src/i18n.js`, `src/scene.js`, `src/ui.js`
- `img/manifest.json` M
- ภาพใหม่ untracked: `img/crew-taan-build-work.png`, `img/crew-dam-build-work.png`,
  `img/{Asia,West,CyberHell}/crew-{taan,dam}-<zone>-build-work.png` (6 ไฟล์)
- เทสต์ใหม่ untracked: `tests/construction-art.test.mjs`, `tests/construction-workers.test.mjs`
- `output/construction/` (preview/prompts) = ของทำงาน **ไม่ commit**

## ขั้นตอน
1. ยืนยันว่า Codex app ไม่ได้แก้ไฟล์อยู่ (mtime ไม่ขยับ) ก่อนเริ่ม
2. รีวิว diff โค้ด: ภาพ build-work แสดงเมื่อ taan/dam กำลังก่อสร้าง · fallback ภาพปกติเมื่อไม่ก่อสร้าง · ใช้ภาพตามโซน · ไม่อ้าง `img/raw/` หรือ `output/`
   ไม่เปลี่ยนสมดุล/ตรรกะเกมนอกเรื่องนี้ (ถ้าเจอการเปลี่ยนนอกเรื่อง ระบุในรายงาน)
3. ดูภาพ 8 ไฟล์จริง (พื้นใส, ขนาดสม่ำเสมอกับ crew sprite เดิม, ไม่แตก)
4. manifest: ทุกรายการที่จะ commit ต้องมีไฟล์ใน git หลัง commit (กรองรายการ untracked อื่นออกแบบรอบ `377f3f8`) ภาพ build-work 8 ไฟล์ต้องอยู่ใน manifest
5. เทสต์ทั้งหมด + `node --check` ไฟล์ JS ที่แก้ + `git diff --check`
6. ผ่าน → commit เฉพาะชุดไฟล์ข้างบน (add ทีละ path ห้าม `git add -A`/`.`) แล้ว push · ข้อเล็กแก้เองได้
   ไม่ผ่านข้อใหญ่ → ห้าม commit ส่ง FIX LIST เรียงเลขตามเกณฑ์
7. live: ภาพ 8 ไฟล์ตอบ 200

## ข้อห้าม
- ห้าม add ภาพ untracked อื่น, `Exam/`, `files/`, `output/`, `img/raw/` · ห้ามแตะ `CONCEPT.md`

## เกณฑ์รับงาน
1. ภาพ build-work ใช้ตอนก่อสร้าง ตามโซน มี fallback
2. ภาพ 8 ไฟล์คุณภาพใช้ได้ และอยู่ใน git + manifest
3. manifest ไม่มีรายการที่ไฟล์ไม่อยู่ใน git
4. เทสต์ผ่านทั้งหมด (รวม 2 ไฟล์ใหม่) · check ผ่าน
5. commit มีเฉพาะชุดไฟล์งานนี้ · push แล้ว · live 200
6. 390×844 ไม่พัง (ตรวจไม่ได้ให้ระบุ)

## รายงาน
`Output/Dale/2026-10-02-avegee-codex-app-build-work.md` — สรุปสิ่งที่ Codex เปลี่ยน, ตารางเกณฑ์, commit hash, rollback
