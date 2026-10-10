# ใบงาน (Codex image): AVEGEE — ไอคอนปุ่มซูมแผนที่

Repo `/Users/agapae/agapae-work/AVEGEE` · ฐาน main ล่าสุด · ปุ่ม `#hud-zoom` (งาน H2 กำลังรวมเข้า main) ตอนนี้เป็นตัวอักษร +/−
- วาด 2 ไฟล์: `img/ui/icon-zoom-in.png` (แว่นขยายมี +) และ `img/ui/icon-zoom-out.png` (แว่นขยายมี −) · 96×96 PNG พื้นใส มุมตรงหน้า
- สไตล์เดียวกับไอคอน HUD ที่มีอยู่ (ดู `img/ui/` และไอคอนเสียง `icon-sound-close`/`icon-music-close`) — กรอบทองเข้มแบบเกม อ่านออกที่ 40px
- `prep()` ใน `scripts/prep-art.py` · manifest/preload ด้วยมือ (ชั้น critical เพราะอยู่บน HUD จอแรก — ดู `src/asset-preload.js`)
- **ไม่ต้องต่อโค้ดปุ่ม** (Dale ต่อหลังรวม H2) · ห้ามรัน make-manifest · ไม่ commit ลง main
- เกณฑ์: 2 ไฟล์ + พรีวิวบนพื้นแผนที่ที่ 40px ใน `output/Codex/zoom-icon/` · `node --test tests/*.test.mjs` ผ่าน
