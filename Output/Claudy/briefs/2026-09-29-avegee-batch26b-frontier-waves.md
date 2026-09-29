# ใบงาน: AVEGEE ชุด 26B — event "ปีศาจฝ่าชายแดน" 3 wave + บอสยักษ์ผู้คุมชายแดน (โซน 1)

**เจ้าของ:** Codex (`--write` บน branch `codex/<run_id>`) · **ผู้สั่ง:** Claudy · **ตรวจ+merge:** Dale
Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` — ฐาน main `472ff6f` (มี 26A แล้ว: `battle.foes[]`, `ZONE_EVENTS`, prisonBreak) · เทสต์ `node --test tests/*.test.mjs`
**แผน:** `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Astra/runs/20260929T122303Z-642e9dc3/report.md` หัวข้อ 2 + 26B ในหัวข้อ 6 · รีวิว 26A: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-09-29-avegee-batch26a-review.md` (อ่านบั๊กที่ Dale แก้ใน `52fc991` — `view.dmg` ต่อ foe, `.prisonfab` pointer-events/ตำแหน่ง — ต่อยอดแบบเดียวกัน)
ที่มา: คุณเป้ — "มีหน้าต่างเด้งเตือน!! มีปีศาจฝ่าชายแดนเข้ามาหลายตัว Yama กับทีมยมทูตต้องไปที่ชายแดน สู้กับปีศาจ 3 wave (ใช้ตัวละครปีศาจเก่า) และ wave สุดท้ายเป็นบอส"

## ⚠️ ชื่อและภาพบอส (ตัดสินแล้ว)
- **ห้ามใช้ชื่อ "ทศกัณฑ์" และห้ามใช้ภาพ `img/raw/Boss-frontier1.png`** (Reese: ภาพ 1 หน้า 4 กร ถือจักร/สังข์/คทา อ่านเป็นพระนารายณ์/พระราม) → บอสชื่อ **"ยักษ์ผู้คุมชายแดน"** (EN: "Frontier Yaksha Warden")
- ภาพใหม่คุณเป้จะ gen ภายหลัง → ใช้คีย์ภาพ `boss-frontier-th` ที่ถ้ายังไม่มีไฟล์ ให้ **fallback เป็นภาพปีศาจเดิมที่ขยายใหญ่** (เช่น ตัวใหญ่สุดใน `MOB.kinds` ของโซนไทย) — ห้าม fallback เป็น Boss-frontier1 · วางไฟล์ `img/boss-frontier-th.png` แล้วเกมใช้ได้ทันทีโดยไม่ต้องแก้โค้ด (ใส่ใน manifest/preload ตามระบบเดิม)

## ขอบเขต
1. เพิ่ม `frontierBreach` ใน `ZONE_EVENTS.th` ตามโครงหัวข้อ 4 ของแผน: `mode:'waves'`, ทริกเกอร์เมื่อ `zoneCases.th` ถึง **5** (หลัง prisonBreak เคลียร์แล้ว — ถ้า prisonBreak ยัง pending ให้รอ)
2. หน้าต่างเตือน "⚠️ ปีศาจฝ่าชายแดน!" → ปุ่ม "รวมทีมไปสกัด" → หน้าจัดทีมชายแดนเดิม (`frontierOf(zone).team`) → ฉากสู้ **3 wave ต่อเนื่องในฉากเดียว**:
   - W1 ปีศาจ 1 ตัว HP 55 · W2 ปีศาจ 2 ตัว HP 40 · W3 **ยักษ์ผู้คุมชายแดน** HP 120 โจมตี 10–16 (ใช้ปีศาจของโซนไทยจาก `MOB.kinds`)
   - ระหว่าง wave: ป้าย "Wave 2/3" + ฟื้นบารมี 20 (ไม่เกินสูงสุด) · เปลี่ยน wave หลังแอนิเมชันจบ (`pendingWave`) · `over='win'` หลัง W3 เท่านั้น
   - ทีมยมทูตที่จัดไปช่วยได้ตามระบบ `CREW_POWER` เดิม · ยักษ์ช่วยเหมือนเดิม
   - ชนะ +120 เบี้ย + ของสนามรบ 1 ชิ้น · แพ้ บารมี −8 → pending ท้าซ้ำได้ (ปุ่มมุมจอแบบ `.prisonfab`) ไม่แจกซ้ำ · **ไม่เพิ่ม `frontier.clears` หรือ `bossCleared`**
   - บทพูดบอส 1 ประโยค (ไม่อ้างรามเกียรติ์/เทพใด) · ข้อความไทย+อังกฤษ
3. แผนที่ชายแดนเดิม (`frontier.js`) ยังเป็นกิจกรรมอิสระเหมือนเดิม ไม่แตะ
4. **สืบบั๊ก:** Dale พบว่าปุ่มสะกดจิตในฉากสู้กดแล้วไม่มีผล (เซฟทดสอบรอบ 26A) — หาสาเหตุ แก้ถ้าเป็นบั๊ก รายงาน

## ข้อห้าม
- ไม่เปลี่ยนตัวเลขสมดุลของการสู้เดิม · ไม่แตะ gate บอสพี่ชาย / เทวดา (ชุด 26C) · ไม่มี alert/confirm/prompt
- ไม่แตะ `CONCEPT.md`, `files/`, `Exam/`, `output/`, `img/raw/*` · ไม่ใช้ `Boss-frontier1`

## เกณฑ์รับงาน (Dale ตรวจในเบราว์เซอร์ 1440×810 + 390×844)
1. prisonBreak เคลียร์ + ถึงคดี 5 → หน้าต่างเตือนขึ้นตอนว่าง → จัดทีม → 3 wave ต่อเนื่อง ฟื้นระหว่าง wave ถูก ป้าย wave ชัด → ชนะได้รางวัลครั้งเดียว · แพ้ท้าซ้ำได้
2. บอสแสดงชื่อ "ยักษ์ผู้คุมชายแดน" ภาพ fallback ไม่มีสัญลักษณ์ศาสนา · วางไฟล์ `img/boss-frontier-th.png` ทดสอบ (ไฟล์ชั่วคราวใดก็ได้ ไม่ commit) แล้วเกมใช้ภาพนั้น
3. ฉากสู้เดิม + prisonBreak ยังทำงาน · `frontier.clears`/`bossCleared` ไม่เปลี่ยน · เซฟ/โหลดกลาง event → pending เริ่ม W1 ใหม่
4. `node --test tests/*.test.mjs` ผ่าน + เทสต์ใหม่ (wave, heal, reward once, ไม่แตะ clears) · ไม่มี console error ใหม่
