# OpenAI workers — fact-check

Reviewer: Reese role, executed in Codex; no Claude runtime used.
Date: 2026-09-14 (Asia/Bangkok)
Overall: **PASS — prior descriptor identity blocker resolved in installed files.**

Scope: staged OPENAI-WORKERS.md, Claude and Codex agent descriptors, worker drawer, runner, selective seed and hook behavior. Static source and installed CLI help checked; no production writes or live worker invocation in this review.

| Claim | Verdict | Evidence |
|---|---|---|
| Direct workers run independently from Claude. | VERIFIED | scripts/openai-worker.py command() launches codex exec only; main() contains no Claude invocation. .claude wrappers correctly distinguish their own runtime. |
| Codex/Astra are two roles using gpt-6-astra by default, not separate quotas. | VERIFIED in configured workflow | argparse default and shared command() implementation; both use same CLI login environment. Authentication follows ChatGPT subscription or API usage credentials: https://learn.chatgpt.com/docs/auth (authentication section). This is not a claim that quota remains available or every auth setup uses subscription credits. |
| No --run means plan only; --publish requires --run. | VERIFIED | main() returns before output directory creation/subprocess when --run absent; argparse guard rejects publish without run. |
| Model work is read-only; not confined to reading only project. | VERIFIED | command() passes --sandbox read-only and -C project. Installed codex exec --help defines sandbox for model-generated shell commands and -C as working root. Runner itself intentionally writes local reports. This does not establish a blanket network/tool isolation guarantee. |
| Ten-minute run limit, no automatic re-run. | VERIFIED for runner | subprocess.run(timeout=600); one invocation, no retry loop. CLI transport retries, if any, are outside this claim. |
| Successful exit plus nonempty report means ready_for_review, not QA pass. | VERIFIED | main() requires exit 0 and nonempty report; review remains pending. UI explicitly displays pending approval. Failure/timeout records failed. |
| Publish sends limited selected-agent status, not brief/report/private paths, and no Git push/Work Log mutation. | VERIFIED for added path | publish() emits only status, fixed task text, workerState, lastRunId, provider with update masks. Hook-status exits for these two wrappers. No report content or credential-loading code is present in publisher. Existing Firebase public client configuration is distinct from a model API credential. |
| Start and completion status published only when requested. | VERIFIED | main() calls publish before model invocation and after status resolution within --publish branches; failures recorded separately. |
| --ephemeral avoids persistent Codex session files. | VERIFIED | Runner flag matches installed CLI help. Local runner artifacts are nevertheless retained, as documented. |
| Runs excluded from Git by default. | VERIFIED | staged .gitignore explicitly excludes Output/Codex/runs and Output/Astra/runs. Does not prevent manual force-add or external publishing. |
| Dashboard copies local commands and observes worker status, not execution queue. | VERIFIED | openaiWorkerCommand() fixed ID allowlist and static placeholders; copyOpenaiWorkerCommand() clipboard operation; no worker execution/request queue in new drawer. |
| Selective seed only modifies named agents. | VERIFIED | seed-firestore.mjs validates requested IDs and filters before PATCH; no-name path retains all-agent behavior. |
| Codex TOML descriptors distinguish their OpenAI runtime from separate Claude wrappers. | VERIFIED — corrected | Bounded recheck of installed /Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/.codex/agents/codex-engineer.toml:6 and astra-architect.toml:6: both now say “This is a Codex agent descriptor using the configured OpenAI runtime” and refer separately to .claude wrappers. |
| Persona and role descriptions. | OPINION / DESIGN INTENT | Proposed characterization, not demonstrated runtime guarantees; no factual blocker. |

Sources are primary implementation, installed CLI help, and opened official authentication documentation. No external model capability/performance benchmark is asserted. No secrets or private report bodies copied into this report. Prior identity blocker is resolved. This fact-check PASS does not constitute functional QA or deployment approval.

Recheck scope: only the prior identity blocker was reread in installed files; all other findings retain the original staged review scope. No model runs or implementation edits performed.
