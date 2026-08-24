---
name: cross-functional-review
description: Review through business, UX, UI, and technical lenses before shipping. Use when final review, is this ready to ship, review business + UX + UI + tech, launch readiness, or cross-functional check.
---

# Cross-Functional Review

No single lens catches everything. Business sees revenue; UX sees flow; UI sees polish; engineering sees performance. A cross-functional review forces all four lenses onto the same artifact before it ships. The goal is not consensus — it's completeness.

Run four review passes. Each pass focuses on a different lens. Findings from one pass may conflict with findings from another — that's expected. Document all findings, then resolve conflicts.

## Pass 1: Business alignment

Check against upstream product thinking artifacts:
- Does this feature/product serve the stated business goal (from product-discovery / product-strategy)?
- Is it scoped to MVP (from mvp-scoping), or has scope crept?
- Does the monetization model still make sense with this implementation (from business-model-thinking)?
- Have all stakeholder requirements been addressed (from stakeholder-requirement-mapping)?
- Do the modules implemented trace back to the business model (from business-model-reading)?

**Verdict**: Aligned / Misaligned / Partially aligned (list gaps)

## Pass 2: UX flow

Check against UX artifacts:
- Walk through every user flow (from user-flow-mapping). Does the implementation match the designed flow, including error and edge paths?
- Are error states handled? Empty states? Loading states? Each must have a designed response, not a blank screen or a browser default.
- Is the information architecture intact (from information-architecture)? Can users find what they need from the nav?
- Apply usability-heuristics-check mentally: visibility of system status, user control, consistency, error prevention, recognition over recall, flexibility, minimalism, error recovery, help.
- Check accessibility-review criteria: contrast ratios, keyboard navigation, focus indicators, tap targets, semantic HTML, ARIA.

**Verdict**: UX complete / UX has gaps (list missing states/flows)

## Pass 3: UI consistency

Check against design system artifacts:
- Does every component use design tokens (from design-tokens)? Grep for raw hex codes, pixel values, and hardcoded shadows — each one is a consistency violation.
- Does typography follow the system (from typography-system)? Check font sizes, weights, line-heights against the type scale. Any off-scale values?
- Apply visual-hierarchy-review: focal point, size hierarchy, color contrast, spacing rhythm, alignment, CTA hierarchy.
- Are component states complete (from component-style-guide)? Hover, focus, active, disabled, loading, error — all present for every interactive component?
- Do micro-interactions follow the motion spec (from micro-interaction-motion-design)? Correct durations, easing curves, reduced-motion support?
- Is `@media (prefers-reduced-motion: reduce)` handled?

**Verdict**: UI consistent / UI has violations (list each with severity)

## Pass 4: Technical quality

Check the implementation itself:
- **Code structure**: Is the code organized logically? Components in the right directories? Clear separation between data, UI, and routing layers?
- **Tests**: Are critical paths tested? At minimum: happy path, primary error path, permission boundary.
- **Performance**: Large bundles? Excessive re-renders? Unoptimized images? N+1 queries? Measure, don't guess.
- **Accessibility implementation**: Does the rendered output actually pass the criteria from accessibility-review? (Contrast tool, keyboard test, screen reader check)
- **Responsive behavior**: Does the layout adapt correctly at every breakpoint defined in design-tokens?
- **Module sync**: For dashboard projects, has module-registry-sync been run? Is the manifest valid? Does the dashboard shell show the module correctly?
- **Route integrity**: Has route-integrity-checker been run? Are there dead-end CTAs or pending intents?

**Verdict**: Tech quality pass / Tech quality has issues (list with severity)

## Pass 5: Conflict resolution

After all four passes, conflicts will surface. Handle them:
- **Business vs UX**: Business wants a feature that UX says is confusing → document both perspectives, propose a compromise that serves the business goal without the UX pitfall. If no compromise exists, escalate with both sides clearly stated.
- **UI vs Engineering**: UI polish requires engineering effort that delays launch → quantify the trade-off: "Completing the skeleton loading states adds ~4h of work but covers the 3rd most common user flow."
- **Scope vs Quality**: Some findings are "nice to have" vs "must fix." Classify every finding: **Blocker** (ship is wrong without this), **Warning** (noticeable quality gap, not a showstopper), **Note** (improvement for next iteration).

Unresolved conflicts are escalated to the user with both sides clearly stated. Never ship with an unresolved blocker.

## Completion criteria

Done when:
- [ ] All 4 passes are complete with specific findings (not "looks fine")
- [ ] Every finding is classified as blocker / warning / note
- [ ] Every blocker has a resolution or is explicitly escalated
- [ ] Conflict resolution pass has addressed cross-pass contradictions
- [ ] Ship / no-ship recommendation is stated with rationale

## Output format

Cross-functional review scorecard (Markdown artifact):

| Pass | Verdict | Blockers | Warnings | Notes |
|------|---------|----------|----------|-------|
| Business | Aligned/Misaligned | count | count | count |
| UX Flow | Complete/Gaps | count | count | count |
| UI Consistency | Consistent/Violations | count | count | count |
| Technical Quality | Pass/Issues | count | count | count |

Followed by:
1. Detailed findings per pass (finding → severity → recommendation)
2. Conflict resolution log
3. **Final recommendation**: Ship ✅ / Don't ship ❌ / Ship with known issues ⚠️
