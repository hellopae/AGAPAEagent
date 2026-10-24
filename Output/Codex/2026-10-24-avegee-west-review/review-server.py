from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
ROOT=Path('/Users/agapae/agapae-work/.codex-worktrees/west-sprites-20261024')
REVIEW=Path(__file__).parent
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  if self.path.split('?')[0]=='/src/ui.js':
   b=((ROOT/'src/ui.js').read_text()+(REVIEW/'review-inject.js').read_text()).encode()
   self.send_response(200);self.send_header('Content-Type','text/javascript');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
  else:super().do_GET()
 def log_message(self,*a):pass
ThreadingHTTPServer(('127.0.0.1',8792),Handler).serve_forever()
