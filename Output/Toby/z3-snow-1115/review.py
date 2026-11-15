"""review panels v1 | v7 | v8 (map 1x rois, drawn at 2x) -> Output/Review/2026-11-15-z3-snow-code/<name>.jpg ; v8 = the installed tiles."""
import os, json
import numpy as np, cv2
from PIL import Image, ImageDraw
R = os.path.expanduser('~/agapae-work/.toby-worktrees/z1-v5/')
OUT = os.path.expanduser('~/Documents/Work PAE/Claude/AGAPAE Agent/Output/Review/2026-11-15-z3-snow-code/'); os.makedirs(OUT, exist_ok=True)
def tiles(folder, tile, x0, y0, x1, y1):
    out = np.zeros((y1 - y0, x1 - x0, 3), np.uint8)
    for r in range(y0 // tile, (y1 - 1) // tile + 1):
        for c in range(x0 // tile, (x1 - 1) // tile + 1):
            im = np.asarray(Image.open(f'{folder}/r{r+1}-c{c+1}.webp').convert('RGB'))
            ax0, ay0, ax1, ay1 = max(x0, c*tile), max(y0, r*tile), min(x1, c*tile + im.shape[1]), min(y1, r*tile + im.shape[0])
            out[ay0-y0:ay1-y0, ax0-x0:ax1-x0] = im[ay0-r*tile:ay1-r*tile, ax0-c*tile:ax1-c*tile]
    return out
ROIS = {'1-main-plaza': (2160, 1050, 2810, 1620), '2-central-bridge-head': (2260, 1770, 2700, 2220), '3-riverside': (2200, 2110, 2770, 2640),
        '4-cliff-foot-west': (1040, 1270, 1650, 1800), '5-north-stairs': (300, 280, 800, 950), '6-south-plaza': (2130, 2600, 2820, 3090),
        '7-east-bank-cliff-top': (3980, 880, 4600, 1410), '8-south-west-drifts': (1380, 2640, 1960, 3000)}
for name, (x0, y0, x1, y1) in ROIS.items():
    a = cv2.resize(tiles(R + 'img/map-zone3/v1', 1024, x0, y0, x1, y1), ((x1-x0)*2, (y1-y0)*2), interpolation=cv2.INTER_CUBIC)
    b = tiles(R + 'img/map-zone3/v7', 1024, x0*2, y0*2, x1*2, y1*2); c = tiles(R + 'img/map-zone3/v8', 1024, x0*2, y0*2, x1*2, y1*2)
    H, W = a.shape[:2]; im = Image.new('RGB', (W*3 + 20, H + 34), (17, 22, 30)); d = ImageDraw.Draw(im)
    for i, (t, p) in enumerate((('v1 (1x, enlarged)', a), ('v7 (installed before)', b), ('v8 (v7 + snow by code)', c))):
        im.paste(Image.fromarray(p), (i*(W+10), 34)); d.text((i*(W+10)+8, 10), f'{t}   {name}', fill=(230, 235, 245))
    im.save(OUT + f'{name}.jpg', quality=88)
    print(name, im.size)
