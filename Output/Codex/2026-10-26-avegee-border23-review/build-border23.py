from pathlib import Path
import cv2,numpy as np,json,heapq,shutil,hashlib
review=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-26-avegee-border23-review')
game=Path('/Users/agapae/agapae-work/.codex-worktrees/tea-rest-20261025')
mask=cv2.imread(str(review/'owner-mask-registered.png'),0)>127
h,w=mask.shape
dist=cv2.distanceTransform(mask.astype('uint8'),cv2.DIST_L2,5)
anchors=[(220,202),(450,310),(700,429),(800,368),(890,344),(1100,420),(1355,498),(1240,565),(1070,600),(1005,655),(855,689),(1040,739),(1230,810),(1345,820),(1510,746)]
def route(a,b):
    start=a[1]*w+a[0];end=b[1]*w+b[0]
    assert mask[a[1],a[0]] and mask[b[1],b[0]],(a,b)
    costs={start:0};parents={};heap=[(0,start)]
    while heap:
        cost,i=heapq.heappop(heap)
        if cost!=costs[i]:continue
        if i==end:break
        x,y=i%w,i//w
        for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:
            xx,yy=x+dx,y+dy
            if not(0<=xx<w and 0<=yy<h and mask[yy,xx]):continue
            j=yy*w+xx;c=cost+1+25/(1+dist[yy,xx])
            if c<costs.get(j,float('inf')):costs[j]=c;parents[j]=i;heapq.heappush(heap,(c,j))
    out=[b];i=end
    while i!=start:i=parents[i];out.append((i%w,i//w))
    return out[::-1]
def clear(a,b):
    n=int(np.ceil(np.hypot(b[0]-a[0],b[1]-a[1])*3))
    for t in np.linspace(0,1,n+1):
        x,y=np.array(a)*(1-t)+np.array(b)*t
        if not mask[int(y),int(x)]:return False
    return True
points=[anchors[0]];indices=[0]
for a,b in zip(anchors,anchors[1:]):
    raw=route(a,b)
    # bounded simplification keeps a broad center rather than grazing the banks
    simple=cv2.approxPolyDP(np.array(raw,dtype=np.float32).reshape(-1,1,2),5,False).reshape(-1,2).astype(int).tolist()
    assert all(clear(a,b) for a,b in zip(simple,simple[1:]))
    points.extend(simple[1:]);indices.append(len(points)-1)
checkpoints=[indices[1],indices[6],indices[10]]
flat=mask.ravel().astype(int);runs=[];on=0;count=0
for v in flat:
    if v==on:count+=1
    else:runs.append(count);count=1;on=int(v)
runs.append(count)
coords=[[round((x+.5)/w,9),round((y+.5)/h,9)] for x,y in points]
sha=hashlib.sha256((review/'owner-mask-registered.png').read_bytes()).hexdigest()
module='// Owner Map-Zone2-3.jpg registered with ORB/RANSAC; red blocks movement.\n// Mask PNG SHA256: '+sha+'\nexport const BORDER23_MASK=Object.freeze({cols:'+str(w)+',rows:'+str(h)+',runs:Object.freeze('+json.dumps(runs,separators=(',',':'))+')});\nexport const BORDER23_CORRIDOR=Object.freeze('+json.dumps(coords,separators=(',',':'))+'.map(Object.freeze));\nexport const BORDER23_CHECKPOINT_VERTEX=Object.freeze('+json.dumps(checkpoints)+');\n'
(game/'src/frontier-walkmask-asia-west.js').write_text(module)
shutil.copyfile(review/'stairs-generated.png',game/'img/frontier-route/zone2-3-v2-stairs.png')
fixture=game/'tests/fixtures/border23-owner-mask.png';fixture.parent.mkdir(exist_ok=True);shutil.copyfile(review/'owner-mask-registered.png',fixture)
meta={'width':w,'height':h,'floorPixels':int(mask.sum()),'maskPngSha256':sha,'corridor':coords,'checkpointVertex':checkpoints,'anchors':anchors,'anchorIndices':indices,'nativeArtResolution':[w,h],'highResolutionWorkComplete':False}
(review/'geometry.json').write_text(json.dumps(meta,indent=2))
shutil.copyfile('/private/tmp/build-border23.py',review/'build-border23.py')
print(json.dumps({'points':len(coords),'checkpoints':checkpoints,'floor':int(mask.sum()),'runs':len(runs)}))
