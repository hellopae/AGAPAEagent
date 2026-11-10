import sys,os,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
secs=[ # (file, original statement, name)
 ("drawTownTerrain(ctx,img,t,!!reducedMotion?.matches);","terrain"),
 ("drawTownClouds(ctx,t,reduced);","clouds"),
 ("drawTownDistantScenery(ctx,sceneryHouse,sceneryTree,cameraView,reduced,img);","distant"),
 ("drawTownShadows(ctx);","shadows"),
 ("drawTownSceneryShadows(ctx,sceneryHouse,sceneryTree,sceneryWaterfall,cameraView,reduced,img);","sceneryShadows"),
 ("drawMapAmbientSky(ctx, g.zone, ambientTime, SCENE.w, SCENE.h, !!reducedMotion?.matches || !!g.paused);","sky"),
 ("if(town&&townTerrainImage())drawTownFluidFx(ctx,t,{reduced,paused:!!g.paused});","fluid"),
 ("if(town&&townTerrainImage())drawTownFlow(ctx,t,reduced || !!g.paused);","flow"),
 ("drawTownGround(ctx, g, t);","townGround"),
 ("layer.sort((a, b) => a.y - b.y).forEach(o => o.fn());","layer"),
 ("if(town)drawTownNightEffects(ctx,t,reduced);","night"),
 ("if (bg && isTownZone(g.zone)) drawTownForeground(ctx,bg,!!archiveHouse);","foreground"),
 ("drawVignette(ctx, SCENE.w, SCENE.h);","vignette"),
]
P=[]
for s,n in secs:
    P.append(["scene.js",s,f"window.__T(ctx,'{n}',()=>{{{s}}});"])
P.append(["terrain-detail.js","MAX_PIXELS=16_000_000","MAX_PIXELS=600_000_000"])
if len(sys.argv)>1: P=[p for p in P if p[1]!=sys.argv[1]] if False else P
os.environ['PATCHES']=json.dumps(P)
from harness import *
with sync_playwright() as p:
    b,ctx,pg=setup(p,8950,1792,958,2)
    pg.wait_for_timeout(5000)
    pg.evaluate("__tot={};__tOn=true"); pg.wait_for_timeout(6000)
    r=pg.evaluate("__tot"); pg.evaluate("__tOn=false")
    n=max(v['n'] for v in r.values())
    tot=0
    for k,v in sorted(r.items(),key=lambda kv:-kv[1]['ms']):
        print(f"{k:16} {v['ms']/v['n']:6.2f} ms/frame  (n={v['n']})"); tot+=v['ms']/v['n']
    print('sum',round(tot,2),'frames',n)
    b.close()
