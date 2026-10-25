# A5 — Authority comment for every verdict

Base2f70581. Main implementation68bf271, final cache compatibilityaefbdaa. Branchcodex/2026-10-25-verdict-comments. Root cause: P3 only built a scene for five stars and red scores below50. Scores50–89 and non-red over-punishment fell back to the old map bubble.

Added ordinary saved reviews by the current zone authority using the existing praise/scold art. Copy follows the final boss grade; non-red over-punishment receives a critical review with no new red escalation. The scene reports the actual reason. Four-star+25 and five-star+60/karma/healing still happen only in applyVerdict. No grade formulas, award amounts or punishment rules change.

Explicit scene flag keeps showVerdict quiet even after its scene has been consumed. Opening consumes the matching pending badge and scene before saving. Restore discards stale in-memory map feedback; saved scene persists until consumed. No old ledger entry is replayed.

Validation: targeted31/31 (11newA5+20existingP3/UI), real assign at18grade boundaries in all4zones, ordinary save/reload, critical high-score over-punishment, red warning effects, consumed scene skip/reload and stale dismissal suppression. Initial full run exposed2strict old cache regex expectations: preserved P8 suffix ending, updated P9 assertion to allow appended versions while retaining all regional PNG checks; cache17/17. Final full results recorded in validation-final; initial result retained for audit.

Browser: deterministic judge stub returns requested score, while production doVerdict/assign/applyVerdict/dialog/renderers run unchanged. Saves disabled. Before uses exact ui/game/verdict-scene baseline2f70581; after current source. No QA files are in game repo. This checks feedback/queue/effect presentation, not natural grading from interrogation answers. Zone4 fixture does not unlock that map. Owner visual acceptance pending.

Zone2before80points: map score/bubble, no scene. After: authority scene, four stars, actual reason,+25; no old bubble after skip, coin100425/HP120 unchanged. Desktop1280x720 and mobile390x844 inspected; regional art/text/skip fit screen.

Raw browser histories retain casesDone0 samples while the next fixture resets/preloads; summary validates only completed real-assign casesDone1 samples. Six cases all show scene/no bubble, consistent coin/HP. Red2 scene→warning→close keeps HP85; five-star skip keeps coin100460/HP124. Final critical stat color verified red even at raw95. All console reads empty.

Final537ca13 critical-stat color, targeted31/31 and finalfull1511/1511,syntax132; publishedbfc54da78cd416208644be9e8100e6202d2840d1,Pagesexact/live4/4. No QA controls deployed.
