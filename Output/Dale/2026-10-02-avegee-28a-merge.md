# AVEGEE 28A — รีวิว + merge (สถานะ: เสร็จ merge + push + live 200)

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

## ผล merge (อัปเดตหลังคุณเป้อนุญาตย้ายไฟล์)
- ย้าย (mv) ไฟล์ untracked 8 ไฟล์ที่ชน (เหมือน branch ทุกไบต์) ไปสำรองที่ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE-untracked-backup/<path เดิม>` แล้ว merge
- **Merge commit `91890d4`** (--no-ff, ไม่มี conflict, hotfix `5b14bb4` คงอยู่: `String(f.sp ?? '').startsWith`)
- **`163eb92`**: เติม 8 รายการภาพ cutscene ลง `img/manifest.json` ด้วยมือ (th 2 ไฟล์ใน rest, โซนอื่น 6 ไฟล์ใน zones) · ตรวจแล้วทุกรายการใน manifest มีไฟล์จริง
- push `25b86a9..163eb92` main
- เทสต์บน main: `node --test tests/*.test.mjs` = **192/192 ผ่าน** (fail 0) · `node --check src/*.js` ผ่าน · `git diff --check` สะอาด
- live (https://hellopae.github.io/AVEGEE/): ภาพ cutscene 8 ไฟล์ตอบ **200** ทั้งหมด (Pages deploy ใช้ ~2 นาที) · manifest live มีรายการใหม่
- ไม่ได้ทดสอบบนมือถือจริง/ไม่ได้เล่นผ่านหน้า live ด้วยเบราว์เซอร์ (อาศัยภาพจาก Toby)

## วิธีตรวจ (Chris/คุณเป้)
ตามหัวข้อ "Kittanate ลองกด" ในรายงาน Toby `Output/Toby/2026-10-02-avegee-28a.md`

## Rollback
`git revert -m 1 91890d4` แล้ว revert `163eb92` (ภาพ 8 ไฟล์สำรองอยู่ใน AVEGEE-untracked-backup ถ้าต้องการคืนเป็น untracked)
