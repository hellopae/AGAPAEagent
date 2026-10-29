# C2-ART-B — ไอคอนท่าใหม่ 8 แบบ + FX หลัก (29 ต.ค. 2569)

Repo: AVEGEE (worktree ของ run นี้) · ห้าม commit/push/merge เอง · **งานวาดล้วน ไม่แก้โค้ดเกม** ไม่แก้ `img/manifest.json`

## วาดด้วยอะไร
**built-in `image_gen` เท่านั้น** (skill `~/.codex/skills/.system/imagegen/SKILL.md`) · **ห้าม Shado MCP / CLI fallback**

## สเปก (Astra A1 §2/§4: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Astra/2026-10-28-avegee-a1-combat-moves-design.md`)
แบบอ้างอิงไอคอน: `img/ui/power-fire.webp` (256×256) และไอคอน `img/ui/power-*.webp` อื่น — สไตล์/กรอบ/ความหนาเส้นเดียวกัน · cutscene ที่วาดแล้ว: branch `codex/20261029T033540Z-c35a0e56` (`img/skills-v1/th/`) ใช้เป็น reference สี/อารมณ์ของท่า
ไอคอน 256×256 RGBA โปร่งใส บันทึก `img/skills-v1/icons/<skill>.webp`:
copperInferno (เพลิง) · mercySeal (นิรา) · lotusSanctuary (บุญ) · laborJudgment (ทัณฑ์) · shadowCleaver (ดำ) · abyssGatebreaker (ยักษ์) · karmaFracture (กานต์) · teamJudgment (ยามา)
FX RGBA โปร่งใส `img/skills-v1/fx/`: mercySeal-shield-512 · lotus-shield-512 · taan-shockwave-768 · dam-slash-512 · guard-impact-768 · kan-mirror-shard-256 · kan-impact-512 · yama-dash-trail-256x512 · yama-impact-768 (เลขท้าย = ขนาด px)
ไม่มีตัวอักษร/ตัวเลขในภาพ · อ่านออกที่ 44px (ขนาดปุ่มในเกม)

## ส่งมอบ
`output/coordination/2026-10-29-c2-art-b/`: contact sheet ไอคอนใหม่เทียบไอคอนเดิม (ที่ 256 และ 44 px), contact sheet FX บนพื้นมืด/สว่าง, `prompts.md`, `manifest.json`

## เกณฑ์รับงาน
1. ไอคอน 8 + FX 9 ครบ ขนาดถูก alpha โปร่งใส
2. ไอคอนเข้าชุดกับไอคอนเดิม แยกกันออกที่ 44 px
3. ไม่แตะ `src/` และ manifest
