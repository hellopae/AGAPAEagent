# AVEGEE builder stuck — review + merge (2026-10-02)

Codex run 20261002T035843Z-2739e9d5 · merged to AVEGEE main as `250b39e` (pushed to origin/main)

## ผลรีวิว: PASS

สาเหตุ: รัศมีเดินเล่น (roam ~73.6) ใหญ่กว่ารัศมี "ถึงไซต์" (42) ช่างที่หยุดห่างไซต์ 42–73 (เช่นทัณฑ์ที่ (588,660) ไซต์ลาน (585,615) ห่าง ~45)
จึงเข้าโหมดเดินเล่นไม่เข้าใกล้ขึ้น และบางผังมี pocket ที่ findPath ไปต่อไม่ได้ → buildWait/repairWait ค้างถาวร (ทั้งสร้างและซ่อมใช้ตรรกะเดียวกัน)

การแก้ (src/game.js): งานที่รออยู่ (buildWait/repairWait) ให้ช่างเดินตรงไปจุดไซต์ที่เดินได้/มองเห็น ไม่เดินเล่น;
ถ้าค้างครบ 30 วินาทีของเวลาเกมที่เดินจริง (ไม่นับช่วงพัก/สลับแท็บ — cap 120ms ต่อเฟรม) ย้ายช่างไปจุดทำงานแล้วเริ่มนับเวลางาน
`arrivalElapsed` เก็บ/โหลดใน save · BUILD_TIME/REPAIR_TIME ไม่เปลี่ยน · escort ยังระงับการเดินตามเดิม

## เกณฑ์รับงาน
1. สาเหตุจริง — ผ่าน (เทสต์ระยะ 45 + mob fail ก่อนแก้ ผ่านหลังแก้)
2. ทุกสถานี 4 โซน build+repair × taan/dam (160 กรณี; เดินถึงเอง 158, ใช้ทางกู้ 2) — ผ่าน
3. mob / escort / pause / reload save / เส้นทางตัน — ผ่านในเทสต์จำลอง
4. สร้างทัณฑ์+ดำพร้อมกัน และเรียก draw build-work sprite — ผ่านในเทสต์ (ภาพใน Chrome ยังไม่ได้ตรวจ)
5. `node --test tests/*.test.mjs` 169/169 · `node --check` 3 ไฟล์ · `git diff --check` — ผ่าน (รันซ้ำที่ main AVEGEE ก่อน commit)

ย้อนการแก้ (git show HEAD:src/game.js) แล้วรันเทสต์ใหม่: 6 จาก 13 เทสต์ fail (รวมเทสต์ 45 หน่วย + mob, เทสต์ทุกสถานี, escort, สร้างพร้อมกัน, route lan) — เทสต์จับกรณีค้างจริง
หมายเหตุ: เทสต์ "blocked definition point plus mob" ผ่านทั้งก่อน/หลังแก้ (คุ้มครองอย่างเดียว ไม่ใช่ตัวจับ regression) แต่ตัวอื่นครอบคลุมแล้ว

## การ merge
- Codex ทำงานใน worktree (bare repo /private/tmp/avegee-arrival-20261002.git, branch fix/construction-arrival, ไม่ commit) — ดึง diff ออกมา apply บน main AVEGEE
- commit เฉพาะ 3 ไฟล์: src/game.js, tests/construction-workers.test.mjs, tests/construction-arrival.test.mjs (ใหม่)
- ไฟล์ค้างของคุณเป้ (untracked: Exam/, files/, img/, output/) ไม่ถูกแตะ ไม่ชน ไม่ต้อง stash

## Follow-up / QA
- ยังไม่ได้ดูในเบราว์เซอร์จริง — ควรทดสอบ build('lan') + build('krajok') พร้อมกันในโซน th ให้ทัณฑ์เดินถึงลานแล้วป้ายเปลี่ยนเป็นกำลังก่อสร้าง
- เทสต์ construction-arrival ใช้ python3 + PIL อ่านภาพ (ต้องมีใน env ที่รันเทสต์)
- Roll back: `git revert 250b39e` ใน AVEGEE
