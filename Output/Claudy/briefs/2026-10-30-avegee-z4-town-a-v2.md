# Z4-TOWN-A-v2 — ทำต่อจาก run ที่ชน usage limit (30 ต.ค. 2569)

ใบงานเดิม (ขอบเขต/เกณฑ์เหมือนเดิมทุกข้อ): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-10-30-avegee-z4-town-a.md`
run ก่อนหน้า `20261029T191621Z-ed011074` — งานที่ทำแล้วอยู่ใน branch `codex/20261029T191621Z-ed011074` และ patch `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/runs/20261029T191621Z-ed011074/diff.patch`
1. `git apply --reject --whitespace=nowarn "<patch>"` ใน worktree นี้ (จาก main ล่าสุด) · `*.rej` รวมด้วยมือให้ได้ทั้งสองฝั่ง แล้วลบ `.rej` (ถ้า patch ว่าง = run เดิมไม่ได้ทำอะไร ให้ทำตามใบงานเดิมตั้งแต่ต้น)
2. อ่านโน้ตที่ run เดิมทิ้งไว้ใน `output/coordination/` แล้วทำต่อเฉพาะที่ยังไม่ครบ
3. browser ใน sandbox เปิดไม่ได้ · ภาพ built-in `image_gen` เท่านั้น ห้าม Shado · เทสต์เต็มครั้งเดียวตอนท้าย
