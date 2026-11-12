# Toby — AVEGEE: แถบ "มีเวอร์ชันใหม่ แตะเพื่อโหลดใหม่" · 12 พ.ย. 2569

worktree `~/agapae-work/.toby-worktrees/z1-v5` · branch `claude/2026-11-05-zone1-v5-fx` (push แล้ว) · Claudy เป็นคน merge main

## สิ่งที่ build
**วิธีเช็คเวอร์ชัน**
1. ตอน deploy (`.github/workflows/pages.yml`, หลัง `cp` เข้า `_site/`) รัน `node scripts/stamp-build.mjs _site "${GITHUB_SHA::8}"` → ใส่ commit sha 8 ตัวลง `<meta name="avegee-deploy">` ใน `_site/index.html` **และ** เขียน `_site/version.json` = `{"build":"<sha8>","time":"<iso>"}` (ไฟล์นี้ถูกสร้างตอน deploy ไม่ได้ commit ลง repo; อยู่ใน allowlist แล้วเพราะสร้างใน `_site/` เอง)
2. `src/version-check.js` (module แยก โหลดท้าย `index.html`, ไม่แตะ `ui.js` จึงไม่ต้อง bump cache-bust ของไฟล์อื่น) อ่าน id ของแท็บนี้จาก meta แล้วเทียบกับ `version.json?t=<now>` (`cache:'no-store'`, timeout 8 วิ) — เช็ค 3 จังหวะ: ตอนเปิดหน้า, ทุก 10 นาที, ตอนแท็บกลับมา visible (รวม bfcache `pageshow`)
3. ไม่ตรง → ล็อก `stale` (เลิกถามเซิร์ฟเวอร์) แล้วแสดง
   - **หน้า Home**: แถบทองมุมบน ซ้ายของเฟืองตั้งค่า "มีเวอร์ชันใหม่ แตะเพื่อโหลดใหม่" / "New version available — tap to reload" (ตามภาษา) สไตล์เดียวกับปุ่ม START, ไม่ทับ START/โลโก้, โผล่พร้อมเมนูหลัง splash
   - **ระหว่างเล่น**: ไอคอนเล็กมุมซ้าย (ใช้ `img/ui/icon-restart.webp` ที่ Kittanate วาดไว้ ไม่แต่งภาพ เพิ่มแค่จุดส้มกะพริบ) ไม่ใช่ modal · แตะ = `G.save()` ก่อนแล้ว `location.reload()` (ตรวจแล้ว: save ถูกเรียก ~47 ms หลังแตะ ก่อน reload)
4. รูปโหลดไม่ขึ้นระหว่างเล่น (404 จาก `<img>` ใน DOM หรือ `new Image()` ของ canvas — จับด้วย PerformanceObserver `responseStatus>=400` + capture `error`) → เช็คเวอร์ชันทันที (ห่างกันอย่างน้อย 20 วิ) ถ้าไม่ตรง → ไอคอนขยายเป็นป้ายข้อความเต็ม ("is-urgent") · ถ้าเวอร์ชันตรง = เงียบ (รูปขาดจริงของเวอร์ชันปัจจุบันไม่ใช่เรื่องของแถบนี้)
5. offline / 404 ของ version.json / JSON เสีย / timeout → เงียบ ไม่แสดงอะไร (ครอบด้วย test 7 กรณี)
6. รันบน dev/test (index.html ใน repo ยังเป็น `__BUILD_ID__`) → ปิดทั้งระบบ ไม่ยิง request

**ข้อสังเกต/การตีความที่ขอให้ Claudy ยืนยัน**: ข้อ 4 ของใบงานเขียน "แสดงแถบทันที" — ผมตีความเป็น "แสดงทันทีไม่รอรอบ 10 นาที" ในรูปไอคอนที่ขยายเป็นป้ายข้อความ (ไม่ใช่แถบเต็มจอที่บัง HUD) เพื่อคงข้อ 3 "ไม่ขัดจังหวะ" · ถ้าต้องการแถบเต็มกว้างตอนเล่น บอกได้ แก้ CSS จุดเดียว

ผลทดสอบในเบราว์เซอร์จริง (Chrome, เซิร์ฟเวอร์จำลองหลัง stamp ที่ `/tmp/avegee-site`, สลับ `version.json` เอง):
- Home 390/360/1792: ตรงเวอร์ชัน = ไม่มีแถบ · ไม่ตรง = แถบขึ้น, ไม่ทับ START (y 33–74 vs START y 612), ไม่ทับเฟือง, `scrollWidth` = ความกว้างจอ (ไม่ล้น)
- ระหว่างเล่น 390: เวอร์ชันตรง + รูป 404 = เงียบ · deploy แล้วแท็บกลับมา visible = ไอคอนเล็ก · deploy แล้วรูป 404 = ไอคอน+ป้าย · แตะ = save แล้ว reload สำเร็จ · console/pageerror = 0

## ไฟล์ที่แตะ
- ใหม่: `src/version-check.js` · `scripts/stamp-build.mjs` · `tests/update-banner.test.mjs` · `docs/art-reviews/2026-11-12-update-banner/*.webp`
- แก้: `index.html` (meta `avegee-deploy`, CSS `#update-banner`/`#update-chip`, script tag ท้ายไฟล์) · `.github/workflows/pages.yml` (ขั้น stamp) 
- ไม่แตะ meta `avegee-build` เดิม (สคริปต์ `build-guide-exit-review.mjs` อ่านอยู่) และไม่แตะ `ui.js`/`art.js`

ภาพหน้า Home ตอนแถบขึ้น: `docs/art-reviews/2026-11-12-update-banner/` (ใน worktree)
`home-390-banner.webp` · `home-360-banner.webp` · `home-1792-banner.webp` · `home-390-no-banner.webp` (เทียบ) · `play-390-icon.webp` · `play-390-icon-after-404.webp`

## วิธีรัน/ทดสอบเอง
```
cd ~/agapae-work/.toby-worktrees/z1-v5
node --test tests/update-banner.test.mjs      # ชุดใหม่ 12 test
node --test tests/*.test.mjs                  # ทั้งหมด
# จำลอง deploy ในเครื่อง:
mkdir /tmp/site && cd /tmp/site && ln -s ~/agapae-work/.toby-worktrees/z1-v5/{src,img,audio} . && cp ~/agapae-work/.toby-worktrees/z1-v5/index.html . \
  && node ~/agapae-work/.toby-worktrees/z1-v5/scripts/stamp-build.mjs /tmp/site abc12345
python3 ~/agapae-work/.toby-worktrees/z1-v5/scripts/serve-nocache.py 8953     # รันจากใน /tmp/site
```
Kittanate: เปิด `http://localhost:8953` → ไม่เห็นแถบ → แก้ `/tmp/site/version.json` เป็น `{"build":"zzz99999"}` → สลับแท็บออก/กลับ (หรือรอ 10 นาที) → แถบทองขึ้นที่หน้า Home → แตะ = โหลดใหม่ · เข้าเกมแล้วทำซ้ำ → ไอคอนเล็กมุมซ้ายใต้ทรัพยากร → แตะ = เซฟแล้วโหลดใหม่
ของจริง: หลัง Claudy merge main แล้ว Pages deploy ครั้งถัดไป เปิดแท็บค้างไว้ก่อน deploy แล้วดูว่าขึ้นหรือไม่ (ยังไม่เคยลองบน Pages จริง)

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มี (ใช้ `icon-restart.webp` เดิม) · ถ้า Kittanate อยากได้ไอคอน "อัปเดต" เฉพาะ: `img/ui/icon-update.webp`, 72×72 px พื้นโปร่งใส 1 เฟรม มุมมองหน้าตรง สไตล์เดียวกับ `icon-restart.webp` — แล้วเปลี่ยนชื่อไฟล์ใน `version-check.js` บรรทัดเดียว

## สิ่งที่ยังไม่ทำ / ยังไม่ได้ทดสอบ
- ยังไม่ได้ทดสอบบน GitHub Pages จริง (workflow ใหม่ยังไม่เคยรัน; `${GITHUB_SHA::8}` เป็น bash substring ซึ่ง `run:` ของ Actions ใช้ bash เป็นค่าเริ่มต้น แต่ยังไม่ได้เห็นรันจริง) — Dale ควรดูรอบ deploy แรก
- Pages ตอบแคช `max-age=600` ให้ index.html: หลังแตะ reload ถ้า CDN ยังส่ง HTML เก่า แถบจะกลับมาอีกครั้ง (ไม่ reload วน) — แตะซ้ำหรือรอ
- ข้อความภาษาไทย/อังกฤษใช้ตามใบงานตรงๆ ยังไม่ผ่าน Rae
- แถบเปรียบเทียบเฉพาะ build id ไม่ได้เทียบ importmap · ข้อความตอนเปิดแท็บเก่าที่ยังไม่มีโค้ดนี้ (แท็บก่อน deploy ครั้งแรกที่มีระบบนี้) จะไม่เห็นแถบ — ต้อง reload เองหนึ่งครั้ง
