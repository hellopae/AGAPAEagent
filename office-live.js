/* =====================================================================
   OFFICE LIVE — เป้เดินอยู่ในออฟฟิศ + แถบเช็คห้องว่าง
   แยกไฟล์ตามกติกาท้าย PHASE2-GAMES.md ("index.html ใหญ่มากแล้ว — ของใหม่แยกไฟล์เสมอ")

   ต่อเข้ากับผังใน index.html แค่ 5 จุด จุดละ 1-2 บรรทัด:
     ofcBuildActors()      → เรียก ofcPaeBuild()   สร้างตัวเป้หลังสร้างเอเจนต์ครบ
     ofcRoomStatusRender() → เรียก ofcRoomsRender() วาดแถบห้องว่างใต้ผัง
     ofcNextGoal()         → ac.guest ? ac.guest.goal(ac)  เลือกที่ไปด้วยกติกาของเป้เอง
     ofcStatusText()/ofcSay() → ใช้ ac.guest.st แทนการหาสถานะจาก status.json
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
};

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
  const goSpot = (key, act, dwell) => {
    const r = ofcRoomByKey(OFC_SPOT_ROOM[key]);
    const all = OFC_SPOTS[key] || [];
    const free = all.filter(p => !OFC_ACTORS.some(x => x!==ac && x.state==='act' &&
                  Math.hypot(x.x-p[0], x.y-p[1]) < 42));
    return {room:r, node:r.node, pos:ofcSpot(free.length ? free : all), act,
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
  if(roll<0.62) return goSpot('control','report', 6000+Math.random()*5000);
  if(roll<0.76) return goSpot('pantry','coffee', 5000+Math.random()*4000);
  if(roll<0.88) return goSpot('lounge','rest', 7000+Math.random()*7000);
  return goSpot('meeting','meet', 6000+Math.random()*6000);
}

/* สร้างตัวเป้ลงใน layer เดียวกับเอเจนต์ แล้วดัน entry เข้า OFC_ACTORS
   → เดิน/หลบตัวซ้อน/นับคนในห้อง ใช้โค้ดเดิมทั้งหมดโดยไม่ต้องแก้อะไรเพิ่ม
   เรียกทุกครั้งที่ ofcBuildActors() รัน (layer ถูกล้างทิ้งทุกรอบ) */
function ofcPaeBuild(){
  const layer = document.getElementById('ofcActors');
  if(!layer) return;
  const start = [790, 645];                       /* เริ่มที่ทางเดินกลางล่าง (node B5) */
  const el = document.createElement('button');
  el.className = 'ofc-guy ofc-pae';
  el.type = 'button';
  el.dataset.dir = 'r';
  el.dataset.act = 'walk';
  el.title = `${OFC_PAE.name} — เจ้าของออฟฟิศ`;
  el.style.left = (start[0]/OFC_W*100)+'%';
  el.style.top  = (start[1]/OFC_H*100)+'%';
  el.style.zIndex = Math.round(start[1]);
  el.innerHTML = `
    <span class="think"></span>
    <span class="head"><img src="${OFC_PAE.img}" alt="${OFC_PAE.name}"></span>
    <span class="body" style="background:var(--gold)"></span>
    <i class="item"></i>
    <span class="sdot"></span>
    <span class="nm"></span>`;
  layer.appendChild(el);

  const ac = {
    id:OFC_PAE.id, guest:OFC_PAE, x:start[0], y:start[1], el,
    think:el.querySelector('.think'), nm:el.querySelector('.nm'),
    pixEl:null, standArt:null,
    node:'B5', door:null, path:[], state:'act',
    wait:2600, sayLeft:0, speed:78,
    goal:{act:'walk', dwell:0, node:'B5', room:null},
  };
  OFC_PAE.goal = ofcPaeGoal;                      /* ofcNextGoal() เรียกผ่าน ac.guest.goal */
  el.onclick = () => ofcSay(ac, ac.goal.act || 'walk', true);
  OFC_ACTORS.push(ac);
  ofcStatusText(ac);
  setTimeout(()=>ofcSay(ac,'walk'), 2200);
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
