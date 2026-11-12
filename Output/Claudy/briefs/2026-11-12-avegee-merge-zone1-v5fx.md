# ใบงาน Dale — รีวิวรวม + merge `claude/2026-11-05-zone1-v5-fx` → main · 12 พ.ย. 2569

## บริบท
- คุณเป้อนุญาต: "push ขึ้น main เมื่อพื้นโซน 1 เสร็จ" (memory avegee-merge-after-zone1) — ไม่ต้องถามซ้ำ · พื้นโซน 1 เสร็จแล้ว (v7r, commit 3a33380c) · คุณเป้รับว่าต้นไม้แดงหาย เน้นความชัด
- branch ห่าง main 48 commit · 678 ไฟล์ +25.7k/−0.8k · merge-tree ไม่ชน · main = 812152d2
- งานใน branch (รายงานแต่ละชิ้นอยู่ใน Output/Toby, Output/Dale, Output/Rae วันที่ 2026-11-05…12): Z1-FX/SCENE-FX, perf-1110, FB-UI, graphics setting, worker scale, quest dialogue (Rae), battle FX, quest rewards/fights, part A, food system (Codex 9f80b850 + Dale), quest hand-off, canteen hire, fluid shader ทั้งแผนที่, v7 → v7r ground
- จุดที่ Toby ขอให้ตรวจด้วยตา: `docs/art-reviews/2026-11-12-z1-v7r-assemble/compare/` + `game-zoom/` (รอยต่อ 7 จุด) · `Output/Toby/fluid-full-1112/evidence/view*.jpg` (ของเหลวล้น) · เทสต์ foam ที่ผ่อนจาก ≤3% เป็น ≤8% (งาน v7 ground)

## ที่ทำงาน
worktree `~/agapae-work/.toby-worktrees/z1-v5` (เซิร์ฟเวอร์ 8942 เสิร์ฟจากที่นี่ — ห้าม kill) · merge ทำใน clone `~/agapae-work/AVEGEE` (main) หรือ worktree ใหม่ ห้ามใช้ `Documents/Work PAE/Claude/AVEGEE`

## ขั้นตอน
1. รีวิว diff `origin/main...claude/2026-11-05-zone1-v5-fx` เน้นความเสี่ยง: เซฟเก่าโหลดได้ (save migration ทุกงาน), WebGL fallback, ไม่มี debug flag ค้างเป็นค่าเริ่มต้น, cache-bust `?v=` ครบใน index.html, ไฟล์ภาพที่ไม่ใช้แล้ว (v7, เฟรมของเหลวเก่า, v5-fx ที่ถอดจาก loader) — ลบได้ถ้าไม่มีโค้ด/เทสต์อ้าง (ลด repo/ดาวน์โหลด) · ขนาด repo ที่ deploy GitHub Pages ไม่เกินลิมิต
2. ดูภาพหลักฐานด้านบน · เปิดเกมจริง 390×844 และ 1792×958: หน้าแรก → เมืองโซน 1 → สู้ชายแดน 1 ครั้ง → โรงอาหาร → ภารกิจ 1 ฉากสู้ · console error 0
3. `node --test tests/*.test.mjs` ผ่านหมดบน merge result
4. PASS → merge (no-ff, ข้อความสรุปงานทั้งก้อน) → push main → ตรวจ GitHub Pages deploy (skill deploy-pages) เปิด https://hellopae.github.io/AVEGEE/ ได้ เล่นได้ · FIX LIST ข้อเล็กแก้เองก่อน merge · ข้อใหญ่หยุด รายงาน
## ข้อห้าม
ห้ามแตะ `Documents/Work PAE/Claude/AVEGEE`, LaunchAgent `com.agapae.avegee-*`, `.codex-worktrees` · ห้าม force-push
## ส่งงาน
`Output/Dale/2026-11-12-avegee-merge-zone1-v5fx.md` (ไทย): PASS/FIX LIST, สิ่งที่แก้/ลบ, merge commit, ผลเทสต์, ผล deploy, ขนาด repo/ดาวน์โหลดก่อนหลัง, เรื่องที่ต้องให้คุณเป้ตัดสิน
## เกณฑ์รับงาน
1. main มีงานครบ · เทสต์ผ่าน · deploy เล่นได้ 2. เซฟเก่าไม่พัง 3. ไม่มีไฟล์ใหญ่ที่ไม่ใช้ค้าง
