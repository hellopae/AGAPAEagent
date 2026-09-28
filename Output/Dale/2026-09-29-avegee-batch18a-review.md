# Dale review — AVEGEE batch18A (Codex run `20260928T182708Z-0ef3c22c`)

**ผล: PASS — merge แล้ว push แล้ว ขึ้น Pages แล้ว**

- Merge commit: `7eaa41f` (บน `main`, ทับ `b013b8d` ที่เป็น merge ของ 18B ไปแล้ว)
- Codex commit ในโค้ด: `3c109ac` — ตอนตรวจ diff.patch ยังไม่ได้ commit ในเวิร์กทรี (สถานะไฟล์ staged อยู่แล้ว) Dale commit ให้เองก่อน merge
- Live URL: https://hellopae.github.io/AVEGEE/ (ตรวจ `img/ui/icon-door.png` ตอบ 200 หลัง push ~20 วินาที)
- worktree/branch ลบแล้ว (`git worktree remove --force` + `git branch -d`)

## ลำดับ merge กับ 18B

18B (run `20260928T182713Z-04b28b67`) merge เข้า main ไปก่อนแล้ว (`b013b8d`, พบตอน fetch ก่อน merge ของฉัน)
merge 18A ทับด้วย `git merge --no-ff codex/20260928T182708Z-0ef3c22c` — **auto-merge สำเร็จ ไม่มี conflict**
แม้ทั้งสองชุดแตะ `index.html`/`ui.js` เพราะคนละบรรทัด (18A แตะปุ่ม `#hud-zone` ท้ายแถบไอคอน + ป้ายสู้ 18B แตะโมดัล/overlay อื่น)
รันเทสต์ + เปิดเบราว์เซอร์ตรวจซ้ำบน `main` ที่ merge แล้วก่อน push — ไม่มีจุดที่ต้องแก้ conflict เพิ่ม

หมายเหตุ working tree ของ repo (นอกเหนือจาก merge): มี `CONCEPT.md` แก้ไม่ commit + ไฟล์ใหญ่ untracked
(`Exam/*.jpg`, `files/`, `img/scene-cyberhell.jpeg`, `output/audio`, `output/higgsfield/*`, `output/wallpapers`,
`output/zone-scenes`) ค้างอยู่ก่อนฉันเริ่มงาน — ไม่แตะ ไม่ commit ตามข้อห้ามใบงาน (ห้ามแตะ CONCEPT.md/files/img/scene-cyberhell.jpeg/output/
อยู่แล้ว) ยังค้างอยู่แบบเดิมหลัง push

## ตรวจเกณฑ์รับงาน 10 ข้อ (เบราว์เซอร์จริง Chromium ผ่าน Playwright 1440×810 ทุกโซน 1–4)

ใช้ `window.G` (game state ที่ `ui.js` expose ไว้อยู่แล้วเพื่อดีบัก) สั่งปลดล็อกโซน/บอส/level ตรง ๆ
แล้วกดปุ่มจริงในเบราว์เซอร์ (ไม่ใช่แค่เรียกฟังก์ชัน) เพื่อยืนยันพฤติกรรม UI จริง — ไม่มี `alert/confirm/prompt` โผล่เลยตลอดการทดสอบ

1. **แถววิญญาณกลางสะพาน** — ผ่านทั้ง 4 โซน เทียบภาพก่อน/หลัง คิวเรียงตรงกลางแนวบันไดสะพานพอดี (เดิมเบี้ยวซ้าย)
2. **สถานีใหญ่ขึ้น ไม่ทับทาง/NPC กดได้** — ผ่าน กระทะทองแดง/ป่าดาบ/สถานีอื่นใหญ่ขึ้นตามตาราง 15–30% ที่ Codex รายงาน
   ตรวจ hit-area ไม่ทับ merchant/queue/boss-pier ด้วยพิกัดจริง (ไม่มีจุดซ้อน) และ unit test `hitStation` ผ่านครบ 10 สถานี × 4 โซน
   **หมายเหตุคุณภาพภาพ (ไม่บล็อก merge):** ไฟล์ `img/st-dab.png` (ป่าดาบ) มีพื้นที่โปร่งใสด้านบนเยอะมาก
   (เนื้อภาพจริงอยู่แค่ 20% ล่างของไฟล์ 512×512) ทำให้ตอนขยายกล่องใหญ่ขึ้น ดาบดูเหมือนลอยห่างจากพื้นเล็กน้อย
   ไฟล์นี้อยู่นอกขอบเขตใบงาน (ห้ามแตะ `img/raw/*`, ไฟล์นี้เป็นไฟล์ derived) — ถ้าคุณเป้อยากให้เนียนขึ้นต้องให้ Mind/สคริปต์ crop ภาพต้นทางใหม่ ไม่ใช่งานของชุดนี้
3. **บอสโซน 1 ท่าเรือขวาล่าง** — ผ่าน ตั้ง `bossCleared.th` แล้วบอสไปยืนที่ท่าเรือขวาล่างจริง ป้าย "คุยกับยมราชพี่ใหญ่" ตามไปถูกจุด ไม่อยู่ในน้ำ
4. **พ่อค้าโซน 2 อยู่บนท่าเรือ (ทุกโซน)** — ผ่าน ตรวจภาพทั้ง 4 โซน พ่อค้ายืนบนท่าไม้ ไม่จมน้ำสักโซน
5. **ปุ่มประตูย้ายโซน** — ผ่าน ปุ่มอยู่ถัดจากไอคอนกระเป๋าจริง ซ่อนตอนย้ายโซนไม่ได้ โผล่ตอนปลดล็อกแล้ว
   **กดจริง (ไม่ใช่เรียกฟังก์ชัน) เปิดหน้าเลือกโซนสำเร็จจากทั้ง 4 โซน (th/asia/west/cyberhell)** — แก้บั๊กเดิมที่โซน 2–4 กดไม่ได้แล้วจริง
   สาเหตุเดิมตามที่ Codex อธิบาย (ปุ่มเก่าซ่อนจาก HUD ใหม่+ `refresh()` ไม่อัปเดตสถานะ) สมเหตุสมผล
6. **ปีศาจบุกต้องกดเข้าฉากต่อสู้เสมอ** — ผ่าน เดินเข้าใกล้ไม่จบเอง ป้ายเหนือหัว/ปุ่ม fab เหลือแค่ "⚔️ กดเพื่อเข้าสู้"
   ไม่มีข้อความลูกไฟบนแผนที่เหลือเลย กดปุ่มจริงแล้วเปิดฉากต่อสู้แบบผลัดกันตีสำเร็จ (`g.battle` ไม่ null หลังคลิก)
7. **grep `krasue`/กระสือ ไม่เหลือ + เซฟเก่าโหลดได้** — ผ่าน `rg 'krasue|กระสือ' src tests ASSET-PROMPTS.md` ว่างเปล่า
   unit test มี migration case ตรวจเซฟเก่าที่มี mob index ชนกระสือ (`kind:3`) แล้วโหลดสำเร็จ ไม่ล่ม
8. **ไอคอนทีมเหนือหัวนิรา ไม่ทับม้วนสำนวน** — ผ่าน ซูมดูจริง 👥 กับ 📜 วางเคียงกันห่างกันพอดี ไม่ซ้อน ทุกโซน
9. **BACKLOG.md อัปเดตครบ** — ผ่าน ตรวจ diff ตรงกับคำตอบคุณเป้ทุกข้อ (มินิเกมพักไว้รวมของตะราง/ประตูสวรรค์, มือถือหลัง Steam,
   กระสือตัดออก [x], CyberHell ปลดล็อกชนะบอสโซน 3 [x])
10. **เทสต์ผ่าน** — `node --test tests/*.test.mjs` บน `main` ที่ merge แล้ว = **54/54 ผ่าน**

## สิ่งที่ตรวจเพิ่มนอกเกณฑ์ (กันบั๊กแฝง)
- grep `MOB.throw`/`MOB.reach` ทั้ง repo — เหลือแค่ที่ยักษ์ทวารบาลใช้ (`game.js:1439`) ตามที่ใบงานอนุญาต ไม่มีจุดอื่นอ้างของที่ถูกลบ
- `fireAmmo` ยังทำงานถูกต้องในฉากต่อสู้ (ui.js battle choices) — ของบนแผนที่ถูกตัดแต่ในฉากสู้ไม่กระทบ ตรงตามใบงาน
- คลิกตัวปีศาจบนฉากโดยตรง (`onSceneClick` → `tryFight()`) พฤติกรรมเดียวกับปุ่ม fab — ไม่มีทางลัดเลี่ยงฉากต่อสู้เหลือ
- ไม่มีการแก้ `CONCEPT.md`, `files/`, `Exam/`, `output/`, `img/raw/*`, `img/scene-cyberhell.jpeg` ตามข้อห้าม (เช็ค `git diff --name-only` แล้ว)

## วิธีให้คุณเป้ลองเล่น
1. เปิด https://hellopae.github.io/AVEGEE/ (แนะนำล้าง cache หรือ hard-refresh ถ้าเคยเข้าเว็บนี้มาก่อนหน้านี้)
2. เริ่มเกมใหม่ → ดูแถววิญญาณกลางสะพาน, กระทะทองแดง/ป่าดาบใหญ่ขึ้น
3. เล่นจนบอสโซน 1 → ชนะแล้วดูบอสไปยืนท่าเรือขวาล่าง มีปุ่มประตูข้างกระเป๋าโผล่ กดย้ายโซนได้
4. เดินเข้าใกล้ปีศาจที่บุก → ต้องกดปุ่ม "⚔️ กดเพื่อเข้าสู้" เท่านั้นถึงจะสู้ เดินใกล้เฉย ๆ ไม่จบเอง
5. กดที่ตัวนิรา/ดูไอคอน 👥 ลอยเหนือหัวเธอ

## bgm-battle preload (งานเพิ่มระหว่างทาง — commit แยกบน main หลัง merge 18A)

คุณเป้สั่งเพิ่มระหว่างรีวิว: `audio/bgm-battle.mp3` (2.6MB, มากับ commit `fd1f705` ที่ merge ไปพร้อม 18B แล้ว)
เล่นไม่ทันจังหวะต่อสู้ครั้งแรก เพราะ `primeAudio()` เดิมไม่เคยรู้จัก `bgm-battle` ล่วงหน้า (`knownSrc()`
คืน `undefined` → ต้อง `await findSrc()` กลางฉากต่อสู้ หลุดจังหวะ user-gesture บน Brave + โหลด 2.6MB สด ๆ ตอนนั้น)

**แก้ (commit แยก `a45ed26` บน main, ไม่รวมกับ merge 18A):**
1. `src/sfx.js` — `primeAudio()` default keys เพิ่ม `'bgm-battle'` + เพิ่มฟังก์ชันใหม่ `warmBgmFile(key)`:
   ใช้ `requestIdleCallback` (fallback `setTimeout` 1.2s) รอจังหวะว่างจริง ๆ แล้วยิง `fetch(url, {cache:'force-cache'})`
   แบบ GET เต็ม (ไม่ใช่ HEAD) ดึงเนื้อไฟล์เข้า HTTP cache ล่วงหน้า — ไม่แตะ `<audio>` ตัวหลักที่เล่น bgm-zone อยู่เลย
2. `src/ui.js` — `primeAudio(['bgm-zone'])` → `primeAudio(['bgm-zone', 'bgm-battle'])` + เรียก `warmBgmFile('bgm-battle')`
   ต่อท้าย (หลัง prime เพลงหลักเสร็จ ไม่แย่งคิวกับ splash/title)

**ตรวจจริงบน https://hellopae.github.io/AVEGEE/ (Playwright, ไม่ใช่ localhost):**
- แท็บใหม่ → เข้าเกม → รอ 3 วิ (จังหวะ idle) → เห็น `GET audio/bgm-battle.mp3` ยิงไปแล้วตอบ 200 **ก่อน**เข้าฉากต่อสู้
- เข้าฉากต่อสู้ครั้งแรก (กด fab จริง) → `g.battle` เปิดสำเร็จ ไม่มี error/dialog ใน console
- `<audio>` ยิง GET ซ้ำตอนเริ่มเล่นจริง (206 partial ตามปกติของ media element) แต่บอดี้ไฟล์อยู่ใน HTTP cache แล้วจาก idle-fetch ก่อนหน้า — ไม่ใช่การโหลดสดครั้งแรก
- จบต่อสู้กลับ `bgm-zone` ใช้โค้ดเดิมที่ไม่ได้แตะ (`bgm(g.battle ? 'bgm-battle' : 'bgm-zone')` ใน `ui.js`) — ไม่ต้องแก้เพิ่ม
- `node --test tests/*.test.mjs` = 54/54 ผ่านหลังแก้

## Rollback
```
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
git revert a45ed26        # ถอยเฉพาะ fix bgm-battle preload
git revert -m 1 7eaa41f   # revert เฉพาะ merge 18A (ไม่กระทบ 18B ที่ b013b8d)
git push origin main
```
หรือกลับไป deploy commit `b013b8d` (18B) ตรง ๆ ถ้าต้องถอยแบบเร็วที่สุด: `git reset --hard b013b8d && git push --force origin main` (ใช้เฉพาะกรณีฉุกเฉิน ต้องแจ้งคุณเป้ก่อนเพราะเป็น force push)
