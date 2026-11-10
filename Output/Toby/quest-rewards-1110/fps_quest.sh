#!/bin/bash
# QUEST-REWARDS fps table: waits until load1 < 2.5 before EACH run (same rule as perf-1110/gfx.sh), then runs one label.
cd "$(dirname "$0")"
for r in "high-390 high 390,844,2" "perf-390 performance 390,844,2" "high-1792 high 1792,958,2"; do
  set -- $r
  for i in $(seq 1 18); do
    l=$(uptime | sed 's/.*averages: //' | awk '{print $1}' | tr -d ,)
    echo "load1=$l"; if awk "BEGIN{exit !($l<2.5)}"; then break; fi; sleep 20
  done
  echo "== $1"; python3 fps_quest.py 8961 $1 $2 $3 2>&1 | grep -E "fps|gfx|Error|errors|foes"
  sleep 20
done
echo ALLDONE
