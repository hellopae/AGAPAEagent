# Dale — AVEGEE แก้ข้อเสนอแนะ S2–S6 (build note)

วันที่: 2026-10-09 · ใบงาน: Output/Claudy/briefs/2026-10-09-avegee-s-fixes.md
repo: /Users/agapae/agapae-work/AVEGEE · worktree: /Users/agapae/agapae-work/.toby-worktrees/s-fixes · branch `dale/s-fixes` (ฐาน main 18f1b5b) · ไม่ merge ไม่ push ไม่แตะ main
S1 (cache-bust) ไม่ทำใน branch นี้ตามใบงาน — ทำตอน merge รอบสุดท้าย

| ข้อ | commit | ทำอะไร | ไฟล์ |
|---|---|---|---|
| S2 | 45c3ed4 | ชื่อ Cache Storage = `avegee-images-<CATALOG_VERSION>` (ค่าเดียวกับ ?v= ของ catalog) + ตอนเริ่มเกมลบ cache `avegee-images-*` ที่ชื่อไม่ตรง คง Cache Storage ไว้ (เสี่ยงน้อยสุด) | src/asset-preload.js (`useImageCacheVersion`), src/preload.js (const `CATALOG_VERSION` เก็บ literal เดิมไว้ใน preload.js เพื่อไม่ให้เทสต์ e3/e4/e5 ที่ grep สตริงพัง), tests/asset-preload.test.mjs |
| S3 | dabda99 | "ตบบ่ายมบาทน้อย" → "ตบบ่าของยมบาทน้อย" · ไม่มีข้อความ EN ของคำบรรยาย story (story เป็นไทยล้วนทั้งระบบ) จึงไม่มี EN ให้แก้ | src/story.js, tests/ending-video.test.mjs |
| S4 | c459f51 | ดูตารางขนาดด้านล่าง | img/*, src/story.js, img/preload-catalog.json, img/manifest.json (แก้มือ), tests/30a, e3, ending-video |
| S5 | b8c8b1c | ปุ่ม 'จัดเอกสาร' ใช้ key เดิม `room.sala.action2`; เพิ่ม `room.krajok.adjust/place/needMirror` และ `mg.sala.tip` (TH+EN); sala.js `name`/`tip` เป็น getter เรียก t() | src/ui.js, src/i18n.js, src/minigames/sala.js, tests/s-fixes.test.mjs |
| S6 | 02c636c | renderStoryComic ผูก 'close' กับ `<dialog>` ที่ครอบ root ด้วย (`root.closest('dialog')`) และถอด listener ตอน finish | src/ui.js, tests/s-fixes.test.mjs |

## S4 ขนาดก่อน/หลัง
| ไฟล์ | ก่อน | หลัง |
|---|---|---|
| img/yama-intro-combined-v1.mp4 | 4.3 MB | ลบ (grep ทั้ง repo: อ้างถึงแค่ใน docs/claude-handoff-2026-10-08-beggar-intro.md เป็นข้อความอธิบายที่มา ไม่ใช่โค้ด) |
| img/intro-opening-v2.mp4 | 6.8 MB (6,822,587 B) | 2,325,782 B = 2.3 MB — H.264 CRF 27 slow, faststart, ขนาดเฟรม 1300x708/24fps/19.08 วิ เท่าเดิม ไม่มีเสียง (ต้นฉบับไม่มีเสียง) · SSIM 0.988, PSNR 42.7 dB · ดูเฟรม 14 วิ เทียบแล้วไม่ต่างด้วยตา · ชื่อไฟล์เดิม (ไม่แก้ index.html) · `preload="auto"` คงเดิม |
| img/frontier-west-hypnosis-v1 | 3.25 MB png | 478 KB webp (q85) · ชื่อ .webp ใหม่ ลบ png เดิม |
| img/deva-intro/deva-intro-th-beggar-v2 | 2.84 MB png | 390 KB webp (q85) · ลบ png เดิม |
รวมที่ลด ~15.5 MB ในโฟลเดอร์ทำงาน (ไม่ rewrite ประวัติ git — ไฟล์เก่ายังอยู่ใน history)
อ้างอิงที่แก้: src/story.js (3 จุด), img/preload-catalog.json (2), img/manifest.json (1), เทสต์ 3 ไฟล์ (30a อ่านขนาดภาพจาก header — เพิ่มตัวอ่าน VP8 webp)

## ผลทดสอบ
- `node --test tests/*.test.mjs` = 538/538 ผ่าน, skipped 0 (เดิม 534 + เทสต์ใหม่ 4: asset-preload 1, s-fixes 3)
- `node --check` ทุกไฟล์ใน src/*.js และ src/minigames/*.js ผ่าน
- Chrome จริง (เสิร์ฟ worktree ด้วย http.server ชั่วคราว ปิดแล้ว):
  - splash เล่น intro-opening-v2.mp4 ได้ readyState 4, 1300 px, ไม่ error
  - webp ทั้งสองโหลดได้ (1672x941) comicImageLayout คืน top 0/height 100 เหมือนเดิม
  - โหมด EN: krajok "Adjust angle"/"Place mirror", sala "Sort records", tip มินิเกมเป็นอังกฤษ
  - Cache Storage: ใส่ `avegee-images-OLD` แล้วรีโหลด → ถูกลบ เหลือเฉพาะ `avegee-images-20261008-zone3-hypnosis-ui-mirror-charge`
  - 404 ทั้งหมด = ของเดิมที่มี fallback (hero-yama-side.png, bgm-*.ogg) ไม่มี 404 ใหม่ · ไม่มี pageerror

## ข้อจำกัด / ต้องรู้ตอน merge
- S6 ทดสอบด้วย unit test (fake overlay+dialog) ไม่ได้ลองเล่นศึก west-hypnosis จริงในเบราว์เซอร์
- S5: ข้อความไทยอื่นใน sala.js (doc-rule, status, aria-label, "เลื่อน N ครั้ง") และ src/mirror-charge.js (ของ F3/Codex) ยังเป็นไทยล้วน — นอกขอบเขตใบงานเพื่อลดชน
- S1 ตอน merge: bump `?v=` ของ compact-ui.css (และ CSS/JS อื่นที่แก้) ใน index.html; ควรแตะ `CATALOG_VERSION` ใน src/preload.js ด้วย (ค่านี้ตอนนี้คุม cache รูปด้วย — bump = cache รูปชุดใหม่ ชุดเก่าถูกลบอัตโนมัติ) และ intro-opening-v2.mp4 ใช้ชื่อเดิม ผู้เล่นที่แคชไว้อาจได้ตัว 6.8MB จนแคชหมดอายุ (ใช้งานได้ปกติ)
- จุดที่อาจชนกับ F2/F3: src/ui.js (2 hunk เล็ก: บรรทัด ~3980-3992 และ renderStoryComic), src/i18n.js (เพิ่ม key ต่อท้าย room.sala.hint2/room.krajok.hint ทั้ง TH/EN), src/preload.js (บรรทัด catalog URL — F3 อาจแก้ตัว ?v= เหมือนกัน), tests/30a, e3, ending-video
- Rollback: ยังไม่ merge — ลบ branch ได้ `git worktree remove ../.toby-worktrees/s-fixes && git branch -D dale/s-fixes`; หลัง merge ใช้ `git revert <hash>` ต่อข้อ
