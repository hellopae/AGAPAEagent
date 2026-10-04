# ใบงาน 30-R1 (Dale): รีวิว + merge (1) งาน Codex app ของคุณเป้ `codex-app/2026-10-04` แล้ว (2) Codex 30C (บั๊ก)

**Repo: `/Users/agapae/agapae-work/AVEGEE`** (clone — โฟลเดอร์ `Claude/AVEGEE` เดิม session นี้เข้าไม่ได้ ห้ามลอง ดู CONTEXT.md) · main = `b199a98`
แผนรวม: `Output/Claudy/briefs/2026-10-04-avegee-30-plan.md` · แบบรีวิวที่ผ่านมา: `Output/Dale/2026-10-04-avegee-29g-review.md`

## ส่วนที่ 1 — `origin/codex-app/2026-10-04` (คุณเป้สั่ง Codex app ตรง: "วาดภาพเพิ่มเติมและแก้ไขนิดหน่อย")
1. `git fetch` · ดู `git log main..origin/codex-app/2026-10-04` + diff stat · สรุปว่าแก้อะไร วาดภาพอะไร ใช้ที่ไหน
2. ตรวจข้อห้าม: ไม่มี `img/raw/`, `output/`, ไฟล์หลักฐาน/ทดลอง, ไฟล์ > 10 MB · ภาพผ่าน manifest/cache bump ถ้ามีภาพใหม่ (ถ้าไม่ bump ให้ bump เอง)
3. เทสต์ทั้งหมด + `node --check src/*.js` + `git diff --check` · เปิดภาพใหม่ดูด้วยตา · เปิดเกมในเบราว์เซอร์ตรงจุดที่แก้ 1280×800 + 1440×900
4. ผ่าน → merge เข้า main (ff หรือ merge commit) + push · ไม่ผ่าน → **ไม่ merge**, เขียน FIX LIST สำหรับคุณเป้ (เพราะเป็นงานที่คุณเป้สั่ง Codex app เอง) แล้วไปส่วนที่ 2 บน main เดิม
5. อย่าลบ branch `codex-app/*` บน remote

## ส่วนที่ 2 — Codex 30C
Run: `Output/Codex/runs/20261004T101940Z-e5f2fa4f/` (report.md, diff.patch) · worktree `~/agapae-work/.codex-worktrees/20261004T101940Z-e5f2fa4f` · branch `codex/20261004T101940Z-e5f2fa4f` · ฐาน `b199a98`
ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-04-avegee-30c-bugs.md` · รายงาน Codex `<worktree>/output/Toby/2026-10-04-avegee-30c.md`
Codex บอก: แก้ `src/ui.js`, `src/game.js`, `src/data.js`, `tests/30c.test.mjs` · เทสต์ 292/292 · **ยังไม่ได้ทดสอบในเบราว์เซอร์เลย** (sandbox บล็อก Chromium) → ส่วนนี้เป็นหน้าที่หลักของคุณ
1. ตรวจ diff เทียบข้อห้ามในใบงาน · commit บน branch · rebase บน main ล่าสุด (หลังส่วนที่ 1) แก้ conflict ให้คงทั้งสองงาน · เทสต์ทั้งหมด
2. **ทดสอบในเบราว์เซอร์จริง (Playwright) ตามเกณฑ์รับงาน 30C ทุกข้อ:**
   - pause: จำลองสลับแท็บ (`blur` + `visibilitychange` hidden→visible ยิงหลายครั้ง) ระหว่าง ศึก / event popup / cutscene / แผนที่ → หน้าต่างหยุด ≤ 1 ชั้น, "เล่นต่อ" ครั้งเดียวกลับเล่นได้ (กดคำสั่งศึก/เดินได้จริง)
   - โซน 4: เซฟที่จบโซน 3 → เข้าโซน 4 → คลิกพื้น → เดินได้ไม่ต้อง refresh · ลองเปลี่ยนโซน 1→2, 2→3 ด้วย
   - สำนวนแรกโซน 3 ไม่มีบรรทัด "ลงทัณฑ์ 3 วาระแล้ว"
   - สำนวน "ตัดต่อเสียงพ่อแม่…" ขึ้นหมวดฉ้อโกง และเลือกข้อขัดแย้งได้ถูก
3. ผ่าน → merge + push + ยืนยัน live (https://hellopae.github.io/AVEGEE/) ไม่หน้าขาว ไม่มี pageerror · จุดเล็กแก้เอง · ข้อไหนไม่ผ่าน → FIX LIST เรียงเลขตามเกณฑ์รับงาน 30C
4. รายการ `akata` อีก 2 ข้อที่ Codex ลิสต์ไว้ → คัดลงรายงานของคุณให้ Claudy ส่งคุณเป้ตัดสิน (ไม่ต้องแก้)
5. หลักฐาน Codex ย้ายไป `Output/Toby/30c/` **ไม่ commit เข้า AVEGEE** · ลบ worktree + branch local ของ run นี้หลัง merge

## ข้อห้าม
- ไม่แตะ worktree อื่นใน `~/agapae-work/.codex-worktrees/` (30A, 30F กำลังรันอยู่)
- ไม่ force push main

## รายงาน
`Output/Dale/2026-10-04-avegee-30-r1-review.md` + ภาพ `Output/Dale/30c-shots/` · แยกผลส่วน 1 และ 2 · แต่ละส่วนตอบ **PASS** หรือ **FIX LIST** + commit บน main + roll back + ภาพที่คุณเป้ควรดูเอง
