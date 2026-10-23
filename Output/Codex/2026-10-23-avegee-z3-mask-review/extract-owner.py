from pathlib import Path
import json, hashlib
import cv2
import numpy as np
from PIL import Image, ImageDraw
cv2.setNumThreads(1)
cv2.setRNGSeed(0)
source=Path('/Users/agapae/Documents/Work PAE/Claude/AVEGEE-reference/files/UI New map/Map-Zone3-2.jpg')
preview=Path('/Users/agapae/agapae-work/.codex-worktrees/20261023T121107Z-194b7613/img/map-zone3/v1/zone3-terrain-v1-preview.webp')
out=Path('/private/tmp/avegee-z3-owner-mask-20261023');out.mkdir(exist_ok=True)
ref=cv2.imread(str(source));bg=cv2.imread(str(preview));h,w=bg.shape[:2]
sift=cv2.SIFT_create(nfeatures=10000)
ka,da=sift.detectAndCompute(bg,None);kb,db=sift.detectAndCompute(ref,None)
pairs=cv2.BFMatcher().knnMatch(da,db,k=2)
matches=[a for a,b in pairs if a.distance<.72*b.distance]
a=np.float32([ka[m.queryIdx].pt for m in matches]);b=np.float32([kb[m.trainIdx].pt for m in matches])
mat,inliers=cv2.estimateAffine2D(a,b,method=cv2.RANSAC,ransacReprojThreshold=3)
assert mat is not None and int(inliers.sum())>=150,'Insufficient registration confidence'
errors=np.linalg.norm(cv2.transform(a[None],mat)[0]-b,axis=1)[inliers.ravel().astype(bool)]
# Extract the red annotation at original resolution. No morphology or dilation: preserve thin barriers.
blue,green,red=[ref[:,:,i].astype(np.int16) for i in range(3)]
blocked=((red-np.maximum(blue,green)>55)&(red>130)).astype(np.uint8)
inv=cv2.invertAffineTransform(mat)
block=cv2.warpAffine(blocked,inv,(w,h),flags=cv2.INTER_NEAREST,borderValue=1).astype(bool)
valid=cv2.warpAffine(np.ones(ref.shape[:2],np.uint8),inv,(w,h),flags=cv2.INTER_NEAREST,borderValue=0).astype(bool)
block|=~valid
rgba=np.zeros((h,w,4),np.uint8);rgba[:,:,:3]=(255,0,0);rgba[:,:,3]=block.astype(np.uint8)*255
Image.fromarray(rgba).save(out/'west-owner-red-layer.png')
Image.fromarray((~block).astype(np.uint8)*255).save(out/'west-owner-walkable.png')
coverage=cv2.resize((~block).astype(float),(480,320),interpolation=cv2.INTER_AREA)
cells=coverage>.68
n,labels,stats,centers=cv2.connectedComponentsWithStats(cells.astype(np.uint8),connectivity=4)
tiny=[i for i in range(1,n) if stats[i,cv2.CC_STAT_AREA]<8]
removed=int(sum(stats[i,cv2.CC_STAT_AREA] for i in tiny))
if tiny:cells[np.isin(labels,tiny)]=False
n2,l2,s2,c2=cv2.connectedComponentsWithStats(cells.astype(np.uint8),connectivity=4)
components=[{'cells':int(s2[i,cv2.CC_STAT_AREA]),'bounds':s2[i,:4].tolist(),'center':c2[i].tolist()} for i in range(1,n2)]
components.sort(key=lambda c:-c['cells'])
# The grid overlay displays exactly the walk data, rather than only the high-resolution source layer.
expanded=cv2.resize(cells.astype(np.uint8),(w,h),interpolation=cv2.INTER_NEAREST).astype(bool)
rgb=cv2.cvtColor(bg,cv2.COLOR_BGR2RGB)
over=rgb.astype(float)*.25
over[expanded]=rgb[expanded]*.70+np.array([70,210,255])*.30
Image.fromarray(np.uint8(np.clip(over,0,255))).save(out/'west-walkmask-review.jpg',quality=94)
registered=cv2.warpAffine(ref,inv,(w,h),flags=cv2.INTER_LINEAR)
Image.fromarray(cv2.cvtColor(registered,cv2.COLOR_BGR2RGB)).save(out/'owner-reference-aligned.jpg',quality=94)
meta={'source':str(source),'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'source_size':[ref.shape[1],ref.shape[0]],'preview':str(preview),'preview_sha256':hashlib.sha256(preview.read_bytes()).hexdigest(),'preview_size':[w,h],'registration':'SIFT, ratio .72, full affine RANSAC 3px','matches':len(matches),'inliers':int(inliers.sum()),'inlier_median_error_reference_px':float(np.median(errors)),'inlier_p95_error_reference_px':float(np.percentile(errors,95)),'preview_to_reference':mat.tolist(),'red_threshold':'R-max(G,B)>55 and R>130','morphology':'none','grid':[480,320],'walkable_cell_coverage_threshold':.68,'removed_island_cells':removed,'walkable_cells':int(cells.sum()),'components':components,'activation':'not activated; prepared data only'}
(out/'registration.json').write_text(json.dumps(meta,indent=2)+'\n')
print(json.dumps(meta,indent=2))
