# ใบงาน L2b: AVEGEE — ไอคอนโล่ "ป้องกัน" + เครื่องหมาย ❗ ศัตรูเห็นยม · suffix `-l2b`

## บริบท
- L2 (merge แล้ว) ทำปุ่ม "ป้องกัน" มีโล่เหนือหัว/บนการ์ด แต่โล่**วาดด้วยโค้ดชั่วคราว** · L5 ทำศัตรูบนเส้นทางชายแดนขึ้น ❗ แล้วไล่ — ❗ เป็น**ตัวอักษรบน canvas ชั่วคราว**
- รายงาน: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-15-avegee-l2-ui.md` และ `.../2026-10-15-avegee-l5-auto-encounter.md` — ดูว่าตัวแทนอยู่ตรงไหน/สลับไฟล์อย่างไร
- สไตล์: ไอคอน UI เดิมของเกม (ทอง/แดงเลือดหมู ลายไทย พิกเซล-กึ่งวาด) เช่น `img/ui/` ปุ่ม pause/ตั้งค่า, ไอคอนไอเท็มในร้าน — เปิดดูก่อน
- repo `/Users/agapae/agapae-work/AVEGEE` (worktree ของ run นี้ ฐาน main ล่าสุด)

## งาน
1. `img/ui/icon-defend-shield.png` 128×128 RGBA พื้นโปร่ง หน้าตรง — โล่ทองลายไทย ขอบเข้ม อ่านออกที่ขนาด 24–40px
2. `img/ui/alert-mark.png` 64×64 RGBA พื้นโปร่ง — เครื่องหมาย ! สไตล์เกม (แดง/ทอง มีขอบดำ) อ่านออกบนพื้นดันเจี้ยนทุกโซน
3. สลับตัวแทนในโค้ดให้ใช้ไฟล์ (ตามที่รายงาน Toby บอก) · manifest/preload · cache-bust `-l2b` · `node --test tests/*.test.mjs` ไม่มีแดงเพิ่มจากฐาน (main มีแดงเดิมจากงาน Codex app อยู่ ~10 ข้อ — ดู `Output/Claudy/briefs/2026-10-15-avegee-codex-app-test-failures.md`)

## ข้อห้าม
ห้ามแตะ animation ยม, `town-*`, แผนที่ · ห้าม commit/merge/push · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · หลักฐานใน `output/l2b/` (Dale ลบก่อน merge)

## เกณฑ์รับงาน
contact sheet 2 ไอคอนที่ขนาดจริง (128/40/24 และ 64/32) + composite บนฉากต่อสู้/ดันเจี้ยน (PIL ได้) · prompt จริง · เทสต์
