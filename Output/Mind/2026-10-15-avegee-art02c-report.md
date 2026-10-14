# ART-02C ขั้น B — รายงานวิจารณ์ภาพ/ผังเดิน Zone1 2D (Mind, 2026-10-15)

repo `/Users/agapae/agapae-work/AVEGEE` main `81e5ddb` · build `20261014-2d-pages-r1`
อินพุต: `A-capture-notes.md` (Toby, 16 แถว) + ภาพใน `shots/` ที่เปิดดูจริงรอบนี้ (ดูหัวข้อ "รายงานถึง Codex")

## 0. สรุปคำตัดสินสั้น

| # | ปัญหา | ระดับ | ควรแก้ที่ | ต้อง imagegen? |
|---|---|---|---|---|
| 1 | ลานหอส่องกรรม (krajok) ล้ำปากธาร/น้ำ + จุดมาถึงอยู่บนหิน | สูง | ผังเดิน (หลัก) + ภาพ (เสริม) | ทางเลือก (patch P1) |
| 2 | สะพานภูเขาไฟปีกตะวันตก → krata เส้นเดินไม่ตามสะพาน | สูง | ผังเดิน | ไม่ |
| 3 | สะพานลาวา แถบเดินเฉียงทับลาวา/ผา | สูง | ผังเดิน | ไม่ |
| 4 | ท่าเรือรับวิญญาณ ภาพเรือ ≠ จุด ferry ≠ sprite เรือ | กลาง | ทั้งคู่ | ใช่ (patch P2) |
| 5 | ทางไปโลกันตนรก ข้ามหน้าผา ไม่ใช้สะพานน้ำแข็ง | กลาง | ผังเดิน (หลัก) | ทางเลือก (patch P3) |
| 6 | ลานกระทะทองแดง มุมบนขวายื่นทับลาวา | กลาง | ผังเดิน | ไม่ |
| 7 | ภาพพื้น 1536×1024 แตกที่ซูม 5×–6.5× | กลาง | ภาพ + ค่ากล้อง | ใช่ (upscale) |
| — | `TOWN_NO_WALK` ไม่ถูกใช้ | ระบบ | **โค้ด (Codex ตัดสิน)** | ไม่ |

หมายเหตุเรื่องความแม่นของพิกัด: ตัวเลขพิกัดโลกที่เสนอมาจากการอ่านภาพ แปลงด้วยสูตร
`world_x = frame_x + (screen_x − 153) × 0.7877` , `world_y = frame_y + (screen_y − 62) × 0.7877` (ภาพ 5× ที่ frame กว้าง 768 หน่วยใน 975 px)
และ `canvas = world ÷ 2.5` สำหรับพิกัดบนภาพพื้น 1536×1024 คลาดเคลื่อนได้ราว ±30–40 หน่วย
Codex ต้องปรับละเอียดโดยเปิด overlay "เส้นทางเดิน" หรือรัน `tools/walk-test.py` ซ้ำหลังแก้ ห้ามเชื่อเลขแบบ pixel-perfect

---

## 1. ข้อระดับสูง

### ข้อ 1 — ลานหอส่องกรรม (krajok) ล้ำปากธารน้ำตก/น้ำม่วง [สูง]

- **ปัญหา:** `TOWN_STATION_SITES.krajok = site(3450,1830)` ให้ลานเดิน `[3250,1470,3650,1940]` (สูตร `[x-200,y-360,x+200,y+110]`) ยื่นลงใต้ฐานอาคาร (ฐาน y≈1770) ไปทับสระน้ำปากธาร หินริมฝั่ง และน้ำม่วงจริง ~120–170 หน่วย
  ทาง `forest-bridge` มีปลาย `[3690,1930] → [3450,1950] → [3450,1830]` ซึ่งวิ่งที่ y≈1930–1950 = ขอบหินริมน้ำม่วง (ในภาพชายฝั่งน้ำม่วงเริ่มราว y≈1910 แถว x≈3450)
  ตอนเดินไปหอนี้ Yama หยุดที่ (3450,1830) = ยืนบนหินใต้บันไดประตู ไม่ใช่หน้าประตู
  ข้อสังเกตด้านภาพ: sprite หอทับขอบสระ มุมหน้าซ้ายของฐานหอลอยเหนือน้ำสระ เห็นใน `play-krajok-arrive-5x.png`
- **ภาพหลักฐาน:** `shots/pier-krajok-station-5x-walk.png` · `shots/play-krajok-arrive-5x.png` · `shots/shore-y1790-x3500-5x.png`
- **แก้ที่:** ผังเดิน (หลัก ต้องทำ) · ภาพ (เสริม ถ้าอยากให้ฐานหอตั้งบนพื้นจริง)
- **ข้อเสนอ — ผังเดิน (ค่าประมาณ ปรับด้วย overlay):**
  1. ตัดก้นลาน krajok ที่ y ≈ 1850 (ไม่ใช่ 1940) และตัดสี่เหลี่ยมสระ/ธาร `[3250,1740,3420,1930]` ออกจากพื้นเดินได้ (ผ่าน NO_WALK ตามหัวข้อ TOWN_NO_WALK หรือหดลานเฉพาะ krajok เป็น `[3420,1470,3650,1850]`)
  2. สะพานไม้ที่วาดข้ามธาร (ราว x 3205–3394, y 1740–1790) จะเดินได้ก็ต่อเมื่อมี corridor ตามสะพานจริง ถ้าไม่ต้องการให้ตัดแถบนั้นออก
  3. ปลาย `forest-bridge` เปลี่ยนจาก `[3690,1930],[3450,1950],[3450,1830]` เป็นเส้นบนหญ้าเหนือชายฝั่ง เช่น `[3690,1490],[3640,1700],[3520,1790],[3450,1800]` (ต้องไม่แตะหินดำริมน้ำที่ y>1850)
  4. ย้ายจุดมาถึงจาก (3450,1830) ไปหน้าประตู/ปลายบันได ≈ (3450,1790–1800) ซึ่งตามภาพเป็นหญ้า/ชานต่อจากบันได
- **ข้อเสนอ — ภาพ (เสริม, patch P1):** สร้างชานหินปูแผ่นใต้ปลายบันไดให้ฐานหอเกาะพื้น ปิดมุมสระที่ sprite ทับ ต่อกับสะพานไม้ด้านซ้ายและหญ้าด้านขวา
- **Prompt P1 (inpaint):**
  ```
  Inpaint ONLY inside the mask on the existing 1536x1024 painted mainland map "mainland-v1" (isometric top-down dark-fantasy Thai underworld/heaven world: glowing lava, violet spirit river, crimson maple-like trees, gilded Thai temple pavilions with naga stair balustrades, lanterns; painterly pixel-art-leaning texture). Keep every pixel outside the mask unchanged.
  Mask region on the 1536x1024 canvas: x 1300-1440, y 680-750 (about 140x70 px; world coordinates 3250-3600 x 1700-1875), at the foot of the river mouth, just south of where a large red-and-gold temple sprite will be composited on top later.
  Paint: a small flat landing terrace of weathered grey-green slab stone with thin gold inlay trim, matching the temple's stone base, about 90x35 px, centered near canvas (1385,718). Its left edge meets the end of the existing wooden footbridge deck; its right edge fades into the existing grass; its front edge steps down to the rocky shore. It must cover the corner of the blue pool that currently sits under the temple's front-left corner.
  Do not paint any building, character, text, tree crowns, or new water. Do not alter the waterfall, the footbridge, or the rocks south of y=750. Same lighting direction as the surrounding map (warm key light from upper-left, rim glow from the lava to the west). Output: the full 1536x1024 image, identical outside the mask, PNG (lossless) before WebP conversion.
  ```

### ข้อ 2 — สะพานภูเขาไฟปีกตะวันตก → กระทะทองแดง (krata) [สูง]

- **ปัญหา:** path `volcano-bridge` `[550,580],[850,620],[1040,660],[1240,760]…` เป็นเส้นตรงเฉียงที่อยู่ใต้คันสะพานที่วาดราว 40–60 หน่วย (สะพานที่วาดอยู่ราว (770,548) → (896,574) → (1062,602)) จึงตัดผ่านหิน/ธารลาวาใต้สะพาน Yama ไม่ได้ขึ้นสะพาน ภาพ play-krata แสดงว่ายืนริมลาวา
- **ภาพหลักฐาน:** `shots/lava-volcano-bridge-west-5x-walk.png` · `shots/play-krata-en-route-lava-volcano-bridge-5x.png` · `shots/walk-paths-overlay.png`
- **แก้ที่:** ผังเดิน (ไม่ต้องแก้ภาพ สะพานวาดชัดใช้ได้)
- **ข้อเสนอ:** ให้จุดหักของ polyline ตามแนวคันสะพานจริง เช่น
  `volcano-bridge: [550,580],[700,555],[770,550],[896,574],[1062,602],[1150,680],[1240,760],[1440,800],[1650,800],[1920,960]` (width ลดเหลือ ~100 ช่วงสะพาน)
  แล้วเปิด overlay ดูว่า centerline ซ้อนทับราวสะพานสองข้างจริง ช่วง (1062,602)→(1240,760) เป็นหินและต้นไม้ในภาพ ภาพไม่ได้แสดงถนนชัด Codex ตัดสินว่ายอมให้แถบเดินผ่านหินแคบๆ หรือแก้ภาพเสริม (ไม่บังคับ)
- **Prompt:** ไม่จำเป็น

### ข้อ 3 — สะพานลาวา (ตะวันตกของเมือง → ดงต้นงิ้ว/ป่าดาบ) [สูง]

- **ปัญหา:** path `lava-bridge` `[1150,1090],[1360,990],[1560,1030],[1650,1160]` กว้าง 135 จุดหัก (1360,990) อยู่เหนือคันสะพานที่วาดราว 40–50 หน่วย (สะพานที่วาดราว (1297,1054) → (1400,1030) → (1494,1007)) แถบจึงเป็นลิ่มเฉียงทับลาวา/ผาด้านบน ครึ่งซ้ายของสะพานอยู่นอกแถบ
- **ภาพหลักฐาน:** `shots/lava-bridge-mid-5x-walk.png` · `shots/lava-bridge-west-end-5x.png` · `shots/lava-bridge-east-end-5x.png` · `shots/play-ngiw-en-route-lava-bridge-5x.png`
- **แก้ที่:** ผังเดิน
- **ข้อเสนอ:** `lava-bridge: [800,1150],[1150,1090],[1300,1055],[1400,1030],[1500,1010],[1560,1040],[1650,1160],[1920,1250]` ช่วงสะพาน (1297→1500) width ~100 ตรวจว่าปลายตะวันตก (1150–1297) ต่อกับถนนหินที่วาดทางซ้ายสะพาน
- **Prompt:** ไม่จำเป็น

> ข้อ 2 และ 3 เป็นปัญหาแบบเดียวกัน (จุดหักห่างจากสะพานที่วาด) แนะนำให้ Codex แก้พร้อมกัน วาดจุดหักทับภาพ canvas ทีละ path แล้วเทียบกับเส้นกลางสะพานก่อนยืนยัน (ใช้ `tools/walk-test.py` ที่มีแล้ว)

---

## 2. ข้อระดับกลาง

### ข้อ 4 — ท่าเรือรับวิญญาณ / Fast Travel (bossPier) [กลาง]

- **ปัญหา:** จุดมาถึง `bossPier (2180,1850)` ตรงกับ **เรือไม้ที่วาดในภาพ** (ลำใหญ่ ผูกอยู่ปลายสะพานท่า ครอบ world x 2020–2360, y 1815–1940) Yama จึงไปยืนบนดาดฟ้าเรือที่วาดนิ่ง
  ขณะที่ sprite เรือพายของ ferry (เรือเรียวมีนายท้ายหมวกกว้าง) อยู่คนละที่ ราว world x 2110–2275, y 1960–2050 (≈110–130 หน่วยใต้เรือที่วาด) และ `ferry.to = (2310,1820)` ก็ไม่ตรงกับทั้งสองลำ ผู้เล่นเห็นเรือ 2 ลำ ไม่รู้ว่าลำไหนคือท่าเรือ
- **ภาพหลักฐาน:** `shots/pier-boss-ferry-start-5x-walk.png` · `shots/play-harbour-arrive-5x.png` · `shots/res-pier-boss-ferry-start-3.5x.png`
- **แก้ที่:** ทั้งคู่ ทางที่สะอาดที่สุดคือ
  - **ภาพ (patch P2):** ลบเรือที่วาดนิ่งออก เหลือน้ำม่วงและท่าไม้ ให้ sprite ferry เป็นเรือลำเดียวและมาเทียบท่าที่นั่น
  - **ผังเดิน/ค่า:** จุดมาถึง bossPier เปลี่ยนเป็นปลายท่าไม้ ≈ (2235,1810) ตัดแถบ harbour ส่วนปลาย `[2180,1850]→[2310,1820]` ออกจากพื้นเดิน · `ferry.from` ใกล้ปลายท่า ≈ (2250,1850) · `ferry.to` เลือกตามฉากถัดไป
  - **ทางเลือกถูกกว่า (ไม่ใช้ imagegen):** เก็บเรือที่วาดไว้เป็นของประกอบท่า เปลี่ยนจุดมาถึงให้ Yama ยืนที่ปลายท่าไม้ ไม่ขึ้นเรือ และย้ายจุดเริ่ม ferry sprite ให้เทียบเรือที่วาด ข้อเสียคือเรือที่วาดจะค้างอยู่ตอน ferry ออกไป ไม่แนะนำถ้าต้องการให้ฉาก ferry ดูสมจริง
- **Prompt P2 (inpaint ลบเรือ):**
  ```
  Inpaint ONLY inside the mask on the existing 1536x1024 painted mainland map "mainland-v1" (isometric top-down dark-fantasy Thai underworld/heaven world; violet spirit river with glowing purple ripple lines, lava-lit rocks, gilded lanterns, painterly pixel-art-leaning texture). Keep every pixel outside the mask unchanged.
  Task: remove the moored wooden boat (a long gilded-brown cargo boat with a mast and a hooded standing figure at its stern) from the water south of the jetty, and replace it with open violet spirit-river water.
  Mask region on the 1536x1024 canvas: x 805-950, y 690-785 (about 145x95 px; world coordinates 2010-2375 x 1725-1960). PROTECT (do not repaint): the wooden jetty planks, gangway, posts and railing that connect to the stone stairs at canvas x 870-930, y 695-742 - the jetty must remain intact and end cleanly in the water as a usable landing. Also protect the stone stairs and lanterns north of y=695 and the dark rock spire to the east at x>960.
  Fill: the same violet water with the same direction of soft purple ripple highlights, a faint warm reflection from the jetty lanterns, and a small soft wake/ripple ring where the jetty meets the water. Do not add any boat, character, text, or new objects. Lighting: warm key light from upper-left, violet ambient. Output: the full 1536x1024 image, identical outside the mask, PNG before WebP conversion.
  ```
  หมายเหตุ: เรือพายสั้น (ferry sprite) เป็น sprite แยก ไม่อยู่ในภาพพื้น ไม่ต้องลบ

### ข้อ 5 — ทางไปโลกันตนรก (lokan) ข้ามหน้าผา ไม่ใช้สะพานน้ำแข็ง [กลาง]

- **ปัญหา:** `ice-bridge` `[…,[2980,420],[3130,420],[3310,590],[3480,740]]` ช่วงสะพานจริง (2928→3169, y≈364–442) สอดคล้องกับภาพ แต่หลังปลายสะพานเส้นเฉียงลง (3130,420)→(3310,590)→(3480,740) ตัดผ่านหน้าผาหิมะ/ขอบธารฟ้าที่ภาพไม่ได้วาดทางรองรับ
  pathfinder ไปโลกันตนรกจากลานเมืองเลือกเดินตัดเหมือง (≈2912,1087 → 3062,930 → 3475,742) ข้ามขอบหน้าผาเหมืองไปบันไดน้ำแข็ง (3400–3560, 740–820)
  ทางที่วาดจริงสู่ลานโลกันตนรกตามภาพคือ ลานเหมืองหิน (x≈2930–3280, y≈585–820) → โครงไม้/ท่าเดินสั้นๆ (x≈3290–3380, y≈760–840) → บันไดน้ำแข็ง (x≈3400–3530, y≈740–820) ขึ้นลานหิมะของวิหารคริสตัล
- **ภาพหลักฐาน:** `shots/ice-bridge-east-end-5x-walk.png` · `shots/ice-bridge-top-5x.png` · `shots/quarry-bridge-mid-5x.png` · `shots/play-lokan-arrive-5x.png` · `shots/walk-paths-overlay.png` (เส้นขาวสู่ lokan) (ข้อจำกัด: ไม่ได้ดูภาพ play ตอนเดินจริงผ่านเหมือง ใช้ overlay และ notes ของ Toby)
- **แก้ที่:** ผังเดิน (หลัก)
- **ข้อเสนอ — ผังเดิน:**
  1. เพิ่ม path สั้นตามทางที่วาดจริง ลานเหมือง → โครงไม้ → บันไดน้ำแข็ง เช่น `quarry-stair: [3200,790],[3340,800],[3470,790],[3480,740]` width ~110 (ค่าประมาณ) และให้ลานเหมืองต่อกับลาน lan ตามบันไดหินที่วาดในเหมือง ตรวจว่า corridor ตามบันไดนั้นเชื่อมจริง
  2. หดช่วง diagonal ของ `ice-bridge` หลังปลายสะพานให้จบที่ปลายสะพาน (3130,420) แล้วเข้าลานหิมะ (วงรีหิมะ world x≈3290–3680, y≈400–700) ตามพื้นเรียบ `[3130,420],[3300,450],[3420,560],[3480,700]` แทนการเฉียงข้ามผา ถ้าตรวจแล้ว (3170–3290, ~430) เป็นช่องหินที่เดินไม่ได้ ให้ใช้ P3
  3. หลังทำข้อ 1 ตัดช่วง diagonal ของ `quarry-bridge`/pathfinder ที่ข้ามขอบเหมืองออก
- **ข้อเสนอ — ภาพ (เสริม, P3, เฉพาะถ้าข้อ 2 ไม่พอ):** วาดทางลาดน้ำแข็ง/หิมะสั้นๆ ต่อปลายสะพานน้ำแข็งกับลานหิมะ
- **Prompt P3 (inpaint ทางเลือก):**
  ```
  Inpaint ONLY inside the mask on the existing 1536x1024 painted mainland map "mainland-v1" (isometric top-down dark-fantasy Thai underworld/heaven world; the north-east is a frozen realm with pale blue glowing river, snow-capped rock, frosted Thai-style pavilions with crystal spires; painterly pixel-art-leaning texture). Keep every pixel outside the mask unchanged.
  Mask region on the 1536x1024 canvas: x 1170-1330, y 140-230 (about 160x90 px; world coordinates 2925-3325 x 350-575), immediately east of the arched wooden-and-ice footbridge's eastern landing and west of the large oval snow plateau that holds a crystal temple.
  Paint: a short, gently curving ramp of packed snow and pale-blue ice steps (about 40 px wide) with two low frosted stone posts, leading from the footbridge's east landing across the small snowy ledge up to the edge of the plateau, so the bridge visibly connects to the plateau. Keep the footbridge, the blue river below it, the snow-laden trees and the plateau unchanged outside this ramp. Same cool-blue ambient light with a warm lantern accent. Do not paint buildings, characters, or text. Output: the full 1536x1024 image, identical outside the mask, PNG before WebP conversion.
  ```

### ข้อ 6 — ลานกระทะทองแดง (krata) ขอบบน-ขวา [กลาง]

- **ปัญหา:** ลาน `[350,220,750,690]` (สูตร `site(550,580)` ± 200) มุมบนขวาและขอบบนยื่นเข้าไปแตะธารลาวา/น้ำตกลาวา (ลาวา ~ (620–760, 220–330) ตามภาพ แถบเขียวสุดขอบขวาแตะลาวาที่ x≈730–760)
- **ภาพหลักฐาน:** `shots/lava-krata-court-top-5x-walk.png` · `shots/play-krata-arrive-5x.png`
- **แก้ที่:** ผังเดิน (ไม่ต้องแก้ภาพ กระทะและลานวาดสมบูรณ์)
- **ข้อเสนอ:** หดลาน krata เป็น ≈ `[350,260,710,690]` (ขอบขวา −40, ขอบบน +40) หรือหัก polygon มุมบนขวาออก ไม่กระทบจุดมาถึง (550,580) ตรวจว่าทางสะพานภูเขาไฟ (ข้อ 2) ยังเข้าลานได้ทางซ้ายของลาวา
- **Prompt:** ไม่จำเป็น

### ข้อ 7 — ภาพพื้น 1536×1024 แตกเมื่อซูม 5×–6.5× [กลาง]

- **ปัญหา:** โลก 3840×2560 ใช้ภาพวาด 1536×1024 ขยาย 2.5× ที่ 5× = ราว 3.2 px จอต่อ 1 px ภาพ (6.5× = 4.1 px) จอ retina แย่กว่าเท่าตัว ขอบนุ่ม โทนเป็นขั้น พื้นผิวน้ำ/ไม้ตัวเรือแตกเป็นบล็อก และ sprite (บ้าน/ต้นไม้/ตัวละคร) คมกว่าพื้นหลังจนเห็นรอยต่อ ที่ซูม 3.5× ยังยอมรับได้ (`res-pier-boss-ferry-start-3.5x.png`)
- **ภาพหลักฐาน:** `shots/res-pier-boss-ferry-start-3.5x.png`, `…-5x.png`, `…-6.5x.png`, `…-6.5x-canvas.png`
- **ทางเลือก:**

| ทางเลือก | ทำอะไร | ข้อดี | ข้อเสีย/ข้อควรระวัง |
|---|---|---|---|
| A. จำกัดซูม | จำกัดซูมสูงสุดเหลือ ~3.5× (ถ้า DPR ≥ 2 อาจ 3×) ซ่อนตัวเลือก 5×/6.5× | แก้ทันที ไม่แตะภาพ ไม่เสี่ยงผังเดินเลื่อน ไม่เพิ่มขนาดดาวน์โหลด | ผู้เล่นซูมดูงานศิลป์ไม่ได้ เลข 3.5× มาจากภาพจุดเดียว ควรตรวจกับอีก 2–3 จุด |
| B. ภาพพื้นความละเอียดสูงขึ้น แบ่ง tile | อัปสเกลเป็น 3072×2048 (2×) ตัดเป็น 4 tile (1536×1024) หรือ 6 tile (1024×1024) โหลดเฉพาะ tile ในกล้อง (lazy) | ที่ 5× ได้ ~1.6 px จอต่อ px ภาพ (เดิม 3.2) คมขึ้นชัด ใช้กับ retina ได้ดีกว่า | ต้องมี pass อัปสเกล (หน้าตางานอาจเปลี่ยน) · ต้องแก้ตัวโหลดภาพเป็น tile (โค้ด Codex) · รอยต่อ tile · ขนาดไฟล์/หน่วยความจำมือถือ (ต้องวัดจริง) |
| C. ผสม (แนะนำ) | ทำ A ทันทีเป็นมาตรการชั่วคราว แล้วทำ B หลังแก้ผังและภาพ (ข้อ 1–6) เสร็จ แล้วยกเพดานซูมกลับเป็น 5× | ได้ทั้งความปลอดภัยทันทีและคุณภาพถาวร อัปสเกลครั้งเดียวหลัง patch ทั้งหมด ไม่ต้อง inpaint ซ้ำ 2 ความละเอียด | ใช้เวลามากกว่า |

- **ลำดับที่ถูก:** patch P1–P3 ที่ 1536×1024 ก่อน → อัปสเกลหนึ่งครั้ง → ตัด tile (อย่าอัปสเกลก่อนแล้วค่อย inpaint เพราะเพิ่มงานและเสี่ยงสไตล์ไม่ตรง)
- **ข้อกำชับ:** อัปสเกลต้องไม่เลื่อนรูปทรง (aspect 3:2 เดิม พิกัดคงที่) ไม่ให้พื้นเดินและ sprite เพี้ยน และไม่ใช้ denoise สูงจนวาดสะพาน/ถนน/ท่าใหม่
- **Prompt U1 (upscale/detail pass ถ้า imagegen ทำ img2img ได้ ถ้าไม่ได้ใช้ upscaler ภายนอก):**
  ```
  Upscale the attached 1536x1024 painted mainland map "mainland-v1" to 3072x2048 (exactly 2x, same 3:2 framing, no crop, no shift). This is an isometric top-down dark-fantasy Thai underworld/heaven map with glowing lava rivers, a violet spirit river, crimson trees, gilded Thai temple roofs, a frozen blue realm, and lantern-lit stone bridges and stairs.
  Add genuine fine detail only where the source already implies it (stone slab edges, wood grain on bridges and jetties, ripples on water, lava glow cracks, leaf clusters, roof tile lines, rope and railing lines) in the same painterly pixel-art-leaning style and the same palette. Reduce posterization banding and blocky compression artifacts. Keep every object, road, bridge, stair, pier, building footprint, shoreline and lava stream at exactly the same position and shape - do not add, remove, move or redraw any structure, character, or text. Low denoising strength; geometry must stay pixel-aligned with the source.
  Process in 4 overlapping tiles (feather 64 px) if needed, then deliver the stitched 3072x2048 PNG with no visible seams.
  ```

---

## 3. ข้อ TOWN_NO_WALK — เรื่องโค้ด ไม่ใช่งานภาพ (แนะนำให้ Codex ตัดสิน)

**นี่ไม่ใช่งานภาพ และไม่ได้แก้อะไรในโค้ด** เป็นข้อสังเกตเชิงระบบจาก Toby (ตาม notes จากการอ่าน `walk.js canWalk` โซนเมืองที่ใช้ `townContains` + บล็อกอาคารเท่านั้น ส่วน `TOWN_NO_WALK` รวมแถบแม่น้ำ y≥1820 ถูกประกาศไว้แต่ไม่ถูกนำไปตัดสิน)
ผลคือทุกที่ที่ overlay สีเขียวทับน้ำ/ลาวา ตัวละครเดินลงไปได้จริง (Toby ยืนยันด้วยการเดิน) และเป็นสาเหตุร่วมของข้อ 1, 2, 3, 4, 6

Mind ไม่ได้อ่าน `walk.js` เอง (ใบงานให้อ่านเฉพาะ `town-layout.js`) ขอให้ Codex ตัดสินทางเลือก

> **Claudy ตรวจยืนยันแล้ว (main `81e5ddb`):** `canWalk` ใน `src/walk.js:269-273` — เมื่อ `SCENE.w === TOWN_SIZE.w` เช็กแค่ `townContains` → holes → blocks แล้ว `return` ก่อนถึงบรรทัด 279 ที่เช็ก `NO_WALK` · `TOWN_NO_WALK` (`src/town-layout.js:77`) export ไว้แต่ไม่มีไฟล์ใด import · `data.js:2067` ใส่แถบแม่น้ำ `[0,RIVER_Y,…]` ลง `NO_WALK` ตอนเข้าเมืองด้วย แต่สาขาเมืองของ `canWalk` ไม่อ่าน — จึงเป็น guard ที่ไม่มีผล 2 ชั้น

1. **ใช้ `TOWN_NO_WALK` ตัดสินจริง** ใน `canWalk` (blocked ถ้าอยู่ใน NO_WALK) เร็วและปลอดภัยสุดสำหรับแถบแม่น้ำ y≥1820 ที่ครอบ krajok/ท่าเรือ/สะพานใต้ ต้องระวัง path ที่ตั้งใจข้ามน้ำ (เกาะประตูชายแดน y 2200–2410, สะพานใหญ่ใต้ city-spine y 1950–2360, ท่าไม้ท่าเรือ) ต้องเป็นข้อยกเว้น (allow list เป็น polygon สะพาน/ท่า)
2. **คงพฤติกรรมเดิมแล้วแก้ผังเดินทุกจุด (ข้อ 1–6)** เมื่อแก้หมด NO_WALK ที่ไม่ได้ใช้ก็ไม่ทำให้เกิดบั๊กในเกม แต่เสี่ยงในการแก้ผังรอบหน้า (ผู้ตรวจจะคิดว่ามี guard ทั้งที่ไม่มี) ถ้าเลือกทางนี้ให้ลบหรือคอมเมนต์ตัวแปรที่เป็นข้อมูลหลอก
3. **ทำ walk mask** (ภาพขาวดำความละเอียดต่ำ ~384×256 อ้างอิงภาพวาด) แม่นที่สุดต่อภาพ แต่เป็นงานใหญ่ ต้องวาด/ตรวจ mask ด้วยมือ ไม่แนะนำสำหรับรอบนี้

แนะนำข้อ 1 + แก้ผังข้อ 1–6 พร้อมกัน (ใส่ guard แล้วใช้ overlay ยืนยัน) แต่ขึ้นกับสถาปัตยกรรม `canWalk` ซึ่งเป็นการตัดสินของ Codex

---

## 4. ข้อระดับต่ำ (ไม่ทำก็ได้)

- แถว 8 ท่าบันไดฝั่งตะวันออก ปลายท่าทับเรือ แก้ไปพร้อมข้อ 4
- แถว 9 เกาะประตูชายแดน ปลายบันไดลงน้ำล้ำ ~40–50 หดขอบ polygon บันไดใต้ 40–50 หน่วย
- แถว 10 สะพานใหญ่ใต้ แถบกว้างกว่าคันสะพาน 20–40 ลด width 170 เหลือ ~130 ตอนกลางสะพาน หรือให้ NO_WALK ตัดขอบ
- แถว 11 ดงต้นงิ้ว / 14 ธารลาวาใต้ / 15 แถบน้ำแข็ง ผ่าน ไม่ต้องทำ
- แถว 12 ต้นไม้ (2530,1650) รากพาดบนผา ย้ายต้นไม้ไปทางตะวันตก/เหนือราว 60–100 หน่วยให้รากอยู่บนพื้นเรียบ (แก้ตำแหน่ง sprite ไม่ต้องใช้ imagegen)
- แถว 13 บ้าน lot1–lot3 ผ่าน

**แปลงบ้านที่ y≈1790 ที่ Codex เคยสังเกต:** ใน main นี้ไม่มีแล้ว (4 แปลงฐานแตะพื้นครบ ตามแถว 13) ไม่พบบ้านลอยน้ำ ปิดข้อนี้ได้ ยกเว้นต้นไม้ (2530,1650) ข้างต้น (ข้อสรุปนี้อิง notes ของ Toby เป็นหลัก Mind เปิดภาพ lot เองไม่ครบ)

---

## 5. ลำดับความสำคัญที่แนะนำให้ Codex ทำ

1. **ตัดสิน TOWN_NO_WALK** กำหนดแนวป้องกันน้ำ/ลาวาเดียวก่อนแก้ผังรายจุด เพราะมีผลต่อการตรวจซ้ำของข้อ 2
2. **ผังเดินข้อ 2 และ 3** (สะพานภูเขาไฟ/สะพานลาวา) สูง ทำพร้อมกัน ปรับ polyline ตามสะพานที่วาด ไม่ต้องใช้ภาพ
3. **ผังเดินข้อ 1** (krajok ตัดก้นลาน เปลี่ยนปลาย forest-bridge ย้ายจุดมาถึง) สูง
4. **ผังเดินข้อ 6** (ลาน krata หด) และ **ข้อ 5** ส่วนผัง (path ตามบันไดเหมือง ลดช่วงเฉียงของ ice-bridge) กลาง
5. **ภาพ patch P2** (ลบเรือที่วาดที่ท่าเรือรับวิญญาณ) + ปรับจุด bossPier/ferry.from กลาง (ต้องรอ imagegen)
6. **ตรวจซ้ำด้วย `tools/walk-test.py` + `tools/play-shots.py` + `tools/water-scan.py`** ครบ 12 จุดหมายต้อง arrived ไม่มีแถบเขียวทับน้ำ/ลาวา
7. **ภาพ patch P1 และ P3 (ทางเลือก)** ทำเมื่อผังข้อ 1/5 แล้วยังดูไม่ติดพื้น
8. **ข้อ 7 ซูม** ทำทางเลือก A ทันที (หรือพร้อมข้อ 2) แล้วทางเลือก B (อัปสเกล + tile) เป็นขั้นสุดท้ายหลัง patch ภาพทั้งหมดเสร็จ
9. ข้อระดับต่ำ (ส่วนที่ 4) ตามเวลาที่เหลือ

ไม่แตะ 3D / Break/Boost / ART-02A/B ตามใบงาน

---

## รายงานถึง Codex

**ทำอะไร**
- Toby (ขั้น A): จับภาพ Zone1 2D ที่ 1280×800 ด้วย Playwright ผ่าน local server จากหน้า preview `output/zone1-2d/index.html` (ไม่แตะเซฟ) — ภาพรวม + ซูม 5× 38 จุด (พร้อมคู่ overlay เส้นทางเดิน) + 3.5×/6.5× + เดินจริงครบ 12 จุดหมาย ไม่มี console error · บันทึกใน `A-capture-notes.md`
- Mind (ขั้น B): อ่าน notes 16 แถว เปิดภาพ 12 ใบ (`overview-overview.png`, `walk-paths-overlay.png`, `pier-krajok-station-5x-walk.png`, `play-krajok-arrive-5x.png`, `pier-boss-ferry-start-5x-walk.png`, `play-harbour-arrive-5x.png`, `res-pier-boss-ferry-start-3.5x.png`, `res-pier-boss-ferry-start-6.5x.png`, `lava-volcano-bridge-west-5x-walk.png`, `lava-bridge-mid-5x-walk.png`, `ice-bridge-east-end-5x-walk.png`, `lava-krata-court-top-5x-walk.png`) และอ่าน `src/town-layout.js` บรรทัด 1–60 (อ่านอย่างเดียว) แล้วเขียนข้อวิจารณ์ ข้อเสนอ และ prompt P1/P2/P3/U1

**ไฟล์ที่เพิ่ม** (ทั้งหมด untracked ใน `output/claude-2d-art/` ยังไม่ commit)
- `REPORT.md` (ไฟล์นี้ — Claudy บันทึกจากรายงานของ Mind) · `A-capture-notes.md` · `shots/` 108 ไฟล์ ~118 MB · `tools/` (capture.py, walk-test.py, play-shots.py, water-scan.py, points*.json, log)
- ไม่ได้แก้ `src/`, `index.html`, `tests/`, `img/`, catalog, `Backup/` · ไม่ได้ `git add/commit/push` · ไม่ได้แตะ clone ของ Codex app · ไม่ได้โหลด/เขียนเซฟผู้เล่น · ไม่ได้วาดภาพ

**ตรวจอะไร**
- เทียบตำแหน่งสะพาน/ท่า/ชานที่วาดกับแถบเดินใน overlay ด้วยตา แปลงเป็นพิกัดโลกด้วยสูตรสเกลข้างต้น
- เทียบ polyline ใน `TOWN_PATHS` กับตำแหน่งสะพานที่วาด ข้อ 2 และ 3 จุดหักห่างจากคันสะพานราว 40–60 หน่วย
- ผลเทสต์ main `81e5ddb` ในเครื่อง Claude: `node --test tests/*.test.mjs` ผ่าน 914/914 (ตรงกับที่ Codex แจ้ง)

**ปัญหาค้าง**
- พิกัดที่เสนอ (polyline ใหม่, กรอบ mask ของ P1–P3, จุดมาถึง) เป็นค่าประมาณ ±30–40 หน่วย ต้องปรับด้วย overlay ก่อน commit
- ไม่ได้อ่าน `walk.js` จึงไม่รู้ว่าแนวทาง TOWN_NO_WALK ข้อ 1 กระทบ pathfinder/คลิกเดินอย่างไร Codex ต้องตัดสินและทดสอบ
- ข้อ 5 ยังไม่ชัดว่าช่องระหว่างปลายสะพานน้ำแข็งกับลานหิมะเป็นหินหรือหิมะเรียบ และไม่ได้ดูภาพเดินจริงผ่านเหมือง จึงทำ P3 เป็นทางเลือก · ปีกบนสะพานน้ำแข็ง (2980,420)→(3130,420) ประเมินจาก overlay อย่างเดียว
- ข้อ 7 เพดานซูม 3.5× มาจากการดูจุดเดียว ควรตรวจกับอีก 2–3 จุดก่อนล็อกค่า · ขนาดไฟล์ tile และผลต่อมือถือยังไม่ได้วัด
- imagegen ของ Codex อาจไม่รองรับ inpaint แบบ mask หรือ upscale 2× ตรงๆ ถ้าไม่รองรับให้วาด crop เล็กแล้วประกอบกลับด้วยสคริปต์ แทนการวาดแผนที่ใหม่ทั้งผืน
- สแกนสีน้ำ (`water-scan.py`) เป็น heuristic มี false positive ที่สะพานไม้/บันไดน้ำแข็ง ข้อระดับสูงทุกข้อยืนยันด้วยตาแล้ว
- `shots/` ~118 MB — ถ้าจะ commit เข้า repo ควรเลือกเฉพาะภาพที่อ้างในรายงานนี้ หรือเก็บนอก repo
