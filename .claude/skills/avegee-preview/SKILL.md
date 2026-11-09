---
name: avegee-preview
description: เปิดเซิร์ฟเวอร์ดูเกม AVEGEE บนเครื่องให้เป็นงานล่าสุดจริง (เช่น http://127.0.0.1:8942) — ใช้เมื่อคุณเป้บอกว่า "เข้าเวปดูงานไม่ได้" "ลิงก์ 8942 ล่ม" "รีเฟรชแล้วยังเป็นงานเก่า" หรือขอเปิดเกมดูงานล่าสุด
---

# เปิดดูงาน AVEGEE ล่าสุด

## กับดัก (เคยพลาด 9 พ.ย. 2569)
- โฟลเดอร์ `Documents/Work PAE/Claude/AVEGEE` **ไม่ใช่งานล่าสุดเสมอไป** — มักค้างอยู่ที่ branch เก่าของ Codex
  และมีไฟล์ค้างที่คุณเป้สั่ง Codex ทำอยู่ → **ห้าม checkout/stash/pull ในโฟลเดอร์นี้**
- งานล่าสุดมักอยู่ใน **worktree ของ agent** (เช่น `~/agapae-work/.toby-worktrees/<ชื่อ>`) บน branch `claude/...` ที่ยังไม่ merge
- `launch.sh` เปิดพอร์ต 8777 จากโฟลเดอร์หลัก = งานเก่า อย่าแนะนำเมื่อคุณเป้ต้องการดูงานล่าสุด
- `nohup python3 -m http.server` ใช้เวลาเปิด 1–3 วินาที — curl ทันทีจะได้ 000 แต่จริงๆ เปิดแล้ว อย่าเปิดซ้ำ (ชนพอร์ต Errno 48)

## ขั้นตอน
1. หา branch ที่ใหม่ที่สุด:
   `git -C <AVEGEE> for-each-ref --sort=-committerdate --count=8 --format='%(committerdate:short) %(refname:short) %(subject)' refs/heads refs/remotes`
   และอ่าน memory `avegee-handoff-*` / `Output/Toby/` ล่าสุด (มักจดว่า "server 8942" รันจาก worktree ไหน)
2. หา worktree ของ branch นั้น: `git -C <AVEGEE> worktree list` → เช็คใน worktree ว่า `git status -sb` ตรงกับ origin
   - ถ้าไม่มี worktree: `git -C <AVEGEE> worktree add ~/agapae-work/.preview/<branch-slug> <branch>` (ไม่แตะโฟลเดอร์หลัก)
3. ปิดเซิร์ฟเวอร์เดิมบนพอร์ต: `lsof -iTCP:8942 -sTCP:LISTEN -P -n` → `kill <PID>`
4. เปิดจาก worktree: `cd <worktree> && nohup python3 -m http.server 8942 --bind 127.0.0.1 >/dev/null 2>&1 &`
   แล้ววนรอ curl จนได้ 200 (sleep ทีละ 1 วิ ด้วย python เพราะ foreground sleep ถูกบล็อก)
5. ยืนยันว่ารันจากโฟลเดอร์ถูก: `lsof -p <PID> -a -d cwd -Fn`
6. บอกคุณเป้: ลิงก์, branch/commit ที่เปิด, ให้กด Cmd+Shift+R, และคำสั่ง `! cd <worktree> && python3 -m http.server 8942` ไว้เปิดเองครั้งหน้า
   - ถ้าถามเรื่อง merge ขึ้น main → เช็คคำตัดสินล่าสุดใน memory ก่อน (เช่น "รอพื้น HD ครบ") และ commit ที่เพิ่มหลัง Dale รีวิว
