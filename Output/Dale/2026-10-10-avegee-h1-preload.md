# H1 — AVEGEE: หน้าโหลดเร็วขึ้น + ข้อความหน้าโหลดหมุน (Dale, 10 ต.ค. 2569)

สถานะ: **โค้ดเสร็จ ทดสอบผ่านในเครื่อง — ยังไม่ได้รวมเข้า main / ยังไม่ได้ตรวจบน Pages**
เหตุ: `git push origin dale/h1:main` ถูกระบบสิทธิ์ปฏิเสธ (Out-of-Place Publication) จึงไม่ฝืน — รอ Claudy/คุณเป้ อนุญาตหรือสั่ง push เอง

- Repo: `/Users/agapae/agapae-work/AVEGEE` · worktree `/Users/agapae/agapae-work/.dale-worktrees/h1` · branch `dale/h1`
- Commit: `7f7a2b0` (H1) + `9d04ffa` (merge origin/main 9eb6f29 G2b cover-v5, แก้ conflict แล้ว) — origin/main เป็น ancestor ของ branch → push แบบ fast-forward ได้
- URL จริง (หลังรวม): https://hellopae.github.io/AVEGEE/

## ตัวเลขก่อน/หลัง (Chrome headless, cache เย็น, throttle Fast 4G ≈ 9 Mbps / 165 ms, เสิร์ฟจาก localhost)

| | ก่อน (main 6eb32e5) | หลัง | ลดลง |
|---|---|---|---|
| เวลาถึง boot-ready (มีเซฟ) | **144.6 วิ** | **59.1 วิ** | **−59%** |
| เวลาถึง boot-ready (เล่นครั้งแรก ไม่มีเซฟ รวมบทนำ 5 ภาพ) | 144.6 วิ | 62.7 วิ | −57% |
| ข้อมูลที่หน้าโหลดรอ | 135.3 MB (307 ไฟล์) | 55.2 MB (ภาพ+เพลงหน้าปก 149 ไฟล์) | −59% |
| request ตอนบูต | 1,337 | 412 | −69% |
| รีโหลดซ้ำ (cache อุ่น, Fast 4G) | — | 4.3 วิ · 0 MB | |
| ย้ายโซนครั้งแรก (th → asia) | โหลดทั้งโซน ~100 MB | 18 ไฟล์ ~25 MB (เพิ่มเติมจากของโซนไทย) · ซ้ำ = 0.005 วิ | |

หมายเหตุวัด: เป็น localhost + CDP throttle (HTTP/1.0) ไม่ใช่ Pages จริง — ต้องวัดซ้ำบน Pages หลัง deploy (ดู "วิธีตรวจ")

## สาเหตุที่ช้า (ที่พบ)
1. หน้าโหลดกั้น **ทุกอย่างของโซน** (304 ภาพ 131 MB + เพลง 3 เพลง 8 MB) รวมคัตซีน ฉากจบ มินิเกม
2. **โมดูล `preload.js` ถูกโหลดสองชุด**: `index.html` เรียก `src/preload.js?v=…` แต่ `ui.js` import `./preload.js` (ไม่มี query) → เบราว์เซอร์ถือเป็นคนละโมดูล หน้าโหลดทำงานซ้อนสองชุด (เห็นเป็น 631 request ภาพ) — แก้ให้ใช้ URL เดียวกัน + ตัวที่สองส่งต่อไปที่ตัวแรก (`globalThis.__avegeePreload`) กันซ้ำแม้ใครแก้ token ทีหลังไม่ตรงกัน

## สิ่งที่เปลี่ยน
`src/asset-preload.js` (+`zoneTiers`, `assetTier`, `warmImage`; `createAssetQueue` รับ `ready` ร่วมได้; `zoneAssets` เดิมไม่เปลี่ยน — เทสต์เดิมยังใช้)
- **ชั้น 0 critical (กั้นหน้าโหลด)**: ปกหน้า cover-v5, ฉาก/พื้น (scene*, tile, tex), สถานีบนแผนที่ (map-v5, theme-v4 map/st), ยมบาท (walk/profile/ท่าพื้นฐาน), ทีม (standee + walk sheet), สไปรต์วิญญาณ (soul/spirit + Thai/spirit-*), UI/ไอคอน/ไอเท็ม, พร็อพ, เพลงหน้าปก, บทนำแผง 1 (แผง 2–5 เฉพาะครั้งแรก)
- **ชั้น 1 เบื้องหลัง (หลังเข้าเกม ตอนเครื่องว่าง)**: เพลงโซน → ห้อง (rooms-wide/BG) → ปุ่มวงคำสั่ง → โปรไฟล์/fx/mob/boss → เพลงศึก → มินิเกม/กระจก/ดาบ
- **ชั้น 2 ท้ายสุด**: คัตซีนพลัง/อาวุธ/ทีม/บอส, story/ฉากจบ, deva-intro/frontier intro, ฉากสลบ/tea-recovery, ปกสำรอง/intro panel เก่า, st-*.png เดิม; ข้าม layer นี้ถ้าเปิด Save-Data
- ย้ายโซน (`arrival`): บทนำโซน + คัตซีนทีมของโซนเป็น critical; สไปรต์วิญญาณโซนใหม่เป็นเบื้องหลังอันดับแรก; แผนที่/อาคารโซนไทยที่ติดมาเป็น fallback ไปชั้นท้าย
- ตัวโหลดเบื้องหลัง `warmImage`: ดึงลง HTTP cache + Cache Storage โดยไม่ถอดรหัส, 2 เลน, `requestIdleCallback`, หยุดเองเมื่อมีหน้าโหลดจริง (เปลี่ยนโซน) — ไม่แย่งเฟรม
- รายการ critical ได้จาก **การรันจริงด้วยแคตตาล็อกว่าง** (ไม่ preload อะไรเลย แล้วดูว่าเกมขอภาพอะไรบนจอแรกของมีเซฟ/ไม่มีเซฟ) — เจอ 42 ภาพ ที่ไม่อยู่ใน critical รอบแรก 5 ภาพ (icon-fang, hero-boss-profile, Thai/spirit-* x3) จึงเลื่อนขึ้น critical แล้ว
`src/preload.js`: ข้อความหน้าโหลดหมุน 6 ข้อความ TH+EN ทุก 2.5 วิ แบบ fade (ชุดเดิมจาก bdfa57b + ข้อความเรือข้ามฟากเดิม; ตามภาษา `avegee.lang`; เคารพ prefers-reduced-motion; ข้อความ error "ลองใหม่/ข้าม" ค้างไว้ไม่ถูกทับ) · **ข้อความ EN เป็นร่างของ Dale รอ Rae ตรวจสำนวน**
`index.html`: `preload.js?v=h1`, `ui.js?v=…-g2b-cover-v5-h1` · `src/ui.js` บรรทัด 30: `./preload.js?v=h1` · `CATALOG_VERSION` ต่อท้าย `-h1` (Cache Storage `avegee-images-<version>` ทำงานเหมือนเดิม ล้างของเก่าให้)
`tests/h1-preload-tiers.test.mjs` (ใหม่ 4 เทสต์: 3 ชั้นรวมกัน = bundle เดิมเป๊ะ, critical < 50% ของเดิม, กติกา intro/arrival, ข้อความหมุน + owner เดียว)

ไม่ได้แตะ: `make-manifest.py`, ไฟล์ภาพ, G4/H2/H3/H4 · ไฟล์ที่แตะใน ui.js มีแค่บรรทัด import

## ผลตรวจในเครื่อง
- `node --check src/*.js` ผ่านทุกไฟล์ · `node --test tests/*.test.mjs` **612 ผ่าน / 0 ล้ม**
- หน้าโหลดมือถือ (844×390): แถบ + ข้อความไม่ตัดกลางคำ · ข้อความหมุน 6 ข้อความ TH และ EN ยืนยันด้วยการสุ่มอ่าน `.note`
- เล่นจริงผ่าน CDP (เข้าเกม → ข้ามสแปลช → เล่นต่อ → แผนที่เรนเดอร์ปกติ): ไม่มี exception · 404 ที่เหลือเป็นของเดิม (`audio/*.ogg` probe, `hero-yama-side.png`, favicon)
- เบื้องหลังโหลดจนครบ 135.5 MB (= ของเดิมทั้งหมด) ไม่มีไฟล์หาย · ภาพบังคับล้มเหลว → ขึ้นกล่องลองใหม่/เข้าเกมเท่าที่ได้ ข้อความ error ค้างไม่ถูกทับ → กดลองใหม่แล้วเข้าเกมได้
- ย้ายโซน th→asia: dialog ขึ้น ปิดเอง ไม่ error · เรียกซ้ำ 0.005 วิ
- **ยังไม่ได้ทดสอบ**: เดิน/เข้าห้อง/เข้าศึกแบบกดจริงต่อเนื่อง (ใช้การรันแคตตาล็อกว่าง = ไม่ preload อะไรเลย เป็นกรณีเลวร้ายสุดแทน — เกมใช้ placeholder/โหลดเองเหมือนเดิม) · Safari/iOS · มือถือจริง
- ออฟไลน์: ไม่เปลี่ยนจากเดิม (catalog ใช้ `cache:no-cache` เหมือนเดิม → ออฟไลน์ขึ้นกล่อง "เข้าเกมเท่าที่โหลดได้")

## วิธีตรวจ (สำหรับ Chris หลังรวม)
1. Chrome → DevTools → Network: Disable cache ติ๊กออก, ล้างข้อมูลเว็บ (Application → Clear site data), throttle **Fast 4G**
2. เปิด https://hellopae.github.io/AVEGEE/ (ใช้ `?` อะไรก็ได้กัน cache เก่า) จับเวลาจนเลย boot → คาด ≈ 55–65 วิ (เดิม ≈ 145 วิ), แถบวิ่งเป็น ~150 ไฟล์ (เดิม 287–307)
3. ข้อความใต้แถบเปลี่ยนทุก ~2.5 วิ · สลับ EN ใน Settings แล้วรีโหลด ต้องเป็นอังกฤษ
4. เข้าเกม: ดูภาพว่าง/กระพริบบนแผนที่, เปิดห้อง, เข้าศึก, เปิดคัตซีนพลัง, ย้ายโซน — ต้องไม่มี error ใน Console และไม่มีภาพหายถาวร
5. รีโหลดซ้ำ ต้องเข้าได้ใน ~4–5 วิ

## Rollback
`git revert -m 1 9d04ffa 7f7a2b0` (หรือ revert merge commit ที่รวม H1) แล้ว push · token cache-bust เป็นแบบต่อท้าย revert แล้ว token ถอยกลับเอง — ควรต่อท้าย `-h1r` ใน index.html/ui.js/CATALOG_VERSION เพื่อกัน cache เก่าค้าง
