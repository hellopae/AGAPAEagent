# ใบงาน K5-review: Dale รีวิว + merge งาน Toby K5 (กล่องคำแนะนำ/flyout ไม่บังศัตรู)

## บริบท
- ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-15-avegee-k5-battle-overlap.md` · รายงาน: `Output/Toby/2026-10-15-avegee-k5-battle-overlap.md`
- branch `toby/k5-battle` commit `83cf1a2` worktree `/Users/agapae/agapae-work/.toby-worktrees/k5` ฐาน `0f771f2`
- Toby อ้าง: เทสต์ 939/939, คลิกศัตรู 40/40, ไม่ทับใน 12 สถานะ · ภาพ `/tmp/k5/final/k5-*-sheet.jpg` (Claudy ดู 3 ศัตรูแล้ว ผ่าน)
- ข้อสังเกต Toby: ช่วง ~2 วินาทีแรกของฉากต่อสู้ ปุ่มเมนูกดไม่ติด (`elementFromPoint` ได้ HTML) — **สืบสาเหตุด้วย** ถ้าเป็นชั้น overlay/intro ที่ค้าง pointer-events ให้แก้ถ้าเล็ก ถ้าใหญ่เขียน FIX LIST
- Codex app อาจ push animation ยมระหว่างนี้ — ถ้า main เลื่อน rebase แก้ชนเฉพาะ cache-bust อย่าทับงานเขา

## ขั้นตอน
1. รีวิว diff (`src/battle-menu-layout.js` ใหม่, `placeMenu` ใน ui.js) — ไม่มีโค้ดตาย, สไตล์ K2 คงเดิม
2. rebase main ล่าสุด → `node --test tests/*.test.mjs` ผ่านหมด
3. Playwright 1678×937 DPR2: ต่อสู้ 1 และ 3 ศัตรู เปิดพลัง/ไอเท็ม/เลือกพลัง ไม่ทับศัตรู · คลิกศัตรู 10/10 · ทดสอบข้อ 2 วินาทีแรก
4. merge → push → Pages built ตรง SHA · ล้าง worktree/branch

## ข้อห้าม
ห้ามแตะไฟล์ animation ยมและ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ภาพหลักฐาน /tmp เท่านั้น

## เกณฑ์รับงาน
PASS + SHA + Pages + ผลคลิก + ผลข้อ 2 วินาทีแรก — หรือ FIX LIST · รายงาน `Output/Dale/2026-10-15-avegee-k5-review.md`
