from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import json
ROOT=Path('/Users/agapae/agapae-work/.codex-worktrees/tea-rest-20261025');R=Path(__file__).parent
class H(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  p=self.path.split('?')[0]
  if p=='/__before.css':b=(R/'before.css').read_bytes();self.send_response(200);self.send_header('Content-Type','text/css');self.end_headers();self.wfile.write(b)
  elif p=='/src/ui.js':b=(ROOT/'src/ui.js').read_bytes()+(R/'review-inject.js').read_bytes();self.send_response(200);self.send_header('Content-Type','text/javascript');self.end_headers();self.wfile.write(b)
  else:super().do_GET()
 def log_message(self,*a):pass
ThreadingHTTPServer(('127.0.0.1',8812),H).serve_forever()
