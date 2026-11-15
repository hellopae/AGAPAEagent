import sys; sys.path.insert(0,'.')
from zrun import *
zone=sys.argv[1]; x,y=float(sys.argv[2]),float(sys.argv[3]); out=sys.argv[4]
with sync_playwright() as p:
    b,pg,errs=boot(p,zone,'',390,844,2)
    look(pg,x,y,2500); print(pg.evaluate(STATS))
    pg.screenshot(path=out+'-shader.png')
    pg.wait_for_timeout(700); pg.screenshot(path=out+'-shader2.png')
    print(errs[:6]); b.close()
