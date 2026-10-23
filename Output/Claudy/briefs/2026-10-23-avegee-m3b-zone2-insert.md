# ใบงาน M3b: AVEGEE — เสียบแผนที่โซน 2 รอบสอง (พื้นที่ซ่อมแล้ว + บ้านที่แก้แล้ว) · Codex (`--write`) → Claudy ตรวจ+merge

## บริบท
- คุณเป้สั่ง 23 ต.ค. 2569: แผนที่โซน 2 ใหม่ตามโครง/ระบบโซน 1 · mask เดินได้คุณเป้วาดเองภายหลัง (ตอนนี้ใช้ mask โซน 1)
- **M3 รอบแรก** (branch `codex/20261023T054046Z-d88c803d`, commit `036c9f2`, worktree `/Users/agapae/agapae-work/.codex-worktrees/20261023T054046Z-d88c803d`) เปิด `ZONE_SKIN.asia.enabled` + เทสต์ + sprite แท่น/ต้นไม้/โคม/คบ/หิน แล้ว แต่ใช้พื้น/บ้านโซน 1 สำรอง · README `/Users/agapae/agapae-work/.codex-worktrees/20261023T054046Z-d88c803d/output/m3/README.md`
- **Claudy รับพื้นที่ซ่อมแล้ว** จาก Q5: ควอแดรนต์ `/Users/agapae/agapae-work/.codex-worktrees/20261023T060215Z-4c7f2b03/output/m1-zone2/q5/quadrants/q-{nw,ne,sw,se}.png` (README `/Users/agapae/agapae-work/.codex-worktrees/20261023T060215Z-4c7f2b03/output/m1-zone2/q5.md`)
- **บ้านที่แก้ขอบแล้ว** จาก S2b: ไฟล์ปลายทางใน `git show --stat codex/20261023T060219Z-abcf9bb4` (README `/Users/agapae/agapae-work/.codex-worktrees/20261023T060219Z-abcf9bb4/output/m1-zone2/s2b.md`) — ตรวจ 400% ซ้ำ ถ้ายังมี halo ชัดให้คงบ้านโซน 1 แล้วบันทึก
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE บน branch `codex/<run_id>` จาก main `0f95200`) เท่านั้น** ห้ามสร้าง worktree/branch/clone ห้าม commit/push (wrapper ทำ)

## งาน
1. นำงาน M3 รอบแรกเข้ามา: `git -C /Users/agapae/agapae-work/.codex-worktrees/20261023T054046Z-d88c803d diff 0f95200 036c9f2 -- src tests index.html scripts docs img | git apply --index` (หรือ `git checkout codex/20261023T054046Z-d88c803d -- <ไฟล์>` รายไฟล์) — **ไม่เอา `output/`**
2. ต่อผืนจากควอแดรนต์ Q5: `python3 scripts/stitch-town-terrain.py --zone asia --src <โฟลเดอร์ควอแดรนต์ Q5 ที่คัดลอกมา> ` → tiles + preview ตามปลายทางของ skin asia
3. เปลี่ยน skin asia ให้ใช้พื้นใหม่ (ไม่ใช่ fallback โซน 1) + flow map ถ้าระบบต้องใช้ · เพิ่มกลุ่ม houses ถ้าบ้าน S2b ผ่าน · ปิด TREE_TINT ของ asia (ถ้า M3 ยังไม่ทำ)
4. สร้างชุด mask ใหม่ด้วยพื้นจริง: `python3 scripts/make-town-mask-overlay.py --zone asia --ground <preview ใหม่> --out output/m3b/mask-for-kittanate/asia`
5. เทสต์ `node --test tests/*.test.mjs` 0 แดง (อัปเดตเทสต์ M3 ที่ล็อก fallback ให้ล็อกพื้นใหม่แทน)
6. cache-bust ไฟล์ที่เปลี่ยน
7. README `output/m3b/README.md`: ไฟล์ที่เสียบ · ผลเทสต์ · ภาพ preview พื้นในเกม (render ด้วย PIL จาก tiles ได้ถ้าเปิดเบราว์เซอร์ไม่ได้) · สิ่งที่ค้าง

## ข้อห้าม
ไม่เปลี่ยนตัวเลขเกม · ไม่ merge/push main · ไม่แก้ mask เกม (คุณเป้วาด) · เวลา 30 นาที: ลำดับ 1→2→3→5→4→6→7 ถ้าไม่ทันให้หยุดที่ขั้นที่เสร็จแล้วรายงาน

## เกณฑ์รับงาน
โซน 2 ใช้พื้นใหม่ · เทสต์ 0 แดง · โซน 1 ไม่เปลี่ยน · ชุด mask ใหม่
