from playwright.sync_api import sync_playwright
import sys
args=sys.argv[1:]
with sync_playwright() as p:
    b=p.chromium.launch(args=args)
    pg=b.new_page()
    pg.goto('about:blank')
    print(pg.evaluate("""()=>{const c=document.createElement('canvas');const gl=c.getContext('webgl');const e=gl&&gl.getExtension('WEBGL_debug_renderer_info');return gl?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):'nogl'}"""))
    print(b.version)
    b.close()
