#!/bin/bash
# GFX-1110 fps table. usage: gfx.sh <label> <GFX mode> [query]   (checks the machine is idle first)
cd "$(dirname "$0")"
for i in 1 2 3 4 5 6 7 8 9 10 11 12; do
  l=$(uptime | sed 's/.*averages: //' | awk '{print $1}' | tr -d ,)
  echo "load1=$l"; if awk "BEGIN{exit !($l<2.5)}"; then break; fi; sleep 20
done
GFX=$2 QS="$3" python3 run_scenes.py 8950 $1 idle,walk,battle 2>&1 | grep -E "fps|hp|gfx|Error"
