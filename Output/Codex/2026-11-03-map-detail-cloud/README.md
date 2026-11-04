# Map detail/cloud runtime pass — 2026-11-03

This is NOT completion of native map detail redraw. User reports all4zones blur at close zoom, and Thai cloud visibility remains inadequate. Expanded old Cyber-only detail queue to all4zones and made it highest priority.

Initial desktop audit showed detail loading; subsequent mobile audit uncovered threshold.7 retaining preview at max zoom (.63devicepx/unit), despite preview density only.4. Changed switch to.38. Final actual Chromium1280×800/390×844 eight scenes all report visibleFrame.mode=detail, with2desktop/6mobile visible tiles and zero page errors. Camera diagnostics ignore minimap passes. Existing tile source includes already enlarged native quadrants; source detail remains the limiting factor. Added high-quality device-sized resampling cache, max16Mpixels aggregate/3Mpixels per entry, to avoid per-frame high resampling and full-world zoom canvases. No zoom restriction or source art replacement.

Thai shadow cap32%, other regions20%; cloud patches reduced in footprint to create readable sunlit gaps. Probe cloud shape on white: see cloud-probe.json. Actual before/after screenshots retained. High-detail art redraw all4zones remains OPEN and is documented prominently in queue. Do not describe this runtime fix as high-resolution redrawn map delivery.
