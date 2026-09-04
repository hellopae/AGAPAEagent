/* =====================================================================
   OFFICE LIVE — เป้เดินอยู่ในออฟฟิศ (เดินเองก็ได้ บังคับก็ได้) + แถบเช็คห้องว่าง
   แยกไฟล์ตามกติกาท้าย PHASE2-GAMES.md ("index.html ใหญ่มากแล้ว — ของใหม่แยกไฟล์เสมอ")

   ต่อเข้ากับผังใน index.html แค่ 6 จุด จุดละ 1-2 บรรทัด:
     ofcBuildActors()      → เรียก ofcPaeBuild()   สร้างตัวเป้หลังสร้างเอเจนต์ครบ
     ofcRoomStatusRender() → เรียก ofcRoomsRender() วาดแถบห้องว่างใต้ผัง
     ofcNextGoal()         → ac.guest ? ac.guest.goal(ac)  เลือกที่ไปด้วยกติกาของเป้เอง
     ofcStatusText()/ofcSay() → ใช้ ac.guest.st แทนการหาสถานะจาก status.json
     ofcTick()             → ac.ctrl ? ofcCtrlStep(ac,dt)  ตอนกำลังถูกบังคับ ข้ามสมองอัตโนมัติ
   ที่เหลือ (เดิน/หลบตัวซ้อน/บับเบิล/นับคนในห้อง) ใช้ลูปเดิมของเอเจนต์ทั้งหมด
   ===================================================================== */

/* ---------------------------------------------------------------------
   เป้ — เจ้าของออฟฟิศ ไม่ใช่เอเจนต์
   ไม่มีแถวใน status.json (ofcStatusText/ofcSay จึงต้องมี ac.guest.st ให้)
   และไม่มีโต๊ะประจำใน OFC_ROOMS.seats — เดินดูงานทั่วออฟฟิศแทน
   --------------------------------------------------------------------- */
const OFC_PAE = {
  id:'pae', name:'เป้', img:'avatars/Pae.png',
  st:{t:'เจ้าของ', e:'👑', c:'var(--gold)'},
  /* สไปรท์เต็มตัวชุดเดียวกับทีม — ถ้าตั้งเป็น null จะตกไปใช้หัว avatar + ตัวสีทองแทน
     (โครง fallback ยังอยู่ครบใน ofcPaeBuild + CSS .ofc-pae-fb) */
  art:    'office/sprites/pae.png',
  sitArt: 'office/sprites/Pae-SIT.png',
};

/* ท่านั่งของเป้ใช้ตารางเดียวกับทีม เพื่อให้ ofcSitSet() กับบล็อกพรีโหลดใน index.html
   เห็นไฟล์นี้โดยไม่ต้องแก้อะไรเพิ่ม */
if(typeof OFC_SIT !== 'undefined' && OFC_PAE.sitArt) OFC_SIT[OFC_PAE.id] = OFC_PAE.sitArt;

/* ความคิดในบับเบิล — โทนเดียวกับ OFC_THINK ของเอเจนต์ แต่เป็นมุมของคนที่สั่งงาน */
const OFC_PAE_THINK = {
  walk:  ['เดินดูรอบนึงก่อน','วันนี้ใครติดอะไรบ้าง'],
  chat:  ['งานถึงไหนแล้ว','อันนี้รีบไหม ถ้าไม่รีบพักก่อนได้','ทำมาดีแล้ว เอาแบบนี้ต่อได้เลย'],
  check: ['ขอดูตัวจริงก่อนส่งลูกค้า','ตรงนี้แก้นิดเดียวก็จบ'],
  report:['ภาพรวมวันนี้เป็นไง','คิวงานพรุ่งนี้พอไหว'],
  meet:  ['เรียกคุยสั้น ๆ พอ','สรุปให้จบในห้องนี้เลย'],
  coffee:['ขอกาแฟก่อนหนึ่งแก้ว','พักสมองแป๊บนึง'],
  rest:  ['นั่งพักตรงนี้แหละ','วันนี้ทีมทำได้ดี'],
  play:  ['ขอเล่นด้วยคน','ใครท้ามาก็รับหมด'],
  pp:    ['ตีสักเกมสองเกม','เสิร์ฟมาเลย'],
  ps5:   ['ขอคุมจอยบ้าง','เกมนี้ยังไม่เคยแพ้'],
};

/* จุดหมายถัดไปของเป้ — ไม่มีโต๊ะให้กลับ จึงเวียนดูงานทีละคนเป็นหลัก
   สัดส่วนตั้งใจให้ "เดินดูงาน" เยอะกว่ากิจกรรมเล่น ๆ เพราะเป็นเจ้าของออฟฟิศ */
function ofcPaeGoal(ac){
  const roll = Math.random();

  /* ไปยืนคุยข้างโต๊ะเอเจนต์ — ถ้ามีคนสถานะ 'รอแก้ไข' ให้แวะคนนั้นก่อน */
  const goDesk = () => {
    const AG = (typeof AGENTS!=='undefined'?AGENTS:[]);
    const cands = [];
    OFC_ROOMS.forEach(r => Object.keys(r.seats||{}).forEach(k => cands.push([r,k])));
    if(!cands.length) return goSpot('control','report');
    const flagged = cands.filter(([,k]) => (AG.find(x=>x.id===k)||{}).status === 'flagged');
    const [r,k] = ofcPick(flagged.length && Math.random()<0.7 ? flagged : cands);
    const seat = r.seats[k];
    return {room:r, node:r.node, pos:[seat[0]+44+Math.random()*14, seat[1]+42],
            act: (AG.find(x=>x.id===k)||{}).status === 'flagged' ? 'check' : 'chat',
            dwell:5000+Math.random()*6000};
  };
  /* sit:true = ถึงที่แล้วเปลี่ยนเป็นรูปนั่ง (ofcTick อ่าน goal.sit)
     ใช้กับห้องที่มีที่ให้นั่งจริงในผัง — ศูนย์คุมงาน/ห้องประชุม/ห้องพัก
     ไม่ใช้กับแพนทรี่ (ยืนชงกาแฟ) */
  const goSpot = (key, act, dwell, sit) => {
    const r = ofcRoomByKey(OFC_SPOT_ROOM[key]);
    const all = OFC_SPOTS[key] || [];
    const free = all.filter(p => !OFC_ACTORS.some(x => x!==ac && x.state==='act' &&
                  Math.hypot(x.x-p[0], x.y-p[1]) < 42));
    return {room:r, node:r.node, pos:ofcSpot(free.length ? free : all), act, sit:!!sit,
            dwell:dwell || 5000+Math.random()*5000};
  };
  /* ปิงปอง/PS5 — จองข้างเดียวกับที่เอเจนต์ใช้ ถ้าเต็มสองข้างแล้วก็ไม่ไป */
  const goSide = (map, slot, act, dwell) => {
    const taken = k => OFC_ACTORS.some(x => x!==ac && x.goal && x.goal[slot]===k);
    const side = !taken('A') ? 'A' : (!taken('B') ? 'B' : null);
    if(!side) return null;
    const r = ofcRoomByKey('bm');
    return {room:r, node:r.node, [slot]:side, pos:map[side].slice(), act, dwell};
  };

  /* เตะบอลที่ทางเดิน — เกิดได้เหมือนเอเจนต์ แต่ไม่บ่อยเท่า Toby */
  if(typeof OFC_BALL!=='undefined' && OFC_BALL && !OFC_BALL.rolling && Math.random()<0.10){
    return {room:null, node:OFC_BALL.node, ball:true,
            pos:[OFC_BALL.x + (Math.random()<0.5?-44:44), OFC_BALL.y+12],
            act:'play', dwell:3200+Math.random()*2600};
  }
  if(Math.random()<0.10){ const g = goSide(OFC_PP_SIDE,'pp','pp',9000+Math.random()*7000); if(g) return g; }
  if(Math.random()<0.10){ const g = goSide(OFC_PS5_SIDE,'ps5','ps5',10000+Math.random()*8000); if(g) return g; }

  if(roll<0.44) return goDesk();
  if(roll<0.62) return goSpot('control','report', 6000+Math.random()*5000, true);
  if(roll<0.76) return goSpot('pantry','coffee', 5000+Math.random()*4000);
  if(roll<0.88) return goSpot('lounge','rest', 7000+Math.random()*7000);   /* ห้องพักมีแต่โซฟา ยืนเหมือนทีม */
  return goSpot('meeting','meet', 6000+Math.random()*6000, true);
}

/* สร้างตัวเป้ลงใน layer เดียวกับเอเจนต์ แล้วดัน entry เข้า OFC_ACTORS
   → เดิน/หลบตัวซ้อน/นับคนในห้อง ใช้โค้ดเดิมทั้งหมดโดยไม่ต้องแก้อะไรเพิ่ม
   เรียกทุกครั้งที่ ofcBuildActors() รัน (layer ถูกล้างทิ้งทุกรอบ) */
function ofcPaeBuild(){
  const layer = document.getElementById('ofcActors');
  if(!layer) return;
  /* ofcBuildActors() รันใหม่ทุกครั้งที่ Firestore ส่งสถานะมา — ถ้ากำลังบังคับอยู่
     ต้องคืนตำแหน่งเดิมให้ ไม่งั้นเป้จะวาร์ปกลับกลางออฟฟิศคาที่กำลังเดิน */
  const start = (OFC_CTRL.on && OFC_CTRL.pos) ? OFC_CTRL.pos.slice() : [790, 645];
  const art = OFC_PAE.art;
  const el = document.createElement('button');
  el.className = 'ofc-guy ofc-pae' + (art ? '' : ' ofc-pae-fb');
  el.type = 'button';
  el.dataset.dir = 'r';
  el.dataset.act = 'walk';
  el.title = `${OFC_PAE.name} — เจ้าของออฟฟิศ`;
  el.style.left = (start[0]/OFC_W*100)+'%';
  el.style.top  = (start[1]/OFC_H*100)+'%';
  el.style.zIndex = Math.round(start[1]);
  el.innerHTML = `
    <span class="think"></span>
    ${art ? `<img class="pix" src="${art}" alt="${OFC_PAE.name}">`
          : `<span class="head"><img src="${OFC_PAE.img}" alt="${OFC_PAE.name}"></span>
             <span class="body" style="background:var(--gold)"></span>`}
    <i class="item"></i>
    <span class="sdot"></span>
    <span class="nm"></span>`;
  layer.appendChild(el);

  const ac = {
    id:OFC_PAE.id, guest:OFC_PAE, x:start[0], y:start[1], el,
    think:el.querySelector('.think'), nm:el.querySelector('.nm'),
    pixEl:el.querySelector('.pix'), standArt:art,
    node:'B5', door:null, path:[], state:'act',
    wait:2600, sayLeft:0, speed:78,
    goal:{act:'walk', dwell:0, node:'B5', room:null},
  };
  OFC_PAE.goal = ofcPaeGoal;                      /* ofcNextGoal() เรียกผ่าน ac.guest.goal */
  el.onclick = () => ofcSay(ac, ac.goal.act || 'walk', true);
  OFC_ACTORS.push(ac);
  ofcStatusText(ac);
  if(!OFC_CTRL.on) setTimeout(()=>ofcSay(ac,'walk'), 2200);
  ofcCtrlBind();                 /* ผูกปุ่มกด/แตะจอครั้งเดียว (ตัวมันกันซ้ำเอง) */
  ofcCtrlSet(OFC_CTRL.on, true); /* วาดแถบปุ่ม + คืนโหมดบังคับถ้าค้างอยู่ก่อน rebuild */
}

/* บับเบิลของเป้ — เสียบเข้า OFC_THINK ให้ ofcThink() หาเจอเหมือนเอเจนต์คนหนึ่ง
   (ofcThink อ่าน OFC_THINK[id][act] ก่อน ถ้าไม่มีค่อยตกไปที่ OFC_THINK_ANY) */
if(typeof OFC_THINK !== 'undefined') OFC_THINK[OFC_PAE.id] = OFC_PAE_THINK;

/* ---------------------------------------------------------------------
   แถบเช็คห้องว่าง — ห้องรวมที่ใครก็เข้าไปใช้ได้ ไม่ใช่โต๊ะประจำใคร
   นับคนจากพิกัดจริงของ OFC_ACTORS แบบเดียวกับป้ายในผัง (ofcRoomStatusRender)
   เพื่อให้ตัวเลขสองที่ตรงกันเสมอ · กดแล้วไฮไลต์ห้องนั้นในผังและเลื่อนไปให้เห็น
   --------------------------------------------------------------------- */
const OFC_ROOMS_SHARED = ['meet','pantry','lounge','bm','war','bl'];
let ofcRoomsSig = '';                       /* HTML รอบที่แล้ว — กันเขียน DOM ซ้ำทุก 500ms */

function ofcRoomsRender(){
  const box = document.getElementById('ofcRooms');
  if(!box) return;
  const AG = (typeof AGENTS!=='undefined'?AGENTS:[]);
  const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  const html = `<span class="rm-lab mono">ห้องรวม · ว่างไหม</span>` + OFC_ROOMS_SHARED.map(key=>{
    const r = ofcRoomByKey(key);
    if(!r) return '';
    const here = OFC_ACTORS.filter(ac => ac.x>=r.x && ac.x<=r.x+r.w && ac.y>=r.y && ac.y<=r.y+r.h);
    const who = here.map(ac=>{
      if(ac.guest) return {name:ac.guest.name, img:ac.guest.img, c:ac.guest.st.c};
      const a = AG.find(x=>x.id===ac.id);
      const st = OFC_STATUS[(a&&a.status)||'idle'] || OFC_STATUS.idle;
      return {name:a?a.name:ac.id, img:(a&&a.img)||'', c:st.c};
    });
    const faces = who.slice(0,4).map(w=>
      `<img src="${esc(w.img)}" alt="${esc(w.name)}" loading="lazy">`).join('');
    const label = who.length
      ? (who.length===1 ? esc(who[0].name) : `${who.length} คน`)
      : 'ว่าง';
    return `<button class="rm${who.length?'':' free'}" type="button"
        style="--st:${who.length ? who[0].c : 'var(--ink-faint)'}"
        title="${esc(r.name)} — ${who.length ? who.map(w=>w.name).join(', ') : 'ยังไม่มีใครอยู่'}"
        onclick="ofcRoomJump('${r.key}')">
      <span class="rm-dot"></span>
      <span class="rm-nm">${esc(r.name)}</span>
      ${faces ? `<span class="rm-who">${faces}</span>` : ''}
      <span class="rm-st">${label}</span>
    </button>`;
  }).join('');

  if(html === ofcRoomsSig) return;          /* เรียกทุก 500ms — เขียน DOM เฉพาะตอนค่าเปลี่ยนจริง */
  ofcRoomsSig = html;
  box.innerHTML = html;
}

/* กดชิปห้อง → ไฮไลต์กรอบห้องในผัง แล้วเลื่อนผังแนวนอนไปให้เห็นห้องนั้น
   (.ofc-scroll เลื่อนแนวนอนได้ตอนจอแคบกว่าผัง 1586px) */
function ofcRoomJump(key){
  if(typeof ofcFocus === 'function') ofcFocus(key);
  const r = ofcRoomByKey(key);
  const scroll = document.querySelector('.ofc-scroll');
  const stage = document.getElementById('ofcStage');
  if(!r || !scroll || !stage) return;
  const mid = (r.x + r.w/2) / OFC_W * stage.offsetWidth;
  scroll.scrollTo({left: Math.max(0, mid - scroll.clientWidth/2), behavior:'smooth'});
}

/* =====================================================================
   บังคับเป้เอง — ลูกศร/WASD บนคอม · แตะแล้วลากบนผังสำหรับมือถือ
   กดปุ่ม "บังคับเป้" ใต้ผัง หรือกด P · ออกด้วย Esc หรือกดปุ่มซ้ำ
   ระหว่างบังคับ ofcTick() จะข้ามสมองอัตโนมัติของเป้ไปเรียก ofcCtrlStep() แทน
   ===================================================================== */
const OFC_CTRL_SPEED = 168;              /* หน่วยผัง/วินาที — เร็วกว่าเอเจนต์ (71-103) ให้กดแล้วรู้สึกตอบสนอง */
const OFC_CTRL = {on:false, keys:new Set(), target:null, near:null, nearMs:0, pos:null};

/* ---- พื้นที่ที่เดินได้ ----------------------------------------------
   ผังเป็นรูปเดียว ไม่มีข้อมูล collision จึงประกอบเอาจากของที่มีอยู่แล้ว:
     1. ในกรอบห้อง (หดเข้า 12 หน่วย ไม่ให้ยืนคร่อมกำแพง)
     2. แถบกว้าง 34 หน่วยตามเส้นทางเดิน OFC_EDGES (เส้นเดียวกับที่เอเจนต์ใช้)
     3. ช่องประตู: node → door → จุดแรกในห้อง — ต่อข้อ 1 กับ 2 เข้าหากัน
        (ห้องพัก/ห้องเกม/แพนทรี่ วาง door ห่างขอบห้องหลายสิบหน่วย ถ้าไม่มีข้อนี้จะเข้าห้องไม่ได้)
   คิดครั้งเดียวตอนเรียกครั้งแรกแล้วเก็บไว้ ไม่ได้คิดใหม่ทุกเฟรม
   -------------------------------------------------------------------- */
let OFC_WALK_SEG = null;
const ofcSegDist = (x, y, a, b) => {
  const vx = b[0]-a[0], vy = b[1]-a[1];
  const len = vx*vx + vy*vy;
  let t = len ? ((x-a[0])*vx + (y-a[1])*vy) / len : 0;
  t = t<0 ? 0 : (t>1 ? 1 : t);
  return Math.hypot(x - (a[0]+vx*t), y - (a[1]+vy*t));
};
function ofcWalkSegments(){
  if(OFC_WALK_SEG) return OFC_WALK_SEG;
  const segs = [];
  const seen = {};
  for(const a in OFC_EDGES) for(const b of (OFC_EDGES[a]||[])){
    const k = a<b ? a+'|'+b : b+'|'+a;
    if(seen[k] || !OFC_NODES[a] || !OFC_NODES[b]) continue;
    seen[k] = 1; segs.push([OFC_NODES[a], OFC_NODES[b], 34]);
  }
  for(const r of OFC_ROOMS){
    if(!r.door) continue;
    const n = OFC_NODES[r.node];
    const clamp = (v,lo,hi) => v<lo ? lo : (v>hi ? hi : v);
    const entry = [clamp(r.door[0], r.x+16, r.x+r.w-16), clamp(r.door[1], r.y+16, r.y+r.h-16)];
    if(n) segs.push([n, r.door, 30]);
    segs.push([r.door, entry, 30]);
  }
  return (OFC_WALK_SEG = segs);
}
function ofcWalkable(x, y){
  for(const r of OFC_ROOMS)
    if(x>=r.x+12 && x<=r.x+r.w-12 && y>=r.y+12 && y<=r.y+r.h-12) return true;
  for(const [a,b,w] of ofcWalkSegments())
    if(ofcSegDist(x,y,a,b) < w) return true;
  return false;
}

/* ---- ลูปเดินตอนถูกบังคับ — เรียกจาก ofcTick() แทนสมองอัตโนมัติ ---- */
function ofcCtrlStep(ac, dt){
  const c = OFC_CTRL;
  c.pos = [ac.x, ac.y];              /* จำไว้เผื่อ ofcBuildActors() รันใหม่ระหว่างเดิน */
  let dx = (c.keys.has('r')?1:0) - (c.keys.has('l')?1:0);
  let dy = (c.keys.has('d')?1:0) - (c.keys.has('u')?1:0);
  if(!dx && !dy && c.target){                       /* มือถือ: เดินเข้าหาจุดที่แตะไว้ */
    const tx = c.target[0]-ac.x, ty = c.target[1]-ac.y, d = Math.hypot(tx,ty);
    if(d > 7){ dx = tx/d; dy = ty/d; } else c.target = null;
  }

  if(dx || dy){
    const n = Math.hypot(dx,dy) || 1;
    const step = OFC_CTRL_SPEED*dt/1000;
    const mx = dx/n*step, my = dy/n*step;
    const free = ofcWalkable(ac.x, ac.y);           /* หลุดออกนอกพื้นที่แล้วให้เดินได้อิสระ จะได้ไม่ค้างถาวร */
    let nx = ac.x+mx, ny = ac.y+my;
    if(free && !ofcWalkable(nx, ny)){               /* ชนกำแพง — ไถลไปตามกำแพงทีละแกน */
      if(ofcWalkable(ac.x+mx, ac.y)){ nx = ac.x+mx; ny = ac.y; }
      else if(ofcWalkable(ac.x, ac.y+my)){ nx = ac.x; ny = ac.y+my; }
      else { nx = ac.x; ny = ac.y; c.target = null; }
    }
    ofcPlaceAt(ac, nx, ny);
    if(Math.abs(dx) > 0.2) ac.el.dataset.dir = dx<0 ? 'l' : 'r';
    ac.el.dataset.act = '';                         /* '' = เด้งตัวตอนเดิน (คลาสเดียวกับเอเจนต์) */
    c.near = null; c.nearMs = 0;
  } else {
    ac.el.dataset.act = 'walk';                     /* ยืนนิ่ง ไม่มีของในมือ ไม่เด้ง */
    ofcCtrlGreet(ac, dt);
  }
}

/* ยืนนิ่งข้างใครสักพัก แล้วคนนั้นทักกลับ — คนละคนทักซ้ำได้ทุก 20 วิ */
function ofcCtrlGreet(ac, dt){
  const c = OFC_CTRL;
  const who = OFC_ACTORS.find(x => x!==ac && !x.guest && Math.hypot(x.x-ac.x, (x.y-ac.y)*1.4) < 74);
  if(!who){ c.near = null; c.nearMs = 0; return; }
  if(c.near !== who.id){ c.near = who.id; c.nearMs = 0; }
  c.nearMs += dt;
  if(c.nearMs < 700) return;
  c.nearMs = -20000;                                /* ทักแล้วเงียบไป 20 วิ กันพูดรัว */
  ofcSay(who, 'chat', true);
}

/* ---- เปิด/ปิดโหมดบังคับ ---- */
function ofcCtrlSet(on, quiet){
  const c = OFC_CTRL;
  c.on = !!on; c.keys.clear(); c.target = null; c.near = null; c.nearMs = 0;
  if(!c.on) c.pos = null;
  const ac = OFC_ACTORS.find(a => a.id === OFC_PAE.id);
  const stage = document.getElementById('ofcStage');
  if(stage) stage.dataset.ctrl = c.on ? '1' : '';
  if(ac){
    ac.ctrl = c.on;
    if(c.on){
      /* state 'ctrl' ไม่ใช่ 'act' — กัน ofcSeparate() ดันตัวเป้ออกจากที่ที่เพิ่งบังคับให้ไปยืน
         (ฟังก์ชันนั้นแตะเฉพาะ state==='act') ส่วน ofcTick ไม่แตะอยู่แล้วเพราะ ac.ctrl ตัดตั้งแต่ต้นลูป */
      ac.state = 'ctrl'; ac.path = []; ac.wait = 0;
      ac.goal = {act:'walk', dwell:0, node:ac.node, room:null};
      ofcSitSet(ac, false);                         /* ลุกจากเก้าอี้ก่อนถ้ากำลังนั่งอยู่ */
      ac.el.dataset.act = 'walk';
      if(!quiet){
        ac.think.innerHTML = '<b>🎮</b><span>ลูกศร / WASD เดิน · Esc ออก</span>';
        ac.el.dataset.show = '1'; ac.sayLeft = 4200;
      }
    } else {
      ac.state = 'act'; ac.wait = 400;              /* ปล่อยแล้วกลับไปเดินเองในอีกแป๊บ */
      ac.el.dataset.show = ''; ac.sayLeft = 0;
    }
  }
  ofcCtrlRender();
}
function ofcCtrlToggle(){ ofcCtrlSet(!OFC_CTRL.on); }

function ofcCtrlRender(){
  const box = document.getElementById('ofcCtrl');
  if(!box) return;
  const on = OFC_CTRL.on;
  box.innerHTML = `
    <button class="ctrl-btn" type="button" data-on="${on?1:''}" onclick="ofcCtrlToggle()">
      <img src="${OFC_PAE.img}" alt="${OFC_PAE.name}">
      ${on ? 'ปล่อยเป้' : 'บังคับเป้'}
    </button>
    <span class="ctrl-hint">${on
      ? '<kbd>←↑↓→</kbd> หรือ <kbd>WASD</kbd> เดิน · แตะบนผังก็ได้ · <kbd>Esc</kbd> ออก'
      : 'กดปุ่มนี้หรือ <kbd>P</kbd> แล้วเดินเป้เองได้ทั้งออฟฟิศ'}</span>`;
}

/* ---- ปุ่มกด + แตะจอ — ติดครั้งเดียว ไม่ผูกกับ ofcBuildActors ที่รันซ้ำได้ ---- */
const OFC_CTRL_KEY = {
  ArrowLeft:'l', ArrowRight:'r', ArrowUp:'u', ArrowDown:'d',
  a:'l', d:'r', w:'u', s:'d', A:'l', D:'r', W:'u', S:'d',
};
function ofcCtrlBind(){
  if(ofcCtrlBind.done) return;
  ofcCtrlBind.done = true;

  const typing = e => /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
  addEventListener('keydown', e=>{
    if(typing(e) || e.metaKey || e.ctrlKey || e.altKey) return;
    if((e.key==='p' || e.key==='P') && !OFC_CTRL.on){ ofcCtrlSet(true); e.preventDefault(); return; }
    if(!OFC_CTRL.on) return;
    if(e.key==='Escape'){ ofcCtrlSet(false); return; }
    const k = OFC_CTRL_KEY[e.key];
    if(k){ OFC_CTRL.keys.add(k); OFC_CTRL.target = null; e.preventDefault(); }
  });
  addEventListener('keyup', e=>{
    const k = OFC_CTRL_KEY[e.key];
    if(k) OFC_CTRL.keys.delete(k);
  });
  addEventListener('blur', ()=> OFC_CTRL.keys.clear());   /* สลับแท็บทั้งที่ยังกดค้าง = เดินไม่หยุด */

  const stage = document.getElementById('ofcStage');
  if(stage){
    const aim = e => {
      if(!OFC_CTRL.on) return;
      const r = stage.getBoundingClientRect();
      OFC_CTRL.target = [(e.clientX-r.left)/r.width*OFC_W, (e.clientY-r.top)/r.height*OFC_H];
      e.preventDefault(); e.stopPropagation();      /* กันไปโดนคลิกห้อง/เปิด drawer */
    };
    stage.addEventListener('pointerdown', aim, true);
    stage.addEventListener('pointermove', e=>{ if(OFC_CTRL.on && e.buttons) aim(e); }, true);
  }
}
