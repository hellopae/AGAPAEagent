# ใบงาน K2-review: Dale ตรวจ + ตรวจด้วยตา + merge งาน Codex K2 (เมนูต่อสู้/สอบสวน)

## บริบท
- ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-15-avegee-k2-battle-trial-ui.md` (อ่านเกณฑ์รับงานก่อน)
- ผล Codex: run `Output/Codex/runs/20261015T032143Z-53c7d49d/` (report.md, diff.patch, diff-stat.txt)
  worktree `/Users/agapae/agapae-work/.codex-worktrees/20261015T032143Z-53c7d49d` branch `codex/20261015T032143Z-53c7d49d` ฐาน `b5614fa`
- Codex อ้าง: เทสต์ 921/921 ผ่าน, เทสต์ใหม่ `tests/k2-menu.test.mjs` แต่ **ยังไม่ได้ตรวจด้วยตา** (browser ถูกบล็อก) และยังไม่ได้ reproduce ปุ่มกดไม่ติดจริง
- คู่ขนาน: Toby ทำ K3 (ความเร็ว) ใน `../.toby-worktrees/k3` branch `toby/k3-perf` อาจแตะ `src/ui.js` — ไม่ต้องรอ ใครเข้า main ก่อนก็ได้ อีกคน rebase

## ขั้นตอน
1. รีวิว diff ตามเกณฑ์รับงานใบต้นทาง (skew ข้อความตรง, ขั้นบันได, flyout แถบเตี้ยมีภาพ, profile ใหญ่ขึ้น, ทีมชิดขึ้น, พฤติกรรมเดิมไม่เสีย)
2. **ตรวจด้วยตา**: Playwright Chromium (python, chromium-1243) static server ในเครื่อง เปิด `output/game-review/index.html` ของ worktree ที่ 1678×937 DPR 2
   ถ่าย: ต่อสู้ (เมนู + flyout พลัง) และสอบสวน (เมนู + flyout ที่ไหน) วางเทียบกับ
   `Output/Claudy/briefs/assets/2026-10-15-avegee-k/k2-ref-battle-Battle9.jpg` และ `k2-ref-interrogation-Comment8.jpg`
3. **ทดสอบกดจริง**: คลิกทุกปุ่มเมนูและ flyout ด้วย `page.mouse` (ไม่ใช่ `element.click()`) อย่างละ 10 ครั้ง ทั้งคลิกเร็วติดกันและคลิกระหว่าง animation — นับกี่ครั้งไม่ติด
   รวมถึงขั้น "เลือกพลัง → คลิกศัตรู = ใช้ทันทีครั้งเดียว"
4. ข้อเล็ก (ระยะ/ขนาด/สี/คลิกหลุดที่หาเจอ) แก้เองใน worktree ได้ · ข้อใหญ่เขียน FIX LIST ให้ Claudy
5. ผ่าน → commit ใน worktree → merge เข้า main ของ `/Users/agapae/agapae-work/AVEGEE` → `node --test tests/*.test.mjs` ผ่านหมด → push main → ตรวจว่า GitHub Pages build commit นั้นแล้ว
   ลบ `output/k2-shots/` (ถ้ามี) และ `docs/k2-implementation-2026-10-15.md` เก็บไว้ได้ · ล้าง worktree/branch codex หลัง merge

## ข้อห้าม
- ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` (clone ของ Codex app) และ worktree ของ K1/K3
- ภาพหลักฐานเก็บที่ `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/k2-review/` ไม่ใส่ใน repo เกม

## เกณฑ์รับงาน
1. ภาพเทียบ 2 คู่ (ต่อสู้/สอบสวน) + ผลนับคลิก
2. PASS พร้อม commit SHA บน main + Pages build ตรง SHA — หรือ FIX LIST เรียงเลข
3. รายงาน `Output/Dale/2026-10-15-avegee-k2-review.md`
