import sys,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf')
from harness import *
port=sys.argv[1]
sets=[[],['render'],['terrain'],['scenery'],['sceneryshadow'],['scenery','sceneryshadow'],['houses'],['stations'],['townground'],['hud'],['terrain','scenery','sceneryshadow'],['terrain','scenery','sceneryshadow','houses','stations','townground','hud']]
with sync_playwright() as p:
    b,ctx,pg=setup(p,port)
    pg.wait_for_timeout(1500)
    for s in sets:
        pg.evaluate("s=>{window.__skip=Object.fromEntries(s.map(k=>[k,true]))}",s)
        pg.wait_for_timeout(600)
        v=measure(pg,4)
        print(f"skip {','.join(s) or 'none':50} fps {v['fps_avg']:5} p95 {v['ft_p95']:6} drawImage/f {v['calls'].get('drawImage',0)/v['frames']:.0f}")
    b.close()
