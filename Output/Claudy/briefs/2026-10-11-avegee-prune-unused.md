# ใบงาน: AVEGEE — ตัดไฟล์ที่เกมไม่ได้ใช้ เพื่อลดขนาด

- วันที่: 11 ต.ค. 2569 · ผู้ทำ: Codex (`--write`) · ผู้ตรวจ: Dale · ฐาน: main ล่าสุด
- คุณเป้: "รอเกมเสร็จจริงก่อนค่อยอัปโหลด itch.io · ใช้ GitHub ไปก่อน · ระหว่างนี้ตัดไฟล์ที่ไม่ได้ใช้ เพื่อลดขนาดไฟล์ลงดูก่อน"
- ตอนนี้: tracked 1,178 ไฟล์ · ไฟล์ที่ไม่ใช่ tests/scripts/docs/output/Exam ราว 912 ไฟล์ ~557 MB (img 807 ไฟล์)
- เป้าในอนาคต: itch.io HTML5 มีเพดาน (ราว 1,000 ไฟล์ / 500 MB หลังแตก zip — **ตรวจจากเอกสาร itch.io ล่าสุดแล้วระบุในรายงาน**)

## ขอบเขต (ทำได้)
โฟลเดอร์ `img/`, `audio/`, `output/`, ไฟล์ทดสอบที่ root (`_walktest.html`, `_depthtest.html`)

## ห้ามแตะ
- `Exam/` และ `docs/` — เป็นภาพอ้างอิง/เอกสารของคุณเป้ (รายงานขนาดแยกไว้ให้คุณเป้ตัดสินเอง)
- `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ห้ามแก้ไฟล์ภาพที่ยังใช้ · ห้าม commit/merge/push (Dale ทำ)

## วิธีหา "ไม่ได้ใช้" (ต้องรัดกุม — ลบผิด = เกมพัง)
1. เขียนสคริปต์สแกนการอ้างอิง (`scripts/find-unused-assets.mjs`) จาก: `index.html`, `src/**/*.js|css`, `img/manifest.json`,
   `img/preload-catalog.json`, ไฟล์ JSON/CSS อื่น, `url(...)` ใน CSS, และ **path ที่ประกอบแบบไดนามิก**
   (template string เช่น `` `img/deva-intro/deva-intro-${zone}-v1-web.mp4` ``, `artUrl('hero-yama-atk')`, ชุด/โซน th/asia/west/cyberhell,
   suffix `-L/-R/-atk/-cry/-v2/-web` ฯลฯ) — ขยาย pattern ไดนามิกเป็นชื่อไฟล์จริงทุกค่าที่เป็นไปได้ ถ้าขยายไม่ได้ ให้ถือว่า**ทุกไฟล์ที่เข้า pattern ยังใช้อยู่**
2. เช็ค branch อื่นด้วย: ไฟล์ที่ถูกอ้างใน `origin/codex-app/2026-10-04` (งาน Codex app ของคุณเป้ที่ยังไม่ merge) ห้ามลบ
3. ไฟล์ที่ `scripts/` ใช้เป็นต้นฉบับ (เช่น `img/cover-v4-full.png` ที่สคริปต์มาสก์ใช้) ห้ามลบ — แต่ใส่รายการ "ต้นฉบับ ไม่ใช่ runtime" แยกไว้ (ใช้ตัดออกตอนทำชุด itch.io ภายหลัง)
4. ลบเฉพาะไฟล์ที่ไม่มีการอ้างอิงเลยทั้ง 3 ข้อ
5. ลบ entry ที่ชี้ไฟล์ที่ลบใน manifest/preload-catalog ถ้ามี (และ regenerate ด้วยสคริปต์เดิมของ repo ถ้ามี)

## เกณฑ์รับงาน
1. รายงาน `REPORT.md` (เขียนที่ `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-11-prune/` path เต็ม ห้ามสร้างโฟลเดอร์ `AGAPAE Agent/` ใน repo เกม):
   ตารางไฟล์ที่ลบ (path, ขนาด, เหตุผลว่าทำไมไม่ใช้ เช่น "ถูกแทนด้วย v3"), ขนาด/จำนวนไฟล์ก่อน-หลัง (runtime เท่านั้น),
   รายการต้นฉบับ non-runtime, ขนาด `Exam/` `docs/` ให้คุณเป้ตัดสิน, เพดาน itch.io ที่ตรวจได้
2. `node --test tests/*.test.mjs` ผ่านหมด (แก้เทสต์ที่อ้างไฟล์ที่ลบเฉพาะกรณีเทสต์นั้นล็อกไฟล์เก่าที่เลิกใช้แล้วจริง)
3. สคริปต์สแกนอยู่ใน `scripts/` ใช้ซ้ำได้
