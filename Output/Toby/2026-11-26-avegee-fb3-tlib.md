# Toby — FB3-T-LIB · ศึกปลดปล่อยเมือง + ศึกสุดท้าย (L1–L6)

ใบงาน `Output/Claudy/briefs/2026-11-26-avegee-fb3-tlib-liberation.md` · worktree `~/agapae-work/.toby-worktrees/fb3` branch `toby/fb3` (ฐาน main `1e4f8ba2`) · ไม่ merge / ไม่แตะ main / ไม่ใช้ z1-v5

## ข้อ 0 — ลำดับเล่นจริง "เดิม" (อ่านโค้ดก่อนแก้) เทียบกับที่คุณเป้สั่ง

ของเดิม T8c (`seized.js` `signal-arc.js` `z4g-return.js` `game.js` `ui.js`):
1. หลังหุ่น AI Scammer (คดี 10 โซน 4) ล้ม → โซน 1–3 ถูกยึด · ท่าเรือล็อก · ยมทูตยืนนิ่งตาเขียว · เดินกลับทีละโซน 4→3→2→1 (`walkBackTarget`)
2. ถึงประตูชายแดนของโซนที่ถูกยึด → ฉาก `zN-guard-signal` → หน้าต่าง "ปลดสะกด <Guard>" → **ศึกเดี่ยว Guard (hypno)** ทีม `expeditionParty` = **ยามา + นิรา อยู่แล้ว** (`guardGuest:false`)
3. ชนะ → ฉาก `zN-fire` (เมืองไหม้ · บรรทัดท้ายของ Guard บอก **"ข้าจะอยู่เฝ้าประตู"** = Guard ไม่เข้าทีม) → เดินเข้าเมือง
4. อีเวนต์ `signalTh/Asia/West` (ชายแดน): ระลอก 1 = ยมทูต 5 คนถูกสะกด · ระลอก 2 = บอสชายแดนถูกสะกด → ทีม = **จัดเองได้** ในหน้าเตรียมทีมชายแดน (`frontierOf().team`) ซึ่งยมทูตในเมืองถูกสะกดอยู่แต่หน้านั้นยังให้เลือก · Guard **ไม่ได้อยู่ในทีม**
5. หลังชนะ → `zN-restored` + ท่าเรือเปิด · ศึกสุดท้ายเปิดที่ **10 คดี** · ตัว Guard/เซอร์เบอรัส/เมืองบนแผนที่: **ไม่มีสภาพถูกควบคุม ไม่มีไฟ** (มีแต่ภาพคัตซีน `cut-zN-fire`)

ส่วนที่ต่างจากที่คุณเป้สั่ง (แก้เฉพาะนี้): L1 (10→15) · L2 ทีมบังคับ (ศึก Guard เป็น duo อยู่แล้วแต่หน้าไม่บอก · ศึกบอสยังจัดทีมเองได้) · L3 (Guard ไม่เข้าทีม ไม่มีฉากนิราปลดปล่อย) · L4 · L5 (ไม่มีไฟบนแผนที่)

## ลำดับเล่น "ใหม่"
1. ถึงประตูโซนที่ถูกยึด → ฉากผู้เฝ้าด่านถูกสะกด → หน้าต่าง "ปลดสะกด" มี **"ทีมบังคับ: ที่ประตู ไปได้แค่ ยามา กับ นิรา"** รูปยามา+นิรา และบรรทัด 🔒 บอกว่ายมทูตคนอื่นถูกสะกดอยู่เข้าทีมไม่ได้
2. สู้ Guard (ถูกสะกด · มีเส้นสแกนเขียว) ทีม ยามา+นิรา
3. ชนะ → **ฉากใหม่ `zN-guard-freed` นิราปลดปล่อย Guard จากการสะกด** ("ปลดแล้วค่ะ คำสั่งนั้นไม่ใช่ของท่านอีกต่อไป" → Guard "ข้าจะไปกับท่าน") → ฉากเมืองไหม้ (`zN-fire`, บรรทัด Guard เปลี่ยนเป็น "ข้าจะไปกับท่าน" แทน "เฝ้าประตู")
4. เดินเข้าประตูชายแดน (ไปหาบอส) → **หน้าเตรียมทีมของบอส = ทีมบังคับ ยามา + นิรา + Guard** (ที่เพิ่งปลดสะกด) ไม่มีปุ่มเลือกยมทูต มี 🔒 ยมทูตถูกสะกดทั้งเมือง → สู้ระลอก 1 (ยมทูตที่ถูกสะกด 5 คน) → ระลอก 2 บอสชายแดนถูกสะกด โดยมี **Guard ยืนในทีม** (`guardGuest`)
5. ชนะ → `zN-restored` → ท่าเรือเปิด → โซนถัดไป (ลำดับ 4→3→2→1 เดิม) · ศึกสุดท้ายโซน 4 เปิดที่ **15 คดี**

## สิ่งที่ build
| ข้อ | ผล |
|---|---|
| **L1** | `cyberFinal.atCases` 10→**15** (`data.js`) · ไม่มีข้อความไหนบอกจำนวนคดีของศึกสุดท้าย (ไล่ `z4h-*` NF-1 · alert/ป้าย/คู่มือ: ไม่เจอ) · เซฟเก่าที่ศึกสุดท้าย pending อยู่แล้วแต่คดี <15 → **คงสถานะ pending ไว้ ไม่ล็อกผู้เล่น** (`refreshZoneEvents` ไม่เคยถอด pending) — ตัดสินเอง ทดสอบแล้ว |
| **L2** | หน้าต่างปลดสะกดมีบล็อก "ทีมบังคับ" + เหตุผลที่คนอื่นเข้าไม่ได้ · หน้าเตรียมทีมของศึกบอสในโซน 1–3 (ขณะถูกยึด) เป็นทีมบังคับ ไม่มีการ์ดเลือก (`forcedTeam` ใน `openFrontier`) · ปุ่มเริ่มใช้ได้เสมอ |
| **L3** | `winStories` ของ returnGuard = [`zN-guard-freed`, `zN-fire`] · ศึกบอส/ยมทูตที่ถูกสะกด: `guardGuest = Guard ยืนอยู่` (ไม่มี Guard = duo ไม่พัง) · ศึกบอสยังถูกปฏิเสธถ้ายังไม่ปลดปล่อย Guard (เดิม) · **แก้บั๊กที่เจอ:** เดินถึงประตูแล้ว `openBorder` เปิดหน้าชายแดนธรรมดา (ไม่ใช่หน้าทีมของบอส) เพราะ auto-open ชนะ march check → ส่งไปหน้าทีมของบอสเมื่อรับทราบแจ้งเตือนแล้ว |
| **L4** | Guard + เซอร์เบอรัสบนแผนที่ มี **สายตาเขียว + เส้นสแกนเขียว** (`drawControlledMark` ลุคเดียวกับ `.signal-controlled`) ตั้งแต่ถูกยึดจนนิราปลดปล่อย Guard · ยมทูตระลอก 1 + ตัวประกอบ/กองทัพในฉากชายแดนของ signal ก็มีเส้นเขียว (เดิมมีแค่บอส) · ในศึก Guard/ยมทูต/บอสมี `hypno` + `signal-controlled` อยู่แล้ว (เดิม) |
| **L5** | `city-fire.js`: เปลวไฟ + แสงส้ม + ควันบาง **วาดด้วยโค้ด** บนอาคาร/บ้าน (ไม่วาดแผนที่ใหม่ ไม่ใช้รูปไฟ) · โซน 1–3 เท่านั้น · หายทันทีเมื่อปลดปล่อยโซน (`zoneSeized`) · งบ: **สูงสุด 12 จุด (5 บนจอเล็ก <620px) · ไม่มีควันบนจอเล็ก · ลดการเคลื่อนไหว = ภาพนิ่ง 1 เฟรม · ไม่วาดเมื่อ paused (ภาพนิ่ง)** · คัตซีน `cut-zN-fire` ใช้ชื่อเดิม ไม่แตะ |
| **L6** | `recommendedBuild` ข้ามสถานีที่ล็อกด้วยเหตุการณ์เนื้อเรื่อง (หอส่องกรรมก่อนได้ตะเกียง) ไปแนะนำตัวถัดไป (โรงอาหาร) · ที่ล็อกด้วยขั้นยังหยุดเหมือนเดิม |

## ไฟล์ที่แตะ
ใหม่: `src/city-fire.js` `src/liberation-text.js` `tests/fb3-tlib-liberation.test.mjs` `tests/fixtures/fb3-tlib-runtime-changes.json` `scripts/build-fb3-tlib-hash-fixture.py`
แก้: `src/data.js` (L1 บรรทัดเดียว) `src/game.js` `src/signal-arc.js` `src/seized-keys.js` `src/z4g-return.js` `src/ui.js` `src/scene.js` `src/breach-approach.js` `src/frontier.js` `src/unlocks.js` `index.html` (cache tag `-fb3tlib`) `tests/balance2.test.mjs`
ไม่แตะ: ภาพทุกไฟล์ · สูตร/ตัวเลขศึก (hp/atk/คูลดาวน์) · ระบบอัญเชิญ · z1-v5
commit (`toby/fb3`): `a4c8247c` L1 · `80a561f5` L2 L3 · `79da23db` L4 L5 · `e4f9bb09` L6 · `fe6b889c` เทสต์/แท็ก · · `HEAD` ปรับลุคสายตา/T1c/เทสต์ศึกสุดท้าย 15 คดี

## ผลเทสต์
เทสต์ใหม่ 7 (`fb3-tlib-liberation`): 15 คดี+เซฟเก่า · ทีมบังคับ (3 โซน) · Guard เข้าทีมหลังชนะ + ปฏิเสธบอสก่อนปลด + ไม่มี Guard ไม่พัง · เซฟเก่า (cleared / active→pending) · สภาพถูกสะกด · ไฟไหม้เปิด/ปิด/งบ · แนะนำสิ่งปลูกสร้าง → **7/7 ผ่าน** · `balance2` ผ่าน (fixture ใหม่)
เต็มรอบ `--test-concurrency=6` → **`ℹ tests 2634 · pass 2634 · fail 0`** (ปรับเทสต์ที่สร้างศึกสุดท้ายที่ 10 คดีให้เป็น 15: `final-event-helpers` `balance28b` `e1-signal-quests` · `city-fire.js` ผูก GPU-loss epoch ตาม T1c audit)

## ภาพ/เฟรม (`Output/Review/2026-11-26-fb3-tlib/`)
เล่นจริง Chromium 1792×1120 โซน 1 ครบ: `th-1-guard-intro` → `th-2-duel-window` (ทีมบังคับ) → `th-3-duel-battle` (ยามา+นิรา vs Guard เส้นเขียว) → `th-4b-battle-won` → `th-5-story-1` (นิราปลดปล่อย) → `th-6a-gate-alert` → `th-7-lord-walk` → `th-8-lord-near` (ยมทูต/บอสมีเส้นเขียว) → `th-9-lord-team-page` (ทีมบังคับ ยามา·นิรา·กุมภัณฑ์)
ไฟไหม้ 3 โซน: `fire-th/asia/west-1792` · หลังปลดปล่อย `fire-gone-after-liberation-*` · Guard ก่อน/หลัง `controlled-vs-freed-guard-crop` · 390×844: `fire-th-390` `controlled-guard-th-390` `guard-freed-th-390`
**ไม่ได้ทำ:** เฟรมไฟไหม้โซน 4 — ใบงานบอก "4 โซน" แต่โซน 4 (ฐานของการยึด) ไม่ถูกยึด/ไม่ไหม้ตามกติกาเดิม (`zoneSeized` ไม่รวมโซน 4) ผมจึงไม่ใส่ไฟโซน 4 · ถ้าคุณเป้ต้องการไฟที่โซน 4 ด้วย บอกมา (เปลี่ยนเงื่อนไขเดียวใน `cityFireOn`)
ไม่ได้เล่นถึงท้ายสุด (ชนะศึกบอสระลอก 2 → `zN-restored`) ในเบราว์เซอร์ — ตรวจด้วยเทสต์ที่ระดับเกม + เห็นหน้าทีมบอสจริง · ศึกบอสเอง (ระลอก 1–2) เริ่มจากหน้าทีมแล้วมีตัวเลือก "เรียกคำฝาก/บุกทันที" (เดิม) ซึ่งสคริปต์ผมกดไม่ผ่านจนเห็นหน้าศึก → ขอ Chris/Kittanate เล่นตอนนี้ต่อจากหน้าทีมบังคับ

## วิธีรัน/ทดสอบเอง
```
cd ~/agapae-work/.toby-worktrees/fb3   # เซิร์ฟเวอร์ threaded พอร์ต 8970 (เหมือน T5)
# คอนโซลเกม: ตั้งโซน 1 ถูกยึด
G.zoneEvents.cyberhell={cyberRescue:'cleared',cyberBreach:'cleared',cyberSala:'cleared',cyberSignal:'cleared'};
G.zoneEvents.west={westHypnotized:'cleared',westVampireBreach:'cleared',westDevaTest:'cleared',signalWest:'cleared',returnGuard:'cleared'};
G.zoneEvents.asia={asiaPrisonFire:'cleared',asiaDevaTest:'cleared',asiaWukong:'cleared',asiaRageBreach:'cleared',signalAsia:'cleared',returnGuard:'cleared'};
G.zoneEvents.th={prisonBreak:'cleared',devaTest:'cleared',frontierBreach:'cleared',sitaHanuman:'cleared',khunPhaen:'cleared',thBorderBoss:'cleared',returnGuard:'pending'};
G.zone='th'; (ต้องมี G.guard — จ้าง/ได้จากศึกชายแดนโซน 1) ; G.onChange()
```
1. ดูเมืองบนแผนที่: เปลวไฟบนอาคาร/บ้าน · Guard ตาเขียวมีเส้นสแกน
2. เดินลงไปประตูชายแดนล่าง → ฉากผู้เฝ้าด่าน → หน้าต่างปลดสะกด (ทีมบังคับ) → สู้ → ฉากนิราปลดปล่อย → ฉากเมืองไหม้
3. กลับเข้าประตู → หน้าทีมของบอส (ยามา·นิรา·Guard) → สู้
4. ชนะบอส → ไฟหาย Guard เลิกตาเขียว

## ข้อความตัวแทนที่ต้องส่ง Rae (R2)
| ที่ | ไทย | อังกฤษ |
|---|---|---|
| ฉาก `zN-guard-freed` (นิราปลดปล่อย · `z4g-return.js` `guardFreedStory`) | บรรยาย: <Guard>ทรุดเข่าลงกลางประตู แสงเขียวในตายังวูบวาบ นิราก้าวออกมาข้างหน้า ยกแผ่นกระจกขึ้นเหนือไหล่เขา เส้นแสงเขียวที่พาดตาแตกเป็นเสี่ยงแล้วจางหายไป / นิรา: "ปลดแล้วค่ะ คำสั่งนั้นไม่ใช่ของท่านอีกต่อไป" / <Guard>: "ข้ากลับมาเป็นตัวข้าแล้ว ข้าจะไปกับท่าน" | Narration: <Guard> sinks to one knee in the gateway, the green light in his eyes still flickering. Nira steps forward and raises her mirror over his shoulder. The green line across his eyes shatters and fades. / Nira: "It is broken. That order is no longer yours." / <Guard>: "I am myself again. I will go with you." |
| บรรทัดท้ายฉากเมืองไหม้ ของ Guard 3 โซน (`GUARD_RELEASE` — เดิม "ข้าจะอยู่เฝ้าประตู" แก้ให้ไปด้วย) | กุมภัณฑ์: "ในที่สุดข้าก็วางกระบองลงได้ ขอบคุณท่าน ไปช่วยคนในเมืองกันเถิด ข้าจะไปกับท่านเอง" · กวนอู: "เสียงนั้นหายไปแล้ว ท่านช่วยข้าไว้ พวกเขายังต้องการท่าน ไปเถิด ข้าจะไปด้วย" · แวน เฮลซิง: "เสียงในหัวข้าเงียบแล้ว ขอบคุณท่าน ทั้งห้าคนยังอยู่ใต้คำสั่ง ข้าจะไปช่วยท่านปลดพวกเขาเอง" | Kumphan: "At last I can lower my club. Thank you. Let us go and help the people inside. I am coming with you." · Guan Yu: "The voice is gone. You freed me. They still need you. Let us go. I am coming with you." · Van Helsing: "The voice in my head is gone. Thank you. The five reapers are still under its orders. I will go with you and free them." |
| ป้ายทีมบังคับ (`liberation-text.js`) | ทีมบังคับ · ที่ประตู ไปได้แค่ ยามา กับ นิรา · ยามา · นิรา · {Guard} (ที่เพิ่งปลดสะกด) · ถูกสะกดอยู่ เข้าทีมไม่ได้ · ยมทูตทุกคนในเมืองถูกสะกดอยู่ จึงเข้าทีมไม่ได้ | Fixed team · At the gate only Yama and Nira can go · Yama · Nira · {guard} (just freed) · Under the spell - cannot join · Every reaper in the city is under the spell and cannot join |
หมายเหตุ: ฉากทั้งสองใช้ภาพ `cut-zN-guard-hypnotized-frontier` เป็นภาพชั่วคราว (ฉากปลดปล่อยอยากได้ภาพ "นิรายกกระจกเหนือ Guard ที่ทรุดเข่า แสงเขียวแตก" ถ้า Codex วาดได้ ตั้งชื่อ `cut-z{1,2,3}-guard-freed.webp` 1672×941 ทึบ ไม่มีตัวอักษร — ตอนนี้ยังไม่ผูกชื่อนี้ ถ้าต้องการบอก)

## ที่ตัดสินเอง / ไม่แน่ใจ
1. **ทีมศึกบอส = ยามา + นิรา + Guard** (3 คน) ตามคำสั่ง · ถ้าไม่มี Guard = 2 คน · ผมไม่ปรับตัวเลขบอส (`partyScale` ของ signal อิงจำนวนทีม 3/5/7 อยู่แล้ว แต่ศึกจริงจะมีทีม 2–3 คน ซึ่ง = ขนาด 3 ในตาราง → ความยากอาจต่างจากที่ซิม) → **ต้อง T11 ซิม**
2. ยมทูตระลอก 1 (5 คนถูกสะกด) ใช้ข้อมูลเดิม (`controlledCrew`)
3. L1: คดีสุดท้ายโซน 4 ตอนนี้ต้อง 15 คดี — เซฟที่ถึง 10–14 คดีและศึกสุดท้ายยังไม่ pending จะรออีก 5 คดี (ตามคำสั่ง)
4. ไฟไหม้ไม่รวมโซน 4 (ดูด้านบน) · ไฟอยู่เฉพาะขณะ `zoneSeized` (คือหลังหุ่นคดี 10 ล้ม จนปลดปล่อยโซนนั้น) ไม่ใช่ตั้งแต่ Guard ถูกสะกดก่อนหน้านั้น
5. Guard ที่ไม่ได้จ้างไว้ (เซฟที่ไม่มี Guard ในโซนนั้น): ไม่มีตัวให้แสดงตาเขียว/เข้าทีม — ทำเป็น duo ไม่พัง
6. สภาพสะกดบนแผนที่เป็นเส้น+สายตาที่วาดทับสไปรต์ (ไม่แก้ภาพ) — ตำแหน่งตาเป็นค่าประมาณ ตัวละครเดินอยู่อาจเยื้องเล็กน้อย
7. ศึกยังไม่ได้ซิมสมดุล (T11) · ไม่เล่นศึกบอสจนจบในเบราว์เซอร์ (ดูด้านบน)

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่บังคับ: `cut-z{1,2,3}-guard-freed.webp` (ดูหมายเหตุด้านบน) · ไม่มีอย่างอื่น

## สิ่งที่ยังไม่ทำ
ซิมสมดุลศึกบอสที่มี Guard (T11) · ข้อความจริงของ Rae · ไฟโซน 4 (ถ้าต้องการ) · merge/push main
