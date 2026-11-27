# ใบงาน — FB3-T-WALK ใส่ท่าเดิน 6 ตัว + ฉากเดินเข้า เซเวอริน/อาร์คอน-ศูนย์ · 27 พ.ย. 2569
(ทำหลัง Codex C7 ส่งภาพ `Output/Codex/runs/art-1126-C7-walk.md` · ผู้ทำ Toby หรือ Codex)

## คุณเป้ (ตรงตัว)
"อยากให้วาด Animation Sprite เดิน ให้ตัวละครพวกนี้ด้วย เช่น โซน1 ยมทัต โซน2 เหลียงกัง มูซาชิ โซน 3 Home-67" · "เพิ่ม เซเวอริน (โซน 3) กับอาร์คอน-ศูนย์ (โซน 4)ด้วยครับ / ใช้ชื่อ "เหลียนกัง" ตามในเกมครับ"

## ทำ
1. ลงทะเบียนแผ่นเดินใน `src/crew-walk-assets.js` (รูปแบบเดียวกับ `th:nira` — frames x,y,w,h,ox,oy · `rightFacing` ตาม README ของ C7) — ยมทัต `img/zone-boss-walk-v1.webp` · เหลียนกัง `img/Asia/zone-boss-asia-walk-v1.webp` · มูซาชิ `img/z2-events/char-musashi-asia-walk-v1.webp` · HOME-67 `img/z3-events/char-home67-walk-v1.webp` · เซเวอริน `img/West/zone-boss-west-walk-v1.webp` · อาร์คอน-ศูนย์ `img/CyberHell/zone-boss-cyberhell-walk-v1.webp`
2. ตอนเดิน (`drawStandee(..., walking=true)` ใน `src/art.js` · `scene.js` bossWalk · `dungeon-view.js` guide) ใช้แผ่นเดินแทนภาพนิ่งเด้ง · ไม่มีไฟล์ = ภาพนิ่งเดิม (fallback)
3. ฉากเดินเข้าใหม่: **เซเวอริน** เดินจากประตูชายแดนโซน 3 ไปท่าเรือก่อนฉากเปิดตัว `z3-sev-open` · **อาร์คอน-ศูนย์** เดินจากประตูชายแดนโซน 4 ไปจุดยืนศึกสุดท้าย (`final-event.js`) — แบบเดียวกับ `beginBossWalkIn` (`ui.js`) · เซฟเก่าที่เห็นฉากแล้วไม่เล่นซ้ำ
4. เทสต์ (ลงทะเบียนครบ, fallback, ฉากเดินเข้าครั้งเดียว) · ภาพ/เฟรม `Output/Review/2026-11-27-fb3-twalk/` · เทสต์เต็มรอบ `--test-concurrency=6`

## เกณฑ์รับงาน
1. 6 ตัวเดินด้วยแผ่นเดินจริงทั้งบนแผนที่และเส้นทางชายแดน · 2. เซเวอริน/อาร์คอนมีฉากเดินเข้า · 3. ไม่มีไฟล์ไม่พัง · 4. เทสต์ผ่าน
