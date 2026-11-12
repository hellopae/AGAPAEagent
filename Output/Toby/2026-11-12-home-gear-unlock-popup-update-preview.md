# AVEGEE: Home gear unlock popup + ?update=preview (12 Nov 2569)

## สิ่งที่ build
1. **บั๊กเฟืองหน้า Home** — สาเหตุ: บน Home `g` คือเกมเปล่าที่ยังไม่ได้เลือกสล็อต ทุกกล่องที่ปิดบน Home (ตั้งค่า, เมนูสล็อต ฯลฯ) ยิง `dlg 'close'` -> `g.onChange()` -> `g.syncDiscoveries()` ใส่ `power:roar` (พลังตั้งต้น) เข้าคิว -> `openDiscovery()` เด้ง "✨ ได้พลังใหม่ · ตวาดข่มขู่". ไม่เกี่ยวกับเซฟของคุณเป้ (Home ไม่เคยโหลดเซฟ). แก้: `g.onChange` และ `openDiscovery` return ทันทีถ้า `!started` ; แจ้งพลังใหม่เด้งหลังกด START/เข้าสล็อตเท่านั้น (ทดสอบแล้วยังเด้งตอนเล่น).
2. **`?update=preview`** — แสดงแถบ Home / ไอคอนในเกม แม้เวอร์ชันตรงกัน (หรือ dev ที่ไม่ได้ stamp) · ไม่ latch `watch.stale`, ไม่ reload ตอนกด, ไม่เก็บค่าไว้ที่ไหน (อ่านจาก URL ตอน mount) · ถ้ามีเวอร์ชันใหม่จริงทำงานปกติ (กดแล้ว reload).

## ไฟล์ที่แตะ
src/ui.js, src/version-check.js, index.html (cache-bust `-homegate`), tests/home-no-unlock-popup.test.mjs (ใหม่), tests/update-banner.test.mjs, tests ที่ต้องตาม (acquisitions29a, asset-preload: sandbox ใส่ `started:true`; battle-fx-1110, fb-ui-1110, ko-crew, perf-1110, quest-rewards, z1-fx5: regex รับ `-homegate`), scripts/home-gear-update-preview-check.py, docs/art-reviews/2026-11-12-home-gear-update-preview/ (ภาพ 390/1792).

## วิธีรัน/ทดสอบเอง
- `node --test tests/*.test.mjs` -> 2104 ผ่าน 0 ล้ม
- เบราว์เซอร์: serve root แล้ว `python3 scripts/home-gear-update-preview-check.py`
- ดูเอง: เปิดเว็บหลัง deploy -> หน้า Home กดเฟือง -> ปิด: ต้องไม่มีกล่องตวาดข่มขู่ · เปิด `https://hellopae.github.io/AVEGEE/?update=preview` -> เห็นแถบ "มีเวอร์ชันใหม่" บน Home, กดแล้วไม่ reload

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มี

## สิ่งที่ยังไม่ทำ
ไม่ได้ merge main (คุณเป้ merge เอง). ไม่แตะโฟลเดอร์ AVEGEE หลัก/LaunchAgent.
