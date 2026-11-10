# Z1-V7-CLOUDS — วาดเมฆ/ทะเลหมอกเป็นชั้นแยกความละเอียดสูง (รอ Codex reset · หลัง HD-FULL ครบ) · 5 พ.ย. 2569

Repo: AVEGEE (worktree ของ run นี้) · งานวาดล้วน · ห้าม commit/push/merge เอง · **ImageGen ในตัวเท่านั้น**

## ⚠️ อินพุต (เพิ่ม 10 พ.ย. 2569 19:25 — worktree ของ run นี้แตกจาก main ซึ่งยังไม่มีพื้น v7 · อ่านไฟล์จาก path เต็มด้านล่างได้เลย อย่าหยุดงานเพราะ "ขาดพื้น v7")
- **พื้น v7 (ASSEMBLE เสร็จแล้ว)**: `/Users/agapae/agapae-work/.codex-worktrees/20261110T115811Z-6ad6e037/docs/art-reviews/2026-11-05-z1-v5-hd-assemble/v7/` + `README.md`, `inventory.json`, `overview.jpg`, `structure.json` ในโฟลเดอร์แม่
- **branch เกมปัจจุบัน** (`claude/2026-11-05-zone1-v5-fx`): `/Users/agapae/agapae-work/.toby-worktrees/z1-v5/` เช่น `img/map-zone1/v5-fx/fx-layout.json`, `src/terrain*.js`, `src/town-walkmask.js`
- fluids เดิม: `/Users/agapae/agapae-work/.codex-worktrees/20261105T020534Z-e4155fda/`, fluids-HD: `/Users/agapae/agapae-work/.codex-worktrees/20261105T025249Z-3596dfe4/`
- รายงาน Toby: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-11-05-z1-v5-fx.md` · ภาพคุณเป้วง: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/2026-11-05-map-redraw/input/owner-1809/`
- คัดลอกไฟล์ที่ต้องใช้เข้า worktree ของ run นี้ (เช่น `docs/art-reviews/<งานนี้>/input/`) แล้วทำงานต่อ · ส่งออกยังอยู่ใน worktree ของ run นี้ตามเดิม


## คุณเป้ (5 พ.ย. ~14:10)
"หมอกกับเมฆยังไม่เห็นเลยว่าอยู่ตรงไหน เมฆทำ animation sprite ให้ชัดกว่านี้ได้ไหม หรือควรวาดรูปแผนที่แยกเมฆไปอีกรูป"
Claudy เสนอ: **วาดเมฆแยกเป็นอีกชั้น** ความละเอียดเท่าพื้นใหม่ (2.56 px/หน่วย) แล้วขยับด้วยเมฆลอยช้า + ผสมระหว่าง 2–3 แบบที่วาด (crossfade) → คมเท่าพื้น และเห็นชัดว่าเมฆอยู่ตรงไหน
(รอบก่อน cloud-sea เป็นเฟรม 627 px ขยายใหญ่ → เบลอ และอยู่แค่ 4 หย่อมเล็ก)

## ขอบเขต
ทะเลเมฆ/หมอกขาวทั้งหมดใน v5: รอบประตูสวรรค์ (กลางบน), ขอบซ้าย-ขวาแผนที่, หุบระหว่างหน้าผา · **ไม่รวม** หิมะฝั่งน้ำแข็ง และ **ก้อนหมอกขาว 12 จุดที่คุณเป้ให้ลบ** (`/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-11-05-v5-white-lumps.json` `toDelete`)
mask เดิมอ้างอิง: fluids-HD `cloud-sea` + fluids รอบ 1 `fog` (`/Users/agapae/agapae-work/.codex-worktrees/20261105T025249Z-3596dfe4/...`, `.../20261105T020534Z-e4155fda/...`) — ขยายให้ครอบเมฆจริงทั้งหมด

## ขั้นตอน
1. mask `cloud-layer` เต็มแผนที่ (2×) + รายการบริเวณ
2. วาดชั้นเมฆ RGBA แยกจากพื้น ทีละส่วนเล็ก (แบบ 2×2 ต่อ chunk ที่มีเมฆ) **2 แบบ (A/B) ต่างกันเล็กน้อยที่รูปก้อน** สำหรับ crossfade ช้า · ขอบนุ่ม ไม่ตัดแข็ง · สีขาวอมม่วง-ทองแบบ v5
3. ก้อนเมฆลอยเล็ก 6–10 ก้อน RGBA คม (≥ 2.56 px/หน่วย) สำหรับลอยช้าภายใน mask
4. พื้นใต้เมฆ: ส่งรายการให้ run พื้น (ถ้าพื้นต้องมีโทนหุบมืดใต้เมฆ) — ไม่แก้พื้นเอง
5. preview + คลิป 12 วินาที 3 มุม (ประตูสวรรค์, ขอบซ้าย, หุบกลาง) · README

## ส่งออก `docs/art-reviews/2026-11-05-z1v7-clouds/` (`layer-A/`, `layer-B/` grid เดียวกับ v7 2048, `puffs/`, `cloud-layer-mask.png`, `clouds.json`) · ≤ 60 MB
## ข้อห้าม: ห้ามเลื่อน/เฟดภาพนิ่งเดียวเป็นเฟรม (A/B ต้องวาดจริง) · ห้าม parallax กล้อง · ห้ามแก้ `src/` `tests/` `img/` เดิม
