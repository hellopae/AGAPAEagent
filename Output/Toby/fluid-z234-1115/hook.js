// capture exactly what the fluid shader blits onto the map canvas (premultiplied RGBA, device px) into window.__sh, one frame at a time
(()=>{
  window.__f=0; const raf=window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame=cb=>raf(t=>{window.__f++;cb(t)});
  const gc=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(t,...a){const c=gc.call(this,t,...a); if(c&&(t==='webgl'||t==='webgl2'))this.__gl=true; return c};
  const od=CanvasRenderingContext2D.prototype.drawImage;
  window.__shStamp=-1;
  CanvasRenderingContext2D.prototype.drawImage=function(src,...a){
    if(src&&src.__gl&&this.canvas.width>=300){
      if(!window.__sh||window.__sh.width!==this.canvas.width||window.__sh.height!==this.canvas.height){window.__sh=document.createElement('canvas');window.__sh.width=this.canvas.width;window.__sh.height=this.canvas.height;window.__shc=window.__sh.getContext('2d');}
      if(window.__shStamp!==window.__f){window.__shc.setTransform(1,0,0,1,0,0);window.__shc.clearRect(0,0,window.__sh.width,window.__sh.height);window.__shStamp=window.__f;window.__shn=0}
      window.__shn++; od.call(window.__shc,src,...a);
    }
    return od.call(this,src,...a);
  };
})();
