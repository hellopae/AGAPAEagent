# AVEGEE K1d review — PASS (Dale, 15 ต.ค. 2026)

- merge: toby/k1d-map -> main (fast-forward, main ไม่เลื่อนจาก 21add07) · SHA `0f771f2` (f90c85f ของ Toby + 1 commit cache-bust ของ Dale)
- Pages: built ตรง `0f771f2` · https://hellopae.github.io/AVEGEE/ · เว็บจริงโหลด `img/map-zone1/v2/` (preview + chunk r1-r3) ไม่มี `terrain-*-v1` ไม่มี error

## รีวิว diff
- town-terrain เขียนใหม่ ไม่มี ctx.filter ต่อเฟรม/พื้น tile เก่า/โค้ดตาย · preload ถอด terrain/prop เก่า (ไฟล์เก่ายังอยู่ ไม่โหลด) · chunk ไม่มี eviction (สูงสุด 20 ชิ้น ~80MB GPU) — รับได้ ถ้ามือถือมีปัญหาค่อยเพิ่ม
- syncBlocks 40% ล่าง: เฉพาะ `zone==='th'` โซน 2-4 ไม่เปลี่ยน · ยมเข้าด้านหน้า/กลางตัวอาคารไม่ได้ (low/mid canWalk=false ทุก 10 หลัง) เดินหลังได้ (tea/krata/dab/sala ฯลฯ)
- hop=min(sp,d), clearLine margin (เฉพาะ SCENE.w==3840), spawnMob TOWN_SHORE_SPANS — ถูกต้อง
- **แก้ที่ Dale**: ใส่ `?v=k1d` ให้ครบและตรงกันทุก importer ของ town-layout / town-walkmask / walk / town-map (src, tests, output pages) + `game.js?v=...-j-k1d` + `map-ambient.js?v=mapfx-k1d` (game.js แก้เนื้อหาแต่ URL เดิม = เสี่ยงแคชเก่า) · เหตุที่ต้องตรงกันทุกที่: walk.js มี state ถ้า URL ต่างกันจะได้สอง instance
- ความเสี่ยงที่เหลือ: data.js (ไม่ได้แก้เนื้อหา) import town-layout ด้วย `?v=k1d` แล้ว แต่ URL data.js ของ 20 importer ยังไม่มี ?v= (Pages max-age=600) ผู้เล่นที่เปิดเว็บภายใน 10 นาทีก่อน deploy อาจเจอ data.js เก่าชั่วคราว — ไม่ทำ cascade ทั้งกราฟ (กันชนกับงาน Codex)

## เทสต์
- `node --test tests/*.test.mjs` 931/931 (หลังแก้ cache-bust)
- เดินจากลานกลางถึงครบ 10 ประตู (ห่าง 2.1-4.8 หน่วย) · สุ่ม 3: lan, dab, tea ผ่าน
- ยมเดินหลัง tea (1530,1290) และหลังไทร (2065,1642) ได้ ต้นไม้จางตามคาด · ภาพ 1×/5×/6.5× ลานกลาง+ท่าเรือคม ไม่เห็น tile เก่า

## fps (run_scenes.py, 1440x900 DPR2, Intel UHD 630)
| ฉาก | fps | min1s | p95 ms |
|---|---|---|---|
| idle 5× | 60 | 60 | 16.7 |
| เดิน 10 วิ | 59.3 | 58 | 16.7 |
| 1× | 60 | 60 | 16.7 |
| 3.5× | 60 | 60 | 16.7 |
| 5× | 60 | 60 | 16.8 |
| 6.5× idle | 60 | 60 | 16.8 |
| 6.5× เดิน | 59.3 | 55 | 16.7 |

ภาพหลักฐาน: `/tmp/k1d-review/*.jpg` · JSON: `/tmp/k1d-review.json`

## Rollback
`git revert -m` ไม่ต้อง (ff) → `git revert 0f771f2 f90c85f` แล้ว push (หรือ reset ไป 21add07 ถ้าคุณเป้อนุมัติ force)

## ล้างแล้ว
worktree `.toby-worktrees/k1d` + branch `toby/k1d-map` (local; remote ไม่เคยมี) · worktree Codex K1e (`20261015T054947Z-30467dfc`) ผมไม่ได้แตะ — ตอนจบพบว่าหายไปจาก `git worktree list` แล้ว (น่าจะ Codex run จบและเก็บเอง) ควรเช็คว่าผลงาน K1e ยังอยู่
