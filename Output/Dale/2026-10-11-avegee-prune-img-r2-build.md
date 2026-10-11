# AVEGEE prune img รอบ 2 — build note (Dale, 11 ต.ค. 2569)

- Merge: `abe3863` (Codex run 20261011T091552Z-42cb60c8) · live: https://hellopae.github.io/AVEGEE/
- สิ่งที่เปลี่ยน: ลบ 59 ไฟล์ภาพ/วิดีโอที่ resolver ไม่เลือกแล้ว (25.8 MB) · ย้ายต้นฉบับ 25 ไฟล์ไป `art-src/` (SHA เท่าเดิม) · ตัด entry ใน manifest/preload-catalog · runtime 582.20 → 524.93 MB (ยังเกิน 500 MB อยู่ ~25 MB)
- ตรวจ runtime จริง (Playwright/Chromium, localhost): Home/splash/ปก/บทนำ → เกมใหม่ → 4 โซน × 4 ชุดฮีโร่ → ห้องทุกสถานี (10) → ฉากต่อสู้ (mob/ชายแดน/บอส/ชายแดนบุก/คุก/เดวา/ท้าชิง) → ซีนเรื่อง 19 คีย์ → event alert 17 → bag ไอเทมทั้ง 16: 774 URL ไม่ซ้ำ, **ไฟล์ที่ลบ 0 รายการถูกขอ**, 404 ชุดเดียวกับ ec07870 (`audio/bgm-*` `hero-yama-side.png` `mob-*-profile.png` `item-heart.png` `intro-zone1.png` — มีอยู่ก่อนแล้ว)
- เทียบ ec07870: ไฟล์ที่ ec07870 ขอ 50 รายการเป็นไฟล์ที่ลบ (ขอผ่าน preload catalog เท่านั้น) · `art-src/` ไม่ถูกขอเลย
- Verify: เปิด URL live → เล่นเกมใหม่ → เข้าห้องสถานีสักห้อง ไม่มี 404 ใหม่ใน DevTools Network
- Rollback: `git revert -m 1 abe3863` (ไฟล์ที่ลบกู้ได้จาก ec07870)
- หลักฐาน/ตาราง: `Output/Codex/2026-10-11-prune-round2/`
