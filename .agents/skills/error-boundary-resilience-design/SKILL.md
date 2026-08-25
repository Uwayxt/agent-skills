---
name: error-boundary-resilience-design
description: Design comprehensive state resilience including empty, partial, offline, timeout, and failure states. Use when error state, empty state, offline mode, fallback UI, or resilient UX.
---

**An interface is only as robust as its failure boundaries — great products design the error, empty, offline, and partial-degradation states with the same fidelity as the ideal path.**

### 1. Map component resilience zones
Deconstruct the page into isolated resilience zones (e.g. global shell, sidebar widgets, main data feed, analytics summary). An error in one zone (like a third-party analytics widget) must never trigger a white screen or crash the entire page.

### 2. Design the complete 5-state matrix per view
For every view or data-dependent component, document:
1. **Ideal State**: Full data populated, typical user scenario.
2. **Empty State (First Use / Zero Data)**: No data created yet. Explain the value proposition and provide a clear primary CTA to create the first entity.
3. **Empty State (Filtered / Zero Matches)**: User search or filter returned zero results. Provide clear action to reset filters without leaving the page.
4. **Partial Failure / Degraded State**: 3 of 4 API queries succeeded. Show the 3 working modules and display an inline retry card for the failed 4th module.
5. **Fatal Error / Network Failure**: Request failed or timed out. Provide plain-language diagnostic ("Unable to reach billing server") + retry button + offline status indicator.

### 3. Establish clear error communication standards
Never display raw stack traces, status codes (e.g., "Error 500"), or generic phrases ("Something went wrong") without actionable next steps:
- **What happened**: Explain in human terms without jargon.
- **Why it matters**: State whether data was saved or lost.
- **How to recover**: Provide an immediate action (Retry, Edit Input, Contact Support, Work Offline).

### 4. Design optimistic updates and rollback UX
When an action takes time (e.g. liking, archiving, deleting, status toggle):
- Apply UI state immediately to feel instantaneous.
- If the server returns an error, gracefully rollback the UI state and display a floating toast or inline banner with a "Retry" trigger.

### 5. Define offline and reconnect behaviors
- Detect offline status via browser `navigator.onLine` and `offline` events.
- Display a non-intrusive status banner indicating offline mode.
- Queue user mutations locally when applicable (IndexedDB/localStorage) and provide a sync status indicator when connection is restored.

## Completion Criteria
- [ ] Every data container has documented Ideal, Empty (first-use & filtered), Degraded, and Error states
- [ ] Error messages contain explanation, impact, and immediate recovery CTA
- [ ] Partial failure boundaries defined so one broken widget does not crash the viewport
- [ ] Optimistic update failure and rollback flows documented
- [ ] Offline status presentation and sync reconciliation behavior defined

## Output
A `resilience-matrix.md` or component state table detailing how each module behaves across all failure and empty conditions with specific error copy and recovery affordances.

## Anti-patterns
- Global full-page error screens for localized widget failures.
- Dead-end empty states with no guidance or CTA button.
- "Something went wrong" without a retry button or clear recovery step.
- Silent failures where optimistic changes revert without user notification.
