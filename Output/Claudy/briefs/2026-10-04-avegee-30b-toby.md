# ใบงาน 30B-toby (Toby): ทำ 30B (ฉากต่อสู้) — โหมด claude-only

**ใบงานหลัก (ขอบเขต/ข้อห้าม/เกณฑ์รับงาน): `Output/Claudy/briefs/2026-10-04-avegee-30b-battle.md`** — อ่านก่อน · Codex run 30B ติดลิมิตก่อนแก้อะไร → เริ่มใหม่

## ที่ทำงาน
- สร้าง worktree ใหม่จาก clone: `git -C /Users/agapae/agapae-work/AVEGEE fetch && git -C /Users/agapae/agapae-work/AVEGEE worktree add -b toby/30b /Users/agapae/agapae-work/.codex-worktrees/toby-30b origin/main`
- **ห้ามลองเข้า `Claude/AVEGEE` เดิม (macOS บล็อก)** · ไม่แตะ worktree อื่น และไม่แตะ main ใน clone (Dale กำลัง merge)
- ภาพอ้างอิง UI / ภาพโปรไฟล์หัวหน้าโซน 3: ดู `Output/Claudy/briefs/assets/30/` ถ้ามีไฟล์ · ถ้าไม่มี ใช้คำบรรยายในใบงานหลัก + ต่อโค้ด fallback ไว้

## เพิ่มจากใบงานหลัก (ข้อ 10)
- คัตซีนยมทูต/ยักษ์ (`crew-cut`, ชุด 29C) ยังมีแถบดำบน/ล่าง → ให้ภาพเต็มกรอบ (`object-fit: cover` หรือกรอบตามสัดส่วนภาพ) ไม่ตัดหน้าตัวละคร · **ห้ามแตะการกลับด้านภาพที่ 30A เพิ่งแก้** (`crew-guard-west-cutscene`, `crew-plerng-cyberhell-cutscene` ต้องหันขวา)

## ส่งงาน
- commit บน branch `toby/30b` (ไม่ merge ไม่ push) · ภาพก่อน/หลัง `AGAPAE Agent/Output/Toby/30b/`
- รายงาน `AGAPAE Agent/Output/Toby/2026-10-04-avegee-30b.md`: ข้อ 1–10 เสร็จ/ไม่เสร็จ, commit hash, วิธีทดสอบ
