"""QUEST-REWARDS fps in a quest fight, with the perf-1110 harness. usage: fps_quest.py <port> <label> <high|performance> <vw,vh,dsf>
Run ONLY while the machine is idle (load1 < 2.5): the caller (fps_quest.sh) waits for that."""
import sys, json, os
sys.path.insert(0, '/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
sys.path.insert(0, '/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/quest-rewards-1110')
from harness import *
from e2e_lib import goto_zone
HERE = '/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/quest-rewards-1110/'
port, label, mode = sys.argv[1], sys.argv[2], sys.argv[3]
vw, vh, dsf = [int(x) for x in sys.argv[4].split(',')]
res = {}
with sync_playwright() as p:
    b, ctx, pg = setup(p, port, vw, vh, dsf)
    print('gfx mode ->', pg.evaluate("async m=>{const g=await import('./src/graphics-setting.js');g.setGraphicsMode(m);return g.getGraphicsMode()}", mode))
    M = lambda s, a=None: measure(pg, s, a)
    pg.wait_for_timeout(4000); res['map_idle'] = M(6)
    goto_zone(pg, 'asia')
    pg.evaluate("""async()=>{const g=G;g.over=null;g.pendingReward=null;g.storyQueue=[];g.coin=5000;g.bossCleared={th:true,asia:true,west:true,cyberhell:true};g.gameCompleted=true;
      g.hire('kan');for(const m of ['taan','dam','plerng']){try{g.hire(m)}catch(e){}}g.party.members=['kan','taan','dam','plerng'].slice(0,g.partyMax());g.hp=g.hpMax;
      const C=await import('./src/combat-skills.js');C.unlockQuestSkill(g,'eyeAwaitingPermission');
      g.sideQuests.sqKan={step:3,choice:0,done:false,verdict:{right:true,privateOpened:true}};g.startQuestFight('sqKan');
      g.battle.foes.forEach(f=>{f.hp=f.maxHp=f.maxHp*20;f.atk=[1,2]});__ui.openBattle();}""")
    pg.wait_for_timeout(3000)
    res['quest_fight_idle'] = M(8)
    pg.screenshot(path=HERE + f'shots/fps-{label}-battle.png')
    def act():   # same driver as the perf-1110 battle scene: attack -> first foe
        pg.evaluate("""()=>{const d=document.querySelector('dialog[open]');if(!d)return;
          const a=d.querySelector('[data-command="attack"]:not([disabled])');const f=d.querySelector('[data-foe-id]');
          if(G.battle&&G.battle.command&&f){f.click();} else if(a){a.click();}}""")
    res['quest_fight_actions_10s'] = M(10, act)
    res['foes_hp'] = pg.evaluate("G.battle?G.battle.foes.map(f=>f.hp):null")
    res['errors'] = pg.errors[:5]
    res['meta'] = {'viewport': [vw, vh, dsf], 'mode': mode, 'gl': pg.evaluate("(()=>{const c=document.createElement('canvas');const gl=c.getContext('webgl');const e=gl.getExtension('WEBGL_debug_renderer_info');return gl.getParameter(e.UNMASKED_RENDERER_WEBGL)})()")}
    b.close()
json.dump(res, open(HERE + f'fps-{label}.json', 'w'), indent=1, ensure_ascii=False)
for k, v in res.items():
    if isinstance(v, dict) and 'fps_avg' in v: print(f"{k:26} fps {v['fps_avg']:5} min1s {v['fps_min_1s']:5} p95 {v['ft_p95']:7} long {v['long_tasks']:3}/{v['long_ms']}ms")
    else: print(k, v)
