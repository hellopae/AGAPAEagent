# ใบงานโค้ด F12-CODE: AVEGEE — ชายแดน 1–2 เดินตามพื้นที่ที่คุณเป้วาด (มีทางแยก) + ต้นไม้ชุดใหม่ · เจ้าของ Codex

## บริบท
- ตอนนี้แผนที่ชายแดน (`src/route-geometry.js`, `src/dungeon-view.js`, `src/frontier-ambient.js`) เดินได้แค่ **เส้นเดียว**: `progress` 0–1 ตาม `DUNGEON_CORRIDOR` 31 จุด กว้าง ±0.026 + วงรี `PADS` · checkpoint = vertex 7/15/23 · patrol/chase/save/minimap อิง progress
- คุณเป้ 23 ต.ค. 2569 วาด **พื้นที่เดินได้จริง** มาให้ ซึ่งมี **ทางแยกหลายสาย** (ลงบันไดไปแอ่งน้ำซ้าย, ทางขึ้นเหนือสุด, ทางไปขวาสุดหลังสะพาน, บันไดลงใต้จากลานถ้ำ, ทางสั้นๆ อีก 2 จุด) → ต้องเดินเข้าไปได้ทุกสาย
  - mask: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/frontier12/frontier12-walkmask.png` (1672×941 = ขนาดภาพพื้นหลัง, ขาว = เดินได้, 1 ผืนต่อกัน)
  - ภาพตรวจ: `.../frontier12/frontier12-walk-overlay.jpg` · ต้นฉบับ: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE-reference/files/UI New map/Map-Zone1-5.jpg`
- คุณเป้วางตำแหน่งต้นไม้ใหม่ 80 ต้น → `.../frontier12/frontier12-trees.json` (`kind` = red/green/lightgreen, `x,y` = **โคนต้น** 0–1 ของภาพ, `big:true` = วาดใหญ่กว่า, `moved_from` = 6 ต้นที่ Claudy ขยับออกจากทางเดิน) · ภาพตรวจ `.../frontier12-trees-preview.jpg` · ต้นฉบับ `.../UI New map/Map-Zone1-4.jpg`
- ภาพพื้นหลังที่ล้างของบนทางแล้ว (`zone1-2-v4.webp`) Codex อีก run กำลังวาด — **run นี้ให้คง `background` = v3** Claudy สลับเป็น v4 ตอน merge
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** ห้ามสร้าง worktree/branch/clone ห้าม git commit/push (wrapper ทำให้)

## งาน
1. **mask เป็นข้อมูลของ route:** แปลง PNG → โมดูล `src/frontier-walkmask-th-asia.js` (ใช้รูปแบบ/เครื่องมือเดียวกับ `src/town-owner-walkmask-*.js` + `town-walkmask.js` ถ้าใช้ได้; ความละเอียดกริดพอให้ทางแคบ/บันไดไม่ขาด) · เพิ่มคอลัมน์ `walkMask` ใน `ROUTE_GEOMETRY` · route ที่ไม่มี mask (2–3, 3–4) ใช้ mask ที่สร้างจาก corridor ±0.026 + PADS เดิม → พฤติกรรมเดิมไม่เปลี่ยน
2. **เดินอิสระ 2 มิติในผืน mask:** คีย์บอร์ด/จอยสติ๊ก = เดินตามทิศ ไถลตามขอบเมื่อชน (ไม่ติดขอบ) · แตะ/คลิก = หาเส้นทางบนกริด mask (BFS/A*) แล้วเดินตาม → เข้าทางแยกได้
3. **progress ของเรื่องยังใช้ได้:** คำนวณล่วงหน้าให้ทุกเซลล์ของ mask มี `cellProgress` = progress ของจุดบน corridor ที่ใกล้ที่สุดแบบ geodesic (multi-source BFS จากจุด sample ตาม corridor ภายใน mask) → ทางแยกได้ค่า progress ของจุดที่แยกออก
   - ล็อกด่าน: ห้ามเข้าเซลล์ที่ `cellProgress > limit` (แทน clamp เดิม) · checkpoint/patrol/chase/guide/boss cave/การออกที่ EXIT ใช้ค่านี้ตามเดิม
   - save ยังเป็น `{x,y}` — โหลดเซฟเก่าที่อยู่นอก mask ให้ snap ไปเซลล์เดินได้ที่ใกล้สุด
   - ตรวจว่า corridor 31 จุดทุกช่วงอยู่ใน mask; ถ้าจุดไหนหลุด ขยับ vertex น้อยที่สุดให้อยู่กลางถนน (รายงานทุกจุดที่ขยับ) · ตำแหน่ง checkpoint/patrol อยู่บนถนนหลักเหมือนเดิม
   - ทิศหันหน้า/ท่าเดิน (up/down/left/right, walkDistance) มาจากการเคลื่อนที่จริง 2 มิติ · นิรา/ไกด์ตามหลังยามาโดยเดินบน mask (ใช้ประวัติตำแหน่งยามา ไม่ใช่ progress − ค่าคงที่)
4. **ต้นไม้:** แทน `TREES` ด้วยข้อมูลจาก JSON (`{x,y,kind,big}`) · red → `img/theme-v4/town-tree-red-th-v1.webp`, green → `img/theme-v4/town-tree-asia-v1.webp`, lightgreen → เลือก `town-tree-b-asia-v1` หรือ `-c-` ที่โทนเขียวอมเหลืองกว่า (ดูภาพแล้วรายงาน) · ขนาดฐาน `.052` ของความสูง, big ×1.4 · **วาดเรียงความลึกตามโคน y ร่วมกับตัวละคร** (ยามาเดินหลังต้นไม้ได้) · ตรวจว่าโคนทุกต้นอยู่นอก mask
5. minimap: วาดผืน mask (หรือเส้นขอบ) แทนเส้น corridor เส้นเดียว
6. cache-bust ตามแบบ commit M2/M3 ล่าสุด (`docs/m2-zone-skin.md`, import map ใน `index.html`)

## เทสต์
- เทสต์เดิมทั้งหมดต้องผ่าน (main `c408a00` = 1,390/0) · แก้เทสต์เดิมได้เฉพาะที่ผูกกับ "เดินได้เส้นเดียว" พร้อมเหตุผลใน README
- เพิ่ม: โหลด mask ได้และขนาดตรง · vertex/segment corridor อยู่ใน mask · จุดในพื้นแดงเดินเข้าไม่ได้ · ปลายทางแยกทั้ง 6 สาย หาเส้นทางจาก START ถึงได้ · ล็อกด่านกันไม่ให้ผ่าน CP ที่ยังไม่ปลด (รวมทางแยกหลัง CP) · โคนต้นไม้ 80 ต้นนอก mask · route 2–3 ยังเดินแบบเดิม
- หลักฐานเบราว์เซอร์ (Playwright, 1280 + 390): เดินเข้าแอ่งน้ำซ้าย, ทางเหนือสุด, บันไดใต้ลานถ้ำ + ภาพยามาอยู่หลังต้นไม้ → `output/f12-code/` · ไม่มี pageerror

## ข้อห้าม
ห้ามแก้ภาพใน `img/` · ห้ามเปลี่ยนเนื้อเรื่อง/ศัตรู/ด่าน · ห้ามแตะเมือง (town-*) นอกจาก reuse โค้ด mask · ห้ามบอกว่า "ผ่าน" เอง

## เกณฑ์รับงาน
1. เดินได้ทุกที่ใน mask และไม่ได้นอก mask 2. เข้าทางแยกได้ครบทั้งคีย์และแตะ 3. ล็อกด่าน/checkpoint/patrol/boss cave/EXIT ทำงานเหมือนเดิม 4. ต้นไม้ 80 ต้นตามตำแหน่ง เรียงความลึกถูก 5. เทสต์ผ่านครบ + หลักฐาน 2 ขนาดจอ 6. README `output/f12-code.md` (สิ่งที่เปลี่ยน, vertex ที่ขยับ, เทสต์ที่แก้)
