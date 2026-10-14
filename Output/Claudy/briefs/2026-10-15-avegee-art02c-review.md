# ใบงาน 2026-10-15 — AVEGEE ART-02C ตรวจชายฝั่ง/ท่าเรือ/บ้าน (Zone1 2D)

## บริบท
- Codex app ส่งงาน 2D ใหญ่ขึ้น main แล้ว (`81e5ddb`, build `20261014-2d-pages-r1`) และฝาก ART-02C ให้ Claude เป็นงานเสริม
  อ่านก่อน: `docs/claude-handoff-2026-10-14.md`, `docs/claude-update-2026-10-14.md`, `docs/zone1-map-qa-2026-10-14.md`, `docs/ui-work-coordination-2026-10-12.md`
- Codex เคยสังเกตไว้เองว่า **แปลงบ้านฝั่งใต้ที่ y≈1790 ชิดเส้นชายฝั่งในภาพ** กล้องซูมแล้วเห็นชัดว่าบ้านอยู่บนน้ำ — เริ่มตรวจจากจุดนี้
- Codex app ยังเปิดอยู่และมีงานไม่ commit ใน clone ของมันเอง (`Documents/Work PAE/Claude/AVEGEE`) — **ห้ามแตะ clone นั้นเด็ดขาด**

## ขอบเขต
- repo ที่ใช้: `/Users/agapae/agapae-work/AVEGEE` (main ล่าสุด = `81e5ddb`)
- เขียนได้ **เฉพาะ** `output/claude-2d-art/` ใน repo นั้น
- ภาพแผนที่หลัก: `img/map-zone1/mainland-v1.webp` · ผัง/พิกัด: `src/town-layout.js` (อ่านอย่างเดียว)

## ขั้นตอน
### ขั้น A — Toby (จับภาพ + เล่นจริง)
1. เปิด static server ในเครื่อง (`python3 -m http.server` ที่ root repo, port ว่าง) — ไม่ใช้เว็บจริง
2. ใช้ Playwright (python มีแล้ว, chromium-1243) ที่จอ 1280×800 เปิด `output/zone1-2d/index.html` (หน้า preview ไม่แตะเซฟ)
   และ `output/game-review/index.html` ถ้าจำเป็น
3. จับภาพ: ภาพรวมทั้งแผนที่ 1 ภาพ + ซูม 5× ตามจุดเหล่านี้ อย่างน้อย: ท่าเรือ (ทุกท่าที่มี), แปลงบ้านฝั่งใต้ y≈1790,
   บ้านริมแม่น้ำ/ริมลาวา, ปลายสะพานโค้ง, ชายฝั่งที่ตัวละครเดินชิดได้ — บันทึกเป็น `output/claude-2d-art/shots/<ชื่อจุด>-<zoom>.png`
4. ระหว่างเล่น สังเกต: บ้าน/ตกแต่งลอยอยู่บนน้ำ, ฐานบ้านไม่แตะพื้น, ตัวละครเดินบนน้ำหรือชนกำแพงล่องหน, ท่าเรือที่ภาพกับจุดเดินไม่ตรงกัน, ภาพแตก/เบลอเมื่อซูม
5. เขียน `output/claude-2d-art/A-capture-notes.md`: ตารางจุด | พิกัดโลก (x,y) | ไฟล์ภาพ | สิ่งที่เห็น | ร้ายแรง (สูง/กลาง/ต่ำ)
   พร้อมคำสั่ง/สคริปต์ที่ใช้จับภาพ (เก็บสคริปต์ใน `output/claude-2d-art/tools/`)
### ขั้น B — Mind (วิจารณ์ภาพ + เสนอทางเลือก)
1. อ่าน A-capture-notes.md และดูภาพใน shots/
2. เขียน `output/claude-2d-art/REPORT.md`: แต่ละจุด → ปัญหา / ข้อเสนอแก้ (ขยับแปลงบ้าน, แก้ภาพพื้น, เพิ่มชั้นท่าเรือ ฯลฯ) /
   แก้ที่ภาพหรือที่ผัง / prompt สำหรับ imagegen ของ Codex (อังกฤษ, คงธีมไทยแฟนตาซีของ AVEGEE, ขนาดที่ต้องการ)
3. ปิดท้ายด้วยหัวข้อ "รายงานถึง Codex" รูปแบบตาม coordination: ทำอะไร / ไฟล์ที่เพิ่ม / ตรวจอะไร / ปัญหาค้าง

## ข้อห้าม
- ห้ามแก้ `src/`, `index.html`, `tests/`, `img/`, catalog, `Backup/` · ห้าม `git add/commit/push` ใน AVEGEE
- ห้ามแตะ clone `Documents/Work PAE/Claude/AVEGEE` · ห้ามโหลดหรือเขียนเซฟผู้เล่น
- ไม่ทำ ART-02A/B ซ้ำ (ฉากต่อสู้ 3 ภาพ, ดันเจี้ยน 9 จุดเสร็จแล้ว) · ไม่ทำ 3D · ไม่แตะ Break/Boost
- Claude ไม่มี imagegen — ส่งเป็นสเปก/prompt ไม่ต้องพยายามวาดภาพจริง

## เกณฑ์รับงาน
1. มีภาพ shots/ อย่างน้อย 1 ภาพรวม + 6 ภาพซูม ครอบคลุมทุกท่าเรือและแปลง y≈1790
2. A-capture-notes.md มีพิกัดโลกและความร้ายแรงทุกข้อ
3. REPORT.md มีข้อเสนอ + prompt ครบทุกข้อที่ร้ายแรงสูง/กลาง และหัวข้อ "รายงานถึง Codex"
4. `git status` ใน AVEGEE มีเฉพาะ `output/claude-2d-art/` เป็น untracked
