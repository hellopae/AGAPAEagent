# SCENE-FX — effect บรรยากาศในฉากสอบสวน + ฉากต่อสู้ (เงาเมฆ, ลาวา/แม่น้ำ/เมฆขยับ) · 5 พ.ย. 2569

- เจ้าของ: **Toby** · ตรวจรับ: Claudy (+ Dale ก่อน merge) · โหมด `claude-only` — **ห้ามเรียก Codex ห้ามวาดภาพใหม่** (ของที่ต้องวาด → จดเป็นรายการ "รอ Codex")
- ทำต่อบน worktree `/Users/agapae/agapae-work/.toby-worktrees/z1-v5` branch `claude/2026-11-05-zone1-v5-fx` (HEAD `f1572258`) — branch เดียวกับแผนที่ (ยังไม่ merge, คุณเป้รอพื้นครบ) · server คุณเป้ 8942 อย่าปิด
- อ่านก่อน: `Output/Claudy/2026-11-05-map-redraw/MAP-ART-STANDARD.md` (กรอบด้านบน = กติกาที่คุณเป้ตัดสินวันนี้) · โน้ตรอบแผนที่ `Output/Toby/2026-11-05-z1-v5-fx.md`

## คุณเป้ (5 พ.ย. ~20:10)
"ไปทำ effect ในฉากสอบสวนและต่อสู้ ใส่เงาของเมฆเข้าไปด้วย" + "ถ้าในฉากมีลาวา แม่น้ำ เมฆ ก็ให้ขยับได้"

## ฉากที่เกี่ยว (หาให้ครบจากโค้ด)
- **ต่อสู้**: `src/battle-background.js` → `img/map-zone1/battle-{volcano,ice,forest}-v1.webp`, `img/frontier-route/battle-{border,cave}-v1.webp`, arena/theme backgrounds (`theme-assets.js` `themeBackground`) · effect สกิลเดิม `src/battle-fx.js` (อย่าแตะสูตรสกิล)
- **สอบสวน/ศาล**: `src/interrogation-ui.js`, `src/boss-court-view.js`, `src/yama-trial-idle.js`, `src/sentencing-guide.js` — หาว่าฉากหลังคือภาพไหน (เช่น `img/BG-*.webp` ต่อสถานี / ห้องศาล)
- โซนอื่น (asia/west/cyberhell) ถ้าใช้ระบบเดียวกัน ทำแบบ gated ตามภาพที่มีของเหลวจริง — แต่ **เน้นโซน 1 ก่อน**

## งาน
1. **สำรวจทุกภาพฉากหลัง**: contact sheet ภาพทั้งหมด + ระบุว่าภาพไหนมี ลาวา / แม่น้ำ-น้ำ / น้ำตก / เมฆ-หมอก / ไฟคบเพลิง → `scene-inventory.json`
2. **เงาเมฆ** ทุกฉากกลางแจ้ง: ใช้ texture เงาเมฆรูปเมฆจริงที่ทำไว้แล้ว (`img/map-zone1/v5-fx/cloud-shadow-N.webp`, `src/map-ambient.js`) ลอยผ่านช้า ๆ ทับฉากหลัง + ตัวละคร ไม่ทับ UI/ตัวเลขดาเมจ · ความเข้มเท่าแผนที่ (th .32 — คุณเป้โอเคแล้ว) · ฉากในร่ม (ถ้ำ/ห้องศาลปิด) ไม่มีเงาเมฆ หรือเบามาก — ตัดสินตามภาพ บอกเหตุผล
3. **ลาวา/แม่น้ำ/เมฆขยับ** ในภาพที่มี: ทำ mask ต่อภาพ (จากสี + ขอบ **ห้ามล้นขึ้นหิน/พื้น/ตัวละคร** ≤ 3%) แล้วเล่นเฟรมที่วาดไว้แล้วด้วย crossfade แบบแผนที่ (`src/town-fluid-fx.js`): `lava-surface`, `lavafall-*`, `spirit-river`, `ice-stream`, `waterfall-ice-*`, `cloud-sea`, `cloud-puff-*` (`img/map-zone1/v5-fx/`) + ฟองลาวา/ไอ/ประกายไฟเฉพาะผิวลาวาราบ · เมฆบนฟ้าในภาพ: ก้อนเมฆลอยช้าในบริเวณฟ้า (clip mask, ไม่ใช่ parallax)
   - ถ้า sheet ที่มีไม่เข้ากับภาพฉากนั้น (สี/ขนาด/มุม) → **ไม่ใส่** และจดใน "รอ Codex" ว่าต้องวาดอะไร ภาพไหน
4. บรรยากาศเพิ่ม (ใช้ sheet ที่มี): ฝุ่น/ประกายไฟลอย (`embers-ash` ฉากลาวา), หิมะโปรย (ฉากน้ำแข็ง — ระบบ snow เดิมใน map-ambient), ใบไม้ (ฉากป่า — ระบบเดิม), ไฟคบเพลิงในภาพ (ถ้ามี) แสงกระพริบเบา ๆ · **ไม่มี** DOF, parallax, bloom ทั้งจอ, color grading
5. ประสิทธิภาพ: ฉากต่อสู้มี effect สกิลอยู่แล้ว (`MAX_PARTICLES 300`) — ชั้นบรรยากาศต้องเบา (cache mask, หยุดตอน pause/แท็บซ่อน, ลดตอน effect สกิลหนัก) · fps มือถือ 4× throttle ≥ 30 ระหว่างใช้สกิลหนักสุด · ปิดได้ด้วยตัวเลือก weather เดิม
6. ทดสอบ: เทสต์เต็ม 0 fail (`node --test tests/*.test.mjs > log 2>&1`) + เทสต์ใหม่ (mask ไม่ล้น, ไม่มีเงาเมฆทับ UI, ปิดได้) · bump cache-bust ตาม importmap (บทเรียน Dale `451678f6`: module ที่แก้ต้องได้ `?v=` ใหม่ใน importmap + worker) · คลิป ≥ 10 วินาที: ต่อสู้ฉากภูเขาไฟ, น้ำแข็ง, ป่า, ชายแดน + ฉากสอบสวน 1 ฉาก → `docs/art-reviews/2026-11-05-scene-fx/` (เก็บไฟล์เล็ก; คุณเป้ให้ลบ media หลังใช้)
7. commit + push branch · โน้ต `Output/Toby/2026-11-05-scene-fx.md` (ไฟล์ที่แก้, ผลเทสต์, fps, รายการ "รอ Codex")

## ข้อห้าม
ห้าม Codex/วาด · ห้ามแตะ main/merge · ห้ามเปลี่ยนสูตร/สมดุลการต่อสู้หรือ effect สกิล · ห้ามแตะแผนที่/เงาเมฆแผนที่/ฟอง/โรงอาหารที่คุณเป้โอเคแล้ว · ห้ามแก้ `status.json`, `worklog.json`, `work-mode.json`

## เกณฑ์รับงาน
1. ทุกฉากกลางแจ้งมีเงาเมฆลอยผ่าน ไม่ทับ UI · ฉากที่มีลาวา/น้ำ/เมฆ ขยับในขอบเขตจริง ไม่ล้น
2. fps ผ่านระหว่างสกิลหนัก · ปิดได้ · เทสต์ 0 fail · คลิปครบ
3. รายการ "รอ Codex" สำหรับฉากที่ sheet เดิมไม่เข้า
