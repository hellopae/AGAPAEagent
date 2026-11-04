# ART-MOB-WALK โซน 2 — รอตรวจรับ

Branch `codex/2026-11-01-art-mob-walk-asia`; base main ในเครื่อง `6f2328b8`; ยังไม่ commit/push/merge

ครบ 4 ตัว: mob-gaki, mob-kasha, mob-nukekubi, mob-hitodama

- วาดใหม่ด้วย built-in image_gen ตามภาพยืนเดิม ทุกตัวหันขวา กากิย่อง คาชะขยับขา/ล้อไฟ นุเคะคุบิและดวงไฟใช้ลูปลอย ไม่มีร่างกายหรือขาที่เพิ่มขึ้น
- ไฟล์ `img/<key>-walk.png` RGBA 2048×512, สี่ช่อง 512×512 สูงเท่าภาพยืนเดิม ใช้สเกลเดียวกันทั้งสี่เฟรมต่อตัวและฐานล่างกึ่งกลาง
- ขั้นตอนแพ็กตัดเศษช่องข้างเคียงที่แยกจากตัวหลักของนุเคะคุบิ/ดวงไฟ ไม่วาดแก้รูปร่าง; หลักฐานก่อนแก้เก็บ tests-before-cell-cleanup.log
- เปิด 4 key ใน ENEMY_WALK_ART และ bump import-map เฉพาะ registry; ตัวที่ยังไม่มี key ยังคง fallback
- Native art.drawCrewWalk โหลด PNG จริงครบ 4 ไฟล์และเลือกครบ 16 crop phases ฐาน world คงที่; เทสต์ PNG/registry 5/5 ผ่าน
- Full suite หลังแพ็กไฟล์สุดท้าย 1791/1791, 0 fail; syntax และ git diff --check ผ่าน
- ยังรอตรวจลูปด้วยตาในเกมจริง ไม่อ้าง browser/FPS มือถือหรือผล Reese/Chris

ภาพก่อน/หลัง: standing-and-walk-before-after.png
ภาพตัววาดเกมจริง: native-art-renderer-frames.png และ native-art-renderer.json
ลูป: previews/*.gif; ขนาด/alpha/hash: sheet-qa.json; full log: tests.log
แหล่งภาพ generated/, อ้างอิง references/, ขั้นตอนทำซ้ำ assemble-sheets.py และ render-native.mjs

Prompt/specification: preserve the exact original pixel character, clothing, palette and viewing angle; four distinct right-facing locomotion phases in equal 2×2 transparent cells; consistent scale and bottom-center pivot; no text/grid/new anatomy. Gaki creeps, Kasha stalks with rotating flaming wheel, Nukekubi hair/neck undulates without body, Hitodama faceless flame pulses without limbs. Built-in image_gen only; technical extraction and registration to a horizontal strip.
