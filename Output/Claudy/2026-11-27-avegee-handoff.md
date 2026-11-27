# AVEGEE handoff Claude → Codex · 27 พ.ย. 2569
(คุณเป้: "เมื่อใกล้ชน limited ให้เขียน สรุปงาน ที่ทำแล้ว และคิวงานที่ค้างอยู่ ส่งให้ Codex ด้วยนะครับ" — Claude weekly เหลือ ~15% ตอนเขียน · อัปเดตไฟล์นี้ทุกครั้งที่งานขยับ)

## repo / วิธีทำงาน
- clone ของ Claude: `/Users/agapae/agapae-work/AVEGEE` · main ล่าสุดดู `git log origin/main -1` · worktree Toby `~/agapae-work/.toby-worktrees/fb3` branch `toby/fb3`
- เทสต์เต็มรอบ: `node --test --test-concurrency=6 tests/*.test.mjs > "$TMPDIR/t.log" 2>&1; grep -E 'ℹ (tests|pass|fail|cancelled)' "$TMPDIR/t.log"` (อย่า pipe เข้า tail · concurrency สูง `balance28b` อาจค้าง)
- cache: แก้โมดูลแล้ว bump id (`scripts/bump-cache-id.py`) · importmap ครบ 318 entry แล้ว (มีเทสต์กันหลุด)
- deploy Pages ล้ม: `gh run rerun <id> --failed` ครั้งเดียว · ถ้า "Multiple artifacts" ใช้ `gh workflow run "Deploy Pages"` · ยืนยัน `https://hellopae.github.io/AVEGEE/version.json` = main
- ภาพ .webp เท่านั้น · ห้ามย้อมสีภาพศิลป์ด้วยโค้ด (กลับซ้ายขวาได้) · ภาพใหม่เขียนทับชื่อเดิม = ไม่ต้องแก้โค้ด
- แผนรวม/ต้นฉบับคุณเป้: `Output/Claudy/2026-11-26-avegee-feedback/PLAN.md` + `owner-comments.md` (ทุกรหัส EV/BT/MN/MP/O)

## ทำเสร็จแล้ว (merge main + deploy ทุกงาน)
| งาน | commit main | สรุป |
|---|---|---|
| T1 จังหวะศึก | `b95ece93` | ตัดหนี · ขยายวูบ · เมนูตอนพุ่ง · เสียง restore · combo แรงขึ้น · จัดทีมจากนิรา |
| CLEAN / CLEAN2 | `5ca0ab78` / `e3ca71e8` | ลบไฟล์ไม่ใช้ 65 + 330 ไฟล์ (−104 MB) · Pages ~836 MB |
| T2 ขนาด/ทิศ/ชั้นภาพ | `a9d02d4f` | ชั้นความสูงศัตรู `battle-foe-size.js` · ทิศ `battle-facing.js` |
| R1+T3 สอบสวน/ข้อความ | `41b68754` | สีดาหน้าปกติ · "(ไม่นับ)" `merit-count.js` · วันทอง/ขุนแผน/กุมภัณฑ์/ยมทัต · พยาบาล |
| T4 ระบบอัญเชิญ v2 | `6e752785` | ตัวอัญเชิญยืนในทีม 3 ตา · cutscene ตะเกียง (fallback) · หันขวา |
| T5 ตำแหน่ง/ศึกชายแดน | `1e4f8ba2` | ขุนแผน/ยมทัต/หนุมานบนแท่น · กองทัพขยับ · หอส่องกรรมเปิดเมื่อได้ตะเกียง |
| T-LIB ศึกปลดปล่อย | `0055de1c` | ยามา+นิรา vs Guard → นิราปลด → Guard เข้าทีม → ระลอก 1–2 · ไฟไหม้โซน 1–3 · 15 คดี |
| T6 UI เมือง | `1ee24f4a` | ย่อแถบ/กล่อง/ก่อสร้าง · bubble ตามวิญญาณ · แจ้งสร้างได้ · มินิเกมลูกไฟ · บอสสะกด idle |
| T7 / T7b | `c65fdc22` / `f0007d8c` | ครัวทำเอง `KITCHEN` · ดำในโรงอาหาร · หิน · ศาลาน้ำชากระโดด · ชั้นหน้าห้องตัดลิ่ม |
| T9 ต้นไม้ | `17768867` | สีต้นไม้ห้องโซน 1 ตามตำแหน่ง · ต้นไม้แผนที่ไหว · ลบ tree-asia-v1 · การ์ดคู่มือ 28→26 |
| R2+T8 ข้อความ/คู่มือ | `b6ad1183` | ข้อความ Rae ก–ฏ · คู่มือ 5 หน้า · ตะเกียงตนละ 1 ครั้ง (ช่องสูงสุด 4) · "หอส่องกรรม" |

## กำลังทำ / คิวค้าง (ทำตามลำดับ)
1. ~~T9~~ merge แล้ว
2. **คิววาด Codex `queue-1126c`** เริ่ม 27 พ.ย. 10:55 (log `Output/Codex/runs/queue-1126c.log`) ทีละ 2: [C1a,C1b] → [C1c,C2] → [C5a,C4] → [C3,C5b] → [C6,C5c] → [C7,C8] · ใบงาน `Output/Codex/runs/art-1126-*.md`
   - หลังแต่ละ run: ตรวจภาพ (compare.jpg) → merge branch `codex/<run_id>` · **story-* ที่วาดใหม่ต้องลบ crop ใน `src/cutscene-presentation.js` CONTENT_ROWS** · นับขนาด build
   - C2: ถ้าวันทองใหม่หันซ้าย ลบ `soul-wanthong-th` ออกจาก `TRIAL_SOUL_DRAWN_FACING_RIGHT` (`src/battle-facing.js`)
   - C3 = แบบลูซิเฟอร์ **รอคุณเป้อนุมัติ** ก่อนใช้
   - C4 `img/summon/cut-lamp-summon-*` · C6 หัวหน้าคนงาน · C8 `cut-z{1,2,3}-guard-freed` — โค้ดผูกชื่อ+fallback ไว้แล้ว วางไฟล์ใช้ได้ทันที
3. **T10 เอฟเฟกต์ในอาคาร** (Toby เริ่ม 27 พ.ย. บน `toby/fb3` — ถ้าค้าง ดู `git log origin/main..origin/toby/fb3`) `briefs/2026-11-26-avegee-fb3-t10-room-fx.md` (โซน 1 เงาเมฆ/ใบร่วง/ลาวา · 2 แสงเงา · 3 หิมะ · 4 ฝน)
4. **T-WALK** หลัง C7 มา `briefs/2026-11-27-avegee-fb3-twalk.md`
5. **T11 ซิมสมดุล** `briefs/2026-11-27-avegee-fb3-t11-balance.md`
6. ทีหลัง (O5): หุ่นซ้อม H4 · มินิเกม 4 อาคาร · เดินแผนที่ย้อนจริง

## รอคุณเป้
- ลองเล่น: เสียง restore · แรงท่าประสาน · ศึกปลดปล่อยระลอก 2 ถึง `z1-restored` (ยังไม่มีใครเล่นจนจบผ่านหน้าจอ) · มินิเกมลูกไฟบนมือถือจริง
- อนุมัติแบบลูซิเฟอร์ (C3) · หัวนาค/ยอดเสาในห้องโซน 1 ไม่บังตัวละครแล้ว (ถ้าต้องการให้บัง ต้องวาดชั้นหน้าใหม่)
- ข้อตัดสินท้ายบท R2 A–D (ค้างจาก handoff 20 พ.ย.)
