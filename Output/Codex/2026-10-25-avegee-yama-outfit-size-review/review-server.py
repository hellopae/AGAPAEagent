from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import sys,json
ROOT=Path('/Users/agapae/agapae-work/.codex-worktrees/tea-rest-20261025');REVIEW=Path(__file__).parent
before='--before' in sys.argv
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  path=self.path.split('?')[0];b=None
  if path=='/src/ui.js':b=(ROOT/'src/ui.js').read_bytes()+(REVIEW/'review-inject.js').read_bytes()
  elif before and path in ['/src/art.js','/src/yama-animation.js']:b=(REVIEW/('before-'+Path(path).name)).read_bytes()
  if b is None:return super().do_GET()
  self.send_response(200);self.send_header('Content-Type','text/javascript');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
 def do_POST(self):
  if self.path!='/__qa-results':return self.send_error(404)
  value=json.loads(self.rfile.read(int(self.headers['Content-Length'])))
  (REVIEW/('browser-'+('before' if before else 'after')+'.json')).write_text(json.dumps(value,ensure_ascii=False,indent=2))
  self.send_response(200);self.end_headers()
 def log_message(self,*a):pass
print('port',8810 if before else 8811,flush=True)
ThreadingHTTPServer(('127.0.0.1',8810 if before else 8811),Handler).serve_forever()
