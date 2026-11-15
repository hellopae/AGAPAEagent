import sys, io, os; sys.path.insert(0,'.')
from zrun import *
import numpy as np
from PIL import Image
shots=[]
for base in ('http://127.0.0.1:8962/index.html','http://127.0.0.1:8961/index.html'):
    import zrun; zrun.BASE=base
    with sync_playwright() as p:
        b,pg,errs=boot(p,'th','?fluid=none',390,844,2)
        look(pg,700,800,3000); pg.evaluate("G.paused=true"); pg.wait_for_timeout(1500)
        shots.append(np.array(Image.open(io.BytesIO(pg.screenshot())).convert('RGB')).astype(int)); b.close()
d=np.abs(shots[0]-shots[1]).sum(2)
print('zone 1 paused: base vs now  mean abs diff %.3f  pixels differing >24: %.3f%%'%(d.mean(),100*(d>24).mean()))
