"""BATTLE-FX heavy-scene fps (same harness/instrumentation as perf-1110, 1792x958 @2x): 3 demons + hits, and the zone boss with its cutscene move.
usage: fx_perf.py <port> <high|performance> <three|boss> [secs]"""
import sys,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
port,mode,scn=sys.argv[1],sys.argv[2],sys.argv[3]; secs=float(sys.argv[4]) if len(sys.argv)>4 else 28
START={
 'three':"""async()=>{const g=G;g.hire('taan');g.hire('boon');g.party.members=['taan','boon'];g.hireGuard();g.frontierOf().team=['taan','boon'];
   let n=0;g.battle=null;while(n++<300){const b=g.startFrontierBattle({kindIdx:0,level:2,id:1});if(b&&b.frontierCount===3)break;g.battle=null;}
   g.battle.youHp=g.battle.youMax=9000;g.battle.foes.forEach(f=>f.hp=f.maxHp=99999);const {openBattle}=__ui;openBattle();return g.battle.kind}""",
 'boss':"""async()=>{const g=G;g.hire('taan');g.hire('boon');g.party.members=['taan','boon'];g.hireGuard();g.frontierOf().team=['taan','boon'];
   for(const ev of Object.keys(g.zoneEvents.th))g.zoneEvents.th[ev]='cleared';g.bossGuarding.th=true;g.legacyBossGate=true;
   const b=g.startZoneBoss('alert');b.youHp=b.youMax=9000;b.foes.forEach(f=>f.hp=f.maxHp=99999);const {openBattle}=__ui;openBattle();return b.kind}""",
}[scn]
with sync_playwright() as p:
    b,ctx,pg=setup(p,port,1792,958,2)
    print('gfx',pg.evaluate("async m=>{const g=await import('./src/graphics-setting.js');g.setGraphicsMode(m);return g.getGraphicsMode()}",mode))
    print('start',pg.evaluate(START)); pg.wait_for_timeout(2500)
    def act():
        pg.evaluate("""()=>{const d=document.querySelector('dialog[open]');if(!d)return;
          const go=[...d.querySelectorAll('button')].find(b=>/เข้าสู้/.test(b.textContent)&&!b.disabled);if(go){go.click();return;}
          const a=d.querySelector('[data-command="attack"]:not([disabled])');const f=d.querySelector('[data-foe-id]');
          if(G.battle&&G.battle.command&&f){f.click();} else if(a){a.click();}}""")
    r=measure(pg,secs,act)
    r['ultimates']=pg.evaluate("G.battle?G.battle.ultimateActs:null"); r['turn']=pg.evaluate("G.battle?G.battle.turn:null")
    r['fx']=pg.evaluate("(async()=>{const fx=await import('./src/battle-fx.js?v=m2');const s=fx.fxStats();return {plays:s.plays,peakParticles:s.peakParticles,peakItems:s.peakItems,avgWorkMs:+s.avgWorkMs.toFixed(2),maxWorkMs:+(s.maxWorkMs||0).toFixed(1),resDrops:s.resDrops||0}})()")
    print(json.dumps({k:r[k] for k in ('fps_avg','fps_min_1s','ft_p95','long_tasks','long_ms','ultimates','turn','fx')},ensure_ascii=False))
    print('errors',pg.errors[:3]); b.close()
