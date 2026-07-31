# MiroFish Research Sprint — Fact-check Report

**โดย Reese [Fact-check] | 31 ก.ค. 2026**
**ตรวจตามกฎ CLAUDE.md ข้อ 6 + `.claude/skills/fact-check-gate/SKILL.md`**

**ไฟล์ที่ตรวจ 3 ฉบับ:**
1. `Output/Minnie/2026-07-30-mirofish-ideas.md` (273 บรรทัด)
2. `Output/Dale/2026-07-30-mirofish-technical.md` (790 บรรทัด)
3. `Output/Nick/2026-07-30-mirofish-cost.md` (456 บรรทัด)

**ไฟล์อ้างอิงต้นทาง:** `Output/Kittanate-source/2026-07-30-mirofish-brief.md`

---

# 🚦 สรุปผู้บริหาร

| ไฟล์ | Verdict | ต้องแก้ |
|---|---|---|
| **Minnie** | ⚠️ **ผ่านแบบมีเงื่อนไข** | 3 จุด (ทั้งหมดสืบทอดจาก brief + 1 ข้ออ้างที่ Nick หักล้าง) |
| **Dale** | ⚠️ **ผ่านแบบมีเงื่อนไข** | 2 จุด (1 ผิดจริง, 1 ตัวเลขคลาด) |
| **Nick** | ⚠️ **ผ่านแบบมีเงื่อนไข** | 4 จุด (1 ราคาน่าจะเก่า, 1 อ้างแหล่งผิด, 1 เลขคลาด, 1 ตรวจไม่ได้) |

**ไม่มีฉบับไหน FAIL** — ไม่พบการกุแหล่งอ้างอิง ไม่พบการเดาแล้วเขียนเป็นข้อยืนยัน
ทั้ง 3 คนมาร์กความไม่แน่ใจของตัวเองไว้ดีมาก (โดยเฉพาะ Dale ที่ใช้ระบบ ✅/🟡/⚪ และ Nick ที่เขียนสมมติฐานให้ตรวจย้อนได้ทุกข้อ)

## 🔴 3 ข้อผิดพลาดที่กระทบทุกฉบับ (มาจาก brief ต้นทาง)

1. **อายุ 20 ปี → ผิด ที่ถูกคือ 22 ปี**
2. **ดาว GitHub 42k → ผิด ที่ถูกคือ 69.7k** (ยืนยันแล้ว 69,732 ณ วันตรวจ) — ปิดประเด็นที่ขัดกันได้
3. **Backend เป็น FastAPI → ผิด ที่ถูกคือ Flask** — ข้อนี้ **ยังไม่มีใครในทีมจับได้** และหลุดไปทั้ง 3 ฉบับ

---

# A. ตรวจตารางข้ออ้างใน brief (ทุกบรรทัด)

## A1. ผู้สร้าง: Guo Hangjiang (郭航江) นักศึกษาปี 4 ม.ไปรษณีย์โทรคมนาคมปักกิ่ง **อายุ 20**

| ส่วนย่อย | ผล |
|---|---|
| ชื่อ Guo Hangjiang / 郭航江 (นามแฝง BaiFu) | ✅ **VERIFIED** |
| นักศึกษาปี 4 (大四) | ✅ **VERIFIED** |
| มหาวิทยาลัยไปรษณีย์โทรคมนาคมปักกิ่ง (北京邮电大学 / BUPT) | ✅ **VERIFIED** |
| **อายุ 20** | ❌ **INCORRECT** |

**ข้อมูลที่ถูก: อายุ 22 ปี**

> "**22岁**中国学生手搓项目两度霸榜GitHub，陈天桥：给你3000万继续做"
> — 解放日报 (Jiefang Daily), jfdaily.com/wx/detail.do?id=1083207

36Kr เขียนกว้างกว่าว่า "20多岁" (ยี่สิบกว่า) ซึ่งไม่ขัดกับ 22 แต่ **ไม่มีแหล่งไหนระบุ "20" ตรง ๆ**
สันนิษฐานว่า brief แปล "20多岁" ผิดเป็น "20"

**แหล่งที่ตรวจ:** 解放日报, 36Kr (36kr.com/p/3720728841763465), 新浪财经, TMTPost

---

## A2. สร้างเสร็จใน 10 วัน

✅ **VERIFIED**

> "用**十天**时间通过 Claude Code 进行 Vibe Coding 完成了整个项目"
> — สรุปตรงกันทั้ง 36Kr, 解放日报, SegmentFault

**เกร็ดที่ brief ไม่ได้เขียนแต่ควรรู้:** BettaFish (โปรเจกต์แรกของเขา ซึ่งเป็นตัวที่ทำให้ Chen Tianqiao สนใจ) ก็ใช้ 10 วันเหมือนกัน — คือ **สอง** โปรเจกต์ ๆ ละ 10 วัน ไม่ใช่โปรเจกต์เดียว

---

## A3. ขึ้นอันดับ 1 GitHub Trending โลก ~7 มี.ค. 2026

✅ **VERIFIED — วันที่ตรงเป๊ะ ไม่ใช่ "ประมาณ"**

> "就在**3月7日**，MiroFish 登顶 GitHub 全球趋势榜第一"
> — TMTPost (tmtpost.com/7905346.html), ยืนยันซ้ำโดย 解放日报

สอดคล้องกับ metadata ของ repo ที่ Dale ตรวจ (สร้าง 26 พ.ย. 2025 → มีอยู่ก่อน 3 เดือน)
解放日报 เสริมว่า **"两天内破万 star"** หลังขึ้นอันดับ 1

**หมายเหตุ:** ผมยืนยันได้แค่ "สื่อหลายสำนักรายงานตรงกัน" — GitHub ไม่เก็บ archive ของ Trending ย้อนหลังให้ตรวจตรงได้ ระดับความเชื่อถือ = **สื่อรอง 3 สำนักที่รายงานตรงกัน** ไม่ใช่หลักฐานปฐมภูมิ

---

## A4. 🔴 ดาว GitHub: 69.7k vs 42k — **ชี้ขาดแล้ว**

### ✅ **69.7k ถูก** · ❌ **42k ผิด**

**หลักฐานปฐมภูมิ — GitHub API วันนี้ (31 ก.ค. 2026):**

```
stargazers_count: 69,732
forks_count:      10,893
open_issues:      107
created_at:       2025-11-26
pushed_at:        2026-07-23
license:          AGPL-3.0
```

Dale รายงาน 69,712 เมื่อ 30 ก.ค. → วันนี้ 69,732 (+20 ดาวใน 1 วัน) = **สอดคล้องกัน ยืนยัน Dale ถูก**

**42k มาจากไหน:** น่าจะเป็นตัวเลข ณ ช่วงหนึ่งของเดือน มี.ค.–เม.ย. 2026 ที่สื่อไทยแปลต่อกันมาโดยไม่อัปเดต
→ **ไม่ใช่ "แหล่งหนึ่งผิด" แต่เป็น "ตัวเลขเก่าที่ถูกนำเสนอเป็นปัจจุบัน"**

> 💡 **นี่คือจุดที่ยืนยันสมมติฐานของ Minnie ในใบ #04 พอดี** — เธอเดาว่า "สื่อไทยแปลต่อกันมาจากแหล่งจีนโดยไม่ตรวจ" ผลตรวจนี้เป็นหลักฐานสนับสนุนใบนั้นโดยตรง

---

## A5. ลงทุน 30 ล้านหยวน (~4.1 ล้าน USD) จาก Chen Tianqiao (Shanda Group) ภายใน 24 ชม.

| ส่วนย่อย | ผล |
|---|---|
| 3,000 万元 = 30 ล้านหยวน | ✅ **VERIFIED** |
| ผู้ลงทุน 陈天桥 (Chen Tianqiao) ผู้ก่อตั้ง 盛大集团 (Shanda Group) | ✅ **VERIFIED** |
| ตัดสินใจภายใน 24 ชม. | ✅ **VERIFIED (มีเงื่อนไข — อ่านข้างล่าง)** |
| ~4.1 ล้าน USD | ⚠️ **UNVERIFIED** |

**หลักฐาน 24 ชม.:**
> "去年**12月16日**深夜，郭航江激动地录制了一个略显粗糙的演示视频，直接发送到陈天桥的手机上。**24小时内**，他们俩进行了第二次谈话。陈天桥当场拍板：集团注资3000万元"

### ⚠️ ประเด็นที่ต้องแก้ความเข้าใจ — timeline ไม่ใช่อย่างที่ brief สื่อ

brief วางลำดับให้อ่านเหมือนว่า **ขึ้นอันดับ 1 → แล้วได้เงินภายใน 24 ชม.**
**ความจริงคือกลับกัน:**

```
26 พ.ย. 2025   สร้าง repo
16 ธ.ค. 2025   ส่งวิดีโอเดโมให้ Chen Tianqiao (ตอนนั้นเป็นเด็กฝึกงานที่ Shanda อยู่แล้ว)
17 ธ.ค. 2025   ← 24 ชม. ต่อมา ตัดสินใจลงทุน 30 ล้านหยวน
 7 มี.ค. 2026   MiroFish ขึ้นอันดับ 1 GitHub Trending (≈ 3 เดือนหลังได้เงิน)
 9 มี.ค. 2026   สื่อรายงาน
```

→ **"24 ชม." นับจากส่งเดโม ไม่ใช่จากขึ้นอันดับ 1**
เรื่องนี้สำคัญกับใบ #04 ของ Minnie โดยตรง เพราะเป็น **จุดที่สื่อไทยเล่าลำดับผิด** = วัตถุดิบบทความชั้นดี

**เรื่อง ~4.1 ล้าน USD:** 30,000,000 ÷ 4,100,000 = **7.32 หยวน/USD** — อยู่ในช่วงที่เป็นไปได้ แต่ **brief ไม่ระบุแหล่งและวันที่ของอัตราแลกเปลี่ยน** → ถือเป็นการประมาณ ไม่ใช่ข้อยืนยัน แนะนำให้ตัดออกหรือเขียนว่า "ประมาณ" พร้อมวันที่

---

## A6. เทคนิค / Stack — 🔴 **เจอข้อผิดพลาดที่ยังไม่มีใครจับได้**

**วิธีตรวจ:** อ่านซอร์สจริงจาก `raw.githubusercontent.com/666ghj/MiroFish/main/...` วันนี้

| ข้ออ้างใน brief | ผล | ของจริง |
|---|---|---|
| Repo `github.com/666ghj/MiroFish` | ✅ VERIFIED | GitHub API |
| **License: AGPL-3.0** | ✅ VERIFIED | `spdx_id: "AGPL-3.0"` + `pyproject.toml`: `license = { text = "AGPL-3.0" }` |
| **Backend: FastAPI** | ❌ **INCORRECT** | **Flask** — ดูข้างล่าง |
| **Python 3.10+** | ❌ **INCORRECT** | `requires-python = ">=3.11,<3.13"` (Dale จับได้แล้ว ✅) |
| OASIS framework | ✅ VERIFIED | `camel-oasis==0.2.5`, `camel-ai==0.2.78` |
| Zep Cloud (temporal knowledge graph) | ✅ VERIFIED | `zep-cloud==3.25.0` |
| Vue 3 | ✅ VERIFIED | `"vue": "^3.5.24"` |
| D3.js | ✅ VERIFIED | `"d3": "^7.9.0"` |
| **WebSocket** | ⚠️ **UNVERIFIED** | หาไม่เจอ — ดูข้างล่าง |
| LLM API OpenAI-compatible + แนะนำ Qwen-plus ผ่าน Bailian | ✅ VERIFIED | `.env.example`: `LLM_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1`, `LLM_MODEL_NAME=qwen-plus` |
| ต้องมี Zep Cloud API key | ✅ VERIFIED | `.env.example`: `ZEP_API_KEY=your_zep_api_key_here` |
| Workflow 5 ขั้น Ontology → GraphRAG → Config → Simulation → Report | ✅ VERIFIED | สอดคล้องกับ `config.py` + โครงสร้าง repo |

### ❌ **INCORRECT: FastAPI → ที่ถูกคือ Flask**

หลักฐานตรง 3 ชั้นจากซอร์สจริง:

```toml
# backend/pyproject.toml
dependencies = [
    # 核心框架
    "flask>=3.0.0",
    "flask-cors>=6.0.0",
    ...
]
```

```python
# backend/app/config.py
class Config:
    """Flask配置类"""          # ← "คลาสตั้งค่า Flask"
    SECRET_KEY = os.environ.get('SECRET_KEY', 'mirofish-secret-key')
    DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    JSON_AS_ASCII = False
```

`backend/requirements.txt` ก็ระบุ `flask>=3.0.0` / `flask-cors>=6.0.0` เหมือนกัน
**ไม่มีคำว่า `fastapi` หรือ `uvicorn` อยู่ในไฟล์ dependency ใดเลย**

**ความผิดนี้แพร่ไป 3 จุด:**
| ไฟล์ | บรรทัด/ตำแหน่ง | ข้อความ |
|---|---|---|
| brief | หัวข้อ "เทคนิค" | "Python 3.10+ / **FastAPI** / OASIS framework" |
| Minnie | X3 | "เราไม่มีคนดูแล **Python/FastAPI/Vue** เต็มเวลา" |
| Dale | B4 หัวข้อ A3 คำแนะนำ, ตาราง A4 | "เวลา Dale ตั้งระบบ **Python/FastAPI/Vue**" |

**ผลกระทบต่อข้อสรุป: ไม่มี** — Flask กับ FastAPI มีภาระดูแลใกล้เคียงกัน และเหตุผลที่ทั้ง Dale/Minnie ตัด MiroFish ทิ้ง (Zep Cloud + AGPL) ไม่เกี่ยวกับเฟรมเวิร์กเลย
**แต่ต้องแก้** เพราะถ้าใบ #04 (บทความ) เอาไปเผยแพร่ = เราจะกลายเป็นสำนักที่รายงานผิดเสียเอง ซึ่งทำลายจุดขายทั้งหมดของบทความนั้น

### ⚠️ UNVERIFIED: WebSocket

ตรวจแล้ว **หาหลักฐานไม่เจอ:**
- `frontend/package.json` มีแค่ `axios`, `d3`, `vue`, `vue-i18n`, `vue-router` — **ไม่มี socket.io-client หรือ ws**
- `backend/requirements.txt` มี `flask` + `flask-cors` — **ไม่มี flask-socketio หรือ websockets**
- git tree ทั้ง repo (156 ไฟล์) — **ไม่มีไฟล์ที่มีคำว่า socket / sse / stream เลย** (ที่ match มีแต่ path รูปโลโก้)

→ **ไม่ได้แปลว่าไม่มี real-time** (อาจใช้ polling ผ่าน axios) แต่ **ข้ออ้าง "WebSocket" ไม่มีหลักฐานรองรับ** ต้องตัดออกหรือเปลี่ยนเป็น "ยังไม่ยืนยัน"

---

## A7. ⚠️ ข้ออ้าง "จูนตามพฤติกรรม/timezone จีน" — **ยืนยัน Dale ถูก ข้ออ้างนี้ไม่มีหลักฐาน**

brief เขียนใน sub-question ของ Reese ข้อ 5 และ Minnie อ้างต่อในใบ #02 ว่า
*"README ระบุว่าปรับจูนตามพฤติกรรมจีน/timezone จีน"*

**ผมตรวจแล้ว — ไม่จริง:**
- grep `README.md` หา `timezone|时区|中国用户行为|微博` → **0 hit**
- grep `README-ZH.md` ด้วยคำเดียวกัน → **0 hit**

สิ่งที่มีจริงคือ i18n ของ UI เท่านั้น (ตรงกับที่ Dale รายงาน ✅):
```python
# backend/app/utils/locale.py บรรทัด 30-32
raw = request.headers.get('Accept-Language', 'zh')
return raw if raw in _translations else 'zh'
```
`locales/` มี `en.json` + `zh.json` — **default เป็น `zh` จริง แต่นั่นคือภาษา UI ไม่ใช่การจูน persona**

→ ✅ **Dale ตั้งข้อสงสัยถูกต้อง** ข้ออ้างนี้ต้องถอนออกจาก brief และจากใบ #02 ของ Minnie
**ผลกระทบเชิงบวก:** ถ้าไม่มีการจูนตามจีนจริง อุปสรรคด้าน "ปรับมาใช้บริบทไทย" ก็เล็กกว่าที่ทีมกลัวไว้

---

# B. Fact-check รายไฟล์

# 📄 B1. Minnie — `2026-07-30-mirofish-ideas.md`

## ลักษณะเอกสาร
ไฟล์นี้ **ส่วนใหญ่เป็น 💬 OPINION/HYPOTHESIS โดยเจตนา** และ Minnie ประกาศไว้ชัดตั้งแต่ต้น:

> "ทุกอย่างที่เขียนถึง MiroFish ในเอกสารนี้อ้างจาก brief ... ซึ่ง **ยังไม่ผ่าน Reese fact-check** ... ดังนั้นทุกใบในเอกสารนี้เป็น **สมมติฐานที่ต้องทดสอบ** ไม่ใช่ข้อเสนอที่พร้อมอนุมัติ"

👏 **นี่คือการปฏิบัติที่ถูกต้องตามกฎ** — การมาร์กสถานะข้อมูลตั้งต้นแบบนี้ทำให้ความเสี่ยงของทั้งเอกสารลดลงมาก และผมให้เครดิตเต็ม

## ผลตรวจรายข้อ

| # | ข้ออ้าง | ผล |
|---|---|---|
| M1 | สมมติฐานทั้ง 6 ใบ (#01–#06) | 💬 **OPINION** — เป็นสมมติฐานพร้อมคำถามวิจัย ผ่านโดยไม่ต้องพิสูจน์ |
| M2 | "ตัวเลขดาว GitHub ยังขัดกันเอง (69.7k vs 42k)" | ✅ **VERIFIED (ณ เวลาที่เขียน)** — และตอนนี้ชี้ขาดแล้วว่า 69.7k ถูก |
| M3 | "ความแม่นยำยังไม่มี benchmark" | ✅ **VERIFIED** — ผมหา benchmark ความแม่นของ MiroFish ไม่เจอในแหล่งสาธารณะใดเลย (ตรงกับที่ Dale รายงาน ⚪) |
| M4 | X3: "upstream อายุไม่ถึงครึ่งปี" | ⚠️ **คลาดเล็กน้อย** — repo สร้าง 26 พ.ย. 2025 → ณ 30 ก.ค. 2026 = **8 เดือน** (Dale เขียน 8 เดือนถูก) "ไม่ถึงครึ่งปี" ต่ำไป แต่ **ข้อสรุป (ยังเปลี่ยนเร็ว) ไม่เปลี่ยน** |
| M5 | X3: "stack นี้ไม่ตรงกับ Vite+React+Firebase ที่เราใช้อยู่" | ✅ **VERIFIED** — MiroFish = Python/Flask + Vue3/Vite; AGAPAE = Vite+React+Firebase ตาม CLAUDE.md |
| M6 | X3: "**Python/FastAPI/Vue**" | ❌ **INCORRECT** → Flask (ดู A6) |
| M7 | X2: "AGPL-3.0 น่าจะบังคับเปิด source ถ้าเปิดเป็นบริการผ่านเว็บ — รอ Dale ยืนยัน" | ✅ **VERIFIED + มาร์กความไม่แน่ใจถูกต้อง** — Dale ยืนยันแล้วว่าจริงในกรณี (ค-2) |
| M8 | #01: "**เรามีข้อมูลเฉลยอยู่แล้ว — ดีลที่แพ้/ชนะในอดีตพร้อมเหตุผล ใช้ backtest ได้ทันที**" | ⚠️ **UNVERIFIED — น่าจะไม่จริง** (ดูข้างล่าง) |
| M9 | #01: "เป็นใบเดียวในลิสต์ที่พิสูจน์หรือหักล้างตัวเองได้เร็วและถูก" | ⚠️ ขึ้นกับ M8 — ถ้า M8 ไม่จริง ข้อนี้ก็ไม่จริง |
| M10 | #06: "agent จำอะไรไม่ได้ ทุก session เริ่มจากศูนย์" | ✅ **VERIFIED** — ยืนยันจากโครงสร้างระบบเอง (ไม่มี memory layer ใน `.claude/` หรือ hook ปัจจุบัน; Libby ทำ index ระดับไฟล์เท่านั้น) |
| M11 | X4: "จำลองบุคคลที่ระบุตัวได้ = ไม่ควรทำ" | 💬 **OPINION (จริยธรรม)** — ผ่าน และผมสนับสนุนให้ยกเป็นกฎถาวรตามที่เธอเสนอ |

### ⚠️ M8 — ข้ออ้างที่เป็นฐานของ TOP PICK ทั้งใบ

Nick หักล้างข้อนี้แบบตรง ๆ ในเอกสารของเขา (หัวข้อ A1) ว่า **"ไม่มีฟิลด์ผลแพ้/ชนะเลย"**

**ผมตรวจเองไม่ได้** — ไฟล์ `quotations.json` อยู่นอก repo (`AI Print Order Assistant /app/src/data/`) และ**การเข้าถึงถูกระบบสิทธิ์บล็อก** เพราะเป็นข้อมูลลูกค้าจริงนอกไดเรกทอรีงาน

**สิ่งที่ผมทำได้และทำแล้ว:**
- ✅ ยืนยันว่าไฟล์มีอยู่จริง ขนาด 1,590,056 bytes (1.59 MB) แก้ไขล่าสุด 2 ก.ค. 2026 — **ตรงกับที่ Nick ระบุว่า "generated 2 ก.ค. 2026"**
- ✅ Nick เขียนคำสั่งตรวจซ้ำไว้ให้ครบ (หัวข้อ "📎 ไฟล์และคำสั่งที่ใช้ตรวจซ้ำได้") = ตรวจย้อนได้จริงถ้ามีสิทธิ์

**คำตัดสิน:** ผมให้น้ำหนักฝั่ง Nick มากกว่า เพราะเขาระบุ schema เจาะจง (`customer · date · date_estimated · quote_no · items[] · subtotal · vat · grand_total · file`) และเปิดคำสั่ง grep ให้ตรวจซ้ำ ขณะที่ Minnie ไม่ได้อ้างแหล่งใด ๆ ประกอบ M8 เลย
→ **มาร์ก M8 เป็น ⚠️ UNVERIFIED และแนะนำให้ถือว่า Nick ถูกไปก่อน**
→ **ต้องมีคนที่มีสิทธิ์เข้าถึงยืนยัน 1 ครั้ง** ก่อนตัดสินใจเรื่อง #01 (ดูข้อเสนอท้ายเอกสาร)

## ประเมินความน่าเชื่อถือของแหล่ง (Minnie)

| ประเด็น | ระดับ |
|---|---|
| อ้าง brief เป็นแหล่งเดียว | 🟡 **ยอมรับได้เพราะประกาศไว้ชัดว่ายังไม่ผ่าน fact-check** — แต่ตอนนี้ brief พิสูจน์แล้วว่ามี 3 จุดผิด จึงต้องอัปเดต |
| ไม่มีการอ้างแหล่งภายนอกเลย | 🟡 เหมาะกับ ideation แต่ M8 เป็นข้ออ้างเรื่องข้อมูลภายในที่ควรเช็คก่อนใช้เป็นฐาน TOP PICK |

## 🎯 VERDICT — Minnie: ⚠️ **ผ่านแบบมีเงื่อนไข**

**ต้องแก้ก่อนเข้า Chris QA (เป็น -v2):**
1. ❌ X3 — `Python/FastAPI/Vue` → **`Python/Flask/Vue`**
2. ⚠️ หัวข้อเปิด — "ตัวเลขดาว GitHub ยังขัดกันเอง (69.7k vs 42k)" → **อัปเดตเป็น "ชี้ขาดแล้ว: 69.7k ถูก (69,732 ณ 31 ก.ค. 2026), 42k เป็นตัวเลขเก่า"**
3. ⚠️ ใบ #02 — ตัดข้ออ้าง "MiroFish จูนบนพฤติกรรม/timezone จีน" ออก (ไม่มีหลักฐาน) หรือเปลี่ยนเป็นคำถามเปิด
4. ⚠️ ใบ #01 — **ปรับ M8** จาก "เรามีข้อมูลเฉลยอยู่แล้ว ใช้ backtest ได้ทันที" เป็น "เชื่อว่าน่าจะมีข้อมูลเฉลย — **ต้องให้ Nick ยืนยันก่อน**" (ซึ่ง Nick ตอบแล้วว่าไม่มี)

**ไม่ต้องแก้:** สมมติฐานทุกใบ, X1/X2/X4, เกณฑ์ตัดสินใจ — ผ่านหมด

---

# 📄 B2. Dale — `2026-07-30-mirofish-technical.md`

## ลักษณะเอกสาร
**คุณภาพการอ้างอิงสูงที่สุดในสามฉบับ** Dale อ่านซอร์สจริงและ quote ตรงตัว ไม่ตอบจากความจำ
ระบบมาร์ก ✅ ยืนยันแล้ว / 🟡 แนวโน้ม / ⚪ ยังยืนยันไม่ได้ ใช้ได้สม่ำเสมอทั้งฉบับ

## B2.1 ตัวบท AGPL-3.0 — ตรวจทุกบรรทัดที่ quote

> **ตามที่โจทย์กำหนด:** ผมตรวจเฉพาะว่า **ตัวบท license ที่ Dale อ้างถูกต้องตรงตามต้นฉบับหรือไม่** — ไม่ตัดสินว่าการตีความของเขาถูกกฎหมายหรือไม่ ตามข้อสงวนที่เขาเขียนไว้เอง ("ผมเป็นวิศวกร ไม่ใช่นักกฎหมาย")

**วิธีตรวจ:** ดึง `raw.githubusercontent.com/666ghj/MiroFish/main/LICENSE` มาเทียบทีละบรรทัด

| § | ที่ Dale quote | ผลเทียบต้นฉบับ |
|---|---|---|
| **§2 Basic Permissions** | "This License explicitly affirms your unlimited permission to run the unmodified Program. The output from running a covered work is covered by this License only if the output, given its content, constitutes a covered work." | ✅ **ตรงเป๊ะทุกคำ** |
| **§0 "propagate"** | "To 'propagate' a work means to do anything with it that, without permission, would make you directly or secondarily liable for infringement under applicable copyright law, except executing it on a computer or modifying a private copy." | ✅ **ตรงเป๊ะทุกคำ** |
| **§0 "convey"** | "To 'convey' a work means any kind of propagation that enables other parties to make or receive copies. Mere interaction with a user through a computer network, with no transfer of a copy, is not conveying." | ✅ **ตรงเป๊ะทุกคำ** |
| **§13 Remote Network Interaction** | "If you modify the Program, your modified version must prominently offer all users interacting with it remotely through a computer network (if your version supports such interaction) an opportunity to receive the Corresponding Source of your version by providing access to the Corresponding Source from a network server at no charge..." | ✅ **ตรงเป๊ะ** (ต้นฉบับขึ้นต้นด้วย "Notwithstanding any other provision of this License, if you modify the Program..." — Dale ตัดวรรคนำหน้าออกโดยไม่เปลี่ยนความหมาย ยอมรับได้) |
| **§5(ค)** | licensee ต้อง "license the entire work, as a whole, under this License to anyone who comes into possession of a copy" | ✅ **ตรงเป๊ะ** |

✅ **ตัวบท license ทุกบรรทัดที่ Dale อ้าง = ถูกต้อง ไม่มีการตัดต่อที่บิดความหมาย**
✅ ยืนยันเพิ่ม: หัวไฟล์คือ `GNU AFFERO GENERAL PUBLIC LICENSE, Version 3, 19 November 2007` ตามที่เขาระบุ

🟡 **การตีความ (กรณี ก/ข/ค)** = Dale มาร์ก 🟡 ไว้เองทุกช่องแล้ว และเขียนข้อสงวนว่าต้องให้ทนายดูก่อนทำกรณี (ค)
→ **ผมเคารพข้อสงวนนั้น ไม่ให้ verdict เรื่องการตีความ** — แต่ยืนยันว่า**ฐานข้อเท็จจริงที่เขาใช้ตีความนั้นถูกต้อง**

## B2.2 หลักฐาน Zep บังคับใช้ — ✅ **ยืนยันทุกบรรทัด**

**`backend/app/config.py` ฟังก์ชัน `validate()` — ตรงกับที่ Dale quote 100%:**
```python
@classmethod
def validate(cls) -> list[str]:
    errors: list[str] = []
    if not cls.LLM_API_KEY:
        errors.append("LLM_API_KEY 未配置")
    if not cls.ZEP_API_KEY:
        errors.append("ZEP_API_KEY 未配置")
    if os.environ.get("ZEP_API_URL"):
        errors.append("ZEP_API_URL 不受支持；MiroFish 仅连接 Zep Cloud")
```
✅ **คำแปลของ Dale ถูกต้อง:** "ZEP_API_URL ไม่รองรับ — MiroFish เชื่อมต่อ Zep Cloud เท่านั้น"

**`backend/app/utils/zep.py` — ✅ ตรง และผมเจอหลักฐานเสริมที่ Dale ยังไม่ได้ยก:**
```python
ZEP_CLOUD_BASE_URL = "https://api.getzep.com/api/v2"
...
def get_zep_client(...):
    # zep-cloud gives ZEP_API_URL precedence even when base_url is explicit.
    # Reject it so this Cloud-only integration cannot silently target a
    # self-hosted or compatibility endpoint.
    if os.environ.get("ZEP_API_URL"):
        raise ValueError("ZEP_API_URL is unsupported; unset it to use Zep Cloud")
```
→ **คอมเมนต์ของผู้พัฒนาเองเขียนตรง ๆ ว่าตั้งใจปฏิเสธ self-hosted endpoint** = **ยืนยันข้อสรุปของ Dale ให้หนักแน่นกว่าที่เขาเขียนอีก** ไม่ใช่แค่ error แต่ `raise ValueError` เลย

⚠️ **จุดคลาดเล็ก:** Dale เขียน "**13 ไฟล์**ที่มีคำว่า `zep` ใน `backend/`"
→ ผมนับจาก git tree จริงได้ **16 ไฟล์** (services 3 + utils 3 + scripts 1 + tests 9)
→ **นับต่ำไป 3 ไฟล์ — ข้อสรุป (ถอด Zep ออกไม่ได้) ยิ่งแข็งขึ้น ไม่ใช่อ่อนลง**
✅ ยืนยันว่ามี `test_zep_simulation_barrier.py` และ `test_zep_report_barrier.py` จริงตามที่เขาอ้าง

## B2.3 ข้อมูล Zep (บริษัท / นโยบาย / ราคา)

| ข้ออ้างของ Dale | ผล | หลักฐาน |
|---|---|---|
| Zep AI Inc. บริษัทอเมริกัน ผ่าน Y Combinator | ✅ **VERIFIED** | Zep AI (YC W24), ก่อตั้ง 2023 โดย Daniel Chalef, สำนักงานใหญ่ San Francisco |
| SOC 2 Type II | ✅ **VERIFIED** | help.getzep.com/security-compliance |
| HIPAA BAA เฉพาะ Enterprise | ✅ **VERIFIED** | "Business Associate Agreements available for Enterprise customers" |
| BYOK ด้วย AWS KMS CMK | ✅ **VERIFIED** | "Encrypt data at rest using your own AWS KMS Customer Master Key" |
| 🟡 "น่าจะโฮสต์บน AWS (อนุมานจาก BYOK)" | ✅ **การอนุมานสมเหตุสมผล + มาร์ก 🟡 ถูกต้อง** | ไม่มีคำยืนยันตรงในเอกสาร Zep |
| ⚪ **region / ประเทศ หาไม่เจอ** | ✅ **VERIFIED ว่าหาไม่เจอจริง** | ผมตรวจซ้ำหน้า security-compliance — **ไม่ระบุ region, cloud provider, หรือประเทศเลย** ยืนยัน Dale |
| ⚪ **นโยบาย training / retention หาไม่เจอ** | ✅ **VERIFIED ว่าหาไม่เจอจริง** | ตรวจซ้ำแล้ว ไม่มีทั้งสองเรื่องในเอกสารสาธารณะ |
| Community Edition เลิกแล้ว เม.ย. 2025 | ✅ **VERIFIED** | FAQ: "Zep Community Edition, which allows you to host Zep locally, **is deprecated and no longer supported**" |
| BYOC มีแต่ Enterprise เท่านั้น | ✅ **VERIFIED** | FAQ: "For enterprise customers who need VPC residency and maximum control, we offer BYOC deployments" |
| Zep pricing: Free 10,000 credits/เดือน (2 projects) | ✅ **VERIFIED** | getzep.com/pricing |
| Flex $1,250/ปี (50k credits/เดือน) | ✅ **VERIFIED** | "$104 / month, billed annually" = $1,250/ปี · "50,000 credits included per month" |
| Flex Plus $3,750/ปี (200k credits/เดือน) | ✅ **VERIFIED** | "$312 / month, billed annually" · "200,000 credits included per month" |
| ⚪ "1 credit = กี่ operation ไม่ระบุในหน้า pricing → Nick ประเมินไม่ได้" | ❌ **INCORRECT — มีระบุ** | ดูหัวข้อ B3.3 · **Nick หาเจอและใช้ถูกต้อง** |

**Graphiti:**
| ข้ออ้าง | ผล |
|---|---|
| license Apache-2.0 | ✅ **VERIFIED** — GitHub API: `spdx_id: "Apache-2.0"` |
| 29,373 ดาว | ✅ **VERIFIED** — วันนี้ 29,387 (+14 ใน 1 วัน = drift ปกติ) |
| push ล่าสุด 30 ก.ค. 2026 (active) | ✅ **VERIFIED** — `pushed_at: 2026-07-30T23:41:40Z` |
| ต้องมี graph DB (Neo4j 5.26 / FalkorDB 1.1.2 / Neptune), Kuzu deprecated | ⚠️ **ไม่ได้ตรวจซ้ำ** — เป็นรายละเอียด README ของ Graphiti ที่ Dale อ่านเอง ไม่ใช่ข้ออ้างที่กระทบข้อสรุป |

## B2.4 สเปกเครื่อง Kittanate — ✅ **รันคำสั่งซ้ำเองทุกบรรทัด ตรงหมด**

| รายการ | Dale รายงาน | ผมรันซ้ำวันนี้ | ผล |
|---|---|---|---|
| OS | macOS 15.3.1 (build 24D70) | `ProductVersion: 15.3.1`, `BuildVersion: 24D70` | ✅ |
| CPU | x86_64 (Intel) | `x86_64` | ✅ |
| Cores | 16 logical | `hw.ncpu = 16` | ✅ |
| RAM | 16 GB (17,179,869,184 bytes) | `hw.memsize = 17179869184` | ✅ **ตรงถึงหลักหน่วย** |
| Node.js | v25.8.2 | `v25.8.2` | ✅ |
| npm | 11.11.1 | `11.11.1` | ✅ |
| Python | 3.13.3 (**ตกสเปก**) | `Python 3.13.3` + `requires-python = ">=3.11,<3.13"` | ✅ **ยืนยันว่าตกสเปกจริง** |
| Python 3.11/3.12 | ไม่มีทั้งคู่ | `python3.11 not found` / `python3.12 not found` | ✅ |
| uv | 0.11.8 | `uv 0.11.8 (0e961dd9a 2026-04-27)` | ✅ |
| Docker | ไม่ได้ติดตั้ง | `docker not found` | ✅ |

👏 **ทุกบรรทัดถูกต้อง 100%** — นี่คือมาตรฐานที่อยากเห็นในทุกเอกสาร

## B2.5 ข้ออ้างเรื่อง Claude compat layer

| ข้ออ้าง | ผล |
|---|---|
| Anthropic มี OpenAI SDK compatibility layer | ✅ **VERIFIED** — มีจริงที่ `platform.claude.com/docs/en/api/openai-sdk` |
| Anthropic บอกเองว่า "not production-ready" | ✅ **VERIFIED** — ตรงกับเอกสาร |
| `response_format` ถูก "Ignored" | ✅ **VERIFIED** |
| ไม่มี prompt caching ผ่าน compat layer | ✅ **VERIFIED** — และเป็นประเด็นต้นทุนที่สำคัญจริงตามที่เขาเตือน Nick |
| `chat_json()` ใน `llm_client.py` รอ exception จึงจะ downgrade | ✅ **VERIFIED** — โค้ดที่ quote ตรงตามซอร์ส และการวิเคราะห์ (Anthropic ไม่ throw → เงื่อนไขไม่เข้า) **ถูกต้องตามตรรกะ** |
| `chat_json` default `max_attempts: int = 1` | ✅ **VERIFIED** |
| ⚪ "ความถี่ที่จะพังจริง ผมยังไม่ได้ทดสอบ ตอบไม่ได้" | ✅ **มาร์ก ⚪ ถูกต้อง** — ไม่เดา ดีมาก |
| `LLM_BASE_URL` default `https://api.openai.com/v1`, `LLM_MODEL_NAME` default `gpt-4o-mini` | ✅ **VERIFIED** ตรงกับ `config.py` |
| README: "supports any LLM API with OpenAI SDK format" | ✅ **VERIFIED** — README บรรทัด 118 |

## B2.6 ราคา Claude ที่ Dale ส่งต่อ Nick

Dale อ้างจาก skill `claude-api` (แคช 24 มิ.ย. 2026): Opus 5 $5/$25 · Sonnet 5 $3/$15 (โปรฯ $2/$10 ถึง 31 ส.ค. 2026) · Haiku 4.5 $1/$5

✅ **VERIFIED — ผมตรวจกับเอกสารสด (platform.claude.com) วันนี้ ยังตรงทุกตัว** (รายละเอียดเต็มอยู่ B3.2)

## B2.7 ข้ออ้างอื่นใน Dale

| ข้ออ้าง | ผล |
|---|---|
| `OASIS_DEFAULT_MAX_ROUNDS = 10` (ไม่ใช่ 40) | ✅ **VERIFIED** — `config.py`: `int(os.environ.get('OASIS_DEFAULT_MAX_ROUNDS', '10'))` |
| README เตือน "High consumption, try simulations with fewer than 40 rounds first" | ✅ **VERIFIED** — `README.md` บรรทัด 120 (และมีสำนวนจีนเดียวกันใน `.env.example`: "注意消耗较大，可先进行小于40轮的模拟尝试") |
| `ALLOWED_EXTENSIONS = {'pdf','md','txt','markdown'}`, `MAX_CONTENT_LENGTH = 50MB` | ✅ **VERIFIED** ตรงตาม `config.py` |
| `.env.example` — LLM_BOOST comment "ถ้าไม่ใช้ ห้ามใส่ลงไฟล์" | ✅ **VERIFIED** — "注意如果不使用加速配置，env文件中就不要出现下面的配置项" |
| repo สร้าง 26 พ.ย. 2025, push ล่าสุด 23 ก.ค. 2026, 107 open issues, 10,889 forks | ✅ **VERIFIED** (forks วันนี้ 10,893 — drift ปกติ) |
| `docker-image.yml` build `linux/amd64,linux/arm64` + image `ghcr.io/666ghj/mirofish:latest` | ⚠️ **ไม่ได้ตรวจซ้ำ** — ไม่กระทบข้อสรุป (เขาแนะนำไม่ติดตั้งอยู่แล้ว) |
| `hook-gate.mjs` / `hook-status.mjs` บรรทัดที่อ้าง | ⚠️ **ไม่ได้ตรวจซ้ำรายบรรทัด** — เป็นโค้ดภายใน ไม่ใช่ข้ออ้างต่อโลกภายนอก และ Chris QA ตรวจได้ดีกว่า |
| corpus ภายใน ~100–200 KB, `worklog.json` 83 KB, `status.json` 13 KB | ⚠️ **ตรวจบางส่วน** — `worklog.json` มี 95 entries จริง ✅ (ขนาดไฟล์ไม่ได้วัด) |
| ⚪ "ไม่มี benchmark ความแม่น ผมไม่เจอ — ให้ Reese ยืนยัน" | ✅ **ยืนยัน: ผมก็หาไม่เจอ** — ไม่มี benchmark ความแม่นยำของ MiroFish ในแหล่งสาธารณะใด |
| ⚪ "license ของ OASIS/camel-ai ผมไม่ได้ตรวจ" | ⚠️ **ยังไม่ได้ตรวจเช่นกัน** — นอกขอบเขต fact-check รอบนี้ (เป็น research question ไม่ใช่ข้ออ้างที่ต้องตรวจ) |

## ประเมินความน่าเชื่อถือของแหล่ง (Dale)

| ประเภทแหล่ง | ระดับ |
|---|---|
| ซอร์สโค้ดจริง + GitHub API + LICENSE | ✅ **ปฐมภูมิ ระดับสูงสุด** |
| เอกสารทางการของ Zep / Anthropic | ✅ **ปฐมภูมิ (ผู้ให้บริการเอง)** |
| คำสั่งที่รันบนเครื่องจริง | ✅ **ปฐมภูมิ ตรวจซ้ำได้ และผมตรวจซ้ำแล้ว** |
| **ไม่มีแหล่งคุณภาพต่ำเลยในเอกสารนี้** | ✅ |

## 🎯 VERDICT — Dale: ⚠️ **ผ่านแบบมีเงื่อนไข**

**ต้องแก้ (เล็กน้อย 2 จุด):**
1. ❌ **`Python/FastAPI/Vue` → `Python/Flask/Vue`** (โผล่ในหัวข้อ A3 คำแนะนำ + ตารางประเมินแรงงาน) — MiroFish ใช้ **Flask** ไม่ใช่ FastAPI
2. ⚠️ **"13 ไฟล์ที่มีคำว่า zep" → 16 ไฟล์** (นับต่ำไป 3 — แก้แล้วข้อสรุปยิ่งแข็ง)

**แก้ได้ถ้าอยากอัปเดต (ไม่บังคับ):**
3. หัวข้อ A2 — ⚪ "1 credit = กี่ operation ไม่ระบุ" → **Nick หาเจอแล้ว** (getzep.com/pricing: **1 credit ต่อ episode ≤350 bytes**) เปลี่ยนจาก ⚪ เป็น ✅ ได้
4. ยกคอมเมนต์ใน `zep.py` (`"Reject it so this Cloud-only integration cannot silently target a self-hosted or compatibility endpoint"`) มาเสริมหลักฐาน A2 — เป็นคำของผู้พัฒนาเองที่หนักกว่าโค้ดเปล่า

**ทุกอย่างที่เหลือ — ผ่าน** โดยเฉพาะส่วน AGPL, Zep, และสเปกเครื่อง ที่ผมตรวจซ้ำแล้วตรงหมด

---

# 📄 B3. Nick — `2026-07-30-mirofish-cost.md`

## B3.1 อัตราแลกเปลี่ยน ฿33.65 / USD (TradingEconomics, 30 ก.ค. 2026)

✅ **VERIFIED**

> USD/THB = **33.6530** ณ 30 ก.ค. 2026 (+0.52% จากวันก่อนหน้า) — TradingEconomics
> แหล่งอื่นวันเดียวกัน: 33.6263 (09:39 UTC) — ต่างกัน 0.08% = ความผันผวนระหว่างวันปกติ

Nick ปัดเป็น ฿33.65 = **ถูกต้องและอนุรักษ์นิยมพอดี** ✅ ระบุแหล่งและวันที่ครบ ✅

## B3.2 ราคา Claude — ✅ **ตรวจกับเอกสารสดแล้ว ยังตรงทุกตัว**

Nick อ้าง skill `claude-api` ที่ **แคชไว้ 24 มิ.ย. 2026** — โจทย์สั่งให้ตรวจว่ายังตรงกับปัจจุบันไหม
**ผมดึงเอกสารสดจาก `platform.claude.com/docs/en/about-claude/models/overview` วันนี้ (31 ก.ค. 2026):**

| โมเดล | Nick อ้าง (แคช 24 มิ.ย.) | เอกสารสด 31 ก.ค. 2026 | ผล |
|---|---|---|---|
| **Claude Opus 5** | $5 in / $25 out | **$5 / input MTok · $25 / output MTok** | ✅ **VERIFIED** |
| **Claude Sonnet 5** | $3 / $15 | **$3 / input MTok · $15 / output MTok** | ✅ **VERIFIED** |
| **Claude Haiku 4.5** | $1 / $5 | **$1 / input MTok · $5 / output MTok** | ✅ **VERIFIED** |

### 🔴 โปรโมชัน Sonnet 5 $2/$10 — **ยืนยันแล้วว่ายังใช้ได้ และวันหมดถูกต้อง**

เชิงอรรถข้อ 4 ของตารางเปรียบเทียบโมเดล (เอกสารสด):

> "*Introductory pricing of **$2 / $10 per MTok** applies to Claude Sonnet 5 through **August 31, 2026**.*"

✅ **VERIFIED ทั้งราคาและวันหมด**
✅ **ณ วันตรวจ (31 ก.ค. 2026) โปรโมชันยังใช้ได้อีก 31 วัน**

⚠️ **แต่มีนัยที่ Nick ควรเขียนเพิ่ม:** ทุกตัวเลข "Sonnet 5 (โปรฯ)" ในเอกสารของเขา (฿1,555/sim, ฿24/panel, ฿94/pre-mortem) **จะเพิ่มขึ้น 50% อัตโนมัติหลัง 31 ส.ค. 2026** ซึ่งเหลือเวลาแค่เดือนเดียว
→ ถ้าโปรเจกต์นี้เริ่มจริงเดือน ก.ย. ตัวเลข Sonnet ทั้งหมดต้องคูณ 1.5
→ **แนะนำให้ Nick ใส่บรรทัดเตือนวันหมดโปรฯ ลงในตารางค่าอ้างอิง** (ตอนนี้เขียนไว้แล้วแต่ไม่ได้ชี้ผลกระทบ)

## B3.3 Zep Cloud — ตรวจครบทุกบรรทัด

| ข้ออ้างของ Nick | ผล | หลักฐาน (getzep.com/pricing, 31 ก.ค. 2026) |
|---|---|---|
| Free: **10,000 credits/เดือน, 2 projects** | ✅ **VERIFIED** | "10,000 credits per month" · 2 projects · no rollover |
| Flex: **$104/เดือน (จ่ายรายปี $1,250)** | ✅ **VERIFIED** | "$104 / month, billed annually" = $1,250/ปี |
| Flex: **50,000 credits** | ✅ **VERIFIED** | "50,000 credits included per month" |
| Flex: **overage $25/10k** | ✅ **VERIFIED** | "$25 / 10,000 credits" |
| **1 credit ต่อ episode ≤350 bytes (เกินคิดเพิ่มทุก 350 bytes)** | ✅ **VERIFIED** | ⬇️ ดูข้างล่าง |
| $104/เดือน ≈ ฿3,500/เดือน | ✅ **VERIFIED** | 104 × 33.65 = ฿3,499.6 ✅ |

### ✅ กฎ credit — ยืนยันแล้ว แต่ **⚠️ Nick อ้างแหล่งผิด**

**กฎที่ถูกต้อง (ตรงกับที่ Nick ใช้):**
> "Episodes up to **350 bytes** use 1 credit; each additional 350 bytes (or part thereof) uses another credit. A 640-byte Episode uses 2 credits; a 1,200-byte Episode uses 4 credits."
> เพิ่มเติม: retrieval, storage, threads, users, และ graph storage ใช้ **0 credit**

⚠️ **แต่ Nick อ้างว่ามาจาก `help.getzep.com/faq`** — ผมดึงหน้า FAQ มาตรวจแล้ว **ไม่มีกฎนี้อยู่ในนั้น**
FAQ พูดถึง credit แค่ประโยคเดียวว่า *"If you're on the free tier, you have a limited number of episode credits per month."*
→ **แหล่งที่ถูกคือ `getzep.com/pricing`** ต้องแก้การอ้างอิง

**ผลกระทบต่อตัวเลข: ไม่มี** — กฎถูกต้อง แค่ชี้แหล่งผิดหน้า
**แต่ต้องแก้** เพราะถ้าใครไปตามลิงก์แล้วหาไม่เจอ จะเข้าใจว่า Nick กุตัวเลข

### 💡 ข้อมูลใหม่ที่กระทบตัวเลขของ Nick ในทางที่ดี

FAQ/pricing ระบุว่า **retrieval ใช้ 0 credit** — Nick คิด 4,200 episodes × 2 credits = 8,400 credits ซึ่งนับเฉพาะการ**เขียน**เข้า graph ✅ **ถูกต้องแล้ว** ไม่ได้นับ retrieval เกินมา
→ **การประมาณ Zep ของ Nick อนุรักษ์นิยมและถูกวิธี**

## B3.4 ราคา Qwen-plus $0.40 / $1.20 — ⚠️ **น่าจะเก่า (output ผิด)**

| ส่วน | ผล |
|---|---|
| **input $0.40 / 1M** | ✅ **VERIFIED** — ตรงกันทั้งแหล่งเก่าและใหม่ |
| **output $1.20 / 1M** | ⚠️ **UNVERIFIED — น่าจะเก่า** |

**สิ่งที่พบ:**

| แหล่ง | วันที่ | qwen-plus in/out |
|---|---|---|
| eesel.ai (แหล่งที่ Nick อ้าง) | "checked **3 มิ.ย. 2026**" | **$0.40 / $1.20** |
| BenchLM.ai (sync จาก Alibaba Model Studio) | "Last Synced: **30 ก.ค. 2026**" | **$0.40 / $2.40** ← Qwen3.5 Plus, international deployment |

**ปัญหา 3 ชั้น:**
1. **แหล่งของ Nick เป็นบล็อกบุคคลที่สาม** (eesel.ai) ไม่ใช่หน้าราคาทางการของ Alibaba → คุณภาพแหล่ง 🟡
2. **ข้อมูลเก่ากว่า brief 2 เดือน** (3 มิ.ย. vs 30 ก.ค.)
3. **ผมเข้าหน้าราคาทางการของ Alibaba Model Studio โดยตรงไม่ได้** (หน้า docs ที่เข้าถึงได้ไม่มีตารางราคา) → **ยืนยันขาดไม่ได้ว่าตัวไหนถูก** และ **ผมจะไม่เดา**

**ประเด็นเสริม:** `qwen-plus` เป็น **alias** ที่ Alibaba ชี้ไปยังรุ่นล่าสุด (ปัจจุบันน่าจะเป็น Qwen3.5-Plus) — ถ้าเป็นเช่นนั้น ราคา output ที่ใช้จริงคือ **$2.40** ไม่ใช่ $1.20

### ผลกระทบต่อตัวเลข (คำนวณให้แล้ว)

| | Nick ($1.20) | ถ้า $2.40 | ต่างกัน |
|---|---|---|---|
| output cost/sim | $1.51 | $3.02 | +$1.51 |
| **รวม/sim (Qwen)** | **$8.23 = ฿277** | **$9.74 = ฿328** | **+฿51 (+18%)** |
| 300 agents × 40 รอบ | ฿831 | ฿983 | +฿152 |

→ **ข้อสรุปของ Nick ไม่เปลี่ยนแม้แต่น้อย** ("สาย ก. ไม่แพง" ยังจริง ฿328 ก็ยังถูกกว่ากาแฟสามแก้ว)
→ **แต่ตัวเลขต้องแก้หรือใส่ช่วง** — ห้ามปล่อยตัวเลขที่อ้างแหล่งอายุ 2 เดือนไว้เฉย ๆ

**คำแนะนำ:** เขียนเป็น **"$0.40 in / $1.20–$2.40 out (⚠️ ยืนยันจากหน้าราคาทางการ Alibaba ไม่ได้ — ตัวเลข out ต่างกัน 2 เท่าระหว่างแหล่ง)"** และใช้ค่าสูงในการตัดสินใจ (อนุรักษ์นิยม)

## B3.5 การคำนวณทั้งหมด — ✅ **ตรวจซ้ำทีละบรรทัด ถูกเกือบทั้งหมด**

### A2 — MiroFish 100 agents × 40 รอบ

| ขั้น | Nick | ผมคำนวณซ้ำ | ผล |
|---|---|---|---|
| H1: 100 × 40 | 4,000 calls | 4,000 | ✅ |
| H2: +5% | 4,200 calls | 4,200 | ✅ |
| input รวม: 4,200 × 4,000 | 16.8M | 16.8M | ✅ |
| output รวม: 4,200 × 300 | 1.26M | 1.26M | ✅ |
| Qwen: 16.8×0.40 / 1.26×1.20 | $6.72 / $1.51 → $8.23 → ฿277 | $6.72 / $1.512 → $8.232 → ฿277.0 | ✅ |
| Sonnet 5 โปรฯ: 16.8×2 / 1.26×10 | $33.60 / $12.60 → $46.20 → ฿1,555 | $46.20 → ฿1,554.6 | ✅ |
| Sonnet 5 ปกติ: ×3 / ×15 | $50.40 / $18.90 → $69.30 → ฿2,332 | $69.30 → ฿2,332.0 | ✅ |
| Opus 5: ×5 / ×25 | $84.00 / $31.50 → $115.50 → ฿3,887 | $115.50 → ฿3,886.6 | ✅ |
| Haiku 4.5: ×1 / ×5 | $16.80 / $6.30 → $23.10 → ฿777 | $23.10 → ฿777.3 | ✅ |
| Zep: 4,200 × 2 credits | 8,400 credits | 8,400 | ✅ |
| Free 10,000 → 1 sim/เดือน | ✅ | 10,000 ÷ 8,400 = 1.19 | ✅ |
| Flex 50,000 → ~5–6 sim | ✅ | 50,000 ÷ 8,400 = 5.95 | ✅ |

✅ **A2 ถูกทั้งหมด** (ยกเว้นราคา Qwen ที่เป็นปัญหาแหล่ง ไม่ใช่ปัญหาเลขคณิต)

### A3 — Persona panel 9 × 5

| ขั้น | Nick | ผมคำนวณซ้ำ | ผล |
|---|---|---|---|
| calls: 9×5 + 5 | 50 | 50 | ✅ |
| input: 50 × 5,000 | 250k | 250,000 | ✅ |
| output: 50 × 400 | 20k | 20,000 | ✅ |
| Opus ไม่ cache | $1.25 + $0.50 = $1.75 → ฿59 | $1.75 → ฿58.9 | ✅ |
| Opus + cache 70% @ 0.1× | $0.46 + $0.50 = $0.96 → ฿32 | 0.25×(0.3×5 + 0.7×0.5) = $0.4625 → $0.9625 → ฿32.4 | ✅ |
| Sonnet โปรฯ | $0.50 + $0.20 = $0.70 → ฿24 | $0.70 → ฿23.6 | ✅ |
| ส่วนต่าง Opus: ฿3,887 vs ฿59 | 66× | 65.9× | ✅ |
| ส่วนต่างจริง: ฿277 vs ฿59 | 4.7× | 4.69× | ✅ |
| ส่วนต่างสัมบูรณ์ | ฿218 – ฿3,828 | 277−59=218 · 3,887−59=3,828 | ✅ |
| ×20 ครั้ง/ปี | ฿4,360 – ฿76,560 | ✅ | ✅ |

### B5 — Break-even

| ขั้น | Nick | ผมคำนวณซ้ำ | ผล |
|---|---|---|---|
| ฐาน: 20 × ฿68,507 | ฿1,370,140 | ฿1,370,140 | ✅ |
| ค่า API 20 run × ฿59 | ฿1,180 | ฿1,180 | ✅ |
| break-even (API เพียว) | 0.09 pp | 1,180 ÷ 1,370,140 = 0.086% | ✅ |
| = ดีลเพิ่ม | 0.02 ดีล | 1,180 ÷ 68,507 = 0.017 | ✅ |
| + margin 30% | 0.29 pp / 0.06 ดีล | (1,180÷0.3) ÷ 1,370,140 = 0.287% · 0.057 ดีล | ✅ |
| API + เวลาคน ฿11,680 | 2.8 pp / 0.57 ดีล | (11,680÷0.3) ÷ 1,370,140 = 2.84% · 0.568 ดีล | ✅ |
| ถ้า win rate +5 pp | +฿68,500 ยอดขาย | 20 × 0.05 × 68,507 = ฿68,507 | ✅ |
| กำไรที่ margin 30% | +฿20,550 | ฿20,552 | ✅ |
| ROI | 1.8× | 20,552 ÷ 11,680 = 1.76 | ✅ |
| "ถ้า +2 pp → ROI < 1 = ขาดทุน" | ✅ | 20×0.02×68,507×0.3 = ฿8,221 ÷ 11,680 = **0.70** | ✅ **ถูกต้อง** |

### B6 — Pre-mortem

| ขั้น | Nick | ผมคำนวณซ้ำ | ผล |
|---|---|---|---|
| calls: 25 × 7.5 + 12 | 200 | 187.5 + 12 = 199.5 ≈ 200 | ✅ |
| input 1.0M / output 0.08M | ✅ | 200×5,000 = 1.0M · 200×400 = 80k | ✅ |
| Opus ไม่ cache | $7.00 → ฿236 | 1.0×5 + 0.08×25 = $7.00 → ฿235.6 | ✅ |
| **Opus + cache** | **~$3.60 → ฿121** | 1.0×(0.3×5+0.7×0.5) + 0.08×25 = $1.85 + $2.00 = **$3.85 → ฿129.5** | ⚠️ **คลาด ~7%** |
| Sonnet โปรฯ | $2.80 → ฿94 | 1.0×2 + 0.08×10 = $2.80 → ฿94.2 | ✅ |
| พิมพ์ซ้ำ 40%: มัธยฐาน | ฿5,906 | 14,766 × 0.4 = ฿5,906.4 | ✅ |
| พิมพ์ซ้ำ 40%: เฉลี่ย | ฿27,403 | 68,507 × 0.4 = ฿27,402.8 | ✅ |
| อัตราส่วน 1:25 / 1:116 | ✅ | 5,906÷236 = 25.0 · 27,403÷236 = 116.1 | ✅ |
| ต้องจับได้ 4.0% / 0.9% | ✅ | 1÷25 = 4.0% · 1÷116 = 0.86% | ✅ |

⚠️ **จุดเดียวที่คลาด:** "Opus 5 + prompt cache ~$3.60 / ฿121"
ด้วยสมมติฐานของ Nick เอง (cache prefix 70% อ่านที่ 0.1×) ควรได้ **$3.85 / ฿129.5**
→ **คลาด 7% ต่ำกว่าความจริง** — ไม่กระทบข้อสรุป (บาร์ 1:25 ยังต่ำมาก) แต่ควรแก้ให้ตรง

### B7 — Reaction Gate

| ขั้น | Nick | ผมคำนวณซ้ำ | ผล |
|---|---|---|---|
| ต้นทุน/agent-task (Opus 5) | $0.375 + $0.088 + $0.50 = $0.96 → ฿32 | 75k×$5/M = $0.375 · 175k×$0.50/M = $0.0875 · 20k×$25/M = $0.50 → $0.9625 → ฿32.4 | ✅ |
| เฉลี่ย 1.45 task | ฿46 | 1.45 × 32.4 = ฿47.0 | ✅ |
| pipeline เต็ม ~6 task | ฿194 | 6 × 32.4 = ฿194.3 | ✅ |
| Reaction Gate A: 10 calls, 40k in, 3k out | ฿9 | 0.04×5 + 0.003×25 = $0.275 → ฿9.25 | ✅ |
| % ของ ฿194 | 4.6% | 9.25 ÷ 194 = 4.8% | ✅ |
| % ของ ฿46 | 20% ⚠️ | 9.25 ÷ 46 = 20.1% | ✅ **และ Nick flag เองถูกต้องว่าคาบเส้น** |
| Gate B: 9 agent-task | ฿288 | 9 × 32 = ฿288 | ✅ |
| % ของ ฿194 / ฿46 | 148% / 626% | 288÷194 = 148% · 288÷46 = 626% | ✅ |
| บิลเดือน 42 × ฿46 | ~฿1,930 | ฿1,932 | ✅ |
| + Gate A | +฿378 → ฿2,308 | 42 × 9 = ฿378 | ✅ |
| + Gate B | +฿12,096 → ฿14,026 | 42 × 288 = ฿12,096 | ✅ |

✅ **B7 ถูกทั้งหมด** และการตอบคำถาม "ถ้าเกิน 20% ให้บอกชัด" ของ Minnie = ตอบตรงและซื่อสัตย์ (4.6% ถ้า lean, 148% ถ้าทำผิดวิธี) 👏

### 📊 สรุปการตรวจเลขคณิต

**ตรวจ 60+ การคำนวณ → ถูก 59 ผิด 1 (คลาด 7% ในบรรทัดเดียว)**
👏 **คุณภาพการคำนวณสูงมาก** และการเขียนสมมติฐาน H1–H5 ให้ตรวจย้อนได้คือแนวปฏิบัติที่ควรบังคับใช้กับทุกรายงานต้นทุนต่อจากนี้

## B3.6 ข้ออ้างเรื่องข้อมูลภายใน

### ✅ ตรวจแล้ว ถูกต้อง

| ข้ออ้าง | ผล | หลักฐาน |
|---|---|---|
| `worklog.json` **ไม่มีฟิลด์ token/cost เลย** | ✅ **VERIFIED** | ตรวจ schema ของ entries แล้ว ไม่มีฟิลด์ที่มีคำว่า token |
| `worklog.json` **95 entries** | ✅ **VERIFIED** | นับได้ 95 พอดี |
| `Output/Libby/template-library.csv` **มีแต่ header ว่างเปล่า (0 listing)** | ✅ **VERIFIED** | ไฟล์มี 1 บรรทัด: `sku,name_th,name_en,category,size_mm,color_notes,fonts,price_usd,platform,status,file_path,indexed_date` |
| deliverable มิ.ย. 2026 = **29 ชิ้น** | ✅ **VERIFIED** | นับ `Output/*/2026-06-*.md` = 29 |
| deliverable ก.ค. 2026 = **42 ชิ้น** | ✅ **VERIFIED (ณ 30 ก.ค.)** | วันนี้นับได้ 44 (เพิ่ม 2 ชิ้นจากงานสปรินต์นี้เอง) = สอดคล้อง |
| ไม่มีไฟล์ analytics ใดใน repo | ✅ **VERIFIED** | ไม่พบ |

### ⚠️ ตรวจไม่ได้ — ต้องแจ้งตรง ๆ

**ข้ออ้างทั้งหมดที่อ้างอิง `quotations.json` ผมยืนยันไม่ได้:**

- ใบเสนอราคา 1,666 ใบ · 195 ลูกค้า · ช่วง 9 มิ.ย. 2015 → 1 ก.ค. 2026
- schema: `customer · date · date_estimated · quote_no · items[] · subtotal · vat · grand_total · file`
- ไม่มีฟิลด์ผลแพ้/ชนะ / เหตุผลที่แพ้ / คู่แข่ง / ผู้ตัดสินใจ
- grep คำจัดซื้อจัดจ้าง 7 คำ ทั้ง 1,666 ใบ = 0 hit
- ตาราง 2024–2026: 276 ใบ / 52 ใบสถาบัน / 36 ใบมี grand_total
- ลูกค้าสถาบันเพียง 10 ราย · คิงส์คอลเลจ 102 ใบ · รพ.สุขสวัสดิ์ 49 ใบ
- ค่าเฉลี่ย ฿68,507 · มัธยฐาน ฿14,766 · รวม ฿2,466,262 · ~20 ใบ/ปี

**เหตุผลที่ตรวจไม่ได้:** ไฟล์อยู่นอก repo (`/Users/agapae/Documents/Work PAE/Claude/AI Print Order Assistant /app/src/data/quotations.json`) และ**ระบบสิทธิ์บล็อกการอ่าน** เพราะเป็นข้อมูลลูกค้าจริงนอกไดเรกทอรีงาน — **ผมไม่พยายามเลี่ยงข้อจำกัดนี้**

**สิ่งที่ยืนยันได้:**
- ✅ ไฟล์มีอยู่จริง **1,590,056 bytes (1.59 MB)** แก้ไขล่าสุด **2 ก.ค. 2026 23:02** — **ตรงกับที่ Nick ระบุว่า "generated 2 ก.ค. 2026"** ✅
- ✅ ขนาด 1.59 MB สอดคล้องกับ ~1,666 ระเบียนที่มี items[] (≈ 954 bytes/ใบ) = **สมเหตุสมผล**
- ✅ Nick เขียนคำสั่งตรวจซ้ำไว้ครบในหัวข้อ "📎 ไฟล์และคำสั่งที่ใช้ตรวจซ้ำได้"

**คำตัดสิน: ⚠️ UNVERIFIED-BY-REESE (ไม่ใช่ ❌ INCORRECT)**
Nick ทำถูกทุกอย่างที่ควรทำ — ระบุ path ระบุคำสั่ง ระบุ schema ให้ตรวจย้อนได้
**ผมแค่ไม่มีสิทธิ์เข้าถึงเพื่อยืนยัน** ซึ่งเป็นข้อจำกัดของผม ไม่ใช่ข้อบกพร่องของเขา

### ⚠️ ข้ออ้างเรื่องราคาวิจัยตลาด (B8)

| ข้ออ้าง | ผล |
|---|---|
| Focus group ฟรีแลนซ์ (Fastwork) เริ่ม **฿800** | ⚠️ **UNVERIFIED — แหล่งอ่อน** |
| จ้างพนักงานเก็บแบบสอบถาม **฿300/ชุด** | ⚠️ **UNVERIFIED — แหล่งอ่อน** |
| จ้างบริษัทวิจัยตลาดเต็มโครงการ = "ค้นแล้วไม่พบราคาที่ยืนยันได้" | ✅ **การรายงานว่าหาไม่เจอ = ถูกต้องตามกฎ ไม่เดา** 👏 |

Nick มาร์ก ⚠️ ทั้งสองข้อไว้เองแล้วพร้อมเขียนว่า "ราคาเริ่มต้นบนแพลตฟอร์มฟรีแลนซ์ ไม่ใช่โครงการเต็ม"
→ **ยอมรับได้** เพราะเขาใช้เป็น anchor เชิงเปรียบเทียบ ไม่ใช่ฐานคำนวณ ROI

## ประเมินความน่าเชื่อถือของแหล่ง (Nick)

| แหล่ง | ระดับ | หมายเหตุ |
|---|---|---|
| TradingEconomics (อัตราแลกเปลี่ยน) | ✅ **น่าเชื่อถือสูง** | ระบุวันที่ครบ ตรวจซ้ำได้ |
| skill `claude-api` (ราคา Claude) | ✅ **ปฐมภูมิ (Anthropic)** | แคช 24 มิ.ย. แต่**ตรวจแล้วยังตรงกับเอกสารสด 31 ก.ค.** |
| getzep.com/pricing | ✅ **ปฐมภูมิ (ผู้ให้บริการ)** | ⚠️ แต่ชี้แหล่งผิดเป็น help.getzep.com/faq |
| **eesel.ai (ราคา Qwen)** | 🟡 **บล็อกบุคคลที่สาม + เก่า 2 เดือน** | 🔴 **จุดอ่อนที่สุดของเอกสาร** |
| ข้อมูลภายใน (repo + quotations.json) | ✅ **ปฐมภูมิ** | ⚠️ ส่วน quotations.json ผมยืนยันไม่ได้ |
| Fastwork / ราคาแบบสอบถาม | 🟡 **อ่อน — แต่ Nick flag เอง** | ใช้เป็น anchor เท่านั้น |

## 🎯 VERDICT — Nick: ⚠️ **ผ่านแบบมีเงื่อนไข**

**ต้องแก้ก่อนเข้า Chris QA (เป็น -v2):**
1. ⚠️ **ราคา Qwen-plus** — เปลี่ยน `$0.40 / $1.20` เป็น **`$0.40 in / $1.20–$2.40 out`** พร้อมหมายเหตุว่ายืนยันจากหน้าราคาทางการ Alibaba ไม่ได้ และ**ใช้ค่าสูงในการตัดสินใจ** → ต้นทุน/sim เปลี่ยนจาก ฿277 เป็น **฿277–328**
2. ⚠️ **แหล่งกฎ Zep credit** — `help.getzep.com/faq` → **`getzep.com/pricing`** (กฎถูก แหล่งผิดหน้า)
3. ⚠️ **B6 Opus 5 + cache** — `~$3.60 / ฿121` → **`$3.85 / ฿130`** (คลาด 7%)
4. ⚠️ **เพิ่มบรรทัดเตือน** — ตัวเลข Sonnet 5 ทุกตัวจะ **+50% หลัง 31 ส.ค. 2026** (เหลืออีก 31 วัน) ถ้าโปรเจกต์เริ่ม ก.ย. ต้องคูณ 1.5

**ต้องมีคนอื่นยืนยันให้ (ไม่ใช่ความผิดของ Nick):**
5. ⚠️ ตัวเลขทั้งหมดที่มาจาก `quotations.json` — **ผมเข้าถึงไม่ได้** ต้องให้ Kittanate หรือคนที่มีสิทธิ์รันคำสั่งตรวจซ้ำที่ Nick เขียนไว้ **1 ครั้ง** ก่อนใช้ตัดสินใจเรื่อง #01 (โดยเฉพาะ "ไม่มีข้อมูลเฉลยเลย" ซึ่งเป็นข้อชี้ขาดทั้งสปรินต์)

**ไม่ต้องแก้:** อัตราแลกเปลี่ยน ✅ ราคา Claude ทั้ง 3 โมเดล ✅ ราคา Zep ทุกแผน ✅ กฎ credit ✅ การคำนวณ 59/60 บรรทัด ✅ ข้อมูล repo ภายใน ✅

---

# C. ตารางสรุป Claim Inventory (รวมทุกไฟล์)

| # | ข้ออ้าง | ไฟล์ | ผล |
|---|---|---|---|
| 1 | Guo Hangjiang / 郭航江 ผู้สร้าง | brief→ทุกไฟล์ | ✅ VERIFIED |
| 2 | นักศึกษาปี 4 BUPT | brief | ✅ VERIFIED |
| 3 | **อายุ 20** | brief | ❌ **INCORRECT → 22** |
| 4 | สร้างเสร็จ 10 วัน | brief | ✅ VERIFIED |
| 5 | อันดับ 1 GitHub Trending 7 มี.ค. 2026 | brief, Dale | ✅ VERIFIED |
| 6 | **ดาว 69.7k** | brief, Dale | ✅ **VERIFIED (69,732)** |
| 7 | **ดาว 42k** | brief | ❌ **INCORRECT (ตัวเลขเก่า)** |
| 8 | 30 ล้านหยวน จาก Chen Tianqiao/Shanda | brief | ✅ VERIFIED |
| 9 | ภายใน 24 ชม. | brief | ✅ VERIFIED (แต่ timeline ไม่ตรงที่ brief สื่อ) |
| 10 | ~4.1 ล้าน USD | brief | ⚠️ UNVERIFIED (ไม่ระบุแหล่ง/วันที่) |
| 11 | License AGPL-3.0 | brief, Dale | ✅ VERIFIED |
| 12 | **Backend FastAPI** | brief, Minnie, Dale | ❌ **INCORRECT → Flask** |
| 13 | **Python 3.10+** | brief | ❌ **INCORRECT → >=3.11,<3.13** |
| 14 | OASIS / Zep Cloud / Vue 3 / D3.js | brief | ✅ VERIFIED |
| 15 | **WebSocket** | brief | ⚠️ **UNVERIFIED (ไม่พบใน deps หรือ repo)** |
| 16 | **จูนตามพฤติกรรม/timezone จีน** | brief, Minnie #02 | ⚠️ **UNVERIFIED (ไม่มีใน README ทั้ง 2 ภาษา)** |
| 17 | ตัวบท AGPL §0/§2/§5/§13 ที่ Dale quote | Dale | ✅ VERIFIED (ตรงเป๊ะทุกคำ) |
| 18 | การตีความ AGPL กรณี ก/ข/ค | Dale | 🟡 OPINION (มีข้อสงวนถูกต้อง — เคารพตามโจทย์) |
| 19 | `config.py` ปฏิเสธ ZEP_API_URL | Dale | ✅ VERIFIED |
| 20 | `zep.py` hard-code Zep Cloud URL | Dale | ✅ VERIFIED |
| 21 | **13 ไฟล์ zep ใน backend** | Dale | ⚠️ **คลาด → 16 ไฟล์** |
| 22 | Zep AI = บริษัทอเมริกัน ผ่าน YC | Dale | ✅ VERIFIED (YC W24, San Francisco) |
| 23 | Zep SOC 2 Type II / HIPAA BAA / BYOK AWS KMS | Dale | ✅ VERIFIED |
| 24 | Zep ไม่ระบุ region/ประเทศ | Dale | ✅ VERIFIED (หาไม่เจอจริง) |
| 25 | Zep ไม่ระบุ training/retention | Dale | ✅ VERIFIED (หาไม่เจอจริง) |
| 26 | Zep CE เลิก เม.ย. 2025 / BYOC เฉพาะ Enterprise | Dale | ✅ VERIFIED |
| 27 | Graphiti Apache-2.0, ~29.4k ดาว, active | Dale | ✅ VERIFIED |
| 28 | สเปกเครื่อง Kittanate ทุกบรรทัด | Dale | ✅ VERIFIED (รันซ้ำเองแล้ว) |
| 29 | Anthropic compat layer + `response_format` Ignored + ไม่มี caching | Dale | ✅ VERIFIED |
| 30 | `OASIS_DEFAULT_MAX_ROUNDS = 10` | Dale | ✅ VERIFIED |
| 31 | README เตือน "<40 rounds" | Dale | ✅ VERIFIED |
| 32 | **฿33.65/USD (TradingEconomics 30 ก.ค. 2026)** | Nick | ✅ **VERIFIED (33.6530)** |
| 33 | **Opus 5 $5/$25** | Nick, Dale | ✅ **VERIFIED (เอกสารสด 31 ก.ค.)** |
| 34 | **Sonnet 5 $3/$15** | Nick, Dale | ✅ **VERIFIED** |
| 35 | **Sonnet 5 โปรฯ $2/$10 ถึง 31 ส.ค. 2026** | Nick, Dale | ✅ **VERIFIED ทั้งราคาและวันหมด — ยังใช้ได้อีก 31 วัน** |
| 36 | **Haiku 4.5 $1/$5** | Nick, Dale | ✅ **VERIFIED** |
| 37 | **Qwen-plus $0.40 / $1.20** | Nick | ⚠️ **input ✅ · output น่าจะเก่า ($2.40 ในแหล่งล่าสุด)** |
| 38 | Zep Free 10,000 credits / 2 projects | Nick, Dale | ✅ VERIFIED |
| 39 | Zep Flex $104/เดือน ($1,250/ปี), 50k credits, overage $25/10k | Nick, Dale | ✅ VERIFIED |
| 40 | Zep Flex Plus $3,750/ปี, 200k credits | Dale | ✅ VERIFIED |
| 41 | **1 credit ต่อ episode ≤350 bytes** | Nick | ✅ **VERIFIED — แต่แหล่งคือ getzep.com/pricing ไม่ใช่ FAQ** |
| 42 | การคำนวณต้นทุนทั้งหมด (60+ บรรทัด) | Nick | ✅ VERIFIED 59/60 |
| 43 | **B6 Opus 5 + cache $3.60/฿121** | Nick | ⚠️ **คลาด 7% → $3.85/฿130** |
| 44 | worklog 95 entries / ไม่มีฟิลด์ token | Nick | ✅ VERIFIED |
| 45 | template-library.csv ว่างเปล่า (0 listing) | Nick | ✅ VERIFIED |
| 46 | deliverable มิ.ย. 29 / ก.ค. 42 | Nick | ✅ VERIFIED |
| 47 | quotations.json: 1,666 ใบ, 195 ลูกค้า, ไม่มีฟิลด์ผลลัพธ์, 52 ใบสถาบัน, 10 ราย, mean ฿68,507, median ฿14,766 | Nick | ⚠️ **UNVERIFIED-BY-REESE (สิทธิ์เข้าถึงถูกบล็อก)** |
| 48 | Fastwork ฿800 / แบบสอบถาม ฿300 | Nick | ⚠️ UNVERIFIED (แหล่งอ่อน — Nick flag เอง) |
| 49 | "ไม่พบราคาบริษัทวิจัยตลาดที่ยืนยันได้" | Nick | ✅ การรายงานว่าหาไม่เจอ = ถูกต้อง |
| 50 | **ไม่มี benchmark ความแม่นของ MiroFish** | Dale ⚪, Nick, Minnie | ✅ **VERIFIED — ผมหาไม่เจอเช่นกัน** |
| 51 | สมมติฐาน idea card #01–#06 | Minnie | 💬 OPINION (ผ่าน) |
| 52 | X1/X2/X3/X4 (ไอเดียที่ไม่คุ้ม) | Minnie | 💬 OPINION (ผ่าน) |
| 53 | **#01 "เรามีข้อมูลเฉลยอยู่แล้ว"** | Minnie | ⚠️ **UNVERIFIED — Nick หักล้าง ผมยืนยันเองไม่ได้** |
| 54 | X3 "upstream อายุไม่ถึงครึ่งปี" | Minnie | ⚠️ คลาด → 8 เดือน |
| 55 | X3 "stack ไม่ตรงกับ Vite+React+Firebase" | Minnie | ✅ VERIFIED |
| 56 | #06 "agent จำอะไรไม่ได้" | Minnie | ✅ VERIFIED |

**รวม:** ✅ VERIFIED **34** · ❌ INCORRECT **4** · ⚠️ UNVERIFIED/คลาด **11** · 💬 OPINION **7**

---

# D. คำตอบต่อคำถามที่ทีมฝากไว้ให้ Reese

Dale ฝาก 5 ข้อในหัวข้อ "📌 ส่งต่อทีม → Reese" — ตอบตามที่ตรวจได้:

| # | คำถามของ Dale | คำตอบ |
|---|---|---|
| 1 | ดาว 69.7k ถูก / 42k ผิด — ยืนยันไหม | ✅ **ยืนยัน** 69,732 ณ 31 ก.ค. 2026 (GitHub API) — **42k ผิด/เก่า** |
| 2 | อันดับ 1 Trending 7 มี.ค. 2026 | ✅ **ยืนยันวันที่ตรงเป๊ะ** (TMTPost + 解放日报: "3月7日") — แต่เป็นหลักฐานสื่อรอง ไม่ใช่ archive ของ GitHub |
| 3 | ข้ออ้าง "จูนตามพฤติกรรม/timezone จีน" | ✅ **ยืนยันว่าไม่มีหลักฐาน** — grep README + README-ZH = 0 hit · `locale.py` เป็น i18n ของ UI จริงตามที่คุณวิเคราะห์ |
| 4 | license ของ OASIS / camel-ai | ⚠️ **ยังไม่ได้ตรวจ** — อยู่นอกขอบเขต fact-check รอบนี้ (เป็น research question) **ควรมอบหมายเป็นงานแยกถ้าจะพิจารณาทางเลือกแทน MiroFish** |
| 5 | Zep: training / retention / region | ✅ **ยืนยันว่าหาไม่เจอจริงทั้ง 3 เรื่อง** — ตรวจซ้ำ security-compliance + FAQ แล้ว ไม่มีระบุ **→ ข้อสรุป A2 ของคุณไม่ต้องแก้** |

---

# E. ข้อเสนอลำดับถัดไป (สำหรับ Claudy)

## 1️⃣ รอบแก้ -v2 (ทั้ง 3 คน) — ทำได้ทันที

| Agent | จำนวนจุด | ระดับความยาก |
|---|---|---|
| Minnie | 4 จุด | 🟢 แก้ข้อความล้วน ~15 นาที |
| Dale | 2 จุด (+2 optional) | 🟢 แก้ข้อความล้วน ~10 นาที |
| Nick | 4 จุด | 🟡 ต้องคำนวณใหม่ 2 บรรทัด ~30 นาที |

**ตามกฎ fact-check-gate:** แก้เสร็จ → **fact-check ใหม่ทั้งรอบ ไม่ตรวจเฉพาะจุดแก้**
รอบนี้เป็นรอบที่ 1 (โควตา 3 รอบ)

## 2️⃣ ⛔ สิ่งที่ผมทำให้ไม่ได้และต้องมีคนอื่นทำ

**ยืนยันตัวเลขจาก `quotations.json` 1 ครั้ง** — เป็นข้อชี้ขาดทั้งสปรินต์ (Minnie บอกมี, Nick บอกไม่มี)
สิทธิ์เข้าถึงของผมถูกบล็อกเพราะเป็นข้อมูลลูกค้าจริงนอก repo — **ผมไม่เลี่ยงข้อจำกัดนี้**
→ ต้องให้ **Kittanate หรือ Dale ที่มีสิทธิ์** รันคำสั่งที่ Nick เขียนไว้แล้ววางผลกลับมา

## 3️⃣ 💡 ข้อสังเกตเชิงระบบ (นอกเหนือจาก fact-check)

**สิ่งที่ผลตรวจนี้ยืนยันโดยไม่ได้ตั้งใจ:** ใบ #04 ของ Minnie (MiroFish เป็นหัวข้อคอนเทนต์) มีฐานแข็งกว่าที่เธอคิด
รอบนี้เจอ **จุดที่สื่อรายงานผิดหรือขัดกันเอง 5 จุด**:
1. ดาว 42k vs 69.7k
2. อายุ 20 vs 22
3. FastAPI vs Flask (**ยังไม่มีสื่อไทยเจ้าไหนจับได้**)
4. Python 3.10+ vs 3.11–3.12
5. timeline "24 ชม. หลังขึ้นอันดับ 1" ที่จริงคือ 3 เดือน**ก่อน**ขึ้นอันดับ 1

Minnie เขียนไว้เองว่า *"ประเด็นไหนที่สื่อไทยรายงานผิดหรือขัดกันเอง — **จุดนั้นคือมูลค่าทั้งหมดของบทความเรา** ถ้าไม่มีใครรายงานผิดเลย บทความนี้ก็ไม่มีเหตุผลจะมีอยู่"
→ **มี 5 จุด ทุกจุดตรวจย้อนได้จากหลักฐานปฐมภูมิ** — เงื่อนไขที่เธอตั้งไว้ผ่านแล้ว

---

**สถานะเอกสาร:** ✅ Fact-check เสร็จสมบูรณ์ (รอบที่ 1)
**ส่งต่อ:** Minnie · Dale · Nick (แก้เป็น -v2) → Reese fact-check รอบ 2 → Chris QA
**ผู้ตรวจ:** Reese [Fact-check] · 31 ก.ค. 2026
