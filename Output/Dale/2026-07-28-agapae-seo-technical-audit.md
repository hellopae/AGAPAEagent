# AGAPAE Design — Technical SEO + AI-Readability Audit

- **วันที่:** 2026-07-28
- **ผู้ตรวจ:** Dale (DevOps / Technical)
- **ขอบเขต:** technical SEO + ความพร้อมที่จะถูก AI crawler (GPTBot / ClaudeBot / PerplexityBot / Google-Extended) อ่านและอ้างอิง
- **สถานะ:** audit อย่างเดียว — **ไม่มีการแก้ไฟล์ใดๆ**

## สภาพแวดล้อมที่ตรวจ

| รายการ | ค่า |
|---|---|
| Repo | `/Users/agapae/Documents/Work PAE/Claude/Web Agapae/` |
| Live | https://agapaedesign.com (GitHub Pages, CNAME → `agapaedesign.com`) |
| Git | branch `main`, working tree สะอาด, HEAD = `7925863` |
| Local vs Live | `diff` = **IDENTICAL** — ที่เห็นในเครื่องคือที่ serve จริง |
| `index.html` | 1,245 บรรทัด / 78,739 bytes → **19,205 bytes gzipped** (GitHub Pages เปิด gzip ให้แล้ว ✓) |
| Build step | ไม่มี — serve ไฟล์ตรงๆ |

---

# สรุปผู้บริหาร

เว็บ **สวยและเขียนดีในเชิงวิศวกรรม** — มี `prefers-reduced-motion`, มี fallback `.jpg` ให้ webp, มี `loading="lazy"` + `decoding="async"` ครบทุกรูป, มี IntersectionObserver ที่หยุดวิดีโอเมื่อเลื่อนพ้นจอ, มี `preconnect` ถูกต้อง, มี `preload` แบบ media-query ที่ใช้ถูกจริงๆ ส่วนนี้ **ทำถูกแล้ว ไม่ต้องแก้**

แต่ในมุม SEO / AI มีปัญหาหลักอยู่ **2 เรื่อง** ที่ทับซ้อนกัน:

1. **`<head>` ว่างเปล่าในเชิง SEO** — ไม่มี description / canonical / OG / JSON-LD / favicon เลย เวลาเว็บถูกแชร์หรือถูก AI สรุป ไม่มีอะไรให้จับนอกจาก `<title>`
2. **เนื้อหา 95% ถูกสร้างด้วย JS ตอน runtime** — crawler ที่ไม่รัน JS (ซึ่งคือ **GPTBot, ClaudeBot, PerplexityBot ทั้งหมด**) เห็นข้อความแค่ **1,678 ตัวอักษร** จากทั้งเว็บ portfolio 26 ชิ้น + เว็บโปรเจกต์ 7 ตัวพร้อมคำอธิบายไทยยาวๆ **หายไปหมด**

ข้อ 2 คือประเด็นใหญ่ที่สุดของงานนี้

---

# 1. `<head>` — ตรวจทีละบรรทัด

โค้ดจริง `index.html:1-14`:

```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AGAPAE Design – Graphic Designer · Illustrator · AI Management</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="image" href="Pic/video/buddha-hero-poster.webp" media="(max-width:1024px)" fetchpriority="high">
  <link rel="preload" as="image" href="Pic/video/buddha-hero-wide-poster.webp" media="(min-width:1025px)" fetchpriority="high">
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

| รายการ | สถานะ | หมายเหตุ |
|---|---|---|
| `charset` | ✓ ถูกแล้ว | บรรทัดแรกของ head — ถูกต้องตามที่ควร |
| `viewport` | ✓ ถูกแล้ว | ไม่ล็อก `maximum-scale` = ดี ไม่ทำลาย accessibility |
| `<title>` | ⚠️ ใช้ได้ แต่ทิ้งโอกาส | `index.html:6` — 62 ตัวอักษร ยาวกำลังดี แต่ **ไม่มีคีย์เวิร์ดภาษาไทยเลย** ทั้งที่ `lang="th"` คนไทยค้น "รับออกแบบกราฟิก" ไม่ใช่ "graphic designer" และไม่มีชื่อจังหวัด/ประเทศ |
| `meta description` | ✗ **ไม่มี** | ผลใหญ่สุดในหมวดนี้ — Google จะไปหยิบข้อความมั่วๆ จากหน้าแทน และ AI ที่ไม่รัน JS จะไม่มีอะไรให้สรุปเลย |
| `canonical` | ✗ ไม่มี | เว็บเข้าถึงได้หลาย URL (`agapaedesign.com`, `www.`, `hellopae.github.io/Web-AGAPAE/`) → เสี่ยงถูกมองเป็น duplicate |
| Open Graph | ✗ ไม่มี | แชร์ LINE / Facebook / X จะได้กล่องเปล่า — สำคัญมากสำหรับสตูดิโอออกแบบ เพราะช่องทางหาลูกค้าหลักคือ LINE |
| Twitter Card | ✗ ไม่มี | |
| favicon | ✗ ไม่มี | ยืนยันแล้ว: `curl https://agapaedesign.com/favicon.ico` → **404** ทั้งที่มี `Pic/logo.png` (6.8 KB) อยู่แล้ว ใช้ได้เลย |
| `theme-color` | ✗ ไม่มี | ผลน้อย แต่ 1 บรรทัด |
| `robots` meta | – ไม่ต้องมี | ไม่ใส่ = `index,follow` อยู่แล้ว **ถูกแล้ว อย่าไปใส่** |
| `preconnect` | ✓ **ถูกแล้ว** | ทั้ง `fonts.googleapis.com` และ `fonts.gstatic.com` + `crossorigin` บนตัวหลัง — ทำถูกเป๊ะ คนส่วนใหญ่ลืม `crossorigin` |
| `preload` posters | ✓ ถูกแล้ว (แต่ดู §4.2) | `media` + `fetchpriority="high"` ใช้ถูกวิธี ตรงกับ CSS ที่ `index.html:83,88` จริง |
| Chart.js | ✗ **ผิดตำแหน่ง** | ดู §4.1 |

### 1.1 เรื่องภาษา — `lang="th"` กับเนื้อหา 2 ภาษา

สถานการณ์จริง: `lang="th"` แต่ `<title>`, `<h1>` "Creative Design Studio", nav ทั้งหมด, ชื่อ service, ชื่อ h2 ทุกตัว **เป็นอังกฤษ** ส่วนคำอธิบาย (`hero-sub`, `srv-desc`, `web-desc`) เป็นไทย

**คำแนะนำ — และข้อที่ต้อง "อย่าทำ":**

- **อย่าใส่ `hreflang`** `hreflang` มีไว้บอก Google ว่า "หน้านี้มีอีกเวอร์ชันภาษาอื่นที่ URL อื่น" เว็บนี้มี URL เดียว หน้าเดียว **ใส่ไปก็ไม่มีผลอะไร** และถ้าใส่ผิด (เช่น ชี้กลับหาตัวเอง 2 ภาษา) จะกลายเป็น signal ขยะ — ข้ามไปเลย
- **เก็บ `lang="th"` ไว้** ถูกแล้ว เพราะ prose ที่มีความหมายจริงๆ (คำอธิบายบริการ, คำอธิบายเว็บโปรเจกต์) เป็นไทยทั้งหมด
- **ใส่ `lang="en"` เฉพาะบล็อกที่เป็นอังกฤษล้วน** — `<h1>`, `<ul class="nav-links">`, `.srv-name`, `.sec-title` แต่ละตัว วิธีนี้ช่วยทั้ง screen reader (จะได้ไม่อ่าน "Creative Design Studio" ด้วยเสียงไทย) และช่วย AI แยกว่าอะไรเป็นชื่อเฉพาะ อะไรเป็นเนื้อหา
- ใน JSON-LD ให้ประกาศ `"inLanguage": ["th", "en"]` — ตรงนี้แหละที่บอกได้ว่าเว็บ 2 ภาษา

---

# 2. Structured Data (JSON-LD) — ปัจจุบัน: ไม่มีเลย

**ทำไมเรื่องนี้สำคัญกับ AI มากกว่า SEO ธรรมดา:** JSON-LD คือข้อมูลที่ AI crawler อ่านได้ **โดยไม่ต้องรัน JS** และเป็น fact ที่ machine-readable ตรงๆ ไม่ต้องเดาจากข้อความ สำหรับเว็บที่เนื้อหาถูก render ด้วย JS (ซึ่งคือเว็บนี้) JSON-LD คือ **ทางเดียว**ที่จะทำให้ AI รู้จักผลงานคุณโดยไม่ต้องรื้อ architecture

## 2.1 schema ที่ควรมี (และไม่ควรมี)

| Schema | ควรใส่? | เหตุผล |
|---|---|---|
| `ProfessionalService` | ✅ **ใส่** | ตรงกับธุรกิจที่สุด (subtype ของ `LocalBusiness`) ครอบทั้ง Organization |
| `WebSite` | ✅ ใส่ | ประกาศ `inLanguage` + ผูกกับ publisher |
| `ItemList` ของเว็บโปรเจกต์ 7 ตัว | ✅ **ใส่ — คุ้มที่สุด** | ข้อมูลนี้มีคุณภาพสูงมาก (ชื่อจริง + URL จริง + คำอธิบายไทยละเอียด) แต่ตอนนี้ซ่อนอยู่ใน JS array ที่ `index.html:823-894` AI มองไม่เห็นเลย ย้ายมา JSON-LD = AI อ้างอิงได้ทันที |
| `CreativeWork` ของงาน motion 2 ชิ้น | ✅ ใส่ | THE BUDDHA / RAIN IN THE CITY มีชื่อจริง มี sub จริง |
| `Person` | ⚠️ **ยังใส่ไม่ได้** | **ในเว็บไม่มีชื่อคนเลย** ทั้งหน้าไม่ปรากฏชื่อ-นามสกุลผู้ก่อตั้ง ถ้าจะใส่ `Person` ต้องเพิ่มชื่อจริงลงในเนื้อหาที่มองเห็นได้ก่อน (schema ต้องตรงกับสิ่งที่ผู้ใช้เห็น) — ผมไม่แต่งชื่อให้ |
| `BreadcrumbList` | ❌ **ไม่ต้อง** | เว็บหน้าเดียว ไม่มีลำดับชั้น ใส่ไปก็ไม่ได้อะไร |
| `FAQPage` | ❌ **ยังไม่ต้อง** | **ในเว็บไม่มีเนื้อหา FAQ อยู่จริง** การใส่ `FAQPage` โดยไม่มีคำถาม-คำตอบที่ผู้ใช้เห็นบนหน้า = ผิดนโยบาย Google (structured data spam) โดนลดอันดับได้ → ถ้าอยากได้ ให้ **เขียน section FAQ จริงบนหน้าเว็บก่อน** แล้วค่อย markup ตาม (แนะนำมาก — FAQ คือรูปแบบที่ AI ชอบหยิบไปตอบที่สุด) |
| `AggregateRating` / `Review` | ❌ ห้าม | ไม่มีรีวิวจริงบนเว็บ ใส่ = manual action |

## 2.2 JSON-LD ตัวจริง — เอาไปวางได้เลย

ข้อมูลทุกฟิลด์ด้านล่างดึงมาจาก `index.html` จริง (อ้าง line ไว้ในคอมเมนต์) **ไม่มีการแต่งข้อมูลขึ้นเอง** — ฟิลด์ที่เว็บไม่มีข้อมูล ผมทำเครื่องหมาย `TODO` ไว้ให้เติมเอง

วางเป็น block เดียวก่อนปิด `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://agapaedesign.com/#studio",
      "name": "AGAPAE Design",
      "alternateName": "AGAPAE Design Studio",
      "url": "https://agapaedesign.com/",
      "email": "agapaedesign@gmail.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://agapaedesign.com/Pic/logo.png"
      },
      "image": "https://agapaedesign.com/Pic/video/buddha-hero-wide-poster.webp",
      "description": "สตูดิโอออกแบบกราฟิก ภาพประกอบ และ AI Management ประสบการณ์กว่า 20 ปีในวงการกราฟิกดีไซน์และงานพิมพ์ รับงาน Branding, Logo, Packaging, สิ่งพิมพ์ และงานพิมพ์คุณภาพสูงสำหรับองค์กร หน่วยงานรัฐ และเอกชนทั่วประเทศ",
      "slogan": "Creative Design Studio",
      "priceRange": "$$",
      "inLanguage": ["th", "en"],

      "areaServed": {
        "@type": "Country",
        "name": "Thailand"
      },

      "sameAs": [
        "https://line.me/ti/p/~hellopae",
        "https://tanapat.co.th/"
      ],

      "knowsAbout": [
        "Graphic Design",
        "Branding",
        "Logo Design",
        "Packaging Design",
        "Digital Illustration",
        "AI Management",
        "Premium Printing",
        "Adobe Illustrator",
        "Adobe Photoshop",
        "Adobe InDesign",
        "Procreate"
      ],

      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "agapaedesign@gmail.com",
          "availableLanguage": ["th", "en"]
        }
      ],

      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "บริการของ AGAPAE Design",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Graphic Design",
              "description": "Branding, Logo, Packaging และสิ่งพิมพ์ทุกประเภท ด้วยประสบการณ์กว่า 20 ปี"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Illustration",
              "description": "วาดภาพประกอบดิจิทัลด้วย Procreate และ Illustrator สไตล์ไทยร่วมสมัย"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Management & Efficiency",
              "description": "วางแผน จัดการ ควบคุม AI แต่ละชนิดให้เหมาะกับงานที่ทำ"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Premium Printing",
              "description": "งานพิมพ์คุณภาพสูงสำหรับองค์กร หน่วยงานรัฐ และเอกชนทั่วประเทศ"
            }
          }
        ]
      }

      // TODO เติมเองถ้ามีข้อมูล — ตอนนี้ในเว็บไม่มี จึงไม่ใส่:
      // "address": { "@type": "PostalAddress", "addressLocality": "...", "addressCountry": "TH" }
      // "telephone": "+66..."
      // "foundingDate": "..."
    },

    {
      "@type": "WebSite",
      "@id": "https://agapaedesign.com/#website",
      "url": "https://agapaedesign.com/",
      "name": "AGAPAE Design",
      "inLanguage": ["th", "en"],
      "publisher": { "@id": "https://agapaedesign.com/#studio" }
    },

    {
      "@type": "WebPage",
      "@id": "https://agapaedesign.com/#webpage",
      "url": "https://agapaedesign.com/",
      "name": "AGAPAE Design – Graphic Designer · Illustrator · AI Management",
      "isPartOf": { "@id": "https://agapaedesign.com/#website" },
      "about": { "@id": "https://agapaedesign.com/#studio" },
      "inLanguage": "th",
      "primaryImageOfPage": "https://agapaedesign.com/Pic/video/buddha-hero-wide-poster.webp"
    },

    {
      "@type": "ItemList",
      "@id": "https://agapaedesign.com/#web-projects",
      "name": "Web Design & Development Projects",
      "description": "ผลงานเว็บไซต์และ Web Application ที่ออกแบบและพัฒนา ครอบคลุม Corporate Website, AI Platform และ Civic Tech",
      "numberOfItems": 7,
      "itemListElement": [
        {
          "@type": "ListItem", "position": 1,
          "item": {
            "@type": "WebSite",
            "name": "Tanapat Printing & Publication",
            "url": "https://tanapat.co.th/",
            "description": "เว็บไซต์บริษัทพิมพ์และสิ่งพิมพ์ TANAPAT ประสบการณ์กว่า 40 ปี พร้อมระบบ Product Showcase, Mockup 3D และ Blog",
            "image": "https://agapaedesign.com/Pic/websites/Web%20tanapat.webp",
            "creator": { "@id": "https://agapaedesign.com/#studio" }
          }
        },
        {
          "@type": "ListItem", "position": 2,
          "item": {
            "@type": "WebApplication",
            "name": "AGAPAE AI Studio — Team Console",
            "url": "https://hellopae.github.io/AGAPAEagent/",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "description": "Dashboard บริหารทีม Sub Agent ของ AGAPAE ติดตามงานของ AI Agent 10 ตัว แยกตาม Pipeline (Orchestrator, Content, Design, Quality Gate) พร้อม Work Log แบบ Real-time",
            "image": "https://agapaedesign.com/Pic/websites/AGAPAE%20AI%20Studio.webp",
            "creator": { "@id": "https://agapaedesign.com/#studio" }
          }
        },
        {
          "@type": "ListItem", "position": 3,
          "item": {
            "@type": "WebApplication",
            "name": "Invest AI — Bitcoin Trend Predictor",
            "url": "https://hellopae.github.io/investai/",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "description": "เว็บคาดการณ์แนวโน้ม Bitcoin ด้วย 8 เทคนิคยอดนิยม (Moving Average, RSI, MACD, Bollinger Bands, Fibonacci, Elliott Wave) พร้อมราคาเป้าหมายและผล Backtest ย้อนหลัง",
            "image": "https://agapaedesign.com/Pic/websites/Invest%20AI.webp",
            "creator": { "@id": "https://agapaedesign.com/#studio" }
          }
        },
        {
          "@type": "ListItem", "position": 4,
          "item": {
            "@type": "WebApplication",
            "name": "TANAPAT Order Visualizer",
            "url": "https://hellopae.github.io/MockUp/",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web",
            "description": "เครื่องมือดูตัวอย่างงานพิมพ์แบบ 3D ก่อนสั่งผลิตจริง อัปโหลด Artwork แล้วดูโบรชัวร์ นามบัตร กล่อง โปสเตอร์ แบบหมุนได้ พร้อมบันทึกเป็นไฟล์ส่งลูกค้า",
            "image": "https://agapaedesign.com/Pic/websites/Mock%20Up.webp",
            "creator": { "@id": "https://agapaedesign.com/#studio" }
          }
        },
        {
          "@type": "ListItem", "position": 5,
          "item": {
            "@type": "VideoGame",
            "name": "Rush Exit — เกมปริศนาจราจร",
            "url": "https://hellopae.github.io/RushExit/",
            "gamePlatform": "Web Browser",
            "description": "เกมปริศนาเลื่อนรถสไตล์ 3D น่ารักธีม Sakura Town เลื่อนรถให้ออกจากทางออกด้วยจำนวนก้าวที่น้อยที่สุด เล่นได้บนเว็บทันที",
            "image": "https://agapaedesign.com/Pic/websites/Rush%20Exit.webp",
            "creator": { "@id": "https://agapaedesign.com/#studio" }
          }
        },
        {
          "@type": "ListItem", "position": 6,
          "item": {
            "@type": "WebApplication",
            "name": "Billmates — หารค่าใช้จ่ายทริป",
            "url": "https://hellopae.github.io/Billmates/",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "description": "แอปหารค่าใช้จ่ายสำหรับทริปกลุ่ม คำนวณค่าใช้จ่ายรายคน สรุปยอดหนี้ได้ทันที UI Mobile First สไตล์ Gradient สวยงาม",
            "image": "https://agapaedesign.com/Pic/websites/billmates.webp",
            "creator": { "@id": "https://agapaedesign.com/#studio" }
          }
        },
        {
          "@type": "ListItem", "position": 7,
          "item": {
            "@type": "WebSite",
            "name": "2RichMap — แผนที่อาหารราคาถูก",
            "url": "https://2richmap.com/",
            "description": "แพลตฟอร์มแผนที่ชุมชนรวมร้านอาหารราคาถูก Street Food ตลาดนัด และร้านสะดวกซื้อ ให้คนไทยค้นหาของกินราคาประหยัดได้ง่ายขึ้น พร้อมระบบ Rating คุ้มค่า และกระดานชุมชน",
            "image": "https://agapaedesign.com/Pic/websites/2richmap.webp",
            "creator": { "@id": "https://agapaedesign.com/#studio" }
          }
        }
      ]
    },

    {
      "@type": "ItemList",
      "@id": "https://agapaedesign.com/#motion-works",
      "name": "Animation Works",
      "numberOfItems": 2,
      "itemListElement": [
        {
          "@type": "ListItem", "position": 1,
          "item": {
            "@type": "VideoObject",
            "name": "THE BUDDHA",
            "description": "Illustration · Animation · Original score",
            "thumbnailUrl": "https://agapaedesign.com/Pic/video/buddha-motion-poster.webp",
            "contentUrl": "https://agapaedesign.com/Pic/video/buddha-motion.mp4",
            "uploadDate": "2026-07-27",
            "creator": { "@id": "https://agapaedesign.com/#studio" }
          }
        },
        {
          "@type": "ListItem", "position": 2,
          "item": {
            "@type": "VideoObject",
            "name": "RAIN IN THE CITY",
            "description": "Illustration · Animation · Ambient sound",
            "thumbnailUrl": "https://agapaedesign.com/Pic/video/rain-city-motion-poster.webp",
            "contentUrl": "https://agapaedesign.com/Pic/video/rain-city-motion.mp4",
            "uploadDate": "2026-07-27",
            "creator": { "@id": "https://agapaedesign.com/#studio" }
          }
        }
      ]
    }
  ]
}
</script>
```

**หมายเหตุ 2 ข้อ:**
- JSON ไม่รองรับคอมเมนต์ `//` — ผมใส่ไว้ให้อ่านเฉยๆ **ต้องลบคอมเมนต์ออกก่อนวางจริง**
- `uploadDate` ผมใช้วันที่ไฟล์ mp4 ถูกสร้าง (`Pic/video/buddha-motion.mp4` = 27 Jul 2026) ถ้าวันเผยแพร่จริงไม่ตรงให้แก้
- ตรวจผลด้วย https://validator.schema.org/ และ Google Rich Results Test หลังวาง

---

# 3. โครงสร้างเนื้อหา — **ประเด็นใหญ่ที่สุดของ audit นี้**

## 3.1 crawler เห็นอะไรจริงๆ (หลักฐาน)

ผมถอด `<script>` ออกจาก `index.html` แล้วนับข้อความที่เหลือ = **สิ่งที่ crawler ที่ไม่รัน JS เห็น**:

```
CHARS VISIBLE TO NON-JS CRAWLER: 1,678
```

ที่เห็นมีแค่: nav, hero, 4 service, tag/skill bars, 6 process steps, หัวข้อ h2 ทุกตัว, contact, footer

**ที่หายไปทั้งหมด:**

| เนื้อหา | อยู่ที่ | สถานะใน HTML ดิบ |
|---|---|---|
| Portfolio 26 ชิ้น (รูป + ชื่อ + หมวด) | สร้างโดย `renderPort()` `index.html:931-943` เขียนลง `<div class="p-grid" id="pGrid-*">` ที่ `index.html:676,687,698,709` | **`<div>` ว่างเปล่า** |
| เว็บโปรเจกต์ 7 ตัว + คำอธิบายไทยละเอียด + URL + tech stack | `WEB_ITEMS` array `index.html:823-894` → `renderWebProjects()` `index.html:1168-1196` → `<div id="webProjectsGrid">` `index.html:736` | **`<div>` ว่างเปล่า** |
| radar chart skill | `initRadar()` `index.html:1028` | ไม่มี |

## 3.2 crawler ตัวไหนเห็น / ไม่เห็น

| Crawler | รัน JS? | เห็น portfolio? |
|---|---|---|
| **Googlebot** | ✅ ใช่ (WRS render รอบสอง) | ✅ เห็น (แต่ล่าช้า — render queue อาจใช้เวลาหลายวันถึงหลายสัปดาห์) |
| **Bingbot** | ⚠️ บางส่วน | ไม่แน่นอน |
| **GPTBot / OAI-SearchBot** (ChatGPT) | ❌ **ไม่รัน** | ❌ **ไม่เห็น** |
| **ClaudeBot** (Claude) | ❌ **ไม่รัน** | ❌ **ไม่เห็น** |
| **PerplexityBot** | ❌ ส่วนใหญ่ไม่รัน | ❌ ไม่เห็น |
| **Google-Extended** (Gemini training) | ❌ ไม่รัน | ❌ ไม่เห็น |
| Facebook / LINE / X (แชร์ลิงก์) | ❌ ไม่รัน | ❌ ไม่เห็น + ไม่มี OG → กล่องเปล่า |

**สรุป:** ถ้าวันนี้ถาม ChatGPT/Claude ว่า "AGAPAE Design ทำอะไรบ้าง" มันจะตอบได้แค่ "สตูดิโอออกแบบกราฟิก 20 ปี มี 4 บริการ" — **ไม่รู้เลยว่ามีผลงาน 26 ชิ้น หรือเคยทำ 2RichMap / Invest AI / TANAPAT** ทั้งที่นั่นคือของดีที่สุดที่คุณมี

## 3.3 บั๊กที่ทำให้ AI อ่านข้อมูลผิด ⚠️

`index.html:551-552`:

```html
<div class="h-stat-n" data-count="20">0</div><div class="h-stat-l">Years Design</div>
<div class="h-stat-n" data-count="500">0</div><div class="h-stat-l">Projects Done</div>
```

ค่าจริงอยู่ใน `data-count` แต่ **ข้อความที่อยู่ใน HTML คือ `0`** JS เป็นคนเปลี่ยนตอน scroll (`index.html:1137-1153`)

→ crawler ที่ไม่รัน JS อ่านได้ว่า **"0 Years Design, 0 Projects Done"** นี่แย่กว่าไม่มีข้อมูล เพราะเป็นข้อมูล*ผิด*ที่ AI อาจหยิบไปใช้จริง

**แก้ 5 นาที:** ใส่ค่าจริงเป็น text (`20+`, `500+`) แล้วให้ JS วิ่งจาก 0 ขึ้นไปหาค่านั้นตอน animate

## 3.4 ลำดับหัวข้อ (h1–h6)

ลำดับตาม DOM จริง:

| Line | Tag | ข้อความ | ประเมิน |
|---|---|---|---|
| 540 | `h1` | Creative Design Studio | ✓ มี h1 **แค่ตัวเดียว ถูกต้อง** — แต่ generic มาก ไม่มีชื่อแบรนด์ ไม่มีคำว่า "ออกแบบ"/"กราฟิก" ภาษาไทยเลย |
| 557-579 | *(ไม่มี)* | Graphic Design / Illustration / AI Management / Premium Printing | ✗ section `#services` **ไม่มีหัวข้อเลย** ชื่อบริการทั้ง 4 เป็น `<div class="srv-name">` ทั้งที่นี่คือคีย์เวิร์ดหลักของธุรกิจ |
| 607 | `h2` | Art. Design. Passion. | ⚠️ สวยแต่ไม่มีคีย์เวิร์ด |
| 645 | `h3` | Work Process | ✗ ควรเป็น `h2` — เป็นหัวข้อระดับ section เหมือน About/Portfolio |
| 664 | `h2` | Selected Works | ✓ |
| 672,683,694,705 | *(span)* | Printing / Artist / Animation / AI Generated | ✗ ควรเป็น `h3` — เป็นหมวดหมู่ผลงานจริง |
| 732 | `h2` | Web Design & Dev | ✓ |
| — (JS) | *(div)* | ชื่อเว็บโปรเจกต์ 7 ตัว | ✗ `<div class="web-title">` `index.html:1185` ควรเป็น `h3` |
| 745 | `h2` | Let's Work Together | ✓ |
| 753,760,767 | `h4` | Email / LINE / Services | ✗ **ข้าม h3** — h2 → h4 |
| — (JS) | `h4` | ชื่อ portfolio แต่ละชิ้น `index.html:920` | ✗ อยู่ใน overlay ที่ซ่อนอยู่ + ข้ามระดับ |

## 3.5 alt text

| ที่ | โค้ด | ประเมิน |
|---|---|---|
| `index.html:504` | `alt="AGAPAE Design"` (logo nav) | ✓ ใช้ได้ |
| `index.html:593` | `alt="AGAPAE Design Studio"` (รูปโปรไฟล์) | ⚠️ อธิบายภาพไม่ตรง — ควรบอกว่าในรูปคืออะไร |
| `index.html:779` | `alt=""` (รูปประดับ contact) | ✓ **ถูกแล้ว** — รูปตกแต่งควร alt ว่าง |
| `index.html:791` | `alt=""` (logo footer) | ✓ **ถูกแล้ว** — มี text "AGAPAE Design" ข้างๆ อยู่แล้ว |
| `index.html:721` | `<img id="lbImg" src="" alt="">` (lightbox) | ⚠️ `lbShow()` `index.html:947-971` ตั้ง `.src` แต่ **ไม่เคยตั้ง `.alt`** เลย → รูปใหญ่ในไลท์บ็อกซ์ alt ว่างตลอด |
| `index.html:911,916` (JS) | `alt="${item.title}"` | ✗ **ปัญหาใหญ่** — ค่าจริงคือ `"Printing Work 1"` … `"Art Work 10"` … `"AI Art 7"` |
| `index.html:1180` (JS) | `alt="${w.title}"` | ✓ **ถูกแล้ว** — ได้ชื่อจริง เช่น "2RichMap — แผนที่อาหารราคาถูก" |

**เรื่อง title/alt ของผลงาน 24 ชิ้น:** ที่ `index.html:816-820` ชื่อถูก generate ด้วย loop:

```js
...Array.from({length:7},(_,i)=>({... title:`Printing Work ${i+1}`, sub:'Tanapat Printing'})),
...Array.from({length:10},(_,i)=>({... title:`Art Work ${i+1}`, sub:'Illustration'})),
...Array.from({length:7},(_,i)=>({... title:`AI Art ${i+1}`, sub:'AI Generated'})),
```

24 จาก 26 ชิ้น **ไม่มีชื่อจริง** → alt = "Art Work 3" ซึ่ง**ไม่มีมูลค่า SEO เลย** และ Google Images ค้นไม่เจอ นี่ไม่ใช่ปัญหาโค้ด — เป็นข้อมูลที่ต้องให้คุณเป็นคนใส่ (ชื่องาน + ลูกค้า + ปี + เทคนิค)

---

# 4. ความเร็ว / Core Web Vitals

## 4.1 Chart.js — render-blocking 70 KB โดยไม่จำเป็น 🔴

`index.html:13`:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

- อยู่ใน `<head>` **ไม่มี `defer`/`async`** → บล็อกการ parse HTML ทั้งไฟล์
- วัดจริง: **69,578 bytes (gzipped)** จาก origin ที่ 3 (ต้อง DNS + TLS handshake ใหม่ ไม่มี `preconnect` ให้ jsdelivr ด้วย)
- ใช้ที่เดียว: `initRadar()` `index.html:1028` ซึ่งเรียกจาก `switchSkView('radar')` `index.html:1022` = **ต้องกดปุ่ม "Radar Chart" ก่อนถึงจะใช้**

**คือ 70 KB ที่บล็อกทุกคน เพื่อฟีเจอร์ที่คน 95% ไม่กด** → ผลตรงต่อ FCP และ LCP

แก้ได้ 2 ทาง:
1. ง่ายสุด: เติม `defer` (5 วินาที) — ปลดบล็อกทันที
2. ดีสุด: ลบออกจาก head แล้ว inject `<script>` ตอนกดปุ่ม radar ครั้งแรก (~15 บรรทัด) — คนที่ไม่กดจะไม่โหลดเลย

## 4.2 hero poster ถูกโหลดซ้ำบนจอคอม 🟠

- `index.html:10` preload `buddha-hero-wide-poster.webp` (105 KB) สำหรับ `min-width:1025px` — ตรงกับ CSS `index.html:88` ✓ ถูกต้อง
- **แต่** `index.html:534` `<video ... poster="Pic/video/buddha-hero-poster.webp">` — ไม่มี media query, ใช้ poster **ตัวมือถือ** (111 KB) กับทุกขนาดจอ
- `poster` ถูกโหลดเสมอ **แม้ `preload="none"`**

→ **บนจอคอมโหลด 2 poster = 216 KB** ทั้งที่แสดงแค่ตัวเดียว แข่ง bandwidth กันในช่วง LCP window พอดี

แก้: ทำ poster ผ่าน CSS `background-image` บน `.hero-video` แทน attribute หรือใช้ JS สลับ `poster` ตาม `matchMedia`

## 4.3 hero video 2.4 MB โหลดทันที 🟠

`index.html:1240` `initVideoLayer('heroVideo')` — ไม่ส่ง `lazy` → `index.html:1234` `if(!lazy) start()` → `v.preload='auto'; v.load()` **ยิงทันทีตอนหน้าเปิด**

ไฟล์: `Pic/video/buddha-hero.mp4` = **2,438,384 bytes** (972×1296, 18 วิ, 1.08 Mbps) — ยืนยันจาก live แล้ว

ตรง logic เขียนดีนะ (มี IntersectionObserver, มี reduced-motion, มี saveData guard `index.html:1206-1208`) แต่บน 4G ไทยทั่วไป 2.4 MB กินแบนด์วิดท์ ~3-5 วินาที ทับกับช่วงที่ browser กำลังจะวาด LCP

แก้: เลื่อน `start()` ของ hero ไปหลัง `window.load` หรือหลัง `requestIdleCallback` — poster สวยพอที่จะแสดงไปก่อนได้ 1-2 วิ

## 4.4 LCP ถูกหน่วงด้วย CSS animation เอง 🟠

`index.html:118,120,124`:
```css
.hero-title{... opacity:0; animation:fadeUp .9s .3s forwards;}
.hero-sub  {... opacity:0; animation:fadeUp .9s .5s forwards;}
.hero-cta  {... opacity:0; animation:fadeUp .9s .7s forwards;}
```

element ที่ `opacity:0` **ไม่ถูกนับว่า "painted"** สำหรับ LCP → `.hero-title` (ซึ่งน่าจะเป็น LCP element เพราะ `clamp(3.2rem,7vw,6rem)`) จะไม่ถูกนับจนกว่าจะผ่านไป **~1.2 วินาที** (delay 0.3 + duration 0.9)

**นี่คือ LCP penalty ~1.2 วิ ที่เกิดจากดีไซน์เอง ไม่ใช่จากเน็ต** ถ้าตอนนี้ LCP อยู่ที่ ~2.8 วิ ตัดตรงนี้อย่างเดียวก็ลงมาต่ำกว่าเกณฑ์ 2.5 วิได้

แก้แบบไม่เสียความสวย: เปลี่ยนจาก `opacity:0 → 1` เป็น `transform` อย่างเดียว (เลื่อนขึ้นโดยไม่ fade) หรือลด delay ของ `.hero-title` เหลือ 0 และเก็บ delay ไว้เฉพาะ `.hero-sub`/`.hero-cta`

## 4.5 CLS — portfolio grid 🟠

`index.html:264-266`:
```css
.p-grid{columns:3;column-gap:1.2rem;}
.p-item{break-inside:avoid; ... background:var(--bg3);}
.p-item img{width:100%;display:block; ...}
```

- ใช้ CSS multi-column (masonry) + รูปทั้ง 24 ใบเป็น `loading="lazy"`
- `index.html:911,916` — `<img>` ที่ JS สร้าง **ไม่มี `width`/`height`** และ `.p-item` **ไม่มี `aspect-ratio`**
- รูปสัดส่วนไม่เท่ากันจริง (`bs1` 800×841, `cs4` 800×1121, `as1` 800×533)

→ ทุกครั้งที่รูปหนึ่งโหลดเสร็จ browser ต้อง **คำนวณ column balancing ใหม่ทั้งกริด** → ของทุกชิ้นในคอลัมน์ขยับ นี่คือ CLS pattern ที่แย่ที่สุดแบบหนึ่ง

**เทียบกับที่ทำถูกแล้ว:** `.web-preview{aspect-ratio:16/9}` `index.html:240` และ `.about-img{aspect-ratio:3/4}` `index.html:167` — **สองที่นี้ป้องกัน CLS ถูกต้องแล้ว** ✓ แค่ portfolio grid ที่ตกหล่น

แก้: ใส่ `width`/`height` จริงลงใน `<img>` ที่ `renderCatGrid()` สร้าง (เก็บ `w`/`h` ไว้ใน `PORT_ITEMS`)

## 4.6 ขนาด payload — สรุปตัวเลขจริง

**First view บนจอคอม (ก่อน scroll):**

| ทรัพยากร | ขนาด | หมายเหตุ |
|---|---|---|
| `index.html` | 19.2 KB | gzipped ✓ |
| Chart.js | **69.6 KB** | render-blocking, ไม่ได้ใช้ |
| Google Fonts CSS | 1.2 KB | + ไฟล์ฟอนต์ Playfair/Inter/Sarabun (Sarabun ซับเซ็ตไทยหนักสุด) |
| `buddha-hero-wide-poster.webp` | 105 KB | preload ✓ ใช้จริง |
| `buddha-hero-poster.webp` | 111 KB | ❌ **โหลดเปล่า** (§4.2) |
| `buddha-hero.mp4` | **2,438 KB** | eager (§4.3) |
| `Pic/logo.png` | 6.8 KB | |
| **รวมก่อน scroll** | **≈ 2.75 MB** | |

**Lazy หลัง scroll:**

| ทรัพยากร | ขนาด |
|---|---|
| portfolio thumbs 24 ใบ (`bs/cs/as*.webp`) | **1.9 MB** |
| motion posters + tile mp4 2 ตัว | 1.85 MB |
| `profile.mp4` | 420 KB |
| screenshot เว็บ 7 ตัว | 350 KB |

**หมายเหตุ thumbnail:** thumb ทุกใบกว้าง 800px แต่คอลัมน์จริงกว้าง ~355px → ถูกต้องสำหรับจอ retina 2x แต่ **เปลืองสำหรับจอ 1x** ตัวหนักสุด `cs4.webp` = 170 KB สำหรับรูปในกริด ถ้าทำ `srcset` เพิ่มตัว 400px จะประหยัดได้ ~60% บนมือถือส่วนใหญ่ (ผลปานกลาง งานปานกลาง — จัดเป็น optional)

---

# 5. robots.txt / sitemap.xml / llms.txt

ยืนยันจาก live แล้ว — **404 ทั้ง 3 ตัว:**

```
/robots.txt   → 404
/sitemap.xml  → 404
/llms.txt     → 404
/favicon.ico  → 404
```

**ประเมินตามความจริง:** สำหรับเว็บ **หน้าเดียว** — `robots.txt` และ `sitemap.xml` มีผลจริง**น้อย** (ไม่มี robots.txt = อนุญาตทุกอย่างอยู่แล้ว; sitemap ที่มี URL เดียวแทบไม่ช่วยอะไร) แต่ราคาถูกมาก (10 นาที) และช่วยเรื่อง**บล็อกไฟล์ขยะ**ที่ §6.1 พูดถึง

ส่วน **`llms.txt` คุ้มค่าจริง** เพราะเป็นไฟล์ text ล้วนที่ AI crawler อ่านได้โดยไม่ต้องรัน JS — เป็นทางลัดที่แก้ปัญหา §3 ได้ส่วนหนึ่งทันที

## 5.1 `/robots.txt` — ร่างที่พร้อมใช้

```
# https://agapaedesign.com/robots.txt

User-agent: *
Allow: /

# ไฟล์ที่เหลือจากเทมเพลตเก่า ไม่ใช่เนื้อหาของเว็บ — อย่าไป index
Disallow: /styles.html
Disallow: /inc/
Disallow: /css/
Disallow: /js/
Disallow: /fonts/
Disallow: /images/
Disallow: /product/

# AI crawler — อนุญาตให้อ่านและอ้างอิงได้ (ต้องการให้ AI แนะนำเว็บนี้)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: https://agapaedesign.com/sitemap.xml
```

> ถ้าอนาคต**ไม่อยาก**ให้ AI เอางานไปเทรน ให้เปลี่ยน `Google-Extended` และ `Applebot-Extended` เป็น `Disallow: /` — สองตัวนี้คุมเฉพาะการเทรน ไม่กระทบการค้นหา แต่ตอนนี้เป้าหมายคือ "อยากถูกอ้างอิง" จึงเปิดหมด

## 5.2 `/sitemap.xml` — ร่างที่พร้อมใช้

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://agapaedesign.com/</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://agapaedesign.com/Pic/video/buddha-hero-wide-poster.webp</image:loc>
      <image:title>AGAPAE Design — Creative Design Studio</image:title>
    </image:image>
    <image:image>
      <image:loc>https://agapaedesign.com/Pic/video/buddha-motion-poster.webp</image:loc>
      <image:title>THE BUDDHA — Illustration · Animation</image:title>
    </image:image>
    <image:image>
      <image:loc>https://agapaedesign.com/Pic/video/rain-city-motion-poster.webp</image:loc>
      <image:title>RAIN IN THE CITY — Illustration · Animation</image:title>
    </image:image>
  </url>
</urlset>
```

⚠️ **แก้ typo ก่อนใช้:** namespace ต้องเป็น `http://www.sitemaps.org/...` (มี `s`) — ผมเขียน `sitemap.org` ไว้ผิด ตัวจริงคือ:
`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`

ส่วน `<image:image>` — เพิ่มได้มากกว่านี้ (ทุกภาพ portfolio) แต่จะคุ้มก็ต่อเมื่อภาพมีชื่อจริงแล้ว (§3.5)

หลังวางแล้ว submit ที่ Google Search Console + Bing Webmaster Tools

## 5.3 `/llms.txt` — ร่างที่พร้อมใช้ (คุ้มที่สุดในหมวดนี้)

```markdown
# AGAPAE Design

> สตูดิโอออกแบบกราฟิก ภาพประกอบดิจิทัล และ AI Management ประสบการณ์กว่า 20 ปี
> ในวงการกราฟิกดีไซน์และงานพิมพ์ ผลงานกว่า 500 ชิ้น
> เว็บไซต์: https://agapaedesign.com

AGAPAE Design เป็นสตูดิโอออกแบบในประเทศไทย ทำงานทั้งงานออกแบบกราฟิก
งานวาดภาพประกอบ งานพิมพ์คุณภาพสูง และการวางระบบ AI ให้กับงานสร้างสรรค์
เนื้อหาบนเว็บไซต์เป็นภาษาไทยผสมอังกฤษ

## บริการ

- **Graphic Design** — Branding, Logo, Packaging และสิ่งพิมพ์ทุกประเภท ด้วยประสบการณ์กว่า 20 ปี
- **Illustration** — วาดภาพประกอบดิจิทัลด้วย Procreate และ Illustrator สไตล์ไทยร่วมสมัย
- **AI Management & Efficiency** — วางแผน จัดการ ควบคุม AI แต่ละชนิดให้เหมาะกับงานที่ทำ
- **Premium Printing** — งานพิมพ์คุณภาพสูงสำหรับองค์กร หน่วยงานรัฐ และเอกชนทั่วประเทศ

## ความเชี่ยวชาญเครื่องมือ

Adobe Illustrator · Procreate · Adobe Photoshop · Adobe InDesign · AI Management & Efficiency

## ขั้นตอนการทำงาน

1. **Brief** — รับ Brief ทำความเข้าใจโจทย์
2. **Research** — ศึกษา Target และ Competitors
3. **Draft** — หา Reference และร่าง Draft
4. **Design** — ออกแบบและ Refine งาน
5. **AI Enhance** — ใช้ AI ยกระดับผลงาน
6. **Deliver** — ส่งมอบงานพร้อมใช้งาน

## ผลงาน Animation

- [THE BUDDHA](https://agapaedesign.com/Pic/video/buddha-motion.mp4) — Illustration · Animation · Original score
- [RAIN IN THE CITY](https://agapaedesign.com/Pic/video/rain-city-motion.mp4) — Illustration · Animation · Ambient sound

## ผลงานเว็บไซต์และ Web Application

- [Tanapat Printing & Publication](https://tanapat.co.th/) — เว็บไซต์บริษัทพิมพ์และสิ่งพิมพ์ TANAPAT ประสบการณ์กว่า 40 ปี พร้อมระบบ Product Showcase, Mockup 3D และ Blog
- [AGAPAE AI Studio — Team Console](https://hellopae.github.io/AGAPAEagent/) — Dashboard บริหารทีม Sub Agent ติดตามงานของ AI Agent 10 ตัว แยกตาม Pipeline พร้อม Work Log แบบ Real-time
- [Invest AI — Bitcoin Trend Predictor](https://hellopae.github.io/investai/) — เว็บคาดการณ์แนวโน้ม Bitcoin ด้วย 8 เทคนิค (Moving Average, RSI, MACD, Bollinger Bands, Fibonacci, Elliott Wave) พร้อมราคาเป้าหมายและผล Backtest
- [TANAPAT Order Visualizer](https://hellopae.github.io/MockUp/) — เครื่องมือดูตัวอย่างงานพิมพ์แบบ 3D ก่อนสั่งผลิตจริง อัปโหลด Artwork แล้วดูโบรชัวร์ นามบัตร กล่อง โปสเตอร์ แบบหมุนได้
- [Rush Exit](https://hellopae.github.io/RushExit/) — เกมปริศนาเลื่อนรถ 3D ธีม Sakura Town เล่นได้บนเว็บทันที
- [Billmates](https://hellopae.github.io/Billmates/) — แอปหารค่าใช้จ่ายสำหรับทริปกลุ่ม คำนวณรายคน สรุปยอดหนี้ทันที Mobile First
- [2RichMap](https://2richmap.com/) — แพลตฟอร์มแผนที่ชุมชนรวมร้านอาหารราคาถูก Street Food ตลาดนัด พร้อมระบบ Rating คุ้มค่าและกระดานชุมชน

## หมวดผลงานออกแบบ

- **Printing** — 7 ชิ้น (งานพิมพ์ ร่วมกับ Tanapat Printing)
- **Artist** — 10 ชิ้น (ภาพประกอบ)
- **Animation** — 2 ชิ้น
- **AI Generated** — 7 ชิ้น

## ติดต่อ

- อีเมล: agapaedesign@gmail.com
- LINE: hellopae — https://line.me/ti/p/~hellopae
```

**หมายเหตุ:** ข้อมูลทุกบรรทัดคัดจาก `index.html` จริง ไม่มีการแต่งเติม — ยกเว้น "ในประเทศไทย" ที่อนุมานจาก `"...ทั่วประเทศ"` ที่ `index.html:578`

---

# 6. อื่นๆ ที่เจอระหว่างตรวจ

## 6.1 ไฟล์เทมเพลตเก่าที่ยัง deploy อยู่ และ index ได้ 🟠

ตรวจ live แล้ว **ทั้ง 3 ตัวตอบ 200:**

| URL | สถานะ | ปัญหา |
|---|---|---|
| `https://agapaedesign.com/styles.html` | **200**, 19,832 bytes | หน้า `<title>Howdy - Style Guide</title>` `lang="en"` จากเทมเพลตเก่า — เป็นหน้า thin content ที่ Google index ได้ และแข่งกับหน้าหลัก |
| `https://agapaedesign.com/inc/sendEmail.php` | **200**, `application/x-httpd-php` | GitHub Pages ไม่รัน PHP → **เสิร์ฟ source code ดิบ** เปิดเผย `$siteOwnersEmail = 'hellopae@gmail.com';` เป็น plain text ให้ bot เก็บอีเมลไปสแปม |
| `https://agapaedesign.com/js/main.js` | **200**, 9,130 bytes | jQuery/modernizr/pace จากเทมเพลตเก่า |

ตรวจแล้วว่า `index.html` **ไม่อ้างถึง** `css/`, `js/`, `fonts/`, `images/`, `product/`, `inc/`, `styles.html` เลยสักบรรทัด — ทั้งหมดเป็นซากเทมเพลตเก่า:

```
git ls-files | นับตาม top-level:
  130 portfolio    ← ใช้
   88 images       ← ตายแล้ว (42 MB)
   56 Pic          ← ใช้
   15 css          ← ตายแล้ว
   14 fonts        ← ตายแล้ว
    6 product      ← ตายแล้ว (22 MB)
    6 js           ← ตายแล้ว
    1 styles.html  ← ตายแล้ว
    1 inc          ← ตายแล้ว + รั่วอีเมล
```

**≈ 110 ไฟล์ / ~64 MB ที่ deploy ทุกครั้งโดยไม่ได้ใช้**

**ควรทำ:** ลบทิ้ง (git มี history เก็บไว้อยู่แล้ว ถ้าอยากได้คืน) หรืออย่างน้อยที่สุด `Disallow` ใน robots.txt ตาม §5.1

## 6.2 ไฟล์ `.jpg` fallback 30 MB ที่แทบไม่ถูกใช้

`portfolio/` มี `.webp` 6.3 MB + `.jpg` **30 MB** ตัว `.jpg` ถูกใช้เฉพาะเป็น `onerror` fallback (`index.html:916`) สำหรับเบราว์เซอร์ที่ไม่รองรับ webp — ปัจจุบัน webp รองรับ **>97%** ของ browser ทั่วโลก และ 100% ของ browser ที่ยัง update อยู่

`portfolio/bs1.jpg` = 222 KB vs `bs1.webp` = 110 KB ไม่ได้เสิร์ฟจริง แต่กินพื้นที่ repo

**ผลกระทบจริง: น้อยมาก** (ไม่ถูกดาวน์โหลด ไม่กระทบ speed) แต่ทำให้ repo ใหญ่และ deploy ช้า — จัด optional

## 6.3 ชื่อไฟล์มีช่องว่าง

`Pic/websites/AGAPAE AI Studio.webp`, `Pic/websites/Mock Up.webp`, `Pic/websites/Rush Exit.webp` — ถูก reference ตรงๆ ใน `WEB_ITEMS` (`index.html:841,861,871`) โดยไม่ encode

ทดสอบ live แล้ว: `AGAPAE%20AI%20Studio.webp` → **200 OK, 67,856 bytes** ✓ ใช้งานได้ปกติ browser encode ให้เอง

**แต่**เวลาเอา URL เหล่านี้ไปใส่ JSON-LD / sitemap **ต้อง encode เป็น `%20` เอง** (ผมทำไว้แล้วใน §2.2) — ไม่งั้น validator จะฟ้อง

## 6.4 สิ่งที่ทำถูกแล้ว — ไม่ต้องแตะ ✅

เพื่อความเป็นธรรม รายการนี้ทำได้ดีกว่าเว็บส่วนใหญ่:

- `prefers-reduced-motion` block ครบถ้วน (`index.html:480-492`) รวมถึงซ่อนวิดีโอให้ด้วย — ดีมาก
- `navigator.connection.saveData` guard (`index.html:1207`) — น้อยคนทำ
- `loading="lazy"` + `decoding="async"` **ครบทุกรูป** ที่ควรมี และ hero **ไม่ใส่** (ถูกต้อง — LCP image ห้าม lazy)
- `preconnect` ครบ + `crossorigin` บน `fonts.gstatic.com` ถูกต้อง
- `preload` + `media` + `fetchpriority` ใช้ถูกตามหลัก
- IntersectionObserver หยุดวิดีโอเมื่อพ้นจอ (`index.html:1230`) — ประหยัดแบตจริง
- `rel="noopener"` บนลิงก์ `target="_blank"` ทุกตัว (`index.html:776,1190`)
- `aria-hidden="true"` + `tabindex="-1"` บน video ประดับทุกตัว — ถูกต้องตาม accessibility
- `aspect-ratio` บน `.web-preview` และ `.about-img` = ป้องกัน CLS ถูกวิธี
- gzip เปิดใช้งานที่ GitHub Pages แล้ว (78.7 KB → 19.2 KB)
- มี h1 แค่ตัวเดียว
- alt ว่างบนรูปประดับ (ถูกต้อง ไม่ควรใส่ alt มั่วๆ)
- `.jpg` fallback logic เขียนป้องกัน infinite loop ด้วย `this.onerror=null` — ถูกต้อง

---

# 7. จัดลำดับความสำคัญ

## 🟢 กลุ่ม A — ได้ผลเยอะ ทำง่าย (ทำก่อน รวม ~2.5 ชม.)

| # | งาน | ที่แก้ | เวลา | ทำไมคุ้ม |
|---|---|---|---|---|
| A1 | เพิ่ม `meta description` + `canonical` + OG + Twitter Card + favicon + `theme-color` | `index.html` head | **30 นาที** | ผลใหญ่ที่สุดต่อบรรทัดโค้ด — คุมทั้ง snippet ใน Google, การ์ดตอนแชร์ LINE, และสิ่งที่ AI สรุปได้ |
| A2 | วาง JSON-LD block ตาม §2.2 | ก่อน `</head>` | **1 ชม.** | ทางเดียวที่ AI จะรู้จักผลงาน 7 เว็บ + งาน motion 2 ชิ้นโดยไม่ต้องรื้อ JS |
| A3 | แก้บั๊ก "0 Years / 0 Projects" | `index.html:551-552` + `1140-1148` | **5 นาที** | ป้องกัน AI อ่านข้อมูล**ผิด** — สำคัญกว่าที่ดู |
| A4 | สร้าง `llms.txt` ตาม §5.3 | ไฟล์ใหม่ | **30 นาที** | text ล้วน AI อ่านได้ทันที แก้ปัญหา §3 ได้ส่วนหนึ่งเลย |
| A5 | ใส่ `defer` ให้ Chart.js (หรือ lazy-load ตอนกด tab) | `index.html:13` | **5 นาที** | ปลด render-block 70 KB |
| A6 | ลบ/บล็อก `styles.html`, `inc/sendEmail.php` | ลบไฟล์ + robots.txt | **10 นาที** | อุดหน้าขยะที่ index ได้ + **หยุดอีเมลรั่ว** |
| A7 | แก้ hero poster ซ้ำบนจอคอม | `index.html:534` | **10 นาที** | ตัด 111 KB ออกจากช่วง LCP |

## 🟡 กลุ่ม B — ได้ผลเยอะ แต่ทำยาก / ใช้เวลา

| # | งาน | เวลา | หมายเหตุ |
|---|---|---|---|
| B1 | **ทำ portfolio + web projects ให้อยู่ใน HTML จริง** — เขียน 33 รายการเป็น static HTML แล้วให้ JS ทำหน้าที่แค่ enhance (lightbox/animation) แทนที่จะ generate | **4-6 ชม.** | นี่คือการแก้ปัญหาที่รากของ §3 หลังทำ AI จะเห็นเนื้อหาเว็บ **เพิ่มจาก 1,678 → ~8,000+ ตัวอักษร** ทางเลือกที่ถูกกว่า: เขียน Python script สร้าง `index.html` จาก data array (แต่จะขัดกับหลัก "no build step" ที่ใช้อยู่) |
| B2 | **ตั้งชื่อจริง + alt จริง ให้ผลงาน 24 ชิ้น** (`index.html:816-820`) | **2-3 ชม. ของ PAE** | ไม่ใช่งานโค้ด — ต้องให้คุณเป็นคนใส่ชื่องาน/ลูกค้า/ปี/เทคนิค "Art Work 3" มีมูลค่า SEO = 0 |
| B3 | เลื่อนโหลด hero video 2.4 MB ไปหลัง `window.load` | **1 ชม.** | รวมทดสอบว่าไม่ทำให้ภาพกระโดด |
| B4 | ตัด LCP penalty จาก CSS animation (`index.html:118`) | **30 นาที** | อาจลด LCP ได้ ~1 วิ ต้องลองปรับให้ยังสวยอยู่ |
| B5 | เขียน section FAQ จริงบนหน้าเว็บ แล้วค่อยใส่ `FAQPage` schema | **2-3 ชม.** | รูปแบบที่ AI ชอบหยิบไปตอบมากที่สุด แต่ต้องมีเนื้อหาจริงก่อน (ห้าม markup ลอยๆ) |

## ⚪ กลุ่ม C — ทำก็ได้ ไม่ทำก็ได้

| # | งาน | เวลา | ความเห็นตรงๆ |
|---|---|---|---|
| C1 | `robots.txt` + `sitemap.xml` | 10 นาที | เว็บหน้าเดียว ผลน้อยมาก แต่ถูกและช่วยบล็อกไฟล์ขยะได้ — ทำไปพร้อม A6 |
| C2 | แก้ลำดับหัวข้อ (h3→h2 ที่ `645`, span→h3 ที่ `672,683,694,705`, เพิ่ม h2 ให้ `#services`, h4→h3 ที่ `753,760,767`) | 45 นาที | เป็นความถูกต้องเชิงโครงสร้าง ผลต่ออันดับน้อย แต่ช่วย AI เข้าใจลำดับชั้นเนื้อหา — คุ้มถ้าทำพร้อม B1 |
| C3 | ใส่ `width`/`height` ให้รูป portfolio ตัด CLS (`index.html:911,916`) | 1 ชม. | ต้องอ่านขนาดจริงทั้ง 24 ใบมาเก็บใน `PORT_ITEMS` — ทำพร้อม B1 จะประหยัดแรง |
| C4 | ลบ `images/`, `product/`, `css/`, `js/`, `fonts/` (~64 MB / 110 ไฟล์) | 15 นาที | ไม่กระทบผู้ใช้เลย แค่ repo สะอาดและ deploy เร็วขึ้น |
| C5 | เพิ่ม `srcset` 400px ให้ portfolio thumbs | 1 ชม. | ประหยัดมือถือ ~60% ของ 1.9 MB แต่ต้องรัน `scripts/optimize-images.py` เพิ่มรอบ |
| C6 | ลบ `.jpg` fallback 30 MB ใน `portfolio/` | 10 นาที | webp รองรับ >97% แล้ว — เป็นเรื่อง repo hygiene ล้วนๆ ไม่ใช่ speed |
| C7 | ใส่ `lang="en"` ให้บล็อกอังกฤษ | 20 นาที | ช่วย screen reader ชัดเจน ช่วย SEO เล็กน้อย |
| C8 | ตั้ง `.alt` ให้รูปใน lightbox (`index.html:947-971`) | 5 นาที | accessibility ล้วน ไม่มีผล SEO (lightbox ไม่ถูก crawl) |
| C9 | ใส่คีย์เวิร์ดไทยใน `<title>` + `<h1>` | 20 นาที | ⚠️ **กระทบดีไซน์** — h1 "Creative Design Studio" สวยมาก ถ้าเปลี่ยนอาจเสียความรู้สึกของหน้า ทางออกกลางๆ: เก็บ h1 เดิม แต่ใส่คีย์เวิร์ดไทยใน `<title>` และ `meta description` แทน |

---

# 8. ถ้ามีเวลาแค่ 3 ชั่วโมง ทำอะไร

เรียงตามลำดับที่ควรทำ:

1. **A1** meta + OG + favicon (30 น.)
2. **A3** แก้ "0 Years / 0 Projects" (5 น.)
3. **A5** defer Chart.js (5 น.)
4. **A6 + C1** ลบ styles.html/sendEmail.php + robots.txt + sitemap (20 น.)
5. **A7** hero poster ซ้ำ (10 น.)
6. **A2** JSON-LD (1 ชม.)
7. **A4** llms.txt (30 น.)

รวม ~2 ชม. 40 นาที → ครอบทั้งกลุ่ม A

ผลที่คาดว่าจะได้: AI (ChatGPT/Claude/Perplexity) จะอ่านและอ้างอิงผลงานเว็บทั้ง 7 ตัว + งาน motion 2 ชิ้น + บริการทั้ง 4 ได้ทันที โดยยังไม่ต้องแตะ architecture การ render เลย ส่วน B1 (แก้ JS rendering) เก็บไว้เป็น phase 2

---

*Audit อย่างเดียว — ไม่มีไฟล์ใดถูกแก้ไขในรอบนี้*
