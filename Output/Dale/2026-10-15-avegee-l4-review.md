# L4-review (Dale) — L4a PASS, L4b PASS (รอ push)

- stack: K1e 545f53f -> **L4a b6276c7** -> **L4b a30b7e9** บน origin/main 8f82178 (branch ใน worktree 20261015T071610Z-1d8d35b8)
- **สถานะ push: ยังไม่ push** — permission classifier ปฏิเสธ `git push` ครั้งเดียวของทั้ง stack · Pages ยังไม่ได้ตรวจ

## L4a — ดาบอสิปัตตะ
- **สาเหตุที่ J2 (62e880f) ไม่ติด**: J2 ไม่ได้ส่ง sprite ดาบ — แก้ `src/sword-school-props.js` ให้ Canvas วาด polygon + gradient สีดำ/ม่วงใหม่ (ภาพที่เพิ่มใน J2 คือยม rage 4 ชุด + หนามห้อง ngiw) ดาบหน้าแท่นจึงยังเป็นรูปเรขาคณิต 'ดำม่วง' เหมือนเดิม ไม่ตรงดาบในพื้นหลัง (J2 ยังทิ้งโค้ด thorn ซ้ำในบล็อก dab ด้วย)
- Codex เสียบถึงแล้วเกือบครบ (run ชน rate limit หลังโค้ดเสร็จ ขาดแค่ report): `src/asipatta-swords.js` + `drawSchoolProps(..., zone)` + `room.js` ส่ง `g.zone` ทั้ง 2 จุดเรียก · sprite 8 ไฟล์ (โซนละ 2 แบบ, PNG 160x512 ~60-85KB ไม่แปลง webp)
- ที่ Dale แก้/เก็บ: rebase บน Codex main ผ่าน importmap (`room.js?v=yama-live-20261015-l4a`, preload `-l4a`); manifest: ย้ายจาก `zones['asipatta-l4a']` (สร้าง zone ปลอมใน ZMAP) ไปที่ `rest`; ลบหลักฐาน (`docs/reviews/asipatta-l4a/`, `art-src/.../references/`, `composite-asipatta-l4a.py`) ออก — เก็บไว้ที่ /tmp/avegee-evidence/l4a/ · เก็บ prompts.json/provenance.json (8K)
- Playwright 1440x900 DPR2 เปิดห้องป่าดาบจริง 4 โซน: ดาบ 2 เล่ม/จุด ปักเอียง ตรงฐาน สีตามโซน (th เหล็กลาวา, asia ฟ้าเขียว, west เงินฟ้า, cyberhell ดำม่วง/ฟ้า) กลืนกับดาบพื้นหลัง · ภาพ /tmp/avegee-evidence/l4a/dab-{th,asia,west,cyberhell}.png · ไม่มี pageerror
- หมายเหตุ: ห้องมี 3 จุดวิญญาณ x 2 เล่ม = 6 เล่ม (ใบงานว่า 4) — คงจำนวนเดิมของห้อง

## L4b — ไอคอนชุด
- Codex ต่อโค้ดครึ่งเดียว: ร้านพ่อค้าใช้ไอคอนใหม่แล้ว + เปลี่ยนตู้ชุด/กระเป๋าด้วย
- ที่ Dale ตัดสิน: **คืนการ์ดตู้ชุด/กระเป๋าเป็นภาพยมใส่ชุด** (`hero-yama-*.png`) เพราะการ์ดเหล่านั้นไม่เคยใช้ emoji และชุดไทยไม่มีไอคอน — ปล่อยให้ผสมไอคอนผ้า/ภาพคนจะไม่สม่ำเสมอ · ใช้ไอคอนใหม่เฉพาะร้าน (ที่เดียวที่เคยเป็น 👘)
- ไอคอน 512x512 PNG เหมือน item-*.png เดิม; ย้าย preload จาก `shared` (775KB ทุกโซน) ไปอยู่ในลิสต์ของโซนตัวเอง (ร้านขายเฉพาะชุดโซนปัจจุบัน); manifest ใน `rest`; test ปรับตาม
- cache-bust: ui.js entry `yama-live-20261015-main-l4b` (index + review page) · preload `...hell1-k1e-l4a-l4b`
- Playwright ร้านพ่อค้า asia/west/cyberhell: `item-outfit-{zone}-l4b.png` โหลดสำเร็จ 512px แสดง 52px เคียงไอคอนสินค้าเดิม ไม่มี 404/pageerror (ร้าน cyberhell ต้อง mock `zoneCaptivesFree` เพราะเกมล็อกจนปล่อยเชลย) · /tmp/avegee-evidence/l4b/merchant-{asia,west,cyberhell}.png · โซน th ไม่มีชุดขาย

## เทสต์
full suite บน tip: 951 tests · pass 944 · fail 7 (ชุดเดียวกับ origin/main ที่ Codex push — ดูรายงาน K1e) · ไม่มี fail ใหม่

## Roll back
`git revert a30b7e9` / `git revert b6276c7` แยกกันได้ (คนละไฟล์ ยกเว้น cache token ใน index.html/preload.js)

## ค้าง
push + Pages built + ล้าง worktree/branch codex 3 อัน (K1e/L4a/L4b)
