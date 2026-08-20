# Marketing Avatar — Asset Spec + Tooling Limitation Report
**Date:** 2026-08-20 · **Owner:** Mind (visual design) · **Requested by:** Claudy (SOP-09 step 4, agent onboarding for `marketing`)
**[skip-factcheck]** — pure visual/asset spec, no factual claims.

---

## 0. Bottom line up front

**I cannot produce the actual `avatars/Marketing.png` raster file in this session.** My toolset here is `Read`, `Write`, `WebSearch`, `Skill` — no image-generation tool or MCP is available to me. `artifact-design` (Claude Design / the `design` skill) only outputs self-contained **HTML artifacts** (artboards, mockups, layouts) — it does not render a raster anime-character PNG. Producing this specific file needs a **text-to-image generative model** (e.g. an image-gen tool/MCP, or Kittanate running one externally), which is outside what I can call right now.

I did **not** fabricate a placeholder or fake image. Below is the completed Asset Spec (Step 0 inventory done, style locked, palette, prompt ready) so that whoever runs the actual image generation — Kittanate via an external tool, or Dale if/when an image-gen API is wired into the studio — can produce the file with zero follow-up questions and it will drop straight into `avatars/Marketing.png` matching the rest of the set.

**Recommended path:** Kittanate generates the image using the exact prompt in §4 via an external image-gen tool (ChatGPT/DALL·E, Midjourney, Google Gemini "Nano Banana" image, etc.), crops/exports it to **768×1376 px PNG RGBA**, and saves it to `avatars/Marketing.png`. Alternatively, ask Claudy to route "Marketing needs an image-gen MCP" to Dale as a one-time infra task if the studio wants this automatable going forward.

---

## 1. Step 0 — Asset inventory (done)

Read all relevant existing avatars in `avatars/` to lock character design, proportions, and background tone before writing this spec: `Claudy.png`, `Chris.png`, `Nick.png`, `Reese.png`, `Vera.png`, `Minnie.png`, `Rae.png`, `Dale.png`. (`Mind.png`, `Libby.png`, `Toby.png`, `News.png` exist in the same folder but were not individually re-inspected — the 8 reviewed already establish a consistent, repeatable system.)

**Confirmed set-wide conventions (must match):**
- **Canvas:** 768×1376 px, portrait, PNG with alpha channel (RGBA) — not transparent background in practice (every existing avatar has a fully illustrated scene), but exported as RGBA per the existing files.
- **Crop:** waist-up (occasionally mid-thigh), centered, character fills roughly 55–75% of frame height, standing in a personal workspace.
- **Rendering style:** semi-detailed anime/game-illustration (cel-shaded line art + soft painterly shading, not flat-color chibi, not photorealistic). Clean confident linework, moderate line weight (thicker on outer silhouette, thinner on interior details), soft ambient-occlusion shading rather than hard cel blocks.
- **Identity marker:** an ID badge/lanyard or desk nameplate with the agent's name visible in caps (`CLAUDY`, `REESE`, `RAE`, `VERA`...) — this is a hard consistency requirement, not decorative.
- **Prop in hand:** each character holds/interacts with one object tied to their function — Claudy: tablet+stylus; Nick: tablet with charts + laptop with dashboards behind; Vera: stylus + tablet with UI wireframes; Rae: laptop, papers with copy; Reese: pen at keyboard, corkboard of research notes; Dale: keyboard, terminal/CI-CD screens.
- **Background:** consistent studio-office environment — desk, window with city skyline or soft daylight, a whiteboard/corkboard/monitor behind the character showing role-relevant content (charts, wireframes, code, sticky notes). Warm-neutral to cool-neutral office lighting, never saturated/fantasy backgrounds.
- **Wardrobe:** smart-casual to business-casual (blazer, cardigan, or knit sweater over collared shirt), no uniforms beyond the ID badge — signals professional but approachable.
- **No Buddhist/religious iconography** on any agent avatar in the set — none needed here either.

---

## 2. Asset list

| Element | Purpose | Notes |
|---|---|---|
| `avatars/Marketing.png` | Team roster avatar for agent `marketing` — used in dashboard, status.json agent cards, docs | Single asset, no variants needed (matches existing 1-file-per-agent pattern) |

---

## 3. Style direction

**Character concept:** Marketing (นักกลยุทธ์การตลาด) — confident but careful strategist. Persona line to visually express: *"สังเคราะห์ข้อมูลเป็นแผน ไม่ฟันธงถ้าไม่มีหลักฐานรองรับ"* (synthesizes evidence into a plan; doesn't assert without evidence). This should read as **more grounded/measured than Minnie's excitable ideation energy, and more outward-facing/decisive than Reese's quiet research focus** — Marketing sits between "confident presenter" and "evidence-checking analyst."

- **Pose:** standing at a whiteboard or presentation board, mid-gesture — one hand holding a marker/pointer or presenting toward a strategy board, the other hand may hold a tablet or clipboard with a campaign plan. Body angled ~3/4 toward camera (matches Vera/Nick framing), warm confident half-smile, direct eye contact — not overly aggressive "salesperson" energy; keep it thoughtful, not hype-y, per the "does not overclaim" persona.
- **Line weight:** match Vera/Nick — clean medium-weight outer contour, finer interior linework, soft cel-shading with 2–3 shading levels (not flat, not hyper-realistic).
- **Level of detail:** same as Nick/Vera tier (moderately detailed background screens/board content legible at thumbnail size, not overly busy).
- **Wardrobe:** business-casual blazer or structured cardigan in a colour distinct from the existing roster (see palette below) over a plain collared shirt or knit top; ID lanyard or desk nameplate reading **"MARKETING"** in the same sans-serif caps style used on Claudy/Vera/Rae/Reese badges.
- **Gender presentation:** not specified by Claudy/agent file — current roster is roughly balanced (Claudy, Chris, Nick, Dale read male; Reese, Vera, Rae read female; Minnie androgynous-leaning-female). Recommend a **female presentation** to keep the set balanced, but this is a free design choice for Kittanate to override — flag it as an assumption, not a requirement.
- **Background board content (fill with actual strategy-artifact style items, legible but secondary):**
  - A whiteboard/pinboard with: a simple **channel-mix pie or bar chart**, a short **campaign priority list** (numbered, e.g. "1. Loy Krathong templates 2. Instagram ads 3. Email"), a **funnel diagram** (Awareness → Consideration → Conversion), and a small sticky-note cluster labeled things like "Evidence?" / "Confirm w/ Nick" / "Reese data" — this visually encodes "synthesizes Reese + Nick, doesn't invent numbers."
  - A laptop or second monitor showing a simple campaign calendar/timeline (rows of weeks/months, colored blocks) — echoes Nick's dashboard-screen device without duplicating his exact charts.
- **Framing/lighting:** same soft daylight-through-window + warm interior office lighting as Claudy/Vera/Rae/Reese — keep colour temperature consistent so the roster reads as one lit set, not mismatched renders.

---

## 4. Color palette (screen asset — hex)

| Role | Hex | Usage |
|---|---|---|
| Dominant (wardrobe) | `#B85C38` (warm terracotta/rust blazer) or `#3E5C76` (muted slate blue) — pick one, not both | Distinct from Claudy's navy, Vera's green, Rae's forest green, Reese's blue-grey — keeps each agent instantly identifiable by silhouette color alone |
| Accent (board/chart highlights) | `#4A7C59` (chart green, "growth"), `#E8A33D` (chart amber, "priority flag") | Matches the warm-but-professional chart-color language already used in Nick's screens |
| Background — walls/desk | `#EDE6DA` warm neutral / `#D9DEE3` cool neutral (match whichever base the rest of the set leans — existing avatars alternate between warm beige (Chris, Minnie) and cool grey-blue (Claudy, Vera, Rae) offices) | Keep secondary to the character; do not compete with wardrobe accent |
| ID badge text | `#1A1A1A` on `#FFFFFF` badge | Matches high-contrast badge style on Claudy/Vera/Rae/Reese — never light-on-light, must stay legible at avatar-thumbnail size |

No print CMYK needed — this is a screen-only avatar (dashboard/status.json use). No cultural color-clash risk (no mourning-color combinations relevant to a business-casual office portrait).

---

## 5. Typography

- Badge/nameplate text: same clean sans-serif caps used across the existing set (visible on Claudy, Vera, Rae, Reese badges) — render "MARKETING" in that same face/weight for set consistency. No Thai text required on this specific asset (the badges in the existing set are in English/Latin caps even for Thai-named personas), so no Thai-rendering risk here.

---

## 6. Production notes

- **Canvas:** exactly **768 × 1376 px**, PNG, RGBA channel present (match existing files byte-for-byte in dimensions — verify with an image inspector before saving, do not eyeball-crop).
- **File name/path:** `avatars/Marketing.png` (case-sensitive, matches `Claudy.png` / `Reese.png` capitalization convention — capitalize first letter only).
- **No transparency needed in practice** — background should be a fully rendered scene like every other avatar in the set, not a cutout.
- **No bleed/trim margin** — this is a screen asset, not a print piece, so SOP-10 §2 print-margin rules don't apply here.
- Before marking done: place the new file next to 2–3 existing avatars and eyeball-compare line weight, lighting temperature, and badge style for drift.

---

## 7. Ready-to-use generation prompt (for external image-gen tool)

```
Vertical portrait illustration, 768x1376px aspect ratio, anime/game-illustration
style (clean cel-shaded linework with soft painterly shading, semi-detailed,
NOT flat chibi, NOT photorealistic).

Subject: a confident, approachable young Southeast Asian woman in her late 20s,
business-casual marketing strategist, standing at 3/4 angle toward camera in a
modern office. She wears a structured terracotta/rust-colored blazer over a
plain white collared shirt, with an ID lanyard reading "MARKETING" in bold
sans-serif caps on a white badge. She has a warm, thoughtful half-smile and
direct eye contact -- confident but not salesy or over-the-top.

Pose: standing beside a whiteboard, one hand holding a marker/pointer toward a
strategy board, the other hand holding a tablet showing a simple campaign
calendar/timeline.

Background: softly lit office with a large window (daylight, soft warm-cool
neutral tone), a whiteboard/corkboard behind her showing: a small pie or bar
chart in green (#4A7C59) and amber (#E8A33D), a numbered campaign-priority list,
a simple 3-stage funnel diagram (Awareness -> Consideration -> Conversion), and
a few sticky notes reading things like "confirm w/ data" and "evidence?" --
legible but secondary to the character. A second monitor or laptop nearby shows
a colored calendar/timeline grid.

Color palette: dominant warm terracotta (#B85C38) blazer, green/amber chart
accents, warm neutral beige or cool grey-blue office walls (match a modern
consistent studio-office look), high-contrast black-on-white ID badge text.

Style reference: same illustration system as a matched set of business-casual
anime-style character portraits (confident young professionals, waist-up crop,
consistent line weight and soft cel-shading, warm studio office lighting,
role-relevant screens/whiteboards in the background, ID badge with name in
caps). Keep line weight and shading style consistent with that reference set
-- do not add fantasy elements, religious imagery, or unrelated iconography.

Crop: waist-up, character fills ~60-70% of frame height, centered.
No text watermark, no signature.
```

---

## 8. What Claudy/Kittanate need to do next

1. Run the prompt in §4/§7 through an external image-gen tool (or ask Dale to wire an image-gen MCP into the studio if this should be reusable for future agents).
2. Export/crop to exactly 768×1376 px PNG RGBA.
3. Save as `avatars/Marketing.png`.
4. Ping Mind to do a quick side-by-side consistency check against `Chris.png`/`Vera.png`/`Nick.png` (line weight, lighting, badge style) before marking SOP-09 step 4 fully done.

No further design decisions are needed from Mind once the image is generated — this spec is complete enough that production can proceed without follow-up questions, per SOP-10 §4.
