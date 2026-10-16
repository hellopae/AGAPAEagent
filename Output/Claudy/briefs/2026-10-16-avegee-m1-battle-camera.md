# ใบงาน M1: AVEGEE — กล้องฉากต่อสู้/สอบสวน ซูมเข้า-ออกตัวละครแบบ Octopath · เจ้าของ Toby

## บริบท
- คำสั่ง + อ้างอิง: `Output/Kittanate-source/2026-10-16-avegee-m-requests.md` — **ดูภาพสรุปและเฟรมละเอียดก่อน** (`/Users/agapae/agapae-work/backup/avegee-m-ref-frames/`)
- repo `/Users/agapae/agapae-work/AVEGEE` main ล่าสุด (มี K2/K5/L2 แล้ว: เมนูเอียง, `battle-menu-layout.js`, `battle-turn-step.js`, `heal-fx.js`) · worktree `../.toby-worktrees/m1` branch `toby/m1-camera`
- งานคู่ขนาน: **Toby M2** (ระบบเอฟเฟกต์ `src/battle-fx*.js`) — ตกลงจุดต่อกันผ่าน event/ฟังก์ชันเดียว (ข้อ 4) · **Codex app** กำลังทำ handoff (`docs/claude-handoff-2026-10-16.md`: แสงโซน 1, แผนที่, ไอคอน) — ไม่แตะฉากต่อสู้ แต่ `git pull` ก่อนจบ
- อ่าน `docs/ui-work-coordination-2026-10-15.md` · ห้ามแตะ `drawStandee`/animation ยม

## งาน
1. **ระบบกล้อง** `src/battle-camera.js` (ไม่มี DOM logic นอกจาก apply transform): ทำงานกับคอนเทนเนอร์ฉาก (สนาม+ตัวละคร+พื้นหลัง) ด้วย CSS `transform` (translate/scale) + easing — **HUD/เมนู/การ์ดด้านล่างไม่ซูมตาม**
   - เลือกคำสั่ง: ดันเข้าหาตัวที่ถึงเทิร์นเล็กน้อย (~1.08–1.12×)
   - ใช้ท่า/พลัง: ดันเข้าผู้ใช้ (~1.2–1.3×) → แพนไปเป้าหมายตอนกระทบ → ถอยกลับภาพรวม · ท่าโจมตีทั้งทีม/ศัตรูหลายตัว = ถอยออกกว้าง
   - โดนหนัก/คริ: สั่นจอสั้น (2–4 px, 150–250ms) + หยุดภาพ 60–90ms (hit-stop)
   - ระหว่างใช้พลัง: ฉากหลังมืดลง (overlay ทึบ 35–50%) ตัวผู้ใช้/เป้าหมายอยู่เหนือ overlay
   - เคารพ `prefers-reduced-motion` (ลดเหลือแค่ cut ไม่มีซูม/สั่น) และมีตัวเลือกในตั้งค่า "เอฟเฟกต์กล้อง" เปิด/ปิด
   - เมนู/การคลิกเป้าหมายต้องยังตรง (คำนวณตำแหน่งหลัง transform) — คลิกศัตรูติด 10/10 ระหว่างกล้องนิ่ง และไม่รับคลิกระหว่างกล้องเคลื่อน (busy guard เดิม)
2. **สอบสวน**: เลือกประเด็น/คำถาม → ซูมเข้าผู้ถูกสอบสวน · ตอนเปิดเผยความจริง/สะกดจิต/สารภาพ → ดันเข้าแรงขึ้น + แฟลช · กลับภาพรวมเมื่อเลือกเมนู · แผงขวา (สำนวน/ประเด็น/บันทึก) ไม่ซูม
3. ความยาวรวมต่อคำสั่งไม่ยืดเกิน ~+400ms จากเดิม (เกมต้องไม่ช้าลงจนน่ารำคาญ) · มีตัวคูณความเร็วจุดเดียว
4. **จุดต่อกับ M2**: export `camera.focus(target, {zoom, ms})`, `camera.shake(power)`, `camera.dim(on)`, `camera.reset()` และ event/timeline ที่ M2 เรียกจากสูตรเอฟเฟกต์ได้ — เขียนสัญญา API ใน `docs/battle-camera-api.md` **ภายใน 1 ชั่วโมงแรก** (M2 จะอ่านไฟล์นี้)
5. Playwright 1678×937 DPR2 + 390×844: วิดีโอ/ภาพเฟรม (โจมตี, พลัง, คริ, ทีม, สอบสวน) · fps ระหว่างกล้องเคลื่อนใกล้ 60 · เทสต์ใหม่ (คำนวณ transform, reduced-motion, คลิกหลัง transform) · `node --test tests/*.test.mjs` ไม่มีแดงเพิ่มจากฐาน (main มีแดงของ Codex app อยู่ 6) · cache-bust `-m1`
6. commit ใน branch (ไม่ merge — Dale รีวิว)

## ข้อห้าม
ไม่เปลี่ยนกติกา/ค่าพลัง · ห้าม `ctx.filter`/CSS `filter` ที่ animate ต่อเฟรม (ใช้ opacity overlay แทน blur) · ห้ามแตะ `drawStandee`/animation ยม, `town-*` · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ภาพหลักฐาน /tmp

## เกณฑ์รับงาน
วิดีโอ/ภาพเฟรมใน /tmp เทียบข้างวิดีโออ้างอิง · fps · คลิกติด · เทสต์ · `docs/battle-camera-api.md` · รายงาน `Output/Toby/2026-10-16-avegee-m1-camera.md`
