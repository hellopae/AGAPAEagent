# B23-REDRAW — รอตรวจรับ

**อัปเดตเผยแพร่ 2026-11-01 19:45 +07:** คุณเป้อนุมัติแพตช์รวมและ push แล้ว B23/B34 อยู่บน main `f9a4edd3b203d78386240a7487cbee836fbccfb7`; fullชุดรวม1790/1790,syntax160/160; GitHub Pages builtตรงcommit และไฟล์runtime/ภาพสด12/12ตรงhash ดู `../2026-11-01-b34-redraw/deployment-verification.json` ข้อมูลสถานะก่อนmergeด้านล่างเป็นประวัติของรอบทำงานเดิม


ทำวันที่ 1 พ.ย. 2569 ใน repo `/Users/agapae/agapae-work/AVEGEE` เท่านั้น

Branch: `codex/2026-11-01-b23-redraw` · ฐาน `a2cd7069` (`main` ณ เริ่มงาน)
Worktree: `/Users/agapae/agapae-work/AVEGEE/.codex-worktrees/2026-11-01-b23-redraw`
ไม่มี commit / push / merge; main ไม่ได้ถูกแก้ไฟล์งาน ไม่มีผลตรวจ Reese/Chris

## สิ่งที่เปลี่ยน

- วาดด้วย built-in image_gen แล้วสร้างรายละเอียดใหม่เป็น 4 overlapping tiles; SIFT registration + feather blending เป็นภาพ 3344×1882 จริง เก็บ native size, scale และ SHA256 ใน stitch-report.json
- ทางเดินกว้างขึ้น สร้าง walk mask ใหม่จากขอบพื้นในภาพ ตรวจพื้นเป็นผืนเดียว 194,976 pixels และแนวเดินผ่านด่าน/ประตูครบ
- จุดเริ่ม จุดจบ และจุดด่านเดิมรักษาพิกัดไว้; B34 ปรับเฉพาะ 10 vertices ระหว่างด่านให้เข้ากลางทางใหม่ (y +14 world px) ไม่ย้ายจุดเรื่องราว
- รักษาถ้ำหัวหน้าโซน 2 ที่ [.55,.72] และ owner stair connection; น้ำตก 4 จุดเก็บเป็น author anchors แล้วใช้ flow ตามวัสดุบนภาพใหม่แทนแถบสี่เหลี่ยมเดิม
- ใช้ zoom component เดียวกับเมือง/B12 (− / ทั้งแผนที่ / +, wheel/pinch) และ HUD โปรไฟล์/คู่มือ/กระเป๋า/พัก/ตั้งค่า
- Flow น้ำ/น้ำตก trace ตามภาพใหม่ด้วย material-color intersection และไม่ spawn บน walk mask; เงาเมฆ/สภาพอากาศใช้ระบบเดิม ใบไม้ฝั่งอุ่น B23 และหิมะ/ฝนตาม biome
- ชั้นบังหน้าจากพิกเซลภาพจริง 3 ชิ้น; ไม่ใช้ sprite ต้นไม้ใหม่วางทับ
- geometryVersion 2 ย้ายเซฟเก่าไปจุดเริ่ม/ด่านล่าสุดที่เคลียร์ โดยเก็บชัยชนะและความคืบหน้า
- bump ?v= เฉพาะ route-geometry, dungeon-view, route-occlusion ที่แก้

## ความกว้างทาง

วัดด้วยนิยามเดียวกับ B12: Euclidean distance-transform diameter ตาม medial ridge ของ connected normal cross-section ที่สเกล 1672×941 ไม่ตัดปลายทางทิ้ง เป้าหมายทุกช่วง p10 ≥40, median ≥48 px

| ช่วง | p10 (px) | median (px) | ตัวอย่างนอกพื้น |
|---|---:|---:|---:|
| 1 | 70.46 | 75.23 | 0 |
| 2 | 53.85 | 83.21 | 0 |
| 3 | 54.15 | 60.93 | 0 |
| 4 | 60.17 | 72.00 | 0 |

รวม p10 58.14, median 74.97 px; off-floor 0

## การตรวจ

`node --test tests/*.test.mjs` — **1786/1786 ผ่าน, 0 fail** ([log](tests-full.log))

- Native view handlers ที่ 1280 และ 390: เดินผ่าน 3 gated fights และถึงประตูปลายทาง, คลิก/กดค้างไม่ทะลุขอบ
- ปุ่มซูม/overview และ HUD ทั้ง 5 ปุ่มผ่าน; shared component มี wheel/pinch/reduced-motion tests
- ขนาดไฟล์จริง, generated tile provenance, source hash, width ทุกช่วง, จุดเรื่องราว, original owner fixture, flow/road separation และ migration ผ่าน
- เทสต์ baseline เดิมถูกปรับให้อนุญาตเฉพาะ row/import ของงานนี้และ B12; เส้นทางอื่นยังเทียบกับ baseline ที่ยืนยัน hash เดิม
- รอบเต็มแรกติด assertion เก่าที่ห้ามเปลี่ยน row และ/หรือน้ำตก; เก็บใน tests-before-baseline-update.log แล้วแก้เฉพาะ assertion ตามพฤติกรรมใหม่และยืนยันชุดเต็มซ้ำ

ยังต้องตรวจรับด้วยตาใน browser จริง และวัด FPS บนมือถือจริงตามใบงาน; native handler tests ใช้ DOM/canvas recorder ไม่ใช่ screenshot browser จริง และยังไม่มีหลักฐานว่าเพิ่ม frame time ไม่เกิน 2 ms

## ภาพและหลักฐาน

- [ก่อน–หลัง](before-after.webp) · [ภาพใหม่ย่อ](after-preview.webp)
- [walk mask overlay](mask-overlay.png) · [flow overlay](flow-overlay.png) · [occlusion overlay](occlusion-overlay.png)
- [ขนาด/hash](art-audit.json) · [ตารางความกว้าง](width-report.json) · [SIFT/tiles](stitch-report.json)
- [Prompt/specification และ provenance](prompts-and-provenance.md)

## ส่งต่อ

รอคุณเป้ตรวจรับและสั่ง merge เท่านั้น งานคิวถัดไป ART-CANTEEN, ART-DAIS2, ART-ULT-ICON และงานหลังจากนั้นยังไม่ได้เริ่มในรอบนี้
B23/B34 อยู่คนละ worktree และทดสอบแยก ไม่ได้รวมเป็น build เดียว ต้องตรวจ merge checklist และทดสอบหลังรวมเมื่อได้รับคำสั่ง

## อัปเดตหลังเจ้าของอนุมัติ merge

B23 merge ในเครื่องเป็น `6f2328b8` แล้ว; commitงาน `ff6f7228`; worktree/branch B23 ที่ merge แล้วลบตาม checklist หลักฐานย้ายมาที่โฟลเดอร์นี้ครบ เทสต์ก่อน merge1786/1786. Push ถูกระบบอนุมัติอัตโนมัติปฏิเสธเพราะต้องอนุญาต remote ชัดเจน จึงยังไม่ได้ส่งขึ้น GitHub.
