"""usage: visual.py <port> <label>  -> shots/<label>-{hub,corner,battle}.png (1792x958 CSS, DPR 2)"""
import sys
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
port,label=sys.argv[1],sys.argv[2]
with sync_playwright() as p:
    b,ctx,pg=setup(p,port,1792,958,2)
    pg.wait_for_timeout(7000)
    pg.evaluate("document.querySelector('#hud-pause')&&0")
    pg.screenshot(path=OUT+f'shots/{label}-hub.png')
    # corner of the world where the old vignette rect sits + houses/trees with shadows
    pg.evaluate("G.player.x=900;G.player.y=520;G.player.tx=null;G.player.ty=null;G.player.path=null")
    pg.wait_for_timeout(5000)
    pg.screenshot(path=OUT+f'shots/{label}-corner.png')
    pg.evaluate("G.player.x=2300;G.player.y=1500;G.player.tx=null;G.player.ty=null;G.player.path=null")
    pg.wait_for_timeout(5000)
    pg.screenshot(path=OUT+f'shots/{label}-south.png')
    pg.evaluate("""async()=>{const {openBattle}=__ui;const g=G;
          g.over=null;g.pendingRecovery=null;g.pendingReward=null;g.pendingLevel=null;g.storyQueue=[];
          g.hire('taan');g.hire('boon');g.party.members=['taan','boon'];g.hireGuard();
          g.startBattle({id:999,who:'x',deserved:4,resist:true});const b=g.battle;
          b.foes=[{...b.foes[0],hp:450,maxHp:450,atk:[8,12]}];b.selectedFoeId=b.foes[0].id;openBattle();}""")
    pg.wait_for_timeout(4000)
    pg.screenshot(path=OUT+f'shots/{label}-battle.png')
    b.close()
