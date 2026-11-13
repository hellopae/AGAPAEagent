# AVEGEE ART-INTEGRATE — ภาพภารกิจ Codex + ต้นไม้แดง + รั้วสะพาน + เทียบเมฆ (13 พ.ย. 2569)

worktree `~/agapae-work/.toby-worktrees/z1-v5` · branch `claude/2026-11-05-zone1-v5-fx` (ff จาก origin/main eed7afb8) · push แล้ว (HEAD 86891198) · หลักฐาน 2.2 MB: `docs/art-reviews/2026-11-13-art-integrate/` (ใน worktree)
ไม่ได้แตะ AVEGEE หลัก / LaunchAgent / .codex-worktrees (อ่านอย่างเดียว)

## สิ่งที่ build

**1. QUEST-ART (commit 89579632)** — เสียบครบ ไม่มีภาพที่ถูกปัด
- ศัตรู 6 ตัว `img/mob-q-{debtor,collector,gauze-big,gauze,tale-big,tale}.webp` (PNG→webp q86 method 6, alpha lossless, 512×512, 41–85 KB) · `src/quest-fights.js` เปลี่ยน `sp` จาก mob-kasha/hitodama/tanee/pret2 เป็น mob-q-* (เงาเจ้าหนี้+ลูกทวงหนี้ / ผ้าก๊อซใหญ่+เล็ก / แค้นเล่าเรื่อง+แค้น) · ไม่มีท่าเดินสำหรับ mob-q-* จึงใช้ท่ายืน (ระบบเดิม fallback เอง)
- ท่าใหม่ 3 ท่า: ไอคอน 256² + cutscene 2 เฟรมต่อท่า (1375×768) + effect (512/512/768) คัดลอก byte-for-byte (เป็น webp อยู่แล้ว) · ลบ `QUEST_ART_PLACEHOLDER` ทิ้งทั้งหมดใน `src/combat-skill-assets.js`
- ตรวจหน้าตัวละคร: วางภาพใหม่เทียบ cutscene เดิมของซาโตริ (asia) / เกรซ (west รุ่น -f) / ยักษ์ทวารบาล — หน้า/เสื้อผ้า/สีผิว/เขา/เกราะตรงเดิม ไม่พบตัวอักษรในภาพ ขอบสะอาด → ผ่านทั้ง 18 ภาพ ไม่มีภาพที่ต้องให้ Codex วาดใหม่
- ปรับ test: cache-id ของ combat-skill-assets / quest-fights / ui ฯลฯ, texture ใหม่ 3 ตัว (8→11), test quest-rewards ตรวจไฟล์จริงของท่าใหม่แทน placeholder

**2. รั้วสะพาน river-back/front (commit cec255f1)** — ลบ `GROUND_SPRITE_X_FIX` แล้ว
- **ข้อแตกต่างจากใบงาน:** พื้น v7r **ไม่มีรั้วอยู่ในภาพ** (วัดและดูแล้ว มีแต่เสาปลายบันไดทิศเหนือ) จึงตัดจากพื้น v7r ไม่ได้ · ต้นฉบับจริงคือภาพ ImageGen 724×2172 ของ Codex (`~/.codex/generated_images/…`, ที่มาใน `sprites.py` ของ pilot 5 พ.ย.) → ก๊อปไว้ใน `art-src/z1-bridge-rails/`
- **สาเหตุจริงที่รั้วผอม:** ต้นฉบับมีพิกเซล alpha=1 ที่ x=0 และ x=703 → `alpha.getbbox()` ของ pilot เป็นเต็มความกว้าง 704 แล้วบีบรั้วจริง (กว้าง ~195px) เหลือ ~36px ใน sprite 130px
- แก้: `scripts/recut-bridge-rails.py` ตัดด้วย Pillow แกน X ตาม bbox จริง (alpha≥8) · แกน Y แถวเดิม (สูง 1315 px เท่าเดิม เท้าเดิม) · สเกลเดียวกันสองแกน LANCZOS · ไม่วาดใหม่/ไม่ย้อมสี → river-back 119×1315, river-front 95×1315 · วางให้รั้วที่เห็นอยู่ตำแหน่งจอเดิมของ FB2-A (CENTER_X ในสคริปต์) · เติม `v` token กันแคช sprite ชื่อเดิม
- ผล: รูปตรงสัดส่วนเดียวกับเสาที่วาดติดพื้น คมกว่าแบบยืด ×3.5 ชัดเจน (ดู `rails-before-after-1792.jpg`, `rails-before-after-390-zoom.jpg`)

**3. ต้นไม้แดงแยก sprite (commit 46edcf62)** — วาง **12 ต้น**
- ตำแหน่ง = จุดที่คุณเป้สำรวจเองไว้บนพื้น v5 (`objects-inventory.json` ของ pilot, git 807f23f1: west-tree-NN / pilot-red-tree-NN) เลือกเฉพาะจุดที่ (1) v5 มีใบแดงชัด แต่ v7r เหลือ ≤25% (นับพิกเซลสี) (2) เท้าห่างทางเดิน/บันไดทุกช่อง ≥40 หน่วย และห่างต้นไม้ prop เดิม ≥60 หน่วย (test ตรวจให้)
- ตะวันตก (ข้างลาวา/ขอบซ้าย) 7 ต้น: (173,514) (691,659) (92,1084) (149,1125) (79,1640) (106,2152) (750,2144) · ทุ่งใต้แม่น้ำ 5 ต้น: (1164,2031) (1260,2117) (2666,2357) (2346,2370) (2486,2547)
- รูป = ต้นไม้แดงของคุณเป้ที่มีใน repo อยู่แล้ว (`sprites/pilot-red-tree-00.webp`) ไม่ย้อมสี ขนาดตามความกว้างที่สำรวจ · เรียงความลึกตามจุดเท้ากับตัวละคร (layer sort) · เปิดด้วย `show:true` ใน sprites.json เฉพาะ 12 ต้นนี้ — sprite pilot 51 ตัวเดิมยังซ่อนเหมือนเดิม · สคริปต์ `scripts/add-red-trees-z1.py`
- จุดที่ **ไม่ใส่** (ติดทาง/บันได/ต้นเดิม): west-tree-02, 06, 07, 10, 11 และ pilot-red-tree-03 · ไม่ได้ใส่ต้นในทุกจุดที่ v5 มีพุ่มแดง (ทุ่งใต้ v5 มีพุ่มแดงเป็นกลุ่มหนาแน่นกว่ามาก) — ใส่เท่าที่คุณเป้เคยมาร์คไว้ ดู "ต้องตัดสินใจ"

**4. เทียบเมฆ (commit 4d7a71b0)** — ยังไม่เปลี่ยนเมฆเริ่มต้น
- `?clouds=codex` เปิดชั้นเมฆ Codex (layer A/B 20 chunk ต่อชุด, 5.5 MB ที่ `img/map-zone1/v7r-clouds/`) · สูตรตาม clouds.json: น้ำหนัก B = 0.5−0.5cos(2πt/24) ผสม premultiplied, drift sine 48 วินาที [1.5, 0.3] · โค้ด `src/town-clouds-codex.js` ไม่ยุ่งถ้าไม่มี flag
- ภาพเทียบ 3 มุม (ซ้าย = shader ปัจจุบัน, ขวา = Codex, 390 กว้าง) ที่ `docs/art-reviews/2026-11-13-art-integrate/`: `clouds-1-heaven-gate-…jpg`, `clouds-2-left-edge-…jpg`, `clouds-3-central-valley-…jpg`

## ไฟล์ที่แตะ
`src/combat-skill-assets.js` · `src/quest-fights.js` · `src/town-ground-sprites.js` · `src/scene.js` · `src/town-clouds-codex.js` (ใหม่) · `index.html` (cache id) · `img/mob-q-*.webp` ×6 · `img/skills-v1/{icons,th,fx}/` +9 ไฟล์ · `img/map-zone1/v7r/sprites/river-{back,front}.webp` + `sprites.json` · `img/map-zone1/v7r-clouds/` (ใหม่) · `art-src/z1-bridge-rails/` · `scripts/{recut-bridge-rails,add-red-trees-z1}.py` · tests: `quest-rewards`, `fb2-a-map`, `z1-fx5`, `m2-battle-fx`, `fb-ui-1110`, `perf-1110`, `n1-harbour-krajok`, `scene-fx` (ปรับ), `z1-red-trees`, `town-clouds-codex` (ใหม่)

## วิธีรัน/ทดสอบเอง
```
cd ~/agapae-work/.toby-worktrees/z1-v5
python3 scripts/serve-nocache.py 8795 &
open http://127.0.0.1:8795/index.html          # ลองที่ 390 กว้าง (DevTools) และจอใหญ่
node --test tests/*.test.mjs                     # 2140 pass / 0 fail (รันที่ 4d7a71b0)
```
Kittanate ลอง: (1) สะพานกลางใต้ลานศาล — รั้วทองอวบ ไม่ผอม ตรงกับเสาปลายบันได (2) เดินทุ่งใต้แม่น้ำ (ซ้าย/ขวาของลานวงกลมด้านล่าง) และขอบตะวันตกข้างลาวา — มีต้นไม้แดงเพิ่ม เดินผ่านด้านหลัง/หน้าต้นได้ตามเท้า (3) เมฆ: เปิด `…/index.html?clouds=codex` เทียบกับ `…/index.html` ที่ประตูสวรรค์ (ไปทางเหนือขวาสุด) ขอบซ้ายบน และหุบกลางบน (4) ภารกิจ: เปิดเกมจากเซฟที่จ้างซาโตริ/เกรซ/ยักษ์แล้วทำภารกิจ sqKan/sqBoon/sqGuard จนถึงฉากสู้ — เห็นเงาชุดใหม่ และเมื่อใช้ท่าไม้ตายเห็น cutscene 2 เฟรม

## ที่ทดสอบเองจริง (Chromium 390×844 + 1792×1008, Playwright)
- เสียบ quest fight ทั้ง 3 ผ่านเกมจริง: ศัตรู 6 ตัวขึ้นใน battle ถูกชุด ไม่มี 404 / pageerror
- **ท่าไม้ตายซาโตริ (เนตรรอคำอนุญาต)** กดใช้จริงในฉากสู้: cutscene เฟรม 1 → 2 ขึ้นครบ ผล "สับสน 1 เทิร์น" ทำงาน (`quest-eye-cutscene-390.jpg`)
- รั้ว/ต้นไม้/เมฆ: ถ่ายทั้ง 390 และ 1792 ก่อน-หลัง

## สิ่งที่ยังไม่ทำ / ยังไม่ได้ทดสอบ (พูดตรง ๆ)
- **ท่าไม้ตายเกรซ (คำฝากถึงมือ) และยักษ์ (ทวารบาลยืนรับแค้น) ยังไม่ได้กดใช้จริงในเบราว์เซอร์** — สคริปต์ของผมหาปุ่มท่าไม่เจอ (ปลดล็อกผ่าน unlockQuestSkill ไม่ติดกับคนสองคนนี้ในเซฟจำลอง) ที่ตรวจแล้วคือไฟล์/ขนาด/path ครบใน test และภาพ cutscene เทียบหน้าตัวละคร · ควรให้ Kittanate/Chris กดทดสอบสองท่านี้
- effect ใหม่ของท่า (ตา/กรอบประตู) เป็น impact อย่างเดียว ไม่มี projectile (ท่าซาโตริเดิมมีลูกกระจกพุ่ง) — ถ้าต้องการ ต้องขอ effect เพิ่ม (ดูสเปกด้านล่าง)
- เมฆ Codex: ไม่ได้เล่น puff 8 ก้อน และไม่ได้ re-clip ด้วย mask ตายตัว (drift ≤1.5 หน่วย) · shader เมฆเดิมยังไหลอยู่ใต้ชั้น Codex (พื้น v7 มีเมฆนิ่งวาดติด) จึงเทียบกันได้แต่ไม่ใช่การแทนที่เต็มรูปแบบ
- ฉากตัวละครสู้ของเกรซ ผมเห็นผ้าก๊อซบนพื้นน้ำแข็ง (west arena) อ่านออกชัด แต่ผ้าก๊อซสีขาว-เทาบนพื้นสว่างค่อนข้างกลมกลืน — ให้ Kittanate ดูเอง
- ไม่ได้ merge main (Claudy ทำ)

## สเปกอาร์ตที่ต้องการเพิ่ม (ไม่บังคับ)
- ต้นไม้แดงที่ทุ่งใต้แม่น้ำ: ถ้าต้องการพุ่มแดงเป็นกลุ่มเหมือน v5 (รอบหินแหลม) ควรเป็นชุดพุ่ม/ต้นเล็กหลายแบบ — `img/map-zone1/v7r/sprites/red-bush-NN.webp` ×6 แบบ, โปร่งใส, มุมมอง 3/4 บนเหมือนพื้น, กว้าง 160–260 px (2.56 px/หน่วย), จุดเท้ากึ่งกลางล่าง
- (ถ้าอยากได้ลูกกระจกพุ่งของซาโตริ) `img/skills-v1/fx/kan-eye-shard-256.webp` 256×256 โปร่งใส มุมหน้าตรง 1 เฟรม

## ต้องให้คุณเป้ตัดสินใจ
1. **เมฆ:** ดูภาพเทียบ 3 มุม (หรือเปิด `?clouds=codex`) แล้วเลือก shader เดิม / Codex / ผสม — ผมยังไม่เปลี่ยนค่าเริ่มต้น
2. **ต้นไม้แดง:** 12 ต้นตามจุดที่คุณเป้เคยมาร์คไว้ พอไหม หรือต้องการหนาแน่นแบบ v5 (ต้องใส่เพิ่มอีกมากหรือให้ Codex วาดพุ่มกลุ่ม)
3. **รั้ว:** ใบงานบอกตัดจากพื้น v7r แต่ที่นั่นไม่มีรั้ว — ผมใช้ภาพต้นฉบับ Codex แทน (ยืนยันว่าแบบนี้ใช้ได้)
