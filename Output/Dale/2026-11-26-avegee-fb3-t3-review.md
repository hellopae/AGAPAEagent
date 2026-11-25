# Dale · รีวิว + merge AVEGEE FB3-T3 · 26 พ.ย. 2569

ผล: **PASS ทั้ง 5 ข้อ** · merge แล้ว (fast-forward) · deploy สำเร็จ

## เกณฑ์รับงาน
| ข้อ | ผล | หมายเหตุ |
|---|---|---|
| 1 ข้อความตรงตัว | PASS | เทียบ Comment9 / m5 / e16 (ภาพ) + ตาราง Rae A1–A8, B1 ใน diff แล้วตรงทุกจุด · Toby แก้คำพิมพ์ผิดของคุณเป้ 2 จุด ("ของฟัง"→"ขอฟัง", "ไม่เคยเคยทำ"→"ไม่เคยทำ") จดไว้แล้วในรายงาน Toby ข้อ 1 · EV8 แก้ "ลุกชาย"→"ลูกชาย" |
| 2 หน้าสอบสวนสีดา | PASS | ใช้ห้อง openTrial ปกติ · การ์ดมีแค่บรรทัดแฟ้ม + บรรทัดส้มของนิรา ไม่มีบุญ/ป้าย/หัวข้อที่เฉลย · ไม่มีกระจก/ตวาด/สะกดจิต/ขังไว้ก่อน · ไม่มี "จับได้คาหนังคาเขา" |
| 3 ระบบ (ไม่นับ) | PASS | `merit-count.js`: บุญปลอมโชว์ (ไม่นับ) เมื่อ `exposed` หรือปิดคดี · `v:0` ที่จริงโชว์เมื่อปิดคดี · ไม่ถูกแตะ `deservedOf` · เทสต์ 4 ชุด |
| 4 วันทองหันซ้าย / พยาบาล soul-nurse | PASS | `TRIAL_SOUL_DRAWN_FACING_RIGHT` + CSS `scale:-1 1` · พยาบาลผ่าน soulPortrait + art.js |
| 5 เทสต์เต็มรอบ + รายงาน + ภาพ | PASS | ดูด้านล่าง |

## ตรวจ diff (หัวข้อที่สั่ง)
- **(ไม่นับ) ก่อนเฉลย:** `meritNotCountedShown(m, closed)` คืน true เฉพาะ fake+exposed, fake+closed, v:0+closed · ไม่เจอทางโชว์ก่อนเฉลย · ไม่แตะการคิดคะแนน
- **เซฟเก่าที่มีสีดาในคิว:** `ensureStoryCase` มี migration (`!queued.faceNote` → `Object.assign(queued, mkCaseSoul(def), {id, storyHearing:true, waited})`) · id/ลำดับคิว/waited คงเดิม · ไม่พัง
- **พลิกภาพวิญญาณ:** ใช้ CSS property `scale` ไม่ใช่ `transform` จึงซ้อนกับแอนิเมชันตกใจได้ · `.arena .fig.foe img.face-flip{transform:scaleX(-1)}` ใน index.html อยู่เฉพาะ `.arena` (ศึก) ไม่กระทบห้องสอบสวน จึงไม่พลิกซ้อน · `soulFearBurst` อยู่คนละ element
- **MN6 / seeded sim:** ยังจับตัวสุ่ม `pick(known)` และ `pickFresh(ADMIT_TPL)` ตามลำดับเดิม เปลี่ยนแค่ว่าข้อไหนไปเติมแม่แบบ · ใช้ placeholder คงจำนวนบรรทัด แล้วเติมโดยไม่สุ่มเพิ่ม · เทสต์ balance/sim เดิมผ่านทั้งหมด
- **bug เล็กที่เจอ + แก้เอง:** importmap id ของ `z1-wanthong.js` (`20261121-storynames`) ไม่ถูก bump ทั้งที่ T3 แก้ไฟล์นี้ (ข้อความขุนแผน/นางวันทอง) → browser ที่ cache ไว้อาจเห็นข้อความเก่า · แก้เป็น `20261121-storynames-fb3t3` ด้วย `scripts/bump-cache-id.py` (commit แยก `41b68754`)
- cache token อื่น: art, battle-facing (2 บรรทัด), data (2), diagnosis, diagnosis-ui, game (2+ส่วน), i18n, interrogation-ui.js (+ลิงก์ css), soul-portraits, ui ถูก bump ครบ · `merit-count.js` เป็นไฟล์ใหม่ import ไม่มี ?v ปลอดภัย · `z1-events.js` / `z1-yomathat.js` ไม่มีใน importmap (ธรรมเนียมเดิม ไม่มี token) — cache แค่ตาม Pages max-age ~10 นาที

## เทสต์เต็มรอบบน main (หลัง commit แก้ cache)
`node --test --test-concurrency=6 tests/*.test.mjs` → **tests 2604 · pass 2604 · fail 0 · cancelled 0** · `balance28b` ไม่ค้างในรอบนี้ (concurrency 6)
- hash fixture `fb3-t3-runtime-changes.json`: main ยังอยู่ที่ `a9d02d4f` (ฐานเดิม) จึงไม่ต้อง rebuild

## Merge / deploy
- merge: fast-forward `origin/toby/fb3` (`2a0c9203`) เข้า main + commit แก้ cache `41b68754` → push `a9d02d4f..41b68754`
- GitHub Actions "Deploy Pages" run 45721712844: **success** (1m55s ไม่ต้อง rerun)
- ตรวจ https://hellopae.github.io/AVEGEE/version.json → `{"build":"41b68754"}` ตรงกับ main

## จดไว้ (ไม่บล็อก — ส่งต่อคุณเป้/Claudy)
1. ข้อความหลังเปิดโปงบุญปลอม (`game.js` press 'boast') ยังพูดว่า "บุญปลอมถูกลบออกจากสำนวนแล้ว" แต่ตอนนี้บุญอยู่ในรายการพร้อม (ไม่นับ) → ขัดกันเล็กน้อย ควรให้ Rae เขียนใหม่
2. บุญ `v:0` ที่มี `note` "…ไม่นับให้" ยังเฉลยก่อนสอบสวน (ของเดิม) — ถ้าต้องการซ่อนจนเฉลยบอกได้
3. EV18 หัวข้อหน้า "ยักษ์ทวารบาลออกมาช่วย" ยังสื่อว่าเฝ้าประตู (คุณเป้ไม่ได้สั่งแก้) · ไม่มีอังกฤษคู่ใน cutscene
4. MN6 มีบทแทนของคุณเป้บทเดียว (หมาจร) บุญอื่นใช้บทกลาง
5. สีดา: เอาบุญ 3 ข้อ + ป้าย "บัญชีผิดปกติ" ออกตามภาพ Comment9 · ตัดกระจก/ขังไว้ก่อน เป็นการตัดสินใจของ Toby
6. ภาพวิญญาณวันทองใหม่ (Codex C2) ยังไม่มา — ถ้า C2 วาดหันซ้ายแล้วต้องลบ `soul-wanthong-th` ออกจาก `TRIAL_SOUL_DRAWN_FACING_RIGHT` ใน `src/battle-facing.js` ไม่งั้นจะหันขวา
7. ยังไม่ได้ทดสอบเล่นจริงบนเว็บบน deploy (ตรวจ diff + เทสต์ + ภาพก่อน/หลังของ Toby เท่านั้น) — Chris/คุณเป้ QA ตามขั้นตอนท้ายรายงาน Toby

## Rollback
`git revert 41b68754 2a0c9203..` หรือ revert ช่วง `a9d02d4f..41b68754` บน main แล้ว push (Pages deploy ใหม่เอง)
