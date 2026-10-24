from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
ROOT=Path('/Users/agapae/agapae-work/.codex-worktrees/20261023T121019Z-cb557d1a')
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  if self.path.split('?')[0]=='/src/ui.js':
   b=((ROOT/'src/ui.js').read_text()+Path('/private/tmp/avegee-z2-art-review-inject.js').read_text()).encode()
   self.send_response(200);self.send_header('Content-Type','text/javascript');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
  else:super().do_GET()
 def log_message(self,*a):pass
ThreadingHTTPServer(('127.0.0.1',8790),Handler).serve_forever()
