import sys
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf')
from harness import *
port,label=sys.argv[1],sys.argv[2]
spots={'lava':(520,1250),'ice':(3150,780),'forest':(3000,1600),'heaven':(2300,520),'city':(1400,1250)}
with sync_playwright() as p:
    b,ctx,pg=setup(p,port)
    pg.evaluate("G.paused=true")  # freeze world; camera still follows
    for k,(x,y) in spots.items():
        pg.evaluate(f"G.player.x={x};G.player.y={y};G.player.tx=null;G.player.path=null")
        pg.wait_for_timeout(4000 if port!='8102' else 9000)
        pg.screenshot(path=OUT+f'shots/{label}-{k}.png')
    b.close()
