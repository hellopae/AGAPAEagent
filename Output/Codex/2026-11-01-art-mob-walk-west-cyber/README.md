# ART-MOB-WALK โซน 3–4 — รอตรวจรับ

Branch `codex/2026-11-01-art-mob-walk-west-cyber`; base local main `6f2328b8`; ยังไม่ commit/push/merge

ครบ 7 ตัว: mob-skeleton, mob-bot, mob-bug, mob-worm, mob-cyber-guard, mob-cyber-lancer, mob-cyber-brute

- วาดด้วย built-in image_gen ตามสไปรต์ยืนเดิม: โครงกระดูกเดินถือดาบ/โล่ บอตก้าวกลไก บั๊กสับขา หนอนเลื้อย อสูร3ชนิดเดินพร้อมอาวุธเดิม ทุกตัวหันขวา
- เพิ่ม PNG RGBA 2048×512 ที่ `img/<key>-walk.png`; สี่ช่อง512×512 สูงเท่าสไปรต์ยืนเดิม; ใช้สเกลเดียวทั้งสี่เฟรมต่อตัวและฐานล่างกึ่งกลาง
- ตรวจพบอาวุธ/หางล้ำเส้นแบ่ง contact sheet จึงแยกตัวละครทั้งตัวด้วย connected components ก่อนแพ็ก ไม่ตัดตามช่องจนปลายอาวุธขาด; สคริปต์ไม่วาดหรือเปลี่ยนรูปร่าง
- อสูรค้อนมีปลายค้อนชิดขอบต้นฉบับ แก้ด้วย image_gen อีกหนึ่งครั้งให้ครบตัวในกรอบ ก่อนแพ็กจริง; source ที่เลือกและhashอยู่ generated-files.json / sheet-qa.json
- เปิด 7keyใน ENEMY_WALK_ART และ bump import-map เฉพาะ registry; fallback ของ key ที่ยังไม่มีภาพคงเดิม
- Native art.drawCrewWalk โหลดจริงครบ7ไฟล์ เลือกครบ28 crop phases (0/512/1024/1536) และฐาน world คงที่; เทสต์ PNG/registry8/8ผ่าน
- Full suite1794/1794,0fail; syntax/diff-checkผ่าน
- ยังรอตรวจลูปด้วยตาในเกมจริง ไม่อ้าง browser/FPS มือถือหรือผล Reese/Chris

หลักฐาน: standing-and-walk-before-after.png, seven-enemies-frames.png, native-art-renderer-frames.png/json, previews/*.gif, sheet-qa.json, tests-full.log
ทำซ้ำ: assemble-sheets.py, generated-files.json, render-native.mjs; references/ และ generated/เก็บนอกเกม

Prompt/specification: preserve the exact original character, pixel-art outline, clothing, armor, palette and equipment; four distinct right-facing walk/scuttle/slither poses on a 2×2 transparent contact sheet, consistent scale and pivot, no text/grid/new anatomy. Skeleton alternates feet with original sword/shield, bot mechanical steps, CRT bug scuttles with same legs, segmented worm curls without legs, guard/lancer/brute carry their original sword/spear/hammer and shield where present. Final brute correction changes only framing to retain its complete hammer. Built-in image_gen only; technical whole-character extraction to four horizontal cells.

ครบคิว ART-MOB-WALK ทั้งหมด17ตัวใน3branchแยกโซนแล้ว ยังไม่ได้รวม registryทั้ง17ตัวลง main ต้องรวมหลังเจ้าของตรวจรับ
