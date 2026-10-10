import sys, json, time
from playwright.sync_api import sync_playwright
URL='http://localhost:8811/index.html'
def boot(p, w, h, outfit='th', zone=None, mobile=False):
    b=p.chromium.launch()
    ctx=b.new_context(viewport={'width':w,'height':h}, device_scale_factor=1, has_touch=mobile, is_mobile=mobile)
    pg=ctx.new_page()
    logs=[]
    pg.on('console', lambda m: logs.append(m.text))
    pg.on('pageerror', lambda e: logs.append('ERR '+str(e)))
    pg.add_init_script("sessionStorage.setItem('avegee.fresh','1');sessionStorage.setItem('avegee.audioUnlocked','1')")
    pg.goto(URL+'?bust='+str(time.time()))
    pg.wait_for_function("window.G && document.documentElement.dataset.bootReady==='true'", timeout=60000)
    pg.wait_for_timeout(1500)
    return b, pg, logs
def start_mob_battle(pg, outfit='th'):
    pg.evaluate("""(o)=>{ const g=window.G; g.outfitsOwned=['th','asia','west','cyberhell']; g.outfit=o; g.paused=true; g.spawnMob(); const m=g.mobs[g.mobs.length-1]; g.player.x=m.x; g.player.y=m.y; }""", outfit)
    pg.wait_for_timeout(300)
def enter_battle(pg, outfit='th'):
    pg.evaluate("document.querySelector('#intro-skip')?.click()")
    for _ in range(8):
        pg.wait_for_timeout(300)
        if not pg.evaluate("document.querySelector('dialog').open"): break
        pg.evaluate("(()=>{const d=document.querySelector('dialog');const b=[...d.querySelectorAll('button')].find(x=>/รับทราบ|ปิด|ตกลง|ต่อไป|ถัดไป/.test(x.textContent)); if(b) b.click(); else d.close();})()")
    start_mob_battle(pg, outfit)
    pg.evaluate("document.querySelector('#atk').click()")
    pg.wait_for_selector('.combat-arena', timeout=10000)
    pg.wait_for_timeout(800)
def slash(pg):
    pg.evaluate("document.querySelector('[data-command=attack]').click()"); pg.wait_for_timeout(250)
    pg.evaluate("document.querySelector('[data-act=atk]').click()"); pg.wait_for_timeout(250)
    r=pg.evaluate("(()=>{const e=document.querySelector('.fig.foe[data-foe-id]'); if(e){e.click(); return true} return false})()")
    return r
PROBE="""()=>{const im=document.querySelector('.fig.you img:not(.fx)'); const f=document.querySelector('.fig.you'); const cv=document.querySelector('.yama-sword-animation');
 return {cls:f.className, tr:getComputedStyle(im).transform, vis:getComputedStyle(im).visibility, src:im.getAttribute('src'), canvas:!!cv, frame:cv&&cv.dataset.frame, imgcls:im.className}}"""
def dismiss_all(pg):
    pg.evaluate("document.querySelector('#intro-skip')?.click()")
    for _ in range(8):
        pg.wait_for_timeout(300)
        if not pg.evaluate("document.querySelector('dialog').open"): break
        pg.evaluate("(()=>{const d=document.querySelector('dialog');const b=[...d.querySelectorAll('button')].find(x=>/รับทราบ|ปิด|ตกลง|ต่อไป|ถัดไป/.test(x.textContent)); if(b) b.click(); else d.close();})()")
def full_team_battle(pg, outfit='th'):
    dismiss_all(pg)
    pg.evaluate("""(o)=>{const g=window.G; g.outfitsOwned=['th','asia','west','cyberhell']; g.outfit=o; g.paused=true;
      g.hireCrew && 0; }""", outfit)
def team_battle(pg, outfit='th', guard=True):
    dismiss_all(pg)
    pg.evaluate("""(o)=>{const g=window.G; g.coin=5000; g.outfitsOwned=['th','asia','west','cyberhell']; g.outfit=o; g.paused=true;
      ['plerng','kan','boon'].forEach(k=>g.hire(k)); }""", outfit)
    start_mob_battle(pg, outfit)
    pg.evaluate("document.querySelector('#atk').click()")
    pg.wait_for_selector('.combat-arena', timeout=10000)
    if guard:
        pg.evaluate("window.G.hireGuard && window.G.hireGuard()")
        pg.evaluate("document.querySelector('.fig.you').click()")
    pg.wait_for_timeout(900)
WHEEL_PROBE="""()=>{const R=e=>{const r=e.getBoundingClientRect();return {l:Math.round(r.left),t:Math.round(r.top),r:Math.round(r.right),b:Math.round(r.bottom)}};
 const w=document.querySelector('.actor-wheel'); const art=[...w.querySelectorAll('.actor-segment img')].map(R);
 const vis={l:Math.min(...art.map(a=>a.l)),t:Math.min(...art.map(a=>a.t)),r:Math.max(...art.map(a=>a.r)),b:Math.max(...art.map(a=>a.b))};
 const opts=[...w.querySelectorAll('.command-options.is-open')].map(R);
 const chars=[...document.querySelectorAll('.combat-arena .fig.you img:not(.fx), .battle-squad img, .fig.helper img')].map(R);
 return {vw:innerWidth,vh:innerHeight,wheel:vis,opts,chars,arena:R(document.querySelector('.combat-arena'))}}"""
