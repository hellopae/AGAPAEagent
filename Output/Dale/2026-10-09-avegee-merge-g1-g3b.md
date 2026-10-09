# AVEGEE: รวม G1 + G3b เข้า main และขึ้นเว็บ

ผล: **PASS** (มีหมายเหตุ 3 ข้อ ไม่ใช่ FIX LIST) · 9 ต.ค. 2569 · Dale

## สิ่งที่เปลี่ยน
- รวม G1 (ไอเท็ม 4 ชนิด + Guard พักศาลา) และ G3b (ประลองชายแดน 10 wave + ระบบอาวุธ) เข้า main ด้วย merge commit ไม่เขียนประวัติใหม่ ไม่ force push
- ไม่ชนกันจริง (git merge ผ่านโดยไม่มี conflict) · เทสต์ 606 ตัวผ่านหลังรวม
- ไม่เอา `913e8a6` (รายงานใน `output/Toby/`) เข้า main · ไม่รัน `scripts/make-manifest.py` · ไม่แตะ `img/raw/`, `Exam/`

## commit บน main
| hash | เรื่อง |
|---|---|
| `3497794` | Merge G1 (จาก `9ddf93f`) |
| `e7bbda4` | Merge G3b (จาก `b3954e6`, `84a7657`) |
| `83d8e06` | cache-bust ครั้งแรก (ใช้ token ใหม่แทนที่ → เทสต์ f2-ui แดง) |
| `f7c56ff` | cache-bust แก้เป็นต่อท้าย `-g1-g3b` (เก็บ prefix `20261009-f2` ไว้ให้เทสต์) |

ผู้ดูแลควรรู้: `83d8e06` มีเทสต์แดงหนึ่งตัวและถูก push พร้อมกันกับ `f7c56ff` ที่แก้แล้ว (push ครั้งเดียว) ปลายทาง main เขียวทั้งหมด

## cache-bust
- `index.html` → `src/ui.js?v=20261009-f2-merge-f3-f4-sala-books-mirror-art-book-art-oriverse-25d-g1-g3b`
- import `yama-sword.js?v=` ใน `src/ui.js` และ `src/room.js` (ไฟล์นี้ G3b แก้) ใช้ token เดียวกัน
- `CATALOG_VERSION` ใน `src/preload.js` ไม่ขยับ (ไม่มีภาพใหม่)

## ผลรีวิวตามเกณฑ์
- save เก่าโหลดได้: G1 (`teaRest` ไม่มี = ปกติ, เทสต์ "old saves load") · G3b (`challenge`/`weapons` ไม่มี = ค่าว่าง, restore กรองค่าแปลกปลอม)
- ตัวเลขเนื้อเรื่องเดิมไม่ถูกแตะนอกที่สั่ง: G1 เปลี่ยนเฉพาะค่าไอเท็ม 4 ชนิด + เทสต์ที่อิงค่าเหล่านั้น · G3b เพิ่มข้อมูลใหม่ (CHALLENGE_WAVES, WEAPONS) ลำดับสุ่มของฟาดปกติเท่าเดิมเมื่อไม่ถืออาวุธ
- TH+EN: ทั้งสองงานเพิ่มคีย์ใน `src/i18n.js` ครบ (เทสต์ G1 ตรวจ `t(key) != key` ทั้งสองภาษา)
- ตัวเลขสมดุลรับตามที่เป็น ไม่ปรับ (G1 กล่องยา 65% · G3b fang+20/chain+25/cane+25/trojan+30)

## หมายเหตุ 3 ข้อ (ให้ Claudy/คุณเป้ตัดสิน ไม่ได้แก้)
1. **balance28b ช่วง 90–100%**: ขอบล่าง 0.9 ยังจับได้ถ้าเกมยากขึ้น แต่ขอบบน `<= 1` เป็นจริงเสมอ จึงไม่จับกรณี "ง่ายเกิน" อีกแล้ว (เดิม 70–90 จับทั้งสองทาง) ถ้าคุณเป้ปรับตัวเลขยาที่ 65% ควรกำหนดขอบบนใหม่
2. **รายงาน Toby สั่งให้รัน make-manifest**: ไม่ทำตามใบงาน
3. **404 เดิม** บนทั้ง localhost และเว็บจริง: `audio/bgm-*.ogg`, `img/hero-yama-side.png`, `favicon.ico` ไม่ใช่ของรอบนี้ ไม่แตะ

## ผลเทสต์
- `node --check src/*.js` ผ่านทุกไฟล์
- `node --test tests/*.test.mjs`: 606 tests, pass 606, fail 0

## ตรวจใน Chrome (local, serve-nocache.py พอร์ต 8777, headless ผ่าน CDP, เกมใหม่)
- กระเป๋า: ข้าวปั้นให้ทัณฑ์ 40→70 + หิว 30→70 · กล่องยากับ Guard ผ่านตัวเลือก `data-bag-target` 30→95 (+65) ได้
- หน้าโต๊ะนิรา: การ์ด Guard แสดง HP 39/100 + ปุ่ม "ไปพักที่ศาลาน้ำชา" · กดแล้วเป็น "กำลังเดินไปศาลาน้ำชา" (phase travel) ทำงาน
- ชายแดน th หลังเคลียร์ frontierBreach: บอสยืนที่ประตูล่าง มีปุ่ม "คุยกับทัณฑสูร" · กล่องคุยแสดงรางวัลดาบเขี้ยว · กด "ประลอง 10 ระลอก" เข้าศึกโหมด challenge wave 1/10
- console: ไม่มี exception / error ใหม่
- ไม่ได้ทดสอบ: พักครบ 60 วินาทีจนถึงคืนตำแหน่ง และชนะครบ 10 wave ในเบราว์เซอร์ (ครอบด้วยเทสต์อัตโนมัติ g1-items-guard-rest / g3b-frontier-challenge)

## เว็บจริง
- https://hellopae.github.io/AVEGEE/
- Pages build `built` ที่ commit `f7c56ff`
- `index.html` บนเว็บจริงเสิร์ฟ `ui.js?v=...-g1-g3b` · `src/weapons.js` 200 · โหลดแล้ว `G.startChallenge`, `G.restGuard`, `G.weapons = {owned:{},equipped:null}` มีครบ · ไม่มี exception (404 เดิมเท่านั้น)
- ยังไม่ได้เทสต์บนมือถือจริง; ตรวจหน้าจอ 390px ด้วย headless เฉพาะกล่องนิรากับกล่องประลองเปิดได้ (ภาพเก็บใน scratchpad ไม่ได้เข้า repo)

## วิธีตรวจให้ Chris
1. เปิดเกมใหม่ → กระเป๋า (ปุ่มเป้ากระเป๋า) → ข้าวปั้น/กล่องยามีตัวเลือกผู้รับ
2. จ้างยักษ์ทวารบาล สร้างศาลาน้ำชา ให้ HP ยักษ์ต่ำกว่า 50 → โต๊ะนิรา → "ไปพักที่ศาลาน้ำชา"
3. ชนะบอสชายแดนในเนื้อเรื่อง → เดินลงประตูล่าง → คุยบอส → ประลอง

## ย้อนกลับ
`git revert -m 1 e7bbda4 3497794` (ย้อน G3b แล้ว G1) หรือย้อน cache-bust ด้วย `git revert f7c56ff 83d8e06` จากนั้น push ตามปกติ (ห้าม force push)

## การล้าง worktree/branch
- ลบแล้ว: worktree + branch `codex/20261009T150157Z-7cb03085` (G1, merged), worktree `.toby-worktrees/g3b`
- **ยังไม่ได้ลบ (ระบบ permission ปฏิเสธคำสั่งลบ):**
  - `.codex-worktrees/20261009T150212Z-ea485fe0` และ branch `codex/20261009T150212Z-ea485fe0`
  - `.codex-worktrees/20261009T150227Z-a3285037` และ branch `codex/20261009T150227Z-a3285037`
  - ทั้งสองไม่มี commit ที่ยังไม่รวม (HEAD = `75924a4`) แต่มีไฟล์ staged ขยะ (`.g2-base`, `g2/` ~573MB, `.g3c-base`, `AVEGEE-g3c/`) ต้องใช้ `git worktree remove --force` และ `git branch -D`
  - branch `toby/g3b` ยังอยู่ (มีแค่ `913e8a6` รายงานที่ไม่เข้า main จึงลบด้วย `-d` ไม่ได้ ต้อง `-D`) รายงานเก็บที่ `Output/Toby/` แล้ว
- ไม่ได้แตะ: `20261009T163044Z-828fda98`, `20261009T164438Z-1503faca` (Codex run ที่รันอยู่) และ `20261009T150955Z-37863696` กับ `20261005T002509Z-e0a65816` (ไม่อยู่ในรายการของใบงาน)
