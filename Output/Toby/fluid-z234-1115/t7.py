import sys, os; sys.path.insert(0,'.')
from zrun import *
with sync_playwright() as p:
    b,pg,errs=boot(p,'west',sys.argv[1] if len(sys.argv)>1 else '',390,844,2)
    print('after boot dialogs:',pg.evaluate("[...document.querySelectorAll('dialog[open]')].map(d=>d.id+'|'+d.textContent.trim().slice(0,70))"), 'paused',pg.evaluate("G.paused"))
    pg.evaluate("([x,y])=>{G.player.x=x;G.player.y=y;G.player.tx=x;G.player.ty=y}",[500,450]); pg.wait_for_timeout(3000)
    print('after teleport dialogs:',pg.evaluate("[...document.querySelectorAll('dialog[open]')].map(d=>d.id+'|'+d.textContent.trim().slice(0,70))"),'paused',pg.evaluate("G.paused"),'battle',pg.evaluate("!!G.battle"))
    b.close()
