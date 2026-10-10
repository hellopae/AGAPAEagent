# ใบงาน: AVEGEE — ท่าโดนตี (cry) ชุดปัจฉิมพลิกผิดด้าน

- วันที่: 10 ต.ค. 2569 · เจ้าของ: Toby · ผู้ merge/push: Dale
- repo `/Users/agapae/agapae-work/AVEGEE` · branch `toby/west-hit` จาก `origin/main` ล่าสุด · worktree `../.toby-worktrees/west-hit`

## บริบท
Toby เจอตอนทำ I1-B (`AGAPAE Agent/Output/Toby/2026-10-10-avegee-i1b.md` บรรทัด 47): ในฉากต่อสู้ ท่าโดนตี (`hero-yama-west-cry` หรือชื่อใกล้เคียง)
ของชุดปัจฉิม (west) ถูกพลิกผิดด้าน · ชุดปัจฉิมเป็นชุดเดียวที่ภาพวาดหันขวามาแต่ต้น (ไม่ต้องพลิก) ส่วนชุดอื่นต้องพลิกกระจก
คุณเป้สั่งแก้เลย · I1-B แก้ `.atk` ไว้ใน `src/battle-facing.js` (`figYouAtkClass()`) — ดูทะเบียนพลิกที่เดียวกัน

## ขอบเขต
1. หาต้นเหตุ (ทะเบียนพลิกต่อชุด/ต่อท่า, กฎ CSS `.fig.you.*`, class ตอนโดนตี) แล้วแก้ให้ยมฯ **หันขวา (หาศัตรู) ทุกท่า** ในชุดปัจฉิม
2. ตรวจทุกท่าในฉากต่อสู้ × ทุกชุด (th / asia / west / cyberhell): ยืน, ฟันดาบธรรมดา, สกิล/atk, โดนตี(cry), rage — ต้องหันขวาทั้งหมด
   ทำตารางผลในรายงาน (ชุด × ท่า → transform ที่วัดได้จริงใน browser)
3. เทสต์กันถอยกลับใน `tests/west-hit-facing.test.mjs`

## ข้อห้าม
- ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` (Codex app) และ `../.toby-worktrees/cover-fx` (Toby อีกตัวทำอยู่)
- ห้ามแก้ไฟล์ภาพ (แก้ที่โค้ด/ทะเบียนพลิก) · ห้าม push main

## เกณฑ์รับงาน
1. ชุดปัจฉิมโดนตีแล้วหันขวา · ตารางชุด × ท่า หันขวาครบ
2. `node --test tests/*.test.mjs` ผ่านหมด · cache-bust ต่อท้าย `-westhit` · ก่อนส่ง fetch + merge origin/main รันเทสต์ซ้ำ
3. ภาพหลักฐานก่อน/หลัง `AGAPAE Agent/Output/Toby/evidence/2026-10-10-west-hit/` · รายงาน `AGAPAE Agent/Output/Toby/2026-10-10-avegee-west-hit.md`
