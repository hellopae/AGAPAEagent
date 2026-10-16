# AVEGEE N2 — sprite ท่าโจมตีรั่วข้ามเฟรม + ยมในหน้าสอบสวนยืนนิ่ง (รายงาน Toby)

ใบงาน: `Output/Claudy/briefs/2026-10-16-avegee-n2-sprite-bleed-trial-idle.md` · repo `/Users/agapae/agapae-work/AVEGEE` · worktree `/Users/agapae/agapae-work/.toby-worktrees/n2` · **branch `toby/n2-sprite-idle`** (ฐาน main `19d1afe`) · 2 commit: `c7d5434` (ลบ sprite รั่ว) · `b8512a9` (ยมยืนนิ่ง + เทสต์ + cache-bust `-n2`) · ยังไม่ merge/push รอ Dale รีวิว · รายละเอียดเต็มใน repo: `docs/n2-sprite-bleed.md`

## สิ่งที่ build

**1. sprite รั่ว (ภาพ 8)** — สแกนอัตโนมัติ 560 เฟรมที่ manifest ใช้จริง (ยมทูต 6 ตัว, บอส 5 ตัว, นิระ idle, ยมบาท sword-hurt × 4 โซน)
- **รั่ว 103 เฟรม (136 ชิ้น) ใน 42 จาก 56 atlas** แก้หมดแล้ว สแกนซ้ำ = 0 · แยกโซน: th 21 · asia 26 · west 29 · cyberhell 27 เฟรม
- **สาเหตุจริง: ไม่ใช่ bilinear/ไม่มีระยะเว้น และไม่ใช่โค้ดวาด** — atlas 384×512 ตัดจากแถบภาพยาวด้วย "หน้าต่างกว้างตายตัว 346px (x 19..364)" ท่าที่กว้างกว่าล้นไปช่องข้างๆ จึงมีเศษของเฟรมอื่นติดขอบซ้าย/ขวา (บุญ attack เฟรม 5 = ส่วนล้นของดอกบัวเฟรม 4 — ตรงกับภาพที่คุณเป้วงไว้ ผมทำซ้ำในเกมได้)
- วิธีแก้: สคริปต์ PIL รันซ้ำได้ `scripts/art/clean-combat-atlas-bleed.py` ลบเฉพาะ connected component ที่แยกขาดจากตัวละคร และ (ก) แตะขอบหน้าต่าง = 107 ชิ้น (ข) ลอยอยู่เหนือหัวบอสทั้งชิ้น = 21 ชิ้น (รองเท้าลอย 12 เฟรม) (ค) เศษเล็ก ≤600px ใน atlas idle = 8 ชิ้น · **พิกเซลอื่นเหมือนเดิมทุกไบต์** (สคริปต์ assert ทุกไฟล์) · บันทึก lossless เหมือนต้นฉบับ ขนาดตาราง/manifest/โค้ดไม่เปลี่ยน · **ไม่ได้แตะ `src/combat-sprites.js`, `src/yama-animation.js`, manifest ของ Codex**
- ไฟล์ภาพที่แก้ 42 ไฟล์ (รายชื่อใน `git show --stat c7d5434`)
- **แก้ด้วยโค้ดไม่ได้ (ส่งต่อ Codex)**: ท่าที่ตัวละคร/อาวุธ "ถูกตัดเป็นเส้นตั้ง" ที่ขอบหน้าต่างเอง **203 จาก 448 เฟรม** (116 เฟรมตัดยาว ≥60px) เช่น ดอกบัวบุญเฟรม 4 · ชิ้นล้นไปช่องข้างๆ ลบแล้ว แต่ส่วนที่ขาดของตัวเองต้องวาด/ส่งออกใหม่ · รายชื่อ `docs/n2-clipped-frames.json` · สเปกอยู่ข้างล่าง

**2. ยมในหน้าสอบสวนยืนนิ่ง (ภาพ 9)**
- ต้นเหตุ: `.trial-hud .hud-stage .fig{animation:battleBreath}` (ขยับขึ้นลง 5px ทุก 2.4s) ใช้กับยมและผู้ต้องหา — วัดจริง กรอบรูปยมขยับ 236.8↔241.8px
- ตอนนี้ bob เหลือเฉพาะผู้ต้องหา (`.fig.foe` ยังลอยเหมือนเดิม) · ยมใช้ท่ายืนพักของแผนที่ `book-idle` (กะพริบตา ตัว/หัว/เท้าไม่ขยับ) — `src/yama-trial-idle.js` ประกอบ 4 เฟรมให้กรอบตัวตรงกับภาพวาดเดิมแล้วสลับ `src` ของ `<img>` เดิม จึงไม่ต้องแตะ CSS ขนาด/ตำแหน่งทุกจอ · reduced-motion/โหลดพลาด = ภาพวาดเดิมนิ่ง
- **ยืนยันตามที่ถาม: เฟรม idle สลับจริง** — Playwright 390×844 DPR2 ทั้ง 4 ชุด (th/asia/west/cyberhell): เห็นเฟรม 0,1,2,3 ครบ, `getBoundingClientRect` ไม่เปลี่ยนเลยตลอด 3 วินาที (วัดก่อนแก้: เปลี่ยนทุกเฟรม) · กดข้ออ้างให้หน้า re-render แล้ว idle ยังทำงาน · pageerror 0
- ห้องอื่นที่ใช้ bob แบบเดียวกัน (ไม่ได้แก้ ตามใบงาน): ฉากต่อสู้ `.arena.combat-arena .fig.you/.foe` (`battleBreath` ตัวเดียวกัน — น่าจะยังขยับอยู่แม้ใช้ atlas วาดทับ ยังไม่ได้วัด) · ห้องลงทัณฑ์ `.punish-yama img` (`boilYama` ขึ้นลง 4px) · `art.js` ตัวละคร/วิญญาณบนแผนที่ (`Math.sin` bob)

## ไฟล์ที่แตะ

ใหม่: `scripts/art/clean-combat-atlas-bleed.py` · `src/yama-trial-idle.js` · `tests/n2-sprite-bleed.test.mjs` (4 เทสต์) · `docs/n2-sprite-bleed.md` · `docs/n2-clipped-frames.json`
แก้: `img/crew-combat-v1/**` + `img/boss-combat-v1/**` (42 ไฟล์ .webp) · `src/ui.js` (import + 1 บรรทัดเรียก `mountYamaTrialIdle` หลัง render หน้าสอบสวน — **M1 แตะ ui.js ส่วนสอบสวนเหมือนกัน ชนให้ rebase**) · `index.html` + `output/game-review/index.html` (CSS bob เหลือ `.fig.foe`; cache-bust ui.js `20261016-map-polish-v1-n2`) · เทสต์เดิม 5 ไฟล์ปรับ regex ให้รับ `-n2` (`k2-menu`, `k5-battle-layout`, `skill-atk`, `l5-auto-encounter`, `west-hit-facing`)
ไม่แตะ: `combat-sprites.js`, `yama-animation.js`, manifest, ไฟล์กล้อง M1, เอฟเฟกต์ M2, `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## วิธีรัน/ทดสอบเอง

```
cd /Users/agapae/agapae-work/.toby-worktrees/n2
python3 -m http.server 8812
```
1. **ท่าโจมตียมทูต**: เปิด `http://localhost:8812/index.html` (กว้าง 390) สู้ผีโดยมีบุญในทีม → ตอนบุญโจมตี **ไม่มีกลีบชมพู/ชิ้นส่วนอื่นโผล่ข้างตัวอีก** (ลองกับเพลิง ยักษ์ทวารบาล ดำ ทัณฑ์ กานต์ และบอสทุกโซนได้) · หน้า review `http://localhost:8812/output/game-review/index.html` เปิดฉากสู้ได้ทันที
2. **หน้าสอบสวน**: เปิดห้องสอบสวน → ยมบาทน้อยฝั่งซ้าย **ยืนนิ่ง กะพริบตาเป็นช่วง ไม่ขยับขึ้นลง** · ผู้ต้องหายังลอยเบาๆ ตามเดิม · ลองเปลี่ยนชุดยม (th/asia/west/cyberhell) ด้วย
3. เทสต์: `node --test tests/n2-sprite-bleed.test.mjs` · ทั้งชุด `node --test tests/*.test.mjs` → **1001 เทสต์ ผ่าน 1001 · แดง 0**
4. รันสแกนซ้ำ/ตรวจ: `python3 scripts/art/clean-combat-atlas-bleed.py` (ควรขึ้น `pieces 0`)

หลักฐาน (เก็บใน `/tmp/n2/ev/`):
- ก่อน/หลังทุกเฟรมท่า attack/hurt/idle ทุกยมทูตและบอส × 4 โซน: `cmp-<th|asia|west|cyberhell>-<crew|boss>.png` (บน=ก่อน ล่าง=หลัง, วาดด้วย manifest จริง)
- ในเกมจริง บุญ attack เฟรม 5: `ig-boon-f5-before-after.png` (ซ้าย=ก่อนมีกลีบชมพูข้างตัว · ขวา=หลังหาย)
- หน้าสอบสวน: `trial-before-m390.png` / `trial-after-th.png` (+ `-asia/-west/-cyberhell`) · เทียบ 1280px `trial-before-d1280.png` / `trial-after-d1280.png` · เฟรม idle 0 กับกะพริบ 2: `trialidle-f0.png`, `trialidle-f2.png`

## สเปกอาร์ตที่ต้องการเพิ่ม (ให้ Codex)

ท่าที่ถูกหน้าต่าง 346px ตัดเอง 203 เฟรม (`docs/n2-clipped-frames.json`):
- **ส่งออกใหม่ทั้งชุด** ยมทูต 6 ตัว (attack 6 + hurt 2, idle 4) + บอส 5 ตัว (idle 3, attack 6, hurt 3) × 4 โซน — ชื่อไฟล์/ลำดับ/จำนวนเฟรมเดิม ทับไฟล์เดิม
- ขนาดช่อง **512×512 px ต่อเฟรม** (เดิม 384×512) พื้นโปร่ง webp lossless · ท่าอยู่ในกรอบ เว้นขอบ ≥8px ทุกด้าน ไม่มีชิ้นส่วนข้ามช่อง · จุดเท้า/สัดส่วนตัวละครเท่าเดิม (ปรับ `frameWidth`=512 และ `anchor[0]`=256 ใน manifest)
- ขั้นต่ำถ้าไม่ส่งออกใหม่: ย่อท่า 203 เฟรมให้อยู่ใน x 19..364 (ย่อทั้งท่าเล็กน้อย) — ไม่ต้องแก้โค้ด

## สิ่งที่ยังไม่ทำ

- ท่าที่ตัวเองถูกตัด 203 เฟรม (ข้างบน — ต้องวาด) · ไม่ได้ตัดสินใจเรื่องสไตล์ภาพใดๆ
- ไม่ได้แก้ bob ห้องอื่น (ฉากต่อสู้ ห้องลงทัณฑ์ แผนที่) ตามขอบเขตใบงาน
- ยังไม่ทดสอบบนมือถือจริง/Safari (Chromium headless เท่านั้น) · รูปภาพ atlas ที่แก้ไม่มี cache-bust ในชื่อไฟล์ (GitHub Pages cache ~10 นาที) — Dale ตัดสินว่าจะเปลี่ยนชื่อไฟล์หรือไม่ตอน deploy
- ยังไม่ merge/push (รอ Dale) · ระหว่างทำผมเผลอ `pkill` เซิร์ฟเวอร์ dev พอร์ต 8795 (ของ M2 ที่ค้างอยู่) — ถ้างาน M2 ต้องใช้ ให้สั่ง `python3 -m http.server 8795` ใหม่
