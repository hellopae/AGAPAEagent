import assert from 'node:assert/strict';import {createRequire} from 'node:module';import {readFileSync,writeFileSync} from 'node:fs';import {pathToFileURL} from 'node:url';
const [root,out]=process.argv.slice(2);process.chdir(root);const require=createRequire(import.meta.url),{createCanvas,Image:NativeImage}=require('/Users/agapae/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
let pending=0;class LocalImage extends NativeImage{set src(url){this.url=String(url);pending++;const done=this.onload,fail=this.onerror;this.onload=(...a)=>{pending--;done?.(...a);};this.onerror=(...a)=>{pending--;fail?.(...a);};try{super.src=readFileSync(this.url.split('?')[0]);}catch(e){pending--;throw e;}}get src(){return this.url;}}
globalThis.Image=globalThis.HTMLImageElement=LocalImage;globalThis.document={createElement:()=>createCanvas(1,1)};globalThis.fetch=async()=>({ok:true,json:async()=>JSON.parse(readFileSync('img/manifest.json'))});
const {drawCrewWalk,bindZone}=await import(pathToFileURL(root+'/src/art.js').href);bindZone(()=> 'th');
const keys=['mob-pret','mob-pret2','mob-werewolf','mob-krahang','mob-pop','mob-tanee'],cv=createCanvas(960,6*190),native=cv.getContext('2d'),calls=[];
const ctx=new Proxy(native,{get(t,k){if(k==='drawImage')return(...a)=>{calls.push(a);return t.drawImage(...a);};const v=Reflect.get(t,k,t);return typeof v==='function'?v.bind(t):v;},set(t,k,v){t[k]=v;return true;}});
ctx.fillStyle='#26333d';ctx.fillRect(0,0,cv.width,cv.height);const result=[];
for(const [row,key] of keys.entries()){
 drawCrewWalk(ctx,key,120,row*190+175,150,0,1);for(let i=0;i<100&&pending;i++)await new Promise(r=>setTimeout(r,10));
 const used=[];ctx.fillStyle='white';ctx.font='16px sans-serif';ctx.fillText(key,8,row*190+18);
 for(let frame=0;frame<4;frame++){
  const before=calls.length;assert.equal(drawCrewWalk(ctx,key,120+frame*240,row*190+175,150,frame*14,1),true);
  const call=calls.slice(before).find(a=>a.length===9&&a[0]?.src===`img/${key}-walk.png`);assert.ok(call);assert.equal(call[1],frame*512);assert.deepEqual(call.slice(2,5),[0,512,512]);assert.equal(call[6]+call[8],0,'destination bottom remains at the translated world foot');used.push(call[1]);
 }
 result.push({key,source:`img/${key}-walk.png`,sourceX:used,cell:[512,512],worldHeight:150,baselineStable:true});
}
writeFileSync(`${out}/native-art-renderer-frames.png`,cv.toBuffer('image/png'));writeFileSync(`${out}/native-art-renderer.json`,JSON.stringify({method:'Actual art.drawCrewWalk with native canvas and real PNGs; records crop phase and world foot for each frame.',keys:result},null,2)+'\n');console.log('Native drawCrewWalk: all 6 sheets loaded; all 24 crop phases and pivots verified');
