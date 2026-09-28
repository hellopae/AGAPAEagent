# Dale review — AVEGEE batch17: ปุ่มล่างเปิดศาล/ปิดศาล + เริ่ม/พักพิจารณาคดี · เพลงตอนเปิดเกม

**ผล: PASS (merge แล้ว + 1 fix เล็กจาก Dale)**

## สรุป
- ตรวจ diff จาก Codex run `20260928T121215Z-45de1503` ใน worktree, รัน `node --test tests/*.test.mjs` → 49/49 ผ่าน
- เปิดเกมจริงด้วย Chromium (Playwright, python3 -m playwright, ติดตั้ง chromium ให้เอง) เสิร์ฟ worktree ที่พอร์ต 8791 (ไม่ใช่ 8777) ที่ 1440×810 และ 390×844 + ทดสอบ reduced-motion
- เจอบั๊กจริง 1 จุด (ดูด้านล่าง) — แก้เองในไฟล์ `index.html` (CSS 4 บรรทัด) เพราะเป็นข้อเล็ก ตามกติกา orchestration ข้อ 10
- commit ใน worktree → `git merge --no-ff` เข้า main (base `f458636`, merge commit `bf5b194`) → รัน test อีกรอบบน main (49/49) → push → ลบ worktree + branch
- ตรวจ https://hellopae.github.io/AVEGEE/ (curl หลัง merge) — markup/asset ใหม่ขึ้นแล้ว

## บั๊กที่เจอและแก้ (CSS cascade — hover ทำพื้นทองหาย)
`.btn-gold:hover:not(:disabled)` (และ `:active`, `:disabled`) ไม่ได้ประกาศ `background-image` ซ้ำ
มีกฎทั่วไปตัวหนึ่งในเกม (`button:hover:not(:disabled){background:var(--accent);...}`) ที่ specificity
เฉพาะ property `background` (0,2,1) **สูงกว่า** `.btn-gold` เฉยๆ (0,1,0) — cascade ของ CSS ตัดสินทีละ
property ไม่ใช่ทีละ rule จึงชนะเฉพาะ property `background` แม้ `.btn-gold:hover` โดยรวมจะ specificity
สูงกว่า (เพราะกฎ hover ของ `.btn-gold` ไม่เคยแตะ property นี้เลย)

ผล: hover ปุ่ม "เปิดศาล/ปิดศาล"/"เริ่มพิจารณาคดี" พื้นทองหายวับ เหลือพื้นสีเข้ม (`var(--accent)`) ระหว่าง hover
— เจอจาก computed style จริงในเบราว์เซอร์ (`getComputedStyle().backgroundImage === 'none'` ตอน `:hover`)
ไม่ใช่แค่เดา — ยืนยันด้วยสคริปต์ตรวจ CSS rule ที่ match element จริง

แก้: เพิ่ม `background-image:url('img/ui/icon-bg.png')` ในกฎ `:hover`, `:active`, `:disabled` ของ `.btn-gold`
(index.html ~1371-1376) ให้ specificity ของ `.btn-gold:hover:not(:disabled)` (0,3,0) ชนะกฎทั่วไปแทน
— ทดสอบซ้ำแล้ว hover/active/disabled แสดงพื้นทองถูกต้องทั้งสามสถานะ (screenshot ยืนยัน)

## เกณฑ์รับงาน — ผลตรวจแต่ละข้อ

**0) เพลงตอนเปิดเกม**
- บูตใหม่ (แท็บใหม่ ยังไม่เคย unlock) → หน้า "แตะเพื่อเข้าสู่อเวจี / TAP TO ENTER" ขึ้นก่อน splash ✅ (screenshot)
- แตะ → `unlock()` + `bgm('bgm-title')` + splash เล่นพร้อมกัน — ยืนยันด้วย Playwright โดย wrap `window.Audio`
  ตรวจ instance เดียวเล่นต่อเนื่อง (`currentTime` เดิน 0.32s → 1.83s → 5.34s ไม่รีสตาร์ท) volume=0.22 ตามค่า default ✅
- splash จบ → Home เพลงเดินต่อ ไม่ตัดไม่เริ่มใหม่ (audio instance เดิม, `paused:false` ตลอด) ✅
- จำลอง 🏠 (`goMenu()` = `location.reload()`) → หลัง reload enter-gate **ข้ามอัตโนมัติ** (`hidden:true` ทันที เพราะ
  `sessionStorage.avegee.audioUnlocked` ยังอยู่) เพลงเล่นเองไม่ต้องแตะซ้ำ ✅
- ปิดเสียงเพลงในตั้งค่า (`localStorage avegee.audio={on:false}`) → audio เล่นอยู่แต่ `volume:0` = เงียบจริง ✅
- ปุ่มข้าม `#splash-skip` ใช้ได้ทุกกรณีที่ทดสอบ ✅
- reduced-motion: enter-gate ยังขึ้น (เสียงยังต้องรอผู้ใช้แตะ) แตะแล้ว splash ข้ามทันที (`splash hidden:true` เร็ว) มีเพลงเข้า Home ✅
- มือถือ (390×844, touch context) แตะปุ่มได้จริง (`page.tap`) เพลง/วิดีโอเล่นตามปกติ ✅ (screenshot)

**1) เปิดศาล/ปิดศาล**
- ปุ่มซ้ายกด "เปิดศาล" → เวลาเดิน (`g.paused:false`), ป้ายเปลี่ยนเป็น "ปิดศาล" (`aria-pressed:true`) ✅
- กดซ้ำ → กลับเป็น "เปิดศาล" หยุดเวลา (`aria-pressed:false`) ✅
- ข้อสังเกต: เกมเริ่มเข้าแผนที่ครั้งแรก `g.paused=true` เสมอ (ต้องกดเปิดศาลเอง) — ตรงตามที่ Codex ตั้งใจ (`startPlay` เพิ่ม `userPaused=true;g.paused=true`)

**2) เริ่มพิจารณาคดี/พักพิจารณาคดี**
- Logic เหมือนโค้ดเดิมทุกอย่าง (`trial.disabled = !s || g.over || g.battle` ที่ `s=g.queue[0]`) — Codex แค่ย้าย
  จากปุ่มเปิดศาลเดิมมาไว้ปุ่มขวา ไม่ได้เปลี่ยนเงื่อนไข ไม่ใช่รีเกรสชันของชุดนี้
- ทดสอบเกมจริงพบว่า chapter 1 ของ tutorial (`TUTOR` ใน `data.js`) มี soul อยู่ใน queue ตั้งแต่ต้นเกม (ก่อนกดเปิดศาล
  เลยด้วยซ้ำ) จึงเห็นปุ่ม "เริ่มพิจารณาคดี" enabled อยู่แล้วตอนเข้าเกมครั้งแรก — **นี่เป็นพฤติกรรมเดิมของเกม
  ไม่เกี่ยวกับปุ่มที่แก้รอบนี้** (เดิมปุ่มเปิดศาลก็ enable ตามเงื่อนไขเดียวกันนี้มาก่อนแล้ว โค้ด logic identical)
  ไม่ใช่บั๊กจากชุด 17

**3) ภาพปุ่ม**
- พื้นทองจาก `img/ui/icon-bg.png` (เตรียมจาก `icon_bg.png` ผ่าน `prep-ui-icons.py --gold-only`, ไม่แตะ `img/raw/*`) ✅
- ข้อความพิมพ์ด้วย CSS สีเข้ม `#231f20` ตัวหนา ใกล้เคียงภาพตัวอย่าง `icon_open_court-th.png`/`icon_trail_begins-th.png` ✅ (screenshot เทียบแล้ว)
- TH: เปิดศาล / ปิดศาล / เริ่มพิจารณาคดี / พักพิจารณาคดี · EN: OPEN COURT / CLOSE COURT / TRIAL BEGINS / TRIAL RECESS
  — สะกด "TRIAL" ถูกต้อง ไม่มี "TRAIL" (grep ยืนยัน) ✅
- ปุ่มขนาดเท่ากัน สไตล์เดียวกัน (`.btn-gold` ใช้ร่วม) · hover/press/disabled feedback ชัดเจน (หลัง fix) ✅

**4) ข้อความ "เดินวาระ" เดิม**
- จุดที่ผู้เล่นเห็นเปลี่ยนครบ: แผงคิว (`drawDeck` idle text), `#st-resume`, ป้ายพักบนฉาก (`.stage.resting::after`),
  tooltip สถานี (`room.js`) — grep ยืนยันไม่มี "เดินวาระ" เหลือใน UI ที่ผู้เล่นเห็น (เหลือแต่ใน `//` comment กับ
  `settings.speed: 'ความเร็วเดินวาระ'` ซึ่งเป็น label ทั่วไปของสไลเดอร์ความเร็วเกม ไม่ใช่ข้อความสั่งให้กดปุ่ม
  — ไม่ตรงเงื่อนไข "ข้อความแนะนำ...กดเดินวาระ" ในใบงาน จึงไม่แก้ ถ้าคุณเป้อยากเปลี่ยนคำนี้ด้วยแจ้งเพิ่มได้)

**5) เทสต์ + ข้อห้าม**
- `node --test tests/*.test.mjs` 49/49 ผ่าน ทั้งใน worktree และบน main หลัง merge
- grep `alert(`/`confirm(`/`prompt(` ในไฟล์ที่แก้ → ไม่พบการเรียกจริง (มีแค่ comment ที่บอกว่าห้ามใช้)
- ไม่แตะ `CONCEPT.md`, `files/`, `Exam/`, `output/`, `img/raw/*`, `img/scene-cyberhell.jpeg` — ตรวจ `git status`
  ก่อน/หลัง merge ว่าไฟล์เหล่านี้สถานะไม่เปลี่ยน (ของคุณเป้ยังค้างเหมือนเดิม)

## Merge
- worktree branch `codex/20260928T121215Z-45de1503` → commit `2459b65` (Codex diff + Dale CSS fix)
- `git merge --no-ff` เข้า main → merge commit `bf5b194` (base `f458636`)
- push สำเร็จ: `f458636..bf5b194 main -> main`
- ลบ worktree (`git worktree remove --force`) และลบ branch local (`git branch -d`) แล้ว

## ตรวจบน Pages จริง
`curl https://hellopae.github.io/AVEGEE/index.html` (poll จนกว่าจะเจอ, ~1 นาทีหลัง push) พบ `enter-gate`,
`hud-trial`, `icon-bg.png` ในหน้าจริงแล้ว · `img/ui/icon-bg.png` และ `audio/bgm-title.mp3` ตอบ HTTP 200 บน Pages

## Live URL
https://hellopae.github.io/AVEGEE/ (hard refresh แนะนำ เพราะเบราว์เซอร์อาจแคช index.html เดิม)

## วิธี QA (Chris)
1. เปิด URL ในแท็บ **ใหม่** (private window ดีสุด กันแคช/sessionStorage เดิม) ที่ 1440×810 และ 390×844
2. ควรเห็นหน้าดำ "แตะเพื่อเข้าสู่อเวจี" ก่อน — แตะ/คลิก → ต้องได้ยินเพลงพร้อมวิดีโอเปลวไฟ (เปิดเสียงเครื่อง/แท็บด้วย)
3. เพลงต้องเล่นต่อเนื่องเข้า Home ไม่มีจังหวะเงียบ/สะดุด
4. กด NEW GAME → ปุ่มล่าง 2 ปุ่ม "เปิดศาล" / "เริ่มพิจารณาคดี" — ลอง hover แต่ละปุ่ม พื้นทองต้องไม่หายระหว่าง hover
5. กด "เปิดศาล" → ป้ายเปลี่ยนเป็น "ปิดศาล" กดซ้ำกลับเป็น "เปิดศาล"
6. สลับภาษา EN (settings) → เช็คคำ OPEN COURT / CLOSE COURT / TRIAL BEGINS / TRIAL RECESS สะกดถูก
7. 🏠 กลับหน้าแรกจาก pause → splash ต้องมีเพลงทันทีไม่ต้องแตะหน้า "แตะเพื่อเข้า" ซ้ำ

## Rollback
`git revert -m 1 bf5b194` แล้ว push (merge commit เดียว ย้อนได้สะอาด ไม่กระทบ commit อื่น)
