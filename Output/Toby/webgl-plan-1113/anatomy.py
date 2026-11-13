"""Frame anatomy of the real game (read-only).  usage: anatomy.py <port> <label>"""
import sys,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
import harness
from harness import *
HERE='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/webgl-plan-1113/'
harness.INSTR=harness.INSTR+'\n'+open(HERE+'anatomy.js').read()
port,label=sys.argv[1],sys.argv[2]
out={}
with sync_playwright() as p:
    b,ctx,pg=setup(p,port,1792,958,2)
    pg.wait_for_timeout(6000)
    out['idle_fps']=measure(pg,6)
    out['idle']=pg.evaluate("__anat.sample(6)")
    pg.screenshot(path=HERE+f'results/{label}-idle.jpg',type='jpeg',quality=70)
    for i in range(12): walk_action(pg); pg.wait_for_timeout(150)
    out['walk']=pg.evaluate("__anat.sample(6)")
    out['walk_fps']=measure(pg,10,lambda:walk_action(pg))
    out['gl']=pg.evaluate("(()=>{const c=document.createElement('canvas');const gl=c.getContext('webgl2')||c.getContext('webgl');const e=gl.getExtension('WEBGL_debug_renderer_info');return {renderer:gl.getParameter(e.UNMASKED_RENDERER_WEBGL),webgl2:!!document.createElement('canvas').getContext('webgl2'),maxTex:gl.getParameter(gl.MAX_TEXTURE_SIZE)}})()")
    out['canvases']=pg.evaluate("[...document.querySelectorAll('canvas')].map(c=>[c.id||c.className,c.width,c.height])")
    out['errors']=pg.errors[:5]
    b.close()
json.dump(out,open(HERE+f'results/{label}.json','w'),indent=1,ensure_ascii=False)
for scene in ('idle','walk'):
    s=out[scene];n=s['frames'];cvpx=s['cv'][0]*s['cv'][1]
    print(f"== {scene}: canvas {s['cv']} = {cvpx/1e6:.2f} MP · fps {out[scene+'_fps']['fps_avg']} p95 {out[scene+'_fps']['ft_p95']}")
    tot={'cv':0,'off':0};agg={}
    for k,v in s['rows'].items():
        tgt,who,kind,op=k.split('|');tot[tgt]+=v['px']/n
        mod=who.split(':')[0];a=agg.setdefault((tgt,mod),{'n':0,'px':0});a['n']+=v['n']/n;a['px']+=v['px']/n
    print(f"   per frame: main canvas {tot['cv']/1e6:.1f} MP drawn = {tot['cv']/cvpx:.2f}x overdraw · offscreen canvases {tot['off']/1e6:.1f} MP · GL {s['gl']['draws']/n:.1f} draws {s['gl']['px']/n/1e6:.2f} MP")
    for (tgt,mod),a in sorted(agg.items(),key=lambda kv:-kv[1]['px'])[:22]:
        print(f"   {tgt:3} {mod:28} calls/frame {a['n']:7.1f}  MP/frame {a['px']/1e6:6.2f}")
