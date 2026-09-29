// deterministic repro: assign() silently fails when the station's existing keeper is escorting
const SRC='/Users/agapae/Documents/Work PAE/Claude/AVEGEE/src/';
globalThis.Image=class{}; let NOW=1.8e12; Date.now=()=>NOW;
const {createGame}=await import(SRC+'game.js'); const D=await import(SRC+'data.js');
Math.random=()=>0.5;
const g=createGame(); g.save=()=>true; g.hire('dam'); g.coin=1000;
g.spawnSoul(); g.spawnSoul(); g.queue.forEach(s=>{s.resist=false;s.beaten=true;});
const a=g.assign(g.queue[0].id,'krata','taan',3);
console.log('1st assign ->',a,'taan.escort=',g.crewOf('taan').escort,'freeCrew=',g.freeCrew().map(c=>c.k).join(','));
const b=g.assign(g.queue[0].id,'krata','dam',3);   // UI offers dam (idle) + krata (has 1/3 slots)
console.log('2nd assign (dam -> krata, station not full) ->',b, ' stFree(krata)=',g.stFree(g.stations.find(s=>s.def.k==='krata')));
