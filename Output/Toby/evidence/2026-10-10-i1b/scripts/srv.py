import http.server, sys, os
os.chdir('/Users/agapae/agapae-work/.toby-worktrees/i1b')
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store, must-revalidate'); super().end_headers()
    def log_message(self,*a): pass
http.server.ThreadingHTTPServer(('',8811),H).serve_forever()
