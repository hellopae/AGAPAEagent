# Dale — รีวิว + merge 29E (AVEGEE)

ผล: **PASS** (แก้เองจุดเล็ก 1 จุดก่อน merge) · commit บน main: `0f87f71` (push แล้ว, ff-merge จาก d3b0974)
Live: https://hellopae.github.io/AVEGEE/ (ยืนยันว่า i18n ใหม่ขึ้น, HTTP 200, ไม่มี pageerror)

## ผลตามเกณฑ์
1. **ข้อความแนะนำห้องสอบสวน** — ผ่าน. ทดสอบในเบราว์เซอร์จริง (Chromium/Playwright) 1280x800 และ 390x844 สัมผัส, TH+EN:
   เข้าโซน 2 ใหม่ (สถานี sala+tarang) → เปิดห้องสอบสวน → วง "ที่ไหน" แสดงข้อความ อ่านรู้เรื่อง ตัดบรรทัดไม่กลางคำ
   ทำตามแล้วไปต่อได้: กด "ขังไว้ก่อน" ได้ (held=1, ห้องปิด); ส่วนสร้างสถานี/ปล่อยตัว ครอบด้วยเทสต์กลไกจริง
   ข้อสังเกตเล็ก (ไม่บล็อก): บนจอกว้างป๊อปอัปข้อความทับแผงสำนวนด้านขวาชั่วคราวตอนเปิดวง
2. **หน้าต่างเตือน event** — ผ่าน หลังแก้เอง 1 จุด. ไม่มี pause/✕ เหลือ; ปุ่มปิดเดียว
   - จุดที่แก้: `frontierBreach` และ event ชายแดนของโซน 2–4 ของ Codex เหลือ "ปิด" + "รับทราบ" ที่ทำสิ่งเดียวกัน (ซ้ำ)
     → เพิ่มพารามิเตอร์ `ackOnly` ใน `openEventAlert` ให้เหลือปุ่ม "รับทราบ" ปุ่มเดียว (ปิดได้) · event ที่มีปุ่มต่อสู้ (prisonBreak) ยังมี "ปิด" + ปุ่มเริ่ม
   - ยืนยันในเบราว์เซอร์ 2 ขนาด TH/EN: ปุ่มกดรับทราบปิดได้, prisonBreak กด "ออกไปปราบ" เริ่มฉากสู้ได้
3. **เทสต์/ตรวจโค้ด** — `node --test tests/*.test.mjs` 272/272 (ก่อนและหลังแก้, หลัง merge บน main), `node --check src/*.js`, `git diff --check` ผ่าน · live ไม่หน้าขาว

## ขอบเขต
diff อยู่ใน index.html, src/command-wheel.css, src/i18n.js, src/ui.js, tests/ui29e.test.mjs, output/Toby/2026-10-03-avegee-29e.md ไม่แตะ img/, Exam/, files/, ไม่รัน make-manifest.py ไม่เปลี่ยนสมดุล · ไม่ต้อง bump cache (ไม่ได้แตะ manifest)
ลบ worktree + branch `codex/20261003T143050Z-d9aa9b96` แล้ว · worktree/branch 29F (`...feb2dab7`) และ bd718f54/1bd6e7be ไม่ถูกแตะ

## ภาพ
`Output/Dale/29e-shots/` — desk-th-3-where, mob-th-3-where (ข้อความแนะนำ), desk-th-4-alert, mob-en-4-alert (หน้าต่างเตือน)

## Roll back
`cd AVEGEE && git revert 0f87f71 && git push origin main` (commit เดียว ย้อนได้ทั้งชุด)
