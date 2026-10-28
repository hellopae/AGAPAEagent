# B34 — เปิดเส้นทางชายแดน 3–4 (`west:cyberhell`) ตาม mask + ต้นไม้ของคุณเป้ (28 ต.ค. 2569)

Repo: AVEGEE (worktree ของ run นี้) · ฐาน = main ล่าสุดตอนเริ่ม run · ห้าม commit/push/merge เอง

## Input (อ่านจากพาธนี้ นอก worktree ได้)
`/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/border34/`
- `border34-walkmask.png` — 1672×941 ขนาดเท่า `img/frontier-route/zone3-4-v1.webp` ขาว = เดินได้ · **ผืนเดียว** 107,353 px
  ถอดจาก `input/Map-Zone3-3.jpg` (คุณเป้ทาแดง = เดินไม่ได้) · กิ่งทางที่ขึ้นไปด้านบนกลางภาพ **ถูกทาแดง = ปิด ไม่ใช่ทางเดิน**
- `border34-trees.json` — 28 ต้น พิกัดโคนต้น 0–1 ของภาพพื้นหลัง: `white` 16 (ต้นสน/หิมะ ฝั่งซ้าย), `teal` 11 (ต้นสนเขียว กลางภาพ), `purple` 1 (#7 ใกล้ลานล่าง ฝั่งไซเบอร์)
  #26–28 เติมเองจากเส้นจาง · #11, #25 โคนตกบนทาง ถูกดันออกขอบทาง (`moved_from`)
- `border34-walk-overlay.jpg`, `border34-trees-preview.jpg` — ภาพตรวจ · `border34-meta.json` — hash ต้นฉบับ/วิธีถอด

## ขั้นตอน
1. ทำตามแบบ C6 ชายแดน 2–3 (`asia:west` ใน `src/route-geometry.js`: `BORDER23_MASK`, `BORDER23_CORRIDOR`, `checkpointVertex`) — แปลง mask เป็น run-length ตามรูปแบบเดิม, วาง corridor/centerline ให้อยู่ใน mask ทุกช่วง, จุด checkpoint 3 จุด (`foes:[10,11,12]`) บนทาง, จุดเริ่ม = ลานประตูซ้ายบน (ฝั่ง west) จุดจบ = ลานขวาล่าง (ฝั่ง cyberhell)
2. ต้นไม้: `ambient.trees` + `treeArt` ตามแบบ `th:asia` — `white` → `img/theme-v4/town-tree-snow-th-v1.webp` (ต้นสนหิมะที่ใช้ใน C5), `teal` → `img/frontier-route/tree-pine-v2.png`,
   `purple` → เลือกต้นไม้ไซเบอร์ที่มีอยู่ (`town-tree-*-cyberhell-v1.webp`) ถ้าไม่เข้ากับฉาก **วาดใหม่** 1 ต้น (ต้นไม้คริสตัลม่วง เข้ากับแสงนีออนม่วง/ฟ้าในภาพ พื้นโปร่งใส) · ขนาด/สี/โคนต้นกลืนกับภาพ (แบบ C1: grounded roots, palette match)
3. `enabled:true` · ไม่สร้าง bossCave/captainCave ใหม่ (งานย้ายบอสโซน 3 ยังพัก)
4. เอฟเฟกต์ L3 ของชายแดนนี้ (หิมะฝั่งซ้าย, น้ำตก) ทำแบบ `asia:west` ได้ถ้าเหลือเวลา ไม่บังคับ

## ข้อห้าม
- ห้ามเปิดทางนอก mask หรือเชื่อมข้ามพื้นที่แดง · ห้ามแก้ route อื่น
- ไม่แก้ภาพพื้นหลัง · bump `?v=` เฉพาะไฟล์ที่แก้

## เกณฑ์รับงาน
1. เดินจากประตูซ้ายบนถึงลานขวาล่างได้จริง (native renderer) ผ่าน checkpoint ครบ 3 จุด · เดินออกนอก mask ไม่ได้ (ทดสอบขอบอย่างน้อย 5 จุด รวมปากกิ่งทางที่ปิด)
2. ภาพต้นไม้ 28 ต้นตรงตำแหน่ง preview · ไม่บังทาง/ตัวละคร (occlusion ถูก)
3. เทสต์: mask ผืนเดียว, centerline อยู่ใน mask, ต้นไม้ 28 ต้นนอก mask · `node --test tests/*.test.mjs` 0 fail
4. ภาพ desktop + 390×844 · console ว่าง · หลักฐานใน `output/coordination/2026-10-28-b34-border34/`
