#!/bin/bash
# BATTLE-FX fps check: both graphics modes, battle scene included.  gfx.sh waits for load1 < 2.5 before each run.
cd "$(dirname "$0")"
for r in "bfx-high-a high" "bfx-perf-a performance" "bfx-high-b high" "bfx-perf-b performance"; do set -- $r; echo "== $1"; ./gfx.sh $1 $2 ""; sleep 30; done
echo ALLDONE
