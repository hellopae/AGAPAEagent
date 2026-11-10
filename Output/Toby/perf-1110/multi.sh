#!/bin/bash
cd "$(dirname "$0")"
TQ='["town-terrain.js","ctx.imageSmoothingQuality = '"'"'high'"'"';","ctx.imageSmoothingQuality = '"'"'low'"'"';"]'
SQ='["scene.js","ctx.imageSmoothingQuality = '"'"'high'"'"';\n  if (typeof ctx.getTransform","ctx.imageSmoothingQuality = '"'"'low'"'"';\n  if (typeof ctx.getTransform"]'
for i in 1 2 3; do
echo "base $i $(./exp.sh m '[]' 2>&1 | tail -1)"
echo "terrainLow $i $(./exp.sh m "[$TQ]" 2>&1 | tail -1)"
echo "novig $i $(./exp.sh m '[["scene.js","drawVignette(ctx, SCENE.w, SCENE.h);","/*off*/"]]' 2>&1 | tail -1)"
echo "noshadow $i $(./exp.sh m '[["scene.js","drawTownShadows(ctx);","/*off*/"]]' 2>&1 | tail -1)"
done
