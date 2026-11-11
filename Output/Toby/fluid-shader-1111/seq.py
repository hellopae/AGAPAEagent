"""usage: seq.py <label> <query> <view> n step_ms x,y,w,h  -> shots/<label>-<view>-seq-N.png + contact sheet"""
import sys,os
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
from PIL import Image
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-shader-1111/'
VIEWS={'fall':(918,737,3),'stream':(1010,860,2),'both':(950,800,2)}
label,qs,view,n,step,clip=sys.argv[1:7]; n=int(n); step=int(step); cx,cy,cw,chh=[int(v) for v in clip.split(',')]
os.environ['QS']=qs
with sync_playwright() as p:
    b,ctx,pg=setup(p,8942,1792,958,2)
    fx,fy,z=VIEWS[view]
    pg.evaluate("document.getElementById('town-overview').click()")
    for _ in range(z): pg.evaluate("document.getElementById('town-zoom-more').click()")
    pg.evaluate(f"G.mapTravel={{focus:{{x:{fx},y:{fy}}}}}")
    pg.wait_for_timeout(5000)
    ims=[]
    for i in range(n):
        f=OUTD+f'shots/{label}-{view}-seq-{i}.png'
        pg.screenshot(path=f,clip={'x':cx,'y':cy,'width':cw,'height':chh}); ims.append(Image.open(f)); pg.wait_for_timeout(step)
    cols=3; rows=(n+cols-1)//cols; w,h=ims[0].size
    sheet=Image.new('RGB',(w*cols,h*rows))
    for i,im in enumerate(ims): sheet.paste(im,((i%cols)*w,(i//cols)*h))
    sheet.save(OUTD+f'shots/{label}-{view}-sheet.png'); print('ok',sheet.size,pg.errors[:3]); b.close()
