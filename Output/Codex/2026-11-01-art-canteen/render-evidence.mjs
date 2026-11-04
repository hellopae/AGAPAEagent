// Actual AVEGEE town renderer on native canvas, no browser/CSS/GPU claims.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';import {pathToFileURL} from 'node:url';
const [root,out,stage]=process.argv.slice(2);process.chdir(root);mkdirSync(out,{recursive:true});
const require=createRequire(import.meta.url),{createCanvas,Image:NativeImage,GlobalFonts}=require('/Users/agapae/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
GlobalFonts.registerFromPath('/System/Library/Fonts/Supplemental/Thonburi.ttc','IBM Plex Sans Thai');
const memory=new Map();Object.defineProperty(globalThis,'localStorage',{value:{getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k)}});
let pending=0;const errors=new Set();
class LocalImage extends NativeImage{set src(url){this.url=String(url);pending++;const done=this.onload,fail=this.onerror;this.onload=(...a)=>{pending--;done?.(...a);};this.onerror=(...a)=>{pending--;fail?.(...a);};try{super.src=this.url.startsWith('data:')?url:readFileSync(this.url.split('?')[0]);}catch(e){pending--;errors.add(this.url);queueMicrotask(()=>fail?.(e));}}get src(){return this.url;}}
globalThis.Image=globalThis.HTMLImageElement=LocalImage;globalThis.document={createElement:()=>createCanvas(1,1),querySelector:()=>null,querySelectorAll:()=>[],documentElement:{}};
globalThis.matchMedia=()=>({matches:true});globalThis.devicePixelRatio=1;
globalThis.fetch=async url=>{try{const b=readFileSync(String(url).split('?')[0]);return{ok:true,json:async()=>JSON.parse(b),arrayBuffer:async()=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)};}catch{return{ok:false,json:async()=>null};}};
const mod=p=>{const [file,query]=p.split('?');return import(pathToFileURL(root+'/src/'+file).href+(query?'?'+query:''));};
const {createGame}=await mod('game.js'),{render,setMapViewport}=await mod('scene.js'),{syncSceneZone,SCENE,STATIONS,SPOTS,MERCHANT}=await mod('data.js'),{bindZone,stationBox,footOf,blockRectsOf}=await mod('art.js');
const {setWeatherEnabled}=await mod('map-ambient.js?v=mapfx-k1d');setWeatherEnabled(false);
const {preloadTownTerrainPreview}=await mod('town-terrain.js?v=k1d'),{townStartupAssets,retainStartupImage}=await mod('town-startup.js');
const walk=await mod('walk.js?v=k1d');
const settle=async()=>{for(let i=0;i<200&&pending;i++)await new Promise(r=>setTimeout(r,10));};
const results={stage,method:'Actual scene.render on @napi-rs/canvas; real asset loading, camera, depth order and navigation; no browser screenshot or mobile FPS claim.',zones:[]};
for(const zone of ['th','asia','west','cyberhell']){
 const g=createGame();g.zone=zone;g.save=()=>true;g.paused=true;g.storyQueue=[];bindZone(()=>g.zone);syncSceneZone(zone);
 g.stations=STATIONS.map(def=>({def,slots:[],build:0,fire:0}));g.syncBlocks(true);
 await preloadTownTerrainPreview(30000,zone);
 for(const url of townStartupAssets(zone)){const image=new LocalImage();image.src=url;try{await image.decode();if(image.naturalWidth)retainStartupImage(url,image);}catch{}}
 const def=STATIONS.find(d=>d.k==='canteen'),anchor=[def.bx,def.by],door=[def.x,def.y];
 for(const [name,width,height,scale] of [['city',1440,960,Math.min(1440/SCENE.w,960/SCENE.h)],['focus',1000,750,1.7]]){
  const cv=createCanvas(width,height),ctx=cv.getContext('2d');cv.clientWidth=width;cv.clientHeight=height;
  const tx=name==='city'?(width-SCENE.w*scale)/2:width/2-def.bx*scale,ty=name==='city'?(height-SCENE.h*scale)/2:height*.6-def.by*scale;
  setMapViewport(cv,{width,height,sx:scale,sy:scale,tx,ty});
  for(let i=0;i<5;i++){render(ctx,g,5000,null,null);await settle();}
  g.syncBlocks(true);render(ctx,g,5000,null,null);writeFileSync(`${out}/${zone}-${stage}-${name}.png`,cv.toBuffer('image/png'));
 }
 const box=stationBox(def);assert.ok(box);assert.equal(box.flip,['th','asia','cyberhell'].includes(zone));
 assert.deepEqual([def.bx,def.by],anchor);walk.buildWalk(g);
 const start=[SPOTS.bench.x+60,SPOTS.bench.y],path=walk.findPath(...start,...door);assert.ok(path?.length,`${zone} canteen door reachable`);assert.deepEqual(path.at(-1),door);
 const merchantPath=walk.findPath(...start,MERCHANT.x,MERCHANT.y);assert.ok(merchantPath?.length,`${zone} merchant remains reachable`);
 results.zones.push({zone,anchor,door,bw:def.bw,box:{x:box.x,y:box.y,w:box.w,h:box.h,flip:box.flip},foot:footOf(def),blocks:blockRectsOf(def),doorPathPoints:path.length,merchantPathPoints:merchantPath.length});
 console.log(stage,zone,'rendered; door and merchant reachable');
}
results.missingAssets=[...errors];assert.equal(results.missingAssets.filter(s=>s.includes('canteen-')).length,0);
writeFileSync(`${out}/${stage}-runtime.json`,JSON.stringify(results,null,2)+'\n');
