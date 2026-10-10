from lib import *
import sys, json
w,h=int(sys.argv[1]),int(sys.argv[2]); tag=sys.argv[3]
EV='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/evidence/2026-10-10-i1b/'
with sync_playwright() as p:
    b,pg,logs=boot(p,w,h,mobile=(w<700 or h<500))
    dismiss_all(pg)
    pg.evaluate("document.querySelector('#hud-bag').click()")
    pg.wait_for_timeout(600)
    # scroll weapon list into view
    pg.evaluate("document.querySelector('.weapon-list').scrollIntoView({block:'start'})")
    pg.wait_for_timeout(300)
    info=pg.evaluate("""()=>{const c=document.querySelector('.weapon-card');return {name:c.querySelector('b').textContent,note:c.querySelector('small').textContent,img:c.querySelector('img').getAttribute('src'),natural:c.querySelector('img').naturalWidth,expect:G.normalAttack(11)+'–'+G.normalAttack(19),level:G.level}}""")
    print(json.dumps(info,ensure_ascii=False))
    pg.screenshot(path=EV+f'1-bag-weapon-card-{tag}.png')
    # change level then reopen
    pg.evaluate("G.level=6; document.querySelector('[data-close]').click()")
    pg.wait_for_timeout(300)
    pg.evaluate("document.querySelector('#hud-bag').click()"); pg.wait_for_timeout(500)
    info2=pg.evaluate("""()=>{const c=document.querySelector('.weapon-card');return {note:c.querySelector('small').textContent,expect:G.normalAttack(11)+'–'+G.normalAttack(19),level:G.level}}""")
    print(json.dumps(info2,ensure_ascii=False))
    b.close()
