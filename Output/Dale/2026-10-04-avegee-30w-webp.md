# 30W — แปลง img/rooms-wide เป็น webp (Dale, 4 ต.ค. 2569) — PASS

Repo: `/Users/agapae/agapae-work/AVEGEE` · commit `1130713` (push main ปกติ ไม่ force)

## ตัวเลข
- ไฟล์: 36 ใบ (ไม่มีโฟลเดอร์ย่อย) PNG -> webp, ขนาด pixel เท่าเดิม 1716x917 ทุกใบ (assert ในสคริปต์)
- ก่อน 118.8 MB (MB หลักพัน; `du` 114 MiB) -> หลัง 19.3 MB (ลด ~84%)
- Pillow 12.3 `quality=86, method=6` · ต้นฉบับทุกใบเป็น RGB ไม่มี alpha จึงไม่ต้องคง alpha
- ดูตาเทียบ 4 ใบ (th-sala, asia-dab, west-lan, cyberhell-tarang) crop 500x300 ข้างกัน: ไม่เห็น artifact ชัด (mean abs diff ~4/255 จาก chroma subsampling ตามปกติ)

## ไฟล์ที่แก้ path
- `src/room-art-assets.js` — 36 บรรทัด `"image"` เปลี่ยน .png -> .webp
- `docs/room-art-handoff-2026-10-04.md` — ชื่อไฟล์ `<zone>-<station>.webp`
- ตรวจ `git grep` แล้ว: ไม่มีที่อ้างใน tests/, scripts, img/manifest.json (st-*.png เป็นไฟล์อื่น ไม่เกี่ยว)
- หมายเหตุ: ใบงานว่า "ยังไม่มีโค้ดเรียกใช้" — จริงๆ `room-art-assets.js` อ้าง path ครบ 36 ใบ แต่ยังไม่มีไฟล์อื่น import `WIDE_ROOM_ART` (มีแค่ docs พูดถึง) จึงไม่กระทบเกมที่รันอยู่

## ตรวจ
- `node --check src/*.js` ผ่านทุกไฟล์ · `node tests/*.test.mjs` 59 ไฟล์ exit 0 ทั้งหมด · `git diff --check` สะอาด
- Live (https://hellopae.github.io/AVEGEE): `/` 200, `/img/rooms-wide/th-sala.webp` 200 image/webp, `/src/room-art-assets.js` ใหม่ (webp 36 จุด), `.png` เก่า 404. ตรวจด้วย curl ไม่ได้เปิด browser จริง (gh ไม่ได้ login ดู Actions ไม่ได้)

## ขนาด .git
- ก่อน 611M -> ตอนนี้ 630M (pack 596 MiB; ขึ้นเพราะ webp ใหม่ 19 MB เข้า history ส่วน PNG เดิมยังค้าง ตามที่คาด)
- ยังไม่ลดเอง ตัวเลข ~800 MB ในรีวิวเดิมน่าจะนับ clone เก่า/loose objects; clone นี้ pack 596 MiB

## ทางเลือกลด history (ต้องให้คุณเป้ตัดสิน — ไม่ได้ทำ)
1. ไม่ทำอะไร — 630 MB ยังต่ำกว่าเพดานแนะนำของ GitHub (~1 GB-5 GB); ไม่เสี่ยง
2. `git filter-repo` ลบ `img/rooms-wide/*.png` ออกจาก history ทั้งหมด (3 commit ที่เกี่ยว) แล้ว force push — ลดได้ราว 100+ MB แต่เขียน history ใหม่: SHA เปลี่ยนทุก commit หลังจุดนั้น, worktree Codex/Toby (เช่น `toby-30b`) ต้อง rebase/clone ใหม่, ต้องหยุดงานทุก agent ก่อน
3. ถ้าจะทำ ควรรวมกับการล้างไฟล์หนักอื่นใน history ด้วย (Exam/*.ai, output/*.mp4 ฯลฯ — ยังไม่ได้ไล่ว่าตัวไหนหนักสุด) เพื่อให้คุ้มกับการ force push ครั้งเดียว
