# เกียรติบัตร Express — UX Specification ฉบับสมบูรณ์ (MVP)

- **Agent:** Vera (UX/Experience Designer)
- **วันที่:** 13 กรกฎาคม 2026
- **ผู้รับมอบ:** Dale (build), Mind (template artwork), Chris (QA)
- **อ้างอิง (ต้องอ่านคู่กัน):**
  1. Concept + flow 6 ขั้น: `Output/Minnie/2026-07-13-cert-express-concept.md`
  2. ผลวิจัยเทคนิค: `Output/Reese/2026-07-13-cert-express-research.md`
  3. UI copy v2 (162 keys): `Output/Rae/2026-07-13-cert-express-ui-copy.md` — **ทุกข้อความใน UI อ้างด้วย copy key เท่านั้น ห้ามแต่งเอง**
- **Stack ที่ล็อก:** Vite + React JSX + Tailwind CSS v3 + ฟอนต์ Sarabun (UI) — client-side ล้วน, deploy GitHub Pages
- **ขอบเขต spec นี้:** โครงหน้า, wireframe, component, state machine, กติกา render preview/PDF, slot ของ template, accessibility — **ไม่รวม visual design จริงของ template เกียรติบัตร (สี/ลวดลาย = งาน Mind ตาม §10)**

---

## 0) การตัดสินใจ UX หลัก (อ่านก่อน — ทุก section อิงจากนี่)

| # | ตัดสินใจ | เหตุผล |
|---|---|---|
| D1 | **Single-page stepper แอปเดียว ไม่ใช้ router** — Landing เป็น view แรก, ขั้น 1–6 สลับ view ด้วย state `currentStep` | ไม่มี URL state ที่ต้องเก็บ (ข้อมูลอยู่ในเครื่องล้วน), ลด dependency, กัน deep-link เข้าขั้นที่ไม่มีข้อมูล |
| D2 | **State ทั้งแอปอยู่ใน store เดียว (React `useReducer` + Context)** — ย้อนขั้นไหนก็ได้ ข้อมูลไม่หาย เพราะ view เปลี่ยนแต่ store ไม่ถูกล้าง | ตอบโจทย์ concept ขั้น 5: "แก้อะไรก็ย้อนกลับขั้น 2–4 ได้โดยรายชื่อไม่หาย" |
| D3 | ดัก **ปุ่ม Back ของเบราว์เซอร์** ด้วย `history.pushState` ต่อขั้น + `popstate` → เรียก `goToStep()` และดัก **ปิด/รีเฟรชหน้า** ด้วย `beforeunload` เมื่อ `names.length > 0` และยังไม่ export สำเร็จ | ผู้ใช้มือถือกด back ติดมือ — ห้ามให้รายชื่อ 80 คนหายเพราะกดพลาด |
| D4 | **Preview กับ PDF ใช้ layout constants ชุดเดียวกัน** (`src/cert/layoutConstants.js` หน่วย mm/pt) — CertPreview (HTML/CSS) และ pdfmake builder อ่านไฟล์เดียวกัน ห้าม hard-code ตำแหน่งซ้ำสองที่ | แก้ risk อันดับ 1 ของ Reese: "Preview ≠ PDF จริง" |
| D5 | **Slot geometry ชุดเดียวใช้ร่วมทุก template ใน MVP** — template ต่างกันที่ artwork พื้นหลัง + ฟอนต์ชื่อผู้รับ + สีตัวอักษร เท่านั้น | ลด surface ของบั๊ก parity, Mind ออกแบบง่าย, เพิ่ม template ใหม่ = เพิ่ม artwork ไม่แตะโค้ด layout |
| D6 | **กล่องวางรายชื่อ (PasteBox) เป็น first-class เท่ากับ dropzone** — มองเห็นตลอดในขั้น 1 ไม่ซ่อนหลัง toggle | Reese ยืนยัน: clipboard fallback คือทางรอดเดียวเมื่อ parser พลาด + ข้อควรระวัง Rae ข้อ 2 |
| D7 | โหลด parser แบบ **dynamic import ตามนามสกุลไฟล์** และโหลด pdfmake+ฟอนต์เมื่อเข้าขั้น 6 เท่านั้น — UI ต้องมี loading state รองรับการโหลด lib (ไม่ใช่แค่การอ่านไฟล์) | ตาม bundle strategy ของ Reese Q7 — first load เบาบนมือถือครู |
| D8 | ฟอนต์ที่ใช้วัด auto-fit ใน preview = **ไฟล์ .ttf ชุดเดียวกับที่ฝังใน pdfmake vfs** และรอ `document.fonts.ready` ก่อนวัด | metrics ตรงกัน 100% ระหว่างจอกับไฟล์จริง |

---

## 1) Sitemap / โครงหน้า + Navigation

### 1.1 โครงหน้า

```
เกียรติบัตร Express (SPA หน้าเดียว)
│
├─ View: Landing (ขั้น 0)          ← ไม่มี stepper
│
└─ View: Wizard (ขั้น 1–6)         ← มี StepperBar เสมอ
   ├─ ขั้น 1  อัปโหลดรายชื่อ   (nav.step1)
   ├─ ขั้น 2  ตรวจรายชื่อ      (nav.step2)
   ├─ ขั้น 3  เลือกแบบ         (nav.step3)
   ├─ ขั้น 4  ใส่ข้อความ       (nav.step4)
   ├─ ขั้น 5  ดูตัวอย่าง       (nav.step5)
   └─ ขั้น 6  ดาวน์โหลด        (nav.step6)

ทุก view มี: header (app.name + app.privacyBadge) และ footer
(footer.upsellLine / footer.credit / footer.privacy)
Modal ที่ลอยเหนือทุก view: TemplatePreviewModal, PremiumContactModal, ConfirmDialog
```

### 1.2 กติกา navigation ระหว่างขั้น

- **ไปหน้า:** ปุ่ม `common.next` (หรือปุ่มเฉพาะขั้น เช่น `review.nextButton`) — ผ่าน guard ของขั้นนั้นก่อน (ดู state machine §6)
- **ย้อนกลับ:** ปุ่ม `common.back` มุมซ้ายของแถบปุ่มล่างทุกขั้น (ขั้น 1 ย้อนกลับ Landing) — ย้อนได้เสมอ ไม่มี guard, **store ไม่ถูกแตะ**
- **StepperBar คลิกได้:** ขั้นที่เคยผ่านแล้ว (`step ≤ maxReachedStep`) กดกระโดดได้ทันที; ขั้นที่ยังไม่ถึง = disabled (aria-disabled)
- **ทางลัดในขั้น 5:** ลิงก์ `preview.editShortcut.names` / `.template` / `.text` กระโดดกลับขั้น 2/3/4 — กลับมาขั้น 5 ด้วย stepper หรือปุ่มถัดไปตามปกติ preview จะ re-render จาก store ล่าสุด
- **`export.startOver`:** ปุ่มเดียวที่ล้าง store — ต้องผ่าน ConfirmDialog (`export.startOver.confirm`, ปุ่ม `common.confirm`/`common.cancel`) ก่อนเสมอ

### 1.3 Store shape (สัญญาข้อมูลระหว่างขั้น)

```js
{
  currentStep: 0–6,
  maxReachedStep: 0–6,
  source: 'docx' | 'xlsx' | 'pdf' | 'paste' | null,   // ใช้ตัดสินการโชว์ upload.warning.pdfAccuracy
  names: [{ id, text, flags: { duplicate, suspicious } }],
  templateId: null | 'formal' | 'buddhist' | 'corporate' | 'p-…',
  fields: { org, certify, achievement, blessing, date,   // ไม่มี field "event" — ชื่องานรวมอยู่ใน achievement (ดู Revision v1.1)
            signer1: {name, position}, signer2: {name, position} | null },
  logo: { dataUrl, widthPx, heightPx } | null,
  previewIndex: number,
  exportState: 'idle' | 'generating' | 'success' | 'error',
}
```

- เข้าขั้น 4 ครั้งแรก: `fields` ถูก prefill ด้วย `cert.default.<templateId>.*` ของ template ที่เลือก — ถ้าผู้ใช้แก้แล้วเปลี่ยน template ให้**คงข้อความที่ผู้ใช้แก้ไว้** (เปลี่ยนเฉพาะช่องที่ยังเป็นค่า default เดิม) และมีปุ่ม `customize.reset` ให้กลับ default ของ template ปัจจุบันทั้งชุด

---

## 2) Design tokens

### 2.1 Breakpoints (Tailwind v3 default — mobile-first)

| ชื่อในเอกสารนี้ | ช่วง | Tailwind prefix | ออกแบบที่ความกว้าง |
|---|---|---|---|
| **Mobile** | ≤639px | (base) | 360px, ทดสอบต่ำสุด 320px |
| **Tablet** | 640–1023px | `sm:` (640) / `md:` (768) | 768px |
| **Desktop** | ≥1024px | `lg:` (1024) / `xl:` (1280) | 1280px |

Container กลาง: `mx-auto px-4 sm:px-6 lg:px-8` + ความกว้างตามชนิดขั้น
— ขั้นฟอร์ม/ตาราง (1,2,4,6): `max-w-3xl` — ขั้นภาพ (Landing, 3, 5): `max-w-5xl`

### 2.2 Spacing scale (ใช้เฉพาะค่าเหล่านี้ — จังหวะเดียวทั้งแอป)

| บทบาท | Mobile | Tablet | Desktop |
|---|---|---|---|
| ระยะขอบแนวตั้งของหน้า | `py-6` | `py-8` | `py-10` |
| ช่องไฟระหว่าง section ในขั้น | `gap-6` | `gap-6` | `gap-8` |
| ช่องไฟภายใน card/กล่อง | `p-4` | `p-5` | `p-6` |
| ช่องไฟระหว่าง field ในฟอร์ม | `gap-4` | `gap-4` | `gap-5` |
| ช่องไฟ label→input | `gap-1.5` | เท่ากัน | เท่ากัน |
| ช่องไฟระหว่างการ์ดใน grid | `gap-4` | `gap-5` | `gap-6` |

จัด layout ด้วย `flex`/`grid` + `gap` เท่านั้น — **ห้ามใช้ margin ต่อ element** (กัน margin collapse ทำ layout กระโดด)

### 2.3 Typography (Sarabun — ทุกขนาดต้อง line-height ≥1.6 ตามกติกาไทย)

Tailwind config ที่ต้องตั้ง:

```js
// tailwind.config.js
theme: {
  extend: {
    fontFamily: { sans: ['Sarabun', 'Noto Sans Thai', 'sans-serif'] },
    lineHeight: { thai: '1.7' },
  },
}
```

| Role | Mobile | Tablet/Desktop | Line-height | ใช้กับ |
|---|---|---|---|---|
| H1 (หัวขั้น เช่น `upload.title`) | `text-2xl font-semibold` (24) | `lg:text-3xl` (30) | `leading-thai` | StepHeader |
| H1-Landing (`landing.headline`) | `text-3xl font-bold` (30) | `sm:text-4xl lg:text-5xl` | `leading-thai` + `text-balance` | Landing เท่านั้น |
| H2 (หัว section/modal) | `text-lg font-semibold` (18) | `lg:text-xl` (20) | `leading-thai` | `upsell.title`, `template.premium.lockTitle` |
| Body (`*.instruction`, เนื้อ alert) | `text-base` (16) | เท่ากัน | `leading-relaxed` (1.625) | เนื้อความทั่วไป |
| Small (`*.hint`, `upload.fileTypes`, footer) | `text-sm` (14) | เท่ากัน | `leading-relaxed` | ข้อความช่วย |
| ปุ่ม | `text-base font-medium` | เท่ากัน | `leading-normal` แต่ปุ่มสูง ≥44px | ทุกปุ่ม |
| ตัวเลขนับ (`review.count`, `preview.counter`, progress) | เพิ่ม `tabular-nums` | เท่ากัน | — | เลขไม่กระตุกตอนเปลี่ยนค่า |

**กติกาไทยบังคับ (Definition of Done ระดับ CSS):**
1. ห้ามใช้ `leading-none`, `leading-tight`, `leading-snug` กับข้อความไทยทุกกรณี — วรรณยุกต์ชั้นบน (น้ำ, ปั้น) จะชนบรรทัดบน
2. ห้าม `truncate` / `text-overflow: ellipsis` / `line-clamp` กับชื่อคนและข้อความบนเกียรติบัตรทุกจุด — ตัดกลางคำไทยอ่านเพี้ยนทันที ให้ **wrap ลงบรรทัดใหม่** แทน (ปุ่ม/หัวตารางยาวก็ wrap ได้ ดู §12 ข้อ 5)
3. ข้อความไทยย่อหน้ายาว (`review.instruction`, `upsell.body`, ข้อความรับรองบนเกียรติบัตร): แทรก zero-width space ที่ขอบเขตคำด้วย `Intl.Segmenter('th', {granularity:'word'})` ก่อน render (util กลาง `thaiWrap()` ใช้ทั้ง UI และก่อนส่งเข้า pdfmake — ตาม Reese Q10 ข้อ 4) + CSS `overflow-wrap: normal; word-break: normal` — **ห้าม `break-all`**

**วิธีทดสอบ wrap (Chris ใช้เป็น QA checklist):**
1. ชุดสตริงทดสอบ (ชุดเดียวกับ POC-1 ของ Reese): `น้ำ` `คล้ำ` `ปั้น` `กตัญญู` `นางสาวฐิติญาภรณ์` `John สมชาย ที่ 1` `ว่าที่ร้อยตรีหญิงกัลยรัตน์ ศรีสุริยวงศ์สกุล` + `cert.default.buddhist.blessing` (ย่อหน้ายาวสุดในระบบ)
2. เปิด DevTools responsive ที่ 320 / 360 / 390 / 768 / 1280px — ทุกสตริงต้อง (ก) ไม่ถูกตัดกลางคำ (ข) ไม่ล้นกล่องจน scroll แนวนอน (ค) วรรณยุกต์ไม่ชนบรรทัดบน (ซูม 200% ดู)
3. วางสตริงทดสอบลง PasteBox → ไล่ครบ 6 ขั้นจนถึง preview — `cert.sampleName` ต้องผ่าน auto-fit ตาม §8.4

### 2.4 Color tokens (บทบาท + เกณฑ์ contrast — ค่าสีจริงของ *template เกียรติบัตร* เป็นของ Mind, ค่าด้านล่างคือ UI ของแอป)

| Token | ค่าเริ่มต้น (Tailwind) | ใช้กับ | Contrast ขั้นต่ำ |
|---|---|---|---|
| `ink` | `slate-800` บนพื้น `white`/`slate-50` | ตัวอักษรหลัก | ≥7:1 |
| `ink-muted` | `slate-600` | hint, บริบทรอง | ≥4.5:1 |
| `primary` | `emerald-700` (ตัวอักษรขาว) | ปุ่มหลัก, ขั้น active ใน stepper | ≥4.5:1 |
| `success` | พื้น `green-50` ขอบ `green-600` อักษร `green-800` | `upload.success`, หน้า export สำเร็จ | ≥4.5:1 |
| `warning` | พื้น `amber-50` ขอบ `amber-500` อักษร `amber-900` | `upload.warning.pdfAccuracy`, `review.warning.*`, `customize.logo.disclaimer`, แถวไฮไลต์ในตาราง | ≥4.5:1 |
| `danger` | พื้น `red-50` ขอบ `red-600` อักษร `red-800` | `*.error.*` ทุกตัว | ≥4.5:1 |
| `info` | พื้น `sky-50` ขอบ `sky-600` อักษร `sky-900` | `preview.autofit.notice` (Rae กำกับ: สีฟ้า ไม่ใช่ error) | ≥4.5:1 |
| `line-brand` | พื้น `#06C755` (เขียว LINE ทางการ) **ตัวอักษร `#073B1E`** | ปุ่ม LINE ทุกจุด | เขียวอ่อน+อักษรเขียวเข้ม ≈5.7:1 ✓ (ขาวบน #06C755 แค่ ~2.3:1 — ห้ามใช้) |

Alert ทุก variant ต้องมี **ไอคอน + สีขอบ** ไม่ใช่สีพื้นอย่างเดียว (ผู้ใช้ตาบอดสีแยก warning/error ได้)

### 2.5 Touch target + ปุ่ม

- ทุก interactive element สูง **≥44px**: ปุ่มหลัก `h-12` (48px), ปุ่มรอง/ไอคอนในตาราง `h-11 w-11` (44px)
- ปุ่มที่มีตัวเลข dynamic (`review.nextButton`, `export.button`): `inline-flex px-6 w-full sm:w-auto` — **ห้าม fixed width** (ข้อควรระวัง Rae ข้อ 5) ตัวเลขใช้ `tabular-nums`; ถ้ายาวเกินจอ 320px ให้ wrap เป็น 2 บรรทัด ไม่ตัดข้อความ
- แถบปุ่มล่างของทุกขั้น (BottomBar): mobile = ปุ่มหลักเต็มแถวอยู่บน, `common.back` เต็มแถวอยู่ล่าง (แบบ ghost); ≥sm = `common.back` ชิดซ้าย ปุ่มหลักชิดขวา

---

## 3) Wireframes ต่อหน้า ต่อ breakpoint

สัญลักษณ์: `[ ]` = ปุ่ม/ช่องกรอก, `( )` = key ของ copy, `▓` = ภาพ/preview, `┄` = เส้นคั่น

### 3.0 Landing (ขั้น 0)

**Mobile (≤639):**
```
┌──────────────────────────────┐
│ app.name          (logo ซ้าย)│ ← header sticky ไม่จำเป็น (หน้าเดียวสั้น)
│ (app.by)                     │
├──────────────────────────────┤
│ (app.privacyBadge)   แถบเทา  │
├──────────────────────────────┤
│  landing.headline  (H1)      │
│  landing.subhead   (body)    │
│                              │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ ← ภาพตัวอย่างเกียรติบัตรสำเร็จ 1 ใบ
│  ▓ (render จาก CertPreview ▓ │   (ใช้ template formal + cert.default.formal.*
│  ▓  ด้วย cert.sampleName)  ▓ │    + cert.sampleName — ไม่ใช่ภาพ mock ตาย)
│                              │
│ [   landing.cta   ] h-12 เต็ม│
│  landing.privacyLine (small) │
├──────────────────────────────┤
│  landing.how.title (H2)      │
│ ┌──────────────────────────┐ │
│ │ ① landing.how.1          │ │ ← การ์ด 3 ใบเรียงแนวตั้ง gap-4
│ ├──────────────────────────┤ │   (เลข ①②③ ใช้ได้ — เป็นลำดับจริง)
│ │ ② landing.how.2          │ │
│ ├──────────────────────────┤ │
│ │ ③ landing.how.3          │ │
│ └──────────────────────────┘ │
│  landing.trust (small)       │
├──────────────────────────────┤
│ footer.upsellLine            │
│ footer.credit / footer.privacy│
└──────────────────────────────┘
```

**Tablet (640–1023):** เหมือน mobile แต่การ์ด how เป็น `sm:grid-cols-3`; ภาพตัวอย่างกว้างสุด `max-w-xl`

**Desktop (≥1024):**
```
┌────────────────────────────────────────────────────────────┐
│ app.name + app.by                    (app.privacyBadge)    │
├────────────────────────────────────────────────────────────┤
│  ┌───────────────────────┐   ┌───────────────────────────┐ │
│  │ landing.headline (H1) │   │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │ ← 2 คอลัมน์ grid-cols-2
│  │ landing.subhead       │   │ ▓ ตัวอย่างเกียรติบัตร   ▓ │ │   ซ้ายข้อความ ขวาภาพ
│  │ [ landing.cta ]       │   │ ▓ (CertPreview จริง)    ▓ │ │
│  │ landing.privacyLine   │   └───────────────────────────┘ │
│  └───────────────────────┘                                 │
│  landing.how.title                                         │
│  [① how.1]   [② how.2]   [③ how.3]      ← grid-cols-3     │
│  landing.trust                                             │
├────────────────────────────────────────────────────────────┤
│ footer (3 บรรทัด)                                          │
└────────────────────────────────────────────────────────────┘
```

### 3.W โครงร่วมของ Wizard (ขั้น 1–6 ทุกขั้น)

**Mobile:**
```
┌──────────────────────────────┐
│ app.name        (แตะ=Landing)│
├──────────────────────────────┤
│ ขั้น {n}/6 · (nav.step{n})   │ ← StepperBar compact (ข้อควรระวัง Rae ข้อ 9)
│ ████████░░░░░░░░  progress   │   แถบ progress สูง 4px, เลข tabular-nums
├──────────────────────────────┤
│ (…title)   StepHeader H1     │ ← โฟกัสย้ายมาที่นี่ทุกครั้งที่เปลี่ยนขั้น (§11)
│ (…instruction)               │
│                              │
│        เนื้อหาของขั้น        │
│                              │
├──────────────────────────────┤
│ [    ปุ่มหลักของขั้น    ]    │ ← BottomBar ใน flow ปกติ (ไม่ sticky —
│ [    common.back (ghost) ]   │    error ยาวจะดันหน้าได้ ไม่ทับกัน)
├──────────────────────────────┤
│ footer                       │
└──────────────────────────────┘
```

**Tablet/Desktop:** StepperBar แสดงครบ 6 ขั้นแนวนอน (`md:` ขึ้นไป):
```
① อัปโหลดรายชื่อ ─ ② ตรวจรายชื่อ ─ ③ เลือกแบบ ─ ④ ใส่ข้อความ ─ ⑤ ดูตัวอย่าง ─ ⑥ ดาวน์โหลด
(ผ่านแล้ว=สี primary+✓ คลิกได้ / ปัจจุบัน=เข้ม aria-current / ยังไม่ถึง=จาง disabled)
```
BottomBar ≥sm: `common.back` ซ้าย — ปุ่มหลักขวา

### 3.1 ขั้น 1 — อัปโหลดรายชื่อ

**Mobile:**
```
│ upload.title / upload.instruction
│
│ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
│ ╎  ⬆ upload.dropzone        ╎  ← เส้นประ กรอบสูง ≥160px แตะทั้งกล่อง
│ ╎  [ upload.browseButton ]  ╎     ได้ (เปิด file picker); ตอน dragover
│ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘     เปลี่ยนเฉพาะสีขอบ/พื้น (ไม่มี copy ใหม่)
│  upload.fileTypes (small)
│  upload.privacyReminder (small)
│
│ ┄┄┄ upload.pasteDivider ┄┄┄     ← เส้นคั่น+ข้อความ เห็นชัด (D6)
│
│ upload.pasteLabel
│ ┌──────────────────────────┐
│ │ upload.pastePlaceholder  │  ← textarea 6 แถว มองเห็นตลอด ไม่พับเก็บ
│ │                          │
│ └──────────────────────────┘
│ [ upload.pasteButton ]  h-12 เต็มแถว
│
│ ── โซน feedback (ใน flow ใต้ตัวที่ทำงาน) ──
│ (loading:  spinner + upload.loading.reading → .extracting)
│ (success:  AlertBanner เขียว upload.success + auto ไปขั้น 2 ใน 800ms)
│ (warning:  AlertBanner เหลือง upload.warning.pdfAccuracy — อยู่ร่วมกับ success ได้)
│ (error:    AlertBanner แดง upload.error.* — แสดงใต้กล่องที่เป็นต้นเหตุ
│            แล้ว scrollIntoView; ไม่ใช้ toast เพราะข้อความยาว 2–3 บรรทัด)
│
│ [ common.back ]   (ไม่มีปุ่ม next — สำเร็จแล้วไปเอง)
```

**Tablet/Desktop (≥768):** dropzone กับ PasteBox วาง **2 คอลัมน์กว้างเท่ากัน** (`md:grid-cols-2 gap-6`) — ตอกย้ำศักดิ์เท่ากัน; `upload.pasteDivider` เปลี่ยนเป็น divider แนวตั้งพร้อมข้อความกึ่งกลาง; โซน feedback กว้างเต็มใต้ทั้งสองคอลัมน์

### 3.2 ขั้น 2 — ตรวจ/แก้รายชื่อ

**Mobile:**
```
│ review.title / review.instruction
│ (ถ้า source==='pdf': AlertBanner เหลือง upload.warning.pdfAccuracy ค้างไว้บนสุด)
│
│ review.count ("พบ 47 รายชื่อ")  ← H2 + tabular-nums, อัปเดตสดเมื่อเพิ่ม/ลบ
│ (มี duplicate: AlertBanner เหลือง review.warning.duplicate)
│ (มีแถวน่าสงสัย: AlertBanner เหลือง review.warning.suspicious)
│
│ ┌────────────────────────────┐
│ │ # │ ชื่อ-นามสกุล…    │ 🗑  │ ← หัวตาราง review.tableHeader.* — หัวคอลัมน์
│ ├───┼──────────────────┼─────┤    ชื่อยาว: wrap 2 บรรทัด ห้าม truncate
│ │ 1 │ [input inline]   │[🗑] │ ← แก้ตรงในช่อง (input เต็ม cell);
│ │ 2 │ [input ⚠เหลือง]  │[🗑] │    แถว duplicate/suspicious = พื้นเหลือง+ไอคอน ⚠
│ │ … │                  │     │    ปุ่มลบ 44×44 aria-label=review.deleteRow
│ ├───┴──────────────────┴─────┤
│ │ [review.addButton]         │ ← แถวสุดท้ายถาวร + review.addPlaceholder
│ └────────────────────────────┘
│ (เลือกหลายแถวด้วย checkbox → แถบลอยล่าง [review.deleteSelected])
│ (ลบแล้ว: Toast review.undoToast + ปุ่ม review.undo — ค้าง 6 วิ)
│ (ตารางว่าง: EmptyState review.empty แทนตาราง)
│ (กด next ตอนว่าง: AlertBanner แดง review.error.emptyNext เหนือ BottomBar)
│
│ [ review.nextButton ("ใช้รายชื่อ 47 คนนี้ →") ]
│ [ common.back ]
```

- ตารางยาว: ความสูงตารางไม่จำกัด (scroll ตามหน้า) — **ไม่ทำ virtual scroll ใน MVP** (≤300 รายชื่อไหว); เกิน 300 ชื่อค่อยว่ากันเฟสหน้า
- ตารางกว้างเกินจอเล็ก: ห่อด้วย `overflow-x-auto` เฉพาะกล่องตาราง — ตัวหน้า **ห้าม scroll แนวนอน**

**Tablet/Desktop:** โครงเดียวกัน `max-w-3xl`; คอลัมน์ # กว้าง 48px, ปุ่มลบชิดขวา; checkbox โผล่ตอน hover/focus-within (mobile แสดงตลอด)

### 3.3 ขั้น 3 — เลือก template

**Mobile (grid 1 คอลัมน์):**
```
│ template.title / template.instruction
│
│ ┌──────────────────────────┐
│ │ ▓▓▓ thumbnail 297:210 ▓▓ │ ← aspect-[297/210] เรนเดอร์จาก CertPreview
│ │ [ฟรี]                    │    (cert.sampleName + default text ของ template)
│ │ template.free1.name (H2) │    badge มุมซ้ายบน: template.badge.free
│ │ template.free1.desc      │
│ │ [template.previewButton] [template.useButton] │
│ └──────────────────────────┘
│  … ฟรีอีก 2 ใบ …
│ ┌──────────────────────────┐
│ │ ▓▓ thumbnail + ลายน้ำ ▓▓ │ ← พรีเมียม: ลายน้ำ template.premium.watermark
│ │ [พรีเมียม] 🔒            │    ทแยง 45° ทับ thumbnail + ไอคอนกุญแจ
│ │ ชื่อ+รหัส / desc         │    overlay ล่าง: template.premium.notice
│ │ [template.previewButton] [ติดต่อซื้อ→เปิด modal] │
│ └──────────────────────────┘
│
│ การ์ดที่เลือกแล้ว: ขอบ primary หนา 2px + แถบ template.selected
│ (กด next โดยยังไม่เลือก: AlertBanner แดง template.error.notSelected)
│ [ common.next ]  [ common.back ]
```

**Tablet:** `sm:grid-cols-2` — **Desktop:** `lg:grid-cols-3` (ฟรี 3 ใบขึ้นแถวแรกพอดี พรีเมียมต่อแถวถัดไป)

**TemplatePreviewModal (ทุก breakpoint):** ภาพเต็ม 297:210 กว้างสุด `max-w-4xl`, ปุ่ม `common.close` (44px, มุมขวาบน), ล่าง: ฟรี = `template.useButton` / พรีเมียม = เนื้อหาเดียวกับ PremiumContactModal ด้านล่าง

**PremiumContactModal:**
```
│ template.premium.lockTitle (H2)
│ template.premium.lockBody ({templateName}, {code})
│ [ template.premium.lineButton ]   ← พื้นเขียว LINE, อยู่บนเสมอ (Rae ข้อ 8)
│ [ template.premium.emailButton ]  ← secondary
│ template.premium.emailNote (small ใต้ปุ่มอีเมล)
│ [ common.close ]
```
- Mobile: ปุ่มซ้อนแนวตั้งเต็มกว้าง — Desktop: ยังคง**ซ้อนแนวตั้ง** (LINE บนตาม Rae; ไม่วางคู่แนวนอนเพื่อไม่สลับลำดับความสำคัญ)
- ปุ่ม LINE: เปิด `{LINE_OA_URL}` + prefill `template.premium.prefill`; ปุ่มอีเมล: `mailto:{CONTACT_EMAIL}?subject=template.premium.emailSubject&body=template.premium.prefill`

### 3.4 ขั้น 4 — ใส่ข้อความ + โลโก้

**Mobile (คอลัมน์เดียว: preview ย่อ → ฟอร์ม):**
```
│ customize.title / customize.instruction ({count} จาก store)
│
│ ▓▓▓ Live preview ย่อ ▓▓▓        ← CertPreview กว้างเต็ม container,
│ (cert.sampleName + fields สด)      sticky top-0 ไม่ทำ (จอเล็กกินที่) —
│                                    วางบนสุด เลื่อนกลับขึ้นมาดูได้
│ ── ฟอร์ม (gap-4) ──
│ customize.org.label*      [input  customize.org.placeholder]
│ customize.certify.label*  [input]
│ customize.achievement.label [input]
│ customize.blessing.label  [textarea 2 แถว]
│ customize.date.label*     [input  customize.date.placeholder]
│                            customize.date.hint (small)
│ ┄ ผู้ลงนาม ┄
│ customize.signer1.name.label*     [input + placeholder]
│ customize.signer1.position.label* [input + placeholder]
│ [ customize.signer2.toggle ]      ← กดแล้วเปิด field คู่ที่ 2 + ปุ่ม
│                                      customize.signer2.remove
│ ┄ โลโก้ ┄
│ customize.logo.label
│ [ customize.logo.button ]  (มีโลโก้แล้ว: thumbnail 64px + [customize.logo.remove])
│ customize.logo.hint (small)
│ ⚠ customize.logo.disclaimer      ← AlertBanner เหลือง "ติดปุ่มอัปโหลดเสมอ
│                                     มองเห็นโดยไม่ hover" (Rae ข้อ 4 — บังคับ)
│ (logo error: AlertBanner แดง customize.logo.error.type /
│  warning ไม่บล็อก: เหลือง customize.logo.error.small)
│
│ [ customize.reset ] (ghost, ผ่าน ConfirmDialog สั้น common.confirm/cancel)
│ (field บังคับว่างตอนกด next: AlertBanner แดง customize.error.required
│  ที่ field แรกที่พลาด + scrollIntoView + focus ที่ input นั้น)
│ [ common.next ]  [ common.back ]
```
`*` = ช่องบังคับ (org, certify, date, signer1.name, signer1.position — ตาม `customize.error.required`)

**Desktop (≥1024): 2 คอลัมน์ `lg:grid-cols-[1fr,minmax(420px,45%)]`**
```
│ ┌── ฟอร์ม (ซ้าย เลื่อนได้) ──┐  ┌── preview (ขวา sticky top-6) ──┐
│ │ field ทั้งหมดเรียงเหมือน   │  │ ▓ CertPreview อัปเดตสดทุก      │
│ │ mobile                     │  │   keystroke (debounce 150ms)   │
│ └────────────────────────────┘  └────────────────────────────────┘
```
**Tablet:** เหมือน mobile (คอลัมน์เดียว) — จอ 768 ยังแคบไปสำหรับ preview ข้างฟอร์มที่อ่านออก

### 3.5 ขั้น 5 — Preview ทุกใบ

**Mobile:**
```
│ preview.title / preview.instruction
│ (มีใบโดน auto-fit: AlertBanner ฟ้า preview.longNames.summary
│  — แตะแล้วกระโดดไปใบแรกที่โดน, แตะซ้ำ = ใบถัดไปวน)
│
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← CertPreview ใบปัจจุบัน กว้างเต็ม
│ ▓  (ใบของชื่อจริงทีละใบ)  ▓     container, แตะ = ขยายเต็มจอ (modal)
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
│ (ใบนี้โดนย่อ: AlertBanner ฟ้า preview.autofit.notice ใต้ภาพ)
│
│ [preview.prev]  ใบที่ 3 จาก 47 — ชื่อ  [preview.next]   ← preview.counter
│                                            (ปุ่ม 44px, ปัดซ้าย-ขวาบนภาพได้ด้วย)
│ [ preview.jumpTo ▾ ]        ← combobox พิมพ์กรองรายชื่อ เลือกแล้วกระโดด
│
│ ทางลัด: preview.editShortcut.names · .template · .text   (ลิงก์ 3 ตัว)
│ (loading ระหว่างเตรียม: skeleton ขนาด 297:210 + preview.loading)
│
│ [ preview.confirmButton ]  [ common.back ]
```

**Tablet/Desktop:** ภาพกว้างสุด `max-w-3xl` กึ่งกลาง; แถว counter+ปุ่มอยู่ใต้ภาพ; ≥lg เพิ่ม **filmstrip แนวนอน** ใต้ controls: thumbnail ใบละ ~96px, `overflow-x-auto` ในกล่องตัวเอง, ใบปัจจุบันขอบ primary — คีย์บอร์ด ←/→ เลื่อนใบได้ (ประกาศใน aria-live)

### 3.6 ขั้น 6 — Export + Upsell

**Mobile — 3 สถานะ:**
```
สถานะ idle:
│ export.title
│ ┌──────────────────────────┐
│ │ export.summary           │ ← การ์ดสรุป ({count}, {templateName})
│ └──────────────────────────┘
│ [ export.button ("ดาวน์โหลด PDF ทั้งชุด (47 ใบ)") ]  h-12 เต็มแถว
│ [ common.back ]

สถานะ generating:
│ export.loading ("กำลังสร้าง… ใบที่ 12 จาก 47")  ← aria-live=polite
│ ████████░░░░░░░░ ProgressBar (%)                  tabular-nums
│ export.loading.note (small)
│ (ปุ่มทั้งหมด disabled; beforeunload ยังดักอยู่)

สถานะ success:
│ export.success.title (H2)
│ export.success.body ({count}, {fileName})
│ [ export.downloadAgain ] (secondary)
│ ┌──────────────────────────┐
│ │ upsell.title (H2)        │ ← UpsellCard — จุดขายเดียวที่เด่นสุดของหน้า
│ │ upsell.body              │
│ │ [ upsell.lineButton ]    │ ← เขียว LINE + prefill upsell.linePrefill
│ └──────────────────────────┘
│ [ export.startOver ] (ghost → ConfirmDialog export.startOver.confirm)

สถานะ error:
│ AlertBanner แดง export.error.failed ({batchSize})
│ [ export.button ] (กดซ้ำได้ — store ยังครบ)
│ [ common.back ]
```

**Tablet/Desktop:** การ์ดสรุป + ปุ่มกว้างสุด `max-w-xl` กึ่งกลาง; UpsellCard กว้างเท่ากัน

---

## 4) Component inventory

| Component | Props หลัก | States | Copy keys ที่ใช้ |
|---|---|---|---|
| `AppShell` | `children` | — | `app.name`, `app.by`, `app.privacyBadge`, `footer.*` |
| `StepperBar` | `current`, `maxReached`, `onNavigate` | per-step: done / current / locked | `nav.step1–6` |
| `StepHeader` | `titleKey`, `instructionKey`, `values` | — | `*.title`, `*.instruction` |
| `Button` | `variant: primary\|secondary\|ghost\|line-brand`, `type`, `disabled`, `loading` | default / hover / focus-visible / disabled / loading (spinner แทนไอคอน ข้อความคงอยู่) | ตามจุดใช้ |
| `AlertBanner` | `variant: success\|warning\|danger\|info`, `messageKey`, `values`, `onAction?` | static; เข้าด้วย fade 150ms | ทุก `*.error.*`, `*.warning.*`, `upload.success`, `preview.autofit.notice` ฯลฯ |
| `Toast` | `messageKey`, `values`, `actionKey?`, `onAction`, `duration=6000` | visible / leaving | `review.undoToast` + `review.undo`, `common.close` |
| `ConfirmDialog` | `bodyKey`, `values`, `onConfirm`, `onCancel` | open / closed (focus trap) | `export.startOver.confirm`, `common.confirm`, `common.cancel` |
| `Dropzone` | `accept`, `maxSizeMB`, `onFile` | idle / dragover / loading(reading→extracting) / error | `upload.dropzone`, `upload.browseButton`, `upload.fileTypes`, `upload.privacyReminder`, `upload.loading.*`, `upload.error.*` |
| `PasteBox` | `onSubmit` | idle / error(empty) | `upload.pasteLabel`, `upload.pastePlaceholder`, `upload.pasteButton`, `upload.error.pasteEmpty`, `upload.pasteDivider` |
| `NameTable` | `names`, `onEdit`, `onDelete`, `onAdd`, `onDeleteSelected` | filled / empty / has-warnings | `review.tableHeader.*`, `review.addButton`, `review.addPlaceholder`, `review.deleteRow`, `review.deleteSelected`, `review.empty` |
| `NameRow` | `index`, `value`, `flags`, `selected` | normal / flagged(เหลือง+⚠) / editing / selected | — (input มี aria-label จากหัวคอลัมน์) |
| `TemplateGrid` | `templates`, `selectedId`, `onSelect`, `onPreview` | loading(skeleton) / ready | — |
| `TemplateCard` | `template {id, code, nameKey, descKey, tier}`, `selected` | free / premium(locked+ลายน้ำ) / selected | `template.badge.*`, `template.free*.name/desc`, `template.selected`, `template.useButton`, `template.previewButton`, `template.premium.notice`, `template.premium.watermark` |
| `TemplatePreviewModal` | `template`, `onUse`, `onClose` | open free / open premium | ชุดเดียวกับ card + PremiumContact |
| `PremiumContactModal` | `template` | open / closed | `template.premium.lockTitle/lockBody/lineButton/emailButton/emailNote/prefill/emailSubject`, `common.close` |
| `CustomizeForm` | `fields`, `errors`, `onChange` | pristine / dirty / has-error | `customize.*` ทั้งชุด |
| `TextField` | `labelKey`, `placeholderKey`, `hintKey?`, `required`, `multiline?`, `error?` | default / focus / error / disabled | ตาม field |
| `LogoUploader` | `logo`, `onUpload`, `onRemove` | empty / has-logo / error(type) / warning(small) | `customize.logo.*` (disclaimer แสดงถาวรทุก state) |
| `CertPreview` | `templateId`, `fields`, `name`, `logo`, `widthPx` | render / autofit-applied | — (คือตัวเกียรติบัตรเอง §8) |
| `PreviewCarousel` | `names`, `index`, `onIndex` | loading / ready / autofit-notice | `preview.counter/prev/next/loading/autofit.notice/longNames.summary` |
| `JumpToName` | `names`, `onJump` | closed / open / filtering | `preview.jumpTo` |
| `ExportPanel` | `count`, `templateName`, `exportState`, `progress` | idle / generating / success / error | `export.*` ทั้งชุด |
| `ProgressBar` | `current`, `total` | — (aria-valuenow) | — |
| `UpsellCard` | `count` | — | `upsell.title/body/lineButton/linePrefill` |
| `EmptyState` | `messageKey`, `values` | — | `review.empty` |

---

## 5) ตาราง state machine ของ flow

| ขั้น | เข้าได้เมื่อ | เงื่อนไข "ไปต่อ" (guard) | ปุ่ม/การกระทำไปต่อ | ย้อนกลับไป | copy key เมื่อ guard ไม่ผ่าน |
|---|---|---|---|---|---|
| 0 Landing | เสมอ | — | `landing.cta` → ขั้น 1 | — | — |
| 1 อัปโหลด | เสมอ | parser คืนรายชื่อ ≥1 หรือ PasteBox ≥1 บรรทัด | อ่านไฟล์สำเร็จ → auto ไปขั้น 2 (หลังโชว์ `upload.success` ~800ms) / `upload.pasteButton` | Landing | `upload.error.*` ตามสาเหตุ, `upload.error.pasteEmpty` |
| 2 ตรวจรายชื่อ | `names` เคย populate | `names.length ≥ 1` | `review.nextButton` → ขั้น 3 | ขั้น 1 (ไฟล์เดิมไม่ถูกอ่านซ้ำ — จะอัปโหลดใหม่ก็ได้ รายชื่อเดิมคงอยู่จนกว่า import ใหม่จะ**แทนที่**หลัง ConfirmDialog ถ้าตารางมีการแก้ไขแล้ว) | `review.error.emptyNext` |
| 3 เลือกแบบ | maxReached ≥2 | `templateId != null` **และ** tier เป็น free (พรีเมียมเลือกเพื่อดูได้ แต่ไปต่อไม่ได้จนกว่าปลดล็อก) | `common.next` → ขั้น 4 | ขั้น 2 | `template.error.notSelected` / `template.premium.exportBlocked` |
| 4 ใส่ข้อความ | maxReached ≥3 | ช่องบังคับครบ: org, certify, date, signer1.name, signer1.position + logo ไม่มี error ประเภทไฟล์ | `common.next` → ขั้น 5 | ขั้น 3 | `customize.error.required` ({fieldName}), `customize.logo.error.type` |
| 5 ดูตัวอย่าง | maxReached ≥4 | เสมอ (ขั้นนี้ตรวจด้วยตา) | `preview.confirmButton` → ขั้น 6 | ขั้น 4 (หรือทางลัด `preview.editShortcut.*` → 2/3/4) | — |
| 6 ดาวน์โหลด | maxReached ≥5 | — (จบ flow) | `export.button` → generating → success | ขั้น 5 (disabled ระหว่าง generating) | `export.error.failed` |
| รีเซ็ต | จากขั้น 6 | ยืนยัน dialog | `export.startOver` → ล้าง store → Landing | — | `export.startOver.confirm` |

**กติกา `maxReachedStep`:** ไม่ลดลงเมื่อย้อนกลับ — stepper จึงกระโดดไป-กลับได้อิสระในช่วงที่เคยไปถึง แต่ถ้าการแก้ทำ guard พัง (เช่น ลบรายชื่อหมดในขั้น 2) การกดไปขั้น ≥3 ต้องผ่าน guard ของขั้น 2 ใหม่ก่อนเสมอ (ตรวจ guard สะสมทุกครั้งที่ navigate ไปข้างหน้า)

### 5.1 ตารางครอบคลุม state ทั้ง 4 แบบ ทุกขั้น (loading / success / error / empty)

| ขั้น | Loading | Success | Error | Empty |
|---|---|---|---|---|
| 0 | skeleton ภาพตัวอย่าง (โหลดฟอนต์) | — | — | — |
| 1 | `upload.loading.reading` → `upload.loading.extracting` (สลับตามเฟส; รวมเวลาโหลด parser lib ตาม D7) | `upload.success` (+ `upload.warning.pdfAccuracy` ถ้า PDF) | `upload.error.unsupported / docOld / parseFail / pdfScanned / emptyFile / noNames / pasteEmpty / tooLarge` + `error.generic` (crash boundary) | ยังไม่เลือกไฟล์ = ตัว dropzone เองคือ empty state |
| 2 | — (ข้อมูลอยู่ในเครื่องแล้ว) | `review.count` อัปเดตสด, Toast `review.undoToast` | `review.error.emptyNext` | `review.empty` |
| 3 | skeleton การ์ด (อัตรา 297:210) ระหว่างเรนเดอร์ thumbnail | `template.selected` บนการ์ด | `template.error.notSelected`, `template.premium.exportBlocked` | — (แกลเลอรีเป็นข้อมูล static ไม่มี empty) |
| 4 | — (live preview debounce 150ms ไม่ต้องมี loading UI) | preview ขวา/บนอัปเดตสด | `customize.error.required`, `customize.logo.error.type`; warning ไม่บล็อก: `customize.logo.error.small` | ฟอร์มไม่มี empty จริง (prefill ด้วย `cert.default.*` เสมอ) |
| 5 | `preview.loading` + skeleton | ภาพใบปัจจุบัน + `preview.counter` | (render พัง → `error.generic` crash boundary) | เข้าไม่ได้ถ้าไม่มีชื่อ (guard ขั้น 2 กันไว้) |
| 6 | `export.loading` + `export.loading.note` + ProgressBar | `export.success.title/body` + Upsell | `export.error.failed` | — |

---

## 6) สเปกการ render เกียรติบัตร: Preview = PDF (หัวใจของ quality)

### 6.1 สถาปัตยกรรม render

```
src/cert/layoutConstants.js   ← ความจริงหนึ่งเดียว (มิติเป็น mm, ฟอนต์เป็น pt)
        │
        ├── <CertPreview>  แปลง mm → px: px = mm × (widthPx / 303)
        │   div ตำแหน่ง absolute ตาม slot, ฟอนต์ @font-face จากไฟล์ .ttf
        │   ชุดเดียวกับ pdfmake (D8), aspect-ratio: 303/216 (แสดงเฉพาะ trim
        │   297×210 โดย crop bleed ออกด้วย overflow-hidden + inset -3mm scale)
        │
        └── buildPdf()  แปลง mm → pt: pt = mm × 2.83465
            pdfmake pageSize {width: 858.9, height: 612.3} (=303×216mm เต็ม bleed)
            วางทุก slot ด้วย absolutePosition จาก constants เดียวกัน
```

- **หน้ากระดาษ:** วาดบน canvas 303×216mm (รวม bleed 3mm) ตามข้อเสนอ Reese Q12 — โหมดผู้ใช้ทั่วไป MVP export เต็ม bleed ไปเลยหรือ crop เหลือ trim? **ตัดสินใจ: MVP export ที่ trim 297×210mm (A4 พอดี พิมพ์เครื่องโรงเรียนได้ 100%)** โดย pdfmake วาง content ด้วยพิกัด trim; ไฟล์โหมดส่งโรงพิมพ์ (เต็ม bleed) เป็นสวิตช์ภายในที่ Dale เตรียมไว้แต่ยังไม่โชว์ใน UI (รอเฟส upsell จริง) — artwork ของ Mind ต้องมี bleed มาแล้วเสมอ (§10)
- ตัวอักษรจาก store ผ่าน `thaiWrap()` (Intl.Segmenter แทรก ZWSP) ก่อนเข้า **ทั้งสองฝั่ง**
- โลโก้: วาง `objectFit: contain` ในกล่อง slot — ไม่ยืด ไม่ครอบ

### 6.2 layoutConstants (slot geometry ชุดเดียวทุก template — D5)

พิกัด origin = มุมซ้ายบนของ **trim** 297×210mm (ฝั่ง bleed บวก offset 3mm เอง), แกน x กึ่งกลาง = 148.5mm, ทุก slot จัดกึ่งกลางแนวนอนยกเว้นผู้ลงนาม 2 คน

| Slot | กล่อง (x-center, y-top, กว้าง×สูง mm) | ฟอนต์/ขนาด (pt) | กติกา |
|---|---|---|---|
| `frameZone` (ของ Mind) | ขอบนอก 0–14mm ทุกด้าน | — | ห้ามมีข้อความระบบในโซนนี้ |
| `logo` | (148.5, 22, 40×24) | — | contain; ไม่มีโลโก้ = เว้นว่าง ไม่ shift layout |
| `orgName` | (148.5, 52, 230×12) | Sarabun 600, 22 → min 16 (auto-fit) | 1 บรรทัด |
| `certifyLine` | (148.5, 66, 220×9) | Sarabun 400, 16 | 1 บรรทัด |
| `recipientName` | (148.5, 78, 230×20) | ฟอนต์ตาม template*, **40 → min 24** (auto-fit §6.4) | 1 บรรทัดเสมอ |
| `achievement` | (148.5, 104, 220×16) | Sarabun 400, 16, line-height 1.7 | สูงสุด 2 บรรทัด (เกิน → auto-fit ลดถึง 13pt) |
| `blessing` | (148.5, 122, 220×14) | Sarabun 400, 14, line-height 1.7 | สูงสุด 2 บรรทัด; ว่างได้ ไม่ shift |
| `dateLine` | (148.5, 140, 220×8) | Sarabun 400, 14 | 1 บรรทัด |
| `signer×1` | (148.5, 158, 90×30) | Sarabun 400, 14 | ช่องว่างเซ็นจริง 158–172, ชื่อ `(…)` y=174, ตำแหน่ง y=182 |
| `signer×2` | ซ้าย (90, 158, 90×30) / ขวา (207, 158, 90×30) | เท่ากัน | โครงเดียวกันทั้งสองฝั่ง |

\* ฟอนต์ชื่อผู้รับต่อ template: formal + buddhist = **Srisakdi Bold**, corporate = **Sarabun 700** (ตามผลวิจัย Reese Q9; Mind ยืนยัน glyph เลขไทย ๒๕๖๙ ของ Srisakdi ตอนเลือกน้ำหนัก — ข้อควรระวัง Rae ข้อ 7; ถ้า glyph ไม่ครบ ให้ตกลง fallback `Srisakdi, Sarabun` ทั้งใน CSS และ pdfmake)

### 6.3 หน่วยแปลง (ให้ Dale ใช้ค่าคงที่เดียวกันทุกไฟล์)

```
1 mm = 2.83465 pt          trim 297×210mm = 841.89×595.28pt
bleed canvas 303×216mm = 858.90×612.28pt
artwork 300dpi เต็ม bleed = 3579×2551px   (Mind ใช้ค่านี้ — §10)
preview: pxPerMm = containerWidthPx / 297
```

### 6.4 Auto-fit ชื่อยาว (จุดขาย — สเปกเป็น algorithm)

```
วัดด้วย canvas 2D: ctx.font = `${weight} ${sizePt*4}px ${family}` (วัดที่ 4× กันปัดเศษ)
รอ document.fonts.ready ก่อนวัดครั้งแรกเสมอ (D8)

fitName(text, slot):
  size = slot.maxPt (40)
  while measure(text, size) > slot.widthMm และ size > slot.minPt (24):
      size -= 0.5
  return { size, overflow: measure(text, size) > slot.widthMm }
```

- ผล `size < maxPt` → ใบนั้นติดธง autofit → ขั้น 5 แสดง `preview.autofit.notice` (ฟ้า) และรวมนับใน `preview.longNames.summary`
- ผล `overflow === true` ที่ minPt (ชื่อยาวสุดขั้ว) → ลด letter-spacing ได้สูงสุด −2% ก่อน แล้วถ้ายังล้น: **ยอมให้ล้นแบบกึ่งกลาง (ตัดเท่ากันสองข้างไม่มีทาง — จึงบีบ scaleX ขั้นต่ำ 0.92)** และยังแจ้ง notice เดิม — ห้าม ellipsis เด็ดขาด
- **Acceptance test (บังคับผ่านก่อน ship):** `cert.sampleName` = "ว่าที่ร้อยตรีหญิงกัลยรัตน์ ศรีสุริยวงศ์สกุล" ต้อง fit ภายใน 230mm ที่ ≥24pt โดย **ไม่ต้องใช้ scaleX** ในทั้ง 3 template ฟรี และภาพ preview ต้องตรงกับ PDF (visual diff §6.5) — ชื่อนี้ใช้เป็นชื่อตัวอย่างใน thumbnail ขั้น 3 และ live preview ขั้น 4 ด้วย (ข้อควรระวัง Rae ข้อ 6)
- ค่า size ที่คำนวณได้ต่อชื่อ ถูกเก็บและ **ส่งเข้า pdfmake ตัวเดียวกัน** — ไม่คำนวณซ้ำสองสูตร

### 6.5 QA parity (ให้ Chris)

1. Generate PDF 3 ใบ (สั้น/กลาง/`cert.sampleName`) ต่อ template → rasterize PDF หน้าแรกที่ 150dpi → วางทับ screenshot ของ CertPreview ที่ scale เท่ากัน → ตำแหน่ง baseline ทุก slot เหลื่อมได้ ≤1mm
2. ซูม 400% ตรวจวรรณยุกต์ตามชุดสตริง POC-1 ของ Reese

---

## 7) Template card grid + พรีเมียมล็อก (รายละเอียดเชิงพฤติกรรม)

- **ข้อมูล template เป็น manifest static** (`src/cert/templates.js`): `{ id, code, tier, nameKey, descKey, artworkUrl, nameFont, inkColors }` — เพิ่ม template ใหม่ = เพิ่ม entry + artwork
- ฟรี 3 ใบ: `formal` / `buddhist` / `corporate` — ใช้ `template.free1–3.name/desc`
- พรีเมียม (จำนวนตาม Mind ผลิต — แนะนำเปิดตัว 3–5 ใบ): การ์ดแสดง thumbnail จริงเต็มตา + ลายน้ำ `template.premium.watermark` ตัวทแยง 45° ความทึบ 18% ถี่พอไม่ crop ออกได้ + badge `template.badge.premium` + 🔒
- thumbnail ทุกใบ = CertPreview จริง (ชื่อ `cert.sampleName` + `cert.default.<id>.*`) ไม่ใช่ภาพนิ่ง — เห็น auto-fit จริงตั้งแต่เลือกแบบ
- เลือกการ์ดพรีเมียมได้ (ดู preview ขั้น 4–5 พร้อมลายน้ำได้เต็ม flow เพื่อยั่วให้เห็นงานจริง) **แต่ guard ขั้น 3→4 บล็อกด้วย `template.premium.exportBlocked`?** — ตัดสินใจ: บล็อกตั้งแต่ 3→4 (guard §5) เพื่อไม่ให้ผู้ใช้ทำครบ flow แล้วเจอกำแพงตอนท้าย ซึ่งเจ็บกว่า; ปุ่ม `template.useButton` บนการ์ดพรีเมียมจึงถูกแทนด้วยปุ่มเปิด PremiumContactModal
- Analytics ไม่มีใน MVP (ขัดเคลม privacy ของ Rae ข้อ fact-check 1) — การวัดความสนใจพรีเมียมใช้จำนวนทัก LINE/email ที่มี `{code}` แนบมา

---

## 8) Accessibility ขั้นต่ำ (Definition of Done)

1. **Focus order ต่อขั้น:** StepperBar → StepHeader (H1) → เนื้อหาบน-ล่าง → ปุ่มหลัก → `common.back` — เปลี่ยนขั้นแล้ว `focus()` ที่ H1 (มี `tabindex="-1"`) + อัปเดต `document.title` = `nav.step{n} — app.name`
2. **Stepper:** `<nav aria-label>` + `<ol>`; ขั้นปัจจุบัน `aria-current="step"`; ขั้นล็อก `aria-disabled="true"` (ยังโฟกัสได้เพื่ออ่านค่า แต่กดไม่ทำงาน)
3. **Modal ทุกตัว:** focus trap, `Esc` ปิด, ปิดแล้วโฟกัสกลับปุ่มที่เปิด, `aria-modal="true"` + `aria-labelledby` ชี้หัว modal
4. **aria-live:** Toast + `upload.loading.*` + `export.loading` + `preview.counter` = `polite`; `*.error.*` banner = `role="alert"`
5. **Dropzone:** ปุ่ม `upload.browseButton` เป็น `<button>` จริงคู่ `<input type="file">` — ใช้คีย์บอร์ดได้เต็ม flow โดยไม่ต้องลาก
6. **ตารางรายชื่อ:** `<table>` จริง (ไม่ใช่ div), input ในแถวมี `aria-label` = "ชื่อ-นามสกุล แถวที่ {n}", ปุ่มลบ `aria-label` = `review.deleteRow`
7. **Contrast:** ตาม token §2.4 ทุกคู่ ≥4.5:1 (ยกเว้นอักษรบนปุ่ม LINE ใช้เขียวเข้ม `#073B1E` เพื่อผ่านเกณฑ์ — ห้ามขาวบนเขียว LINE)
8. **Touch target ≥44×44px** ทุก interactive (§2.5) และ focus ring มองเห็นชัด: `focus-visible:ring-2 ring-offset-2` สี primary
9. **Motion:** ทุก transition ≤200ms และปิดใต้ `prefers-reduced-motion: reduce` (progress bar ยังขยับได้ — เป็นข้อมูล ไม่ใช่ตกแต่ง)
10. คีย์บอร์ด ←/→ ในขั้น 5 เลื่อนใบ preview; `Enter` ใน PasteBox = ขึ้นบรรทัดใหม่ (ไม่ submit — submit ด้วยปุ่มเท่านั้น กันวางรายชื่อแล้วหลุด)

---

## 9) การจัดการ "10 ข้อควรระวัง layout" ของ Rae — ครบทุกข้อ

| # | ข้อควรระวัง | คำตอบใน spec นี้ |
|---|---|---|
| 1 | Error ยาว 2–3 บรรทัด อย่าให้ layout กระโดด | Error ทั้งหมดใช้ `AlertBanner` **ใน flow ปกติ** (ไม่ absolute/ไม่ toast) ใต้ตัวที่เป็นต้นเหตุ + `scrollIntoView` — เนื้อหาดันหน้าลงอย่างคาดเดาได้ ไม่ทับของ; BottomBar ไม่ sticky ด้วยเหตุนี้ (§3.W) |
| 2 | PasteBox ต้องเด่นเท่า dropzone | D6 + §3.1: มองเห็นตลอด, mobile อยู่ใต้ divider ที่มีข้อความ `upload.pasteDivider`, desktop 2 คอลัมน์กว้างเท่ากัน, error ทุกตัวชี้มาที่กล่องนี้ซึ่งอยู่บนจอเสมอ |
| 3 | `upload.warning.pdfAccuracy` โชว์ทุกครั้งที่เป็น PDF และอยู่ร่วมกับ success | AlertBanner **เหลือง แยก component จาก success เขียว** แสดงพร้อมกันได้ (§3.1) และ**ตามไปค้างบนขั้น 2** เมื่อ `source==='pdf'` (§3.2) — เพราะขั้น 2 คือที่ที่ผู้ใช้ต้อง "ตรวจละเอียดเป็นพิเศษ" |
| 4 | `customize.logo.disclaimer` ต้องติดปุ่มอัปโหลด เห็นโดยไม่ hover | เป็น AlertBanner เหลืองถาวร ใต้ `customize.logo.hint` ใน LogoUploader ทุก state (§3.4, §4) — ไม่ใช่ tooltip/fine print |
| 5 | ปุ่มตัวเลข dynamic ห้าม fixed-width | §2.5: `inline-flex px-6`, `tabular-nums`, wrap 2 บรรทัดได้ที่จอ 320px |
| 6 | ใช้ `cert.sampleName` ทดสอบทุก template ตั้งแต่ mockup | ชื่อนี้คือชื่อตัวอย่างใน thumbnail ขั้น 3, live preview ขั้น 4, ภาพ hero หน้า Landing และเป็น acceptance test ของ auto-fit (§6.4) |
| 7 | เลขไทย ๒๕๖๙ ใน Srisakdi | ระบุใน §6.2 ให้ Mind เช็ค glyph ตอนเลือกน้ำหนัก + กำหนด fallback stack `Srisakdi, Sarabun` ทั้ง CSS และ pdfmake ถ้าไม่ครบ |
| 8 | ปุ่มพรีเมียม LINE+อีเมล ซ้อนแนวตั้ง LINE บน | §3.3 PremiumContactModal: ซ้อนแนวตั้ง**ทุก breakpoint** LINE บนเสมอ + `template.premium.emailNote` ใต้ปุ่มอีเมล |
| 9 | Stepper มือถืออาจตัดคำ | §3.W: mobile ใช้รูปแบบ "ขั้น {n}/6 · {nav.stepN}" (ชื่อขั้นเดียว ไม่มีทางตัดคำ) + progress bar; ครบ 6 ป้ายเฉพาะ ≥md |
| 10 | prefill "ครับ/ค่ะ" ผู้ใช้แก้เองได้ | ส่งเป็น prefill ใน LINE URL / mailto body ตามพฤติกรรมแพลตฟอร์ม (ผู้ใช้เห็นและแก้ก่อนส่งเสมอ) — ไม่เพิ่มตัวเลือกเพศใน MVP ตามที่ Rae สรุป |

---

## 10) สิ่งที่ Mind ต้องส่งมอบ (slot/ratio เท่านั้น — visual design เป็นอิสระของ Mind ตาม SOP-10)

ต่อ 1 template (ฟรี 3 + พรีเมียมชุดแรก):

1. **Artwork พื้นหลังเต็ม bleed 1 ไฟล์** — 303×216mm; ส่งเป็น SVG (แนะนำ — คมทุก scale, ไฟล์เล็ก) หรือ PNG **3579×2551px (300dpi)**; ลายกรอบ/ornament อยู่ใน `frameZone` (ขอบนอก 0–17mm จากขอบ bleed = 0–14mm จากขอบ trim) — **องค์ประกอบสำคัญของลายห้ามล้ำเข้าเกิน 14mm จาก trim** เพราะโซนข้อความเริ่มที่ 20mm
2. **พื้นหลังภายในโซนข้อความ (20mm inset จาก trim, 257×170mm)** ต้องอ่อน/เรียบพอให้สีตัวอักษรที่กำหนดใน manifest มี contrast **≥4.5:1** ทุก slot — ลายน้ำ/texture ในโซนนี้ความทึบ ≤6%
3. **สีตัวอักษรต่อ slot** (`inkColors` ใน manifest): orgName / certifyLine / recipientName / body / signer — Mind กำหนดชุดสีของ template เอง แต่ต้องผ่านเกณฑ์ contrast ข้อ 2
4. **Ornament ใต้ชื่อผู้รับ (ถ้ามี):** กว้าง ≤120mm สูง ≤4mm วางที่ y=100mm center — เป็นส่วนหนึ่งของ artwork พื้นหลัง (ไม่ใช่ layer แยก)
5. **ยืนยันฟอนต์หัวเรื่อง:** Srisakdi Bold มี glyph เลขไทยครบหรือไม่ (ข้อ 7 ของ Rae) — ตอบกลับใน handoff note ของ Mind
6. **ห้ามเด็ดขาด:** ตราครุฑหรือตราหน่วยงานจริงใด ๆ ฝังใน artwork (กฎหมาย — Reese Q13); โลโก้เป็นของผู้ใช้อัปโหลดเท่านั้น slot `logo` ต้องถูกเว้นว่างในลาย (หรือมีกรอบประดับรอบกล่อง 40×24mm ได้ แต่ห้ามมีสัญลักษณ์ข้างใน)
7. **Thumbnail ไม่ต้องทำ** — ระบบเรนเดอร์จาก artwork จริง + CertPreview เอง
8. รหัส template พรีเมียม: รูปแบบ `TP-P01, TP-P02, …` (โผล่ใน `template.premium.lockBody/prefill/emailSubject` เป็น `{code}`)

---

## 11) สิ่งที่ Dale ต้องรู้เพิ่ม (นอกเหนือ stack ที่ Reese สรุป)

- ฟอนต์ UI: Sarabun โหลดแบบ self-host ในโปรเจกต์ (ไม่พึ่ง CDN ภายนอก — ทั้งเรื่อง privacy claim ของ Rae และ GitHub Pages first load); weight ที่ใช้: 400/500/600/700
- ฟอนต์เกียรติบัตร (Sarabun ครบ weight ที่ §6.2 + Srisakdi Bold): ใช้ไฟล์ .ttf ชุดเดียว ประกาศ @font-face และใส่ pdfmake vfs จากไฟล์เดียวกัน (D8)
- `{maxSize}` (upload.error.tooLarge) และ `{batchSize}` (export.error.failed) — Dale วัดจาก POC แล้วใส่ค่า **ที่เดียว** ใน config กลาง ไม่ hard-code ในข้อความ
- ปุ่ม LINE: URL รูปแบบ `https://line.me/R/oaMessage/{LINE_OA_ID}/?{encodedPrefill}` (ยืนยันรูปแบบกับ LINE OA จริงของ TANAPAT ตอน integrate)
- Crash boundary ระดับแอป → แสดง `error.generic` แบบเต็มหน้า พร้อมปุ่มรีเฟรช

---

## 12) คำถามค้าง (ต้องได้คำตอบก่อน/ระหว่าง build — ไม่ block การเริ่ม)

| # | คำถาม | รอใคร |
|---|---|---|
| 1 | ค่า `{LINE_OA_URL}` / `{CONTACT_EMAIL}` จริง | Kittanate |
| 2 | จำนวน template พรีเมียมชุดเปิดตัว + ชื่อ/desc ต่อใบ (copy key ยังไม่มีสำหรับพรีเมียมรายใบ — Rae มีเฉพาะ free1–3) | Kittanate → Mind → **Rae เพิ่ม key ชุด `template.premium{n}.name/desc`** |
| 3 | สัดส่วนแนวนอน:แนวตั้งจากข้อมูลโรงพิมพ์จริง (Reese Q11 แนะนำถาม Kittanate) — MVP ล็อกแนวนอนตามแผน แต่ถ้าข้อมูลจริงบอกแนวตั้งเยอะ ควรรู้ก่อนออกแบบ template เฟส 2 | Kittanate |
| 4 | Microcopy 2 จุดที่ไม่มี key และ MVP เลือกทางไม่ใช้ข้อความ: (ก) สถานะ dragover ของ dropzone — ใช้การเปลี่ยนสีเท่านั้น (ข) ผลค้นหาว่างใน `preview.jumpTo` — แสดง list ว่าง ถ้าอยากมีข้อความ ให้ Rae เพิ่ม key | Rae (ไม่บังคับใน MVP) |
| 5 | ถ้อยคำ disclaimer ตราครุฑเวอร์ชัน final (รอความเห็นกฎหมาย — ใช้ v2 ของ Rae ไปก่อน) | Kittanate/กฎหมาย |
| 6 | ค่า `{maxSize}` / `{batchSize}` จาก load test | Dale (POC) |

---

## 13) Definition of Done ของ spec นี้ (ให้ Chris ใช้ตรวจงาน build)

1. ทุกข้อความบนจอ map กลับไปยัง copy key ของ Rae ได้ 100% — ไม่มีข้อความแต่งใหม่
2. ผ่านชุดทดสอบ wrap ภาษาไทย §2.3 ที่ 320/360/768/1280px
3. ผ่าน acceptance test auto-fit §6.4 (`cert.sampleName` ทั้ง 3 template)
4. ผ่าน QA parity preview↔PDF §6.5 (เหลื่อม ≤1mm)
5. ย้อนกลับทุกขั้น + refresh guard + browser back: รายชื่อและข้อความไม่หาย
6. ครบทุก state ในตาราง §5.1 (บังคับ demo ทุก error state ได้จริง เช่นด้วยไฟล์ทดสอบชุดหนึ่ง)
7. Accessibility ครบ 10 ข้อ §8 (ตรวจด้วยคีย์บอร์ดล้วน 1 รอบเต็ม flow + axe scan)

---

*Spec นี้ไม่มี factual claims ใหม่ (ตัวเลขเทคนิคทั้งหมดอ้างจากผลวิจัยที่ Reese verify แล้ว + มาตรฐาน print ที่ Reese อ้างแหล่ง) — ตามกฎข้อ 6 จึงข้าม fact-check ได้ ส่งต่อ Mind (artwork ตาม §10) และ Dale (build ตาม §1–8, §11) แล้วเข้า Chris QA ด้วย checklist §13 ค่ะ*

---

## Revision history

- **v1.1 (14 ก.ค. 2026) — ตัดช่อง `customize.event` ออกจากฟอร์มขั้น 4 (คำถามจาก Dale):** slot geometry §6.2 ไม่มีตำแหน่ง "ชื่องาน" บนใบโดยตั้งใจ — ชื่องานฝังอยู่ในบรรทัด achievement แล้วทั้ง 3 template (`cert.default.formal/buddhist/corporate.achievement` ของ Rae และ `customize.event.placeholder` ก็เป็นข้อความเดียวกับใน achievement) ช่องที่กรอกได้แต่ไม่ปรากฏบนใบขัดกับ `customize.instruction` ("ข้อความตัวอย่างที่เห็นแก้ได้ทุกจุด") จึงตัดออกจากฟอร์มและ store → key `customize.event.label/placeholder` มีสถานะ retired (แจ้ง Rae — คงไว้ในไฟล์ copy ได้ ไม่ต้องลบ; นับ key ที่ใช้จริงเหลือ 160)
- **v1 (13 ก.ค. 2026):** ฉบับแรก

— Vera, TANAPAT AI Studio
