#!/usr/bin/env python3
"""จัดรูปท่านั่ง (-SIT.png) ให้วางในผังออฟฟิศได้พอดี

ทำ 3 อย่าง:
  1. ตัดขอบโปร่งใสด้านล่างออก  → ก้นเก้าอี้ชิดขอบล่าง ตัวละครไม่ลอยเหนือพื้น
  2. ผลพลอยได้จากข้อ 1 คือทั้งตัวถูกขยายตามสัดส่วน (เว็บล็อกความสูงไว้ที่ 5.4cqw)
     ทำให้หัวใหญ่ขึ้นมาเท่ารูปยืน — ไม่ต้อง gen ใหม่
  3. ตัดขอบใสซ้าย/ขวาให้เท่ากันสองข้าง แล้วย่อเหลือสูง 512px เท่ารูปยืน
     (ไฟล์จาก generator สูง ~1,380px หนักไฟล์ละ ~1MB ทั้งที่จอใช้จริงไม่ถึงครึ่ง)

ขอบใสด้านบน "ห้ามตัด" เพราะนั่นคือส่วนที่ทำให้ท่านั่งเตี้ยกว่าท่ายืนตามที่ควรเป็น

⚠️ ต้องวัดขอบด้วย ALPHA_MIN ไม่ใช่ getbbox() เปล่าๆ — ไฟล์ที่ generator ปล่อยมา
   มีพิกเซลจาง alpha=1 กระจายอยู่เต็มเฟรม getbbox() เลยคืนขนาดเต็มรูปเสมอ
   แล้วสคริปต์จะรายงานว่า "ชิดขอบล่างอยู่แล้ว" ทั้งที่ตัวลอยเหนือพื้นจริง

ใช้:  python3 scripts/fit-sit-sprite.py office/sprites/Addy-SIT.png [...]
      python3 scripts/fit-sit-sprite.py office/sprites/*-SIT.png
สำรองไฟล์เดิมเป็น .orig ให้อัตโนมัติ (ถ้ายังไม่มี) — .orig ไม่ขึ้น git
"""
import shutil, sys
from pathlib import Path
from PIL import Image

ALPHA_MIN = 16   # ต่ำกว่านี้ = ฝุ่นจาก generator ไม่นับเป็นตัวละคร
OUT_H     = 512  # เท่ารูปยืน (office/sprites/<id>.png)

def fit(p: Path) -> str:
    im = Image.open(p).convert('RGBA')
    solid = im.split()[3].point(lambda v: 255 if v >= ALPHA_MIN else 0)
    bbox = solid.getbbox()
    if not bbox:
        return f'{p.name}: ข้าม (รูปว่าง)'
    x0, _, x1, y1 = bbox
    w, h = im.size

    orig = p.with_suffix(p.suffix + '.orig')
    if not orig.exists():
        shutil.copy2(p, orig)

    # ซ้าย/ขวาตัดเท่ากันสองข้าง เพื่อให้ตัวละครอยู่กลางเฟรมพอดี (เว็บจัดกึ่งกลางให้)
    pad = min(x0, w - x1)
    im = im.crop((pad, 0, w - pad, y1))
    im = im.resize((round(im.width * OUT_H / im.height), OUT_H), Image.LANCZOS)
    im.save(p, optimize=True)
    return (f'{p.name}: ตัดล่าง {h-y1}px ซ้ายขวาข้างละ {pad}px '
            f'→ {im.width}×{im.height} (ตัวใหญ่ขึ้น {(h/y1-1)*100:.1f}%)')

files = [Path(a) for a in sys.argv[1:]]
if not files:
    sys.exit(__doc__)
for f in files:
    print(fit(f) if f.exists() else f'{f}: ไม่พบไฟล์')
