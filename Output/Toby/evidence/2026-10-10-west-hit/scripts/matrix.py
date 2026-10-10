# ตาราง ชุด x ท่า : transform ที่วัดได้จริงของ .fig.you img ใน browser
# วัดทั้ง "ภาพที่แสดง" (src) และ "ทิศหันหน้าจริง" = transform x ทิศที่ภาพวาดมา (อ่านจากไฟล์ภาพ, ดู FACING ในไฟล์นี้)
from lib import *
import sys, json
label=sys.argv[1] if len(sys.argv)>1 else 'before'
W,H=(390,844)
EV='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/evidence/2026-10-10-west-hit/'
SAMPLER="""()=>{window.__s=[];const t0=performance.now();window.__iv=setInterval(()=>{const f=document.querySelector('.fig.you');const im=f&&f.querySelector('img:not(.fx)');if(!im)return;
 const cv=document.querySelector('.yama-sword-animation');
 window.__s.push({t:Math.round(performance.now()-t0),tr:getComputedStyle(im).transform,src:im.getAttribute('src').split('/').pop().split('?')[0],cv:!!cv,cls:f.className.replace('fig you','').trim()})},30)}"""
def compress(s):
    out=[];last=None
    for x in s:
        k=(x['tr'],x['src'],x['cv'])
        if k!=last: out.append(x); last=k
    return out
res={}
with sync_playwright() as p:
    for outfit in ['th','asia','west','cyberhell']:
        b,pg,logs=boot(p,W,H,mobile=True)
        dismiss_all(pg)
        pg.evaluate("""(o)=>{const g=window.G; g.outfitsOwned=['th','asia','west','cyberhell']; g.outfit=o; g.paused=true;}""",outfit)
        start_mob_battle(pg,outfit)
        pg.evaluate("document.querySelector('#atk').click()")
        pg.wait_for_selector('.combat-arena'); pg.wait_for_timeout(900)
        idle=pg.evaluate("(()=>{const im=document.querySelector('.fig.you img:not(.fx)');return {tr:getComputedStyle(im).transform,src:im.getAttribute('src')}})()")
        pg.evaluate(SAMPLER)
        # ฟันดาบธรรมดา แล้วรอศัตรูตอบโต้ (โดนตี) ให้ครบเทิร์น
        pg.evaluate("document.querySelector('[data-command=attack]').click()"); pg.wait_for_timeout(250)
        pg.evaluate("document.querySelector('[data-act=atk]').click()"); pg.wait_for_timeout(250)
        pg.evaluate("document.querySelector('.fig.foe[data-foe-id]').click()")
        pg.wait_for_timeout(5000)
        s=pg.evaluate("window.__s")
        res[outfit]={'idle':idle,'seq':compress(s)}
        print('==',outfit,'idle',idle)
        for x in compress(s): print('  ',x)
        b.close()
json.dump(res,open(EV+f'matrix-raw-{label}.json','w'),ensure_ascii=False,indent=1)
