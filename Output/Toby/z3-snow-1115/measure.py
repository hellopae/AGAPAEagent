"""numbers for the zone 3 snow (v8 vs v7 vs v1), on the installed tiles.  usage: python3 -I measure.py   -> work/measure.json
 - share of bright pixels (map 1x, below the far ridge): v1 / v7 / v8
 - new snow = pixels that v8 changed (|d|>8) outside the bridge-head box:   mean luminance vs v1's snow;  mean |Laplacian| vs the ring around it (sharpness)
 - straight edges: runs >= 30 px of an axis-aligned boundary of the new-snow mask (a rectangle would show many)"""
import json, os, sys
import numpy as np, cv2
from PIL import Image
R = os.path.expanduser('~/agapae-work/.toby-worktrees/z1-v5/')
WORK = os.path.dirname(os.path.abspath(__file__)) + '/work/'
def stitch(folder, size, tile=1024):
    W, H = size; out = np.zeros((H, W, 3), np.uint8)
    for r in range(1, -(-H // tile) + 1):
        for c in range(1, -(-W // tile) + 1):
            im = np.asarray(Image.open(f'{folder}/r{r}-c{c}.webp').convert('RGB'))
            out[(r-1)*tile:(r-1)*tile+im.shape[0], (c-1)*tile:(c-1)*tile+im.shape[1]] = im
    return out
v1 = stitch(R + 'img/map-zone3/v1', (4915, 3277)); v7 = stitch(R + 'img/map-zone3/v7', (9830, 6554)); v8 = stitch(R + 'img/map-zone3/v8', (9830, 6554))
L = lambda a: a.astype(np.float32) @ np.array([.2126, .7152, .0722], np.float32)
res = {}
s = lambda a: cv2.resize(a, (4915, 3277), interpolation=cv2.INTER_AREA)
l1, l7, l8 = L(v1), L(s(v7)), L(s(v8)); sl = slice(420, None)
res['meanLum'] = [round(float(x[sl].mean()), 2) for x in (l1, l7, l8)]
for t in (190, 210, 225, 235): res[f'share>{t}'] = [round(float((x[sl] > t).mean()), 4) for x in (l1, l7, l8)]
bx0, by0, bx1, by1 = (v * 2 for v in (2302, 1807, 2623, 2168))
d = np.abs(v8.astype(np.int16) - v7.astype(np.int16)).max(2) > 8
d[by0:by1, bx0:bx1] = False
res['changedShare2x'] = round(float(d.mean()), 4)
core = cv2.erode(d.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
ring = (cv2.dilate(d.astype(np.uint8), np.ones((61, 61), np.uint8)) > 0) & ~(cv2.dilate(d.astype(np.uint8), np.ones((9, 9), np.uint8)) > 0)
g8 = L(v8); lap = np.abs(cv2.Laplacian(g8, cv2.CV_32F, ksize=3))
# ring: only ground-like pixels (not water): skip saturated cyan
hsv = cv2.cvtColor(v8, cv2.COLOR_RGB2HSV); ring &= ~((hsv[..., 0] >= 82) & (hsv[..., 0] <= 106) & (hsv[..., 1] > 100))
res['lapNew'] = round(float(lap[core].mean()), 3); res['lapRing'] = round(float(lap[ring].mean()), 3); res['lapRatio'] = round(res['lapNew'] / res['lapRing'], 3)
# the same for the snow-coloured pixels of the ring only (the existing snow next to it)
rs = ring & (g8 > 200); res['lapRingSnow'] = round(float(lap[rs].mean()), 3); res['lapRatioVsRingSnow'] = round(res['lapNew'] / res['lapRingSnow'], 3)
top = core & (g8 > 205)
v1s = l1[l1 > 205]
res['newSnowBrightMean'] = round(float(g8[top].mean()), 2); res['v1SnowBrightMean'] = round(float(v1s.mean()), 2)
res['newSnowMean(all core)'] = round(float(g8[core].mean()), 2)
# v1 snow (S1 pixels) mean vs new snow (core) mean
h = cv2.cvtColor(v1, cv2.COLOR_RGB2HSV); f = v1.astype(np.int16)
s1 = (f[..., 0] > 150) & (f[..., 1] > 165) & (f[..., 2] > 180) & (h[..., 1] < 80); s1[:420] = False
res['v1SnowMean'] = round(float(l1[s1].mean()), 2); res['newSnowVsV1SnowPct'] = round(100 * (res['newSnowMean(all core)'] / res['v1SnowMean'] - 1), 2)
# straight axis-aligned edges
def straight(m):
    cnt = 0
    for axis in (0, 1):
        mm = m if axis == 0 else m.T
        e = mm[:, 1:] != mm[:, :-1]                        # e[y, x]: an edge between x and x+1
        # a straight vertical edge = long run of True along y at the same x
        k = np.ones((30, 1), np.uint8)
        runs_ = cv2.erode(e.astype(np.uint8), k)
        cnt += int(cv2.connectedComponents(runs_)[0] - 1)
    return cnt
res['straightEdges>=30px'] = straight(d)
res['bridgeBoxExcluded'] = True
print(json.dumps(res, indent=1)); json.dump(res, open(WORK + 'measure.json', 'w'), indent=1)
