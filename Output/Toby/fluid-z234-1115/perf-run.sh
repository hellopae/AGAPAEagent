#!/bin/zsh
cd "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-z234-1115"
for zone in asia west cyberhell; do for gfx in high performance; do for scene in walk overview; do for mode in old new; do
  python3 -I perf.py $zone $mode $gfx $scene 8 2>&1 | tail -1
done; done; done; done
echo ALLDONE
