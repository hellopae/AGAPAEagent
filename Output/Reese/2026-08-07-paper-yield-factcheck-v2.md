# Fact-check Report v2 — "ทำไมใบปลิวที่ใหญ่ขึ้นแค่ 5 มิลลิเมตร ค่ากระดาษถึงแพงขึ้น 30%"

- **Reviewer:** Reese (Mode 2 — Fact-check)
- **Date:** 2026-08-07
- **Target:** `Output/Rae/2026-08-07-paper-yield-article-v2.md` → tanapat.co.th article-53
- **Previous round:** `Output/Reese/2026-08-07-paper-yield-factcheck.md` — ❌ FAIL (2 blockers, 5 warnings)

## Overall verdict: ❌ **FAIL**

**3 Blockers · 5 Warnings · 4 Nitpicks.**

**Both v1 blockers are properly fixed.** The headline now matches the data and carries "ค่ากระดาษ"; the A-series overclaim is gone and its replacement is factually correct. The poster and business-card examples were correctly cut. The ตกกระดาษ definition was added. That is real, responsive work.

**But the fix for the 75×106 warning introduced a worse problem than the one it solved.** The article now makes an explicit, checkable engineering claim in its own footnote — that every example is press-independent — and **that claim is false at its own declared test points**, and far more badly false one step outside them. Under the coordinator's own stated rule ("ถ้ามีคู่ไหนไม่ STABLE คือ blocker ทันที"), that is an automatic blocker. A third blocker appeared in new v2 prose.

---

## 1. Requested checks — direct answers

| # | Check | Result |
|---|---|---|
| 1 | All 4 pairs STABLE across 75×106 / 76×107 / 77×108 | ❌ **2 of 4 pairs FAIL** — see Blocker 1 |
| 2 | No pair has slack = 0 | ❌ **2 pairs have slack exactly 0.00 cm** at 77×108 |
| 3 | All percentages | ✅ except "พื้นที่มากขึ้นแค่ 7%" (true 7.56%) |
| 4 | Sheet totals 143/919, 186/1,196, 277, 43, 425 | ✅ **all verified** |
| 5 | "25 ซม. → 3 ชิ้น, 25.1 ซม. → 2 ชิ้น" on 75 cm | ✅ arithmetic correct · ⚠️ zero slack again |
| 6 | 21 cm = A4 width | ✅ **VERIFIED** (A4 = 210 × 297 mm) |
| 7 | New unchecked claims in v2 | ❌ **found one — Blocker 3** |

---

## 2. Claim inventory

| # | Claim (line) | Verdict |
|---|---|---|
| C1 | หัวข้อ: ใบปลิวใหญ่ขึ้น 5 มม. → ค่ากระดาษแพงขึ้น 30% (L21) | ✅ VERIFIED (29.63%) |
| C2 | ค่ากระดาษรายที่สองแพงกว่า 30% (L28) | ✅ VERIFIED |
| C3 | พื้นที่มากขึ้นแค่ 7% (L30) | ⚠️ true value **7.56%** → rounds to 8% |
| C4 | ต่างกันด้านละ 5 มิลลิเมตร (L26) | ✅ VERIFIED (10→10.5, 20.5→21) |
| C5 | นิยาม "การตกกระดาษ" (L37) | ✅ good fix · ⚠️ term itself still unverified |
| C6–C8 | ขนาดแผ่นมาตรฐาน 31×43 / 25×36 / 24×35 + การแปลงหน่วย (L50–52) | ✅ VERIFIED (v1) |
| C9 | คาบกระดาษ / ตัดตก 3 มม. (L54) | ✅ VERIFIED (v1) |
| C10 | **L56: ผลเท่าเดิมไม่ว่าพื้นที่พิมพ์จริงจะเป็น 75, 76 หรือ 77 ซม.** | ✅ **TRUE as literally written** |
| C11 | **L56: "ตัวเลขที่เห็นจึงไม่ขึ้นกับรุ่นของแท่นพิมพ์"** | ❌ **INCORRECT** — Blocker 2 |
| C12 | 10×20.5 = 35 up, 0.18 บาท (L61) | ✅ VERIFIED at 75×106 · ❌ not stable — Blocker 2 |
| C13 | 10.5×21 = 27 up, 0.24 บาท (L62) | ✅ VERIFIED at 75×106 · ❌ **not STABLE** — Blocker 1 |
| C14 | หายไป 8 ใบ, เรียง 7×5 → 3×9 (L64) | ✅ **VERIFIED** |
| C15 | 143 แผ่น = 919 บาท (L68) | ✅ VERIFIED |
| C16 | 186 แผ่น = 1,196 บาท (L69) | ✅ VERIFIED (1,195.7) |
| C17 | ต่างกัน 277 บาท / 43 แผ่น (L71) | ✅ VERIFIED (276.4 / 43) |
| C18 | เผื่อเสีย "ตามสัดส่วน" (L71) | ⚠️ UNVERIFIED — **not fixed from v1** |
| C19 | **หัวข้อ "ยิ่งงานใหญ่ เส้นแบ่งยิ่งชัน" (L74, L76)** | ❌ **INCORRECT** — Blocker 3 |
| C20 | 14×14 = 35, 15×15 = 24, +46%, 425 บาท (L78–81) | ✅ VERIFIED · STABLE ✅ |
| C21 | 20.5×24 = 15 up (L85) | ✅ VERIFIED at 75×106 · ❌ not stable — Blocker 2 |
| C22 | 21×24 = 12 up (L86) | ✅ VERIFIED at 75×106 · ❌ **not STABLE** — Blocker 1 |
| C23 | เสีย 3 ชิ้นจาก 15 = แพงขึ้น 25% (L88) | ✅ VERIFIED (exactly 25.00%) |
| C24 | 21 ซม. คือความกว้างของ A4 (L88, L121) | ✅ **VERIFIED** |
| C25 | 25 ซม. → 3 ชิ้น; 25.1 ซม. → 2 ชิ้น (L90) | ✅ arithmetic · ⚠️ **slack = 0** |
| C26 | 9.5×20 = 35 up (L97) | ✅ VERIFIED · STABLE ✅ |
| C27 | 13×13 = 35 up (L98) | ✅ VERIFIED · STABLE ✅ |
| C28 | 13×13 เล็กกว่า 14×14 อยู่ 16% (L100) | ✅ VERIFIED (15.98%) |
| C29 | 12.5×12.5 = 40 up (L104) | ✅ VERIFIED · STABLE ✅ |
| C30 | งานพับ/ขึ้นรูปคิดจากขนาดกางออก (L123–125) | ✅ VERIFIED (v1) |
| C31 | สูตร ÷ 3,100, 3,214 บาท/รีม, 6.43 บาท/แผ่น, 1 รีม = 500 แผ่น (L143) | ✅ VERIFIED (v1) |
| C32 | **L145: ทุกคู่เท่าเดิมที่ 75×106, 76×107, 77×108** | ❌ **INCORRECT** — Blocker 1 |

---

## 3. ❌ BLOCKERS

### Blocker 1 — The STABLE claim is false at its own three declared test points

**Where:** L145 (หมายเหตุการคำนวณ) and L12 (HTML comment) — *"ขนาดตัวอย่างทุกคู่ในบทความถูกเลือกมาให้จำนวนชิ้นต่อแผ่นเท่าเดิม ไม่ว่าพื้นที่พิมพ์จริงจะเป็น 75 × 106, 76 × 107 หรือ 77 × 108 เซนติเมตร"*

I re-ran every pair independently, both orientations, 3 mm bleed all round (piece = w+0.6 × h+0.6):

| Size | Article claims | 75×106 | 76×107 | **77×108** | STABLE? |
|---|---|---|---|---|---|
| 10 × 20.5 | 35 | 35 | 35 | 35 | ✅ |
| **10.5 × 21** | **27** | 27 | 27 | **30** | ❌ **FAIL** |
| 14 × 14 | 35 | 35 | 35 | 35 | ✅ |
| 15 × 15 | 24 | 24 | 24 | 24 | ✅ |
| 20.5 × 24 | 15 | 15 | 15 | 15 | ✅ |
| **21 × 24** | **12** | 12 | 12 | **15** | ❌ **FAIL** |
| 9.5 × 20 | 35 | 35 | 35 | 35 | ✅ |
| 13 × 13 | 35 | 35 | 35 | 35 | ✅ |
| 12.5 × 12.5 | 40 | 40 | 40 | 40 | ✅ |

**Both failures are the "expensive" half of the article's two headline pairs** — the exact numbers the whole piece rests on.

**Mechanism:** both failing sizes have a 21 cm dimension. 21 + 0.6 = 21.6, and **5 × 21.6 = 108.000 cm exactly**. The third test point (length 108) lands precisely on that boundary and a fifth row appears:

```
10.5×21 @ 77×108 : 6 × 5 = 30 up, slack 10.40 / 0.00 cm
21×24   @ 77×108 : 3 × 5 = 15 up, slack  3.20 / 0.00 cm
```

**Both flips have slack exactly 0.00 cm** — the same zero-tolerance defect that got the v1 poster example cut. So in physical reality the press would still run 27 and 12, and the article's numbers survive *in practice*. But the article makes a bald, checkable claim and **the claim is false as written**. Anyone re-running Rae's own script gets 30 and 15.

This also answers requested check #2: **yes, two pairs still hit slack = 0.** The zero-slack disease was cut from the poster example but reappeared inside the stability test itself.

**Corrected text for L145 — replace the second paragraph with:**

> `ขนาดตัวอย่างทุกคู่ในบทความถูกเลือกมาให้จำนวนชิ้นต่อแผ่นเท่าเดิม เมื่อความกว้างของพื้นที่พิมพ์จริงอยู่ระหว่าง 75 ถึง 77 เซนติเมตร ที่ความยาว 106 เซนติเมตร แต่ตัวเลขเหล่านี้ยังขึ้นกับพื้นที่พิมพ์จริงของแท่นที่ใช้ ถ้าพื้นที่จริงต่างจากนี้ ต้องคำนวณใหม่`

That statement I verified and it holds for all 9 sizes (see Test A below). The claim of press-independence must go — see Blocker 2.

### Blocker 2 — "ตัวเลขที่เห็นจึงไม่ขึ้นกับรุ่นของแท่นพิมพ์" is false, and the testing method behind it is unsound

**Where:** L56 *"…ตัวเลขที่เห็นจึงไม่ขึ้นกับรุ่นของแท่นพิมพ์"* and L145 *"ตัวเลขจึงใช้ได้กับแท่นพิมพ์หลายรุ่น"*.

**First, the narrow good news.** L56's *arithmetic* claim — "ให้ผลเท่าเดิมไม่ว่าพื้นที่พิมพ์จริงจะเป็น 75, 76 หรือ 77 เซนติเมตร" (width only, at length 106) — **is true.** I verified all 9 sizes:

```
TEST A — width 75 / 76 / 77 at length 106:  ALL 9 SIZES STABLE  ✅
```

So L56 and L145 make two *different* claims and only the narrower one survives.

**The method is the problem.** Rae sampled **three points**, all moving in the **same direction** (bigger), on a function the article itself describes as a discontinuous integer step function. Passing three collinear samples does not establish stability over an interval. Sweeping the plausible range in 1 mm steps:

| Size | Article | Values actually observed over W 74–78, L 105–107.5 |
|---|---|---|
| **10 × 20.5** | **35** | **27, 28, 30, 35** |
| 10.5 × 21 | 27 | 27, 28 |
| 14 × 14 | 35 | 35 ✅ |
| 15 × 15 | 24 | 24, 30 |
| **20.5 × 24** | **15** | **12, 15** |
| 21 × 24 | 12 | 12 ✅ |
| 9.5 × 20 | 35 | 35 ✅ |
| 13 × 13 | 35 | 35 ✅ |
| 12.5 × 12.5 | 40 | 40 ✅ |

**The flagship number is the least robust of all.** 10 × 20.5 = 35-up requires **width ≥ 75 AND length ≥ 106**. One centimetre *down* on either axis and it collapses:

```
10×20.5 :  75×106 → 35 up      75×105 → 28 up      74×106 → 30 up
10.5×21 :  75×106 → 27 up      75×105 → 27 up      74×106 → 27 up
```

**At 75 × 105 the headline pair becomes 28-up vs 27-up — a paper-cost difference of +3.7%, not +30%.** The entire article evaporates. Rae only tested upward; Kittanate has not measured yet; and my v1 report concluded 75 × 106 was already on the **conservative** side, which means the true figure moving *down* is at least as live a possibility as moving up. The one direction that destroys the article is the one direction that was never tested.

**There is also a conceptual contradiction.** The article's entire thesis (L43, L130) is that pieces-per-sheet is an integer step function so violently sensitive that one millimetre changes the price. It cannot then claim in its own footnote that those same pieces-per-sheet figures are insensitive to a 2–3 cm change in the sheet area. Both cannot be true, and the data says the thesis is the true one.

**Required fix — three parts:**
1. **Delete** *"ตัวเลขที่เห็นจึงไม่ขึ้นกับรุ่นของแท่นพิมพ์"* (L56) and *"ตัวเลขจึงใช้ได้กับแท่นพิมพ์หลายรุ่น"* (L145). Replace L56 with the plain v1-style statement:
   > `ตัวอย่างทั้งหมดในบทความนี้คิดจากแผ่น 31 × 43 นิ้ว โดยใช้พื้นที่พิมพ์จริง 75 × 106 เซนติเมตร ตัวเลขนี้ต่างกันได้ตามรุ่นของแท่นพิมพ์ ถ้าแท่นต่างไป จำนวนชิ้นต่อแผ่นก็ต่างไปด้วย`
2. **Wait for Kittanate's measurement** before publishing. This was v1's Warning 1 and it is still the binding constraint. Engineering around an unmeasured number does not work when the function is this discontinuous — the measurement is the only real fix.
3. If Rae wants to keep a robustness claim at all, it must be stated as a **range with a direction**, e.g. "…เมื่อพื้นที่พิมพ์จริงกว้าง 75–77 ซม. ยาว 106–107 ซม." — and tested by sweeping the interval, not by sampling three points.

### Blocker 3 — "ยิ่งงานใหญ่ เส้นแบ่งยิ่งชัน" is contradicted by the article's own three examples

**Where:** section heading L74 and L76 — *"ใบปลิวเป็นงานเล็ก … เสียไปหนึ่งแถวยังพอทำใจได้ แต่พองานใหญ่ขึ้น จำนวนชิ้นต่อแผ่นน้อยลง การเสียไปหนึ่งแถวจึงคิดเป็นสัดส่วนที่ใหญ่กว่ามาก"*

This is a new v2 claim (v1 supported the same idea with the poster example, which has since been cut). The three examples now used to demonstrate it do the opposite:

| Example | Area | Ups | ค่ากระดาษต่อชิ้นแพงขึ้น |
|---|---|---|---|
| ใบปลิว 10 × 20.5 | 205 cm² | 35 → 27 | **+30%** |
| การ์ด 14 × 14 | **196 cm²** | 35 → 24 | **+46%** |
| แผ่นพับ 20.5 × 24 | **492 cm²** | 15 → 12 | **+25%** |

Two separate errors:

1. **The largest job has the smallest jump.** The brochure is 2.4× the area of the flyer and jumps only 25% vs the flyer's 30%. The section promises the jumps get steeper as the job gets bigger; they get shallower.
2. **The escalation isn't even an escalation.** The card (196 cm²) is presented as the step *up* from the flyer, but at 205 cm² **the flyer is the bigger piece.** L76 says "ใบปลิวเป็นงานเล็ก" — it is the largest of the two.

The underlying principle is sound as a *tendency* (fewer ups → coarser granularity → each lost row costs a larger share). It just isn't what these three numbers show, because the size of the jump depends on where a size sits relative to a boundary, not on absolute size.

I searched for a large-format replacement pair that is both robust and shows a ≥40% jump (sweeping W 74–78, L 105–108, requiring ≥3 mm slack). **None exists** — which is itself evidence that this section's promise cannot be kept with stable examples on this sheet.

**Recommended fix — reframe rather than re-example.** Drop the "ยิ่งงานใหญ่ยิ่งชัน" promise and make the section about something the data does support: *the size of the jump is unpredictable and has nothing to do with how big the change looks.*

> `หัวข้อ: เส้นแบ่งอยู่ตรงไหนก็ได้ และไม่สัมพันธ์กับขนาดที่เปลี่ยน`
>
> `เรื่องนี้ไม่ได้เกิดกับใบปลิวอย่างเดียว และความแรงของมันเดาไม่ได้จากขนาดที่ขยับ`
>
> `การ์ด 14 × 14 ซม. — วางได้ 35 ใบต่อแผ่น — ค่ากระดาษ 0.18 บาทต่อใบ`
> `การ์ด 15 × 15 ซม. — วางได้ 24 ใบต่อแผ่น — ค่ากระดาษ 0.27 บาทต่อใบ`
>
> `โตขึ้นด้านละ 1 เซนติเมตร ค่ากระดาษต่อใบแพงขึ้น 46% งาน 5,000 ใบต่างกัน 425 บาท`
>
> `แผ่นพับ 20.5 × 24 ซม. — วางได้ 15 ชิ้นต่อแผ่น`
> `แผ่นพับ 21 × 24 ซม. — วางได้ 12 ชิ้นต่อแผ่น`
>
> `กว้างขึ้นแค่ 5 มิลลิเมตร เสียไป 3 ชิ้นจาก 15 คิดเป็นค่ากระดาษต่อชิ้นที่แพงขึ้น 25% สังเกตว่าการ์ดที่โตขึ้น 1 เซนติเมตรแพงขึ้น 46% แต่แผ่นพับที่ใหญ่กว่ากลับแพงขึ้นแค่ 25% ขนาดที่ขยับเท่ากันไม่ได้แปลว่าราคาขยับเท่ากัน มันขึ้นอยู่กับว่าขนาดเดิมอยู่ห่างจากเส้นแบ่งแค่ไหน ซึ่งเป็นเรื่องที่มองด้วยตาไม่ออก`

This turns the contradiction into the point, and every number in it is already verified.

---

## 4. ⚠️ WARNINGS

### Warning 1 — L90 reintroduces the zero-slack defect that got the poster cut

*"ถ้ากระดาษกว้าง 75 เซนติเมตร งานที่บวกตัดตกแล้วกว้าง 25 เซนติเมตรวางได้พอดี 3 ชิ้น"*

**3 × 25.0 = 75.000 cm — zero slack**, exactly the defect flagged in v1 Warning 2 that caused the 36.9 × 52.4 poster to be deleted. Arithmetic is right (75/25.1 = 2.988 → 2 across), but no press or guillotine runs a layout with 0.0 mm of edge margin.

**Fix:** use a figure with real slack — e.g. `งานที่บวกตัดตกแล้วกว้าง 24.5 เซนติเมตรวางได้ 3 ชิ้น (เหลือขอบ 1.5 เซนติเมตร) ถ้ากว้าง 25.1 เซนติเมตร เหลือ 2 ชิ้น`. Verified: 3 × 24.5 = 73.5, slack 1.5 cm ✅.

### Warning 2 — Two live examples have only 5 mm of slack at 75 × 106

| Size | Slack at 75×106 | at 76×107 | at 77×108 |
|---|---|---|---|
| 10 × 20.5 | **0.50 cm** | 1.50 | 2.50 |
| 20.5 × 24 | **0.50 cm** | 1.50 | 2.50 |
| 12.5 × 12.5 | 1.20 cm | 2.20 | 3.20 |

5 mm total leftover across a whole sheet edge is runnable but tight. Not a blocker — flagging so it is a conscious choice.

### Warning 3 — "กระดาษเผื่อเสียที่ต้องเพิ่มตามสัดส่วน" (L71) — carried over unfixed from v1

Makeready spoilage on a 4/4 job is **largely fixed per job**, not proportional; both jobs incur roughly the same. Repeat of v1 Warning 4. **Fix:** `…กับกระดาษเผื่อเสียที่เพิ่มขึ้นอีกส่วนหนึ่ง`.

### Warning 4 — "ตกกระดาษ" still unverified (acknowledged, deferred by Kittanate)

The definition added at L37 (*"การวางเรียงงานลงบนแผ่นใหญ่ให้ได้จำนวนมากที่สุดโดยเหลือเศษน้อยที่สุด"*) is accurate and matches the standard definition of imposition, and it correctly mitigates the risk for readers who don't know the term. **Good fix.** The term itself remains ⚠️ UNVERIFIED against any published Thai glossary — still open pending Kittanate.

### Warning 5 — 75 × 106 still unmeasured

Unchanged from v1 Warning 1, and now load-bearing in a new way: see Blocker 2. This is the binding constraint on publication.

---

## 5. Nitpicks

1. **L30 "พื้นที่มากขึ้นแค่ 7%"** — true value is **7.56%** (205 → 220.5 cm²), which rounds to **8%**. The article rounds down, in the direction that flatters the argument. Use `แค่ 8%` or `ไม่ถึง 8%`.
2. **L21/L28 "แพงขึ้น 30%"** — true value 29.63%. Rounding up to 30% is fair for a headline; noting it because it is a round *up* and the article's credibility now rests on its rounding discipline.
3. **L71 "277 บาท" / L81 "425 บาท"** — true values 276.4 and 424.3. Both come from subtracting already-rounded figures. Harmless, consistent with the displayed numbers.
4. **L56 and L145 state two different stability claims** (width-only vs. full area). Even after the Blocker 1 fix, make sure both sentences say the same thing.

---

## 6. What v2 fixed correctly

Worth recording, since the verdict is again FAIL:

| v1 issue | Status |
|---|---|
| **Blocker 1** — headline 30% unsupported | ✅ **FIXED.** New flyer example gives 29.63% → 30% legitimately, and "ค่ากระดาษ" is now in the headline and throughout. |
| **Blocker 2** — A-series "เหลือเศษเสมอ" | ✅ **FIXED.** Universal claim deleted; replaced with a concrete verified example. 21 cm = A4 width confirmed correct. |
| **Warning 2** — poster slack = 0 | ✅ **FIXED** (cut) — though the defect reappeared at L90 and inside the stability test. |
| **Warning 3** — นามบัตร 9 × 5.4 | ✅ **FIXED** (cut). |
| **Warning 5** — ตกกระดาษ undefined on first use | ✅ **FIXED** (definition added L37). |
| **Warning 4** — เผื่อเสีย "ตามสัดส่วน" | ❌ **not fixed.** |
| **Warning 1** — 75 × 106 unmeasured | ❌ **not resolved** — and the workaround made it worse. |

All 12 sheet-count, cost and percentage figures I was asked to check in items 3–6 are **correct**: 143/919, 186/1,196, 277, 43 sheets, 425, +46%, +25%, +16%, 8 pieces lost, the 7×5 → 3×9 grid flip, and 21 cm = A4 width. The calculation work remains accurate; the failures are all in claims *about* the calculations.

---

## 7. Verdict and required actions

### ❌ FAIL — do not publish as article-53.

**Must fix (Blockers):**
1. **L145 / L12** — the three-point STABLE claim is false (10.5×21 → 30 up and 21×24 → 15 up at 77×108, both at slack 0.00). Replace with the width-75-to-77-at-length-106 statement, which I verified holds for all 9 sizes.
2. **L56 / L145** — delete both press-independence claims. The flagship 10 × 20.5 = 35-up drops to 28 at 75 × 105 and 30 at 74 × 106; at 75 × 105 the headline pair becomes 28 vs 27 (+3.7%, not +30%). Only upward variation was tested; downward is what breaks the article.
3. **L74–L88** — "ยิ่งงานใหญ่ เส้นแบ่งยิ่งชัน" is contradicted by its own examples (largest job = smallest jump; the "small" flyer is larger than the "bigger" card). Use the reframed section supplied in Blocker 3 — no new numbers needed.

**Must resolve before publish:**
4. Kittanate's measurement of the real usable print area. This is now unavoidable — Blocker 2 exists precisely because the article tried to route around it. Once measured, re-verify every pair against the single real figure; that is a 30-second script run and it makes Blockers 1 and 2 disappear together.

**Should fix:**
5. L90 zero-slack sentence → use 24.5 cm (slack 1.5 cm).
6. L30 "แค่ 7%" → "แค่ 8%".
7. L71 drop "ตามสัดส่วน".

**Note for v3:** items 1–3 and 5–7 are all text edits requiring no recalculation. Item 4 may change the tables. If Kittanate's measurement lands at or above 75 × 106 on both axes, the current numbers stand as-is and only the claims need rewriting. If it lands below on either axis, the flyer example must be rebuilt from scratch.

---

## Sources

Domain claims carried forward from the v1 report (formula ÷ 3,100, sheet sizes, gripper margin, ตัดตก, รีม, imposition, A-series metric origin) — see `Output/Reese/2026-08-07-paper-yield-factcheck.md` for the full source list.

New in this round:
- **A4 = 210 × 297 mm** → width 21.0 cm confirms C24 ([ISO 216](https://en.wikipedia.org/wiki/ISO_216))
- **Internal:** `Documents/Work PAE/Claude/Printing costs/index.html` — สูตร ÷ 3,100 · 1 รีม = 500 แผ่น · HIKOTE 260g @ 28.75 บาท/กก. (`fixed:true`, src: คุณกระดาษ 5 ส.ค. 69)
- **All imposition, stability-sweep and slack figures** in this report were computed by me from first principles (floor-division grid, both orientations, 3 mm bleed → +0.6 cm per axis), swept in 1 mm steps over W 74–78 cm × L 105–109 cm. Not taken from Rae's script.
