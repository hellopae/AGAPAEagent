import sys; sys.path.insert(0,'.')
from fl import *
def load(k):
    m=np.load(WORK+f'mask_{k}.npy'); r=json.load(open(WORK+f'mask_{k}.json'))['region']; return m,r
def overlay(kinds, rect, sc, out):
    g=np.array(ground(*rect).resize((int(rect[2]*2*sc),int(rect[3]*2*sc)),Image.LANCZOS)).astype(float)
    cols=dict(lava=(255,0,255),ice=(255,255,0),spirit=(0,255,0),cloud=(0,255,255))
    for k in kinds:
        m,r=load(k)
        # crop m to rect
        x0=int((rect[0]-r[0])*2); y0=int((rect[1]-r[1])*2); x1=x0+int(rect[2]*2); y1=y0+int(rect[3]*2)
        sub=np.zeros((y1-y0,x1-x0),bool)
        ay0,ay1=max(0,y0),min(m.shape[0],y1); ax0,ax1=max(0,x0),min(m.shape[1],x1)
        if ay1>ay0 and ax1>ax0: sub[ay0-y0:ay1-y0, ax0-x0:ax1-x0]=m[ay0:ay1,ax0:ax1]
        s=np.array(Image.fromarray((sub*255).astype(np.uint8)).resize((g.shape[1],g.shape[0]),Image.BILINEAR))>127
        edge=ndi.binary_dilation(s,iterations=2)&~s
        g[edge]=cols[k]; g[s]=g[s]*.7+np.array(cols[k])*.3
    Image.fromarray(g.astype(np.uint8)).save(WORK+out)
if __name__=='__main__':
    overlay(sys.argv[1].split(','), [float(x) for x in sys.argv[2].split(',')], float(sys.argv[3]), sys.argv[4])
