---
name: usability-heuristics-check
description: Evaluate UI against Nielsen's 10 usability heuristics. Use when heuristic evaluation, usability check, Nielsen's heuristics, is this UI usable, or usability review.
---

# Heuristics Expose What Habit Hides

Heuristic evaluation catches 80% of usability problems without a single user test. Ten principles, systematically applied, expose what habit and familiarity hide from the builder.

Evaluate the UI against each of Nielsen's 10 heuristics. For each heuristic, state what you observe, whether it passes or has violations, and specific fix recommendations.

### 1. Visibility of System Status
Does the UI show the user what's happening? Loading states, progress indicators, save confirmations, active states on nav items.

### 2. Match Between System and Real World
Does the UI use the user's language, not developer jargon? Are concepts ordered logically (not by database schema)?

### 3. User Control and Freedom
Can the user undo? Go back? Cancel mid-process? Close a modal without losing work?

### 4. Consistency and Standards
Same action = same appearance everywhere? Do things that look alike behave alike? Does the product follow platform conventions?

### 5. Error Prevention
Does the UI prevent errors before they happen? Disabled submit buttons when form is invalid, confirmation dialogs on destructive actions, inline validation.

### 6. Recognition Rather Than Recall
Are options visible, not hidden? Does the user need to remember information from one step to another? Are recent items, suggestions, and defaults surfaced?

### 7. Flexibility and Efficiency of Use
Are there shortcuts for expert users? Keyboard shortcuts, bulk actions, saved filters. Can the interface adapt to both novice and expert?

### 8. Aesthetic and Minimalist Design
Every element competes for attention. Is anything on screen that doesn't help the user complete their goal? Remove before adding.

### 9. Help Users Recognize, Diagnose, and Recover from Errors
Are error messages specific, constructive, and actionable? Do they point to the exact field/issue and suggest a fix?

### 10. Help and Documentation
Is contextual help available (tooltips, inline hints)? Is it findable without searching? Is it unnecessary for common tasks?

## Output Format
- Heuristics scorecard: heuristic → score (0–4: 0=no problem, 4=usability catastrophe) → observations → fix recommendations.
- Summary: total score, worst offenders, top 3 fixes by impact.

## Completion Criteria
Done when all 10 heuristics have been evaluated with specific observations (not "looks fine"). Not done if any heuristic is marked "N/A" without justification.
