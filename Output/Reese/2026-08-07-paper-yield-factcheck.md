# Fact-check Report — "ทำไมงานที่ใหญ่ขึ้นแค่ 5 มิลลิเมตร ถึงแพงขึ้น 30%"

- **Reviewer:** Reese (Mode 2 — Fact-check)
- **Date:** 2026-08-07
- **Target:** `Output/Rae/2026-08-07-paper-yield-article.md` → tanapat.co.th article-53
- **Context flag:** draft written WITHOUT a prior research brief. All numbers are Rae's own calculation. Every number below was recomputed from scratch in Python, not eyeballed.

## Overall verdict: ❌ **FAIL**

**2 Blockers · 5 Warnings · 6 Nitpicks.**

The good news first: **the arithmetic engine of this article is sound.** I independently recomputed all 8 pieces-per-sheet figures (both orientations), the ream-weight formula, the paper price, the per-piece costs, the sheet counts and every percentage. Under the article's own stated assumptions, **every single number in the body checks out.** The paper-price formula is the genuine Thai industry formula and is corroborated by TANAPAT's own PrintCost price list.

The article fails on two things that the arithmetic can't rescue: **the headline number does not exist anywhere in the article's own data**, and **one universal claim about A-series sizes is falsified by a sheet size the article itself lists three paragraphs earlier**.

---

## 1. Claim inventory

| # | Claim (line) | Type | Verdict |
|---|---|---|---|
| C1 | Headline: งานใหญ่ขึ้น 5 มม. → แพงขึ้น 30% (L16) | arithmetic | ❌ INCORRECT |
| C2 | 14×14 vs 15×15 → ค่ากระดาษแพงกว่า 46% (L23) | arithmetic | ✅ VERIFIED (45.8%) |
| C3 | พื้นที่มากขึ้น 15% (14→15 ซม.) (L25) | arithmetic | ✅ VERIFIED (14.8%) |
| C4 | 31×43 นิ้ว = 78.7 × 109.2 ซม. (L43) | conversion | ✅ VERIFIED |
| C5 | 25×36 นิ้ว = 63.5 × 91.4 ซม. (L44) | conversion | ✅ VERIFIED |
| C6 | 24×35 นิ้ว = 61.0 × 88.9 ซม. (L45) | conversion | ✅ VERIFIED |
| C7 | 31×43 = อาร์ตการ์ด/อาร์ตมัน/กล่อง/ทั่วไป (L43) | industry | ✅ VERIFIED |
| C8 | 25×36 = อาร์ตการ์ดอีกขนาด (L44) | industry | ✅ VERIFIED |
| C9 | 24×35 = ปอนด์ขาว/งานหนังสือ (L45) | industry | ✅ VERIFIED |
| C10 | ฟันจับ/คาบกระดาษ ทำให้พื้นที่พิมพ์เล็กกว่าแผ่นเสมอ (L47) | technical | ✅ VERIFIED |
| C11 | พื้นที่พิมพ์จริง = 75 × 106 ซม. บนแผ่น 31×43 (L49) | assumption | ⚠️ UNVERIFIED — **load-bearing** |
| C12 | สูตร (กว้าง×ยาว นิ้ว × แกรม ÷ 3,100) × ราคา/กก. = บาท/รีม | formula | ✅ VERIFIED |
| C13 | 1 รีม = 500 แผ่น | industry | ✅ VERIFIED |
| C14 | อาร์ตการ์ด 260 แกรม @ 28.75 บาท/กก. → 3,214 บาท/รีม (L12, L144) | arithmetic | ✅ VERIFIED (3,214.25) |
| C15 | = 6.43 บาท/แผ่น (L12, L144) | arithmetic | ✅ VERIFIED (6.4285) |
| C16 | 14×14 → 35 ใบ (5×7), 0.18 บาท/ใบ (L56) | imposition | ✅ VERIFIED (under C11) |
| C17 | 14.5×14.5 → 28 ใบ (4×7), 0.23 บาท/ใบ (L57) | imposition | ✅ VERIFIED (under C11) · ⚠️ fragile |
| C18 | 15×15 → 24 ใบ (4×6), 0.27 บาท/ใบ (L58) | imposition | ✅ VERIFIED (under C11) |
| C19 | โต 1 ซม. → จำนวนต่อแผ่นลดลง 31% (L64) | arithmetic | ✅ VERIFIED (31.4%) |
| C20 | 5,000 ใบ @14×14 = 143 แผ่น = 919 บาท (L68) | arithmetic | ✅ VERIFIED |
| C21 | 5,000 ใบ @15×15 = 209 แผ่น = 1,344 บาท (L69) | arithmetic | ✅ VERIFIED |
| C22 | ต่างกัน 425 บาท / เพิ่ม 66 แผ่น (L71) | arithmetic | ✅ VERIFIED (424.3 / 66) |
| C23 | กระดาษเผื่อเสียเพิ่ม "ตามสัดส่วน" (L71) | technical | ⚠️ UNVERIFIED / overstated |
| C24 | นามบัตรมาตรฐาน 9 × 5.4 ซม. (L78) | industry | ⚠️ UNVERIFIED (มาตรฐานที่อ้างกันคือ 9 × 5.5) |
| C25 | 9×5.4 → 132 ดวง, 10×6 → 112 ดวง (L78–79) | imposition | ✅ VERIFIED |
| C26 | นามบัตรใหญ่ขึ้น → กินกระดาษมากขึ้น 18% (L81) | arithmetic | ✅ VERIFIED (17.9%) |
| C27 | โปสเตอร์ 36.9×52.4 → 4 แผ่น; 37×52.4 → 2 แผ่น (L85–86) | imposition | ✅ VERIFIED (under C11) · ⚠️ zero-tolerance |
| C28 | กว้างขึ้น 1 มม. → ค่ากระดาษเพิ่มเป็นสองเท่า (L88) | arithmetic | ✅ VERIFIED (under C11) |
| C29 | 37.5 ซม. วางพอดี 2 ชิ้นบนหน้ากว้าง 75 ซม.; 37.6 วางได้ชิ้นเดียว (L90) | arithmetic | ✅ VERIFIED · ⚠️ zero-tolerance |
| C30 | 13×13 → 35 ใบ เท่ากับ 14×14 (L97) | imposition | ✅ VERIFIED |
| C31 | 14×14 ใหญ่กว่า 13×13 อยู่ 16% (L99) | arithmetic | ✅ VERIFIED (16.0%) |
| C32 | ลดแค่ 3 มม. ก็ข้ามขั้นได้บ่อยครั้ง (L114) | industry | 💬 OPINION / plausible |
| C33 | A4/A5 ออกแบบให้ลงตัวกับกระดาษเมตริกยุโรป (L118) | historical | ✅ VERIFIED |
| C34 | เอาขนาด A มาวางบนแผ่นนิ้ว "เหลือเศษเสมอ" (L118) | technical | ❌ INCORRECT (overclaim) |
| C35 | งานพับ/ขึ้นรูปต้องคิดจากขนาดกางออก (L124–126) | technical | ✅ VERIFIED |
| C36 | ศัพท์ "ตัดตก" = bleed 3 มม. | terminology | ✅ VERIFIED |
| C37 | ศัพท์ "รีม" = 500 แผ่น | terminology | ✅ VERIFIED |
| C38 | ศัพท์ "คาบกระดาษ" = gripper margin | terminology | ⚠️ UNVERIFIED (ใช้กันในวงการ แต่ไม่พบในอภิธานศัพท์ที่ตีพิมพ์) |
| C39 | ศัพท์ "ตกกระดาษ" = paper yield / imposition planning | terminology | ⚠️ UNVERIFIED — **load-bearing** |
| C40 | ศัพท์ "หน้ายก" | terminology | n/a — ไม่ปรากฏในบทความ |

---

## 2. Verification detail

### C12–C15 — The paper price formula and the constant 3,100 ✅ VERIFIED

**Formula:** `(กว้าง(นิ้ว) × ยาว(นิ้ว) × แกรม ÷ 3,100) × ราคา/กก. = บาท/รีม`, 1 รีม = 500 แผ่น.

Two independent confirmations:

1. **Thai industry source** — LHC Paper states the formula verbatim: น้ำหนักกระดาษ 1 รีม = ยาว(นิ้ว) × กว้าง(นิ้ว) × แกรม ÷ 3100 (kg).
2. **TANAPAT's own system** — `Documents/Work PAE/Claude/Printing costs/index.html` prints the identical formula in its UI footnote: *"💡 สูตร: (กว้าง × ยาว(นิ้ว) × แกรม ÷ 3,100) × ราคา/กก. = บาท/รีม … 1 รีม = 500 แผ่น"*.

**Dimensional derivation (I derived this myself — it is exact, not a fudge factor):**

```
1 in²          = 6.4516 cm²
area (m²)      = w·l·6.4516 / 10,000
weight/sheet   = gsm · area(m²) / 1,000  kg
weight/ream    = 500 · gsm · w·l·6.4516 / 10⁷
               = w·l·gsm / (10⁷ / (6.4516 × 500))
10⁷ / 3,225.8  = 3,100.0062
```

So **3,100 is not an empirical constant — it is `10⁷ / (6.4516 × 500)` rounded to 5 significant figures**, and it bakes in exactly three things: inch→cm² conversion, gsm→kg, and 500 sheets/ream. Dimensionally correct. Error from rounding 3,100.0062 → 3,100 is 0.0002%. ✅

**Price check:**
```
31 × 43 = 1,333 in²
1,333 × 260 / 3,100 = 111.800 kg/ream   (exact method: 111.7998 kg — matches)
111.800 × 28.75     = 3,214.25 THB/ream   → article says 3,214 ✅
3,214.25 / 500      = 6.4285 THB/sheet    → article says 6.43 ✅
```

**Price source is real and current:** PrintCost has `p_hk_260 / HIKOTE 260g / base:28.75 / บาท/กก. / sizes:['25x36','31x43'] / fixed:true / src:'คุณกระดาษ 5 ส.ค. 69'`. This is a `fixed:true` real quoted price, not an estimate. ✅

### C4–C9 — Sheet sizes ✅ VERIFIED

| Article | My conversion | Verdict |
|---|---|---|
| 31×43 in = 78.7 × 109.2 cm | 78.74 × 109.22 | ✅ |
| 25×36 in = 63.5 × 91.4 cm | 63.50 × 91.44 | ✅ |
| 24×35 in = 61.0 × 88.9 cm | 60.96 × 88.90 | ✅ |

All three confirmed as Thai standard sheet sizes by IOP (โรงพิมพ์อินเตอร์ ออล พริ้นติ้ง), which lists 31×43 (มาตรฐานทั่วไป/หนังสือ), 25×36 (นิตยสาร/วารสาร/รายงานประจำปี), 24×35 (นิตยสาร/วารสาร), plus 27×40.

The paper-type mapping is independently corroborated by TANAPAT's own PrintCost data:
- อาร์ตการ์ด C2S HIKOTE → `sizes:['25x36','31x43']` ✅ (matches C7 and C8)
- ปอนด์ขาว (Xpro, ไวไว, Smart) → `sizes:['24x35']` ✅ (matches C9)

This is as good as a source gets — the article's claim matches the firm's live supplier price list.

### C16–C31 — Every imposition and percentage recomputed ✅

Model used (mirrors the article): usable area 75 × 106 cm, each piece occupies `(w + 0.6) × (h + 0.6)` cm, grid = `floor(75/W) × floor(106/H)`, best of both orientations.

*(Note: `n × (w + 0.6)` is exactly right for a bleed layout — n pieces + (n−1) gutters of 6 mm + 3 mm outer bleed each side = `n·w + n·0.6`. The model is internally consistent, not a fudge.)*

| Item | Portrait | Landscape | Best | Article | ✓ |
|---|---|---|---|---|---|
| 14 × 14 | 5×7 = 35 | 5×7 = 35 | **35** | 35 (5×7) | ✅ |
| 14.5 × 14.5 | 4×7 = 28 | 4×7 = 28 | **28** | 28 (4×7) | ✅ |
| 15 × 15 | 4×6 = 24 | 4×6 = 24 | **24** | 24 (4×6) | ✅ |
| 13 × 13 | 5×7 = 35 | 5×7 = 35 | **35** | 35 | ✅ |
| 9 × 5.4 | 7×17 = 119 | 12×11 = **132** | **132** | 132 | ✅ |
| 10 × 6 | 7×16 = **112** | 11×10 = 110 | **112** | 112 | ✅ |
| 36.9 × 52.4 | 2×2 = 4 | 1×2 = 2 | **4** | 4 | ✅ |
| 37 × 52.4 | 1×2 = 2 | 1×2 = 2 | **2** | 2 | ✅ |

Both business-card figures required checking the rotated orientation — Rae got both right (132 is landscape-only, 112 is portrait-only). Good work.

**Percentages:**

| Article says | Computed | ✓ |
|---|---|---|
| แพงกว่า 46% (14×14 → 15×15) | 35/24 − 1 = **45.83%**; on sheet counts 209/143 − 1 = **46.15%** | ✅ |
| พื้นที่มากขึ้น 15% | 225/196 − 1 = **14.80%** | ✅ |
| จำนวนต่อแผ่นลดลง 31% | 1 − 24/35 = **31.43%** | ✅ |
| นามบัตรกินกระดาษมากขึ้น 18% | 132/112 − 1 = **17.86%** | ✅ |
| 13×13 เล็กกว่า 14×14 อยู่ 16% | 196/169 − 1 = **15.98%** | ✅ |
| ค่ากระดาษเพิ่มเป็นสองเท่า (โปสเตอร์) | 4 → 2 up = exactly ×2 | ✅ |
| **5 มม. → แพงขึ้น 30%** | 14→14.5: 35/28 − 1 = **25.00%** | ❌ **see Blocker 1** |

**Per-piece paper cost:** 6.4285/35 = 0.1837 → 0.18 ✅ · /28 = 0.2296 → 0.23 ✅ · /24 = 0.2679 → 0.27 ✅

**Sheet counts for 5,000 pcs:** `ceil(5000/35) = 143` ✅ · `143 × 6.4285 = 919.3` → 919 ✅ · `ceil(5000/24) = 209` ✅ · `209 × 6.4285 = 1,343.6` → 1,344 ✅ · diff = **66 sheets** ✅ · diff = **424.3 THB** (article says 425 — consistent with the rounded figures 1,344 − 919; see Nitpick 3).

**L90 knife-edge arithmetic:** 75 / 37.5 = 2.000 → 2 across; 75 / 37.6 = 1.995 → 1 across. Arithmetic ✅ (but see Warning 2).

### C10, C11 — Gripper margin and the 75 × 106 usable area

**C10 ✅ VERIFIED.** PrintWiki (*Gripper Bite*): "the amount of paper, or the margin, that is held by the grippers that feed the sheet through a printing press… image areas that fall in the gripper margin will not print." The article's explanation is accurate.

**Typical gripper figures (PDF Press, *Gripper Edge Explained*):**
- Small-format presses: 8–10 mm · Medium: 10–12 mm · **Large-format: 12–15 mm**
- Gripper applies to the **leading edge only**; other three edges lose ~3–5 mm each
- Worked example: SRA3 320×450 mm → printable 310×433 mm = **93.2% sheet utilisation**

**C11 ⚠️ UNVERIFIED — and this is the single biggest risk in the article.** See Warning 1.

### C33–C34 — The A-series claim

**C33 ✅ VERIFIED.** ISO 216 / Wikipedia: Walter Porstmann's 1918 argument was to base paper formats "on the area; that is, linking the system of paper formats to the metric system using the square metre", with a 1:√2 ratio; A0 has an area of 1 m². So *"ระบบขนาด A4 A5 ถูกออกแบบมาให้ลงตัวกับกระดาษระบบเมตริกของยุโรป"* is correct — and there is even a dedicated ISO 217 RA/SRA series of untrimmed stock sizes built to give A-sizes their bleed and gripper allowance.

**C34 ❌ INCORRECT.** *"การเอาขนาด A มาวางบนแผ่นนิ้วจึงเหลือเศษเสมอ"* — the word **เสมอ** makes this false, and it is falsified by a sheet the article lists in its own table:

```
A4 (21 × 29.7) on 24×35 in (61 × 88.9 cm) → 2 × 4 = 8-up, area utilisation 92.0%
A4 (21 × 29.7) on 31×43 in (78.7 × 109.2) → 2 × 5 = 10-up, area utilisation 72.6%
```

**24 × 35 in = 609.6 × 889 mm is essentially RA1 (610 × 860 mm) in inch clothing** — it is the A4 sheet of the Thai market, which is exactly why the article itself labels it *"กระดาษปอนด์ขาว งานหนังสือ"*. A4 books in Thailand are printed on 24×35 precisely because A-sizes *do* fall out cleanly on it. See Blocker 2.

### C35 ✅ VERIFIED — folding / forming

Correct and essentially definitional: a box, bag or folded brochure is imposed from its flat blank / dieline, not its finished dimensions. Corroborated by Thai packaging trade practice (Balance Packing on บล็อกพิมพ์กล่อง; imposition is defined by Wikipedia as "the arrangement of the printed product's pages on the printer's sheet… to reduce paper waste"). No correction needed.

### C36–C39 — Thai trade terminology

| Term | Article's usage | Verdict |
|---|---|---|
| **ตัดตก** | bleed allowance, 3 mm รอบด้าน | ✅ **VERIFIED.** Thai Printing Center and PNK & SKY both define ตัดตก as the bleed reserve, conventionally 3 mm per side. Used correctly. |
| **รีม** | 500 แผ่น | ✅ **VERIFIED.** Paperrim, CAS Paper and PrintCost all state 1 รีม = 500 แผ่น for large sheet stock. Used correctly. |
| **คาบกระดาษ** | the gripper-held strip that cannot be printed | ⚠️ **UNVERIFIED.** The concept is right (see C10). "คาบ" for the press grip is genuine spoken trade usage, but I could not find it defined in any published Thai print glossary (V-WISE, Riccoprint, Tonchabub, Police Printing all omit it). The article does gloss it inline at L47, which is the correct mitigation. Keep. |
| **ตกกระดาษ** | paper yield / how many pieces fall out of one large sheet | ⚠️ **UNVERIFIED — load-bearing.** See Warning 5. |
| **หน้ายก** | — | Not used in the article. Nothing to check. (For reference, IOP defines หน้ายก as the number of finished pages a folded sheet yields — 8/16/32 — which is a *different* concept from ตกกระดาษ, so the article was right not to conflate them.) |

---

## 3. ❌ BLOCKERS

### Blocker 1 — The headline number (30%) appears nowhere in the article's own data

**Where:** L16 (title), and it propagates to the article slug / SEO / social copy.

**The claim:** *"ทำไมงานที่ใหญ่ขึ้นแค่ 5 มิลลิเมตร ถึงแพงขึ้น 30%"*

**What the article's own data actually shows:**

| Size step | Ups | Paper cost change |
|---|---|---|
| 14 → 14.5 cm (**+5 mm**) | 35 → 28 | **+25.0%** |
| 14.5 → 15 cm (**+5 mm**) | 28 → 24 | **+16.7%** |
| 14 → 15 cm (+10 mm) | 35 → 24 | **+45.8%** |

There is no 30% anywhere. The nearest number in the article is **"ลดลง 31%"** at L64 — but that is the *drop in pieces per sheet* over a **1 cm** step, not a *price rise* over a **5 mm** step. The headline looks like it was built by taking the 31% figure and re-labelling it as a price increase at half the size step. Those are two separate errors compounding: wrong step, and a yield drop stated as a cost rise. (A 31% drop in ups is a **46%** cost rise, not 31%.)

There is a second problem: **"งาน…แพงขึ้น"** implies the job price, but every figure in the article is **paper cost only**. At 143–209 sheets, paper is a minority of a 4/4 job's cost; plates and makeready dominate. The body is scrupulous about saying *ค่ากระดาษ* — the headline is not.

**Corrected text — use one of these two:**

> **Option A (keeps the 5 mm hook, exactly supported by L56–57):**
> `ทำไมการ์ดที่ใหญ่ขึ้นแค่ 5 มิลลิเมตร ค่ากระดาษถึงแพงขึ้น 25%`

> **Option B (uses the opening scene at L21–23, exactly supported by L68–69):**
> `ทำไมการ์ดที่ใหญ่ขึ้นแค่ 1 เซนติเมตร ค่ากระดาษถึงแพงขึ้น 46%`

I recommend **Option A** — it keeps the "แค่ 5 มิลลิเมตร" hook that makes the piece work, and 25% is still a striking number. If Option A is used, also adjust L54 so the 5 mm example is introduced before the 1 cm one, and keep L23's 46% as the follow-up escalation.

Whichever is chosen, the word **ค่ากระดาษ** must appear in the headline. "งานแพงขึ้น 25%" is not supported by anything in the article.

### Blocker 2 — "การเอาขนาด A มาวางบนแผ่นนิ้วจึงเหลือเศษเสมอ" is false as written

**Where:** L118.

**Why it's wrong:** The universal **เสมอ** is falsified by 24 × 35 in — a sheet the article itself lists at L45. A4 falls 8-up on 24×35 at **92.0% area utilisation**, which is better than most metric-on-metric combinations. 24 × 35 in = 609.6 × 889 mm is effectively ISO 217 **RA1** (610 × 860 mm) sold in inch units; it exists in the Thai market *because* it takes A-sizes cleanly, which is exactly why the article correctly calls it "กระดาษปอนด์ขาว งานหนังสือ".

The real, defensible version of this point is narrower: A-sizes fit **poorly on 31 × 43** (10-up A4, 72.6% utilisation) but **well on 24 × 35** (8-up, 92.0%) — so the sheet the printer picks matters more than whether the size is "A" or not.

**Corrected text for L118:**

> `สาม ขนาดที่ลงตัวกับกระดาษไทย ขึ้นอยู่กับว่าใช้แผ่นไหน`
>
> `ระบบขนาด A4 A5 ถูกออกแบบบนระบบเมตริก โดยกระดาษ A0 มีพื้นที่ 1 ตารางเมตรพอดี ไม่ได้ออกแบบมาให้ลงตัวกับกระดาษที่วัดเป็นนิ้ว ผลคือขนาด A ลงตัวกับแผ่นบางขนาดแต่ไม่ลงตัวกับบางขนาด เช่น A4 วางบนแผ่น 24 × 35 นิ้ว ได้ 8 หน้าโดยเหลือเศษน้อยมาก แต่วางบนแผ่น 31 × 43 นิ้ว เหลือเศษเกือบสามสิบเปอร์เซ็นต์ ถ้างานของคุณไม่จำเป็นต้องเป็นขนาด A เป๊ะ ๆ เช่นไม่ต้องใส่แฟ้มมาตรฐาน การขยับขนาดเล็กน้อยให้เข้ากับแผ่นที่โรงพิมพ์จะใช้จริง มักได้จำนวนต่อแผ่นเพิ่มขึ้น`

---

## 4. ⚠️ WARNINGS

### Warning 1 — The 75 × 106 cm usable area is unverified, and two of the three marquee examples flip within 1 cm of it

**This is the most consequential item in the report.** Rae flagged it honestly in the HTML comment (*"← ต้องให้ PAE ยืนยันกับแท่นจริง"*) — that flag is correct and must be resolved before publication, not after.

**Is 75 × 106 realistic?** It is *plausible but on the conservative side*, and it may not describe what it claims to describe:

- On a 78.7 × 109.2 cm sheet, 75 × 106 means giving up **3.7 cm of width and 3.2 cm of length** — 92.5% sheet utilisation. Published large-format figures suggest **12–15 mm gripper on the lead edge plus 3–5 mm on the other three**, which on this sheet gives roughly **77 × 108 cm (96.8%)**.
- Separately: **75.0 × 106.0 cm is exactly the maximum sheet size of a Heidelberg Speedmaster XL 106-class press.** If that number came from a press spec sheet rather than from measuring a real 31×43 job, it is a *max sheet* figure, not a *printable area from a 31×43 sheet* — and an XL 106 cannot even feed a 78.7 × 109.2 sheet. Worth confirming which it is.
- Countervailing point: many Thai shops **trim 31×43 stock down before printing** to fit a smaller press, in which case 75 × 106 (or less) is entirely realistic. That is a question only Kittanate can answer about TANAPAT's actual press.

**Sensitivity analysis — how much do the answers move?** (bold = differs from the article)

| Item | 73×104 | 74×105 | **75×106 (article)** | 76×107 | 77×108 | 78×108 |
|---|---|---|---|---|---|---|
| 14 × 14 | 35 | 35 | **35** | 35 | 35 | 35 |
| **14.5 × 14.5** | **24** | **24** | **28** | **35** | **35** | **35** |
| 15 × 15 | 24 | 24 | **24** | 24 | 24 | **30** |
| 13 × 13 | 35 | 35 | **35** | 35 | 35 | 35 |
| 9 × 5.4 | **120** | **120** | **132** | 132 | **144** | **144** |
| 10 × 6 | **99** | **99** | **112** | 112 | 112 | 112 |
| 36.9 × 52.4 | **2** | **2** | **4** | 4 | 4 | 4 |
| **37 × 52.4** | 2 | 2 | **2** | **4** | **4** | **4** |

Read the two bolded rows. **The 14.5 × 14.5 = 28-up result — the article's central "5 มิลลิเมตร" example — needs only 0.5 cm more usable width to become 35-up, identical to 14 × 14.** At which point the entire narrative of the piece evaporates. It requires exactly 5 × 15.1 = 75.5 cm and the article assumes 75.0.

Likewise **the poster pair (4-up vs 2-up) inverts at 76 cm**: at 76 cm usable width both sizes give 4-up and the "1 มิลลิเมตร → ค่ากระดาษเพิ่มเป็นสองเท่า" claim disappears.

**Required action before publish:** Kittanate must confirm the real usable print area of the press that runs 31×43 stock (or confirm the stock is trimmed first, and to what). If the real figure is 76 cm or wider, **the card example, the poster example and the headline all have to be rebuilt.** Do not publish on the 75 × 106 assumption alone.

### Warning 2 — The poster example is arithmetically true but has zero physical tolerance

36.9 + 0.6 = 37.5, and 37.5 × 2 = **75.000** cm — the full usable width to the last micron. 52.4 + 0.6 = 53.0, and 53.0 × 2 = **106.000** cm — same on the other axis. **Both dimensions of this example sit at exactly zero slack.** No real press or guillotine runs a layout with 0.0 mm of margin; register tolerance and knife tolerance are ±0.5–1 mm each. In practice this layout would be run 2-up, not 4-up.

The example was clearly reverse-engineered to land precisely on the boundary, and a printer reading the article will spot it.

**Recommended fix:** move the poster example off the boundary — e.g. 36 × 51 cm (36.6 × 51.6 → 2 × 2 = 4-up with 1.8 cm and 2.8 cm to spare) vs 38 × 51 cm (38.6 → 1 across = 2-up). Same dramatic effect, physically runnable, and the "ใหญ่ขึ้น 2 ซม. ค่ากระดาษเป็นสองเท่า" line is still strong. If Rae wants to keep the 1 mm hook, it must be paired with an explicit acknowledgement that real layouts need a few mm of slack.

### Warning 3 — "นามบัตรขนาดมาตรฐาน 9 × 5.4 ซม."

Thai printers most commonly advertise **9 × 5.5 ซม.** as *ขนาดมาตรฐาน* (Pingidea, Thai Printing Center and most Thai card printers quote 9 × 5.5). **90 × 54 mm** is the international/Asian standard and is also widely used in Thailand, so 9 × 5.4 is not wrong — but calling it *the* Thai standard without qualification is.

**No arithmetic impact:** I checked — 9 × 5.5 also gives **132-up**, so C25 and C26 (18%) are unaffected either way.

**Recommended fix for L78:** `ขนาดที่ใช้กันทั่วไป 9 × 5.5 ซม. — วางได้ 132 ดวงต่อแผ่น` (or keep 9 × 5.4 and write *ขนาดสากล 9 × 5.4 ซม.* instead of *ขนาดมาตรฐาน*).

### Warning 4 — "กระดาษเผื่อเสียที่ต้องเพิ่มตามสัดส่วน" (L71)

Makeready spoilage on a 4/4 offset job is **largely a fixed quantity per job** (sheets consumed getting to colour), not a proportional one. On 143 vs 209 sheets, both jobs incur roughly the *same* makeready waste — which, at typical figures, is comparable to or larger than the entire 66-sheet difference the article is highlighting.

This does not break the article's argument (the 66-sheet delta is real and survives), but "เพิ่มตามสัดส่วน" is not accurate.

**Recommended fix:** `…กับกระดาษเผื่อเสียที่เพิ่มขึ้นอีกส่วนหนึ่ง` — vaguer, and true.

### Warning 5 — "ตกกระดาษ" cannot be sourced, and the article is built on it

The article uses **ตกกระดาษ** as its central concept (L25, L101, L114, L135) in the sense of *paper yield / how many pieces fall out of one large sheet / imposition planning*.

**I could not verify this term in any published Thai source.** I searched Thai print glossaries (Police Printing, Riccoprint ×2, Tonchabub, V-WISE, Prompt Interprint, Siam Diecut), Pantip printing threads, and general Thai print-industry sites. None of them define or even use **ตกกระดาษ**. The published Thai written terms for this concept are **การจัดหน้างานพิมพ์**, **เลย์งาน**, or the loanword **imposition**.

**My assessment:** it is very likely genuine spoken trade jargon (the pattern *"ขนาดนี้ตกกระดาษได้กี่ตัว"* is idiomatic Thai and I have no evidence of it being *mis*used), but I cannot certify it from a source, and per this mode's rule **an unsourced claim is an assumption and must be labelled as one.**

**Risk if it's slightly off:** the closest neighbouring terms are **ตัดตก** (bleed — the article uses this correctly and separately, good) and **หน้ายก** (pages per folded signature — a different concept, correctly not conflated). There is no obvious misuse. But if a reader's shop uses ตกกระดาษ to mean something narrower, the article's SEO and its whole framing miss.

**Recommended action — two parts:**
1. **Kittanate must confirm the term from 40 years of trade usage.** This is one question and he is a better source than anything on the Thai web. If he confirms, upgrade to ✅ and note the source as "TANAPAT trade usage".
2. **Regardless, define it explicitly on first use.** Right now L25 introduces ตกกระดาษ as a punchline with no definition, and the reader only infers the meaning from L28–36. Add a one-line gloss at L25, e.g.:
   `…นั่นคือ การตกกระดาษ — การคำนวณว่างานหนึ่งชิ้นวางลงบนกระดาษแผ่นใหญ่ได้กี่ชิ้น`
   This costs one clause and makes the article robust to any reader who doesn't know the term.

---

## 5. Nitpicks

1. **L71 "ต่างกัน 425 บาท"** — the true difference is **424.3** บาท. 425 is what you get subtracting the two already-rounded figures (1,344 − 919). Harmless, but "ประมาณ 425 บาท" or "424 บาท" is cleaner.
2. **L90 "ถ้ากว้าง 37.6 เซนติเมตร วางได้ชิ้นเดียว"** — ambiguous. One piece *across the width*; the sheet still yields 2 pieces total (2 down the length). Suggest `วางได้แถวละชิ้นเดียว`.
3. **L25 "ไม่ใช่เพราะพื้นที่มากขึ้น 15%"** — the exact figure is 14.8%. Rounding to 15% is fine, and arguably better for readability. No change needed.
4. **L114 "บ่อยครั้งคำตอบคือลดแค่ 3 มิลลิเมตร"** — 💬 opinion/experience, not a verifiable claim. Fine as written since it's framed as what a printer will tell you, not as a rule. No change needed.
5. **Imposition model is single-orientation grid only.** Real imposition software will mix orientations (e.g. a strip of rotated pieces in the leftover margin) and can beat these numbers. The article's figures are therefore *conservative floors*, which is the right direction for a customer-facing article — but a printer reading it may object. One sentence acknowledging it ("ตัวเลขนี้คิดจากการวางเรียงแบบตารางเดียว งานจริงบางแบบวางสลับแนวได้อีก") would pre-empt the objection.
6. **Shared-bleed / butt-cut layouts.** The article's +6 mm-per-piece model is correct for artwork that bleeds (two knife cuts, 6 mm gutter). For work *without* bleed, pieces can be butt-cut on a single knife line and the yields go up — 14.5 × 14.5 would then reach 35-up. The article says "เผื่อตัดตก 3 มม." up front so it is not wrong, but the numbers only hold for bleeding artwork. Optional one-line caveat.

---

## 6. What is genuinely strong here

Worth stating, since the verdict is FAIL: **Rae's underlying calculation work is accurate.** 8/8 imposition results correct including both orientation traps, 6/6 body percentages correct, the ream formula correct and correctly sourced to the firm's own price list, and the price arithmetic correct to the last decimal. The HTML comment block honestly declares every assumption and explicitly flags the one that needs verification. For a draft written without a research brief this is unusually disciplined.

The failure is confined to the headline and one overclaimed sentence — both fixable in about ten minutes.

---

## 7. Verdict and required actions

### ❌ FAIL — do not publish as article-53 yet.

**Must fix before publish (Blockers):**
1. Headline → `ทำไมการ์ดที่ใหญ่ขึ้นแค่ 5 มิลลิเมตร ค่ากระดาษถึงแพงขึ้น 25%` (or Option B at 1 ซม./46%). The word **ค่ากระดาษ** must be in it.
2. L118 → replace *"เหลือเศษเสมอ"* with the corrected paragraph given in Blocker 2 (A4 = 8-up/92% on 24×35 vs 10-up/72.6% on 31×43).

**Must resolve before publish (Warning 1 — conditional blocker):**
3. Kittanate to confirm the real usable print area for 31×43 stock on the actual press. If it is ≥ 76 cm wide, **the 14.5 cm card example, the poster example and the headline number all have to be recomputed.**

**Should fix:**
4. Move the poster example off zero-tolerance (Warning 2).
5. Confirm and gloss **ตกกระดาษ** on first use (Warning 5).
6. นามบัตร → 9 × 5.5 ซม., or reword *ขนาดมาตรฐาน* → *ขนาดสากล* (Warning 3).
7. L71 → drop "ตามสัดส่วน" (Warning 4).

Once items 1–3 are done, re-run this fact-check on the revised numbers before it goes to Chris QA. Items 1 and 2 need no recalculation; item 3 may invalidate the whole table.

---

## Sources

- [วิธีการคำณวณหาน้ำหนักกระดาษ — LHC Paper](http://www.lhcpaper.com/index.php?option=com_content&view=article&id=30%3Acalpaper&catid=27%3Anew-to-joomla&Itemid=44) — สูตร ÷ 3,100
- [มาตรฐานของขนาดกระดาษ — IOP](https://www.iop.co.th/blog/7167/%E0%B8%A1%E0%B8%B2%E0%B8%95%E0%B8%A3%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B2%E0%B8%A9) — Thai standard sheet sizes, หน้ายก
- [Gripper Bite — PrintWiki](https://printwiki.org/Gripper_Bite) — gripper margin definition
- [Gripper Edge Explained — PDF Press](https://pdfpress.app/blog/gripper-edge-explained) — 8–15 mm gripper by press format, 93.2% SRA3 utilisation
- [ตัดตกคืออะไร — Thai Printing Center](https://thaiprintingcenter.com/learning_printing/%E0%B8%95%E0%B8%B1%E0%B8%94%E0%B8%95%E0%B8%81%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3/) — ตัดตก = bleed, 3 มม.
- [ระยะตัดตกคืออะไร — PNK & SKY Printing](https://pnkandsky.com/what-is-the-cut-off-distance/) — bleed 3 มม. รอบด้าน
- [นามบัตรขนาดมาตรฐาน 9 × 5.5 ซม. — Pingidea](https://pingidea.com/th/FrontPagesAction.do?method=openPage&pageId=33) — Thai standard business card
- [ขนาดนามบัตร — Thai Printing Center](https://thaiprintingcenter.com/learning_printing/%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94%E0%B9%80%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B9%84%E0%B8%AB%E0%B8%A3%E0%B9%88-%E0%B9%83%E0%B8%AA%E0%B9%88/)
- [ISO 216 — Wikipedia](https://en.wikipedia.org/wiki/ISO_216) — A-series metric origin, A0 = 1 m², ISO 217 RA/SRA
- [Imposition — Wikipedia](https://en.wikipedia.org/wiki/Imposition) — imposition definition, waste reduction
- [กระดาษปรู๊ฟ 31×43 นิ้ว 1 รีม 500 แผ่น — Paperrim](https://paperrim.com/en/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B2%E0%B8%A9%E0%B8%AB%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2-%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B2%E0%B8%A9%E0%B8%84/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B2%E0%B8%A9%E0%B8%9B%E0%B8%A3%E0%B8%B9%E0%B9%8A%E0%B8%9F/) — 1 รีม = 500 แผ่น
- [31×43 นิ้ว — CAS PAPER](https://www.caspaper.com/products_size/31x43-%E0%B8%99%E0%B8%B4%E0%B9%89%E0%B8%A7/) — sheet size in Thai market
- **Internal:** `Documents/Work PAE/Claude/Printing costs/index.html` — สูตร ÷ 3,100 · 1 รีม = 500 แผ่น · HIKOTE 260g @ 28.75 บาท/กก. (`fixed:true`, src: คุณกระดาษ 5 ส.ค. 69) · sheet-size ↔ paper-type mapping
- **Not found (searched, absent):** ตกกระดาษ, คาบกระดาษ — checked against Police Printing glossary, Riccoprint (×2), Tonchabub, V-WISE, Prompt Interprint, Siam Diecut, Pantip printing threads
