# AVEGEE P4 — รายงาน Toby (ใบวินิจฉัย · ไอคอนพลัง · กดคุยตัวละคร)

worktree `/Users/agapae/agapae-work/.toby-worktrees/p4` · branch `toby/p4-build` (จาก main `c1cd99f`) · **HEAD `40e19d7`** · ยังไม่ merge/push (Dale)

## Commit แต่ละช่วง
| ช่วง | commit | เนื้อหา |
|---|---|---|
| 1 | `84dfdad` | field `finish()` (stationK/keeperK/keeperName/need/servedAt/remorse) · `CREW_POWER` metadata · ดึงภาพ Codex 22 ไฟล์ (เฉพาะรูป) |
| 1b | `4550c16` | **D1 ใหม่ของคุณเป้**: remorse = สูตรตายตัว `calcRemorse` (ไม่สุ่ม) + เทสต์จำลองทุกคดี |
| เล็ก | `0ad233d` | ปุ่ม "?" แถวบารมีในโปรไฟล์ยามา → `explainBar('hp')` |
| 2 | `0338371` | ใบวินิจฉัย (ตะราง+ประตูสวรรค์) + `talk-lines.js` ของ Rae ครบ 174 บท |
| cache | `b8e0b65` | cache-bust ผ่าน importmap `-p4` · แก้ regex เทสต์ p8 / 30a |
| 3 | `51a7c92` | ไอคอนพลัง 5 จุด + แผ่นรายละเอียดพลัง |
| 4 | `317251d` | กดคุยตัวละคร (hit-test คนงาน, 💬/E, เดินเข้าหา, บับเบิล, บทนิรา/พ่อค้า) · ลบ dead code |
| 5 | `40e19d7` | จัดระเบียบ CSS/คลาสชน |

## สเปก → ทำแล้ว/ข้าม
| ข้อ | สถานะ |
|---|---|
| 1 field finish() + remorse + CREW_POWER | ทำแล้ว (`src/remorse.js`, น้ำหนักที่ `data.js REMORSE`) — gate entry จากสถานีประตูสวรรค์ไม่มี remorse (ไม่ผ่านตะราง) ใบแสดง "ไม่มีข้อมูล" |
| 2 ใบวินิจฉัยเฟส 1 | ทำแล้ว: เปิดจากแถวรายชื่อ (ชื่อ/ปุ่ม 🔍) และป้ายลอยเหนือหัววิญญาณที่ยืนรอ (≤3 ดวง) · ‹ › + ปัดซ้ายขวา + ลูกศร · ปิด Esc/✕ · พักเกมตอนเปิด คืนตอนปิด · ปุ่มหลักเรียกฟังก์ชัน+แอนิเมชันเดิม แล้วเปิดดวงถัดไปที่ต้องทำเอง · D2 ล็อก "ยังไม่ตรวจ" · D4 ดวงขังรอ = ข้อมูลสาธารณะ+ล็อกตัวชี้วัด · D5 เผยความจริงทั้งหมดหลังรับทัณฑ์ · breakdown 3 ส่วนหลังนิราตรวจ · เซฟเก่า = "ไม่มีข้อมูล" ไม่เดา |
| 3 ไอคอนพลัง | ทำแล้ว: ป้ายท่าสู้ (ขวาล่าง 34/30px) + ป้ายหน้าที่ (ซ้ายล่าง 26px) ที่ `openNiraOffice` (ทั้งการ์ดยักษ์) · โปรไฟล์ยามาแท็บทีม · แท็บทีมแถบล่าง · frontier-card · แผงข้อมูลยมทูต · แตะ = แผ่นรายละเอียด (ผล/คูลดาวน์+กำลังใจ/หน้าที่คุมงาน/จ้างหรือเข้า-ออกทีม) ตัวเลขจาก `crewAbility`/BATTLE/GUARD ชุดเดียวกับโต๊ะนิรา |
| 4 กดคุย | ทำแล้ว: `hitActor` เพิ่ม `worker` + เลือก "ตัวใกล้จุดแตะสุด" · ปุ่ม 💬 + E (ระยะ 70, สิทธิ์ต่ำสุด รองจากสถานี/นิรา/พ่อค้า/ท่าเรือ/จุดสร้าง/ประตูชายแดน) · แตะใกล้ = เปิดทันที+select · แตะไกล = เดินเข้าหาแล้วเปิดเอง (ยกเลิกเมื่อเดินเอง/แตะที่อื่น/15 วิ) · บับเบิลตามตัว หายเอง 6 วิ/ห่าง >140 · "ถัดไป ›" วน 3 บท · Esc ปิด · Enter/E ถัดไป · ไม่หยุดเกม · `g.talk.seen` ลงเซฟ · บรรทัดทักบนหัวกล่องนิรา/พ่อค้า |
| 5 สลับ emoji → ไอคอน Codex | ทำแล้ว: ใช้ไฟล์ Codex ตรง ๆ ครบ 22 ไฟล์ (power 7 · job 6 · remorse/deterrence 2 · seal 3 · icon-talk · pin 3) — **ไฟล์เป็น .webp ตาม Codex ไม่ใช่ .png ตามสเปก** · เหลือ emoji เฉพาะ 🔍 ปุ่มเปิดใบ, 🔒 ล็อก, ✓✗ |
| 6 ข้อเล็ก | `kanClueWhy`/log "MP" → ถูกแก้ไว้แล้วตั้งแต่ P3 (มีเทสต์คุม) ไม่ต้องแตะ · Space/tryFight: โค้ดเดิมคืนค่าเมื่อ `dlg.open` อยู่แล้ว (มินิเกมห้องอยู่ใน dlg) เพิ่มเงื่อนไขกัน `#mg-ov`/`.st-diag` เป็นชั้นที่สอง · ลบ `talkKan()` + `room.nearKan/kanWait` (ไม่มีใครเรียก) |
| ข้ามไว้ | บทวิญญาณในห้องทัณฑ์ (`cellSoul` 15 บท) — Vera §4.1 ระบุเฟส 2 · เมนู ⋯ ปุ่มรองในใบ (ไม่มีปุ่มรองจริง) · เลย์เอาต์มือถือแนวนอน 844×390 ออกแบบเป็นแค่ 2 คอลัมน์/เลื่อนได้ (Vera ยังไม่ออกแบบ) · ใบวินิจฉัยจากห้องสถานีลงทัณฑ์ (D3 เฟส 2) · บทภาษาอังกฤษของ Rae ไม่มี (บทพูดเป็นไทยทั้งหมด) · ข้อความหน้าที่คุมงานในแผ่นพลัง (`keeperRole`) เป็นไทยเดิมจาก P2 ไม่มี EN |

## สูตร remorse (D1 ใหม่ — คำนวณตายตัว ไม่สุ่ม)
คำนวณครั้งเดียวตอน `finish()` เก็บใน `entry.remorse = {total, parts:{keeper,intensity,trait}, detail}` · `inspectPrison`: `repentant = total >= 60` (`REMORSE_PASS`) · เซฟเก่าไม่มี remorse → ใช้การสุ่มเดิม · ใช้เฉพาะข้อมูลที่เกมมี (สี trait ใน `interrogation.js`, `tham` ของ `judge()`, วาระที่ให้/สมควร) · น้ำหนักทั้งหมดที่ `data.js REMORSE`
```
total   = round(keeper + intensity + trait)           (เต็ม 100)
keeper  = 25 × ( fit×0.7 + stationFit×0.3 )
            fit        : ผู้คุมตรงสีนิสัย = 1 · ทัณฑ์/ดำ (ไม่ผูกสี) = 0.6 · คนละสี = 0.15
                         (กานต์=ม่วง ปิดบัง · เพลิง=แดง ดื้อ · บุญ=เขียว ยอมรับ)
            stationFit : verdict.tham / 100   (ความตรงของสถานีกับกรรม)
intensity = 45 × max(0, 1 − 0.25×เบาไป − 0.45×หนักเกิน)   (เบาไป/เกิน = วาระที่สมควร เทียบวาระที่ให้ เหมือน judge())
trait     = 30 × { accepting 1 · concealing 0.6 · resisting 0.35 }
ผ่าน (เข็ดแล้ว) เมื่อ total ≥ 60
```
ผู้บริสุทธิ์ที่ถูกลงทัณฑ์ = สมควร 0 → "หนักเกิน" ทุกวาระ (เดิมผ่านเสมอ เพราะ short=0) — **วาระ 1 ยังผ่านได้** (ผู้คุมบุญ/ทัณฑ์/ดำ/กานต์ตามสีนิสัย) · วาระ 2 ขึ้นไปไม่ผ่านเลย ดูตารางในหัวข้อ "รอบแก้ตาม Reese"

### อัตราผ่าน เก่า vs ใหม่ (จำลองคดีใน cases.js ทุกคดีที่ไม่ใช่ผู้บริสุทธิ์ 42 คดี × ผู้คุม 5 × วาระ 1–5 = 1,050 ชุด · สถานีตรงกรรมที่สุด) — `tests/p4-remorse.test.mjs` พิมพ์ตารางนี้ทุกรอบ
| กลุ่ม | จำนวนชุด | เดิม | ใหม่ |
|---|---|---|---|
| ตรงวาระ (เบา=0 เกิน=0) | 210 | 100% | **100%** |
| เบาไป (short>0) | 540 | 30% | **29.3%** |
| &nbsp;&nbsp;เบาไป 1 | 185 | 30% | 67.6% |
| &nbsp;&nbsp;เบาไป 2 | 175 | 30% | 18.9% |
| &nbsp;&nbsp;เบาไป 3 | 150 | 30% | 0% |
| &nbsp;&nbsp;เบาไป 4 | 30 | 30% | 0% |
| หนักเกิน (cruel) | 300 | 100% | **28.7%** (เปลี่ยนตามที่คุณเป้สั่ง) |
| &nbsp;&nbsp;เกิน 1 | 180 | 100% | 43.3% |
| &nbsp;&nbsp;เกิน 2 | 60 | 100% | 13.3% |
| &nbsp;&nbsp;เกิน 3 | 35 | 100% | 0% |
| &nbsp;&nbsp;เกิน 4 | 25 | 100% | 0% |
| ตรงวาระ แยกตาม trait (accepting/concealing/resisting) | 55/95/60 | 100% | 100% ทั้งสาม |
| ตรงวาระ แยกตามผู้คุม (5 คน) | 42 คนละ | 100% | 100% ทุกคน |
| ตรงวาระ แต่สถานีผิดกรรมสุด (tham 0) | 210 | 100% | 88.6% |
| รวมทุกชุด | 1,050 | 64.0% | 43.2% |
หมายเหตุสมดุล: ตรงวาระ+เบาไป "เท่าเดิม" ตามโจทย์ · ที่ต่างมีสองอย่าง: (1) หนักเกินเคยผ่าน 100% ตอนนี้ลดลง (2) ตรงวาระแต่ส่งผิดสถานีสุดขั้วผ่าน 88.6% — ผู้เล่นที่ตัดสินถูกเกือบไม่โดนกระทบ · ผ่านรวมลดลงจากการลงโทษหนักเกิน (ตั้งใจ) · ไม่ได้จำลองคดีสุ่ม (`mkSoul`) เพราะสัดส่วนสี trait ต่างจากคดีมีชื่อ — ถ้าต้องการให้บอก

## ผลเทสต์
- ชุดเต็ม `node --test --test-concurrency=4 tests/*.test.mjs` → **1,354 ผ่าน · 0 แดง** (เทสต์ใหม่ 4 ไฟล์ 29 เทสต์: `p4-remorse` 9 · `p4-diagnosis` 8 · `p4-power-ui` 3 · `p4-talk` 9 — ครอบ: remorse/ตารางผ่าน, เซฟไม่สุ่มซ้ำ, ล็อก D2/D4/D5, การคุยไม่เปลี่ยน snapshot ใด ๆ นอก `g.talk`, ไม่มี token `{…}` ค้างใน 174 บท × 4 เพศ, hit-test ตัวใกล้สุด)
- แก้เทสต์เดิม 3 จุด (ไม่ใช่ลดมาตรฐาน): `p8-copy` regex ให้ยอมรับ `-p4`, `p6-cauldron` ให้ room.js ยอมรับ suffix ต่อท้าย, `30a` ส่ง `CREW_POWER` เข้าฟังก์ชันที่แยกมาทดสอบ
- เบราว์เซอร์ (Playwright chromium) ทั้ง **390×844** และ **1280×800** — ผ่าน: โปรไฟล์+ปุ่ม "?" เปิดกล่องทับโปรไฟล์ ปิดแล้วกลับ ไม่ค้าง · ใบวินิจฉัย (ก่อนตรวจ→ตรวจ→ส่ง, ดวงขังรอ, ประตูสวรรค์ตรวจ→ส่งเกิดใหม่, เปิดดวงถัดไปอัตโนมัติ, Esc ปิดเฉพาะใบ, เกมพัก/คืนพัก) · ไอคอนพลังอ่านออกที่ 30px · แผ่นพลัง จ้าง/เข้าทีมใช้ได้ · คุยคนงาน/ยมทูต/วิญญาณในคิว/นิรา(บรรทัดทัก) ไม่ชนคลิกเดิน (แตะไกลเดินเข้าหาแล้วเปิดเอง, เดินเองแล้วยกเลิก) · ไม่มี `pageerror` · ไม่มี scroll แนวนอนทุกหน้าที่ตรวจ · เพิ่ม 844×390 และ EN แบบเร็ว: ไม่มี error/ไม่มี key หลุด
- ไม่ได้ตรวจในเบราว์เซอร์: คุยกับยักษ์ทวารบาล (ตำแหน่งยักษ์อยู่ใต้ปุ่ม "เปิดศาล" บนจอ 390 ในฉากทดสอบ) — โค้ดทางเดียวกับยมทูต + เทสต์หน่วย `pickTalk guard` ผ่าน (ผ่านเฉพาะเทสต์หน่วย, อยากให้ Chris กดจริง) · บทวิญญาณพระ (N7) ผ่านเทสต์หน่วยเท่านั้น
- ภาพหน้าจอ `Output/Toby/screenshots/2026-10-23-avegee-p4/` (51 ไฟล์: 10–11 โปรไฟล์ · 20–33 ใบ/ห้อง · 40–43 ออฟฟิศ/แผ่นพลัง · 50–54,64–65 คุย · 60–63,70–72 ชุดสุดท้าย 2 ขนาด)

## หมายเหตุให้ Rae/Reese/Dale
- ข้อความจาก Rae: ใช้ตรงตัว 174 บท (`src/talk-lines.js`) · ทำตามหมายเหตุ N1 (บท build ใช้เมื่อสถานะ build จริง) N2 (บทเก็บของเลือกตามวัสดุ/ขาย) N6 (ยักษ์หิว/ล้าอ่านจาก `morale/hunger` จริง) N7 (วิญญาณ `sex==='monk'` ข้ามบท "ส่งกลับ/ไม่ยอมรับ") N8 (`{morale}` ปัดจำนวนเต็ม) · `{back}` ส่งเป็นชื่อวาระ (`INTENSITY_NAME`) ตามที่ Rae ขอ
- ความยาว: บทเดียวที่เกิน 60 ตัวอักษรในกรณีชื่อยาวสุด (62): `crew.dam.supervise[0]` — ไม่ถึงขั้นล้นบับเบิล
- `{station}`/`{sentence}` ของวิญญาณเดินไปสถานี: เพิ่ม `intensity` ในข้อมูล walk (`game.js assign`) เพื่อให้เติมได้ · ถ้าไม่รู้ชื่อสถานี ใช้บท "ลงเรือ/มาถึงฝั่ง" แทน ไม่เดา
- รางวัล "+60 เบี้ยกรรม" ในแบนเนอร์ประตูสวรรค์ฮาร์ดโค้ดตัวเลขเดียวกับ `resolveGate`
- เพิ่ม hook ทดสอบ `window.__sceneToClient(x,y)` (แปลงพิกัดฉาก→หน้าจอ) ข้าง `window.G` — ลบได้ถ้าไม่ต้องการ
- cache-bust: importmap ใน index.html `-p4` (game/room/data/i18n/scene/proximity/ui + css 3 ไฟล์ใหม่/แก้) · ไฟล์โมดูลใหม่ (diagnosis*.js, crew-power-ui.js, talk*.js, remorse.js) ไม่มีใน importmap เพราะเป็นไฟล์ใหม่

## ภาพที่ยังขาด
ไม่มี — ใช้ครบ 22 ไฟล์ของ Codex (นามสกุล .webp)

## ข้อความใหม่ที่ไม่ได้มาจาก Rae (ใช้ถ้อยคำสเปก Vera §2.4/§2.5/§3.3 หรือผมตั้งตามสเปก — ส่ง Rae/Reese ตรวจ; ยกเว้นข้อความหน้าที่คุมงาน/บทพูดที่มีอยู่เดิมหรือของ Rae)
108 คีย์ ในบล็อก `Object.assign(TH/EN …)` ท้าย `src/i18n.js` (คำนำหน้า `diag.` `power.` `talk.` `profile.help.`)

| key | TH | EN |
|---|---|---|
| `profile.help.hp` | อธิบายบารมี | What is Authority? |
| `diag.title` | ใบวินิจฉัยวิญญาณ | Soul diagnosis |
| `diag.open` | วินิจฉัย | Diagnose |
| `diag.openTag` | ใบวินิจฉัย | Diagnosis |
| `diag.openAria` | เปิดใบวินิจฉัยของ {name} | Open the diagnosis sheet for {name} |
| `diag.prev` | ดวงก่อนหน้า | Previous soul |
| `diag.next` | ดวงถัดไป | Next soul |
| `diag.mode.held` | ขังรอวาระ | Held, awaiting trial |
| `diag.mode.prison` | ตะราง | Prison |
| `diag.mode.gate` | ประตูสวรรค์ | Heaven Gate |
| `diag.sec.deeds` | ทำอะไรมา | What they did |
| `diag.sec.merits` | บุญที่นับให้ | Merit counted |
| `diag.sec.order` | คำตัดสินของท่าน | Your verdict |
| `diag.sec.said` | เขาพูด | What they say |
| `diag.sec.meters` | ตัวชี้วัด | Meters |
| `diag.sec.karma` | กรรมคงเหลือ | Karma remaining |
| `diag.noDeeds` | ยังไม่มีข้อมูลที่เปิดเผยแล้ว | Nothing disclosed yet |
| `diag.noMerits` | ไม่มีบุญถ่วงเลย | No merit to offset |
| `diag.noSaid` | ยังไม่ได้พูดอะไร | Nothing said yet |
| `diag.deed.hidden` | เรื่องที่สำนวนไม่ได้เขียนไว้ | Not written in the case file |
| `diag.deed.relief` | บรรเทา | Mitigating |
| `diag.deed.weight` | น้ำหนัก {n} | Weight {n} |
| `diag.merit.fake` | กุขึ้นเอง | Made up |
| `diag.merit.cut` | ลด {n} วาระ | Cuts {n} tiers |
| `diag.order.sentTo` | ส่งไป{name} | Sent to {name} |
| `diag.order.keeper` | ผู้คุม {name} | Keeper {name} |
| `diag.order.noData` | ไม่มีข้อมูล (เซฟเก่า) | No data (older save) |
| `diag.order.level` | ระดับวาระ {n} {name} | Tier {n} {name} |
| `diag.order.deserved` | สมควรได้รับ {n} | Deserved {n} |
| `diag.order.exact` | พอดีกรรม | Exactly fitting |
| `diag.order.over` | หนักเกินไป {n} วาระ | Too harsh by {n} |
| `diag.order.short` | เบาไป {n} วาระ | Too light by {n} |
| `diag.order.served` | รับทัณฑ์ครบแล้ว 100% | Sentence served in full (100%) |
| `diag.order.score` | ได้ {n} คะแนน | Scored {n} |
| `diag.ked` | ความเข็ด | Deterrence |
| `diag.ked.hint` | ความพอดีของทัณฑ์ที่ให้ (ตัวเลขเดียวกับคำตัดสิน) | How well the sentence fit (the same figure as the verdict) |
| `diag.ked.fear` | เข็ดจากเพลิง | Scared by fire |
| `diag.remorse` | ความสำนึก | Remorse |
| `diag.remorse.hint` | ถึงเกณฑ์ {n} = เข็ดแล้ว | Reaching {n} = repentant |
| `diag.remorse.lockedHeld` | ยังไม่ตัดสิน | Not yet judged |
| `diag.remorse.lockedUninspected` | ยังไม่ตรวจ · รอนิราตรวจ | Not checked · waiting for Nira |
| `diag.remorse.passed` | ผ่านเกณฑ์ | Passed |
| `diag.remorse.failed` | ไม่ถึงเกณฑ์ | Below the line |
| `diag.remorse.na` | ไม่มีข้อมูล | No data |
| `diag.remorse.threshold` | เกณฑ์ {n} | Line {n} |
| `diag.part.title` | ความสำนึกมาจาก | Remorse comes from |
| `diag.part.keeper` | ผู้คุม | Keeper |
| `diag.part.intensity` | ความแรงทัณฑ์ | Sentence tier |
| `diag.part.trait` | นิสัย | Temperament |
| `diag.part.keeper.match` | ผู้คุมเหมาะกับสีนิสัยของเขา | The keeper suits their colour |
| `diag.part.keeper.neutral` | ผู้คุมไม่ผูกกับสีนิสัย (ได้ครึ่งทาง) | This keeper is not tied to a colour (half marks) |
| `diag.part.keeper.mismatch` | ผู้คุมไม่เหมาะกับสีนิสัยของเขา | The keeper does not suit their colour |
| `diag.part.keeper.station` | สถานีตรงกรรม {n}% | Station fit {n}% |
| `diag.part.intensity.exact` | ทัณฑ์พอดีกรรม | Sentence fit the karma |
| `diag.part.intensity.short` | ทัณฑ์เบาไป {n} วาระ | Sentence too light by {n} |
| `diag.part.intensity.over` | ทัณฑ์หนักเกิน {n} วาระ · ยิ่งโหดยิ่งสำนึกน้อย | Sentence too harsh by {n} · the crueller, the less remorse |
| `diag.part.trait.accepting` | ยอมรับและพร้อมแก้ไข | Accepting and ready to mend |
| `diag.part.trait.concealing` | ปิดบังความจริง | Hides the truth |
| `diag.part.trait.resisting` | ดื้อและต่อต้าน | Stubborn and defiant |
| `diag.karma.left` | กรรมคงเหลือ | Karma remaining |
| `diag.karma.expected` | คาดว่า {n} | Expected {n} |
| `diag.karma.actual` | เหลือ {n} | {n} left |
| `diag.karma.sin` | กรรมที่ก่อ | Karma incurred |
| `diag.karma.relief` | บรรเทา | Mitigation |
| `diag.karma.merit` | บุญ | Merit |
| `diag.karma.intensity` | ทัณฑ์ที่รับ | Sentence served |
| `diag.karma.lotus` | ดอกบัว | Lotus |
| `diag.karma.toHeaven` | หมดกรรม → ขึ้นสวรรค์ | Karma cleared → heaven |
| `diag.karma.toReborn` | ยังเหลือกรรม → ไปเกิดใหม่ | Karma remains → rebirth |
| `diag.karma.paid` | ชำระแล้ว {a} จาก {b} | Paid {a} of {b} |
| `diag.locked.held` | ยังไม่ตัดสิน | Not yet judged |
| `diag.locked.hint` | เปิดได้เมื่อตัดสินและรับทัณฑ์ครบแล้ว | Opens once judged and the sentence is served |
| `diag.b.held` | ยังไม่ตัดสิน · รอวาระ | Not yet judged · awaiting trial |
| `diag.b.prisonWait` | อยู่ในตะราง · ตรวจได้อีก {n} วาระ | In prison · can be checked in {n} more turns |
| `diag.b.prisonInspect` | รอนิราตรวจความสำนึก | Waiting for Nira to check remorse |
| `diag.b.prisonKed` | เข็ดแล้ว · พร้อมไปประตูสวรรค์ | Repentant · ready for the Heaven Gate |
| `diag.b.prisonNotKed` | ยังไม่เข็ด · ส่งกลับคิวตัดสินใหม่ | Not repentant · back to the queue for a new verdict |
| `diag.b.gateWait` | รอบุญตรวจกรรมคงเหลือ | Waiting for Boon to check remaining karma |
| `diag.b.gateReborn` | ยังเหลือกรรม {n} · ไปเกิดใหม่ | {n} karma remains · to rebirth |
| `diag.b.gateHeaven` | พร้อมไปสวรรค์ | Ready for heaven |
| `diag.b.gateHeavenReward` | พร้อมไปสวรรค์ · พ่อให้รางวัล 60 เบี้ยกรรม | Ready for heaven · Father rewards 60 karma coins |
| `diag.act.release` | เบิกตัวขึ้นแท่น | Bring to the dais |
| `diag.act.waiting` | รอครบวาระ | Wait for the term |
| `diag.act.escorting` | กำลังพาไป… | Escorting… |
| `diag.reason.wait` | ตรวจได้อีก {n} วาระ | Can be checked in {n} more turns |
| `diag.closeSheet` | ปิดใบวินิจฉัย | Close diagnosis sheet |
| `power.open` | ดูรายละเอียดพลัง {name} | Show details of {name} |
| `power.of` | ท่าสู้ของ {name} | Battle move of {name} |
| `power.effect` | ผล | Effect |
| `power.cooldown` | คูลดาวน์/ราคา | Cooldown / cost |
| `power.job` | หน้าที่คุมงาน | Keeper duty |
| `power.cooldownLine` | คูลดาวน์ {n} วินาที | Cooldown {n} s |
| `power.moraleLine` |  · กำลังใจ −{n} ต่อครั้ง |  · Morale −{n} per use |
| `power.hire` | จ้าง {n} | Hire {n} |
| `power.joinTeam` | เข้าทีมสู้ | Join battle team |
| `power.leaveTeam` | ออกจากทีมสู้ | Leave battle team |
| `power.close` | ปิด | Close |
| `power.taan.name` | กระบองทัณฑ์ | Penal Club |
| `power.plerng.name` | เพลิงพิพากษา | Judgement Flame |
| `power.kan.name` | พลังสะกดจิต | Hypnosis |
| `power.boon.name` | พลังฟื้นฟู | Restoration |
| `power.nira.name` | แสงฟื้นบารมี | Light of Authority |
| `power.dam.name` | คมดาบ | Keen Blade |
| `power.guard.name` | กระบองพิทักษ์ | Guardian Club |
| `talk.with` | คุยกับ {name} | Talk to {name} |
| `talk.next` | ถัดไป › | Next › |
| `talk.close` | ปิด | Close |
| `talk.aria` | คุย | Talk |

## วิธีรัน/ทดสอบเอง (Kittanate)
`cd /Users/agapae/agapae-work/.toby-worktrees/p4 && python3 scripts/serve-nocache.py 8777` แล้วเปิด `http://localhost:8777/index.html` (ครอป 390×844 ใน DevTools ด้วย)
1. โปรไฟล์ยามา (กดรูปมุมซ้ายล่าง) → แถวบารมี → กด "?"  · แท็บ "ทีมยมทูต" ดูไอคอนพลัง
2. ไปโต๊ะนิรา → การ์ดยมทูต → แตะป้ายกลมมุมล่างขวา (แผ่นรายละเอียด)
3. เข้าตะราง → ปุ่ม "🔍 ใบวินิจฉัย" เหนือหัววิญญาณ หรือ "จัดการรายชื่อ" → วินิจฉัย · ตรวจดวงที่รับทัณฑ์ครบ → ดูตัวเลขความสำนึก + 3 ส่วน
4. บนแผนที่: แตะยมทูต/คนงาน/วิญญาณในคิว (ลำดับ 2+) หรือยืนใกล้ ๆ แล้วกดปุ่ม 💬 / E

## สิ่งที่ยังไม่ทำ
ดูตาราง "ข้ามไว้" ด้านบน (บทห้องทัณฑ์เฟส 2 · ใบจากห้องสถานีลงทัณฑ์ · เลย์เอาต์แนวนอนมือถือเฉพาะ · EN ของบทพูด)


## รอบแก้ตาม Reese
commit: ดู git log ของ `toby/p4-build` (ข้อความ "P4 fix round (Reese FIX LIST)") · ห้าม merge/push main

| ข้อ | แก้อะไร |
|---|---|
| F1 | `diag.part.keeper.neutral` → TH "(ได้คะแนนกลาง ๆ)" · EN "(neutral score)" |
| F2 | ดวงที่ส่งตรงประตูสวรรค์ (`stationK==='sawan'` หรือ `verdict.heaven`): ข้ามบรรทัดระดับวาระ/สมควร/หนักเกิน/รับทัณฑ์ครบ และแถว "ทัณฑ์ที่รับ" ในน้ำตกกรรม → ข้อความใหม่ `diag.order.direct` "ส่งตรงประตูสวรรค์ · ไม่มีทัณฑ์" · ภาพ `80-fix-F2-direct-gate-390.png` |
| F3 | แผ่นพลังนิรา: ผล "ฟื้นบารมี 32 · ระเบียบ …" (ค่า heal จาก `allyStats`) · แถวหน้าที่ใช้ `CREW.duty` ("อ่านสำนวนให้ท่านฟัง · ไม่รับเวรลงทัณฑ์") แทนข้อความผู้คุมทั่วไป · เพิ่มแถว "ใช้ท่าได้เมื่อ: ใช้เฉพาะศึกคู่ที่ชายแดน ไม่เข้าทีมสู้ปกติ" · ภาพ `83-fix-F3-nira-sheet-390.png` (หมายเหตุ: นิราไม่มีการ์ดในโต๊ะนิรา จึงเปิดแผ่นนี้ได้จากโปรไฟล์แท็บทีม/แท็บทีม/แผงข้อมูลนิรา) |
| F4 | โหมดตะราง: ไม่แสดง "→ ขึ้นสวรรค์/ไปเกิดใหม่" · ก่อนตรวจ/ตรวจแล้วสำนึก → "ถ้าถึงประตูสวรรค์: หมดกรรม/ยังเหลือกรรม" · ตรวจแล้วไม่สำนึก (ส่งกลับคิว) → ซ่อนบรรทัดปลายทางทั้งบรรทัด · โหมดประตูสวรรค์ใช้ข้อความเดิม · ภาพ `81-fix-F4-notrepentant-390.png`, `82-fix-F4-before-inspect-390.png` |
| W1 | ยืนยันแล้ว: โค้ดใช้คูลดาวน์ยักษ์ **20 วินาที** (`helpRemainingMs = 20000`) และกำลังใจ −8 ต้องมี ≥ 8 — ค่า 120 ใน `GUARD.battleCd` เป็นค่าเก่าที่ไม่ได้ใช้ตั้งคูลดาวน์จริง · ย้ายเลขลอยเป็น `GUARD.helpCdMs=20000`, `GUARD.helpMorale=8` (ค่าเดิมเป๊ะ ไม่แตะสมดุล) · แผ่นพลังยักษ์โชว์ "คูลดาวน์ 20 วินาที · กำลังใจ −8 ต่อครั้ง" (ภาพ `84-fix-W1-guard-sheet-390.png`) · การ์ดยักษ์ที่โต๊ะนิราเปลี่ยนจาก 120 เป็น 20 ให้ตรงกัน · **พบปัญหาเดิมที่ไม่ได้แตะ:** แถบคูลดาวน์ยักษ์ในฉากต่อสู้ (`ui.js` ~2404, ~4291) ยังหารด้วย `GUARD.battleCd` (120) แถบจึงเริ่มที่ ~83% — ขอ Claudy ตัดสินว่าจะแก้เป็น `helpCdMs` ไหม (เป็นการแก้ UI ไม่ใช่สมดุล) |
| W2 | แบนเนอร์/ฮินต์ที่มาจาก remorse ใช้ "สำนึก": `สำนึกแล้ว · พร้อมไปประตูสวรรค์` · `ยังไม่สำนึก · ส่งกลับคิวตัดสินใหม่` · `diag.remorse.hint` "ถึงเกณฑ์ {n} = สำนึกแล้ว" · มิเตอร์ "ความเข็ด"/"เข็ดจากเพลิง" คงเดิม |
| W3 | `diag.b.gateWait` "รอ{name}ตรวจกรรมคงเหลือ" ใช้ชื่อบุญตามโซน (`crewName`) — โซน 2 = เมกุมิ (มีเทสต์) |
| คีย์ค้าง | ลบ `diag.merit.cut`, `diag.remorse.threshold`, `talk.aria` (ไม่มีผู้ใช้) |
| N1 | แก้ถ้อยคำในรายงานหลัก (ข้างบน) · เทสต์ `p4-remorse.test.mjs` เพิ่ม `simulatePure()` ครอบวาระ 1–5 × ผู้คุม 5 × คดีผู้บริสุทธิ์/เทวดาใน cases.js |

### ผู้บริสุทธิ์/เทวดาที่ถูกลงทัณฑ์ผิด (ส่งไปสถานีลงทัณฑ์ · tham 0 · deserved 0 → วาระ n = หนักเกิน n)
คดีผู้บริสุทธิ์/เทวดาใน `cases.js` 3 คดี × ผู้คุม 5 × วาระ 1–5 = 75 ชุด
| วาระที่ลง | ชุด | ผ่าน (เข็ด/สำนึกแล้ว) |
|---|---|---|
| 1 | 15 | **33.3%** |
| 2 | 15 | 0% |
| 3 | 15 | 0% |
| 4 | 15 | 0% |
| 5 | 15 | 0% |
วาระ 1 แยกตามผู้คุม: ทัณฑ์ 33.3% · เพลิง 0% · กานต์ 66.7% · บุญ 33.3% · ดำ 33.3% · แยกตามสี: accepting 60% · concealing 20% (accepting+บุญ = 72 ผ่านทุกคดี) · เกณฑ์ผ่านของวาระ 1 ต้องผู้คุมตรงสีหรือกลาง ๆ — ผู้ตัดสินที่ลงวาระ 1 กับผู้บริสุทธิ์ยังโดนกรรมจากการลงผิด (`judge`: karma +14) ตามเดิม

เทสต์: ชุดเต็ม **1,359 ผ่าน · 0 แดง** (เพิ่ม 5: F1 · F2 · F4/W2/W3 · ค่าคงที่ยักษ์ใน game.js · ตารางผู้บริสุทธิ์) · ตรวจเบราว์เซอร์ 390×844: ไม่มี pageerror ไม่มี scroll แนวนอน

ข้อความใหม่ในรอบนี้ (ส่ง Rae/Reese ตรวจสั้น ๆ): `diag.order.direct` ส่งตรงประตูสวรรค์ · ไม่มีทัณฑ์ / Sent straight to the Heaven Gate · no sentence · `diag.karma.ifGateClear` ถ้าถึงประตูสวรรค์: หมดกรรม / If it reaches the Heaven Gate: karma cleared · `diag.karma.ifGateRemains` ถ้าถึงประตูสวรรค์: ยังเหลือกรรม / … karma remains · `power.heal` ฟื้นบารมี {n} / Restore Authority {n} · `power.where` ใช้ท่าได้เมื่อ / Usable when · `power.niraOnly` ใช้เฉพาะศึกคู่ที่ชายแดน ไม่เข้าทีมสู้ปกติ / Only in the frontier duo fight · not part of the normal battle team · ที่แก้ถ้อยคำ: `diag.b.prisonKed/NotKed`, `diag.remorse.hint`, `diag.b.gateWait`, `diag.part.keeper.neutral`

**แถบคูลดาวน์ยักษ์ในฉากต่อสู้:** `ui.js` (การ์ดทีม ~2404 และตัวอัปเดตแถบ ~4291) หารด้วย `GUARD.helpCdMs/1000` (20 วิ) แทน `battleCd` แล้ว แถบเริ่มที่ 0% ไม่ใช่ ~83% · `GUARD.battleCd` (120) เหลือไว้เป็นค่าเก่าพร้อมคอมเมนต์ เพราะ `tests/combat-power.test.mjs` ยังอ้าง · เทสต์ชุดเต็ม 1,359 ผ่าน 0 แดง
