import sys,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf')
from harness import *
port=sys.argv[1]
with sync_playwright() as p:
    b,ctx,pg=setup(p,port)
    print(pg.evaluate("({z:G.zone,paused:G.paused,over:G.over,dlg:!!document.querySelector('dialog[open]'),p:[G.player.x,G.player.y]})"))
    r=measure(pg,5)
    print(json.dumps(r,indent=1))
    r=measure(pg,10,lambda:walk_action(pg))
    print(json.dumps(r,indent=1)); print(pg.evaluate("[G.player.x,G.player.y]"))
    print(pg.errors)
    b.close()
