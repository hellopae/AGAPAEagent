import sys, json, os
from playwright.sync_api import sync_playwright
port, label, outdir = sys.argv[1], sys.argv[2], sys.argv[3]
only = sys.argv[4].split(',') if len(sys.argv) > 4 and sys.argv[4] else None
sizes = [(1280, 800), (1440, 900)] + ([(390, 844)] if len(sys.argv) > 5 and sys.argv[5] == 'm' else [])
os.makedirs(outdir, exist_ok=True)
EXP_UI = "\nwindow.__t={g,dlg,openBattle,openMerchant,openNiraOffice,refresh,heroFace,artUrl,fitBattleSprites,playActionCutscene,ZONE_EVENTS,ZONES,getLang,setLang};\n"
EXP_GAME = "\nwindow.__mk=mkCrew;\n"
def route(exp):
    def f(r):
        resp = r.fetch()
        r.fulfill(response=resp, body=resp.text()+exp, headers={'content-type':'text/javascript','cache-control':'no-store'})
    return f

SETUP = """
(zone)=>{
 const t=window.__t, g=t.g;
 g.battle=null; g.zone=zone; g.over=false;
 const has=k=>g.crew.some(c=>c.k===k);
 for(const k of ['plerng','kan','boon']) if(!has(k)) g.crew.push(window.__mk(window.__CREWDEF.find(c=>c.k===k), zone));
 g.crew.forEach(c=>{c.helpReadyAt=0;c.morale=100}); g.guard={x:0,y:0,helpReadyAt:0}; g.party={members:['plerng','boon'],guard:false};
 g.guard={x:0,y:0};
 g.mp=g.mpMax; g.hp=g.hpMax;
 g.zoneCaptivesFree = ()=>true; g.outfit = zone;
 g.abilities=Object.assign({}, g.abilities, {rage:true,bigFire:true,flameCharge:true,windFan:true,valkyrieSpear:true,cooldownClock:true,ice:true,hypno:true});
 g.inventory={...g.inventory, health:3, holyWater:2, tea:1};
}
"""
results = []
def run():
    with sync_playwright() as p:
        b = p.chromium.launch()
        for (W, H) in sizes:
            ctx = b.new_context(viewport={'width': W, 'height': H}); pg = ctx.new_page()
            errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.route('**/src/ui.js', route(EXP_UI)); pg.route('**/src/game.js', route(EXP_GAME))
            pg.goto(f'http://localhost:{port}/index.html'); pg.wait_for_timeout(2500)
            assert pg.evaluate("!!window.__t"), 'no hook'
            pg.evaluate("import('./src/data.js').then(m=>{window.__CREWDEF=m.CREW;})"); pg.wait_for_timeout(300)
            def reset(zone):
                pg.evaluate("(()=>{const d=document.querySelector('#dlg'); if(d.open) d.close();})()")
                pg.evaluate(SETUP, zone)
            def shot(name):
                pg.wait_for_timeout(700)
                fn = f"{outdir}/{label}-{name}-{W}.png"; pg.screenshot(path=fn); print('shot', fn, flush=True)
            def boss(zone):
                reset(zone)
                pg.evaluate("(()=>{const g=__t.g; g.bossReady=()=>true; g.startZoneBoss(); __t.openBattle(()=>{});})()")
                pg.wait_for_timeout(900)
            def event(zone, key, wave=None, rest=False):
                reset(zone)
                pg.evaluate("""([key,wave,rest])=>{const g=__t.g; (g.zoneEvents[g.zone] ||= {})[key]='pending'; g.startZoneEvent(key);
                  if(wave){const ev=__t.ZONE_EVENTS[g.zone].find(e=>e.k===key); const b=g.battle;
                    if(rest){ b.wave=wave-1; b.pendingWave=wave; b.foes.forEach(f=>f.hp=0); b.storyInterlude=null; b.foes=b.foes.map(f=>({...f,hp:0}));}
                    else { b.wave=wave-1; b.pendingWave=wave; g.advanceZoneEventWave(true); b.storyInterlude=null; } }
                  __t.openBattle(()=>{});}""", [key, wave, rest])
                pg.wait_for_timeout(900)
            ns = dict(pg=pg, W=W, H=H, shot=shot, boss=boss, event=event, reset=reset, results=results, errs=errs)
            d=dict(globals()); d.update(ns); exec(open('/private/tmp/claude-501/-Users-agapae-Documents-Work-PAE-Claude-AGAPAE-Agent/c4cb3024-87da-4150-902a-d02026e89cde/scratchpad/scen_i.py').read(), d)
            d['main']()
            print('errors', W, errs[:5])
            ctx.close()
        b.close()
run()
json.dump(results, open(f'{outdir}/{label}-results.json', 'w'), ensure_ascii=False, indent=1)
