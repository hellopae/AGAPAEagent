# Repo Health Check — AGAPAE Agent
**ผู้ตรวจ:** Dale (DevOps) · **วันที่:** 6 ก.ค. 2026 · **Repo:** `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent` (branch `main`)

## สรุป Checklist

| # | รายการ | ผล | สรุปสั้น |
|---|--------|:--:|----------|
| 1 | `.nojekyll` ที่ root | ✅ | มีอยู่ (ไฟล์ว่าง 0 byte, สร้าง 5 ก.ค.) — ถูกต้องตามที่ Pages ต้องการ |
| 2 | Hook `scripts/hook-status.mjs` รันได้ไม่ crash | ✅ | `node --check` ผ่าน + รันจริงด้วย input ปลอดภัย exit 0 ทุกกรณี ไม่มี side effect |
| 3 | Dashboard บน GitHub Pages โหลดได้ | ✅ | HTTP/2 200, HTML เต็ม 50,318 bytes (ตรงกับ `index.html` local) ไม่ใช่หน้าเปล่า |
| 4 | Avatars ครบตาม `status.json` | ✅* | ไฟล์ avatar ครบทั้ง 11 agent — *แต่ `index.html` ไม่มี card ของ Dale (ดูประเด็นที่ควรแก้ ข้อ 1) |
| 5 | โบนัส: git remote + hooks ใน settings | ✅ | remote ถูกต้อง, PreToolUse/PostToolUse ครบทั้งคู่, local sync กับ origin (0/0) |

## รายละเอียดต่อข้อ

### 1. `.nojekyll` — ✅
- พบที่ root ของ repo: `-rw-r--r-- 0 byte, Jul 5 00:03`
- ตรงตาม fix ใน reference (กัน Pages ประมวลผลผ่าน Jekyll แล้วหน้าขาว/ค้าง)

### 2. Hook `scripts/hook-status.mjs` — ✅
**วิธีทดสอบ (ระบุตามที่สั่ง):** อ่านโค้ดก่อน พบว่า hook อ่าน JSON event จาก stdin แล้วดู `tool_input.subagent_type` เทียบกับ `MAP` (บรรทัด 20-32) — ถ้าไม่อยู่ใน MAP จะ `process.exit(0)` ทันทีที่บรรทัด 42 **ก่อน**ถึงโค้ดที่เขียน `status.json`/`worklog.json`, ยิง Firestore, หรือ git push ทั้งหมด จึงทดสอบแบบไร้ side effect ได้ ดังนี้:

| การทดสอบ | คำสั่ง | ผล |
|---|---|---|
| Syntax check | `node --check scripts/hook-status.mjs` | ผ่าน |
| โหมด `start` + subagent_type นอก MAP | `echo '{"tool_input":{"subagent_type":"__healthcheck-not-in-map__"}}' \| node scripts/hook-status.mjs start` | exit 0 |
| โหมด `done` + subagent_type นอก MAP | เช่นเดียวกัน โหมด `done` | exit 0 |
| stdin ไม่ใช่ JSON | `echo 'not-json' \| node scripts/hook-status.mjs start` | exit 0 (ไม่ crash) |

**ยืนยันไม่มี side effect:** mtime ของ `status.json` และ `worklog.json` ยังเป็น `Jul 6 11:23:12` (ก่อนทดสอบ) และ `git status` ของสองไฟล์นี้สะอาด ไม่มี commit/push ใหม่เกิดขึ้น

**ข้อสังเกตจากการอ่านโค้ด:** MAP ครอบคลุม agent ครบ 11 ตัว (รวม `dale-devops`, `mind-visual`, `libby-index`) และ error handling ครอบทุกจุด (try/catch + exit 0) — hook จะไม่ block Task ของ Claude Code แม้พังกลางทาง

### 3. Dashboard GitHub Pages — ✅
- `curl -sI https://hellopae.github.io/AGAPAEagent/` → **HTTP/2 200**, `content-type: text/html; charset=utf-8`, `last-modified: Mon, 06 Jul 2026 04:24:20 GMT` (= 11:24 น. ไทย ตรงกับ commit ล่าสุดช่วง 11:23)
- Body เป็น HTML เต็ม: `<title>AGAPAE AI Studio — Team Console</title>` + CSS/JS ครบ ขนาด **50,318 bytes** เท่ากับ `index.html` ใน repo พอดี → เวอร์ชันบน Pages เป็นเวอร์ชันล่าสุด ไม่ใช่หน้าเปล่า

### 4. Avatars — ✅ (ไฟล์ครบ) / ⚠️ (การใช้งานใน dashboard)
Agents ใน `status.json` (11 ตัว): claudy, minnie, reese, rae, vera, mind, chris, libby, nick, dale, news

ไฟล์ใน `avatars/`: Claudy.png, Minnie.png, Reese.png, Rae.png, Vera.png, Mind.png, Chris.png, Libby.png, Nick.png, **Dale.png**, News.png + Logo-Agapae.jpg → **ครบทั้ง 11 ตัว ไม่มีตัวขาด**

**แต่:** `index.html` อ้างถึง avatar เพียง 10 ตัว — ไม่มี `avatars/Dale.png` และ grep คำว่า "dale" ใน `index.html` ไม่พบเลย ขณะที่ agent อื่นถูก hardcode ไว้ครบ → **Dale ไม่มี card บน dashboard** (hook อัปเดต status/worklog ของ dale ได้ปกติ แต่หน้าเว็บไม่แสดง)

### 5. โบนัส: git + settings — ✅
- `git remote -v`: `origin https://github.com/hellopae/AGAPAEagent.git` (fetch/push) — ถูกต้อง ตรงกับ URL Pages
- Local `main` ตรงกับ `origin/main` พอดี (ahead 0 / behind 0)
- `.claude/settings.json`: มี hook ครบทั้ง **PreToolUse** (matcher `Task` → `hook-status.mjs start`, timeout 10) และ **PostToolUse** (matcher `Task` → `hook-status.mjs done`, timeout 30) — path เป็น absolute ถูกต้อง

## ประเด็นที่ควรแก้

1. **Dale ไม่มี card ใน `index.html`** — **แก้แล้ว 6 ก.ค. 2569 — เพิ่ม card ใน index.html** (Claudy อนุมัติเป็นงานต่อเนื่อง): แทรก entry `dale` ใน array `SEED_AGENTS` ระหว่าง `nick` กับ `news` (ท้ายกลุ่ม standalone, ลำดับตรงกับ status.json) — role "DevOps & Technical Infrastructure", img `avatars/Dale.png`, persona/caps/what สอดคล้อง status.json · ตรวจแล้ว: `node --check` ผ่านทั้ง 2 `<script>` block, diff = insert 5 บรรทัดจุดเดียว ไม่แตะส่วนอื่น · ยังไม่ commit — รอ Claudy รวบ commit/push ทีเดียว
2. **Working tree ไม่สะอาด** — `Output/Rae/2026-07-06-5-print-mistakes-article-v3.md` ถูก modified ค้างอยู่โดยยังไม่ commit ตามกฎ CLAUDE.md ข้อ 7 ควร commit+push (หรือใช้ skill `worklog-sync`) — ไม่ได้แก้เองเพราะเกินขอบเขตงานนี้
3. **(ข้อสังเกต ไม่เร่งด่วน)** Firebase web API key hardcode อยู่ใน `scripts/hook-status.mjs` บรรทัด 17 — เป็น key ประเภท public-by-design ตามกฎ Dale ยอมรับได้ แต่การเขียน Firestore ผ่าน REST แบบไม่มี auth แปลว่าความปลอดภัยพึ่ง Firestore Security Rules ล้วน ๆ ควรยืนยันว่า rules จำกัด write เฉพาะ collection `agents` และพิจารณาเพิ่ม validation ในอนาคต

## วิธีตรวจซ้ำ (verify)
```bash
cd "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent"
ls .nojekyll
node --check scripts/hook-status.mjs
echo '{"tool_input":{"subagent_type":"x"}}' | node scripts/hook-status.mjs start; echo $?
curl -sI https://hellopae.github.io/AGAPAEagent/ | head -3
grep -c "avatars/Dale.png" index.html   # ต้องได้ 1 (แก้ประเด็นข้อ 1 แล้ว 6 ก.ค. 2569)
```
