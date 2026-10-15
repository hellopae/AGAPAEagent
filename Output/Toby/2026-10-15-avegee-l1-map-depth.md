# L1 map depth — STEP 1 READY (note updated again at the end of the task)

SendMessage is not available in the Toby tool set, so this file is the step-1 hand-off for Claudy / Codex (L1b).

- Mask folder: `/Users/agapae/agapae-work/backup/avegee-l1-clear-mask/`
  - `clear-mask.png` 4915x3277 (white = clear, black = keep), `footprints.json` (86 objects), `mask-overlay.jpg`
- Script (re-runnable): `/Users/agapae/agapae-work/.toby-worktrees/l1/scripts/l1-clear-mask.py` (branch `toby/l1-depth`)
  `python3 scripts/l1-clear-mask.py [--pad 16]`
- Footprint = base of each object (building foot band measured from sprite alpha, tree/rock/palm/lamp/torch ground ellipse, dais, 12 houses) + 16 px. Sprite boxes are in `footprints.json` as `sprite_px` for reference.
