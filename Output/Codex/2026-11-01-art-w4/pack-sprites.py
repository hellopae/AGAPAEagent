from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,hashlib,shutil
out=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-11-01-art-w4');(out/'assets').mkdir(exist_ok=True);(out/'generated').mkdir(exist_ok=True)
files=json.loads((out/'generated-files.json').read_text());report=[];preview=Image.new('RGB',(1024,2*300),'#26333d');draw=ImageDraw.Draw(preview)
for i,(key,path) in enumerate(files.items()):
 src=Path(path)
 if not src.exists():src=out/'generated'/f'{key}.png'
 im=Image.open(src);assert im.mode=='RGBA',(key,im.mode);a=np.asarray(im)[:,:,3];assert (a==0).sum()>a.size*.1
 box=Image.fromarray((a>40).astype('uint8')*255).getbbox();assert box;assert box[0]>0 and box[1]>0 and box[2]<im.width and box[3]<im.height,(key,box,'source clipped')
 crop=im.crop(box);scale=min(508/crop.width,508/crop.height);size=(round(crop.width*scale),round(crop.height*scale));crop=crop.resize(size,Image.Resampling.NEAREST);sprite=Image.new('RGBA',(512,512));origin=((512-size[0])//2,512-size[1]);sprite.alpha_composite(crop,origin)
 target=out/'assets'/f'w4-{key}-v1.png';sprite.save(target);
 if src.resolve()!=(out/'generated'/f'{key}.png').resolve():shutil.copy2(src,out/'generated'/f'{key}.png')
 pixels=np.asarray(sprite);opaque=pixels[:,:,3]>40;ys,xs=np.where(opaque);assert ys.max()>=509 and abs((xs.min()+xs.max())/2-255.5)<3
 report.append({'key':key,'file':str(target),'size':[512,512],'mode':'RGBA','nativeSize':list(im.size),'nativeBounds':list(box),'uniformScale':scale,'bodySize':list(size),'origin':list(origin),'transparentFraction':float((pixels[:,:,3]==0).mean()),'opaqueBounds':[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)],'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'sourceSHA256':hashlib.sha256(src.read_bytes()).hexdigest(),'status':'review-only; not integrated'})
 x=(i%4)*256;y=(i//4)*300;thumb=sprite.resize((240,240),Image.Resampling.NEAREST);preview.paste(thumb,(x+8,y+30),thumb);draw.text((x+8,y+8),key,fill='white')
preview.save(out/'seven-characters-preview.png');(out/'asset-qa.json').write_text(json.dumps(report,indent=2)+'\n');print('Validated',len(report),'512x512 transparent review sprites')
