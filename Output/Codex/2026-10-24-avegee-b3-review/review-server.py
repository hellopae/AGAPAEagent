from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import json,os
ROOT=Path(os.environ.get('AVEGEE_PROJECT','/Users/agapae/agapae-work/.codex-worktrees/b3-result-screen-20261024'))
BASE=Path(__file__).parent
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  if self.path.split('?')[0]=='/src/ui.js':
   data=((ROOT/'src/ui.js').read_text()+(BASE/'review-inject.js').read_text()).encode();self.send_response(200);self.send_header('Content-Type','text/javascript; charset=utf-8');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
  else:super().do_GET()
 def do_POST(self):
  if self.path!='/__qa-results':self.send_error(404);return
  data=json.loads(self.rfile.read(int(self.headers['Content-Length'])));(BASE/('browser-'+data['kind']+'.json')).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n');self.send_response(204);self.end_headers()
 def log_message(self,*a):pass
ThreadingHTTPServer(('127.0.0.1',8791),Handler).serve_forever()
