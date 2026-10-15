---
name: sprite-animation-spa
description: ทำ/แก้ animation sprite (pixel art) ด้วย SPA (aseprite-automation) หรือ Pillow — ตัดเฟรม จัดจุดเท้า ตั้งเวลาเฟรม ทำ sprite sheet + JSON + GIF + ไฟล์ .aseprite แก้ต่อได้ ใช้เมื่อคุณเป้สั่งงาน animation ตัวละคร (เช่น ยมบาทน้อย AVEGEE: ท่ายืนพัก/ฟันดาบ/เดิน) โดยเฉพาะตอน Codex ชนลิมิตแล้ว Claude ต้องทำต่อ หรือรับช่วงงาน SPA ที่ Codex ทำค้างไว้
---

# Animation sprite ด้วย SPA / Pillow

SPA = `aseprite-automation` (github.com/aigengame/aseprite-automation, MIT) — CLI `spa` ที่สั่ง **Aseprite แบบ batch**
ทำงานกับเลเยอร์ เฟรม cel แท็ก พาเลต และ export PNG/GIF/sprite sheet+JSON โดยเก็บ `.aseprite` ต้นฉบับไว้แก้ต่อ

## 0. แบ่งงานให้ถูกก่อน
- **วาดท่าใหม่ = Codex (imagegen)** — Claude ไม่มี imagegen · Claude ทำได้: ตัด/จัด/ตั้งเวลา/ประกอบ/ส่งออก/ตรวจ จากภาพที่มีอยู่
- ถ้า Codex ชนลิมิตกลางงาน: งานที่ต้องวาดใหม่ → เขียนเป็น prompt ค้างไว้ (ดู `idle-v2/prompt.txt` ของ pilot เป็นแบบ) · งานประกอบ/จัดเฟรม → ทำต่อด้วยขั้นด้านล่าง
- AVEGEE: อ่าน `docs/ui-work-coordination-*.md` ล่าสุด — ไฟล์ภาพยม/`drawStandee` อาจเป็นของ Codex app อยู่ ห้ามแตะโดยไม่ตกลง
- งานทดลองทำในโฟลเดอร์แยก ไม่แก้ `src/`/`img/` ของเกมจนคุณเป้ดูพรีวิวแล้ว

## 1. ตรวจเครื่องมือ (ทำทุกครั้ง)
```bash
uv tool install --python 3.13 aseprite-automation   # มีบน PyPI แล้ว (0.4.0) · หรือ venv แยก: uv venv --python 3.13 .venv && uv pip install --python .venv/bin/python aseprite-automation
spa version
export SPA_ASEPRITE_EXECUTABLE="/Applications/Aseprite.app/Contents/MacOS/aseprite"   # ไบนารีใน .app ไม่ใช่ตัว .app
spa info        # ต้องไม่ใช่ executable_not_found
```
- **ณ 15 ต.ค. 2569 เครื่องนี้ยังไม่มี Aseprite** → ทุกคำสั่ง SPA ที่แตะภาพ (รวม `raster prepare`) ต้องใช้ runtime ของ Aseprite จะล้มทั้งหมด → ใช้ทาง Pillow (ข้อ 3) และบอกคุณเป้ว่าต้องติดตั้ง Aseprite (ซื้อ/Steam หรือ build จาก source) ก่อนใช้ SPA จริง
- ตัวที่ Codex ติดตั้งไว้: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE/output/spa-pilot-20261015/.venv` (clone ของ Codex — อ่านได้ ห้ามแก้)

## 2. ทาง SPA (เมื่อ `spa info` ผ่าน)
- หาคำสั่งเอง อย่าเดา: `spa --help` → `spa <กลุ่ม> --help` → `spa <กลุ่ม> <คำสั่ง> --schema` (บอก request schema + runtime ที่ต้องมี)
- ทุกคำสั่งรับ `--input-json '{...}'` ตอบ JSON `status` · ปฏิเสธเขียนทับ (`"overwrite":false`) — ใช้ชื่อไฟล์ใหม่ทุกขั้น หรือ `"in_place":true` เมื่อแน่ใจ
- ลำดับงานทั่วไป:
  1. `raster prepare` แต่ละเฟรม: ขนาด canvas เดียวกัน, anchor = กลางเท้า, พื้นโปร่งใส
  2. `sprite create` → `frame add` / `cel add` นำภาพเข้า → `frame set` ตั้งเวลาเฟรม (ms) → `tag` ตั้งชื่อท่า (idle/attack)
  3. ตรวจ: `animation audit` (เวลา/จำนวนเฟรม), `animation compare` (เทียบเฟรม), `animation preview`
  4. ส่งออก: `export sheet` (sheet + JSON ต่อเฟรม), `export gif` (พรีวิว), เก็บ `.aseprite` ไว้คู่กัน
  5. แก้หลายขั้นต่อสไปรต์เดียว: เขียนเป็น plan → `plan check` แล้วค่อย `plan run`
- `motion apply` ขยับ cel (ตำแหน่ง/ความทึบ) ได้ — **แต่คุณเป้ไม่เอาการยืด/หด/ดัดภาพเดิมแทนท่าใหม่** (ปฏิเสธไปแล้ว 15 ต.ค.) ใช้เฉพาะเลื่อนเล็กน้อย/เอฟเฟกต์

## 3. ทาง Pillow (ไม่มี Aseprite) — ตามแบบ pilot ของ Codex
อ้างอิง: `.../AVEGEE/output/spa-pilot-20261015/build.py` (ตัดท่าโจมตีเดิม) และ `idle-v2/prepare.py` (จัดเฟรมที่วาดใหม่)
1. ตัดเฟรมจากภาพที่ Codex วาด (ตัดตามพื้นโปร่งใส/กล่องของแต่ละท่า)
2. **สเกลเดียวทุกเฟรม** `scale = min(สูงเป้าหมาย/สูงสุดของทุกท่า, กว้างเป้าหมาย/กว้างสุด)` — ห้ามปรับสเกลรายเฟรม
3. วางลง canvas เท่ากันทุกเฟรม โดยให้ **กลางเท้าตรงจุดเดียวกัน** (หาจากแถวล่างสุดที่ alpha>0)
4. ต่อเป็น sheet แนวนอน + `metadata.json` (frame_size, durations_ms, anchor, scale, sha256 ต้นทาง) + GIF พรีวิว (พื้นเข้ม+เงาเท้า) + contact sheet
5. ไฟล์ `.aseprite` ต้นฉบับ: เขียนตาม spec ได้ (ดู build.py) แต่**ยังไม่นับว่าผ่าน**จนเปิดใน Aseprite จริง

## 4. มาตรฐาน AVEGEE
- เฟรม 640×640 RGBA มุมโปร่งใส หันขวา · ท่าฟันดาบเดิม `img/yama-sword-v3/hero-yama-th-sword.webp` = 5120×640 (8 เฟรม) เวลา `[85,80,60,35,40,80,100,100]` ms รวม 580
- pilot ท่ายืนพัก v2: 6 เฟรม sheet 3840×640, anchor (240,570), เวลา `[1000,240,420,100,100,260]`
- เทียบความต่อเนื่องระหว่างเฟรมที่วาดใหม่ (หน้า/ชุด/อาวุธต้องเหมือนกัน) ก่อนส่งเข้าเกม — imagegen มักเพี้ยนรายละเอียดทีละเฟรม
- ส่งคุณเป้ดู GIF/หน้าพรีวิวก่อนเสียบเข้าเกม · เสียบเข้าเกมแล้ว cache-bust + `node --test tests/*.test.mjs`

## เกณฑ์เสร็จ
sheet + JSON + GIF + (`.aseprite` ถ้ามี Aseprite) · ทุกเฟรมขนาดเท่ากัน จุดเท้าตรงกัน ไม่ยืดภาพ · เวลาเฟรมตามสเปก · คุณเป้เห็นพรีวิวแล้ว
