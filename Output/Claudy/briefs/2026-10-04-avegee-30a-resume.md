# ใบงาน 30A-resume (Toby): ทำ 30A ต่อจากที่ Codex ค้างไว้ (Codex ติดลิมิตกลางทาง)

**ใบงานหลัก (ขอบเขต/ข้อห้าม/เกณฑ์รับงานทั้งหมด): `Output/Claudy/briefs/2026-10-04-avegee-30a-cutscene.md`** — อ่านก่อน
โหมด: `claude-only` (Codex rate_limited ถึง 19:41) → Toby เขียนเอง

## สถานะที่ค้าง
- worktree: `/Users/agapae/agapae-work/.codex-worktrees/20261004T102000Z-9871f6fb` · branch `codex/20261004T102000Z-9871f6fb` · ฐาน `b199a98`
- Codex แก้ไปแล้ว (staged ยังไม่ commit): `index.html`, `src/cutscene-presentation.js` (ใหม่), `src/ui.js`, `tests/30a.test.mjs` — ~251 บรรทัด · ยังไม่ได้เขียนรายงาน ไม่รู้ว่าครบข้อไหนบ้าง
- **repo ที่ใช้: clone `/Users/agapae/agapae-work/AVEGEE` เท่านั้น** — โฟลเดอร์ `Claude/AVEGEE` เดิม macOS บล็อก ห้ามลอง

## ขั้นตอน
1. อ่าน diff ที่ค้าง ตัดสินว่าใช้ต่อได้ไหม (ถ้าโครงไม่ดี ทิ้งแล้วทำใหม่ได้ บอกเหตุผลในรายงาน)
2. ทำให้ครบขอบเขต 30A ข้อ 1–5 ใน worktree เดิม
3. ทดสอบในเบราว์เซอร์จริง (Playwright) 1280×800 และ 1440×900 ตามเกณฑ์รับงาน — วัด `getBoundingClientRect` ว่ากล่องข้อความไม่ซ้อนภาพ · ภาพก่อน/หลังเก็บ `AGAPAE Agent/Output/Toby/30a/`
4. เทสต์ทั้งหมด + `node --check src/*.js` + `git diff --check` · **commit บน branch นี้** (ไม่ merge ไม่ push — Dale รีวิว/merge)
5. รายงาน `AGAPAE Agent/Output/Toby/2026-10-04-avegee-30a.md`: ข้อไหนเสร็จ/ไม่เสร็จ, ไฟล์ที่แก้, commit hash, วิธีทดสอบ

## ข้อห้ามเพิ่ม
- ไม่แตะ worktree อื่นใน `~/agapae-work/.codex-worktrees/` และไม่แตะ `~/agapae-work/AVEGEE` main (Dale กำลัง merge อยู่)
