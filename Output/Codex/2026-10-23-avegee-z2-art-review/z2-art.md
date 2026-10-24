# Z2-ART — ชุดภาพจีน/ญี่ปุ่น/เกาหลี (รอตรวจรับ)

รับต่อจาก run `20261023T121019Z-cb557d1a` / `ffa0f33`: ภาพต้นทาง12ชิ้นมีอยู่แล้ว รอบนี้สร้างหลิวด้วย built-in imagegen เพิ่ม1ชิ้น และส่งออก/ตรวจทั้งชุด13ชิ้น ช่วงส่งออกภาพไม่แก้ src/index/tests; ขั้นเชื่อมต่อภายหลังแก้เฉพาะตาราง ASIA_TOWN_SPRITES, cache และชื่อไฟล์ที่ assertion อ้างอิง

## ผลตรวจและข้อจำกัด

- ครบ inventory13ชิ้น: judgment, บ้าน4, lamp, torch, facade4, sakura, willow; rock อยู่นอกขอบเขต เมเปิลแดงเดิมคงไว้
- canvas เท่าภาพอ้างอิง13/13; จุดฐานA>=128 yเท่าเดิม13/13, xคลาดจากการปัดพิกเซลไม่เกิน0.5px; SHA-256 ภาพเดิมไม่เปลี่ยน13/13
- สคริปต์เดิมนับ alpha1 ที่ไกลจากตัวอาคารเป็นกรอบ ทำให้ house-front-one/sawan หดเล็กมาก แก้ให้ crop กรอบที่alpha>=8ก่อน fit เท่านั้น ไม่เปลี่ยนสี/ไม่ใช้ color key และรักษา alpha ภายในกรอบ
- บางอาคารยังมีสัดส่วน silhouette เล็กกว่าภาพเดิม เพราะรักษาจุดฐานแบบ asymmetric และไม่ตัดตัวอาคาร: ดูภาพเก่า|ใหม่ ไม่อ้างว่ารูปร่าง footprint เท่ากันทุกพิกเซล
- Composite บนพื้นจริง4915×3277 และ preview1536×1024 ใช้ layout Asia จาก main a0229d1: บ้าน/โคมตำแหน่งโซน1เดิม และต้นไม้29ต้นตามเจ้าของ ไม่ย้ายต้นไม้เพื่อหลบทาง
- ซากุระขาวอมชมพู/หลิวฟ้าอมเขียวเจ้าของยืนยันแล้ว23ต.ค.; ไม่ต้องถามซ้ำ
- ตรวจภาพ old-new/contact/composite; มี edge sheets ทุกชิ้นบนพื้นมืด/ขาว/ชมพูไว้ให้ตรวจ native resolution; ยังไม่รับรองภาพเกม dynamic light/AO ทุกจุด
- ไม่มีการรัน npm build เพราะ repo เกมเป็น static ES modules; ต้องทดสอบ runtime หลังแก้ตาราง sprite ในขั้นรวม
- รายงานและหลักฐานต้องย้ายออก repo เกมก่อน merge ตาม checklist

## ไฟล์และขนาด

- `img/theme-v4/town-judgment-asia-v3.webp` — 1536×1024
- `img/town-district/house-front-one-asia-v3.webp` — 1402×1122
- `img/town-district/house-right-one-asia-v3.webp` — 1438×1094
- `img/town-district/house-left-two-asia-v3.webp` — 1036×1518
- `img/town-district/house-right-two-asia-v3.webp` — 1036×1518
- `img/theme-v4/town-lamp-asia-v3.webp` — 512×1112
- `img/map-zone2/torch-pillar-v3.webp` — 240×419
- `img/map-v5/st-sala-asia-v3.webp` — 1254×1254
- `img/theme-v4/st-tea-asia-v3.webp` — 365×375
- `img/map-v5/st-sawan-asia-v3.webp` — 1240×1249
- `img/map-v5/st-krajok-asia-v3.webp` — 1187×1216
- `img/theme-v4/town-tree-sakura-asia-v1.webp` — 1199×1312
- `img/theme-v4/town-tree-willow-asia-v1.webp` — 1199×1312

## หลักฐาน

- `z2-art/qa/old-new-contact.webp`
- `z2-art/qa/zone2-composite-preview.webp` / `zone2-composite-native.webp`
- `z2-art/qa/measurements.json` / `placements.json`
- `z2-art/qa/edges-*.webp`

## Prompt และ provenance

ภาพต้นทาง12ชิ้นมาจาก run เดิม เก็บ PNG และ inventory เดิมครบ แต่ events.jsonl ที่พบไม่ได้เก็บ prompt ของ tool imagegen จึงไม่อ้างว่ากู้ prompt เดิมได้ครบ ข้อกำหนดที่ใช้ตรวจคือใบงาน Z2-ART-CJK เดิม: East Asian curved tile roof, wood/red pillars/paper lanterns; RGBA; no religious icons/text/watermark; same canvas/base as reference.

หลิว (รอบนี้): Use case: stylized-concept. Asset type: a single isolated 2D game map tree sprite for AVEGEE, East Asian Chinese/Japanese/Korean fantasy town. Primary request: create a NEW mature weeping willow tree, clearly recognizable long thin drooping tendrils of pale teal, blue-green and jade foliage, gnarled warm brown trunk and visible rooted base. Hand-painted richly detailed fantasy RPG game sprite, slightly elevated 3/4 camera looking down, coherent with provided reference tree's painted texture and warm upper-left lighting. The reference image is ONLY a style and camera reference; change species to willow, do not reproduce the reference pine's layered boughs. A graceful single tree with a broad domed canopy and cascading leaves that stop above the visible trunk base. Entire tree including roots fully visible, central trunk/root base centered horizontally near bottom, modest transparent padding on every side. Genuine RGBA transparency everywhere outside tree, crisp natural alpha edges without white/magenta fringe. No ground tile, scenery, water, pot, architecture, people, text, logos, religious imagery, border, or watermark. Portrait composition suitable for fitting into a 1199x1312 canvas.

## Self-check

1. Inventoryครบ13ชิ้น: ตรวจไฟล์แล้ว
2. ธีมจีน/ญี่ปุ่น/เกาหลี: ตรวจภาพแล้ว รอเจ้าของรับงาน
3. ขนาด/ฐาน: ตรวจเชิงตัวเลขแล้ว; silhouette มีข้อจำกัดข้างต้น
4. Alpha: มีจริงและมี edge sheets; ไม่อ้างการรับรอง QA จาก Claude
5. Composite/README: มี; promptเดิม12ชิ้นไม่พบใน log จึงบันทึกข้อจำกัดตรงนี้


## Integration review

Merged current main (B1 included) into the art branch. Commit d41516b selects the completed v3 station/building/lamp/torch art in ASIA_TOWN_SPRITES. Owner tree positions and legacy disabled-skin art are unchanged. M2 targeted checks pass after updating filename assertions. Full suite is running. Production renderer checked at 1280×720 and 390×844 using a local QA-only fixture with built stations and disabled persistence; console error/warning list was empty. Screenshots are in this folder. The runtime test does not replace the full gameplay regression suite. No Z2 merge/push yet.


## Final merge

Merged and pushed as `23e0098658fcc1eec5e6377870b298ff23b1797e`. The last full sequential attempt found one real missing-preload assertion (1414/1415); commit2c1abfa adds all13 new images to Asia preload and refreshes catalog/preload cache tokens without dropping earlier tokens. All210 test files were then executed exactly once in two groups (209 files/1394tests, then workers21tests idle), total1415/1415, no fail/skip/cancel. Both logs plus the exact file inventory are in this review folder under full-final-20261024*. Syntax125files and diff check pass. Prior browser layout remains valid because the final changes only add preload entries and cache versions. Pages status is checked separately after push. Worktree retained.
