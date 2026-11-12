"""shared helpers for the FLUID-SHADER full-map work (master px space = 4915x3277, ground v7 = 2x)."""
import os, json
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
REPO = os.path.expanduser('~/agapae-work/.toby-worktrees/z1-v5/')
G = REPO + 'img/map-zone1/v7/'
FX = REPO + 'img/map-zone1/v5-fx/'
SH = FX + 'shader/'
WORK = os.path.dirname(os.path.abspath(__file__)) + '/work/'
MASTER = (4915, 3277); WORLD = (3840, 2560)
_tiles = {}
def tile(r, c):
    k = (r, c)
    if k not in _tiles:
        _tiles[k] = Image.open(f'{G}r{r+1}-c{c+1}.webp').convert('RGB')
    return _tiles[k]
def ground(mx, my, mw, mh, scale=2):
    """master-px rect -> RGB image at 2x (v7 native)."""
    x0, y0, x1, y1 = int(round(mx*2)), int(round(my*2)), int(round((mx+mw)*2)), int(round((my+mh)*2))
    x0 = max(0, x0); y0 = max(0, y0); x1 = min(9830, x1); y1 = min(6554, y1)
    out = Image.new('RGB', (x1-x0, y1-y0))
    for r in range(y0//1024, (y1-1)//1024+1):
        for c in range(x0//1024, (x1-1)//1024+1):
            if not os.path.exists(f'{G}r{r+1}-c{c+1}.webp'): continue
            out.paste(tile(r, c), (c*1024-x0, r*1024-y0))
    return out
disk = lambda r: (np.add.outer(np.arange(-r, r+1)**2, np.arange(-r, r+1)**2) <= r*r)
def pad(f, m, k=40): return f(np.pad(m, k))[k:-k, k:-k]
def feather(m, sigma): return np.clip(ndi.gaussian_filter(m.astype(float), sigma), 0, 1)
def smooth(x, a, b): t = np.clip((x-a)/(b-a), 0, 1); return t*t*(3-2*t)
def hsv(img):
    a = np.array(img.convert('HSV')).astype(float)
    return a[..., 0]*360/255, a[..., 1]/255, a[..., 2]/255
