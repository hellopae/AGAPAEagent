from pathlib import Path
import json,hashlib,subprocess,urllib.request,concurrent.futures
w=Path('/Users/agapae/agapae-work/AVEGEE');r=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-24-avegee-workers-travel-review')
sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=w,text=True).strip();pages=json.loads(subprocess.check_output(['gh','api','repos/hellopae/AVEGEE/pages/builds/latest'],cwd=w,text=True));assert pages['status']=='built' and pages['commit']==sha,(pages['status'],pages['commit'])
files=[p for p in subprocess.check_output(['git','diff','--name-only','a720ec5',sha],cwd=w,text=True).splitlines() if p.startswith(('img/','src/')) or p=='index.html']+['src/zone-skin.js','src/route-geometry.js']
def check(p):
 with urllib.request.urlopen('https://hellopae.github.io/AVEGEE/'+p+'?review='+sha,timeout=40) as x:data=x.read();status=x.status
 assert data==(w/p).read_bytes(),p
 return {'file':p,'status':status,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:checks=list(pool.map(check,files))
v={'commit':sha,'pages':{'status':pages['status'],'commit':pages['commit']},'all_match':True,'files':checks};(r/'live-verification.json').write_text(json.dumps(v,indent=2)+'\n');print(json.dumps({'pages':pages['status'],'commit':sha,'matched':len(checks)}))
