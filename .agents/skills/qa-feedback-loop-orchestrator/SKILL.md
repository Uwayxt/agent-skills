---
name: qa-feedback-loop-orchestrator
description: Orchestrate the closed-loop QA cycle: collect findings, batch-report with PRD references, trigger fixes, and re-test until resolved or escalated. Use when QA loop, orchestrate testing, auto-fix findings, self-healing QA, or close the feedback loop.
---

**Quality is not a final gate — it is a loop. Every finding that can be fixed automatically must be. Every finding that cannot must reach a human with full context, not just a bug report.**

### 1. Collect findings from all QA skills
After each build/feature completion, run all applicable QA skills and collect their output:
- `interactive-element-audit` → orphaned element report
- `flow-based-functional-testing` → failed test cases
- `visual-responsive-regression-testing` → visual regressions
- `accessibility-runtime-audit` → a11y violations
- `responsive-qa-audit` → breakpoint audit findings

Do not act on individual findings as they arrive. Wait until all skills have completed their pass. See QA-LOOP-PROTOCOL.md for the batch protocol.

### 2. Batch all findings into a single report
Merge all findings into one structured report. For each finding:
- Finding ID (F-001, F-002, ...)
- Source skill (which QA skill found it)
- Finding type (orphaned element / failed test / regression / a11y violation / responsive issue)
- Location (route, component, element selector)
- PRD requirement ID from prd-traceability-matrix (mandatory — never report a finding without a PRD reference)
- Severity: BLOCKER / WARNING / NOTE
- Recommended fix (one sentence)

Never send one round-trip per finding — always batch.

### 3. Classify findings by auto-fixability
Three classes:
- **Auto-fixable**: findings with a clear, deterministic fix (missing `data-testid`, missing `aria-label`, link with `href="#"` where the route is known from route-integrity-checker). Proceed to Step 3a.
- **Agent-fixable**: findings that require the builder agent to make a code change (add an event handler, implement a missing flow step). Trigger the relevant builder skill. Proceed to Step 5.
- **Escalate**: findings that require a human decision (ambiguous requirement, conflicting priorities, 3rd-party dependency). Proceed to Step 6.

### 3a. Auto-Fix Decision Rules (Mandatory Before Applying Any Fix)
Before applying any auto-fix, verify ALL three conditions. If any condition fails, reclassify as agent-fixable or escalate.

**Condition 1 — The correct value is unambiguous:** The fix value must be deterministically derivable from existing project artifacts (route-intents.json, IA sitemap, PRD matrix, design spec). If deriving the value requires judgment or interpretation, it is NOT auto-fixable.

**Condition 2 — The fix is reversible:** Auto-fixes must be undoable via a single file revert with zero side effects on other components or shared state.

**Condition 3 — The fix scope is isolated:** The change affects only the flagged element, not shared components, design tokens, or global state.

**Auto-fix catalogue (deterministic cases only):**
- `data-testid` missing: generate from element label + route slug (e.g., button labeled "Submit" on `/checkout` → `btn-submit-checkout`)
- `aria-label` missing on icon-only button: derive from the visible tooltip text OR from the button's documented purpose in the design spec. If neither exists → escalate, do not guess.
- `href="#"` on a link: replace with the connected route from route-intents.json if status is `connected`. If status is `pending` → escalate.
- Missing `lang` attribute on `<html>`: set to the project's declared primary language from the discovery artifacts. If not declared → escalate.
- Missing `alt` attribute on purely decorative image: set `alt=""` and `aria-hidden="true"`. For informational images → escalate.

**Do NOT auto-fix:**
- Any value requiring interpretation of design intent not captured in a file
- Contrast ratios (color decisions require design review, not auto-correction)
- Missing event handlers (these are logic decisions — agent-fixable, not auto-fixable)
- Components with conflicting token references

### 4. Apply auto-fixes
For each auto-fixable finding that passes all three conditions in Step 3a, apply the fix directly. Update the relevant file. Mark the finding as `AUTO-FIXED` in the report, and record which condition evidence was used to derive the value.

### 5. Trigger builder skills for agent-fixable findings
Send the finding batch to the relevant builder skill with full context:
- For orphaned elements: `design-to-code-handoff` with the list of missing handlers
- For responsive issues: `adaptive-component-behavior` with the failing breakpoint and component
- For route issues: `route-integrity-checker` with the dead-end intents

After the builder skill applies fixes, re-run the relevant QA skill (not the full suite — only the skill that found the issue). This is one iteration.

### 6. Enforce the 3-iteration limit
If a finding has been through 3 fix-and-retest cycles and still fails:
- Stop attempting auto-fix
- Mark as `ESCALATED`
- Prepare escalation package: finding ID, all 3 fix attempts with their results, PRD requirement, recommended next step for human
- Present to user

### 7. Update prd-traceability-matrix
After all findings are resolved or escalated, update the traceability matrix status for all affected requirements. A requirement is only marked `DONE` after all its QA findings pass.

### 8. Generate the QA cycle summary
One summary per QA cycle:
- Total findings
- Auto-fixed (count)
- Agent-fixed (count, iterations taken)
- Escalated (count, with packages)
- Requirements now marked DONE
- Requirements still blocked

### Completion Criteria
- All QA skill outputs collected before any action is taken
- All findings batched into one report
- Every finding has a PRD requirement reference
- All auto-fixable findings resolved
- All agent-fixable findings either resolved or escalated after max 3 iterations
- prd-traceability-matrix updated
- QA cycle summary generated

### Output
- Batch QA report (`qa-report-[date].md`)
- Escalation packages for unresolved findings
- Updated prd-traceability-matrix
- QA cycle summary

### Anti-patterns
- Sending one round-trip per finding (token-wasteful, disruptive to builder agent context)
- Acting before all QA skills have completed (partial data leads to re-work)
- Reporting findings without PRD requirement references (loses context for prioritization)
- Auto-fixing findings without re-testing (fix may be wrong or incomplete)
- Infinite retry loop — MUST enforce the 3-iteration limit and escalate
- Marking requirements DONE based on "QA loop ran" rather than "QA loop passed"
