# DESIGN.md — TANAPAT Design System

> เจ้าของ: **Vera** (layout/tokens) + **Mind** (visual) | Gate: **Chris** (SOP-08 §E)
> ต่อยอดจาก **SOP-10** (Step 0 asset inventory — ยังบังคับใช้ ห้ามข้าม) และ **SOP-04 ขั้น 4** (Thai text handling)
> วิธีเอาไปใช้จริง (เลือกระดับ A/B/C, deploy, กับดัก) อยู่ใน **`SOP/SOP-11-design-system.md`**
> ขอบเขต: **เวป single-file `index.html` ไม่มี build step** deploy GitHub Pages, ภาษาไทยเป็นหลัก
> อัปเดต: 27 ส.ค. 2569

---

## 1. หลักการ — ทำไมต้องมีไฟล์นี้

### 1.1 DESIGN.md คืออะไร (ที่มา: บทความ somkiat.cc/design-md + สเปกต้นทาง)

`DESIGN.md` เป็นฟอร์แมตที่ทีม **Google Stitch (google-labs-code)** เปิดเป็น open source (Apache 2.0, สถานะ alpha)
แนวคิดคือ *"อธิบาย style guide ของระบบงานให้ AI Agent for coding เข้าใจ"* — ไฟล์เดียววางที่ root ของโปรเจกต์ มี **2 ชั้นในไฟล์เดียวกัน**:

| ชั้น | รูปแบบ | ไว้ให้ใคร |
|---|---|---|
| **Tokens** | YAML front-matter — ค่าจริง: hex, font-size, spacing, radius | เครื่อง / AI agent |
| **Rationale** | Markdown — เหตุผลว่าทำไมเลือกแบบนี้ ใช้ตอนไหน | คน |

หัวข้อในสเปกต้นทาง: `name` `description` `colors` `typography` `rounded` `spacing` `components` + `omitted`
และมี CLI: `lint` (11 rules — จับ token ที่อ้างแล้วไม่มีจริง, contrast ไม่ผ่าน, ไม่มี primary), `diff`, `export` (→ Tailwind / W3C DTCG), `spec`

**สิ่งที่เราหยิบมาใช้:** โครงคิด "ค่าจริง + เหตุผล ในไฟล์เดียวที่ root" และวินัยว่า **token ที่อ้างต้องมีจริง**
**สิ่งที่เราไม่ใช้:** YAML + CLI ของ Stitch — ทีมเราไม่มี build step อยู่แล้ว เขียนเป็น **CSS custom properties ที่ก๊อปวางได้ทันที** ตรงกว่า

### 1.2 shadcn ให้อะไรกับเรา (ที่มา: shadcn.io + ui.shadcn.com/docs/theming)

`shadcn.io` เป็น community registry (ไม่ใช่ของทางการ) — blocks/components/themes สำหรับ React + Tailwind
เราใช้ React ไม่ได้ในเวป no-build ของเรา **แต่สิ่งที่ยกมาใช้ได้ 100% คือ "ระเบียบวิธีตั้งชื่อ token"**:

- **คู่ `X` / `X-foreground`** — `X` คือสีพื้นผิว, `X-foreground` คือสีตัวอักษร/ไอคอนที่วางบนพื้นนั้น
  ผลลัพธ์: เขียน `background:var(--card); color:var(--card-foreground)` แล้ว **ห้ามหลุด contrast โดยอัตโนมัติ** ทั้ง light/dark
- **ชื่อเชิงความหมาย ไม่ใช่ชื่อสี** — `--primary` `--muted` `--destructive` ไม่ใช่ `--blue` `--gray2` `--red`
  เปลี่ยนธีมทั้งเวปได้จากการแก้ `:root` ที่เดียว
- **radius เดียวเป็นแม่ แล้วอนุพันธ์ด้วย `calc()`** — ไม่ต้องจำเลข 6 ตัว
- **dark mode = redefine เฉพาะตัวแปรสี** ไม่ต้องเขียน CSS component ซ้ำ

> ชุด token มาตรฐานของ shadcn: `background` `foreground` `card` `popover` `primary` `secondary` `muted` `accent` `destructive` `border` `input` `ring` `radius` `chart-1..5` `sidebar-*`
> ของเราตัด `chart-*`/`sidebar-*` ออก (ยังไม่จำเป็น) และ **เพิ่ม** `gold` `success` `warning` ตามธีมแบรนด์

### 1.3 ปัญหาจริงที่ไฟล์นี้มาแก้

สำรวจโปรเจกต์ที่ทีมทำอยู่ พบว่า **ทุกโปรเจกต์ตั้งชื่อ token กันเองคนละแบบ** — สลับไปแก้ข้ามโปรเจกต์แล้วเสียเวลาทุกครั้ง:

| โปรเจกต์ | พื้นหลัง | ตัวอักษร | ตัวอักษรรอง |
|---|---|---|---|
| `AGAPAE Agent/index.html` | `--paper` | `--ink` | `--ink-soft` |
| `Printing costs/index.html` | `--bg` | `--text` | `--text2` |
| `MyTrips/index.html` | `--ground` | `--ink` | `--ink-2` |
| `AI Investment/index.html` | `--bg` | `--txt` | `--mut` |

ตั้งแต่นี้ไป: **โปรเจกต์ใหม่ก๊อป §2 ไปวางตรง ๆ** / โปรเจกต์เก่าค่อย ๆ ย้ายตอนแตะไฟล์นั้นอยู่แล้ว (ห้ามเปิด PR รื้อสีอย่างเดียว)

---

## 2. Design Tokens — ก๊อปทั้งบล็อกไปวางได้เลย

ค่าสีทุกคู่ในบล็อกนี้ **ตรวจ contrast ratio ด้วยสูตร WCAG 2.1 แล้ว** ตัวเลขจริงอยู่ใน §2.1

```css
:root{
  /* ---------- Color: Light (ค่าตั้งต้น) ---------- */
  --background:#F7F5F0;            --foreground:#1B1C20;
  --card:#FFFFFF;                  --card-foreground:#1B1C20;
  --popover:#FFFFFF;               --popover-foreground:#1B1C20;
  --muted:#ECE8E0;                 --muted-foreground:#5A554B;
  --secondary:#E6E2D8;             --secondary-foreground:#26241F;
  --accent:#F0EADE;                --accent-foreground:#3A3227;
  --primary:#8E2F2A;               --primary-foreground:#FDF6F3;
  --gold:#7A5E33;                  --gold-foreground:#FFFCF5;
  --success:#2C6446;               --success-foreground:#F4FBF7;
  --warning:#8A5A12;               --warning-foreground:#FFFAF0;
  --destructive:#A81F16;           --destructive-foreground:#FFF5F4;
  --border:#DFDACE;                /* เส้นคั่น/ขอบการ์ด — decorative */
  --input:#8A8376;                 /* ขอบช่องกรอก — เป็น UI component ต้อง ≥3:1 */
  --ring:#8E2F2A;                  /* focus ring */

  /* ---------- Radius ---------- */
  --radius:0.75rem;                                  /* 12px = แม่ */
  --radius-sm:calc(var(--radius) * 0.5);             /* 6px  — badge, tag */
  --radius-md:calc(var(--radius) * 0.75);            /* 9px  — button, input */
  --radius-lg:var(--radius);                         /* 12px — card */
  --radius-xl:calc(var(--radius) * 1.5);             /* 18px — dialog, hero */
  --radius-full:999px;                               /* pill, avatar */

  /* ---------- Shadow (light) ---------- */
  --shadow-xs:0 1px 2px rgba(27,28,32,.05);
  --shadow-sm:0 1px 2px rgba(27,28,32,.05), 0 2px 8px -4px rgba(27,28,32,.10);
  --shadow-md:0 1px 2px rgba(27,28,32,.05), 0 8px 24px -12px rgba(27,28,32,.18);
  --shadow-lg:0 2px 4px rgba(27,28,32,.06), 0 24px 48px -20px rgba(27,28,32,.24);

  /* ---------- Spacing (ฐาน 4px) ---------- */
  --space-1:0.25rem;   /* 4  — ช่องไฟในตัว component */
  --space-2:0.5rem;    /* 8  — icon ↔ text */
  --space-3:0.75rem;   /* 12 — padding ปุ่ม/input แนวตั้ง */
  --space-4:1rem;      /* 16 — padding การ์ด, gap grid มือถือ */
  --space-5:1.5rem;    /* 24 — padding การ์ด desktop, gap grid */
  --space-6:2rem;      /* 32 — ระยะระหว่าง block */
  --space-7:3rem;      /* 48 — ระยะระหว่าง section */
  --space-8:4rem;      /* 64 — ระยะ section หลัก desktop */

  /* ---------- Typography ---------- */
  --font-sans:"IBM Plex Sans Thai","Noto Sans Thai","Sarabun",
              -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  --font-display:"Trirong",Georgia,"IBM Plex Sans Thai",serif;
  --font-mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;

  --text-xs:0.8125rem;   /* 13px — meta/label เท่านั้น ห้ามใช้กับเนื้อความไทย */
  --text-sm:0.9375rem;   /* 15px — ขั้นต่ำของ "ข้อความไทยที่ต้องอ่านจริง" */
  --text-base:1rem;      /* 16px — body */
  --text-lg:1.125rem;    /* 18px — body เด่น / lead */
  --text-xl:1.375rem;    /* 22px — h3 */
  --text-2xl:clamp(1.5rem, 1.2rem + 1.5vw, 2rem);       /* h2  24→32 */
  --text-3xl:clamp(1.875rem, 1.35rem + 2.6vw, 2.75rem); /* h1  30→44 */

  --leading-tight:1.3;   /* หัวข้อไทย — ต่ำกว่านี้วรรณยุกต์ชนบรรทัดบน */
  --leading-ui:1.5;      /* ปุ่ม/label/ตาราง */
  --leading-body:1.75;   /* ย่อหน้าไทย */

  --weight-normal:400; --weight-medium:500; --weight-semibold:600; --weight-bold:700;

  /* ---------- Layout ---------- */
  --container:1180px;
  --container-narrow:760px;   /* บทความ/ฟอร์ม — บรรทัดยาวเกินอ่านล้า */
  --gutter:var(--space-4);    /* ขยายเป็น --space-5 ที่ ≥768px (ดู §5) */
  --tap:44px;                 /* touch target ขั้นต่ำ */

  --duration:160ms;
  --ease:cubic-bezier(.2,.6,.3,1);
}

/* ---------- Color: Dark ---------- */
/* ใช้ทั้ง 2 selector เสมอ: media = ตามระบบ, [data-theme] = ปุ่มสลับของผู้ใช้ */
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --background:#14151A;          --foreground:#EDEAE3;
    --card:#1C1E25;                --card-foreground:#EDEAE3;
    --popover:#1C1E25;             --popover-foreground:#EDEAE3;
    --muted:#262932;               --muted-foreground:#A8A49B;
    --secondary:#2A2D37;           --secondary-foreground:#EDEAE3;
    --accent:#2E313B;              --accent-foreground:#EDEAE3;
    --primary:#E0756A;             --primary-foreground:#2A0F0C;
    --gold:#D9B573;                --gold-foreground:#2A1F0C;
    --success:#6FCB9A;             --success-foreground:#08251A;
    --warning:#E5B25C;             --warning-foreground:#2B1D06;
    --destructive:#F0756B;         --destructive-foreground:#2A0C08;
    --border:#333744;
    --input:#6A7080;
    --ring:#E0756A;

    --shadow-xs:0 1px 2px rgba(0,0,0,.40);
    --shadow-sm:0 1px 2px rgba(0,0,0,.40), 0 2px 8px -4px rgba(0,0,0,.55);
    --shadow-md:0 1px 2px rgba(0,0,0,.45), 0 8px 24px -12px rgba(0,0,0,.65);
    --shadow-lg:0 2px 4px rgba(0,0,0,.50), 0 24px 48px -20px rgba(0,0,0,.72);
  }
}
:root[data-theme="dark"]{
  --background:#14151A;          --foreground:#EDEAE3;
  --card:#1C1E25;                --card-foreground:#EDEAE3;
  --popover:#1C1E25;             --popover-foreground:#EDEAE3;
  --muted:#262932;               --muted-foreground:#A8A49B;
  --secondary:#2A2D37;           --secondary-foreground:#EDEAE3;
  --accent:#2E313B;              --accent-foreground:#EDEAE3;
  --primary:#E0756A;             --primary-foreground:#2A0F0C;
  --gold:#D9B573;                --gold-foreground:#2A1F0C;
  --success:#6FCB9A;             --success-foreground:#08251A;
  --warning:#E5B25C;             --warning-foreground:#2B1D06;
  --destructive:#F0756B;         --destructive-foreground:#2A0C08;
  --border:#333744;
  --input:#6A7080;
  --ring:#E0756A;

  --shadow-xs:0 1px 2px rgba(0,0,0,.40);
  --shadow-sm:0 1px 2px rgba(0,0,0,.40), 0 2px 8px -4px rgba(0,0,0,.55);
  --shadow-md:0 1px 2px rgba(0,0,0,.45), 0 8px 24px -12px rgba(0,0,0,.65);
  --shadow-lg:0 2px 4px rgba(0,0,0,.50), 0 24px 48px -20px rgba(0,0,0,.72);
}
```

### 2.1 ตาราง contrast ที่ตรวจแล้ว (WCAG 2.1 relative luminance)

เกณฑ์: ตัวอักษรปกติ **≥4.5:1 (AA)** | ขอบ/สัญลักษณ์ UI **≥3:1 (1.4.11)**

| คู่ | Light | Dark | ผ่าน |
|---|---|---|---|
| `foreground` บน `background` | 15.62 | 15.17 | AAA |
| `card-foreground` บน `card` | 17.02 | 13.85 | AAA |
| `muted-foreground` บน `background` | 6.80 | 7.33 | AA+ |
| `muted-foreground` บน `card` | 7.41 | 6.70 | AA+ |
| `muted-foreground` บน `muted` | 6.06 | 5.84 | AA |
| `secondary-foreground` บน `secondary` | 11.99 | 11.43 | AAA |
| `accent-foreground` บน `accent` | 10.53 | 10.80 | AAA |
| `primary-foreground` บน `primary` | 7.59 | 5.91 | AA+ |
| `gold-foreground` บน `gold` | 5.90 | 8.32 | AA+ |
| `success-foreground` บน `success` | 6.62 | 8.28 | AA+ |
| `warning-foreground` บน `warning` | 5.68 | 8.47 | AA+ |
| `destructive-foreground` บน `destructive` | 6.83 | 6.46 | AA+ |
| `primary` (เป็นตัวอักษร/ลิงก์) บน `card` | 8.11 | 5.49 | AA+ |
| `destructive` (ข้อความ error) บน `background` | 6.71 | 6.48 | AA+ |
| `input` (ขอบช่องกรอก) บน `card` | 3.66 | 3.36 | ≥3:1 |
| `ring` บน `background` | 7.44 | 6.01 | ≥3:1 |

> `--border` เป็นเส้นตกแต่ง (คั่นการ์ด/แถวตาราง) จงใจให้ contrast ต่ำ — **ห้ามใช้ `--border` เป็นขอบช่องกรอก** ต้องใช้ `--input`

### 2.2 กฎการใช้ token

- เขียน `background` กับ `color` **เป็นคู่เสมอ**: `background:var(--muted); color:var(--muted-foreground)` — ห้ามหยิบมาแค่ตัวเดียว
- **ห้ามใส่ hex ตรง ๆ ในโค้ด component** ถ้าต้องการสีใหม่ = เพิ่ม token ใน `:root` (ทั้ง light และ dark) ก่อน
- โปรเจกต์เพิ่ม token เฉพาะทางได้ แต่ต้อง **ตั้งชื่อเชิงความหมาย + นิยามครบทั้ง 2 ธีม**
  เช่น PrintCost: `--c-paper` `--c-ink` `--c-foil` / AGAPAE: `--c-orch` `--c-content`
- `opacity` แทนสีจาง = ห้าม (ตัวอักษร 50% opacity บนพื้นอ่อนตกเกณฑ์ทันที) ใช้ `--muted-foreground`

---

## 3. Typography ไทย

### 3.1 ฟอนต์

วางใน `<head>` — เลือกชุดเดียวต่อโปรเจกต์ อย่าโหลดครบทุกน้ำหนัก:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap">
```

| บทบาท | ฟอนต์ | ใช้กับ |
|---|---|---|
| ค่าตั้งต้นทั้งทีม | **IBM Plex Sans Thai** (400/500/600/700) | body + UI ทุกอย่าง — ครอบคลุมทั้งไทยและละติน |
| ทางเลือกที่ยอมรับ | **Sarabun** | โปรเจกต์เดิมที่ใช้อยู่แล้ว (budget2569, PrintCost) — ไม่ต้องเปลี่ยน |
| หัวข้อ/display | **Trirong** (`--font-display`) | เฉพาะเวปที่ต้องการโทน serif (MyTrips) โหลดเพิ่มเฉพาะเมื่อใช้จริง |
| ตัวเลข/โค้ด | **IBM Plex Mono** (`--font-mono`) | ตาราง ราคา timestamp |

`display=swap` บังคับใช้ทุกครั้ง — ไม่งั้นข้อความไทยหายช่วงโหลด

### 3.2 base CSS (วางต่อจากบล็อก `:root`)

```css
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

html{ -webkit-text-size-adjust:100%; scroll-behavior:smooth; }
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{animation-duration:.01ms !important; transition-duration:.01ms !important}
}

body{
  font-family:var(--font-sans);
  font-size:var(--text-base);
  line-height:var(--leading-body);
  font-weight:var(--weight-normal);
  letter-spacing:0;                        /* ห้าม tracking กับไทย */
  background:var(--background);
  color:var(--foreground);
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
  overflow-x:hidden;
}

h1,h2,h3,h4{
  font-weight:var(--weight-semibold);
  line-height:var(--leading-tight);
  text-wrap:balance;                       /* ไม่ให้เหลือคำโดดบรรทัดสุดท้าย */
  color:var(--foreground);
}
h1{font-size:var(--text-3xl)}
h2{font-size:var(--text-2xl)}
h3{font-size:var(--text-xl)}
h4{font-size:var(--text-lg)}

p{ text-wrap:pretty; }
p + p{ margin-top:var(--space-4); }

a{ color:var(--primary); text-underline-offset:.2em; }
a:hover{ text-decoration:underline; }

small,.meta{ font-size:var(--text-xs); color:var(--muted-foreground); line-height:var(--leading-ui); }

/* focus ที่มองเห็นได้จริงทั้ง 2 ธีม — ห้าม outline:none โดยไม่มีของแทน */
:where(a,button,input,select,textarea,[tabindex]):focus-visible{
  outline:2px solid var(--ring);
  outline-offset:2px;
  border-radius:var(--radius-sm);
}

/* ใช้เฉพาะ URL / อีเมล / รหัสยาว ที่ล้นกรอบ — ห้ามใช้กับข้อความไทย */
.breakable{ overflow-wrap:anywhere; word-break:normal; }

/* ตัดข้อความไทยให้ใช้ตัวนี้แทน ellipsis บรรทัดเดียว */
.clamp-2{ display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.clamp-3{ display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
```

### 3.3 กฎเฉพาะภาษาไทย (บังคับ — Chris ตรวจทุกครั้ง)

| เรื่อง | กฎ | เหตุผล |
|---|---|---|
| **line-height** | ย่อหน้า `1.75` / UI `1.5` / หัวข้อ **≥1.3** | ไทยมีสระบน + วรรณยุกต์ซ้อน 2 ชั้น (เช่น "ใต้" "ก็" "ที่") ต่ำกว่า 1.3 แล้วชนบรรทัดบน — `line-height:1` ใช้ได้เฉพาะ **ตัวเลข/ละตินล้วน** |
| **ขนาดขั้นต่ำ** | เนื้อความไทย **≥15px** (`--text-sm`) / label-meta **≥13px** (`--text-xs`) / **ห้ามต่ำกว่า 12px บนจอ** | ต่ำกว่านี้ วรรณยุกต์กับสระอิ-อี แยกไม่ออกบนจอ non-retina |
| **letter-spacing** | ไทย = `0` เสมอ | ทำให้สระ/วรรณยุกต์หลุดจากพยัญชนะที่มันเกาะอยู่ ยอมให้ใช้ tracking (`.08em`) ได้เฉพาะ label ละติน uppercase |
| **การตัดบรรทัด** | ปล่อยให้ browser ตัดเอง (`word-break:normal`) | Chrome/Safari/Edge มี Thai dictionary line-breaking ในตัว — `word-break:break-word/break-all` จะตัด **กลางคำ** |
| **การตัดข้อความ (truncate)** | ใช้ `.clamp-2`/`.clamp-3` | `white-space:nowrap; text-overflow:ellipsis` ตัดตรงกลางคำไทยเสมอ ผิด SOP-04 "ห้าม truncate กลางคำ" |
| **uppercase** | `text-transform:uppercase` ใช้กับละตินเท่านั้น | ไม่มีผลกับไทย แต่ทำให้คำไทย-อังกฤษปนดูไม่เท่ากัน |
| **ความยาวบรรทัด** | เนื้อความยาว จำกัดที่ `--container-narrow` (760px) | ไทยไม่มีช่องว่างระหว่างคำ บรรทัดยาวทำให้หาบรรทัดถัดไปไม่เจอ |

---

## 4. Component Patterns (HTML + CSS ล้วน ไม่มี React)

ก๊อป CSS ทั้งหมดต่อท้าย base ใน §3.2 ได้เลย — ทุกตัวใช้แต่ token จาก §2

### 4.1 Button

```css
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:var(--space-2);
  min-height:var(--tap);
  padding:var(--space-3) var(--space-5);
  font-family:inherit; font-size:var(--text-sm); font-weight:var(--weight-medium);
  line-height:var(--leading-ui);
  border:1px solid transparent; border-radius:var(--radius-md);
  cursor:pointer; text-decoration:none; white-space:nowrap;
  transition:background var(--duration) var(--ease), border-color var(--duration) var(--ease), opacity var(--duration) var(--ease);
}
.btn:disabled,.btn[aria-disabled="true"]{ opacity:.5; cursor:not-allowed; }

.btn-primary{ background:var(--primary); color:var(--primary-foreground); }
.btn-primary:hover:not(:disabled){ background:color-mix(in srgb, var(--primary) 88%, var(--foreground)); }

.btn-secondary{ background:var(--secondary); color:var(--secondary-foreground); }
.btn-secondary:hover:not(:disabled){ background:color-mix(in srgb, var(--secondary) 90%, var(--foreground)); }

.btn-outline{ background:var(--card); color:var(--card-foreground); border-color:var(--input); }
.btn-outline:hover:not(:disabled){ background:var(--accent); color:var(--accent-foreground); }

.btn-ghost{ background:transparent; color:var(--foreground); }
.btn-ghost:hover:not(:disabled){ background:var(--accent); color:var(--accent-foreground); }

.btn-destructive{ background:var(--destructive); color:var(--destructive-foreground); }
.btn-destructive:hover:not(:disabled){ background:color-mix(in srgb, var(--destructive) 88%, var(--foreground)); }

.btn-sm{ min-height:36px; padding:var(--space-2) var(--space-3); font-size:var(--text-xs); }
.btn-lg{ min-height:52px; padding:var(--space-4) var(--space-6); font-size:var(--text-base); }
.btn-block{ width:100%; }
```

```html
<button class="btn btn-primary">บันทึกใบเสนอราคา</button>
<button class="btn btn-outline">ยกเลิก</button>
<button class="btn btn-destructive btn-sm">ลบรายการ</button>
<button class="btn btn-ghost" disabled>กำลังคำนวณ…</button>
```

> `color-mix()` รองรับใน Chrome/Safari/Firefox ตั้งแต่ 2023 — ถ้าต้องซัพพอร์ตเบราว์เซอร์เก่า ใส่ `filter:brightness(.92)` แทนได้

### 4.2 Card

```css
.card{
  background:var(--card); color:var(--card-foreground);
  border:1px solid var(--border); border-radius:var(--radius-lg);
  box-shadow:var(--shadow-sm);
  overflow:hidden;
}
.card-header{ padding:var(--space-5) var(--space-5) 0; }
.card-title{ font-size:var(--text-lg); font-weight:var(--weight-semibold); line-height:var(--leading-tight); }
.card-desc{ margin-top:var(--space-1); font-size:var(--text-sm); color:var(--muted-foreground); line-height:var(--leading-body); }
.card-body{ padding:var(--space-5); }
.card-footer{
  display:flex; gap:var(--space-2); justify-content:flex-end;
  padding:var(--space-4) var(--space-5);
  border-top:1px solid var(--border);
  background:var(--muted);
}
.card-interactive{ cursor:pointer; transition:box-shadow var(--duration) var(--ease), border-color var(--duration) var(--ease); }
.card-interactive:hover{ box-shadow:var(--shadow-md); border-color:var(--input); }
```

```html
<article class="card">
  <div class="card-header">
    <h3 class="card-title">งานพิมพ์กล่อง VeeGee</h3>
    <p class="card-desc">อาร์ตการ์ด 350 แกรม เคลือบด้าน ปั๊มนูนโลโก้</p>
  </div>
  <div class="card-body"><p>จำนวน 1,000 ใบ · กำหนดส่ง 12 ก.ย. 2569</p></div>
  <div class="card-footer">
    <button class="btn btn-ghost btn-sm">แก้ไข</button>
    <button class="btn btn-primary btn-sm">ยืนยัน</button>
  </div>
</article>
```

### 4.3 Input / Field

```css
.field{ display:flex; flex-direction:column; gap:var(--space-2); }
.label{ font-size:var(--text-sm); font-weight:var(--weight-medium); color:var(--foreground); line-height:var(--leading-ui); }
.label .req{ color:var(--destructive); }

.input,.select,.textarea{
  width:100%; min-height:var(--tap);
  padding:var(--space-3) var(--space-4);
  font-family:inherit; font-size:var(--text-base); line-height:var(--leading-ui);
  color:var(--foreground); background:var(--card);
  border:1px solid var(--input); border-radius:var(--radius-md);
  transition:border-color var(--duration) var(--ease);
}
.textarea{ min-height:120px; line-height:var(--leading-body); resize:vertical; }
.select{ appearance:none; padding-right:var(--space-7); }
.input::placeholder,.textarea::placeholder{ color:var(--muted-foreground); }
.input:hover,.select:hover,.textarea:hover{ border-color:var(--foreground); }
.input:disabled,.select:disabled,.textarea:disabled{ background:var(--muted); color:var(--muted-foreground); cursor:not-allowed; }
.input[aria-invalid="true"],.textarea[aria-invalid="true"]{ border-color:var(--destructive); }

.hint{ font-size:var(--text-xs); color:var(--muted-foreground); line-height:var(--leading-ui); }
.error{ font-size:var(--text-xs); color:var(--destructive); font-weight:var(--weight-medium); line-height:var(--leading-ui); }
```

```html
<div class="field">
  <label class="label" for="qty">จำนวนที่สั่งพิมพ์ <span class="req">*</span></label>
  <input class="input" id="qty" type="number" inputmode="numeric" placeholder="เช่น 1000"
         aria-invalid="true" aria-describedby="qty-err">
  <p class="error" id="qty-err">ใส่จำนวนอย่างน้อย 100 ใบ แล้วกดคำนวณอีกครั้ง</p>
</div>
```

> ข้อความ error ต้องบอก **วิธีแก้** ไม่ใช่แค่บอกว่าพัง (SOP-04 ขั้น 3)
> `font-size` ของ input บนมือถือต้อง **≥16px** ไม่งั้น iOS Safari zoom เข้าอัตโนมัติ — `--text-base` จัดการให้แล้ว

### 4.4 Badge

```css
.badge{
  display:inline-flex; align-items:center; gap:var(--space-1);
  padding:2px var(--space-2);
  font-size:var(--text-xs); font-weight:var(--weight-medium); line-height:var(--leading-ui);
  border:1px solid transparent; border-radius:var(--radius-sm); white-space:nowrap;
}
.badge-neutral{ background:var(--muted); color:var(--muted-foreground); border-color:var(--border); }
.badge-primary{ background:var(--primary); color:var(--primary-foreground); }
.badge-success{ background:var(--success); color:var(--success-foreground); }
.badge-warning{ background:var(--warning); color:var(--warning-foreground); }
.badge-destructive{ background:var(--destructive); color:var(--destructive-foreground); }
.badge-gold{ background:var(--gold); color:var(--gold-foreground); }
.badge-outline{ background:transparent; color:var(--foreground); border-color:var(--input); }
```

```html
<span class="badge badge-success">ส่งมอบแล้ว</span>
<span class="badge badge-warning">รออนุมัติแบบ</span>
<span class="badge badge-destructive">เกินกำหนด</span>
<span class="badge badge-outline">ร่าง</span>
```

> ห้ามสื่อสถานะด้วย **สีอย่างเดียว** — ต้องมีข้อความกำกับเสมอ (คนตาบอดสีอ่านไม่ออก)

### 4.5 Table

```css
.table-wrap{ width:100%; overflow-x:auto; border:1px solid var(--border); border-radius:var(--radius-lg); background:var(--card); }
.table{ width:100%; border-collapse:collapse; font-size:var(--text-sm); line-height:var(--leading-ui); }
.table th,.table td{ padding:var(--space-3) var(--space-4); text-align:left; border-bottom:1px solid var(--border); }
.table thead th{
  position:sticky; top:0; z-index:1;
  background:var(--muted); color:var(--muted-foreground);
  font-size:var(--text-xs); font-weight:var(--weight-semibold);
}
.table tbody tr:last-child td{ border-bottom:0; }
.table tbody tr:hover{ background:var(--accent); color:var(--accent-foreground); }
.table .num{ text-align:right; font-family:var(--font-mono); font-variant-numeric:tabular-nums; white-space:nowrap; }
.table caption{ padding:var(--space-3) var(--space-4); text-align:left; font-size:var(--text-xs); color:var(--muted-foreground); }
```

```html
<div class="table-wrap">
  <table class="table">
    <caption>ต้นทุนกระดาษ ปรับล่าสุด 27 ส.ค. 2569</caption>
    <thead><tr><th scope="col">ชนิดกระดาษ</th><th scope="col">แกรม</th><th scope="col" class="num">บาท/รีม</th></tr></thead>
    <tbody>
      <tr><td>อาร์ตการ์ด HIKOTE</td><td>350</td><td class="num">1,240</td></tr>
      <tr><td>ปอนด์</td><td>80</td><td class="num">385</td></tr>
    </tbody>
  </table>
</div>
```

> ตารางต้องอยู่ใน `.table-wrap` เสมอ — บนจอ 360px ตารางเลื่อนในกล่องตัวเอง **หน้าเวปห้ามเลื่อนแนวนอน**

### 4.6 Dialog (ใช้ `<dialog>` ของ browser — ไม่ต้องมี library)

```css
.dialog{
  width:min(560px, calc(100vw - var(--space-6)));
  padding:0; border:1px solid var(--border); border-radius:var(--radius-xl);
  background:var(--popover); color:var(--popover-foreground);
  box-shadow:var(--shadow-lg);
}
.dialog::backdrop{ background:rgba(0,0,0,.55); backdrop-filter:blur(2px); }
.dialog-header{ padding:var(--space-5) var(--space-5) 0; }
.dialog-title{ font-size:var(--text-xl); font-weight:var(--weight-semibold); line-height:var(--leading-tight); }
.dialog-body{ padding:var(--space-4) var(--space-5); font-size:var(--text-base); line-height:var(--leading-body); }
.dialog-footer{ display:flex; gap:var(--space-2); justify-content:flex-end; flex-wrap:wrap; padding:var(--space-4) var(--space-5) var(--space-5); }
@media (max-width:480px){ .dialog-footer .btn{ flex:1 1 100%; } }
```

```html
<dialog class="dialog" id="confirm">
  <div class="dialog-header"><h2 class="dialog-title">ยืนยันการลบใบเสนอราคา</h2></div>
  <div class="dialog-body"><p>รายการนี้จะถูกลบถาวร กู้คืนไม่ได้ ต้องการดำเนินการต่อหรือไม่</p></div>
  <form method="dialog" class="dialog-footer">
    <button class="btn btn-ghost" value="cancel">ยกเลิก</button>
    <button class="btn btn-destructive" value="confirm">ลบถาวร</button>
  </form>
</dialog>
<button class="btn btn-outline" onclick="document.getElementById('confirm').showModal()">ลบ</button>
```

> `showModal()` จัดการ focus trap + ปิดด้วย Esc ให้เอง `<form method="dialog">` ปิดกล่องและส่งค่า `returnValue` โดยไม่ต้องเขียน JS

---

## 5. Layout & Spacing

### 5.1 Breakpoints (mobile-first — เขียน base เป็นมือถือ แล้ว `min-width` ขึ้นไป)

| ชื่อ | ค่า | ใช้ตอนไหน |
|---|---|---|
| base | 360px | **จอแคบสุดที่ต้องผ่าน** (SOP-08 §E) |
| sm | `≥480px` | มือถือแนวนอน — เลิกใช้ปุ่ม full-width |
| md | `≥768px` | แท็บเล็ต — grid 2 คอลัมน์, gutter ขยาย |
| lg | `≥1024px` | เดสก์ท็อป — grid 3 คอลัมน์, sidebar |
| xl | `≥1280px` | จอกว้าง — container เต็ม 1180px |

```css
.container{ width:100%; max-width:var(--container); margin-inline:auto; padding-inline:var(--gutter); }
.container-narrow{ max-width:var(--container-narrow); }

@media (min-width:768px){ :root{ --gutter:var(--space-5); } }

.section{ padding-block:var(--space-6); }
@media (min-width:768px){ .section{ padding-block:var(--space-8); } }

/* grid ที่ไม่ต้องเขียน media query — คอลัมน์ยุบเองตามที่ว่าง */
.grid{ display:grid; gap:var(--space-4); grid-template-columns:1fr; }
@media (min-width:768px){ .grid{ gap:var(--space-5); } }
.grid-auto{ grid-template-columns:repeat(auto-fit, minmax(min(260px,100%), 1fr)); }
.grid-2{ grid-template-columns:1fr; }
.grid-3{ grid-template-columns:1fr; }
@media (min-width:768px){ .grid-2,.grid-3{ grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px){ .grid-3{ grid-template-columns:repeat(3,1fr); } }

.stack{ display:flex; flex-direction:column; gap:var(--space-4); }
.row{ display:flex; align-items:center; gap:var(--space-3); flex-wrap:wrap; }

img,svg,video{ max-width:100%; height:auto; display:block; }
```

### 5.2 ระยะห่างมาตรฐาน (เลือกจากตารางนี้ ห้ามเดาเลขเอง)

| ระหว่าง | ค่า |
|---|---|
| icon ↔ ข้อความในปุ่ม | `--space-2` |
| padding ปุ่ม/input แนวตั้ง | `--space-3` |
| padding ในการ์ด (มือถือ) | `--space-4` |
| padding ในการ์ด (≥768px) | `--space-5` |
| gap ระหว่างการ์ดใน grid | `--space-4` → `--space-5` |
| ระหว่างกลุ่มเนื้อหาในหน้าเดียวกัน | `--space-6` |
| ระหว่าง section | `--space-7` มือถือ / `--space-8` เดสก์ท็อป |

**กฎ 1.5×:** ระยะระหว่างกลุ่มต้องมากกว่าระยะภายในกลุ่มอย่างน้อย 1.5 เท่า ไม่งั้นสายตาแยกไม่ออกว่าอะไรเป็นพวกเดียวกัน

### 5.3 ปุ่มสลับธีม (ถ้าเวปมี)

```html
<button class="btn btn-ghost btn-sm" id="theme-btn" aria-label="สลับธีมสว่าง/มืด">🌗</button>
<script>
(function(){
  var r=document.documentElement, k='tanapat-theme';
  try{ var s=localStorage.getItem(k); if(s) r.setAttribute('data-theme',s); }catch(e){}
  document.getElementById('theme-btn').addEventListener('click',function(){
    var cur=r.getAttribute('data-theme');
    if(!cur) cur=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    var next=cur==='dark'?'light':'dark';
    r.setAttribute('data-theme',next);
    try{ localStorage.setItem(k,next); }catch(e){}
  });
})();
</script>
```

> `try/catch` จำเป็น — โหมดส่วนตัวของบางเบราว์เซอร์ throw ตอนเรียก `localStorage`

---

## 6. Do / Don't — ข้อผิดที่ทำให้เวป "ไม่สวย"

| ❌ Don't | ✅ Do | ตัวอย่างจริงในทีม |
|---|---|---|
| ตั้งชื่อ token ใหม่ทุกโปรเจกต์ (`--paper`/`--bg`/`--ground`/`--txt`) | ก๊อป `:root` จาก §2 มาทั้งชุด แล้วเพิ่มเฉพาะ token เฉพาะทาง | 4 โปรเจกต์ 4 ชื่อ (ตาราง §1.3) |
| ทำแค่ light mode แล้วค่อยคิดเรื่อง dark ทีหลัง | เขียน 2 บล็อกสีพร้อมกันตั้งแต่แรก — ค่าใช้จ่าย 0 ถ้าใช้ token | มีแค่ `MyTrips`, `IdeaWebs` ที่รองรับ `prefers-color-scheme`; `AI Investment/index.html` เป็น dark-only |
| `word-break:break-word` กับข้อความไทย | ปล่อย default + ใช้ `.breakable` เฉพาะ URL/รหัส | `2RichMap/index.html:678` `.post-detail-body{…word-break:break-word}` |
| ตัดข้อความไทยด้วย `truncate`/ellipsis บรรทัดเดียว | `.clamp-2` / `.clamp-3` | `Program รายรับรายจ่าย/index.html:885` — ชื่อบริษัทไทย `truncate` ที่ `font-size:9px;line-height:1.15` |
| ตัวอักษรไทยเล็กกว่า 12px บนจอ | เนื้อความ ≥15px, meta ≥13px (จอ) — ต่ำกว่านี้ได้เฉพาะ **@media print** | `Program รายรับรายจ่าย/index.html:880` label ไทย `font-size:8px` (บนจอ) — ต่างจากบรรทัด 25-45 ที่อยู่ใน `@media print` ซึ่งยอมรับได้ |
| `line-height:1` กับข้อความไทย | `--leading-tight` (1.3) ขึ้นไป — `1` ใช้ได้เฉพาะตัวเลขล้วน | `Printing costs/index.html:110` `.stat-n{line-height:1}` เป็นตัวเลขล้วน จึงผ่าน แต่ห้ามลอกไปใช้กับคำไทย |
| ใส่ hex ตรง ๆ ใน component เพราะ "แค่สีเดียว" | เพิ่ม token ใน `:root` ทั้ง 2 ธีมก่อน | สีที่ hardcode คือสาเหตุอันดับ 1 ที่ dark mode พัง |
| ใช้ `--border` (สีจาง) เป็นขอบช่องกรอก | `--input` — ผ่าน 3:1 ตามเกณฑ์ UI component | ช่องกรอกที่ขอบจางเกินไป = มองไม่เห็นว่าเป็นช่องกรอก |
| ใส่เงาหนัก ๆ ทุกกล่องเพื่อให้ "ดูมีมิติ" | 1 หน้ามีระดับความสูงไม่เกิน 2 ระดับ: การ์ด = `--shadow-sm`, ลอย/hover = `--shadow-md`, dialog = `--shadow-lg` | เงาเยอะ = ไม่มีอะไรเด่นเลย |
| สื่อสถานะด้วยสีอย่างเดียว (จุดแดง/เขียว) | สี + ข้อความ + (ถ้ามี) ไอคอน | badge ทุกตัวใน §4.4 มีข้อความกำกับ |
| ปุ่มเล็กกว่า 44px บนมือถือ | `min-height:var(--tap)` | นิ้วโป้งกดพลาด = ผู้ใช้เลิกใช้ |
| ตารางกว้างดันหน้าเวปเลื่อนแนวนอน | ครอบด้วย `.table-wrap` (`overflow-x:auto`) | ตารางต้นทุนใน PrintCost/printorder ยาวกว่าจอมือถือเสมอ |
| `outline:none` ที่ focus เพราะ "ดูรก" | `:focus-visible` + `--ring` (§3.2) | คนใช้คีย์บอร์ดหาไม่เจอว่าตัวเองอยู่ตรงไหน |
| ระยะห่างเดาเอง (13px, 22px, 30px) | เลือกจาก `--space-1..8` เท่านั้น | ระยะไม่เป็นระบบ = ตาจับได้ว่า "รก" แม้บอกไม่ถูกว่าทำไม |
| โหลดฟอนต์ 3-4 family ในหน้าเดียว | 1 family หลัก (+ mono ถ้าจำเป็น) น้ำหนักเท่าที่ใช้จริง | `AGAPAE Agent/index.html` โหลด 3 family × หลายน้ำหนัก — โหลดช้าบนมือถือ |

---

## 7. Checklist ก่อนส่ง Chris QA

**Vera/Mind/Dale ต้องตรวจเองให้ครบก่อน** — ตกข้อไหน Chris ตีกลับทั้งงาน

### A. Token
- [ ] `:root` มีครบตาม §2 และ **มีบล็อก dark ครบทั้ง `@media (prefers-color-scheme: dark)` และ `[data-theme="dark"]`**
- [ ] `grep -n "#[0-9A-Fa-f]\{3,6\}" index.html` — hex ที่เจอต้องอยู่ในบล็อก `:root` เท่านั้น (ยกเว้น `rgba()` ในเงา)
- [ ] ทุก `var(--x)` ที่อ้าง มีประกาศจริง — ไม่มี token ผี
- [ ] `background` กับ `color` มาเป็นคู่ `X` / `X-foreground` ทุกที่

### B. ภาษาไทย
- [ ] line-height: ย่อหน้า ≥1.6 / หัวข้อ ≥1.3 — ไม่มี `line-height:1` บนข้อความไทย
- [ ] ไม่มีข้อความไทยเล็กกว่า 12px บนจอ (`@media print` ยกเว้นได้)
- [ ] ไม่มี `word-break:break-word|break-all` และไม่มี `letter-spacing` บนข้อความไทย
- [ ] ไม่มี `text-overflow:ellipsis` บรรทัดเดียวกับข้อความไทย — ใช้ `.clamp-*`
- [ ] ฟอนต์ไทยโหลดจริงบน URL production (ไม่ใช่แค่ localhost) สระ/วรรณยุกต์ไม่ลอย ไม่ชนกัน

### C. Layout
- [ ] ทดสอบที่ **360px** — ไม่มี horizontal scroll ของ `<body>`
- [ ] ตาราง/โค้ด/ไดอะแกรมกว้างเกิน อยู่ในกล่อง `overflow-x:auto` ของตัวเอง
- [ ] ปุ่ม/ลิงก์ที่กดได้ ≥44px ทุกตัวบนมือถือ
- [ ] ระยะห่างทุกจุดมาจาก `--space-1..8` ไม่มีเลขลอย
- [ ] ทดสอบครบทั้ง 5 breakpoint: 360 / 480 / 768 / 1024 / 1280

### D. สี & การเข้าถึง
- [ ] เปิดจริงทั้ง light และ dark — ไม่มีข้อความจมหาย ไม่มีกล่องขาวโพลนในธีมมืด
- [ ] contrast ตัวอักษร ≥4.5:1 / ขอบช่องกรอก ≥3:1 (สีใหม่ที่เพิ่มเองต้องคำนวณด้วย)
- [ ] ไม่มีสถานะที่สื่อด้วยสีอย่างเดียว
- [ ] กด `Tab` ไล่ทั้งหน้า — เห็น focus ring ทุกจุดทั้ง 2 ธีม
- [ ] `prefers-reduced-motion` ถูกเคารพ

### E. State & ความเรียบร้อย
- [ ] มีครบ 4 state: loading / success / error / empty (SOP-04 ขั้น 4)
- [ ] ข้อความ error **บอกวิธีแก้** ไม่ใช่แค่บอกว่าพัง
- [ ] Console ไม่มี error แดงค้าง (SOP-08 §E)
- [ ] `.nojekyll` มีอยู่ ถ้า deploy GitHub Pages (SOP-07)

---

## 8. เริ่มโปรเจกต์ใหม่ — ลำดับที่เร็วที่สุด

1. ก๊อป `<link>` ฟอนต์ (§3.1) + บล็อก `:root` และ dark (§2) + base CSS (§3.2)
2. ก๊อปเฉพาะ component ที่ใช้จริงจาก §4 (ไม่ต้องเอาทั้งหมด)
3. ก๊อป layout utilities จาก §5.1
4. เขียนเนื้อหาโดย**ไม่แตะสีใด ๆ** ใช้ class ที่มี
5. ต้องการโทนใหม่ → แก้ `--primary` / `--gold` / `--background` ใน `:root` **ทั้ง 2 ธีม** แล้วคำนวณ contrast ใหม่
6. ไล่ §7 ให้ครบ แล้วค่อยส่ง Chris
