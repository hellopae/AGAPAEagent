from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import sys,json
ROOT=Path('/Users/agapae/agapae-work/.codex-worktrees/tea-rest-20261025');R=Path(__file__).parent;before='--before' in sys.argv
class H(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  p=self.path.split('?')[0];b=None
  if p=='/src/ui.js':b=(ROOT/'src/ui.js').read_bytes()+(R/'review-inject.js').read_bytes()
  elif before and p in ['/src/route-geometry.js','/src/dungeon-view.js','/src/frontier-ambient.js']:b=(R/('before-'+p.split('/')[-1])).read_bytes()
  if b is None:return super().do_GET()
  self.send_response(200);self.send_header('Content-Type','text/javascript');self.end_headers();self.wfile.write(b)
 def do_POST(self):
  v=json.loads(self.rfile.read(int(self.headers['Content-Length'])));(R/('browser-before.json' if before else 'browser-after.json')).write_text(json.dumps(v,ensure_ascii=False,indent=2));self.send_response(200);self.end_headers()
 def log_message(self,*a):pass
ThreadingHTTPServer(('127.0.0.1',8822 if before else 8823),H).serve_forever()
