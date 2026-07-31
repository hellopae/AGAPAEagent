# MiroFish × TANAPAT — Technical Feasibility Assessment
**โดย Dale (DevOps & Technical) | 30 ก.ค. 2026 | ขั้นที่ 2 ของ Research Sprint (SOP-05)**

---

## ชั้นความเชื่อถือของข้อมูลในเอกสารนี้

| สัญลักษณ์ | ความหมาย |
|---|---|
| ✅ **ยืนยันแล้ว** | อ่านจากของจริง — LICENSE / ซอร์สโค้ดใน repo / เอกสารผู้ให้บริการ / รันคำสั่งบนเครื่อง Kittanate |
| 🟡 **แนวโน้ม** | อ่านจากเอกสารทางการแต่ไม่ครบทุกมุม หรือเป็นการตีความ license ตามตัวบทที่อ่านแล้ว |
| ⚪ **ยังยืนยันไม่ได้** | หาไม่เจอในแหล่งสาธารณะ — **ห้ามเอาไปใช้ตัดสินใจ** |

ทุกอย่างที่มาร์ก ✅ ผมอ่านของจริงวันนี้ ไม่ได้ตอบจากความจำ
สิ่งที่ตอบไม่ได้ผมเขียนว่าตอบไม่ได้ ไม่เดาแทน

> ⚖️ **ข้อสงวนสำคัญ:** ผมเป็นวิศวกร ไม่ใช่นักกฎหมาย ส่วน AGPL ข้างล่างคือการอ่านตัวบท
> license จริงบรรทัดต่อบรรทัด ใช้เป็นฐานตัดสินใจทางเทคนิคได้ แต่ถ้าจะทำกรณี (ค)
> (เปิดเป็นบริการให้ลูกค้า) จริง **ต้องให้ทนายดูก่อน** ไม่ใช่เชื่อเอกสารนี้

---

# 🚦 สรุปผู้บริหาร (อ่านแค่นี้ก็ตัดสินใจได้)

| คำถามของ Kittanate | คำตอบ |
|---|---|
| **ติดตั้ง MiroFish ได้ไหม** | ได้ทางเทคนิค แต่ **ผมไม่แนะนำ** — ไม่ใช่เพราะ AGPL แต่เพราะ **Zep Cloud** |
| **AGPL เป็น blocker ไหม** | ❌ **ไม่ใช่ blocker** สำหรับกรณี (ก) และ (ข) · เป็น blocker จริงเฉพาะกรณี (ค) |
| **แล้วอะไรคือ blocker จริง** | ✅ **Zep Cloud บังคับใช้ด้วยโค้ด ปิดไม่ได้ ไม่มี self-host** — ไฟล์งานลูกค้าต้องออกนอกประเทศ |
| **ควรลองสายไหน** | **สาย (ข) เท่านั้น** — persona panel ด้วย agent ที่มีอยู่ ไม่แตะ MiroFish เลย |
| **แรงงานเท่าไร** | สาย (ข) แบบเบา **2–3 ชม.** · Reaction Gate **4–6 ชม.** · memory recall **3–4 ชม.** |
| **สาย (ก) ทั้งสาย** | **ไม่ทำ** จนกว่าสาย (ข) จะ backtest ผ่าน — และถ้าผ่านก็ยังไม่จำเป็นต้องใช้ MiroFish |

**ประโยคเดียว:** ปัญหาของ MiroFish กับเราไม่ใช่เรื่องลิขสิทธิ์ — เป็นเรื่องที่มันบังคับให้
**เอกสารลูกค้าสถาบันของเราขึ้น cloud ของบริษัทอเมริกันที่ไม่เปิดเผยว่าเก็บข้อมูลไว้ประเทศไหน**
และมันไม่ยอมให้ปิดฟีเจอร์นั้น เขียนล็อกไว้ในโค้ดตรง ๆ

---

# A. BLOCKER — ต้องเคลียร์ก่อน

## A1. AGPL-3.0 กระทบยังไง — แยก 3 กรณี

**สิ่งที่ผมอ่าน:** `https://raw.githubusercontent.com/666ghj/MiroFish/main/LICENSE`
ทั้งไฟล์ + ยืนยันจาก GitHub API

✅ **ยืนยันแล้ว — license คืออะไร**
- GitHub API: `"spdx_id": "AGPL-3.0"`, `"name": "GNU Affero General Public License v3.0"`
- หัวไฟล์ LICENSE: `GNU AFFERO GENERAL PUBLIC LICENSE, Version 3, 19 November 2007`
- `backend/pyproject.toml`: `license = { text = "AGPL-3.0" }`
→ ไม่มีข้อสงสัย เป็น AGPL-3.0 จริง

### ตัวบทที่ใช้ตัดสิน (คัดมาตรงตัว ไม่แปล ไม่ตัดต่อ)

**§2 Basic Permissions** (บรรทัด 142–150 ของ LICENSE):
> "This License explicitly affirms your **unlimited permission to run the unmodified
> Program**. The output from running a covered work is covered by this License **only if
> the output, given its content, constitutes a covered work**."

**§0 นิยาม "propagate"** (บรรทัด 80–85):
> "To 'propagate' a work means to do anything with it that, without permission, would make
> you directly or secondarily liable for infringement under applicable copyright law,
> **except executing it on a computer or modifying a private copy**."

**§0 นิยาม "convey"** (บรรทัด 87–88):
> "To 'convey' a work means any kind of propagation that enables other parties to make or
> receive copies. **Mere interaction with a user through a computer network, with no
> transfer of a copy, is not conveying.**"

**§13 Remote Network Interaction** — ข้อที่คนกลัวกันที่สุด:
> "**If you modify the Program**, your modified version must prominently offer all users
> interacting with it remotely through a computer network (if your version supports such
> interaction) an opportunity to receive the Corresponding Source of your version by
> providing access to the Corresponding Source from a network server at no charge..."

**§5 Conveying Modified Source Versions** — เงื่อนไข (ก)–(ง) ที่สำคัญคือ (ค):
> licensee ต้อง "license the entire work, as a whole, under this License to anyone who
> comes into possession of a copy"

---

### 🟡 กรณี (ก) — ใช้ภายในบริษัทอย่างเดียว

**คำตอบ: ปลอดภัย ไม่มีภาระอะไรเลย — แม้จะแก้โค้ดก็ได้**

เหตุผลจากตัวบทตรง ๆ:
1. §2 บอกชัดว่า "unlimited permission to **run** the unmodified Program"
2. §0 ตัด "executing it on a computer or **modifying a private copy**" ออกจากนิยาม
   propagate → การรันและการแก้สำเนาส่วนตัว **ไม่ใช่ propagation** ตั้งแต่ต้น
3. §13 ผูกเงื่อนไขไว้กับ "If you modify the Program" **และ** "users interacting with it
   remotely through a computer network" — ถ้าไม่มีใครนอกบริษัทต่อเข้ามา ก็ไม่ trigger

**ข้อควรระวังเดียว:** พนักงาน TANAPAT ใช้กันเองในเครือข่ายบริษัท = ยังถือว่าอยู่ในองค์กร
เดียวกัน ไม่ใช่ "conveying to others" — 🟡 นี่เป็นการตีความมาตรฐาน แต่ไม่ใช่ข้อความ
ที่เขียนตรงตัวใน license ถ้าอนาคตจะให้บริษัทในเครือ/พาร์ตเนอร์ใช้ ต้องทบทวนใหม่

**สรุป: 🟢 ทำได้ ไม่ต้องเปิด source ไม่ต้องแจ้งใคร**

---

### 🟡 กรณี (ข) — เอา output ไปขาย

**คำตอบ: ทำได้ AGPL ไม่แตะ output — นี่ไม่ใช่ประเด็นเลย**

§2 เขียนไว้ตรงตัว: output ถูกคุมโดย license นี้ **"only if the output, given its content,
constitutes a covered work"** — คือ output จะติด AGPL ก็เฉพาะเมื่อตัว output เองเป็น
งานที่ derive จากโค้ด (เช่น ถ้ามันคายซอร์สโค้ดของ MiroFish ออกมา)

รายงาน simulation, กราฟ, ข้อสรุปว่ากรรมการจะค้านข้อไหน — เป็น**ข้อมูลที่เราสร้าง**
ไม่ใช่งาน derivative ของโค้ด Python

**เทียบให้เห็นภาพ:** เหมือนใช้ GIMP (GPL) ออกแบบใบปลิวแล้วขายใบปลิว — GPL ไม่ได้
claim สิทธิ์ในใบปลิว

**สรุป: 🟢 ขาย output ได้ ไม่มีเงื่อนไข**
⚪ *แต่* คำถามว่า output จะมี**คุณค่าพอให้ขายได้จริงไหม** ไม่ใช่คำถาม license
เป็นคำถามของ Nick + การ backtest — ตอบไม่ได้ในเอกสารนี้

---

### 🔴 กรณี (ค) — เปิดเป็นบริการให้ลูกค้าใช้ผ่านเว็บ

**คำตอบ: นี่คือกรณีที่ AGPL กัดจริง — และกัดหนัก**

แยก 2 ทางย่อย เพราะผลต่างกันมาก:

| | ทำอะไร | ผลตาม §13 |
|---|---|---|
| **(ค-1)** | เอา MiroFish **ไม่แก้อะไรเลย** ขึ้นเว็บให้ลูกค้าใช้ | 🟡 §13 ผูกกับ "If you modify" — ถ้าไม่แก้เลย ตามตัวอักษรไม่ trigger **แต่ในทางปฏิบัติเป็นไปไม่ได้** (ดูข้างล่าง) |
| **(ค-2)** | แก้อะไรก็ตาม (แปลไทย, เปลี่ยน persona, เปลี่ยน UI, ต่อ Firestore, ใส่โลโก้) แล้วขึ้นเว็บ | 🔴 **trigger เต็ม** — ต้องเสนอ Corresponding Source ให้ผู้ใช้ทุกคน ฟรี ผ่าน network server + §5(ค) บังคับ license งานทั้งชิ้นเป็น AGPL |

**ทำไม (ค-1) เป็นไปไม่ได้ในทางปฏิบัติ 3 ข้อ:**
1. เราต้องแปลไทย ต้องเปลี่ยน persona จากจีนเป็นไทย ต้องใส่ branding = **แก้แน่นอน**
2. "modify" ใน §0 กว้างมาก: "copy from or **adapt all or part** of the work in a fashion
   requiring copyright permission, other than the making of an exact copy" — เปลี่ยน
   ไฟล์เดียวก็เข้าข่าย
3. ✅ ต่อให้ไม่แก้เลย ก็ยังชนเรื่อง Zep Cloud (A2) อยู่ดี — ปิดทางซ้ำ

**"งานทั้งชิ้น" กว้างแค่ไหน — นี่คือส่วนที่กระทบโมเดลธุรกิจตรง ๆ:**
§5(ค) บอกให้ license **"the entire work, as a whole"** — ถ้าเราเอา MiroFish ไปฝังใน
web app ของ TANAPAT (React + Firebase ของเรา) แล้วเปิดให้ลูกค้าใช้ 🟡 มีความเสี่ยงสูง
ที่จะถูกตีความว่า web app ทั้งตัวคือ "งานชิ้นเดียวกัน" → **ต้องเปิด source เว็บของเราด้วย**
เส้นแบ่งระหว่าง "งานชิ้นเดียว" กับ "แค่ aggregate มาอยู่ด้วยกัน" เป็นประเด็นที่
**ต้องให้ทนายตัดสิน ไม่ใช่ผม**

**สรุป: 🔴 ห้ามทำ** — สอดคล้องกับที่ Minnie ตัด X2 ทิ้งไปแล้ว
ถ้าอยากขายบริการจำลองสังคมจริง ๆ ต้องเขียนเองจากศูนย์ หรือใช้ของที่ license เป็นมิตร
(OASIS/camel-ai ต้องเช็ค license แยก — **ให้ Reese ตรวจ ผมไม่ได้ตรวจข้อนี้**)

---

### 📋 ตารางสรุป AGPL — ติดไว้ข้างฝา

| กรณี | เปิด source ไหม | ทำได้ไหม | ระดับ |
|---|---|---|---|
| (ก) ใช้ในบริษัท (แก้โค้ดได้) | ไม่ต้อง | ✅ ได้ | 🟡 |
| (ข) ขาย output / รายงาน | ไม่ต้อง | ✅ ได้ | 🟡 |
| (ค-1) ขึ้นเว็บ ไม่แก้เลย | ตามตัวบทไม่ต้อง | ⚠️ ทำไม่ได้จริง | 🟡 |
| (ค-2) ขึ้นเว็บ แก้แล้ว | **ต้อง ทั้งชิ้น** | 🔴 ไม่ควร | 🟡 |

**คำตัดสินสำหรับ blocker ข้อนี้: เคลียร์แล้ว AGPL ไม่ห้ามเราทดลองภายใน**
Minnie เขียนไว้ว่า "ห้ามติดตั้งก่อน Dale ตอบ AGPL" — ตอบแล้ว **แต่ให้ดู A2 ก่อนติดตั้ง**
เพราะ blocker จริงอยู่ที่นั่น

---

## A2. Zep Cloud — 🔴 นี่คือ blocker ตัวจริง

### ✅ ยืนยันแล้ว: Zep เป็นข้อบังคับ ปิดไม่ได้ — และโค้ดปฏิเสธ self-host แบบชัดเจน

จาก `backend/app/config.py` ฟังก์ชัน `validate()` — **นี่คือหลักฐานชิ้นสำคัญที่สุด
ในเอกสารนี้ทั้งฉบับ:**

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

บรรทัดสุดท้ายแปลว่า: **"ZEP_API_URL ไม่รองรับ — MiroFish เชื่อมต่อ Zep Cloud เท่านั้น"**

นี่ไม่ใช่ค่าเริ่มต้นที่เปลี่ยนได้ ไม่ใช่ข้อจำกัดที่บังเอิญ — **ผู้พัฒนาตั้งใจเขียนโค้ด
เพื่อปฏิเสธการชี้ไปที่ Zep ที่เราโฮสต์เอง** ถ้าเราตั้ง `ZEP_API_URL` มันจะ error ทิ้ง

ตอกย้ำอีกชั้นจาก `backend/app/utils/zep.py`:
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
hard-code ไว้ในโค้ด ไม่ได้อ่านจาก env — และคอมเมนต์ของผู้พัฒนาเองเขียนตรง ๆ ว่า
**ตั้งใจปฏิเสธ self-hosted endpoint** ไม่ใช่ผลข้างเคียง (เพิ่มหลักฐานชิ้นนี้ตามที่ Reese ชี้ 31 ก.ค. 2026)

✅ ยิ่งกว่านั้น Zep ไม่ใช่ของประกอบ — มันคือกระดูกสันหลัง จาก tree ของ repo มี
**16 ไฟล์ที่มีคำว่า `zep`** ใน `backend/` (services 3 + utils 3 + scripts 1 + tests 9 —
`zep_tools.py`, `zep_graph_memory_updater.py`, `zep_entity_reader.py`, `zep_lifecycle.py`,
`zep_paging.py` และ test 9 ไฟล์ รวมถึง `test_zep_simulation_barrier.py` และ
`test_zep_report_barrier.py` — ชื่อ "barrier" บอกว่า simulation กับ report
**รอ Zep ให้เสร็จก่อน** ถึงจะเดินต่อ)
*(แก้จาก 13 → 16 ตามที่ Reese นับซ้ำจาก git tree — ผมนับต่ำไป 3 ไฟล์)*

→ **ถอด Zep ออกไม่ได้ ต้อง fork แล้วเขียน memory layer ใหม่ทั้งชั้น** = X3 ที่ Minnie
ตัดทิ้งไปแล้ว + ทำ fork แล้วเปิดเว็บ = กลับไปชน AGPL §13 พอดี **ตันทุกทาง**

### ข้อมูลไปอยู่ที่ไหน

| ประเด็น | สถานะ | หลักฐาน |
|---|---|---|
| ผู้ให้บริการ | ✅ Zep AI Inc. (บริษัทอเมริกัน, ผ่าน Y Combinator) | getzep.com, ycombinator.com/companies/zep-ai |
| cloud ที่ใช้ | 🟡 น่าจะ AWS | หน้า Security ระบุ BYOK ผ่าน "your own **AWS KMS** Customer Master Key" → ชี้ว่าโฮสต์บน AWS |
| **region / ประเทศ** | ⚪ **หาไม่เจอ** | help.getzep.com/security-compliance ไม่ระบุ cloud provider, region, หรือประเทศเลย |
| SOC 2 | ✅ Type II | "SOC 2 Type II Certified — Zep maintains SOC 2 Type II certification" |
| HIPAA | ✅ BAA มี แต่เฉพาะ Enterprise | "Business Associate Agreements available for Enterprise customers" |
| encryption at rest ด้วย key ของเรา | ✅ มี (BYOK) | "Encrypt data at rest using your own AWS KMS Customer Master Key" + "the ability to revoke access" |
| **เอาข้อมูลไป train model ไหม** | ⚪ **หาไม่เจอในเอกสารสาธารณะ** | privacy policy หา URL ที่ใช้ได้ไม่เจอ (404 ทั้ง getzep.com/privacy และ help.getzep.com/legal/privacy-policy) |
| data retention / ลบข้อมูล | ⚪ **หาไม่เจอ** | FAQ ไม่พูดถึง |

### self-host / OSS edition มีไหม

| ตัวเลือก | สถานะ | License | หมายเหตุ |
|---|---|---|---|
| **Zep Community Edition** (self-host) | ❌ **เลิกแล้ว เม.ย. 2025** | — | เอกสาร Zep เอง: "Zep Community Edition, which allows you to host Zep locally, **is deprecated and no longer supported**" |
| **Zep Cloud** | ✅ ใช้ได้ | proprietary | ทางเดียวที่ MiroFish ยอมต่อ |
| **BYOC** (รันใน VPC เราเอง) | 🟡 มี แต่ **Enterprise เท่านั้น** | proprietary | "For enterprise customers who need VPC residency and maximum control" — SME ไทยเข้าไม่ถึงราคาระดับนั้น (⚪ ราคาไม่เปิดเผย) |
| **Graphiti** (graph engine ตัวเปล่า) | ✅ OSS จริง | ✅ **Apache-2.0** | `getzep/graphiti` — 29,373 ดาว, push ล่าสุด 30 ก.ค. 2026 (active) **แต่ MiroFish ต่อไม่ได้** |

✅ Graphiti license = Apache-2.0 (ยืนยันจาก GitHub API) — เป็นมิตรกว่า AGPL มาก
✅ Zep pricing: Free **10,000 credits/เดือน** (2 projects) → Flex $1,250/ปี (50k credits/เดือน)
→ Flex Plus $3,750/ปี (200k credits/เดือน) → Enterprise ต่อรอง
✅ **1 credit ต่อ 1 episode ขนาด ≤350 bytes** (`getzep.com/pricing`) → **Nick ประเมินได้แล้ว:
8,400 credits ต่อ 1 simulation** _(แก้ 31 ก.ค. 2026 ตาม fact-check รอบ 2 — เดิมผมมาร์ก ⚪ ว่า
"ไม่ระบุในหน้า pricing → Nick ประเมินไม่ได้" ซึ่งผิดทั้งข้อ)_

### 🔴 คำตัดสิน: ยอมรับได้ไหมกับงานลูกค้าสถาบัน/ราชการ

**ไม่ได้** — 4 เหตุผลเรียงตามน้ำหนัก:

1. ✅ **ปิดไม่ได้** — โค้ดบังคับ `ZEP_API_KEY` และ**ปฏิเสธ endpoint ของเราเอง**อย่างชัดเจน
   นี่ไม่ใช่ "ตั้งค่าให้ปลอดภัยกว่านี้ได้ไหม" — ตอบว่าไม่ได้ จบ
2. ⚪ **ไม่รู้ว่าข้อมูลอยู่ประเทศไหน** — เอกสารสาธารณะไม่ระบุ region เลย งานราชการไทย
   มักมีเงื่อนไขเรื่องที่ตั้งข้อมูล ตอบลูกค้าไม่ได้ = รับงานไม่ได้
3. ⚪ **ไม่รู้นโยบาย training / retention** — หาไม่เจอ ถ้าลูกค้าถาม เราตอบไม่ได้
4. ✅ **ไฟล์ที่ต้องอัปคือเอกสารงานจริง** — `config.py`: `ALLOWED_EXTENSIONS =
   {'pdf', 'md', 'txt', 'markdown'}`, `MAX_CONTENT_LENGTH = 50MB` และ workflow
   ขั้น 1 คือ Ontology → GraphRAG จากไฟล์ที่อัป **แปลว่าถ้าจะให้มันช่วยเรื่องดีลสถาบันจริง
   ต้องป้อน TOR / ใบเสนอราคา / เอกสารประกวดราคาเข้าไป** = ข้อมูลอ่อนไหวที่สุดที่เรามี

**เชื่อมกับกฎ X4 ของ Minnie:** เธอเขียนว่า "ถ้าไฟล์หลุดออกไปคือจบความสัมพันธ์ 40 ปี"
ถูกต้อง — และสถาปัตยกรรมของ MiroFish **บังคับให้ไฟล์ออกนอก** ไม่มีทางเลือก
ความเสี่ยงนี้ไม่ได้สมดุลกับผลตอบแทนที่ยังไม่มี benchmark ยืนยันเลยแม้แต่ตัวเดียว

### ทางเลือกที่เบากว่า — เทียบ 3 ทางตามที่ Minnie ขอ (idea #06)

| ทาง | ต้นทุน/เดือน | ต้องดูแลอะไร | ข้อมูลอยู่ไหน | ✅/🟡 | คำตัดสิน |
|---|---|---|---|---|---|
| **Zep Cloud** | ⚪ Free 10k credits → $104/เดือน+ | ไม่ต้องดูแล | ⚪ ไม่รู้ (US?) | ✅ ราคา / ⚪ region | ❌ **ไม่** — ข้อมูลออกนอก |
| **Graphiti (self-host)** | ค่า DB + embedding | ✅ **ต้องมี graph DB: Neo4j 5.26 / FalkorDB 1.1.2 / Amazon Neptune** (Kuzu deprecated แล้ว) + Python 3.10+ + embedding provider | ในเครื่องเรา | ✅ | ❌ **ไม่** — เอา DB มาดูแลเพิ่ม 1 ตัวเพื่อ corpus ขนาดไม่กี่ร้อย KB ไม่คุ้ม + Graphiti README เตือนว่า "works best with LLM services that support Structured Output... **Using other services may result in incorrect output schemas and ingestion failures**" |
| **Postgres + pgvector** | ค่า hosting | Postgres 1 ตัว + embedding | ในเครื่องเรา/VPS | 🟡 | ⏸️ **ยังไม่ต้อง** — ตรง target stack ของ TANAPAT พอดี เก็บไว้ทำตอนย้าย stack จริง |
| **Firestore + embedding** | ~ฟรีที่ปริมาณเรา | ✅ เรามี project `agapae-studio` อยู่แล้ว | Firestore | 🟡 | ⏸️ **ยังไม่ต้อง** — hook เขียนผ่าน REST + API key อยู่ ถ้าจะทำ vector search ต้องเปลี่ยนเป็น SDK + สร้าง index = งานจริง |
| **⭐ grep + ไฟล์ที่มีอยู่** | **0 บาท** | **ไม่มีอะไรเพิ่ม** | ในเครื่องเรา | ✅ | ✅ **เอาอันนี้** — ดูเหตุผลที่ B5 |

**คำตัดสินข้อนี้: ที่ขนาดงานของเราวันนี้ ทั้ง 4 ทางแรกคือการแก้ปัญหาที่เรายังไม่มี**
รายละเอียดตัวเลขอยู่ที่ B5

---

# B. ความเป็นไปได้จริง

## B3. รันบนเครื่อง Kittanate ได้ไหม

✅ **รันคำสั่งจริงบนเครื่องวันนี้** (`sw_vers`, `uname -m`, `node -v`, `python3 -V`,
`which docker`, `uv --version`, `sysctl hw.memsize hw.ncpu`, `df -h`)

### สเปกเครื่องจริง

| รายการ | ค่าจริง |
|---|---|
| OS | macOS **15.3.1** (Darwin 24.3.0) build 24D70 |
| CPU | **x86_64 — Intel ไม่ใช่ Apple Silicon** · 16 logical cores |
| RAM | **16 GB** (17,179,869,184 bytes) |
| Disk ว่าง | 728 GB — เหลือเฟือ |

### requirement vs ของที่มี

| ต้องมี | เวอร์ชันที่ต้องการ | มีอยู่ | สถานะ |
|---|---|---|---|
| Node.js | 18+ | **v25.8.2** | ✅ ผ่าน |
| npm | (มากับ Node) | 11.11.1 | ✅ ผ่าน |
| Python | ✅ `requires-python = ">=3.11,<3.13"` | **3.13.3** | ❌ **ตกสเปก — 3.13 ไม่รองรับ** |
| Python 3.11 / 3.12 | — | ไม่มีทั้งคู่ | ❌ ไม่มี |
| uv | latest | **0.11.8** | ✅ ผ่าน — **และตัวนี้แก้ปัญหา Python ได้** |
| Docker | ต้องมีถ้าใช้ compose | **ไม่ได้ติดตั้ง** | ❌ ไม่มี (มี Homebrew ที่ `/usr/local/bin/brew`) |

**ประเด็น Python ✅:** `pyproject.toml` เขียน `requires-python = ">=3.11,<3.13"` ชัดเจน
เครื่องมี 3.13.3 = **นอกช่วง** ถ้ารัน `uv sync` ตรง ๆ จะไม่ผ่าน
**แก้ได้ไม่ยาก** — uv 0.11.8 ติดตั้งอยู่แล้ว สั่ง `uv python install 3.12` แล้ว uv จะ pin
ให้เอง ไม่กระทบ Python ระบบ **ไม่ใช่ blocker**

**ประเด็น Docker ✅:** ไม่มี Docker เลย ถ้าจะใช้ `docker compose up -d` ต้องลง
Docker Desktop ก่อน — บน Intel Mac 16 GB นี่หนักพอควร (Docker Desktop กิน RAM
หลาย GB ตลอดเวลา) เครื่องนี้ใช้ทำงาน design/dev อยู่แล้ว

✅ **ข่าวดี:** `.github/workflows/docker-image.yml` build `platforms: linux/amd64,linux/arm64`
และมี image พร้อมใช้ `ghcr.io/666ghj/mirofish:latest` → **ไม่ต้อง build เอง** และ amd64
ตรงกับ Intel Mac พอดี (ถ้าเป็น Apple Silicon จะช้ากว่าเพราะ emulate)

✅ **มี 2 ทางติดตั้ง:**
- **Docker:** `docker compose up -d` — pull image สำเร็จรูป, expose port 3000 (frontend)
  + 5001 (backend), mount `./backend/uploads`
- **Native:** `cp .env.example .env` → `npm run setup:all` → `npm run dev` → เปิด
  `localhost:3000` (ต้อง pin Python 3.12 ด้วย uv ก่อน)

**สรุป B3: ✅ ติดตั้งได้ ใช้เวลา 2–4 ชม. (รวมลง Docker Desktop + pin Python)**
**แต่ผมไม่แนะนำให้ทำ** ด้วยเหตุผลข้อ A2 ไม่ใช่เหตุผลข้อนี้ — ความยากทางเทคนิคไม่ใช่ปัญหา

### ต้องสมัคร API อะไรบ้าง

✅ จาก `.env.example` (อ่านตรงจาก repo):

| ตัวแปร | จำเป็น? | ค่าเริ่มต้น |
|---|---|---|
| `LLM_API_KEY` | ✅ บังคับ | `your_api_key_here` |
| `LLM_BASE_URL` | ✅ บังคับ | `https://dashscope.aliyuncs.com/compatible-mode/v1` (Alibaba Bailian) |
| `LLM_MODEL_NAME` | ✅ บังคับ | `qwen-plus` (comment: "推荐使用阿里百炼平台qwen-plus模型") |
| `ZEP_API_KEY` | ✅ **บังคับ** | `your_zep_api_key_here` |
| `LLM_BOOST_API_KEY` / `_BASE_URL` / `_MODEL_NAME` | ⬜ ไม่บังคับ | comment ระบุ "如果不使用加速配置，env文件中就不要出现下面的配置项" = ถ้าไม่ใช้ **ห้ามใส่ลงไฟล์** |

→ **สมัคร 2 บัญชี: LLM provider (1) + Zep Cloud (1)**
บัญชี Zep คือตัวที่ทำให้ตกข้อ A2 — และหลีกเลี่ยงไม่ได้

### ใช้ Claude ที่เรามีอยู่แทน Qwen ได้ไหม — ✅ ได้ แต่มีกับดัก

**✅ ยืนยัน 2 ฝั่ง:**

**ฝั่ง MiroFish** — `config.py`:
```python
LLM_BASE_URL = os.environ.get('LLM_BASE_URL', 'https://api.openai.com/v1')
LLM_MODEL_NAME = os.environ.get('LLM_MODEL_NAME', 'gpt-4o-mini')
```
ใช้ `openai>=1.0.0` SDK ตรง ๆ + README: "supports any LLM API with OpenAI SDK format"
→ เปลี่ยน base_url ได้อิสระ ไม่ผูกกับ Alibaba

**ฝั่ง Anthropic** — มี OpenAI SDK compatibility layer จริง (อ่านจาก
`platform.claude.com/docs/en/api/openai-sdk`):
```env
LLM_API_KEY=<Claude API key>
LLM_BASE_URL=https://api.anthropic.com/v1/
LLM_MODEL_NAME=claude-sonnet-5
```
→ **ทางเทคนิคเสียบได้เลย 3 บรรทัด ไม่ต้องแก้โค้ด MiroFish**

### 🔴 แต่มี 3 กับดักที่ต้องรู้ก่อน — ข้อ 2 คือของจริง

**1. ✅ Anthropic บอกเองว่าไม่ใช่ของสำหรับ production**
> "This compatibility layer is **primarily intended to test and compare model capabilities,
> and is not considered a long-term or production-ready solution for most use cases**."

**2. 🔴 `response_format` ถูก "Ignored" — และ MiroFish พึ่ง JSON mode อยู่**

นี่คือกับดักที่คนจะพลาด ผมไล่โค้ดจนเจอ:

เอกสาร Anthropic ตาราง request fields: `response_format` → **"Ignored"**
คือ **ไม่ error แค่เมินเฉย ๆ**

แต่ `backend/app/utils/llm_client.py` ฟังก์ชัน `chat_json()` ทำแบบนี้:
```python
response_format: Optional[Dict[str, str]] = {"type": "json_object"}
...
except Exception as error:
    if (response_format is not None and _is_response_format_unsupported(error)):
        logger.warning("LLM provider explicitly rejected response_format; "
                       "retrying once with prompt-only JSON guidance")
        response_format = None
        continue
```

**MiroFish มีทางถอย — แต่ทางถอยนั้นจะไม่ทำงานกับ Claude compat layer**
เพราะโค้ดรอ **exception** (`_is_response_format_unsupported(error)`) แต่ Anthropic
**ไม่ throw** มันเมินเงียบ ๆ → เงื่อนไขไม่เข้า → ไม่มีการ downgrade ไป prompt-only

ซ้ำร้าย `chat_json` default `max_attempts: int = 1` → **ถ้า JSON เพี้ยนรอบเดียวก็
`LLMResponseError` ทันที ไม่ retry** (มี `test_llm_json_responses.py` ใน repo = ทีมเขา
รู้ว่านี่เป็นจุดเปราะ)

**ผลจริง:** ใช้ Claude ผ่าน compat layer → JSON schema ไม่ถูกการันตี → มีโอกาสพัง
กลางทาง simulation แบบ**หาสาเหตุยาก** (log บอกว่า JSON ใช้ไม่ได้ ไม่บอกว่าเพราะ
response_format ถูกเมิน) ⚪ ความถี่ที่จะพังจริง **ผมยังไม่ได้ทดสอบ ตอบไม่ได้**

**3. 🟡 ข้อจำกัดอื่นที่กระทบต้นทุน/พฤติกรรม** (จากตารางเดียวกัน)

| field | สถานะ | ผลกับเรา |
|---|---|---|
| **prompt caching** | ❌ ไม่รองรับผ่าน compat layer | 🔴 **สำคัญกับ Nick** — simulation ยิงซ้ำหลายร้อยครั้งด้วย system prompt เดิม ปกติ cache ลดได้ถึง ~90% ของ input ที่ cache ได้ · ผ่าน compat layer = **จ่ายเต็มทุกครั้ง** |
| `strict` (tool calling) | Ignored | tool JSON ไม่การันตีตาม schema |
| `temperature` | รับ 0–1 เท่านั้น (>1 ถูก cap ที่ 1) | ✅ MiroFish ส่ง 0.3–0.7 → ไม่กระทบ |
| `n` | ต้องเป็น 1 พอดี | ✅ MiroFish ไม่ใช้ |
| `seed` | Ignored | ทำ reproducible run ไม่ได้ → **backtest เทียบผลซ้ำยากขึ้น** |
| system/developer messages | ถูกรวบไปต่อกันไว้หัวบทสนทนา (Anthropic รับ system เดียว) | 🟡 พฤติกรรม persona อาจเปลี่ยนจาก Qwen |

**ราคา Claude อ้างอิง** (จาก `claude-api` skill, cache 24 มิ.ย. 2026 — ส่งต่อ Nick):
Opus 5 $5/$25 · **Sonnet 5 $3/$15 (ราคาแนะนำ $2/$10 ถึง 31 ส.ค. 2026)** · Haiku 4.5 $1/$5
(input/output ต่อ 1M tokens)

**สรุปข้อนี้:** ✅ ทำได้ทางเทคนิค · 🟡 ใช้ทดลองสั้น ๆ พอได้ · 🔴 **ไม่เหมาะเป็นทางหลัก**
ถ้าจะรัน MiroFish จริงจัง ควรใช้ provider ที่รองรับ OpenAI API เต็มรูป (รวม
`response_format` + caching) — **ซึ่งเป็นอีกเหตุผลที่สาย (ก) ไม่คุ้ม: เราจะต้องสมัคร
บัญชีที่ 3 ที่ไม่ได้ใช้กับงานอื่นเลย**

---

## B4. สาย (ข) — persona panel โดยไม่แตะ MiroFish

**คำถาม Minnie: "ทำได้เลยไหม หรือต้องมี orchestration แยก"**
**คำตอบ: ทำได้เลย แต่คำตอบต่างกันตามว่าอยากได้แบบไหน — และผมแนะนำแบบที่ถูกที่สุดก่อน**

### ✅ ข้อจำกัดจริงของ Agent tool (ที่ต้องรู้ก่อนออกแบบ)

จาก CLAUDE.md + `.claude/settings.json` + พฤติกรรม Agent tool:
1. **subagent มองไม่เห็นกัน** — แต่ละตัว context แยก ไม่มี shared memory
2. **ไม่มี turn-taking primitive** — Agent tool ไม่มีคอนเซปต์ "รอคนอื่นพูดจบ"
3. **ไม่มี state ข้ามรอบ** — จบ subagent = context หาย
4. ✅ **background เป็นค่าเริ่มต้น** ตั้งแต่ v2.1.198 → งานที่ต้องส่งต่อทันทีต้อง
   `run_in_background: false` (CLAUDE.md ข้อ 3)

→ **ถ้าอยากได้วงถกจริง ต้องให้ parent เป็นคนจัดคิวเอง**: รอบ 1 ยิง N ตัว → เก็บผล →
เอา transcript รอบ 1 ใส่ prompt รอบ 2 → ยิงใหม่ · state = ไฟล์ .md ใน repo
**ทำได้ด้วยของที่มี ไม่ต้องเขียน framework ใหม่** แต่เสียค่า token เพราะต้องส่ง
transcript ทั้งก้อนซ้ำทุกรอบ

### 2 ทางเลือก — เทียบให้เห็นชัด

| | **ทาง A: panel-in-one-prompt** ⭐ | **ทาง B: multi-agent จริง** |
|---|---|---|
| วิธี | subagent **ตัวเดียว** สวม 5–9 persona ใน prompt เดียว เขียนความเห็นทุกคนออกมาในรอบเดียว | subagent **1 ตัว/persona** parent จัดคิว หลายรอบ |
| จำนวน API call | **1** (หรือ 2 ถ้าอยากมีรอบโต้) | **N × รอบ** (5–9 × 2–3 = 10–27) |
| ต้นทุนเทียบกัน | **1×** | **~10–25×** |
| แรงงานสร้าง | **2–3 ชม.** | **1.5–2 วัน** |
| ความเป็นอิสระของความเห็น | 🔴 **จุดอ่อน** — model เดียว context เดียว → ความเห็นมีแนวโน้มไปทางเดียวกัน (correlated) เจอ objection แปลกใหม่น้อยกว่า | ✅ แยก context จริง → ความเห็นหลากหลายกว่า |
| state ข้ามรอบ | ไม่ต้องมี | ต้องเขียนไฟล์เอง |
| worklog spam | ไม่มี | 🟡 ระวัง (ดูข้างล่าง) |

### 🟡 ข้อสังเกตเรื่อง worklog ที่ต้องรู้ก่อนทำทาง B

✅ จาก `hook-status.mjs` บรรทัด 46:
```js
const id = MAP[ev.agent_type || input.subagent_type];
if (!id) process.exit(0);
```
→ **subagent ที่ไม่อยู่ใน `MAP` จะถูกข้ามทั้งหมด** ไม่เขียน status/worklog/Firestore

**นี่เป็นข่าวดี:** ถ้าทาง B รัน persona เป็น `general-purpose` (ไม่อยู่ใน MAP)
→ **ไม่มี worklog spam อัตโนมัติ** ไม่ต้องแก้ hook อะไรเลย
แต่ถ้าเผลอสร้าง agent ใหม่ใส่ MAP แล้วยิง 9 ตัว × 3 รอบ = **27 entry ต่อ 1 งาน**
+ 27 ครั้ง `git commit && git push` (hook-status spawn ทุกครั้งที่ done)
→ dashboard รกและ git history เต็ม **ห้ามใส่ persona ลง MAP**

### ✅ คำแนะนำ: เริ่มทาง A

**เหตุผล:** คำถามใหญ่ของสปรินต์นี้คือ *"persona sim มีสัญญาณจริงหรือเปล่า"*
ทาง A ตอบคำถามนั้นได้ที่ **1/10–1/25 ของต้นทุน** และ **1/5 ของเวลา**
ถ้าทาง A backtest ได้ ≥7/10 (เกณฑ์ Minnie) → ค่อยลงทุนทาง B เพื่อเพิ่มคุณภาพ
ถ้าทาง A ได้ <7/10 → **เราประหยัดเวลาไป 1.5–2 วันเต็ม**

**ข้อควรระวังที่ต้องเขียนไว้ตรง ๆ:** ทาง A มีความเสี่ยงว่า **ถ้าได้ผลแย่ อาจเป็น
เพราะวิธี (correlated opinions) ไม่ใช่เพราะแนวคิดผิด** → ถ้า A ได้ 5–6/10 (คาบเส้น)
ควรลอง B กับ 3–4 เคสก่อนสรุปว่าล้ม **ห้ามตัดสินว่าแนวคิดล้มจากผล A เพียงอย่างเดียว
ถ้าผลอยู่ในช่วงคาบเส้น**

### ประเมินแรงงาน (สาย ข)

| งาน | เวลา | ได้อะไร |
|---|---|---|
| เขียน agent scaffold `panel-sim.md` + prompt template 5–9 persona | 1.5 ชม. | ไฟล์ agent 1 ตัว |
| เขียน output template (objection table + severity) | 0.5 ชม. | รูปแบบผลที่อ่านได้/เทียบได้ |
| ทดลอง 1 เคส + ปรับ prompt | 1 ชม. | รู้ว่า output ใช้งานได้ไหม |
| **รวมทาง A** | **✅ 2–3 ชม.** | พร้อม backtest |
| backtest 10 เคส (ฝั่ง Dale — **รอ Nick ส่งข้อมูลดีลเก่าก่อน**) | 4–6 ชม. | ตัวเลขตัดสินใจ |
| **ยกระดับเป็นทาง B ถ้าผ่าน** | +1.5–2 วัน | orchestration + state ข้ามรอบ |

⚠️ **dependency:** backtest ทำไม่ได้ถ้า Nick ตอบว่าข้อมูลดีลเก่าไม่พอ — งาน 4–6 ชม.
นี้ **บล็อกอยู่ที่ Nick** ไม่ใช่ที่ผม

---

## B5. Reaction Gate (idea #05) — ทำเป็น advisory only ได้จริงไหม

### ✅ ได้จริง — และกลไกมีอยู่ในโค้ดแล้ว ไม่ต้องออกแบบใหม่

Minnie ตั้งเงื่อนไข "ห้าม veto" ✅ ผมอ่าน `hook-gate.mjs` แล้ว **มี 2 ช่องทางแยกกันชัด
อยู่แล้ว** — นี่คือเหตุผลที่ข้อนี้ทำได้ง่ายกว่าที่คิด:

**ช่องทางที่ block ได้ (`blockers[]`)** — บรรทัด 260–270:
```js
if (blockers.length && st.blocks < MAX_BLOCKS) {
  st.blocks += 1;
  saveState(db, st);
  out({ decision: "block", reason: ... });   // ← บล็อกจบเทิร์น
}
```

**ช่องทางที่ block ไม่ได้ (`notes[]`)** — บรรทัด 286–289:
```js
if (notes.length) {
  saveState(db, st);
  out({ hookSpecificOutput: { hookEventName: "Stop",
        additionalContext: notes.join("\n") } });   // ← แค่ส่งข้อความ ไม่บล็อก
}
```

→ **ใส่ผลของ Reaction Gate ลง `notes[]` = advisory only โดยโครงสร้าง**
ไม่ใช่ "advisory เพราะเราสัญญาว่าจะไม่บล็อก" แต่เป็น **advisory เพราะโค้ดทำอย่างอื่น
ไม่ได้** ตรงตามเจตนา Minnie เป๊ะ (มี precedent อยู่แล้ว: `st.missingOutput` ใช้
`notes` และ comment เขียนว่า "เตือน ไม่ block")

### ต้องแก้อะไร — รายการจริง ไล่ตามไฟล์

**1. `scripts/hook-gate.mjs`** (~40 บรรทัด)

| จุด | แก้อะไร |
|---|---|
| `MAP` + `NAME` (บรรทัด 25–41) | เพิ่ม `"panel-sim": "panel"` + `panel: "Panel"` |
| `FACTUAL` (บรรทัด 44) | 🔴 **ห้ามเพิ่ม** — persona พูดความเห็น ไม่ใช่ factual claim · ถ้าเพิ่มจะตั้งธง `pendingFactCheck` → Stop hook บล็อกจบเทิร์นทันที **ขัดเงื่อนไข advisory โดยตรง** |
| `WRITES_OUTPUT` (บรรทัด 48) | เพิ่ม `panel` ถ้าจะให้เซฟไฟล์ (แล้วต้องมี `Output/Panel/`) — ถ้าไม่เพิ่มก็ไม่เตือน |
| `blankSession()` | เพิ่ม field `reaction: null` |
| mode `agent-done` | ถ้า `id === "chris"` และ `verdict === "PASS"` → set `st.reaction = { due: true, at: ... }` · ถ้า `id === "panel"` → เก็บ objection ที่ได้ + `st.reaction.due = false` |
| mode `stop` | ถ้า `st.reaction?.due` → `notes.push("Chris ผ่านแล้ว — ยังไม่ผ่าน Reaction Gate ...")` · ถ้ามีผล panel → `notes.push(<สรุป objection>)` **ใส่ `notes` เท่านั้น ห้ามแตะ `blockers`** |

**2. `scripts/hook-status.mjs`** — ✅ **ไม่ต้องแก้โค้ดเลย** ถ้าเพิ่ม `"panel-sim": "panel"`
ใน `MAP` (บรรทัด 24–36) มันจะเขียน status/worklog/Firestore ให้เอง
**แต่ต้องเพิ่มของนอกโค้ด 2 อย่าง ไม่งั้นเงียบ:**
- `status.json` → เพิ่ม object ใน array `agents` ที่มี `id: "panel"` — เพราะบรรทัด 53–54
  `const agent = db.agents.find(a => a.id === id); if (!agent) process.exit(0);`
  **ถ้าไม่มี entry มันจะออกเงียบ ๆ ไม่ error** (กับดักคลาสสิก)
- `avatars/Panel.png` — เพราะ `agentImg: \`avatars/${name}.png\`` จะชี้ไปที่ไฟล์นี้

**3. `.claude/settings.json`** — ✅ **ไม่ต้องแก้เลย**
matcher เป็น `"Task|Agent"` กว้างพอ · Stop hook เรียก `hook-gate.mjs stop` อยู่แล้ว

**4. `.claude/agents/panel-sim.md`** — ไฟล์ใหม่ (ตาม SOP-09) — **ต้องรอ Kittanate
อนุมัติก่อนสร้าง** ตาม CLAUDE.md ข้อ GAPS

### ⚠️ กับดัก 3 ข้อที่ต้องเขียนไว้

1. 🔴 **ห้ามใส่ `panel` ลง `FACTUAL`** (อธิบายข้างบน) — ถ้าใส่ = gate นี้กลายเป็น veto
   ทันที ตรงข้ามกับที่ Minnie สั่ง
2. 🟡 **`MAX_BLOCKS = 3`** — ถ้าเผลอทำให้ Reaction Gate เข้าไปอยู่ใน `blockers`
   จะกินโควตา block ของ DoD gate ที่มีอยู่ → งานจริงติดค้าง (นี่คือความกลัวข้อ (ข)
   ของ Minnie เป๊ะ ๆ) · ทางกันคือ **เขียน test ยืนยันว่า reaction ไม่เคยโผล่ใน
   `blockers[]`** ก่อน merge
3. 🟡 **`st.qa.verdict === "FAIL"` reset `st.waived = false`** (บรรทัด 174) → ถ้า Chris FAIL
   แล้ววนแก้ ต้องเคลียร์ `st.reaction` ด้วย ไม่งั้น note ค้างจากรอบก่อน

### ประเมินแรงงาน (Reaction Gate)

| งาน | เวลา |
|---|---|
| แก้ `hook-gate.mjs` (MAP/NAME/state/agent-done/stop) | 2 ชม. |
| เพิ่ม entry `status.json` + avatar `Panel.png` | 0.5 ชม. |
| เขียน `.claude/agents/panel-sim.md` (**รออนุมัติ**) | 1 ชม. |
| ทดสอบว่าไม่บล็อกจริง (รัน 2–3 session + ยืนยัน `notes` ไม่ใช่ `blockers`) | 1–1.5 ชม. |
| เขียน build note | 0.5 ชม. |
| **รวม** | **✅ 4–6 ชม.** (ประมาณ 1 วันทำงาน) |

**เงื่อนไขตามลำดับที่ Minnie วางไว้:** ทำ**หลัง** สาย (ข) B4 พิสูจน์ว่ามีสัญญาณจริง
ไม่ใช่ก่อน — ผมเห็นด้วย ไม่มีเหตุผลจะเติม gate ให้ pipeline ยาวขึ้นถ้ายังไม่รู้ว่า
สิ่งที่ gate บอกมันเชื่อได้

---

## B6. persona panel เก็บที่ไหน · เริ่มแบบ stateless ได้ไหม

### ✅ เริ่ม stateless ได้ และ**ควร** เริ่มแบบนั้น

| ทางเลือก | ข้อดี | ข้อเสีย | คำตัดสิน |
|---|---|---|---|
| **ไฟล์ใน repo** (`.claude/personas/*.md` หรือ `SOP/`) | ✅ version control ได้ (เห็นว่า persona เปลี่ยนตอนไหน ทำไม) · แก้ด้วย editor · ไม่ต้องต่อ network · review ผ่าน git diff ได้ | แก้จากมือถือไม่ได้ | ⭐ **เอาอันนี้** |
| **Firestore** | แก้จาก dashboard ได้ | ❌ **ไม่มี version history** — persona เปลี่ยนแล้วไม่รู้ว่าเปลี่ยนอะไร ทำให้ backtest เทียบข้ามเวลาไม่ได้ · ต้องต่อ network · debug ยากกว่า | ❌ ไม่ |

**เหตุผลที่ต้อง repo ไม่ใช่ Firestore — สำคัญกว่าที่เห็น:** ถ้าเราจะ backtest แล้วเอาผล
มาเทียบกัน **persona ต้องคงที่และตรวจย้อนได้** ไม่งั้นตัวเลข 7/10 ไม่มีความหมาย
(เพราะไม่รู้ว่าตอนรันเคสที่ 3 persona หน้าตาเหมือนตอนรันเคสที่ 8 หรือเปล่า)
git ให้ของนี้ฟรี Firestore ไม่ให้

**memory ข้ามงาน: ❌ ยังไม่ต้อง** — Minnie ถามว่า "ควรให้มี memory ข้ามงานไหม
หรือ stateless ไปก่อนเพื่อคุมความซับซ้อน" ตอบ: **stateless ไปก่อน** 3 เหตุผล:
1. เราจะได้รู้ว่าผลที่ได้มาจาก **persona** ไม่ใช่จาก memory ที่สะสมมาแบบควบคุมไม่ได้
   (ตัวแปรเดียวต่อการทดลอง)
2. memory ทำให้ backtest reproduce ไม่ได้ — รันเคสเดิมซ้ำจะได้คำตอบต่างกัน
3. ถ้าอยากมี memory จริง มันคือ #06 ซึ่งควรทำเป็นโปรเจกต์แยก ไม่ผสม

---

## B7. ต่อ memory graph (#06) กับของเดิม — เริ่ม read-only ได้ไหม คุ้มไหม

### ✅ ได้ และคุ้ม — **แต่ไม่ใช่ด้วย graph database**

**ของที่มีอยู่จริงวันนี้** (`ls -la` + ดูขนาดไฟล์):

| แหล่ง | ขนาด/รูปแบบ | อ่านได้เลยไหม |
|---|---|---|
| `worklog.json` | **83 KB** — `{entries: [...]}` มี `title`, `summary`, `agent`, `datetime` | ✅ อ่านตรงได้ |
| `Output/<Agent>/*.md` | 11 โฟลเดอร์ (Chris, Claudy, Dale, Kittanate-source, Libby, Mind, Minnie, Nick, Rae, Reese, Vera) | ✅ อ่านตรงได้ |
| `status.json` | 13 KB — สถานะ + report ล่าสุดต่อ agent | ✅ |
| `Firestore agents/worklog` | mirror ของ worklog.json | ✅ (hook เขียนอยู่) |
| `todo.json` / `manga.json` | 7 KB / 1.5 KB | ✅ |

### 🔴 ตัวเลขที่เปลี่ยนคำตอบทั้งข้อ

**corpus ทั้งหมดของเรารวมกันประมาณ 100–200 KB** — ระดับที่ **grep เจอได้เร็วกว่า
vector search** และ **ใส่เข้า context ได้ทั้งก้อน** ด้วย context window 1M tokens

เทียบกับที่ Minnie เสนอ 3 ทาง:
- **Graphiti**: ✅ ต้องมี Neo4j 5.26 / FalkorDB 1.1.2 / Amazon Neptune (Kuzu deprecated)
  + embedding provider + LLM ที่รองรับ structured output → **เอา database มาดูแลเพิ่ม
  1 ตัว เพื่อค้นข้อความ 200 KB** ไม่คุ้มชัดเจน
- **Postgres + pgvector**: ต้องมี Postgres → 🟡 ตรง target stack TANAPAT พอดี
  **เก็บไว้ทำตอนย้าย stack จริง ไม่ใช่ตอนนี้**
- **Firestore + embedding**: hook วันนี้เขียนผ่าน REST + API key (`hook-status.mjs`
  บรรทัด 123, 130) ถ้าจะทำ vector search ต้องเปลี่ยนเป็น SDK + สร้าง index
  = งานจริง 🟡 ทำได้แต่ไม่จำเป็นที่ขนาดนี้

**→ ทางที่ 4 ที่ Minnie ไม่ได้ลิสต์ และเป็นทางที่ถูกที่สุด:**

### ⭐ ข้อเสนอ: `scripts/recall.mjs` — read-only retrieval ไม่มี dependency

```
รับ: keyword หรือหลายคำ
ค้น: worklog.json (title + summary) + Output/**/*.md + status.json
คืน: path + บรรทัดที่ตรง + วันที่ เรียงตามใหม่สุด
```

| | |
|---|---|
| Dependency ใหม่ | **0** (Node built-in ล้วน เหมือน hook 2 ตัวที่มีอยู่) |
| ต้นทุน hosting | **0 บาท/เดือน** |
| ข้อมูลออกนอกเครื่อง | **ไม่ออก** |
| แตะ pipeline ที่ทำงานอยู่ | **ไม่แตะ** — read-only ตามที่ Minnie ขอเป๊ะ |
| แรงงาน | **✅ 3–4 ชม.** |
| ผูกกับ MiroFish | **ไม่ผูกเลย** — ทิ้ง MiroFish ก็ยังใช้ได้ (ตรงกับที่ Minnie เขียนว่า "เป็นการลงทุนที่ใช้ต่อได้แม้ทิ้ง MiroFish ไปเลย") |

**"คุ้มไหม" — ตอบตรง:** คุ้ม เพราะมันแก้ปัญหาที่ Minnie ระบุว่ามีจริง
("agent จำอะไรไม่ได้ ทุก session เริ่มจากศูนย์") ด้วยแรงงานครึ่งวันและต้นทุนศูนย์
สิ่งที่**ไม่**คุ้มคือการเอา graph database มาแก้ปัญหาเดียวกัน

**⚪ ข้อจำกัดที่ต้องยอมรับ:** grep หา "คำที่ตรง" ไม่หา "ความหมายใกล้กัน"
ถามว่า "ลูกค้าวัดชอบแบบไหน" แล้วเอกสารเขียนว่า "สถานศึกษาทางศาสนา" → หาไม่เจอ
**จุดที่ควรเปลี่ยนใจไป pgvector: เมื่อ corpus > ~5 MB หรือเจอเคส grep พลาดซ้ำ ๆ
เกิน 3 ครั้ง** (เขียนเกณฑ์ไว้เลยเพื่อไม่ต้องเถียงกันอีกรอบ)

**สิ่งที่ #06 ยัง**ไม่**ได้:** "temporal" ที่ Minnie อยากได้ (อะไรถูกแทนที่ไปแล้ว)
grep ไม่ให้ของนี้ 🟡 ทำได้บางส่วนด้วยการเรียงตามวันที่ + convention ตั้งชื่อ `-v2`
ที่ SOP-01 ใช้อยู่ **แต่ไม่เท่า knowledge graph จริง** — ยอมรับตรง ๆ ว่าเป็นการ
แลกความสมบูรณ์กับต้นทุน และที่ขนาดงานเราวันนี้ ผมเลือกต้นทุน

---

# 🎯 คำแนะนำเชิงเทคนิคที่ตัดสินใจได้

## ติดตั้ง MiroFish ได้/ไม่ได้

**ทางเทคนิค: ได้** — 2–4 ชม. (ลง Docker Desktop + `uv python install 3.12`)
**คำแนะนำ: ❌ ไม่ติดตั้ง**

**เหตุผลเรียงตามน้ำหนัก — ข้อ 1 ข้อเดียวก็พอตัดสินแล้ว:**

1. 🔴 ✅ **Zep Cloud บังคับด้วยโค้ด ปิดไม่ได้ ไม่มี self-host**
   `config.py` ปฏิเสธ `ZEP_API_URL` ตรง ๆ · Community Edition เลิกไปเม.ย. 2025 ·
   BYOC เฉพาะ Enterprise → **เอกสารลูกค้าสถาบันต้องออกนอก ไปที่ที่เราไม่รู้ว่าประเทศไหน**
   ข้อนี้ขัดกฎ X4 ของ Minnie โดยตรง และ**ไม่มีทางเลี่ยงด้วยการตั้งค่า**
2. 🔴 ✅ **ต้องสมัคร 2 บัญชีใหม่** (LLM + Zep) — Claude ที่มีอยู่เสียบได้แต่
   `response_format` ถูกเมิน (เสี่ยง JSON พังแบบหาสาเหตุยาก) และ **ไม่มี prompt caching
   ผ่าน compat layer** = ต้นทุนสูงกว่าที่ควร
3. 🟡 **AGPL ปิดทางธุรกิจสายบริการ** — กรณี (ค) ต้องเปิด source ทั้งชิ้น
   (แต่**ไม่**ห้ามทดลองภายใน — ข้อนี้ไม่ใช่เหตุผลหลัก)
4. ✅ **upstream อายุ 8 เดือน** — สร้าง 26 พ.ย. 2025, push ล่าสุด 23 ก.ค. 2026,
   **107 open issues**, 10,889 forks · เปลี่ยนเร็ว ค่าดูแล fork สูง (ยืนยัน X3 ของ Minnie)
5. ⚪ **ไม่มี benchmark ความแม่น** — ผมไม่เจอในสิ่งที่อ่าน (**ให้ Reese ยืนยัน**)

**ยกเว้นกรณีเดียวที่ผมจะเปลี่ยนใจ:** ถ้า Kittanate ต้องการรัน MiroFish เพื่อ
**ทำคอนเทนต์** (idea #04 — ต้องมีภาพหน้าจอ/ประสบการณ์จริงมาเขียนบทความ)
→ ทำได้ แต่ **ป้อนแค่ข้อมูลสาธารณะ ห้ามป้อนเอกสารลูกค้าเด็ดขาด** และตั้งเป็น
one-off ไม่ใช่ระบบที่ต้องดูแล · เวลา 2–4 ชม. + ค่า token

## ถ้าลอง ลองสายไหนก่อน

**✅ สาย (ข) เท่านั้น** — และเริ่มด้วย **ทาง A (panel-in-one-prompt)**

ลำดับที่ผมแนะนำ (สอดคล้องกับ gate ของ Minnie):

| ลำดับ | ทำอะไร | แรงงาน | เงื่อนไขเดินต่อ |
|---|---|---|---|
| **1** | panel-sim ทาง A (idea #01) | **2–3 ชม.** | — |
| **2** | backtest 10 เคส ⚠️ **บล็อกอยู่ที่ Nick** | 4–6 ชม. | ต้องได้ข้อมูลดีลเก่าจาก Nick ก่อน |
| **3a** | ถ้า **≥7/10** → Reaction Gate advisory (#05) | 4–6 ชม. | ต้องอนุมัติ agent ใหม่ (SOP-09) |
| **3b** | ถ้า **<7/10** → หยุดสายนี้ ย้ายไป `recall.mjs` | 3–4 ชม. | — |
| **4** | `recall.mjs` (#06 read-only) — **ทำได้ขนานเลย ไม่ต้องรอผลอะไร** | 3–4 ชม. | ไม่มี |
| **❌** | สาย (ก) MiroFish จริง | — | **ไม่ทำ** |

**ถ้าเลือกได้แค่ 1 อย่างวันนี้:** ทำ **ลำดับ 4 (`recall.mjs`)** ก่อน — เพราะเป็นอย่างเดียว
ในลิสต์ที่ **ไม่มี dependency ไม่ต้องรออนุมัติ ไม่ต้องรอข้อมูลใคร** และแก้ปัญหาที่เรา
**รู้ว่ามีจริง** (agent จำอะไรไม่ได้) ไม่ใช่ปัญหาที่เราสมมติว่ามี — ตรงกับที่ Minnie
เขียนไว้ในใบ #06 เอง

## ประเมินแรงงานรวม

| แผน | เวลา Dale | ผูกกับ MiroFish |
|---|---|---|
| **ขั้นต่ำ** — `recall.mjs` เดี่ยว | **3–4 ชม.** (ครึ่งวัน) | ไม่ผูก |
| **แนะนำ** — panel A + backtest + recall | **9–13 ชม.** (~2 วัน) | ไม่ผูก |
| **เต็มสาย (ข)** — + Reaction Gate | **13–19 ชม.** (~2.5–3 วัน) | ไม่ผูก |
| ยกระดับเป็น multi-agent จริง (ทาง B) | +1.5–2 วัน | ไม่ผูก |
| ~~สาย (ก) MiroFish~~ | ~~2–4 ชม. + ค่าดูแลต่อเนื่อง~~ | **ไม่แนะนำ** |

**หมายเหตุ:** ทั้ง 4 บรรทัดที่แนะนำ **ไม่ผูกกับ MiroFish เลย** → ถ้าอีก 3 เดือน
MiroFish หายไปจากโลก ของที่เราสร้างยังใช้ได้ทั้งหมด นี่เป็นเหตุผลออกแบบ ไม่ใช่ผลพลอยได้

---

# 📌 ส่งต่อทีม

**→ Reese [Research]** (ผมไม่ได้ตรวจ ตอบแทนไม่ได้)
1. ✅ ดาว GitHub = **69,712** (ยืนยันจาก GitHub API วันนี้) → ตัวเลข **69.7k ถูก**,
   **42k ผิด/เก่า** — ปิดประเด็นที่ขัดกันใน brief ได้
2. ✅ repo สร้าง **26 พ.ย. 2025** → อ้าง "อันดับ 1 GitHub Trending ~7 มี.ค. 2026"
   สอดคล้องกับ timeline (repo มีอยู่ก่อนแล้ว 3 เดือน) — แต่**ตัวอันดับเองผมไม่ได้ยืนยัน**
3. ⚪ **README ไม่ได้ระบุ** เรื่องจูนตามพฤติกรรม/timezone จีนอย่างที่ brief อ้าง
   ที่ผมเจอคือ `locales/` มี `en.json` + `zh.json` และ `locale.py` **default เป็น `zh`**
   (`request.headers.get('Accept-Language', 'zh')`) → เป็น **i18n ของ UI** ไม่ใช่
   หลักฐานว่า persona/พฤติกรรม tune ตามจีน · **ข้ออ้างนี้ยังไม่มีหลักฐาน — ต้องตรวจ**
4. ⚪ **license ของ OASIS / camel-ai** (`camel-oasis==0.2.5`, `camel-ai==0.2.78`)
   ผมไม่ได้ตรวจ — สำคัญถ้าจะพิจารณาทางเลือกแทน MiroFish
5. ⚪ Zep: นโยบาย **training data / retention / region** หาไม่เจอในเอกสารสาธารณะ
   (privacy policy 404 ทั้ง 2 URL ที่ลอง) — ถ้า Reese หาเจอ ให้แก้ A2

**→ Nick [Cost/ROI]**
1. ✅ Zep free tier = **10,000 credits/เดือน** (2 projects) · Flex **$1,250/ปี** (50k/เดือน)
   · Flex Plus **$3,750/ปี** (200k/เดือน)
   ~~⚪ แต่ 1 credit = กี่ operation ไม่ระบุ → ประเมินต้นทุนต่อ 1 simulation ไม่ได้~~
   ✅ **แก้ 31 ก.ค. 2026:** มีระบุจริงในหน้า pricing — **1 credit ต่อ 1 episode ขนาด ≤350 bytes**
   Nick หาเจอและใช้คำนวณถูกต้องแล้ว (ยืนยันโดย Reese) → ข้อนี้ประเมินได้ ไม่ใช่ ⚪ อีกต่อไป
2. ✅ `OASIS_DEFAULT_MAX_ROUNDS = 10` (ไม่ใช่ 40) — README เตือน "High consumption,
   try simulations with fewer than 40 rounds first" → ค่า default จริงต่ำกว่าที่ brief สมมติ
3. ✅ ราคา Claude (cache 24 มิ.ย. 2026): Opus 5 **$5/$25** · Sonnet 5 **$3/$15**
   (โปรโมชัน **$2/$10 ถึง 31 ส.ค. 2026**) · Haiku 4.5 **$1/$5** ต่อ 1M tokens
4. 🔴 **ต้องคิดในโมเดล:** ผ่าน OpenAI compat layer **ไม่มี prompt caching**
   → simulation ที่ยิงซ้ำด้วย system prompt เดิมจะ**จ่าย input เต็มทุกครั้ง**
   ตัวเลขนี้ทำให้สาย (ก) แพงกว่าที่ประมาณไว้อย่างมีนัยสำคัญ
5. **ทาง A vs ทาง B (B4):** ทาง A ใช้ **1 call** ทาง B ใช้ **10–27 calls** ต่อ 1 panel
   → ต่างกัน **~10–25 เท่า** ใช้ตัวเลขนี้คิด ROI ได้เลย
6. ⚠️ **backtest ลำดับ 2 บล็อกอยู่ที่ข้อมูลของ Nick** — ถ้าดีลเก่าไม่พอ 10 เคส
   ให้บอกเร็ว ๆ เพราะมันเป็น gate ตัดสินใจทั้งสปรินต์

**→ Chris [QA]** — เอกสารนี้มี factual claims เยอะ ✅ ต้องผ่าน **Reese [Fact-check]**
ก่อนถึงคุณ ตาม CLAUDE.md ข้อ 6 (`hook-gate.mjs` บังคับอยู่ — ข้ามไม่ได้)

---

## แหล่งที่ผมอ่านจริงวันนี้ (30 ก.ค. 2026)

**MiroFish — ซอร์สจริง**
- `https://api.github.com/repos/666ghj/MiroFish` (license, stars, forks, dates, issues)
- `LICENSE` ทั้งไฟล์ (§0, §2, §5, §13)
- `README.md`, `.env.example`, `Dockerfile`, `docker-compose.yml`
- `backend/app/config.py` ← **หลักฐาน Zep บังคับ**
- `backend/app/utils/zep.py` ← hard-coded Zep Cloud URL
- `backend/app/utils/llm_client.py` ← JSON mode + fallback logic
- `backend/app/utils/openai_chat_compat.py`, `backend/app/utils/locale.py`
- `backend/requirements.txt`, `backend/pyproject.toml`
- `.github/workflows/docker-image.yml`, git tree ทั้ง repo

**Zep**
- `help.getzep.com/faq` (CE deprecated, BYOC)
- `help.getzep.com/security-compliance` (SOC 2, BYOK/AWS KMS, ไม่มี region)
- `getzep.com/pricing` (free 10k credits, Flex, Flex Plus)
- `api.github.com/repos/getzep/graphiti` + README (Apache-2.0, graph DB requirement)

**Anthropic**
- `platform.claude.com/docs/en/api/openai-sdk` (compat layer + ตารางข้อจำกัดทุกบรรทัด)
- `claude-api` skill (ราคา, model IDs — cache 24 มิ.ย. 2026)

**AGAPAE ในเครื่อง**
- `.claude/agents/dale-devops.md`, `CLAUDE.md`
- `scripts/hook-gate.mjs` (ทั้งไฟล์ 296 บรรทัด), `scripts/hook-status.mjs` (ทั้งไฟล์)
- `.claude/settings.json`
- `Output/Kittanate-source/2026-07-30-mirofish-brief.md`
- `Output/Minnie/2026-07-30-mirofish-ideas.md`
- รันบนเครื่อง: `sw_vers`, `uname -m`, `node -v`, `npm -v`, `python3 -V`, `which -a python3.11 python3.12`, `uv --version`, `which docker`, `which brew`, `sysctl hw.memsize hw.ncpu`, `df -h`

---

**สถานะเอกสาร:** ✅ ผ่าน Reese [Fact-check] แบบมีเงื่อนไข (31 ก.ค. 2026) → แก้ครบแล้ว → รอ Chris QA
**ส่งต่อ:** Nick (ต้นทุน) · Claudy (ตัดสินใจลำดับงาน)

---

# 🔧 บันทึกการแก้ไขหลัง fact-check (31 ก.ค. 2026)

ผล fact-check ฉบับเต็ม: `Output/Reese/2026-07-31-mirofish-factcheck.md`
**verdict ของเอกสารนี้: ⚠️ ผ่านแบบมีเงื่อนไข** — ต้องแก้ 2 จุด, แก้เพิ่มได้อีก 2 จุด

| # | ประเด็น | Reese ว่ายังไง | ผมทำอะไร |
|---|---|---|---|
| 1 | **จำนวนไฟล์ที่พึ่ง Zep: 13 → 16** | นับจาก git tree จริงได้ 16 (services 3 + utils 3 + scripts 1 + tests 9) — ผมนับต่ำไป 3 | ✅ **แก้แล้ว** ที่หัวข้อ A2 · ข้อสรุป "ถอด Zep ออกไม่ได้" **แข็งขึ้น** ไม่ใช่อ่อนลง |
| 2 | **1 credit ของ Zep = กี่ operation** | ผมมาร์ก ⚪ ว่าไม่ระบุ — **ผิด มีระบุ**: 1 credit ต่อ episode ≤350 bytes (Nick หาเจอ) | ⚠️ **รอบ 1 แก้ไม่ครบ** — แก้แค่หัวข้อ "ส่งต่อทีม → Nick" ข้อ 1 ส่วนหัวข้อ **A2 ตกค้าง** → **แก้ครบทั้ง 2 จุดแล้วในรอบ 2** (ดูหัวข้อข้างล่าง) |
| 3 | **คอมเมนต์ใน `zep.py`** | เสนอให้ยกคอมเมนต์ของผู้พัฒนา ("Reject it so this Cloud-only integration cannot silently target a self-hosted or compatibility endpoint") มาเสริม — หนักกว่าโค้ดเปล่า | ✅ **เพิ่มแล้ว** ที่หัวข้อ A2 |
| 4 | **Backend เป็น Flask ไม่ใช่ FastAPI** | ข้ออ้าง FastAPI ใน brief ผิด ที่ถูกคือ **Flask** (`pyproject.toml`: `flask>=3.0.0`, `config.py`: `"""Flask配置类"""`, ไม่มีคำว่า `fastapi`/`uvicorn` ในไฟล์ dependency ใดเลย) | ⚠️ **ไม่มีจุดต้องแก้ในเอกสารนี้** — ดูหมายเหตุข้างล่าง |
| 5 | **WebSocket ไม่มีหลักฐาน** | ไม่มีใน `package.json` / `requirements.txt` และไม่มีไฟล์ socket/sse/stream ใน repo ทั้ง 156 ไฟล์ | ⚠️ **ไม่มีจุดต้องแก้ในเอกสารนี้** — ดูหมายเหตุข้างล่าง |

### หมายเหตุข้อ 4 และ 5 — ตรวจซ้ำแล้วที่ตัวไฟล์

Reese ระบุว่าข้ออ้าง "Python/FastAPI/Vue" แพร่ไป 3 จุด: brief, Minnie (X3) และ **Dale**
ผม `grep` เอกสารฉบับนี้ทั้งไฟล์แล้ว **ไม่พบคำว่า `FastAPI` / `Flask` / `Vue` / `WebSocket` เลยแม้แต่ครั้งเดียว**
— ผมไม่ได้เขียนถึงเฟรมเวิร์กฝั่ง backend/frontend ในเอกสารนี้ตั้งแต่ต้น จึงไม่มีจุดให้แก้

จุดที่มีข้อความ "เวลา Dale ตั้งระบบ Python/FastAPI/Vue" อยู่ใน `Output/Nick/2026-07-30-mirofish-cost.md`
(Nick อ้างถึงเวลาของผม แต่ผมไม่ได้เป็นคนเขียนบรรทัดนั้น) และใน `Output/Minnie/2026-07-30-mirofish-ideas.md`
— **เจ้าของไฟล์ทั้งสองคนแก้เองเรียบร้อยแล้ววันนี้** (ตรวจซ้ำ 31 ก.ค. เวลา 12:2x: ทั้งสองไฟล์เป็น
`Python/Flask/Vue` แล้ว และ Nick ตั้งข้อสังเกตถูกว่าตารางของ Reese ตกไฟล์เขาไป — ระบุแค่ brief/Minnie/Dale)

> ผมบันทึกไว้ตรงนี้เพื่อไม่ให้เข้าใจผิดว่า "Dale ยังไม่แก้" — ไม่ใช่ปฏิเสธผลตรวจของ Reese
> ข้อเท็จจริงหลัก (**MiroFish = Flask ไม่ใช่ FastAPI · ไม่มีหลักฐาน WebSocket**) ผมยอมรับเต็มที่
> และมันไม่กระทบข้อสรุปของเอกสารนี้เลย เพราะเหตุผลที่ผมไม่แนะนำให้ติดตั้งคือ **Zep Cloud** กับ **AGPL §13**
> ไม่ใช่เฟรมเวิร์กที่ใช้

### สิ่งที่ Reese ตรวจซ้ำแล้วยืนยันว่าถูก (ไม่ต้องแก้)

- ตัวบท AGPL §0 / §2 / §5 / §13 ที่ยกมา — **ตรงเป๊ะทุกตัวอักษร**
- `config.py` (`validate()`, `OASIS_DEFAULT_MAX_ROUNDS = 10`, `ALLOWED_EXTENSIONS`, `MAX_CONTENT_LENGTH`)
  และ `zep.py` — ตรงตามซอร์สจริง
- สเปกเครื่อง Kittanate ทุกบรรทัด — Reese รันคำสั่งซ้ำเองวันนี้ **ตรงถึงหลักหน่วย** (RAM 17,179,869,184 bytes)
- ข้อมูล Zep ทั้งชุด (SOC 2, BYOK/KMS, CE เลิก เม.ย. 2025, BYOC เฉพาะ Enterprise, ราคา Flex/Flex Plus)
- Claude compat layer (`response_format` ถูก ignore, ไม่มี prompt caching, ตรรกะ `chat_json()`) และราคาโมเดล
- การมาร์ก ⚪ ในจุดที่ผมตอบไม่ได้ (region/retention ของ Zep, ความถี่ที่ JSON จะพังจริง) — Reese ยืนยันว่าหาไม่เจอเหมือนกัน

---

# 🔧 บันทึกการแก้ไขรอบที่ 2 (31 ก.ค. 2026)

ผล fact-check รอบ 2: `Output/Reese/2026-07-31-mirofish-factcheck-v2.md` หัวข้อ "🎯 VERDICT — Dale"
**verdict: ⚠️ ผ่านแบบมีเงื่อนไข — 1 จุด** (D-Δ3 แก้ไม่ครบตั้งแต่รอบ 1)

| # | ประเด็น | Reese ว่ายังไง | ผมทำอะไร |
|---|---|---|---|
| 1 | **⚪ ตกค้างที่หัวข้อ A2** — *"1 credit = กี่ operation ไม่ระบุในหน้า pricing → Nick ประเมินต้นทุนจริงจากตัวเลขนี้ไม่ได้ ต้องรันจริงหรือถามฝ่ายขาย"* | ❌ **INCORRECT** และ**ขัดกับหัวข้อ "ส่งต่อทีม → Nick" ของเอกสารตัวเอง**ที่แก้ไปแล้วรอบ 1 · `getzep.com/pricing` ระบุกฎไว้ชัด · และข้อความนี้**กล่าวหาความสามารถในการประเมินของเพื่อนร่วมทีมโดยตรง** ทั้งที่ Nick ประเมินได้และประเมินถูก (8,400 credits/sim) | ✅ **แก้แล้วที่หัวข้อ A2** เป็น *"✅ 1 credit ต่อ 1 episode ขนาด ≤350 bytes (`getzep.com/pricing`) → Nick ประเมินได้แล้ว: 8,400 credits ต่อ 1 simulation"* |
| 2 | **บันทึกการแก้ไขข้อ 2 ระบุว่า "✅ แก้แล้ว"** | ⚠️ **ไม่ตรงกับไฟล์** — แก้ 1 จุด เหลือ 1 จุด และจุดที่เหลือคือจุดที่คนอ่านเจอก่อน (A2 อยู่ต้นเอกสาร) | ✅ **แก้สถานะในตารางรอบ 1 ให้ตรงความจริงแล้ว** เป็น "รอบ 1 แก้ไม่ครบ → แก้ครบทั้ง 2 จุดแล้วในรอบ 2" |

**ผมยอมรับทั้ง 2 ข้อ ไม่มีข้อโต้แย้ง** — โดยเฉพาะข้อ 1 ที่เป็นการเขียนถึงงานของ Nick ผิด
บทเรียน: เวลาแก้ข้อเท็จจริงต้อง `grep` ทั้งไฟล์หาทุกจุดที่มันโผล่ก่อน ไม่ใช่แก้เฉพาะจุดที่ fact-check ชี้

**ไม่ต้องแก้ (Reese ยืนยันรอบ 2):** D-Δ1 (Zep 16 ไฟล์) · D-Δ2 (คอมเมนต์ `zep.py` — quote ตรงตัวทุกคำ)
· D-Δ4 (ข้อ 4/5 FastAPI/WebSocket — **Reese ยอมรับว่าเขาระบุไฟล์ผมผิดรอบแรก ผมถูก**)
· และทุกอย่างที่ยืนยันไปแล้วรอบแรก (AGPL ทุกมาตรา · Zep ทั้งชุด · สเปกเครื่อง · compat layer)
