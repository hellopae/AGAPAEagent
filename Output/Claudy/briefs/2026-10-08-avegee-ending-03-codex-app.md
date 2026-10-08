# ข้อความสั่งงาน Codex app: วาดภาพนิ่ง ending-03 (พ่อยอมรับยมบาทน้อย)

คุณเป้คัดลอกบล็อกข้างล่างไปวางใน Codex app ที่เปิด repo AVEGEE ได้เลย

```
งาน: วาดภาพนิ่งฉากจบใหม่ "พ่อยอมรับยมบาทน้อย" ด้วย built-in ImageGen (ทำแค่ภาพ ไม่แก้โค้ด)

1. อ่าน prompt ฉบับเต็มในหัวข้อ "2. Prompt วาดภาพนิ่ง" ของไฟล์
   /Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-08-avegee-ending-03-father.md
2. แนบภาพอ้างอิงตามลำดับนี้ (ทั้งหมดอยู่ใน img/):
   hero-yama.png, hero-yama-profile.png, hero-boss.png, hero-boss-profile.png,
   crew-nira.png, crew-nira-profile.png, story-ending-02-v3.png, story-ending-01-v4.png
   ห้ามแนบ leader-th-possessed.png (ตาม่วง) และ hero-yama-sit.png (ถ้วยชา)
3. ผลลัพธ์: 16:9 ขนาด 1280×720 เท่ากับ story-ending-02-v3.png เต็มเฟรมไม่มีแถบดำ
   หน้า มือ หนังสือ คทา และปึกกระดาษต้องอยู่ในแถวที่ 89–633
4. บันทึกเป็น img/story-ending-03-v1.png (ห้ามเขียนทับไฟล์เดิม)
5. ตรวจก่อนส่ง:
   - มีตัวละคร 3 ตัวพอดี
   - พ่อตาเรืองส้ม ไม่ใช่ม่วง และไม่มีโซ่
   - มือพ่อวางบนบ่ายมบาทน้อยชัด นิ้วครบ 5 ไม่มีมือหรือแขนเกิน
   - ไม่มีตัวอักษรในภาพ
   - หน้าตาและชุดของทั้งสามตรงกับภาพอ้างอิง
   ถ้าไม่ผ่านให้วาดใหม่ก่อนส่ง
6. ห้ามแก้ src/ และห้ามแตะ Exam/, files/, img/raw/
   ยังไม่ต้องเพิ่ม panel ใน story.js (จะทำหลังได้คลิป Kling)
   ห้าม commit ภาพจนกว่าคุณเป้จะตรวจภาพแล้ว
```

## หลังได้ภาพ
1. ส่งภาพเข้า Kling ด้วย prompt หลักในหัวข้อ 3 ของไฟล์ Mind (ภาพเริ่มต้นอย่างเดียว ยาว 6 วิ หรือ 5 วิในรุ่นเก่า)
2. ได้ภาพนิ่งหรือคลิปแล้วบอก Claudy → Codex (worker) ทำ:
   - เพิ่ม panel `ending-03` ใน `src/story.js` ด้วยข้อความ "ทำได้ดีมากลูกพ่อ"
   - เพิ่ม `CONTENT_ROWS` สำหรับ ending-03
   - ทำให้ panel เล่นคลิปแทนภาพนิ่ง
   แล้ว Dale รีวิว
