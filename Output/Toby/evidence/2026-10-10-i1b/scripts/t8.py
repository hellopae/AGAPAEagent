from lib import *
import sys, json
outfit=sys.argv[1]; weapon=sys.argv[2] if len(sys.argv)>2 else ''
EV='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/evidence/2026-10-10-i1b/'
SAMPLER="""()=>{window.__s=[];const t0=performance.now();window.__iv=setInterval(()=>{const im=document.querySelector('.fig.you img:not(.fx)');if(!im)return;const cv=document.querySelector('.yama-sword-animation');
 window.__s.push({t:Math.round(performance.now()-t0),tr:getComputedStyle(im).transform==='none'?'none':getComputedStyle(im).transform.split(',')[0],vis:getComputedStyle(im).visibility,cv:!!cv,fr:cv&&cv.dataset.frame,cls:document.querySelector('.fig.you').className.replace('fig you','').trim()})},40)}"""
with sync_playwright() as p:
    b,pg,logs=boot(p,1280,720)
    dismiss_all(pg)
    pg.evaluate("""([o,w])=>{const g=window.G; g.outfitsOwned=['th','asia','west','cyberhell']; g.outfit=o; g.paused=true; if(w){g.weapons=g.weapons||{owned:{},equipped:null}; g.weapons.owned=g.weapons.owned||{}; g.weapons.owned[w]=true; g.weapons.equipped=w;} }""",[outfit,weapon])
    start_mob_battle(pg,outfit)
    pg.evaluate("document.querySelector('#atk').click()")
    pg.wait_for_selector('.combat-arena'); pg.wait_for_timeout(900)
    before=pg.evaluate(PROBE)
    pg.evaluate("document.querySelector('[data-command=attack]').click()"); pg.wait_for_timeout(250)
    pg.evaluate("document.querySelector('[data-act=atk]').click()"); pg.wait_for_timeout(250)
    pg.evaluate(SAMPLER)
    pg.evaluate("document.querySelector('.fig.foe[data-foe-id]').click()")
    pg.wait_for_timeout(1000)
    tag=f"{outfit}{'-'+weapon if weapon else ''}"
    box=pg.evaluate("(()=>{const r=document.querySelector('.fig.you').getBoundingClientRect();return {x:Math.max(0,r.left-60),y:Math.max(0,r.top-80),width:r.width+260,height:r.height+120}})()")
    pg.screenshot(path=EV+f'3-facing-{tag}-after.png', clip=box)
    pg.wait_for_timeout(1500)
    s=pg.evaluate("window.__s")
    # compress
    out=[];last=None
    for x in s:
        k=(x['tr'],x['vis'],x['cv'],x['cls'])
        if k!=last: out.append(x); last=k
    print(outfit,weapon,'idle:',before['tr'],before['src'],before['imgcls'])
    for x in out: print('  ',x)
    bad=[x for x in s if x['vis']=='visible' and not x['cv'] and 'atk' in x['cls'].split()]
    print('standing-with-.atk samples:',len(bad), '| mirror values seen while standing visible:', sorted({x['tr'] for x in s if x['vis']=='visible' and not x['cv']}))
    b.close()
