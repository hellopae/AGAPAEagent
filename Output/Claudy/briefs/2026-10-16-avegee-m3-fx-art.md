# ใบงาน M3: AVEGEE — วาด texture เอฟเฟกต์ฉากต่อสู้ตามสเปกของ Toby · suffix `-m3`

## บริบท
- คำสั่ง: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Kittanate-source/2026-10-16-avegee-m-requests.md` (คุณเป้ขอ effect สวยแบบ Octopath)
- **สเปกเต็ม (อ่านทั้งไฟล์ ทำตามทุกข้อ ชื่อ/ขนาด/พื้น BLK หรือ ALPHA ห้ามเปลี่ยน)**: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-16-avegee-m2-art-spec.md`
- อ้างอิงลุค: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-16-avegee-m/m-ref-octopath-sheet{1,2}.jpg` + เฟรม `/Users/agapae/agapae-work/backup/avegee-m-ref-frames/hi_###.jpg` (สเปกบอกเฟรมที่ควรดู)
- repo `/Users/agapae/agapae-work/AVEGEE` (worktree ของ run นี้) · โค้ดเอนจิน (Toby M2) จะโหลด `img/fx/<ชื่อ>.webp` เอง — **ใบนี้วาดภาพอย่างเดียว ไม่แก้โค้ด**

## ขอบเขตของ run นี้
แบ่งเป็น 2 run ขนานกัน — ทำเฉพาะส่วนที่ระบุในบรรทัดสั่งงาน (`PART=A` หรือ `PART=B`) ที่ต่อท้ายใบงานนี้
- **PART A**: สเปกหัวข้อ 2.0 ส่วนกลาง · 2.1 ฟัน · 2.2 ลูกไฟ · 2.3 น้ำแข็ง
- **PART B**: สเปกหัวข้อ 2.4 ลม · 2.5 สะกดจิต · 2.6 หอก · 2.7 กระบอง · 2.8 เติมเลือด · **+ `img/ui/icon-defend-shield.png` 128×128 RGBA** (โล่ทองลายไทย ขอบเข้ม หน้าตรง อ่านออกที่ 24–40px — ใช้แทนโล่ CSS ของปุ่ม "ป้องกัน" อัตโนมัติ)
- P1 (2.9, 2.10) ยังไม่ทำ

## วิธี/ตรวจ
- ตรวจด้วย Python ทุกไฟล์: ขนาดตรง · BLK = ขอบ 4 ด้านดำสนิท (ค่า max ของแถบขอบ 4px ≤ 3) · ALPHA = มุมโปร่ง ไม่มี halo · atlas ช่องเท่ากัน · รวมขนาดไฟล์ PART ตัวเอง ≤ ~1.3 MB (webp q~85)
- ภาพตรวจ `output/m3/contact-<A|B>.jpg`: ทุกไฟล์บนพื้นต่อสู้จริง (`img/` ฉากต่อสู้โซนไทย) composite แบบที่โค้ดจะใช้ (BLK = blend lighter/screen, ALPHA = ปกติ)
- `prompts-m3-<A|B>.json` prompt จริงทุกภาพ

## ข้อห้าม
ห้ามแก้ `src/` `index.html` `tests/` catalog · ห้ามเปลี่ยนชื่อ/ขนาดไฟล์จากสเปก · ไม่มีตัวอักษร/โลโก้ในภาพ · ห้าม commit/merge/push · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## เกณฑ์รับงาน
ไฟล์ครบตาม PART · ผ่านการตรวจขอบ/ขนาด · contact sheet · prompt จริง
