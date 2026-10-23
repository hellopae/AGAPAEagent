# AVEGEE M1 — สเปก + prompt งานวาดแผนที่โซน 2 (บูรพา / asia) ให้ Codex

ทำโดย Mind · ใบงาน `Output/Claudy/briefs/2026-10-23-avegee-m1-zone2-art-spec.md` · ตาม SOP-10
แหล่งความจริงไฟล์/ขนาด/พิกัด: `Output/Toby/2026-10-23-avegee-m0-map-survey.md` (ข้อ 1A, 4.1 แถว Z2, 4.2, 4.4) + guide
repo อ้างอิง (อ่านอย่างเดียว): `/Users/agapae/agapae-work/AVEGEE` · **Mind ไม่ได้แก้ไฟล์ใน repo** — ทุก path ปลายทางเป็นไฟล์ที่ Codex สร้างใหม่ ห้ามทับของเดิม
guide (ผัง): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-10-23-avegee-m0-map-survey/zone1-layout-guide.png`

---

## 0. สรุป

**16 ชิ้น** = พื้น 4 ควอแดรนต์ + sprite 12 (แท่น 1, บ้าน 4, ต้นไม้ 4, โคม/คบ/หิน 3) · **9 run Codex** (ตารางข้อ 5)

| # | ชิ้น | ไฟล์ปลายทาง | ขนาด |
|---|---|---|---|
| Q1 | ควอแดรนต์ NW | `img/raw/map-zone2/q-nw.png` (ไม่ commit) | PNG 3:2 ≥1536×1024 |
| Q2 | ควอแดรนต์ NE | `img/raw/map-zone2/q-ne.png` | เหมือนกัน |
| Q3 | ควอแดรนต์ SW | `img/raw/map-zone2/q-sw.png` | เหมือนกัน |
| Q4 | ควอแดรนต์ SE | `img/raw/map-zone2/q-se.png` | เหมือนกัน |
| S1 | แท่นตัดสิน | `img/theme-v4/town-judgment-asia-v2.webp` | 1536×1024 RGBA |
| S2a–d | บ้าน 4 แบบ | `img/town-district/house-{front-one,right-one,left-two,right-two}-asia-v1.webp` | 1402×1122 / 1438×1094 / 1036×1518 / 1036×1518 RGBA |
| S3a | ต้นไม้หลัก | `img/theme-v4/town-tree-asia-v1.webp` | 1199×1312 RGBA |
| S3b | ต้นแดง (ใกล้ลาวา) | `img/theme-v4/town-tree-b-asia-v1.webp` | 1199×1312 RGBA |
| S3c | ต้นฝั่งเย็น (เทียบต้นหิมะ) | `img/theme-v4/town-tree-c-asia-v1.webp` | 1199×1312 RGBA |
| S3d | ต้น landmark | `img/theme-v4/town-landmark-asia-v1.webp` | 1024×1328 RGBA |
| S4a | โคม | `img/theme-v4/town-lamp-asia-v1.webp` | 512×1112 RGBA |
| S4b | คบ | `img/map-zone2/torch-pillar-v1.webp` | 240×419 RGBA |
| S4c | หิน | `img/map-zone2/prop-rock-v1.webp` | 1254×1254 RGBA |

ผลลัพธ์พื้นหลังต่อ/ตัด (Toby ทำสคริปต์): `img/map-zone2/v1/r{1-4}-c{1-5}.webp` + `zone2-terrain-v1-preview.webp` (4915×3277 / 1536×1024) — ไม่ใช่งานใบนี้

---

## 1. Step 0 — Asset inventory (SOP-10)

**เปิดดูจริงด้วย Read (เห็นภาพแล้ว)**

| ไฟล์ (ใต้ `/Users/agapae/agapae-work/AVEGEE/` ยกเว้นระบุ) | บทบาท | สิ่งที่ล็อก |
|---|---|---|
| `img/map-zone1/v5/zone1-terrain-v5-preview.webp` | **โครง** พื้นโซน 1 สะอาด | 1536×1024 (= 2.5 หน่วยโลก/px) |
| `…/Output/Toby/…/zone1-layout-guide.png` | ผัง: mask เดินได้ (เขียว) กรอบสถานี (เหลือง) จุดยืน (แดง) ประตู (ม่วง) ช่วงฝั่งปีศาจ (ขาว) | ใช้ตรวจ ห้ามแนบให้ตัววาด (มันจะวาดสีเขียว/กรอบ/ตัวอักษรตาม) |
| `img/theme-v4/map-asia.webp` | **ธีม** แผนที่เดิมโซน 2 | 1678×937 · พื้นหินเขียวเทา ลำธารลาวา ใบเมเปิลแดง สะพานไม้ราวแดง โคมหินส้ม กองกระดูก รั้วไม้ ทะเลเขียวน้ำเงินมีฟอง ซากงูทะเล+กะโหลกในน้ำ (ล่างขวา) |
| `img/theme-v4/README.md` | คำอธิบายชุด | asia = jade stone, curved tiled roofs, red lanterns, cool mountains |
| `img/Zone2.webp` | **ไม่ใช่แผนที่** — เป็นไอคอนเกาะลอย (ศาลาหลังคากระเบื้องเขียวหยก เสาแดง สะพานทอง ผลึกแดงบนน้ำแข็ง หม้อไฟ) | ใช้ดูพาเลตต์/วัสดุเท่านั้น |
| `img/map-v5/st-{sala,krata,tarang,ngiw}-asia.webp` | sprite สถานีโซน 2 ที่ใช้อยู่จริง | หลังคากระเบื้อง teal เข้ม · เสา/คานแดงแลคเกอร์ · ทองลายกนก · ฐานหินเทามีตะไคร่ · โคมแดง · สิงโตหินเฝ้า · ป้ายแดงลายทอง — **นี่คือภาษาวัสดุของโซน 2 ที่ sprite ใหม่ต้องเข้ากับมัน** |
| `img/theme-v4/town-judgment-th-v2.webp` | โครงแท่น | 1536×1024 · แท่นเต็มกว้าง ฐานชิดล่าง บันไดตรงกลาง ~39–61% กว้าง บัลลังก์ยอดแหลมบนสุดกลาง เสาคบทอง 2 ต้นหลังซ้าย/ขวา เปลวไฟวาดในภาพ |
| `img/town-district/house-{front-one,right-one,left-two,right-two}-v1.webp` | โครงบ้าน 4 แบบ | หน้าตรงชั้นเดียว / เฉียงขวาชั้นเดียว / สองชั้นเฉียง ×2 · ฐานล่างกึ่งกลางภาพ |
| `img/theme-v4/town-tree-th-v1.webp`, `town-tree-red-th-v1.webp`, `town-tree-snow-th-v1.webp`, `town-palm-th-v1.webp` | โครงต้นไม้ | พุ่มเต็มกว้าง โคนรากกึ่งกลางล่าง |
| `img/theme-v4/town-lamp-gold-th-v1.webp` | โครงโคม | เสาเรียวสูง เปลววาดในภาพ ที่ ≈ 27% จากยอด |
| `img/map-zone1/torch-pillar-v1.webp` | โครงคบ | 240×419 เปลวที่ ≈ 14% จากยอด |
| `img/map-zone1/prop-rock-v1.webp` | โครงหิน | กลุ่มหิน 3 ก้อน |

**ขนาดไฟล์:** ใช้ค่าวัดจริงจากรายงาน Toby (PIL) · session นี้ไม่มี shell วัดพิกเซล · พิกัดบนภาพที่ขึ้นต้น "≈" มาจากการดูภาพ (±10 px ใน preview) → Codex วัดซ้ำด้วย mask/ภาพทับก่อนวาด · พิกัดสถานี/ท่า/ประตู/ช่วงฝั่ง = จากโค้ด (Toby) หาร 2.5 แม่นยำ

**สิ่งที่ยังขาด (ไม่เดาแทน)**
1. ภาพ mask เดินได้แบบ schematic ไม่มีตัวอักษร → Codex ทำใน run Q1 (render จาก `src/town-layout.js` ตามที่ Toby ทำ guide)
2. ไม่มี sprite ต้นแบบแท่น/บ้าน/ต้นไม้โซน 2 → ใช้ของโซน 1 เป็นโครง + `st-*-asia` เป็นวัสดุ
3. ไม่ได้ตรวจ `theme-v4/st-{tea,lokan}-asia.webp` และสถานีอีก 5 ชิ้น (ไม่ได้อ้างในสเปก)
4. **ไม่ได้เปิดโน้ตวัฒนธรรมของ Reese ในรอบนี้** → ใช้กฎเข้มสุด: ไม่มีรูปเคารพ/สัญลักษณ์ศาสนาในทุกชิ้น (ข้อ 2.6) แล้วให้ chris-culture ตรวจ

---

## 2. Style direction (ใช้ร่วมทุกชิ้น)

### 2.1 ภาษาภาพ
- **พื้น:** ภาพวาด painterly รายละเอียดสูง มุมเฉียงจากบนแบบ RPG (3/4 elevated) กล้องเดียวกับโซน 1 เป๊ะ · เส้นขอบเข้มบาง 1–2 px ที่ขอบหน้าผา/บันได/ราว · เท็กซ์เจอร์หินวาดมือ · แสงหลักจากซ้ายบนอุ่นๆ · **ห้ามเงาทอดยาวจาก prop** (เกมคำนวณเงาเอง `town-shade.js`) มีได้แค่ AO นุ่มใต้หน้าผา/ราว
- **sprite:** วาดแบบ painted game asset เส้นขอบเข้ม 1–2 px, shading นุ่มมี dither เบา, ไฮไลต์ทองคม — ระดับเดียวกับ `st-*-asia.webp` และ sprite โซน 1 (ไม่ใช่ vector แบน ไม่ใช่ photoreal ไม่ใช่ 3D render)
- โซน 2 ต้อง "อ่านออกว่าไม่ใช่โซน 1 ที่แค่เปลี่ยนสี": ต้องมีอย่างน้อย 3 ใน 4 อย่างนี้ในทุกควอแดรนต์ — หินเทาเขียวหยก/ทรงเสาหินปูน (karst), เมเปิลแดงเข้ม, ไอหมอกเย็น, น้ำเขียวน้ำเงินมีฟองขาว

### 2.2 พาเลตต์ (หน้าจอ = hex)
| บทบาท | สี | ใช้กับ |
|---|---|---|
| พื้นเดินได้ (dominant ในพื้นที่เดิน) | `#9AA79F` หลัก · seam `#6F7C76` · ไฮไลต์ `#B7C3BC` | แผ่นหินปูเรียบ คอนทราสต์ต่ำ |
| หินผา/หน้าผา | `#4B5A57` เงา · `#7C8C86` กลาง · ตะไคร่ `#5E7A4A` | หน้าผา เสาหิน |
| แลคเกอร์แดง (accent) | `#B3201E` · เข้ม `#7A1414` | เสา คาน ราว ป้าย โคม |
| ทอง (accent) | `#D9A93B` · ไฮไลต์ `#F2D27A` · เงา `#8A6420` | ลายกนก หัวเสา ขอบ |
| หลังคากระเบื้อง | `#1F5B5E` · ไฮไลต์ `#2E7F7C` | บ้าน แท่น |
| ลาวา (แสงเรืองเดียวของพื้น) | แกน `#FFC03A` · กลาง `#FF7A12` · ขอบ `#C93A0A` · เปลือกดำ `#3A2A24` | ลำธารลาวา ตะวันตก |
| น้ำ/แม่น้ำ | ลึก `#0F3D4D` · กลาง `#1B6F80` · ฟอง `#DDF3F2` | แม่น้ำ ลำธาร |
| เมเปิลแดง | `#C4202B` · `#E5502A` · เงา `#7A1220` (ต้องหม่นกว่าลาวา) | ใบไม้ |
| ไผ่/สน | `#4E9A5B` · `#8BC06A` · เงา `#2C5E3A` | พุ่มเขียว |
| แปะก๊วยทองซีด | `#E9C65A` · `#F6E08C` | ต้น landmark / ทะเลหมอกเหนือ |
| หมอก/ฟ้า | หมอก `#D8E4E6` @40% · ฟ้ายามเช้าเย็น `#8FA8B8` → เรื่อชมพูจาง `#E7B7A8` | ขอบบนภาพ |

**หมายเหตุสีเชิงวัฒนธรรม:** แดง+ทอง = มงคล ใช้ได้เต็มที่ · ห้ามใช้ขาวล้วน+ดำล้วนเป็นธง/ผ้าแถบ (โทนไว้ทุกข์) — ขาวใช้ได้เฉพาะฟองน้ำ/หมอก · ห้ามเปลวไฟ/แสงเรืองสีฟ้า-ม่วงในโซน 2 (สงวนให้โซน 3–4)

**กฎอ่านไฟของเกม (สำคัญ):** `town-lighting.js` ตีความพิกเซลส้ม-แดงสว่างเป็นไฟตอนกลางคืน → ในพื้น **ลาวา/เปลวเท่านั้นที่ได้สว่างจัดสีส้ม-เหลือง** (ราว V≥85% S≥80% ช่วง hue 10–45°) · ใบเมเปิล/โคมแดง/ทองต้องหม่นกว่า · ห้ามวาดแสงเรืองส้มบนพื้นเดิน

**Print-contrast sanity (งานหน้าจอ):** พื้นเดินได้ต้องสว่างกว่าหน้าผาข้างเคียงอย่างน้อย ~15% ความสว่าง หรือมีเส้นขอบหน้าผาชัด · ตัวละครเกมเข้ม/แดงต้องอ่านออกบน `#9AA79F` (ผ่าน)

### 2.3 แผนที่ 4 ภูมิภาคโซน 1 → โซน 2 (Mind ยืนยันตามข้อ 4.1 ของ Toby + เหตุผล)
| โซน 1 (ตำแหน่งใน preview) | โซน 2 | เหตุผลจากแผนที่เดิม |
|---|---|---|
| **ตะวันตก** ลาวา+ภูเขาไฟ (x 0–500) | **ลำธารลาวา** ไหลลงแม่น้ำที่ตำแหน่งเดิม ธารลาวา 3 สาย/น้ำตกลาวา 3 จุด · ยอดภูเขาไฟ → ยอดเสาหินปูนเทาเขียวมีรอยลาวาเป็นต้นธาร · สะพานข้ามลาวา 2 แห่ง = สะพานไม้ราวแดง | map-asia มีลำธารลาวา+สะพานไม้ราวแดง+หินแตกเทา-เขียว+เมเปิลแดง ตรงกับที่คุณเป้สั่ง |
| **ตะวันออกเฉียงเหนือ** น้ำแข็ง (x 1000–1536,y 0–680) | **ลำธารน้ำใสเขียวหยก+น้ำตกฟองขาว ท่ามกลางเสาหินเทาเขียว+ไอหมอกเย็น+กอไผ่ · ไม่มีหิมะ ไม่มีน้ำแข็ง** | map-asia ไม่มีน้ำแข็ง; น้ำแข็ง/หิมะเป็นของโซน 3 |
| **เหนือ** สวรรค์ทะเลหมอก+ต้นทอง (x 850–1100,y 0–300) | **ทะเลหมอกบนเนินหิน+แปะก๊วยทองซีด** สะพานโค้งหิน → สะพานโค้งพระจันทร์หินราวแดง (ตำแหน่งเดิม) | หมอกเย็นเป็นอัตลักษณ์โซน 2 (README) |
| **ตะวันออกเฉียงใต้** ป่า (x 950–1536,y 450–680) | **ป่าไผ่+สนเขียวหยก+เมเปิลแดงแซม** | map-asia มีกอไผ่/ต้นกก |
| **ฝั่งใต้** พื้นแดงน้ำตาล+หินดำ | พื้นหินแตกเทาหยกต่ำคอนทราสต์+กลุ่มเมเปิลแดง+เสาหินเทาเขียว+กระดูกกระจายบนไหล่หน้าผา | map-asia ฝั่งใต้/ซ้าย |
| แม่น้ำม่วง (y ≈690–790) | **แม่น้ำเขียวน้ำเงินเข้มฟองคลื่นขาว** · จุดลาวาลงน้ำ (x 340–470) มีแสงส้มสะท้อนผิวน้ำ · ซากงูทะเล+กะโหลกจมครึ่งในแม่น้ำฝั่งขวา (x 1200–1380) | map-asia ล่างขวา |
| พื้นเดินได้ ทรายน้ำตาล | **หินปูเทาหยกอ่อน `#9AA79F`** | map-asia พื้นเขียวเทา · ทำให้ sprite แดง-ทองเด่น |
| ท้องฟ้าขอบบน (ส้มชมพู) | ยามเช้าหมอกเย็น ภูเขาไกลหมอกฟ้าเทา เรื่อชมพูจาง | README |

**ไม่ย้ายจาก map-asia:** รูปสลักนั่งในซุ้มหินฝั่งซ้าย (เป็นรูปเคารพ) — ห้ามวาดรูปเคารพ/รูปปั้นเทพใดในโซน 2 ทั้งพื้นและ sprite (ถ้าคุณเป้ต้องการ ต้องผ่าน Reese/chris-culture ก่อน)

### 2.4 พืชพรรณในพื้น (ตีความใบงาน)
ใบงานห้าม "ต้นไม้ในพื้น" แต่ภาพโซน 1 มีมวลพืชพรรณเป็นฉากหลังบนหน้าผา/ป่า/ฝั่งใต้ (ไม่ใช่ prop วางได้) → **ตีความ: อนุญาตมวลพืชพรรณเป็นฉากหลังนอกพื้นที่เดินได้เหมือนโซน 1** · ห้ามต้นไม้เดี่ยวโดดๆ บนลาน/ทาง · ห้ามเรือนยอดคร่อมทางเดิน · ถ้าคุณเป้ตีความเข้มกว่านี้ให้ตัดข้อนี้ (ข้อตัดสิน D2)

### 2.5 ข้อกำหนดร่วมของพื้น
- ห้ามมี: อาคาร กระท่อม ศาลา เต็นท์ แท่น บ้าน เรือ คบ โคมตั้งพื้น รูปปั้น คน สัตว์ ตัวอักษร ป้าย ลายน้ำ กรอบ vignette
- **ต้องมี (เป็นพื้น ไม่ใช่ sprite):** ถนน ลาน บันได สะพาน ท่าเรือ แม่น้ำ น้ำตก ตามผัง
- ท่าเรือ (pier) **สมมาตรรอบแกนเดียว ราวตั้งฉากขนาน เสามุมสองต้นสูงเท่ากัน** — โซน 1 เคยเบี้ยวต้องซ่อม (22 ต.ค.) ห้ามเกิดซ้ำ
- วาดจนสุดขอบทั้ง 4 ด้าน ไม่มี vignette/ไล่ดำ (ภาพจะถูกตัดและ blend)

### 2.6 ความปลอดภัยเชิงวัฒนธรรม (ทุกชิ้น)
ห้าม: พระพุทธรูป/รูปเคารพ/รูปสลักเทพ, ฮาโล, กางเขน, **ลายตาข่ายสวัสดิกะ/ม่านจื่อ (卍) ที่พบบ่อยในลายหน้าต่างจีน**, ตัวอักษรจีน/คันจิ, สถูป/เจดีย์วัด (หลังคากระเบื้องแบบศาลา/ประตูได้) · ลวดลายใช้ลายเมฆ (xiangyun) ลายกนกเรขาคณิต ลายตาข่ายสี่เหลี่ยมโปร่งธรรมดา

### 2.7 Typography
ไม่มีตัวอักษรในชิ้นงานใดเลย (พื้น+sprite) — ไม่มีความเสี่ยง Thai-rendering · ถ้าตัววาดสร้างตัวอักษร/สัญลักษณ์ที่อ่านเป็นข้อความ = ตก

---

## 3. พื้น 4 ควอแดรนต์

### 3.1 เรขาคณิต (ล็อก)
preview 1536×1024 · กรอบ 864×576 (3:2) · แปลงพิกัด preview เป็นพิกัดควอแดรนต์: **`canvas = (preview − origin) × 1.7778`** (864 px → 1536 px) · หน่วยโลก ×0.4 = preview

| ควอแดรนต์ | กรอบ preview | origin | ทับกับ |
|---|---|---|---|
| NW | (0,0)–(864,576) | (0,0) | NE แนวตั้ง x 672–864 · SW แนวนอน y 448–576 |
| NE | (672,0)–(1536,576) | (672,0) | NW · SE y 448–576 |
| SW | (0,448)–(864,1024) | (0,448) | NW · SE x 672–864 |
| SE | (672,448)–(1536,1024) | (672,448) | NE · SW |

**แก้ตัวเลขของ Toby:** ใบงานเขียนซ้อน 192 px ทุกขอบ แต่จากกรอบจริง **ซ้อนซ้าย-ขวา (NW↔NE, SW↔SE) = 192 px = 341 px ใน canvas ควอแดรนต์ · ซ้อนบน-ล่าง (NW↔SW, NE↔SE) = แค่ 128 px = 228 px ใน canvas** (576−448) · มุมกลาง 192×128 ถูกคลุมครบ 4 ควอแดรนต์ · ต้องแจ้ง Toby ให้สคริปต์ต่อใช้ค่าจริง

**ของที่คร่อมรอยต่อ (เสี่ยงสุด ต้องตรวจ):** แกนถนน/สะพานกลาง x 742–798 (อยู่ในแถบทับซ้าย-ขวาตลอดความสูง) · ลานกลาง วงรี (768,395) · ลานวงกลมใต้ (768,852) รัศมี ≈155×85 คร่อม x 672–864 · สถานี krajok คร่อม y 576

### 3.2 หมุดพิกัดที่ต้องตรง (preview px)
| จุด | พิกัด | ที่มา |
|---|---|---|
| สถานี (จุดยืน) | krata (188,226) · dab (186,415) · ngiw (220,598) · tarang (660,180) · sawan (1014,165) · lokan (1414,203) · lan (1293,365) · krajok (1393,600) · tea (611,559) · sala (901,553) · ประตู gate (767,1004) | โค้ด ÷2.5 |
| ท่าเรือ | แกน x=896 · ดาดฟ้าเดินได้ x 875–917 · ปลาย y ≈718 | โค้ด (`townFloorAt`) |
| ช่วงฝั่งที่ปีศาจขึ้น (y≈676) | x 208–288 · 648–728 · 824–900 — ขอบฝั่งตรงนี้ต้องเป็นขอบต่ำเรียบ ไม่ใช่หน้าผาสูง | โค้ด |
| สะพานกลาง | ดาดฟ้า x ≈742–798, y ≈592–790 · ข้ามแม่น้ำ y ≈690–790 | ≈ ดูจาก guide |
| ลานกลาง | วงรี (768,395) rx≈140 ry≈60 | ≈ |
| ลานวงกลมใต้ | (768,852) rx≈155 ry≈85 · ถนนต่อลงประตู x 745–795 | ≈ |
| จุดลาวาลงแม่น้ำ | x ≈340–470 | ≈ |
| สะพานข้ามลาวา | (360,262) และ (360,388) | ≈ |
| สะพานโค้งเหนือ | x ≈1130–1235, y ≈185 | ≈ |
| ลานเดินได้ทั้งหมด | ตาม mask `src/town-owner-walkmask.js` — ภาพใหม่ต้องให้ขอบที่มองเห็นอยู่ใน ±16 px (preview) จาก mask | Toby ข้อ 4 |

### 3.3 วิธีควบคุมรอยต่อ (outpaint จาก seed)
- แต่ละควอแดรนต์ที่ต้องต่อกับของที่เสร็จแล้ว ต้องแนบ **seed canvas** = ผืน 1536×1024 ที่แถบทับด้านที่ต่อกัน **ใส่ภาพที่วาดเสร็จแล้วไว้** ส่วนที่เหลือ = เทากลาง `#808080` → ให้ตัววาด "วาดต่อบริเวณเทา ห้ามแก้แถบที่วาดแล้ว"
- seed ของ NE = แถบขวาของ NW (x 672–864 → canvas x 0–341, สูงเต็ม)
- seed ของ SW = แถบล่างของ NW (y 448–576 → canvas y 0–228, กว้างเต็ม)
- seed ของ SE = ตัด SE frame จาก **composite ชั่วคราวของ NW+NE+SW** (feather แถบทับ) → ได้รูปตัว L (บน+ซ้าย) · ส่วนที่เหลือเทา
- ถ้าเครื่องมือรับแนบ ≤ 2 ภาพ: รวม [1]+[2] เป็นภาพเดียวเรียงซ้าย-ขวา แล้ว [3] อีกภาพ (บันทึกวิธีใน README ของ run)
- ตรวจรอยต่อ: ทับ seed บนผลลัพธ์ 50% — เส้นถนน ขอบลาวา ขอบแม่น้ำ ขอบหน้าผาต้องเหลื่อม **≤12 px ใน canvas** (≈7 px preview)

### 3.4 ไฟล์อ้างอิงที่ Codex ต้องเตรียม (ใน run Q1 ครั้งเดียว) → `output/m1-zone2/refs/`
| ไฟล์ | ที่มา | ให้ตัววาด? |
|---|---|---|
| `ref-q-{nw,ne,sw,se}-layout.png` 1536×1024 | ครอป `img/map-zone1/v5/zone1-terrain-v5-preview.webp` ตามกรอบ 3.1 แล้ว Lanczos ×1.7778 · **สะอาด ไม่มี overlay** | **แนบ [1]** |
| `ref-q-{…}-walk.png` 1536×1024 | render mask เดินได้ (โหลด `src/town-layout.js` ใช้ `townContains`) ช่อง 8 หน่วย → ครอปกรอบเดียวกัน · เดินได้ = `#C8C8C8` ที่เหลือ `#202020` · ไม่มีตัวอักษร | **แนบ [2]** |
| `ref-q-{…}-guide.png` | ครอป `zone1-layout-guide.png` ตามกรอบเดียวกัน | **ใช้ตรวจทีหลังเท่านั้น ห้ามแนบ** |
| `ref-theme-asia.png` | `img/theme-v4/map-asia.webp` ตามเดิม 1678×937 | **แนบ [3]** |
| `refs-manifest.json` | ขนาด + sha256 ของทุกไฟล์ข้างบน | — |

### 3.5 Prompt Q1 — NW (รัน 1 · ไม่ต้องมี seed)

ไฟล์แนบ: [1] `ref-q-nw-layout.png` · [2] `ref-q-nw-walk.png` · [3] `ref-theme-asia.png`
ปลายทาง: `img/raw/map-zone2/q-nw.png` · ขั้นหลังวาดดูข้อ 3.9 + เช็กลิสต์ข้อ 3.10

```
You are re-theming a game ground map. Attached images, in order:
[1] LAYOUT: a crop of the finished Zone 1 map, painted, 3/4 elevated RPG view.
[2] WALK: a schematic of the same crop. Light grey = flat walkable stone ground, dark = not walkable.
[3] THEME: the old Zone 2 "East Asia" map. Use it ONLY for palette, materials and mood, never for layout.

Paint ONE new 3:2 landscape image, 1536x1024, that keeps the EXACT geometry of [1]: every road,
staircase, bridge, plaza ellipse, oval pad, cliff edge, river bank and lava channel stays in the same
place, same size, same camera angle, same perspective. Only the world's look changes, into the
Zone 2 East-Asian world. This crop is the NORTH-WEST quarter of the map: a big lava mountain on the
far left, three lava streams with lava falls, two small plank bridges over lava, four flat oval
plateaus on the left, stone stairs between terraces, a diagonal staircase climbing to a plateau at
upper centre, and the top part of a large round stone plaza at the lower right.

Re-theme as follows:
- All walkable ground (light grey in [2]) becomes pale jade-grey flagstone (#9AA79F), large irregular
  slabs with thin dark seams, matte, LOW contrast, with a slightly darker worn patch in the middle of
  each oval plateau. The plateaus stay completely empty and flat.
- Cliff faces: dark slate-green stone with vertical striations and moss, crisp dark outline.
- Lava (same channels as [1]): bright molten yellow-orange with a dark cracked crust on the banks.
  The lava is the ONLY strongly glowing orange in the picture. The lava mountain peak becomes a jagged
  jade-grey limestone pillar mountain with a molten lava seam near its crown as the source.
- The two small bridges over lava become wooden plank bridges with red lacquer railings and small
  gold-capped end posts, as in [3].
- Stairs: grey-jade stone, same count and direction as [1], thin gold-capped newel posts only where
  [1] already has posts.
- Background decoration only on non-walkable ground: grey-green limestone pillar rocks, clumps of
  crimson maple trees (darker and duller than the lava), cool drifting mist at the top edge, a few
  bleached bones on cliff shoulders (never on walking routes). Distant misty mountains in cool
  blue-grey with a faint blush-pink dawn sky at the very top.
Lighting: warm soft key light from the upper left, same as [1]. No long cast shadows from objects,
only soft occlusion under cliffs.
Paint all the way to all four edges; no vignette, no frame, no fade, no border.
```

**Negative:** `buildings, houses, huts, pavilion, temple, pagoda, tents, statues, Buddha, deity figure, halo, swastika, manji lattice, people, animals, boats, torches, standing lamps, signposts, text, letters, Chinese characters, labels, watermark, logo, colored guide overlay, green fill, yellow rectangles, red circles, magenta ring, white bars, UI, frame, border, vignette, changed road layout, extra bridges, missing bridges, different camera angle, flat top-down map, rotated isometric view, saturated orange on non-lava, glowing floor, fog covering the paths, snow, ice, blue or purple glow, low resolution, blur, smooth airbrush`

### 3.6 Prompt Q2 — NE (รอ Q1 · seed = แถบขวาของ NW)

ไฟล์แนบ: [1] `ref-q-ne-layout.png` · [2] `ref-q-ne-walk.png` · [3] `ref-theme-asia.png` · [4] `seed-q-ne.png`
ปลายทาง: `img/raw/map-zone2/q-ne.png`

```
You are re-theming a game ground map and continuing a painting. Attached images, in order:
[1] LAYOUT: a crop of the finished Zone 1 map, painted, 3/4 elevated RPG view.
[2] WALK: a schematic of the same crop. Light grey = flat walkable stone ground, dark = not walkable.
[3] THEME: the old Zone 2 "East Asia" map. Use it ONLY for palette, materials and mood, never for layout.
[4] SEED: a 1536x1024 canvas. The LEFT 341 pixels are ALREADY PAINTED in the final Zone 2 style (they
    are the right edge of the neighbouring north-west quarter). The rest is flat grey #808080.

Paint the complete 1536x1024 image. Keep the painted left strip of [4] unchanged, same colours and
same content, and continue it seamlessly into the grey area: roads, cliff edges, water edges and
mist must run on across the join with no visible seam, step or colour shift.
Keep the EXACT geometry of [1] for everything else: every road, staircase, bridge, plaza, oval pad,
cliff edge, stream and river bank stays in the same place, same size, same camera and perspective.
This crop is the NORTH-EAST quarter: at upper left a high plateau above a sea of mist with a stone
stairway up to an oval pad; a stone arch bridge at the top centre; at upper right a big oval pad
with stairs; a mountain stream with waterfalls running from the top right down to the river; a
round plaza edge at the lower left; a small bridge over the stream; the start of a forest belt at the
bottom right.

Re-theme as follows:
- All walkable ground (light grey in [2]) becomes pale jade-grey flagstone (#9AA79F), large irregular
  slabs with thin dark seams, matte, LOW contrast, slightly darker worn patch in the middle of each
  oval pad. Pads stay completely empty and flat.
- Where [1] has an ICE stream and ice waterfalls, paint a clear jade-teal mountain stream with white
  foam and white waterfalls, same channel and falls positions. NO snow and NO ice anywhere.
- Around it: grey-green limestone pillar rocks with moss, cool drifting mist, clumps of bamboo and
  jade-green pines, a few crimson maple trees. The sea of mist at the top centre is pale cool white
  with a few pale-gold ginkgo trees on the cliff tops, only on non-walkable ground.
- The stone arch bridge keeps its place and arch, with red lacquer railings and gold-capped posts.
  The small stream bridge becomes a wooden plank bridge with red railings.
- Stairs and cliff faces: grey-jade stone, dark slate-green cliffs with moss, crisp dark outlines.
- Distant misty mountains and a cool blush-pink dawn sky at the top edge.
Lighting: warm soft key light from the upper left. No long cast shadows from objects.
Paint to all four edges; no vignette, no frame, no border. There is no lava and no glowing orange
anywhere in this quarter.
```

**Negative:** เหมือน Q1 + `snow, ice, glacier, frost, blue glow, changed seed strip, visible seam, different colour in the left strip, repeated copy of the left strip`

### 3.7 Prompt Q3 — SW (รอ Q1 · ขนานกับ Q2 ได้ · seed = แถบล่างของ NW)

ไฟล์แนบ: [1] `ref-q-sw-layout.png` · [2] `ref-q-sw-walk.png` · [3] `ref-theme-asia.png` · [4] `seed-q-sw.png` (บน 228 px ลงสีแล้ว)
ปลายทาง: `img/raw/map-zone2/q-sw.png`

```
You are re-theming a game ground map and continuing a painting. Attached images, in order:
[1] LAYOUT: a crop of the finished Zone 1 map, painted, 3/4 elevated RPG view.
[2] WALK: a schematic of the same crop. Light grey = flat walkable stone ground, dark = not walkable.
[3] THEME: the old Zone 2 "East Asia" map. Use it ONLY for palette, materials and mood, never for layout.
[4] SEED: a 1536x1024 canvas. The TOP 228 pixels are ALREADY PAINTED in the final Zone 2 style (they
    are the bottom edge of the neighbouring north-west quarter). The rest is flat grey #808080.

Paint the complete 1536x1024 image. Keep the painted top strip of [4] unchanged and continue it
seamlessly downward: roads, cliff edges, lava channels and mist must run on across the join with no
visible seam, step or colour shift.
Keep the EXACT geometry of [1] for everything else: every road, staircase, bridge, plaza, pad,
cliff edge, river bank and lava channel stays in the same place, same size, camera and perspective.
This crop is the SOUTH-WEST quarter: on the left two oval plateaus and lava falling over a cliff
into a wide river; two more oval plateaus in the middle; a long straight stone staircase and
a straight stone bridge with balustrades running down the centre and crossing the wide river; a
small stone pier on the north bank to the right of the bridge; the south river bank with a large
round stone plaza at the bottom centre, the road continuing down to the bottom edge, and open
ground with rock spires and trees to the left of the plaza.

Re-theme as follows:
- All walkable ground (light grey in [2]) becomes pale jade-grey flagstone (#9AA79F), large irregular
  slabs with thin dark seams, matte, LOW contrast. The big round plaza gets a thin gold-line ring
  and a faint carved cloud-scroll pattern, still low contrast. Pads stay completely empty.
- Lava (same channels and falls as [1]): bright molten yellow-orange with a dark cracked crust. Where
  the lava falls into the river, the water shows a warm orange reflection streak. This is the ONLY
  strongly glowing orange in the image.
- The river becomes deep green-blue water (#0F3D4D to #1B6F80) with white foam waves along the
  rocks and banks, like the sea in [3]. The stone bridge in the centre keeps its width, stairs and
  balustrades, with dark grey stone posts, thin gold bands and gold-capped ends.
- The small pier is perfectly SYMMETRIC around one vertical axis: five stone steps down to a
  rectangular deck of the same width, two parallel vertical balustrades that are mirror images,
  two corner posts of equal height with gold caps. Its position and size match [1].
- The three flat shore spans on the north bank (see [2]) stay low flat shore, not tall cliffs.
- South bank: cracked grey-jade ground, low contrast; crimson maple groves and grey-green limestone
  rock spires in the background and on the edges, a few bleached bones; all outside walkable ground.
Lighting: warm soft key light from the upper left. No long cast shadows from objects.
Paint to all four edges; no vignette, no frame, no border.
```

**Negative:** เหมือน Q1 + `leaning rails, diagonal railings, asymmetric pier, boat, ship, ferry, a figure on the bridge, purple water, changed seed strip, visible seam`

### 3.8 Prompt Q4 — SE (รอ Q2 และ Q3 · seed = ตัด SE จาก composite NW+NE+SW)

ไฟล์แนบ: [1] `ref-q-se-layout.png` · [2] `ref-q-se-walk.png` · [3] `ref-theme-asia.png` · [4] `seed-q-se.png` (แถบบน 228 px และแถบซ้าย 341 px ลงสีแล้ว)
ปลายทาง: `img/raw/map-zone2/q-se.png`

```
You are re-theming a game ground map and continuing a painting. Attached images, in order:
[1] LAYOUT: a crop of the finished Zone 1 map, painted, 3/4 elevated RPG view.
[2] WALK: a schematic of the same crop. Light grey = flat walkable stone ground, dark = not walkable.
[3] THEME: the old Zone 2 "East Asia" map. Use it ONLY for palette, materials and mood, never for layout.
[4] SEED: a 1536x1024 canvas. The TOP 228 pixels and the LEFT 341 pixels (an L shape) are ALREADY
    PAINTED in the final Zone 2 style, taken from the neighbouring quarters. The rest is flat grey #808080.

Paint the complete 1536x1024 image. Keep the painted L-shaped area of [4] unchanged and continue it
seamlessly right and down: stairs, bridge, plaza ring, road, cliff edges, stream and river edges
must run on across both joins with no visible seam, step, misalignment or colour shift. The big round
plaza and the straight bridge are cut by the join on the left, so continue their curves and
straight edges exactly.
Keep the EXACT geometry of [1] for everything else: every road, staircase, bridge, plaza, pad, cliff
edge, stream and river bank stays in the same place, same size, camera and perspective.
This crop is the SOUTH-EAST quarter: at upper left a plateau and the right side of a long staircase
and bridge; a small symmetric stone pier on the north bank near the left; at upper right a big
oval plateau; a mountain stream with a waterfall and a small wooden bridge entering the wide river
on the right; a belt of forest on the right; the wide river; the south bank with the right half of
a large round stone plaza and open ground with rock spires and trees to its right.

Re-theme as follows:
- All walkable ground (light grey in [2]) becomes pale jade-grey flagstone (#9AA79F), large irregular
  slabs with thin dark seams, matte, LOW contrast; plateaus stay empty and flat.
- Stream and waterfall: clear jade-teal water with white foam, NO ice, NO snow. The small bridge over
  it is a wooden plank bridge with red lacquer railings.
- Forest belt on the right: dense bamboo, jade-green pines and a few crimson maples, only on
  non-walkable ground, no single trees on plazas or paths.
- River: deep green-blue water with white foam waves along rocks and banks. In the river on the right
  float the half-submerged bleached skeleton of a giant sea serpent (ribs and spine) and one skull,
  as in the lower right of [3], never touching the banks or any walkable ground.
- The pier is perfectly SYMMETRIC around one vertical axis, same width as its stairs, two parallel
  vertical balustrades, two equal corner posts with gold caps; position and size match [1].
- Straight bridge in the centre: dark grey stone posts with thin gold bands and gold-capped ends.
- South bank: cracked grey-jade ground, low contrast, crimson maple groves and grey-green limestone
  rock spires on the edges, a few bleached bones, all outside walkable ground.
Lighting: warm soft key light from the upper left. No long cast shadows from objects.
Paint to all four edges; no vignette, no frame, no border.
```

**Negative:** เหมือน Q3 + `ice stream, snow, glowing blue water, ship, boat, living sea serpent, monster, fish`

### 3.9 ขั้นหลังวาด (ทุกควอแดรนต์)
1. เซฟ PNG sRGB ≥1536×1024 (ถ้าได้ขนาดอื่น 3:2 ให้คงต้นฉบับ + บันทึกขนาดใน README; ห้ามครอปเกิน 2% ด้านเดียว)
2. ทำภาพทับ QA `output/m1-zone2/qa/q-<id>-overlay.png` = ผลลัพธ์ + `ref-q-<id>-guide.png` ที่ 50% และ `q-<id>-seam.png` = seed ทับผลลัพธ์ 50%
3. Q1: `refs-manifest.json` ครบ · Q2–Q4: บันทึกว่า seed ใช้อะไร
4. ถ้าไม่ผ่านเช็กลิสต์ ให้วาดใหม่ได้สูงสุด 2 ครั้งต่อ run (ในเวลา ≤30 นาที) แล้วรายงานตามจริง — ไม่ตกแต่งภาพแก้เพื่อให้ผ่าน

### 3.10 เช็กลิสต์ตรวจรับควอแดรนต์ (Toby/Chris)
1. ไฟล์ PNG 3:2 ≥1536×1024 · ไม่มีตัวอักษร/ลายน้ำ/กรอบ/vignette/สีจาก overlay (เขียว เหลือง แดง ม่วง ขาว)
2. ทางเดินทุกเส้น บันได สะพาน ท่าเรือ ลาน (ตาม 3.2) ตรง guide ใน ±16 px preview (≈ ±28 px canvas) — ตรวจด้วยภาพทับ
3. **ไม่มี** อาคาร ต้นไม้เดี่ยวบนลาน แท่น บ้าน เรือ คบ โคมตั้งพื้น รูปปั้น คน สัตว์
4. ลาน/ทางเดินได้เป็นหินปูเทาหยกคอนทราสต์ต่ำ ไม่มีสีส้มสว่าง · **ส้มสว่างมีเฉพาะลาวา**
5. ท่าเรือสมมาตร ราวตั้งฉาก (≤2°) เสามุมสูงเท่ากัน (Q3, Q4)
6. ฝั่งปีศาจขึ้น 3 ช่วง (x 208–288 · 648–728 · 824–900 ที่ y≈676) เป็นขอบฝั่งต่ำเรียบ (Q3)
7. รอยต่อ (Q2–Q4): ทับ seed แล้วเหลื่อม ≤12 px canvas · ของที่คร่อม (ถนนกลาง สะพาน ลานกลาง/ใต้ ท่าเรือ krajok) ต่อกันเป็นเส้น/วงรีเดียว ไม่เป็นสองเส้น
8. มีอัตลักษณ์โซน 2 ≥3 จาก 4 (หินหยกเทาเขียว เมเปิลแดง หมอกเย็น น้ำเขียวน้ำเงินมีฟอง) · ไม่มีน้ำแข็ง/หิมะ/แสงฟ้า-ม่วง
9. ไม่มีรูปเคารพ/ลายม่านจื่อ/ตัวอักษรจีนในลายพื้น/ผ้า (chris-culture)
10. ภาพขยายที่ 1.8× (โดย Toby) ยังไม่เบลอเห็นชัดที่ซูม 100% — ถ้าเบลอ ให้ Toby แจ้ง Claudy (ข้อตัดสิน D4)

### 3.11 Run Q5 (สำรอง) — ซ่อมรอยต่อ/จุดไม่ตรง mask
เมื่อ Q4 เสร็จและ Toby มีสคริปต์ต่อแล้ว: ต่อผืน → ทับ mask → ไล่ซ่อมสูงสุด 3 จุด (แบบ "วาดทับเฉพาะส่วน" N1b: ครอปกล่องรอบจุด → edit → composite กลับด้วยมาสก์นุ่ม ส่งหลักฐาน before/after/diff/verification.json) · ค่าเริ่มต้นที่ควรเปิดดูก่อน: รอยต่อแกนถนนกลาง (x 742–798) · ลานวงกลมใต้ · ท่าเรือ · ขอบ krajok (y 576) · สะพานข้ามลาวา 2 แห่ง

---

## 4. Sprite 12 ชิ้น

### 4.1 กติการวม
- วาดบนพื้นเรียบสี key แล้วตัดเป็นโปร่งใส · **key = `#FF00FF` (magenta) ยกเว้นชิ้นที่ระบุ `#00FFFF` (cyan: ต้นแดง คบ โคม ซึ่งมีแดง/ชมพู)** · เสร็จแล้ว despill + ขยับขอบ alpha เข้า 1 px · **ห้ามมีขอบสีเมเจนต้า/แดง/ขาว** (sprite โซน 1 บางชิ้นมีขอบสีแดงรอบพุ่มไม้ที่เห็นในภาพ — ชุดใหม่ห้ามเป็นแบบนั้น) · ตรวจโดยวางบน `#202020` และ `#E0E0E0` ซูม 400%
- **ก่อนวาดทุกชิ้น Codex วัด alpha bbox ของไฟล์โครง (โซน 1) แล้วทำ bbox ของชิ้นใหม่ให้ใกล้เคียง (ขอบซ้าย/ขวา/บน/ล่างอยู่ใน ±2% ของขนาดภาพ)** — เพื่อให้ตำแหน่งวาง/ชน/สเกลในเกมไม่ต้องแก้โค้ด · ฐานล่างกึ่งกลาง = จุดวาง
- ส่งออก WebP lossless RGBA ขนาดตามตาราง · เก็บ PNG ดิบที่ `output/m1-zone2/raw/` · บันทึก `bbox` ก่อน/หลังใน `output/m1-zone2/sprite-bbox.json`
- ไม่มีเงาตกพื้น ไม่มีพื้น ไม่มีคน/สัตว์ ไม่มีตัวอักษร
- **Negative พื้นฐานทุก sprite** (เติมต่อท้ายเฉพาะชิ้น): `text, letters, Chinese characters, kanji, watermark, logo, Buddha, deity statue, halo, cross, swastika, manji fret lattice, pagoda tower, stupa, ground shadow, floor, background scenery, magenta fringe, cyan fringe, red fringe, white halo, cropped edges, people, animals, flat vector, 3D render, photorealistic, low-poly, blur, smooth airbrush`

### 4.2 S1 — แท่นตัดสิน (รัน S1)
ปลายทาง `img/theme-v4/town-judgment-asia-v2.webp` · 1536×1024 RGBA · key `#FF00FF`
แนบ: [1] `img/theme-v4/town-judgment-th-v2.webp` (โครง) · [2] `img/map-v5/st-sala-asia.webp` (วัสดุ) · [3] `img/theme-v4/map-asia.webp` (ดูบัลลังก์แดงทอง+โคม ที่กลางภาพ)
ล็อกจาก [1]: เต็มกว้าง ฐานชิดล่าง **บันไดอยู่ x ≈39–61% ของความกว้าง** (ขั้นจริง; เสาข้างบันไดรวม ≈33–67%) · ลานยืนกลาง · บัลลังก์กึ่งกลางบนสุด · คบ 2 ต้นมุมหลัง · กล้อง/มุมเดียวกันเป๊ะ

```
Attached: [1] STRUCTURE: the finished Zone 1 judgment dais sprite, a wide stone platform seen from a
3/4 elevated front view, with a front staircase in the centre, a throne on a small raised step at the
back centre and two flaming torch pillars at the back corners. [2] MATERIAL: the Zone 2 "Sala"
building sprite (dark jade-teal glazed tile roofs, red lacquer columns, gold ornament, grey mossy
stone base, red lanterns, stone guardian-lion statues on newel posts). [3] THEME: the old Zone 2 map;
look at the golden-framed red throne on the grey stone dais in the middle, and the glowing lanterns.

Redraw [1] as the Zone 2 East-Asian version of the SAME object. KEEP from [1] exactly: the camera
angle, the overall silhouette and proportions, that the platform fills the full width of the canvas
with its base touching the bottom edge, the front staircase in the same place and width, the flat
standing area in the middle, the throne at the back centre, the two torch pillars at the back corners.
CHANGE the style: platform stone becomes grey-jade carved stone (#7C8C86) with slate-green shading and
a little moss; the floor slabs are large and pale grey-jade (#9AA79F); the inlaid border and centre
medallion become thin gold lines forming interlocking cloud scrolls with a four-pointed accent, no
flower, no religious symbol; carved cloud-scroll panels on the platform sides with thin gold trim;
the newel posts beside the stairs are gold-capped stone posts each topped with a small stone guardian
lion; the throne becomes a tall gold-framed throne with a red upholstered seat and back and a gold
cloud-scroll crest, like the throne in [3]; the two torch pillars become grey-jade stone pillars with
red lacquer bands and gold caps carrying a bronze bowl with a painted orange flame, like [1].
Painted game-asset style like [2]: crisp dark outlines, hand-painted texture, warm key light from
upper left. Plain flat magenta #FF00FF background, nothing else in the picture.
```
**Negative:** พื้นฐาน + `dragon, statue of a deity, lotus, lotus throne, kranok flame pattern, wan lattice, banner with text`
**เช็กลิสต์:** (1) 1536×1024 RGBA · bbox ใกล้ [1] ±2% · (2) บันได x 39–61% (±2%) · (3) บัลลังก์ + คบ 2 ต้น ตำแหน่งตาม [1] (±3%) · (4) ไม่มีรูปเคารพ/ดอกบัว/ลายม่านจื่อ · (5) ขอบโปร่ง ไม่มีขอบสี · (6) อ่านออกว่า "ตัวเดียวกับ st-sala-asia" (หยก-แดง-ทอง) ไม่ใช่โซน 1 ที่ย้อมสี

### 4.3 S2 — บ้าน 4 แบบ (รัน S2)
กติกาเดียวกันทั้ง 4: แนบ [1] ไฟล์บ้านโซน 1 ของแบบนั้น (โครง/กล้อง/มวลอาคาร) · [2] `img/map-v5/st-sala-asia.webp` (วัสดุ) · [3] `img/map-v5/st-tarang-asia.webp` (ประตู ตะเกียง หินสีเทาแกะลาย) · key `#FF00FF` · bbox ใกล้ [1] ±2% (ขอบบน/ล่าง/ซ้าย/ขวา) · ฐานล่างกึ่งกลางภาพ = จุดวาง · ความกว้างวางจริง 98–149 หน่วยโลก

**Prompt (แทน `{DESC}` ตามตาราง)**
```
Attached: [1] STRUCTURE: a finished Zone 1 small house sprite ({DESC}). [2] MATERIAL: the Zone 2 "Sala"
building sprite (dark jade-teal glazed curved tile roofs with upturned eaves, red lacquer columns and
beams, gold ornament, grey mossy stone base, red paper lanterns, stone guardian-lion statues).
[3] MATERIAL 2: another Zone 2 building with grey carved stone walls, lion-head door rings, red banners
with gold emblems (emblem must not be copied) and glowing red lanterns.

Redraw [1] as the Zone 2 East-Asian version of the SAME house. KEEP from [1] exactly: the camera angle,
the building's massing and silhouette proportions, the number of storeys, the positions of the door,
porch, balcony and windows, the stair at the front, and the transparent-background framing (the house
fills the canvas the same way, bottom centre of the base at the bottom centre of the canvas).
CHANGE the style: roofs become dark jade-teal glazed curved tiles (#1F5B5E with #2E7F7C highlights)
with gently upturned eaves and small gold roof-end ornaments (no dragon, no figure); columns, beams
and balustrades become red lacquer (#B3201E) with thin gold bands; walls become grey-jade stone
base (#7C8C86, moss) below and warm dark timber above; door and windows with open square-lattice
screens (plain square grid only) glowing warm amber from inside; a few hanging red paper lanterns
with gold caps and tassels; small gold brackets under the eaves. Painted game-asset style like [2]:
crisp dark outlines, hand-painted texture, warm key light from upper left, no ground shadow.
Plain flat magenta #FF00FF background, nothing else in the picture.
```
| ไฟล์ปลายทาง | ขนาด | แนบ [1] | `{DESC}` |
|---|---|---|---|
| `img/town-district/house-front-one-asia-v1.webp` | 1402×1122 | `house-front-one-v1.webp` | single storey, front-facing and symmetric, central gabled porch, open veranda with balusters on both sides |
| `img/town-district/house-right-one-asia-v1.webp` | 1438×1094 | `house-right-one-v1.webp` | single storey, three-quarter view, gabled front porch at the right, long side wall at the left |
| `img/town-district/house-left-two-asia-v1.webp` | 1036×1518 | `house-left-two-v1.webp` | two storeys, three-quarter view, upper balcony with banners and lanterns, door at ground level left of centre, tall tiled roof |
| `img/town-district/house-right-two-asia-v1.webp` | 1036×1518 | `house-right-two-v1.webp` | two storeys, three-quarter view, upper balcony with lanterns at the right, door at ground level right of centre, tall tiled roof |

**Negative:** พื้นฐาน + `temple hall, shrine, altar, incense burner, bell tower, torii gate, wan lattice, round window with symbol, banner with text, dragon`
**เช็กลิสต์:** (1) ขนาดตรงตาราง RGBA · bbox ±2% ของ [1] (2) จำนวนชั้น/ตำแหน่งประตู-ระเบียงตรง [1] (3) ไม่ดูเป็นวัด/ศาลเจ้า ไม่มีเจดีย์ ไม่มีลายม่านจื่อ (4) วางข้างกันทั้ง 4 แล้วอ่านเป็นชุดเดียวกัน (หลังคา teal เดียวกัน ทอง/แดงเดียวกัน) (5) ขอบสะอาด 400% (6) เข้ากับ `st-*-asia` เมื่อวางคู่

### 4.4 S3 — ต้นไม้ 4 แบบ (รัน S3)
ทุกชิ้น: แนบ [1] ไฟล์ต้นโครงโซน 1 · [2] `img/theme-v4/map-asia.webp` (ใบเมเปิลแดง กอไผ่) · ต้นไม้เต็มกว้าง ฐานโคนกึ่งกลางล่าง · เรือนยอดแผ่ ≥95% ของความกว้าง · ขอบล่างเว้น 2–3% · **หมายเหตุ Toby:** ต้นหลักโซน 1 ถูก tint ในโค้ด (`TREE_TINT`) → วาดต้นหลักโซน 2 เป็นเขียวหยกกลางๆ แล้วให้ Toby ปิด tint ของโซน 2

**S3a — ต้นหลัก (~17 จุด)** `town-tree-asia-v1.webp` 1199×1312 · key `#FF00FF` · แนบ [1] `town-tree-th-v1.webp`
```
Attached: [1] STRUCTURE: a Zone 1 broad game tree sprite. [2] THEME: the old Zone 2 map for mood.
Redraw as a Zone 2 East-Asian tree filling the canvas the same way as [1] (canopy spanning nearly the
full width, roots and trunk base at the bottom centre, a little margin at the bottom): an ancient
gnarled pine in layered "cloud-pruned" tiers, dark jade-green needle pads (#2C5E3A, #4E9A5B, highlights
#8BC06A) stacked in rounded horizontal tiers, twisting reddish-brown trunk with visible roots, a few
pale wisps of moss. Painted game-asset style: crisp dark outline, hand-painted texture, warm key light
from the upper left, no ground shadow. Plain flat magenta #FF00FF background.
```
**S3b — ต้นแดงใกล้ลาวา (8 จุด)** `town-tree-b-asia-v1.webp` 1199×1312 · **key `#00FFFF`** · แนบ [1] `town-tree-red-th-v1.webp`
```
Attached: [1] STRUCTURE: a Zone 1 red-leaf tree sprite. [2] THEME: the old Zone 2 map; look at its
crimson maple trees.
Redraw as a Zone 2 Japanese-maple style tree filling the canvas the same way as [1]: spreading canopy
nearly the full width, a twisting dark-brown trunk with roots at the bottom centre, small deeply-lobed
crimson maple leaves (#C4202B, #E5502A, shade #7A1220), a few fallen red leaves among the roots.
The reds are rich but NOT glowing: duller and darker than flames. Painted game-asset style: crisp dark
outline, hand-painted texture, warm key light from the upper left, no ground shadow. Plain flat cyan
#00FFFF background.
```
**S3c — ต้นฝั่งเย็น (2 จุด · แทนต้นหิมะ)** `town-tree-c-asia-v1.webp` 1199×1312 · key `#FF00FF` · แนบ [1] `town-tree-snow-th-v1.webp`
```
Attached: [1] STRUCTURE: a Zone 1 snow-covered tree sprite. [2] THEME: the old Zone 2 map for mood.
Redraw as a Zone 2 big bamboo clump filling the canvas the same way as [1]: dozens of jade-green and
yellow-green bamboo canes (#4E9A5B, #8BC06A, shade #2C5E3A) with visible nodes, arching outward and
upward, dense leaf sprays forming a broad rounded crown nearly the full canvas width, roots and cane
bases at the bottom centre, a few cool mist-blue highlights in the shade. NO snow, NO ice. Painted
game-asset style: crisp dark outline, hand-painted texture, warm key light from the upper left, no
ground shadow. Plain flat magenta #FF00FF background.
```
**S3d — ต้น landmark (1 จุด · แทน palm)** `town-landmark-asia-v1.webp` **1024×1328** · key `#FF00FF` · แนบ [1] `town-palm-th-v1.webp`
```
Attached: [1] STRUCTURE: a Zone 1 landmark palm tree sprite, tall and slender. [2] THEME: the old Zone 2
map for mood.
Redraw as a Zone 2 tall ginkgo tree filling the canvas the same way as [1]: a tall straight trunk with
a few exposed roots at the bottom centre, a rounded conical crown of fan-shaped pale-gold ginkgo
leaves (#E9C65A, #F6E08C, shade #A8832E), a few leaves drifting down. Painted game-asset style: crisp
dark outline, hand-painted texture, warm key light from the upper left, no ground shadow. Plain flat
magenta #FF00FF background.
```
**Negative ทั้ง 4:** พื้นฐาน + `snow, ice, bodhi leaf, pipal tree, lotus, fruit, flowers (S3a/b/c), blue glow, glowing leaves`
**เช็กลิสต์:** (1) ขนาดตรงตาราง RGBA · bbox ±2% ของ [1] (2) โคนอยู่กึ่งกลางล่าง ±2% (3) ต้นแดงหม่นกว่าเปลวไฟ (เกมอ่านส้ม-แดงสว่างเป็นไฟ) (4) ไม่มีหิมะ/น้ำแข็ง (5) 4 ต้นวางเรียงกันอ่านเป็นชุดเดียวกันและเห็นต่างกันชัด (สน / เมเปิล / ไผ่ / แปะก๊วย) (6) ขอบสะอาดไม่มีขอบสี (S3b ใช้ key cyan ต้องไม่เหลือขอบฟ้า)

### 4.5 S4 — โคม + คบ + หิน (รัน S4)

**S4a — โคม (×10)** `img/theme-v4/town-lamp-asia-v1.webp` 512×1112 · **key `#00FFFF`** · แนบ [1] `town-lamp-gold-th-v1.webp` · [2] `st-krata-asia.webp` (โคมแดง ลายทอง ฐานหิน)
เปลว/แสงวาดในภาพเหมือนโซน 1 → **Codex วัด centroid ของเปลวใน [1] แล้วให้เปลวใหม่อยู่ ±3% ของความสูง** (ประมาณจากภาพ ≈27% จากยอด)
```
Attached: [1] STRUCTURE: a Zone 1 tall slim gold lamp-post sprite with a painted flame in a lotus-shaped
bowl. [2] MATERIAL: a Zone 2 building with red lanterns, gold caps and grey carved stone bases.
Redraw as the Zone 2 version, same canvas, same slim proportions and silhouette height as [1]: a tall
slim lamp pillar with a round stepped grey-jade stone base (#7C8C86), an octagonal slender stone shaft
with thin gold bands, and at the top a red lacquer (#B3201E) and gold open lantern cage holding a
painted orange flame whose centre is at the same height as the flame in [1], crowned by a small gold
finial. Painted game-asset style: crisp dark outline, hand-painted texture, warm key light from the
upper left, no ground shadow. Plain flat cyan #00FFFF background.
```
**S4b — คบ (×24)** `img/map-zone2/torch-pillar-v1.webp` 240×419 · **key `#00FFFF`** · แนบ [1] `img/map-zone1/torch-pillar-v1.webp` · [2] `st-krata-asia.webp` (กระถางไฟบนฐานหิน) · วาดใหญ่ (≥3×) แล้วย่อ Lanczos · เปลวอยู่ที่ ≈14% จากยอดเหมือน [1] (Codex วัด)
```
Attached: [1] STRUCTURE: a Zone 1 small torch pillar sprite (dark pillar with gold ornament and a
flaming bowl on top). [2] MATERIAL: a Zone 2 building with grey carved stone bases, bronze fire bowls
and red lacquer details.
Redraw as the Zone 2 version, same canvas, silhouette and proportions as [1]: a square grey-jade
stone pillar (#7C8C86) with a red lacquer band and thin gold trim, a gold-capped top, and a bronze
bowl holding a painted orange flame at the same height and size as the flame in [1]. Bold simple
readable shapes, because the sprite is shown small. Painted game-asset style: crisp dark outline,
warm key light from upper left, no ground shadow. Plain flat cyan #00FFFF background.
```
**S4c — หิน (×4)** `img/map-zone2/prop-rock-v1.webp` 1254×1254 · key `#FF00FF` · แนบ [1] `img/map-zone1/prop-rock-v1.webp` · [2] `img/theme-v4/map-asia.webp` (หินแตกเทาเขียวบนพื้น)
```
Attached: [1] STRUCTURE: a Zone 1 boulder-cluster sprite (three rocks). [2] THEME: the old Zone 2 map;
look at its grey-green cracked rocks.
Redraw as the Zone 2 version, same canvas, same three-boulder arrangement, size and silhouette as [1]:
fractured grey-green limestone boulders (#4B5A57 shade, #7C8C86 mid, highlights #A9B7B0) with sharp
angular facets, patches of moss (#5E7A4A) on the upper faces and a few fallen crimson maple leaves at
the base. No embers, no glow, no gold light. Painted game-asset style: crisp dark outline,
hand-painted texture, warm key light from the upper left, no ground shadow. Plain flat magenta
#FF00FF background.
```
**Negative ทั้ง 3:** พื้นฐาน + `embers, lava, glowing cracks, flame outside the bowl or cage, extra flames, smoke, skull`
**เช็กลิสต์:** (1) ขนาดตรง RGBA · bbox ±2% (2) **เปลวอยู่ตำแหน่งเดียวกับ [1] ±3%** — เปลวเกินหนึ่งจุดหรือเปลวนอกกระถางตก (3) คบอ่านออกที่ 240×419 (ย่อดูที่ 100%) (4) หินไม่เรืองแสง (5) ขอบสะอาด (key cyan ไม่เหลือขอบฟ้า) (6) เข้าชุดกับ S1–S3

---

## 5. ตาราง run (≤30 นาที/run)

| Run | ชิ้น | รอ | ขนานกับ |
|---|---|---|---|
| **Z2-Q1** | เตรียม refs ข้อ 3.4 (ทุกควอแดรนต์) + **Q NW** | — | S1–S4 |
| **Z2-Q2** | Q NE | Q1 (seed แถบขวา NW) | Q3, S1–S4 |
| **Z2-Q3** | Q SW | Q1 (seed แถบล่าง NW) | Q2, S1–S4 |
| **Z2-Q4** | Q SE | **Q2 + Q3** (seed = composite 3 ควอแดรนต์) | S1–S4 |
| **Z2-Q5** *(สำรอง)* | ซ่อมรอยต่อ/จุดไม่ตรง mask (ข้อ 3.11) | Q4 + สคริปต์ต่อของ Toby | — |
| **Z2-S1** | แท่นตัดสิน (1) | ไม่รอ | ทุก run |
| **Z2-S2** | บ้าน 4 แบบ | ไม่รอ | ทุก run |
| **Z2-S3** | ต้นไม้ 4 แบบ | ไม่รอ | ทุก run |
| **Z2-S4** | โคม + คบ + หิน | ไม่รอ | ทุก run |

- **สายยาวสุด (critical path):** Q1 → (Q2 ∥ Q3) → Q4 → Q5 = **4 ขั้นต่อกัน** · sprite 4 run ขนานได้หมด ไม่ขึ้นกับพื้น
- ขนานพร้อมกันสูงสุดตอนเริ่ม = 5 run (Q1 + S1–S4) → ถ้ากลัวชนโควตา ให้เริ่ม Q1 + S1 ก่อน แล้วปล่อย S2–S4 ตามหลัง
- จำนวน = **9 run** (Toby เสนอ 8 + สำรอง 1 ตรงกัน; ผมรวมการเตรียม refs เข้า Q1 จึงไม่เพิ่มรัน)
- ระหว่างรอ sprite โซน 2: เกมตกไปใช้ sprite โซน 1 ได้ตามที่ Toby วางไว้ (key ชั่วคราว)

---

## 6. กฎสีกลางคืน/แสงเรืองโซน 3–4 (กำหนดล่วงหน้า สำหรับใบ M ถัดไป · Toby ห้ามแต่งสีเอง)

หลักร่วม: ภาพพื้นของทุกโซนวาด "สถานะกลางวัน" ที่แสงหลักซ้ายบน แล้วให้ `town-lighting.js` ทำเกรดกลางคืน — เกมอ่านพิกเซลที่ **สว่างจัด + อิ่มสีจัด ในช่วง hue ของแหล่งแสงของโซนนั้นเป็นแหล่งเรือง** ดังนั้นในภาพวาด **เฉพาะแหล่งเรืองจริงเท่านั้นที่ได้ V≥85% และ S≥80% ในช่วง hue ของมัน** ส่วนอย่างอื่น (ทองวงจร ใบไม้ โคมแดง น้ำปกติ) ต้องหม่นกว่า — **โซน 3 (west/หิมะ):** เกรดคืนฟ้าน้ำเงินลึก `#16254F` ไฮไลต์เย็น `#9CC8FF` · แหล่งเรือง = น้ำแข็ง/ธารน้ำแข็ง/น้ำตกน้ำแข็ง สีฟ้าน้ำแข็ง `#7FD8FF` (hue ≈185–210°) รัศมีกว้างอ่อน · ไฟจริง (กระถางไฟ คบ) ยังเป็นส้มอุ่น `#FF9A2E` (hue ≈15–40°) รัศมีเล็ก ใช้ตัวอ่านไฟเดิมได้ · **โซน 4 (cyberhell):** เกมคืนม่วงดำ `#1B0F3A` · แหล่งเรือง 3 ชนิด = พลังงานฟ้า-ไซแอน `#35E8FF` (hue ≈175–195°; รวมเปลวของเสา pylon/คบ) · ผลึกม่วง `#A468FF` (hue ≈265–285°) · ลาวา/ไฟส้มยังใช้ `#FF7A12` (hue ≈15–35°) · เส้นวงจรทองบนออบซิเดียนต้องหม่น (`#C9A227` ที่ V ≤70%) ห้ามให้เกมอ่านเป็นไฟ · ทั้งสองโซน: แหล่งเรืองต้องสว่างกว่าเกรดพื้นหลังกลางคืนอย่างน้อย ~3:1 เพื่อให้เห็นชัดตอนมืด · ห้ามใช้ฟ้า/ม่วงเรืองกับของที่ไม่ใช่แหล่งเรือง (เช่น ผ้า พื้นเดิน) · **สิ่งที่ Toby ต้องทำในโค้ด (แจ้งผ่าน Claudy):** `fireHue`/แหล่งเรืองเป็นพารามิเตอร์ต่อโซน (ตอนนี้ตีความส้ม-แดงอย่างเดียว) · สีเปลวคบ/โคมโซน 4 = ไซแอน ต้องวาดเปลวใน sprite สีไซแอนและให้โค้ดซ้อนเปลวสีเดียวกัน

---

## 7. ข้อที่ต้องให้คุณเป้ตัดสิน / ความเสี่ยง

**ตัดสิน**
- **D1 แผนที่ภูมิภาค (ข้อ 2.3):** NE น้ำแข็ง → ลำธารเขียวหยก+น้ำตก+ไผ่ **ไม่มีหิมะ** · N สวรรค์ → ทะเลหมอก+แปะก๊วยทอง · SE ป่า → ไผ่/สน/เมเปิล · พื้นเดินทรายน้ำตาล → หินเทาหยก — ยืนยันหรือสั่งเปลี่ยน (ตรงกับข้อ 3 ใน Toby §7)
- **D2 พืชพรรณฉากหลังในพื้น:** อนุญาตมวลต้นไม้บนหน้าผา/ป่า/ฝั่งใต้เหมือนโซน 1 (ห้ามต้นเดี่ยวบนลาน/ทาง) — หรือเข้มกว่านั้น (ห้ามต้นไม้ในพื้นเลย ซึ่งจะต่างจากโซน 1 ชัด)
- **D3 รูปสลักในซุ้มหิน** ของ map-asia ไม่ย้ายมา (เป็นรูปเคารพ) — ยืนยัน หรือสั่งให้ใส่โดยผ่าน Reese/chris-culture
- **D4 ขยายภาพ 1.8×:** ควอแดรนต์ ≥1536 px ต้องขยายเป็น 2765 px ต่อกรอบ (Toby ไม่ได้ตรวจวิธีของโซน 1) — ถ้า Q1 ออกมาเบลอที่ซูม 100% จะต้องตัดสินว่าใช้ขั้นเพิ่มรายละเอียด (upscale+repaint) หรือยอมรับ

**ความเสี่ยง/ข้อมูลแจ้ง**
1. ซ้อนบน-ล่างจริง 128 px ไม่ใช่ 192 (ข้อ 3.1) — แจ้ง Toby ให้สคริปต์ต่อ
2. `img/Zone2.webp` ไม่ใช่แผนที่ (เป็นไอคอนเกาะ) — ใช้ได้แค่พาเลตต์
3. ตัววาดอาจ "ลอก" โซน 1 (ลาวา/ส้มน้ำตาล) แทนที่จะรีธีม — เช็กลิสต์ข้อ 4, 8 คุมไว้ · ถ้ายังลอก ให้ลดน้ำหนัก [1] โดยเบลอ [1] 6 px แล้วให้ [2] walk เป็นตัวคุมโครงหลัก
4. เครื่องมือวาดอาจรับแนบ ≤ 2–3 ภาพ — มีทางสำรองข้อ 3.3
5. ต้นหลักโซน 1 มี tint ในโค้ด; sprite โซน 1 บางชิ้นมีขอบสีแดงให้เห็น — ชุดใหม่ห้ามมีขอบสี
6. sprite ทุกชิ้นยังไม่ได้ผ่าน chris-culture (ไม่ได้อ่านโน้ตวัฒนธรรมของ Reese) — ข้อ 2.6 เป็นกฎเข้มสุดแทน
7. ไม่ได้วัดพิกเซลเอง (ไม่มี shell): พิกัด "≈" ต้องให้ Codex ยืนยันใน run Q1 ก่อนวาด

## 8. Self-check SOP-10 §3
- [x] ขนาดจากไฟล์/รายงานวัดจริง (PIL ของ Toby) ไม่สมมติ · ข้อที่ไม่ได้วัดระบุ "≈"
- [x] ใช้ asset จริงเป็นโครง/วัสดุครบ (preview, guide, map-asia, st-*-asia, sprite โซน 1) — ไม่มีของวาดแทนที่มีของจริง
- [x] ระดับคุณภาพ = ภาพโซน 1 + st-*-asia เป็น quality bar
- [x] ระบุของที่ยังขาด + ใครทำ (ข้อ 1)
