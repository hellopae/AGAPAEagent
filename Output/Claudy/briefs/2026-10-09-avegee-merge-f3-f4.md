# ใบงาน (Dale): รีวิว + รวม Codex F3 (กระจก krajok) และ F4 (เฟรมฟันดาบ) เข้า main ของ AVEGEE แล้ว push

Repo: `/Users/agapae/agapae-work/AVEGEE` · main = 623ac69 (ฐานของทั้งสอง run)

## run ที่จะรวม
| งาน | run / branch | worktree | รายงาน |
|---|---|---|---|
| F3 กระจกหอส่องกรรม | `codex/20261009T112415Z-e04d8b76` | `/Users/agapae/agapae-work/.codex-worktrees/20261009T112415Z-e04d8b76` | `output/Codex/f3/REPORT.md` ใน worktree + `AGAPAE Agent/Output/Codex/runs/20261009T112415Z-e04d8b76/report.md` |
| F4 เฟรมฟันดาบ | `codex/20261009T112435Z-0435e8a0` | `/Users/agapae/agapae-work/.codex-worktrees/20261009T112435Z-0435e8a0` | `AGAPAE Agent/Output/Codex/runs/20261009T112435Z-0435e8a0/report.md` |
ใบงานต้นทาง: `AGAPAE Agent/Output/Claudy/briefs/2026-10-09-avegee-{f3-krajok-mirror-art,f4-sword-frames-art}.md`

⚠️ **ทั้งสอง run ยังไม่ commit** (งานค้างใน working tree) และ **F4 โครงสร้างแปลก**: ใน worktree มีโฟลเดอร์ซ้อน `avegee-f4/` (บอกว่าอยู่บน branch `codex/f4-sword-facing`) และ `avegee-repository` — ตรวจให้แน่ว่างานจริงอยู่ที่ไหน ก่อน commit ดู `diff.patch` / `diff-stat.txt` ในโฟลเดอร์ run ประกอบ
⚠️ **Codex เปิดเบราว์เซอร์ไม่ได้ทั้งสอง run** — ยังไม่มีใครเล่นจริง ต้องทดสอบใน Chrome จริงเอง

## ขั้นตอน
1. `git fetch` — main ต้องสะอาดและตรง origin · ไม่ตรง/ไม่สะอาด → หยุดแล้วรายงาน
2. รีวิวแต่ละ run ตามเกณฑ์รับงานในใบงานต้นทาง:
   - F3: ตรรกะ/มุมคำตอบมินิเกมไม่เปลี่ยน, พื้นหลัง 4 ห้องลบเฉพาะกระจก/ลำแสงที่วาดติด (ส่วนอื่นเหมือนเดิม — เทียบภาพก่อน/หลัง), บานหมุน ฐานนิ่ง, ลำแสงทอง
   - F4: เฟรม 1–6 ไม่เปลี่ยน, เฟรม 0/7 หันขวา ชุด/สีตรง, `FRAME_FACING_FIX` ถูกลบแถวที่มีภาพใหม่แล้ว, เวลา 580ms ไม่เปลี่ยน
   - ข้อเล็กแก้เองได้ · ข้อใหญ่ → ไม่ merge run นั้น เขียน FIX LIST
3. commit งานของแต่ละ run บน branch ของมัน (ไม่เอา `output/Codex/**` หลักฐานเข้า repo) แล้ว merge เข้า main ทีละอัน แก้ conflict (คาดว่าชนที่ cache version ใน `index.html`, `src/art.js`, `src/preload.js`)
4. **เพิ่ม i18n ที่ค้าง**: ข้อความไทยใน `src/mirror-charge.js` และส่วนที่เหลือใน `src/minigames/sala.js` (doc-rule, status, aria-label) → `src/i18n.js` TH/EN
5. cache-bust รอบเดียวหลังรวม (CSS/JS ที่แก้ใน `index.html`, manifest ใน `art.js`, `CATALOG_VERSION` ต่อท้าย)
6. `node --test tests/*.test.mjs` ผ่าน · `node --check src/*.js` · `git diff --check`
7. **เล่นจริงใน Chrome** 1280×800 และ 844×390:
   - ห้องหอส่องกรรม ≥2 โซน: วางกระจก หมุนได้ เติมพลังสำเร็จ (มุมคำตอบเดิม) ลำแสงทอง ไม่มีกระจก/ลำแสงเก่าค้างในพื้นหลัง · โหมด EN ข้อความเป็นอังกฤษ
   - ศึกฟันดาบ ชุด asia/west/cyberhell (ชุด th ด้วยถ้าทำได้): ยมบาทหันขวาตลอดท่า ไม่มีเฟรมกระโดด
   - ไม่มี pageerror/404 ใหม่ · เก็บภาพหน้าจอไว้นอก repo
8. push main → ยืนยัน GitHub Pages แสดงเวอร์ชันใหม่
9. ลบ worktree/branch ของสอง run ที่รวมแล้ว

## ข้อห้าม
- ไม่เปลี่ยนตัวเลขสมดุลเกม · ห้ามรัน `scripts/make-manifest.py` · ไม่แตะ `img/raw/`, `Exam/` · ไม่ rewrite history · ไม่ force push
- ไม่แตะ branch codex เก่า `codex/20261005T002509Z-e0a65816`

## เกณฑ์รับงาน
1. F3 และ F4 รวมเข้า main และ push แล้ว (หรือไม่รวมพร้อม FIX LIST)
2. เทสต์ผ่านครบ · เล่นจริงผ่านตามข้อ 7 · Pages แสดงเวอร์ชันใหม่
3. รายงาน `Output/Dale/2026-10-09-avegee-merge-f3-f4.md` (ใน repo AGAPAE Agent): ผลรีวิว / conflict / เวอร์ชันที่ bump / commit hash / ภาพหน้าจอที่ดู
