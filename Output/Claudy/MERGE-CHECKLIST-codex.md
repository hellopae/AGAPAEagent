# Checklist: Codex app merge งานของ Codex run เข้า AVEGEE main

ใช้เมื่อ Claude ชนลิมิต · คุณเป้สั่ง Codex app: **"merge run <RUN_ID> ตาม checklist `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/MERGE-CHECKLIST-codex.md`"**
(ถ้าไม่ระบุ RUN_ID = ทำทุก run ที่ค้าง ตามข้อ 0 ทีละ run)

## 0. หา run ที่ค้าง
- รายการ run: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/runs/*/status.json` ที่ `"status": "ready_for_review"` และ `"review": "pending"`
  และ worktree ในนั้นยังมีอยู่จริง (`git -C /Users/agapae/agapae-work/AVEGEE worktree list`)
- ในแต่ละ run: `task.md` = ใบงาน (มีเกณฑ์รับงาน) · `report.md` = รายงาน Codex · `diff-stat.txt`
- ทำทีละ run เรียงตามเวลา (run_id เก่าก่อน)

## 1. ตรวจก่อน merge (ทำใน worktree ของ run)
1. อ่านใบงาน + รายงาน · run ที่รายงานว่า "ยังไม่ครบเกณฑ์" ข้อสำคัญ → **ไม่ merge** เขียนเหตุผลลงข้อ 4 แล้วข้าม
2. **ห้ามมีไฟล์หลักฐาน/รายงานเข้า repo เกม**: ถ้ามีโฟลเดอร์ใหม่ `output/<อะไรก็ตามของ run นี้>/` หรือ `AGAPAE Agent/` → ย้ายไป `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/<วันที่>-<ชื่องาน>/` แล้วลบออกจาก worktree
   ⚠️ อย่าลบ `output/` เดิมที่มีอยู่ใน main (เทสต์บางตัวใช้ เช่น `output/Codex/e2-preview`, `output/Codex/g5`) — ลบเฉพาะไฟล์ที่ run นี้เพิ่ม (`git status --short` ดูว่าอันไหนเป็น `??`)
3. ห้ามมีไฟล์ใน `Exam/` หรือ `files/` (ย้ายไป AVEGEE-reference แล้ว)
4. `git -C <worktree> add -A && git -C <worktree> commit -m "<run_id>: <สรุปงาน>"`

## 2. รวมกับ main ล่าสุด
1. `cd /Users/agapae/agapae-work/AVEGEE && git fetch origin && git checkout main && git pull --ff-only`
2. ใน worktree: `git merge origin/main`
3. conflict ที่เจอบ่อย = suffix cache-bust (`?v=...`) ใน `index.html` `src/ui.js` `src/preload.js` → **รวมทุกฝั่ง** ต่อ suffix ให้ครบ ไม่ตัดของใคร
4. conflict ใน**ตรรกะ** (ไม่ใช่ suffix) → **หยุด ไม่ merge** เขียนลงข้อ 4 ให้ Claudy/คุณเป้ตัดสิน
5. เช็คงานของ Codex app ไม่ถูกทับ: ทุกไฟล์ที่ commit ล่าสุดใน origin/main แก้ ต้องยังเหมือนเดิมหลัง merge ยกเว้นบรรทัด cache-bust
   (`git diff origin/main HEAD -- <ไฟล์>` ดูว่ามีแต่ส่วนของ run นี้)

## 3. ทดสอบแล้ว push
1. `node --test tests/*.test.mjs` (**ต้องใส่ `*.test.mjs`** — `node --test tests/` เฉยๆ fail หลอก · macOS ไม่มีคำสั่ง `timeout`) → **ต้องผ่านทั้งหมด** ไม่ผ่าน = ไม่ push
2. `node --check src/*.js`
3. ถ้าเปิด browser ได้: `python3 -m http.server` ที่ worktree เปิด `http://localhost:8000` เช็คจุดที่ run นี้แก้ + console ไม่มี error ใหม่
4. `cd /Users/agapae/agapae-work/AVEGEE && git merge --no-ff codex/<RUN_ID> -m "Merge codex/<RUN_ID>: <สรุป>" && git push origin main`
5. เช็ค deploy: `gh api repos/hellopae/AVEGEE/pages/builds/latest --jq '.status+" "+.commit[0:7]'` ต้องได้ `built <commit>`
6. ลบ: `git worktree remove <worktree>` และ `git branch -D codex/<RUN_ID>`

## 4. บันทึกผล
- แก้ `Output/Codex/runs/<RUN_ID>/status.json`: `"review": "merged <commit>"` หรือ `"review": "rejected: <เหตุผล>"`
- เพิ่ม 1 บรรทัดต่อ run ใน `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/MERGE-LOG.md`:
  `- <วันที่เวลา> <RUN_ID> → merged <commit> | rejected: <เหตุผล> | tests <pass>/<total>`
- commit + push repo AGAPAE Agent: `cd "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent" && git add -A Output/Codex && git commit -m "Codex merge log" && git pull --rebase --autostash && git push`

## ย้อนกลับ (ถ้าเกมพังหลัง push)
`cd /Users/agapae/agapae-work/AVEGEE && git revert -m 1 <merge commit> && git push origin main`
