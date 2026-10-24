const root='/Users/agapae/agapae-work/.codex-worktrees/cyberhell-art-20261024/';
const {setup,art,STATIONS}=await import(root+'tests/helpers/m2-map.mjs');
const {enableTownSkin,activeTownSkin}=await import(root+'src/zone-skin.js');
const {townPropArtKey}=await import(root+'src/town-scenery.js');
const L=await import(root+'src/town-layout.js');
const {townHouseKey}=await import(root+'src/town-map.js');
enableTownSkin('cyberhell',{use:['judgment','houses','trees','lamp','torch','rock'],stations:{suffix:'cyberhell',facade:{sala:'img/map-v5/st-sala-cyberhell-v2.webp',tea:'img/theme-v4/st-tea-cyberhell-v2.webp',sawan:'img/map-v5/st-sawan-cyberhell-v2.webp',krajok:'img/map-v5/st-krajok-cyberhell-v2.webp'},facadeSizes:{sala:[280,330],tea:[260,270],sawan:[260,300],krajok:[280,340]}}});
setup('cyberhell');
const skin=activeTownSkin();const sprites=[];
const add=(key,x,y,w,flip=false)=>{const im=art.img(key);if(im)sprites.push({file:im.src,x:x-w/2,y:y-w*im.naturalHeight/im.naturalWidth,w,h:w*im.naturalHeight/im.naturalWidth,depth:y,flip});};
add('town-judgment-th',L.TOWN_DAIS.x,L.TOWN_DAIS.y,L.TOWN_DAIS.w);
for(const [i,h]of L.TOWN_HOUSE_SITES.entries())add(townHouseKey(i),h.x,h.y,h.w,h.flip);
for(const p of L.TOWN_PROP_SITES){const key=p.kind==='torch'?'town-prop-torch-pillar':townPropArtKey(p);add(key,p.x,p.y,p.w,p.flip);}
for(const d of STATIONS){const b=art.stationBox(d);if(b)sprites.push({...b,im:undefined,file:b.im.src,depth:d.by});}
console.log(JSON.stringify({borrowedZone1Placements:true,sprites:sprites.sort((a,b)=>a.depth-b.depth)},null,2));
