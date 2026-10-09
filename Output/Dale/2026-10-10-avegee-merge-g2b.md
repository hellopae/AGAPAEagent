# Dale — AVEGEE merge G2b (cover-v5, ยมบาทหันหน้า)

**ผล: PASS** · AVEGEE main commit `9eb6f29` (ฐาน `6eb32e5`) · push แล้ว ff (ไม่ force)
Live: https://hellopae.github.io/AVEGEE/ · Pages build `built` ที่ `9eb6f29`

## เปลี่ยนอะไร
- เพิ่ม `img/cover-v5.webp` (1376x768, 387,738 B — ตรงกับไฟล์ต้นทาง/Pages)
- `src/ui.js`: probe หน้าปกเรียง v5 → v4 → v3 → cover.webp → cover.png
- `index.html`: ลิงก์ CSS comment + `poster` ของ video เป็น v5; cache-bust ต่อท้าย `-g2b-cover-v5` (prefix `f2` ยังอยู่)
- `src/preload.js` `CATALOG_VERSION` + `src/art.js` manifest fetch ต่อท้าย `-g2b-cover-v5`
- `img/manifest.json` / `img/preload-catalog.json`: เพิ่ม `cover-v5.webp` ในกลุ่ม shared ถัดจาก cover-v4
- `tests/g2-intro-art.test.mjs`: คาด v5
- **ไม่เอาเข้า**: `scripts/prep-art.py` (hack เฉพาะ run นี้: ถ้า name=='cover-v5' resize ตรงๆ) · `output/Codex/g2b/` · ไม่รัน make-manifest.py · ไม่ลบ worktree
- ทำใน worktree ใหม่ `/Users/agapae/agapae-work/.dale-worktrees/g2b` (branch `dale/g2b`) เพราะ checkout `/Users/agapae/agapae-work/AVEGEE` มี Dale อีกคนอยู่กลางงาน merge (conflict `UU` ที่ manifest.json, preload-catalog.json, index.html + ไฟล์ staged G5/krata) — ไม่แตะ

## สิ่งที่ Claudy/Dale อีกคนต้องรู้ (สำคัญ)
- `6eb32e5` (Merge G3c-A) ยังไม่เคย push — การ push ของผมเป็น fast-forward จาก `9c82f83` จึง**พา G3c-A ขึ้น origin ไปด้วย** (เทสต์ 608 ผ่านบนฐานนี้)
- local `main` ของ `/Users/agapae/agapae-work/AVEGEE` ตอนนี้ตามหลัง origin 1 commit (`9eb6f29`) → Dale ที่ merge G5 อยู่ต้อง `git fetch` แล้วรวม `9eb6f29` ก่อน push (คาดว่าชนที่บรรทัด cache-bust ใน `index.html` / `preload.js` / `art.js` และ manifest/catalog — ให้เก็บทั้งสอง suffix: `-g3ca` และ `-g2b-cover-v5` และเก็บ `cover-v5.webp` ใน catalog กลุ่ม shared)
- ผมรอ 7 นาทีให้เขา push ก่อน ไม่ขยับ จึงตัดสินใจ push เอง

## ผลเทสต์
- `node --check src/*.js` ผ่านทุกไฟล์
- `node --test tests/*.test.mjs` → 608 pass / 0 fail

## ตรวจ Chrome (headless CDP)
- Local และ Pages จริง: `#cover-art` backgroundImage = `img/cover-v5.webp` (class `art has`), `#cover-vfx` ยัง `hidden` + poster v5
- ดูภาพจริง 1376x768: ยมนั่งบัลลังก์ + ยมน้อยตรงกลางหันหน้าตรง ปุ่ม/โลโก้ไม่ถูกบัง; มือถือ 390x844: ครอปกลางไปที่ยักษ์ (เหมือนพฤติกรรม cover เดิม) UI อ่านได้
- 404 ที่เห็นเป็นของเดิม ไม่เกี่ยวกับ G2b: `img/hero-yama-side.png`, `favicon.ico`, `audio/bgm-*.ogg` (จาก Pages ตอนเรียก cover-v5 เองไม่มี 404 ใหม่)
- หมายเหตุ: ถ้าเห็นปกเก่าบนเครื่องผู้ใช้ ให้ hard reload (Pages cache) — HTML ใช้ query `?v=` ใหม่แล้ว

## Rollback
`git revert 9eb6f29` บน AVEGEE main แล้ว push (cover-v4 ยังอยู่ใน repo เป็น fallback) — การ revert ไม่กระทบ G3c-A
