# Zone 3 — owner walk mask, 23 October 2026

Status: extracted and reviewed by Codex; ready for the west integration step, not activated in the game.

Owner input: `Map-Zone3-2.jpg` (2500×1667), supplied directly in the Codex chat. Red means blocked, including the small red reserves within the plazas. Unpainted stone paths are walkable. The source artwork is unchanged.

## Outputs

- `west-owner-red-layer.png`: aligned 1536×1024 transparent red layer. Opaque red = blocked.
- `west-owner-walkable.png`: high-resolution binary data preview; white = walkable.
- `town-owner-walkmask-west.js`: generated 480×320 navigation grid, ready to copy to `src/` during west integration.
- `west-walkmask-review.jpg`: actual grid over the clean west terrain. Bright blue = walkable; dark = blocked.
- `owner-reference-aligned.jpg`: owner picture registered onto the terrain preview.
- `registration.json`: input hashes, affine matrix, residual errors, connectivity and threshold settings.
- `landmark-checks.json`: 24/24 data-level checks across paths, stairs, bridges, building reserves, small reserves and water.

SIFT matched 272 inliers. Median registration error is 0.155 px, p95 0.709 px, measured in the original reference. The resulting navigation data has 28,586 walkable cells forming one connected component. Extraction uses the original-resolution red annotation and nearest-neighbor registration, without dilation or morphological opening/closing. Grid coverage must exceed 68%; only three isolated walkable cells were removed. Owner-painted barriers and small red reserves remain blocked.

The first draft landmark sample for the left middle bridge was below the deck at (350,388). After inspecting the registered source with a coordinate grid, the actual deck sample is (350,382). The extraction and mask were not changed to obtain the passing check. `left-bridge-detail.png` records that inspection.

## Reproduction and limits

Run `extract-owner.py` (the paths at the top identify the exact source and terrain preview), then:

```sh
python3 scripts/extract-town-owner-mask.py --zone west --layer <this-folder>/west-owner-red-layer.png --dilate 0 --out <this-folder>/town-owner-walkmask-west.js --write
python3 <this-folder>/verify-owner.py
```

The supplied extraction script and verification script write into `/private/tmp/avegee-z3-owner-mask-20261023` by default. See those scripts to change that output directory if needed.

Module syntax and RLE size are checked. Connectivity and landmarks are data-level checks, not a claim that game pathfinding, station reach, or tree collisions have passed. Those checks remain for the west runtime integration, after the existing B1 → Z2 art → Z3 ground → B3 → west sprites queue. Keep the owner's tree footpoints from `Map-Zone3-1.jpg`; select trees to fit nearby punishment stations and give them dimensional lighting/shadows within the same west palette, per the owner's latest instruction. Do not move footpoints to simplify navigation.

No main merge, west skin activation, or live-site publication is included in this mask extraction.


## Floor clearance check

An additional data-level search uses the production clearLine rule (8-unit navigation cells, 3-unit side clearance, edge samples at most 4 units apart). All 28,586 floor cells remain reachable from the entry, including all ten sampled floor landmarks. See clearance-checks.json. Set west pathCell:8 during integration, as in the Asia owner-mask layout. Station, tree and NPC collisions still need runtime checks after placement; this result does not cover those objects.
