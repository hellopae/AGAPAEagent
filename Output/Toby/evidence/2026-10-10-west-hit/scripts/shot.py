# ภาพหลักฐาน: ตัวยมฯ ตอนยืน / ตอนโดนตี ทั้ง 4 ชุด (390x844) — จับตอน class struck ขึ้น
from lib import *
import sys
tag=sys.argv[1]
EV='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/evidence/2026-10-10-west-hit/'
from PIL import Image
with sync_playwright() as p:
    for outfit in ['th','asia','west','cyberhell']:
        b,pg,logs=boot(p,390,844,mobile=True)
        dismiss_all(pg)
        pg.evaluate("""(o)=>{const g=window.G; g.outfitsOwned=['th','asia','west','cyberhell']; g.outfit=o; g.paused=true;}""",outfit)
        start_mob_battle(pg,outfit)
        pg.evaluate("document.querySelector('#atk').click()")
        pg.wait_for_selector('.combat-arena'); pg.wait_for_timeout(900)
        def clip():
            r=pg.evaluate("(()=>{const r=document.querySelector('.fig.you img:not(.fx)').getBoundingClientRect();return {x:r.left-20,y:r.top-10,width:r.width+120,height:r.height+20}})()")
            r['x']=max(0,r['x']); r['y']=max(0,r['y']); return r
        pg.screenshot(path=EV+f'_t_{outfit}_idle.png',clip=clip())
        pg.evaluate("document.querySelector('[data-command=attack]').click()"); pg.wait_for_timeout(250)
        pg.evaluate("document.querySelector('[data-act=atk]').click()"); pg.wait_for_timeout(250)
        pg.evaluate("document.querySelector('.fig.foe[data-foe-id]').click()")
        pg.wait_for_function("document.querySelector('.fig.you.struck')",timeout=8000)
        pg.wait_for_timeout(120)
        pg.screenshot(path=EV+f'_t_{outfit}_cry.png',clip=clip())
        b.close()
ims=[]
for o in ['th','asia','west','cyberhell']:
    for k in ['idle','cry']:
        ims.append(Image.open(EV+f'_t_{o}_{k}.png').convert('RGB'))
h=max(i.height for i in ims); w=max(i.width for i in ims)
s=Image.new('RGB',(w*2,h*4),(40,40,40))
for n,i in enumerate(ims): s.paste(i,((n%2)*w,(n//2)*h))
s.save(EV+f'facing-{tag}.png')
import os
for o in ['th','asia','west','cyberhell']:
    for k in ['idle','cry']: os.remove(EV+f'_t_{o}_{k}.png')
