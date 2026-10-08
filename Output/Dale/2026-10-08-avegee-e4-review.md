# AVEGEE E4 review (Dale) — PASS

Run `20261008T010224Z-eb74599f` · merged locally on `codex-app/2026-10-04` as `fbf905f` (NOT pushed; base was `7d82107` = origin/main)
Commits: `a0a38f5` (Codex E4 code) · `2afd920` (Dale fix) · `fbf905f` (merge --no-ff). Worktree and branch removed.

## Diff review
- Image keys: `boss-tester` (no zone suffix) for the west deva; `breachApproachActors` strips the zone suffix (`boss-frontier`). OK, no 404s on the map.
- `scene.js` (65 lines): all changes are gated by `rescue`/`frozen` (west only). Zone 2 fire effect untouched.
- `westHypnotized` key kept; cleared old saves are not replayed (test + `zoneEventStatus`); other NPCs/mobs/crew hidden only while the rescue is pending, back after the win.
- Frozen spirits: `westSpiritsFrozen` is true only while `westVampireBreach` is pending/active; thaw shifts transit/slot deadlines by the frozen time, so nothing hangs.
- Valkyrie: 5 Thai lines match the storyboard; battle stats and rewards unchanged (checked against the diff of `ZONE_EVENTS`).
- Save mid-fight for the west deva returns to waiting (battle is not serialized), so it never sticks in `fighting`.

## Bug found in browser and fixed (`2afd920`)
`src/ui.js` `openFrontier`: `westVampireBreach` was not in the list `['frontierBreach','asiaRageBreach']` that routes to `openFrontierWalk`. Arriving at the frontier gate jumped straight to the `frontier-west-intro` cutscene, with no "walk close to the vampire" step even though Codex had added the west actors to `breachApproachActors`. Added the key. Verified: walk scene shows vampire + 2 skeletons, "start fight" appears when close, then the cutscene.

## Tests
`node --test tests/*.test.mjs`: 508 tests, 507 pass, 0 fail, 1 skip (existing cyberhell mask skip) · E4 file 8/8 · `node --check src/*.js` ok · `git diff --check` ok. Same numbers after the merge.

## Browser (Playwright chromium, local no-cache server, saves seeded through the game API)
Images in `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e4/` (1600 px wide)
- a-west-arrival-rescue: only Taan, merchant, 2 skeletons, werewolf on the left; sign "เดินเข้าไปช่วยทัณฑ์และพ่อค้านรก"
- b-rescue-battle: battle started by walking close, team = yama + Taan vs skeleton x2 + werewolf
- c-spirits-frozen: after case 3, "!!!" over every queued spirit, `tick` drift 0 after 4 s, frontier marker on the gate
- d0 / d-frontier-walk-near-vampire / d2-frontier-west-intro-cutscene: walk scene, "start fight" button next to the vampire, cutscene
- e0-deva-running-in / e-deva-intro-west-cutscene / f-valkyrie-waiting: valkyrie runs up the stairs, `deva-intro-west-v1` with the 5 lines, then she stands at the right courtyard with the "ทดสอบฝีมือ" sign

Not checked: mobile width, a real played run from a fresh save (saves were seeded), the wave fights and the valkyrie battle in the browser (covered by node tests only). Audio 404s (`bgm-*.ogg`) and `hero-yama-side.png` 404 are old and not from E4.

## Roll back
`cd AVEGEE && git reset --hard 7d82107` on `codex-app/2026-10-04` (nothing pushed).
