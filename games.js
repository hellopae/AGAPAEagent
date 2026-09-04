/* =====================================================================
   MINIGAME — เกมในออฟฟิศ (เฟส 2 รอบ 1)
   แยกไฟล์จาก index.html เพราะไฟล์นั้นใหญ่มากแล้ว (ดู PHASE2-GAMES.md)

   โครง:
     GM_DEFS      รายการเกม — คีย์ · ชื่อ · ห้อง · คู่แข่ง
     GM           สถิติแชมป์ (sync กับ Firestore agents/games)
     gmOpen(key)  เปิดเกม · gmClose() ปิด
     gmFinish()   จบเกมแล้วอัปเดตกระดานแชมป์

   กติกาแชมป์:
     เกมแข่ง (ปิงปอง/เตะบอล) — ชนะแชมป์คนปัจจุบัน = แย่งแชมป์มา streak เริ่มนับใหม่
                                แพ้ = แชมป์ป้องกันสำเร็จ streak +1
     เกมเดี่ยว (ตกปลา)        — ใครทำสกอร์สูงสุดถือแชมป์
   ===================================================================== */

const GM_DEFS = {
  pingpong: {label:'ปิงปอง',    emoji:'🏓', room:'bm',     rival:'toby', solo:false,
             unit:'แต้ม', how:'เลื่อนเมาส์ขึ้นลงคุมไม้ · ใครถึง 5 แต้มก่อนชนะ'},
  football: {label:'ยิงจุดโทษ',  emoji:'⚽', room:null,     rival:'dale', solo:false,
             unit:'ลูก',  how:'ลากลูกบอลถอยหลังแล้วปล่อย — ทิศตรงข้ามที่ลากคือทางที่บอลไป ลากไกล = แรง · ยิง 10 ลูก เข้า 6 ลูกขึ้นไปชนะ'},
  fishing:  {label:'ตกปลา',      emoji:'🎣', room:'lounge', rival:null,   solo:true,
             unit:'ตัว',  how:'กดที่ตัวปลาให้ทันใน 45 วินาที · ยิ่งจับได้มาก ปลายิ่งว่ายเร็ว'},
  snake:    {label:'เกมงู',      emoji:'🐍', room:'bm',     rival:null,   solo:true,
             unit:'แต้ม', how:'ลูกศรหรือ WASD บังคับทิศ · กินแล้วตัวยาวขึ้นและเร็วขึ้น ชนกำแพงหรือชนตัวเองจบเกม'},
  tetris:   {label:'เตตริส',     emoji:'🧱', room:'bm',     rival:null,   solo:true,
             unit:'แถว', how:'← → เลื่อน · ↑ หมุน · ↓ ลงเร็ว · Space ทิ้งลงสุด · เก็บให้ได้แถวเยอะที่สุด'},
  sudoku:   {label:'ซูโดกุ',     emoji:'🔢', room:'r5',     rival:'vera', solo:false,
             unit:'วิ',   how:'เลือกระดับ ง่าย/ปกติ/ยาก ได้ · กดช่องแล้วพิมพ์ 1-9 (หรือกดแป้นเลขข้างล่าง) · ทำให้เสร็จก่อนเวลาของ Vera ถึงจะชนะ'},
  coffee:   {label:'ชงกาแฟ',     emoji:'☕', room:'pantry', rival:null,   solo:true,
             unit:'ดาว', how:'กดค้างรินให้ถึงแถบที่เขาสั่ง · ปล่อยแล้วใส่ นม/น้ำตาล/ครีม ให้ครบ (หรือกด 1 2 3) · กดเสิร์ฟแล้วเขาให้ดาว 1-5 ดวง · ชง 10 แก้ว'},
  breakout: {label:'ทุบอิฐ',     emoji:'🧱', room:'bm',     rival:null,   solo:true,
             unit:'ก้อน', how:'เลื่อนเมาส์คุมแป้น · ทุบอิฐให้หมด มีลูก 3 ลูก'},
};

/* ค่าตั้งต้นก่อนที่ Firestore จะตอบ — agent เจ้าถิ่นถือแชมป์ไว้ก่อน */
const gmBlank = () => ({
  pingpong: {champion:'toby', streak:0, best:{who:'toby', score:5},  vsPae:{win:0, lose:0}, lastPlayed:null},
  football: {champion:'dale', streak:0, best:{who:'dale', score:0},  vsPae:{win:0, lose:0}, lastPlayed:null},
  fishing:  {champion:null,   streak:0, best:{who:null,  score:0},   vsPae:{win:0, lose:0}, lastPlayed:null},
  snake:    {champion:null,   streak:0, best:{who:null,  score:0},   vsPae:{win:0, lose:0}, lastPlayed:null},
  tetris:   {champion:null,   streak:0, best:{who:null,  score:0},   vsPae:{win:0, lose:0}, lastPlayed:null},
  sudoku:   {champion:'vera', streak:0, best:{who:'vera', score:0},  vsPae:{win:0, lose:0}, lastPlayed:null},
  coffee:   {champion:null,   streak:0, best:{who:null,  score:0},   vsPae:{win:0, lose:0}, lastPlayed:null},
  breakout: {champion:null,   streak:0, best:{who:null,  score:0},   vsPae:{win:0, lose:0}, lastPlayed:null},
});

let GM = gmBlank();
const GM_LS = 'agapae.games';

/* รูปที่เอาไปวาดบน canvas — ทุกคนใช้สไปรท์ SD ตัวเดียวกับในผังออฟฟิศ
   `pae` (รูปโปรไฟล์วงกลม) ยังต้องมีอยู่ เพราะ gmFace() ใช้ทำหน้ากลมเล็ก ๆ ในหัวเกม/กระดานแชมป์
   ส่วนตัวที่วาดลงสนามใช้ `pae_sd` ที่เป็นสไปรท์เต็มตัว */
const GM_ART = {
  pae:    'avatars/Pae.png',
  pae_sd: 'office/sprites/pae.png',
  toby: 'office/sprites/toby.png',
  dale: 'office/sprites/dale.png',
};
const GM_IMG = {};
function gmImg(key){
  if(!GM_IMG[key]){
    const i = new Image();
    /* คีย์ที่ไม่ได้อยู่ใน GM_ART ถือว่าเป็น id ของ agent → ใช้สไปรท์ SD ตัวเดียวกับในผัง
       (เกมชงกาแฟสุ่มคนมาสั่งจากทั้งทีม ไม่ได้มีแค่ toby/dale) */
    i.src = GM_ART[key] || `office/sprites/${key}.png`;
    GM_IMG[key] = i;
  }
  return GM_IMG[key];
}
/* พรีโหลดไว้ก่อน จะได้ไม่วืบตอนเปิดเกมครั้งแรก */
Object.keys(GM_ART).forEach(gmImg);

/* วาดรูปคนแบบรักษาสัดส่วน ยึดกลางล่าง — flip = พลิกให้หันเข้าหาสนาม */
function gmDrawFig(ctx, key, cx, baseY, h, flip){
  const im = gmImg(key);
  if(!im.complete || !im.naturalWidth) return false;
  const w = im.naturalWidth / im.naturalHeight * h;
  ctx.save();
  ctx.translate(cx, baseY);
  if(flip) ctx.scale(-1, 1);
  ctx.drawImage(im, -w/2, -h, w, h);
  ctx.restore();
  return true;
}

/* วาดรูปเป้เป็นวงกลม — ใช้เป็น fallback ตอนสไปรท์ยังโหลดไม่เสร็จ */
function gmDrawPae(ctx, cx, cy, r){
  const im = gmImg('pae');
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.closePath();
  if(im.complete && im.naturalWidth){
    ctx.clip();
    ctx.drawImage(im, cx-r, cy-r, r*2, r*2);
  }else{
    ctx.fillStyle = '#9A7B4F'; ctx.fill();
  }
  ctx.restore();
  ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
}

/* ---------- ตัวช่วยเล็ก ๆ ---------- */
const gmAgent   = id => (typeof AGENTS !== 'undefined' ? AGENTS : []).find(a => a.id === id) || null;
const gmName    = id => id === 'pae' ? 'PAE' : (gmAgent(id)?.name || '—');
const gmEsc     = t => String(t ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const gmClamp   = (v, a, b) => v < a ? a : (v > b ? b : v);
const gmPick    = a => a[Math.floor(Math.random() * a.length)];

function gmFace(id, cls){
  if(id === 'pae') return `<img class="${cls}" src="${GM_ART.pae}" alt="PAE" loading="lazy">`;
  const a = gmAgent(id);
  if(!a) return `<span class="${cls} gm-pae">?</span>`;
  const fp = typeof facePos === 'function' ? facePos(id) : '';
  return `<img class="${cls}" src="${a.img}" alt="${gmEsc(a.name)}" style="${fp}" loading="lazy">`;
}

/* ---------- โหลด / เซฟ ---------- */
function gmLoadLocal(){
  try{
    const raw = JSON.parse(localStorage.getItem(GM_LS) || 'null');
    if(raw && raw.games) GM = {...gmBlank(), ...raw.games};
  }catch(e){}
}

/* Firestore ส่งมาแล้ว — ทับของในเครื่อง (ตัวจริงอยู่บนคลาวด์) */
function gmApplyDoc(data){
  if(!data || !data.games) return;
  GM = {...gmBlank(), ...data.games};
  try{ localStorage.setItem(GM_LS, JSON.stringify({games:GM})); }catch(e){}
  gmRenderBoard();
}

function gmSave(){
  try{ localStorage.setItem(GM_LS, JSON.stringify({games:GM})); }catch(e){}
  /* เขียนขึ้น Firestore แบบเดียวกับที่ vocab.html ทำ — เว็บเขียนเองได้
     ถ้าเน็ตหลุดหรือเขียนไม่ผ่านก็ปล่อย สถิติยังอยู่ใน localStorage */
  try{
    if(typeof firebase !== 'undefined' && firebase.firestore){
      firebase.firestore().collection('agents').doc('games')
        .set({games:GM, updatedAt:new Date().toISOString()}, {merge:true})
        .catch(()=>{});
    }
  }catch(e){}
}

/* =====================================================================
   กระดานแชมป์
   ===================================================================== */
function gmRenderBoard(){
  const box = document.getElementById('gmBoard');
  if(!box) return;
  const rows = Object.keys(GM_DEFS).map(key => {
    const d = GM_DEFS[key], g = GM[key] || {};
    const champ = g.champion;
    const held = champ
      ? `${gmFace(champ, 'gm-av')}<span class="gm-who">${gmEsc(gmName(champ))}</span>`
      : `<span class="gm-none">ยังไม่มีแชมป์</span>`;
    const note = d.solo
      ? (g.best && g.best.score ? `สถิติ ${g.best.score} ${d.unit}` : 'ยังไม่มีใครเล่น')
      : (g.streak > 0 ? `ป้องกันได้ ${g.streak} ครั้ง` : 'เพิ่งขึ้นแท่น');
    const vs = d.solo ? '' :
      `<span class="gm-vs mono">PAE ${g.vsPae?.win ?? 0}–${g.vsPae?.lose ?? 0}</span>`;
    return `<div class="gm-row">
      <span class="gm-em">${d.emoji}</span>
      <span class="gm-lab">${gmEsc(d.label)}</span>
      <span class="gm-champ">${held}</span>
      <span class="gm-note">${gmEsc(note)}</span>
      ${vs}
      <button class="gm-play" type="button" onclick="gmOpen('${key}')">เล่น</button>
    </div>`;
  }).join('');
  box.innerHTML = `<div class="gm-head"><span class="gm-trophy">🏆</span>
      <span class="gm-title">กระดานแชมป์</span>
      <span class="gm-sub">กดปุ่มเล่นเพื่อท้าชิง — หรือกดที่ของในผัง: โต๊ะปิงปอง · โกล · ตู้ปลา · เครื่องเกม · ตู้เกม · เครื่องชงกาแฟ · แป้นซูโดกุ</span>
    </div>${rows}`;
}

/* จบเกม → อัปเดตแชมป์
   res = {score, win, oppScore}  ·  win ใช้เฉพาะเกมแข่ง */
function gmFinish(key, res){
  const d = GM_DEFS[key], g = GM[key];
  if(!d || !g) return {};
  const out = {took:false, kept:false};
  g.lastPlayed = new Date().toISOString();

  if(d.solo){
    /* เกมเดี่ยว — สกอร์สูงสุดถือแชมป์ */
    if(res.score > (g.best?.score ?? 0)){
      g.best = {who:'pae', score:res.score};
      g.champion = 'pae';
      out.took = true;
    }
  }else{
    if(res.win){
      g.vsPae.win++;
      if(g.champion !== 'pae'){ g.champion = 'pae'; g.streak = 1; out.took = true; }
      else g.streak++;
      if(res.score > (g.best?.score ?? 0)) g.best = {who:'pae', score:res.score};
    }else{
      g.vsPae.lose++;
      if(g.champion === 'pae'){ g.champion = d.rival; g.streak = 1; }
      else { g.streak++; out.kept = true; }
    }
  }
  gmSave();
  gmRenderBoard();
  return out;
}

/* =====================================================================
   เปลือกเกม — โมดัลเต็มจอ
   ===================================================================== */
let GM_CUR = null;   /* {key, stop()} */

function gmShell(){
  let el = document.getElementById('gmModal');
  if(el) return el;
  el = document.createElement('div');
  el.id = 'gmModal'; el.className = 'gm-modal';
  el.innerHTML = `
    <div class="gm-scrim" onclick="gmClose()"></div>
    <div class="gm-card" role="dialog" aria-modal="true">
      <div class="gm-bar">
        <span class="gm-bar-em" id="gmBarEm"></span>
        <span class="gm-bar-nm" id="gmBarNm"></span>
        <span class="gm-bar-vs" id="gmBarVs"></span>
        <button class="gm-x" type="button" onclick="gmClose()" aria-label="ปิด">✕</button>
      </div>
      <div class="gm-stage" id="gmStage"></div>
      <div class="gm-foot" id="gmFoot"></div>
    </div>`;
  document.body.appendChild(el);
  return el;
}

function gmOpen(key){
  const d = GM_DEFS[key];
  if(!d || !GM_GAMES[key]) return;
  gmClose();
  const el = gmShell();
  const g = GM[key] || {};
  document.getElementById('gmBarEm').textContent = d.emoji;
  document.getElementById('gmBarNm').textContent = d.label;
  document.getElementById('gmBarVs').innerHTML = d.rival
    ? `แข่งกับ ${gmFace(d.rival,'gm-av sm')} <b>${gmEsc(gmName(d.rival))}</b>`
    : (g.best?.score ? `สถิติสูงสุด <b>${g.best.score} ${d.unit}</b> โดย ${gmEsc(gmName(g.best.who))}`
                     : 'ยังไม่มีใครทำสถิติไว้');
  document.getElementById('gmFoot').innerHTML = `<span class="gm-how">${gmEsc(d.how)}</span>`;

  el.classList.add('on');
  document.body.style.overflow = 'hidden';
  if(typeof ofcPause === 'function') ofcPause();   /* พักผังออฟฟิศไว้ ไม่ต้องกินซีพียูซ้อนกัน */

  const stage = document.getElementById('gmStage');
  stage.innerHTML = '';
  GM_CUR = {key, stop: GM_GAMES[key](stage, key) || (()=>{})};
  document.addEventListener('keydown', gmKey);
}

function gmClose(){
  const el = document.getElementById('gmModal');
  if(!el || !el.classList.contains('on')) return;
  if(GM_CUR && typeof GM_CUR.stop === 'function') GM_CUR.stop();
  GM_CUR = null;
  el.classList.remove('on');
  document.getElementById('gmStage').innerHTML = '';
  document.body.style.overflow = '';
  document.removeEventListener('keydown', gmKey);
  if(typeof ofcResume === 'function') ofcResume();
}

function gmKey(e){
  if(e.key === 'Escape'){ gmClose(); return; }
  /* กันหน้าเว็บเลื่อนตอนกด space / ลูกศร ระหว่างเล่น */
  if([' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
}

/* ผลลัพธ์ตอนจบเกม — การ์ดทับหน้าจอเกม */
function gmResult(stage, key, res, lines){
  const d = GM_DEFS[key];
  const r = gmFinish(key, res);
  const g = GM[key];
  let head, tone;
  if(d.solo){
    head = r.took ? `สถิติใหม่! ${res.score} ${d.unit}` : `จับได้ ${res.score} ${d.unit}`;
    tone = r.took ? 'win' : 'lose';
  }else{
    head = res.win ? (r.took ? `ชนะ! แย่งแชมป์มาจาก ${gmName(d.rival)} แล้ว` : 'ชนะอีกครั้ง!')
                   : `แพ้ ${gmName(d.rival)}`;
    tone = res.win ? 'win' : 'lose';
  }
  const say = res.win ? gmPick(GM_SAY[key]?.lose || ['เก่งจริง ขอแก้มือ'])
                      : gmPick(GM_SAY[key]?.win  || ['ยังก่อนน้า']);
  const who = d.rival ? `${gmFace(d.rival,'gm-av')} <b>${gmEsc(gmName(d.rival))}</b>: ${gmEsc(say)}` : '';
  const over = document.createElement('div');
  over.className = 'gm-over ' + tone;
  over.innerHTML = `
    <div class="gm-over-in">
      <div class="gm-over-h">${gmEsc(head)}</div>
      ${lines ? `<div class="gm-over-l">${lines}</div>` : ''}
      ${who ? `<div class="gm-over-say">${who}</div>` : ''}
      <div class="gm-over-champ">แชมป์ตอนนี้: ${gmFace(g.champion,'gm-av')} <b>${gmEsc(gmName(g.champion))}</b></div>
      <div class="gm-over-btn">
        <button type="button" class="gm-again" onclick="gmOpen('${key}')">เล่นอีกรอบ</button>
        <button type="button" class="gm-quit" onclick="gmClose()">พอแล้ว</button>
      </div>
    </div>`;
  stage.appendChild(over);
}

/* บทพูดของคู่แข่ง — win = เขาชนะ · lose = เขาแพ้ */
const GM_SAY = {
  pingpong: {
    win:  ['ห้องเกมนี้ยังเป็นของเรานะ','บอกแล้วว่าเทสต์เกมมาเยอะ','อีกรอบไหม เดี๋ยวให้แต้มต่อ'],
    lose: ['โอเค ยอมรับ เก่งจริง','ขอแก้มือ! เดี๋ยวซ้อมก่อน','แพ้ก็แพ้ แต่สนุกดี'],
  },
  football: {
    win:  ['เซฟไว้แล้ว อย่าให้กลิ้งเข้าห้องแร็ค','มุมนั้นอ่านออกตั้งแต่แรก','ยิงมาอีก เดี๋ยวรับให้หมด'],
    lose: ['เข้าได้ไง... ขอดู replay หน่อย','ยอม ยิงแม่นจริง','เดี๋ยวรอบหน้าไม่ให้เข้าแล้ว'],
  },
  fishing: { win:['ปลาว่ายเร็วขึ้นแล้วนะ'], lose:['เยี่ยม! ปลาเยอะเลย'] },
  sudoku: {
    win:  ['ตัวเลขมันต้องเป๊ะแบบนี้','ช้าไปนิดเดียวเอง ลองใหม่','เวลาของเรายังยืนอยู่'],
    lose: ['เร็วกว่าเราจริง ยอมรับ','โอเค สถิติเป็นของ PAE แล้ว','เก่งขึ้นเยอะเลยนะ'],
  },
};

/* =====================================================================
   ตัวช่วยวาด canvas
   ===================================================================== */
function gmCanvas(stage, w, h){
  const cv = document.createElement('canvas');
  cv.className = 'gm-cv'; cv.width = w; cv.height = h;
  stage.appendChild(cv);
  return {cv, ctx: cv.getContext('2d'), w, h};
}

/* แปลงพิกัดเมาส์/นิ้ว → พิกัดใน canvas */
function gmPos(cv, e){
  const r = cv.getBoundingClientRect();
  const p = e.touches ? e.touches[0] : e;
  return {x:(p.clientX - r.left) / r.width * cv.width,
          y:(p.clientY - r.top)  / r.height * cv.height};
}

function gmLoop(step){
  let raf = null, last = 0, dead = false;
  const tick = ts => {
    if(dead) return;
    const dt = last ? Math.min(50, ts - last) : 16;
    last = ts;
    step(dt / 1000);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { dead = true; if(raf) cancelAnimationFrame(raf); };
}

/* แถบสกอร์บนหัวเกม */
function gmHud(stage){
  const h = document.createElement('div');
  h.className = 'gm-hud';
  stage.appendChild(h);
  return h;
}

/* =====================================================================
   เกม 1 — 🏓 ปิงปอง (แข่งกับ Toby)
   ===================================================================== */
function gmPingpong(stage){
  const W = 640, H = 400, PW = 10, PH = 74;
  const {cv, ctx} = gmCanvas(stage, W, H);
  const hud = gmHud(stage);
  const S = {
    me:H/2, ai:H/2, bx:W/2, by:H/2, vx:0, vy:0,
    my:0, ay:0, rally:0, over:false, serve:1.2, dir:1,
  };
  const css = k => getComputedStyle(document.documentElement).getPropertyValue(k).trim();

  function serve(toMe){
    S.bx = W/2; S.by = H/2;
    const sp = 300;
    const ang = (Math.random()*0.6 - 0.3);
    S.vx = (toMe ? -1 : 1) * sp * Math.cos(ang);
    S.vy = sp * Math.sin(ang);
    S.rally = 0; S.serve = 0.9;
  }
  serve(Math.random() < 0.5);

  const onMove = e => {
    const p = gmPos(cv, e);
    S.me = gmClamp(p.y, PH/2, H - PH/2);
    if(e.touches) e.preventDefault();
  };
  cv.addEventListener('mousemove', onMove);
  cv.addEventListener('touchmove', onMove, {passive:false});
  const keys = {};
  const kd = e => { keys[e.key] = true; };
  const ku = e => { keys[e.key] = false; };
  document.addEventListener('keydown', kd);
  document.addEventListener('keyup', ku);

  function step(dt){
    if(S.over) return draw();
    if(keys.ArrowUp)   S.me = gmClamp(S.me - 420*dt, PH/2, H - PH/2);
    if(keys.ArrowDown) S.me = gmClamp(S.me + 420*dt, PH/2, H - PH/2);

    if(S.serve > 0){ S.serve -= dt; draw(); return; }

    S.bx += S.vx*dt; S.by += S.vy*dt;
    if(S.by < 8){ S.by = 8; S.vy = Math.abs(S.vy); }
    if(S.by > H-8){ S.by = H-8; S.vy = -Math.abs(S.vy); }

    /* ไม้ของเรา (ซ้าย) */
    if(S.bx < 22+PW && S.vx < 0){
      if(Math.abs(S.by - S.me) < PH/2 + 8){
        S.bx = 22+PW;
        S.vx = Math.abs(S.vx) * 1.045;
        S.vy += (S.by - S.me) * 5.2;
        S.rally++;
      }
    }
    /* ไม้ Toby (ขวา) */
    if(S.bx > W-22-PW && S.vx > 0){
      if(Math.abs(S.by - S.ai) < PH/2 + 8){
        S.bx = W-22-PW;
        S.vx = -Math.abs(S.vx) * 1.045;
        S.vy += (S.by - S.ai) * 5.2;
        S.rally++;
      }
    }
    S.vy = gmClamp(S.vy, -430, 430);

    /* Toby ตามลูก — เร็วจำกัด + พลาดบ้างตอนลูกแรง */
    const err = Math.sin(performance.now()/420) * (26 + Math.min(34, S.rally*1.6));
    const want = S.vx > 0 ? S.by + err : H/2;
    const spd = 268 + Math.min(120, S.rally*7);
    const dy = want - S.ai;
    S.ai += gmClamp(dy, -spd*dt, spd*dt);
    S.ai = gmClamp(S.ai, PH/2, H - PH/2);

    if(S.bx < -14){ S.ay++; point(); }
    else if(S.bx > W+14){ S.my++; point(); }
    draw();
  }

  function point(){
    if(S.my >= 5 || S.ay >= 5){
      S.over = true;
      draw();
      setTimeout(() => gmResult(stage, 'pingpong',
        {win:S.my >= 5, score:S.my},
        `<span class="mono">PAE ${S.my} — ${S.ay} Toby</span>`), 420);
      return;
    }
    serve(S.my > S.ay);
  }

  function draw(){
    const ink = css('--ink') || '#1B1C20';
    ctx.fillStyle = css('--accent') || '#2A3344';
    ctx.fillRect(0,0,W,H);
    /* เส้นกลางโต๊ะ */
    ctx.strokeStyle = 'rgba(255,255,255,.22)'; ctx.lineWidth = 2;
    ctx.setLineDash([9,13]); ctx.beginPath();
    ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(255,255,255,.14)';
    ctx.strokeRect(6,6,W-12,H-12);
    /* ไม้ */
    ctx.fillStyle = css('--gold') || '#9A7B4F';
    ctx.fillRect(22, S.me - PH/2, PW, PH);
    ctx.fillStyle = '#C9CFD8';
    ctx.fillRect(W-22-PW, S.ai - PH/2, PW, PH);
    /* คนถือไม้ — ขยับตามไม้ของตัวเอง เป้าอยู่ด้านนอกไม้ ไม่บังทางลูก
       จำกัดช่วงไม่ให้ล้นขอบบน/ล่างของโต๊ะ */
    const pBase = gmClamp(S.me, 34, H-40) + 34;
    /* เป้ผมดำเสื้อดำ ทับพื้นสนามสีกรมท่าแล้วจมหาย — ใส่แสงนวลไว้ข้างหลังให้ตัดขอบออกมา
       (ฝั่ง Toby เสื้อส้มอยู่แล้ว ไม่ต้องใส่) */
    const glow = ctx.createRadialGradient(62, pBase-34, 4, 62, pBase-34, 44);
    glow.addColorStop(0, 'rgba(226,232,240,.20)');
    glow.addColorStop(1, 'rgba(226,232,240,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(62, pBase-34, 44, 0, Math.PI*2); ctx.fill();
    /* สไปรท์เต็มตัวเหมือนฝั่ง Toby — ถ้ารูปยังโหลดไม่เสร็จค่อยตกไปวาดหน้ากลมแบบเดิม */
    if(!gmDrawFig(ctx, 'pae_sd', 62, pBase, 72, false))
      gmDrawPae(ctx, 62, gmClamp(S.me, 34, H-34), 23);
    const tBase = gmClamp(S.ai, 34, H-40) + 34;
    gmDrawFig(ctx, 'toby', W-62, tBase, 72, true);
    /* ลูก */
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(S.bx, S.by, 7, 0, Math.PI*2); ctx.fill();
    if(S.serve > 0){
      ctx.fillStyle = 'rgba(255,255,255,.8)';
      ctx.font = '600 17px "Noto Sans Thai",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('พร้อม...', W/2, H/2 - 34);
    }
    hud.innerHTML = `<span class="mono">PAE <b>${S.my}</b></span>
      <span class="gm-hud-mid mono">แรลลี่ ${S.rally}</span>
      <span class="mono"><b>${S.ay}</b> Toby</span>`;
  }

  const stop = gmLoop(step);
  return () => {
    stop();
    cv.removeEventListener('mousemove', onMove);
    cv.removeEventListener('touchmove', onMove);
    document.removeEventListener('keydown', kd);
    document.removeEventListener('keyup', ku);
  };
}

/* =====================================================================
   เกม 2 — ⚽ ยิงจุดโทษ (Dale เป็นโกล)
   เล็งแบบ Angry Birds — ลากลูกบอลถอยหลังแล้วปล่อย
   ทิศตรงข้ามที่ลาก = ทางที่บอลไป · ลากไกล = แรง = บอลไปได้ไกลขึ้น
   ===================================================================== */
function gmFootball(stage){
  /* สูงกว่าเกมอื่นเพราะต้องเหลือที่ใต้ลูกไว้ลากถอยหลัง
     ลูกอยู่ที่ y = H-130 → มีที่ว่างใต้ลูก 130px เท่ากับระยะลากเต็มพอดี
     ลากเกินขอบก็ยังได้ เพราะจับ pointer capture ไว้แล้ว */
  const W = 640, H = 460;
  const {cv, ctx} = gmCanvas(stage, W, H);
  const hud = gmHud(stage);
  const GX = 120, GW = 400, GY = 62, GH = 130;   /* กรอบประตู */
  const B0 = {x:W/2, y:H-130};                   /* จุดตั้งลูก */
  const MAXPULL = 130;                           /* ลากไกลสุดที่นับเป็นแรงเต็ม */
  const BASE = 50, MAXDIST = 280;                /* ระยะที่บอลวิ่ง = BASE + power*MAXDIST
                                                    ระยะจากจุดตั้งลูกถึงประตูคือ 138-268
                                                    → power ~0.31-0.78 คือช่วงที่เข้ากรอบ
                                                    ต่ำกว่านั้นไม่ถึง สูงกว่านั้นข้ามคาน */
  const S = {shot:0, goals:0, phase:'aim', t:0, drag:null, ball:{...B0}, shotv:null,
             keep:GX+GW/2, keepTo:GX+GW/2, msg:'ลากลูกบอลถอยหลังแล้วปล่อย',
             flash:0, over:false};

  /* ลากอยู่ตอนนี้ได้ทิศกับแรงเท่าไหร่ */
  function aimFrom(p){
    const dx = B0.x - p.x, dy = B0.y - p.y;
    const len = Math.hypot(dx, dy);
    if(len < 6) return null;
    const pow = gmClamp(len / MAXPULL, 0, 1);
    const dist = BASE + pow * MAXDIST;
    return {dx:dx/len, dy:dy/len, pow, dist,
            tx: B0.x + dx/len * dist, ty: B0.y + dy/len * dist};
  }

  function shoot(a){
    S.shotv = a;
    /* Dale เดาทาง — ยิงไปแล้วหลายลูก ยิ่งอ่านทางเก่งขึ้น */
    const read = 0.30 + S.shot * 0.035;
    const guess = Math.random() < read
      ? a.tx + (Math.random()*90 - 45)
      : GX + 40 + Math.random() * (GW - 80);
    S.keepTo = gmClamp(guess, GX+24, GX+GW-24);
    S.ball = {...B0, t:0};
    S.phase = 'fly'; S.msg = '';
  }

  function land(){
    const a = S.shotv;
    const inX = a.tx > GX && a.tx < GX + GW;
    const overBar = a.ty < GY;
    const tooWeak = a.ty > GY + GH;
    let goal = false;
    if(overBar)       S.msg = 'ข้ามคาน';
    else if(tooWeak)  S.msg = 'แรงไม่พอ ไม่ถึงประตู';
    else if(!inX)     S.msg = 'ออกนอกกรอบ';
    else{
      /* ลูกเบาโกลปัดง่ายกว่า — ยิ่งแรงยิ่งเอื้อมไม่ทัน */
      const reach = 52 + (1 - a.pow) * 26;
      if(Math.abs(a.tx - S.keepTo) < reach) S.msg = `${gmName('dale')} เซฟไว้ได้`;
      else { goal = true; S.msg = 'เข้า!'; }
    }
    if(goal){ S.goals++; S.flash = 1; }
    S.shot++;
    S.phase = 'wait'; S.t = 0;
  }

  function next(){
    if(S.shot >= 10){
      S.over = true;
      setTimeout(() => gmResult(stage, 'football',
        {win:S.goals >= 6, score:S.goals},
        `<span class="mono">ยิงเข้า ${S.goals} จาก 10 ลูก</span>`), 240);
      return;
    }
    S.phase = 'aim'; S.t = 0; S.drag = null; S.shotv = null;
    S.ball = {...B0};
    S.msg = 'ลากลูกบอลถอยหลังแล้วปล่อย';
    S.keep = GX + GW/2; S.keepTo = GX + GW/2;
  }

  /* ---- ลาก ----
     ใช้ pointer capture เพื่อให้ลากเลยขอบ canvas ออกไปแล้วยังตามอยู่
     ถ้าผูก mousemove ไว้กับ canvas เฉย ๆ พอเมาส์ออกนอกขอบจะหยุดติดตามทันที
     (pointer events ครอบทั้งเมาส์และนิ้วในทางเดียว) */
  let pid = null;
  const down = e => {
    if(S.over || S.phase !== 'aim') return;
    e.preventDefault();
    pid = e.pointerId;
    try{ cv.setPointerCapture(pid); }catch(err){}
    S.drag = gmPos(cv, e);
  };
  const move = e => {
    if(pid === null || e.pointerId !== pid) return;
    e.preventDefault();
    S.drag = gmPos(cv, e);
  };
  const up = e => {
    if(pid === null || e.pointerId !== pid) return;
    e.preventDefault();
    try{ cv.releasePointerCapture(pid); }catch(err){}
    pid = null;
    const a = aimFrom(S.drag);
    S.drag = null;
    if(a) shoot(a);
  };
  cv.addEventListener('pointerdown', down);
  cv.addEventListener('pointermove', move);
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointercancel', up);

  function step(dt){
    S.t += dt;
    if(S.flash > 0) S.flash = Math.max(0, S.flash - dt*1.6);
    if(S.phase === 'fly'){
      const b = S.ball, a = S.shotv;
      b.t = Math.min(1, b.t + dt * 1.9);
      b.x = B0.x + (a.tx - B0.x) * b.t;
      b.y = B0.y + (a.ty - B0.y) * b.t;
      S.keep += gmClamp(S.keepTo - S.keep, -560*dt, 560*dt);
      if(b.t >= 1) land();
    }
    if(S.phase === 'wait' && S.t > 1.2) next();
    draw();
  }

  function draw(){
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0, '#3F6B4A'); g.addColorStop(1, '#2E5238');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 3;
    ctx.strokeRect(GX-46, GY, GW+92, GH+112);
    /* ประตู */
    ctx.strokeStyle = '#F2F0EC'; ctx.lineWidth = 7;
    ctx.strokeRect(GX, GY, GW, GH);
    ctx.strokeStyle = 'rgba(255,255,255,.16)'; ctx.lineWidth = 1;
    for(let x = GX+16; x < GX+GW; x += 22){ ctx.beginPath(); ctx.moveTo(x,GY); ctx.lineTo(x,GY+GH); ctx.stroke(); }
    for(let y = GY+14; y < GY+GH; y += 22){ ctx.beginPath(); ctx.moveTo(GX,y); ctx.lineTo(GX+GW,y); ctx.stroke(); }

    /* Dale — สไปรท์ SD ตัวเดียวกับในผังออฟฟิศ ยืนกลางประตู */
    const kx = S.keep, kBase = GY + GH + 6;
    ctx.save();
    ctx.globalAlpha = .22; ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(kx, kBase, 24, 6, 0, 0, Math.PI*2); ctx.fill();
    ctx.restore();
    if(!gmDrawFig(ctx, 'dale', kx, kBase, 86, false)){
      ctx.fillStyle = '#D8C56A';
      ctx.beginPath(); ctx.roundRect(kx-26, kBase-66, 52, 66, 9); ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,.72)';
    ctx.font = '600 10px "IBM Plex Mono",monospace'; ctx.textAlign = 'center';
    ctx.fillText('DALE', kx, kBase + 17);

    /* เส้นเล็งตอนลาก */
    if(S.phase === 'aim' && S.drag){
      const a = aimFrom(S.drag);
      if(a){
        /* ยางหนังสติ๊ก — หยุดที่ MAXPULL ถึงจะลากเมาส์ออกนอกจอไปไกลแค่ไหน
           เส้นก็ไม่พุ่งหลุด และเห็นชัดว่าแรงเต็มแล้ว */
        const px = B0.x - a.dx * MAXPULL * a.pow;
        const py = B0.y - a.dy * MAXPULL * a.pow;
        ctx.strokeStyle = a.pow >= 1 ? 'rgba(240,144,122,.8)' : 'rgba(255,255,255,.35)';
        ctx.lineWidth = 3; ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(B0.x, B0.y); ctx.lineTo(px, py); ctx.stroke();
        ctx.fillStyle = a.pow >= 1 ? '#F0907A' : 'rgba(255,255,255,.5)';
        ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI*2); ctx.fill();
        /* เส้นประบอกทางที่บอลจะไป */
        ctx.strokeStyle = '#FFD976'; ctx.lineWidth = 2.5;
        ctx.setLineDash([7,9]);
        ctx.beginPath(); ctx.moveTo(B0.x, B0.y); ctx.lineTo(a.tx, a.ty); ctx.stroke();
        ctx.setLineDash([]);
        /* จุดตกเป้า */
        ctx.strokeStyle = '#FFD976'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(a.tx, a.ty, 9, 0, Math.PI*2); ctx.stroke();
        /* แถบแรง */
        const bw = 170, bx = W/2 - bw/2, by = H - 18;
        ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.roundRect(bx,by,bw,9,5); ctx.fill();
        ctx.fillStyle = a.pow > .74 ? '#F0907A' : (a.pow < .31 ? '#8FA9C0' : '#FFD976');
        ctx.beginPath(); ctx.roundRect(bx,by,bw*a.pow,9,5); ctx.fill();
      }
    }

    /* ลูกบอล */
    const b = S.ball;
    const shrink = S.phase === 'fly' ? 1 - 0.28*b.t : 1;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(b.x, b.y, 10*shrink, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(27,28,32,.45)'; ctx.lineWidth = 1.4; ctx.stroke();

    if(S.flash > 0){
      ctx.fillStyle = `rgba(255,255,255,${S.flash*0.28})`;
      ctx.fillRect(0,0,W,H);
    }
    if(S.msg){
      ctx.fillStyle = 'rgba(255,255,255,.94)';
      ctx.font = '600 17px "Noto Sans Thai",sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(S.msg, W/2, H - 38);
    }
    hud.innerHTML = `<span class="mono">ลูกที่ <b>${Math.min(S.shot+1,10)}</b>/10</span>
      <span class="gm-hud-mid mono">เข้า ${S.goals}</span>
      <span class="mono">ต้องเข้า 6 ถึงชนะ</span>`;
  }

  const stop = gmLoop(step);
  return () => {
    stop();
    cv.removeEventListener('pointerdown', down);
    cv.removeEventListener('pointermove', move);
    cv.removeEventListener('pointerup', up);
    cv.removeEventListener('pointercancel', up);
  };
}

/* =====================================================================
   เกม 3 — 🎣 ตกปลาในตู้ปลา (เล่นคนเดียว จับเวลา 45 วิ)
   ===================================================================== */
function gmFishing(stage){
  const W = 640, H = 400, TIME = 45;
  const {cv, ctx} = gmCanvas(stage, W, H);
  const hud = gmHud(stage);
  const ART = (typeof OFC_FISH_ART !== 'undefined' && OFC_FISH_ART.length)
    ? OFC_FISH_ART
    : ['office/sprites/cat/clown.png','office/sprites/cat/tang.png','office/sprites/cat/pinky.png'];
  const imgs = ART.map(src => { const i = new Image(); i.src = src; return i; });
  const S = {fish:[], caught:0, left:TIME, over:false, pops:[]};

  function spawn(){
    const kind = Math.floor(Math.random()*imgs.length);
    const dir = Math.random() < 0.5 ? 1 : -1;
    const sp = (58 + Math.random()*46) * (1 + S.caught*0.075);
    const h = 34 + Math.random()*16;
    S.fish.push({kind, dir, sp, x: dir > 0 ? -60 : W+60, y: 48 + Math.random()*(H-120),
                 w: h*1.6, h, bob: Math.random()*6.28});
  }
  for(let i=0;i<4;i++){ spawn(); S.fish[i].x = Math.random()*W; }

  const onTap = e => {
    e.preventDefault();
    if(S.over) return;
    const p = gmPos(cv, e);
    for(let i = S.fish.length-1; i >= 0; i--){
      const f = S.fish[i];
      if(Math.abs(p.x - f.x) < f.w/2 + 6 && Math.abs(p.y - f.y) < f.h/2 + 8){
        S.fish.splice(i,1);
        S.caught++;
        S.pops.push({x:f.x, y:f.y, t:0});
        spawn();
        return;
      }
    }
  };
  cv.addEventListener('mousedown', onTap);
  cv.addEventListener('touchstart', onTap, {passive:false});

  function step(dt){
    if(!S.over){
      S.left -= dt;
      if(S.left <= 0){
        S.left = 0; S.over = true;
        setTimeout(() => gmResult(stage, 'fishing', {score:S.caught},
          `<span class="mono">จับได้ ${S.caught} ตัวใน ${TIME} วินาที</span>`), 260);
      }
    }
    S.fish.forEach(f => {
      f.x += f.dir * f.sp * dt;
      f.bob += dt*2.4;
      if(f.dir > 0 && f.x > W+80) { f.x = -70; f.y = 48 + Math.random()*(H-120); }
      if(f.dir < 0 && f.x < -80) { f.x = W+70; f.y = 48 + Math.random()*(H-120); }
    });
    while(S.fish.length < 4 + Math.min(4, Math.floor(S.caught/5))) spawn();
    S.pops.forEach(p => p.t += dt);
    S.pops = S.pops.filter(p => p.t < 0.7);
    draw();
  }

  function draw(){
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0, '#1D4C63'); g.addColorStop(1, '#0E2C3D');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    /* ฟองอากาศ */
    const t = performance.now()/1000;
    ctx.fillStyle = 'rgba(255,255,255,.09)';
    for(let i=0;i<16;i++){
      const bx = (i*67 + 30) % W;
      const by = H - ((t*26 + i*53) % (H+40));
      ctx.beginPath(); ctx.arc(bx, by, 3 + (i%3), 0, Math.PI*2); ctx.fill();
    }
    /* พื้นทราย */
    ctx.fillStyle = 'rgba(214,196,150,.22)';
    ctx.fillRect(0, H-26, W, 26);
    /* ปลา */
    S.fish.forEach(f => {
      const im = imgs[f.kind];
      const y = f.y + Math.sin(f.bob)*3;
      ctx.save();
      ctx.translate(f.x, y);
      /* รูปต้นฉบับหันซ้ายทุกตัว — ตัวที่ว่ายไปขวาต้องพลิก */
      if(f.dir > 0) ctx.scale(-1, 1);
      if(im.complete && im.naturalWidth){
        ctx.drawImage(im, -f.w/2, -f.h/2, f.w, f.h);
      }else{
        ctx.fillStyle = '#EFA35C';
        ctx.beginPath(); ctx.ellipse(0,0,f.w/2,f.h/2,0,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();
    });
    /* เอฟเฟกต์ตอนจับได้ */
    S.pops.forEach(p => {
      const a = 1 - p.t/0.7;
      ctx.strokeStyle = `rgba(255,255,255,${a*0.85})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(p.x, p.y, 12 + p.t*46, 0, Math.PI*2); ctx.stroke();
    });
    const warn = S.left <= 10 ? ' gm-warn' : '';
    hud.innerHTML = `<span class="mono">จับได้ <b>${S.caught}</b></span>
      <span class="gm-hud-mid mono${warn}">${S.left.toFixed(1)} วิ</span>
      <span class="mono">กดที่ตัวปลา</span>`;
  }

  const stop = gmLoop(step);
  return () => {
    stop();
    cv.removeEventListener('mousedown', onTap);
    cv.removeEventListener('touchstart', onTap);
  };
}

/* =====================================================================
   เกม 4 — 🐍 เกมงู (เล่นคนเดียว ทำสกอร์)
   ===================================================================== */
function gmSnake(stage){
  const CELL = 24, COLS = 26, ROWS = 16;
  const W = COLS*CELL, H = ROWS*CELL;
  const {cv, ctx} = gmCanvas(stage, W, H);
  const hud = gmHud(stage);
  const css = k => getComputedStyle(document.documentElement).getPropertyValue(k).trim();

  const S = {
    body: [{x:6,y:8},{x:5,y:8},{x:4,y:8}],
    dir: {x:1,y:0}, queue: [], food: null,
    score: 0, acc: 0, sps: 7, over: false, started: false,
  };

  function placeFood(){
    let p;
    do{ p = {x:Math.floor(Math.random()*COLS), y:Math.floor(Math.random()*ROWS)}; }
    while(S.body.some(b => b.x===p.x && b.y===p.y));
    S.food = p;
  }
  placeFood();

  const DIRS = {
    ArrowUp:{x:0,y:-1}, ArrowDown:{x:0,y:1}, ArrowLeft:{x:-1,y:0}, ArrowRight:{x:1,y:0},
    w:{x:0,y:-1}, s:{x:0,y:1}, a:{x:-1,y:0}, d:{x:1,y:0},
  };
  const kd = e => {
    const d = DIRS[e.key] || DIRS[(e.key||'').toLowerCase()];
    if(!d || S.over) return;
    /* กันกดย้อนกลับทับตัวเอง — เทียบกับทิศที่จะใช้จริงคิวสุดท้าย */
    const last = S.queue.length ? S.queue[S.queue.length-1] : S.dir;
    if(d.x === -last.x && d.y === -last.y) return;
    if(S.queue.length < 2) S.queue.push(d);
    S.started = true;
  };
  document.addEventListener('keydown', kd);

  function move(){
    if(S.queue.length) S.dir = S.queue.shift();
    const h = S.body[0];
    const n = {x:h.x + S.dir.x, y:h.y + S.dir.y};
    if(n.x < 0 || n.y < 0 || n.x >= COLS || n.y >= ROWS) return die();
    /* หางกำลังจะขยับออก ชนหางช่องสุดท้ายไม่นับตาย */
    if(S.body.slice(0, -1).some(b => b.x===n.x && b.y===n.y)) return die();
    S.body.unshift(n);
    if(n.x === S.food.x && n.y === S.food.y){
      S.score++;
      S.sps = Math.min(16, S.sps + 0.25);
      placeFood();
    }else{
      S.body.pop();
    }
  }

  function die(){
    S.over = true;
    setTimeout(() => gmResult(stage, 'snake', {score:S.score},
      `<span class="mono">ยาว ${S.body.length} ช่อง</span>`), 320);
  }

  function step(dt){
    if(!S.over && S.started){
      S.acc += dt;
      const per = 1 / S.sps;
      while(S.acc >= per){ S.acc -= per; if(!S.over) move(); }
    }
    draw();
  }

  function draw(){
    ctx.fillStyle = '#1B2430'; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle = 'rgba(255,255,255,.045)'; ctx.lineWidth = 1;
    for(let x=1;x<COLS;x++){ ctx.beginPath(); ctx.moveTo(x*CELL,0); ctx.lineTo(x*CELL,H); ctx.stroke(); }
    for(let y=1;y<ROWS;y++){ ctx.beginPath(); ctx.moveTo(0,y*CELL); ctx.lineTo(W,y*CELL); ctx.stroke(); }
    /* อาหาร */
    const f = S.food;
    ctx.fillStyle = '#E4785F';
    ctx.beginPath(); ctx.arc(f.x*CELL+CELL/2, f.y*CELL+CELL/2, CELL*0.32, 0, Math.PI*2); ctx.fill();
    /* ตัวงู — หัวสีทอง ตัวไล่จางไปทางหาง */
    S.body.forEach((b,i) => {
      const t = i / Math.max(1, S.body.length);
      ctx.fillStyle = i === 0 ? (css('--gold') || '#9A7B4F')
                              : `rgba(150,178,160,${0.92 - t*0.5})`;
      ctx.beginPath();
      ctx.roundRect(b.x*CELL+2, b.y*CELL+2, CELL-4, CELL-4, i===0 ? 7 : 5);
      ctx.fill();
    });
    /* ตาบนหัว — เรียงตามแนวตั้งฉากกับทิศที่ไป ตาดำเหลือบไปข้างหน้า */
    const hd = S.body[0];
    const hx = hd.x*CELL + CELL/2, hy = hd.y*CELL + CELL/2;
    const d = S.dir, side = {x:-d.y, y:d.x};
    const ER = CELL*0.19, PR = CELL*0.095;
    [-1, 1].forEach(sg => {
      const ex = hx + d.x*CELL*0.14 + side.x*CELL*0.20*sg;
      const ey = hy + d.y*CELL*0.14 + side.y*CELL*0.20*sg;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(ex, ey, ER, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#1B1C20';
      ctx.beginPath(); ctx.arc(ex + d.x*ER*0.42, ey + d.y*ER*0.42, PR, 0, Math.PI*2); ctx.fill();
    });
    if(!S.started){
      ctx.fillStyle = 'rgba(18,20,26,.55)'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
      ctx.font = '600 19px "Noto Sans Thai",sans-serif';
      ctx.fillText('กดลูกศรเพื่อเริ่ม', W/2, H/2);
    }
    hud.innerHTML = `<span class="mono">แต้ม <b>${S.score}</b></span>
      <span class="gm-hud-mid mono">ยาว ${S.body.length}</span>
      <span class="mono">ลูกศร / WASD</span>`;
  }

  const stop = gmLoop(step);
  return () => { stop(); document.removeEventListener('keydown', kd); };
}

/* =====================================================================
   เกม 5 — 🧱 เตตริส (เล่นคนเดียว นับแถวที่เก็บได้)
   ===================================================================== */
function gmTetris(stage){
  const COLS = 10, ROWS = 18, CELL = 22;
  const PW = COLS*CELL, PH = ROWS*CELL;          /* กระดาน 220 x 396 */
  /* canvas กว้างกว่ากระดานเยอะ เพราะถูกยืดเต็มความกว้าง popup
     ถ้าทำแคบ อัตราส่วนจะสูงจนล้นจอเตี้ย — 560x440 ให้ความสูงที่แสดงจริงพอดี */
  const W = 560, H = PH + 44;
  const PX = 118, PY = 22;                       /* มุมซ้ายบนของกระดาน */
  const {cv, ctx} = gmCanvas(stage, W, H);
  const hud = gmHud(stage);

  /* รูปทรงมาตรฐาน 7 ตัว เก็บเป็นเมทริกซ์ หมุนด้วยการทรานสโพส */
  const SHAPES = {
    I:{c:'#7FB3C8', m:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]},
    O:{c:'#D9C06A', m:[[1,1],[1,1]]},
    T:{c:'#A98BC4', m:[[0,1,0],[1,1,1],[0,0,0]]},
    S:{c:'#8FBF8A', m:[[0,1,1],[1,1,0],[0,0,0]]},
    Z:{c:'#D08A7C', m:[[1,1,0],[0,1,1],[0,0,0]]},
    J:{c:'#7E92C4', m:[[1,0,0],[1,1,1],[0,0,0]]},
    L:{c:'#D9A46A', m:[[0,0,1],[1,1,1],[0,0,0]]},
  };
  const KEYS = Object.keys(SHAPES);

  const grid = Array.from({length:ROWS}, () => new Array(COLS).fill(null));
  const S = {cur:null, next:null, lines:0, acc:0, drop:0.85, over:false};

  const rotate = m => m[0].map((_, i) => m.map(r => r[i]).reverse());

  function spawn(){
    S.cur = S.next || newPiece();
    S.next = newPiece();
    if(hits(S.cur.m, S.cur.x, S.cur.y)) end();
  }
  function newPiece(){
    const k = gmPick(KEYS);
    const sh = SHAPES[k];
    return {k, m:sh.m.map(r=>r.slice()), c:sh.c,
            x:Math.floor((COLS - sh.m[0].length)/2), y:0};
  }
  function hits(m, px, py){
    for(let r=0;r<m.length;r++) for(let c=0;c<m[r].length;c++){
      if(!m[r][c]) continue;
      const x = px+c, y = py+r;
      if(x < 0 || x >= COLS || y >= ROWS) return true;
      if(y >= 0 && grid[y][x]) return true;
    }
    return false;
  }
  function lock(){
    S.cur.m.forEach((row,r) => row.forEach((v,c) => {
      if(v && S.cur.y+r >= 0) grid[S.cur.y+r][S.cur.x+c] = S.cur.c;
    }));
    /* เก็บแถวที่เต็ม */
    let cleared = 0;
    for(let r=ROWS-1;r>=0;r--){
      if(grid[r].every(v => v)){
        grid.splice(r,1);
        grid.unshift(new Array(COLS).fill(null));
        cleared++; r++;
      }
    }
    if(cleared){
      S.lines += cleared;
      S.drop = Math.max(0.14, 0.85 - S.lines*0.035);
    }
    spawn();
  }
  function tryMove(dx, dy){
    if(hits(S.cur.m, S.cur.x+dx, S.cur.y+dy)) return false;
    S.cur.x += dx; S.cur.y += dy; return true;
  }
  function tryRotate(){
    const m = rotate(S.cur.m);
    /* เตะกำแพง — ลองขยับซ้ายขวานิดหน่อยถ้าหมุนแล้วชน */
    for(const dx of [0,-1,1,-2,2]){
      if(!hits(m, S.cur.x+dx, S.cur.y)){ S.cur.m = m; S.cur.x += dx; return; }
    }
  }
  function end(){
    S.over = true;
    setTimeout(() => gmResult(stage, 'tetris', {score:S.lines},
      `<span class="mono">เก็บได้ ${S.lines} แถว</span>`), 320);
  }

  const kd = e => {
    if(S.over || !S.cur) return;
    const k = e.key;
    if(k === 'ArrowLeft')  tryMove(-1,0);
    else if(k === 'ArrowRight') tryMove(1,0);
    else if(k === 'ArrowDown')  { if(!tryMove(0,1)) lock(); S.acc = 0; }
    else if(k === 'ArrowUp')    tryRotate();
    else if(k === ' ')          { while(tryMove(0,1)){} lock(); S.acc = 0; }
    else return;
    draw();
  };
  document.addEventListener('keydown', kd);
  spawn();

  function step(dt){
    if(!S.over){
      S.acc += dt;
      if(S.acc >= S.drop){ S.acc = 0; if(!tryMove(0,1)) lock(); }
    }
    draw();
  }

  function cellRect(x, y, col){
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.roundRect(x+1, y+1, CELL-2, CELL-2, 4); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.16)';
    ctx.fillRect(x+3, y+3, CELL-6, 3);
  }

  function draw(){
    ctx.fillStyle = '#1B2430'; ctx.fillRect(0,0,W,H);
    /* กระดาน */
    ctx.fillStyle = '#141B25';
    ctx.fillRect(PX, PY, PW, PH);
    ctx.strokeStyle = 'rgba(255,255,255,.14)'; ctx.lineWidth = 2;
    ctx.strokeRect(PX, PY, PW, PH);
    ctx.strokeStyle = 'rgba(255,255,255,.04)'; ctx.lineWidth = 1;
    for(let c=1;c<COLS;c++){ ctx.beginPath(); ctx.moveTo(PX+c*CELL,PY); ctx.lineTo(PX+c*CELL,PY+PH); ctx.stroke(); }
    for(let r=1;r<ROWS;r++){ ctx.beginPath(); ctx.moveTo(PX,PY+r*CELL); ctx.lineTo(PX+PW,PY+r*CELL); ctx.stroke(); }
    /* ก้อนที่ลงแล้ว */
    grid.forEach((row,r) => row.forEach((col,c) => {
      if(col) cellRect(PX+c*CELL, PY+r*CELL, col);
    }));
    /* เงาบอกที่ตก */
    if(S.cur && !S.over){
      let gy = S.cur.y;
      while(!hits(S.cur.m, S.cur.x, gy+1)) gy++;
      S.cur.m.forEach((row,r) => row.forEach((v,c) => {
        if(!v) return;
        ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(PX+(S.cur.x+c)*CELL+2, PY+(gy+r)*CELL+2, CELL-4, CELL-4, 4);
        ctx.stroke();
      }));
      S.cur.m.forEach((row,r) => row.forEach((v,c) => {
        if(v && S.cur.y+r >= 0) cellRect(PX+(S.cur.x+c)*CELL, PY+(S.cur.y+r)*CELL, S.cur.c);
      }));
    }
    /* ตัวถัดไป */
    const NX = PX + PW + 40, NY = PY + 30;
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.font = '600 10px "IBM Plex Mono",monospace'; ctx.textAlign = 'left';
    ctx.fillText('NEXT', NX, NY - 12);
    if(S.next){
      const m = S.next.m, sc = 17;
      m.forEach((row,r) => row.forEach((v,c) => {
        if(!v) return;
        ctx.fillStyle = S.next.c;
        ctx.beginPath(); ctx.roundRect(NX+c*sc, NY+r*sc, sc-2, sc-2, 3); ctx.fill();
      }));
    }
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.fillText('LINES', NX, NY + 108);
    ctx.fillStyle = '#fff';
    ctx.font = '600 26px "IBM Plex Mono",monospace';
    ctx.fillText(String(S.lines), NX, NY + 138);

    hud.innerHTML = `<span class="mono">แถว <b>${S.lines}</b></span>
      <span class="gm-hud-mid mono">← → ↑ ↓</span>
      <span class="mono">Space ทิ้งลงสุด</span>`;
  }

  const stop = gmLoop(step);
  return () => { stop(); document.removeEventListener('keydown', kd); };
}

/* =====================================================================
   เกม 6 — 🔢 ซูโดกุ แข่งเวลากับ Vera
   ทำเป็น DOM ไม่ใช่ canvas เพราะต้องกดช่องกับพิมพ์เลข
   ตรวจคำตอบด้วยกติกาซูโดกุตรง ๆ (แถว/หลัก/บล็อกต้องมี 1-9 ครบ)
   ไม่ได้เทียบกับเฉลยที่เก็บไว้ — โจทย์ที่มีหลายคำตอบก็เลยไม่พังตาม

   เลือกระดับความยากได้ 3 ระดับ — เจาะช่องออกมากขึ้น + เวลาของ Vera สั้นลง
   โจทย์ทุกใบเจาะแบบเช็คคำตอบเดียว (unique) จะได้ไล่ตรรกะออกจริง ไม่ต้องเดา
   ===================================================================== */
const GM_SUDOKU_LV = [
  {k:'easy',   label:'ง่าย',  holes:34, par:720},
  {k:'normal', label:'ปกติ',  holes:44, par:540},
  {k:'hard',   label:'ยาก',   holes:52, par:420},
];
const GM_SUDOKU_LS = 'agapae.sudoku.lv';
const gmSudokuLv = () => GM_SUDOKU_LV.find(l => l.k === localStorage.getItem(GM_SUDOKU_LS))
                      || GM_SUDOKU_LV[0];

/* ตรวจว่าเลข v ลงช่อง i ได้ไหมตามกติกา */
function gmSdOk(g, i, v){
  const r = (i/9)|0, c = i%9, br = ((r/3)|0)*3, bc = ((c/3)|0)*3;
  for(let k=0;k<9;k++){
    if(g[r*9+k] === v) return false;
    if(g[k*9+c] === v) return false;
    if(g[(br+((k/3)|0))*9 + bc + k%3] === v) return false;
  }
  return true;
}

/* นับจำนวนคำตอบ แต่หยุดทันทีที่เจอครบ limit (ใช้ limit=2 พอ — แค่อยากรู้ว่าซ้ำไหม) */
function gmSdCount(puz, limit){
  const g = puz.slice();
  let n = 0;
  const go = () => {
    if(n >= limit) return;
    const i = g.indexOf(0);
    if(i < 0){ n++; return; }
    for(let v=1;v<=9;v++){
      if(!gmSdOk(g, i, v)) continue;
      g[i] = v; go(); g[i] = 0;
      if(n >= limit) return;
    }
  };
  go();
  return n;
}

function gmSudokuGen(holes){
  const g = new Array(81).fill(0);
  const fill = i => {
    if(i === 81) return true;
    const nums = [1,2,3,4,5,6,7,8,9];
    for(let j=8;j>0;j--){ const k = Math.floor(Math.random()*(j+1)); [nums[j],nums[k]] = [nums[k],nums[j]]; }
    for(const v of nums){
      if(!gmSdOk(g, i, v)) continue;
      g[i] = v;
      if(fill(i+1)) return true;
      g[i] = 0;
    }
    return false;
  };
  fill(0);
  /* เจาะทีละช่อง — ถ้าเจาะแล้วคำตอบไม่เหลือแบบเดียว ให้ใส่กลับ
     บางระดับอาจเจาะไม่ครบตามเป้า ก็ปล่อยไป โจทย์ยังใช้ได้ */
  const idx = [...Array(81).keys()];
  for(let j=80;j>0;j--){ const k = Math.floor(Math.random()*(j+1)); [idx[j],idx[k]] = [idx[k],idx[j]]; }
  const puz = g.slice();
  let dug = 0;
  for(const i of idx){
    if(dug >= holes) break;
    const keep = puz[i];
    puz[i] = 0;
    if(gmSdCount(puz, 2) === 1) dug++;
    else puz[i] = keep;
  }
  return puz;
}

/* กติกาซูโดกุ — ครบและไม่ซ้ำทั้งแถว หลัก และบล็อก */
function gmSudokuDone(v){
  if(v.some(x => !x)) return false;
  for(let k=0;k<9;k++){
    const row = new Set(), col = new Set(), box = new Set();
    for(let j=0;j<9;j++){
      row.add(v[k*9+j]);
      col.add(v[j*9+k]);
      box.add(v[(((k/3)|0)*3 + ((j/3)|0))*9 + (k%3)*3 + j%3]);
    }
    if(row.size !== 9 || col.size !== 9 || box.size !== 9) return false;
  }
  return true;
}

const gmMMSS = s => `${Math.floor(s/60)}:${String(Math.round(s)%60).padStart(2,'0')}`;

function gmSudoku(stage){
  let lv = gmSudokuLv();
  let puz = [], val = [], sel = -1, t0 = 0, over = false;

  const wrap = document.createElement('div');
  wrap.className = 'sd-wrap';
  wrap.innerHTML = `
    <div class="sd-top">
      <span class="mono">เวลา <b id="sdTime">0:00</b></span>
      <span class="sd-par mono" id="sdPar"></span>
    </div>
    <div class="sd-lv" id="sdLv">${GM_SUDOKU_LV.map(l =>
      `<button class="sd-lvb" type="button" data-lv="${l.k}">${l.label}</button>`).join('')}</div>
    <div class="sd-grid" id="sdGrid"></div>
    <div class="sd-pad" id="sdPad"></div>`;
  stage.appendChild(wrap);

  const gridEl = wrap.querySelector('#sdGrid');
  const parEl  = wrap.querySelector('#sdPar');
  const tEl    = wrap.querySelector('#sdTime');
  const cells  = [];
  for(let i=0;i<81;i++){
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'sd-c';
    if(i%3 === 2 && i%9 !== 8) b.classList.add('br');
    if(((i/9)|0)%3 === 2 && i < 72) b.classList.add('bb');
    b.onclick = () => { if(!puz[i] && !over){ sel = i; paint(); } };
    gridEl.appendChild(b);
    cells.push(b);
  }

  const padEl = wrap.querySelector('#sdPad');
  [1,2,3,4,5,6,7,8,9,0].forEach(n => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'sd-k';
    b.textContent = n === 0 ? '⌫' : n;
    b.onclick = () => put(n);
    padEl.appendChild(b);
  });

  /* เปลี่ยนระดับ = แจกโจทย์ใหม่และเริ่มจับเวลาใหม่ */
  wrap.querySelector('#sdLv').addEventListener('click', e => {
    const b = e.target.closest('button');
    if(!b) return;
    const next = GM_SUDOKU_LV.find(l => l.k === b.dataset.lv);
    if(!next || (next.k === lv.k && !over)) return;
    lv = next;
    try{ localStorage.setItem(GM_SUDOKU_LS, lv.k); }catch(err){}
    deal();
  });

  function deal(){
    over = false; sel = -1;
    puz = gmSudokuGen(lv.holes);
    val = puz.slice();
    t0 = Date.now();
    parEl.textContent = `เวลาของ ${gmName('vera')} ${gmMMSS(lv.par)}`;
    tEl.textContent = '0:00';
    tEl.parentElement.classList.remove('sd-late');
    cells.forEach((b,i) => b.classList.toggle('fixed', !!puz[i]));
    wrap.querySelectorAll('.sd-lvb').forEach(b =>
      b.classList.toggle('on', b.dataset.lv === lv.k));
    paint();
  }

  function put(n){
    if(over || sel < 0 || puz[sel]) return;
    val[sel] = n;
    paint();
    if(gmSudokuDone(val)) finish();
  }

  /* ช่องที่ชนกติกา (ซ้ำในแถว/หลัก/บล็อก) ทำเป็นสีแดงให้เห็นทันที */
  function bad(i){
    const v = val[i];
    if(!v) return false;
    const r = (i/9)|0, c = i%9, br = ((r/3)|0)*3, bc = ((c/3)|0)*3;
    for(let k=0;k<9;k++){
      const a = r*9+k, b2 = k*9+c, d = (br+((k/3)|0))*9 + bc + k%3;
      if(a !== i && val[a] === v) return true;
      if(b2 !== i && val[b2] === v) return true;
      if(d !== i && val[d] === v) return true;
    }
    return false;
  }

  function paint(){
    cells.forEach((b,i) => {
      b.textContent = val[i] || '';
      b.classList.toggle('sel', i === sel);
      b.classList.toggle('bad', bad(i));
      b.classList.toggle('peer', sel >= 0 && i !== sel && val[i] && val[i] === val[sel]);
    });
  }

  function finish(){
    over = true;
    const secs = Math.round((Date.now() - t0)/1000);
    setTimeout(() => gmResult(stage, 'sudoku',
      {win: secs < lv.par, score: Math.max(0, lv.par - secs)},
      `<span class="mono">ระดับ${lv.label} · ใช้เวลา ${gmMMSS(secs)} · เวลาของ ${gmEsc(gmName('vera'))} ${gmMMSS(lv.par)}</span>`), 300);
  }

  const kd = e => {
    if(over) return;
    if(e.key >= '1' && e.key <= '9') put(Number(e.key));
    else if(e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') put(0);
    else if(sel >= 0){
      const d = {ArrowLeft:-1, ArrowRight:1, ArrowUp:-9, ArrowDown:9}[e.key];
      if(d != null){ sel = gmClamp(sel + d, 0, 80); paint(); }
    }
  };
  document.addEventListener('keydown', kd);

  const tick = setInterval(() => {
    if(over) return;
    const s2 = Math.round((Date.now() - t0)/1000);
    tEl.textContent = gmMMSS(s2);
    tEl.parentElement.classList.toggle('sd-late', s2 >= lv.par);
  }, 500);

  deal();
  return () => { clearInterval(tick); document.removeEventListener('keydown', kd); };
}

/* =====================================================================
   เกม 7 — ☕ ชงกาแฟให้ทีม (เล่นคนเดียว แต่มี agent มาสั่งจริง)
   2 จังหวะต่อแก้ว:
     1) กดค้างรินกาแฟให้ระดับอยู่ในแถบที่เขาสั่ง — ปล่อยเมื่อพอ
     2) ใส่ส่วนผสม นม / น้ำตาล / ครีม ให้ครบตามออเดอร์ แล้วกดเสิร์ฟ
   เสร็จแล้วคนสั่งให้ดาว 1-5 ดวง · สกอร์ = ดาวรวมทั้ง 10 แก้ว (เต็ม 50)
   ===================================================================== */
const GM_COFFEE_MIX = [
  {k:'milk',  label:'นม',     em:'🥛', key:'1'},
  {k:'sugar', label:'น้ำตาล', em:'🍬', key:'2'},
  {k:'cream', label:'ครีม',   em:'🍦', key:'3'},
];
/* สูตรประจำตัวของแต่ละคน — ใช้เป็นออเดอร์บ่อย ๆ แต่บางแก้วก็สั่งนอกสูตร */
const GM_COFFEE_TASTE = {
  claudy:{say:'ดำล้วน ไม่หวาน',        milk:0, sugar:0, cream:0},
  minnie:{say:'ลาเต้เยอะ ๆ นม',        milk:2, sugar:1, cream:0},
  reese: {say:'อเมริกาโน่ เข้ม',        milk:0, sugar:0, cream:1},
  addy:  {say:'เอสเปรสโซ่ช็อตเดียว',    milk:0, sugar:1, cream:0},
  rae:   {say:'คาปูชิโน่ ฟองหนา',       milk:1, sugar:1, cream:1},
  vera:  {say:'ตวงให้พอดีขอบ',          milk:1, sugar:0, cream:0},
  mind:  {say:'ลาเต้ ขอสีสวย ๆ',        milk:2, sugar:0, cream:1},
  chris: {say:'ดำ ไม่ใส่อะไร',          milk:0, sugar:0, cream:0},
  libby: {say:'หวานได้ แต่อย่าข้น',     milk:1, sugar:2, cream:0},
  nick:  {say:'อะไรก็ได้ที่คาเฟอีนเยอะ', milk:0, sugar:2, cream:0},
  dale:  {say:'แก้วใหญ่ ยาว ๆ',         milk:1, sugar:1, cream:0},
  toby:  {say:'หวานหน่อย',              milk:1, sugar:2, cream:1},
  news:  {say:'ร้อน ๆ ก่อนออกข่าว',     milk:0, sugar:1, cream:0},
};
/* คำติชมแยกตามจำนวนดาวที่ให้ */
const GM_COFFEE_SAY = {
  5: ['เป๊ะมาก! แก้วนี้ 5 ดาวเลย','อร่อยที่สุดตั้งแต่เคยกินมา','นี่แหละรสที่รอ ขอบคุณ!'],
  4: ['อร่อยนะ ขาดอีกนิดเดียวเอง','ดีเลย เกือบเป๊ะแล้ว','กินได้สบาย ๆ ขอบคุณ'],
  3: ['พอไหว แต่ไม่ใช่ที่สั่งนะ','กลาง ๆ อ่ะ','โอเคแหละ แต่รอบหน้าเอาใหม่'],
  2: ['อันนี้ไม่ค่อยตรงเลย','ชงใหม่ได้ไหม...','รสเพี้ยนไปเยอะนะ'],
  1: ['นี่กาแฟเหรอ','ขอเทิ้งได้ไหม','เอาไปคืนเครื่องเถอะ'],
};

function gmCoffee(stage){
  const W = 640, H = 400, CUPS = 10;
  const {cv, ctx} = gmCanvas(stage, W, H);
  const hud = gmHud(stage);
  const ids = (typeof AGENTS !== 'undefined' ? AGENTS : []).map(a => a.id);
  const CX = W/2, CTOP = 118, CH = 188, CW = 130;   /* กรอบแก้ว */

  const S = {n:0, stars:0, full:0, fill:0, pouring:false, phase:'pour', t:0,
             who:null, lo:0, hi:0, need:{milk:0,sugar:0,cream:0},
             add:{milk:0,sugar:0,cream:0}, rate:0, msg:'', say:'', over:false};

  /* ---- แถบปุ่มส่วนผสม (DOM เพราะกดง่ายกว่าเล็งบน canvas) ---- */
  const bar = document.createElement('div');
  bar.className = 'cf-bar';
  bar.innerHTML = GM_COFFEE_MIX.map(m =>
    `<button class="cf-b" type="button" data-mix="${m.k}">
       <span class="em">${m.em}</span><span>${m.label}</span><span class="n" data-n="${m.k}">0</span>
     </button>`).join('') +
    `<button class="cf-b cf-serve" type="button" data-serve="1">เสิร์ฟ ↵</button>`;
  stage.appendChild(bar);

  const onBar = e => {
    const b = e.target.closest('button');
    if(!b || S.over) return;
    if(b.dataset.serve) return serve();
    const k = b.dataset.mix;
    if(k) addMix(k);
  };
  bar.addEventListener('click', onBar);

  function addMix(k){
    if(S.phase !== 'mix') return;
    S.add[k] = S.add[k] >= 3 ? 0 : S.add[k] + 1;   /* กดวนกลับ 0 ถ้าใส่เกิน */
    paintBar();
  }

  function paintBar(){
    const live = S.phase === 'mix' && !S.over;
    bar.querySelectorAll('button').forEach(b => { b.disabled = !live; });
    GM_COFFEE_MIX.forEach(m => {
      const el = bar.querySelector(`[data-n="${m.k}"]`);
      if(el) el.textContent = S.add[m.k];
      const btn = bar.querySelector(`[data-mix="${m.k}"]`);
      if(btn) btn.classList.toggle('on', S.add[m.k] > 0);
    });
  }

  function nextCup(){
    if(S.n >= CUPS){
      S.over = true; paintBar();
      setTimeout(() => gmResult(stage, 'coffee', {score:S.stars},
        `<span class="mono">เสิร์ฟครบ ${CUPS} แก้ว · ได้ ${S.stars} ดาวจาก ${CUPS*5} · 5 ดาวเต็ม ${S.full} แก้ว</span>`), 300);
      return;
    }
    S.who = ids.length ? gmPick(ids) : 'claudy';
    gmImg(S.who);                                   /* เริ่มโหลดรูปทันที จะได้ไม่วืบ */
    /* แถบกาแฟแคบลงเรื่อย ๆ ตามจำนวนแก้วที่ผ่านมา */
    const band = 0.20 - Math.min(0.09, S.n * 0.010);
    S.lo = 0.30 + Math.random() * (0.62 - band - 0.30);
    S.hi = S.lo + band;
    /* ออเดอร์ส่วนผสม — 60% สั่งตามสูตรประจำตัว ที่เหลือสั่งนอกสูตร */
    const t = GM_COFFEE_TASTE[S.who];
    if(t && Math.random() < 0.6){
      S.need = {milk:t.milk, sugar:t.sugar, cream:t.cream};
    }else{
      S.need = {milk:(Math.random()*3)|0, sugar:(Math.random()*3)|0, cream:(Math.random()*2)|0};
    }
    S.add = {milk:0, sugar:0, cream:0};
    S.fill = 0; S.phase = 'pour'; S.msg = ''; S.say = ''; S.rate = 0;
    paintBar();
  }
  nextCup();

  /* ให้ดาว — เริ่มที่ 5 แล้วหักตามความคลาดเคลื่อน */
  function rate(){
    let st = 5;
    const band = S.hi - S.lo;
    const off = S.fill > S.hi ? S.fill - S.hi : (S.fill < S.lo ? S.lo - S.fill : 0);
    if(off > 0) st -= off > band * 0.8 ? 3 : 1;
    let miss = 0;
    GM_COFFEE_MIX.forEach(m => { miss += Math.abs(S.add[m.k] - S.need[m.k]); });
    st -= Math.min(3, miss);
    return gmClamp(st, 1, 5);
  }

  function serve(){
    if(S.phase !== 'mix' || S.over) return;
    S.rate = rate();
    S.stars += S.rate;
    if(S.rate === 5) S.full++;
    S.say = gmPick(GM_COFFEE_SAY[S.rate]);
    S.msg = S.rate >= 4 ? 'ถูกใจ!' : (S.rate === 3 ? 'พอไหว' : 'ไม่ตรงเลย');
    S.n++;
    S.phase = 'wait'; S.t = 0;
    paintBar();
  }

  /* ปล่อยมือจากการริน = จบจังหวะรินแล้วไปใส่ส่วนผสม */
  function stopPour(){
    if(S.phase !== 'pour') return;
    S.pouring = false;
    if(S.fill <= 0) return;          /* ยังไม่ได้รินอะไรเลย ให้รินต่อได้ */
    S.phase = 'mix';
    paintBar();
  }

  let pid = null;
  const down = e => {
    if(S.over || S.phase !== 'pour') return;
    e.preventDefault();
    pid = e.pointerId;
    try{ cv.setPointerCapture(pid); }catch(err){}
    S.pouring = true;
  };
  const up = e => {
    if(pid === null || (e.pointerId != null && e.pointerId !== pid)) return;
    e.preventDefault();
    try{ cv.releasePointerCapture(pid); }catch(err){}
    pid = null;
    stopPour();
  };
  cv.addEventListener('pointerdown', down);
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointercancel', up);

  const kd = e => {
    if(S.over) return;
    if(e.key === ' ' && S.phase === 'pour' && !S.pouring){ S.pouring = true; return; }
    if(S.phase !== 'mix') return;
    if(e.key === 'Enter'){ serve(); return; }
    const m = GM_COFFEE_MIX.find(x => x.key === e.key);
    if(m) addMix(m.k);
  };
  const ku = e => { if(e.key === ' ' && S.pouring) stopPour(); };
  document.addEventListener('keydown', kd);
  document.addEventListener('keyup', ku);

  function step(dt){
    S.t += dt;
    if(S.phase === 'pour' && S.pouring){
      S.fill = Math.min(1.25, S.fill + dt * 0.42);
      if(S.fill >= 1.25) stopPour();          /* ล้นสุดแก้ว บังคับไปจังหวะถัดไป */
    }
    if(S.phase === 'wait' && S.t > 2.1) nextCup();
    draw();
  }

  /* ---- วาด ---- */
  const CF_TH = '"Noto Sans Thai",sans-serif';

  /* รูปคนสั่ง — ถ้าสไปรท์ยังโหลดไม่เสร็จ วาดวงกลมพร้อมอักษรย่อไปก่อน */
  function drawWho(x, baseY, h){
    if(gmDrawFig(ctx, S.who, x, baseY, h, false)) return;
    const r = h * 0.24;
    ctx.fillStyle = 'rgba(255,255,255,.13)';
    ctx.beginPath(); ctx.arc(x, baseY - r - 6, r, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.6)';
    ctx.font = `600 ${Math.round(r)}px ${CF_TH}`; ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(gmName(S.who).slice(0,2), x, baseY - r - 6);
    ctx.textBaseline = 'alphabetic';
  }

  function draw(){
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0, '#33302B'); g.addColorStop(1, '#22201D');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

    const cl = CX - CW/2, cr = CX + CW/2, cb = CTOP + CH;
    const yOf = f => cb - CH * gmClamp(f, 0, 1);

    /* คนที่มาสั่ง — ยืนซ้ายมือ พร้อมออเดอร์ */
    if(S.who){
      drawWho(96, cb + 20, 116);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,255,255,.9)';
      ctx.font = `600 13px ${CF_TH}`;
      ctx.fillText(gmName(S.who), 96, cb + 42);

      /* บับเบิลออเดอร์ / คำติชม */
      const t = GM_COFFEE_TASTE[S.who];
      ctx.font = `400 12px ${CF_TH}`;
      ctx.fillStyle = 'rgba(255,255,255,.66)';
      ctx.fillText(S.say ? `"${S.say}"` : `"${t ? t.say : 'อะไรก็ได้'}"`, 150, 44);

      /* รายการส่วนผสมที่สั่ง — โชว์ไว้ตลอด ไม่ต้องจำ */
      if(S.phase !== 'wait'){
        const want = GM_COFFEE_MIX.filter(m => S.need[m.k] > 0)
                                  .map(m => `${m.em}×${S.need[m.k]}`).join('  ');
        ctx.font = `500 13px ${CF_TH}`;
        ctx.fillStyle = 'rgba(255,255,255,.82)';
        ctx.fillText(want || 'ไม่ใส่อะไรเลย', 150, 68);
      }
    }

    /* แก้ว */
    ctx.fillStyle = 'rgba(255,255,255,.07)';
    ctx.beginPath(); ctx.roundRect(cl, CTOP, CW, CH, [6,6,16,16]); ctx.fill();
    /* แถบเป้าหมายของกาแฟ */
    ctx.fillStyle = 'rgba(154,187,166,.3)';
    ctx.fillRect(cl, yOf(S.hi), CW, yOf(S.lo) - yOf(S.hi));
    ctx.strokeStyle = 'rgba(154,187,166,.85)'; ctx.lineWidth = 2;
    [S.lo, S.hi].forEach(f => {
      ctx.beginPath(); ctx.moveTo(cl, yOf(f)); ctx.lineTo(cr, yOf(f)); ctx.stroke();
    });

    /* ของเหลวในแก้ว — กาแฟ + นม (จางลง) + น้ำตาลก้นแก้ว + ครีมลอยหน้า */
    const fy = yOf(S.fill), top = Math.max(CTOP, fy);
    ctx.save();
    ctx.beginPath(); ctx.roundRect(cl+3, CTOP+3, CW-6, CH-6, [4,4,14,14]); ctx.clip();
    const cg = ctx.createLinearGradient(0, fy, 0, cb);
    cg.addColorStop(0, '#7B5230'); cg.addColorStop(1, '#4A2F1B');
    ctx.fillStyle = cg;
    ctx.fillRect(cl, top, CW, cb - top);
    if(S.add.milk){
      ctx.fillStyle = `rgba(233,220,198,${0.17 * S.add.milk})`;
      ctx.fillRect(cl, top, CW, cb - top);
    }
    if(S.add.sugar){
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      for(let i=0;i<S.add.sugar*4;i++){
        const x = cl + 14 + ((i*29) % (CW-28)), y = cb - 8 - (i%3)*7;
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI*2); ctx.fill();
      }
    }
    if(S.fill > 0){
      if(S.add.cream){
        ctx.fillStyle = 'rgba(250,242,228,.92)';
        ctx.fillRect(cl, top, CW, 9 + S.add.cream * 5);
      }else{
        ctx.fillStyle = 'rgba(214,186,150,.65)';
        ctx.fillRect(cl, top, CW, 5);
      }
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,.34)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(cl, CTOP, CW, CH, [6,6,16,16]); ctx.stroke();
    /* หูแก้ว */
    ctx.beginPath(); ctx.arc(cr + 16, CTOP + CH*0.42, 20, -Math.PI/2.1, Math.PI/2.1); ctx.stroke();

    /* สายน้ำตอนริน */
    if(S.pouring){
      ctx.fillStyle = 'rgba(140,96,58,.85)';
      ctx.fillRect(CX - 5, 42, 10, Math.max(0, fy - 42));
    }
    /* หัวเครื่องชง */
    ctx.fillStyle = '#4A4744';
    ctx.beginPath(); ctx.roundRect(CX - 42, 16, 84, 28, 7); ctx.fill();
    ctx.fillStyle = '#2E2C2A';
    ctx.beginPath(); ctx.roundRect(CX - 9, 42, 18, 10, 3); ctx.fill();

    /* ข้อความใต้แก้ว */
    ctx.textAlign = 'center';
    if(S.phase === 'wait'){
      ctx.fillStyle = S.rate >= 4 ? '#B7D8BE' : (S.rate === 3 ? '#DFD3AE' : '#E8BDB0');
      ctx.font = `600 26px ${CF_TH}`;
      ctx.fillText('★'.repeat(S.rate) + '☆'.repeat(5 - S.rate), CX, cb + 46);
      ctx.font = `600 14px ${CF_TH}`;
      ctx.fillText(S.msg, CX, cb + 68);
    }else if(S.phase === 'mix'){
      ctx.fillStyle = 'rgba(255,255,255,.62)';
      ctx.font = `400 13px ${CF_TH}`;
      ctx.fillText('ใส่ส่วนผสมให้ครบ แล้วกดเสิร์ฟ', CX, cb + 50);
    }else if(!S.pouring && S.fill === 0){
      ctx.fillStyle = 'rgba(255,255,255,.6)';
      ctx.font = `400 13px ${CF_TH}`;
      ctx.fillText('กดค้างที่แก้วเพื่อริน · ปล่อยเมื่อถึงแถบ', CX, cb + 50);
    }

    hud.innerHTML = `<span class="mono">แก้วที่ <b>${Math.min(S.n+1, CUPS)}</b>/${CUPS}</span>
      <span class="gm-hud-mid mono">★ ${S.stars}</span>
      <span class="mono">${S.phase === 'mix' ? 'ใส่ส่วนผสมแล้วเสิร์ฟ'
        : (S.phase === 'wait' ? `ได้ ${S.rate} ดาว` : 'กดค้าง = ริน')}</span>`;
  }

  const stop = gmLoop(step);
  return () => {
    stop();
    bar.removeEventListener('click', onBar);
    cv.removeEventListener('pointerdown', down);
    cv.removeEventListener('pointerup', up);
    cv.removeEventListener('pointercancel', up);
    document.removeEventListener('keydown', kd);
    document.removeEventListener('keyup', ku);
  };
}

/* =====================================================================
   เกม 8 — 🧱 ทุบอิฐ (ในตู้เกมห้องเกม)
   ===================================================================== */
function gmBreakout(stage){
  const W = 640, H = 430;
  const {cv, ctx} = gmCanvas(stage, W, H);
  const hud = gmHud(stage);
  const COLS = 10, ROWS = 5, BW = 56, BH = 20, BGAP = 6;
  const OFFX = (W - (COLS*(BW+BGAP) - BGAP))/2, OFFY = 54;
  const PADW = 96, PADH = 12, PADY = H - 34;
  const COLORS = ['#C9707A','#D19A62','#CDBE6B','#84B08C','#7B9EC4'];

  const bricks = [];
  for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++)
    bricks.push({x:OFFX + c*(BW+BGAP), y:OFFY + r*(BH+BGAP), c:COLORS[r], alive:true});

  const S = {px:W/2, bx:W/2, by:PADY-40, vx:190, vy:-250, lives:3, hit:0, over:false, stuck:true};

  const onMove = e => { S.px = gmClamp(gmPos(cv,e).x, PADW/2, W-PADW/2); };
  const onTap  = e => { e.preventDefault(); S.stuck = false; };
  cv.addEventListener('pointermove', onMove);
  cv.addEventListener('pointerdown', onTap);
  const kd = e => { if(e.key === ' ') S.stuck = false; };
  document.addEventListener('keydown', kd);

  function reset(){
    S.bx = S.px; S.by = PADY - 40;
    S.vx = (Math.random() < 0.5 ? -1 : 1) * 190; S.vy = -250;
    S.stuck = true;
  }
  function end(){
    S.over = true;
    setTimeout(() => gmResult(stage, 'breakout', {score:S.hit},
      `<span class="mono">ทุบได้ ${S.hit} จาก ${ROWS*COLS} ก้อน</span>`), 300);
  }

  function step(dt){
    if(S.over) return draw();
    if(S.stuck){ S.bx = S.px; S.by = PADY - 40; return draw(); }

    S.bx += S.vx*dt; S.by += S.vy*dt;
    if(S.bx < 9){ S.bx = 9; S.vx = Math.abs(S.vx); }
    if(S.bx > W-9){ S.bx = W-9; S.vx = -Math.abs(S.vx); }
    if(S.by < 9){ S.by = 9; S.vy = Math.abs(S.vy); }

    /* แป้น — มุมสะท้อนขึ้นกับว่าโดนตรงไหนของแป้น */
    if(S.by > PADY - 9 && S.by < PADY + PADH && S.vy > 0
       && S.bx > S.px - PADW/2 - 6 && S.bx < S.px + PADW/2 + 6){
      S.by = PADY - 9;
      const rel = (S.bx - S.px) / (PADW/2);
      const sp = Math.min(430, Math.hypot(S.vx, S.vy) * 1.02);
      const ang = rel * 1.05;
      S.vx = sp * Math.sin(ang);
      S.vy = -sp * Math.cos(ang);
    }

    /* อิฐ */
    for(const b of bricks){
      if(!b.alive) continue;
      if(S.bx > b.x-8 && S.bx < b.x+BW+8 && S.by > b.y-8 && S.by < b.y+BH+8){
        b.alive = false; S.hit++;
        /* ชนด้านบน/ล่าง หรือด้านข้าง — ดูว่าทะลุเข้ามาทางไหนมากกว่า */
        const ox = Math.min(Math.abs(S.bx - b.x), Math.abs(S.bx - (b.x+BW)));
        const oy = Math.min(Math.abs(S.by - b.y), Math.abs(S.by - (b.y+BH)));
        if(oy < ox) S.vy = -S.vy; else S.vx = -S.vx;
        break;
      }
    }
    if(!bricks.some(b => b.alive)) return end();

    if(S.by > H + 12){
      S.lives--;
      if(S.lives <= 0) return end();
      reset();
    }
    draw();
  }

  function draw(){
    ctx.fillStyle = '#161C26'; ctx.fillRect(0,0,W,H);
    bricks.forEach(b => {
      if(!b.alive) return;
      ctx.fillStyle = b.c;
      ctx.beginPath(); ctx.roundRect(b.x, b.y, BW, BH, 4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.18)';
      ctx.fillRect(b.x+3, b.y+3, BW-6, 3);
    });
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#9A7B4F';
    ctx.beginPath(); ctx.roundRect(S.px - PADW/2, PADY, PADW, PADH, 6); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(S.bx, S.by, 8, 0, Math.PI*2); ctx.fill();
    if(S.stuck && !S.over){
      ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.textAlign = 'center';
      ctx.font = '600 15px "Noto Sans Thai",sans-serif';
      ctx.fillText('กดเพื่อปล่อยลูก', W/2, PADY - 70);
    }
    hud.innerHTML = `<span class="mono">ทุบได้ <b>${S.hit}</b></span>
      <span class="gm-hud-mid mono">${'●'.repeat(Math.max(0,S.lives))}</span>
      <span class="mono">เลื่อนเมาส์คุมแป้น</span>`;
  }

  const stop = gmLoop(step);
  return () => {
    stop();
    cv.removeEventListener('pointermove', onMove);
    cv.removeEventListener('pointerdown', onTap);
    document.removeEventListener('keydown', kd);
  };
}

const GM_GAMES = {pingpong:gmPingpong, football:gmFootball, fishing:gmFishing,
                  snake:gmSnake, tetris:gmTetris, sudoku:gmSudoku,
                  coffee:gmCoffee, breakout:gmBreakout};

/* =====================================================================
   เมนูเลือกเกม — ใช้ตอนของชิ้นเดียวมีหลายเกม (PS5 มีทั้งงูกับเตตริส)
   ===================================================================== */
function gmOpenMenu(keys, title, sub){
  gmClose();
  const el = gmShell();
  document.getElementById('gmBarEm').textContent = '🎮';
  document.getElementById('gmBarNm').textContent = title || 'เลือกเกม';
  document.getElementById('gmBarVs').textContent = sub || '';
  document.getElementById('gmFoot').innerHTML = `<span class="gm-how">กดเลือกเกมที่อยากเล่น</span>`;
  el.classList.add('on');
  document.body.style.overflow = 'hidden';
  if(typeof ofcPause === 'function') ofcPause();

  const stage = document.getElementById('gmStage');
  stage.innerHTML = `<div class="gm-menu">${keys.map(k => {
    /* รายการที่เป็นลิงก์ออกนอกเว็บ เขียนเป็น object แทนคีย์เกม */
    if(typeof k === 'object'){
      return `<a class="gm-menu-b" href="${k.url}" target="_blank" rel="noopener">
        <span class="em">${k.emoji}</span>
        <span class="nm">${gmEsc(k.label)}</span>
        <span class="ch"><span class="none">${gmEsc(k.note || 'เปิดในแท็บใหม่')}</span></span>
      </a>`;
    }
    const d = GM_DEFS[k], g = GM[k] || {};
    const champ = g.champion
      ? `${gmFace(g.champion,'gm-av')} <span>${gmEsc(gmName(g.champion))} · ${g.best?.score ?? 0} ${d.unit}</span>`
      : `<span class="none">ยังไม่มีใครเล่น</span>`;
    return `<button class="gm-menu-b" type="button" onclick="gmOpen('${k}')">
      <span class="em">${d.emoji}</span>
      <span class="nm">${gmEsc(d.label)}</span>
      <span class="ch">${champ}</span>
    </button>`;
  }).join('')}</div>`;
  document.addEventListener('keydown', gmKey);
  GM_CUR = {key:null, stop:()=>{}};
}


/* =====================================================================
   ต่อของในผังให้กดเล่นเกมได้ — โต๊ะปิงปอง · ตู้ปลา · โกล
   เรียกหลัง ofcBuildActors() ทุกครั้ง เพราะของถูกสร้างใหม่หมด
   ใช้ addEventListener ไม่ทับ onclick เดิม — ตู้ปลายังเรียกน้องส้มมาดูปลาได้เหมือนเดิม
   ===================================================================== */
function gmTap(el, key){
  if(!el || el.dataset.gm) return;
  el.dataset.gm = key;
  el.classList.add('gm-tap');
  el.title = `${GM_DEFS[key].emoji} เล่น${GM_DEFS[key].label}`;
  el.addEventListener('click', () => gmOpen(key));
}

/* ของที่เปิดเมนูหลายเกม (PS5) — ผูก handler เองแทนที่จะยิงเข้าเกมเดียว */
function gmTapFn(el, tag, title, fn){
  if(!el || el.dataset.gm) return;
  el.dataset.gm = tag;
  el.classList.add('gm-tap');
  el.title = title;
  el.addEventListener('click', fn);
}

const GM_RUSHEXIT = {label:'RushExit', emoji:'🚪', url:'https://hellopae.github.io/RushExit/',
                     note:'เกมของ PAE · เปิดแท็บใหม่'};

function gmAttachOffice(){
  gmTap(document.getElementById('ofcPP'),     'pingpong');
  gmTap(document.querySelector('.ofc-tank'),  'fishing');
  gmTap(document.getElementById('ofcGoal'),   'football');
  gmTap(document.getElementById('ofcSudoku'), 'sudoku');
  gmTap(document.getElementById('ofcCoffee'), 'coffee');
  /* ตู้เกมในห้องเกม — ทุบอิฐ + ลิงก์ไป RushExit */
  gmTapFn(document.getElementById('ofcArcade'), 'arcade', '🕹️ ตู้เกม',
    () => gmOpenMenu(['breakout', GM_RUSHEXIT], 'ตู้เกม', 'ห้องเกม'));
  /* เครื่องเกมมี 2 เกม — เปิดเมนูให้เลือก
     ตัวเครื่องเล็กมาก (2.2cqw) เลยให้กดที่จอทีวีได้ด้วย จะได้เล็งง่ายขึ้น */
  const menu = () => gmOpenMenu(['snake','tetris'], 'เครื่องเกม', 'ห้องเกม · เลือกได้ 2 เกม');
  gmTapFn(document.querySelector('.ofc-ps5'), 'ps5', '🎮 เล่นเกมบนเครื่อง', menu);
  const tv = document.getElementById('ofcTV');
  if(tv){ tv.style.pointerEvents = 'auto'; gmTapFn(tv, 'tv', '🎮 เล่นเกมบนเครื่อง', menu); }
}

/* ---------- boot ---------- */
gmLoadLocal();
document.addEventListener('DOMContentLoaded', () => { gmRenderBoard(); gmAttachOffice(); });
