# ใบงาน L-merge-1: Dale รีวิว + merge L3 แล้ว L1 (+ ล้าง worktree K1e/L4) — AVEGEE main = `a30b7e9`

## บริบท
- คุณเป้ push stack K1e/L4a/L4b แล้ว: main = `a30b7e9` (ต่อจาก Codex app `8f82178`) — ตรวจ Pages built ตรง SHA ก่อนเริ่ม
- ล้างที่ค้างจากรอบก่อน: worktree/branch codex `20261015T071321Z-6527178d`, `20261015T071555Z-c5568393`, `20261015T071610Z-1d8d35b8` (ตรวจว่า commit อยู่ใน main แล้วก่อนลบ)
- เทสต์บน main แดงอยู่แล้ว 10 ข้อจากงาน Codex app (รายการ: `Output/Claudy/briefs/2026-10-15-avegee-codex-app-test-failures.md`) — **ฐานเปรียบเทียบ**: ห้ามมีข้อแดงเพิ่มจากงานที่ merge · ข้อที่ L1/L2 แก้ regex cache-token ได้ก็ดี
- คิวทั้งหมด: `Output/Claudy/briefs/2026-10-15-avegee-l-queue.md`

## งาน (เรียงตามนี้)
1. **L3** `toby/l3-crew-hypno` `7023140` (worktree `.toby-worktrees/l3`) — รายงาน `Output/Toby/2026-10-15-avegee-l3-crew-hypno.md` · ใบงาน `2026-10-15-avegee-l3-crew-rest-hypno.md`
   ตรวจ: ปุ่มพักยมทูต (เดิน→พัก→กลับ), สะกดจิตไม่ได้จากเลเวล/ได้เมื่อชนะแวมไพร์โซน 3, เซฟเก่าที่ยังไม่ชนะถูกริบ (คุณเป้เลือก)
2. **L1** `toby/l1-depth` `b278303` (worktree `.toby-worktrees/l1`) — รายงาน `Output/Toby/2026-10-15-avegee-l1-map-depth.md` · ใบงาน `2026-10-15-avegee-l1-map-depth.md`
   ตรวจ: เงา `town-shade.js` (ไม่ทับ/ไม่แก้ `town-lighting.js` ของ Codex), ตัวละครโซน 1 เล็กลง 25% สัดส่วนเข้ากับอาคาร, นิรายืน/เดินบนแท่นพิพากษาไม่ทับบัลลังก์ คุยได้, ของตกแต่ง K1e ที่เพิ่งเข้า main ได้เงาด้วย
   วัด fps ด้วย `Output/Toby/k3-perf/run_scenes.py` (Toby เห็น walk ต่ำกว่า main ~5 fps ตอนเครื่องโหลด — วัดซ้ำตอนเครื่องว่าง ถ้าต่ำจริงเขียน FIX LIST)
3. แต่ละงาน: rebase บน main ล่าสุด → แก้ชน cache-bust (รวม suffix) → `node --test tests/*.test.mjs` (ไม่มีแดงใหม่) → Playwright ตรวจจริง → merge → **push main**
   - ถ้า push ถูก permission ปฏิเสธ: **อย่าพยายามอ้อม** ให้เตรียม stack fast-forward ไว้ แล้วรายงาน SHA + คำสั่ง push ให้ Claudy ส่งต่อคุณเป้
4. Pages built ตรง SHA · ล้าง worktree/branch toby ที่ merge แล้ว

## ข้อห้าม
ห้ามแตะไฟล์ animation ยม, `town-lighting.js` · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ภาพหลักฐาน /tmp · L2/L5 ยังไม่ต้องทำ (L2 กำลังเพิ่มงาน — ใบถัดไป)

## เกณฑ์รับงาน
PASS/FIX LIST ต่องาน + SHA + Pages (หรือคำสั่ง push ที่ค้าง) + เทสต์เทียบฐาน 10 ข้อ · รายงาน `Output/Dale/2026-10-15-avegee-l-merge-1.md`
