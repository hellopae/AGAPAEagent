# ใบงาน 29-M (Dale): AVEGEE — รีวิว + merge ชุด 29 (A → B → C → D)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ฐานทุก branch = main `e650294` · เทสต์ `node --test tests/*.test.mjs`
ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-03-avegee-29{a,b,c,d}-*.md` (อ่านเกณฑ์รับงานของแต่ละใบ) · ภาพประกอบ `Output/Claudy/briefs/assets/29/` (ในเครื่องเท่านั้น)

## ที่มาของแต่ละ branch
| ใบ | ที่อยู่โค้ด | รายงานผู้ทำ | หมายเหตุ |
|---|---|---|---|
| 29A | worktree `.codex-worktrees/20261003T094416Z-ba81ac59` (branch `codex/20261003T094416Z-ba81ac59`, staged ไม่ commit) | `<worktree>/output/Toby/2026-10-03-avegee-29a.md` | เทสต์ 246 ผ่าน (self-check) |
| 29B | ⚠️ **ไม่ได้อยู่ใน worktree ตรง ๆ** — Codex โดน sandbox ห้ามเขียน refs เลยสร้าง repo ซ้อน: `.codex-worktrees/20261003T094419Z-d3f706d4/avegee-29b/` (gitdir = `…/avegee-base.git`, branch `codex/20261003-29b`, แก้ค้างไม่ commit) | `.codex-worktrees/20261003T094419Z-d3f706d4/Output/Toby/2026-10-03-avegee-29b.md` | worktree ชั้นนอกมี `avegee-base.git/` + `avegee-29b` ถูก `git add -A` stage ไว้ = ขยะ **ห้าม merge branch ชั้นนอกตามที่เป็น** · ดึง diff จาก `git -C …/avegee-29b diff e650294` (+ไฟล์ใหม่ `src/proximity.js`, `tests/proximity29b.test.mjs`) ไปลงบน branch สะอาดจาก main · `Output/Codex/runs/20261003T094419Z-d3f706d4/status.json` ค้าง `running` → แก้เป็น `ready_for_review` |
| 29C | `.toby-worktrees/29c` branch `toby/29c` (commit แล้ว) | `Output/Toby/2026-10-03-avegee-29c.md` | รอ Toby เสร็จ |
| 29D | worktree `.codex-worktrees/20261003T094424Z-8b7b19ee` | `<worktree>/output/Toby/2026-10-03-avegee-29d.md` | 7 ภาพ (รวม `item-lotus.png` เพราะไม่มีไฟล์ดอกบัวเดิม) + manifest + `output/Toby/29d/*` หลักฐาน |

## ขั้นตอน
1. รีวิว diff ทีละใบตามเกณฑ์รับงานของใบนั้น (โค้ดอ่านได้, ไม่เกินขอบเขต/ข้อห้าม, เทสต์มีความหมาย)
2. merge ตามลำดับ **29A → 29B → 29C → 29D** บน main · conflict แก้เอง (คาดว่าชน `src/ui.js`, `src/i18n.js`, `src/game.js`) · หลังแต่ละ merge รันเทสต์ทั้งหมด
3. **ต่อสาย 29D ↔ 29B**: ใส่พิกัดจุดนั่งพัก/ทางออก/จุดเกิด (% ของภาพ) จากรายงาน 29D ลง config ทางออกของ 29B สำหรับฉากชาโซน 1, ชาโซน 2, ดงงิ้ว, ภายใน lokan-asia · ตรวจว่าปุ่ม "ออกไปแผนที่" ขึ้นตรงบันไดจริง · 29A ไอคอนดาบ/ดอกบัวต้องโชว์ภาพจริงแทน fallback
4. **ตรวจในเบราว์เซอร์** (Codex ตรวจไม่ได้เพราะ sandbox): 1280×800 และ 390×844 — ปุ่มตามระยะ 3 แบบ, ปุ่มซ่อมบนแผนที่ไม่ล้นจอ, หน้าสถานที่ไม่มี X, หน้าต่างของใหม่ (29A), หน้าต่างหยุดเกม, ฉาก 29C (ตะราง/ประตูสวรรค์/event ชายแดน) · เก็บภาพหน้าจอไว้ที่ `Output/Dale/29m-shots/` (ห้ามใส่ภาพเกมใน commit ของ AGAPAE Agent — repo นี้เผยแพร่)
5. ข้อเล็กแก้เอง · ข้อใหญ่ → FIX LIST ให้ Claudy (แก้ได้ 1 รอบ)
6. `node --check src/*.js` · `git diff --check` · push main ให้ live อัปเดต
7. **แก้ `scripts/openai-worker.py`** (AGAPAE Agent) 2 จุดที่ทำ 29B พัง:
   - `git()` ใช้ `text=True` → diff ที่มีไฟล์ไบนารีทำ `UnicodeDecodeError` → ใช้ `errors='replace'` หรือเก็บ patch เป็น bytes (`--binary`)
   - ถ้า save_diff พัง ต้องยังเขียน `status.json` ปิดงาน (ไม่ค้าง `running`)
   - เทสต์/รันแห้งให้เห็นว่าไม่พัง · commit แยกใน AGAPAE Agent
8. **ภาพหัวหน้า/บอสทุกโซน = ตามตารางนี้เท่านั้น** (คุณเป้ส่งภาพยืนยัน 3 ต.ค. 2569 — เป็นแหล่งความจริง)

   | โซน | หัวหน้าเรา (นั่งเก้าอี้บนแท่น ช่วยเรา) | บอสที่ต้องสู้ |
   |---|---|---|
   | 1 ไทย | `img/raw/hero-boss-profile.jpeg` (โปรไฟล์ มงกุฎทอง ผิวคล้ำ) · ตัวยืน/นั่ง = `img/hero-boss.png` ที่มีอยู่ | `img/zone-boss.png` (มงกุฎ เกราะดำแดง ถือหนังสือ+ดาบ) |
   | 2 บูรพา | `img/raw/Asia/hero-boss-asia.png` (หน้าแดงเคราดำ นั่งบัลลังก์ พื้นดำ) | `img/Asia/zone-boss-asia.png` = `Boss Zone2-asia.png` (นักรบเกราะเขียวถือโซ่) |
   | 3 ปัจฉิม | `img/West/hero-boss-west-v2.png` (ไวกิ้งเคราขาว มีกา) | `img/West/zone-boss-west.png` = `Boss Zone3-west.png` (เกราะดำเปลวฟ้า ถือลูกคิด+ม้วนคัมภีร์) |
   | 4 ไซเบอร์ | `img/CyberHell/hero-boss-cyberhell-v2.png` (เขาแดง บัลลังก์คริสตัลม่วง) | `img/CyberHell/zone-boss-cyberhell.png` = `Boss Zone4-cyberhell.png` (ผิวดำ ชุดน้ำตาล ถือลูกคิด+หนังสือ) |

   - โซน 3–4: คุณเป้ยืนยันว่า `zone-boss-west.png` = `Boss Zone3-west.png` และ `zone-boss-cyberhell.png` = `Boss Zone4-cyberhell.png` (ภาพเดียวกัน) → โค้ดคีย์ `zone-boss` ใช้ต่อได้ ไม่ต้อง alias · แค่ตรวจว่าโชว์ถูก (ถ้าไฟล์ไบต์ต่างกัน = รุ่นต่างกัน ให้รายงาน ไม่ต้องแก้) · โซน 2 ก็เช่นกัน: `Boss Zone2-asia.png` = `zone-boss-asia.png` (ภาพเดียวกัน คุณเป้ยืนยัน) → ไม่ต้อง alias แค่ตรวจว่าเกมโชว์นักรบโซ่
   - หัวหน้าโซน 2: ไฟล์ raw (พื้นดำ) กับ `img/Asia/hero-boss-asia.png` ที่ใช้อยู่อาจต่างกัน → ถ้าต่าง prep จาก raw ผ่าน `prep-art.py` (ลบพื้นดำ) แล้วแทน · หัวหน้าโซน 1: เทียบ `img/hero-boss-profile.png` กับ raw ถ้าต่าง prep ใหม่
   - ทุกจุดที่โชว์บอส (ฉากต่อสู้, ป้ายเตือนบอสมา `ui.js:1430`, เดินเข้าแผนที่ `scene.js:279`, `data.js:1607/1671`) = คอลัมน์ขวา · ทุกจุดที่โชว์หัวหน้า (เก้าอี้บนแท่น, หน้าลงทัณฑ์, โปรไฟล์ authority) = คอลัมน์กลาง
   - ภาพคัตซีนบอส (`*-cutscene.jpeg`) ไม่อยู่ในตาราง — ไม่ต้องแตะ แต่รายงานว่าคัตซีนแต่ละโซนเป็นคนเดียวกับบอสในตารางไหม

   **รายละเอียดเดิมของโซน 2 (ยังใช้):** บอสโซน 2 กับหัวหน้าโซน 2 ห้ามสลับกัน (คุณเป้ยืนยัน 3 ต.ค. 2569 พร้อมภาพ) — ทำหลัง merge 29D (manifest ชนกัน)
   - **บอสโซน 2 (ศัตรู)** = นักรบชุดเกราะเขียวถือโซ่ · ต้นฉบับ `img/raw/Asia/Boss Zone2-profile.jpeg`
   - **หัวหน้าโซน 2 (ฝ่ายเรา นั่งเก้าอี้ ช่วยเราเหมือน "พ่อ" พญายมในโซน 1)** = หน้าแดงเคราดำ หมวกขุนนาง ถือคทาหน้าคน · ต้นฉบับ `img/raw/Asia/hero-boss-asia-profile.jpeg` (มีใน `img/Asia/hero-boss-asia-profile.png` แล้ว)
   - ปัญหา: `ui.js:1394` (`openBossArrive`) ขอ `Boss Zone2-profile` แต่ไม่มีใน `img/`/manifest → ตกไปใช้ `Intro-Boss-Zone2` หรือ `hero-boss` (เสี่ยงโชว์หน้าหัวหน้าเราเป็นบอสศัตรู)
   - แก้: เตรียมภาพจาก raw ผ่าน `scripts/prep-art.py` (หรือขั้นตอนเดียวกับ `img/West/Boss Zone3-west-profile.png`) → `img/Asia/Boss Zone2-asia-profile.png` + เพิ่ม manifest ด้วยมือ (ห้าม make-manifest) · เทียบกับ `img/raw/_stray-20261003/Asia/Boss Zone2-asia-profile.png` ถ้าเป็นภาพเดียวกันที่ prep แล้ว ใช้ตัวนั้นได้
   - ไล่ทุกจุดที่โชว์บอสโซน 2 (คัตซีนมาถึง, ฉากต่อสู้, โปรไฟล์) → ต้องเป็นนักรบโซ่ · ทุกจุดที่โชว์หัวหน้าโซน 2 (`sp:'hero-boss'` ผ่าน `art.js` → `hero-boss-asia*`, แท่นตัดสิน, หน้าลงทัณฑ์) → ต้องเป็นหน้าแดง · เช็คโซน 3–4 แบบเดียวกัน
   - **หัวหน้าทุกโซน (พญายมโซน 1, หัวหน้าสาขาโซน 2–4 = `AUTHORITY` ใน data.js) นั่งเก้าอี้บนแท่นพิพากษา** (`SPOTS.throne`, `scene.js:393`) เหมือนกันทุกโซน — ตรวจว่าคนที่ขึ้นนั่งเก้าอี้เป็นหัวหน้าของโซนนั้น (`hero-boss-<zone>`) ไม่ใช่บอสศัตรู และนั่งตรงเก้าอี้ ไม่ลอย ทั้ง 4 โซน (ภาพหน้าจอทุกโซน)
   - เพิ่มเทสต์: ภาพบอสโซนกับภาพหัวหน้าโซนเป็นคนละไฟล์ทุกโซน และไฟล์มีจริงใน manifest
9. ล้าง worktree/branch ชุด 29 ที่ merge แล้ว — **ถ้า permission ปฏิเสธ หยุด รายงานคำสั่งให้ Claudy ห้ามอ้อม**

## ข้อห้าม
- ห้ามรัน `scripts/make-manifest.py` (ดึงไฟล์ stray) — manifest ให้รวมจาก 29D ด้วยมือ
- ไม่แตะ `img/raw/`, `Exam/`, `files/`, `output/` (นอกจากไฟล์ที่มาจาก branch), `CONCEPT.md`
- ไม่เปลี่ยนสมดุลตัวเลข

## เกณฑ์รับงาน
1. main มีงาน 29A–D ครบ · เทสต์ผ่านทั้งหมด · push แล้ว live อัปเดต
2. ตารางเกณฑ์ของ 29A/B/C/D แต่ละข้อ: ผ่าน / แก้แล้ว / ไม่ผ่าน (ระบุ) — จากการตรวจในเบราว์เซอร์จริง
3. พิกัดทางออก 29D ลง config แล้ว ปุ่มขึ้นตรงทางออกจริง
4. openai-worker.py ไม่พังกับไฟล์ไบนารี
5. ภาพหัวหน้า/บอสทั้ง 4 โซนตรงตารางข้อ 8 ทุกจุด · หัวหน้าทุกโซนนั่งเก้าอี้บนแท่น (ภาพหน้าจอ 4 โซน + เทสต์)
6. รายการ worktree ที่ลบ/ค้าง

## รายงาน
`Output/Dale/2026-10-03-avegee-29m.md` — commit hash main, ตารางเกณฑ์, FIX LIST (ถ้ามี), สิ่งที่คุณเป้ควรลองเล่นเอง
