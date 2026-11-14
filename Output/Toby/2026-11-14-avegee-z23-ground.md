# Toby — พื้น HD โซน 2 (asia) + โซน 3 (west) เสียบเข้าเกม · 14 พ.ย. 2569

## สิ่งที่ build
- พื้น 2× ของ Codex (9830×6554) โซน 2 และ 3 เป็นค่าเริ่มต้นของโซนนั้น · ตัดเป็นไทล์ 1024 px ×70 ต่อโซน WebP q88 (asia 22 MB, west 27 MB) ไม่มี PNG ใน img/
- สคริปต์ `scripts/install-ground.py <pack> --zone 1|2|3 --name v7 --activate` (ของเดิม install-z1-ground.py กลายเป็น shim) · ไม่วาด ไม่แก้สี ตัดพิกเซลใหม่อย่างเดียว
- ย้อนชุดเดิมด้วยค่าเดียวใน `src/zone-skin.js`: `ZONE2_GROUND_SET = 'v2'` / `ZONE3_GROUND_SET = 'v1'` (โฟลเดอร์ 1× ยังอยู่ในดิสก์)
- ทดสอบ: `node --test tests/*.test.mjs` = 2162 tests, pass 2162, fail 0 (อ่านจากสรุปท้าย log) · ขนาด deploy src+img+audio ≈ 779 MB < 1 GB
- fps (จอคอม 1440×900 เดินข้ามเมืองทั้งแผนที่ ~210 หน่วย/วิ): เดิม 59.1–59.3 / ใหม่ 59.1–59.4, p95 16.7–16.8 ms ทั้งคู่, ไม่มีช่วงเบลอ (preview ค้าง) , ไม่มี request fail · หน่วยความจำ ground baked 65 → ~105 MB (cap 28 ไทล์ ทำงานปกติ) · ไม่ได้วัดบนมือถือจริง
- กำแพงเดิน (walkmask) vs ภาพใหม่: ดูภาพซ้อน 4 จาก 8 จุด (asia lava-bank, asia central-bridge, west central-bridge, west north-stairs) ขอบเดินตามบันได/สะพาน/น้ำ/หน้าผาในระยะ ~1 เซลล์ ไม่ได้ดูอีก 4 จุดที่ซูมนั้น และไม่ใช่การพิสูจน์ทั้งแผนที่

## ไฟล์ที่แตะ
`src/zone-skin.js` · `scripts/install-ground.py` (ใหม่) · `scripts/install-z1-ground.py` (shim) · `scripts/z23-ground-evidence.py` · `scripts/z23-walkmask-overlay.py` · `tests/z23-ground.test.mjs` (ใหม่) · `tests/m3-asia-skin.test.mjs` · `tests/z1-v5-fx3.test.mjs` · `img/map-zone2/v7/` · `img/map-zone3/v7/` · `docs/art-reviews/2026-11-14-z23-ground-integrate/`
branch `claude/2026-11-05-zone1-v5-fx` commit `6f3c5f19` (asia) และ `c7bc395e` (west) push แล้ว ยังไม่ merge main

## วิธีรัน/ทดสอบเอง
1. `cd ~/agapae-work/.toby-worktrees/z1-v5 && python3 scripts/serve-nocache.py 8801` (หรือ static server แบบ threaded) แล้วเปิด `http://127.0.0.1:8801/index.html` ที่ 390×844
2. เข้าเกม → ไปโซน 2 / 3 (หรือใน console: เปิด port ทุกโซนแล้ว `G.moveZone('asia')`) → เดินไปลานกลาง สะพานกลาง หน้าผาตะวันตก
3. ภาพเทียบ เดิม|ใหม่ 8 ภาพ + ภาพกำแพงเดินซ้อน 8 ภาพ: `Output/Review/2026-11-14-z23-ground/` (ทุกภาพ ≤ 0.75 MB)
4. เทียบเองเร็ว ๆ: แก้ค่าคงที่เป็น 'v2'/'v1' แล้วรีเฟรช

## ปัญหาที่เห็น (ส่งต่อ Codex ได้เลย · prompt อยู่ใน README ของ docs/art-reviews/2026-11-14-z23-ground-integrate)
West
1. ทั้งโซนเย็นลง/คอนทราสต์ต่ำลงกว่า v1 หิมะบนพื้นและขอบหน้าผาบางลงมาก (v1 มีกองหิมะขาวตามขอบทาง) หินปูเป็นเทาน้ำเงิน
2. ของที่ถูกลบออกจากพื้น (พุ่มแห้ง/พุ่มหิมะริมหน้าผา รอบลาน ริมน้ำ ปลายสะพานกลาง) หายหรือเหลือน้อย โซน 3 ไม่มี sprite list จึงไม่มีอะไรใส่กลับ
3. fallback หัวสะพานกลาง (central-bridge-head) นุ่มกว่ารอบข้าง ตามที่ Codex เขียนไว้
Asia
4. ภาพ asia-lava-bank: บันไดเฉียงยาวขึ้นขวาบนกลายเป็นทางลาดเรียบช่วงกลาง (ขั้นหายราว 1 ใน 3) กำแพงเดินเดิมยังพอดีกับทางลาด
5. หินปูแบนและเย็นกว่า v2 ลาวาเข้มกว่า (แสงขาว-เหลืองน้อยลง) เป็นภาพวาดคนละแบบ ไม่ใช่ข้อผิดพลาด
ทั้งคู่
6. Codex รายงานจุด landmark เกิน 4 px: asia 7 จุด, west 33 จุด (NCC) ฉันไม่ได้พิสูจน์ครบทั้งแผนที่ รอยต่อระหว่างชิ้นไม่เห็นเป็นเส้นตารางในภาพเกม 8 มุมที่ดู (ไม่ได้เดินตรวจทุกตารางนิ้ว)
- ไม่พบ error/404 ใน console ระหว่างรัน · ภาพโซน 1 (v7r) ไม่เปลี่ยน

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มีของใหม่ — ถ้าคุณเป้ต้องการให้พุ่ม/ต้นที่หายในโซน 3 กลับมา ต้องให้ Codex ส่งเป็นชุด sprite + sprites.json (พิกัดเท้า) แบบโซน 1 หรือวาดกลับเข้าพื้น (ใบงานแยก)

## สิ่งที่ยังไม่ทำ
- ไม่ merge main (Claudy merge) · ไม่ได้ทดสอบมือถือจริง/fps บนมือถือ · ไม่ได้เดินทดสอบ gameplay เต็มโซน (เทสต์อัตโนมัติ 2162 ผ่าน + เดินจำลอง teleport ข้ามเมือง) · ไม่ปรับสี/ไม่ใส่ sprite ใด ๆ แทนของที่หาย
- โซน 4 (cyberhell) ไม่แตะ
