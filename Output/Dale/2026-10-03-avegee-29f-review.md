# Dale review 29F-R — AVEGEE (ภาพห้องโซน 3–4 + คัตซีนยมทูตโซน 2–4)

**ผล: PASS** (ไม่มี FIX LIST)

## Commit บน main (hellopae/AVEGEE, push แล้ว)
- `29f5a76` 29F: ภาพห้อง 7 ใบ + คัตซีน 18 ใบ (Codex run `20261003T143050Z-feb2dab7` rebase บน main `0f87f71` แล้ว fast-forward ไม่ชน)
- `e1d2554` bump manifest cache เป็น `?v=20261003-29f-art` ใน `src/art.js` (จุดเล็ก Dale แก้เอง — Codex ไม่ได้ bump)
- ลบ worktree + branch `codex/20261003T143050Z-feb2dab7` แล้ว · worktree เก่า `120313Z`/`120317Z` ไม่แตะ

## Diff vs ข้อห้าม
- ไฟล์ที่แก้โค้ดมีแค่ `src/zone-introductions.js` (เปลี่ยน string path `*-cutscene-<zone>.png` → `*-cutscene.jpeg`), `img/manifest.json` (แก้มือ, ไม่ได้รัน make-manifest, critical/rest/boxes/stationSizes ไม่เปลี่ยน), เทสต์ 3 ไฟล์ (ใหม่ 1)
- ไม่แตะ `img/raw/`, `Exam/`, `files/`, `CONCEPT.md`, untracked อื่นใน `output/`
- PNG คัตซีนเก่า 18 ใบถูกลบ (แทนด้วย JPEG) — ไม่มีโค้ด/เทสต์อ้างถึง path เก่าเหลือ

## ผลตามเกณฑ์รับงาน
1. **ห้อง 7 ห้อง — ผ่าน**
   - เบราว์เซอร์จริง (Chromium, 1280×800 และ 390×844 สัมผัส) เปิดห้อง sala/tarang/krajok/sawan ใน west และ tarang/krajok/sawan ใน cyberhell: `artUrl` ชี้ไฟล์โซนใหม่ทั้ง 7 (เช่น `img/West/BG-Sala-west.webp`) ไม่ตกไปใช้ภาพโซน 1, canvas ขึ้นปกติ, ปุ่ม "ออกไปแผนที่" ขึ้น
   - สัดส่วน: เทสต์ใหม่ยืนยัน 1024 กว้าง ความสูงตรงอัตราส่วนห้องโซน 1 ชื่อเดียวกัน, ทึบทั้งใบ
   - จุดเกิด/นั่ง/ปุ่ม act/ปุ่มออก: จากภาพก่อน/หลังและภาพจากเกมจริง จุดตรงบันได/ประตูในภาพใหม่ ไม่ต้องปรับพิกัด (องค์ประกอบภาพเหมือนโซน 1 แค่เปลี่ยนธีม) — ไม่ได้เพิ่ม config โซน
   - ตรวจด้วยตา: สไตล์พิกเซลเข้ากับเกม ไม่มีตัวหนังสือ/ลายน้ำ/UI ปลอม (west = น้ำแข็ง+แดง, cyberhell = ม่วง/ฟ้านีออน)
2. **คัตซีนยมทูตโซน 2–4 — ผ่าน**
   - เรียก `playActionCutscene('crew:<k>')` ครบ 6 ตัว x 3 โซน (asia/west/cyberhell) + th เทียบ: โหลดไฟล์ regional JPEG ถูกทุกใบ, ธรรมชาติ 1375×768, ไม่มี 404
   - desktop: ภาพเต็มกรอบ ไม่ตกขอบ (contain) — ขนาด/สัดส่วนเท่าคัตซีนโซน 1 เป๊ะ (ผ่าน `fitCutsceneImage` เดิม)
   - ตรวจด้วยตา 18 ใบ (ภาพเปรียบเทียบ): พื้นทึบเต็มเฟรม ตัวละครตรงตัวเดิม ไม่มีตัวหนังสือ
3. **เทสต์/live — ผ่าน**
   - `node --test tests/*.test.mjs` = **275/275** pass, `node --check src/*.js` ผ่าน, `git diff --check` สะอาด (หมายเหตุ: `node --test tests/` เปล่าๆ ล้มเพราะรับ dir — ต้องใช้ glob)
   - Live https://hellopae.github.io/AVEGEE/ : หน้าเปิด `window.G` มี ไม่มี pageerror · `BG-Sala-west.webp`, `BG-Sawan-cyberhell.webp`, `crew-guard-west-cutscene.jpeg`, `crew-taan-asia-cutscene.jpeg`, `manifest.json?v=20261003-29f-art` ตอบ 200 และ manifest ที่เสิร์ฟมีรายการใหม่
   - 404 ที่เหลือ (`audio/bgm-*.ogg`, `img/hero-yama-side.png`) มีอยู่ก่อนงานนี้ ไม่เกี่ยวกับ 29F

## ข้อสังเกต (ไม่ใช่ FIX)
- มือถือแนวตั้ง (390×844) คัตซีนยมทูตเป็นแถบกลางจอ มีขอบดำบน-ล่าง เหมือนคัตซีนโซน 1 ทุกประการ (พฤติกรรม contain เดิมของ `.crew-cut`) — ถ้าคุณเป้อยากให้เต็มจอแนวตั้งต้องเป็นงาน UI แยก
- รันเบราว์เซอร์ผมฉีดโค้ด `window.__openStation/__cut` ผ่าน route ใน Playwright เท่านั้น ไม่มีอะไรเข้า repo
- `output/Toby/29f/` หนัก ~3.3 MB (ภาพเปรียบเทียบเป็นหลัก) — ปล่อยไว้ตามที่ Codex ส่ง; `browser.txt` ในนั้นคือ log ที่ Chromium เปิดไม่ได้ใน sandbox ของ Codex (ล้าสมัยแล้ว ผมตรวจซ้ำเองนอก sandbox)

## Roll back
`git -C AVEGEE revert e1d2554 29f5a76 && git push origin main` (ได้ PNG คัตซีนเก่า + ห้องโซน 3–4 กลับไปใช้ภาพโซน 1, manifest เดิม)

## ภาพที่คุณเป้ควรดูเอง
- `AVEGEE/output/Toby/29f/room-*-before-after.jpg` (7 ใบ) โดยเฉพาะ `room-Krajok-west` และ `room-Sawan-cyberhell`
- `AVEGEE/output/Toby/29f/cutscenes-{asia,west,cyberhell}-before-after.jpg`
- เล่นจริง: เข้าโซน 3–4 → เปิดหอทะเบียน/ตะราง/หอส่องกรรม/ประตูสวรรค์ แล้วสั่งท่ายมทูตให้ขึ้นคัตซีน
