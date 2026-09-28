# Dale build note — AVEGEE: intro splash + Home video wiring, merge batch16B

**วันที่:** 28 ก.ย. 2569
**Repo:** `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`
**Live URL:** https://hellopae.github.io/AVEGEE/

## สถานะ: เสร็จทั้งสองส่วน — push แล้ว

- **ส่วนที่ 1 (วิดีโอ):** commit `579915f` — "Wire intro splash + Home background video (avegee.fresh skips Home)"
- **ส่วนที่ 2 (merge 16B):** commit `75d9ca9` — "Merge AVEGEE batch16B: court/patrol buttons, PAUSE, UI/char scale, Home, investigation fullscreen, bell, guidebook"
- `main` อยู่ที่ `75d9ca9` แล้ว push ขึ้น `origin/main` สำเร็จทั้งสอง commit
- Worktree/branch `codex/20260928T081004Z-5f1d1425` (16B) ลบแล้วหลัง merge
- **ไม่แตะ** worktree 16A (`.codex-worktrees/20260928T083305Z-fbb41880`, branch `codex/20260928T083305Z-fbb41880`) ตามคำสั่ง
- **ไม่แตะ** `CONCEPT.md` (แก้ค้างของคุณเป้ ยังอยู่ใน working tree ตามเดิม) และไฟล์ untracked อื่น (`Exam/*.jpg`, `files/`, `img/scene-cyberhell.jpeg`, `output/higgsfield/*`, `output/wallpapers/`)

## ส่วนที่ 1 — สิ่งที่แก้จากร่างเดิม

ร่างที่ session ก่อนทิ้งไว้ (ไม่ commit) มี 2 จุดที่ต้องแก้ตามคำสั่งคุณเป้ ผมแก้ทั้งสองจุดแล้ว ที่เหลือ (ปุ่มข้าม, timeout 8s, error fallback, reduced-motion, หยุดเมื่อแท็บซ่อน, โลโก้ตามภาษา) คงไว้ตามร่างเดิมเพราะใช้ได้ดีอยู่แล้ว:

1. **พื้นหลัง Home** — เปลี่ยนจาก `img/home-embers.mp4` เลเยอร์ `mix-blend-mode:screen; opacity:.24` ทับภาพปก
   เป็น `img/home-animated.mp4` เต็มจอ วนลูป **แทนภาพปกเลย** (ลบ blend/opacity/mask ออกจาก CSS `.cover-vfx`)
   `#cover-art` (คุม `cover-v3.webp`) ยังอยู่ชั้นล่างเป็น fallback เหมือนเดิม + เพิ่ม `poster="img/cover-v3.webp"` บน `<video>`
   เอง กันช่วงที่วิดีโอยังโหลดไม่เสร็จ — ถ้าวิดีโอเล่นไม่ได้/error/`prefers-reduced-motion` จะเห็นภาพปกนิ่งแทนเสมอ
2. **splash เล่นทุกครั้งที่กลับ Home** — ตรวจแล้วตรรกะเดิมในร่าง (gate ด้วย `sessionStorage.avegee.fresh`) **ถูกต้องอยู่แล้ว**
   ไม่ต้องแก้เพิ่ม: เส้นทางที่ตั้ง `avegee.fresh` แล้ว reload (เริ่มใหม่/เริ่มโซนใหม่/ยืนยันเกมใหม่) ข้ามหน้า Home ไปเข้าเกมเลย
   ตามที่ควร ไม่เล่น splash — ส่วนปุ่ม 🏠 กลับหน้าแรก (`goMenu()` ทั้งจากหน้าตั้งค่าและจากหน้าต่าง PAUSE) ล้าง flag
   ก่อน reload อยู่แล้ว ทำให้ splash เล่นซ้ำทุกครั้งจริง — ยืนยันด้วยการทดสอบเบราว์เซอร์จริงทั้งสอง path (ดูหัวข้อทดสอบ)

ไฟล์ที่แก้: `index.html` (CSS `.cover-vfx` + markup `<video id="cover-vfx">`), ไม่แตะ `src/preload.js`/`src/ui.js` เพิ่มจากร่างเดิม

## ส่วนที่ 2 — merge batch16B

- `git merge --no-ff codex/20260928T081004Z-5f1d1425` เข้า `main` — **auto-merge สำเร็จ ไม่มี conflict**
  (คาดว่าจะชนใน `src/ui.js` ตามที่ใบงานเตือน แต่จุดที่ทั้งสองฝั่งแก้ไม่ทับกัน: วิดีโอ/splash อยู่ตอนต้นบล็อก
  "หน้าปก" ส่วน 16B แก้แค่บรรทัด `$('#t-intro')` ในฟังก์ชัน `buildTitle()` — git merge ต่อ context ได้เอง)
- `index.html` ไม่ชนเพราะ 16B ไม่แตะไฟล์นี้ (ลบปุ่ม "ดูบทนำอีกครั้ง" ด้วย JS runtime ไม่ใช่แก้ HTML)
- `node --test tests/*.test.mjs` หลัง merge → **46/46 ผ่าน**
- ตรวจโค้ดหลัง merge ยืนยันทั้งสองงานอยู่ร่วมกันจริง: `revealTitle()`/`coverVfx`/`splashDone` (ส่วนที่ 1)
  และ `$('#t-intro')?.closest('.title-secondary')?.remove()` (16B) อยู่ในไฟล์เดียวกันครบ ไม่มีฝั่งไหนหาย

## วิธี verify (Chris/คุณเป้)

เปิด **https://hellopae.github.io/AVEGEE/** ตรง (ไม่ใช่ localhost) ที่ 1440×810 และ 390×844:

1. เข้าเว็บ → เห็น **splash วิดีโอเปิดเกม** (โลโก้ไฟลอยกลางจอ, ปุ่ม "ข้าม →" มุมขวาล่าง) เล่นจบเองหรือกดข้ามได้
2. splash จบ → **หน้า Home มีวิดีโอพื้นหลังวนลูป** (ควันลาวา/ไฟ) แทนภาพนิ่งเดิม, เมนูชิดซ้าย, **ไม่มี** "ดูบทนำอีกครั้ง"
3. กด "เริ่มเกมใหม่" → ข้ามกล่องเปิดเรื่อง → เข้าแผนที่: ปุ่ม "เปิดศาล"/"เดินวาระ" ล่างกลาง, ไม่มีปุ่มลอยบังบัลลังก์
4. กด ▶/⏸ ขวาบน → หน้าต่าง **PAUSE** ("หยุดเกม") เทียบ `files/UI3-pause.jpg`: 🏠 กลับหน้าแรก / ▶ เล่นต่อ / ⚙ ตั้งค่า
5. กด 🏠 **กลับหน้าแรก** → หน้าเว็บ reload → **splash เล่นซ้ำอีกรอบ** ก่อนขึ้น Home (นี่คือจุดที่ผมต่อสายให้ทำงาน)
6. กดกระดิ่งขวาบน (มีจุดแดง) → อ่านข้อความ → ปิด → ดูหน้าสอบสวนเต็มจอ/คู่มือ ตามรายงานเดิมของ 16B
7. มือถือ 390×844: วิดีโอ Home เล่นอัตโนมัติ (muted/playsinline), หน้าต่าง PAUSE/เมนูไม่ล้นจอ

## ทดสอบที่ทำแล้ว (Chrome จริงผ่าน Playwright, ทั้ง local + live URL)

- 1440×810 และ 390×844 ทั้งคู่: boot → splash (เล่น/ข้ามได้) → Home (วิดีโอพื้นหลังวนลูปจริง, `readyState:4`,
  `paused:false`) → New Game → ปิดกล่องเปิดเรื่อง → แผนที่/PAUSE/HUD render ถูกต้อง
- Path `goMenu()` (ปุ่ม 🏠 ทั้งจากหน้าตั้งค่าในเกมและจากหน้าต่าง PAUSE `#pause-home`) → reload → splash เล่นซ้ำจริง
  (`splashHidden:false, splashPlaying:true`) ยืนยันทั้ง local และบน URL จริง
- Path `avegee.fresh` (restart/เริ่มใหม่/เริ่มโซนใหม่) → reload → splash **ไม่เล่น** ข้ามไปเข้าเกมตรง
  (`splashHidden:true, titleGone:true`) ตามที่คุณเป้ต้องการ
- `.title-secondary`/`#t-intro` หายจริงหลัง merge — ตรวจ DOM ตรง + fetch `ui.js` แบบ cache-bust จาก live URL
- `node --test` 46/46 ผ่านหลัง merge, `node --check` ผ่านทั้ง `index.html`-referenced JS
- ไม่มี console error ใหม่จากการเปลี่ยนแปลงของผม (404 ที่เห็นเป็นของเดิม: `hero-yama-side.png`, `bgm-*.ogg` fallback
  probe — ไม่เกี่ยวกับงานนี้ ไม่ได้แก้)

## ข้อสังเกต (ไม่ใช่บั๊ก — รายงานไว้เพื่อความโปร่งใส)

ระหว่างทดสอบรอบแรกบน live URL ทันทีหลัง push เห็นข้อความ "ดูบทนำอีกครั้ง" โผล่มาแวบเดียวใต้ปุ่ม "เริ่มเกมใหม่"
ทั้งที่โค้ดลบไปแล้ว — ตรวจสอบแล้วเป็น **CDN edge cache ของ GitHub Pages ยังไม่ update ครบทุกไฟล์พร้อมกัน**
(commit วิดีโอกับ commit merge 16B push ห่างกันไม่กี่นาที บาง edge node เสิร์ฟ `ui.js` เวอร์ชันวิดีโอ-อย่างเดียว
ที่ยังไม่มีบรรทัดลบปุ่ม) ไม่ใช่บั๊กจากงานนี้ — ยืนยันแล้วว่าหายเองหลัง cache หมดอายุ: ทดสอบซ้ำ 6 รอบติด
(browser context ใหม่ทุกรอบ) + fetch `ui.js` แบบ cache-busted query string เห็นโค้ดลบปุ่มอยู่ครบ, `age:0` บน edge
ปัจจุบัน ไม่มี recurrence แล้ว ถ้า Chris เจอ QA อีกให้ hard-refresh (Cmd+Shift+R) ก่อนตัดสินว่าเป็นบั๊ก

## วิธี rollback

```
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
git revert 75d9ca9   # ถอย merge 16B อย่างเดียว คงวิดีโอไว้
# หรือ
git revert 579915f 75d9ca9   # ถอยทั้งสองงาน กลับไปที่ d8897c9
git push origin main
```
