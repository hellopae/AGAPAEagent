# K2 review — AVEGEE เมนูต่อสู้/สอบสวน (Dale, 15 ต.ค. 2569)

ผล: **PASS** (หลัง Dale แก้ข้อเล็ก 4 ข้อใน worktree) · commit `6d36dcb` บน main (ฐาน `b5614fa`, fast-forward)

## รีวิว diff
เมนูเอียง -10° ข้อความ skew กลับ, ขั้นบันได, flyout สูง 40px, profile ใหญ่, ทีมชิด 62.5% ตรงใบงาน · `command-press.js` ใช้ pointer capture แล้วให้ `click` เดียวทำงาน (ไม่ยิงซ้ำ)

## ตรวจด้วยตา (Playwright Chromium 1678x937 DPR2, `output/game-review/index.html`)
ภาพอยู่ที่ `Output/Dale/k2-review/`
- เทียบต่อสู้: `compare-battle.jpg` (บน = ตัวอย่าง Battle9, ล่าง = เกมหลังแก้) · ดิบ `final-2-battle-power.png`, `final-6-battle-chosen.png`
- เทียบสอบสวน: `compare-interrogation.jpg` (บน = Comment8, ล่าง = เกม) · ดิบ `final-4-trial-where.png`
- ก่อนแก้: `a-*.png`, `b-*.png`

## ข้อที่ Dale แก้เอง (worktree)
1. ชื่อใน flyout ถูกตัดกลางคำ ("กระทะทอง...", "ป่าดาบอสิปั...") เพราะกฎเดิม `.orb-choice b{max-width:88px}` -> `max-width:none`, 14px (ทั้ง `battle-turns.css`, `trial-comment8.css`)
2. กล่องคำอธิบาย "คลิกศัตรูบนสนามเพื่อโจมตีทันที" (`.battle9-confirm`) และ heading ทับตัวศัตรูแล้วกินคลิก — เลือกพลังแล้วคลิกกลางตัวศัตรูไม่ติด (พิสูจน์ด้วย `elementFromPoint`: โดน `P.battle-command-preview`) -> `pointer-events:none` ยกเว้นปุ่มยกเลิก (แคบลง)
3. ชื่อ profile ยมบาทน้อยบรรทัดชิดจนสระซ้อน -> line-height 1.45
4. cache-bust css -> `-k2b` · เทสต์ใหม่ล็อกข้อ 1-2 (`tests/k2-menu.test.mjs` 5 ข้อ)

## ผลนับคลิก (mouse จริง `page.mouse.down/up`, rect คำนวณ ณ ตอนกด; เครื่องมือ `Output/Dale/k2-review/*-clicks-*.json`)
"ไม่ติด" = ไม่ได้ผลตามที่คาด หรือ pointerdown ไม่มี click ตามมา

| ชุด | คลิก | ไม่ติด |
|---|---|---|
| ต่อสู้เมนูหลัก (โจมตี/พลัง/ไอเท็ม เปิด-ปิด) เร็วติดกัน | 50 | 0 |
| เหมือนกัน คลิกขณะ animation (เว้น 55ms) | 50 | 0 |
| พลัง -> ท่า -> ศัตรู = ใช้ครั้งเดียว (เร็ว) | 10 รอบ | 0 (ใช้ 1 ครั้งทุกรอบ ไม่ซ้ำ) |
| โจมตี -> ศัตรู (เร็ว / ระหว่าง animation) | 10 + 10 | 0 / 0 (ใช้ 1 ครั้งทุกรอบ) |
| พลัง -> ท่า -> ศัตรู คลิกเว้น 45ms | 10 รอบ | 3 รอบ flyout ยังไม่โผล่ตอนคลิก (ดูหมายเหตุ) |
| สอบสวน ปุ่ม 4 กลุ่ม + ตัวเลือก + ปิด (เร็ว) | 111 | 3 (ทั้งหมดเป็นคลิกที่ <16 ms หลังเปิด flyout ตอนมัน reposition ใน rAF; เว้น 40ms = 1 ซึ่งคือปุ่ม "พลัง" ที่มีตัวเลือกเดียวแล้วถูกใช้ ไม่ใช่คลิกหาย) |
| สอบสวน คลิกเว้น 55ms | 110 | 0 |
| pointerdown ที่ไม่มี click ตามมา (ทุกชุด) | ~600 | 0 |

ก่อนแก้ข้อ 2 (รอบแรก): คลิกกลางตัวศัตรูหลังเลือกพลัง = ไม่ติด 10/10 (ถูกกล่องคำอธิบายบัง)

หมายเหตุ: เปิด flyout ใช้เวลา paint ~100-250ms (รวม poll) คนจริงไม่คลิกก่อนเห็นปุ่ม ไม่นับเป็นคลิกหาย แต่เป็นข้อมูลให้ K3 (Toby)
ข้อสังเกตเล็กไม่แก้: กล่องคำอธิบายยังบังตัวศัตรูตัวแรกทางสายตา (คลิกทะลุได้แล้ว); flyout ต่อสู้กว้าง ~280px ทับแถบ HP ศัตรูตัวที่สอง

## เทสต์
`node --test tests/*.test.mjs` บน worktree = 922/922 ผ่าน (921 ของ Codex + 1 ใหม่ของ Dale)

## Deploy / rollback
ดูท้ายรายงาน Claudy (SHA และสถานะ Pages) · rollback: `git revert 6d36dcb` บน main แล้ว push

## Deploy (เสร็จแล้ว)
main = `6d36dcb` push แล้ว · เทสต์บน main 922/922 · GitHub Pages build commit `6d36dcb829897782572369618f725a76e4f14896` สถานะ built · หน้าเว็บจริงเสิร์ฟ `battle-turns.css?v=...-k2b` · ล้าง worktree/branch codex แล้ว (`output/k2-shots/` ว่าง ไม่ได้อยู่ใน git)
