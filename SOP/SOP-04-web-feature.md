# SOP-04 — Web App Feature: จาก feature request ถึง production

> ใช้เมื่อโจทย์คือ web app / feature ใหม่ / แก้เว็บที่มีอยู่

## เลือก stack ให้ถูกก่อนเริ่ม (สำคัญที่สุด)

| กรณี | Stack |
|---|---|
| แก้/เพิ่มใน repo ที่มีอยู่ (14 โปรเจกต์ใน `Documents/Work PAE/Claude/`) | **Current**: Vite + React JSX, Firebase/Firestore + Firebase Auth, Tailwind v3 + Sarabun, deploy GitHub Pages |
| TANAPAT web app ตัวใหม่ | **Target**: React + TypeScript, Node.js + Express, PostgreSQL, Etsy/Gumroad API |

ห้ามผสม: อย่าเอา TypeScript ไปยัดใส่ repo เก่า อย่าใช้ Firebase ในโปรเจกต์ Target ใหม่

## Pipeline

```
Minnie (feature concepts) → Reese [Research] → Rae (UI copy ไทย)
→ Reese [Fact-check ถ้ามี claims] → Vera (wireframe/UX) → Mind (visual ถ้าต้องมี)
→ Dale (build + deploy) → Chris (QA functionality + ภาษา) → Nick (ตั้ง metric ติดตาม)
```

งานเล็ก (แก้ bug, ปรับ copy ปุ่มเดียว) ตัดเหลือ: `Dale → Chris` ได้ แต่ Chris ต้องตรวจเสมอ

## ขั้นตอนละเอียด

### ขั้น 1-2 — Minnie + Reese
- Minnie: feature concept + user story ("ใคร ทำอะไร เพื่ออะไร")
- Reese: คู่แข่งทำยังไง, user ไทยคาดหวังอะไร, ข้อจำกัดทางเทคนิคที่ควรรู้

### ขั้น 3 — Rae: UI Copy
- ทุก string ภาษาไทย: ปุ่ม, label, error message, empty state, คำแนะนำ
- Error message ต้องบอกวิธีแก้ ไม่ใช่แค่บอกว่าพัง
- Output: ตาราง key → ข้อความไทย → บริบทที่ใช้

### ขั้น 4 — Vera: UX Spec
- Mobile-first breakpoints, spacing scale, component layout
- **Thai text handling บังคับ**: line-height ≥1.6 สำหรับไทย, ห้าม truncate กลางคำ, ทดสอบ wrap
- User flow: ทุก state (loading / success / error / empty)

### ขั้น 5 — Dale: Build + Deploy
- ทำตาม Vera spec + Rae copy แบบไม่ด้นสด — อะไรที่ spec ไม่ระบุให้ถาม Claudy ก่อน
- Current stack: `npm run dev` (dev) / `npm run build` (ตรวจ build ผ่านก่อน push เสมอ)
- Deploy GitHub Pages: ดู SOP-07 §Pages gotchas (.nojekyll, branch source, vite `base`)
- Output: `Output/Dale/YYYY-MM-DD-<slug>-build.md` — สรุปสิ่งที่ทำ, URL, วิธีทดสอบ

### ขั้น 6 — Chris QA
- Functionality: ทุก flow ตาม Vera spec, edge cases, mobile
- ภาษาไทย render ถูก (font โหลด, ไม่มีสระลอย, ไม่ตัดคำผิด)
- ทดสอบบน URL จริงหลัง deploy ไม่ใช่แค่ localhost

### ขั้น 7 — Nick: Metrics
- นิยาม metric ความสำเร็จของ feature (การใช้งาน, conversion) + วิธีเก็บ
- บันทึกไว้ใน `Output/Nick/` เพื่อรีวิวย้อนหลัง

## กติกา repo

- อย่า commit ตรงเข้า main ของโปรเจกต์ลูกค้าที่ live อยู่โดยไม่ทดสอบ build
- ทุก repo ใหม่: ตั้ง `.nojekyll` ตั้งแต่ commit แรกถ้าจะ deploy Pages
- Secret/API key ห้ามอยู่ในโค้ด client เว้นแต่เป็น key ที่ออกแบบมาให้ public (เช่น Firebase web key)
