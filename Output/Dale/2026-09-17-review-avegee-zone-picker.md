# Code review — AVEGEE zone picker + boss art + reveal-timing fix (Toby)

**Reviewer:** Dale · **Repo:** `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`
**Commits reviewed:** `a68fe28` → `32f9d63` → `b5fbacd` → `1b1f375` (all already on `origin/main`)
**Brief:** `Output/Claudy/briefs/2026-09-17-avegee-zone-picker-boss.md`
**Toby's report:** `Output/Toby/2026-09-17-avegee-zone-picker-boss.md`

## Verdict: **PASS** (with one small fix applied by Dale, see below)

---

## 1. Diff of all 4 commits

- `node --check` on every file under `src/*.js` — clean, no syntax errors, before and after my own fix.
- `python3 -m py_compile` equivalent (`ast.parse`) on `scripts/prep-art.py` — clean.
- Manifest audit: wrote a script that walks every path listed in `img/manifest.json` (`zones`, `critical`, `rest`) and confirms a real file exists on disk for each — **0 missing files**.
- Directly-referenced paths not in the manifest (`img/Zone1.webp`…`Zone4.webp`, used by literal string in `ui.js`) — confirmed present on disk (63–73 KB each, as Toby reported).
- Zone 1 regression check: `img/zone-boss.png` (bare key, no `-th` suffix) still resolves correctly — `ZMAP` has no `'th'` entry, so `artUrl('zone-boss')` falls through to `img/zone-boss.png` exactly as before these commits. No regression.

## 2. `zoneBoss.sp` fix in `game.js`

Confirmed the bug and the fix by reading `art.js` (`artUrl`/`zoneStem`) directly:
- Old code: `sp: z.k === 'th' ? 'zone-boss' : \`zone-boss-${z.k}\`` — for non-`th` zones this pre-appended the zone suffix, and `zoneStem()` appended it *again* inside `artUrl()`, producing `zone-boss-west-west` etc. → always a miss → silent fallback to `spirit7.png`.
- New code: `sp: 'zone-boss'` (bare key) for every zone, exactly like the already-correct `hero-boss` key.
- Verified against `img/manifest.json`: `asia` has `zone-boss-asia.png`, `west` has `zone-boss-west.png` — both now resolve correctly with the bare key. `th` has no zone folder and correctly resolves to root `img/zone-boss.png`.
- `cyberhell`'s manifest entry is actually `zone-boss-cyber-cyberhell.png` (an odd pre-existing filename, unrelated to Toby's diff), which would *not* match `zoneStem('zone-boss','cyberhell')` = `zone-boss-cyberhell`. This is **not a regression** and **not in scope** — the brief's acceptance criterion 2 explicitly says "th/asia/west", and zone 4 (`cyberhell`) is not in `ZONES[]` so `startZoneBoss()` can never be reached for it (`zoneDef()` falls back to `ZONES[0]` if the key isn't found). Flagging it here for the record only, no fix needed now.
- `openBossArrive()`'s new `Boss Zone<N>-profile` lookup via `zoneImg()` — confirmed `zoneImg()` returns `null` until the zone-specific manifest key exists and the image has actually loaded (`r.ok`), so zone 1 (`z.k !== 'th'` guard) and zones without a profile image (asia) correctly fall back to the old `Intro-Boss-Zone<N>` / `hero-boss` behavior. No regression to zone 1 or zone 2.

## 3. Island zone picker

Built a headless Playwright smoke test (chromium via the cached `npx playwright` install) that:
1. Loads the real page through `scripts/serve-nocache.py` (no stale ES-module cache).
2. Starts a new game, skips the intro.
3. Unlocks zones via the live `window.G` object (`G.level = 4`, `G.bossCleared = {th:true, asia:true}`) and forces a UI refresh (`#play` click twice, which calls `updatePlay()` — the same function that toggles `#zone`'s `hidden` attribute) so all 4 islands can be tested for real instead of just zone 1.
4. Opens the picker and checks layout + interaction at **360×640**, **390×844**, and **1280×800 desktop**.

Results (after my fix, see below):

| Size | 4 islands visible, no scroll | Zone 4 locked | Switch works |
|---|---|---|---|
| 360×640 | ✅ (`scrollHeight === clientHeight`) | ✅ | ✅ (`asia` → 📍 badge moves) |
| 390×844 | ✅ | ✅ | ✅ |
| 1280×800 | ❌ → fixed → ✅ | ✅ | ✅ |

**Bug found (desktop only):** at 1280×800 the dialog's `scrollHeight` (868px) exceeded its `clientHeight` (766px) by ~100px — the bottom-row island cards were clipped by ~18px and the "อยู่ที่นี่ต่อ" close button was pushed entirely below the visible area, requiring a scroll to reach it. Root cause: `.isle-card img{aspect-ratio:1/1}` at the card's full width (~231px on a 520px-wide dialog) makes the image ~231px tall, and only the `@media(max-width:420px)` block capped image height — nothing capped it on wider/taller screens.

**Fix applied (small, in scope for "fix small things yourself"):** added `max-height:150px` to the base `.isle-card img` rule in `index.html`. The existing mobile media queries (112px, then 92px for short+narrow) still win on mobile because they're declared later in the cascade — verified mobile screenshots are pixel-identical in layout after the change. Re-ran the full Playwright suite: all three sizes now report `fitsNoScroll: true`, and the desktop screenshot shows all 4 islands **and** the close button fully visible with no scroll needed.

**Zone 4 lock — verified two ways:**
- Static: the 4th card's button has no `data-zone` attribute and `disabled` is `true` natively.
- Adversarial: in the same test I force-added `data-zone="cyberhell"` to that button via DOM and called `window.G.moveZone('cyberhell')` directly — it still returns `false`, because `'cyberhell'` is not in `ZONES[]` (only `ZONE4_BOSS_DRAFT`, used for display text only). Two independent layers hold as Toby described.

**Zone switching — verified live:** clicking `data-zone="asia"` calls `moveZone()`, closes the dialog, and `window.G.zone` becomes `'asia'`. Reopening the picker shows the 📍 badge has moved to the new current zone and the old zone now shows "ย้ายไป" instead of "อยู่ที่นี่". Confirmed at all 3 sizes.

## 4. `verdictCard()` filter (reveal-timing fix)

Read the diff and the two call sites directly:
- `openTrial`-adjacent in-progress card (line ~512): always calls `verdictCard(..., false)` — i.e. `closed` is hard-coded `false` for the punishment-in-progress panel. Confirmed the filter (`soul.deeds.filter(d => d.known)`, `soul.merits.filter(m => !m.fake || m.exposed)`) applies whenever `closed` is falsy — so hidden deeds/fake merits are never shown before investigation/power use, no matter how the panel is reached.
- Closed-case card (line ~535): always calls `verdictCard(..., true)` — and this is only reachable from `g.closed`, i.e. cases genuinely already judged. Confirmed `closed=true` shows the full unfiltered set (`soul.deeds`/`soul.merits` with no `.filter()`), so nothing is lost or still hidden once a case is truly closed. This matches the acceptance criterion: hide before, show fully after.
- Confirmed the "ตรงชนิดกรรม/ไม่ตรงชนิดกรรม" tag comparison was also switched to compare against the filtered `shownDeeds` — a real secondary leak Toby caught (a hidden deed happening to match a station's tag would previously have shown "ตรงชนิดกรรม" before the player ever saw that deed).
- Cross-checked `usePower()` and `press()` in `game.js` — confirmed these are the *only* places that set `d.known = true` / `m.exposed = true`, and both are called only from explicit player-triggered button handlers (`ui.js`). `L.reveal` (Rae's hand-written case text) is only ever pushed inside `press()`. Pre-existing code, untouched by this diff, and correct.
- `soul.deserved` / stars bar in the same card: still unfiltered even when `!closed`. Toby flagged this and explicitly did not fix it, correctly scoping it as a UX call (not exploitable — the punishment assignment can't be changed after the fact) rather than a literal `hidden`/`reveal` leak. I agree with leaving this for Claudy/Vera rather than fixing it here — it doesn't display deed text or `L.reveal` content, just a derived number, and the brief's C section is specifically about `hidden`/`reveal` fields.

## 5. Headless smoke test — console errors

Ran the full flow (cover → new game → skip intro → zone picker → switch zones) at all 3 viewport sizes and diffed console output before/after the zone-picker interaction:
- **0 new console errors** introduced by opening/using the zone picker, switching zones, or by the boss-art path fix.
- Pre-existing, unrelated 404s seen on every run regardless of these commits: `img/hero-yama-side.png`, `audio/bgm-title.{ogg,mp3}`, `audio/bgm-zone.{ogg,mp3}` (audio codec-fallback probing missing files — not touched by this diff, not part of scope).
- No `pageerror` events (uncaught exceptions) on any run.

## Files touched by this review

- `/Users/agapae/Documents/Work PAE/Claude/AVEGEE/index.html` — added `max-height:150px` to `.isle-card img` base rule, commit `285d59c`, pushed to `origin/main`.

## Files explicitly left untouched (per Claudy's mid-task warning)

- `img/West/st-dab-west.png`, `img/West/st-krata-west.png` — show as modified in the working tree (Khun Pae replaced them directly, timestamps 18:44/22:30). Not committed, not reverted, not part of my diff — confirmed `git status` still shows them modified after my commit.
- `src/cases-asia.js`, `src/cases.js` — not touched (per the original brief's ban).

## How to verify live

```bash
cd "/Users/agapae/Documents/Work PAE/Claude/AVEGEE"
python3 scripts/serve-nocache.py 8777   # not `python -m http.server` — that caches stale ES modules
open http://localhost:8777/index.html
```
- เริ่มเกมใหม่ → ข้ามบทนำ → กด 🗺️ ย้ายโซน (ปุ่มจะซ่อนอยู่จนกว่าจะมีโซนอื่นเปิดจริง — พฤติกรรมเดิม ไม่ใช่บั๊ก)
- ย่อ/ขยายหน้าต่างเบราว์เซอร์ไปที่ ~360×640, ~390×844 และเดสก์ท็อปเต็มจอ — ควรเห็นครบ 4 เกาะ + ปุ่ม "อยู่ที่นี่ต่อ" โดยไม่ต้องเลื่อนทั้งสามขนาด
- สู้บอสโซน 2/3 (asia/west) — รูปในฉากต่อสู้ควรเป็นบอสจริง ไม่ใช่ผีทั่วไป
- ลากวิญญาณไปส่งสถานีโดยไม่จี้คำให้การก่อน — แผงขวาไม่ควรโชว์ "เรื่องที่สำนวนไม่ได้เขียนไว้"/"บุญปลอม" จนกว่าจะสอบสวน/ใช้พลัง หรือคดีปิดแล้ว

## Rollback

`git revert 285d59c` reverts only the desktop CSS fix. Toby's original 4 commits (`a68fe28`…`1b1f375`) are unrelated and would need separate reverts if ever needed — not recommended, they're all sound per this review.
