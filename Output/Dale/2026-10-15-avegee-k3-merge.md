# K3 merge — AVEGEE (Dale, 2026-10-15)

**ผล: PASS** · SHA บน main = `7cafbdb94f4c5354e0a8bcd39507cb7563e82ae5` (repo `/Users/agapae/agapae-work/AVEGEE`, origin hellopae/AVEGEE)
Pages: built ตรง SHA, https://hellopae.github.io/AVEGEE/ เสิร์ฟ `-r1-k3m` แล้ว

## ทำอะไร
- รีวิว diff Toby (994bbdd, 8232b0c): ถูกต้อง ไม่มีโค้ดตาย/hack; อบสีต้นไม้ด้วย filter ชุดเดิม, cull นอกจอ, cap chunk ตามจำนวนที่เห็น, pattern แชร์ต่อรูป
- rebase บน 6d36dcb (ชน index.html, src/ui.js, 2 เทสต์) → แก้ ได้ commit `fd73e1e`, `d36318c`
- commit `7cafbdb`: รวม cache-bust เป็น `-k3m` ที่ ui.js และ preload (index.html, output/game-review/index.html, import ใน ui.js) — review page เดิม preload ไม่มี suffix จะกลายเป็นคนละ module instance กับ ui.js จึงปรับให้ตรงกัน; อัปเดตเทสต์ skill-atk / west-hit-facing / k2-menu ให้รับ `-k3m`
- ตรวจ: import ของ town-terrain.js / town-scenery.js / scene.js ใช้ URL เดียวกันทุกที่ (ไม่เกิดโมดูลซ้ำ)

## เทสต์
`node --test tests/*.test.mjs` = 925 pass / 0 fail

## fps หลัง merge (Chromium, Intel UHD 630, 1440x900 DPR2, harness Toby)
| ฉาก | fps | p95 ms | long tasks |
|---|---|---|---|
| Zone1 idle ซูม 5x | 60 | 16.8 | 0 |
| Zone1 เดิน 10 วิ | 59.3 | 16.8 | 1 (102 ms) |
| ต่อสู้ idle | 60 | 16.7 | 0 |
| ต่อสู้ กดโจมตี 8 วิ | 59.3 | 16.8 | 1 (50 ms) |
| ต่อสู้ เปิดเมนูพลัง 8 วิ | 59.9 | 16.8 | 0 |
ไม่มี console error · ภาพต่อสู้/เมนูพลัง (เมนูเอียง K2) และแผนที่ถูกต้อง
สังเกต: กล่อง broken-image เล็กๆ มุมขวาล่างของแผนที่ มีอยู่บน main ก่อน merge เช่นกัน (ไม่ใช่จาก K3)
ภาพที่ถ่ายอยู่ scratch นอก repo

## ล้างงาน
ลบ worktree `.toby-worktrees/k3` + branch `toby/k3-perf` แล้ว · ไม่มี package.json (static site) จึงไม่มี npm build

## Rollback
`git revert 7cafbdb d36318c fd73e1e` บน main AVEGEE (หรือ reset ไป `6d36dcb`) แล้ว push
## ให้ Kittanate ลอง
ยืนนิ่ง/เดิน/ซูม 3.5x/ทั้งแผนที่/ต่อสู้ ต้องลื่น; ต้นไม้ลาวา-น้ำแข็ง-สวรรค์สีเหมือนเดิม; ควรยืนยันบน Brave จริง (ทดสอบบน Chromium)
