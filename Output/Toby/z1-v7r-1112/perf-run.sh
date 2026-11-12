#!/bin/zsh
cd "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/z1-v7r-1112"
for round in 1 2; do
 for gfx in high performance; do
  for scene in walk lava overview; do
   for gs in v7 v7r; do
    GSET=$gs python3 -I perf3.py shader $gfx $scene 8 2>&1 | tail -1
   done
  done
 done
done
echo ALLDONE
