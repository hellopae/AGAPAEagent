#!/bin/bash
cd "$(dirname "$0")"
run(){ echo "$1 :: $(./exp.sh m "$2" walk 2>&1 | tail -1)"; }
run base '[]'
run nocomposite '[["town-fluid-fx.js","function composite(ctx, st, layer, geo, blend, opacity) {","function composite(ctx, st, layer, geo, blend, opacity) { return;"]]'
run srcover '[["town-fluid-fx.js","ctx.globalCompositeOperation = blend === '"'"'normal'"'"' ? '"'"'source-over'"'"' : blend;","ctx.globalCompositeOperation = '"'"'source-over'"'"';"]]'
run nooverlay '[["town-fluid-fx.js","    const geo = layerGeometry(m, vis, cv.width, cv.height);\n    if (!geo) continue;","    if (p.blend === '"'"'overlay'"'"') continue;\n    const geo = layerGeometry(m, vis, cv.width, cv.height);\n    if (!geo) continue;"]]'
run noscreen '[["town-fluid-fx.js","    const geo = layerGeometry(m, vis, cv.width, cv.height);\n    if (!geo) continue;","    if (p.blend === '"'"'screen'"'"') continue;\n    const geo = layerGeometry(m, vis, cv.width, cv.height);\n    if (!geo) continue;"]]'
run nospots '[["town-fluid-fx.js","    const geo = layerGeometry(m, vis, cv.width, cv.height);\n    if (!geo) continue;","    if (p.kind === '"'"'spots'"'"' || p.kind === '"'"'puff'"'"') continue;\n    const geo = layerGeometry(m, vis, cv.width, cv.height);\n    if (!geo) continue;"]]'
run base2 '[]'
