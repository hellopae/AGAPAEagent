# แท็บ "Meeting" บน AGAPAE Dashboard — UX Specification

- **Agent:** Vera (UX / Experience Design)
- **วันที่:** 31 กรกฎาคม 2026
- **ผู้รับมอบ:** **Dale** (implement ใน `index.html`) · Chris (QA) · Libby (โครงไฟล์ข้อมูล)
- **ขอบเขต:** โครงแท็บ, layout 2 ระดับ, CSS class ใหม่, จุดแก้ใน `index.html` (ระบุเลขบรรทัด), responsive, schema ที่เสนอปรับ
- **ไม่รวม:** การเขียนสคริปต์สกัดบันทึกประชุมจากไฟล์ `.md` (นั่นเป็นงาน pipeline ไม่ใช่ UX) — spec นี้บอกแค่ว่า **หน้าเว็บต้องการข้อมูลหน้าตาแบบไหน**
- **ข้อจำกัดที่ยึด:** ห้ามแก้ `index.html` เอง เอกสารนี้เป็น spec ล้วน

---

## 0) STEP 0 — Asset Inventory (สำรวจของจริงก่อนออกแบบ ตาม SOP-10)

อ่านของจริงทุกไฟล์ก่อนวางเลย์เอาต์ ไม่ได้ออกแบบจากความจำ

| ของต้นทาง | สิ่งที่พบจริง | ผลต่อการออกแบบ |
|---|---|---|
| `index.html` (1,597 บรรทัด) | หน้าเดียวจบ ไม่มี build step ไม่มี framework — HTML + CSS ใน `<style>` + vanilla JS 2 ก้อน (ก้อนหลัง = Firebase compat) | แท็บใหม่ต้องเขียนด้วย vanilla JS + template string เหมือนเดิม ห้ามลาก library เข้ามา |
| ตัวแปรสี `:root` L11–39 | `--paper #F4F2EE` · `--paper-2 #FCFBF8` · `--card #FFF` · `--ink #1B1C20` · `--ink-soft #56565E` · `--ink-faint #97969C` · `--line #E5E2DB` · `--line-strong #D2CEC4` · `--gold #9A7B4F` · `--done #5E7A66` · `--flagged #7A4A3A` · `--working #3E5366` | **ไม่ต้องเพิ่มตัวแปรสีใหม่แม้แต่ตัวเดียว** — `--flagged` คือสีของ "ความเห็นต่าง" ได้พอดี |
| สี pipeline L29–34 | `--c-orch` `--c-content` `--c-design` `--c-quality` `--c-standalone` `--c-news` | ใช้เป็นสีประจำตัว agent ในบันทึกประชุม (Minnie=content, Dale/Nick=standalone) |
| ฟอนต์ L9, L43 | Space Grotesk (หัว/ตัวเลข) + IBM Plex Mono (meta/label) + Noto Sans Thai (เนื้อความไทย) | เนื้อความประชุมเป็นไทยล้วน → ต้องบังคับ `"Noto Sans Thai"` มาก่อนในทุก class ที่มีเนื้อความ |
| แท็บ L504–517 | `.view-nav` → `.view-tab[data-v]` 4 ปุ่ม เรียก `switchView(v)` | แท็บที่ 5 ต่อท้ายได้ตรง ๆ ไม่ต้องรื้อ |
| `switchView()` L1106–1116 | ซ่อน/โชว์ `#consoleView #widgetsView #financeView #todoView` ด้วย `style.display` + `window.scrollTo(0,0)` | เพิ่ม 1 บรรทัด + 1 เงื่อนไข render |
| Work Log L600–619 + L1275–1352 | อยู่ **ใน** Console (พับเก็บได้) · `wlEntryHTML()` render: avatar 30px + ชื่อ + badge + เวลา + title + summary + tag | โครงการ์ดของ Meeting จะยืมสัดส่วนนี้มาให้หน้าตาเป็นพี่น้องกัน |
| merge worklog L807–819 | `WL_JSON` (จาก `worklog.json`) + `WL_FS` (Firestore `agents/worklog`) → dedupe ด้วย `id` → sort `datetime` ใหม่→เก่า | Meeting **ไม่ต้อง** ใช้ real-time (เหตุผลใน §7) |
| `worklog.json` | 95 entries · **entry ล่าสุด 29 ก.ค. 2569** | ยืนยันปัญหาจริง: งาน MiroFish 30 ก.ค. **ไม่มีใน Work Log เลยแม้แต่บรรทัดเดียว** — ไม่ใช่แค่ "เนื้อหาหาย" แต่ "ทั้งงานหาย" |
| `todo.json` / `renderTodo()` L1430–1477 | pattern มาตรฐานของแท็บที่โหลดจากไฟล์ JSON: `loadX()` → `renderX()` → escape ด้วย `TD_ESC` (L1384) | **ทำตาม pattern นี้เป๊ะ ๆ** — `meetings.json` + `loadMeetings()` + `renderMeeting()` |
| `avatars/` | มีจริง 11 ไฟล์: Claudy, Minnie, Reese, Rae, Vera, Mind, Chris, Libby, Nick, Dale, News (+ Logo-Agapae.jpg) | ใช้รูปจริงทุกจุด ห้ามวาด placeholder แทน |
| `SEED_AGENTS` L672–731 | ทุก agent มี `id / name / role / pipeline / img` ครบ (รวม cache-bust `?v=2`, `?v=3`) และมี `let AGENTS = SEED_AGENTS` (L732) | **ไม่ต้องเก็บ `agentName` / `agentImg` ซ้ำใน `meetings.json`** — derive จาก `AGENTS` เอาได้เลย |
| `Output/Minnie|Dale|Nick/2026-07-30-mirofish-*.md` | อ่านครบทั้ง 3 ไฟล์ (273 + 790 + 456 บรรทัด) | เนื้อหาจริงในตัวอย่าง fixture §8 คัดมาจากไฟล์เหล่านี้ ไม่ได้แต่งขึ้น |

**สิ่งที่ยังขาด (Dale ต้องเติม):** ยังไม่มีไฟล์ `meetings.json` และยังไม่มีขั้นตอนใครเป็นคนเขียน — ดู §7.3

---

## 1) การตัดสินใจหลัก 8 ข้อ (ทุก section ข้างล่างอิงจากตารางนี้)

| # | ตัดสินใจ | เหตุผล |
|---|---|---|
| **V1** | **Work Log เดิม "อยู่คู่กัน" ไม่แทนกัน** | เหตุผลเต็มใน §2 |
| **V2** | Meeting เป็น **แท็บหลักที่ 5** ต่อจาก To Do (`data-v="meeting"`) ไม่ยัดเป็นการ์ดใน Console | เป็นเนื้อหายาว อ่านนาน ต้องได้พื้นที่เต็มหน้า — ต่างจาก Work Log ที่เป็นบรรทัดสั้น ๆ พับเก็บได้ |
| **V3** | **2 ระดับอยู่ในแท็บเดียว สลับด้วย state `MEET_SEL`** (list ↔ detail) ไม่ใช้ drawer | drawer เดิมกว้าง `min(460px,92vw)` (L366) — แคบเกินไปสำหรับตาราง "ใครค้านใคร" 2 ฝั่ง และเนื้อความประชุมยาว ๆ |
| **V4** | **"ประเด็นที่เห็นต่าง" ขึ้นก่อน "ใครเสนออะไร"** ในหน้า detail | นี่คือคุณค่าหลักของฟีเจอร์ ถ้าวางท้ายจะจมใต้ proposal ยาว ๆ ของทุกคน |
| **V5** | **สี `--flagged` (#7A4A3A) ถูกผูกขาดให้ "ความเห็นต่าง" เท่านั้น** ทั้งแท็บ ไม่ใช้กับอย่างอื่นเลย | ในหน้าที่ทุกอย่างเป็นสีกระดาษ/หมึกดำ สีเดียวที่แรงจะดึงตาไปเองโดยไม่ต้องใช้ไอคอนใหญ่ ๆ หรือตัวหนา |
| **V6** | ความสัมพันธ์ "ใครค้านใคร" **derive จาก `entries[].disagreements[]` ทั้งหมดตอน render** ไม่เก็บซ้ำสองที่ | JSON เขียนโดยคนละ agent คนละรอบ — ถ้าให้กรอกสองฝั่งจะขัดกันเองแน่ |
| **V7** | v1 อ่านจาก **`meetings.json` อย่างเดียว ไม่ต่อ Firestore** | บันทึกประชุมเขียนครั้งเดียวตอนปิดโจทย์ ไม่มี real-time ให้ดู · ประหยัด quota อ่าน Firestore · ลดโค้ดที่ Dale ต้องดูแล (ทางต่อ Firestore ในอนาคตอยู่ใน §7.4 เป็น P2) |
| **V8** | **escape ทุกค่าที่มาจาก JSON ด้วย `TD_ESC` (L1384)** ห้ามยัด raw string ลง `innerHTML` | เนื้อความสกัดจาก `.md` มี `<`, `>`, `&`, `"` เต็มไปหมด (เช่น `≤350 bytes`, `"spdx_id": "AGPL-3.0"`) — `wlEntryHTML()` เดิมไม่ escape ซึ่งเป็นบั๊กที่รอปะทุอยู่แล้ว **อย่าลอก pattern นั้นมา** |

---

## 2) คำตอบข้อ 5 — Work Log เดิมควรอยู่ต่อ / ถูกแทน / อยู่คู่กัน

### 🟢 คำตอบ: **อยู่คู่กัน — และห้ามแทน**

ทั้งสองไม่ได้เก็บของชนิดเดียวกัน แค่บังเอิญมี "ชื่อ agent" กับ "วันที่" เหมือนกัน

| | **Work Log** (เดิม, คงไว้) | **Meeting** (ใหม่) |
|---|---|---|
| ตอบคำถามว่า | *เกิดอะไรขึ้นบ้าง เมื่อไหร่* | *ทีมคิดยังไง เห็นต่างตรงไหน* |
| หน่วยของข้อมูล | 1 ชิ้นงานที่ทำเสร็จ | 1 โจทย์ที่มีหลายคนถกกัน |
| ใครเขียน | **hook `scripts/hook-status.mjs` เขียนอัตโนมัติ** ทุกครั้งที่ agent จบงาน | สกัดครั้งเดียวตอนปิดโจทย์ (ต้องมีคนสั่ง) |
| ครอบคลุม | **ทุกงาน** รวมงานที่ทำคนเดียว (ข่าวเช้า, ดวง, push limit) | เฉพาะงานที่มีหลายคนร่วมและมีมุมต่าง |
| ปริมาณจริงตอนนี้ | 95 entries | 1 (MiroFish) |
| อายุของข้อมูล | ไหลตลอด ดูของวันนี้ | ค้างไว้อ่านย้อนหลัง เดือนหน้าก็ยังมีค่า |

**เหตุผลที่ห้ามแทน:**

1. **Work Log คือ audit trail ที่บังคับด้วยโค้ด** — `hook-status.mjs` + DoD gate ใน `CLAUDE.md` ข้อ 7–8 พึ่งมันอยู่ ถ้าเอาออก ระบบตรวจ "งานเสร็จจริงไหม" พังตาม
2. **Meeting ครอบคลุมแค่เศษเสี้ยว** — งาน 95 ชิ้นใน worklog มีที่เป็น "การประชุม" ไม่กี่โจทย์ ถ้าแทนกันจะเหลือหน้าเปล่า
3. **Meeting ต้องมีคนสั่งให้สกัด** — Work Log อัตโนมัติ 100% ส่วน Meeting ไม่ ถ้าวันไหนลืมสกัด จะไม่มีบันทึกอะไรเลยว่าเกิดอะไรขึ้น

**แต่ต้องเชื่อมกัน 2 จุด (ไม่งั้นจะรู้สึกเหมือนของคนละเว็บ):**

- **จาก Meeting → ไฟล์งาน:** ทุก entry โชว์ `file` เป็นชิปคลิกได้ (ลิงก์ไป GitHub blob) — ผู้ใช้ที่อยากอ่านฉบับเต็มไปต่อได้ทันที
- **จาก Work Log → Meeting:** entry ใน Work Log ที่ `outputFile` ตรงกับ `entries[].file` ของประชุมใดประชุมหนึ่ง ให้เพิ่มชิป `⚖ ประชุม: <topic>` ท้าย `.wl-tags` (P2 — ดู §6 จุดที่ 10)

**ผลข้างเคียงที่ต้องแก้ไปด้วย:** ถ้อยคำใต้ปุ่ม Work Log (L607) ปัจจุบันเขียนว่า *"ทุกงานที่ Agent ทำ — สถานะ เวลา และผู้รับ"* เก็บไว้ได้ แต่แนะนำเติมท้ายเป็น *"…— ดูความเห็นและข้อถกเถียงได้ที่แท็บ Meeting"* เพื่อบอกทางผู้ใช้

---

## 3) โครงหน้า (Information Architecture)

```
AGAPAE Dashboard
├─ Team Console   ← เดิม (การ์ด agent + Work Log พับเก็บได้)
├─ Widgets        ← เดิม
├─ การเงิน        ← เดิม
├─ To Do          ← เดิม
└─ Meeting  ⟵ ใหม่  (แท็บที่ 5)
   │
   ├─ ระดับ 1 — รายการหัวข้อประชุม   (MEET_SEL === null)
   │    ├─ hero: "บันทึกการประชุม · ทีมเห็นต่างตรงไหน"
   │    ├─ แถบสถิติ 3 ช่อง  [ประชุมทั้งหมด] [ประเด็นเห็นต่าง] [รอ Kittanate ตัดสิน]
   │    └─ การ์ดหัวข้อ (ใหม่→เก่า)  → คลิก = เข้าระดับ 2
   │
   └─ ระดับ 2 — รายละเอียดประชุม     (MEET_SEL === "<id>")
        ├─ ปุ่มย้อนกลับ "← บันทึกการประชุมทั้งหมด"
        ├─ หัวเรื่อง + meta (วันที่ · SOP · สถานะ · ผู้ร่วม)
        ├─ ⚡ ประเด็นที่เห็นต่าง (N)   ← เด่นที่สุดในหน้า, ขึ้นก่อน
        ├─ ใครเสนออะไร (N)
        ├─ ข้อสรุปของที่ประชุม
        └─ รอ Kittanate ตัดสิน
```

**ทำไมไม่แยกเป็น 2 view:** เพราะ `switchView()` เดิมจัดการแค่ระดับแท็บ การเพิ่ม view ที่ 6 จะทำให้แถบแท็บมีปุ่มที่กดเองไม่ได้ — ใช้ state ภายในแท็บเดียวสะอาดกว่าและตรงกับ pattern `finSel` ของแท็บการเงิน (L1044) ที่มีอยู่แล้ว

---

## 4) ระดับ 1 — รายการหัวข้อประชุม

### 4.1 Wireframe (สัดส่วนจริง หน่วย px)

```
┌ .wrap (max-width 1180, padding 0 24) ─────────────────────────────────┐
│                                                                        │
│  MEETING · บันทึกการประชุม                      ← .hero .ey (11px)     │
│  ทีมเสนออะไร เห็นต่างตรงไหน และสรุปว่ายังไง      ← .hero p (20–26px)   │
│                                                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        ← .mt-stats            │
│  │ ประชุม    │ │ เห็นต่าง  │ │ รอตัดสิน  │           grid auto-fit 150px  │
│  │    1     │ │    2 ⚡  │ │    3     │           gap 14                │
│  └──────────┘ └──────────┘ └──────────┘                                │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │▌ 30 ก.ค. 2569 · SOP-05                    [รอ Kittanate ตัดสิน]│   │ ← .mt-card
│  │▌                                                                │   │  radius 12
│  │▌ MiroFish ใช้ประโยชน์กับ TANAPAT ได้ยังไง                       │   │  padding 18 20
│  │▌                                                                │   │  ซ้ายมี .mt-accent 4px
│  │▌ (🄼)(🄳)(🄽)  Minnie · Dale · Nick                              │   │
│  │▌                                                                │   │
│  │▌ ┌──────────────────────────────────────────────────────────┐ │   │
│  │▌ │ ⚡ เห็นต่าง 2 จุด   Nick ⇄ Minnie · Dale ⇄ Minnie        │ │   │ ← .mt-clash-strip
│  │▌ └──────────────────────────────────────────────────────────┘ │   │   พื้น flagged 6%
│  │▌                                                                │   │
│  │▌ ข้อสรุป: ไม่ติดตั้ง MiroFish — ทำ persona panel ด้วย agent…   │   │ ← clamp 2 บรรทัด
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  (การ์ดถัดไป…)                                                          │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.2 กติกาการ์ด `.mt-card`

| ส่วน | class | สเปก |
|---|---|---|
| แถบสีซ้าย | `.mt-accent` | กว้าง **4px** เต็มความสูง · **มีเห็นต่าง → `--flagged`** · ไม่มีเห็นต่าง → `--done` (แค่แถบนี้ก็สแกนทั้งหน้าได้ว่าประชุมไหนมีของ) |
| แถวบน | `.mt-card-top` | ซ้าย: `วันที่ · SOP` mono 10.5px `--ink-faint` · ขวา: `.mt-status` |
| สถานะ | `.mt-status` | pill 10px mono · `รอ Kittanate ตัดสิน` = พื้น gold 12% ตัว `--gold` · `ปิดแล้ว` = พื้น done 14% · `กำลังถก` = พื้น working 12% |
| หัวเรื่อง | `.mt-topic` | **18px / 600 / line-height 1.35** · Noto Sans Thai · `--ink` |
| ผู้ร่วม | `.mt-people` | avatar **24×24 radius 7** เรียงชิดกัน (`margin-left:-6px` ตั้งแต่ตัวที่ 2, `border:1.5px solid var(--card)`) + ชื่อคั่น `·` 12px `--ink-soft` |
| แถบเห็นต่าง | `.mt-clash-strip` | **แสดงเมื่อมี clash ≥1 เท่านั้น** · พื้น `rgba(122,74,58,.06)` · เส้น `rgba(122,74,58,.22)` · radius 9 · padding 8/11 · ตัว `--flagged` 12.5px · ขึ้นต้น `⚡` + `เห็นต่าง N จุด` ตัวหนา แล้วตามด้วยคู่ `A ⇄ B` คั่น `·` |
| ข้อสรุป | `.mt-concl-peek` | 13px `--ink-soft` line-height 1.55 · `-webkit-line-clamp:2` · ถ้ายังไม่มีข้อสรุป โชว์ `<span class="mt-none">ยังไม่มีข้อสรุป</span>` (italic `--ink-faint`) |
| interaction | | ทั้งการ์ดเป็น `<button>` (คลิกได้ทั้งใบ + โฟกัสด้วยคีย์บอร์ดได้) · hover: `border-color:var(--line-strong)` + `box-shadow:var(--shadow)` + `transform:translateY(-2px)` |

> ⚠️ **ห้ามใส่ badge สีแดงกับ "สถานะ"** — สถานะใช้ gold/done/working เท่านั้น เพราะ `--flagged` ถูกจองไว้ให้ความเห็นต่างอย่างเดียว (V5) ถ้าสถานะก็แดง ความเห็นต่างจะไม่เด่นอีกต่อไป

### 4.3 Empty state

```html
<div class="muted" style="padding:20px 0">ยังไม่มีบันทึกการประชุม — เช็คไฟล์ meetings.json</div>
```
ใช้ class `.muted` ที่มีอยู่แล้ว (L188) เหมือน `renderTodo()` เป๊ะ

---

## 5) ระดับ 2 — รายละเอียดประชุม (หัวใจของฟีเจอร์)

### 5.1 Wireframe

```
┌ .wrap ─────────────────────────────────────────────────────────────────┐
│  ← บันทึกการประชุมทั้งหมด                        ← .mt-back            │
│                                                                         │
│  MiroFish ใช้ประโยชน์กับ TANAPAT ได้ยังไง         ← .mt-d-topic 26px    │
│  30 ก.ค. 2569 · SOP-05 · ผู้ร่วม 3 คน   [รอ Kittanate ตัดสิน]           │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  ⚡ ประเด็นที่เห็นต่าง (2)                        ← .mt-sec-head        │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ ▍BLOCKER                                                          │ │ ← .mt-clash.sev-blocker
│  │ ▍ (🄽) Nick        ⇄ ค้าน ⇄        Minnie (🄼)                    │ │
│  │ ▍ ──────────────────────────────────────────────────────────────  │ │
│  │ ▍ สมมติฐาน "เรามีข้อมูลเฉลยดีลแพ้/ชนะ" ไม่จริง — เปิดฐานข้อมูล    │ │
│  │ ▍ 1,666 ใบแล้ว ไม่มีฟิลด์ผลแพ้/ชนะ ไม่มีเหตุผลที่แพ้             │ │
│  │ ▍                                                                 │ │
│  │ ▍ ❝ grep คำว่า ประมูล/ประกวดราคา/e-bidding ทั้ง 1,666 ใบ = 0 hit ❞│ │ ← .mt-quote
│  │ ▍                                                                 │ │
│  │ ▍ ผลกระทบ → TOP PICK #01 พังทั้งใบ, gate ≥7/10 รันไม่ได้          │ │ ← .mt-impact
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ ▍CHALLENGE …(การ์ดที่ 2 — Dale ⇄ Minnie)                          │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│  ใครเสนออะไร (3)                                                        │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ (🄼) Minnie  · เสนอไอเดีย            [เสนอ]   [⚠ รอ fact-check]   │ │ ← .mt-entry
│  │                                                                    │ │
│  │ เสนอ 6 idea cards เลือก #01 "คณะกรรมการจำลอง" เป็น TOP PICK…      │ │
│  │                                                                    │ │
│  │ • 4 ใน 6 ใบไม่ต้องแตะ MiroFish เลย                                 │ │
│  │ • แยกชัด: narrative sim (ต้องใช้) vs persona panel (ไม่ต้อง)       │ │
│  │                                                                    │ │
│  │ ⚡ ถูกค้าน 2 จุด: Nick · Dale        ← chip คลิกแล้วเลื่อนขึ้นไป    │ │ ← .mt-counter-chip
│  │ 📄 Output/Minnie/2026-07-30-mirofish-ideas.md                      │ │ ← .mt-file
│  └───────────────────────────────────────────────────────────────────┘ │
│  (Dale, Nick …)                                                         │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ ✓ ข้อสรุปของที่ประชุม                                              │ │ ← .mt-conclusion
│  │ ไม่ติดตั้ง MiroFish · ทำ persona panel ด้วย agent ที่มีอยู่ …      │ │   ขอบซ้าย 3px --done
│  └───────────────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ ⧗ รอ Kittanate ตัดสิน                                              │ │ ← .mt-decisions
│  │ ◇ จะลองสาย (ข) persona panel ไหม (2–3 ชม.)                        │ │   ขอบซ้าย 3px --gold
│  │ ◇ จะเก็บผลแพ้/ชนะของใบเสนอราคาตั้งแต่วันนี้ไหม                     │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 การ์ดความเห็นต่าง `.mt-clash` — สเปกละเอียด (ข้อ 4 ของโจทย์)

นี่คือชิ้นที่ต้องเด่นที่สุดในทั้ง dashboard เทคนิคที่ใช้มี 5 ชั้น **ไม่ใช่แค่ทำตัวหนา**

| ชั้น | วิธี | ค่าจริง |
|---|---|---|
| 1. **ตำแหน่ง** | วางเป็น section แรกสุดใต้หัวเรื่อง ก่อนข้อเสนอทุกอัน | — |
| 2. **สีผูกขาด** | `--flagged` ใช้ที่นี่ที่เดียวทั้งแท็บ | พื้น `rgba(122,74,58,.05)` · เส้น `rgba(122,74,58,.28)` · แถบซ้าย 3px `--flagged` |
| 3. **รูปทรงต่าง** | การ์ด clash เป็นใบเดียวกว้างเต็ม ขณะที่การ์ดอื่นในหน้าเป็นบล็อกขาวธรรมดา | radius 12 · padding 16/18 · `margin-bottom:12` |
| 4. **หน้าคน 2 ฝั่ง** | avatar จริง 2 รูปหันเข้าหากันคั่นด้วย `⇄ ค้าน ⇄` — ตาจับ "คู่ขัดแย้ง" ได้ก่อนอ่านตัวอักษร | avatar 28×28 radius 8 · ชื่อ 13.5px/600 |
| 5. **ระดับความแรง** | ป้าย `severity` มุมซ้ายบน mono 9.5px letter-spacing .14em | `BLOCKER` = ตัว `--paper-2` พื้น `--flagged` · `CHALLENGE` = ตัว `--flagged` พื้นโปร่ง เส้น flagged · `NOTE` = ตัว `--ink-faint` เส้น `--line-strong` |

**องค์ประกอบภายในการ์ด (เรียงบนลงล่าง):**

1. `.mt-sev` — ป้ายระดับ
2. `.mt-clash-head` — `(av) ชื่อฝั่งค้าน` `⇄ ค้าน ⇄` `ชื่อฝั่งถูกค้าน (av)` · flex, `gap:10`, `flex-wrap:wrap`
3. `.mt-clash-point` — เนื้อความว่าไม่เห็นด้วยเรื่องอะไร · **14px / line-height 1.65** / Noto Sans Thai / `--ink`
4. `.mt-quote` *(ถ้ามี field `quote`)* — ประโยคจริงจากไฟล์ · 13px italic `--ink-soft` · `border-left:2px solid rgba(122,74,58,.3)` · `padding-left:12` · ครอบด้วย `❝ ❞`
5. `.mt-impact` *(ถ้ามี field `impact`)* — 12.5px mono-label `ผลกระทบ →` + ข้อความ · `--flagged` 600

**การเรียงลำดับ:** `blocker` → `challenge` → `note` (ไม่เรียงตามชื่อ agent) — สิ่งที่ทำให้งานพังต้องอยู่บนสุดเสมอ

**ถ้า clash = 0:** แสดง `.mt-noclash` แทน — พื้น `rgba(94,122,102,.07)` ขอบซ้าย done · ข้อความ `✓ ที่ประชุมเห็นตรงกันทุกประเด็น` · **ห้ามซ่อน section ทิ้ง** เพราะ "ไม่มีคนค้าน" เป็นข้อมูลที่ต้องอ่านออกเหมือนกัน (ไม่งั้นแยกไม่ออกจาก "ยังไม่ได้กรอก")

### 5.3 การ์ดข้อเสนอ `.mt-entry`

| ส่วน | สเปก |
|---|---|
| หัวการ์ด | avatar **32×32 radius 8** + ชื่อ 14px/600 + `·` + `role` 12px `--ink-soft` + (ชิดขวา) `.mt-stance` + `.mt-fc` |
| `.mt-stance` | จุดยืน pill mono 9.5px: `เสนอ` (`--ink-soft` เส้น line-strong) · `หนุน` (`--done`) · `ค้าน` (`--flagged`) · `ตั้งข้อสังเกต` (`--ink-faint`) |
| `.mt-fc` | สถานะ fact-check: `✓ ตรวจแล้ว` (`--done`) · `⚠ รอ fact-check` (`--gold`) · `✗ ตรวจไม่ผ่าน` (`--flagged` **ตัวหนา** — นี่เป็นข้อยกเว้นเดียวที่ยอมให้ใช้สี flagged นอก clash เพราะมันคือ "ค้านโดยระบบ") |
| `.mt-proposal` | 14px / line-height **1.7** / Noto Sans Thai / `--ink` — เนื้อความไทย 2–4 บรรทัด ต้องหายใจได้ |
| `.mt-keys` | `<ul>` ไม่มี bullet เดิม · แต่ละข้อ `padding-left:16` + `::before` วงกลม 5px สี `--gold` (ยืม pattern `.sec.what li` L382–383 ให้หน้าตาเป็นพี่น้องกับ drawer เดิม) · 13px |
| `.mt-counter-chip` | **แสดงเมื่อ agent คนนี้ถูกคนอื่นค้าน** — `⚡ ถูกค้าน N จุด: Nick · Dale` · พื้น flagged 6% ตัว `--flagged` 12px radius 999 · **คลิกได้** → `scrollIntoView({behavior:'smooth',block:'center'})` ไปการ์ด clash ใบแรกที่เกี่ยวข้อง + flash ด้วย animation `flash` ที่มีอยู่แล้ว (L359–360) |
| `.mt-file` | ชิปไฟล์ `📄 <path>` mono 10.5px `--ink-faint` เส้น `--line` · เป็น `<a target="_blank">` ไป `https://github.com/hellopae/AGAPAEagent/blob/main/<path>` · บนมือถือ `overflow:hidden;text-overflow:ellipsis` |

**ลำดับการ์ด:** ตามลำดับใน `entries[]` ตามที่ agent ทำงานจริง (Minnie → Dale → Nick) **ไม่ต้อง sort ใหม่** — ลำดับเวลาคือเรื่องราวของประชุม

### 5.4 ข้อสรุป + สิ่งที่รอตัดสิน

| block | สเปก |
|---|---|
| `.mt-conclusion` | พื้น `rgba(94,122,102,.06)` · `border-left:3px solid var(--done)` · radius 12 · padding 16/18 · หัว `✓ ข้อสรุปของที่ประชุม` mono 10.5px letter-spacing .16em `--done` · เนื้อ 14.5px line-height 1.7 |
| `.mt-decisions` | พื้น `rgba(154,123,79,.06)` · `border-left:3px solid var(--gold)` · หัว `⧗ รอ Kittanate ตัดสิน` · แต่ละข้อขึ้นต้น `◇` สี gold · 14px line-height 1.65 · **แต่ละข้อคั่นด้วยเส้น `1px solid rgba(154,123,79,.18)`** ให้แยกออกจากกันชัด (นี่คือช่องที่ Kittanate ต้องมาเลือก ต้องนับข้อได้ง่าย) |

ทั้งสอง block ถ้าไม่มีข้อมูลให้ **ซ่อนทั้งกล่อง** (ต่างจาก clash ที่ต้องโชว์ว่า "ไม่มี") เพราะประชุมที่ยังไม่จบ ยังไม่มีข้อสรุปเป็นเรื่องปกติ

---

## 6) จุดที่ต้องแก้ใน `index.html` — ระบุเลขบรรทัด (สำหรับ Dale)

> เลขบรรทัดอ้างจากไฟล์ ณ 31 ก.ค. 2026 (1,597 บรรทัด) **แก้จากล่างขึ้นบนจะได้ไม่ต้องคำนวณ offset ใหม่**

| # | บรรทัด | ทำอะไร | P |
|---|---|---|---|
| 1 | **แทรกก่อน L453** (`footer{margin-top:46px…}`) หลังบล็อก `.wl-sent-tag` จบที่ L451 | ใส่ CSS ก้อนใหม่ `/* ---------- Meeting ---------- */` ทั้งหมดตาม §9 | P1 |
| 2 | **ใน media query L456–476** — แทรกหลัง L475 (`.fin-cell .fin-day{…}`) ก่อน `}` ที่ L476 | rule มือถือของ Meeting ตาม §10.2 | P1 |
| 3 | **แทรกระหว่าง L476 กับ L477** | เพิ่ม `@media(max-width:760px){…}` ใหม่ ตาม §10.1 | P1 |
| 4 | **แทรกหลัง L514** (`</button>` ของ To Do) ก่อน L515 `</div>` | ปุ่มแท็บที่ 5:<br>`<button class="view-tab" data-v="meeting" onclick="switchView('meeting')">Meeting <span class="tab-count" id="meetCount">0</span></button>` | P1 |
| 5 | **แทรกหลัง L654** (`</div>` ปิด `#todoView`) ก่อน L656 `<div class="scrim">` | markup `#meetingView` ตาม §6.1 | P1 |
| 6 | **L1111** — ใน `switchView()` | เพิ่มบรรทัด:<br>`document.getElementById('meetingView').style.display = v === 'meeting' ? '' : 'none';` | P1 |
| 7 | **L1114** — ใน `switchView()` หลัง `if (v === 'todo') renderTodo();` | เพิ่ม `if (v === 'meeting') renderMeeting();` | P1 |
| 8 | **แทรกหลัง L1514** (`}` ปิด `loadTodo()`) ก่อน L1516 คอมเมนต์ `BOOT` | บล็อก JS ทั้งหมดของ Meeting: `MEETINGS`, `MEET_SEL`, `mtAgent()`, `mtBuildClashes()`, `renderMeeting()`, `renderMeetingList()`, `renderMeetingDetail()`, `openMeeting()`, `closeMeeting()`, `loadMeetings()`, `updateMeetCount()` | P1 |
| 9 | **L1522** หลัง `loadTodo();` | เพิ่ม `loadMeetings();` | P1 |
| 10 | **L1284–1285 + L1300** ใน `wlEntryHTML()` | เพิ่มชิป `⚖ ประชุม` เมื่อ `e.outputFile` ตรงกับ `entries[].file` ของประชุมใด — ต่อท้าย `.wl-tags` (ใช้ class `.wl-meet-tag`) | **P2** |
| 11 | **L607** ข้อความใต้ปุ่ม Work Log | เติมท้าย `— ดูความเห็นและข้อถกเถียงได้ที่แท็บ Meeting` | P2 |
| 12 | **แทรกก่อน L1595** (`</script>` ของบล็อก Firebase) | `firebase.firestore().collection("agents").doc("meetings").onSnapshot(…)` — **ทำเมื่อจำเป็นเท่านั้น** ดู V7 | P3 |

**ไฟล์ใหม่ที่ต้องสร้าง:** `meetings.json` ที่ root repo (ระดับเดียวกับ `todo.json`, `manga.json`) — fixture ตั้งต้นอยู่ใน §8

### 6.1 Markup ที่แทรกหลัง L654

```html
<!-- ===== MEETING VIEW ===== -->
<div id="meetingView" style="display:none">
  <div class="wrap">
    <section class="hero" id="meetHero">
      <div class="ey mono">Meeting · บันทึกการประชุม</div>
      <p>ทีมเสนออะไร เห็นต่างตรงไหน และสรุปว่ายังไง</p>
    </section>
    <div id="meetBody"><div class="muted" style="padding:20px 0">กำลังโหลดบันทึกการประชุม…</div></div>
    <footer>
      <span class="mono" id="meetModeTag">—</span>
      <span id="meetModeMsg">ข้อมูลจากไฟล์ <span class="mono">meetings.json</span> · สกัดตอนปิดโจทย์</span>
    </footer>
  </div>
</div>
```

- `#meetHero` เป็น id เพราะตอนเข้า detail ให้ **สลับข้อความ hero** เป็น `Meeting · <วันที่>` / หัวเรื่องประชุม (ประหยัดพื้นที่บนมือถือ ไม่ต้องมีหัวเรื่องซ้ำสองชั้น) หรือถ้า Dale อยากง่ายกว่านั้น ซ่อน `#meetHero` ตอน detail แล้วให้ `.mt-d-topic` ทำหน้าที่แทน — **เลือกอย่างใดอย่างหนึ่ง อย่ามีหัวเรื่องซ้อนกันสองชั้น**

### 6.2 ตรรกะที่ต้องเขียน (pseudo — Dale เขียนจริงตามสไตล์ไฟล์)

```js
let MEETINGS = [];          // จาก meetings.json
let MEET_SEL = null;        // null = list, "<id>" = detail

/* หา meta ของ agent จากรายชื่อจริงในหน้า (ไม่เก็บซ้ำใน JSON) */
function mtAgent(id){
  const a = (AGENTS || SEED_AGENTS).find(x => x.id === id);
  return a || { id, name: id, pipeline: 'standalone', img: null };
}

/* รวมความเห็นต่างทั้งประชุมเป็นรายการเดียว เรียงตามความแรง */
function mtBuildClashes(m){
  const RANK = { blocker: 0, challenge: 1, note: 2 };
  const out = [];
  (m.entries || []).forEach(e => {
    (e.disagreements || []).forEach((d, i) => {
      out.push({
        key: `${e.agent}-${d.with}-${i}`,
        from: e.agent, to: d.with,
        point: d.point || '', quote: d.quote || '', impact: d.impact || '',
        sev: RANK[d.severity] != null ? d.severity : 'challenge'
      });
    });
  });
  return out.sort((a,b) => RANK[a.sev] - RANK[b.sev]);
}

/* ใครถูกค้านบ้าง — derive ไม่เก็บซ้ำ */
function mtCounteredBy(clashes, agentId){
  return [...new Set(clashes.filter(c => c.to === agentId).map(c => c.from))];
}
```

**สิ่งที่ห้ามลืม:**
- `escape` ทุกค่าด้วย `TD_ESC` (V8)
- `openMeeting(id)` ต้อง `window.scrollTo(0,0)` ตามพฤติกรรมของ `switchView()`
- `closeMeeting()` ตั้ง `MEET_SEL = null` แล้ว render ใหม่ + scroll top
- ปุ่มการ์ดใช้ `<button type="button">` เพื่อให้ Tab/Enter ใช้ได้ (Console เดิมใช้ `<div onclick>` ซึ่งกดด้วยคีย์บอร์ดไม่ได้ — **อย่าลอกจุดนั้น**)
- ปุ่ม Esc: เมื่ออยู่ detail ให้กด Esc = กลับ list (ต่อ listener เดิม L1226 ได้เลย โดยเช็ก `currentView === 'meeting' && MEET_SEL`)

---

## 7) ข้อมูล — ไฟล์, schema, ใครเขียน

### 7.1 schema — สิ่งที่เสนอให้ **เพิ่ม**

| ฟิลด์ | ที่ | ค่า | เหตุผล (ทั้งหมดมาจากของจริงในงาน MiroFish) |
|---|---|---|---|
| `disagreements[].severity` | entry | `"blocker"` \| `"challenge"` \| `"note"` | Nick หักล้างสมมติฐานหลักจน TOP PICK พังทั้งใบ ≠ Dale ค้านเรื่องช่องทางติดตั้ง — **ถ้าไม่มีฟิลด์นี้ UI เรียงลำดับความสำคัญไม่ได้ และของที่ทำงานพังจะไปโผล่ล่างสุดได้** |
| `disagreements[].quote` | entry | string (optional) | ประโยคจริงจากไฟล์ เช่น `"grep … ทั้ง 1,666 ใบ = 0 hit"` — ทำให้ผู้อ่านเชื่อได้โดยไม่ต้องเปิดไฟล์ นี่คือความต่างระหว่าง "บันทึกที่อ่านแล้วตัดสินใจได้" กับ "สรุปที่ต้องไปตรวจต่อ" |
| `disagreements[].impact` | entry | string (optional) | *"TOP PICK #01 พังทั้งใบ, gate ≥7/10 รันไม่ได้"* — บอกว่าค้านแล้วเกิดอะไรขึ้น ไม่ใช่แค่ค้านเฉย ๆ |
| `entries[].stance` | entry | `"propose"` \| `"support"` \| `"oppose"` \| `"neutral"` | `role` เป็นข้อความอิสระ ("เสนอไอเดีย", "ประเมินความเป็นไปได้ทางเทคนิค") เอามาทำ pill/สี/กรองไม่ได้ ต้องมี enum คู่กัน |
| `updatedAt` + `source` | root ของไฟล์ | string | แท็บอื่นทุกแท็บมี (todo.json, manga.json) — footer ต้องโชว์ว่าอัปเดตเมื่อไหร่ ไม่งั้นดูไม่ออกว่าเก่าแค่ไหน |

### 7.2 schema — สิ่งที่เสนอให้ **แก้/ตัด**

| ฟิลด์ | ตอนนี้ | เสนอ | เหตุผล |
|---|---|---|---|
| `entries[].verified` | `false` (boolean) | **เปลี่ยนชื่อเป็น `factcheck`: `"pending"` \| `"passed"` \| `"failed"`** | fact-check gate ของเรามี 3 สถานะจริง (`CLAUDE.md` ข้อ 6 / Reese ใช้ ✅ ⚠️ ❌) · boolean แยก "ยังไม่ตรวจ" กับ "ตรวจแล้วไม่ผ่าน" ไม่ออก — และนี่คือความต่างที่สำคัญที่สุด เพราะเอกสาร MiroFish ทั้ง 3 ฉบับ **ยังไม่ผ่าน fact-check** ถ้า UI โชว์เป็น `false` เฉย ๆ Kittanate อาจอ่านว่า "ตรวจแล้วไม่ผ่าน" ทั้งที่แปลว่า "ยังไม่ได้ตรวจ" |
| `participants` | array บังคับ | **คงไว้แต่ให้เป็น optional** — UI derive จาก `entries[].agent` เป็นหลัก | ข้อมูลซ้ำสองที่ = มีวันขัดกันเอง · แต่เก็บไว้มีประโยชน์กรณีมีคนร่วมประชุมแต่ไม่ได้เขียนเอกสาร (เช่น Claudy สั่งงาน, Kittanate ตัดโจทย์) → **กติกา: ถ้ามี `participants` ใช้ตามนั้น ถ้าไม่มี derive เอง** |
| `decisions[]` | array ของ string | **รับได้ทั้ง string และ `{question, options?, owner?}`** | ข้อ "รอ Kittanate ตัดสิน" ส่วนใหญ่เป็นคำถามแบบมีตัวเลือก (เช่น "ลองสาย (ข) หรือพับโปรเจกต์") ถ้ามีตัวเลือกให้เห็นจะตัดสินใจได้เร็วกว่าอ่านประโยคยาว · รองรับ string ต่อไปเพื่อไม่ให้ของเดิมพัง |
| `entries[].agentName`, `agentImg`, `pipeline` | ไม่มีใน schema | **อย่าเพิ่ม** | มีครบใน `SEED_AGENTS` L672–731 แล้ว — ถ้าเก็บซ้ำ วันที่เปลี่ยนรูป avatar จะต้องไล่แก้ทุกไฟล์ประชุม |

### 7.3 ใครเขียน `meetings.json`

**ข้อเสนอ (ให้ Dale ตัดสินขั้นสุดท้าย):** เขียนโดย **Libby** ตอนปิดโจทย์ (Libby เป็นเจ้าของ metadata/index ตาม `CLAUDE.md` และไม่แตะเนื้อหา — ตรงกับงาน "สกัดบันทึกโดยไม่ตีความใหม่") โดย Claudy สั่งเป็นขั้นสุดท้ายของ pipeline ก่อน push

**สิ่งที่ห้ามให้เกิด:** อย่าให้ hook เขียนอัตโนมัติทุกครั้งที่ agent จบงาน — บันทึกประชุมต้องมีคนอ่านเนื้อหาจริงก่อนสรุป ถ้าให้เครื่องสกัดเองทุกครั้งจะได้ของที่หน้าตาเหมือนบันทึกแต่เนื้อในผิด ซึ่งอันตรายกว่าไม่มีเลย

### 7.4 ทางต่อ Firestore (P3 — ยังไม่ทำ)

ถ้าวันหนึ่งอยากได้ real-time ให้ทำ pattern เดียวกับ worklog: `MEET_JSON` + `MEET_FS` → `mergeMeetings()` dedupe ด้วย `id` → sort `date` ใหม่→เก่า **แต่ v1 ไม่ต้องทำ** เพราะบันทึกเขียนครั้งเดียวจบ การเปิด listener ที่ 6 มีแต่จะเพิ่ม read quota โดยไม่ได้อะไรกลับมา

---

## 8) Fixture ตั้งต้น — `meetings.json` (เนื้อหาจริงจาก 3 ไฟล์)

> ทุกข้อความข้างล่างคัดจาก `Output/Minnie|Dale|Nick/2026-07-30-mirofish-*.md` ที่อ่านจริงแล้ว ไม่ได้แต่ง
> `factcheck` ทุกใบเป็น `"pending"` เพราะยังไม่มีไฟล์ Reese fact-check ของงานนี้ในโฟลเดอร์ `Output/Reese/`

```json
{
  "source": "meetings.json",
  "updatedAt": "2026-07-31",
  "meetings": [
    {
      "id": "2026-07-30-mirofish",
      "topic": "MiroFish ใช้ประโยชน์กับ TANAPAT ได้ยังไง",
      "date": "2026-07-30",
      "displayDate": "30 ก.ค. 2569",
      "sop": "SOP-05",
      "status": "รอ Kittanate ตัดสิน",
      "entries": [
        {
          "agent": "minnie",
          "role": "เสนอไอเดีย",
          "stance": "propose",
          "proposal": "เสนอ idea cards 6 ใบ เลือก #01 คณะกรรมการจำลอง (Bid Committee Sim) เป็น TOP PICK — จำลองวงถกของคณะกรรมการจัดซื้อก่อนยื่นใบเสนอราคา เพื่อเห็น objection ล่วงหน้าแล้วปิดช่องก่อนยื่น เหตุผลที่เลือกใบนี้คือเป็นใบเดียวที่พิสูจน์หรือหักล้างตัวเองได้เร็วและถูกด้วยการ backtest",
          "keyPoints": [
            "4 ใน 6 ใบเป็นแบบ persona panel — ยืมแนวคิด MiroFish โดยไม่ต้องแตะโค้ด ไม่ต้องแตะ AGPL",
            "แยกให้ชัด 2 อย่าง: narrative diffusion sim (ต้องใช้ MiroFish) vs persona panel (ไม่ต้อง)",
            "ห้ามติดตั้ง/รัน MiroFish จริงก่อน Dale ตอบเรื่อง AGPL + Zep Cloud"
          ],
          "disagreements": [],
          "file": "Output/Minnie/2026-07-30-mirofish-ideas.md",
          "factcheck": "pending"
        },
        {
          "agent": "dale",
          "role": "ประเมินความเป็นไปได้ทางเทคนิค",
          "stance": "oppose",
          "proposal": "ติดตั้งได้ทางเทคนิค แต่ไม่แนะนำ — และเหตุผลไม่ใช่ AGPL อย่างที่ทุกคนกลัวกัน AGPL ไม่ใช่ blocker สำหรับการใช้ภายใน blocker จริงคือ Zep Cloud ที่บังคับใช้ด้วยโค้ด ปิดไม่ได้ ไม่มี self-host ทำให้ไฟล์งานลูกค้าสถาบันต้องออกนอกประเทศ ควรลองสาย (ข) persona panel ด้วย agent ที่มีอยู่เท่านั้น",
          "keyPoints": [
            "อ่าน LICENSE จริงทั้งไฟล์ + ยืนยันจาก GitHub API ว่าเป็น AGPL-3.0 จริง",
            "สาย (ข) แบบเบาใช้แรง 2–3 ชม. · Reaction Gate 4–6 ชม. · memory recall 3–4 ชม.",
            "สาย (ก) ทั้งสาย: ไม่ทำ จนกว่าสาย (ข) จะ backtest ผ่าน",
            "ข้อสงวน: เป็นวิศวกรไม่ใช่ทนาย — ถ้าจะเปิดเป็นบริการให้ลูกค้าต้องให้ทนายดูก่อน"
          ],
          "disagreements": [
            {
              "with": "minnie",
              "severity": "challenge",
              "point": "ไม่เห็นด้วยกับการวางน้ำหนักไปที่ MiroFish ตั้งแต่ต้น — ปัญหาไม่ได้อยู่ที่ลิขสิทธิ์อย่างที่ brief ตั้งไว้ แต่อยู่ที่ Zep Cloud ที่บังคับให้เอกสารลูกค้าขึ้น cloud ต่างประเทศและปิดไม่ได้",
              "quote": "ปัญหาของ MiroFish กับเราไม่ใช่เรื่องลิขสิทธิ์ — เป็นเรื่องที่มันบังคับให้เอกสารลูกค้าสถาบันของเราขึ้น cloud ของบริษัทอเมริกันที่ไม่เปิดเผยว่าเก็บข้อมูลไว้ประเทศไหน",
              "impact": "ตัดตัวเลือก 'ติดตั้ง MiroFish' ออกจากโต๊ะทั้งหมด เหลือแค่สาย (ข)"
            }
          ],
          "file": "Output/Dale/2026-07-30-mirofish-technical.md",
          "factcheck": "pending"
        },
        {
          "agent": "nick",
          "role": "ต้นทุน / ROI",
          "stance": "oppose",
          "proposal": "เปิดฐานข้อมูลใบเสนอราคาจริง 1,666 ใบ (มิ.ย. 2015 – ก.ค. 2026, 195 ลูกค้า) แล้วพบว่าสมมติฐานที่เป็นฐานของ TOP PICK ไม่จริง — ไม่มีข้อมูลผลแพ้/ชนะเลยแม้แต่ฟิลด์เดียว จึง backtest ไม่ได้ และ gate ≥7/10 ที่ Minnie เสนอ รันไม่ได้",
          "keyPoints": [
            "ใบเสนอราคาลูกค้าสถาบัน 3 ปีล่าสุด = 52 ใบ แต่มาจากลูกค้าเพียง 10 ราย",
            "รายใหญ่คือลูกค้าประจำที่ชนะไปแล้วและสั่งซ้ำ (คิงส์คอลเลจ 102 ใบ, รพ.สุขสวัสดิ์ 49 ใบ) ไม่ใช่การแข่งประมูลรายครั้ง",
            "worklog.json ไม่บันทึก token usage เลย ตัวเลขต้นทุนทุกตัวจึงเป็นการประมาณ",
            "Zep Cloud Flex = $104/เดือน (฿3,500) ถ้าจะใช้จริง"
          ],
          "disagreements": [
            {
              "with": "minnie",
              "severity": "blocker",
              "point": "สมมติฐานหลักของ TOP PICK #01 ที่ว่า 'เรามีข้อมูลเฉลยดีลแพ้/ชนะพร้อมเหตุผล ใช้ backtest ได้ทันที' ไม่จริง — เปิดฐานข้อมูลจริงแล้วไม่มีฟิลด์ผลแพ้/ชนะ ไม่มีเหตุผลที่แพ้ ไม่มีบันทึกการประมูลแม้แต่รายการเดียว",
              "quote": "grep คำว่า ประมูล / ประกวดราคา / e-bidding / สอบราคา / TOR / ยื่นซอง / ตกลงราคา ทั้ง 1,666 ใบ = 0 hit",
              "impact": "TOP PICK #01 พังทั้งใบ และ gate ≥7/10 ที่ Minnie เสนอ รันไม่ได้ตั้งแต่ต้น"
            }
          ],
          "file": "Output/Nick/2026-07-30-mirofish-cost.md",
          "factcheck": "pending"
        }
      ],
      "conclusion": "ไม่ติดตั้ง MiroFish — blocker จริงคือ Zep Cloud ที่ปิดไม่ได้ ไม่ใช่ AGPL · TOP PICK เดิม (คณะกรรมการจำลอง) พิสูจน์ไม่ได้เพราะไม่มีข้อมูลเฉลย · ทางเดียวที่เหลือคือ persona panel ด้วย agent ที่มีอยู่ ไม่แตะโค้ด ไม่ส่งข้อมูลออกนอกประเทศ",
      "decisions": [
        "จะลองสาย (ข) persona panel แบบเบา (2–3 ชม.) ไหม",
        "จะเริ่มเก็บผลแพ้/ชนะ + เหตุผลที่แพ้ ในใบเสนอราคาตั้งแต่วันนี้ไหม (ถ้าไม่เก็บ ปีหน้าก็ยัง backtest ไม่ได้อยู่ดี)",
        "เอกสารทั้ง 3 ฉบับยังไม่ผ่าน Reese fact-check — จะให้ตรวจก่อนตัดสินไหม"
      ]
    }
  ]
}
```

---

## 9) CSS class ใหม่ทั้งหมด (ชุดสมบูรณ์)

**ไม่ต้องเพิ่มตัวแปรใน `:root` เลย** ใช้ของเดิมทั้งหมด · prefix `.mt-` ทุกตัวเพื่อไม่ชนกับ `.wl-` `.td-` `.fin-` `.w-` ที่มีอยู่

| class | หน้าที่ | ค่าหลัก |
|---|---|---|
| `.mt-stats` | แถบสถิติ 3 ช่อง | `display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-top:8px` |
| `.mt-stat` | การ์ดสถิติ | เหมือน `.td-card` — `background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 18px` |
| `.mt-stat .k` / `.v` | label / ตัวเลข | k: mono 10.5px .1em uppercase `--ink-faint` · v: 22px 600 mono |
| `.mt-stat .v.clash` | ตัวเลขเห็นต่าง | `color:var(--flagged)` |
| `.mt-stat .v.wait` | ตัวเลขรอตัดสิน | `color:var(--gold)` |
| `.mt-list` | คอนเทนเนอร์รายการ | `display:flex;flex-direction:column;gap:14px;margin-top:26px` |
| `.mt-card` | การ์ดหัวข้อประชุม | `display:flex;text-align:left;width:100%;background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden;cursor:pointer;font:inherit;color:inherit;transition:.18s` |
| `.mt-card:hover` | | `border-color:var(--line-strong);box-shadow:var(--shadow);transform:translateY(-2px)` |
| `.mt-card:focus-visible` | a11y | `outline:2px solid var(--ink);outline-offset:2px` |
| `.mt-accent` | แถบสีซ้าย | `width:4px;flex:none` (สี inline: flagged เมื่อมี clash / done เมื่อไม่มี) |
| `.mt-card-body` | เนื้อการ์ด | `flex:1;padding:18px 20px;min-width:0;display:flex;flex-direction:column;gap:10px` |
| `.mt-card-top` | แถวบน | `display:flex;align-items:center;gap:10px;justify-content:space-between` |
| `.mt-when` | วันที่ · SOP | mono 10.5px `--ink-faint` letter-spacing .08em |
| `.mt-status` | pill สถานะ | mono 10px;padding:3px 9px;border-radius:999px;white-space:nowrap |
| `.mt-status.wait` / `.done` / `.live` | | wait: `background:rgba(154,123,79,.12);color:var(--gold)` · done: `rgba(94,122,102,.14);color:var(--done)` · live: `rgba(62,83,102,.12);color:var(--working)` |
| `.mt-topic` | หัวเรื่อง | `font-family:"Noto Sans Thai","Space Grotesk",sans-serif;font-size:18px;font-weight:600;line-height:1.35;color:var(--ink)` |
| `.mt-people` | แถวผู้ร่วม | `display:flex;align-items:center;gap:9px;flex-wrap:wrap` |
| `.mt-avs` | กองรูป | `display:flex` |
| `.mt-av` | avatar เล็ก | `width:24px;height:24px;border-radius:7px;object-fit:cover;border:1.5px solid var(--card);background:var(--paper)` · ตัวที่ 2+ `margin-left:-6px` |
| `.mt-av-ph` | fallback ตัวอักษร | `display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;border:none` |
| `.mt-names` | ชื่อผู้ร่วม | 12px `--ink-soft` |
| `.mt-clash-strip` | แถบเห็นต่างบนการ์ด | `background:rgba(122,74,58,.06);border:1px solid rgba(122,74,58,.22);border-radius:9px;padding:8px 11px;font-size:12.5px;color:var(--flagged);line-height:1.5` |
| `.mt-clash-strip b` | จำนวนจุด | `font-weight:600` |
| `.mt-concl-peek` | ข้อสรุปย่อ | `font-size:13px;color:var(--ink-soft);line-height:1.55;font-family:"Noto Sans Thai",…;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden` |
| `.mt-none` | ไม่มีข้อมูล | `font-size:12.5px;color:var(--ink-faint);font-style:italic` |
| **— ระดับ 2 —** | | |
| `.mt-back` | ปุ่มย้อนกลับ | `background:none;border:none;cursor:pointer;font:inherit;font-family:"IBM Plex Mono";font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint);padding:6px 0;margin-bottom:6px` · hover `color:var(--ink)` |
| `.mt-d-head` | หัว detail | `padding-bottom:18px;border-bottom:1px solid var(--line);margin-bottom:32px` |
| `.mt-d-topic` | หัวเรื่อง detail | `font-size:clamp(21px,2.4vw,26px);font-weight:600;line-height:1.3;letter-spacing:-.01em;font-family:"Noto Sans Thai",…` |
| `.mt-d-meta` | meta row | `display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-top:12px;font-size:12px;color:var(--ink-faint)` |
| `.mt-sec` | section | `margin-bottom:36px` |
| `.mt-sec-head` | หัว section | `display:flex;align-items:center;gap:10px;margin-bottom:16px;font-family:"IBM Plex Mono";font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-soft)` · `::after{content:"";flex:1;height:1px;background:var(--line)}` (ยืมจาก `.wl-date-marker` L410) |
| `.mt-sec-head.clash` | หัว section เห็นต่าง | `color:var(--flagged)` · เส้นเป็น `rgba(122,74,58,.25)` |
| **`.mt-clash`** | **การ์ดความเห็นต่าง** | `background:rgba(122,74,58,.05);border:1px solid rgba(122,74,58,.28);border-left:3px solid var(--flagged);border-radius:12px;padding:16px 18px;margin-bottom:12px;display:flex;flex-direction:column;gap:11px` |
| `.mt-sev` | ป้ายระดับ | `align-self:flex-start;font-family:"IBM Plex Mono";font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;padding:3px 9px;border-radius:999px` |
| `.mt-sev.blocker` | | `background:var(--flagged);color:var(--paper-2)` |
| `.mt-sev.challenge` | | `background:transparent;border:1px solid rgba(122,74,58,.4);color:var(--flagged)` |
| `.mt-sev.note` | | `background:transparent;border:1px solid var(--line-strong);color:var(--ink-faint)` |
| `.mt-clash-head` | แถวคู่ขัดแย้ง | `display:flex;align-items:center;gap:10px;flex-wrap:wrap` |
| `.mt-side` | ฝั่งหนึ่ง | `display:flex;align-items:center;gap:8px;font-size:13.5px;font-weight:600` |
| `.mt-side .mt-av` | | override เป็น `28px;height:28px;border-radius:8px;margin-left:0` |
| `.mt-vs` | ตัวคั่น | `font-family:"IBM Plex Mono";font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--flagged);padding:3px 10px;border:1px solid rgba(122,74,58,.3);border-radius:999px;white-space:nowrap` |
| `.mt-clash-point` | เนื้อความค้าน | `font-size:14px;line-height:1.65;color:var(--ink);font-family:"Noto Sans Thai",…` |
| `.mt-quote` | ประโยคอ้าง | `font-size:13px;font-style:italic;color:var(--ink-soft);border-left:2px solid rgba(122,74,58,.3);padding-left:12px;line-height:1.6` |
| `.mt-impact` | ผลกระทบ | `font-size:12.5px;color:var(--flagged);font-weight:600;line-height:1.5` · label `ผลกระทบ →` ใน `<span class="mono">` |
| `.mt-noclash` | ไม่มีความเห็นต่าง | `background:rgba(94,122,102,.07);border-left:3px solid var(--done);border-radius:12px;padding:14px 18px;font-size:13.5px;color:var(--done)` |
| `.mt-entry` | การ์ดข้อเสนอ | `background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:12px;display:flex;flex-direction:column;gap:11px` |
| `.mt-entry-head` | หัวการ์ด | `display:flex;align-items:center;gap:10px;flex-wrap:wrap` |
| `.mt-entry-name` | ชื่อ | 14px 600 |
| `.mt-entry-role` | บทบาท | 12px `--ink-soft` |
| `.mt-stance` | pill จุดยืน | mono 9.5px;padding:2px 8px;border-radius:999px;border:1px solid var(--line-strong);color:var(--ink-soft) · `.oppose{color:var(--flagged);border-color:rgba(122,74,58,.35)}` · `.support{color:var(--done);border-color:rgba(94,122,102,.35)}` |
| `.mt-fc` | สถานะ fact-check | `margin-left:auto;` mono 9.5px pill · `.pending{color:var(--gold);border-color:rgba(154,123,79,.35)}` · `.passed{color:var(--done)}` · `.failed{color:var(--flagged);font-weight:600;background:rgba(122,74,58,.1)}` |
| `.mt-proposal` | ข้อเสนอ | `font-size:14px;line-height:1.7;color:var(--ink);font-family:"Noto Sans Thai",…` |
| `.mt-keys` | รายการประเด็น | `list-style:none;display:flex;flex-direction:column;gap:7px` |
| `.mt-keys li` | | `font-size:13px;line-height:1.6;padding-left:16px;position:relative;color:var(--ink-soft)` · `::before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:var(--gold)}` |
| `.mt-counter-chip` | ชิป "ถูกค้าน" | `align-self:flex-start;background:rgba(122,74,58,.07);border:1px solid rgba(122,74,58,.25);border-radius:999px;padding:5px 11px;font-size:12px;color:var(--flagged);cursor:pointer;font:inherit` · hover `background:rgba(122,74,58,.13)` |
| `.mt-file` | ชิปไฟล์ | `align-self:flex-start;max-width:100%;font-family:"IBM Plex Mono";font-size:10.5px;color:var(--ink-faint);border:1px solid var(--line);border-radius:999px;padding:3px 9px;text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap` · hover `border-color:var(--gold);color:var(--gold)` |
| `.mt-conclusion` | กล่องข้อสรุป | `background:rgba(94,122,102,.06);border-left:3px solid var(--done);border-radius:12px;padding:16px 18px;margin-bottom:14px` |
| `.mt-conclusion h4` | | mono 10.5px .16em uppercase `--done`;margin-bottom:9px |
| `.mt-conclusion p` | | `font-size:14.5px;line-height:1.7;color:var(--ink);font-family:"Noto Sans Thai",…` |
| `.mt-decisions` | กล่องรอตัดสิน | `background:rgba(154,123,79,.06);border-left:3px solid var(--gold);border-radius:12px;padding:16px 18px` |
| `.mt-decisions h4` | | mono 10.5px .16em uppercase `--gold`;margin-bottom:9px |
| `.mt-decisions li` | | `list-style:none;font-size:14px;line-height:1.65;padding:9px 0 9px 20px;position:relative;border-bottom:1px solid rgba(154,123,79,.18)` · `:last-child{border-bottom:none}` · `::before{content:"◇";position:absolute;left:0;top:9px;color:var(--gold);font-size:12px}` |
| `.wl-meet-tag` *(P2)* | ชิปใน Work Log | เหมือน `.wl-proj-tag` แต่ `background:rgba(122,74,58,.08);border-color:rgba(122,74,58,.22);color:var(--flagged)` |

---

## 10) Responsive

breakpoint เดิมของไฟล์คือ `560px` (L456) และ `380px` (L477) · แท็บการเงิน/To Do เพิ่มของตัวเองที่ `900px`/`620px` (L236–237) — Meeting เพิ่ม **760px** หนึ่งจุด

### 10.1 `@media(max-width:760px)` — แทรกใหม่ระหว่าง L476 กับ L477

```css
@media(max-width:760px){
  .mt-clash-head{gap:8px}
  .mt-vs{order:3;width:100%;text-align:center}   /* ชื่อ 2 ฝั่งอยู่บรรทัดเดียวกัน ตัวคั่นลงบรรทัดใหม่ */
  .mt-side{font-size:13px}
  .mt-fc{margin-left:0}                          /* ไม่ดันชิดขวาแล้ว ปล่อยไหลตาม flex-wrap */
}
```

### 10.2 เพิ่มใน `@media(max-width:560px)` เดิม (แทรกหลัง L475)

```css
  .mt-stats{gap:10px}
  .mt-stat{padding:13px 15px}
  .mt-stat .v{font-size:18px}
  .mt-list{gap:12px;margin-top:20px}
  .mt-card-body{padding:15px 16px;gap:9px}
  .mt-topic{font-size:16.5px}
  .mt-names{display:none}                        /* เหลือแค่กองรูป avatar — ประหยัดบรรทัด */
  .mt-clash-strip{font-size:12px;padding:7px 10px}
  .mt-clash,.mt-entry,.mt-conclusion,.mt-decisions{padding:14px 15px}
  .mt-clash-point,.mt-proposal{font-size:13.5px}
  .mt-d-head{margin-bottom:24px}
  .mt-sec{margin-bottom:28px}
  .mt-file{font-size:10px;max-width:100%}
```

### 10.3 กติกาไทยบนมือถือ

- ทุกกล่องเนื้อความไทยใช้ `line-height` **1.6–1.7** (ไม่ใช่ 1.5 ของ body L46) เพราะสระบน/ล่างของไทยชนกันที่ 1.5
- **ห้ามใส่ `word-break:break-all`** ทุกที่ — ไทยไม่มีช่องว่างระหว่างคำ ถ้าใส่จะตัดกลางคำเละ ปล่อยให้เบราว์เซอร์ตัดเอง
- ชื่อไฟล์ (`.mt-file`) เป็น ASCII ยาว → ใช้ `white-space:nowrap` + `text-overflow:ellipsis` แทนการตัดบรรทัด
- แท็บใหม่ทำให้แถบแท็บยาวเกินจอ 560px — **ไม่ต้องแก้อะไร** เพราะ L462–464 ตั้ง `overflow-x:auto` + `white-space:nowrap` ไว้แล้ว (ตรวจแล้วว่ารองรับ 5 ปุ่มได้)

---

## 11) Accessibility & รายละเอียดที่มักลืม

- การ์ดหัวข้อเป็น `<button type="button">` → Tab เข้าถึงได้, Enter/Space เปิดได้, มี `:focus-visible` outline
- `.mt-back` มี `aria-label="กลับไปรายการประชุม"`
- Esc = ออกจาก detail (ต่อกับ listener L1226)
- ชิป `.mt-counter-chip` เป็น `<button>` ไม่ใช่ `<span onclick>`
- avatar ทุกตัวมี `alt="<ชื่อ agent>"` + `onerror` fallback เป็นตัวอักษรแรกบนพื้น gradient สี pipeline (ลอกจาก `wlEntryHTML()` L1279–1283 ได้ตรง ๆ)
- contrast ตรวจแล้ว: `--flagged #7A4A3A` บนพื้น `rgba(122,74,58,.05)` เหนือ `--paper #F4F2EE` ได้ ~6.4:1 → ผ่าน WCAG AA สำหรับตัวอักษรปกติ · `--gold #9A7B4F` บนพื้น paper ได้ ~4.0:1 → **ใช้กับ label/pill ขนาด ≥12px ตัวหนาเท่านั้น ห้ามใช้กับเนื้อความยาว** (ใน spec นี้ gold ถูกใช้แค่กับ pill กับหัว section ซึ่งผ่านเกณฑ์ large text)
- `@media(prefers-reduced-motion:reduce)` L481 ครอบ transition ทั้งหมดอยู่แล้ว — `scrollIntoView({behavior:'smooth'})` ต้องเช็กเองว่าถ้าผู้ใช้ปิด motion ให้ใช้ `'auto'`

---

## 12) Self-check ตาม SOP-10 §3

- [x] **สำรวจ asset ต้นทางก่อน** — อ่าน `index.html` ครบทุก section ที่เกี่ยวข้อง + ไฟล์ MiroFish จริง 3 ฉบับ + `worklog.json` + `avatars/`
- [x] **ล็อกค่าจริง ไม่เดา** — เลขบรรทัดทุกตัวอ้างจากไฟล์จริง · ตัวแปรสีคัดจาก `:root` จริง · ชื่อ id/class ที่อ้างถึงมีอยู่จริงทั้งหมด
- [x] **ใช้ asset จริง** — avatar 11 ไฟล์จริงในโฟลเดอร์ `avatars/` · เนื้อหา fixture คัดจากไฟล์ `.md` จริง ไม่ได้แต่งขึ้น
- [x] **ต่อของเดิมได้จริง** — ไม่เพิ่ม dependency, ไม่เพิ่มตัวแปร CSS, ไม่แตะ Work Log/Firestore เดิม, ทำตาม pattern `renderTodo()` ที่มีอยู่
- [x] **ระบุสิ่งที่ยังขาด** — ยังไม่มี `meetings.json` และยังไม่ตกลงว่าใครเป็นคนเขียน (§7.3 เสนอ Libby — **Dale ตัดสินขั้นสุดท้าย**)
- [ ] **ยังไม่ได้ทำ:** ไม่ได้แก้ `index.html` (ตามข้อกำหนดของโจทย์) และไม่ได้สร้าง `meetings.json` จริง — fixture ใน §8 พร้อมคัดลอกไปใช้ได้ทันที

---

## 13) สรุปสำหรับ Dale — ลำดับลงมือ

1. สร้าง `meetings.json` จาก fixture §8 (คัดลอกได้เลย)
2. แก้ `index.html` ตามตาราง §6 **จากล่างขึ้นบน** (#12 → #1) จะได้ไม่ต้องคำนวณเลขบรรทัดใหม่
3. เปิดหน้าเว็บ เช็ก 5 อย่าง: แท็บที่ 5 โผล่ · การ์ด MiroFish โชว์ `⚡ เห็นต่าง 2 จุด` · กดเข้าไปเห็นการ์ด BLOCKER ของ Nick อยู่บนสุด · กดชิป "ถูกค้าน" ที่การ์ด Minnie แล้วเลื่อนขึ้นไปหา clash · ย่อจอ 375px แล้วไม่มีอะไรล้น
4. push แล้วเช็กบน GitHub Pages (`.nojekyll` มีอยู่แล้ว ไม่ต้องทำอะไรเพิ่ม)
5. ถ้า schema ที่เสนอใน §7.1–7.2 มีข้อไหนไม่เอา บอกกลับมา — จะได้แก้ spec ให้ตรงก่อน Chris QA

**ข้อที่อยากให้ยืนยันมากที่สุด:** `verified: false` → `factcheck: "pending"|"passed"|"failed"` (§7.2) เพราะเอกสาร MiroFish ทั้ง 3 ฉบับยังไม่ผ่าน fact-check จริง ถ้าใช้ boolean ตามเดิม dashboard จะสื่อผิดตั้งแต่บันทึกใบแรก
