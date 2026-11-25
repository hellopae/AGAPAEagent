# ใบงาน: AGAPAE Agent — แอปบนเครื่อง (Claude Artifact + Install as app)

ผู้ทำ: **Codex** (`--write`) · ผู้รีวิว: **Dale** · ผู้เผยแพร่: Claudy (Artifact tool)
วันที่: 26 พ.ย. 2569 · ประเภท: โค้ดภายใน (ไม่ผ่าน Reese ตามกฎข้อ 6 — gate คือ code review)

## บริบท

Claude Desktop ทำให้ Artifact กลายเป็น "แอปบนเครื่อง" ได้ (ปุ่ม Share → **Install as app**, Beta)
แอปที่ติดตั้งแล้วอ่านไฟล์ในเครื่องได้ แจ้งเตือนได้ ขึ้นตัวเลขบน Dock ได้ และมีไอคอนบนแถบเมนู
คุณเป้อยากได้ **App Agent AGAPAE** เป็นแอปแรก คือ dashboard ทีม agent ที่อ่านข้อมูลสดจากเครื่อง
ไม่ต้องรอ GitHub Pages deploy

ข้อมูลอยู่ในเครื่องที่ repo นี้:
`~/Documents/Work PAE/Claude/AGAPAE Agent/`
- `status.json` → `{updatedAt, agents:[{id,name,role,pipeline,img,persona,caps[],what[],status,task,report:{when,title,body}}]}`
  status มีค่า `idle | working | done` (อาจมีค่าอื่น ให้แสดงตามจริง)
- `worklog.json` → `{updatedAt, entries:[{id,datetime(ISO UTC),displayDate,displayTime,agent,agentName,agentImg,pipeline,status,title,summary,project?,projectLabel?,tags?,outputFile?}]}`
  เรียงใหม่สุดก่อน มี ~630 รายการ (652KB)
- `avatars/<Name>.png` (Claudy, Minnie, Reese, Addy, Rae, Vera, Mind, Chris, Libby, Nick, Dale, Toby, News, Codex, Astra)
- `work-mode.json` → `{mode: "both"|"claude-only"|"codex-only", updated, note}` (note ยาวมาก แสดงแค่ mode+updated)
- `review-mode.json` → `{mode: "build"|"ship", updated}`

## API ที่ต้องใช้ — อ่านก่อนเขียนบรรทัดแรก (บังคับ)

`/private/tmp/claude-501/bundled-skills/2.1.332/4618abc74da4e39850c3aa33ead2f369/artifact-capabilities/0.2.99/desktop.d.ts`
`/private/tmp/claude-501/bundled-skills/2.1.332/4618abc74da4e39850c3aa33ead2f369/artifact-capabilities/0.2.99/claude.d.ts`

(ถ้าอ่านไม่ได้ใน sandbox ให้ใช้สรุปนี้) `const desktop = await claude.use("desktop")`:
- `null` หรือไม่มี `desktop.fs` = ไม่ได้เปิดในแอปที่ติดตั้ง → ถ้า `await desktop?.install.state() === "available"` แสดงปุ่ม "ติดตั้งเป็นแอป" ที่เรียก `desktop.install.request()` จาก click; ไม่งั้นแสดง 1 บรรทัดว่า "หน้านี้ใช้ได้ในแอปบนเครื่อง ติดตั้งจาก Claude Desktop → Share → Install as app"
- `desktop.fs.readFile(path,"utf8"|"base64")`, `fs.stat(path)` → `{mtimeMs,...}` (path ขึ้นต้น `~/` ได้) — ต้อง `"full-access"`
- `desktop.notification.show({body})` — ต้อง `"notifications"`
- `desktop.app.dock.setIcon(pngDataUrl)` (วาด canvas 256px สี่เหลี่ยม < 256KB), `desktop.app.dock.setBadge(text)`
- `desktop.tray.set({icon, title, toolTip, menu:[{label, click}]})` — ต้อง `"menu-bar"` · icon = PNG data URL วาดดำบนโปร่งใส (template)
- `desktop.window.setOptions({...})` — เรียก **ครั้งเดียว ค่าเดิมเสมอ** ไม่งั้น reload วน · ใช้ `{titleBarStyle:"hiddenInset", dragHeight:36, width:1100, height:720, minWidth:420, minHeight:500}`; CSS `app-region: drag` ที่แถบหัว, `no-drag` ที่ปุ่ม
- `desktop.shell.openPath(path)` — เปิดไฟล์ด้วยแอปของมัน
- `desktop.permissions.state()` / `.request([...])` / `.manage()` — ทุก call ที่ต้องขอสิทธิ์: เรียกจาก click ครั้งแรก หรือเช็ค state ก่อน **ห้ามขอเปล่าๆ ตอนโหลด** (rejects ENOTSUP ตอนหน้าต่างซ่อน)
- error เป็น `Error` ที่ message ขึ้นต้นด้วยรหัส (`ENOENT`, `EPERM`, ...) → จับทุกตัว บอกว่าทำอะไรไม่ได้ ไม่พังทั้งหน้า
- manifest ใน HTML: `<script type="application/json" id="claude-artifacts-manifest">{"permissions":["full-access","notifications","menu-bar"]}</script>`

## ขอบเขต — ไฟล์เดียว

สร้าง **`apps/agent-desktop/index.html`** ไฟล์เดียว (ไม่มี build step ไม่มี framework)

### กติกาของหน้า Artifact (CSP — ผิดแล้วพังเงียบ)
- **ห้ามเขียน** `<!doctype>`, `<html>`, `<head>`, `<body>` — เริ่มไฟล์ด้วย `<title>AGAPAE Agent</title>`, `<meta name="claude:viewport-fit-sides" content="cover">`, manifest, `<style>` แล้วตามด้วยเนื้อหา + `<script type="module">`
- ฟอนต์จาก Google Fonts เท่านั้น (`IBM Plex Sans Thai`, `Trirong`, `IBM Plex Mono` ตาม DESIGN.md) มี fallback stack
- **ห้าม fetch()** ไปเว็บอื่น (โดน CSP บล็อก) — ข้อมูลทั้งหมดอ่านผ่าน `desktop.fs`
- avatar: อ่าน `avatars/<Name>.png` ด้วย `readFile(..., "base64")` → `data:image/png;base64,...` (แคชใน Map) — ถ้าอ่านไม่ได้ใช้วงกลมตัวอักษรแรก
- ข้อความจากไฟล์ JSON ใส่ด้วย `textContent` เท่านั้น ห้าม innerHTML กับข้อมูล
- ไม่มี `alert/confirm/prompt`; `localStorage` ใช้ได้แค่จำ filter/tab ห่อ try/catch
- สี: ใช้ token จาก `DESIGN.md` §2 (ก๊อปบล็อก `:root` + dark ทั้งสอง selector `@media (prefers-color-scheme: dark){:root:not([data-theme="light"])}` และ `:root[data-theme="dark"]`) — **ห้าม hardcode สีนอก token** · `body{background:var(--background);color:var(--foreground)}`
- ด้านข้าง: `padding-left:max(16px, env(safe-area-inset-left,0px))` + ขวาเหมือนกัน · ใช้ได้ที่ความกว้าง 420px ไม่มี scroll แนวนอน
- `font-variant-numeric: tabular-nums` กับเวลา/ตัวเลข · เคารพ `prefers-reduced-motion`

### เนื้อหาแอป
1. **แถบหัว** (ลากหน้าต่างได้): ชื่อ "AGAPAE Agent" · ชิป "โหมดทำงาน: both" · ชิป "โหมดตรวจ: build" · "อัปเดตล่าสุด HH:MM" (เวลาไทย จาก `status.updatedAt`) · ปุ่ม "รีเฟรช"
2. **สรุปบนสุด**: จำนวน agent กำลังทำงาน / เสร็จ / ว่าง (นับจาก status.agents) · งานวันนี้กี่ชิ้น (worklog วันนี้ตามเวลาไทย)
3. **ตารางทีม**: การ์ด agent ทุกตัว = avatar · ชื่อ · role · ป้ายสถานะ (working เด่นที่สุด มีจุดกระพริบ ปิดเมื่อ reduced-motion) · `task` · `report.title` + `report.when` · คลิกการ์ด = แผงรายละเอียด (persona, caps, what, report.body แบบ pre-wrap จำกัดความสูง scroll ได้)
4. **Work Log**: 50 รายการล่าสุด (มีปุ่ม "โหลดเพิ่ม" ทีละ 50) · กรองตาม agent (chips) + ช่องค้นหาข้อความ title/summary · แต่ละแถว: เวลา (displayDate displayTime) · avatar เล็ก · title · summary ตัดเหลือ 2 บรรทัด (คลิกขยาย) · ถ้ามี `outputFile` มีปุ่ม "เปิดไฟล์" → `shell.openPath(<repo>/<outputFile>)`
5. **ตั้งค่า (เล็กๆ ท้ายหน้า หรือ popover)**: ช่องแก้ path repo (ค่าเริ่มต้น `~/Documents/Work PAE/Claude/AGAPAE Agent`, จำใน localStorage) · ปุ่ม "เปิดสิทธิ์" ที่เรียก `desktop.permissions.request(["full-access","notifications","menu-bar"])` · ปุ่ม "จัดการสิทธิ์" → `permissions.manage()` · บรรทัดสถานะสิทธิ์แต่ละตัว

### พฤติกรรมสด
- **เปิดแอปครั้งแรก**: เช็ค `permissions.state("full-access")` — ถ้ายังเป็น `prompt` แสดงหน้าต้อนรับกลางจอ 1 ปุ่ม "อนุญาตให้อ่านไฟล์ทีม agent" (click → request) อธิบาย 1 บรรทัดว่าอ่านเฉพาะ status.json / worklog.json / avatars ในโฟลเดอร์ AGAPAE Agent · ถ้า `granted` โหลดทันที · `denied/unavailable` บอกตรงๆ + ปุ่มจัดการสิทธิ์
- **poll ทุก 15 วินาที**: `fs.stat` ของ status.json และ worklog.json → อ่านใหม่เฉพาะเมื่อ `mtimeMs` เปลี่ยน (worklog ใหญ่ อย่าอ่านทุกรอบ) · หยุด poll ตอน `document.visibilityState==="hidden"`? **ไม่** — ต้อง poll ต่อเพื่อแจ้งเตือน แต่ลดเป็นทุก 60 วิ
- **แจ้งเตือน**: เมื่อ worklog มี `id` ใหม่ที่ไม่เคยเห็น (เทียบกับชุด id ตอนโหลดครั้งแรก — **ไม่แจ้งตอนโหลดครั้งแรก**) → `notification.show({body: "<agentName> เสร็จแล้ว: <title>"})` (≤300 ตัว) · ถ้าใหม่ > 3 รายการพร้อมกัน รวมเป็นอันเดียว "งานเสร็จใหม่ N ชิ้น" · และเมื่อ agent เปลี่ยนเป็น `working` แจ้ง "<name> เริ่มงาน: <task>"
  - สิทธิ์ notifications: ขอพร้อม full-access ในปุ่มเดียวกัน · ถ้า denied ก็ทำงานต่อได้เงียบๆ
- **Dock badge** = จำนวน agent ที่ `working` (0 → `""`)
- **Dock icon**: วาดบน canvas 256px — พื้นสี่เหลี่ยมมุมมน สี `--primary` (อ่านค่าจาก getComputedStyle) ตัวอักษร "A" สี `--primary-foreground` ฟอนต์ Trirong หนา + จุดทอง `--gold` มุมขวาบน · เรียก `setIcon` ตอนโหลด (catch error)
- **Menu bar (tray)**: icon วาดดำบนโปร่งใส 36px (วงกลม + "A") · `title` = `"● N"` เมื่อมีคน working ไม่งั้น `""` · menu: "เปิดแอป" (`window.show()`), รายชื่อ agent ที่ working (disabled label), "รีเฟรช", "เปิดโฟลเดอร์ Output" (`shell.openPath(<repo>/Output)`) · set ใหม่ทุกครั้งข้อมูลเปลี่ยน · ถ้าสิทธิ์ menu-bar ไม่ได้ ข้าม

### สถานะที่ต้องรองรับ
- เปิดในเบราว์เซอร์/แผง artifact (ไม่มี fs) → ปุ่มติดตั้ง หรือข้อความ 1 บรรทัด (ดูด้านบน) + ภาพ preview ทีมแบบตัวอย่างก็ได้แต่ต้องเขียนกำกับว่า "ตัวอย่าง"
- path ผิด / ไฟล์ไม่มี (ENOENT) → ข้อความ "ไม่พบ status.json ที่ <path>" + ปุ่มไปตั้งค่า
- JSON พัง (อ่านกลางการเขียนของ hook) → เก็บข้อมูลเก่าไว้ ลองใหม่รอบถัดไป ไม่ขึ้น error ใหญ่

## ข้อห้าม
- ห้ามเขียนไฟล์ใดๆ บนเครื่อง (แอปนี้ **อ่านอย่างเดียว**) ห้าม `fs.writeFile/rm/rename`, ห้าม `childProcess`/`pty`
- ห้ามแก้ไฟล์อื่นใน repo นอกจาก `apps/agent-desktop/index.html` (และ `apps/agent-desktop/README.md` สั้นๆ ได้)
- ห้ามใส่ข้อมูลจริงจาก status/worklog ลงในไฟล์ HTML (แอปจะถูกเผยแพร่เป็น artifact) — sample ในโหมดเบราว์เซอร์ใช้ข้อความสมมุติที่ติดป้าย "ตัวอย่าง"
- ห้ามโหลด script จาก host อื่นนอก cdnjs/jsdelivr/unpkg (ไม่ควรต้องใช้ library เลย)
- ห้าม git commit/push เอง (wrapper ทำให้)

## เกณฑ์รับงาน (Dale ตรวจตามข้อ)
1. ไฟล์เดียว `apps/agent-desktop/index.html` ไม่มี doctype/html/head/body · มี `<title>AGAPAE Agent</title>` + manifest permissions ตรง 3 ตัว
2. ไม่มีการขอสิทธิ์ตอนโหลดเปล่า ทุก request มาจาก click หรือเช็ค state แล้ว · `window.setOptions` เรียกครั้งเดียวค่าคงที่
3. ข้อมูลจาก JSON ทุกจุดใส่ด้วย textContent (grep `innerHTML` ต้องไม่รับข้อมูลจากไฟล์)
4. poll อ่าน worklog ใหม่เฉพาะเมื่อ mtime เปลี่ยน · ไม่แจ้งเตือนตอนโหลดครั้งแรก · รวมแจ้งเตือน >3
5. ทุก desktop call มี catch · JSON parse พังไม่ทำให้หน้าหาย
6. สีทั้งหมดผ่าน token DESIGN.md · dark mode ทั้งสอง selector · body มี background
7. ใช้ได้ที่ 420px ไม่มี scroll แนวนอน · tap target ≥ 44px
8. ไม่มี write/delete/process call ใดๆ
9. ไม่มีข้อมูลจริงของทีมฝังในไฟล์
10. `node --check` ผ่านกับ script ที่แยกออกมา (Dale แยก `<script type="module">` ไปไฟล์ชั่วคราวแล้วเช็ค syntax)
