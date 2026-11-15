# ใบงาน Toby — เสียบภาพ Codex ที่ค้าง 3 run · 15 พ.ย. 2569

## บริบท
Codex วาดเสร็จตั้งแต่ 14 พ.ย. (ready_for_review) ยังไม่มีใครเสียบเข้าเกม ใบงานเดิมของแต่ละ run บอกว่าภาพใช้ที่ไหน:
1. YAMA-BLINK `~/agapae-work/.codex-worktrees/20261114T073543Z-73ddc388` — ใบงาน `Output/Claudy/briefs/2026-11-13-avegee-yama-blink.md` (ยามากะพริบตาในห้องสอบสวน ให้นิ่ง ไม่สั่น)
2. SPIRIT-CARD-SCARED `…/20261114T074445Z-333d3984` — ใบงาน `…/2026-11-13-avegee-spirit-card-scared.md` (การ์ด profile วิญญาณท่าตกใจ ฉากสู้ตอนแพ้)
3. SPIRIT-POSES-CYBER5 `…/20261114T080932Z-99f18dda` — ใบงาน `…/2026-11-13-avegee-spirit-poses-cyber5.md` (ท่าวิญญาณ Cyberhell ที่ขาด 5 ภาพ)

## ขั้นตอน
- อ่านใบงานเดิม + README ใน `docs/art-reviews/` ของแต่ละ worktree แล้วดูภาพด้วยตาก่อน ถ้าตัวละครผิด สั่น หรือมีตัวอักษร ให้ข้ามภาพนั้นและจดเหตุผล
- คัดลอกเฉพาะภาพ/ไฟล์ข้อมูลภาพ (ห้าม cherry-pick โค้ดของ Codex ทั้งก้อน ถ้า Codex แก้ src ให้อ่านแล้วเขียนเองให้เข้ากับ main ปัจจุบัน)
- ต่อสายให้ภาพแสดงในจุดที่ใบงานเดิมกำหนด
- ยามากะพริบตา: เทียบกับของเดิมว่าไม่สั่น/ไม่เลื่อน (ทำ GIF หรือภาพซ้อนเฟรม)

## ข้อห้าม
- ไม่แตะท่าบอส ภารกิจขนนก ดำ (เพิ่ง merge)
- ห้ามแตะ `Documents/Work PAE/Claude/AVEGEE`, `.codex-worktrees` (อ่านได้อย่างเดียว), LaunchAgent
- ภาพ webp · ห้ามย้อมสีด้วยโค้ด

## ส่งงาน
- worktree `~/agapae-work/.toby-worktrees/z1-v5` branch `claude/2026-11-05-zone1-v5-fx` (ฐาน main `788dc52b`) · commit + push · ห้าม merge main
- ลงท้าย commit ด้วยบรรทัด Co-Authored-By ของโมเดลที่ทำงานจริง
- แก้ game.js/data.js/party-balance.js → รัน `scripts/build-z1-events-hash-fixture.py` · แก้ src ใน importmap → bump cache id
- เทสต์เต็มรอบผ่าน
- รายงานไทย `Output/Toby/2026-11-15-avegee-codex-leftovers.md` + ภาพหลักฐาน `Output/Review/2026-11-15-codex-leftovers/`

## เกณฑ์รับงาน
1. ภาพทั้ง 3 run แสดงในเกมจริงตรงจุดที่ใบงานเดิมกำหนด (หรือระบุภาพที่ข้าม + เหตุผล)
2. ยามากะพริบตาไม่สั่น/ไม่เลื่อน
3. เทสต์ผ่านครบ · push แล้ว
