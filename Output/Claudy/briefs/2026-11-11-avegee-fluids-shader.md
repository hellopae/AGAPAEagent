# ใบงาน Toby — AVEGEE ของเหลวโซน 1 ไหลด้วย shader (แทนเฟรมวาดของ Codex) · 11 พ.ย. 2569

## บริบท
- คุณเป้ (11 พ.ย.): "แบ่งงานของ Codex บางส่วนที่ทำได้มาได้เลย จะได้ไม่ชน limited เร็วเกินไป" — งานภาพที่ทำด้วยโค้ดได้ ให้ Claude ทำ
- ของเหลวโซน 1 (ลาวา น้ำฟ้า น้ำตก ลำธาร) ตอนนี้ Codex วาด mask + เฟรม animation (V7-FLUIDS ผ่านเกณฑ์ 14/37 mask หลายรอบแล้ว กินโควตามาก) · ชั้นของเหลวปัจจุบันในเกม = crossfade เฟรมวาด (`img/map-zone1/v5-fx/fx-layout.json`)
- แผนระยะยาวเป็น WebGL อยู่แล้ว ([memory avegee-webgl-after-hd]) — งานนี้เป็นจุดเริ่ม

## ที่ทำงาน
worktree `~/agapae-work/.toby-worktrees/z1-v5` branch `claude/2026-11-05-zone1-v5-fx` (ต่อจากงาน Dale รวมระบบอาหาร — เริ่มหลัง Dale push แล้วเท่านั้น)
อินพุตอ่านอย่างเดียว: ผล Codex ล่าสุดของ V7-FLUIDS ใน `~/agapae-work/.toby-worktrees/.codex-worktrees/*/docs/art-reviews/2026-11-05-z1v7-fluids/` และ `~/agapae-work/.codex-worktrees/*/docs/art-reviews/2026-11-05-z1v7-fluids/` (mask, review/per-mask-handoff.json) · พื้น v7 จาก ASSEMBLE `~/agapae-work/.codex-worktrees/20261110T115811Z-6ad6e037/docs/art-reviews/2026-11-05-z1-v5-hd-assemble/v7/`

## ขั้นตอน
1. **นำร่อง 1 จุดก่อน** (ลาวาตก 1 จุด + ลำธารลาวาราบ 1 จุด ที่คุณเป้เห็นบ่อย): WebGL overlay บนพื้นจริง ใช้ **flow map** (ทิศไหล) + noise เลื่อน UV ของภาพพื้นเองภายใน mask → ของเหลวไหลโดยไม่ต้องมีเฟรมวาด · ขอบ mask feather · แสงเรืองลาวา pulse เบา ๆ · ฟอง/ประกายเป็น particle เล็กน้อย
2. ภาพเทียบ: แบบเดิม (เฟรม Codex) | แบบ shader · คลิป 10 วิ 2 มุม · fps ทั้งสองโหมดกราฟิก (harness `Output/Toby/perf-1110/`)
3. **ส่งให้คุณเป้ดูก่อนขยายทั้งแผนที่** (เปิด flag `?fluid=shader` เทียบได้ใน 8942 · ค่าเริ่มต้นยังเป็นแบบเดิม)
4. ถ้าคุณเป้ OK (ใบงานรอบถัดไป): ทำครบทุกจุด ใช้ mask ที่ Codex ผ่านแล้ว + ตัด mask ที่เหลือจากพื้น v7 เอง (สี/contour) · ถอดเฟรมวาดออก

## ข้อห้าม
- ห้าม DOF/parallax/bloom เต็มจอ · ห้ามย้อมสีหรือฟิลเตอร์ทับภาพพื้นนอก mask
- ห้ามแตะ `Documents/Work PAE/Claude/AVEGEE`, `~/agapae-work/AVEGEE`, โฟลเดอร์ `.codex-worktrees` ทั้งสองที่ (อ่านได้), LaunchAgent `com.agapae.avegee-*`
- push เฉพาะ branch นี้ ห้าม merge main · fps เมืองเดินต้องไม่ต่ำกว่าเดิมเกิน 2
- มือถือ/เบราว์เซอร์ไม่มี WebGL → กลับไปใช้แบบเดิมอัตโนมัติ

## ส่งงาน
`Output/Toby/2026-11-11-avegee-fluids-shader.md` (ไทย): วิธีทำ, ภาพ/คลิปเทียบ, fps, ข้อจำกัด, ประเมินว่าทำทั้งแผนที่ใช้เวลาเท่าไร, commit, ผลเทสต์
## เกณฑ์รับงาน
1. จุดนำร่องไหลดูเป็นธรรมชาติ ไม่ล้นนอกของเหลว 2. fps ไม่ตก · มี fallback 3. ค่าเริ่มต้นเกมไม่เปลี่ยนจนคุณเป้อนุมัติ
