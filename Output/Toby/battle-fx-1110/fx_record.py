"""BATTLE-FX evidence videos (390x844, dsf 2). usage: fx_record.py <port> <scenario> [seconds]
scenario: normal | lord | boss   -> plays the real battle UI with auto-attack, records video + logs every boss cutscene start / hit effect
"""
import sys,json,time,os,glob
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
import harness
from harness import *
OUT2='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/battle-fx-1110/'
port,scn=sys.argv[1],sys.argv[2]; secs=float(sys.argv[3]) if len(sys.argv)>3 else 25
vdir=OUT2+'video-'+scn+'/'; os.makedirs(vdir,exist_ok=True)
for f in glob.glob(vdir+'*'): os.remove(f)
START={
 'normal':"""async()=>{const g=G;g.hire('taan');g.hire('boon');g.party.members=['taan','boon'];g.hireGuard();g.frontierOf().team=['taan','boon'];
   let n=0;g.battle=null;while(n++<300){const b=g.startFrontierBattle({kindIdx:0,level:2,id:1});if(b&&b.frontierCount===2)break;g.battle=null;}
   g.battle.youHp=g.battle.youMax=900;const {openBattle}=__ui;openBattle();return g.battle.kind}""",
 'three':"""async()=>{const g=G;g.hire('taan');g.hire('boon');g.party.members=['taan','boon'];g.hireGuard();g.frontierOf().team=['taan','boon'];
   let n=0;g.battle=null;while(n++<300){const b=g.startFrontierBattle({kindIdx:0,level:2,id:1});if(b&&b.frontierCount===3)break;g.battle=null;}
   g.battle.youHp=g.battle.youMax=900;const {openBattle}=__ui;openBattle();return g.battle.kind}""",
 'lord':"""async()=>{const g=G;g.hire('taan');g.hire('boon');g.party.members=['taan','boon'];g.hireGuard();g.frontierOf().team=['taan','boon'];
   let n=0;g.battle=null;while(n++<300){const b=g.startFrontierBattle({kindIdx:0,level:2,id:1});if(b&&b.frontierCount===2)break;g.battle=null;}
   g.battle.foes[0].boss=true;g.battle.foes[0].hp=g.battle.foes[0].maxHp=300;g.battle.youHp=g.battle.youMax=900;const {openBattle}=__ui;openBattle();return g.battle.kind}""",
 'boss':"""async()=>{const g=G;g.hire('taan');g.hire('boon');g.party.members=['taan','boon'];g.hireGuard();g.frontierOf().team=['taan','boon'];
   for(const ev of Object.keys(g.zoneEvents.th))g.zoneEvents.th[ev]='cleared';g.bossGuarding.th=true;g.legacyBossGate=true;
   const b=g.startZoneBoss('alert');if(!b)return 'no boss';b.youHp=b.youMax=900;const {openBattle}=__ui;openBattle();return b.kind+'/'+b.foes.map(f=>f.boss?'B':'n').join('')}""",
}[scn]
with sync_playwright() as p:
    b=p.chromium.launch(args=ARGS)
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True,record_video_dir=vdir,record_video_size={'width':390,'height':844})
    ctx.add_init_script(MEM); ctx.add_init_script(INSTR)
    pg=ctx.new_page(); pg.errors=[]; pg.on('pageerror',lambda e:pg.errors.append(str(e)))
    import re
    def fix(route):
        r=route.fetch(); body=r.text()
        body=re.sub(r'src="src/ui\.js\?[^"]*"','src="src/ui.js"',body)
        body=body.replace('</body>','<script type="module">window.__ui=await import("./src/ui.js");</script></body>')
        route.fulfill(response=r,body=body)
    pg.route(re.compile(r'.*/index\.html(\?.*)?$'),fix)
    t0=time.time()
    pg.goto(f'http://127.0.0.1:{port}/index.html'); pg.wait_for_timeout(2500)
    for _ in range(8):
        if pg.is_visible('#t-start') and not pg.is_visible('#enter-gate'): break
        for sel in ('#splash-skip','#enter-button'):
            if pg.is_visible(sel):
                try: pg.click(sel,timeout=2000)
                except Exception: pass
        pg.wait_for_timeout(700)
    pg.click('#t-start'); pg.wait_for_timeout(1200)
    pg.click('dialog[open] button:has-text("SLOT 1")'); pg.wait_for_timeout(2500)
    for _ in range(6):
        if pg.is_visible('#intro-skip'): pg.click('#intro-skip'); pg.wait_for_timeout(800)
        if pg.evaluate("!!document.querySelector('dialog[open]')"): pg.keyboard.press('Escape'); pg.wait_for_timeout(500)
    pg.wait_for_timeout(1500)
    pg.evaluate("G.save=()=>true;G.coin=10000")
    pg.evaluate("""()=>{window.__ev=[];const t0=performance.now();window.__t0=t0;
      new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.classList&&n.classList.contains('action-cutscene'))window.__ev.push(['cutscene',Math.round(performance.now()-t0),n.className,n.querySelector('.cutscene-title')?.textContent])}}).observe(document.body,{childList:true,subtree:true});}""")
    pg.evaluate("""async()=>{const fx=await import('./src/battle-fx.js?v=m2');window.__fxlog=[];let n=0;
      setInterval(()=>{const l=fx.fxStats().log||[];while(n<l.length){window.__fxlog.push([Math.round(performance.now()-window.__t0),l[n]]);n++}},30);}""")
    print('start',pg.evaluate(START)); tstart=time.time()-t0
    pg.wait_for_timeout(2000)
    end=time.time()+secs; acts=0
    while time.time()<end:
        pg.evaluate("""()=>{const d=document.querySelector('dialog[open]');if(!d)return;
          const go=[...d.querySelectorAll('button')].find(b=>/เข้าสู้/.test(b.textContent)&&!b.disabled);if(go){go.click();return;}
          const a=d.querySelector('[data-command="attack"]:not([disabled])');const f=d.querySelector('[data-foe-id]');
          if(G.battle&&G.battle.command&&f){f.click();} else if(a){a.click();}}""")
        pg.wait_for_timeout(150)
    info=pg.evaluate("({ev:window.__ev,b:G.battle?{turn:G.battle.turn,ult:G.battle.ultimateActs,over:G.battle.over,foes:G.battle.foes.map(f=>[f.who,f.hp,f.attacks||0])}:null,fx:window.__fxlog||null})")
    info['t0abs_ms']=pg.evaluate('window.__t0'); info['t_start_s']=round(tstart,2); info['errors']=pg.errors[:5]
    print(json.dumps(info,ensure_ascii=False))
    ctx.close(); b.close()
vids=glob.glob(vdir+'*.webm')
print(vids)
