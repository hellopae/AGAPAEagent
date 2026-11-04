# ART-MOB-WALK โซน1 — รอตรวจรับ

Branch `codex/2026-11-01-art-mob-walk-th`; base mainในเครื่อง6f2328b8; ยังไม่commit/push/merge

ครบ6ตัว: mob-pret, mob-pret2, mob-werewolf, mob-krahang, mob-pop, mob-tanee

- วาด4เฟรมใหม่ต่อตัวด้วย built-in imagegen ตามรูปลักษณ์/เสื้อผ้า/สี/pixel art เดิม ทุกตัวหันขวา
- กระหังและตานีลอยโยก ไม่เพิ่มขา; ที่เหลือใช้เฟรมย่าง/ย่อง
- ส่งไฟล์ `img/<key>-walk.png` RGBA2048×512, 4ช่อง512×512 เท่าความสูงสไปรต์ยืนเดิม; จัดฐานล่างและpivotกึ่งกลาง ใช้สเกลเดียวกันทั้ง4เฟรมต่อตัว ไม่มีวาดแก้รูปร่างในสคริปต์แพ็ก
- เพิ่ม6keyใน ENEMY_WALK_ART; เกมจะเรียก drawCrewWalk เมื่อศัตรูเคลื่อน ตัวที่ไม่มีkeyยังใช้สไปรต์ยืนตามเดิม; bumpเฉพาะ registryในimport-map
- Native art.drawCrewWalk โหลดPNGจริงครบ6ไฟล์ เลือกครบ24crop phasesถูกต้อง และฐานworldคงเดิม ดู native-art-renderer.json/png
- เทสต์พิกเซลPNGอิสระตรวจ4เฟรมแตกต่างจริง, alpha, dimension, ขอบฐาน/center พร้อมเทสต์fallback/ไฟล์ของทุกkey; 7/7 ผ่าน
- Native route input/Q4/character scale18/18; full1793/1793,0fail; diff-check/syntaxผ่าน
- ยังรอเจ้าของตรวจลูปด้วยตาในเกมจริง; ไม่อ้างbrowser/FPSมือถือหรือผลReese/Chris

หลักฐาน: six-enemies-frames.png, native-art-renderer-frames.png, sheet-qa.json, previews/*.gif, tests-full.log
ภาพต้นฉบับimagegenอยู่generated/, referenceอยู่references/

Prompt/specification: same exact pixel character and palette, four consecutive right-facing poses on2×2 equal-cell transparent contact sheet, contact/passing/opposite contact/passing for walkers; subtle basket/hair/tail hover cycle for flyers; no anatomy/props added, no text or grid, consistent scale and fixed foot. Packed in reading order to4-horizontal cells with one scale per character, nearest resampling for pixel art and a shared bottom-center pivot. Built-in image_gen only.

อัปเดตคิว: ชุดเอเชีย4ตัวและโซน3–4อีก7ตัวเสร็จในbranchของแต่ละชุดแล้ว รวม17ตัว ดู QUEUE-PROGRESS-2026-11-01.md; ยังไม่รวมregistryทั้ง17ตัวลงmain
