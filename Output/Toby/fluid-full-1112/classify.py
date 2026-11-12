"""classify the liquid on the v7 ground (2x px) into global masks.  usage: python3 -I classify.py [lava|ice|spirit ...]
writes work/mask_<kind>.npy (bool, region-local) + work/mask_<kind>.json (region origin, master px)."""
import sys, time; sys.path.insert(0, '.')
from cls import *
REG = dict(lava=[0, 0, 1760, 2450], ice=[2950, 150, 1965, 2150], spirit=[0, 2090, 4915, 520], cloud=[0, 0, 4915, 1300])
def band(kind, reg, B=1100, m=140):
    x, y, w, h = reg; H = int(h*2); out = np.zeros((H, int(w*2)), bool)
    for y0 in range(0, H, B):
        a, b = max(0, y0-m), min(H, y0+B+m)
        img = ground(x, y + a/2, w, (b-a)/2)
        mk = liquid_mask(img, kind)
        if kind == 'lava':
            rr = lava_in_river(img); ym = (y + (a + np.arange(b-a))/2) > 2100
            mk = mk | (rr & ym[:, None] & ndi.binary_dilation(mk, disk(2), iterations=60))   # only stripes that connect to the lava above
        if kind == 'spirit': mk = spirit_extend(img, mk)
        out[y0:min(H, y0+B)] = mk[y0-a:y0-a+min(B, H-y0)]
    return out
CODEX_CLOUD = '/Users/agapae/agapae-work/.codex-worktrees/20261110T163205Z-62071b39/docs/art-reviews/2026-11-05-z1v7-clouds/cloud-layer-mask.png'
def cloud_band(reg):
    # painted cloud = pale, low-saturation, SMOOTH area big enough to be a bank (an opening of 9 px drops the thin snow strips on the plateau rims and snow-capped trees),
    # inside the cloud-sea window only (never the ice side: snow there is the same colour)
    out = np.zeros((int(reg[3]*2), int(reg[2]*2)), bool)
    win = [2300, 0, 1650, 1000]
    img = ground(*win); h, s, v = hsv(img)
    core = (s < .38) & (v > .82)                               # bright cloud body (mountain faces and sky glow are dimmer or more saturated) ...
    gate = (s < .42) & (v > .68)
    core = ndi.binary_opening(core, disk(7))
    g = core
    for _ in range(4): g = ndi.binary_dilation(g, disk(4)) & gate     # ... then its shaded rim, at most 16 px out
    g = ndi.binary_opening(g, disk(6)); g = pad(lambda q: ndi.binary_closing(q, disk(6)), g)
    lab, n = ndi.label(g); sz = ndi.sum(g, lab, range(1, n+1)); g = np.isin(lab, [i+1 for i, z in enumerate(sz) if z > 9000])
    g[:150] = False                                           # the sky strip above master y 75 is not cloud sea; the mask is faded in below that (build_fluids)
    for (x0, y0, w_, h_) in ((2860, 440, 130, 90), (3130, 270, 200, 70)):   # snow patches on the plateau rim that have the colour of cloud (hand-listed, seen on the overlay)
        g[int((y0-win[1])*2):int((y0+h_-win[1])*2), int((x0-win[0])*2):int((x0+w_-win[0])*2)] = False
    out[int(win[1]*2):int(win[1]*2)+g.shape[0], int(win[0]*2):int(win[0]*2)+g.shape[1]] = g
    return out
for kind in (sys.argv[1:] or ['lava', 'ice', 'spirit']):
    t = time.time(); reg = REG[kind]
    m = cloud_band(reg) if kind == 'cloud' else band(kind, reg, B=1100 if kind != 'spirit' else 2200)
    np.save(WORK+f'mask_{kind}.npy', m); json.dump(dict(region=reg), open(WORK+f'mask_{kind}.json', 'w'))
    print(kind, m.shape, round(m.mean(), 4), round(time.time()-t, 1), 's')
