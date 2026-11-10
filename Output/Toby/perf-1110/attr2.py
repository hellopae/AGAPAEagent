import sys,os,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
sc=[("drawTownTerrain(ctx,img,t,!!reducedMotion?.matches);","terrain"),
 ("drawTownDistantScenery(ctx,sceneryHouse,sceneryTree,cameraView,reduced,img);","distant"),
 ("drawTownShadows(ctx);","shadows"),
 ("drawTownSceneryShadows(ctx,sceneryHouse,sceneryTree,sceneryWaterfall,cameraView,reduced,img);","sceneryShadows"),
 ("if(town&&townTerrainImage())drawTownFluidFx(ctx,t,{reduced,paused:!!g.paused});","fluid"),
 ("drawTownGround(ctx, g, t);","townGround"),
 ("layer.sort((a, b) => a.y - b.y).forEach(o => o.fn());","layer"),
 ("if(town)drawTownNightEffects(ctx,t,reduced);","night"),
 ("if (bg && isTownZone(g.zone)) drawTownForeground(ctx,bg,!!archiveHouse);","foreground")]
P=[["scene.js",s,f"window.__W('{n}',()=>{{{s}}});"] for s,n in sc]
P+= [["ui.js","updateMapCamera(now);","window.__W('camera',()=>updateMapCamera(now));"],
 ["ui.js","render(ctx, g, now, hover, sel, mapCam.view);","window.__W('render',()=>render(ctx, g, now, hover, sel, mapCam.view));"],
 ["ui.js","updateTownHud(now);","window.__W('townHud',()=>updateTownHud(now));"],
 ["ui.js","followMarks(); drawAtk(); updateTrialBtn(); updateMobFab(); updateBossFab(); updateFrontierFab(); updateRepairFabs(); updateTalk(); drawPauseTag();","window.__W('domStuff',()=>{followMarks(); drawAtk(); updateTrialBtn(); updateMobFab(); updateBossFab(); updateFrontierFab(); updateRepairFabs(); updateTalk(); drawPauseTag();});"],
 ["ui.js","if (!g.paused && !g.over) { keyWalk(dt); g.stepWorld(dt); }","if (!g.paused && !g.over) { window.__W('stepWorld',()=>{keyWalk(dt); g.stepWorld(dt);}); }"]]
os.environ['PATCHES']=json.dumps(P)
from harness import *
with sync_playwright() as p:
    b,ctx,pg=setup(p,8950,1792,958,2)
    pg.wait_for_timeout(5000)
    pg.evaluate("__slow=[];__sum={}")
    t0=time.time()
    while time.time()-t0<10:
        walk_action(pg); pg.wait_for_timeout(100)
    print(pg.evaluate("JSON.stringify(__slow)"))
    r=pg.evaluate("__sum")
    for k,v in sorted(r.items(),key=lambda kv:-kv[1]['ms']): print(f"{k:16} avg {v['ms']/v['n']:6.2f} max {v['max']:6.1f} n={v['n']}")
    b.close()
