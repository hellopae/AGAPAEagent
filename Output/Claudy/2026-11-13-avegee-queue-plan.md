# AVEGEE คิวงาน 13 พ.ย. 2569 (Claudy จัด — คุณเป้: "จัดหมวดหมู่ แบ่งคิว ลำดับ แบ่งหน้าที่ตามความเหมาะสมได้เลย")

กติกา: Claude agent ทีละตัว · Codex ≤ 2 ขนานเมื่อโควตา reset · merge main หลังแต่ละก้อนผ่านเทสต์ (Claudy) · ก้อนใหญ่/เสี่ยงให้ Dale ตรวจ
รุ่น: งานปกติ = รุ่นเริ่มต้นของ agent · Fable 5.2 = เฉพาะงานตัดสินสถาปัตยกรรม/debug ยาก (บอกคุณเป้ทุกครั้ง)

## ฝั่ง Claude (ตามลำดับ)
| # | งาน | ใคร | รุ่น | ใบงาน |
|---|---|---|---|---|
| 1 | FB2-A แผนที่เมือง (ข้อ 1–7) | Toby | ปกติ | briefs/2026-11-13-avegee-fb2-a-map.md |
| 2 | FB2-B สอบสวน+ต่อสู้ (v1 v2 v3 8 9 10 15) | Toby | ปกติ | briefs/2026-11-13-avegee-fb2-b-trial-battle.md |
| 3 | FB2-C หน้าต่าง UI (11 13 14 16 17) | Toby | ปกติ | briefs/2026-11-13-avegee-fb2-c-ui.md |
| 4 | เสียบภาพภารกิจ Codex (ศัตรู 6 + ท่า 3) + ต้นไม้แดง sprite แยก + เทียบเมฆ Codex vs shader + ตัด sprite รั้วสะพาน river-back/front ใหม่จาก v7r (ครอปด้วย Pillow ไม่ต้อง Codex, แล้วลบ GROUND_SPRITE_X_FIX) | Toby | ปกติ | (เขียนเมื่อถึงคิว) |
| 5 | เกลาข้อความชั่วคราว (ฉากสู้ภารกิจ ฯลฯ) + บท plea คดี feudgran | Rae → Toby เสียบ | ปกติ | (เขียนเมื่อถึงคิว) |
| 6 | ของเหลว shader โซน 2–4 | Toby | ปกติ | (เขียนเมื่อถึงคิว) |
| 6b | ผสมเมฆ Codex + shader โซน 1 (คุณเป้ดูภาพเทียบไม่ออก "ผสมกันก็ได้") — หลังข้อ 7 | Toby | ปกติ | briefs/2026-11-13-avegee-clouds-mix.md |
| 7 | แผนย้ายการวาดทั้งเกมเป็น WebGL (สถาปัตยกรรม + ขั้นตอน + ความเสี่ยง) — ไม่เขียนโค้ด | Toby | **Fable 5.2** | (เขียนเมื่อถึงคิว) |
| 8 | Dale ตรวจรวมก้อน 1–6 ก่อน merge ถ้าแตะระบบเยอะ | Dale | ปกติ | — |
| แทรก | ลบ worktree Codex ที่ merge แล้ว (v7 assemble, repairs, fluids) คืนดิสก์ | Claudy | — | — |

## ฝั่ง Codex (เมื่อ reset · ขนาน ≤ 2)
1. SPIRIT-POSES 39 ภาพ (briefs/2026-11-12-avegee-spirit-poses-art.md)
2. CONSTRUCTION-Z234 (briefs/2026-11-12-avegee-construction-z234.md)
3. งานวาดที่ FB2 ส่งกลับมา (ถ้ามี เช่น รูป cutscene หัวหน้าข้อ 8)
4. รอยเล็ก 2 จุดพื้นโซน 1 (มุมบันไดลาวาเหนือ, เมฆใต้สะพานสวรรค์)

## Fable 5.2 ช่วยอะไรได้ / ไม่ได้
- ได้: วางแผน WebGL, debug ระบบซับซ้อน, รีวิว merge ก้อนใหญ่, เขียน shader/effect ยาก ๆ
- ไม่ได้: วาดภาพแบบ ImageGen (Claude ทุกรุ่นสร้างภาพวาดไม่ได้) — แต่ทำภาพด้วยโค้ดได้ (shader, particle, SVG, ไอคอนเวกเตอร์) จึงรับงาน Codex ส่วนนี้มาแล้ว (ของเหลว เมฆ effect)

## อัปเดต 13 พ.ย. 10:45 — คิว Codex ที่รันจริง
- `queue-2026-11-13` (10:35): SPIRIT-POSES + CONSTRUCTION-Z234 → TRASH-ICON
- `queue-map-1113` (รอคิวแรกจบ): Z1-TOUCHUP + โซน 2 HD (5 run) + ASSEMBLE → โซน 3 → โซน 4 · ชนลิมิตแล้วรอ reset ทำต่อเอง (คุณเป้: "ซ่อม 2 จุดและวาดแผนที่ก่อน เห็นในเกมชัดสุด")
## ยังไม่อยู่ในคิว (ต้องเพิ่มเมื่อถึงเวลา)
- Claude เสียบงาน Codex แต่ละชิ้นเมื่อส่งมา (ท่าวิญญาณ, ก่อสร้าง z234, ถังขยะ, Z1 touch-up, พื้น z2–4)
- ของเหลว/เมฆ shader โซน 2–4 ต้องทำหลังพื้น HD โซนนั้นเสร็จ (ข้อ 6 เดิมเลื่อนตามแผนที่)
- Dale: นโยบาย cache-bust `?v=` (Toby ไม่ได้ bump ใน FB2 เพราะเทสต์ล็อกค่า)
- คุณเป้เอาทุกข้อ → `queue-extra-1113` (หลังแผนที่): YAMA-BLINK + HUNGRY-ICON → SPIRIT-CARD-SCARED · ยังค้าง: ลบพื้นเก่า map-v5/zone1 v2–v4 หลังแผนที่ครบ (ลด deploy ~90 MB)

## 13 พ.ย. คุณเป้: เน้น Steam (คอม) ก่อน — UI มือถือพักไว้จนจะลง Play Store · ลำดับ: เสียบงาน Codex → ผสมเมฆ → WebGL ก้อนแรก (เฟส 0–2 รวม) · ตรวจจอคอมเป็นหลัก

## 13 พ.ย. 20:40 — หยุดเพราะโควตาหมดทั้งสองฝั่ง
- **Claude weekly 100%** (reset 18 พ.ย. 23:00) · Codex app ตั้ง claude-only 18:51 (Codex weekly ใกล้หมดตามกติกา ≤5%)
- macOS ตัดสิทธิ์ Documents ช่วง ~18:20 → คิว Codex (queue-chain/queue-map-z34) ตาย · Z3-HD-1/2 (`20261113T091934Z-4a3ceadc`, `20261113T091954Z-91dcaf8c`) ค้างสถานะ running (ไม่มี process) → ทำใหม่
- **เสร็จรอเสียบ:** STORY-ART-A `20261113T090258Z-860966a4`, STORY-ART-B `20261113T090318Z-28458981`, Z2 HD (ASSEMBLE `20261113T085021Z-39f7fa12`)
- **Toby z1-events ทำค้าง (ยังไม่ commit):** สำรอง patch ที่ `Output/Toby/z1-events-wip-1113/z1-events-wip.patch` (worktree ยังมีไฟล์ค้าง src/data.js, src/game.js, src/z1-events.js)
## ทำต่อเมื่อโควตากลับ
1. Claude: Toby ทำ z1-events ต่อ (resume agent หรือใบงานเดิม + patch) → เสียบ STORY-ART A/B → เสียบพื้นโซน 2 + shader โซน 2
2. Codex: รัน `queue-map-z34.py` ใหม่ (Z3/Z4) → `queue-extra-chain.py` → `queue-cyber5-chain.py`

## 14 พ.ย. — คิว event เนื้อเรื่อง (คุณเป้: "จัดคิวเรียบร้อยแล้ว ทำงานตามคิวต่อได้เลย")
1. (กำลังทำ) Toby ปิด event โซน 1 + แก้ flow บอสโซน 1 ใช้ boss-guide (ยมทัตไม่ถูกตัดสิน) → Claudy ตรวจสเปก → merge + deploy
2. Toby เสียบพื้น HD โซน 2+3 (briefs/2026-11-14-avegee-z23-ground-integrate.md) → push ให้คุณเป้ตรวจ
3. event โซน 2 ตาม briefs/2026-11-14-avegee-z234-events-owner-spec.md: Rae เขียนบท (หงอคง/ลิงฮั้งกัวซัน, พ่อซาโตริ, คดีญาติ 4 + ยักษ์ทวารบาลทดสอบ) → Toby ทำระบบ + เทสต์ลำดับ → Codex วาดภาพที่ขาด
4. event โซน 3 (Cerberus คดี 0, แวมไพร์ วาลดริก, วาคิวรี เอียร์ลิน, Jörmungandr → เซเวอริน, คดีญาติ 5)
5. event โซน 4 (คุกเทวดา คดี 0, PHANTOM-404 คดี 4/8/9, ชายแดน 4 ระลอก, AI Scammer Robot คดี 10, บอสสุดท้าย)
- พื้น HD โซน 4 (Codex กำลังวาด) เสียบหลังข้อ 2 · shader ของเหลว z2–4 หลังพื้นแต่ละโซนเข้าเกม
- 14 พ.ย. 14:50 MERGED main 7b118c6a (event โซน 1, เทสต์ 2157/2157) · ต่อ: Toby พื้น z2+3 → Toby เก็บตก z1 (briefs/2026-11-14-avegee-z1-events-fixup.md) → event โซน 2
- ค้างถามคุณเป้: `frontier-th-intro-v19` ไม่มีไฟล์ในเครื่อง (มีแค่ v1) · Codex วาด: cut-sita-phantom-ledger-th, cut-hanuman-yields-th, cut-sita-return-th (1375×768)
- 14 พ.ย. 15:25 MERGED main c7bc395e (พื้น HD โซน 2+3, เทสต์ 2162/2162, deploy ~779 MB) · รอคุณเป้ตรวจ: west เย็น/หิมะบาง/พุ่มหาย, asia บันได lava-bank ขั้นหาย (prompt Codex ใน AVEGEE docs/art-reviews/2026-11-14-z23-ground-integrate/README.md)
- 14 พ.ย. MERGED main 7addeb62 (เก็บตก z1: ท่าพุ่งชนเพลิง, กล้อง, ปุ่ม, ถ้ำ · เทสต์ 2163/2163) · ค้าง: เซฟทันทีตอนชนะ (declareWin) Claudy อนุมัติ ทำในงานถัดไป
- 14 พ.ย. 20:42 คิว Codex เดิมจบครบ (Z4-HD-5 `20261114T070300Z-30291ec5`, Z4-ASSEMBLE `20261114T071713Z-9434a667`, HUNGRY-ICON `…073603Z-6d13dc70`, YAMA-BLINK `…073543Z-73ddc388`, SPIRIT-CARD-SCARED `…074445Z-333d3984`, CYBER5 `…080932Z-99f18dda` — ทั้งหมด ready_for_review รอ Toby เสียบหลัง event โซน 2)
- 14 พ.ย. 20:42 เริ่ม `queue-z2-art-1114.py`: Z2-ART-A (คดี 12 โซน 1 + หงอคง) ∥ Z2-ART-B (อากุระ/พ่อซาโตริ/ยักษ์ทดสอบ) → Z2-ART-C (คดีญาติ) · ใบงาน briefs/2026-11-14-avegee-z2-art-{a,b,c}.md · ภาพทับ placeholder ชื่อเดิมใน branch Toby
- 14 พ.ย. คุณเป้: หนุมานใช้ตัวใหม่ (13 พ.ย.) · "โซน4 เสร็จแล้วแปลง webp แล้ว push ได้เลย" → ใบงาน briefs/2026-11-14-avegee-z4-ground-integrate.md ให้ Toby ต่อทันทีหลัง event โซน 2 (Claude ทีละงาน) → Claudy merge + deploy
- 14 พ.ย. 21:2x คุณเป้: อากุระไม่มีโซ่ วาดใหม่ → `queue-akura-1114.py` AKURA-NOCHAIN (ตัวยืน + การ์ด + frontier-asia-intro-v1) ขนานกับ Z2-ART-C
- 14 พ.ย. ~21:50 MERGED main 97069fa5 (z2 fixup: บทถ้ำอากุระ, ซิม, ระลอก3 hp38, ภาพ A/B, พื้น HD โซน 4 v7 · เทสต์ 2184/2184) · ต่อ: Toby เสียบภาพ C + อากุระไม่มีโซ่ · ค้าง: Rae เขียน Z2_KIN_REPEAT_LINE · คุณเป้ตัดสินความยากหงอคง/ยักษ์ทดสอบ (ชนะ 100%)
