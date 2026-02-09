# Specification

## Summary
**Goal:** Build the “ThumbnailAI” responsive single-page thumbnail generator with live 16:9 preview, style/preset controls, simulated AI generation, PNG export, Internet Identity auth, and per-user saved templates.

**Planned changes:**
- Create a responsive single-page layout matching the provided HTML structure: sticky header (logo/nav/auth), 2-column main area (Preview + Customize) collapsing to 1 column on small screens, features grid, and footer.
- Implement a live-updating 16:9 Thumbnail Preview canvas that reflects video title, channel name (including initial), selected style, and background changes.
- Add thumbnail style selection (modern, minimal, bold, bright, dark, gradient) with visible active state and corresponding preview text styling (including true gradient text for “gradient”).
- Add “AI Suggestions” preset cards (clickbait, educational, gaming, vlog) that apply preset title/style/background and show an in-app non-blocking confirmation.
- Implement “Generate with AI” as a simulated action with a ~1.5s loading overlay on the preview, then randomized background/style/title and an in-app success confirmation.
- Implement “Randomize” to immediately randomize background/style/title and update the active style indicator.
- Implement “Download Thumbnail” to export the current thumbnail as a real 1280x720 PNG, with a disabled/loading state during export.
- Implement responsive header navigation with a mobile menu toggle and icon state changes.
- Replace the Sign In placeholder with Internet Identity sign-in/sign-out using existing template hooks, showing authenticated vs signed-out header states.
- Implement Templates: signed-in users can save the current configuration with a name, list templates, apply a template, and delete a template; signed-out users see a sign-in call-to-action and cannot persist templates.
- Backend: add Motoko canister methods and stable storage to create/list/delete per-user templates keyed by Principal, enforcing ownership on deletion.
- Apply a cohesive dark, YouTube-inspired theme (near-black + red accent) with consistent component states across the app.

**User-visible outcome:** Users can customize a YouTube-style thumbnail with live preview, quickly apply presets or simulated AI generation, randomize designs, and download a 1280x720 PNG. Signed-in users (Internet Identity) can save, reuse, and delete personal thumbnail templates that persist.
