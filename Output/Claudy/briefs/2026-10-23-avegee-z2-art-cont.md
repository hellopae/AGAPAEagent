# ใบงานต่อ Z2-ART-CONT: ทำต่อจาก run ที่ชนลิมิต · เจ้าของ Codex

## บริบท
- run เดิม `20261023T121019Z-cb557d1a` ชน rate limit กลางทาง แต่ commit งานไว้แล้วบน branch `codex/20261023T121019Z-cb557d1a` (worktree `/Users/agapae/agapae-work/.codex-worktrees/20261023T121019Z-cb557d1a`)
- ใบงานเดิม (ทำตามนี้ทุกข้อ รวมข้อห้าม/เกณฑ์รับงาน): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-10-23-avegee-z2-art-cjk.md`
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** ห้ามสร้าง worktree/branch/clone ห้าม git commit/push

## งาน
1. นำงานเดิมเข้ามาก่อน: `git checkout codex/20261023T121019Z-cb557d1a -- .` (หรือคัดลอกไฟล์ตาม `git show --stat codex/20261023T121019Z-cb557d1a`) แล้วตรวจว่าไฟล์ครบ
2. ทำส่วนที่ค้าง: ส่งออกชิ้นที่ยังไม่มีไฟล์ใน img/ (sawan, krajok, sakura จาก output/z2-art/generated/ + วาด willow ใหม่) · ภาพ composite บนพื้นจริง (ข้อ 3 ของใบงานเดิม) · README output/z2-art.md
3. ตรวจตามเกณฑ์รับงานของใบงานเดิม + README ตามใบงานเดิม (ระบุว่าส่วนไหนมาจาก run เดิม)
