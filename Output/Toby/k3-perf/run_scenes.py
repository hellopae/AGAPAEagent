import sys,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf')
from harness import *
port,label=sys.argv[1],sys.argv[2]
want=sys.argv[3].split(',') if len(sys.argv)>3 and not sys.argv[3].startswith('--') else ['idle','walk','zoom','battle','trial']
prof='--profile' in sys.argv
vw,vh,dsf=1440,900,2
for a in sys.argv:
    if a.startswith('--vp='): vw,vh,dsf=[float(x) if '.' in x else int(x) for x in a[5:].split(',')]
res={}
def settle(pg,ms=1500): pg.wait_for_timeout(ms)
with sync_playwright() as p:
    b,ctx,pg=setup(p,port,vw,vh,dsf)
    cdp=ctx.new_cdp_session(pg)
    if prof: cdp.send('Profiler.enable')
    M=lambda s,a=None:measure(pg,s,a,prof,cdp)
    if 'idle' in want:
        settle(pg,6000); res['map_idle_zoom5']=M(8)
    if 'walk' in want:
        res['map_walk_10s']=M(10,lambda:walk_action(pg))
        pg.evaluate("G.player.tx=null;G.player.path=null")
    if 'zoom' in want:
        levels=[1,3.5,5,6.5]
        for i,z in enumerate(levels):
            pg.evaluate(f"document.getElementById('town-overview').click()") if i==0 else None
            if i>0:
                pg.evaluate("document.getElementById('town-zoom-more').click()")
            settle(pg,1200)
            res[f'map_zoom_{z}_idle']=M(5)
        # walk at max zoom
        res['map_zoom_6.5_walk']=M(8,lambda:walk_action(pg))
        pg.evaluate("G.player.tx=null;G.player.path=null")
        for _ in range(3): pg.evaluate("document.getElementById('town-zoom-less').click()")
        settle(pg,800)
    if 'battle' in want:
        pg.evaluate("""async()=>{const {openBattle}=__ui;const {MOB}=await import('./src/data.js');const g=G;
          g.over=null;g.pendingRecovery=null;g.pendingReward=null;g.pendingLevel=null;g.storyQueue=[];
          g.hire('taan');g.hire('boon');g.party.members=['taan','boon'];g.hireGuard();
          g.startBattle({id:999,who:'ทดสอบคิว',deserved:4,resist:true});const b=g.battle;
          b.foes=[{...b.foes[0],hp:450,maxHp:450,atk:[8,12]},{...b.foes[0],id:'review-second',who:'ผู้พิทักษ์',sp:MOB.kinds[2].img,hp:180,maxHp:180,atk:[6,10]}];b.selectedFoeId=b.foes[0].id;openBattle();}""")
        settle(pg,2500); res['battle_idle']=M(8)
        pg.screenshot(path=OUT+f'shots/{label}-battle.png')
        if 'battle_action' in want or True:
            def act():
                pg.evaluate("""()=>{const d=document.querySelector('dialog[open]');if(!d)return;
                  const a=d.querySelector('[data-command="attack"]:not([disabled])');const f=d.querySelector('[data-foe-id]');
                  if(G.battle&&G.battle.command&&f){f.click();} else if(a){a.click();}}""")
            res['battle_action_8s']=M(8,act)
            res['battle_action_hp']=pg.evaluate("G.battle?G.battle.foes.map(f=>f.hp):null")
        pg.evaluate("G.battle=null;document.querySelectorAll('dialog[open]').forEach(d=>d.close())")
    if 'trial' in want:
        pg.evaluate("""async()=>{const g=G;const {STATIONS}=await import('./src/data.js');
          g.over=null;g.pendingRecovery=null;g.pendingReward=null;g.pendingLevel=null;g.storyQueue=[];
          g.hire('dam');g.hire('kan');g.hire('boon');if(!g.taught.includes('trial-calculation'))g.taught.push('trial-calculation');
          for(const k of ['krata','lokan','dab'])if(!g.has(k)){const def=STATIONS.find(d=>d.k===k);g.stations.push({...g.stations[0],def,build:0,buildWait:false,slots:[],crewK:null});}
          if(!g.queue.length)g.spawnSoul();}""")
        pg.evaluate("document.getElementById('hud-trial').click()"); settle(pg,2500)
        ok=pg.evaluate("!!document.querySelector('dialog[open] .trial-hud')")
        res['trial_open']=ok
        if ok:
            res['trial_idle']=M(8); pg.screenshot(path=OUT+f'shots/{label}-trial.png')
    res['errors']=pg.errors[:5]
    res['meta']={'viewport':[vw,vh,dsf],'gl':pg.evaluate("(()=>{const c=document.createElement('canvas');const gl=c.getContext('webgl');const e=gl.getExtension('WEBGL_debug_renderer_info');return gl.getParameter(e.UNMASKED_RENDERER_WEBGL)})()")}
    b.close()
json.dump(res,open(OUT+f'results/{label}{"-prof" if prof else ""}.json','w'),indent=1,ensure_ascii=False)
for k,v in res.items():
    if isinstance(v,dict) and 'fps_avg' in v:
        print(f"{k:24} fps {v['fps_avg']:5} min1s {v['fps_min_1s']:5} p95 {v['ft_p95']:7} long {v['long_tasks']:3}/{v['long_ms']}ms")
    else: print(k,v)
