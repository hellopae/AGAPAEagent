# AVEGEE: เอฟเฟกต์หน้า Home ต้องเห็นว่าขยับ + แผนที่โซน 1–2 ให้มีชีวิตเท่าโซน 3–4

repo `/Users/agapae/agapae-work/AVEGEE` · branch `toby/cover-fx` (worktree `../.toby-worktrees/cover-fx`) · commit `fa38040` (Home) + `d293cc9` (แผนที่) · merge origin/main แล้ว (Already up to date) · ยังไม่ push/merge main

## สิ่งที่ build
**Home (หลังวิดีโอจบ)** — แทนระบบเส้น 1px เดิม (alpha <= .17) ด้วยเอนจินเดียวใน `src/cover-fx-h5b.js` ใช้มาสก์ v4 เดิม:
- เปลวไฟ: ดึงพิกเซลเปลวจากภาพปกมา re-sample เป็นแถบบางๆ ให้เอนไหว + ยืดหด (heat warp) + glow additive กะพริบไม่สม่ำเสมอ + ประกายไฟ 2-4px ลอยจากปลายเปลว
- ลาวา: ลายลาวาไหลจริง (flow-map cross-fade: แม่น้ำไหลแนวนอน, น้ำตกไหลลง) + ริ้วแสงวิ่งตามทิศไหล + ฟองเดือดผุด + embers ลอยจากผิวลาวา
- ภูเขาไฟ: เส้นลาวาเต้นเป็นจังหวะไม่สม่ำเสมอ + แสงวิ่งลงเขา + ควันลอยจากปากปล่อง + ขี้เถ้า
- วิญญาณบนสะพาน: คงที่ (ตัดมาสก์ soul ออกจากทุกเอฟเฟกต์ที่ท้ายเฟรม)
- canvas = ขนาด viewport x dpr (cap 1.5 และไม่เกิน 2.6M พิกเซล) ไม่ใช่ 688x384 ขยาย · มือถือ (<=700px/pointer coarse) ลดอนุภาค · เลเยอร์ที่ถูกครอปพ้นจอแนวตั้งไม่ถูกสร้าง
- ลบ `src/cover-atmosphere.js` (ระบบที่สองที่ไม่ได้ใช้)
- หยุดวาดเมื่อออกจาก Home / แท็บซ่อน / reduced-motion เหมือนเดิม (ไม่เปลี่ยน lifecycle)

**แผนที่โซน 1–2 (th/asia)** — `src/map-fx-h3.js` + `src/map-ambient.js` (ใช้พื้นที่ H3 เดิม ไม่แตะการเดิน/ชน):
- เทียบแล้วโซน 3–4 (เส้นทาง generic) แรงกว่า H3 ราว 3–7 เท่า: ฟองเดือด 65 vs 18, แถบ/เส้นลาวา 44+ vs 24 alpha .44 vs .12-.4, สีเติมลาวา .08-.19 vs .035-.08, คลื่นน้ำ 100 vs 48
- ยกงบ H3: ฟอง 18→52, flow 24→72, คลื่น 48→96, ประกาย 12→36, ขอบลาวา 18→44, น้ำตก 18→34/30, + จุดร้อนบนผิวลาวา 10, แสงวิ่งเฉียง 6 แถบ, ประกายบนผิวน้ำ 30, สีเติมลาวา .07–.20, ลาวาไหลลงในร่องแนวตั้ง/ไหลข้างในแม่น้ำ
- พบบั๊กเก่า: ไฟตะเกียงของ asia (12 จุด) อยู่หลัง `return` ของ H3 จึงไม่เคยวาด → แก้ให้วาดจริง (glow additive กะพริบ) และเพิ่มรายการตะเกียงของ th

## ไฟล์ที่แตะ
`src/cover-fx-h5b.js` (เขียนใหม่) · `src/cover-atmosphere.js` (ลบ) · `src/map-fx-h3.js` · `src/map-ambient.js` · `src/scene.js`, `src/ui.js` (แค่ import `?v=mapfx`) · `index.html` (cache-bust `cover-fx-h5b.js?v=h5b-intro-v3-coverfx`, `ui.js?v=...-i1b-mapfx`) · `tests/h5b-cover-fx.test.mjs` · `tests/h3-map-ambience.test.mjs`

## วิธีรัน/ทดสอบเอง
```
cd /Users/agapae/agapae-work/.toby-worktrees/cover-fx
python3 scripts/serve-nocache.py 8791   # แล้วเปิด http://localhost:8791/index.html
node --test tests/*.test.mjs            # 720 pass / 0 fail
```
- Home: กด "แตะเพื่อเข้าสู่อเวจี" → ดูอินโทรจบหรือกดข้าม → มอง 2–3 วิ ควรเห็นคบเพลิงไหว/ยืด ลาวาไหล ภูเขาไฟเต้น ประกายลอย; วิญญาณบนสะพานนิ่ง
- แผนที่: เริ่มเกม แล้วย้ายโซนในคอนโซล `G.canMoveZone=()=>true; G.moveZone('asia')` (หรือ 'th'/'west'/'cyberhell') ดูลาวา/น้ำ/ตะเกียง
- ลองเปิด System Settings > Accessibility > Display > Reduce motion: เอฟเฟกต์จะปิดตามออกแบบ (ปัจจุบัน**ปิดอยู่** ดูหัวข้อด้านล่าง)

## ผลวัด (วัดจริง)
**Home 1600x900**: พิกเซลที่เปลี่ยนใน 0.5 วิ (วิดีโอ, ต่างช่องใดช่องหนึ่ง >=24) — เดิม median 0.04% (0.00–0.10) → ใหม่ median 3.5% (3.4–6.2 จาก 5 คู่เฟรม) ≈ 90 เท่า · วิธีภาพนิ่ง threshold 6: เดิม 0.11% → ใหม่ 6.8%
**Home 390x844**: เดิม 0.00% → ใหม่ median ~0.34% — **เล็กกว่าจอกว้างมาก เพราะครอปแนวตั้งเหลือแค่ตรงกลางภาพ (บัลลังก์/ยักษ์/สะพาน) ซึ่งมีไฟมีแค่คบเพลิง 2 อัน + ไฟหน้าแท่น ลาวาแม่น้ำอยู่นอกกรอบ** → ถ้าอยากให้แนวตั้งเห็นชัดกว่านี้ต้องให้ Vera/Kittanate ตัดสินเรื่องกรอบครอปหน้าปกแนวตั้ง (ผมไม่แก้ภาพ/ตำแหน่ง)
**เวลาต่อเฟรม (Chrome จริงมี GPU, 1600x900, dpr1)**: คำสั่งวาด median 3.4–3.9 ms (p95 ~6–7 ms) · อัตราเฟรมหน้า Home 60.0 fps นิ่ง (p95 17.6 ms; เท่าของเดิม) · headless (ซอฟต์แวร์ไม่มี GPU) ช้ากว่ามาก 44 ms — ไม่ใช่ตัวแทนเครื่องจริง · build ครั้งแรก ~0.3 วิ ตอนเข้าหน้า Home
**แผนที่ (วาดล้วน เทียบ 0.5 วิ, ภาพ 1678x937)**: changed% / mean-delta — th 0.051→1.005 / 0.11→0.92 · asia 0.046→1.138 / 0.125→1.13 · west 0.106 (ไม่เปลี่ยน) · cyberhell 0.341 / 0.84 (ไม่เปลี่ยน) → โซน 1–2 อยู่ระดับ/สูงกว่าโซน 4 ตามตัวเลข; เวลาวาด th 0.5→1.3 ms/เฟรม, asia 0.5→1.3 ms
**reduceMotion ของเครื่องคุณเป้**: `defaults read com.apple.Accessibility ReduceMotionEnabled` = 0 (ปิด), `com.apple.universalaccess reduceMotion` ไม่มีคีย์ (ค่าเริ่มต้น = ปิด) → เอฟเฟกต์จะไม่ถูกซ่อนด้วย Reduce Motion (หมายเหตุ: Brave/ตัวเบราว์เซอร์มี flag ของตัวเองไม่ได้ตรวจ)

## หลักฐาน (วิดีโอ/ภาพ)
`AGAPAE Agent/Output/Toby/evidence/2026-10-10-cover-fx/` — `after-home-1600x900.mp4/.gif`, `after-home-390x844.mp4/.gif`, `before-home-*.mp4`, `compare-before-after-1600.mp4/.gif`, `compare-before-after-390.mp4`, `after-diff-1600-0.5s.png` / `before-diff-1600-0.5s.png` (ภาพ diff คูณความสว่าง), `after-1600-frameA.png` + `after-1600-frameB-0.5s-later.png`
`.../evidence/2026-10-10-map-fx/` — `map-4zones-AFTER.mp4/.gif` (2x2 สี่โซน), `map-4zones-BEFORE.mp4`, `map-th-BEFORE-vs-AFTER.mp4/.gif`, `map-asia-BEFORE-vs-AFTER.mp4/.gif`, `map-fx-metrics-before/after.json`
(วิดีโออัดจาก Chrome จริงมี GPU ผ่าน Playwright; ภาพนิ่งตัดสินการขยับไม่ได้ ต้องดูวิดีโอ)

## สเปกอาร์ตที่ต้องการเพิ่ม
ไม่มีที่บังคับ · ถ้าอยากให้หน้า Home แนวตั้ง 390x844 เห็นไฟ/ลาวามากขึ้น ต้องการ (ให้ Vera/Kittanate ตัดสิน): ภาพปกเวอร์ชันแนวตั้ง `img/cover-v4-portrait.webp` 1170x2532 พื้นหลังเหมือนเดิมแต่จัดองค์ประกอบให้เห็นแม่น้ำลาวา + มาสก์ใหม่ `img/cover-fx/{lava,fire,volcano,soul}-v4p-mask.png` ขนาดเดียวกัน

## สิ่งที่ยังไม่ทำ
- ไม่ push/merge main (Dale)
- ตะเกียงของ th วางตำแหน่งโดยประมาณจากภาพ (ตรวจด้วยตา 10 จุด ไม่ได้วัดพิกเซลต่อจุดเหมือน asia) — Kittanate ช่วยดูว่า glow ตรงตะเกียงจริงไหม
- ไม่ได้แตะโซน west/cyberhell, ฉากในเกมอื่น, วิญญาณบนสะพาน, ลำดับอินโทร
- ยังไม่ได้ทดสอบบน Safari/iOS จริง (ใช้แค่ canvas 2D มาตรฐาน ไม่ใช้ ctx.filter) · เครื่องที่ไม่มี GPU canvas จะช้ากว่าที่วัด (หมายเหตุด้านบน)
