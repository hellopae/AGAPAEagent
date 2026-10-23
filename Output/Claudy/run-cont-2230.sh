#!/bin/zsh
# Relaunch the three Codex runs that hit the rate limit (23 Oct 2026, limit lifts 22:26).
cd "/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent"
target=$(date -j -f "%Y-%m-%d %H:%M" "2026-10-23 22:30" +%s); now=$(date +%s)
(( target > now )) && sleep $(( target - now ))
for s in z2-art b1 z3-ground; do
  python3 scripts/openai-worker.py --agent codex --task Output/Claudy/briefs/2026-10-23-avegee-$s-cont.md --project /Users/agapae/agapae-work/AVEGEE --write --run > Output/Claudy/cont-$s.log 2>&1 &
  sleep 10
done
wait
