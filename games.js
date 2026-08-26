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
};

/* ค่าตั้งต้นก่อนที่ Firestore จะตอบ — agent เจ้าถิ่นถือแชมป์ไว้ก่อน */
const gmBlank = () => ({
  pingpong: {champion:'toby', streak:0, best:{who:'toby', score:5},  vsPae:{win:0, lose:0}, lastPlayed:null},
  football: {champion:'dale', streak:0, best:{who:'dale', score:0},  vsPae:{win:0, lose:0}, lastPlayed:null},
  fishing:  {champion:null,   streak:0, best:{who:null,  score:0},   vsPae:{win:0, lose:0}, lastPlayed:null},
});

let GM = gmBlank();
const GM_LS = 'agapae.games';

/* รูปที่เอาไปวาดบน canvas — เป้ใช้รูปโปรไฟล์ ตัดวงกลม · agent ใช้สไปรท์ SD ตัวเดียวกับในผัง */
const GM_ART = {
  pae:  'avatars/Pae.png',
  toby: 'office/sprites/toby.png',
  dale: 'office/sprites/dale.png',
};
const GM_IMG = {};
function gmImg(key){
  if(!GM_IMG[key]){ const i = new Image(); i.src = GM_ART[key]; GM_IMG[key] = i; }
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

/* วาดรูปเป้เป็นวงกลม */
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
const gmName    = id => id === 'pae' ? 'เป้' : (gmAgent(id)?.name || '—');
const gmEsc     = t => String(t ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const gmClamp   = (v, a, b) => v < a ? a : (v > b ? b : v);
const gmPick    = a => a[Math.floor(Math.random() * a.length)];

function gmFace(id, cls){
  if(id === 'pae') return `<span class="${cls} gm-pae">เป้</span>`;
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
      `<span class="gm-vs mono">เป้ ${g.vsPae?.win ?? 0}–${g.vsPae?.lose ?? 0}</span>`;
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
      <span class="gm-sub">กดปุ่มเล่นเพื่อท้าชิง — หรือกดที่โต๊ะปิงปอง ตู้ปลา และโกลในผังก็ได้</span>
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
        `<span class="mono">เป้ ${S.my} — ${S.ay} Toby</span>`), 420);
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
    const pY = gmClamp(S.me, 34, H-34);
    gmDrawPae(ctx, 62, pY, 23);
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
    hud.innerHTML = `<span class="mono">เป้ <b>${S.my}</b></span>
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

const GM_GAMES = {pingpong:gmPingpong, football:gmFootball, fishing:gmFishing};

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

function gmAttachOffice(){
  gmTap(document.getElementById('ofcPP'),   'pingpong');
  gmTap(document.querySelector('.ofc-tank'), 'fishing');
  gmTap(document.getElementById('ofcGoal'), 'football');
}

/* ---------- boot ---------- */
gmLoadLocal();
document.addEventListener('DOMContentLoaded', () => { gmRenderBoard(); gmAttachOffice(); });
