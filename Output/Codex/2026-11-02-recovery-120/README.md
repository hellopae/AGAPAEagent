# RECOVERY-120

Feature branch: codex/2026-11-02-recovery-120; base df42fb1b.

Implemented persistent actual tea-room recovery for downed reapers, 120 wall-clock seconds, unique occupied cushion (or bounded full-room wait), off-zone completion, legacy duration migration and unchanged Guard/Yama battle rules. Existing recovery restores 50 morale, voluntary tea rest retains 100.

Checks: existing focused 28/28, new focused4/4, roster migration7/7. Initial full suite1813/1814; sole failure was obsolete 60-second migration assertion, corrected and verified in focused roster tests. Parent requested stopping the redundant final rerun because integrated verification owns the final full suite. The interrupted rerun reported1808 passes,0 failures,1 cancelled construction-arrival test (pending Promise); it is not claimed as a full green run. Four changed runtime modules parse; diff whitespace check clean. Original BALANCE-2 evidence authenticated using exact reviewed recovery snippets; historical simulation reports untouched.

No browser screenshot or device FPS claim; integrated visuals are parent task responsibility. No merge/push performed here.
