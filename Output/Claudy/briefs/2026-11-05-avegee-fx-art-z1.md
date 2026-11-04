# FX-ART-Z1 — วาด animation sprite ของเหลว/หมอก/ใบไม้/เมฆ สำหรับโซน 1 (5 พ.ย. 2569)

Repo: AVEGEE (worktree ของ run นี้) · งานวาดล้วน · ห้าม commit/push/merge เอง · **ImageGen ในตัวเท่านั้น** ห้าม Shado
มาตรฐาน: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/2026-11-05-map-redraw/MAP-ART-STANDARD.md`

## คุณเป้สั่ง (คำต่อคำโดยสรุป)
แม่น้ำและลาวาในรูปตัวอย่างเป็นแค่ภาพตัดแปะ — **ไม่อยากใช้แค่ effect** (เลื่อน/เฟดภาพนิ่ง) **อยากให้วาดเป็น animation sprite**
ให้ดูเป็นแม่น้ำไหลได้จริง ลาวาเดือดอยู่ หมอก/เมฆ (แบบรูปเก่า) เป็น animation sprite ขยับได้ · เมฆบนฟ้าลอยเป็น parallax · มีใบไม้หล่น

⚠️ ของเดิมใน `terrain-seamless/flows/*` สร้างด้วย `export-seamless-layers.py` บรรทัด 49 (crossfade ภาพนิ่งที่เลื่อน) = **effect ที่คุณเป้ไม่เอา** ห้ามทำวิธีนั้นซ้ำ

## ⚠️ ห้ามหยุดที่ภาพร่าง — ทำครบใน run เดียว (~30 นาที) ImageGen ≤ ~12 ครั้ง ถ้าไม่ทันทำตามลำดับความสำคัญด้านล่างแล้วรายงานว่าค้างข้อไหน

## อ้างอิง
- ผังโซน 1: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE-reference/files/UI New map/New-Map-Zone1-ok.jpg` (สไตล์ แสง ขนาด)
- ผังจัดวางที่ประกอบแล้ว + พิกัด: branch `claude/2026-11-05-zone1-layout` → อ่านได้ที่ `/Users/agapae/agapae-work/.toby-worktrees/z1-layout/docs/art-reviews/2026-11-05-zone1-layout/` (`proof-composite.jpg`, `layout.json`, `terrain-registration.json`, README) — พิกัด ok-space 2500×1759
- ชั้นพื้น/ของเหลวโซน 1: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE/layered-map-work/docs/art-reviews/2026-11-04-terrain-seamless/` (`layers/river.png`, lava, waterfall rect ใน manifest.json `liquids`) — ใช้ได้เป็น **ชั้นฐานนิ่งใต้ sprite** เท่านั้น
- ทุก path ข้างบน **อ่านอย่างเดียว**

## วิธีวาดเฟรมให้ต่อเนื่อง (สำคัญ)
ImageGen วาดทีละภาพคนละแบบ → ให้วาด **sprite sheet ทั้งชุดในภาพเดียว** (เช่นตาราง 4×2 = 8 เฟรม บนพื้นหลังสีเรียบ) สั่งให้ทุกช่องเป็นวัตถุเดียวกันต่างกันแค่จังหวะ แล้วตัดช่อง/จัดศูนย์/ทำ loop ด้วยสคริปต์
ตรวจว่าเฟรมสุดท้ายต่อเฟรมแรกได้ (ค่าต่างเฟรม N→1 ไม่เกินค่าเฉลี่ยระหว่างเฟรมติดกัน ×1.5) ถ้าไม่ต่อ ให้ใช้ ping-pong หรือวาดใหม่ · ห้ามสร้างเฟรมด้วยการเลื่อน/เฟดภาพนิ่ง

## ชิ้นที่ต้องได้ (เรียงตามความสำคัญ)
1. **แม่น้ำวิญญาณม่วง** — แผ่น tile ต่อได้ (seamless ซ้าย-ขวา) คลื่นไหลไปทางเดียว 8–12 เฟรม + แถบฟอง/ประกายตามตลิ่ง 6–8 เฟรม
2. **ลาวาเดือด** — ผิวลาวา tile ต่อได้ไหลช้า 8 เฟรม + ฟองลาวาผุด/แตก (sprite เล็ก 6–8 เฟรม วางกระจาย) + **ลาวาตกใต้สะพานซ้าย** (ตาม ok.jpg) 8 เฟรม
3. **หมอก/ไอ** — หมอกเหนือแม่น้ำ, ไอร้อนเหนือลาวา, หมอกเย็นฝั่งน้ำแข็ง: RGBA นุ่ม 6–8 เฟรมลอยช้า (แบบหมอกในรูปเก่า `old/Map-Zone2-2.jpg`)
4. **ใบไม้หล่น** — เมเปิลแดง, ใบทอง, ใบเขียว (สน/ไม้ลาน), เกล็ดหิมะฝั่งน้ำแข็ง: แต่ละชนิด 6–8 เฟรมหมุน/พลิก RGBA เล็ก
5. **เมฆ parallax** — เมฆบนฟ้า 4–6 ก้อนแยกไฟล์ RGBA สไตล์เดียวกับเมฆใน ok.jpg (ขนาดใหญ่พอวางกว้าง 500–1000 px ใน ok-space) + เมฆบางไกล 2 ก้อน
6. (ถ้าเหลือเวลา) น้ำตก/ธารน้ำแข็งละลายฝั่งขวา 8 เฟรม

## ส่งออก
`docs/art-reviews/2026-11-05-fx-art-z1/` ใน worktree:
- `sheets/<id>.webp` (sprite sheet แถวเดียวหรือกริด) + `fx-manifest.json`: `id, sheet, frameW, frameH, frames, fps, loop(loop|pingpong), tileable(x/y), blend(normal|screen|add), suggestedPlacement` (พิกัด ok-space จาก proof-composite: แนวแม่น้ำ, ร่องลาวา, ใต้สะพานซ้าย, ฝั่งน้ำแข็ง, ต้นไม้ที่ใบหล่น)
- `preview/<id>.gif` (หรือ webm) ต่อชิ้น · `index.html` เล่นทุกชิ้นซ้อนบน `proof-composite.jpg` ตามตำแหน่งที่เสนอ (โหลดแค่ที่เห็น)
- `loop-review.json` (ผลตรวจรอยต่อ loop ต่อชิ้น) · `generation-prompts.json` · README ภาษาไทย
- ≤ 80 MB ลบภาพทดลองที่ไม่ใช้

## เกณฑ์รับงาน
1. ทุกชิ้นเป็นเฟรมที่ **วาด** (ไม่ใช่เลื่อน/เฟดภาพนิ่ง) — แนบ `frame-strip.jpg` ต่อชิ้นให้เห็นเฟรมเรียงกัน
2. ชิ้น 1–5 ครบ, loop ต่อเนื่องตาม loop-review, tile ต่อขอบได้สำหรับชิ้นที่ tileable
3. สไตล์/แสงเข้ากับ ok.jpg (`style-compare.jpg`)
4. README แยกสถานะ วาดแล้ว/ตรวจภาพแล้ว/ยังไม่ประกอบในเกม (Claude ทำระบบเล่นในเกม)
