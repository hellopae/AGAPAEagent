# Dale — รีวิวงาน Codex app ใน AVEGEE (330eb31..18f1b5b, 6 commit)

วันที่: 2026-10-09 · ผู้รีวิว: Dale · ใบงาน: Output/Claudy/briefs/2026-10-09-avegee-review-codex-app-1008.md
repo: /Users/agapae/agapae-work/AVEGEE · HEAD ที่ตรวจ = 18f1b5b · ไม่ได้แก้/commit/push/stash อะไรใน repo (git status สะอาดก่อนและหลังตรวจ)

## คำตัดสิน: PASS (ไม่มีข้อที่ต้องแก้ก่อนใช้งาน) + ข้อเสนอแนะไม่บล็อก 6 ข้อ (ด้านล่าง)

| เกณฑ์ | ผล |
|---|---|
| 1. ไม่มีบั๊กค้าง/crash/เซฟเก่าพัง | PASS |
| 2. asset ที่โค้ดอ้างมีไฟล์ + ลงทะเบียน preload | PASS |
| 3. เทสต์ผ่าน + ไม่มี assert ถูกลดแบบไร้เหตุผล | PASS |
| 4. มินิเกมกระจก/เลื่อนเอกสารจบได้จริง | PASS (พิสูจน์ใน browser จริง) |
| 5. งานค้าง handoff 7 ต.ค. | ปิดแล้ว (ฝั่งโค้ด/ไฟล์) |

## หลักฐาน

### ข้อ 3 — เทสต์
- `node --test tests/*.test.mjs` รอบใหม่ = 534/534 ผ่าน, skipped 0, fail 0
- ไล่ diff ของ tests/ ทั้งหมด: การแก้ assert เป็นการเปลี่ยนตามพฤติกรรมที่ตั้งใจเปลี่ยน ไม่มีตัวไหนอ่อนลง
  - 30f/e1: พิกัด krajok/lokan เปลี่ยนตาม data.js (ค่าใหม่ยัง deepEqual เต็ม), เพิ่ม `syncSceneZone('th')` ให้ baseline ถูกต้อง
  - e2: เอา `skip` ของ cyberhell ออก = เข้มขึ้น (เทสต์ source-mask 3% รันกับ cyberhell แล้ว) + route ทดสอบทุก anchor
  - e3/soul-portraits: devaMonk เปลี่ยนเป็นขอทาน (sp soul-deva) + เพิ่มเทสต์เซฟเก่า (พระจำวัดในคิวถูกแปลงโดยคง id)
  - tea-recovery: เปลี่ยนจาก "จอดำ" เป็น "HP ค่อยๆ ฟื้น" ตาม spec ใหม่ ยังเช็ค HP เต็มตอนตื่น
  - story-art 24→27 = ตรงกับ panel ใหม่ 3 อัน (west-hypnosis x2 + ending-03)
  - e3/e4/e5 ที่เช็คสตริงเวอร์ชัน preload เป็นแค่ bump cache suffix
  - เพิ่มเทสต์ใหม่: document-puzzle (300 seed), zone3-refinements, ending-video, frontier-navigation cyber mask

### ข้อ 2 — asset
- สคริปต์สแกนทุกสตริง `img/....(png|webp|mp4|jpg)` ใน src/*.js, src/**/*.css, index.html: ไม่มี path ใหม่ที่ไฟล์หาย
  (ที่หายคือ fallback เก่าที่ไม่ได้อยู่ใน diff: img/hero-yama-side.png, spiritN.png, cover.png ฯลฯ — pre-existing, มี fallback)
- preload-catalog.json: 689 URL ไม่มีไฟล์หายเลย; PNG/webp ใหม่ทุกไฟล์อยู่ใน catalog (beggar-v2.png→th, lokan-ice-v2→ทั้ง 4 โซน, frontier-west-hypnosis→west, story-ending-03-*→shared)
- MP4 ไม่อยู่ใน catalog โดยตั้งใจ (โหลดตอนเปิดหน้า story) — เทสต์ ending-video เช็คว่าไฟล์ video+poster มีจริง
- เปิดใน Chrome จริง: ending 3 หน้า (1276x584 / 1280x544 / 1280x720), cyber-control, deva-west, deva-th-beggar เล่นได้ readyState 4 ไม่มี error; west-hypnosis แสดงภาพ 2 หน้า
- console: ไม่มี pageerror/404 ใหม่ (404 ที่เห็นคือ hero-yama-side.png และ audio .ogg ซึ่งมี fallback และมีมาก่อน)

### ข้อ 4 — มินิเกม (ทดสอบใน Chrome headless ผ่าน http.server ชั่วคราวนอก repo)
- เลื่อนเอกสาร (sala): เปิดจากห้อง → ▶ เริ่ม → อ่านกระดานจาก DOM → หาท่าแก้ด้วย brute-force → ลากแถวผ่านปุ่มลูกศร → ชนะ: ระเบียบ 72→80 (+8), documentCd=10 ตั้งแล้ว, overlay ปิดเอง, ไม่มี error
- กระจก (krajok): ปลดล็อกกระจก → วางกระจก → ปรับองศา → หมุนสไลเดอร์พบมุม 25° "แสงถึงกระจก" → ค้าง 1.8 วิ → "เติมพลัง +1" ammo 0→1; ทดสอบที่ 844x390, 1024x768, 1280x800, 1920x1080 ได้มุมเดียวกันทุกขนาดจอ
- ตรรกะไม่ติด state: createPuzzle.move คืน false หลังชนะ, guard `done` กันรางวัลซ้ำ, cooldown เก็บใน snapshot + zoneSave + restore (`documentCd||0` เซฟเก่าโหลดได้)

### ข้อ 1 — เซฟเก่า/crash
- `documentCd` เพิ่มครบทั้ง 3 จุดเก็บ/โหลด (snapshot, zoneSave, restore) มี default 0
- `ensureDevaCase()` แปลงวิญญาณ devaMonk เก่าในคิว (พระจำวัด) เป็นขอทาน โดยคง id เดิม + มีเทสต์
- battle ไม่ถูก save (`battle:null` ตอน restore) จึงไม่มีเซฟค้างกลางศึก west-vampire ที่ขาด `hypnotizedTeam`
- ศึก westVampireBreach: startZoneEvent ปฏิเสธถ้าไม่มี crew/guard เลย จึงไม่เกิด wave 3 ว่างที่ `b.foes[0].id` จะพัง
- ไม่ได้ทดสอบ UI ศึกกลางด่าน west-hypnosis ใน browser (ต้องเดินผ่านชายแดนจริง) — อ่านโค้ด ui.js:2754-2763 + เทสต์ zone3-refinements (3 ทีม, มี/ไม่มี Guard) แล้วตรรกะถูก; ข้อจำกัดนี้ขอระบุไว้

### ข้อ 5 — handoff 7 ต.ค.
งานค้าง = แก้ภาพข่มขู่ roar v4 โซน 1 และ 4 → ปิดแล้วโดย fc3647c (Redraw zone 1 and zone 4 roar cutscenes): ไฟล์ `img/hero-yama-th-roar-cutscene-v4.png` และ `img/hero-yama-cyberhell-roar-cutscene-v4.png` ถูกแทนที่, prompts อัปเดต, preload catalog มีทั้ง 4 ชุด, เทสต์ power-cutscene-assets ผ่าน
ไม่ได้ตัดสินว่าภาพตรงชุดจริงไหม (ห้ามรีวิวเชิงศิลป์) — คุณเป้ควรดูเองหนึ่งครั้ง
หมายเหตุ: เอกสาร docs/claude-handoff-2026-10-07.md ยังเขียนว่า "ยังค้าง" ไม่ได้อัปเดต (เอกสารล้าสมัย ไม่ใช่บั๊ก)

## ข้อเสนอแนะ (ไม่บล็อก PASS — ส่งให้ Codex app แก้ทีหลังได้)

S1. cache-bust CSS ไม่ขยับ — index.html:1972 `src/compact-ui.css?v=20261008-zone3`
   อาการ: 18f1b5b เพิ่ม CSS ปริศนาเลื่อนเอกสาร (+12 บรรทัด) ใน compact-ui.css แต่ ?v= ยังเป็นค่าเดิม ผู้เล่นที่แคชไว้อาจเห็นกระดานไม่มีสไตล์ชั่วคราว (GitHub Pages max-age ~10 นาที ผลกระทบต่ำ)
   แก้: เปลี่ยนเป็น `?v=20261009-sala-puzzle` ทุกครั้งที่แก้ไฟล์นี้

S2. Cache Storage ของรูปไม่มีกลไกล้างของเก่า — src/asset-preload.js:53-75 (`IMAGE_CACHE`, `cache.put`)
   อาการ: cache.match(url) ตอบก่อนเสมอ ถ้าวันหลังเขียนทับไฟล์ชื่อเดิม (เช่น img/West/intro-zone3-west.png ถูกแก้ทับชื่อเดิมในชุดนี้) ผู้เล่นที่ cache ไว้จะเห็นรูปเก่าถึงโหลด decode ครั้งแรก และ cache เก่าของชื่ออื่นไม่ถูกลบ
   แก้: ผูก IMAGE_CACHE กับเวอร์ชัน catalog (ค่าเดียวกับ ?v= ใน preload.js) และ `caches.keys()` ลบ cache ที่ขึ้นต้น `avegee-images-` แต่ไม่ตรงชื่อปัจจุบัน; หรือใช้ชื่อไฟล์ใหม่ (-v2) ทุกครั้งตามธรรมเนียมเดิม
   ข้อสังเกตเพิ่ม: รูปที่แสดงจริงยังโหลดผ่าน <img src> (HTTP cache) ไม่ได้อ่านจาก Cache Storage จึงเป็นแค่สำเนาซ้ำ เปลืองโควตาเครื่องผู้เล่น ควรทบทวนว่าจำเป็นไหม

S3. คำบรรยายอ่านกำกวม — src/story.js:55 ("พ่อเดินมาตบบ่ายมบาทน้อยเบาๆ")
   อาการ: "บ่ายมบาท" ชวนอ่านเป็น "บ่าย" (เวลา) — ควรผ่าน Rae
   แก้ (เสนอ): "พ่อเดินมาตบบ่าของยมบาทน้อยเบาๆ" (ขอให้ Rae ยืนยัน)

S4. ไฟล์วิดีโอ/ภาพใหญ่
   - img/yama-intro-combined-v1.mp4 (4.2 MB) ไม่มีที่อ้างถึง (เป็นต้นทางของ intro-opening-v2.mp4) — จะลบหรือย้ายออก repo ก็ได้
   - index.html splash: `intro-splash.mp4` 1.7 MB → `intro-opening-v2.mp4` 6.8 MB ที่ `preload="auto"` ทำให้หน้าแรกบนมือถือหนักขึ้น ~4 เท่า (ยังมีปุ่มข้ามและ fallback 25 วิ)
   - img/frontier-west-hypnosis-v1.png 3.2 MB และ deva-intro-th-beggar-v2.png 2.8 MB เป็น PNG อยู่ใน preload catalog ของโซน (ใหญ่กว่า webp ภาพห้องอื่นราว 4 เท่า) พิจารณา webp
   - วิดีโอใหม่รวม ~48 MB ใน repo

S5. ข้อความ UI ใหม่ฝังไทยตรงๆ ข้าม i18n — src/ui.js:3980 ('จัดเอกสาร'), 3988 ('ปรับองศา'), 3989 ('วางกระจก') และ tip ใน src/minigames/sala.js
   อาการ: โหมดอังกฤษยังเห็นไทย (ของเดิมใช้ key `room.sala.action2`, `room.krajok.action`)
   แก้: เพิ่ม key ใน i18n.js ทั้ง TH/EN แล้วเรียก `t()`; ถ้าไม่ตั้งใจรองรับ EN ก็ปล่อยได้

S6. วิดีโอใน interlude กลางศึกไม่หยุดเมื่อ dialog ถูกปิด — src/ui.js:4448 (`root.addEventListener('close', stopVideo)`)
   อาการ: ใน battle overlay root คือ div ไม่ใช่ <dialog> event close ไม่เกิด (เกี่ยวเฉพาะ cyber-duel ที่เป็นวิดีโอและมีเสียงถ้าผู้เล่นกดเปิดเสียง) ส่วน story หลักที่ root=dlg ใช้ได้ปกติ
   แก้: เรียก stopVideo ใน onDone ของ overlay (ทำแล้วใน finish) + ผูก `dlg.addEventListener('close', ...)` เมื่อ root เป็น overlay

ข้อสังเกตเล็ก (ไม่ต้องทำอะไร): `.doc-book{touch-action:none}` ทำให้เลื่อนกระดานแนวนอนด้วยนิ้วบนหนังสือไม่ได้ในจอแคบกว่า ~620px (เลื่อนจากช่องว่างได้) เกมบังคับแนวนอนอยู่แล้ว; `talkKan()` ใน game.js ไม่มี UI เรียกแล้ว (โค้ดตกค้าง); `img/manifest.json` ใส่ `frontier-west-hypnosis-v1.png` ไว้หัวลิสต์ "rest" ไม่เรียงตามตัวอักษร ไม่กระทบการทำงาน

## วิธีตรวจที่ใช้ (ทำซ้ำได้)
- เทสต์: `cd /Users/agapae/agapae-work/AVEGEE && node --test tests/*.test.mjs`
- browser: Playwright (python) + Chrome app, เสิร์ฟ repo ด้วย `python3 -m http.server 8791 --directory <repo>` (อ่านอย่างเดียว) สคริปต์อยู่ใน scratchpad นอก repo; ปิดเซิร์ฟเวอร์แล้ว
- ไม่ได้แตะ Codex app/โปรเซสที่เปิดอยู่; HEAD ยัง 18f1b5b ก่อนจบ
