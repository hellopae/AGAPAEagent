import sys; sys.path.insert(0,'.')
from zrun import *
for qs in ('',):
    with sync_playwright() as p:
        b,pg,errs=boot(p,'west',qs,390,844,2)
        print(qs or 'new','battle right after boot:',pg.evaluate('!!G.battle'))
        look(pg,500,450,1500)
        t=[]
        for k in range(12):
            t.append(int(pg.evaluate('!!G.battle'))); pg.wait_for_timeout(500)
        print(' battle flags over 6 s:',t, errs[:2]); b.close()
