import http.server, sys, os
os.chdir('/Users/agapae/agapae-work/.toby-worktrees/west-hit')
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store, must-revalidate'); super().end_headers()
    def log_message(self,*a): pass
http.server.ThreadingHTTPServer(('',8812),H).serve_forever()
