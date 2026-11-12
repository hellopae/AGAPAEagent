from fl import *
# --- colour gamuts (v7 ground, HSV): the "liquid" test.  tuned on the overlays in work/ (see report)
def lava_core(img):
    h, s, v = hsv(img)
    return (((h > 11) & (h < 56) & (s > .72) & (v > .88)) | ((h > 22) & (h < 66) & (s > .3) & (v > .94)))   # + the white-hot splash at a fall's foot
def ice_core(img):
    h, s, v = hsv(img)
    return (h > 184) & (h < 213) & (s > .66) & (v > .72)
def spirit_core(img):
    h, s, v = hsv(img)
    return (h > 248) & (h < 325) & (s > .3) & (v > .14)
GAMUT = dict(lava=lava_core, ice=ice_core, spirit=spirit_core)
PARAM = dict(lava=dict(close_r=9, open_r=2, min_area=5000, hole=400), ice=dict(close_r=7, open_r=2, min_area=800, hole=900), spirit=dict(close_r=6, open_r=2, min_area=3000, hole=90000))
def liquid_mask(img, kind, **kw):
    p = dict(PARAM[kind]); p.update(kw)
    g = GAMUT[kind](img)
    g = ndi.binary_opening(g, disk(p['open_r']))
    g = pad(lambda q: ndi.binary_closing(q, disk(p['close_r'])), g)
    holes = ndi.binary_fill_holes(g) & ~g           # small holes only (dark crust cells / foam), never a rock island
    lab, n = ndi.label(holes)
    if n:
        sz = ndi.sum(holes, lab, range(1, n+1)); g = g | np.isin(lab, [i+1 for i, z in enumerate(sz) if z <= p['hole']])
    if kind == 'lava':                              # dark red crust plates inside the flow: holes that are still saturated red-orange (not grey rock) are lava too
        h_, s_, v_ = hsv(img)
        crust = ((h_ < 22) | (h_ > 340)) & (s_ > .6) & (v_ > .3)
        holes = ndi.binary_fill_holes(g) & ~g
        lab, n = ndi.label(holes)
        if n:
            idx = range(1, n+1); sz = ndi.sum(holes, lab, idx); fr = ndi.mean(crust, lab, idx)
            g = g | np.isin(lab, [i for i, z, f in zip(idx, sz, fr) if z <= 8000 and f > .55])
    lab, n = ndi.label(g)
    if not n: return g
    sz = ndi.sum(g, lab, range(1, n+1))
    return np.isin(lab, [i+1 for i, z in enumerate(sz) if z >= p['min_area']])

def spirit_extend(img, base, steps=45):
    """the river where lava bleeds into it is red-violet (hue ~340-360, dark): grow the purple body into those pixels, at most `steps` px, never through bright foliage."""
    h, s, v = hsv(img)
    red = (((h >= 325) | (h < 14)) & (s > .45) & (v > .2) & (v < .66))
    red = ndi.binary_opening(red, disk(1)) | ((h > 248) & (h < 325) & (s > .3) & (v > .14))
    hot = ndi.binary_opening(lava_core(img), disk(2))                 # only around the lava stripes that run into the river
    red = red & (ndi.distance_transform_edt(~hot) < 90)
    g = base.copy()
    for _ in range(steps):
        n = ndi.binary_dilation(g, structure=np.ones((3, 3), bool)) & (red | base)
        if (n == g).all(): break
        g = n
    g = pad(lambda q: ndi.binary_closing(q, disk(4)), g)
    return ndi.binary_fill_holes(g)

def lava_in_river(img, close_r=7, min_area=2500):
    """where the lava runs on into the purple river (master y > 2100) it dims to crust red: a relaxed test, only used there."""
    h, s, v = hsv(img)
    g = ((h < 52) | (h > 350)) & (s > .6) & (v > .58)
    g = ndi.binary_opening(g, disk(2))
    g = pad(lambda q: ndi.binary_closing(q, disk(close_r)), g)
    lab, n = ndi.label(g)
    if not n: return g
    sz = ndi.sum(g, lab, range(1, n+1))
    return np.isin(lab, [i+1 for i, z in enumerate(sz) if z >= min_area])
