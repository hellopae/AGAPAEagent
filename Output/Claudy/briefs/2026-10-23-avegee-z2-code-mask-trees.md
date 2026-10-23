# ใบงานโค้ด Z2-CODE: AVEGEE เมืองโซน 2 — mask เดินได้ของคุณเป้ + ต้นไม้ 29 ต้น + ตำแหน่งอาคาร/เสาไฟเท่าโซน 1 · เจ้าของ Codex

## บริบท
- คุณเป้วาด mask เดินได้/ไม่ได้ของเมืองโซน 2 แล้ว → Claudy แปลงเป็นเลเยอร์ตามขั้นตอน `docs/m2-zone-skin.md` ข้อ 4 (1536×1024 RGBA แดง = เดินไม่ได้):
  `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/zone2-town/asia-mask-layer-edited.png` · ภาพตรวจ `.../asia-mask-check.jpg` · ต้นฉบับ `/Users/agapae/Desktop/untitled folder/Map-Zone2-1.jpg`
  - ก้อนแดงบนลาน = ที่ตั้งอาคาร (คุณเป้กันไว้) · ผืนเดินได้ต่อกันผืนเดียว
- ต้นไม้ที่คุณเป้วาง: `.../zone2-town/asia-trees.json` — `x,y` = โคนต้น 0–1 ของภาพพื้น, `kind` red/green/white/teal, `big`, `on_walk` (ต้นบนลาน **ตั้งใจวาง** ไม่ต้องย้าย) · ภาพตรวจ `.../asia-trees-match.jpg`
- คุณเป้: อาคาร + เสาไฟ โซน 2 **ตำแหน่งเดียวกับโซน 1** (ภาพสไตล์จีน-ญี่ปุ่นอีก run วาดอยู่ ไฟล์ `-v3` + ต้นซากุระ/หลิว — run นี้ห้ามรอ ใช้ไฟล์เดิมไปก่อน ทำเป็นตารางให้สลับชื่อไฟล์ได้บรรทัดเดียว)
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE) เท่านั้น** ห้ามสร้าง worktree/branch/clone ห้าม git commit/push

## งาน
1. รัน `python3 scripts/extract-town-owner-mask.py --zone asia --layer <ไฟล์ด้านบน> --write` → `src/town-owner-walkmask-asia.js` (ตรวจว่า `patches` ปิดเอง)
2. ต้นไม้โซน 2: แทนชุดต้นไม้ของ asia ด้วย 29 ต้นจาก JSON · kind → sprite: green `town-tree-asia-v1`, red `town-tree-b-asia-v1`, white `town-tree-sakura-asia-v1` (ยังไม่มี → fallback `town-tree-c-asia-v1`), teal `town-tree-willow-asia-v1` (fallback `town-tree-asia-v1`) · big ×1.4 · เรียงความลึกตามโคนเหมือนต้นไม้โซน 1 · ต้นที่อยู่บนพื้นเดินได้ให้มี collision ฐานเล็กแบบเดียวกับต้นไม้/ของตกแต่งโซน 1 (ยามาเดินอ้อม ไม่เดินทะลุ)
3. อาคาร (สถานี sala/tea/sawan/krajok, ศาลตัดสิน, บ้าน 4 หลัง) + เสาไฟ/คบ ของ asia: ใช้ตำแหน่งเดียวกับโซน 1 (`town-layout.js`) · ตรวจว่าฐานอาคารแต่ละหลังตกบนก้อนแดงที่คุณเป้กันไว้ — ทำตาราง ชิ้น / ตำแหน่ง / ตกในก้อนแดงกี่ % ใน README · ถ้าไม่ตรง **อย่าย้ายเอง** ให้รายงาน
4. ทางเข้า-ออกเมือง, จุดเกิด, NPC, ป้าย ยังอยู่บนพื้นเดินได้ (ตรวจด้วยโค้ด)
5. cache-bust ตามแบบ M2/M3/F12

## เทสต์
- เทสต์เดิมผ่านหมด (main `ac1c792` = 1,403/0) · เพิ่ม: mask asia โหลดได้/ผืนเดียว · จุดเกิด/ทางออก/NPC เดินถึงได้ · ต้นไม้ 29 ต้น kind ถูก · fallback sprite ทำงานเมื่อไฟล์ไม่มี
- ภาพหลักฐานจากโค้ดจริง (canvas/PIL ไม่ต้องเปิดเบราว์เซอร์ก็ได้ถ้า sandbox บล็อก): พื้น + mask + อาคาร + ต้นไม้ → `output/z2-code/`

## ข้อห้าม
ห้ามแก้ภาพ `img/` · ห้ามแตะโซน 1/3/4 · ห้ามบอกว่า "ผ่าน" เอง

## เกณฑ์รับงาน
1. mask ใหม่ใช้งาน 2. ต้นไม้ 29 ต้นตรงตำแหน่ง มี collision 3. อาคาร/เสาไฟตำแหน่งเท่าโซน 1 + ตารางเทียบก้อนแดง 4. สลับ sprite v3 ได้บรรทัดเดียว 5. เทสต์ผ่าน + README `output/z2-code.md`
