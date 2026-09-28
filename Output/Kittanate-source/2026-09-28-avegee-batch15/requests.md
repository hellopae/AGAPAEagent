# AVEGEE — โจทย์ชุด 15 จากคุณเป้ (28 ก.ย. 2569)

> ต้นฉบับคำสั่ง (ถอดจากแชท ไม่แก้ความหมาย) · ภาพหน้าจอที่อ้างถึงอยู่ในโฟลเดอร์นี้

## 1. UI ใหม่
"ผมปรับ UI ให้ใหม่ โดยปรับอัตราส่วนของรูปตัวละคร สถานที่ ปุ่มต่างๆบนหน้าจอ แต่คงตำแหน่งของแผนที่เดิมไว้
ลองตรวจสอบและปรับให้เข้ากับ ตำแหน่งและขนาดของ UI ใหม่ครับ"

ม็อกอัป (ใน repo AVEGEE):
- `files/UI-th.jpg`, `files/UI-eng.jpg` — หน้าเมนูแรก
- `files/UI3-menu-th.jpg`, `files/UI3-menu-eng.jpg` — ตั้งค่า (จากหน้าเมนูแรก: ปุ่มบันทึกอย่างเดียว)
- `files/UI3-menu-th2.jpg`, `files/UI3-menu-eng2.jpg` — ตั้งค่า (ระหว่างเล่น: บ้าน / เริ่มใหม่ / บันทึก)
- `files/UI2-th.jpg`, `files/UI2-eng.jpg` — แผนที่โซนหลัก + HUD
- `files/Comment7.jpg` — หน้าสอบสวน (เมนูวงกลม)
- `files/Battle5.jpg` — หน้าสู้บอส (เมนูวงกลม)
- ต้นฉบับ Illustrator: `files/UI.ai`, `UI2.ai`, `UI3.ai`, `Comment7.ai`, `Battle5.ai` · ปุ่ม `files/Button.psd`

"และอันนี้คือ ปุ่มและ icon ที่ใช้" — ทั้งหมดใน `img/raw/`:
icon bags.jpeg, icon lock.png, icon skip.png, icon_18+.png, icon_bag.png, icon_change-eng.png, icon_change-th.png,
icon_book.png, icon_close.png, icon_home.png, icon_coin.png, icon_music.png, icon_new-game.png, icon_oepn_court.png,
icon_open_court-th.png, icon_pause.png, icon_play.png, icon_justice.png, icon_restart.png, icon_resume.png,
icon_setting.png, icon_setting2.png, icon_sound.png, icon-save-eng.png, icon-save-th.png, icon_skull.png,
logo-eng.png, logo-th.png

## 2. อัตราส่วนแผนที่
"และผมมีปรับอัตราส่วนของแผนที่ให้ลองดูครับ" — `img/scene-v2.png` (1678×937) และ `img/scene-asia-v2.png` (1527×704)

## 3. ท่าไม้ตายบอส
"และมีเพิ่มท่าไม้ตายของ Boss แต่ละโซนด้วย ช่วยใส่ท่าไม้ตายของบอสให้ใช้ตามความเหมาะสม ความแรงก็เพิ่มขึ้นระดับนึง"
- `img/raw/zone-boss-cutscene.jpeg` (โซน 1 — ยมราชพี่ใหญ่ ดาบไฟ)
- `img/raw/Asia/Boss Zone2-asia-cutscene.jpeg` (โซน 2 — ไฟสีน้ำเงิน)
- `img/raw/West/Boss Zone3-cutscene.jpeg` (โซน 3 — กล่องตราโซ่)
- `img/raw/CyberHell/Boss Zone4-cutscene.jpeg` (โซน 4 — สายฟ้าม่วง)

## 4. แก้ตามรูป
- `44-food-price.png` — "ข้าวปั้นลดราคาหน่อย" (ห่อเสบียง ×2 = 36 เบี้ยกรรม)
- `45-shadow.png` — "เงาดูลอยมาก ตัดออกดีกว่าครับ" (เงาใต้ศาลา/อาคาร)
- `46-forced-restart.png` — "เล่นๆอยู่ ระเบียบยังเต็ม 100 กรรมมีแค่นิดหน่อย แต่เกมขึ้นหน้าต่างนี้ แล้วบังคับให้เริ่มต้นใหม่"
  (หน้าต่าง "ทายาทบัลลังก์" ปุ่ม เปิดแฟ้มของท่าน / เริ่มใหม่)
- `47-construction.png` — "เวลาก่อสร้าง ให้ทัณฑ์ยืนสร้างอยู่ตรงนั้นด้วยครับ แล้วให้สลับรูป `img/crew-taan-work.png` ↔ `img/crew-taan.png`
  เหมือนกำลังทำงานอยู่ครับ จนสร้างเสร็จค่อยเดินไป"
- `50-frontier-gate.png` — "ที่ชายแดน พอเดินไปประตูด้านบน ค่อยมีปุ่ม กลับเข้าแผนที่โซนสุวรรณภูมิ ขึ้น
  และที่ใกล้ๆประตู ให้มี นิรา ยืนอยู่ก็ได้ครับ จะได้จัดทีมใหม่ได้"

## คำตัดสินของคุณเป้ (28 ก.ย. 2569)
1. ขอบเขต: "ทำครบทั้ง 5 หน้าจอเลย ก็ได้ครับ" — ตรงกับใบงานชุด 15 ที่สั่ง Toby ไปแล้ว
2. ภาษาอังกฤษ: "ถ้าแปลเป็นภาษาอังกฤษ มันเยอะมาก ก็ไว้รอบหน้าก็ได้ครับ" — ชุด 15 ทำแค่ UI (ปุ่ม/เมนู/HUD) · แปลเนื้อเรื่อง (สำนวน บทพูด บทนำ) เลื่อนไปชุดถัดไป → Rae แปล + Reese ตรวจ
