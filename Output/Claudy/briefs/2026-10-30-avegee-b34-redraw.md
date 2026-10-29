# B34-REDRAW — วาดชายแดน 3–4 ใหม่ 2 เท่า + ทางกว้าง + ซูม + เอฟเฟกต์ (30 ต.ค. 2569)

Repo: AVEGEE (worktree ของ run นี้ จาก main ล่าสุด) · ห้าม commit/push/merge เอง · bump `?v=` เฉพาะไฟล์ที่แก้ · browser ใน sandbox เปิดไม่ได้ · เทสต์เต็มครั้งเดียวตอนท้าย · **ภาพ: built-in `image_gen` เท่านั้น** ห้าม Shado

## คุณเป้สั่ง 30 ต.ค.
ทำชายแดน 3–4 แบบเดียวกับชายแดน 1–2 ที่ลองเล่นแล้วชอบ ("ทางเดินใหญ่ขึ้นแล้ว ภาพแผนที่ชัดเจนดี") พร้อมแก้ที่คุณเป้ติ: ต้นไม้ sprite ลอย/วางผิดที่ · ต้องมีปุ่มซูมแบบโซน 1 · เอฟเฟกต์เงาเมฆ/ลาวา/น้ำไหล/ใบไม้หล่น
**ต้นแบบวิธีทำ (อ่านก่อน)**: ชายแดน 1–2 — ใบงาน `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-10-29-avegee-border-pilot.md` + `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-10-30-avegee-b12-v3.md` (ภาพ 2 เท่าด้วย tiles + SIFT stitch, เกณฑ์ความกว้างทาง) + `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-10-30-avegee-b12-fx.md` (ไม่มีต้นไม้ลอย, ปุ่มซูม/HUD, เอฟเฟกต์) · โค้ด/หลักฐานของ B12 อยู่บน main แล้ว (`img/frontier-route/zone1-2-v6.webp`, `tests/b12-border-pilot.test.mjs`, `output/coordination/2026-10-30-map-b12-v3/`) — ถ้า B12-FX ยังไม่ merge ให้ทำส่วนซูม/เอฟเฟกต์แบบเดียวกันเอง

## Route `west:cyberhell` — ภาพปัจจุบัน `img/frontier-route/zone3-4-v1.webp`
- ผัง/ทางเดินของคุณเป้ที่ต้องรักษา: mask ของคุณเป้ `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/border34/border34-walkmask.png` (กิ่งทางขึ้นด้านบนกลางภาพ **ปิด**) · B34 `cff18a6` ขึ้นไปแล้ว
- ต้นไม้: คุณเป้วาดตำแหน่ง 28 ต้น (`Output/Claudy/border34/border34-trees.json` + `border34-trees-preview.jpg`: ขาว=สนหิมะ 16, เขียว=สน 11, ม่วง=ต้นคริสตัล 1) → **วาดต้นไม้ลงในภาพใหม่ตรงตำแหน่งนั้น** (ไม่ใช่ sprite ลอย) แล้วเอา sprite เดิมออก

## ขั้นตอน
1. ภาพใหม่ **2 เท่าจริง** (ตรวจด้วย PIL) ผังเดิม (ประตูต้นทาง/ปลายทาง, ด่าน 3 จุด, ถ้ำ/จุดบอส, สะพาน/บันได, น้ำตก) **ทางกว้างขึ้นทุกช่วง**: ที่สเกล 1672 px — p10 ≥ 40, median ≥ 48 (วัด distance transform ตามสันกลาง ใส่ตาราง)
2. walk mask ใหม่จากภาพ ไม่เกินขอบทางที่เห็น · ผืนเดียว · centerline/checkpoint ใน mask · route ผ่านเทสต์แบบ B12
3. ไม่มี sprite ต้นไม้ลอย — ต้นไม้อยู่ในภาพ + occlusion จากภาพ · ปุ่มซูม/HUD ชายแดนแบบโซน 1 · เอฟเฟกต์ตาม biome ของสองฝั่ง (flow field trace ใหม่จากภาพใหม่) + ของเดิม L3/WEATHER ของ route นี้ย้ายตามภาพใหม่
## เกณฑ์รับงาน
1. ภาพ 2 เท่า + ตารางความกว้างผ่านเกณฑ์ + overlay mask
2. route เดินจบได้ทุกด่าน (เทสต์) · ภาพก่อน/หลัง · เทสต์เต็ม 0 fail · `output/coordination/2026-10-30-b34-redraw/`
