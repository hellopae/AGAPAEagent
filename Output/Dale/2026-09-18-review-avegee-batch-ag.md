# Code review — AVEGEE batch A–G (Toby)

**ผู้ตรวจ:** Dale · **วันที่:** 18 ก.ย. 2569 · **Repo:** `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`
**ช่วง commit ตรวจ:** `285d59c..eb44cd5` (9 commits, push แล้ว) · **โหมดตรวจ:** read-only เท่านั้น ไม่ commit/push/revert/stash

อ่านก่อนตรวจ: `Output/Claudy/briefs/2026-09-17-avegee-ui-fixes-batch2.md` (A–G + เกณฑ์รับงาน) และ
`Output/Toby/2026-09-17-avegee-ui-fixes-batch2.md` (รายงานของ Toby)

⚠️ **หมายเหตุสภาพแวดล้อม:** ระหว่างตรวจ Toby กำลังทำงานอีกใบ (หน้าสอบสวน/ต่อสู้ ตามสเปก Vera) สดๆ
ในโฟลเดอร์เดียวกัน — `index.html` และ `src/ui.js` มีการแก้ไขที่ยังไม่ commit อยู่ตลอดเวลาที่ตรวจ
(ภายหลังยังเห็น `img/manifest.json`, `scripts/prep-art.py` เปลี่ยนเพิ่มระหว่างตรวจด้วย — เป็นงานของ Toby
ที่ทำต่อเนื่อง ไม่ใช่สิ่งที่ผมแก้) ผมไม่แตะไฟล์เหล่านั้นเลย และเพื่อไม่ให้ผลตรวจปนกับงานที่ยังไม่เสร็จ
ผมสร้าง **isolated git worktree ที่ `eb44cd5`** แยกไปทำ smoke test ต่างหาก (`git worktree add --detach`
ไปที่ scratchpad ใน `/private/tmp`, ลบออกหลังทดสอบเสร็จด้วย `git worktree remove`) — ไม่กระทบ working
tree หลักที่ Toby ใช้อยู่เลย ยืนยันด้วย `git status` ก่อน/หลังว่าไฟล์ของ Toby ไม่ถูกแตะ

---

## 1. `node --check` + manifest image paths

- `node --check` ทุกไฟล์ใน `src/*.js` **ที่ commit `eb44cd5` จริง** (ดึง blob ด้วย `git show eb44cd5:<path>`
  มาเช็คแยกในสคริปต์ ไม่ปนกับ WIP ของ Toby ในดิสก์) — ผ่านหมดทั้ง 12 ไฟล์ ไม่มี syntax error
- `img/manifest.json` (state ที่ `eb44cd5`): ไล่ทุก path ใน `critical` + `rest` + `zones.*` รวม 192 path
  เทียบกับไฟล์จริงใน `img/` — **มีครบทั้งหมด ไม่มี path ไหนหาย (0/192 missing)**

**ผลข้อ 1: PASS**

## 2. สำนวนใหม่ 29 เรื่อง (15 asia rewrite + 14 zone1 ใหม่)

- **E1 (15 สำนวน asia)** — เทียบ diff `285d59c..eb44cd5` ของ `src/cases-asia.js`: เปลี่ยนเฉพาะ A1 A3 A6 A7
  A8 A9 A10 A11 A12 A13 A15 A16 A17 A18 A20 ตรงตามใบงานเป๊ะ ส่วน A2 A4 A5 A14 A19 **ไม่ถูกแตะเลย**
  (ไม่มี diff บรรทัดใดของ 5 สำนวนนี้) — spot-check เนื้อหาแบบเต็ม (ไม่ใช่แค่สุ่ม 5) ของทั้ง 15 สำนวนเทียบกับ
  `Output/Rae/2026-09-17-avegee-asia-rewrite.md` ตรงคำต่อคำทุกฟิลด์ (name/who/face/seen/hidden/merit/
  line/kind/claims) รวมถึงกรณีพิเศษ A9 ที่แก้จาก "วัคซีน"→"ยาปฏิชีวนะ" ในรอบ 2 ก็ตรงกับฉบับล่าสุดของ Rae
- **E2 (14 สำนวนโซน 1 ใหม่)** — ไล่ diff `src/cases.js`: เพิ่มต่อท้ายบรรทัด 343 (หลัง 11 เรื่องเดิมจบพอดี)
  ไม่มีการลบ/แก้เนื้อหาก่อนหน้านั้นเลย (diff เป็น pure addition) — เขียนสคริปต์เทียบทั้งบล็อกโค้ด 14 เรื่อง
  (ตัด whitespace/comment แล้ว) กับโค้ดบล็อกใน `Output/Rae/2026-09-17-avegee-zone1-new-cases.md`
  **ตรงกัน 100% ทุกบรรทัด (346/346 บรรทัดเทียบเท่ากันเป๊ะ)** — ไม่ใช่แค่สุ่ม 5 เรื่อง แต่ตรวจครบทั้ง 14
- **`k` ไม่ซ้ำ** — `cases.js` มี 25 คีย์ ไม่ซ้ำกันเลย (11 เดิม + 14 ใหม่: orchard trader sister novice
  inspector hunter gadget sergeant accountant scapegoat hammer prophet healer heir) · `cases-asia.js`
  ใช้ `C(1..20)` สร้างคีย์ A1–A20 อัตโนมัติ ไม่มีเลขซ้ำ (เช็คด้วย regex `C\([0-9]+,`)
- **`boast.merit` ตรงกับ `merits[].t`** — เขียนสคริปต์ import `cases.js` + `cases-asia.js` จริง ไล่ทุก case
  ทุก claim ที่ `kind:'boast'` เทียบ `cl.merit` กับ `merits[].t` ทั้งก้อน — **0 ปัญหาทั้งสองไฟล์**
- **sex/sp สอดคล้อง** — เช็ค `SPIRIT_SEX`/`safeSp` ใน `data.js`: sp ทุกตัวที่ใช้ในสำนวนใหม่ (1,2,3,4,5,6,7,8,9)
  ตรงเพศกับ `sex` ที่ประกาศไว้ทุกเรื่อง ไม่มีเคสที่ `safeSp` จะสลับรูปให้ (ซึ่งจะทำให้รูปไม่ตรงสำนวน)
- **11 เรื่องเดิมในโซน 1 ไม่ถูกแตะ** — ยืนยันจาก diff ว่าเนื้อหาก่อนบรรทัด "12-25" ไม่มีการเปลี่ยนแปลง

**ผลข้อ 2: PASS**

## 3. คำให้การสุ่ม 6 ชุด + กันซ้ำ

นับจำนวนจริงจาก `src/data.js` (import แล้วอ่าน `.length`):

| ชุด | จำนวนที่ต้องการ | จำนวนจริง |
|---|---|---|
| `DENY_BY_SIN` | 7 บาป × 10 | 7 คีย์ (kong/kam/kha/pak/mao/bian/akata) × 10 ครบทุกคีย์ |
| `SOLID_BY_SIN` | 7 บาป × 10 | 7 คีย์ × 10 ครบทุกคีย์ |
| `ADMIT_TPL` | 20 | 20 |
| `SOLID_LINES` | 40 | 40 |
| `CRACK_LINES` | 12 | 12 |
| `HOLD_LINES` | 12 | 12 |

ตรงตามใบงานทุกช่อง — **PASS**

**`g.recentLines` กันซ้ำ** — อ่าน `pickFresh()`/`spliceFresh()` ใน `game.js`:
- `pickFresh(pool, recent)`: กรอง `pool` เอาที่ไม่อยู่ใน `recent` ก่อน ถ้ากรองแล้วว่าง (`fresh.length === 0`)
  **fallback กลับไปสุ่มจาก `pool` เต็มทันที** ไม่มีทาง return `null`/`undefined`/ว่างเปล่า ถ้า `pool` มีของจริง
  (คืน `null` เฉพาะกรณี pool เองว่างตั้งแต่ต้น ซึ่งเป็น edge case ที่ถูกต้อง)
- `spliceFresh(arr, recent)`: หา index ที่ยังไม่ใช้ก่อน ถ้าไม่มีก็สุ่ม index ปกติ แล้ว `splice` ออกจาก `arr`
  เสมอ — ตัดสมาชิกออกทุกครั้งที่เรียก การันตีว่า loop ที่เรียกมัน (`while (bySin.length && ...)`,
  `while (rest.length && ... && guard2++ < 60)`) จะจบเสมอ (ทั้ง array สั้นลงทุกรอบ และมี guard คำนวณ 60
  รอบกันไว้ซ้อนอีกชั้น) — **ไม่มีทาง infinite loop และไม่มีทาง return บรรทัดว่างเปล่า**
- `RECENT_CAP = 30` ตัด `recent` ไม่ให้บวมไม่จำกัด

**ผลข้อ 3: PASS**

## 4. `prep-art.py` (BG- ตัวพิมพ์ใหญ่, Intro-Boss, ingest)

- **BG- capitalization**: regex `re.match(r'BG-[a-z]', name)` จับเฉพาะไฟล์ที่ตัวอักษรแรกหลัง `BG-` เป็น
  ตัวเล็ก (บั๊กจริงที่เจอ) — ไฟล์ที่ตั้งชื่อถูกต้องอยู่แล้ว (`BG-Dab`, `BG-Krajok` ฯลฯ) ไม่ถูกแตะเพราะตัวแรก
  เป็นตัวใหญ่อยู่แล้ว ไม่ match regex — ไม่กระทบ asset เดิม
- **Intro-Boss-Zone handling**: เพิ่มเงื่อนไขให้ไฟล์ที่ชื่อขึ้นต้น `Intro-Boss-Zone<N>` เข้าทาง "ภาพฉากเต็มใบ"
  (resize ถ้ากว้างเกิน, quantize, save ตรง) แทนทางสไปรท์ตัวละคร (ลอกพื้น+ครอปจัตุรัส) — ตรงกับสาเหตุที่
  Toby อธิบายเรื่องภาพตกขอบ ตรวจแล้วเงื่อนไข regex เจาะจงเฉพาะ `Intro-Boss-Zone\d+` ไม่ไปโดนชื่อไฟล์อื่น
- **`ingest()` fix**: เพิ่มเงื่อนไขข้าม `scene-*` และ `Intro-Boss-Zone<N>` ไม่ให้ถูกเข้าใจผิดว่าเป็น "ต้นฉบับ"
  แล้วย้ายออกจาก `img/` ไป `img/raw/` (บั๊กที่ Toby เจอจริงกับ `st-lokan-west.png` ระหว่างทำงาน)
- **ไม่มีไฟล์ raw ถูกลบ** — เช็ค `img/raw/West/` มีไฟล์ต้นฉบับครบ (`BG-dab/krata/lokan/ngiw/sala-west.jpeg`,
  `Intro-Boss-Zone3.png`, `st-dab/krata/lokan/ngiw/sala-west.png` ฯลฯ) และ `git diff --stat` ในช่วง commit
  ที่ตรวจไม่มีการลบไฟล์ใดเลย (มีแต่ modify/add, `img/raw/` ไม่ได้ถูก track ใน git อยู่แล้วจึงตรวจจากไฟล์จริง)
- manifest ครบ 192/192 (ดูข้อ 1) ยืนยันว่า pipeline รอบนี้ไม่ทำ asset อื่นหาย

**ผลข้อ 4: PASS**

## 5. Headless smoke test (Playwright, รันบน isolated worktree ที่ `eb44cd5` เท่านั้น)

สร้าง `git worktree add --detach <scratch> eb44cd5`, เสิร์ฟด้วย `python3 -m http.server` คนละพอร์ต, รันผ่าน
Chromium (Playwright) แยกจาก working tree หลักที่ Toby ใช้อยู่โดยสิ้นเชิง — ลบ worktree ทิ้งหลังทดสอบเสร็จ

ผลการไล่ flow:
1. **เกมใหม่** → `#t-new` → ข้ามบทนำ (`#intro-skip`) → `window.G` มีจริง
2. **หน้าสอบสวน** → บังคับตำแหน่งผู้เล่นไปที่แท่นพิพากษา (`SPOTS.bench` 800,396) แล้วกดปุ่มลอย `.trialfab`
   → dialog `#dlg.hudwrap` เปิดสำเร็จ, **วัดความกว้าง dialog ก่อน/หลังกดปุ่มไต่สวน = 1180px เท่ากันทุกครั้ง**
   (ยืนยันเกราะ min-width ของ Part C ใช้งานได้จริงบน desktop 1440px)
3. **จี้คำให้การ** — กดปุ่ม `button.say` (ข้ออ้าง/deny/solid) สำเร็จหลายครั้งจนปุ่ม disabled ตามจำนวน `presses`
4. **ปิดคดี** — เลือกสถานี (`data-cmd="st"`) + ผู้คุม (`data-cmd="cr"`) แล้วกด `#t-go` กับดวงที่ `resist:false`
   → dialog ปิดสำเร็จ (`open:false`) ไม่มี error
5. **ต่อสู้** — ทำซ้ำ flow เดิมกับดวงที่ `resist:true` → กด `#t-go` (ปุ่มขึ้น "⚔️ ประทับตรา" ถูกต้อง) →
   dialog สลับเป็น `dialog.rpg` พร้อม `.arena` element **เปิดหน้าต่อสู้สำเร็จ**
6. **ฉากสถานีโซนปัจฉิม 3 หลังใหม่** — fetch ตรง `img/West/st-dab-west.png`, `st-krata-west.png`,
   `BG-Lokan-west.webp`, `BG-Ngiw-west.webp`, `BG-Sala-west.webp`, `Intro-Boss-Zone3-west.png`
   → **ทุกไฟล์ตอบ 200 ครบ**
7. **console error** — `pageerror` (JS exception จริง) = **0 ตลอดทั้ง flow** · `console.error`/404 ที่เจอมีแค่
   `img/hero-yama-side.png`, `audio/bgm-title.*`, `audio/bgm-zone.*`, `audio/bgm-trial.*`,
   `audio/bgm-battle.*` — ไล่ดูแล้วทั้งหมดเป็น **asset เสริมที่ไม่เคยมีอยู่ในไฟล์เก่าเลยสักคอมมิต** (เช็ค
   `git log` ของไฟล์เหล่านั้น = ไม่มี) และโค้ดมีคอมเมนต์ยืนยันว่าออกแบบให้ fallback เงียบไว้ตั้งแต่ต้น
   ("ไม่มีไฟล์ก็เงียบ ไม่พัง ไม่ error" ใน `sfx.js`, "ถ้ามีไฟล์ ไม่มีก็ท่ายืนตรงตามเดิม" ใน `ui.js`) —
   **ไม่ใช่ error ใหม่จาก batch A–G** เป็นช่องว่าง asset เดิมที่มีอยู่ก่อนแล้ว

**ผลข้อ 5: PASS**

---

## สรุป

# PASS

ครบทั้ง 5 หัวข้อตามที่ขอตรวจ: syntax + manifest สะอาด, 29 สำนวนใหม่ครบฟิลด์/ไม่ชนกัน/ถอดข้อความ Rae ถูกคำต่อคำ
(ตรวจ 100% ไม่ใช่สุ่ม), บทสุ่ม 6 ชุดครบจำนวนตามสเปกและกันซ้ำไม่มีความเสี่ยง infinite loop/ว่างเปล่า,
`prep-art.py` แก้ตรงจุดไม่กระทบ asset อื่นและไม่ลบไฟล์ raw, และ smoke test ผ่านครบ trial→battle→ฉากใหม่
ไม่มี JS error ใหม่ (404 ที่เจอเป็น asset เสริมเดิมที่ไม่เคยมี ไม่เกี่ยวกับ batch นี้)

ไม่มีข้อแก้ไขที่ต้องส่งกลับ Toby

## หมายเหตุ

- ไม่ได้ตรวจ/แตะ `index.html`, `src/ui.js` เวอร์ชันปัจจุบันในดิสก์ เพราะมี WIP ของ Toby ปนอยู่ (นอกขอบเขต
  batch A–G) — สิ่งที่ตรวจคือ commit `eb44cd5` ที่ push แล้วเท่านั้น ผ่าน `git show`/isolated worktree
- Part C (หน้าต่างสอบสวนหดแคบ) ที่ Toby รายงานว่า reproduce ไม่ได้: การทดสอบรอบนี้ก็ไม่พบอาการเดิมเช่นกัน
  (กว้างคงที่ 1180px ตลอด) สอดคล้องกับที่ Toby สรุปไว้ — ถ้าคุณเป้เจอซ้ำอีกยังต้องขอ repro steps จริง
  (เบราว์เซอร์/ขนาดหน้าต่าง) เพราะไม่มีจุดในโค้ดที่ปัจจุบันจะทำให้ width เปลี่ยนได้
