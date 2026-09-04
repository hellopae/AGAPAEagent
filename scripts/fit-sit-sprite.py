#!/usr/bin/env python3
"""จัดรูปท่านั่ง (-SIT.png) ให้วางในผังออฟฟิศได้พอดี

ทำ 2 อย่าง:
  1. ตัดขอบโปร่งใสด้านล่างออก  → ก้นเก้าอี้ชิดขอบล่าง ตัวละครไม่ลอยเหนือพื้น
  2. ผลพลอยได้จากข้อ 1 คือทั้งตัวถูกขยายตามสัดส่วน (เว็บล็อกความสูงไว้ที่ 5.4cqw)
     ทำให้หัวใหญ่ขึ้นมาเท่ารูปยืน — ไม่ต้อง gen ใหม่

ขอบใสด้านบน "ห้ามตัด" เพราะนั่นคือส่วนที่ทำให้ท่านั่งเตี้ยกว่าท่ายืนตามที่ควรเป็น

ใช้:  python3 scripts/fit-sit-sprite.py office/sprites/Addy-SIT.png [...]
      python3 scripts/fit-sit-sprite.py office/sprites/*-SIT.png
สำรองไฟล์เดิมเป็น .orig ให้อัตโนมัติ (ถ้ายังไม่มี)
"""
import shutil, sys
from pathlib import Path
from PIL import Image

def fit(p: Path) -> str:
    im = Image.open(p).convert('RGBA')
    bbox = im.split()[3].getbbox()
    if not bbox:
        return f'{p.name}: ข้าม (รูปว่าง)'
    gap = im.height - bbox[3]
    if gap <= 1:
        return f'{p.name}: ชิดขอบล่างอยู่แล้ว ไม่ต้องแก้'
    orig = p.with_suffix(p.suffix + '.orig')
    if not orig.exists():
        shutil.copy2(p, orig)
    im.crop((0, 0, im.width, bbox[3])).save(p)
    return (f'{p.name}: ตัดขอบล่าง {gap}px → {im.width}×{bbox[3]} '
            f'(ตัวใหญ่ขึ้น {(im.height/bbox[3]-1)*100:.1f}%)')

files = [Path(a) for a in sys.argv[1:]]
if not files:
    sys.exit(__doc__)
for f in files:
    print(fit(f) if f.exists() else f'{f}: ไม่พบไฟล์')
