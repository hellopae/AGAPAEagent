import sys,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf')
from harness import *
port=sys.argv[1]
sets=[{},{'nofilter':2},{'nofilter':3},{'nofilter':1},{'cull':1}]
with sync_playwright() as p:
    b,ctx,pg=setup(p,port)
    pg.wait_for_timeout(1500)
    print(pg.evaluate("""()=>{const o={};import('./src/town-layout.js').then(()=>0);return 0}"""))
    for s in sets:
        pg.evaluate("s=>{window.__skip=s}",s)
        pg.wait_for_timeout(600)
        v=measure(pg,4)
        print(f"{json.dumps(s):40} fps {v['fps_avg']:5} p95 {v['ft_p95']:6} drawImage/f {v['calls'].get('drawImage',0)/v['frames']:.0f}")
    b.close()
