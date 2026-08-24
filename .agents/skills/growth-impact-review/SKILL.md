---
name: growth-impact-review
description: Evaluate systemic impact of new additions. Use when scaling dashboards, adding new modules, or assessing layout stress.
---
# Growth Impact Review

Growth breaks structures. **Anticipate the fracture points before they snap.**

## When to Run
Run after EVERY module/page addition. Not at milestones. Not at release. Every. Single. Addition.

## Pipeline Integration
- **Visual Hierarchy:** After 8+ modules, check `visual-hierarchy-review`. Does the dashboard homepage's visual hierarchy still work — does the most important module still get the most prominent position?
- **Tokens:** Check `design-tokens`. Does adding modules require new token variants (e.g., new accent colors for module identity)? Flag if the token set is being stretched beyond its design.

### 1. Dashboard Check
- [ ] Do shortcut grids wrap awkwardly?
- [ ] Is the primary module still prominent?
- [ ] Does the visual density overwhelm the user?

### 2. Navigation Check
- [ ] Does any `navGroup` exceed the cognitive limit?
- [ ] Are new categories required, or does it fit organically?

### 3. Routes Check
- [ ] Do new routes conflict with existing path conventions?
- [ ] Are legacy routes preserved or appropriately redirected?

### 4. Cross-refs Check
- [ ] Are interdependent modules correctly linked?
- [ ] Is data properly shared without redundant fetches?

## Scenario
Module #7 added to a dashboard that was designed for 4. Impact report shows: `navGroup` 'Operasional' now has 6 items (OK, under limit), but shortcut grid now wraps to 3 rows (recommend pagination or grouping).

## Anti-Patterns
- **The Frog Boiler:** Ignoring minor layout degrading on each addition until the UI is unusable.
- **Token Sprawl:** Creating new semantic tokens for one-off module identities.

## Completion Criteria
- [ ] All checks completed for Dashboard, Nav, Routes, and Cross-refs.
- [ ] Mitigation strategies proposed for any layout or cognitive breakage.
- [ ] Tokens and visual hierarchy verified.

## Output Format
A structured Markdown impact report detailing the checks, flagged issues, and specific mitigation proposals.
