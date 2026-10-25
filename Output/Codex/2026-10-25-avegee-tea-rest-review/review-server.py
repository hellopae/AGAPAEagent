from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import sys
ROOT=Path('/Users/agapae/agapae-work/.codex-worktrees/tea-rest-20261025')
REVIEW=Path(__file__).parent
before='--before' in sys.argv
hold='--hold' in sys.argv
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  if self.path.split('?')[0]=='/src/ui.js':
   text=(REVIEW/'before-ui.js').read_text() if before else (ROOT/'src/ui.js').read_text()
   if hold:text=text.replace('const ACTION_CUT_MS = 1300;', 'const ACTION_CUT_MS = 10000;')
   b=(text+(REVIEW/'review-inject.js').read_text()).encode()
   self.send_response(200);self.send_header('Content-Type','text/javascript');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
  else:super().do_GET()
 def do_POST(self):
  if self.path=='/__qa-results':
   import json
   value=json.loads(self.rfile.read(int(self.headers['Content-Length'])))
   (REVIEW/('browser-latest.json')).write_text(json.dumps(value,ensure_ascii=False,indent=2))
   self.send_response(200);self.end_headers()
  else:self.send_error(404)
 def log_message(self,*a):pass
ThreadingHTTPServer(('127.0.0.1',8801),Handler).serve_forever()
