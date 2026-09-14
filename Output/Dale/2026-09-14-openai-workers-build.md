# Codex and Astra integration

Implemented by Codex with specialist review roles. Added two dashboard agents, personas, user-supplied recolored portraits and SD office sprites. Direct local CLI runs independently of Claude, defaults to read-only, and records results pending review. Dashboard displays status and copies a local command; it is not an automatic job queue.

Validation: seven mocked worker tests passed; syntax and configuration checks passed; mobile drawer and copy feedback verified in browser; all four supplied assets loaded. Reese fact-check and Chris local QA passed. Only the two new agents were seeded to Firestore. No additional model smoke run was made in this final pass to conserve usage. No AVEGEE game files changed by this integration.
