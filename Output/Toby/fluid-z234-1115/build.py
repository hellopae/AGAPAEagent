"""FLUID-Z234: build the flow-map files + fluids.json the WebGL fluid layer reads for zone 2 / 3 / 4.
usage: python3 -I build.py <zone>      writes <repo>/img/map-zone<N>/fx/shader/{fluids.json, *.flow.png}; overflow report -> work/overflow-<zone>.json
Per piece (a 384 master px cell, same recipe as Zone 1's flats):  <id>.flow.png  RGB  R,G = flow direction*speed (128 = still)  B = liquid mask (feathered), over the PADDED rect.
Masks: cut from the v7 ground colour (cls.py: lava / water), minus the owner walk mask (plaza, road, bridge never get liquid), lava reflections in the river added to the lava.
Flow:  geodesic 'downhill' (shortest way through liquid to the sink) smoothed inside the liquid; in the wide river along the bottom it turns to flow east (smooth blend by y).
Nothing here touches the ground art."""
import sys, os, time
sys.path.insert(0, '.')
from zl import *
from walk import walk
from cls import hsv as _h, RIVER_Y
from scipy.sparse import coo_matrix
from scipy.sparse.csgraph import dijkstra
z = int(sys.argv[1]); U = WORLD[0] / MASTER[0]
SH = f'{REPO}img/{ZONES[z]}/fx/shader/'; os.makedirs(SH, exist_ok=True)
PARAMS = {
 'lava':  dict(speed=.55, cycle=16, warp=.7, pulse=.25, hot=[.5, .92], shimmer=.12, spark=[1.0, .8, .45], sparkCell=11, sparkDensity=.3, sparkSize=1.6, sparkLum=.35, drift=[7, 4]),
 'water2': dict(speed=.6, cycle=14, warp=.6, pulse=.1, hot=[.62, .95], shimmer=.12, spark=[.88, 1.0, .98], sparkCell=12, sparkDensity=.3, sparkSize=1.3, sparkLum=.5, drift=[6, 3]),
 'water3': dict(speed=.6, cycle=14, warp=.65, pulse=.12, hot=[.62, .95], shimmer=.1, spark=[.85, .97, 1.0], sparkCell=12, sparkDensity=.28, sparkSize=1.3, sparkLum=.45, drift=[6, 3]),
 'water4': dict(speed=.65, cycle=14, warp=.6, pulse=.3, hot=[.5, .9], shimmer=.14, spark=[.55, .95, 1.0], sparkCell=11, sparkDensity=.32, sparkSize=1.4, sparkLum=.4, drift=[6, 2]),
}
def params(kind): return dict(PARAMS['lava' if kind == 'lava' else f'water{z}'])
def padOf(p): return int(np.ceil(p['cycle'] * .8 / U)) + 3
# ------------------------------------------------------------------ masks
def load_masks():
    out = {}
    cs = 8 * (MASTER[0] / WORLD[0]) * 2
    w, _ = walk(z)
    ys, xs = np.mgrid[0:6554, 0:9830]; veto = w[np.minimum(319, (ys / cs).astype(int)), np.minimum(479, (xs / cs).astype(int))]
    del ys, xs
    for k in ('lava', 'water'):
        f = WORK + f'mask_{z}_{k}.npy'
        if os.path.exists(f): out[k] = np.load(f)
    if 'lava' in out:     # the lava's reflection / run-off in the river: orange streaks that connect to the lava
        rg = [0, RIVER_Y - 120, 1950, 2700 - (RIVER_Y - 120)]
        img = ground(z, *rg); h, s, v = hsv(img)
        rel = (((h < 58) | (h > 350)) & (s > .55) & (v > .5)); rel = ndi.binary_opening(rel, disk(1))
        y0 = int(rg[1] * 2); x0 = 0
        seed = out['lava'][y0:y0 + rel.shape[0], :rel.shape[1]] & rel
        g = seed
        for _ in range(50):
            n = ndi.binary_dilation(g, structure=np.ones((3, 3), bool)) & rel
            if (n == g).all(): break
            g = n
        g = pad(lambda q: ndi.binary_closing(q, disk(4)), g)
        out['lava'][y0:y0 + rel.shape[0], :rel.shape[1]] |= g
        if 'water' in out: out['water'][y0:y0 + rel.shape[0], :rel.shape[1]] &= ~ndi.binary_dilation(g, disk(2))
    for k in out: out[k] &= ~veto
    if 'lava' in out and 'water' in out: out['water'] &= ~ndi.binary_dilation(out['lava'], disk(2)) | out['water'] & False
    return out
# ------------------------------------------------------------------ geodesic flow (downhill to the sink)
def geodesic(mask2x, kind, step=8, solid_cost=14):
    H, W = mask2x.shape; h, w = H // step, W // step
    frac = mask2x[:h * step, :w * step].reshape(h, step, w, step).mean(axis=(1, 3)); liquid = frac > .25
    cost = np.where(liquid, 1., float(solid_cost)); idx = np.arange(h * w).reshape(h, w)
    rows, cols, wts = [], [], []
    for dy, dx in ((0, 1), (1, 0), (1, 1), (1, -1)):
        c0, c1 = max(0, -dx), w - max(0, dx)
        a = idx[0:h - dy, c0:c1]; b = idx[dy:h, c0 + dx:c1 + dx]
        ca, cb = cost.ravel()[a.ravel()], cost.ravel()[b.ravel()]; wt = (ca + cb) / 2 * np.hypot(dx, dy)
        rows += [a.ravel(), b.ravel()]; cols += [b.ravel(), a.ravel()]; wts += [wt, wt]
    A = coo_matrix((np.concatenate(wts), (np.concatenate(rows), np.concatenate(cols))), shape=(h * w, h * w)).tocsr()
    yy = (np.arange(h)[:, None] + .5) * step / 2 * np.ones((1, w))          # master y of each coarse cell
    if kind == 'lava':   # the sink is the lowest liquid of the lava canyon
        ly = yy[liquid].max(); sink = liquid & (yy > ly - 30)
    else:                # the wide river along the bottom
        sink = liquid & (yy > 2300)
    d = dijkstra(A, directed=False, indices=np.where(sink.ravel())[0], min_only=True).reshape(h, w)
    d[~np.isfinite(d)] = np.nanmax(d[np.isfinite(d)])
    ds = ndi.gaussian_filter(d, 1.5); gy, gx = np.gradient(ds); vx, vy = -gx, -gy
    wgt = ndi.gaussian_filter(liquid.astype(float), 2.5) + 1e-6
    vx = ndi.gaussian_filter(vx * liquid, 2.5) / wgt; vy = ndi.gaussian_filter(vy * liquid, 2.5) / wgt
    n = np.hypot(vx, vy); small = n < 1e-3
    return dict(vx=np.where(small, 0, vx / np.maximum(n, 1e-6)), vy=np.where(small, 1, vy / np.maximum(n, 1e-6)), step=step)
_fc = {}
def flow_at(kind, mask2x, rect, res):
    if kind not in _fc: _fc[kind] = geodesic(mask2x, kind)
    f = _fc[kind]; sc = f['step'] / 2
    W, H = int(round(rect[2] * res)), int(round(rect[3] * res))
    xs = (rect[0] + (np.arange(W) + .5) / res) / sc - .5; ys = (rect[1] + (np.arange(H) + .5) / res) / sc - .5
    X, Y = np.meshgrid(xs, ys)
    sx = ndi.map_coordinates(f['vx'], [Y, X], order=1, mode='nearest'); sy = ndi.map_coordinates(f['vy'], [Y, X], order=1, mode='nearest')
    n = np.hypot(sx, sy) + 1e-6; sx, sy = sx / n, sy / n
    if kind == 'water':   # the river along the bottom runs east, with a slow wobble; blended in by y so the cascades flow into it without a seam
        Ym = rect[1] + (np.arange(H)[:, None] + .5) / res * np.ones((1, W)); Xm = rect[0] + (np.arange(W)[None, :] + .5) / res * np.ones((H, 1))
        wr = smooth(Ym, RIVER_Y - 60, RIVER_Y + 70)
        ex, ey = np.ones_like(Xm), .12 + np.sin(Xm * .004) * .18; en = np.hypot(ex, ey); ex, ey = ex / en, ey / en
        sx = sx * (1 - wr) + ex * wr; sy = sy * (1 - wr) + ey * wr; n = np.hypot(sx, sy) + 1e-6; sx, sy = sx / n, sy / n
        vm = (.6 + .4 * smooth(sy, .4, .9)) * (1 - wr) + .62 * wr      # falls (flowing steeply down) run fast, the wide river slowly
    else:
        vm = .6 + .4 * smooth(sy, .4, .9)
    return sx, sy, vm
def sub(mask2x, rect):
    x0, y0, x1, y1 = [int(round(v * 2)) for v in (rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3])]
    out = np.zeros((y1 - y0, x1 - x0), bool)
    ax0, ax1, ay0, ay1 = max(0, x0), min(mask2x.shape[1], x1), max(0, y0), min(mask2x.shape[0], y1)
    if ax1 > ax0 and ay1 > ay0: out[ay0 - y0:ay1 - y0, ax0 - x0:ax1 - x0] = mask2x[ay0:ay1, ax0:ax1]
    return out
def down2(m2):
    h, w = (m2.shape[0] // 2) * 2, (m2.shape[1] // 2) * 2
    return m2[:h, :w].reshape(h // 2, 2, w // 2, 2).mean(axis=(1, 3))
# ------------------------------------------------------------------ independent overflow test (looser + different from the cutting gamut)
def loose(kind, img):
    h, s, v = hsv(img)
    if kind == 'lava': ok = (((h > 345) | (h < 58)) & (s > .5) & (v > .4)) | ((h > 15) & (h < 70) & (s > .2) & (v > .85))
    else: ok = ((h > 160) & (h < 240) & (s > .25) & (v > .1)) | ((s < .45) & (v > .75))   # water colour incl. dark troughs, foam and white falls
    return ndi.binary_dilation(ok, disk(2))
def overflow(kind, m2, rect):
    if m2.sum() == 0: return 0.0
    ok = loose(kind, ground(z, *rect)); return float(100 * (m2 & ~ok).sum() / m2.sum())
# ------------------------------------------------------------------ emit
def emit(pid, kind, core, mask2x, cell_mask, res=1):
    prm = params(kind); pad_ = padOf(prm)
    full = [core[0] - pad_, core[1] - pad_, core[2] + 2 * pad_, core[3] + 2 * pad_]
    a_full = sub(mask2x, full)
    soft = feather(down2(a_full), 1.5 * res)
    d = ndi.distance_transform_edt(np.pad(soft > .5, 1))[1:-1, 1:-1]
    sp = .5 + .5 * smooth(d, 0, 14 * res)
    vx, vy, vm = flow_at(kind, mask2x, full, res)
    mag = sp * vm
    rgb = np.zeros(soft.shape + (3,), np.uint8)
    rgb[..., 0] = np.clip(128 + 127 * vx * mag, 0, 255); rgb[..., 1] = np.clip(128 + 127 * vy * mag, 0, 255); rgb[..., 2] = np.clip(soft * 255, 0, 255)
    Image.fromarray(rgb, 'RGB').save(SH + pid + '.flow.png', optimize=True)
    ov = overflow(kind, cell_mask, core)
    return (dict(id=pid, group='flats', liquid=kind, kind='flat', rectPx=[int(v) for v in full], corePx=[int(v) for v in core], res=res, flow=pid + '.flow.png', **prm),
            dict(id=pid, liquid=kind, overflowPct=round(ov, 2), maskPx=int(cell_mask.sum()), bytes=os.path.getsize(SH + pid + '.flow.png')))
def main(cell=384, minpx=150):
    t = time.time(); masks = load_masks(); new, rep = [], []
    for kind in ('lava', 'water'):
        if kind not in masks: continue
        m = masks[kind]
        for cy in range(0, 9):
            for cx in range(0, 13):
                core = [cx * cell, cy * cell, min(cell, MASTER[0] - cx * cell), min(cell, MASTER[1] - cy * cell)]
                if core[2] <= 0 or core[3] <= 0: continue
                a = sub(m, core)
                if a.sum() / 4 < minpx: continue
                pc, r = emit(f'z{z}-{kind}-{cx}-{cy}', kind, core, m, a); new.append(pc); rep.append(r)
    new.sort(key=lambda p: (0 if p['liquid'] == 'water' else 1, p['id']))
    json.dump(dict(schemaVersion=2, masterSize=list(MASTER), worldSize=list(WORLD), pieces=new), open(SH + 'fluids.json', 'w'), indent=1)
    json.dump(rep, open(WORK + f'overflow-{z}.json', 'w'), indent=1)
    big = sorted(rep, key=lambda r: -r['overflowPct'])[:3]
    print('zone', z, 'pieces', len(new), 'bytes', sum(r['bytes'] for r in rep), round(time.time() - t, 1), 's  worst overflow', [(r['id'], r['overflowPct']) for r in big])
if __name__ == "__main__": main()
