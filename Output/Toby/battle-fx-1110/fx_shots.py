"""BATTLE-FX evidence: 390x844 portrait. usage: fx_shots.py <port> <what>   what = frontier3 | rank | ult
Drives the real game (G / __ui from the perf harness) and takes screenshots into shots/."""
import sys,json,time
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUT2='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/battle-fx-1110/'
port=sys.argv[1]; what=sys.argv[2]
PREP="""async()=>{const g=G;g.over=null;g.pendingRecovery=null;g.pendingReward=null;g.pendingLevel=null;g.storyQueue=[];
  g.hire('taan');g.hire('boon');g.party.members=['taan','boon'];g.hireGuard();g.frontierOf().team=['taan','boon'];}"""
res={}
with sync_playwright() as p:
    b,ctx,pg=setup(p,port,390,844,2)
    pg.evaluate(PREP)
    if what=='frontier3':
        # roll until we have 3 demons, then open the real battle
        for n in (1,2,3):
            pg.evaluate("async n=>{const g=G;let tries=0;g.battle=null;while(tries++<200){const b=g.startFrontierBattle({kindIdx:0,level:2,id:1});if(b&&b.frontierCount===n)break;g.battle=null;}}",n)
            c=pg.evaluate("G.battle&&[G.battle.frontierCount,G.battle.foes.length,G.battle.foes.map(f=>[f.who,f.hp,f.atk])]")
            res[f'count{n}']=c
            pg.evaluate("async()=>{const {openBattle}=__ui;openBattle();}")
            pg.wait_for_timeout(2500)
            pg.screenshot(path=OUT2+f'shots/frontier-{n}foe-390.png')
            # overflow check: any foe card outside the viewport?
            res[f'foeBoxes{n}']=pg.evaluate("[...document.querySelectorAll('dialog[open] .fig.foe')].map(e=>{const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]})")
            pg.evaluate("G.battle=null;document.querySelectorAll('dialog[open]').forEach(d=>d.close())"); pg.wait_for_timeout(500)
    print(json.dumps(res,ensure_ascii=False,indent=1))
    print('errors',pg.errors[:5])
    b.close()
