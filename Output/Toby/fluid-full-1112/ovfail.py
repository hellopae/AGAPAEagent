import sys; sys.path.insert(0,'.')
from build_fluids import *
kind=sys.argv[1]; core=[float(x) for x in sys.argv[2].split(',')]; out=sys.argv[3]
a=sub(kind,core); img=ground(*core); ok=loose(kind,img); bad=a&~ok
arr=np.array(img); edge=ndi.binary_dilation(a,iterations=2)&~a
arr[edge]=[255,255,0]; arr[bad]=[255,0,0]
im=Image.fromarray(arr); im.save(WORK+out); print(im.size, bad.sum(), a.sum())
