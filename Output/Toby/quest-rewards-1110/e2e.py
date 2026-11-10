"""QUEST-REWARDS e2e at 390x844 (real clicks). usage: e2e.py <port> [quest ids comma]  — default sqGuard,sqKan,sqBoon
Plays each quest from 'step 3 (verdict given)' through: the answer click -> Rae's pre-scene -> real battle (win through the UI) -> win scene -> quest dialogue -> closing receipt.
Also: lose + retry, journal preview, retro notice for an old save. Screenshots go to ./shots/."""
import sys, json
sys.path.insert(0, '/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
HERE = '/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/quest-rewards-1110/'
port = sys.argv[1]
ids = sys.argv[2].split(',') if len(sys.argv) > 2 else ['sqGuard', 'sqKan', 'sqBoon']
res = {}

PREP = """async (id)=>{
  const g=G, D=await import('./src/data.js'), Q=await import('./src/side-quests.js');
  g.over=null;g.pendingRecovery=null;g.pendingReward=null;g.pendingLevel=null;g.storyQueue=[];g.gameCompleted=true;g.coin=5000;
  g.zoneTravel.visited={th:true,asia:true,west:true,cyberhell:true};g.zoneTravel.ports={th:true,asia:true,west:true,cyberhell:true};
  g.merchantJourney={asia:{arrived:true},west:{arrived:true},cyberhell:{arrived:true}};
  g.bossCleared={th:true,asia:true,west:true,cyberhell:true};
  return true;}"""

def goto_zone(pg, zone):
    pg.evaluate("""async(z)=>{const g=G;if(g.zone===z)return;const T=await import('./src/zone-travel.js');
      g.zoneTravel.visited[g.zone]=true;g.zoneTravel.visited[z]=true;g.zoneTravel.ports[g.zone]=true;g.zoneTravel.ports[z]=true;
      Object.assign(g.player,g.harbourPoint());const pre=await import('./src/preload.js');await pre.preloadZone(z,z);g.moveZone(z);}""", zone)
    pg.wait_for_timeout(2500)
    for _ in range(6):
        if pg.evaluate("!!document.querySelector('dialog[open]')"):
            pg.keyboard.press('Escape'); pg.wait_for_timeout(600)
        if pg.evaluate("!G.pendingZone&&!document.querySelector('dialog[open]')"): break
    pg.evaluate("G.pendingZone=null;G.paused=false")

def shot(pg, name):
    pg.screenshot(path=HERE + 'shots/' + name + '.png')

def state(pg, id):
    return pg.evaluate("(id)=>{const s=G.sideQuests[id]||{};return {step:s.step,choice:s.choice,done:s.done,fought:s.fought,reward:s.reward,coin:G.coin,exp:G.exp,battle:G.battle?G.battle.kind:null,inv:G.inventory}}", id)

def overflow(pg):
    return pg.evaluate("""(()=>{const d=document.querySelector('dialog[open]');if(!d)return null;const r=d.getBoundingClientRect();
      return {dialog:[Math.round(r.left),Math.round(r.right),Math.round(r.top),Math.round(r.bottom)],scrollW:d.scrollWidth,clientW:d.clientWidth,docScrollW:document.documentElement.scrollWidth,vw:innerWidth,
        wide:[...d.querySelectorAll('*')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&(b.right>innerWidth+1||b.left<-1)}).slice(0,5).map(e=>e.tagName+'.'+e.className)}})()""")

def play_quest(pg, id, zone, owner, hire):
    goto_zone(pg, zone)
    pg.evaluate(PREP, id)
    # hire the owner (+ a small team) the way the player does: through the game API; the guard through hireGuard
    pg.evaluate("""(k)=>{const g=G;g.coin=5000;if(k==='guard'){g.hireGuard&&g.hireGuard();}else{g.hire(k);}
      for(const m of ['taan','dam','plerng']){try{g.hire(m)}catch(e){}}
      g.party.members=[k==='guard'?'taan':k,'taan','dam'].filter((v,i,a)=>a.indexOf(v)===i&&v!=='guard').slice(0,g.partyMax());g.hp=g.hpMax;}""", owner)
    # put the quest at step 3 (the verdict is given) exactly as the real flow leaves it
    pg.evaluate("""async(id)=>{const Q=await import('./src/side-quests.js');const q=Q.QUESTS.find(x=>x.id===id);G.sideQuests[id]={step:3,choice:id==='sqBoon'?0:null,done:false,caseId:q.caseId,verdict:{right:true,heaven:false,privateOpened:id==='sqKan'}};
      const p=Q.questTarget(G,q);Object.assign(G.player,{x:p.x,y:p.y});G.onChange();}""", id)
    pg.wait_for_timeout(800)
    pg.evaluate("(a)=>__ui.openQuests(a[0],{owner:a[1]})", [id, owner])
    pg.wait_for_timeout(900)
    shot(pg, f'{id}-1-step3-390')
    res[f'{id}_step3_overflow'] = overflow(pg)
    res[f'{id}_step3_buttons'] = pg.evaluate("[...document.querySelectorAll('dialog[open] button')].map(b=>b.textContent.trim())")
    # answer
    if id == 'sqBoon':
        pg.click('dialog[open] [data-quest-next]')
    else:
        pg.click('dialog[open] [data-quest-choice="0"]')
    pg.wait_for_timeout(1200)
    res[f'{id}_after_answer'] = state(pg, id)
    res[f'{id}_scene_text'] = pg.evaluate("[...document.querySelectorAll('dialog[open] .quest-fight-scene p, dialog[open] .quest-fight-standby')].map(p=>p.textContent)")
    shot(pg, f'{id}-2-prescene-390'); res[f'{id}_prescene_overflow'] = overflow(pg)
    pg.click('dialog[open] [data-quest-fight-go]'); pg.wait_for_timeout(2500)
    shot(pg, f'{id}-3-battle-390')
    res[f'{id}_battle'] = pg.evaluate("G.battle?{kind:G.battle.kind,foes:G.battle.foes.map(f=>[f.who,f.hp,f.sp]),team:G.battleActors().map(a=>a.id),owner:G.battle.ownerJoined}:null")
    return

def open_wheel_and_shot(pg, id):
    # open the power list of the current ally to show quest move buttons (only when the owner can act)
    pg.evaluate("""()=>{const d=document.querySelector('dialog[open]');const b=d&&d.querySelector('[data-command="power"]');if(b&&!b.disabled)b.click();}""")
    pg.wait_for_timeout(600)

def fight_until(pg, id, outcome, max_s=90):
    """drive the real battle UI: foes' turns run themselves; on our turn pick Attack -> first living foe. Returns the battle result."""
    import time
    t0 = time.time()
    while time.time() - t0 < max_s:
        st = pg.evaluate("""()=>{const b=G.battle;if(!b)return {gone:true};return {over:b.over,cmd:b.command,busy:b.commandBusy,actor:b.actorId,hp:b.foes.map(f=>f.hp)}}""")
        if st.get('gone'): return 'gone'
        if st.get('over'):
            if outcome == 'lose' and st['over'] == 'win': pass
            pg.wait_for_timeout(500)
            return st['over']
        if outcome == 'lose':   # make the foes deadly so we can show the retry path
            pg.evaluate("G.battle.foes.forEach(f=>{f.atk=[400,500]});G.battle.youHp=Math.min(G.battle.youHp,3)")
        pg.evaluate("""()=>{const d=document.querySelector('dialog[open]');if(!d||G.battle?.over)return;
          if(G.battle.command){const f=[...d.querySelectorAll('[data-foe-id]')].find(e=>!e.classList.contains('down'));if(f)f.click();return;}
          const a=d.querySelector('[data-command="attack"]:not([disabled])');if(a)a.click();}""")
        pg.wait_for_timeout(350)
    return 'timeout'

with sync_playwright() as p:
    b, ctx, pg = setup(p, port, 390, 844, 2)
    # mobile feel: touch viewport via the context is fixed by setup(); the 390 CSS width is what matters for layout
    def run_one(id):
        zone, owner = {'sqGuard': ('th', 'guard'), 'sqKan': ('asia', 'kan'), 'sqBoon': ('west', 'boon')}[id]
        play_quest(pg, id, zone, owner, True)
        # Lose first (retry path), then win
        outcome = fight_until(pg, id, 'lose')
        res[f'{id}_lose_result'] = outcome
        shot(pg, f'{id}-4-lose-battle-390')
        pg.click('dialog[open] [data-fin]'); pg.wait_for_timeout(1500)
        res[f'{id}_lose_scene'] = pg.evaluate("[...document.querySelectorAll('dialog[open] .quest-fight-scene p, dialog[open] p')].map(p=>p.textContent)")
        shot(pg, f'{id}-5-lose-scene-390')
        pg.click('dialog[open] [data-quest-fight-next]'); pg.wait_for_timeout(1000)
        res[f'{id}_after_lose'] = state(pg, id)
        res[f'{id}_retry_buttons'] = pg.evaluate("[...document.querySelectorAll('dialog[open] button')].map(b=>b.textContent.trim())")
        shot(pg, f'{id}-6-retry-390')
        # retry
        pg.click('dialog[open] [data-quest-next]'); pg.wait_for_timeout(1200)
        pg.click('dialog[open] [data-quest-fight-go]'); pg.wait_for_timeout(2200)
        pg.evaluate("G.battle.foes.forEach(f=>{f.atk=[1,2];f.hp=f.maxHp=25})")   # the fight itself is balanced by the simulation (scripts/sim-quest-fights.mjs); here we only drive the UI to the end
        outcome = fight_until(pg, id, 'win')
        res[f'{id}_win_result'] = outcome
        shot(pg, f'{id}-7-win-battle-390')
        pg.click('dialog[open] [data-fin]'); pg.wait_for_timeout(1500)
        res[f'{id}_win_scene'] = pg.evaluate("[...document.querySelectorAll('dialog[open] .quest-fight-scene p, dialog[open] .quest-accepted')].map(p=>p.textContent)")
        shot(pg, f'{id}-8-win-scene-390')
        pg.click('dialog[open] [data-quest-fight-next]'); pg.wait_for_timeout(1000)
        res[f'{id}_after_win'] = state(pg, id)
        shot(pg, f'{id}-9-step4-390')
        # close the quest
        pg.click('dialog[open] [data-quest-next]'); pg.wait_for_timeout(900)
        res[f'{id}_closed'] = state(pg, id)
        res[f'{id}_receipt_rows'] = pg.evaluate("[...document.querySelectorAll('dialog[open] .quest-receipt .reward-row')].map(r=>r.textContent.replace(/\\s+/g,' ').trim())")
        res[f'{id}_receipt_overflow'] = overflow(pg)
        pg.wait_for_timeout(1000)
        shot(pg, f'{id}-10-receipt-390')
        # the skill is in the owner's move list
        res[f'{id}_skill_unlocked'] = pg.evaluate("""async(id)=>{const C=await import('./src/combat-skills.js');const F=await import('./src/quest-fights.js');const sk=F.QUEST_FIGHTS[id].skill;const def=C.COMBAT_SKILLS[sk];
          return {skill:sk,rosterId:def.rosterId,unlocked:C.questSkillUnlocked(G,sk)}}""", id)
        pg.keyboard.press('Escape'); pg.wait_for_timeout(500)
    for id in ids:
        try: run_one(id)
        except Exception as e:
            res[f'{id}_ERROR']=str(e)[:300]
            try: shot(pg,f'{id}-ERROR-390')
            except Exception: pass
            pg.evaluate("G.battle=null;document.querySelectorAll('dialog[open]').forEach(d=>d.close())")
    # journal preview (all quests) at 390
    pg.evaluate("__ui.openHelp('quests')"); pg.wait_for_timeout(900)
    shot(pg, 'journal-390'); res['journal_overflow'] = overflow(pg)
    res['journal_reward_lines'] = pg.evaluate("[...document.querySelectorAll('.quest-reward-line')].slice(0,6).map(p=>p.textContent)")
    res['errors'] = pg.errors[:8]
    b.close()
print(json.dumps(res, ensure_ascii=False, indent=1))
json.dump(res, open(HERE + 'e2e-result.json', 'w'), ensure_ascii=False, indent=1)
