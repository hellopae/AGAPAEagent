# ใบงาน P2-merge: AVEGEE — รีวิวโค้ด + merge `toby/p2-interrogation` ขึ้น main · เจ้าของ Dale

## บริบท
- ใบงาน: `Output/Claudy/briefs/2026-10-22-avegee-p2-interrogation.md` · รายงาน Toby: `Output/Toby/2026-10-22-avegee-p2-interrogation.md`
- branch `toby/p2-interrogation` HEAD `c2a7ce1` (push แล้ว) rebase บน main `4a3fd91` · Toby รายงานเทสต์ 1,251/0
- เปลี่ยน: ยามาไม่กระตุกตอนกดเมนู, ซูมเฉพาะจี้ถูก + overlay ตกใจ (รวมภาพ Codex `img/fx/fx-soul-*.webp` 4 ไฟล์), สีลักษณะล็อก `soul.traitKey` + กติกาแจกสีใหม่, คู่มือ 2 หน้า + หน้าต่างสอน, ไอคอนกานต์, แถบเลือกผู้คุม, คดี 15 บุญปลอม, "บารมี"→"กำลังใจ"
- คู่ขนาน: Toby P5 (แผนที่), Toby P1 (ช่วงต้นเกม) — ไม่ merge ของพวกเขา

## ขั้นตอน
1. รีวิว diff `main..toby/p2-interrogation`: เซฟเก่า (ล็อกสีตอนโหลด, ไม่พัง), ไม่เปลี่ยนตัวเลข role/ต้นทุน, การตัดสิน "จี้ถูก" ใช้ชนิดบรรทัด (ไม่ใช่ truth ในผลลัพธ์), cache-bust/importmap ตรงกัน (Toby บอกว่าห้ามใส่ `?v=` ใน import ตรง), ภาพ 4 ไฟล์มาจาก branch Codex ถูกต้อง, ไม่มีโค้ดดีบัก
2. **ข้อเล็กให้แก้เพิ่มเองใน branch (Claudy ตัดสินแล้ว):** `roles.kan.cost` ใน `src/interrogation.js` เปลี่ยน "MP 4" → "พลังเวท 4" ให้ตรงคำในเกม (เทสต์ L2 ห้าม UI ไทยมี MP) — แก้เทสต์ที่อ้างข้อความนี้ถ้ามี
3. ข้อใหญ่ → FIX LIST ถึง Claudy ไม่ merge
4. ผ่าน → clone `/Users/agapae/agapae-work/AVEGEE` (tree สะอาด): fetch → merge (`P2:`) → เทสต์ `> $TMPDIR/t.log 2>&1` grep `ℹ (tests|pass|fail)` 0 แดง → push main (ห้าม force) → Pages สำเร็จ → marker `-p2` บนเว็บจริง + ไฟล์โหลด 200 (รวม `img/fx/fx-soul-*.webp`)
5. ล้าง: ลบ worktree Codex `20261021T172203Z-8d1f1ffc` + branch `codex/20261021T172203Z-8d1f1ffc` (local+origin) หลัง merge เพราะภาพเข้า main แล้ว (ตาม `scripts/OPENAI-WORKERS.md`)

## ข้อห้าม
ห้ามแตะ clone ของ Codex (`/Users/agapae/Documents/Work PAE/Claude/AVEGEE`) · ห้าม merge branch อื่น · ห้าม force

## เกณฑ์รับงาน
PASS + merge commit + เทสต์ + Pages + marker — หรือ FIX LIST · รายงาน `Output/Dale/2026-10-22-avegee-p2-merge.md`
