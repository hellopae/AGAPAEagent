#!/bin/bash
cd "$(dirname "$0")"
run(){ echo "$1 :: $(./exp.sh m "$2" walk 2>&1 | tail -1)"; }
NF='[["scene.js","if(town&&townTerrainImage())drawTownFluidFx(ctx,t,{reduced,paused:!!g.paused});","/*off*/"]]'
for i in 1 2 3; do run base$i '[]'; run nofluid$i "$NF"; done
