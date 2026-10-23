# ใบงาน M3 (รอบ 1): AVEGEE — เสียบแผนที่โซน 2 (asia) ด้วยระบบ M2 · Codex (`--write`) → Claudy ตรวจ+merge

## บริบท
- คุณเป้สั่ง 23 ต.ค. 2569: แผนที่โซน 2–4 ใหม่ตามโครง/ระบบโซน 1 ธีมอิงแผนที่เดิม · mask เดินได้ต่อโซน **คุณเป้จะวาดเองภายหลัง** (ตอนนี้ใช้ mask โซน 1)
- ระบบฐาน M2 ขึ้นเว็บแล้ว main `0f95200` — ขั้นตอนเปิด skin: `docs/m2-zone-skin.md` + รายงาน `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-23-avegee-m2-map-base.md`
- สเปกภาพ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Mind/2026-10-23-avegee-m1-zone2-art-spec.md` (§3.10 เช็กลิสต์พื้น, §4 sprite) · ข้อแจ้ง: ปิด `TREE_TINT` เมื่อใช้ต้นไม้ของโซน 2
- ภาพจาก Codex (worktree ใต้ `/Users/agapae/agapae-work/.codex-worktrees/<run>/`, branch `codex/<run>` push แล้ว) — **img/raw ถูก gitignore** ควอแดรนต์ให้ใช้สำเนาใน `output/m1-zone2/<qN>/q-<quad>-srgb.png`:

| ชิ้น | run |
|---|---|
| Q1 NW + refs | `20261023T051200Z-34708b2f` |
| Q2 NE | `20261023T052116Z-b359fc74` |
| Q3 SW | `20261023T052120Z-08a8de2c` |
| Q4 SE | `20261023T053110Z-6564139c` (README มีรายการรอยต่อ/จุดที่ควรซ่อม Q5) |
| S1 แท่นตัดสิน | `20261023T051204Z-73c868fc` |
| S2 บ้าน 4 | `20261023T051208Z-af7c391c` |
| S3 ต้นไม้ 4 | `20261023T051212Z-92c74aea` |
| S4 โคม/คบ/หิน | `20261023T051216Z-ed8b18f0` |
(ไฟล์ปลายทาง sprite ดูจาก `git show --stat codex/<run>` + README ของแต่ละ run)

## ขอบเขต
1. ตรวจภาพทุกชิ้นตามเช็กลิสต์สเปก (ขนาด, รอยต่อ, ตรง guide/mask ±16 preview px, ไม่มีสิ่งต้องห้าม, sprite ไม่มีขอบสี key) — ชิ้นไม่ผ่าน: ไม่เสียบ ใช้ของโซน 1 แทนกลุ่มนั้น + ลิสต์คำขอวาดใหม่ (ระบุพิกัด/ปัญหา)
2. ต่อผืน `scripts/stitch-town-terrain.py --zone asia` → tiles + preview · ตรวจความคมที่ซูม 100% (ภาพขยาย ~1.8×) บันทึกผล
3. เสียบ sprite กลุ่มที่ผ่าน (`ZONE_SKIN.asia.use`) · flow map ถ้าจำเป็น · ปิด tint ต้นไม้
4. เปิด `enabled:true` โซน asia · migration เซฟทำงาน · cache-bust
5. ชื่อเมืองบนจอ (`town.title` = "เมืองอเวจี · โซน 1"): **ห้ามเขียนข้อความใหม่** — ประกอบจากคีย์ชื่อโซนที่มีอยู่แล้วใน i18n (เช่น ชื่อโซน 2 ที่ใช้ในเกมอยู่แล้ว) ถ้าไม่มีคีย์ที่เหมาะ ให้คงข้อความเดิมของระบบเก่าโซน 2 แล้วลิสต์ในรายงาน
6. **เครื่องมือ mask โซน 2 ด้วยภาพจริง**: `make-town-mask-overlay.py --zone asia` → ส่งออกชุดไฟล์ไว้ที่ `/Users/agapae/agapae-work/mask-for-kittanate/asia/` + `HOWTO-mask.txt` ภาษาไทย (คุณเป้จะปาดเอง)
7. ตรวจในเบราว์เซอร์ 390×844 และ 1280×800: เดินในเมืองโซน 2 (ลาน/สะพาน/ท่าเรือ/แท่นตัดสิน/สถานี), เข้า-ออกโซน, โซน 1 ยังเหมือนเดิม, ไม่มี pageerror/scroll แนวนอน · ภาพหน้าจอเก็บ `output/m3/` ใน worktree

## ข้อกำหนด
- **ทำงานใน working directory ปัจจุบันของคุณ (git worktree ของ AVEGEE บน branch `codex/<run_id>`) เท่านั้น** ห้ามสร้าง worktree/branch/clone ห้าม commit/push (wrapper ทำ) · ฐานต้องมี M2 (`git log` เห็น `0f95200`) · ดึงภาพด้วย `git checkout codex/<run> -- <ไฟล์>` หรือคัดลอกจากสำเนา output · ไม่เอาโค้ดจาก branch Codex
- ไม่เปลี่ยนตัวเลขเกม · ไม่ merge/push main · เวลาจำกัด 30 นาที: ทำตามลำดับ 1→4→7→6→5 ถ้าเวลาไม่พอให้หยุดที่ขั้นที่เสร็จ และเขียนรายงานว่าค้างอะไร · commit เป็นช่วง อัปเดตรายงานทุกช่วง
- เทสต์ 0 แดง + เทสต์ skin asia เปิดแล้ว

## ส่งมอบ
`output/m3/README.md` ใน worktree: ตารางชิ้น → ผ่าน/ไม่ผ่าน → เสียบ · ผลความคม · เทสต์ · หลักฐาน · คำขอวาดใหม่ (Q5) · path ชุด mask ให้คุณเป้

## เกณฑ์รับงาน
1. โซน 2 ใช้แผนที่ใหม่ เดินได้ไม่ติด (mask โซน 1 ชั่วคราว) · โซน 1 ไม่เปลี่ยน
2. ชุด mask พร้อมให้คุณเป้
3. เทสต์ `node --test tests/*.test.mjs` 0 แดง · Claudy merge
