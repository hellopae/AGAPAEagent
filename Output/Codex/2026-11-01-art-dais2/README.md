# ART-DAIS2 — รอตรวจรับ

Branch `codex/2026-11-01-art-dais2` จาก main ในเครื่อง `6f2328b8`; ยังไม่commit/push/merge

- วาดแท่นเอเชียใหม่ด้วย built-in imagegen เป็นมุมสูงมองตรงแบบสมมาตร บันไดอยู่กลาง เหมือนโซน1/3/4; ยังเป็นหลังคาหยก เสาแดง ลายทอง และหินแกะสลักแบบเอเชีย
- ไฟล์เดิม `img/theme-v4/town-judgment-asia-v3.webp` 1536×1024 RGBA โปร่งใส
- ฐานแท่นคง [1862,1057], กว้าง307 และคิววิญญาณเดิม ไม่แก้สถานีอื่นหรือ mask
- วัดจุดบนภาพใหม่: บัลลังก์โลก [1862,944]; นิรา home [1938,968], stage [1914,956,1956,982] เป็นพื้นเปิดทางขวา; เปลี่ยนเฉพาะ layout โซนเอเชียแล้วคืนค่าปกติเมื่อย้ายโซน
- ภาพ `asia-before-after.png` และ `four-zone-camera-comparison.png` ถ่ายจาก scene.render จริงบน native canvas พร้อมตัวพญายมและนิรา ไม่ใช่ browser screenshot
- เทสต์เฉพาะทาง120/120 และ full suite1786/1786,0fail; syntax/diff-check ผ่าน
- assertion เก่าที่กำหนดให้บัลลังก์เอเชียเท่าโซน1ถูกปรับให้คุ้มครองสถานี/จุดอื่นเดิม และยืนยันตำแหน่งใหม่+stageนิราเดินได้+คืนค่าโซน1 ส่วนผลรอบแรกเก็บ tests-before-anchor-assertion.log
- ยังรอเจ้าของตรวจใน browserจริง และไม่อ้างผ่าน Reese/Chris

Prompt/specification: repaint East Asian dais to match frontal symmetric elevated camera of TH/West/Cyberhell references, keep jade roof/red lacquer/gold/grey stone identity, centered stairs, rear ceremonial throne, clear right standing floor, no people or text, true transparent1536×1024. Adjusted runtime anchors to measured generated painting rather than claiming exact prompt-coordinate synthesis.
