import cv2, numpy as np, json, sys, collections
TH=float(sys.argv[1])
R="/Users/agapae/Documents/Work PAE/Claude/AVEGEE-reference/files/UI New map/"
s=cv2.imread(R+"Map-Zone1-4.jpg")
pic=cv2.imread("/Users/agapae/agapae-work/AVEGEE/img/frontier-route/zone1-2-v3.webp")
H,W=pic.shape[:2]
M4=np.float32([[0.6704,-0.0013,-0.7346],[0.0013,0.6704,4.5076]])
pb=cv2.warpAffine(pic,cv2.invertAffineTransform(M4),(s.shape[1],s.shape[0]))
diff=np.abs(s.astype(int)-pb.astype(int)).sum(2)
hsv=cv2.cvtColor(s,cv2.COLOR_BGR2HSV).astype(int);h,S,V=hsv[...,0],hsv[...,1],hsv[...,2]
red=(diff>110)&(S>160)&(V>190)&((h<=6)|(h>=175))
grn=(diff>110)&(S>130)&(V>140)&(h>=30)&(h<=75)
stroke=(red|grn).astype(np.uint8)
x0,y0=int(958/0.6704),int(30/0.6704)
T=stroke[y0:y0+105,x0:x0+105].copy();ys,xs=np.nonzero(T);T=T[ys.min():ys.max()+1,xs.min():xs.max()+1]
Tb=cv2.GaussianBlur(T.astype(np.float32),(0,0),3);Sb=cv2.GaussianBlur(stroke.astype(np.float32),(0,0),3)
res=cv2.matchTemplate(Sb,Tb,cv2.TM_CCOEFF_NORMED);th,tw=T.shape
res=np.nan_to_num(res,nan=-1,posinf=-1,neginf=-1)
cov=cv2.matchTemplate(stroke.astype(np.float32),T.astype(np.float32),cv2.TM_CCORR)/T.sum()
res[cov<0.4]=-1
pts=[];r=res.copy()
while True:
    _,mv,_,ml=cv2.minMaxLoc(r)
    if mv<TH: break
    x,y=ml;pts.append((x,y,float(mv)));r[max(0,y-int(th*.4)):y+int(th*.4),max(0,x-int(tw*.4)):x+int(tw*.4)]=-1
out=[];vis=s.copy()
for x,y,mv in pts:
    m=T>0;reg=(red[y:y+th,x:x+tw]&m).sum();rg=(grn[y:y+th,x:x+tw]&m).sum()
    gh=h[y:y+th,x:x+tw][grn[y:y+th,x:x+tw]&m]
    med=float(np.median(gh)) if gh.size else None
    col='red' if reg>rg else ('lightgreen' if med is not None and med<44 else 'green')
    bx,by=x+tw/2,y+th
    px=M4[0,0]*bx+M4[0,1]*by+M4[0,2];py=M4[1,0]*bx+M4[1,1]*by+M4[1,2]
    out.append(dict(kind=col,x=round(float(px)/W,4),y=round(float(py)/H,4),score=round(mv,2),hue=med))
    c={'red':(255,0,255),'green':(255,255,0),'lightgreen':(0,255,255)}[col]
    cv2.rectangle(vis,(x,y),(x+tw,y+th),c,3);cv2.putText(vis,f"{mv:.2f}",(x,y+15),0,0.7,(255,255,255),2)
json.dump(out,open("trees.json","w"),indent=0)
cv2.imwrite("trees-match.jpg",cv2.resize(vis,None,fx=0.67,fy=0.67))
print(len(out),collections.Counter(o['kind'] for o in out));print(sorted(round(o['hue']) for o in out if o['hue']))
