import json,math
from pathlib import Path
from collections import deque
import numpy as np
base=Path('/private/tmp/avegee-z3-owner-mask-20261023')
code=(base/'town-owner-walkmask-west.js').read_text();runs=json.loads(code.split('TOWN_OWNER_WALK_RUNS=')[1].split(';')[0]);floor=np.concatenate([np.full(n,bool(i%2)) for i,n in enumerate(runs)]).reshape(320,480)
def at(x,y):
 return 0<=x<3840 and 0<=y<2560 and floor[int(y//8),int(x//8)]
def clear(a,b):
 dx,dy=b[0]-a[0],b[1]-a[1];length=math.hypot(dx,dy);n=math.ceil(length/4);nx=-dy/length*3;ny=dx/length*3
 for i in range(1,n+1):
  x=a[0]+dx*i/n;y=a[1]+dy*i/n
  if not(at(x,y) and at(x+nx,y+ny) and at(x-nx,y-ny)):return False
 return True
start=(int(770/3.2),int(1000/3.2));seen={start};queue=deque([start])
while queue:
 x,y=queue.popleft()
 for dx,dy in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)):
  xx,yy=x+dx,y+dy
  if (xx,yy) in seen or not(0<=xx<480 and 0<=yy<320) or not floor[yy,xx]:continue
  if dx and dy and not(floor[y,xx] and floor[yy,x]):continue
  if not clear(((x+.5)*8,(y+.5)*8),((xx+.5)*8,(yy+.5)*8)):continue
  seen.add((xx,yy));queue.append((xx,yy))
checks=json.loads((base/'landmark-checks.json').read_text())['points'];routes=[]
for p in checks:
 if p['expected_walkable']:
  x,y=p['preview_xy'];routes.append({'point':p['point'],'reachable_from_entry':(int(x/3.2),int(y/3.2)) in seen})
report={'navigation_cell_world_units':8,'side_margin_world_units':3,'edge_sampling_world_units':4,'reachable_cells':len(seen),'total_floor_cells':int(floor.sum()),'routes':routes,'passed':sum(p['reachable_from_entry'] for p in routes),'total':len(routes),'scope':'owner floor only, using production clearLine rule; station/prop/NPC collisions and runtime integration still pending'}
(base/'clearance-checks.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
assert all(p['reachable_from_entry'] for p in routes)
