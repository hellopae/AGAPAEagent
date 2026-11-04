# QUEST-OWNER engine

Branch codex/2026-11-02-quest-engine, base cfe04ef5. Engine/helpers only; parent owns UI/index/tracker/manual. No merge/push, game.js change or new save state.

Step0 acceptance at each quest owner region/NPC, sqMerchant atAsia, Nira near actual available map feet. Existing later routes, kin chronology, unlocked gates and non-kin-only finale pause preserved. Accepted title logged once on0→1. questsForActor selects only current target's unlocked unfinished missions; activeQuestEntries derives active journal data/objectives without mutation.

Focused49/49 pass: all16quest ownership/region/proximity/once-log cases, locks, stage2verdictwait, laterTHreplyroutes, kinfrom/to/from, pause semantics, Nira position/fallback, save roundtrip and existing exact branch rewards/once-only claims. Three module syntax checks and whitespace pass. No full or browser claim; parent integrated verification owns those.

engine-checks.json records the16quest route/objective matrix plus structural comparison to base: original authored letters, later narrative/choices/responses, all other E1 narratives, quest case facts and award function unchanged. Only delivery/arrival acceptance framing changed for5missions.

APIs:side-quests.js exports questsForActor(g,npc,zone=g.zone); quest-journal.js exports activeQuestEntries(g) with id,title,zone,npc,name,x,y,objective,paused. paused remains questsPaused&&!q.kin. Parent versions side-quests,quest-journal(new),e1-content.
