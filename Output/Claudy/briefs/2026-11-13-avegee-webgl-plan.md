# ใบงาน Toby (Fable 5.2) — แผนย้ายการวาด AVEGEE เป็น WebGL · 13 พ.ย. 2569 · **วางแผนอย่างเดียว ไม่เขียนโค้ดเกม**
## บริบท
- คุณเป้: "พอวาดแผนที่ใหม่แล้วก็ปรับเป็น WebGL ต่อได้เลย" · AVEGEE อยู่ JS ต่อ (ไม่ย้าย engine) · ปุ่มกราฟิก 2 โหมดเป็นของชั่วคราว ถอดเมื่อ WebGL ลื่น (ถามคุณเป้ก่อน)
- ปัจจุบัน: Canvas 2D (แผนที่ chunk 1024 px, sprite, เงา, vignette CSS) + WebGL overlay เฉพาะของเหลว/เมฆ (`src/fluid-shader.js`) · ปัญหาเดิม: ฟิลเรต iGPU Intel UHD 630 ที่ DPR 2 (perf-1110: เดินเมือง ~52 fps โหมดสูง)
- อนาคต: แสง normal map (memory avegee-idea-normal-map-lighting), Steam (Tauri) + มือถือ (Capacitor)
## สิ่งที่ต้องได้ (`Output/Toby/2026-11-13-avegee-webgl-plan.md` ไทย)
1. สำรวจโค้ดการวาดทั้งหมด (town, battle, room, dungeon, effects) — อะไรย้ายง่าย/ยาก
2. ตัวเลือกสถาปัตยกรรม 2–3 แบบ (เช่น PixiJS v8 / WebGL2 เขียนเอง / renderer ผสม) · ข้อดีข้อเสีย · ขนาด bundle · ความเสี่ยงกับเทสต์ 2140 ข้อ · การ fallback Canvas 2D
3. แนะนำ 1 แบบ + แผนเป็นเฟส (แต่ละเฟส deploy ได้ เกมไม่พัง) · เฟสแรกควรเป็นอะไร · ประเมินเวลาต่อเฟส · เกณฑ์วัด fps ต่อเฟส
4. ผลต่อ: ปุ่มกราฟิก, shader ของเหลวที่มีอยู่, normal map lighting, มือถือ/Tauri, ขนาด deploy
5. เรื่องที่คุณเป้ต้องตัดสิน
## ข้อห้าม
อ่านโค้ดใน `~/agapae-work/.toby-worktrees/z1-v5` ได้ · ทดลอง prototype สั้น ๆ ในโฟลเดอร์ scratch ได้ (ไม่ commit เข้าเกม) · ห้ามแตะ AVEGEE หลัก/LaunchAgent/.codex-worktrees
