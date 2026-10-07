# AVEGEE E3 review (Dale) — 2026-10-08

Result: PASS after 3 small fixes by Dale. Merged **local only**, not pushed (owner approval pending for E1+E2+E3).

- Repo: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · branch `codex-app/2026-10-04` · HEAD `120e952` (7 ahead of origin)
- Commits: `a7570f8` (E3 code, from run 20261007T192835Z-e1bd7a13) → merge `1036ef2` → Dale fixes `120e952`
- Merge on top of E1+E2 (`88e4702`): no conflicts (E1 and E3 both touch `src/data.js`, auto-merged)

## Review findings
- Changed existing tests reflect the new real ordering, not loosened criteria (30a, event-progression, story-art, trial-destinations29c fixture, ui27d helper).
- Event keys, HP/ATK/rewards unchanged (only `asiaPrisonFire` trigger changed `afterFirstKill` -> `afterKills:2` + `arrival`, as specified).
- Old saves: `devaVisits` defaults to `{}`; cleared events never replay; legacy active fire restarts (covered by test).
- Case 5 th: `monk` key kept but the content was REPLACED (old fraud-abbot story deleted from `src/cases.js`, still in git history, commit `53a57fd`). Storyboard says "adjust case 5 into a sleeping monk who never sinned" so accepted; decision for Claudy/owner if the abbot story should come back under a new key.

## Dale fixes (found in browser, node tests could not catch)
1. `src/deva-map.js`: sprite key `boss-tester-asia` resolved to `img/boss-tester-asia.png` (404) so the deva never showed on the map. Now th uses `boss-tester-th`, other zones use `boss-tester` (zone suffix is added by `artUrl`).
2. `src/breach-approach.js`: same bug for asia frontier boss (`boss-frontier-asia` showed as an emoji mask). Suffix stripped for non-th.
3. `src/scene.js`: burning prison drew 15 big fireballs in one horizontal band hiding the building. Now 6 clusters (base, mid, roof), same `drawFire`.

## Tests
`node --test tests/*.test.mjs`: 499 tests, 498 pass, 0 fail, 1 skip (pre-existing E2 cyberhell mask skip) · E3 file 9/9 · `node --check src/*.js` ok (53 files) · `git diff --check` ok

## Browser check (Playwright chromium, local `python3 -m http.server`, saves built via game API)
Images in `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e3/`
- 1 / 1b: th case 5 judged right (praise) and wrong (warning) -> `deva-intro-th-v1` cutscene with different lines -> `devaTest` battle starts
- 2 / 2b: asia fire on prison building
- 3: deva descending from top edge (a, b)
- 4 / 4b: deva standing, "ทดสอบฝีมือ" sign; clicking the sign opens the test alert
- 5 / 6: th and asia breach: boss + mobs standing on frontier map -> walk near -> start -> `frontier-th-intro` / `frontier-asia-intro` cutscene
- Not checked: mobile width, full real-play flow from fresh save (saves were seeded), wave fights after intro (existing code, unchanged)

## Deva Map Actors (for E4)
`src/deva-map.js`: register a zone in `DEVA_MAP[zone] = { key, prerequisite, x, y }` · `devaMapActors(g, now)` returns actors (`id deva:<zone>`, `art`, `enabled`, `label`) · save field `g.devaVisits[zone] = { phase: descending|intro|waiting|fighting, battle? }` · `mapInteractions`/`hitActor`/`standPoints` use kind `devaEncounter` · `openDevaEncounter(key)` in `ui.js` (proximity check, then event alert). Choreography helpers `finishDevaDescent`/`completeDevaArrival` are asia-specific. Sprite key rule: th `boss-tester-th`, other zones `boss-tester`. `src/breach-approach.js` gives display-only actors for frontier approach (th/asia).

## Roll back
Nothing pushed. Local: `git reset --hard 88e4702` on `codex-app/2026-10-04` (back to E1+E2). Worktree/branch E3 removed (commit `a7570f8` still reachable from HEAD).
