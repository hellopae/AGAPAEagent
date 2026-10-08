# Dale review: AVEGEE E6 smaller map name labels — PASS

Merge (local, not pushed): `dbca7c0` on `codex-app/2026-10-04` (Codex commit `7df3e05`, base `ef3126f`).

## Diff review
- `src/scene.js` (+10/-5): new `MAP_NAME_SIZE = 8` shared by `bubble()` and new `mapName()`; `label()` gets an optional `outline` param (default 6, so every other caller is unchanged).
- Only the two character-name sites changed to `mapName`: crew names (incl. Nira recovery text, y +13 -> +10) and reinforcement/arrival actor names. `tag()`, camp label, build/repair labels, badge, frontier, room untouched.
- New `tests/e6-name-labels.test.mjs` (4 zones, name size == bubble size, outline scaled).
- Codex `output/` evidence not committed (kept out of the merge).

## Checks
- `node --test tests/*.test.mjs`: 521 tests, 520 pass, 0 fail, 1 skip (existing)
- `node --check src/*.js` ok · `git diff --check` ok
- Worktree and branch `codex/20261008T030159Z-ae1ff2d9` removed. Not pushed.

## Browser (Playwright chromium 1600x900, local server, state seeded through `window.G`)
Images in `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e6/`
- `zone1-map-names-vs-bubble.png` zone 1, Taan and Nira with floating speech: names the same size as the bubble text
- `zone4-reinforcements-left-near-camp.png` zone 4, four reinforcements left of the throne bridge: names small, no overlap with each other or the camp building

Notes: not checked at mobile width. Nira's bubble is partly covered by the existing chat icon (not from E6).
