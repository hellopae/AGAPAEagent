# AVEGEE O2-merge — Dale (2026-10-22)

**ผล: PASS** — merge `toby/o2-battle-audit` เข้า main แล้ว

- merge commit: `4a3fd91` (main `11658b0` -> `4a3fd91`, --no-ff, push ปกติ ไม่ force) + push branch `toby/o2-battle-audit` เก็บประวัติ
- เทสต์: `node --test tests/*.test.mjs` = 1240 tests / 1240 pass / 0 fail
- Pages run: 39707690815 (pages-build-deployment) = success
- เว็บจริง https://hellopae.github.io/AVEGEE/ : marker `-o2` ครบ 5 ไฟล์ (ui, nira-combat, combat-sprites, yama-sword, battle-scale) ใน index.html และโหลด 200 ทั้งหมด

## ผลรีวิว diff
- ไม่แตะตัวเลข gameplay (ไม่มี damage/HP/MP/cooldown เปลี่ยน)
- cache-bust: importmap map ทั้งสเปคเก่าและใหม่ -> `-o2` ตรงกันทั้ง 5 ไฟล์ (+ test ล็อกไว้)
- ไม่มี console/debugger/TODO ในส่วนที่เพิ่ม
- `stripNeighbourLeaks`: รันครั้งเดียวต่อแผ่น (sheetCache) บน copy ในหน่วยความจำ ไม่ใช่ทุกเฟรม; ลบเฉพาะชิ้นที่ไม่ใช่ตัวหลัก+แตะขอบซ้าย+ต่อเนื่องกับขอบขวาเซลล์ก่อนหน้า; try/catch fallback เป็นแผ่นเดิม
- hurt hold: ใช้ startedAt ในอนาคต + combat-sprites ข้าม (ยืนท่าเดิม) ไม่ทำให้ค้างถ้าไม่มีการ์ดคัตซีน
- DPR: cap 3 — บนจอ 3x canvas Yama ใหญ่ขึ้นสูงสุด 9 เท่าพิกเซล (ประมาณ 2-3M px / ~10MB ต่อ canvas, มีทีละใบ) ยอมรับได้; ข้อสังเกตไม่บล็อก: `mountBattleSword` ตั้ง canvas.width ทุกเฟรมอยู่แล้ว (พฤติกรรมเดิม) ช่วงฟัน ~1 วิ จึงจัดสรร bitmap ใหญ่ขึ้นทุกเฟรมบนจอ 3x — ถ้า QA มือถือเห็นกระตุก ลด cap เป็น 2 ได้

## วิธีตรวจ (QA) / Rollback
- ตรวจ: เปิดเว็บจริง เข้าฉากรบ — ยามาพุ่งโจมตี, นิราหันขวาตอน attack/heal, เมนูมือถือไม่บังศัตรู, การ์ดคัตซีนเป็นสี่เหลี่ยมไม่แหว่ง, ภาพยามาไม่แตกบนจอ retina
- Rollback: `git revert -m 1 4a3fd91` แล้ว push
