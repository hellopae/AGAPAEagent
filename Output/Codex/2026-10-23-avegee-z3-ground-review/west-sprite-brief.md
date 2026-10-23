# ใบงานเตรียม Z3-SPRITES — โซนปัจฉิม

สถานะ: เตรียมข้อกำหนด ยังไม่เริ่มวาดหรือแก้เกม งานนี้เริ่มต่อหลัง B1 → Z2-ART → Z3-GROUND → B3 ตาม handoff

## คำยืนยันคุณเป้ในแชต Codex 23 ต.ค.
เจ้าของให้เลือกชนิดต้นไม้ตามความเหมาะสมของแผนที่โซน3 และสถานที่ลงทัณฑ์ใกล้แต่ละจุด ต้องการภาพต้นไม้มีมิติเด่นจากแผนที่และโทนสีเข้าชุด ไม่ได้บังคับชนิดตามสีเส้นในภาพ

## ฐานและขอบเขต
- แม่แบบ: `Output/Claudy/briefs/2026-10-23-avegee-z2-art-cjk.md`
- ธีมตะวันตก/โกธิค/หิมะ: หินฟ้าเทา เหล็กดำ น้ำแข็ง ไม้สีเย็น แสงหน้าต่างอุ่นพออ่านรูปทรง; ไม่ใช้หลังคาไทย/จีน/ญี่ปุ่น
- ทุกชิ้นใน PLANNED_ART(west,map-zone3), facadeสถานี4, สนหิมะ/ต้นแห้ง รวมlandmarkตามตารางจริง
- ไม่เปลี่ยนlayout/gameplay ขณะทำภาพ; ขนาดcanvas/จุดฐานเท่าตัวอ้างอิงและแยกเวอร์ชันไฟล์
- ต้นไม้เลือกให้สัมพันธ์สถานที่ลงทัณฑ์: สน/cedarมีหิมะ, ต้นหนาม/ไม้แห้งเกาะน้ำแข็ง, พุ่มฟ้าเทา; ใช้rim light/เงาและAOให้แยกจากพื้น คุมhueฟ้าเทา–ขาวเดียวกับพื้น
- รักษาจุดโคนตามMap-Zone3-1.jpg; รูปนี้เป็นตำแหน่งต้นไม้ ไม่ใช่walkmask ไม่ต้องถามความหมายสีต้นไม้ซ้ำ
- ต้องขอtransparent alphaจริงจากimagegen; ไม่มีข้อความ/ลายน้ำ/กางเขน/รูปเคารพ
- หลังปรับขนาดต้องดูภาพเก่า|ใหม่ที่scaleเดียวกันและcompositeจริง ห้ามรับเฉพาะcanvas/anchorว่าถูกแล้ว; ระวังalphaต่ำทำspriteหดแบบZ2เดิม

## เกณฑ์รับงาน
ครบinventoryและทุกไฟล์เปิดได้; canvas/baseตรงและภาพอ่านชัดที่scaleเกม; สไตล์เข้าพื้นzone3และมีมิติ; alphaสะอาด; compositeพร้อมREADME/promptและข้อจำกัด

## ก่อนเปิดโซน
ตรวจmaskเดินของเจ้าของแยกจากภาพต้นไม้; ยังไม่พบwest-mask-layer-edited.png; ไม่เปิดskinเพียงเพราะมีspriteครบ


## Owner walk mask received — 23 October 2026

Owner supplied Map-Zone3-2.jpg (2500×1667). Registered and extracted data, source and QA are in `../2026-10-23-avegee-z3-mask-review/`. See README.md. Navigation has one connected component and preserves the small blocked reserves. This supersedes the missing-mask dependency. Runtime activation remains after the existing queue and sprite integration; no other zone mask or route is changed.
