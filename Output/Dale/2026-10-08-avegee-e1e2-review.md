# Dale review: AVEGEE E1 + E2 (8 Oct 2026)

Result: code review PASS, merged locally. Push to origin NOT done (blocked by the permission classifier).

## Merge (local, branch codex-app/2026-10-04, base d754481)
- 3aba531 E1 commit, merge 9750b5b
- 57d944b E2 commit, merge 88e4702 (HEAD)
- Not pushed. Local is ahead of origin/main and origin/codex-app/2026-10-04 by 4 commits.
- Command to run once approved: `git push --atomic origin HEAD:main HEAD:codex-app/2026-10-04` in /Users/agapae/Documents/Work PAE/Claude/AVEGEE
- Pages build check is pending until the push.

## Tests on the merged result
- `node --test tests/*.test.mjs`: 490 tests, 489 pass, 0 fail, 1 skip (the cyberhell source-mask check, intentional: the draft has no approved source)
- `node --check src/*.js`: OK
- `git diff --check`: OK

## Review notes
E1
- Existing tests were changed because the flip table and krajok geometry changed. The new expected values match `STATION_FLIP` and the new krajok geometry. No assertions were removed, and the checks for zone round-trips, no accumulated offsets, and the old 30F geometry on the other 3 buildings are intact.
- I verified Codex's claim about the old orientations. The v5 renderer only honoured west/tarang, while lokan and tea used the legacy `def.flip`. So the 8 toggles are real. West sala stays unflipped, as before.
- krajok in zone 4 is 1.3x larger and 200 units to the right. In the preview it does not overlap the NPCs or the dock.

E2
- The `tests/frontier-navigation.test.mjs` start point moved from [.15,.32] to [.145,.265]. This is legitimate: the owner's paint marks the old point red (inside the tower). The obstacle and detour assertions are unchanged, and a walkable-start assertion was added.
- Raw mismatch is th 2.878%, asia 1.140%, west 2.832%, all under 3%.
- The cyberhell polygon is merged with the comment "awaiting approval" kept.
- Gap: the event enemy and boss positions could not be verified, because `ZONE_EVENTS` has no world x/y. The Codex report states this. It needs the event placement work (E3 onwards) before it can be checked.

## One deviation from the brief
`tests/e2-frontier-nav.test.mjs` reads `output/Codex/e2-preview/extraction-metrics.json`. That file would not exist on a clean checkout, so the test would fail. I force-added this one 2.8 KB JSON file. All other output/ files are uncommitted, as the brief asked. The Exam/ files were not touched.

## Cleanup
- Worktrees and branches for E1 and E2 are removed.
- The E3 worktree (codex/20261007T192835Z-e1bd7a13) was not touched.

## Previews (<=1600 px) in /Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Dale/2026-10-08-avegee-e1e2/
- e1-th.png, e1-asia.png, e1-west.png, e1-cyberhell.png
- frontier-overview.png
- Map-Zone4-frontier-mask-draft.png (awaiting the owner's approval)
- codex-report-e1.md, codex-report-e2.md (copies of the Codex reports)
