from e2e_lib import *
res={}
SK = {'sqKan': 'eyeAwaitingPermission', 'sqBoon': 'letterDelivered', 'sqGuard': 'gatekeeperStand'}

def start_fight(pg, id, zone, owner):
    goto_zone(pg, zone)
    pg.evaluate("""async([id,k])=>{const g=G;g.over=null;g.pendingReward=null;g.storyQueue=[];g.coin=5000;g.bossCleared={th:true,asia:true,west:true,cyberhell:true};g.gameCompleted=true;
      if(k==='guard'){g.hireGuard&&g.hireGuard();}else{g.hire(k);}for(const m of ['taan','dam']){try{g.hire(m)}catch(e){}}
      g.party.members=[k==='guard'?'taan':k,'taan','dam'].filter((v,i,a)=>a.indexOf(v)===i&&v!=='guard').slice(0,g.partyMax());g.hp=g.hpMax;
      const C=await import('./src/combat-skills.js');const F=await import('./src/quest-fights.js');C.unlockQuestSkill(g,F.QUEST_FIGHTS[id].skill);
      g.sideQuests[id]={step:3,choice:0,done:false,verdict:{right:true,privateOpened:false}};
      g.startQuestFight(id);g.battle.foes.forEach(f=>{f.hp=f.maxHp=f.maxHp*3;});__ui.openBattle();}""", [id, owner])
    pg.wait_for_timeout(2500)

def pass_turns_until(pg, owner_id, max_s=60):
    """foes act by themselves in the UI; for the other allies press the real Defend button so the whole loop is the player's loop."""
    import time
    t0 = time.time()
    while time.time() - t0 < max_s:
        cur = pg.evaluate("""()=>{const b=G.battle;if(!b||b.over)return null;const t=G.currentBattleTurn();return t?{side:t.side,id:t.id,busy:!!b.commandBusy}:null}""")
        if cur and cur['side'] == 'ally' and cur['id'] == owner_id and not cur['busy'] and pg.evaluate("!!document.querySelector('dialog[open] [data-command=power]:not([disabled])')"):
            pg.wait_for_timeout(600); return True
        if cur and cur['side'] == 'ally' and cur['id'] != owner_id and not cur['busy'] and pg.evaluate("!!document.querySelector('dialog[open] [data-command=defense]:not([disabled])')"):
            pg.click('dialog[open] [data-command="defense"]'); pg.wait_for_timeout(1500)
        pg.wait_for_timeout(300)
    return False

def cast_via_ui(pg, id, owner_id, tag):
    ok = pass_turns_until(pg, owner_id)
    res[f'{id}_reached_owner_turn'] = ok
    pg.wait_for_timeout(700)
    pg.click('dialog[open] [data-command="power"]'); pg.wait_for_timeout(700)
    shot(pg, f'{tag}-moves-menu-390')
    res[f'{id}_power_buttons'] = pg.evaluate("[...document.querySelectorAll('dialog[open] [data-act]')].map(b=>[b.dataset.act,b.disabled,b.textContent.trim().replace(/\\s+/g,' ')])")
    before = pg.evaluate("({foes:G.battle.foes.map(f=>f.hp),you:G.battle.youHp,allies:G.battleActors().map(a=>[a.id,a.morale])})")
    pg.click(f'dialog[open] [data-act="{SK[id]}"]'); pg.wait_for_timeout(500)
    if id == 'sqKan':   # reads one foe: pick it
        pg.evaluate("()=>{const f=document.querySelector('dialog[open] [data-foe-id]');if(f)f.click();}");
    pg.wait_for_timeout(900); shot(pg, f'{tag}-move-cast-390')
    pg.wait_for_timeout(2600); shot(pg, f'{tag}-move-after-390')
    after = pg.evaluate("({foes:G.battle.foes.map(f=>f.hp),you:G.battle.youHp,allies:G.battleActors().map(a=>[a.id,a.morale]),taunt:G.battle.taunt||null,sealed:G.battle.sealed||null,conf:G.battle.foes.map(f=>f.confuse),prot:Object.keys(G.battle.protection||{})})")
    res[f'{id}_cast'] = {'before': before, 'after': after, 'skillWhyAfter': pg.evaluate("(a)=>G.skillWhy(a[0],G.battleActors().find(x=>x.id===a[1]))", [SK[id], owner_id])}

