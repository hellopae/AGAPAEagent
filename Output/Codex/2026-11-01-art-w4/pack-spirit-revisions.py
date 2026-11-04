from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,hashlib,shutil
out=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-11-01-art-w4');source=Path('/Users/agapae/.codex/generated_images/01a1957c-6dc3-7d60-9284-a7d889765579');files={'sita':'exec-23156e19-0dbf-43d8-8fd9-516abfdb864f.png','huaguoshan-monkey':'exec-9998bd65-9bf5-4a97-a359-0c37949be920.png'};qa=[]
for key,file in files.items():
 src=source/file;im=Image.open(src);assert im.mode=='RGBA';a=np.array(im)[:,:,3];assert np.count_nonzero(a==0)>a.size*.1
 box=Image.fromarray((a>4).astype('uint8')*255).getbbox();body=Image.fromarray((a>40).astype('uint8')*255).getbbox();assert body[0]>0 and body[1]>0 and body[2]<im.width and body[3]<im.height
 crop=im.crop(box);scale=min(500/crop.width,500/crop.height);size=tuple(round(v*scale) for v in crop.size);crop=crop.resize(size,Image.Resampling.NEAREST);sprite=Image.new('RGBA',(512,512));origin=((512-size[0])//2,510-size[1]);sprite.alpha_composite(crop,origin);dest=out/'assets'/f'w4-{key}-spirit-v2.png';sprite.save(dest);shutil.copy2(src,out/'generated'/f'{key}-spirit-v2.png');a=np.array(sprite)[:,:,3]
 qa.append({'key':key,'selectedFile':str(dest),'sourceFile':str(src),'size':[512,512],'mode':'RGBA','sourceBounds':list(box),'uniformScale':scale,'origin':origin,'transparentPixels':int((a==0).sum()),'semiTransparentPixels':int(((a>0)&(a<255)).sum()),'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'sourceSHA256':hashlib.sha256(src.read_bytes()).hexdigest(),'meaning':'deceased soul; punishment ledger entry incorrect','integration':'review-only, no game code'})
(out/'spirit-revision-qa.json').write_text(json.dumps(qa,indent=2)+'\n')
selected={e['key']:e['file'] for e in json.loads((out/'asset-qa.json').read_text())};selected.update({e['key']:e['selectedFile'] for e in qa});(out/'selected-assets.json').write_text(json.dumps(selected,indent=2)+'\n')
old=out/'seven-characters-preview.png';backup=out/'seven-characters-preview-v1.png'
if not backup.exists():shutil.copy2(old,backup)
preview=Image.new('RGB',(1024,600),'#26333d');d=ImageDraw.Draw(preview)
for i,(key,file) in enumerate(selected.items()):
 im=Image.open(file).convert('RGBA').resize((240,240),Image.Resampling.NEAREST);x=i%4*256;y=i//4*300;preview.paste(im,(x+8,y+30),im);d.text((x+8,y+8),key+(' (spirit)' if key in files else ''),fill='white')
preview.save(out/'seven-characters-preview.png')
cv=Image.new('RGB',(768,560),'#26333d');d=ImageDraw.Draw(cv)
for i,key in enumerate(files):
 im=Image.open(selected[key]).convert('RGBA').resize((500,500),Image.Resampling.NEAREST);im.thumbnail((360,500));x=i*384+(384-im.width)//2;cv.paste(im,(x,40),im);d.text((i*384+16,12),key+' / spirit v2',fill='white')
cv.save(out/'two-spirits-preview.png')
compare=Image.new('RGB',(1024,560),'#26333d');d=ImageDraw.Draw(compare)
for row,key in enumerate(files):
 for col,file in enumerate([out/'assets'/f'w4-{key}-v1.png',Path(selected[key])]):
  im=Image.open(file).convert('RGBA').resize((250,250),Image.Resampling.NEAREST);x=col*512+130;y=row*280+25;compare.paste(im,(x,y),im);d.text((col*512+8,row*280+8),key+(' / original' if col==0 else ' / spirit v2'),fill='white')
compare.save(out/'spirit-before-after.png');print('2 spirit revisions validated; selected seven-character preview refreshed')
