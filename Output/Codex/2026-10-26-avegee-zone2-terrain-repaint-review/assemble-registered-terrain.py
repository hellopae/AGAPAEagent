"""Assemble ImageGen-painted quadrants using measured map registration.
No painting, recoloring or detail synthesis: registration and the existing terrain chunk packaging only.
Run after every selected quadrant has >=150 registered inliers and visual inspection.
"""
from pathlib import Path
import sys,json,hashlib
import cv2,numpy as np
from PIL import Image
R=Path(__file__).parent
GAME=Path('/Users/agapae/agapae-work/.codex-worktrees/tea-rest-20261025')
sys.path.insert(0,str(GAME/'scripts'))
import town_terrain_lib as T
rows=json.loads((R/'quadrant-registration.json').read_text())
assert all(v['inliers']>=150 for v in rows.values()),'reject insufficient registration'
styleH=np.array(json.loads((R/'style-registration.json').read_text())['homography'])
scale=np.diag([T.FULL[0]/T.PREVIEW[0],T.FULL[1]/T.PREVIEW[1],1.])
style=cv2.imread(str(R/'zone2-terrain-style-v2.png'))
fallback=cv2.warpPerspective(style,scale@np.linalg.inv(styleH),T.FULL,flags=cv2.INTER_LANCZOS4,borderMode=cv2.BORDER_REPLICATE)
acc=np.zeros((T.FULL[1],T.FULL[0],3),np.float32)
total=np.zeros((T.FULL[1],T.FULL[0]),np.float32)
for key,v in rows.items():
 raw=cv2.imread(str(R/f'q-{key}-draft.png'))
 M=scale@np.linalg.inv(np.array(v['homography'])@styleH)
 painted=cv2.warpPerspective(raw,M,T.FULL,flags=cv2.INTER_LANCZOS4)
 valid=cv2.warpPerspective(np.ones(raw.shape[:2],np.float32),M,T.FULL,flags=cv2.INTER_LINEAR)
 x0,y0,x1,y1=T.final_box(key)
 weight=np.zeros(total.shape,np.float32);weight[y0:y1,x0:x1]=T.weights(key).astype(np.float32)
 weight*=valid
 acc+=painted.astype(np.float32)*weight[:,:,None];total+=weight
sheet=fallback.copy();has=total>.0001
sheet[has]=np.clip(np.rint(acc[has]/total[has,None]),0,255).astype(np.uint8)
out=R/'terrain-v2';out.mkdir(exist_ok=True)
rgb=cv2.cvtColor(sheet,cv2.COLOR_BGR2RGB)
chunks=T.write_chunks(rgb,str(out),92)
T.write_preview(rgb,str(out/'zone2-terrain-v2-preview.webp'),92)
Image.fromarray(rgb).save(R/'assembled-terrain-v2.png')
report={'sheet':list(T.FULL),'chunks':len(chunks),'quadrantSize':[1536,1024],'nativeDetailScalePerPreview':1536/864,'containerResamplingScale':1.8,'coverage':float(has.mean()),'fallbackFraction':float((~has).mean()),'note':'Fresh painted quadrant detail; registration and container resampling. Does not complete C4 native4K/all zones.','files':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in out.glob('*.webp')}}
(out/'stitch-report.json').write_text(json.dumps(report,indent=2))
print(json.dumps({k:report[k] for k in ['sheet','chunks','coverage','fallbackFraction']}))
