from lib import *
import sys, json
w,h=int(sys.argv[1]),int(sys.argv[2]); tag=sys.argv[3]
EV='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/evidence/2026-10-10-i1b/'
with sync_playwright() as p:
    b,pg,logs=boot(p,w,h,mobile=(w<700 or h<500))
    dismiss_all(pg)
    pg.evaluate("""(o)=>{const g=window.G; g.coin=5000; g.outfit=o; g.paused=true; ['plerng','kan','boon'].forEach(k=>g.hire(k)); }""", 'th')
    start_mob_battle(pg,'th')
    pg.evaluate("document.querySelector('#atk').click()")
    pg.wait_for_selector('.combat-arena'); pg.wait_for_timeout(500)
    pg.evaluate("""()=>{const g=window.G; g.hireGuard&&g.hireGuard(); const B=g.battle; B.kind='frontier'; B.wave=9; B.zone=g.zone; B.team=['plerng','kan','boon']; document.querySelector('.fig.you').click();}""")
    pg.wait_for_timeout(1000)
    res={}
    actors=pg.evaluate("G.battleActors().map(c=>c.id)")
    res['actors']=actors
    for i,aid in enumerate(actors):
        pg.evaluate("(id)=>{const k=id==='you'?'you':id.split(':')[1]; const el=document.querySelector(`.combat-arena [data-crew-pick=\"${k}\"]`); el.click();}", aid)
        pg.wait_for_timeout(700)
        pr=pg.evaluate(WHEEL_PROBE)
        res[aid]={'wheel':pr['wheel'],'chars':pr['chars'],'active':pg.evaluate("document.querySelector('.command-center-label').textContent")}
        pg.screenshot(path=EV+f'2-wheel-{tag}-{aid}.png')
    print(json.dumps(res,ensure_ascii=False))
    b.close()
