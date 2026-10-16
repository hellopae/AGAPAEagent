# ใบงาน M-merge: Dale รีวิว + merge กล้อง (M1) + เอฟเฟกต์ (M2) + ภาพเอฟเฟกต์ (M3) · AVEGEE

## บริบท
- คิว: `Output/Claudy/briefs/2026-10-16-avegee-m-queue.md` · คำสั่ง: `Output/Kittanate-source/2026-10-16-avegee-m-requests.md`
- **M1** `toby/m1-camera` HEAD `1c10cfc` (worktree `.toby-worktrees/m1`, ฐาน `19d1afe`) — รายงาน `Output/Toby/2026-10-16-avegee-m1-camera.md` · API `docs/battle-camera-api.md` · ภาพ/วิดีโอ `/tmp/m1/final/`
- **M2** `toby/m2-fx` HEAD `75c2771` (worktree `.toby-worktrees/m2`, ฐาน `19d1afe`) — รายงาน `Output/Toby/2026-10-16-avegee-m2-fx.md` · `docs/m2-battle-fx.md` · ภาพ `/tmp/m2/final/`
  - branch ตัวอย่างวิธีแก้ชน M1+M2: `toby/m1-m2-integration` (ทำบนฐานเก่า — ใช้ดูวิธี ไม่ใช่ merge ตรง: ui.js 6 จุด + cache token + regex เทสต์)
- **M3** ภาพ texture (Codex) — สำรองไว้ `/Users/agapae/agapae-work/backup/avegee-m3-fx/{A,B}/fx/*.webp` (A 33 + B 23) + `B/icon-defend-shield.png`
  - **ยกเว้น `fx-hypno-circle.webp`** (มีดาวหกแฉก — Codex กำลังวาดใหม่ M3c) → ไม่ต้องใส่ ใช้ตัวแทนโค้ดของ M2 ไปก่อน
  - worktree codex เดิม: A `/private/tmp/avegee-part-a-m3` (branch `codex/avegee-part-a-m3`), B `/Users/agapae/agapae-work/.codex-worktrees/20261016T070325Z-154c9763` — **ใช้ไฟล์จาก backup** ไม่ต้อง merge branch codex (มี `output/m3/` หลักฐานปน) แล้วลบ worktree/branch ทั้งสอง
- คู่ขนาน: Toby N1 (ท่าเรือ/ห้องกระจก), N2 (sprite ต่อสู้รั่ว + ยมสอบสวน — แตะฉากต่อสู้/สอบสวน), N4 (น้ำ/ลาวาไหล) — merge ใบนี้ก่อน N ทั้งหมด

## ขั้นตอน
1. รีวิว M1 → merge (rebase บน main ล่าสุด)
2. รีวิว M2 → merge บน M1 (ใช้ adapter `setBattleCamera`/`camera.layer('fx')` ตามที่ M2 ทำ) → ยืนยันในศึกจริงว่ากล้อง+เอฟเฟกต์ทำงานร่วม (impact ตรง)
3. คัดลอก M3 texture ลง `img/fx/` + `img/ui/icon-defend-shield.png` → ตรวจในเกมว่าเอนจินโหลดไฟล์จริงแทนตัวแทน (โล่ใช้ PNG — `html.defend-shield-art`) · เพิ่ม preload ถ้าเหมาะ (ขนาดรวม ~0.86 MB)
4. Playwright 1678×937: โจมตี/คริ/ลูกไฟใหญ่/น้ำแข็ง/ลม/สะกดจิต/หอก/กระบอง/เติมเลือด/ป้องกัน (โล่ PNG) + สอบสวน — ภาพ/วิดีโอ /tmp · fps · คลิกศัตรู 10/10
5. `node --test tests/*.test.mjs` 0 แดง → push main → Pages built · ล้าง worktree/branch m1, m2, m1-m2-integration, codex A/B
- push ถูกปฏิเสธ: อย่าอ้อม รายงาน SHA + คำสั่ง

## ข้อห้าม
ห้ามแก้ `combat-sprites.js`/manifest ของ Codex · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · หลักฐาน /tmp

## เกณฑ์รับงาน
PASS/FIX LIST ต่องาน + SHA + Pages + วิดีโอ + fps + เทสต์ · รายงาน `Output/Dale/2026-10-16-avegee-m-merge.md`
