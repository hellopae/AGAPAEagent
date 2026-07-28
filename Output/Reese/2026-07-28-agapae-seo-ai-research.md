# AGAPAE Design — SEO & AI Discoverability Research

**วันที่:** 28 ก.ค. 2026
**ผู้ทำ:** Reese (research analyst)
**เว็บที่ตรวจ:** https://agapaedesign.com

**สัญลักษณ์:** ✅ ยืนยันแล้ว (มีแหล่งอ้างอิงปฐมภูมิ) · ⚠️ ยังยืนยันไม่ได้ / แหล่งเดียว / เป็นทุติยภูมิ · 💬 ความเห็นของผู้วิเคราะห์

**ข้อจำกัดของงานวิจัยนี้ (บอกไว้ก่อน):**
- เครื่องมือ WebSearch ที่ใช้เป็น **US-geo** ผลค้นหาที่เห็นอาจไม่ตรงกับ SERP ที่ผู้ใช้ในไทยเห็นจริง — ข้อมูลคู่แข่ง/SERP ในรายงานนี้เป็น **ตัวชี้ทิศทาง ไม่ใช่ SERP ไทยของจริง**
- **ไม่มีข้อมูล search volume จริง** เพราะไม่มี Google Keyword Planner / Ahrefs / Semrush ที่เข้าถึงได้ในงานนี้ ตัวเลข volume ทุกตัวในรายงานนี้ **ไม่มี** และไม่ได้เดาขึ้นมา

---

## 0. ผลตรวจเว็บจริง (measured 28 ก.ค. 2026)

ตรวจด้วย `curl` โดยตรง ไม่ใช่ความจำ

| รายการ | ผล | หมายเหตุ |
|---|---|---|
| `https://agapaedesign.com/` | 200 | server: GitHub.com, `x-served-by: cache-bkk...` (Fastly edge ในไทย — ดี) |
| `robots.txt` | **404** | ไม่มี |
| `sitemap.xml` | **404** | ไม่มี |
| `llms.txt` | **404** | ไม่มี |
| `www.agapaedesign.com` | 301 → apex | ✅ canonical ฝั่ง host ถูกแล้ว |
| `http://` → `https://` | 301 | ✅ Enforce HTTPS เปิดอยู่ |
| `<title>` | มี | "AGAPAE Design – Graphic Designer · Illustrator · AI Management" |
| `<meta name="description">` | **ไม่มี** | |
| Open Graph / Twitter Card | **ไม่มี** | |
| JSON-LD structured data | **ไม่มี** | |
| `<link rel="canonical">` | **ไม่มี** | |
| `<html lang="th">` | มี | ✅ |
| viewport | มี | ✅ (ผลจาก WebFetch ที่บอกว่าไม่มี viewport นั้น **ผิด** — HTML ดิบมี) |
| `<img>` ใน HTML ดิบ | 8 รูป / มี alt ครบ 8 | ✅ |
| หัวข้อ h1–h3 ใน HTML ดิบ | 6 ตัว | น้อยมากสำหรับเนื้อหาขนาดนี้ |
| ขนาดไฟล์ HTML | 78.7 KB | |

### 🔴 ปัญหาใหญ่ที่สุดที่เจอ — เนื้อหา portfolio ถูก render ด้วย JavaScript

ถอด `<script>` + `<style>` + tag ออกจาก HTML ดิบแล้ว **เหลือข้อความจริงแค่ ~2,641 ตัวอักษร**
ผลงานทั้งหมดอยู่ในตัวแปร JS: `const PORT_ITEMS = [...]` (บรรทัด 807) และ `const WEB_ITEMS = [...]` แล้วค่อยยัดเข้า DOM ด้วย `innerHTML`

**ทำไมเรื่องนี้สำคัญมาก:** ✅ AI crawler รายใหญ่ **ไม่รัน JavaScript**
- Vercel วิเคราะห์ traffic จริงของบอท: GPTBot ดึงไฟล์ JS ~11.5% ของ request แต่ **ไม่ execute**; ClaudeBot ดึง JS ~23.84% และ **ไม่ execute** เช่นกัน — "they can't read client-side rendered content"
  https://vercel.com/blog/the-rise-of-the-ai-crawler
- ⚠️ (ทุติยภูมิ) รายงานปี 2026 หลายเจ้าสรุปตรงกันว่า GPTBot / ClaudeBot / PerplexityBot เห็นแต่ initial HTML; ข้อยกเว้นคือ Gemini ที่ใช้โครงสร้าง rendering ของ Googlebot
  https://searchoptimo.com/blog/do-ai-crawlers-render-javascript · https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript

💬 **แปลว่า:** ตอนนี้ ChatGPT / Claude / Perplexity มองเห็นเว็บ AGAPAE เป็นแค่หน้าที่มีข้อความ 2.6 พันตัวอักษร — ไม่เห็นชื่อผลงาน ไม่เห็นหมวด ไม่เห็นรายละเอียดโปรเจกต์ใดๆ **นี่คือจุดที่ต้องแก้ก่อนเรื่องอื่นทั้งหมด** (Googlebot รัน JS ได้ จึงกระทบ Google น้อยกว่า แต่ก็ยังเสียเปรียบเรื่อง rendering queue)

---

## 1. AI Discoverability — อะไรทำให้ AI หยิบเว็บไปอ้างอิงได้จริง

### 1.1 llms.txt — สรุป: **ยังไม่คุ้มทำเป็นลำดับต้น**

✅ **Google พูดตรงๆ ในเอกสารทางการ** (AI optimization guide, Search Central):
> "You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search"
> "Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add." (แต่แนะนำให้ใช้ต่อเพื่อ rich results)
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

✅ **John Mueller (Google)** เทียบ llms.txt กับ keywords meta tag:
> "AFAIK none of the AI services have said they're using LLMs.TXT (and you can tell when you look at your server logs that they don't even check for it)... this is what a site-owner claims their site is about... At that point, why not just check the site directly?"
https://www.searchenginejournal.com/google-says-llms-txt-comparable-to-keywords-meta-tag/544804/

⚠️ **ตัวเลข adoption / log data (ทุติยภูมิ — ยังไม่ได้เห็นรายงานต้นฉบับ ควรระวัง):**
- SE Ranking สำรวจ 300,000 โดเมน พบ adoption ~10.13%
- มีรายงานว่าจาก AI bot visit กว่า 500M ใน 90 วัน มีเพียง ~408 ครั้งที่ขอไฟล์ llms.txt โดยตรง
https://codersera.com/blog/llms-txt-complete-guide-2026/ · https://derivatex.agency/blog/llms-txt-guide/
💬 ตัวเลขสองตัวนี้ **น่าเชื่อในเชิงทิศทาง แต่ไม่ควรอ้างเป็นตัวเลขแน่นอน** เพราะยังไม่เห็นวิธีวัดต้นทาง

✅ **ยังไม่มีผู้ให้บริการ AI รายใหญ่รายใดประกาศว่าใช้ llms.txt** — OpenAI, Anthropic, Perplexity, Google ต่างมีเอกสาร robots.txt ของตัวเอง (ดูข้อ 1.3) แต่ไม่มีเอกสาร llms.txt

💬 **ข้อสังเกตที่น่าสนใจจากคู่แข่ง:** roundandnine.com **มี** `/llms.txt` — แต่มันเป็นไฟล์ที่ **Wix สร้างให้อัตโนมัติ** ไม่ใช่ความตั้งใจของเจ้าของ (ในไฟล์เขียนว่า "This site is powered by Wix and supports the Model Context Protocol (MCP)... [Site MCP Endpoint](https://www.roundandnine.com/_api/mcp)") — ตรวจได้ที่ https://www.roundandnine.com/llms.txt

**คำแนะนำ:** ทำ llms.txt ได้ **ถ้าเหลือเวลา** (ต้นทุน ~15 นาที, ความเสี่ยง 0, ผลตอบแทนที่พิสูจน์ได้ ≈ 0 ณ วันนี้) แต่ **อย่าใส่ไว้ใน 5 อันดับแรก** ของ to-do

### 1.2 สิ่งที่ **มีหลักฐาน** ว่าทำให้ AI หยิบไปตอบได้

✅ **1) เนื้อหาต้องอยู่ใน HTML ดิบ** — ดูข้อ 0 ข้างบน นี่คือข้อเดียวที่มี first-party data รองรับชัดเจนที่สุด (Vercel)

✅ **2) robots.txt คือช่องทางควบคุมเดียวที่ทุกเจ้ารองรับจริง** — OpenAI, Anthropic, Perplexity, Google ต่างเผยแพร่ user-agent + วิธีคุมผ่าน robots.txt เป็นเอกสารทางการ (ลิงก์ในข้อ 1.3)

✅ **3) ต้องถูก index โดย search backend ที่ AI นั้นใช้**
- ChatGPT Search: ใช้ index ของ Bing เป็นหลัก + เสริมด้วย crawler ของตัวเอง (OAI-SearchBot) ✅ (เอกสาร OpenAI ระบุว่า OAI-SearchBot "used to surface websites in search results in ChatGPT's search features") https://developers.openai.com/api/docs/bots
- Claude: ⚠️ มีการวิเคราะห์ว่าใช้ Brave Search เป็น backend หลัก (พบ overlap 86.7%) — เป็นการวิเคราะห์ภายนอก **Anthropic ไม่ได้ยืนยันสาธารณะ** https://www.tryprofound.com/blog/what-is-claude-web-search-explained
- Perplexity: มี index ของตัวเองผ่าน PerplexityBot ✅ https://docs.perplexity.ai/guides/bots
💬 **ผลเชิงปฏิบัติ:** การสมัคร **Bing Webmaster Tools** + ส่ง sitemap มีน้ำหนักมากกว่าที่คนไทยมักคิด เพราะเป็นทางเข้าของ ChatGPT https://www.bing.com/webmasters/help/indexnow-0z209wby

⚠️ **4) E-E-A-T และ brand mention นอกเว็บตัวเอง** — งานวิเคราะห์ปี 2026 หลายชิ้นชี้ว่า "branded web mentions" มี correlation กับการถูกอ้างใน AI Overviews สูงกว่า backlinks (0.664 vs 0.218) และ ZipTie วิเคราะห์ 2,400 citations พบ 96% มาจากแหล่งที่มีสัญญาณ E-E-A-T แรง
https://www.digitalapplied.com/blog/ai-search-citation-ranking-factors-2026-data-study · https://machinerelations.ai/research/ai-search-citation-factors-2026
💬 **นี่คือ correlation ไม่ใช่ causation** และเป็น vendor research ทั้งคู่ — เชื่อทิศทางได้ แต่อย่าอ้างตัวเลขเป็นข้อเท็จจริง

### 1.3 การอนุญาต AI crawler — **ควรเปิดทั้งหมด** สำหรับเคสนี้

เว็บ portfolio ที่อยากให้คนหาเจอ **ไม่มีเหตุผลจะบล็อกอะไรเลย** ตารางนี้อ้างจากเอกสารทางการของแต่ละเจ้า:

| User-agent | เจ้าของ | หน้าที่ | ควรทำ |
|---|---|---|---|
| `GPTBot` | OpenAI | เก็บข้อมูล**เทรนโมเดล** | ✅ Allow (เทรนแล้วแบรนด์ติดในโมเดล) |
| `OAI-SearchBot` | OpenAI | ทำให้เว็บโผล่ใน **ChatGPT search** — บล็อกแล้วจะไม่โผล่ในคำตอบ | ✅ **Allow — ห้ามบล็อกเด็ดขาด** |
| `ChatGPT-User` | OpenAI | ผู้ใช้สั่งให้เปิดหน้าเว็บ (robots.txt "may not apply") | ✅ Allow |
| `ClaudeBot` | Anthropic | เก็บข้อมูล**เทรนโมเดล** | ✅ Allow |
| `Claude-User` | Anthropic | ดึงหน้าเว็บตอนผู้ใช้ถาม Claude | ✅ **Allow** |
| `Claude-SearchBot` | Anthropic | index เพื่อผลการค้นหาของ Claude | ✅ **Allow** |
| `PerplexityBot` | Perplexity | index เพื่อแสดงใน Perplexity — เอกสารบอกให้ allow ถ้าอยากโผล่ | ✅ **Allow** |
| `Perplexity-User` | Perplexity | user-initiated — "generally ignores robots.txt" | ✅ Allow |
| `Google-Extended` | Google | คุมการใช้เนื้อหาไป**เทรน Gemini** + **grounding** ใน Gemini Apps | ✅ Allow (ถ้าบล็อก = ตัดตัวเองออกจาก Gemini) |
| `Googlebot` | Google | Search ปกติ + AI Overviews / AI Mode | ✅ Allow |

**แหล่งอ้างอิง:**
- OpenAI: https://developers.openai.com/api/docs/bots — "Disallowing OAI-SearchBot prevents site from appearing in ChatGPT search answers"
- Anthropic: https://support.claude.com/en/articles/8896518 — บอทสามตัว (ClaudeBot / Claude-User / Claude-SearchBot) ทั้งหมด "respect 'do not crawl' signals by honoring industry standard directives in robots.txt"; ปิด Claude-User = "prevents our system from retrieving your content in response to a user query"
- Perplexity: https://docs.perplexity.ai/guides/bots
- Google-Extended: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers — ✅ ระบุชัด: "Google-Extended does not impact a site's inclusion in Google Search nor is it used as a ranking signal in Google Search" (คือบล็อกไปก็ไม่ช่วยอะไร มีแต่เสีย)

💬 **ประเด็นสำคัญ:** ตอนนี้เว็บ **ไม่มี robots.txt เลย (404)** — ทางเทคนิคแปลว่า "อนุญาตทุกอย่าง" ซึ่ง**ไม่ได้เสียหาย** แต่การใส่ robots.txt ที่ allow ชัดๆ + ชี้ไป sitemap ยังคุ้มทำ เพราะ sitemap discovery คือประโยชน์หลัก ไม่ใช่การ allow

### 1.4 Structured data / schema.org — ✅ ทำ แต่ต้องเข้าใจว่าทำเพื่ออะไร

- ✅ Google ยืนยัน: **ไม่จำเป็น** สำหรับ AI features และ **ไม่มี schema พิเศษ**สำหรับ AI แต่ "it's a good idea to continue using it... helps with being eligible for rich results" https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- 💬 เหตุผลจริงที่ควรทำในเคสนี้คือ **entity disambiguation** ไม่ใช่ ranking: ตอนค้น "AGAPAE Design" เจอ **Agape Design Studio**, **Agape Design Co.**, **Agape Designs LLC** ปนกัน — LLM แยกไม่ออกว่าอันไหนคือใคร JSON-LD `Person` / `LocalBusiness` + `sameAs` ชี้ไป Instagram/Facebook/tanapat.co.th คือวิธีบอก "ตัวตนนี้คือใคร เชื่อมกับอะไร" ที่ machine อ่านได้แน่นอน

**Schema ที่ควรใส่ (ตามลำดับความสำคัญ):**
1. `ProfessionalService` หรือ `LocalBusiness` — ชื่อ, ที่อยู่ (กรุงเทพฯ), email, areaServed: Thailand, `sameAs`: [IG, FB, tanapat.co.th]
2. `Person` — Kittanate, jobTitle, worksFor → TANAPAT Printing, knowsAbout: [graphic design, packaging, illustration, AI]
3. `Service` × 6 — ตามบริการที่มี
4. `WebSite` + `BreadcrumbList`
5. `CreativeWork` / `ImageObject` ต่อชิ้นงาน portfolio (ถ้าทำ static ได้)

**เทียบคู่แข่ง (ตรวจจริงวันนี้):** pagdesign.co.th มี `Organization` + `WebSite` + `BreadcrumbList` + `SearchAction`; roundandnine.com มี `LocalBusiness` + `PostalAddress` + `WebSite`; designbydinsor.com มี `Organization` + `WebSite` — **AGAPAE มี 0**

### 1.5 เนื้อหาแบบไหนที่ LLM ชอบหยิบ

⚠️ ทั้งหมดในหัวข้อนี้เป็น **คำแนะนำที่ยังไม่มีหลักฐานหนัก** — เป็น pattern ที่ vendor research รายงานตรงกัน แต่ไม่มีเจ้าของ LLM รายไหนยืนยัน:
- ข้อความตอบคำถามตรงๆ เป็นย่อหน้าสั้นๆ (LLM ตัดไปอ้างได้ทั้งก้อน) — เช่น "ราคางานออกแบบ packaging เริ่มต้นเท่าไหร่", "ใช้เวลากี่วัน"
- ตัวเลข/ข้อเท็จจริงเฉพาะเจาะจง ("40+ ปี", "พิมพ์ offset ขั้นต่ำ X ชิ้น") ที่หาจากที่อื่นไม่ได้
- FAQ / ตาราง / รายการ ที่มีโครงสร้างชัด
- ชื่อเฉพาะที่ค้นแล้วเจอที่เดียว (brand, ชื่อโปรเจกต์, ชื่อลูกค้า)
💬 ตรงข้ามกับสิ่งที่เว็บ AGAPAE มีตอนนี้ ซึ่งเป็น **การ์ดผลงานที่มีแต่รูป + ชื่อสั้นๆ ใน JS** — LLM หยิบไปตอบไม่ได้เลย

---

## 2. Google SEO สำหรับเว็บ single-page static บน GitHub Pages

### ข้อจำกัดของ GitHub Pages ที่ต้องรู้
- ✅ **ทำ server-side redirect (301/302) ไม่ได้** — ไม่ใช่ web server เต็มรูปแบบ ทำได้แค่ `<meta http-equiv="refresh">` ซึ่งไม่ใช่ 301 จริง https://github.com/orgs/community/discussions/27676 · https://www.lprp.fr/2022/11/redirects-on-github-pages/
- ✅ **ตั้ง custom HTTP header ไม่ได้** (ไม่มี cache-control / security header เอง)
- ✅ **SPA routing ไม่รองรับ** — ขอ path ที่ไม่มีไฟล์ = 404 (แต่ทำ custom 404.html ได้ และคืน status 404 จริง) https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page
- 💬 **ข้อดีที่คนมองข้าม:** ไฟล์ static + Fastly CDN → เร็วมาก (headers ยืนยัน `x-served-by: cache-bkk...` = เสิร์ฟจาก edge ในกรุงเทพฯ) Core Web Vitals ได้เปรียบ agency ที่ใช้ WordPress
- 💬 **สิ่งที่ทำได้หมด ไม่ติดข้อจำกัด:** robots.txt, sitemap.xml, meta tags, JSON-LD, หน้าย่อยแบบโฟลเดอร์ (`/services/packaging/index.html`), llms.txt

### เรียงตามผลกระทบ (มาก → น้อย)

| # | สิ่งที่ทำ | แรง | ต้นทุน | เหตุผล |
|---|---|---|---|---|
| 1 | **ย้าย PORT_ITEMS / WEB_ITEMS จาก JS มาเป็น HTML จริง** (server-render ตอน build หรือเขียน static ไปเลย, ให้ JS ทำแค่ filter/lightbox) | 🔥🔥🔥 | กลาง | AI crawler ไม่รัน JS (Vercel) — ตอนนี้เนื้อหา 95% มองไม่เห็น |
| 2 | **แตกหน้าย่อย** อย่างน้อย 4–6 หน้า: `/graphic-design/`, `/packaging/`, `/illustration/`, `/printing/`, `/ai-management/` + `/contact/` | 🔥🔥🔥 | กลาง | single-page = ranking ได้ keyword หลักแค่ชุดเดียว; หน้าย่อย = แต่ละหน้าเล็งคำของตัวเอง (คู่แข่งทุกรายทำ) |
| 3 | **meta description + OG + canonical** ทุกหน้า | 🔥🔥 | ต่ำ (30 นาที) | คู่แข่งทั้ง 4 รายที่ตรวจมี ครบ AGAPAE ไม่มี; OG กระทบ CTR ตอนแชร์ LINE/FB โดยตรง |
| 4 | **Google Business Profile** (ถ้ายังไม่มี) ผูกกับที่อยู่จริงของ TANAPAT | 🔥🔥 | ต่ำ | ⚠️ Whitespark 2026: GBP signals ~32% ของ local ranking, primary category = อันดับ 1 https://www.clickrank.ai/local-seo-ranking-factors/ (ทุติยภูมิ) |
| 5 | **sitemap.xml + robots.txt + Google Search Console + Bing Webmaster Tools** | 🔥🔥 | ต่ำ | Bing = ทางเข้า ChatGPT |
| 6 | **JSON-LD** (ตามข้อ 1.4) | 🔥 | ต่ำ | entity disambiguation + rich result eligibility |
| 7 | **หน้า case study แบบมีข้อความจริง** 3–5 ชิ้น (โจทย์ → กระบวนการ → ผลลัพธ์ + ตัวเลข) | 🔥🔥 | สูง | นี่คือสิ่งที่ LLM หยิบไปอ้างได้จริง และเป็นสิ่งที่ DINSOR ทำ (15+ case studies) แต่ AGAPAE ไม่มีเลย |
| 8 | **FAQ ที่ตอบคำถามลูกค้าจริง** (ราคาเริ่มต้น, ระยะเวลา, ไฟล์ที่ส่งมอบ, จำนวนแก้ไข, พิมพ์ขั้นต่ำ) | 🔥 | ต่ำ | รูปแบบที่ LLM หยิบง่ายที่สุด; pagdesign มีหน้า FAQs |
| 9 | llms.txt | ~0 | ต่ำมาก | ไม่มีหลักฐานว่าได้ผล ทำเพราะไม่เสียหาย |

💬 **ข้อ 1 กับ 2 คือ 80% ของผลลัพธ์** ที่เหลือเป็นงานเก็บรายละเอียด

---

## 3. คีย์เวิร์ด

> ⚠️ **ไม่มีข้อมูล search volume** — ไม่ได้เข้าถึง Keyword Planner / Ahrefs / Semrush การจัดกลุ่ม "ยาก/มีช่อง" ข้างล่างมาจาก **การดูองค์ประกอบ SERP ที่ค้นได้จริง** เท่านั้น (และ SERP นั้นเป็น US-geo) ไม่ใช่ตัวเลข ถ้าอยากได้ตัวเลขจริงต้องเปิด Google Ads account (ฟรี) แล้วใช้ Keyword Planner

### กลุ่ม A — Commercial / จ้างงานทันที (แข่งยากที่สุด)
`รับออกแบบกราฟิก` · `รับออกแบบโลโก้` · `รับวาดภาพประกอบ` · `รับออกแบบ packaging` · `รับออกแบบบรรจุภัณฑ์` · `ฟรีแลนซ์กราฟิกดีไซน์`

**หลักฐานว่าแข่งยาก:** ค้นคำกลุ่มนี้แล้ว SERP ถูกยึดโดย **marketplace ไม่ใช่เว็บ portfolio ส่วนตัว** — Fastwork.co, FreelanceBay, ThaiFreelanceAgency, FriendlyFreelance ครองเกือบทุกช่อง และมี **ราคา anchor ต่ำมาก** (Fastwork โฆษณา "เริ่มต้น ฿500" ทั้งหมวด portfolio และหมวด illustration)
https://fastwork.co/illustration · https://fastwork.co/portfolio-resume/portfolio · https://www.freelancebay.com/freelancer/graphics-design/1
💬 เว็บเดี่ยวชนะ marketplace ในคำกว้างพวกนี้ยากมาก และต่อให้ชนะ ก็ได้ traffic ที่คาดหวังราคา 500 บาท — **ไม่ใช่ลูกค้าที่ AGAPAE อยากได้**

ส่วนฝั่ง `รับออกแบบ packaging` มีบริษัทที่มีโรงพิมพ์หนุนครองอยู่: pagdesign.co.th, thaiprintshop.com, cospackagingdesign.com, printingdesignbox.com (โฆษณา "เริ่มต้น 950 บาท")

### กลุ่ม B — คำผสมที่ยาวขึ้น / เจาะเฉพาะ (💬 น่าจะมีช่อง)
คำที่ **รวมสองความสามารถเข้าด้วยกัน** ซึ่งคนอื่นแยกกันทำ:
- `ออกแบบ packaging พร้อมพิมพ์` / `ออกแบบบรรจุภัณฑ์ครบวงจร โรงพิมพ์`
- `ออกแบบสิ่งพิมพ์ หน่วยงานราชการ` / `รับออกแบบและพิมพ์ งานราชการ`
- `ภาพประกอบไทยร่วมสมัย` / `วาดภาพประกอบสไตล์ไทย` / `ภาพประกอบพุทธศิลป์`
- `ออกแบบโลโก้ + งานพิมพ์ ครบจบที่เดียว`
- `รับทำ artwork ก่อนพิมพ์` / `เตรียมไฟล์ก่อนพิมพ์ prepress`

💬 เหตุผล: คำเหล่านี้ต้องการ **ทั้งงานออกแบบและโรงพิมพ์จริง** — freelance ทั่วไปตอบไม่ได้ โรงพิมพ์ทั่วไปออกแบบไม่สวย AGAPAE ทำได้ทั้งคู่

### กลุ่ม C — คำ AI (💬 ช่องว่างที่ชัดที่สุด แต่ demand ยังไม่รู้)
`AI Management` · `รับวางระบบ AI ให้ธุรกิจ` · `ใช้ AI ทำงานออกแบบ` · `AI prompt engineer ไทย` · `ที่ปรึกษา AI SME ไทย`

💬 แทบไม่มีคู่แข่งไทยในสายออกแบบที่วางตัวเองเป็น "AI Management" — **แต่ก็ยังไม่รู้ว่ามีคนค้นหรือเปล่า** (ไม่มีข้อมูล) นี่คือ bet ที่คุ้ม **เพราะเป็น differentiator ในสายตา LLM** มากกว่าเพราะ search volume

### กลุ่ม D — Branded / Navigational (ต้องล็อกให้ได้ 100%)
`AGAPAE Design` · `AGAPAE Design กรุงเทพ` · `TANAPAT Printing` · `ธนภัทรการพิมพ์`

🔴 **มีปัญหาจริงตรงนี้:** ค้น "AGAPAE Design" แล้วชนกับ **Agape Design Studio** (agape-design.com), **Agape Design Co.** (agapedesign.co), **Agape Designs LLC** (LinkedIn) — คนละธุรกิจคนละประเทศ นอกจากนี้ผลค้นยังโชว์ title เก่า "AGAPAE Design | Graphic Designer & AI Prompt Engineer" ซึ่ง**ไม่ตรงกับ title ปัจจุบัน** = index ยังไม่อัปเดต
💬 **แก้ด้วย:** JSON-LD `sameAs` ผูก IG/FB/tanapat.co.th + ระบุ "Bangkok, Thailand" ให้ชัดในเนื้อหา + ขอ re-index ผ่าน Search Console

### กลุ่ม E — Informational (สำหรับดึง AI citation โดยเฉพาะ)
`ออกแบบ packaging ราคาเท่าไหร่` · `ไฟล์แบบไหนส่งโรงพิมพ์ได้` · `CMYK กับ RGB ต่างกันยังไง` · `กล่องบรรจุภัณฑ์มีกี่แบบ` · `ออกแบบโลโก้ใช้เวลากี่วัน`
💬 คำกลุ่มนี้ traffic อาจไม่แปลงเป็นลูกค้าตรงๆ แต่เป็น **คำถามที่คนถาม ChatGPT/Claude จริง** และเป็นประเภทเนื้อหาที่ LLM หยิบไปอ้างง่ายที่สุด — AGAPAE ตอบได้ด้วยประสบการณ์โรงพิมพ์ 40 ปี ซึ่ง marketplace ตอบไม่ได้

---

## 4. คู่แข่ง — ตรวจจริง 5 ราย (28 ก.ค. 2026)

| เว็บ | robots | sitemap | llms.txt | meta desc | OG | JSON-LD |
|---|---|---|---|---|---|---|
| **agapaedesign.com** | ❌ 404 | ❌ 404 | ❌ 404 | ❌ | ❌ | ❌ |
| pagdesign.co.th | ✅ | ✅ (301) | ❌ | ✅ | ✅ | ✅ Organization, WebSite, BreadcrumbList, SearchAction, ImageObject |
| roundandnine.com | ✅ | ✅ (3 URLs) | ✅ (Wix auto) | ✅ | ✅ | ✅ LocalBusiness, PostalAddress, WebSite |
| designbydinsor.com | ✅ | ✅ (301) | ❌ | ✅ | ✅ | ✅ Organization, WebSite, SearchAction |
| graphicdesignthailand.com | ✅ | ✅ (10 URLs) | ❌ | ✅ | ✅ | ✅ (1 block) |

**AGAPAE เป็นรายเดียวใน 5 รายที่ไม่มีอะไรเลย**

### สิ่งที่คู่แข่งทำแล้ว AGAPAE ยังไม่ทำ

**PAG Design** (https://pagdesign.co.th) — คู่แข่งที่ใกล้เคียงที่สุด (ออกแบบ + โรงพิมพ์เหมือนกัน)
- โครงสร้างหน้า: Home / Portfolio / Services / About / **FAQs** / **Our Clients** / Contact
- Portfolio **แยกหมวดพร้อมจำนวน**: Food Packaging 106 · Non-Food 30+ · Logo & Mascot 22 · Brochure 15 · Ad & Banner 11
- แยกหน้า service ตามเทคนิคการพิมพ์ (Offset / Gravure / Inkjet / On-Demand) — ทำให้ติดคำเฉพาะทางได้
- Trust signals ที่จับต้องได้: **20+ ปี**, "80% ลูกค้าเป็นบริษัทอาหารชั้นนำ", **testimonial 4 ราย พร้อมชื่อ+ตำแหน่ง**, โลโก้แบรนด์ดัง 15+ (เถ้าแก่น้อย ฯลฯ), นโยบายเก็บไฟล์ 10 ปี, มาตรฐาน GMP
- ✅ **มีเบอร์โทร 2 เบอร์ + Line ID + เวลาทำการชัดเจน** (จ–ศ 9:00–17:45)

**DINSOR Design Studio** (https://www.designbydinsor.com)
- **case study เขียนเป็นเรื่อง 15+ ชิ้น** ระบุชื่อลูกค้าจริง (Banyan Tree Veya, PARK SILOM, Kept by Krungsri, Gaysorn Urban Resort) — นี่คือเนื้อหาที่ LLM หยิบไปอ้างได้
- มีหมวด **Design Story** (บล็อก)
- แยก Works เป็น Brand Visual / Marketing Communication / Art Direction / Graphic Signage
- **ทวิภาษาไทย-อังกฤษ**

**Round and Nine** (https://www.roundandnine.com) — schema `LocalBusiness` + `PostalAddress` + hreflang 2 ภาษา + llms.txt (Wix ทำให้)

### ช่องว่างที่สรุปได้
1. **ไม่มีเบอร์โทร** — AGAPAE มีแค่ email + LINE คู่แข่งทุกรายมีเบอร์ (กระทบทั้ง trust และ LocalBusiness schema)
2. **ไม่มีที่อยู่/พิกัด** — ทำ local SEO ไม่ได้เลย
3. **ไม่มี testimonial / ชื่อลูกค้า / โลโก้ลูกค้า**
4. **ไม่มี case study ที่เป็นข้อความ** — มีแต่รูป (และรูปยังอยู่ใน JS อีก)
5. **ไม่มีหน้า FAQ / ไม่มีข้อมูลราคาหรือ range ใดๆ**
6. **ไม่มีหน้าย่อยเลย** — ทุกอย่างอยู่หน้าเดียว
7. **ไม่มีบล็อก/บทความ**
8. **ตัวเลขไม่ตรงกัน** — เว็บเขียน "20+ ปี" แต่บรีฟบอก TANAPAT มี "40+ ปี" 💬 ควรเล่าให้ชัดว่า *"ดีไซเนอร์ 20+ ปี บนฐานโรงพิมพ์ครอบครัว 40+ ปี"* — สองตัวเลขนี้ถ้าเล่าถูกจะแรงกว่าตัวเดียว

---

## 5. ช่องว่าง / โอกาสที่ AGAPAE ได้เปรียบ

### 5.1 มีโรงพิมพ์จริงหนุนหลัง = E-E-A-T ที่ freelance ปลอมไม่ได้
💬 ในสายตา Google และ LLM "ประสบการณ์จริง (Experience)" คือสิ่งที่ยืนยันยากที่สุดและมีค่าที่สุด AGAPAE มีของจริง: โรงพิมพ์ TANAPAT (tanapat.co.th — ตรวจแล้วออนไลน์ 200) นิติบุคคลจริง 40+ ปี ที่อยู่จริงในกรุงเทพฯ
**ทำอะไรได้:**
- ผูกสองเว็บด้วย JSON-LD (`Person.worksFor` → `Organization` TANAPAT, `sameAs` ไขว้กัน) — ให้ LLM เข้าใจว่าเป็น entity เดียวที่เชื่อมโยงกัน
- ลิงก์ไขว้ในเนื้อหาจริง ไม่ใช่แค่ footer
- ✅ ตอนนี้เว็บมี link ไป tanapat.co.th อยู่แล้ว (ตรวจพบใน HTML) — แต่ยังไม่มี schema รองรับ

### 5.2 "ออกแบบ + พิมพ์จริง จบที่เดียว" คือ positioning ที่ยึดได้
💬 SERP แสดงว่าตลาดแยกเป็นสองฝั่ง: **marketplace freelance ราคาถูก** (Fastwork ฿500) กับ **โรงพิมพ์ที่มีทีมออกแบบ** (PAG, Thai Print Shop) — AGAPAE อยู่ตรงกลางแบบที่มีทั้งฝีมือดีไซน์ระดับ studio และโรงพิมพ์จริง ซึ่ง**หายาก**
คำที่ควรยึด: "ออกแบบโดยคนที่รู้ว่าพิมพ์ออกมาจะเป็นยังไง"

### 5.3 AI Management เป็น differentiator ที่ LLM จะจำได้ง่าย
💬 ไม่มีนักออกแบบไทยรายไหนใน SERP ที่ตรวจ วางตัวเองเป็น AI Management specialist — **คำเฉพาะที่ไม่ซ้ำใครคือสิ่งที่ LLM หยิบไปตอบง่ายที่สุด** เพราะไม่มีตัวเลือกอื่นให้เลือก แต่ต้องเขียนเป็น **ข้อความจริงใน HTML** ว่า AI Management คืออะไร ทำอะไรให้ลูกค้า ไม่ใช่แค่คำเดียวใน card

### 5.4 ภาพประกอบไทยร่วมสมัย / พุทธศิลป์ = niche ที่แทบไม่มีคู่แข่ง
💬 เว็บใช้ hero เป็นพระพุทธรูป และเขียนว่า "สไตล์ไทยร่วมสมัย" — นี่เป็น visual niche ที่ marketplace ไม่มี (marketplace เน้นอนิเมะ/ชิบิ/แฟนอาร์ต ตามที่เห็นใน FreelanceBay) แต่ตอนนี้**ไม่มีข้อความอธิบาย niche นี้ในเว็บเลย**

### 5.5 ความเร็ว — ได้เปรียบทางเทคนิคฟรีๆ
✅ static + Fastly edge กรุงเทพฯ (`x-served-by: cache-bkk2280038-BKK`) เร็วกว่า agency ที่ใช้ CMS หนักๆ แน่นอน — Google บอกให้ "Provide a good page experience" ในคู่มือ AI optimization ข้อนี้ได้ฟรีอยู่แล้ว
💬 แต่ **ความเร็วไม่ช่วยอะไรถ้าไม่มีเนื้อหาให้อ่าน** — กลับไปที่ข้อ 1

---

## 6. สรุปสิ่งที่ควรทำ เรียงตามลำดับ

**สัปดาห์ที่ 1 (ต้นทุนต่ำ ผลชัด)**
1. ย้าย `PORT_ITEMS` / `WEB_ITEMS` ออกมาเป็น HTML จริง (ให้ JS ทำแค่ filter)
2. ใส่ meta description + OG + Twitter Card + canonical
3. สร้าง robots.txt (allow ทุก AI bot + ชี้ sitemap) + sitemap.xml
4. ใส่ JSON-LD: ProfessionalService + Person + sameAs
5. สมัคร Google Search Console + Bing Webmaster Tools ส่ง sitemap ทั้งคู่
6. เพิ่มเบอร์โทร + ที่อยู่ (หรืออย่างน้อยเขต/จังหวัด) + เวลาทำการ

**เดือนที่ 1**
7. แตกหน้าย่อย 5–6 หน้าตามบริการ
8. เขียน case study แบบมีเนื้อความ 3 ชิ้น
9. เพิ่ม FAQ 8–10 ข้อ ตอบคำถามลูกค้าจริง
10. ตั้ง / ปรับ Google Business Profile

**ทำเมื่อว่าง**
11. llms.txt
12. บล็อก/บทความกลุ่ม E

---

## แหล่งอ้างอิงทั้งหมด

**ปฐมภูมิ (เอกสารทางการ)**
- Google — Optimizing for generative AI features: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google — AI Features and Your Website: https://developers.google.com/search/docs/appearance/ai-features
- Google — Common crawlers (Google-Extended): https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- OpenAI — Bots / crawler user agents: https://developers.openai.com/api/docs/bots
- Anthropic — Does Anthropic crawl data from the web: https://support.claude.com/en/articles/8896518
- Perplexity — PerplexityBot / Perplexity-User: https://docs.perplexity.ai/guides/bots
- Bing — IndexNow: https://www.bing.com/webmasters/help/indexnow-0z209wby
- GitHub Docs — custom 404: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page
- GitHub Community — SPA 404 / no redirects: https://github.com/orgs/community/discussions/27676

**ข้อมูลจากผู้ให้บริการ (first-party data ของบุคคลที่สาม)**
- Vercel — The rise of the AI crawler (JS rendering data): https://vercel.com/blog/the-rise-of-the-ai-crawler

**ทุติยภูมิ / ต้องระวัง**
- Search Engine Journal — Mueller on llms.txt: https://www.searchenginejournal.com/google-says-llms-txt-comparable-to-keywords-meta-tag/544804/
- Codersera — llms.txt adoption: https://codersera.com/blog/llms-txt-complete-guide-2026/
- Derivatex — llms.txt guide: https://derivatex.agency/blog/llms-txt-guide/
- SearchOptimo — do AI crawlers render JS: https://searchoptimo.com/blog/do-ai-crawlers-render-javascript
- Lantern — AI crawlers do not render JavaScript: https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript
- Digital Applied — AI search citation factors 2026: https://www.digitalapplied.com/blog/ai-search-citation-ranking-factors-2026-data-study
- Machine Relations — AI citation factors: https://machinerelations.ai/research/ai-search-citation-factors-2026
- ClickRank — Local SEO ranking factors 2026: https://www.clickrank.ai/local-seo-ranking-factors/
- Profound — Claude web search backend: https://www.tryprofound.com/blog/what-is-claude-web-search-explained

**คู่แข่ง / SERP ไทย**
- PAG Design: https://pagdesign.co.th/
- DINSOR Design Studio: https://www.designbydinsor.com/
- Round and Nine: https://www.roundandnine.com/ · llms.txt: https://www.roundandnine.com/llms.txt
- Graphic Design Thailand: https://www.graphicdesignthailand.com/
- Fastwork illustration: https://fastwork.co/illustration
- Fastwork portfolio: https://fastwork.co/portfolio-resume/portfolio
- FreelanceBay: https://www.freelancebay.com/freelancer/graphics-design/1
- Thai Print Shop packaging design: https://www.thaiprintshop.com/product-category/packaging-design/
- Printing Design Box: https://printingdesignbox.com/packaging-design/
