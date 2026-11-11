# ใบงาน Toby — เสียบพื้น HD v7 โซน 1 เข้าเกม (เตรียม merge main) · 12 พ.ย. 2569

## บริบท
- คุณเป้: push main เมื่อพื้นโซน 1 เสร็จ (memory avegee-merge-after-zone1) — ลำดับ: เสียบพื้น → Dale รีวิว → merge
- พื้น v7 ที่ประกอบแล้ว (20 chunk 2×, 9830×6554, 13 ส่วน HD + 7 จุดยัง fallback v5 ขยาย): `~/agapae-work/.codex-worktrees/20261110T115811Z-6ad6e037/docs/art-reviews/2026-11-05-z1-v5-hd-assemble/v7/` + README/inventory/structure.json
- Codex กำลังซ่อม 7 จุดนั้น (คิว `Output/Codex/runs/avegee-resume-20261111.log`, ขั้น Z1-HD-REPAIR-1..2 แล้ว Z1-HD-ASSEMBLE ใหม่ ส่งออก `2026-11-11-z1-v7-hd-assemble`) — **ยังไม่เสร็จ**: ทำให้เกมโหลดชุดใดชุดหนึ่งได้ด้วยการเปลี่ยนไฟล์/ค่าเดียว
- ตอนนี้เกมใช้ `v7-partial` (5 ชิ้น HD ต่อ v5 → เห็นรอยต่อแนวตั้งโซน 1 ที่คุณเป้เคยถาม)

## ที่ทำงาน
worktree `~/agapae-work/.toby-worktrees/z1-v5` branch `claude/2026-11-05-zone1-v5-fx` (ต่อจาก 3aea923e)

## ขั้นตอน
1. คัดลอก v7 เข้า `img/map-zone1/v7/` (webp ตามขนาด/ชื่อที่ `src/zone-skin.js`/terrain loader ใช้) · ตรวจขนาดไฟล์รวมเหมาะกับเว็บ (บีบ webp ถ้าจำเป็น ไม่เสียความคมที่ซูมเกม)
2. ชี้เกมไปที่ v7 แทน v7-partial · ตรวจ walkmask/ลาน/บันได/สะพานตรง (structure ≤ 5 px ยอมรับได้ ตามที่คุณเป้ให้ตัดสินด้วยตา) · ชั้นของเหลว (เฟรมเดิม + shader `?fluid=shader`) และเมฆยังตรงตำแหน่ง
3. ทำสคริปต์/ขั้นตอน 1 คำสั่งสำหรับ "เปลี่ยนเป็นชุดซ่อมใหม่" เมื่อ Codex ส่ง `2026-11-11-z1-v7-hd-assemble` (README ในรายงาน)
4. ภาพเทียบ v7-partial | v7 ที่จุดรอยต่อเดิม + 3 มุมทั่วแผนที่ · fps เมืองเดินทั้งสองโหมดกราฟิก (ไม่ต่ำกว่าเดิมเกิน 2) · เทสต์ทั้งหมดผ่าน
5. ลบชุด v7-partial ออกจากเกมถ้าไม่ใช้แล้ว (ลดขนาด repo) — เก็บไว้ได้ถ้าเทสต์อ้าง
## ข้อห้าม
ห้าม merge/push main (Dale รีวิวก่อน) · ห้ามแตะ `Documents/Work PAE/Claude/AVEGEE`, `~/agapae-work/AVEGEE`, LaunchAgent `com.agapae.avegee-*` · อ่าน `.codex-worktrees` ได้ ห้ามเขียน · ห้าม kill 8942
· หลักฐานใน `Output/Toby/` เก็บ ≤ 20 MB (ภาพดิบใหญ่ไม่ต้อง commit)
## ส่งงาน
`Output/Toby/2026-11-12-avegee-z1-v7-ground.md` (ไทย): ไฟล์ที่เปลี่ยน, ภาพเทียบ, fps, ขนาดดาวน์โหลดก่อน/หลัง, วิธีเปลี่ยนเป็นชุดซ่อม, commit, ผลเทสต์
## เกณฑ์รับงาน
1. เกมใช้พื้น v7 ทั้งแผนที่ ไม่เห็นรอยต่อแนวตั้งเดิม 2. walkmask/ชั้น effect ตรง · fps ไม่ตก · เทสต์ผ่าน 3. เปลี่ยนเป็นชุดซ่อมได้ด้วยคำสั่งเดียว
