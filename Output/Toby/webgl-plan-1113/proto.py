"""A/B of the scratch prototype.  usage: proto.py <port-serving-this-folder> <game-port> [uncap]"""
import sys,json,time
from playwright.sync_api import sync_playwright
port,gport=sys.argv[1],sys.argv[2];uncap=len(sys.argv)>3 and sys.argv[3]=='uncap'
ARGS=['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist','--enable-gpu-rasterization']+(['--disable-frame-rate-limit','--disable-gpu-vsync'] if uncap else [])
HERE='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/webgl-plan-1113/'
ROUNDS=int(sys.argv[4]) if len(sys.argv)>4 else 2
DPRS=[float(x) for x in sys.argv[5].split(',')] if len(sys.argv)>5 else [2,1.5]
out=[]
with sync_playwright() as p:
    for rnd in range(ROUNDS):
        for dpr in DPRS:
            for mode in ('2d','gl-naive','hybrid','gl-merged'):
                b=p.chromium.launch(args=ARGS)
                ctx=b.new_context(viewport={'width':1792,'height':958},device_scale_factor=2)
                pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
                pg.goto(f'http://127.0.0.1:{port}/proto.html?mode={mode}&dpr={dpr}&root=/')
                try:
                    pg.wait_for_function('window.__bench&&window.__bench.ready&&window.__bench.frames.length>40',timeout=60000)
                    pg.wait_for_timeout(2500);pg.evaluate('__bench.reset()');pg.wait_for_timeout(8000)
                    r=pg.evaluate('__bench.summary()')
                    if rnd==0 and dpr==2 and not uncap: pg.screenshot(path=HERE+f'results/proto-{mode}.jpg',type='jpeg',quality=60)
                except Exception as e: r={'mode':mode,'dpr':dpr,'error':str(e)[:200],'errs':errs[:3]}
                r['round']=rnd;r['uncap']=uncap;out.append(r);print(r,flush=True)
                b.close();time.sleep(4)
json.dump(out,open(HERE+f'results/proto-{"uncap" if uncap else "vsync"}-{"_".join(str(d) for d in DPRS)}.json','w'),indent=1)
