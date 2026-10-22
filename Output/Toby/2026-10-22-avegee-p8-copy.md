# Toby: AVEGEE P8 — วางข้อความล้าสมัยที่เหลือจาก P7

branch `toby/p8-copy` · commit `829f12d` (จาก main `b22c81b`) · worktree `/Users/agapae/agapae-work/.toby-worktrees/p8` · ไม่ merge ไม่ push (Dale ทำ)

## สิ่งที่ build
วางบล็อกจาก `Output/Rae/2026-10-22-avegee-p8-copy.md` หัวข้อ 3 ครบ + แก้ตามคำสั่งคุณเป้ 23 ต.ค. (ตัดข้อความตอนจบ "กรรมต่ำกว่า 25 = ทายาทบัลลังก์") ไม่แตะตัวเลข/ตรรกะเกม ยกเว้นข้อ 4 (เลือกข้อความ)

## ตารางบล็อก
| บล็อก | ไฟล์ | สถานะ |
|---|---|---|
| D1 TUTOR.hp · D2 TUTOR.karma · D3 order · D4 pret · D5 stuck · D6 fight · D7 heaven · D10 match/inten hint | `data.js` | วางแล้ว |
| D8 KARMA_TIERS[3].eff (ตัวสุดท้าย "ชื่อท่านอยู่ในคิว") | `data.js` | วางแล้ว |
| D11 STATIONS.krajok desc/use | `data.js` | วางแล้ว |
| D9 คอมเมนต์ TARANG.hold / BATTLE.fireDmg | `data.js` | แก้แล้ว (ข้าม ITEMS.fire desc ตามที่ Rae บอกว่าปล่อยได้) |
| KARMA_TIERS[0].eff | `data.js` | คำสั่งคุณเป้: เหลือ 'ไม่มีโทษอะไร' |
| D2 ท่อน "ต่ำกว่า 25 ตอนจบ = ตอนจบที่ดีที่สุด" | `data.js` | คำสั่งคุณเป้: ตัดออก ต่อประโยคด้วย ' · ' ไม่ซ้ำ ไม่มี EN คู่ |
| U1 U2 U3 U4 U5 U6 U7 | `ui.js` openHelp | วางแล้ว |
| U8 U9 U10 U11 | `ui.js` explainBar | วางแล้ว |
| U12 meThought · U13 outOfAmmoHint | `ui.js` | วางแล้ว |
| I1 g5.hitLast / missEarlyLast / missLateLast (TH+EN) + โค้ด `state.done?'Last':''` | `i18n.js` `minigames/krata-qte.js` | วางแล้ว (ข้อ 4) |
| I2 unlock.lockShort (TH+EN) + ปุ่มสร้าง + ป้ายแผนที่ + import t + คอมเมนต์ "rank N" | `i18n.js` `ui.js` `town-map.js` | วางแล้ว (ข้อ 7) |
| I3 unlock.why.krajok TH+EN | `i18n.js` | วางแล้ว |
| S1 sentencing-guide บท 4 | `sentencing-guide.js` | วางแล้ว |
| ข้อ 6 clockGuide | `sentencing-guide.js` | ไม่แก้ (Rae: ตรงโค้ดทุกข้อ) |
| ข้าม (ไม่บังคับตามที่ Rae เขียน) | | U10 "ขึ้นเมื่อ +14/+8" เสริม · คีย์ build.built/busy/cost (ปุ่มสร้างไทยล้วน 3 ข้อความ) · ตัวเลือกปรับถ้อยคำ clockGuide — เพิ่มคีย์ใหม่เกินขอบเขต ถ้าต้องการสั่งเป็นรอบแยก |

cache-bust: `data.js` `i18n.js` `town-map.js` `krata-qte.js` `sentencing-guide.js` ต่อท้าย `-p8`; `ui.js` เป็น `...-p5b-p7-p8-o2` (คงท้าย `-o2` ตามที่เทสต์ o2/p5b/p6 บังคับ)

## ผลเทสต์
`node --test tests/*.test.mjs` = **1325 pass / 0 fail** (baseline main 1318 + เทสต์ใหม่ 7) · ไม่มีเทสต์เดิมที่ล็อกข้อความเก่า ไม่ต้องแก้เทสต์เดิม
เทสต์ใหม่ `tests/p8-copy.test.mjs` (7 เทสต์): ตัวเลขใน TUTOR.fight ตรง BATTLE · วลีเก่าหายจาก data/ui · ข้อความตอนจบหายไป · กระจกหอส่องกรรมไม่มีกานต์ TH/EN · g5 *Last ครบ TH/EN · ป้ายล็อกผ่าน i18n · -p8 ใน index.html

## ผล grep
- `grep -rn "fireball(" src/`: เรียกจริงแค่ `game.js:1239` และ `:1240` (นิยามที่ :1814) ตามที่ Rae/Reese บอก ไม่เจอที่อื่น (ที่อื่นที่มีคำว่า fireball เป็นชื่อ asset / ธง `pendingWarn.fireball` ใน game.js:1216 ซึ่งเป็นลูกไฟเตือนแดงครั้งที่ 2)
- `grep -rn "ทายาทบัลลังก์\|ต่ำกว่า 25" src/` = ว่าง · เหลือแค่ `tests/batch15-logic.test.mjs:22` ที่ใช้ `over.title:'ทายาทบัลลังก์'` ในเซฟเก่าจำลอง ไม่เกี่ยวกับข้อความผู้เล่น (ไม่แตะ)
- `grep -rn "กานต์" src/`: ข้อความที่บอกว่ากระจกได้จากกานต์ **ไม่เหลือในส่วนที่ผู้เล่นเห็น** ที่เหลือคือกานต์ในบทบาทผู้คุมเปิดความจริง (`interrogation*.js`, `sentencing-guide.js`, `game.js` 967-984) ซึ่งถูกต้อง · พบ dead code: `game.js talkKan()` (ล็อก "กานต์: ส่องดูเถอะครับ…") และคีย์ i18n `room.nearKan` / `room.kanWait` ไม่มีที่เรียกใช้ใน `ui.js` แล้ว (คอมเมนต์ game.js ~4536 ไม่แตะตามสั่ง) · คอมเมนต์ `data.js:559/1046`, `room.js:541-555`, `unlocks.js:52` ยังเล่าเรื่องกานต์ยืนในหอ (ผู้เล่นไม่เห็น)

## รันจริงในเบราว์เซอร์ (Playwright Chromium 390x844, scrollWidth 390, ไม่มี pageerror)
- openHelp (ปุ่มคู่มือ): การ์ด 5 "กระจกวิเศษมีจำนวนจำกัด", 10 "เลื่อนขั้นด้วย EXP", 11 "ลงทัณฑ์เกินกรรม = โดนลูกไฟ", 12 "กรรมท่านลดได้", 14 "เร่งทัณฑ์ด้วยมินิเกม" ชื่อการ์ดถูก (ดึงจาก `<b>` ตัวแรก) · ไม่มี "ห้าดาวครบห้าครั้ง" / "เดินไปเก็บ"
- explainBar order / karma / food: ข้อความใหม่ถูก (ตะรางไม่มี "ขยายให้แล้ว", ดอกบัว "มอบให้บุญ", ห่อเสบียง "สุ่มได้") · ชื่อขั้น karma ตัวแรกเหลือ "ไม่มีโทษอะไร"
- ปุ่มสร้างแท็บก่อสร้าง TH: "🔒 ขั้น N" · EN: "🔒 Rank N" · ป้ายแผนที่ (เรียก `drawTownGround` จริงบน canvas เปล่า ดักข้อความ): TH "🔒 ขั้น N", EN "🔒 Rank N"
- มินิเกมลูกไฟ (ใช้ `runKrataQte` จริง + `window.G` จริง + ห้องจำลองขั้นต่ำ ไม่ได้เปิดผ่านห้องกระทะ): TH และ EN ทั้งทางพลาด 3 ครั้ง ("เร็วไป · พลาดครบ 3 ครั้ง" / "Too early · 3 misses, training over") และทางถูก 5 ครั้ง ("ถูกจังหวะ · ครบ 5 ครั้งแล้ว" / "On time · all 5 hits done") ส่วนครั้งที่ 1–4 ยังเป็น "…เตรียมลูกไฟถัดไป" เหมือนเดิม

## สิ่งที่เจอเพิ่ม / ยังไม่ได้ตรวจ
1. **ยืนยันไม่ได้ในเบราว์เซอร์:** กล่อง explainBar "บารมี" (U8) — ไม่มีชิป `data-ex="hp"` ใน HUD แล้ว (`ui.js` 355-358 มีแค่ coin/food/order/karma) สาขา `k === 'hp'` จึงเข้าถึงไม่ได้จาก UI ปัจจุบัน ข้อความถูกวางตามบล็อกแล้วแต่ตรวจด้วยตาไม่ได้ (ตรวจด้วย diff + เทสต์ source) · หน้า "ถ้าหมด/ได้คืน" ของบารมีจึงเป็นของที่ผู้เล่นมองไม่เห็นอยู่ดี ถ้าจะให้เห็นต้องให้ Vera ตัดสินว่าจะเปิดชิปบารมีกลับมาไหม
2. ไม่ได้ดูภาพจริงของแถบโค้ช TUTOR.fight (D6 ยาวขึ้นราว 60 ตัวอักษร) ที่ 360px — Rae ขอให้ดู ยังไม่ได้ทำ ผ่านแค่การทดสอบข้อความ
3. คอมเมนต์ `data.js:523` "เต็ม 100 = จบเกม" ล้าสมัย (ผู้เล่นไม่เห็น) ไม่แตะ
4. ITEMS.fire desc/howTo "เก็บหรือซื้อ" ปล่อยไว้ตาม Rae (ไม่มีผู้เล่นเห็น)
5. Audio 404 (`audio/bgm-*.ogg|mp3`) ใน worktree เป็นของเดิม ไม่เกี่ยวกับ P8

## ไฟล์ที่แตะ
`index.html` `src/data.js` `src/ui.js` `src/i18n.js` `src/town-map.js` `src/sentencing-guide.js` `src/minigames/krata-qte.js` `tests/p8-copy.test.mjs` (ใหม่)

## วิธีรัน/ทดสอบเอง (Kittanate / Dale)
```
cd /Users/agapae/agapae-work/.toby-worktrees/p8
python3 scripts/serve-nocache.py 8777    # เปิด http://localhost:8777 ที่ 390 กว้าง
node --test tests/*.test.mjs             # ~4 นาที
```
กดจอแรกหนึ่งครั้ง → เริ่มเกมใหม่ → ปุ่มคู่มือ (เลื่อนดูการ์ด 5/10/11/12/14) · แตะชิประเบียบ/กรรม/เสบียง · แท็บก่อสร้างเทียบป้าย 🔒 · ตั้งค่าภาษา EN แล้วดูซ้ำ

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มี

## สิ่งที่ยังไม่ทำ
รายการข้ามในตารางด้านบน (ไม่บังคับ) · ตัวเลขที่ฝังในสตริง TUTOR.fight (8, 9, 6) มีเทสต์เฝ้าแล้ว แต่ไม่ได้ผูกกับ BATTLE จริง (TDZ) · merge/push รอ Dale
