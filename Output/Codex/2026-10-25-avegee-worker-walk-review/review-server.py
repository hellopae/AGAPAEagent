from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import json
ROOT=Path('/Users/agapae/agapae-work/.codex-worktrees/tea-rest-20261025');REVIEW=Path(__file__).parent
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  name=self.path.split('?')[0];local=REVIEW/'preview.html' if name=='/__worker-review' else REVIEW/'workers-before.js' if name=='/src/workers-before.js' else None
  if local:
   data=local.read_bytes();self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8' if name=='/__worker-review' else 'text/javascript');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
  else:super().do_GET()
 def do_POST(self):
  if self.path=='/__qa-results':
   value=json.loads(self.rfile.read(int(self.headers['Content-Length'])));(REVIEW/'browser-results.json').write_text(json.dumps(value,ensure_ascii=False,indent=2));self.send_response(200);self.end_headers()
  else:self.send_error(404)
 def log_message(self,*a):pass
ThreadingHTTPServer(('127.0.0.1',8803),Handler).serve_forever()
