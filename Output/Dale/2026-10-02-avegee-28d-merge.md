# AVEGEE 28D — รีวิวภาพ Codex + merge (สถานะ: เสร็จ merge + push + live 200)

Codex run `20261002T080502Z-03066567` (status failed ตอนสรุปท้ายเพราะ model at capacity; งานจริงเสร็จ) ไฟล์ค้างใน worktree ไม่ได้ commit
Dale ตรวจด้วยตาทุกไฟล์ → commit ใน worktree (`9243a2f`) → merge เข้า main

## ผลตรวจภาพทีละไฟล์
| ไฟล์ | ผล | หมายเหตุ |
|---|---|---|
| `img/BG-Tea.webp` | ผ่าน | เทียบเดิม/ใหม่ซูม 3x: โต๊ะเตี้ย+ขา+เงาหาย พรมต่อเนื่อง ลายขอบครบ ไม่มีรอยต่อ · **ความละเอียดเท่าเดิม 1024×925** (ใบงานบอก "เท่าหรือมากกว่า") ความคมดีขึ้นเล็กน้อยเท่านั้น ไม่ใช่ก้าวกระโดด · เปิดในเกมจริง (Playwright 1440×810): ยมบาทยืน/นั่งกลางพรมตรงที่เคยเป็นโต๊ะ ปุ่ม "นั่งพัก" อยู่เหนือหัวพอดี `ROOMS.tea.ui4.me` แก้เป็น [0.478,0.695] (= `act`) ดูเข้ากัน |
| `img/item-holywater.png` | ผ่าน | 512² RGBA พื้นใส (มุมโปร่ง) ไหเซรามิกขาว-ลายน้ำเงิน มีหยดน้ำฟ้า น้ำสีฟ้าที่ปาก โทนฟ้า-ขาวต่างจากหีบยาแดง/น้ำตาล สไตล์พิกเซลใกล้เคียง item-tea/health (รายละเอียดละเอียดกว่าเล็กน้อย) |
| `West/hero-boss-west-v2.png` | ผ่าน | หมวกไวกิ้ง+เคราขาว+อีกา+หอก+เสื้อคลุมขน หัวใหญ่ลำตัวสั้นแบบ chibi ตาม prompt · บัลลังก์ครบในเฟรม 512² พื้นใส |
| `CyberHell/hero-boss-cyberhell-v2.png` | ผ่าน | ผมเงินเคราขาว มงกุฎเงินอัญมณีฟ้า ชุดดำ-ม่วงลายวงจร ถือแผ่นฟ้า บัลลังก์คริสตัล หัวใหญ่ตามสัดส่วนอ้างอิง |
| `story-cyberhell-02-v3.png` | ผ่าน (ย่อแล้ว) | 4 หัวหน้านั่งพื้นถูกพันธนาการ ไม่มีเก้าอี้ ผู้ตรวจการยืนหลัง ยมบาทหันหลังหน้าซ้าย มุมมอง eye-level สม่ำเสมอ แถบดำคงอยู่ · ย่อจาก 1671px/759KB → **1280×721, 256 สี, 502KB** (เหมือนแผงรอบ 28-0) |
| `story-cyberhell-03-v4.png` | ผ่าน (ย่อแล้ว) | ยมบาทเผชิญหน้าผู้ตรวจการ หัวหน้าทั้งสี่นั่งยองริมแม่น้ำ มุมมองกลมกลืน ไม่มี top-down · ย่อ 1672px/780KB → **1280×720, 256 สี, 512KB** |

โค้ด/manifest: `story.js` ชี้ไป `cyberhell-02-v3` / `03-v4` · `art.js` ทำ ZMAP ให้ `hero-boss-west|cyberhell` ใช้ `-v2` (มี fallback ถ้า manifest เก่า) · manifest เพิ่ม 5 รายการ (item-holywater, 2 panel, 2 hero v2 ในโซน) ทุกรายการมีไฟล์จริง
`scripts/prep-art.py` (2 แก้): ชื่อ `*-<zone>-v<N>` ไม่ถูกต่อ suffix โซน · ภาพ `story-*` ใช้เส้นทางฉากเต็ม (ไม่ทำ standee) — เหมาะ ไม่กระทบไฟล์อื่น
ไม่ commit `output/28d-art.json` (ตามสั่ง) · ไม่มีโค้ดอ้าง `img/raw/`

## สิ่งที่ Dale แก้เพิ่ม
- ย่อ panel story 2 ไฟล์ (ข้างบน) + แก้ assert ใน `tests/art28d.test.mjs` จาก `width > 1500` เป็น `== 1280`

## Merge / ทดสอบ
- Codex branch commit `9243a2f` → **Merge commit `a0fd5a8`** เข้า main · ไม่มี conflict · push `ae19464..a0fd5a8`
- เทสต์บน main: **209/209 ผ่าน** · `node --check src/*.js` ผ่าน · `git diff --check` สะอาด · manifest ไม่มีรายการที่ไฟล์ไม่มี
- Live (https://hellopae.github.io/AVEGEE/): item-holywater.png, BG-Tea.webp, hero-boss-west-v2, hero-boss-cyberhell-v2, story-cyberhell-02-v3, story-cyberhell-03-v4 ตอบ **200** ทั้งหมด · manifest/story.js live ชี้ของใหม่

## ยังไม่ได้ทดสอบ
ฉาก story cyber-control/cyber-duel และพื้นที่ห้องผู้ปกครองโซน 3/4 ในเกมจริง (ดูภาพไฟล์ตรง ๆ + เทสต์ระดับไฟล์/ลิงก์เท่านั้น) · มือถือจริง

## Rollback
`git revert -m 1 a0fd5a8`
