# Dale — AVEGEE รวม S + F1 + F2 เข้า main + S1 cache-bust (build note)

วันที่: 2026-10-09 · ใบงาน: Output/Claudy/briefs/2026-10-09-avegee-merge-f1-f2-s.md
repo: /Users/agapae/agapae-work/AVEGEE · main: 18f1b5b → **623ac69** (push แล้ว ไม่ force)
Live: https://hellopae.github.io/AVEGEE/ (Pages build `built` ที่ 623ac69)

## ผลรีวิวแต่ละ branch
| branch | ผล | หมายเหตุ |
|---|---|---|
| `dale/s-fixes` (02c636c) | PASS | งานของ Dale เอง (S2-S6) ตรวจ diff ซ้ำก่อน merge ไม่พบปัญหา · merge ไม่ conflict |
| `toby/f1` (a7e5d53) | PASS | `walk-motion.js` ความเร็วนับเป็น "ความสูงตัว/วินาที" หั่น dt เป็นก้อน 20ms (เพดาน 250ms) · ส่วนที่ใช้ dt เต็มของห้อง (นั่ง/นอน/regen MP) ไม่ถูกแตะ · frontier cache ฉากย่อ 1 ครั้งต่อขนาดจอ · เทสต์ f1-walk ครอบคลุมเฟรมเรต 60/12/4 fps · ไม่มีตัวเลขสมดุลเกมเปลี่ยน · merge ไม่ conflict |
| `toby/f2` (f3ad7db) | PASS | ทั้ง 8 ข้อ · เซฟเก่าไม่มี `sfxOn/bgmOn` = เปิด (ปลอดภัย) · `sfx.js` ปิดเสียงเช็กถูกทุกทาง (tone/noise/sfx/voice/bgm volume) · แก้ `tests/30d.test.mjs` ข้อ 3 ตรงเจตนา (ปุ่มลดลงมาบนหลังคา anchor 'roof') · conflict เดียวที่ `src/preload.js` |
FIX LIST: ไม่มี ทั้ง 3 branch รวมครบ

ข้อสังเกตเล็ก (ไม่แก้ ไม่กระทบ): ปุ่มปิดเพลงตั้ง volume = 0 แต่ track ยัง play อยู่เบื้องหลัง (ไม่มีเสียง) · `VOICE_LINES` ว่างโดยตั้งใจ

## Conflict ที่แก้
- ใบงานคาดว่าจะชนหลายจุด (ui.js, i18n.js, room.js, index.html, tests) แต่ git auto-merge ผ่านหมด **ชนจริงจุดเดียว: `src/preload.js` บรรทัด catalog URL** — เก็บแบบ S2 (`?v=${CATALOG_VERSION}`) แล้วย้ายค่าเวอร์ชันไปแก้ที่ const ตัวเดียว
- ไฟล์หลักฐาน F1 ที่ถูก `git add -f` (`output/Toby/2026-10-09-avegee-f1.md`, `output/Toby/f1-evidence/**`) — ตัดออกจาก merge commit ด้วย `git rm --cached` + amend ก่อน push (ยังไม่เคย push จึงไม่ใช่การ rewrite history ที่เผยแพร่แล้ว) ไม่มีไฟล์ output/Toby ของ F1 บน origin · ไฟล์ยังอยู่ในดิสก์ (gitignore) และรายงานอยู่ที่ AGAPAE Agent/Output/Toby/

## เวอร์ชันที่ bump (S1 รอบเดียว, token `20261009-f2-merge`)
- `index.html`: `flow29c.css?v=`, `compact-ui.css?v=`, `src/ui.js?v=` → `20261009-f2-merge` (index.html ไม่มี ?v= ตัวอื่น)
- `src/art.js`: `img/manifest.json?v=` → `20261009-f2-merge`
- `src/preload.js`: `CATALOG_VERSION` → `20261008-zone3-hypnosis-ui-mirror-charge-20261009-f2-merge` (คุม `preload-catalog.json?v=` และชื่อ Cache Storage `avegee-images-<ver>` ของ S2 — ชุดเก่าถูกลบอัตโนมัติ)
- ใช้วิธีต่อท้ายเพื่อให้เทสต์ e3/e4/e5 (grep prefix `20261008-zone3-hypnosis-ui`) และ f2-ui (regex `20261009-f2`) ผ่านโดยไม่แก้เทสต์
- หมายเหตุ: โมดูล JS อื่น (room.js, frontier.js, sfx.js ฯลฯ) import ไม่มี ?v= ตามแบบเดิมของโปรเจกต์ ตัวที่ bust ได้คือ ui.js/CSS/manifest/catalog · `intro-opening-v2.mp4` ชื่อเดิม ผู้เล่นที่แคชไว้อาจได้ตัว 6.8MB ไปก่อน (ใช้ได้ปกติ)

## ผลเทสต์
- `node --test tests/*.test.mjs` = **559/559 ผ่าน** skipped 0 (538 + f1-walk + f2-ui)
- `node --check` src/*.js + src/minigames/*.js ผ่าน · `git diff --check` สะอาด
- Smoke Chrome จริง 1280x800 (เสิร์ฟ main ที่ merge แล้วทางเครื่อง, Playwright + channel chrome): 
  - ห้อง sala โซน th และ asia: เปิดได้ เดินได้ (x 0.50→0.597 ใน 1.5 วิ ทั้งสองโซน) ไม่มีปุ่ม `#st-training`
  - ชายแดน (โซน th) เดินด้วย W ได้ แล้วชนศัตรูเข้าศึก → ฟันดาบ 1 ครั้ง แอนิเมชันฟันเล่น ยมบาทหันขวาหลังฟัน
  - Setting: สลับปุ่มปิดเพลง/เอฟเฟกต์ แยกกัน ไอคอนเปลี่ยนเป็น *-close, `avegee.audio` เก็บ `sfxOn/bgmOn` ถูก, สลับกลับได้
  - หน้าคู่มือ: การ์ดนาฬิกา + พอร์ตเทรตลูกน้องโหลด
  - กระทะทองแดง: วิญญาณ 3 ดวงยืนในกระทะ มีไฟ ไม่มีปุ่มฝึก
  - ไม่มี pageerror · 404 ที่เห็น = ของเดิม (hero-yama-side.png, bgm-*.ogg, mob-pret2-profile.png ที่มี fallback ไม่เกี่ยวกับ 3 branch)
- ข้อจำกัดของ smoke: ไม่ได้เล่นโซน 2 ในศึกฟันดาบเต็ม (ทดสอบห้อง asia แล้ว แต่ศึกที่ฟันทดสอบอยู่ชายแดนโซน th) · ไม่ได้ฟังเสียงท่าไม้ตาย F2-6 ด้วยหู (headless)

## Live verification (https://hellopae.github.io/AVEGEE/)
- index.html ใหม่มี `?v=20261009-f2-merge` 3 จุด · preload.js ใหม่ขึ้น · `yama-intro-combined-v1.mp4` = 404 (ลบแล้วตามต้องการ) · webp ใหม่ = 200
- เปิดจริง desktop 1280x800 และมือถือ 390x844: โหลดจนถึงหน้าชื่อได้ ไม่มี pageerror, Cache Storage = `avegee-images-20261008-zone3-hypnosis-ui-mirror-charge-20261009-f2-merge` เพียงตัวเดียว

## Commit บน main
- 623ac69 Merge toby/f2 + S1 cache-bust · 461e6bb Merge toby/f1 · d4ab185 Merge dale/s-fixes · (ฐานเดิม 18f1b5b)
- ย้อนกลับ: `git revert -m 1 <merge hash>` ต่อ branch (623ac69 / 461e6bb / d4ab185 ย้อนจากบนลงล่าง) — ห้าม force push

## Cleanup
- ลบ worktree `.toby-worktrees/{f1,f2,s-fixes}` และ branch `toby/f1`, `toby/f2`, `dale/s-fixes` (merged) แล้ว · ไม่แตะ `codex/*` (worktree .codex-worktrees ยังอยู่) · `git status` main สะอาด ตรง origin
- ไม่ได้แตะ `img/raw/`, `Exam/`, ไม่รัน make-manifest.py

## QA steps (Chris/คุณเป้)
1. เปิด https://hellopae.github.io/AVEGEE/ (Hard reload ครั้งแรก) เล่นใหม่ → เข้าห้องโซน 1 และโซน 2 เดินด้วย WASD/คลิก ต้องไม่กระตุก ไม่มีปุ่ม "ฝึกตัวละคร"
2. ชายแดนเดิน → ฟันดาบ ยมบาทหันหาศัตรูหลังฟันทุกชุดเสื้อ (โซน 2-4 ใช้เฟรม workaround ตาม F2-2)
3. Setting: กดไอคอนเพลง/เอฟเฟกต์แยกกัน · กระทะทองแดงทุกโซน · ท่าไม้ตายมีเสียงชาร์จ ~1.3 วิ

## งานค้างต่อ (ไม่ใช่งานของใบนี้)
- ภาพท่าเตรียม/ท่าคืนตัวของฟันดาบ 3 ชุดยังวาดหันซ้าย (F2 ใช้เฟรม workaround) — ตามข้อเสนอใน Output/Toby/2026-10-09-avegee-f2.md
- S5: ข้อความไทยที่เหลือใน sala.js / mirror-charge.js ยังไม่แปลเป็น EN
