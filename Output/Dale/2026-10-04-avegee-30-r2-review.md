# Dale review 30-R2 — Codex 30C (AVEGEE): **PASS** (merge แล้ว)

## Commit บน main (hellopae/AVEGEE, push แล้ว, fast-forward จาก `1130713`)
- `fcde11d` 30C: fix pause stacking/stuck, zone-change state, returning-soul routing, kong category (src/ui.js, src/game.js, src/data.js, tests/30c.test.mjs)
- Live https://hellopae.github.io/AVEGEE/ มี `pauseDlg` แล้ว · 1280×800 และ 1440×900 ไม่มี pageerror ไม่มี 4xx/5xx · สลับแท็บ 3 รอบ → หยุดเกม 1 ชั้น → "เล่นต่อ" ครั้งเดียว → G.paused=false เดินคลิกพื้นได้
- Dale ไม่ได้แก้โค้ดเพิ่ม (commit ของ Codex ที่ staged ไว้ + rebase บน `1130713` ไม่มี conflict)

## ตรวจ
- diff: 4 ไฟล์ตามขอบเขต · ไม่แตะสมดุล/สี/img/raw/Exam/CONCEPT · ไม่มี make-manifest · เซฟเก่าโหลดได้ (returning แบบไม่มี zone มี fallback `th`)
- `node --test tests/*.test.mjs` 305/305 · `node --check src/*.js` ผ่าน · `git diff --check` สะอาด

## เบราว์เซอร์จริง (Playwright Chromium; ยิง `blur`+`visibilitychange` hidden→visible + `focus` ซ้ำ 2–3 รอบ) เทียบ before (main `1130713`) กับ fix
| บริบท | before | fix |
|---|---|---|
| popup (coach) | เล่นต่อแล้วหน้าต่างหยุดเด้งซ้ำ ค้าง | หยุด 1 ชั้น · เล่นต่อ 1 ครั้งปิด · popup เดิมยังอยู่ · ปิด popup แล้ว G.paused=false |
| แผนที่ | เล่นต่อแล้วค้าง เดินไม่ได้ | เล่นต่อ 1 ครั้ง เดินได้ |
| event popup (แหกคุก) | ค้างเหมือนกัน | 1 ชั้น · popup ยังอยู่ |
| ศึก | ปิดได้ | 1 ชั้น · เล่นต่อแล้วสั่งโจมตีได้ (HP ศัตรูลด) |
| cutscene ท่า (ผนึกน้ำแข็ง) | — | 1 ชั้น · เล่นต่อแล้วศึกจบ ชนะ ปิดศึก เดินแผนที่ได้ |
| intro cutscene | เล่นต่อแล้วค้าง | 1 ชั้น · intro ยังอยู่ |
- กด Esc ที่หน้าต่างหยุด → ปิด 1 ครั้ง ถูกต้อง · ผลเหมือนกันที่ 1440×900
- **โซน 4 (#33)**: สายปกติ (UI ปุ่มย้ายโซน 1→2→3→4 ทั้งบน main และ fix) เดินได้ทั้งคู่ → main **ไม่ reproduce** ตามที่ Codex ว่า · แต่เมื่อมี `G.bossWalk` ค้าง (จำลอง) บน main: เข้าทุกโซนแล้ว paused=True, bossWalk ค้าง, เดินไม่ได้ ← อาการเดียวกับที่คุณเป้เจอ · บน fix เคลียร์ทุกโซน เดินได้ทันที ไม่ต้อง refresh → แก้ตรงกลไกที่ล็อก (`releaseDlgPause` ไม่คืนเกมถ้า bossWalk ค้าง) · ข้อควรรู้: ต้นเหตุจริงในเซฟคุณเป้ยืนยันจากเซฟนั้นไม่ได้ (จำลองกลไกเท่านั้น)
- **สำนวนกลับมา (#25)**: พบสาเหตุจริง = entry `returning` แบบเก่าไม่มี zone ถูกยัดเข้าคิวโซนปัจจุบัน · ทดสอบ: main → วิญญาณ back ตกคิวโซน 3 (west=1) · fix → โซน 3 = 0, กลับไปคิวโซน 1 ตอนย้ายกลับ · สำนวนที่ผู้เล่นลงทัณฑ์จริงยังกลับได้ (เทสต์ `a soul actually punished…` ผ่าน)
- **หมวดฉ้อโกง (#40)**: data.js `s:'kong'` · เทสต์ node: คำให้การ deny หมวด kong, `press` ได้ truth ถูก (ไม่ได้เปิด UI ศาลตรงๆ ในเบราว์เซอร์)

## ข้อสังเกต (ไม่ใช่ FIX)
1. หน้าต่างหยุดเกมตอนนี้ไม่มีปุ่มกากบาทมุมขวา (เป็น `<dialog>` แยก ไม่ผ่าน observer ที่ใส่ปุ่มปิดทอง) ปิดได้ด้วย "เล่นต่อ"/Esc
2. กด "ตั้งค่า"/"เมนูเพิ่มเติม" ในหน้าต่างหยุด → เกมออกจากโหมดหยุดทันที (finishPause) แล้วเปิดตั้งค่า ต่างจากเดิมที่ยังอยู่ในหน้าต่างหยุด — ถ้าคุณเป้อยากให้กลับมาที่หน้าหยุดเกมหลังปิดตั้งค่า แจ้ง Claudy
3. Codex ไม่ได้ถ่ายภาพ; ภาพ Dale อยู่ `Output/Dale/30c-shots/` (before-*/fix-*/live-after-30c-*)

## รายการ `akata` ให้คุณเป้ตัดสิน (ไม่ได้แก้)
1. `src/data.js` "ยักยอกเงินกองบุญของหมู่บ้าน" — ไม่ระบุพ่อแม่/ผู้มีพระคุณของผู้กระทำ
2. `src/cases.js` (ดาราหนุ่ม) "ปฏิเสธไม่รับรองบุตรที่เกิดกับหญิงสาวสี่คน" — ผู้ถูกกระทำคือบุตร/หญิงสาว ไม่ใช่พ่อแม่/ผู้มีพระคุณ
(ตรวจแล้ว `cases-asia.js` "ปกปิดการเสียชีวิตของบิดา…" เป็นบิดาตัวเอง จึงถูกต้อง ไม่ต้องแก้)

## หลักฐาน / ทำความสะอาด
- หลักฐาน Codex → `Output/Toby/30c/` (ไม่ commit เข้า AVEGEE) · ลบ worktree + branch local ของ run นี้แล้ว · worktree อื่น (30A, 30B, 30F ฯลฯ) ไม่ได้แตะ

## Roll back
`git -C ~/agapae-work/AVEGEE revert --no-edit fcde11d && git -C ~/agapae-work/AVEGEE push origin main`

## ภาพที่คุณเป้ควรดูเอง (`Output/Dale/30c-shots/`)
- `fix-D-cutscene-pause-1280.png` (หน้าต่างหยุดเกมใหม่ทับฉากศึก) · `fix-A2-map-pause-1280.png` · `before-A2-map-pause-1280.png`
- เล่นจริง: สลับแท็บระหว่างศึก/popup แล้วกลับมา กด "เล่นต่อ" ครั้งเดียว
