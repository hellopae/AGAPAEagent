#!/bin/bash
cd "$(dirname "$0")"
run(){ echo "$1 :: $(./exp.sh m "$2" walk 2>&1 | tail -1)"; }
run base '[]'
run nofluid '[["scene.js","if(town&&townTerrainImage())drawTownFluidFx(ctx,t,{reduced,paused:!!g.paused});","/*off*/"]]'
run noclouds '[["scene.js","drawTownClouds(ctx,t,reduced);","/*off*/"]]'
run nosky '[["scene.js","drawMapAmbientSky(ctx, g.zone, ambientTime, SCENE.w, SCENE.h, !!reducedMotion?.matches || !!g.paused);","/*off*/"]]'
run nonight '[["scene.js","if(town)drawTownNightEffects(ctx,t,reduced);","/*off*/"]]'
run noscenshadow '[["scene.js","drawTownSceneryShadows(ctx,sceneryHouse,sceneryTree,sceneryWaterfall,cameraView,reduced,img);","/*off*/"]]'
run noshadows '[["scene.js","drawTownShadows(ctx);","/*off*/"]]'
run noweather '[["scene.js","drawMapWeather(ctx,{zone:g.zone","if(0)drawMapWeather(ctx,{zone:g.zone"]]'
run base2 '[]'
