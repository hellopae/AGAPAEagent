import sys,http.server,socketserver,functools
root,port=sys.argv[1],int(sys.argv[2])
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
    def end_headers(self):
        self.send_header('Cache-Control','no-store');super().end_headers()
class S(socketserver.ThreadingMixIn,http.server.HTTPServer):daemon_threads=True;allow_reuse_address=True
S(('127.0.0.1',port),functools.partial(H,directory=root)).serve_forever()
