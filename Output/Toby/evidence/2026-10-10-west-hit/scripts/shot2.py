# ภาพหลักฐาน 390x844 (x3): ชุดไซเบอร์เฮลล์ตอนใช้ลูกไฟ + ชุดปัจฉิมตอนโดนตี — ครอปที่ตัวยมฯ
import sys, os
from lib import *
from PIL import Image
tag=sys.argv[1]
EV='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/evidence/2026-10-10-west-hit/'
def setup(p,outfit):
    b,pg,logs=boot(p,390,844,mobile=True)
    dismiss_all(pg)
    pg.evaluate("""(o)=>{const g=window.G; g.outfitsOwned=['th','asia','west','cyberhell']; g.outfit=o; g.paused=true; try{g.mp=g.mpMax}catch(e){}}""",outfit)
    start_mob_battle(pg,outfit)
    pg.evaluate("document.querySelector('#atk').click()")
    pg.wait_for_selector('.combat-arena'); pg.wait_for_timeout(900)
    return b,pg
def clip(pg):
    r=pg.evaluate("(()=>{const r=document.querySelector('.fig.you img:not(.fx)').getBoundingClientRect();return {x:r.left-20,y:r.top-10,width:r.width+110,height:r.height+20}})()")
    r['x']=max(0,r['x']); r['y']=max(0,r['y']); return r
shots=[]
with sync_playwright() as p:
    # 1) ชุดปัจฉิม โดนตี
    b,pg=setup(p,'west')
    pg.evaluate("document.querySelector('[data-command=attack]').click()"); pg.wait_for_timeout(250)
    pg.evaluate("document.querySelector('[data-act=atk]').click()"); pg.wait_for_timeout(250)
    pg.evaluate("document.querySelector('.fig.foe[data-foe-id]').click()")
    pg.wait_for_function("document.querySelector('.fig.you.struck')",timeout=8000); pg.wait_for_timeout(100)
    pg.screenshot(path=EV+'_a.png',clip=clip(pg)); b.close()
    # 2) ไซเบอร์เฮลล์ ลูกไฟ
    b,pg=setup(p,'cyberhell')
    pg.evaluate("document.querySelector('[data-command=power]').click()"); pg.wait_for_timeout(250)
    pg.evaluate("document.querySelector('[data-act=fire]').click()"); pg.wait_for_timeout(250)
    pg.evaluate("document.querySelector('.fig.foe[data-foe-id]').click()")
    pg.wait_for_function("document.querySelector('.fig.you.lunge')",timeout=8000); pg.wait_for_timeout(1900)
    pg.screenshot(path=EV+'_b.png',clip=clip(pg)); b.close()
ims=[Image.open(EV+f).convert('RGB') for f in ('_a.png','_b.png')]
h=max(i.height for i in ims); w=sum(i.width for i in ims)+10
s=Image.new('RGB',(w,h),(30,30,30)); x=0
for i in ims: s.paste(i,(x,0)); x+=i.width+10
s.save(EV+f'facing-{tag}.png')
for f in ('_a.png','_b.png'): os.remove(EV+f)
