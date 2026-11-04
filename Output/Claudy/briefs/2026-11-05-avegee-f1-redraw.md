# F1-REDRAW — วาดแผนที่ชายแดนโซน 1 ใหม่ตามมาตรฐานโซน 1 (5 พ.ย. 2569)

Repo: AVEGEE (worktree ของ run นี้) · งานวาดล้วน · ห้าม commit/push/merge เอง · **ImageGen ในตัวเท่านั้น** ห้าม Shado

## อ่านก่อน (บังคับ)
`/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/2026-11-05-map-redraw/MAP-ART-STANDARD.md` — ทำตามทุกข้อ

## คุณเป้สั่ง
ชายแดนโซน 1 ที่ Codex วาดเมื่อ 4 พ.ย. (`layered-map-work/docs/art-reviews/2026-11-04-frontier-redraw/zone1*`, ภาพ 1536×1024) **ยังใช้ไม่ได้** ให้วาดใหม่ตามหลักเกณฑ์เดียวกับแผนที่โซน 1

## ผังที่ต้องยึด (ของคุณเป้)
- ไฟล์จัดวาง: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE-reference/files/UI New map/New Map Zone f1-2.ai` (อ่านอย่างเดียว)
- ภาพประกอบจาก AI ที่ Claudy render ให้: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/2026-11-05-map-redraw/input/frontier1-owner-layout.jpg` (1600×1756)
  + พิกัดชิ้น `frontier1-owner-layout.json` (สัดส่วนของ artboard 1935×2124 pt)
- ชิ้นภาพที่คุณเป้ใช้: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE-reference/files/UI New map/New Pic Map Zone f1-2/` (พื้น 3 แบบ ปากถ้ำ 1 + `close-camera-preview.jpg`)

องค์ประกอบผัง (บน→ล่าง): ฟ้าพระอาทิตย์ตก · ภูเขาไฟพ่นควันซ้าย / ภูเขาน้ำแข็ง-ธารน้ำแข็งขวา · **ประตูไทยเล็กด้านบนกลาง** (ทางออกไปนอกเขตชายแดน 1–2)
· ทางลาดจากประตูลงลานบน · **บันไดกว้างกลาง** · **ลานใหญ่** หน้าผาหินรอบ · บันไดเล็กซ้ายล่าง/ขวาล่าง · **ประตูไทยใหญ่ด้านล่างกลาง** (ทางเข้าจากเมืองโซน 1)
· แม่น้ำวิญญาณสีม่วงล้อมรอบ (ของเหลว) — รักษาสัดส่วนและตำแหน่งทั้งหมดนี้

## ขั้นตอน
1. วาด terrain atlas ใหม่ (ไม่มีประตู/ต้นไม้ติด) กว้าง ≥ 2300 px อัตราส่วนตามผัง (~0.91:1) ลงทะเบียนให้ทับผังคุณเป้ได้
   ถ้าความละเอียดเดียวไม่พอ ใช้วิธีภาพฐานร่วม + รายละเอียดหลายส่วน ล็อก alpha (แบบ terrain-seamless)
2. ภูเขาฉากหลังใช้ `terrain-seamless/layers/mountains.png` หรือวาดต่อให้เข้ากรอบนี้ · Sky โซน 1 เดิม
3. แม่น้ำ/ลาวาเป็นชั้นของเหลวแยก + loop 12 เฟรม × 3
4. ประตู 2 บาน: ใช้ประตูไทยจาก world-kit/โซน 1 (ประตูใหญ่ล่างของ `New-Map-Zone1-ok.jpg` เป็นแบบเดียวกัน) แยกเป็น object + ชิ้นหน้า/หลังถ้าตัวละครเดินลอดซุ้ม
5. วัตถุตกแต่งเพิ่มได้เล็กน้อยให้ไม่โล่ง (ต้นเมเปิลแดงฝั่งลาวา สนหิมะฝั่งน้ำแข็ง หิน พุ่ม เสาไฟ) **ใช้ชิ้นจาก world-kit ก่อน** วางบนพื้นทึบเท่านั้น ห้ามบังทางเดินหลัก
6. ส่งออกตามมาตรฐาน + ตรวจว่าทางเดินจากประตูล่าง → ลานใหญ่ → บันได → ลานบน → ประตูบน มีพื้นทึบต่อเนื่อง (alpha ≥ 250 ตามแนวกลาง) บันทึก `connection-review.json`

## ที่บันทึก
`docs/art-reviews/2026-11-05-frontier1-redraw/` ใน worktree

## เกณฑ์รับงาน
1. ภาพรวม `composite-preview.jpg` ตรงผังคุณเป้ (ซ้อนด้วย `owner-overlay.jpg` 50% ให้เห็น) สไตล์/แสง/มุมกล้อง/สัดส่วนเข้ากับ `New-Map-Zone1-ok.jpg`
2. terrain ไม่มีวัตถุติด ของเหลวไม่มีหินปน ประตู/ต้นไม้เป็นชิ้นแยกมี foot
3. tile-review ตรงทุกพิกเซล · connection-review ผ่านทั้งเส้น · output ≤ 80 MB
4. README รายงานจำนวน ImageGen, สิ่งที่ยังไม่แน่ใจ, สถานะแยก วาดแล้ว/ตรวจภาพแล้ว/ยังไม่ประกอบในเกม
