"""Offline asset/anchor evidence; these images are NOT browser screenshots."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/Toby/29g'
anchors = json.loads((OUT / 'anchors.json').read_text())
font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 18)
for key, rec in anchors.items():
    name = f'BG-{key.capitalize()}-asia.webp'
    im = Image.open(ROOT / 'img/Asia' / name).convert('RGB')
    cfg = rec['config']
    annotated = im.copy()
    d = ImageDraw.Draw(annotated, 'RGBA')
    def xy(p):
        return (p[0] * 1024, p[1] * 549 * cfg['crop'][3])
    for area in cfg['walk']:
        d.polygon([xy(p) for p in area['poly']], fill=(40,220,160,35),
                  outline=(40,220,160,210), width=2)
    points = {'spawn':cfg['me'], 'act':cfg['act'], 'crew':cfg['crew'],
              'exit':[rec['exit']['x'], rec['exit']['y']]}
    if cfg.get('item'):
        points['item'] = cfg['item']
    points.update({f'soul{i+1}':p for i,p in enumerate(cfg['souls'])})
    colors = {'spawn':'#66ff66', 'act':'#ff72cf', 'crew':'#ffb44c',
              'exit':'#66cfff', 'item':'#ffff44'}
    for label, point in points.items():
        x,y = xy(point)
        color = colors.get(label, '#eeeeee')
        d.ellipse((x-5,y-5,x+5,y+5), fill=color, outline='black')
        d.text((x+7,y-12), label, font=font, fill=color,
               stroke_width=2, stroke_fill='black')
    d.line([xy(p) for p in rec['routeToAct']], fill='#ffff66', width=3)
    annotated.save(OUT / f'{key}-anchors.jpg', quality=90)
    screenshots = []
    w,h = 1248, round(1248*1025/1913)
    top = (800-h)//2
    for phase in ['before', 'after']:
        canvas = Image.new('RGB', (1280,800), '#0d0508')
        d = ImageDraw.Draw(canvas)
        d.rectangle((16,top,16+w-1,top+h-1), fill='#120810')
        source = OUT / 'before' / name if phase == 'before' else ROOT / 'img/Asia' / name
        image = Image.open(source).convert('RGB')
        if phase == 'after':
            image = image.crop((0,0,image.width,image.height*cfg['crop'][3]))
        scale = min(w/image.width, h/image.height)
        rw,rh = round(image.width*scale), round(image.height*scale)
        canvas.paste(image.resize((rw,rh), Image.Resampling.NEAREST),
                     (16+(w-rw)//2, top+(h-rh)//2))
        d.text((24,15), f'{key} / {phase} / offline contain at 1280x800 (not browser)',
               font=font, fill='white')
        canvas.save(OUT / f'{key}-{phase}-1280x800.jpg', quality=87)
        screenshots.append(canvas)
    pair = Image.new('RGB', (1280,1600))
    pair.paste(screenshots[0], (0,0))
    pair.paste(screenshots[1], (0,800))
    pair.save(OUT / f'{key}-before-after.jpg', quality=85)
print('Offline before/after and measured anchor overlays: 8 rooms')
