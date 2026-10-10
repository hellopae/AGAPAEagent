# ตาราง ชุด x ท่า ในฉากต่อสู้ (390x844): วัด transform ของ .fig.you img ทุกเฟรม แล้วจัดกลุ่มตามไฟล์ภาพที่แสดงอยู่
# ท่า: ยืน / ฟันดาบธรรมดา / สกิล (ลูกไฟ -> ท่า atk) / rage (ท่าชาร์จ) / โดนตี(cry) / โดนตีตอน rage ค้าง
import sys, json
from lib import *
label=sys.argv[1] if len(sys.argv)>1 else 'before'
W,H=(int(sys.argv[2]),int(sys.argv[3])) if len(sys.argv)>3 else (390,844)
EV='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/evidence/2026-10-10-west-hit/'
SAMPLER="""()=>{window.__s=[];const t0=performance.now();clearInterval(window.__iv);window.__iv=setInterval(()=>{const f=document.querySelector('.fig.you');const im=f&&f.querySelector('img:not(.fx)');if(!im)return;
 const cv=document.querySelector('.yama-sword-animation');
 window.__s.push({tr:getComputedStyle(im).transform,src:im.getAttribute('src').split('/').pop().split('?')[0],cv:!!cv,cls:f.className.replace('fig you','').trim()})},25)}"""
def uniq(s):
    seen=[];
    for x in s:
        k=(x['src'],x['tr'],x['cv'],x['cls'])
        if k not in seen: seen.append(k)
    return seen
def newbattle(p,outfit,rage=False):
    b,pg,logs=boot(p,W,H,mobile=True)
    dismiss_all(pg)
    pg.evaluate("""([o,r])=>{const g=window.G; g.outfitsOwned=['th','asia','west','cyberhell']; g.outfit=o; g.paused=true; try{g.mp=g.mpMax}catch(e){} g.abilities=g.abilities||{}; g.abilities.rage=true; g.discoveryQueue=[];}""",[outfit,rage])
    for _ in range(4):
        pg.wait_for_timeout(900); dismiss_all(pg)
    start_mob_battle(pg,outfit)
    pg.evaluate("document.querySelector('#atk').click()")
    pg.wait_for_selector('.combat-arena'); pg.wait_for_timeout(900)
    return b,pg
def run(pg,cmd,act,secs=5200):
    pg.evaluate(SAMPLER)
    pg.evaluate(f"document.querySelector('[data-command={cmd}]').click()"); pg.wait_for_timeout(250)
    pg.evaluate(f"document.querySelector('[data-act={act}]').click()"); pg.wait_for_timeout(250)
    pg.evaluate("(()=>{const e=document.querySelector('.fig.foe[data-foe-id]'); if(e) e.click();})()")
    pg.wait_for_timeout(secs)
    return uniq(pg.evaluate("window.__s"))
res={}
with sync_playwright() as p:
    for outfit in ['th','asia','west','cyberhell']:
        r={}
        b,pg=newbattle(p,outfit)
        r['idle']=pg.evaluate("(()=>{const im=document.querySelector('.fig.you img:not(.fx)');return [[im.getAttribute('src').split('/').pop(),getComputedStyle(im).transform]]})()")
        r['sword']=run(pg,'attack','atk'); b.close()
        b,pg=newbattle(p,outfit); r['fire']=run(pg,'power','fire'); b.close()
        b,pg=newbattle(p,outfit); r['rage+after']=run(pg,'power','rage',9000); b.close()
        res[outfit]=r
        print('=====',outfit)
        for k,v in r.items():
            print(' --',k)
            for x in v: print('    ',x)
json.dump(res,open(EV+f'matrix-raw-{label}-{W}.json','w'),ensure_ascii=False,indent=1)
