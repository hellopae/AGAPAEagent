# LOAD-01b — เกมกระตุกบนมือถือ: วัดก่อน แล้วแก้จุดที่หนักที่สุด (Toby) — 28 ต.ค. 2569

Repo: `/Users/agapae/agapae-work/AVEGEE` · ทำใน **git worktree แยก** `../.toby-worktrees/load01b` branch `toby/load01b` จาก main ล่าสุด · ห้าม checkout สลับ branch ใน clone หลัก · ห้าม push main (Dale merge)

## บริบท
คุณเป้แจ้ง (P0) ภาพเข้าเกมไม่ขึ้น/กระตุก · Codex แก้ส่วนแรกแล้ว `df703e5` (LOAD-01a: ภาพนอกอาคาร decode ก่อนเปิดแผนที่ เลิกโหลดทั้ง manifest)
ที่ยังค้าง: **กระตุกระหว่างเล่น โดยเฉพาะมือถือ** — ยังไม่มีใครวัดเฟรมจริง
ระหว่างนี้ Codex กำลังแก้ไฟล์เหล่านี้อยู่ **ห้ามแตะ**: `exit-marker.js`, `scene.js` ส่วนลูกศร/ป้าย, `frontier.js` ส่วนป้ายชื่อศัตรู, `i18n.js`, `team-hud.*`, `menu-ui.*` (R1) · `battle-fx*.js`, `asset-preload.js`, `preload.js`, `cutscene-presentation.js`, `power-cutscene-assets.js`, `action-cutscene-fx.js` (R2) · `route-geometry.js` (B34) · `interrogation*.js`, `remorse.js`, `soul-portraits.js` (S1)
ถ้าจุดที่ต้องแก้อยู่ในไฟล์พวกนี้ ให้ **รายงานพร้อมแพตช์ที่เสนอ** ไม่แก้เอง

## ขั้นตอน
1. วัดเวลาเฟรม (frame time median/p95, long task > 50 ms) ด้วย Chrome headless/Playwright + CPU throttle 4× ที่ viewport 390×844 และ desktop 1440×900
   ฉาก: เมือง 4 โซน (เดิน 20 วินาที), ชายแดน 1–2 และ 2–3 (เดิน), ห้องสอบสวน, ฉากต่อสู้ 1 รอบ
2. profile หาต้นทุนสูงสุด 5 อันดับต่อฉาก (draw call, `drawImage` ขนาดใหญ่ทุกเฟรม, `ctx.filter`/shadowBlur, offscreen canvas ที่สร้างใหม่ทุกเฟรม, ambient/particle, การ decode กลางเกม, GC)
3. แก้ 3 อันดับแรกที่ **ภาพไม่เปลี่ยน**: cache layer นิ่งลง offscreen, จำกัด particle ตาม devicePixelRatio/ขนาดจอ, หยุดวาดสิ่งที่อยู่นอกจอ ฯลฯ
4. วัดซ้ำแบบเดิม ใส่ตารางก่อน/หลัง

## ข้อห้าม
- ไม่ลดคุณภาพภาพจนเห็นต่าง (เทียบภาพก่อน/หลังทุกฉากที่แก้) · ไม่ปิดเอฟเฟกต์ทั้งชุด
- ไม่เปลี่ยน gameplay/collision · bump `?v=` เฉพาะไฟล์ที่แก้

## เกณฑ์รับงาน
1. ตารางเฟรมก่อน/หลังทุกฉาก (mobile throttle + desktop)
2. p95 frame time ของฉากที่แย่ที่สุดดีขึ้นอย่างน้อย 30% หรืออธิบายได้ว่าทำไมไม่ได้ พร้อมข้อเสนอ
3. ภาพเทียบก่อน/หลัง ไม่ต่างให้เห็น · console ว่าง · `node --test tests/*.test.mjs` 0 fail (เทสต์เก่า 9 ข้อที่ R1 แก้ ถ้ายังตกให้ระบุว่าเป็นข้อเดิม)
4. รายงาน `Output/Toby/2026-10-28-avegee-load01b.md` + หลักฐานใน worktree `output/coordination/2026-10-28-load01b/`
5. commit บน `toby/load01b` (ไม่ push main) แล้วแจ้ง path worktree + commit
