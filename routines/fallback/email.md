รัน `node scripts/routine-freshness.mjs email` เป็นขั้นแรกจาก root ของ project
- exit 0: จบเงียบ ไม่เขียนอะไร
- exit 1: หยุดและรายงาน error ห้ามเดาหรือเขียน Firestore
- exit 10: เก็บ JSON 1 บรรทัดทั้งหมดเป็น snapshot ในโฟลเดอร์ชั่วคราวเฉพาะ run (`mktemp -d`) แล้วทำต่อ
ห้ามรัน freshness ซ้ำเพื่อเปลี่ยน updateTime ของ snapshot ระหว่างงาน
อ่านและทำตาม `routines/fallback/common.md` โดยใช้ key `email` ทุกขั้น รวมถึงการเขียนแบบ precondition จาก snapshot แรก
ใช้ web search ของ Codex แทน WebSearch; ทำทุกขั้นด้วยตัวเอง ไม่เรียก agent และไม่อ้างว่าผ่าน Reese/Chris QA

ต้องมี connector Gmail ใน session; ถ้าไม่มี/เรียกไม่ได้ หยุด ห้ามเขียน Firestore รายงานว่า "fallback ต้องการ connector Gmail" พร้อม tool/error ถ้ามี
ห้ามใช้ browser/computer-use เปิด Gmail แทน และห้ามขอ token/password
ใช้เครื่องมือ connector ของ Codex ที่เทียบเท่า search_threads; อ่านอย่างเดียว ห้ามส่ง สร้าง draft ติดป้าย ลบ หรือทำเครื่องหมายว่าอ่านแล้ว
Privacy: เผยแพร่ได้เฉพาะชื่อผู้ส่งกับเวลา ห้าม subject/snippet/เนื้อความ/เลขบัญชี/ยอดเงิน/อีเมลเต็ม ทั้ง payload ไฟล์ใน repo และรายงาน

## STEP 0 — วันที่วันนี้ (บังคับ ทำก่อนทุกอย่าง)

```bash
TZ='Asia/Bangkok' date '+%Y-%m-%d %A %H:%M'
```
เก็บเป็น **TODAY** — ห้ามเดาวันที่จากความจำของโมเดล · ปี พ.ศ. = ค.ศ. + 543
**TODAY_THAI** = เช่น `ศุกร์ 31 ก.ค. 2569` (weekday ไทย: Monday=จันทร์ Tuesday=อังคาร Wednesday=พุธ Thursday=พฤหัส Friday=ศุกร์ Saturday=เสาร์ Sunday=อาทิตย์)

## STEP 1 — ดึงอีเมลใหม่จาก Gmail

ใช้ connector Gmail เรียก `search_threads` ด้วย query:
```
is:unread in:inbox newer_than:2d
```
`pageSize` 20 · **เป็นงานอ่านอย่างเดียว ห้ามส่งเมล ห้ามสร้าง draft ห้ามติดป้าย ห้ามลบ ห้ามทำเครื่องหมายว่าอ่านแล้ว**

ถ้า connector เรียกไม่ได้ → **หยุดทันที ห้ามเขียน Firestore ด้วยข้อมูลมั่ว** แล้วรายงาน error

## STEP 2 — เขียน mail_items.txt ใน RUN_DIR

แปลงผู้ส่งเป็นชื่ออ่านง่าย แล้วเขียนบรรทัดละฉบับ **สูงสุด 6 บรรทัด** (ใหม่สุดอยู่บน) รูปแบบ:
```
<ชื่อผู้ส่ง> · <HH:MM>
```

กติกาแปลงชื่อผู้ส่ง — ให้อ่านแล้วรู้ทันทีว่าใครส่ง ไม่ใช่โชว์อีเมลแอดเดรสดิบ:
- ใช้ชื่อแบรนด์ที่อ่านง่าย เช่น K PLUS, K BIZ, Shopee, Netflix, Todoist หรือ พรรคประชาชน เมื่อระบุผู้ส่งได้จริง
- ถ้ามีชื่อผู้ส่ง (display name) อยู่แล้วให้ใช้ชื่อนั้น · ถ้าไม่มี ให้ใช้ชื่อโดเมนหลักแบบอ่านง่าย
- ผู้ส่งเดียวกันหลายฉบับ → รวมเป็นบรรทัดเดียวแล้วต่อท้ายว่า `(3 ฉบับ)` ใช้เวลาของฉบับล่าสุด
- เวลาเป็นเวลาไทย (Asia/Bangkok)

**ห้ามใส่ชื่อเรื่องหรือเนื้อหาลงบรรทัดเหล่านี้เด็ดขาด** — ตรวจซ้ำก่อนไปขั้นถัดไป

ถ้าไม่มีอีเมลใหม่เลย ให้เขียนไฟล์เป็นบรรทัดเดียวว่า `ยังไม่มีอีเมลใหม่`

นับจำนวนฉบับใหม่ทั้งหมด (นับตามจำนวนอีเมลจริง ไม่ใช่จำนวนบรรทัดหลังรวมผู้ส่ง) เก็บเป็น **COUNT**


COUNT นับฉบับจริง ไม่ใช่ thread หรือบรรทัด; ถ้าผลมี pagination ให้ดึงครบก่อนนับ โดยใช้ pageSize 20; ถ้า connector ให้เพียง thread ต้องอ่าน metadata จำนวนฉบับที่ตรง query โดยไม่เผยแพร่ subject/body
ตรวจ 1–6 บรรทัด ไม่มี subject, เรื่อง:, Re:, Fwd:, snippet, อีเมลเต็ม หรือข้อมูลส่วนตัวอื่นใน items
fields: title="อีเมลใหม่", date=TODAY_THAI, count=COUNT (Firestore integer), updatedAt=nowUTC, by="Email Check routine", items=[บรรทัดจากไฟล์], source="codex-fallback"
เขียน agents/email ผ่าน common.md พร้อม snapshot เดิม อ่านกลับแล้วรายงานจำนวนฉบับ ชื่อผู้ส่ง และผล sync เท่านั้น
