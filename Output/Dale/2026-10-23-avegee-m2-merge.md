# AVEGEE M2 รอบ 0 — Dale merge + deploy (23 ต.ค. 2569)

ผลรวม: **PASS — merge + push + Pages สำเร็จ** (ไม่มี FIX LIST)

- merge commit `0f95200` (--no-ff, `toby/m2-map-base` HEAD `f274b9e` เข้า main ฐาน `a7f06e9`) · push `a7f06e9..0f95200`
- เทสต์หลัง merge บน main: **1386 pass / 0 fail** (`node --test tests/*.test.mjs` 3:48 นาที)
- Pages run `39901110615` (pages-build-deployment) — success (build 50s, deploy 30s) · เว็บ https://hellopae.github.io/AVEGEE/ ซึ่ง importmap ชี้ `zone-skin.js?v=m2`
- repo ไม่มี build step (static) — gate คือเทสต์ + เว็บจริง

## รีวิวตามข้อ
1. **โซน 1 เหมือนเดิม**: อ่าน diff ของ zone-skin / route-geometry / data / zone-travel / dungeon-art / game / proximity / scene / ui — ค่าโซน 1 ย้ายมาเป็น data ค่าเดิม (URL/คีย์/จุดยอดเส้น/ลาดตระเวน/ถ้ำบอส `th:asia` ตรงตัวเดิม) · โซน 2–4 `enabled:false` → `isTownZone` เท็จ → `syncSceneZone` ใช้ระบบเก่า (SCENE 1678×937 บนเว็บจริง) · `routeAvailable`/`routedBoss`/`nextDungeonEncounter` ตรรกะเทียบเท่าของเดิมสำหรับ th:asia (ถ้ำบอสเฉพาะ 1–2) และเส้น 2–3/3–4 ที่ปิดอยู่ = เดิม · grep ฮาร์ดโค้ด `'th'`/`'th:asia'` ที่เหลือในโค้ดเป็นเรื่องเรื่องราว/บอส/เนื้อเรื่องโซน 1 ตามที่ใบงานให้คงไว้ (battle-background, boss-guides, game story ฯลฯ) ไม่ใช่ระบบแผนที่
2. **migration เซฟ**: `migrateTownSkinZone` ถูกเรียกเมื่อ `isTownZone(k)` จริง (ปิด = ไม่ทำงาน) + ธง `townSkinMigrated` ครั้งเดียวต่อโซน · ไม่แตะความคืบหน้า · เซฟเก่า (ไม่มีฟิลด์) โหลดได้ (`{...(d.townSkinMigrated||{})}`) · มีเทสต์ m2-skin-migration
3. **สคริปต์ใหม่** (stitch/mask-overlay/extract/bake --zone, town-floor-dump) อยู่ใน `scripts/` เท่านั้น ไม่ถูก import จาก `src/` / `index.html`
4. **cache-bust**: importmap token `m2` ต่อท้ายวันที่ (f2-ui pin เวอร์ชันลงวันที่) เทสต์ 0 แดง · regex ที่ Toby แก้ใน `zone1-map-review.test.mjs` (flame frame): เปลี่ยนจากหา `fx-fire-flame-` ใน scenery เป็นหาใน zone-skin + **เพิ่ม** assert ว่า scenery ดึงจาก `activeTownSkin().light.flame` → เข้มขึ้น ไม่ลดมาตรฐาน
5. **เว็บจริง** (Playwright Chromium, นาฬิกาจริง, เกมใหม่) 390×844 และ 1280×800: เมืองโซน 1 (`city-*`), ชายแดน 1–2 (เปิดด้านนอก, ลาดตระเวน 0/6, ถ้ำ, ปุ่มกลับ), ย้ายเข้าโซน 2 (SCENE 1678×937 ระบบเก่า, โมดัลเปิดสาขา + แผนที่โซน 2 เดิม) แล้วย้ายกลับโซน 1 → **pageerror 0, ไม่มี scroll แนวนอน** ทุกกรณี · response 404 ที่เห็น (`audio/bgm-*.ogg`, `img/hero-yama-side.png`) เป็นของเดิม (โค้ด probe ไฟล์ทางเลือก ไม่ใช่ของ M2)
   ภาพ: `/private/tmp/claude-501/-Users-agapae-Documents-Work-PAE-Claude-AGAPAE-Agent/692ea8b6-f70e-4de4-b556-13e0b1564c07/scratchpad/live/{city,frontier,zone2}-{390,1280}.png` (ชั่วคราว)
   ไม่ได้ทำ: ไม่ได้เทียบ pixel ก่อน/หลังบนเว็บจริงซ้ำ (หลักฐานก่อน/หลังของ Toby อยู่ที่ `/Users/agapae/agapae-work/evidence/m2/` และ `Output/Toby/screenshots/2026-10-23-avegee-m2/`)

## Cleanup
- ลบ worktree + branch local `toby/m2-map-base` (`.toby-worktrees/m2map`)
- ลบ `.codex-worktrees/20261023T010648Z-26aabb0e`, `…010652Z-fc2043b3`, `…010656Z-87aa7055` + branch `codex/<id>` — ตรวจแล้ว: status `rate_limited`, diff.patch 0 ไบต์, worktree สะอาด, HEAD `272cf1f` เป็นบรรพบุรุษของ main · เก็บ `Output/Codex/runs/*` ไว้
- **ไม่ได้ลบ** `20261023T010700Z-29b48e4e` และ `…010704Z-cba1e257` (นอกขอบเขต `T0106*` ในใบงาน) — status ก็ `rate_limited` เหมือนกัน และ HEAD เดียวกัน; ลบได้ด้วยคำสั่งเดียวกันถ้า Claudy อนุมัติ
- ไม่แตะ `.toby-worktrees/m2` (`toby/m2-fx`) และ worktree อื่น

## ย้อนกลับ
`git revert -m 1 0f95200` บน main แล้ว push (Pages deploy เองใน ~1.5 นาที) — เกมโซน 1 ไม่ผูกกับไฟล์ข้อมูลที่เซฟไว้ (ธง `townSkinMigrated` ในเซฟเป็นฟิลด์ที่โค้ดเก่าเมินได้)

## ข้อควรทราบ (จากรายงาน Toby ยังค้าง ไม่เกี่ยวกับ merge)
- โซน 2–4 ยังไม่มีภาพ/skin → เปิดไม่ได้จนกว่า Codex วาดเสร็จ · เปลวไซแอนโซน 4 ต้องวาด 3 เฟรม · สูตรเกรดกลางคืนโซน 3–4 ต้องรอตัวคูณสีจาก Mind · `town.title` "โซน 1" รอ Rae
