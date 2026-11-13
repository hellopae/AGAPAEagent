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
