# 28-0 AVEGEE — commit งาน Codex app (เนื้อเรื่องบอส / ฉากจบ / หัวหน้าถูกสิง)

**Commit:** `f075d79` บน main (parent `250b39e`) · push แล้ว · Pages: https://hellopae.github.io/AVEGEE/
**ผล:** PASS ตามเกณฑ์ทั้ง 5 ข้อ (มีข้อสังเกตด้านล่าง 2 ข้อ)

## สิ่งที่ commit (45 ไฟล์, +494/−78)
- โค้ด M 12 ไฟล์: `index.html`, `src/{art,data,game,scene,ui}.js`, `img/manifest.json`, เทสต์ 5 ไฟล์เดิม
- โค้ดใหม่: `src/story.js`, `tests/story-art.test.mjs`, `tests/boss-story.test.mjs` (ใบงานไม่ได้ระบุไฟล์นี้ แต่เป็นเทสต์ของงานเดียวกัน จึงรวมไว้)
- ภาพ 30 ไฟล์ (add ทีละ path ไม่ใช้ -A):
  - panel เนื้อเรื่อง 17: `story-th-01..05`, `story-asia-01..04`, `story-asia-05-v2`, `story-west-01..02`, `story-cyberhell-01-v2`, `-02-v2`, `-03-v3`, `story-ending-01-v4`, `story-ending-02-v3`
  - sprite 12: `leader-{th,asia,west,cyberhell}-possessed`, `mob-cyber-{guard,lancer,brute}` + สำเนา `CyberHell/mob-cyber-*-cyberhell` (3), `CyberHell/hero-boss-cyberhell`, `West/hero-boss-west`
  - `img/hero-boss-cutscene.jpeg` (169KB) — `game.js` bossScenes อ้างแต่ยัง untracked อยู่

## ภาพที่ย่อ (รวมก่อน 47MB → หลัง ~9MB)
- panel 16:9: ย่อเหลือกว้าง 1280 + quantize 256 สี (MEDIANCUT ไม่ dither) → 380–477KB (เดิม 1.7–2.5MB)
- panel จัตุรัส 1254²: ย่อ 1024² + 256 สี → 320–450KB
- sprite RGBA 12 ไฟล์: ผ่าน `prep()` ของ `scripts/prep-art.py` (ตัดขอบใส, 512×512 ชิดล่าง, 96 สี, คง alpha) → 153–298KB
- ตรวจด้วยตาเทียบก่อน/หลัง (sprite 4 ตัว + panel 3 ใบ) ไม่เห็นความเสียหาย; ต้นฉบับเต็มเก็บไว้ที่ scratchpad ของเซสชัน และใน `~/.codex/generated_images/` (path อยู่ใน `output/*/prompts.json`)
- **ไม่ commit** (ไม่ถูกอ้าง): `story-*-v1/v2/v3` เวอร์ชันเก่า (`story-asia-05`, `story-cyberhell-01/02/03`, `-03-v2`, `story-ending-01/-v2/-v3`, `-02/-v2`), `scene-asia-v1`, `*-cutscene-<zone>.png`, `boss-*-cutscene.jpeg` ฯลฯ, icon/button/logo, `Exam/`, `files/`, `output/`

## ตารางเกณฑ์รับงาน
| # | เกณฑ์ | ผล |
|---|---|---|
| 1 | ภาพที่โค้ดอ้างอยู่ใน commit ครบ ไม่มี 404 | PASS — สคริปต์ตรวจ manifest 427 รายการ + literal `img/...` ใน src/index.html: ไม่เหลือที่ untracked; live ตอบ 200 ครบ 30 ไฟล์ + `src/story.js` |
| 2 | manifest ไม่มีรายการที่ไม่อยู่ใน git | PASS — 0 รายการขาด |
| 3 | เทสต์ผ่านทั้งหมด | PASS — `node --test tests/*.test.mjs` 177/177 (รันหลังย่อภาพแล้ว) · `node --check src/*.js` ผ่าน · `git diff --check` สะอาด · โปรเจกต์ไม่มี package.json (static) จึงไม่มี build |
| 4 | `git status` ไม่มี M ค้าง | PASS |
| 5 | ลิสต์ 4 jobs ที่ค้าง | ดูด้านล่าง |

## 4 jobs ที่ค้าง (`output/leaders/perspective-edits.json`) — ให้ Codex ทำต่อหลัง 15:03
ยังไม่มีไฟล์ปลายทาง และโค้ดยังไม่อ้าง (ไม่กระทบเกม):
1. `hero-boss-west-v2` → `img/West/hero-boss-west-v2.png` (alpha) — redraw ผู้ปกครองปัจฉิมนั่งบัลลังก์ให้สัดส่วน chibi หัวใหญ่ตัวสั้นเท่า hero-boss / hero-boss-asia
2. `cyberhell-02-v3` → `img/story-cyberhell-02-v3.png` — ผู้ถูกควบคุมทั้งสี่นั่งกับพื้น ไม่มีเก้าอี้ + แก้มุมกล้อง eye-level เดียว
3. `cyberhell-03-v4` → `img/story-cyberhell-03-v4.png` — แก้มุมกล้อง/สเกลพื้นหลังของฉากสู้กับผู้ตรวจการ
4. `hero-boss-cyberhell-v2` → `img/CyberHell/hero-boss-cyberhell-v2.png` (alpha) — redraw หัวหน้านรกเครือข่ายให้สัดส่วน chibi (ต้องหลัง job 1 เพราะใช้ `hero-boss-west-v2` เป็น ref)
เมื่อได้ไฟล์: ผ่าน prep แบบเดียวกัน (panel ≤1280 + 256 สี / sprite ผ่าน prep-art), ปรับ `story.js`/manifest ให้ชี้ไฟล์ใหม่, เทสต์ `story-art.test.mjs` นับ panel = 17 ต้องคงไว้

## ข้อสังเกต (ไม่ได้แก้ — นอกขอบเขต/เดิมอยู่ก่อน)
1. `src/game.js` (~2655) fallback ท่าไม้ตายของ boss ใน zoneEvent ยังชี้ `img/raw/...-cutscene.jpeg` ซึ่งเป็น gitignored → 404 บน live. มีอยู่ก่อนงานนี้ (HEAD เดิมมีบรรทัดเดียวกัน, เทสต์ `new-battle-abilities` ยืนยัน path นี้) แต่ตอนนี้ `boss-frontier-th` เป็น `boss:true` ในโซน 1 จึงเข้าเส้นทางนี้เมื่อ HP ≤ 50%. ไฟล์ปลายทางที่ใกล้เคียงมีอยู่แต่ untracked (`img/boss-frontier-th-cutscene.jpeg`, `img/boss-tester-th-cutscene.jpeg` และ `img/<Zone>/boss-*-<zone>-cutscene-<zone>.png`). แนะนำให้ Claudy ออกใบงานเล็กแก้ path + commit ภาพเหล่านั้น (ต้องแก้เทสต์ที่ assert path เดิมด้วย)
2. save เก่าปลอดภัย: `restore()` ใช้ `d.storyQueue || []` ฯลฯ

## วิธีตรวจ (Chris/Claudy)
เปิด https://hellopae.github.io/AVEGEE/ (hard refresh) → เล่นถึงคดี 10 โซน 1 → พี่ใหญ่ → panel 5 ใบ + popup พลัง; โซน 4 คดี 10 → 8 waves มี rest 2 จุด; ชนะ → ฉากจบ 2 ใบ. ภาพต้องขึ้นครบ ไม่มี broken image

## Rollback
`cd AVEGEE && git revert f075d79 && git push` (ภาพทั้งหมดเป็นไฟล์ใหม่ จึง revert สะอาด; manifest กลับค่าเดิม)
