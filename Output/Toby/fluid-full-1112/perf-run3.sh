#!/bin/zsh
cd "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-full-1112"
for round in 1 2 3; do
 for scene in overview pan; do
   for mode in frames shader; do
    python3 -I perf3.py $mode performance $scene 8 2>&1 | tail -1
   done
 done
done
echo ALLDONE
