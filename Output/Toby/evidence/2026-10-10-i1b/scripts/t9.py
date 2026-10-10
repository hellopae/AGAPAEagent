from lib import *
import sys, json
w,h=int(sys.argv[1]),int(sys.argv[2]); tag=sys.argv[3]; outfit='th'
EV='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/evidence/2026-10-10-i1b/'
with sync_playwright() as p:
    b,pg,logs=boot(p,w,h,mobile=(w<700 or h<500))
    dismiss_all(pg)
    pg.evaluate("""(o)=>{const g=window.G; g.coin=5000; g.outfitsOwned=['th','asia','west','cyberhell']; g.outfit=o; g.paused=true; ['plerng','kan','boon'].forEach(k=>g.hire(k)); }""", outfit)
    start_mob_battle(pg,outfit)
    pg.evaluate("document.querySelector('#atk').click()")
    pg.wait_for_selector('.combat-arena'); pg.wait_for_timeout(500)
    pg.evaluate("""()=>{const g=window.G; g.hireGuard&&g.hireGuard(); const B=g.battle; B.kind='frontier'; B.wave=9; B.zone=g.zone; B.team=['plerng','kan','boon']; B.sub='ผู้บุกรุกระลอกที่ 9'; B.foes.forEach(f=>{f.hp=1}); document.querySelector('.fig.you').click();}""")
    pg.wait_for_timeout(900)
    print('team HUD cards:', pg.evaluate("document.querySelectorAll('.battle-team-hud .battle-portrait').length"))
    pg.evaluate("document.querySelector('[data-command=attack]').click()"); pg.wait_for_timeout(250)
    pg.evaluate("document.querySelector('[data-act=atk]').click()"); pg.wait_for_timeout(250)
    pg.evaluate("document.querySelector('.fig.foe[data-foe-id]').click()")
    pg.wait_for_function("document.querySelector('[data-fin]')", timeout=15000)
    pg.wait_for_timeout(1200)
    info=pg.evaluate("""()=>{const R=e=>{const r=e.getBoundingClientRect();return {l:Math.round(r.left),t:Math.round(r.top),r:Math.round(r.right),b:Math.round(r.bottom)}};
      const f=document.querySelector('[data-fin]'); const row=f.closest('.row'); const a=document.querySelector('.combat-arena');
      return {btn:R(f),row:R(row),arena:R(a),cards:[...document.querySelectorAll('.battle-team-hud .battle-portrait,.battle-boss-hud')].map(R),cls:row.className,fs:getComputedStyle(f).fontSize,minH:getComputedStyle(f).minHeight,vw:innerWidth}}""")
    print(json.dumps(info))
    ov=lambda a,b: a['l']<b['r'] and a['r']>b['l'] and a['t']<b['b'] and a['b']>b['t']
    print('overlaps cards:', [c for c in info['cards'] if ov(info['btn'],c)])
    pg.screenshot(path=EV+f'4-fin-button-{tag}.png')
    b.close()
