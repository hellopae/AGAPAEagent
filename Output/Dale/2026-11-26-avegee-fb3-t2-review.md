# Dale · รีวิว + merge AVEGEE FB3-T2 (ศึก: ขนาด · ทิศ · ชั้นภาพ · เฟรมตายามา) · 26 พ.ย. 2569

ผล: **PASS** · merge fast-forward `toby/fb3` (`a9d02d4f`) เข้า main ที่ `~/agapae-work/AVEGEE` (ฐาน `5ca0ab78`)

## สิ่งที่ตรวจ
1. diff `origin/main..toby/fb3` (17 ไฟล์): ไม่พบบั๊ก/ของเดิมพัง
   - importmap/cache token ครบ: `character-scale` `battle-scale` `battle-facing` (2 รายการ) `combat-sprites` (2 รายการ) `battle-fx` (2 รายการ) `ui.js` (importmap + script tag) ขึ้นแท็ก `-fb3t2` · manifest query `night-v1-p9-ko-c-fb3t2` ตรงกันทั้ง 3 ไฟล์ (battle-fx, combat-sprites, ui)
   - `src/battle-foe-size.js` เป็นไฟล์ใหม่ ถูกโหลดผ่าน battle-scale (ไม่มีแคชเก่า ไม่ต้องใส่ importmap)
   - `book-idle.webp` URL ไม่มีเลขเวอร์ชัน (`yama-animation.js:8` สร้าง URL ไม่มี query และ `img/preload-catalog.json` อ้างพาธเปล่าเดียวกัน) · ไม่ bump: การใส่ query จะทำให้พาธไม่ตรง preload catalog และโหลดซ้ำ · ผลกระทบแค่แคช GitHub Pages ~10 นาที แล้วเห็นเฟรมใหม่เอง (ยอมรับได้ เป็นข้อเล็ก ไม่แก้)
2. ขอบเขต: `fitAllySizes`/`battleTrim` ถูกเรียกจาก `battle-scale.js` (ฉากสู้) เท่านั้น · `foeFaceClass`/`foeNeedsMirror` ใช้ใน ui.js เฉพาะฉากสู้/หน้าก่อนสู้ (บรรทัด 2828, 2835) · แผนที่/ห้องสอบสวนไม่กระทบ · บุญย่อ 0.93 เฉพาะฉากสู้
3. เทสต์ที่แก้: `fb2-b-battle` (บุญเตี้ยกว่าเพื่อน 7% ตามคำสั่ง 26 พ.ย. · เพื่อนคนอื่นยังเท่ากัน · ทะเบียนทิศขยายรูปแบบชื่อ) และ `f8-ko-pose-files` (bodyHeight ÷ KO_SCALE 1.2) ปรับตามคำสั่งใหม่จริง ยังยืนยันค่าเชิงตัวเลข ไม่ได้ปิดทิ้ง · เพิ่ม `fb3-t2-battle-look.test.mjs` 10 เทสต์
4. ดูแผ่นภาพ `facing-bosses-after.jpg` สุ่มตรวจ: หนุมาน/ขุนแผน/กาเหว่า/ม้าโทรจัน/โลกิ/มังกร หันซ้ายแล้ว
5. คำเตือน: วูกง (หน้า 3/4) Toby ไม่แน่ใจจึงไม่พลิก · จดไว้ในรายงาน Toby แล้ว ไม่ใช่ blocker

## เทสต์เต็มรอบ (บน `a9d02d4f`, เขียนลงไฟล์แล้ว grep)
`ℹ tests 2591 · pass 2591 · fail 0 · cancelled 0`

## Deploy
- main `a9d02d4f` push แล้ว · Deploy Pages run **45709073249** = **success** (รอบเดียว ไม่ต้อง rerun)
- `https://hellopae.github.io/AVEGEE/version.json` -> `{"build":"a9d02d4f"}` ตรง commit · `src/battle-foe-size.js` ตอบ 200
- ขนาด staged artifact: **946,241,045 bytes (~946 MB)** · เหลือถึงเพดาน 1 GB ~53.8 MB

## ย้อนกลับ
`git revert a9d02d4f..` ไม่จำเป็นต้องย้อนทั้งชุด: `git revert -m` ไม่ใช่เคสนี้ (fast-forward ไม่มี merge commit) → รัน `git revert a9d02d4f bdaa06a7 2561f59f 839d87ad a0955b66` บน main แล้ว push (ไฟล์ภาพ book-idle ย้อนกลับด้วย) หรือ reset main ไป `5ca0ab78` ถ้าคุณเป้อนุมัติ force

## ข้อสังเกตเหลือ (ไม่ block)
- ตัวอัญเชิญฝั่งเรา (ส่ง T4) และหน้าสอบสวน (ส่ง T3) ตามรายชื่อในรายงาน Toby
- `book-idle` แคชค้างได้ ~10 นาที
