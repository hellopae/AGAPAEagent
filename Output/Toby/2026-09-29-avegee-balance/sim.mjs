// AVEGEE batch 20 — headless balance simulation (analysis only; does NOT write into the AVEGEE repo)
// Usage: node sim.mjs [seeds=30] [maxTicks=14000]
// Loads the REAL game module (src/game.js @ main d4c846f), drives it with two bot "players".
// Sim clock: 1 tick = BAL.tickMs (700 ms). Date.now() is stubbed to the sim clock so that
// transit/build/cooldown timers (which use Date.now in game.js) behave like real time.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = process.env.SRC_DIR || '/Users/agapae/Documents/Work PAE/Claude/AVEGEE/src/';
const TAG = process.env.OUT_TAG || '';
const OUT = path.dirname(fileURLToPath(import.meta.url));
globalThis.Image = class {};
let NOW = 1_800_000_000_000;
Date.now = () => NOW;

const { createGame } = await import(SRC + 'game.js');
const D = await import(SRC + 'data.js');
const { BAL, STATIONS, ZONES, MOB, GUARD, LEVELS, BATTLE, MERCHANT, UPGRADES } = D;

const SEEDS = Number(process.argv[2] || 30);
const MAXT = Number(process.argv[3] || 14000);

function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// ---------------- bot profiles ----------------
const PROFILES = {
  careful: {
    name: 'careful', acc: 0.85, thinkTicks: 6, buildProb: 1, buildReserve: 80, foodBelow: 30, foodBuy: 2,
    fightMobs: true, mobHpMin: 40, healBelow: 40, feedHunger: 30, hireQueue: 3, guardAt: 700,
    prepBoss: true, processSentences: 1.0, upgradeSurplus: 500,
    buildOrder: ['dab', 'ngiw', 'lan', 'lokan', 'sawan', 'tea', 'tarang'],
    trialSec: 22, verdictSec: 5, patience: 90, pickupProb: 0.5, repairProb: 0.5, learnBoss: true, useParty: true, bossCooldown: 60, bossHpFrac: 0.58, bossCoin: 300,
  },
  sloppy: {
    name: 'sloppy', acc: 0.60, thinkTicks: 2, buildProb: 0.04, buildReserve: 200, foodBelow: 6, foodBuy: 1,
    fightMobs: false, mobHpMin: 60, healBelow: 22, feedHunger: -1, hireQueue: 5, guardAt: 1200,
    prepBoss: false, processSentences: 0.25, upgradeSurplus: 1e9,
    buildOrder: ['dab', 'ngiw', 'lan', 'lokan', 'sawan', 'tea'],
    trialSec: 4, verdictSec: 3, patience: 25, pickupProb: 0.12, repairProb: 0.05, learnBoss: false, useParty: false, bossCooldown: 40, bossHpFrac: 0.5, bossCoin: 120,
  },
};

PROFILES.perfect = { ...PROFILES.careful, name: 'perfect', acc: 1.0 };
PROFILES.minimal = { ...PROFILES.careful, name: 'minimal', buildOrder: [], hireQueue: 99, upgradeSurplus: 1e9 };  // only krata per zone, never expands
const HIRE_ORDER = ['dam', 'plerng', 'kan', 'boon'];
const pickR = (R, arr) => arr[Math.floor(R() * arr.length)];

function run(P, seed) {
  const R = rng(seed);
  Math.random = R;
  NOW = 1_800_000_000_000;
  const g = createGame();
  g.save = () => true;
  g.onChange = () => {};
  // coin attribution by caller function name
  let coin = g.coin;
  const flow = {};   // reason -> {in, out}
  const flowWin = {};
  Object.defineProperty(g, 'coin', {
    configurable: true, enumerable: true,
    get() { return coin; },
    set(v) {
      const d = v - coin; coin = v;
      if (!d) return;
      const st = new Error().stack.split('\n');
      let name = 'unknown';
      for (let i = 2; i < st.length; i++) { const m = st[i].match(/at (?:async )?(?:Object\.|Function\.)?([\w$]+)/); if (m && m[1] !== 'set' && m[1] !== 'eval') { name = m[1]; break; } }
      const f = flow[name] ||= { in: 0, out: 0, n: 0 };
      if (d > 0) f.in += d; else f.out -= d; f.n++;
      const w = Math.floor((g.tick || 0) / 430);   // 430 ticks ~= 5 min
      const fw = (flowWin[w] ||= {}); const e = (fw[name] ||= { in: 0, out: 0 });
      if (d > 0) e.in += d; else e.out -= d;
    },
  });

  // Real-game defect: judge() divides by total deed weight; case 'hammer' (net weight 0) => NaN score/coin/order.
  // For the balance runs we patch that ONE case so the rest of the game can be measured; the unpatched behaviour
  // is measured separately (sim-results-unpatched-nan.json + nanCount below).
  const origJudge = g.judge.bind(g);
  let nanCount = 0;
  g.judge = function (st, slot) {
    const r = origJudge(st, slot);
    if (Number.isFinite(r.score) && !slot.__counted) { slot.__counted = 1; const A = (M.comp ||= { n: 0, tham: 0, ked: 0, rab: 0, score: 0, karma: 0, queueAtJudge: 0, ex: 0 }); A.n++; A.tham += r.tham; A.ked += r.ked; A.rab += r.rab; A.score += r.score; A.karma += r.karma; A.queueAtJudge += g.queue.length; }
    if (!Number.isFinite(r.score)) {
      nanCount++;
      const soul = slot.soul;
      const hit = soul.deeds.some(d => st.def.tags.includes(d.s));
      r.tham = hit ? 100 : 0;
      r.score = Math.round(0.50 * r.tham + 0.33 * r.ked + 0.17 * r.rab);
      r.coin = Math.round(BAL.coinPerCase * (r.score / 100) * (0.7 + soul.deserved * 0.12) * this.orderTier().coin);
    }
    return r;
  };
  const M = {   // metrics
    seed, profile: P.name, levelAt: {}, zoneEnter: { th: 0 }, bossReadyAt: {}, bossTryAt: {}, bossWinAt: {}, bossTries: {}, bossCoinSpent: {},
    negCoinTicks: 0, minCoin: coin, orderTier: [0, 0, 0, 0], orderWarns: 0, dadFights: 0, maxQueue: 0, queueSum: 0, idleTicks: 0, ticks: 0,
    ticksQueueGE6: 0, verdicts: 0, scoreHist: [0, 0, 0, 0, 0, 0], greens: 0, cases: 0, coinPerCaseSamples: [],
    battles: { soul: 0, soulLost: 0, mob: 0, boss: 0, bossLost: 0 }, over: null, series: [], firstBuildAt: {}, hireAt: {}, guardAt: null,
    modalSec: 0, kpiPassAt: [], mobsSpawned: 0, mobsKilledGuard: 0, foodBought: 0, foodEmptyTicks: 0, hungerZero: 0,
  };
  let busy = 0;           // ticks until bot may act on queue again
  let prevCases = 0;
  let mobsSeen = new Set();

  const advance = ms => { NOW += ms; };

  function resolveBattle() {
    let guardT = 0;
    const B0 = g.battle; if (!B0) return;
    const kind = B0.kind;
    if (kind === 'soul') M.battles.soul++; else if (kind === 'mob') M.battles.mob++; else if (kind === 'zoneBoss') M.battles.boss++;
    if (kind === 'zoneBoss') { M.bossCoinSpent[B0.zone] = M.bossCoinSpent[B0.zone] || 0; }
    const coin0 = coin;
    if (kind === 'zoneBoss') g.startBossFight();
    while (g.battle && !g.battle.over && guardT++ < 300) {
      const B = g.battle;
      advance(3000); M.modalSec += 3;
      if (kind === 'dad' || kind === 'yama') { g.battleAct('atk'); break; }
      const low = B.youHp < P.healBelow;
      if (low && coin >= 45 && g.battleAct('health')) continue;
      if (low && coin >= 22 && g.battleAct('tea')) continue;
      // crew helpers (party of up to 2; unlocked at level>=CREW_HELP_LV)
      if (P.useParty && g.canCallCrew()) {
        let used = false;
        for (const c of g.battleCrew()) { if (!g.crewHelpWhy(c) && g.battleAct('crew:' + c.k)) { used = true; break; } }
        if (used) continue;
      }
      if (g.guard && !g.guardHelpWhy() && g.battleAct('guard')) continue;
      if (g.fireAmmo > 0 && (kind === 'zoneBoss' || B.foeHp > 30) && g.battleAct('fire')) continue;
      const ice = g.powerOf('ice');
      if (kind === 'zoneBoss' && ice && !g.powerLocked(ice) && ice.ammo > 0 && B.stun === 0 && g.battleAct('ice')) continue;
      g.battleAct('atk');
    }
    const B = g.battle;
    if (B) {
      if (kind === 'soul' && B.over === 'lose') M.battles.soulLost++;
      if (kind === 'zoneBoss') { M.bossCoinSpent[B.zone] += Math.max(0, coin0 - coin); if (B.over === 'lose') M.battles.bossLost++; }
      g.endBattle();
    }
  }

  function processSentences() {
    for (const x of [...g.sentences]) {
      if (x.zone !== g.zone) continue;
      if (R() > P.processSentences) continue;
      if (x.stage === 'prison') {
        if (!x.inspected) g.inspectPrison(x.soul.id);
        else g.moveFromPrison(x.soul.id);
      } else if (x.stage === 'gate') {
        if (!x.checked) g.inspectGate(x.soul.id); else g.resolveGate(x.soul.id);
      }
    }
  }

  function freeCrewFor(st) {
    if (st.slots.length) { const c = g.crewOf(st.crewK); return c && !c.escort ? c : null; }
    const cands = g.crew.filter(c => !c.reader && !c.self && !c.escort && (!c.at || c.at === st.def.k) && !c.buildK);
    if (!cands.length) return null;
    const sc = c => c.rabiab + c.metta * 0.5 + c.panya * 0.3 - (c.k === 'plerng' ? 3 : 0);
    cands.sort((a, b) => sc(b) - sc(a));
    return cands[0];
  }

  function dispatch() {
    const soul = g.queue[0];
    if (!soul) return false;
    // resist -> must fight first
    if (g.needBattle(soul)) {
      g.startBattle(soul); resolveBattle();
      if (!soul.beaten) { g.defer(); busy = 2; return true; }
    }
    const avail = g.stations.filter(st => !st.build && !st.repair && st.def.pow > 0 && st.def.k !== 'sala' && g.stFree(st) > 0 && st.fire < MOB.burnMax && freeCrewFor(st));
    if (!avail.length) { if (g.queue.length > 1 && R() < 0.5) g.defer(); return false; }
    let pool = avail;
    const w = st => {
      if (st.def.heaven) return soul.pure ? 1 : 0;
      if (soul.pure) return 0;
      const tot = soul.deeds.reduce((s, d) => s + d.w, 0) || 1;
      return soul.deeds.filter(d => st.def.tags.includes(d.s)).reduce((s, d) => s + d.w, 0) / tot;
    };
    const ranked = [...pool].sort((a, b) => w(b) - w(a));
    let st = ranked[0];
    {   // why is the right station not the one we can use? (instrumentation)
      const all = g.stations.filter(x => x.def.pow > 0 && x.def.k !== 'sala' && !x.build);
      const best = [...all].sort((a, b) => w(b) - w(a))[0];
      if (best && w(best) > 0 && !avail.includes(best)) {
        const why = best.fire >= MOB.burnMax || best.repair ? 'burnt' : g.stFree(best) <= 0 ? 'full' : 'crew-escorting/busy';
        (M.blocked ||= {})[why] = (M.blocked[why] || 0) + 1;
      }
    }
    let inten = soul.deserved || 1;
    if (soul.pure && !st.def.heaven) {           // no gate available: bot must wait or shove somewhere
      if (g.queue.length > 1) { g.defer(); return false; }
    }
    if (w(st) === 0 && !soul.pure && g.queue.length > 1 && soul.waited < P.patience) { g.defer(); return false; }  // hold for right station
    const ok = R() < P.acc;
    if (!ok) {
      if (R() < 0.7 || pool.length < 2) { const e = pickR(R, [-1, -1, -1, 1, 1, -2, 2]); inten = Math.max(1, Math.min(5, inten + e)); }
      else st = pickR(R, pool);
    }
    const c = freeCrewFor(st);
    if (!c) return false;
    const before = g.casesDone;
    if (!g.assign(soul.id, st.def.k, c.k, inten)) return false;
    M.verdicts++; (M.waitAtAssign ||= []).push(soul.waited);
    { const vv = st.slots.at(-1)?.verdict; if (vv && (!Number.isFinite(vv.score) || !Number.isFinite(vv.coin))) { M.nanVerdict ??= { tick: g.tick, zone: g.zone, station: st.def.k, crew: c.k, verdict: vv, soul: { case: soul.case, kind: soul.kind, pure: soul.pure, deserved: soul.deserved, deeds: soul.deeds, merits: soul.merits } }; } }
    // headless has no lava mask => straight-line paths; real detours ~20% longer
    const tr = g.transits.at(-1), slot = st.slots.at(-1);
    if (tr && slot) { const d = tr.arriveAt - NOW; tr.arriveAt = NOW + d * 1.2; slot.pendingUntil = tr.arriveAt; }
    return true;
  }

  function hireIfNeeded() {
    const free = g.crew.filter(c => !c.reader && !c.self && !c.at && !c.escort && !c.buildK).length;
    if (g.queue.length >= P.hireQueue && free === 0) {
      for (const k of HIRE_ORDER) {
        const def = D.CREW.find(c => c.k === k);
        if (!g.crew.some(c => c.k === k) && coin >= def.hire + P.buildReserve) { if (g.hire(k)) M.hireAt[`${g.zone}:${k}`] = g.tick; break; }
      }
    }
  }

  function buildIfNeeded() {
    if (R() > P.buildProb) return;
    const taan = g.crew.find(c => c.k === 'taan'); if (!taan || taan.buildK) return;
    if (g.stations.some(s => s.build)) return;
    const order = ['krata', ...P.buildOrder];
    for (const k of order) {
      if (g.has(k)) continue;
      const def = STATIONS.find(s => s.k === k);
      if (coin >= def.cost + P.buildReserve && g.build(k)) {
        M.firstBuildAt[`${g.zone}:${k}`] = g.tick;
        // headless walk is unreliable across zones: model builder travel explicitly (dist*1.3 at far speed 0.11 px/ms)
        const st = g.stations.find(x => x.def.k === k);
        const tx = taan.x ?? taan.hx, ty = taan.y ?? taan.hy;
        const travel = Math.hypot(def.x - tx, def.y - ty) * 1.3 / 0.11;
        st.buildWait = false; st.build = NOW + travel + D.BUILD_TIME;
        taan.x = def.x; taan.y = def.y; taan.path = null;
      }
      break;
    }
  }

  let lastBossTry = -999;
  function tryBoss() {
    if (g.battle || g.over) return;
    const z = g.zone;
    if (g.bossCleared[z]) return;
    if (!(g.bossReady() || g.bossGuarding[z])) return;
    M.bossReadyAt[z] ??= g.tick;
    // readiness rules (what a sensible player does before challenging)
    if (g.tick - lastBossTry < P.bossCooldown) return;
    if (g.has('tea') && P.prepBoss && g.hp < g.hpMax) { M.sitSec = (M.sitSec || 0) + (g.hpMax - g.hp) / BAL.hpRegenSit; g.hp = g.hpMax; }
    const hpOk = g.hp >= g.hpMax * P.bossHpFrac;
    const coinOk = coin >= P.bossCoin;
    if (!(hpOk && coinOk)) { M.bossWaitTicks = (M.bossWaitTicks || 0) + 1; return; }
    if (P.useParty && g.level >= D.CREW_HELP_LV) {
      g.party = { members: [], guard: false };
      const helpers = g.crewHelpers().sort((a, b) => (D.CREW_POWER[b.k]?.dmg || 0) - (D.CREW_POWER[a.k]?.dmg || 0));
      for (const c of helpers.slice(0, 2)) g.toggleParty(c.k);
    }
    if (P.prepBoss) while (g.fireAmmo < g.fireAmmoMax && coin > 200 && g.buyMerchant('fire')) {}
    lastBossTry = g.tick;
    M.bossTries[z] = (M.bossTries[z] || 0) + 1;
    M.bossTryAt[z] ??= g.tick;
    if (g.bossGuarding[z]) { g.player.x = 790; g.player.y = 558; g.startZoneBoss(true); }
    else g.startZoneBoss();
    if (g.battle) resolveBattle();
    if (g.bossCleared[z]) M.bossWinAt[z] = g.tick;
    else if (P.learnBoss) M.needPrep = true;
  }

  function prepForBoss() {
    // after a lost boss fight a careful player invests in helpers: 2 crew, then the guard
    const nonReader = g.crew.filter(c => !c.reader && !c.self).length;
    if (nonReader < 3) {
      for (const k of HIRE_ORDER) { const def = D.CREW.find(c => c.k === k); if (!g.crew.some(c => c.k === k) && coin >= def.hire + 50) { if (g.hire(k)) M.hireAt[`${g.zone}:${k}(prep)`] = g.tick; break; } }
    } else if (!g.guard && coin >= GUARD.hire + 50) { if (g.hireGuard()) M.guardAt ??= g.tick; }
  }

  function repairIfNeeded() {
    if (R() > P.repairProb) return;
    for (const st of g.stations) {
      if (st.fire > 0 && g.canRepair(st.def.k)) {
        if (g.repairStation(st.def.k)) {
          const taan = g.crew.find(c => c.k === 'taan');
          const tx = taan.x ?? taan.hx, ty = taan.y ?? taan.hy;
          st.repairWait = false; st.repair = NOW + Math.hypot(st.def.x - tx, st.def.y - ty) * 1.3 / 0.11 + D.REPAIR_TIME;
          taan.x = st.def.x; taan.y = st.def.y; taan.path = null;
          M.repairs = (M.repairs || 0) + 1;
        }
        break;
      }
    }
  }

  function tryMove() {
    if (g.over) return;
    const zi = ZONES.findIndex(x => x.k === g.zone);
    const next = ZONES[zi + 1];
    if (!next || !g.bossCleared[g.zone]) return;
    if (!g.canMoveZone(next.k)) return;
    if (g.moveZone(next.k)) {
      M.zoneEnter[next.k] = g.tick;
      g.courtClosed = false;
      g.crew.forEach(c => {});
      if (!g.crew.some(c => c.k === 'taan')) g.hire('taan');
    }
  }

  function snapshotRow() {
    M.series.push({ tick: g.tick, min: +(g.tick * 0.7 / 60).toFixed(2), zone: g.zone, coin: Math.round(coin), food: Math.round(g.food), order: Math.round(g.order), karma: +g.karma.toFixed(1),
      hp: Math.round(g.hp), level: g.level, greens: g.greens, cases: g.casesDone, queue: g.queue.length, stations: g.stations.length, crew: g.crew.length, kpi: g.kpiPassed, mobs: g.mobs.length });
  }

  g.courtClosed = false;
  const modalPerCase = P.trialSec + P.verdictSec;
  snapshotRow();

  for (let t = 0; t < MAXT && !g.over; t++) {
    // world sub-steps
    for (let s = 0; s < 5; s++) { advance(140); g.stepWorld(140); }
    g.advanceAfterlife(700);
    g.step();
    M.ticks++;
    // metrics
    M.queueSum += g.queue.length; M.maxQueue = Math.max(M.maxQueue, g.queue.length);
    if (g.queue.length >= 6) M.ticksQueueGE6++;
    if (coin < 0) M.negCoinTicks++;
    M.minCoin = Math.min(M.minCoin, coin);
    M.orderTier[ORDER_IDX(g.order)]++;
    if (g.food <= 0) M.foodEmptyTicks++;
    if (g.crew.some(c => (c.hunger ?? 100) <= 0)) M.hungerZero++;
    M.orderWarns = Math.max(M.orderWarns, g.orderWarns || 0);
    for (const m of g.mobs) if (!mobsSeen.has(m.id)) { mobsSeen.add(m.id); M.mobsSpawned++; }
    // level milestones
    if (!M.levelAt[g.level]) M.levelAt[g.level] = g.tick;
    for (let l = 2; l <= g.level; l++) M.levelAt[l] ??= g.tick;
    // new verdicts
    if (g.casesDone > prevCases) { M.modalSec += (g.casesDone - prevCases) * modalPerCase; prevCases = g.casesDone; }
    if (g.pendingKpi?.pass && !M.kpiPassAt.includes(g.kpiPassed) ) { M.kpiPassAt[g.kpiPassed - 1] = g.tick; }

    // dad fights
    if (g.dadFight && !g.battle) { M.dadFights++; g.startDadFight(); resolveBattle(); }
    if (g.battle) resolveBattle();
    if (g.over) break;

    // active decisions
    let acted = false;
    if (busy > 0) busy--;
    if (busy === 0 && g.queue.length && !g.courtClosed) {
      if (dispatch()) { busy = P.thinkTicks; acted = true; }
    }
    if (g.tick % 3 === 0) { const before = g.sentences.length; processSentences(); }
    // map pickups (free items dropped every ~18 ticks)
    if (g.items.length && R() < P.pickupProb) {
      const i = g.items.findIndex(it => !it.from);
      if (i >= 0) { const k = g.items[i].k; g.collectItem(i); M.pickups = (M.pickups || 0) + 1; M['pick_' + k] = (M['pick_' + k] || 0) + 1; }
    }
    if (g.inventory.health && g.hp < g.hpMax * 0.6) g.useBag('health');
    if (g.inventory.food && g.food < 20) g.useBag('food');
    // food
    if (g.food < P.foodBelow && coin >= 40 * P.foodBuy + 40) { if (g.buy('food', P.foodBuy)) { M.foodBought += P.foodBuy * 10; acted = true; } }
    if (P.feedHunger >= 0) for (const c of g.crew) if (!c.reader && !c.self && (c.hunger ?? 100) < P.feedHunger && g.food > 5) { g.feedCrew(c.k); }
    // mobs
    for (const m of g.mobs) m.age = (m.age ?? 0) + 1;
    if (g.guard) { const m = g.mobs[0]; if (m && m.age >= 14) { m.cool = 0; g.strike(0, 'guard'); if (!g.mobs.includes(m)) M.mobsKilledGuard++; } }
    if (g.mobs.length && !g.guard && P.fightMobs && !g.battle && g.hp >= P.mobHpMin && g.mobs[0].age >= 10) { g.startMobBattle(0); resolveBattle(); acted = true; }
    if (!g.guard && coin >= GUARD.hire + P.guardAt - 420 && g.zoneCases[g.zone] >= 5 && g.mobs.length) { if (g.hireGuard()) M.guardAt ??= g.tick; }
    // karma relief
    if (g.karma >= 40 && g.has('tea') && coin >= 200) g.buy('lotus');
    // morale not modeled; hp heal via merchant if low & rich
    if (g.hp < g.hpMax * 0.3 && coin >= 200 && !g.battle) { if (g.buyMerchant('health')) g.useBag('health'); }
    if (P.prepBoss && g.has('tea') && g.hp < g.hpMax * 0.45 && !g.battle) { M.sitSec = (M.sitSec || 0) + (g.hpMax - g.hp) / BAL.hpRegenSit; g.hp = g.hpMax; }
    hireIfNeeded();
    repairIfNeeded();
    buildIfNeeded();
    if (P.upgradeSurplus < 1e8 && coin > P.upgradeSurplus) { for (const c of g.crew) { if (!c.reader && g.upgradeCrew(c.k)) break; } }
    if (M.needPrep && !g.bossCleared[g.zone]) prepForBoss();
    if (g.bossCleared[g.zone]) M.needPrep = false;
    tryBoss();
    tryMove();
    if (g.tick % 30 === 0) snapshotRow();
    if (process.env.DBG && g.tick === Number(process.env.DBG)) { console.error(JSON.stringify({tick:g.tick,zone:g.zone,courtClosed:g.courtClosed,paused:g.paused,battle:!!g.battle,busy,q:g.queue.length,front:g.queue[0]&&{pure:g.queue[0].pure,resist:g.queue[0].resist,beaten:g.queue[0].beaten,deeds:g.queue[0].deeds.map(d=>d.s),case:g.queue[0].case},stations:g.stations.map(s=>({k:s.def.k,build:s.build,bw:s.buildWait,slots:s.slots.length,crewK:s.crewK,fire:s.fire,free:g.stFree(s)})),crew:g.crew.map(c=>({k:c.k,at:c.at,esc:c.escort,bk:c.buildK,x:c.x,y:c.y})),tags:g.activeTags()},null,1)); }
    if (!acted && !g.queue.length && !g.sentences.length && !g.mobs.length && !g.battle && !busy) M.idleTicks++;
  }
  snapshotRow();
  M.over = g.over ? g.over.k : 'timeout';
  M.endTick = g.tick; M.endMin = +(g.tick * 0.7 / 60).toFixed(1);
  M.finalCoin = Math.round(coin); M.finalLevel = g.level; M.greens = g.greens; M.cases = g.casesDone; M.karma = +g.karma.toFixed(1); M.kpiPassed = g.kpiPassed;
  M.bossCleared = { ...g.bossCleared }; M.flow = flow; M.flowWin = flowWin;
  M.avgScore = g.casesDone ? +(g.scoreSum / g.casesDone).toFixed(1) : 0;
  M.avgQueue = +(M.queueSum / Math.max(1, M.ticks)).toFixed(2);
  M.idlePct = +(100 * M.idleTicks / Math.max(1, M.ticks)).toFixed(1);
  M.ledgerStars = g.ledger.reduce((a, l) => (a[l.stars] = (a[l.stars] || 0) + 1, a), {});
  M.greenPct = g.ledger.length ? +(100 * g.ledger.filter(l => l.score >= 78).length / g.ledger.length).toFixed(1) : 0;
  M.reborn = g.reborn; M.ascended = g.ascended; M.returned = g.returned; M.fights = g.fights;
  M.stationsBuilt = g.stations.map(s => s.def.k);
  M.nanCount = nanCount;
  return M;
}
function ORDER_IDX(o) { return o >= 80 ? 0 : o >= 55 ? 1 : o >= 30 ? 2 : 3; }

const ONLY = process.env.ONLY ? process.env.ONLY.split(":") : null;
const results = { careful: [], sloppy: [], perfect: [], minimal: [] };
for (const key of Object.keys(PROFILES)) {
  if (ONLY && ONLY[0] !== key) continue;
  for (let s = 1; s <= SEEDS; s++) {
    if (ONLY && ONLY[1] && Number(ONLY[1]) !== s) continue;
    results[key].push(run(PROFILES[key], 1000 + s));
  }
  console.error(`done ${key}`);
}
let outObj = results;
if (ONLY && !ONLY[1] && fs.existsSync(path.join(OUT, `sim-results${TAG}.json`))) { outObj = JSON.parse(fs.readFileSync(path.join(OUT, `sim-results${TAG}.json`))); outObj[ONLY[0]] = results[ONLY[0]]; }
fs.writeFileSync(path.join(OUT, ONLY && ONLY[1] ? 'sim-one.json' : `sim-results${TAG}.json`), JSON.stringify(outObj));
console.log('wrote sim-results.json');
