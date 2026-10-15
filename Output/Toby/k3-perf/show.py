import json,sys
r=json.load(open(sys.argv[1]))
for k in sys.argv[2:]:
    v=r[k];print(k,'profile ms',round(v['profile']['total_ms']),'frames',v['frames'])
    for t in v['profile']['top'][:14]:print('  ',t)
    print('  per-frame calls',{a:round(b/v['frames'],1) for a,b in v['calls'].items()})
