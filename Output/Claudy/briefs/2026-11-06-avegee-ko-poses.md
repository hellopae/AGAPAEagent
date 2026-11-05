# KO-POSES — วาดท่าล้ม/นอนเมื่อเลือดหมด ตัวละครทีมทุกตัว (รอ Codex reset) · 6 พ.ย. 2569

Repo: AVEGEE (worktree ของ run นี้) · งานวาดล้วน · ห้าม commit/push/merge เอง · **ImageGen ในตัวเท่านั้น** ห้าม Shado

## คุณเป้ (5 พ.ย. 23:45)
"ตัวละคร Yama เลือดหมด ตัวละครก็ควรจะเป็นท่าล้มลงไปนอน อยากให้วาดตัวละครทีมเราทุกตัว เมื่อเลือดหมด ก็ล้มลงไปนอน"
ภาพหน้าจอ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/2026-11-05-map-redraw/input/owner-2336/5-23.45.29.jpg` (ยามา 0/100 ยังยืนอยู่)

## ตัวละคร (sprite ต่อสู้เดิม = แบบ อ่านจาก `img/combat-animation-v1/manifest.json`)
ยามา `yama:<zone>`, นิรา `nira:<zone>`, `crew:<zone>:{dam,taan,plerng,boon,kan,guard}` · โซน `th, asia, west, cyberhell`
**ลำดับ**: โซน 1 (`th`) 8 ตัวก่อน → แล้วโซนอื่นถ้าทัน (32 ชุดรวม — แบ่งหลาย run ได้)

## ชิ้นที่ต้องได้ต่อตัว
- `ko-fall`: ล้มลง 4–6 เฟรม (เซ → ทรุดเข่า → ล้มลงนอน) · `ko-lie`: นอนค้าง 1–2 เฟรม (หายใจเบา ๆ / ดวงวิญญาณลอยเล็กน้อยได้)
- ตัว/ชุด/อาวุธ/สี **ตรงกับ sprite ต่อสู้เดิมของตัวนั้นในโซนนั้น** ขนาด/สเกลเท่า sprite เดิม มุมกล้องเดียวกัน หันทางเดียวกับท่ายืนในฉากต่อสู้ (ทีมเราหันขวา) · foot (จุดแนบพื้น) ตรงกับท่ายืน · ขอบ alpha สะอาด
- วาดทั้งชุดของตัวนั้นใน 1 ครั้งบนพื้นสีเรียบ (แบบ sprite sheet) แล้วตัด/จัดศูนย์ด้วยสคริปต์ — ใช้ sprite เดิมเป็นภาพอ้างอิงทุกครั้ง

## ส่งออก `docs/art-reviews/2026-11-06-ko-poses/`
`<key>-ko.webp` (แถวเดียว: fall เฟรม + lie เฟรม) + `ko-manifest.json` (`key, frames, frameW, frameH, fallFrames, lieFrames, fps, foot`) — key ตาม manifest เดิม เช่น `yama:th:ko`, `crew:th:taan:ko` · `contact-sheet.jpg` (ยืน | ล้ม | นอน ทุกตัว) · README ไทย · ≤ 40 MB
Toby ทำจุดเสียบไว้แล้วใน branch `claude/2026-11-05-zone1-v5-fx` (ใบงาน FX5 ข้อ 6)

## ข้อห้าม: ห้ามแก้ `src/` `tests/` `img/` เดิม · ห้ามเปลี่ยนหน้าตาตัวละคร · ห้ามมีเลือด/ความรุนแรงเกินเรต (ล้มสลบ ไม่ใช่บาดเจ็บสาหัส)
## เกณฑ์รับงาน: โซน 1 ครบ 8 ตัว ตรงกับ sprite เดิม · foot ตรง · ล้มลื่น
