"""shared helpers for the QUEST-REWARDS e2e scripts"""
HERE = '/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/quest-rewards-1110/'
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

