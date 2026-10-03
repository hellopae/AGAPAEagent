---
name: long-sprint-survival
description: ทำให้สปรินต์ยาวที่ delegate หลาย agent รอดจาก session limit — งานไม่หาย ไม่ต้องสั่งซ้ำ ใช้เมื่อจะสั่ง agent หลายตัวพร้อมกัน งานที่ใช้เวลานาน หรือเมื่อ agent ตายกลางทางด้วย error rate_limit / 429 / "You've hit your session limit"
---

# Skill: long-sprint-survival

**ปัญหาที่สกิลนี้แก้** (เจอจริง 11-12 ก.ย. 2569 สปรินต์เกมอเวจี — agent ตายยกชุด 2 รอบ)
เมื่อชนลิมิต subagent ทุกตัวถูกตัดกลางทางพร้อมกัน แล้ว **SendMessage เรียกกลับมาทำต่อไม่ได้**
ถ้า session หลักข้ามวันหรือถูกสรุปบริบทไปแล้ว จะได้ `No transcript found for agent ID`
สิ่งที่หายคือ "คำสั่งของเป้ที่ยังไม่มีใครลงมือ" กับ "งานที่ทำเสร็จแล้วแต่ยังไม่ commit"

## กติกา 4 ข้อ — ทำตั้งแต่ก่อนสั่งงาน ไม่ใช่ตอนพัง

1. **คำสั่งของเป้ลงไฟล์ก่อน delegate**
   พิมพ์มาหลายข้อในทีเดียว → เขียนลง `Output/Kittanate-source/YYYY-MM-DD-<เรื่อง>-requests.md` แล้ว commit+push ทันที
   ใน prompt ของ agent ชี้ไปที่ไฟล์นั้นแทนการก๊อปโจทย์ทั้งก้อน — agent ตัวใหม่หยิบต่อได้โดยไม่ต้องให้เป้พิมพ์ซ้ำ
2. **สั่ง agent ให้ commit + push เป็นชุดย่อย**
   เขียนใน prompt ตรง ๆ ว่า "ทำข้อ 1 เสร็จ commit+push แล้วค่อยทำข้อ 2 อย่าดองรวมก้อนเดียว"
   งานที่ push แล้วรอด งานที่ค้างใน working tree ต้องไล่ดูใหม่ว่าถึงไหน
3. **ตายแล้วอย่าเสียเวลา resume — เปิดตัวใหม่**
   ลอง SendMessage ได้ 1 ครั้ง ถ้าได้ `No transcript found` ให้ launch agent ตัวใหม่ทันที
   โดย prompt ต้องมี: (ก) ชี้ commit ที่ตัวก่อนทำไว้แล้ว (`git log --oneline -5`) (ข) สั่งว่า "เช็กก่อนว่าทำอะไรไปแล้ว อย่าทำซ้ำ" (ค) ลิงก์ไฟล์โจทย์ตามข้อ 1
4. **ประเมินสถานะจาก git ไม่ใช่จากรายงานของ agent**
   notification ของ agent ที่ตายจะโชว์แค่ประโยคแรกที่มันพิมพ์ ดูเหมือนไม่ได้ทำอะไรเลย ทั้งที่ commit ไปแล้วก็มี
   เช็กจริงด้วย `git log --oneline -5` + `git status --short` ทั้งโฟลเดอร์ AGAPAE Agent และโฟลเดอร์โปรเจกต์ปลายทาง

## เช็กลิสต์ตอนกลับมาหลังลิมิตรีเซ็ต

```bash
date                                   # ลิมิตรีเซ็ตหรือยัง (ข้อความ error บอกเวลาไว้)
git -C "<repo งาน>" log --oneline -5   # ตัวก่อนทัน commit อะไรไว้
git -C "<repo งาน>" status --short     # ของที่ทำค้างแต่ยังไม่ commit
git -C "<repo งาน>" status -sb | head -1   # push ขึ้นไปหรือยัง
```
แล้วเปิด agent ใหม่ต่อจากจุดนั้น — เล่ารายการที่ยังค้างให้ครบใน prompt

## Codex run ค้าง `running` (เน็ตหลุด / เครื่อง sleep)

อาการ: `Output/Codex/runs/<id>/status.json` ค้าง `running` แต่ไม่มี process `openai-worker.py` แล้ว ·
`stderr.log` มี `failed to lookup address` / `waiting for network` · `scripts/openai-worker.py` **ไม่มี resume**
1. เช็กเน็ตก่อน: `curl -sS -o /dev/null -w "%{http_code}" https://chatgpt.com` (403 = ติดต่อได้)
2. เก็บงานที่ค้างใน worktree ก่อนเปิดรอบใหม่ (worktree ค้างอยู่ที่ `../.codex-worktrees/<id>`)
   - โค้ด: `git -C <wt> add -N <ไฟล์ใหม่>` แล้ว `git -C <wt> diff > Output/Claudy/briefs/partial-<งาน>/x.patch` (ไม่ `add -N` ไฟล์ใหม่จะหลุดจาก patch)
   - ภาพ/ไฟล์ untracked: `cp` ออกมาตรง ๆ พร้อม `prompts.json` ถ้ามี
3. ใบงานใหม่ = ใบเดิม + หัวข้อ "ต่อจากรอบที่หลุด" ชี้ path partial แบบเต็ม + สั่ง `git apply` ก่อน แล้วทำส่วนที่ขาด
4. ลบ worktree เก่าด้วย `git worktree remove --force` อาจโดน auto-mode ปฏิเสธ → ปล่อยไว้ ไม่กระทบรอบใหม่ บอกคุณเป้ให้ลบเองด้วย `!`
5. งานยาวกันเครื่องหลับ: `caffeinate -ims -t 21600` แบบ background (พับจอยังหลับอยู่)

## ข้อควรรู้

- หลายตัวพร้อมกันเร่งลิมิตหมดเร็วขึ้น ถ้างานไม่รีบ ให้เรียงคิวแทนการยิงขนาน
- งานที่ **แก้ของที่ขึ้นเว็บแล้ว** (เช่นข้อความเสี่ยงหมิ่นประมาท) ให้แยกเป็น commit แรกเสมอ
  สั่งด้วย `git commit -- <ไฟล์ที่เกี่ยว>` เพื่อไม่ให้ติดงานอื่นที่ยังทำไม่เสร็จไปด้วย
