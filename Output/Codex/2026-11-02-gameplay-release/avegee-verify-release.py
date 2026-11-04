import subprocess,json,hashlib,urllib.request,concurrent.futures,sys
from pathlib import Path
root=Path('/Users/agapae/agapae-work/AVEGEE');out=Path(sys.argv[1]);sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
build=json.loads(subprocess.check_output(['gh','api','repos/hellopae/AVEGEE/pages/builds/latest'],text=True))
if build['status']!='built' or build['commit']!=sha:
 print(json.dumps({'expected':sha,'status':build['status'],'commit':build['commit']}));sys.exit(2)
files=subprocess.check_output(['git','diff','--name-only','df42fb1b',sha],cwd=root,text=True).splitlines();files=[f for f in files if f=='index.html' or f.startswith('src/') and f.endswith(('.js','.css'))]
def check(f):
 local=hashlib.sha256((root/f).read_bytes()).hexdigest();req=urllib.request.Request('https://hellopae.github.io/AVEGEE/'+f+'?verify='+sha,headers={'Cache-Control':'no-cache'});remote=hashlib.sha256(urllib.request.urlopen(req,timeout=45).read()).hexdigest();return {'path':f,'localSha256':local,'liveSha256':remote,'match':local==remote}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: rows=list(pool.map(check,files))
r={'commit':sha,'pagesStatus':build['status'],'pagesCommit':build['commit'],'files':rows,'allMatch':all(x['match'] for x in rows)};out.write_text(json.dumps(r,indent=2));print(json.dumps({'commit':sha,'files':len(rows),'allMatch':r['allMatch']}));sys.exit(0 if r['allMatch'] else 1)
