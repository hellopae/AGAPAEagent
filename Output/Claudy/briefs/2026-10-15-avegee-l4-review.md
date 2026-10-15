# ใบงาน L4-review: Dale เก็บงาน + merge Codex L4a (ดาบอสิปัตตะ) และ L4b (ไอคอนชุด) — ทั้งสอง run ชน rate limit กลางทาง

## บริบท
- **ทำหลัง K1e-review** (`2026-10-15-avegee-k1e-review.md`) ในรอบเดียวกัน เรียง K1e → L4a → L4b
- ใบงานต้นทาง: `2026-10-15-avegee-l4a-asipatta-swords.md`, `2026-10-15-avegee-l4b-outfit-icons.md`
- **L4a** run `Output/Codex/runs/20261015T071555Z-c5568393/` worktree `/Users/agapae/agapae-work/.codex-worktrees/20261015T071555Z-c5568393` ฐาน `99ec562` — status `rate_limited` ไม่มี report.md
  - วาดดาบ 4 โซนแล้ว (`img/asipatta-l4a/*`) + ภาพตรวจ `docs/reviews/asipatta-l4a/four-zones-l4a.jpg` (Claudy ดู th แล้ว: ดาบเหมือนพื้นหลังจริง ผ่านด้านภาพ)
  - เสียบเข้าห้องครบหรือยัง **ไม่รู้** — ตรวจ diff เอง · ต้องหาด้วยว่ารอบ J2 ทำไมไม่ติด (ใส่ในรายงาน)
- **L4b** run `Output/Codex/runs/20261015T071610Z-1d8d35b8/` worktree `/Users/agapae/agapae-work/.codex-worktrees/20261015T071610Z-1d8d35b8` — `rate_limited`
  - ไอคอน 3 ชุด `img/item-outfit-{asia,west,cyberhell}-l4b.png` + manifest/catalog/index แก้แล้ว · contact sheet `output/l4b/contact-sheet-l4b.jpg` (Claudy ดูแล้ว ผ่านด้านภาพ)
  - โค้ดร้านแสดงไอคอนใหม่แทน emoji หรือยัง **ไม่รู้** — ตรวจ/ทำให้ครบ (ร้านพ่อค้า + ที่อื่นที่แสดงชุด)
- Codex กลับมา 18:21 — **ไม่รอ** Dale ทำส่วนที่ขาดเอง (งานโค้ด ไม่ใช่วาด)

## ขั้นตอน (ต่อ run)
1. ดู diff · ทำส่วนที่ขาดให้ครบตามเกณฑ์ใบงานต้นทาง · แปลงภาพ PNG ใหญ่เป็น webp ถ้าเหมาะ (ดูขนาดไฟล์)
2. **ลบหลักฐานออกจากเกม**: `output/l4b/`, `docs/reviews/asipatta-l4a/`, `art-src/asipatta-l4a/references/` (เก็บ prompts/provenance ไว้ได้ถ้าเล็ก) และไฟล์แปลกปลอมใน `output/` ที่ไม่ได้มาจากงานนี้
3. Playwright: ห้องป่าดาบ 4 โซน + ร้านพ่อค้าโซน 2/3/4 (ไอคอนขึ้น) · ไม่มี 404/console error
4. commit → rebase main ล่าสุด → `node --test tests/*.test.mjs` ผ่าน → push → Pages built · ล้าง worktree/branch codex
- cache-bust ชนกันระหว่าง K1e/L4a/L4b — รวมเป็น suffix เดียวต่อไฟล์ที่ตรงกันทุกที่ (index, game-review, import ใน ui.js, เทสต์ regex)

## ข้อห้าม
ห้ามแตะไฟล์ animation ยม · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ภาพหลักฐาน /tmp

## เกณฑ์รับงาน
PASS ต่องาน + SHA + Pages + ภาพ (path /tmp) — หรือ FIX LIST · รายงาน `Output/Dale/2026-10-15-avegee-l4-review.md`
