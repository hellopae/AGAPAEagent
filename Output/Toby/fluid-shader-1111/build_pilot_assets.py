"""FLUID-SHADER pilot: build the small flow-map + mask files the WebGL fluid layer reads.
usage: python3 -I build_pilot_assets.py <repo> <codex-masks-dir>
Reads (read only): Codex V7-FLUIDS masks + the v7-partial ground.  Writes <repo>/img/map-zone1/v5-fx/shader/*.
Per piece two files + pilot.json:
  <id>.flow.png  RGB  R,G = flow direction*speed (0.5 = still, +x right, +y down)  B = liquid mask (feathered)
  <id>.mask.png  RGBA white, alpha = the same feathered mask (the old frame layer is cut with it so the two never stack)
The mask is Codex's (lavafall-bridge: as is).  lava-flat-middle: Codex's mask had holes in the lava (dark-red cells): closed + filled INSIDE its own hull,
then kept only where the ground pixel really is lava coloured.  Nothing here touches the drawn ground."""
import sys, json, os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
repo, masks = sys.argv[1], sys.argv[2]
OUT = os.path.join(repo, 'img/map-zone1/v5-fx/shader/'); os.makedirs(OUT, exist_ok=True)
G = os.path.join(repo, 'img/map-zone1/v7-partial/')
MASTER = (4915, 3277); WORLD = (3840, 2560)
def ground(mx, my, mw, mh):          # master px rect -> v7-partial 2x pixels
    x0, y0, x1, y1 = mx*2, my*2, (mx+mw)*2, (my+mh)*2
    out = Image.new('RGB', (x1-x0, y1-y0))
    for r in range(y0//1024, (y1-1)//1024+1):
        for c in range(x0//1024, (x1-1)//1024+1):
            out.paste(Image.open(f'{G}r{r+1}-c{c+1}.webp').convert('RGB'), (c*1024-x0, r*1024-y0))
    return out
disk = lambda r: (np.add.outer(np.arange(-r, r+1)**2, np.arange(-r, r+1)**2) <= r*r)
def pad(f, m, k=40): return f(np.pad(m, k))[k:-k, k:-k]
def feather(m, sigma): return np.clip(ndi.gaussian_filter(m.astype(float), sigma), 0, 1)
def smooth(x, a, b): t = np.clip((x-a)/(b-a), 0, 1); return t*t*(3-2*t)

def flat_mask(rect):
    a = np.array(Image.open(masks+'lava-flat-middle.webp').convert('RGBA'))[..., 3] > 127
    g = ground(*rect); hsv = np.array(g.convert('HSV')).astype(float)
    h, s, v = hsv[..., 0]*360/255, hsv[..., 1]/255, hsv[..., 2]/255
    hull = ndi.binary_fill_holes(pad(lambda m: ndi.binary_closing(m, disk(16)), a))
    lava = ((h < 58) | (h > 345)) & (s > .5) & (v > .4)
    m = ndi.binary_opening(hull & lava, disk(2))
    return ndi.binary_fill_holes(pad(lambda q: ndi.binary_closing(q, disk(6)), m))

def tangent_field(shape, pts, mask):
    """unit tangent of the nearest part of a hand set centre line, smoothed; pts in mask px."""
    H, W = shape; yy, xx = np.mgrid[0:H, 0:W].astype(float)
    best = np.full(shape, 1e18); tx = np.zeros(shape); ty = np.zeros(shape)
    for (x0, y0), (x1, y1) in zip(pts[:-1], pts[1:]):
        dx, dy = x1-x0, y1-y0; L2 = dx*dx+dy*dy; L = L2**.5
        t = np.clip(((xx-x0)*dx+(yy-y0)*dy)/L2, 0, 1)
        d = np.hypot(xx-(x0+t*dx), yy-(y0+t*dy)); sel = d < best
        best[sel] = d[sel]; tx[sel] = dx/L; ty[sel] = dy/L
    tx = ndi.gaussian_filter(tx, 14); ty = ndi.gaussian_filter(ty, 14)
    n = np.hypot(tx, ty)+1e-6; return tx/n, ty/n

def write(pid, mask, vx, vy):
    soft = feather(mask, 3.0)                      # ~1.2 world units of feather at 2.56 px / world
    rgb = np.zeros(mask.shape+(3,), np.uint8)
    rgb[..., 0] = np.clip(128+127*vx, 0, 255); rgb[..., 1] = np.clip(128+127*vy, 0, 255); rgb[..., 2] = np.clip(soft*255, 0, 255)
    Image.fromarray(rgb, 'RGB').save(OUT+pid+'.flow.png', optimize=True)
    rgba = np.full(mask.shape+(4,), 255, np.uint8); rgba[..., 3] = np.clip(soft*255, 0, 255)
    Image.fromarray(rgba, 'RGBA').save(OUT+pid+'.mask.png', optimize=True)

pieces = []
# ---- 1) lava fall (Codex lavafall-bridge, verified 0% outside)
rect = [1117, 865, 114, 156]
m = np.array(Image.open(masks+'lavafall-bridge.webp').convert('RGBA'))[..., 3] > 127
d = ndi.distance_transform_edt(np.pad(m, 1))[1:-1, 1:-1]
sp = .55+.45*smooth(d, 0, max(1, .35*d.max()))
yy, xx = np.mgrid[0:m.shape[0], 0:m.shape[1]].astype(float); cx = (m*xx).sum()/m.sum()
vx = np.clip((cx-xx)/m.shape[1]*.35, -.3, .3)*sp; vy = sp
write('lavafall-bridge', m, vx*m, vy*m)
pieces.append(dict(id='lavafall-bridge', kind='fall', maskRectPx=rect, flow='lavafall-bridge.flow.png', mask='lavafall-bridge.mask.png',
                   speed=.9, cycle=14, warp=.55, pulse=.22, spark=[1.0, .86, .55], sparkCell=7, sparkDensity=.45, sparkSize=1.25, drift=[0, 14]))
# ---- 2) flat lava stream (lava-flat-middle, filled)
rect = [1040, 1000, 500, 220]
m = flat_mask(rect)
print('flat mask coverage', m.mean(), 'codex', (np.array(Image.open(masks+'lava-flat-middle.webp').convert('RGBA'))[..., 3] > 127).mean())
d = ndi.distance_transform_edt(np.pad(m, 1))[1:-1, 1:-1]
sp = .5+.5*smooth(d, 0, max(1, .5*d.max()))
path = [(215, 40), (330, 110), (450, 175), (570, 225), (690, 270), (790, 305)]
tx, ty = tangent_field(m.shape, path, m)
write('lava-flat-middle', m, tx*sp*m, ty*sp*m)
pieces.append(dict(id='lava-flat-middle', kind='stream', maskRectPx=rect, flow='lava-flat-middle.flow.png', mask='lava-flat-middle.mask.png',
                   speed=.55, cycle=16, warp=.7, pulse=.25, spark=[1.0, .8, .45], sparkCell=11, sparkDensity=.3, sparkSize=1.6, drift=[7, 4]))
json.dump(dict(schemaVersion=1, note='FLUID-SHADER pilot. Built by Output/Toby/fluid-shader-1111/build_pilot_assets.py. Masks: Codex V7-FLUIDS (lavafall-bridge as is, lava-flat-middle filled).',
               masterSize=list(MASTER), worldSize=list(WORLD), pieces=pieces), open(OUT+'pilot.json', 'w'), indent=1)
print('ok', os.listdir(OUT))
