from pathlib import Path
import cv2, numpy as np, json, hashlib
from PIL import Image, ImageDraw

cv2.setNumThreads(1); cv2.setRNGSeed(0)
repo=Path('/Users/agapae/agapae-work/.codex-worktrees/west-sprites-20261024')
out=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-24-avegee-west-review')
source=Path('/Users/agapae/agapae-work/mask-for-kittanate/west/Map-Zone3-1.jpg')
ref=cv2.imread(str(source)); bg=cv2.imread(str(repo/'img/map-zone3/v1/zone3-terrain-v1-preview.webp'))
s=cv2.SIFT_create(nfeatures=12000);ka,da=s.detectAndCompute(bg,None);kb,db=s.detectAndCompute(ref,None)
matches=[a for a,b in cv2.BFMatcher().knnMatch(da,db,k=2) if a.distance<.72*b.distance]
a=np.float32([ka[m.queryIdx].pt for m in matches]);b=np.float32([kb[m.trainIdx].pt for m in matches])
mat,inside=cv2.estimateAffine2D(a,b,method=cv2.RANSAC,ransacReprojThreshold=3)
assert int(inside.sum())>150
inv=cv2.invertAffineTransform(mat)
warped=cv2.warpAffine(bg,mat,(ref.shape[1],ref.shape[0]))
diff=np.max(abs(ref.astype(float)-warped.astype(float)),axis=2)
h,sat,v=cv2.split(cv2.cvtColor(ref,cv2.COLOR_BGR2HSV))
masks={'green':(h>72)&(h<92)&(sat>150)&(v>115)&(diff>60),
 'cyan':(h>92)&(h<106)&(sat>140)&(v>150)&(diff>60),
 'white':(sat<30)&(v>175)&(diff>60)}
# Manually reviewed trunk-only ROIs in the ORIGINAL owner image. Overlapping
# canopies are not independent components; never count connected blobs as trees.
# Foot = midpoint of the two drawn trunk strokes in the lower band, at max y.
rois={
 'green':[(1140,230,1190,265),(1190,290,1245,333),(1250,275,1305,318),
 (925,405,970,445),(1263,430,1308,473),(1446,643,1491,685),
 (929,674,974,716),(1132,695,1177,737),(1287,699,1332,741),
 (1527,881,1572,923),(944,918,989,960),(1166,931,1211,973),
 (1321,935,1366,977),(1522,1025,1567,1067)],
 'cyan':[(195,590,245,633),(385,555,430,600),(235,667,285,712),
 (405,665,450,713),(476,845,526,891),(497,932,547,973),
 (260,908,310,952),(320,953,370,995),(265,1060,315,1100)],
 'white':[(2195,340,2255,382),(2350,340,2400,385),
 (1870,716,1925,759),(2100,900,2160,947),(2330,1005,2380,1050)]}
overlay=Image.fromarray(cv2.cvtColor(ref,cv2.COLOR_BGR2RGB));draw=ImageDraw.Draw(overlay)
points=[]
for kind,boxes in rois.items():
 for roi in boxes:
  x0,y0,x1,y1=roi; yy,xx=np.where(masks[kind][y0:y1,x0:x1]);assert len(xx)>20,(kind,roi)
  # Last 24px contain both trunk strokes while excluding the crown.
  low=yy>=yy.max()-23; foot=[float((xx[low].min()+xx[low].max())/2+x0),float(yy.max()+y0)]
  q=cv2.transform(np.array([[foot]],np.float32),inv)[0,0]
  p={'kind':kind,'x':round(float(q[0]/1536),7),'y':round(float(q[1]/1024),7),'source_foot':foot,'trunk_roi':list(roi),'moved':False}
  points.append(p);draw.rectangle(roi,outline='yellow',width=2);fx,fy=foot;draw.ellipse((fx-5,fy-5,fx+5,fy+5),fill='red');draw.text((fx+6,fy),str(len(points)),fill='yellow',stroke_width=1,stroke_fill='black')
assert len(points)==28
err=np.linalg.norm(cv2.transform(a[None],mat)[0]-b,axis=1)[inside.ravel().astype(bool)]
meta={'source':str(source),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'preview_to_source':mat.tolist(),'inliers':int(inside.sum()),'median_error_source_px':float(np.median(err)),'p95_error_source_px':float(np.percentile(err,95)),'counts':{k:len(v) for k,v in rois.items()},'method':'SIFT full affine; individually reviewed trunk-stroke ROIs; no relocation','points':points}
(out/'tree-registration.json').write_text(json.dumps(meta,indent=2)+'\n');overlay.save(out/'tree-feet-source-review.jpg',quality=95)
result=Image.fromarray(cv2.cvtColor(bg,cv2.COLOR_BGR2RGB));d=ImageDraw.Draw(result)
for i,p in enumerate(points):
 x,y=p['x']*1536,p['y']*1024;d.ellipse((x-4,y-4,x+4,y+4),fill={'green':'lime','cyan':'cyan','white':'white'}[p['kind']],outline='black');d.text((x+5,y),str(i+1),fill='yellow',stroke_width=1,stroke_fill='black')
result.save(out/'tree-feet-ground-review.jpg',quality=95)
print(json.dumps({k:v for k,v in meta.items() if k!='points'},indent=2))
