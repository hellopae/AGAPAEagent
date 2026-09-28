# AVEGEE ชุด 16A — รีวิว + merge (Codex ทำ → หมดเวลา → Toby checkpoint → Dale รีวิว/merge)

**ผล: PASS — merge เข้า main แล้ว**

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`
ใบงาน: `Output/Claudy/briefs/2026-09-28-avegee-batch16a-gameplay.md`
รายงาน Toby: `Output/Toby/2026-09-28-avegee-batch16a-finish.md` + ภาพ `Output/Toby/2026-09-28-avegee-batch16a/` (21 ไฟล์)

## สิ่งที่ตรวจ

1. **อ่าน diff เต็ม** `git diff main...codex/20260928T083305Z-fbb41880` ทุกไฟล์ (`command-wheel.css`, `data.js`, `game.js`, `scene.js`, `ui.js`, `tests/batch16a.test.mjs`, `tests/scene-zones.test.mjs`) — อ่านทีละ hunk ไม่ข้าม
   - `command-wheel.css`: `.arena:has(.combat-wheel)` → `.arena.combat-arena` เปลี่ยนครบทั้ง 5 จุดในไฟล์ (grep ยืนยันไม่มี `:has(.combat-wheel)` เหลือ, ไม่มี `.combat-arena` ซ้ำจาก 16B) — ไม่ชนกับสิ่งที่ 16B เพิ่มในไฟล์เดียวกัน (16B แก้คนละ selector)
   - `scene.js` `drawStation`: จุด conflict เดียวที่ Toby merge ไว้ (`94fdc4a`) — ตรวจแล้วรวมทั้ง `drawBuilding(ctx, d, t, UI_SCALE_MAP)` ของ 16B และ label ซ่อมอาคารของ 16A ครบ ไม่ทิ้งฝั่งไหน
   - `ui.js`: diff เล็กจริง (+26/-13 บรรทัด) — `sideBody`/`openTrial` รวม ammo กระจก, `openDadPunish` ขยับ `.punish-yama`, `arena()` เปลี่ยนเป็น `.combat-arena`, `bagUseWhy`/`openBag` ล็อกปุ่มกระจก, `openStation` เพิ่มปุ่มซ่อม — ไม่แตะโค้ดของ 16B (ปุ่มศาล/PAUSE/bell) เลย
   - `game.js`: `stFree`, `powerReady`, `usePower`, `useItem`, `burnDown` (เปลี่ยนจาก "พังทั้งหลัง" เป็น "ใช้การไม่ได้ รอซ่อม"), `canRepair`, `repairStation`, `snapshot`/`restore` (ทั้งสองจุด — `stations:` และ `API.snapshot`/`API.restore`) ครบคู่ ไม่ตกหล่นฝั่งไหน
   - `index.html`, `src/preload.js`, `CONCEPT.md` — **ไม่มีอยู่ใน diff ของ branch เลย** (`git diff --name-only` ยืนยัน 7 ไฟล์เท่านั้น ตามที่ Toby รายงาน)
   - ไม่มี conflict marker เหลือค้าง, ไม่มี `alert(`/`confirm(`/`prompt(` ในดิฟทั้งหมด (grep ยืนยัน)
2. **เทสต์อัตโนมัติ** ในทั้ง worktree (ก่อน merge) และ repo หลัก (หลัง merge) — `node --test tests/*.test.mjs` → **49/49 ผ่านทั้งสองรอบ**
3. **เทสต์ภาพ/gameplay** — ไม่ได้ตั้ง Playwright ใหม่ (ไม่มี local install ใน repo, งดเสียเวลาตั้งเพิ่มเพราะ Toby ทดสอบคลิกจริงมาแล้วละเอียด 21 ภาพ) แทนที่ด้วยการตรวจโค้ด+ภาพหน้าจอของ Toby อย่างเจาะจง:
   - `03d-after-walk-to-frontier.png` / `03e-player-near-merchant.png` — ยืนยันด้วยตา: ประตูชายแดนอยู่ใต้บันได/สะพานกลางล่าง มียักษ์เขียวยืนข้าง ตรงม็อกอัป UI2 · พ่อค้ายืนริมท่าเรือซ้ายล่าง ไม่ตกน้ำ/ลาวา
   - `10d-battle-win-screen.png` — ยมน้อย (มงกุฎ) ยืนแยกจากคอลัมน์ยักษ์ทวารบาล+เพลิงทางซ้ายสุด ไม่ทับกัน
   - `11b-punish-cauldron-closeup.png` — ยมน้อยโผล่จากกระทะเห็นถึงไหล่/อก ขอบล่างตัวละครตัดพอดีขอบปากกระทะ ไม่จมเหลือแค่มงกุฎ
   - เซิร์ฟไฟล์จริงจาก worktree (`python3 -m http.server 8781`) ยืนยัน `index.html`/`src/ui.js`/`src/command-wheel.css` โหลดได้ 200 ก่อน merge

## เทียบเกณฑ์รับงาน (ใบงานข้อ 1-7)

1. ✅ ประตูชายแดนใต้สะพาน + พ่อค้าตำแหน่งเดิม เดินถึงจริง (pathfinding 103-134 step ตามรายงาน Toby) ไม่ตกลาวา
2. ✅ กระจกวิเศษบนแผนที่กดใช้ไม่ได้ (`disabled` + tooltip) ในห้องสอบสวนใช้ได้ปกติ — โค้ด `usePower`/`bagUseWhy`/`useItem` ล็อกไว้ 3 ชั้น
3. ✅ ซ่อมอาคาร: ปุ่มขึ้นเมื่อไล่เปรตแล้วเท่านั้น (`canRepair` เช็ค `!this.mobs.length`), ทัณฑ์เดินมาสลับท่าทำงานจนเสร็จ (`REPAIR_TIME = BUILD_TIME/2` = 2100ms, ฟรี), อาคารกลับปกติ (`fire=0`, ⚠ หาย, `stFree()` รับดวงได้อีก) · เซฟ/โหลดกลาง `repair`/`repairWait` ครบทั้งสองจุด (`snapshot`/`restore` และ `API.snapshot`/`API.restore`)
4. ✅ ชนะแล้วยมน้อยไม่ทับใคร — ต้นเหตุ `:has(.combat-wheel)` หลุดเงื่อนไขหลังชนะ แก้เป็น class ผูกกับ `hp` แทน
5. ✅ ยมน้อยในกระทะโผล่มากขึ้น (`top:35%;height:22%` แทน `top:47%;height:12%`) จุดเดียวในโค้ด (grep `punish-yama` ยืนยัน) ไม่มีหน้าต่างแบบอื่นต้องแก้ซ้ำ
6. ✅ เทสต์ 49/49 ผ่านทั้งก่อน/หลัง merge · diff `ui.js` เล็ก (+26/-13) · ไม่แตะ `index.html`/`preload.js`/`CONCEPT.md`/`files/`/`Exam/`/`output/`/`img/raw/*`
7. ✅ ไม่มี `alert`/`confirm`/`prompt` ในดิฟ

**ไม่มีข้อไหนต้อง FIX** — merge ตรงตามที่ Toby checkpoint ไว้ ไม่ได้แก้โค้ดเพิ่ม

## Merge

```
git merge --no-ff codex/20260928T083305Z-fbb41880
```
→ commit `f458636` (merge-of-merge, clean, ไม่มี conflict ใหม่ — conflict เดียวที่มี Toby แก้ไว้แล้วใน `94fdc4a` ก่อนส่งมา)
- Push แล้ว: `75d9ca9..f458636 main -> main` (`https://github.com/hellopae/AVEGEE.git`)
- ลบ worktree `.codex-worktrees/20260928T083305Z-fbb41880` + branch `codex/20260928T083305Z-fbb41880` แล้ว
- `git status` หลัง merge: เหลือเฉพาะของเดิมที่ไม่เกี่ยวกับงานนี้ (`CONCEPT.md` modified + `Exam/`, `files/`, `output/`, `img/scene-cyberhell.jpeg` untracked) — **ไม่แตะ** ตามคำสั่ง ไม่ใช่ของ branch นี้

## Live / วิธีเทสต์ต่อ

ไม่มี GitHub Pages deploy สำหรับ AVEGEE (repo นี้รันโลคัล) — เทสต์ผ่าน:
```bash
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
node --test tests/*.test.mjs   # ต้อง 49/49
python3 -m http.server 8777
open http://localhost:8777/index.html
```
เข้า console (`window.G`) fast-forward ตามที่ Toby ระบุไว้ในรายงานเพื่อดูสถานการณ์ซ่อมอาคาร/กระทะทองแดง

## Rollback

```bash
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
git revert -m 1 f458636   # หรือ git reset --hard 75d9ca9 แล้ว force-push (ต้องขออนุญาตก่อน)
```

## หมายเหตุถึง Claudy/คุณเป้

- "ทัณฑ์ติดงานอื่นอยู่" ตอนนี้เป็นแค่แจ้งเฉยๆ ไม่ใช่คิวจริง (ปุ่มซ่อม disabled พร้อมข้อความ) — Toby ตั้งข้อสังเกตไว้ว่าถ้าอยากเปลี่ยนเป็นระบบคิวจริงเป็นการตัดสินใจ UX เพิ่มเติม ไม่ใช่บั๊ก เห็นด้วยกับ Toby ว่าพอแล้วสำหรับ scope ชุดนี้
- ชุด 16A กับ 16B (ทั้งคู่แตะ `ui.js`/`command-wheel.css`/`scene.js`) รวมกันได้ราบรื่น ไม่มี regression ที่จุดใดของ 16B (ปุ่มศาล/เดินวาระ, PAUSE, UI scale, กระดิ่ง) จาก diff ที่ตรวจ — ไม่ได้ทดสอบ 16B ซ้ำเองเพราะอยู่นอกขอบเขตใบงานนี้ (มี `2026-09-28-avegee-batch16b-review.md` ของตัวเองแล้ว)
