# CAVE-12 — ตรวจพบตรรกะซ้อน หยุดก่อนแก้ตามใบงาน

ตรวจบน local main `6f2328b8`; branch `codex/2026-11-01-cave12-audit` มีเฉพาะ handoff ไม่มีการเปลี่ยนภาพหรือพฤติกรรมเกม

ใบงาน `Output/Claudy/briefs/2026-11-01-avegee-codex-queue.md` หมวด CAVE-12 กำหนด: “ก่อนแก้ อ่าน src/frontier.js:106-128 ... ถ้าตรรกะชนให้หยุดแล้วรายงาน ห้ามเดา”

## หลักฐานที่พบ

1. แผนที่ `zone1-2-v6.webp` มีปากถ้ำตามภาพอ้างอิงอยู่แล้ว ดู current-map.png จึงไม่ควรวาดทับก่อนแยกบทบาทให้ชัด
2. `src/route-geometry.js:49` ให้ bossCave ของ th:asia อยู่ checkpoint 2 และใช้ eventKey thBorderBoss
3. `src/data.js:1912` thBorderBoss เป็น **ยมราชพี่ใหญ่/zone-boss** ศึกเนื้อเรื่องปลดล็อกโซน2 ไม่ใช่ boss-frontier-th ที่อยู่ใน frontierBreach ระลอก2
4. `src/frontier.js:127-128` ซ่อน challenge/released NPC โซนไทยในฉาก frontier เพราะคาดว่าไปอยู่ถ้ำแล้ว
5. `src/game.js:2979-2983` จุดคุยบอสชายแดนโซนไทยผูกกับ bossCave checkpoint เดียวกัน; `src/dungeon-view.js:354,434-445` ใช้จุด dungeonGuideAnchor เดียวกันทั้ง guide ของพี่ใหญ่และ challenge ของ boss-frontier-th โดยสลับตามช่วงเรื่อง
6. การย้าย bossCave ตามคำว่า “บอสชายแดน” โดยตรงจะย้ายศึกพี่ใหญ่/guide ไปด้วย และอาจกระทบ checkpoint gate, คำเชิญนำทาง, การกลับศาลและเซฟเก่า

## ข้อเสนอสำหรับตัดสินก่อนเริ่มใหม่

แยก **captainCave** ของ boss-frontier-th ออกจาก **bossCave** ของยมราชพี่ใหญ่ โดยใช้ข้อมูลจำเพาะแบบ asia:west เป็นแนวทาง แต่ห้ามให้ captainCave branch กลืน bossCave branch ใน challengeCanTalk และห้ามวาดสอง NPC ซ้อนจุดเดียวกัน

ต้องกำหนดให้ชัดก่อนว่าปากถ้ำในภาพที่วงไว้เป็นถ้ำของใคร และพี่ใหญ่จะยืนที่ไหนหลังแยก หากคงตำแหน่งเดียวกันต้องนิยามลำดับเข้าถ้ำ/การพบ NPC แยกตามช่วงเรื่องอย่างชัดเจนแทนการย้ายโดยเดา

ยังไม่เปลี่ยน mask/ภาพ/อีเวนต์ จึงยังไม่มีการเทรซหอสะพานทองใหม่ ไม่มีการอ้างว่างานถ้ำเสร็จแล้ว

## ตรวจสอบ

เทสต์เดิม `b12-border-pilot`, `frontier-cave-progression`, `b5b-captain-cave` ผ่านครบ 11/11, 0 fail (tests.log): เส้นทางและ checkpoint, story cave/guide/farewell, load old save, และถ้ำหัวหน้าโซน2ยังแยกจากบอสเนื้อเรื่องตามเดิม
Full suite ล่าสุดของฐานนี้ผ่านในงานอาร์ตที่มีแต่ภาพ/registry; auditนี้ไม่แก้ runtime จึงไม่รัน full ซ้ำ
