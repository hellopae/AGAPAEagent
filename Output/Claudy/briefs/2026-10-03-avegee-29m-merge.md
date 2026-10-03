# ใบงาน 29-M (Dale): AVEGEE — รีวิว + merge ชุด 29 (A → B → C → D)

Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ฐานทุก branch = main `e650294` · เทสต์ `node --test tests/*.test.mjs`
ใบงานต้นทาง: `Output/Claudy/briefs/2026-10-03-avegee-29{a,b,c,d}-*.md` (อ่านเกณฑ์รับงานของแต่ละใบ) · ภาพประกอบ `Output/Claudy/briefs/assets/29/` (ในเครื่องเท่านั้น)

## ที่มาของแต่ละ branch
| ใบ | ที่อยู่โค้ด | รายงานผู้ทำ | หมายเหตุ |
|---|---|---|---|
| 29A | worktree `.codex-worktrees/20261003T094416Z-ba81ac59` (branch `codex/20261003T094416Z-ba81ac59`, staged ไม่ commit) | `<worktree>/output/Toby/2026-10-03-avegee-29a.md` | เทสต์ 246 ผ่าน (self-check) |
| 29B | ⚠️ **ไม่ได้อยู่ใน worktree ตรง ๆ** — Codex โดน sandbox ห้ามเขียน refs เลยสร้าง repo ซ้อน: `.codex-worktrees/20261003T094419Z-d3f706d4/avegee-29b/` (gitdir = `…/avegee-base.git`, branch `codex/20261003-29b`, แก้ค้างไม่ commit) | `.codex-worktrees/20261003T094419Z-d3f706d4/Output/Toby/2026-10-03-avegee-29b.md` | worktree ชั้นนอกมี `avegee-base.git/` + `avegee-29b` ถูก `git add -A` stage ไว้ = ขยะ **ห้าม merge branch ชั้นนอกตามที่เป็น** · ดึง diff จาก `git -C …/avegee-29b diff e650294` (+ไฟล์ใหม่ `src/proximity.js`, `tests/proximity29b.test.mjs`) ไปลงบน branch สะอาดจาก main · `Output/Codex/runs/20261003T094419Z-d3f706d4/status.json` ค้าง `running` → แก้เป็น `ready_for_review` |
| 29C | `.toby-worktrees/29c` branch `toby/29c` (commit แล้ว) | `Output/Toby/2026-10-03-avegee-29c.md` | รอ Toby เสร็จ |
| 29D | worktree `.codex-worktrees/20261003T094424Z-8b7b19ee` | `<worktree>/output/Toby/2026-10-03-avegee-29d.md` | 7 ภาพ (รวม `item-lotus.png` เพราะไม่มีไฟล์ดอกบัวเดิม) + manifest + `output/Toby/29d/*` หลักฐาน |

## ขั้นตอน
1. รีวิว diff ทีละใบตามเกณฑ์รับงานของใบนั้น (โค้ดอ่านได้, ไม่เกินขอบเขต/ข้อห้าม, เทสต์มีความหมาย)
2. merge ตามลำดับ **29A → 29B → 29C → 29D** บน main · conflict แก้เอง (คาดว่าชน `src/ui.js`, `src/i18n.js`, `src/game.js`) · หลังแต่ละ merge รันเทสต์ทั้งหมด
3. **ต่อสาย 29D ↔ 29B**: ใส่พิกัดจุดนั่งพัก/ทางออก/จุดเกิด (% ของภาพ) จากรายงาน 29D ลง config ทางออกของ 29B สำหรับฉากชาโซน 1, ชาโซน 2, ดงงิ้ว, ภายใน lokan-asia · ตรวจว่าปุ่ม "ออกไปแผนที่" ขึ้นตรงบันไดจริง · 29A ไอคอนดาบ/ดอกบัวต้องโชว์ภาพจริงแทน fallback
4. **ตรวจในเบราว์เซอร์** (Codex ตรวจไม่ได้เพราะ sandbox): 1280×800 และ 390×844 — ปุ่มตามระยะ 3 แบบ, ปุ่มซ่อมบนแผนที่ไม่ล้นจอ, หน้าสถานที่ไม่มี X, หน้าต่างของใหม่ (29A), หน้าต่างหยุดเกม, ฉาก 29C (ตะราง/ประตูสวรรค์/event ชายแดน) · เก็บภาพหน้าจอไว้ที่ `Output/Dale/29m-shots/` (ห้ามใส่ภาพเกมใน commit ของ AGAPAE Agent — repo นี้เผยแพร่)
5. ข้อเล็กแก้เอง · ข้อใหญ่ → FIX LIST ให้ Claudy (แก้ได้ 1 รอบ)
6. `node --check src/*.js` · `git diff --check` · push main ให้ live อัปเดต
7. **แก้ `scripts/openai-worker.py`** (AGAPAE Agent) 2 จุดที่ทำ 29B พัง:
   - `git()` ใช้ `text=True` → diff ที่มีไฟล์ไบนารีทำ `UnicodeDecodeError` → ใช้ `errors='replace'` หรือเก็บ patch เป็น bytes (`--binary`)
   - ถ้า save_diff พัง ต้องยังเขียน `status.json` ปิดงาน (ไม่ค้าง `running`)
   - เทสต์/รันแห้งให้เห็นว่าไม่พัง · commit แยกใน AGAPAE Agent
8. ล้าง worktree/branch ชุด 29 ที่ merge แล้ว — **ถ้า permission ปฏิเสธ หยุด รายงานคำสั่งให้ Claudy ห้ามอ้อม**

## ข้อห้าม
- ห้ามรัน `scripts/make-manifest.py` (ดึงไฟล์ stray) — manifest ให้รวมจาก 29D ด้วยมือ
- ไม่แตะ `img/raw/`, `Exam/`, `files/`, `output/` (นอกจากไฟล์ที่มาจาก branch), `CONCEPT.md`
- ไม่เปลี่ยนสมดุลตัวเลข

## เกณฑ์รับงาน
1. main มีงาน 29A–D ครบ · เทสต์ผ่านทั้งหมด · push แล้ว live อัปเดต
2. ตารางเกณฑ์ของ 29A/B/C/D แต่ละข้อ: ผ่าน / แก้แล้ว / ไม่ผ่าน (ระบุ) — จากการตรวจในเบราว์เซอร์จริง
3. พิกัดทางออก 29D ลง config แล้ว ปุ่มขึ้นตรงทางออกจริง
4. openai-worker.py ไม่พังกับไฟล์ไบนารี
5. รายการ worktree ที่ลบ/ค้าง

## รายงาน
`Output/Dale/2026-10-03-avegee-29m.md` — commit hash main, ตารางเกณฑ์, FIX LIST (ถ้ามี), สิ่งที่คุณเป้ควรลองเล่นเอง
