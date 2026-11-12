"""FLUID-SHADER full map: build the flow-map files + fluids.json the WebGL fluid layer reads.
usage: python3 -I build_fluids.py <groups: falls,flats,spirit>   (writes into the game repo img/map-zone1/v5-fx/shader/, measures overflow -> work/overflow-<group>.json)
Per piece:  <id>.flow.png  RGB  R,G = flow direction*speed (128 = still, +x right, +y down)  B = liquid mask (feathered), over the PADDED rect
Masks:  falls = Codex v7 mask when Codex measured it <=3% (copied, nothing re-cut), else cut from the ground colour inside Codex's rect
        flats / rivers = cut from the v7 ground colour (work/mask_<kind>.npy, classify.py), cell by cell
Nothing here touches the ground art."""
import sys, os, time
sys.path.insert(0, '.')
from fl import *
from scipy.sparse import coo_matrix
from scipy.sparse.csgraph import dijkstra
CX = '/Users/agapae/agapae-work/.toby-worktrees/.codex-worktrees/20261111T162400Z-9a28b146/docs/art-reviews/2026-11-05-z1v7-fluids/'
os.makedirs(SH, exist_ok=True)
U = WORLD[0]/MASTER[0]
def gmask(kind):
    m = np.load(WORK+f'mask_{kind}.npy'); r = json.load(open(WORK+f'mask_{kind}.json'))['region']; return m, r
def sub(kind, rect, cache={}):
    """bool mask of `kind` at 2x px over a master rect (zeros outside the classified region)."""
    if kind not in cache: cache[kind] = gmask(kind)
    m, r = cache[kind]
    x0, y0, x1, y1 = [int(round(v*2)) for v in (rect[0]-r[0], rect[1]-r[1], rect[0]+rect[2]-r[0], rect[1]+rect[3]-r[1])]
    out = np.zeros((y1-y0, x1-x0), bool)
    ax0, ax1, ay0, ay1 = max(0, x0), min(m.shape[1], x1), max(0, y0), min(m.shape[0], y1)
    if ax1 > ax0 and ay1 > ay0: out[ay0-y0:ay1-y0, ax0-x0:ax1-x0] = m[ay0:ay1, ax0:ax1]
    return out
# ------------------------------------------------------------------ type parameters (look + speed per liquid)
PARAMS = {
 ('lava', 'fall'):   dict(speed=.9, cycle=14, warp=.55, pulse=.22, hot=[.5, .92], shimmer=.12, spark=[1.0, .86, .55], sparkCell=7, sparkDensity=.45, sparkSize=1.25, sparkLum=.35, drift=[0, 14]),
 ('lava', 'flat'):   dict(speed=.55, cycle=16, warp=.7, pulse=.25, hot=[.5, .92], shimmer=.12, spark=[1.0, .8, .45], sparkCell=11, sparkDensity=.3, sparkSize=1.6, sparkLum=.35, drift=[7, 4]),
 ('ice', 'fall'):    dict(speed=1.0, cycle=12, warp=.4, pulse=.14, hot=[.62, .95], shimmer=.1, spark=[.85, .97, 1.0], sparkCell=8, sparkDensity=.35, sparkSize=1.1, sparkLum=.45, drift=[0, 12]),
 ('ice', 'flat'):    dict(speed=.6, cycle=14, warp=.65, pulse=.12, hot=[.62, .95], shimmer=.1, spark=[.85, .97, 1.0], sparkCell=12, sparkDensity=.28, sparkSize=1.3, sparkLum=.45, drift=[6, 3]),
 ('cloud', 'flat'):  dict(speed=.16, cycle=34, warp=.6, pulse=0., hot=[.9, 1.], shimmer=.05, spark=[1., 1., 1.], sparkCell=20, sparkDensity=0., sparkSize=1., sparkLum=.99, drift=[0, 0]),
 ('spirit', 'flat'): dict(speed=.4, cycle=15, warp=.5, pulse=.2, hot=[.45, .85], shimmer=.22, spark=[.95, .8, 1.0], sparkCell=13, sparkDensity=.3, sparkSize=1.5, sparkLum=.3, drift=[5, 1]),
}
def padOf(p): return int(np.ceil(p['cycle']*.8/U))+3     # master px beyond the core the flow file must cover (a sample slides up to ~.68 cycle)
# ------------------------------------------------------------------ independent overflow test (NOT the cutting gamut: looser, different features)
def loose(kind, img):
    """a second, looser and different test of 'this pixel is liquid colour' (not the cutting gamut): any lava-coloured / water-coloured / purple pixel, crust and foam
    included, but not rock (low saturation or dark).  A mask pixel farther than 2 ground px from such a pixel counts as overflow."""
    h, s, v = hsv(img)
    lava = (((h > 345) | (h < 58)) & (s > .55) & (v > .45)) | ((h > 15) & (h < 70) & (s > .2) & (v > .9))   # + the white-hot splash
    if kind == 'lava': ok = lava
    elif kind == 'cloud': ok = (s < .6) & (v > .5)
    elif kind == 'ice': ok = ((h > 172) & (h < 236) & (s > .4) & (v > .55)) | ((s < .3) & (v > .82))
    else: ok = ((h > 245) & (h < 335) & (s > .3) & (v > .14)) | (((h >= 335) | (h < 6)) & (s > .4) & (v > .3)) | ((v > .78) & (s < .5)) | lava
    return ndi.binary_dilation(ok, disk(2))
def overflow(kind, mask2x, rect):
    if mask2x.sum() == 0: return 0.0
    img = ground(*rect)
    ok = loose(kind, img)
    return float(100*(mask2x & ~ok).sum()/mask2x.sum())
# ------------------------------------------------------------------ geodesic flow (downhill to the sink) on a coarse grid
def geodesic_flow(kind, step=8, solid_cost=14):
    m, r = gmask(kind)
    H, W = m.shape; h, w = H//step, W//step
    frac = m[:h*step, :w*step].reshape(h, step, w, step).mean(axis=(1, 3))
    liquid = frac > .25
    cost = np.where(liquid, 1., float(solid_cost))
    idx = np.arange(h*w).reshape(h, w)
    rows, cols, wts = [], [], []
    for dy, dx in ((0, 1), (1, 0), (1, 1), (1, -1)):
        c0, c1 = max(0, -dx), w-max(0, dx)
        a = idx[0:h-dy, c0:c1]; b = idx[dy:h, c0+dx:c1+dx]
        ca, cb = cost.ravel()[a.ravel()], cost.ravel()[b.ravel()]
        wt = (ca+cb)/2*np.hypot(dx, dy)
        rows += [a.ravel(), b.ravel()]; cols += [b.ravel(), a.ravel()]; wts += [wt, wt]
    A = coo_matrix((np.concatenate(wts), (np.concatenate(rows), np.concatenate(cols))), shape=(h*w, h*w)).tocsr()
    sink = np.zeros((h, w), bool); sink[-2:, :] = True        # the bottom of the classified region = the purple river
    d = dijkstra(A, directed=False, indices=np.where(sink.ravel())[0], min_only=True).reshape(h, w)
    d[~np.isfinite(d)] = np.nanmax(d[np.isfinite(d)])
    ds = ndi.gaussian_filter(d, 1.5)
    gy, gx = np.gradient(ds)
    vx, vy = -gx, -gy
    # smooth the direction inside the liquid only (normalised convolution), then unit length; a floor of 'down' where it vanishes
    wgt = ndi.gaussian_filter(liquid.astype(float), 2.5)+1e-6
    vx = ndi.gaussian_filter(vx*liquid, 2.5)/wgt; vy = ndi.gaussian_filter(vy*liquid, 2.5)/wgt
    n = np.hypot(vx, vy); small = n < 1e-3
    vx = np.where(small, 0, vx/np.maximum(n, 1e-6)); vy = np.where(small, 1, vy/np.maximum(n, 1e-6))
    return dict(vx=vx, vy=vy, origin=r, step=step)
_flow_cache = {}
def flow_at(kind, rect, res):
    """flow unit vectors sampled for a master rect at `res` px per master px"""
    if kind not in _flow_cache: _flow_cache[kind] = geodesic_flow(kind)
    f = _flow_cache[kind]; sc = f['step']/2          # master px per coarse px
    W, H = int(round(rect[2]*res)), int(round(rect[3]*res))
    xs = (rect[0]+(np.arange(W)+.5)/res-f['origin'][0])/sc-.5; ys = (rect[1]+(np.arange(H)+.5)/res-f['origin'][1])/sc-.5
    X, Y = np.meshgrid(xs, ys)
    sx = ndi.map_coordinates(f['vx'], [Y, X], order=1, mode='nearest'); sy = ndi.map_coordinates(f['vy'], [Y, X], order=1, mode='nearest')
    n = np.hypot(sx, sy)+1e-6
    return sx/n, sy/n
def down(mask, rect, res):
    """straight-down flow with a pinch toward the fall's own centre (the pilot's lava-fall field)."""
    d = ndi.distance_transform_edt(np.pad(mask, 1))[1:-1, 1:-1]
    sp = .55+.45*smooth(d, 0, max(1, .35*d.max()))
    yy, xx = np.mgrid[0:mask.shape[0], 0:mask.shape[1]].astype(float); cx = (mask*xx).sum()/max(1, mask.sum())
    vx = np.clip((cx-xx)/mask.shape[1]*.35, -.3, .3)*sp; vy = sp
    return vx, vy*np.ones_like(vx), sp
def write_flow(pid, soft, vx, vy, res):
    rgb = np.zeros(soft.shape+(3,), np.uint8)
    rgb[..., 0] = np.clip(128+127*vx, 0, 255); rgb[..., 1] = np.clip(128+127*vy, 0, 255); rgb[..., 2] = np.clip(soft*255, 0, 255)
    Image.fromarray(rgb, 'RGB').save(SH+pid+'.flow.png', optimize=True)
    return os.path.getsize(SH+pid+'.flow.png')
def down2(m2, res):   # 2x-px bool -> res (px per master px) float coverage
    if res == 2: return m2.astype(float)
    h, w = (m2.shape[0]//2)*2, (m2.shape[1]//2)*2
    return m2[:h, :w].reshape(h//2, 2, w//2, 2).mean(axis=(1, 3))
# ------------------------------------------------------------------ pieces
def layout():
    d = json.load(open(CX+'fx-layout.json')); return {p['id'].split('--')[0]: p for p in d['pieces'] if p['kind'] == 'rect'}
def codex_pct():
    r = json.load(open(CX+'review/liquid-reference-result.json')); return {m['mask']: m['outsidePercentUpperBound'] for m in r['measurements']}
FALL_KIND = lambda n: 'lava' if n.startswith('lavafall') else 'ice'
def build_falls():
    lay, pct = layout(), codex_pct(); out = []
    for name, p in lay.items():
        kind = FALL_KIND(name); rect = p['maskRectPx']; src = 'codex' if pct.get(name, 99) <= 3 else 'colour'
        if src == 'codex':
            a = np.array(Image.open(CX+'masks/'+p['mask']+'.webp').convert('RGBA'))[..., 3] > 127
            assert a.shape == (rect[3]*2, rect[2]*2), (name, a.shape, rect)
        else:
            a = sub(kind, rect)
        if name == 'icefall-upper-tree' and a.sum() < 50: continue
        out.append((name, kind, rect, a, src, pct.get(name)))
    return out
def emit_fall(name, kind, rect, a2, src, cpct, res=2):
    prm = dict(PARAMS[(kind, 'fall')]); pad = padOf(prm)
    full = [rect[0]-pad, rect[1]-pad, rect[2]+2*pad, rect[3]+2*pad]
    a = np.pad(a2, pad*2)                                           # at 2x px: the padded rect (nothing outside the fall's own mask)
    soft = feather(a, 3.0)
    vx, vy, sp = down(a, full, res)
    ov = overflow(kind, a2, rect)
    n = write_flow(name, soft, vx*a, vy*a, res)
    return dict(id=name, group='falls', liquid=kind, kind='fall', rectPx=full, corePx=rect, res=res, flow=name+'.flow.png', **prm), dict(id=name, liquid=kind, source=src, codexPct=cpct, overflowPct=round(ov, 2), maskPx=int(a2.sum()), bytes=n)
def build_cells(kind, cell=384, minpx=150):
    m, r = gmask(kind); out = []
    for cy in range(int(r[1]//cell), int((r[1]+r[3])//cell)+1):
        for cx in range(int(r[0]//cell), int((r[0]+r[2])//cell)+1):
            core = [cx*cell, cy*cell, cell, cell]
            core = [max(core[0], r[0]), max(core[1], r[1]), 0, 0]; core[2] = min((cx+1)*cell, r[0]+r[2])-core[0]; core[3] = min((cy+1)*cell, r[1]+r[3])-core[1]
            if core[2] <= 0 or core[3] <= 0: continue
            a = sub(kind, core)
            if a.sum()/4 < minpx: continue
            out.append((f'{kind}-flat-{cx}-{cy}', kind, [int(v) for v in core], a))
    return out
def emit_cell(pid, kind, core, a_core, res=1):
    prm = dict(PARAMS[(kind, 'flat')]); pad = padOf(prm)
    full = [core[0]-pad, core[1]-pad, core[2]+2*pad, core[3]+2*pad]
    a_full = sub(kind, full)                                         # the liquid in the padded rect (neighbouring cells' liquid counts for sampling)
    if kind == 'spirit':                                             # lava stripes that run into the river stay lava
        lava = sub('lava', full); a_full = a_full & ~ndi.binary_dilation(lava, disk(2))
    soft = feather(down2(a_full, res), 1.5*res)
    d = ndi.distance_transform_edt(np.pad(soft > .5, 1))[1:-1, 1:-1]
    sp = .5+.5*smooth(d, 0, 14*res)
    if kind == 'spirit':
        yy, xx = np.mgrid[0:soft.shape[0], 0:soft.shape[1]].astype(float)
        wob = np.sin((xx/res+full[0])*.004)*.18
        vx, vy = np.ones_like(sp), .12+wob
        n = np.hypot(vx, vy); vx, vy = vx/n, vy/n
    else: vx, vy = flow_at(kind, full, res)
    sz = write_flow(pid, soft, vx*sp, vy*sp, res)
    inc = a_core & (sub(kind, core) if kind != 'spirit' else a_core)
    ov = overflow(kind, a_core, core)
    return dict(id=pid, group='flats', liquid=kind, kind='flat', rectPx=full, corePx=core, res=res, flow=pid+'.flow.png', **prm), dict(id=pid, liquid=kind, source='colour', overflowPct=round(ov, 2), maskPx=int(a_core.sum()), bytes=sz)
def emit_cloud(pid, core, a_core, res=1):
    prm = dict(PARAMS[('cloud', 'flat')]); pad = padOf(prm)
    full = [core[0]-pad, core[1]-pad, core[2]+2*pad, core[3]+2*pad]
    a_full = sub('cloud', full)
    soft = feather(down2(a_full, res), 2.0*res)
    ramp = smooth(full[1]+np.arange(soft.shape[0])/res, 80, 130)[:, None]     # the horizon strip fades out instead of ending on a straight line
    soft = soft*ramp
    # a slow wind with swirl: direction bends +-.5 rad and strength .55..1 by two smooth value-noise fields (world-anchored so cells agree)
    H, W = soft.shape; yy, xx = np.mgrid[0:H, 0:W].astype(float); X = full[0]+xx/res; Y = full[1]+yy/res
    def vn(x, y, sc, seed):
        rng = np.random.default_rng(seed); gx, gy = int(4915/sc)+3, int(3277/sc)+3; g = rng.random((gy, gx))
        return ndi.map_coordinates(g, [y/sc, x/sc], order=3, mode='nearest')
    ang = (vn(X, Y, 260, 1)-.5)*1.0; mag = .55+.45*vn(X, Y, 340, 2)
    vx, vy = np.cos(ang)*mag, (np.sin(ang)+.1)*mag
    sz = write_flow(pid, soft, vx*(soft > .02), vy*(soft > .02), res)
    ov = overflow('cloud', a_core, core)
    return dict(id=pid, group='clouds', liquid='cloud', kind='flat', rectPx=full, corePx=core, res=res, flow=pid+'.flow.png', **prm), dict(id=pid, liquid='cloud', source='colour', overflowPct=round(ov, 2), maskPx=int(a_core.sum()), bytes=sz)
if __name__ == '__main__':
    groups = sys.argv[1].split(',') if len(sys.argv) > 1 else ['falls', 'flats', 'spirit']
    fl_path = SH+'fluids.json'
    cur = json.load(open(fl_path)) if os.path.exists(fl_path) else dict(schemaVersion=2, masterSize=list(MASTER), worldSize=list(WORLD), pieces=[])
    keep = [p for p in cur['pieces'] if p['group'] not in groups and not (p['group'] == 'flats' and p['liquid'] == 'spirit' and 'spirit' in groups)]
    if 'flats' in groups and 'spirit' not in groups: keep += [p for p in cur['pieces'] if p['group'] == 'flats' and p['liquid'] == 'spirit']
    seen = set(); keep = [p for p in keep if not (p['id'] in seen or seen.add(p['id']))]
    new, rep = [], []
    t = time.time()
    if 'falls' in groups:
        for name, kind, rect, a, src, cp in build_falls():
            pc, r = emit_fall(name, kind, rect, a, src, cp); new.append(pc); rep.append(r); print(r)
    if 'clouds' in groups:
        for pid, k, core, a in build_cells('cloud', minpx=300):
            pc, r = emit_cloud(pid, core, a); new.append(pc); rep.append(r); print(r)
    for g, kinds in (('flats', ['lava', 'ice']), ('spirit', ['spirit'])):
        if g not in groups: continue
        for kind in kinds:
            for pid, k, core, a in build_cells(kind):
                pc, r = emit_cell(pid, k, core, a); new.append(pc); rep.append(r); print(r)
    cur['pieces'] = keep+new
    # draw order: the spirit river first, then lava / ice flats, falls last (on top)
    order = lambda p: 0 if p['liquid'] in ('spirit', 'cloud') else 1 if p['kind'] == 'flat' else 2
    cur['pieces'].sort(key=lambda p: (order(p), p['id']))
    json.dump(cur, open(fl_path, 'w'), indent=1)
    json.dump(rep, open(WORK+'overflow-'+'+'.join(groups)+'.json', 'w'), indent=1)
    print('pieces', len(cur['pieces']), 'new', len(new), round(time.time()-t, 1), 's', 'bytes', sum(r['bytes'] for r in rep))
