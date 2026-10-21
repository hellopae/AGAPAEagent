# AVEGEE O1 merge (Dale, 22 ต.ค. 2569)

ผล: **PASS** — merge `toby/o1-frontier` (1d75d67 + 4f5e8e6) เข้า main

- merge commit: `11658b0` (push 5e58d55..11658b0, ไม่ force) · main ก่อน merge fast-forward เป็น 5e58d55 (commit handoff docs ของ Codex, เฉพาะ docs)
- เทสต์ทั้งชุดหลัง merge: tests 1231 / pass 1231 / fail 0
- Pages run: `pages build and deployment` id 39643341075 สำเร็จ (headSha 11658b0)
- marker บนเว็บจริง https://hellopae.github.io/AVEGEE/ : index.html มี `-o1` ใน boss-guides, dungeon-view.js, frontier-view-metrics.js (entry ใหม่), frontier, game, npc-stand, scene, dungeon-view.css — ทุกไฟล์โหลดได้ 200 และเนื้อหามีโค้ด O1 (`bossGuideDismissed`, `dungeonExitArrival`, `dungeon-icon`, cover scale)

## ผลรีวิว (ไม่มี FIX LIST)
- latch เข้าประตู: `dungeonExitArrival` ไม่ trigger ระหว่าง battle/pendingRecovery/pending/cut-in/destroyed; mount บนประตูเริ่มด้วย latched; เข้าไม่สำเร็จแล้วยัง latched จนกว่าจะก้าวออก
- เงินบอสจ่ายครั้งเดียว: ไม่แตะ logic จ่าย (เทสต์ใหม่ครอบ เรียกซ้ำไม่จ่ายซ้ำ) · เซฟเก่า restore มีเทสต์
- ไม่มีจุดคลิกที่มองไม่เห็น: ปุ่มถ้ำผูกกับ `challengeStandeeShown` (predicate เดียวกับที่วาด); ท่าเรือ draw/hitActor/standPoints/bossPierCanTalk ใช้ `bossGuideDismissed` ครบ
- ปุ่ม "เข้าใกล้ศัตรู/ท้าสู้" ที่ถูกลบ: ตรวจแล้วเป็นของซ้ำกับ auto-encounter (wilderness) และ chase (legacy) ไม่ทำให้เส้นทางตัน
- cache-bust: index link/import map/importer ตรงกัน (ui.js ใช้ `?v=l5` ซึ่ง map ไปค่าใหม่) ไม่มี preload ที่อ้างไฟล์เหล่านี้ · ไม่มี console.log/debugger ค้าง
- ข้อสังเกตไม่ block: ☰/← ยังเป็นตัวอักษร Unicode ชั่วคราว; "ประลองใหม่/เปลี่ยนโซน" ที่ท่าเรือเข้าไม่ได้ (ประลอง 10 ระลอกเข้าได้ที่ด่านชายแดน) ตามที่ Toby รายงาน; ไม่ได้เล่นจบเซฟจริง/มือถือจริง/Safari

## QA (Chris/คุณเป้)
เปิดเว็บจริง (hard refresh) เซฟที่ชนะบอสโซน 1: ออกเส้นทาง th→asia → ภาพเต็มจอมีแค่ ← ☰ minimap ป้ายเล็ก → เดินถึงประตูแล้วเข้าโซนเอง → บอสหายจากเส้นทาง/เมือง แต่ยืนที่ด่านชายแดนและกด "ประลอง 10 ระลอก" ได้ → เดินเส้นทางซ้ำเห็นแค่ยามา+นิรา

## Roll back
`git revert -m 1 11658b0` บน main แล้ว push (ห้าม force) · O2 (`toby/o2-battle-audit`) ยังไม่ merge — ต้อง rebase บน main ใหม่ ชนที่ index.html (import map คนละบรรทัด)
