# AVEGEE — สำรวจข้อความที่ยังไม่ผ่านระบบแปล (Codex, 28 ก.ย. 2569)

> ใบงาน: `Output/Claudy/briefs/2026-09-28-avegee-i18n-audit{,-A,-B}.md` · อ่านอย่างเดียว ไม่แก้โค้ด · ยังไม่ผ่าน Dale/Reese — ใช้วางแผนชุดแปล EN

# ชุด A — src/ui.js + index.html

ตรวจแบบอ่านอย่างเดียวบน worktree และ branch `codex/20260928T054517Z-c0009994` เฉพาะ `src/ui.js` กับ `index.html` ตามชุด A รายการ UI ทุกบรรทัดพร้อมตำแหน่ง ข้อความต้นทาง และ key ที่เสนออยู่ใน[รายงานฉบับเต็ม](/private/tmp/avegee-batch-a-i18n-audit.md) ไม่ได้ทำข้อ 4

| ไฟล์ | UI ค้างแปล | เนื้อเรื่อง/บทพูด/ชื่อ | ไม่ต้องแปล |
|---|---:|---:|---:|
| `src/ui.js` | ~550 บรรทัด · 4,188 คำไทย | ~39 บรรทัด · 633 คำไทย | ~557 บรรทัด ส่วนใหญ่เป็นคอมเมนต์ |
| `index.html` | ~24 บรรทัด · 109 คำไทย | ~4 บรรทัด · 9 คำไทย | ~322 บรรทัด ส่วนใหญ่เป็นคอมเมนต์ |

**หน่วยนับคือบรรทัดต้นทางที่มีอักษรไทย** หลังแยกคอมเมนต์ ไม่ใช่จำนวนข้อความบนจอที่ไม่ซ้ำกัน; บรรทัดหนึ่งอาจมีหลายข้อความหรือหลายรูปผัน รายงานระบุจำนวนอักษรไทยและสรุปเนื้อเรื่องต่อไฟล์ด้วย

จุดปุ่มชายแดนอยู่ที่ [src/ui.js:1921](/Users/agapae/Documents/Work%20PAE/Claude/.codex-worktrees/20260928T054517Z-c0009994/src/ui.js:1921)–[1931](/Users/agapae/Documents/Work%20PAE/Claude/.codex-worktrees/20260928T054517Z-c0009994/src/ui.js:1931): โค้ดเติม `โซน` หน้า `g.zoneDef().name` ทั้งที่ชื่อ cyberhell คือ `นรกเครือข่าย` จึงได้ `โซนนรกเครือข่าย` เสนอให้ใช้ `zoneName` ตรง ๆ ในข้อความปุ่ม ผลจะเป็น `กลับเข้าแผนที่นรกเครือข่าย` โดยชื่อโซนอื่นยังคงตามข้อมูลเกม

**ไฟล์ใน repo ที่เปลี่ยน:** ไม่มี  
**การตรวจที่รัน:** Acorn parse เพื่อแยกข้อความกับคอมเมนต์, `node --check src/ui.js`, จำลองข้อความปุ่มจากชื่อโซนทั้ง 4 และ `git status --short --branch` ซึ่งยังสะอาด ไม่ได้ทดสอบ UI ในเบราว์เซอร์หรืออ้างว่า QA ผ่าน

**ตรวจตามเกณฑ์รับงาน:** ข้อ 1 ตรวจเฉพาะสองไฟล์ตามขอบเขตชุด A; ข้อ 2 แยก UI/เนื้อเรื่อง/ไม่ต้องแปล; ข้อ 3 ให้จำนวนและคำประมาณต่อไฟล์ในรายงาน; ข้อ 5 ระบุสาเหตุและจุดแก้โดยไม่แก้โค้ด; ข้อ 4 งดตามคำสั่ง
## รายงานฉบับเต็มชุด A

# AVEGEE — สำรวจข้อความค้างแปล ชุด A (read-only)

ขอบเขต: `src/ui.js` และ `index.html` เท่านั้น; ไม่มีการแก้ repo. จำนวนใช้หน่วย **บรรทัดต้นทางที่มีอักษรไทยหลังตัดคอมเมนต์** ไม่ใช่จำนวนข้อความบนจอที่ไม่ซ้ำกัน; 1 บรรทัดอาจมีหลายข้อความ/รูปผัน. บรรทัดคอมเมนต์นับแยก จึงอาจซ้อนกับบรรทัดโค้ดที่มีคอมเมนต์ต่อท้าย. คำไทยนับด้วย `Intl.Segmenter('th')` โดยประมาณ.

| ไฟล์ | UI | เนื้อเรื่อง/บทพูด/ชื่อ | ไม่ต้องแปล |
|---|---:|---:|---:|
| `src/ui.js` | ~550 บรรทัด · 4,188 คำ · 15,476 อักษรไทย | ~39 บรรทัด · 633 คำ · 2,259 อักษรไทย | ~557 บรรทัด · 8,448 คำ · 30,361 อักษรไทย (คอมเมนต์ JS/HTML ใน template + debug) |
| `index.html` | ~24 บรรทัด · 109 คำ · 470 อักษรไทย | ~4 บรรทัด · 9 คำ · 40 อักษรไทย | ~322 บรรทัด · 4,847 คำ · 17,486 อักษรไทย (คอมเมนต์ CSS/HTML + meta description) |

## UI ที่ยังไม่ผ่าน t()/data-t

แต่ละรายการคือบรรทัดต้นทางทั้งหมดที่มีข้อความไทยซึ่งเข้าข่าย UI; ข้อความคงรูป source expression เพื่อไม่ทิ้งตัวแปร/เงื่อนไข. คอลัมน์ key เป็น **ต้นชื่อ** ที่เสนอ; บรรทัดที่มีหลายค่า/รูปผันให้แตกเป็น `.a`, `.b` ฯลฯ ในขั้น implement. ถ้าข้อความเดียวกันปรากฏหลายบรรทัดสามารถแชร์ key ได้.

### `index.html`

| ไฟล์:บรรทัด | ข้อความในต้นทาง | key ที่เสนอ |
|---|---|---|
| `index.html:87` | .stage.resting::after{content:"⏸ พักอยู่ — กด \201Cเดินวาระ\201D ให้เวลาเดินต่อ"; | `page.l87` |
| `index.html:1534` | &lt;p class="note"&gt;กำลังเปิดประตูโซนสุวรรณภูมิ…&lt;/p&gt; | `page.l1534` |
| `index.html:1540` | &lt;h2&gt;หมุนเครื่องเป็นแนวนอน&lt;/h2&gt; | `page.l1540` |
| `index.html:1541` | &lt;p&gt;โซนสุวรรณภูมิกว้างกว่าจอแนวตั้ง — หมุนเครื่องนอนลงแล้วเกมจะเปิดให้เอง&lt;/p&gt; | `page.l1541` |
| `index.html:1581` | &lt;p class="agewarn"&gt;&lt;span class="rate"&gt;18+&lt;/span&gt;&lt;span&gt;เกมนี้เนื้อหามีความรุนแรง เหมาะสำหรับผู้ใหญ่อายุ 18 ปีขึ้นไป&lt;/span&gt;&lt;/p&gt; | `page.l1581` |
| `index.html:1582` | &lt;div class="disclaimer"&gt;สำนวนในเกมเป็นเรื่องแต่งขึ้นเพื่อความบันเทิงเท่านั้น&lt;/div&gt; | `page.l1582` |
| `index.html:1596` | &lt;button id="fab-atk" class="fab hot" hidden&gt;⚔️ ฟาด&lt;/button&gt; | `page.l1596` |
| `index.html:1613` | &lt;button id="hud-avatar" class="hud-avatar" aria-label="สถานะยมบาทน้อย"&gt; | `page.l1613` |
| `index.html:1643` | &lt;h1&gt;อเวจี&lt;small id="hdr-sub"&gt;นรกโซนสุวรรณภูมิ · ยมบาทฝึกหัด&lt;/small&gt;&lt;/h1&gt; | `page.l1643` |
| `index.html:1648` | &lt;button id="menu" class="sm"&gt;↩ ออกไปหน้าเมนู&lt;/button&gt; | `page.l1648` |
| `index.html:1649` | &lt;button id="help" class="sm"&gt;วิธีเล่น&lt;/button&gt; | `page.l1649` |
| `index.html:1650` | &lt;button id="settings" class="sm"&gt;⚙ ตั้งค่า&lt;/button&gt; | `page.l1650` |
| `index.html:1651` | &lt;button id="mute" class="sm"&gt;🔊 เสียง&lt;/button&gt; | `page.l1651` |
| `index.html:1657` | &lt;button id="play" class="pri"&gt;▶ เริ่มเดินวาระ&lt;/button&gt; | `page.l1657` |
| `index.html:1658` | &lt;button id="spd" class="sm"&gt;ความเร็ว ×1&lt;/button&gt; | `page.l1658` |
| `index.html:1659` | &lt;button id="atk" class="sm" hidden&gt;⚔️ ฟาดเปรต&lt;/button&gt; | `page.l1659` |
| `index.html:1661` | &lt;button id="bag" class="sm" hidden&gt;🎒 กระเป๋า&lt;/button&gt; | `page.l1661` |
| `index.html:1662` | &lt;button id="zone" class="sm" hidden style="margin-left:auto"&gt;🗺️ ย้ายโซน&lt;/button&gt; | `page.l1662` |
| `index.html:1668` | &lt;button role="tab" data-tab="queue" aria-selected="true" id="tab-queue"&gt;คิววิญญาณ&lt;/button&gt; | `page.l1668` |
| `index.html:1669` | &lt;button role="tab" data-tab="crew" aria-selected="false" id="tab-crew"&gt;ยมทูต&lt;/button&gt; | `page.l1669` |
| `index.html:1670` | &lt;button role="tab" data-tab="build" aria-selected="false" id="tab-build"&gt;ก่อสร้าง&lt;/button&gt; | `page.l1670` |
| `index.html:1676` | &lt;button role="tab" data-side="info" aria-selected="true" id="side-info"&gt;ข้อมูล&lt;/button&gt; | `page.l1676` |
| `index.html:1677` | &lt;button role="tab" data-side="log" aria-selected="false" id="side-log"&gt;บันทึก&lt;/button&gt; | `page.l1677` |
| `index.html:1683` | &lt;footer&gt;อเวจี — เกมทดลอง · คลิกพื้นหรือกด WASD เพื่อเดิน · บันทึกอัตโนมัติลงเครื่อง&lt;/footer&gt; | `page.l1683` |

### `src/ui.js`

| ไฟล์:บรรทัด | ข้อความในต้นทาง | key ที่เสนอ |
|---|---|---|
| `src/ui.js:46` | const WEIGHT = ['', 'เล็กน้อย', 'ปานกลาง', 'หนัก', 'หนักมาก', 'มหันต์']; | `resources.l46` |
| `src/ui.js:162` | $('#tickinfo').textContent = \`วาระที่ ${g.tick} · ตรวจการรอบหน้าอีก ${g.nextKpi} วาระ · ผ่านแล้ว ${g.kpiPassed}/${BAL.kpiWin}\`; | `resources.l162` |
| `src/ui.js:189` | if (k === 'hp') return modal(\`&lt;h2&gt;❤️ บารมี — ${Math.round(g.hp)}/${g.hpMax}&lt;/h2&gt; | `resources.l189` |
| `src/ui.js:191` | ความน่าเชื่อถือที่พญายมมีให้ท่าน &lt;b&gt;คือชีวิตของท่านในเกมนี้&lt;/b&gt;&lt;/p&gt; | `resources.l191` |
| `src/ui.js:192` | &lt;div class="tline"&gt;&lt;b&gt;หายเมื่อไหร่&lt;/b&gt;&lt;div&gt;คำตัดสินได้ 0 ดาว หรือลงทัณฑ์เกินกรรมสองวาระขึ้นไป = โดนลูกไฟ บารมีหาย 1 ใน 5 · | `resources.l192` |
| `src/ui.js:193` | ได้ 1 ดาว = หาย 10&lt;/div&gt;&lt;/div&gt; | `resources.l193` |
| `src/ui.js:194` | &lt;div class="tline"&gt;&lt;b&gt;ได้คืนเมื่อไหร่&lt;/b&gt;&lt;div&gt;ตัดสินได้ห้าดาว (พ่อคืนให้นิดหน่อย — และคืนน้อยลงถ้ากรรมท่านสูง) · | `resources.l194` |
| `src/ui.js:195` | เดินไปเก็บ&lt;b&gt;หีบยาอายุวัฒนะ&lt;/b&gt;ที่ตกอยู่บนแผนที่ +20&lt;/div&gt;&lt;/div&gt; | `resources.l195` |
| `src/ui.js:196` | &lt;div class="tline bad"&gt;&lt;b&gt;ถ้าหมด&lt;/b&gt;&lt;div&gt;จบเกมทันที — พญายมเรียกตราคืนจากมือท่านต่อหน้าทุกคน&lt;/div&gt;&lt;/div&gt; | `resources.l196` |
| `src/ui.js:197` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;เข้าใจแล้ว&lt;/button&gt;&lt;/div&gt;\`); | `resources.l197` |
| `src/ui.js:199` | if (k === 'order') return modal(\`&lt;h2&gt;⚖️ ระเบียบ — ${Math.round(g.order)} (${esc(g.orderTier().name)})&lt;/h2&gt; | `resources.l199` |
| `src/ui.js:201` | โซนนี้เดินเป็นระบบแค่ไหน &lt;b&gt;เป็นตัวคูณรายได้ของท่านทุกคดี&lt;/b&gt; และเป็นตัวเลขที่พญายมใช้ตรวจการ&lt;/p&gt; | `resources.l201` |
| `src/ui.js:202` | &lt;div class="tline"&gt;&lt;b&gt;ขึ้นเมื่อ&lt;/b&gt;&lt;div&gt;ปิดคดีได้คะแนนดี · ปราบเปรต (+3) · มีหอทะเบียนกรรม (+${BAL.orderGainSala}/วาระ)&lt;/div&gt;&lt;/div&gt; | `resources.l202` |
| `src/ui.js:203` | &lt;div class="tline"&gt;&lt;b&gt;ลงเมื่อ&lt;/b&gt;&lt;div&gt;คิวเกิน ${g.queueCap()} ดวง (ยิ่งล้นยิ่งตกเร็ว${g.has('tarang') ? ' · ตะรางขยายให้แล้ว' : ' — สร้างตะรางรอวาระขยายได้'}) · ปล่อยเปรตไว้ · คำตัดสินคะแนนต่ำ · | `resources.l203` |
| `src/ui.js:204` | ตรวจการไม่ผ่าน (−10) · กรรมท่านสูงเกิน 75&lt;/div&gt;&lt;/div&gt; | `resources.l204` |
| `src/ui.js:206` | &lt;div class="tline bad"&gt;&lt;b&gt;ถ้าหมด (0)&lt;/b&gt;&lt;div&gt;พญายมเตือนให้ตั้งหลักได้สามครั้ง หลังจากนั้นท่านจะลงมาปราบและส่งยมบาทไปรับโทษในกระทะทองแดง&lt;/div&gt;&lt;/div&gt; | `resources.l206` |
| `src/ui.js:207` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;เข้าใจแล้ว&lt;/button&gt;&lt;/div&gt;\`); | `resources.l207` |
| `src/ui.js:209` | if (k === 'karma') return modal(\`&lt;h2&gt;☠️ กรรมท่าน — ${g.karma.toFixed(1)} (${esc(g.karmaTier().name)})&lt;/h2&gt; | `resources.l209` |
| `src/ui.js:211` | บาปที่ &lt;b&gt;ตกใส่ตัวท่านเอง&lt;/b&gt; ไม่ใช่ของวิญญาณ — แกนของเกมทั้งเกมคือ | `resources.l211` |
| `src/ui.js:212` | "ทัณฑ์ที่เกินกรรม มันไม่ได้หายไปไหน มันมาอยู่ที่ผู้ตัดสิน"&lt;/p&gt; | `resources.l212` |
| `src/ui.js:213` | &lt;div class="tline"&gt;&lt;b&gt;ขึ้นเมื่อ&lt;/b&gt;&lt;div&gt;ลงทัณฑ์เกินกรรมที่เขาก่อ (ยิ่งเกินยิ่งหนัก) · ส่งผิดชนิดกรรม (+4) · | `resources.l213` |
| `src/ui.js:214` | ใช้สะกดจิต (+4) · ตวาดข่มขู่ (+0.5)&lt;/div&gt;&lt;/div&gt; | `resources.l214` |
| `src/ui.js:215` | &lt;div class="tline good"&gt;&lt;b&gt;ลดได้ยังไง&lt;/b&gt;&lt;div&gt;ตัดสินได้ห้าดาว −${KARMA_RELIEF.star5} · | `resources.l215` |
| `src/ui.js:216` | เก็บ&lt;b&gt;ดอกบัวบูชา&lt;/b&gt;ที่ตกบนแผนที่ (ตกให้เมื่อกรรมเกิน 40) −4 · | `resources.l216` |
| `src/ui.js:217` | บูชาดอกบัวที่&lt;b&gt;ศาลาน้ำชา&lt;/b&gt; ${KARMA_RELIEF.lotusCost} เบี้ย −${KARMA_RELIEF.lotusCut} (แท็บก่อสร้าง)&lt;/div&gt;&lt;/div&gt; | `resources.l217` |
| `src/ui.js:219` | &lt;div class="tline bad"&gt;&lt;b&gt;ถ้าเต็ม (100)&lt;/b&gt;&lt;div&gt;พญายมลงมาปราบด้วยตัวเอง แพ้แล้วถูกส่งลงกระทะทองแดง บารมีเหลือ 1 และกรรมลดลงหลังชดใช้บางส่วน&lt;/div&gt;&lt;/div&gt; | `resources.l219` |
| `src/ui.js:220` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;เข้าใจแล้ว&lt;/button&gt;&lt;/div&gt;\`); | `resources.l220` |
| `src/ui.js:222` | if (k === 'food') return modal(\`&lt;h2&gt;🍙 เสบียง — ${Math.round(g.food)} ห่อ${g.workingCrew?.size | `resources.l222` |
| `src/ui.js:223` | ? (g.fed ? ' · &lt;span style="color:var(--success)"&gt;อิ่ม ทำงานไว&lt;/span&gt;' : ' · &lt;span style="color:var(--destructive)"&gt;หิว ทำงานช้า&lt;/span&gt;') : ''}&lt;/h2&gt; | `resources.l223` |
| `src/ui.js:225` | ค่าจ้างยมทูต — ไม่ใช่ของสถานีอีกต่อไป &lt;b&gt;ยมทูตที่กำลังคุมสถานี/ออกรับดวง&lt;/b&gt;กินเสบียงทุกวาระเหมือนกันหมด&lt;/p&gt; | `resources.l225` |
| `src/ui.js:226` | &lt;div class="tline bad"&gt;&lt;b&gt;ถ้าหมด&lt;/b&gt;&lt;div&gt;ยมทูตที่กำลังทำงานอยู่&lt;b&gt;ทำงานช้าลง&lt;/b&gt; — ไม่หยุดสนิท แค่คดีคืบหน้าช้าลง&lt;/div&gt;&lt;/div&gt; | `resources.l226` |
| `src/ui.js:227` | &lt;div class="tline good"&gt;&lt;b&gt;ถ้ามีพอ&lt;/b&gt;&lt;div&gt;ยมทูตที่กำลังทำงานอยู่ทำงาน&lt;b&gt;ไวขึ้น&lt;/b&gt;&lt;/div&gt;&lt;/div&gt; | `resources.l227` |
| `src/ui.js:228` | &lt;div class="tline"&gt;&lt;b&gt;เติมยังไง&lt;/b&gt;&lt;div&gt;ซื้อที่แท็บก่อสร้าง (${BAL.foodPrice * 10} เบี้ย/10 ห่อ) หรือเดินไปเก็บ&lt;b&gt;ห่อเสบียง&lt;/b&gt;บนแผนที่&lt;/div&gt;&lt;/div&gt; | `resources.l228` |
| `src/ui.js:229` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;เข้าใจแล้ว&lt;/button&gt;&lt;/div&gt;\`); | `resources.l229` |
| `src/ui.js:231` | return modal(\`&lt;h2&gt;🪙 เบี้ยกรรม — ${Math.round(g.coin)}&lt;/h2&gt; | `resources.l231` |
| `src/ui.js:233` | เงินของโซน ใช้สร้างสถานี จ้างยมทูต ซื้อเสบียง และบูชาดอกบัว&lt;/p&gt; | `resources.l233` |
| `src/ui.js:234` | &lt;div class="tline"&gt;&lt;b&gt;ได้จาก&lt;/b&gt;&lt;div&gt;ปิดคดี (คูณด้วยระเบียบของโซน) · สี่ดาว +25 · ห้าดาว +60 · | `resources.l234` |
| `src/ui.js:235` | ปราบเปรต +${MOB.bounty} · ตรวจการผ่าน +150&lt;/div&gt;&lt;/div&gt; | `resources.l235` |
| `src/ui.js:236` | &lt;div class="tline"&gt;&lt;b&gt;เสียไปกับ&lt;/b&gt;&lt;div&gt;ค่าแรงยักษ์ทวารบาลทุก ${BAL.payEvery} วาระ · ค่าสร้าง · ค่าจ้างแรกเข้า · ค่าเสบียง&lt;/div&gt;&lt;/div&gt; | `resources.l236` |
| `src/ui.js:237` | &lt;div class="tline bad"&gt;&lt;b&gt;ถ้าติดลบถึง −300&lt;/b&gt;&lt;div&gt;จบเกม — ยมทูตวางเครื่องมือแล้วเดินออกไปพร้อมกัน&lt;/div&gt;&lt;/div&gt; | `resources.l237` |
| `src/ui.js:238` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;เข้าใจแล้ว&lt;/button&gt;&lt;/div&gt;\`); | `resources.l238` |
| `src/ui.js:245` | const weightLabel = w =&gt; w &lt; 0 ? 'บรรเทาโทษ' : (WEIGHT[w] \|\| ''); | `queueCrewBuild.l245` |
| `src/ui.js:276` | if (!g.queue.length &amp;&amp; !g.held.length &amp;&amp; !sentenced.length) { b.innerHTML = '&lt;div class="empty"&gt;คิวว่าง — โซนนี้สงบผิดปกติ&lt;/div&gt;'; return; } | `queueCrewBuild.l276` |
| `src/ui.js:279` | คิว ${g.queue.length}/${cap} ดวง${over &gt; 0 ? \` · &lt;b&gt;ล้น ${over} ดวง ระเบียบกำลังตก&lt;/b&gt;\` | `queueCrewBuild.l279` |
| `src/ui.js:280` | : ' · เกินความจุแล้วระเบียบจะเริ่มตก'}${g.has('tarang') | `queueCrewBuild.l280` |
| `src/ui.js:281` | ? \` · 🔒 ตะราง ${g.held.length}/${TARANG.hold}\` : ''}&lt;/div&gt;\`; | `queueCrewBuild.l281` |
| `src/ui.js:284` | &lt;div class="top"&gt;&lt;b&gt;${s.name ? esc(s.name) + ' · ' : ''}${esc(s.who)}${s.back ? ' &lt;span style="color:var(--destructive);font-size:var(--text-xs)"&gt;↩️ ยังไม่สำนึก · กลับเข้าคิวก่อนเกิดใหม่&lt;/span&gt;' : ''}&lt;/b&gt;&lt;span class="id ${s.waited &gt; 40 ? 'wait' : ''}"&gt;#${String(s.id).padStart(3, '0')} · รอ ${s.waited} วาระ&lt;/span&gt;&lt;/div&gt; | `queueCrewBuild.l284` |
| `src/ui.js:290` | b.innerHTML += \`&lt;div class="sec"&gt;🔒 อยู่ในตะราง — ค่าข้าว ${(TARANG.feed * g.held.length).toFixed(1)} เบี้ยต่อวาระ&lt;/div&gt;\` | `queueCrewBuild.l290` |
| `src/ui.js:294` | &lt;span class="id"&gt;#${String(s.id).padStart(3, '0')} · ขังมา ${s.waited} วาระ&lt;/span&gt;&lt;/div&gt; | `queueCrewBuild.l294` |
| `src/ui.js:296` | &lt;button class="sm" data-free="${s.id}" style="margin-top:6px"&gt;🔓 เบิกตัวขึ้นแท่น&lt;/button&gt; | `queueCrewBuild.l296` |
| `src/ui.js:301` | if (sentenced.length) b.innerHTML += \`&lt;div class="sec"&gt;🔒 หลังรับทัณฑ์ — ${sentenced.length} ดวง&lt;/div&gt;\` | `queueCrewBuild.l301` |
| `src/ui.js:305` | ? x.inspected ? (x.repentant ? 'นิราตรวจแล้ว: เข็ดแล้ว · รอส่งไปประตูสวรรค์' : 'นิราตรวจแล้ว: ยังไม่เข็ด · รอส่งกลับคิว') | `queueCrewBuild.l305` |
| `src/ui.js:306` | : g.tick &lt; (x.readyAt ?? x.until ?? 0) ? \`อยู่ในตะราง · ตรวจได้อีก ${Math.max(0, (x.readyAt ?? x.until) - g.tick)} วาระ\` : 'อยู่ในตะราง · รอนิราตรวจ' | `queueCrewBuild.l306` |
| `src/ui.js:307` | : x.checked ? \`บุญตรวจแล้ว: กรรมคงเหลือ ${x.karmaLeft} · รอส่ง${x.karmaLeft &gt; 0 ? 'ไปเกิดใหม่' : 'ขึ้นสวรรค์'}\` : 'อยู่ที่ประตูสวรรค์ · รอบุญตรวจ'}&lt;/div&gt;&lt;/div&gt;\`).join(''); | `queueCrewBuild.l307` |
| `src/ui.js:322` | &lt;div class="st"&gt;แรง ${c.raeng} · ระเบียบ ${c.rabiab} · ปัญญา ${c.panya} · เมตตา ${c.metta}&lt;/div&gt; | `queueCrewBuild.l322` |
| `src/ui.js:323` | &lt;div class="st"&gt;กำลังใจ ${Math.round(c.morale)} · ${c.reader ? '&lt;b style="color:var(--gold)"&gt;อ่านสำนวนให้ท่าน — ไม่รับเวรลงทัณฑ์&lt;/b&gt;' : c.at ? 'ประจำ' + (STATIONS.find(s =&gt; s.k === c.at)?.name ?? '') : 'ว่าง — รอรับเวร'}${g.workingCrew?.has(c.k) | `queueCrewBuild.l323` |
| `src/ui.js:324` | ? (g.fed ? ' · &lt;b style="color:var(--success)"&gt;🍙 อิ่ม ทำงานไว&lt;/b&gt;' : ' · &lt;b style="color:var(--destructive)"&gt;🍙 หิว ทำงานช้า&lt;/b&gt;') : ''}&lt;/div&gt; | `queueCrewBuild.l324` |
| `src/ui.js:328` | ยังจ้างได้ · เบี้ยกรรมของท่านตอนนี้ ${Math.round(g.coin)}&lt;/div&gt;\` | `queueCrewBuild.l328` |
| `src/ui.js:333` | &lt;div class="st"&gt;แรง ${c.raeng} · ระเบียบ ${c.rabiab} · ปัญญา ${c.panya} · เมตตา ${c.metta}&lt;/div&gt; | `queueCrewBuild.l333` |
| `src/ui.js:335` | &lt;button class="sm" data-hire="${c.k}" ${g.coin &lt; c.hire ? 'disabled' : ''}&gt;จ้าง ${c.hire}&lt;/button&gt; | `queueCrewBuild.l335` |
| `src/ui.js:336` | &lt;/div&gt;\`).join('') : '&lt;div class="empty"&gt;จ้างครบทุกคนแล้ว&lt;/div&gt;') | `queueCrewBuild.l336` |
| `src/ui.js:339` | + \`&lt;div style="font-size:var(--text-xs);color:var(--muted-foreground);margin:12px 0 6px"&gt;ยามประจำโซน&lt;/div&gt; | `queueCrewBuild.l339` |
| `src/ui.js:343` | &lt;div class="st"&gt;${esc(GUARD.desc)} · ค่าแรง ${GUARD.pay}&lt;/div&gt; | `queueCrewBuild.l343` |
| `src/ui.js:345` | ${g.guard ? '&lt;button class="sm" disabled&gt;จ้างแล้ว&lt;/button&gt;' | `queueCrewBuild.l345` |
| `src/ui.js:346` | : \`&lt;button class="sm" id="hireg" ${g.coin &lt; GUARD.hire ? 'disabled' : ''}&gt;จ้าง ${GUARD.hire}&lt;/button&gt;\`} | `queueCrewBuild.l346` |
| `src/ui.js:356` | &lt;span class="n"&gt;&lt;b&gt;เสบียง 10 ห่อ&lt;/b&gt;&lt;div&gt;ค่าจ้างยมทูตที่กำลังทำงาน — หมดแล้วยังทำงานได้ แค่ช้าลง&lt;/div&gt;&lt;/span&gt; | `queueCrewBuild.l356` |
| `src/ui.js:357` | &lt;button class="sm" id="buyfood" ${g.coin &lt; BAL.foodPrice * 10 ? 'disabled' : ''}&gt;ซื้อ ${BAL.foodPrice * 10}&lt;/button&gt; | `queueCrewBuild.l357` |
| `src/ui.js:362` | &lt;span class="n"&gt;&lt;b&gt;ดอกบัวบูชา&lt;/b&gt;&lt;div&gt;วางที่ศาลาน้ำชา — ลดกรรมของท่านเอง ${KARMA_RELIEF.lotusCut} | `queueCrewBuild.l362` |
| `src/ui.js:363` | (ตอนนี้กรรมท่าน ${g.karma.toFixed(1)})&lt;/div&gt;&lt;/span&gt; | `queueCrewBuild.l363` |
| `src/ui.js:364` | &lt;button class="sm" id="buylotus" ${g.karma &lt;= 0 \|\| g.coin &lt; KARMA_RELIEF.lotusCost ? 'disabled' : ''}&gt;บูชา ${KARMA_RELIEF.lotusCost}&lt;/button&gt; | `queueCrewBuild.l364` |
| `src/ui.js:367` | สถานีทัณฑ์ — &lt;b&gt;สร้างแนวไหน สำนวนแนวนั้นถึงจะถูกส่งเข้าคิว&lt;/b&gt;&lt;br&gt; | `queueCrewBuild.l367` |
| `src/ui.js:368` | ตอนนี้โซนนี้รับได้: ${g.activeTags().map(t =&gt; \`&lt;span class="tag" style="background:${SINS[t].color}22;color:${SINS[t].color}"&gt;${SINS[t].name}&lt;/span&gt;\`).join(' ') \|\| 'ยังไม่มีเลย'}&lt;/div&gt;\` | `queueCrewBuild.l368` |
| `src/ui.js:375` | &lt;div&gt;${s.tags.length ? 'ตรงกรรม: ' + s.tags.map(t =&gt; SINS[t].name).join(' · ') : 'ไม่ใช้ลงทัณฑ์'}&lt;/div&gt; | `queueCrewBuild.l375` |
| `src/ui.js:376` | ${!built &amp;&amp; open.length ? \`&lt;div style="color:var(--gold)"&gt;สร้างแล้วจะเริ่มมีสำนวน "${open.join(' · ')}" ส่งเข้าคิว&lt;/div&gt;\` : ''}&lt;/span&gt; | `queueCrewBuild.l376` |
| `src/ui.js:377` | &lt;button class="sm" data-build="${s.k}" ${built \|\| g.coin &lt; s.cost ? 'disabled' : ''}&gt;${built ? 'สร้างแล้ว' : 'สร้าง ' + s.cost}&lt;/button&gt; | `queueCrewBuild.l377` |
| `src/ui.js:443` | \`&lt;div class="row-truth ${d.known ? '' : 'hid'}"&gt;${SINS[d.s].name} · ${esc(d.t)} (น้ำหนัก ${d.w})${d.known ? '' : ' ← เรื่องที่สำนวนไม่ได้เขียนไว้'}&lt;/div&gt;\`).join('') | `verdict.l443` |
| `src/ui.js:444` | \|\| '&lt;div class="row-truth"&gt;สำนวนว่างเปล่า&lt;/div&gt;'; | `verdict.l444` |
| `src/ui.js:447` | \`&lt;div class="row-truth ${m.fake ? 'fake' : ''}"&gt;🪷 ${esc(m.t)}${m.fake ? ' ← บุญปลอม เขากุขึ้นเอง' : \` (ลด ${m.v} วาระ)\`}&lt;/div&gt;\`).join('') | `verdict.l447` |
| `src/ui.js:448` | \|\| '&lt;div class="row-truth"&gt;ไม่มีบุญถ่วงเลย&lt;/div&gt;'; | `verdict.l448` |
| `src/ui.js:451` | const judgement = diff === 0 ? '&lt;b style="color:var(--success)"&gt;พอดีกรรมเป๊ะ&lt;/b&gt;' | `verdict.l451` |
| `src/ui.js:452` | : diff &gt; 0 ? \`&lt;b style="color:var(--destructive)"&gt;หนักเกินไป ${diff} วาระ&lt;/b&gt; — ส่วนเกินกลายเป็นกรรมของท่าน +${r.karma}\` | `verdict.l452` |
| `src/ui.js:453` | : \`&lt;b style="color:var(--warning)"&gt;เบาไป ${-diff} วาระ&lt;/b&gt; — เขายังไม่สำนึก\`; | `verdict.l453` |
| `src/ui.js:455` | return \`&lt;div class="sec"&gt;ความจริงทั้งหมด (ตอนนี้เห็นได้แล้ว)&lt;/div&gt;${truth} | `verdict.l455` |
| `src/ui.js:456` | &lt;div class="sec"&gt;บุญที่อ้าง&lt;/div&gt;${merit} | `verdict.l456` |
| `src/ui.js:457` | &lt;div class="sec"&gt;${closed ? 'ท่านตัดสินไปว่า' : 'ท่านสั่งไปว่า'}&lt;/div&gt; | `verdict.l457` |
| `src/ui.js:458` | &lt;div class="row-truth"&gt;ส่ง&lt;b&gt;${esc(st?.name ?? '—')}&lt;/b&gt; ${hit ? '&lt;span style="color:var(--success)"&gt;ตรงชนิดกรรม&lt;/span&gt;' : '&lt;span style="color:var(--destructive)"&gt;ไม่ตรงชนิดกรรม&lt;/span&gt;'} | `verdict.l458` |
| `src/ui.js:459` | · ผู้คุม ${esc(g.crewOf(crewK)?.name ?? crewName(CREW.find(c =&gt; c.k === crewK), g.zone))}&lt;/div&gt; | `verdict.l459` |
| `src/ui.js:460` | &lt;div class="row-truth"&gt;ระดับวาระ &lt;b&gt;${intensity} ${INTENSITY[intensity]}&lt;/b&gt; · สมควรได้รับ &lt;b&gt;${soul.deserved}&lt;/b&gt; → ${judgement}&lt;/div&gt; | `verdict.l460` |
| `src/ui.js:461` | ${kv([\`ธรรม ${r.tham}\`, \`เข็ด ${r.ked}\`, \`ระเบียบ ${r.rab}\`, \`รวม ${r.score}\`, | `verdict.l461` |
| `src/ui.js:479` | const chips = [\`&lt;button data-sel="me:0" ${sel.kind === 'me' ? 'aria-pressed="true"' : ''}&gt;👑 ตัวท่าน&lt;/button&gt;\`] | `profile.l479` |
| `src/ui.js:481` | .concat(g.guard ? [\`&lt;button data-sel="guard:0" ${sel.kind === 'guard' ? 'aria-pressed="true"' : ''}&gt;🛡️ ยักษ์&lt;/button&gt;\`] : []) | `profile.l481` |
| `src/ui.js:482` | .concat(g.mobs.map((m, i) =&gt; \`&lt;button data-sel="mob:${i}" ${sel.kind === 'mob' &amp;&amp; sel.key === i ? 'aria-pressed="true"' : ''}&gt;👹 เปรต&lt;/button&gt;\`)) | `profile.l482` |
| `src/ui.js:483` | .concat(g.closed.length ? [\`&lt;button data-sel="closed:0" ${sel.kind === 'closed' ? 'aria-pressed="true"' : ''}&gt;📁 คดีที่ปิดแล้ว&lt;/button&gt;\`] : []); | `profile.l483` |
| `src/ui.js:503` | const state = g.powerLocked(p) ? \`ล็อก (ขั้น ${p.lv})\` | `profile.l503` |
| `src/ui.js:504` | : p.realtime ? (ready ? 'พร้อม — ไม่ต้องใช้ item' : \`รออีก ${fmtCountdown(q.readyAt)}\`) | `profile.l504` |
| `src/ui.js:505` | : q.ammo &lt;= 0 ? 'หมด' : q.cd &gt; 0 ? \`รอ ${q.cd} คดี\` : \`พร้อม ×${q.ammo}\`; | `profile.l505` |
| `src/ui.js:515` | ...POWERS.map(p =&gt; ({ lv: p.lv, glyph: p.glyph, name: p.name, place: 'พลังไต่สวน/ต่อสู้' })), | `profile.l515` |
| `src/ui.js:516` | { lv: CREW_HELP_LV, glyph: '🤝', name: 'เรียกยมทูตช่วยในฉากต่อสู้', place: 'ฉากต่อสู้ทุกโซน' }, | `profile.l516` |
| `src/ui.js:517` | ...ZONES.filter(z =&gt; z.k !== 'th').map(z =&gt; ({ lv: z.level, glyph: '🗺️', name: \`ย้ายไป${z.name}\`, place: z.sub })), | `profile.l517` |
| `src/ui.js:522` | &lt;span style="color:${locked ? 'var(--muted-foreground)' : 'var(--gold)'}"&gt;[${locked ? \`ล็อก · ต้องขั้น ${r.lv}\` : \`ปลดล็อกแล้ว · ขั้น ${r.lv}\`}]&lt;/span&gt;&lt;/div&gt;\`; | `profile.l522` |
| `src/ui.js:524` | return profile('hero-yama', 'ยมบาท (ตัวท่าน)', \`ขั้น ${g.level}/${LEVELS.length} · ${LEVELS[g.level - 1].name}\`, | `profile.l524` |
| `src/ui.js:525` | \`ลูกของพญายม ถูกส่งมาคุมโซนสุวรรณภูมิ · ปิดคดีแล้ว ${g.casesDone} เรื่อง\`) | `profile.l525` |
| `src/ui.js:527` | + kv([\`❤️ บารมี ${Math.round(g.hp)}/${g.hpMax}\`, \`☠️ กรรม ${g.karma.toFixed(1)}\`, | `profile.l527` |
| `src/ui.js:528` | \`⚔️ พลังโจมตี ${BATTLE.atk[0]}-${BATTLE.atk[1]}\`, | `profile.l528` |
| `src/ui.js:529` | \`⭐ ห้าดาว ${g.star5}\`, \`📁 เฉลี่ย ${g.casesDone ? Math.round(g.scoreSum / g.casesDone) : 0}\`, | `profile.l529` |
| `src/ui.js:530` | \`🪙 ${Math.round(g.coin)}\`, \`🍙 เสบียง ${Math.round(g.food)}\`, \`🔥 ลูกไฟ ×${g.fireAmmo}\`]) | `profile.l530` |
| `src/ui.js:531` | + \`&lt;div class="sec"&gt;หน้าที่&lt;/div&gt; | `profile.l531` |
| `src/ui.js:532` | &lt;div class="row-truth"&gt;พิพากษาให้ &lt;b&gt;ตรงกรรม&lt;/b&gt; — ตรงชนิดบาป และหนักพอดี ไม่ใช่หนักที่สุด&lt;/div&gt; | `profile.l532` |
| `src/ui.js:533` | &lt;div class="sec"&gt;ความสามารถ&lt;/div&gt;${pw} | `profile.l533` |
| `src/ui.js:534` | &lt;div class="sec"&gt;ปลดล็อกที่ขั้นไหน&lt;/div&gt;${unlockTable} | `profile.l534` |
| `src/ui.js:535` | &lt;div class="hintline"&gt;กดตัวละครหรือวิญญาณบนฉากเพื่อดูข้อมูลของเขา&lt;/div&gt;\`; | `profile.l535` |
| `src/ui.js:541` | if (!c) return '&lt;div class="empty"&gt;ยมทูตคนนี้ไม่ได้อยู่ในสังกัดแล้ว&lt;/div&gt;'; | `profile.l541` |
| `src/ui.js:544` | ? \`กำลังคุม &lt;b&gt;${st.slots.map(sl =&gt; esc(sl.soul.who)).join(' · ')}&lt;/b&gt; ที่${esc(st.def.name)} | `profile.l544` |
| `src/ui.js:545` | · ${st.slots.length}/${g.stCap(st)} ดวง | `profile.l545` |
| `src/ui.js:546` | · คืบหน้าดวงแรก ${Math.round(100 * st.slots[0].progress / st.slots[0].need)}%\` | `profile.l546` |
| `src/ui.js:547` | : c.reader ? \`ยืนอ่านสำนวนอยู่ข้างแท่นพิพากษา — คิวตอนนี้ ${g.queue.length} ดวง\` | `profile.l547` |
| `src/ui.js:548` | : c.at ? \`ประจำ${esc(nameOfSt(c.at))} รอสำนวนถัดไป\` : 'ว่าง — รอรับเวร'; | `profile.l548` |
| `src/ui.js:549` | const strong = [['แรง', c.raeng], ['ระเบียบ', c.rabiab], ['ปัญญา', c.panya], ['เมตตา', c.metta]] | `profile.l549` |
| `src/ui.js:553` | ? \`&lt;div class="row-truth"&gt;⚔️ ท่าสู้: &lt;b&gt;${crewAbility(c.k)}&lt;/b&gt; · คูลดาวน์ ${BATTLE.crewCd} วินาที&lt;/div&gt;\` : ''; | `profile.l553` |
| `src/ui.js:556` | + kv([\`แรง ${c.raeng}\`, \`ระเบียบ ${c.rabiab}\`, \`ปัญญา ${c.panya}\`, \`เมตตา ${c.metta}\`, | `profile.l556` |
| `src/ui.js:557` | \`กำลังใจ ${Math.round(c.morale)}\`, | `profile.l557` |
| `src/ui.js:558` | ...(g.workingCrew?.has(c.k) ? [g.fed ? '🍙 อิ่ม ทำงานไว' : '🍙 หิว ทำงานช้า'] : [])]) | `profile.l558` |
| `src/ui.js:559` | + \`&lt;div class="sec"&gt;ถนัดอะไร&lt;/div&gt; | `profile.l559` |
| `src/ui.js:560` | &lt;div class="row-truth"&gt;เด่นที่ &lt;b&gt;${strong[0][0]} ${strong[0][1]}&lt;/b&gt; · อ่อนที่ ${strong[3][0]} ${strong[3][1]}&lt;/div&gt; | `profile.l560` |
| `src/ui.js:563` | ${!c.reader ? \`&lt;div class="sec"&gt;คุยกับ${esc(c.name)}&lt;/div&gt;${hungerWidget(c)}\` : ''} | `profile.l563` |
| `src/ui.js:564` | ${c.morale &lt; 40 ? '&lt;div class="row-truth hid"&gt;กำลังใจต่ำ — ทำงานช้าลง ควรให้พักที่ศาลาน้ำชา&lt;/div&gt;' : ''} | `profile.l564` |
| `src/ui.js:565` | ${c.k === 'nira' ? '&lt;button class="gold" id="open-nira-office"&gt;📋 จ้างคน · จัดทีม · ฝึกยมทูต&lt;/button&gt;' : ''}\`; | `profile.l565` |
| `src/ui.js:570` | if (!g.guard) return '&lt;div class="empty"&gt;ยังไม่ได้จ้างยักษ์ทวารบาล&lt;/div&gt;'; | `profile.l570` |
| `src/ui.js:571` | return profile(GUARD.img, GUARD.name, 'ยามประจำโซน', | `profile.l571` |
| `src/ui.js:572` | g.mobs.length ? \`กำลังไล่เปรต ${g.mobs.length} ตน\` : 'ไม่มีเปรต — เฝ้าท่าเรือฝั่งขวาอยู่') | `profile.l572` |
| `src/ui.js:574` | + kv([\`ค่าแรง ${GUARD.pay}/งวด\`]) | `profile.l574` |
| `src/ui.js:575` | + \`&lt;div class="sec"&gt;หน้าที่&lt;/div&gt;&lt;div class="row-truth"&gt;${esc(GUARD.desc)}&lt;/div&gt;\`; | `profile.l575` |
| `src/ui.js:581` | if (!m) return '&lt;div class="empty"&gt;เปรตตนนั้นถูกปราบไปแล้ว&lt;/div&gt;'; | `profile.l581` |
| `src/ui.js:583` | const kd = MOB.kinds[m.kind ?? 0] \|\| { name: MOB.name, img: MOB.img, line: '"หิว... หิว..."' }; | `profile.l583` |
| `src/ui.js:584` | return profile(kd.img, kd.name, 'วิญญาณที่หลุดออกมาก่อกวน', | `profile.l584` |
| `src/ui.js:585` | \`กัดระเบียบไป ${(MOB.drain).toFixed(2)} ต่อวาระ ตราบใดที่ยังอยู่\`) | `profile.l585` |
| `src/ui.js:587` | + kv([\`เลือด ${m.hp}/${MOB.hp}\`, \`ปราบได้ +${MOB.bounty} เบี้ยกรรม\`, \`ระเบียบ +3\`]) | `profile.l587` |
| `src/ui.js:588` | + \`&lt;div class="sec"&gt;ปราบยังไง&lt;/div&gt; | `profile.l588` |
| `src/ui.js:589` | &lt;div class="row-truth"&gt;กดปุ่ม ⚔️ ที่แถบล่าง · กดเว้นวรรค · หรือคลิกที่ตัวมันบนฉาก — | `profile.l589` |
| `src/ui.js:590` | ใช้&lt;b&gt;ลูกไฟ&lt;/b&gt;หนึ่งลูก ตอนนี้มี &lt;b&gt;×${fireN}&lt;/b&gt;&lt;/div&gt; | `profile.l590` |
| `src/ui.js:591` | ${fireN ? '' : '&lt;div class="row-truth hid"&gt;ลูกไฟหมด — เดินไปเก็บลูกไฟที่ตกอยู่บนแผนที่ก่อน&lt;/div&gt;'}\`; | `profile.l591` |
| `src/ui.js:600` | \|\| '&lt;div class="row-truth"&gt;สำนวนว่างเปล่า&lt;/div&gt;'; | `profile.l600` |
| `src/ui.js:602` | \|\| '&lt;div class="row-truth"&gt;...เขาก้มหน้าไม่พูดอะไร&lt;/div&gt;'; | `profile.l602` |
| `src/ui.js:603` | return profile(soulKey(q.sp \|\| 7), q.who, \`สำนวน #${String(q.id).padStart(3, '0')} · รอคิว ${q.waited} วาระ\`, | `profile.l603` |
| `src/ui.js:604` | q.hard ? 'สำนวนหนาผิดปกติ — คดีนี้ถูกกับผิดปนกัน' : 'รอขึ้นแท่นพิพากษา') | `profile.l604` |
| `src/ui.js:605` | + \`&lt;div class="sec"&gt;สำนวนที่นิราอ่านได้&lt;/div&gt;${rec} | `profile.l605` |
| `src/ui.js:606` | &lt;div class="sec"&gt;เขาพูดว่า&lt;/div&gt;${said} | `profile.l606` |
| `src/ui.js:607` | &lt;div class="hintline"&gt;ยังไม่ลงทัณฑ์ — ความจริงที่เหลือต้องใช้พลังขุดเอา | `profile.l607` |
| `src/ui.js:608` | เฉลยจะขึ้นตรงนี้หลังปิดคดีแล้ว&lt;/div&gt;\`; | `profile.l608` |
| `src/ui.js:616` | \`สำนวน #${String(slotx.soul.id).padStart(3, '0')} · กำลังรับทัณฑ์\`, | `profile.l616` |
| `src/ui.js:617` | \`${esc(stx.def.name)} · คืบหน้า ${Math.round(100 * slotx.progress / slotx.need)}%\`) | `profile.l617` |
| `src/ui.js:621` | return '&lt;div class="empty"&gt;ไม่พบวิญญาณดวงนี้แล้ว&lt;/div&gt;'; | `profile.l621` |
| `src/ui.js:626` | if (!g.closed.length) return '&lt;div class="empty"&gt;ยังไม่มีคดีที่ปิดครบวาระ&lt;/div&gt;'; | `profile.l626` |
| `src/ui.js:627` | return \`&lt;div class="sec" style="border:0;margin-top:0"&gt;คดีที่ปิดแล้ว — กดเพื่อดูเฉลย&lt;/div&gt;\` | `profile.l627` |
| `src/ui.js:631` | &lt;div class="deed"&gt;${esc(nameOfSt(x.stK))} · วาระ ${x.intensity} · รวม ${x.verdict.score} คะแนน&lt;/div&gt; | `profile.l631` |
| `src/ui.js:634` | return '&lt;div class="empty"&gt;เลือกตัวละครหรือวิญญาณเพื่อดูข้อมูล&lt;/div&gt;'; | `profile.l634` |
| `src/ui.js:639` | return profile(soulKey(cl.soul.sp \|\| 7), cl.soul.who, \`สำนวน #${String(cl.soul.id).padStart(3, '0')} · ปิดคดีแล้ว\`, | `profile.l639` |
| `src/ui.js:640` | \`ปิดที่วาระ ${cl.tick} · พญายมให้ ${'★'.repeat(r.stars ?? 0)}${'☆'.repeat(5 - (r.stars ?? 0))}\`) | `profile.l640` |
| `src/ui.js:670` | &lt;span class="bar ${tone}" title="หิว ${h}/100"&gt;&lt;i style="width:${h}%"&gt;&lt;/i&gt;&lt;/span&gt; | `profile.l670` |
| `src/ui.js:671` | &lt;small&gt;🍙 หิว ${h}/100${empty ? \` — ทำงานช้าลงอีก ${Math.round((1 - BAL.hungerPenalty) * 100)}%\` : ''}&lt;/small&gt; | `profile.l671` |
| `src/ui.js:673` | title="${canFeed ? \`หัก ${BAL.feedFoodCost} ห่อจากเสบียงกลาง (เหลือ ${Math.round(g.food)} ห่อ)\` : 'เสบียงกลางหมด — ซื้อเพิ่มที่แท็บก่อสร้าง'}"&gt;🍙 ให้ข้าวปั้น&lt;/button&gt; | `profile.l673` |
| `src/ui.js:687` | $('#tab-queue').textContent = \`คิววิญญาณ${g.queue.length ? \` (${g.queue.length})\` : ''}\` | `hud.l687` |
| `src/ui.js:689` | $('#tab-crew').textContent  = \`ยมทูต${hire ? \` · จ้างได้ ${hire}\` : ''}\`; | `hud.l689` |
| `src/ui.js:690` | $('#tab-build').textContent = \`ก่อสร้าง${build ? \` · สร้างได้ ${build}\` : ''}\`; | `hud.l690` |
| `src/ui.js:719` | ? [\`⚔️ เข้าต่อสู้กับเปรต (${g.mobs.length})\`, 'var(--destructive)'] | `hud.l719` |
| `src/ui.js:720` | : canThrow ? [\`🔥 ขว้างลูกไฟใส่เปรต · ×${fire.ammo}\`, 'var(--gold)'] | `hud.l720` |
| `src/ui.js:721` | : [\`🏃 เดินไปหาเปรต (${g.mobs.length}) แล้วเข้าต่อสู้\`, 'var(--muted-foreground)']; | `hud.l721` |
| `src/ui.js:724` | fab.textContent = near ? '⚔️ เข้าต่อสู้' : canThrow ? \`🔥 ขว้างลูกไฟ ×${fire.ammo}\` : '🏃 ไปหาเปรต'; | `hud.l724` |
| `src/ui.js:735` | ? \`📜 ภารกิจสาขาสำเร็จ — แฟ้มหลักฐานพร้อมใช้ก่อนสู้${g.zoneDef().bossName}\` | `hud.l735` |
| `src/ui.js:736` | : \`📜 เป้าหมายสั้น ๆ: สอบสวนจนเปิดความจริง แล้วตัดสินได้อย่างน้อย 78 คะแนน ${goal.truth}/3 คดี · รางวัล 90 เบี้ยกรรม\`; | `hud.l736` |
| `src/ui.js:744` | const want = \`นรก${g.zoneDef().name} · ${LEVELS[g.level - 1].name}\`; | `hud.l744` |
| `src/ui.js:872` | \`&lt;small style="color:${col}"&gt;${fx.score} คะแนน · ธรรม ${fx.tham} · เข็ด ${fx.ked}&lt;/small&gt;\`; | `overlay.l872` |
| `src/ui.js:875` | \`&lt;span class="who"&gt;พญายม&lt;/span&gt;${esc(fx.line)}\`, true); | `overlay.l875` |
| `src/ui.js:896` | \`&lt;span class="who"&gt;นิรา · สำนวน #${String(s.id).padStart(3, '0')}&lt;/span&gt;ผู้ตายเป็น&lt;b&gt;${esc(s.name \|\| s.who)}&lt;/b&gt;${rec}\`); | `overlay.l896` |
| `src/ui.js:920` | if (!s) { b.disabled = true; b.textContent = '🔍 ยังไม่มีใครหน้าแท่น'; b.className = ''; } | `actions.l920` |
| `src/ui.js:921` | else { b.disabled = false; b.className = near ? 'gold' : ''; b.textContent = near ? '🔍 เริ่มการสอบสวน' : '🚶 เดินไปแท่นพิพากษา'; } | `actions.l921` |
| `src/ui.js:928` | f.textContent = near ? '🔍 เริ่มการสอบสวน' : '🚶 ไปแท่นพิพากษา'; | `actions.l928` |
| `src/ui.js:946` | f.textContent = '⚔️ เข้าต่อสู้'; | `actions.l946` |
| `src/ui.js:977` | f.textContent = pier ? \`💬 คุยกับ${g.zoneDef().bossName}\` : \`⚔️ ท้าสู้${g.zoneDef().bossName}\`; | `actions.l977` |
| `src/ui.js:991` | f.textContent = '🏯 เข้าด่านชายแดน'; | `actions.l991` |
| `src/ui.js:1014` | deckBar.innerHTML = '&lt;div class="idle"&gt;ยังไม่มีวิญญาณยืนอยู่หน้าแท่น — กดเดินวาระให้เรือพาคนข้ามมา&lt;/div&gt;'; | `actions.l1014` |
| `src/ui.js:1018` | &lt;div class="grp"&gt;&lt;span class="lb"&gt;แท่นพิพากษา&lt;/span&gt; | `actions.l1018` |
| `src/ui.js:1019` | &lt;div class="row2"&gt;&lt;button class="gold" id="d-trial"&gt;🔍 เริ่มการสอบสวน&lt;/button&gt;&lt;/div&gt;&lt;/div&gt;\`; | `actions.l1019` |
| `src/ui.js:1029` | great:    { t:'พ่อว่าตรงกรรม',      c:'var(--success)' }, | `actions.l1029` |
| `src/ui.js:1030` | ok:       { t:'พ่อว่าใช้ได้',        c:'var(--gold)' }, | `actions.l1030` |
| `src/ui.js:1031` | cruel:    { t:'พ่อว่าลงเกินกรรม',    c:'var(--destructive)' }, | `actions.l1031` |
| `src/ui.js:1032` | bad:      { t:'พ่อว่าเดา ไม่ได้อ่าน', c:'var(--destructive)' }, | `actions.l1032` |
| `src/ui.js:1033` | terrible: { t:'พ่อตีกลับทั้งเรื่อง',  c:'var(--destructive)' }, | `actions.l1033` |
| `src/ui.js:1094` | dlg.innerHTML = \`&lt;div class="intro-comic" role="region" aria-label="ฉากมาถึง ${esc(z.bossName)} หน้า ${i + 1} จาก ${lines.length}"&gt; | `zoneIntro.l1094` |
| `src/ui.js:1097` | &lt;div class="intro-comic-head"&gt;&lt;span&gt;👑 ${esc(z.bossName)}มาถึงแล้ว&lt;/span&gt;&lt;span&gt;${i + 1} / ${lines.length}&lt;/span&gt;&lt;/div&gt; | `zoneIntro.l1097` |
| `src/ui.js:1100` | &lt;div class="intro-comic-controls"&gt;&lt;button class="gold" id="arrive-next"&gt;${i + 1 === lines.length ? '⚔️ สู้เลย' : 'หน้าถัดไป →'}&lt;/button&gt;&lt;/div&gt; | `zoneIntro.l1100` |
| `src/ui.js:1115` | dlg.innerHTML = \`&lt;div class="intro-comic" role="region" aria-label="แนะนำ ${esc(z.name)}"&gt; | `zoneIntro.l1115` |
| `src/ui.js:1118` | &lt;div class="intro-comic-head"&gt;&lt;span&gt;อเวจี · เปิดสาขาใหม่&lt;/span&gt;&lt;span&gt;โซน ${zn}&lt;/span&gt;&lt;/div&gt; | `zoneIntro.l1118` |
| `src/ui.js:1124` | &lt;div class="intro-comic-controls"&gt;&lt;span class="hint"&gt;นิราตามท่านมา · สถานีและยมทูตต้องเริ่มจัดการใหม่ในแต่ละสาขา&lt;/span&gt; | `zoneIntro.l1124` |
| `src/ui.js:1125` | &lt;button class="gold" data-close&gt;เริ่มงาน&lt;/button&gt;&lt;/div&gt; | `zoneIntro.l1125` |
| `src/ui.js:1151` | ? 'เริ่มเกมใหม่จากโซนแรก' : 'เริ่มโซนนี้ใหม่ โดยเก็บสาขาที่ผ่านมาก่อนหน้าไว้'}&lt;/div&gt; | `ending.l1151` |
| `src/ui.js:1152` | &lt;div class="row"&gt;&lt;button class="gold" id="again"&gt;${g.zone === 'th' ? 'เริ่มเกมใหม่' : 'เริ่มโซนนี้ใหม่'}&lt;/button&gt;&lt;/div&gt;\`, | `ending.l1152` |
| `src/ui.js:1158` | &lt;div class="hint"&gt;ปิดคดีทั้งหมด ${g.casesDone} เรื่อง · คะแนนเฉลี่ย ${g.casesDone ? Math.round(g.scoreSum / g.casesDone) : 0} · | `ending.l1158` |
| `src/ui.js:1159` | กรรมที่ท่านสะสมเอง ${g.karma.toFixed(1)}&lt;/div&gt; | `ending.l1159` |
| `src/ui.js:1162` | &lt;div class="row"&gt;&lt;button id="mine"&gt;📕 เปิดแฟ้มของท่าน&lt;/button&gt; | `ending.l1162` |
| `src/ui.js:1163` | &lt;button class="gold" id="again"&gt;เริ่มใหม่&lt;/button&gt;&lt;/div&gt;\`, | `ending.l1163` |
| `src/ui.js:1181` | #${String(x.id).padStart(3, '0')} · ${esc(x.who)}${x.back ? ' &lt;span style="color:var(--destructive)"&gt;(กลับมารอบสอง)&lt;/span&gt;' : ''} | `ending.l1181` |
| `src/ui.js:1182` | — สมควร ${x.deserved} วาระ แต่ท่านให้ไป ${x.deserved + x.over} | `ending.l1182` |
| `src/ui.js:1183` | &lt;b style="color:var(--destructive)"&gt;เกิน ${x.over}&lt;/b&gt; · กรรมตกมา +${x.karma}&lt;/div&gt;\`; | `ending.l1183` |
| `src/ui.js:1191` | modal(\`&lt;h2&gt;📕 สำนวนของ ${esc('ยมบาทประจำโซนสุวรรณภูมิ')}&lt;/h2&gt; | `ending.l1191` |
| `src/ui.js:1192` | &lt;div class="hint"&gt;ปิดคดี ${g.casesDone} เรื่อง · ห้าดาว ${five} ครั้ง · | `ending.l1192` |
| `src/ui.js:1193` | ลงเกินกรรม ${over.length} คดี · เบาไป ${short.length} คดี · ส่งผิดที่ ${wrong.length} คดี · | `ending.l1193` |
| `src/ui.js:1194` | คดีที่เขากลับมาเพราะท่านปล่อยเบา ${g.returned} คดี&lt;/div&gt; | `ending.l1194` |
| `src/ui.js:1196` | &lt;div class="sec"&gt;คดีที่ท่านลงเกินกรรม — กรรมส่วนเกินรวม ${sumK}&lt;/div&gt; | `ending.l1196` |
| `src/ui.js:1198` | (over.length &gt; 14 ? \`&lt;div class="row-truth" style="color:var(--muted-foreground)"&gt;…และอีก ${over.length - 14} คดี&lt;/div&gt;\` : '') | `ending.l1198` |
| `src/ui.js:1199` | : '&lt;div class="row-truth" style="color:var(--success)"&gt;ไม่มีเลยสักคดี&lt;/div&gt;'} | `ending.l1199` |
| `src/ui.js:1201` | &lt;div class="sec"&gt;คดีที่ท่านปล่อยเบาไป&lt;/div&gt; | `ending.l1201` |
| `src/ui.js:1202` | ${short.length ? \`&lt;div class="row-truth"&gt;${short.length} คดี — ในนั้น &lt;b&gt;${g.returned} คน&lt;/b&gt;กลับมายืนหน้าแท่นอีกครั้ง | `ending.l1202` |
| `src/ui.js:1203` | พร้อมเรื่องที่เขาไปทำต่อหลังท่านปล่อยไป&lt;/div&gt;\` | `ending.l1203` |
| `src/ui.js:1204` | : '&lt;div class="row-truth" style="color:var(--success)"&gt;ไม่มีเลยสักคดี&lt;/div&gt;'} | `ending.l1204` |
| `src/ui.js:1208` | &lt;div class="row"&gt;&lt;button id="backend"&gt;ย้อนกลับ&lt;/button&gt; | `ending.l1208` |
| `src/ui.js:1209` | &lt;button class="gold" id="again2"&gt;เริ่มใหม่&lt;/button&gt;&lt;/div&gt;\`, | `ending.l1209` |
| `src/ui.js:1237` | function bossModal(title, text, btn = 'รับทราบ') { | `ending.l1237` |
| `src/ui.js:1255` | &lt;div class="punish-title"&gt;&lt;small&gt;บทลงทัณฑ์ของผู้ตัดสิน&lt;/small&gt;&lt;b&gt;${esc(p.title)}&lt;/b&gt;&lt;/div&gt; | `ending.l1255` |
| `src/ui.js:1256` | &lt;div class="punish-yama"&gt;&lt;img src="${heroFace()}" alt="ยมน้อยอยู่ในกระทะทองแดง"&gt;&lt;/div&gt; | `ending.l1256` |
| `src/ui.js:1261` | &lt;div class="hint"&gt;บารมีเหลือ ${Math.max(0, Math.round(g.hp))} — เดินไปที่ 🍵 ศาลาน้ำชาเพื่อพักฟื้น&lt;/div&gt; | `ending.l1261` |
| `src/ui.js:1262` | &lt;div class="row"&gt;&lt;button class="gold" data-close data-punish-done disabled&gt;รับโทษ...&lt;/button&gt;&lt;/div&gt; | `ending.l1262` |
| `src/ui.js:1266` | setTimeout(() =&gt; { if (b?.isConnected) { b.disabled = false; b.textContent = 'กลับไปคุมโซน'; } }, 1700); | `ending.l1266` |
| `src/ui.js:1271` | modal(\`&lt;h2&gt;วิธีเล่น&lt;/h2&gt; | `help.l1271` |
| `src/ui.js:1273` | ท่านคือยมบาทมือใหม่ที่พ่อส่งมาคุมนรกโซนไทย งานคือ &lt;b&gt;พิพากษาให้ตรงกรรม&lt;/b&gt; ไม่ใช่ลงโทษให้แรงที่สุด&lt;br&gt; | `help.l1273` |
| `src/ui.js:1275` | เกมจะค่อย ๆ สอนทีละเรื่องเองผ่านแถบสีทองใต้หัวเรื่อง — หน้านี้ไว้เปิดย้อนดูตอนลืม&lt;/span&gt;&lt;/p&gt; | `help.l1275` |
| `src/ui.js:1277` | &lt;div class="tline"&gt;&lt;b&gt;สามแถบที่ต้องดูตลอด&lt;/b&gt;&lt;div&gt; | `help.l1277` |
| `src/ui.js:1278` | ❤️ &lt;b&gt;บารมี&lt;/b&gt; = ชีวิตของท่าน หมดแล้วจบเกม · | `help.l1278` |
| `src/ui.js:1279` | ⚖️ &lt;b&gt;ระเบียบ&lt;/b&gt; = คูณรายได้ทุกคดี แตะ 0 แล้วโดนเรียกกลับ · | `help.l1279` |
| `src/ui.js:1280` | ☠️ &lt;b&gt;กรรมท่าน&lt;/b&gt; = บาปที่ตกใส่ตัวเอง เต็ม 100 แล้วชื่อท่านไปอยู่ในคิว&lt;br&gt; | `help.l1280` |
| `src/ui.js:1281` | &lt;b&gt;กดที่แถบไหนก็ได้บนหัวเรื่อง&lt;/b&gt; เพื่อดูว่ามันขึ้นลงเพราะอะไร และหมดแล้วเกิดอะไร&lt;/div&gt;&lt;/div&gt; | `help.l1281` |
| `src/ui.js:1284` | &lt;li&gt;&lt;b&gt;ทีมของท่าน&lt;/b&gt; — &lt;b&gt;นิรา&lt;/b&gt; อ่านสำนวนให้ฟังอย่างเดียว (ไม่รับเวรลงทัณฑ์) · | `help.l1284` |
| `src/ui.js:1285` | &lt;b&gt;ทัณฑ์&lt;/b&gt; คือผู้คุมคนเดียวที่มีตอนเริ่ม · ถ้าคนไม่พอให้จ้างยมทูตเพิ่ม | `help.l1285` |
| `src/ui.js:1286` | แต่สถานีจะเดินเฉพาะตอนท่านยืนอยู่ตรงนั้น และช้ากว่ายมทูต&lt;/li&gt; | `help.l1286` |
| `src/ui.js:1287` | &lt;li&gt;&lt;b&gt;เดิน&lt;/b&gt; — คลิกที่พื้น หรือกด WASD / ลูกศร · | `help.l1287` |
| `src/ui.js:1288` | ลงธารลาวาหรือแม่น้ำวิญญาณไม่ได้&lt;/li&gt; | `help.l1288` |
| `src/ui.js:1289` | &lt;li&gt;อ่านสำนวนจากหมุด 📜 เหนือหัว&lt;b&gt;นิรา&lt;/b&gt; และคำแก้ตัวจากหมุด 💬 เหนือหัววิญญาณ (ชี้เมาส์ หรือแตะ)&lt;/li&gt; | `help.l1289` |
| `src/ui.js:1290` | &lt;li&gt;&lt;b&gt;ไต่สวนก่อนตัดสิน&lt;/b&gt; — คดีทั่วไปให้มองหาคำที่ขัดกับสำนวน ส่วนคดีมีชื่อจะเริ่มจาก | `help.l1290` |
| `src/ui.js:1291` | &lt;b&gt;ภาพลักษณ์ภายนอก&lt;/b&gt;เท่านั้น ให้เลือกประเด็นที่น่าสงสัยเพื่อค่อย ๆ เปิดรายการกรรม | `help.l1291` |
| `src/ui.js:1292` | จี้ถูก = เขาสารภาพเรื่องที่ยังไม่เปิดให้&lt;b&gt;ฟรี&lt;/b&gt; · จี้ผิด = เสียจังหวะไปเปล่า ๆ | `help.l1292` |
| `src/ui.js:1293` | (จี้ได้ 2 ครั้งต่อคดี)&lt;/li&gt; | `help.l1293` |
| `src/ui.js:1294` | &lt;li&gt;ใช้พลังขุดความจริง — &lt;b&gt;มีจำนวนจำกัด&lt;/b&gt; ใช้แล้วต้องเข้าไปในสถานีที่เกี่ยวข้อง | `help.l1294` |
| `src/ui.js:1295` | และ&lt;b&gt;เดินไปเก็บไอเท็มในฉาก&lt;/b&gt;มาเติม&lt;/li&gt; | `help.l1295` |
| `src/ui.js:1296` | &lt;li&gt;&lt;b&gt;คำตัดสินไม่จบที่คดีนั้น&lt;/b&gt; — ตัดสินเบาไป เขาไม่เข็ด ปล่อยไปแล้วไปก่อเรื่องต่อ | `help.l1296` |
| `src/ui.js:1297` | แล้ว&lt;b&gt;กลับมายืนหน้าแท่นอีกครั้ง&lt;/b&gt;พร้อมสำนวนที่หนากว่าเดิม (มีป้าย ↩️ ในคิว)&lt;/li&gt; | `help.l1297` |
| `src/ui.js:1298` | &lt;li&gt;จบเกมแล้วนิราจะวาง&lt;b&gt;แฟ้มชื่อของท่านเอง&lt;/b&gt;ไว้ — เปิดอ่านได้จริง | `help.l1298` |
| `src/ui.js:1299` | ข้างในคือทุกคดีที่ท่านลงเกินกรรม และทุกคนที่กลับมาเพราะท่านปล่อยเบา&lt;/li&gt; | `help.l1299` |
| `src/ui.js:1300` | &lt;li&gt;เลือก &lt;b&gt;สถานีที่ตรงชนิดกรรม&lt;/b&gt; + &lt;b&gt;ระดับวาระให้พอดี&lt;/b&gt; แล้วออกหมาย&lt;/li&gt; | `help.l1300` |
| `src/ui.js:1301` | &lt;li&gt;&lt;b&gt;สถานีที่มี = สำนวนที่จะได้รับ&lt;/b&gt; — โซนนี้รับได้เฉพาะกรรมที่ท่านมีที่ลง | `help.l1301` |
| `src/ui.js:1302` | มีแต่กระทะทองแดง ก็มีแต่คดีฉ้อโกงกับมัวเมา · สร้างป่าดาบเพิ่ม คดีฆ่า/ทำร้ายกับวจีทุจริตถึงจะเริ่มเข้าคิว | `help.l1302` |
| `src/ui.js:1303` | (แท็บ &lt;b&gt;ก่อสร้าง&lt;/b&gt; บอกไว้ทุกหลังว่าสร้างแล้วเปิดแนวไหน)&lt;/li&gt; | `help.l1303` |
| `src/ui.js:1304` | &lt;li&gt;พญายมให้ดาว 0–5 ดวงทุกคดี · &lt;b&gt;ห้าดาวครบห้าครั้ง = เลื่อนขั้น&lt;/b&gt; · | `help.l1304` |
| `src/ui.js:1305` | ห้าดาวยัง&lt;b&gt;ลดกรรมของท่าน&lt;/b&gt;ให้ด้วยครั้งละ ${KARMA_RELIEF.star5}&lt;/li&gt; | `help.l1305` |
| `src/ui.js:1306` | &lt;li&gt;&lt;b&gt;ศูนย์ดาว = โดนลูกไฟ&lt;/b&gt; บารมีหาย 1 ใน 5 · โดนครบห้าครั้งจบเกม | `help.l1306` |
| `src/ui.js:1307` | เดินไปเก็บ&lt;b&gt;หีบยา&lt;/b&gt;เติมบารมีได้&lt;/li&gt; | `help.l1307` |
| `src/ui.js:1308` | &lt;li&gt;&lt;b&gt;กรรมท่านลดได้&lt;/b&gt; — ห้าดาว · เก็บ&lt;b&gt;ดอกบัว&lt;/b&gt;ที่ตกบนแผนที่ตอนกรรมเกิน 40 · | `help.l1308` |
| `src/ui.js:1309` | หรือสร้าง&lt;b&gt;ศาลาน้ำชา&lt;/b&gt;แล้วบูชาดอกบัวที่แท็บก่อสร้าง (${KARMA_RELIEF.lotusCost} เบี้ย ลด ${KARMA_RELIEF.lotusCut})&lt;/li&gt; | `help.l1309` |
| `src/ui.js:1310` | &lt;li&gt;ทุก ๆ ไม่กี่คดีจะมี &lt;b&gt;เปรต&lt;/b&gt; ขึ้นมาก่อกวน (กรรมท่านยิ่งสูงยิ่งมาถี่) ปล่อยไว้ระเบียบตกเรื่อย ๆ — | `help.l1310` |
| `src/ui.js:1311` | &lt;b&gt;เดินเข้าไปใกล้แล้วฟาดได้ฟรี ไม่ต้องใช้ลูกไฟ&lt;/b&gt; ป้ายเหนือหัวมันจะบอกเองว่ากดได้แล้ว · | `help.l1311` |
| `src/ui.js:1312` | กดได้ 3 ทาง: ปุ่ม &lt;b&gt;⚔️&lt;/b&gt; ที่แถบล่าง · กด &lt;b&gt;เว้นวรรค&lt;/b&gt; · หรือคลิกที่ตัวมัน&lt;br&gt; | `help.l1312` |
| `src/ui.js:1313` | มี&lt;b&gt;ลูกไฟ&lt;/b&gt;อยู่ก็&lt;b&gt;ขว้างจากไกลได้เลย&lt;/b&gt;ไม่ต้องเดินไป (ลูกละตน) หรือจ้าง&lt;b&gt;ยักษ์ทวารบาล&lt;/b&gt;ให้ไล่ปราบแทน&lt;/li&gt; | `help.l1313` |
| `src/ui.js:1314` | &lt;li&gt;&lt;b&gt;เร่งทัณฑ์เอง&lt;/b&gt; — ไปยืนที่สถานีที่กำลังลงทัณฑ์ แล้วกด &lt;b&gt;เว้นวรรค&lt;/b&gt; | `help.l1314` |
| `src/ui.js:1315` | — แต่&lt;b&gt;ลงมือเองก็เป็นกรรมของท่าน&lt;/b&gt; ครั้งละนิดหน่อย | `help.l1315` |
| `src/ui.js:1316` | ส่งคนเมตตาสูงอย่างบุญไปคุม กรรมจะตกใส่ท่านครึ่งเดียว&lt;/li&gt; | `help.l1316` |
| `src/ui.js:1317` | &lt;li&gt;&lt;b&gt;กดตัวละครหรือวิญญาณบนฉาก&lt;/b&gt; แล้วดูรายละเอียดที่แผง &lt;b&gt;ข้อมูล&lt;/b&gt; ด้านขวา — | `help.l1317` |
| `src/ui.js:1318` | &lt;b&gt;คดีที่ปิดแล้วจะเฉลยความจริงทั้งหมด&lt;/b&gt;ว่าเราตัดสินถูกหรือพลาดตรงไหน&lt;/li&gt; | `help.l1318` |
| `src/ui.js:1319` | &lt;li&gt;บางคดี&lt;b&gt;ถูกกับผิดปนกัน&lt;/b&gt; จนสำนวนด้านเดียวตัดสินไม่ได้ — พวกนี้ต้องใช้พลังก่อน&lt;/li&gt; | `help.l1319` |
| `src/ui.js:1320` | &lt;li&gt;&lt;b&gt;ยมทูตแต่ละคนหิวได้&lt;/b&gt; (แถบ 🍙 แยกจากเสบียงกองกลาง) ดูและป้อนข้าวปั้นได้ 3 ทาง: | `help.l1320` |
| `src/ui.js:1321` | ที่&lt;b&gt;โต๊ะนิรา&lt;/b&gt; · ที่&lt;b&gt;หน้าต่างสถานี&lt;/b&gt;ที่เขาประจำอยู่ · หรือกด&lt;b&gt;ตัวเขาบนแผนที่&lt;/b&gt;โดยตรง | `help.l1321` |
| `src/ui.js:1322` | หิวจนหมดแถบ (0) จะ&lt;b&gt;ทำงานช้าลงอีกชั้นหนึ่ง&lt;/b&gt; — ป้อนข้าวปั้นหักจากเสบียงกองกลางครั้งละ 1 ห่อ | `help.l1322` |
| `src/ui.js:1323` | ไม่มีเสบียงเหลือก็ป้อนไม่ได้ ต้องซื้อเพิ่มที่แท็บก่อสร้างก่อน&lt;/li&gt; | `help.l1323` |
| `src/ui.js:1325` | &lt;p style="font-size:var(--text-xs);color:var(--muted-foreground)"&gt;เกมบันทึกเองอัตโนมัติทุกไม่กี่วินาที ปิดแล้วเปิดใหม่เล่นต่อได้&lt;/p&gt; | `help.l1325` |
| `src/ui.js:1326` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;เข้าใจแล้ว&lt;/button&gt;&lt;/div&gt;\`); | `help.l1326` |
| `src/ui.js:1437` | ${closable ? '&lt;button class="x" data-close title="ปิดห้องสอบสวน"&gt;✕&lt;/button&gt;' : ''} | `arena.l1437` |
| `src/ui.js:1438` | &lt;button class="icon-settings-mini" data-arena-settings title="ตั้งค่า" | `arena.l1438` |
| `src/ui.js:1444` | &lt;span class="plate"&gt;&lt;b&gt;${esc(helper.name)}&lt;/b&gt;&lt;span class="sub"&gt;เข้ามาช่วย&lt;/span&gt;&lt;/span&gt; | `arena.l1444` |
| `src/ui.js:1453` | &lt;span class="plate"&gt;&lt;b&gt;${esc(HERO_NAME)}&lt;/b&gt;&lt;span class="sub"&gt;ยมบาทประจำ${esc(g.zoneDef().name)}&lt;/span&gt; | `arena.l1453` |
| `src/ui.js:1454` | ${bar(hp ? hp.youHp : 0, hp ? hp.youMax : 1, '', 'บารมี')}&lt;/span&gt; | `arena.l1454` |
| `src/ui.js:1460` | ${bar(hp ? hp.foeHp : 0, hp ? hp.foeMax : 1, 'foe', 'กำลังใจ')}&lt;/span&gt; | `arena.l1460` |
| `src/ui.js:1507` | cut.innerHTML = \`&lt;img src="${src}" alt="ภาพคั่นท่าพิเศษ — แตะเพื่อข้าม"&gt;${ultimate ? \`&lt;strong style="position:absolute;bottom:8%;left:50%;transform:translateX(-50%);z-index:3;color:#fff;text-shadow:0 3px 8px #000;font-size:clamp(22px,4vw,48px)"&gt;${esc(ultimate.name)}&lt;/strong&gt;\` : ''}\`; | `arena.l1507` |
| `src/ui.js:1551` | !pick.st &amp;&amp; 'ที่ไหน', !pick.cr &amp;&amp; 'ใครคุม', !(heaven \|\| pick.inten) &amp;&amp; 'ความแรง', | `trial.l1551` |
| `src/ui.js:1559` | &lt;span class="chip"&gt;❤️ บารมี ${bar(100 * g.hp / g.hpMax, 'hp')} &lt;b&gt;${Math.round(g.hp)}&lt;/b&gt;&lt;/span&gt; | `trial.l1559` |
| `src/ui.js:1560` | &lt;span class="chip"&gt;⚖️ ระเบียบ ${bar(g.order)} &lt;b&gt;${Math.round(g.order)}&lt;/b&gt;&lt;/span&gt; | `trial.l1560` |
| `src/ui.js:1561` | &lt;span class="chip"&gt;☠️ กรรม ${bar(g.karma, 'karma')} &lt;b&gt;${g.karma.toFixed(1)}&lt;/b&gt;&lt;/span&gt; | `trial.l1561` |
| `src/ui.js:1569` | &lt;button id="t-jail" ${g.has('tarang') &amp;&amp; g.jailFree() &gt; 0 ? '' : 'disabled'} title="${g.has('tarang') ? 'ต้องมีที่ว่างในตะราง' : 'สร้างตะรางรอวาระก่อน'}"&gt;&lt;img class="tab-ico" src="img/ui/icon-lock.png" alt=""&gt;${esc(t('trial.lockCase'))}&lt;/button&gt; | `trial.l1569` |
| `src/ui.js:1580` | const outOfAmmoHint = p.k === 'hypno' ? 'หมดแล้ว — ซื้อจากบุญที่ประตูสวรรค์' | `trial.l1580` |
| `src/ui.js:1581` | : p.k === 'mirror' ? 'หมดแล้ว — เดินเก็บบนแผนที่ หรือคุยกับกานต์ที่หอส่องกรรม' | `trial.l1581` |
| `src/ui.js:1582` | : 'หมดแล้ว — เดินไปเก็บบนแผนที่'; | `trial.l1582` |
| `src/ui.js:1583` | const why = locked ? \`ล็อก · ต้องเป็น${LEVELS[p.lv - 1].name}ก่อน\` | `trial.l1583` |
| `src/ui.js:1584` | : p.realtime ? (ok ? 'พร้อมใช้ — ไม่ต้องใช้ item' : \`รออีก ${fmtCountdown(pw.readyAt)}\`) | `trial.l1584` |
| `src/ui.js:1586` | : pw.cd &gt; 0 ? \`รออีก ${pw.cd} คดี\` : p.desc; | `trial.l1586` |
| `src/ui.js:1594` | ${x.def.k === pick.st ? 'aria-pressed="true"' : ''} title="${esc(x.def.name + (busy ? ' · เต็ม' : ''))}"&gt; | `trial.l1594` |
| `src/ui.js:1596` | }).join('') : '&lt;span class="idle"&gt;ยังไม่มีสถานที่&lt;/span&gt;'; | `trial.l1596` |
| `src/ui.js:1599` | title="${esc(c.name + ' · แรง ' + c.raeng + ' · ระเบียบ ' + c.rabiab + ' · ปัญญา ' + c.panya + ' · เมตตา ' + c.metta)}"&gt; | `trial.l1599` |
| `src/ui.js:1601` | &lt;b&gt;${esc(c.name)}&lt;/b&gt;&lt;small&gt;แรง ${c.raeng} · ระเบียบ ${c.rabiab}&lt;/small&gt;&lt;/button&gt;\`).join('') : '&lt;span class="idle"&gt;ไม่มีใครว่าง&lt;/span&gt;'; | `trial.l1601` |
| `src/ui.js:1607` | title="ระดับ ${i} ${esc(INTENSITY[i])}"&gt;${orbImg(forceIcon(i), INTENSITY[i])}&lt;b&gt;${esc(INTENSITY[i])}&lt;/b&gt;&lt;/button&gt;\`).join(''); | `trial.l1607` |
| `src/ui.js:1612` | (pick.inten \|\| heaven) &amp;&amp; \`&lt;span class="command-selected selected-force"&gt;${heaven ? '&lt;strong&gt;🕊️&lt;/strong&gt;' : orbImg(forceIcon(pick.inten), INTENSITY[pick.inten])}&lt;b&gt;${heaven?'อัตโนมัติ':INTENSITY[pick.inten]}&lt;/b&gt;&lt;/span&gt;\` | `trial.l1612` |
| `src/ui.js:1619` | const opt = \`&lt;h4&gt;${s.case ? esc(t('trial.chooseIssue')) : 'ข้ออ้างของเขา — เลือกข้อที่ขัดกับสำนวน'}&lt;/h4&gt;\` + s.lines.map(l =&gt; { | `trial.l1619` |
| `src/ui.js:1632` | &lt;button class="x" data-close title="ปิดห้องสอบสวน"&gt;✕&lt;/button&gt; | `trial.l1632` |
| `src/ui.js:1633` | &lt;button class="icon-settings-mini" data-arena-settings title="ตั้งค่า"&gt;&lt;img src="img/ui/icon-setting2.png" alt=""&gt;&lt;/button&gt; | `trial.l1633` |
| `src/ui.js:1638` | &lt;span class="trial-case-no"&gt;สำนวน #${String(s.id).padStart(3, '0')}&lt;/span&gt; | `trial.l1638` |
| `src/ui.js:1649` | ${missingParts.length ? \`&lt;div class="trial-missing" role="status"&gt;⚠️ ออกหมายไม่ได้ — ยังไม่ได้เลือก ${missingParts.join(' · ')}&lt;/div&gt;\` : ''} | `trial.l1649` |
| `src/ui.js:1650` | &lt;div class="trial-top-actions" aria-label="คำสั่งคดี"&gt;${topActions}&lt;/div&gt; | `trial.l1650` |
| `src/ui.js:1657` | ${!s.face &amp;&amp; !claimed.length &amp;&amp; !known.length ? '&lt;div class="deed"&gt;สำนวนว่างเปล่า&lt;/div&gt;' : ''} | `trial.l1657` |
| `src/ui.js:1658` | ${s.back ? \`&lt;div class="deed" style="color:var(--destructive)"&gt;↩️ ลงทัณฑ์ ${s.back.gave} วาระแล้วยังไม่สำนึก · ถูกส่งกลับเข้าคิวก่อนเกิดใหม่&lt;/div&gt;\` : ''} | `trial.l1658` |
| `src/ui.js:1667` | \|\| '&lt;div&gt;ยังไม่มีอะไร — เขายืนก้มหน้าอยู่เฉย ๆ&lt;/div&gt;'}&lt;/div&gt; | `trial.l1667` |
| `src/ui.js:1692` | guide.innerHTML = \`&lt;button class="guide-close"&gt;ปิดคู่มือ ✕&lt;/button&gt;&lt;h2&gt;คู่มือนรก&lt;/h2&gt; | `trial.l1692` |
| `src/ui.js:1693` | &lt;p&gt;กติกาของอเวจี · อ่านสำนวน → ไต่สวน → เลือกสถานที่ ผู้คุม และความแรง → ออกหมาย&lt;/p&gt; | `trial.l1693` |
| `src/ui.js:1694` | &lt;h3&gt;ส่งคดีไปที่ไหน&lt;/h3&gt;&lt;p&gt;เลือกสถานที่ให้ตรงกับกรรมหลักที่พบในสำนวน ต้องสร้างสถานที่และมีที่ว่างก่อน&lt;/p&gt; | `trial.l1694` |
| `src/ui.js:1695` | &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;คดี&lt;/th&gt;&lt;th&gt;สถานที่&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;${STATIONS.filter(x=&gt;x.tags.length).map(x=&gt;\`&lt;tr&gt;&lt;td&gt;${x.tags.map(k=&gt;SINS[k]?.name\|\|k).join(' / ')}&lt;/td&gt;&lt;td&gt;${x.name}&lt;/td&gt;&lt;/tr&gt;\`).join('')}&lt;/tbody&gt;&lt;/table&gt; | `trial.l1695` |
| `src/ui.js:1696` | &lt;p&gt;ผู้บริสุทธิ์ใช้ประตูสวรรค์ ซึ่งไม่ต้องเลือกความแรง หอทะเบียนกรรมรับงานทั่วไปได้ แต่ควรเลือกสถานที่เฉพาะกรรมเมื่อมีพร้อม&lt;/p&gt; | `trial.l1696` |
| `src/ui.js:1697` | &lt;h3&gt;เลือกระดับความแรงและบรรเทาโทษ&lt;/h3&gt;&lt;p&gt;ระดับ 1 ว่ากล่าว · 2 เบา · 3 ปานกลาง · 4 หนัก · 5 มหันต์ ใช้ความหนักของการกระทำทั้งหมดประกอบกัน อย่าเลือกสูงสุดทุกคดี&lt;/p&gt; | `trial.l1697` |
| `src/ui.js:1698` | &lt;p&gt;ไต่สวนเพื่อเปิดเผยข้อเท็จจริงและตรวจบุญที่อ้าง บุญที่เป็นจริงช่วยลดโทษ ส่วนคำอ้างเท็จไม่นับ การลงโทษเกินเพิ่มกรรมของท่าน ลงโทษเบาเกินอาจไม่ทำให้สำนึก หากยังไม่พร้อมให้พักคดี หรือขังรอเมื่อมีตะรางและที่ว่าง&lt;/p&gt; | `trial.l1698` |
| `src/ui.js:1699` | &lt;p&gt;เมื่อรับทัณฑ์ครบ วิญญาณจะไปตะราง ตรวจรายชื่อกับนิรา: เข็ดแล้วส่งต่อไปประตูสวรรค์ ยังไม่เข็ดส่งกลับคิว ที่ประตูสวรรค์ให้บุญตรวจกรรมคงเหลือ: ยังมีกรรมส่งไปเกิดใหม่ หมดกรรมส่งขึ้นสวรรค์และรับรางวัลจากพ่อ&lt;/p&gt; | `trial.l1699` |
| `src/ui.js:1700` | &lt;h3&gt;เลือกผู้คุม&lt;/h3&gt;&lt;p&gt;แรงช่วยให้งานเร็ว ระเบียบช่วยคุณภาพงาน ปัญญาสูงช่วยให้สำนึก เมตตาช่วยลดกรรมจากโทษที่เกิน แต่ไม่ทำให้คำตัดสินผิดกลายเป็นถูก&lt;/p&gt; | `trial.l1700` |
| `src/ui.js:1701` | ${CREW.filter(c=&gt;!c.reader).map(c=&gt;\`&lt;p&gt;&lt;b&gt;${esc(crewName(c, g.zone))}&lt;/b&gt; — ${c.duty}&lt;br&gt;แรง ${c.raeng} · ระเบียบ ${c.rabiab} · ปัญญา ${c.panya} · เมตตา ${c.metta}&lt;br&gt;ในสนามรบ: ${crewAbility(c.k)}&lt;/p&gt;\`).join('')} | `trial.l1701` |
| `src/ui.js:1702` | &lt;h3&gt;ทีมต่อสู้&lt;/h3&gt;&lt;p&gt;จัดทีมยมทูตได้ 2 คนก่อนเข้าสู้ ใช้ความสามารถของแต่ละคนผ่านเมนูยมทูต คูลดาวน์คนละ ${BATTLE.crewCd} วินาที และใช้กำลังใจ ${BATTLE.crewMorale} หน่วย แถบสีเหลืองเต็มจึงพร้อมใช้ใหม่&lt;/p&gt;\`; | `trial.l1702` |
| `src/ui.js:1755` | b.title = ok ? 'ตวาดข่มขู่ — พร้อมใช้ — ไม่ต้องใช้ item' : \`ตวาดข่มขู่ — รออีก ${fmtCountdown(g.powerOf('roar').readyAt)}\`; | `trial.l1755` |
| `src/ui.js:1776` | dlg.innerHTML = \`&lt;h2&gt;📋 โต๊ะนิรา — บุคลากรและทีมต่อสู้&lt;/h2&gt; | `shop.l1776` |
| `src/ui.js:1777` | &lt;p class="hint"&gt;เลือกยมทูตเข้าทีมต่อสู้ได้ 2 คน เมื่อเข้าสนามรบจะมาช่วยยมน้อย ระหว่างอยู่บนแผนที่ยังทำงานประจำต่อ ไม่ต้องเดินตาม&lt;/p&gt; | `shop.l1777` |
| `src/ui.js:1783` | ${c ? \`&lt;small&gt;แรง ${c.raeng} · ระเบียบ ${c.rabiab} · ฝึกขั้น ${c.upLv \|\| 0}&lt;/small&gt;&lt;small&gt;ท่าสู้: ${crewAbility(c.k)} · คูลดาวน์ ${BATTLE.crewCd} วินาที&lt;/small&gt;\` : \`&lt;small&gt;ค่าจ้าง ${def.hire} เบี้ย · ท่าสู้: ${crewAbility(def.k)}&lt;/small&gt;\`} | `shop.l1783` |
| `src/ui.js:1785` | ${c ? \`&lt;button data-party="${c.k}" class="sm" ${!on &amp;&amp; party.length &gt;= 2 ? 'disabled' : ''}&gt;${on ? '✓ ทีมต่อสู้' : 'เข้าทีมสู้'}&lt;/button&gt; | `shop.l1785` |
| `src/ui.js:1786` | &lt;button data-train="${c.k}" class="sm" ${g.coin &lt; train \|\| (c.upLv \|\| 0) &gt;= UPGRADES.max ? 'disabled' : ''}&gt;ฝึกแรง ${train}&lt;/button&gt;\` | `shop.l1786` |
| `src/ui.js:1787` | : \`&lt;button data-hire="${def.k}" class="sm gold" ${g.coin &lt; def.hire ? 'disabled' : ''}&gt;จ้าง&lt;/button&gt;\`} | `shop.l1787` |
| `src/ui.js:1794` | &lt;span&gt;&lt;b&gt;${esc(GUARD.name)}&lt;/b&gt;&lt;small&gt;ยามประจำโซน — ไม่ต้องจัดเข้าทีม&lt;/small&gt; | `shop.l1794` |
| `src/ui.js:1795` | &lt;small&gt;ท่าสู้: ${crewAbility('guard')} · คูลดาวน์ ${GUARD.battleCd} วินาที&lt;/small&gt;&lt;/span&gt; | `shop.l1795` |
| `src/ui.js:1797` | ? \`&lt;button class="sm" disabled title="เข้าช่วยรบทุกฉากต่อสู้ให้เองอัตโนมัติ ไม่กินโควตาทีม 2 คนของยมทูต"&gt;✓ อยู่ในทีมเสมอ&lt;small&gt;(ไม่นับโควตา 2 คน)&lt;/small&gt;&lt;/button&gt;\` | `shop.l1797` |
| `src/ui.js:1798` | : \`&lt;button data-hire-guard class="sm gold" ${g.coin &lt; GUARD.hire ? 'disabled' : ''} title="จ้างแล้วช่วยรบทุกฉากต่อสู้ให้เองอัตโนมัติ ไม่ต้องจัดเข้าทีม"&gt;จ้าง ${GUARD.hire}&lt;/button&gt;\`} | `shop.l1798` |
| `src/ui.js:1800` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;เสร็จแล้ว&lt;/button&gt;&lt;/div&gt;\`; | `shop.l1800` |
| `src/ui.js:1815` | dlg.innerHTML = \`&lt;div class="merchant-heading"&gt;&lt;img src="img/merchant-profile.jpeg" alt="พ่อค้าควันทอง"&gt;&lt;div&gt;&lt;h2&gt;🧳 ${esc(MERCHANT.name)}&lt;/h2&gt;&lt;p class="hint"&gt;${esc(MERCHANT.line)} · มี ${Math.round(g.coin)} เบี้ยกรรม&lt;/p&gt;&lt;/div&gt;&lt;/div&gt; | `shop.l1815` |
| `src/ui.js:1816` | &lt;h3&gt;ขายของจากชายแดน&lt;/h3&gt;&lt;div class="market-grid"&gt;${mats.length ? mats.map(([k,n]) =&gt; { | `shop.l1816` |
| `src/ui.js:1817` | const d = ITEMS[k]; return \`&lt;article class="shop-card"&gt;&lt;span class="shop-glyph"&gt;${d.glyph}&lt;/span&gt;&lt;span&gt;&lt;b&gt;${esc(d.name)} ×${n}&lt;/b&gt;&lt;small&gt;${d.sell} เบี้ยต่อชิ้น&lt;/small&gt;&lt;/span&gt; | `shop.l1817` |
| `src/ui.js:1818` | &lt;button data-sell="${k}"&gt;ขาย 1&lt;/button&gt;&lt;button data-sell-all="${k}" class="gold"&gt;ขายทั้งหมด&lt;/button&gt;&lt;/article&gt;\`; | `shop.l1818` |
| `src/ui.js:1819` | }).join('') : '&lt;div class="hint"&gt;ยังไม่มีของสนามรบในกระเป๋า&lt;/div&gt;'}&lt;/div&gt; | `shop.l1819` |
| `src/ui.js:1820` | &lt;h3&gt;สินค้า&lt;/h3&gt;&lt;div class="market-grid"&gt;${MERCHANT.stock.map(s =&gt; { | `shop.l1820` |
| `src/ui.js:1822` | return \`&lt;article class="shop-card"&gt;&lt;span class="shop-glyph"&gt;${d.glyph}&lt;/span&gt;&lt;span&gt;&lt;b&gt;${esc(d.name)}${s.qty ? \` ×${s.qty}\` : ''}&lt;/b&gt;&lt;small&gt;${lock ? \`ปลดที่ขั้น ${LEVELS[s.lv - 1].name}\` : \`${s.cost} เบี้ยกรรม\`}&lt;/small&gt;&lt;/span&gt; | `shop.l1822` |
| `src/ui.js:1823` | &lt;button data-buy="${s.k}" class="gold" ${lock \|\| g.coin &lt; s.cost ? 'disabled' : ''}&gt;ซื้อ&lt;/button&gt;&lt;/article&gt;\`; | `shop.l1823` |
| `src/ui.js:1825` | &lt;h3&gt;อัปเกรดพลัง&lt;/h3&gt;&lt;div class="market-grid"&gt;${POWERS.filter(p =&gt; !p.realtime).map(p =&gt; { | `shop.l1825` |
| `src/ui.js:1827` | return \`&lt;article class="shop-card"&gt;&lt;span class="shop-glyph"&gt;${p.glyph}&lt;/span&gt;&lt;span&gt;&lt;b&gt;${esc(p.name)} ขั้น ${lv + 1}&lt;/b&gt;&lt;small&gt;เพิ่มจำนวนที่เก็บได้ · ${cost} เบี้ย&lt;/small&gt;&lt;/span&gt; | `shop.l1827` |
| `src/ui.js:1828` | &lt;button data-power-up="${p.k}" ${lock \|\| lv &gt;= UPGRADES.max \|\| g.coin &lt; cost ? 'disabled' : ''}&gt;อัปเกรด&lt;/button&gt;&lt;/article&gt;\`; | `shop.l1828` |
| `src/ui.js:1829` | }).join('')}&lt;/div&gt;&lt;div class="row"&gt;&lt;button class="gold" data-close&gt;กลับแผนที่&lt;/button&gt;&lt;/div&gt;\`; | `shop.l1829` |
| `src/ui.js:1842` | &lt;div class="row"&gt;&lt;button data-rematch&gt;⚔️ ประลองใหม่&lt;/button&gt;&lt;button data-zone-menu&gt;🗺️ เปลี่ยนโซน&lt;/button&gt;&lt;button class="gold" data-close&gt;ไว้คราวหน้า&lt;/button&gt;&lt;/div&gt;\`, d =&gt; { | `shop.l1842` |
| `src/ui.js:1865` | &lt;button class="x" ${fromWalk ? 'data-frontier-back title="กลับชายแดน"' : 'data-close title="กลับแผนที่"'}&gt;✕&lt;/button&gt; | `frontier.l1865` |
| `src/ui.js:1866` | &lt;header&gt;&lt;small&gt;กิจกรรมต่อสู้ประจำโซน&lt;/small&gt;&lt;h2&gt;🏯 ${esc(FRONTIER.name)}&lt;/h2&gt; | `frontier.l1866` |
| `src/ui.js:1867` | &lt;p&gt;ผีและปีศาจกำลังรวมตัวหลังประตู จัดทีมยมทูตไม่เกิน ${FRONTIER.teamMax} คนแล้วต้านพวกมันเป็นระลอก&lt;/p&gt;&lt;/header&gt; | `frontier.l1867` |
| `src/ui.js:1876` | &lt;div class="frontier-head"&gt;&lt;span&gt;&lt;b&gt;ระลอกที่ ${wave}&lt;/b&gt;&lt;small&gt;${esc(g.zoneDef().name)} · ผ่านแล้ว ${state.clears \|\| 0} ระลอก&lt;/small&gt;&lt;/span&gt; | `frontier.l1876` |
| `src/ui.js:1877` | &lt;span class="frontier-loot"&gt;รางวัล: เบี้ยกรรม + ของสนามรบ&lt;/span&gt;&lt;/div&gt; | `frontier.l1877` |
| `src/ui.js:1878` | &lt;div class="frontier-team"&gt;&lt;h3&gt;จัดทีมยมทูต &lt;small&gt;${chosen.length}/${FRONTIER.teamMax}&lt;/small&gt;&lt;/h3&gt; | `frontier.l1878` |
| `src/ui.js:1883` | &lt;span&gt;&lt;b&gt;${esc(c.name)}&lt;/b&gt;&lt;small&gt;แรง ${c.raeng} · กำลังใจ ${Math.round(c.morale)}&lt;/small&gt;&lt;/span&gt; | `frontier.l1883` |
| `src/ui.js:1884` | &lt;i&gt;${on ? '✓ เข้าทีม' : 'เลือก'}&lt;/i&gt;&lt;/button&gt;\`; | `frontier.l1884` |
| `src/ui.js:1885` | }).join('') : '&lt;div class="hint"&gt;ยังไม่มียมทูตสายต่อสู้ — จ้างได้ที่นิรา&lt;/div&gt;'}&lt;/div&gt; | `frontier.l1885` |
| `src/ui.js:1887` | &lt;div class="frontier-actions"&gt;&lt;button ${fromWalk ? 'data-frontier-back' : 'data-close'}&gt;${fromWalk ? 'กลับชายแดน' : 'กลับแผนที่'}&lt;/button&gt; | `frontier.l1887` |
| `src/ui.js:1888` | &lt;button class="gold" data-frontier-start ${chosen.length \|\| fromWalk ? '' : 'disabled'}&gt;${fromWalk ? 'กลับไปเล่นชายแดน' : '⚔️ เริ่มป้องกันชายแดน'}&lt;/button&gt;&lt;/div&gt; | `frontier.l1888` |
| `src/ui.js:1922` | const gateName = zoneName.startsWith('โซน') ? zoneName : \`โซน${zoneName}\`; | `frontier.l1922` |
| `src/ui.js:1930` | &lt;button class="frw-fab" id="frw-fab" type="button" hidden&gt;⚔️ เริ่มต่อสู้&lt;/button&gt; | `frontier.l1930` |
| `src/ui.js:1931` | &lt;button class="frw-fab" id="frw-gate" type="button" hidden&gt;🗺️ กลับเข้าแผนที่${esc(gateName)}&lt;/button&gt; | `frontier.l1931` |
| `src/ui.js:1932` | &lt;button class="frw-fab" id="frw-nira" type="button" hidden&gt;📋 คุยกับนิรา&lt;/button&gt;&lt;/div&gt; | `frontier.l1932` |
| `src/ui.js:1948` | &lt;span class="chip"&gt;ระลอกปัจจุบัน ${wave} · ผ่านแล้ว ${state.clears \|\| 0}&lt;/span&gt;\`; | `frontier.l1948` |
| `src/ui.js:1949` | left.innerHTML = \`&lt;div class="hint"&gt;ทีมยมทูตที่พาไป&lt;/div&gt; | `frontier.l1949` |
| `src/ui.js:1953` | &lt;div class="hint" style="margin-top:10px"&gt;เดิน (คลิก/แตะ/WASD) เข้าไปใกล้ศัตรู แล้วกดปุ่ม&lt;br&gt; | `frontier.l1953` |
| `src/ui.js:1954` | "⚔️ เริ่มต่อสู้" ที่ลอยขึ้นเหนือหัวมัน&lt;/div&gt;\`; | `frontier.l1954` |
| `src/ui.js:1955` | right.innerHTML = \`&lt;div class="hud-card"&gt;&lt;h4&gt;สนามรบ&lt;/h4&gt; | `frontier.l1955` |
| `src/ui.js:1956` | &lt;p class="hint"&gt;ศัตรูในสนามตอนนี้: &lt;b id="frw-count"&gt;0&lt;/b&gt;/${maxOnScreen(wave)}&lt;/p&gt; | `frontier.l1956` |
| `src/ui.js:1957` | &lt;p class="hint"&gt;ชนะแล้วตัวนั้นหายไป ตัวอื่นยังยืนรออยู่ — ปราบไปเรื่อย ๆ ตัวใหม่จะทยอยเดินเข้ามาแทน&lt;/p&gt;&lt;/div&gt;\`; | `frontier.l1957` |
| `src/ui.js:2042` | &lt;b&gt;เตรียมศึกก่อนบุก (กดได้ทุกปุ่ม ก่อนหลังไม่บังคับ)&lt;/b&gt; | `battle.l2042` |
| `src/ui.js:2043` | ${b.proofBonus ? \`&lt;div class="prep-note good"&gt;✓ แฟ้มหลักฐานพร้อม — ลดพลังบอส ${b.proofBonus}&lt;/div&gt;\` : ''} | `battle.l2043` |
| `src/ui.js:2045` | &lt;button data-prep-merchant&gt;🧳 พ่อค้านรก · ซื้อของ&lt;/button&gt; | `battle.l2045` |
| `src/ui.js:2046` | &lt;button data-prep-nira&gt;📋 นิรา · จัดทีมยมทูต&lt;/button&gt; | `battle.l2046` |
| `src/ui.js:2048` | title="${medN &lt; 1 ? 'ไม่มีหีบยา — กดพ่อค้านรกเพื่อซื้อ' : medFull ? 'บารมีเต็มแล้ว' : \`ฟื้นบารมี ${ITEMS.health.hp} · เหลือ ${medN} หีบ\`}"&gt; | `battle.l2048` |
| `src/ui.js:2049` | 💊 กินหีบยา${medN ? \` ×${medN}\` : ''}&lt;/button&gt; | `battle.l2049` |
| `src/ui.js:2051` | ${medN &lt; 1 ? '&lt;div class="prep-note warn"&gt;ไม่มีหีบยา — กดพ่อค้านรกเพื่อซื้อ&lt;/div&gt;' : ''} | `battle.l2051` |
| `src/ui.js:2052` | &lt;div class="row"&gt;&lt;button class="gold" data-prep-go&gt;⚔️ เข้าสู้&lt;/button&gt;&lt;/div&gt;&lt;/div&gt;\` : ''; | `battle.l2052` |
| `src/ui.js:2059` | const note = it?.coin != null ? \`${it.coin} เบี้ย\` : \`×${pw ? pw.ammo : 0}\`; | `battle.l2059` |
| `src/ui.js:2062` | const powerChoices = battleChoice('fire', 'img/fx-fireball.png', 'ลูกไฟ', fireAmmo &gt; 0, \`×${fireAmmo}\`) | `battle.l2062` |
| `src/ui.js:2068` | title="${esc(why \|\| \`ฟาดแรง ${GUARD.battleAtk} หน่วย — ช่วยยมน้อยสู้\`)}"&gt; | `battle.l2068` |
| `src/ui.js:2069` | &lt;img src="${artUrl('crew-guard-profile') \|\| artUrl('crew-guard')}" alt=""&gt;&lt;b&gt;${esc(GUARD.name)}&lt;/b&gt;&lt;small&gt;ฟาดแรง&lt;/small&gt;&lt;/button&gt;\`; | `battle.l2069` |
| `src/ui.js:2075` | const crewActions = (crewHelperBtns + guardBtn) \|\| '&lt;span class="idle"&gt;ยังไม่มีทีม — จัดทีมยมทูตก่อนเข้าสู้ครั้งถัดไป&lt;/span&gt;'; | `battle.l2075` |
| `src/ui.js:2082` | b.over === 'win'  ? (b.kind === 'zoneBoss' ? 'เปิดทางไปโซนถัดไป' : b.kind === 'frontier' ? 'เก็บไอเท็มที่ตกอยู่' : b.kind === 'mob' ? 'กลับไปคุมโซน' : 'ลากเข้าสถานี') | `battle.l2082` |
| `src/ui.js:2083` | : b.over === 'lose' ? (b.kind === 'yama' ? 'ฟังคำตัดสินของพ่อ' | `battle.l2083` |
| `src/ui.js:2084` | : b.kind === 'dad'  ? 'ฟังคำตัดสินของพ่อ' | `battle.l2084` |
| `src/ui.js:2085` | : b.kind === 'zoneBoss' ? 'กลับไปตั้งหลักที่สะพาน' | `battle.l2085` |
| `src/ui.js:2086` | : b.kind === 'frontier' ? 'ถอยกลับเข้าประตู' | `battle.l2086` |
| `src/ui.js:2087` | : b.kind === 'mob'  ? 'ถอยกลับไปตั้งหลัก' | `battle.l2087` |
| `src/ui.js:2088` | : 'ปล่อยเขากลับเข้าคิว') : ''; | `battle.l2088` |
| `src/ui.js:2096` | arena(b.kind === 'yama' ? '👑 พญายมลงมาเอง' | `battle.l2096` |
| `src/ui.js:2098` | : b.kind === 'dad'   ? \`👑 ${g.zone === 'th' ? 'พ่อ' : authorityOf(g.zone).title}ลงมาเอง — ตัดสินพลาดสามสำนวนติด\` | `battle.l2098` |
| `src/ui.js:2101` | : b.kind === 'zoneBoss' ? \`👑 บอส${g.zoneDef().name}\` | `battle.l2101` |
| `src/ui.js:2102` | : b.kind === 'frontier' ? \`🏯 ชายแดนนรก — ระลอกที่ ${b.wave}\` | `battle.l2102` |
| `src/ui.js:2103` | : b.kind === 'mob'   ? '👹 ผีบุกเข้าโซน' | `battle.l2103` |
| `src/ui.js:2104` | : '⚔️ วิญญาณขัดขืน', | `battle.l2104` |
| `src/ui.js:2110` | ${phase ? \`&lt;div class="turnhint"&gt;${phase === 'you' ? '⚔️ ตาของท่าน' : '↩️ เขาสวนกลับ'}&lt;/div&gt;\` : ''} | `battle.l2110` |
| `src/ui.js:2223` | if(label)label.textContent=remaining?cooldownText(remaining):'พร้อม'; | `battle.l2223` |
| `src/ui.js:2233` | if(label)label.textContent=remaining?cooldownText(remaining):'พร้อม'; | `battle.l2233` |
| `src/ui.js:2235` | if(button){button.disabled=!!phase\|\|!!g.battle?.over\|\|!!g.guardHelpWhy();button.title=g.guardHelpWhy()\|\|\`ฟาดแรง ${GUARD.battleAtk} หน่วย — ช่วยยมน้อยสู้\`;} | `battle.l2235` |
| `src/ui.js:2253` | const why = lock ? (g.level &lt; z.level ? \`ต้องเป็น ${LEVELS[z.level - 1].name}\` : \`ต้องชนะ${prev.bossName}ก่อน\`) | `bagZone.l2253` |
| `src/ui.js:2259` | ${here ? '&lt;button class="sm" disabled&gt;อยู่ที่นี่&lt;/button&gt;' | `bagZone.l2259` |
| `src/ui.js:2260` | : \`&lt;button class="sm" data-zone="${z.k}" ${lock ? 'disabled' : ''}&gt;ย้ายไป&lt;/button&gt;\`} | `bagZone.l2260` |
| `src/ui.js:2263` | modal(\`&lt;h2&gt;🗺️ ย้ายโซน&lt;/h2&gt; | `bagZone.l2263` |
| `src/ui.js:2264` | &lt;div class="hint"&gt;ตอนนี้ท่านคุม &lt;b style="color:var(--gold)"&gt;${esc(cur.name)}&lt;/b&gt; — ${esc(cur.sub)} | `bagZone.l2264` |
| `src/ui.js:2265` | · ย้ายแล้ว &lt;b&gt;คน เบี้ยกรรม พลัง บารมี กรรม ติดตัวไปหมด&lt;/b&gt; แต่ | `bagZone.l2265` |
| `src/ui.js:2266` | &lt;b style="color:var(--warning)"&gt;สถานีทัณฑ์ต้องสร้างใหม่ทั้งโซน&lt;/b&gt;&lt;/div&gt; | `bagZone.l2266` |
| `src/ui.js:2268` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;อยู่ที่นี่ต่อ&lt;/button&gt;&lt;/div&gt;\`, | `bagZone.l2268` |
| `src/ui.js:2282` | modal(\`&lt;h2&gt;👘 ห้องเครื่อง Yama&lt;/h2&gt; | `bagZone.l2282` |
| `src/ui.js:2283` | &lt;p class="outfit-note"&gt;เลือกชุดที่ได้รับแล้ว สวมได้ทุกสาขา&lt;/p&gt; | `bagZone.l2283` |
| `src/ui.js:2290` | &lt;img src="${face}" alt="ชุด${esc(z.name)}" loading="lazy"&gt; | `bagZone.l2290` |
| `src/ui.js:2291` | &lt;span class="outfit-info"&gt;&lt;b&gt;ชุด${esc(z.name.replace(/^โซน/, ''))}&lt;/b&gt; | `bagZone.l2291` |
| `src/ui.js:2293` | &lt;span&gt;${lock ? \`🔒 ต้องเป็น ${esc(LEVELS[z.level - 1].name)}\` : here ? '✓ กำลังสวม' : 'พร้อมสวม'}&lt;/span&gt;&lt;/span&gt; | `bagZone.l2293` |
| `src/ui.js:2294` | ${here ? '&lt;button class="sm" disabled&gt;ชุดปัจจุบัน&lt;/button&gt;' | `bagZone.l2294` |
| `src/ui.js:2295` | : \`&lt;button class="sm" data-outfit="${z.k}" ${lock ? 'disabled' : ''}&gt;สวม&lt;/button&gt;\`} | `bagZone.l2295` |
| `src/ui.js:2299` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;เสร็จแล้ว&lt;/button&gt;&lt;/div&gt;\`, | `bagZone.l2299` |
| `src/ui.js:2308` | if (!d) return 'ไม่รู้จักไอเทมนี้'; | `bagZone.l2308` |
| `src/ui.js:2313` | if (k === 'fire' \|\| k === 'ice') return 'ใช้ในฉากต่อสู้'; | `bagZone.l2313` |
| `src/ui.js:2314` | if (d.material) return \`สินค้า · พ่อค้านรกรับซื้อ ${d.sell} เบี้ยกรรม\`; | `bagZone.l2314` |
| `src/ui.js:2315` | if (d.hp &amp;&amp; g.hp &gt;= g.hpMax) return 'บารมีเต็มแล้ว'; | `bagZone.l2315` |
| `src/ui.js:2316` | if (d.karma &lt; 0 &amp;&amp; g.karma &lt;= 0) return 'ยังไม่มีกรรมให้ชำระ'; | `bagZone.l2316` |
| `src/ui.js:2319` | if (!p \|\| g.powerLocked(p)) return 'พลังนี้ยังไม่ปลดล็อก'; | `bagZone.l2319` |
| `src/ui.js:2320` | if (p.ammo &gt;= p.max) return 'พลังเต็มแล้ว'; | `bagZone.l2320` |
| `src/ui.js:2323` | if (d.fireAmmo &amp;&amp; g.fireAmmo &gt;= g.fireAmmoMax) return 'ลูกไฟเต็มแล้ว'; | `bagZone.l2323` |
| `src/ui.js:2333` | &lt;img src="${face}" alt="ชุด${esc(z.name)}" loading="lazy"&gt; | `bagZone.l2333` |
| `src/ui.js:2334` | &lt;span class="outfit-info"&gt;&lt;b&gt;ชุด${esc(z.name.replace(/^โซน/, ''))}&lt;/b&gt; | `bagZone.l2334` |
| `src/ui.js:2336` | &lt;span&gt;${lock ? \`🔒 ต้องเป็น ${esc(LEVELS[z.level - 1].name)}\` : here ? '✓ กำลังสวม' : 'เก็บอยู่ในกระเป๋า'}&lt;/span&gt;&lt;/span&gt; | `bagZone.l2336` |
| `src/ui.js:2337` | ${here ? '&lt;button class="sm" disabled&gt;ชุดปัจจุบัน&lt;/button&gt;' | `bagZone.l2337` |
| `src/ui.js:2338` | : \`&lt;button class="sm" data-bag-outfit="${z.k}" ${lock ? 'disabled' : ''}&gt;สวม&lt;/button&gt;\`} | `bagZone.l2338` |
| `src/ui.js:2352` | &lt;button class="gold" data-use-item="${k}" ${why ? 'disabled' : ''}&gt;${d.material ? 'รอขาย' : 'ใช้'}&lt;/button&gt; | `bagZone.l2352` |
| `src/ui.js:2354` | }).join('') : '&lt;div class="bag-empty"&gt;ยังไม่มีของในกระเป๋า&lt;br&gt;&lt;small&gt;เดินเข้าใกล้ไอเทมตามฉากเพื่อเก็บ&lt;/small&gt;&lt;/div&gt;'; | `bagZone.l2354` |
| `src/ui.js:2356` | modal(\`&lt;h2&gt;🎒 กระเป๋าของยมน้อย&lt;/h2&gt; | `bagZone.l2356` |
| `src/ui.js:2357` | &lt;div class="hint"&gt;ของที่เก็บได้จะไม่ถูกใช้ทันที เลือกใช้เมื่อจำเป็น และติดตัวไปทุกโซน&lt;/div&gt; | `bagZone.l2357` |
| `src/ui.js:2358` | &lt;div class="bag-title"&gt;ของใช้ · ${carried.reduce((s, [, n]) =&gt; s + n, 0)} ชิ้น&lt;/div&gt; | `bagZone.l2358` |
| `src/ui.js:2360` | &lt;div class="bag-title"&gt;ชุดที่ได้รับ&lt;/div&gt; | `bagZone.l2360` |
| `src/ui.js:2362` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;ปิดกระเป๋า&lt;/button&gt;&lt;/div&gt;\`, d =&gt; { | `bagZone.l2362` |
| `src/ui.js:2409` | bossModal(st.title, st.text + (st.hint ? \`\n\n▸ ${st.hint}\` : ''), 'รับทราบ'); | `coach.l2409` |
| `src/ui.js:2420` | &lt;button class="sm" id="coach-ok"&gt;เข้าใจแล้ว&lt;/button&gt;&lt;/div&gt;\`; | `coach.l2420` |
| `src/ui.js:2435` | $('#play').textContent = g.paused ? '▶ เดินวาระ' : '⏸ พัก'; | `world.l2435` |
| `src/ui.js:2436` | $('#spd').textContent = \`ความเร็ว ×${g.speed}\`; | `world.l2436` |
| `src/ui.js:2441` | z.textContent = \`🗺️ ย้ายโซน (${g.zoneDef().name})\`; | `world.l2441` |
| `src/ui.js:2448` | bag.textContent = \`🎒 กระเป๋า${n ? \` (${n})\` : ''}\`; | `world.l2448` |
| `src/ui.js:2501` | b.textContent = AUDIO.on ? '🔊 เสียง' : '🔇 ปิดเสียงอยู่'; | `world.l2501` |
| `src/ui.js:2531` | g.log(\`เดินไป${FRONTIER.name} — เข้าได้เมื่อยืนใกล้ซุ้มประตู\`, 'act'); | `world.l2531` |
| `src/ui.js:2532` | else g.log(\`${FRONTIER.name}อยู่ในจุดที่เดินไปไม่ถึง\`, 'bad'); | `world.l2532` |
| `src/ui.js:2544` | g.log(\`เดินไปหา${d.name} — เข้าได้เมื่อยืนใกล้ทางเข้า\`, 'act'); | `world.l2544` |
| `src/ui.js:2545` | else g.log(\`${d.name}อยู่ในจุดที่เดินไปไม่ถึง\`, 'bad'); | `world.l2545` |
| `src/ui.js:2564` | g.walkTo(MERCHANT.x, MERCHANT.y); g.log(\`เดินไปหา${MERCHANT.name} — ซื้อขายได้เมื่อยืนใกล้\`, 'act'); return; | `world.l2564` |
| `src/ui.js:2582` | g.log('ตรงนั้นเดินไปไม่ถึง — ต้องข้ามลาวาหรือแม่น้ำวิญญาณ', 'bad'); | `world.l2582` |
| `src/ui.js:2586` | if (!g.walkTo(def.x, def.y)) g.log('ตรงนั้นเดินไปไม่ถึง', 'bad'); | `world.l2586` |
| `src/ui.js:2591` | &lt;p style="font-size:var(--text-sm);line-height:var(--leading-body)"&gt;กำลังก่อสร้างอยู่ — รออีกสักครู่&lt;/p&gt; | `world.l2591` |
| `src/ui.js:2592` | &lt;div class="row"&gt;&lt;button data-close&gt;ปิด&lt;/button&gt;&lt;/div&gt;\`); | `world.l2592` |
| `src/ui.js:2663` | acts.push(\`&lt;button disabled&gt;${item?.glyph \|\| '🎁'} ${esc(item?.name \|\| 'ของประจำสถานี')} | `station.l2663` |
| `src/ui.js:2664` | &lt;small&gt;${ready ? 'วางอยู่ในฉากแล้ว · เดินไปเก็บใส่กระเป๋าได้เลย' | `station.l2664` |
| `src/ui.js:2665` | : left ? \`กำลังเตรียม · อีก ${left} วาระ\` : 'กำลังนำมาวางในฉาก'}&lt;/small&gt;&lt;/button&gt;\`); | `station.l2665` |
| `src/ui.js:2672` | ? \`&lt;button class="gold" id="s-sit"&gt;🧎 ลุกขึ้น&lt;small&gt;บารมี ${Math.round(g.hp)}/${g.hpMax} — ลุกได้ทุกเมื่อ&lt;/small&gt;&lt;/button&gt;\` | `station.l2672` |
| `src/ui.js:2673` | : \`&lt;button id="s-sit" ${inside &amp;&amp; !hpFull ? '' : 'disabled'}&gt;🧎 นั่งพัก&lt;small&gt;${hpFull ? 'บารมีเต็มแล้ว — ไม่ต้องนั่ง' | `station.l2673` |
| `src/ui.js:2674` | : inside ? 'ฟรี ไม่เสียเบี้ยกรรม — ฟื้นช้า ๆ ตามเวลาที่นั่ง' : 'เดินเข้าไปยืนตรงจุดในศาลาก่อน'}&lt;/small&gt;&lt;/button&gt;\`); | `station.l2674` |
| `src/ui.js:2677` | 📜 เปิดแฟ้มทะเบียนกรรม&lt;small&gt;${inside ? \`ประวัติวิญญาณทุกดวงที่ผ่านมือท่าน · ${g.ledger.length} เรื่อง\` | `station.l2677` |
| `src/ui.js:2678` | : 'เดินขึ้นบันไดไปยืนหน้าคัมภีร์ก่อน'}&lt;/small&gt;&lt;/button&gt;\`); | `station.l2678` |
| `src/ui.js:2684` | 🪞 คุยกับกานต์&lt;small&gt;${locked ? \`ล็อก · ต้องเป็น${LEVELS[mp.lv - 1].name}ก่อน\` | `station.l2684` |
| `src/ui.js:2685` | : !inside ? 'เดินเข้าไปยืนใกล้กานต์ก่อน' | `station.l2685` |
| `src/ui.js:2686` | : mp.ammo &gt;= mp.max ? 'กระจกวิเศษเต็มแล้ว' | `station.l2686` |
| `src/ui.js:2687` | : left ? \`กานต์ยังไม่มีของใหม่ให้ — อีก ${left} วาระ\` | `station.l2687` |
| `src/ui.js:2688` | : 'รับกระจกวิเศษหนึ่งบาน ฟรี'}&lt;/small&gt;&lt;/button&gt;\`); | `station.l2688` |
| `src/ui.js:2691` | acts.push(...g.held.map(h =&gt; \`&lt;button data-rel="${h.id}"&gt;🔓 ปล่อย ${esc(h.who)}&lt;small&gt;ออกไปขึ้นแท่นตัดสิน&lt;/small&gt;&lt;/button&gt;\`)); | `station.l2691` |
| `src/ui.js:2696` | acts.push(\`&lt;div class="st-desc"&gt;📋 ตรวจรายชื่อกับนิรา · รับทัณฑ์ครบแล้ว ${sentenced.length} ดวง | `station.l2696` |
| `src/ui.js:2697` | ${sentenced.length &amp;&amp; !inside ? '&lt;br&gt;⚠️ เดินเข้าไปยืนใกล้นิราในห้องก่อน ปุ่มถึงจะกดได้' : ''}&lt;/div&gt;\`); | `station.l2697` |
| `src/ui.js:2701` | ? x.repentant ? 'เข็ดแล้ว' : 'ยังไม่เข็ด' | `station.l2701` |
| `src/ui.js:2702` | : ready ? 'พร้อมตรวจ' : \`รออีก ${(x.readyAt ?? x.until) - g.tick} วาระ\`}&lt;/div&gt;\`); | `station.l2702` |
| `src/ui.js:2705` | ? \`&lt;button class="gold" data-prison-send="${x.soul.id}" ${inside &amp;&amp; (!x.repentant \|\| !needSawan) ? '' : 'disabled'}&gt;${x.repentant ? '🕊️ ส่งไปประตูสวรรค์' : '↩️ ส่งกลับเข้าคิว'}&lt;small&gt;${needSawan ? 'ต้องสร้างประตูสวรรค์ให้เสร็จก่อน · ' : !inside ? 'เดินเข้าไปยืนใกล้นิราก่อน · ' : ''}${name}&lt;/small&gt;&lt;/button&gt;\` | `station.l2705` |
| `src/ui.js:2706` | : \`&lt;button data-prison-check="${x.soul.id}" ${inside &amp;&amp; ready ? '' : 'disabled'}&gt;📋 ให้นิราตรวจ&lt;small&gt;${!ready ? name : !inside ? 'เดินเข้าไปยืนใกล้นิราก่อน · ' + name : name}&lt;/small&gt;&lt;/button&gt;\`); | `station.l2706` |
| `src/ui.js:2712` | acts.push(\`&lt;div class="st-desc"&gt;📜 ตรวจกรรมกับบุญ · รอที่ประตู ${arrivals.length} ดวง&lt;br&gt;กรรมคงเหลือคิดจากกรรมทั้งหมด หักบุญจริงและวาระที่รับทัณฑ์แล้ว&lt;br&gt;ส่งไปเกิดใหม่ ${g.reborn} · ขึ้นสวรรค์ ${g.ascended} ดวง | `station.l2712` |
| `src/ui.js:2713` | ${arrivals.length &amp;&amp; !inside ? '&lt;br&gt;⚠️ เดินเข้าไปยืนใกล้บุญในห้องก่อน ปุ่มถึงจะกดได้' : ''}&lt;/div&gt;\`); | `station.l2713` |
| `src/ui.js:2716` | acts.push(\`&lt;div class="st-desc"&gt;#${String(x.soul.id).padStart(3, '0')} ${name}${x.checked ? \` · กรรมคงเหลือ ${x.karmaLeft}\` : ' · รอตรวจกรรม'}&lt;/div&gt;\`); | `station.l2716` |
| `src/ui.js:2718` | ? \`&lt;button class="gold" data-gate-send="${x.soul.id}" ${inside ? '' : 'disabled'}&gt;${x.karmaLeft &gt; 0 ? '✨ ส่งไปเกิดใหม่' : '🌟 ส่งขึ้นสวรรค์'}&lt;small&gt;${!inside ? 'เดินเข้าไปยืนใกล้บุญก่อน · ' : ''}${x.karmaLeft &gt; 0 ? \`กรรมคงเหลือ ${x.karmaLeft}\` : 'หมดกรรม · รับรางวัลจากพ่อ'} · ${name}&lt;/small&gt;&lt;/button&gt;\` | `station.l2718` |
| `src/ui.js:2719` | : \`&lt;button data-gate-check="${x.soul.id}" ${inside ? '' : 'disabled'}&gt;📜 ให้บุญตรวจกรรม&lt;small&gt;${!inside ? 'เดินเข้าไปยืนใกล้บุญก่อน · ' : ''}${name}&lt;/small&gt;&lt;/button&gt;\`); | `station.l2719` |
| `src/ui.js:2727` | 🌀 ซื้อวงสะกดจิตจากบุญ&lt;small&gt;${hypnoLocked ? \`ล็อก · ต้องเป็น${LEVELS[hypnoPw.lv - 1].name}ก่อน\` | `station.l2727` |
| `src/ui.js:2728` | : !inside ? 'เดินเข้าไปยืนใกล้บุญก่อน · ' + hypnoStock.cost + ' เบี้ยกรรม' | `station.l2728` |
| `src/ui.js:2729` | : hypnoFull ? 'มีเต็มแล้ว — ใช้ก่อนค่อยซื้อเพิ่ม' | `station.l2729` |
| `src/ui.js:2730` | : \`${hypnoStock.cost} เบี้ยกรรม · สารภาพครบ 100% ทุกครั้ง\`}&lt;/small&gt;&lt;/button&gt;\`); | `station.l2730` |
| `src/ui.js:2742` | const note = mgOpen ? 'กำลังเล่นมินิเกมอยู่' | `station.l2742` |
| `src/ui.js:2743` | : maxed ? 'เร่งเต็มขั้นแล้ว' | `station.l2743` |
| `src/ui.js:2744` | : levelLocked ? \`ต้องเลื่อนขั้นยมบาทก่อน (ขั้น ${g.mgLevelNeed(st.speedLv \|\| 0)})\` | `station.l2744` |
| `src/ui.js:2745` | : cdLeft &gt; 0 ? \`รออีก ${cdLeft} วาระ\` | `station.l2745` |
| `src/ui.js:2746` | : 'ชนะ = เร่งขึ้น 1 ขั้น · เร็วขึ้น 12%'; | `station.l2746` |
| `src/ui.js:2747` | acts.push(\`&lt;button data-mg="${k}" ${locked ? 'disabled' : ''}&gt;🎮 เล่นมินิเกม ขั้น ${st.speedLv \|\| 0}&lt;small&gt;${esc(note)}&lt;/small&gt;&lt;/button&gt;\`); | `station.l2747` |
| `src/ui.js:2758` | ${st.fire &gt; 0 ? \`&lt;span class="chip" style="color:var(--destructive)"&gt;🔥 ไฟไหม้ ${Math.round(st.fire)}%&lt;/span&gt;\` : ''} | `station.l2758` |
| `src/ui.js:2764` | ? \`&lt;span class="chip" style="color:var(--warning)"&gt;⏸ เกมพักอยู่ — ทัณฑ์ไม่เดิน&lt;/span&gt; | `station.l2764` |
| `src/ui.js:2765` | &lt;button class="sm gold" id="st-resume"&gt;▶ เดินวาระ&lt;/button&gt;\` | `station.l2765` |
| `src/ui.js:2772` | &lt;h4&gt;ที่นี่คือที่ไหน&lt;/h4&gt; | `station.l2772` |
| `src/ui.js:2776` | &lt;h4&gt;เอาไว้ทำอะไร&lt;/h4&gt; | `station.l2776` |
| `src/ui.js:2777` | &lt;div class="st-desc"&gt;${esc(def.use \|\| (cap ? 'ที่ลงทัณฑ์ตามชนิดกรรม' : '—'))}&lt;/div&gt; | `station.l2777` |
| `src/ui.js:2778` | &lt;div class="st-meta"&gt;${def.tags.length ? 'ตรงกรรม: ' + def.tags.map(t =&gt; SINS[t].name).join(' · ') : 'ไม่ใช้ลงทัณฑ์'} | `station.l2778` |
| `src/ui.js:2779` | ${cap ? \` · รับได้ ${st.slots.length}/${cap} ดวง\` : ''}&lt;/div&gt; | `station.l2779` |
| `src/ui.js:2787` | &lt;h4&gt;ทำอะไรได้ตรงนี้&lt;/h4&gt; | `station.l2787` |
| `src/ui.js:2788` | ${acts.join('') \|\| '&lt;div class="st-desc"&gt;ยังไม่มีอะไรให้ทำที่นี่ตอนนี้&lt;/div&gt;'} | `station.l2788` |
| `src/ui.js:2791` | &lt;h4&gt;ผู้คุมประจำหลังนี้&lt;/h4&gt; | `station.l2791` |
| `src/ui.js:2793` | + (g.crewOf(st.crewK)?.self ? ' (ท่านเอง)' : '') | `station.l2793` |
| `src/ui.js:2794` | + (g.workingCrew?.has(st.crewK) ? (g.fed ? ' · 🍙 อิ่ม ทำงานไว' : ' · 🍙 หิว ทำงานช้า') : '') | `station.l2794` |
| `src/ui.js:2795` | : 'ยังไม่มีใครประจำ'}&lt;/div&gt; | `station.l2795` |
| `src/ui.js:2845` | const missTxt = miss &gt; 0 ? \`หนักเกินไป ${miss} วาระ\` | `station.l2845` |
| `src/ui.js:2846` | : miss &lt; 0 ? \`เบาไป ${-miss} วาระ\` | `station.l2846` |
| `src/ui.js:2847` | : 'จำนวนวาระตรงพอดี'; | `station.l2847` |
| `src/ui.js:2852` | &lt;span class="arch-meta"&gt;${x.score} คะแนน · วาระที่ ${x.tick}&lt;/span&gt; | `station.l2852` |
| `src/ui.js:2854` | &lt;div class="arch-meta"&gt;สมควร ${x.deserved} วาระ · ท่านให้ไป ${x.deserved + x.over - x.short} | `station.l2854` |
| `src/ui.js:2855` | ${x.over &gt; 0 ? \`&lt;b style="color:var(--destructive)"&gt;เกิน ${x.over} · กรรมตกมา +${x.karma}&lt;/b&gt;\` : ''} | `station.l2855` |
| `src/ui.js:2856` | ${x.short &gt; 0 ? \`&lt;b style="color:var(--warning)"&gt;เบาไป ${x.short}&lt;/b&gt;\` : ''} | `station.l2856` |
| `src/ui.js:2857` | ${x.tham &lt; 40 ? '&lt;b style="color:var(--destructive)"&gt;ส่งผิดชนิดกรรม&lt;/b&gt;' : ''} | `station.l2857` |
| `src/ui.js:2858` | ${x.back ? '&lt;b style="color:var(--destructive)"&gt;กลับมารอบสอง&lt;/b&gt;' : ''}&lt;/div&gt; | `station.l2858` |
| `src/ui.js:2868` | &lt;b&gt;📜 แฟ้มทะเบียนกรรม — โซน${esc(g.zoneDef().name.replace(/^โซน/, ''))}&lt;/b&gt; | `station.l2868` |
| `src/ui.js:2869` | &lt;button id="s-arch-x"&gt;✕ ปิดแฟ้ม&lt;/button&gt; | `station.l2869` |
| `src/ui.js:2871` | &lt;div class="arch-sum"&gt;ปิดคดีแล้ว ${g.casesDone} เรื่อง · ห้าดาว ${five} · | `station.l2871` |
| `src/ui.js:2872` | ลงเกินกรรม ${over} · เบาไป ${short} · ส่งผิดชนิดกรรม ${wrong} · | `station.l2872` |
| `src/ui.js:2873` | กลับมาใหม่ ${g.returned}&lt;/div&gt; | `station.l2873` |
| `src/ui.js:2875` | &lt;b&gt;👑 พ่อว่าอย่างไรบ้าง&lt;/b&gt; | `station.l2875` |
| `src/ui.js:2876` | ${L.length ? \`ผ่านสายตาท่าน &lt;b style="color:var(--success)"&gt;${passed}&lt;/b&gt; จาก ${L.length} เรื่อง\` + | `station.l2876` |
| `src/ui.js:2877` | \` (ตรงกรรม ${byDad.great \|\| 0} · ใช้ได้ ${byDad.ok \|\| 0})\` + | `station.l2877` |
| `src/ui.js:2878` | \` · ท่านติงว่าลงเกินกรรม &lt;b style="color:var(--destructive)"&gt;${byDad.cruel \|\| 0}&lt;/b&gt;\` + | `station.l2878` |
| `src/ui.js:2879` | \` · ตีกลับ &lt;b style="color:var(--destructive)"&gt;${(byDad.bad \|\| 0) + (byDad.terrible \|\| 0)}&lt;/b&gt;\` + | `station.l2879` |
| `src/ui.js:2880` | \`&lt;br&gt;รวมแล้วท่านลงหนักเกินไป &lt;b&gt;${overVaras}&lt;/b&gt; วาระ และเบาไป &lt;b&gt;${shortVaras}&lt;/b&gt; วาระ\` | `station.l2880` |
| `src/ui.js:2881` | : 'ยังไม่มีเรื่องให้ท่านอ่าน'} | `station.l2881` |
| `src/ui.js:2883` | &lt;div class="arch-list"&gt;${rows \|\| '&lt;div class="arch-meta"&gt;แฟ้มยังว่างเปล่า — ท่านยังไม่ได้ตัดสินใครเลย&lt;/div&gt;'}&lt;/div&gt;\`; | `station.l2883` |
| `src/ui.js:2923` | &lt;div class="mg-head"&gt;&lt;b&gt;${game.icon \|\| '🎮'} ${esc(game.name)}&lt;/b&gt;&lt;button class="mg-x" type="button"&gt;✕ ปิด&lt;/button&gt;&lt;/div&gt; | `station.l2923` |
| `src/ui.js:2926` | &lt;button class="gold mg-start" type="button"&gt;▶ เริ่มเลย&lt;/button&gt; | `station.l2926` |
| `src/ui.js:2945` | &lt;button class="x" data-close title="ปิด"&gt;✕&lt;/button&gt; | `station.l2945` |
| `src/ui.js:2980` | if (outer) outer.innerHTML = \`❤️ บารมี ${barHtml} &lt;b&gt;${num}&lt;/b&gt;\`; | `station.l2980` |
| `src/ui.js:3013` | &lt;div class="hint"&gt;${def.tags.length ? 'ตรงกรรม: ' + def.tags.map(t =&gt; SINS[t].name).join(' · ') : 'ไม่ใช้ลงทัณฑ์'} | `level.l3013` |
| `src/ui.js:3014` | · แรง ${def.pow}${!taan ? \` · ต้องจ้าง${taanName}ที่โต๊ะนิราก่อน\` : taan.buildK ? \` · ${taanName}กำลังสร้างหลังอื่นอยู่\` : \` · ${taanName}จะเดินมาสร้างให้\`}&lt;/div&gt; | `level.l3014` |
| `src/ui.js:3015` | &lt;div class="row"&gt;&lt;button data-close&gt;ยังไม่สร้าง&lt;/button&gt; | `level.l3015` |
| `src/ui.js:3016` | &lt;button class="gold" id="bd" ${afford ? '' : 'disabled'}&gt;สร้าง ${def.cost} เบี้ยกรรม&lt;/button&gt;&lt;/div&gt;\`, | `level.l3016` |
| `src/ui.js:3032` | ...zonesNew.map(z =&gt; ({ g: '🗺️', t: \`เปิด${z.name}ให้ท่านคุม\`, | `level.l3032` |
| `src/ui.js:3033` | d: \`${z.sub} · กดปุ่ม 🗺️ ย้ายโซน ใต้ฉากเมื่อไหร่ก็ได้ \` + | `level.l3033` |
| `src/ui.js:3034` | 'สาขาที่ทิ้งไว้ถูกเก็บไว้ให้ ย้ายกลับมาเมื่อไหร่ก็ยังอยู่' })), | `level.l3034` |
| `src/ui.js:3037` | modal(\`&lt;h2&gt;🎖️ เลื่อนขั้น&lt;/h2&gt; | `level.l3037` |
| `src/ui.js:3041` | ${prev ? \`&lt;div class="from"&gt;จาก ${esc(prev.name)}&lt;/div&gt;\` : ''} | `level.l3041` |
| `src/ui.js:3047` | &lt;div style="font-size:var(--text-xs);color:var(--muted-foreground);margin-bottom:6px"&gt;ท่านได้เพิ่ม&lt;/div&gt; | `level.l3047` |
| `src/ui.js:3051` | : '&lt;div class="hint"&gt;ขั้นนี้ยังไม่มีของแถม — แต่ชื่อขั้นของท่านเปลี่ยนแล้ว&lt;/div&gt;'} | `level.l3051` |
| `src/ui.js:3052` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;รับไว้&lt;/button&gt;&lt;/div&gt;\`); | `level.l3052` |
| `src/ui.js:3093` | else bossModal(\`กลับมาที่${z.name}\`, | `events.l3093` |
| `src/ui.js:3102` | bossModal('เปิดสาขาใหม่ให้ท่านแล้ว', | `events.l3102` |
| `src/ui.js:3103` | \`ขั้น "${LEVELS[g.level - 1].name}" เปิด${zs.map(z =&gt; z.name).join(' และ ')}ให้ท่านคุมได้แล้ว\n\n\` + | `events.l3103` |
| `src/ui.js:3104` | 'กดปุ่ม 🗺️ ย้ายโซน ใต้ฉากเมื่อไหร่ก็ได้', 'รับทราบ'); | `events.l3104` |
| `src/ui.js:3110` | bossModal(\`ตักเตือนเรื่องคิวล้น ${w.n}/${w.of}\`, | `events.l3110` |
| `src/ui.js:3112` | (w.n &lt; w.of ? \`ระเบียบถูกยกให้ตั้งหลักใหม่แล้ว — เหลือโอกาสอีก ${w.of - w.n} ครั้ง\` | `events.l3112` |
| `src/ui.js:3119` | bossModal(\`คำตัดสินแดง ${w.n}/${w.of}\`, | `events.l3119` |
| `src/ui.js:3120` | \`${w.text}\n\n${w.fireball ? \`🔥 ลูกไฟจากบัลลังก์ฟาดถูก — บารมีเหลือ ${Math.max(0, Math.round(g.hp))}\n\n\` : ''}\` + | `events.l3120` |
| `src/ui.js:3121` | \`อีก ${w.of - w.n} สำนวนที่ตัดสินพลาด พ่อจะลงมาเอง — \` + | `events.l3121` |
| `src/ui.js:3122` | 'ตัดสินให้ได้สีเขียวหนึ่งครั้งก็ล้างที่สะสมไว้แล้ว', 'รับทราบ'); | `events.l3122` |
| `src/ui.js:3127` | bossModal(k.pass ? 'ตรวจการ — ผ่าน' : 'ตรวจการ — ไม่ผ่าน', | `events.l3127` |
| `src/ui.js:3142` | &lt;div class="row"&gt;&lt;button class="gold" data-close&gt;รับทราบ&lt;/button&gt;&lt;/div&gt;\`); | `events.l3142` |
| `src/ui.js:3222` | \`${z.name} · วาระที่ ${SAVED.tick \|\| 0} · ปิดคดีแล้ว ${SAVED.casesDone \|\| 0} · ${lv.name} ⭐${SAVED.star5 \|\| 0}\`; | `title.l3222` |
| `src/ui.js:3288` | &lt;button id="s-lang-toggle" class="lang-toggle" aria-label="เปลี่ยนภาษา / change language"&gt; | `settings.l3288` |
| `src/ui.js:3375` | dlg.innerHTML = \`&lt;div class="intro-comic" role="region" aria-label="เรื่องเปิดเกม หน้า ${page + 1} จาก ${pages.length}"&gt; | `intro.l3375` |
| `src/ui.js:3378` | &lt;div class="intro-comic-head"&gt;&lt;span&gt;อเวจี · บทนำ&lt;/span&gt;&lt;span&gt;${page + 1} / ${pages.length}&lt;/span&gt;&lt;/div&gt; | `intro.l3378` |
| `src/ui.js:3381` | &lt;div class="intro-comic-controls"&gt;&lt;button id="intro-skip"&gt;${fromTitle ? 'ปิดบทนำ' : 'ข้ามบทนำ'}&lt;/button&gt;&lt;button class="gold" id="intro-next"&gt;${page + 1 === pages.length ? (fromTitle ? 'กลับหน้าเมนู' : 'รับงาน') : 'หน้าถัดไป →'}&lt;/button&gt;&lt;/div&gt; | `intro.l3381` |

## เนื้อเรื่อง/บทพูด/ชื่อในขอบเขต

- `src/ui.js`: `HERO_NAME` บรรทัด 23; ความคิดยมน้อย 419–425; คำบรรยายความถนัดยมทูต 652–656; ข้อความแทนบทพูด 889/901; เสียงตอบพญายม 1049–1053; ฉากจบและแฟ้ม 1147–1257; ข้อความผู้ตรวจการ/การเลื่อนขั้น 1841, 3046, 3094, 3113, 3129–3130; บทนำ 5 หน้า 3366–3370. ราว 633 คำไทย / 2,259 อักษรไทยจากบรรทัดต้นทาง. ข้อความคดี/ชื่อ/พลัง/ไอเท็มที่อ้างจาก `data.js`, `cases*.js` ไม่อยู่ในการนับชุด A.
- `index.html`: ชื่อเกมและชื่อตัวละครใน title, boot, alt/logo, HUD avatar 4 บรรทัด ราว 9 คำ / 40 อักษรไทย. `#hdr-sub` บรรทัด 1643 เป็นป้าย UI และแสดงในรายการ UI.
- ไม่ต้องแปล: `src/ui.js:1348` console error สำหรับ debug และคอมเมนต์ HTML ภายใน template บรรทัด 1678–1680, 1790–1791; `index.html:7` meta description ไม่ใช่ข้อความในจอเกมตามเกณฑ์นี้; คอมเมนต์ JS/CSS/HTML ตัดออกทั้งหมด. Meta description ควรตรวจแยกเมื่อต้องการแปล SEO.

## จุดปุ่มชายแดน

- `src/ui.js:1921–1922`: `g.zoneDef().name` ของ cyberhell เป็น `นรกเครือข่าย` (`src/data.js:1499`); เงื่อนไข `startsWith('โซน')` เติม `โซน` จึงได้ `โซนนรกเครือข่าย`.
- วิธีแก้ที่เสนอ: ตัดการสร้าง `gateName` บรรทัด 1922 แล้วที่ `src/ui.js:1931` ใช้ `esc(zoneName)` ตรง ๆ หรือ `esc(g.zoneDef().name)`; ปุ่มจึงเป็น `กลับเข้าแผนที่นรกเครือข่าย` และโซนอื่นยังใช้ชื่อ `โซนสุวรรณภูมิ`/`โซนบูรพา`/`โซนปัจฉิม` ตามข้อมูลเกม. หากต้องการถ้อยคำเดียวกันทุกโซน ให้ใช้ `กลับแผนที่: ${zoneName}` ผ่าน key พร้อม placeholder.

## การตรวจ

- ใช้ Acorn parse `src/ui.js` และตัดคอมเมนต์ JS; ตัดคอมเมนต์ CSS/HTML ของ `index.html`; อ่าน `src/i18n.js` เพื่อตรวจ key และ `data-t`/`t()` ที่ต่อแล้ว.
- `node --check src/ui.js` สำเร็จ. ตรวจผลประกอบชื่อโซนทั้ง 4 จากเงื่อนไขจริง. `git status --short --branch` สะอาดบน worktree/branch `codex/20260928T054517Z-c0009994`.

หมายเหตุ: รายการเป็นการสำรวจ source แบบ static; ข้อความจากไฟล์ข้อมูลอื่นหรือ HTML ที่ประกอบผ่าน runtime ไม่อยู่ในขอบเขต. ยังไม่ได้รัน UI ในเบราว์เซอร์ และไม่อ้างว่า QA ผ่าน.

# ชุด B — src/ ที่เหลือ

## ผลสำรวจชุด B

ตรวจเฉพาะ `src/` โดย **ไม่รวม `src/ui.js`** ตามขอบเขตชุด B; ไม่ตรวจ `index.html` และไม่ทำข้อ 5 ตามที่ระบุไว้ งานนี้อ่านอย่างเดียว ไม่แก้ไฟล์และไม่รัน QA

ตัวเลขด้านล่างนับ **ตำแหน่งข้อความไทยใน string/template literal** จึงเป็นจำนวนจุดที่ต้องจัดการโดยประมาณ ไม่ใช่จำนวนประโยคที่ไม่ซ้ำกัน ข้อความที่ต่อกันด้วย `+` หรือมีหลายทางเลือกใน template อาจนับแยก ใช้อักษรไทยประมาณ **4.5 ตัวต่อหนึ่งคำ** เพื่อประเมินปริมาณแปล

| ไฟล์ | UI: จุด / อักษรไทย | เนื้อเรื่อง: จุด / อักษรไทย | ไม่ต้องแปล: จุด |
|---|---:|---:|---:|
| [cases.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/cases.js:25) | 0 | 376 / 22,651 | 0 |
| [cases-asia.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/cases-asia.js:29) | 0 | 246 / 11,559 | 0 |
| [data.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/data.js:14) | 0 | 751 / 27,686 | 26 |
| [game.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/game.js:329) | 130 / 3,757 | 56 / 2,307 | 0 |
| [i18n.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/i18n.js:26) | 0 | 0 | 68 |
| [command-wheel.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/command-wheel.js:19) | 6 / 97 | 0 | 0 |
| [frontier.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/frontier.js:193) | 3 / 69 | 0 | 0 |
| [scene.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/scene.js:142) | 14 / 197 | 0 | 0 |
| [room.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/room.js:368) | 8 / 320 | 3 / 12 | 0 |
| [preload.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/preload.js:21) | 4 / 99 | 1 / 54 | 0 |
| [minigames/dab.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/minigames/dab.js:10) | 7 / 103 | 0 | 0 |
| [minigames/krata.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/minigames/krata.js:20) | 6 / 159 | 0 | 0 |
| [minigames/lan.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/minigames/lan.js:11) | 3 / 70 | 0 | 0 |
| [minigames/lokan.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/minigames/lokan.js:12) | 3 / 100 | 0 | 0 |
| [minigames/ngiw.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/minigames/ngiw.js:8) | 4 / 102 | 0 | 0 |
| [minigames/sala.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/minigames/sala.js:19) | 4 / 126 | 0 | 0 |
| [minigames/sawan.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/minigames/sawan.js:9) | 6 / 140 | 0 | 0 |
| **รวม** | **198 / 5,339** | **1,433 / 64,269** | **94** |

`art.js`, `command-wheel.css`, `minigames/index.js`, `minigames/util.js`, `sfx.js`, `view3d.js` และ `walk.js` พบภาษาไทยในคอมเมนต์เท่านั้น ไม่มี string ไทยที่นับเข้าตาราง ส่วน 68 จุดใน `i18n.js` เป็นค่าไทยที่อยู่ในระบบแปลแล้ว ไม่ใช่งานแปลค้าง คีย์ชื่อบุคคลซ้ำใน `SEX_OF`/`SPIRIT_OF` ของ `data.js` อีก 26 จุดเป็น lookup ภายใน; ชื่อที่แสดงจริงนับจากข้อมูลต้นทางแล้ว

## รายการ UI ที่ยังไม่ผ่านระบบแปล

คีย์ต่อไปนี้เป็น **คีย์เสนอเพื่อทำรายการ** โดยเฉพาะ `game.log.*` ควรตั้งชื่อตามเหตุการณ์จริงเมื่อเดินสาย ข้อความในรายการย่อส่วนตัวแปรเป็น `${…}` แต่ระบุทุกตำแหน่งที่นับเป็น UI

### วงคำสั่ง แผนที่ และฉาก

| ตำแหน่ง | ข้อความ | คีย์เสนอ |
|---|---|---|
| `command-wheel.js:19` | คำสั่งต่อสู้ / คำสั่งออกหมาย | `command.aria.battle`, `command.aria.trial` |
| `command-wheel.js:23` | ยมน้อย | `command.center.yama` |
| `command-wheel.js:24` | เลือกสถานที่ ผู้คุม และความแรงให้ครบ | `trial.warrant.incomplete` |
| `command-wheel.js:61,65` | โจมตีช่วย | `battle.crew.assistFallback` |
| `command-wheel.js:69` | ความพร้อม `${c.name}` / พร้อม | `battle.crew.readiness`, `battle.crew.ready` |
| `frontier.js:193` | กำลังโหลดฉากชายแดน… | `frontier.loading` |
| `frontier.js:209` | `${kd.name}` · ระดับ `${en.level}` | `frontier.enemyLevel` |
| `frontier.js:250` | ยังไม่มีศัตรูในสนาม — รอครู่หนึ่งให้มันเดินเข้ามา | `frontier.waitForEnemy` |
| `scene.js:142` | รอ `${v.crewName}` มารับ / `${v.crewName}` มารับแล้ว | `scene.pickup.wait`, `scene.pickup.arrived` |
| `scene.js:185–186` | กดขว้างลูกไฟ / เดินเข้าไปหยุดมัน | `scene.mob.throw`, `scene.mob.approach` |
| `scene.js:200` | `${bossName}` เดินมาท้าสู้ / คุยกับ… / เฝ้าสะพาน | `scene.boss.challenge`, `.talk`, `.guard` |
| `scene.js:207` | ซื้อขาย | `scene.merchant.trade` |
| `scene.js:309` | รอ…เดินมาเริ่มงาน / กำลังก่อสร้าง `%` | `scene.build.wait`, `.progress` |
| `scene.js:392,416` | กดตรงนี้เพื่อสร้าง — `${cost}` เบี้ยกรรม / ต้องมี `${cost}` เบี้ยกรรม | `scene.build.afford`, `.needCoin` |

### ห้องและหน้าโหลด

| ตำแหน่ง | ข้อความ | คีย์เสนอ |
|---|---|---|
| `room.js:397` | เดินไปเก็บ`${itemDef.name}` | `room.item.walkToCollect` |
| `room.js:446–448` | ดวงที่ถึงนี่รอบุญตรวจกรรม / ผู้คุมกำลังลงทัณฑ์อยู่ / ยังไม่มีใครถูกส่งมาที่นี่ | `room.idle.heaven`, `.working`, `.empty` |
| `room.js:451–454` | กำลังนั่งพัก / เกมหยุดพักอยู่ / กดปุ่มนั่งพัก / ลูกศร/WASD หรือแตะบนฉาก | `room.tip.sitting`, `.paused`, `.sit`, `.walk` |
| `preload.js:21–24` | กำลังเปิดประตูโซนสุวรรณภูมิ / เรือจ้างกำลังพาคนข้ามมา / นิรากำลังเรียงสำนวน / ก่อไฟใต้กระทะ | `loading.note.gate`, `.boat`, `.case`, `.fire` |

`room.js:368` เป็นชื่อ NPC สามค่า จัดเป็นเนื้อเรื่อง ส่วน `preload.js:25` เป็นประโยคธีม จัดเป็นเนื้อเรื่อง

### มินิเกม

| ตำแหน่ง | ข้อความ | คีย์เสนอ |
|---|---|---|
| `dab.js:10,12` | หลบใบดาบ; คำอธิบายวิธีหลบ | `minigame.dab.name`, `.tip` |
| `dab.js:23` | ซ้าย / กลาง / ขวา | `minigame.dab.left`, `.center`, `.right` |
| `dab.js:28,63` | โดนแล้ว `${hits}/${max}` | `minigame.dab.hits` |
| `krata.js:20,22` | คุมไฟ; คำอธิบายจังหวะพัดไฟ | `minigame.krata.name`, `.tip` |
| `krata.js:38,39` | ติดต่อกัน `${n}/${need}`; พัดไฟ | `minigame.krata.streak`, `.fan` |
| `krata.js:53,57` | โดน! ติดต่อกัน… / พลาด — ติดต่อกัน… | `minigame.krata.hit`, `.miss` |
| `lan.js:11,13,26` | แบกหิน; คำอธิบายการแตะ; ปุ่มแบกหิน | `minigame.lan.name`, `.tip`, `.tap` |
| `lokan.js:12,14,28` | ไอเย็นแห่งความเนรคุณ; คำอธิบายไล่หมอก; ไล่หมอก | `minigame.lokan.name`, `.tip`, `.tap` |
| `ngiw.js:8,10,19,40` | เก็บหนามที่เคยทิ่ม; คำอธิบายเก็บหนาม; เก็บแล้ว `${n}/${need}` สองจุด | `minigame.ngiw.name`, `.tip`, `.count` |
| `sala.js:19,21,36,50` | เรียงสำนวน; คำอธิบายเลือกหมวด; เรียกหา; เก็บแล้ว | `minigame.sala.name`, `.tip`, `.target`, `.count` |
| `sawan.js:9,11,22,24,34,38` | นับลมหายใจ; คำอธิบายจังหวะ; นับได้; แตะจังหวะ; โดน!; พลาด | `minigame.sawan.name`, `.tip`, `.count`, `.tap`, `.hit`, `.miss` |

### ข้อความระบบใน `game.js`

กลุ่มนี้มี 130 **ตำแหน่ง string**; บรรทัดที่ต่อกันเป็นข้อความเดียวหรือมีทางเลือกใน template ควรรวมเป็นคีย์เดียวพร้อมตัวแปรเมื่อพัฒนา รายการต่อไปนี้ใช้ `game.log.<ชื่อ>` เป็นคีย์เสนอ

| บรรทัด | ข้อความหรือแม่แบบ | คีย์เสนอ |
|---:|---|---|
| 329–331 | สำนวนมีชื่อเข้าคิว; สำนวนหนาผิดปกติ; วิญญาณเข้าคิว | `game.log.queueNamed`, `.queueHard`, `.queueSoul` |
| 419–420 | ขังวิญญาณไว้ในตะราง — ค่าข้าวต่อวาระ | `game.log.holdSoul` |
| 431 | เบิกตัวออกจากตะราง | `game.log.releaseSoul` |
| 443–444 | ให้คนถัดไปขึ้นแทน — สำนวนเลื่อนไปท้ายคิว | `game.log.deferCase` |
| 650–651 | ผู้คุมรับสำนวนเข้าสตรีมงาน · วาระ · จำนวนดวงที่คุม | `game.log.assignCase` |
| 719 | เปิดโปงความจริงครบ 3 สำนวน — ได้รางวัล | `game.log.truthMilestone` |
| 735 | คำตัดสิน — ธรรม · เข็ด · รวม | `game.log.verdictScore` |
| 743,751 | คำเตือนคำตัดสินแดง; ลูกไฟเตือนและบารมีที่เหลือ | `game.log.redWarning`, `.warningFireball` |
| 756–758 | เกินกรรม; เบาไป; ทัณฑ์ไม่ตรงกรรม | `game.log.overPunish`, `.underPunish`, `.wrongStation` |
| 772–774 | ไม่มีดาว; เกินกรรมสองวาระ; บารมีหาย 10 | `game.log.zeroStar`, `.overTwo`, `.loseHpTen` |
| 784–786 | ห้าดาวและรางวัล; กรรมลด; กรรมสูงเกินคืนบารมี | `game.log.fiveStar`, `.karmaReduced`, `.karmaTooHigh` |
| 813,817,821,824 | ส่งกลับจากสวรรค์; ถึงประตูสวรรค์; รับทัณฑ์ครบ; ครบวาระและได้เบี้ย | `game.log.heavenReturn`, `.heavenArrive`, `.punishmentDone`, `.termDone` |
| 847 | นิราตรวจ — สำนึกแล้ว / ยังไม่เข็ด | `game.log.repentanceCheck` |
| 859,868,881 | ส่งจากตะรางไปสวรรค์; ส่งกลับเข้าคิว; บุญตรวจกรรมคงเหลือ | `game.log.sendToHeaven`, `.returnToQueue`, `.karmaCheck` |
| 892,897 | ส่งไปเกิดใหม่; ส่งขึ้นสวรรค์และรางวัล | `game.log.reborn`, `.ascended` |
| 937–938 | ยังไม่สำนึกหลังรับวาระ — อ้างสำนวนเดิม | `game.log.returnedCase` |
| 969,1004 | เสบียงหมด; สถานีหยุดรอเพราะผู้เล่นไม่ได้ยืนคุม | `game.log.foodEmpty`, `.playerAbsent` |
| 1074,1089,1097 | จำนวนดวงในตะรางและค่าข้าว; หอส่องกรรมเติมพลัง; ค่าแรงยักษ์ | `game.log.jailCost`, `.mirrorRefill`, `.guardPay` |
| 1124,1127,1143 | ตรวจการผ่าน; ไม่ผ่าน; คำเตือนคิวล้น | `game.log.auditPass`, `.auditFail`, `.queueWarning` |
| 1182,1206,1211 | ลูกไฟจากบัลลังก์; เลื่อนขั้น; พร้อมย้ายสาขา | `game.log.throneFireball`, `.levelUp`, `.zoneReady` |
| 1287,1352 | ผู้สร้างมาถึงและเริ่มงาน; สร้างเสร็จ | `game.log.buildStart`, `.buildDone` |
| 1453,1457,1462,1497 | เก็บกระสุน/พลังพร้อมใช้; เก็บใส่กระเป๋า; ใช้ไอเท็ม | `game.log.collectAmmo`, `.collectPower`, `.collectBag`, `.useItem` |
| 1582 | สถานีถูกเผาพัง | `game.log.stationBurned` |
| 1619,1622,1625 | เดินไปหาเปรต; ไปไม่ถึง; ไม่มีเปรตใกล้ | `game.log.huntApproach`, `.huntUnreachable`, `.huntNone` |
| 1638,1646,1650 | ขว้างลูกไฟ; ฟาดแต่ยังไม่ล้ม; ปราบเปรต | `game.log.throwFire`, `.mobHit`, `.mobDefeated` |
| 1822 | กินหีบยาก่อนสู้ | `game.log.preBattleHeal` |
| 1893,1895,1896,1906,1908 | ต้องจัดทีม; รอคูลดาวน์; กำลังใจไม่พอ; ยังไม่จ้างยักษ์; รอคูลดาวน์ซ้ำ | `game.battle.needTeam`, `.cooldown`, `.lowMorale`, `.needGuard` |
| 1947 | ท่านฟาด — ความเสียหายและคริติคอล | `game.battle.playerHit` |
| 1992,2008,2010 | ลูกไฟโดน; ไอเท็มฟื้นบารมี; ไอเท็มทำความเสียหาย | `game.battle.fireHit`, `.itemHeal`, `.itemDamage` |
| 2038,2043,2048–2049,2054 | ป้องกันชายแดนสำเร็จ; ศัตรูสลาย; เปิดทางโซนถัดไป; ปราบดวงและออกหมายได้ | `game.battle.frontierWin`, `.mobWin`, `.bossWin`, `.bossRetreat`, `.soulWin` |
| 2076,2079,2091,2093 | สะกดจิตให้ตีตัวเอง; ขยับไม่ได้; ท่าไม้ตาย/สวนกลับ; ชื่อท่า | `game.battle.confused`, `.stunned`, `.ultimateDamage`, `.counterDamage`, `.ultimateName` |
| 2102,2105,2110,2114 | ทีมถอยจากชายแดน; ผู้เล่นถอย; บอสรอที่สะพาน; แพ้ดวง | `game.battle.frontierLose`, `.mobLose`, `.bossWait`, `.soulLose` |
| 2131 | แพ้พญายมและเริ่มโซนใหม่ | `game.battle.yamaLose` |
| 2158,2160,2162–2163 | กรรมเต็ม; ระเบียบพัง; บารมีหมด; ถูกลงกระทะแล้วกลับคุมโซน | `game.log.punishKarma`, `.punishOrder`, `.punishHp`, `.punishZone` |
| 2173–2174 | ชนะ/แพ้บอสโซน | `game.log.zoneBossWin`, `.zoneBossLose` |
| 2183,2185,2191–2192,2197–2198 | ปราบศัตรู / ยังอยู่; ป้องกันชายแดนสำเร็จ / ถอย; ปราบดวง / ดวงหลุด | `game.log.mobWin`, `.mobRemain`, `.frontierWin`, `.frontierLose`, `.soulWin`, `.soulEscape` |
| 2220 | เปลี่ยนชุด Yama | `game.log.outfitChanged` |
| 2293–2295 | กลับ/ย้ายโซน; สถานีเดิมยังอยู่; งบตั้งต้นและต้องจ้างใหม่ | `game.log.zoneMove` |
| 2318,2326,2335,2345 | เปรตขึ้นมา; จ้างยักษ์; ซื้อเสบียง; บูชาดอกบัว | `game.log.mobSpawn`, `.guardHired`, `.foodBought`, `.lotusUsed` |
| 2357,2378,2405 | ขายไอเท็ม; ซื้อไอเท็ม; ซื้อจากบุญ | `game.log.itemSold`, `.itemBought`, `.boonBought` |
| 2417,2427,2439,2453 | อัปเกรดพลัง; ฝึกยมทูต; ป้อนข้าว; อัปเกรดสถานี | `game.log.powerUpgrade`, `.crewTrain`, `.crewFeed`, `.stationUpgrade` |
| 2479,2481,2483 | ชนะมินิเกมและเร่งงาน; ชนเพดาน; แพ้ | `game.log.minigameWin`, `.minigameMax`, `.minigameLose` |
| 2501–2503,2506,2516 | ความจุคิว; เติมพลังทุกวาระ; เปิดสำนวนใหม่; สั่งสร้าง; สมาชิกเข้าประจำการ | `game.log.buildCapacity`, `.buildRefill`, `.buildCases`, `.buildOrdered`, `.crewJoined` |
| 2725,2749 | รายได้ระหว่างไม่อยู่; โหลดเกมที่บันทึก | `game.log.offlineGrant`, `.saveLoaded` |

มีสตริงสั้นที่เป็น **ตัวระบุผู้กระทำ “ท่าน”** ใน `game.js:1402,1613,1616,1635,1641` และทางเลือกใน template เช่น `game.js:824,847,1971,2163,2293,2427,2453` ที่ต้องแปลร่วมกับประโยคแม่ ไม่ควรแปลเป็นคีย์แยกโดยไม่ดูไวยากรณ์อังกฤษ

## เนื้อเรื่องและปริมาณงานแปล

- `cases.js`: สำนวนเขียนมือ ชื่อ/อาชีพ/หน้าคดี/กรรม/คำให้การ **376 จุด, ประมาณ 5,030 คำ** จาก 22,651 อักษรไทย
- `cases-asia.js`: สำนวนบูรพาและประเด็นสอบสวนเฉพาะราย **246 จุด, ประมาณ 2,570 คำ** จาก 11,559 อักษรไทย
- `data.js`: สำนวนสุ่ม, บทพูด, ชื่อสถานี/ยมทูต/ไอเท็ม/พลัง, บทเรียน `TUTOR`, เหตุการณ์, ตอนจบ และข้อมูลโซน **751 จุด, ประมาณ 6,150 คำ** จาก 27,686 อักษรไทย ตัวเลขนี้รวมคำอธิบายวิธีเล่นที่ยาวใน `TUTOR`; หาก Rae แบ่งงานตามผู้แปล ควรแยกบทเรียนเป็นหมวดย่อย
- `game.js`: แม่แบบคำให้การ ผลการสอบสวน บทพูด และฉากจบ **56 จุด, ประมาณ 510 คำ**
- `room.js` และ `preload.js`: ชื่อตัวละคร/ประโยคธีมอีก **4 จุด, ประมาณ 15 คำ**

รวมเนื้อเรื่องประมาณ **14,280 คำ** จากวิธีหารอักษรไทย; ภาษาไทยไม่มีช่องว่างคั่นคำสม่ำเสมอ จึงใช้ตัวเลขนี้สำหรับวางแผนเท่านั้น

## โครงเก็บคำแปลเนื้อเรื่อง

| วิธี | ข้อดี | ข้อเสีย |
|---|---|---|
| ไฟล์แยก `src/i18n-story-en.js` เป็นตาราง `caseKey.field → ข้อความอังกฤษ` | Rae ส่งงานแปลเป็นชุดโดยไม่แก้ข้อมูลเกม; ตรวจคีย์ขาด/เกินด้วยสคริปต์ได้; ข้อมูลไทยเดิมไม่ขยับ | ต้องมีตัวอ่านที่เลือกภาษาและ fallback; ต้องรักษาคีย์ให้ตรงกับข้อมูลต้นทาง |
| เพิ่มฟิลด์ `en` ข้างข้อมูลไทยใน `cases*.js`/`data.js` | เห็นต้นฉบับกับคำแปลใกล้กัน; wiring อ่านง่าย | ไฟล์ข้อมูลใหญ่ขึ้นมาก; งานแปลทำให้ diff ของตรรกะและสมดุลเกมปนกัน; merge conflict สูง |

**แนะนำไฟล์แยก** และใช้รหัสคงที่ที่มีอยู่ เช่น `case.k` กับ path ฟิลด์ (`A1.face`, `A1.claims.0.t`) เป็นคีย์ เริ่มจาก `cases*.js` ก่อน แล้วค่อยขยายไป `data.js` ให้ตัวอ่านตกกลับไทยเมื่อยังไม่มีอังกฤษ สำหรับข้อความที่ผ่าน `voice()` ต้องคง token `{i}`, `{p}`, `{my}`, `{na}` หรือออกแบบสรรพนามอังกฤษใหม่ก่อนต่อสาย; การแทนคำไทยตรง ๆ จะทำให้ไวยากรณ์อังกฤษผิด หลักฐานอยู่ที่ [data.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/data.js:31) และ [cases-asia.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/cases-asia.js:11)

## การตรวจและข้อจำกัด

ใช้ `rg` หาไฟล์และตำแหน่งภาษาไทย, อ่านจุดที่แสดงผลจริง, และใช้สคริปต์ Python แบบอ่านอย่างเดียวสกัด string ที่มีอักษรไทยเพื่อประมาณจำนวน ไม่ได้รันเกมหรือทดสอบการสลับภาษา จึง **ยังไม่อ้างว่า QA ผ่าน** ระบบปัจจุบันใช้ `t(key)` และ `data-t`/`data-t-title`/`data-t-aria`; `applyI18n()` ใน [i18n.js](/Users/agapae/Documents/Work%20PAE/Claude/AVEGEE/src/i18n.js:183) ไม่ได้จับ string ที่ hardcode ในไฟล์เหล่านี้อัตโนมัติ

`src/game.js` และ `src/data.js` เป็นไฟล์ modified ใน workspace และมีเวลาแก้ไขระหว่างช่วงสำรวจ ตัวเลขกับบรรทัดยึด snapshot ล่าสุดที่อ่านได้ราว **12:47 น. เวลาไทย** ควรรันตัวนับซ้ำหลังหยุดแก้ไฟล์ แล้วตรวจรายการ UI ด้วยการเล่นเส้นทางสำคัญ โดยเฉพาะผลสอบสวน การต่อสู้ มินิเกม และข้อความ log ก่อนส่งงานแปล/เดินสายจริง