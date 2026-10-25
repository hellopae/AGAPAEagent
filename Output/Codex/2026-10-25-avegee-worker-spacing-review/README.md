# A4 — Worker/soul spacing review

Owner request: 12.png, worker and delivered soul occupy the same position in zone 2; fix every zone. Base 542b7d1. Final implementation 2f78bd0, branch codex/2026-10-25-worker-spacing.

Fix: worker-specific pickup/escort/handoff path. Pickup clearance 40 world units; handoff >=72 from the soul endpoint and >=48 from other worker reservations / queued feet. Lateral handoff candidates preferred. Narrow corridors can use a following formation after a safe pickup from behind. Soul path/travel interval stays unchanged. Existing masks and disabled-zone approvals are untouched. Legacy releases select valid floor; matching-job guard prevents duplicate release.

Self-check: 23 targeted tests cover 4 zones × arrival/prison/gate/queue, sampled floor/clearance, simultaneous handoffs, cancellation, legacy release, no safe floor, restored gate delivery twice, west frozen save/resume. Final full results are in validation-final (all test files once, worker atlas checks isolated); validation-initial records the first full run before the lateral preference adjustment.

Browser fixture uses actual game imports, real startAfterlifeWalk/advanceAfterlife completion and production native map renderer. It disables save and onChange callbacks, creates a temporary hired worker/soul, settles the journey immediately and pauses the final state. Before server overrides workers.js/escort.js with exact base 542b7d1; after uses final source. QA scripts stay outside game repo and are not deployed. This verifies final native map placement, not naturally timed traversal or owner visual approval. Zone 4 is exercised only in this fixture, not unlocked in the live game.

Zone 2 before: gap 0, both [1856,1100]. After: gap 80, worker [1931.6549,1073.9936], soul [1856,1100], valid floor, ledger 1, one queued soul. Some existing foliage still occludes actors; tree placement/blending remains in the separate map-art queue. Screenshots have identical camera position. No render/console errors observed.

Codex self-check only; owner visual acceptance remains pending. Main/Pages/live verification is recorded separately after publication.

All four native end-state fixtures: gap 80, valid floor, one delivery ledger entry, one queued soul; no console errors. Mobile390x844 inspected; existing zone4 world labels are oversized at zoom, outside A4 scope and not a UI acceptance claim.

Published main 2f705814218ae1ef824c51e324661a4b3b74a775; tested2f78bd0 tree identical; final full1500/1500, syntax132. Pages built exact SHA and live4/4 byte-match. See live-verification.json.
