#!/usr/bin/env python3
"""แปลงไฟล์ตัวละคร SD ที่ gen มา ให้พร้อมใช้ในผังออฟฟิศ

วางไฟล์ดิบไว้ที่ office/sprites/<Name>-SD.png แล้วรัน:
    python3 scripts/make-sprites.py

ทำให้ 3 อย่าง:
  1. ตัดขอบโปร่งออก ให้เท้าชิดขอบล่างพอดี (โค้ดในเว็บยึดจุดยืนที่เท้า)
  2. ย่อให้สูง 512px เท่ากันทุกตัว
  3. ลด palette เหลือ 96 สีแบบไม่ dither — ภาพเป็น flat cel-shade อยู่แล้ว
     แทบไม่เสียรายละเอียด แต่ไฟล์เล็กลงราวครึ่งหนึ่ง
ได้ผลออกมาเป็น office/sprites/<id>.png (ไฟล์ดิบยังอยู่ที่เดิม)
"""
from PIL import Image
import os, re, sys

H = 512
COLORS = 96
DIR = os.path.join(os.path.dirname(__file__), '..', 'office', 'sprites')
# ชื่อไฟล์ที่สะกดไม่ตรงกับ id ของ agent
ALIAS = {'minni': 'minnie'}

def main():
    if not os.path.isdir(DIR):
        sys.exit('ไม่พบโฟลเดอร์ ' + DIR)
    done = []
    for f in sorted(os.listdir(DIR)):
        m = re.match(r'^(.+?)-SD\.png$', f, re.I)
        if not m:
            continue
        aid = m.group(1).lower()
        aid = ALIAS.get(aid, aid)
        src, dst = os.path.join(DIR, f), os.path.join(DIR, aid + '.png')
        im = Image.open(src).convert('RGBA')
        bbox = im.getchannel('A').getbbox()
        if not bbox:
            print('ข้าม', f, '— โปร่งทั้งรูป')
            continue
        im = im.crop(bbox)
        im = im.resize((max(1, round(im.width * H / im.height)), H), Image.LANCZOS)
        q = im.quantize(colors=COLORS, method=Image.FASTOCTREE, dither=Image.NONE).convert('RGBA')
        q.putalpha(im.getchannel('A'))
        q.save(dst, optimize=True)
        done.append(aid)
        print('%-22s -> %-14s %sx%s  %d KB'
              % (f, aid + '.png', q.width, q.height, os.path.getsize(dst) // 1024))
    if done:
        print('\nใส่ใน OFC_ART.sprites ของ index.html:')
        for a in done:
            print("  %s:'office/sprites/%s.png'," % (a, a))

if __name__ == '__main__':
    main()
