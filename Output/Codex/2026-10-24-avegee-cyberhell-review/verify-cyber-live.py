from pathlib import Path
import subprocess,json,hashlib,urllib.request,concurrent.futures
w=Path('/Users/agapae/agapae-work/AVEGEE')
r=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-24-avegee-cyberhell-review')
commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=w,text=True).strip()
pages=json.loads(subprocess.check_output(['gh','api','repos/hellopae/AVEGEE/pages/builds/latest'],cwd=w,text=True))
assert pages['status']=='built' and pages['commit']==commit,(pages['status'],pages['commit'],commit)
files=[a['path'] for a in json.loads((r/'asset-integrity.json').read_text())['files']]+['src/zone-skin.js','src/route-geometry.js']
def check(f):
 url='https://hellopae.github.io/AVEGEE/'+f+'?review='+commit
 with urllib.request.urlopen(url,timeout=45) as res:data=res.read();status=res.status
 expected=(w/f).read_bytes();assert data==expected,f
 return {'file':f,'status':status,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:checks=list(pool.map(check,files))
report={'commit':commit,'pages':{'status':pages['status'],'commit':pages['commit']},'files':checks,'all_match':True}
(r/'live-verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'commit':commit,'pages':pages['status'],'matched':len(checks)}))
