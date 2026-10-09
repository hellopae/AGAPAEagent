# ใบงาน: รีวิวงาน Codex app ใน AVEGEE (8–9 ต.ค. 2569)

**เจ้าของ:** Dale (code review) · **ผู้สั่ง:** Claudy · **วันที่:** 2026-10-09

## บริบท
- คุณเป้ใช้แอป Codex (ChatGPT desktop) ทำงานใน AVEGEE ตรงๆ นอกระบบใบงาน แล้ว push ขึ้น `main` เอง
  ทั้งวาดรูปเพิ่มและแก้โค้ดบางส่วน คุณเป้ขอให้ "ลองตรวจสอบดู"
- Repo: `/Users/agapae/agapae-work/AVEGEE` — Claudy ดึง ff ลงมาแล้ว HEAD = `18f1b5b` working tree สะอาด
- เทสต์ฐาน: `node --test tests/*.test.mjs` → **534/534 ผ่าน** (ที่ 18f1b5b)
- ⚠️ แอป Codex ยังเปิดอยู่ (process ChatGPT/Codex Framework) — อาจกำลังทำงานต่อใน repo นี้

## ขอบเขต — 6 commit ที่ยังไม่มีใครรีวิว (Codex app ทำตรง ไม่มี run id)
| commit | เรื่อง | handoff doc |
|---|---|---|
| 330eb31 | เทวดาขอทานหน้าวัด + opening animation ต่อกัน | docs/claude-handoff-2026-10-08-beggar-intro.md |
| 4685942 | ห้องฝึกน้ำแข็ง, ระยะ station, ท่าเดิน | docs/claude-handoff-2026-10-08-ice-walking.md |
| 4695e82 | วิดีโอ ending panorama + พ่อยอมรับ | docs/claude-handoff-2026-10-08-ending-videos.md |
| 75df7ff | วิดีโอเทวดา/เนื้อเรื่อง + เส้นทาง frontier CyberHell | docs/claude-handoff-2026-10-08-{deva-videos-frontier-mask,additional-story-videos}.md |
| 4fb8340 | Zone 3 hypnosis story, มินิเกมกระจก (`src/mirror-charge.js`), compact room UI | docs/zone3-ui-update-2026-10-08.md |
| 18f1b5b | ปริศนาเลื่อนเอกสาร (`src/minigames/document-puzzle.js`) + รางวัล + ผังศาลา | docs/sala-document-puzzle-2026-10-08.md |

ดูภาพรวม: `git diff --stat 330eb31~1 18f1b5b` (มีไฟล์ภาพ/วิดีโอ ~20 ไฟล์)
แถม: ตรวจว่างานค้างใน `docs/claude-handoff-2026-10-07.md` (แก้ชุดภาพข่มขู่โซน 1/4) ปิดแล้วหรือยัง (น่าจะเป็น fc3647c)

## ขั้นตอน
1. อ่าน handoff doc แต่ละไฟล์ → อ่าน diff ของ commit นั้น
2. ตรวจ: บั๊ก logic, state/save ที่อาจพัง (โหลดเซฟเก่า), asset ที่อ้างแต่ไม่มีไฟล์ หรือมีไฟล์แต่ไม่อยู่ใน
   `img/manifest.json` / `img/preload-catalog.json` / `src/preload.js`, ขนาดไฟล์วิดีโอ/ภาพที่ใหญ่ผิดปกติ,
   cache-bust ใน `index.html`, เทสต์ที่ถูกแก้ให้ผ่านแบบหลวม (assert ถูกลดลง)
3. เช็คว่าทุก path ภาพ/วิดีโอที่โค้ดอ้างมีไฟล์จริง (เขียนสคริปต์สั้นๆ ได้)
4. รันเทสต์ทั้งชุดอีกรอบ
5. ถ้าสะดวก เปิดเกมใน browser (`launch.sh`) ดูมินิเกมใหม่ 2 ตัว + ending ว่าเข้าถึงได้และไม่มี console error

## ข้อห้าม
- **ห้ามแก้/commit/push/stash/reset ใน repo AVEGEE** — งานนี้คือ "ตรวจ" เท่านั้น (Codex app อาจทำงานอยู่)
- ห้ามสร้าง branch/worktree ใหม่ ถ้าต้องลองอะไรให้ทำใน scratch นอก repo
- ห้ามรีวิวภาพเชิงศิลป์ (สวย/ไม่สวย) — เช็คแค่ว่าเชื่อมกับโค้ดถูกและไฟล์ใช้ได้

## เกณฑ์รับงาน (ตอบ PASS หรือ FIX LIST เรียงเลข)
1. ไม่มีบั๊กที่ทำให้เกมค้าง/crash หรือเซฟเก่าโหลดไม่ได้
2. ทุก asset ที่โค้ดอ้างมีไฟล์จริง และลงทะเบียน preload ครบ
3. เทสต์ผ่านครบ และเทสต์ที่ถูกแก้ไม่ได้ถูกลด assert ไปแบบไม่มีเหตุผล
4. มินิเกมใหม่ 2 ตัว (กระจก, เลื่อนเอกสาร) จบได้จริง (มีทางชนะ ไม่ติด state)
5. งานค้างของ handoff 7 ต.ค. — ปิดแล้ว / ยังค้าง (ระบุ)

## ส่งผล
เขียนรายงานลง `Output/Dale/2026-10-09-avegee-review-codex-app-1008.md`
แต่ละข้อใน FIX LIST: ไฟล์:บรรทัด + อาการ + วิธีแก้ที่เสนอ (เพื่อให้คุณเป้ส่งต่อให้ Codex app แก้ได้ทันที)
