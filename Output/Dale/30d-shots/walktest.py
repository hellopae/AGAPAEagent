import sys, json
from probe import *
T = """async (cfg) => {
  const W = await import('/src/walk.js'); const D = await import('/src/data.js'); const A = await import('/src/art.js'); const G = window.G;
  const out = [];
  G.paused = false;
  let fake = performance.now(); const realNow = performance.now.bind(performance); performance.now = () => fake;
  const ents = G.stations;
  const run = (name, x, y, steps=900) => {
    const ok = G.walkTo(x, y);
    const v0 = (() => { let c = 99; for (const d of W.npcDiscs()) { const v = ((G.player.x-d[0])/W.NPC_RX)**2 + ((G.player.y-d[1])/W.NPC_RY)**2; if (v < c) c = v; } return c; })();
    let prevV = v0, enter = 0, minV = 99, bad = 0, badWater = 0, inBuilding = 0;
    for (let i = 0; i < steps; i++) {
      fake += 16; G.stepWorld(16);
      const P = G.player;
      if (!W.canWalk(P.x, P.y)) bad++;
      let cur = 99; for (const d of W.npcDiscs()) { const v = ((P.x-d[0])/W.NPC_RX)**2 + ((P.y-d[1])/W.NPC_RY)**2; if (v < cur) cur = v; if (v < minV) minV = v; }
      if (prevV >= 1 && cur < 1) enter++; prevV = cur;
      for (const st of G.stations) { const b = A.blockOf(st.def); if (b && P.x>b[0]+1&&P.x<b[2]-1&&P.y>b[1]+1&&P.y<b[3]-1 && !(Math.abs(P.x-st.def.x)<=16 && P.y>=st.def.y-16) && !D.WALK_OK.some(r=>P.x>=r[0]&&P.x<=r[2]&&P.y>=r[1]&&P.y<=r[3])) {inBuilding++; if(!window.__dbgb) window.__dbgb=[]; if(window.__dbgb.length<6) window.__dbgb.push([name,st.def.k,Math.round(P.x),Math.round(P.y),b.map(Math.round),st.def.x,st.def.y]);} }
      if (!G.player.path && G.player.tx == null) break;
    }
    out.push({name, target:[x,y], walkTo:ok, end:[Math.round(G.player.x), Math.round(G.player.y)], notWalkable:bad, minDiscV: +minV.toFixed(2), enter, inBuildingSteps: inBuilding});
  };
  const crewAt = G.crew.filter(c=>c.x!=null);
  G.player.x = D.ZONE_ENTRY.goal[0]; G.player.y = D.ZONE_ENTRY.goal[1];
  run('river-left-of-gate', 640, 820);
  run('river-right-of-gate', 1020, 830);
  run('river-bottom-left', 300, 850);
  run('lava', 600, 560);
  for (const st of ents) run('building-'+st.def.k, st.def.bx ?? st.def.x, (st.def.by ?? st.def.y) - 40);
  // standing crew
  for (const c of crewAt) { c.path = null; run('onto-crew-'+c.k, c.x, c.y); }
  out.push({dbg: window.__dbgb});
  performance.now = realNow;
  return out;
}"""
if __name__=='__main__':
    zones = sys.argv[1:] or ['th','asia','west','cyberhell']
    with sync_playwright() as p:
        b,pg,errs=boot(p)
        allbad=0
        for k in zones:
            go_zone(pg,k); build_all(pg)
            # hire everyone so crew stand on map
            pg.evaluate("""async()=>{const D=await import('/src/data.js');const G=window.G; for(const def of D.CREW){ if(!G.crew.some(c=>c.k===def.k)) G.crew.push({...def, name:def.name, morale:92, hunger:100, at:null, tired:false}); }}""")
            pg.evaluate("window.G.crew.forEach(c=>{c.roam=0})")
            pg.evaluate("window.G.syncBlocks(true)")
            res = pg.evaluate(T, {})
            print('==', k)
            for r in res:
                if 'dbg' in r: print('DBG', r['dbg']); continue
                flag = '' if (r['notWalkable']==0 and r['enter']==0 and r['inBuildingSteps']==0) else '  <<<< PROBLEM'
                if flag: allbad+=1
                print(r['name'], r['target'], '->', r['end'], 'walkTo', r['walkTo'], 'notWalkable', r['notWalkable'], 'discV', r['minDiscV'], 'inBld', r['inBuildingSteps'], flag)
        print('problems', allbad, errs)
        b.close()
