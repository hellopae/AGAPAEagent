import sys, os; sys.path.insert(0,'.')
from zrun import *
with sync_playwright() as p:
    b,pg,errs=boot(p,'west',sys.argv[1] if len(sys.argv)>1 else '',390,844,2)
    pg.evaluate("([x,y])=>{G.player.x=x;G.player.y=y;G.player.tx=x;G.player.ty=y}",[500,450])
    pg.wait_for_timeout(int(os.environ.get('PRE','1500')))
    for _ in range(3):
        pg.evaluate(DISMISS); pg.wait_for_timeout(300)
    pg.evaluate("G.paused=false")
    for k in range(12):
        pg.wait_for_timeout(200)
        print(k, pg.evaluate("({b:!!G.battle,paused:G.paused,fps:(window.__fr||0)})"), pg.evaluate("G.battle?JSON.stringify(Object.keys(G.battle)).slice(0,200)+' '+JSON.stringify(G.battle.foes||G.battle.enemies||G.battle.mobs||null).slice(0,200):null"))
        if pg.evaluate("!!G.battle"): break
    b.close()
