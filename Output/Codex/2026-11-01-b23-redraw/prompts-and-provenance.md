# Image generation prompts and provenance

Tool: built-in `image_gen` only. No CLI/API fallback or Shado was used.
Use case: stylized-concept. Asset: AVEGEE isometric frontier game map.

## Base repaint prompt
Edit the existing route painting. Preserve exact framing, normalized landmark positions, entry and exit gates, all three checkpoint plazas, stairs, bridges, cave connections, waterfalls and biome boundaries. Widen every road interior to 1.6–2x, target at least 60 world pixels at 1672x941. Move railings outward; keep interiors clear and continuously connected. Root all vegetation in terrain. Match the existing hand-painted fantasy style with newly painted crisp detail. No characters, text, UI, labels, or masks.

## High-resolution detail tile prompt
High resolution detail repaint of this EXACT cropped game-map tile. Preserve input dimensions, framing, camera, edges, colors, lighting, perspective, positions, road geometry and all silhouettes so neighboring tiles stitch seamlessly. Redraw fine stone paving, rail carvings, leaves, snowy fir needles, rock cracks, water foam and architecture at native pixel scale with newly painted microdetail. Keep wide road interiors clear and the same boundaries. No text, UI, borders or montage.

## Assembly
Four overlapping NW/NE/SW/SE tiles. Original-grid boxes are [0,0,876,511], [796,0,1672,511], [0,431,876,941], [796,431,1672,941]. Detail references were enlarged for generation, then actual generated tile detail was SIFT-registered, feather-blended and saved to a 3344x1882 raster. `stitch-report.json` records each generated tile's native size, detail scale, inliers, registration and SHA256. This is not a simple upscale of the old asset. A tiny registration-edge fallback, if any, is quantified there.

## B23 invariants
Asian gate at upper left, snow gate at lower right, captain cave at [.55,.72], existing owner stair connection, warm leaves on left ~44%, snow on right from ~48–52%, four waterfall anchors unchanged. No overlay trees.
