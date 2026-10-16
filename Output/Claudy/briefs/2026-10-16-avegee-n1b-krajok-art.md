# ใบงาน N1b: AVEGEE — ภาพห้องหอส่องกรรม: ลบลูกแก้วจากพื้นหลัง + วาดกระจกวิเศษ · suffix `-n1b`

## บริบท
- คุณเป้: จุดวางกระจกด้านบนมีลูกกลมวางอยู่แล้ว ให้เอาออก — กด "วางกระจก" ค่อยมีกระจกวิเศษมาวาง
- Toby N1 ทำระบบเสร็จ (branch `toby/n1-harbour-krajok`) แต่ลูกแก้วถูก**วาดอยู่ในภาพพื้นหลัง** ลบด้วยโค้ดไม่ได้ · ตอนนี้กระจกวิเศษใช้ภาพแทนชั่วคราว `img/krajok-magic-mirror.png` (สำเนา item-mirror)
- สเปกจาก Toby: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-16-avegee-n1-harbour-krajok.md` หัวข้อ "สเปกภาพที่ต้องวาด"
- ภาพที่คุณเป้วง: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-16-avegee-n/n10-krajok-mirror-room.jpg`
- repo `/Users/agapae/agapae-work/AVEGEE` (worktree ของ run นี้ — wrapper จะ commit + push branch ให้เอง)

## งาน
A. **พื้นหลังไม่มีลูกแก้ว** — ขนาดพิกเซลเท่าเดิมเป๊ะ เหมือนเดิมทุกพิกเซลยกเว้นบริเวณลูกแก้ว (inpaint เฉพาะจุด + composite ด้วยมาสก์ feather) เหลือฐานดอกบัวว่างที่ดูสมจริง
   - `img/rooms-wide/th-krajok.webp` 1717×916 (**จำเป็น** ลูกแก้วราว x≈.50 y≈.245)
   - `img/rooms-wide/asia-krajok.webp` 1716×917 และ `img/rooms-wide/cyberhell-krajok.webp` 1716×917 (ถ้ามีลูกแก้วแบบเดียวกัน)
   - `west-krajok.webp` ไม่มีลูกกลม ไม่ต้องแก้
   - ทับชื่อไฟล์เดิม (รูปแบบ/คุณภาพ webp ใกล้เดิม)
B. **`img/krajok-magic-mirror.png`** RGBA 512×512 พื้นโปร่ง 1 เฟรม — กระจกวิเศษลายไทย (กรอบทองแกะสลัก กระจกเรืองแสงสะท้อนวิญญาณจางๆ) มุมหน้าตรงเอียงเล็กน้อย เข้ากับสไตล์ห้อง **ก้นกระจกชิดขอบล่างกึ่งกลางภาพ** (ตั้งบนฐานดอกบัว) · ทับไฟล์ตัวแทนเดิม
- ภาพตรวจ `output/n1b/`: diff map ของพื้นหลัง (ต่างเฉพาะจุดลูกแก้ว) + composite กระจกวิเศษวางบนฐานดอกบัวในพื้นหลังใหม่ (th) + prompts

## ข้อห้าม
ห้ามแก้โค้ด/ส่วนอื่นของภาพ · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ไม่ต้อง commit/push เอง (wrapper ทำ)

## เกณฑ์รับงาน
ไฟล์ขนาดตรง · diff เฉพาะจุด · กระจกวางแล้วฐานแตะดอกบัวพอดี · prompt จริง
