from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,hashlib,shutil
from scipy.ndimage import label,binary_dilation
root=Path('/Users/agapae/agapae-work/AVEGEE/.codex-worktrees/2026-11-01-art-mob-walk-asia');out=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-11-01-art-mob-walk-asia');(out/'generated').mkdir(exist_ok=True);(out/'previews').mkdir(exist_ok=True)
files={'mob-gaki': 'exec-1fc8c679-6e01-44aa-9b02-5874e1348f4f.png', 'mob-kasha': 'exec-9eede150-51ad-45c8-b4d1-260da55ce73b.png', 'mob-nukekubi': 'exec-efd849aa-2d03-45c5-acb1-d0c550621546.png', 'mob-hitodama': 'exec-7e9e5fc9-c78f-4feb-b488-22eae10b5e25.png'}
report=[]
for key,file in files.items():
 src=Path('/Users/agapae/.codex/generated_images/01a1957c-6dc3-7d60-9284-a7d889765579')/file;shutil.copy2(src,out/'generated'/f'{key}.png');source=Image.open(src).convert('RGBA');standing=Image.open(root/'img/Asia'/f'{key}-asia.png').convert('RGBA');a=np.asarray(standing)[:,:,3];oldbox=Image.fromarray((a>40).astype('uint8')*255).getbbox();targetH=min(508,oldbox[3]-oldbox[1]);frames=[];details=[]
 cells=[]
 for col,row in [(0,0),(1,0),(0,1),(1,1)]:
  cell=source.crop((round(col*source.width/2),round(row*source.height/2),round((col+1)*source.width/2),round((row+1)*source.height/2)))
  # Remove only disconnected neighboring-cell scraps from these two tightly spaced sheets.
  if key in ('mob-nukekubi','mob-hitodama'):
   pixels=np.array(cell);labels,n=label(pixels[:,:,3]>40);sizes=np.bincount(labels.ravel());sizes[0]=0;keep=binary_dilation(labels==sizes.argmax(),iterations=2);pixels[~keep]=0;cell=Image.fromarray(pixels)
  alpha=np.asarray(cell)[:,:,3];box=Image.fromarray((alpha>40).astype('uint8')*255).getbbox();assert box;cells.append((cell,box))
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
review=Image.new('RGB',(1024,4*280),'#26333d');d=ImageDraw.Draw(review)
for row,entry in enumerate(report):
 d.text((10,row*280+5),entry['key'],fill='white');strip=Image.open(root/'img'/f"{entry['key']}-walk.png").resize((1024,256),Image.Resampling.NEAREST);review.paste(strip,(0,row*280+24),strip)
review.save(out/'four-enemies-frames.png')
p=root/'src/enemy-walk-assets.js';s=p.read_text().replace("  // 'mob-pret',",'\n'.join(f"  '{key}'," for key in files));p.write_text(s)
p=root/'index.html';s=p.read_text();import re
# New strips need an invalidated enemy-walk registry; add its import-map entry if absent.
if '"./src/enemy-walk-assets.js"' in s:s=re.sub(r'("\./src/enemy-walk-assets.js": "\./src/enemy-walk-assets.js\?v=)[^\"]+',r'\g<1>20261101-art-mob-walk-asia',s)
else:s=s.replace('  "imports": {','  "imports": {\n    "./src/enemy-walk-assets.js": "./src/enemy-walk-assets.js?v=20261101-art-mob-walk-asia",')
p.write_text(s)
print('Built',len(report),'four-frame sheets')
