from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import sys,json
ROOT=Path('/Users/agapae/agapae-work/.codex-worktrees/tea-rest-20261025');R=Path(__file__).parent;before='--before' in sys.argv
class H(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  p=self.path.split('?')[0];b=None
  if p=='/review.html':b=b'<html><body style="margin:0;background:#140a0e"><iframe src="/" style="border:0;width:800px;height:1050px;display:block;transform:scale(.8);transform-origin:top left"></iframe></body></html>';self.send_response(200);self.send_header('Content-Type','text/html');self.end_headers();self.wfile.write(b);return
  if p=='/mobile.html':b=b'<html><body style="margin:0"><iframe src="/" style="border:0;width:390px;height:844px;display:block"></iframe></body></html>';self.send_response(200);self.send_header('Content-Type','text/html');self.end_headers();self.wfile.write(b);return
  if p=='/src/ui.js':b=(R/'before-ui.js').read_bytes() if before else (ROOT/'src/ui.js').read_bytes();b+=(R/'review-inject.js').read_bytes()
  elif before and p in ['/src/worker-ui.js','/src/team-hud.css']:b=(R/('before-'+Path(p).name)).read_bytes()
  if b is None:return super().do_GET()
  self.send_response(200);self.send_header('Content-Type','text/css' if p.endswith('.css') else 'text/javascript');self.end_headers();self.wfile.write(b)
 def do_POST(self):
  a=json.loads(self.rfile.read(int(self.headers['Content-Length'])));(R/('browser-before.json' if before else 'browser-after.json')).write_text(json.dumps(a,ensure_ascii=False,indent=2));self.send_response(200);self.end_headers()
 def log_message(self,*a):pass
ThreadingHTTPServer(('127.0.0.1',8813 if before else 8814),H).serve_forever()
