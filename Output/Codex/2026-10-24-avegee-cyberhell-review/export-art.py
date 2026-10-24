from pathlib import Path
from PIL import Image,ImageDraw,ImageOps
import json,shutil
repo=Path('/Users/agapae/agapae-work/.codex-worktrees/cyberhell-art-20261024')
review=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-24-avegee-cyberhell-review')
art=review/'art'
specs=[
 ('tree','img/theme-v4/town-tree-th-v1.webp','img/theme-v4/town-tree-cyberhell-v1.webp'),
 ('thorn','img/theme-v4/town-tree-red-th-v1.webp','img/theme-v4/town-tree-b-cyberhell-v1.webp'),
 ('snow','img/theme-v4/town-tree-snow-th-v1.webp','img/theme-v4/town-tree-c-cyberhell-v1.webp'),
 ('landmark','img/theme-v4/town-palm-th-v1.webp','img/theme-v4/town-landmark-cyberhell-v1.webp'),
 ('judgment','img/theme-v4/town-judgment-th-v2.webp','img/theme-v4/town-judgment-cyberhell-v2.webp'),
 ('lamp','img/theme-v4/town-lamp-gold-th-v1.webp','img/theme-v4/town-lamp-cyberhell-v1.webp'),
 ('torch','img/map-zone1/torch-pillar-v1.webp','img/map-zone4/torch-pillar-v1.webp'),
 ('rock','img/map-zone1/prop-rock-v1.webp','img/map-zone4/prop-rock-v1.webp'),
 *[(k,'img/town-district/house-'+v+'-v1.webp','img/town-district/house-'+v+'-cyberhell-v1.webp') for k,v in [('house-front','front-one'),('house-right','right-one'),('house-left-two','left-two'),('house-right-two','right-two')]],
 *[(k,'img/map-v5/st-'+k+'-th-v2.webp',('img/theme-v4/' if k=='tea' else 'img/map-v5/')+'st-'+k+'-cyberhell-v2.webp') for k in ['sala','tea','sawan','krajok']],
]
inventory=[];comparison=Image.new('RGB',(1024,((len(specs)+3)//4)*500),'#192538');draw=ImageDraw.Draw(comparison)
for i,(key,reference,dest) in enumerate(specs):
 raw=art/(key+'-raw.png')
 if not raw.exists():continue
 old=Image.open(repo/reference).convert('RGBA');im=Image.open(raw).convert('RGBA')
 oldbox=old.getchannel('A').point(lambda v:255 if v>=8 else 0).getbbox();box=im.getchannel('A').point(lambda v:255 if v>=8 else 0).getbbox()
 assert box
 cropped=im.crop(box);w=oldbox[2]-oldbox[0];h=oldbox[3]-oldbox[1];ratio=min(w/cropped.width,h/cropped.height)
 scaled=cropped.resize((round(cropped.width*ratio),round(cropped.height*ratio)),Image.Resampling.LANCZOS)
 x=round((oldbox[0]+oldbox[2]-scaled.width)/2);y=oldbox[3]-scaled.height
 canvas=Image.new('RGBA',old.size);canvas.alpha_composite(scaled,(x,y))
 path=repo/dest;path.parent.mkdir(exist_ok=True)
 if not path.exists() or path.stat().st_size==0: canvas.save(path,'WEBP',quality=92,method=4)
 # Keep export counterpart outside game for edge/background inspection.
 canvas.save(art/(key+'-final.png'))
 actual=Image.open(path).convert('RGBA');newbox=actual.getchannel('A').point(lambda v:255 if v>=8 else 0).getbbox()
 inventory.append({'key':key,'reference':reference,'file':dest,'canvas':list(old.size),'reference_bbox_alpha8':list(oldbox),'raw_bbox_alpha8':list(box),'bbox_alpha8':list(newbox),'bottom_delta':newbox[3]-oldbox[3],'center_delta':(newbox[0]+newbox[2]-oldbox[0]-oldbox[2])/2,'alpha_extrema':actual.getchannel('A').getextrema(),'bytes':path.stat().st_size})
 cx=(i%4)*256;cy=(i//4)*500;draw.text((cx+8,cy+7),key+' / old then cyberhell',fill='white')
 for j,src in enumerate([old,actual]):
  thumb=ImageOps.contain(src,(240,220),Image.Resampling.LANCZOS);comparison.paste(thumb,(cx+(256-thumb.width)//2,cy+25+j*233+220-thumb.height),thumb)
 edges=Image.new('RGB',(768,280),'white')
 for j,color in enumerate(['#172336','#ffffff','#cc00cc']):
  bg=Image.new('RGBA',(256,280),color);thumb=ImageOps.contain(actual,(240,256),Image.Resampling.LANCZOS);bg.alpha_composite(thumb,((256-thumb.width)//2,280-thumb.height));edges.paste(bg.convert('RGB'),(j*256,0))
 edges.save(art/(key+'-edges.jpg'),quality=95)
comparison.save(review/'old-new-contact.jpg',quality=95)
(review/'art-inventory.json').write_text(json.dumps(inventory,indent=2)+'\n')
print('exported',len(inventory),'of',len(specs));print([(r['key'],r['bottom_delta'],r['center_delta']) for r in inventory])
