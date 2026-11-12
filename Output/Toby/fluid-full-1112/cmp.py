import sys
from PIL import Image
d='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-full-1112/'
label=sys.argv[1]; tags=sys.argv[2].split(','); box=[int(v) for v in sys.argv[3].split(',')] if len(sys.argv)>3 else None
ims=[Image.open(d+f'shots/{label}-{t}.png').convert('RGB') for t in tags]
if box: ims=[i.crop(box) for i in ims]
o=Image.new('RGB',(sum(i.width for i in ims)+10*(len(ims)-1),ims[0].height)); x=0
for i in ims: o.paste(i,(x,0)); x+=i.width+10
sc=float(sys.argv[4]) if len(sys.argv)>4 else 1
o=o.resize((int(o.width*sc),int(o.height*sc)),Image.LANCZOS); o.save(d+f'work/cmp-{label}.png'); print(o.size)
