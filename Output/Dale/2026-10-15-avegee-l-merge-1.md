# AVEGEE L-merge-1 (L3 -> L1) — Dale, 15-16 ต.ค. 2569

Live: https://hellopae.github.io/AVEGEE/ · Pages built ตรง a511143 (ผ่านทั้ง L-merge-1 และ L-merge-2)
เริ่มที่ main a30b7e9 (Pages built ตรง SHA) · ล้าง worktree/branch codex 3 ตัว (545f53f, b6276c7, a30b7e9 อยู่ใน main แล้ว)

| งาน | ผล | main SHA |
|---|---|---|
| L3 | PASS (+แก้เล็ก 1: ข้อความ "อยู่ในทีมสู้/เหตุผล" ล้นการ์ดที่ 360-390px -> ให้ wrap) | 08a6024 |
| L1 | PASS (+แก้ 1: shadow field ต้อง rebuild เมื่อสไปรต์ K1e โคมทอง/ต้นแดง/ต้นหิมะโหลดเสร็จ — เดิม sig ไม่นับ key ใหม่) | 965130f |

## ตรวจ L3
ปุ่มพัก: เดิน -> พัก -> กลับ (ตรวจใน Chromium 390/360) · ทีมสู้กดพักได้ ตัดออกจากสนามชั่วคราว · สะกดจิต lv5 โซน 1 ล็อก ไม่มี popup · ตั้ง abilities.hypno แล้ว popup เด้งครั้งเดียว · เซฟเก่า lv4 ถูกริบ (เทสต์ l3-crew-rest-hypno 7 ข้อ)
## ตรวจ L1
town-shade.js แยก ไม่แตะ town-lighting.js · mapCharK()=0.75 โซน 1 · นิราอยู่แท่น ขวาบัลลังก์ กด E เปิดโต๊ะนิราได้ · เงา caster ใช้ propArt เดียวกับ scenery (รวม K1e keys)
Merge: ใช้ merge main เข้า branch (ไม่ rebase) แก้ชนครั้งเดียว · bump importmap `town-layout.js` -> `hell-fire-v2-l1`, game.js `...-l3-l1`, ui.js token `...-l4b-l3-l1`
## fps (run_scenes.py, 1440x900 DPR2, เทียบ main 08a6024 กับ L1 สลับกัน)
รอบ 1 (โหลดเครื่อง ~17-21): main walk 55.8 / L1 52.3 · idle 59.4/53 · ผันตามโหลด
รอบ 2 (โหลด ~7-12): main idle 60 walk 57 z6.5 60 z6.5walk 59.5 · L1 idle 60 walk 57.2 z6.5 59.6 z6.5walk 59.6 -> เท่ากัน ไม่มี regression
## เทสต์ (node --test tests/*.test.mjs)
ฐาน main a30b7e9 = 951 รัน แดง 7 (I1-A x3, K5 wiring, h5b v4 masks, construction two builds, F1/F3 cache-bust) · หลัง L3 958 / แดง 7 เท่าฐาน · หลัง L1 964 / แดง 6 (K5 wiring ถูกแก้ด้วย L1) ไม่มีแดงใหม่
## Rollback
merge เป็น fast-forward — revert ตาม commit: L1 `git revert -m 1 889bcf5` แล้ว `git revert 965130f` (หรือ revert ทั้งช่วง 08a6024..965130f) · L3 `git revert 08a6024 387191f c5513c8` แล้ว push
