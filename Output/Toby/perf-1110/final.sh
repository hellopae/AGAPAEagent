#!/bin/bash
cd "$(dirname "$0")"
run(){ lab=$1; port=$2; qs=$3; echo "== $lab"; QS="$qs" python3 run_scenes.py $port $lab idle,walk,battle 2>&1 | grep -E "fps|hp"; sleep 40; }
run final-base 8951 ""
run final-new1 8950 ""
run final-new-dpr15 8950 "?mapdpr=1.5"
run final-new2 8950 ""
run final-base2 8951 ""
