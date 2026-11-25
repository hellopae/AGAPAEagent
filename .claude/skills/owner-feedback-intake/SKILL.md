---
name: owner-feedback-intake
description: รับ feedback ชุดใหญ่ของคุณเป้ (โฟลเดอร์ภาพ/คลิป + ข้อความยาวหลายสิบข้อ) แล้วแตกเป็นใบงานโดยไม่มีข้อไหนหาย — ใช้เมื่อคุณเป้ส่ง "comment แก้งานเพิ่มเติม" พร้อม path โฟลเดอร์ (มักอยู่ ~/Desktop) และบอก "แบ่งงานจัดหมวดหมู่ คิวรวมกับงานเก่า ระวังงานหาย"
---

# รับ feedback ชุดใหญ่ของคุณเป้

## 1. เก็บไฟล์ก่อน — และกันขึ้น git ก่อน hook จะ commit
- ลอง `command ls -R "<path>"` ก่อน (26 พ.ย. Desktop อ่านได้แล้ว · ถ้าอ่านไม่ได้ ขอให้ลากใส่ `Output/Claudy/<slug>/input/`)
- `cp -R "<path>/." Output/Claudy/YYYY-MM-DD-<slug>/input/` แล้ว `du -sh` — คลิป .mov ทำให้ชุดหนึ่งหนักได้ถึง 2 GB
- **เพิ่ม path `input/` ลง `.gitignore` ทันที** (hook status/worklog จะ `git add` + push เองเมื่อ agent จบ — ไฟล์ 2 GB จะทำให้ push พัง และภาพเกมยังไม่เปิดตัว) ตรวจด้วย `git check-ignore -v <ไฟล์>`
- ลบ `.DS_Store`

## 2. บันทึกต้นฉบับตรงตัว + ติดรหัส
- `owner-comments.md` = ข้อความคุณเป้ทั้งก้อน ไม่ย่อ ไม่แก้ · ต่อท้ายแต่ละข้อด้วย `[รหัส]` (เช่น EV1 BT4a MN3 MP10 CC) — ข้อเดียวพูด 2 เรื่องให้แยก a/b · เรื่องเดียวกันที่พูดซ้ำคนละโฟลเดอร์ใช้รหัสเดิม
- ข้อที่คุณเป้ "ไม่แน่ใจ" (เช่น ภาพนี้อยู่ event ไหน) → `git grep` ชื่อไฟล์ใน `src/` ของ AVEGEE ตอบเองแล้วจดเป็น quote ใต้ข้อนั้น
- ภาพหน้าจอที่ชื่อไม่ตรงไฟล์เกม → เทียบด้วยตาหรือ `find img -iname` ก่อนสั่งวาด (26 พ.ย.: `cut-agel` = `cut-arunadet-mirror-th` ภาพซ้ำ)

## 3. แผนรวม `PLAN.md` — ตาราง รหัส → ใบงาน + งานค้างเก่า
- รวมงานค้างจาก handoff ล่าสุด (`AVEGEE/docs/claude-handoff-*.md`) และ `Output/Claudy/2026-11-13-avegee-queue-plan.md` ส่วนท้าย เป็นรหัส O1.. ในตารางเดียวกัน
- จัดใบงานตามไฟล์ที่แตะ (ศึก / สอบสวน+ข้อความ / ระบบ / เมือง UI / ห้อง) ไม่ใช่ตามโฟลเดอร์ของคุณเป้ · บั๊กที่เล่นแล้วติดขึ้นก่อน · ภาพ → Codex (เขียนทับชื่อไฟล์เดิม = ไม่ต้องแก้โค้ด)
- **ตรวจว่าไม่มีรหัสหลุด** (รันทุกครั้งที่แก้ PLAN):
```bash
grep -o -E '\[[A-Z]{2}[0-9A-Z-]*[a-z]?\]' owner-comments.md | tr -d '[]' | sort -u | while read i; do grep -q -E "(^| |\| )$i( |\||$| ·)" PLAN.md || echo "NOT IN PLAN: $i"; done
```

## 4. ก่อนปล่อยงาน
- เช็ก worktree ที่ใบงานเก่าใช้ (`git -C <wt> status -sb`) — 26 พ.ย. `z1-v5` มีการลบไฟล์ค้าง stage ที่ไม่มีใครรู้ → ให้ใบงานใหม่สร้าง worktree ใหม่จาก origin/main แทน อย่าใช้ต่อ
- เทสต์เต็มรอบบน main เป็นฐานก่อน (วิธีใน skill `codex-handoff-intake` ข้อ 4)
- Codex: ตั้งคิวแบบ `Output/Codex/runs/queue-*.py` · ถ้า `rate_limited` ดูเวลาใน `Output/Codex/runs/<run_id>/stderr.log` ("try again at …") แล้วตั้งคิวใหม่ด้วย `nohup … & disown` (skill `codex-reset-queue`)
- คุณเป้อนุญาตลบไฟล์ feedback เก่า: ลบเฉพาะชุดที่ยืนยันใน git แล้วว่างานเข้า main (`git log --grep` + `merge-base --is-ancestor`) · เก็บ .md ไว้ · ลบไฟล์เกม = ใบงาน Dale ที่ไฟล์ไม่แน่ใจต้องถามคุณเป้ก่อน (แผ่นรวมภาพใน `Output/Review/`)

## ตัวช่วยหา placeholder ที่ยังไม่วาด (AVEGEE)
placeholder จาก `scripts/build-*-placeholders.py` พื้นหลัง (24,14,20) / ตัว sprite (90,66,52)(120,96,64) — สแกน `img/**/*.webp` หาภาพที่สีนี้ >50% (ภาพจริงพื้นมืดอาจติดมาด้วย ให้เปิดดูยืนยัน) · จำนวนสีไม่ใช้เป็นเกณฑ์ได้ (placeholder มี >6,000 สีหลังบีบ webp)
