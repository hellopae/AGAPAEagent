# HOME START + เซฟ 3 ช่อง — รอตรวจรับ

Branch `codex/2026-11-01-home-save-slots`; base `f9a4edd3`; ไม่ merge/push

หน้า Home มีปุ่มหลัก START เพียงปุ่มเดียว กดแล้วเปิดตัวเลือกเซฟ3ช่องตามรูปแบบภาพอ้างอิง home1/home2 โดยใช้ปก โลโก้ และธีมของ AVEGEE เดิม ไม่คัดลอกอาร์ตเกมตัวอย่าง

- ช่องว่างแสดง New Game; ช่องที่มีข้อมูลแสดงเวลาเล่น เบี้ยกรรม ระเบียบ บาป โซน และรายชื่อยมทูตที่เป็นเจ้าของรวมทุกสาขา
- เซฟเดิม avegee.save.v2 คัดลอกไปslot1แบบเก็บข้อความต้นฉบับครบ ไม่ลบหรือเขียนทับต้นฉบับ ไม่ทับslot1ที่มีข้อมูลอยู่แล้ว
- เซฟแต่ละช่องแยกkey: avegee.save.slot.1.v1 ถึง .3.v1; เลือกช่องแล้วจึงเริ่มเกม/เปิดให้บันทึก ไม่มีการเขียนเซฟเกมใหม่ขณะอยู่Home
- ช่องที่ข้อมูลผิดรูป/อ่านไม่ได้ไม่ถูกตีความเป็นช่องว่าง และไม่ถูกเขียนทับ; หากstorageปิด/เต็มแจ้งผลจริง ไม่บอกว่าบันทึกสำเร็จ
- เวลาเล่นนับเวลาที่อยู่หน้าเกมจริง รวมอ่านสำนวน/บทสนทนา แต่ไม่นับช่วงออกแท็บ พักเอง หรือปิดเกม ไม่เร่งตามความเร็วsimulation; เซฟเก่าที่ไม่เคยเก็บเวลาแสดงว่าเริ่มนับหลังอัปเดต
- กลับHomeแล้วยังเลือกเซฟเอง; รีสตาร์ทที่ยืนยันในSettingsล้างเฉพาะช่องที่เล่น และไม่ดึงเซฟlegacyเก่ากลับมาทับ; ไม่มีปุ่มลบslotเพิ่ม
- ตั้งค่าเสียง ภาษา และเมนูเดิมยังเปิดผ่านเฟือง; ปุ่มSaveในSettingsก่อนเลือกช่องถูกปิดเพื่อป้องกันเขียนเซฟผิดช่อง

## หลักฐานทดสอบ

เทสต์HOMEใหม่8/8; targetedร่วมsave/roster/proximity20/20 และHOME+BALANCE-2 15/15ผ่าน

Full suite1798/1798,0fail (tests-full.log) หลังเพิ่มการยกเว้นเฉพาะ7snippetของpersistence/playtimeก่อนตรวจhashcombatเดิม; รอบแรก1797/1798ติดhashgameเพียงข้อเดียว เก็บlogเดิมในtests-before-combat-hash-normalization.log ไม่มีการเปลี่ยนหรืออ้างรันsimulation32,000ครั้งใหม่

Syntax162/162 และgit diff --checkผ่าน

Real Playwright Chromium clean-profile check ผ่าน:

1. HomeมีSTARTหนึ่งปุ่มและไม่เขียนเซฟก่อนเลือก
2. New Gameช่อง2สร้างข้อมูลเฉพาะช่อง2; เวลาเล่นถูกบันทึก; โหลดหน้าใหม่แล้วเลือกContinueช่อง2ได้
3. เซฟlegacyถูกคัดลอกตรงbyteเข้าสล็อต1และยังคงต้นฉบับ
4. การ์ดแสดง01:02:03/12,345/87/22/โซนและรายชื่อcrewครบ25คนจากfixture
5. Desktop1280×800และmobile390×844ไม่มีแนวนอนล้นกรอบ ตัวเลือกNew Gameอีก2ช่องอยู่ครบ
6. pageErrors=[] — เป็นผลJavaScript runtimeของการตรวจนี้ ไม่ใช่การอ้างFPSมือถือจริง

ภาพจริง: home-desktop.png, home-1280.png, home-390.png, empty-slots-desktop.png, occupied-slots-1280.png, occupied-slots-390.png
ผลbrowser: browser-checks.json
ทำซ้ำ: browser-checks.mjs (รับ root และ output เป็น CLI arguments)

Chromiumที่ใช้มีอยู่ในเครื่อง:
`/Users/agapae/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`

Playwright package:
`/Users/agapae/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`

ไม่ใช้profileเบราว์เซอร์ส่วนตัว ไม่อ่านข้อมูลเซฟของผู้ใช้จริง ไม่แตะstatus.json/worklog.json/work-mode.json; ยังไม่อ้างReese/Chrisตรวจ

## ไฟล์ที่เปลี่ยน

- src/save-slots.js — storage/migration/summary/playtime helper
- src/save-slot-menu.js — viewการ์ดเซฟและformatเวลา
- src/game.js — save/load/clearเลือกslot, snapshot/restoreเวลาเล่น; ผู้เรียกAPIเดิมที่ไม่ระบุslotยังใช้legacykeyเดิม
- src/ui.js — START/chooser/startup guard/restartและframe playtime hook
- index.html — STARTและstyleการ์ด; cache destinations/rootUI scriptอัปเดต โดยคงsourcealiasเดิม
- tests/home-save-slots.test.mjs — migration/isolation/data-loss guardsและsummary/alias regression

Fixtureจำเพาะ: tests/fixtures/home-save-slots-runtime-changes.json เก็บbefore/after7จุดของเกมที่เปลี่ยนเพราะsave/playtime ย้อนกลับแล้วได้game.jsฐานเดิมตรงทุกbyte ใช้ในtests/balance2.test.mjsก่อนauthenticatecombatเดิม ไม่ครอบโค้ดต่อสู้ส่วนอื่น
