#!/bin/bash
cd "$(dirname "$0")"
for r in "gfx-high-a high" "gfx-perf-a performance" "gfx-perf-b performance" "gfx-high-b high"; do set -- $r; echo "== $1"; ./gfx.sh $1 $2 ""; sleep 30; done
echo "== gfx-perf-dpr2-sanity (mapdpr=2 beats performance)"; ./gfx.sh gfx-perf-mapdpr2 performance "?mapdpr=2"
echo ALLDONE
