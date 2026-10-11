# I2-A — ผลแก้และข้อที่ยังตรวจไม่ได้

Worktree: `/Users/agapae/agapae-work/.codex-worktrees/20261011T043015Z-2c390e2a`
Branch: `codex/20261011T043015Z-2c390e2a` · ฐาน `b3b69ef1956ebc17c6e4bbe1bc46bd006eca85e6`
ไม่มี commit/merge/push/deploy และไม่ได้แก้ hooks, status.json, worklog.json, ภาพปกหรือวิดีโออินโทร

## ต้นเหตุและการแก้

1. ไฟ: บนฐานที่กำหนด มาสก์กันตัวละครครอบคบเพลิงข้างบัลลังก์และลบไฟตำแหน่งนี้ออกทั้งหมด ขอบ polygon เดิมยังเริ่มต่ำกว่าปลายไฟ โค้ดวาร์ปเดิมดึงภาพปกทั้งบริเวณรวมพื้นหลังเข้ามา แล้ว clip ด้วยมาสก์ จึงเสี่ยงเกิดรอยต่อแข็ง อีกทั้งแยกไฟหน้าแท่นจากความกว้างอย่างเดียว ทำให้คบเพลิงใหญ่/คบเพลิงคู่ด้านซ้ายถูกจัดผิดชนิด แก้ด้วยคืนมาสก์เฉพาะสีทอง/ขาวของเปลว (ตัดท้องฟ้าสีแดง), เพิ่มพื้นที่ด้านบน 16 mask pixels พร้อม feather 3 pixels, วาร์ปจาก texture ที่ตัดเฉพาะไฟ และใช้ตำแหน่งร่วมกับความกว้างแยกไฟหน้าแท่น ตรวจภาพคบเพลิงทั้ง 6 ตำแหน่งที่ 0, 1.5, 3.5 วินาที ไม่พบรอยตัดยอดตรงในเฟรมที่ตรวจ
2. ขอบแท่น: ส่วนนี้มีลาวาจริงด้านหลัง แต่เส้นสะท้อนสีส้มบนหินขอบหน้าผาผ่าน colour test ของ lava mask ด้วย เมื่อเลื่อน texture แนวนอน พิกเซลหินจึงขยับ/สว่างร่วมกับลาวา ตัดมาสก์หินออก 227 pixels โดยคงลาวาหลังหน้าผาไว้ ในเฟรมเปรียบเทียบขอบหินอยู่กับที่

คงค่าความแรง/จำนวนอนุภาคใน COVER_FX_LEVEL และวิธีวาร์ปไฟกว้างหน้าแท่นเดิมไว้ Volcano/soul masks ไม่เปลี่ยน

## ไฟล์แก้ (6)

- `src/cover-fx-h5b.js`
- `scripts/h5b-cover-masks-v4.py`
- `img/cover-fx/fire-v4-mask.png`
- `img/cover-fx/lava-v4-mask.png`
- `index.html`
- `tests/h5b-cover-fx.test.mjs`

## ผลตรวจ

- `node --test tests/*.test.mjs`: 729 tests, pass 729, fail 0, cancelled 0 (tests-confirmed.txt)
- `node --test tests/h5b-cover-fx.test.mjs`: 15 tests ผ่าน (cover-tests-final.txt)
- `git diff --check`: exit 0
- รัน generator ซ้ำ: SHA256 masks ทั้ง 4 ตรงกันทุกไฟล์ (mask-rebuild.txt)
- GIF ตรวจด้วย Pillow: 1600×900, 50 frames, 100 ms/frame, รวม 5000 ms
- Benchmark Skia 40 draws ต่อรุ่น, รันเรียงหลังชุดเทสต์: median ก่อน 289.63 ms → หลัง 267.81 ms (-7.5%); p95 377.45 → 361.41 ms ค่านี้เป็นเครื่องทดสอบผ่าน @napi-rs/canvas ไม่ใช่ FPS หรือ RAF ใน Chrome
- การเปิด Chrome headless ผ่าน Playwright ถูก sandbox ปิดด้วย SIGABRT จึงไม่ได้ตรวจ Home UI และ timing ในเบราว์เซอร์
- เคยมีรอบทดสอบที่ construction-arrival จบด้วย pending Promise ระหว่างรันหลายงานพร้อมกัน ไม่แก้ไฟล์นอกขอบเขต; รอบสุดท้ายที่เก็บใน tests-confirmed.txt ผ่านทั้งหมด

## Self-check เกณฑ์รับงาน

1. มีภาพก่อน/หลังครอปขยายสองจุด 4 เวลา (0, .5, 1, 1.5s): torch-before-after.png และ cliff-before-after.png; all-six-torches-after.png ตรวจคบเพลิงทุกตำแหน่ง หลักฐานมาจาก Canvas engine ยังรอ Dale ตรวจภาพใน Home จริง
2. มี cover-after-1600x900-5s.gif ครบขนาด/เวลา และ benchmark Skia ไม่แย่ลง แต่ GIF เป็นภาพปก+เอฟเฟกต์ ไม่มี Home UI และยังไม่ยืนยันเวลาเฟรมในเบราว์เซอร์ — เกณฑ์นี้ยังไม่ครบ
3. ผ่านชุด node tests ทั้งหมดในรอบสุดท้าย; module cache-bust `h5b-intro-v3-coverfx-i2a` และ mask URL `h5b-i2a` ลงท้าย `-i2a` — ครบ
4. มีรายงานต้นเหตุและหลักฐานนอก repo แต่เขียนได้เฉพาะ `/tmp/AGAPAE Agent/Output/Codex/2026-10-11-i2a/` เพราะ Output จริงอยู่นอก writable roots และ session ไม่เปิดให้ขยายสิทธิ์ — ยังต้องย้ายไปตำแหน่งตามใบงาน

ไม่ได้สรุปว่า QA ผ่าน งานยังค้างการตรวจ Home จริง/เวลาเฟรมในเบราว์เซอร์ และการย้ายหลักฐานไป Output จริง

ไฟล์ i2a.patch เป็น diff รวม binary สำหรับผู้ตรวจ ส่วน render.cjs/bench.cjs เป็นสคริปต์สร้างหลักฐาน (ใช้ @napi-rs/canvas ที่ /tmp/i2a-tools)
