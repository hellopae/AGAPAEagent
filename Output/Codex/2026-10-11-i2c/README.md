# I2-C — implementation and verification evidence

Base: main b3b69ef1956ebc17c6e4bbe1bc46bd006eca85e6
Branch: codex/20261011T043019Z-a4b674b3 (existing isolated worktree)
No commit, merge, push, deployment, hooks, status.json or worklog.json changes.

Production changes:
- `src/ui.js`: shared item panel and handlers for event alerts and battle preparation. Tea / medicine / holy water always appear as square picture buttons with `x N`. Owned higher-tier consumables remain available. Empty/unusable items are disabled. The fill button calls existing medicine methods repeatedly until HP is full or HP supplies are depleted; existing item recovery rates remain unchanged.
- `index.html`: larger framed portraits, names underneath, speech tails, vertical separators, a separate lower framed panel, item/count styling using existing tokens, viewport-aware enemy image height. UI cache suffix ends in `-i2c`.
- `src/i18n.js` unchanged: existing `event.prep.medicineLine` retains บารมี; merchant/Nira names retain their actual names.
- Inventory art uses the existing `itemImg`/`artUrl` paths (img/item-tea.png, img/item-health.png, img/item-holywater.png).

Tests changed:
- `tests/b4-prep-medicine-box.test.mjs`: replaced obsolete markup checks with real game/handler tests for both contexts, all tiers, exhausted/full items, fill depletion, and frontier rest/next-wave restrictions.
- `tests/ui29e.test.mjs`: mock the item rendering dependencies used by the new panel, retaining original close/start checks.
- `tests/skill-atk.test.mjs`, `tests/west-hit-facing.test.mjs`: retain previous cache tokens and require the additional `-i2c` suffix.

Evidence:
- `tests-targeted.log`: six focused handler tests, 6 pass / 0 fail.
- `tests-full.log`: intermediate full run; includes a fixture setup failure from using thBorderBoss rather than frontierBreach as the challenge unlock key. Fixture corrected; see final run.
- `tests-final.log`: `node --test tests/*.test.mjs` exited 0; 733 tests passed, 0 failed, 0 skipped (65.783 seconds).
- `handler-receipts.json`: actual before/after game state from calling the bound handlers, via `node verify-handlers.mjs`. These are handler checks, not browser click evidence. Event alert, boss preparation and frontier rest each show tea 7→6, health 4→3, holyWater 5→4, then fill health 3→2 and HP 101/140→140/140. A repeat fill consumes nothing.
- `browser-fixture.py`: local-only reproducible setup serving production UI with deterministic test state appended; does not change production modules or persist test saves. Run from the worktree and visit /i2c-fixture.html?case=deva, boss, challenge, empty, or tiers on port 8874. Browser execution of this fixture remains unverified.
- `browser-blockers.txt`: exact verification blockers.

Acceptance self-check:
1. After images at 1600×900 and 1280×720 compared with Battle6-1: **incomplete**. Reference and current images were inspected; production layout was changed, but after images were blocked by browser permissions. No visual acceptance is claimed.
2. Real UI clicks and before/after images of stock decrease/full authority: **incomplete**. Real game methods and bound handlers pass automated checks in three contexts; browser click and image evidence are missing.
3. `node --test tests/*.test.mjs` and cache suffix: **verified**. Final run: 733 passed / 0 failed, exit 0; `-i2c` is present. `git diff --check` reports no whitespace errors.
4. Evidence in AGAPAE Agent/Output/Codex/2026-10-11-i2c: **partial**. Saved under this relative path inside the authorized worktree. The requested Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex directory lies outside writable roots and was not written.

QA is not claimed complete. No changes were made to the forbidden Documents/Work PAE/Claude/AVEGEE directory.
