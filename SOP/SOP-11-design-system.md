# SOP-11 — Design System สำหรับงานเวป (DESIGN.md + shadcn)

> เจ้าของ: **Vera** (token/layout) + **Mind** (visual) + **Dale** (implement/deploy) | Gate: **Chris** (SOP-08 D)
> เกิดจากแหล่งอ้างอิงที่ Kittanate ส่งมา 27 ส.ค. 2569: shadcn.io + บทความ design.md ของ somkiat
> หลักการ: **token เดียว ใช้ทุกโปรเจกต์ — ห้ามคิดสีเองหน้างาน**
> ใช้คู่กับ: SOP-04 (pipeline งานเวป), SOP-10 (งาน visual/print), skill `deploy-pages`

---

## 1. Scope

ครอบคลุม **งานเวปทุกชิ้น**ของทีม: เวปใหม่, redesign, แก้ใหญ่ที่แตะ UI (สี/ฟอนต์/ระยะ/คอมโพเนนต์)
ไม่ครอบคลุม: งานพิมพ์/artwork (→ SOP-10), แก้ bug ที่ไม่แตะ visual (→ SOP-04 ทางลัด `Dale → Chris`)

| บทบาท | หน้าที่ในระบบดีไซน์ |
|---|---|
| **Vera** | เจ้าของ `DESIGN.md` — นิยาม token, ลำดับชั้น, spacing, Thai text rules |
| **Mind** | palette / visual direction ที่ป้อนเข้า `DESIGN.md` |
| **Dale** | เลือกระดับ implement (A/B/C), แปลง token → CSS, build, deploy |
| **Chris** | Gate — ตรวจว่า UI ที่ออกมาตรง token จริง + ไทย render ถูก |

---

## 2. สรุปสิ่งที่ได้จากแหล่งอ้างอิง (เชิงเทคนิค)

### 2.1 DESIGN.md (Google Labs, spec เปิด)
- ไฟล์ Markdown ไฟล์เดียววางที่ root — **YAML front matter = token ที่เครื่องอ่าน** + **prose ใต้ลงมา = เหตุผลที่คนอ่าน**
- Token schema จริง: `name`, `colors`, `typography`, `rounded`, `spacing`, `components`
  อ้างอิงข้ามกันด้วย `{colors.primary}` ; ค่าสีใช้ CSS color อะไรก็ได้ (hex / `oklch()`)
- ลำดับ `##` section ที่ spec กำหนด: Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts
- CLI จริง (npm `@google/design.md`, ตรวจแล้วมีอยู่จริง, ล่าสุด 0.4.0):
  ```bash
  npx @google/design.md lint DESIGN.md      # เช็ค broken ref + WCAG AA contrast → JSON
  npx @google/design.md diff DESIGN.md DESIGN-v2.md
  npx @google/design.md export --format css-tailwind DESIGN.md > theme.css   # Tailwind v4 @theme
  npx @google/design.md export --format json-tailwind DESIGN.md             # Tailwind v3 theme.extend
  npx @google/design.md export --format dtcg DESIGN.md                      # W3C tokens.json
  npx @google/design.md spec                # พ่น spec ออกมาใส่ prompt agent ได้
  ```
- ⚠️ สถานะ spec = `alpha` ยังเปลี่ยนได้ → **อย่าผูก build pipeline ตายกับมัน** ใช้เป็นแหล่งความจริงของ token + ตัว lint พอ
- ⚠️ ยังไม่มี export เป็น **CSS variable ล้วน** (มีแต่ Tailwind/DTCG) → งานระดับ A ให้ Vera เขียนบล็อก `:root` ด้วยมือจาก YAML (ดู §4A)

### 2.2 shadcn / shadcn.io
- **shadcn/ui (ui.shadcn.com)** = ตัวจริง: React + Tailwind + Radix, CLI คือ `npx shadcn@latest init` แล้ว `npx shadcn@latest add <component>` — `init` สร้างไฟล์ `components.json` ; รองรับ template `next` / `vite` / `react-router` / `astro` / `laravel` ; base เลือกได้ `radix` / `base` / `aria`
- **shadcn.io** = registry ของชุมชน **ไม่ใช่ทีมทางการ** (เว็บระบุเองว่า "not affiliated with official shadcn/ui") — มี blocks/patterns/themes/icons จำนวนมาก และมี MCP (`claude mcp add shadcnio`)
  → สำหรับทีมเรา ใช้เป็น **แหล่งไอเดีย layout/pattern เท่านั้น** โค้ดที่มันให้เป็น React+Next ยกมาลง single-file ไม่ได้
- **สิ่งที่ยกมาใช้ได้จริงในโลก no-build** คือ *แนวคิด token* ของ shadcn ไม่ใช่โค้ด:
  ระบบสีเป็นคู่ `background/foreground` เสมอ — `--background/--foreground`, `--card/--card-foreground`, `--popover/…`, `--primary/…`, `--secondary/…`, `--muted/…`, `--accent/…`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1..5`, `--radius`
  ประกาศชุดสว่างที่ `:root` แล้ว override ทั้งชุดใน `.dark` — **นี่คือแพตเทิร์นที่เราลอกได้ 100% ด้วย CSS ล้วน** (MyTrips ทำแบบนี้อยู่แล้ว)
- **Basecoat** (basecoatui.com — "all of the shadcn/ui magic, none of the React") = CSS port ที่มีจริง ตรวจแล้วโหลดได้:
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/basecoat-css@1.0.2/dist/basecoat.cdn.min.css">
  <script src="https://cdn.jsdelivr.net/npm/basecoat-css@1.0.2/dist/js/all.min.js" defer></script>
  ```
  ขนาดจริงที่วัดมา: CSS 218 KB (≈22 KB gzip) / JS 44 KB (≈11 KB gzip)
  ในไฟล์มี: preflight + ตัวแปร `--color-primary`, `--color-card`, `--color-border`, … + `--radius*` + `.dark{}` + คลาสคอมโพเนนต์ `.btn .card .input .badge .alert .table .tabs .dialog .dropdown-menu .popover .select .toast .sidebar .accordion .avatar .breadcrumb .progress .skeleton …`
  **แต่ไม่มี utility class ของ Tailwind** (ไม่มี `.flex`, `.grid`, `.p-4`) → ต้องคู่กับ Tailwind CDN หรือเขียน layout CSS เอง

---

## 3. กติกา (บังคับ)

1. **`DESIGN.md` ที่ root ของ AGAPAE Agent คือแหล่งความจริงเดียวของ token** ทุกงานเวปใหม่/แก้ใหญ่ต้องอ้างไฟล์นี้ก่อนเขียน CSS บรรทัดแรก
2. **ห้าม hardcode สีนอก token** — ห้ามพิมพ์ `#2563eb` ลงในกฎ CSS/คลาส/inline style ตรงๆ ต้องผ่านตัวแปร เช่น `var(--primary)`
   ข้อยกเว้นที่อนุญาต: บล็อกประกาศตัวแปรเอง (`:root`, `.dark`), สีของ vendor lib ที่ config ไม่ได้, สี print `@media print`
3. ต้องการสีใหม่ที่ token ไม่มี → **ให้ Vera เพิ่มลง `DESIGN.md` ก่อน** แล้วค่อยใช้ ห้ามใส่ตรงในโปรเจกต์
4. **Dale ห้ามแก้ `DESIGN.md` เอง** (เจ้าของคือ Vera) — ต้องการเปลี่ยน token ให้เสนอผ่าน Claudy
5. ทุกคู่สี text/background ต้องผ่าน **WCAG AA (≥4.5:1)** — พิสูจน์ด้วย `npx @google/design.md lint DESIGN.md`
6. **ทุก CDN ต้องปักเวอร์ชัน** (`basecoat-css@1.0.2`) ห้ามใช้ floating tag ในงาน production
7. ทุกหน้าต้องรองรับ light + dark ด้วยแพตเทิร์น 3 บล็อก (§4A) เว้นแต่ระบุชัดว่า single-theme

---

## 4. แนวทาง 3 ระดับ — เลือกตามน้ำหนักงาน

| เกณฑ์ | A · CSS token ล้วน | B · Tailwind/Basecoat CDN | C · React + Vite + shadcn/ui |
|---|---|---|---|
| build step | ไม่มี | ไม่มี | มี (`npm run build`) |
| เหมาะกับ | แก้/ต่อยอด single-file เดิม | prototype ใหม่, หน้าที่ต้องการคอมโพเนนต์เยอะเร็วๆ | แอปใหม่ ≥5 หน้า / มี auth / CRUD / state ซับซ้อน |
| ค่าใช้จ่ายเน็ต | 0 | 22 KB–300 KB | bundle ของตัวเอง |
| FOUC | ไม่มี | มี (ถ้าใช้ Tailwind browser) | ไม่มี |
| **default ของทีม** | ✅ | เมื่อ A ไม่พอ | ต้องขออนุมัติ Kittanate |

### A — no-build: token + CSS ล้วน (ค่าเริ่มต้น ใช้กับของเดิมทุกตัว)

แปลง YAML ใน `DESIGN.md` เป็นบล็อกตัวแปร วางบนสุดของ `<style>` โดยใช้ **แพตเทิร์น 3 บล็อก** (แบบเดียวกับที่ `MyTrips/index.html` ใช้อยู่แล้ว — ทำให้ toggle ชนะทั้งสองทาง):

```css
:root{ --background:#F2F0EA; --foreground:#1F1A16; --primary:#8E2F2A; --border:#D8D3C7; --radius:10px; /* … */ }
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){ --background:#15120F; --foreground:#F0EAE1; /* … ทั้งชุด */ }
}
:root[data-theme="dark"]{ --background:#15120F; --foreground:#F0EAE1; /* … ทั้งชุด ซ้ำอีกรอบ */ }
```

- ใช้การตั้งชื่อคู่ `X / X-foreground` ตามแบบ shadcn — ทุกพื้นผิวต้องรู้ว่าตัวหนังสือบนตัวเองสีอะไร
- คอมโพเนนต์เขียนเป็นคลาสสั้นๆ ของตัวเอง (`.btn`, `.card`, `.input`) อ่านค่าจาก `var(--…)` เท่านั้น
- ยืม a11y pattern จาก shadcn ได้ฟรี ไม่ต้องลงไลบรารี: `:focus-visible{outline:2px solid var(--ring);outline-offset:2px}`, ปุ่มใช้ `<button type="button">` จริง, dialog ใช้ `<dialog>` ของ native, ทุก icon-only button ต้องมี `aria-label`
- ฟอนต์ไทย: `line-height ≥1.6`, `word-break:normal`, `overflow-wrap:anywhere` เฉพาะที่จำเป็น (SOP-04 ขั้น 4)

### B — no-build แต่ขอหน้าตาใกล้ shadcn

เลือกได้ 2 ทาง (ทั้งคู่ deploy บน GitHub Pages ได้ปกติ เพราะเป็นแค่ `<link>`/`<script>` ธรรมดา):

**B1 — Basecoat CSS อย่างเดียว** (แนะนำถ้าอยากได้หน้าตา shadcn โดยไม่ต้องเสี่ยง FOUC)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/basecoat-css@1.0.2/dist/basecoat.cdn.min.css">
<script src="https://cdn.jsdelivr.net/npm/basecoat-css@1.0.2/dist/js/all.min.js" defer></script>
```
- ➕ เป็น stylesheet ธรรมดา → เบราว์เซอร์บล็อก render ให้เอง **ไม่มี FOUC**, ~22 KB gzip, ใช้ได้กับ HTML ล้วน ไม่ต้องมี React
- ➖ **ไม่มี utility class** → layout ต้องเขียน CSS เอง (flex/grid ธรรมดา) หรือคู่กับ B2
- ➖ preflight ของมันจะ reset สไตล์เดิมของหน้า → **ห้ามใส่ทับหน้าเก่าที่มี CSS เยอะอยู่แล้ว** (เช่น PrintCost, dashboard) จะพังทั้งหน้า ใช้กับหน้าใหม่เท่านั้น
- override token ของมันด้วย `:root{--color-primary: …}` หลังไฟล์ CDN เพื่อให้ตรง `DESIGN.md`

**B2 — Tailwind ผ่าน CDN**
```html
<!-- v4 (ตัวที่เอกสารทางการแนะนำตอนนี้) ~282 KB -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<!-- v3 legacy — cdn.tailwindcss.com redirect ไป 3.4.17 ; budget2569 ใช้ตัวนี้อยู่ -->
<script src="https://cdn.tailwindcss.com"></script>
```
- ➖ **เอกสารทางการเขียนไว้ตรงๆ ว่า "Play CDN is designed for development purposes only, and is not intended for production"** → ใช้ได้กับ prototype/หน้าใช้ภายใน ห้ามใช้กับหน้าที่ลูกค้าเห็น เว้นแต่ Kittanate อนุมัติ
- ➖ คอมไพล์ CSS ตอน runtime → **FOUC ของจริง** บรรเทาได้ด้วย: ใส่ inline CSS สำหรับสีพื้น/ฟอนต์ไว้ใน `<head>` ก่อน + ซ่อนเนื้อหาจนสคริปต์ทำงานเสร็จ (`body{visibility:hidden}` แล้วเปิดใน `load`) — แต่ทางที่ถูกกว่าคือเลื่อนไประดับ C
- ถ้ายืนยันใช้: ดึง theme จาก `DESIGN.md` ด้วย `export --format css-tailwind` (v4) หรือ `--format json-tailwind` ใส่ `tailwind.config` inline (v3)

### C — React + Vite + shadcn/ui ของจริง

ใช้เมื่อเข้าเงื่อนไข **อย่างน้อย 2 ข้อ**: ≥5 หน้าจอ · มี auth/สิทธิ์ผู้ใช้ · CRUD หลาย entity · ต้อง reuse คอมโพเนนต์ข้ามหน้า · ไฟล์เดียวโตเกิน ~150 KB จนแก้แล้วพังบ่อย

```bash
npm create vite@latest <ชื่อโปรเจกต์> -- --template react
npx shadcn@latest init            # สร้าง components.json
npx shadcn@latest add button card input dialog
```
แล้ววาง token จาก `DESIGN.md` ลง theme:
```bash
npx @google/design.md export --format css-tailwind DESIGN.md > src/theme.css   # Tailwind v4
```
Deploy: ตั้ง `base: "/<ชื่อ-repo>/"` ใน `vite.config` + `.nojekyll` (skill `deploy-pages`)

**สถานะโปรเจกต์ทีม ณ ตอนนี้ — ยังไม่ต้องย้ายอะไรทั้งนั้น:**

| โปรเจกต์ | ตอนนี้ | คำแนะนำ |
|---|---|---|
| budget2569 | `index.html` เขียนมือ + `cdn.tailwindcss.com` (v3.4.17) + Firebase CDN — แต่ repo **มี Vite+React+Tailwind ใน package.json อยู่แล้ว** | **ผู้สมัครอันดับ 1 ของระดับ C** เพราะ toolchain มีครบแล้ว แต่ทำเมื่อมี feature ใหญ่เข้ามาเท่านั้น |
| AGAPAE dashboard | single-file 234 KB + `games.js` 85 KB | ใหญ่สุด/เสี่ยงสุด (Firestore realtime + routines) — **อยู่ระดับ A ต่อไป** จนกว่าจะมีเวลาว่างจริง |
| PrintCost, printorder, MyTrips, investai | single-file, CSS token เขียนมือ | **ระดับ A** พอ ไม่ต้องย้าย |

---

## 5. ขั้นตอนทำงาน

1. **รับงาน** — Claudy มอบหมาย → Dale/Vera `Read` `DESIGN.md` ก่อนเปิดไฟล์โปรเจกต์
2. **สำรวจของเดิม** — เปิดไฟล์จริง ดูว่า `:root` ตอนนี้มีตัวแปรอะไร, โหลด CDN อะไรอยู่, มีไฟล์คู่ต้อง sync ไหม (§6)
3. **เลือกระดับ A/B/C** ตามตาราง §4 → **เขียนเหตุผลลง Output ของ Dale** ถ้าเลือก B หรือ C ต้องแจ้ง Claudy ก่อนลงมือ
4. **map token** — สีเดิม → token ใหม่ ทำเป็นตารางสั้นๆ ; token ที่ยังไม่มีให้ Vera เพิ่มใน `DESIGN.md` ก่อน
5. **implement** — แก้เฉพาะบล็อกตัวแปร + จุดที่ hardcode ; อย่ารื้อ layout ถ้าโจทย์ไม่ได้ขอ
6. **self-check** — รัน checklist §7 ให้ครบก่อนส่ง
7. **Chris QA** — ตาม SOP-08 D + ต้องตรวจบน URL จริงหลัง deploy ไม่ใช่แค่ local (งาน pure design/layout ใส่ `[skip-factcheck]` พร้อมเหตุผล ตาม CLAUDE.md ข้อ 6)
8. **deploy** — skill **`deploy-pages`** (`.nojekyll` → push → ตั้ง Pages source → เปิด URL จริง → hard refresh ก่อนสรุปว่าพัง)
9. **บันทึก** — `Output/Dale/YYYY-MM-DD-<slug>-build.md` + worklog entry (skill `worklog-sync` ถ้า hook พลาด)

---

## 6. กับดัก (ตรวจแล้วว่าเกิดกับ repo ของเราจริง)

- **`.nojekyll`** — ไม่มี = Pages stall. ตรวจตอน 27 ส.ค. 2569: `budget2569` และ `MyTrips` มี / **`Printing costs` (PrintCost), `AI Investment` (investai), printorder ยังไม่มีไฟล์นี้ใน working dir** → ก่อน deploy งาน redesign ตัวไหน ให้เช็คซ้ำก่อนเสมอ
- **ไฟล์คู่ที่ต้อง sync มือ — token แก้ที่เดียวไม่พอ:**
  - `Printing costs/index.html` ↔ `Printing costs/PrintCost-Dashboard.html` (ปัจจุบัน byte-identical 113,140 B → **ต้อง `diff -q` ให้เหมือนกันก่อนปิดงานทุกครั้ง**)
  - `Program รายรับรายจ่าย/index.html` ↔ `budget2569.html` (ปัจจุบันเหมือนกัน) และ logic คำนวณซ้ำอยู่ใน `auto-report/report.js` → แก้สูตรต้องแก้ทั้งคู่
  - AGAPAE Agent: `index.html` ↔ `games.js` (สูตรเลเวลอยู่ 2 ที่)
- **Basecoat preflight ทับหน้าเก่า** — ห้ามยัด `basecoat.cdn.min.css` ใส่หน้าที่มี CSS เดิมเยอะ
- **Tailwind CDN = dev only** ตามเอกสารทางการ + FOUC + ทำ `@media print` เพี้ยนได้ → หน้าที่ต้องสั่งพิมพ์ (budget2569 มี print styles เต็มๆ) อย่าเปลี่ยนวิธีโหลด CSS โดยไม่ทดสอบพิมพ์จริง
- **Cache ของ Pages** — แก้แล้ว "ยังเหมือนเดิม" ให้ hard refresh / `?v=2` ก่อนสรุปว่าพัง
- **โค้ดจาก shadcn.io ยกมาตรงๆ ไม่ได้** — เป็น React/Next ของชุมชน ไม่ใช่ของทางการ ใช้ดูเป็นไอเดียเท่านั้น
- **DESIGN.md spec ยัง alpha** — อย่าผูก CI ให้ล้มเพราะ lint ของมัน ใช้เป็นตัวช่วยตรวจ ไม่ใช่ตัวตัดสิน
- **อย่าฝัง token/secret ใน remote URL หรือโค้ด client** (SOP-04 กติกา repo)

---

## 7. Checklist ปิดงาน

- [ ] อ่าน `DESIGN.md` แล้ว และระบุได้ว่าใช้ token ตัวไหนบ้าง
- [ ] เลือกระดับ A/B/C พร้อมเหตุผล (B/C แจ้ง Claudy แล้ว)
- [ ] `grep` หาสี hex/rgb ที่หลุดนอกบล็อกตัวแปร = 0 จุด (ยกเว้นที่อนุญาตใน §3 ข้อ 2)
- [ ] มีครบทั้ง 3 บล็อกธีม (`:root` / `prefers-color-scheme` / `[data-theme="dark"]`) และอ่านออกทั้งสองโหมด
- [ ] คู่สีข้อความ/พื้นผ่าน WCAG AA — รัน `npx @google/design.md lint DESIGN.md` แล้วไม่มี error
- [ ] `:focus-visible` เห็นชัดทุก control, icon-only button มี `aria-label`
- [ ] ไทย: line-height ≥1.6, ไม่ตัดคำกลางคำ, ฟอนต์โหลดจริงบน URL production
- [ ] มือถือจอแคบไม่ scroll แนวนอน
- [ ] CDN ทุกตัวปักเวอร์ชันแล้ว
- [ ] ไฟล์คู่ sync ครบ (`diff -q` ผ่าน) ตาม §6
- [ ] `.nojekyll` อยู่ครบใน repo ที่จะ deploy
- [ ] ทดสอบบน URL จริงหลัง deploy แล้ว (ไม่ใช่แค่ localhost)
- [ ] Chris QA ผ่าน + Output/worklog บันทึกแล้ว

---

## แหล่งอ้างอิง

- shadcn/ui ทางการ — https://ui.shadcn.com/docs/cli · https://ui.shadcn.com/docs/theming
- shadcn.io (registry ชุมชน ไม่สังกัดทางการ) — https://www.shadcn.io/
- Basecoat UI — https://basecoatui.com/installation/ · npm `basecoat-css@1.0.2`
- DESIGN.md — https://github.com/google-labs-code/design.md · npm `@google/design.md@0.4.0`
- บทความ design.md ของ somkiat — https://www.somkiat.cc/design-md/
- Tailwind Play CDN — https://tailwindcss.com/docs/installation/play-cdn
