# AVEGEE E5 review (Dale) — PASS

Run `20261008T012107Z-dd11699d` · merged locally on `codex-app/2026-10-04`, NOT pushed
Commits: `d99aa43` (Codex E5 code, committed by Dale from the worktree's staged changes; `output/` not committed) · `a7dac66` (merge --no-ff) · `ef3126f` (Dale fix). Worktree and branch E5 removed.
Roll back: `cd AVEGEE && git reset --hard fbf905f` (nothing pushed).

## Diff review
- `final-event.js` migration: v1 saves of every phase load; orphan battle becomes a map retry; `reward` with no pendingReward steps back; `ending` becomes `completed`; presentation flags derive from storySeen; ledger kept so no double reward (covered by the E5 test and read through).
- Cutscene order in the browser: `cyberhell-01-v2` -> reinforcements-01 -> reinforcements-02 -> `cyberhell-02-v3` -> `cyberhell-03-v4` -> ending-01-v4 -> ending-02-v3. No repeats, none skipped (the duplicate `cyberhell-02-v3` in `cyber-approach` was removed). Team-incomplete warning (B9) untouched.
- Reinforcements: four different sprites (crew-plerng, crew-dam, crew-boon, crew-guard via `sourceZone`), standing left of Yama.
- Image keys follow the `boss-tester` rule (`boss-tester` + zone suffix by the resolver). No 404 for E5 assets.
- `src/data.js` not touched, so balance, rewards and event keys are unchanged. Lightning is thin side bolts plus a ground ring; warp is two ground rings; neither covers the building or the main characters.

## Bug found in the browser and fixed (`ef3126f`)
On arrival in zone 4 Yama walks to the throne spot (880,455) and Lumen stands at (880,480), so Yama stood on top of him and only Yama was visible. Fix in `src/game.js` (`completeStory`): after the `deva-cyberhell` intro, if Yama is within 90 px of Lumen he is moved to the stairs below. Test line added to `tests/e5-events-z4.test.mjs`. Verified: Lumen visible beside the throne, Yama on the stairs.

## Tests
`node --test tests/*.test.mjs`: 517 tests, 516 pass, 0 fail, 1 skip (existing cyberhell source-mask skip) · E5 file 9/9 · `node --check src/*.js` ok · `git diff --check` ok. Same after the fix.

## Browser (Playwright chromium 1600x900, local no-cache server, saves seeded through `window.G`, battles started and won through the game API)
Images: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e5/`
- a: `a1` deva-intro-cyberhell cutscene (3 lines) · `a2`/`a3` arrival map, Taan and merchant caged with lightning, Lumen at the throne · `b-after-win-captives-released` lightning gone, both out
- c: `c0` breach alert · `c1`/`c2` frontier walk with Trojan-9, "start fight" appears when close · `c3` `frontier-cyberhell-intro` cutscene
- d: `d0-warp-900ms` army and boss warping in · `d1` story 01-v2 · `d2` prepare window with 3 walk buttons + close · `d3` map after closing
- e: `e1` reinforcements-01 · `e2` map with 4 reinforcements on the left and "ดูเหตุการณ์ต่อ" button · `e3` reinforcements-02
- f: `e3-...control-p2` story 02-v3 · `f2` prepare window · `f3` boss + 4 chiefs on the right
- g: `g1` story 03-v4 · `g2` prepare window · `g3` Yama facing the boss
- h: `h1-...ending-p1/p2` ending-01-v4 and ending-02-v3 · `h3` after ending

## Not checked / notes
- Mobile width, the walk-to-merchant/Nira/tea buttons in the browser (covered by node tests only), real battle UI clicks for the finale (battles won via API; the Lumen battle screen was opened through the real UI).
- Reinforcement labels overlap the tea-camp label on the left (positions come from the existing `FINAL_EVENT.reinforcementPositions`). Cosmetic, left as is.
- The boss sprite on the map looks dithered and small (same `zone-boss` art key as before E5, not a regression).
- Old 404s (`hero-yama-side.png`, `bgm-*.ogg`) are not from E5.
