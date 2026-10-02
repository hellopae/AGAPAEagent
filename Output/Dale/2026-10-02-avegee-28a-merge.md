# AVEGEE 28A — รีวิว + merge (สถานะ: รีวิวผ่าน, merge ยังไม่ได้ทำ — ติดสิทธิ์ลบไฟล์ untracked)

## ผลรีวิว (branch `toby/28a`, commits `b17e58b` + `998e3d4`, ฐาน `f075d79`)
อ่าน diff ครบทุกไฟล์ + ดูภาพก่อน/หลัง — **PASS ทั้ง 7 ข้อ**

| # | ผล | หมายเหตุ |
|---|---|---|
| 1 สถานีใหญ่ขึ้น | ผ่าน | sawan 165→235, ngiw 159→225, krajok 100→150 พร้อมกรอบ hit · ภาพ 1440 ก่อน/หลัง ดูสมสัดส่วน ไม่ชนศาลา/กระทะ |
| 2 โรงน้ำชากลับด้าน | ผ่าน | flip ตอนวาด (art.js) เฉพาะ asia, cache key มี flip, ไม่แก้ไฟล์ภาพ |
| 3 ปุ่มฉากสู้ | ผ่าน | "ลากเข้าสถานี" เหนือหัววิญญาณ (ภาพ 1440) · "กลับไปคุมโซน" กลางล่าง (1440 และ 390) ไม่ทับ HUD/กล่องรางวัล |
| 4 ปุ่มซ่อมล้นจอ | ผ่าน | clampInView + max-width + resize · ภาพ 390 อยู่ในจอ (ที่ซ้อนกันเองมาจากการจุดไฟ 7 สถานีพร้อมกันตอนทดสอบ) |
| 5 ชายแดน | ผ่าน | `returnsToFrontier` + `afterBreachBattle` รอ popup ปิดก่อนเปิด `openFrontierWalk` · ตามที่ Claudy ตัดสิน |
| 6 cutscene path | ผ่าน | game.js ชี้ `img/` จริง · ภาพ 8 ไฟล์ committed · เทสต์แก้แล้ว |
| 7 โปรยบูรพา | ผ่าน | `sub:''` + เช็ค z.sub ทุกจุด UI |

บั๊ก `f.sp?.startsWith` ใน ui.js: diff ของ toby/28a ไม่แตะบรรทัดนั้น จึงไม่ควรชนกับ hotfix `5b14bb4`
ยังไม่ได้ทำ: เติม manifest 8 ไฟล์, เทสต์บน main, push, เช็ค live 200 (ทำหลัง merge)

## ติดอยู่ตรงไหน
`git merge toby/28a --no-ff` ถูกปฏิเสธ: working tree หลักมีไฟล์ **untracked** 8 ไฟล์ชื่อตรงกับภาพ cutscene ที่ branch เพิ่ม
(git ไม่ยอมเขียนทับ)

- `img/Asia/boss-{frontier,tester}-asia-cutscene-asia.png`
- `img/CyberHell/boss-{frontier,tester}-cyberhell-cutscene-cyberhell.png`
- `img/West/boss-{frontier,tester}-west-cutscene-west.png`
- `img/boss-{frontier,tester}-th-cutscene.jpeg`

ตรวจแล้วด้วย `git hash-object`: **ทั้ง 8 ไฟล์เหมือน blob ใน `toby/28a` ทุกไบต์** (Toby คัดลอกจากไฟล์เหล่านี้)
ผมพยายามลบ 8 ไฟล์นี้เพื่อให้ merge สร้างกลับมา แต่ระบบสิทธิ์ปฏิเสธ (ไฟล์ untracked ของคุณเป้) จึงหยุด ไม่ได้อ้อมด้วยวิธีอื่น · ยังไม่มีอะไรถูกแก้ใน repo

## ทางไปต่อ (ต้องให้ Claudy/คุณเป้อนุญาต อย่างใดอย่างหนึ่ง)
1. อนุญาตให้ลบ/ย้าย 8 ไฟล์นี้ (เหมือนกับ branch ทุกไบต์ — merge จะสร้างคืนให้เหมือนเดิม) แล้วผมทำ merge ต่อ, หรือ
2. คุณเป้ลบ/ย้าย 8 ไฟล์นั้นเอง แล้วสั่งผมใหม่
