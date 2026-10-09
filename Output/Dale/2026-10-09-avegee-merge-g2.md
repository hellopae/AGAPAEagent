# Dale — AVEGEE merge G2 (intro-panel 01–05 v2 + cover-v4)

**ผล: PASS** · AVEGEE main commit `9c82f83` (ฐาน `f7c56ff`) · push แล้ว (ไม่ force)
Live: https://hellopae.github.io/AVEGEE/

## เปลี่ยนอะไร
- เพิ่ม `img/cover-v4.webp`, `img/intro-panel-0[1-5]-v2.webp`, `tests/g2-intro-art.test.mjs`
- ใส่เฉพาะส่วนต่างของ G2 ด้วย `git apply --3way` บนไฟล์ล่าสุดของ main (ไม่ก๊อปทับทั้งไฟล์): `src/ui.js`, `src/preload.js`, `index.html`, `img/manifest.json`, `img/preload-catalog.json`
- cache-bust ต่อท้าย: `CATALOG_VERSION` ...`-g2-intro-cover-v2` · `index.html` `preload.js?v=...book-art-g2` · `ui.js?v=...-g1-g3b-g2` (prefix f2 ยังอยู่)
- วิดีโอปกเก่า (`home-animated.mp4`) ถูกถอด src + `hidden` ตามที่ Codex ทำ (เพื่อไม่ให้บังภาพ cover-v4)
- ไม่เอา `output/Codex/g2/` เข้า main · ไม่รัน make-manifest.py · ไม่แตะ worktree อื่น

## ผลเทสต์
- `node --check src/*.js` ผ่านทุกไฟล์
- `node --test tests/*.test.mjs` → 608 pass / 0 fail

## ตรวจ Chrome (headless, CDP) ทั้ง local และ Pages จริง
- หน้าปก: `#cover-art` = `img/cover-v4.webp` (เห็นภาพปกใหม่), video `hidden`
- intro เลื่อนครบ 5 แผ่น โหลด `intro-panel-0N-v2.webp` ได้ครบ (naturalWidth > 0) ทั้งจอ 1280x720 และมือถือ 390x844
- 404 ที่เห็นมีแต่ของเดิม ไม่เกี่ยวกับ G2: `img/hero-yama-side.png` (ไฟล์ optional), `favicon.ico`, และ audio `.ogg` probe (local) — ไม่มี 404 ใหม่จากภาพ G2
- Pages build `built` ที่ `9c82f83`; curl ภาพใหม่ 200 (cover-v4 405,978 B ตรงไฟล์ต้นทาง)

## Rollback
`git revert 9c82f83` บน AVEGEE main แล้ว push (ภาพเดิม v1/v3 ยังอยู่ใน repo และเป็น fallback)

## ค้าง
- worktree `/Users/agapae/agapae-work/.codex-worktrees/20261009T163044Z-828fda98` ยังไม่ลบ ตามใบงาน (Claudy ขออนุญาตคุณเป้ทีเดียว)
