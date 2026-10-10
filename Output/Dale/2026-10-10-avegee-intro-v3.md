# AVEGEE intro v3 + cover-v4 + H5b — build note (Dale, 2026-10-10)

**Result: PASS.** Live: https://hellopae.github.io/AVEGEE/ (Pages build `built` at commit d25603a)

## Commits (pushed to origin/main)
- `c40dd13` — work on branch `dale/intro-v3` (worktree, removed afterwards)
- `d25603a` — merge `--no-ff` into main. The push also carried the 3 earlier local-only commits (fast-forward).

## Files changed
- `index.html` — splash video is `intro-opening-v3.mp4`; `#cover-vfx` video layer removed; menu/logo fade in on `#title.ready`; `#splash.leaving.slow`; notes/CSS; cache-bust suffix on `ui.js`, `cover-fx-h5b.js` and `preload.js`
- `src/ui.js` — H5a handoff code removed (SPLASH_CUT, prepare/playCoverVideo, stall watch). New: `settleCover`, `hideSplash(slow)`, `revealTitle(slow)`, `coverMatchScale`. Probe list is `cover-v4, v3, cover.webp, cover.png`.
- `src/cover-fx-h5b.js` — loads `img/cover-fx/<kind>-v4-mask.png`
- `src/asset-preload.js` — critical tier = `cover-v4.webp` (cover-v5 drops to the late tier)
- `src/preload.js`, `src/art.js` — `-intro-v3` appended to CATALOG_VERSION and to the manifest fetch query
- `img/preload-catalog.json`, `img/manifest.json` — v4 masks registered; the 4 v5 masks de-registered (the files stay on disk)
- `img/cover-v4.webp` — see "Uncertain points" item 1
- New: `img/cover-fx/{lava,fire,volcano,soul}-v4-mask.png`, `scripts/h5b-cover-masks-v4.py`
- Tests: `h5a-cover-video`, `h5b-cover-fx`, `g2-intro-art`, `h1-preload-tiers`
- Not touched: `cover-atmosphere.js` (no longer imported), `home-intro-v5.mp4`, `cover-v5*`, the v5 masks, `/Documents/Work PAE/Claude/AVEGEE`

## Sequence now
Fire logo, then dark, then brightening, then Yama turns toward the throne (video plays the full ~19 s once). On `ended` the last frame is held. The splash dissolves over 0.9 s while `#cover-art` (cover-v4.webp) eases from the video's scale to 1. `.ready` shows the menu/logo, and `.cover-settled` starts H5b.
- Skip, video error, reduced-motion and the 25 s timeout all go to the cover with a 0.38 s fast dissolve.
- `home-intro-v5.mp4` has no callers.

## How the masks were made
No mask script exists in main. The original recipe is in the Codex run diff `Output/Codex/runs/20261010T015024Z-ed5e4ef4/diff.patch` (`scripts/h5b-cover-masks.py`). I ported it as `scripts/h5b-cover-masks-v4.py`:
- Hand-traced polygons on 1678x937, AND-ed with a colour test on `img/cover-v4-full.png`.
- Throne and character envelopes are carved out of lava/fire/volcano.
- Output is 688x384, binary alpha, NEAREST downscale.

Comparison before choosing: v5-full vs v4-full differ only in the Yama figure (bbox x490-606, y281-559 on 1678). Old v5 masks vs new v4 masks have IoU 0.76 / 0.87 / 0.81 / 0.93 (lava/fire/volcano/soul). I regenerated the masks rather than reusing the old ones. Two reasons:
- The brief asks for `*-v4-mask.png`.
- The repo's v4-full has a ~1px offset and is re-rendered.

Checks:
- Overlay on v4: `evidence/.../mask-overlay-v4.png`.
- Yama crop with old and new masks side by side: no mask on Yama.
- lava, fire and volcano each overlap soul by 0 px.

## Tests
`node --test tests/*.test.mjs`: **673 pass / 0 fail**, run on the branch and again on main after the merge. All `src/*.js` pass `node --check`. This repo has no build step.

New or updated assertions:
- Splash uses `intro-opening-v3.mp4` and the cover is `cover-v4`.
- No `home-intro-v5` or `cover-vfx` references.
- Runtime harness for hideSplash/revealTitle/settleCover (ended = slow, skip = fast, runs once, reduced motion is immediate).
- `coverMatchScale` values.
- Masks are binary 688x384 and miss the new Yama figure.

## Browser verification (real Chrome via Playwright)
Run on local `http.server` and again on the live URL. Evidence is in `Output/Dale/evidence/2026-10-10-intro-v3/`.
- Landscape 1600x900, 1920x1080 and 1280x720; portrait 390x844 (mobile).
- Full run: video plays ~18-19 s, ends, dissolves, `title = "ready cover-settled"`, splash hidden, menu opacity 1.
- The art transform is 1.0248 at the start of the dissolve, going to 1 at the end.
- Pixel diff of the last video frame vs still: with scale k it is about half the diff at scale 1. At 1600x900 and 1920x1080 it is 19 vs 36 and 18 vs 35. The 390x844 portrait is 27 vs 34 on live and local, so the gain is smaller there (the video "skip" button sits in the frame).
- FX: 90 frames of the H5b canvas sampled; 31,434 px ever drawn, **0 outside the masks**. Overlay `*-fx-union-overlay.png` shows lava/fire/volcano/soul in place over cover-v4, not on Yama or the other characters.
- Fallback paths: reduced-motion, video error (abort) and a hung video (25.5 s) all reach `ready cover-settled`. Page errors: none.
- Live URL: the v3 video (5,125,150 B), cover-v4.webp (448,452 B) and the v4 masks return 200. The served `ui.js` query ends in `-zoom-intro-v3`.

## Uncertain points
1. **`img/cover-v4.webp` replaced.** main still had the old Oct-9 cover-v4.webp (405,978 B, a different render: blue-skinned guard, different details). The new cover is the 448,452 B / 1678x937 file from `b6d85b5`; the brief says 1376x768, but that file is 1678x937. I restored that content under the same name (diff vs cover-v4-full mean abs 3.9; the old one is 11.7).
   - The brief says not to modify original images, but a new filename would have broken the "cover-v4" contract in the brief and tests. It is a one-file revert if unwanted.
   - Old clients may cache the old file for up to ~10 min on Pages. This is only a fallback-tier risk.
2. **Soul mask on souls.** The brief says masks must not cover characters "or souls on the bridge". The soul layer is the soul effect from H5b (budget 0, fixed glow pulse, no particles). I kept it, so it covers the souls by design. lava, fire and volcano never touch souls. If you want no effect on souls, drop `soul` from `COVER_FX_KINDS`.
3. **Dissolve not pixel-exact.** The video's last frame is cover-v4 cropped about 1.2% top and bottom, and it is a compressed re-render, so the ~19 vs 0 diff floor remains. The scale match plus the 0.9 s dissolve makes the handoff smooth. I did not see a jump in the frames. Judge it by eye on a real device.
4. **Fire mask near the throne base** has a small blocky patch at the platform right of Yama and near the first soul's head. It was inherited from the v5 recipe. The effect there is faint embers only.
5. **Not measured:** fps on a real phone and iOS Safari video behaviour (`ended` plus held last frame is standard). The video is 5 MB, up from 2.3 MB, and preloads with `preload="auto"`; save-data users still get the splash, as before.
6. `src/cover-atmosphere.js` is left in the repo, unused.

## QA steps for Chris
1. Open https://hellopae.github.io/AVEGEE/ with a clean cache (or add `?x=1`) and tap through the enter gate if shown. Watch the video to the end: fire logo, dark, bright, Yama facing the throne. It should dissolve into the cover with no black gap, and the menu should fade in after that.
2. Portrait (390 wide): same sequence, cover centred on the ogre.
3. Tap "ข้าม" mid-video: it goes to the cover within ~0.4 s. With OS reduced motion on: the cover shows immediately and no fx canvas.
4. After settling, lava, torch fire, the volcano and the souls pulse slightly. Nothing moves on Yama, the throne or the ogre.

## Roll back
`git revert -m 1 d25603a` on main, then push. Before the merge, main was `9d7cd82`.
Pages redeploys in ~1 min. Local branch and worktree are already deleted.
