# Build note — TANAPAT บทความ 56 (สีโลโก้พิมพ์ไม่เหมือนบนจอ) · 5 พ.ย. 2569

Live: https://tanapat.co.th/article-56.html · Commit `c7c9f7c` (main, repo `Web tanapat/tanapat-website-v3`)

## สิ่งที่เปลี่ยน
- เพิ่ม `article-56.html` (ตามแม่แบบ 55: head/meta/canonical/og/twitter, schema Article + BreadcrumbList, GA4, answer box, สารบัญ 6 หัวข้อ, FAQ 5 ข้อ + FAQPage schema, art-nav, การ์ดบทความเกี่ยวข้อง 3 ใบ + rel-list 7 ลิงก์) · เนื้อหาตามฉบับ Rae หลังแก้ FIX LIST, ลบ 💬 ครบ, ไม่ขึ้นบล็อกหมายเหตุ
- `pic/bg51.webp` (1408x793, 48 KB, cwebp q80) จาก bg48.png — **เปลี่ยนชื่อเป็น bg51** เพราะ `pic/bg48.webp` มีอยู่แล้วและใช้กับบทความ 52 / index / articles (ถ้าเขียนทับรูปเก่าจะพัง)
- `tools/aeo7.json` เพิ่ม entry ของ 56 แล้วรัน `tools/inject_aeo.py` (ผลกระทบเฉพาะ article-56)
- `article-55.html`: art-nav เพิ่มปุ่ม "ถัดไป" ชี้ 56
- `articles.html`: การ์ดบนสุด, title/og title/description/h1 ข้อความ, `numberOfItems` + ItemList (renumber ตำแหน่ง)
- `index.html`: การ์ดใหม่บนสุด (ตัดการ์ด 49 ออก คงไว้ 6 ใบเหมือนเดิม), stat `data-cnt`, ข้อความ "รวม N บทความ", ปุ่ม "อ่านบทความทั้งหมด N เรื่อง"
- `sitemap.xml` (lastmod 2026-11-05), `llms.txt` (บรรทัดใหม่ในหมวดไฟล์งาน + ตัวเลขรวม)

## ตัวนับบทความ (ก่อน → หลัง)
จำนวนไฟล์จริง 53 → 54. ของเดิมไม่ตรงกันเอง จึงตั้งเป็น 54 ทุกจุด
- articles.html title/og:title "50 เรื่อง" → 54 · description/og:description/h1 "53" → 54 · ItemList numberOfItems 53 → 54
- index.html stat 50 → 54 · "รวม 53" → 54 · "ทั้งหมด 51 เรื่อง" → 54
- llms.txt 53 → 54 · ตัวนับ JS ของหน้ารวม (พบ N บทความ) = 54

## ตรวจ
- localhost + บนเว็บจริง, desktop 1280 / มือถือ 390: ไม่มี console error, ไม่มี request 4xx, ไม่มี horizontal scroll, JSON-LD ทุกก้อน parse ได้ (56 = 3 ก้อน), รูปโหลด, ลิงก์ภายในไม่ขาด, ไม่มี 💬 ในหน้า, 55 ↔ 56 ลิงก์ไปมาถูก
- Pages deploy ภายในไม่กี่นาที หน้า/รูป/sitemap/llms ขึ้นครบ

## Chris QA / ทดสอบเอง
เปิด https://tanapat.co.th/article-56.html ที่ 390 px: ดูรูปหัวบทความ, answer box, สารบัญกดข้ามหัวข้อ, FAQ กดเปิด, ปุ่มก่อนหน้า (55), หน้า articles.html ต้องเห็นการ์ด 56 บนสุดและ "พบ 54 บทความ"

## Roll back
`git revert c7c9f7c` แล้ว push main (ลบ 56, คืน 55/articles/index/sitemap/llms, ตัวเลข 50/51/53 เดิม) — รูป bg51.webp จะถูกลบพร้อมกัน
