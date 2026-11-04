# ใบงาน Z1-LAYOUT-A — จัดวางโซน 1 ตามผังใหม่ของคุณเป้ (ขั้นตรวจตำแหน่ง)

- เจ้าของงาน: **Toby** · ผู้ตรวจรับ: Claudy · วันที่ 5 พ.ย. 2569
- โหมด `both`: Claude ทำประกอบ/ระบบ/เทสต์ · **Codex ทำเฉพาะงานวาด** (Toby ห้ามวาดภาพเอง)

## บริบท
คุณเป้จัดผังเมืองโซน 1 ใหม่เสร็จแล้ว ภาพผลลัพธ์คือ
`/Users/agapae/Documents/Work PAE/Claude/AVEGEE-reference/files/UI New map/New-Map-Zone1-ok.jpg` (2500×1758)
**ถือภาพนี้เป็นความจริงของตำแหน่ง** งานรอบนี้คือแปลงภาพรวมนี้เป็นฉากแยกชั้นที่วางวัตถุถูกตำแหน่ง เพื่อให้คุณเป้ตรวจ
**ก่อน** ทำ walkmask/collision/เชื่อมเข้าเกมในรอบถัดไป (Z1-LAYOUT-B)

ตำแหน่งวัตถุอยู่ใน Illustrator 3 ไฟล์ (คุณเป้แยกเพราะไฟล์ใหญ่ — **อ่านอย่างเดียว ห้ามเขียนทับ**) ในโฟลเดอร์เดียวกัน:
| ไฟล์ | เนื้อหา | หมายเหตุ |
|---|---|---|
| `New Map Zone1-3.ai` | ตัวเมืองกลาง ~45 ชิ้น (อาคาร แท่น ต้นไม้ลาน) | ฉากถูกวางเล็กกว่าใน artboard — ต้อง normalize |
| `New Map Zone1-4.ai` | ฝั่งลาวาซ้าย + ฝั่งน้ำแข็งขวา ~37 ชิ้น | |
| `New Map Zone1-5.ai` | ส่วนล่าง ประตูใหญ่/ต้นไม้/พุ่ม ~20 ชิ้น | |
| `New-Map-Zone1.psd` | layer 3–5 = เสาไฟ 3 ต้น (x≈1301,1499,2110 y≈925–977 ขนาด ~50×150) | parse header เอง ไม่มี psd_tools |

**วิธี normalize ที่ Claudy ตรวจแล้ว:** ทุกไฟล์มีภาพพื้น `/Im7` (1495×1052) ซึ่งคลุมทั้งผัง = กรอบ 2500×1759 ของ ok.jpg
→ แปลงทุก placement ด้วย affine ที่ map rect ของ Im7 ในไฟล์นั้นไปเป็น (0,0)-(2500,1759)
ตัวอย่างยืนยัน: วัตถุ 1254×1254 อยู่ทั้ง 3.ai (Im17) และ 5.ai (Im11) ได้ตำแหน่ง ≈ (962,1142) w≈133 ตรงกัน
- `/Im0–/Im10` ในทุกไฟล์ = ท้องฟ้า ภูเขา พื้นข้าง/ล่าง เมฆ (ชั้นฐาน) **ไม่ใช่วัตถุ** ตัดออกจากรายการวัตถุ
- วัตถุซ้ำข้ามไฟล์ (ภาพเดียวกัน ตำแหน่งใกล้กัน ≤6 px) → เก็บชิ้นเดียว
- ลำดับวาดใน content stream = ลำดับซ้อนของคุณเป้ เก็บไว้เป็น `authorOrder`
- โค้ดอ่าน AI ตัวอย่าง: `layered-map-work/scripts/extract-zone1-author-layout.py` (pypdf อยู่ `PYTHONPATH=/private/tmp/avegee-pdf-lib`,
  รองรับ clip path, CMYK→RGB ด้วย ImageCms, SMask = alpha) — **คัดลอกแนวคิดมาเขียนสคริปต์ใหม่ อย่ารันสคริปต์เก่า** (มันเขียนลงโฟลเดอร์ของ Codex)

พื้นภูมิประเทศใหม่ความละเอียดสูงของ Codex (โครงเดียวกับผัง): `layered-map-work/docs/art-reviews/2026-11-04-terrain-seamless/`
(`terrain-webp/` 20 ชิ้น + `manifest.json`, `layers/mountains.png`, `flows/` น้ำ/ลาวา, Sky) atlas 2300×1618 ≈ อัตราส่วนเดียวกับผัง
(คาด scale ≈1.087) — **ยืนยันด้วย feature match กับ ok.jpg ห้ามเดา**

## ที่ทำงาน
- worktree: `/Users/agapae/agapae-work/.toby-worktrees/z1-layout` branch `claude/2026-11-05-zone1-layout` (ฐาน `c6270cbe` = งาน Codex ที่ push สำรองแล้ว)
- output: `docs/art-reviews/2026-11-05-zone1-layout/` ใน worktree
- อ่านอย่างเดียว: `layered-map-work/` (clone ของ Codex), `AVEGEE-reference/` (ไฟล์คุณเป้)

## ขั้นตอน
1. สคริปต์ `scripts/extract-zone1-ok-layout.py`: อ่าน 3 AI + PSD → normalize → dedupe → `layout.json`
   ต่อวัตถุ: `id`, `source` (ไฟล์+ชื่อ Im), `sprite`, `x,y,w,h` (พิกัด ok-space), `flipX`, `clip` (ถ้ามี), `authorOrder`,
   `footY` (แถวล่างสุดที่ alpha≥128), `category` (building/tree/shrub/lamp/fence/dock/gate/station/other — ตั้งจากรูป/ขนาด ดูด้วยตาได้ถ้าจำเป็น), `area` (plaza/upper/lava/ice/bottom)
2. Export sprite ที่ไม่ซ้ำเป็น WebP RGBA (ตัดขอบโปร่งใส, ด้านยาว ≤ 2× ขนาดที่วางจริง ไม่ upscale) ไว้ `sprites/` + บันทึกการ crop ใน layout.json
3. ลงทะเบียน terrain-seamless (+ภูเขา/ฟ้า/ของเหลว) เข้ากรอบ ok-space → `terrain-registration.json` (affine + ค่าคลาดเคลื่อน)
   อ้างอิง terrain/ของเหลวจากโฟลเดอร์ Codex ด้วย path สัมพัทธ์ไม่ได้ → **คัดลอกเฉพาะไฟล์ที่ใช้** (terrain-webp, mountains, flows ที่จำเป็น) มาใน output
4. ภาพพิสูจน์: ประกอบ ฟ้า→ภูเขา→ของเหลว→พื้น→วัตถุ (เรียงตาม `authorOrder`) เป็น `proof-composite.jpg` (1250 กว้าง) + `proof-diff.jpg` (heatmap ต่างจาก ok.jpg)
   + `object-check.json` ค่าต่างเฉลี่ยในกรอบของแต่ละวัตถุ — วัตถุที่ต่างเกินเกณฑ์ ให้ตรวจด้วยตาแล้วแก้ หรือจดเป็นปัญหา
5. **หา gap**: บริเวณใน ok.jpg ที่ proof ยังต่างมาก (เช่นของที่คุณเป้วาด/ปะใน Photoshop แต่ไม่มีใน AI) → `art-gaps.md` บอกตำแหน่ง+crop จาก ok.jpg + ระบุว่าต้องให้ Codex วาดชิ้นแยกอะไร (ใช้แบบ brief ข้อ 6 ในโน้ต Codex: ชื่อ/crop/ขนาด/alpha/ที่บันทึก/เกณฑ์รับ) **ไม่สั่ง Codex เอง**
6. หน้า review `index.html` (เปิดผ่าน local server): สลับดู ok.jpg / ฉากประกอบ / slider ซ้อนทับ, เปิด-ปิดกลุ่มวัตถุตาม category, กดวัตถุแสดง id+พิกัด
   ใช้ `src/map-stream-cache.js` / `src/map-object-depth.js` ได้ถ้าเข้ากัน ไม่บังคับ · ทดสอบ desktop และมือถือ 390 px ด้วย Playwright (ดู `layered-map-work/scripts/verify-terrain-review.py`)
7. `README.md` ภาษาไทยสั้น: ได้อะไร, จำนวนวัตถุต่อไฟล์/ต่อหมวด, gap, วิธีรันซ้ำ
8. commit บน branch นี้ (ไม่รวมไฟล์ใหญ่เกินจำเป็น — output ทั้งโฟลเดอร์ควร < 60 MB) · **push เฉพาะ branch นี้** ขึ้น origin

## ข้อห้าม
- ห้ามแตะ main / ห้าม merge / ห้าม push main (คุณเป้จะตรวจตำแหน่งก่อน)
- ห้ามเขียนใน `layered-map-work/` หรือ `AVEGEE-reference/` หรือ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` (โฟลเดอร์แม่)
- ห้ามวาด/generate ภาพใหม่ · ห้ามเดาตำแหน่งวัตถุที่ไม่มีหลักฐาน — ไม่รู้ให้จดใน gap
- ห้ามโหลดภาพใหญ่ทั้งหมดเข้า context พร้อมกัน (เคยเกิน 512 MiB) ดูเป็น thumbnail ทีละภาพ
- ยังไม่ทำ walkmask/collision/navmesh/ต่อเข้าเกม — เป็นงานรอบ B
- ห้ามแก้ `status.json`, `worklog.json`, `work-mode.json`
- ถ้าแก้ `src/` ต้องรัน `node --test tests/*.test.mjs` ทั้งชุด (ฐาน 1,933 ผ่าน) เขียน log ลงไฟล์ ไม่ pipe เข้า tail

## เกณฑ์รับงาน
1. `layout.json` ครอบคลุมวัตถุจาก 3 AI + เสาไฟ PSD ไม่มีชั้นฐานปน ไม่มีชิ้นซ้ำ รายงานจำนวนต่อไฟล์
2. `proof-composite.jpg` วางทับ ok.jpg แล้ววัตถุเลื่อน ≤ 3 px (วัดจาก object-check) หรือมีเหตุผลรายชิ้น
3. terrain-seamless ลงทะเบียนเข้ากรอบได้ มีค่าคลาดเคลื่อนรายงาน
4. `art-gaps.md` ระบุชิ้นที่ต้องวาดเพิ่มชัดพอส่ง Codex ได้ทันที (หรือบอกว่าไม่มี gap พร้อมหลักฐาน)
5. หน้า review เปิดได้ desktop + มือถือ 390 px ไม่มี error ใน console มีภาพหน้าจอหลักฐาน
6. commit + push branch `claude/2026-11-05-zone1-layout` แล้ว main ไม่เปลี่ยน
7. รายงานกลับ: commit hash, จำนวนวัตถุ, ค่าคลาดเคลื่อน, gap, สิ่งที่ยังไม่แน่ใจ — แยก "ตรวจภาพแล้ว" กับ "ยังไม่ได้เดินจริง"
