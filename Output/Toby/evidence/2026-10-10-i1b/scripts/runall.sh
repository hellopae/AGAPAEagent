#!/bin/bash
S=$1; O=${2:-th}
for v in "1440 900 desk" "390 844 port" "844 390 land" "360 740 p360"; do
  set -- $v; python3 $S $1 $2 $3 $O > out-$3-$O.txt 2>&1
done
