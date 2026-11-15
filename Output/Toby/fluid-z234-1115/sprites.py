import sys, base64, io; sys.path.insert(0,'.')
from zrun import *
from PIL import Image
with sync_playwright() as p:
    b=p.chromium.launch(args=ARGS); pg=b.new_page(viewport={'width':400,'height':300}); pg.goto(BASE.replace('index.html','tests/blank.html')) if False else pg.goto(BASE); pg.wait_for_timeout(1500)
    js="""async()=>{const m=await import('./src/zone-clouds.js');const out={};
      for(const z of ['asia','west','cyberhell'])for(const kind of ['shadow','cloud']){let s=null;for(let i=0;i<10&&!Array.isArray(s);i++)s=kind==='shadow'?m.zoneShadowSprites(z):m.zoneCloudSprites(z);
        out[z+'-'+kind]=s.map(c=>c.toDataURL('image/png'));}return out}"""
    d=pg.evaluate(js); b.close()
rows=[]
W,H=256,128
sheet=Image.new('RGB',(W*6,H*6),(120,120,120))
r=0
for k,v in d.items():
    for i,u in enumerate(v):
        im=Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))).convert('RGBA')
        bg=Image.new('RGBA',im.size,(120,150,120,255)); bg.alpha_composite(im); sheet.paste(bg.convert('RGB'),(i*W,r*H))
    r+=1
sheet.save('work/sprites.png'); print(list(d))
