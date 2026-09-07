# ปลดระวางแอป AGAPAE Widget (macOS)

**วันที่:** 7 ก.ย. 2569 · **สั่งโดย:** Kittanate · **ทำโดย:** Dale (DevOps)

## ทำไม
เป้ไม่ได้เปิดแอปแล้วตั้งแต่ถอดฟีเจอร์ Office ออก — เก็บไว้ก็กินพื้นที่ 4.4 GB เฉย ๆ
(4.3 GB เป็น build cache ของ Rust) และต้อง maintain โค้ดสองที่ตลอด (เว็บ + แอป)

## ลบอะไรไปบ้าง
- `~/Documents/Work PAE/Claude/Widget/` — โฟลเดอร์โปรเจกต์ทั้งก้อน (ไม่ใช่ git repo)
- `/Applications/AGAPAE Widget.app` + backup อีก 2 ตัว (`.bak-20260826-1003`, `.bak-20260826-2353`)

คืนพื้นที่ได้ ~4.5 GB

## เก็บอะไรไว้
`2026-09-07-widget-source-archive.zip` (824 KB) — ซอร์สทั้งหมดที่ไม่ใช่ของ generate:
`src/` · `src-tauri/src` + `Cargo.toml/lock` + `tauri.conf.json` · `public/` · `Logo/` ·
`package.json` · `README.md` · เอกสารออกแบบของ Minnie/Reese

**ตัดออก** (สร้างใหม่ได้): `node_modules/` · `src-tauri/target/` · `src-tauri/icons/` +
`gen/` (สร้างจาก `Logo/` ด้วย `npx tauri icon`) · `dist/` · `evidence/` (สกรีนช็อต 13 MB)

รื้อกลับมา: แตก zip → `npm i` → `npx tauri icon Logo/<โลโก้>.png` → `npm run tauri build`

## ผลกระทบที่ต้องแก้ (แก้แล้ว)
การ์ด **Claude Limit** บน dashboard อ่าน Firestore `agents/claude_limit` ซึ่งมี 2 แหล่ง
และ `renderLimit()` เลือกตัวจากแอปก่อนเสมอ (`d.fiveHourPct != null`) — ถ้าลบแอปเฉย ๆ
ฟิลด์เก่าจะค้างใน Firestore แล้วการ์ดจะ **แช่ตัวเลขเดิมตลอดไป**

ย้าย logic ดึง usage จริงจากฝั่ง Rust มาไว้ที่ `scripts/push-limit.mjs` แทน:
- อ่าน OAuth token สดจาก Keychain (`Claude Code-credentials`) → `GET api.anthropic.com/api/oauth/usage`
  พร้อม `User-Agent: claude-code/<version>` (ขาดไม่ได้ ไม่งั้น 429)
- ได้ `five_hour` / `seven_day` utilization จริง → เขียนฟิลด์ชุดเดิมที่หน้าเว็บอ่านอยู่แล้ว
- ถ้าล้มเหลว ตกไปใช้ ccusage ประมาณการ **แล้วเซ็ตฟิลด์ตัวจริงเป็น null** เพื่อไม่ให้เว็บยึดเลขค้าง
- token อยู่ในหน่วยความจำอย่างเดียว ไม่ log ไม่เขียนไฟล์ ขึ้น Firestore เฉพาะ % + เวลารีเซ็ต

**ดีกว่าเดิม:** อัปเดตทุกครั้งที่ agent ทำงาน (hook) ไม่ต้องเปิดแอปค้างไว้อีกแล้ว

## ที่อื่นที่ไม่กระทบ
- คำศัพท์ (`known`/`custom`) — `vocab.html` บนเว็บ sync Firestore เองอยู่แล้ว
- สูตรเลเวล — เดิมก๊อปไว้ 2 ที่ (`index.html` + `Widget/src/levels.js`) ตอนนี้เหลือที่เดียว
