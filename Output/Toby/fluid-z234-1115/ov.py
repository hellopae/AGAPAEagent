"""usage: ov.py <zone> <x,y,w,h master px> <out>  -> ground | ground+masks (lava = red, water = green) side by side (downscaled to <= 900 wide each)"""
import sys; sys.path.insert(0,'.')
from zl import *
z=int(sys.argv[1]); x,y,w,h=[float(v) for v in sys.argv[2].split(',')]; out=sys.argv[3]
img=ground(z,x,y,w,h); a=np.array(img)
ov=a.copy()
for kind,col in (('lava',(255,0,0)),('water',(0,255,0))):
    f=WORK+f'mask_{z}_{kind}.npy'
    if not os.path.exists(f): continue
    m=np.load(f,mmap_mode='r')[int(y*2):int(y*2)+a.shape[0], int(x*2):int(x*2)+a.shape[1]]
    m=np.array(m); e=m&~ndi.binary_erosion(m,iterations=2)
    ov[m]=(ov[m]*.6+np.array(col)*.4).astype(np.uint8); ov[e]=col
s=min(1,700/a.shape[1]); sz=(int(a.shape[1]*s),int(a.shape[0]*s))
c=Image.new('RGB',(sz[0]*2,sz[1])); c.paste(Image.fromarray(a).resize(sz,Image.LANCZOS),(0,0)); c.paste(Image.fromarray(ov).resize(sz,Image.LANCZOS),(sz[0],0)); c.save(out)
