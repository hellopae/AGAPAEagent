from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,hashlib,shutil
from scipy.ndimage import label,binary_dilation,find_objects
root=Path('/Users/agapae/agapae-work/AVEGEE/.codex-worktrees/2026-11-01-art-mob-walk-west-cyber');out=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-11-01-art-mob-walk-west-cyber');(out/'generated').mkdir(exist_ok=True);(out/'previews').mkdir(exist_ok=True)
files=json.loads((out/'generated-files.json').read_text())
standingPaths={key:f'img/West/{key}-west.png' if key=='mob-skeleton' else f'img/CyberHell/{key}-cyberhell.png' for key in files}
report=[]
for key,file in files.items():
 src=Path('/Users/agapae/.codex/generated_images/01a1957c-6dc3-7d60-9284-a7d889765579')/file;shutil.copy2(src,out/'generated'/f'{key}.png');source=Image.open(src).convert('RGBA');standing=Image.open(root/standingPaths[key]).convert('RGBA');a=np.asarray(standing)[:,:,3];oldbox=Image.fromarray((a>40).astype('uint8')*255).getbbox();targetH=min(508,oldbox[3]-oldbox[1]);frames=[];details=[]
 # Extract the four whole disconnected characters, even when a sword/tail crosses a nominal quadrant.
 # This is registration/packing only; no semantic painting or replacement of body pixels.
 pixels=np.array(source);labels,n=label(pixels[:,:,3]>40);sizes=np.bincount(labels.ravel());sizes[0]=0
 ids=sorted(np.argsort(sizes)[-4:],key=lambda i:np.where(labels==i)[0].mean())
 top=sorted(ids[:2],key=lambda i:np.where(labels==i)[1].mean());bottom=sorted(ids[2:],key=lambda i:np.where(labels==i)[1].mean());cells=[]
 for component in top+bottom:
  assert sizes[component]>20000
  data=pixels.copy();keep=binary_dilation(labels==component,iterations=2);data[~keep]=0;cell=Image.fromarray(data)
  box=Image.fromarray((labels==component).astype('uint8')*255).getbbox();assert box[0]>0 and box[1]>0 and box[2]<source.width and box[3]<source.height,(key,box,'source clipped')
  cells.append((cell,box))
 commonScale=min(targetH/max(b[3]-b[1] for c,b in cells),508/max(b[2]-b[0] for c,b in cells))
 for i,(cell,box) in enumerate(cells):
  # Technical sheet extraction/registration only: no semantic painting, no frame duplication.
  crop=cell.crop(box);scale=commonScale;size=(round(crop.width*scale),round(crop.height*scale));crop=crop.resize(size,Image.Resampling.NEAREST)
  frame=Image.new('RGBA',(512,512));x=(512-crop.width)//2;y=512-crop.height;frame.alpha_composite(crop,(x,y));frames.append(frame)
  details.append({'frame':i,'sourceCell':cell.size,'sourceBounds':box,'bodySize':size,'origin':[x,y],'baseline':511,'sha256':hashlib.sha256(frame.tobytes()).hexdigest()})
 assert len(set(d['sha256'] for d in details))==4
 strip=Image.new('RGBA',(2048,512))
 for i,frame in enumerate(frames):strip.alpha_composite(frame,(i*512,0))
 strip.save(root/'img'/f'{key}-walk.png')
 # Preview at world-friendly sizes; transparent source is preserved in PNG.
 previews=[]
 for frame in frames:
  tile=Image.new('RGBA',(160,170),'#26333d');small=frame.resize((144,144),Image.Resampling.NEAREST);tile.alpha_composite(small,(8,18));previews.append(tile.convert('RGB'))
 previews[0].save(out/'previews'/f'{key}.gif',save_all=True,append_images=previews[1:],duration=180,loop=0)
 report.append({'key':key,'size':[2048,512],'cell':[512,512],'sourceNativeSize':source.size,'sourceSHA256':hashlib.sha256(src.read_bytes()).hexdigest(),'frames':details,'sheetSHA256':hashlib.sha256((root/'img'/f'{key}-walk.png').read_bytes()).hexdigest()})
(out/'sheet-qa.json').write_text(json.dumps(report,indent=2)+'\n')
review=Image.new('RGB',(1024,7*280),'#26333d');d=ImageDraw.Draw(review)
for row,entry in enumerate(report):
 d.text((10,row*280+5),entry['key'],fill='white');strip=Image.open(root/'img'/f"{entry['key']}-walk.png").resize((1024,256),Image.Resampling.NEAREST);review.paste(strip,(0,row*280+24),strip)
review.save(out/'seven-enemies-frames.png')
p=root/'src/enemy-walk-assets.js';s=p.read_text().replace("  // 'mob-pret',",'\n'.join(f"  '{key}'," for key in files));p.write_text(s)
p=root/'index.html';s=p.read_text();import re
# New strips need an invalidated enemy-walk registry; add its import-map entry if absent.
if '"./src/enemy-walk-assets.js"' in s:s=re.sub(r'("\./src/enemy-walk-assets.js": "\./src/enemy-walk-assets.js\?v=)[^\"]+',r'\g<1>20261101-art-mob-walk-west-cyber',s)
else:s=s.replace('  "imports": {','  "imports": {\n    "./src/enemy-walk-assets.js": "./src/enemy-walk-assets.js?v=20261101-art-mob-walk-west-cyber",')
p.write_text(s)
print('Built',len(report),'four-frame sheets')
