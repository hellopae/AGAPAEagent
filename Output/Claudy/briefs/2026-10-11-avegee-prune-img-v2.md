# ใบงาน: AVEGEE — ตัดภาพ/วิดีโอที่ไม่ได้ใช้ใน img/ (รอบ 2 — รอบแก้สุดท้าย)

- วันที่: 11 ต.ค. 2569 · ผู้ทำ: Codex (`--write`) · ผู้ตรวจ: Dale · ฐาน: main หลัง merge รอบแรก (มี `scripts/find-unused-assets.mjs` แล้ว)
- ใบงานรอบแรก: `2026-10-11-avegee-prune-unused.md` · รายงานรอบแรก: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-11-prune/REPORT.md`

## ปัญหารอบแรก
ลดได้แค่ 5.7 MB เพราะสแกนเนอร์ถือว่า "มีชื่อใน `img/manifest.json` / `preload-catalog.json`" และ "มีโค้ด `'img/' + path` / generic `artUrl`"
= คุ้มครองทั้ง `img/` → ไม่มีภาพถูกตัดเลย · runtime ยัง ~526 MB (เพดาน itch.io HTML5 500 MB)
**manifest/catalog เป็นแค่รายการไฟล์ที่มี ไม่ใช่หลักฐานว่าเกมใช้**

## วิธีรอบนี้: ไล่จาก "key ที่โค้ดเรียกจริง" ไม่ใช่จาก manifest
1. หาทุกจุดที่โค้ดเรียกภาพ: `artUrl(...)`, `heroFace/heroAtk`, `art.js` resolver, string literal `img/...`, template string, ข้อมูลใน `src/data.js` / ไฟล์ข้อมูลอื่น (sp, art, video, image, poster, bg ฯลฯ)
2. อ่าน **วิธีที่ resolver แปลง key → ไฟล์** (`src/art.js` + manifest) แล้วจำลองให้ได้ชุดไฟล์ที่ถูกเลือกจริงสำหรับทุกโซน/ชุด/ท่า
   (ขยายตัวแปร zone ∈ th/asia/west/cyberhell, outfit, suffix -L/-R/-atk/-cry/-walk ฯลฯ ตามที่โค้ดใช้จริง)
3. ไฟล์ที่อยู่ใน manifest แต่ไม่มี key ไหน resolve ไปถึง = candidate · **เคสรุ่นเก่า** (เช่น `cover-v3/v5`, `home-intro-v5.mp4`, `intro-opening-v2.mp4`, `*-v1` ที่มี `*-v2` ใช้แทน) ต้องยืนยันว่า resolver เลือกรุ่นใหม่เสมอ
   (ระวัง fallback list เช่น ui.js `['img/cover-v5.webp','img/cover-v4.webp',...]` — fallback ที่ยังอยู่ในโค้ดถือว่าใช้ ถ้าจะลบต้องลบ fallback นั้นด้วยและแสดงเหตุผล)
4. **ตรวจขณะรันจริง (สำคัญที่สุด)**: เปิดเกมด้วย headless browser (Playwright ถ้ามี) เดินเส้นทางหลัก: หน้า Home → เริ่มเกม → แผนที่ 4 โซน → ห้องต่างๆ → ฉากต่อสู้ → ฉากชายแดน · บันทึกทุก request ที่ขึ้นต้น `img/` `audio/`
   ไฟล์ที่ถูกโหลดขณะรัน **ห้ามลบเด็ดขาด** · ถ้าเปิด browser ไม่ได้ ให้บอกในรายงานและลบเฉพาะกลุ่มที่พิสูจน์ด้วยข้อ 1–3 ได้ชัด
5. ไฟล์ที่ branch `origin/codex-app/2026-10-04` อ้างถึง **แต่ main เลิกใช้แล้ว** (branch นั้นเก่ากว่า main) ไม่ต้องคุ้มครอง — ยกเว้นไฟล์ที่เพิ่งเพิ่มใน branch นั้นและยังไม่เข้า main
6. ต้นฉบับที่ `scripts/` อ่าน (เช่น `cover-v4-full.png`, `yama-sword-v2/*`) **ย้าย** ไปไว้ `art-src/` ที่ root (ไม่ใช่ลบ) แล้วแก้ path ในสคริปต์ — เพื่อให้ตัดออกจากชุด itch.io ได้ง่าย
7. ลบ entry ที่ชี้ไฟล์ที่ลบใน manifest/preload-catalog (ใช้สคริปต์ generate เดิมถ้ามี)

## ข้อห้าม
- ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` และ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE-reference`
- ห้ามแปลง/บีบอัดภาพในรอบนี้ (แค่ลบไฟล์ที่ไม่ใช้) · ห้าม commit/merge/push
- รายงาน: ถ้าเขียน path นอก worktree ไม่ได้ ให้ใส่เนื้อหาเต็มใน `report.md` ของ run (อย่าเขียนไว้ใน /tmp)

## เกณฑ์รับงาน
1. ตารางไฟล์ที่ลบ: path, ขนาด, หลักฐาน (resolver ไม่เลือก + ไม่ถูกโหลดขณะรัน + ไฟล์ที่ใช้แทน)
2. ขนาด runtime ก่อน/หลัง (ไฟล์, MB) · เทียบเพดาน itch.io
3. รายการ request ที่โหลดขณะรันจริง (สรุปจำนวน) และ 0 รายการถูกลบ
4. `node --test tests/*.test.mjs` ผ่านหมด
