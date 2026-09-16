---
name: web-design
description: ทำให้งานเวปสวยและเป็นระบบเดียวกันด้วย design token ของ TANAPAT — ใช้ทุกครั้งที่สร้างเวป/หน้าใหม่, redesign, แก้ UI (สี ฟอนต์ ระยะ ปุ่ม การ์ด ตาราง ฟอร์ม dialog), ทำ dark mode, หรือแก้เวปที่ "ดูไม่สวย/ไม่เข้ากัน" เช่น dashboard, budget2569, PrintCost, printorder, MyTrips, investai
---

# Skill: web-design

> แหล่งความจริง: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/DESIGN.md`
> ขั้นตอน/การเลือกระดับ: `SOP/SOP-11-design-system.md` · งาน visual/print: `SOP-10` · pipeline งานเวป: `SOP-04`

## ขั้นที่ 0 — อ่าน DESIGN.md ก่อนเขียน CSS บรรทัดแรก (ห้ามข้าม)

```bash
cat "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/DESIGN.md"
```

ก๊อปบล็อก `:root` จาก §2 ไปวางบนสุดของ `<style>` — **อย่าพิมพ์ค่าสีจากความจำ** ค่าทุกคู่ในไฟล์ผ่าน WCAG AA มาแล้ว พิมพ์เองเมื่อไหร่ contrast พังเมื่อนั้น

## กติกา 5 ข้อ (ผิดข้อไหนถือว่างานยังไม่เสร็จ)

1. **ห้าม hardcode สี** — ทุกสีต้องมาจาก `var(--…)` ยกเว้นในบล็อกประกาศตัวแปรเอง (`:root`, `.dark`), สีของ lib ที่ config ไม่ได้, และ `@media print`
2. **ต้องการสีที่ token ไม่มี → ให้ Vera เพิ่มลง `DESIGN.md` ก่อน** ห้ามใส่ตรงในโปรเจกต์ (Dale ห้ามแก้ DESIGN.md เอง เสนอผ่าน Claudy)
3. **ทุกพื้นผิวต้องมีคู่ `X` / `X-foreground`** — ตามแบบ shadcn ทุกพื้นหลังต้องรู้ว่าตัวหนังสือบนตัวเองสีอะไร
4. **รองรับ light + dark ด้วยแพตเทิร์น 3 บล็อก** (§4A ของ SOP-11) เว้นแต่สั่งชัดว่า single-theme
5. **CDN ต้องปักเวอร์ชันเสมอ** (`basecoat-css@1.0.2`) ห้าม floating tag

## เลือกระดับ implement

| งานแบบนี้ | ใช้ |
|---|---|
| แก้/ต่อยอด single-file เดิมทุกตัว | **A — CSS token ล้วน** (ค่าเริ่มต้นของทีม) |
| prototype ใหม่ ต้องการคอมโพเนนต์เยอะเร็ว | B — Basecoat/Tailwind CDN (หน้าใหม่เท่านั้น มี preflight ที่รีเซ็ต CSS เดิม) |
| แอปใหม่ ≥5 หน้า / auth / CRUD / state ซับซ้อน | C — React+Vite+shadcn (**ต้องขออนุมัติเป้ก่อน**) |

⚠️ shadcn/ui ยกโค้ดมาใช้ในเวป single-file **ไม่ได้** (React+Tailwind+Radix) — ที่ยกมาได้คือ *ระบบ token* กับ a11y pattern
⚠️ `shadcn.io` ไม่ใช่เว็บทางการของ shadcn/ui — ใช้ดูไอเดีย layout ได้อย่างเดียว ของทางการคือ `ui.shadcn.com`

## ข้อความไทย (พลาดบ่อยสุด)

- เนื้อความไทยขั้นต่ำ **15px** (`--text-sm`) · 13px (`--text-xs`) ใช้ได้แค่ meta/label
- `line-height` เนื้อความ ≥1.6 · หัวข้อ ≥1.3 — ต่ำกว่านี้วรรณยุกต์ชนบรรทัดบน
- `word-break:normal` เสมอ · ใช้ `overflow-wrap:anywhere` เฉพาะที่จำเป็น
- ห้าม `truncate` ข้อความไทยที่ผู้ใช้ต้องอ่านจริง

## a11y ที่ได้ฟรีไม่ต้องลงไลบรารี

```css
:focus-visible{ outline:2px solid var(--ring); outline-offset:2px }
```
ปุ่มใช้ `<button type="button">` จริง · dialog ใช้ `<dialog>` native · icon-only button ต้องมี `aria-label`

## ปิดงาน

1. เดิน checklist §7 ของ `DESIGN.md`
2. `grep -nE "#[0-9a-fA-F]{3,6}" <ไฟล์>` — ต้องเจอเฉพาะในบล็อกประกาศตัวแปร
3. ทดสอบ light + dark + จอมือถือแคบ + ฟอนต์ไทย render จริง
4. ส่ง Chris QA → deploy ด้วย skill `deploy-pages` (อย่าลืม `.nojekyll`)
5. บันทึก worklog + push (skill `worklog-sync` ถ้า hook พลาด)

## ค้างอยู่ (แจ้งเป้แล้ว รอตัดสิน)

- `--primary:#8E2F2A` เป็นสีที่ Vera เลือกจากโทน MyTrips — ยังไม่ใช่สีแบรนด์ TANAPAT ทางการ ถ้าเปลี่ยนต้องคำนวณ contrast ใหม่ทั้งชุด
- ฟอนต์ default = IBM Plex Sans Thai แต่ budget2569/PrintCost ใช้ Sarabun อยู่ ยังไม่สั่งรื้อ
- `chart-1..5` สำหรับกราฟยังไม่ได้ทำ (investai/budget2569 มีกราฟ) — ถ้าต้องทำ ใช้ skill `dataviz` ประกอบ
