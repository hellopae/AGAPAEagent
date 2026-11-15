"""classify the liquids of zone 2 / 3 / 4 on the v7 ground (2x px) -> work/mask_<zone>_<kind>.npy (bool, full 9830 x 6554).
usage: python3 -I cls.py <zone> [kind ...]      kinds: lava | water (+ river = the water below RIVER_Y) """
import sys, time; sys.path.insert(0, '.')
from zl import *
RIVER_Y = 2090          # master px: the wide river along the bottom of the town starts here (same in all 3 zones)
def water2(img):   # teal water; the dark troughs of the waves are grown in from it (see grow)
    h, s, v = hsv(img); return (h > 170) & (h < 197) & (s > .6) & (v > .36)
def water3(img):   # saturated blue / cyan; the icy cliffs, snow and icicles are desaturated pale blue-grey and stay out
    h, s, v = hsv(img); return (h > 178) & (h < 205) & (s > .6) & (v > .4)
def water4(img):   # electric cyan / blue data river
    h, s, v = hsv(img); return (h > 172) & (h < 232) & (s > .55) & (v > .45)
def loose_water(img, hmax=236, smin=.34):   # the same water in its dark troughs / lit foam (never rock: rock is s < .3)
    h, s, v = hsv(img); return (h > 168) & (h < hmax) & (s > smin) & (v > .14)
def lava_core(img):
    h, s, v = hsv(img)
    return (((h > 11) & (h < 56) & (s > .72) & (v > .88)) | ((h > 22) & (h < 66) & (s > .3) & (v > .94)))
GAMUT = {(2, 'lava'): lava_core, (4, 'lava'): lava_core, (2, 'water'): water2, (3, 'water'): water3, (4, 'water'): water4}
PARAM = {(2, 'lava'): dict(close_r=9, open_r=2, min_area=5000, hole=400), (4, 'lava'): dict(close_r=9, open_r=2, min_area=5000, hole=400),
         (2, 'water'): dict(close_r=7, open_r=2, min_area=12000, hole=1500), (3, 'water'): dict(close_r=7, open_r=2, min_area=12000, hole=1500), (4, 'water'): dict(close_r=7, open_r=2, min_area=12000, hole=1500)}
GROW = 8
LOOSE = {2: (202, .4), 3: (207, .4), 4: (236, .34)}
REG = {'lava': [0, 0, 1900, 2500]}    # lava only lives in the top-left canyon of the town (zones 2 and 4)
def liquid_mask(img, z, kind):
    p = PARAM[(z, kind)]; g = GAMUT[(z, kind)](img)
    g = ndi.binary_opening(g, disk(p['open_r']))
    if kind == 'water':     # grow the strict core into the dark troughs of the waves, at most GROW px, only through water-coloured pixels
        lo = loose_water(img, *LOOSE[z]); gg = g
        for _ in range(GROW):
            gg = ndi.binary_dilation(gg, structure=np.ones((3, 3), bool)) & (lo | g)
        g = gg
    g = pad(lambda q: ndi.binary_closing(q, disk(p['close_r'])), g)
    holes = ndi.binary_fill_holes(g) & ~g
    lab, n = ndi.label(holes)
    if n:
        sz = ndi.sum(holes, lab, range(1, n+1)); g = g | np.isin(lab, [i+1 for i, z_ in enumerate(sz) if z_ <= p['hole']])
    if kind == 'water':     # big holes that are still blue-ish and saturated = the dark troughs of a wave field, not a rock island
        hh, ss, vv = hsv(img); blue = (hh > 168) & (hh < 232) & (ss > .28)
        holes = ndi.binary_fill_holes(g) & ~g; lab, n = ndi.label(holes)
        if n:
            idx = range(1, n+1); sz = ndi.sum(holes, lab, idx); fr = ndi.mean(blue, lab, idx)
            g = g | np.isin(lab, [i for i, z_, f in zip(idx, sz, fr) if z_ <= 16000 and f > .55])
    lab, n = ndi.label(g)
    if not n: return g
    sz = ndi.sum(g, lab, range(1, n+1))
    return np.isin(lab, [i+1 for i, z_ in enumerate(sz) if z_ >= p['min_area']])
def run(z, kind, B=1100, m=140):
    out = np.zeros((6554, 9830), bool)
    reg = REG.get(kind, [0, 0, 4915, 3277])
    x0, y0, w, h = reg; X0, X1 = int(x0*2), int((x0+w)*2); Y0, Y1 = int(y0*2), int(min(3277, y0+h)*2)
    for ya in range(Y0, Y1, B):
        a, b = max(0, ya-m), min(6554, ya+B+m)
        img = ground(z, X0/2, a/2, (X1-X0)/2, (b-a)/2)
        mk = liquid_mask(img, z, kind)
        yb = min(Y1, ya+B)
        out[ya:yb, X0:X1] = mk[ya-a:yb-a]
    return out
if __name__ == '__main__':
    z = int(sys.argv[1]); kinds = sys.argv[2:] or [k for (zz, k) in GAMUT if zz == z]
    for kind in kinds:
        t = time.time(); m = run(z, kind)
        np.save(WORK+f'mask_{z}_{kind}.npy', m); print(z, kind, round(m.mean(), 4), round(time.time()-t, 1), 's')
