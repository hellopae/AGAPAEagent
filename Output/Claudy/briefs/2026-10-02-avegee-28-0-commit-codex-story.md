# ใบงาน 28-0: AVEGEE — รีวิว + commit งาน Codex app (เนื้อเรื่องบอส / ฉากจบ / หัวหน้าโซนถูกสิง)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · main `250b39e` · เทสต์ `node --test tests/*.test.mjs`
ที่มา: คุณเป้ 2 ต.ค. 2569 สั่ง Codex desktop app ตรง (วาดรูปเพิ่ม + cutscene เนื้อเรื่อง + ฉากจบ) แล้ว Codex ติดลิมิต (reset 15:03)
**ต้องเสร็จก่อนใบงาน 28A/28B/28C** — Toby จะแตก worktree จาก main หลัง commit นี้

## สถานะที่ Claudy ตรวจแล้ว (14:05)
- tracked M 12 ไฟล์ (+308/−78): `index.html`, `src/{art,data,game,scene,ui}.js`, `img/manifest.json`, `tests/{event-progression,final-gauntlet,frontier-breach,ui27d-map-items,ui27e-events}.test.mjs`
- untracked ใหม่ของงานนี้: `src/story.js`, `tests/story-art.test.mjs`, `img/story-*.png`, `img/leader-*-possessed.png`,
  `img/West/hero-boss-west.png`, `img/CyberHell/hero-boss-cyberhell.png`, `img/CyberHell/mob-cyber-*-cyberhell.png` (+ root fallback ถ้ามี) ฯลฯ
- เอกสาร Codex: `output/story/README.md`, `output/leaders/README.md` (อ่านก่อน — บอกว่าไฟล์ไหนคือ final)
- เทสต์บน working tree: 177/177 ผ่าน
- งานที่ **ยังไม่เสร็จ** (ติดลิมิต): 4 jobs ใน `output/leaders/perspective-edits.json` (`*-v2/v3/v4` ยังไม่มีไฟล์) — โค้ดยังไม่อ้าง จึงไม่ต้องรอ

## ขั้นตอน
1. ยืนยันไม่มีใครแก้ไฟล์อยู่ (mtime ล่าสุด 13:31)
2. รีวิว diff โค้ด + `src/story.js`: ไม่มีอ้าง `img/raw/` หรือ `output/` จากโค้ดเกม · ไม่พัง save เก่า
3. หารายการภาพที่โค้ด/manifest อ้างจริง (story panel final, possessed sprites, rulers, cyber mobs) → add เฉพาะไฟล์ที่ถูกอ้าง
   ภาพเวอร์ชันเก่าที่ไม่ถูกอ้าง (เช่น `story-ending-01.png` ถ้ามี v4 แทน) **ไม่ต้อง commit**
   ภาพใหญ่ผิดปกติ (> ~600KB) ให้ผ่าน `scripts/prep-art.py` แบบรอบ `98aebd0` ถ้าเป็น sprite (panel ภาพเต็มจอให้ย่อพอดีจอแต่คงความชัด)
4. manifest: ทุกรายการต้องมีไฟล์ใน git
5. เทสต์ทั้งหมด + `node --check` + `git diff --check`
6. commit (add ทีละ path ห้าม `-A`/`.`) → push → live: ภาพที่ commit ตอบ 200
7. ห้ามแตะ `Exam/`, `files/`, `output/`, `img/raw/`, ภาพ untracked อื่นที่ไม่เกี่ยว

## เกณฑ์รับงาน
1. โค้ด/ภาพของงานเนื้อเรื่องอยู่ใน commit ครบตามที่โค้ดอ้าง · ไม่มี 404
2. manifest ไม่มีรายการที่ไม่อยู่ใน git
3. เทสต์ผ่านทั้งหมด
4. `git status` ไม่มี M ค้าง (untracked อื่นค้างได้)
5. รายงานลิสต์ 4 jobs ที่ยังไม่เสร็จ เพื่อให้ Codex ทำต่อหลัง 15:03

## รายงาน
`Output/Dale/2026-10-02-avegee-28-0-codex-story-commit.md` — commit hash, ไฟล์ที่ commit, ภาพที่ย่อ, ตารางเกณฑ์, rollback
