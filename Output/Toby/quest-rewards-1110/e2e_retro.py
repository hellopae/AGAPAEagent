"""QUEST-REWARDS e2e part 2 at 390x844: the three new moves cast through the real battle menu, the sqBoon closing receipt (Grace's last talk is in Suvarnabhumi), the retro-reward notice for an old save, and the fps in a quest fight.
usage: e2e_moves.py <port> [fps]   (fps = also measure; only run when the machine is idle)"""
import sys, json
sys.path.insert(0, '/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
sys.path.insert(0, '/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/quest-rewards-1110')
from harness import *
HERE = '/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/quest-rewards-1110/'
port = sys.argv[1]; do_fps = 'fps' in sys.argv
res = {}
from e2e_moves_helpers import *   # SK, start_fight, pass_turns_until, cast_via_ui (shares `res`)
import e2e_moves_helpers as H
res = H.res

with sync_playwright() as p:
    b, ctx, pg = setup(p, port, 390, 844, 2)
    # retro notice: an old save (quests closed before rewards) loaded in the page
    try:
        pg.evaluate("document.querySelectorAll('dialog[open]').forEach(d=>d.close())")
        old = pg.evaluate("""()=>{const snap=JSON.parse(JSON.stringify(G.snapshot()));
          for(const id of ['sqKan','sqNira','kinTaan','sqGuard']){snap.sideQuests[id]={step:id.startsWith('kin')?3:5,choice:0,done:true,caseId:null,verdict:null};}
          snap.coin=1000;snap.inventory={};return snap;}""")
        pg.evaluate("(s)=>{G.restore(s);G.save=()=>true;G.onChange();}", old)
        for _ in range(8):   # other windows (new-item discovery, story) go first; the notice waits for them
            pg.wait_for_timeout(1500)
            if pg.evaluate("!!document.querySelector('dialog[open] [data-retro-ok]')"): break
            pg.evaluate("(()=>{const b=document.querySelector('dialog[open] button.gold[data-close]');b&&b.click();})()")   # the new-item windows first: they have their own gold button
        res['retro_dialog'] = pg.evaluate("[...document.querySelectorAll('dialog[open] h2, dialog[open] h3, dialog[open] .reward-row')].map(e=>e.textContent.replace(/\\s+/g,' ').trim())")
        shot(pg, 'retro-notice-390'); res['retro_overflow'] = overflow(pg)
        res['retro_state'] = pg.evaluate("({coin:G.coin,inv:G.inventory,pend:(G.sideQuests.sqKan.reward)})")
        pg.click('dialog[open] [data-retro-ok]'); pg.wait_for_timeout(700)
        res['retro_after_ack'] = pg.evaluate("(()=>({open:!!document.querySelector('dialog[open]'),seen:G.sideQuests.sqKan.reward.seen}))()")
        pg.wait_for_timeout(1500); res['retro_not_again'] = pg.evaluate("!document.querySelector('dialog[open]')")
    except Exception as e:
        res['retro_ERROR'] = str(e)[:300]; shot(pg, 'retro-ERROR')
    res['errors'] = pg.errors[:8]
    b.close()
print(json.dumps(res, ensure_ascii=False, indent=1))
json.dump(res, open(HERE + 'e2e-retro-result.json', 'w'), ensure_ascii=False, indent=1)
