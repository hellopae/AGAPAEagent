import json
from pathlib import Path
import numpy as np
from PIL import Image
base=Path('/private/tmp/avegee-z3-owner-mask-20261023')
code=(base/'town-owner-walkmask-west.js').read_text()
runs=json.loads(code.split('TOWN_OWNER_WALK_RUNS=')[1].split(';')[0])
cells=np.concatenate([np.full(n,bool(i%2)) for i,n in enumerate(runs)]).reshape(320,480)
points=[('entry',770,1000,True),('entry circular plaza',770,870,True),('central stair',743,470,True),('central plaza',740,380,True),('left top bridge',350,250,True),('left middle bridge',350,382,True),('upper middle stair',700,230,True),('upper right bridge',1190,161,True),('right descending stair',1399,265,True),('right lower bridge',1270,628,True),('left top building reserve',180,195,False),('left middle building reserve',190,390,False),('left lower building reserve',220,575,False),('upper middle building reserve',655,155,False),('upper right building reserve',1010,145,False),('right upper building reserve',1410,190,False),('right middle building reserve',1290,340,False),('right lower building reserve',1390,585,False),('central small left reserve',710,405,False),('central small right reserve',775,405,False),('central thin reserve',740,358,False),('small right upper reserve',1352,215,False),('bottom left small reserve',715,657,False),('water',1100,840,False)]
results=[]
for name,x,y,expected in points:
    actual=bool(cells[min(319,int(y/3.2)),min(479,int(x/3.2))])
    results.append({'point':name,'preview_xy':[x,y],'expected_walkable':expected,'actual_walkable':actual,'pass':actual==expected})
report={'rle_cells':int(cells.size),'rle_round_trip':len(cells.ravel())==153600,'points':results,'passed':sum(r['pass'] for r in results),'total':len(results),'scope':'data-level landmarks and connectivity; runtime navigation not yet tested'}
(base/'landmark-checks.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
assert all(r['pass'] for r in results)
