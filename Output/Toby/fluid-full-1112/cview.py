import sys; sys.path.insert(0,'.')
from cls import *
kind=sys.argv[1]; r=[float(x) for x in sys.argv[2].split(',')]; out=sys.argv[3]; sc=float(sys.argv[4]) if len(sys.argv)>4 else .5
g=ground(*r); m=liquid_mask(g,kind)
a=np.array(g); edge=ndi.binary_dilation(m,iterations=max(1,int(2/sc)))&~m
a[edge]=[255,0,255] if kind=='lava' else [255,255,0] if kind=='ice' else [0,255,0]
im=Image.fromarray(a); im=im.resize((int(im.width*sc),int(im.height*sc)),Image.LANCZOS); im.save(WORK+out); print(m.mean(),im.size)
